import { app } from './app';
import { cards } from './cards';

function randomizer(length) {
  const arr = [];
  while (arr.length < length) {
    const number = Math.floor(Math.random() * length);
    if (!arr.includes(number)) {
      arr.push(number);
    }
  }
  return arr;
}

export function createRandomSounds() {
  const i = app.currentContainer;
  const randomArray = randomizer(8);
  const randomSounds = [];
  for (let j = 0; j < randomArray.length; j += 1) {
    const audioWord = {};
    audioWord.sound = new Audio(
      `../assets/${cards[i][randomArray[j]].audioSrc}`,
    );
    audioWord.numb = randomArray[j];
    randomSounds.push(audioWord);
  }

  return randomSounds;
}
