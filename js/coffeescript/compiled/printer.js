var papercode, sexydown, sexydownPart2;

sexydown = function() {
  var gistid, mdFileUpload, mdGist, reader, uglyText;
  $("#modedrop").fadeOut();
  uglyText = document.getElementById("ugly");
  mdGist = document.getElementById("md-gist");
  mdFileUpload = document.getElementById("md-fileupload");
  if (mdGist.getAttribute("disabled") === "disabled" && uglyText.getAttribute("disabled") === "disabled") {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      reader = new FileReader();
      reader.onload = function() {
        if (typeof console !== "undefined" && console !== null) {
          console.log("Opened file:\nContents:\n" + reader.result);
        }
        sexydownPart2(reader.result);
      };
      reader.readAsText(mdFileUpload.files[0]);
      return;
    } else {
      alert("The file APIs are not supported by your browser.");
      return;
    }
  }
  if (uglyText.getAttribute("disabled") === "disabled" && mdFileUpload.getAttribute("disabled") === "disabled") {
    gistid = mdGist.value;
    $.ajax({
      url: "https://api.github.com/gists/" + gistid,
      type: "GET",
      dataType: "jsonp",
      success: function(gistdata) {
        var content, names;
        names = Object.keys(gistdata.data.files);
        content = gistdata.data.files[names[0]].content;
        if (typeof console !== "undefined" && console !== null) {
          console.log("Gist " + gistid + " loaded successfully.");
        }
        sexydownPart2(content);
      },
      error: function(e) {
        if (typeof console !== "undefined" && console !== null) {
          console.log("Gist " + gistid + " could not load. The following error was given:\n " + e);
        }
      }
    });
    return;
  }
  if (document.getElementById('md-fileupload').getAttribute('disabled') === 'disabled' && document.getElementById('md-gist').getAttribute('disabled') === 'disabled') {
    disabler("md-fileupload", "md-gist", "ugly");
    return sexydownPart2($('#ugly').val());
  }
};

sexydownPart2 = function(u) {
  var font_family, font_ms, font_size, gfm, measurement, pedantic, s, sanitize, smartlists, smartypants, txt;
  font_size = $("font-size").val;
  font_ms = $("font-measure").val;
  font_family = $("font-family").val;
  switch (font_family) {
    case 0:
      measurement = "pt";
      break;
    case 1:
      measurement = "px";
      break;
    case 2:
      measurement = "rem";
  }
  font_size += measurement;
  $("#cont").css("font_size", "font_size");
  switch (font_family) {
    case 0:
      $("#cont").addClass("lato");
      break;
    case 1:
      $("#cont").addClass("gloria");
      break;
    case 2:
      $("#cont").addClass("opensans");
      break;
    case 3:
      $("#cont").addClass("merriweather");
      break;
    case 4:
      $("#cont").addClass("inconsolata");
  }
  txt = document.getElementById("txt").checked;
  if (txt === true) {
    s = textile(u);
    document.getElementById("cont").innerHTML = s;
    return window.setTimeout(function() {
      window.print();
    }, 100);
  } else {
    gfm = document.getElementById("gfm").checked;
    sanitize = document.getElementById("sanitize").checked;
    pedantic = document.getElementById("pedantic").checked;
    smartypants = document.getElementById("smartypants").checked;
    smartlists = document.getElementById("smartlists").checked;
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
    return window.setTimeout(function() {
      window.print();
    }, 100);
  }
};

papercode = function() {
  var capitalizedLang, code, codeFileUpload, codeGist, codeText, gistid, lang, newelement, output, reader, style;
  $("link[title=bootstrap]")[0].remove();
  lang = document.getElementById('lang').value;
  output = document.getElementById('codeoutput');
  style = document.getElementById('theme').selectedIndex;
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
      newelement = '<link href=\'' + $('#customlink').val() + '\' rel=\'stylesheet\'>';
      $('head').append(newelement);
  }
  codeText = document.getElementById("sourcecode");
  codeGist = document.getElementById("gist");
  codeFileUpload = document.getElementById("fileupload");
  if (codeText.getAttribute("disabled") === "disabled" && codeGist.getAttribute("disabled") === "disabled") {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      reader = new FileReader();
      reader.onload = function() {
        var code;
        $('#all').hide();
        $('#codepre').collapse('show');
        if (typeof console !== "undefined" && console !== null) {
          console.log('Opened file.\nContents:\n' + reader.result);
        }
        code = reader.result;
        output.innerText = code;
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
        document.title = 'Sexydown - Code Document';
        window.print();
      };
      reader.readAsText(codeFileUpload.files[0]);
    } else {
      alert("The file APIs are not supported by your browser.");
    }
  } else {
    if (codeText.getAttribute("disabled") === "disabled" && codeFileUpload.getAttribute("disabled") === "disabled") {
      gistid = $('#gist').val();
      return $.ajax({
        url: 'https://api.github.com/gists/' + gistid,
        type: 'GET',
        dataType: 'jsonp'
      }).success(function(gistdata) {
        var capitalizedLang, code, names;
        $('#all').hide();
        $('#codepre').collapse('show');
        names = Object.keys(gistdata.data.files);
        code = gistdata.data.files[names[0]].content;
        lang = gistdata.data.files[names[0]].language;
        $('#codeoutput').addClass(lang);
        output.innerText = code;
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
        capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
        document.title = 'Sexydown - ' + capitalizedLang + ' Document';
        window.print();
        if (typeof console !== "undefined" && console !== null) {
          console.log('Gist ' + gistid + ' loaded successfully.');
        }
      }).error(function(e) {
        if (typeof console !== "undefined" && console !== null) {
          console.log('There was an error loading Gist ' + gistid);
        }
      });
    } else {
      if (codeFileUpload.getAttribute("disabled") === "disabled" && codeGist.getAttribute("disabled") === "disabled") {
        code = document.getElementById('sourcecode').value;
        $('#all').hide();
        $('#codepre').collapse('show');
        if (lang !== null) {
          $('#codeoutput').addClass(lang);
          output.innerText = code;
          $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
          });
          capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1);
          document.title = 'Sexydown - ' + capitalizedLang + ' Document';
        } else {
          output.innerText = code;
          $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
          });
          document.title = 'Sexydown - Code Document';
          window.print();
        }
      }
    }
  }
};

// ---
// generated by coffee-script 1.9.2