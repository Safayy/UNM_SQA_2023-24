const {Builder,By, until,Key} = require('selenium-webdriver');
const fs = require('fs');
const path = require('path');
const os = require('os');

test('TC001 Show Playlist', async () => {
  let videos = await driver.wait(
    until.elementsLocated(By.css('.playlist-video')), 5000
  );
  let thumbnails = await driver.wait(
    until.elementsLocated(By.css('.thumbnail')), 5000
  );
  let titles = await driver.wait(
    until.elementsLocated(By.css('.title')), 5000
  );

  expect(videos.length).toBe(12);
  expect(thumbnails.length).toBe(12);
  expect(titles.length).toBe(12);
});

test('TC001 Show Default Video', async () => {
  let videoIframe = await global.driver.wait(
    until.elementsLocated(By.css('iframe#video-container')), 9000
  );

  let iframeElement = videoIframe[0];

  await global.driver.switchTo().frame(iframeElement);
  let youtubePlayerElement = await global.driver.wait(
    until.elementsLocated(By.css('div#player')), 9000
  );
  await global.driver.switchTo().defaultContent();

  expect(youtubePlayerElement).toBeDefined();
}, 9000);


// Get title of selected video in playlist
async function getSelectedVideoTitle(){
  const titleText = await global.driver.findElement(By.css('.selected-video > .title strong')).getText();
  return titleText.trim();
}

// Returns the title of the video in the youtube iframe
async function getPlayingVideoTitle(){
  await global.driver.switchTo().frame('video-container');

  let titleSelector = 'a.yt-uix-sessionlink.ytp-title-link';
  await global.driver.wait(
    until.elementsLocated(By.css(titleSelector)), 10000
  );
  let currentVideoTitleText = await driver.findElement(By.css(titleSelector), 10000).getText();
  await global.driver.switchTo().defaultContent();
  return currentVideoTitleText.trim();
}

// Get time stamp of youtube iframe
async function getPlayingVideoTimeStamp(){
  await global.driver.switchTo().frame('video-container');

  let selector = 'span.ytp-time-current';
  await global.driver.wait(
    until.elementsLocated(By.css(selector)), 10000
  );
  let timeStampText = await driver.findElement(By.css(selector), 10000).getText();
  await global.driver.switchTo().defaultContent();
  return timeStampText.trim();
}

// Toggle the video state and return the new state
async function toggleVideoState(){
  await global.driver.switchTo().frame('video-container');

  let selector = 'button.ytp-play-button.ytp-button';
  await global.driver.wait(
    until.elementsLocated(By.css(selector)), 10000
  );
  const element = await global.driver.findElement(By.css(selector), 10000);
  element.click();
  const attributeValue = await element.getAttribute('data-title-no-tooltip');
  await global.driver.switchTo().defaultContent();
  const toggledValue = attributeValue === 'Pause' ? 'Play' : 'Pause';
  return toggledValue;
}

test('TC002 Video Nagivation', async () => {
  // Wait for components to load
  let playlist = await driver.wait(
    until.elementsLocated(By.css('.playlist-video')), 5000
  ); 
  await global.driver.wait(
    until.elementsLocated(By.css('iframe#video-container')), 9000
  );

  // Get title of currently playing video
  let initialSelectedVideoTitle = await getSelectedVideoTitle();
  let intitialPlayingVideoTitle = await getPlayingVideoTitle();
  expect(initialSelectedVideoTitle).toBe(intitialPlayingVideoTitle);

  // Change video
  playlist[1].click()
  await global.driver.sleep(2000);
  
  // Get title of currently playing video
  let secondSelectedVideoTitle = await getSelectedVideoTitle();
  let secondPlayingVideoTitle = await getPlayingVideoTitle();


  expect(secondSelectedVideoTitle).toBe(secondPlayingVideoTitle);
  expect(secondSelectedVideoTitle).not.toBe(initialSelectedVideoTitle);
});

