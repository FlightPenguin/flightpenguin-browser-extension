export const suppressOfferFlightPenguinPopup = (): void => {
  /*
  inevitably, will end up on a payment or similar page *from our flow*.
  it'd suck to show them a popup offering to use flight penguin in this case....
   */
  sessionStorage.setItem("hasOfferedFlightPenguinSwitch", "true");
};
