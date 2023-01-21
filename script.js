const title = document.querySelector('.title');
const pages = document.querySelector('.pages');
const button = document.querySelector('.btn');
const list = document.querySelector('.output-list');
const bookCount = document.querySelector('.book-count');

let books = [];

button.addEventListener('click', () => {
    console.log(`Title: ${title.value} | No. of Pages: ${pages.value}`);
    
    // create new book object
    let book = {title: title.value, pages:pages.value};
    
    // append object to array
    books.push(book);

    // add to html as li
    const listContent = document.createElement('li');
    listContent.innerHTML = `Title: ${title.value} | No. of Pages: ${pages.value}`;
    list.appendChild(listContent);

    // update book count
    bookCount.innerHTML = `Book Count: ${books.length}`;

    // clear input boxes
    title.value = '';
    pages.value = '';
});