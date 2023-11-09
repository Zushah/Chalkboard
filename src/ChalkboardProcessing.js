/*
    Chalkboard
    Version 1.0.0 released 11/06/2023
    Authored by Zushah ===> https://www.github.com/Zushah
    Available under the MIT License ===> https://www.opensource.org/license/mit/

    The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.

    Latest release can be found here ===> https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0
    Documentation can be found here ===> https://zushah.github.io/Chalkboard/documentation.html/
*/
var Chalkboard = {
    README: function() {
        console.log("Chalkboard\nVersion 1.0.0 released 11/06/2023\nAuthored by Zushah ===> https://www.github.com/Zushah\nAvailable under the MIT License ===> https://www.opensource.org/license/mit/\n\nThe Chalkboard library is a collection of JavaScript code that provides a plethora of both practical and abstract mathematical functionalities for its user.\n\nLatest release can be found here ===> https://www.github.com/Zushah/Chalkboard/releases/tag/v1.0.0\nDocumentation can be found here ===> https://zushah.github.io/Chalkboard/documentation.html/");
    },
    LOGO: function(x, y, s) {
        x = x || width / 2;
        y = y || height / 2;
        s = s || 1;
        pushMatrix();
        translate(x, y);
        scale(s);
        noStroke();
        fill(25, 25, 25);
        rect(-50, -50, 100, 100);
        fill(50, 125, 200);
        textAlign(CENTER, CENTER);
        textSize(75);
        textFont(createFont("Times New Roman"));
        text("C", -25, 0);
        text("B", 25, 0);
        stroke(50, 125, 200);
        strokeWeight(6);
        strokeCap(SQUARE);
        line(-30, 25, -30, -22.5);
        line(22, 25, 22, -22.5);
        textAlign(TOP, LEFT);
        popMatrix();
    },
    PI: function(coefficient) {
        coefficient = coefficient || 1;
        return coefficient * 4 * (4 * Math.atan(1/5) - Math.atan(1/239));
    },
    E: function(exponent) {
        exponent = exponent || 1;
        return Math.pow(Math.pow(10, 1 / Math.log(10)), exponent);
    },
    numb: {
        random: function(inf, sup) {
            return inf + Math.random() * (sup - inf);
        },
        factorial: function(num) {
            var n = 1;
            for(var i = 1; i <= num; i++) {
                n *= i;
            }
            i--;
            if(num >= 0) {
                return n;
            } else if(num < 0) {
                return undefined;
            }
        },
        gcd: function(a, b) {
            if(b === 0) {
                return a;
            }
            return Chalkboard.numb.gcd(b, a % b);
        },
        lcm: function(a, b) {
            return a * (b / Chalkboard.numb.gcd(a, b));
        },
        combination: function(n, r) {
            return Chalkboard.numb.factorial(n) / (Chalkboard.numb.factorial(n - r) * Chalkboard.numb.factorial(r));
        },
        permutation: function(n, r) {
            return Chalkboard.numb.factorial(n) / Chalkboard.numb.factorial(n - r);
        },
        prime: function(num) {
            for(var i = 2, n = Math.sqrt(num); i <= n; i++) {
                if(num % i === 0) {
                    return false;
                }
            }
            return num > 1;
        },
        primeArr: function(inf, sup) {
            var result = [];
            for(var i = inf; i <= sup; i++) {
                if(Chalkboard.numb.prime(i)) {
                    result.push(i);
                }
            }
            return result;
        },
        primeCount: function(inf, sup) {
            return Chalkboard.numb.primeArr(inf, sup).length;
        },
        compositeArr: function(inf, sup) {
            var result = [];
            for(var i = inf; i <= sup; i++) {
                if(!Chalkboard.numb.prime(i)) {
                    result.push(i);
                }
            }
            return result;
        },
        compositeCount: function(inf, sup) {
            return Chalkboard.numb.compositeArr(inf, sup).length;
        },
        sgn: function(num) {
            if(num < 0) {
                return -1;
            } else if(num === 0) {
                return 0;
            } else if(num > 0) {
                return 1;
            }
        },
        Kronecker: function(a, b) {
            if(a === b) {
                return 1;
            } else if(a !== b) {
                return 0;
            } else {
                return undefined;
            }
        },
        change: function(initial, final) {
            return (final - initial) / initial;
        },
        map: function(num, range1, range2) {
            return range2[0] + (range2[1] - range2[0]) * ((num - range1[0]) / (range1[1] - range1[0]));
        },
        Fibonacci: function(num) {
            if(num < 2) {
                return num;
            } else {
                return Chalkboard.numb.Fibonacci(num - 1) + Chalkboard.numb.Fibonacci(num - 2);
            }
        }
    },
    real: {
        function: function(definition, type) {
            type = type || "expl";
            if(type === "expl") {
                return {definition: definition, type: type};
            }  else if(type === "pola") {
                return {definition: definition, type: type};
            } else if(type === "para") {
                return {definition: [definition[0], definition[1]], type: type};
            } else {
                return "TypeError: Parameter \"type\" must be either \"expl\", \"pola\", or \"para\".";
            }
        },
        parse: function(str) {
            return Function('"use strict"; return (' + str + ')')();
        },
        val: function(func, val) {
            if(func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                return f(val);
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\".";
            }
        },
        pow: function(base, num) {
            return Math.exp(num * Math.log(base));
        },
        log: function(base, num) {
            return Chalkboard.real.ln(num) / Chalkboard.real.ln(base);
        },
        ln: function(num) {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / x"), 1, num);
        },
        log10: function(num) {
            return Chalkboard.real.log(10, num);
        },
        sqrt: function(num) {
            if(num >= 0) {
                return Math.exp(Math.log(num) / 2);
            } else if(num < 0) {
                return Chalkboard.comp.new(0, Math.exp(Math.log(Math.abs(num)) / 2));
            }
        },
        nrt: function(num, index) {
            return Math.exp(Math.log(num) / index);
        },
        tetration: function(base, num) {
            if(num === 0) {
                return 1;
            } else if(num > 0) {
                return Math.pow(base, Chalkboard.real.tetration(base, num - 1));
            } else {
                return undefined;
            }
        },
        Heaviside: function(num) {
            if(num >= 0) {
                return 1;
            } else if(num < 0) {
                return 0;
            }
        },
        Dirac: function(num) {
            if(num === 0) {
                return Infinity;
            } else if(num !== 0) {
                return 0;
            }
        },
        ramp: function(num) {
            if(num >= 0) {
                return num;
            } else if(num < 0) {
                return 0;
            }
        },
        rect: function(num, scl) {
            scl = scl || 2;
            if(num > scl / 2 || num < -scl / 2) {
                return 0;
            } else if(num <= scl / 2 || num >= -scl / 2) {
                return 1;
            }
        },
        slope: function(x1, y1, x2, y2) {
            return (y2 - y1) / (x2 - x1);
        },
        linear: function(x1, y1, x2, y2) {
            return Chalkboard.real.function(Chalkboard.real.slope(x1, y1, x2, y2).toString() + " * (x - " + x2.toString() + ") + " + y2.toString());
        },
        linearFormula: function(a, b, c, d) {
            if(c === undefined && d === undefined) {
                return -b / a;
            } else if(d === undefined) {
                return c / a;
            } else {
                return -b / Chalkboard.real.slope(a, b, c, d) + a;
            }
        },
        lerp: function(p, t) {
            return (p[1] - p[0]) * t + p[0];
        },
        quadratic: function(a, b, c, form) {
            form = form || "stan";
            if(form === "stan") {
                return Chalkboard.real.function(a.toString() + "* x * x + " + b.toString() + " * x +" + c.toString());
            } else if(form === "vert") {
                return Chalkboard.real.function(a.toString() + " * ((x - " + b.toString() + ") * (x - " + b.toString() + ")) +" + c.toString());
            } else {
                return "TypeError: Parameter \"form\" must be \"stan\" or \"vert\".";
            }
        },
        discriminant: function(a, b, c, form) {
            form = form || "stan";
            if(form === "stan") {
                return b * b - 4 * a * c;
            } else if(form === "vert") {
                return (2 * a * b) * (2 * a * b) - 4 * a * c;
            } else {
                return "TypeError: Parameter \"form\" must be \"stan\" or \"vert\".";
            }
        },
        quadraticFormula: function(a, b, c, form) {
            form = form || "stan";
            if(form === "stan") {
                return [(-b + Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a), (-b - Math.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a)];
            } else if(form === "vert") {
                return [b + Chalkboard.real.sqrt(-c / a), b - Chalkboard.real.sqrt(-c / a)];
            } else {
                return "TypeError: Parameter \"form\" must be \"stan\" or \"vert\".";
            }
        },
        qerp: function(p1, p2, p3, t) {
            var a = p1[1] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            var b = -p1[1] * (p2[0] + p3[0]) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) - p2[1] * (p1[0] + p3[0]) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) - p3[1] * (p1[0] + p2[0]) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            var c = p1[1] * p2[0] * p3[0] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] * p1[0] * p3[0] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] * p1[0] * p2[0] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            return a * t * t + b * t + c;
        }
    },
    comp: {
        new: function(a, b) {
            return {a: a, b: b};
        },
        Re: function(comp) {
            return comp.a;
        },
        Im: function(comp) {
            return comp.b;
        },
        random: function(inf, sup) {
            return Chalkboard.comp.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        Euler: function(x) {
            return Chalkboard.comp.new(Chalkboard.trig.cos(x), Chalkboard.trig.sin(x));
        },
        ln: function(comp) {
            return Chalkboard.comp.new(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Math.atan2(comp.b, comp.a));
        },
        mag: function(comp) {
            return Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b));
        },
        magsq: function(comp) {
            return (comp.a * comp.a) + (comp.b * comp.b);
        },
        magset: function(comp, num) {
            var normalized = Chalkboard.comp.normalize(comp);
            return Chalkboard.comp.new(normalized.a * num, normalized.b * num);
        },
        arg: function(comp) {
            return Chalkboard.trig.arctan(comp.b / comp.a);
        },
        slope: function(comp) {
            return comp.b / comp.a;
        },
        average: function(comp) {
            return (comp.a + comp.b) / 2;
        },
        normalize: function(comp) {
            return Chalkboard.comp.new(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
        },
        zero: function(comp) {
            return Chalkboard.comp.new(comp.a * 0, comp.b * 0);
        },
        negate: function(comp) {
            return Chalkboard.comp.new(-comp.a, -comp.b);
        },
        reciprocate: function(comp) {
            return Chalkboard.comp.new(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        },
        absolute: function(comp) {
            return Chalkboard.comp.new(Math.abs(comp.a), Math.abs(comp.b));
        },
        round: function(comp) {
            return Chalkboard.comp.new(Math.round(comp.a), Math.round(comp.b));
        },
        sq: function(comp) {
            return Chalkboard.comp.new((comp.a * comp.a) - (comp.b * comp.b), 2 * comp.a * comp.b);
        },
        sqrt: function(comp) {
            return Chalkboard.comp.new(Chalkboard.real.sqrt((comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2), Chalkboard.numb.sgn(comp.b) * Chalkboard.real.sqrt((-comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2));
        },
        rotate: function(comp, rad) {
            return Chalkboard.comp.new(Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad), Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad));
        },
        conjugate: function(comp) {
            return Chalkboard.comp.new(comp.a, -comp.b);
        },
        add: function(comp_1, comp_2) {
            return Chalkboard.comp.new(comp_1.a + comp_2.a, comp_1.b + comp_2.b);
        },
        sub: function(comp_1, comp_2) {
            return Chalkboard.comp.new(comp_1.a - comp_2.a, comp_1.b - comp_2.b);
        },
        mul: function(comp_1, comp_2) {
            return Chalkboard.comp.new((comp_1.a * comp_2.a) - (comp_1.b * comp_2.b), (comp_1.a * comp_2.b) + (comp_1.b * comp_2.a));
        },
        div: function(comp_1, comp_2) {
            return Chalkboard.comp.new(((comp_1.a * comp_2.a) - (comp_1.b * comp_2.b)) / Chalkboard.comp.magsq(comp_2), ((comp_1.a * comp_2.b) + (comp_1.b * comp_2.a)) / Chalkboard.comp.magsq(comp_2));
        },
        toVector: function(comp) {
            return Chalkboard.vec2.new(comp.a, comp.b);
        },
        toArray: function(comp) {
            return [comp.a, comp.b];
        },
        toString: function(comp) {
            if(comp.b >= 0) {
                return comp.a.toString() + " + " + comp.b.toString() + "i";
            } else if(comp.b < 0) {
                return comp.a.toString() + " - " + Math.abs(comp.b).toString() + "i";
            }
        },
        display: function(comp, scl, weight, origin, rgb) {
            scl = scl || 1;
            weight = weight || 5;
            origin = origin || [width / 2, height / 2];
            rgb = rgb || [0, 0, 0];
            scl /= 100;
            stroke(rgb[0], rgb[1], rgb[2]);
            strokeWeight(weight * 5);
            pushMatrix();
            translate(origin[0], origin[1]);
            point(comp.a / scl, -comp.b / scl);
            popMatrix();
            noStroke();
            noFill();
            return "Chalkboard.comp " + Chalkboard.comp.toString(comp) + " has been displayed at the point (" + (origin[0] + comp.a / scl) + ", " + (origin[1] - comp.b / scl) + ") with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        print: function(comp) {
            console.log(Chalkboard.comp.toString(comp));
        }
    },
    quat: {
        new: function(a, b, c, d) {
            return {a: a, b: b, c: c, d: d};
        },
        random: function(inf, sup) {
            return Chalkboard.quat.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        mag: function(quat) {
            return Chalkboard.real.sqrt((quat.a * quat.a) + (quat.b * quat.b) + (quat.c * quat.c) + (quat.d * quat.d));
        },
        magsq: function(quat) {
            return (quat.a * quat.a) + (quat.b * quat.b) + (quat.c * quat.c) + (quat.d * quat.d);
        },
        magset: function(quat, num) {
            var quat_normalized = Chalkboard.quat.normalize(quat);
            return Chalkboard.quat.new(quat_normalized.a * num, quat_normalized.b * num, quat_normalized.c * num, quat_normalized.d * num);
        },
        average: function(quat) {
            return (quat.a + quat.b + quat.c + quat.d) / 4;
        },
        normalize: function(quat) {
            return Chalkboard.quat.new(quat.a / Chalkboard.quat.mag(quat), quat.b / Chalkboard.quat.mag(quat), quat.c / Chalkboard.quat.mag(quat), quat.d / Chalkboard.quat.mag(quat));
        },
        zero: function(quat) {
            return Chalkboard.quat.new(quat.a * 0, quat.b * 0, quat.c * 0, quat.d * 0);
        },
        negate: function(quat) {
            return Chalkboard.quat.new(-quat.a, -quat.b, -quat.c, -quat.d);
        },
        reciprocate: function(quat) {
            return Chalkboard.quat.new(1 / quat.a, 1 / quat.b, 1 / quat.c, 1 / quat.d);
        },
        absolute: function(quat) {
            return Chalkboard.quat.new(Math.abs(quat.a), Math.abs(quat.b), Math.abs(quat.c), Math.abs(quat.d));
        },
        round: function(quat) {
            return Chalkboard.quat.new(Math.round(quat.a), Math.round(quat.b), Math.round(quat.c), Math.round(quat.d));
        },
        invert: function(quat) {
            return Chalkboard.quat.new(quat.a / Chalkboard.quat.magsq(quat), -quat.b / Chalkboard.quat.magsq(quat), -quat.c / Chalkboard.quat.magsq(quat), -quat.d / Chalkboard.quat.magsq(quat));
        },
        conjugate: function(quat) {
            return Chalkboard.quat.new(quat.a, -quat.b, -quat.c, -quat.d);
        },
        dist: function(quat_1, quat_2) {
            return Chalkboard.real.sqrt(((quat_2.a - quat_1.a) * (quat_2.a - quat_1.a)) + ((quat_2.b - quat_1.b) * (quat_2.b - quat_1.b)) + ((quat_2.c - quat_1.c) * (quat_2.c - quat_1.c)) + ((quat_2.d - quat_1.d) * (quat_2.d - quat_1.d)));
        },
        distsq: function(quat_1, quat_2) {
            return ((quat_2.a - quat_1.a) * (quat_2.a - quat_1.a)) + ((quat_2.b - quat_1.b) * (quat_2.b - quat_1.b)) + ((quat_2.c - quat_1.c) * (quat_2.c - quat_1.c)) + ((quat_2.d - quat_1.d) * (quat_2.d - quat_1.d));
        },
        add: function(quat_1, quat_2) {
            return Chalkboard.quat.new(quat_1.a + quat_2.a, quat_1.b + quat_2.b, quat_1.c + quat_2.c, quat_1.d + quat_2.d);
        },
        sub: function(quat_1, quat_2) {
            return Chalkboard.quat.new(quat_1.a - quat_2.a, quat_1.b - quat_2.b, quat_1.c - quat_2.c, quat_1.d - quat_2.d);
        },
        mul: function(quat_1, quat_2) {
            return Chalkboard.quat.new((quat_1.a * quat_2.a) - (quat_1.b * quat_2.b) - (quat_1.c * quat_2.c) - (quat_1.d * quat_2.d), (quat_1.a * quat_2.b) + (quat_1.b * quat_2.a) + (quat_1.c * quat_2.d) - (quat_1.d * quat_2.c), (quat_1.a * quat_2.c) - (quat_1.b * quat_2.d) + (quat_1.c * quat_2.a) + (quat_1.d * quat_2.b), (quat_1.a * quat_2.d) + (quat_1.b * quat_2.c) - (quat_1.c * quat_2.b) + (quat_1.d * quat_2.a));
        },
        fromAxis: function(vec3, rad) {
            return Chalkboard.quat.new(Chalkboard.trig.cos(rad / 2), vec3.x * Chalkboard.trig.sin(rad / 2), vec3.y * Chalkboard.trig.sin(rad / 2), vec3.z * Chalkboard.trig.sin(rad / 2));
        },
        fromVector: function(vec3) {
            return Chalkboard.quat.new(0, vec3.x, vec3.y, vec3.z);
        },
        toRotation: function(quat, vec3) {
            var vector = Chalkboard.quat.fromVector(vec3);
            var inverse = Chalkboard.quat.invert(quat);
            var quat_vector_inverse = Chalkboard.quat.mul(quat, Chalkboard.quat.mul(vector, inverse));
            return Chalkboard.vec3.new(quat_vector_inverse.b, quat_vector_inverse.c, quat_vector_inverse.d);
        },
        toVector: function(quat) {
            return Chalkboard.vec4.new(quat.a, quat.b, quat.c, quat.d);
        },
        toArray: function(quat) {
            return [quat.a, quat.b, quat.c, quat.d];
        },
        toString: function(quat) {
            var quat_b = "";
            var quat_c = "";
            var quat_d = "";
            if(quat.b >= 0) {
                quat_b = " + " + quat.b.toString() + "i ";
            } else if(quat.b < 0) {
                quat_b = " - " + Math.abs(quat.b.toString()) + "i ";
            }
            if(quat.c >= 0) {
                quat_c = "+ " + quat.c.toString() + "j ";
            } else if(quat.c < 0) {
                quat_c = "- " + Math.abs(quat.c.toString()) + "j ";
            }
            if(quat.d >= 0) {
                quat_d = "+ " + quat.d.toString() + "k ";
            } else if(quat.d < 0) {
                quat_d = "- " + Math.abs(quat.d.toString()) + "k ";
            }
            return quat.a.toString() + quat_b + quat_c + quat_d;
        },
        print: function(quat) {
            console.log(Chalkboard.quat.toString(quat));
        }
    },
    plot: {
        xyplane: function(scl, rgb, origin, weight) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            pushMatrix();
            translate(origin[0], origin[1]);
            stroke(rgb[0], rgb[1], rgb[2]);
            strokeWeight(weight / 4);
            for(var i = Math.floor(-origin[0] / scl); i <= (width - origin[0]) / scl; i++) {
                line(i / scl, -origin[1], i / scl, width - origin[1]);
            }
            for(var i = Math.floor(-origin[1] / scl); i <= (width - origin[1]) / scl; i++) {
                line(-origin[0], i / scl, width - origin[0], i / scl);
            }
            strokeWeight(weight);
            line(-origin[0], 0, width - origin[0], 0);
            line(0, -origin[1], 0, width - origin[1]);
            popMatrix();
        },
        rOplane: function(scl, rgb, origin, weight) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            pushMatrix();
            translate(origin[0], origin[1]);
            noFill();
            stroke(rgb[0], rgb[1], rgb[2]);
            strokeWeight(weight / 4);
            for(var i = 0; i <= scl * width / 2; i++) {
                ellipse(0, 0, 2 * i / scl, 2 * i / scl);
            }
            strokeWeight(weight);
            line(-origin[0], 0, width - origin[0], 0);
            line(0, -origin[1], 0, width - origin[1]);
            popMatrix();
        },
        function: function(func, scl, rgb, domain, origin, weight) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            domain = domain || [-10, 10];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            var f;
            var r;
            var x;
            var y;
            if(func.type === "expl") {
                f = Chalkboard.real.parse("x => " + func.definition);
            } else if(func.type === "pola") {
                r = Chalkboard.real.parse("O => " + func.definition);
            } else if(func.type === "para") {
                x = Chalkboard.real.parse("t => " + func.definition[0]);
                y = Chalkboard.real.parse("t => " + func.definition[1]);
            } else {
                return "TypeError: Property \"type\" of parameter \"func\" must be either \"expl\", \"pola\", or \"para\".";
            }
            pushMatrix();
            translate(origin[0], origin[1]);
            noFill();
            strokeWeight(weight);
            stroke(rgb[0], rgb[1], rgb[2]);
            beginShape();
            if(func.type === "expl") {
                for(var i = domain[0] / scl; i <= domain[1] / scl; i++) {
                    vertex(i, -f(i * scl) / scl);
                }
            } else if(func.type === "pola") {
                for(var i = domain[0] / scl; i < domain[1] / scl; i++) {
                    vertex(r(i * scl) / scl * Chalkboard.trig.cos(i * scl), -r(i * scl) / scl * Chalkboard.trig.sin(i * scl));
                }
            } else if(func.type === "para") {
                for(var i = domain[0] / scl; i < domain[1] / scl; i++) {
                    vertex(x(i * scl) / scl, -y(i * scl) / scl);
                }
            } else {
                return "TypeError: Property \"type\" of parameter \"func\" must be either \"expl\", \"pola\", or \"para\".";
            }
            endShape();
            popMatrix();
            return "The function " + func.definition + " has been plotted at the point (" + origin[0] + ", " + origin[1] + ") for x ∈ [" + domain[0] + ", " + domain[1] + "] with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        dfdx: function(func, scl, rgb, domain, origin, weight, res) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            domain = domain || [-10, 10];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            res = res || 25;
            pushMatrix();
            translate(origin[0], origin[1]);
            noFill();
            strokeWeight(weight);
            stroke(rgb[0], rgb[1], rgb[2]);
            beginShape();
            for(var i = domain[0] / scl; i <= domain[1] / scl; i += res) {
                vertex(i, -Chalkboard.calc.dfdx(func, i * scl) / scl);
            }
            endShape();
            popMatrix();
            return "The derivative of the function " + func.definition + " has been plotted at the point (" + origin[0] + ", " + origin[1] + ") for x ∈ [" + domain[0] + ", " + domain[1] + "] with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        fxdx: function(func, scl, rgb, domain, origin, weight, res) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            domain = domain || [-10, 10];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            res = res || 25;
            pushMatrix();
            translate(origin[0], origin[1]);
            noFill();
            strokeWeight(weight);
            stroke(rgb[0], rgb[1], rgb[2]);
            beginShape();
            for(var i = domain[0] / scl; i <= domain[1] / scl; i += res) {
                vertex(i, -Chalkboard.calc.fxdx(func, 0, i * scl) / scl);
            }
            endShape();
            popMatrix();
            return "The antiderivative of the function " + func.definition + " has been plotted at the point (" + origin[0] + ", " + origin[1] + ") for x ∈ [" + domain[0] + ", " + domain[1] + "] with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        convolution: function(func_1, func_2, scl, rgb, domain, origin, weight, res) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            domain = domain || [-10, 10];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            res = res || 25;
            pushMatrix();
            translate(origin[0], origin[1]);
            noFill();
            strokeWeight(weight);
            stroke(rgb[0], rgb[1], rgb[2]);
            beginShape();
            for(var i = domain[0] / scl; i <= domain[1] / scl; i += res) {
                vertex(i, -Chalkboard.calc.convolution(func_1, func_2, i * scl) / scl);
            }
            endShape();
            popMatrix();
            return "The convolution of the functions " + func_1.definition + " and " + func_2.definition + " has been plotted at the point (" + origin[0] + ", " + origin[1] + ") for x ∈ [" + domain[0] + ", " + domain[1] + "] with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        Laplace: function(func, scl, rgb, domain, origin, weight, res) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            domain = domain || [-10, 10];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            res = res || 25;
            pushMatrix();
            translate(origin[0], origin[1]);
            noFill();
            strokeWeight(weight);
            stroke(rgb[0], rgb[1], rgb[2]);
            beginShape();
            if(domain[0] >= 0) {
                for(var i = domain[0] / scl; i <= domain[1] / scl; i += res) {
                    vertex(i, -Chalkboard.calc.Laplace(func, i * scl) / scl);
                }
            } else {
                for(var i = 0; i <= domain[1] / scl; i += res) {
                    vertex(i, -Chalkboard.calc.Laplace(func, i * scl) / scl);
                }
            }
            endShape();
            popMatrix();
            return "The Laplace transform of the function " + func.definition + " has been plotted at the point (" + origin[0] + ", " + origin[1] + ") for x ∈ [" + domain[0] + ", " + domain[1] + "] with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        Fourier: function(func, scl, rgb, domain, origin, weight, res) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            domain = domain || [-10, 10];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            res = res || 25;
            pushMatrix();
            translate(origin[0], origin[1]);
            noFill();
            strokeWeight(weight);
            stroke(rgb[0], rgb[1], rgb[2]);
            beginShape();
            for(var i = domain[0] / scl; i <= domain[1] / scl; i += res) {
                vertex(i, -Chalkboard.calc.Fourier(func, i * scl) / scl);
            }
            endShape();
            popMatrix();
            return "The Fourier transform of the function " + func.definition + " has been plotted at the point (" + origin[0] + ", " + origin[1] + ") for x ∈ [" + domain[0] + ", " + domain[1] + "] with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        }
    },
    geom: {
        EulerCharacteristic: function(v, e, f) {
            return v - e + f;
        },
        Pythagorean: function(a, b, type) {
            type = type || "hyp";
            if(type === "hyp") {
                return Math.sqrt((a * a) + (b * b));
            } else if(type === "leg") {
                return Math.sqrt((b * b) - (a * a));
            } else {
                return undefined;
            }
        },
        PythagoreanTriple: function(inf, sup) {
            var a = 2 * Math.round(Chalkboard.numb.random(inf, sup)) - 1,
                b = ((a * a) / 2) - 0.5,
                c = ((a * a) / 2) + 0.5;
            return a + ", " + b + ", " + c;
        },
        dist2D: function(p1, p2) {
            return Math.sqrt(((p2[0] - p1[0]) * (p2[0] - p1[0])) + ((p2[1] - p1[1]) * (p2[1] - p1[1])));
        },
        dist3D: function(p1, p2) {
            return Math.sqrt(((p2[0] - p1[0]) * (p2[0] - p1[0])) + ((p2[1] - p1[1]) * (p2[1] - p1[1])) + ((p2[2] - p1[2]) * (p2[2] - p1[2])));
        },
        circleP: function(r) {
            return 2 * Chalkboard.PI() * r;
        },
        circleA: function(r) {
            return Chalkboard.PI() * r * r;
        },
        sectorP: function(r, rad) {
            return r * rad;
        },
        sectorA: function(r, rad) {
            return (r * r * rad) / 2;
        },
        ellipseP: function(a, b) {
            var h = ((a - b) * (a - b)) / ((a + b) * (a + b));
            return Chalkboard.PI() * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        },
        ellipseA: function(a, b) {
            return Chalkboard.PI() * a * b;
        },
        squareP: function(s) {
            return 4 * s;
        },
        squareA: function(s) {
            return s * s;
        },
        parallelogramP: function(l, w) {
            return 2 * (l + w);
        },
        parallelogramA: function(l, w) {
            return l * w;
        },
        triangleP: function(a, b, c) {
            return a + b + c;
        },
        triangleA: function(b, h) {
            return (b * h) / 2;
        },
        trianglesidesA: function(a, b, c) {
            var s = (a + b + c) / 2;
            return Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c)));
        },
        trapezoidP: function(a, b, c, d) {
            return a + b + c + d;
        },
        trapezoidA: function(b1, b2, h) {
            return ((b1 + b2) / 2) * h;
        },
        polygonP: function(n, s) {
            return n * s;
        },
        polygonA: function(n, s, a) {
            return (n * s * a) / 2;
        },
        sphereA: function(r) {
            return 4 * Chalkboard.PI() * r * r;
        },
        sphereV: function(r) {
            return (4 * Chalkboard.PI() * r * r * r) / 3;
        },
        cylinderA: function(r, h) {
            return 2 * Chalkboard.PI() * r * r + 2 * Math.PI * r * h;
        },
        cylinderV: function(r, h) {
            return Chalkboard.PI() * r * r * h;
        },
        coneA: function(r, h) {
            return Chalkboard.PI() * r * (r + Math.sqrt(h * h + r * r));
        },
        coneV: function(r, h) {
            return (Chalkboard.PI() * r * r * h) / 3;
        },
        cubeA: function(s) {
            return 6 * s * s;
        },
        cubeV: function(s) {
            return s * s * s;
        },
        rectangularprismA: function(l, w, h) {
            return 2 * (l * h + l * h + w * h);
        },
        rectangularprismV: function(l, w, h) {
            return l * w * h;
        },
        triangularprismA: function(a, b, c, h) {
            var s = (a + b + c) / 2;
            return 2 * Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c))) + h * (a + b + c);
        },
        triangularprismV: function(a, b, c, h) {
            return h * (Chalkboard.real.sqrt(-(a * a * a * a) + 2 * (a * b) * (a * b) + 2 * (a * c) * (a * c) - (b * b * b * b) + 2 * (b * c) * (b * c) - (c * c * c * c))) / 4;
        },
        line3D: function(x1, y1, z1, x2, y2, z2) {
            line(x1 / (z1 * 0.0025 + 1), y1 / (z1 * 0.0025 + 1), x2 / (z2 * 0.0025 + 1), y2 / (z2 * 0.0025 + 1));
        }
    },
    trig: {
        toRad: function(deg) {
            return deg * (Chalkboard.PI() / 180);
        },
        toDeg: function(rad) {
            return rad * (180 / Chalkboard.PI());
        },
        coterminal: function(rad) {
            return rad % (2 * Chalkboard.PI());
        },
        sin: function(rad) {
            rad = Chalkboard.trig.coterminal(rad);
            return ((rad) - (Math.pow(rad, 3) / Chalkboard.numb.factorial(3)) + (Math.pow(rad, 5) / Chalkboard.numb.factorial(5)) - (Math.pow(rad, 7) / Chalkboard.numb.factorial(7)) + (Math.pow(rad, 9) / Chalkboard.numb.factorial(9)) - (Math.pow(rad, 11) / Chalkboard.numb.factorial(11)) + (Math.pow(rad, 13) / Chalkboard.numb.factorial(13)) - (Math.pow(rad, 15) / Chalkboard.numb.factorial(15)) + (Math.pow(rad, 17) / Chalkboard.numb.factorial(17)) - (Math.pow(rad, 19) / Chalkboard.numb.factorial(19)) + (Math.pow(rad, 21) / Chalkboard.numb.factorial(21)) - (Math.pow(rad, 23) / Chalkboard.numb.factorial(23)) + (Math.pow(rad, 25) / Chalkboard.numb.factorial(25)) - (Math.pow(rad, 27) / Chalkboard.numb.factorial(27)) + (Math.pow(rad, 29) / Chalkboard.numb.factorial(29)));
        },
        cos: function(rad) {
            rad = Chalkboard.trig.coterminal(rad);
            return ((1) - (Math.pow(rad, 2) / Chalkboard.numb.factorial(2)) + (Math.pow(rad, 4) / Chalkboard.numb.factorial(4)) - (Math.pow(rad, 6) / Chalkboard.numb.factorial(6)) + (Math.pow(rad, 8) / Chalkboard.numb.factorial(8)) - (Math.pow(rad, 10) / Chalkboard.numb.factorial(10)) + (Math.pow(rad, 12) / Chalkboard.numb.factorial(12)) - (Math.pow(rad, 14) / Chalkboard.numb.factorial(14)) + (Math.pow(rad, 16) / Chalkboard.numb.factorial(16)) - (Math.pow(rad, 18) / Chalkboard.numb.factorial(18)) + (Math.pow(rad, 20) / Chalkboard.numb.factorial(20)) - (Math.pow(rad, 22) / Chalkboard.numb.factorial(22)) + (Math.pow(rad, 24) / Chalkboard.numb.factorial(24)) - (Math.pow(rad, 26) / Chalkboard.numb.factorial(26)) + (Math.pow(rad, 28) / Chalkboard.numb.factorial(28)));
        },
        tan: function(rad) {
            return Chalkboard.trig.sin(rad) / Chalkboard.trig.cos(rad);
        },
        csc: function(rad) {
            return 1 / Chalkboard.trig.sin(rad);
        },
        sec: function(rad) {
            return 1 / Chalkboard.trig.cos(rad);
        },
        cot: function(rad) {
            return 1 / Chalkboard.trig.tan(rad);
        },
        sinh: function(rad) {
            return (Math.pow(Chalkboard.E(), rad) - Math.pow(Chalkboard.E(), -rad)) / 2;
        },
        cosh: function(rad) {
            return (Math.pow(Chalkboard.E(), rad) + Math.pow(Chalkboard.E(), -rad)) / 2;
        },
        tanh: function(rad) {
            return Chalkboard.trig.sinh(rad) / Chalkboard.trig.cosh(rad);
        },
        csch: function(rad) {
            return 1 / Chalkboard.trig.sinh(rad);
        },
        sech: function(rad) {
            return 1 / Chalkboard.trig.cosh(rad);
        },
        coth: function(rad) {
            return 1 / Chalkboard.trig.tanh(rad);
        },
        arcsin: function(rad) {
            if(rad > -1 && rad < 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (Math.sqrt(1 - x * x))"), 0, rad);
            } else if(rad === 1) {
                return Chalkboard.PI() / 2;
            } else if(rad === -1) {
                return -Chalkboard.PI() / 2;
            } else {
                return undefined;
            }
        },
        arccos: function(rad) {
            if(rad > -1 && rad < 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (Math.sqrt(1 - x * x))"), rad, 1);
            } else if(rad === 1) {
                return 0;
            } else if(rad === -1) {
                return Chalkboard.PI();
            } else {
                return undefined;
            }
        },
        arctan: function(rad) {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (1 + x * x)"), 0, rad);
        },
        arccsc: function(rad) {
            if(rad > 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (x * Math.sqrt(x * x - 1))"), rad, 1000);
            } else if(rad === 1) {
                return Chalkboard.PI() / 2;
            } else if(rad === -1) {
                return -Chalkboard.PI() / 2;
            } else if(rad < 1) {
                return -Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (x * Math.sqrt(x * x - 1))"), Math.abs(rad), 1000);
            } else {
                return undefined;
            }
        },
        arcsec: function(rad) {
            if(rad > 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (x * Math.sqrt(x * x - 1))"), 1.000001, rad);
            } else if(rad === 1) {
                return 0;
            } else if(rad === -1) {
                return Chalkboard.PI();
            } else {
                return undefined;
            }
        },
        arccot: function(rad) {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (1 + x * x)"), rad, 1000);
        },
        arcsinh: function(rad) {
            return Math.log(rad + Math.sqrt(rad * rad + 1));
        },
        arccosh: function(rad) {
            if(rad >= 1) {
                return Math.log(rad + Math.sqrt(rad * rad - 1));
            } else {
                return undefined;
            }
        },
        arctanh: function(rad) {
            if(rad > -1 && rad < 1) {
                return (Math.log((1 + rad) / (1 - rad))) / 2;
            } else {
                return undefined;
            }
        },
        arccsch: function(rad) {
            if(rad !== 0) {
                return Math.log((1 / rad) + Math.sqrt((1 / (rad * rad)) + 1));
            } else {
                return undefined;
            }
        },
        arcsech: function(rad) {
            if(rad > 0 && rad <= 1) {
                return Math.log((1 / rad) + Math.sqrt((1 / (rad * rad)) - 1));
            } else {
                return undefined;
            }
        },
        arccoth: function(rad) {
            if(rad < -1 || rad > 1) {
                return (Math.log((rad + 1) / (rad - 1))) / 2;
            } else {
                return undefined;
            }
        }
    },
    stat: {
        array: function(inf, sup, length) {
            length = length || sup - inf + 1;
            var result = [];
            var step = (sup - inf) / (length - 1);
            for(var i = 0; i < length; i++) {
                result.push(inf + (step * i));
            }
            return result;
        },
        max: function(arr) {
            var max = arr[0];
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        },
        min: function(arr) {
            var min = arr[0];
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] < min) {
                    min = arr[i];
                }
            }
            return min;
        },
        range: function(arr) {
            return Chalkboard.stat.max(arr) - Chalkboard.stat.min(arr);
        },
        mean: function(arr) {
            var result = 0;
            for(var i = 0; i < arr.length; i++) {
                result += arr[i];
            }
            return result / arr.length;
        },
        median: function(arr) {
            var temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            if(temp.length % 2 === 1) {
                return temp[Math.floor(temp.length / 2)];
            } else {
                return (temp[temp.length / 2] + temp[(temp.length / 2) - 1]) / 2;
            }
        },
        mode: function(arr) {
            var temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            var bestStr = 1;
            var currStr = 1;
            var bestElm = temp[0];
            var currElm = temp[0];
            for(var i = 1; i < temp.length; i++) {
                if(temp[i - 1] !== temp[i]) {
                    if(currStr > bestStr) {
                        bestStr = currStr;
                        bestElm = currElm;
                    }
                    currStr = 0;
                    currElm = temp[i];
                }
                currStr++;
            }
            if(currStr > bestStr) {
                return currElm;
            } else {
                return bestElm;
            }
        },
        deviation: function(arr) {
            var result = 0;
            for(var i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return Chalkboard.real.sqrt(result / arr.length);
        },
        variance: function(arr) {
            var result = 0;
            for(var i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        },
        mad: function(arr) {
            var result = 0;
            for(var i = 0; i < arr.length; i++) {
                result += Math.abs(arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        },
        error: function(arr) {
            return Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length);
        },
        confidenceInterval: function(arr) {
            return [Chalkboard.stat.mean(arr) - 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length)), Chalkboard.stat.mean(arr) + 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length))];
        },
        change: function(initialArr, finalArr) {
            var result = [];
            if(initialArr.length === finalArr.length) {
                for(var i = 0; i < initialArr.length; i++) {
                    result.push(Chalkboard.numb.change(initialArr[i], finalArr[i]));
                }
                return result;
            } else {
                return undefined;
            }
        },
        percentile: function(arr, num) {
            var result = 0;
            for(var i = 0; i < arr.length; i++) {
                if(num >= arr[i]) {
                    result++;
                }
            }
            return (result / arr.length) * 100;
        },
        convolution: function(arr1, arr2) {
            var result = [];
            for(var i = 0; i < arr1.length + arr2.length - 1; i++) {
                var sum = 0;
                for(var j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[i - j];
                }
                result.push(sum);
            }
            return result;
        },
        correlation: function(arr1, arr2) {
            var result = [];
            for(let i = 0; i < arr1.length + arr2.length - 1; i++) {
                var sum = 0;
                for(let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[arr2.length - 1 - i + j];
                }
                result.push(sum);
            }
            return result;
        },
        autocorrelation: function(arr) {
            return Chalkboard.stat.correlation(arr, arr);
        },
        chiSquared: function(observedArr, expectedArr) {
            var result = [];
            if(observedArr.length === expectedArr.length) {
                for(var i = 0; i < observedArr.length; i++) {
                    result.push(((observedArr[i] - expectedArr[i]) * (observedArr[i] - expectedArr[i])) / expectedArr[i]);
                }
                return result;
            } else {
                return undefined;
            }
        },
        Gaussian: function(height, position, deviation) {
            return Chalkboard.real.function(height.toString() + " * Math.exp(-((x - " + position.toString() + ") * (x - " + position.toString() + ")) / (2 * " + deviation.toString() + " * " + deviation.toString() + "))");
        }
    },
    vec2: {
        new: function(x, y) {
            if(y === undefined) {
                return {x: x, y: x, type: "vec2"};
            } else {
                return {x: x, y: y, type: "vec2"};
            }
        },
        random: function(inf, sup) {
            return Chalkboard.vec2.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        mag: function(vec2) {
            return Chalkboard.real.sqrt((vec2.x * vec2.x) + (vec2.y * vec2.y));
        },
        magsq: function(vec2) {
            return (vec2.x * vec2.x) + (vec2.y * vec2.y);
        },
        magset: function(vec2, num) {
            var vec2_normalized = Chalkboard.vec2.normalize(vec2);
            return Chalkboard.vec3.new(vec2_normalized.x * num, vec2_normalized.y * num, vec2_normalized.z * num);
        },
        ang: function(vec2) {
            return Chalkboard.trig.arctan(vec2.y / vec2.x);
        },
        slope: function(vec2) {
            return vec2.y / vec2.x;
        },
        azimuth: function(vec2) {
            return Chalkboard.trig.arctan(vec2.x / vec2.y);
        },
        average: function(vec2) {
            return (vec2.x + vec2.y) / 2;
        },
        normalize: function(vec2) {
            return Chalkboard.vec2.new(vec2.x / Chalkboard.vec2.mag(vec2), vec2.y / Chalkboard.vec2.mag(vec2));
        },
        zero: function(vec2) {
            return Chalkboard.vec2.new(vec2.x * 0, vec2.y * 0);
        },
        negate: function(vec2) {
            return Chalkboard.vec2.new(-vec2.x, -vec2.y);
        },
        reciprocate: function(vec2) {
            return Chalkboard.vec2.new(1 / vec2.x, 1 / vec2.y);
        },
        absolute: function(vec2) {
            return Chalkboard.vec2.new(Math.abs(vec2.x), Math.abs(vec2.y));
        },
        round: function(vec2) {
            return Chalkboard.vec2.new(Math.round(vec2.x), Math.round(vec2.y));
        },
        dist: function(vec2_1, vec2_2) {
            return Chalkboard.real.sqrt(((vec2_2.x - vec2_1.x) * (vec2_2.x - vec2_1.x)) + ((vec2_2.y - vec2_1.y) * (vec2_2.y - vec2_1.y)));
        },
        distsq: function(vec2_1, vec2_2) {
            return ((vec2_2.x - vec2_1.x) * (vec2_2.x - vec2_1.x)) + ((vec2_2.y - vec2_1.y) * (vec2_2.y - vec2_1.y));
        },
        angBtwn: function(vec2_1, vec2_2) {
            return Math.acos((Chalkboard.vec2.dot(vec2_1, vec2_2)) / (Chalkboard.vec2.mag(vec2_1) * Chalkboard.vec2.mag(vec2_2)));
        },
        rotate2D: function(vec2, rad) {
            return Chalkboard.vec2.new(vec2.x * Chalkboard.trig.cos(rad) - vec2.y * Chalkboard.trig.sin(rad), vec2.y * Chalkboard.trig.cos(rad) + vec2.x * Chalkboard.trig.sin(rad));
        },
        addScl: function(vec2, num) {
            return Chalkboard.vec2.new(vec2.x + num, vec2.y + num);
        },
        mulScl: function(vec2, num) {
            return Chalkboard.vec2.new(vec2.x * num, vec2.y * num);
        },
        add: function(vec2_1, vec2_2) {
            return Chalkboard.vec2.new(vec2_1.x + vec2_2.x, vec2_1.y + vec2_2.y);
        },
        sub: function(vec2_1, vec2_2) {
            return Chalkboard.vec2.new(vec2_1.x - vec2_2.x, vec2_1.y - vec2_2.y);
        },
        mid: function(vec2_1, vec2_2) {
            return Chalkboard.vec2.new((vec2_1.x + vec2_2.x) / 2, (vec2_1.y + vec2_2.y) / 2);
        },
        dot: function(vec2_1, vec2_2) {
            return (vec2_1.x * vec2_2.x) + (vec2_1.y * vec2_2.y);
        },
        cross: function(vec2_1, vec2_2) {
            return Chalkboard.vec3.new(0, 0, (vec2_1.x * vec2_2.y) - (vec2_1.y * vec2_2.x));
        },
        fromNumber: function(num) {
            return Chalkboard.vec2.new(num, 0);
        },
        fromAngle: function(rad) {
            return Chalkboard.vec2.new(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        },
        toMatrix: function(vec2, type) {
            type = type || "col";
            if(type === "col") {
                return Chalkboard.matr.new([vec2.x], [vec2.y]);
            } else if(type === "row") {
                return Chalkboard.matr.new([vec2.x, vec2.y]);
            } else {
                return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
            }
        },
        toComplex: function(vec2) {
            return Chalkboard.comp.new(vec2.x, vec2.y);
        },
        toArray: function(vec2) {
            return [vec2.x, vec2.y];
        },
        toString: function(vec2) {
            return "(" + vec2.x.toString() + ", " + vec2.y.toString() + ")";
        },
        display: function(vec2, scl, rgb, origin, weight) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            origin = origin || [width / 2, height / 2];
            weight = weight || 5;
            stroke(rgb[0], rgb[1], rgb[2]);
            strokeWeight(weight);
            pushMatrix();
            translate(origin[0], origin[1]);
            line(0, 0, vec2.x / scl, -vec2.y / scl);
            popMatrix();
            return "Chalkboard.vec2 " + Chalkboard.vec2.toString(vec2) + "has been displayed at the point (" + (origin[0] + vec2.x / scl) + ", " + (origin[1] - vec2.y / scl) + ") with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        print: function(vec2) {
            console.log(Chalkboard.vec2.toString(vec2));
        }
    },
    vec3: {
        new: function(x, y, z) {
            if(y === undefined && z === undefined) {
                return {x: x, y: x, z: x, type: "vec3"};
            } else {
                return {x: x, y: y, z: z, type: "vec3"};
            }
        },
        random: function(inf, sup) {
            return Chalkboard.vec3.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        mag: function(vec3) {
            return Chalkboard.real.sqrt((vec3.x * vec3.x) + (vec3.y * vec3.y) + (vec3.z * vec3.z));
        },
        magsq: function(vec3) {
            return (vec3.x * vec3.x) + (vec3.y * vec3.y) + (vec3.z * vec3.z);
        },
        magset: function(vec3, num) {
            var vec3_normalized = Chalkboard.vec3.normalize(vec3);
            return Chalkboard.vec2.new(vec3_normalized.x * num, vec3_normalized.y * num);
        },
        ang: function(vec3) {
            return [Chalkboard.vec3.angcos(vec3).alpha, Chalkboard.vec3.angcos(vec3).beta, Chalkboard.vec3.angcos(vec3).gamma];
        },
        angcos: function(vec3) {
            return {alpha: Math.acos(vec3.x / Chalkboard.vec3.mag(vec3)), beta: Math.acos(vec3.y / Chalkboard.vec3.mag(vec3)), gamma: Math.acos(vec3.z / Chalkboard.vec3.mag(vec3))};
        },
        slope: function(vec3) {
            return vec3.z / Chalkboard.real.sqrt((vec3.x * vec3.x) + (vec3.y * vec3.y));
        },
        azimuth: function(vec3) {
            return Chalkboard.trig.arctan(vec3.x / vec3.y);
        },
        average: function(vec3) {
            return (vec3.x + vec3.y + vec3.z) / 3;
        },
        normalize: function(vec3) {
            return Chalkboard.vec3.new(vec3.x / Chalkboard.vec3.mag(vec3), vec3.y / Chalkboard.vec3.mag(vec3), vec3.z / Chalkboard.vec3.mag(vec3));
        },
        zero: function(vec3) {
            return Chalkboard.vec3.new(vec3.x * 0, vec3.y * 0, vec3.z * 0);
        },
        negate: function(vec3) {
            return Chalkboard.vec3.new(-vec3.x, -vec3.y, -vec3.z);
        },
        reciprocate: function(vec3) {
            return Chalkboard.vec3.new(1 / vec3.x, 1 / vec3.y, 1 / vec3.z);
        },
        absolute: function(vec3) {
            return Chalkboard.vec3.new(Math.abs(vec3.x), Math.abs(vec3.y), Math.abs(vec3.z));
        },
        round: function(vec3) {
            return Chalkboard.vec3.new(Math.round(vec3.x), Math.round(vec3.y), Math.round(vec3.z));
        },
        dist: function(vec3_1, vec3_2) {
            return Chalkboard.real.sqrt(((vec3_2.x - vec3_1.x) * (vec3_2.x - vec3_1.x)) + ((vec3_2.y - vec3_1.y) * (vec3_2.y - vec3_1.y)) + ((vec3_2.z - vec3_1.z) * (vec3_2.z - vec3_1.z)));
        },
        distsq: function(vec3_1, vec3_2) {
            return ((vec3_2.x - vec3_1.x) * (vec3_2.x - vec3_1.x)) + ((vec3_2.y - vec3_1.y) * (vec3_2.y - vec3_1.y)) + ((vec3_2.z - vec3_1.z) * (vec3_2.z - vec3_1.z));
        },
        angBtwn: function(vec3_1, vec3_2) {
            return Math.acos((Chalkboard.vec3.dot(vec3_1, vec3_2)) / (Chalkboard.vec3.mag(vec3_1) * Chalkboard.vec3.mag(vec3_2)));
        },
        rotatex: function(vec3, rad) {
            return Chalkboard.vec3.new(vec3.x, vec3.y * Chalkboard.trig.cos(rad) - vec3.z * Chalkboard.trig.sin(rad), vec3.z * Chalkboard.trig.cos(rad) + vec3.y * Chalkboard.trig.sin(rad));
        },
        rotatey: function(vec3, rad) {
            return Chalkboard.vec3.new(vec3.x * Chalkboard.trig.cos(rad) - vec3.y * Chalkboard.trig.sin(rad), vec3.y, vec3.z * Chalkboard.trig.cos(rad) + vec3.x * Chalkboard.trig.sin(rad));
        },
        rotatez: function(vec3, rad) {
            return Chalkboard.vec3.new(vec3.x * Chalkboard.trig.cos(rad) - vec3.y * Chalkboard.trig.sin(rad), vec3.y * Chalkboard.trig.cos(rad) + vec3.x * Chalkboard.trig.sin(rad), vec3.z);
        },
        addScl: function(vec3, num) {
            return Chalkboard.vec3.new(vec3.x + num, vec3.y + num, vec3.z + num);
        },
        mulScl: function(vec3, num) {
            return Chalkboard.vec3.new(vec3.x * num, vec3.y * num, vec3.z * num);
        },
        add: function(vec3_1, vec3_2) {
            return Chalkboard.vec3.new(vec3_1.x + vec3_2.x, vec3_1.y + vec3_2.y, vec3_1.z + vec3_2.z);
        },
        sub: function(vec3_1, vec3_2) {
            return Chalkboard.vec3.new(vec3_1.x - vec3_2.x, vec3_1.y - vec3_2.y, vec3_1.z - vec3_2.z);
        },
        mid: function(vec3_1, vec3_2) {
            return Chalkboard.vec3.new((vec3_1.x + vec3_2.x) / 2, (vec3_1.y + vec3_2.y) / 2, (vec3_1.z + vec3_2.z) / 2);
        },
        dot: function(vec3_1, vec3_2) {
            return (vec3_1.x * vec3_2.x) + (vec3_1.y * vec3_2.y) + (vec3_1.z * vec3_2.z);
        },
        cross: function(vec3_1, vec3_2) {
            return Chalkboard.vec3.new((vec3_1.y * vec3_2.z) - (vec3_1.z * vec3_2.y), (vec3_1.z * vec3_2.x) - (vec3_1.x * vec3_2.z), (vec3_1.x * vec3_2.y) - (vec3_1.y * vec3_2.x));
        },
        scalarTriple: function(vec3_1, vec3_2, vec3_3) {
            return Chalkboard.vec3.dot(vec3_1, Chalkboard.vec3.cross(vec3_2, vec3_3));
        },
        vectorTriple: function(vec3_1, vec3_2, vec3_3) {
            return Chalkboard.vec3.cross(vec3_1, Chalkboard.vec3.cross(vec3_2, vec3_3));
        },
        fromAngles: function(rad1, rad2) {
            return Chalkboard.vec3.new(Chalkboard.trig.cos(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad2));
        },
        fromVector: function(vec2) {
            return Chalkboard.vec3.new(vec2.x, vec2.y, 0);
        },
        toMatrix: function(vec3, type) {
            type = type || "col";
            if(type === "col") {
                return Chalkboard.matr.new([vec3.x], [vec3.y], [vec3.z]);
            } else if(type === "row") {
                return Chalkboard.matr.new([vec3.x, vec3.y, vec3.z]);
            } else {
                return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
            }
        },
        toArray: function(vec3) {
            return [vec3.x, vec3.y, vec3.z];
        },
        toString: function(vec3) {
            return "(" + vec3.x.toString() + ", " + vec3.y.toString() + ", " + vec3.z.toString() + ")";
        },
        display: function(vec3, scl, rgb, origin, weight) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            origin = origin || [width / 2, height / 2];
            weight = weight || 5;
            stroke(rgb[0], rgb[1], rgb[2]);
            strokeWeight(weight);
            pushMatrix();
            translate(origin[0], origin[1]);
            line(0, 0, (vec3.x / scl) / (vec3.z * 0.25 + 1), (-vec3.y / scl) / (vec3.z * 0.25 + 1));
            popMatrix();
            return "Chalkboard.vec3 " + Chalkboard.vec3.toString(vec3) + "has been displayed at the point (" + (origin[0] + vec3.x / scl) + ", " + (origin[1] - vec3.y / scl) + ") with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        print: function(vec3) {
            console.log(Chalkboard.vec3.toString(vec3));
        }
    },
    vec4: {
        new: function(x, y, z, w) {
            if(y === undefined && z === undefined && w === undefined) {
                return {x: x, y: x, z: x, w: x, type: "vec4"};
            } else {
                return {x: x, y: y, z: z, w: w, type: "vec4"};
            }
        },
        random: function(inf, sup) {
            return Chalkboard.vec4.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        mag: function(vec4) {
            return Chalkboard.real.sqrt((vec4.x * vec4.x) + (vec4.y * vec4.y) + (vec4.z * vec4.z) + (vec4.w * vec4.w));
        },
        magsq: function(vec4) {
            return (vec4.x * vec4.x) + (vec4.y * vec4.y) + (vec4.z * vec4.z) + (vec4.w * vec4.w);
        },
        magset: function(vec4, num) {
            var vec4_normalized = Chalkboard.vec4.normalize(vec4);
            return Chalkboard.vec4.new(vec4_normalized.x * num, vec4_normalized.y * num, vec4_normalized.z * num, vec4_normalized.w * num);
        },
        ang: function(vec4) {
            return [Chalkboard.vec4.angcos(vec4).alpha, Chalkboard.vec4.angcos(vec4).beta, Chalkboard.vec4.angcos(vec4).gamma, Chalkboard.vec4.angcos(vec4).delta];
        },
        angcos: function(vec4) {
            return {alpha: Math.acos(vec4.x / Chalkboard.vec4.mag(vec4)), beta: Math.acos(vec4.y / Chalkboard.vec4.mag(vec4)), gamma: Math.acos(vec4.z / Chalkboard.vec4.mag(vec4)), delta: Math.acos(vec4.w / Chalkboard.vec4.mag(vec4))};
        },
        slope: function(vec4) {
            return vec4.w / Chalkboard.real.sqrt((vec4.x * vec4.x) + (vec4.y * vec4.y) + (vec4.z * vec4.z));
        },
        average: function(vec4) {
            return (vec4.x + vec4.y + vec4.z + vec4.w) / 4;
        },
        normalize: function(vec4) {
            return Chalkboard.vec4.new(vec4.x / Chalkboard.vec4.mag(vec4), vec4.y / Chalkboard.vec4.mag(vec4), vec4.z / Chalkboard.vec4.mag(vec4), vec4.w / Chalkboard.vec4.mag(vec4));
        },
        zero: function(vec4) {
            return Chalkboard.vec4.new(vec4.x * 0, vec4.y * 0, vec4.z * 0, vec4.w * 0);
        },
        negate: function(vec4) {
            return Chalkboard.vec4.new(-vec4.x, -vec4.y, -vec4.z, -vec4.w);
        },
        reciprocate: function(vec4) {
            return Chalkboard.vec4.new(1 / vec4.x, 1 / vec4.y, 1 / vec4.z, 1 / vec4.w);
        },
        absolute: function(vec4) {
            return Chalkboard.vec4.new(Math.abs(vec4.x), Math.abs(vec4.y), Math.abs(vec4.z), Math.abs(vec4.w));
        },
        round: function(vec4) {
            return Chalkboard.vec4.new(Math.round(vec4.x), Math.round(vec4.y), Math.round(vec4.z), Math.round(vec4.w));
        },
        dist: function(vec4_1, vec4_2) {
            return Chalkboard.real.sqrt(((vec4_2.x - vec4_1.x) * (vec4_2.x - vec4_1.x)) + ((vec4_2.y - vec4_1.y) * (vec4_2.y - vec4_1.y)) + ((vec4_2.z - vec4_1.z) * (vec4_2.z - vec4_1.z)) + ((vec4_2.w - vec4_1.w) * (vec4_2.w - vec4_1.w)));
        },
        distsq: function(vec4_1, vec4_2) {
            return ((vec4_2.x - vec4_1.x) * (vec4_2.x - vec4_1.x)) + ((vec4_2.y - vec4_1.y) * (vec4_2.y - vec4_1.y)) + ((vec4_2.z - vec4_1.z) * (vec4_2.z - vec4_1.z)) + ((vec4_2.w - vec4_1.w) * (vec4_2.w - vec4_1.w));
        },
        angBtwn: function(vec4_1, vec4_2) {
            return Math.acos((Chalkboard.vec4.dot(vec4_1, vec4_2)) / (Chalkboard.vec4.mag(vec4_1) * Chalkboard.vec4.mag(vec4_2)));
        },
        addScl: function(vec4, num) {
            return Chalkboard.vec4.new(vec4.x + num, vec4.y + num, vec4.z + num, vec4.w + num);
        },
        mulScl: function(vec4, num) {
            return Chalkboard.vec4.new(vec4.x * num, vec4.y * num, vec4.z * num, vec4.w * num);
        },
        add: function(vec4_1, vec4_2) {
            return Chalkboard.vec4.new(vec4_1.x + vec4_2.x, vec4_1.y + vec4_2.y, vec4_1.z + vec4_2.z, vec4_1.w + vec4_2.w);
        },
        sub: function(vec4_1, vec4_2) {
            return Chalkboard.vec4.new(vec4_1.x - vec4_2.x, vec4_1.y - vec4_2.y, vec4_1.z - vec4_2.z, vec4_1.w - vec4_2.w);
        },
        mid: function(vec4_1, vec4_2) {
            return Chalkboard.vec4.new((vec4_1.x + vec4_2.x) / 2, (vec4_1.y + vec4_2.y) / 2, (vec4_1.z + vec4_2.z) / 2, (vec4_1.w + vec4_2.w) / 2);
        },
        dot: function(vec4_1, vec4_2) {
            return (vec4_1.x * vec4_2.x) + (vec4_1.y * vec4_2.y) + (vec4_1.z * vec4_2.z) + (vec4_1.w * vec4_2.w);
        },
        fromVector: function(vec3) {
            return Chalkboard.vec4.new(vec3.x, vec3.y, vec3.z, 0);
        },
        toMatrix: function(vec4, type) {
            type = type || "col";
            if(type === "col") {
                return Chalkboard.matr.new([vec4.x], [vec4.y], [vec4.z], [vec4.w]);
            } else if(type === "row") {
                return Chalkboard.matr.new([vec4.x, vec4.y, vec4.z, vec4.w]);
            } else {
                return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
            }
        },
        toQuaternion: function(vec4) {
            return Chalkboard.quat.new(vec4.x, vec4.y, vec4.z, vec4.w);
        },
        toArray: function(vec4) {
            return [vec4.x, vec4.y, vec4.z, vec4.w];
        },
        toString: function(vec4) {
            return "(" + vec4.x.toString() + ", " + vec4.y.toString() + ", " + vec4.z.toString() + ", " + vec4.w.toString() + ")";
        },
        print: function(vec4) {
            console.log(Chalkboard.vec4.toString(vec4));
        }
    },
    matr: {
        new: function(matrix) {
            matrix = Array.from(arguments);
            for(var i = 0; i < matrix.length; i++) {
                for(var j = 0; j < matrix[i].length; j++) {
                    if(Number.isNaN(matrix[i][j])) {
                        matrix[i].splice(matrix[i].indexOf(matrix[i][j]), 1);
                    }
                }
            }
            return matrix;
        },
        rows: function(matr) {
            return matr.length;
        },
        cols: function(matr) {
            if(Chalkboard.matr.rows(matr) === 1) {
                return matr[0].length;
            } else if(Chalkboard.matr.rows(matr) === 2) {
                if(matr[0].length === matr[1].length) {
                    return matr[0].length;
                } else {
                    return undefined;
                }
            } else if(Chalkboard.matr.rows(matr) === 3) {
                if(matr[0].length === matr[1].length && matr[1].length === matr[2].length) {
                    return matr[0].length;
                } else {
                    return undefined;
                }
            } else if(Chalkboard.matr.rows(matr) === 4) {
                if(matr[0].length === matr[1].length && matr[1].length === matr[2].length && matr[2].length === matr[3].length) {
                    return matr[0].length;
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        },
        dimension: function(matr) {
            return [Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)];
        },
        empty: function(dimension) {
            if(dimension === 1) {
                return Chalkboard.matr.new([]);
            } else if(dimension === 2) {
                return Chalkboard.matr.new([], []);
            } else if(dimension === 3) {
                return Chalkboard.matr.new([], [], []);
            } else if(dimension === 4) {
                return Chalkboard.matr.new([], [], [], []);
            } else {
                return undefined;
            }
        },
        identity: function(dimension) {
            if(dimension === 1) {
                return Chalkboard.matr.new([1]);
            } else if(dimension === 2) {
                return Chalkboard.matr.new([1, 0], [0, 1]);
            } else if(dimension === 3) {
                return Chalkboard.matr.new([1, 0, 0], [0, 1, 0], [0, 0, 1]);
            } else if(dimension === 4) {
                return Chalkboard.matr.new([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]);
            } else {
                return undefined;
            }
        },
        random: function(dimension, inf, sup) {
            if(dimension === 1) {
                return Chalkboard.matr.new([Chalkboard.numb.random(inf, sup)]);
            } else if(dimension === 2) {
                return Chalkboard.matr.new([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else if(dimension === 3) {
                return Chalkboard.matr.new([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else if(dimension === 4) {
                return Chalkboard.matr.new([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            } else {
                return undefined;
            }
        },
        det: function(matr) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if(Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if(Chalkboard.matr.rows(matr) === 2) {
                    return (matr[0][0] * matr[1][1]) - (matr[0][1] * matr[1][0]);
                } else if(Chalkboard.matr.rows(matr) === 3) {
                    return (matr[0][0] * matr[1][1] * matr[2][2]) + (matr[0][1] * matr[1][2] * matr[2][0]) + (matr[0][2] * matr[1][0] * matr[2][1]) - (matr[0][2] * matr[1][1] * matr[2][0]) - (matr[0][1] * matr[1][0] * matr[2][2]) - (matr[0][0] * matr[1][2] * matr[2][1]);
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        },
        transpose: function(matr) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if(Chalkboard.matr.rows(matr) === 1) {
                    return Chalkboard.matr.new([matr[0][0]]);
                } else if(Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.new([matr[0][0], matr[1][0]], [matr[0][1], matr[1][1]]);
                } else if(Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.new([matr[0][0], matr[1][0], matr[2][0]], [matr[0][1], matr[1][1], matr[2][0]], [matr[0][2], matr[1][2], matr[2][2]]);
                } else if(Chalkboard.matr.rows(matr) === 4) {
                    return Chalkboard.matr.new([matr[0][0], matr[1][0], matr[2][0], matr[3][0]], [matr[0][1], matr[1][1], matr[2][1], matr[3][1]], [matr[0][2], matr[1][2], matr[2][2], matr[3][2]], [matr[0][3], matr[1][3], matr[2][3], matr[3][3]]);
                }
            } else {
                return undefined;
            }
        },
        invert: function(matr) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if(Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.new([(1 / Chalkboard.matr.det(matr)) * matr[1][1], (1 / Chalkboard.matr.det(matr)) * -matr[0][1]], [(1 / Chalkboard.matr.det(matr)) * -matr[1][0], (1 / Chalkboard.matr.det(matr)) * matr[0][0]]);
                } else if(Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.new([(1 / Chalkboard.matr.det(matr)) * ((matr[1][1] * matr[2][2]) - (matr[1][2] * matr[2][1])), (1 / Chalkboard.matr.det(matr)) * -((matr[0][1] * matr[2][2]) - (matr[0][2] * matr[2][1])), (1 / Chalkboard.matr.det(matr)) * ((matr[0][1] * matr[1][2]) - (matr[0][2] * matr[1][1]))], [(1 / Chalkboard.matr.det(matr)) * -((matr[1][0] * matr[2][2]) - (matr[1][2] * matr[2][0])), (1 / Chalkboard.matr.det(matr)) * ((matr[0][0] * matr[2][2]) - (matr[0][2] * matr[2][0])), (1 / Chalkboard.matr.det(matr)) * -((matr[0][0] * matr[1][2]) - (matr[0][2] * matr[1][0]))], [(1 / Chalkboard.matr.det(matr)) * ((matr[1][0] * matr[2][1]) - (matr[1][1] * matr[2][0])), (1 / Chalkboard.matr.det(matr)) * -((matr[0][0] * matr[2][1]) - (matr[0][1] * matr[2][0])), (1 / Chalkboard.matr.det(matr)) * ((matr[0][0] * matr[1][1]) - (matr[0][1] * matr[1][0]))]);
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        },
        zero: function(matr) {
            if(Chalkboard.matr.rows(matr) === 1) {
                return Chalkboard.matr.new([0 * matr[0][0], 0 * matr[0][1], 0 * matr[0][2], 0 * matr[0][3]]);
            } else if(Chalkboard.matr.rows(matr) === 2) {
                return Chalkboard.matr.new([0 * matr[0][0], 0 * matr[0][1], 0 * matr[0][2], 0 * matr[0][3]], [0 * matr[1][0], 0 * matr[1][1], 0 * matr[1][2], 0 * matr[1][3]]);
            } else if(Chalkboard.matr.rows(matr) === 3) {
                return Chalkboard.matr.new([0 * matr[0][0], 0 * matr[0][1], 0 * matr[0][2], 0 * matr[0][3]], [0 * matr[1][0], 0 * matr[1][1], 0 * matr[1][2], 0 * matr[1][3]], [0 * matr[2][0], 0 * matr[2][1], 0 * matr[2][2], 0 * matr[2][3]]);
            } else if(Chalkboard.matr.rows(matr) === 4) {
                return Chalkboard.matr.new([0 * matr[0][0], 0 * matr[0][1], 0 * matr[0][2], 0 * matr[0][3]], [0 * matr[1][0], 0 * matr[1][1], 0 * matr[1][2], 0 * matr[1][3]], [0 * matr[2][0], 0 * matr[2][1], 0 * matr[2][2], 0 * matr[2][3]], [0 * matr[3][0], 0 * matr[3][1], 0 * matr[3][2], 0 * matr[3][3]]);
            } else {
                return undefined;
            }
        },
        negate: function(matr) {
            if(Chalkboard.matr.rows(matr) === 1) {
                return Chalkboard.matr.new([-matr[0][0], -matr[0][1], -matr[0][2], -matr[0][3]]);
            } else if(Chalkboard.matr.rows(matr) === 2) {
                return Chalkboard.matr.new([-matr[0][0], -matr[0][1], -matr[0][2], -matr[0][3]], [-matr[1][0], -matr[1][1], -matr[1][2], -matr[1][3]]);
            } else if(Chalkboard.matr.rows(matr) === 3) {
                return Chalkboard.matr.new([-matr[0][0], -matr[0][1], -matr[0][2], -matr[0][3]], [-matr[1][0], -matr[1][1], -matr[1][2], -matr[1][3]], [-matr[2][0], -matr[2][1], -matr[2][2], -matr[2][3]]);
            } else if(Chalkboard.matr.rows(matr) === 4) {
                return Chalkboard.matr.new([-matr[0][0], -matr[0][1], -matr[0][2], -matr[0][3]], [-matr[1][0], -matr[1][1], -matr[1][2], -matr[1][3]], [-matr[2][0], -matr[2][1], -matr[2][2], -matr[2][3]], [-matr[3][0], -matr[3][1], -matr[3][2], -matr[3][3]]);
            } else {
                return undefined;
            }
        },
        reciprocate: function(matr) {
            if(Chalkboard.matr.rows(matr) === 1) {
                return Chalkboard.matr.new([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2], 1 / matr[0][3]]);
            } else if(Chalkboard.matr.rows(matr) === 2) {
                return Chalkboard.matr.new([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2], 1 / matr[0][3]], [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2], 1 / matr[1][3]]);
            } else if(Chalkboard.matr.rows(matr) === 3) {
                return Chalkboard.matr.new([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2], 1 / matr[0][3]], [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2], 1 / matr[1][3]], [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2], 1 / matr[2][3]]);
            } else if(Chalkboard.matr.rows(matr) === 4) {
                return Chalkboard.matr.new([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2], 1 / matr[0][3]], [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2], 1 / matr[1][3]], [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2], 1 / matr[2][3]], [1 / matr[3][0], 1 / matr[3][1], 1 / matr[3][2], 1 / matr[3][3]]);
            } else {
                return undefined;
            }
        },
        absolute: function(matr) {
            if(Chalkboard.matr.rows(matr) === 1) {
                return Chalkboard.matr.new([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2]), Math.abs(matr[0][3])]);
            } else if(Chalkboard.matr.rows(matr) === 2) {
                return Chalkboard.matr.new([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2]), Math.abs(matr[0][3])], [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2]), Math.abs(matr[1][3])]);
            } else if(Chalkboard.matr.rows(matr) === 3) {
                return Chalkboard.matr.new([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2]), Math.abs(matr[0][3])], [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2]), Math.abs(matr[1][3])], [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2]), Math.abs(matr[2][3])]);
            } else if(Chalkboard.matr.rows(matr) === 4) {
                return Chalkboard.matr.new([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2]), Math.abs(matr[0][3])], [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2]), Math.abs(matr[1][3])], [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2]), Math.abs(matr[2][3])], [Math.abs(matr[3][0]), Math.abs(matr[3][1]), Math.abs(matr[3][2]), Math.abs(matr[3][3])]);
            } else {
                return undefined;
            }
        },
        round: function(matr) {
            if(Chalkboard.matr.rows(matr) === 1) {
                return Chalkboard.matr.new([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2]), Math.round(matr[0][3])]);
            } else if(Chalkboard.matr.rows(matr) === 2) {
                return Chalkboard.matr.new([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2]), Math.round(matr[0][3])], [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2]), Math.round(matr[1][3])]);
            } else if(Chalkboard.matr.rows(matr) === 3) {
                return Chalkboard.matr.new([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2]), Math.round(matr[0][3])], [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2]), Math.round(matr[1][3])], [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2]), Math.round(matr[2][3])]);
            } else if(Chalkboard.matr.rows(matr) === 4) {
                return Chalkboard.matr.new([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2]), Math.round(matr[0][3])], [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2]), Math.round(matr[1][3])], [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2]), Math.round(matr[2][3])], [Math.round(matr[3][0]), Math.round(matr[3][1]), Math.round(matr[3][2]), Math.round(matr[3][3])]);
            } else {
                return undefined;
            }
        },
        scaler: function(vec) {
            if(vec.type === "vec2") {
                return Chalkboard.matr.new([vec.x, 0], [0, vec.y]);
            } else if(vec.type === "vec3") {
                return Chalkboard.matr.new([vec.x, 0, 0], [0, vec.y, 0], [0, 0, vec.z]);
            } else if(vec.type === "vec4") {
                return Chalkboard.matr.new([vec.x, 0, 0, 0], [0, vec.y, 0, 0], [0, 0, vec.z, 0], [0, 0, 0, vec.w]);
            }
        },
        translater: function(vec) {
            if(vec.type === "vec2") {
                return Chalkboard.matr.new([1, 0, vec.x], [0, 1, vec.y], [0, 0, 1]);
            } else if(vec.type === "vec3") {
                return Chalkboard.matr.new([1, 0, 0, vec.x], [0, 1, 0, vec.y], [0, 0, 1, vec.z], [0, 0, 0, 1]);
            } else if(vec.type === "vec4") {
                return undefined;
            }
        },
        rotater2D: function(rad) {
            return Chalkboard.matr.new([Chalkboard.trig.cos(rad), -Chalkboard.trig.sin(rad)], [Chalkboard.trig.sin(rad), Chalkboard.trig.cos(rad)]);
        },
        rotater3D: function(radx, rady, radz) {
            var matr_x = Chalkboard.matr.new([1, 0, 0], [0, Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [0, Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]);
            var matr_y = Chalkboard.matr.new([Chalkboard.trig.cos(rady), 0, Chalkboard.trig.sin(rady)], [0, 1, 0], [-Chalkboard.trig.sin(rady), 0, Chalkboard.trig.cos(rady)]);
            var matr_z = Chalkboard.matr.new([Chalkboard.trig.cos(radz), -Chalkboard.trig.sin(radz), 0], [Chalkboard.trig.sin(radz), Chalkboard.trig.cos(radz), 0], [0, 0, 1]);
            return Chalkboard.matr.mul(matr_x, Chalkboard.matr.mul(matr_y, matr_z));
        },
        add: function(matr_1, matr_2) {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                if(Chalkboard.matr.rows(matr_1) === 1) {
                    return Chalkboard.matr.new([matr_1[0][0] + matr_2[0][0], matr_1[0][1] + matr_2[0][1], matr_1[0][2] + matr_2[0][2], matr_1[0][3] + matr_2[0][3]]);
                } else if(Chalkboard.matr.rows(matr_1) === 2) {
                    return Chalkboard.matr.new([matr_1[0][0] + matr_2[0][0], matr_1[0][1] + matr_2[0][1], matr_1[0][2] + matr_2[0][2], matr_1[0][3] + matr_2[0][3]], [matr_1[1][0] + matr_2[1][0], matr_1[1][1] + matr_2[1][1], matr_1[1][2] + matr_2[1][2], matr_1[1][3] + matr_2[1][3]]);
                } else if(Chalkboard.matr.rows(matr_1) === 3) {
                    return Chalkboard.matr.new([matr_1[0][0] + matr_2[0][0], matr_1[0][1] + matr_2[0][1], matr_1[0][2] + matr_2[0][2], matr_1[0][3] + matr_2[0][3]], [matr_1[1][0] + matr_2[1][0], matr_1[1][1] + matr_2[1][1], matr_1[1][2] + matr_2[1][2], matr_1[1][3] + matr_2[1][3]], [matr_1[2][0] + matr_2[2][0], matr_1[2][1] + matr_2[2][1], matr_1[2][2] + matr_2[2][2], matr_1[2][3] + matr_2[2][3]]);
                } else if(Chalkboard.matr.rows(matr_1) === 4) {
                    return Chalkboard.matr.new([matr_1[0][0] + matr_2[0][0], matr_1[0][1] + matr_2[0][1], matr_1[0][2] + matr_2[0][2], matr_1[0][3] + matr_2[0][3]], [matr_1[1][0] + matr_2[1][0], matr_1[1][1] + matr_2[1][1], matr_1[1][2] + matr_2[1][2], matr_1[1][3] + matr_2[1][3]], [matr_1[2][0] + matr_2[2][0], matr_1[2][1] + matr_2[2][1], matr_1[2][2] + matr_2[2][2], matr_1[2][3] + matr_2[2][3]], [matr_1[3][0] + matr_2[3][0], matr_1[3][1] + matr_2[3][1], matr_1[3][2] + matr_2[3][2], matr_1[3][3] + matr_2[3][3]]);
                }
            } else {
                return undefined;
            }
        },
        sub: function(matr_1, matr_2) {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                if(Chalkboard.matr.rows(matr_1) === 1) {
                    return Chalkboard.matr.new([matr_1[0][0] - matr_2[0][0], matr_1[0][1] - matr_2[0][1], matr_1[0][2] - matr_2[0][2], matr_1[0][3] - matr_2[0][3]]);
                } else if(Chalkboard.matr.rows(matr_1) === 2) {
                    return Chalkboard.matr.new([matr_1[0][0] - matr_2[0][0], matr_1[0][1] - matr_2[0][1], matr_1[0][2] - matr_2[0][2], matr_1[0][3] - matr_2[0][3]], [matr_1[1][0] - matr_2[1][0], matr_1[1][1] - matr_2[1][1], matr_1[1][2] - matr_2[1][2], matr_1[1][3] - matr_2[1][3]]);
                } else if(Chalkboard.matr.rows(matr_1) === 3) {
                    return Chalkboard.matr.new([matr_1[0][0] - matr_2[0][0], matr_1[0][1] - matr_2[0][1], matr_1[0][2] - matr_2[0][2], matr_1[0][3] - matr_2[0][3]], [matr_1[1][0] - matr_2[1][0], matr_1[1][1] - matr_2[1][1], matr_1[1][2] - matr_2[1][2], matr_1[1][3] - matr_2[1][3]], [matr_1[2][0] - matr_2[2][0], matr_1[2][1] - matr_2[2][1], matr_1[2][2] - matr_2[2][2], matr_1[2][3] - matr_2[2][3]]);
                } else if(Chalkboard.matr.rows(matr_1) === 4) {
                    return Chalkboard.matr.new([matr_1[0][0] - matr_2[0][0], matr_1[0][1] - matr_2[0][1], matr_1[0][2] - matr_2[0][2], matr_1[0][3] - matr_2[0][3]], [matr_1[1][0] - matr_2[1][0], matr_1[1][1] - matr_2[1][1], matr_1[1][2] - matr_2[1][2], matr_1[1][3] - matr_2[1][3]], [matr_1[2][0] - matr_2[2][0], matr_1[2][1] - matr_2[2][1], matr_1[2][2] - matr_2[2][2], matr_1[2][3] - matr_2[2][3]], [matr_1[3][0] - matr_2[3][0], matr_1[3][1] - matr_2[3][1], matr_1[3][2] - matr_2[3][2], matr_1[3][3] - matr_2[3][3]]);
                }
            } else {
                return undefined;
            }
        },
        mul: function(matr_1, matr_2) {
            if(Chalkboard.matr.cols(matr_1) === Chalkboard.matr.rows(matr_2)) {
                var row1 = [];
                var row2 = [];
                var row3 = [];
                var row4 = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr_2); j++) {
                    var result1 = 0;
                    var result2 = 0;
                    var result3 = 0;
                    var result4 = 0;
                    for(var n = 0; n < Chalkboard.matr.cols(matr_1); n++) {
                        if(Chalkboard.matr.rows(matr_1) === 1) {
                            result1 += matr_1[0][n] * matr_2[n][j];
                        } else if(Chalkboard.matr.rows(matr_1) === 2) {
                            result1 += matr_1[0][n] * matr_2[n][j];
                            result2 += matr_1[1][n] * matr_2[n][j];
                        } else if(Chalkboard.matr.rows(matr_1) === 3) {
                            result1 += matr_1[0][n] * matr_2[n][j];
                            result2 += matr_1[1][n] * matr_2[n][j];
                            result3 += matr_1[2][n] * matr_2[n][j];
                        } else if(Chalkboard.matr.rows(matr_1) === 4) {
                            result1 += matr_1[0][n] * matr_2[n][j];
                            result2 += matr_1[1][n] * matr_2[n][j];
                            result3 += matr_1[2][n] * matr_2[n][j];
                            result4 += matr_1[3][n] * matr_2[n][j];
                        }
                    }
                    row1.push(result1);
                    row2.push(result2);
                    row3.push(result3);
                    row4.push(result4);
                }
                if(Chalkboard.matr.rows(matr_1) === 1) {
                    return Chalkboard.matr.new(row1);
                } else if(Chalkboard.matr.rows(matr_1) === 2) {
                    return Chalkboard.matr.new(row1, row2);
                } else if(Chalkboard.matr.rows(matr_1) === 3) {
                    return Chalkboard.matr.new(row1, row2, row3);
                } else if(Chalkboard.matr.rows(matr_1) === 4) {
                    return Chalkboard.matr.new(row1, row2, row3, row4);
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        },
        mulScl: function(matr, num) {
            if(Chalkboard.matr.rows(matr) === 1) {
                return Chalkboard.matr.new([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num, matr[0][3] * num]);
            } else if(Chalkboard.matr.rows(matr) === 2) {
                return Chalkboard.matr.new([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num, matr[0][3] * num], [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num, matr[1][3] * num]);
            } else if(Chalkboard.matr.rows(matr) === 3) {
                return Chalkboard.matr.new([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num, matr[0][3] * num], [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num, matr[1][3] * num], [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num, matr[2][3] * num]);
            } else if(Chalkboard.matr.rows(matr) === 4) {
                return Chalkboard.matr.new([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num, matr[0][3] * num], [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num, matr[1][3] * num], [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num, matr[2][3] * num], [matr[3][0] * num, matr[3][1] * num, matr[3][2] * num, matr[3][3] * num]);
            } else {
                return undefined;
            }
        },
        toVector: function(matr, vec, type) {
            type = type || "col";
            if(vec === "vec2") {
                if(type === "col") {
                    return Chalkboard.vec2.new(matr[0][0], matr[1][0]);
                } else if(type === "row") {
                    return Chalkboard.vec2.new(matr[0][0], matr[0][1]);
                } else {
                    return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
                }
            } else if(vec === "vec3") {
                if(type === "col") {
                    return Chalkboard.vec3.new(matr[0][0], matr[1][0], matr[2][0]);
                } else if(type === "row") {
                    return Chalkboard.vec3.new(matr[0][0], matr[0][1], matr[0][2]);
                } else {
                    return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
                }
            } else if(vec === "vec4") {
                if(type === "col") {
                    return Chalkboard.vec4.new(matr[0][0], matr[1][0], matr[2][0], matr[3][0]);
                } else if(type === "row") {
                    return Chalkboard.vec4.new(matr[0][0], matr[0][1], matr[0][2], matr[0][3]);
                } else {
                    return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
                }
            } else {
                return "TypeError: Parameter \"vec\" should be \"vec2\", \"vec3\", or \"vec4\".";
            }
        },
        toArray: function(matr) {
            var result = [];
            if(Chalkboard.matr.rows(matr) === 1) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[0][i]);
                }
                return result;
            } else if(Chalkboard.matr.rows(matr) === 2) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[0][i]);
                }
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[1][i]);
                }
                return result;
            } else if(Chalkboard.matr.rows(matr) === 3) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[0][i]);
                }
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[1][i]);
                }
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[2][i]);
                }
                return result;
            } else if(Chalkboard.matr.rows(matr) === 4) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[0][i]);
                }
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[1][i]);
                }
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[2][i]);
                }
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result.push(matr[3][i]);
                }
                return result;
            } else {
                return undefined;
            }
        },
        toString: function(matr) {
            var row1 = [];
            var row2 = [];
            var row3 = [];
            var row4 = [];
            if(Chalkboard.matr.rows(matr) === 1) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    row1.push(matr[0][i]);
                }
                row1 = row1.join(" ");
                return "[ " + row1 + " ]";
            } else if(Chalkboard.matr.rows(matr) === 2) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    row1.push(matr[0][i]);
                    row2.push(matr[1][i]);
                }
                row1 = row1.join(" ");
                row2 = row2.join(" ");
                return "[ " + row1 + " ]\n[ " + row2 + " ]";
            } else if(Chalkboard.matr.rows(matr) === 3) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    row1.push(matr[0][i]);
                    row2.push(matr[1][i]);
                    row3.push(matr[2][i]);
                }
                row1 = row1.join(" ");
                row2 = row2.join(" ");
                row3 = row3.join(" ");
                return "[ " + row1 + " ]\n[ " + row2 + " ]\n[ " + row3 + " ]";
            } else if(Chalkboard.matr.rows(matr) === 4) {
                for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    row1.push(matr[0][i]);
                    row2.push(matr[1][i]);
                    row3.push(matr[2][i]);
                    row4.push(matr[3][i]);
                }
                row1 = row1.join(" ");
                row2 = row2.join(" ");
                row3 = row3.join(" ");
                row4 = row4.join(" ");
                return "[ " + row1 + " ]\n[ " + row2 + " ]\n[ " + row3 + " ]\n[ " + row4 + " ]";
            } else {
                return undefined;
            }
        },
        display: function(matr, scl, rgb, origin, weight) {
            scl = scl || 1;
            scl /= 100;
            rgb = rgb || [0, 0, 0];
            origin = origin || [width / 2, height / 2];
            weight = weight || 2;
            var displayposx = Chalkboard.vec2.new(matr[0][0], matr[1][0]);
            var displaynegx = Chalkboard.vec2.new(-matr[0][0], -matr[1][0]);
            var displayposy = Chalkboard.vec2.new(matr[0][1], matr[1][1]);
            var displaynegy = Chalkboard.vec2.new(-matr[0][1], -matr[1][1]);
            for(var i = -10; i <= 10; i++) {
                Chalkboard.vec2.display(displayposx, scl, rgb, [origin[0], origin[1] + (i / scl) * matr[1][1]], weight / 4);
                Chalkboard.vec2.display(displaynegx, scl, rgb, [origin[0], origin[1] + (i / scl) * matr[1][1]], weight / 4);
                Chalkboard.vec2.display(displayposy, scl, rgb, [origin[0] + (i / scl) * matr[0][0], origin[1]], weight / 4);
                Chalkboard.vec2.display(displaynegy, scl, rgb, [origin[0] + (i / scl) * matr[0][0], origin[1]], weight / 4);
            }
            var displayposaxisx = Chalkboard.vec2.new(matr[0][0], matr[1][0]);
            var displaynegaxisx = Chalkboard.vec2.new(-matr[0][0], -matr[1][0]);
            var displayposaxisy = Chalkboard.vec2.new(matr[0][1], matr[1][1]);
            var displaynegaxisy = Chalkboard.vec2.new(-matr[0][1], -matr[1][1]);
            Chalkboard.vec2.display(displayposaxisx, scl, rgb, origin, weight);
            Chalkboard.vec2.display(displaynegaxisx, scl, rgb, origin, weight);
            Chalkboard.vec2.display(displayposaxisy, scl, rgb, origin, weight);
            Chalkboard.vec2.display(displaynegaxisy, scl, rgb, origin, weight);
            return "Chalkboard.matr has been displayed with its origin at the point (" + origin[0] + ", " + origin[1] + ") with the RGB color (" + rgb[0] + ", " + rgb[1] + ", " + rgb[2] + ").";
        },
        print: function(matr) {
            console.log(Chalkboard.matr.toString(matr));
        }
    },
    calc: {
        lim: function(func, val) {
            if(func.type === "expl") {
                if(val === Infinity) {
                    if(Chalkboard.real.val(func, 101) > Chalkboard.real.val(func, 100)) {
                        return Infinity;
                    } else if(Chalkboard.real.val(func, 101) < Chalkboard.real.val(func, 100)) {
                        return -Infinity;
                    }
                } else if(val === -Infinity) {
                    if(Chalkboard.real.val(func, -101) > Chalkboard.real.val(func, -100)) {
                        return Infinity;
                    } else if(Chalkboard.real.val(func, -101) < Chalkboard.real.val(func, -100)) {
                        return -Infinity;
                    }
                } else {
                    if(Chalkboard.real.val(func, val - 0.000001).toFixed(4) === Chalkboard.real.val(func, val + 0.000001).toFixed(4)) {
                        if(Chalkboard.real.val(func, val) !== Infinity || Chalkboard.real.val(func, val) !== -Infinity) {
                            return Chalkboard.real.val(func, val);
                        } else {
                            return undefined;
                        }
                    } else {
                        return undefined;
                    }
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\".";
            }
        },
        dfdx: function(func, val) {
            if(func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                var h = 0.000000001;
                return (f(val + h) - f(val)) / h;
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\".";
            }
        },
        fxdx: function(func, a, b) {
            if(func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                var step = (b - a) / 1000000;
                var riemann = (f(a) + f(b)) / 2;
                for(var i = 0; i < 1000000; i++) {
                    riemann += f(a + step * i);
                }
                return riemann * step;
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\".";
            }
        },
        rOdO: function(func, a, b) {
            if(func.type === "pola") {
                return Chalkboard.calc.fxdx(Chalkboard.real.function(("((" + func.definition + ") * (" + func.definition + ")) / 2").replace(/O/g, "x")), a, b);
            } else {
                return "TypeError: Parameter \"func\" must be of type \"pola\".";
            }
        },
        extrema: function(func, domain) {
            var result = [];
            for(var i = domain[0]; i <= domain[1]; i++) {
                if(Math.round(Chalkboard.calc.dfdx(func, i)) === 0) {
                    result.push(i);
                }
            }
            return result;
        },
        average: function(func, a, b) {
            return (Chalkboard.calc.fxdx(func, a, b)) / (b - a);
        },
        convolution: function(func_1, func_2, val) {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func_1.definition + ") * (" + func_2.definition.replace(/x/g, "(" + val + " - x)") + ")"), -100, 100);
        },
        Laplace: function(func, val) {
            if(val > 0) {
                return Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func.definition + ") * Math.exp(-" + val + " * x)"), 0, 10);
            } else {
                return undefined;
            }
        },
        Fourier: function(func, val) {
            return (2 * Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func.definition + ") * Math.cos(" + val + " * x)"), 0, 10)) / Chalkboard.PI();
        },
        Newton: function(func, domain) {
            domain = domain || [-1, 1];
            var x = Chalkboard.numb.random(domain[0], domain[1]);
            for(var i = 0; i < 10; i++) {
                x = x - Chalkboard.real.val(func, x) / Chalkboard.calc.dfdx(func, x);
            }
            return x;
        }
    }
};