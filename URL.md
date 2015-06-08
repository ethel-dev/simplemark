# URL Parameters
URL parameters are a very useful feature of Sexydown that can save a lot of time.

## `fs`
Sets the font size of the output.

Type: Integer

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?fs=16" // Font size: 16pt
```

Default: `12`

## `ff`
Sets the font family of the output.

Type: String

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?ff=lato" // Lato
"http://ethanarterberry.com/Sexydown/?ff=gloria" // Gloria Hallelujah
"http://ethanarterberry.com/Sexydown/?ff=opensans" // Open Sans
"http://ethanarterberry.com/Sexydown/?ff=merri" // Merriweather
"http://ethanarterberry.com/Sexydown/?ff=incons" // Inconsolata
```

Default: `merri`

## `gfm`
Turns GitHub Flavored Markdown on or off.

Type: Boolean

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?gfm=true" // GFM enabled
```

Default: `true`

## `sl`
Turns Smart Lists on or off.

Type: Boolean

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?sl=false" // Smart lists disabled
```

Default: `true`

## `san`
Turns sanitizing (removing all code except Markdown, a.k.a no HTML tags) on or off.

Type: Boolean

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?san=true" // Sanitizing is enabled
```

Default: `false`

## `ped`
Turns pedantic (nothing is changed from [John Gruber's original implementation](http://daringfireball.net/projects/markdown/)) Markdown on or off.

Type: Boolean

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?ped=true" // Pedantic Markdown enabled
```

Default: `false`

## `sp`
Turns Smartypants (curly quotes and smart dashes) on or off.

Type: Boolean

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?sp=false" // Smartypants disabled
```

Default: `false`

## `txt`
Turns Textile (alternate LML) on or off.

Type: Boolean

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?txt=true" // Textile enabled
```

Default: `false`

## `val`
Changes the value of the output.

Type: String (must be escaped, so you should probably use the [URL generator](http://ethanarterberry.com/Sexydown/url.html))

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?val=%23%20Hello%20world%2C%20this%20is%20escaped%20text%20for%20the%20URL." // Value of textbox is "# Hello world, this is escaped text for the URL."
```

Default: `undefined`

## `gistid`
Changes the value of the output based on a Gist, which is found based on an ID.

Type: String

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?gistid=1a95e48266b30eb0f0aa" // Value of textbox is at https://gist.github.com/sargeant45/1a95e48266b30eb0f0aa
```

Default: `undefined`

## `code`
Turns code printing on or off.

Type: Boolean

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?code=true" // Turns code printing on
"http://ethanarterberry.com/Sexydown/?gistid=deb61e0f76daf1ceb6e3&code=true" // Turns code printing on, and sets textbox to https://gist.github.com/sargeant45/deb61e0f76daf1ceb6e3
"http://ethanarterberry.com/Sexydown/?val=function%20javascript()%20%7B%0A%20%20%20%20console.log(%22Hello%20world.%22)%3B%0A%7D&code=true" // Turns code printing on, and sets textbox to a Hello World program.
```

Default: `false`

## `theme`
Sets the `highlight.js` theme for code printing.

Type: Integer (selectedIndex)

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?code=true&theme=1" // GitHub theme
```

Default: `0`

## `ctheme`
Sets the URL for a custom `highlight.js` theme.

Type: String (must be escaped, so you should probably use the [URL generator](http://ethanarterberry.com/Sexydown/url.html))

Example:
```javascript
"http://ethanarterberry.com/Sexydown/?code=true&theme=4&ctheme=https%3A%2F%2Fcdnjs.cloudflare.com%2Fajax%2Flibs%2Fhighlight.js%2F8.6%2Fstyles%2Fascetic.min.css" // Sets theme to Ascetic
```

Default: `undefined`
