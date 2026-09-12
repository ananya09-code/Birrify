from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.db.model import Bank, Rate
from .common import BASE_CURRENCY, PERIOD_DAYS, currency_metadata

router = APIRouter(prefix="/api/info", tags=["Info"])


@router.get("/")
def get_info(db: Session = Depends(get_db)):
    codes = [code.upper() for (code,) in db.query(
        func.distinct(Rate.currency_code)).order_by(Rate.currency_code)]
    currencies = [BASE_CURRENCY] + \
        [currency_metadata(code) for code in codes if code != "ETB"]
    banks = [{"id": bank.id, "name": bank.name, "short_name": bank.name}
             for bank in db.query(Bank).order_by(Bank.name)]
    return {"base_currency": BASE_CURRENCY["code"], "currencies": currencies, "banks": banks, "periods": list(PERIOD_DAYS.keys())}
