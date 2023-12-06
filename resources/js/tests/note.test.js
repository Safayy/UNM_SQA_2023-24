const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

// test TC014: Write and Save Note
test('TC014', async () => {
    await driver.manage().setTimeouts({ implicit: 5000 });
    let videoIframe = await driver.wait(
        until.elementsLocated(By.css('iframe#video-container')), 9000
      );
    console.log("Next");
    // Step 1: Click on the Play button
    await new Promise(r => setTimeout(r, 1000));
    const playButton = await driver.findElement(By.id("video-container"));
    console.log("found player");
    await playButton.click();

    // Step 2: Add txt to note area
    await driver.findElement(By.id("addTxt")).sendKeys("This is Note 1");
    // Step 3: Submit note
    const notebutton = await driver.findElement(By.id("addBtn"));
    await notebutton.click();
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The note area should have the timestamp and note
    expect(combinetext).toContain("Time: 0:00");
    expect(combinetext).toContain("This is Note 1");
},10000);

//TC015: Submit multiple notes
test('TC015', async () => {
    await driver.manage().setTimeouts({ implicit: 6000 });

    let videoIframe = await driver.wait(
        until.elementsLocated(By.css('iframe#video-container')), 9000
      );

      await new Promise(r => setTimeout(r, 1000));
      const playButton = await driver.findElement(By.id("video-container"));
      console.log("found player");
      await playButton.click();
    
    // Step 2: Add txt to note area
    await driver.findElement(By.id("addTxt")).sendKeys("This is Note 1");
    // Step 3: Submit note
    const notebutton = await driver.findElement(By.id("addBtn"));
    await notebutton.click();

    await new Promise(r => setTimeout(r, 1000));   

    await driver.findElement(By.id("addTxt")).sendKeys("This is Note 2");
    // Step 3: Submit note
    await notebutton.click();
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The note area should have two notes
    expect(combinetext).toContain("This is Note 1");
    expect(combinetext).toContain("This is Note 2");
});

//TC016: Note should remain after refreshing
test('TC016', async () => {
//refresh
await driver.manage().setTimeouts({ implicit: 5000 });
    let videoIframe = await driver.wait(
        until.elementsLocated(By.css('iframe#video-container')), 9000
      );

    // Step 1: Click on the Play button
    await new Promise(r => setTimeout(r, 1000));
    const playButton = await driver.findElement(By.id("video-container"));
    console.log("found player");
    await playButton.click();

    // Step 2: Add txt to note area
    await driver.findElement(By.id("addTxt")).sendKeys("This is Note 1");
    // Step 3: Submit note
    const notebutton = await driver.findElement(By.id("addBtn"));
    await notebutton.click();
    
    //refresh page
    await driver.navigate().refresh();
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The note area should have the notes
    expect(combinetext).toContain("Time: 0:00");
    expect(combinetext).toContain("This is Note 1");
},8000);

//TC017: Certain notes should only be displayed at certain video
test('TC017', async () => {
//play video
await driver.manage().setTimeouts({ implicit: 5000 });
    let videoIframe = await driver.wait(
        until.elementsLocated(By.css('iframe#video-container')), 9000
      );

    // Step 1: Click on the Play button
    await new Promise(r => setTimeout(r, 1000));
    const playButton = await driver.findElement(By.id("video-container"));
    console.log("found player");
    await playButton.click();

    // Step 2: Add txt to note area
    await driver.findElement(By.id("addTxt")).sendKeys("This is Note 1");
    // Step 3: Submit note
    const notebutton = await driver.findElement(By.id("addBtn"));
    await notebutton.click();
    
    //select next video
    const nextVid = await driver.findElement(By.xpath('//*[@id="video-list"]/div[2]'));
    await nextVid.click();

    let nextvideoIframe = await driver.wait(
        until.elementsLocated(By.css('iframe#video-container')), 9000
    );

    await new Promise(r => setTimeout(r, 1000));

    // Step 2: Add txt to note area
    await driver.findElement(By.id("addTxt")).sendKeys("This is Video 2");
    // Step 3: Submit note
    const nextnotebutton = await driver.findElement(By.id("addBtn"));
    await nextnotebutton.click();
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The note area should only contain note of second video
    expect(combinetext).not.toContain("This is Note 1");
    expect(combinetext).toContain("This is Video 2");
//play next video
},10000);

//TC018: Highlight note
test('TC018', async () => {
    await driver.manage().setTimeouts({ implicit: 5000 });
    let videoIframe = await driver.wait(
        until.elementsLocated(By.css('iframe#video-container')), 9000
      );

    // Step 1: Click on the Play button
    await new Promise(r => setTimeout(r, 1000));
    const playButton = await driver.findElement(By.id("video-container"));
    console.log("found player");
    await playButton.click();

    // Step 2: Add txt to note area
    await driver.findElement(By.id("addTxt")).sendKeys("This is Note 1");
    // Step 3: Submit note
    const notebutton = await driver.findElement(By.id("addBtn"));
    await notebutton.click();
    
    //Detect note highlight
    const note = await driver.findElement(By.id("notes"));
    await driver.wait(until.elementLocated(By.css('.highlight')),3000);
    console.log("found highlight");
},10000);

// TC019: Edit Button
test('TC019', async () => {
//edit
    await driver.manage().setTimeouts({ implicit: 5000 });
    let videoIframe = await driver.wait(
        until.elementsLocated(By.css('iframe#video-container')), 9000
    );
    console.log("Next");
    // Step 1: Click on the Play button
    await new Promise(r => setTimeout(r, 1000));
    const playButton = await driver.findElement(By.id("video-container"));
    console.log("found player");
    await playButton.click();

    // Step 2: Add txt to note area
    await driver.findElement(By.id("addTxt")).sendKeys("This is Note 1");
    // Step 3: Submit note
    const notebutton = await driver.findElement(By.id("addBtn"));
    await notebutton.click();
    
    //Press the edit button
    const editbutton = await driver.findElement(By.id("editButton_0"));
    await editbutton.click();

    //Write and save the new note
    await driver.findElement(By.id("inputField_0")).sendKeys("This is Edited Note 1");
    const savebutton = await driver.findElement(By.id("saveButton_0"));
    await savebutton.click();

    const noteAreas = await driver.findElements(By.className("card-text"));
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The note area should have the edited note
    expect(combinetext).toContain("This is Edited Note 1");
});