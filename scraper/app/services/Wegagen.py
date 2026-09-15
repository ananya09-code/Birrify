from playwright.sync_api import sync_playwright

def get_wegagen_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://www.wegagen.com/", timeout=60000)

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
                "code": row_data[1],
                "buy": row_data[3],
                "sell": row_data[4]
            })

        browser.close()
        wegagen_data={
            "bank": "wegagen",
            "currencies": data
        }

        return wegagen_data
