"""Shared rate metadata and selection helpers."""
from datetime import date, datetime, time, timedelta
from fastapi import HTTPException

BASE_CURRENCY = {"code": "ETB", "name": "Ethiopian Birr", "symbol": "Br"}
KNOWN_CURRENCY_DETAILS = {
    "USD": {"name": "US Dollar", "symbol": "$"}, "EUR": {"name": "Euro", "symbol": "€"},
    "GBP": {"name": "British Pound", "symbol": "£"}, "AED": {"name": "UAE Dirham", "symbol": "د.إ"},
    "SAR": {"name": "Saudi Riyal", "symbol": "ر.س"},
}
PERIOD_DAYS = {"7D": 7, "30D": 30, "90D": 90, "1Y": 365}

def parse_day(value: str | None) -> date:
    if value is None:
        return datetime.now().date()
    try:
        return date.fromisoformat(value)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail="Invalid date. Use YYYY-MM-DD.") from exc

def day_range(value: date) -> tuple[datetime, datetime]:
    start = datetime.combine(value, time.min)
    return start, start + timedelta(days=1)

def currency_metadata(code: str) -> dict:
    code = code.upper()
    if code == "ETB":
        return BASE_CURRENCY
    details = KNOWN_CURRENCY_DETAILS.get(code, {})
    return {"code": code, "name": details.get("name", code), "symbol": details.get("symbol", code)}

def latest_by_bank(rates):
    """Return one newest record per bank without assuming batch timestamps."""
    selected = {}
    for rate in sorted(rates, key=lambda item: item.created_at, reverse=True):
        selected.setdefault(rate.bank_id if rate.bank_id is not None else rate.bank_name, rate)
    return list(selected.values())
