import { categories, cards } from './cards';
import { app } from './app';
import { statistic } from './stat';
import { createArrayOfDOMCards } from './createarrayofdomcards';
import { createRandomSounds } from './randomizer';
import { createStatistics } from './createstatistic';

const main = document.querySelector('.main');
let cardsM = cards;
function getCardsfromLocalStorage() {
  const memory = localStorage.getItem('cards');
  if (memory) {
    cardsM = JSON.parse(memory);
  } else {
    const cardsMemory = JSON.stringify(cardsM);
    localStorage.setItem('cards', cardsMemory);
  }
}

function setCardstoLocalStorage() {
  const cardsMemory = JSON.stringify(cardsM);
  localStorage.setItem('cards', cardsMemory);
}

getCardsfromLocalStorage();

const menu = document.createElement('div');
menu.classList.add('menu', 'menu-none');
menu.innerHTML = `<div class="menu-close"><img src="./assets/icons/close.png" alt="close" 
width="30" height="30"></div>
<div class="menu-list">
  <div class="main-item item-enabled">Main page</div>
</div>`;
document.body.prepend(menu);

const menuList = document.querySelector('.menu-list');
categories.forEach((category) => {
  const menuItem = document.createElement('div');
  menuItem.classList.add('menu-item');
  menuItem.innerHTML = `<img src="./assets/icons/categories/${category.icon}" 
  alt="${category.name}" class="menu-image">
  <div class="menu-title">${category.name}</div>`;
  menuList.append(menuItem);
});

const blackout = document.querySelector('.blackout');
const hamburger = document.querySelector('.header__hamburger');
hamburger.addEventListener('click', () => {
  hamburger.classList.add('hamburger-rotate');
  menu.classList.add('menu-show');
  menu.classList.remove('menu-none', 'menu-hide');
  blackout.classList.add('blackout-show');
  blackout.classList.remove('blackout-hide');
  document.body.style.overflowY = 'hidden';
});

const menuClose = document.querySelector('.menu-close');
menuClose.addEventListener('click', () => {
  hamburger.classList.add('hamburger-unrotate');
  hamburger.classList.remove('hamburger-rotate');
  menu.classList.add('menu-hide');
  menu.classList.remove('menu-show');
  blackout.classList.remove('blackout-show');
  blackout.classList.add('blackout-hide');
  document.body.style.overflowY = '';
});

blackout.addEventListener('click', () => {
  hamburger.classList.add('hamburger-unrotate');
  hamburger.classList.remove('hamburger-rotate');
  menu.classList.add('menu-hide');
  menu.classList.remove('menu-show');
  blackout.classList.remove('blackout-show');
  blackout.classList.add('blackout-hide');
  document.body.style.overflowY = '';
});

// create cards for all categories
const mainContainer = document.querySelector('.main-container');
const allCategoriesContainer = document.createElement('div');
allCategoriesContainer.classList.add('all-categories');
mainContainer.append(allCategoriesContainer);

const stat = document.querySelector('.stat');
const statItem = document.createElement('div');
statItem.classList.add('stat-item');
statItem.innerText = 'Statistics';
menuList.append(statItem);

categories.forEach((category) => {
  const categoryElement = document.createElement('div');
  categoryElement.classList.add('category-box');
  categoryElement.innerHTML = `
    <img src="../assets/images/categories/${category.image}" alt="${category.name}" 
    height="180px" class="category-card-image">
    <div class="card-title">${category.name}</div>`;
  allCategoriesContainer.append(categoryElement);
});

// create container for each category
categories.forEach((category) => {
  const categoryContainer = document.createElement('div');
  const nameOfClass = category.name;
  categoryContainer.classList.add('category-container', 'container-hide');
  categoryContainer.classList.add(`${nameOfClass.toLowerCase()}`);
  mainContainer.append(categoryContainer);
});

// create cards for each category
const categoryContainers = document.querySelectorAll('.category-container');
categoryContainers.forEach((currContainer, i) => {
  const categoryTitle = document.createElement('div');
  categoryTitle.classList.add('category-title');
  categoryTitle.innerText = categories[i].name;

  const starBox = document.createElement('div');
  starBox.classList.add('star-box', 'star-box-hide');

  const categoryCardBox = document.createElement('div');
  categoryCardBox.classList.add('category-card-box');

  const categoryCardBtn = document.createElement('div');
  categoryCardBtn.classList.add('category-btn', 'category-btn-hide');
  categoryCardBtn.innerHTML = `
    <div class="category-btn-start">Start game</div>
    <div class="category-btn-refresh"><img src="../assets/icons/arrow.png"></div>`;

  currContainer.append(categoryTitle);
  currContainer.append(categoryCardBox);
  currContainer.append(categoryCardBtn);
  categoryCardBox.append(starBox);

  cards[i].forEach((card) => {
    const cardElem = document.createElement('div');
    cardElem.classList.add('card-box');
    cardElem.innerHTML = `
      <div class="card-blackout"></div> 
      <div class="card-box-front">  
        <img src="../assets/images/${card.image}" alt="${card.word}" height="150px" 
        class="card-image">
        <div class="card-front-description">
          <div class="card-title">${card.word}</div>
          <button class="card-btn"></button>
        </div>
      </div>
      <div class="card-box-back">  
        <img src="../assets/images/${card.image}" alt="${card.word}" height="150px" 
        class="card-image">
        <div class="card-back-description">
          <div class="card-title">${card.translation}</div>  
        </div>
      </div>  `;
    card.domElem = cardElem;
    categoryCardBox.append(cardElem);
  });
});

