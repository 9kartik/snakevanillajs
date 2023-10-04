export function lowestMultipleOf (num, size) {
  return num - num % size;
}

export function getRandomInt (max) {
  return Math.floor(Math.random() * max);
}
