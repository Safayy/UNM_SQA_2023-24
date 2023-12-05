const {By, until} = require('selenium-webdriver');

test('TC001 Show Playlist', async () => {
  let videos = await driver.wait(>
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