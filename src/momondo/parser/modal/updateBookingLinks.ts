const LINK_SELECTOR = "a[class*='booking-link']";

export const updateBookingLinks = (modalElement: HTMLDivElement): void => {
  const bookingLinks = Array.from(modalElement.querySelectorAll(LINK_SELECTOR) as NodeListOf<HTMLLinkElement>);
  bookingLinks.forEach((bookingLink) => {
    // prevent adblockers from eating the click
    bookingLink.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
      },
      true,
    );
  });
};
