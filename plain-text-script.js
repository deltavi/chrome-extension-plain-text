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
style.padding = '10px';
style.margin = '0';
style.backgroundColor = 'white';
style.color = 'black';
style.fontFamily = 'Courier New';
style.fontSize = '13px';
style.textAlign = 'left';