/* eslint-disable import/prefer-default-export */
export function runTimer(timerId, min, sec, currMin, currSec) {
  const time = document.querySelector('.timer');
  timerId = setInterval(() => {
    if (sec === 59) {
      min += 1;
      sec = 0;
    } else {
      sec += 1;
    }

    currMin = (parseInt(min, 10) < 10 ? '0' : '') + min;
    currSec = (parseInt(sec, 10) < 10 ? '0' : '') + sec;
    time.innerHTML = `Time ${currMin} : ${currSec}`;
  }, 1000);
  return timerId;
}
