const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');

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

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot.png', screenshot, 'base64');
    console.log('Screenshot saved as screenshot.png');
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    //const noteValue = await noteAreas.getText();
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The search bar should have the selected keywords
    expect(combinetext).toContain("Time: 0:00");
    expect(combinetext).toContain("This is Note 1");
},10000);

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

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot2.png', screenshot, 'base64');
    console.log('Screenshot saved as screenshot.png');
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    //const noteValue = await noteAreas.getText();
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The search bar should have the selected keywords
    expect(combinetext).toContain("This is Note 1");
    expect(combinetext).toContain("This is Note 2");
});

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
    
    await driver.navigate().refresh();

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot3.png', screenshot, 'base64');
    console.log('Screenshot saved as screenshot.png');
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    //const noteValue = await noteAreas.getText();
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The search bar should have the selected keywords
    expect(combinetext).toContain("Time: 0:00");
    expect(combinetext).toContain("This is Note 1");
},8000);

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

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('screenshot4.png', screenshot, 'base64');
    console.log('Screenshot saved as screenshot.png');
    
    const noteAreas = await driver.findElements(By.className("card-text"));
    //const noteValue = await noteAreas.getText();
    let combinetext = '';

    for (const noteArea of noteAreas) {
        const text = await noteArea.getText();
        combinetext += text;
    }

    // Expected result: The search bar should have the selected keywords
    expect(combinetext).not.toContain("This is Note 1");
    expect(combinetext).toContain("This is Video 2");
//play next video
},10000);

// test('TC018', async () => {
// //replay
// });

// test('TC019', async () => {
// //edit
// //change text
// //save
// //refresh
// });