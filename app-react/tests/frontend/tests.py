import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class Test(unittest.TestCase):

    def setUp(self):
        self.driver = webdriver.Chrome("./chromedriver")
        self.driver.implicitly_wait(20)
        driver = self.driver
        driver.get("http://www.roadtripr.fun")

# Navigation
    def test_about_page(self):
        driver = self.driver
        about_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[2]/a")
        about_page.click()
        self.assertEqual("http://www.roadtripr.fun/about", driver.current_url)

    def test_parks_page(self):
        driver = self.driver
        parks_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[4]/a")
        parks_page.click()
        self.assertEqual("http://www.roadtripr.fun/parks", driver.current_url)

    def test_cities_page(self):
        driver = self.driver
        cities_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[3]/a")
        cities_page.click()
        self.assertEqual("http://www.roadtripr.fun/cities", driver.current_url)

    def test_restaurants_page(self):
        driver = self.driver
        restaurants_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[5]/a")
        restaurants_page.click()
        self.assertEqual("http://www.roadtripr.fun/restaurants", driver.current_url)

    def tearDown(self):
        self.driver.close()
"""
#   Test Instances
    def test_cities_instance(self):
        driver = self.driver
        cities_page = driver.find_element_by_link_text("Cities")
        cities_page.click()
        cities = driver.find_element_by_xpath("")
        cities.click()
        assert "Population" in driver.page_source
        assert "Nearby Restaurants" in driver.page_source
        assert "Nearby Parks" in driver.page_source

# Navigation between instances
    def test_navigation(self):
        driver = self.driver
        parks_page = driver.find_element_by_link_text("Parks")
        parks_page.click()
        park = driver.find_element_by_xpath("")
        park.click()
        cities = driver.find_element_by_xpath("")
        cities.click()
        assert "Population" in driver.page_source
        assert "Nearby Restaurants" in driver.page_source
        assert "Nearby Parks" in driver.page_source
"""

if __name__ == "__main__":
    unittest.main()