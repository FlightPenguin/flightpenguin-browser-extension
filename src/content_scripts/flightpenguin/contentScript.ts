import { getExtensionUrl } from "../../shared/utilities/getExtensionUrl";

try {
  window.location.href = getExtensionUrl();
} catch (err) {
  console.error(err);
}
