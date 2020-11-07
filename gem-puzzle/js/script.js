const wrapper = document.createElement('div');
const menu = document.createElement('ul');
const currentGame = document.createElement('div');
const container = document.createElement('div');
const puzzleBox = document.createElement('div');
const menuItemsNames = ['New game', 'Saved game', 'Best scores', 'Settings'];
const time = document.createElement('div');
const moves = document.createElement('div');
const pause = document.createElement('div');
const blackout = document.createElement('div');
const gameOver = document.createElement('div');
let scores = [];
// let bestScores = [];

const settingsField = document.createElement('div');
settingsField.classList.add('settings-hide');

settingsField.innerHTML = `
  <div class="field-size">
    <div>Field size</div>
    <br>
    <form>
      <select id="select" size="1">
        <option value="3х3">3х3</option>
        <option value="4x4">4х4</option>
        <option value="5x5">5х5</option>
        <option value="6x6">6х6</option>
        <option value="7x7">7х7</option>
        <option value="8x8">8х8</option>
      </select>
    </form>
  </div>  

  
  <div id="start">Start new game</div>
  
  <div id="back">Back and continue</div>`
;

const pauseField = document.createElement('div');
pauseField.classList.add('pause-hide');

pauseField.innerHTML = `
  <div id="saveGameBtn">Save Game</div>
  <div id="backAndContinue">Back and Continue</div>`
;  

gameOver.classList.add('congrat-hide');
// gameOver.innerHTML = 'Congratulations!';


let totalTime;
let score;
const records = document.createElement('div');
// records.classList.add('records-show');
records.classList.add('records-hide');
  
  

const cellCount = {
  '3х3': { number: 9, width: 33.333 } ,
  '4x4': { number: 16, width: 25 } ,
  '5x5': { number: 25, width: 20 } ,
  '6x6': { number: 36, width: 16.666 } ,
  '7x7': { number: 49, width: 14.285 } ,
  '8x8': { number: 64, width: 12.5 } ,
}


let count = cellCount['4x4'].number;

let widthCell = cellCount['4x4'].width;

let currentCellCount = '4x4';

moves.classList.add('moves');
wrapper.classList.add('wrapper');
menu.classList.add('menu');
currentGame.classList.add('current');
puzzleBox.classList.add('puzzle-box');
blackout.classList.add('blackout-show');
container.classList.add('container');
container.append(blackout);
container.append(puzzleBox);
container.append(settingsField);
container.append(pauseField);
container.append(gameOver);
container.append(records);
// console.log (select.selectedIndex);  

let movesCount = 0;
let minStart = '00';
let secStart = '00';
time.innerHTML = `Time ${minStart} : ${secStart}`;
moves.innerHTML = `Moves ${movesCount}`;
pause.innerHTML = 'Pause game';

currentGame.append(time);
currentGame.append(pause);
currentGame.append(moves);

menuItemsNames.forEach((elem) => {
  const item = document.createElement('li');
  item.classList.add('menu-item');
  item.textContent = elem;
  menu.append(item);
});

const newGameBtn = menu.querySelector('li:nth-child(1)');
const savedGameBtn = menu.querySelector('li:nth-child(2)');
const bestScoresBtn = menu.querySelector('li:nth-child(3)');
const settingsBtn = menu.querySelector('li:nth-child(4)');
// const RulesBtn = menu.querySelector('li:nth-child(5)');

// console.log(RulesBtn);

wrapper.append(menu);
wrapper.append(currentGame);
wrapper.append(container);

document.body.append(wrapper);

// console.log(wrapper);




let randomArray;
let currentNumber;
let currentChip;
let currentOrder;
let chips;
let empty;
let orderMemory;
let startDate;
let currentDate;
let diff;
let puzzle;


newGameBtn.addEventListener('click', () => {
  createNewGame(count);
});

pause.addEventListener('click', () => {
  blackout.classList.remove('blackout-hide');
  blackout.classList.add('blackout-show');
  pauseField.classList.add('pause-show');
  pauseField.classList.remove('pause-hide');
  clearInterval(timerId);
});

saveGameBtn.addEventListener('click', () => {
  saveGame();
});

savedGameBtn.addEventListener('click', () => {
  if (localStorage.getItem('savedPuzzle')) {
    puzzle = JSON.parse(localStorage.getItem('savedPuzzle'));
    puzzleBox.innerHTML = puzzle['puzzleBox'];
    movesCount = puzzle['currentMoves'];
    moves.innerHTML = `Moves ${movesCount}`;
    min = puzzle['min'];
    sec = puzzle['sec'];
    blackout.classList.add('blackout-hide');
    blackout.classList.remove('blackout-show');
    chips = puzzleBox.querySelectorAll('.chip');
    empty = puzzleBox.querySelector('.empty');
    runTimer();
    chipsHandler();
  }
});



