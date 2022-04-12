export const pause = (timeout = 10_000, jitterMin = 0, jitterMax = 0) => {
  let jitter = 0;
  if (jitterMin && jitterMax) {
    jitter += getRandomInt(jitterMin, jitterMax);
  }

  return new Promise((resolve) => {
    setTimeout(resolve, timeout + jitter);
  });
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
