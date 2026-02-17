import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BooksPage } from "../pages/BooksPage";
import { AddBookPage } from "../pages/AddBookPage";
import { EditBookPage } from "../pages/EditBookPage";

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
  editBookPage: async ({ page }, use) => {
    await use(new EditBookPage(page));
  },
});

export { expect } from "@playwright/test";
