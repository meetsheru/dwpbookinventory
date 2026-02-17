import { test, expect } from "../../utils/custom-fixtures";
import { FORM_VALIDATION_ERRORS } from "../../utils/constants";

test("User with invalid credentials cannot log in and sees a validation error message", async ({
  loginPage
}) => {
  await loginPage.goto();
  await loginPage.login("invalid", "invalid");

  await expect(await loginPage.getLoginErrorMessages()).toHaveText(
    FORM_VALIDATION_ERRORS.invalid_uname_pwd,
  );
});

test("User submits login form without entering username and password, and sees validation error messages", async ({
  loginPage
}) => {
  await loginPage.goto();
  await loginPage.login("", "");

  const errors = await loginPage.getLoginErrorMessages();
  await expect(errors).toHaveCount(2);
  await expect(errors.nth(0)).toHaveText(FORM_VALIDATION_ERRORS.username);
  await expect(errors.nth(1)).toHaveText(FORM_VALIDATION_ERRORS.password);
});

test("User submits login form without entering password, and sees validation error messages", async ({
  loginPage
}) => {
  await loginPage.goto();
  await loginPage.login("admin", "");
  await expect(await loginPage.getLoginErrorMessages()).toHaveText(
    FORM_VALIDATION_ERRORS.password,
  );
});
