/**
 * created two valuable to store scores from both user and 
 * the computer each time selection is made
 */
let userScore = 0;
let compScore = 0;


/**
 * This function creates a div and three button elements in the html document
 * @returns a div and nested three buttons
 */
function createPage(){
    const div = document.createElement("div");
    div.setAttribute("class", "btn-container")
    for(let i = 0; i < 3; i++){
        const btn = document.createElement("button");
        div.appendChild(btn)
    }
    return document.body.appendChild(div);
}

/**
 * This function creates text inside the buttons
 */
function btnContent(){
    let btnText = ["Restart", "rock", "paper", "scissors"];
    let btn = document.body.querySelectorAll("button");
    for(let i = 0; i < btn.length; i++){
      btn[i].textContent = btnText[i].toUpperCase();
    }
}

/**
 * This function generate a random string selection as a computer choice
 * @returns random string selection
 */
let getCompChoice = () =>{
    let options = ["rock", "paper", "scissors"];
    let random = Math.floor(Math.random() * 3);
    return options[random];
}

/**
 * This function is the core operational centre of the whole appliction
 * initilize a couple of variables and do critical operations on them;
 * It loops through each and every button selected by the user for further operations
 */
let game = () => {
    let user = document.querySelector(".userScore");
    const comp = document.querySelector(".computerScore");
    const result = document.querySelector(".result");
    const result1 = document.querySelector(".result1");
    const result2 = document.querySelector(".result2");
    const btn = document.querySelectorAll("button");

    btn.forEach(item => {
        item.addEventListener("click", () => {
            playGround(item.textContent.toLowerCase(), getCompChoice());

            if(userScore >= 5 && userScore > compScore){
                result1.textContent = "you win"
                result2.style.display = "none"
                user.style.display = "none"
                comp.style.display = "none"
                result.style.display = "none"     
                
            }
            else if (compScore >= 5 && compScore > userScore){
                result2.textContent = "computer wins"
                result1.style.display = "none"
                user.style.display = "none"
                comp.style.display = "none"
                result.style.display = "none"  
            }
        })
    })

}

/**
 * This function take input from both user and computer to make comparisons.
 * This comparisons determines further operation to be done in the game function
 * @param {*} userSelsction is a choice or a selectio by the user
 * @param {*} compSelection is the choice randomly made by the computer
 * The score are awarded to the selections in this operation
 */
let playGround = (userSelsction, compSelection) => {
    const result = document.querySelector(".result");
    const result1 = document.querySelector(".result1");
    const result2 = document.querySelector(".result2");
    const user = document.querySelector(".userScore");
    const comp = document.querySelector(".computerScore")
    if(userSelsction === compSelection){
        result1.textContent = `You selected: ${userSelsction}`;
        result2.textContent = `computer selected: ${compSelection}`
        result.textContent = `user: ${userSelsction}; comp: ${compSelection} It's a Tie`
    }
    else if (userSelsction == "rock"){
        if(compSelection == "scissors"){
            result1.textContent = `You selected: ${userSelsction}`;
            result2.textContent = `computer selected: ${compSelection}`
            result.textContent = `you scored: ${userSelsction} beats ${compSelection}`
            userScore++;
            user.textContent = userScore;

        }
        else{
            result1.textContent = `You selected: ${userSelsction}`;
            result2.textContent = `computer selected: ${compSelection}`
            result.textContent = `computer scored: ${compSelection} beats ${userSelsction}`
            compScore++;
            comp.textContent = compScore;
        }
    }
    else if (userSelsction == "paper"){
        if(compSelection == "rock"){
            result1.textContent = `You selected: ${userSelsction}`;
            result2.textContent = `computer selected: ${compSelection}`
            result.textContent = `you scored: ${userSelsction} beats ${compSelection}`
            userScore++;
            user.textContent = userScore;

        }
        else {
            result1.textContent = `You selected: ${userSelsction}`;
            result2.textContent = `computer selected: ${compSelection}`
            result.textContent = `computer scored: ${compSelection} beats ${userSelsction}`
            compScore++;
            comp.textContent = compScore;

        }
    }
    else if (userSelsction == "scissors"){
        if(compSelection == "paper"){
            result1.textContent = `You selected: ${userSelsction}`;
            result2.textContent = `computer selected: ${compSelection}`
            result.textContent = `you scored: ${userSelsction} beats ${compSelection}`
            userScore++;
            user.textContent = userScore;

        }
        else {
            result1.textContent = `You selected: ${userSelsction}`;
            result2.textContent = `computer selected: ${compSelection}`
            result.textContent = `computer scored: ${compSelection} beats ${userSelsction}`
            compScore++;
            comp.textContent = compScore;
        }
    }
    
}

function restart(){
    let rBtn = document.querySelector(".restart");
    rBtn.addEventListener("click", () => {
        window.location.reload()
    })
}

createPage()
btnContent()
game();
restart();
