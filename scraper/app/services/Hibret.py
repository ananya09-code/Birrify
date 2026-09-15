from playwright.sync_api import sync_playwright

def get_hibret_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto(
            "https://www.hibretbank.com.et/about/exchange-rate/",
            timeout=60000,
            wait_until="domcontentloaded"
        )

        page.wait_for_timeout(3000)

        page.wait_for_selector("table")

        rows = page.query_selector_all("table tr")

        data = []

        for row in rows[2:]:
            cells = row.query_selector_all("td")
            row_data = [cell.inner_text().strip() for cell in cells]

            if len(row_data) < 4:
                continue

            data.append({
                "code": row_data[1],
                "buy": row_data[2],
                "sell": row_data[3]
            })

        browser.close()

        return {
            "bank": "hibret",
            "currencies": data
        }
