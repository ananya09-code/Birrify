from playwright.sync_api import sync_playwright

def get_awash_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://awashbank.com/exchange-historical", timeout=60000)

        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(2000)

        rows = page.locator("table tbody tr")

        data = []
        seen = set()

        for i in range(rows.count()):
            row = rows.nth(i)
            cells = row.locator("td")

            row_data = [cells.nth(j).inner_text().strip() for j in range(cells.count())]

            if not row_data:
                continue

            key = row_data[0]

            if key in seen:
                continue

            seen.add(key)
            data.append(row_data)

        browser.close()
        awe_data = {
       "bank": "awash",
       "currencies": []}
        for r in data[3:]:
            awe_data["currencies"].append({
                'code':r[0],
                'buy':r[1],
                'sell':r[2]
            })
        return awe_data

