from playwright.sync_api import sync_playwright

def get_zemen_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)

        page = browser.new_page()

        page.goto(
            "https://zemenbank.com/exchange-rates/",
            timeout=60000
        )

        page.wait_for_load_state("networkidle")

        page.locator('button[data-target="cash"]').first.click()

        page.wait_for_timeout(3000)

        rows = page.query_selector_all(".exr-row")

        data = []

        for row in rows:
          cells = row.query_selector_all(".exr-column")

          row_data = [
             " ".join(cell.text_content().split())
                  for cell in cells
                     ]

          data.append(row_data)
          cleaned_data = []
          for item in data[8:16]:
              if len(item) >= 3:
                  cleaned_data.append({
                      "code": item[0].split()[0],
                      "buy": item[1],
                      "sell": item[2]
                  })

        

        browser.close()

        zemen_data={
            "bank": "zemen",
            "currencies": cleaned_data
        }

        return zemen_data

