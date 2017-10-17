var body = document.body;
var style = document.body.style;
var titleLb = 'Title: ';
if (!body.innerText.startsWith(titleLb)) {
    var title = titleLb + document.title;
    title += '\n' + Array(title.length + 1).join('-');
    body.innerText = title + '\n\n' + body.innerText;
} else {
    body.innerText = body.innerText;
}

style.setProperty('padding', '10px', 'important');
style.setProperty('margin', '0', 'important');
style.setProperty('background', 'white', 'important');
style.setProperty('color', 'black', 'important');
style.setProperty('font-family', 'Courier New', 'important');
style.setProperty('font-size', '13px', 'important');
style.setProperty('text-align', 'left', 'important');