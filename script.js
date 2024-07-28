const myLibrary = [
  new Book("The Hobbit", "J. R. R Tolkien", true),
  new Book("The Fellowship of the Ring", "J. R. R Tolkien", false),
];

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

function makePrintableBook(book) {
  let printableBook = document.createElement("ul");

  let bookTitle = document.createElement("li");
  bookTitle.innerText = book.title;

  let bookAuthor = document.createElement("li");
  bookAuthor.innerText = book.author;

  let bookRead = document.createElement("li");
  bookRead.innerText = book.read === true ? "Already read" : "Pending";

  printableBook.append(bookTitle, bookAuthor, bookRead);
  return printableBook;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const bookShelf = document.querySelector("#bookshelf");

myLibrary.forEach((book) => {
  bookShelf.appendChild(makePrintableBook(book));
});

const newBookButton = document.querySelector("#new-book");

newBookButton.addEventListener("click", (event) => {
  newBook = createBookFromInput();
  addBookToLibrary(newBook);
  bookShelf.appendChild(makePrintableBook(newBook));
  event.preventDefault();
});

