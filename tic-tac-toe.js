const fieldArray = [
  Nr1 = '',
  Nr2 = '',
  Nr3 = '',
  Nr4 = '',
  Nr5 = '',
  Nr6 = '',
  Nr7 = '',
  Nr8 = '',
  Nr9 = '',
]


let result = '';
let countClicks = 0;
let computerIsSymbol = 'O';
let playerIsSymbol = 'X';
let computerMode = true;
let symbolButtonActive = false;
let twoPlayerButtonSymbols = false;



function playGame(fieldNumber) {
  if (computerMode) {
    computerModus(fieldNumber);
  } else {
    twoPlayerMode(fieldNumber);
  }
}

function twoPlayerMode (fieldNumber) {
  if (fieldArray[fieldNumber] === '' && result === '') {
    let buttonField = document.querySelector(`.js-ttt-field${fieldNumber}`);
    buttonField.innerHTML = `<img src="${playerIsSymbol}image.jpg" class="image-style">`;
    
    if (playerIsSymbol === 'X') {
      fieldArray[fieldNumber] = 'playerField';
      if (result === '') {
        winConditionsUpdate();
        playerIsSymbol = 'O';
      }
    } else {
      fieldArray[fieldNumber] = 'computerField'   
      if (result === '') {
        winConditionsUpdate();
        playerIsSymbol = 'X';
      }
    }    
  }
  if (result === '' && (playerIsSymbol === 'X' || 'O')) {
    turnText();
  }
}

function turnText () {
  document.querySelector('.js-turnText').innerHTML = `
  <p>${playerIsSymbol}'s turn</p>`
}


function computerModus(fieldNumber) {
  
  if (fieldArray[fieldNumber] === '' && result === '') {
    let buttonField = document.querySelector(`.js-ttt-field${fieldNumber}`);
    buttonField.innerHTML = `<img src="${playerIsSymbol}image.jpg" class="image-style">`;
    fieldArray[fieldNumber] = 'playerField';
  
    winConditionsUpdate();

    let buttonCheck = checkIfButtonPress4('playerField');  

    if (buttonCheck <= 4 && result === '') {
      computerAlgorithm();
    }
    winConditionsUpdate();
  }
  
}




function computerAddsImage() {

  let randomNumber = Math.round(Math.random()*8);

  while (fieldArray[randomNumber] !== '') {
    randomNumber = Math.round(Math.random()*8);
  }
  let ButtonField = document.querySelector(`.js-ttt-field${randomNumber}`);
  ButtonField.innerHTML = `<img src="${computerIsSymbol}image.jpg" class="image-style">`;
  fieldArray[randomNumber] = 'computerField';
}






/*
function resetGame () {
  fieldArray[0] = '';
  fieldArray[1] = '';
  fieldArray[2] = '';
  fieldArray[3] = '';
  fieldArray[4] = '';
  fieldArray[5] = '';
  fieldArray[6] = '';
  fieldArray[7] = '';
  fieldArray[8] = '';
  document.querySelector(`.js-ttt-field0`).innerHTML = '';
  document.querySelector(`.js-ttt-field1`).innerHTML = '';
  document.querySelector(`.js-ttt-field2`).innerHTML = '';
  document.querySelector(`.js-ttt-field3`).innerHTML = '';
  document.querySelector(`.js-ttt-field4`).innerHTML = '';
  document.querySelector(`.js-ttt-field5`).innerHTML = '';
  document.querySelector(`.js-ttt-field6`).innerHTML = '';
  document.querySelector(`.js-ttt-field7`).innerHTML = '';
  document.querySelector(`.js-ttt-field8`).innerHTML = '';
  result = "";
  document.querySelector('.js-resultText').innerHTML = '';
  if (computerMode && document.querySelector('.js-change-turn').innerHTML === 'First turn: Computer') {
        computerAddsImage();
  }

  if (!computerMode) {
    playerIsSymbol = 'X';
  }

  if (playerIsSymbol === 'X') {
    computerIsSymbol = 'O';
  } else {
    computerIsSymbol = 'X';
  }
}
*/


function resetFieldArrayAndHtml (nr) {
  fieldArray[nr] = '';
  document.querySelector(`.js-ttt-field${nr}`).innerHTML = '';
}

function resetGameUpdate () {

  //First reset the field array and the HTML to an empty string.
  resetFieldArrayAndHtml(0);
  resetFieldArrayAndHtml(1);
  resetFieldArrayAndHtml(2);
  resetFieldArrayAndHtml(3);
  resetFieldArrayAndHtml(4);
  resetFieldArrayAndHtml(5);
  resetFieldArrayAndHtml(6);
  resetFieldArrayAndHtml(7);
  resetFieldArrayAndHtml(8);

  //Then reset the result variable and the result HTML to an empty string.
  result = '';
  document.querySelector('.js-resultText').innerHTML = '';

  //If we reset the page, while the button, which changes the symbol is pressed, we need to use the computerAddsImage function
  //to make sure, the computer gets the first move. 
  if (computerMode && document.querySelector('.js-change-turn').innerHTML === 'First turn: Computer') {
    computerAddsImage();
  }

  if(!computerMode) {
    if(!twoPlayerButtonSymbols) {
      playerIsSymbol = 'X';
    } else {
      playerIsSymbol = 'O';
    }
    turnText();
  }
}




