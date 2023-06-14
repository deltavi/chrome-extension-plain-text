chrome.action.onClicked.addListener((tab) => {
  if(tab.url.indexOf("chrome://") === -1){
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['plain-text-script.js']
    });
  }
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if(tab.url.indexOf("chrome://") === -1){
    if(info.menuItemId === 'download-text'){
      chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['plain-text-download-script.js']
      });
    }
  }
});


chrome.runtime.onInstalled.addListener(function (a,b,c) {
  chrome.contextMenus.create({
    title: 'Download Plain Text',
    id: 'download-text',
  });
});