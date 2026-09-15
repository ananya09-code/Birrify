from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate


router = APIRouter(
    prefix="/api/meta",
    tags=["Meta"],
)


@router.get("/")
def get_meta(db: Session = Depends(get_db)):
    currencies = (
        db.query(Rate.currency_code)
        .distinct()
        .order_by(Rate.currency_code)
        .all()
    )

    banks = (
        db.query(Rate.bank_name)
        .distinct()
        .order_by(Rate.bank_name)
        .all()
    )

    return {
        "currencies": [currency[0] for currency in currencies],
        "banks": [bank[0] for bank in banks],
    }
