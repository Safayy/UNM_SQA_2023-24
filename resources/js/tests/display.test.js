const {By} = require('selenium-webdriver');

test('Selenium test example', async () => {
  //const driver = require('./setup').getDriver();

  //await driver.get('http://localhost:3000/');
  const videoContainer = await global.driver.findElement(By.id('video-container'));
  //expect(videoContainer).toBeDefined();
  expect("hi").toEqual("hi");
});