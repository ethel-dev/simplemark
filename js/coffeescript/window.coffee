# <window.coffee>
# the window controls part
# a file in the Coffeescript port of Sexydown's JavaScript
# written by Ethan Arterberry in 2015, public domain under the Unlicense

windowcontroller = (what) ->
  switch what
    when "lml"
      $("#lml-content").collapse "show"
      $("#code-content").collapse "hide"
    when "code"
      $("#lml-content").collapse "hide"
      $("#code-content").collapse "show"

load = ->
  loadparams()
  Mousetrap.bind 's e x y', ->
    sexydown
  
  # Title shuffle
  langs = ["Markdown.", "Textile.", "C#.", "JavaScript.", "Perl.", "Java.", "Python.", "Ruby.", "Rust.", "R.", "PHP.", "HTML.", "CSS.", "Bash.", "CoffeeScript.", "SQL.", "Objective-C.", "C++.", "Apache.", "HTTP.", "JSON.", "FORTRAN.", "Processing.", "Brainf**k.", "Smalltalk.", "Cloqure.", "Dart.", "Go.", "VB.NET.", "Swift.", "Matlab.", "Haml.", "DOS .bat.", "Scala.", "Haskell.", "Lua.", "TeX.", "F#.", "Django.", "Lisp.", "AutoHotkey.", "LESS.", "SASS."]
  currentIndex = langs.length
  while 0 != currentIndex
    # Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    # And swap it with the current element.
    temporaryValue = langs[currentIndex]
    langs[currentIndex] = langs[randomIndex]
    langs[randomIndex] = temporaryValue
  # Cursor and typing for title shuffle
  $('#titlespan').typed
    strings: langs
    typeSpeed: 0
    startDelay: 3000
    backSpeed: 0
    backDelay: 3000
    loop: true
    loopCount: false
    showCursor: true
    cursorChar: '|'
  
disabler = (id1, id2, s) ->
  disable1 = document.getElementById(id1)
  disable2 = document.getElementById(id2)
  sender = document.getElementById(s)
  if sender.value != ''
    $(disable1).attr 'disabled', 'disabled'
    $(disable2).attr 'disabled', 'disabled'
    $(disable1).val ''
    $(disable2).val ''
  else
    $(disable1).removeAttr 'disabled'
    $(disable2).removeAttr 'disabled'
  return