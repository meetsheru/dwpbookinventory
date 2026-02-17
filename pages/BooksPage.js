import { expect } from "@playwright/test";
export class BooksPage {
  constructor(page) {
    this.page = page;

    // Welcome Headings
    this.welcome = page.getByRole("heading", {
      name: "Welcome, Admin",
      level: 2,
    });

    // Headings and labels
    this.heading = page.getByRole("heading", { name: "Book List", level: 2 });

    // Buttons
    this.addBookButton = page.getByRole("button", { name: "Add Book" });
    this.previousButton = page.getByRole("button", { name: "Previous" });
    this.nextButton = page.getByRole("button", { name: "Next" });

    // Table headers
    this.columnHeaders = [
      "Title",
      "Author",
      "Genre",
      "ISBN",
      "Publication Date",
      "Price",
      "Actions",
    ].map((header) => page.getByRole("columnheader", { name: header }));

    // Pagination and summary
    this.pageIndicator = page.getByText(/Page \d+ of \d+/);
    this.totalCount = page.getByText(/Total Book Titles: \d+/);

    // Table rows
    this.tableRows = page.locator("table tbody tr");

    this.logOutButton = page.getByRole('button', { name: 'Log Out' });
    
  }

  async isLoaded() {
    await this.welcome.isVisible();
  }

  async validateNextButtonIsDisabled() {
    await expect(this.nextButton).toBeVisible();
    await expect(this.nextButton).toBeDisabled();
  }

  async getTotalBookCount() {
    const text = await this.totalCount.innerText(); // e.g., "Total Book Titles: 12"
    const match = text.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }

  async validateUIElements() {
    await this.heading.isVisible();

    await this.addBookButton.isVisible();

    await this.previousButton.isVisible();

    await this.totalCount.isVisible();

    for (const header of this.columnHeaders) {
      await header.isVisible();
    }

    const rowCount = await this.tableRows.count();
    for (let i = 0; i < rowCount; i++) {
      const row = this.tableRows.nth(i);
      await row.getByRole("cell", { name: /Edit/i }).isVisible();

      await row.getByRole("cell", { name: /Delete/i }).isVisible();
    }
  }

  async clickAddBook() {
    await this.addBookButton.click();
    
  }

  async clickActionButtonByRow(rowIndex, action = "edit") {
    const row = this.page.locator("table tbody tr").nth(rowIndex);
    const buttonIndex = action.toLowerCase() === "edit" ? 0 : 1;
    const button = row.locator("button").nth(buttonIndex);
    await button.click();
  }

  async clickOnLogout(){
    await this.logOutButton.click();
    await this.page.waitForTimeout(2000);
    
  }
}
