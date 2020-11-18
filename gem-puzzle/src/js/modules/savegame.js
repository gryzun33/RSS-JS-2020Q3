/* eslint-disable import/prefer-default-export */
export function saveGame(puzzle, movesCount, min, sec, currMin, currSec) {
  const time = document.querySelector('.timer');
  const moves = document.querySelector('.moves');
  const pauseField = document.querySelector('.pausefield');
  const blackout = document.querySelector('.blackout');
  const puzzleBox = document.querySelector('.puzzle-box');
  puzzle = {
    'puzzle-box': puzzleBox.innerHTML,
    'puzzle-min': min,
    'puzzle-sec': sec,
    'puzzle-currentMoves': movesCount,
  };
  localStorage.setItem('savedPuzzle', JSON.stringify(puzzle));
  pauseField.classList.remove('pause-show');
  pauseField.classList.add('pause-hide');
  blackout.classList.remove('blackout-hide');
  blackout.classList.add('blackout-show');
  movesCount = 0;
  moves.innerHTML = `Moves ${movesCount}`;
  min = 0;
  sec = 0;
  currMin = (parseInt(min, 10) < 10 ? '0' : '') + min;
  currSec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
  time.innerHTML = `Time ${currMin} : ${currSec}`;

  return (puzzle, min, sec, currMin, currSec, movesCount);
}
