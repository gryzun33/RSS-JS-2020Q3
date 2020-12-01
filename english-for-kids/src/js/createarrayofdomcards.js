export function createArrayOfDOMCards() {
  const categoryContainers = document.querySelectorAll('.category-container');
  const mainArray = [];
  for (let i = 0; i < categoryContainers.length; i += 1) {
    const cardsInCategory = categoryContainers[i].querySelectorAll('.card-box');
    const innerArray = [];
    for (let j = 0; j < cardsInCategory.length; j += 1) {
      innerArray.push(cardsInCategory[j]);
    }
    mainArray.push(innerArray);
  }

  return mainArray;
}
