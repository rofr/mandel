# mandel
messing around with the mandelbrot set in javascript using
the html5 canvas and WebWorker api. Try it out online at http://rofr.github.io/mandel

https://en.wikipedia.org/wiki/Mandelbrot_set

Every point in a given complex plane that is a member of the mandelbrot
set is passed as a message from the webworker back to the main page

Tested with IE11, Firefox 37 and Chrome 42 on Windows 8.1.

## Try it
Just download/clone and open the index.html in Firefox or IE.

Chrome won't allow the web worker when using the file:// protocol. There might be some setting in chrome to make it work but I just served the files using node-static.

Make sure you have chocolatey installed, then do:

```
$choco install node    #installs node
$ npm -g node-static   #installs node-static globally
$ static               #start node-static from the directory with the files
```

Now navigate to http://127.0.0.1:8080
