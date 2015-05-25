/* This is a bookmarklet that prints a Gist */
var url = window.location.href;
var href = url.split( '/' );
var id = href[4];
console.log(id);
window.location.href = "http://ethanarterberry.com/Sexydown/?gistid=" + id;

/* Below this line is the compressed JavaScript ready to be put in a bookmarklet, just uncomment it

javascript:(function()%7B%2F*%20This%20is%20a%20bookmarklet%20that%20prints%20a%20Gist%20*%2Fvar%20url%20%3D%20window.location.href%3Bvar%20href%20%3D%20url.split(%20'%2F'%20)%3Bvar%20id%20%3D%20href%5B4%5D%3Bconsole.log(id)%3Bwindow.location.href%20%3D%20%22http%3A%2F%2Fethanarterberry.com%2FSexydown%2F%3Fgistid%3D%22%20%2B%20id%7D)()

*/