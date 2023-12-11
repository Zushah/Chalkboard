/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 1.4.0 Example Program: Hyperbolic Functions
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
var ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cb = Chalkboard; // Initialize Chalkboard as cb

var theta = 0;
function main() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cb.plot.xyplane(1, [0, 0, 0], [canvas.width / 2, canvas.height / 2], 2);

    // Plot the unit hyperbola with a parametric function (see: https://en.wikipedia.org/wiki/Hyperbola)
    var f = cb.real.function(["(t * t + 1) / (2 * t)", "(t * t - 1) / (2 * t)"], "curv");
    cb.plot.function(f, 1, [100, 100, 255], [0, 10], [canvas.width / 2, canvas.height / 2], 4);
    cb.plot.function(f, 1, [100, 100, 255], [-10, 0], [canvas.width / 2, canvas.height / 2], 4);

    // The two main hyperbolic trigonometric functions, hyperbolic sine (sinh) and hyperbolic cosine (cosh)
    var x = cb.trig.cosh(theta);
    var y = cb.trig.sinh(theta);

    // Show the values of all of the hyperbolic trigonometric functions as theta varies
    ctx.strokeStyle = "rgb(255, 100, 100)";
    ctx.lineWidth = 4;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.beginPath();
    ctx.moveTo(x * 100, 0);
    ctx.lineTo(x * 100, -y * 100);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -y * 100);
    ctx.lineTo(x * 100, -y * 100);
    ctx.stroke();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.beginPath();
    ctx.ellipse(x * 100, -y * 100, 5, 5, 0, 0, cb.PI(2));
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.font = "50px Times New Roman";
    ctx.fillText("x² - y² = 1", 20, 70);
    ctx.fillText("θ = " + theta.toFixed(2), 20, 120);
    ctx.fillText("sinh(θ) = " + cb.trig.sinh(theta).toFixed(2), 20, 170);
    ctx.fillText("cosh(θ) = " + cb.trig.cosh(theta).toFixed(2), 20, 220);
    ctx.fillText("tanh(θ) = " + cb.trig.tanh(theta).toFixed(2), 20, 270);
    ctx.fillText("csch(θ) = " + cb.trig.csch(theta).toFixed(2), 20, 320);
    ctx.fillText("sech(θ) = " + cb.trig.sech(theta).toFixed(2), 20, 370);
    ctx.fillText("coth(θ) = " + cb.trig.coth(theta).toFixed(2), 20, 420);
    ctx.fillText("arcsinh(θ) = " + cb.trig.arcsinh(theta).toFixed(2), 20, 470);
    if(cb.trig.arccosh(theta) !== undefined) {
        ctx.fillText("arccosh(θ) = " + cb.trig.arccosh(theta).toFixed(2), 20, 520);
    } else {
        ctx.fillText("arccosh(θ) = undefined", 20, 520);
    }
    if(cb.trig.arctanh(theta) !== undefined) {
        ctx.fillText("arctanh(θ) = " + cb.trig.arctanh(theta).toFixed(2), 20, 570);
    } else {
        ctx.fillText("arctanh(θ) = undefined", 20, 570);
    }
    if(cb.trig.arccsch(theta) !== undefined) {
        ctx.fillText("arccsch(θ) = " + cb.trig.arccsch(theta).toFixed(2), 20, 620);
    } else {
        ctx.fillText("arccsch(θ) = undefined", 20, 620);
    }
    if(cb.trig.arcsech(theta) !== undefined) {
        ctx.fillText("arcsech(θ) = " + cb.trig.arcsech(theta).toFixed(2), 20, 670);
    } else {
        ctx.fillText("arcsech(θ) = undefined", 20, 670);
    }
    if(cb.trig.arccoth(theta) !== undefined) {
        ctx.fillText("arccoth(θ) = " + cb.trig.arccoth(theta).toFixed(2), 20, 720);
    } else {
        ctx.fillText("arccoth(θ) = undefined", 20, 720);
    }
    
    theta += 0.05;
    if(theta > 2.5) {
        theta = -2.5;
    }
    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);