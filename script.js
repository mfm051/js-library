const myLibrary = [
  new Book("The Hobbit", "J. R. R Tolkien", true),
  new Book("The Fellowship of the Ring", "J. R. R Tolkien", false),
];
const bookShelf = document.querySelector("#bookshelf");
const newBookButton = document.querySelector("#new-book");

function Book(title, author, read) {
  (this.title = title), (this.author = author), (this.read = read);
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
    removeBookByTitle(e.target.parentNode.id);
  });

  bookNode.append(bookTitle, bookAuthor, bookRead, removeBookButton);
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

function removeBookByTitle(bookTitle) {
  bookIndex = myLibrary.findIndex((book) => book.title === bookTitle);
  myLibrary.splice(bookIndex, 1);
  updateBookshelf();
}

newBookButton.addEventListener("click", (event) => {
  newBook = createBookFromInput();
  addBookToLibrary(newBook);
  bookShelf.appendChild(newBookNode(newBook));
  event.preventDefault();
});

updateBookshelf();

