import { categories, cards } from './cards';
// import { doc } from 'prettier';

// const hamburger = document.querySelector('.header__hamburger');
const menu = document.createElement('div');
menu.classList.add('menu', 'menu-hide');
menu.innerHTML = `<div class="menu-close"><img src="./assets/icons/close.png" alt="close"></div>
<div class="menu-list">
  <div class="main-item">Main page</div>
</div>`;
document.querySelector('body').prepend(menu);

const menuList = document.querySelector('.menu-list');
categories.forEach((category) => {
  const menuItem = document.createElement('div');
  menuItem.classList.add('menu-item');
  menuItem.innerHTML = `<img src="./assets/icons/categories/${category.icon}" 
  alt="${category.name}" class="menu-image">
  <div class="menu-title">${category.name}</div>`;
  menuList.append(menuItem);
});

const switcher = document.querySelector('.header__switcher');
const switcherHandle = document.querySelector('.switcher__handle');
const switcherTrain = document.querySelector('.switcher__train');
const switcherPlay = document.querySelector('.switcher__play');
switcher.addEventListener('click', () => {
  if (switcher.classList.contains('header__switcher_train')) {
    switcher.classList.add('header__switcher_play');
    switcher.classList.remove('header__switcher_train');
    switcherHandle.classList.add('switcher__handle_right');
    switcherTrain.style.display = 'none';
    switcherPlay.style.display = 'block';
  } else {
    switcher.classList.add('header__switcher_train');
    switcher.classList.remove('header__switcher_play');
    switcherHandle.classList.remove('switcher__handle_right');
    switcherTrain.style.display = 'block';
    switcherPlay.style.display = 'none';
  }
});

function clickOnCard(card, cardElem) {
  cardElem.addEventListener('click', () => {
    // console.log('click');
    new Audio(`../assets/${card.audioSrc}`).play();
  });
}

function clickOnBtn(btn, cardElem) {
  btn.addEventListener('click', () => {
    console.log('click');
    cardElem.classList.add('card-box-rotate');
  });
  cardElem.addEventListener('mouseleave', () => {
    cardElem.classList.remove('card-box-rotate');
  });
}
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

  const categoryCardBox = document.createElement('div');
  categoryCardBox.classList.add('category-card-box');

  currContainer.append(categoryTitle);
  currContainer.append(categoryCardBox);

  cards[i].forEach((card) => {
    const cardElem = document.createElement('div');
    cardElem.classList.add('card-box');
    cardElem.innerHTML = `
      <div class="card-box-front">  
        <img src="../assets/images/${card.image}" alt="${card.word}" height="200px" class="card-image">
        <div class="card-description">
          <div class="card-title">${card.word}</div>
          <button class="card-btn"></button>
        </div>
      </div>
      <div class="card-box-back">  
        <img src="../assets/images/${card.image}" alt="${card.word}" height="200px" class="card-image">
        <div class="card-description">
          <div class="card-title">${card.translation}</div>  
        </div>
      </div>  `;
    categoryCardBox.append(cardElem);
    const btn = cardElem.querySelector('.card-btn');
    clickOnCard(card, cardElem);
    clickOnBtn(btn, cardElem);
  });
});

// click on category
const categoryCards = document.querySelectorAll('.category-box');
// console.log(categoryCards);

categoryCards.forEach((box, i) => {
  box.addEventListener('click', () => {
    categoryContainers.forEach((container) => {
      container.classList.add('container-hide');
    });
    categoryContainers[i].classList.remove('container-hide');
    allCategoriesContainer.classList.add('container-hide');
  });
});
