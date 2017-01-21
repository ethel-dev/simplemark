# <parameter.coffee>
# the url parameter part
# a file in the CoffeeScript port of Simplemark's JavaScript

arrayQuery = ->
  # 'borrowed' from http://stackoverflow.com/questions/4297765/make-a-javascript-array-from-url
  url = window.location.href
  request = {}
  pairs = url.substring(url.indexOf('?') + 1).split('&')
  i = 0
  while i < pairs.length
    pair = pairs[i].split('=')
    request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1])
    i++
  request

loadparams = ->
  query = arrayQuery()
  gfm = query['gfm']
  # GitHub Flavored Markdown
  lists = query['sl']
  # Smart Lists
  san = query['san']
  # Sanitize
  pedant = query['ped']
  # Pedantic Markdown
  sp = query['sp']
  # Smartypants
  txt = query['txt']
  # Textile
  fs = query['fs']
  # Font size (pt)
  ff = query['ff']
  # Font family
  val = decodeURIComponent(query['val'])
  # Text
  gistid = decodeURIComponent(query['gistid'])
  # Gist ID
  code = query['code']
  # Code
  theme = query['theme']
  # Code Theme
  ctheme = decodeURIComponent(query['ctheme'])
  # Custom theme URL
  # Set textbox to specified value
  if code != 'true' or code == undefined
    if query['val'] == undefined
      document.getElementById('ugly').value = ''
    else
      document.getElementById('ugly').value = val
    # Set textbox to Gist, if Gist ID is specified
    if query['gistid'] != undefined
      $.ajax(
        url: 'https://api.github.com/gists/' + gistid
        type: 'GET'
        dataType: 'jsonp').success((gistdata) ->
        names = Object.keys(gistdata.data.files)
        content = gistdata.data.files[names[0]].content
        document.getElementById('ugly').value = content
        console.log 'Gist ' + gistid + ' loaded successfully.'
        return
      ).error (e) ->
        console.log 'There was an error loading Gist ' + gistid
        return
    # Set GitHub Flavored Markdown
    if gfm == 'true'
      $('#gfm').attr 'checked', true
    else if gfm == 'false'
      $('#gfm').attr 'checked', false
    else
      $('#gfm').attr 'checked', true
    # Set Smart Lists
    if lists == 'true'
      $('#smartlists').attr 'checked', true
    else if lists == 'false'
      $('#smartlists').attr 'checked', false
    else
      $('#gfm').attr 'checked', true
    # Set Sanitize?
    if san == 'true'
      $('#sanitize').attr 'checked', true
    else
      $('#sanitize').attr 'checked', false
    # Set Pedantic Markdown
    if pedant == 'true'
      $('#pedantic').attr 'checked', true
    else
      $('#pedantic').attr 'checked', false
    # Set Smartypants
    if sp == 'true'
      $('#smartypants').attr 'checked', true
    else
      $('#smartypants').attr 'checked', false
    # Set Textile
    if txt == 'true'
      $('#txt').attr 'checked', true
      mddisable()
    else
      $('#txt').attr 'checked', false
    # Set Font Size
    if fs == null or fs == '' or fs == undefined
      document.getElementById('font-size').value = '12'
    else
      document.getElementById('font-size').value = fs
    # Set Font Family
    switch ff
      when 'lato'
        document.getElementById('font-family').selectedIndex = 0
      when 'gloria'
        document.getElementById('font-family').selectedIndex = 1
      when 'opensans'
        document.getElementById('font-family').selectedIndex = 2
      when 'merri'
        document.getElementById('font-family').selectedIndex = 3
      when 'incons'
        document.getElementById('font-family').selectedIndex = 4
      else
        document.getElementById('font-family').selectedIndex = 3
        break
    'Done getting parameters.'
  else
    windowcontroller 'code'
    if query['val'] == undefined
      document.getElementById('sourcecode').value = ''
    else
      document.getElementById('sourcecode').value = val
    # Custom theme URL params
    if theme == undefined
      document.getElementById('theme').selectedIndex = 0
    else if theme == 4
      $('#custom').collapse 'show'
      document.getElementById('customlink').value = ctheme
    else if theme != undefined
      document.getElementById('theme').selectedIndex = theme
    # Set textbox to Gist, if Gist ID is specified
    if query['gistid'] != undefined
      $.ajax(
        url: 'https://api.github.com/gists/' + gistid
        type: 'GET'
        dataType: 'jsonp').success((gistdata) ->
        names = Object.keys(gistdata.data.files)
        content = gistdata.data.files[names[0]].content
        lang = gistdata.data.files[names[0]].language
        document.getElementById('sourcecode').value = content
        document.getElementById('lang').value = lang
        console.log 'Gist ' + gistid + ' loaded successfully.'
        return
      ).error (e) ->
        console.log 'There was an error loading Gist ' + gistid
        return
    'Done getting parameters for code.'

generateurl = ->
  font_size = document.getElementById('font-size').value
  font_family = document.getElementById('font-family').selectedIndex
  gfm = document.getElementById('gfm').checked.toString()
  sanitize = document.getElementById('sanitize').checked.toString()
  pedantic = document.getElementById('pedantic').checked.toString()
  smartypants = document.getElementById('smartypants').checked.toString()
  smartlists = document.getElementById('smartlists').checked.toString()
  txt = document.getElementById('txt').checked.toString()
  code = document.getElementById('code').checked.toString()
  # URL friendly!
  val = encodeURIComponent(document.getElementById('url-text').value)
  gist = encodeURIComponent(document.getElementById('gistid').value)
  # Code options
  theme = document.getElementById('theme').selectedIndex
  customlink = encodeURIComponent(document.getElementById('customlink').value)
  if code == 'false'
    ff = undefined
    switch font_family
      when 0
        ff = 'lato'
      when 1
        ff = 'gloria'
      when 2
        ff = 'opensans'
      when 3
        ff = 'merri'
      when 4
        ff = 'incons'
    link = 'https://soops.github.io/simplemark/?gfm=' + gfm + '&sl=' + smartlists + '&san=' + sanitize + '&ped=' + pedantic + '&sp=' + smartypants + '&txt=' + txt + '&fs=' + font_size + '&ff=' + ff + '&val=' + val + '&gistid=' + gist
  else
    if customlink == ''
      link = 'https://soops.github.io/simplemark/?code=' + code + '&val=' + val + '&gistid=' + gist + '&theme=' + theme
    else
      link = 'https://soops.github.io/simplemark/?code=' + code + '&val=' + val + '&gistid=' + gist + '&theme=4&ctheme=' + customlink
  document.getElementById('link').innerHTML = link
  $('#link').attr 'href', link
  return