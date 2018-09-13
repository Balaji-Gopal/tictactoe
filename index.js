/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    checkForWinOrTie();
    //computerTurn();
    //addClickHandlers();
}

function computerTurn() {
    try{
        let randomCol = Math.floor(Math.random() * 3);
        let randomRow = Math.floor(Math.random() * 3);
        if(!grid[randomCol][randomRow]){
            let computerValue = 2;
            grid[randomCol][randomRow] = 2
            renderMainGrid();
        }else{
            computerTurn();
        }
    }catch(e){
        window.alert("Its a Tie");
    }
}

function checkForWinOrTie(){
    let playerValue = 1;
    let computerValue = 2;
    var playerResult = checkForResult(1);
    if(!playerResult){
        computerTurn();
        var computerResult = checkForResult(2);
        if(computerResult){
            window.alert("Computer Won");
            highLightResult(computerResult);
        }else{
            addClickHandlers();
        }
    }else{
        window.alert("Player Won");
        highLightResult(playerResult);
    }
}

function checkForResult(checkValue){
    let result = false
    let playerWin = false
    for(var matrix = 0 ;matrix < 3 ;matrix++){
        if(grid[matrix][matrix] == checkValue && grid[matrix][matrix+1] == checkValue && grid[matrix][matrix+2] == checkValue){
            return result = [[matrix,matrix],[matrix,matrix+1],[matrix,matrix+2]];
        }else if(grid[matrix][matrix] == checkValue && grid[matrix+1][matrix] == checkValue && grid[matrix+2][matrix] == checkValue){
            return result = [[matrix,matrix],[matrix+1,matrix],[matrix+2,matrix]];
        }else if(matrix == 0 || matrix == 3){
            if(grid[matrix][matrix] == checkValue && grid[1][1] == checkValue && grid[2][2] == checkValue){
                return result = [[matrix,matrix],[1,1],[2,2]];
            }else if(grid[2][0] == checkValue && grid[1][1] == checkValue && grid[0][2] == checkValue){
                return result = [[2,0],[1,1],[0,2]];
            }else{
                return result;
            }
        }else{
            return result
        }
    }
}

function highLightResult(result){
    document.querySelector("[colIdx=\""+result[0][0].toString()+"\"][rowIdx=\""+result[0][1].toString()+"\"]").style="background:red !important";
    document.querySelector("[colIdx=\""+result[1][0].toString()+"\"][rowIdx=\""+result[1][1].toString()+"\"]").style="background:red !important";
    document.querySelector("[colIdx=\""+result[2][0].toString()+"\"][rowIdx=\""+result[2][1].toString()+"\"]").style="background:red !important";
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
