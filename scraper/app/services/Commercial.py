import requests
from datetime import datetime, timedelta

def get_cbe_rates():
    base_url = "https://combanketh.et/cbeapi/daily-exchange-rates/"

    # subtract 3 days
    target_date = (datetime.today() - timedelta(days=2)).strftime("%Y-%m-%d")

    url = f"{base_url}?_limit=1&Date={target_date}"

    res = requests.get(url, timeout=30)
    data = res.json()

    if not data:
        return {"bank": "cbe", "date": target_date, "currencies": []}

    rates = data[0]["ExchangeRate"]

    cbe_data = {
        "bank": "cbe",
        "date": target_date,
        "currencies": []
    }

    for item in rates:
        code = item["currency"]["CurrencyCode"]
        buy = item["cashBuying"]
        sell = item["cashSelling"]

        if not buy or not sell or buy == 0 or sell == 0:
            continue

        cbe_data["currencies"].append({
            "code": code,
            "buy": buy,
            "sell": sell
        })

    return cbe_data

