/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 2.3.0 Boole Example Program: Newton's Method
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cb = Chalkboard; // Initialize Chalkboard as cb

// Random fourth-degree polynomial
const f = cb.real.randomPolynomial(4, -3, 3);

// Newton's method's solution and tangent line
const root = cb.calc.Newton(f, [-5, 5]);
const y = cb.real.define(cb.calc.dfdx(f, root) + " * (x - " + root + ") + " + cb.real.val(f, root));

function main() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cb.plot.xyplane({lineWidth: 2});

    // Draw the polynomial
    cb.plot.definition(f, {strokeStyle: "rgb(100, 100, 255)", lineWidth: 4});
    
    // Draw the solution and the tangent line if the solution is correct
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "50px Times New Roman";
    if (cb.real.val(f, root).toFixed(1) == 0) {
        ctx.fillText("A possible root is at x = " + root.toFixed(2), 20, 70);
        cb.plot.definition(y, {strokeStyle: "rgb(255, 100, 100)", lineWidth: 4});
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.beginPath();
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.ellipse(root * 100, 0, 5, 5, 0, 0, cb.PI(2));
        ctx.fill();
        ctx.restore();
    } else {
        ctx.fillText("A possible root was not found", 20, 70);
    }
}
main();
