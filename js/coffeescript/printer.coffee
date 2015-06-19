# <printer.coffee>
# the markdown/code printer part
# a file in the Coffeescript port of Sexydown's JavaScript
# written by Ethan Arterberry in 2015, public domain under the Unlicense

sexydown = ->
  $("#modedrop").fadeOut()
  uglyText = document.getElementById "ugly"
  mdGist = document.getElementById "md-gist"
  mdFileUpload = document.getElementById "md-fileupload"
  if mdGist.getAttribute("disabled") == "disabled" and uglyText.getAttribute("disabled") == "disabled"
    # Check for FileReader support
    if window.File and window.FileReader and window.FileList and window.Blob
      # Declare FileReader
      reader = new FileReader()
      reader.onload = ->
        console?.log "Opened file:\nContents:\n#{reader.result}"
        # Send reader result to sexydownPart2
        sexydownPart2 reader.result
        return
      
      # Call FileReader
      reader.readAsText mdFileUpload.files[0]
      return
    else
      alert "The file APIs are not supported by your browser."
      return
  if uglyText.getAttribute("disabled") == "disabled" and mdFileUpload.getAttribute("disabled") == "disabled"
   	 	# Get Gist ID
      gistid = mdGist.value;
     	$.ajax
        url: "https://api.github.com/gists/#{gistid}"
        type: "GET"
        dataType: "jsonp"
        success: (gistdata) ->
          # Do stuff on success
        	names = Object.keys gistdata.data.files
        	content = gistdata.data.files[names[0]].content
        	console?.log "Gist #{gistid} loaded successfully."
        	sexydownPart2 content
        	return
        error: (e) ->
          # Throw error and specify Gist
          console?.log "Gist #{gistid} could not load. The following error was given:\n #{e}"
          return
       return
  if document.getElementById('md-fileupload').getAttribute('disabled') == 'disabled' and document.getElementById('md-gist').getAttribute('disabled') == 'disabled'
    disabler "md-fileupload", "md-gist", "ugly"
    sexydownPart2 $('#ugly').val()

sexydownPart2 = (u) ->
  # Font settings:
  font_size = document.getElementById('font-size').value
  font_ms = document.getElementById('font-measure').selectedIndex
  font_family = document.getElementById('font-family').selectedIndex
  
  switch font_family
    when 0
      measurement = "pt"
    when 1
      measurement = "px"
    when 2
      measurement = "rem"
  font_size += measurement;
  switch font_family
    when 0
      # Lato
      $("#cont").addClass "lato"
    when 1
      # Gloria
      $("#cont").addClass "gloria"
    when 2
      # Open Sans
      $("#cont").addClass "opensans"
    when 3
      # Merriweather
      $("#cont").addClass "merriweather"
    when 4
      # Inconsolata
      $("#cont").addClass "inconsolata"
  txt = document.getElementById("txt").checked
  if txt == true
    # Use Textile!
    s = textile u
    document.getElementById("cont").innerHTML = s
    $("#cont > p").css "font-size", font_size
    window.setTimeout ->
      window.print()
      return
    , 100
  else
    # Get Markdown options
    gfm = document.getElementById("gfm").checked;
    sanitize = document.getElementById("sanitize").checked;
    pedantic = document.getElementById("pedantic").checked;
    smartypants = document.getElementById("smartypants").checked;
    smartlists = document.getElementById("smartlists").checked;
    
    # Use Markdown!
    marked.setOptions
      renderer: new marked.Renderer()
      gfm: gfm
      tables: gfm
      breaks: gfm
      pedantic: pedantic
      sanitize: sanitize
      smartLists: smartlists
      smartypants: smartypants
    
    s = marked u
    document.getElementById("cont").innerHTML = s
    $("#cont > p").css "font-size", font_size
    window.setTimeout ->
      window.print()
      return
    , 100

papercode = ->
  # Remove Bootstrap because it interferes
  $("link[title=bootstrap]")[0].remove()
  
  # Get options
  lang = document.getElementById('lang').value
  output = document.getElementById('codeoutput')
  style = document.getElementById('theme').selectedIndex
  
  switch style
    when 0
      $('.github, .xcode, .vs').remove()
    when 1
      $('.xcode, .vs, .googlecode').remove()
    when 2
      $('.github, .vs, .googlecode').remove()
    when 3
      $('.github, .xcode, .googlecode').remove()
    when 4
      $('.github, .xcode, .googlecode, .vs').remove()
      newelement = '<link href=\'' + $('#customlink').val() + '\' rel=\'stylesheet\'>'
      $('head').append newelement
  
  codeText = document.getElementById("sourcecode")
  codeGist = document.getElementById("gist")
  codeFileUpload = document.getElementById("fileupload")
  
  if codeText.getAttribute("disabled") == "disabled" and codeGist.getAttribute("disabled") == "disabled"
    # Check for FileReader support
    if window.File and window.FileReader and window.FileList and window.Blob
      # Declare FileReader
      reader = new FileReader()
      reader.onload = ->
        # Do code printing when the FileReader is called.
        $('#all').hide()
        $('#codepre').collapse 'show'
        console?.log 'Opened file.\nContents:\n' + reader.result
        # Define 'code' as the contents of the file.
        code = reader.result
        output.innerText = code
        $('pre code').each (i, block) ->
          hljs.highlightBlock block
          return
        document.title = 'Sexydown - Code Document'
        window.print()
        return
      
      # Call FileReader
      reader.readAsText codeFileUpload.files[0]
      return
    else
      alert "The file APIs are not supported by your browser."
      return
  else
    if codeText.getAttribute("disabled") == "disabled" and codeFileUpload.getAttribute("disabled") == "disabled"
      gistid = $('#gist').val()
      $.ajax(
        url: 'https://api.github.com/gists/' + gistid
        type: 'GET'
        dataType: 'jsonp').success((gistdata) ->
          # Hide everything and show code
          $('#all').hide()
          $('#codepre').collapse 'show'
          
          # Get Gist
          names = Object.keys(gistdata.data.files)
          code = gistdata.data.files[names[0]].content
          lang = gistdata.data.files[names[0]].language
          
          # Auto highlight from Gist language
          $('#codeoutput').addClass lang
          
          # Output and highlight
          output.innerText = code
          $('pre code').each (i, block) ->
            hljs.highlightBlock block
            return
          
          # Set window title
          capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1)
          document.title = 'Sexydown - ' + capitalizedLang + ' Document'
          
          # Open print dialog
          window.print()
          console?.log 'Gist ' + gistid + ' loaded successfully.'
          return
      ).error (e) ->
          console?.log 'There was an error loading Gist ' + gistid
          return
    else
      if codeFileUpload.getAttribute("disabled") == "disabled" and codeGist.getAttribute("disabled") == "disabled"
        # Set code to textbox
        code = document.getElementById('sourcecode').value
        
        # Hide everything but the code
        $('#all').hide()
        $('#codepre').collapse 'show'
        
        # Check if language is set
        if lang != null
          # If language is set then just add the class specified and highlight the code
          $('#codeoutput').addClass lang
          output.innerText = code
          $('pre code').each (i, block) ->
            hljs.highlightBlock block
            return
          
          # Pretty window title
          capitalizedLang = lang.charAt(0).toUpperCase() + lang.slice(1)
          document.title = 'Sexydown - ' + capitalizedLang + ' Document'
          return
        else
          # Auto highlight based on automatic language chooser from highlight.js
          output.innerText = code
          $('pre code').each (i, block) ->
            hljs.highlightBlock block
            return
          document.title = 'Sexydown - Code Document'
          
          # Print!
          window.print()
          return