import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class Test(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("./chromedriver")
        driver = self.driver
        driver.get("http://www.roadtripr.fun")

    def test_about_page(self):
        driver = self.driver
        about_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[2]/a")
        about_page.click()
        self.assertEqual("http://www.roadtripr.fun/about", driver.current_url)

    def test_parks_page(self):
        driver = self.driver
        about_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[4]/a")
        about_page.click()
        self.assertEqual("http://www.roadtripr.fun/parks", driver.current_url)

    def test_cities_page(self):
        driver = self.driver
        about_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[3]/a")
        about_page.click()
        self.assertEqual("http://www.roadtripr.fun/cities", driver.current_url)

    def test_restaurants_page(self):
        driver = self.driver
        about_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[5]/a")
        about_page.click()
        self.assertEqual("http://www.roadtripr.fun/restaurants", driver.current_url)

    def tearDown(self):
        self.driver.close()
"""
    def test_element_details(self):
        driver = self.driver
"""

if __name__ == "__main__":
    unittest.main()