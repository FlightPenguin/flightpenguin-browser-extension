const AD_SELECTOR = "div[class*='Flights-Results-MultiModalUpsellResult']";

export const shouldSkipCard = (itineraryCard: HTMLElement): boolean => {
  return [isSponsoredCard(itineraryCard), isBusCard(itineraryCard), isAdvertisementCard(itineraryCard)].some(
    (value) => value,
  );
};

const isBusCard = (itineraryCard: HTMLElement): boolean => {
  const rawText = itineraryCard.textContent;
  if (!rawText) {
    return false;
  }
  return rawText.toLowerCase().includes(" bus ");
};

const isAdvertisementCard = (itineraryCard: HTMLElement): boolean => {
  return !!itineraryCard.closest(AD_SELECTOR);
};

const isSponsoredCard = (itineraryCard: HTMLElement): boolean => {
  const rawText = itineraryCard.textContent;
  if (!rawText) {
    return false;
  }
  return rawText.toLowerCase().includes(" sponsored ");
};
