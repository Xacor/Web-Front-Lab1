'use strict'

function initBoard() {
    let board = document.getElementById('board');
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        board.append(cell);
    }
    return board;
}

function checkWinner() {
    let cells = document.querySelectorAll('.cell');
    return checkRows(cells) || checkColumns(cells) || checkMainDiag(cells) || checkSiteDiag(cells);

}

function checkRows(cells) {
    let hasWinner;
    for (let i = 0; i < 3; i++) {
        hasWinner = cells[i * 3 + j].innerHTML != '';
        if (!hasWinner) continue;
        for (let j = 0; j < 3 - 1; j++) {
            if (!hasWinner || cells[i * 3 + j].innerHTML != cells[i * 3 + j + 1].innerHTML) {
                hasWinner = false;
                break;
            }
        }
        if (hasWinner) return cells[i * 3].innerHTML;
    }
    return null;
}

function checkColumns(cells) {
    let hasWinner;
    for (let i = 0; i < 3; i++) {
        hasWinner = cells[i].innerHTML != '';
        if (!hasWinner) continue;
        for (let j = 0; j < 3 - 1; j++) {
            if (!hasWinner || cells[j * 3 + i].innerHTML != cells[j * 3 + i + 1].innerHTML) {
                hasWinner = false;
                break;
            }
        }
        if (hasWinner) return cells[j * 3].innerHTML;
    }
    return null;
}

function checkMainDiag(cells) {
    let hasWinner = cells[0].innerHTML != '';
    for (let i = 0; i < 3 - 1; i++) {
        if (!hasWinner || cells[i * 3 + i].innerHTML != cells[(i + 1) * 3 + (i + 1)].innerHTML)
            return null;
    }
    
    return hasWinner ? cells[0].innerHTML : null;
    
}

function checkSiteDiag(cells) {
    let hasWinner = cells[2].innerHTML != '';
    for (let i = 0; i < 3 - 1; i++) {
        if (!hasWinner || cells[i * 3 + 2 - i].innerHTML != cells[(i + 1) * 3 + 2 - (i + 1)].innerHTML)
            return null;
    }

    return hasWinner ? cells[2].innerHTML : null;
}

function clickHandler(event) {
    let winner;
    if (event.target.className == 'cell') {
        if (event.target.innerHTML != '') {
            alert('Эта клетка уже занята');
            return;
        }
        
        event.target.innerHTML = turn === 0 ? 'O' : 'X';
        turn = (turn + 1) % 2;
        winner = checkWinner();
        if (winner || !checkAvailableSteps()) {
            alert(winner ? `${winner} победил!` : 'ничья');
            gameOver = true;
        }
    }
}

function checkAvailableSteps() {
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        if (cell.innerHTML == '') return true;
    }
    return false;
}

function newGame() {
    let cells = document.querySelectorAll('.cell');
    for (let cell of cells) {
        cell.innerHTML = '';
    }
}

// 0 -- 0, 1 -- x
let turn = 1;

window.onload = function () {
    let board = initBoard();
    board.addEventListener('click', clickHandler);
    document.querySelector('.new-game-btn').addEventListener('click', newGame);
    // let cells = document.querySelectorAll('.cell');
    // for (let cell of cells) {
    //     cell.addEventListener('click', clickHandler);
    // }
}