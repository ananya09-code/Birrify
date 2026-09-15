from playwright.sync_api import sync_playwright

def get_hijra_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://hijra-bank.com/", timeout=90000)

        page.wait_for_load_state("networkidle")

        rows = page.query_selector_all("table tr")

        data = []
        CODE_MAP = {
            "Euro": "EUR",
            "Saudi Riyal": "SAR",
            "UAE Dirham": "AED",
            "US Dollar": "USD",
            "Pound Sterling": "GBP",
        }

        for row in rows[1:7]:
            cells = row.query_selector_all("td")
            row_data = [cell.inner_text().strip() for cell in cells]

            # skip bad rows
            if len(row_data) < 4:
                continue

            data.append({
                "code": CODE_MAP[row_data[0]],
                "buy": row_data[1],
                "sell": row_data[2]
            })

        browser.close()
        hijra_data={
            "bank": "hijra",
            "currencies": data
        }

        return hijra_data
    


