let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //Player O
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

    boxes.forEach(box =>{
        box.innerText="";
        box.classList.remove("x-style", "o-style");
        box.style.backgroundColor = "";
    });

};

boxes.forEach((box)=>{
    box.addEventListener("click", () =>{
        if(turnO){
            box.innerText = "O";
            box.classList.add("o-style");
            turnO = false;
            
        }
        else{
            box.innerText = "X";
            box.classList.add("x-style");
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        if(count === 9 && !isWinner)
        {
            gameDraw();
        }

    });
});

const gameDraw = () =>{
    msg.innerText = `Game was a Draw.`
    msgContainer.classList.remove("hide");
    disableBoxes();
}
const disableBoxes =() =>{
    for(let box of boxes){
        box.disabled = true;
    }
};
const enableBoxes =() =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};
const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () =>{
    for(let pattern of winPatterns){
        
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 != "" && pos2 != "" && pos3 != ""){

            if(pos1 === pos2 && pos2 === pos3){
                boxes[pattern[0]].style.backgroundColor = "#90EE90"; 
                boxes[pattern[1]].style.backgroundColor = "#90EE90";
                boxes[pattern[2]].style.backgroundColor = "#90EE90";
                showWinner(pos1);
                return true;
            }

        }
    }
};
newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);