/*
function winConditions () {
  if (
    (fieldArray[0]=== 'playerField' && fieldArray[1]=== 'playerField' && fieldArray [2] === 'playerField')
    ||
    (fieldArray[3]=== 'playerField' && fieldArray[4]=== 'playerField' && fieldArray [5] === 'playerField')
    ||
    (fieldArray[6]=== 'playerField' && fieldArray[7]=== 'playerField' && fieldArray [8] === 'playerField')
    ||
    (fieldArray[0]=== 'playerField' && fieldArray[3]=== 'playerField' && fieldArray [6] === 'playerField')
    ||
    (fieldArray[1]=== 'playerField' && fieldArray[4]=== 'playerField' && fieldArray [7] === 'playerField')
    ||
    (fieldArray[2]=== 'playerField' && fieldArray[5]=== 'playerField' && fieldArray [8] === 'playerField')
    ||
    (fieldArray[0]=== 'playerField' && fieldArray[4]=== 'playerField' && fieldArray [8] === 'playerField')
    ||
    (fieldArray[2]=== 'playerField' && fieldArray[4]=== 'playerField' && fieldArray [6] === 'playerField')
  ) {
    if (computerMode === true) {
      document.querySelector('.js-resultText').innerHTML = `<p class="win">You win!</p>`;
      result = 'Win';
    } else {
      result = `${playerIsSymbol}`;
      console.log(result);
      document.querySelector('.js-resultText').innerHTML = `<p class="win">${playerIsSymbol} wins!</p>`;
    }
  } else if (
    (fieldArray[0]=== 'computerField' && fieldArray[1]=== 'computerField' && fieldArray [2] === 'computerField')
    ||
    (fieldArray[3]=== 'computerField' && fieldArray[4]=== 'computerField' && fieldArray [5] === 'computerField')
    ||
    (fieldArray[6]=== 'computerField' && fieldArray[7]=== 'computerField' && fieldArray [8] === 'computerField')
    ||
    (fieldArray[0]=== 'computerField' && fieldArray[3]=== 'computerField' && fieldArray [6] === 'computerField')
    ||
    (fieldArray[1]=== 'computerField' && fieldArray[4]=== 'computerField' && fieldArray [7] === 'computerField')
    ||
    (fieldArray[2]=== 'computerField' && fieldArray[5]=== 'computerField' && fieldArray [8] === 'computerField')
    ||
    (fieldArray[0]=== 'computerField' && fieldArray[4]=== 'computerField' && fieldArray [8] === 'computerField')
    ||
    (fieldArray[2]=== 'computerField' && fieldArray[4]=== 'computerField' && fieldArray [6] === 'computerField')
  ) {
    if (computerMode === true) {
      document.querySelector('.js-resultText').innerHTML = `<p class="loss">You lose!</p>`;
      result = 'loss';
    } else {
      result = `${playerIsSymbol}`;
      console.log(result);
      document.querySelector('.js-resultText').innerHTML = `<p class="win">${playerIsSymbol} wins!</p>`;
    }
  }
}
*/

//The code above equals the code underneath, it's just a shorter and better readable updated version:

function checkWinCondition(nr1, nr2, nr3, field) {
  return fieldArray[nr1] === field && fieldArray[nr2] === field && fieldArray[nr3] === field;
}

function checkWinConditionSum(fieldType) {
  return checkWinCondition(0, 1, 2, fieldType)
  ||
  checkWinCondition(3, 4, 5, fieldType)
  ||
  checkWinCondition(6, 7, 8, fieldType)
  ||
  checkWinCondition(0, 3, 6, fieldType)
  ||
  checkWinCondition(1, 4, 7, fieldType)
  ||
  checkWinCondition(2, 5, 8, fieldType)
  ||
  checkWinCondition(0, 4, 8, fieldType)
  ||
  checkWinCondition(2, 4, 6, fieldType);
}

