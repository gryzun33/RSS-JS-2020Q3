export function randomizer(length) {
  const arr = [];
  while (arr.length < length) {
    const number = Math.floor(Math.random() * length);
    if (!arr.includes(number)) {
      arr.push(number);
    }
  }
  return arr;
}
