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


    # Test Instances
    def test_cities_instance(self):
        driver = self.driver
        cities_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[3]/a")
        cities_page.click()
        cities = driver.find_element_by_xpath("//*[@id='portfolio']/div/div/div[2]/div/div/p/a")
        cities.click()
        assert "Pop." in driver.page_source
        assert "Nearby Restaurants" in driver.page_source
        assert "Nearby Parks" in driver.page_source

#   Navigation between instances
    def test_navigation(self):
        driver = self.driver
        parks_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[4]/a")
        parks_page.click()
        park = driver.find_element_by_xpath("//*[@id='portfolio']/div/div/div[2]/div/div/p/a")
        park.click()
        cities = driver.find_element_by_xpath("//*[@id='about']/div/div/div/div/p[8]/a")
        cities.click()
        assert "Pop." in driver.page_source
        assert "Nearby Restaurants" in driver.page_source
        assert "Nearby Parks" in driver.page_source

#   Search Functionality
    def test_search(self):
        driver = self.driver
        search_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[6]/form/input")
        search_page.send_keys("york")
        search_page.send_keys(Keys.RETURN)
        driver.implicitly_wait(3)
        assert "Search" in driver.page_source

    def test_search_no_results(self):
        driver = self.driver
        search_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[6]/form/input")
        search_page.send_keys("asdf")
        search_page.send_keys(Keys.RETURN)
        driver.implicitly_wait(3)    
        assert "No results found." in driver.page_source

#   Pagination
    def test_pagination(self):
        driver = self.driver
        parks_page = driver.find_element_by_xpath("//*[@id='nav-menu-container']/ul/li[4]/a")
        parks_page.click()
        driver.implicitly_wait(3)
        paging = driver.find_element_by_xpath("//*[@id='root']/div/main/div/div/ul")
        assert "1" in driver.page_source
        paging_next = driver.find_element_by_xpath("//*[@id='root']/div/main/div/div/ul/li[8]/a")
        paging_next.click()
        driver.find_element_by_xpath("//*[@id='root']/div/main/div/div/ul/li[8]/a").click()
        driver.find_element_by_xpath("//*[@id='root']/div/main/div/div/ul/li[8]/a").click()
        driver.find_element_by_xpath("//*[@id='root']/div/main/div/div/ul/li[8]/a").click()
        driver.find_element_by_xpath("//*[@id='root']/div/main/div/div/ul/li[8]/a").click()
        assert "6" in driver.page_source


    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()