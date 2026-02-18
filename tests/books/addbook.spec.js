import { test, expect } from "../../utils/custom-fixtures";
import { FORM_VALIDATION_ERRORS } from "../../utils/constants";
import { USERDATA } from "../../utils/constants";

test.beforeEach(async ({ loginPage, booksPage }) => {
  await loginPage.goto();
  await loginPage.login(USERDATA.username, USERDATA.password);
  await booksPage.isLoaded();
});

test("User with valid credentials can log in and successfully add a new book", async ({
  booksPage,
  addBookPage,
}) => {
  let count = 0;

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(3);
  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

  await addBookPage.addBook(FORM_VALIDATION_ERRORS.book);

  // Extracting values
  const title = await booksPage.getRowCellValue(3, 0);
  const author = await booksPage.getRowCellValue(3, 1);
  const genre = await booksPage.getRowCellValue(3, 2);
  const isbn = await booksPage.getRowCellValue(3, 3);
  const price = await booksPage.getRowCellValue(3, 5);

  // Assertions
  await expect(title).toBe(FORM_VALIDATION_ERRORS.book.title);
  await expect(author).toBe(FORM_VALIDATION_ERRORS.book.author);
  await expect(genre).toBe(FORM_VALIDATION_ERRORS.book.genre);
  await expect(isbn).toBe(FORM_VALIDATION_ERRORS.book.isbn);
  await expect(price.replace("£", "")).toBe(FORM_VALIDATION_ERRORS.book.price);

  await booksPage.isLoaded();

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(4);

  await booksPage.validateUIElements();
});

test("Displays validation errors when user submits the Add Book form without entering any data", async ({
  booksPage,
  addBookPage,
}) => {
  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

  await addBookPage.clickOnAddBookBtn();

  const errors = await addBookPage.getFormErrorMessages().allTextContents();
 // Assertions
  expect(errors).toEqual([
    FORM_VALIDATION_ERRORS.titleRequired,
    FORM_VALIDATION_ERRORS.authorRequired,
    FORM_VALIDATION_ERRORS.genreRequired,
    FORM_VALIDATION_ERRORS.isbnRequired,
    FORM_VALIDATION_ERRORS.publicationDateRequired,
    FORM_VALIDATION_ERRORS.priceRequired,
  ]);


  expect(await addBookPage.getTitleErrorMessage()).toBe(
    FORM_VALIDATION_ERRORS.titleRequired,
  );
  expect(await addBookPage.authorErrorMessage()).toBe(
    FORM_VALIDATION_ERRORS.authorRequired,
  );
  expect(await addBookPage.genreErrorMessage()).toBe(
    FORM_VALIDATION_ERRORS.genreRequired,
  );
  expect(await addBookPage.isbnErrorMessage()).toBe(
    FORM_VALIDATION_ERRORS.isbnRequired,
  );
  expect(await addBookPage.publicationDateErrorMessage()).toBe(
    FORM_VALIDATION_ERRORS.publicationDateRequired,
  );
  expect(await addBookPage.priceErrorMessage()).toBe(
    FORM_VALIDATION_ERRORS.priceRequired,
  );
});

test("Displays validation error when title exceeds 20 characters", async ({
  booksPage,
  addBookPage,
}) => {
  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

  await addBookPage.addBook(FORM_VALIDATION_ERRORS.invalidbook);

  await addBookPage.clickOnAddBookBtn();

  const errors = await addBookPage.getFormErrorMessages().allTextContents();

  expect(errors).toEqual([FORM_VALIDATION_ERRORS.titleExceedData]);
});
