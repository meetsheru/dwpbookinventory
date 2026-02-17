import { test, expect } from '../../utils/custom-fixtures';
import { FORM_VALIDATION_ERRORS } from "../../utils/constants"
import { USERDATA } from "../../utils/constants"



test('User with invalid credentials cannot log in and sees a validation error message', async ({ loginPage, booksPage, addBookPage } ) => {
  await loginPage.goto();
  await loginPage.login('invalid', 'invalid');

  await expect(loginPage.getLoginErrorMessages()).toHaveText(FORM_VALIDATION_ERRORS.invalid_uname_pwd);

});

test('User submits login form without entering username and password, and sees validation error messages', async ( { loginPage, booksPage, addBookPage } ) => {

  await loginPage.goto();
  await loginPage.login('', '');

  const errors = loginPage.getLoginErrorMessages();
  await expect(errors).toHaveCount(2);
  await expect(errors.nth(0)).toHaveText(FORM_VALIDATION_ERRORS.username);
  await expect(errors.nth(1)).toHaveText(FORM_VALIDATION_ERRORS.password);
});

test('User submits login form without entering password, and sees validation error messages', async ( { loginPage, booksPage, addBookPage } ) => {
 

  await loginPage.goto();
  await loginPage.login('admin', '');
  await expect(loginPage.getLoginErrorMessages()).toHaveText(FORM_VALIDATION_ERRORS.password);
});

test('User with valid credentials can log in and successfully add a new book', async ( { loginPage, booksPage, addBookPage } ) => {
  
  let count = 0;

  await loginPage.goto();
  await loginPage.login(USERDATA.username, USERDATA.password);

  await booksPage.isLoaded();

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(3); 


  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

  await addBookPage.addBook(FORM_VALIDATION_ERRORS.book);

  await booksPage.isLoaded();

  count = await booksPage.getTotalBookCount();
  expect(count).toBe(4); 

  await booksPage.validateUIElements();
  
});


test('Displays validation errors when user submits the Add Book form without entering any data', async ({ loginPage, booksPage, addBookPage  }) => {

  await loginPage.goto();
  await loginPage.login(USERDATA.username, USERDATA.password);

  await booksPage.isLoaded();
  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

  await addBookPage.clickOnAddBookBtn()

  const errors = await addBookPage.getFormErrorMessages().allTextContents();

expect(errors).toEqual([
  FORM_VALIDATION_ERRORS.titleRequired,
  FORM_VALIDATION_ERRORS.authorRequired,
  FORM_VALIDATION_ERRORS.genreRequired,
  FORM_VALIDATION_ERRORS.isbnRequired,
  FORM_VALIDATION_ERRORS.publicationDateRequired,
  FORM_VALIDATION_ERRORS.priceRequired,
]);

});

test('Displays validation error when title exceeds 20 characters', async ({ loginPage, booksPage, addBookPage  }) => {

  await loginPage.goto();
  await loginPage.login(USERDATA.username, USERDATA.password);

  await booksPage.isLoaded();
  await booksPage.validateUIElements();

  await booksPage.clickAddBook();

   await addBookPage.addBook(FORM_VALIDATION_ERRORS.invalidbook);

  await addBookPage.clickOnAddBookBtn()

  const errors = await addBookPage.getFormErrorMessages().allTextContents();

expect(errors).toEqual([
  FORM_VALIDATION_ERRORS.titleExceedData,
]);

});

