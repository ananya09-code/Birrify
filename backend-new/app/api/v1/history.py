from datetime import datetime, date, time
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import asc
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate

router = APIRouter(
    prefix="/api/v1/history",
    tags=["History"],
)


@router.get(
    "/{currency}",
    summary="Get historical exchange rates",
    description="Returns historical exchange-rate data for a currency.",
)
def get_currency_history(
    currency: str,
    bank_id: Optional[int] = Query(
        default=None,
        description="Filter history by bank ID",
    ),
    start_date: Optional[date] = Query(
        default=None,
        description="Start date in YYYY-MM-DD format",
    ),
    end_date: Optional[date] = Query(
        default=None,
        description="End date in YYYY-MM-DD format",
    ),
    limit: int = Query(
        default=100,
        ge=1,
        le=1000,
    ),
    offset: int = Query(
        default=0,
        ge=0,
    ),
    db: Session = Depends(get_db),
):
    currency = currency.upper()

    if start_date and end_date and start_date > end_date:
        raise HTTPException(
            status_code=400,
            detail="start_date cannot be after end_date",
        )

    query = db.query(Rate).filter(
        Rate.currency_code == currency
    )

    if bank_id is not None:
        query = query.filter(
            Rate.bank_id == bank_id
        )

    if start_date:
        start_datetime = datetime.combine(
            start_date,
            time.min,
        )

        query = query.filter(
            Rate.created_at >= start_datetime
        )

    if end_date:
        end_datetime = datetime.combine(
            end_date,
            time.max,
        )

        query = query.filter(
            Rate.created_at <= end_datetime
        )

    query = query.order_by(
        asc(Rate.created_at)
    )

    total = query.count()

    history = (
        query
        .offset(offset)
        .limit(limit)
        .all()
    )

    if not history:
        raise HTTPException(
            status_code=404,
            detail=f"No historical data found for '{currency}'",
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
                "timestamp": rate.created_at,
            }
            for rate in history
        ],
        "filters": {
            "currency": currency,
            "bank_id": bank_id,
            "start_date": start_date,
            "end_date": end_date,
        },
        "pagination": {
            "total": total,
            "limit": limit,
            "offset": offset,
            "has_more": offset + len(history) < total,
        },
    }
