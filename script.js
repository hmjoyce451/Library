const cardContainer = document.getElementById('card-container');
const addBookBtn = document.getElementById('add-book-btn');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pagesInput = document.getElementById('pages-input');

let myLibrary = [];

function Book (title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

//add books to Library
addBookBtn.addEventListener('click', e => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    if(title === '' || author === '' || pages === '') {
        alert('please fill in all input fields');
    } else {
        myLibrary.push(new Book(title, author, pages));
    } 

    displayBooks();

    //clear input values
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
});

//Display books to DOM
function displayBooks() {
    cardContainer.innerHTML = '';
    for(let i=0; i<myLibrary.length; i++) {

        const bookCard = document.createElement('div');
        const bookTitle = document.createElement('p');
        const bookAuthor = document.createElement('p');
        const bookPages = document.createElement('p');
        const bookRead = document.createElement('p');


        bookRead.textContent = myLibrary[i].read;
        bookPages.textContent = `${myLibrary[i].pages} pages.`;
        bookAuthor.textContent = `Written by ${myLibrary[i].author}`;
        bookTitle.textContent = myLibrary[i].title;

        cardContainer.appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);
        bookCard.appendChild(bookRead);

        //add remove button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        bookCard.appendChild(removeBtn);
        removeBtn.innerText = 'x';
        //remove button functionality
        removeBtn.addEventListener('click', e => {
            const target = e.target;
            if(target.classList.contains('remove-btn')) {
                target.parentElement.remove();
                if(myLibrary.length > 0) {
                    myLibrary.splice(i, 1);
                } else if (myLibrary.length === 1) {
                    myLibrary = [];
                }
                console.log(myLibrary)
            }
        });
        //toggle button
        const readToggle = document.createElement('input');
        readToggle.type = 'checkbox';
        readToggle.classList.add('read-toggle');
        bookCard.appendChild(readToggle);

        readToggle.addEventListener('click', e => {
            bookCard.classList.toggle('finished');
        });

        //add text to checkbox
        const finishedReading = document.createElement('p');
        finishedReading.textContent = 'Finished?';
        finishedReading.classList.add('toggle-text');
        bookCard.appendChild(finishedReading);

        //add classes for styling
        bookCard.classList.add('book-card');
        bookTitle.classList.add('book-title');
        bookAuthor.classList.add('book-author');
        bookPages.classList.add('book-pages');
        bookRead.classList.add('book-read');
    }
}

