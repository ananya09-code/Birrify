from datetime import date, datetime, time, timedelta

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate

router = APIRouter(
    prefix="/api/history",
    tags=["History"],
)


CURRENCY_NAMES = {
    "USD": "US Dollar",
    "EUR": "Euro",
    "GBP": "British Pound",
    "AED": "UAE Dirham",
    "SAR": "Saudi Riyal",
}


PERIOD_DAYS = {
    "7D": 7,
    "30D": 30,
    "90D": 90,
    "1Y": 365,
}


@router.get("/")
def get_history(
    currency: str = Query(
        default="USD",
        description="Currency code.",
    ),
    period: str = Query(
        default="7D",
        description="History period: 7D, 30D, 90D, or 1Y.",
    ),
    db: Session = Depends(get_db),
):
    requested_currency = currency.upper()
    requested_period = period.upper()

    if requested_currency not in CURRENCY_NAMES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported currency: {requested_currency}",
        )

    if requested_period not in PERIOD_DAYS:
        raise HTTPException(
            status_code=400,
            detail="Invalid period. Use 7D, 30D, 90D, or 1Y.",
        )

    today = datetime.now().date()
    start_date = today - timedelta(
        days=PERIOD_DAYS[requested_period] - 1
    )

    start_datetime = datetime.combine(
        start_date,
        time.min,
    )

    end_datetime = datetime.combine(
        today + timedelta(days=1),
        time.min,
    )

    # ---------------------------------------------------------
    # Find the latest collection timestamp for every day.
    #
    # This prevents us from mixing rates collected at different
    # times of the day.
    # ---------------------------------------------------------
    latest_daily_collection = (
        db.query(
            func.date(Rate.created_at).label("rate_date"),
            func.max(Rate.created_at).label("latest_timestamp"),
        )
        .filter(
            Rate.currency_code == requested_currency,
            Rate.created_at >= start_datetime,
            Rate.created_at < end_datetime,
        )
        .group_by(
            func.date(Rate.created_at),
        )
        .subquery()
    )

    # ---------------------------------------------------------
    # Get all rates belonging to each day's latest collection.
    # ---------------------------------------------------------
    daily_rates = (
        db.query(Rate)
        .join(
            latest_daily_collection,
            func.date(Rate.created_at)
            == latest_daily_collection.c.rate_date,
        )
        .filter(
            Rate.currency_code == requested_currency,
            Rate.created_at
            == latest_daily_collection.c.latest_timestamp,
        )
        .order_by(
            Rate.created_at.asc(),
            Rate.bank_name.asc(),
        )
        .all()
    )

    # ---------------------------------------------------------
    # Group rates by date.
    # ---------------------------------------------------------
    grouped: dict[date, list[Rate]] = {}

    for rate in daily_rates:
        rate_date = rate.created_at.date()

        grouped.setdefault(rate_date, []).append(rate)

    # ---------------------------------------------------------
    # Create one market rate for each day.
    #
    # Buy:
    #   average of all banks' buy rates
    #
    # Sell:
    #   average of all banks' sell rates
    #
    # Average:
    #   midpoint between market buy and market sell
    #
    # Spread:
    #   market sell - market buy
    # ---------------------------------------------------------
    history = []

    for rate_date in sorted(grouped):
        rates_for_day = grouped[rate_date]

        buy = sum(
            rate.buy for rate in rates_for_day
        ) / len(rates_for_day)

        sell = sum(
            rate.sell for rate in rates_for_day
        ) / len(rates_for_day)

        average = (buy + sell) / 2
        spread = sell - buy

        history.append(
            {
                "date": rate_date.isoformat(),
                "buy": round(buy, 4),
                "sell": round(sell, 4),
                "average": round(average, 4),
                "spread": round(spread, 4),
            }
        )

    # ---------------------------------------------------------
    # Current and previous values.
    # ---------------------------------------------------------
    if history:
        current = history[-1]
    else:
        current = {
            "date": None,
            "buy": 0,
            "sell": 0,
            "average": 0,
            "spread": 0,
        }

    if len(history) >= 2:
        previous = history[-2]
    else:
        previous = current

    # ---------------------------------------------------------
    # Calculate changes for all three rate types.
    # ---------------------------------------------------------
    def calculate_change(
        current_value: float,
        previous_value: float,
    ):
        change = current_value - previous_value

        change_percent = (
            (change / previous_value) * 100
            if previous_value != 0
            else 0
        )

        return {
            "value": round(current_value, 4),
            "previous": round(previous_value, 4),
            "change": round(change, 4),
            "change_percent": round(change_percent, 4),
        }

    # ---------------------------------------------------------
    # Period high / low.
    #
    # Based on the daily market average rate.
    # ---------------------------------------------------------
    if history:
        period_high = max(
            item["average"] for item in history
        )

        period_low = min(
            item["average"] for item in history
        )
    else:
        period_high = 0
        period_low = 0

    summary = {
        "buy": calculate_change(
            current["buy"],
            previous["buy"],
        ),
        "sell": calculate_change(
            current["sell"],
            previous["sell"],
        ),
        "average": calculate_change(
            current["average"],
            previous["average"],
        ),
        "period_high": round(period_high, 4),
        "period_low": round(period_low, 4),
    }

    return {
        "currency": requested_currency,
        "currency_name": CURRENCY_NAMES[requested_currency],
        "base_currency": "ETB",
        "period": requested_period,
        "from_date": start_date.isoformat(),
        "to_date": today.isoformat(),
        "summary": summary,
        "history": history,
    }
