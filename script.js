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
                <button class="action-button not-read-button">Not Read</button>
                <button class="action-button remove-button">Remove</button>
            </div>
        `;

        libraryContainer.appendChild(bookContainer);        
    }

    static removeBook(element) {
        element.parentElement.parentElement.remove();
    }

    static toggleReadStatus(element) {
        if (element.innerHTML === 'Not Read') {
            element.innerHTML = 'Read';
            element.className = 'action-button read-button';
            
        } else {
            element.innerHTML = 'Not Read';
            element.className = 'action-button not-read-button';
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
        const bookIndex = this.books.findIndex((book) => parseFloat(book.id) === parseFloat(id));
        this.books.splice(bookIndex, 1);
    }

    toggleReadStatus(id) {
        const bookIndex = this.books.findIndex((book) => parseFloat(book.id) === parseFloat(id));
        this.books[bookIndex].isRead = !this.books[bookIndex].isRead;
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

function checkButtonPressed(event) {
    // Remove a Book
    if (event.target.classList.contains('remove-button')) {
        // Remove book from UI
        UI.removeBook(event.target);

        // Remove book from Library
        library.removeBook(event.target.parentElement.parentElement.id);
    } 
    // Read a Book
    else if (event.target.classList.contains('read-button') || event.target.classList.contains('not-read-button')) {
        // Toggle read book status
        UI.toggleReadStatus(event.target);

        // Toggle read book status in library
        library.toggleReadStatus(event.target.parentElement.parentElement.id);
    }
}

// Event: Check Book Action
document.querySelector('.library-container').addEventListener('click', (event) => {
    checkButtonPressed(event);
});