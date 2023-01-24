// const form = document.querySelector('.add-book-form');
// const title = document.querySelector('#title');
// const author = document.querySelector('#author');
// const pages = document.querySelector('#pages');
// const addBookBtn = document.querySelector('.input.button');


// class Book {
//     constructor(title, author, pages, isRead) {
//         this.title = title;
//         this.author = author;
//         this.pages = pages;
//         this.isRead = isRead;
//     }
// }

// class Library {
//     constructor() {
//         this.books = [];
//     }

//     start() {
//         this.handleInput();
//     }

//     handleInput() {
//         form.addEventListener('submit', (event) => {
//             event.preventDefault();
//             const book = new Book(title.value, author.value, pages.value, false);
            
//             this.addBook(book);
//             this.updateLibrary();
//             this.clearInputBoxes();
//         });
//     }

//     addBook(book) {
//         this.books.push(book);
//     }

//     updateLibrary() {
//         let libraryContainer = document.querySelector('.library-container')
//         let bookContainer = document.createElement('div');
//         bookContainer.classList.add('book-container');

//         // Use template literals to create the inner HTML
//         bookContainer.innerHTML = `
//             <div class="book-details-container">
//                 <div class="book-title">"${title.value}"</div>
//                 <div class="book-author">${author.value}</div>
//                 <div class="book-pages">${pages.value} pages</div>
//             </div>
//             <div class="book-actions-container">
//                 <button class="action-button read-button">Not Read</button>
//                 <button class="action-button remove-button">Remove</button>
//             </div>
//         `;

//         // Append the top level element to the Library Container
//         libraryContainer.appendChild(bookContainer);
//     }

//     removeBook(book) {
//         this.books = this.books.filter(b => b !== book);
//     }

//     clearInputBoxes() {
//         title.value = '';
//         author.value = '';
//         pages.value = '';
//     }
// }

// const library = new Library();
// library.start();

//-----------------------------

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
        const objWithIDIndex = this.books.findIndex((book) => book.id === id);
        this.books.splice(objWithIDIndex, 1);
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
    library.removeBook(event.target.parentElement.parentElement.id);
});