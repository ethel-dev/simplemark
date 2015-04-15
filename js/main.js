function sexydown() {
    var u = document.getElementById('ugly').value;
    var s;
    // Font settings:
    var font_size = document.getElementById('font-size').value;
    var font_ms = document.getElementById('font-measure').selectedIndex;
    var font_family = document.getElementById('font-family').selectedIndex;
    var measurement;
    
    switch(font_ms)
    {
      case 0:
        measurement = "pt";
        break;
      case 1:
        measurement = "px";
        break;
      case 2:
        measurement = "rem";
        break;
    }
    font_size = font_size + measurement;
    $("#main").css("font-size", font_size);
    switch(font_family)
    {
      case 0:
        // Lato
        $("#main").addClass("lato");
        break;
      case 1:
        // Gloria
        $("#main").addClass("gloria");
        break;
      case 2:
        // Open Sans
        $("#main").addClass("opensans");
        break;
      case 3:
        // Merriweather
        $("#main").addClass("merriweather");
        break;
      case 4:
        // Inconsolata
        $("#main").addClass("inconsolata");
        break;
    }
    
    // Textile or Markdown?
    var txt = document.getElementById('txt').checked;
    if(txt === true)
    {
      s = textile(u);
      document.getElementById("main").innerHTML = s;
      window.print();
    }
    else
    {
      var gfm = document.getElementById("gfm").checked;
      var sanitize = document.getElementById("sanitize").checked;
      var pedantic = document.getElementById("pedantic").checked;
      var smartypants = document.getElementById("smartypants").checked;
      var smartlists = document.getElementById("smartlists").checked;
      // Use Markdown.
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
      
      s = marked(u);
      document.getElementById("main").innerHTML = s;
      window.print();
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