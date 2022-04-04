export const suppressOfferFlightPenguinPopup = (setWindowFlag = false): void => {
  /*
  inevitably, will end up on a payment or similar page *from our flow*.
  it'd suck to show them a popup offering to use flight penguin in this case....
   */
  sessionStorage.setItem("hasOfferedFlightPenguinSwitch", "true");
  if (setWindowFlag) {
    /* some metasearch sites will open a window to their own domain, then redirect.  This is painful.
       We can set a window level flag, and clean it up when we detect it as a workaround
     */
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.hasOfferedFlightPenguinSwitch = true;
  }
};