const mainItem = document.querySelector('.main-item');
const menuItems = document.querySelectorAll('.menu-item');
const cardElements = createArrayOfDOMCards();
const categoryCards = document.querySelectorAll('.category-box');

function showEndOfGame() {
  categoryContainers.forEach((container) => {
    container.classList.add('container-hide');
  });
  if (app.wrongAnswers === 0) {
    new Audio('../assets/audio/success.mp3').play();
    document.querySelector('.end-game-success').classList.remove('end-hide');
    setTimeout(() => {
      document.querySelector('.end-game-success').classList.add('end-hide');
      allCategoriesContainer.classList.remove('container-hide');
      mainItem.classList.add('item-enabled');
      menuItems.forEach((item) => {
        item.classList.remove('item-enabled');
      });
    }, 4000);
  } else if (app.wrongAnswers > 0) {
    new Audio('../assets/audio/failure.mp3').play();
    document.querySelector('.end-game-failure').classList.remove('end-hide');
    document.querySelector(
      '.failure-mistakes',
    ).innerText = `You have ${app.wrongAnswers} mistakes`;
    setTimeout(() => {
      document.querySelector('.end-game-failure').classList.add('end-hide');
      allCategoriesContainer.classList.remove('container-hide');
      mainItem.classList.add('item-enabled');
      menuItems.forEach((item) => {
        item.classList.remove('item-enabled');
      });
    }, 4000);
  }
  app.startGame = 'true';
  const i = app.currentContainer;
  cardElements[i].forEach((elem) => {
    elem.querySelector('.card-blackout').style.display = 'none';
    elem.classList.remove('card-box-guess');
  });
}

function clickOnCardTrain(e) {
  const { target } = e;
  if (target.closest('.card-btn')) {
    target.closest('.card-box').classList.add('card-box-rotate');
  }
  if (target.closest('.card-box') && !target.closest('.card-btn')) {
    const elem = target.closest('.card-box');
    const i = app.currentContainer;
    const j = cards[i].findIndex((card) => card.domElem === elem);
    new Audio(`../assets/${cards[i][j].audioSrc}`).play();
    cardsM[i][j].train += 1;
    setCardstoLocalStorage();
  }
}

function leaveCardTrain(e) {
  const { target } = e;
  if (target.closest('.card-box')) {
    target.closest('.card-box').classList.remove('card-box-rotate');
  }
}

function clickOnCardPlay(e) {
  const star = document.createElement('div');
  star.classList.add('star');
  star.innerHTML =
    '<img src="../assets/icons/star.svg" alt="star" width="30px" height="30px">';
  const starWin = document.createElement('div');
  starWin.classList.add('star');
  starWin.innerHTML =
    '<img src="../assets/icons/star-win.svg" alt="star" width="30px" height="30px">';
  const numb = app.numbOfSound;
  const { target } = e;
  if (target.closest('.card-blackout')) {
    return;
  }
  if (target.closest('.card-box')) {
    const elem = target.closest('.card-box');
    const i = app.currentContainer;
    const j = cards[i].findIndex((card) => card.domElem === elem);
    const starBox = categoryContainers[i].querySelector('.star-box');
    if (j === numb) {
      cardsM[i][j].correct += 1;
      setCardstoLocalStorage();
      if (app.currentCount === cards[i].length - 1) {
        elem.querySelector('.card-blackout').style.display = 'block';
        elem.classList.add('card-box-guess');
        setTimeout(() => {
          new Audio('../assets/audio/correct.mp3').play();
          starBox.prepend(starWin);
        }, 300);
        setTimeout(() => {
          showEndOfGame();
          starBox.innerHTML = '';
        }, 1300);
      } else {
        elem.querySelector('.card-blackout').style.display = 'block';
        elem.classList.add('card-box-guess');
        app.currentCount += 1;
        setTimeout(() => {
          new Audio('../assets/audio/correct.mp3').play();
          starBox.prepend(starWin);
        }, 300);
        setTimeout(() => {
          app.randomSounds[app.currentCount].sound.play();
          app.numbOfSound = app.randomSounds[app.currentCount].numb;
        }, 1300);
      }
    } else {
      cardsM[i][j].incorrect += 1;
      setCardstoLocalStorage();
      app.wrongAnswers += 1;
      setTimeout(() => {
        new Audio('../assets/audio/error.mp3').play();
        starBox.prepend(star);
      }, 300);
    }
  }
}

