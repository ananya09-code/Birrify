from playwright.sync_api import sync_playwright

def get_dashen_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://dashenbanksc.com/daily-exchange-rates-2/", timeout=60000)

        page.wait_for_load_state("networkidle")

        rows = page.query_selector_all("table tr")

        data = []

        for row in rows[1:10]:
            cells = row.query_selector_all("td")
            row_data = [cell.inner_text().strip() for cell in cells]

            # skip bad rows
            if len(row_data) < 4:
                continue

            data.append({
                "code": row_data[0],
                "buy": row_data[2],
                "sell": row_data[3]
            })

        browser.close()
        das_data={
            "bank": "dashen",
            "currencies": data
        }

        return das_data