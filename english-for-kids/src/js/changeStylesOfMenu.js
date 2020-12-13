export function changeStylesOfMenu() {
  const blackout = document.querySelector('.blackout');
  const hamburger = document.querySelector('.header__hamburger');
  const menu = document.querySelector('.menu');
  hamburger.classList.add('hamburger-unrotate');
  hamburger.classList.remove('hamburger-rotate');
  menu.classList.add('menu-hide');
  menu.classList.remove('menu-show');
  blackout.classList.remove('blackout-show');
  blackout.classList.add('blackout-hide');
  document.body.style.overflowY = '';
}