backAndContinue.addEventListener('click', () => {
  blackout.classList.add('blackout-hide');
  blackout.classList.remove('blackout-show');
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  runTimer();
});

start.addEventListener('click', () => {
  createNewGame(count);
});

back.addEventListener('click', () => {
  blackout.classList.add('blackout-hide');
  blackout.classList.remove('blackout-show');
  settingsField.classList.remove('settings-show');
  settingsField.classList.add('settings-hide');
  runTimer();
});

settingsBtn.addEventListener('click', () => {
  blackout.classList.remove('blackout-hide');
  blackout.classList.add('blackout-show');
  settingsField.classList.add('settings-show');
  settingsField.classList.remove('settings-hide');
  select.value = currentCellCount;
  // clearTimeout(timerId);
  clearInterval(timerId);

});




select.addEventListener('change', () => {
  console.log (`select.value = ${select.value}`);
  count = cellCount[select.value].number;
  console.log(count);
  widthCell = cellCount[select.value].width;
  console.log(widthCell);
}); 
// localStorage.setItem('bestScores', JSON.stringify(scores));

bestScoresBtn.addEventListener('click', () => {
  console.log('click best scores');
  blackout.classList.remove('blackout-hide');
  blackout.classList.add('blackout-show');

  records.classList.add('records-show');
  records.classList.remove('records-hide');

  gameOver.classList.add('congrat-hide');
  gameOver.classList.remove('congrat-show');
  records.innerHTML = '';
  
  if (localStorage.getItem('bestScores')) {
    scores = JSON.parse(localStorage.getItem('bestScores'))
  }
  console.log (`length  = ${scores.length}`);
  for (let i = 0; i < scores.length; i++) {
    let record = document.createElement('div');
    record.innerHTML = `${i + 1}. time: ${scores[i]['time']}   moves: ${scores[i]['moves']}`;
    records.append(record);
  }

});

function createNewGame(n) {
  clearInterval(timerId);
  currentCellCount = `${Math.sqrt(n)}x${Math.sqrt(n)}`;
  blackout.classList.add('blackout-hide');
  blackout.classList.remove('blackout-show');
  settingsField.classList.remove('settings-show');
  settingsField.classList.add('settings-hide');
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  records.classList.remove('records-show');
  records.classList.add('records-hide');
  gameOver.classList.remove('congrat-show');
  gameOver.classList.add('congrat-hide');
  puzzleBox.innerHTML = '';
  time.innerHTML = `Time ${minStart} : ${secStart}`;
  movesCount = 0;
  min = 0;
  sec = 0;
  moves.innerHTML = `Moves ${movesCount}`;
  randomArray = [];
  while (randomArray.length < n) {
    currentNumber = Math.floor((Math.random() * n));
    if (!randomArray.includes(currentNumber)) {
      randomArray.push(currentNumber);
    }
  }

  currentOrder = 1;

  for (let i = 0; i < randomArray.length; i++) {
    currentChip = document.createElement('div');
    if (randomArray[i] !== 0) {
      currentChip.classList.add('chip');
     
      currentChip.textContent = randomArray[i];
      currentChip.style.order = currentOrder;
      currentOrder++;
    } else {
      currentChip.classList.add('empty');
      currentChip.style.order = currentOrder;
      currentOrder++;
    }
    currentChip.style.width = `${widthCell}%`;
    currentChip.style.height = `${widthCell}%`;
    puzzleBox.append(currentChip);
  }

  
  
  
  chips = puzzleBox.querySelectorAll('.chip');
  empty = puzzleBox.querySelector('.empty');


  checkForSolve();
  // startDate = new Date();
  // runTimer();
  // chipsHandler();

}

let timerId;
let min = 0;
let sec = 0;


function runTimer() {

  timerId = setInterval(() => {
    if (sec === 59) {
      min = min + 1;
      sec = 0;
    } else {
      sec = sec + 1;
    }

    currMin = (parseInt(min, 10) < 10 ? '0' : '') + min;
    currSec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
    time.innerHTML = `Time ${currMin} : ${currSec}`;
  } , 1000);


}








