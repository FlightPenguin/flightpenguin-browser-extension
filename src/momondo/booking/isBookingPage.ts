export const isBookingPage = (): boolean => {
  return [isExpectedPath(), hasBookPageClass(), hasBookFormClass()].some((value) => {
    return value;
  });
};

const isExpectedPath = () => {
  return window.location.pathname.toLowerCase() === "/book/flight";
};

const hasBookPageClass = () => {
  return !!document.querySelector("[class*='BookPage']");
};

const hasBookFormClass = () => {
  return !!document.querySelector("[class*='bookForm']");
};
