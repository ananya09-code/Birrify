from playwright.sync_api import sync_playwright

def get_rammis_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://rammisbank.et/", timeout=60000)

        page.wait_for_load_state("networkidle")

        rows = page.query_selector_all("table tr")

        data = []

        for row in rows[1:6]:
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
        rammis_data={
            "bank": "rammis",
            "currencies": data
        }

        return rammis_data

