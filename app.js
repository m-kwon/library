function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
};

function Library() {
  this.books = [];
};

Library.prototype.isInLibrary = function(newBook) {
  return this.books.some((book) => book.title === newBook.title);
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

const handleEscapeInput = (e) => {
  if (e.key === 'Escape') closeAddBookModal();
};

const updateBooksGrid = () => {
  resetBooksGrid();
  for (let book of library.books) {
    createBookCard(book);
  };
};

const resetBooksGrid = () => {
  booksGrid.innerHTML = '';
};

const createBookCard = (book) => {
  const bookCard = document.createElement('div');
  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const buttonGroup = document.createElement('div');
  const readButton = document.createElement('button');
  const removeButton = document.createElement('button');

  bookCard.classList.add('book-card');
  buttonGroup.classList.add('button-group');
  readButton.classList.add('btn');
  removeButton.classList.add('btn');
  readButton.onclick = toggleRead;
  removeButton.onclick = removeBook;

  title.textContent = `"${book.title}"`;
  author.textContent = book.author;
  pages.textContent = `${book.pages} pages`;
  removeButton.textContent = 'Remove';

  if (book.isRead) {
    readButton.textContent = 'Read';
    readButton.classList.add('btn-light-green');
  } else {
    readButton.textContent = 'Not read';
    readButton.classList.add('btn-light-red');
  }

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);

  buttonGroup.appendChild(readButton);
  buttonGroup.appendChild(removeButton);
  bookCard.appendChild(buttonGroup);

  booksGrid.appendChild(bookCard);
};

const getBookFromInput = () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const isRead = document.getElementById('is-read').checked;
  return new Book(title, author, pages, isRead);
};

const addBook = (e) => {
  e.preventDefault();
  const newBook = getBookFromInput();

  if (library.isInLibrary(newBook)) {
    errorMsg.textContent = 'This book is already in your library';
    errorMsg.classList.add('active');
  };

  library.addBook(newBook);
  updateBooksGrid();
  closeAddBookModal();
};

const removeBook = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('""', '');

  library.removeBook(title);
  updateBooksGrid();
};

const toggleRead = (e) => {
  const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('""', '');
  const book = library.getBook(title);

  book.isRead = !book.isRead;
  updateBooksGrid();
};

addBookButton.onclick = openAddBookModal;
overlay.onclick = closeAddBookModal;
addBookForm.onsubmit = addBook;
window.onkeydown = handleEscapeInput;