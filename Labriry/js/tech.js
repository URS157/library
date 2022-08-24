
//Data Stracture
class Book {
    constructor(title, author, pages) {
        this.title = title,
        this.author = author,
        this.pages = pages
    };
}
//UI class: 
class UI {
    static displayBook() {
      const storedBooks = Store.getBook();
      const books = storedBooks;
      books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.pages}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">❌</a></td>
        `;
        list.appendChild(row);
    }
    static deleteBook(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //Vanish in 3s
        setTimeout(() => document.querySelector('.alert').remove(), 
         1000);
    }
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
    }
};
//localStorage
class Store {
    static getBook() {
      let books;
      if(localStorage.getItem('books') === null){
        books = [];
      }else {
      books = JSON.parse(localStorage.getItem('books')); 
      }
      return books;
    };

    static addBook(book) {
     const books = Store.getBook();
     books.push(book)
     localStorage.setItem('books', JSON.stringify(books));
    };

    static removeBook(pages) {
      const books = Store.getBook();

      books.forEach((book, index) => {
        if(book.pages === pages) {
            books.splice(index, 1);
        }

      });
      localStorage.setItem('books', JSON.stringify(books));
    }
}
//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBook);
//Event: Add book
document.querySelector('#book-form').addEventListener('submit',function (e) {
        //Prevent actial submit
        e.preventDefault();
        //get value
        const title = document.querySelector('#title').value;
        const author = document.querySelector('#author').value;
        const pages = document.querySelector('#pages').value;

        //Valided
        if(title === '' || author === '' || pages ==='') {
          UI.showAlert('Please enter all informations...', 'danger');
        } else {
            //Instatial book 
            const book = new Book(title, author, pages);
           //add book to UI
           UI.addBookToList(book);
           //add book to store
           Store.addBook(book);
           //show success message
           UI.showAlert('Book Added', 'success')
           //clear fields
           UI.clearFields();
        }

    });
    //Event: remove book
    document.querySelector('#book-list').addEventListener('click', (e) => {
        //Remove book from UI
       UI.deleteBook(e.target);
       //Remove book from Store
       Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
       //show success remove
       UI.showAlert('Book Removed', 'secondary');
    })
    