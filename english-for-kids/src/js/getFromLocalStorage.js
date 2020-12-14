import { cards } from './cards';

export function getCardsfromLocalStorage(cardsM) {
  const memory = localStorage.getItem('cards');
  if (memory) {
    cardsM = JSON.parse(memory);
  } else {
    cardsM = JSON.parse(JSON.stringify(cards));
    const cardsMemory = JSON.stringify(cardsM);
    localStorage.setItem('cards', cardsMemory);
  }
  return cardsM;
}
