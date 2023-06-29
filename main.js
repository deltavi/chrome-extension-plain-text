
import { formatFileName, composeText } from "./utils.js";

// DOWNLOAD TEXT
function downloadText(filename, text) {
  if (isWindows()) {
    text = text.replace(/\r?\n/g, "\r\n");
  }
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

//OS
function isWindows() {
  if (window && window.navigator && window.navigator.userAgent) {
    return window.navigator.userAgent.toLowerCase().indexOf("windows") != -1;
  }
  return false;
}

// EVENTS
function addOnClick(id, fn) {
  let el = document.getElementById(id);
  el.onclick = fn;
}

let params = (new URL(document.location)).searchParams;
let title = params.get("t");
let url = params.get("u");
let txt = params.get("tx");
let allText = composeText(title, url, txt);
let body = document.getElementById('chrome-extension-plain-text-body');
let infoBox = document.getElementById('info-box');
body.innerText = allText;
let zoomValue = 1;

addOnClick('zoom-in', function () {
  zoomValue *= 1.1
  body.style.setProperty('zoom', zoomValue);
});

addOnClick('zoom-out', function () {
  zoomValue *= 0.9
  body.style.setProperty('zoom', zoomValue);
});

addOnClick('edit', function (e) {
  let editLink = e.target
  if (body.contentEditable.toLowerCase() == 'true') {
    body.contentEditable = 'false';
    editLink.classList.remove("pressed")
    infoBox.style = 'display: none;'
  } else {
    body.contentEditable = 'true';
    editLink.classList.add("pressed")
    infoBox.style = 'display: initial;'
  }
});

addOnClick('copy', function (e) {
  navigator.clipboard.writeText(body.innerText)
});

addOnClick('download', function () {
  downloadText(formatFileName(title), body.innerText);
});