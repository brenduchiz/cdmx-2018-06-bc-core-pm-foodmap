window.onload = timeout;
function timeout() {
 window.setTimeout('redirect()', 2000);
}
function redirect() {
 window.location = '../VIEWS/index.html';
 return;
}