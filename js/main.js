/*
<main.js>
Sexydown's JavaScript
written in 2015 by Ethan Arterberry 
public domain under the Unlicense
*/
function sexydown() {
    $("#modedrop").fadeOut();
    var s;
    if(document.getElementById("md-gist").getAttribute("disabled") === "disabled" && document.getElementById("ugly").getAttribute("disabled") === "disabled") {
        // Check for FileReader support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Classify input.
            var input = document.getElementById('md-fileupload');

            // Declare FileReader instance
            var reader = new FileReader();
            reader.onload = function() {
                console.log("Opened file.\nContents:\n" + reader.result);
                sexydownPart2(reader.result);
            };
            // Call the FileReader, and have it read the uploaded file.
            reader.readAsText(input.files[0]);
        } else {
            alert('The File APIs are not fully supported by your browser.');
        }
    }
    else if(document.getElementById("md-fileupload").getAttribute("disabled") === "disabled" && document.getElementById("ugly").getAttribute("disabled") === "disabled") {
        var gistid = document.getElementById("md-gist").value;
        var request = $.ajax({
                url: 'https://api.github.com/gists/' + gistid,
                type: 'GET',
                dataType: 'jsonp'
            }).success(function(gistdata) {
                var names = Object.keys(gistdata.data.files);
                var content = gistdata.data.files[names[0]].content;
                console.log("Gist " + gistid + " loaded successfully.");
                sexydownPart2(content);
            }).error(function(e) {
                console.log("There was an error loading Gist " + gistid);
        });
    }
    else if(document.getElementById("md-fileupload").getAttribute("disabled") === "disabled" && document.getElementById("md-gist").getAttribute("disabled") === "disabled")
    {
        sexydownPart2($("#ugly").val());
    }
}
function sexydownPart2(u) {
      // Font settings:
      var font_size = document.getElementById('font-size').value;
      var font_ms = document.getElementById('font-measure').selectedIndex;
      var font_family = document.getElementById('font-family').selectedIndex;
      var measurement;
      switch (font_ms) {
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
      switch (font_family) {
          case 0:
              // Lato
              $("#cont").addClass("lato");
              break;
          case 1:
              // Gloria
              $("#cont").addClass("gloria");
              break;
          case 2:
              // Open Sans
              $("#cont").addClass("opensans");
              break;
          case 3:
              // Merriweather
              $("#cont").addClass("merriweather");
              break;
          case 4:
              // Inconsolata
              $("#cont").addClass("inconsolata");
              break;
      }

      // Textile or Markdown?
      var txt = document.getElementById('txt').checked;
      if (txt === true) {
          s = textile(u);
          document.getElementById("cont").innerHTML = s;
          window.setTimeout(function() {
              window.print();
          }, 1000);
      } else {
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
          window.setTimeout(function() {
              window.print();
          }, 1000);
      }
}
function windowcontroller(what) {
    switch (what) {
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
    loadparams();
    Mousetrap.bind('s e x y', function() {
        sexydown();
    });
    Mousetrap.bind('up up down down left right left right b a enter', function() {
        doShake();
    });
    var langs = ["Markdown.", "Textile.", "C#.", "JavaScript.", "Perl.", "Java.", "Python.", "Ruby.", "Rust.", "R.", "PHP.", "HTML.", "CSS.", "Bash.", "CoffeeScript.", "SQL.", "Objective-C.", "C++.", "Apache.", "HTTP.", "JSON.", "FORTRAN.", "Processing.", "Brainf**k.", "Smalltalk.", "Cloqure.", "Dart.", "Go.", "VB.NET.", "Swift.", "Matlab.", "Haml.", "DOS .bat.", "Scala.", "Haskell.", "Lua.", "TeX.", "F#.", "Django.", "Lisp.", "AutoHotkey.", "LESS.", "SASS."];
    var currentIndex = langs.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = langs[currentIndex];
        langs[currentIndex] = langs[randomIndex];
        langs[randomIndex] = temporaryValue;
    }
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
function papercode() {
    $('link[title=bootstrap]')[0].remove();
    var code;
    var lang = document.getElementById("lang").value;
    var output = document.getElementById("codeoutput");
    var style = document.getElementById("theme").selectedIndex;

    // Custom theme switcher.
    switch (style) {
        case 0:
            $('.github, .xcode, .vs').remove();
            break;
        case 1:
            $('.xcode, .vs, .googlecode').remove();
            break;
        case 2:
            $('.github, .vs, .googlecode').remove();
            break;
        case 3:
            $('.github, .xcode, .googlecode').remove();
            break;
        case 4:
            $('.github, .xcode, .googlecode, .vs').remove();
            var newelement = "<link href='" + $("#customlink").val() + "' rel='stylesheet'>";
            $("head").append(newelement);
            break;
    }

    if (document.getElementById("sourcecode").getAttribute("disabled") === "disabled") {
        // Check for FileReader support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Classify input.
            var input = document.getElementById('fileupload');

            // Declare FileReader instance
            var reader = new FileReader();
            reader.onload = function() {
                // Do code printing when the FileReader is called.
                $("#all").hide();
                $("#codepre").collapse("show");
                console.log("Opened file.\nContents:\n" + reader.result);
                // Define 'code' as the contents of the file.
                var code = reader.result;
                output.innerText = code;
                $('pre code').each(function(i, block) {
                    hljs.highlightBlock(block);
                });
                document.title = "Sexydown — Code Document";
                window.print();
            };
            // Call the FileReader, and have it read the uploaded file.
            reader.readAsText(input.files[0]);
        } else {
            alert('The File APIs are not fully supported by your browser.');
        }
    } else {
        code = document.getElementById("sourcecode").value;
        $("#all").hide();
        $("#codepre").collapse("show");
        if (lang !== null) {
            $("#codeoutput").addClass(lang);
            output.innerText = code;
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
            var capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
            document.title = "Sexydown — " + capitalizedLang + " Document";
        } else {
            output.innerText = code;
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
            document.title = "Sexydown — Code Document";
        }
        window.print();
    }
}
function arrayQuery() {
    // 'borrowed' from http://stackoverflow.com/questions/4297765/make-a-javascript-array-from-url
    var url = window.location.href;
    var request = {};
    var pairs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
     var pair = pairs[i].split('=');
     request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return request;
}
function loadparams() {
    var query = arrayQuery();
    var gfm = query["gfm"]; // GitHub Flavored Markdown
    var lists = query["sl"]; // Smart Lists
    var san = query["san"]; // Sanitize
    var pedant = query["ped"]; // Pedantic Markdown
    var sp = query["sp"]; // Smartypants
    var txt = query["txt"]; // Textile
    var fs = query["fs"]; // Font size (pt)
    var ff = query["ff"]; // Font family
    var val = decodeURIComponent(query["val"]); // Text
    var gistid = decodeURIComponent(query["gistid"]); // Gist ID
    var code = query["code"]; // Code
    var theme = query["theme"]; // Code Theme
    var ctheme = decodeURIComponent(query["ctheme"]); // Custom theme URL

    // Set textbox to specified value
    if (code !== "true" || code === undefined) {
        if (query["val"] === undefined) {
            document.getElementById("ugly").value = "";
        } else {
            document.getElementById("ugly").value = val;
        }

        // Set textbox to Gist, if Gist ID is specified
        if (query["gistid"] !== undefined) {
            $.ajax({
                url: 'https://api.github.com/gists/' + gistid,
                type: 'GET',
                dataType: 'jsonp'
            }).success(function(gistdata) {
                var names = Object.keys(gistdata.data.files);
                var content = gistdata.data.files[names[0]].content;
                document.getElementById("ugly").value = content;
                console.log("Gist " + gistid + " loaded successfully.");
            }).error(function(e) {
                console.log("There was an error loading Gist " + gistid);
            });
        }

        // Set GitHub Flavored Markdown
        if (gfm === "true") {
            $("#gfm").attr("checked", true);
        } else if (gfm === "false") {
            $("#gfm").attr("checked", false);
        } else {
            $("#gfm").attr("checked", true);
        }
        // Set Smart Lists
        if (lists === "true") {
            $("#smartlists").attr("checked", true);
        } else if (lists === "false") {
            $("#smartlists").attr("checked", false);
        } else {
            $("#gfm").attr("checked", true);
        }

        // Set Sanitize?
        if (san === "true") {
            $("#sanitize").attr("checked", true);
        } else {
            $("#sanitize").attr("checked", false);
        }

        // Set Pedantic Markdown
        if (pedant === "true") {
            $("#pedantic").attr("checked", true);
        } else {
            $("#pedantic").attr("checked", false);
        }

        // Set Smartypants
        if (sp === "true") {
            $("#smartypants").attr("checked", true);
        } else {
            $("#smartypants").attr("checked", false);
        }

        // Set Textile
        if (txt === "true") {
            $("#txt").attr("checked", true);
            mddisable();
        } else {
            $("#txt").attr("checked", false);
        }

        // Set Font Size
        if (fs === null || fs === "" || fs === undefined) {
            document.getElementById("font-size").value = "12";
        } else {
            document.getElementById("font-size").value = fs;
        }

        // Set Font Family
        switch (ff) {
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
    } else {
        windowcontroller("code");
        if (query["val"] === undefined) {
            document.getElementById("sourcecode").value = "";
        } else {
            document.getElementById("sourcecode").value = val;
        }

        // Custom theme URL params
        if (theme === undefined) {
            document.getElementById("theme").selectedIndex = 0;
        } else if (theme === 4) {
            $("#custom").collapse("show");
            document.getElementById("customlink").value = ctheme;
        } else if (theme !== undefined) {
            document.getElementById("theme").selectedIndex = theme;
        }

        // Set textbox to Gist, if Gist ID is specified
        if (query["gistid"] !== undefined) {
            $.ajax({
                url: 'https://api.github.com/gists/' + gistid,
                type: 'GET',
                dataType: 'jsonp'
            }).success(function(gistdata) {
                var names = Object.keys(gistdata.data.files);
                var content = gistdata.data.files[names[0]].content;
                var lang = gistdata.data.files[names[0]].language;
                document.getElementById("sourcecode").value = content;
                document.getElementById("lang").value = lang;
                console.log("Gist " + gistid + " loaded successfully.");
            }).error(function(e) {
                console.log("There was an error loading Gist " + gistid);
            });
        }
        return "Done getting parameters for code.";
    }
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
    var code = document.getElementById('code').checked.toString();
    // URL friendly!
    var val = encodeURIComponent(document.getElementById('url-text').value);
    var gist = encodeURIComponent(document.getElementById("gistid").value);

    // Code options
    var theme = document.getElementById("theme").selectedIndex;
    var customlink = encodeURIComponent(document.getElementById("customlink").value);

    if (code === 'false') {
        var ff;
        switch (font_family) {
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

        var link = "http://ethanarterberry.com/Sexydown?gfm=" + gfm + "&sl=" + smartlists + "&san=" + sanitize + "&ped=" + pedantic + "&sp=" + smartypants + "&txt=" + txt + "&fs=" + font_size + "&ff=" + ff + "&val=" + val + "&gistid=" + gist;
    } else {
        if (customlink === "") {
            var link = "http://ethanarterberry.com/Sexydown?code=" + code + "&val=" + val + "&gistid=" + gist + "&theme=" + theme;
        } else {
            var link = "http://ethanarterberry.com/Sexydown?code=" + code + "&val=" + val + "&gistid=" + gist + "&theme=4&ctheme=" + customlink;
        }
    }
    document.getElementById("link").innerHTML = link;
    $("#link").attr("href", link);
}
function disabler(id1, id2, s) {
    var disable1 = document.getElementById(id1);
    var disable2 = document.getElementById(id2);
    var sender = document.getElementById(s);
    
    if(sender.value !== "") {
      $(disable1).attr("disabled", "disabled");
      $(disable2).attr("disabled", "disabled");
      $(disable1).val("");
      $(disable2).val("");
    } else {
      $(disable1).removeAttr("disabled");
      $(disable2).removeAttr("disabled");
    }
}