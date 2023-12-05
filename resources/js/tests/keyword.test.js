const { By, Key } = require('selenium-webdriver');

test('TC008', async () => {
    // Step 1: Click on the 'Keywords' button
    const keywordsButton = await driver.findElement(By.id("dropdown-button"));
    await keywordsButton.click();

    // Step 2: Select predefined keywords (e.g., "Keyword1" and "Keyword2")
    const keyword1 = await driver.findElement(By.id("Software"));
    await keyword1.click();
    const keyword2 = await driver.findElement(By.id("Development"));
    await keyword2.click();

    // Step 3: Click on the 'Submit' button
    const submitButton = await driver.findElement(By.id("submit-button"));
    await submitButton.click();

    // Expected result: The list of videos should update based on the selected keywords
    // and the search bar should show the keywords selected
    // Verify the expected result for search bar
    const searchbar = await driver.findElement(By.id("search-bar"));
    const searchbarValue = await searchbar.getAttribute("value");

    // Expected result: The search bar should have the selected keywords
    expect(searchbarValue).toBe("Software+Development+...");

    // Check if the video list contains content related
    const videoTitles = await driver.executeScript(() => {
        const titles = [];
        const titleDivs = document.getElementsByClassName('title');
        for (let i = 0; i < titleDivs.length; i++) {
            titles.push(titleDivs[i].innerText);
        }
        return titles;
    });

    // Expected result: video list should update based on the selected keywords
    videoTitles.forEach((titleText) => {
        expect(titleText.toLowerCase()).toContain("software") || titleText.toLowerCase().toContain("development");
    });
});

test('TC009', async () => {
    // Set up by making a query
    const keywordsButton = await driver.findElement(By.id("dropdown-button"));
    await keywordsButton.click();

    const keyword1 = await driver.findElement(By.id("Software"));
    await keyword1.click();

    const keyword2 = await driver.findElement(By.id("Development"));
    await keyword2.click();

    const submitButton = await driver.findElement(By.id("submit-button"));
    await submitButton.click();

    // Step 1: Deselect Keyword from the last query
    await keyword2.click();

    // Step 2: Click on the 'Submit' button
    await submitButton.click();

    // Expected result: The list of videos should update based on the remaining selected keywords,
    // and the search bar should reflect the updated selection

    // Verify the expected result for the search bar
    const searchbar = await driver.findElement(By.id("search-bar"));
    const searchbarValue = await searchbar.getAttribute("value");

    // Expected result: The search bar should have the selected keywords
    expect(searchbarValue).toBe("Software+...");

    // Check if the video list contains content related
    const videoTitles = await driver.executeScript(() => {
        const titles = [];
        const titleDivs = document.getElementsByClassName('title');
        for (let i = 0; i < titleDivs.length; i++) {
            titles.push(titleDivs[i].innerText);
        }
        return titles;
    });

    // Expected result: video list should update based on the remaining selected keywords
    videoTitles.forEach((titleText) => {
        expect(titleText.toLowerCase()).toContain("software");
    });
});

test('TC010', async () => {
    // Step 1: Click on the 'Keywords' button
    const keywordsButton = await driver.findElement(By.id("dropdown-button"));
    await keywordsButton.click();

    // Step 2: Enter Custom Keyword
    const keywordField = await driver.findElement(By.id("newkeyword-field"));
    await keywordField.sendKeys("Selenium");

    // Step 3: Click on the 'Add Keyword' button
    const addButton = await driver.findElement(By.id("add-button"));
    await addButton.click();

    // Step 4: Select custom keyword
    const keyword = await driver.findElement(By.id("Selenium"));
    await keyword.click();

    // Step 5: Click on the 'Submit' button
    const submitButton = await driver.findElement(By.id("submit-button"));
    await submitButton.click();

    // Expected result: The list of videos should update based on the selected new keyword
    // and the search bar should show the keyword selected

    // Verify the expected result for search bar
    const searchbar = await driver.findElement(By.id("search-bar"));
    const searchbarValue = await searchbar.getAttribute("value");

    // Expected result: The search bar should have the selected keywords
    expect(searchbarValue).toBe("Selenium+...");

    // Check if the video list contains content related
    const videoTitles = await driver.executeScript(() => {
        const titles = [];
        const titleDivs = document.getElementsByClassName('title');
        for (let i = 0; i < titleDivs.length; i++) {
            titles.push(titleDivs[i].innerText);
        }
        return titles;
    });

    // Expected result: video list should update based on the selected keywords
    videoTitles.forEach((titleText) => {
        expect(titleText.toLowerCase()).toContain("selenium");
    });
});

