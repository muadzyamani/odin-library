// Book Class: Represents a Book
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = this.generateBookID();
        this.isRead = isRead;
    }

    generateBookID() {
        return Math.floor(Math.random() * 1000000);
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBooks() {
        const books = [];

        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const libraryContainer = document.querySelector('.library-container')
        const bookContainer = document.createElement('div');
        bookContainer.classList.add('book-container');
        bookContainer.setAttribute('id', book.id)

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
    }

    static removeBook(element) {
        if(element.classList.contains('remove-button')) {
            element.parentElement.parentElement.remove();
        }
    }

    static toggleReadStatus(element) {
        if(element.classList.contains('read-button')) {
            if (element.innerHTML === 'Not Read') {
                element.innerHTML = 'Read';
                element.style.background = '#9fff9c';
            } else {
                element.innerHTML = 'Not Read';
                element.style.background = '#ff9c9c';
            }
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    }
}

// Library Class: Handles Library Tasks
class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(id) {
        const bookIndex = this.books.findIndex((book) => book.id === id);
        console.log(bookIndex); // index given is '-1', need to fix
        this.books.splice(bookIndex, 1);
    }

    toggleReadStatus(id) {
        console.log(id);
        const bookIndex = this.books.findIndex((book) => book.id === id);
        console.log(bookIndex);
    }
}

// Instantiate Library
const library = new Library();

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('.add-book-form').addEventListener('submit', (event) => {
    // Prevent actual submit
    event.preventDefault();

    // Get form input
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;

    // Instantiate Book
    const book = new Book(title, author, pages, false);

    // Add Book to UI
    UI.addBookToList(book);

    // Add Book to Library
    library.addBook(book);

    // Clear fields
    UI.clearFields();
});

// Event: Remove a Book
document.querySelector('.library-container').addEventListener('click', (event) => {
    // Remove book from UI
    UI.removeBook(event.target);

    // Remove book from Library
    console.log(event.target.parentElement.parentElement.id)
    library.removeBook(event.target.parentElement.parentElement.id);
});

// Event: Read a Book
document.querySelector('.library-container').addEventListener('click', (event) => {
   // Toggle read book status
   UI.toggleReadStatus(event.target);

   // Toggle read book status in library (need to fix)
   library.toggleReadStatus(event.target.parentElement.parentElement.id);
});