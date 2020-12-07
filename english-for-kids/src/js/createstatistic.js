export function createStatistics(arrSortedCards) {
  const statBody = document.querySelector('.stat-body');
  statBody.innerHTML = '';
  let arrCards = [];
  if (arrSortedCards) {
    arrCards = arrSortedCards;
  } else {
    const memory = localStorage.getItem('cards');
    const cardsInMemory = JSON.parse(memory);
    for (let i = 0; i < cardsInMemory.length; i += 1) {
      arrCards = arrCards.concat(cardsInMemory[i]);
    }
  }
  for (let i = 0; i < arrCards.length; i += 1) {
    const elem = document.createElement('tr');
    arrCards[i].percent = Math.round(
      (arrCards[i].correct / (arrCards[i].correct + arrCards[i].incorrect)) *
        100,
    );
    if (Number.isNaN(arrCards[i].percent)) {
      arrCards[i].percent = 0;
    }
    elem.innerHTML = `
    <td class="td-category">${arrCards[i].category}</td>
    <td class="td-word">${arrCards[i].word}</td>
    <td class="td-translation">${arrCards[i].translation}</td>
    <td class="td-train">${arrCards[i].train}</td>
    <td class="td-correct">${arrCards[i].correct}</td>
    <td class="td-incorrect">${arrCards[i].incorrect}</td>
    <td class="td-percent">${arrCards[i].percent}</td>
    `;
    statBody.append(elem);
  }
}
