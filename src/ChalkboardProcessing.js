/*
    The Chalkboard Library
    Version 1.6.0 released 12/25/2023
    Authored by Zushah ===> https://www.github.com/Zushah
    Available under the MIT License ===> https://www.opensource.org/license/mit/

    The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.

    Repository ===> https://www.github.com/Zushah/Chalkboard
    Website ===> https://zushah.github.io/Chalkboard/home.html
*/
var Chalkboard = {
    README: function() {
        console.log("The Chalkboard Library\nVersion 1.6.0 released 12/25/2023\nAuthored by Zushah ===> https://www.github.com/Zushah\nAvailable under the MIT License ===> https://www.opensource.org/license/mit/\n\nThe Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.\n\nRepository ===> https://www.github.com/Zushah/Chalkboard\nWebsite ===> https://zushah.github.io/Chalkboard/home.html");
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
    CONTEXT: "ctx",
    PARSEPREFIX: "",
    numb: {
        random: function(inf, sup) {
            if(inf === undefined) {
                inf = 0;
            }
            if(sup === undefined) {
                sup = 1;
            }
            return inf + (sup - inf) * Math.random();
        },
        exponential: function(l) {
            if(l === undefined) {
                l = 1;
            }
            return l <= 0 ? 0 : -Math.log(Math.random()) / l;
        },
        Gaussian: function(height, mean, deviation) {
            var u1 = Math.random(), u2 = Math.random();
            var random = Chalkboard.real.sqrt(-2 * Chalkboard.real.ln(u1)) * Chalkboard.trig.cos(Chalkboard.PI(2) * u2);
            return random * height * Chalkboard.real.sqrt(deviation) + mean;
        },
        Bernoullian: function(p) {
            if(p === undefined) {
                p = 0.5;
            }
            return Math.random() < p ? 1 : 0;
        },
        Poissonian: function(l) {
            if(l === undefined) {
                l = 1;
            }
            if(l > 0) {
                var L = Chalkboard.E(-l);
                var p = 1, k = 0;
                for(; p > L; ++k) {
                    p *= Math.random();
                }
                return k - 1;
            } else {
                return 0;
            }
        },
        factorial: function(num) {
            if(num >= 0) {
                var n = 1;
                for(var i = 1; i <= num; i++) {
                    n *= i;
                }
                i--;
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
        sum: function(formula, inf, sup) {
            var result = 0;
            var f = Chalkboard.real.parse("n => " + formula);
            for(var i = inf; i <= sup; i++) {
                result += f(i);
            }
            return result;
        },
        mul: function(formula, inf, sup) {
            var result = 1;
            var f = Chalkboard.real.parse("n => " + formula);
            for(var i = inf; i <= sup; i++) {
                result *= f(i);
            }
            return result;
        },
        combination: function(n, r) {
            return Chalkboard.numb.factorial(n) / (Chalkboard.numb.factorial(n - r) * Chalkboard.numb.factorial(r));
        },
        permutation: function(n, r) {
            return Chalkboard.numb.factorial(n) / Chalkboard.numb.factorial(n - r);
        },
        prime: function(num) {
            if(num === 2) {
                return 2;
            }
            var n = 1;
            var prime = 3;
            while(n < num) {
                if(Chalkboard.numb.isPrime(prime)) {
                    n++;
                }
                if(n < num) {
                    prime += 2;
                }
            }
            return prime;
        },
        isPrime: function(num) {
            for(var i = 2; i <= Chalkboard.real.sqrt(num); i++) {
                if(num % i === 0) {
                    return false;
                }
            }
            return num > 1;
        },
        nextPrime: function(num) {
            var result = num + 1;
            while(!Chalkboard.numb.isPrime(result)) {
                result++;
            }
            return result;
        },
        primeGap: function(inf, sup) {
            var prime = null;
            var gap = 0;
            for(var i = inf; i <= sup; i++) {
                if(Chalkboard.numb.isPrime(i)) {
                    if(prime !== null) {
                        var temp = i - prime;
                        if(temp > gap) {
                            gap = temp;
                        }
                    }
                    prime = i;
                }
            }
            return gap;
        },
        primeArr: function(inf, sup) {
            var result = [];
            for(var i = inf; i <= sup; i++) {
                if(Chalkboard.numb.isPrime(i)) {
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
                if(!Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        },
        compositeCount: function(inf, sup) {
            return Chalkboard.numb.compositeArr(inf, sup).length;
        },
        factors: function(num) {
            var result = [];
            while(num % 2 === 0) {
                result.push(2);
                num /= 2;
            }
            for(var i = 3; i <= Chalkboard.real.sqrt(num); i += 2) {
                while(num % i === 0) {
                    result.push(i);
                    num /= i;
                }
            }
            if(num > 2) {
                result.push(num);
            }
            return result;
        },
        divisors: function(num) {
            var result = [];
            for(var i = 1; i <= num; i++) {
                if(num % i === 0) {
                    result.push(i);
                }
            }
            return result;
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
        constrain: function(num, range) {
            if(range === undefined) {
                return Math.max(Math.min(num, 1), 0);
            } else {
                return Math.max(Math.min(num, range[1]), range[0]);
            }
        },
        binomial: function(n, k) {
            if(k < 0 || k > n) {
                return 0;
            }
            if(k === 0 || k === n) {
                return 1;
            }
            if(k === 1 || k === n - 1) {
                return n;
            }
            if(n - k < k) {
                k = n - k;
            }
            var result = n;
            for(var i = 2; i <= k; i++) {
                result *= (n - i + 1) / i;
            }
            return Math.round(result);
        },
        Fibonacci: function(num) {
            var sequence = [0, 1];
            if(sequence[num] === undefined) {
                sequence.push(Chalkboard.numb.Fibonacci(num - 1) + sequence[num - 2]);
            }
            return sequence[num];
        },
        Goldbach: function(num) {
            if(num % 2 === 0) {
                if(num !== 4) {
                    var a = num / 2, b = num / 2;
                    if(a % 2 === 0) {
                        a--;
                        b++;
                    }
                    while(a >= 3) {
                        if(Chalkboard.numb.isPrime(a) && Chalkboard.numb.isPrime(b)) {
                            return [a, b];
                        }
                        a -= 2;
                        b += 2;
                    }
                    return undefined;
                } else {
                    return [2, 2];
                }
            } else {
                return undefined;
            }
        },
        Euler: function(num) {
            if(num > 0) {
                var factors = Chalkboard.numb.factors(num);
                for(var i = 0; i < factors.length; i++) {
                    num *= (factors[i] - 1) / factors[i];
                }
                return num;
            } else {
                return undefined;
            }
        }
    },
    real: {
        function: function(definition, type) {
            type = type || "expl";
            if(type === "expl") {
                return {definition: definition, type: type};
            } else if(type === "inve") {
                return {definition: definition, type: type};
            } else if(type === "pola") {
                return {definition: definition, type: type};
            } else if(type === "curv") {
                return definition.length === 2 ? {definition: [definition[0], definition[1]], type: type} : {definition: [definition[0], definition[1], definition[2]], type: type};
            } else if(type === "surf") {
                return {definition: [definition[0], definition[1], definition[2]], type: type};
            } else if(type === "mult") {
                return {definition: definition, type: type};
            } else {
                return "TypeError: Parameter \"type\" must be either \"expl\", \"inve\", \"pola\", \"curv\", \"surf\", or \"mult\".";
            }
        },
        parse: function(str) {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + ' return (' + str + ')')();
        },
        val: function(func, val) {
            if(func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                return f(val);
            } else if(func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                return f(val);
            } else if(func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                return r(val);
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vec2.new(x(val), y(val));
                } else if(func.definition.length === 3) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vec3.new(x(val), y(val), z(val));
                }
            } else if(func.type === "surf") {
                var x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                    if(val.type === "vec2") {
                        return Chalkboard.vec3.new(x(val.x, val.y), y(val.x, val.y), z(val.x, val.y));
                    } else {
                        return "TypeError: Parameter \"val\" must be of type \"vec2\".";
                    }
            } else if(func.type === "mult") {
                if(val.type === "vec2") {
                    var f = Chalkboard.real.parse("(x, y) => " + func.definition);
                    return f(val.x, val.y);
                } else {
                    return "TypeError: Parameter \"val\" must be of type \"vec2\".";
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\", \"pola\", \"curv\", \"surf\", or \"mult\".";
            }
        },
        pow: function(base, num) {
            if(base === 0 && num === 0) {
                return 1;
            } else {
                return Math.exp(num * Math.log(base));
            }
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
                return undefined;
            }
        },
        root: function(num, index) {
            index = index || 3;
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
        Heaviside: function(num, edge, scl) {
            edge = edge || 0;
            scl = scl || 1;
            if(num >= edge) {
                return scl;
            } else if(num < edge) {
                return 0;
            }
        },
        Dirac: function(num, edge, scl) {
            edge = edge || 0;
            scl = scl || 1;
            if(num === edge) {
                return scl;
            } else if(num !== edge) {
                return 0;
            }
        },
        ramp: function(num, edge, scl) {
            edge = edge || 0;
            scl = scl || 1;
            if(num >= edge) {
                return num * scl;
            } else if(num < edge) {
                return 0;
            }
        },
        rect: function(num, center, width, scl) {
            center = center || 0;
            width = width || 2;
            scl = scl || 1;
            if(num > (center + width / 2) || num < (center - width / 2)) {
                return 0;
            } else if(num <= (center + width / 2) || num >= (center - width / 2)) {
                return scl;
            }
        },
        pingpong: function(num, edge, scl) {
            edge = edge || 0;
            scl = scl || 1;
            if((num + edge) % (2 * scl) < scl) {
                return (num + edge) % scl;
            } else {
                return scl - (num + edge) % scl;
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
            if(b === undefined) {
                return {a: a, b: 0, type: "comp"};
            } else {
                return {a: a, b: b, type: "comp"};
            }
        },
        copy: function(comp) {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        },
        function: function(realDefinition, imagDefinition) {
            return {definition: [realDefinition, imagDefinition], type: "comp"};
        },
        parse: function(str) {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + ' return (' + str + ')')();
        },
        val: function(func, comp) {
            if(func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                return Chalkboard.comp.new(u(comp.a, comp.b), v(comp.a, comp.b));
            } else {
                return "TypeError: Parameter \"func\" must be of type \"comp\".";
            }
        },
        Re: function(funcORcomp) {
            if(funcORcomp.definition !== undefined && funcORcomp.type === "comp") {
                return funcORcomp.definition[0];
            } else if(funcORcomp.a !== undefined && funcORcomp.type === "comp") {
                return funcORcomp.a;
            }
        },
        Im: function(funcORcomp) {
            if(funcORcomp.definition !== undefined && funcORcomp.type === "comp") {
                return funcORcomp.definition[1];
            } else if(funcORcomp.b !== undefined && funcORcomp.type === "comp") {
                return funcORcomp.b;
            }
        },
        random: function(inf, sup) {
            return Chalkboard.comp.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        mag: function(comp) {
            return Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b));
        },
        magsq: function(comp) {
            return (comp.a * comp.a) + (comp.b * comp.b);
        },
        magset: function(comp, num) {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num);
        },
        arg: function(comp) {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
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
            return Chalkboard.comp.new(1 / comp.a, 1 / comp.b);
        },
        absolute: function(comp) {
            return Chalkboard.comp.new(Math.abs(comp.a), Math.abs(comp.b));
        },
        round: function(comp) {
            return Chalkboard.comp.new(Math.round(comp.a), Math.round(comp.b));
        },
        Euler: function(rad) {
            return Chalkboard.comp.new(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        },
        pow: function(comp, num) {
            return Chalkboard.comp.new(Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.cos(num * Chalkboard.comp.arg(comp)), Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.sin(num * Chalkboard.comp.arg(comp)));
        },
        ln: function(comp) {
            return Chalkboard.comp.new(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        },
        sq: function(comp) {
            return Chalkboard.comp.new((comp.a * comp.a) - (comp.b * comp.b), 2 * comp.a * comp.b);
        },
        sqrt: function(comp) {
            return Chalkboard.comp.new(Chalkboard.real.sqrt((comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2), Chalkboard.numb.sgn(comp.b) * Chalkboard.real.sqrt((-comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2));
        },
        root: function(comp, index) {
            index = index || 3;
            if(Number.isInteger(index) && index > 0) {
                var result = [];
                var r = Chalkboard.comp.mag(comp);
                var t = Chalkboard.comp.arg(comp);
                for(var i = 0; i < index; i++) {
                    result.push(Chalkboard.comp.new(Chalkboard.real.root(r, index) * Chalkboard.trig.cos((t + Chalkboard.PI(2 * i)) / index), Chalkboard.real.root(r, index) * Chalkboard.trig.sin((t + Chalkboard.PI(2 * i)) / index)));
                }
                return result;
            }
        },
        rotate: function(comp, rad) {
            return Chalkboard.comp.new(Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad), Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad));
        },
        invert: function(comp) {
            return Chalkboard.comp.new(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        },
        conjugate: function(comp) {
            return Chalkboard.comp.new(comp.a, -comp.b);
        },
        dist: function(comp_1, comp_2) {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.real.sqrt(((comp_2.a - comp_1.a) * (comp_2.a - comp_1.a)) + ((comp_2.b - comp_1.b) * (comp_2.b - comp_1.b)));
        },
        distsq: function(comp_1, comp_2) {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return ((comp_2.a - comp_1.a) * (comp_2.a - comp_1.a)) + ((comp_2.b - comp_1.b) * (comp_2.b - comp_1.b));
        },
        scl: function(comp, num) {
            return Chalkboard.comp.new(comp.a * num, comp.b * num);
        },
        constrain: function(comp, range) {
            return Chalkboard.comp.new(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        },
        add: function(comp_1, comp_2) {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.comp.new(comp_1.a + comp_2.a, comp_1.b + comp_2.b);
        },
        sub: function(comp_1, comp_2) {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.comp.new(comp_1.a - comp_2.a, comp_1.b - comp_2.b);
        },
        mul: function(comp_1, comp_2) {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.comp.new((comp_1.a * comp_2.a) - (comp_1.b * comp_2.b), (comp_1.a * comp_2.b) + (comp_1.b * comp_2.a));
        },
        div: function(comp_1, comp_2) {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
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
        print: function(comp) {
            console.log(Chalkboard.comp.toString(comp));
        }
    },
    quat: {
        new: function(a, b, c, d) {
            if(b === undefined && c === undefined && d === undefined) {
                return {a: a, b: 0, c: 0, d: 0, type: "quat"};
            } else {
                return {a: a, b: b, c: c, d: d, type: "quat"};
            }
        },
        copy: function(quat) {
            return Object.create(Object.getPrototypeOf(quat), Object.getOwnPropertyDescriptors(quat));
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
            return Chalkboard.quat.scl(Chalkboard.quat.normalize(quat), num);
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
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.real.sqrt(((quat_2.a - quat_1.a) * (quat_2.a - quat_1.a)) + ((quat_2.b - quat_1.b) * (quat_2.b - quat_1.b)) + ((quat_2.c - quat_1.c) * (quat_2.c - quat_1.c)) + ((quat_2.d - quat_1.d) * (quat_2.d - quat_1.d)));
        },
        distsq: function(quat_1, quat_2) {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return ((quat_2.a - quat_1.a) * (quat_2.a - quat_1.a)) + ((quat_2.b - quat_1.b) * (quat_2.b - quat_1.b)) + ((quat_2.c - quat_1.c) * (quat_2.c - quat_1.c)) + ((quat_2.d - quat_1.d) * (quat_2.d - quat_1.d));
        },
        scl: function(quat, num) {
            return Chalkboard.quat.new(quat.a * num, quat.b * num, quat.c * num, quat.d * num);
        },
        constrain: function(quat, range) {
            return Chalkboard.quat.new(Chalkboard.numb.constrain(quat.a, range), Chalkboard.numb.constrain(quat.b, range), Chalkboard.numb.constrain(quat.c, range), Chalkboard.numb.constrain(quat.d, range));
        },
        add: function(quat_1, quat_2) {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new(quat_1.a + quat_2.a, quat_1.b + quat_2.b, quat_1.c + quat_2.c, quat_1.d + quat_2.d);
        },
        sub: function(quat_1, quat_2) {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new(quat_1.a - quat_2.a, quat_1.b - quat_2.b, quat_1.c - quat_2.c, quat_1.d - quat_2.d);
        },
        mul: function(quat_1, quat_2) {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new((quat_1.a * quat_2.a) - (quat_1.b * quat_2.b) - (quat_1.c * quat_2.c) - (quat_1.d * quat_2.d), (quat_1.a * quat_2.b) + (quat_1.b * quat_2.a) + (quat_1.c * quat_2.d) - (quat_1.d * quat_2.c), (quat_1.a * quat_2.c) - (quat_1.b * quat_2.d) + (quat_1.c * quat_2.a) + (quat_1.d * quat_2.b), (quat_1.a * quat_2.d) + (quat_1.b * quat_2.c) - (quat_1.c * quat_2.b) + (quat_1.d * quat_2.a));
        },
        div: function(quat_1, quat_2) {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new((quat_1.a * quat_2.a + quat_1.b * quat_2.b + quat_1.c * quat_2.c + quat_1.d * quat_2.d) / Chalkboard.quat.magsq(quat_2), (quat_1.b * quat_2.a - quat_1.a * quat_2.b - quat_1.d * quat_2.c + quat_1.c * quat_2.d) / Chalkboard.quat.magsq(quat_2), (quat_1.c * quat_2.a + quat_1.d * quat_2.b - quat_1.a * quat_2.c - quat_1.b * quat_2.d) / Chalkboard.quat.magsq(quat_2), (quat_1.d * quat_2.a - quat_1.c * quat_2.b + quat_1.b * quat_2.c - quat_1.a * quat_2.d) / Chalkboard.quat.magsq(quat_2));
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
        xyplane: function(config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2
            }).size /= 100;
            pushMatrix();
            translate(config.x, config.y);
            stroke(config.stroke);
            strokeWeight(config.strokeWeight / 4);
            for(var i = Math.floor(-config.x / config.size); i <= (width - config.x) / config.size; i++) {
                line(i / config.size, -config.y, i / config.size, width - config.y);
            }
            for(var i = Math.floor(-config.y / config.size); i <= (width - config.y) / config.size; i++) {
                line(-config.x, i / config.size, width - config.x, i / config.size);
            }
            strokeWeight(config.strokeWeight);
            line(-config.x, 0, width - config.x, 0);
            line(0, -config.y, 0, width - config.y);
            popMatrix();
        },
        rOplane: function(config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2
            }).size /= 100;
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            stroke(config.stroke);
            strokeWeight(config.strokeWeight / 4);
            for(var i = 0; i <= config.size * width / 2; i++) {
                ellipse(0, 0, 2 * i / config.size, 2 * i / config.size);
            }
            strokeWeight(config.strokeWeight);
            line(-config.x, 0, width - config.x, 0);
            line(0, -config.y, 0, width - config.y);
            popMatrix();
        },
        function: function(func, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || (func.type === "comp" ? [[-10, 10], [-10, 10]] : [-10, 10])
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            if(func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i++) {
                    vertex(i, -f(i * config.size) / config.size);
                    data.push([i, f(i)]);
                }
            } else if(func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i++) {
                    vertex(f(i * config.size) / config.size, -i);
                    data.push([f(i), i]);
                }
            } else if(func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                for(var i = config.domain[0] / config.size; i < config.domain[1] / config.size; i++) {
                    vertex(r(i * config.size) / config.size * Chalkboard.trig.cos(i * config.size), -r(i * config.size) / config.size * Chalkboard.trig.sin(i * config.size));
                    data.push([i, r(i)]);
                }
            } else if(func.type === "curv") {
                var x = Chalkboard.real.parse("t => " + func.definition[0]),
                    y = Chalkboard.real.parse("t => " + func.definition[1]);
                for(var i = config.domain[0] / config.size; i < config.domain[1] / config.size; i++) {
                    vertex(x(i * config.size) / config.size, -y(i * config.size) / config.size);
                    data.push([x(i), y(i)]);
                }
            } else if(func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                for(var i = config.domain[0][0] / config.size; i <= config.domain[0][1] / config.size; i += 5) {
                    for(var j = config.domain[1][0] / config.size; j <= config.domain[1][1] / config.size; j += 5) {
                        var z = Chalkboard.comp.new(u(i * config.size, j * config.size) / config.size, v(i * config.size, j * config.size) / config.size);
                        noStroke();
                        if(z.a === 0 && z.b === 0) {
                            fill(0, 0, 0);
                        } else if(z.a === Infinity && z.b === Infinity) {
                            fill(255, 255, 255);
                        } else {
                            colorMode(HSB);
                            fill(Chalkboard.numb.map(Chalkboard.trig.toDeg(Chalkboard.comp.arg(z)), [0, 360], [0, 255]), 255, Chalkboard.numb.map((Chalkboard.trig.tanh(Chalkboard.comp.mag(z) / Chalkboard.real.pow(10, 20)) + 0.5) * 100, [0, 100], [0, 255]));
                            colorMode(RGB);
                        }
                        rect(i, j, 5, 5);
                        data.push([u(i, j), v(i, j)]);
                    }
                }
            } else {
                return "TypeError: Property \"type\" of parameter \"func\" must be either \"expl\", \"inve\", \"pola\", \"curv\", or \"comp\".";
            }
            endShape();
            popMatrix();
            return data;
        },
        barplot: function(arr, bins, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                fill: config.fill || color(255),
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2
            }).size /= 100;
            pushMatrix();
            translate(config.x, config.y);
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            fill(config.fill);
            var bars = [];
            for(var i = 0; i < bins.length; i++) {
                if(i === 0) {
                    bars.push(Chalkboard.stat.lt(arr, bins[0], true));
                } else if(i === bins.length) {
                    bars.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                } else {
                    bars.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            var counts = [];
            for(var i = 0; i < bars.length; i++) {
                counts.push(bars[i].length);
            }
            var x = 0, width = counts.length / (2 * config.size);
            for(var i = 0; i < counts.length; i++) {
                rect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                x += 1 / config.size;
            }
            popMatrix();
            return bars;
        },
        lineplot: function(arr, bins, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2
            }).size /= 100;
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            var verts = [];
            for(var i = 0; i < bins.length; i++) {
                if(i === 0) {
                    verts.push(Chalkboard.stat.lt(arr, bins[0], true));
                } else if(i === bins.length) {
                    verts.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                } else {
                    verts.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            var counts = [];
            for(var i = 0; i < verts.length; i++) {
                counts.push(verts[i].length);
            }
            beginShape();
            for(var i = 0; i < counts.length; i++) {
                vertex(i / config.size, -counts[i] / config.size);
            }
            endShape();
            popMatrix();
            return verts;
        },
        scatterplot: function(arr1, arr2, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 5
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            if(arr1.length === arr2.length) {
                for(var i = 0; i < arr1.length; i++) {
                    point(arr1[i] / config.size - arr1.length / (2 * config.size), -arr2[i] / config.size + arr1.length / (2 * config.size));
                    data.push([arr1[i], arr2[i]]);
                }
            }
            popMatrix();
            return data;
        },
        comp: function(comp, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 5
            }).size /= 100;
            stroke(config.stroke);
            strokeWeight(config.strokeWeight);
            pushMatrix();
            translate(config.x, config.y);
            point(comp.a / config.size, -comp.b / config.size);
            popMatrix();
            noStroke();
            noFill();
            return [[comp.a], [comp.b]];
        },
        vec2: function(vec2, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 5
            }).size /= 100;
            stroke(config.stroke);
            strokeWeight(config.strokeWeight);
            pushMatrix();
            translate(config.x, config.y);
            line(0, 0, vec2.x / config.size, -vec2.y / config.size);
            popMatrix();
            return [[vec2.x], [vec2.y]];
        },
        field: function(vec2field, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 5,
                domain: config.domain || [[-10, 10], [-10, 10]],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            stroke(config.stroke);
            strokeWeight(config.strokeWeight);
            pushMatrix();
            translate(config.x, config.y);
            for(var i = config.domain[0][0] / config.size; i <= config.domain[0][1] / config.size; i += config.res) {
                for(var j = config.domain[1][0] / config.size; j <= config.domain[1][1] / config.size; j += config.res) {
                    var v = Chalkboard.vec2.fromField(vec2field, Chalkboard.vec2.new(i, j));
                    line(i, j, i + v.x, j + v.y);
                    data.push([i + v.x, j + v.y]);
                }
            }
            popMatrix();
            return data;
        },
        vec3: function(vec3, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 5
            }).size /= 100;
            stroke(config.stroke);
            strokeWeight(config.strokeWeight);
            pushMatrix();
            translate(config.x, config.y);
            line(0, 0, (vec3.x / config.size) / (vec3.z * 0.25 + 1), (-vec3.y / config.size) / (vec3.z * 0.25 + 1));
            popMatrix();
            return [[vec3.x], [vec3.y], [vec3.z]];
        },
        matr: function(matr, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10]
            }).size /= 100;
            for(var i = config.domain[0]; i <= config.domain[1]; i++) {
                Chalkboard.plot.vec2(Chalkboard.vec2.new(matr[0][0], matr[1][0]), {x: config.x, y: config.y + (i / config.size) * matr[1][1], size: config.size, stroke: config.stroke, strokeWeight: config.strokeWeight / 4});
                Chalkboard.plot.vec2(Chalkboard.vec2.new(-matr[0][0], -matr[1][0]), {x: config.x, y: config.y + (i / config.size) * matr[1][1], size: config.size, stroke: config.stroke, strokeWeight: config.strokeWeight / 4});
                Chalkboard.plot.vec2(Chalkboard.vec2.new(matr[0][1], matr[1][1]), {x: config.x + (i / config.size) * matr[0][0], y: config.y, size: config.size, stroke: config.stroke, strokeWeight: config.strokeWeight / 4});
                Chalkboard.plot.vec2(Chalkboard.vec2.new(-matr[0][1], -matr[1][1]), {x: config.x + (i / config.size) * matr[0][0], y: config.y, size: config.size, stroke: config.stroke, strokeWeight: config.strokeWeight / 4});
            }
            Chalkboard.plot.vec2(Chalkboard.vec2.new(matr[0][0], matr[1][0]), config);
            Chalkboard.plot.vec2(Chalkboard.vec2.new(-matr[0][0], -matr[1][0]), config);
            Chalkboard.plot.vec2(Chalkboard.vec2.new(matr[0][1], matr[1][1]), config);
            Chalkboard.plot.vec2(Chalkboard.vec2.new(-matr[0][1], -matr[1][1]), config);
            return matr;
        },
        dfdx: function(func, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if(func.type === "expl") {
                    vertex(i, -Chalkboard.calc.dfdx(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.dfdx(func, i)]);
                } else if(func.type === "inve") {
                    vertex(Chalkboard.calc.dfdx(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.dfdx(func, i), i]);
                }
            }
            endShape();
            popMatrix();
            return data;
        },
        d2fdx2: function(func, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if(func.type === "expl") {
                    vertex(i, -Chalkboard.calc.d2fdx2(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.d2fdx2(func, i)]);
                } else if(func.type === "inve") {
                    vertex(Chalkboard.calc.d2fdx2(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.d2fdx2(func, i), i]);
                }
            }
            endShape();
            popMatrix();
            return data;
        },
        fxdx: function(func, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if(func.type === "expl") {
                    vertex(i, -Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.fxdx(func, 0, i)]);
                } else if(func.type === "inve") {
                    vertex(Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.fxdx(func, 0, i), i]);
                }
            }
            endShape();
            popMatrix();
            return data;
        },
        convolution: function(func_1, func_2, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                vertex(i, -Chalkboard.calc.convolution(func_1, func_2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.convolution(func_1, func_2, i)]);
            }
            endShape();
            popMatrix();
            return data;
        },
        correlation: function(func_1, func_2, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                vertex(i, -Chalkboard.calc.correlation(func_1, func_2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.correlation(func_1, func_2, i)]);
            }
            endShape();
            popMatrix();
            return data;
        },
        autocorrelation: function(func, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                vertex(i, -Chalkboard.calc.autocorrelation(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.autocorrelation(func, i)]);
            }
            endShape();
            popMatrix();
            return data;
        },
        Taylor: function(func, n, a, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                vertex(i, -Chalkboard.calc.Taylor(func, i * config.size, n, a) / config.size);
                data.push([i, Chalkboard.calc.Taylor(func, i, n, a)]);
            }
            endShape();
            popMatrix();
            return data;
        },
        Laplace: function(func, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            if(config.domain[0] >= 0) {
                for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                    vertex(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            } else {
                for(var i = 0; i <= config.domain[1] / config.size; i += config.res) {
                    vertex(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            endShape();
            popMatrix();
            return data;
        },
        Fourier: function(func, config) {
            (config = {
                x: (config = config || {}).x || width / 2,
                y: config.y || height / 2,
                size: config.size || 1,
                stroke: config.stroke || color(0),
                strokeWeight: config.strokeWeight || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25
            }).size /= 100;
            var data = [];
            pushMatrix();
            translate(config.x, config.y);
            noFill();
            strokeWeight(config.strokeWeight);
            stroke(config.stroke);
            beginShape();
            for(var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                vertex(i, -Chalkboard.calc.Fourier(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.Fourier(func, i)]);
            }
            endShape();
            popMatrix();
            return data;
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
        dist: function(p1, p2) {
            if(p1.length === p2.length) {
                var result = 0;
                for(var i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return Chalkboard.real.sqrt(result);
            } else {
                return undefined;
            }
        },
        distsq: function(p1, p2) {
            if(p1.length === p2.length) {
                var result = 0;
                for(var i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return result;
            } else {
                return undefined;
            }
        },
        mid: function(p1, p2) {
            if(p1.length === p2.length) {
                var result = [];
                for(var i = 0; i < p1.length; i++) {
                    result[i] = (p1[i] + p2[i]) / 2;
                }
                return result;
            } else {
                return undefined;
            }
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
        arctan2: function(y, x) {
            if(x === 0) {
                if(y > 0) {
                    return Math.PI / 2;
                } else if(y < 0) {
                    return -Math.PI / 2;
                } else {
                    return 0;
                }
            } else {
                if(x > 0 && y >= 0) {
                    return Math.atan(Math.abs(y / x));
                } else if(x < 0 && y >= 0) {
                    return Math.PI - Math.atan(Math.abs(y / x));
                } else if(x < 0 && y < 0) {
                    return -Math.PI + Math.atan(Math.abs(y / x));
                } else {
                    return -Math.atan(Math.abs(y / x));
                }
            }
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
        random: function(inf, sup, length) {
            var result = [];
            for(var i = 0; i < length; i++) {
                result.push(Chalkboard.numb.random(inf, sup));
            }
            return result;
        },
        shuffle: function(arr) {
            var index, temp, rindex;
            for(index = arr.length - 1; index > 0; index--) {
                rindex = Math.floor(Chalkboard.numb.random(0, index + 1));
                temp = arr[index];
                arr[index] = arr[rindex];
                arr[rindex] = temp;
            }
            return arr;
        },
        norm: function(arr, type) {
            type = type || "L2";
            var result = 0;
            if(type === "L0") {
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result;
            } else if(type === "L1") {
                for(var i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result;
            } else if(type === "L2") {
                for(var i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return Chalkboard.real.sqrt(result);
            } else if(type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr));
            } else {
                return "TypeError: Parameter \"type\" must be \"L0\", \"L1\", \"L2\", or \"LInfinity\".";
            }
        },
        normsq: function(arr, type) {
            type = type || "L2";
            var result = 0;
            if(type === "L0") {
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result * result;
            } else if(type === "L1") {
                for(var i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result * result;
            } else if(type === "L2") {
                for(var i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return result;
            } else if(type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr)) * Math.abs(Chalkboard.stat.max(arr));
            } else {
                return "TypeError: Parameter \"type\" must be \"L0\", \"L1\", \"L2\", or \"LInfinity\".";
            }
        },
        normalize: function(arr, type) {
            if(type === "L0" || type === "L1" || type === "L2" || type === "LInfinity") {
                var result = [];
                var norm = Chalkboard.stat.norm(arr, type);
                for(var i = 0; i < arr.length; i++) {
                    result.push(arr[i] / norm);
                }
                return result;
            } else {
                return "TypeError: Parameter \"type\" must be \"L0\", \"L1\", \"L2\", or \"LInfinity\".";
            }
        },
        constrain: function(arr, range) {
            var result = [];
            for(var i = 0; i < arr.length; i++) {
                result.push(Chalkboard.numb.constrain(arr[i], range));
            }
            return result;
        },
        eq: function(arr, arrORnum) {
            var result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(var i = 0; i < arr.length; i++) {
                        if(arr[i] === arrORnum[i]) {
                            result.push(arr[i]);
                        }
                    }
                }
            } else {
                for(var i = 0; i < arr.length; i++) {
                    if(arr[i] === arrORnum) {
                        result.push(arr[i]);
                    }
                }
            }
            return result;
        },
        ineq: function(arr, inf, sup, includeInf, includeSup) {
            includeInf = includeInf || false;
            includeSup = includeSup || false;
            var result = [];
            if(Array.isArray(inf) && Array.isArray(sup)) {
                if(arr.length === inf.length && arr.length === sup.length) {
                    for(var i = 0; i < arr.length; i++) {
                        if(includeInf) {
                            if(includeSup) {
                                if(arr[i] >= inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            } else {
                                if(arr[i] >= inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        } else {
                            if(includeSup) {
                                if(arr[i] > inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            } else {
                                if(arr[i] > inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        }
                    }
                }
            } else {
                for(var i = 0; i < arr.length; i++) {
                    if(includeInf) {
                        if(includeSup) {
                            if(arr[i] >= inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] >= inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    } else {
                        if(includeSup) {
                            if(arr[i] > inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] > inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            }
            return result;
        },
        lt: function(arr, arrORnum, includeEnd) {
            includeEnd = includeEnd || false;
            var result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(var i = 0; i < arr.length; i++) {
                        if(includeEnd) {
                            if(arr[i] <= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] < arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            } else {
                for(var i = 0; i < arr.length; i++) {
                    if(includeEnd) {
                        if(arr[i] <= arrORnum) {
                            result.push(arr[i]);
                        }
                    } else {
                        if(arr[i] < arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        },
        gt: function(arr, arrORnum, includeEnd) {
            includeEnd = includeEnd || false;
            var result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(var i = 0; i < arr.length; i++) {
                        if(includeEnd) {
                            if(arr[i] >= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        } else {
                            if(arr[i] > arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            } else {
                for(var i = 0; i < arr.length; i++) {
                    if(includeEnd) {
                        if(arr[i] >= arrORnum) {
                            result.push(arr[i]);
                        }
                    } else {
                        if(arr[i] > arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        },
        subsets: function(arr) {
            var result = [[]];
            arr.sort();
            for(var i = 0; i < arr.length; i++) {
                if(i === 0 || arr[i] !== arr[i - 1]) {
                    var curr = arr[i];
                    var subsetsWithCurr = [];
                    for(var j = 0; j < result.length; j++) {
                        var subset = result[j].slice();
                        subset.push(curr);
                        subsetsWithCurr.push(subset);
                    }
                    result = result.concat(subsetsWithCurr);
                }
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
        mean: function(arr, type) {
            type = type || "arithmetic";
            var result = 0;
            if(type === "arithmetic") {
                for(var i = 0; i < arr.length; i++) {
                    result += arr[i];
                }
                return result / arr.length;
            } else if(type === "geometric") {
                for(var i = 0; i < arr.length; i++) {
                    result *= arr[i];
                }
                return Chalkboard.real.root(Math.abs(result), arr.length);
            } else if(type === "harmonic") {
                for(var i = 0; i < arr.length; i++) {
                    result += 1 / arr[i];
                }
                return arr.length / result;
            } else {
                return "TypeError: Parameter \"type\" must be \"arithmetic\", \"geometric\", or \"harmonic\".";
            }
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
        skewness: function(arr) {
            var result = 0;
            var mean = Chalkboard.stat.mean(arr);
            var deviation = Chalkboard.stat.deviation(arr);
            for(var i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / ((arr.length - 1) * (deviation * deviation * deviation));
        },
        kurtosis: function(arr) {
            var result = 0;
            var mean = Chalkboard.stat.mean(arr);
            var deviation = Chalkboard.stat.deviation(arr);
            for(var i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / (deviation * deviation * deviation * deviation) - 3;
        },
        confidenceInterval: function(arr) {
            return [Chalkboard.stat.mean(arr) - 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length)), Chalkboard.stat.mean(arr) + 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length))];
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
        quartile: function(arr, type) {
            var temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            var lo = temp.slice(0, Math.floor(temp.length / 2));
            var hi = temp.slice(Math.ceil(temp.length / 2));
            if(type === "Q1") {
                return Chalkboard.stat.median(lo);
            } else if(type === "Q2") {
                return Chalkboard.stat.median(arr);
            } else if(type === "Q3") {
                return Chalkboard.stat.median(hi);
            } else {
                return "TypeError: Parameter \"type\" must be either \"Q1\", \"Q2\", or \"Q3\".";
            }
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
            for(var i = 0; i < arr1.length + arr2.length - 1; i++) {
                var sum = 0;
                for(var j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[arr2.length - 1 - i + j];
                }
                result.push(sum);
            }
            return result;
        },
        autocorrelation: function(arr) {
            return Chalkboard.stat.correlation(arr, arr);
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
        Gaussian: function(height, mean, deviation) {
            return Chalkboard.real.function(height.toString() + " * Math.exp(-((x - " + mean.toString() + ") * (x - " + mean.toString() + ")) / (2 * " + deviation.toString() + " * " + deviation.toString() + "))");
        },
        regression: function(data, type, degree) {
            type = type || "linear";
            degree = degree || 2;
            if(type === "linear") {
                var x = 0, y = 0;
                var xx = 0, xy = 0;
                for(var i = 0; i < data.length; i++) {
                    x += data[i][0];
                    y += data[i][1];
                    xx += data[i][0] * data[i][0];
                    xy += data[i][0] * data[i][1];
                }
                var a = (data.length * xy - x * y) / (data.length * xx - x * x),
                    b = (y / data.length) - (a * x) / data.length;
                return Chalkboard.real.function(a + " * x + " + b);
            } else if(type === "polynomial") {
                var A = Chalkboard.matr.new();
                for(var i = 0; i < data.length; i++) {
                    A.push([]);
                    for(var j = 0; j <= degree; j++) {
                        A[i].push(Chalkboard.real.pow(data[i][0], j));
                    }
                }
                var AT = Chalkboard.matr.transpose(A);
                var B = Chalkboard.matr.new();
                for(var i = 0; i < data.length; i++) {
                    B.push([data[i][1]]);
                }
                var ATA = Chalkboard.matr.mul(AT, A);
                var ATAI = Chalkboard.matr.invert(ATA);
                var x = Chalkboard.matr.mul(Chalkboard.matr.mul(ATAI, AT), B);
                var coeff = [];
                for(var i = 0; i < x.length; i++) {
                    coeff.push(x[i][0]);
                }
                var f = coeff[0].toString() + " + " + coeff[1].toString() + " * x";
                for(var i = 2; i <= degree; i++) {
                    f += " + " + coeff[i].toString() + " * Math.pow(x, " + i + ")";
                }
                return Chalkboard.real.function(f);
            } else if(type === "power") {
                var arr = [0, 0, 0, 0];
                for(var i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                var a = Chalkboard.E((arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length),
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.function(a + " * Math.pow(x, " + b + ")");
            } else if(type === "exponential") {
                var arr = [0, 0, 0, 0, 0, 0];
                for(var i = 0; i < data.length; i++) {
                    arr[0] += data[i][0];
                    arr[1] += data[i][1];
                    arr[2] += data[i][0] * data[i][0] * data[i][1];
                    arr[3] += data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[4] += data[i][0] & data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[5] += data[i][0] * data[i][1];
                }
                var a = Chalkboard.E((arr[2] * arr[3] - arr[5] * arr[4]) / (arr[1] * arr[2] - arr[5] * arr[5])),
                    b = (arr[1] * arr[4] - arr[5] * arr[3]) / (arr[1] * arr[2] - arr[5] * arr[5]);
                return Chalkboard.real.function(a + "* Math.exp(" + b + " * x)");
            } else if(type === "logarithmic") {
                var arr = [0, 0, 0, 0];
                for(var i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                var a = (arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length,
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.function(a + " + " + b + " * Math.log(x)");
            } else {
                return "TypeError: Parameter \"type\" must be either \"linear\", \"polynomial\", \"power\", \"exponential\", or \"logarithmic\".";
            }
        },
        toVector: function(arr, type, index) {
            if(index === undefined) { index = 0; }
            if(type === "vec2") {
                return Chalkboard.vec2.new(arr[index], arr[index + 1]);
            } else if(type === "vec3") {
                return Chalkboard.vec3.new(arr[index], arr[index + 1], arr[index + 2]);
            } else if(type === "vec4") {
                return Chalkboard.vec4.new(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                return "TypeError: Parameter \"type\" should be \"vec2\", \"vec3\", or \"vec4\".";
            }
        },
        toMatrix: function(arr, rows, cols) {
            var result = Chalkboard.matr.new();
            var index = 0;
            for(var i = 0; i < rows; i++) {
                result[i] = [];
                for(var j = 0; j < cols; j++) {
                    if(index < arr.length) {
                        result[i].push(arr[index]);
                    } else {
                        result[i].push(0);
                    }
                    index++;
                }
            }
            return result;
        },
        toTensor: function(arr, size) {
            if(!Array.isArray(size)) {
                size = Array.from(arguments).slice(1);
            }
            return Chalkboard.tens.resize(arr, size);
        },
        toObject: function(arr) {
            var result = {};
            for(var i = 0; i < arr.length; i++) {
                result["_" + i] = arr[i];
            }
            return result;
        },
        toString: function(arr) {
            return "[" + arr.join(", ") + "]";
        },
        print: function(arr) {
            console.log(Chalkboard.stat.toString(arr));
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
        copy: function(vec2) {
            return Object.create(Object.getPrototypeOf(vec2), Object.getOwnPropertyDescriptors(vec2));
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
            return Chalkboard.vec2.scl(Chalkboard.vec2.normalize(vec2), num);
        },
        ang: function(vec2) {
            return Chalkboard.trig.arctan2(vec2.y, vec2.x);
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
        scl: function(vec2, num) {
            return Chalkboard.vec2.new(vec2.x * num, vec2.y * num);
        },
        constrain: function(vec2, range) {
            return Chalkboard.vec2.new(Chalkboard.numb.constrain(vec2.x, range), Chalkboard.numb.constrain(vec2.y, range));
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
        proj: function(vec2_1, vec2_2) {
            return Chalkboard.vec2.scl(vec2_2, Chalkboard.vec2.dot(vec2_1, vec2_2) / Chalkboard.vec2.dot(vec2_2, vec2_2));
        },
        oproj: function(vec2_1, vec2_2) {
            return Chalkboard.vec2.sub(vec2_1, Chalkboard.vec2.proj(vec2_1, vec2_2));
        },
        reflect: function(vec2_1, vec2_2) {
            return Chalkboard.vec2.sub(vec2_1, Chalkboard.vec2.scl(vec2_2, 2 * Chalkboard.vec2.dot(vec2_1, vec2_2)));
        },
        refract: function(vec2_1, vec2_2, refractiveIndex) {
            if(refractiveIndex > 0) {
                var perp = Chalkboard.vec2.scl(Chalkboard.vec2.sub(vec2_1, Chalkboard.vec2.scl(vec2_2, Chalkboard.vec2.dot(vec2_1, vec2_2))), refractiveIndex);
                var parr = Chalkboard.vec2.scl(vec2_2, -Chalkboard.real.sqrt(1 - (refractiveIndex * refractiveIndex) * (1 - (Chalkboard.vec2.dot(vec2_1, vec2_2) * Chalkboard.vec2.dot(vec2_1, vec2_2)))));
                return Chalkboard.vec2.add(perp, parr);
            } else {
                return undefined;
            }
        },
        fromAngle: function(rad) {
            return Chalkboard.vec2.new(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        },
        fromPolar: function(vec2) {
            return Chalkboard.vec2.new(vec2.x * Chalkboard.trig.cos(vec2.y), vec2.x * Chalkboard.trig.sin(vec2.y));
        },
        fromBipolar: function(vec2) {
            return Chalkboard.vec2.new((vec2.x * vec2.x - vec2.y * vec2.y) / 4, Chalkboard.real.sqrt(16 * vec2.x * vec2.x - (vec2.x * vec2.x - vec2.y * vec2.y + 4) * (vec2.x * vec2.x - vec2.y * vec2.y + 4)));
        },
        toPolar: function(vec2) {
            return Chalkboard.vec2.new(Chalkboard.vec2.mag(vec2), Chalkboard.vec2.ang(vec2));
        },
        toBipolar: function(vec2) {
            return Chalkboard.vec2.new((vec2.x + 1) * (vec2.x + 1) + (vec2.y * vec2.y), (vec2.x - 1) * (vec2.x - 1) + (vec2.y * vec2.y));
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
        field: function(p, q) {
            return {p: p, q: q, type: "vec2field"};
        },
        fromField: function(vec2field, vec2) {
            var p = Chalkboard.real.parse("(x, y) => " + vec2field.p),
                q = Chalkboard.real.parse("(x, y) => " + vec2field.q);
            return Chalkboard.vec2.new(p(vec2.x, vec2.y), q(vec2.x, vec2.y));
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
        copy: function(vec3) {
            return Object.create(Object.getPrototypeOf(vec3), Object.getOwnPropertyDescriptors(vec3));
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
            return Chalkboard.vec3.scl(Chalkboard.vec3.normalize(vec3), num);
        },
        ang: function(vec3) {
            return [Math.acos(vec3.x / Chalkboard.vec3.mag(vec3)), Math.acos(vec3.y / Chalkboard.vec3.mag(vec3)), Math.acos(vec3.z / Chalkboard.vec3.mag(vec3))];
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
        scl: function(vec3, num) {
            return Chalkboard.vec3.new(vec3.x * num, vec3.y * num, vec3.z * num);
        },
        constrain: function(vec3, range) {
            return Chalkboard.vec3.new(Chalkboard.numb.constrain(vec3.x, range), Chalkboard.numb.constrain(vec3.y, range), Chalkboard.numb.constrain(vec3.z, range));
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
        proj: function(vec3_1, vec3_2) {
            return Chalkboard.vec3.scl(vec3_2, Chalkboard.vec3.dot(vec3_1, vec3_2) / Chalkboard.vec3.dot(vec3_2, vec3_2));
        },
        oproj: function(vec3_1, vec3_2) {
            return Chalkboard.vec3.sub(vec3_1, Chalkboard.vec3.proj(vec3_1, vec3_2));
        },
        reflect: function(vec3_1, vec3_2) {
            return Chalkboard.vec3.sub(vec3_1, Chalkboard.vec3.scl(vec3_2, 2 * Chalkboard.vec3.dot(vec3_1, vec3_2)));
        },
        refract: function(vec3_1, vec3_2, refractiveIndex) {
            if(refractiveIndex > 0) {
                var perp = Chalkboard.vec3.scl(Chalkboard.vec3.sub(vec3_1, Chalkboard.vec3.scl(vec3_2, Chalkboard.vec3.dot(vec3_1, vec3_2))), refractiveIndex);
                var parr = Chalkboard.vec3.scl(vec3_2, -Chalkboard.real.sqrt(1 - (refractiveIndex * refractiveIndex) * (1 - (Chalkboard.vec3.dot(vec3_1, vec3_2) * Chalkboard.vec3.dot(vec3_1, vec3_2)))));
                return Chalkboard.vec3.add(perp, parr);
            } else {
                return undefined;
            }
        },
        fromAngles: function(rad1, rad2) {
            return Chalkboard.vec3.new(Chalkboard.trig.cos(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad2));
        },
        fromVector: function(vec2) {
            return Chalkboard.vec3.new(vec2.x, vec2.y, 0);
        },
        fromCylindrical: function(vec3) {
            return Chalkboard.vec3.new(vec3.x * Chalkboard.trig.cos(vec3.y), vec3.x * Chalkboard.trig.sin(vec3.y), vec3.z);
        },
        fromSpherical: function(vec3) {
            return Chalkboard.vec3.new(vec3.x * Chalkboard.trig.sin(vec3.z) * Chalkboard.trig.cos(vec3.y), vec3.x * Chalkboard.trig.sin(vec3.z) * Chalkboard.trig.sin(vec3.y), vec3.x * Chalkboard.trig.cos(vec3.z));
        },
        toCylindrical: function(vec3) {
            return Chalkboard.vec3.new(Chalkboard.vec2.mag(vec3), Chalkboard.vec2.ang(vec3), vec3.z);
        },
        toSpherical: function(vec3) {
            return Chalkboard.vec3.new(Chalkboard.vec3.mag(vec3), Chalkboard.vec2.ang(vec3), Chalkboard.vec3.ang(vec3)[2]);
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
        field: function(p, q, r) {
            return {p: p, q: q, r: r, type: "vec3field"};
        },
        fromField: function(vec3field, vec3) {
            var p = Chalkboard.real.parse("(x, y, z) => " + vec3field.p),
                q = Chalkboard.real.parse("(x, y, z) => " + vec3field.q),
                r = Chalkboard.real.parse("(x, y, z) => " + vec3field.r);
            return Chalkboard.vec3.new(p(vec3.x, vec3.y, vec3.z), q(vec3.x, vec3.y, vec3.z), r(vec3.x, vec3.y, vec3.z));
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
        copy: function(vec4) {
            return Object.create(Object.getPrototypeOf(vec4), Object.getOwnPropertyDescriptors(vec4));
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
            return Chalkboard.vec4.scl(Chalkboard.vec4.normalize(vec4), num);
        },
        ang: function(vec4) {
            return [Math.acos(vec4.x / Chalkboard.vec4.mag(vec4)), Math.acos(vec4.y / Chalkboard.vec4.mag(vec4)), Math.acos(vec4.z / Chalkboard.vec4.mag(vec4)), Math.acos(vec4.w / Chalkboard.vec4.mag(vec4))];
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
        scl: function(vec4, num) {
            return Chalkboard.vec4.new(vec4.x * num, vec4.y * num, vec4.z * num, vec4.w * num);
        },
        constrain: function(vec4, range) {
            return Chalkboard.vec4.new(Chalkboard.numb.constrain(vec4.x, range), Chalkboard.numb.constrain(vec4.y, range), Chalkboard.numb.constrain(vec4.z, range), Chalkboard.numb.constrain(vec4.w, range));
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
        proj: function(vec4_1, vec4_2) {
            return Chalkboard.vec4.scl(vec4_2, Chalkboard.vec4.dot(vec4_1, vec4_2) / Chalkboard.vec4.dot(vec4_2, vec4_2));
        },
        oproj: function(vec4_1, vec4_2) {
            return Chalkboard.vec4.sub(vec4_1, Chalkboard.vec4.proj(vec4_1, vec4_2));
        },
        reflect: function(vec4_1, vec4_2) {
            return Chalkboard.vec4.sub(vec4_1, Chalkboard.vec4.scl(vec4_2, 2 * Chalkboard.vec4.dot(vec4_1, vec4_2)));
        },
        refract: function(vec4_1, vec4_2, refractiveIndex) {
            if(refractiveIndex > 0) {
                var perp = Chalkboard.vec4.scl(Chalkboard.vec4.sub(vec4_1, Chalkboard.vec4.scl(vec4_2, Chalkboard.vec4.dot(vec4_1, vec4_2))), refractiveIndex);
                var parr = Chalkboard.vec4.scl(vec4_2, -Chalkboard.real.sqrt(1 - (refractiveIndex * refractiveIndex) * (1 - (Chalkboard.vec4.dot(vec4_1, vec4_2) * Chalkboard.vec4.dot(vec4_1, vec4_2)))));
                return Chalkboard.vec4.add(perp, parr);
            } else {
                return undefined;
            }
        },
        fromVector: function(vec3) {
            return Chalkboard.vec4.new(vec3.x, vec3.y, vec3.z, 0);
        },
        fromHypercylindrical: function(vec4) {
            return Chalkboard.vec4.new(vec4.x * Chalkboard.trig.cos(vec4.y) * Chalkboard.trig.cos(vec4.z), vec4.x * Chalkboard.trig.cos(vec4.y) * Chalkboard.trig.sin(vec4.z), vec4.x * Chalkboard.trig.sin(vec4.y), vec4.w);
        },
        fromHyperspherical: function(vec4) {
            return Chalkboard.vec4.new(vec4.x * Chalkboard.trig.cos(vec4.y) * Chalkboard.trig.cos(vec4.z) * Chalkboard.trig.cos(vec4.w), vec4.x * Chalkboard.trig.cos(vec4.y) * Chalkboard.trig.sin(vec4.z) * Chalkboard.trig.cos(vec4.w), vec4.x * Chalkboard.trig.sin(vec4.y) * Chalkboard.trig.cos(vec4.w), vec4.x * Chalkboard.trig.sin(vec4.w));
        },
        toHypercylindrical: function(vec4) {
            return Chalkboard.vec4.new(Chalkboard.vec3.mag(vec4), Chalkboard.vec2.ang(vec4), Chalkboard.vec3.ang(vec4)[2], vec4.w);
        },
        toHyperspherical: function(vec4) {
            return Chalkboard.vec4.new(Chalkboard.vec4.mag(vec4), Chalkboard.vec2.ang(vec4), Chalkboard.vec3.ang(vec4)[2], Chalkboard.vec4.ang(vec4)[3]);
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
        field: function(p, q, r, s) {
            return {p: p, q: q, r: r, s: s, type: "vec4field"};
        },
        fromField: function(vec4field, vec4) {
            var p = Chalkboard.real.parse("(x, y, z, w) => " + vec4field.p),
                q = Chalkboard.real.parse("(x, y, z, w) => " + vec4field.q),
                r = Chalkboard.real.parse("(x, y, z, w) => " + vec4field.r),
                s = Chalkboard.real.parse("(x, y, z, w) => " + vec4field.s);
            return Chalkboard.vec4.new(p(vec4.x, vec4.y, vec4.z, vec4.w), q(vec4.x, vec4.y, vec4.z, vec4.w), r(vec4.x, vec4.y, vec4.z, vec4.w), s(vec4.x, vec4.y, vec4.z, vec4.w));
        },
        print: function(vec4) {
            console.log(Chalkboard.vec4.toString(vec4));
        }
    },
    matr: {
        new: function(matrix) {
            if(arguments.length === 0) {
                return [];
            } else if(Array.isArray(matrix) && Array.isArray(matrix[0])) {
                return matrix;
            } else {
                return Array.from(arguments);
            }
        },
        copy: function(matr) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result.push([]);
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i].push(matr[i][j]);
                }
            }
            return result;
        },
        rows: function(matr) {
            return matr.length;
        },
        cols: function(matr) {
            return matr[0].length;
        },
        resize: function(matr, rows, cols) {
            if(cols === undefined) {
                cols = rows;
            }
            var result = Chalkboard.matr.new();
            var flat = Chalkboard.matr.toArray(matr);
            var index = 0;
            for(var i = 0; i < rows; i++) {
                result.push([]);
                for(var j = 0; j < cols; j++) {
                    result[i].push(index < flat.length ? flat[index++] : 0);
                }
            }
            return result;
        },
        push: function(matr, type, rowORcol, elements) {
            rowORcol -= 1;
            if(type === "row") {
                matr.splice(rowORcol, 0, elements);
                return matr;
            } else if(type === "col") {
                for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 0, elements[i]);
                }
                return matr;
            } else {
                return "TypeError: Parameter \"type\" must be either \"row\" or \"col\".";
            }
        },
        pull: function(matr, type, rowORcol) {
            rowORcol -= 1;
            if(type === "row") {
                matr.splice(rowORcol, 1);
                return matr;
            } else if(type === "col") {
                for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 1);
                }
                return matr;
            } else {
                return "TypeError: Parameter \"type\" must be either \"row\" or \"col\".";
            }
        },
        fill: function(element, rows, cols) {
            if(cols === undefined) {
                cols = rows;
            }
            if(Number.isInteger(rows) && Number.isInteger(cols) && rows > 0 && cols > 0) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < rows; i++) {
                    result.push([]);
                    for(var j = 0; j < cols; j++) {
                        result[i].push(element);
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        empty: function(rows, cols) {
            if(cols === undefined) {
                cols = rows;
            }
            if(Number.isInteger(rows) && Number.isInteger(cols) && rows > 0 && cols > 0) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < rows; i++) {
                    result.push([]);
                    for(var j = 0; j < cols; j++) {
                        result[i].push(null);
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        identity: function(size) {
            if(Number.isInteger(size) && size > 0) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < size; i++) {
                    result.push(Array(size).fill(0));
                    result[i][i] = 1;
                }
                return result;
            } else {
                return undefined;
            }
        },
        exchange: function(size) {
            if(Number.isInteger(size) && size > 0) {
                var result = Chalkboard.matr.fill(0, size, size);
                for(var i = 0; i < size; i++) {
                    for(var j = 0; j < size; j++) {
                        if(i + j === size - 1) {
                            result[i][j] = 1;
                        }
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        random: function(inf, sup, rows, cols) {
            if(cols === undefined) {
                cols = rows;
            }
            if(Number.isInteger(rows) && Number.isInteger(cols) && rows > 0 && cols > 0) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < rows; i++) {
                    result.push([]);
                    for(var j = 0; j < cols; j++) {
                        result[i].push(Chalkboard.numb.random(inf, sup));
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        shift: function(size, shiftAmount) {
            shiftAmount = shiftAmount || 1;
            if(Number.isInteger(size) && size > 0) {
                var result = Chalkboard.matr.fill(0, size, size);
                for(var i = 0; i < size; i++) {
                    for(var j = 0; j < size; j++) {
                        result[i][j] = Chalkboard.numb.Kronecker(i + shiftAmount, j);
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        binomial: function(size, type) {
            type = type || "lower";
            if(Number.isInteger(size) && size > 0) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < size; i++) {
                    result.push([]);
                    for(var j = 0; j < size; j++) {
                        if(type === "lower") {
                            result[i].push(Chalkboard.numb.binomial(i, j));
                        } else if(type === "upper") {
                            result[i].push(Chalkboard.numb.binomial(j, i));
                        }
                    }
                }
                if(type === "symmetric") {
                    return Chalkboard.matr.mul(Chalkboard.matr.binomial(size, "lower"), Chalkboard.matr.binomial(size, "upper"));
                } else if(type !== "lower" && type !== "upper") {
                    return "TypeError: Parameter \"type\" must be either \"lower\", \"upper\", or \"symmetric\".";
                } else {
                    return result;
                }
            } else {
                return undefined;
            }
        },
        Hilbert: function(size) {
            if(Number.isInteger(size) && size > 0) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < size; i++) {
                    result.push([]);
                    for(var j = 0; j < size; j++) {
                        result[i].push(1 / (i + j + 1));
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        Lehmer: function(size) {
            if(Number.isInteger(size) && size > 0) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < size; i++) {
                    result.push([]);
                    for(var j = 0; j < size; j++) {
                        result[i].push(Math.min(i + 1, j + 1) / Math.max(i + 1, j + 1));
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        cofactor: function(matr, row, col) {
            return matr.slice(0, row - 1).concat(matr.slice(row)).map(function(row) {
                return row.slice(0, col - 1).concat(row.slice(col));
            });
        },
        adjugate: function(matr, row, col) {
            return Chalkboard.matr.transpose(Chalkboard.matr.cofactor(matr, row, col));
        },
        det: function(matr) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                var result = 0;
                if(Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if(Chalkboard.matr.rows(matr) === 2) {
                    return (matr[0][0] * matr[1][1]) - (matr[0][1] * matr[1][0]);
                } else {
                    for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        var cofactor = matr[0][i] * Chalkboard.matr.det(Chalkboard.matr.cofactor(matr, 1, i + 1));
                        result += i % 2 === 0 ? cofactor : -cofactor;
                    }
                    return result;
                }
            } else {
                return undefined;
            }
        },
        trace: function(matr) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                var result = 0;
                for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result += matr[i][i];
                }
                return result;
            } else {
                return undefined;
            }
        },
        rank: function(matr) {
            return Chalkboard.matr.reduce(matr).filter(function(row) {
                return row.some(function(element) {
                    return element !== 0;
                });
            }).length;
        },
        rowspace: function(matr) {
            return Chalkboard.matr.reduce(matr).filter(function(row) {
                return row.some(function(element) {
                    return element !== 0;
                });
            });
        },
        colspace: function(matr) {
            return Chalkboard.matr.transpose(Chalkboard.matr.rowspace(Chalkboard.matr.transpose(matr)));
        },
        nullspace: function(matr) {
            var augmented = matr.map(function(row) {
                return row.slice().concat(Array(Chalkboard.matr.rows(matr)).fill(0));
            });
            var reduced = Chalkboard.matr.reduce(augmented);
            return reduced.filter(function(row) {
                return row.slice(0, Chalkboard.matr.rows(matr)).every(function(element) {
                    return element === 0;
                });
            }).map(function(row) {
                return row.slice(Chalkboard.matr.rows(matr));
            });
        },
        transpose: function(matr) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.rows(matr); j++) {
                    result[i][j] = matr[j][i];
                }
            }
            return result;
        },
        invert: function(matr) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                var result = Chalkboard.matr.new();
                var augmented = Chalkboard.matr.new();
                for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    augmented.push(matr[i].concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
                    augmented[i][Chalkboard.matr.cols(matr) + i] = 1;
                }
                for(var row = 0; row < Chalkboard.matr.rows(matr); row++) {
                    var diagonal = augmented[row][row];
                    if(diagonal === 0) {
                        var max = row;
                        for(var i = row + 1; i < Chalkboard.matr.rows(matr); i++) {
                            if(Math.abs(augmented[i][row]) > Math.abs(augmented[max][row])) {
                                max = i;
                            }
                        }
                        var temp = augmented[row];
                        augmented[row] = augmented[max];
                        augmented[max] = temp;
                        diagonal = augmented[row][row];
                    }
                    for(var col = 0; col < 2 * Chalkboard.matr.cols(matr); col++) {
                        augmented[row][col] /= diagonal;
                    }
                    for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        if(i !== row) {
                            var coeff = augmented[i][row];
                            for(var j = 0; j < 2 * Chalkboard.matr.cols(matr); j++) {
                                augmented[i][j] -= coeff * augmented[row][j];
                            }
                        }
                    }
                }
                for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result.push(augmented[i].slice(Chalkboard.matr.cols(matr), 2 * Chalkboard.matr.cols(matr)));
                }
                return result;
            } else {
                return undefined;
            }
        },
        LUdecomp: function(matr) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                var L = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                    U = Chalkboard.matr.fill(0, Chalkboard.matr.rows(matr));
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    for(var i = 0; i <= j; i++) {
                        var sum = 0;
                        for(var k = 0; k < i; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        U[i][j] = matr[i][j] - sum;
                    }
                    for(var i = j + 1; i < Chalkboard.matr.rows(matr); i++) {
                        var sum = 0;
                        for(var k = 0; k < j; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        L[i][j] = (matr[i][j] - sum) / U[j][j];
                    }
                }
                return {L: L, U: U};
            } else {
                return undefined;
            }
        },
        QRdecomp: function(matr) {
            var Q = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                R = Chalkboard.matr.copy(matr);
            for(var j = 0; j < Math.min(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)) - (Chalkboard.matr.rows(matr) > Chalkboard.matr.cols(matr) ? 0 : 1); j++) {
                var norm = 0;
                for(var i = j; i < Chalkboard.matr.rows(matr); i++) {
                    norm += R[i][j] * R[i][j];
                }
                norm = Chalkboard.real.sqrt(norm);
                var v = [];
                v[0] = norm - R[j][j];
                var normalizer = v[0] * v[0];
                for(var i = 1; i < Chalkboard.matr.rows(matr) - j; i++) {
                    v[i] = -R[i + j][j];
                    normalizer += v[i] * v[i];
                }
                normalizer = 1 / Chalkboard.real.sqrt(normalizer);
                for(var i = 0; i < v.length; i++) {
                    v[i] *= normalizer;
                }
                R[j][j] = norm;
                for(var i = j + 1; i < Chalkboard.matr.rows(R); i++) {
                    R[i][j] = 0;
                }
                for(var k = j + 1; k < Chalkboard.matr.cols(R); k++) {
                    var dot = 0;
                    for(var i = 0; i < v.length; i++) {
                        dot += v[i] * R[i + j][k];
                    }
                    dot *= 2;
                    for(var i = 0; i < v.length; i++) {
                        R[i + j][k] -= dot * v[i];
                    }
                }
                for(var k = 0; k < Chalkboard.matr.cols(Q); k++) {
                    var dot = 0;
                    for(var i = 0; i < v.length; i++) {
                        dot += v[i] * Q[k][i + j];
                    }
                    dot *= 2;
                    for(var i = 0; i < v.length; i++) {
                        Q[k][i + j] -= dot * v[i];
                    }
                }
            }
            return {Q: Q, R: R};
        },
        zero: function(matr) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = 0;
                }
            }
            return result;
        },
        negate: function(matr) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = -matr[i][j];
                }
            }
            return result;
        },
        reciprocate: function(matr) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = 1 / matr[i][j];
                }
            }
            return result;
        },
        absolute: function(matr) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.abs(matr[i][j]);
                }
            }
            return result;
        },
        round: function(matr) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.round(matr[i][j]);
                }
            }
            return result;
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
        translator: function(vec) {
            if(vec.type === "vec2") {
                return Chalkboard.matr.new([1, 0, vec.x], [0, 1, vec.y], [0, 0, 1]);
            } else if(vec.type === "vec3") {
                return Chalkboard.matr.new([1, 0, 0, vec.x], [0, 1, 0, vec.y], [0, 0, 1, vec.z], [0, 0, 0, 1]);
            } else if(vec.type === "vec4") {
                return Chalkboard.matr.new([1, 0, 0, 0, vec.x], [0, 1, 0, 0, vec.y], [0, 0, 1, 0, vec.z], [0, 0, 0, 1, vec.w], [0, 0, 0, 0, 1]);
            } else {
                return "TypeError: Parameter \"vec\" should be \"vec2\", \"vec3\", or \"vec4\".";
            }
        },
        rotator: function(radx, rady, radz) {
            if(rady === undefined && radz === undefined) {
                return Chalkboard.matr.new([Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]);
            } else {
                var matr_x = Chalkboard.matr.new([1, 0, 0], [0, Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [0, Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]),
                    matr_y = Chalkboard.matr.new([Chalkboard.trig.cos(rady), 0, Chalkboard.trig.sin(rady)], [0, 1, 0], [-Chalkboard.trig.sin(rady), 0, Chalkboard.trig.cos(rady)]),
                    matr_z = Chalkboard.matr.new([Chalkboard.trig.cos(radz), -Chalkboard.trig.sin(radz), 0], [Chalkboard.trig.sin(radz), Chalkboard.trig.cos(radz), 0], [0, 0, 1]);
                return Chalkboard.matr.mul(matr_x, Chalkboard.matr.mul(matr_y, matr_z));
            }
        },
        scl: function(matr, num) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = matr[i][j] * num;
                }
            }
            return result;
        },
        constrain: function(matr, range) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Chalkboard.numb.constrain(matr[i][j], range);
                }
            }
            return result;
        },
        concat: function(matr_1, matr_2, type) {
            type = type || "row";
            if(type === "row") {
                if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2)) {
                    return Chalkboard.matr.new(matr_1.concat(matr_2));
                } else {
                    return undefined;
                }
            } else if(type === "col") {
                if(Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                    var result = Chalkboard.matr.new();
                    for(var i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                        result.push(matr_1[i].concat(matr_2[i]));
                    }
                    return result;
                } else {
                    return undefined;
                }
            } else {
                return "TypeError: Parameter \"type\" should be either \"row\" or \"col\".";
            }
        },
        add: function(matr_1, matr_2) {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(var j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                        result[i][j] = matr_1[i][j] + matr_2[i][j];
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        sub: function(matr_1, matr_2) {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(var j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                        result[i][j] = matr_1[i][j] - matr_2[i][j];
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        mul: function(matr_1, matr_2) {
            if(Chalkboard.matr.cols(matr_1) === Chalkboard.matr.rows(matr_2)) {
                var result = Chalkboard.matr.new();
                for(var i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(var j = 0; j < Chalkboard.matr.cols(matr_2); j++) {
                        result[i][j] = 0;
                        for(var k = 0; k < Chalkboard.matr.cols(matr_1); k++) {
                            result[i][j] += matr_1[i][k] * matr_2[k][j];
                        }
                    }
                }
                return result;
            } else {
                return undefined;
            }
        },
        mulvec: function(matr, vec) {
            if(vec.type === "vec2") {
                if(Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vec2.toMatrix(vec)), "vec2");
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vec2.toMatrix(vec));
                }
            } else if(vec.type === "vec3") {
                if(Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vec3.toMatrix(vec)), "vec3");
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vec2.toMatrix(vec));
                }
            } else if(vec.type === "vec4") {
                if(Chalkboard.matr.rows(matr) === 4) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vec4.toMatrix(vec)), "vec4");
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vec2.toMatrix(vec));
                }
            } else {
                return "TypeError: Parameter \"vec\" should be \"vec2\", \"vec3\", or \"vec4\".";
            }
        },
        pow: function(matr, num) {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if(Number.isInteger(num) && num >= 0) {
                    if(num === 0) {
                        return Chalkboard.matr.identity(Chalkboard.matr.rows(matr));
                    } else {
                        var result = matr;
                        for(var i = 1; i < num; i++) {
                            result = Chalkboard.matr.mul(matr, result);
                        }
                        return result;
                    }
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        },
        addKronecker: function(matr_1, matr_2) {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.cols(matr_1) && Chalkboard.matr.rows(matr_2) === Chalkboard.matr.cols(matr_2)) {
                return Chalkboard.matr.add(Chalkboard.matr.mulKronecker(matr_1, Chalkboard.matr.identity(Chalkboard.matr.rows(matr_1))), Chalkboard.matr.mulKronecker(Chalkboard.matr.identity(Chalkboard.matr.rows(matr_2)), matr_2));
            } else {
                return undefined;
            }
        },
        mulKronecker: function(matr_1, matr_2) {
            var result = Chalkboard.matr.new();
            for(var i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                for(var j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                    for(var k = 0; k < Chalkboard.matr.rows(matr_2); k++) {
                        for(var l = 0; l < Chalkboard.matr.cols(matr_2); l++) {
                            if(!result[i * Chalkboard.matr.rows(matr_2) + k]) {
                                result[i * Chalkboard.matr.rows(matr_2) + k] = [];
                            }
                            result[i * Chalkboard.matr.rows(matr_2) + k][j * Chalkboard.matr.cols(matr_2) + l] = matr_1[i][j] * matr_2[k][l];
                        }
                    }
                }
            }
            return result;
        },
        reduce: function(matr) {
            var lead = 0;
            for(var row = 0; row < Chalkboard.matr.rows(matr); row++) {
                if(lead >= Chalkboard.matr.cols(matr)) {
                    break;
                }
                var i = row;
                while(matr[i][lead] === 0) {
                    i++;
                    if(i === Chalkboard.matr.rows(matr)) {
                        i = row;
                        lead++;
                        if(Chalkboard.matr.cols(matr) === lead) {
                            return matr;
                        }
                    }
                }
                var temp = matr[i];
                matr[i] = matr[row];
                matr[row] = temp;
                var scl = matr[row][lead];
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    matr[row][j] /= scl;
                }
                for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    if(i !== row) {
                        var coeff = matr[i][lead];
                        for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            matr[i][j] -= coeff * matr[row][j];
                        }
                    }
                }
                lead++;
            }
            return matr;
        },
        solve: function(matr_A, matr_B) {
            if(Chalkboard.matr.rows(matr_A) === Chalkboard.matr.cols(matr_A)) {
                if(Chalkboard.matr.rows(matr_A) === Chalkboard.matr.rows(matr_B)) {
                    if(Chalkboard.matr.det(matr_A) !== 0) {
                        return Chalkboard.matr.mul(Chalkboard.matr.invert(matr_A), matr_B);
                    } else {
                        return undefined;
                    }
                } else {
                    return undefined;
                }
            } else {
                return undefined;
            }
        },
        toVector: function(matr, vec, type, rowORcol) {
            type = type || "col";
            rowORcol = rowORcol || 1;
            rowORcol -= 1;
            if(vec === "vec2") {
                if(type === "col") {
                    return Chalkboard.vec2.new(matr[0][rowORcol], matr[1][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vec2.new(matr[rowORcol][0], matr[rowORcol][1]);
                } else {
                    return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
                }
            } else if(vec === "vec3") {
                if(type === "col") {
                    return Chalkboard.vec3.new(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vec3.new(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2]);
                } else {
                    return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
                }
            } else if(vec === "vec4") {
                if(type === "col") {
                    return Chalkboard.vec4.new(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol], matr[3][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vec4.new(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2], matr[rowORcol][3]);
                } else {
                    return "TypeError: Parameter \"type\" should be \"row\" or \"col\".";
                }
            } else {
                return "TypeError: Parameter \"vec\" should be \"vec2\", \"vec3\", or \"vec4\".";
            }
        },
        toTensor: function(matr, size) {
            if(!Array.isArray(size)) {
                size = Array.from(arguments).slice(1);
            }
            return Chalkboard.tens.resize(matr, size);
        },
        toArray: function(matr) {
            var result = [];
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result.push(matr[i][j]);
                }
            }
            return result;
        },
        toObject: function(matr) {
            var result = {};
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result["i" + (i + 1)] = {};
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result["i" + (i + 1)]["j" + (j + 1)] = matr[i][j];
                }
            }
            return result;
        },
        toString: function(matr) {
            var result = "";
            for(var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result += "[ ";
                for(var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result += matr[i][j].toString() + " ";
                }
                result = result.trimEnd() + " ]\n";
            }
            return result;
        },
        print: function(matr) {
            console.log(Chalkboard.matr.toString(matr));
        }
    },
    tens: {
        new: function(tensor) {
            if(arguments.length === 0) {
                return [];
            } else if(arguments.length === 1 && Array.isArray(arguments[0])) {
                tensor = arguments[0];
            } else {
                tensor = Array.from(arguments);
            }
            var newNDArray = function(arr) {
                return arr.map(function(subarr) {
                    if(Array.isArray(subarr)) {
                        return newNDArray(subarr);
                    } else {
                        return subarr;
                    }
                });
            };
            return newNDArray(tensor);
        },
        copy: function(tens) {
            if(Array.isArray(tens)) {
                var result = Chalkboard.tens.new();
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.copy(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        },
        rank: function(tens) {
            if(Array.isArray(tens)) {
                var result = 0;
                for(var i = 0; i < tens.length; i++) {
                    result = Math.max(result, Chalkboard.tens.rank(tens[i]));
                }
                return result + 1;
            } else {
                return 0;
            }
        },
        size: function(tens) {
            if(Array.isArray(tens)) {
                var result = [tens.length];
                if(Array.isArray(tens[0])) {
                    result = result.concat(Chalkboard.tens.size(tens[0]));
                }
                return result;
            } else {
                return [];
            }
        },
        resize: function(tens, size) {
            if(!Array.isArray(size)) {
                size = Array.from(arguments).slice(1);
            }
            var result = Chalkboard.tens.fill(0, size);
            var refill = function(arr1, arr2) {
                for(var i = 0; i < arr2.length; i++) {
                    if(Array.isArray(arr2[i])) {
                        refill(arr1, arr2[i]);
                    } else {
                        arr2[i] = arr1.length > 0 ? arr1.shift() : 0;
                    }
                }
            };
            refill(Chalkboard.tens.toArray(tens), result);
            return result;
        },
        push: function(tens, rank, index, elements) {
            if(rank === 0) {
                tens.splice(index, 0, elements);
                return tens;
            } else {
                for(var i = 0; i < tens.length; i++) {
                    Chalkboard.tens.push(tens[i], rank - 1, index, elements[i]);
                }
                return tens;
            }
        },
        pull: function(tens, rank, index) {
            if(rank === 0) {
                tens.splice(index, 1);
                return tens;
            } else {
                for(var i = 0; i < tens.length; i++) {
                    Chalkboard.tens.pull(tens[i], rank - 1, index);
                }
                return tens;
            }
        },
        fill: function(element, size) {
            if(!Array.isArray(size)) {
                size = Array.from(arguments).slice(1);
            }
            var newNDArray = function(size) {
                if(size.length === 0) {
                    return element;
                }
                var curr = size[0];
                var rest = size.slice(1);
                var result = [];
                for(var i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            }
            return newNDArray(size);
        },
        empty: function(size) {
            if(!Array.isArray(size)) {
                size = Array.from(arguments);
            }
            var newNDArray = function(size) {
                if(size.length === 0) {
                    return null;
                }
                var curr = size[0];
                var rest = size.slice(1);
                var result = [];
                for(var i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            }
            return newNDArray(size);
        },
        random: function(inf, sup, size) {
            if(!Array.isArray(size)) {
                size = Array.from(arguments).slice(2);
            }
            var newNDArray = function(size) {
                if(size.length === 0) {
                    return Chalkboard.numb.random(inf, sup);
                }
                var curr = size[0];
                var rest = size.slice(1);
                var result = [];
                for(var i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            }
            return newNDArray(size);
        },
        contract: function(tens) {
            if(Chalkboard.tens.rank(tens) > 2) {
                return Chalkboard.tens.resize(tens, Chalkboard.tens.size(tens)[0], Chalkboard.tens.size(tens).slice(1).reduce(function(a, b) { return a * b; }) / Chalkboard.tens.size(tens)[0]);
            } else if(Chalkboard.tens.rank(tens) === 2) {
                return Chalkboard.matr.trace(tens);
            }
        },
        transpose: function(tens) {
            return Chalkboard.tens.resize(tens, Chalkboard.tens.size(tens).reverse());
        },
        zero: function(tens) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.zero(tens[i]);
                }
                return result;
            } else {
                return 0;
            }
        },
        negate: function(tens) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.negate(tens[i]);
                }
                return result;
            } else {
                return -tens;
            }
        },
        reciprocate: function(tens) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.reciprocate(tens[i]);
                }
                return result;
            } else {
                return 1 / tens;
            }
        },
        absolute: function(tens) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.absolute(tens[i]);
                }
                return result;
            } else {
                return Math.abs(tens);
            }
        },
        round: function(tens) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.round(tens[i]);
                }
                return result;
            } else {
                return Math.round(tens);
            }
        },
        scl: function(tens, num) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.scl(tens[i], num);
                }
                return result;
            } else {
                return tens * num;
            }
        },
        constrain: function(tens, range) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.constrain(tens[i], range);
                }
                return result;
            } else {
                return Chalkboard.numb.constrain(tens, range);
            }
        },
        concat: function(tens_1, tens_2, rank) {
            rank = rank || 1;
            var concatAtRank = function(arr1, arr2, currentRank) {
                if(currentRank = rank) {
                    return Chalkboard.tens.new(arr1.concat(arr2));
                }
                return arr1.map(function(element, index) {
                    return concatAtRank(element, arr2[index], currentRank);
                });
            }
            return concatAtRank(tens_1, tens_2, 1);
        },
        add: function(tens_1, tens_2) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(var i = 0; i < Math.max(tens_1.length, tens_2.length); i++) {
                    result[i] = Chalkboard.tens.add(tens_1[i] !== undefined ? tens_1[i] : 0, tens_2[i] !== undefined ? tens_2[i] : 0);
                }
                return result;
            } else {
                return tens_1 + tens_2;
            }
        },
        sub: function(tens_1, tens_2) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(var i = 0; i < Math.max(tens_1.length, tens_2.length); i++) {
                    result[i] = Chalkboard.tens.sub(tens_1[i] !== undefined ? tens_1[i] : 0, tens_2[i] !== undefined ? tens_2[i] : 0);
                }
                return result;
            } else {
                return tens_1 - tens_2;
            }
        },
        mul: function(tens_1, tens_2) {
            var result = Chalkboard.tens.new();
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(var i = 0; i < tens_1.length; i++) {
                    var subarr = Chalkboard.tens.new();
                    for(var j = 0; j < tens_2.length; j++) {
                        subarr[j] = Chalkboard.tens.mul(tens_1[i], tens_2[j]);
                    }
                    result.push(subarr);
                }
                return result;
            } else {
                return tens_1 * tens_2;
            }
        },
        toVector: function(tens, type, index) {
            if(index === undefined) { index = 0; }
            var arr = Chalkboard.tens.toArray(tens);
            if(type === "vec2") {
                return Chalkboard.vec2.new(arr[index], arr[index + 1]);
            } else if(type === "vec3") {
                return Chalkboard.vec3.new(arr[index], arr[index + 1], arr[index + 2]);
            } else if(type === "vec4") {
                return Chalkboard.vec4.new(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                return "TypeError: Parameter \"type\" should be \"vec2\", \"vec3\", or \"vec4\".";
            }
        },
        toMatrix: function(tens) {
            var result = Chalkboard.matr.new();
            var flatten = function(tens, result) {
                for(var i = 0; i < tens.length; i++) {
                    if(Array.isArray(tens[i])) {
                        flatten(tens[i], result);
                    } else {
                        result.push(tens[i]);
                    }
                }
            }
            var matr = Chalkboard.matr.new();
            flatten(tens, matr);
            var rows = tens.length || 1;
            for(var j = 0; j < rows; j++) {
                result.push(matr.slice(j * matr.length / rows, (j + 1) * matr.length / rows));
            }
            return result;
        },
        toArray: function(tens) {
            var result = [];
            var flatten = function(tens) {
                for(var i = 0; i < tens.length; i++) {
                    if(Array.isArray(tens[i])) {
                        flatten(tens[i]);
                    } else {
                        result.push(tens[i]);
                    }
                }
            }
            flatten(tens);
            return result;
        },
        toObject: function(tens) {
            if(Array.isArray(tens)) {
                var result = {};
                for(var i = 0; i < tens.length; i++) {
                    result["_" + (i + 1)] = Chalkboard.tens.toObject(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        },
        toString: function(tens, indentation) {
            if(indentation === undefined) { indentation = 0; }
            if(Array.isArray(tens[0])) {
                var result = "\t".repeat(indentation) + "[\n";
                for(var i = 0; i < tens.length; i++) {
                    result += Chalkboard.tens.toString(tens[i], indentation + 1);
                }
                result += "\t".repeat(indentation) + "]\n";
                return result;
            } else {
                var result = "\t".repeat(indentation) + "[ ";
                for(var i = 0; i < tens.length; i++) {
                    result += tens[i].toString() + " ";
                }
                result += "]\n";
                return result;
            }
        },
        print: function(tens) {
            return console.log(Chalkboard.tens.toString(tens));
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
            var h = 0.000000001;
            if(func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - f(val)) / h;
            } else if(func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - f(val)) / h;
            } else if(func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - r(val)) / h;
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vec2.new((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h);
                } else if(func.definition.length === 3) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vec3.new((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h, (z(val + h) - z(val)) / h);
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\", \"inve\", \"pola\", or \"curv\".";
            }
        },
        d2fdx2: function(func, val) {
            var h = 0.00001;
            if(func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            } else if(func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            } else if(func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - 2 * r(val) + r(val - h)) / (h * h);
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vec2.new((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h));
                } else if(func.definition.length === 3) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vec3.new((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h), (z(val + h) - 2 * z(val) + z(val - h)) / (h * h));
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\", \"inve\", \"pola\", or \"curv\".";
            }
        },
        tangent: function(func, val) {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    return Chalkboard.vec2.normalize(Chalkboard.calc.dfdx(func, val));
                } else if(func.definition.length === 3) {
                    return Chalkboard.vec3.normalize(Chalkboard.calc.dfdx(func, val));
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"curv\".";
            }
        },
        normal: function(func, val) {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    return Chalkboard.vec2.normalize(Chalkboard.calc.d2fdx2(func, val));
                } else if(func.definition.length === 3) {
                    return Chalkboard.vec3.normalize(Chalkboard.calc.d2fdx2(func, val));
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"curv\".";
            }
        },
        binormal: function(func, val) {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    return Chalkboard.vec2.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                } else if(func.definition.length === 3) {
                    return Chalkboard.vec3.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"curv\".";
            }
        },
        dfdv: function(func, vec2_pos, vec2_dir) {
            if(func.type === "mult") {
                return Chalkboard.vec2.dot(Chalkboard.calc.grad(func, vec2_pos), Chalkboard.vec2.normalize(vec2_dir));
            } else {
                return "TypeError: Parameter \"func\" must be of type \"mult\".";
            }
        },
        dfrdt: function(func_1, func_2, val) {
            if(func_1.type === "mult") {
                if(func_2.type === "curv") {
                    if(func_2.definition.length === 2) {
                        var dfdx = Chalkboard.calc.grad(func_1, Chalkboard.real.val(func_2, val)).x,
                            dfdy = Chalkboard.calc.grad(func_1, Chalkboard.real.val(func_2, val)).y,
                            dxdt = Chalkboard.calc.dfdx(func_2, val).x,
                            dydt = Chalkboard.calc.dfdx(func_2, val).y;
                        return dfdx * dxdt + dfdy * dydt;
                    }
                } else {
                    return "TypeError: Parameter \"func_2\" must be of type \"curv\".";
                }
            } else {
                return "TypeError: Parameter \"func_1\" must be of type \"mult\".";
            }
        },
        grad: function(funcORvecfield, vec) {
            var h = 0.000000001;
            if(funcORvecfield.type === "surf") {
                var x = Chalkboard.real.parse("(s, t) => " + funcORvecfield.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + funcORvecfield.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + funcORvecfield.definition[2]);
                var dxds = (x(vec.x + h, vec.y) - x(vec.x, vec.y)) / h,
                    dxdt = (x(vec.x, vec.y + h) - x(vec.x, vec.y)) / h,
                    dyds = (y(vec.x + h, vec.y) - y(vec.x, vec.y)) / h,
                    dydt = (y(vec.x, vec.y + h) - y(vec.x, vec.y)) / h,
                    dzds = (z(vec.x + h, vec.y) - z(vec.x, vec.y)) / h, 
                    dzdt = (z(vec.x, vec.y + h) - z(vec.x, vec.y)) / h;
                return Chalkboard.matr.new([dxds, dxdt],
                                           [dyds, dydt],
                                           [dzds, dzdt]);
            } else if(funcORvecfield.type === "mult") {
                var f = Chalkboard.real.parse("(x, y) => " + funcORvecfield.definition);
                var dfdx = (f(vec.x + h, vec.y) - f(vec.x, vec.y)) / h,
                    dfdy = (f(vec.x, vec.y + h) - f(vec.x, vec.y)) / h;
                return Chalkboard.vec2.new(dfdx, dfdy);
            } else if(funcORvecfield.type === "vec2field") {
                var p = Chalkboard.real.parse("(x, y) => " + funcORvecfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + funcORvecfield.q);
                var dpdx = (p(vec.x + h, vec.y) - p(vec.x, vec.y)) / h,
                    dpdy = (p(vec.x, vec.y + h) - p(vec.x, vec.y)) / h,
                    dqdx = (q(vec.x + h, vec.y) - q(vec.x, vec.y)) / h,
                    dqdy = (q(vec.x, vec.y + h) - q(vec.x, vec.y)) / h;
                return Chalkboard.matr.new([dpdx, dpdy],
                                           [dqdx, dqdy]);
            } else if(funcORvecfield.type === "vec3field") {
                var p = Chalkboard.real.parse("(x, y, z) => " + funcORvecfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + funcORvecfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + funcORvecfield.r);
                var dpdx = (p(vec.x + h, vec.y, vec.z) - p(vec.x, vec.y, vec.z)) / h,
                    dpdy = (p(vec.x, vec.y + h, vec.z) - p(vec.x, vec.y, vec.z)) / h,
                    dpdz = (p(vec.x, vec.y, vec.z + h) - p(vec.x, vec.y, vec.z)) / h,
                    dqdx = (q(vec.x + h, vec.y, vec.z) - q(vec.x, vec.y, vec.z)) / h,
                    dqdy = (q(vec.x, vec.y + h, vec.z) - q(vec.x, vec.y, vec.z)) / h,
                    dqdz = (q(vec.x, vec.y, vec.z + h) - q(vec.x, vec.y, vec.z)) / h,
                    drdx = (r(vec.x + h, vec.y, vec.z) - r(vec.x, vec.y, vec.z)) / h,
                    drdy = (r(vec.x, vec.y + h, vec.z) - r(vec.x, vec.y, vec.z)) / h,
                    drdz = (r(vec.x, vec.y, vec.z + h) - r(vec.x, vec.y, vec.z)) / h;
                return Chalkboard.matr.new([dpdx, dpdy, dpdz],
                                           [dqdx, dqdy, dqdz],
                                           [drdx, drdy, drdz]);
            } else if(funcORvecfield.type === "vec4field") {
                var p = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.s);
                var dpdx = (p(vec.x + h, vec.y, vec.z, vec.w) - p(vec.x, vec.y, vec.z, vec.w)) / h,
                    dpdy = (p(vec.x, vec.y + h, vec.z, vec.w) - p(vec.x, vec.y, vec.z, vec.w)) / h,
                    dpdz = (p(vec.x, vec.y, vec.z + h, vec.w) - p(vec.x, vec.y, vec.z, vec.w)) / h,
                    dpdw = (p(vec.x, vec.y, vec.z, vec.w + h) - p(vec.x, vec.y, vec.z, vec.w)) / h,
                    dqdx = (q(vec.x + h, vec.y, vec.z, vec.w) - q(vec.x, vec.y, vec.z, vec.w)) / h,
                    dqdy = (q(vec.x, vec.y + h, vec.z, vec.w) - q(vec.x, vec.y, vec.z, vec.w)) / h,
                    dqdz = (q(vec.x, vec.y, vec.z + h, vec.w) - q(vec.x, vec.y, vec.z, vec.w)) / h,
                    dqdw = (q(vec.x, vec.y, vec.z, vec.w + h) - q(vec.x, vec.y, vec.z, vec.w)) / h,
                    drdx = (r(vec.x + h, vec.y, vec.z, vec.w) - r(vec.x, vec.y, vec.z, vec.w)) / h,
                    drdy = (r(vec.x, vec.y + h, vec.z, vec.w) - r(vec.x, vec.y, vec.z, vec.w)) / h,
                    drdz = (r(vec.x, vec.y, vec.z + h, vec.w) - r(vec.x, vec.y, vec.z, vec.w)) / h,
                    drdw = (r(vec.x, vec.y, vec.z, vec.w + h) - r(vec.x, vec.y, vec.z, vec.w)) / h,
                    dsdx = (s(vec.x + h, vec.y, vec.z, vec.w) - s(vec.x, vec.y, vec.z, vec.w)) / h,
                    dsdy = (s(vec.x, vec.y + h, vec.z, vec.w) - s(vec.x, vec.y, vec.z, vec.w)) / h,
                    dsdz = (s(vec.x, vec.y, vec.z + h, vec.w) - s(vec.x, vec.y, vec.z, vec.w)) / h,
                    dsdw = (s(vec.x, vec.y, vec.z, vec.w + h) - s(vec.x, vec.y, vec.z, vec.w)) / h;
                return Chalkboard.matr.new([dpdx, dpdy, dpdz, dpdw],
                                           [dqdx, dqdy, dqdz, dqdw],
                                           [drdx, drdy, drdz, drdw],
                                           [dsdx, dsdy, dsdz, dsdw]);
            } else {
                return "TypeError: Parameter \"funcORvecfield\" must be of type \"surf\", \"mult\", \"vec2field\", \"vec3field\", or \"vec4field\".";
            }
        },
        grad2: function(funcORvecfield, vec) {
            var h = 0.00001;
            if(funcORvecfield.type === "surf") {
                var x = Chalkboard.real.parse("(s, t) => " + funcORvecfield.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + funcORvecfield.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + funcORvecfield.definition[2]);
                var d2xds2 = (x(vec.x + h, vec.y) - 2 * x(vec.x, vec.y) + x(vec.x - h, vec.y)) / (h * h),
                    d2xdt2 = (x(vec.x, vec.y + h) - 2 * x(vec.x, vec.y) + x(vec.x, vec.y - h)) / (h * h),
                    d2yds2 = (y(vec.x + h, vec.y) - 2 * y(vec.x, vec.y) + y(vec.x - h, vec.y)) / (h * h),
                    d2ydt2 = (y(vec.x, vec.y + h) - 2 * y(vec.x, vec.y) + y(vec.x, vec.y - h)) / (h * h),
                    d2zds2 = (z(vec.x + h, vec.y) - 2 * z(vec.x, vec.y) + z(vec.x - h, vec.y)) / (h * h), 
                    d2zdt2 = (z(vec.x, vec.y + h) - 2 * z(vec.x, vec.y) + z(vec.x, vec.y - h)) / (h * h);
                return Chalkboard.matr.new([d2xds2, d2xdt2],
                                           [d2yds2, d2ydt2],
                                           [d2zds2, d2zdt2]);
            } else if(funcORvecfield.type === "mult") {
                var f = Chalkboard.real.parse("(x, y) => " + funcORvecfield.definition);
                var d2fdx2 = (f(vec.x + h, vec.y) - 2 * f(vec.x, vec.y) + f(vec.x - h, vec.y)) / (h * h),
                    d2fdy2 = (f(vec.x, vec.y + h) - 2 * f(vec.x, vec.y) + f(vec.x, vec.y - h)) / (h * h),
                    d2fdxdy = (f(vec.x + h, vec.y + h) - f(vec.x + h, vec.y) - f(vec.x, vec.y + h) + f(vec.x, vec.y)) / (h * h),
                    d2fdydx = (f(vec.x + h, vec.y + h) - f(vec.x, vec.y + h) - f(vec.x + h, vec.y) + f(vec.x, vec.y)) / (h * h);
                return Chalkboard.matr.new([d2fdx2, d2fdxdy],
                                           [d2fdydx, d2fdy2]);
            } else if(funcORvecfield.type === "vec2field") {
                var p = Chalkboard.real.parse("(x, y) => " + funcORvecfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + funcORvecfield.q);
                var d2pdx2 = (p(vec.x + h, vec.y) - 2 * p(vec.x, vec.y) + p(vec.x - h, vec.y)) / (h * h),
                    d2pdy2 = (p(vec.x, vec.y + h) - 2 * p(vec.x, vec.y) + p(vec.x, vec.y - h)) / (h * h),
                    d2qdx2 = (q(vec.x + h, vec.y) - 2 * q(vec.x, vec.y) + q(vec.x - h, vec.y)) / (h * h),
                    d2qdy2 = (q(vec.x, vec.y + h) - 2 * q(vec.x, vec.y) + q(vec.x, vec.y - h)) / (h * h);
                return Chalkboard.matr.new([d2pdx2, d2pdy2],
                                           [d2qdx2, d2qdy2]);
            } else if(funcORvecfield.type === "vec3field") {
                var p = Chalkboard.real.parse("(x, y, z) => " + funcORvecfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + funcORvecfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + funcORvecfield.r);
                var d2pdx2 = (p(vec.x + h, vec.y, vec.z) - 2 * p(vec.x, vec.y, vec.z) + p(vec.x - h, vec.y, vec.z)) / (h * h),
                    d2pdy2 = (p(vec.x, vec.y + h, vec.z) - 2 * p(vec.x, vec.y, vec.z) + p(vec.x, vec.y - h, vec.z)) / (h * h),
                    d2pdz2 = (p(vec.x, vec.y, vec.z + h) - 2 * p(vec.x, vec.y, vec.z) + p(vec.x, vec.y, vec.z - h)) / (h * h),
                    d2qdx2 = (q(vec.x + h, vec.y, vec.z) - 2 * q(vec.x, vec.y, vec.z) + q(vec.x - h, vec.y, vec.z)) / (h * h),
                    d2qdy2 = (q(vec.x, vec.y + h, vec.z) - 2 * q(vec.x, vec.y, vec.z) + q(vec.x, vec.y - h, vec.z)) / (h * h),
                    d2qdz2 = (q(vec.x, vec.y, vec.z + h) - 2 * q(vec.x, vec.y, vec.z) + q(vec.x, vec.y, vec.z - h)) / (h * h),
                    d2rdx2 = (r(vec.x + h, vec.y, vec.z) - 2 * r(vec.x, vec.y, vec.z) + r(vec.x - h, vec.y, vec.z)) / (h * h),
                    d2rdy2 = (r(vec.x, vec.y + h, vec.z) - 2 * r(vec.x, vec.y, vec.z) + r(vec.x, vec.y - h, vec.z)) / (h * h),
                    d2rdz2 = (r(vec.x, vec.y, vec.z + h) - 2 * r(vec.x, vec.y, vec.z) + r(vec.x, vec.y, vec.z - h)) / (h * h);
                return Chalkboard.matr.new([d2pdx2, d2pdy2, d2pdz2],
                                           [d2qdx2, d2qdy2, d2qdz2],
                                           [d2rdx2, d2rdy2, d2rdz2]);
            } else if(funcORvecfield.type === "vec4field") {
                var p = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + funcORvecfield.s);
                var d2pdx2 = (p(vec.x + h, vec.y, vec.z, vec.w) - 2 * p(vec.x, vec.y, vec.z, vec.w) + p(vec.x - h, vec.y, vec.z, vec.w)) / (h * h),
                    d2pdy2 = (p(vec.x, vec.y + h, vec.z, vec.w) - 2 * p(vec.x, vec.y, vec.z, vec.w) + p(vec.x, vec.y - h, vec.z, vec.w)) / (h * h),
                    d2pdz2 = (p(vec.x, vec.y, vec.z + h, vec.w) - 2 * p(vec.x, vec.y, vec.z, vec.w) + p(vec.x, vec.y, vec.z - h, vec.w)) / (h * h),
                    d2pdw2 = (p(vec.x, vec.y, vec.z, vec.w + h) - 2 * p(vec.x, vec.y, vec.z, vec.w) + p(vec.x, vec.y, vec.z, vec.w - h)) / (h * h),
                    d2qdx2 = (q(vec.x + h, vec.y, vec.z, vec.w) - 2 * q(vec.x, vec.y, vec.z, vec.w) + q(vec.x - h, vec.y, vec.z, vec.w)) / (h * h),
                    d2qdy2 = (q(vec.x, vec.y + h, vec.z, vec.w) - 2 * q(vec.x, vec.y, vec.z, vec.w) + q(vec.x, vec.y - h, vec.z, vec.w)) / (h * h),
                    d2qdz2 = (q(vec.x, vec.y, vec.z + h, vec.w) - 2 * q(vec.x, vec.y, vec.z, vec.w) + q(vec.x, vec.y, vec.z - h, vec.w)) / (h * h),
                    d2qdw2 = (q(vec.x, vec.y, vec.z, vec.w + h) - 2 * q(vec.x, vec.y, vec.z, vec.w) + q(vec.x, vec.y, vec.z, vec.w - h)) / (h * h),
                    d2rdx2 = (r(vec.x + h, vec.y, vec.z, vec.w) - 2 * r(vec.x, vec.y, vec.z, vec.w) + r(vec.x - h, vec.y, vec.z, vec.w)) / (h * h),
                    d2rdy2 = (r(vec.x, vec.y + h, vec.z, vec.w) - 2 * r(vec.x, vec.y, vec.z, vec.w) + r(vec.x, vec.y - h, vec.z, vec.w)) / (h * h),
                    d2rdz2 = (r(vec.x, vec.y, vec.z + h, vec.w) - 2 * r(vec.x, vec.y, vec.z, vec.w) + r(vec.x, vec.y, vec.z - h, vec.w)) / (h * h),
                    d2rdw2 = (r(vec.x, vec.y, vec.z, vec.w + h) - 2 * r(vec.x, vec.y, vec.z, vec.w) + r(vec.x, vec.y, vec.z, vec.w - h)) / (h * h),
                    d2sdx2 = (s(vec.x + h, vec.y, vec.z, vec.w) - 2 * s(vec.x, vec.y, vec.z, vec.w) + s(vec.x - h, vec.y, vec.z, vec.w)) / (h * h),
                    d2sdy2 = (s(vec.x, vec.y + h, vec.z, vec.w) - 2 * s(vec.x, vec.y, vec.z, vec.w) + s(vec.x, vec.y - h, vec.z, vec.w)) / (h * h),
                    d2sdz2 = (s(vec.x, vec.y, vec.z + h, vec.w) - 2 * s(vec.x, vec.y, vec.z, vec.w) + s(vec.x, vec.y, vec.z - h, vec.w)) / (h * h),
                    d2sdw2 = (s(vec.x, vec.y, vec.z, vec.w + h) - 2 * s(vec.x, vec.y, vec.z, vec.w) + s(vec.x, vec.y, vec.z, vec.w - h)) / (h * h);
                return Chalkboard.matr.new([d2pdx2, d2pdy2, d2pdz2, d2pdw2],
                                           [d2qdx2, d2qdy2, d2qdz2, d2qdw2],
                                           [d2rdx2, d2rdy2, d2rdz2, d2rdw2],
                                           [d2sdx2, d2sdy2, d2sdz2, d2sdw2]);
            } else {
                return "TypeError: Parameter \"funcORvecfield\" must be of type \"surf\", \"mult\", \"vec2field\", \"vec3field\", or \"vec4field\".";
            }
        },
        div: function(vecfield, vec) {
            if(vecfield.type === "vec2field" || vecfield.type === "vec3field" || vecfield.type === "vec4field") {
                return Chalkboard.matr.trace(Chalkboard.calc.grad(vecfield, vec));
            } else {
                return "TypeError: Parameter \"vecfield\" must be of type \"vec2field\", \"vec3field\", or \"vec4field\".";
            }
        },
        curl: function(vecfield, vec) {
            var h = 0.000000001;
            if(vecfield.type === "vec2field") {
                var p = Chalkboard.real.parse("(x, y) => " + vecfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vecfield.q);
                var dpdy = (p(vec.x, vec.y + h) - p(vec.x, vec.y)) / h,
                    dqdx = (q(vec.x + h, vec.y) - q(vec.x, vec.y)) / h;
                return Chalkboard.vec3.new(0, 0, dqdx - dpdy);
            } else if(vecfield.type === "vec3field") {
                var p = Chalkboard.real.parse("(x, y, z) => " + vecfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vecfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vecfield.r);
                var dpdy = (p(vec.x, vec.y + h, vec.z) - p(vec.x, vec.y, vec.z)) / h,
                    dpdz = (p(vec.x, vec.y, vec.z + h) - p(vec.x, vec.y, vec.z)) / h,
                    dqdx = (q(vec.x + h, vec.y, vec.z) - q(vec.x, vec.y, vec.z)) / h,
                    dqdz = (q(vec.x, vec.y, vec.z + h) - q(vec.x, vec.y, vec.z)) / h,
                    drdx = (r(vec.x + h, vec.y, vec.z) - r(vec.x, vec.y, vec.z)) / h,
                    drdy = (r(vec.x, vec.y + h, vec.z) - r(vec.x, vec.y, vec.z)) / h;
                return Chalkboard.vec3.new(drdy - dqdz, dpdz - drdx, dqdx - dpdy);
            } else {
                return "TypeError: Parameter \"vecfield\" must be of type \"vec2field\" or \"vec3field\".";
            }
        },
        dfdz: function(func, comp) {
            var h = 0.000000001;
            if(func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                var duda = (u(comp.a + h, comp.b) - u(comp.a, comp.b)) / h,
                    dudb = (u(comp.a, comp.b + h) - u(comp.a, comp.b)) / h,
                    dvda = (v(comp.a + h, comp.b) - v(comp.a, comp.b)) / h,
                    dvdb = (v(comp.a, comp.b + h) - v(comp.a, comp.b)) / h;
                return {a: Chalkboard.comp.new(duda, dvda), b: Chalkboard.comp.new(dudb, dvdb)};
            } else {
                return "TypeError: Parameter \"func\" must be of type \"comp\".";
            }
        },
        d2fdz2: function(func, comp) {
            var h = 0.00001;
            if(func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                var d2uda2 = (u(comp.a + h, comp.b) - 2 * u(comp.a, comp.b) + u(comp.a - h, comp.b)) / (h * h),
                    d2udb2 = (u(comp.a, comp.b + h) - 2 * u(comp.a, comp.b) + u(comp.a, comp.b - h)) / (h * h),
                    d2vda2 = (v(comp.a + h, comp.b) - 2 * v(comp.a, comp.b) + v(comp.a - h, comp.b)) / (h * h),
                    d2vdb2 = (v(comp.a, comp.b + h) - 2 * v(comp.a, comp.b) + v(comp.a, comp.b - h)) / (h * h);
                return {a: Chalkboard.comp.new(d2uda2, d2vda2), b: Chalkboard.comp.new(d2udb2, d2vdb2)};
            } else {
                return "TypeError: Parameter \"func\" must be of type \"comp\".";
            }
        },
        fxdx: function(func, inf, sup) {
            if(func.type === "expl" || func.type === "inve" || func.type === "pola") {
                var f;
                if(func.type === "expl") {
                    f = Chalkboard.real.parse("x => " + func.definition);
                } else if(func.type === "inve") {
                    f = Chalkboard.real.parse("y => " + func.definition);
                } else if(func.type === "pola") {
                    f = Chalkboard.real.parse("O => " + "((" + func.definition + ") * (" + func.definition + ")) / 2");
                }
                var fx = f(inf) + f(sup);
                var dx = (sup - inf) / 1000000;
                for(var i = 1; i < 1000000; i++) {
                    fx += i % 2 === 0 ? 2 * f(inf + i * dx) : 4 * f(inf + i * dx);
                }
                return (fx * dx) / 3;
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    var xt = x(inf) + x(sup),
                        yt = y(inf) + y(sup);
                    var dt = (sup - inf) / 1000000;
                    for(var i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(sup + i * dt) : 4 * y(sup + i * dt);
                    }
                    return Chalkboard.vec2.new((xt * dt) / 3, (yt * dt) / 3);
                } else if(func.definition.length === 3) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    var xt = x(inf) + x(sup),
                        yt = y(inf) + y(sup),
                        zt = z(inf) + z(sup);
                    var dt = (sup - inf) / 1000000;
                    for(var i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(inf + i * dt) : 4 * y(inf + i * dt);
                        zt += i % 2 === 0 ? 2 * z(inf + i * dt) : 4 * z(inf + i * dt);
                    }
                    return Chalkboard.vec3.new((xt * dt) / 3, (yt * dt) / 3, (zt * dt) / 3);
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\", \"inve\", \"pola\", or \"curv\".";
            }
        },
        fxydxdy: function(func, xinf, xsup, yinf, ysup) {
            if(func.type === "mult") {
                var f = Chalkboard.real.parse("(x, y) => " + func.definition);
                var result = 0;
                var dx = (xsup - xinf) / 10000,
                    dy = (ysup - yinf) / 10000;
                for(var x = xinf; x <= xsup; x += dx) {
                    for(var y = yinf; y <= ysup; y += dy) {
                        result += f(x, y);
                    }
                }
                return result * dx * dy;
            } else {
                return "TypeError: Parameter \"func\" must be of type \"mult\".";
            }
        },
        fds: function(func, tinf, tsup, sinf, ssup) {
            var result = 0;
            var drdt, drds;
            if(func.type === "curv") {
                var dt = (tsup - tinf) / 10000;
                if(func.definition.length === 2) {
                    for(var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vec2.mag(drdt);
                    }
                    return result * dt;
                } else if(func.definition.length === 3) {
                    for(var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vec3.mag(drdt);
                    }
                    return result * dt;
                }
            } else if(func.type === "surf") {
                var dt = (tsup - tinf) / 100,
                    ds = (ssup - sinf) / 100;
                for(var s = sinf; s <= ssup; s += ds) {
                    for(var t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vec2.new(s, t)), "vec3", "col", 1);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vec2.new(s, t)), "vec3", "col", 2);
                        result += Chalkboard.vec3.mag(Chalkboard.vec3.cross(drds, drdt));
                    }
                }
                return result * ds * dt;
            } else {
                return "TypeError: Parameter \"func\" must be of type \"curv\" or \"surf\".";
            }
        },
        frds: function(funcORvecfield, func, inf, sup) {
            if(func.type === "curv") {
                var result = 0;
                var dt = (sup - inf) / 10000;
                if(funcORvecfield.type === "mult") {
                    for(var t = inf; t <= sup; t += dt) {
                        result += Chalkboard.real.val(funcORvecfield, Chalkboard.real.val(func, t)) * Chalkboard.vec2.mag(Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                } else if(funcORvecfield.type === "vec2field") {
                    for(var t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vec2.dot(Chalkboard.vec2.fromField(funcORvecfield, Chalkboard.real.val(func, t)), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                } else if(funcORvecfield.type === "vec3field") {
                    for(var t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vec3.dot(Chalkboard.vec3.fromField(funcORvecfield, Chalkboard.real.val(func, t)), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                } else {
                    return "TypeError: Parameter \"funcORvecfield\" must be of type \"mult\", \"vec2field\", or \"vec3field\".";
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"curv\".";
            }
        },
        fnds: function(vecfield, func, tinf, tsup, sinf, ssup) {
            var result = 0;
            var drdt, drds;
            if(func.type === "curv") {
                var dt = (tsup - tinf) / 10000;
                if(func.definition.length === 2) {
                    for(var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vec2.dot(Chalkboard.vec2.fromField(vecfield, Chalkboard.real.val(func, t)), Chalkboard.vec2.new(-drdt.y, drdt.x)) * Chalkboard.vec2.mag(drdt);
                    }
                    return result * dt;
                } else if(func.definition.length === 3) {
                    for(var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vec3.dot(Chalkboard.vec3.fromField(vecfield, Chalkboard.real.val(func, t)), Chalkboard.calc.normal(func, t)) * Chalkboard.vec3.mag(drdt);
                    }
                    return result * dt;
                }
            } else if(func.type === "surf") {
                var dt = (tsup - tinf) / 100,
                    ds = (ssup - sinf) / 100;
                for(var s = sinf; s <= ssup; s += ds) {
                    for(var t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vec2.new(s, t)), "vec3", "col", 1);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vec2.new(s, t)), "vec3", "col", 2);
                        result += Chalkboard.vec3.scalarTriple(Chalkboard.vec3.fromField(vecfield, Chalkboard.real.val(func, Chalkboard.vec2.new(s, t))), drds, drdt);
                    }
                }
                return result * ds * dt;
            } else {
                return "TypeError: Parameter \"func\" must be of type \"curv\" or \"surf\".";
            }
        },
        fzdz: function(func_1, func_2, inf, sup) {
            if(func_1.type === "comp") {
                if(func_2.type === "curv") {
                    var result = Chalkboard.comp.new(0, 0);
                    var dt = (sup - inf) / 10000;
                    for(var t = inf; t <= sup; t += dt) {
                        var fz = Chalkboard.comp.val(func_1, Chalkboard.vec2.toComplex(Chalkboard.real.val(func_2, t)));
                        var rt = Chalkboard.calc.dfdx(func_2, t);
                        result = Chalkboard.comp.add(result, Chalkboard.comp.new((fz.a * rt.x) - (fz.b * rt.y), (fz.b * rt.x) + (fz.a * rt.y)));
                    }
                    return Chalkboard.comp.scl(result, dt);
                } else {
                    return "TypeError: Parameter \"func_2\" must be of type \"curv\".";
                }
            } else {
                return "TypeError: Parameter \"func_1\" must be of type \"comp\".";
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
        mean: function(func, a, b) {
            return (Chalkboard.calc.fxdx(func, a, b)) / (b - a);
        },
        curvature: function(func, val) {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    var dxdt = Chalkboard.calc.dfdx(func, val).x,
                        dydt = Chalkboard.calc.dfdx(func, val).y,
                        d2xdt2 = Chalkboard.calc.d2fdx2(func, val).x,
                        d2ydt2 = Chalkboard.calc.d2fdx2(func, val).y;
                    return Math.abs(dxdt * d2ydt2 - dydt * d2xdt2) / Math.sqrt((dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt));
                } else if(func.definition.length === 3) {
                    return Chalkboard.vec3.mag(Chalkboard.calc.normal(func, val)) / Chalkboard.vec3.mag(Chalkboard.calc.dfdx(func, val));
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"curv\".";
            }
        },
        convolution: function(func_1, func_2, val) {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func_1.definition + ") * (" + func_2.definition.replace(/x/g, "(" + val + " - x)") + ")"), -100, 100);
        },
        correlation: function(func_1, func_2, val) {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func_1.definition + ") * (" + func_2.definition.replace(/x/g, "(" + val + " + x)") + ")"), -100, 100);
        },
        autocorrelation: function(func, val) {
            return Chalkboard.calc.correlation(func, func, val);
        },
        Taylor: function(func, val, n, a) {
            if(func.type === "expl") {
                if(n === 0) {
                    return Chalkboard.real.val(func, a);
                } else if(n === 1) {
                    return Chalkboard.real.val(func, a) + Chalkboard.calc.dfdx(func, a) * (val - a);
                } else if(n === 2) {
                    return Chalkboard.real.val(func, a) + Chalkboard.calc.dfdx(func, a) * (val - a) + (Chalkboard.calc.d2fdx2(func, a) * (val - a) * (val - a)) / 2;
                }
            } else {
                return "TypeError: Parameter \"func\" must be of type \"expl\".";
            }
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