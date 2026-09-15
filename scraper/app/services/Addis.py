from playwright.sync_api import sync_playwright

def get_addis_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://www.addisbanksc.com/", timeout=60000)

        page.wait_for_load_state("networkidle")

        button = page.locator(".sticky-button").first

        button.wait_for(state="attached")
        button.click(force=True)
        page.wait_for_timeout(3000)
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
                "buy": row_data[1] if not row_data[1]=="0.0000" else " ",
                "sell": row_data[2] if not row_data[2]=="0.0000" else " ",
            })

        browser.close()
        addis_data={
            "bank": "addis",
            "currencies": data
        }

        return addis_data
