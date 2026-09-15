from playwright.sync_api import sync_playwright


def scrap(rows, data):
    for row in rows[1:7]:  # skip header
        cells = row.query_selector_all("td")
        row_data = [cell.inner_text().strip() for cell in cells]

        if len(row_data) < 4:
            continue

        data.append({
            "code": row_data[1],
            "buy": row_data[2],
            "sell": row_data[3]
        })


def get_Development_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://dbe.com.et/", timeout=60000)
        page.wait_for_load_state("networkidle")

        data = []

        for _ in range(4):  # 4 pages
            rows = page.query_selector_all("table tr")
            scrap(rows, data)

            # go next page
            next_btn = page.locator(".paginate_button.next").first

            if next_btn.count() == 0:
                break

            try:
                next_btn.click(force=True)
                page.wait_for_timeout(2000)
            except:
                break

        browser.close()

        return {
            "bank": "development",
            "currencies": data
        }