from playwright.sync_api import sync_playwright

def get_oromia_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://oromiabank.com/exchange-rates/", timeout=60000)

        page.wait_for_load_state("networkidle")

        rows = page.query_selector_all("table tr")

        data = []
        CODE_MAP = {
            "EURO": "EUR",
            "FRANC": "CHF",
            "RIYAL": "SAR",
            "DIRHAM": "AED",
            "DOLLAR": "USD",
            "POUND": "GBP",
        }

        for row in rows[1:10]:
            cells = row.query_selector_all("td")
            row_data = [cell.inner_text().strip() for cell in cells]

            # skip bad rows
            if len(row_data) < 4:
                continue

            data.append({
                "code": CODE_MAP.get(row_data[2], row_data[1]),
                "buy": row_data[3],
                "sell": row_data[4]
            })

        browser.close()
        orom_data={
            "bank": "oromia",
            "currencies": data
        }

        return orom_data
