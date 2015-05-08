"use strict"

self.addEventListener("message", function (message) {
    var args = message.data;
    console.log("worker received message", args);
    calc_graph(args);
    console.log("worker done");
    self.close();
});

// check every point in the 2 dimensional complex plane
//bounded by args.
function calc_graph(args) {

    //calculate the distances between each screen pixel
    var x_step = (args.xmax - args.xmin) / args.width;
    var y_step = (args.ymax - args.ymin) / args.height;

    //current complex number
    var x = args.xmin;
    var y = args.ymin;


    for (var scaleX = 0; scaleX < args.width; scaleX++) {
        y = args.ymin;
        for (var scaleY = 0; scaleY < args.height; scaleY++) {
            var c = new Complex(x,y);
            if(is_mandelbrot_member(c)) {
              postMessage({ x: scaleX, y: scaleY });
            }
            y += y_step;
        }
        x += x_step;
    }
}

//points this far from origo will grow unbounded
var escape_radius = 2;

function is_mandelbrot_member(c) {
    var max_iterations = 100;
    var n = 0;
    var z = Complex.zero;
    while(n++ < max_iterations) {
      z = z.multiply(z).add(c);
      var abs = z.abs();
      if (abs > escape_radius) break;
    }
    return abs < escape_radius;
}


//Complex number ai + b, where i = Math.sqrt(-1)
var Complex = (function () {
    function Complex(a, b) {
        this.a = a;
        this.b = b;
    }

    Complex.prototype.multiply = function (complex) {

        //calculate the real coefficient
        var b = this.b * complex.b;
        b -= this.a * complex.a;

        //calculate the imaginary coefficient
        var a = this.b *complex.a;
        a += this.a * complex.b;

        return new Complex(a,b);
    }

    Complex.prototype.add = function (complex) {
        var a = this.a + complex.a;
        var b = this.b + complex.b;
        return new Complex(a,b);
    }

    Complex.prototype.abs = function () {
        var a = this.a;
        var b = this.b;
        return Math.sqrt(a * a + b * b);
    }

    Complex.zero = new Complex(0,0);

    return Complex;
}
)();
