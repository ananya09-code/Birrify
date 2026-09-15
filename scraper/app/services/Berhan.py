from playwright.sync_api import sync_playwright

def get_berhan_rates():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        page.goto("https://berhanbanksc.com/exchange-rates/", timeout=60000)

        # wait for table
        page.wait_for_selector(".tableContainer")

        table= page.query_selector_all(".tableContainer")
        data = []
      
        for t in table:
            box=t.query_selector_all(".row.customRow.mb-2") 
            for b in box:
                cells = b.query_selector_all(".col-3")
                code_data=b.query_selector_all("span")
                for c in code_data:
                  if len(c.text_content().strip()) < 20:
                    data.append(c.text_content().strip())

                for cell in cells:
                  if len(cell.text_content().strip()) < 10:
                   data.append(cell.text_content().strip())

        browser.close()  
        
        chunks = [data[i:i+3] for i in range(0, len(data), 3)]
        cleaned_data = []
        for chunk in chunks:
            if len(chunk) == 3:
                cleaned_data.append({
                    "code": chunk[0].split()[1],
                    "buy": chunk[1],
                    "sell": chunk[2]
                })

        berhan_data={
            "bank": "berhan",
            "rates": cleaned_data
        }

        return berhan_data

