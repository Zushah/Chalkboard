/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 2.3.0 Boole Example Program: Matrix Donut
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cb = Chalkboard; // Initialize Chalkboard as cb

// Generate the donut's points with parametric equations
let points = [];
for (let u = 0; u < cb.PI(2); u += cb.PI(1/16)) {
    for (let v = 0; v < cb.PI(2); v += cb.PI(1/6)) {
        let x = (75 + 30 * cb.trig.cos(v)) * cb.trig.cos(u);
        let y = (75 + 30 * cb.trig.cos(v)) * cb.trig.sin(u);
        let z = 30 * cb.trig.sin(v);
        points.push(cb.vect.init(x, y, z));
    }
}

// Make the donut rotate with a rotation matrix
const R = cb.matr.rotator(0.01, 0.01, 0.01);

function main() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "black";
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points.length; j++) {
            if (cb.vect.distsq(points[i], points[j]) < 625) {
                // Draw lines between the donut's points to draw the donut
                cb.geom.line3D(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
            }
        }
    }
    ctx.restore();

    for (let i = 0; i < points.length; i++) {
        points[i] = cb.matr.mulVector(R, points[i]); // Multiply the rotation matrix with the points' vectors
    }

    window.requestAnimationFrame(main);
}
main();
