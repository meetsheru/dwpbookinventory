import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BooksPage } from "../pages/BooksPage";
import { AddBookPage } from "../pages/AddBookPage";

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  booksPage: async ({ page }, use) => {
    await use(new BooksPage(page));
  },
  addBookPage: async ({ page }, use) => {
    await use(new AddBookPage(page));
  },
});

export { expect } from "@playwright/test";
