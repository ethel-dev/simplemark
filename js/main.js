function sexydown() {
    // Get necesscary variables.
    var u = document.getElementById('ugly').value;
    var gfm = document.getElementById("gfm").checked;
    var sanitize = document.getElementById("sanitize").checked;
    var pedantic = document.getElementById("pedantic").checked;
    var smartypants = document.getElementById("smartypants").checked;
    var smartlists = document.getElementById("smartlists").checked;
    
    // Make it sexy!
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: gfm,
      tables: gfm,
      breaks: gfm,
      pedantic: pedantic,
      sanitize: sanitize,
      smartLists: smartlists,
      smartypants: smartypants
    });
    
    var s = marked(u);
}