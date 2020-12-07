import { app } from './app';

export function changeStyleOfCards(cardElements) {
  const categoryContainers = document.querySelectorAll('.category-container');
  const categoryCards = document.querySelectorAll('.category-box');
  categoryCards.forEach((categoryCard) => {
    categoryCard.classList.toggle('category-box-play');
  });
  categoryContainers.forEach((container, i) => {
    const starBox = container.querySelector('.star-box');
    starBox.innerHTML = '';
    const descriptions = container.querySelectorAll('.card-front-description');
    const btn = container.querySelector('.category-btn');
    descriptions.forEach((descr, j) => {
      cardElements[i][j].querySelector('.card-blackout').style.display = 'none';
      cardElements[i][j].classList.remove('card-box-guess');
      if (app.state === 'play') {
        descr.classList.add('card-description-hide');
        btn.classList.remove('category-btn-hide');
        cardElements[i][j].classList.add('card-box-play');
        starBox.classList.remove('star-box-hide');
      } else if (app.state === 'train') {
        descr.classList.remove('card-description-hide');
        cardElements[i][j].classList.remove('card-box-play');
        btn.classList.add('category-btn-hide');
        starBox.classList.add('star-box-hide');
      }
    });
  });
}
