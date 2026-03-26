chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  chrome.contextMenus.create({
    id: "saveToOrion",
    title: "Save to ORION",
    contexts: ["page"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveToOrion") {
    chrome.runtime.sendMessage({ type: "CONTEXT_SAVE", title: tab.title, url: tab.url });
  }
});
