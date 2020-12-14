import { cards } from './cards';
import { app } from './app';
import { showEndOfGame } from './showendofgame';
import { setCardstoLocalStorage } from './setLocalStorage';
import { createArrayOfDOMCards } from './createarrayofdomcards';

export function clickOnCardPlay(e) {
  const cardElements = createArrayOfDOMCards();
  const categoryContainers = document.querySelectorAll('.category-container');
  const cardsM = JSON.parse(localStorage.getItem('cards'));
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
      setCardstoLocalStorage(cardsM);
      if (app.currentCount === cards[i].length - 1) {
        elem.querySelector('.card-blackout').style.display = 'block';
        elem.classList.add('card-box-guess');
        setTimeout(() => {
          new Audio('../assets/audio/correct.mp3').play();
          starBox.prepend(starWin);
        }, 300);
        setTimeout(() => {
          showEndOfGame(cardElements);
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
      setCardstoLocalStorage(cardsM);
      app.wrongAnswers += 1;
      setTimeout(() => {
        new Audio('../assets/audio/error.mp3').play();
        starBox.prepend(star);
      }, 300);
    }
  }
}
