function Book(title, author, pages, isRead) {
  this.title = title // text
  this.author = author // text
  this.pages = pages // number
  this.isRead = isRead // boolean
}

function Library(books) {
  this.books = []; // array
}

Library.prototype.addBook = function(newBook) {
  if (!this.isInLibrary(newBook)) {
    this.books.push(newBook)
  }
}

Library.prototype.removeBook = function(title) {
  this.books = this.books.filter((book) => book.title !== title)
}

Library.prototype.getBook = function(title) {
  return this.books.find((book) => book.title === title)
}

Library.prototype.isInLibrary = function(newBook) {
  return this.books.some((book) => book.title === newBook.title)
}

const library = new Library();
const book1 = new Book("AAA", "aaa", 100, true);
library.addBook(book1);
console.log(library);