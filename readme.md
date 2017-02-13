# Proof of concept only

## Installation

**For development:** once the project has been cloned, CD into the root and type 'npm install'. When everything is installed type 'npm start' and you're good to go.

**For use as POC:** No installation required, just copy everything from the assets folder and take the 'index.html file'.

## Coding guidelines

The template is built using the 'everything is a component or utility' school of thought. If it exists on the page as a group of HTML tags then it's a component and must have a class starting with 'c-' (e.g. `.c-news-item`). If it is a class used to alter the appearance or behaviour of a component then it is a utility and must begin with 'u-' (e.g. `.u-visually-hidden`).


### Stylus
The CSS is created using the stylus preprocessor and uses standard SASS syntax (the docs show python syntax but it's not used here), there are a few minor differences between sass and stylus, they are available to read in the [official stylus documentation](http://stylus-lang.com/).

### Jeet
Jeet is used for the grid, it is a classless semantic grid and avoids the horrible bootstrap-like practice of putting classes like `.col-lg-12 .col-md-12 .col-sm-12` all over the page. Instead it appears in the css as a fractional width.

e.g.

```
.u-primary-column {
  column(1/2)
}
```

This specifies that the primary column should span 1/2 the page. [The official documentation is available to read here.](http://jeet.gs)

### Rupture
Rupture is a great way to write media queries, it uses a simplified syntax to make responsive layouts fast and easy to code.

e.g.

```
.u-primary-column {
  column(1)
  +above(m) {
    column(1/2)  
  }
}
```

This alters the primary column to say that by default, it spans the full width of the page until it reaches the 'm' breakpoint (specified in a config file) and then after that it changes to a half, column.

[The official documentation is available to read here.](http://jescalan.github.io/rupture/)

Other than that, the CSS is written using standard [BEM notation](http://getbem.com/introduction/)

### JS

The JavaScript is currently not using anything special (however ES6 is likely to be used in the final version). However please be aware that you should not attach a JS function to an existing class. Please create a new class starting with 'js-' and use that as the JS hook.

e.g.

`class="c-news-item js-news-item"`
