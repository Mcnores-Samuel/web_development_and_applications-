'use strict';

const container = document.querySelector(".main-container");
const  title= document.querySelector("#title");
const author = document.querySelector("#author");
const edition = document.querySelector("#edition");
const pages = document.querySelector("#pages");
const form = document.querySelector(".form");
/**
 * libraryStorage stores all the book data in objects form, can be updated;
 * displayTableHeadnfo stores the information displayed in table header, not to be updated
 */
let libraryStorage = [];

/**
 * This is the book constructor, a representation of the book data per required
 * @param {*} author - string represantation of the author's name
 * @param {*} title  - book title string
 * @param {*} edition  - edition type string
 * @param {*} totalPages - total number of pages of the book
 */
function Book(title, author, edition, totalPages){
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
function addBookToLibrary(title, author, edition, totalPages){
    const book = new Book(title, author, edition, totalPages);
    return libraryStorage.push(book);
}

let collectData = () => {
    form.addEventListener("submit", (event)=> {
        event.preventDefault();
        (edition.value == "") ? edition.value = "Unknown" : edition.value;
        addBookToLibrary(title.value, author.value, edition.value, parseInt(pages.value));
        resetForm();
    })
}

let createCard = () => {
    const classname = ["top", "middle", "bottom"];
    const card = document.createElement("div");
    const innercard = document.createElement("div");

    for (let i = 0; i < 3; i++) {
        const innerdiv = document.createElement("div");
        const inner = document.createElement("div");
        inner.setAttribute("class", `${classname[i]}`)
        innerdiv.appendChild(inner);
        innercard.appendChild(innerdiv);
    }
    innercard.setAttribute("class", "innercard");
    card.appendChild(innercard);
    card.setAttribute("class", "card");
    return (card);
}

let displayBook = () => {
    const topSector = document.querySelector(".top");
    container.appendChild(createCard());
}


/**
 * uses css display style to invoke the form in the open for data collection.
 * by defualt the form display style is set to none , while the function sets it to grid for 
 * displaying purposes.
 * The user click the add button on display to invoke the form 
 */
const invokeForm = () => {
    const btn = document.querySelector("button");
    btn.addEventListener("click", ()=>{
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
const bookcount = ()=> {
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
    if(e.textContent == "Not Read"){
        e.textContent = "Read"
        e.parentNode.parentNode.style.backgroundColor = "#770505bf"
        e.parentNode.parentNode.setAttribute("class", "read");
        countReadAndUnReadBooks();
    }
    else{
        e.textContent = "Not Read";
        e.parentNode.parentNode.style.backgroundColor = "#020222bf";
        e.parentNode.parentNode.setAttribute("class", "unread");
        countReadAndUnReadBooks();
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

/**
 * This deletes Data from the LibraryStorage array and deletes the column the particular data was displayed.
 * this function assumes there will be not more than 2 books with the same name as the may cause the function 
 * to misinterprete the user's action and users may want to add books with different names as the function
 * uses the book name to locate it in the libraryStorage.
 * @param {*} e html element on  which the event carried out by the user.
 */
const deleteData = (e) => {
    const child = e.parentNode.parentNode;
    let parent = child.parentNode;
    let childText = child.firstChild.textContent;
    for(let i = 0; i < libraryStorage.length; i++){
        if(libraryStorage[i].title == childText){
            libraryStorage.splice(i, 1);
            bookcount();
            parent.removeChild(child);
            countReadAndUnReadBooks();
        }
    }
}

/**This cancels the form if the user wishes to abort entering details. 
 * this set the form hidden from the screen.
*/
const cancelForm = (o) =>{
    let cancel = o.parentNode
    cancel.style.display = "none"
}

/**Invoking the program's function */
invokeForm();
collectData();
