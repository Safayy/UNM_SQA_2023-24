const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
let driver;

beforeEach(async () => {
  global.driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  await global.driver.get('http://localhost:3000/');
}, 9000);

afterEach(async () => {
  await driver.quit()
});

// const {Builder, Browser, By, Key, until} = require('selenium-webdriver');

// let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
// await driver.get('http://localhost:3000/');

// let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
// async function setupSelenium() {
//   driver = await new Builder().forBrowser(Browser.FIREFOX).build();
// }

// async function teardownSelenium() {
//   if (driver) {
//     try {
//       await driver.quit();
//     } catch (error) {
//       console.error('Error during Selenium teardown:', error);
//     }
//   }
// }

// module.exports = async function globalSetup() {
//   await setupSelenium();
//   global.driver = driver;
// };

// module.exports = async function globalTeardown() {
//   await teardownSelenium();
// };