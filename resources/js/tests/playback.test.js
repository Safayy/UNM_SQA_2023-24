const {By, until, Key} = require('selenium-webdriver');

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

  console.log(`Initial
  initialSelectedVideoTitle=${initialSelectedVideoTitle}
  intitialPlayingVideoTitle=${intitialPlayingVideoTitle}

  secondSelectedVideoTitle=${secondSelectedVideoTitle}
  secondPlayingVideoTitle=${secondPlayingVideoTitle}`)

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
  expect(currentState).toBe("Play");
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
});

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

  await global.driver.actions().sendKeys(Key.ARROW_RIGHT).sendKeys(Key.ARROW_RIGHT).perform();

  // Get initial time stamp
  await global.driver.switchTo().defaultContent();
  let initialTime = await getPlayingVideoTimeStamp();
  
  // Seek backwards
  await global.driver.switchTo().frame('video-container');
  await global.driver.actions().sendKeys(Key.ARROW_LEFT).perform();
  await global.driver.switchTo().defaultContent();

  // Get Time Stamp
  let secondTime = await getPlayingVideoTimeStamp();

  // Verify values
  expect(initialTime).not.toBe(secondTime);
  expect(initialTime).toBe("0:10");
  expect(secondTime).toBe("0:05");
});