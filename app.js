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

function displayLibrary() {
  myLibrary.forEach(book => {
    let newDiv = document.createElement("div");
    let newContent = document.createTextNode(book.info());
    newDiv.appendChild(newContent);
    document.body.appendChild(newDiv);
  })
}

let book1 = new Book("AAA", "aaa", 500, false);
let book2 = new Book("BBB", "bbb", 500, true);
let book3 = new Book("CCC", "ccc", 500, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
displayLibrary();