export function createStatistics() {
  const statBody = document.querySelector('.stat-body');
  statBody.innerHTML = '';
  const memory = localStorage.getItem('cards');
  let cardsInMemory;
  if (memory) {
    cardsInMemory = JSON.parse(memory);
  }
  for (let i = 0; i < cardsInMemory.length; i += 1) {
    for (let j = 0; j < cardsInMemory[i].length; j += 1) {
      const elem = document.createElement('tr');
      cardsInMemory[i][j].percent = Math.round(
        (cardsInMemory[i][j].correct /
          (cardsInMemory[i][j].correct + cardsInMemory[i][j].incorrect)) *
          100,
      );
      if (Number.isNaN(cardsInMemory[i][j].percent)) {
        cardsInMemory[i][j].percent = 0;
      }
      elem.innerHTML = `
      <td class="td-category">${cardsInMemory[i][j].category}</td>
      <td class="td-word">${cardsInMemory[i][j].word}</td>
      <td class="td-translation">${cardsInMemory[i][j].translation}</td>
      <td class="td-train">${cardsInMemory[i][j].train}</td>
      <td class="td-correct">${cardsInMemory[i][j].correct}</td>
      <td class="td-incorrect">${cardsInMemory[i][j].incorrect}</td>
      <td class="td-percent">${cardsInMemory[i][j].percent}</td>  
      `;
      statBody.append(elem);
    }
  }
}
