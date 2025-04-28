/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 2.4.0 Noether Example Program: Quaternion Donut
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
let theta = 0;
function main() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Make the donut rotate with a rotation quaternion
    const r = cb.quat.fromAxis(cb.vect.normalize(cb.vect.init(1, 1, 1)), theta);
    let qoints = [];  // We'll say that "qoints" are the new rotated points
    for (let i = 0; i < points.length; i++) {
        qoints.push(cb.quat.toRotation(r, points[i]));
    }
    theta += cb.trig.toRad(1);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.strokeStyle = "white";
    for (let i = 0; i < qoints.length; i++) {
        for (let j = 0; j < qoints.length; j++) {
            if (cb.vect.distsq(qoints[i], qoints[j]) < 625) {
                // Draw lines between the donut's qoints to draw the donut
                cb.geom.line3D(qoints[i].x, qoints[i].y, qoints[i].z, qoints[j].x, qoints[j].y, qoints[j].z);
            }
        }
    }
    ctx.restore();
    window.requestAnimationFrame(main);
}
main();
