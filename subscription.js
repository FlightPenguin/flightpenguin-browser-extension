chrome.runtime.onMessage.addListener(function (message) {
  console.log(message.event, message);

  switch (message.event) {
    case "NOT_SUBSCRIBED":
      document.getElementById("checking-message").style.display = "none";
      document.getElementById("unsubscribed-message").style.display = null;
      break;
    default:
      break;
  }
});