function changeFunctionalOfCards() {
  const i = app.currentContainer;
  for (let j = 0; j < cardElements[i].length; j += 1) {
    if (app.state === 'play' && app.startGame === 'true') {
      cardElements[i][j].removeEventListener('click', clickOnCardTrain);
      cardElements[i][j].removeEventListener('mouseleave', leaveCardTrain);
      cardElements[i][j].removeEventListener('click', clickOnCardPlay);
    } else if (app.state === 'train') {
      cardElements[i][j].addEventListener('click', clickOnCardTrain);
      cardElements[i][j].addEventListener('mouseleave', leaveCardTrain);
      cardElements[i][j].removeEventListener('click', clickOnCardPlay);
    } else if (app.state === 'play' && app.startGame === 'false') {
      cardElements[i][j].removeEventListener('click', clickOnCardTrain);
      cardElements[i][j].removeEventListener('mouseleave', leaveCardTrain);
      cardElements[i][j].addEventListener('click', clickOnCardPlay);
    }
  }
}

function changeCategoryBtn() {
  const i = app.currentContainer;
  const containerBtn = categoryContainers[i].querySelector('.category-btn');
  const btnStart = containerBtn.querySelector('.category-btn-start');
  const btnRefresh = containerBtn.querySelector('.category-btn-refresh');
  app.startGame = 'true';
  btnStart.style.display = 'block';
  btnRefresh.style.display = 'none';
  btnStart.addEventListener('click', () => {
    btnStart.style.display = 'none';
    btnRefresh.style.display = 'block';
    app.startGame = 'false';
    changeFunctionalOfCards();
  });
}

function clickOnCategoryBtn() {
  app.currentCount = 0;
  app.wrongAnswers = 0;
  const i = app.currentContainer;
  const containerBtn = categoryContainers[i].querySelector('.category-btn');
  app.randomSounds = createRandomSounds();
  containerBtn.addEventListener('click', () => {
    app.randomSounds[app.currentCount].sound.play();
    app.numbOfSound = app.randomSounds[app.currentCount].numb;
  });
}

// click on categoryCards
categoryCards.forEach((box, i) => {
  box.addEventListener('click', () => {
    app.currentContainer = i;
    changeFunctionalOfCards();
    changeCategoryBtn();
    clickOnCategoryBtn();

    categoryContainers.forEach((container) => {
      container.classList.add('container-hide');
    });
    categoryContainers[i].classList.remove('container-hide');
    allCategoriesContainer.classList.add('container-hide');

    mainItem.classList.remove('item-enabled');
    menuItems.forEach((el) => {
      el.classList.remove('item-enabled');
    });
    menuItems[i].classList.add('item-enabled');
  });
});

mainItem.addEventListener('click', () => {
  main.style.display = 'flex';
  mainItem.classList.add('item-enabled');
  menuItems.forEach((item) => {
    item.classList.remove('item-enabled');
  });
  allCategoriesContainer.classList.remove('container-hide');
  categoryContainers.forEach((container) => {
    container.classList.add('container-hide');
    const starBox = container.querySelector('.star-box');
    starBox.innerHTML = '';
  });
  hamburger.classList.add('hamburger-unrotate');
  hamburger.classList.remove('hamburger-rotate');
  menu.classList.add('menu-hide');
  menu.classList.remove('menu-show');
  blackout.classList.remove('blackout-show');
  blackout.classList.add('blackout-hide');
  document.body.style.overflowY = '';

  app.startGame = 'true';
  const i = app.currentContainer;
  cardElements[i].forEach((elem) => {
    elem.querySelector('.card-blackout').style.display = 'none';
    elem.classList.remove('card-box-guess');
  });
  stat.classList.add('stat-hide');
  statItem.classList.remove('item-enabled');
});

