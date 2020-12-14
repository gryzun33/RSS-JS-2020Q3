import { cards } from './cards';
import { app } from './app';
import { setCardstoLocalStorage } from './setLocalStorage';

export function clickOnCardTrain(e) {
  const cardsM = JSON.parse(localStorage.getItem('cards'));
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
    setCardstoLocalStorage(cardsM);
  }
}
