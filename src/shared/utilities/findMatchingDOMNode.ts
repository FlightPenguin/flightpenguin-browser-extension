export const findMatchingDOMNode = (list: HTMLElement[], id: string) => {
  return list.find((item) => item.dataset.fpid === id);
};
