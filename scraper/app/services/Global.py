from playwright.sync_api import sync_playwright
import re


def clean_item(item):
    parts = re.split(r'\s+', item.strip())

    if not parts or parts[0] in ["Currency"]:
        return None

    numbers = [p for p in parts if p.replace('.', '', 1).isdigit()]

    if len(numbers) < 2:
        return None

    return {
        "code": parts[0],
        "buy": numbers[0],
        "sell": numbers[1]
    }


def get_global_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://www.globalbankethiopia.com/", timeout=60000)
        page.wait_for_load_state("networkidle")

        rows = page.query_selector_all("table tr")

        data = []

        for row in rows[1:5]:
            text = row.inner_text().strip()
            data.append(text)

        browser.close()

    # CLEAN AFTER SCRAPING
    cleaned = list(filter(None, map(clean_item, data)))

    return {
        "bank": "global",
        "currencies": cleaned
    }


