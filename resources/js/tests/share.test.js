const { Builder, By, until } = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');

test('TC020', async () => {
  await driver.manage().setTimeouts({ implicit: 5000 });
  let videoIframe = await driver.wait(
      until.elementsLocated(By.css('iframe#video-container')), 9000
    );
  console.log("Next");
  // 1. Activate play button
  await new Promise(r => setTimeout(r, 1000));
  const playButton = await driver.findElement(By.id("video-container"));
  console.log("found player");
  await playButton.click();

  // 2. Write note
  await driver.findElement(By.id("addTxt")).sendKeys("This is a test");

  // 3. Save note
  const notebutton = await driver.findElement(By.id("addBtn"));
  await notebutton.click();
  
  // 4. Activate export function
  const exportButton = await driver.findElement(By.id("exportBtn"));
  await exportButton.click();
  await new Promise(resolve => setTimeout(resolve, 5000));

  // 5. Read exported content
  const downloadedFilePath = path.join("C:\\Users\\Jin Shuan\\Downloads", "notes.txt"); //Hard coded path, change if possible
  const exportedFileContent = fs.readFileSync(downloadedFilePath, "utf-8");
  
  expect(exportedFileContent).toContain("https://www.youtube.com/watch?v=9eOBpgEXLSI");
  expect(exportedFileContent).toContain("This is a test");
},15000);

test('TC021', async () => {
  await driver.manage().setTimeouts({ implicit: 5000 });
  let videoIframe = await driver.wait(
      until.elementsLocated(By.css('iframe#video-container')), 9000
    );
  console.log("Next");
  // 1. Activate play button
  await new Promise(r => setTimeout(r, 1000));
  const playButton = await driver.findElement(By.id("video-container"));
  console.log("found player");
  await playButton.click();

  // 2. Write note
  await driver.findElement(By.id("addTxt")).sendKeys("This is test 1");

  // 3. Save note
  const notebutton = await driver.findElement(By.id("addBtn"));
  await notebutton.click();
  
  // 4. Activate export function
  const exportButton = await driver.findElement(By.id("exportBtn"));
  await exportButton.click();
  await new Promise(resolve => setTimeout(resolve, 5000));

  // 5. Read exported content
  const downloadedFilePath = path.join("C:\\Users\\Jin Shuan\\Downloads", "notes.txt"); //Hard coded path, change if possible
  const exportedFileContent = fs.readFileSync(downloadedFilePath, "utf-8");

  expect(exportedFileContent).toContain("This is test 1");
  
  // 6. Change Video
  const nextVid = await driver.findElement(By.xpath('//*[@id="video-list"]/div[2]'));
    await nextVid.click();
  
  await driver.findElement(By.id("addTxt")).sendKeys("This is test 2");
  await notebutton.click();

  // 7. Activate export function again
  await exportButton.click();
  await new Promise(resolve => setTimeout(resolve, 5000));

  // 8. Read exported content
  expect(exportedFileContent).toContain("This is test 2");
},15000);
