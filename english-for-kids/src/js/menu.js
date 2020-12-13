import { categories } from './categories';
import { changeStylesOfMenu } from './changeStylesOfMenu';

export function createMenu() {
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
    changeStylesOfMenu();
  });

  blackout.addEventListener('click', () => {
    changeStylesOfMenu();
  });

  const statItem = document.createElement('div');
  statItem.classList.add('stat-item');
  statItem.innerText = 'Statistics';
  menuList.append(statItem);
}
