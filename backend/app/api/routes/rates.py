from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate

router = APIRouter(prefix="/api/rates", tags=["Rates"])


@router.get("/")
def get_rates(db: Session = Depends(get_db)):
    now = datetime.utcnow()
    today = now.date()

    start_of_day = datetime.combine(today, datetime.min.time())
    start_of_tomorrow = start_of_day + timedelta(days=1)

    rates = (
        db.query(Rate)
        .filter(
            Rate.created_at >= start_of_day,
            Rate.created_at < start_of_tomorrow,
        )
        .order_by(Rate.created_at.desc())
        .all()
    )

    # Keep only the newest rate for each bank + currency
    latest = {}

    for rate in rates:
        key = (rate.bank_id, rate.currency_code)

        if key not in latest:
            latest[key] = rate

    return {
        "date": today.isoformat(),
        "count": len(latest),
        "data": [
            {
                "id": rate.id,
                "bank_id": rate.bank_id,
                "bank_name": rate.bank_name,
                "currency_code": rate.currency_code,
                "buy": rate.buy,
                "sell": rate.sell,
                "created_at": rate.created_at,
            }
            for rate in latest.values()
        ],
    }
