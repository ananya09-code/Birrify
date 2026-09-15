from playwright.sync_api import sync_playwright

def get_enat_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://www.enatbanksc.com/#exchange", timeout=60000)

      

        rows = page.query_selector_all(
    ".grid.gap-y-1.max-\\[1400px\\]\\:gap-y-1"
)
        data = []
        for t in rows:
            block=t.query_selector_all("div")
            for i in block:
                data.append(i.inner_text().strip())
        for n in data:
            if data.count(n)>1:
                data.remove(n)
        cleanend = []
        for i in range(0, len(data), 3):
            cleanend.append(data[i:i+3])
        final_data = []
        
        browser.close()

        for item in cleanend:
            final_data.append({
                "code": item[0],
                "buy": item[1],
                "sell": item[2]
            })
        
    return {
        "bank": "enat",
        "currencies": final_data
    }
      
     



      