/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 1.5.0 Example Program: Matrix Donut
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
var ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var cb = Chalkboard; // Initialize Chalkboard as cb

// Generate the donut's points with a parametric function (see: https://en.wikipedia.org/wiki/Torus)
var points = [];
for(var u = 0; u < cb.PI(2); u += cb.PI(1/16)) {
    for(var v = 0; v < cb.PI(2); v += cb.PI(1/6)) {
        var x = (75 + 30 * cb.trig.cos(v)) * cb.trig.cos(u);
        var y = (75 + 30 * cb.trig.cos(v)) * cb.trig.sin(u);
        var z = 30 * cb.trig.sin(v);
        points.push(cb.vec3.new(x, y, z));
    }
}
function main() {
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "rgb(0, 0, 0)";
    for(var i = 0; i < points.length; i++) {
        for(var j = 0; j < points.length; j++) {
            if(cb.vec3.dist(points[i], points[j]) < 25) {
                // Draw lines between the donut's points to draw the donut
                cb.geom.line3D(points[i].x, points[i].y, points[i].z, points[j].x, points[j].y, points[j].z);
            }
        }
    }
    ctx.restore();

    // Make the donut rotate with a rotation matrix
    var r = cb.matr.rotator(cb.trig.toRad(1), cb.trig.toRad(1), cb.trig.toRad(1));
    for(var i = 0; i < points.length; i++) {
        var buffer = cb.vec3.toMatrix(points[i]);      // Create a buffer matrix which has the donut's points
        var rbuffer = cb.matr.mul(r, buffer);          // Multiply the rotation matrix with the buffer matrix
        points[i] = cb.matr.toVector(rbuffer, "vec3"); // Reassign the values of the donut's points to the new rotated points
    }

    window.requestAnimationFrame(main);
}
window.requestAnimationFrame(main);