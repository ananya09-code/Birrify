from selenium import webdriver
from selenium.webdriver.chrome.options import Options

def create_driver():
    options = Options()
    driver = webdriver.Chrome(options=options)
    return driver