export function pause(timeout = 10_000) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
