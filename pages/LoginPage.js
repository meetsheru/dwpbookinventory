export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByRole("textbox", { name: "Username" });
    this.password = page.getByRole("textbox", { name: "Password" });
    this.loginbtn = page.getByRole("button", { name: "Submit login" });
    this.loginErrorAlert = page.getByRole("alert");
  }

  async goto() {
    await this.page.goto("https://frontendui-librarysystem.onrender.com/login");
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginbtn.click();
  }

  getLoginErrorMessages() {
    return this.loginErrorAlert.locator("li");
  }
}
