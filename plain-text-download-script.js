
// API
// DOWNLOAD TEXT
function downloadText(filename, text) {
    if (isWindows()) {
        text = text.replace(/\r?\n/g, "\r\n")
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

function extractText(){
    // URL, TITLE & TEXT
    var innerText = document.body.innerText;
    var urlLb = 'URL: ';
    var titleLb = 'Title: ';
    var title = titleLb + document.title;
    var pageUrl = urlLb + window.location.href;
    var info = pageUrl + '\n' + title + '\n' + Array(Math.max(title.length, pageUrl.length) + 1).join('-');
    innerText = info + '\n\n' + innerText;
    downloadText('page-content.txt', innerText)
}

extractText()