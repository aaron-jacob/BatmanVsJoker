const X_CLASS = 'x'
const CIRCLE_CLASS ='circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')

const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

let circleTurn
let circleTurnBeginning = true
let xwins = 0
let owins = 0
let draws = 0
document.querySelector(".score[data='drawpts']").textContent = draws;
document.querySelector(".score[data='jokepts']").textContent = owins;
document.querySelector(".score[data='batpts']").textContent = xwins;

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurnBeginning = !circleTurnBeginning
    circleTurn = circleTurnBeginning
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})   
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        
        if(currentClass == CIRCLE_CLASS) {
            owins = owins+1
        }
        else if(currentClass == X_CLASS) {
            xwins = xwins+1
        }

        setTimeout(endGame, 500, false)
    }
    else if (isDraw ()) {
        draws = draws+1
        setTimeout(endGame, 500, true)
    }
    else {
        swapTurns()
        setBoardHoverClass()
    }

}

function endGame(draw)
{
    if(draw) {
        document.querySelector(".score[data='drawpts']").textContent = draws;
        winningMessageTextElement.innerText = 'An Unstoppable Force Meets An Immovable Object'
    }
    else {
        if(circleTurn) {
            document.querySelector(".score[data='jokepts']").textContent = owins;
            winningMessageTextElement.innerText = 'Lets put a smile on that face - Joker'
        }
        else {
            document.querySelector(".score[data='batpts']").textContent = xwins;
            winningMessageTextElement.innerText = 'Its not who I am underneath but what I do that defines me - Batman'
        }
        
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    }
    else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS)||
        cell.classList.contains(CIRCLE_CLASS)
    })
}
