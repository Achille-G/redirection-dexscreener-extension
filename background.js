chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.url) {
    checkUrl(changeInfo.url); // Supposant que vous avez une fonction `checkUrl` similaire à celle dans `contentScript.js`
  }
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
    checkUrl(tab.url);
  });
});
