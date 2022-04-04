export const hasSuppressionFlag = (): boolean => {
  return !!sessionStorage.getItem("hasOfferedFlightPenguinSwitch");
};
