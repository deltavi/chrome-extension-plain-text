var extensionId = 'chrome-extension-plain-text';
if (document.querySelectorAll('#' + extensionId).length == 0) {

    //BODY
    var body = document.createElement('div');

    //HEADER
    var header = document.createElement('div');
    header.id = extensionId;
    header.style.setProperty('float', 'right', 'important');

    // EDIT
    var editLink = document.createElement('a');
    editLink.innerText = 'Edit';
    editLink.href = '#';
    editLink.style.setProperty('color', '#0366d6');
    editLink.style.setProperty('text-decoration', 'unset');
    editLink.style.setProperty('background', '#dddddd');
    editLink.style.setProperty('border', '1px solid #aaaaaa');
    editLink.style.setProperty('border-radius', '4px');
    editLink.style.setProperty('padding', '3px 5px');
    editLink.style.setProperty('font-weight', 'bold');
    editLink.onclick = function () {
        if (body.contentEditable.toLowerCase() == 'true') {
            body.contentEditable = 'false';
            editLink.style.setProperty('background', '#dddddd');
            editLink.style.setProperty('color', '#0366d6');
            editLink.style.setProperty('border', '1px solid #aaaaaa');
        } else {
            body.contentEditable = 'true';
            editLink.style.setProperty('border', '1px solid #0000ac');
            editLink.style.setProperty('background', '#0366d6');
            editLink.style.setProperty('color', '#ffffff');
        }
       
    }
    header.appendChild(editLink);

    // DOWNLOAD
    var downloadLink = document.createElement('a');
    downloadLink.innerText = 'Download';
    downloadLink.href = '#';
    downloadLink.style.setProperty('margin-left', '5px');
    downloadLink.style.setProperty('color', '#0366d6');
    downloadLink.style.setProperty('text-decoration', 'unset');
    downloadLink.style.setProperty('background', '#dddddd');
    downloadLink.style.setProperty('border', '1px solid #aaaaaa');
    downloadLink.style.setProperty('border-radius', '4px');
    downloadLink.style.setProperty('padding', '3px 5px');
    downloadLink.style.setProperty('font-weight', 'bold');
    downloadLink.onclick = function () {
        downloadText('page-content.txt', body.innerText);
    }
    header.appendChild(downloadLink);

    // TITLE & TEXT
    var innerText = document.body.innerText;

    var titleLb = 'Title: ';
    if (!body.innerText.startsWith(titleLb)) {
        var title = titleLb + document.title;
        title += '\n' + Array(title.length + 1).join('-');
        body.innerText = title + '\n\n' + innerText;
    } else {
        body.innerText = innerText;
    }

    // NEW BODY
    document.body.innerText = '';
    document.head.innerText = '';
    document.body.appendChild(header)
    document.body.appendChild(body)

    // STYLE
    var css = ':focus{ background-color: unset; outline: unset;}';
    var globalStyle = document.createElement('style');
    globalStyle.appendChild(document.createTextNode(css));
    document.body.appendChild(globalStyle);

    var style = document.body.style;
    style.setProperty('padding', '10px', 'important');
    style.setProperty('margin', '0', 'important');
    style.setProperty('background', 'white', 'important');
    style.setProperty('color', 'black', 'important');
    style.setProperty('font-family', 'Courier New', 'important');
    style.setProperty('font-size', '13px', 'important');
    style.setProperty('text-align', 'left', 'important');
    style.setProperty('line-height', '1.5', 'important');

    // GO TO TOP
    document.body.scrollIntoView();
}

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