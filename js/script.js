let books = [];
const booksSection = document.getElementById('booksSection');
const form = document.getElementById('bookForm');

function saveBooks() {
  const booksList = JSON.stringify(books);
  localStorage.setItem('books', booksList);
}

function createBookElements() {
  booksSection.replaceChildren();
  if (books.length > 0) {
    const booksList = document.createElement('ul');
    booksList.style.listStyleType = 'none';
    booksList.style.margin = '0';
    booksList.style.padding = '0';

    books.map((b) => {
      const bookCard = document.createElement('li');

      const titleElement = document.createElement('h3');
      titleElement.style.padding = '0';
      titleElement.style.margin = '0';
      const titleText = document.createTextNode(b.title);
      titleElement.appendChild(titleText);
      bookCard.appendChild(titleElement);

      const authorElement = document.createElement('h4');
      authorElement.style.margin = '0';
      authorElement.textContent = b.author;
      bookCard.append(authorElement);

      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remove';
      removeBtn.onclick = function () {
        books = books.filter((book) => b.id !== book.id);
        saveBooks();
        createBookElements();
      };
      bookCard.appendChild(removeBtn);
      booksList.appendChild(bookCard);

      const line = document.createElement('hr');
      booksList.appendChild(line);
      return booksList;
    });

    booksSection.appendChild(booksList);
  } else {
    const noBooks = document.createElement('h3');
    noBooks.textContent = 'No books available';
    booksSection.appendChild(noBooks);
  }
}

function addBook(title, author) {
  const book = {
    title,
    author,
    id: Date.now(),
  };
  books.unshift(book);
  saveBooks();
  createBookElements();
}

function getAddedBook() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  addBook(title, author);
  form.reset();
}

function initStorage() {
  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
    createBookElements();
  } else {
    createBookElements();
  }
}

initStorage();
form.addEventListener('submit', getAddedBook);