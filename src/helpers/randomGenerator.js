export const random = (min, max, doRoundOff) => {
  doRoundOff = doRoundOff || false;

  let randomValue = Math.random() * (max - min) + min;

  if (doRoundOff) {
    return Math.floor(randomValue);
  }

  return randomValue;
};
