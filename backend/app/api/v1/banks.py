from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Bank, Rate

router = APIRouter(
    prefix="/api/v1/banks",
    tags=["Banks"],
)


@router.get(
    "",
    summary="Get all banks",
    description="Returns all banks available in Birrify.",
)
def get_banks(
    search: str | None = Query(
        default=None,
        description="Search banks by name",
    ),
    db: Session = Depends(get_db),
):
    query = db.query(Bank)

    if search:
        query = query.filter(
            Bank.name.ilike(f"%{search}%")
        )

    banks = query.order_by(Bank.name).all()

    return {
        "data": [
            {
                "id": bank.id,
                "name": bank.name,
            }
            for bank in banks
        ],
        "count": len(banks),
    }


@router.get(
    "/{bank_id}",
    summary="Get bank details",
)
def get_bank(
    bank_id: int,
    db: Session = Depends(get_db),
):
    bank = (
        db.query(Bank)
        .filter(Bank.id == bank_id)
        .first()
    )

    if not bank:
        raise HTTPException(
            status_code=404,
            detail="Bank not found",
        )

    currency_count = (
        db.query(Rate.currency_code)
        .filter(Rate.bank_id == bank_id)
        .distinct()
        .count()
    )

    rate_count = (
        db.query(Rate)
        .filter(Rate.bank_id == bank_id)
        .count()
    )

    return {
        "data": {
            "id": bank.id,
            "name": bank.name,
            "currency_count": currency_count,
            "rate_count": rate_count,
        }
    }


@router.get(
    "/{bank_id}/rates",
    summary="Get rates for a bank",
)
def get_bank_rates(
    bank_id: int,
    currency: str | None = Query(
        default=None,
        min_length=3,
        max_length=3,
    ),
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
    bank = (
        db.query(Bank)
        .filter(Bank.id == bank_id)
        .first()
    )

    if not bank:
        raise HTTPException(
            status_code=404,
            detail="Bank not found",
        )

    query = db.query(Rate).filter(
        Rate.bank_id == bank_id
    )

    if currency:
        currency = currency.upper()
        query = query.filter(
            Rate.currency_code == currency
        )

    query = query.order_by(desc(Rate.created_at))

    total = query.count()

    rates = query.offset(offset).limit(limit).all()

    return {
        "data": [
            {
                "id": rate.id,
                "currency": rate.currency_code,
                "buy": rate.buy,
                "sell": rate.sell,
                "spread": round(rate.sell - rate.buy, 4),
                "updated_at": rate.created_at,
            }
            for rate in rates
        ],
        "bank": {
            "id": bank.id,
            "name": bank.name,
        },
        "pagination": {
            "total": total,
            "limit": limit,
            "offset": offset,
            "has_more": offset + len(rates) < total,
        },
    }
