import { changeFunctionalOfCards } from './changeFunctionalOfCards';
import { app } from './app';

export function changeCategoryBtn() {
  const categoryContainers = document.querySelectorAll('.category-container');
  const i = app.currentContainer;
  const containerBtn = categoryContainers[i].querySelector('.category-btn');
  const btnStart = containerBtn.querySelector('.category-btn-start');
  const btnRefresh = containerBtn.querySelector('.category-btn-refresh');
  app.startGame = 'true';
  btnStart.style.display = 'block';
  btnRefresh.style.display = 'none';
  btnStart.addEventListener('click', () => {
    btnStart.style.display = 'none';
    btnRefresh.style.display = 'block';
    app.startGame = 'false';
    changeFunctionalOfCards();
  });
}
