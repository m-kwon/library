function Book(title, author, pages, isRead) {
  this.title = title; // text
  this.author = author; // text
  this.pages = pages; // number
  this.isRead = isRead; // boolean
};

function Library() {
  this.books = []; // array
};

Library.prototype.addBook = function(newBook) {
  if (!this.isInLibrary(newBook)) {
    this.books.push(newBook);
  };
};

Library.prototype.removeBook = function(title) {
  this.books = this.books.filter((book) => book.title !== title);
};

Library.prototype.getBook = function(title) {
  return this.books.find((book) => book.title === title);
};

Library.prototype.isInLibrary = function(newBook) {
  return this.books.some((book) => book.title === newBook.title);
};

const library = new Library();

// User Interface
const addBookButton = document.getElementById('add-book-btn');
const addBookModal = document.getElementById('add-book-modal');
const errorMsg = document.getElementById('error-msg');
const overlay = document.getElementById('overlay');
const addBookForm = document.getElementById('add-book-form');
const booksGrid = document.getElementById('books-grid');

const openAddBookModal = () => {
  addBookForm.reset();
  addBookModal.classList.add('active');
  overlay.classList.add('active');
};

const closeAddBookModal = () => {
  addBookModal.classList.remove('active');
  overlay.classList.remove('active');
  errorMsg.classList.remove('active');
  errorMsg.textContent = '';
};

addBookButton.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;