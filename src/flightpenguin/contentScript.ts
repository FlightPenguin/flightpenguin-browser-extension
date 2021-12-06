import { updateFlyingButtons } from "./updateFlyingButtons";

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    updateFlyingButtons();
  }
};
