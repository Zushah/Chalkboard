/*
    The Chalkboard Library ===> https://www.github.com/Zushah/Chalkboard
    Version 2.3.0 Boole Example Program: Isomorphism Visualization
    Authored by Zushah ===> https://www.github.com/Zushah
*/

// Get the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cb = Chalkboard; // Initialize Chalkboard as cb

// Define the sets
const Z4 = cb.abal.Z(4); // The set of integers modulo 4 is the set {0, 1, 2, 3}
const C4 = cb.abal.C(4); // The set of fourth roots of unity is the set {1, i, -1, -i}

// Define the groups
const G = cb.abal.group(Z4, (a, b) => (a + b) % 4); // The group G is the set Z₄ with mod 4 addition
const H = cb.abal.group(C4, (z, w) => cb.comp.mul(z, w)); // The group H is the set C₄ with complex multiplication

// Define the isomorphism
const F = cb.abal.isomorphism(G, H, (n) => cb.comp.round(cb.comp.pow(cb.comp.init(0, 1), n))); // The isomorphism F: G → H is defined by F(n) = iⁿ for all n in Z₄

// F is an isomorphism because it is (1) a homomorphism and it is (2) a bijection.
// Proof:
// (1) F is a homomorphism because it preserves the group operation.
//     For all n, m in Z₄, we have:
//     F(n + m) = i^(n + m) = iⁿ · i^m = F(n) · F(m).
//     Therefore, since F(n + m) = F(n) · F(m), F is a homomorphism.
// (2) F is a bijection because it is both injective and surjective.
//     Injective: Suppose F(m) = F(n) in C₄. Then i^m = iⁿ --> i^(m - n) = 1.
//         This implies m - n = 0 (mod 4) --> m = n (mod 4) because the powers of i repeat every fourth power. Therefore, since m = n in Z₄, F is injective.
//     Surjective: Consider the codomain of F, which is C₄ = {1, i, -1, -i}. Now calculate the preimage of each element in C₄ under F:
//         F(0) = 1, F(1) = i, F(2) = -1, F(3) = -i. Therefore, since there exists an n in Z₄ such that F(n) = z for all z in C₄, F is surjective.
console.log("Is F an isomorphism?", cb.abal.isIsomorphism(F));

// Define the inverse of the isomorphism
const Fi = cb.abal.invmorphism(F); // F is an isomorphism, so F is bijective, which means that F has an inverse F⁻¹, which we will denote as Fi in the code
// Claim: F⁻¹(z) = (2/π)·arg(z) mod 4 for all z in C₄.
// Proof:
// Note that each z in C₄ is of the form iⁿ for some n in Z₄, with arg(z) = n·(π/2).
// This implies (2/π)·arg(z) = n, so F⁻¹(z) = (2/π)·arg(z) mod 4 recovers n.
// (1) F⁻¹(F(n)) = (2/π)·arg(iⁿ) mod 4 = n mod 4 = n.
// (2) F(F⁻¹(z)) = i^( (2/π)·arg(z) ) = z, since z = iⁿ for some n.
// Therefore, F⁻¹ is the inverse of F.

// F⁻¹ is an isomorphism because it is the inverse of an isomorphism.
console.log("Is F⁻¹ an isomorphism?", cb.abal.isIsomorphism(Fi));



// Everything below is just the lame graphical stuff.
// All the cool math is above.
// Just kidding, the graphics are pretty cool, too.

