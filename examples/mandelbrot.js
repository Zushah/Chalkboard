/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 1.0.0 Example Program: Mandelbrot Set
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
var ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ratio = canvas.width / canvas.height;

var cb = Chalkboard; // Initialize Chalkboard as cb

// The Mandelbrot set will be rendered using an ImageData object from the Canvas API
var imageData = ctx.createImageData(canvas.width, canvas.height);
var pixels = imageData.data;
function main() {
    for(var x = 0; x < canvas.width; x++) {
        for(var y = 0; y < canvas.height; y++) {
            // The complex numbers from the Mandelbrot set's definition (see: lines 33-34), z and c
            var z = cb.comp.new(cb.numb.map(x, [0, canvas.width], [-2 * ratio, 2 * ratio]), cb.numb.map(y, [0, canvas.height], [-2, 2]));
            var c = cb.comp.new(cb.numb.map(x, [0, canvas.width], [-2 * ratio, 2 * ratio]), cb.numb.map(y, [0, canvas.height], [-2, 2]));
            
            var currIteration = 0;    // The current iteration of the fractal
            var maxIterations = 100;  // The maximum iterations intended to be evaluated
            
            while(currIteration < maxIterations) {
                // The definition of the Mandelbrot set: f(z) = z^2 + c (see: https://en.wikipedia.org/wiki/Mandelbrot_set)
                z = cb.comp.add(cb.comp.sq(z), c);

                // Of course we can't keep iterating infinitely, so we'll just round infinity down to 2
                if(cb.comp.mag(z) > 2) {
                    break;
                }
                currIteration++; // Keep iterating
            }

            // The fractal will be colored based on how many iterations it's gone through at a point
            var color = cb.numb.map(cb.real.sqrt(cb.numb.map(currIteration, [0, maxIterations], [0, 1])), [0, 1], [0, 255]);
            if(currIteration === maxIterations) {
                color = 0;
            }
            var px = (x + y * canvas.width) * 4;
            pixels[px + 0] = color;
            pixels[px + 1] = color;
            pixels[px + 2] = color;
            pixels[px + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}
main();