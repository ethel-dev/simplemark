/*
Sexydown JavaScript
*/
function sexydown() {
    $("#modedrop").slideUp();
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
      window.setTimeout("window.print();", 1000);
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
      window.setTimeout("window.print();", 1000);
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

function load() {
    Mousetrap.bind('s e x y', function() { sexydown(); });
    Mousetrap.bind('up up down down left right left right b a enter', function() {
    doShake();
  });
}

function doShake(){function c(){var e=document.createElement("link");e.setAttribute("type","text/css");e.setAttribute("rel","stylesheet");e.setAttribute("href",f);e.setAttribute("class",l);document.body.appendChild(e)}function h(){var e=document.getElementsByClassName(l);for(var t=0;t<e.length;t++){document.body.removeChild(e[t])}}function p(){var e=document.createElement("div");e.setAttribute("class",a);document.body.appendChild(e);setTimeout(function(){document.body.removeChild(e)},100)}function d(e){return{height:e.offsetHeight,width:e.offsetWidth}}function v(i){var s=d(i);return s.height>e&&s.height<n&&s.width>t&&s.width<r}function m(e){var t=e;var n=0;while(!!t){n+=t.offsetTop;t=t.offsetParent}return n}function g(){var e=document.documentElement;if(!!window.innerWidth){return window.innerHeight}else if(e&&!isNaN(e.clientHeight)){return e.clientHeight}return 0}function y(){if(window.pageYOffset){return window.pageYOffset}return Math.max(document.documentElement.scrollTop,document.body.scrollTop)}function E(e){var t=m(e);return t>=w&&t<=b+w}function S(){var e=document.createElement("audio");e.setAttribute("class",l);e.src=i;e.loop=false;e.addEventListener("canplay",function(){setTimeout(function(){x(k)},500);setTimeout(function(){N();p();for(var e=0;e<O.length;e++){T(O[e])}},15500)},true);e.addEventListener("ended",function(){N();h()},true);e.innerHTML=" <p>If you are reading this, it is because your browser does not support the audio element. We recommend that you get a new browser.</p> <p>";document.body.appendChild(e);e.play()}function x(e){e.className+=" "+s+" "+o}function T(e){e.className+=" "+s+" "+u[Math.floor(Math.random()*u.length)]}function N(){var e=document.getElementsByClassName(s);var t=new RegExp("\\b"+s+"\\b");for(var n=0;n<e.length;){e[n].className=e[n].className.replace(t,"")}}var e=30;var t=30;var n=350;var r=350;var i="//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake.mp3";var s="mw-harlem_shake_me";var o="im_first";var u=["im_drunk","im_baked","im_trippin","im_blown"];var a="mw-strobe_light";var f="//s3.amazonaws.com/moovweb-marketing/playground/harlem-shake-style.css";var l="mw_added_css";var b=g();var w=y();var C=document.getElementsByTagName("*");var k=null;for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){if(E(A)){k=A;break}}}if(A===null){console.warn("Could not find a node of the right size. Please try a different page.");return}c();S();var O=[];for(var L=0;L<C.length;L++){var A=C[L];if(v(A)){O.push(A)}}}
