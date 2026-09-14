from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.model import Rate
from .common import day_range, latest_by_bank, parse_day

router = APIRouter(prefix="/api/market", tags=["Market"])

def summarize(currency: str, requested_date, rates):
    average_buy = sum(rate.buy for rate in rates) / len(rates)
    average_sell = sum(rate.sell for rate in rates) / len(rates)
    return {"currency": currency, "date": requested_date.isoformat(), "market": {
        "average_buy": round(average_buy, 4), "average_sell": round(average_sell, 4),
        "spread": round(average_sell - average_buy, 4), "lowest_buy": round(min(rate.buy for rate in rates), 4),
        "highest_buy": round(max(rate.buy for rate in rates), 4), "lowest_sell": round(min(rate.sell for rate in rates), 4),
        "highest_sell": round(max(rate.sell for rate in rates), 4)},
        "banks_count": len(rates), "last_updated": max(rate.created_at for rate in rates).isoformat()}

@router.get("/all")
def get_all_markets(date: str | None = Query(None), db: Session = Depends(get_db)):
    requested_date = parse_day(date)
    start, end = day_range(requested_date)
    records = db.query(Rate).filter(Rate.created_at >= start, Rate.created_at < end).all()
    grouped = {}
    for record in records:
        grouped.setdefault(record.currency_code.upper(), []).append(record)
    return {"date": requested_date.isoformat(), "data": [summarize(code, requested_date, latest_by_bank(values)) for code, values in sorted(grouped.items())]}


@router.get("/")
def get_market(currency: str = Query(...), date: str | None = Query(None), db: Session = Depends(get_db)):
    requested_currency = currency.upper()
    requested_date = parse_day(date)
    start, end = day_range(requested_date)
    records = db.query(Rate).filter(Rate.currency_code == requested_currency, Rate.created_at >= start, Rate.created_at < end).all()
    rates = latest_by_bank(records)
    if not rates:
        raise HTTPException(status_code=404, detail=f"No {requested_currency} rates found for {requested_date.isoformat()}.")
    return summarize(requested_currency, requested_date, rates)
