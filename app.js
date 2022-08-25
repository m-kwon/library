let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead ? "read" : "not read yet"
}

Book.prototype.info = function() {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

let book = new Book("LOTR", "J.R.R. Tolkien", 500, false);
console.log(book.info());