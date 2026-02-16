export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('https://frontendui-librarysystem.onrender.com/login');
  }

  async login(username, password) {
    await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
    
    await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
    
    await this.page.getByRole('button', { name: 'Submit login' }).click();
   
  }
}
