
from datetime import date, datetime, time, timedelta

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import and_, func
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate

router = APIRouter(
    prefix="/api/compare",
    tags=["Compare"],
)


CURRENCY_NAMES = {
    "USD": "US Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "AED": "UAE Dirham",
    "SAR": "Saudi Riyal",
}


@router.get("/")
def get_comparison(
    currency: str = Query(
        default="USD",
        description="Currency code.",
    ),
    date: date | None = Query(
        default=None,
        description="Date to compare rates for. Defaults to today.",
    ),
    db: Session = Depends(get_db),
):
    requested_currency = currency.upper()
    requested_date = date or datetime.now().date()

    if requested_currency not in CURRENCY_NAMES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported currency: {requested_currency}",
        )

    start_datetime = datetime.combine(
        requested_date,
        time.min,
    )

    end_datetime = datetime.combine(
        requested_date + timedelta(days=1),
        time.min,
    )

    # ---------------------------------------------------------
    # 1. Get all rates for this currency and date
    # ---------------------------------------------------------

    rates = (
        db.query(Rate)
        .filter(
            Rate.currency_code == requested_currency,
            Rate.created_at >= start_datetime,
            Rate.created_at < end_datetime,
        )
        .order_by(
            Rate.bank_id.asc(),
            Rate.created_at.desc(),
        )
        .all()
    )

    if not rates:
        raise HTTPException(
            status_code=404,
            detail=(
                f"No {requested_currency} rates found "
                f"for {requested_date}."
            ),
        )

    # ---------------------------------------------------------
    # 2. Keep the newest rate for EACH bank
    # ---------------------------------------------------------

    latest_by_bank = {}

    for rate in rates:
        bank_key = rate.bank_id or rate.bank_name

        if bank_key not in latest_by_bank:
            latest_by_bank[bank_key] = rate

    latest_rates = list(latest_by_bank.values())

    if not latest_rates:
        raise HTTPException(
            status_code=404,
            detail=(
                f"No comparison data found for "
                f"{requested_currency} on {requested_date}."
            ),
        )

    # ---------------------------------------------------------
    # 3. Build bank comparison data
    # ---------------------------------------------------------

    banks = []

    for rate in latest_rates:
        spread = rate.sell - rate.buy

        banks.append(
            {
                "bank_id": rate.bank_id,
                "bank": rate.bank_name,
                "buy": round(rate.buy, 4),
                "sell": round(rate.sell, 4),
                "spread": round(spread, 4),
                "updated_at": rate.created_at.isoformat(),
            }
        )

    # Sort banks by buy rate
    banks.sort(key=lambda bank: bank["buy"])

    # ---------------------------------------------------------
    # 4. Calculate summary
    # ---------------------------------------------------------

    highest_buy = max(rate.buy for rate in latest_rates)
    lowest_buy = min(rate.buy for rate in latest_rates)

    highest_sell = max(rate.sell for rate in latest_rates)
    lowest_sell = min(rate.sell for rate in latest_rates)

    buy_gap = highest_buy - lowest_buy
    sell_gap = highest_sell - lowest_sell

    largest_rate_gap = max(
        buy_gap,
        sell_gap,
    )

    average_spread = sum(
        rate.sell - rate.buy
        for rate in latest_rates
    ) / len(latest_rates)

    # Smallest buy/sell spread = most competitive
    most_competitive = min(
        latest_rates,
        key=lambda rate: rate.sell - rate.buy,
    )

    most_competitive_spread = (
        most_competitive.sell
        - most_competitive.buy
    )

    # ---------------------------------------------------------
    # 5. Latest update across all selected banks
    # ---------------------------------------------------------

    last_updated = max(
        rate.created_at
        for rate in latest_rates
    )

    # ---------------------------------------------------------
    # 6. Response
    # ---------------------------------------------------------

    return {
        "currency": requested_currency,
        "currency_name": CURRENCY_NAMES[requested_currency],
        "base_currency": "ETB",
        "date": requested_date.isoformat(),

        "summary": {
            "largest_rate_gap": round(
                largest_rate_gap,
                4,
            ),
            "average_spread": round(
                average_spread,
                4,
            ),
            "most_competitive_bank": {
                "bank": most_competitive.bank_name,
                "spread": round(
                    most_competitive_spread,
                    4,
                ),
            },
            "banks_compared": len(latest_rates),
        },

        "banks": banks,

        "last_updated": last_updated.isoformat(),
    }
