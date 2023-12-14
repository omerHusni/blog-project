const puppeteer = require('puppeteer');
require('dotenv').config();

let browser, page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await browser.close();
});

test('the header has the correct text', async () => {
  const text = await page.$eval('a.brand-logo', (el) => el.innerHTML);

  expect(text).toEqual('Blogster');
});

test('clicking login starting oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('sign in and check for logout button', async () => {
  const id = '656621587649016db3974a44';

  const buffer = require('safe-buffer').Buffer;

  const sessionObject = {
    passport: { user: id },
  };

  const sessionString = buffer
    .from(JSON.stringify(sessionObject))
    .toString('base64');

  const Keygrip = require('keygrip');
  const key = process.env.COOKIE_KEY;

  const keygrip = new Keygrip([JSON.stringify(key)]);
  const sig = keygrip.sign('session=' + keygrip);

  await page.setCookie({ name: 'session', value: sessionString });
  await page.setCookie({ name: 'session.sig', value: sig });
  await page.goto('localhost:3000');
});
