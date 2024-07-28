const myLibrary = [
  new Book("The Hobbit", "J. R. R Tolkien", true),
  new Book("The Fellowship of the Ring", "J. R. R Tolkien", false),
];
const bookShelf = document.querySelector("#bookshelf");
const newBookButton = document.querySelector("#new-book");

function Book(title, author, read) {
  (this.title = title), (this.author = author), (this.read = read);
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function findBookInLibrary(bookTitle) {
  return myLibrary.find((book) => book.title == bookTitle);
}

function createBookFromInput() {
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let read = document.querySelector("#read").checked;

  let newBook = new Book(title, author, read);

  return newBook;
}

function newBookNode(book) {
  let bookNode = document.createElement("ul");
  bookNode.id = `${book.title}`;

  let bookTitle = document.createElement("li");
  bookTitle.innerText = book.title;

  let bookAuthor = document.createElement("li");
  bookAuthor.innerText = book.author;

  let bookRead = document.createElement("li");
  bookRead.innerText = book.read === true ? "Already read" : "Pending";

  let removeBookButton = document.createElement("button");
  removeBookButton.innerText = "Remove book";
  removeBookButton.addEventListener("click", (e) => {
    bookTitle = e.target.parentNode.id;
    book = findBookInLibrary(bookTitle);
    removeBook(book);
  });

  let toggleReadButton = document.createElement("button");
  toggleReadButton.innerText = "Mark as read/unread";
  toggleReadButton.addEventListener("click", (e) => {
    bookTitle = e.target.parentNode.id;
    book = findBookInLibrary(bookTitle);
    book.toggleRead();
    updateBookshelf();
  });

  bookNode.append(
    bookTitle,
    bookAuthor,
    bookRead,
    removeBookButton,
    toggleReadButton,
  );
  return bookNode;
}

function updateBookshelf() {
  while (bookShelf.firstChild) {
    bookShelf.removeChild(bookShelf.firstChild);
  }

  myLibrary.forEach((book) => {
    bookShelf.appendChild(newBookNode(book));
  });
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
  updateBookshelf();
}

newBookButton.addEventListener("click", (event) => {
  newBook = createBookFromInput();
  addBookToLibrary(newBook);
  bookShelf.appendChild(newBookNode(newBook));
  event.preventDefault();
});

updateBookshelf();

