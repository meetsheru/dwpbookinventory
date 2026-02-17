export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginbtn = page.getByRole("button", { name: "Submit login" });
    this.loginErrorAlert = page.getByRole("alert");
    this.loginHeading = page.getByRole("heading", {
      name: "Login",
      level: 2,
    });
  }

  async goto() {
    await this.page.goto("/login");
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginbtn.click();
  }

  async getLoginErrorMessages() {
    return this.loginErrorAlert.locator("li");
  }

  async isLoaded() {
    return await this.loginHeading.isVisible();
  }
}
