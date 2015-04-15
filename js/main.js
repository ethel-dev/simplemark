function sexydown() {
    // Font settings:
    var font_size = document.getElementById('font-size');
    // Textile or Markdown?
    var txt = document.getElementById('txt').checked;
    if(txt === true)
    {
    }
}

function mddisable() {
    var txt = document.getElementById('txt').checked;
    if(txt === true)
    {
      $("#md-options :input").attr("disabled", true);
      $("#md-options :input").attr("checked", false);
    }
    else
    {
      $("#md-options :input").attr("disabled", false);
    }
}

/*
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
    document.getElementById("main").innerHTML = s;
    window.print();
*/