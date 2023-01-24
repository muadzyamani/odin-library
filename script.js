// Data Structures

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(newBook) {
        this.books.push(newBook);
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title);
    }
}

const library = new Library();


// User Interface

const libraryContainer = document.querySelector('.library-container');
const addBookForm = document.querySelector('.add-book-form');
const addBookBtn = document.querySelector('.input.button');


const updateBooksContainer = () => {
    resetBooksContainer();
    for (let book of library.books) {
        createBookContainer(book);
    }
}

const resetBooksContainer = () => {
    libraryContainer.innerHTML = '';
}

const createBookContainer = (book) => {
    const bookContainer = document.createElement('div');
    bookContainer.classList.add('book-container');

    bookContainer.innerHTML = `
        <div class="book-details-container">
            <div class="book-title">"${book.title}"</div>
            <div class="book-author">${book.author}</div>
            <div class="book-pages">${book.pages} pages</div>
        </div>
        <div class="book-actions-container">
            <button class="action-button read-button">Not Read</button>
            <button class="action-button remove-button">Remove</button>
        </div>
    `;

    libraryContainer.appendChild(bookContainer);

    const removeBtn = document.querySelector('.remove-button');
    removeBtn.onclick = removeBook;
}

const getBookFromInput = () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    return new Book(title, author, pages, false);
}

const addBook = (event) => {
    event.preventDefault();
    const newBook = getBookFromInput();

    library.addBook(newBook);
    updateBooksContainer();
}

const removeBook = (event) => {
    const title = event.target.parentNode.previousElementSibling.querySelector('.book-title').innerHTML.replaceAll('"', '');

    console.log(event.target.parentNode.previousElementSibling.querySelector('.book-title').innerHTML);

    library.removeBook(title);
    updateBooksContainer();
}

addBookForm.onsubmit = addBook;