const form = document.querySelector('.add-book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const addBookBtn = document.querySelector('.input.button');


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

    start() {
        this.handleInput();
    }

    handleInput() {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const book = new Book(title.value, author.value, pages.value, false);
            
            this.addBook(book);
            this.updateLibrary();
            this.clearInputBoxes();
        });
    }

    addBook(book) {
        this.books.push(book);
    }

    updateLibrary() {
        let libraryContainer = document.querySelector('.library-container')
        let bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container');

        // Use template literals to create the inner HTML
        bookContainer.innerHTML = `
            <div class="book-details-container">
                <div class="book-title">"${title.value}"</div>
                <div class="book-author">${author.value}</div>
                <div class="book-pages">${pages.value} pages</div>
            </div>
            <div class="book-actions-container">
                <button class="action-button read-button">Not Read</button>
                <button class="action-button remove-button">Remove</button>
            </div>
        `;

        // Append the top level element to the Library Container
        libraryContainer.appendChild(bookContainer);
    }

    removeBook(book) {
        this.books = this.books.filter(b => b !== book);
    }

    clearInputBoxes() {
        title.value = '';
        author.value = '';
        pages.value = '';
    }
}

const library = new Library();
library.start();