test('TC011', async () => {
    // Set up by adding custom keyword
    const keywordsButtonSetup = await driver.findElement(By.id("dropdown-button"));
    await keywordsButtonSetup.click();

    const keywordFieldSetup = await driver.findElement(By.id("newkeyword-field"));
    await keywordFieldSetup.sendKeys("Selenium");

    const addButtonSetup = await driver.findElement(By.id("add-button"));
    await addButtonSetup.click();

    const keywordsButtonAfterSetup = await driver.findElement(By.id("dropdown-button"));
    await keywordsButtonAfterSetup.click();

    // Step 1: Click on the 'Keywords' button
    const keywordsButton = await driver.findElement(By.id("dropdown-button"));
    await keywordsButton.click();

    // Step 2: Select predefined keywords and custom keyword
    const keyword1 = await driver.findElement(By.id("Software"));
    await keyword1.click();

    const keyword2 = await driver.findElement(By.id("Selenium"));
    await keyword2.click();

    // Step 3: Click on the 'Submit' button
    const submitButton = await driver.findElement(By.id("submit-button"));
    await submitButton.click();

    // Expected result: The list of videos should update based on the selected keywords
    // and the search bar should show the keywords selected

    // Verify the expected result for search bar
    const searchbar = await driver.findElement(By.id("search-bar"));
    const searchbarValue = await searchbar.getAttribute("value");

    // Expected result: The search bar should have the selected keywords
    expect(searchbarValue).toBe("Software+Selenium+...");

    // Check if the video list contains content related
    const videoTitles = await driver.executeScript(() => {
        const titles = [];
        const titleDivs = document.getElementsByClassName('title');
        for (let i = 0; i < titleDivs.length; i++) {
            titles.push(titleDivs[i].innerText);
        }
        return titles;
    });

    // Expected result: video list should update based on the selected keywords
    videoTitles.forEach((titleText) => {
        expect(titleText.toLowerCase()).toContain("software") || titleText.toLowerCase().toContain("selenium");
    });
});

test('TC012', async () => {
    // Set up by adding custom keyword
    const keywordsButtonSetup = await driver.findElement(By.id("dropdown-button"));
    await keywordsButtonSetup.click();

    const keywordFieldSetup = await driver.findElement(By.id("newkeyword-field"));
    await keywordFieldSetup.sendKeys("Selenium");

    const addButtonSetup = await driver.findElement(By.id("add-button"));
    await addButtonSetup.click();

    const keywordsButtonAfterSetup = await driver.findElement(By.id("dropdown-button"));
    await keywordsButtonAfterSetup.click();

    // Step 1: Refresh the page
    await driver.navigate().refresh();

    // Step 2: Click on the 'Keywords' button
    const keywordsButton = await driver.findElement(By.id("dropdown-button"));
    await keywordsButton.click();

    // Find the new keyword element
    const newKeyword = await driver.findElement(By.id("Selenium"));

    // Expected result: the custom keyword should remain in the keywords list
    // If the element does not return null means element is found and the new keyword remains after refresh
    expect(newKeyword).not.toBeNull();
});

test('TC013', async () => {
    // Step 1: Click on the search bar
    const searchBar = await driver.findElement(By.id("search-bar"));
    await searchBar.click();

    // Step 2: Enter any keywords in the search bar
    await searchBar.sendKeys("Testing with Selenium");

    // Step 3: Press the 'Enter' key
    await searchBar.sendKeys(Key.ENTER);

    // Expected result: The list of videos should update based on the input

    // Check if the video list contains content related
    const videoTitles = await driver.executeScript(() => {
        const titles = [];
        const titleDivs = document.getElementsByClassName('title');
        for (let i = 0; i < titleDivs.length; i++) {
            titles.push(titleDivs[i].innerText);
        }
        return titles;
    });

    // Expected result: video list should update based on the input
    videoTitles.forEach((titleText) => {
        expect(titleText.toLowerCase()).toContain("testing") || titleText.toLowerCase().toContain("selenium");
    });
});

