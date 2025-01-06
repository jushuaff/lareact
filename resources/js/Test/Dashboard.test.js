import { Builder, By } from 'selenium-webdriver';
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
    const searchInput = await driver.findElement(By.css('input[placeholder="Search music by title or artist..."]'));
    expect(searchInput).to.exist;
  });

  after(async function () {
    await driver.quit();
  });
});