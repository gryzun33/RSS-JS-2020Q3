
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
const iconSound = document.createElement('div');

const sound = document.createElement('audio');
sound.setAttribute ("src", "sounds/tink.wav");

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
  <div id="back">Back and continue</div>`
;

const pauseField = document.createElement('div');
pauseField.classList.add('pause-hide');
pauseField.innerHTML = `
  <div id="saveGameBtn">Save Game</div>
  <div id="backAndContinue">Back and Continue</div>`
; 

const gameOver = document.createElement('div');
gameOver.classList.add('congrat-hide');

const records = document.createElement('div');
records.classList.add('records-hide');
  
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

const cellCount = {
  '3х3': { number: 9, width: 33.333 } ,
  '4x4': { number: 16, width: 25 } ,
  '5x5': { number: 25, width: 20 } ,
  '6x6': { number: 36, width: 16.666 } ,
  '7x7': { number: 49, width: 14.285 } ,
  '8x8': { number: 64, width: 12.5 } ,
}


let containerLength = 400;




let count = cellCount['4x4'].number;

let widthCell = cellCount['4x4'].width / 100 * containerLength ;


let currentCellCount = '4x4';

let movesCount = 0;
let minStart = '00';
let secStart = '00';
time.innerHTML = `Time ${minStart} : ${secStart}`;
moves.innerHTML = `Moves ${movesCount}`;
pause.innerHTML = 'Pause game';
iconSound.innerHTML = '<i class="material-icons">volume_off</i>';

currentGame.append(time);
currentGame.append(pause);
currentGame.append(moves);
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


wrapper.append(menu);
wrapper.append(currentGame);
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
// let threshold = 50;

let imgNumberInRow;
let imgNumberOfRow;
let bgPosition = [];
let bgImageNumber;
let bgSize;

function createBg() {
  for (let i = 0; i < count; i++) {
    bgImageNumber = Math.floor(Math.random() * 150);
    bgSize = containerLength + 'px';
    console.log (`bgSize = ${bgSize}`);

    // container.style.backgroundImage = `url(images/${bgImageNumber}.jpg)`; 
    // container.style.backgroundSize = bgSize ;
    // container.style.backgroundSize = `${bgSize} ${bgSize}` ;  

    imgNumberInRow = i % Math.sqrt(count);
    imgNumberOfRow = Math.floor(i / Math.sqrt(count)); 
    bgPosition[i] = `-${imgNumberInRow * widthCell}px -${imgNumberOfRow * widthCell}px`;


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
  widthCell = cellCount[select.value].width / 100 * containerLength ;
  console.log(widthCell);
}); 

// let widthCell = cellCount['4x4'].width / 100 * containerLength ;
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

// console.log (iconSound);
iconSound.addEventListener('click', () => {
  console.log (iconSound.innerHTML);
  if (iconSound.innerHTML === '<i class="material-icons">volume_off</i>') {
    iconSound.innerHTML = '<i class="material-icons">volume_up</i>';
  } else {
    console.log ('true');
    iconSound.innerHTML = '<i class="material-icons">volume_off</i>';
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

    currentChip.style.width = `${widthCell}px`;
    currentChip.style.height = `${widthCell}px`;
    currentChip.style.top = `${Math.floor((i / Math.sqrt(n))) * widthCell}px`;
    currentChip.style.left = `${(i % Math.sqrt(n)) * widthCell}px`;
    currentChip.style.bottom = `${parseInt(currentChip.style.top) + widthCell}px`;
    currentChip.style.right = `${parseInt(currentChip.style.left) + widthCell}px`;

    
    
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
    
          if (chip.style.top === empty.style.bottom && chip.style.left === empty.style.left) {
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
    
          if (chip.style.bottom === empty.style.top && chip.style.left === empty.style.left) {
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
    
          if (chip.style.left === empty.style.right && chip.style.top === empty.style.top) {
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
    
          if (chip.style.right === empty.style.left && chip.style.top === empty.style.top) {
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
  console.log (`rowEmpty= ${rowEmpty}`);
  
  

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






 
  



  
    
    
  




  // function chipsHandler() {
 

  //   chips.forEach ((chip) => {
  //     chip.addEventListener('mousedown', function(e) {
     
  //       if (iconSound.innerHTML === '<i class="material-icons">volume_up</i>') {
  //         sound.currentTime = 0;
  //         sound.play();
  //       }
        
  //       console.log ('mousedown');
 
  //       startX = e.pageX;
  //       startY = e.pageY;
  //       console.log('before');
  //       console.log (`chip.style.top = ${chip.style.top}`);
  //       console.log (`chip.style.bottom = ${chip.style.bottom}`);
  //       console.log (`chip.style.left = ${chip.style.left}`);
  //       console.log (`chip.style.right = ${chip.style.right}`);
  //       topMemory = chip.style.top;
  //       bottomMemory = chip.style.bottom;
  //       leftMemory = chip.style.left;
  //       rightMemory = chip.style.right;
  //       orderMemory = chip.style.order;
  //       let shiftX = e.pageX - chip.getBoundingClientRect().left; 
  //       let shiftY = e.pageY - chip.getBoundingClientRect().top;
  
    
    
  //       if ((parseInt(chip.style.top) === parseInt(empty.style.bottom) && parseInt(chip.style.left) === parseInt(empty.style.left)) || 
  //           (parseInt(chip.style.bottom) === parseInt(empty.style.top) && parseInt(chip.style.left) === parseInt(empty.style.left)) ||
  //           (parseInt(chip.style.left) === parseInt(empty.style.right) && parseInt(chip.style.top) === parseInt(empty.style.top)) || 
  //           (parseInt(chip.style.right) === parseInt(empty.style.left) && parseInt(chip.style.top) === parseInt(empty.style.top))) {
  //         chip.style.zIndex = 100; 
  //         moveAt(e.pageX, e.pageY);
  //         document.addEventListener('mousemove', onMouseMove);  
  //       }
    
  //       function moveAt(pageX, pageY) { 
  //         chip.style.left = pageX - shiftX - puzzleBox.getBoundingClientRect().left + 'px';
  //         chip.style.top = pageY - shiftY - puzzleBox.getBoundingClientRect().top + 'px'; 
  //       }
    
  //       function onMouseMove(e) {
  //         moveAt(e.pageX, e.pageY);
  //       }
  
  
  //       function changeOrder() {
          
  //         chip.style.order = empty.style.order;
  //         chip.style.top = empty.style.top;
  //         chip.style.bottom = empty.style.bottom;
  //         chip.style.left = empty.style.left;
  //         chip.style.right = empty.style.right; 
      
    
  //         empty.style.order = orderMemory;
  //         empty.style.top = topMemory;
  //         empty.style.bottom = bottomMemory;
  //         empty.style.left = leftMemory;
  //         empty.style.right = rightMemory;
  
  //         chip.style.zIndex = 'auto';
  
  //         console.log('after');
  //         console.log (`chip.style.top = ${chip.style.top}`);
  //         console.log (`chip.style.bottom = ${chip.style.bottom}`);
  //         console.log (`chip.style.left = ${chip.style.left}`);
  //         console.log (`chip.style.right = ${chip.style.right}`);
          
  //       }
  
  //       chip.addEventListener('mouseup', onMouseUp);
  
  //       function onMouseUp(e) {
  //         console.log ('mouseup');
  
  //         diffTime = new Date().getTime() - currentTime;
  //         console.log(diffTime);
  //         currentTime = new Date().getTime();
  //         document.removeEventListener('mousemove', onMouseMove);
  //         if (diffTime > 100) {
  
  
  //           if (Math.abs(e.pageX - startX) > 2 || Math.abs(e.pageY - startY) > 2) {
  //             movesCount++;
  //             moves.innerHTML = `Moves ${movesCount}`;
  //             changeOrder();
  //             console.log (e.target);
  //             isEnd(); 
  
  //           } else if (Math.abs(e.pageX - startX) <= 2 && Math.abs(e.pageY - startY) <= 2) {
  //             if (parseInt(chip.style.top) === parseInt(empty.style.bottom) && parseInt(chip.style.left) === parseInt(empty.style.left)) {
                  
  //               movesCount++;
  //               moves.innerHTML = `Moves ${movesCount}`;
  //               chip.classList.add('to-top');
  //               empty.classList.add('to-bottom');
  //               setTimeout(() => {
  //                 changeOrder();
  //                 chip.classList.remove('to-top');
  //                 empty.classList.remove('to-bottom');
  //                 console.log (e.target);
  //                 isEnd(); 
  //               },500);
  //             }
        
  //             if (parseInt(chip.style.bottom) === parseInt(empty.style.top) && parseInt(chip.style.left) === parseInt(empty.style.left)) {
  //               movesCount++;
  //               moves.innerHTML = `Moves ${movesCount}`;
  //               chip.classList.add('to-bottom');
  //               empty.classList.add('to-top');
  //               setTimeout(() => {
  //                 changeOrder();
  //                 chip.classList.remove('to-bottom');
  //                 empty.classList.remove('to-top');
  //                 console.log (e.target);
  //                 isEnd();        
  //               },500);       
  //             }
        
  //             if (parseInt(chip.style.left) === parseInt(empty.style.right) && parseInt(chip.style.top) === parseInt(empty.style.top)) {
  //               movesCount++;
  //               moves.innerHTML = `Moves ${movesCount}`;
  //               chip.classList.add('to-left');
  //               empty.classList.add('to-right');
  //               setTimeout(() => {
  //                 changeOrder();
                
  //                 chip.classList.remove('to-left');
  //                 empty.classList.remove('to-right');
  //                 console.log (e.target);
  //                 isEnd();        
  //               },500);       
  //             }
        
  //             if (parseInt(chip.style.right) === parseInt(empty.style.left) && parseInt(chip.style.top) === parseInt(empty.style.top)) {
  //               movesCount++;
  //               moves.innerHTML = `Moves ${movesCount}`;
  //               chip.classList.add('to-right');
  //               empty.classList.add('to-left');
  //               setTimeout(() => {
  //                 changeOrder();
  //                 chip.classList.remove('to-right');
  //                 empty.classList.remove('to-left');
  //                 console.log (e.target);
  //                 isEnd();        
  //               },500);       
  //             }
  //             chip.removeEventListener('mouseup', onMouseUp);
 
  //           }
  //         } else {
  //           chip.style.order = orderMemory;
  //           chip.style.top = topMemory;
  //           chip.style.bottom = bottomMemory;
  //           chip.style.left = leftMemory;
  //           chip.style.right = rightMemory;
  //           chip.removeEventListener('mouseup', onMouseUp);
           
  //         }
            
  //       }
      
  //     });
      
  //     chip.ondragstart = function() {
  //       return false;
  //     };
    
      
  //   });
  
    
    
  // }
  