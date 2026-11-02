/*
 * Chalkboard v3.1.0 Ricci - Ricci Curvature Example
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// Initialize the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize Chalkboard
const cb = Chalkboard;

// Three closed surfaces defined by parametric equations X(u, v) = (x, y, z)
// The sphere and the lumpy sphere are topologically the same, but the torus is not because it has a hole
const surfaces = [
    {
        name: "Sphere",
        X: (u, v) => [
            1.5 * cb.trig.sin(u) * cb.trig.cos(v),
            1.5 * cb.trig.sin(u) * cb.trig.sin(v),
            1.5 * cb.trig.cos(u)
        ],
        u: cb.PI(),
        v: cb.PI(2),
        poles: true
    },
    {
        name: "Torus",
        X: (u, v) => [
            (2 + 0.8 * cb.trig.cos(u)) * cb.trig.cos(v),
            (2 + 0.8 * cb.trig.cos(u)) * cb.trig.sin(v),
            0.8 * cb.trig.sin(u)
        ],
        u: cb.PI(2),
        v: cb.PI(2),
        poles: false
    },
    {
        name: "Lumpy Sphere",
        X: (u, v) => {
            const r = 1.5 * (1 + 0.2 * cb.real.pow(cb.trig.sin(u), 4) * cb.trig.cos(4 * v) + 0.12 * cb.trig.cos(3 * u));
            return [
                r * cb.trig.sin(u) * cb.trig.cos(v),
                r * cb.trig.sin(u) * cb.trig.sin(v),
                r * cb.trig.cos(u)
            ];
        },
        u: cb.PI(),
        v: cb.PI(2),
        poles: true
    }
];

// The partial derivatives ∂ᵤF and ∂ᵥF of a tensor-valued function F(u, v), stacked so that the first axis is the direction of the derivative
const partials = (F, u, v, h) => cb.tens.stack([
    cb.tens.scl(cb.tens.sub(F(u + h, v), F(u - h, v)), 1 / (2 * h)),
    cb.tens.scl(cb.tens.sub(F(u, v + h), F(u, v - h)), 1 / (2 * h))
]);

// The metric tensor gᵢⱼ = ∂ᵢX · ∂ⱼX measures lengths and angles on the surface
const metric = (X, u, v) => {
    const dX = partials(X, u, v, 0.0001);
    return cb.tens.einsum("ia,ja->ij", dX, dX);
};

// The Christoffel symbols Γᵏᵢⱼ = ½gᵏˡ(∂ᵢgⱼₗ + ∂ⱼgᵢₗ - ∂ₗgᵢⱼ) describe how the surface's coordinate directions turn from point to point
const christoffel = (X, u, v) => {
    const dg = partials((u, v) => metric(X, u, v), u, v, 0.001); // dg[l][i][j] = ∂ₗgᵢⱼ
    const lowered = cb.tens.scl(cb.tens.sub(cb.tens.add(cb.tens.permute(dg, 2, 0, 1), cb.tens.permute(dg, 2, 1, 0)), dg), 0.5);
    return cb.tens.einsum("kl,lij->kij", cb.matr.invert(metric(X, u, v)), lowered);
};

// The Riemann tensor Rʳₛₘₙ = ∂ₘΓʳₙₛ - ∂ₙΓʳₘₛ + ΓʳₘₗΓˡₙₛ - ΓʳₙₗΓˡₘₛ is two times an antisymmetrization over its last two indices
// The Ricci tensor Rₛₙ = Rʳₛᵣₙ is a contraction of the Riemann tensor, and the scalar curvature S = gˢⁿRₛₙ is two times the Gaussian curvature K
const curvature = (X, u, v) => {
    const g = metric(X, u, v);
    const Gamma = christoffel(X, u, v);
    const dGamma = partials((u, v) => christoffel(X, u, v), u, v, 0.001); // dGamma[m][r][n][s] = ∂ₘΓʳₙₛ
    const Riemann = cb.tens.scl(cb.tens.antisymmetrize(cb.tens.add(cb.tens.permute(dGamma, 1, 3, 0, 2), cb.tens.einsum("rml,lns->rsmn", Gamma, Gamma)), 2, 3), 2);
    const Ricci = cb.tens.contract(Riemann, 0, 2);
    const S = cb.tens.einsum("ij,ij", cb.matr.invert(g), Ricci);
    return { K: S / 2, dA: cb.real.sqrt(cb.matr.det(g)) }; // dA = √det(g) is the area of the surface per unit of u and v
};

// Calculate the curvature at the center of each cell of a grid on each surface
const rows = 24;
const cols = 48;
for (const s of surfaces) {
    const du = s.u / rows;
    const dv = s.v / cols;
    s.K = [];
    s.dA = [];
    for (let i = 0; i < rows; i++) {
        s.K.push([]);
        s.dA.push([]);
        for (let j = 0; j < cols; j++) {
            const c = curvature(s.X, (i + 0.5) * du, (j + 0.5) * dv);
            s.K[i].push(c.K);
            s.dA[i].push(c.dA * du * dv);
        }
    }
    s.Kmax = Math.max(cb.tens.max(s.K), -cb.tens.min(s.K));

    // The Gauss-Bonnet theorem says that the total curvature of a closed surface is ∫K dA = 2πχ, where χ is the surface's Euler characteristic
    s.total = cb.tens.sum(cb.tens.mulHadamard(s.K, s.dA)) / cb.PI(2);

    // The Euler characteristic χ = V - E + F can also be counted from the grid (the spheres' poles each become a single vertex)
    const V = s.poles ? cols * (rows - 1) + 2 : rows * cols;
    const E = s.poles ? cols * (rows - 1) + cols * rows : 2 * rows * cols;
    s.chi = cb.geom.Euler(V, E, rows * cols);

    // The corners of the grid's cells, which are what get drawn
    s.points = [];
    for (let i = 0; i <= rows; i++) for (let j = 0; j <= cols; j++) s.points.push(s.X(i * du, j * dv));
}

let current = 0;
let rotation = cb.matr.rotator(-1, 0, 0);
const R = cb.matr.rotator(0.003, 0.006, 0.002);
const main = () => {
    const s = surfaces[current];
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Make the surface rotate with a rotation matrix, which is applied to all of the points at once with Einstein summation
    rotation = cb.matr.mul(R, rotation);
    const points = cb.tens.einsum("ij,nj->ni", rotation, s.points);

    // Sort the cells from back to front so that the nearer cells are drawn over the farther ones
    const cells = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const corners = [
                points[i * (cols + 1) + j],
                points[i * (cols + 1) + j + 1],
                points[(i + 1) * (cols + 1) + j + 1],
                points[(i + 1) * (cols + 1) + j]
            ];
            cells.push({
                corners: corners,
                K: s.K[i][j],
                z: (corners[0][2] + corners[1][2] + corners[2][2] + corners[3][2]) / 4
            });
        }
    }
    cells.sort((a, b) => a.z - b.z);

    // Color each cell by its curvature (red for positive, blue for negative, white for zero) and shade it by the direction that it faces
    const scale = Math.min(canvas.width, canvas.height) / 8;
    for (const cell of cells) {
        const [a, b, c, d] = cell.corners.map((p) => cb.vect.init(p[0], p[1], p[2]));
        const normal = cb.vect.cross(cb.vect.sub(c, a), cb.vect.sub(d, b));
        const light = cb.vect.mag(normal) > 0 ? 0.55 + 0.45 * Math.abs(normal.z / cb.vect.mag(normal)) : 1;
        const t = cb.numb.constrain(cell.K / s.Kmax, [-1, 1]);
        const color = t > 0 ? [255, 255 * (1 - t), 255 * (1 - t)] : [255 * (1 + t), 255 * (1 + t), 255];
        ctx.fillStyle = ctx.strokeStyle = "rgb(" + color.map((x) => Math.round(x * light)).join(", ") + ")";
        ctx.beginPath();
        for (const p of [a, b, c, d]) ctx.lineTo(canvas.width / 2 + p.x * scale, canvas.height / 2 - p.y * scale);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    // Show that the total curvature matches the Euler characteristic, just like the Gauss-Bonnet theorem says
    ctx.fillStyle = "black";
    ctx.font = "50px Times New Roman";
    ctx.fillText(s.name, 20, 70);
    ctx.font = "30px Times New Roman";
    ctx.fillText("K ranges from " + cb.tens.min(s.K).toFixed(3) + " to " + cb.tens.max(s.K).toFixed(3) + " (red is positive and blue is negative)", 20, 120);
    ctx.fillText("∫K dA / 2π = " + cb.numb.roundTo(s.total, 0.001).toFixed(3), 20, 160);
    ctx.fillText("χ = V - E + F = " + s.chi, 20, 200);
    ctx.fillText("Click to change the surface", 20, canvas.height - 30);
    window.requestAnimationFrame(main);
};
main();
canvas.addEventListener("click", () => current = (current + 1) % surfaces.length);
