from playwright.sync_api import sync_playwright

def get_ahadu_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://ahadubank.com/", timeout=60000)
        page.wait_for_load_state("networkidle")

        cards = page.query_selector_all(".elementor-icon-box-content")

        data = []
        seen = set()

        CODE_MAP = {
            "EURO": "EUR",
            "CANADIAN": "CAD",
            "SAUDI": "SAR",
            "UAE": "AED",
            "US": "USD",
            "POUND": "GBP",
        }

        for card in cards:
            raw_text = card.text_content()
            if not raw_text:
                continue

            clean_text = " ".join(raw_text.split())
            parts = clean_text.split()

            if len(parts) < 2:
                continue

            code = parts[0].upper()

            if code == "CURR":
                continue

            buy = ""
            sell = ""

            for i, p in enumerate(parts):

                # BUY
                if "Buying" in p:
                    value = p.replace("Buying:", "").strip()
                    buy = value if value else (parts[i + 1] if i + 1 < len(parts) else "")

                # SELL
                if "Selling" in p:
                    value = p.replace("Selling:", "").strip()
                    sell = value if value else (parts[i + 1] if i + 1 < len(parts) else "")

            # normalize code
            code = CODE_MAP.get(code, code)

            # skip duplicates + invalid rows
            if code not in seen and (buy or sell):
                seen.add(code)

                data.append({
                    "code": code,
                    "buy": buy,
                    "sell": sell
                })

        browser.close()

        return {
            "bank": "ahadu",
            "currencies": data
        }
