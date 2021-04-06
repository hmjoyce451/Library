const cardContainer = document.getElementById('card-container');
const addBookBtn = document.getElementById('add-book-btn');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');
const pagesInput = document.getElementById('pages-input');

let myLibrary = [];

window.addEventListener('load', () => {
    let storedLibrary = localStorage.getItem('library');
    if(storedLibrary !== null) {
        myLibrary = JSON.parse(storedLibrary);
        displayBooks();
    }
});

//update local storage function
function updateLocalStorage() {
    localStorage.setItem('library', JSON.stringify(myLibrary));  
}

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//add books to Library
addBookBtn.addEventListener('click', e => {
    e.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = false;

    if(title === '' || author === '' || pages === '') {
        alert('please fill in all input fields');
    } else {
        myLibrary.push(new Book(title, author, pages, read));
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



        bookPages.textContent = `${myLibrary[i].pages} pages.`;
        bookAuthor.textContent = `Written by ${myLibrary[i].author}`;
        bookTitle.textContent = myLibrary[i].title;
        

        cardContainer.appendChild(bookCard);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookPages);



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
                console.log(myLibrary);
                displayBooks();
                updateLocalStorage();
            }
        });

        //toggle button
        const readToggle = document.createElement('button');
        readToggle.innerText = 'Finished?';
        readToggle.classList.add('read-toggle');
        bookCard.appendChild(readToggle);

        readToggle.addEventListener('click', e => {
            bookCard.classList.toggle('finished');
            if(bookCard.classList.contains('finished')){
                myLibrary[i].read = true;
            } else {
                myLibrary[i].read = false;
            }
            console.log(myLibrary);
            updateLocalStorage();
        });

        //add classes for styling
        bookCard.classList.add('book-card');
        bookTitle.classList.add('book-title');
        bookAuthor.classList.add('book-author');
        bookPages.classList.add('book-pages');

        if(myLibrary[i].read === true) {
            bookCard.classList.add('finished')
        }
    }
    updateLocalStorage();
    console.log(myLibrary)
}
