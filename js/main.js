/*
Sexydown JavaScript
*/
function sexydown() {
    $("#modedrop").fadeOut();
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
      document.getElementById("cont").innerHTML = s;
      window.setTimeout(function() {window.print();}, 1000);
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
      document.getElementById("cont").innerHTML = s;
      window.setTimeout(function(){window.print();}, 1000);
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
function windowcontroller(what) {
    switch(what) {
        case "lml":
            $("#lml-content").collapse("show");
            $("#code-content").collapse("hide");
            break;
        case "code":
            $("#lml-content").collapse("hide");
            $("#code-content").collapse("show");
            break;
    }
}
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function load() {
  loadparams();
  Mousetrap.bind('s e x y', function() {sexydown();});
  Mousetrap.bind('up up down down left right left right b a enter', function() {
    doShake();
  });
  var langs = ["Markdown.", "Textile.", "C#.", "JavaScript.", "Perl.", "Java.", "Python.", "Ruby.", "Rust.", "R.", "PHP.", "HTML.", "CSS.", "Bash.", "CoffeeScript.", "SQL.", "Objective-C.", "C++.", "Apache.", "HTTP.", "JSON.", "FORTRAN.", "Processing.", "Brainf**k.", "Smalltalk.", "Cloqure.", "Dart.", "Go.", "VB.NET.", "Swift.", "Matlab.", "Haml.", "DOS .bat.", "Scala.", "Haskell.", "Lua.", "TeX.", "F#.", "Django.", "Lisp.", "AutoHotkey.", "LESS.", "SASS."];
  shuffle(langs);
  $("#titlespan").typed({
    strings: langs,
    // typing speed
    typeSpeed: 0,
    // time before typing starts
    startDelay: 3000,
    // backspacing speed
    backSpeed: 0,
    // time before backspacing
    backDelay: 3000,
    // loop
    loop: true,
    // false = infinite
    loopCount: false,
    // show cursor
    showCursor: true,
    // character for cursor
    cursorChar: "|"
  });
}
function doShake(){function c(){var e=document.createElement("link");e.setAttribute("type","text/css");e.setAttribute("rel","stylesheet");e.setAttribute("href",f);e.setAttribute("class",l);document.body.appendChild(e)}function h(){var e=document.getElementsByClassName(l);for(var t=0;t<e.length;t++){document.body.removeChild(e[t])}}function p(){var e=document.createElement("div");e.setAttribute("class",a);document.body.appendChild(e);setTimeout(function(){document.body.removeChild(e)},100)}function d(e){return{height:e.offsetHeight,width:e.offsetWidth}}function v(i){var s=d(i);return s.height>e&&s.height<n&&s.width>t&&s.width<r}function m(e){var t=e;var n=0;while(!!t){n+=t.offsetTop;t=t.offsetParent}return n}function g(){var e=document.documentElement;if(!!window.innerWidth){return window.innerHeight}else if(e&&!isNaN(e.clientHeight)){return e.clientHeight}return 0}function y(){if(window.pageYOffset){return window.pageYOffset}return Math.max(document.documentElement.scrollTop,document.body.scrollTop)}function E(e){var t=m(e);return t>=w&&t<=b+w}function S(){var e=document.createElement("audio");e.setAttribute("class",l);e.src=i;e.loop=false;e.addEventListener("canplay",function(){setTimeout(function(){x(k)},500);setTimeout(function(){N();p();for(var e=0;e<O.length;e++){T(O[e])}},15500)},true);e.addEventListener("ended",function(){N();h()},true);e.innerHTML=" <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";document.body.appendChild(e);e.play()}function x(e){e.className+=" "+s+" "+o}function T(e){e.className+=" "+s+" "+u[Math.floor(Math.random()*u.length)]}function N(){var e=document.getElementsByClassName(s);var t=new RegExp("\\b"+s+"\\b");for(var n=0;n<e.length;){e[n].className=e[n].className.replace(t,"")}}var e=30;var t=30;var n=350;var r=350;var i="//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";var s="mw-harlem_shake_me";var o="im_first";var u=["im_drunk","im_baked","im_trippin","im_blown"];var a="mw-strobe_light";var f="//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";var l="mw_added_css";var b=g();var w=y();var C=document.getElementsByTagName("*");var k=null;for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){if(E(A)){k=A;break}}}if(A===null){console.warn("Could not find a node of the right size. Please try a different page.");return}c();S();var O=[];for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){O.push(A)}}}
function papercode() {
  $('link[title=bootstrap]')[0].remove();
  var code = document.getElementById("sourcecode").value;
  var lang = document.getElementById("lang").value;
  var output = document.getElementById("codeoutput");
  
  $("#all").hide();
  $("#codepre").collapse("show");
  
  if(lang !== null)
  {
    $("#codeoutput").addClass(lang);
    output.innerText = code;
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    var capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
    document.title = "Sexydown — " + capitalizedLang + " Document";
  }
  else
  {
    output.innerText = code;
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    document.title = "Sexydown — Code Document";
  }
  window.setTimeout(function(){window.print();}, 1000);
}
function getQueryParams(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
function loadparams() {
    var gfm = getQueryParams("gfm"); // GitHub Flavored Markdown
    var lists = getQueryParams("sl"); // Smart Lists
    var san = getQueryParams("san"); // Sanitize
    var pedant = getQueryParams("ped"); // Pedantic Markdown
    var sp = getQueryParams("sp"); // Smartypants
    var txt = getQueryParams("txt"); // Textile
    var fs = getQueryParams("fs"); // Font size (pt)
    var ff = getQueryParams("ff"); // Font family
    var val = decodeURIComponent(getQueryParams("val")); // Text
    
    // Set textbox to specified value
    if(getQueryParams("val") === undefined)
    {
        document.getElementById("ugly").value = "";
    }
    else
    {
        document.getElementById("ugly").value = val;
    }
    
    // Set GitHub Flavored Markdown
    if(gfm === "true")
    {
        $("#gfm").attr("checked", true);
    }
    else if(gfm === "false")
    {
        $("#gfm").attr("checked", false);
    }
    else
    {
        $("#gfm").attr("checked", true);
    }
    // Set Smart Lists
    if(lists === "true")
    {
        $("#smartlists").attr("checked", true);
    }
    else if(lists === "false")
    {
        $("#smartlists").attr("checked", false);
    }
    else
    {
        $("#gfm").attr("checked", true);
    }
    
    // Set Sanitize?
    if(san === "true")
    {
        $("#sanitize").attr("checked", true);
    }
    else
    {
        $("#sanitize").attr("checked", false);
    }
    
    // Set Pedantic Markdown
    if(pedant === "true")
    {
        $("#pedantic").attr("checked", true);
    }
    else
    {
        $("#pedantic").attr("checked", false);
    }
    
    // Set Smartypants
    if(sp === "true")
    {
        $("#smartypants").attr("checked", true);
    }
    else
    {
        $("#smartypants").attr("checked", false);
    }
    
    // Set Textile
    if(txt === "true")
    {
        $("#txt").attr("checked", true);
        mddisable();
    }
    else
    {
        $("#txt").attr("checked", false);
    }
    
    // Set Font Size
    if(fs === null || fs === "" || fs === undefined)
    {
        document.getElementById("font-size").value = "12";
    }
    else
    {
        document.getElementById("font-size").value = fs;
    }

    // Set Font Family
    switch(ff) {
        case "lato":
          document.getElementById('font-family').selectedIndex = 0;
          break;
        case "gloria":
          document.getElementById('font-family').selectedIndex = 1;
          break;
        case "opensans":
          document.getElementById('font-family').selectedIndex = 2;
          break;
        case "merri":
          document.getElementById('font-family').selectedIndex = 3;
          break;
        case "incons":
          document.getElementById('font-family').selectedIndex = 4;
          break;
        default:
          document.getElementById('font-family').selectedIndex = 3;
          break;
    }
    return "Done getting parameters.";
}
function generateurl() {
  var font_size = document.getElementById('font-size').value;
  var font_family = document.getElementById('font-family').selectedIndex;
  var gfm = document.getElementById("gfm").checked.toString();
  var sanitize = document.getElementById("sanitize").checked.toString();
  var pedantic = document.getElementById("pedantic").checked.toString();
  var smartypants = document.getElementById("smartypants").checked.toString();
  var smartlists = document.getElementById("smartlists").checked.toString();
  var txt = document.getElementById('txt').checked.toString();
  // URL friendly!
  var val = encodeURIComponent(document.getElementById('url-text').value);
  
  var ff;
  switch(font_family)
  {
      case 0:
        ff = "lato";
        break;
      case 1:
        ff = "gloria";
        break;
      case 2:
        ff = "opensans";
        break;
      case 3:
        ff = "merri";
        break;
      case 4:
        ff = "incons";
        break;
  }
  
  var link = "http://ethanarterberry.com/Sexydown?gfm=" + gfm + "&sl=" + smartlists + "&san=" + sanitize + "&ped=" + pedantic + "&sp=" + smartypants + "&txt=" + txt + "&fs=" + font_size + "&ff=" + ff + "&val=" + val;
  document.getElementById("link").innerHTML = link;
  $("#link").attr("href", link);
}
