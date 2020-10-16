' use strict'

const burger = document.querySelector('.burger-menu');
const menuMobile = document.getElementById('menu');
const darkBackground = document.createElement('div');
const mainLink = document.getElementById('main-link');


document.body.prepend(darkBackground);

burger.addEventListener('click', function() {
  if(!burger.classList.contains('burger-menu-show')) {
    burger.classList.add('burger-menu-show');
    menuMobile.classList.add('menu-show');
    burger.classList.remove('burger-menu-hide');
    menuMobile.classList.remove('menu-hide');
    darkBackground.classList.toggle('dark');
   

  } else {
    burger.classList.add('burger-menu-hide');
    burger.classList.remove('burger-menu-show');
    menuMobile.classList.add('menu-hide');
    menuMobile.classList.remove('menu-show');
    darkBackground.classList.toggle('dark');
    // menuMobile.style.display = 'none';
  }  
});

darkBackground.addEventListener('click', function() {
    burger.classList.add('burger-menu-hide');
    burger.classList.remove('burger-menu-show');
    menuMobile.classList.add('menu-hide');
    menuMobile.classList.remove('menu-show');
    darkBackground.classList.toggle('dark');
});

mainLink.addEventListener('click', function() {
  burger.classList.add('burger-menu-hide');
  burger.classList.remove('burger-menu-show');
  menuMobile.classList.add('menu-hide');
  menuMobile.classList.remove('menu-show');
  darkBackground.classList.toggle('dark');
});