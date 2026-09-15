from datetime import date, datetime, time, timedelta

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Bank, Rate


router = APIRouter(
    prefix="/api/banks",
    tags=["Banks"],
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


def get_today_range():
    today = datetime.now().date()

    start_datetime = datetime.combine(
        today,
        time.min,
    )

    end_datetime = datetime.combine(
        today + timedelta(days=1),
        time.min,
    )

    return today, start_datetime, end_datetime


def format_rate(rate: Rate):
    spread = rate.sell - rate.buy

    return {
        "currency": rate.currency_code.upper(),
        "currency_name": CURRENCY_NAMES.get(
            rate.currency_code.upper(),
            rate.currency_code.upper(),
        ),
        "buy": round(rate.buy, 4),
        "sell": round(rate.sell, 4),
        "spread": round(spread, 4),
        "updated_at": rate.created_at.isoformat(),
    }


# ---------------------------------------------------------
# GET /api/banks
# ---------------------------------------------------------

@router.get("/")
def get_banks(
    currency: str = Query(
        default="USD",
        description="Currency code or 'all'.",
    ),
    db: Session = Depends(get_db),
):
    requested_currency = currency.upper()

    if (
        requested_currency != "ALL"
        and requested_currency not in CURRENCY_NAMES
    ):
        raise HTTPException(
            status_code=400,
            detail=(
                f"Unsupported currency: {requested_currency}. "
                "Use USD, EUR, GBP, AED, SAR, or all."
            ),
        )

    today, start_datetime, end_datetime = get_today_range()

    banks = (
        db.query(Bank)
        .order_by(Bank.name.asc())
        .all()
    )

    if not banks:
        raise HTTPException(
            status_code=404,
            detail="No banks found.",
        )

    result = []

    for bank in banks:
        query = (
            db.query(Rate)
            .filter(
                Rate.bank_id == bank.id,
                Rate.created_at >= start_datetime,
                Rate.created_at < end_datetime,
            )
            .order_by(Rate.created_at.desc())
        )

        if requested_currency != "ALL":
            query = query.filter(
                Rate.currency_code == requested_currency
            )

        rates = query.all()

        # Keep newest rate for each currency.
        latest_rates = {}

        for rate in rates:
            rate_currency = rate.currency_code.upper()

            if rate_currency not in latest_rates:
                latest_rates[rate_currency] = rate

        formatted_rates = [
            format_rate(rate)
            for rate in latest_rates.values()
        ]

        formatted_rates.sort(
            key=lambda item: item["currency"]
        )

        last_updated = None

        if formatted_rates:
            last_updated = max(
                item["updated_at"]
                for item in formatted_rates
            )

        result.append(
            {
                "id": bank.id,
                "name": bank.name,
                "short_name": bank.name,
                "rates": formatted_rates,
                "last_updated": last_updated,
            }
        )

    return {
        "data": result,
        "meta": {
            "total": len(result),
            "currency": requested_currency,
            "date": today.isoformat(),
        },
    }


# ---------------------------------------------------------
# GET /api/banks/{bank_id}/history
# ---------------------------------------------------------

@router.get("/{bank_id}/history")
def get_bank_history(
    bank_id: int,
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

    bank = (
        db.query(Bank)
        .filter(Bank.id == bank_id)
        .first()
    )

    if not bank:
        raise HTTPException(
            status_code=404,
            detail="Bank not found.",
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

    # Get this bank's rates for the requested currency.
    rates = (
        db.query(Rate)
        .filter(
            Rate.bank_id == bank_id,
            Rate.currency_code == requested_currency,
            Rate.created_at >= start_datetime,
            Rate.created_at < end_datetime,
        )
        .order_by(Rate.created_at.asc())
        .all()
    )

    # -----------------------------------------------------
    # Keep only the latest rate for each day.
    # -----------------------------------------------------

    latest_daily_rates: dict[date, Rate] = {}

    for rate in rates:
        rate_date = rate.created_at.date()

        current = latest_daily_rates.get(rate_date)

        if current is None or rate.created_at > current.created_at:
            latest_daily_rates[rate_date] = rate

    # -----------------------------------------------------
    # Build history.
    # -----------------------------------------------------

    history = []

    for rate_date in sorted(latest_daily_rates):
        rate = latest_daily_rates[rate_date]

        average = (rate.buy + rate.sell) / 2

        history.append(
            {
                "date": rate_date.isoformat(),
                "buy": round(rate.buy, 4),
                "sell": round(rate.sell, 4),
                "average": round(average, 4),
            }
        )

    # -----------------------------------------------------
    # Current and previous values.
    # -----------------------------------------------------

    if history:
        current = history[-1]
    else:
        current = {
            "date": None,
            "buy": 0,
            "sell": 0,
            "average": 0,
        }

    if len(history) >= 2:
        previous = history[-2]
    else:
        previous = current

    # -----------------------------------------------------
    # Calculate changes.
    # -----------------------------------------------------

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
    }

    return {
        "bank_id": bank.id,
        "bank_name": bank.name,
        "currency": requested_currency,
        "currency_name": CURRENCY_NAMES[requested_currency],
        "base_currency": "ETB",
        "period": requested_period,
        "from_date": start_date.isoformat(),
        "to_date": today.isoformat(),
        "summary": summary,
        "history": history,
    }


# ---------------------------------------------------------
# GET /api/banks/{bank_id}
# ---------------------------------------------------------

@router.get("/{bank_id}")
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
            detail="Bank not found.",
        )

    today, start_datetime, end_datetime = get_today_range()

    rates = (
        db.query(Rate)
        .filter(
            Rate.bank_id == bank.id,
            Rate.created_at >= start_datetime,
            Rate.created_at < end_datetime,
        )
        .order_by(Rate.created_at.desc())
        .all()
    )

    if not rates:
        raise HTTPException(
            status_code=404,
            detail=f"No rates found for {bank.name} today.",
        )

    # Keep only newest rate for each currency.
    latest_rates = {}

    for rate in rates:
        currency = rate.currency_code.upper()

        if currency not in latest_rates:
            latest_rates[currency] = rate

    formatted_rates = [
        format_rate(rate)
        for rate in latest_rates.values()
    ]

    formatted_rates.sort(
        key=lambda item: item["currency"]
    )

    last_updated = max(
        rate.created_at
        for rate in latest_rates.values()
    )

    return {
        "id": bank.id,
        "name": bank.name,
        "short_name": bank.name,
        "rates": formatted_rates,
        "last_updated": last_updated.isoformat(),
    }