test('TC003 Pause Video', async () => {
  // Wait for components to load
  let playlist = await driver.wait(
    until.elementsLocated(By.css('.playlist-video')), 5000
  ); 
  await global.driver.wait(
    until.elementsLocated(By.css('iframe#video-container')), 9000
  );

  // Play video
  console.log(await toggleVideoState());
  await global.driver.sleep(2000);
  let currentState = await toggleVideoState(); 

  // Get Time Stamps
  let initialTime = await getPlayingVideoTimeStamp();
  await global.driver.sleep(2000);
  let secondTime = await getPlayingVideoTimeStamp();

  // Verify time stamps and video state
  expect(initialTime).toBe(secondTime);
  expect(currentState).toBe("Pause");
}, 9000);

test('TC004 Resume Video', async () => {
  // Wait for components to load
  let playlist = await driver.wait(
    until.elementsLocated(By.css('.playlist-video')), 5000
  ); 
  await global.driver.wait(
    until.elementsLocated(By.css('iframe#video-container')), 9000
  );

  // Play video
  let currentState = await toggleVideoState(); 

  // Get Time Stamps
  let initialTime = await getPlayingVideoTimeStamp();
  await global.driver.sleep(3000);
  let secondTime = await getPlayingVideoTimeStamp();

  // Verify time stamps and video state
  expect(initialTime).toBe("0:00");
  expect(secondTime).not.toBe("0:00");
  expect(currentState).toBe("Pause");
}, 10000);

test('TC005 Stop Video ', async () => {
  // Wait for components to load
  let playlist = await driver.wait(
    until.elementsLocated(By.css('.playlist-video')), 5000
  ); 
  await global.driver.wait(
    until.elementsLocated(By.css('iframe#video-container')), 9000
  );

  // Play video
  console.log(await toggleVideoState());
  await global.driver.sleep(2000);
  let currentState = await toggleVideoState(); 

  // Get Time Stamps
  let initialTime = await getPlayingVideoTimeStamp();
  await global.driver.sleep(2000);
  let secondTime = await getPlayingVideoTimeStamp();

  // Verify time stamps and video state
  expect(initialTime).toBe(secondTime);
  expect(currentState).toBe("Pause");
}, 9000);

test('TC006 Seek forward', async () => {
  // Wait for components to load
  let playlist = await driver.wait(
    until.elementsLocated(By.css('.playlist-video')), 5000
  ); 
  await global.driver.wait(
    until.elementsLocated(By.css('iframe#video-container')), 9000
  );

  // Get Time Stamp
  let initialTime = await getPlayingVideoTimeStamp();

  // Seek forward
  await global.driver.switchTo().frame('video-container');

  let selector = 'div.ytp-left-controls';
  await global.driver.wait(
    until.elementsLocated(By.css(selector)), 10000
  );
  const element = await global.driver.findElement(By.css(selector), 10000);
  element.click();

  await global.driver.actions().sendKeys(Key.ARROW_RIGHT).perform();
  await global.driver.switchTo().defaultContent();

  // Get Time Stamp
  let secondTime = await getPlayingVideoTimeStamp();

  // Verify values
  expect(initialTime).not.toBe(secondTime);
  expect(initialTime).toBe("0:00");
  expect(secondTime).toBe("0:05");
});

