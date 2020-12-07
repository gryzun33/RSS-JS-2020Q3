import { app } from './app';

export function showEndOfGame(cardElements) {
  const categoryContainers = document.querySelectorAll('.category-container');
  const allCategoriesContainer = document.querySelector('.all-categories');
  const mainItem = document.querySelector('.main-item');
  const menuItems = document.querySelectorAll('.menu-item');
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
