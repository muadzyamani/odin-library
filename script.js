const form = document.querySelector('.add-book-form');
const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const addBookBtn = document.querySelector('.input.button')


class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    start() {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const book = new Book(title.value, author.value, pages.value);
            
            this.addBook(book);
            this.displayBook();
            this.clearInputBoxes();
        });
    }

    addBook(book) {
        this.books.push(book);
    }

    displayBook() {
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
                <button class="action-button" id="read-button">Not Read</button>
                <button class="action-button" id="remove-button">Remove</button>
            </div>
        `;

        // Append the top level element to the Library Container
        libraryContainer.appendChild(bookContainer);
    }

    clearInputBoxes() {
        title.value = '';
        author.value = '';
        pages.value = '';
    }
}

const library = new Library();
library.start();