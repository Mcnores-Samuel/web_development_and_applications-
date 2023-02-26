'use strict';
/**
 * libraryStorage stores all the book data in objects form, can be updated;
 * displayTableHeadnfo stores the information displayed in table header, not to be updated
 */
let libraryStorage = [];
let displayTableHeadInfo = ["Title", "Author", "Edition", "Pages", "Status", "Delete"];

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
function addBookToLibrary(author, title, edition, totalPages){
    const book = new Book(author, title, edition, totalPages);
    return libraryStorage.push(book);
}

/**
 * This function craete the form to collects the book's data.
 * the form is initially hidden until invoked.
 * @returns Appends the form to the html body and stays hidden.
 */
const createForm = () =>{
    const form = document.createElement("form");
    form.setAttribute("class", "form")
    form.innerHTML = 
    `<button class="cancel" onclick="cancelForm(this)">X</button>
    <h1>Add a book to the collection</h1>
    <label for="title">What is the title of the book 
    <input type="text" name="title" id="title" required>
    </label> 
    <label for="author">Who is the author of the book 
    <input type="text" name="author" id="author" required>
    </label>
    <label for="edition">Edition 
    <input type="text" name="edition" id="edition" required>
    </label>
    <label for="pages">How many pages 
    <input type="number" id="pages" name="pages" min="100" step=10 required>
    </label>
    <label for="submit"> 
    <input type="submit" name="submit" id="submit" value="Submit">
    </label>`
    form.style.display = "none";
  return document.body.appendChild(form);
}


/**
 * uses css display style to invoke the form in the open for data collection.
 * by defualt the form display style is set to none , while the function sets it to grid for 
 * displaying purposes.
 * The user click the add button on display to invoke the form 
 */
const invokeForm = () => {
    const btn = document.querySelector("button");
    const form = document.querySelector(".form");
    btn.addEventListener("click", ()=>{
       form.style.display = "grid";
       form[0].focus()
    })
}

/**
 * This creates the table where book data is displayed.
 * The @displayTableHeadInfo stores the table headers and are used here
 * @returns returns a table with one column cotain table headers.
 */
const createTable = () => {
    const table = document.createElement("table");
    const caption = document.createElement("caption")
    const table_row = document.createElement("tr");
    caption.textContent = "Library"
    table.appendChild(caption)
    /*creating and displaying the table heading*/
    displayTableHeadInfo.map(element => {
        const table_head = document.createElement("th");
        table_head.textContent = element;
        table_row.appendChild(table_head);
        table.appendChild(table_row);
    });
    return document.body.appendChild(table);
}

/**
 * This function listens to the submit button and on submit it collects the user entered data.
 * To collect the data for @addBookToLibray function to be added the librayStorage array for further processes.
 * The data is sent to the @addBookToLibray function and then retrieved by the same function to append a table
 * colunm with table data containing the book info from the @libraryStorage array.
 */
const collectBookDataAndDisplay = () => {
    const table = document.querySelector("table");
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const edition = document.querySelector("#edition");
    const pages = document.querySelector("#pages");
    const submit = document.querySelector("#submit");
    const form = document.querySelector(".form");

    submit.addEventListener("click", ()=>{
        if(title.value != "" && author.value != "" && pages.value != ""){
            addBookToLibrary(title.value, author.value, edition.value, pages.value);
            let bookData = libraryStorage[libraryStorage.length -1];
            const row = document.createElement("tr");
            row.setAttribute("class", "unread");
            row.innerHTML = `<td class="title">${bookData.title}</td> 
            <td>${bookData.author}</td> 
            <td>${bookData.edition}</td> 
            <td>${bookData.totalPages}</td> 
            <td><button class="update" onclick="statusUpdate(this)">Not Read</button></td>
            <td><button class="delete" onclick="deleteData(this)"> 
            <span class="mdi mdi-delete-forever-outline"></span> 
            </button></td>`;
            table.appendChild(row);
            bookcount();
            countReadAndUnReadBooks();
            title.value = "";
            author.value = "";
            edition.value = "";
            pages.value = "";
            form.style.display = "none";
        }
    })
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
createForm();
createTable();
invokeForm();
collectBookDataAndDisplay();