from playwright.sync_api import sync_playwright

def get_bunna_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        url = "https://bunnabanksc.com/foreign-exchange/"

        page.goto(url, timeout=60000)

        page.goto(url, wait_until="domcontentloaded")

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
                "buy": row_data[2],
                "sell": row_data[3]
            })

        browser.close()
        bunna_data={
            "bank": "bunna",
            "currencies": data
        }

        return bunna_data
    
