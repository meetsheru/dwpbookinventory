export class AddBookPage {
  constructor(page) {
    this.page = page;

    this.titleInput = page.getByRole("textbox", { name: "Title" });
    this.authorInput = page.getByRole("textbox", { name: "Author" });
    this.genreDropdown = page.getByRole("combobox", { name: "Genre" });
    this.isbnInput = page.getByRole("textbox", { name: "ISBN" });
    this.publicationDateInput = page.getByRole("textbox", {
      name: "Publication Date",
    });
    this.priceInput = page.getByRole("textbox", { name: "Price" });

    // Submit button
    this.addBookButton = page.getByRole("button", {
      name: "Submit Add New Book Form",
    });

    this.titleError = page.locator("#title-error");
    this.authorError = page.locator("#author-error");
    this.genreError = page.locator("#genre-error");
    this.isbnError = page.locator("#isbn-error");
    this.publicationDateError = page.locator("#publicationDate-error");
    this.priceError = page.locator("#price-error");
  }

  /**
   * `supply the book object with required data
   * @param {{
   *   title: string,
   *   author: string,
   *   genre: string,
   *   isbn: string,
   *   price: string
   * }} book
   */
  async fillBookForm(book) {
    await this.titleInput.fill(book.title);

    await this.authorInput.fill(book.author);

    await this.genreDropdown.selectOption({ label: book.genre });

    await this.isbnInput.fill(book.isbn);

    const today = new Date().toISOString().split("T")[0];
    await this.publicationDateInput.fill(today);

    await this.priceInput.fill(book.price);
  }

  async clickOnAddBookBtn() {
    await this.addBookButton.click();
    await this.page.waitForTimeout(2000);
  }

  async addBook(book) {
    await this.fillBookForm(book);
    await this.addBookButton.click();
  }

  getFormErrorMessages() {
    return this.page.getByRole("alert").locator("li");
  }

  async getTitleErrorMessage() {
    return await this.titleError.innerText();
  }

  async authorErrorMessage() {
    return await this.authorError.innerText();
  }

  async genreErrorMessage() {
    return await this.genreError.innerText();
  }
  async isbnErrorMessage() {
    return await this.isbnError.innerText();
  }

   async publicationDateErrorMessage() {
    return await this.publicationDateError.innerText();
  }
   async priceErrorMessage() {
    return await this.priceError.innerText();
  }
}
