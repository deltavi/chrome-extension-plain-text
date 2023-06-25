 // UTILS
 export function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join('-') +
    ' ' +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join('.')
  );
}

export function composeText(title, url, body) {
  return title + '\n' + url + "\n\n" + body;
}

export function formatFileName(title) {
  return formatDate(new Date()) + ' ' + title.substring(0, 50).replace(/\W+/g, ' ') + '.txt'
}