function chipsHandler() {
  // передвижение фишек при клике
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
  
      if (chip.getBoundingClientRect().top === empty.getBoundingClientRect().bottom && chip.getBoundingClientRect().left === empty.getBoundingClientRect().left) {
        movesCount++;
        moves.innerHTML = `Moves ${movesCount}`;
        chip.classList.add('to-top');
        empty.classList.add('to-bottom');
        setTimeout(() => {
          orderMemory = empty.style.order;
          empty.style.order = chip.style.order;
          chip.style.order = orderMemory;
          chip.classList.remove('to-top');
          empty.classList.remove('to-bottom');
          isEnd(); 
        },500);
      }

      if (chip.getBoundingClientRect().bottom === empty.getBoundingClientRect().top && chip.getBoundingClientRect().left === empty.getBoundingClientRect().left) {
        movesCount++;
        moves.innerHTML = `Moves ${movesCount}`;
        chip.classList.add('to-bottom');
        empty.classList.add('to-top');
        setTimeout(() => {
          orderMemory = empty.style.order;
          empty.style.order = chip.style.order;
          chip.style.order = orderMemory;
          chip.classList.remove('to-bottom');
          empty.classList.remove('to-top');
          isEnd();        
        },500);       
      }

      if (chip.getBoundingClientRect().left === empty.getBoundingClientRect().right && chip.getBoundingClientRect().top === empty.getBoundingClientRect().top) {
        movesCount++;
        moves.innerHTML = `Moves ${movesCount}`;
        chip.classList.add('to-left');
        empty.classList.add('to-right');
        setTimeout(() => {
          orderMemory = empty.style.order;
          empty.style.order = chip.style.order;
          chip.style.order = orderMemory;
          chip.classList.remove('to-left');
          empty.classList.remove('to-right');
          isEnd();        
        },500);       
      }

      if (chip.getBoundingClientRect().right === empty.getBoundingClientRect().left && chip.getBoundingClientRect().top === empty.getBoundingClientRect().top) {
        movesCount++;
        moves.innerHTML = `Moves ${movesCount}`;
        chip.classList.add('to-right');
        empty.classList.add('to-left');
        setTimeout(() => {
          orderMemory = empty.style.order;
          empty.style.order = chip.style.order;
          chip.style.order = orderMemory;
          chip.classList.remove('to-right');
          empty.classList.remove('to-left');
          isEnd();        
        },500);       
      }

      // console.log (chips);
    });  
  });
}



function saveGame() {

  puzzle = {
    'puzzleBox': puzzleBox.innerHTML,
    'min': min,
    'sec': sec,
    // 'currentTimer': time.innerHTML,
    'currentMoves': movesCount,
  }
  
  // localStorage.setItem('puzzleBox', puzzleBox.innerHTML );
  // localStorage.setItem('currentTimer', time.innerHTML );
  // localStorage.setItem('currentMoves', movesCount );
  localStorage.setItem('savedPuzzle', JSON.stringify(puzzle));
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  movesCount = 0;
  moves.innerHTML = `Moves ${movesCount}`;
  min = 0;
  sec = 0;
  currMin = (parseInt(min, 10) < 10 ? '0' : '') + min;
  currSec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
  time.innerHTML = `Time ${currMin} : ${currSec}`;
  
}

function isEnd() {
  for (let i = 0; i < chips.length; i++) {
    console.log(chips[i].style.order);
    if (+chips[i].style.order !== +chips[i].innerHTML) {
      console.log('non equal');
      return;
    } else continue;
  }
  clearInterval(timerId);
  gameOver.innerHTML = `You solved gem-puzzle in ${currMin} : ${currSec} and ${movesCount} moves!!!`;
  gameOver.classList.add('congrat-show');
  gameOver.classList.remove('congrat-hide');
  addBestScore();
}


function checkForSolve() {
  let counter = 0;
  for (let i = 0; i < chips.length - 1; i++) {
    for (let j = i + 1; j < chips.length; j++) {
      if (+chips[i].innerHTML > +chips[j].innerHTML) {
        counter++;
      }
    }
  }
  let rowEmpty = Math.ceil((+empty.style.order)/Math.sqrt(count));

  counter = counter + rowEmpty;
  // console.log (`counter= ${counter}`);

  if (Math.sqrt(count) % 2 === 0) {
    if (counter % 2 === 0) {
      console.log ('good!');
      runTimer();
      chipsHandler();
      // return;
    } else {
      console.log ('bad!');
      createNewGame(count);
    }  
  } else {
    if (counter % 2 !== 0) {
      console.log ('good!');
      runTimer();
      chipsHandler();
      // return;
    } else {
      console.log ('bad!');
      createNewGame(count);
    } 
  }

}



function addBestScore() {
  totalTime = sec + min * 60;
  score = {
    'totaltime': totalTime,
    'time':  `${currMin} : ${currSec}`,
    'moves': movesCount,
  }
  if (localStorage.getItem('bestScores')) {
    scores = JSON.parse(localStorage.getItem('bestScores'))
  }
  // console.log (scores);
  scores.push(score);
  if (scores.length >= 2) {
    scores = scores.sort((a,b) => a['totaltime'] - b['totaltime']);
  }
  if (scores.length >= 10) {
    scores.splice(10, scores.length - 1);
  }
  // console.log (scores);
  console.log (`length  = ${scores.length}`);

  localStorage.setItem('bestScores', JSON.stringify(scores));
}



