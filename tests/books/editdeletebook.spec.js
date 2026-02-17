import { test, expect } from '../../utils/custom-fixtures';
import { FORM_VALIDATION_ERRORS } from "../../utils/constants"
import { USERDATA } from "../../utils/constants"

test.beforeEach(async ({ loginPage, booksPage }) => {
  await loginPage.goto();
  await loginPage.login(USERDATA.username, USERDATA.password);
  await booksPage.isLoaded();
});

test("User can edit and delete a book after adding it", async ({
  booksPage,
  addBookPage,
  editBookPage
}) => {
  let count = 0;

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(3);
  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

  await addBookPage.addBook(FORM_VALIDATION_ERRORS.book);

  await booksPage.isLoaded();

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(4);

  await booksPage.validateUIElements();

  // Click the Edit button in the 3rd row (index starts at 0)
  await booksPage.clickActionButtonByRow(3, 'edit');

  await editBookPage.verifyPageTitle();

  await editBookPage.updateISBN('121213143131');

  await editBookPage.saveChanges();

    await booksPage.isLoaded();

  count = await booksPage.getTotalBookCount();

  expect(count).toBe(4);

  await booksPage.clickActionButtonByRow(3, 'delete');

   count = await booksPage.getTotalBookCount();

  expect(count).toBe(3);

});

