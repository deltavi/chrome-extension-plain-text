chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.executeScript({
    file: 'plain-text-script.js', 
    allFrames: true
  });
});
