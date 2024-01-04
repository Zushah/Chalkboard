/*
    The Chalkboard Library
    Version 1.7.0 Descartes released 01/01/2024
    Authored by Zushah ===> https://www.github.com/Zushah
    Available under the MIT License ===> https://www.opensource.org/license/mit/

    The Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.

    Repository ===> https://www.github.com/Zushah/Chalkboard
    Website ===> https://zushah.github.io/Chalkboard/home.html
*/

interface Window { Chalkboard: any };
type ChalkboardFunction = {
    definition: string | string[];
    type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" | "comp";
};
type ChalkboardVectorField = {
    p: string;
    q: string;
    r?: string;
    s?: string;
};
type ChalkboardComplex = {
    a: number;
    b: number;
};
type ChalkboardQuaternion = {
    a: number;
    b: number;
    c: number;
    d: number;
};
type ChalkboardVector = {
    x: number;
    y: number;
    z?: number;
    w?: number;
};
type ChalkboardMatrix = number[][];
type ChalkboardTensor = number | ChalkboardTensor[];

const Chalkboard: any = {
    README: (): void => {
        console.log("The Chalkboard Library\nVersion 1.7.0 Descartes released 01/01/2024\nAuthored by Zushah ===> https://www.github.com/Zushah\nAvailable under the MIT License ===> https://www.opensource.org/license/mit/\n\nThe Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.\n\nRepository ===> https://www.github.com/Zushah/Chalkboard\nWebsite ===> https://zushah.github.io/Chalkboard/home.html");
    },
    LOGO: (x: number = Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2, y: number = Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2, s: number = 1, context: CanvasRenderingContext2D = Chalkboard.real.parse(Chalkboard.CONTEXT)): void => {
        context.save();
        context.translate(x, y);
        context.scale(s, s);
        context.fillStyle = "rgb(25, 25, 25)";
        context.fillRect(-50, -50, 100, 100);
        context.fillStyle = "rgb(50, 125, 200)";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.font = "75px Times New Roman";
        context.fillText("C", -25, 6);
        context.fillText("B", 25, 6);
        context.strokeStyle = "rgb(50, 125, 200)";
        context.lineWidth = 6;
        context.lineCap = "butt";
        context.beginPath();
        context.moveTo(-30, 25);
        context.lineTo(-30, -22.5);
        context.stroke();
        context.beginPath();
        context.moveTo(22, 25);
        context.lineTo(22, -22.5);
        context.stroke();
        context.restore();
    },
    PI: (coefficient: number = 1): number => {
        return coefficient * 4 * (4 * Math.atan(1/5) - Math.atan(1/239));
    },
    E: (exponent: number = 1): number => {
        return Math.pow(Math.pow(10, 1 / Math.log(10)), exponent);
    },
    CONTEXT: "ctx",
    PARSEPREFIX: "",
    numb: {
        random: (inf: number = 0, sup: number = 1): number => {
            return inf + (sup - inf) * Math.random();
        },
        exponential: (l: number = 1): number => {
            return l <= 0 ? 0 : -Math.log(Math.random()) / l;
        },
        Gaussian: (height: number, mean: number, deviation: number): number => {
            let u1 = Math.random(), u2 = Math.random();
            let random = Chalkboard.real.sqrt(-2 * Chalkboard.real.ln(u1)) * Chalkboard.trig.cos(Chalkboard.PI(2) * u2);
            return random * height * Chalkboard.real.sqrt(deviation) + mean;
        },
        Bernoullian: (p: number = 0.5): number => {
            if(p === undefined) {
                p = 0.5;
            }
            return Math.random() < p ? 1 : 0;
        },
        Poissonian: (l: number = 1): number => {
            if(l > 0) {
                let L = Chalkboard.E(-l);
                let p = 1, k = 0;
                for(; p > L; ++k) {
                    p *= Math.random();
                }
                return k - 1;
            } else {
                return 0;
            }
        },
        factorial: (num: number): number => {
            let n = 1;
            for(var i = 1; i <= num; i++) {
                n *= i;
            }
            i--;
            return n;
        },
        gcd: (a: number, b: number): number => {
            if(b === 0) {
                return a;
            }
            return Chalkboard.numb.gcd(b, a % b);
        },
        lcm: (a: number, b: number): number => {
            return a * (b / Chalkboard.numb.gcd(a, b));
        },
        sum: (formula: string, inf: number, sup: number): number => {
            let result = 0;
            let f = Chalkboard.real.parse("n => " + formula);
            for(let i = inf; i <= sup; i++) {
                result += f(i);
            }
            return result;
        },
        mul: (formula: string, inf: number, sup: number): number => {
            let result = 1;
            let f = Chalkboard.real.parse("n => " + formula);
            for(let i = inf; i <= sup; i++) {
                result *= f(i);
            }
            return result;
        },
        combination: (n: number, r: number): number => {
            return Chalkboard.numb.factorial(n) / (Chalkboard.numb.factorial(n - r) * Chalkboard.numb.factorial(r));
        },
        permutation: (n: number, r: number): number => {
            return Chalkboard.numb.factorial(n) / Chalkboard.numb.factorial(n - r);
        },
        prime: (num: number): number => {
            if(num === 2) {
                return 2;
            }
            let n = 1;
            let prime = 3;
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
        isPrime: (num: number): boolean => {
            for(let i = 2; i <= Chalkboard.real.sqrt(num); i++) {
                if(num % i === 0) {
                    return false;
                }
            }
            return num > 1;
        },
        nextPrime: (num: number): number => {
            let result = num + 1;
            while(!Chalkboard.numb.isPrime(result)) {
                result++;
            }
            return result;
        },
        primeGap: (inf: number, sup: number): number => {
            let prime = null;
            let gap = 0;
            for(let i = inf; i <= sup; i++) {
                if(Chalkboard.numb.isPrime(i)) {
                    if(prime !== null) {
                        let temp = i - prime;
                        if(temp > gap) {
                            gap = temp;
                        }
                    }
                    prime = i;
                }
            }
            return gap;
        },
        primeArr: (inf: number, sup: number): number[] => {
            let result = [];
            for(let i = inf; i <= sup; i++) {
                if(Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        },
        primeCount: (inf: number, sup: number): number => {
            return Chalkboard.numb.primeArr(inf, sup).length;
        },
        compositeArr: (inf: number, sup: number): number[] => {
            let result = [];
            for(let i = inf; i <= sup; i++) {
                if(!Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        },
        compositeCount: (inf: number, sup: number): number => {
            return Chalkboard.numb.compositeArr(inf, sup).length;
        },
        factors: (num: number): number[] => {
            let result = [];
            while(num % 2 === 0) {
                result.push(2);
                num /= 2;
            }
            for(let i = 3; i <= Chalkboard.real.sqrt(num); i += 2) {
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
        divisors: (num: number): number[] => {
            let result = [];
            for(let i = 1; i <= num; i++) {
                if(num % i === 0) {
                    result.push(i);
                }
            }
            return result;
        },
        sgn: (num: number): -1 | 0 | 1 => {
            if(num > 0) {
                return 1;
            } else if(num < 0) {
                return -1;
            } else {
                return 0;
            }
        },
        Kronecker: (a: number, b: number): 1 | 0 | undefined => {
            if(a === b) {
                return 1;
            } else if(a !== b) {
                return 0;
            } else {
                return undefined;
            }
        },
        change: (initial: number, final: number): number => {
            return (final - initial) / initial;
        },
        map: (num: number, range1: number[], range2: number[]): number => {
            return range2[0] + (range2[1] - range2[0]) * ((num - range1[0]) / (range1[1] - range1[0]));
        },
        constrain: (num: number, range: [number, number] = [0, 1]): number => {
            return Math.max(Math.min(num, range[1]), range[0]);
        },
        binomial: (n: number, k: number): number => {
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
            let result = n;
            for(let i = 2; i <= k; i++) {
                result *= (n - i + 1) / i;
            }
            return Math.round(result);
        },
        Fibonacci: (num: number): number => {
            let sequence = [0, 1];
            if(sequence[num] === undefined) {
                sequence.push(Chalkboard.numb.Fibonacci(num - 1) + sequence[num - 2]);
            }
            return sequence[num];
        },
        Goldbach: (num: number): [number, number] | undefined => {
            if(num % 2 === 0) {
                if(num !== 4) {
                    let a = num / 2, b = num / 2;
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
        Euler: (num: number): number | undefined => {
            if(num > 0) {
                let factors = Chalkboard.numb.factors(num);
                for(let i = 0; i < factors.length; i++) {
                    num *= (factors[i] - 1) / factors[i];
                }
                return num;
            } else {
                return undefined;
            }
        }
    },
    real: {
        function: (definition: string | string[], type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" = "expl"): ChalkboardFunction => {
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
                throw new TypeError("Parameter \"type\" must be either \"expl\", \"inve\", \"pola\", \"curv\", \"surf\", or \"mult\".");
            }
        },
        parse: (str: string): Function => {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + ' return (' + str + ')')();
        },
        val: (func: ChalkboardFunction, val: number | ChalkboardVector): number | ChalkboardVector => {
            if(func.type === "expl") {
                let f = Chalkboard.real.parse("x => " + func.definition);
                return f(val);
            } else if(func.type === "inve") {
                let f = Chalkboard.real.parse("y => " + func.definition);
                return f(val);
            } else if(func.type === "pola") {
                let r = Chalkboard.real.parse("O => " + func.definition);
                return r(val);
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.new(x(val), y(val));
                } else {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.new(x(val), y(val), z(val));
                }
            } else if(func.type === "surf") {
                let vect = val as ChalkboardVector;
                let x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                return Chalkboard.vect.new(x(vect.x, vect.y), y(vect.x, vect.y), z(vect.x, vect.y));
            } else if(func.type === "mult" && typeof val !== "number") {
                let vect = val as ChalkboardVector;
                let f = Chalkboard.real.parse("(x, y) => " + func.definition);
                return f(vect.x, vect.y);
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"expl\", \"pola\", \"curv\", \"surf\", or \"mult\".");
            }
        },
        pow: (base: number, num: number): number => {
            if(base === 0 && num === 0) {
                return 1;
            } else {
                return Math.exp(num * Math.log(base));
            }
        },
        log: (base: number, num: number): number => {
            return Chalkboard.real.ln(num) / Chalkboard.real.ln(base);
        },
        ln: (num: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / x"), 1, num);
        },
        log10: (num: number): number => {
            return Chalkboard.real.log(10, num);
        },
        sqrt: (num: number): number | undefined => {
            if(num >= 0) {
                return Math.exp(Math.log(num) / 2);
            }
        },
        root: (num: number, index: number = 3): number => {
            return Math.exp(Math.log(num) / index);
        },
        tetration: (base: number, num: number): number | undefined => {
            if(num === 0) {
                return 1;
            } else if(num > 0) {
                return Math.pow(base, Chalkboard.real.tetration(base, num - 1));
            }
        },
        Heaviside: (num: number, edge: number = 0, scl: number = 1): number => {
            if(num >= edge) {
                return scl;
            } else {
                return 0;
            }
        },
        Dirac: (num: number, edge: number = 0, scl: number = 1): number => {
            if(num === edge) {
                return scl;
            } else {
                return 0;
            }
        },
        ramp: (num: number, edge: number = 0, scl: number = 1): number => {
            if(num >= edge) {
                return num * scl;
            } else {
                return 0;
            }
        },
        rect: (num: number, center: number = 0, width: number = 2, scl: number = 1): number => {
            if(num > (center + width / 2) || num < (center - width / 2)) {
                return 0;
            } else {
                return scl;
            }
        },
        pingpong: (num: number, edge: number = 0, scl: number = 1): number => {
            if((num + edge) % (2 * scl) < scl) {
                return (num + edge) % scl;
            } else {
                return scl - (num + edge) % scl;
            }
        },
        slope: (x1: number, y1: number, x2: number, y2: number): number => {
            return (y2 - y1) / (x2 - x1);
        },
        linear: (x1: number, y1: number, x2: number, y2: number): ChalkboardFunction => {
            return Chalkboard.real.function(Chalkboard.real.slope(x1, y1, x2, y2).toString() + " * (x - " + x2.toString() + ") + " + y2.toString());
        },
        linearFormula: (a: number, b: number, c?: number, d?: number): number => {
            if(typeof c === "undefined" && typeof d === "undefined") {
                return -b / a;
            } else if(typeof c === "number" && typeof d === "undefined") {
                return c / a;
            } else {
                return -b / Chalkboard.real.slope(a, b, c, d) + a;
            }
        },
        lerp: (p: [number, number], t: number): number => {
            return (p[1] - p[0]) * t + p[0];
        },
        quadratic: (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): ChalkboardFunction => {
            if(form === "stan") {
                return Chalkboard.real.function(a.toString() + "* x * x + " + b.toString() + " * x +" + c.toString());
            } else if(form === "vert") {
                return Chalkboard.real.function(a.toString() + " * ((x - " + b.toString() + ") * (x - " + b.toString() + ")) +" + c.toString());
            } else {
                throw new TypeError("Parameter \"form\" must be \"stan\" or \"vert\".");
            }
        },
        discriminant: (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): number => {
            if(form === "stan") {
                return b * b - 4 * a * c;
            } else if(form === "vert") {
                return (2 * a * b) * (2 * a * b) - 4 * a * c;
            } else {
                throw new TypeError("Parameter \"form\" must be \"stan\" or \"vert\".");
            }
        },
        quadraticFormula: (a: number, b: number, c: number, form: "stan" | "vert" = "stan"): [number, number] => {
            if(form === "stan") {
                return [(-b + Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a), (-b - Math.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a)];
            } else if(form === "vert") {
                return [b + Chalkboard.real.sqrt(-c / a), b - Chalkboard.real.sqrt(-c / a)];
            } else {
                throw new TypeError("Parameter \"form\" must be \"stan\" or \"vert\".");
            }
        },
        qerp: (p1: [number, number], p2: [number, number], p3: [number, number], t: number): number => {
            let a = p1[1] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            let b = -p1[1] * (p2[0] + p3[0]) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) - p2[1] * (p1[0] + p3[0]) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) - p3[1] * (p1[0] + p2[0]) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            let c = p1[1] * p2[0] * p3[0] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] * p1[0] * p3[0] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] * p1[0] * p2[0] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            return a * t * t + b * t + c;
        }
    },
    comp: {
        new: (a: number, b: number = 0): ChalkboardComplex => {
            return {a: a, b: b};
        },
        copy: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        },
        function: (realDefinition: string, imagDefinition: string): ChalkboardFunction => {
            return {definition: [realDefinition, imagDefinition], type: "comp"};
        },
        parse: (str: string): Function => {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + ' return (' + str + ')')();
        },
        val: (func: ChalkboardFunction, comp: ChalkboardComplex): ChalkboardComplex => {
            if(func.type === "comp") {
                let u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                return Chalkboard.comp.new(u(comp.a, comp.b), v(comp.a, comp.b));
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a type property of \"comp\".");
            }
        },
        Re: (funcORcomp: ChalkboardFunction | ChalkboardComplex): string | number => {
            if(funcORcomp.hasOwnProperty("definition")) {
                return (funcORcomp as ChalkboardFunction).definition[0];
            } else {
                return (funcORcomp as ChalkboardComplex).a;
            }
        },
        Im: (funcORcomp: ChalkboardFunction | ChalkboardComplex): string | number => {
            if(funcORcomp.hasOwnProperty("definition")) {
                return (funcORcomp as ChalkboardFunction).definition[1];
            } else {
                return (funcORcomp as ChalkboardComplex).b;
            }
        },
        random: (inf: number = 0, sup: number = 1): ChalkboardComplex => {
            return Chalkboard.comp.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        mag: (comp: ChalkboardComplex): number => {
            return Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b));
        },
        magsq: (comp: ChalkboardComplex): number => {
            return (comp.a * comp.a) + (comp.b * comp.b);
        },
        magset: (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num);
        },
        arg: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
        },
        slope: (comp: ChalkboardComplex): number => {
            return comp.b / comp.a;
        },
        average: (comp: ChalkboardComplex): number => {
            return (comp.a + comp.b) / 2;
        },
        normalize: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
        },
        zero: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(comp.a * 0, comp.b * 0);
        },
        negate: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(-comp.a, -comp.b);
        },
        reciprocate: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(1 / comp.a, 1 / comp.b);
        },
        absolute: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(Math.abs(comp.a), Math.abs(comp.b));
        },
        round: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(Math.round(comp.a), Math.round(comp.b));
        },
        Euler: (rad: number): ChalkboardComplex => {
            return Chalkboard.comp.new(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        },
        pow: (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.new(Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.cos(num * Chalkboard.comp.arg(comp)), Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.sin(num * Chalkboard.comp.arg(comp)));
        },
        ln: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        },
        sq: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new((comp.a * comp.a) - (comp.b * comp.b), 2 * comp.a * comp.b);
        },
        sqrt: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(Chalkboard.real.sqrt((comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2), Chalkboard.numb.sgn(comp.b) * Chalkboard.real.sqrt((-comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2));
        },
        root: (comp: ChalkboardComplex, index: number = 3): ChalkboardComplex[] => {
            let result = [];
            let r = Chalkboard.comp.mag(comp);
            let t = Chalkboard.comp.arg(comp);
            for(let i = 0; i < index; i++) {
                result.push(Chalkboard.comp.new(Chalkboard.real.root(r, index) * Chalkboard.trig.cos((t + Chalkboard.PI(2 * i)) / index), Chalkboard.real.root(r, index) * Chalkboard.trig.sin((t + Chalkboard.PI(2 * i)) / index)));
            }
            return result;
        },
        rotate: (comp: ChalkboardComplex, rad: number): ChalkboardComplex => {
            return Chalkboard.comp.new(Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad), Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad));
        },
        invert: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        },
        conjugate: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.new(comp.a, -comp.b);
        },
        dist: (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): number => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.real.sqrt(((comp_2.a - comp_1.a) * (comp_2.a - comp_1.a)) + ((comp_2.b - comp_1.b) * (comp_2.b - comp_1.b)));
        },
        distsq: (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): number => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return ((comp_2.a - comp_1.a) * (comp_2.a - comp_1.a)) + ((comp_2.b - comp_1.b) * (comp_2.b - comp_1.b));
        },
        scl: (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.new(comp.a * num, comp.b * num);
        },
        constrain: (comp: ChalkboardComplex, range: [number, number] = [0, 1]): ChalkboardComplex => {
            return Chalkboard.comp.new(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        },
        add: (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.comp.new(comp_1.a + comp_2.a, comp_1.b + comp_2.b);
        },
        sub: (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.comp.new(comp_1.a - comp_2.a, comp_1.b - comp_2.b);
        },
        mul: (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.comp.new((comp_1.a * comp_2.a) - (comp_1.b * comp_2.b), (comp_1.a * comp_2.b) + (comp_1.b * comp_2.a));
        },
        div: (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.new(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.new(comp_2, 0);
            }
            return Chalkboard.comp.new(((comp_1.a * comp_2.a) - (comp_1.b * comp_2.b)) / Chalkboard.comp.magsq(comp_2), ((comp_1.a * comp_2.b) + (comp_1.b * comp_2.a)) / Chalkboard.comp.magsq(comp_2));
        },
        toVector: (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.vect.new(comp.a, comp.b);
        },
        toArray: (comp: ChalkboardComplex): [number, number] => {
            return [comp.a, comp.b];
        },
        toString: (comp: ChalkboardComplex): string => {
            if(comp.b >= 0) {
                return comp.a.toString() + " + " + comp.b.toString() + "i";
            } else {
                return comp.a.toString() + " - " + Math.abs(comp.b).toString() + "i";
            }
        },
        print: (comp: ChalkboardComplex): void => {
            console.log(Chalkboard.comp.toString(comp));
        }
    },
    quat: {
        new: (a: number, b: number = 0, c: number = 0, d: number = 0): ChalkboardQuaternion => {
            return {a: a, b: b, c: c, d: d};
        },
        copy: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Object.create(Object.getPrototypeOf(quat), Object.getOwnPropertyDescriptors(quat));
        },
        random: (inf: number = 0, sup: number = 1): ChalkboardQuaternion => {
            return Chalkboard.quat.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        },
        mag: (quat: ChalkboardQuaternion): number => {
            return Chalkboard.real.sqrt((quat.a * quat.a) + (quat.b * quat.b) + (quat.c * quat.c) + (quat.d * quat.d));
        },
        magsq: (quat: ChalkboardQuaternion): number => {
            return (quat.a * quat.a) + (quat.b * quat.b) + (quat.c * quat.c) + (quat.d * quat.d);
        },
        magset: (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.scl(Chalkboard.quat.normalize(quat), num);
        },
        average: (quat: ChalkboardQuaternion): number => {
            return (quat.a + quat.b + quat.c + quat.d) / 4;
        },
        normalize: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(quat.a / Chalkboard.quat.mag(quat), quat.b / Chalkboard.quat.mag(quat), quat.c / Chalkboard.quat.mag(quat), quat.d / Chalkboard.quat.mag(quat));
        },
        zero: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(quat.a * 0, quat.b * 0, quat.c * 0, quat.d * 0);
        },
        negate: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(-quat.a, -quat.b, -quat.c, -quat.d);
        },
        reciprocate: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(1 / quat.a, 1 / quat.b, 1 / quat.c, 1 / quat.d);
        },
        absolute: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(Math.abs(quat.a), Math.abs(quat.b), Math.abs(quat.c), Math.abs(quat.d));
        },
        round: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(Math.round(quat.a), Math.round(quat.b), Math.round(quat.c), Math.round(quat.d));
        },
        invert: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(quat.a / Chalkboard.quat.magsq(quat), -quat.b / Chalkboard.quat.magsq(quat), -quat.c / Chalkboard.quat.magsq(quat), -quat.d / Chalkboard.quat.magsq(quat));
        },
        conjugate: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.new(quat.a, -quat.b, -quat.c, -quat.d);
        },
        dist: (quat_1: ChalkboardQuaternion, quat_2: ChalkboardQuaternion): number => {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.real.sqrt(((quat_2.a - quat_1.a) * (quat_2.a - quat_1.a)) + ((quat_2.b - quat_1.b) * (quat_2.b - quat_1.b)) + ((quat_2.c - quat_1.c) * (quat_2.c - quat_1.c)) + ((quat_2.d - quat_1.d) * (quat_2.d - quat_1.d)));
        },
        distsq: (quat_1: ChalkboardQuaternion, quat_2: ChalkboardQuaternion): number => {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return ((quat_2.a - quat_1.a) * (quat_2.a - quat_1.a)) + ((quat_2.b - quat_1.b) * (quat_2.b - quat_1.b)) + ((quat_2.c - quat_1.c) * (quat_2.c - quat_1.c)) + ((quat_2.d - quat_1.d) * (quat_2.d - quat_1.d));
        },
        scl: (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.new(quat.a * num, quat.b * num, quat.c * num, quat.d * num);
        },
        constrain: (quat: ChalkboardQuaternion, range: [number, number] = [0, 1]): ChalkboardQuaternion => {
            return Chalkboard.quat.new(Chalkboard.numb.constrain(quat.a, range), Chalkboard.numb.constrain(quat.b, range), Chalkboard.numb.constrain(quat.c, range), Chalkboard.numb.constrain(quat.d, range));
        },
        add: (quat_1: ChalkboardQuaternion, quat_2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new(quat_1.a + quat_2.a, quat_1.b + quat_2.b, quat_1.c + quat_2.c, quat_1.d + quat_2.d);
        },
        sub: (quat_1: ChalkboardQuaternion, quat_2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new(quat_1.a - quat_2.a, quat_1.b - quat_2.b, quat_1.c - quat_2.c, quat_1.d - quat_2.d);
        },
        mul: (quat_1: ChalkboardQuaternion, quat_2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new((quat_1.a * quat_2.a) - (quat_1.b * quat_2.b) - (quat_1.c * quat_2.c) - (quat_1.d * quat_2.d), (quat_1.a * quat_2.b) + (quat_1.b * quat_2.a) + (quat_1.c * quat_2.d) - (quat_1.d * quat_2.c), (quat_1.a * quat_2.c) - (quat_1.b * quat_2.d) + (quat_1.c * quat_2.a) + (quat_1.d * quat_2.b), (quat_1.a * quat_2.d) + (quat_1.b * quat_2.c) - (quat_1.c * quat_2.b) + (quat_1.d * quat_2.a));
        },
        div: (quat_1: ChalkboardQuaternion, quat_2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat_1 === "number") {
                quat_1 = Chalkboard.quat.new(quat_1, 0, 0, 0);
            }
            if(typeof quat_2 === "number") {
                quat_2 = Chalkboard.quat.new(quat_2, 0, 0, 0);
            }
            return Chalkboard.quat.new((quat_1.a * quat_2.a + quat_1.b * quat_2.b + quat_1.c * quat_2.c + quat_1.d * quat_2.d) / Chalkboard.quat.magsq(quat_2), (quat_1.b * quat_2.a - quat_1.a * quat_2.b - quat_1.d * quat_2.c + quat_1.c * quat_2.d) / Chalkboard.quat.magsq(quat_2), (quat_1.c * quat_2.a + quat_1.d * quat_2.b - quat_1.a * quat_2.c - quat_1.b * quat_2.d) / Chalkboard.quat.magsq(quat_2), (quat_1.d * quat_2.a - quat_1.c * quat_2.b + quat_1.b * quat_2.c - quat_1.a * quat_2.d) / Chalkboard.quat.magsq(quat_2));
        },
        fromAxis: (vect: ChalkboardVector, rad: number): ChalkboardQuaternion => {
            if(typeof vect.z !== "undefined") {
                return Chalkboard.quat.new(Chalkboard.trig.cos(rad / 2), vect.x * Chalkboard.trig.sin(rad / 2), vect.y * Chalkboard.trig.sin(rad / 2), vect.z * Chalkboard.trig.sin(rad / 2));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" that has properties \"x\", \"y\", and \"z\".");
            }
        },
        toRotation: (quat: ChalkboardQuaternion, vect: ChalkboardVector): ChalkboardVector => {
            let vector = Chalkboard.vect.toQuaternion(vect);
            let inverse = Chalkboard.quat.invert(quat);
            let quat_vector_inverse = Chalkboard.quat.mul(quat, Chalkboard.quat.mul(vector, inverse));
            return Chalkboard.vect.new(quat_vector_inverse.b, quat_vector_inverse.c, quat_vector_inverse.d);
        },
        toVector: (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.vect.new(quat.a, quat.b, quat.c, quat.d);
        },
        toArray: (quat: ChalkboardQuaternion): [number, number, number, number] => {
            return [quat.a, quat.b, quat.c, quat.d];
        },
        toString: (quat: ChalkboardQuaternion): string => {
            let quat_b = "";
            let quat_c = "";
            let quat_d = "";
            if(quat.b >= 0) {
                quat_b = " + " + quat.b.toString() + "i ";
            } else if(quat.b < 0) {
                quat_b = " - " + Math.abs(quat.b).toString() + "i ";
            }
            if(quat.c >= 0) {
                quat_c = "+ " + quat.c.toString() + "j ";
            } else if(quat.c < 0) {
                quat_c = "- " + Math.abs(quat.c).toString() + "j ";
            }
            if(quat.d >= 0) {
                quat_d = "+ " + quat.d.toString() + "k ";
            } else if(quat.d < 0) {
                quat_d = "- " + Math.abs(quat.d).toString() + "k ";
            }
            return quat.a.toString() + quat_b + quat_c + quat_d;
        },
        print: (quat: ChalkboardQuaternion): void => {
            console.log(Chalkboard.quat.toString(quat));
        }
    },
    plot: {
        xyplane: (config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, context: CanvasRenderingContext2D}): void => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let cw = Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for(let i = Math.floor(-config.x / config.size); i <= (cw - config.x) / config.size; i++) {
                config.context.moveTo(i / config.size, -config.y);
                config.context.lineTo(i / config.size, cw - config.y);
            }
            config.context.stroke();
            config.context.beginPath();
            for(let i = Math.floor(-config.y / config.size); i <= (cw - config.y) / config.size; i++) {
                config.context.moveTo(-config.x, i / config.size);
                config.context.lineTo(cw - config.x, i / config.size);
            }
            config.context.stroke();
            config.context.lineWidth = config.lineWidth;
            config.context.beginPath();
            config.context.moveTo(-config.x, 0);
            config.context.lineTo(cw - config.x, 0);
            config.context.stroke();
            config.context.beginPath();
            config.context.moveTo(0, -config.y);
            config.context.lineTo(0, cw - config.y);
            config.context.stroke();
            config.context.restore();
        },
        rOplane: (config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, context: CanvasRenderingContext2D}): void => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let cw = Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for(let i = 0; i <= config.size * cw / 2; i++) {
                config.context.ellipse(0, 0, i / config.size, i / config.size, 0, 0, Chalkboard.PI(2));
            }
            config.context.stroke();
            config.context.lineWidth = config.lineWidth;
            config.context.beginPath();
            config.context.moveTo(-config.x, 0);
            config.context.lineTo(cw - config.x, 0);
            config.context.stroke()
            config.context.beginPath();
            config.context.moveTo(0, -config.y);
            config.context.lineTo(0, cw - config.y);
            config.context.stroke();
            config.context.restore();
        },
        function: (func: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number] | [[number, number], [number, number]], context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || (func.type === "comp" ? [[-10, 10], [-10, 10]] : [-10, 10]),
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let xdomain = config.domain as [number, number];
            let xydomain = config.domain as [[number, number], [number, number]];
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if(func.type === "expl") {
                let f = Chalkboard.real.parse("x => " + func.definition);
                for(let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(i, -f(i * config.size) / config.size);
                    data.push([i, f(i)]);
                }
            } else if(func.type === "inve") {
                let f = Chalkboard.real.parse("y => " + func.definition);
                for(let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(f(i * config.size) / config.size, -i);
                    data.push([f(i), i]);
                }
            } else if(func.type === "pola") {
                let r = Chalkboard.real.parse("O => " + func.definition);
                for(let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(r(i * config.size) / config.size * Chalkboard.trig.cos(i * config.size), -r(i * config.size) / config.size * Chalkboard.trig.sin(i * config.size));
                    data.push([i, r(i)]);
                }
            } else if(func.type === "curv") {
                let x = Chalkboard.real.parse("t => " + func.definition[0]),
                    y = Chalkboard.real.parse("t => " + func.definition[1]);
                for(let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(x(i * config.size) / config.size, -y(i * config.size) / config.size);
                    data.push([x(i), y(i)]);
                }
            } else if(func.type === "comp") {
                let u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                for(let i = xydomain[0][0] / config.size; i <= xydomain[0][1] / config.size; i += 5) {
                    for(let j = xydomain[1][0] / config.size; j <= xydomain[1][1] / config.size; j += 5) {
                        let z = Chalkboard.comp.new(u(i * config.size, j * config.size) / config.size, v(i * config.size, j * config.size) / config.size);
                        if(z.a === 0 && z.b === 0) {
                            config.context.fillStyle = "rgb(0, 0, 0)";
                        } else if(z.a === Infinity && z.b === Infinity) {
                            config.context.fillStyle = "rgb(255, 255, 255)";
                        } else {
                            config.context.fillStyle = "hsl(" + Chalkboard.trig.toDeg(Chalkboard.comp.arg(z)) + ", 100%, " + (Chalkboard.trig.tanh(Chalkboard.comp.mag(z) / Chalkboard.real.pow(10, 20)) + 0.5) * 100 + "%)";
                        }
                        config.context.fillRect(i, j, 5, 5);
                        data.push([u(i, j), v(i, j)]);
                    }
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a property \"type\" of \"expl\", \"inve\", \"pola\", \"curv\", or \"comp\".");
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        barplot: (arr: number[], bins: number[], config: {x: number, y: number, size: number, fillStyle: string, strokeStyle: string, lineWidth: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "white",
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.fillStyle = config.fillStyle;
            let bars = [];
            for(let i = 0; i < bins.length; i++) {
                if(i === 0) {
                    bars.push(Chalkboard.stat.lt(arr, bins[0], true));
                } else if(i === bins.length) {
                    bars.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                } else {
                    bars.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            let counts = [];
            for(let i = 0; i < bars.length; i++) {
                counts.push(bars[i].length);
            }
            let x = 0, width = counts.length / (2 * config.size);
            for(let i = 0; i < counts.length; i++) {
                config.context.fillRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                config.context.strokeRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                x += 1 / config.size;
            }
            config.context.restore();
            return bars;
        },
        lineplot: (arr: number[], bins: number[], config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            let verts = [];
            for(let i = 0; i < bins.length; i++) {
                if(i === 0) {
                    verts.push(Chalkboard.stat.lt(arr, bins[0], true));
                } else if(i === bins.length) {
                    verts.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                } else {
                    verts.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            let counts = [];
            for(let i = 0; i < verts.length; i++) {
                counts.push(verts[i].length);
            }
            config.context.beginPath();
            for(let i = 0; i < counts.length; i++) {
                config.context.lineTo(i / config.size, -counts[i] / config.size);
            }
            config.context.stroke();
            config.context.restore();
            return verts;
        },
        scatterplot: (arr1: number[], arr2: number[], config: {x: number, y: number, size: number, fillStyle: string, lineWidth: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.fillStyle = config.fillStyle;
            if(arr1.length === arr2.length) {
                for(let i = 0; i < arr1.length; i++) {
                    config.context.beginPath();
                    config.context.ellipse(arr1[i] / config.size - arr1.length / (2 * config.size), -arr2[i] / config.size + arr1.length / (2 * config.size), config.lineWidth, config.lineWidth, 0, 0, Chalkboard.PI(2));
                    config.context.fill();
                    data.push([arr1[i], arr2[i]]);
                }
            }
            config.context.restore();
            return data;
        },
        comp: (comp: ChalkboardComplex, config: {x: number, y: number, size: number, fillStyle: string, lineWidth: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            config.context.fillStyle = config.fillStyle;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.beginPath();
            config.context.ellipse(comp.a / config.size, -comp.b / config.size, config.lineWidth, config.lineWidth, 0, 0, Chalkboard.PI(2));
            config.context.fill();
            config.context.restore();
            return [[comp.a], [comp.b]];
        },
        vect: (vect: ChalkboardVector, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.beginPath();
            config.context.moveTo(0, 0);
            config.context.lineTo(vect.x / config.size, -vect.y / config.size);
            config.context.stroke();
            config.context.restore();
            return [[vect.x], [vect.y]];
        },
        field: (vectfield: ChalkboardVectorField, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [[number, number], [number, number]], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [[-10, 10], [-10, 10]],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth;
            config.context.save();
            config.context.translate(config.x, config.y);
            for(let i = config.domain[0][0] / config.size; i <= config.domain[0][1] / config.size; i += config.res) {
                for(let j = config.domain[1][0] / config.size; j <= config.domain[1][1] / config.size; j += config.res) {
                    let v = Chalkboard.vect.fromField(vectfield, Chalkboard.vect.new(i, j));
                    config.context.beginPath();
                    config.context.moveTo(i, j);
                    config.context.lineTo(i + v.x, j + v.y);
                    config.context.stroke();
                    data.push([i + v.x, j + v.y]);
                }
            }
            config.context.restore();
            return data;
        },
        matr: (matr: ChalkboardMatrix, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            for(let i = config.domain[0]; i <= config.domain[1]; i++) {
                Chalkboard.plot.vect(Chalkboard.vect.new(matr[0][0], matr[1][0]), {x: config.x, y: config.y + (i / config.size) * matr[1][1], size: config.size, strokeStyle: config.strokeStyle, lineWidth: config.lineWidth / 4, context: config.context});
                Chalkboard.plot.vect(Chalkboard.vect.new(-matr[0][0], -matr[1][0]), {x: config.x, y: config.y + (i / config.size) * matr[1][1], size: config.size, strokeStyle: config.strokeStyle, lineWidth: config.lineWidth / 4, context: config.context});
                Chalkboard.plot.vect(Chalkboard.vect.new(matr[0][1], matr[1][1]), {x: config.x + (i / config.size) * matr[0][0], y: config.y, size: config.size, strokeStyle: config.strokeStyle, lineWidth: config.lineWidth / 4, context: config.context});
                Chalkboard.plot.vect(Chalkboard.vect.new(-matr[0][1], -matr[1][1]), {x: config.x + (i / config.size) * matr[0][0], y: config.y, size: config.size, strokeStyle: config.strokeStyle, lineWidth: config.lineWidth / 4, context: config.context});
            }
            Chalkboard.plot.vect(Chalkboard.vect.new(matr[0][0], matr[1][0]), config);
            Chalkboard.plot.vect(Chalkboard.vet2.new(-matr[0][0], -matr[1][0]), config);
            Chalkboard.plot.vect(Chalkboard.vect.new(matr[0][1], matr[1][1]), config);
            Chalkboard.plot.vect(Chalkboard.vect.new(-matr[0][1], -matr[1][1]), config);
            return matr;
        },
        dfdx: (func: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if(func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.dfdx(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.dfdx(func, i)]);
                } else if(func.type === "inve") {
                    config.context.lineTo(Chalkboard.calc.dfdx(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.dfdx(func, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        d2fdx2: (func: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if(func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.d2fdx2(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.d2fdx2(func, i)]);
                } else if(func.type === "inve") {
                    config.context.lineTo(Chalkboard.calc.d2fdx2(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.d2fdx2(func, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        fxdx: (func: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if(func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.fxdx(func, 0, i)]);
                } else if(func.type === "inve") {
                    config.context.lineTo(Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.fxdx(func, 0, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        convolution: (func_1: ChalkboardFunction, func_2: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.convolution(func_1, func_2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.convolution(func_1, func_2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        correlation: (func_1: ChalkboardFunction, func_2: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.correlation(func_1, func_2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.correlation(func_1, func_2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        autocorrelation: (func: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.autocorrelation(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.autocorrelation(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        Taylor: (func: ChalkboardFunction, n: 0 | 1 | 2, a: number, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Taylor(func, i * config.size, n, a) / config.size);
                data.push([i, Chalkboard.calc.Taylor(func, i, n, a)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        Laplace: (func: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if( config.domain[0] >= 0) {
                for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            } else {
                for(let i = 0; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        },
        Fourier: (func: ChalkboardFunction, config: {x: number, y: number, size: number, strokeStyle: string, lineWidth: number, domain: [number, number], res: number, context: CanvasRenderingContext2D}): number[][] => {
            (config = {
                x: (config = config || {}).x || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2,
                y: config.y || Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || Chalkboard.real.parse(Chalkboard.CONTEXT)
            }).size /= 100;
            let data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for(let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Fourier(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.Fourier(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        }
    },
    geom: {
        EulerCharacteristic: (v: number, e: number, f: number): number => {
            return v - e + f;
        },
        Pythagorean: (a: number, b: number, type: "hyp" | "leg" = "hyp"): number => {
            if(type === "hyp") {
                return Math.sqrt((a * a) + (b * b));
            } else {
                return Math.sqrt((b * b) - (a * a));
            }
        },
        PythagoreanTriple: (inf: number, sup: number): [number, number, number] => {
            let a = 2 * Math.round(Chalkboard.numb.random(inf, sup)) - 1,
                b = ((a * a) / 2) - 0.5,
                c = ((a * a) / 2) + 0.5;
            return [a, b, c];
        },
        dist: (p1: number[], p2: number[]): number => {
            if(p1.length === p2.length) {
                let result = 0;
                for(let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return Chalkboard.real.sqrt(result);
            } else {
                throw new RangeError("Parameters \"p1\" and \"p2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        },
        distsq: (p1: number[], p2: number[]): number => {
            if(p1.length === p2.length) {
                let result = 0;
                for(let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return result;
            } else {
                throw new RangeError("Parameters \"p1\" and \"p2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        },
        mid: (p1: number[], p2: number[]): number[] => {
            if(p1.length === p2.length) {
                let result = [];
                for(let i = 0; i < p1.length; i++) {
                    result[i] = (p1[i] + p2[i]) / 2;
                }
                return result;
            } else {
                throw new RangeError("Parameters \"p1\" and \"p2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        },
        circleP: (r: number): number => {
            return 2 * Chalkboard.PI() * r;
        },
        circleA: (r: number): number => {
            return Chalkboard.PI() * r * r;
        },
        sectorP: (r: number, rad: number): number => {
            return r * rad;
        },
        sectorA: (r: number, rad: number): number => {
            return (r * r * rad) / 2;
        },
        ellipseP: (a: number, b: number): number => {
            let h = ((a - b) * (a - b)) / ((a + b) * (a + b));
            return Chalkboard.PI() * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        },
        ellipseA: (a: number, b: number): number => {
            return Chalkboard.PI() * a * b;
        },
        squareP: (s: number): number => {
            return 4 * s;
        },
        squareA: (s: number): number => {
            return s * s;
        },
        parallelogramP: (l: number, w: number): number => {
            return 2 * (l + w);
        },
        parallelogramA: (l: number, w: number): number => {
            return l * w;
        },
        triangleP: (a: number, b: number, c: number): number => {
            return a + b + c;
        },
        triangleA: (b: number, h: number): number => {
            return (b * h) / 2;
        },
        trianglesidesA: (a: number, b: number, c: number): number => {
            let s = (a + b + c) / 2;
            return Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c)));
        },
        trapezoidP: (a: number, b: number, c: number, d: number): number => {
            return a + b + c + d;
        },
        trapezoidA: (b1: number, b2: number, h: number): number => {
            return ((b1 + b2) / 2) * h;
        },
        polygonP: (n: number, s: number): number => {
            return n * s;
        },
        polygonA: (n: number, s: number, a: number): number => {
            return (n * s * a) / 2;
        },
        sphereA: (r: number): number => {
            return 4 * Chalkboard.PI() * r * r;
        },
        sphereV: (r: number): number => {
            return (4 * Chalkboard.PI() * r * r * r) / 3;
        },
        cylinderA: (r: number, h: number): number => {
            return 2 * Chalkboard.PI() * r * r + 2 * Chalkboard.PI() * r * h;
        },
        cylinderV: (r: number, h: number): number => {
            return Chalkboard.PI() * r * r * h;
        },
        coneA: (r: number, h: number): number => {
            return Chalkboard.PI() * r * (r + Chalkboard.real.sqrt(h * h + r * r));
        },
        coneV: (r: number, h: number): number => {
            return (Chalkboard.PI() * r * r * h) / 3;
        },
        cubeA: (s: number): number => {
            return 6 * s * s;
        },
        cubeV: (s: number): number => {
            return s * s * s;
        },
        rectangularprismA: (l: number, w: number, h: number): number => {
            return 2 * (l * h + l * h + w * h);
        },
        rectangularprismV: (l: number, w: number, h: number): number => {
            return l * w * h;
        },
        triangularprismA: (a: number, b: number, c: number, h: number): number => {
            let s = (a + b + c) / 2;
            return 2 * Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c))) + h * (a + b + c);
        },
        triangularprismV: (a: number, b: number, c: number, h: number): number => {
            return h * (Chalkboard.real.sqrt(-(a * a * a * a) + 2 * (a * b) * (a * b) + 2 * (a * c) * (a * c) - (b * b * b * b) + 2 * (b * c) * (b * c) - (c * c * c * c))) / 4;
        },
        line3D: (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, context: CanvasRenderingContext2D): void => {
            context = context || Chalkboard.real.parse(Chalkboard.CONTEXT);
            context.beginPath();
            context.moveTo(x1 / (z1 * 0.0025 + 1), y1 / (z1 * 0.0025 + 1));
            context.lineTo(x2 / (z2 * 0.0025 + 1), y2 / (z2 * 0.0025 + 1));
            context.stroke();
        }
    },
    trig: {
        toRad: (deg: number): number => {
            return deg * (Chalkboard.PI() / 180);
        },
        toDeg: (rad: number): number => {
            return rad * (180 / Chalkboard.PI());
        },
        coterminal: (rad: number): number => {
            return rad % (2 * Chalkboard.PI());
        },
        sin: (rad: number): number => {
            rad = Chalkboard.trig.coterminal(rad);
            return ((rad) - (Math.pow(rad, 3) / Chalkboard.numb.factorial(3)) + (Math.pow(rad, 5) / Chalkboard.numb.factorial(5)) - (Math.pow(rad, 7) / Chalkboard.numb.factorial(7)) + (Math.pow(rad, 9) / Chalkboard.numb.factorial(9)) - (Math.pow(rad, 11) / Chalkboard.numb.factorial(11)) + (Math.pow(rad, 13) / Chalkboard.numb.factorial(13)) - (Math.pow(rad, 15) / Chalkboard.numb.factorial(15)) + (Math.pow(rad, 17) / Chalkboard.numb.factorial(17)) - (Math.pow(rad, 19) / Chalkboard.numb.factorial(19)) + (Math.pow(rad, 21) / Chalkboard.numb.factorial(21)) - (Math.pow(rad, 23) / Chalkboard.numb.factorial(23)) + (Math.pow(rad, 25) / Chalkboard.numb.factorial(25)) - (Math.pow(rad, 27) / Chalkboard.numb.factorial(27)) + (Math.pow(rad, 29) / Chalkboard.numb.factorial(29)));
        },
        cos: (rad: number): number => {
            rad = Chalkboard.trig.coterminal(rad);
            return ((1) - (Math.pow(rad, 2) / Chalkboard.numb.factorial(2)) + (Math.pow(rad, 4) / Chalkboard.numb.factorial(4)) - (Math.pow(rad, 6) / Chalkboard.numb.factorial(6)) + (Math.pow(rad, 8) / Chalkboard.numb.factorial(8)) - (Math.pow(rad, 10) / Chalkboard.numb.factorial(10)) + (Math.pow(rad, 12) / Chalkboard.numb.factorial(12)) - (Math.pow(rad, 14) / Chalkboard.numb.factorial(14)) + (Math.pow(rad, 16) / Chalkboard.numb.factorial(16)) - (Math.pow(rad, 18) / Chalkboard.numb.factorial(18)) + (Math.pow(rad, 20) / Chalkboard.numb.factorial(20)) - (Math.pow(rad, 22) / Chalkboard.numb.factorial(22)) + (Math.pow(rad, 24) / Chalkboard.numb.factorial(24)) - (Math.pow(rad, 26) / Chalkboard.numb.factorial(26)) + (Math.pow(rad, 28) / Chalkboard.numb.factorial(28)));
        },
        tan: (rad: number): number => {
            return Chalkboard.trig.sin(rad) / Chalkboard.trig.cos(rad);
        },
        csc: (rad: number): number => {
            return 1 / Chalkboard.trig.sin(rad);
        },
        sec: (rad: number): number => {
            return 1 / Chalkboard.trig.cos(rad);
        },
        cot: (rad: number): number => {
            return 1 / Chalkboard.trig.tan(rad);
        },
        sinh: (rad: number): number => {
            return (Math.pow(Chalkboard.E(), rad) - Math.pow(Chalkboard.E(), -rad)) / 2;
        },
        cosh: (rad: number): number => {
            return (Math.pow(Chalkboard.E(), rad) + Math.pow(Chalkboard.E(), -rad)) / 2;
        },
        tanh: (rad: number): number => {
            return Chalkboard.trig.sinh(rad) / Chalkboard.trig.cosh(rad);
        },
        csch: (rad: number): number => {
            return 1 / Chalkboard.trig.sinh(rad);
        },
        sech: (rad: number): number => {
            return 1 / Chalkboard.trig.cosh(rad);
        },
        coth: (rad: number): number => {
            return 1 / Chalkboard.trig.tanh(rad);
        },
        arcsin: (rad: number): number | undefined => {
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
        arccos: (rad: number): number | undefined => {
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
        arctan: (rad: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (1 + x * x)"), 0, rad);
        },
        arctan2: (y: number, x: number): number => {
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
        arccsc: (rad: number): number | undefined => {
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
        arcsec: (rad: number): number | undefined => {
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
        arccot: (rad: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("1 / (1 + x * x)"), rad, 1000);
        },
        arcsinh: (rad: number): number => {
            return Math.log(rad + Math.sqrt(rad * rad + 1));
        },
        arccosh: (rad: number): number | undefined => {
            if(rad >= 1) {
                return Math.log(rad + Math.sqrt(rad * rad - 1));
            } else {
                return undefined;
            }
        },
        arctanh: (rad: number): number | undefined => {
            if(rad > -1 && rad < 1) {
                return (Math.log((1 + rad) / (1 - rad))) / 2;
            } else {
                return undefined;
            }
        },
        arccsch: (rad: number): number | undefined => {
            if(rad !== 0) {
                return Math.log((1 / rad) + Math.sqrt((1 / (rad * rad)) + 1));
            } else {
                return undefined;
            }
        },
        arcsech: (rad: number): number | undefined => {
            if(rad > 0 && rad <= 1) {
                return Math.log((1 / rad) + Math.sqrt((1 / (rad * rad)) - 1));
            } else {
                return undefined;
            }
        },
        arccoth: (rad: number): number | undefined => {
            if(rad < -1 || rad > 1) {
                return (Math.log((rad + 1) / (rad - 1))) / 2;
            } else {
                return undefined;
            }
        }
    },
    stat: {
        array: (inf: number, sup: number, length: number = sup - inf + 1): number[] => {
            let result = [];
            let step = (sup - inf) / (length - 1);
            for(let i = 0; i < length; i++) {
                result.push(inf + (step * i));
            }
            return result;
        },
        random: (inf: number, sup: number, length: number): number[] => {
            let result = [];
            for(let i = 0; i < length; i++) {
                result.push(Chalkboard.numb.random(inf, sup));
            }
            return result;
        },
        shuffle: (arr: number[]): number[] => {
            let index, temp, rindex;
            for(index = arr.length - 1; index > 0; index--) {
                rindex = Math.floor(Chalkboard.numb.random(0, index + 1));
                temp = arr[index];
                arr[index] = arr[rindex];
                arr[rindex] = temp;
            }
            return arr;
        },
        norm: (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number => {
            let result = 0;
            if(type === "L0") {
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result;
            } else if(type === "L1") {
                for(let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result;
            } else if(type === "L2") {
                for(let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return Chalkboard.real.sqrt(result);
            } else if(type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr));
            } else {
                throw new TypeError("Parameter \"type\" must be \"L0\", \"L1\", \"L2\", or \"LInfinity\".");
            }
        },
        normsq: (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number => {
            let result = 0;
            if(type === "L0") {
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result * result;
            } else if(type === "L1") {
                for(let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result * result;
            } else if(type === "L2") {
                for(let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return result;
            } else if(type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr)) * Math.abs(Chalkboard.stat.max(arr));
            } else {
                throw new TypeError("Parameter \"type\" must be \"L0\", \"L1\", \"L2\", or \"LInfinity\".");
            }
        },
        normalize: (arr: number[], type: "L0" | "L1" | "L2" | "LInfinity" = "L2"): number[] => {
            let result = [];
            let norm = Chalkboard.stat.norm(arr, type);
            for(let i = 0; i < arr.length; i++) {
                result.push(arr[i] / norm);
            }
            return result;
        },
        constrain: (arr: number[], range: [number, number] = [0, 1]): number[] => {
            let result = [];
            for(let i = 0; i < arr.length; i++) {
                result.push(Chalkboard.numb.constrain(arr[i], range));
            }
            return result;
        },
        eq: (arr: number[], arrORnum: number | number[]): number[] => {
            let result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(let i = 0; i < arr.length; i++) {
                        if(arr[i] === arrORnum[i]) {
                            result.push(arr[i]);
                        }
                    }
                }
            } else {
                for(let i = 0; i < arr.length; i++) {
                    if(arr[i] === arrORnum) {
                        result.push(arr[i]);
                    }
                }
            }
            return result;
        },
        ineq: (arr: number[], inf: number, sup: number, includeInf: boolean = false, includeSup: boolean = false): number[] => {
            let result = [];
            if(Array.isArray(inf) && Array.isArray(sup)) {
                if(arr.length === inf.length && arr.length === sup.length) {
                    for(let i = 0; i < arr.length; i++) {
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
                for(let i = 0; i < arr.length; i++) {
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
        lt: (arr: number[], arrORnum: number | number[], includeEnd: boolean = false): number[] => {
            let result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(let i = 0; i < arr.length; i++) {
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
                for(let i = 0; i < arr.length; i++) {
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
        gt: (arr: number[], arrORnum: number | number[], includeEnd: boolean = false): number[] => {
            let result = [];
            if(Array.isArray(arrORnum)) {
                if(arr.length === arrORnum.length) {
                    for(let i = 0; i < arr.length; i++) {
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
                for(let i = 0; i < arr.length; i++) {
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
        subsets: (arr: number[]): number[][] => {
            let result: number[][] = [[]];
            arr.sort();
            for(let i = 0; i < arr.length; i++) {
                if(i === 0 || arr[i] !== arr[i - 1]) {
                    let curr = arr[i];
                    let subsetsWithCurr = [];
                    for(let j = 0; j < result.length; j++) {
                        let subset = result[j].slice();
                        subset.push(curr);
                        subsetsWithCurr.push(subset);
                    }
                    result = result.concat(subsetsWithCurr);
                }
            }
            return result;
        },
        max: (arr: number[]): number => {
            let max = arr[0];
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        },
        min: (arr: number[]): number => {
            let min = arr[0];
            for(let i = 0; i < arr.length; i++) {
                if(arr[i] < min) {
                    min = arr[i];
                }
            }
            return min;
        },
        range: (arr: number[]): number => {
            return Chalkboard.stat.max(arr) - Chalkboard.stat.min(arr);
        },
        mean: (arr: number[], type: "arithmetic" | "geometric" | "harmonic" = "arithmetic"): number => {
            let result = 0;
            if(type === "arithmetic") {
                for(let i = 0; i < arr.length; i++) {
                    result += arr[i];
                }
                return result / arr.length;
            } else if(type === "geometric") {
                for(let i = 0; i < arr.length; i++) {
                    result *= arr[i];
                }
                return Chalkboard.real.root(Math.abs(result), arr.length);
            } else if(type === "harmonic") {
                for(let i = 0; i < arr.length; i++) {
                    result += 1 / arr[i];
                }
                return arr.length / result;
            } else {
                throw new TypeError("Parameter \"type\" must be \"arithmetic\", \"geometric\", or \"harmonic\".");
            }
        },
        median: (arr: number[]): number => {
            let temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            if(temp.length % 2 === 1) {
                return temp[Math.floor(temp.length / 2)];
            } else {
                return (temp[temp.length / 2] + temp[(temp.length / 2) - 1]) / 2;
            }
        },
        mode: (arr: number[]): number => {
            let temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            let bestStr = 1;
            let currStr = 1;
            let bestElm = temp[0];
            let currElm = temp[0];
            for(let i = 1; i < temp.length; i++) {
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
        deviation: (arr: number[]): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return Chalkboard.real.sqrt(result / arr.length);
        },
        variance: (arr: number[]): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        },
        mad: (arr: number[]): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                result += Math.abs(arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        },
        error: (arr: number[]): number => {
            return Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length);
        },
        skewness: (arr: number[]): number => {
            let result = 0;
            let mean = Chalkboard.stat.mean(arr);
            let deviation = Chalkboard.stat.deviation(arr);
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / ((arr.length - 1) * (deviation * deviation * deviation));
        },
        kurtosis: (arr: number[]): number => {
            let result = 0;
            let mean = Chalkboard.stat.mean(arr);
            let deviation = Chalkboard.stat.deviation(arr);
            for(let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / (deviation * deviation * deviation * deviation) - 3;
        },
        confidenceInterval: (arr: number[]): [number, number] => {
            return [Chalkboard.stat.mean(arr) - 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length)), Chalkboard.stat.mean(arr) + 1.96 * (Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length))];
        },
        percentile: (arr: number[], num: number): number => {
            let result = 0;
            for(let i = 0; i < arr.length; i++) {
                if(num >= arr[i]) {
                    result++;
                }
            }
            return (result / arr.length) * 100;
        },
        quartile: (arr: number[], type: "Q1" | "Q2" | "Q3"): number => {
            let temp = arr.slice().sort(function(a, b) {
                return a - b;
            });
            let lo = temp.slice(0, Math.floor(temp.length / 2));
            let hi = temp.slice(Math.ceil(temp.length / 2));
            if(type === "Q1") {
                return Chalkboard.stat.median(lo);
            } else if(type === "Q2") {
                return Chalkboard.stat.median(arr);
            } else if(type === "Q3") {
                return Chalkboard.stat.median(hi);
            } else {
                throw new TypeError("Parameter \"type\" must be \"Q1\", \"Q2\", or \"Q3\".");
            }
        },
        convolution: (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            for(let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for(let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[i - j];
                }
                result.push(sum);
            }
            return result;
        },
        correlation: (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            for(let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for(let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[arr2.length - 1 - i + j];
                }
                result.push(sum);
            }
            return result;
        },
        autocorrelation: (arr: number[]): number => {
            return Chalkboard.stat.correlation(arr, arr);
        },
        change: (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            if(arr1.length === arr2.length) {
                for(let i = 0; i < arr1.length; i++) {
                    result.push(Chalkboard.numb.change(arr1[i], arr2[i]));
                }
                return result;
            } else {
                throw new RangeError("Parameters \"arr1\" and \"arr2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        },
        chiSquared: (arr1: number[], arr2: number[]): number[] => {
            let result = [];
            if(arr1.length === arr2.length) {
                for(let i = 0; i < arr1.length; i++) {
                    result.push(((arr1[i] - arr2[i]) * (arr1[i] - arr2[i])) / arr2[i]);
                }
                return result;
            } else {
                throw new RangeError("Parameters \"arr1\" and \"arr2\" must be of type \"number[]\" with the same \"length\" property.");
            }
        },
        Gaussian: (height: number, mean: number, deviation: number): ChalkboardFunction => {
            return Chalkboard.real.function(height.toString() + " * Math.exp(-((x - " + mean.toString() + ") * (x - " + mean.toString() + ")) / (2 * " + deviation.toString() + " * " + deviation.toString() + "))");
        },
        regression: (data: number[][], type: "linear" | "polynomial" | "power" | "exponential" | "logarithmic" = "linear", degree: number = 2): ChalkboardFunction => {
            if(type === "linear") {
                let x = 0, y = 0;
                let xx = 0, xy = 0;
                for(let i = 0; i < data.length; i++) {
                    x += data[i][0];
                    y += data[i][1];
                    xx += data[i][0] * data[i][0];
                    xy += data[i][0] * data[i][1];
                }
                let a = (data.length * xy - x * y) / (data.length * xx - x * x),
                    b = (y / data.length) - (a * x) / data.length;
                return Chalkboard.real.function(a + " * x + " + b);
            } else if(type === "polynomial") {
                let A = Chalkboard.matr.new();
                for(let i = 0; i < data.length; i++) {
                    A.push([]);
                    for(let j = 0; j <= degree; j++) {
                        A[i].push(Chalkboard.real.pow(data[i][0], j));
                    }
                }
                let AT = Chalkboard.matr.transpose(A);
                let B = Chalkboard.matr.new();
                for(let i = 0; i < data.length; i++) {
                    B.push([data[i][1]]);
                }
                let ATA = Chalkboard.matr.mul(AT, A);
                let ATAI = Chalkboard.matr.invert(ATA);
                let x = Chalkboard.matr.mul(Chalkboard.matr.mul(ATAI, AT), B);
                let coeff = [];
                for(let i = 0; i < x.length; i++) {
                    coeff.push(x[i][0]);
                }
                let f = coeff[0].toString() + " + " + coeff[1].toString() + " * x";
                for(let i = 2; i <= degree; i++) {
                    f += " + " + coeff[i].toString() + " * Math.pow(x, " + i + ")";
                }
                return Chalkboard.real.function(f);
            } else if(type === "power") {
                let arr = [0, 0, 0, 0];
                for(let i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                let a = Chalkboard.E((arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length),
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.function(a + " * Math.pow(x, " + b + ")");
            } else if(type === "exponential") {
                let arr = [0, 0, 0, 0, 0, 0];
                for(let i = 0; i < data.length; i++) {
                    arr[0] += data[i][0];
                    arr[1] += data[i][1];
                    arr[2] += data[i][0] * data[i][0] * data[i][1];
                    arr[3] += data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[4] += data[i][0] & data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[5] += data[i][0] * data[i][1];
                }
                let a = Chalkboard.E((arr[2] * arr[3] - arr[5] * arr[4]) / (arr[1] * arr[2] - arr[5] * arr[5])),
                    b = (arr[1] * arr[4] - arr[5] * arr[3]) / (arr[1] * arr[2] - arr[5] * arr[5]);
                return Chalkboard.real.function(a + "* Math.exp(" + b + " * x)");
            } else if(type === "logarithmic") {
                let arr = [0, 0, 0, 0];
                for(let i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                let a = (arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length,
                    b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.function(a + " + " + b + " * Math.log(x)");
            } else {
                throw new TypeError("Parameter \"type\" must be \"linear\", \"polynomial\", \"power\", \"exponential\", or \"logarithmic\".");
            }
        },
        toVector: (arr: number[], dimension: 2 | 3 | 4, index: number = 0): ChalkboardVector => {
            if(dimension === 2) {
                return Chalkboard.vect.new(arr[index], arr[index + 1]);
            } else if(dimension === 3) {
                return Chalkboard.vect.new(arr[index], arr[index + 1], arr[index + 2]);
            } else if(dimension === 4) {
                return Chalkboard.vect.new(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                throw new RangeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        },
        toMatrix: (arr: number[], rows: number, cols: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            let index = 0;
            for(let i = 0; i < rows; i++) {
                result[i] = [];
                for(let j = 0; j < cols; j++) {
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
        toTensor: (arr: number[], ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(arr, size);
        },
        toObject: (arr: number[]): object => {
            let result: {[key: string]: number} = {};
            for(let i = 0; i < arr.length; i++) {
                result["_" + i.toString()] = arr[i];
            }
            return result;
        },
        toString: (arr: number[]): string => {
            return "[" + arr.join(", ") + "]";
        },
        print: (arr: number[]): void => {
            console.log(Chalkboard.stat.toString(arr));
        }
    },
    vect: {
        new: (x: number, y: number, z?: number, w?: number): ChalkboardVector => {
            if(z === undefined && w === undefined) {
                return {x: x, y: y};
            } else if(w === undefined) {
                return {x: x, y: y, z: z};
            } else {
                return {x: x, y: y, z: z, w: w};
            }
        },
        field: (p: string, q: string, r?: string, s?: string): ChalkboardVectorField => {
            if(r === undefined && s === undefined) {
                return {p: p, q: q};
            } else if(s === undefined) {
                return {p: p, q: q, r: r};
            } else {
                return {p: p, q: q, r: r, s: s};
            }
        },
        fromField: (vectfield: ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector => {
            if(Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                let p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                return Chalkboard.vect.new(p(vect.x, vect.y), q(vect.x, vect.y));
            } else if(Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                let p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                return Chalkboard.vect.new(p(vect.x, vect.y, vect.z), q(vect.x, vect.y, vect.z), r(vect.x, vect.y, vect.z));
            } else if(Chalkboard.vect.dimension(vectfield) === 4 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                let p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                return Chalkboard.vect.new(p(vect.x, vect.y, vect.z, vect.w), q(vect.x, vect.y, vect.z, vect.w), r(vect.x, vect.y, vect.z, vect.w), s(vect.x, vect.y, vect.z, vect.w));
            } else {
                throw new TypeError("Parameters \"vectfield\" and \"vect\" must respectively be of type \"ChalkboardVector\" and \"ChalkboardVectorField\" with 2, 3, or 4 dimensions.");
            }
        },
        copy: (vect: ChalkboardVector): ChalkboardVector => {
            return Object.create(Object.getPrototypeOf(vect), Object.getOwnPropertyDescriptors(vect));
        },
        dimension: (vectORvectfield: ChalkboardVector | ChalkboardVectorField): 2 | 3 | 4 => {
            let vect = vectORvectfield as ChalkboardVector;
            let vectfield = vectORvectfield as ChalkboardVectorField;
            if((typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") || (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "undefined" && typeof vectfield.s === "undefined")) {
                return 2;
            } else if((typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") || (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "string" && typeof vectfield.s === "undefined")) {
                return 3;
            } else if((typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") || (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "string" && typeof vectfield.s === "string")) {
                return 4;
            } else {
                throw new TypeError("Parameter \"vectORvectfield\" must be of type \"ChalkboardVector\" or \"ChalkboardVectorField\" with 2, 3, or 4 dimensions.");
            }
        },
        push: (vect: ChalkboardVector, component: 1 | 2 | 3 | 4, num: number): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return Chalkboard.vect.new(num, vect.y);
                } else if(component === 2) {
                    return Chalkboard.vect.new(vect.x, num);
                } else if(component === 3) {
                    return Chalkboard.vect.new(vect.x, vect.y, num);
                } else {
                    return Chalkboard.vect.new(vect.x, vect.y, 0, num);
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return Chalkboard.vect.new(num, vect.y, vect.z);
                } else if(component === 2) {
                    return Chalkboard.vect.new(vect.x, num, vect.z);
                } else if(component === 3) {
                    return Chalkboard.vect.new(vect.x, vect.y, num);
                } else {
                    return Chalkboard.vect.new(vect.x, vect.y, vect.z, num);
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(component === 1) {
                    return Chalkboard.vect.new(num, vect.y, vect.z, vect.w);
                } else if(component === 2) {
                    return Chalkboard.vect.new(vect.x, num, vect.z, vect.w);
                } else if(component === 3) {
                    return Chalkboard.vect.new(vect.x, vect.y, num, vect.w);
                } else {
                    return Chalkboard.vect.new(vect.x, vect.y, vect.z, num);
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        pull: (vect: ChalkboardVector, component: 1 | 2 | 3 | 4): number | ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return vect.y;
                } else {
                    return vect.x;
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return Chalkboard.vect.new(0, vect.y, vect.z);
                } else if(component === 2) {
                    return Chalkboard.vect.new(vect.x, 0, vect.z);
                } else {
                    return Chalkboard.vect.new(vect.x, vect.y);
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(component === 1) {
                    return Chalkboard.vect.new(0, vect.y, vect.z, vect.w);
                } else if(component === 2) {
                    return Chalkboard.vect.new(vect.x, 0, vect.z, vect.w);
                } else if(component === 3) {
                    return Chalkboard.vect.new(vect.x, vect.y, 0, vect.w);
                } else {
                    return Chalkboard.vect.new(vect.x, vect.y, vect.z);
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        fill: (num: number, dimension: 2 | 3 | 4): ChalkboardVector => {
            if(dimension === 2) {
                return Chalkboard.vect.new(num, num);
            } else if(dimension === 3) {
                return Chalkboard.vect.new(num, num, num);
            } else if(dimension === 4) {
                return Chalkboard.vect.new(num, num, num, num);
            } else {
                throw new TypeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        },
        empty: (dimension: 2 | 3 | 4): ChalkboardVector => {
            if(dimension === 2) {
                return Chalkboard.vect.new(null, null);
            } else if(dimension === 3) {
                return Chalkboard.vect.new(null, null, null)
            } else if(dimension === 4) {
                return Chalkboard.vect.new(null, null, null, null);
            } else {
                throw new TypeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        },
        random: (inf: number, sup: number, dimension: 2 | 3 | 4): ChalkboardVector => {
            if(dimension === 2) {
                return Chalkboard.vect.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else if(dimension === 3) {
                return Chalkboard.vect.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else if(dimension === 4) {
                return Chalkboard.vect.new(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else {
                throw new TypeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        },
        mag: (vect: ChalkboardVector): number => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z) + (vect.w * vect.w));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        magsq: (vect: ChalkboardVector): number => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return (vect.x * vect.x) + (vect.y * vect.y);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return (vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return (vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z) + (vect.w * vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        magset: (vect: ChalkboardVector, num: number): ChalkboardVector => {
            return Chalkboard.vect.scl(Chalkboard.vect.normalize(vect), num);
        },
        normalize: (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect))
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z / Chalkboard.vect.mag(vect));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z / Chalkboard.vect.mag(vect), vect.w / Chalkboard.vect.mag(vect));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        ang: (vect: ChalkboardVector): number | number[] => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.trig.arctan2(vect.y, vect.x);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return [Math.acos(vect.x / Chalkboard.vect.mag(vect)), Math.acos(vect.y / Chalkboard.vect.mag(vect)), Math.acos(vect.z / Chalkboard.vect.mag(vect))];
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return [Math.acos(vect.x / Chalkboard.vect.mag(vect)), Math.acos(vect.y / Chalkboard.vect.mag(vect)), Math.acos(vect.z / Chalkboard.vect.mag(vect)), Math.acos(vect.w / Chalkboard.vect.mag(vect))];
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        angBetween: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            return Math.acos((Chalkboard.vect.dot(vect_1, vect_2)) / (Chalkboard.vect.mag(vect_1) * Chalkboard.vect.mag(vect_2)));
        },
        slope: (vect: ChalkboardVector): number => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return vect.y / vect.x;
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return vect.z / Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return vect.w / Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        zero: (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x * 0, vect.y * 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x * 0, vect.y * 0, vect.z * 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(vect.x * 0, vect.y * 0, vect.z * 0, vect.w * 0);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        negate: (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(-vect.x, -vect.y);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(-vect.x, -vect.y, -vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(-vect.x, -vect.y, -vect.z, -vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        reciprocate: (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(1 / vect.x, 1 / vect.y);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(1 / vect.x, 1 / vect.y, 1 / vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(1 / vect.x, 1 / vect.y, 1 / vect.z, 1 / vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        absolute: (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(Math.abs(vect.x), Math.abs(vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z), Math.abs(vect.w));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        round: (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(Math.round(vect.x), Math.round(vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z), Math.round(vect.w));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        dist: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.real.sqrt(((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.real.sqrt(((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z)));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.real.sqrt(((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z)) + ((vect_2.w - vect_1.w) * (vect_2.w - vect_1.w)));
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        distsq: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return ((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return ((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return ((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z)) + ((vect_2.w - vect_1.w) * (vect_2.w - vect_1.w));
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        scl: (vect: ChalkboardVector, num: number): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x * num, vect.y * num);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x * num, vect.y * num, vect.z * num);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(vect.x * num, vect.y * num, vect.z * num, vect.w * num);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        constrain: (vect: ChalkboardVector, range: [number, number] = [0, 1]): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z, range));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z, range), Chalkboard.numb.constrain(vect.w, range));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        add: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new(vect_1.x + vect_2.x, vect_1.y + vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new(vect_1.x + vect_2.x, vect_1.y + vect_2.y, vect_1.z + vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.vect.new(vect_1.x + vect_2.x, vect_1.y + vect_2.y, vect_1.z + vect_2.z, vect_1.w + vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        sub: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new(vect_1.x - vect_2.x, vect_1.y - vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new(vect_1.x - vect_2.x, vect_1.y - vect_2.y, vect_1.z - vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.vect.new(vect_1.x - vect_2.x, vect_1.y - vect_2.y, vect_1.z - vect_2.z, vect_1.w - vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        mul: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new(vect_1.x * vect_2.x, vect_1.y * vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new(vect_1.x * vect_2.x, vect_1.y * vect_2.y, vect_1.z * vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.vect.new(vect_1.x * vect_2.x, vect_1.y * vect_2.y, vect_1.z * vect_2.z, vect_1.w * vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        dot: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return (vect_1.x * vect_2.x) + (vect_1.y * vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return (vect_1.x * vect_2.x) + (vect_1.y * vect_2.y) + (vect_1.z * vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return (vect_1.x * vect_2.x) + (vect_1.y * vect_2.y) + (vect_1.z * vect_2.z) + (vect_1.w * vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        cross: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new(0, 0, (vect_1.x * vect_2.y) - (vect_1.y * vect_2.x));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.new((vect_1.y * vect_2.z) - (vect_1.z * vect_2.y), (vect_1.z * vect_2.x) - (vect_1.x * vect_2.z), (vect_1.x * vect_2.y) - (vect_1.y * vect_2.x));
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2 or 3 dimensions.");
            }
        },
        scalarTriple: (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector): number => {
            return Chalkboard.vect.dot(vect_1, Chalkboard.vect.cross(vect_2, vect_3));
        },
        vectorTriple: (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(vect_1, Chalkboard.vect.cross(vect_2, vect_3));
        },
        scalarQuadruple: (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector, vect_4: ChalkboardVector): number => {
            return Chalkboard.vect.dot(Chalkboard.vect.cross(vect_1, vect_2), Chalkboard.vect.cross(vect_3, vect_4));
        },
        vectorQuadruple: (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector, vect_4: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(Chalkboard.vect.cross(vect_1, vect_2), Chalkboard.vect.cross(vect_3, vect_4));
        },
        proj: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.scl(vect_2, Chalkboard.vect.dot(vect_1, vect_2) / Chalkboard.vect.dot(vect_2, vect_2));
        },
        oproj: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.sub(vect_1, Chalkboard.vect.proj(vect_1, vect_2));
        },
        reflect: (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.sub(vect_1, Chalkboard.vect.scl(vect_2, 2 * Chalkboard.vect.dot(vect_1, vect_2)));
        },
        refract: (vect_1: ChalkboardVector, vect_2: ChalkboardVector, refractiveIndex: number): ChalkboardVector => {
            if(refractiveIndex > 0) {
                let perp = Chalkboard.vect.scl(Chalkboard.vect.sub(vect_1, Chalkboard.vect.scl(vect_2, Chalkboard.vect.dot(vect_1, vect_2))), refractiveIndex);
                let parr = Chalkboard.vect.scl(vect_2, -Chalkboard.real.sqrt(1 - (refractiveIndex * refractiveIndex) * (1 - (Chalkboard.vect.dot(vect_1, vect_2) * Chalkboard.vect.dot(vect_1, vect_2)))));
                return Chalkboard.vect.add(perp, parr);
            } else {
                throw new RangeError("Parameter \"refractiveIndex\" must be of type \"number\" greater than 0.");
            }
        },
        fromAngle: (rad1: number, rad2?: number): ChalkboardVector => {
            if(typeof rad2 === "undefined") {
                return Chalkboard.vect.new(Chalkboard.trig.cos(rad1), Chalkboard.trig.sin(rad1));
            } else {
                return Chalkboard.vect.new(Chalkboard.trig.cos(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad2));
            }
        },
        fromVector: (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x, vect.y, 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.new(vect.x, vect.y, vect.z, 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.new(vect.x, vect.y);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        fromAlternateToCartesian: (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            if(type === "polar") {
                return Chalkboard.vect.new(vect.x * Chalkboard.trig.cos(vect.y), vect.y * Chalkboard.trig.sin(vect.y));
            } else if(type === "bipolar") {
                return Chalkboard.vect.new((vect.x * vect.x - vect.y * vect.y) / 4, Chalkboard.real.sqrt(16 * vect.x * vect.x - (vect.x * vect.x - vect.y * vect.y + 4) * (vect.x * vect.x - vect.y * vect.y + 4)));
            } else if(type === "cylindrical") {
                return Chalkboard.vect.new(vect.x * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.y), vect.z);
            } else if(type === "spherical") {
                return Chalkboard.vect.new(vect.x * Chalkboard.trig.sin(vect.z) * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.z) * Chalkboard.trig.sin(vect.y), vect.x * Chalkboard.trig.cos(vect.z));
            } else {
                throw new TypeError("Parameter \"type\" must be \"polar\", \"bipolar\", \"cylindrical\", or \"spherical\".");
            }
        },
        fromCartesianToAlternate: (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            if(type === "polar") {
                return Chalkboard.vect.new(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(vect));
            } else if(type === "bipolar") {
                return Chalkboard.vect.new((vect.x + 1) * (vect.x + 1) + (vect.y * vect.y), (vect.x - 1) * (vect.x - 1) + (vect.y * vect.y));
            } else if(type === "cylindrical") {
                return Chalkboard.vect.new(Chalkboard.vect.mag(Chalkboard.vect.new(vect.x, vect.y)), Chalkboard.vect.ang(Chalkboard.vect.new(vect.x, vect.y)), vect.z);
            } else if(type === "spherical") {
                return Chalkboard.vect.new(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(Chalkboard.vect.new(vect.x, vect.y)), Chalkboard.vect.ang(vect)[2]);
            } else {
                throw new TypeError("Parameter \"type\" must be \"polar\", \"bipolar\", \"cylindrical\", or \"spherical\".");
            }
        },
        toComplex: (vect: ChalkboardVector): ChalkboardComplex => {
            return Chalkboard.comp.new(vect.x, vect.y);
        },
        toQuaternion: (vect: ChalkboardVector): ChalkboardQuaternion => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.quat.new(vect.x, vect.y, 0, 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.quat.new(0, vect.x, vect.y, vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.quat.new(vect.x, vect.y, vect.z, vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        toMatrix: (vect: ChalkboardVector, type: "col" | "row" = "col"): ChalkboardMatrix => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(type === "col") {
                    return Chalkboard.matr.new([vect.x], [vect.y]);
                } else if(type === "row") {
                    return Chalkboard.matr.new([vect.x, vect.y]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(type === "col") {
                    return Chalkboard.matr.new([vect.x], [vect.y], [vect.z]);
                } else if(type === "row") {
                    return Chalkboard.matr.new([vect.x, vect.y, vect.z]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(type === "col") {
                    return Chalkboard.matr.new([vect.x], [vect.y], [vect.z], [vect.w]);
                } else if(type === "row") {
                    return Chalkboard.matr.new([vect.x, vect.y, vect.z, vect.w]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        toTensor: (vect: ChalkboardVector, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(Chalkboard.vect.toMatrix(vect), size);
        },
        toArray: (vect: ChalkboardVector): [number, number] | [number, number, number] | [number, number, number, number] => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return [vect.x, vect.y];
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return [vect.x, vect.y, vect.z];
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return [vect.x, vect.y, vect.z, vect.w];
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        toString: (vect: ChalkboardVector): string => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ")";
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z.toString() + ")";
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z.toString() + ", " + vect.w.toString() + ")";
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        print: (vect: ChalkboardVector): void => {
            console.log(Chalkboard.vect.toString(vect));
        }
    },
    matr: {
        new: (...matrix: number[][] | number[][][]): ChalkboardMatrix => {
            if(matrix.length === 0) {
                return [];
            } else if(Array.isArray(matrix[0]) && Array.isArray(matrix[0][0])) {
                return (matrix as number[][][])[0];
            } else {
                return matrix as number[][];
            }
        },
        copy: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result.push([]);
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i].push(matr[i][j]);
                }
            }
            return result;
        },
        rows: (matr: ChalkboardMatrix): number => {
            return matr.length;
        },
        cols: (matr: ChalkboardMatrix): number => {
            return matr[0].length;
        },
        resize: (matr: ChalkboardMatrix, rows: number, cols: number): ChalkboardMatrix => {
            if(cols === undefined) {
                cols = rows;
            }
            let result = Chalkboard.matr.new();
            let flat = Chalkboard.matr.toArray(matr);
            let index = 0;
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(index < flat.length ? flat[index++] : 0);
                }
            }
            return result;
        },
        push: (matr: ChalkboardMatrix, type: "row" | "col", rowORcol: number, elements: number[]): ChalkboardMatrix => {
            rowORcol -= 1;
            if(type === "row") {
                matr.splice(rowORcol, 0, elements);
                return matr;
            } else if(type === "col") {
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 0, elements[i]);
                }
                return matr;
            } else {
                throw new TypeError("Parameter \"type\" must be \"row\" or \"col\".");
            }
        },
        pull: (matr: ChalkboardMatrix, type: "row" | "col", rowORcol: number): ChalkboardMatrix => {
            rowORcol -= 1;
            if(type === "row") {
                matr.splice(rowORcol, 1);
                return matr;
            } else if(type === "col") {
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(rowORcol, 1);
                }
                return matr;
            } else {
                throw new TypeError("Parameter \"type\" must be \"row\" or \"col\".");
            }
        },
        fill: (element: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(element);
                }
            }
            return result;
        },
        empty: (rows: number, cols: number = rows): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(null);
                }
            }
            return result;
        },
        identity: (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < size; i++) {
                result.push(Array(size).fill(0));
                result[i][i] = 1;
            }
            return result;
        },
        exchange: (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.fill(0, size, size);
            for(let i = 0; i < size; i++) {
                for(let j = 0; j < size; j++) {
                    if(i + j === size - 1) {
                        result[i][j] = 1;
                    }
                }
            }
            return result;
        },
        random: (inf: number, sup: number, rows: number, cols: number = rows): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < rows; i++) {
                result.push([]);
                for(let j = 0; j < cols; j++) {
                    result[i].push(Chalkboard.numb.random(inf, sup));
                }
            }
            return result;
        },
        shift: (size: number, shiftAmount: number = 1): ChalkboardMatrix => {
            let result = Chalkboard.matr.fill(0, size, size);
            for(let i = 0; i < size; i++) {
                for(let j = 0; j < size; j++) {
                    result[i][j] = Chalkboard.numb.Kronecker(i + shiftAmount, j);
                }
            }
            return result;
        },
        binomial: (size: number, type: "lower" | "upper" | "symmetric" = "lower"): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < size; i++) {
                result.push([]);
                for(let j = 0; j < size; j++) {
                    if(type === "lower") {
                        result[i].push(Chalkboard.numb.binomial(i, j));
                    } else if(type === "upper") {
                        result[i].push(Chalkboard.numb.binomial(j, i));
                    }
                }
            }
            if(type === "symmetric") {
                return Chalkboard.matr.mul(Chalkboard.matr.binomial(size, "lower"), Chalkboard.matr.binomial(size, "upper"));
            } else {
                return result;
            }
        },
        Hilbert: (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < size; i++) {
                result.push([]);
                for(let j = 0; j < size; j++) {
                    result[i].push(1 / (i + j + 1));
                }
            }
            return result;
        },
        Lehmer: (size: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < size; i++) {
                result.push([]);
                for(let j = 0; j < size; j++) {
                    result[i].push(Math.min(i + 1, j + 1) / Math.max(i + 1, j + 1));
                }
            }
            return result;
        },
        cofactor: (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            return matr.slice(0, row - 1).concat(matr.slice(row)).map(function(row) {
                return row.slice(0, col - 1).concat(row.slice(col));
            });
        },
        adjugate: (matr: ChalkboardMatrix, row: number, col: number): ChalkboardMatrix => {
            return Chalkboard.matr.transpose(Chalkboard.matr.cofactor(matr, row, col));
        },
        det: (matr: ChalkboardMatrix): number => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let result = 0;
                if(Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                } else if(Chalkboard.matr.rows(matr) === 2) {
                    return (matr[0][0] * matr[1][1]) - (matr[0][1] * matr[1][0]);
                } else {
                    for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        let cofactor = matr[0][i] * Chalkboard.matr.det(Chalkboard.matr.cofactor(matr, 1, i + 1));
                        result += i % 2 === 0 ? cofactor : -cofactor;
                    }
                    return result;
                }
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        },
        trace: (matr: ChalkboardMatrix): number => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let result = 0;
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result += matr[i][i];
                }
                return result;
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        },
        rank: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            return Chalkboard.matr.reduce(matr).filter(function(row: number[]) {
                return row.some(function(element) {
                    return element !== 0;
                });
            }).length;
        },
        rowspace: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            return Chalkboard.matr.reduce(matr).filter(function(row: number[]) {
                return row.some(function(element) {
                    return element !== 0;
                });
            });
        },
        colspace: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            return Chalkboard.matr.transpose(Chalkboard.matr.rowspace(Chalkboard.matr.transpose(matr)));
        },
        nullspace: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let augmented = matr.map(function(row) {
                return row.slice().concat(Array(Chalkboard.matr.rows(matr)).fill(0));
            });
            let reduced = Chalkboard.matr.reduce(augmented);
            return reduced.filter(function(row: number[]) {
                return row.slice(0, Chalkboard.matr.rows(matr)).every(function(element) {
                    return element === 0;
                });
            }).map(function(row: number[]) {
                return row.slice(Chalkboard.matr.rows(matr));
            });
        },
        transpose: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.cols(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.rows(matr); j++) {
                    result[i][j] = matr[j][i];
                }
            }
            return result;
        },
        invert: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let result = Chalkboard.matr.new();
                let augmented = Chalkboard.matr.new();
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    augmented.push(matr[i].concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
                    augmented[i][Chalkboard.matr.cols(matr) + i] = 1;
                }
                for(let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                    let diagonal = augmented[row][row];
                    if(diagonal === 0) {
                        let max = row;
                        for(let i = row + 1; i < Chalkboard.matr.rows(matr); i++) {
                            if(Math.abs(augmented[i][row]) > Math.abs(augmented[max][row])) {
                                max = i;
                            }
                        }
                        let temp = augmented[row];
                        augmented[row] = augmented[max];
                        augmented[max] = temp;
                        diagonal = augmented[row][row];
                    }
                    for(let col = 0; col < 2 * Chalkboard.matr.cols(matr); col++) {
                        augmented[row][col] /= diagonal;
                    }
                    for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        if(i !== row) {
                            let coeff = augmented[i][row];
                            for(let j = 0; j < 2 * Chalkboard.matr.cols(matr); j++) {
                                augmented[i][j] -= coeff * augmented[row][j];
                            }
                        }
                    }
                }
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result.push(augmented[i].slice(Chalkboard.matr.cols(matr), 2 * Chalkboard.matr.cols(matr)));
                }
                return result;
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        },
        LUdecomp: (matr: ChalkboardMatrix): {L: ChalkboardMatrix, U: ChalkboardMatrix} => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                let L = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                    U = Chalkboard.matr.fill(0, Chalkboard.matr.rows(matr));
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    for(let i = 0; i <= j; i++) {
                        let sum = 0;
                        for(let k = 0; k < i; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        U[i][j] = matr[i][j] - sum;
                    }
                    for(let i = j + 1; i < Chalkboard.matr.rows(matr); i++) {
                        let sum = 0;
                        for(let k = 0; k < j; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        L[i][j] = (matr[i][j] - sum) / U[j][j];
                    }
                }
                return {L: L, U: U};
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        },
        QRdecomp: (matr: ChalkboardMatrix): {Q: ChalkboardMatrix, R: ChalkboardMatrix} => {
            let Q = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)),
                R = Chalkboard.matr.copy(matr);
            for(let j = 0; j < Math.min(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)) - (Chalkboard.matr.rows(matr) > Chalkboard.matr.cols(matr) ? 0 : 1); j++) {
                let norm = 0;
                for(let i = j; i < Chalkboard.matr.rows(matr); i++) {
                    norm += R[i][j] * R[i][j];
                }
                norm = Chalkboard.real.sqrt(norm);
                let v = [];
                v[0] = norm - R[j][j];
                let normalizer = v[0] * v[0];
                for(let i = 1; i < Chalkboard.matr.rows(matr) - j; i++) {
                    v[i] = -R[i + j][j];
                    normalizer += v[i] * v[i];
                }
                normalizer = 1 / Chalkboard.real.sqrt(normalizer);
                for(let i = 0; i < v.length; i++) {
                    v[i] *= normalizer;
                }
                R[j][j] = norm;
                for(let i = j + 1; i < Chalkboard.matr.rows(R); i++) {
                    R[i][j] = 0;
                }
                for(let k = j + 1; k < Chalkboard.matr.cols(R); k++) {
                    let dot = 0;
                    for(let i = 0; i < v.length; i++) {
                        dot += v[i] * R[i + j][k];
                    }
                    dot *= 2;
                    for(let i = 0; i < v.length; i++) {
                        R[i + j][k] -= dot * v[i];
                    }
                }
                for(let k = 0; k < Chalkboard.matr.cols(Q); k++) {
                    let dot = 0;
                    for(let i = 0; i < v.length; i++) {
                        dot += v[i] * Q[k][i + j];
                    }
                    dot *= 2;
                    for(let i = 0; i < v.length; i++) {
                        Q[k][i + j] -= dot * v[i];
                    }
                }
            }
            return {Q: Q, R: R};
        },
        zero: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = 0;
                }
            }
            return result;
        },
        negate: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = -matr[i][j];
                }
            }
            return result;
        },
        reciprocate: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = 1 / matr[i][j];
                }
            }
            return result;
        },
        absolute: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.abs(matr[i][j]);
                }
            }
            return result;
        },
        round: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Math.round(matr[i][j]);
                }
            }
            return result;
        },
        scaler: (vect: ChalkboardVector): ChalkboardMatrix => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.new([vect.x, 0], [0, vect.y]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.new([vect.x, 0, 0], [0, vect.y, 0], [0, 0, vect.z]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.new([vect.x, 0, 0, 0], [0, vect.y, 0, 0], [0, 0, vect.z, 0], [0, 0, 0, vect.w]);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        translator: (vect: ChalkboardVector): ChalkboardMatrix => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.new([1, 0, vect.x], [0, 1, vect.y], [0, 0, 1]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.new([1, 0, 0, vect.x], [0, 1, 0, vect.y], [0, 0, 1, vect.z], [0, 0, 0, 1]);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.new([1, 0, 0, 0, vect.x], [0, 1, 0, 0, vect.y], [0, 0, 1, 0, vect.z], [0, 0, 0, 1, vect.w], [0, 0, 0, 0, 1]);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        rotator: (radx: number, rady?: number, radz?: number): ChalkboardMatrix => {
            if(rady === undefined && radz === undefined) {
                return Chalkboard.matr.new([Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]);
            } else {
                let matr_x = Chalkboard.matr.new([1, 0, 0], [0, Chalkboard.trig.cos(radx), -Chalkboard.trig.sin(radx)], [0, Chalkboard.trig.sin(radx), Chalkboard.trig.cos(radx)]),
                    matr_y = Chalkboard.matr.new([Chalkboard.trig.cos(rady), 0, Chalkboard.trig.sin(rady)], [0, 1, 0], [-Chalkboard.trig.sin(rady), 0, Chalkboard.trig.cos(rady)]),
                    matr_z = Chalkboard.matr.new([Chalkboard.trig.cos(radz), -Chalkboard.trig.sin(radz), 0], [Chalkboard.trig.sin(radz), Chalkboard.trig.cos(radz), 0], [0, 0, 1]);
                return Chalkboard.matr.mul(matr_x, Chalkboard.matr.mul(matr_y, matr_z));
            }
        },
        scl: (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = matr[i][j] * num;
                }
            }
            return result;
        },
        constrain: (matr: ChalkboardMatrix, range: [number, number] = [0, 1]): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result[i] = [];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result[i][j] = Chalkboard.numb.constrain(matr[i][j], range);
                }
            }
            return result;
        },
        concat: (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix, type: "row" | "col" = "row"): ChalkboardMatrix => {
            if(type === "row") {
                if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2)) {
                    return Chalkboard.matr.new(matr_1.concat(matr_2));
                } else {
                    throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows.");
                }
            } else if(type === "col") {
                if(Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                    let result = Chalkboard.matr.new();
                    for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                        result.push(matr_1[i].concat(matr_2[i]));
                    }
                    return result;
                } else {
                    throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of columns.");
                }
            } else {
                throw new TypeError("Parameter \"type\" must be \"row\" or \"col\".");
            }
        },
        add: (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                let result = Chalkboard.matr.new();
                for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(let j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                        result[i][j] = matr_1[i][j] + matr_2[i][j];
                    }
                }
                return result;
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows and columns.");
            }
        },
        sub: (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.rows(matr_2) && Chalkboard.matr.cols(matr_1) === Chalkboard.matr.cols(matr_2)) {
                let result = Chalkboard.matr.new();
                for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(let j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                        result[i][j] = matr_1[i][j] - matr_2[i][j];
                    }
                }
                return result;
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows and columns.");
            }
        },
        mul: (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.cols(matr_1) === Chalkboard.matr.rows(matr_2)) {
                let result = Chalkboard.matr.new();
                for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                    result[i] = [];
                    for(let j = 0; j < Chalkboard.matr.cols(matr_2); j++) {
                        result[i][j] = 0;
                        for(let k = 0; k < Chalkboard.matr.cols(matr_1); k++) {
                            result[i][j] += matr_1[i][k] * matr_2[k][j];
                        }
                    }
                }
                return result;
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" where the numbers of columns of \"matr_1\" must be equivalent to the number of rows of \"matr_2\".");
            }
        },
        mulVector: (matr: ChalkboardMatrix, vect: ChalkboardVector): ChalkboardMatrix => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 2);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 3);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(Chalkboard.matr.rows(matr) === 4) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 4);
                } else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        pow: (matr: ChalkboardMatrix, num: number): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr)) {
                if(num === 0) {
                    return Chalkboard.matr.identity(Chalkboard.matr.rows(matr));
                } else {
                    let result = matr;
                    for(let i = 1; i < num; i++) {
                        result = Chalkboard.matr.mul(matr, result);
                    }
                    return result;
                }
            } else {
                throw new TypeError("Parameter \"matr\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        },
        addKronecker: (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_1) === Chalkboard.matr.cols(matr_1) && Chalkboard.matr.rows(matr_2) === Chalkboard.matr.cols(matr_2)) {
                return Chalkboard.matr.add(Chalkboard.matr.mulKronecker(matr_1, Chalkboard.matr.identity(Chalkboard.matr.rows(matr_1))), Chalkboard.matr.mulKronecker(Chalkboard.matr.identity(Chalkboard.matr.rows(matr_2)), matr_2));
            } else {
                throw new TypeError("Parameters \"matr_1\" and \"matr_2\" must be of type \"ChalkboardMatrix\" that are square.");
            }
        },
        mulKronecker: (matr_1: ChalkboardMatrix, matr_2: ChalkboardMatrix): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            for(let i = 0; i < Chalkboard.matr.rows(matr_1); i++) {
                for(let j = 0; j < Chalkboard.matr.cols(matr_1); j++) {
                    for(let k = 0; k < Chalkboard.matr.rows(matr_2); k++) {
                        for(let l = 0; l < Chalkboard.matr.cols(matr_2); l++) {
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
        reduce: (matr: ChalkboardMatrix): ChalkboardMatrix => {
            let lead = 0;
            for(let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                if(lead >= Chalkboard.matr.cols(matr)) {
                    break;
                }
                let i = row;
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
                let temp = matr[i];
                matr[i] = matr[row];
                matr[row] = temp;
                let scl = matr[row][lead];
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    matr[row][j] /= scl;
                }
                for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    if(i !== row) {
                        let coeff = matr[i][lead];
                        for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            matr[i][j] -= coeff * matr[row][j];
                        }
                    }
                }
                lead++;
            }
            return matr;
        },
        solve: (matr_A: ChalkboardMatrix, matr_B: ChalkboardMatrix): ChalkboardMatrix => {
            if(Chalkboard.matr.rows(matr_A) === Chalkboard.matr.cols(matr_A)) {
                if(Chalkboard.matr.rows(matr_A) === Chalkboard.matr.rows(matr_B)) {
                    if(Chalkboard.matr.det(matr_A) !== 0) {
                        return Chalkboard.matr.mul(Chalkboard.matr.invert(matr_A), matr_B);
                    } else {
                        throw new TypeError("Parameter \"matr_A\" must be of type \"ChalkboardMatrix\" that is invertible.");
                    }
                } else {
                    throw new TypeError("Parameters \"matr_A\" and \"matr_B\" must be of type \"ChalkboardMatrix\" with equivalent numbers of rows.");
                }
            } else {
                throw new TypeError("Parameters \"matr_A\" must be of type \"ChalkboardMatrix\" that is square.");
            }
        },
        toVector: (matr: ChalkboardMatrix, dimension: 2 | 3 | 4, type: "col" | "row" = "col", rowORcol: number = 1): ChalkboardVector => {
            rowORcol -= 1;
            if(dimension === 2) {
                if(type === "col") {
                    return Chalkboard.vect.new(matr[0][rowORcol], matr[1][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vect.new(matr[rowORcol][0], matr[rowORcol][1]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(dimension === 3) {
                if(type === "col") {
                    return Chalkboard.vect.new(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vect.new(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(dimension === 4) {
                if(type === "col") {
                    return Chalkboard.vect.new(matr[0][rowORcol], matr[1][rowORcol], matr[2][rowORcol], matr[3][rowORcol]);
                } else if(type === "row") {
                    return Chalkboard.vect.new(matr[rowORcol][0], matr[rowORcol][1], matr[rowORcol][2], matr[rowORcol][3]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        toTensor: (matr: ChalkboardMatrix, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(matr, size);
        },
        toArray: (matr: ChalkboardMatrix): number[] => {
            let result = [];
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result.push(matr[i][j]);
                }
            }
            return result;
        },
        toObject: (matr: ChalkboardMatrix): object => {
            let result: {[key: string]: {[key: string]: number}} = {};
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result["i" + (i + 1)] = {};
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result["i" + (i + 1)]["j" + (j + 1)] = matr[i][j];
                }
            }
            return result;
        },
        toString: (matr: ChalkboardMatrix): string => {
            let result = "";
            for(let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                result += "[ ";
                for(let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    result += matr[i][j].toString() + " ";
                }
                result = result.trimEnd() + " ]\n";
            }
            return result;
        },
        print: (matr: ChalkboardMatrix): void => {
            console.log(Chalkboard.matr.toString(matr));
        }
    },
    tens: {
        new: (...tensor: ChalkboardTensor[]): ChalkboardTensor => {
            if(tensor.length === 0) {
                return [];
            } else if(tensor.length === 1 && Array.isArray(tensor[0])) {
                tensor = tensor[0];
            } else {
                tensor = tensor;
            }
            let newNDArray = function(arr: ChalkboardTensor[]): ChalkboardTensor[] {
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
        copy: (tens: ChalkboardTensor): ChalkboardTensor => {
            if(Array.isArray(tens)) {
                let result = Chalkboard.tens.new();
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.copy(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        },
        rank: (tens: ChalkboardTensor): number => {
            if(Array.isArray(tens)) {
                let result = 0;
                for(let i = 0; i < tens.length; i++) {
                    result = Math.max(result, Chalkboard.tens.rank(tens[i]));
                }
                return result + 1;
            } else {
                return 0;
            }
        },
        size: (tens: ChalkboardTensor): number[] => {
            if(Array.isArray(tens)) {
                let result = [tens.length];
                if(Array.isArray(tens[0])) {
                    result = result.concat(Chalkboard.tens.size(tens[0]));
                }
                return result;
            } else {
                return [];
            }
        },
        resize: (tens: ChalkboardTensor, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let result = Chalkboard.tens.fill(0, size);
            let refill = function(arr1: ChalkboardTensor[], arr2: ChalkboardTensor[]): void {
                for(let i = 0; i < arr2.length; i++) {
                    if(Array.isArray(arr2[i])) {
                        refill(arr1, (arr2 as ChalkboardTensor[][])[i]);
                    } else {
                        arr2[i] = arr1.length > 0 ? arr1.shift() as ChalkboardTensor : 0;
                    }
                }
            };
            refill(Chalkboard.tens.toArray(tens), result);
            return result;
        },
        push: (tens: ChalkboardTensor, rank: number, index: number, elements: number[]): ChalkboardTensor => {
            tens = tens as ChalkboardTensor[];
            if(rank === 0) {
                tens.splice(index, 0, elements);
                return tens;
            } else {
                for(let i = 0; i < tens.length; i++) {
                    Chalkboard.tens.push(tens[i], rank - 1, index, elements[i]);
                }
                return tens;
            }
        },
        pull: (tens: ChalkboardTensor, rank: number, index: number): ChalkboardTensor => {
            tens = tens as ChalkboardTensor[];
            if(rank === 0) {
                tens.splice(index, 1);
                return tens;
            } else {
                for(let i = 0; i < tens.length; i++) {
                    Chalkboard.tens.pull(tens[i], rank - 1, index);
                }
                return tens;
            }
        },
        fill: (element: number, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let newNDArray = function(size: number[]): ChalkboardTensor {
                if(size.length === 0) {
                    return element;
                }
                let curr = size[0];
                let rest = size.slice(1);
                let result = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        },
        empty: (...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let newNDArray = function(size: number[]): ChalkboardTensor | null {
                if(size.length === 0) {
                    return null;
                }
                let curr = size[0];
                let rest = size.slice(1);
                let result: ChalkboardTensor = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest) as ChalkboardTensor;
                }
                return result;
            };
            return newNDArray(size) as ChalkboardTensor;
        },
        random: (inf: number, sup: number, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            let newNDArray = function(size: number[]): ChalkboardTensor {
                if(size.length === 0) {
                    return Chalkboard.numb.random(inf, sup);
                }
                let curr = size[0];
                let rest = size.slice(1);
                let result = [];
                for(let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        },
        contract: (tens: ChalkboardTensor): ChalkboardTensor | number => {
            if(Chalkboard.tens.rank(tens) > 2) {
                return Chalkboard.tens.resize(tens, Chalkboard.tens.size(tens)[0], Chalkboard.tens.size(tens).slice(1).reduce(function(a: number, b: number): number { return a * b; }) / Chalkboard.tens.size(tens)[0]);
            } else if(Chalkboard.tens.rank(tens) === 2) {
                return Chalkboard.matr.trace(tens);
            } else {
                return tens;
            }
        },
        transpose: (tens: ChalkboardTensor): ChalkboardTensor => {
            return Chalkboard.tens.resize(tens, Chalkboard.tens.size(tens).reverse());
        },
        zero: (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.zero(tens[i]);
                }
                return result;
            } else {
                return 0;
            }
        },
        negate: (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.negate(tens[i]);
                }
                return result;
            } else {
                return -tens;
            }
        },
        reciprocate: (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.reciprocate(tens[i]);
                }
                return result;
            } else {
                return 1 / tens;
            }
        },
        absolute: (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.absolute(tens[i]);
                }
                return result;
            } else {
                return Math.abs(tens);
            }
        },
        round: (tens: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.round(tens[i]);
                }
                return result;
            } else {
                return Math.round(tens);
            }
        },
        scl: (tens: ChalkboardTensor, num: number): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.scl(tens[i], num);
                }
                return result;
            } else {
                return tens * num;
            }
        },
        constrain: (tens: ChalkboardTensor, range: [number, number] = [0, 1]): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens)) {
                for(let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.constrain(tens[i], range);
                }
                return result;
            } else {
                return Chalkboard.numb.constrain(tens, range);
            }
        },
        concat: (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor, rank: number = 1): ChalkboardTensor => {
            let concatAtRank = function(arr1: ChalkboardTensor, arr2: ChalkboardTensor, currentRank: number): ChalkboardTensor {
                if(currentRank === rank) {
                    return Chalkboard.tens.new((arr1 as ChalkboardTensor[]).concat(arr2));
                }
                return (arr1 as ChalkboardTensor[]).map(function(element, index) {
                    return concatAtRank(element, (arr2 as ChalkboardTensor[])[index], currentRank);
                });
            }
            return concatAtRank(tens_1, tens_2, 1);
        },
        add: (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(let i = 0; i < Math.max(tens_1.length, tens_2.length); i++) {
                    result[i] = Chalkboard.tens.add(tens_1[i] !== undefined ? tens_1[i] : 0, tens_2[i] !== undefined ? tens_2[i] : 0);
                }
                return result;
            } else {
                return (tens_1 as number) + (tens_2 as number);
            }
        },
        sub: (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(let i = 0; i < Math.max(tens_1.length, tens_2.length); i++) {
                    result[i] = Chalkboard.tens.sub(tens_1[i] !== undefined ? tens_1[i] : 0, tens_2[i] !== undefined ? tens_2[i] : 0);
                }
                return result;
            } else {
                return (tens_1 as number) - (tens_2 as number);
            }
        },
        mul: (tens_1: ChalkboardTensor, tens_2: ChalkboardTensor): ChalkboardTensor => {
            let result = Chalkboard.tens.new();
            if(Array.isArray(tens_1) && Array.isArray(tens_2)) {
                for(let i = 0; i < tens_1.length; i++) {
                    let subarr = Chalkboard.tens.new();
                    for(let j = 0; j < tens_2.length; j++) {
                        subarr[j] = Chalkboard.tens.mul(tens_1[i], tens_2[j]);
                    }
                    result.push(subarr);
                }
                return result;
            } else {
                return (tens_1 as number) * (tens_2 as number);
            }
        },
        toVector: (tens: ChalkboardTensor, dimension: number, index: number = 0): ChalkboardVector => {
            let arr = Chalkboard.tens.toArray(tens);
            if(dimension === 2) {
                return Chalkboard.vect.new(arr[index], arr[index + 1]);
            } else if(dimension === 3) {
                return Chalkboard.vect.new(arr[index], arr[index + 1], arr[index + 2]);
            } else if(dimension === 4) {
                return Chalkboard.vect.new(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        },
        toMatrix: (tens: ChalkboardTensor): ChalkboardMatrix => {
            let result = Chalkboard.matr.new();
            let flatten = function(tens: ChalkboardTensor, result: ChalkboardMatrix): void {
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    if(Array.isArray((tens as ChalkboardTensor[])[i])) {
                        flatten((tens as ChalkboardTensor[])[i], result);
                    } else {
                        result.push((tens as ChalkboardMatrix)[i]);
                    }
                }
            };
            let matr = Chalkboard.matr.new();
            flatten(tens, matr);
            let rows = (tens as ChalkboardTensor[]).length || 1;
            for(let j = 0; j < rows; j++) {
                result.push(matr.slice(j * matr.length / rows, (j + 1) * matr.length / rows));
            }
            return result;
        },
        toArray: (tens: ChalkboardTensor): number[] => {
            let result: number[] = [];
            let flatten = function(tens: ChalkboardTensor): void {
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    if(Array.isArray((tens as ChalkboardTensor[])[i])) {
                        flatten((tens as ChalkboardTensor[])[i]);
                    } else {
                        result.push((tens as number[])[i]);
                    }
                }
            };
            flatten(tens);
            return result;
        },
        toObject: (tens: ChalkboardTensor): object | number => {
            if(Array.isArray(tens)) {
                let result: {[key: string]: number} = {};
                for(let i = 0; i < tens.length; i++) {
                    result["_" + (i + 1)] = Chalkboard.tens.toObject(tens[i]);
                }
                return result;
            } else {
                return tens;
            }
        },
        toString: (tens: ChalkboardTensor, indentation: number = 0): string => {
            if(Array.isArray((tens as ChalkboardTensor[])[0])) {
                let result = "\t".repeat(indentation) + "[\n";
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    result += Chalkboard.tens.toString((tens as ChalkboardTensor[])[i], indentation + 1);
                }
                result += "\t".repeat(indentation) + "]\n";
                return result;
            } else {
                let result = "\t".repeat(indentation) + "[ ";
                for(let i = 0; i < (tens as ChalkboardTensor[]).length; i++) {
                    result += (tens as ChalkboardTensor[])[i].toString() + " ";
                }
                result += "]\n";
                return result;
            }
        },
        print: (tens: ChalkboardTensor): void => {
            console.log(Chalkboard.tens.toString(tens));
        }
    },
    calc: {
        lim: (func: ChalkboardFunction, val: number): number | undefined => {
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
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"expl\".");
            }
        },
        dfdx: (func: ChalkboardFunction, val: number): number | ChalkboardVector => {
            let h = 0.000000001;
            if(func.type === "expl") {
                let f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - f(val)) / h;
            } else if(func.type === "inve") {
                let f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - f(val)) / h;
            } else if(func.type === "pola") {
                let r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - r(val)) / h;
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.new((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h);
                } else {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.new((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h, (z(val + h) - z(val)) / h);
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"expl\", \"inve\", \"pola\", or \"curv\".");
            }
        },
        d2fdx2: (func: ChalkboardFunction, val: number): number | ChalkboardVector => {
            let h = 0.00001;
            if(func.type === "expl") {
                let f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            } else if(func.type === "inve") {
                let f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            } else if(func.type === "pola") {
                let r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - 2 * r(val) + r(val - h)) / (h * h);
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.new((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h));
                } else {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.new((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h), (z(val + h) - 2 * z(val) + z(val - h)) / (h * h));
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"expl\", \"inve\", \"pola\", or \"curv\".");
            }
        },
        tangent: (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val));
                } else {
                    return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val));
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\".");
            }
        },
        normal: (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val));
                } else {
                    return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val));
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\".");
            }
        },
        binormal: (func: ChalkboardFunction, val: number): ChalkboardVector => {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                } else {
                    return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\".");
            }
        },
        dfdv: (func: ChalkboardFunction, vect_pos: ChalkboardVector, vect_dir: ChalkboardVector): number => {
            if(func.type === "mult") {
                return Chalkboard.vect.dot(Chalkboard.calc.grad(func, vect_pos), Chalkboard.vect.normalize(vect_dir));
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"mult\".");
            }
        },
        dfrdt: (func_1: ChalkboardFunction, func_2: ChalkboardFunction, val: number): number => {
            if(func_1.type === "mult") {
                if(func_2.type === "curv") {
                    if(func_2.definition.length === 2) {
                        let dfdx = Chalkboard.calc.grad(func_1, Chalkboard.real.val(func_2, val)).x,
                            dfdy = Chalkboard.calc.grad(func_1, Chalkboard.real.val(func_2, val)).y,
                            dxdt = Chalkboard.calc.dfdx(func_2, val).x,
                            dydt = Chalkboard.calc.dfdx(func_2, val).y;
                        return dfdx * dxdt + dfdy * dydt;
                    } else {
                        let dfdx = Chalkboard.calc.grad(func_1, Chalkboard.real.val(func_2, val)).x,
                            dfdy = Chalkboard.calc.grad(func_1, Chalkboard.real.val(func_2, val)).y,
                            dfdz = Chalkboard.calc.grad(func_1, Chalkboard.real.val(func_2, val)).z,
                            dxdt = Chalkboard.calc.dfdx(func_2, val).x,
                            dydt = Chalkboard.calc.dfdx(func_2, val).y,
                            dzdt = Chalkboard.calc.dfdx(func_2, val).z;
                        return dfdx * dxdt + dfdy * dydt + dfdz * dzdt;
                    }
                } else {
                    throw new TypeError("Parameter \"func_2\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\".");
                }
            } else {
                throw new TypeError("Parameter \"func_1\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"mult\".");
            }
        },
        grad: (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector | ChalkboardMatrix => {
            let h = 0.000000001;
            let func = funcORvectfield as ChalkboardFunction;
            let vectfield = funcORvectfield as ChalkboardVectorField;
            if(func.type === "surf" && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined")) {
                let x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                let dxds = (x(vect.x + h, vect.y) - x(vect.x, vect.y)) / h,
                    dxdt = (x(vect.x, vect.y + h) - x(vect.x, vect.y)) / h,
                    dyds = (y(vect.x + h, vect.y) - y(vect.x, vect.y)) / h,
                    dydt = (y(vect.x, vect.y + h) - y(vect.x, vect.y)) / h,
                    dzds = (z(vect.x + h, vect.y) - z(vect.x, vect.y)) / h, 
                    dzdt = (z(vect.x, vect.y + h) - z(vect.x, vect.y)) / h;
                return Chalkboard.matr.new([dxds, dxdt],
                                           [dyds, dydt],
                                           [dzds, dzdt]);
            } else if(func.type === "mult" && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined")) {
                let f = Chalkboard.real.parse("(x, y) => " + func.definition);
                let dfdx = (f(vect.x + h, vect.y) - f(vect.x, vect.y)) / h,
                    dfdy = (f(vect.x, vect.y + h) - f(vect.x, vect.y)) / h;
                return Chalkboard.vect.new(dfdx, dfdy);
            } else if(Chalkboard.vect.dimension(vectfield) === 2 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined")) {
                let p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                let dpdx = (p(vect.x + h, vect.y) - p(vect.x, vect.y)) / h,
                    dpdy = (p(vect.x, vect.y + h) - p(vect.x, vect.y)) / h,
                    dqdx = (q(vect.x + h, vect.y) - q(vect.x, vect.y)) / h,
                    dqdy = (q(vect.x, vect.y + h) - q(vect.x, vect.y)) / h;
                return Chalkboard.matr.new([dpdx, dpdy],
                                           [dqdx, dqdy]);
            } else if(Chalkboard.vect.dimension(vectfield) === 3 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined")) {
                let p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                let dpdx = (p(vect.x + h, vect.y, vect.z) - p(vect.x, vect.y, vect.z)) / h,
                    dpdy = (p(vect.x, vect.y + h, vect.z) - p(vect.x, vect.y, vect.z)) / h,
                    dpdz = (p(vect.x, vect.y, vect.z + h) - p(vect.x, vect.y, vect.z)) / h,
                    dqdx = (q(vect.x + h, vect.y, vect.z) - q(vect.x, vect.y, vect.z)) / h,
                    dqdy = (q(vect.x, vect.y + h, vect.z) - q(vect.x, vect.y, vect.z)) / h,
                    dqdz = (q(vect.x, vect.y, vect.z + h) - q(vect.x, vect.y, vect.z)) / h,
                    drdx = (r(vect.x + h, vect.y, vect.z) - r(vect.x, vect.y, vect.z)) / h,
                    drdy = (r(vect.x, vect.y + h, vect.z) - r(vect.x, vect.y, vect.z)) / h,
                    drdz = (r(vect.x, vect.y, vect.z + h) - r(vect.x, vect.y, vect.z)) / h;
                return Chalkboard.matr.new([dpdx, dpdy, dpdz],
                                           [dqdx, dqdy, dqdz],
                                           [drdx, drdy, drdz]);
            } else if(Chalkboard.vect.dimension(vectfield) === 4 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number")) {
                let p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                let dpdx = (p(vect.x + h, vect.y, vect.z, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dpdy = (p(vect.x, vect.y + h, vect.z, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dpdz = (p(vect.x, vect.y, vect.z + h, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dpdw = (p(vect.x, vect.y, vect.z, vect.w + h) - p(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdx = (q(vect.x + h, vect.y, vect.z, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdy = (q(vect.x, vect.y + h, vect.z, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdz = (q(vect.x, vect.y, vect.z + h, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    dqdw = (q(vect.x, vect.y, vect.z, vect.w + h) - q(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdx = (r(vect.x + h, vect.y, vect.z, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdy = (r(vect.x, vect.y + h, vect.z, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdz = (r(vect.x, vect.y, vect.z + h, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    drdw = (r(vect.x, vect.y, vect.z, vect.w + h) - r(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdx = (s(vect.x + h, vect.y, vect.z, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdy = (s(vect.x, vect.y + h, vect.z, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdz = (s(vect.x, vect.y, vect.z + h, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h,
                    dsdw = (s(vect.x, vect.y, vect.z, vect.w + h) - s(vect.x, vect.y, vect.z, vect.w)) / h;
                return Chalkboard.matr.new([dpdx, dpdy, dpdz, dpdw],
                                           [dqdx, dqdy, dqdz, dqdw],
                                           [drdx, drdy, drdz, drdw],
                                           [dsdx, dsdy, dsdz, dsdw]);
            } else {
                throw new TypeError("Parameter \"funcORvectfield\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"surf\" or \"mult\" or of type \"ChalkboardVectorField\".");
            }
        },
        grad2: (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, vect: ChalkboardVector): ChalkboardMatrix => {
            let h = 0.00001;
            let func = funcORvectfield as ChalkboardFunction;
            let vectfield = funcORvectfield as ChalkboardVectorField;
            if(func.type === "surf" && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined")) {
                let x = Chalkboard.real.parse("(s, t) => " + func.definition[0]),
                    y = Chalkboard.real.parse("(s, t) => " + func.definition[1]),
                    z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                let d2xds2 = (x(vect.x + h, vect.y) - 2 * x(vect.x, vect.y) + x(vect.x - h, vect.y)) / (h * h),
                    d2xdt2 = (x(vect.x, vect.y + h) - 2 * x(vect.x, vect.y) + x(vect.x, vect.y - h)) / (h * h),
                    d2yds2 = (y(vect.x + h, vect.y) - 2 * y(vect.x, vect.y) + y(vect.x - h, vect.y)) / (h * h),
                    d2ydt2 = (y(vect.x, vect.y + h) - 2 * y(vect.x, vect.y) + y(vect.x, vect.y - h)) / (h * h),
                    d2zds2 = (z(vect.x + h, vect.y) - 2 * z(vect.x, vect.y) + z(vect.x - h, vect.y)) / (h * h), 
                    d2zdt2 = (z(vect.x, vect.y + h) - 2 * z(vect.x, vect.y) + z(vect.x, vect.y - h)) / (h * h);
                return Chalkboard.matr.new([d2xds2, d2xdt2],
                                           [d2yds2, d2ydt2],
                                           [d2zds2, d2zdt2]);
            } else if(func.type === "mult" && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined")) {
                let f = Chalkboard.real.parse("(x, y) => " + func.definition);
                let d2fdx2 = (f(vect.x + h, vect.y) - 2 * f(vect.x, vect.y) + f(vect.x - h, vect.y)) / (h * h),
                    d2fdy2 = (f(vect.x, vect.y + h) - 2 * f(vect.x, vect.y) + f(vect.x, vect.y - h)) / (h * h),
                    d2fdxdy = (f(vect.x + h, vect.y + h) - f(vect.x + h, vect.y) - f(vect.x, vect.y + h) + f(vect.x, vect.y)) / (h * h),
                    d2fdydx = (f(vect.x + h, vect.y + h) - f(vect.x, vect.y + h) - f(vect.x + h, vect.y) + f(vect.x, vect.y)) / (h * h);
                return Chalkboard.matr.new([d2fdx2, d2fdxdy],
                                           [d2fdydx, d2fdy2]);
            } else if(Chalkboard.vect.dimension(funcORvectfield) === 2 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined")) {
                let p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                let d2pdx2 = (p(vect.x + h, vect.y) - 2 * p(vect.x, vect.y) + p(vect.x - h, vect.y)) / (h * h),
                    d2pdy2 = (p(vect.x, vect.y + h) - 2 * p(vect.x, vect.y) + p(vect.x, vect.y - h)) / (h * h),
                    d2qdx2 = (q(vect.x + h, vect.y) - 2 * q(vect.x, vect.y) + q(vect.x - h, vect.y)) / (h * h),
                    d2qdy2 = (q(vect.x, vect.y + h) - 2 * q(vect.x, vect.y) + q(vect.x, vect.y - h)) / (h * h);
                return Chalkboard.matr.new([d2pdx2, d2pdy2],
                                           [d2qdx2, d2qdy2]);
            } else if(Chalkboard.vect.dimension(funcORvectfield) === 3 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined")) {
                let p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                let d2pdx2 = (p(vect.x + h, vect.y, vect.z) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x - h, vect.y, vect.z)) / (h * h),
                    d2pdy2 = (p(vect.x, vect.y + h, vect.z) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x, vect.y - h, vect.z)) / (h * h),
                    d2pdz2 = (p(vect.x, vect.y, vect.z + h) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x, vect.y, vect.z - h)) / (h * h),
                    d2qdx2 = (q(vect.x + h, vect.y, vect.z) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x - h, vect.y, vect.z)) / (h * h),
                    d2qdy2 = (q(vect.x, vect.y + h, vect.z) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x, vect.y - h, vect.z)) / (h * h),
                    d2qdz2 = (q(vect.x, vect.y, vect.z + h) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x, vect.y, vect.z - h)) / (h * h),
                    d2rdx2 = (r(vect.x + h, vect.y, vect.z) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x - h, vect.y, vect.z)) / (h * h),
                    d2rdy2 = (r(vect.x, vect.y + h, vect.z) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x, vect.y - h, vect.z)) / (h * h),
                    d2rdz2 = (r(vect.x, vect.y, vect.z + h) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x, vect.y, vect.z - h)) / (h * h);
                return Chalkboard.matr.new([d2pdx2, d2pdy2, d2pdz2],
                                           [d2qdx2, d2qdy2, d2qdz2],
                                           [d2rdx2, d2rdy2, d2rdz2]);
            } else if(Chalkboard.vect.dimension(funcORvectfield) === 4 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number")) {
                let p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                let d2pdx2 = (p(vect.x + h, vect.y, vect.z, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2pdy2 = (p(vect.x, vect.y + h, vect.z, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2pdz2 = (p(vect.x, vect.y, vect.z + h, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2pdw2 = (p(vect.x, vect.y, vect.z, vect.w + h) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y, vect.z, vect.w - h)) / (h * h),
                    d2qdx2 = (q(vect.x + h, vect.y, vect.z, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2qdy2 = (q(vect.x, vect.y + h, vect.z, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2qdz2 = (q(vect.x, vect.y, vect.z + h, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2qdw2 = (q(vect.x, vect.y, vect.z, vect.w + h) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y, vect.z, vect.w - h)) / (h * h),
                    d2rdx2 = (r(vect.x + h, vect.y, vect.z, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2rdy2 = (r(vect.x, vect.y + h, vect.z, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2rdz2 = (r(vect.x, vect.y, vect.z + h, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2rdw2 = (r(vect.x, vect.y, vect.z, vect.w + h) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y, vect.z, vect.w - h)) / (h * h),
                    d2sdx2 = (s(vect.x + h, vect.y, vect.z, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x - h, vect.y, vect.z, vect.w)) / (h * h),
                    d2sdy2 = (s(vect.x, vect.y + h, vect.z, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y - h, vect.z, vect.w)) / (h * h),
                    d2sdz2 = (s(vect.x, vect.y, vect.z + h, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y, vect.z - h, vect.w)) / (h * h),
                    d2sdw2 = (s(vect.x, vect.y, vect.z, vect.w + h) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y, vect.z, vect.w - h)) / (h * h);
                return Chalkboard.matr.new([d2pdx2, d2pdy2, d2pdz2, d2pdw2],
                                           [d2qdx2, d2qdy2, d2qdz2, d2qdw2],
                                           [d2rdx2, d2rdy2, d2rdz2, d2rdw2],
                                           [d2sdx2, d2sdy2, d2sdz2, d2sdw2]);
            } else {
                throw new TypeError("Parameter \"funcORvectfield\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"surf\" or \"mult\" or it must be of type \"ChalkboardVectorField\".");
            }
        },
        div: (vectfield: ChalkboardVectorField, vect: ChalkboardVector): number => {
            if(Chalkboard.vect.dimension(vectfield) === 2 || Chalkboard.vect.dimension(vectfield) === 3 || Chalkboard.vect.dimension(vectfield) === 4) {
                return Chalkboard.matr.trace(Chalkboard.calc.grad(vectfield, vect));
            } else {
                throw new TypeError("Parameter \"vectfield\" must be of type \"ChalkboardVectorField\" with 2, 3, or 4 dimensions.");
            }
        },
        curl: (vectfield: ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector => {
            let h = 0.000000001;
            if(Chalkboard.vect.dimension(vectfield) === 2 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined")) {
                let p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                let dpdy = (p(vect.x, vect.y + h) - p(vect.x, vect.y)) / h,
                    dqdx = (q(vect.x + h, vect.y) - q(vect.x, vect.y)) / h;
                return Chalkboard.vect.new(0, 0, dqdx - dpdy);
            } else if(Chalkboard.vect.dimension(vectfield) === 3 && (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined")) {
                let p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                let dpdy = (p(vect.x, vect.y + h, vect.z) - p(vect.x, vect.y, vect.z)) / h,
                    dpdz = (p(vect.x, vect.y, vect.z + h) - p(vect.x, vect.y, vect.z)) / h,
                    dqdx = (q(vect.x + h, vect.y, vect.z) - q(vect.x, vect.y, vect.z)) / h,
                    dqdz = (q(vect.x, vect.y, vect.z + h) - q(vect.x, vect.y, vect.z)) / h,
                    drdx = (r(vect.x + h, vect.y, vect.z) - r(vect.x, vect.y, vect.z)) / h,
                    drdy = (r(vect.x, vect.y + h, vect.z) - r(vect.x, vect.y, vect.z)) / h;
                return Chalkboard.vect.new(drdy - dqdz, dpdz - drdx, dqdx - dpdy);
            } else {
                throw new TypeError("Parameter \"vectfield\" must be of type \"ChalkboardVectorField\" with 2 or 3 dimensions.");
            }
        },
        dfdz: (func: ChalkboardFunction, comp: ChalkboardComplex): {a: ChalkboardComplex, b: ChalkboardComplex} => {
            let h = 0.000000001;
            if(func.type === "comp") {
                let u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                let duda = (u(comp.a + h, comp.b) - u(comp.a, comp.b)) / h,
                    dudb = (u(comp.a, comp.b + h) - u(comp.a, comp.b)) / h,
                    dvda = (v(comp.a + h, comp.b) - v(comp.a, comp.b)) / h,
                    dvdb = (v(comp.a, comp.b + h) - v(comp.a, comp.b)) / h;
                return {a: Chalkboard.comp.new(duda, dvda), b: Chalkboard.comp.new(dudb, dvdb)};
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"comp\".");
            }
        },
        d2fdz2: (func: ChalkboardFunction, comp: ChalkboardComplex): {a: ChalkboardComplex, b: ChalkboardComplex} => {
            let h = 0.00001;
            if(func.type === "comp") {
                let u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                let d2uda2 = (u(comp.a + h, comp.b) - 2 * u(comp.a, comp.b) + u(comp.a - h, comp.b)) / (h * h),
                    d2udb2 = (u(comp.a, comp.b + h) - 2 * u(comp.a, comp.b) + u(comp.a, comp.b - h)) / (h * h),
                    d2vda2 = (v(comp.a + h, comp.b) - 2 * v(comp.a, comp.b) + v(comp.a - h, comp.b)) / (h * h),
                    d2vdb2 = (v(comp.a, comp.b + h) - 2 * v(comp.a, comp.b) + v(comp.a, comp.b - h)) / (h * h);
                return {a: Chalkboard.comp.new(d2uda2, d2vda2), b: Chalkboard.comp.new(d2udb2, d2vdb2)};
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"comp\".");
            }
        },
        fxdx: (func: ChalkboardFunction, inf: number, sup: number): number | ChalkboardVector => {
            if(func.type === "expl" || func.type === "inve" || func.type === "pola") {
                let f;
                if(func.type === "expl") {
                    f = Chalkboard.real.parse("x => " + func.definition);
                } else if(func.type === "inve") {
                    f = Chalkboard.real.parse("y => " + func.definition);
                } else if(func.type === "pola") {
                    f = Chalkboard.real.parse("O => " + "((" + func.definition + ") * (" + func.definition + ")) / 2");
                }
                let fx = f(inf) + f(sup);
                let dx = (sup - inf) / 1000000;
                for(let i = 1; i < 1000000; i++) {
                    fx += i % 2 === 0 ? 2 * f(inf + i * dx) : 4 * f(inf + i * dx);
                }
                return (fx * dx) / 3;
            } else if(func.type === "curv") {
                if(func.definition.length === 2) {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]);
                    let xt = x(inf) + x(sup),
                        yt = y(inf) + y(sup);
                    let dt = (sup - inf) / 1000000;
                    for(let i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(sup + i * dt) : 4 * y(sup + i * dt);
                    }
                    return Chalkboard.vect.new((xt * dt) / 3, (yt * dt) / 3);
                } else {
                    let x = Chalkboard.real.parse("t => " + func.definition[0]),
                        y = Chalkboard.real.parse("t => " + func.definition[1]),
                        z = Chalkboard.real.parse("t => " + func.definition[2]);
                    let xt = x(inf) + x(sup),
                        yt = y(inf) + y(sup),
                        zt = z(inf) + z(sup);
                    let dt = (sup - inf) / 1000000;
                    for(let i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(inf + i * dt) : 4 * y(inf + i * dt);
                        zt += i % 2 === 0 ? 2 * z(inf + i * dt) : 4 * z(inf + i * dt);
                    }
                    return Chalkboard.vect.new((xt * dt) / 3, (yt * dt) / 3, (zt * dt) / 3);
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"expl\", \"inve\", \"pola\", or \"curv\".");
            }
        },
        fxydxdy: (func: ChalkboardFunction, xinf: number, xsup: number, yinf: number, ysup: number): number => {
            if(func.type === "mult") {
                let f = Chalkboard.real.parse("(x, y) => " + func.definition);
                let result = 0;
                let dx = (xsup - xinf) / 10000,
                    dy = (ysup - yinf) / 10000;
                for(let x = xinf; x <= xsup; x += dx) {
                    for(let y = yinf; y <= ysup; y += dy) {
                        result += f(x, y);
                    }
                }
                return result * dx * dy;
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"mult\".");
            }
        },
        fds: (func: ChalkboardFunction, tinf: number, tsup: number, sinf: number, ssup: number): number => {
            let result = 0;
            let drdt, drds;
            if(func.type === "curv") {
                let dt = (tsup - tinf) / 10000;
                if(func.definition.length === 2) {
                    for(let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                } else {
                    for(let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                }
            } else if(func.type === "surf") {
                let dt = (tsup - tinf) / 100,
                    ds = (ssup - sinf) / 100;
                for(let s = sinf; s <= ssup; s += ds) {
                    for(let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.new(s, t)), 3, "col", 1);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.new(s, t)), 3, "col", 2);
                        result += Chalkboard.vect.mag(Chalkboard.vect.cross(drds, drdt));
                    }
                }
                return result * ds * dt;
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\" or \"surf\".");
            }
        },
        frds: (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, func: ChalkboardFunction, inf: number, sup: number): number => {
            if(func.type === "curv") {
                let result = 0;
                let dt = (sup - inf) / 10000;
                if((funcORvectfield as ChalkboardFunction).type === "mult") {
                    for(let t = inf; t <= sup; t += dt) {
                        result += Chalkboard.real.val(funcORvectfield, Chalkboard.real.val(func, t)) * Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                } else if(Chalkboard.vect.dimension(funcORvectfield) === 2) {
                    for(let t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(funcORvectfield, Chalkboard.real.val(func, t)), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                } else if(Chalkboard.vect.dimension(funcORvectfield) === 3) {
                    for(let t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(funcORvectfield, Chalkboard.real.val(func, t)), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                } else {
                    throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"mult\" or it must be of type \"ChalkboardVectorField\".");
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\".");
            }
        },
        fnds: (vectfield: ChalkboardVectorField, func: ChalkboardFunction, tinf: number, tsup: number, sinf: number, ssup: number): number => {
            let result = 0;
            let drdt, drds;
            if(func.type === "curv") {
                let dt = (tsup - tinf) / 10000;
                if(func.definition.length === 2) {
                    for(let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.vect.new(-drdt.y, drdt.x)) * Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                } else {
                    for(let t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.calc.normal(func, t)) * Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                }
            } else if(func.type === "surf") {
                let dt = (tsup - tinf) / 100,
                    ds = (ssup - sinf) / 100;
                for(let s = sinf; s <= ssup; s += ds) {
                    for(let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.new(s, t)), 3, "col", 1);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.new(s, t)), 3, "col", 2);
                        result += Chalkboard.vect.scalarTriple(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, Chalkboard.vect.new(s, t))), drds, drdt);
                    }
                }
                return result * ds * dt;
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\" or \"surf\".");
            }
        },
        fzdz: (func_1: ChalkboardFunction, func_2: ChalkboardFunction, inf: number, sup: number): ChalkboardComplex => {
            if(func_1.type === "comp") {
                if(func_2.type === "curv") {
                    let result = Chalkboard.comp.new(0, 0);
                    let dt = (sup - inf) / 10000;
                    for(let t = inf; t <= sup; t += dt) {
                        let fz = Chalkboard.comp.val(func_1, Chalkboard.vect.toComplex(Chalkboard.real.val(func_2, t)));
                        let rt = Chalkboard.calc.dfdx(func_2, t);
                        result = Chalkboard.comp.add(result, Chalkboard.comp.new((fz.a * rt.x) - (fz.b * rt.y), (fz.b * rt.x) + (fz.a * rt.y)));
                    }
                    return Chalkboard.comp.scl(result, dt);
                } else {
                    throw new TypeError("Parameter \"func_2\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\".");
                }
            } else {
                throw new TypeError("Parameter \"func_1\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"comp\".");
            }
        },
        extrema: (func: ChalkboardFunction, domain: [number, number]): number[] => {
            let result = [];
            for(let i = domain[0]; i <= domain[1]; i++) {
                if(Math.round(Chalkboard.calc.dfdx(func, i)) === 0) {
                    result.push(i);
                }
            }
            return result;
        },
        mean: (func: ChalkboardFunction, a: number, b: number): number => {
            return (Chalkboard.calc.fxdx(func, a, b)) / (b - a);
        },
        curvature: (func: ChalkboardFunction, val: number): number => {
            if(func.type === "curv") {
                if(func.definition.length === 2) {
                    let dxdt = Chalkboard.calc.dfdx(func, val).x,
                        dydt = Chalkboard.calc.dfdx(func, val).y,
                        d2xdt2 = Chalkboard.calc.d2fdx2(func, val).x,
                        d2ydt2 = Chalkboard.calc.d2fdx2(func, val).y;
                    return Math.abs(dxdt * d2ydt2 - dydt * d2xdt2) / Math.sqrt((dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt));
                } else {
                    return Chalkboard.vect.mag(Chalkboard.calc.normal(func, val)) / Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, val));
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"curv\".");
            }
        },
        convolution: (func_1: ChalkboardFunction, func_2: ChalkboardFunction, val: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func_1.definition + ") * (" + (func_2.definition as string).replace(/x/g, "(" + val + " - x)") + ")"), -100, 100);
        },
        correlation: (func_1: ChalkboardFunction, func_2: ChalkboardFunction, val: number): number => {
            return Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func_1.definition + ") * (" + (func_2.definition as string).replace(/x/g, "(" + val + " + x)") + ")"), -100, 100);
        },
        autocorrelation: (func: ChalkboardFunction, val: number): number => {
            return Chalkboard.calc.correlation(func, func, val);
        },
        Taylor: (func: ChalkboardFunction, val: number, n: 0 | 1 | 2, a: number): number => {
            if(func.type === "expl") {
                if(n === 0) {
                    return Chalkboard.real.val(func, a);
                } else if(n === 1) {
                    return Chalkboard.real.val(func, a) + Chalkboard.calc.dfdx(func, a) * (val - a);
                } else if(n === 2) {
                    return Chalkboard.real.val(func, a) + Chalkboard.calc.dfdx(func, a) * (val - a) + (Chalkboard.calc.d2fdx2(func, a) * (val - a) * (val - a)) / 2;
                } else {
                    throw new RangeError("Parameter \"n\" must be of type \"number\" greater than 0 and less than 3");
                }
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a \"type\" property of \"expl\".");
            }
        },
        Laplace: (func: ChalkboardFunction, val: number): number => {
            if(val > 0) {
                return Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func.definition + ") * Math.exp(-" + val + " * x)"), 0, 10);
            } else {
                throw new RangeError("Parameter \"val\" must be of type \"number\" greater than 0.");
            }
        },
        Fourier: (func: ChalkboardFunction, val: number): number => {
            return (2 * Chalkboard.calc.fxdx(Chalkboard.real.function("(" + func.definition + ") * Math.cos(" + val + " * x)"), 0, 10)) / Chalkboard.PI();
        },
        Newton: (func: ChalkboardFunction, domain: [number, number] = [-1, 1]): number => {
            let x = Chalkboard.numb.random(domain[0], domain[1]);
            for(let i = 0; i < 10; i++) {
                x = x - Chalkboard.real.val(func, x) / Chalkboard.calc.dfdx(func, x);
            }
            return x;
        }
    }
};
if(typeof window === "undefined") {
    module.exports = Chalkboard;
} else {
    window.Chalkboard = Chalkboard;
}