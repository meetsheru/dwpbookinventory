import { expect } from "../utils/custom-fixtures";

export class EditBookPage {
  constructor(page) {
    this.page = page;

    // Page title (assumes it's a heading role)
    this.pageTitle = page.getByRole('heading', { name: 'Edit book details' });

    // Form fields using accessible roles and labels
    this.titleInput = page.locator('input[name="title"]');
    this.authorInput = page.locator('input[name="author"]');

    this.genreInput = page.locator('input[name="genre"]');
    this.isbnInput = page.locator('input[name="isbn"]');
    this.publicationDateInput = page.locator('input[name="publicationDate"]');
    this.priceInput = page.locator('input[name="price"]');

    // Save button
    this.saveChangesButton = page.getByRole('button', { name: 'Save Changes' });
  }

  async verifyPageTitle(expected = 'Edit book details') {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.pageTitle).toHaveText(expected);
  }

  async updateTitle(value) {
    await this.titleInput.fill(value);
  }

  async getTitle() {
  return await this.titleInput.inputValue();
}

  async updateAuthor(value) {
    await this.authorInput.fill(value);
  }

  async getAuthor() {
  return await this.authorInput.inputValue();
}

  async updateGenre(value) {
    await this.genreInput.fill(value);
  }

  async getGenere() {
  return await this.genreInput.inputValue();
}

 async updateISBN(value) {
  await expect(this.isbnInput).toBeVisible();
  await this.isbnInput.fill(value);
}

async getISBNValue() {
  return await this.isbnInput.inputValue();
}

  async updatePublicationDate(value) {
    await this.publicationDateInput.fill(value);
  }

  async updatePrice(value) {
    await this.priceInput.fill(value);
  }

  async saveChanges() {
    await this.saveChangesButton.click();
  }

}
