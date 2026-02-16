import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BooksPage } from '../../pages/BooksPage';
import { AddBookPage } from '../../pages/AddBookPage';




test('Verify that,User with invalid credentials cannot log in and sees a validation error message', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const booksPage = new BooksPage(page);
  const addBookPage = new AddBookPage(page);

  await loginPage.goto();
  await loginPage.login('admins', 'admins');

  await expect(loginPage.getLoginErrorMessages()).toHaveText('Invalid username or password. Please try again.');

});

test('User submits login form without entering username and password, and sees validation error messages', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const booksPage = new BooksPage(page);
  const addBookPage = new AddBookPage(page);

  await loginPage.goto();
  await loginPage.login('', '');

  const errors = loginPage.getLoginErrorMessages();
  await expect(errors).toHaveCount(2);
  await expect(errors.nth(0)).toHaveText('Please enter your username');
  await expect(errors.nth(1)).toHaveText('Please enter your password');
});

test('User submits login form without entering password, and sees validation error messages', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const booksPage = new BooksPage(page);
  const addBookPage = new AddBookPage(page);

  await loginPage.goto();
  await loginPage.login('admin', '');
  await expect(loginPage.getLoginErrorMessages()).toHaveText('Please enter your password');
});

test('Verify that, User with valid credentials can log in and successfully add a new book', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const booksPage = new BooksPage(page);
  const addBookPage = new AddBookPage(page);
  let count = 0;

  await loginPage.goto();
  await loginPage.login('admin', 'admin');

  await booksPage.isLoaded();

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(3); // Replace 12 with your expected value


  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

   const book = {
    title: 'The Gruffalo',
    author: 'Julia Donaldson',
    genre: 'Mystery',
    isbn: '9780333710937',
    price: '6.50'
  };


  await addBookPage.addBook(book);

  await booksPage.isLoaded();

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(4); // Replace 12 with your expected value

  await booksPage.validateUIElements(4);
  
});


// test('Shows validation errors when adding invalid book data', async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const booksPage = new BooksPage(page);
//   const addBookPage = new AddBookPage(page);

//   await loginPage.goto();
//   await loginPage.login('admin', 'admin');

//   await booksPage.isLoaded();
//   await booksPage.validateUIElements();

//   await booksPage.clickAddBook();


//   await addBookPage.submitEmptyForm();
//   await addBookPage.expectValidationErrors();
// });

