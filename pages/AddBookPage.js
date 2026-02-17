
export class AddBookPage {
 
  constructor(page) {
    this.page = page;

    this.titleInput = page.getByRole('textbox', { name: 'Title' });
    this.authorInput = page.getByRole('textbox', { name: 'Author' });
    this.genreDropdown = page.getByRole('combobox', { name: 'Genre' });
    this.isbnInput = page.getByRole('textbox', { name: 'ISBN' });
    this.publicationDateInput = page.getByRole('textbox', { name: 'Publication Date' });
    this.priceInput = page.getByRole('textbox', { name: 'Price' });

    // Submit button
    this.addBookButton = page.getByRole('button', { name: 'Submit Add New Book Form' });

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
    
    const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
    await this.publicationDateInput.fill(today);
    
    await this.priceInput.fill(book.price);
  }
  
  async clickOnAddBookBtn(){
    await this.addBookButton.click();
     await this.page.waitForTimeout(2000)
  }

  async addBook(book) {
    await this.fillBookForm(book);
    await this.addBookButton.click();
  }

  getFormErrorMessages() {
  return this.page.getByRole('alert').locator('li');
  }

}
