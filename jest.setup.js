const {Builder, Browser, Key, until} = require('selenium-webdriver');
let driver;

beforeEach(async () => {
  global.driver = await new Builder().forBrowser(Browser.CHROME).build();
  await global.driver.get('http://localhost:3000/');
}, 20000);

afterEach(async () => {
  await global.driver.quit()
},9000);