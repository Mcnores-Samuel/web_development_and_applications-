'use strict';

const container = document.querySelector(".main-container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const edition = document.querySelector("#edition");
const pages = document.querySelector("#pages");
const form = document.querySelector(".form");
/**
 * libraryStorage stores all the book data in objects form, can be updated;
 * displayTableHeadnfo stores the information displayed in table header, not to be updated
 */
let libraryStorage = [
    { title: "Algorithmic Thinking A Problem-Based Introduction", author: "Daniel Zingaro", edition: "unknown", totalPages: 365},
    { title: "Think Like a Programmer An Introduction to Creative Problem Solving", author: "V. Anton Spraul", edition: "unknown", totalPages: 247 },
    { title: "The love We Only Share", author: "Samuel M Nkhoma", edition: "first edition", totalPages: 234 },
    { title: "The love We Only Share", author: "Samuel M Nkhoma", edition: "first edition", totalPages: 234 }
];

/**
 * This is the book constructor, a representation of the book data per required
 * @param {*} author - string represantation of the author's name
 * @param {*} title  - book title string
 * @param {*} edition  - edition type string
 * @param {*} totalPages - total number of pages of the book
 */
function Book(title, author, edition, totalPages) {
    this.title = title;
    this.author = author;
    this.edition = edition;
    this.totalPages = totalPages;
}

/**
 * 
 * @param {*} author The book's author
 * @param {*} title the book's title
 * @param {*} edition defualt unknown and to be updated
 * @param {*} totalPages total number pages of the book
 * @returns an object with the following info of the book: author, title, edition, and pages
 */
function addBookToLibrary(title, author, edition, totalPages) {
    const book = new Book(title, author, edition, totalPages);
    return libraryStorage.push(book);
}

let collectData = () => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        (edition.value == "") ? edition.value = "Unknown" : edition.value;
        addBookToLibrary(title.value, author.value, edition.value, pages.value);
        createCard();
        resetForm();
    })
}

/**
 * This deletes Data from the LibraryStorage array and deletes the column the particular data was displayed.
 * this function assumes there will be not more than 2 books with the same name as the may cause the function 
 * to misinterprete the user's action and users may want to add books with different names as the function
 * uses the book name to locate it in the libraryStorage.
 * @param {*} e html element on  which the event carried out by the user.
 */
const deleteData = (e) => {
    const card = e.parentNode.parentNode;
    let parent = card.parentNode;
    let child = card.firstChild.firstChild.childNodes[1];
    for (let i = 0; i < libraryStorage.length; i++) {
      if (child.textContent == libraryStorage[i].title) {
        libraryStorage.splice(i, 1);
        parent.removeChild(card);
        break;
      }
    }
  };

let createCard = () => {
    container.innerHTML = '';
  
    libraryStorage.forEach((book) => {
      const card = document.createElement("div");
      const innercard = document.createElement("div");
      innercard.setAttribute("class", "innercard");
  
      const title_text = document.createElement("div");
      title_text.innerHTML = `<div class="keywords">Title</div>${book.title}`;
      innercard.appendChild(title_text);
  
      const author_text = document.createElement("div");
      author_text.innerHTML = `<div class="keywords">Author</div>${book.author}`;
      innercard.appendChild(author_text);
  
      const edition_text = document.createElement("div");
      edition_text.innerHTML = `<div class="keywords">Edition</div>${book.edition}`;
      innercard.appendChild(edition_text);
  
      const pages_text = document.createElement("div");
      pages_text.innerHTML = `<div class="keywords">Pages</div>${book.totalPages}`;
      innercard.appendChild(pages_text);
  
      const status = document.createElement("button");
      status.setAttribute("onclick", "statusUpdate(this)");
      status.textContent = "Not Read";
      status.setAttribute("class", "status");
      innercard.appendChild(status);
  
      const del = document.createElement("button");
      del.setAttribute("onclick", "deleteData(this)");
      del.setAttribute("class", "delete");
      del.textContent = "Delete";
      innercard.appendChild(del);
  
      card.appendChild(innercard);
      card.setAttribute("class", "card");
      container.appendChild(card);
    });
  };
  


/**
 * uses css display style to invoke the form in the open for data collection.
 * by defualt the form display style is set to none , while the function sets it to grid for 
 * displaying purposes.
 * The user click the add button on display to invoke the form 
 */
const invokeForm = () => {
    const btn = document.querySelector("button");
    btn.addEventListener("click", () => {
        form.style.display = "grid";
    });
}

const resetForm = () => {
    author.value = "";
    title.value = "";
    edition.value = "";
    pages.value = "";
    form.style.display = "none";
}


/**
 * This function get the length of the @libraryStorage array to display as total books
 * The total length of the array is equivalent to the book's total count.
 */
const bookcount = () => {
    const logs = document.querySelector(".book-count");
    logs.textContent = libraryStorage.length;
}


/**
 * Updates the status of the book according to the user preference on whether
 * the book has been read or not. this function listens to the user's command to indicate
 * the status of the book.
 * @param {*} e html element on which the user's event on interacting with the function.
 */
const statusUpdate = (e) => {
    if (e.textContent == "Not Read") {
        e.textContent = "Read";
        e.parentNode.parentNode.setAttribute("class", "card read");
        e.parentNode.style.backgroundColor = "#5b03038c";

    }
    else {
        e.parentNode.parentNode.setAttribute("class", "card not_read");
        e.parentNode.style.backgroundColor = "#0000008c"
        e.textContent = "Not Read";
    }
}

/**
 * This function displays total number of books whether read or not.
 * This depends on the @statusUpdate function and the total number changes on updates
 */
const countReadAndUnReadBooks = () => {
    const read = document.querySelectorAll(".read");
    const unread = document.querySelectorAll(".unread");
    const read_count = document.querySelector(".read-count");
    const not_read_count = document.querySelector(".not-read");
    read_count.textContent = read.length;
    not_read_count.textContent = unread.length;
}


/**This cancels the form if the user wishes to abort entering details. 
 * this set the form hidden from the screen.
*/
const cancelForm = (o) => {
    let cancel = o.parentNode
    cancel.style.display = "none"
}

/**Invoking the program's function */
invokeForm();
collectData();
createCard();
