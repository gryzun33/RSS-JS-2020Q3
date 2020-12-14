import { createRandomSounds } from './randomizer';
import { app } from './app';

export function clickOnCategoryBtn() {
  const categoryContainers = document.querySelectorAll('.category-container');
  app.currentCount = 0;
  app.wrongAnswers = 0;
  const i = app.currentContainer;
  const containerBtn = categoryContainers[i].querySelector('.category-btn');
  app.randomSounds = createRandomSounds();
  containerBtn.addEventListener('click', () => {
    app.randomSounds[app.currentCount].sound.play();
    app.numbOfSound = app.randomSounds[app.currentCount].numb;
  });
}
