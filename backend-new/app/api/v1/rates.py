from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Bank, Rate

router = APIRouter(
    prefix="/api/v1/rates",
    tags=["Rates"],
)


@router.get(
    "",
    summary="Get latest exchange rates",
    description="Returns the latest exchange rate for each bank and currency.",
)
def get_rates(
    currency: Optional[str] = Query(
        default=None,
        description="Currency code, for example USD, EUR, GBP",
        min_length=3,
        max_length=3,
    ),
    bank: Optional[str] = Query(
        default=None,
        description="Bank name or bank ID",
    ),
    limit: int = Query(
        default=50,
        ge=1,
        le=200,
        description="Number of results to return",
    ),
    offset: int = Query(
        default=0,
        ge=0,
        description="Number of results to skip",
    ),
    db: Session = Depends(get_db),
):
    query = db.query(Rate)

    if currency:
        currency = currency.upper()
        query = query.filter(Rate.currency_code == currency)

    if bank:
        if bank.isdigit():
            query = query.filter(Rate.bank_id == int(bank))
        else:
            query = query.filter(Rate.bank_name.ilike(f"%{bank}%"))

    # Newest rates first
    query = query.order_by(desc(Rate.created_at))

    total = query.count()

    rates = query.offset(offset).limit(limit).all()

    return {
        "data": [
            {
                "id": rate.id,
                "bank": {
                    "id": rate.bank_id,
                    "name": rate.bank_name,
                },
                "currency": rate.currency_code,
                "buy": rate.buy,
                "sell": rate.sell,
                "spread": round(rate.sell - rate.buy, 4),
                "updated_at": rate.created_at,
            }
            for rate in rates
        ],
        "pagination": {
            "total": total,
            "limit": limit,
            "offset": offset,
            "has_more": offset + len(rates) < total,
        },
    }


@router.get(
    "/{currency}",
    summary="Get rates for a currency",
    description="Returns exchange rates for a specific currency across banks.",
)
def get_currency_rates(
    currency: str,
    limit: int = Query(
        default=50,
        ge=1,
        le=200,
    ),
    offset: int = Query(
        default=0,
        ge=0,
    ),
    db: Session = Depends(get_db),
):
    currency = currency.upper()

    query = (
        db.query(Rate)
        .filter(Rate.currency_code == currency)
        .order_by(desc(Rate.created_at))
    )

    total = query.count()

    rates = query.offset(offset).limit(limit).all()

    if not rates:
        raise HTTPException(
            status_code=404,
            detail=f"No rates found for currency '{currency}'",
        )

    return {
        "data": [
            {
                "id": rate.id,
                "bank": {
                    "id": rate.bank_id,
                    "name": rate.bank_name,
                },
                "currency": rate.currency_code,
                "buy": rate.buy,
                "sell": rate.sell,
                "spread": round(rate.sell - rate.buy, 4),
                "updated_at": rate.created_at,
            }
            for rate in rates
        ],
        "pagination": {
            "total": total,
            "limit": limit,
            "offset": offset,
            "has_more": offset + len(rates) < total,
        },
    }


@router.get(
    "/{currency}/{bank_id}",
    summary="Get a bank's rate for a currency",
)
def get_bank_currency_rate(
    currency: str,
    bank_id: int,
    db: Session = Depends(get_db),
):
    currency = currency.upper()

    rate = (
        db.query(Rate)
        .filter(
            Rate.currency_code == currency,
            Rate.bank_id == bank_id,
        )
        .order_by(desc(Rate.created_at))
        .first()
    )

    if not rate:
        raise HTTPException(
            status_code=404,
            detail="Rate not found",
        )

    return {
        "data": {
            "id": rate.id,
            "bank": {
                "id": rate.bank_id,
                "name": rate.bank_name,
            },
            "currency": rate.currency_code,
            "buy": rate.buy,
            "sell": rate.sell,
            "spread": round(rate.sell - rate.buy, 4),
            "updated_at": rate.created_at,
        }
    }
