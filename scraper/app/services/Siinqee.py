from math import sin

from playwright.sync_api import sync_playwright

def get_siinqee_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://siinqeebank.com/", timeout=60000)

        page.wait_for_load_state("networkidle")

        button = page.locator("#exchange").first

        button.wait_for(state="attached")
        button.click(force=True)
        page.wait_for_timeout(5000)

        rows = page.query_selector_all("table tr")

        data = []

        for row in rows[1:10]:
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
        siinqee_data={
            "bank": "siinqee",
            "currencies": data
        }

        return siinqee_data
    

