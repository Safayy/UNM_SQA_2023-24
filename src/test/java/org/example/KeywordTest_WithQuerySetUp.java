package org.example;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.File;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class KeywordTest_WithQuerySetUp {
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

        //Made a query
        WebElement keywordsButton = driver.findElement(By.id("dropdown-button"));
        keywordsButton.click();
        WebElement keyword1 = driver.findElement(By.id("Software"));
        keyword1.click();
        WebElement keyword2 = driver.findElement(By.id("Development"));
        keyword2.click();
        WebElement submitButton = driver.findElement(By.id("submit-button"));
        submitButton.click();
    }

    @Test
    public void testDeselectKeywords() {

        // Step 1: Deselect Keyword from the last query
        WebElement keyword = driver.findElement(By.id("Development"));
        keyword.click();

        // Step 2: Click on the 'Submit' button
        WebElement submitButton = driver.findElement(By.id("submit-button"));
        submitButton.click();

        // Expected result: The list of videos should update based on the remaining selected keywords,
        // and the search bar should reflect the updated selection
        // Verify the expected result for search bar
        WebElement searchbar = driver.findElement(By.id("search-bar"));
        String searchbarValue = searchbar.getAttribute("value");

        // Expected result: The search bar should have the selected keywords
        assertEquals("Software+...", searchbarValue);

        // Check if the video list contains content related
        JavascriptExecutor js = (JavascriptExecutor) driver;

        // Execute JavaScript code to retrieve video titles
        List<String> videoTitles = (List<String>) js.executeScript("var titles = []; "
                + "var titleDivs = document.getElementsByClassName('title'); "
                + "for (var i = 0; i < titleDivs.length; i++) { "
                + "    titles.push(titleDivs[i].innerText); "
                + "} "
                + "return titles;");

        // Expected result: video list should update based on the remaining selected keywords
        for (String titleText : videoTitles) {
            assertTrue(titleText.toLowerCase().contains("software"));
        }
    }

    @After
    public void tearDown() {
        // Close the browser and stop the local server
        if (driver != null) {
            driver.quit();
        }
        LocalServer.startLocalServer();
    }

}
