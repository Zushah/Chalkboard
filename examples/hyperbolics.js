/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Example Program: Hyperbolic Functions
*/

// Initialize the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize Chalkboard
const cb = Chalkboard;

let theta = 0;
const main = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    cb.plot.xyplane({ lineWidth: 2 });

    // Plot the unit hyperbola with a parametric function
    const f = cb.real.define((t) => (t*t + 1) / (2*t), (t) => (t*t - 1) / (2*t));
    cb.plot.definition(f, { strokeStyle: "rgb(100, 100, 255)", domain: [0, 10], lineWidth: 4 });
    cb.plot.definition(f, { strokeStyle: "rgb(100, 100, 255)", domain: [-10, 0], lineWidth: 4 });

    // The two main hyperbolic trigonometric functions, hyperbolic sine (sinh) and hyperbolic cosine (cosh)
    let x = cb.trig.cosh(theta);
    let y = cb.trig.sinh(theta);

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
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.ellipse(x * 100, -y * 100, 5, 5, 0, 0, cb.PI(2));
    ctx.fill();
    ctx.restore();
    ctx.fillStyle = "black";
    ctx.font = "50px Times New Roman";
    ctx.fillText("x² - y² = 1", 20, 70);
    ctx.fillText("θ = " + theta.toFixed(2), 20, 120);
    const functions = ["sinh", "cosh", "tanh", "csch", "sech", "coth", "arcsinh", "arccosh", "arctanh", "arccsch", "arcsech", "arccoth"];
    for (let i = 0; i < functions.length; i++) {
        if (cb.trig[functions[i]](theta) !== undefined) ctx.fillText(functions[i] + "(θ) = " + cb.trig[functions[i]](theta).toFixed(2), 20, 170 + i * 50);
        else ctx.fillText(functions[i] + "(θ) = undefined", 20, 170 + i * 50);
    }
    
    theta += 0.01;
    if (theta > 2.5) theta = -2.5;
    window.requestAnimationFrame(main);
};
main();
