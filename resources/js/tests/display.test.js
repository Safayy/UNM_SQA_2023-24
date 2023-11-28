const {By} = require('selenium-webdriver');

test('TC001 ', async () => {
  const videoContainer = await global.driver.findElement(By.id('video-container'));
  expect(videoContainer).toBeDefined();
});