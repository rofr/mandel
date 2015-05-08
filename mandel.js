self.addEventListener("message", function (message) {
    var args = message.data;
    console.log("worker received message", args);
    graph(args);
    console.log("worker done");
    self.close();
});

function graph(args) {
    var deltaX = (args.xmax - args.xmin) / args.width;
    var deltaY = (args.ymax - args.ymin) / args.height;
    x = args.xmin;
    y = args.ymin;


    for (var scaleX = 0; scaleX < args.width; scaleX++) {
        y = args.ymin;
        for (var scaleY = 0; scaleY < args.height; scaleY++) {
            var z = new Complex(0, 0);
            var c = new Complex(x,y);
            if(mandelbrot(z,c)) postMessage({ x: scaleX, y: scaleY });
            y += deltaY;
        }
        x += deltaX;
    }
}

var escape_radius_squared = 4;
//var escapeRadiusLog2 = Math.log2(escapeRadius);
function mandelbrot(z, c) {
    var max_iter = 100;
    var dist_squared;
    var n = 0;
    while(true) {
      z.multiply_by(z).increment_with(c);
      if (n++ > max_iter) break;
      dist_squared = z.imag * z.imag + z.real * z.real;
      if (dist_squared > escape_radius_squared) break;

    }
    return dist_squared < escape_radius_squared;
    //return n - Math.log2(Math.log2(abs) / escapeRadiusLog2);
}


var Complex = (function () {
    function Complex(i, r) {
        this.imag = i;
        this.real = r;
    }

    Complex.prototype.multiply_by = function(c) {
      var real = this.real * c.real;
      real -= this.imag * c.imag;

      var imag = this.real * c.imag;
      imag += this.imag * c.real;

        this.imag = imag;
        this.real = real;
        return this;
    }

    Complex.prototype.increment_with = function(c) {
      this.imag += c.imag;
      this.real += c.real;
    }



    Complex.prototype.multiply = function (c) {
        var real = this.real * c.real;
        real -= this.imag * c.imag;

        var imag = this.real * c.imag;
        imag += this.imag * c.real;

        return new Complex(imag,real);
    }

    Complex.prototype.add = function (c) {
        return new Complex(this.imag + c.imag, this.real + c.real);
    }

    Complex.prototype.abs = function () {
        var i = this.imag;
        var r = this.real;
        return Math.sqrt(i * i + r * r);
    }
    return Complex;
}
)();
