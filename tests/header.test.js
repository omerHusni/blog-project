require('dotenv').config();

const sessionFactory = require('./factories/sessionFactory');
const userFactory = require('./factories/userFactory');
const Page = require('./helper/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('localhost:3000');
});

afterEach(async () => {
  await page.close();
});

test('the header has the correct text', async () => {
  const text = await page.getContentOf('a.brand-logo');

  expect(text).toEqual('Blogster');
});

test('clicking login starting oauth flow', async () => {
  await page.click('.right a');

  const url = await page.url();

  expect(url).toMatch(/accounts\.google\.com/);
});

test('sign in and check for logout button', async () => {
  await page.login();

  const text = await page.getContentOf('a[href="/auth/logout"]');

  expect(text).toEqual('Logout');
});