function winConditionsUpdate() {
  let loopResult = loopThroughFieldArray();
  console.log(loopResult);

  if (checkWinConditionSum('playerField')) {
    if (computerMode) {
      document.querySelector('.js-resultText').innerHTML = `<p class="win">You win!</p>`;
      result = 'Win';
    } else {
      removeTurnText();
      result = `${playerIsSymbol}`;
      console.log(result);
      document.querySelector('.js-resultText').innerHTML = `<p class="win">${playerIsSymbol} wins!</p>`;
      
    }
  } else if (checkWinConditionSum('computerField')) {
    if (computerMode) {
      document.querySelector('.js-resultText').innerHTML = `<p class="loss">You lose!</p>`;
      result = 'loss';
    } else {
      removeTurnText();
      result = `${playerIsSymbol}`;
      console.log(result);
      document.querySelector('.js-resultText').innerHTML = `<p class="win">${playerIsSymbol} wins!</p>`;
      
    }
  } else if (loopResult === 9) {
    removeTurnText();
    document.querySelector('.js-resultText').innerHTML = `<p class="loss">Tie</p>`;
    result = 'tie';
    
  }
}



function loopThroughFieldArray () {
  let check = 0;
  for (let i = 0; i < fieldArray.length; i++) {
    if (fieldArray[i] !== '') {
      check++;
    }
  }
  return check;
}


function checkIfButtonPress4 (playerOrComputerField) {
let buttonCheck = 0;
  for (let i = 0; i < fieldArray.length; i++) {
    if (fieldArray[i] === playerOrComputerField) {
      buttonCheck++;
    }
  }
  return buttonCheck;
}



//That's the function for changing the player's/computer's symbol: 

 function changeSymbol() {
  let currentSymbol = document.querySelector('.js-change-symbol');
  if (currentSymbol.innerHTML === 'You: X Computer: O') {
    currentSymbol.classList.add('but-sty2');
    currentSymbol.innerHTML = 'You: O Computer: X';
    playerIsSymbol = 'O';
    computerIsSymbol = 'X';
    document.querySelector('.js-symbol').innerHTML = `You are ${playerIsSymbol}. Tap to change.`
    symbolButtonActive = true;
  } else if (currentSymbol.innerHTML === 'You: O Computer: X') {
    currentSymbol.classList.remove('but-sty2');
    currentSymbol.innerHTML = 'You: X Computer: O';
    playerIsSymbol = 'X';
    computerIsSymbol = 'O';
    document.querySelector('.js-symbol').innerHTML = `You are ${playerIsSymbol}. Tap to change.`
    symbolButtonActive = false;
  }
  resetGameUpdate(); 
}



//That's the function for changing who turns first, either you or the computer: 

function changeFirstTurn() {
  let currentFirstTurn = document.querySelector('.js-change-turn');
  if (currentFirstTurn.innerHTML === 'First turn: You') {
    resetGameUpdate();
    currentFirstTurn.classList.add('but-sty2');
    currentFirstTurn.innerHTML = 'First turn: Computer';
    document.querySelector('.js-turn').innerHTML = 'Computer turns first. Tap to change:'
    computerAddsImage(computerIsSymbol);
  } else { 
    currentFirstTurn.classList.remove('but-sty2');   
    currentFirstTurn.innerHTML = 'First turn: You';
    document.querySelector('.js-turn').innerHTML = 'You turn first. Tap to change:'
    resetGameUpdate();
  }
}

function changeInTwoPlayer() {
  if(!computerMode) { 
    
    if (!document.querySelector('.js-p1-p2-button').classList.contains('but-sty2')) {
      resetGameUpdate();
      playerIsSymbol = 'O';
      document.querySelector('.js-p1-p2').innerHTML = `Player1 is O and Player 2 is X. (Player1 turns first)`;
      document.querySelector('.js-p1-p2-button').innerHTML =  `P1: O P2: X`
      document.querySelector('.js-p1-p2-button').classList.add('but-sty2');
      twoPlayerButtonSymbols = true;
      turnText();
    } else {
      resetGameUpdate();
      playerIsSymbol = 'X';
      document.querySelector('.js-p1-p2').innerHTML = `Player1 is X and Player 2 is O. (Player1 turns first)`;
      document.querySelector('.js-p1-p2-button').innerHTML =  `P1: X P2: O`;
      document.querySelector('.js-p1-p2-button').classList.remove('but-sty2');
      twoPlayerButtonSymbols = false;
      turnText();
    }
    
  }  
}

