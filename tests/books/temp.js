const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage');
const { BooksPage } = require('../../pages/BooksPage');
const { AddBookPage } = require('../../pages/AddBookPage');

let loginPage;
let booksPage;
let addBookPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  booksPage = new BooksPage(page);
  addBookPage = new AddBookPage(page);

  await loginPage.goto();
});

test('User logs in and sees books list', async () => {
  await loginPage.login('admin', 'password');
  await expect(booksPage.getWelcomeMessage()).toBeVisible();
});