menuItems.forEach((item, i) => {
  item.addEventListener('click', () => {
    main.style.display = 'flex';
    cardElements[app.currentContainer].forEach((elem) => {
      elem.querySelector('.card-blackout').style.display = 'none';
      elem.classList.remove('card-box-guess');
    });
    app.currentContainer = i;
    changeFunctionalOfCards();
    changeCategoryBtn();
    clickOnCategoryBtn();
    mainItem.classList.remove('item-enabled');
    menuItems.forEach((el) => {
      el.classList.remove('item-enabled');
    });
    item.classList.add('item-enabled');
    categoryContainers.forEach((container) => {
      container.classList.add('container-hide');
    });
    categoryContainers[i].classList.remove('container-hide');
    allCategoriesContainer.classList.add('container-hide');
    hamburger.classList.add('hamburger-unrotate');
    hamburger.classList.remove('hamburger-rotate');
    menu.classList.add('menu-hide');
    menu.classList.remove('menu-show');
    blackout.classList.remove('blackout-show');
    blackout.classList.add('blackout-hide');
    document.body.style.overflowY = '';

    const starBox = categoryContainers[i].querySelector('.star-box');
    starBox.innerHTML = '';

    stat.classList.add('stat-hide');
    statItem.classList.remove('item-enabled');
  });
});

function changeStyleOfCards() {
  categoryCards.forEach((categoryCard) => {
    categoryCard.classList.toggle('category-box-play');
  });
  categoryContainers.forEach((container, i) => {
    const starBox = container.querySelector('.star-box');
    starBox.innerHTML = '';
    const descriptions = container.querySelectorAll('.card-front-description');
    const btn = container.querySelector('.category-btn');
    descriptions.forEach((descr, j) => {
      cardElements[i][j].querySelector('.card-blackout').style.display = 'none';
      cardElements[i][j].classList.remove('card-box-guess');
      if (app.state === 'play') {
        descr.classList.add('card-description-hide');
        btn.classList.remove('category-btn-hide');
        cardElements[i][j].classList.add('card-box-play');
        starBox.classList.remove('star-box-hide');
      } else if (app.state === 'train') {
        descr.classList.remove('card-description-hide');
        cardElements[i][j].classList.remove('card-box-play');
        btn.classList.add('category-btn-hide');
        starBox.classList.add('star-box-hide');
      }
    });
  });
}

// toggle switcher train-play
const switcher = document.querySelector('.header__switcher');
const switcherHandle = document.querySelector('.switcher__handle');
const switcherTrain = document.querySelector('.switcher__train');
const switcherPlay = document.querySelector('.switcher__play');
switcher.addEventListener('click', () => {
  if (app.state === 'train') {
    app.state = 'play';
    switcher.classList.add('header__switcher_play');
    switcher.classList.remove('header__switcher_train');
    switcherHandle.classList.add('switcher__handle_right');
    switcherTrain.style.display = 'none';
    switcherPlay.style.display = 'block';
  } else {
    app.state = 'train';
    switcher.classList.add('header__switcher_train');
    switcher.classList.remove('header__switcher_play');
    switcherHandle.classList.remove('switcher__handle_right');
    switcherTrain.style.display = 'block';
    switcherPlay.style.display = 'none';
  }
  changeStyleOfCards();
  changeCategoryBtn();
  clickOnCategoryBtn();
  changeFunctionalOfCards();
});

// click on statistics
statItem.addEventListener('click', () => {
  createStatistics();
  main.style.display = 'none';
  hamburger.classList.add('hamburger-unrotate');
  hamburger.classList.remove('hamburger-rotate');
  menu.classList.add('menu-hide');
  menu.classList.remove('menu-show');
  blackout.classList.remove('blackout-show');
  blackout.classList.add('blackout-hide');
  document.body.style.overflowY = '';

  mainItem.classList.remove('item-enabled');
  menuItems.forEach((el) => {
    el.classList.remove('item-enabled');
  });
  statItem.classList.add('item-enabled');
  categoryContainers.forEach((container) => {
    container.classList.add('container-hide');
  });
  allCategoriesContainer.classList.add('container-hide');
  stat.classList.remove('stat-hide');
});

// sortStatistic
const statItems = document.querySelectorAll('.stat-table th');
statItems.forEach((item, j) => {
  item.addEventListener('click', () => {
    app.sortStat = true;
    let arrOfCards = [];
    for (let i = 0; i < cardsM.length; i += 1) {
      arrOfCards = arrOfCards.concat(cardsM[i]);
    }
    const param = item.getAttribute('data-cat');
    statistic[j].sortedUp = !statistic[j].sortedUp;
    if (statistic[j].sortedUp) {
      arrOfCards = arrOfCards.sort((a, b) => {
        if (a[param] > b[param]) {
          return 1;
        }
        if (a[param] < b[param]) {
          return -1;
        }
        return 0;
      });
    } else {
      arrOfCards = arrOfCards.sort((a, b) => {
        if (a[param] < b[param]) {
          return 1;
        }
        if (a[param] > b[param]) {
          return -1;
        }
        return 0;
      });
    }
    createStatistics(arrOfCards);
  });
});

// reset statistics
const resetBtn = document.querySelector('.stat-reset');
resetBtn.addEventListener('click', () => {
  cardsM = cards;
  setCardstoLocalStorage();
  createStatistics();
});
