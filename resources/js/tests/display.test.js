const {By} = require('selenium-webdriver');

test('Selenium test example', async () => {
  const videoContainer = await global.driver.findElement(By.id('video-container'));
  expect(videoContainer).toBeDefined();
});

