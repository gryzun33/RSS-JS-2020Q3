import { cards } from './cards';
import { categories } from './categories';
import { app } from './app';
import { statistic } from './stat';
import { createArrayOfDOMCards } from './createarrayofdomcards';
import { clickOnCategoryBtn } from './clickOnCategoryBtn';
import { createStatistics } from './createstatistic';
import { changeStyleOfCards } from './changestyleofcards';
import { createMenu } from './menu';
import { createCardHTML } from './createCardHTML';
import { changeStylesOfMenu } from './changeStylesOfMenu';
import { getCardsfromLocalStorage } from './getFromLocalStorage';
import { setCardstoLocalStorage } from './setLocalStorage';
import { changeFunctionalOfCards } from './changeFunctionalOfCards';
import { changeCategoryBtn } from './changeCategoryBtn';

createMenu();
const main = document.querySelector('.main');
const statItem = document.querySelector('.stat-item');
const stat = document.querySelector('.stat');

let cardsM;
cardsM = getCardsfromLocalStorage(cardsM);

// create cards for all categories
const mainContainer = document.querySelector('.main-container');
const allCategoriesContainer = document.createElement('div');
allCategoriesContainer.classList.add('all-categories');
mainContainer.append(allCategoriesContainer);

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
    cardElem.innerHTML = createCardHTML(card.image, card.word, card.translation);
    card.domElem = cardElem;
    categoryCardBox.append(cardElem);
  });
});

const mainItem = document.querySelector('.main-item');
const menuItems = document.querySelectorAll('.menu-item');
const cardElements = createArrayOfDOMCards();
const categoryCards = document.querySelectorAll('.category-box');

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
  changeStylesOfMenu();
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
    changeStylesOfMenu();
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
    const starBox = categoryContainers[i].querySelector('.star-box');
    starBox.innerHTML = '';
    stat.classList.add('stat-hide');
    statItem.classList.remove('item-enabled');
  });
});

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
  changeStyleOfCards(cardElements);
  changeCategoryBtn();
  clickOnCategoryBtn();
  changeFunctionalOfCards();
});

// click on statistics
statItem.addEventListener('click', () => {
  createStatistics();
  changeStylesOfMenu();
  main.style.display = 'none';
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
  cardsM = JSON.parse(JSON.stringify(cards));
  setCardstoLocalStorage(cardsM);
  createStatistics();
});