test('TC007 Seek backwards', async () => {
  // Wait for components to load
  let playlist = await driver.wait(
    until.elementsLocated(By.css('.playlist-video')), 5000
  ); 
  await global.driver.wait(
    until.elementsLocated(By.css('iframe#video-container')), 9000
  );

  // Seek into the video
  await global.driver.switchTo().frame('video-container');
  let selector = 'div.ytp-left-controls';
  await global.driver.wait(
    until.elementsLocated(By.css(selector)), 10000
  );
  const element = await global.driver.findElement(By.css(selector), 10000);
  element.click();

  await global.driver.actions().sendKeys(Key.ARROW_RIGHT).perform();

  // Get initial time stamp
  await global.driver.switchTo().defaultContent();
  let initialTime = await getPlayingVideoTimeStamp();
  
  // Seek backwards
  await global.driver.switchTo().frame('video-container');
  const element2 = await global.driver.findElement(By.css(selector), 10000);
  element2.click();
  await global.driver.actions().sendKeys(Key.ARROW_LEFT).perform();
  await global.driver.switchTo().defaultContent();

  // Get Time Stamp 
  global.driver.sleep(2000)
  let secondTime = await getPlayingVideoTimeStamp();

  // Verify values
  expect(initialTime).not.toBe(secondTime);
  expect(initialTime).toBe("0:05");
  expect(secondTime).toBe("0:00");
  
});

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
    const lowerCaseTitle = titleText.toLowerCase();
    expect(lowerCaseTitle.includes("software") || lowerCaseTitle.includes("development")).toBe(true);
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
  await videoTitles.forEach((titleText) => {
      expect(titleText.toLowerCase()).toContain("selenium");
  });
});

test('TC011', async () => {
  // Set up by adding custom keyword
  const keywordsButtonSetup = await driver.findElement(By.id("dropdown-button"));
  await keywordsButtonSetup.click();

  const keywordFieldSetup = await driver.findElement(By.id("newkeyword-field"));
  await keywordFieldSetup.sendKeys("Quality");

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

  const keyword2 = await driver.findElement(By.id("Quality"));
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
  expect(searchbarValue).toBe("Software+Quality+...");
  
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
  await videoTitles.forEach((titleText) => {
    const lowerCaseTitle = titleText.toLowerCase();
    expect(lowerCaseTitle.includes("software") || lowerCaseTitle.includes("quality")).toBe(true);
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
},9000);

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
    const lowerCaseTitle = titleText.toLowerCase();
    expect(lowerCaseTitle.includes("testing") || lowerCaseTitle.includes("selenium")).toBe(true);
  });
});

//test TC014: Write and Save Note
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
},15000);

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
},15000);

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
},15000);

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
  // const note = await driver.findElement(By.id("notes"));
  // const noteclass = await note.findElement(By.className("note"));  
  let noteElement = await driver.wait(
    until.elementsLocated(By.css('.note')), 9000
  );
  let highlightedNoteElement = await driver.wait(
    until.elementsLocated(By.css('.highlight')), 9000
  );
  
  expect(await noteElement[0].getAttribute('outerHTML')).toBe(await highlightedNoteElement[0].getAttribute('outerHTML'));
},15000);


//TC019: Edit Button
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
  const downloadedFilePath = path.join("D:\\Downloads\\notes.txt");
  const exportedFileContent = fs.readFileSync(downloadedFilePath, "utf-8");
  
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
  const downloadedFilePath = path.join("D:\\Downloads\\notes (1).txt");
  const exportedFileContent = fs.readFileSync(downloadedFilePath, "utf-8");

  expect(exportedFileContent).toContain("https://www.youtube.com/watch?v=9eOBpgEXLSI");
  expect(exportedFileContent).toContain("This is test 1");
  
  // 6. Change Video
  const nextVid = await driver.findElement(By.xpath('//*[@id="video-list"]/div[2]'));
    await nextVid.click();
  
  await driver.findElement(By.id("addTxt")).sendKeys("This is test 2");
  await notebutton.click();

  // 7. Activate export function again
  await exportButton.click();
  await new Promise(resolve => setTimeout(resolve, 5000));

  const downloadedFilePath2 = path.join("D:\\Downloads\\notes (2).txt");
  const exportedFileContent2 = fs.readFileSync(downloadedFilePath2, "utf-8");

  // 6. Read exported content
  expect(exportedFileContent2).toContain("https://www.youtube.com/watch?v=ns4DvbGQHlk")
  expect(exportedFileContent2).toContain("This is test 2");
},15000);
