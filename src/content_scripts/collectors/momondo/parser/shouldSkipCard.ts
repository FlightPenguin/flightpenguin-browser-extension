const UPDATE_FILTER_AD_SELECTOR = "div[class*='Flights-Results-MultiModalUpsellResult']";
const INLINE_AD_SELECTOR = "[class*='inlineAd']";

export const shouldSkipCard = (itineraryCard: HTMLElement): boolean => {
  return [
    isSponsoredCard(itineraryCard),
    isBusCard(itineraryCard),
    isUpdateFilterAdvertisementCard(itineraryCard),
  ].some((value) => value);
};

const isBusCard = (itineraryCard: HTMLElement): boolean => {
  const rawText = itineraryCard.textContent;
  if (!rawText) {
    return false;
  }
  return rawText.toLowerCase().includes(" bus ");
};

const isUpdateFilterAdvertisementCard = (itineraryCard: HTMLElement): boolean => {
  return !!itineraryCard.closest(UPDATE_FILTER_AD_SELECTOR);
};

const isSponsoredCard = (itineraryCard: HTMLElement): boolean => {
  return !!itineraryCard.querySelector(INLINE_AD_SELECTOR);
};
