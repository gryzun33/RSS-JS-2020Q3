const wrapper = document.createElement('div');
const menu = document.createElement('ul');
const currentGame = document.createElement('div');
const container = document.createElement('div');
const puzzleBox = document.createElement('div');
const menuItemsNames = ['New game', 'Save', 'Best scores', 'Settings', 'Rules'];
const time = document.createElement('div');
const moves = document.createElement('div');
const pause = document.createElement('div');
const blackout = document.createElement('div');


moves.classList.add('moves');
wrapper.classList.add('wrapper');
menu.classList.add('menu');
currentGame.classList.add('current');
puzzleBox.classList.add('puzzle-box');
blackout.classList.add('blackout-show');
container.classList.add(blackout);
container.classList.add(puzzleBox);

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
const saveBtn = menu.querySelector('li:nth-child(2)');
const bestScoresBtn = menu.querySelector('li:nth-child(3)');
const settingsBtn = menu.querySelector('li:nth-child(4)');
const RulesBtn = menu.querySelector('li:nth-child(5)');

console.log(RulesBtn);

wrapper.append(menu);
wrapper.append(currentGame);
wrapper.append(puzzleBox);

document.body.append(wrapper);

console.log(wrapper);


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

newGameBtn.addEventListener('click', createNewGame);

function createNewGame() {
  puzzleBox.innerHTML = '';
  movesCount = 0;
  moves.innerHTML = `Moves ${movesCount}`;
  randomArray = [];
  while (randomArray.length < 16) {
    currentNumber = Math.floor((Math.random() * 16));
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
    puzzleBox.append(currentChip);
  }
  
  
  chips = puzzleBox.querySelectorAll('.chip');
  empty = puzzleBox.querySelector('.empty');
  startDate = new Date();
  runTimer();
  chipsHandler();

}



function runTimer() {
  let currentDate = new Date();

  let diff = currentDate.getTime() - startDate.getTime();
  console.log (diff);
  let min = Math.floor(diff / 60000);
  let sec = Math.floor((diff % 60000) / 1000);

  min = (parseInt(min, 10) < 10 ? '0' : '') + min;
  sec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
  time.innerHTML = `Time ${min} : ${sec}`;

  setTimeout(runTimer, 1000);
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
        },1000);       
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
        },1000);       
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
        },1000);       
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
        },1000);       
      }

      // console.log (chips);
    });  
  });
}





