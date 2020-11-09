
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
const iconSound = document.createElement('div');
const sound = document.createElement('audio');
sound.setAttribute ("src", "sounds/tink.wav");

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


const cellCount = {
  '3х3': { number: 9, width: 33.333 } ,
  '4x4': { number: 16, width: 25 } ,
  '5x5': { number: 25, width: 20 } ,
  '6x6': { number: 36, width: 16.666 } ,
  '7x7': { number: 49, width: 14.285 } ,
  '8x8': { number: 64, width: 12.5 } ,
}


let containerLength = 400;
// console.log(getComputedStyle(container));



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
// const RulesBtn = menu.querySelector('li:nth-child(5)');

// console.log(RulesBtn);

wrapper.append(menu);
wrapper.append(currentGame);
wrapper.append(container);

document.body.append(wrapper);
document.body.append(sound);

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
let topMemory;
let leftMemory;
let bottomMemory;
let rightMemory;


let startX = 0;
let startY = 0;
let distX = 0;
let distY = 0;
let threshold = 50;

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
  if (iconSound.innerHTML = '<i class="material-icons">volume_off</i>') {
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





let currentTime = 0;
let diffTime;


function chipsHandler() {
 

  chips.forEach ((chip) => {
    chip.addEventListener('mousedown', function(e) {
      console.log (iconSound.innerHTML);
      if (iconSound.innerHTML = '<i class="material-icons">volume_up</i>') {
        sound.currentTime = 0;
        sound.play();
      }
      
      console.log ('mousedown');
      // console.log (e.target);
      startX = e.pageX;
      startY = e.pageY;
      console.log('before');
      console.log (`chip.style.top = ${chip.style.top}`);
      console.log (`chip.style.bottom = ${chip.style.bottom}`);
      console.log (`chip.style.left = ${chip.style.left}`);
      console.log (`chip.style.right = ${chip.style.right}`);
      topMemory = chip.style.top;
      bottomMemory = chip.style.bottom;
      leftMemory = chip.style.left;
      rightMemory = chip.style.right;
      orderMemory = chip.style.order;
      let shiftX = e.pageX - chip.getBoundingClientRect().left; 
      let shiftY = e.pageY - chip.getBoundingClientRect().top;

  
  
      if ((parseInt(chip.style.top) === parseInt(empty.style.bottom) && parseInt(chip.style.left) === parseInt(empty.style.left)) || 
          (parseInt(chip.style.bottom) === parseInt(empty.style.top) && parseInt(chip.style.left) === parseInt(empty.style.left)) ||
          (parseInt(chip.style.left) === parseInt(empty.style.right) && parseInt(chip.style.top) === parseInt(empty.style.top)) || 
          (parseInt(chip.style.right) === parseInt(empty.style.left) && parseInt(chip.style.top) === parseInt(empty.style.top))) {
        chip.style.zIndex = 100; 
        moveAt(e.pageX, e.pageY);
        document.addEventListener('mousemove', onMouseMove);  
      }
  
      function moveAt(pageX, pageY) { 
        chip.style.left = pageX - shiftX - puzzleBox.getBoundingClientRect().left + 'px';
        chip.style.top = pageY - shiftY - puzzleBox.getBoundingClientRect().top + 'px'; 
      }
  
      function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
      }


      function changeOrder() {
        
        chip.style.order = empty.style.order;
        chip.style.top = empty.style.top;
        chip.style.bottom = empty.style.bottom;
        chip.style.left = empty.style.left;
        chip.style.right = empty.style.right; 
    
  
        empty.style.order = orderMemory;
        empty.style.top = topMemory;
        empty.style.bottom = bottomMemory;
        empty.style.left = leftMemory;
        empty.style.right = rightMemory;

        chip.style.zIndex = 'auto';

        console.log('after');
        console.log (`chip.style.top = ${chip.style.top}`);
        console.log (`chip.style.bottom = ${chip.style.bottom}`);
        console.log (`chip.style.left = ${chip.style.left}`);
        console.log (`chip.style.right = ${chip.style.right}`);
        
      }

      chip.addEventListener('mouseup', onMouseUp);

      function onMouseUp(e) {
        console.log ('mouseup');
        // console.log(new Date().getTime());
        diffTime = new Date().getTime() - currentTime;
        console.log(diffTime);
        currentTime = new Date().getTime();
        document.removeEventListener('mousemove', onMouseMove);
        if (diffTime > 100) {

          // console.log (e.target);
          // console.log (`dist = ${e.pageX - startX}`);
          if (Math.abs(e.pageX - startX) > 2 || Math.abs(e.pageY - startY) > 2) {
            movesCount++;
            moves.innerHTML = `Moves ${movesCount}`;
            changeOrder();
            console.log (e.target);
            isEnd(); 

          } else if (Math.abs(e.pageX - startX) <= 2 && Math.abs(e.pageY - startY) <= 2) {
            if (parseInt(chip.style.top) === parseInt(empty.style.bottom) && parseInt(chip.style.left) === parseInt(empty.style.left)) {
                
              movesCount++;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-top');
              empty.classList.add('to-bottom');
              setTimeout(() => {
                changeOrder();
                chip.classList.remove('to-top');
                empty.classList.remove('to-bottom');
                console.log (e.target);
                isEnd(); 
              },500);
            }
      
            if (parseInt(chip.style.bottom) === parseInt(empty.style.top) && parseInt(chip.style.left) === parseInt(empty.style.left)) {
              movesCount++;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-bottom');
              empty.classList.add('to-top');
              setTimeout(() => {
                changeOrder();
                chip.classList.remove('to-bottom');
                empty.classList.remove('to-top');
                console.log (e.target);
                isEnd();        
              },500);       
            }
      
            if (parseInt(chip.style.left) === parseInt(empty.style.right) && parseInt(chip.style.top) === parseInt(empty.style.top)) {
              movesCount++;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-left');
              empty.classList.add('to-right');
              setTimeout(() => {
                changeOrder();
              
                chip.classList.remove('to-left');
                empty.classList.remove('to-right');
                console.log (e.target);
                isEnd();        
              },500);       
            }
      
            if (parseInt(chip.style.right) === parseInt(empty.style.left) && parseInt(chip.style.top) === parseInt(empty.style.top)) {
              movesCount++;
              moves.innerHTML = `Moves ${movesCount}`;
              chip.classList.add('to-right');
              empty.classList.add('to-left');
              setTimeout(() => {
                changeOrder();
                chip.classList.remove('to-right');
                empty.classList.remove('to-left');
                console.log (e.target);
                isEnd();        
              },500);       
            }

            // console.log (e.target);
          }
        } else {
          chip.style.order = orderMemory;
          chip.style.top = topMemory;
          chip.style.bottom = bottomMemory;
          chip.style.left = leftMemory;
          chip.style.right = rightMemory;
          chip.removeEventListener('mouseup', onMouseUp);
         
        }
          
      }
    
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
    // console.log(chips[i].style.order);
    if (+chips[i].style.order !== +chips[i].innerHTML) {
      // console.log('non equal');
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
  console.log (`rowEmpty= ${rowEmpty}`);
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



// drag and drop


// let currChip;

// puzzleBox.addEventListener('mousedown', function(e) {
  
//   startX = e.pageX;
//   startY = e.pageY;

//   currChip = e.target;
//   console.log (`currentChip = ${currChip}`);
//   topMemory = e.target.style.top;
//   bottomMemory = e.target.style.bottom;
//   leftMemory = e.target.style.left;
//   rightMemory = e.target.style.right;
//   orderMemory = e.target.style.order;

//   console.log (`startx = ${startX}`);  
//   let shiftX = e.pageX - e.target.getBoundingClientRect().left; 
//   let shiftY = e.pageY - e.target.getBoundingClientRect().top;
//   console.log (`shiftX= ${shiftX}`);
//   if (e.target.style.top === empty.style.bottom && e.target.style.left === empty.style.left) {
//     e.target.style.zIndex = 100; 
//     moveAt(e.pageX, e.pageY);
//     document.addEventListener('mousemove', onMouseMove);  
//   }

 
  
//   function moveAt(pageX, pageY) {
//     console.log ('moveat'); 
//     e.target.style.left = pageX - shiftX - puzzleBox.getBoundingClientRect().left + 'px';
//     e.target.style.top = pageY - shiftY - puzzleBox.getBoundingClientRect().top + 'px';
//     console.log (`pageX=${pageX}`);
//     console.log (`left = ${e.target.style.left}`);
//   }

//   function onMouseMove(e) {
//     moveAt(e.pageX, e.pageY);
//   }

//   e.target.addEventListener('mouseup', (e) => {
//     console.log('mouseup');
//     console.log (`e.pageX = ${e.pageX}`);
//     console.log (`dist = ${e.pageX - startX}`);
//     if (Math.abs(e.pageX - startX)>= threshold || Math.abs(e.pageY - startY)>= threshold) {
      
      

//       currChip.style.order = empty.style.order;
//       currChip.style.top = empty.style.top;
//       currChip.style.bottom = empty.style.bottom;
//       currChip.style.left = empty.style.left;
//       currChip.style.right = empty.style.right; 
 

//       empty.style.order = orderMemory;
//       empty.style.top = topMemory;
//       empty.style.bottom = bottomMemory;
//       empty.style.left = leftMemory;
//       empty.style.right = rightMemory;
 

//     }
//     document.removeEventListener('mousemove', onMouseMove);
//   });


// chips.forEach ((chip) => {
//   chip.addEventListener('mousedown', function(e) {
//     startX = e.pageX;
//     startY = e.pageY;

//     topMemory = chip.style.top;
//     bottomMemory = chip.style.bottom;
//     leftMemory = chip.style.left;
//     rightMemory = chip.style.right;
//     orderMemory = chip.style.order;
//     let shiftX = e.pageX - chip.getBoundingClientRect().left; 
//     let shiftY = e.pageY - chip.getBoundingClientRect().top;

//     if (chip.style.top === empty.style.bottom && chip.style.left === empty.style.left) {
//       chip.style.zIndex = 100; 
//       moveAt(e.pageX, e.pageY);
//       document.addEventListener('mousemove', onMouseMove);  
//     }

//     function moveAt(pageX, pageY) { 
//       chip.style.left = pageX - shiftX - puzzleBox.getBoundingClientRect().left + 'px';
//       chip.style.top = pageY - shiftY - puzzleBox.getBoundingClientRect().top + 'px'; 
//     }

//     function onMouseMove(e) {
//       moveAt(e.pageX, e.pageY);
//     }
  
//   }); 

//   chip.addEventListener('mouseup', (e) => {
//     console.log (`dist = ${e.pageX - startX}`);
//     if (Math.abs(e.pageX - startX)>= threshold || Math.abs(e.pageY - startY)>= threshold) {
  
//       chip.style.order = empty.style.order;
//       chip.style.top = empty.style.top;
//       chip.style.bottom = empty.style.bottom;
//       chip.style.left = empty.style.left;
//       chip.style.right = empty.style.right; 
 

//       empty.style.order = orderMemory;
//       empty.style.top = topMemory;
//       empty.style.bottom = bottomMemory;
//       empty.style.left = leftMemory;
//       empty.style.right = rightMemory;
//     }
//     document.removeEventListener('mousemove', onMouseMove);
//   });
// });



 // передвижение фишек при клике
  // chips.forEach((chip) => {
  //   chip.addEventListener('click', () => {

  //     if (chip.style.top === empty.style.bottom && chip.style.left === empty.style.left) {
  //       console.log('true');
  //       movesCount++;
  //       moves.innerHTML = `Moves ${movesCount}`;
  //       chip.classList.add('to-top');
  //       empty.classList.add('to-bottom');
  //       setTimeout(() => {
  //         bottomMemory = empty.style.bottom;
  //         topMemory = empty.style.top;
  //         orderMemory = empty.style.order;
  //         empty.style.order = chip.style.order;
  //         chip.style.order = orderMemory;
  //         empty.style.top = chip.style.top;
  //         chip.style.top = topMemory;
  //         empty.style.bottom = chip.style.bottom;
  //         chip.style.bottom = bottomMemory;
  //         chip.classList.remove('to-top');
  //         empty.classList.remove('to-bottom');
  //         isEnd(); 
  //       },500);
  //     }

  //     if (chip.style.bottom === empty.style.top && chip.style.left === empty.style.left) {
  //       movesCount++;
  //       moves.innerHTML = `Moves ${movesCount}`;
  //       chip.classList.add('to-bottom');
  //       empty.classList.add('to-top');
  //       setTimeout(() => {
  //         bottomMemory = empty.style.bottom;
  //         topMemory = empty.style.top;
  //         orderMemory = empty.style.order;
  //         empty.style.order = chip.style.order;
  //         chip.style.order = orderMemory;
  //         empty.style.top = chip.style.top;
  //         chip.style.top = topMemory;
  //         empty.style.bottom = chip.style.bottom;
  //         chip.style.bottom = bottomMemory;
  //         chip.classList.remove('to-bottom');
  //         empty.classList.remove('to-top');
  //         isEnd();        
  //       },500);       
  //     }

  //     if (chip.style.left === empty.style.right && chip.style.top === empty.style.top) {
  //       movesCount++;
  //       moves.innerHTML = `Moves ${movesCount}`;
  //       chip.classList.add('to-left');
  //       empty.classList.add('to-right');
  //       setTimeout(() => {
  //         orderMemory = empty.style.order;
  //         empty.style.order = chip.style.order;
  //         chip.style.order = orderMemory;
  //         leftMemory = empty.style.left;
  //         rightMemory = empty.style.right;
  //         empty.style.left = chip.style.left;
  //         chip.style.left = leftMemory;
  //         empty.style.right = chip.style.right;
  //         chip.style.right = rightMemory;
        
  //         chip.classList.remove('to-left');
  //         empty.classList.remove('to-right');
  //         isEnd();        
  //       },500);       
  //     }

  //     if (chip.style.right === empty.style.left && chip.style.top === empty.style.top) {
  //       movesCount++;
  //       moves.innerHTML = `Moves ${movesCount}`;
  //       chip.classList.add('to-right');
  //       empty.classList.add('to-left');
  //       setTimeout(() => {
  //         orderMemory = empty.style.order;
  //         empty.style.order = chip.style.order;
  //         chip.style.order = orderMemory;
  //         leftMemory = empty.style.left;
  //         rightMemory = empty.style.right;
  //         empty.style.left = chip.style.left;
  //         chip.style.left = leftMemory;
  //         empty.style.right = chip.style.right;
  //         chip.style.right = rightMemory;
  //         chip.classList.remove('to-right');
  //         empty.classList.remove('to-left');
  //         isEnd();        
  //       },500);       
  //     }

  //     // console.log (chips);
  //   });  
  // });




 
  



  
    
    
  