function changeMode() {
let currentMode = document.querySelector('.js-change-mode');
  if(currentMode.innerHTML === 'ComputerMode') {
    computerMode = false;
    resetGameUpdate();
    currentMode.classList.add('but-sty2');
    currentMode.innerHTML = '2-player-mode';
    document.querySelector('.js-text-change-mode').innerHTML = 'You are currently playing 2-player-mode. Tap to change to ComputerMode:'
    document.querySelector('.js-changeable-settings-area').innerHTML = 
      `<p class="text-style js-p1-p2">Player1 is X and Player 2 is O. (Player1 turns first)</p>
      <button class="js-p1-p2-button but-sty" onclick="changeInTwoPlayer()">P1: X P2: O</button>`;
    playerIsSymbol = 'X';
    turnText();
  } else {
    currentMode.classList.remove('but-sty2');
    currentMode.innerHTML = 'ComputerMode';
    document.querySelector('.js-text-change-mode').innerHTML = 'You are currently playing against the computer. Tap to change to 2-player-mode:'
    document.querySelector('.js-changeable-settings-area').innerHTML = 
      `<p class="text-style js-turn">You turn first. Tap to change:</p>
      <button class="js-change-turn but-sty" onclick="changeFirstTurn()">First turn: You</button>
      <p class="text-style js-symbol">You are X. Tap to change:</p>
      <button class="js-change-symbol but-sty" onclick="changeSymbol()">You: X Computer: O</button>`;
    computerMode = true;
    playerIsSymbol = 'X';
    computerIsSymbol = 'O';
    removeTurnText();
    resetGameUpdate();
  }
}

function removeTurnText() {
  document.querySelector('.js-turnText').innerHTML = '';
}


function computerAlgorithm () {

  //Here the computer checks if there's a possible win condition: 

  if (checkCondition(1, 2, 0,'computerField') || checkCondition(3, 6, 0,'computerField') || checkCondition(4, 8, 0,'computerField')) {
    cAFunction(0);
  } else if (checkCondition(0, 2, 1,'computerField') || checkCondition(4, 7, 1,'computerField')) {
    cAFunction(1);
  } else if (checkCondition(0, 1, 2,'computerField') || checkCondition(5, 8, 2,'computerField') || checkCondition(4, 6, 2,'computerField')) {
    cAFunction(2);
  } else if (checkCondition(0, 6, 3,'computerField') || checkCondition(4, 5, 3,'computerField')) {
    cAFunction(3);
  } else if (checkCondition(1, 7, 4,'computerField') || checkCondition(3, 5, 4,'computerField') || checkCondition(0, 8, 4,'computerField') || checkCondition(2, 6, 4,'computerField')) {
    cAFunction(4);
  } else if (checkCondition(3, 4, 5,'computerField') || checkCondition(2, 8, 5,'computerField')) {
    cAFunction(5);
  } else if (checkCondition(0, 3, 6,'computerField') || checkCondition(7, 8, 6,'computerField') || checkCondition(2, 4, 6,'computerField')) {
    cAFunction(6);
  } else if (checkCondition(6, 8, 7,'computerField') || checkCondition(1, 4, 7,'computerField')) {
    cAFunction(7);
  } else if (checkCondition(6, 7, 8,'computerField') || checkCondition(2, 5, 8,'computerField') || checkCondition(0, 4, 8,'computerField')) {
    cAFunction(8);
  
  //Here starts the block Algorithm: 

  } else if (checkCondition(1, 2, 0,'playerField') || checkCondition(3, 6, 0,'playerField') || checkCondition(4, 8, 0,'playerField')) {
    cAFunction(0);
  } else if (checkCondition(0, 2, 1,'playerField') || checkCondition(4, 7, 1,'playerField')) {
    cAFunction(1);
  } else if (checkCondition(0, 1, 2,'playerField') || checkCondition(5, 8, 2,'playerField') || checkCondition(4, 6, 2,'playerField')) {
    cAFunction(2);
  } else if (checkCondition(0, 6, 3,'playerField') || checkCondition(4, 5, 3,'playerField')) {
    cAFunction(3);
  } else if (checkCondition(1, 7, 4,'playerField') || checkCondition(3, 5, 4,'playerField') || checkCondition(0, 8, 4,'playerField') || checkCondition(2, 6, 4,'playerField')) {
    cAFunction(4);
  } else if (checkCondition(3, 4, 5,'playerField') || checkCondition(2, 8, 5,'playerField')) {
    cAFunction(5);
  } else if (checkCondition(0, 3, 6,'playerField') || checkCondition(7, 8, 6,'playerField') || checkCondition(2, 4, 6,'playerField')) {
    cAFunction(6);
  } else if (checkCondition(6, 8, 7,'playerField') || checkCondition(1, 4, 7,'playerField')) {
    cAFunction(7);
  } else if (checkCondition(6, 7, 8,'playerField') || checkCondition(2, 5, 8,'playerField') || checkCondition(0, 4, 8,'playerField')) {
    cAFunction(8);

  
  } else {
    computerAddsImage();
  }
}


function checkCondition (var1, var2, var3, fieldType) {
  return fieldArray[var1] === fieldType && fieldArray[var2] === fieldType && fieldArray[var3] === '';
}

function cAFunction (nr) {
    document.querySelector(`.js-ttt-field${nr}`)
    .innerHTML = `<img src="${computerIsSymbol}image.jpg" class="image-style">`;
    fieldArray[nr] = 'computerField';
}

