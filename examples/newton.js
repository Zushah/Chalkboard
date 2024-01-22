/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 2.1.0 Seki Example Program: Newton's Method
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
var ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cb = Chalkboard; // Initialize Chalkboard as cb

// Random fourth-degree polynomial function
var c = cb.stat.random(-3, 3, 5);
var f = cb.real.define(c[0] + " * x * x * x * x + " + c[1] + " * x * x * x + " + c[2] + " * x * x + " + c[3] + " * x + " + c[4]);

// Newton's method's solution and tangent line (see: https://en.wikipedia.org/wiki/Newton's_method)
var root = cb.calc.Newton(f, [-5, 5]);
var y = cb.real.define(cb.calc.dfdx(f, root) + " * (x - " + root + ") + " + cb.real.val(f, root));

function main() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cb.plot.xyplane({lineWidth: 2});

    // Draw the polynomial
    cb.plot.definition(f, {strokeStyle: "rgb(100, 100, 255)", lineWidth: 4});
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "50px Times New Roman";
    ctx.fillText("f(x) = " + c[0].toFixed(2) + "x⁴ + " + c[1].toFixed(2) + "x³ + " + c[2].toFixed(2) + "x² + " + c[3].toFixed(2) + "x + " + c[4].toFixed(2), 20, 70);
    
    // Draw the solution and the tangent line if the solution is correct
    if (cb.real.val(f, root).toFixed(1) == 0) {
        ctx.fillText("y = " + cb.calc.dfdx(f, root).toFixed(2) + "x - " + (cb.calc.dfdx(f, root) * root).toFixed(2), 20, 120);
        ctx.fillText("A possible root is at x = " + root.toFixed(2), 20, 170);
        cb.plot.definition(y, {strokeStyle: "rgb(255, 100, 100)", lineWidth: 4});
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.ellipse(root * 100, 0, 5, 5, 0, 0, cb.PI(2));
        ctx.fill();
        ctx.restore();
    } else {
        ctx.fillText("y = " + cb.calc.dfdx(f, root).toFixed(2) + "x - " + (cb.calc.dfdx(f, root) * root + cb.real.val(f, root)).toFixed(2), 20, 120);
        ctx.fillText("A possible root was not found", 20, 170);
    }
}
main();