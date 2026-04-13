/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Example Program: Modular Multiplication Mandala
*/

// Initialize the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize Chalkboard
const cb = Chalkboard;

// Setup
const numPoints = 200; // Number of nodes on the circle
const radius = Math.min(canvas.width, canvas.height) / 2.5;
const cx = canvas.width / 2;
const cy = canvas.height / 2;
let multiplier = 0;
const primeNodes = [];
for (let i = 0; i < numPoints; i++) primeNodes[i] = cb.numb.isPrime(i);

const main = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    multiplier += 0.05;

    // Draw the mandala
    ctx.lineWidth = 1;
    for (let i = 0; i < numPoints; i++) {
        const startNode = i;
        
        // Wrap the multiplied value around the circle
        const endNode = cb.numb.mod(startNode * multiplier, numPoints);

        // Map the node indices to radians (0 to 2π) around the circle
        const angle1 = cb.numb.map(startNode, [0, numPoints], [0, cb.PI(2)]) + cb.PI();
        const angle2 = cb.numb.map(endNode, [0, numPoints], [0, cb.PI(2)]) + cb.PI();
        const x1 = cx + cb.trig.cos(angle1) * radius;
        const y1 = cy + cb.trig.sin(angle1) * radius;
        const x2 = cx + cb.trig.cos(angle2) * radius;
        const y2 = cy + cb.trig.sin(angle2) * radius;

        // Color the lines: if the start node and floored end node are coprime (GCD === 1), draw gold, else draw cyan
        if (cb.numb.gcd(startNode, Math.floor(endNode)) === 1) ctx.strokeStyle = "rgb(255, 200, 50)"; // Gold for coprime connections
        else ctx.strokeStyle = "rgb(100, 200, 255)"; // Cyan for shared factors

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    // Draw the nodes on the circle
    for (let i = 0; i < numPoints; i++) {
        const angle = cb.numb.map(i, [0, numPoints], [0, cb.PI(2)]) + cb.PI();
        const x = cx + cb.trig.cos(angle) * radius;
        const y = cy + cb.trig.sin(angle) * radius;
        ctx.beginPath();
        // If the node is a prime number, draw it as a glowing green dot, otherwise a small white dot
        if (primeNodes[i]) {
            ctx.arc(x, y, 4, 0, cb.PI(2));
            ctx.fillStyle = "rgb(50, 200, 50)";
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgb(50, 100, 50)";
        } else {
            ctx.arc(x, y, 1.5, 0, cb.PI(2));
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    window.requestAnimationFrame(main);
};
main();