const drawSet = (elements, x, y, radius, label, results = []) => {
    ctx.beginPath();
    ctx.arc(x, y, radius + 40, 0, 2 * cb.PI());
    ctx.fillStyle = "lightgray";
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "60px monospace";
    ctx.textAlign = "center";
    ctx.fillText(label.replace("4", "₄"), x, y - radius - 60);
    const angleStep = (2 * cb.PI()) / elements.length;
    const positions = [];
    for (let i = 0; i < elements.length; i++) {
        const angle = i * angleStep - cb.PI() / 2;
        const px = x + radius * cb.trig.cos(angle);
        const py = y + radius * cb.trig.sin(angle);
        ctx.beginPath();
        ctx.ellipse(px, py, 30, 30, 0, 0, 2 * cb.PI());
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = "30px monospace";
        ctx.fillText(elements[i], px, py + 5);
        if (results[i]) {
            ctx.shadowColor = "blue";
            ctx.shadowBlur = 10;
            ctx.fillStyle = "blue";
            ctx.font = "25px monospace";
            ctx.fillText(results[i], px, py + 50);
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
        }
        positions.push({ x: px, y: py });
    }
    return positions;
};
const drawArrow = (from, to) => {
    const circleRadius = 20;
    const startAngle = cb.PI() / 4;
    const startX = from.x + circleRadius * cb.trig.cos(startAngle);
    const startY = from.y - circleRadius * cb.trig.sin(startAngle);
    const endAngle = (3 * cb.PI()) / 4;
    const endX = to.x + circleRadius * cb.trig.cos(endAngle);
    const endY = to.y - circleRadius * cb.trig.sin(endAngle);
    const dx = endX - startX;
    const dy = endY - startY;
    const controlX = (startX + endX) / 2 + dy * 0.3;
    const controlY = (startY + endY) / 2 - dx * 0.3;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
    const arrowSize = 10;
    const arrowAngle = cb.trig.arctan2(endY - controlY, endX - controlX);
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(
        endX - arrowSize * cb.trig.cos(arrowAngle - cb.PI() / 6),
        endY - arrowSize * cb.trig.sin(arrowAngle - cb.PI() / 6)
    );
    ctx.lineTo(
        endX - arrowSize * cb.trig.cos(arrowAngle + cb.PI() / 6),
        endY - arrowSize * cb.trig.sin(arrowAngle + cb.PI() / 6)
    );
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();
    const startArrowAngle = cb.trig.arctan2(controlY - startY, controlX - startX);
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(
        startX + arrowSize * cb.trig.cos(startArrowAngle - cb.PI() / 6),
        startY + arrowSize * cb.trig.sin(startArrowAngle - cb.PI() / 6)
    );
    ctx.lineTo(
        startX + arrowSize * cb.trig.cos(startArrowAngle + cb.PI() / 6),
        startY + arrowSize * cb.trig.sin(startArrowAngle + cb.PI() / 6)
    );
    ctx.closePath();
    ctx.fillStyle = "blue";
    ctx.fill();
};
const main = () => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const leftX = canvas.width / 4;
    const rightX = (3 * canvas.width) / 4;
    const centerY = canvas.height / 2;
    const radius = 150;
    const Z4Results = Z4.elements.map((n) => `F(${n}) = ${cb.comp.toString(F.mapping(n))}`);
    const C4Results = C4.elements.map((z) => `F⁻¹(${cb.comp.toString(z)}) = ${Fi.mapping(z)}`);
    const Z4Positions = drawSet(Z4.elements, leftX, centerY, radius, "Z₄", Z4Results);
    const C4Positions = drawSet(C4.elements.map((z) => cb.comp.toString(z)), rightX, centerY, radius, "C₄", C4Results);
    for (let i = 0; i < Z4Positions.length; i++) {
        drawArrow(Z4Positions[i], C4Positions[i]);
    }
    ctx.fillStyle = "black";
    ctx.font = "20px monospace";
    ctx.textAlign = "center";
    const textY = centerY + radius + 100;
    ctx.fillText("The isomorphism F: Z₄ → C₄ is defined by F(n) = iⁿ for all n in Z₄.", canvas.width / 2, textY);
    ctx.fillText("The inverse isomorphism F⁻¹: C₄ → Z₄ is defined by F⁻¹(z) = (2/π)·arg(z) mod 4 for all z in C₄.", canvas.width / 2, textY + 30);
};
main();
