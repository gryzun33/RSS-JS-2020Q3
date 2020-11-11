const wrapper = document.createElement('div');
const navWrapper = document.createElement('div');
const menu = document.createElement('ul');
const currentGame = document.createElement('div');
const container = document.createElement('div');
const puzzleBox = document.createElement('div');
const menuItemsNames = ['New game', 'Saved game', 'Best scores', 'Settings'];
const time = document.createElement('div');
const moves = document.createElement('div');
const pause = document.createElement('div');
const blackout = document.createElement('div');
const iconSound = document.createElement('div');
const digit = document.createElement('div');
const sound = document.createElement('audio');
sound.setAttribute ("src", "sounds/tink.wav");
pause.classList.add('pause');
navWrapper.classList.add ('nav-wrapper');


let scores = [];
let totalTime;
let score;

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
  <div id="back1">Back and continue</div>`
;

const pauseField = document.createElement('div');
pauseField.classList.add('pause-hide');
pauseField.innerHTML = `
  <div id="saveGameBtn">Save Game</div>
  <div id="back2">Back and Continue</div>`
; 

const gameOver = document.createElement('div');
gameOver.classList.add('congrat-hide');

const bestField = document.createElement('div');
bestField.classList.add('records-hide');
bestField.innerHTML = `
  <div id="records"></div>
  <div id="back3">Back and Continue</div>`
; 
  
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
container.append(bestField);

const cellCount = {
  '3х3': { number: 9, width: 33.333 } ,
  '4x4': { number: 16, width: 25 } ,
  '5x5': { number: 25, width: 20 } ,
  '6x6': { number: 36, width: 16.666 } ,
  '7x7': { number: 49, width: 14.285 } ,
  '8x8': { number: 64, width: 12.5 } ,
}

// let containerLength = 400;
let count = cellCount['4x4'].number;
// let widthCell = cellCount['4x4'].width / 100 * containerLength ;
let widthCell = cellCount['4x4'].width;
let currentCellCount = '4x4';
let movesCount = 0;
let minStart = '00';
let secStart = '00';
time.innerHTML = `Time ${minStart} : ${secStart}`;
moves.innerHTML = `Moves ${movesCount}`;
pause.innerHTML = 'Pause';
iconSound.innerHTML = '<i class="material-icons">volume_off</i>';
digit.innerHTML = '<i class="material-icons">filter_1</i>';

currentGame.append(time);
currentGame.append(moves);
currentGame.append(pause);
currentGame.append(digit);
currentGame.append(iconSound);

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

navWrapper.append (menu);
navWrapper.append(currentGame);
wrapper.append(navWrapper);
wrapper.append(container);
document.body.append(wrapper);
document.body.append(sound);

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
let topMemory;
let leftMemory;
let bottomMemory;
let rightMemory;

let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;

let imgNumberInRow;
let imgNumberOfRow;
let bgPosition = [];
let bgImageNumber;
let bgSize;
let widthBgCell;

function createBg() {
  bgSize = getComputedStyle(container).width;
  console.log (bgSize);
  widthBgCell = widthCell / 100 * parseInt(bgSize);
  for (let i = 0; i < count; i++) {
    bgImageNumber = Math.floor(Math.random() * 150);
    // bgSize = containerLength + 'px';

    
    
    imgNumberInRow = i % Math.sqrt(count);
    imgNumberOfRow = Math.floor(i / Math.sqrt(count)); 
    bgPosition[i] = `-${imgNumberInRow * widthBgCell}px -${imgNumberOfRow * widthBgCell}px`;
  }
}

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

back1.addEventListener('click', () => {
  settingsField.classList.remove('settings-show');
  settingsField.classList.add('settings-hide');
  runTimer();
});

back2.addEventListener('click', () => {
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  runTimer();
});

back3.addEventListener('click', () => {
  bestField.classList.remove('records-show');
  bestField.classList.add('records-hide');
  runTimer();
});

start.addEventListener('click', () => {
  createNewGame(count);
});




settingsBtn.addEventListener('click', () => {
  settingsField.classList.add('settings-show');
  settingsField.classList.remove('settings-hide');
  gameOver.classList.remove('congrat-show');
  gameOver.classList.add('congrat-hide');
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  bestField.classList.add('records-hide');
  bestField.classList.remove('records-show');
  select.value = currentCellCount;
  clearInterval(timerId);
});

select.addEventListener('change', () => {
  count = cellCount[select.value].number;
  currentCellCount = select.value;
  widthCell = cellCount[currentCellCount].width; 
  // widthCell = cellCount[currentCellCount].width / 100 * containerLength ; 
}); 

bestScoresBtn.addEventListener('click', () => {
  clearInterval(timerId);
  bestField.classList.add('records-show');
  bestField.classList.remove('records-hide');
  gameOver.classList.add('congrat-hide');
  gameOver.classList.remove('congrat-show');
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  settingsField.classList.remove('settings-show');
  settingsField.classList.add('settings-hide');
  records.innerHTML = ''; 
  if (localStorage.getItem('bestScores')) {
    scores = JSON.parse(localStorage.getItem('bestScores'))
  }
  for (let i = 0; i < scores.length; i++) {
    let record = document.createElement('div');
    record.innerHTML = `${i + 1}. time: ${scores[i]['time']}   moves: ${scores[i]['moves']}`;
    records.append(record);
  }
});

iconSound.addEventListener('click', () => {
  if (iconSound.innerHTML === '<i class="material-icons">volume_off</i>') {
    iconSound.innerHTML = '<i class="material-icons">volume_up</i>';
  } else {
    iconSound.innerHTML = '<i class="material-icons">volume_off</i>';
  }
});

digit.addEventListener ('click', () => {
  chips.forEach((chip) => {
    if (getComputedStyle(chip).color === 'rgba(0, 0, 0, 0)') {
      chip.style.color = 'white';
      chip.style.textShadow = '1px 1px 5px black';
    } else {
      chip.style.color = 'transparent';
      chip.style.textShadow = '';
    }
  });
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
  bestField.classList.remove('records-show');
  bestField.classList.add('records-hide');
  gameOver.classList.remove('congrat-show');
  gameOver.classList.add('congrat-hide');
  puzzleBox.innerHTML = '';
  time.innerHTML = `Time ${minStart} : ${secStart}`;
  movesCount = 0;
  min = 0;
  sec = 0;
  moves.innerHTML = `Moves ${movesCount}`;
  createBg();
 

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

    // currentChip.style.width = `${widthCell}px`;
    // currentChip.style.height = `${widthCell}px`;
    // currentChip.style.top = `${Math.floor((i / Math.sqrt(n))) * widthCell}px`;
    // currentChip.style.left = `${(i % Math.sqrt(n)) * widthCell}px`;
    // currentChip.style.bottom = `${parseInt(currentChip.style.top) + widthCell}px`;
    // currentChip.style.right = `${parseInt(currentChip.style.left) + widthCell}px`;

    currentChip.style.width = `${widthCell}%`;
    currentChip.style.height = `${widthCell}%`;
    currentChip.style.top = `${Math.floor((i / Math.sqrt(n))) * widthCell}%`;
    currentChip.style.left = `${(i % Math.sqrt(n)) * widthCell}%`;
    currentChip.style.bottom = `${parseFloat(currentChip.style.top) + widthCell}%`;
    currentChip.style.right = `${parseFloat(currentChip.style.left) + widthCell}%`;


    if (randomArray[i] !== 0) {
      currentChip.style.backgroundImage = `url(images/${bgImageNumber}.jpg)`; 
      currentChip.style.backgroundSize = `${bgSize} ${bgSize}` ;
      currentChip.style.backgroundPosition = bgPosition[randomArray[i] - 1];
    }
    puzzleBox.append(currentChip);
  }

  chips = puzzleBox.querySelectorAll('.chip');
  empty = puzzleBox.querySelector('.empty');
  checkForSolve();
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
 

  chips.forEach ((chip) => {
  
        chip.addEventListener('click', () => {

          if (iconSound.innerHTML === '<i class="material-icons">volume_up</i>') {
            sound.currentTime = 0;
            sound.play();
          }
    
          if (parseInt(chip.style.top) === parseInt(empty.style.bottom) && parseInt(chip.style.left) === parseInt(empty.style.left)) {
            movesCount++;
            moves.innerHTML = `Moves ${movesCount}`;
            chip.classList.add('to-top');
            empty.classList.add('to-bottom');
            setTimeout(() => {
              changeOrder(chip);
              chip.classList.remove('to-top');
              empty.classList.remove('to-bottom');
              isEnd(); 
            },500);
          }
    
          if (parseInt(chip.style.bottom) === parseInt(empty.style.top) && parseInt(chip.style.left) === parseInt(empty.style.left)) {
            movesCount++;
            moves.innerHTML = `Moves ${movesCount}`;
            chip.classList.add('to-bottom');
            empty.classList.add('to-top');
            setTimeout(() => {
              changeOrder(chip);
              chip.classList.remove('to-bottom');
              empty.classList.remove('to-top');
              isEnd();        
            },500);       
          }
    
          if (parseInt(chip.style.left) === parseInt(empty.style.right) && parseInt(chip.style.top) === parseInt(empty.style.top)) {
            movesCount++;
            moves.innerHTML = `Moves ${movesCount}`;
            chip.classList.add('to-left');
            empty.classList.add('to-right');
            setTimeout(() => {
              changeOrder(chip);           
              chip.classList.remove('to-left');
              empty.classList.remove('to-right');
              isEnd();        
            },500);       
          }
    
          if (parseInt(chip.style.right) === parseInt(empty.style.left) && parseInt(chip.style.top) === parseInt(empty.style.top)) {
            movesCount++;
            moves.innerHTML = `Moves ${movesCount}`;
            chip.classList.add('to-right');
            empty.classList.add('to-left');
            setTimeout(() => {
              changeOrder(chip);
              chip.classList.remove('to-right');
              empty.classList.remove('to-left');
              isEnd();        
            },500);       
          }
    
          
        });  
      });

}

function changeOrder(chip) {
  orderMemory = empty.style.order;
  topMemory = empty.style.top;
  bottomMemory = empty.style.bottom;
  leftMemory = empty.style.left;
  rightMemory = empty.style.right;
  empty.style.order = chip.style.order;
  empty.style.top = chip.style.top;
  empty.style.bottom = chip.style.bottom;
  empty.style.left = chip.style.left;
  empty.style.right = chip.style.right;
  chip.style.order = orderMemory;
  chip.style.top = topMemory;
  chip.style.bottom = bottomMemory;
  chip.style.left = leftMemory;
  chip.style.right = rightMemory;
}



function saveGame() {

  puzzle = {
    'puzzleBox': puzzleBox.innerHTML,
    'min': min,
    'sec': sec,
    'currentMoves': movesCount,
  }
  
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

    if (+chips[i].style.order !== +chips[i].innerHTML) {
    
      return;
    } else continue;
  }
  clearInterval(timerId);
  gameOver.innerHTML = `You solved gem-puzzle in ${currMin} : ${currSec} and ${movesCount} moves!!!`;
  gameOver.classList.add('congrat-show');
  gameOver.classList.remove('congrat-hide');
  gameOver.style.backgroundImage = `url(images/${bgImageNumber}.jpg)`; 
  gameOver.style.backgroundSize = `${bgSize} ${bgSize}` ;
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
 
  
  

  if (Math.sqrt(count) % 2 === 0) {
    counter = counter + rowEmpty;
   
    if (counter % 2 === 0) {
      
      runTimer();
      chipsHandler();
     
    } else {
      
      createNewGame(count);
    }  
  } else {
    if (counter % 2 === 0) {
      
      runTimer();
      chipsHandler();
     
    } else {
   
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
  scores.push(score);
  if (scores.length >= 2) {
    scores = scores.sort((a,b) => a['totaltime'] - b['totaltime']);
  }
  if (scores.length >= 10) {
    scores.splice(10, scores.length - 1);
  }
  localStorage.setItem('bestScores', JSON.stringify(scores));
}



let lastWindowWidth = window.innerWidth;
let newWindowWidth;

window.addEventListener('resize', function() {
  newWindowWidth = window.innerWidth;
  if (lastWindowWidth > 500 && newWindowWidth > 500) {
    return;
  } else if (lastWindowWidth <= 500 && newWindowWidth <= 500) {
    return;
  } else {
    let elements = container.querySelectorAll('div');
    console.log (elements);
    bgSize = getComputedStyle(container).width;
    widthBgCell = widthCell / 100 * parseInt(bgSize); 
    for (let i = 0; i < count; i++) {
      imgNumberInRow = i % Math.sqrt(count);
      imgNumberOfRow = Math.floor(i / Math.sqrt(count)); 
      bgPosition[i] = `-${imgNumberInRow * widthBgCell}px -${imgNumberOfRow * widthBgCell}px`;
    }
    
    for (let i = 0; i < count; i++) {

      if (parseInt(elements[i].innerText) !== 0) {
        // currentChip.style.backgroundImage = `url(images/${bgImageNumber}.jpg)`; 
        elements[i].style.backgroundSize = `${bgSize} ${bgSize}` ;
        elements[i].style.backgroundPosition = bgPosition[parseInt(elements[i].innerText) - 1];
      }

    }


  }


  
   
  
 
  lastWindowWidth = newWindowWidth;

});





 
  



  
    
    
  




  