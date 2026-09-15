from playwright.sync_api import sync_playwright

def get_abay_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto(
            "http://www.abaybank.com.et/",
            timeout=60000,
            wait_until="domcontentloaded"
        )

        page.wait_for_timeout(3000)

        page.wait_for_selector("table")

        rows = page.query_selector_all("table tr")

        data = []

        for row in rows[12:]:
            cells = row.query_selector_all("td")
            row_data = [cell.inner_text().strip() for cell in cells]

            if len(row_data) < 3:
                continue

            data.append({
                "code": row_data[0],
                "buy": row_data[1],
                "sell": row_data[2]
            })

        browser.close()

        return {
            "bank": "abay",
            "currencies": data
        }