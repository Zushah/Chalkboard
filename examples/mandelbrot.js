/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 2.4.0 Noether Example Program: Mandelbrot Set
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ratio = canvas.width / canvas.height;

const cb = Chalkboard; // Initialize Chalkboard as cb

// The Mandelbrot set will be rendered using an ImageData object from the Canvas API
const imageData = ctx.createImageData(canvas.width, canvas.height);
const pixels = imageData.data;
function main() {
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            // The complex numbers from the Mandelbrot set's definition (see: lines 33-34), z and c
            let z = cb.comp.init(cb.numb.map(x, [0, canvas.width], [-2 * ratio, 2 * ratio]), cb.numb.map(y, [0, canvas.height], [-2, 2]));
            let c = cb.comp.init(cb.numb.map(x, [0, canvas.width], [-2 * ratio, 2 * ratio]), cb.numb.map(y, [0, canvas.height], [-2, 2]));
            
            let currIteration = 0;    // The current iteration of the fractal
            let maxIterations = 100;  // The maximum iterations intended to be evaluated
            
            while (currIteration < maxIterations) {
                // The definition of the Mandelbrot set: f(z) = z^2 + c
                z = cb.comp.add(cb.comp.sq(z), c);

                // Of course we can't keep iterating infinitely, so we'll just round infinity down to 2
                if (cb.comp.magsq(z) > 4) {
                    break;
                }
                currIteration++; // Keep iterating
            }

            // The fractal will be colored based on how many iterations it's gone through at a point
            let color = cb.numb.map(cb.real.sqrt(cb.numb.map(currIteration, [0, maxIterations], [0, 1])), [0, 1], [0, 255]);
            if (currIteration === maxIterations) {
                color = 0;
            }
            let px = (x + y * canvas.width) * 4;
            pixels[px + 0] = color;
            pixels[px + 1] = color;
            pixels[px + 2] = color;
            pixels[px + 3] = 255;
        }
    }

    ctx.putImageData(imageData, 0, 0);
}
main();
