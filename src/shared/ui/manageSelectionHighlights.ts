export const highlightSelectedElement = (element: HTMLElement) => {
  element.style.border = "10px solid #f2554b";
  element.style.borderRadius = "6px";
  element.style.paddingTop = "25px";
  element.style.paddingBottom = "25px";
  element.dataset.selected = "true";
};

export const clearHighlightFromElement = (element: HTMLElement) => {
  element.dataset.selected = "false";
  element.style.border = "";
  element.style.paddingTop = "0px";
  element.style.paddingBottom = "0px";
  element.style.borderRadius = "0px";
};
