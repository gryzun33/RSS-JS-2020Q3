export function setCardstoLocalStorage(cardsM) {
  const cardsMemory = JSON.stringify(cardsM);
  localStorage.setItem('cards', cardsMemory);
}
