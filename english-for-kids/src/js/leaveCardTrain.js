export function leaveCardTrain(e) {
  const { target } = e;
  if (target.closest('.card-box')) {
    target.closest('.card-box').classList.remove('card-box-rotate');
  }
}
