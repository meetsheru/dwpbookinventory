import { expect } from "../utils/custom-fixtures";

export class EditBookPage {
  constructor(page) {
    this.page = page;

    // Page title (assumes it's a heading role)
    this.pageTitle = page.getByRole('heading', { name: 'Edit book details' });

    // Form fields using accessible roles and labels
    this.titleInput = page.getByRole('textbox', { name: 'Title' });
    this.authorInput = page.getByRole('textbox', { name: 'Author' });
    this.genreInput = page.getByRole('textbox', { name: 'Genre' });
    this.isbnInput = page.locator('input[name="isbn"]');
    this.publicationDateInput = page.getByRole('textbox', { name: 'Publication Date' });
    this.priceInput = page.getByRole('textbox', { name: 'Price (£)' });

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

  async updateAuthor(value) {
    await this.authorInput.fill(value);
  }

  async updateGenre(value) {
    await this.genreInput.fill(value);
  }

 async updateISBN(value) {
  await expect(this.isbnInput).toBeVisible();
  await this.isbnInput.fill(value);
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
