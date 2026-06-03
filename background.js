chrome.commands.onCommand.addListener((command) => {
  if (command !== "_execute_action") {
    return;
  }

  chrome.action.openPopup().catch(() => {
    // Popup may already be open or the browser blocked the call.
  });
});
