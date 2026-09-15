from playwright.sync_api import sync_playwright

def get_amhara_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://www.amharabank.com.et/daily-exchange-rate/", timeout=60000)

        page.wait_for_load_state("networkidle")

        rows = page.query_selector_all("table tr")

        data = []
        currency={}

        for row in rows[1:9]:
            cells = row.query_selector_all("td")
            row_data = [cell.inner_text().strip() for cell in cells]

            # skip bad rows
            if len(row_data) < 4:
                continue
            code_data=row_data[1].split()[-1]
            currency_code=code_data[1:-1]
            data.append({
                "code": currency_code,
                "buy": row_data[2],
                "sell": row_data[3]
            })

        browser.close()
        amhara_data={
            "bank": "amhara",
            "currencies": data
        }

        return amhara_data
