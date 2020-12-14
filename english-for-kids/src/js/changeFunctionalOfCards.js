import { clickOnCardTrain } from './clickOnCardTrain';
import { leaveCardTrain } from './leaveCardTrain';
import { clickOnCardPlay } from './clickOnCardPlay';
import { app } from './app';
import { createArrayOfDOMCards } from './createarrayofdomcards';

export function changeFunctionalOfCards() {
  const cardElements = createArrayOfDOMCards();
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
