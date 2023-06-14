var extensionId = 'chrome-extension-plain-text';
if (document.querySelectorAll('#' + extensionId).length == 0) {

    //BODY
    var body = document.createElement('div');

    //HEADER
    var header = document.createElement('div');
    header.id = extensionId;
    header.style.setProperty('float', 'right', 'important');

    var zoomValue = 1;

    // ZOOM IN
    var zoomInLink = document.createElement('a');
    zoomInLink.innerHTML = '&#x2795;'
    zoomInLink.href = '#';
    zoomInLink.title = 'Zoom In';
    zoomInLink.style.setProperty('color', '#0366d6');
    zoomInLink.style.setProperty('text-decoration', 'unset');
    zoomInLink.style.setProperty('background', '#dddddd');
    zoomInLink.style.setProperty('border', '1px solid #aaaaaa');
    zoomInLink.style.setProperty('border-radius', '4px');
    zoomInLink.style.setProperty('padding', '3px 5px');
    zoomInLink.style.setProperty('font-weight', 'bold');
    zoomInLink.style.setProperty('user-select', 'none');
    zoomInLink.onclick = function () {
        zoomValue *= 1.1
        body.style.setProperty('zoom', zoomValue);
    }
    header.appendChild(zoomInLink);

    // ZOOM OUT
    var zoomOutLink = document.createElement('a');
    zoomOutLink.innerHTML = '&#x2796;'
    zoomOutLink.href = '#';
    zoomOutLink.title = 'Zoom Out';
    zoomOutLink.style.setProperty('margin-left', '5px');
    zoomOutLink.style.setProperty('color', '#0366d6');
    zoomOutLink.style.setProperty('text-decoration', 'unset');
    zoomOutLink.style.setProperty('background', '#dddddd');
    zoomOutLink.style.setProperty('border', '1px solid #aaaaaa');
    zoomOutLink.style.setProperty('border-radius', '4px');
    zoomOutLink.style.setProperty('padding', '3px 5px');
    zoomOutLink.style.setProperty('font-weight', 'bold');
    zoomOutLink.style.setProperty('user-select', 'none');
    zoomOutLink.onclick = function () {
        zoomValue *= 0.9
        body.style.setProperty('zoom', zoomValue);
    }
    header.appendChild(zoomOutLink);

    // EDIT
    var editLink = document.createElement('a');
    editLink.innerText = 'Edit';
    editLink.href = '#';
    editLink.style.setProperty('margin-left', '5px');
    editLink.style.setProperty('color', '#0366d6');
    editLink.style.setProperty('text-decoration', 'unset');
    editLink.style.setProperty('background', '#dddddd');
    editLink.style.setProperty('border', '1px solid #aaaaaa');
    editLink.style.setProperty('border-radius', '4px');
    editLink.style.setProperty('padding', '3px 5px');
    editLink.style.setProperty('font-weight', 'bold');
    editLink.style.setProperty('user-select', 'none');
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
    downloadLink.style.setProperty('user-select', 'none');
    downloadLink.onclick = function () {
        downloadText('page-content.txt', body.innerText);
    }
    header.appendChild(downloadLink);

    // URL, TITLE & TEXT
    var innerText = document.body.innerText;

    var urlLb = 'URL: ';
    var titleLb = 'Title: ';
    if (!body.innerText.startsWith(urlLb)) {
        var title = titleLb + document.title;
        var pageUrl = urlLb + window.location.href;
        var info = pageUrl + '\n' + title + '\n' + Array(Math.max(title.length, pageUrl.length) + 1).join('-');
        body.innerText = info + '\n\n' + innerText;
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
    style.setProperty('font-family', '"Lucida Console", monospace', 'important');
    style.setProperty('font-size', '16px', 'important');
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