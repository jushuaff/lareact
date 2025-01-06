import * as webdriver from 'selenium-webdriver';
const { Builder, By, until } = webdriver;
import { Options } from 'selenium-webdriver/firefox.js';
import * as chai from 'chai';
const { expect } = chai;

describe('Dashboard Component Test', function () {
  let driver;

  this.timeout(30000);

  const options = new Options();
  options.addArguments('--headless');

  const url = 'http://localhost:8000/dashboard';

  before(async function () {
    driver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();
  });

  it('should verify the presence of a search input', async function () {
    await driver.get(url);

    try {
      // Wait for the search input element to be present
      const wait = webdriver.WebDriverWait(driver, 20); // 20 seconds timeout
      const searchInput = wait.until(webdriver.ExpectedConditions.presenceOfElementLocated((By.id, 'search')));

      expect(searchInput).to.exist;
    } catch (error) {
      throw new Error(`Test failed: The 'search' input element was not found within the timeout period.`);
    }
  });

  after(async function () {
    await driver.quit();
  });
});