from datetime import date, datetime, time, timedelta

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate


router = APIRouter(
    prefix="/api/rates",
    tags=["Rates"],
)


CURRENCY_NAMES = {
    "USD": "US Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "AED": "UAE Dirham",
    "SAR": "Saudi Riyal",
}


@router.get("/")
def get_rates(
    date: date | None = Query(
        default=None,
        description="Date to retrieve rates for. Defaults to today.",
    ),
    currency: str = Query(
        default="USD",
        description="Currency code. Defaults to USD.",
    ),
    page: int = Query(
        default=1,
        ge=1,
        description="Page number.",
    ),
    per_page: int = Query(
        default=20,
        ge=1,
        le=100,
        description="Number of records per page.",
    ),
    db: Session = Depends(get_db),
):
    # ---------------------------------------------------------
    # 1. Default date = today
    # ---------------------------------------------------------

    requested_date = date or datetime.now().date()

    day_start = datetime.combine(
        requested_date,
        time.min,
    )

    day_end = day_start + timedelta(days=1)

    # ---------------------------------------------------------
    # 2. Normalize currency
    # ---------------------------------------------------------

    requested_currency = currency.upper()

    # ---------------------------------------------------------
    # 3. Find the newest rate for the requested date
    # ---------------------------------------------------------

    latest_rate = (
        db.query(Rate)
        .filter(
            Rate.created_at >= day_start,
            Rate.created_at < day_end,
            Rate.currency_code == requested_currency,
        )
        .order_by(Rate.created_at.desc())
        .first()
    )

    if latest_rate is None:
        return {
            "data": [],
            "meta": {
                "date": requested_date,
                "currency": requested_currency,
                "currency_name": CURRENCY_NAMES.get(
                    requested_currency,
                    requested_currency,
                ),
                "collected_at": None,
                "page": page,
                "per_page": per_page,
                "total": 0,
                "total_pages": 0,
                "has_next": False,
                "has_previous": False,
            },
        }

    latest_timestamp = latest_rate.created_at

    # ---------------------------------------------------------
    # 4. Find the latest collection batch
    # ---------------------------------------------------------

    batch_start = latest_timestamp - timedelta(minutes=10)

    query = (
        db.query(Rate)
        .filter(
            Rate.created_at >= batch_start,
            Rate.created_at <= latest_timestamp,
            Rate.currency_code == requested_currency,
        )
    )

    # ---------------------------------------------------------
    # 5. Count total records before pagination
    # ---------------------------------------------------------

    total = query.count()

    # ---------------------------------------------------------
    # 6. Calculate pagination metadata
    # ---------------------------------------------------------

    total_pages = (
        (total + per_page - 1) // per_page
        if total > 0
        else 0
    )

    offset = (page - 1) * per_page

    # ---------------------------------------------------------
    # 7. Get only the requested page
    # ---------------------------------------------------------

    rates = (
        query
        .order_by(
            Rate.bank_name.asc(),
            Rate.id.asc(),
        )
        .offset(offset)
        .limit(per_page)
        .all()
    )

    # ---------------------------------------------------------
    # 8. Format response data
    # ---------------------------------------------------------

    data = [
        {
            "id": rate.id,
            "bank_id": rate.bank_id,
            "bank_name": rate.bank_name,
            "currency": rate.currency_code,
            "name": CURRENCY_NAMES.get(
                rate.currency_code,
                rate.currency_code,
            ),
            "buy": rate.buy,
            "sell": rate.sell,
            "created_at": rate.created_at,
        }
        for rate in rates
    ]

    # ---------------------------------------------------------
    # 9. Return response
    # ---------------------------------------------------------

    return {
        "data": data,
        "meta": {
            "date": requested_date,
            "currency": requested_currency,
            "currency_name": CURRENCY_NAMES.get(
                requested_currency,
                requested_currency,
            ),
            "collected_at": latest_timestamp,
            "page": page,
            "per_page": per_page,
            "total": total,
            "total_pages": total_pages,
            "has_next": page < total_pages,
            "has_previous": page > 1,
        },
    }
