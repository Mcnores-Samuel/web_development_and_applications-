/**
 * This is the ALGOLYTHM AND STRUCTURE Etch-a-skech;
 * 
 * 1 Create a function that will create divs to form the grid:
 *     -The function will take a number arguement and square it
 *       and create divs according to the number squared.
 *     -This functionality is to provide number of grid boxes as the higher
 *      the number the more grid boxes will be created and the small
 *      smaller the size of grid boxes.
 * 
 * 2 Create a function as the mother functionality of the whole system;
 *    -Operations will be systematically carried out here
 *      (checking and adding event listeners to all gridboxes)
 */


const accessScale = document.querySelector("#scale");
const gridContainer = document.querySelector(".grid-container");
const choiceColor = document.querySelector("input");

let createGrid = number => {
   for (let boxNumber = 0; boxNumber < number * number; boxNumber++){
       const createdDivs = document.createElement("div");
       createdDivs.setAttribute("class", "many")
       gridContainer.appendChild(createdDivs);
   }

   gridContainer.setAttribute("style", `display: grid;
   grid-template-columns: repeat(${number}, 1fr);
   grid-template-rows: repeat(${number}, 1fr);`);
}

let  renderMode = () => {
    const renderBtn = document.querySelector("#render");
    const gridDivs = document.querySelectorAll(".many");
    let  gridView = () => {
        gridDivs.forEach(elem => {
            elem.style.border = "1px solid grey"
        })
    }

    let renderView = () => {
        gridDivs.forEach(elem => {
            elem.style.border = "none"
        });
    
    }
    renderBtn.addEventListener("click", () => {
        if (renderBtn.textContent == "GridView Mode"){
            renderBtn.textContent = "RenderView Mode"
            return gridView();
        }
        else {
            renderBtn.textContent = "GridView Mode"
            return renderView()
        }
    })
}

let buttonsFunctionality = () => {
    const accessAllButtons = document.querySelectorAll("button");
    const gridDivs = document.querySelectorAll(".many");

    accessAllButtons.forEach(item => {
        item.addEventListener("click", () => {
            if(item.textContent == "Defualt Color"){
                item.style.backgroundColor = choiceColor.value
                item.style.color = "white"
                gridDivs.forEach(element => {
                    element.addEventListener("mouseover", () => {
                        element.style.backgroundColor = choiceColor.value
                    })
                })
            }
            else if (item.textContent == "Multiple Colors"){
                gridDivs.forEach(item => {
                    item.addEventListener("mouseover", () => {
                        const num1 = Math.round(Math.random() * 255 + 1);
                        const num2 = Math.round(Math.random() * 255 + 1);
                        const num3 = Math.round(Math.random() * 255 + 1);
                        item.style.backgroundColor = `rgb(${num1}, ${num2}, ${num3})`
                    })
                })
            }
            else if (item.textContent == "Eraser"){
                gridDivs.forEach(item => {
                    item.addEventListener("mouseover", () => {
                        item.style.backgroundColor = "white"
                    })
                })
            }
            else if (item.textContent == "Clear"){
                gridDivs.forEach(item => {
                    item.style.backgroundColor = "white";
                })
            }
        })
    })


}

createGrid(accessScale.value)
renderMode();
buttonsFunctionality();
