import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { BooksPage } from '../../pages/BooksPage';
import { AddBookPage } from '../../pages/AddBookPage';

test.only('User can log in and add a new book', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const booksPage = new BooksPage(page);
  const addBookPage = new AddBookPage(page);

  await loginPage.goto();
  await loginPage.login('admin', 'admin');

  await booksPage.isLoaded();
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
  

});


test('Shows validation errors when adding invalid book data', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const booksPage = new BooksPage(page);
  const addBookPage = new AddBookPage(page);

  await loginPage.goto();
  await loginPage.login('admin', 'admin');


  await booksPage.isLoaded();
  await booksPage.clickAddBook();

  await addBookPage.submitEmptyForm();
  await addBookPage.expectValidationErrors();
});
