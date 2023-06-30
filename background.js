import { formatFileName, composeText } from "./utils.js";

function extractText() {
  const title = document.title;
  const url = window.location.href;
  return { 
    title: title,  
    url: url,
    text: window.getSelection().toString().trim() || document.body.innerText
  }
};

function copyText() {
  function composeText(title, url, body) {
    return title + '\n' + url + "\n\n" + body;
  }
  let allText = composeText(document.title, window.location.href, window.getSelection().toString().trim() || document.body.innerText);
  navigator.clipboard.writeText(allText);
  return allText;
};


chrome.action.onClicked.addListener( (tab) => {
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: extractText,
  }).then(async (r) => {
    const res = r[0].result
    let resTab = await chrome.tabs.create({url: chrome.runtime.getURL("plain-text.html?t=" + encodeURIComponent(res.title) +"&u=" + encodeURIComponent(res.url) +"&tx=" + encodeURIComponent(res.text))});
    //console.log("resTab", resTab);
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if(tab.url.indexOf("chrome://") === -1){
    if(info.menuItemId === 'download-text'){
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: extractText,
      }).then(async (r) => {
        const res = r[0].result
        const allText = composeText(res.title , res.url, res.text)
        chrome.downloads.download({
          url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(allText),
          filename: formatFileName(res.title),
          saveAs: true
        });
      });
    } else if(info.menuItemId === 'copy-text'){
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: copyText,
      }).then(async (r) => {
        /*
        const allText = r[0].result
        console.log("allText", allText);
        */
      });
    }
  }
});

chrome.runtime.onInstalled.addListener(function (a,b,c) {
  chrome.contextMenus.create({
    title: 'Copy',
    id: 'copy-text',
    contexts: ['all'],
  });
  chrome.contextMenus.create({
    title: 'Download',
    id: 'download-text',
    contexts: ['all'],
  });
});