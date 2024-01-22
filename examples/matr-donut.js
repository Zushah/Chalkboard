/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 2.1.0 Seki Example Program: Matrix Donut
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
var ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cb = Chalkboard; // Initialize Chalkboard as cb

// Generate the donut's points with parametric equations (see: https://en.wikipedia.org/wiki/Torus)
var points = [];
for (var u = 0; u < cb.PI(2); u += cb.PI(1/16)) {
    for (var v = 0; v < cb.PI(2); v += cb.PI(1/6)) {
        var x = (75 + 30 * cb.trig.cos(v)) * cb.trig.cos(u);
        var y = (75 + 30 * cb.trig.cos(v)) * cb.trig.sin(u);
        var z = 30 * cb.trig.sin(v);
        points.push(cb.vect.init(x, y, z));
    }
}

// Make the donut rotate with a rotation matrix
var r = cb.matr.rotator(0.01, 0.01, 0.01);

function main() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "black";
    for (var i = 0; i < points.length; i++) {
        for (var j = 0; j < points.length; j++) {
            if (cb.vect.distsq(points[i], points[j]) < 625) {
                // Draw lines between the donut's points to draw the donut
                cb.geom.line3D(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
            }
        }
    }
    ctx.restore();

    for (var i = 0; i < points.length; i++) {
        points[i] = cb.matr.mulVector(r, points[i]); // Multiply the rotation matrix with the points' vectors
    }

    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);