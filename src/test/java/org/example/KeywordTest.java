package org.example;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class KeywordTest {

    private WebDriver driver;

    @Before
    public void setUp() {
        // Set the path to the ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "C:\\chromedriver-win64\\chromedriver.exe");

        // Specify the path to the Chrome binary (that match the ChromeDriver version)
        ChromeOptions chromeOptions = new ChromeOptions();
        chromeOptions.setBinary("C:\\chrome-win64\\chrome.exe"); // Replace with the actual path

        // Start the local server
        LocalServer.startLocalServer();

        // Create a new instance of the ChromeDriver with ChromeOptions
        driver = new ChromeDriver(chromeOptions);

        // Navigate to the local website
        driver.get("http://localhost:8000/");

    }

    @Test
    public void testVideoSearchByKeywords() {
        // Step 1: Click on the 'Keywords' button
        WebElement keywordsButton = driver.findElement(By.id("dropdown-button"));
        keywordsButton.click();

        // Step 2: Select predefined keywords (e.g., "Keyword1" and "Keyword2")
        WebElement keyword1 = driver.findElement(By.id("Software"));
        keyword1.click();
        WebElement keyword2 = driver.findElement(By.id("Development"));
        keyword2.click();

        // Step 3: Click on the 'Submit' button
        WebElement submitButton = driver.findElement(By.id("submit-button"));
        submitButton.click();

        // Expected result: The list of videos should update based on the selected keywords
        // and the search bar should show the keywords selected
        // Verify the expected result for search bar
        WebElement searchbar = driver.findElement(By.id("search-bar"));
        String searchbarValue = searchbar.getAttribute("value");

        // Expected result: The search bar should have the selected keywords
        assertEquals("Software+Development+...", searchbarValue);

        // Check if the video list contains content related
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Execute JavaScript code to retrieve video titles
        List<String> videoTitles = (List<String>) js.executeScript("var titles = []; "
                + "var titleDivs = document.getElementsByClassName('title'); "
                + "for (var i = 0; i < titleDivs.length; i++) { "
                + "    titles.push(titleDivs[i].innerText); "
                + "} "
                + "return titles;");

        // Expected result: video list should update based on the selected keywords
        for (String titleText : videoTitles) {
            assertTrue(titleText.toLowerCase().contains("software") || titleText.toLowerCase().contains("development"));
        }
    }

    @Test
    public void testVideoSearchByCustomKeyword() {
        // Step 1: Click on the 'Keywords' button
        WebElement keywordsButton = driver.findElement(By.id("dropdown-button"));
        keywordsButton.click();

        // Step 2: Enter Custom Keyword
        WebElement keywordField = driver.findElement(By.id("newkeyword-field"));
        keywordField.sendKeys("Selenium");

        // Step 3: Click on the 'Add Keyword' button
        WebElement addButton = driver.findElement(By.id("add-button"));
        addButton.click();

        // Step 4: Select custom keyword
        WebElement keyword = driver.findElement(By.id("Selenium"));
        keyword.click();

        // Step 5: Click on the 'Submit' button
        WebElement submitButton = driver.findElement(By.id("submit-button"));
        submitButton.click();

        // Expected result: The list of videos should update based on the selected new keyword
        // and the search bar should show the keyword selected
        // Verify the expected result for search bar
        WebElement searchbar = driver.findElement(By.id("search-bar"));
        String searchbarValue = searchbar.getAttribute("value");

        // Expected result: The search bar should have the selected keywords
        assertEquals("Selenium+...", searchbarValue);

        // Check if the video list contains content related
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Execute JavaScript code to retrieve video titles
        List<String> videoTitles = (List<String>) js.executeScript("var titles = []; "
                + "var titleDivs = document.getElementsByClassName('title'); "
                + "for (var i = 0; i < titleDivs.length; i++) { "
                + "    titles.push(titleDivs[i].innerText); "
                + "} "
                + "return titles;");

        // Expected result: video list should update based on the selected keywords
        for (String titleText : videoTitles) {
            assertTrue(titleText.toLowerCase().contains("selenium"));
        }
    }

    @Test
    public void testVideoSearchBySearchBar() {
        // Step 1: Click on the search bar
        WebElement searchBar = driver.findElement(By.id("search-bar"));
        searchBar.click();

        // Step 2: Enter any keywords in search bar
        searchBar.sendKeys("Testing with Selenium");

        // Step 2: Press the 'Enter' key
        searchBar.sendKeys(Keys.ENTER);

        // Expected result: The list of videos should update based on the input

        // Check if the video list contains content related
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Execute JavaScript code to retrieve video titles
        List<String> videoTitles = (List<String>) js.executeScript("var titles = []; "
                + "var titleDivs = document.getElementsByClassName('title'); "
                + "for (var i = 0; i < titleDivs.length; i++) { "
                + "    titles.push(titleDivs[i].innerText); "
                + "} "
                + "return titles;");

        // Expected result: video list should update based on the input
        for (String titleText : videoTitles) {
            assertTrue(titleText.toLowerCase().contains("testing") || titleText.toLowerCase().contains("selenium"));
        }
    }




    @After
    public void tearDown() {
        // Close the browser and stop the local server
        if (driver != null) {
            driver.quit();
        }
        LocalServer.stopLocalServer();
    }

}


