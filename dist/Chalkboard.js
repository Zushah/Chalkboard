"use strict";
var Chalkboard;
(function (Chalkboard) {
    Chalkboard.APPLY = (object, callback) => {
        if (object && typeof object.a === "number" && typeof object.b === "number" && typeof object.c === "undefined") {
            const comp = object;
            return Chalkboard.comp.init(callback(comp.a), callback(comp.b));
        }
        if (object && typeof object.a === "number" && typeof object.b === "number" && typeof object.c === "number" && typeof object.d === "number") {
            const quat = object;
            return Chalkboard.quat.init(callback(quat.a), callback(quat.b), callback(quat.c), callback(quat.d));
        }
        if (object && typeof object.x === "number" && typeof object.y === "number") {
            const vect = object;
            if (typeof vect.w === "number" && typeof vect.z === "number") {
                return Chalkboard.vect.init(callback(vect.x), callback(vect.y), callback(vect.z), callback(vect.w));
            }
            else if (typeof vect.z === "number") {
                return Chalkboard.vect.init(callback(vect.x), callback(vect.y), callback(vect.z));
            }
            else {
                return Chalkboard.vect.init(callback(vect.x), callback(vect.y));
            }
        }
        if (Array.isArray(object)) {
            let isMatrix = true;
            for (let i = 0; i < object.length; i++) {
                if (!Array.isArray(object[i]) || (object[i].length > 0 && typeof object[i][0] !== "number")) {
                    isMatrix = false;
                    break;
                }
            }
            if (isMatrix) {
                const matr = object;
                const rows = Chalkboard.matr.rows(matr);
                const cols = Chalkboard.matr.cols(matr);
                const result = Chalkboard.matr.fill(0, rows, cols);
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        result[i][j] = callback(matr[i][j]);
                    }
                }
                return result;
            }
            else {
                const result = [];
                for (let i = 0; i < object.length; i++) {
                    result.push(Chalkboard.APPLY(object[i], callback));
                }
                return result;
            }
        }
        if (typeof object === "number") {
            return callback(object);
        }
        if (object && typeof object.contains === "function" && typeof object.set === "undefined") {
            const set = object;
            if (Array.isArray(set.elements)) {
                const result = [];
                for (let i = 0; i < set.elements.length; i++) {
                    result.push(callback(set.elements[i]));
                }
                return result;
            }
            else {
                throw new TypeError('Chalkboard.APPLY cannot operate on an infinite "ChalkboardSet".');
            }
        }
        if (object && typeof object.set?.contains === "function") {
            const struc = object;
            if (Array.isArray(struc.set.elements)) {
                const result = [];
                for (let i = 0; i < struc.set.elements.length; i++) {
                    result.push(callback(struc.set.elements[i]));
                }
                return result;
            }
            else {
                throw new TypeError('Chalkboard.APPLY cannot operate on an infinite "ChalkboardStructure".');
            }
        }
        throw new TypeError('Chalkboard.APPLY can only operate on a "ChalkboardComplex", "ChalkboardMatrix", "ChalkboardQuaternion", "ChalkboardTensor", "ChalkboardVector", "ChalkboardSet", or "ChalkboardStructure".');
    };
    Chalkboard.CONTEXT = typeof window !== "undefined" ? "ctx" : "0";
    Chalkboard.E = (exponent = 1) => {
        if (exponent === 0)
            return 1;
        if (exponent === 1)
            return 2.718281828459045;
        const LN2 = 0.6931471805599453, INV_LN2 = 1.4426950408889634;
        const k = Math.round(exponent * INV_LN2);
        const r = exponent - k * LN2, r2 = r * r, r3 = r2 * r, r4 = r3 * r, r5 = r4 * r, r6 = r5 * r, r7 = r6 * r, r8 = r7 * r, r9 = r8 * r, r10 = r9 * r;
        const exp_r = 1 + r + r2 / 2 + r3 / 6 + r4 / 24 + r5 / 120 + r6 / 720 + r7 / 5040 + r8 / 40320 + r9 / 362880 + r10 / 3628800;
        return exp_r * (2 ** k);
    };
    Chalkboard.I = (exponent = 1) => {
        if (exponent % 4 === 0)
            return Chalkboard.comp.init(1, 0);
        if (exponent % 4 === 1)
            return Chalkboard.comp.init(0, 1);
        if (exponent % 4 === 2)
            return Chalkboard.comp.init(-1, 0);
        if (exponent % 4 === 3)
            return Chalkboard.comp.init(0, -1);
        return Chalkboard.comp.init(0, 0);
    };
    Chalkboard.PI = (coefficient = 1) => {
        let a = 1.0, b = Math.sqrt(0.5), t = 0.25, p = 1.0;
        let aNext = (a + b) * 0.5, bNext = Math.sqrt(a * b);
        t -= p * (a - aNext) * (a - aNext);
        a = aNext;
        b = bNext;
        p *= 2.0;
        aNext = (a + b) * 0.5;
        bNext = Math.sqrt(a * b);
        t -= p * (a - aNext) * (a - aNext);
        a = aNext;
        b = bNext;
        p *= 2.0;
        aNext = (a + b) * 0.5;
        bNext = Math.sqrt(a * b);
        t -= p * (a - aNext) * (a - aNext);
        a = aNext;
        b = bNext;
        p *= 2.0;
        aNext = (a + b) * 0.5;
        bNext = Math.sqrt(a * b);
        t -= p * (a - aNext) * (a - aNext);
        a = aNext;
        b = bNext;
        return coefficient * (((a + b) * (a + b)) / (4.0 * t));
    };
    Chalkboard.REGISTER = (name, func) => {
        Chalkboard.REGISTRY[name] = func;
    };
    Chalkboard.REGISTRY = {};
    Chalkboard.VERSION = "3.0.1";
    Chalkboard.VERSIONALIAS = "Euler";
})(Chalkboard || (Chalkboard = {}));
if (typeof window === "undefined")
    module.exports = Chalkboard;
else
    window.Chalkboard = Chalkboard;
var Chalkboard;
(function (Chalkboard) {
    let abal;
    (function (abal) {
        const $ = JSON.stringify;
        abal.A = (n) => {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error('The parameter "n" must be a positive integer.');
            }
            const Sn = Chalkboard.abal.S(n);
            const isEvenPermutation = (perm) => {
                let inversions = 0;
                for (let i = 0; i < perm.length; i++) {
                    for (let j = i + 1; j < perm.length; j++) {
                        if (perm[i] > perm[j])
                            inversions++;
                    }
                }
                return inversions % 2 === 0;
            };
            const elements = (Sn.elements || []).filter(isEvenPermutation);
            return {
                contains: (element) => elements.some((perm) => $(perm) === $(element)),
                elements: elements,
                id: `A${n}`
            };
        };
        abal.automorphism = (struc, mapping) => {
            const morphism = Chalkboard.abal.homomorphism(struc, struc, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error("The mapping is not a homomorphism, so it cannot be an automorphism.");
            }
            if (!Chalkboard.abal.isBijective(morphism)) {
                throw new Error("The mapping is not bijective, so it cannot be an automorphism.");
            }
            return morphism;
        };
        abal.C = (n) => {
            if (n === undefined) {
                return {
                    contains: (element) => {
                        return typeof element.a === "number" && typeof element.b === "number";
                    },
                    id: "C"
                };
            }
            else {
                if (!Number.isInteger(n) || n <= 0) {
                    throw new Error('The parameter "n" must be a positive integer.');
                }
                const elements = [];
                for (let k = 0; k < n; k++) {
                    const t = (2 * Math.PI * k) / n;
                    elements.push(Chalkboard.comp.init(Chalkboard.numb.roundTo(Math.cos(t), 0.0001), Chalkboard.numb.roundTo(Math.sin(t), 0.0001)));
                }
                return {
                    contains: (element) => elements.some((e) => {
                        return e.a === element.a && e.b === element.b;
                    }),
                    elements: elements,
                    id: `C${n}`
                };
            }
        };
        abal.cardinality = (struc) => {
            const id = "set" in struc && struc.set ? struc.set.id : ("id" in struc ? struc.id : undefined);
            if (id?.startsWith("M(") || id?.startsWith("GL") || ["Z", "Q", "R", "C", "P"].includes(id || "")) {
                return Infinity;
            }
            if ("elements" in struc && struc.elements) {
                return struc.elements.length;
            }
            if ("set" in struc && struc.set.elements) {
                return struc.set.elements.length;
            }
            throw new Error("The inputted structure does not have a finite cardinality or is missing elements.");
        };
        abal.Cartesian = (set1, set2) => {
            const result = [];
            for (const a of set1.elements || []) {
                for (const b of set2.elements || []) {
                    result.push([a, b]);
                }
            }
            return Chalkboard.abal.set(result);
        };
        abal.Cayley = (struc, type = "add") => {
            if (!struc.set.elements) {
                throw new Error("The structure must have a finite set of elements.");
            }
            const elements = struc.set.elements;
            if ("operation" in struc && struc.operation) {
                if (type === "add") {
                    let result = Chalkboard.matr.fill(0, elements.length);
                    for (let i = 0; i < elements.length; i++) {
                        for (let j = 0; j < elements.length; j++) {
                            result[i][j] = struc.operation(elements[i], elements[j]);
                        }
                    }
                    return result;
                }
                throw new Error('The "type" parameter for groups should remain as the default "add" since there is no distinction between their additive and multiplicative Cayley tables.');
            }
            if ("add" in struc && struc.add && "mul" in struc && struc.mul) {
                if (type === "add") {
                    let result = Chalkboard.matr.fill(0, elements.length);
                    for (let i = 0; i < elements.length; i++) {
                        for (let j = 0; j < elements.length; j++) {
                            result[i][j] = struc.add(elements[i], elements[j]);
                        }
                    }
                    return result;
                }
                let result = Chalkboard.matr.fill(0, elements.length);
                for (let i = 0; i < elements.length; i++) {
                    for (let j = 0; j < elements.length; j++) {
                        result[i][j] = struc.mul(elements[i], elements[j]);
                    }
                }
                return result;
            }
            throw new Error("Invalid algebraic structure for Cayley table.");
        };
        abal.center = (group) => {
            const { set, operation } = group;
            if (!set.elements || !operation) {
                return Chalkboard.abal.set([]);
            }
            const result = set.elements.filter((z) => (set.elements ?? []).every((g) => operation(z, g) === operation(g, z)));
            return Chalkboard.abal.set(result);
        };
        abal.complement = (set, superset) => {
            return Chalkboard.abal.set((superset.elements || []).filter((element) => !set.contains(element)));
        };
        abal.compose = (morph1, morph2) => {
            if (!Chalkboard.abal.isHomomorphism(morph1) || !Chalkboard.abal.isHomomorphism(morph2)) {
                throw new Error("Both morphisms of the morphism composition must be homomorphisms.");
            }
            if (!Chalkboard.abal.isEqual(morph1.struc2, morph2.struc1)) {
                throw new Error("The codomain of the first morphism and the domain of the second morphism must be equal to calculate the composition morphism.");
            }
            return Chalkboard.abal.homomorphism(morph1.struc1, morph2.struc2, (x) => morph2.mapping(morph1.mapping(x)));
        };
        abal.copy = (struc) => {
            const isSet = (obj) => obj && typeof obj.contains === "function" && (!obj.set && !obj.struc1 && !obj.base);
            const isStructure = (obj) => obj && obj.set && (obj.operation || obj.add || obj.mul);
            const isExtension = (obj) => obj && obj.base && obj.extension && typeof obj.degree === "number";
            const isMorphism = (obj) => obj && obj.struc1 && obj.struc2 && typeof obj.mapping === "function";
            if (isSet(struc)) {
                const copiedSet = {
                    contains: struc.contains,
                    ...(struc.id && { id: struc.id }),
                    ...(struc.elements && { elements: [...struc.elements] })
                };
                return copiedSet;
            }
            if (isStructure(struc)) {
                const copiedSet = Chalkboard.abal.copy(struc.set);
                const copiedStructure = {
                    set: copiedSet,
                    ...(struc.operation && { operation: struc.operation }),
                    ...(struc.identity !== undefined && { identity: struc.identity }),
                    ...(struc.inverter && { inverter: struc.inverter }),
                    ...(struc.add && { add: struc.add }),
                    ...(struc.mul && { mul: struc.mul }),
                    ...(struc.addIdentity !== undefined && { addIdentity: struc.addIdentity }),
                    ...(struc.mulIdentity !== undefined && { mulIdentity: struc.mulIdentity }),
                    ...(struc.addInverter && { addInverter: struc.addInverter }),
                    ...(struc.mulInverter && { mulInverter: struc.mulInverter })
                };
                return copiedStructure;
            }
            if (isExtension(struc)) {
                const copiedBase = Chalkboard.abal.copy(struc.base);
                const copiedExtension = Chalkboard.abal.copy(struc.extension);
                const copiedExtensionStructure = {
                    base: copiedBase,
                    extension: copiedExtension,
                    degree: struc.degree,
                    basis: struc.basis ? [...struc.basis] : [],
                    isFinite: struc.isFinite,
                    isSimple: struc.isSimple,
                    isAlgebraic: struc.isAlgebraic
                };
                return copiedExtensionStructure;
            }
            if (isMorphism(struc)) {
                const copiedStruc1 = Chalkboard.abal.copy(struc.struc1);
                const copiedStruc2 = Chalkboard.abal.copy(struc.struc2);
                const copiedMorphism = {
                    struc1: copiedStruc1,
                    struc2: copiedStruc2,
                    mapping: struc.mapping
                };
                return copiedMorphism;
            }
            throw new Error('The "struc" must be a set, structure, structure extension, or morphism.');
        };
        abal.coset = (struc, substruc) => {
            if ("operation" in struc && !Chalkboard.abal.isSubgroup(struc, substruc.set)) {
                throw new Error('The "substruc" must be a subgroup of the "struc".');
            }
            else if ("add" in struc && !Chalkboard.abal.isIdeal(struc, substruc.set)) {
                throw new Error('The "substruc" must be an ideal of the "struc".');
            }
            const elements = Chalkboard.abal.toArray(struc.set);
            const subElements = Chalkboard.abal.toArray(substruc.set);
            const cosets = new Map();
            elements.forEach((g) => {
                const cosetElements = subElements.map(h => "operation" in struc ?
                    struc.operation(g, h) :
                    struc.add(g, h));
                const sortedElements = [...cosetElements].sort((a, b) => {
                    if (typeof a === "number" && typeof b === "number") {
                        return a - b;
                    }
                    return $(a).localeCompare($(b));
                });
                const key = $(sortedElements);
                if (!cosets.has(key)) {
                    const coset = Chalkboard.abal.set(cosetElements);
                    cosets.set(key, coset);
                }
            });
            return Chalkboard.abal.set(Array.from(cosets.values()));
        };
        abal.cyclicSubgroup = (group, element) => {
            if (group.set.id && ["Z", "Q", "R", "C"].includes(group.set.id)) {
                throw new Error('The "group" must be finite.');
            }
            const result = [];
            let current = element;
            if (!group.operation) {
                return Chalkboard.abal.set([]);
            }
            do {
                result.push(current);
                current = group.operation(current, element);
            } while (!result.includes(current));
            return Chalkboard.abal.set(result);
        };
        abal.D = (n) => {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error('The parameter "n" must be a positive integer.');
            }
            const elements = [];
            for (let i = 0; i < n; i++) {
                elements.push(`r${i}`);
            }
            for (let i = 0; i < n; i++) {
                elements.push(`s${i}`);
            }
            return {
                contains: (element) => elements.includes(element),
                elements: elements,
                id: `D${n}`
            };
        };
        abal.difference = (set1, set2) => {
            const result = (set1.elements || []).filter((element) => !set2.contains(element));
            return Chalkboard.abal.set(result);
        };
        abal.direct = (struc1, struc2, type = "product") => {
            const set = Chalkboard.abal.Cartesian(struc1.set, struc2.set);
            const add = (a, b) => [
                struc1.add(a[0], b[0]),
                struc2.add(a[1], b[1])
            ];
            const mul = (a, b) => [
                struc1.mul(a[0], b[0]),
                struc2.mul(a[1], b[1])
            ];
            const addIdentity = [
                struc1.addIdentity,
                struc2.addIdentity
            ];
            const mulIdentity = [
                struc1.mulIdentity,
                struc2.mulIdentity
            ];
            const addInverter = (a) => [
                struc1.addInverter(a[0]),
                struc2.addInverter(a[1])
            ];
            const mulInverter = (a) => [
                struc1.mulInverter(a[0]),
                struc2.mulInverter(a[1])
            ];
            if ("operation" in struc1 && "operation" in struc2) {
                const operation = (a, b) => [
                    struc1.operation(a[0], b[0]),
                    struc2.operation(a[1], b[1])
                ];
                const identity = [struc1.identity, struc2.identity];
                if ("inverter" in struc1 && "inverter" in struc2) {
                    const inverter = (a) => [
                        struc1.inverter(a[0]),
                        struc2.inverter(a[1])
                    ];
                    if (type === "sum") {
                        if (!struc1.set.elements || !struc2.set.elements) {
                            throw new Error("Direct sum is only defined for finite groups.");
                        }
                    }
                    return Chalkboard.abal.group(set, operation, identity, inverter);
                }
                if (type === "sum") {
                    if (!struc1.set.elements || !struc2.set.elements) {
                        throw new Error("Direct sum is only defined for finite structures.");
                    }
                }
                return Chalkboard.abal.monoid(set, operation, identity);
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2) {
                if (type === "sum") {
                    if (!struc1.set.elements || !struc2.set.elements) {
                        throw new Error("Direct sum is only defined for finite rings.");
                    }
                }
                return Chalkboard.abal.ring(set, add, mul, addIdentity, mulIdentity, addInverter);
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2 && "mulInverter" in struc1 && "mulInverter" in struc2) {
                if (type === "sum") {
                    if (!struc1.set.elements || !struc2.set.elements) {
                        throw new Error("Direct sum is only defined for finite fields.");
                    }
                }
                return Chalkboard.abal.field(set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter);
            }
            throw new Error("Invalid algebraic structures for direct product or sum.");
        };
        abal.endomorphism = (struc, mapping) => {
            const morphism = Chalkboard.abal.homomorphism(struc, struc, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error("The mapping is not a homomorphism, so it cannot be an endomorphism.");
            }
            return morphism;
        };
        abal.field = (set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter) => {
            const autoconfig = () => {
                if (!set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", "addInverter", and "mulInverter" explicitly.');
                }
                if (set.id === "Q" || set.id === "R") {
                    return {
                        addIdentity: 0,
                        mulIdentity: 1,
                        addInverter: (a) => -a,
                        mulInverter: (a) => (1 / a)
                    };
                }
                else if (set.id === "C") {
                    return {
                        addIdentity: Chalkboard.comp.init(0, 0),
                        mulIdentity: Chalkboard.comp.init(1, 0),
                        addInverter: (a) => Chalkboard.comp.negate(a),
                        mulInverter: (a) => Chalkboard.comp.invert(a)
                    };
                }
                throw new Error('Automatic configuration of the "addIdentity", "mulIdentity", "addInverter", and "mulInverter" properties is not available for the inputted "set".');
            };
            const configured = typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined" ? autoconfig() : { addIdentity, mulIdentity, addInverter, mulInverter };
            const field = { set, add, mul, addIdentity: configured.addIdentity, mulIdentity: configured.mulIdentity, addInverter: configured.addInverter, mulInverter: configured.mulInverter };
            if (!Chalkboard.abal.isField(field)) {
                throw new Error('The inputted "set", "add", "mul", "addIdentity", "mulIdentity", "addInverter", and "mulInverter" do not form a field.');
            }
            return field;
        };
        abal.fieldExtension = (base, extension, degree, basis, isFinite, isSimple, isAlgebraic) => {
            if (!Chalkboard.abal.isSubfield(base, extension.set)) {
                throw new Error('The "base" must be a subfield of the "extension".');
            }
            const autoconfig = () => {
                if (!base.set.id) {
                    throw new Error('The "set" property of the "base" must have a valid "id" property, or you must input "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" explicitly.');
                }
                if (base.set.id === "Q" && extension.set.id === "R") {
                    return {
                        degree: Infinity,
                        basis: [],
                        isFinite: false,
                        isSimple: false,
                        isAlgebraic: false
                    };
                }
                else if (base.set.id === "R" && extension.set.id === "C") {
                    return {
                        degree: 2,
                        basis: [Chalkboard.vect.init(1, 0), Chalkboard.vect.init(0, 1)],
                        isFinite: true,
                        isSimple: true,
                        isAlgebraic: true
                    };
                }
                throw new Error('Automatic configuration of the "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" properties is not available for the inputted "base".');
            };
            const configured = typeof degree === "undefined" || typeof basis === "undefined" || typeof isFinite === "undefined" || typeof isSimple === "undefined" || typeof isAlgebraic === "undefined" ? autoconfig() : { degree, basis, isFinite, isSimple, isAlgebraic };
            return { base, extension, degree: configured.degree, basis: configured.basis, isFinite: configured.isFinite, isSimple: configured.isSimple, isAlgebraic: configured.isAlgebraic };
        };
        abal.GL = (n) => ({
            contains: (element) => {
                return Array.isArray(element) && Chalkboard.matr.isSizeOf(element, n) && Chalkboard.matr.isInvertible(element);
            },
            id: `GL${n}`
        });
        abal.group = (set, operation, identity, inverter) => {
            const autoconfig = () => {
                if (!set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "identity" and "inverter" explicitly.');
                }
                if (set.id === "Z" || set.id === "Q" || set.id === "R") {
                    return {
                        identity: 0,
                        inverter: (a) => -a
                    };
                }
                else if (set.id === "C") {
                    return {
                        identity: Chalkboard.comp.init(0, 0),
                        inverter: (a) => Chalkboard.comp.negate(a)
                    };
                }
                else if (set.id.startsWith("Z") && set.id.length > 1) {
                    const n = parseInt(set.id.slice(1), 10);
                    return {
                        identity: 0,
                        inverter: (a) => ((n - a % n) % n)
                    };
                }
                else if (set.id.startsWith("C") && set.id.length > 1) {
                    return {
                        identity: Chalkboard.comp.init(1, 0),
                        inverter: (a) => Chalkboard.comp.conjugate(a)
                    };
                }
                else if (set.id.startsWith("M(")) {
                    const rows = set.rows;
                    const cols = set.cols;
                    return {
                        identity: Chalkboard.matr.fill(0, rows, cols),
                        inverter: (a) => Chalkboard.matr.negate(a)
                    };
                }
                else if (set.id.startsWith("GL")) {
                    const n = parseInt(set.id.slice(2), 10);
                    return {
                        identity: Chalkboard.matr.identity(n),
                        inverter: (a) => Chalkboard.matr.invert(a)
                    };
                }
                else if (set.id.match(/^[SA]\d+$/)) {
                    const n = parseInt(set.id.slice(1), 10);
                    return {
                        identity: Array.from({ length: n }, (_, i) => i),
                        inverter: (a) => {
                            const perm = a;
                            const inverse = new Array(perm.length);
                            for (let i = 0; i < perm.length; i++)
                                inverse[perm[i]] = i;
                            return inverse;
                        }
                    };
                }
                throw new Error('Automatic configuration of the "identity" and "inverter" properties is not available for the inputted "set".');
            };
            const configured = typeof identity === "undefined" || typeof inverter === "undefined" ? autoconfig() : { identity, inverter: inverter };
            const group = { set, operation, identity: configured.identity, inverter: configured.inverter };
            if (!Chalkboard.abal.isGroup(group)) {
                throw new Error('The inputted "set", "operation", "identity", and "inverter" do not form a group.');
            }
            return group;
        };
        abal.homomorphism = (struc1, struc2, mapping) => {
            const morphism = { struc1, struc2, mapping };
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error('The inputted "struc1", "struc2", and "mapping" do not form a homomorphism.');
            }
            return morphism;
        };
        abal.idmorphism = (struc) => {
            return Chalkboard.abal.automorphism(struc, (x) => x);
        };
        abal.image = (morph, subset) => {
            const { struc1, mapping } = morph;
            if (!struc1.set.elements) {
                throw new Error('The domain of the "morph" must have a finite set of elements to calculate the image.');
            }
            const _subset = subset || struc1.set;
            if (!_subset.elements) {
                throw new Error('The domain of the "morph" or the subset of it must have a finite set of elements to calculate the image.');
            }
            const mapped = _subset.elements.map(mapping);
            const result = Array.from(new Set(mapped.map((e) => $(e)))).map((e) => JSON.parse(e));
            return Chalkboard.abal.set(result);
        };
        abal.intersection = (set1, set2) => {
            const result = (set1.elements || []).filter((element) => set2.contains(element));
            return Chalkboard.abal.set(result);
        };
        abal.invmorphism = (morph) => {
            if (morph.struc1.set.id && ["Z", "Q", "R", "C"].includes(morph.struc1.set.id)) {
                throw new Error('Inverse morphisms cannot be defined for morphisms with infinite domains.');
            }
            if (!Chalkboard.abal.isIsomorphism(morph)) {
                throw new Error("The morphism is not an isomorphism, so it does not have an inverse.");
            }
            return Chalkboard.abal.homomorphism(morph.struc2, morph.struc1, (y) => {
                const domain = morph.struc1.set.elements || [];
                for (const x of domain) {
                    if ($(morph.mapping(x)) === $(y)) {
                        return x;
                    }
                }
                throw new Error(`The inverse morphism failed to be defined because no element in the domain maps to the element "${$(y)}" in the codomain.`);
            });
        };
        abal.isAutomorphism = (morph) => {
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isEndomorphism(morph) && Chalkboard.abal.isIsomorphism(morph);
        };
        abal.isBijective = (morph) => {
            if (["Z", "Q", "R", "C"].includes(morph.struc1.set.id || "") || ["Z", "Q", "R", "C"].includes(morph.struc2.set.id || "")) {
                return morph.struc1.set.id === morph.struc2.set.id;
            }
            return Chalkboard.abal.isInjective(morph) && Chalkboard.abal.isSurjective(morph);
        };
        abal.isClosed = (set, operation) => {
            if (set.id && ["Z", "Q", "R", "C"].includes(set.id)) {
                return true;
            }
            if (set.id?.startsWith("M(")) {
                if (operation === Chalkboard.matr.add) {
                    return true;
                }
                if (operation === Chalkboard.matr.mul) {
                    const dimensions = set.id.match(/\d+/g)?.map(Number);
                    if (dimensions && dimensions.length >= 2) {
                        return dimensions[0] === dimensions[1];
                    }
                }
                return false;
            }
            if (set.id === "C") {
                if (operation === Chalkboard.comp.add || operation === Chalkboard.comp.mul) {
                    return true;
                }
                return false;
            }
            if (typeof set === "object" && "elements" in set && set.elements) {
                for (const a of set.elements) {
                    for (const b of set.elements) {
                        const result = operation(a, b);
                        if (!set.contains(result)) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return true;
        };
        abal.isCommutative = (struc) => {
            const { set } = struc;
            if (set.id && ["Z", "Q", "R", "C"].includes(set.id)) {
                return true;
            }
            if (!set.elements) {
                return false;
            }
            if ("operation" in struc && struc.operation) {
                const { operation } = struc;
                for (const a of set.elements) {
                    for (const b of set.elements) {
                        if ($(operation(a, b)) !== $(operation(b, a))) {
                            return false;
                        }
                    }
                }
                return true;
            }
            if ("add" in struc && "mul" in struc && struc.add && struc.mul) {
                const { add, mul } = struc;
                for (const a of set.elements) {
                    for (const b of set.elements) {
                        if ($(add(a, b)) !== $(add(b, a))) {
                            return false;
                        }
                    }
                }
                if ("mulIdentity" in struc) {
                    for (const a of set.elements) {
                        for (const b of set.elements) {
                            if ($(mul(a, b)) !== $(mul(b, a))) {
                                return false;
                            }
                        }
                    }
                }
                return true;
            }
            return false;
        };
        abal.isCyclicSubgroup = (group, subgroup) => {
            if (!Chalkboard.abal.isSubgroup(group, subgroup) || !group.operation) {
                return false;
            }
            const { operation } = group;
            for (const generator of subgroup.elements || []) {
                const generatedElements = [];
                let current = generator;
                do {
                    generatedElements.push(current);
                    current = operation(current, generator);
                } while (!generatedElements.includes(current));
                const generatedSet = Chalkboard.abal.set(generatedElements);
                if (Chalkboard.abal.isSubset(subgroup, generatedSet)) {
                    return true;
                }
            }
            return false;
        };
        abal.isEmpty = (struc) => {
            const id = "set" in struc && struc.set ? struc.set.id : ("id" in struc ? struc.id : undefined);
            if (id === "Z" || id === "Q" || id === "R" || id === "C" || id?.startsWith("M(")) {
                return false;
            }
            if ("elements" in struc && struc.elements) {
                return struc.elements.length === 0;
            }
            if ("set" in struc && struc.set.elements) {
                return struc.set.elements.length === 0;
            }
            return true;
        };
        abal.isEndomorphism = (morph) => {
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isEqual(morph.struc1, morph.struc2);
        };
        abal.isEqual = (struc1, struc2) => {
            if (struc1.constructor !== struc2.constructor) {
                return false;
            }
            if ("elements" in struc1 && "elements" in struc2) {
                if ("id" in struc1 && "id" in struc2 && struc1.id === struc2.id) {
                    return true;
                }
                const set1 = struc1.elements || [];
                const set2 = struc2.elements || [];
                if (set1.length !== set2.length) {
                    return false;
                }
                return set1.every((x) => struc2.contains(x)) && set2.every((x) => struc1.contains(x));
            }
            if ("operation" in struc1 && "operation" in struc2) {
                const monoiroup1 = struc1;
                const monoiroup2 = struc2;
                const monoidEqual = Chalkboard.abal.isEqual(monoiroup1.set, monoiroup2.set) &&
                    monoiroup1.identity === monoiroup2.identity &&
                    (monoiroup1.operation === monoiroup2.operation ||
                        monoiroup1.operation.toString() === monoiroup2.operation.toString());
                if ("inverter" in monoiroup1 && "inverter" in monoiroup2) {
                    return monoidEqual && (monoiroup1.inverter === monoiroup2.inverter ||
                        monoiroup1.inverter.toString() === monoiroup2.inverter.toString());
                }
                if (("inverter" in monoiroup1) !== ("inverter" in monoiroup2)) {
                    return false;
                }
                return monoidEqual;
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2) {
                const ring1 = struc1;
                const ring2 = struc2;
                return (Chalkboard.abal.isEqual(ring1.set, ring2.set) &&
                    ring1.addIdentity === ring2.addIdentity &&
                    ring1.mulIdentity === ring2.mulIdentity &&
                    (ring1.add === ring2.add ||
                        ring1.add.toString() === ring2.add.toString()) &&
                    (ring1.mul === ring2.mul ||
                        ring1.mul.toString() === ring2.mul.toString()) &&
                    (ring1.addInverter === ring2.addInverter ||
                        ring1.addInverter.toString() === ring2.addInverter.toString()));
            }
            if ("mulInverter" in struc1 && "mulInverter" in struc2) {
                const field1 = struc1;
                const field2 = struc2;
                return (Chalkboard.abal.isEqual(field1.set, field2.set) &&
                    field1.addIdentity === field2.addIdentity &&
                    field1.mulIdentity === field2.mulIdentity &&
                    (field1.add === field2.add ||
                        field1.add.toString() === field2.add.toString()) &&
                    (field1.mul === field2.mul ||
                        field1.mul.toString() === field2.mul.toString()) &&
                    (field1.addInverter === field2.addInverter ||
                        field1.addInverter.toString() === field2.addInverter.toString()) &&
                    (field1.mulInverter === field2.mulInverter ||
                        field1.mulInverter.toString() === field2.mulInverter.toString()));
            }
            if ("mapping" in struc1 && "mapping" in struc2) {
                const morph1 = struc1;
                const morph2 = struc2;
                return (Chalkboard.abal.isEqual(morph1.struc1, morph2.struc1) &&
                    Chalkboard.abal.isEqual(morph1.struc2, morph2.struc2) &&
                    (morph1.mapping === morph2.mapping ||
                        morph1.mapping.toString() === morph2.mapping.toString() ||
                        (Chalkboard.abal.isEqual(Chalkboard.abal.image(morph1), Chalkboard.abal.image(morph2)) &&
                            Chalkboard.abal.isEqual(Chalkboard.abal.preimage(morph1), Chalkboard.abal.preimage(morph2)) &&
                            Chalkboard.abal.isEqual(Chalkboard.abal.kernel(morph1), Chalkboard.abal.kernel(morph2)))));
            }
            return false;
        };
        abal.isExact = (morph1, morph2) => {
            return Chalkboard.abal.isEqual(Chalkboard.abal.image(morph1), Chalkboard.abal.kernel(morph2));
        };
        abal.isField = (field) => {
            const { set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter } = field;
            if (set.id === "Q" || set.id === "R" || set.id === "C") {
                return true;
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined") {
                return false;
            }
            const additiveGroup = { set, operation: add, identity: addIdentity, inverter: addInverter };
            if (!Chalkboard.abal.isGroup(additiveGroup) || !Chalkboard.abal.isCommutative(additiveGroup)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, mul)) {
                return false;
            }
            for (const a of set.elements || []) {
                for (const b of set.elements || []) {
                    for (const c of set.elements || []) {
                        if ($(mul(mul(a, b), c)) !== $(mul(a, mul(b, c)))) {
                            return false;
                        }
                    }
                }
            }
            for (const a of set.elements || []) {
                if (a !== addIdentity && (!set.contains(mulInverter(a)) || $(mul(a, mulInverter(a))) !== $(mulIdentity))) {
                    return false;
                }
            }
            if (!Chalkboard.abal.isCommutative(field)) {
                return false;
            }
            for (const a of field.set.elements || []) {
                for (const b of field.set.elements || []) {
                    for (const c of field.set.elements || []) {
                        if ($(field.mul(a, field.add(b, c))) !== $(field.add(field.mul(a, b), field.mul(a, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        abal.isGroup = (group) => {
            const { set, operation, identity, inverter } = group;
            if (set.id === "Z" || set.id === "Q" || set.id === "R" || set.id === "C" || set.id === "GL") {
                return true;
            }
            if (typeof set.elements === "undefined") {
                return false;
            }
            if (typeof operation === "undefined" || typeof identity === "undefined" || typeof inverter === "undefined") {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, operation)) {
                return false;
            }
            for (const a of set.elements) {
                if ($(operation(a, identity)) !== $(a) || $(operation(identity, a)) !== $(a)) {
                    return false;
                }
            }
            for (const a of set.elements) {
                if (!set.contains(inverter(a)) || $(operation(a, inverter(a))) !== $(identity)) {
                    return false;
                }
            }
            for (const a of set.elements) {
                for (const b of set.elements) {
                    for (const c of set.elements) {
                        if ($(operation(operation(a, b), c)) !== $(operation(a, operation(b, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        abal.isHomomorphism = (morph) => {
            const { struc1, struc2, mapping } = morph;
            if ("operation" in struc1 && "operation" in struc2 && struc1.operation && struc2.operation) {
                const { operation: op1 } = struc1;
                const { operation: op2 } = struc2;
                for (const a of struc1.set.elements || []) {
                    for (const b of struc1.set.elements || []) {
                        if ($(op2(mapping(a), mapping(b))) !== $(mapping(op1(a, b)))) {
                            return false;
                        }
                    }
                }
                return true;
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2 && struc1.add && struc2.add && struc1.mul && struc2.mul) {
                const { add: add1, mul: mul1 } = struc1;
                const { add: add2, mul: mul2 } = struc2;
                for (const a of struc1.set.elements || []) {
                    for (const b of struc1.set.elements || []) {
                        if ($(add2(mapping(a), mapping(b))) !== $(mapping(add1(a, b)))) {
                            return false;
                        }
                        if ($(mul2(mapping(a), mapping(b))) !== $(mapping(mul1(a, b)))) {
                            return false;
                        }
                    }
                }
                return true;
            }
            throw new Error("The algebraic structures of the homomorphism may have missing operations or incompatible types.");
        };
        abal.isIdeal = (ring, subset) => {
            const { add, mul, addIdentity, addInverter } = ring;
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof addInverter === "undefined") {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, add)) {
                return false;
            }
            if (!subset.contains(addIdentity)) {
                return false;
            }
            for (const a of subset.elements || []) {
                if (!subset.contains(addInverter(a))) {
                    return false;
                }
            }
            for (const r of ring.set.elements || []) {
                for (const a of subset.elements || []) {
                    if (!subset.contains(mul(r, a)) || !subset.contains(mul(a, r))) {
                        return false;
                    }
                }
            }
            return true;
        };
        abal.isIdentity = (struc, element, type = "add") => {
            if (type === "add" && struc.add && struc.addIdentity) {
                return ("add" in struc &&
                    struc.add(element, struc.addIdentity) === element &&
                    struc.add(struc.addIdentity, element) === element);
            }
            else if (type === "mul" && struc.mul && struc.mulIdentity) {
                return ("mul" in struc && "mulIdentity" in struc &&
                    struc.mul?.(element, struc.mulIdentity) === element &&
                    struc.mul?.(struc.mulIdentity, element) === element);
            }
            return false;
        };
        abal.isInjective = (morph) => {
            if (["Z", "Q", "R", "C"].includes(morph.struc1.set.id || "") || ["Z", "Q", "R", "C"].includes(morph.struc2.set.id || "")) {
                return morph.struc1.set.id === morph.struc2.set.id;
            }
            const { struc1, mapping } = morph;
            const domain = struc1.set.elements || [];
            const mapped = domain.map(mapping);
            return new Set(mapped.map((e) => $(e))).size === domain.length;
        };
        abal.isInverse = (struc, element1, element2, type = "add") => {
            if (type === "add") {
                return ("add" in struc &&
                    struc.add?.(element1, element2) === struc.addIdentity &&
                    struc.add?.(element2, element1) === struc.addIdentity);
            }
            else if (type === "mul" && "mul" in struc && "mulIdentity" in struc) {
                return (struc.mul?.(element1, element2) === struc.mulIdentity &&
                    struc.mul?.(element2, element1) === struc.mulIdentity);
            }
            return false;
        };
        abal.isIsomorphism = (morph) => {
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isBijective(morph);
        };
        abal.isMonoid = (monoid) => {
            const { set, operation, identity } = monoid;
            if (set.id === "Z" || set.id === "Q" || set.id === "R" || set.id === "C" || set.id === "GL") {
                return true;
            }
            if (typeof set.elements === "undefined") {
                return false;
            }
            if (typeof operation === "undefined" || typeof identity === "undefined") {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, operation)) {
                return false;
            }
            for (const a of set.elements) {
                if ($(operation(a, identity)) !== $(a) || $(operation(identity, a)) !== $(a)) {
                    return false;
                }
            }
            for (const a of set.elements) {
                for (const b of set.elements) {
                    for (const c of set.elements) {
                        if ($(operation(operation(a, b), c)) !== $(operation(a, operation(b, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        abal.isNormalSubgroup = (group, subgroup) => {
            const { set, operation, inverter } = group;
            if (!operation || !inverter) {
                return false;
            }
            if (!Chalkboard.abal.isSubgroup(group, subgroup)) {
                return false;
            }
            for (const g of set.elements || []) {
                for (const h of subgroup.elements || []) {
                    const conjugate = operation(operation(g, h), inverter(g));
                    if (!subgroup.contains(conjugate)) {
                        return false;
                    }
                }
            }
            return true;
        };
        abal.isomorphism = (struc1, struc2, mapping) => {
            const morphism = Chalkboard.abal.homomorphism(struc1, struc2, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error("The mapping is not a homomorphism, so it cannot be an isomorphism.");
            }
            if (!Chalkboard.abal.isBijective(morphism)) {
                throw new Error("The mapping is not bijective, so it cannot be an isomorphism.");
            }
            return morphism;
        };
        abal.isPrincipalIdeal = (ring, ideal) => {
            for (const generator of ideal.elements || []) {
                const principalIdeal = Chalkboard.abal.principalIdeal(ring, generator);
                if (Chalkboard.abal.isSubset(ideal, principalIdeal) && Chalkboard.abal.isSubset(principalIdeal, ideal)) {
                    return true;
                }
            }
            return false;
        };
        abal.isRing = (ring) => {
            const { set, add, mul, addIdentity, addInverter } = ring;
            if (set.id === "Z" || set.id === "Q" || set.id === "R" || set.id === "C") {
                return true;
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof addInverter === "undefined") {
                return false;
            }
            const additiveGroup = { set, operation: add, identity: addIdentity, inverter: addInverter };
            if (!Chalkboard.abal.isGroup(additiveGroup) || !Chalkboard.abal.isCommutative(additiveGroup)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, mul)) {
                return false;
            }
            for (const a of set.elements || []) {
                for (const b of set.elements || []) {
                    for (const c of set.elements || []) {
                        if ($(mul(mul(a, b), c)) !== $(mul(a, mul(b, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        abal.isSubfield = (field, subset) => {
            const { add, mul, addIdentity, mulIdentity, addInverter, mulInverter } = field;
            if (field.set.id && subset.id) {
                if (subset.id === field.set.id && ["Q", "R", "C"].includes(subset.id)) {
                    return true;
                }
                if (subset.id === "Q" && ["R", "C"].includes(field.set.id)) {
                    return true;
                }
                if (subset.id === "R" && field.set.id === "C") {
                    return true;
                }
                if (subset.id === "Z") {
                    return false;
                }
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined") {
                return false;
            }
            if (!subset.contains(addIdentity) || !subset.contains(mulIdentity)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, add) || !Chalkboard.abal.isClosed(subset, mul)) {
                return false;
            }
            for (const a of subset.elements || []) {
                if (!subset.contains(addInverter(a))) {
                    return false;
                }
            }
            for (const a of subset.elements || []) {
                if ($(a) !== $(addIdentity) && !subset.contains(mulInverter(a))) {
                    return false;
                }
            }
            return true;
        };
        abal.isSubgroup = (group, subset) => {
            const { operation, identity, inverter } = group;
            if (group.set.id && subset.id) {
                if (subset.id === "Z" && ["Z", "Q", "R", "C"].includes(group.set.id)) {
                    return true;
                }
                if (subset.id === "Q" && ["Q", "R", "C"].includes(group.set.id)) {
                    return true;
                }
                if (subset.id === "R" && ["R", "C"].includes(group.set.id)) {
                    return true;
                }
                if (subset.id === "C" && group.set.id === "C") {
                    return true;
                }
                if (subset.id.startsWith("Z") && group.set.id.startsWith("Z")) {
                    const nSubset = parseInt(subset.id.slice(1), 10);
                    const nGroup = parseInt(group.set.id.slice(1), 10);
                    if (!isNaN(nSubset) && !isNaN(nGroup)) {
                        return nGroup % nSubset === 0;
                    }
                }
                if (subset.id?.startsWith("GL") && subset.id === group.set.id) {
                    return true;
                }
            }
            if (typeof operation === "undefined" || typeof identity === "undefined" || typeof inverter === "undefined") {
                return false;
            }
            if (!subset.contains(identity)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, operation)) {
                return false;
            }
            for (const a of subset.elements || []) {
                if (!subset.contains(inverter(a))) {
                    return false;
                }
            }
            return true;
        };
        abal.isSubmonoid = (monoid, subset) => {
            const { operation, identity } = monoid;
            if (monoid.set.id && subset.id) {
                if (subset.id === monoid.set.id) {
                    return true;
                }
                if (subset.id === "Z" && ["Z", "Q", "R", "C"].includes(monoid.set.id)) {
                    return true;
                }
                if (subset.id === "Q" && ["Q", "R", "C"].includes(monoid.set.id)) {
                    return true;
                }
                if (subset.id === "R" && ["R", "C"].includes(monoid.set.id)) {
                    return true;
                }
            }
            if (typeof operation === "undefined" || typeof identity === "undefined") {
                return false;
            }
            if (!subset.contains(identity)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, operation)) {
                return false;
            }
            return true;
        };
        abal.isSubring = (ring, subset) => {
            const { add, mul, addIdentity, addInverter } = ring;
            if (ring.set.id && subset.id) {
                if (subset.id === ring.set.id) {
                    return true;
                }
                if (subset.id === "Z" && ["Z", "Q", "R", "C"].includes(ring.set.id)) {
                    return true;
                }
                if (subset.id === "Q" && ["Q", "R", "C"].includes(ring.set.id)) {
                    return true;
                }
                if (subset.id === "R" && ["R", "C"].includes(ring.set.id)) {
                    return true;
                }
                if (subset.id.startsWith("Z") && ring.set.id.startsWith("Z")) {
                    const nSubset = parseInt(subset.id.slice(1), 10);
                    const nRing = parseInt(ring.set.id.slice(1), 10);
                    if (!isNaN(nSubset) && !isNaN(nRing)) {
                        return nRing % nSubset === 0;
                    }
                }
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof addInverter === "undefined") {
                return false;
            }
            if (!subset.contains(addIdentity)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, add) || !Chalkboard.abal.isClosed(subset, mul)) {
                return false;
            }
            for (const a of subset.elements || []) {
                if (!subset.contains(addInverter(a))) {
                    return false;
                }
            }
            return true;
        };
        abal.isSubset = (set, superset) => {
            if (set.id && superset.id) {
                if (set.id === superset.id) {
                    return true;
                }
                if (set.id === "Z") {
                    return ["Z", "Q", "R", "C"].includes(superset.id);
                }
                if (set.id === "Q") {
                    return ["Q", "R", "C"].includes(superset.id);
                }
                if (set.id === "R") {
                    return ["R", "C"].includes(superset.id);
                }
                if (set.id === "N") {
                    return ["N", "Z", "Q", "R", "C"].includes(superset.id);
                }
                if (set.id.startsWith("Z") && superset.id.startsWith("Z")) {
                    const nSet = parseInt(set.id.slice(1), 10);
                    const nSuper = parseInt(superset.id.slice(1), 10);
                    if (!isNaN(nSet) && !isNaN(nSuper)) {
                        return nSuper % nSet === 0;
                    }
                }
            }
            return (set.elements || []).every((element) => superset.contains(element));
        };
        abal.isSuperset = (set, subset) => {
            return Chalkboard.abal.isSubset(subset, set);
        };
        abal.isSurjective = (morph) => {
            const { struc1, struc2, mapping } = morph;
            if (["Z", "Q", "R", "C", "P"].includes(struc2.set.id || "")) {
                if (struc2.set.id === "C" && ["R", "C"].includes(struc1.set.id || ""))
                    return true;
                if (struc2.set.id === "R" && struc1.set.id === "Q")
                    return false;
                if (struc1.set.id === struc2.set.id)
                    return true;
                return false;
            }
            const domain = struc1.set.elements || [];
            const codomain = struc2.set.elements || [];
            const mapped = domain.map(mapping);
            return codomain.every((e) => mapped.some((m) => $(m) === $(e)));
        };
        abal.kernel = (morph, subset) => {
            const { struc1, struc2, mapping } = morph;
            if (!struc1.set.elements) {
                throw new Error('The domain of the "morph" must have a finite set of elements to calculate the kernel.');
            }
            const _subset = subset?.elements || struc1.set.elements;
            let identity;
            if ("identity" in struc2) {
                identity = struc2.identity;
            }
            else if ("addIdentity" in struc2) {
                identity = struc2.addIdentity;
            }
            else {
                throw new Error('The codomain of the "morph" must have an identity element to calculate the kernel.');
            }
            const result = _subset.filter((element) => $(mapping(element)) === $(identity));
            return Chalkboard.abal.set(result);
        };
        abal.Lagrange = (group, subgroup) => {
            if (group.set.id && ["Z", "Q", "R", "C"].includes(group.set.id)) {
                throw new Error("Lagrange's Theorem only applies to finite groups");
            }
            return Chalkboard.abal.cardinality(group) % Chalkboard.abal.cardinality(subgroup) === 0;
        };
        abal.M = (rows, cols = rows) => ({
            contains: (element) => {
                return Array.isArray(element) && Chalkboard.matr.isSizeOf(element, rows, cols);
            },
            id: `M(${rows}, ${cols})`
        });
        abal.monoid = (set, operation, identity) => {
            const autoconfig = () => {
                if (!set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "identity" explicitly.');
                }
                if (set.id === "Z" || set.id === "Q" || set.id === "R") {
                    return { identity: 0 };
                }
                else if (set.id === "C") {
                    return { identity: Chalkboard.comp.init(0, 0) };
                }
                else if (set.id.startsWith("Z") && set.id.length > 1) {
                    return { identity: 0 };
                }
                else if (set.id.startsWith("C") && set.id.length > 1) {
                    return { identity: Chalkboard.comp.init(1, 0) };
                }
                else if (set.id.startsWith("M(")) {
                    const rows = set.rows;
                    const cols = set.cols;
                    return { identity: Chalkboard.matr.fill(0, rows, cols) };
                }
                else if (set.id.startsWith("GL")) {
                    const n = parseInt(set.id.slice(2), 10);
                    return { identity: Chalkboard.matr.identity(n) };
                }
                else if (set.id.match(/^[SA]\d+$/)) {
                    const n = parseInt(set.id.slice(1), 10);
                    return { identity: Array.from({ length: n }, (_, i) => i) };
                }
                throw new Error('Automatic configuration of the "identity" property is not available for the inputted "set".');
            };
            const configured = typeof identity === "undefined" ? autoconfig() : { identity };
            const monoid = { set, operation, identity: configured.identity };
            if (!Chalkboard.abal.isMonoid(monoid)) {
                throw new Error('The inputted "set", "operation", and "identity" do not form a monoid.');
            }
            return monoid;
        };
        abal.N = () => ({
            contains: (element) => Number.isInteger(element) && element > 0,
            id: "N"
        });
        abal.order = (group, element) => {
            if (!group.operation) {
                throw new Error('The "group" must have an "operation" property to calculate the order of an element.');
            }
            let result = 1;
            let current = element;
            while ($(current) !== $(group.identity)) {
                current = group.operation(current, element);
                result++;
                if (result > (group.set.elements?.length || Infinity)) {
                    throw new Error('The "group" might not be finite because an infinite loop was detected.');
                }
            }
            return result;
        };
        abal.P = () => ({
            contains: (element) => Chalkboard.numb.isPrime(element),
            id: "P"
        });
        abal.powerSet = (set) => {
            const result = [];
            const elements = set.elements || [];
            const totalSubsets = 1 << elements.length;
            for (let i = 0; i < totalSubsets; i++) {
                const subset = [];
                for (let j = 0; j < elements.length; j++) {
                    if (i & (1 << j)) {
                        subset.push(elements[j]);
                    }
                }
                result.push(Chalkboard.abal.set(subset));
            }
            return Chalkboard.abal.set(result);
        };
        abal.preimage = (morph, subset) => {
            const { struc1, struc2, mapping } = morph;
            if (!struc1.set.elements) {
                throw new Error('The domain of the "morph" must have a finite set of elements to calculate the preimage.');
            }
            const _subset = subset || struc2.set;
            if (!_subset.elements) {
                throw new Error('The codomain of the "morph" or the subset of it must have a finite set of elements to calculate the preimage.');
            }
            const result = struc1.set.elements.filter((element) => _subset.contains(mapping(element)));
            return Chalkboard.abal.set(result);
        };
        abal.principalIdeal = (ring, element) => {
            if (ring.set.id && ["Z", "Q", "R", "C"].includes(ring.set.id)) {
                throw new Error('The "ring" must be finite.');
            }
            const result = [];
            const { mul, add } = ring;
            if (!add || !mul) {
                throw new Error('The "ring" must have "mul" and "add" properties to generate a principal ideal.');
            }
            for (const r of ring.set.elements || []) {
                const leftProduct = mul(element, r);
                const rightProduct = mul(r, element);
                if (!result.includes(leftProduct)) {
                    result.push(leftProduct);
                }
                if (!result.includes(rightProduct)) {
                    result.push(rightProduct);
                }
            }
            for (let i = 0; i < result.length; i++) {
                for (let j = 0; j < result.length; j++) {
                    const sum = add(result[i], result[j]);
                    if (!result.includes(sum)) {
                        result.push(sum);
                    }
                }
            }
            return Chalkboard.abal.set(result);
        };
        abal.print = (struc) => {
            console.log(Chalkboard.abal.toString(struc));
        };
        abal.Q = () => ({
            contains: (element) => Number.isFinite(element) && Chalkboard.numb.isRational(element),
            id: "Q"
        });
        abal.quotient = (struc, substruc) => {
            if ("operation" in struc && !Chalkboard.abal.isNormalSubgroup(struc, substruc.set)) {
                throw new Error('The "substruc" must be a normal subgroup of the "struc".');
            }
            if ("add" in struc && !Chalkboard.abal.isIdeal(struc, substruc.set)) {
                throw new Error('The "substruc" must be an ideal of the "struc".');
            }
            const cosets = Chalkboard.abal.coset(struc, substruc);
            const operationConfig = (a, b, operation) => {
                const repA = a.elements[0];
                const repB = b.elements[0];
                const result = operation(repA, repB);
                return cosets.elements.find((c) => c.contains(result));
            };
            return {
                set: cosets,
                ...("operation" in struc ? {
                    operation: (a, b) => operationConfig(a, b, struc.operation),
                    identity: cosets.elements.find(c => c.contains(struc.identity)),
                    inverter: a => operationConfig(a, a, (x) => struc.inverter(x))
                } : {
                    add: (a, b) => operationConfig(a, b, struc.add),
                    mul: (a, b) => operationConfig(a, b, struc.mul),
                    addIdentity: cosets.elements.find(c => c.contains(struc.addIdentity)),
                    addInverter: a => operationConfig(a, a, (x) => struc.addInverter(x))
                })
            };
        };
        abal.R = () => ({
            contains: (element) => Number.isFinite(element),
            id: "R"
        });
        abal.ring = (set, add, mul, addIdentity, mulIdentity, addInverter) => {
            const autoconfig = () => {
                if (!set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", and "addInverter" explicitly.');
                }
                if (set.id === "Z" || set.id === "Q" || set.id === "R") {
                    return {
                        addIdentity: 0,
                        mulIdentity: 1,
                        addInverter: (a) => -a
                    };
                }
                else if (set.id === "C") {
                    return {
                        addIdentity: Chalkboard.comp.init(0, 0),
                        mulIdentity: Chalkboard.comp.init(1, 0),
                        addInverter: (a) => Chalkboard.comp.negate(a)
                    };
                }
                else if (set.id.startsWith("Z") && set.id.length > 1) {
                    const n = parseInt(set.id.slice(1), 10);
                    if (isNaN(n) || n <= 0) {
                        throw new Error(`Invalid modulus in set "${set.id}".`);
                    }
                    return {
                        addIdentity: 0,
                        mulIdentity: 1,
                        addInverter: (a) => ((n - a % n) % n)
                    };
                }
                else if (set.id.startsWith("M(")) {
                    const rows = set.rows;
                    const cols = set.cols;
                    if (rows !== cols) {
                        throw new Error("Only square matrices can form a ring.");
                    }
                    return {
                        addIdentity: Chalkboard.matr.fill(0, rows, cols),
                        mulIdentity: Chalkboard.matr.identity(rows),
                        addInverter: (a) => Chalkboard.matr.negate(a)
                    };
                }
                throw new Error('Automatic configuration of the "addIdentity", "mulIdentity", and "addInverter" properties is not available for the inputted "set".');
            };
            const configured = typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" ? autoconfig() : { addIdentity, mulIdentity, addInverter };
            const ring = { set, add, mul, addIdentity: configured.addIdentity, mulIdentity: configured.mulIdentity, addInverter: configured.addInverter };
            if (!Chalkboard.abal.isRing(ring)) {
                throw new Error('The inputted "set", "add", "mul", "addIdentity", "mulIdentity", and "addInverter" do not form a ring.');
            }
            return ring;
        };
        abal.ringExtension = (base, extension, degree, basis, isFinite, isSimple, isAlgebraic) => {
            if (!Chalkboard.abal.isSubring(base, extension.set)) {
                throw new Error('The "base" must be a subring of the "extension".');
            }
            const autoconfig = () => {
                if (!base.set.id) {
                    throw new Error('The "set" property of the "base" must have a valid "id" property, or you must input "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" explicitly.');
                }
                if (base.set.id === "Z" && extension.set.id === "Q") {
                    return {
                        degree: Infinity,
                        basis: [],
                        isFinite: false,
                        isSimple: false,
                        isAlgebraic: false
                    };
                }
                else if (base.set.id === "Q" && extension.set.id === "R") {
                    return {
                        degree: Infinity,
                        basis: [],
                        isFinite: false,
                        isSimple: false,
                        isAlgebraic: false
                    };
                }
                else if (base.set.id === "R" && extension.set.id === "C") {
                    return {
                        degree: 2,
                        basis: [Chalkboard.vect.init(1, 0), Chalkboard.vect.init(0, 1)],
                        isFinite: true,
                        isSimple: true,
                        isAlgebraic: true
                    };
                }
                throw new Error('Automatic configuration of the "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" properties is not available for the inputted "base".');
            };
            const configured = typeof degree === "undefined" || typeof basis === "undefined" || typeof isFinite === "undefined" || typeof isSimple === "undefined" || typeof isAlgebraic === "undefined" ? autoconfig() : { degree, basis, isFinite, isSimple, isAlgebraic };
            return { base, extension, degree: configured.degree, basis: configured.basis, isFinite: configured.isFinite, isSimple: configured.isSimple, isAlgebraic: configured.isAlgebraic };
        };
        abal.S = (n) => {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error('The parameter "n" must be a positive integer.');
            }
            const generatePermutations = (arr) => {
                if (arr.length === 0)
                    return [[]];
                const result = [];
                for (let i = 0; i < arr.length; i++) {
                    const rest = [...arr.slice(0, i), ...arr.slice(i + 1)];
                    const perms = generatePermutations(rest);
                    for (const perm of perms) {
                        result.push([arr[i], ...perm]);
                    }
                }
                return result;
            };
            const elements = generatePermutations(Array.from({ length: n }, (_, i) => i));
            return {
                contains: (element) => elements.some((perm) => $(perm) === $(element)),
                elements: elements,
                id: `S${n}`
            };
        };
        abal.set = (set) => {
            const elements = Chalkboard.stat.unique(set);
            return {
                contains: (element) => elements.some((x) => $(x) === $(element)),
                elements: elements
            };
        };
        abal.symmetricDifference = (set1, set2) => {
            const diffA = Chalkboard.abal.difference(set1, set2).elements || [];
            const diffB = Chalkboard.abal.difference(set2, set1).elements || [];
            return Chalkboard.abal.set([...diffA, ...diffB]);
        };
        abal.toArray = (struc) => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to array.");
            }
            return [...result.elements];
        };
        abal.toMatrix = (struc, rows, cols = rows) => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to matrix.");
            }
            return Chalkboard.stat.toMatrix(result.elements, rows, cols);
        };
        abal.toObject = (struc) => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to object.");
            }
            return Chalkboard.stat.toObject(result.elements);
        };
        abal.toString = (struc) => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to string.");
            }
            return Chalkboard.stat.toString(result.elements);
        };
        abal.toTensor = (struc, ...size) => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to tensor.");
            }
            if (Array.isArray(size[0]))
                size = size[0];
            return Chalkboard.tens.resize(result.elements, ...size);
        };
        abal.toTypedArray = (struc, type = "float32") => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to typed array.");
            }
            const arr = Chalkboard.abal.toArray(result);
            if (type === "int8") {
                return new Int8Array(arr);
            }
            else if (type === "int16") {
                return new Int16Array(arr);
            }
            else if (type === "int32") {
                return new Int32Array(arr);
            }
            else if (type === "float32") {
                return new Float32Array(arr);
            }
            else if (type === "float64") {
                return new Float64Array(arr);
            }
            else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };
        abal.toVector = (struc, dimension, index = 0) => {
            const elements = "set" in struc ? struc.set.elements : struc.elements;
            if (!elements) {
                throw new Error("Cannot convert infinite set to vector.");
            }
            if (dimension === 2) {
                return Chalkboard.vect.init(elements[index], elements[index + 1]);
            }
            else if (dimension === 3) {
                return Chalkboard.vect.init(elements[index], elements[index + 1], elements[index + 2]);
            }
            else if (dimension === 4) {
                return Chalkboard.vect.init(elements[index], elements[index + 1], elements[index + 2], elements[index + 3]);
            }
            else {
                throw new RangeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };
        abal.union = (set1, set2) => {
            const result = Array.from(new Set([...(set1.elements || []), ...(set2.elements || [])]));
            return Chalkboard.abal.set(result);
        };
        abal.Z = (n) => {
            if (n === undefined) {
                return {
                    contains: (element) => Number.isInteger(element),
                    id: "Z"
                };
            }
            else {
                if (!Number.isInteger(n) || n <= 0) {
                    throw new Error('The modulus "n" must be a positive integer.');
                }
                return {
                    contains: (element) => Number.isInteger(element) && element >= 0 && element < n,
                    elements: Array.from({ length: n }, (_, i) => i),
                    id: `Z${n}`
                };
            }
        };
    })(abal = Chalkboard.abal || (Chalkboard.abal = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let bool;
    (function (bool) {
        const $ = (x) => mode === "boolean" ? x : (x ? 1 : 0);
        bool.AND = (...vals) => {
            let result = true;
            for (let i = 0; i < vals.length; i++) {
                const current = vals[i] === true || vals[i] === 1;
                if (!current) {
                    result = false;
                    break;
                }
            }
            return $(result);
        };
        bool.BICOND = (...vals) => {
            if (vals.length === 0)
                return $(true);
            const first = (vals[0] === true || vals[0] === 1);
            for (let i = 1; i < vals.length; i++) {
                const current = (vals[i] === true || vals[i] === 1);
                if (first !== current)
                    return $(false);
            }
            return $(true);
        };
        bool.COND = (...vals) => {
            if (vals.length < 2)
                return $(true);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (xp && !xq)
                    return $(false);
            }
            return $(true);
        };
        bool.CONV = (...vals) => {
            if (vals.length < 2)
                return $(true);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (xq && !xp)
                    return $(false);
            }
            return $(true);
        };
        bool.isEqual = (expr1, expr2) => {
            const variables = [];
            const varextract = (expr) => {
                const ast = Chalkboard.bool.parse(expr, { returnAST: true });
                const traverse = (node) => {
                    if (node.type === "var" && !variables.includes(node.name)) {
                        variables.push(node.name);
                    }
                    else if (node.type === "not") {
                        traverse(node.expr);
                    }
                    else if (node.type === "and" || node.type === "or") {
                        traverse(node.left);
                        traverse(node.right);
                    }
                };
                traverse(ast);
            };
            varextract(expr1);
            varextract(expr2);
            const generateAssignments = (vars, index = 0, current = {}) => {
                if (index >= vars.length)
                    return [current];
                const withTrue = { ...current, [vars[index]]: true };
                const withFalse = { ...current, [vars[index]]: false };
                return [...generateAssignments(vars, index + 1, withTrue), ...generateAssignments(vars, index + 1, withFalse)];
            };
            const assignments = generateAssignments(variables);
            for (const values of assignments) {
                const result1 = Chalkboard.bool.parse(expr1, { values });
                const result2 = Chalkboard.bool.parse(expr2, { values });
                if (result1 !== result2)
                    return $(false);
            }
            return $(true);
        };
        bool.Karnaugh = (input, variables) => {
            const n = variables.length;
            if (n !== 2 && n !== 3 && n !== 4) {
                throw new Error("Chalkboard.bool.Karnaugh only supports 2, 3, or 4 variables.");
            }
            let rowvars;
            let colvars;
            let rows;
            let cols;
            const grayCodes = (bits) => {
                if (bits === 0)
                    return [""];
                const prev = grayCodes(bits - 1);
                const result = [];
                for (let code of prev) {
                    result.push("0" + code);
                }
                for (let code of prev.slice().reverse()) {
                    result.push("1" + code);
                }
                return result;
            };
            if (n === 2) {
                rowvars = [variables[0]];
                colvars = [variables[1]];
                rows = grayCodes(1);
                cols = grayCodes(1);
            }
            else if (n === 3) {
                rowvars = [variables[0]];
                colvars = variables.slice(1);
                rows = grayCodes(1);
                cols = grayCodes(2);
            }
            else {
                rowvars = variables.slice(0, 2);
                colvars = variables.slice(2);
                rows = grayCodes(2);
                cols = grayCodes(2);
            }
            const result = [];
            for (let r of rows) {
                const row = [];
                for (let c of cols) {
                    const values = {};
                    for (let i = 0; i < rowvars.length; i++) {
                        values[rowvars[i]] = r[i] === "1";
                    }
                    for (let j = 0; j < colvars.length; j++) {
                        values[colvars[j]] = c[j] === "1";
                    }
                    const parsed = Chalkboard.bool.parse(input, { values });
                    const booled = parsed === true || parsed === 1;
                    row.push($(booled));
                }
                result.push(row);
            }
            return result;
        };
        bool.mapping = (inputs, outputs) => {
            if (inputs.length !== outputs.length) {
                throw new Error('Parameter "inputs" and "outputs" must have the same length.');
            }
            if (inputs.length === 0) {
                throw new Error('Parameter "inputs" and "outputs" cannot be empty.');
            }
            const m = inputs[0].length;
            const n = outputs[0].length;
            for (const row of inputs) {
                if (row.length !== m) {
                    throw new Error('Parameter "inputs" must have the same length for each row.');
                }
            }
            for (const row of outputs) {
                if (row.length !== n) {
                    throw new Error('Parameter "outputs" must have the same length for each row.');
                }
            }
            const variables = Array.from({ length: m }, (_, i) => String.fromCharCode(97 + i));
            const expressions = [];
            for (let outCol = 0; outCol < n; outCol++) {
                const trueRows = [];
                for (let row = 0; row < inputs.length; row++) {
                    if (outputs[row][outCol] === true || outputs[row][outCol] === 1) {
                        trueRows.push(row);
                    }
                }
                if (trueRows.length === 0) {
                    expressions.push("false");
                    continue;
                }
                if (trueRows.length === inputs.length) {
                    expressions.push("true");
                    continue;
                }
                const terms = [];
                for (const row of trueRows) {
                    const literals = [];
                    for (let i = 0; i < m; i++) {
                        const value = inputs[row][i] === true || inputs[row][i] === 1;
                        literals.push(value ? variables[i] : `!${variables[i]}`);
                    }
                    terms.push(`(${literals.join(" & ")})`);
                }
                const expr = terms.join(" | ");
                if (m <= 4) {
                    expressions.push(Chalkboard.bool.minimize(expr, variables));
                }
                else {
                    expressions.push(expr);
                }
            }
            return (...args) => {
                if (args.length !== m) {
                    throw new Error(`Expected ${m} arguments, but got ${args.length}.`);
                }
                const values = {};
                for (let i = 0; i < m; i++) {
                    values[variables[i]] = args[i];
                }
                return expressions.map((expr) => {
                    const parsed = Chalkboard.bool.parse(expr, { values });
                    const booled = parsed === true || parsed === 1;
                    return $(booled);
                });
            };
        };
        bool.minimize = (input, variables) => {
            if (variables.length === 0) {
                const result = Chalkboard.bool.parse(input);
                return result ? "true" : "false";
            }
            if (variables.length !== 2 && variables.length !== 3 && variables.length !== 4) {
                throw new Error("Chalkboard.bool.minimize only supports 2, 3, or 4 variables.");
            }
            try {
                const primes = Chalkboard.bool.primeImplicants(input, variables);
                if (primes.length === 0) {
                    return "false";
                }
                if (primes.some((term) => term === "true")) {
                    return "true";
                }
                return Chalkboard.bool.parse(primes.join(" | "));
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(`Error minimizing expression: ${e.message}`);
                }
                else {
                    throw new Error(`Error minimizing expression: ${String(e)}`);
                }
            }
        };
        let mode = "boolean";
        bool.modeConfig = (config) => {
            const _config = config.toLowerCase();
            if (_config !== "boolean" && _config !== "binary") {
                throw new Error('The mode must be either "boolean" or "binary".');
            }
            mode = _config;
        };
        bool.NAND = (...vals) => {
            const andResult = bool.AND(...vals);
            return $(!(andResult === true || andResult === 1));
        };
        bool.NBICOND = (...vals) => {
            const bicondResult = bool.BICOND(...vals);
            return $(!(bicondResult === true || bicondResult === 1));
        };
        bool.NCOND = (...vals) => {
            if (vals.length < 2)
                return $(false);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (!(xp && !xq))
                    return $(false);
            }
            return $(true);
        };
        bool.NCONV = (...vals) => {
            if (vals.length < 2)
                return $(false);
            for (let i = 0; i < vals.length - 1; i++) {
                const xp = (vals[i] === true || vals[i] === 1);
                const xq = (vals[i + 1] === true || vals[i + 1] === 1);
                if (!(xq && !xp))
                    return $(false);
            }
            return $(true);
        };
        bool.NOR = (...vals) => {
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                if (x)
                    return $(false);
            }
            return $(true);
        };
        bool.NOT = (...vals) => {
            if (vals.length === 0)
                return $(true);
            let result = true;
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                result = result && !x;
            }
            return $(result);
        };
        bool.OR = (...vals) => {
            let result = false;
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                if (x) {
                    result = true;
                    break;
                }
            }
            return $(result);
        };
        bool.parse = (expr, config = { returnAST: false, returnJSON: false, returnLaTeX: false }) => {
            const tokenize = (input) => {
                const tokens = [];
                let i = 0;
                while (i < input.length) {
                    const ch = input[i];
                    if (/\s/.test(ch)) {
                        i++;
                        continue;
                    }
                    if ("!&|()".indexOf(ch) !== -1) {
                        tokens.push(ch);
                        i++;
                    }
                    else {
                        let name = "";
                        while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
                            name += input[i++];
                        }
                        tokens.push(name);
                    }
                }
                return tokens;
            };
            const parseTokens = (tokens) => {
                let pos = 0;
                const peek = () => tokens[pos];
                const consume = (token) => {
                    if (token && tokens[pos] !== token) {
                        throw new Error(`Expected token ${token} but found ${tokens[pos]}`);
                    }
                    return tokens[pos++];
                };
                const parseExpression = () => parseOr();
                const parseOr = () => {
                    let node = parseAnd();
                    while (peek() === "|") {
                        consume("|");
                        node = { type: "or", left: node, right: parseAnd() };
                    }
                    return node;
                };
                const parseAnd = () => {
                    let node = parseNot();
                    while (peek() === "&") {
                        consume("&");
                        node = { type: "and", left: node, right: parseNot() };
                    }
                    return node;
                };
                const parseNot = () => {
                    if (peek() === "!") {
                        consume("!");
                        return { type: "not", expr: parseNot() };
                    }
                    return parsePrimary();
                };
                const parsePrimary = () => {
                    const token = peek();
                    if (token === "(") {
                        consume("(");
                        const node = parseExpression();
                        consume(")");
                        return node;
                    }
                    if (token === "true") {
                        consume();
                        return { type: "bool", value: true };
                    }
                    if (token === "false") {
                        consume();
                        return { type: "bool", value: false };
                    }
                    consume();
                    return { type: "var", name: token };
                };
                const ast = parseExpression();
                if (pos < tokens.length)
                    throw new Error("Unexpected tokens at end");
                return ast;
            };
            const nodeEqual = (a, b) => {
                if (a.type !== b.type)
                    return false;
                switch (a.type) {
                    case "bool": {
                        return a.value === b.value;
                    }
                    case "var": {
                        return a.name === b.name;
                    }
                    case "not": {
                        return nodeEqual(a.expr, b.expr);
                    }
                    case "and": {
                        return nodeEqual(a.left, b.left) && nodeEqual(a.right, b.right);
                    }
                    case "or": {
                        return nodeEqual(a.left, b.left) && nodeEqual(a.right, b.right);
                    }
                }
                return false;
            };
            const nodeToString = (node) => {
                switch (node.type) {
                    case "bool": {
                        return node.value ? "true" : "false";
                    }
                    case "var": {
                        return node.name;
                    }
                    case "not": {
                        const inner = node.expr.type === "var" ? nodeToString(node.expr) : `(${nodeToString(node.expr)})`;
                        return `!${inner}`;
                    }
                    case "and": {
                        const leftAnd = node.left.type === "or" ? `(${nodeToString(node.left)})` : nodeToString(node.left);
                        const rightAnd = node.right.type === "or" ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${leftAnd} & ${rightAnd}`;
                    }
                    case "or": {
                        return `${nodeToString(node.left)} | ${nodeToString(node.right)}`;
                    }
                }
                return "";
            };
            const nodeToLaTeX = (node) => {
                switch (node.type) {
                    case "bool": {
                        return node.value ? "1" : "0";
                    }
                    case "var": {
                        return node.name;
                    }
                    case "not": {
                        const inner = (node.expr.type === "var" || node.expr.type === "bool") ? nodeToLaTeX(node.expr) : `\\left(${nodeToLaTeX(node.expr)}\\right)`;
                        return `\\neg ${inner}`;
                    }
                    case "and": {
                        const left = node.left.type === "or" ? `\\left(${nodeToLaTeX(node.left)}\\right)` : nodeToLaTeX(node.left);
                        const right = node.right.type === "or" ? `\\left(${nodeToLaTeX(node.right)}\\right)` : nodeToLaTeX(node.right);
                        return `${left} \\land ${right}`;
                    }
                    case "or": {
                        const left = node.left.type === "and" ? `\\left(${nodeToLaTeX(node.left)}\\right)` : nodeToLaTeX(node.left);
                        const right = node.right.type === "and" ? `\\left(${nodeToLaTeX(node.right)}\\right)` : nodeToLaTeX(node.right);
                        return `${left} \\lor ${right}`;
                    }
                    default: {
                        throw new Error(`Chalkboard.bool.parse: Unknown node type ${node.type}`);
                    }
                }
            };
            const getAndFactors = (node) => {
                if (node.type === "and")
                    return [...getAndFactors(node.left), ...getAndFactors(node.right)];
                return [node];
            };
            const detectTautology = (left, right) => {
                if (left.type === "not" && right.type === "var" && nodeEqual(left.expr, right))
                    return true;
                if (right.type === "not" && left.type === "var" && nodeEqual(right.expr, left))
                    return true;
                return false;
            };
            const simplifyOrNode = (node) => {
                if (node.type !== "or")
                    return node;
                const left = simplifyNode(node.left);
                const right = simplifyNode(node.right);
                if (detectTautology(left, right))
                    return { type: "bool", value: true };
                if (left.type === "bool" && left.value === true)
                    return { type: "bool", value: true };
                if (right.type === "bool" && right.value === true)
                    return { type: "bool", value: true };
                if (left.type === "bool" && left.value === false)
                    return right;
                if (right.type === "bool" && right.value === false)
                    return left;
                const leftFactors = left.type === "and" ? getAndFactors(left) : [left];
                const rightFactors = right.type === "and" ? getAndFactors(right) : [right];
                const commons = [];
                leftFactors.forEach((fa) => {
                    if (rightFactors.some((fb) => nodeEqual(fa, fb)) && !commons.some((c) => nodeEqual(c, fa))) {
                        commons.push(fa);
                    }
                });
                const leftRemainder = leftFactors.filter((f) => !commons.some((c) => nodeEqual(c, f)));
                const rightRemainder = rightFactors.filter((f) => !commons.some((c) => nodeEqual(c, f)));
                if (leftRemainder.length === 1 && rightRemainder.length === 1 && detectTautology(leftRemainder[0], rightRemainder[0]))
                    return commons.length === 0 ? { type: "bool", value: true } : commons.reduce((acc, cur) => ({ type: "and", left: acc, right: cur }));
                if (commons.length > 0) {
                    const removeCommon = (factors) => {
                        const remaining = factors.filter((f) => !commons.some(c => nodeEqual(c, f)));
                        if (remaining.length === 0)
                            return { type: "bool", value: true };
                        if (remaining.length === 1)
                            return remaining[0];
                        return remaining.reduce((acc, cur) => ({ type: "and", left: acc, right: cur }));
                    };
                    const newLeft = removeCommon(leftFactors);
                    const newRight = removeCommon(rightFactors);
                    let combined;
                    if ((newLeft.type === "bool" && newLeft.value === true) || (newRight.type === "bool" && newRight.value === true)) {
                        combined = { type: "bool", value: true };
                    }
                    else {
                        combined = { type: "or", left: newLeft, right: newRight };
                    }
                    return commons.reduce((acc, cur) => ({ type: "and", left: acc, right: cur }), combined);
                }
                return { type: "or", left, right };
            };
            const simplifyNode = (node) => {
                switch (node.type) {
                    case "bool": {
                        return node;
                    }
                    case "var": {
                        return node;
                    }
                    case "not": {
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "not")
                            return simplifyNode(expr.expr);
                        if (expr.type === "bool")
                            return { type: "bool", value: !expr.value };
                        return { type: "not", expr };
                    }
                    case "and": {
                        const left = simplifyNode(node.left);
                        const right = simplifyNode(node.right);
                        if ((left.type === "bool" && left.value === false) || (right.type === "bool" && right.value === false))
                            return { type: "bool", value: false };
                        if (left.type === "bool" && left.value === true)
                            return right;
                        if (right.type === "bool" && right.value === true)
                            return left;
                        if (nodeEqual(left, right))
                            return left;
                        if ((left.type === "not" && nodeEqual(left.expr, right)) || (right.type === "not" && nodeEqual(right.expr, left)))
                            return { type: "bool", value: false };
                        return { type: "and", left, right };
                    }
                    case "or": {
                        return simplifyOrNode(node);
                    }
                }
                return node;
            };
            const evaluateNode = (node, values) => {
                switch (node.type) {
                    case "bool": {
                        return node.value;
                    }
                    case "var": {
                        const varname = node.name;
                        if (!(varname in values))
                            throw new Error(`Variable "${varname}" not defined in values`);
                        const value = values[varname];
                        return value === true || value === 1;
                    }
                    case "not": {
                        return !evaluateNode(node.expr, values);
                    }
                    case "and": {
                        return evaluateNode(node.left, values) && evaluateNode(node.right, values);
                    }
                    case "or": {
                        return evaluateNode(node.left, values) || evaluateNode(node.right, values);
                    }
                }
                throw new Error(`Unknown node type: ${node.type}`);
            };
            try {
                const tokens = tokenize(expr);
                const ast = parseTokens(tokens);
                if (config.returnAST)
                    return ast;
                if (config.returnJSON)
                    return JSON.stringify(ast);
                if (config.values && Object.keys(config.values).length > 0)
                    return $(evaluateNode(ast, config.values));
                let simplified = simplifyNode(ast);
                let normalizedast = parseTokens(tokenize(nodeToString(simplified)));
                simplified = simplifyNode(normalizedast);
                simplified = simplifyNode(simplified);
                if (config.returnLaTeX)
                    return nodeToLaTeX(simplified);
                return nodeToString(simplified);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Error parsing expression: ${err.message}`);
                }
                else {
                    throw new Error(`Error parsing expression: ${String(err)}`);
                }
            }
        };
        bool.primeImplicants = (input, variables) => {
            if (variables.length !== 2 && variables.length !== 3 && variables.length !== 4) {
                throw new Error("Chalkboard.bool.primeImplicants only supports 2, 3, or 4 variables.");
            }
            const kmap = Chalkboard.bool.Karnaugh(input, variables);
            const grayCodes = (bits) => {
                if (bits === 0)
                    return [""];
                const prev = grayCodes(bits - 1);
                const result = [];
                for (let code of prev) {
                    result.push("0" + code);
                }
                for (let code of prev.slice().reverse()) {
                    result.push("1" + code);
                }
                return result;
            };
            let rowbits, colbits;
            let rowvars, colvars;
            if (variables.length === 2) {
                rowbits = 1;
                colbits = 1;
                rowvars = [variables[0]];
                colvars = [variables[1]];
            }
            else if (variables.length === 3) {
                rowbits = 1;
                colbits = 2;
                rowvars = [variables[0]];
                colvars = variables.slice(1);
            }
            else {
                rowbits = 2;
                colbits = 2;
                rowvars = variables.slice(0, 2);
                colvars = variables.slice(2);
            }
            const rows = grayCodes(rowbits);
            const cols = grayCodes(colbits);
            const cells = [];
            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < cols.length; j++) {
                    if (kmap[i][j] === true || kmap[i][j] === 1) {
                        cells.push({ row: i, col: j, rowcode: rows[i], colcode: cols[j] });
                    }
                }
            }
            const isAdjacent = (c1, c2) => {
                const rowdiff = c1.row === rows.length - 1 && c2.row === 0 || c2.row === rows.length - 1 && c1.row === 0 ? 1 : Math.abs(c1.row - c2.row);
                const coldiff = c1.col === cols.length - 1 && c2.col === 0 || c2.col === cols.length - 1 && c1.col === 0 ? 1 : Math.abs(c1.col - c2.col);
                return (rowdiff === 1 && coldiff === 0) || (rowdiff === 0 && coldiff === 1);
            };
            const isGroup = (groupcells) => {
                const size = groupcells.length;
                if ((size & (size - 1)) !== 0)
                    return false;
                if (size === 1)
                    return true;
                const uniquerows = new Set(groupcells.map((c) => c.row)).size;
                const uniquecols = new Set(groupcells.map((c) => c.col)).size;
                const rowswrap = groupcells.some(c => c.row === 0) && groupcells.some(c => c.row === rows.length - 1);
                const colswrap = groupcells.some(c => c.col === 0) && groupcells.some(c => c.col === cols.length - 1);
                const effectiverows = rowswrap ? 1 : uniquerows;
                const effectivecols = colswrap ? 1 : uniquecols;
                const isRectangle = (size === effectiverows * effectivecols) && (size === 1 || size === 2 || size === 4 || size === 8 || size === 16);
                if (!isRectangle)
                    return false;
                const visited = new Set();
                const queue = [groupcells[0]];
                visited.add(`${groupcells[0].row},${groupcells[0].col}`);
                while (queue.length > 0) {
                    const current = queue.shift();
                    for (const neighbor of groupcells) {
                        const key = `${neighbor.row},${neighbor.col}`;
                        if (!visited.has(key) && isAdjacent(current, neighbor)) {
                            visited.add(key);
                            queue.push(neighbor);
                        }
                    }
                }
                return visited.size === size;
            };
            const generateGroups = () => {
                const groups = [];
                const maxsize = Chalkboard.stat.min([16, Chalkboard.real.pow(2, variables.length)]);
                for (const cell of cells) {
                    groups.push({
                        cells: [cell],
                        size: 1,
                        term: ""
                    });
                }
                for (let size = 2; size <= maxsize; size *= 2) {
                    const prevgroups = groups.filter((g) => g.size === size / 2);
                    for (let i = 0; i < prevgroups.length; i++) {
                        for (let j = i + 1; j < prevgroups.length; j++) {
                            const group1 = prevgroups[i];
                            const group2 = prevgroups[j];
                            const merged = [...group1.cells, ...group2.cells];
                            const unique = new Set(merged.map((c) => `${c.row},${c.col}`));
                            if (unique.size === size && isGroup(merged)) {
                                groups.push({
                                    cells: merged,
                                    size: size,
                                    term: ""
                                });
                            }
                        }
                    }
                }
                return groups;
            };
            const groups = generateGroups();
            const primes = [];
            groups.sort((a, b) => b.size - a.size);
            const covered = new Set();
            for (const group of groups) {
                const uncovered = group.cells.some((cell) => !covered.has(`${cell.row},${cell.col}`));
                if (uncovered) {
                    primes.push(group);
                    group.cells.forEach((cell) => covered.add(`${cell.row},${cell.col}`));
                }
            }
            primes.forEach((group) => {
                const constants = {};
                variables.forEach((variable) => {
                    constants[variable] = true;
                });
                for (let i = 0; i < rowvars.length; i++) {
                    const varname = rowvars[i];
                    const values = new Set(group.cells.map((c) => c.rowcode[i]));
                    if (values.size > 1) {
                        constants[varname] = false;
                    }
                }
                for (let i = 0; i < colvars.length; i++) {
                    const varname = colvars[i];
                    const values = new Set(group.cells.map((c) => c.colcode[i]));
                    if (values.size > 1) {
                        constants[varname] = false;
                    }
                }
                const terms = [];
                for (const [varname, isConstant] of Object.entries(constants)) {
                    if (isConstant) {
                        const sampleCell = group.cells[0];
                        let value;
                        const rowindex = rowvars.indexOf(varname);
                        if (rowindex >= 0) {
                            value = sampleCell.rowcode[rowindex] === '1';
                        }
                        else {
                            const colindex = colvars.indexOf(varname);
                            value = sampleCell.colcode[colindex] === '1';
                        }
                        terms.push(value ? varname : `!${varname}`);
                    }
                }
                group.term = terms.length > 0 ? terms.join(" & ") : "true";
            });
            return primes.map((group) => group.term);
        };
        bool.toCNF = (input) => {
            const simplified = Chalkboard.bool.parse(input);
            if (simplified.includes(" & ") && !simplified.includes(" | ")) {
                return simplified;
            }
            const ast = Chalkboard.bool.parse(input, { returnAST: true });
            const convertToCNF = (node) => {
                switch (node.type) {
                    case "bool":
                    case "var":
                        return node;
                    case "not":
                        if (node.expr.type === "not") {
                            return convertToCNF(node.expr.expr);
                        }
                        else if (node.expr.type === "and") {
                            return convertToCNF({
                                type: "or",
                                left: { type: "not", expr: node.expr.left },
                                right: { type: "not", expr: node.expr.right }
                            });
                        }
                        else if (node.expr.type === "or") {
                            return convertToCNF({
                                type: "and",
                                left: { type: "not", expr: node.expr.left },
                                right: { type: "not", expr: node.expr.right }
                            });
                        }
                        return { type: "not", expr: convertToCNF(node.expr) };
                    case "and":
                        const leftCNF = convertToCNF(node.left);
                        const rightCNF = convertToCNF(node.right);
                        return { type: "and", left: leftCNF, right: rightCNF };
                    case "or":
                        const left = convertToCNF(node.left);
                        const right = convertToCNF(node.right);
                        if (right.type === "and") {
                            return convertToCNF({
                                type: "and",
                                left: { type: "or", left, right: right.left },
                                right: { type: "or", left, right: right.right }
                            });
                        }
                        if (left.type === "and") {
                            return convertToCNF({
                                type: "and",
                                left: { type: "or", left: left.left, right },
                                right: { type: "or", left: left.right, right }
                            });
                        }
                        return { type: "or", left, right };
                }
                return node;
            };
            const cnfAST = convertToCNF(ast);
            const nodeToString = (node) => {
                switch (node.type) {
                    case "bool":
                        return node.value ? "true" : "false";
                    case "var":
                        return node.name;
                    case "not":
                        const innerExpr = node.expr.type === "var" ?
                            nodeToString(node.expr) :
                            `(${nodeToString(node.expr)})`;
                        return `!${innerExpr}`;
                    case "and":
                        return `${nodeToString(node.left)} & ${nodeToString(node.right)}`;
                    case "or":
                        return `(${nodeToString(node.left)} | ${nodeToString(node.right)})`;
                }
                return "";
            };
            return nodeToString(cnfAST);
        };
        bool.toDNF = (input) => {
            const simplified = Chalkboard.bool.parse(input);
            if (simplified.includes(" | ") && !simplified.includes(" & ")) {
                return simplified;
            }
            const ast = Chalkboard.bool.parse(input, { returnAST: true });
            const convertToDNF = (node) => {
                switch (node.type) {
                    case "bool":
                    case "var":
                        return node;
                    case "not":
                        if (node.expr.type === "not") {
                            return convertToDNF(node.expr.expr);
                        }
                        else if (node.expr.type === "and") {
                            return convertToDNF({
                                type: "or",
                                left: { type: "not", expr: node.expr.left },
                                right: { type: "not", expr: node.expr.right }
                            });
                        }
                        else if (node.expr.type === "or") {
                            return convertToDNF({
                                type: "and",
                                left: { type: "not", expr: node.expr.left },
                                right: { type: "not", expr: node.expr.right }
                            });
                        }
                        return { type: "not", expr: convertToDNF(node.expr) };
                    case "or":
                        const leftDNF = convertToDNF(node.left);
                        const rightDNF = convertToDNF(node.right);
                        return { type: "or", left: leftDNF, right: rightDNF };
                    case "and":
                        const left = convertToDNF(node.left);
                        const right = convertToDNF(node.right);
                        if (right.type === "or") {
                            return convertToDNF({
                                type: "or",
                                left: { type: "and", left, right: right.left },
                                right: { type: "and", left, right: right.right }
                            });
                        }
                        if (left.type === "or") {
                            return convertToDNF({
                                type: "or",
                                left: { type: "and", left: left.left, right },
                                right: { type: "and", left: left.right, right }
                            });
                        }
                        return { type: "and", left, right };
                }
                return node;
            };
            const dnfAST = convertToDNF(ast);
            const nodeToString = (node) => {
                switch (node.type) {
                    case "bool":
                        return node.value ? "true" : "false";
                    case "var":
                        return node.name;
                    case "not":
                        const innerExpr = node.expr.type === "var" ?
                            nodeToString(node.expr) :
                            `(${nodeToString(node.expr)})`;
                        return `!${innerExpr}`;
                    case "and":
                        const leftAnd = nodeToString(node.left);
                        const rightAnd = nodeToString(node.right);
                        return `(${leftAnd} & ${rightAnd})`;
                    case "or":
                        return `${nodeToString(node.left)} | ${nodeToString(node.right)}`;
                }
                return "";
            };
            return nodeToString(dnfAST);
        };
        bool.truthTable = (...operations) => {
            const result = [];
            const inputs = [false, true];
            for (let p of inputs) {
                for (let q of inputs) {
                    const row = [$(p === true), $(q === true)];
                    for (let op of operations) {
                        const result = op(p, q);
                        row.push((result === true || result === 1 ? $(true) : $(false)));
                    }
                    result.push(row);
                }
            }
            return result;
        };
        bool.XOR = (...vals) => {
            let count = 0;
            for (let i = 0; i < vals.length; i++) {
                const x = (vals[i] === true || vals[i] === 1);
                if (x)
                    count++;
            }
            return $(count % 2 === 1);
        };
    })(bool = Chalkboard.bool || (Chalkboard.bool = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let calc;
    (function (calc) {
        calc.autocorrelation = (func, val) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.autocorrelation: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            return Chalkboard.calc.correlation(func, func, val);
        };
        calc.binormal = (func, val) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.calc.binormal: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("curve")) {
                return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
            }
            throw new TypeError("Chalkboard.real.binormal: Property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
        };
        calc.convolution = (func1, func2, val) => {
            if (func1.field !== "real" || func2.field !== "real" || func1.type !== "scalar2d" || func2.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.convolution: Properties 'field' of 'func1' and 'func2' must be 'real' and properties 'type' of 'func1' and 'func2' must be 'scalar2d'.");
            const f1 = func1.rule;
            const f2 = func2.rule;
            const g = (x) => f1(x) * f2(val - x);
            return Chalkboard.calc.fxdx(Chalkboard.real.define(g), -100, 100);
        };
        calc.correlation = (func1, func2, val) => {
            if (func1.field !== "real" || func2.field !== "real" || func1.type !== "scalar2d" || func2.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.correlation: Properties 'field' of 'func1' and 'func2' must be 'real' and properties 'type' of 'func1' and 'func2' must be 'scalar2d'.");
            const f1 = func1.rule;
            const f2 = func2.rule;
            const g = (x) => f1(x) * f2(val + x);
            return Chalkboard.calc.fxdx(Chalkboard.real.define(g), -100, 100);
        };
        calc.curl = (vectfield, vect) => {
            if (vectfield.field !== "real")
                throw new TypeError("Chalkboard.calc.curl: Property 'field' of 'vectfield' must be 'real'.");
            const f = vectfield.rule;
            const v = vect;
            const h = 0.000000001;
            if (vectfield.type === "vector2d") {
                const dpdy = (f[0](v.x, v.y + h) - f[0](v.x, v.y)) / h;
                const dqdx = (f[1](v.x + h, v.y) - f[1](v.x, v.y)) / h;
                return Chalkboard.vect.init(0, 0, dqdx - dpdy);
            }
            else if (vectfield.type === "vector3d") {
                const dpdy = (f[0](v.x, v.y + h, v.z) - f[0](v.x, v.y, v.z)) / h;
                const dpdz = (f[0](v.x, v.y, v.z + h) - f[0](v.x, v.y, v.z)) / h;
                const dqdx = (f[1](v.x + h, v.y, v.z) - f[1](v.x, v.y, v.z)) / h;
                const dqdz = (f[1](v.x, v.y, v.z + h) - f[1](v.x, v.y, v.z)) / h;
                const drdx = (f[2](v.x + h, v.y, v.z) - f[2](v.x, v.y, v.z)) / h;
                const drdy = (f[2](v.x, v.y + h, v.z) - f[2](v.x, v.y, v.z)) / h;
                return Chalkboard.vect.init(drdy - dqdz, dpdz - drdx, dqdx - dpdy);
            }
            throw new TypeError("Chalkboard.real.curl: Property 'type' of 'vectfield' must be 'vector2d' or 'vector3d'.");
        };
        calc.curvature = (func, val) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.calc.curvature: Property 'field' of 'func' must be 'real'.");
            if (func.type === "curve2d") {
                const d = Chalkboard.calc.dfdx(func, val);
                const d2 = Chalkboard.calc.d2fdx2(func, val);
                return Math.abs(d.x * d2.y - d.y * d2.x) / Math.sqrt((d.x * d.x + d.y * d.y) * (d.x * d.x + d.y * d.y) * (d.x * d.x + d.y * d.y));
            }
            else if (func.type === "curve3d") {
                return Chalkboard.vect.mag(Chalkboard.calc.normal(func, val)) / Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, val));
            }
            throw new TypeError("Chalkboard.real.curvature: Property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
        };
        calc.dfdv = (func, vectpos, vectdir) => {
            if (func.field !== "real")
                throw new TypeError('Chalkboard.calc.dfdv: Property "field" of "func" must be "real".');
            if (func.type === "scalar3d") {
                const grad = Chalkboard.calc.grad(func, vectpos);
                const dir = Chalkboard.vect.normalize(vectdir);
                return Chalkboard.vect.dot(grad, dir);
            }
            throw new TypeError("Chalkboard.real.dfdv: Property 'type' of 'func' must be 'scalar3d'.");
        };
        calc.dfdx = (func, val) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.calc.dfdx: Property 'field' of 'func' must be 'real'.");
            const h = 0.000000001;
            if (func.type === "scalar2d") {
                const f = func.rule;
                return (f(val + h) - f(val)) / h;
            }
            else if (func.type === "curve2d") {
                const f = func.rule;
                return Chalkboard.vect.init((f[0](val + h) - f[0](val)) / h, (f[1](val + h) - f[1](val)) / h);
            }
            else if (func.type === "curve3d") {
                const f = func.rule;
                return Chalkboard.vect.init((f[0](val + h) - f[0](val)) / h, (f[1](val + h) - f[1](val)) / h, (f[2](val + h) - f[2](val)) / h);
            }
            throw new TypeError("Chalkboard.real.dfdx: Property 'type' of 'func' must be 'scalar2d', 'curve2d', or 'curve3d'.");
        };
        calc.d2fdx2 = (func, val) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.calc.d2fdx2: Property 'field' of 'func' must be 'real'.");
            const h = 0.00001;
            if (func.type === "scalar2d") {
                const f = func.rule;
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            }
            else if (func.type === "curve2d") {
                const f = func.rule;
                return Chalkboard.vect.init((f[0](val + h) - 2 * f[0](val) + f[0](val - h)) / (h * h), (f[1](val + h) - 2 * f[1](val) + f[1](val - h)) / (h * h));
            }
            else if (func.type === "curve3d") {
                const f = func.rule;
                return Chalkboard.vect.init((f[0](val + h) - 2 * f[0](val) + f[0](val - h)) / (h * h), (f[1](val + h) - 2 * f[1](val) + f[1](val - h)) / (h * h), (f[2](val + h) - 2 * f[2](val) + f[2](val - h)) / (h * h));
            }
            throw new TypeError("Chalkboard.real.d2fdx2: Property 'type' of 'func' must be 'scalar2d', 'curve2d', or 'curve3d'.");
        };
        calc.dfdz = (func, comp) => {
            if (func.field !== "comp")
                throw new TypeError("Chalkboard.calc.dfdz: Property 'field' of 'func' must be 'comp'.");
            const h = 0.000000001;
            if (func.type === "vector2d") {
                const f = func.rule;
                const duda = (f[0](comp.a + h, comp.b) - f[0](comp.a, comp.b)) / h;
                const dudb = (f[0](comp.a, comp.b + h) - f[0](comp.a, comp.b)) / h;
                const dvda = (f[1](comp.a + h, comp.b) - f[1](comp.a, comp.b)) / h;
                const dvdb = (f[1](comp.a, comp.b + h) - f[1](comp.a, comp.b)) / h;
                return [Chalkboard.comp.init(duda, dvda), Chalkboard.comp.init(dudb, dvdb)];
            }
            throw new TypeError("Chalkboard.real.dfdz: Property 'type' of 'func' must be 'vector2d'.");
        };
        calc.d2fdz2 = (func, comp) => {
            if (func.field !== "comp")
                throw new TypeError("Chalkboard.calc.d2fdz2: Property 'field' of 'func' must be 'comp'.");
            const h = 0.00001;
            if (func.type === "vector2d") {
                const f = func.rule;
                const d2uda2 = (f[0](comp.a + h, comp.b) - 2 * f[0](comp.a, comp.b) + f[0](comp.a - h, comp.b)) / (h * h);
                const d2udb2 = (f[0](comp.a, comp.b + h) - 2 * f[0](comp.a, comp.b) + f[0](comp.a, comp.b - h)) / (h * h);
                const d2vda2 = (f[1](comp.a + h, comp.b) - 2 * f[1](comp.a, comp.b) + f[1](comp.a - h, comp.b)) / (h * h);
                const d2vdb2 = (f[1](comp.a, comp.b + h) - 2 * f[1](comp.a, comp.b) + f[1](comp.a, comp.b - h)) / (h * h);
                return [Chalkboard.comp.init(d2uda2, d2vda2), Chalkboard.comp.init(d2udb2, d2vdb2)];
            }
            throw new TypeError("Chalkboard.real.d2fdz2: Property 'type' of 'func' must be 'vector2d'.");
        };
        calc.dfrdt = (func1, func2, val) => {
            if (func1.field !== "real" || func2.field !== "real")
                throw new TypeError("Chalkboard.calc.dfrdt: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== "scalar3d")
                throw new TypeError("Chalkboard.calc.dfrdt: Property 'type' of 'func1' must be 'scalar3d'.");
            const g = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val));
            const d = Chalkboard.calc.dfdx(func2, val);
            if (func2.type === "curve2d") {
                return g.x * d.x + g.y * d.y;
            }
            else if (func2.type === "curve3d") {
                return g.x * d.x + g.y * d.y + g.z * d.z;
            }
            throw new TypeError("Chalkboard.calc.dfrdt: Property 'type' of 'func2' must be 'curve2d' or 'curve3d'.");
        };
        calc.dft = (arr) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.dft: Parameter 'arr' must be an array.");
            const N = arr.length;
            const out = new Array(N);
            for (let k = 0; k < N; k++) {
                let sumA = 0;
                let sumB = 0;
                for (let n = 0; n < N; n++) {
                    const v = arr[n];
                    const a = typeof v === "number" ? v : v.a;
                    const b = typeof v === "number" ? 0 : v.b;
                    const theta = Chalkboard.PI(2 * k * n) / N;
                    const c = Chalkboard.trig.cos(theta);
                    const s = Chalkboard.trig.sin(theta);
                    sumA += a * c + b * s;
                    sumB += b * c - a * s;
                }
                out[k] = Chalkboard.comp.init(sumA, sumB);
            }
            return out;
        };
        calc.div = (vectfield, vect) => {
            if (vectfield.field !== "real")
                throw new TypeError("Chalkboard.calc.div: Property 'field' of 'vectfield' must be 'real'.");
            if (vectfield.type === "vector2d" || vectfield.type === "vector3d" || vectfield.type === "vector4d") {
                return Chalkboard.matr.trace(Chalkboard.calc.grad(vectfield, vect));
            }
            throw new TypeError("Chalkboard.calc.div: Property 'type' of 'vectfield' must be 'vector2d', 'vector3d', or 'vector4d'.");
        };
        calc.extrema = (func, domain) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.extrema: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const result = [];
            for (let i = domain[0]; i <= domain[1]; i++) {
                if (Math.round(Chalkboard.calc.dfdx(func, i)) === 0) {
                    result.push(i);
                }
            }
            return result;
        };
        calc.fds = (func, tinf, tsup, sinf, ssup) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.calc.fds: Property 'field' of 'func' must be 'real'.");
            let result = 0;
            let drdt, drds;
            if (func.type === "curve2d" || func.type === "curve3d") {
                const dt = (tsup - tinf) / 10000;
                for (let t = tinf; t <= tsup; t += dt) {
                    drdt = Chalkboard.calc.dfdx(func, t);
                    result += Chalkboard.vect.mag(drdt);
                }
                return result * dt;
            }
            else if (func.type === "surface3d") {
                const dt = (tsup - tinf) / 100;
                const ds = (ssup - sinf) / 100;
                for (let s = sinf; s <= ssup; s += ds) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 1, 0);
                        result += Chalkboard.vect.mag(Chalkboard.vect.cross(drds, drdt));
                    }
                }
                return result * ds * dt;
            }
            throw new TypeError("Chalkboard.calc.fds: Property 'type' of 'func' must be 'curve2d', 'curve3d', or 'surface3d'.");
        };
        calc.fft = (arr) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.fft: Parameter 'arr' must be an array.");
            const N = arr.length;
            if (!Number.isInteger(N) || N <= 0)
                throw new TypeError("Chalkboard.calc.fft: Input length must be a positive integer.");
            if ((N & (N - 1)) !== 0)
                throw new TypeError("Chalkboard.calc.fft: Input length must be a power of two.");
            const re = new Array(N);
            const im = new Array(N);
            for (let i = 0; i < N; i++) {
                const v = arr[i];
                re[i] = typeof v === "number" ? v : v.a;
                im[i] = typeof v === "number" ? 0 : v.b;
            }
            let bits = 0;
            for (let t = N; t > 1; t >>= 1)
                bits++;
            for (let i = 0; i < N; i++) {
                let x = i;
                let j = 0;
                for (let b = 0; b < bits; b++) {
                    j = (j << 1) | (x & 1);
                    x >>= 1;
                }
                if (j > i) {
                    let tmp = re[i];
                    re[i] = re[j];
                    re[j] = tmp;
                    tmp = im[i];
                    im[i] = im[j];
                    im[j] = tmp;
                }
            }
            for (let len = 2; len <= N; len <<= 1) {
                const ang = Chalkboard.PI(-2) / len;
                const wLenCos = Chalkboard.trig.cos(ang);
                const wLenSin = Chalkboard.trig.sin(ang);
                for (let i = 0; i < N; i += len) {
                    let wCos = 1;
                    let wSin = 0;
                    const half = len >> 1;
                    for (let j = 0; j < half; j++) {
                        const uRe = re[i + j];
                        const uIm = im[i + j];
                        const vRe0 = re[i + j + half];
                        const vIm0 = im[i + j + half];
                        const vRe = vRe0 * wCos - vIm0 * wSin;
                        const vIm = vRe0 * wSin + vIm0 * wCos;
                        re[i + j] = uRe + vRe;
                        im[i + j] = uIm + vIm;
                        re[i + j + half] = uRe - vRe;
                        im[i + j + half] = uIm - vIm;
                        const nextCos = wCos * wLenCos - wSin * wLenSin;
                        const nextSin = wCos * wLenSin + wSin * wLenCos;
                        wCos = nextCos;
                        wSin = nextSin;
                    }
                }
            }
            const out = new Array(N);
            for (let i = 0; i < N; i++)
                out[i] = Chalkboard.comp.init(re[i], im[i]);
            return out;
        };
        calc.fftfreq = (n, d = 1) => {
            if (!Number.isInteger(n) || n <= 0)
                throw new TypeError("Chalkboard.calc.fftfreq: Parameter 'n' must be a positive integer.");
            if (typeof d !== "number" || !Number.isFinite(d) || d <= 0)
                throw new TypeError("Chalkboard.calc.fftfreq: Parameter 'd' must be a positive finite number.");
            const result = new Array(n);
            const scale = 1 / (n * d);
            if (n % 2 === 0) {
                const half = n / 2;
                for (let i = 0; i < n; i++) {
                    const k = i < half ? i : i - n;
                    result[i] = k * scale;
                }
            }
            else {
                const half = (n - 1) / 2;
                for (let i = 0; i < n; i++) {
                    const k = i <= half ? i : i - n;
                    result[i] = k * scale;
                }
            }
            return result;
        };
        calc.fftshift = (arr) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.fftshift: Parameter 'arr' must be an array.");
            const N = arr.length;
            if (N === 0)
                return [];
            const shift = Math.floor((N + 1) / 2);
            return arr.slice(shift).concat(arr.slice(0, shift));
        };
        calc.fnds = (vectfield, func, tinf, tsup, sinf, ssup) => {
            if (vectfield.field !== "real" || func.field !== "real")
                throw new TypeError("Chalkboard.calc.fnds: Properties 'field' of 'vectfield' and 'func' must be 'real'.");
            let result = 0;
            let drdt, drds;
            if (vectfield.type === "vector2d" && func.type === "curve2d") {
                const dt = (tsup - tinf) / 10000;
                for (let t = tinf; t <= tsup; t += dt) {
                    drdt = Chalkboard.calc.dfdx(func, t);
                    result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.vect.init(-drdt.y, drdt.x)) * Chalkboard.vect.mag(drdt);
                }
                return result * dt;
            }
            else if (vectfield.type === "vector3d" && func.type === "curve3d") {
                const dt = (tsup - tinf) / 10000;
                for (let t = tinf; t <= tsup; t += dt) {
                    drdt = Chalkboard.calc.dfdx(func, t);
                    result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.calc.normal(func, t)) * Chalkboard.vect.mag(drdt);
                }
                return result * dt;
            }
            else if (vectfield.type === "vector3d" && func.type === "surface3d") {
                const dt = (tsup - tinf) / 100;
                const ds = (ssup - sinf) / 100;
                for (let s = sinf; s <= ssup; s += ds) {
                    for (let t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 1, 0);
                        result += Chalkboard.vect.scalarTriple(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, Chalkboard.vect.init(s, t))), drds, drdt);
                    }
                }
                return result * ds * dt;
            }
            throw new TypeError("Chalkboard.calc.fnds: Property 'type' of 'vectfield' must be 'vector2d' or 'vector3d' and property 'type' of 'func' must be 'curve2d', 'curve3d', or 'surface3d'.");
        };
        calc.Fourier = (func, val, inf = 0, sup = 10, steps = 10000) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.Fourier: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule;
            if (!Number.isFinite(inf) || !Number.isFinite(sup) || !Number.isFinite(steps))
                throw new TypeError("Chalkboard.calc.Fourier: Parameters 'inf', 'sup', and 'steps' must be finite.");
            if (steps <= 0 || !Number.isInteger(steps))
                throw new TypeError("Chalkboard.calc.Fourier: Parameter 'steps' must be a positive integer.");
            if (sup === inf)
                return 0;
            const dx = (sup - inf) / steps;
            let sum = 0;
            for (let i = 0; i <= steps; i++) {
                const x = inf + i * dx;
                const w = (i === 0 || i === steps) ? 0.5 : 1;
                sum += w * (f(x) * Math.cos(val * x));
            }
            return (2 * sum * dx) / Chalkboard.PI();
        };
        calc.frds = (funcORvectfield, func, inf, sup) => {
            if (funcORvectfield.field !== "real" || func.field !== "real")
                throw new TypeError("Chalkboard.calc.frds: Properties 'field' of 'funcORvectfield' and 'func' must be 'real'.");
            const f = funcORvectfield.rule;
            if (func.type === "curve2d" || func.type === "curve3d") {
                let result = 0;
                const dt = (sup - inf) / 10000;
                if (funcORvectfield.type === "scalar2d") {
                    for (let t = inf; t <= sup; t += dt) {
                        const val = Chalkboard.real.val(func, t);
                        result += f(val.x, val.y) * Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                }
                else if (funcORvectfield.type === "vector2d") {
                    for (let t = inf; t <= sup; t += dt) {
                        const val = Chalkboard.real.val(func, t);
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(funcORvectfield, val), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                }
                else if (funcORvectfield.type === "vector3d") {
                    for (let t = inf; t <= sup; t += dt) {
                        const val = Chalkboard.real.val(func, t);
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(funcORvectfield, val), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                }
                throw new TypeError("Chalkboard.calc.frds: Property 'type' of 'funcORvectfield' must be 'scalar2d', 'vector2d', or 'vector3d'.");
            }
            throw new TypeError("Chalkboard.calc.frds: Property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
        };
        calc.fxdx = (func, inf, sup) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.calc.fxdx: Property 'field' of 'func' must be 'real'.");
            const integrate = (f, a, b, eps = 1e-6) => {
                const asq = (a, b, fa, fm, fb, whole, eps, depth) => {
                    const m = (a + b) / 2, h = (b - a) / 2;
                    const lm = (a + m) / 2, rm = (m + b) / 2;
                    const flm = f(lm), frm = f(rm);
                    const left = (h / 6) * (fa + 4 * flm + fm);
                    const right = (h / 6) * (fm + 4 * frm + fb);
                    const delta = left + right - whole;
                    if (depth >= 50 || Math.abs(delta) <= 15 * eps)
                        return left + right + delta / 15;
                    return asq(a, m, fa, flm, fm, left, eps / 2, depth + 1) + asq(m, b, fm, frm, fb, right, eps / 2, depth + 1);
                };
                const m = (a + b) / 2;
                const fa = f(a), fm = f(m), fb = f(b);
                const whole = ((b - a) / 6) * (fa + 4 * fm + fb);
                return asq(a, b, fa, fm, fb, whole, eps, 0);
            };
            if (func.type === "scalar2d") {
                const f = func.rule;
                return integrate(f, inf, sup);
            }
            else if (func.type === "curve2d") {
                const f = func.rule;
                return Chalkboard.vect.init(integrate(f[0], inf, sup), integrate(f[1], inf, sup));
            }
            else if (func.type === "curve3d") {
                const f = func.rule;
                return Chalkboard.vect.init(integrate(f[0], inf, sup), integrate(f[1], inf, sup), integrate(f[2], inf, sup));
            }
            throw new TypeError("Chalkboard.calc.fxdx: Property 'type' of 'func' must be 'scalar2d', 'curve2d', or 'curve3d'.");
        };
        calc.fxydxdy = (func, xinf, xsup, yinf, ysup) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.calc.fxydxdy: Property 'field' of 'func' must be 'real'.");
            if (func.type === "scalar3d") {
                const f = func.rule;
                const integrate = (g, a, b, eps) => {
                    const asq = (a, b, fa, fm, fb, whole, eps, depth) => {
                        const m = (a + b) / 2, h = (b - a) / 2;
                        const lm = (a + m) / 2, rm = (m + b) / 2;
                        const flm = g(lm), frm = g(rm);
                        const left = (h / 6) * (fa + 4 * flm + fm);
                        const right = (h / 6) * (fm + 4 * frm + fb);
                        const delta = left + right - whole;
                        if (depth >= 50 || Math.abs(delta) <= 15 * eps)
                            return left + right + delta / 15;
                        return asq(a, m, fa, flm, fm, left, eps / 2, depth + 1) + asq(m, b, fm, frm, fb, right, eps / 2, depth + 1);
                    };
                    const m = (a + b) / 2;
                    const fa = g(a), fm = g(m), fb = g(b);
                    const whole = ((b - a) / 6) * (fa + 4 * fm + fb);
                    return asq(a, b, fa, fm, fb, whole, eps, 0);
                };
                const g = (x) => integrate((y) => f(x, y), yinf, ysup, 1e-5);
                return integrate(g, xinf, xsup, 1e-5);
            }
            throw new TypeError("Chalkboard.calc.fxydxdy: Property 'type' of 'func' must be 'scalar3d'.");
        };
        calc.fzdz = (func1, func2, inf, sup) => {
            if (func1.field !== "comp" || func2.field !== "real")
                throw new TypeError("Chalkboard.calc.fzdz: Property 'field' of 'func1' must be 'comp' and property 'field' of 'func2' must be 'real'.");
            if (func1.type === "vector2d" && func2.type === "curve2d") {
                let result = Chalkboard.comp.init(0, 0);
                const dt = (sup - inf) / 10000;
                for (let t = inf; t <= sup; t += dt) {
                    const fz = Chalkboard.comp.val(func1, Chalkboard.vect.toComplex(Chalkboard.real.val(func2, t)));
                    const rt = Chalkboard.calc.dfdx(func2, t);
                    result = Chalkboard.comp.add(result, Chalkboard.comp.init(fz.a * rt.x - fz.b * rt.y, fz.b * rt.x + fz.a * rt.y));
                }
                return Chalkboard.comp.scl(result, dt);
            }
            throw new TypeError("Chalkboard.calc.fzdz: Property 'type' of 'func1' must be 'vector2d' and property 'type' of 'func2' must be 'curve2d'.");
        };
        calc.grad = (funcORvectfield, vect) => {
            if (funcORvectfield.field !== "real")
                throw new TypeError("Chalkboard.calc.grad: Property 'field' of 'funcORvectfield' must be 'real'.");
            const f = funcORvectfield.rule;
            const r = funcORvectfield.rule;
            const F = funcORvectfield.rule;
            const v = vect;
            const h = 0.000000001;
            if (funcORvectfield.type === "scalar3d") {
                const dfdx = (f(v.x + h, v.y) - f(v.x, v.y)) / h;
                const dfdy = (f(v.x, v.y + h) - f(v.x, v.y)) / h;
                return Chalkboard.vect.init(dfdx, dfdy);
            }
            else if (funcORvectfield.type === "surface3d") {
                const dxds = (r[0](v.x + h, v.y) - r[0](v.x, v.y)) / h;
                const dxdt = (r[0](v.x, v.y + h) - r[0](v.x, v.y)) / h;
                const dyds = (r[1](v.x + h, v.y) - r[1](v.x, v.y)) / h;
                const dydt = (r[1](v.x, v.y + h) - r[1](v.x, v.y)) / h;
                const dzds = (r[2](v.x + h, v.y) - r[2](v.x, v.y)) / h;
                const dzdt = (r[2](v.x, v.y + h) - r[2](v.x, v.y)) / h;
                return Chalkboard.matr.init([dxds, dxdt], [dyds, dydt], [dzds, dzdt]);
            }
            else if (funcORvectfield.type === "vector2d") {
                const dpdx = (F[0](v.x + h, v.y) - F[0](v.x, v.y)) / h;
                const dpdy = (F[0](v.x, v.y + h) - F[0](v.x, v.y)) / h;
                const dqdx = (F[1](v.x + h, v.y) - F[1](v.x, v.y)) / h;
                const dqdy = (F[1](v.x, v.y + h) - F[1](v.x, v.y)) / h;
                return Chalkboard.matr.init([dpdx, dpdy], [dqdx, dqdy]);
            }
            else if (funcORvectfield.type === "vector3d") {
                const dpdx = (F[0](v.x + h, v.y, v.z) - F[0](v.x, v.y, v.z)) / h;
                const dpdy = (F[0](v.x, v.y + h, v.z) - F[0](v.x, v.y, v.z)) / h;
                const dpdz = (F[0](v.x, v.y, v.z + h) - F[0](v.x, v.y, v.z)) / h;
                const dqdx = (F[1](v.x + h, v.y, v.z) - F[1](v.x, v.y, v.z)) / h;
                const dqdy = (F[1](v.x, v.y + h, v.z) - F[1](v.x, v.y, v.z)) / h;
                const dqdz = (F[1](v.x, v.y, v.z + h) - F[1](v.x, v.y, v.z)) / h;
                const drdx = (F[2](v.x + h, v.y, v.z) - F[2](v.x, v.y, v.z)) / h;
                const drdy = (F[2](v.x, v.y + h, v.z) - F[2](v.x, v.y, v.z)) / h;
                const drdz = (F[2](v.x, v.y, v.z + h) - F[2](v.x, v.y, v.z)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz], [dqdx, dqdy, dqdz], [drdx, drdy, drdz]);
            }
            else if (funcORvectfield.type === "vector4d") {
                const dpdx = (F[0](v.x + h, v.y, v.z, v.w) - F[0](v.x, v.y, v.z, v.w)) / h;
                const dpdy = (F[0](v.x, v.y + h, v.z, v.w) - F[0](v.x, v.y, v.z, v.w)) / h;
                const dpdz = (F[0](v.x, v.y, v.z + h, v.w) - F[0](v.x, v.y, v.z, v.w)) / h;
                const dpdw = (F[0](v.x, v.y, v.z, v.w + h) - F[0](v.x, v.y, v.z, v.w)) / h;
                const dqdx = (F[1](v.x + h, v.y, v.z, v.w) - F[1](v.x, v.y, v.z, v.w)) / h;
                const dqdy = (F[1](v.x, v.y + h, v.z, v.w) - F[1](v.x, v.y, v.z, v.w)) / h;
                const dqdz = (F[1](v.x, v.y, v.z + h, v.w) - F[1](v.x, v.y, v.z, v.w)) / h;
                const dqdw = (F[1](v.x, v.y, v.z, v.w + h) - F[1](v.x, v.y, v.z, v.w)) / h;
                const drdx = (F[2](v.x + h, v.y, v.z, v.w) - F[2](v.x, v.y, v.z, v.w)) / h;
                const drdy = (F[2](v.x, v.y + h, v.z, v.w) - F[2](v.x, v.y, v.z, v.w)) / h;
                const drdz = (F[2](v.x, v.y, v.z + h, v.w) - F[2](v.x, v.y, v.z, v.w)) / h;
                const drdw = (F[2](v.x, v.y, v.z, v.w + h) - F[2](v.x, v.y, v.z, v.w)) / h;
                const dsdx = (F[3](v.x + h, v.y, v.z, v.w) - F[3](v.x, v.y, v.z, v.w)) / h;
                const dsdy = (F[3](v.x, v.y + h, v.z, v.w) - F[3](v.x, v.y, v.z, v.w)) / h;
                const dsdz = (F[3](v.x, v.y, v.z + h, v.w) - F[3](v.x, v.y, v.z, v.w)) / h;
                const dsdw = (F[3](v.x, v.y, v.z, v.w + h) - F[3](v.x, v.y, v.z, v.w)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz, dpdw], [dqdx, dqdy, dqdz, dqdw], [drdx, drdy, drdz, drdw], [dsdx, dsdy, dsdz, dsdw]);
            }
            throw new TypeError("Chalkboard.calc.grad: Property 'type' of 'funcORvectfield' must be 'scalar3d', 'surface3d', 'vector2d', 'vector3d', or 'vector4d'.");
        };
        calc.grad2 = (funcORvectfield, vect) => {
            if (funcORvectfield.field !== "real")
                throw new TypeError("Chalkboard.calc.grad2: Property 'field' of 'funcORvectfield' must be 'real'.");
            const f = funcORvectfield.rule;
            const r = funcORvectfield.rule;
            const F = funcORvectfield.rule;
            const v = vect;
            const h = 0.00001;
            if (funcORvectfield.type === "scalar3d") {
                const d2fdx2 = (f(v.x + h, v.y) - 2 * f(v.x, v.y) + f(v.x - h, v.y)) / (h * h);
                const d2fdy2 = (f(v.x, v.y + h) - 2 * f(v.x, v.y) + f(v.x, v.y - h)) / (h * h);
                const d2fdxdy = (f(v.x + h, v.y + h) - f(v.x + h, v.y) - f(v.x, v.y + h) + f(v.x, v.y)) / (h * h);
                const d2fdydx = (f(v.x + h, v.y + h) - f(v.x, v.y + h) - f(v.x + h, v.y) + f(v.x, v.y)) / (h * h);
                return Chalkboard.matr.init([d2fdx2, d2fdxdy], [d2fdydx, d2fdy2]);
            }
            else if (funcORvectfield.type === "surface3d") {
                const d2xds2 = (r[0](v.x + h, v.y) - 2 * r[0](v.x, v.y) + r[0](v.x - h, v.y)) / (h * h);
                const d2xdt2 = (r[0](v.x, v.y + h) - 2 * r[0](v.x, v.y) + r[0](v.x, v.y - h)) / (h * h);
                const d2yds2 = (r[1](v.x + h, v.y) - 2 * r[1](v.x, v.y) + r[1](v.x - h, v.y)) / (h * h);
                const d2ydt2 = (r[1](v.x, v.y + h) - 2 * r[1](v.x, v.y) + r[1](v.x, v.y - h)) / (h * h);
                const d2zds2 = (r[2](v.x + h, v.y) - 2 * r[2](v.x, v.y) + r[2](v.x - h, v.y)) / (h * h);
                const d2zdt2 = (r[2](v.x, v.y + h) - 2 * r[2](v.x, v.y) + r[2](v.x, v.y - h)) / (h * h);
                return Chalkboard.matr.init([d2xds2, d2xdt2], [d2yds2, d2ydt2], [d2zds2, d2zdt2]);
            }
            else if (funcORvectfield.type === "vector2d") {
                const d2pdx2 = (F[0](v.x + h, v.y) - 2 * F[0](v.x, v.y) + F[0](v.x - h, v.y)) / (h * h);
                const d2pdy2 = (F[0](v.x, v.y + h) - 2 * F[0](v.x, v.y) + F[0](v.x, v.y - h)) / (h * h);
                const d2qdx2 = (F[1](v.x + h, v.y) - 2 * F[1](v.x, v.y) + F[1](v.x - h, v.y)) / (h * h);
                const d2qdy2 = (F[1](v.x, v.y + h) - 2 * F[1](v.x, v.y) + F[1](v.x, v.y - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2], [d2qdx2, d2qdy2]);
            }
            else if (funcORvectfield.type === "vector3d") {
                const d2pdx2 = (F[0](v.x + h, v.y, v.z) - 2 * F[0](v.x, v.y, v.z) + F[0](v.x - h, v.y, v.z)) / (h * h);
                const d2pdy2 = (F[0](v.x, v.y + h, v.z) - 2 * F[0](v.x, v.y, v.z) + F[0](v.x, v.y - h, v.z)) / (h * h);
                const d2pdz2 = (F[0](v.x, v.y, v.z + h) - 2 * F[0](v.x, v.y, v.z) + F[0](v.x, v.y, v.z - h)) / (h * h);
                const d2qdx2 = (F[1](v.x + h, v.y, v.z) - 2 * F[1](v.x, v.y, v.z) + F[1](v.x - h, v.y, v.z)) / (h * h);
                const d2qdy2 = (F[1](v.x, v.y + h, v.z) - 2 * F[1](v.x, v.y, v.z) + F[1](v.x, v.y - h, v.z)) / (h * h);
                const d2qdz2 = (F[1](v.x, v.y, v.z + h) - 2 * F[1](v.x, v.y, v.z) + F[1](v.x, v.y, v.z - h)) / (h * h);
                const d2rdx2 = (F[2](v.x + h, v.y, v.z) - 2 * F[2](v.x, v.y, v.z) + F[2](v.x - h, v.y, v.z)) / (h * h);
                const d2rdy2 = (F[2](v.x, v.y + h, v.z) - 2 * F[2](v.x, v.y, v.z) + F[2](v.x, v.y - h, v.z)) / (h * h);
                const d2rdz2 = (F[2](v.x, v.y, v.z + h) - 2 * F[2](v.x, v.y, v.z) + F[2](v.x, v.y, v.z - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2], [d2qdx2, d2qdy2, d2qdz2], [d2rdx2, d2rdy2, d2rdz2]);
            }
            else if (funcORvectfield.type === "vector4d") {
                const d2pdx2 = (F[0](v.x + h, v.y, v.z, v.w) - 2 * F[0](v.x, v.y, v.z, v.w) + F[0](v.x - h, v.y, v.z, v.w)) / (h * h);
                const d2pdy2 = (F[0](v.x, v.y + h, v.z, v.w) - 2 * F[0](v.x, v.y, v.z, v.w) + F[0](v.x, v.y - h, v.z, v.w)) / (h * h);
                const d2pdz2 = (F[0](v.x, v.y, v.z + h, v.w) - 2 * F[0](v.x, v.y, v.z, v.w) + F[0](v.x, v.y, v.z - h, v.w)) / (h * h);
                const d2pdw2 = (F[0](v.x, v.y, v.z, v.w + h) - 2 * F[0](v.x, v.y, v.z, v.w) + F[0](v.x, v.y, v.z, v.w - h)) / (h * h);
                const d2qdx2 = (F[1](v.x + h, v.y, v.z, v.w) - 2 * F[1](v.x, v.y, v.z, v.w) + F[1](v.x - h, v.y, v.z, v.w)) / (h * h);
                const d2qdy2 = (F[1](v.x, v.y + h, v.z, v.w) - 2 * F[1](v.x, v.y, v.z, v.w) + F[1](v.x, v.y - h, v.z, v.w)) / (h * h);
                const d2qdz2 = (F[1](v.x, v.y, v.z + h, v.w) - 2 * F[1](v.x, v.y, v.z, v.w) + F[1](v.x, v.y, v.z - h, v.w)) / (h * h);
                const d2qdw2 = (F[1](v.x, v.y, v.z, v.w + h) - 2 * F[1](v.x, v.y, v.z, v.w) + F[1](v.x, v.y, v.z, v.w - h)) / (h * h);
                const d2rdx2 = (F[2](v.x + h, v.y, v.z, v.w) - 2 * F[2](v.x, v.y, v.z, v.w) + F[2](v.x - h, v.y, v.z, v.w)) / (h * h);
                const d2rdy2 = (F[2](v.x, v.y + h, v.z, v.w) - 2 * F[2](v.x, v.y, v.z, v.w) + F[2](v.x, v.y - h, v.z, v.w)) / (h * h);
                const d2rdz2 = (F[2](v.x, v.y, v.z + h, v.w) - 2 * F[2](v.x, v.y, v.z, v.w) + F[2](v.x, v.y, v.z - h, v.w)) / (h * h);
                const d2rdw2 = (F[2](v.x, v.y, v.z, v.w + h) - 2 * F[2](v.x, v.y, v.z, v.w) + F[2](v.x, v.y, v.z, v.w - h)) / (h * h);
                const d2sdx2 = (F[3](v.x + h, v.y, v.z, v.w) - 2 * F[3](v.x, v.y, v.z, v.w) + F[3](v.x - h, v.y, v.z, v.w)) / (h * h);
                const d2sdy2 = (F[3](v.x, v.y + h, v.z, v.w) - 2 * F[3](v.x, v.y, v.z, v.w) + F[3](v.x, v.y - h, v.z, v.w)) / (h * h);
                const d2sdz2 = (F[3](v.x, v.y, v.z + h, v.w) - 2 * F[3](v.x, v.y, v.z, v.w) + F[3](v.x, v.y, v.z - h, v.w)) / (h * h);
                const d2sdw2 = (F[3](v.x, v.y, v.z, v.w + h) - 2 * F[3](v.x, v.y, v.z, v.w) + F[3](v.x, v.y, v.z, v.w - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2, d2pdw2], [d2qdx2, d2qdy2, d2qdz2, d2qdw2], [d2rdx2, d2rdy2, d2rdz2, d2rdw2], [d2sdx2, d2sdy2, d2sdz2, d2sdw2]);
            }
            throw new TypeError("Chalkboard.calc.grad: Property 'type' of 'funcORvectfield' must be 'scalar3d', 'surface3d', 'vector2d', 'vector3d', or 'vector4d'.");
        };
        calc.idft = (arr) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.idft: Parameter 'arr' must be an array.");
            const N = arr.length;
            const out = new Array(N);
            for (let n = 0; n < N; n++) {
                let sumA = 0;
                let sumB = 0;
                for (let k = 0; k < N; k++) {
                    const v = arr[k];
                    const A = typeof v === "number" ? v : v.a;
                    const B = typeof v === "number" ? 0 : v.b;
                    const theta = Chalkboard.PI(2 * k * n) / N;
                    const c = Chalkboard.trig.cos(theta);
                    const s = Chalkboard.trig.sin(theta);
                    sumA += A * c - B * s;
                    sumB += A * s + B * c;
                }
                out[n] = Chalkboard.comp.init(sumA / N, sumB / N);
            }
            return out;
        };
        calc.ifft = (arr) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.ifft: Parameter 'arr' must be an array.");
            const N = arr.length;
            if (!Number.isInteger(N) || N <= 0)
                throw new TypeError("Chalkboard.calc.ifft: Input length must be a positive integer.");
            if ((N & (N - 1)) !== 0)
                throw new TypeError("Chalkboard.calc.ifft: Input length must be a power of two.");
            const conjIn = new Array(N);
            for (let i = 0; i < N; i++) {
                const v = arr[i];
                const a = typeof v === "number" ? v : v.a;
                const b = typeof v === "number" ? 0 : v.b;
                conjIn[i] = Chalkboard.comp.init(a, -b);
            }
            const Y = Chalkboard.calc.fft(conjIn);
            const out = new Array(N);
            for (let i = 0; i < N; i++)
                out[i] = Chalkboard.comp.init(Y[i].a / N, -Y[i].b / N);
            return out;
        };
        calc.ifftshift = (arr) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.ifftshift: Parameter 'arr' must be an array.");
            const N = arr.length;
            if (N === 0)
                return [];
            const shift = Math.floor(N / 2);
            return arr.slice(shift).concat(arr.slice(0, shift));
        };
        calc.iFourier = (func, val, inf = 0, sup = 10, steps = 10000) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.iFourier: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const F = func.rule;
            if (!Number.isFinite(inf) || !Number.isFinite(sup) || !Number.isFinite(steps))
                throw new TypeError("Chalkboard.calc.iFourier: Parameters 'inf', 'sup', and 'steps' must be finite.");
            if (steps <= 0 || !Number.isInteger(steps))
                throw new TypeError("Chalkboard.calc.iFourier: Parameter 'steps' must be a positive integer.");
            if (sup === inf)
                return 0;
            const dw = (sup - inf) / steps;
            let sum = 0;
            for (let i = 0; i <= steps; i++) {
                const w = inf + i * dw;
                const weight = (i === 0 || i === steps) ? 0.5 : 1;
                sum += weight * (F(w) * Math.cos(w * val));
            }
            return sum * dw;
        };
        calc.irfft = (arr, n) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.irfft: Parameter 'arr' must be an array.");
            if (arr.length === 0)
                return [];
            const N = typeof n === "number" ? n : 2 * (arr.length - 1);
            if (!Number.isInteger(N) || N <= 0)
                throw new TypeError("Chalkboard.calc.irfft: Parameter 'n' must be a positive integer.");
            const expected = Math.floor(N / 2) + 1;
            if (arr.length !== expected)
                throw new RangeError("Chalkboard.calc.irfft: Input spectrum length must be floor(n/2)+1.");
            const full = new Array(N);
            {
                const v = arr[0];
                const a = typeof v === "number" ? v : v.a;
                const b = typeof v === "number" ? 0 : v.b;
                full[0] = Chalkboard.comp.init(a, b);
            }
            const half = Math.floor(N / 2);
            for (let k = 1; k <= half; k++) {
                const v = arr[k];
                const a = typeof v === "number" ? v : v.a;
                const b = typeof v === "number" ? 0 : v.b;
                full[k] = Chalkboard.comp.init(a, b);
            }
            if (N % 2 === 0)
                for (let k = 1; k < half; k++)
                    full[N - k] = Chalkboard.comp.init(full[k].a, -full[k].b);
            else
                for (let k = 1; k <= half; k++)
                    full[N - k] = Chalkboard.comp.init(full[k].a, -full[k].b);
            const isPow2 = (N & (N - 1)) === 0;
            const x = isPow2 ? Chalkboard.calc.ifft(full) : Chalkboard.calc.idft(full);
            const out = new Array(N);
            for (let i = 0; i < N; i++)
                out[i] = x[i].a;
            return out;
        };
        calc.Laplace = (func, val) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.Laplace: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            if (val > 0) {
                const f = func.rule;
                const g = (x) => f(x) * Math.exp(-val * x);
                return Chalkboard.calc.fxdx(Chalkboard.real.define(g), 0, 10);
            }
            throw new RangeError("Chalkboard.calc.Laplace: 'val' must be greater than 0.");
        };
        calc.lim = (func, val) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.lim: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule;
            if (val === Infinity) {
                if (f(101) > f(100)) {
                    return Infinity;
                }
                else if (f(101) < f(100)) {
                    return -Infinity;
                }
                else {
                    return f(100);
                }
            }
            else if (val === -Infinity) {
                if (f(-101) > f(-100)) {
                    return Infinity;
                }
                else if (f(-101) < f(-100)) {
                    return -Infinity;
                }
                else {
                    return f(-100);
                }
            }
            else {
                if (f(val - 0.000001).toFixed(4) === f(val + 0.000001).toFixed(4)) {
                    if (f(val) !== Infinity && f(val) !== -Infinity) {
                        return f(val);
                    }
                    else {
                        return undefined;
                    }
                }
                else {
                    return undefined;
                }
            }
        };
        calc.mean = (func, inf, sup) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.mean: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            return Chalkboard.calc.fxdx(func, inf, sup) / (sup - inf);
        };
        calc.Newton = (func, domain = [-1, 1]) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.Newton: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule;
            let x = Chalkboard.numb.random(domain[0], domain[1]);
            for (let i = 0; i < 10; i++) {
                x = x - f(x) / Chalkboard.calc.dfdx(func, x);
            }
            return x;
        };
        calc.normal = (func, val) => {
            if (func.field !== "real" || !func.type.startsWith("curve"))
                throw new TypeError("Chalkboard.calc.normal: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
            return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val));
        };
        calc.rfft = (arr) => {
            if (!Array.isArray(arr))
                throw new TypeError("Chalkboard.calc.rfft: Parameter 'arr' must be an array.");
            const N = arr.length;
            if (!Number.isInteger(N) || N <= 0)
                throw new TypeError("Chalkboard.calc.rfft: Input length must be a positive integer.");
            const X = ((N & (N - 1)) === 0) ? Chalkboard.calc.fft(arr) : Chalkboard.calc.dft(arr);
            return X.slice(0, Math.floor(N / 2) + 1);
        };
        calc.tangent = (func, val) => {
            if (func.field !== "real" || !func.type.startsWith("curve"))
                throw new TypeError("Chalkboard.calc.tangent: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'curve2d' or 'curve3d'.");
            return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val));
        };
        calc.Taylor = (func, val, n, a) => {
            if (func.field !== "real" || func.type !== "scalar2d")
                throw new TypeError("Chalkboard.calc.Taylor: Property 'field' of 'func' must be 'real' and property 'type' of 'func' must be 'scalar2d'.");
            const f = func.rule;
            const x = val;
            if (n === 0) {
                return f(x);
            }
            else if (n === 1) {
                return f(x) + Chalkboard.calc.dfdx(func, a) * (x - a);
            }
            else if (n === 2) {
                return f(x) + Chalkboard.calc.dfdx(func, a) * (x - a) + (Chalkboard.calc.d2fdx2(func, a) * (x - a) * (x - a)) / 2;
            }
            throw new RangeError("Chalkboard.calc.Taylor: 'n' must be 0, 1, or 2.");
        };
    })(calc = Chalkboard.calc || (Chalkboard.calc = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let comp;
    (function (comp_1) {
        comp_1.absolute = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(Math.abs(z.a), Math.abs(z.b));
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.absolute: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [(a, b) => Math.abs(f[0](a, b)), (a, b) => Math.abs(f[1](a, b))];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.absolute: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.add = (comp1, comp2) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1;
                const z2 = comp2;
                return Chalkboard.comp.init(z1.a + z2.a, z1.b + z2.b);
            }
            else if (comp1.hasOwnProperty("rule") && comp2.hasOwnProperty("rule")) {
                if (comp1.field !== "comp" || comp2.field !== "comp")
                    throw new TypeError("Chalkboard.comp.add: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = comp1.rule;
                const f2 = comp2.rule;
                const g = [(a, b) => f1[0](a, b) + f2[0](a, b), (a, b) => f1[1](a, b) + f2[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.add: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.arg = (comp) => {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
        };
        comp_1.argBetween = (comp1, comp2) => {
            return Chalkboard.vect.angBetween(Chalkboard.comp.toVector(comp1), Chalkboard.comp.toVector(comp2));
        };
        comp_1.conjugate = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(z.a, -z.b);
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.conjugate: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [(a, b) => f[0](a, b), (a, b) => -f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.conjugate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.constrain = (comp, range = [0, 1]) => {
            return Chalkboard.comp.init(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        };
        comp_1.copy = (comp) => {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        };
        comp_1.cos = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(Chalkboard.trig.cos(z.a) * Chalkboard.trig.cosh(z.b), -Chalkboard.trig.sin(z.a) * Chalkboard.trig.sinh(z.b));
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.cos: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                return Chalkboard.comp.define((a, b) => {
                    const re = f[0](a, b);
                    const im = f[1](a, b);
                    return Chalkboard.trig.cos(re) * Chalkboard.trig.cosh(im);
                }, (a, b) => {
                    const re = f[0](a, b);
                    const im = f[1](a, b);
                    return -Chalkboard.trig.sin(re) * Chalkboard.trig.sinh(im);
                });
            }
            throw new TypeError("Chalkboard.comp.cos: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.define = (...rule) => {
            let f;
            if (rule.length === 1 && Array.isArray(rule[0])) {
                f = rule[0];
            }
            else if (rule.length > 1) {
                f = rule;
            }
            else {
                f = rule[0];
            }
            if (Array.isArray(f)) {
                if (f.length !== 2 || f[0].length !== 2 || f[1].length !== 2)
                    throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, it must be an array of two functions of two variables.");
                if (typeof f[0](0, 0) !== "number" || typeof f[1](0, 0) !== "number")
                    throw new TypeError("Chalkboard.comp.define: If 'rule' is an array, the functions in it must return real numbers.");
                return { rule: f, field: "comp", type: "vector2d" };
            }
            else {
                if (f.length !== 1)
                    throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must be a function of one variable.");
                const F = f;
                if (!F(Chalkboard.comp.init(0, 0)).hasOwnProperty("a") || !F(Chalkboard.comp.init(0, 0)).hasOwnProperty("b"))
                    throw new TypeError("Chalkboard.comp.define: If 'rule' is a function, it must return a complex number.");
                return { rule: [(a, b) => F(Chalkboard.comp.init(a, b)).a, (a, b) => F(Chalkboard.comp.init(a, b)).b], field: "comp", type: "vector2d" };
            }
        };
        comp_1.dist = (comp1, comp2) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.real.sqrt((comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b));
        };
        comp_1.distsq = (comp1, comp2) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return (comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b);
        };
        comp_1.div = (comp1, comp2) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1;
                const z2 = comp2;
                const d = z2.a * z2.a + z2.b * z2.b;
                return Chalkboard.comp.init((z1.a * z2.a + z1.b * z2.b) / d, (z1.b * z2.a - z1.a * z2.b) / d);
            }
            else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if (comp1.field !== "comp" || comp2.field !== "comp")
                    throw new TypeError("Chalkboard.comp.div: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = comp1.rule;
                const f2 = comp2.rule;
                const g = [
                    (a, b) => {
                        const d = f2[0](a, b) * f2[0](a, b) + f2[1](a, b) * f2[1](a, b);
                        return (f1[0](a, b) * f2[0](a, b) + f1[1](a, b) * f2[1](a, b)) / d;
                    },
                    (a, b) => {
                        const d = f2[0](a, b) * f2[0](a, b) + f2[1](a, b) * f2[1](a, b);
                        return (f1[1](a, b) * f2[0](a, b) - f1[0](a, b) * f2[1](a, b)) / d;
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.div: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.Euler = (rad) => {
            return Chalkboard.comp.init(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        };
        comp_1.exp = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                const expRe = Math.exp(z.a);
                return Chalkboard.comp.init(expRe * Math.cos(z.b), expRe * Math.sin(z.b));
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.exp: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                return Chalkboard.comp.define((a, b) => {
                    const expRe = Math.exp(f[0](a, b));
                    return expRe * Math.cos(f[1](a, b));
                }, (a, b) => {
                    const expRe = Math.exp(f[0](a, b));
                    return expRe * Math.sin(f[1](a, b));
                });
            }
            throw new TypeError("Chalkboard.comp.exp: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.Im = (funcORcomp) => {
            if (funcORcomp.hasOwnProperty("rule")) {
                return funcORcomp.rule[1];
            }
            else {
                return funcORcomp.b;
            }
        };
        comp_1.init = (a, b = 0) => {
            return { a: a, b: b };
        };
        comp_1.invert = (comp) => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        };
        comp_1.isApproxEqual = (comp1, comp2, precision = 0.000001) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.numb.isApproxEqual(comp1.a, comp2.a, precision) && Chalkboard.numb.isApproxEqual(comp1.b, comp2.b, precision);
        };
        comp_1.isEqual = (comp1, comp2) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return comp1.a === comp2.a && comp1.b === comp2.b;
        };
        comp_1.isInverse = (comp1, comp2, precision = 0.000001) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.isApproxEqual(Chalkboard.comp.mul(comp1, comp2), Chalkboard.comp.init(1, 0), precision);
        };
        comp_1.isNormalized = (comp) => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.comp.magsq(comp), 1);
        };
        comp_1.isZero = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            return Chalkboard.comp.isApproxEqual(comp, Chalkboard.comp.init(0, 0));
        };
        comp_1.ln = (comp) => {
            return Chalkboard.comp.init(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        };
        comp_1.mag = (comp) => {
            return Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b);
        };
        comp_1.magset = (comp, num) => {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num);
        };
        comp_1.magsq = (comp) => {
            return comp.a * comp.a + comp.b * comp.b;
        };
        comp_1.mul = (comp1, comp2) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1;
                const z2 = comp2;
                return Chalkboard.comp.init(z1.a * z2.a - z1.b * z2.b, z1.a * z2.b + z1.b * z2.a);
            }
            else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if (comp1.field !== "comp" || comp2.field !== "comp")
                    throw new TypeError("Chalkboard.comp.mul: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = comp1.rule;
                const f2 = comp2.rule;
                const g = [(a, b) => f1[0](a, b) * f2[0](a, b) - f1[1](a, b) * f2[1](a, b), (a, b) => f1[0](a, b) * f2[1](a, b) + f1[1](a, b) * f2[0](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.mul: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.negate = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(-z.a, -z.b);
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.negate: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [(a, b) => -f[0](a, b), (a, b) => -f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.negate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.normalize = (comp) => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
        };
        comp_1.parse = (expr, config = { returnAST: false, returnJSON: false, returnLaTeX: false }) => {
            const tokenize = (input) => {
                const tokens = [];
                let i = 0;
                const registered = ["sin", "cos", "tan", "abs", "sq", "sqrt", "root", "ln", "exp", "conj", "conjugate", "invert", "mag", "arg", "re", "im"];
                const isFunction = (name) => registered.includes(name) || Chalkboard.REGISTRY[name] !== undefined;
                while (i < input.length) {
                    const ch = input[i];
                    if (/\s/.test(ch)) {
                        i++;
                        continue;
                    }
                    if ("+-*/(),^".indexOf(ch) !== -1) {
                        tokens.push(ch);
                        i++;
                        if (ch === ")" && i < input.length && (/[a-zA-Z0-9_i(]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                        }
                    }
                    else if (ch === "i" && (i === 0 || !/[a-zA-Z0-9_]/.test(input[i - 1]))) {
                        tokens.push("i");
                        i++;
                        if (i < input.length && (/[a-zA-Z0-9_(]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                        }
                    }
                    else if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(input[i + 1]))) {
                        let num = "";
                        let hasDecimal = false;
                        while (i < input.length && ((/[0-9]/.test(input[i])) || (input[i] === "." && !hasDecimal))) {
                            if (input[i] === ".")
                                hasDecimal = true;
                            num += input[i++];
                        }
                        tokens.push(num);
                        if (i < input.length && input[i] === "i") {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                            tokens.push("i");
                            i++;
                        }
                        if (i < input.length && (/[a-zA-Z_]/.test(input[i]) || input[i] === "(")) {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                        }
                    }
                    else if (/[a-zA-Z_]/.test(ch)) {
                        let name = "";
                        while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
                            name += input[i++];
                        }
                        if (/^[a-zA-Z]+$/.test(name) && name.length > 1 && !isFunction(name)) {
                            for (let j = 0; j < name.length; j++) {
                                tokens.push(name[j]);
                                if (j < name.length - 1)
                                    tokens.push("*");
                            }
                        }
                        else {
                            tokens.push(name);
                        }
                        if (i < input.length && input[i] === "(") {
                            if (!isFunction(name)) {
                                if (tokens[tokens.length - 1] !== "*")
                                    tokens.push("*");
                            }
                        }
                        else if (i < input.length && (/[a-zA-Z_]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                        }
                    }
                    else {
                        throw new Error(`Chalkboard.comp.parse: Unexpected character ${ch}`);
                    }
                }
                return tokens;
            };
            const parseTokens = (tokens) => {
                let pos = 0;
                const peek = () => tokens[pos] || "";
                const consume = (token) => {
                    if (token && tokens[pos] !== token)
                        throw new Error(`Chalkboard.comp.parse: Expected token '${token}' but found '${tokens[pos]}'`);
                    return tokens[pos++];
                };
                const parseExpression = () => parseAdditive();
                const parseAdditive = () => {
                    let node = parseMultiplicative();
                    while (peek() === "+" || peek() === "-") {
                        const op = consume();
                        const right = parseMultiplicative();
                        node = { type: op === "+" ? "add" : "sub", left: node, right };
                    }
                    return node;
                };
                const parseMultiplicative = () => {
                    let node = parseUnary();
                    while (peek() === "*" || peek() === "/") {
                        const op = consume();
                        const right = parseUnary();
                        node = { type: op === "*" ? "mul" : "div", left: node, right };
                    }
                    return node;
                };
                const parseUnary = () => {
                    if (peek() === "-") {
                        consume("-");
                        return { type: "neg", expr: parseExponent() };
                    }
                    else if (peek() === "+") {
                        consume("+");
                        return parseExponent();
                    }
                    return parseExponent();
                };
                const parseExponent = () => {
                    let node = parsePrimary();
                    if (peek() === "^") {
                        consume("^");
                        const right = parseExponentUnary();
                        node = { type: "pow", base: node, exponent: right };
                    }
                    return node;
                };
                const parseExponentUnary = () => {
                    if (peek() === "-") {
                        consume("-");
                        return { type: "neg", expr: parseExponentUnary() };
                    }
                    if (peek() === "+") {
                        consume("+");
                        return parseExponentUnary();
                    }
                    return parseExponent();
                };
                const parsePrimary = () => {
                    const token = peek();
                    if (/^-?[0-9]/.test(token) || /^-?\.[0-9]/.test(token)) {
                        consume();
                        return { type: "num", value: parseFloat(token) };
                    }
                    if (token === "i") {
                        consume();
                        return { type: "complex", a: 0, b: 1 };
                    }
                    if (/^[a-zA-Z_]/.test(token)) {
                        const name = consume();
                        if (peek() === "(") {
                            consume("(");
                            const args = [];
                            if (peek() !== ")") {
                                args.push(parseExpression());
                                while (peek() === ",") {
                                    consume(",");
                                    args.push(parseExpression());
                                }
                            }
                            consume(")");
                            return { type: "func", name, args };
                        }
                        return { type: "var", name };
                    }
                    if (token === "(") {
                        consume("(");
                        const node = parseExpression();
                        consume(")");
                        return node;
                    }
                    throw new Error(`Chalkboard.comp.parse: Unexpected token ${token}`);
                };
                const ast = parseExpression();
                if (pos < tokens.length)
                    throw new Error(`Chalkboard.comp.parse: Unexpected token ${tokens[pos]}`);
                return ast;
            };
            const evaluateNode = (node, values) => {
                switch (node.type) {
                    case "num": {
                        return Chalkboard.comp.init(node.value, 0);
                    }
                    case "complex": {
                        return Chalkboard.comp.init(node.a, node.b);
                    }
                    case "var": {
                        const varname = node.name;
                        if (varname in values)
                            return values[varname];
                        throw new Error(`Chalkboard.comp.parse: Variable '${varname}' not defined in values`);
                    }
                    case "add": {
                        return Chalkboard.comp.add(evaluateNode(node.left, values), evaluateNode(node.right, values));
                    }
                    case "sub": {
                        return Chalkboard.comp.sub(evaluateNode(node.left, values), evaluateNode(node.right, values));
                    }
                    case "mul": {
                        return Chalkboard.comp.mul(evaluateNode(node.left, values), evaluateNode(node.right, values));
                    }
                    case "div": {
                        return Chalkboard.comp.div(evaluateNode(node.left, values), evaluateNode(node.right, values));
                    }
                    case "pow": {
                        const base = evaluateNode(node.base, values);
                        const exponent = evaluateNode(node.exponent, values);
                        if (exponent.b === 0) {
                            return Chalkboard.comp.pow(base, exponent.a);
                        }
                        else {
                            throw new Error("Chalkboard.comp.parse: Complex exponentiation with complex exponent not supported");
                        }
                    }
                    case "neg": {
                        return Chalkboard.comp.negate(evaluateNode(node.expr, values));
                    }
                    case "func": {
                        const funcName = node.name.toLowerCase();
                        const args = node.args.map((arg) => evaluateNode(arg, values));
                        if (Chalkboard.REGISTRY && Chalkboard.REGISTRY[funcName]) {
                            try {
                                const realArgs = args.map((arg) => {
                                    if (arg.b !== 0)
                                        throw new Error("Complex argument in real function");
                                    return arg.a;
                                });
                                const result = Chalkboard.REGISTRY[funcName](...realArgs);
                                return Chalkboard.comp.init(result, 0);
                            }
                            catch (e) { }
                        }
                        switch (funcName) {
                            case "abs": {
                                return Chalkboard.comp.absolute(args[0]);
                            }
                            case "conj":
                            case "conjugate": {
                                return Chalkboard.comp.conjugate(args[0]);
                            }
                            case "mag": {
                                return Chalkboard.comp.init(Chalkboard.comp.mag(args[0]), 0);
                            }
                            case "arg": {
                                return Chalkboard.comp.init(Chalkboard.comp.arg(args[0]), 0);
                            }
                            case "re": {
                                return Chalkboard.comp.init(Chalkboard.comp.Re(args[0]), 0);
                            }
                            case "im": {
                                return Chalkboard.comp.init(Chalkboard.comp.Im(args[0]), 0);
                            }
                            case "ln": {
                                return Chalkboard.comp.ln(args[0]);
                            }
                            case "sin": {
                                return Chalkboard.comp.sin(args[0]);
                            }
                            case "cos": {
                                return Chalkboard.comp.cos(args[0]);
                            }
                            case "tan": {
                                return Chalkboard.comp.tan(args[0]);
                            }
                            case "exp": {
                                return Chalkboard.comp.exp(args[0]);
                            }
                            case "invert": {
                                return Chalkboard.comp.invert(args[0]);
                            }
                            case "sq": {
                                return Chalkboard.comp.sq(args[0]);
                            }
                            case "sqrt": {
                                return Chalkboard.comp.sqrt(args[0]);
                            }
                            case "pow": {
                                if (args.length < 2)
                                    throw new Error("Chalkboard.comp.parse: Function pow requires two arguments");
                                return Chalkboard.comp.pow(args[0], args[1].a);
                            }
                            case "root": {
                                if (args.length < 2)
                                    throw new Error("Chalkboard.comp.parse: Function root requires two arguments");
                                const index = args[1].a;
                                if (!Number.isInteger(index) || index <= 0)
                                    throw new Error("Chalkboard.comp.parse: Root index must be a positive integer");
                                return Chalkboard.comp.root(args[0], index)[0];
                            }
                            default: {
                                throw new Error(`Chalkboard.comp.parse: Unknown function ${node.name}`);
                            }
                        }
                    }
                }
                throw new Error(`Chalkboard.comp.parse: Unknown node type ${node.type}`);
            };
            const needsParensInPow = (z) => {
                if (z.b === 0)
                    return false;
                if (z.a === 0 && (z.b === 1 || z.b === -1))
                    return false;
                return true;
            };
            const nodeToString = (node) => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "complex": {
                        if (node.a === 0 && node.b === 1)
                            return "i";
                        if (node.a === 0 && node.b === -1)
                            return "-i";
                        if (node.a === 0)
                            return `${node.b}i`;
                        if (node.b === 0)
                            return node.a.toString();
                        if (node.b === 1)
                            return `${node.a} + i`;
                        if (node.b === -1)
                            return `${node.a} - i`;
                        return node.b > 0 ? `${node.a} + ${node.b}i` : `${node.a} - ${-node.b}i`;
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        const rightStr = nodeToString(node.right);
                        if (rightStr.startsWith("-"))
                            return `${nodeToString(node.left)} - ${rightStr.slice(1)}`;
                        return `${nodeToString(node.left)} + ${rightStr}`;
                    }
                    case "sub": {
                        const rightStr = node.right.type === "add" || node.right.type === "sub" ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${nodeToString(node.left)} - ${rightStr}`;
                    }
                    case "mul": {
                        if (node.left.type === "num" && node.left.value === 1)
                            return nodeToString(node.right);
                        if (node.right.type === "num" && node.right.value === 1)
                            return nodeToString(node.left);
                        const leftMul = (node.left.type === "add" || node.left.type === "sub") ? `(${nodeToString(node.left)})` : nodeToString(node.left);
                        const rightMul = (node.right.type === "add" || node.right.type === "sub") ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "var")
                            return `-${nodeToString(node.right)}`;
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "pow")
                            return `-${nodeToString(node.right)}`;
                        if ((node.left.type === "num" || node.left.type === "complex") && (node.right.type === "var" || (node.right.type === "complex" && node.right.a === 0 && node.right.b === 1))) {
                            return `${leftMul}${rightMul}`;
                        }
                        else {
                            return `${leftMul} * ${rightMul}`;
                        }
                    }
                    case "div": {
                        const powNode = { type: "pow", base: node.right, exponent: { type: "num", value: -1 } };
                        const mulNode = { type: "mul", left: node.left, right: powNode };
                        return nodeToString(mulNode);
                    }
                    case "pow": {
                        const baseIsComplex = node.base?.type === "complex";
                        const baseStrRaw = nodeToString(node.base);
                        const baseStr = baseIsComplex && needsParensInPow(node.base)
                            ? `(${baseStrRaw})`
                            : (node.base.type !== "num" && node.base.type !== "var" && node.base.type !== "complex")
                                ? `(${baseStrRaw})`
                                : baseStrRaw;
                        const expStr = (node.exponent.type !== "num" && node.exponent.type !== "var" && node.exponent.type !== "complex") ? `(${nodeToString(node.exponent)})` : nodeToString(node.exponent);
                        return `${baseStr}^${expStr}`;
                    }
                    case "neg": {
                        const exprStr = (node.expr.type !== "num" && node.expr.type !== "var" && node.expr.type !== "complex") ? `(${nodeToString(node.expr)})` : nodeToString(node.expr);
                        return `-${exprStr}`;
                    }
                    case "func": {
                        return `${node.name}(${node.args.map((arg) => nodeToString(arg)).join(", ")})`;
                    }
                }
                return "";
            };
            const nodeToLaTeX = (node) => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "complex": {
                        const re = node.a !== 0 ? node.a.toString() : "";
                        const im = node.b !== 0 ? (node.b === 1 ? "i" : node.b === -1 ? "-i" : `${node.b}i`) : "";
                        if (re && im) {
                            return node.b > 0 ? `${re} + ${im}` : `${re} - ${im.slice(1)}`;
                        }
                        return re || im || "0";
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        const right = nodeToLaTeX(node.right);
                        if (right.startsWith("-"))
                            return `${nodeToLaTeX(node.left)} - ${right.slice(1)}`;
                        return `${nodeToLaTeX(node.left)} + ${right}`;
                    }
                    case "sub": {
                        const right = nodeToLaTeX(node.right);
                        if (right.startsWith("-"))
                            return `${nodeToLaTeX(node.left)} + ${right.slice(1)}`;
                        return `${nodeToLaTeX(node.left)} - ${right}`;
                    }
                    case "mul": {
                        const isAtomicLaTeX = (n) => n.type === "num" || n.type === "var" || n.type === "complex" || n.type === "pow" || n.type === "func";
                        const wrapIfNeeded = (n) => {
                            const s = nodeToLaTeX(n);
                            if (n.type === "add" || n.type === "sub")
                                return `\\left(${s}\\right)`;
                            return s;
                        };
                        const left = wrapIfNeeded(node.left);
                        const right = wrapIfNeeded(node.right);
                        if (isAtomicLaTeX(node.left) && isAtomicLaTeX(node.right))
                            return `${left}${right}`;
                        return `${left} \\cdot ${right}`;
                    }
                    case "div": {
                        return `\\frac{${nodeToLaTeX(node.left)}}{${nodeToLaTeX(node.right)}}`;
                    }
                    case "pow": {
                        return `${nodeToLaTeX(node.base)}^{${nodeToLaTeX(node.exponent)}}`;
                    }
                    case "neg": {
                        return `-${nodeToLaTeX(node.expr)}`;
                    }
                    case "func": {
                        return `\\mathrm{${node.name}}\\left(${node.args.map(nodeToLaTeX).join(", ")}\\right)`;
                    }
                    default: {
                        throw new Error(`Chalkboard.comp.parse: Unknown node type ${node.type}`);
                    }
                }
            };
            const areEqualVars = (a, b) => {
                if (a.type === "var" && b.type === "var")
                    return a.name === b.name;
                if (a.type === "complex" && b.type === "complex")
                    return a.a === b.a && a.b === b.b;
                return JSON.stringify(a) === JSON.stringify(b);
            };
            const simplifyNode = (node) => {
                switch (node.type) {
                    case "num": {
                        return { type: "complex", a: node.value, b: 0 };
                    }
                    case "complex": {
                        return node;
                    }
                    case "var": {
                        return node;
                    }
                    case "add": {
                        const leftAdd = simplifyNode(node.left);
                        const rightAdd = simplifyNode(node.right);
                        if (leftAdd.type === "complex" && rightAdd.type === "complex")
                            return { type: "complex", a: leftAdd.a + rightAdd.a, b: leftAdd.b + rightAdd.b };
                        if (leftAdd.type === "complex" && leftAdd.a === 0 && leftAdd.b === 0)
                            return rightAdd;
                        if (rightAdd.type === "complex" && rightAdd.a === 0 && rightAdd.b === 0)
                            return leftAdd;
                        if (areEqualVars(leftAdd, rightAdd))
                            return { type: "mul", left: { type: "num", value: 2 }, right: leftAdd };
                        return { type: "add", left: leftAdd, right: rightAdd };
                    }
                    case "sub": {
                        const leftSub = simplifyNode(node.left);
                        const rightSub = simplifyNode(node.right);
                        if (leftSub.type === "complex" && rightSub.type === "complex")
                            return { type: "complex", a: leftSub.a - rightSub.a, b: leftSub.b - rightSub.b };
                        if (rightSub.type === "complex" && rightSub.a === 0 && rightSub.b === 0)
                            return leftSub;
                        if (leftSub.type === "complex" && leftSub.a === 0 && leftSub.b === 0)
                            return { type: "neg", expr: rightSub };
                        if (areEqualVars(leftSub, rightSub))
                            return { type: "complex", a: 0, b: 0 };
                        return { type: "sub", left: leftSub, right: rightSub };
                    }
                    case "mul": {
                        const leftMul = simplifyNode(node.left);
                        const rightMul = simplifyNode(node.right);
                        if ((leftMul.type === "add" || leftMul.type === "sub") && (rightMul.type === "add" || rightMul.type === "sub")) {
                            const extractTerms = (node) => {
                                if (node.type === "add") {
                                    return [...extractTerms(node.left), ...extractTerms(node.right)];
                                }
                                else if (node.type === "sub") {
                                    const rightTerms = extractTerms(node.right).map(term => ({
                                        type: "neg",
                                        expr: term
                                    }));
                                    return [...extractTerms(node.left), ...rightTerms];
                                }
                                else {
                                    return [node];
                                }
                            };
                            const leftTerms = extractTerms(leftMul);
                            const rightTerms = extractTerms(rightMul);
                            const products = [];
                            for (const leftTerm of leftTerms) {
                                for (const rightTerm of rightTerms) {
                                    if (leftTerm.type === "neg" && rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm.expr, right: rightTerm.expr }));
                                    }
                                    else if (leftTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm.expr, right: rightTerm } }));
                                    }
                                    else if (rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm, right: rightTerm.expr } }));
                                    }
                                    else {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm, right: rightTerm }));
                                    }
                                }
                            }
                            let result = products[0];
                            for (let i = 1; i < products.length; i++) {
                                result = {
                                    type: "add",
                                    left: result,
                                    right: products[i]
                                };
                            }
                            return simplifyNode(result);
                        }
                        if (leftMul.type === "complex" && rightMul.type === "complex")
                            return { type: "complex", a: leftMul.a * rightMul.a - leftMul.b * rightMul.b, b: leftMul.a * rightMul.b + leftMul.b * rightMul.a };
                        if ((leftMul.type === "complex" && leftMul.a === 0 && leftMul.b === 0) || (rightMul.type === "complex" && rightMul.a === 0 && rightMul.b === 0))
                            return { type: "complex", a: 0, b: 0 };
                        if (leftMul.type === "complex" && leftMul.a === 1 && leftMul.b === 0)
                            return rightMul;
                        if (rightMul.type === "complex" && rightMul.a === 1 && rightMul.b === 0)
                            return leftMul;
                        if (leftMul.type === "complex" && leftMul.a === 0 && leftMul.b === 1 && rightMul.type === "complex")
                            return { type: "complex", a: -rightMul.b, b: rightMul.a };
                        return { type: "mul", left: leftMul, right: rightMul };
                    }
                    case "div": {
                        const leftDiv = simplifyNode(node.left);
                        const rightDiv = simplifyNode(node.right);
                        if (leftDiv.type === "add" || leftDiv.type === "sub") {
                            const left = { type: "div", left: leftDiv.left, right: JSON.parse(JSON.stringify(rightDiv)) };
                            const right = { type: "div", left: leftDiv.right, right: JSON.parse(JSON.stringify(rightDiv)) };
                            return { type: leftDiv.type, left: simplifyNode(left), right: simplifyNode(right) };
                        }
                        if (leftDiv.type === "complex" && rightDiv.type === "complex") {
                            const denominator = rightDiv.a * rightDiv.a + rightDiv.b * rightDiv.b;
                            if (denominator === 0)
                                throw new Error("Chalkboard.comp.parse: Division by zero.");
                            return { type: "complex", a: (leftDiv.a * rightDiv.a + leftDiv.b * rightDiv.b) / denominator, b: (leftDiv.b * rightDiv.a - leftDiv.a * rightDiv.b) / denominator };
                        }
                        if (rightDiv.type === "complex" && rightDiv.a === 1 && rightDiv.b === 0)
                            return leftDiv;
                        if (leftDiv.type === "complex" && leftDiv.a === 0 && leftDiv.b === 0)
                            return { type: "complex", a: 0, b: 0 };
                        return { type: "div", left: leftDiv, right: rightDiv };
                    }
                    case "pow": {
                        const base = simplifyNode(node.base);
                        const exponent = simplifyNode(node.exponent);
                        return { type: "pow", base, exponent };
                    }
                    case "neg": {
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "complex")
                            return { type: "complex", a: -expr.a, b: -expr.b };
                        if (expr.type === "neg")
                            return expr.expr;
                        return { type: "neg", expr };
                    }
                    case "func": {
                        const args = node.args.map((arg) => simplifyNode(arg));
                        return { type: "func", name: node.name, args };
                    }
                }
                return node;
            };
            const isRealOnly = (node) => {
                switch (node.type) {
                    case "num": return true;
                    case "var": return true;
                    case "complex": return node.b === 0;
                    case "neg": return isRealOnly(node.expr);
                    case "add":
                    case "sub":
                    case "mul":
                    case "div": return isRealOnly(node.left) && isRealOnly(node.right);
                    case "pow": return isRealOnly(node.base) && isRealOnly(node.exponent);
                    case "func": return node.args.every(isRealOnly);
                    default: return false;
                }
            };
            const realNum = (n) => ({ type: "num", value: n });
            const realAdd = (l, r) => ({ type: "add", left: l, right: r });
            const realSub = (l, r) => ({ type: "sub", left: l, right: r });
            const realMul = (l, r) => ({ type: "mul", left: l, right: r });
            const realDiv = (l, r) => ({ type: "div", left: l, right: r });
            const realPow = (b, e) => ({ type: "pow", base: b, exponent: e });
            const realNeg = (x) => ({ type: "neg", expr: x });
            const realNodeToString = (node) => {
                switch (node.type) {
                    case "num": return node.value.toString();
                    case "var": return node.name;
                    case "add": return `${realNodeToString(node.left)} + ${realNodeToString(node.right)}`;
                    case "sub": return `${realNodeToString(node.left)} - ${realNodeToString(node.right)}`;
                    case "mul": {
                        const L = (node.left.type === "add" || node.left.type === "sub") ? `(${realNodeToString(node.left)})` : realNodeToString(node.left);
                        const R = (node.right.type === "add" || node.right.type === "sub") ? `(${realNodeToString(node.right)})` : realNodeToString(node.right);
                        return `${L} * ${R}`;
                    }
                    case "div": {
                        const L = (node.left.type === "add" || node.left.type === "sub") ? `(${realNodeToString(node.left)})` : realNodeToString(node.left);
                        const R = (node.right.type === "add" || node.right.type === "sub") ? `(${realNodeToString(node.right)})` : realNodeToString(node.right);
                        return `${L} / ${R}`;
                    }
                    case "pow": {
                        const B = (node.base.type === "num" || node.base.type === "var") ? realNodeToString(node.base) : `(${realNodeToString(node.base)})`;
                        const E = (node.exponent.type === "num" || node.exponent.type === "var") ? realNodeToString(node.exponent) : `(${realNodeToString(node.exponent)})`;
                        return `${B}^${E}`;
                    }
                    case "neg": {
                        const inner = (node.expr.type === "num" || node.expr.type === "var") ? realNodeToString(node.expr) : `(${realNodeToString(node.expr)})`;
                        return `-${inner}`;
                    }
                    default: {
                        throw new Error(`Chalkboard.comp.parse: Unsupported real-node type ${node.type}`);
                    }
                }
            };
            const simplifyRealString = (s) => {
                return Chalkboard.real.parse(s, {
                    roundTo: config.roundTo,
                    returnAST: false,
                    returnJSON: false,
                    returnLaTeX: false
                });
            };
            const toReIm = (node) => {
                switch (node.type) {
                    case "num": {
                        return { re: realNum(node.value), im: realNum(0) };
                    }
                    case "var": {
                        if (node.name === "i")
                            return { re: realNum(0), im: realNum(1) };
                        return { re: { type: "var", name: node.name }, im: realNum(0) };
                    }
                    case "complex": {
                        return { re: realNum(node.a), im: realNum(node.b) };
                    }
                    case "neg": {
                        const p = toReIm(node.expr);
                        return { re: realNeg(p.re), im: realNeg(p.im) };
                    }
                    case "add": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        return { re: realAdd(L.re, R.re), im: realAdd(L.im, R.im) };
                    }
                    case "sub": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        return { re: realSub(L.re, R.re), im: realSub(L.im, R.im) };
                    }
                    case "mul": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        const ac = realMul(L.re, R.re);
                        const bd = realMul(L.im, R.im);
                        const ad = realMul(L.re, R.im);
                        const bc = realMul(L.im, R.re);
                        return { re: realSub(ac, bd), im: realAdd(ad, bc) };
                    }
                    case "div": {
                        const L = toReIm(node.left);
                        const R = toReIm(node.right);
                        const c2 = realPow(R.re, realNum(2));
                        const d2 = realPow(R.im, realNum(2));
                        const denom = realAdd(c2, d2);
                        const ac = realMul(L.re, R.re);
                        const bd = realMul(L.im, R.im);
                        const bc = realMul(L.im, R.re);
                        const ad = realMul(L.re, R.im);
                        const reNum = realAdd(ac, bd);
                        const imNum = realSub(bc, ad);
                        return { re: realDiv(reNum, denom), im: realDiv(imNum, denom) };
                    }
                    case "pow": {
                        const expParts = toReIm(node.exponent);
                        const expImStr = simplifyRealString(realNodeToString(expParts.im));
                        if (expImStr !== "0")
                            throw new Error("Chalkboard.comp.parse: Complex exponent not supported in symbolic splitting.");
                        const expReStr = simplifyRealString(realNodeToString(expParts.re));
                        const n = Number(expReStr);
                        if (!Number.isInteger(n))
                            throw new Error("Chalkboard.comp.parse: Non-integer exponent not supported in symbolic splitting.");
                        const baseParts = toReIm(node.base);
                        let re = realNum(1);
                        let im = realNum(0);
                        const steps = Math.abs(n);
                        for (let i = 0; i < steps; i++) {
                            const a = re;
                            const b = im;
                            const c = baseParts.re;
                            const d = baseParts.im;
                            const newRe = realSub(realMul(a, c), realMul(b, d));
                            const newIm = realAdd(realMul(a, d), realMul(b, c));
                            re = newRe;
                            im = newIm;
                        }
                        if (n < 0) {
                            const denom = realAdd(realPow(re, realNum(2)), realPow(im, realNum(2)));
                            const reInv = realDiv(re, denom);
                            const imInv = realNeg(realDiv(im, denom));
                            return { re: reInv, im: imInv };
                        }
                        return { re, im };
                    }
                    case "func": {
                        throw new Error(`Chalkboard.comp.parse: Symbolic splitting for function '${node.name}' not supported.`);
                    }
                }
                throw new Error(`Chalkboard.comp.parse: Unsupported node type '${node.type}' in symbolic splitting.`);
            };
            const combineReImStrings = (reStr, imStr) => {
                const reS = reStr.trim();
                const imS = imStr.trim();
                const isZero = (s) => s === "0" || s === "0.0";
                const needsParens = (s) => {
                    return s.includes(" + ") || s.includes(" - ");
                };
                if (isZero(imS))
                    return reS;
                if (isZero(reS)) {
                    if (imS === "1")
                        return "i";
                    if (imS === "-1")
                        return "-i";
                    return needsParens(imS) ? `(${imS})i` : `${imS}i`;
                }
                const imWithI = imS === "1" ? "i" : imS === "-1" ? "-i" : needsParens(imS) ? `(${imS})i` : `${imS}i`;
                if (!needsParens(imS) && imS.startsWith("-")) {
                    const mag = imS.slice(1);
                    if (mag === "1")
                        return `${reS} - i`;
                    return `${reS} - ${mag}i`;
                }
                else {
                    if (imWithI.startsWith("-"))
                        return `${reS} - ${imWithI.slice(1)}`;
                    return `${reS} + ${imWithI}`;
                }
            };
            try {
                const tokens = tokenize(expr);
                const ast = parseTokens(tokens);
                const hasVars = (node) => {
                    switch (node.type) {
                        case "var": return true;
                        case "num": return false;
                        case "complex": return false;
                        case "neg": return hasVars(node.expr);
                        case "add":
                        case "sub":
                        case "mul":
                        case "div": return hasVars(node.left) || hasVars(node.right);
                        case "pow": return hasVars(node.base) || hasVars(node.exponent);
                        case "func": return node.args.some(hasVars);
                        default: return false;
                    }
                };
                if (!config.returnAST && !config.returnJSON) {
                    const values = config.values || {};
                    if ((config.values && Object.keys(config.values).length > 0) || !hasVars(ast)) {
                        try {
                            let result = evaluateNode(ast, values);
                            if (config.roundTo !== undefined) {
                                result = Chalkboard.comp.init(Chalkboard.numb.roundTo(result.a, config.roundTo), Chalkboard.numb.roundTo(result.b, config.roundTo));
                            }
                            if (config.returnLaTeX)
                                return nodeToLaTeX({ type: "complex", a: result.a, b: result.b });
                            return result;
                        }
                        catch (e) {
                        }
                    }
                }
                if (isRealOnly(ast)) {
                    return Chalkboard.real.parse(expr, {
                        roundTo: config.roundTo,
                        returnAST: config.returnAST,
                        returnJSON: config.returnJSON,
                        returnLaTeX: config.returnLaTeX
                    });
                }
                if (!config.returnAST && !config.returnJSON) {
                    try {
                        const parts = toReIm(ast);
                        const reExprStr = realNodeToString(parts.re);
                        const imExprStr = realNodeToString(parts.im);
                        if (reExprStr.includes("i") || imExprStr.includes("i")) {
                            throw new Error("Chalkboard.comp.parse: Internal error: 'i' leaked into real split.");
                        }
                        const reSimpl = simplifyRealString(reExprStr);
                        const imSimpl = simplifyRealString(imExprStr);
                        if (config.returnLaTeX) {
                            const reTex = Chalkboard.real.parse(reExprStr, { returnLaTeX: true, roundTo: config.roundTo });
                            const imTex = Chalkboard.real.parse(imExprStr, { returnLaTeX: true, roundTo: config.roundTo });
                            if (imTex.trim() === "0")
                                return reTex;
                            if (reTex.trim() === "0")
                                return `${imTex}i`;
                            return `${reTex} + ${String.raw `\left(${imTex}\right)`}i`;
                        }
                        return combineReImStrings(reSimpl, imSimpl);
                    }
                    catch (e) {
                    }
                }
                let simplified = simplifyNode(ast);
                simplified = simplifyNode(simplified);
                if (config.roundTo !== undefined) {
                    const roundNodes = (node) => {
                        if (node.type === "num")
                            return { ...node, value: Chalkboard.numb.roundTo(node.value, config.roundTo) };
                        if (node.type === "complex")
                            return { ...node, a: Chalkboard.numb.roundTo(node.a, config.roundTo), b: Chalkboard.numb.roundTo(node.b, config.roundTo) };
                        const n = Object.keys(node).length;
                        for (let i = 0; i < n; i++) {
                            const key = Object.keys(node)[i];
                            if (key !== "type" && node[key] && typeof node[key] === "object" && "type" in node[key])
                                node[key] = roundNodes(node[key]);
                        }
                        return node;
                    };
                    simplified = roundNodes(simplified);
                }
                if (config.returnAST)
                    return simplified;
                if (config.returnJSON)
                    return JSON.stringify(simplified);
                if (config.returnLaTeX) {
                    return nodeToLaTeX(simplified);
                }
                return nodeToString(simplified);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Chalkboard.comp.parse: Error parsing complex expression ${err.message}`);
                }
                else {
                    throw new Error(`Chalkboard.comp.parse: Error parsing complex expression ${String(err)}`);
                }
            }
        };
        comp_1.pow = (comp, num) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                const mag = Chalkboard.comp.mag(z);
                const arg = Chalkboard.comp.arg(z);
                return Chalkboard.comp.init(Chalkboard.real.pow(mag, num) * Chalkboard.trig.cos(num * arg), Chalkboard.real.pow(mag, num) * Chalkboard.trig.sin(num * arg));
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.pow: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [
                    (a, b) => {
                        const mag = Chalkboard.real.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Chalkboard.trig.arctan2(f[1](a, b), f[0](a, b));
                        return Chalkboard.real.pow(mag, num) * Chalkboard.trig.cos(num * arg);
                    },
                    (a, b) => {
                        const mag = Chalkboard.real.sqrt(f[0](a, b) * f[0](a, b) + f[1](a, b) * f[1](a, b));
                        const arg = Chalkboard.trig.arctan2(f[1](a, b), f[0](a, b));
                        return Chalkboard.real.pow(mag, num) * Chalkboard.trig.sin(num * arg);
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.pow: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.print = (comp) => {
            console.log(Chalkboard.comp.toString(comp));
        };
        comp_1.random = (inf = 0, sup = 1) => {
            return Chalkboard.comp.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };
        comp_1.Re = (funcORcomp) => {
            if (funcORcomp.hasOwnProperty("rule")) {
                return funcORcomp.rule[0];
            }
            else {
                return funcORcomp.a;
            }
        };
        comp_1.reciprocate = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(1 / z.a, 1 / z.b);
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.reciprocate: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [(a, b) => 1 / f[0](a, b), (a, b) => 1 / f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.reciprocate: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.root = (comp, index = 3) => {
            const result = [];
            const r = Chalkboard.comp.mag(comp);
            const t = Chalkboard.comp.arg(comp);
            for (let i = 0; i < index; i++) {
                result.push(Chalkboard.comp.init(Chalkboard.real.root(r, index) * Chalkboard.trig.cos((t + Chalkboard.PI(2 * i)) / index), Chalkboard.real.root(r, index) * Chalkboard.trig.sin((t + Chalkboard.PI(2 * i)) / index)));
            }
            return result;
        };
        comp_1.rotate = (comp, rad) => {
            return Chalkboard.comp.init(Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad), Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad));
        };
        comp_1.round = (comp) => {
            return Chalkboard.comp.init(Math.round(comp.a), Math.round(comp.b));
        };
        comp_1.scl = (comp, num) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(z.a * num, z.b * num);
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.scl: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [(a, b) => f[0](a, b) * num, (a, b) => f[1](a, b) * num];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.scl: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.sin = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(Chalkboard.trig.sin(z.a) * Chalkboard.trig.cosh(z.b), Chalkboard.trig.cos(z.a) * Chalkboard.trig.sinh(z.b));
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.sin: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                return Chalkboard.comp.define((a, b) => {
                    const re = f[0](a, b);
                    const im = f[1](a, b);
                    return Chalkboard.trig.sin(re) * Chalkboard.trig.cosh(im);
                }, (a, b) => {
                    const re = f[0](a, b);
                    const im = f[1](a, b);
                    return Chalkboard.trig.cos(re) * Chalkboard.trig.sinh(im);
                });
            }
            throw new TypeError("Chalkboard.comp.sin: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.slope = (comp) => {
            return comp.b / comp.a;
        };
        comp_1.sq = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(z.a * z.a - z.b * z.b, 2 * z.a * z.b);
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.sq: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [(a, b) => f[0](a, b) * f[0](a, b) - f[1](a, b) * f[1](a, b), (a, b) => 2 * f[0](a, b) * f[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sq: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.sqrt = (comp) => {
            if (typeof comp === "number")
                comp = Chalkboard.comp.init(comp, 0);
            if (comp.hasOwnProperty("a") && comp.hasOwnProperty("b")) {
                const z = comp;
                return Chalkboard.comp.init(Chalkboard.real.sqrt((z.a + Chalkboard.real.sqrt(z.a * z.a + z.b * z.b)) / 2), Chalkboard.numb.sgn(z.b) * Chalkboard.real.sqrt((-z.a + Chalkboard.real.sqrt(z.a * z.a + z.b * z.b)) / 2));
            }
            else if (comp.hasOwnProperty("rule")) {
                if (comp.field !== "comp")
                    throw new TypeError("Chalkboard.comp.sqrt: Property 'field' of 'comp' must be 'comp'.");
                const f = comp.rule;
                const g = [
                    (a, b) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.real.sqrt((re + Chalkboard.real.sqrt(re * re + im * im)) / 2);
                    },
                    (a, b) => {
                        const re = f[0](a, b);
                        const im = f[1](a, b);
                        return Chalkboard.numb.sgn(im) * Chalkboard.real.sqrt((-re + Chalkboard.real.sqrt(re * re + im * im)) / 2);
                    }
                ];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sqrt: Parameter 'comp' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.sub = (comp1, comp2) => {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            if (comp1.hasOwnProperty("a") && comp1.hasOwnProperty("b") && comp2.hasOwnProperty("a") && comp2.hasOwnProperty("b")) {
                const z1 = comp1;
                const z2 = comp2;
                return Chalkboard.comp.init(z1.a - z2.a, z1.b - z2.b);
            }
            else if (comp1.hasOwnProperty("rule") || comp2.hasOwnProperty("rule")) {
                if (comp1.field !== "comp" || comp2.field !== "comp")
                    throw new TypeError("Chalkboard.comp.sub: Properties 'field' of 'comp1' and 'comp2' must be 'comp'.");
                const f1 = comp1.rule;
                const f2 = comp2.rule;
                const g = [(a, b) => f1[0](a, b) - f2[0](a, b), (a, b) => f1[1](a, b) - f2[1](a, b)];
                return Chalkboard.comp.define(...g);
            }
            throw new TypeError("Chalkboard.comp.sub: Parameters 'comp1' and 'comp2' must be of type ChalkboardComplex, number, or ChalkboardFunction.");
        };
        comp_1.tan = (comp) => {
            return Chalkboard.comp.div(Chalkboard.comp.sin(comp), Chalkboard.comp.cos(comp));
        };
        comp_1.toArray = (comp) => {
            return [comp.a, comp.b];
        };
        comp_1.toMatrix = (comp) => {
            return Chalkboard.matr.init([comp.a, -comp.b], [comp.b, comp.a]);
        };
        comp_1.toString = (comp) => {
            if (comp.a === 1 && comp.b === 0) {
                return "1";
            }
            else if (comp.a === 0 && comp.b === 1) {
                return "i";
            }
            else if (comp.a === -1 && comp.b === 0) {
                return "-1";
            }
            else if (comp.a === 0 && comp.b === -1) {
                return "-i";
            }
            else if (comp.b >= 0) {
                return comp.a.toString() + " + " + (comp.b === 1 ? "i" : comp.b.toString() + "i");
            }
            else {
                return comp.a.toString() + " - " + (comp.b === -1 ? "i" : Math.abs(comp.b).toString() + "i");
            }
        };
        comp_1.toTypedArray = (comp, type = "float32") => {
            const arr = Chalkboard.comp.toArray(comp);
            if (type === "int8") {
                return new Int8Array(arr);
            }
            else if (type === "int16") {
                return new Int16Array(arr);
            }
            else if (type === "int32") {
                return new Int32Array(arr);
            }
            else if (type === "float32") {
                return new Float32Array(arr);
            }
            else if (type === "float64") {
                return new Float64Array(arr);
            }
            else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };
        comp_1.toVector = (comp) => {
            return Chalkboard.vect.init(comp.a, comp.b);
        };
        comp_1.val = (func, comp) => {
            if (func.field !== "comp")
                throw new TypeError("Chalkboard.comp.val: Property 'field' of 'func' must be 'comp'.");
            const f = func.rule;
            return Chalkboard.comp.init(f[0](comp.a, comp.b), f[1](comp.a, comp.b));
        };
    })(comp = Chalkboard.comp || (Chalkboard.comp = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let diff;
    (function (diff) {
        diff.at = (sol, time) => {
            if (typeof time !== "number" || !Number.isFinite(time))
                throw new Error(`Chalkboard.diff.at: Parameter "time" must be a finite number.`);
            const t = sol.t;
            const y = sol.y;
            if (t.length !== y.length || t.length === 0)
                throw new Error(`Chalkboard.diff.at: Invalid solution object.`);
            if (time <= t[0])
                return y[0].slice();
            if (time >= t[t.length - 1])
                return y[y.length - 1].slice();
            let i = 0;
            while (i < t.length - 1 && !(t[i] <= time && time <= t[i + 1]))
                i++;
            const t0 = t[i], t1 = t[i + 1];
            const a = (time - t0) / (t1 - t0);
            const result = [];
            for (let k = 0; k < y[i].length; k++)
                result.push((1 - a) * y[i][k] + a * y[i + 1][k]);
            return result;
        };
        diff.Bernoulli = (p, q, n) => {
            if (typeof n !== "number" || !Number.isFinite(n))
                throw new Error(`Chalkboard.diff.Bernoulli: Parameter "n" must be a finite number.`);
            const P = (typeof p === "number") ? ((t) => p) : p;
            const Q = (typeof q === "number") ? ((t) => q) : q;
            return Chalkboard.diff.init((t, y) => -P(t) * y + Q(t) * Math.pow(y, n));
        };
        diff.BesselI = (nu = 0) => {
            if (typeof nu !== "number" || !Number.isFinite(nu))
                throw new Error(`Chalkboard.diff.BesselI: Parameter "nu" must be a finite number.`);
            return Chalkboard.diff.init((t, y, dy) => {
                if (t === 0)
                    throw new Error(`Chalkboard.diff.BesselI: Singular at t = 0.`);
                const x = t;
                return -(1 / x) * dy + (1 + (nu * nu) / (x * x)) * y;
            });
        };
        diff.BesselJ = (nu = 0) => {
            if (typeof nu !== "number" || !Number.isFinite(nu))
                throw new Error(`Chalkboard.diff.BesselJ: Parameter "nu" must be a finite number.`);
            return Chalkboard.diff.init((t, y, dy) => {
                if (t === 0)
                    throw new Error(`Chalkboard.diff.BesselJ: Singular at t = 0.`);
                const x = t;
                const term = 1 - (nu * nu) / (x * x);
                return -(1 / x) * dy - term * y;
            });
        };
        diff.closestIndex = (t, target) => {
            if (!Array.isArray(t) || t.length === 0)
                throw new Error(`Chalkboard.diff.closestIndex: Parameter "t" must be a non-empty array.`);
            if (typeof target !== "number" || !Number.isFinite(target))
                throw new Error(`Chalkboard.diff.closestIndex: Parameter "target" must be a finite number.`);
            let result = 0;
            let resultDist = Math.abs(t[0] - target);
            for (let i = 1; i < t.length; i++) {
                const d = Math.abs(t[i] - target);
                if (d < resultDist) {
                    resultDist = d;
                    result = i;
                }
            }
            return result;
        };
        diff.component = (sol, index) => {
            if (!Number.isInteger(index) || index < 0)
                throw new Error(`Chalkboard.diff.component: Parameter "index" must be an integer >= 0.`);
            const result = [];
            for (let i = 0; i < sol.y.length; i++) {
                if (index >= sol.y[i].length)
                    throw new Error(`Chalkboard.diff.component: "index" out of range for solution dimension.`);
                result.push(sol.y[i][index]);
            }
            return result;
        };
        diff.derivative = (sol) => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y))
                throw new Error(`Chalkboard.diff.derivative: Invalid solution object.`);
            const t = sol.t;
            const y = sol.y;
            if (t.length !== y.length || t.length < 2)
                throw new Error(`Chalkboard.diff.derivative: Need at least 2 samples.`);
            const n = y[0].length;
            const dy = new Array(y.length);
            for (let i = 0; i < y.length; i++)
                dy[i] = new Array(n).fill(0);
            for (let i = 0; i < y.length; i++) {
                if (i === 0) {
                    const dt = t[1] - t[0];
                    for (let k = 0; k < n; k++)
                        dy[i][k] = (y[1][k] - y[0][k]) / dt;
                }
                else if (i === y.length - 1) {
                    const dt = t[t.length - 1] - t[t.length - 2];
                    for (let k = 0; k < n; k++)
                        dy[i][k] = (y[y.length - 1][k] - y[y.length - 2][k]) / dt;
                }
                else {
                    const dt = t[i + 1] - t[i - 1];
                    for (let k = 0; k < n; k++)
                        dy[i][k] = (y[i + 1][k] - y[i - 1][k]) / dt;
                }
            }
            return dy;
        };
        diff.Duffing = (delta, alpha, beta, gamma, omega) => {
            if (![delta, alpha, beta, gamma, omega].every((n) => typeof n === "number" && Number.isFinite(n)))
                throw new Error(`Chalkboard.diff.Duffing: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, x, v) => -delta * v - alpha * x - beta * x * x * x + gamma * Math.cos(omega * t));
        };
        diff.error = (sol, ode, norm = "L2") => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y))
                throw new Error(`Chalkboard.diff.error: Invalid solution object.`);
            if (sol.t.length !== sol.y.length)
                throw new Error(`Chalkboard.diff.error: "sol.t" and "sol.y" must have the same length.`);
            if (sol.t.length < 2)
                throw new Error(`Chalkboard.diff.error: Need at least 2 samples to estimate derivative.`);
            if (!ode || typeof ode !== "object" || typeof ode.rule !== "function")
                throw new Error(`Chalkboard.diff.error: Parameter "ode" must be a ChalkboardODE.`);
            if (["L1", "L2", "LInfinity"].indexOf(norm) === -1)
                throw new Error(`Chalkboard.diff.error: Unknown norm type.`);
            const t = sol.t;
            const y = sol.y;
            const n = y[0].length;
            if (!Number.isInteger(ode.dimension) || ode.dimension !== n)
                throw new Error(`Chalkboard.diff.error: "ode.dimension" must match solution dimension.`);
            const dydt = Chalkboard.diff.derivative(sol);
            const e = [];
            let maxErr = 0;
            let sumErr = 0;
            let sumSq = 0;
            for (let i = 0; i < t.length; i++) {
                const fi = ode.rule(t[i], y[i]);
                if (!Array.isArray(fi) || fi.length !== n)
                    throw new Error(`Chalkboard.diff.error: ODE rule returned invalid derivative at sample ${i}.`);
                const r = new Array(n);
                for (let k = 0; k < n; k++) {
                    r[k] = dydt[i][k] - fi[k];
                    if (typeof r[k] !== "number" || !Number.isFinite(r[k]))
                        throw new Error(`Chalkboard.diff.error: Non-finite residual at sample ${i}, index ${k}.`);
                }
                let ri;
                if (norm === "L1") {
                    let s = 0;
                    for (let k = 0; k < n; k++)
                        s += Math.abs(r[k]);
                    ri = s;
                }
                else if (norm === "LInfinity") {
                    let m = 0;
                    for (let k = 0; k < n; k++)
                        m = Math.max(m, Math.abs(r[k]));
                    ri = m;
                }
                else {
                    let s2 = 0;
                    for (let k = 0; k < n; k++)
                        s2 += r[k] * r[k];
                    ri = Math.sqrt(s2);
                }
                e.push(ri);
                maxErr = Math.max(maxErr, ri);
                sumErr += ri;
                sumSq += ri * ri;
            }
            const mean = sumErr / e.length;
            const rmse = Math.sqrt(sumSq / e.length);
            return { t: t.slice(), e, max: maxErr, mean, rmse };
        };
        diff.exponential = (k = 1) => {
            if (typeof k !== "number" || !Number.isFinite(k))
                throw new Error(`Chalkboard.diff.exponential: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t, y) => k * y);
        };
        diff.Gompertz = (a = 1, K = 1) => {
            if (typeof a !== "number" || !Number.isFinite(a))
                throw new Error(`Chalkboard.diff.Gompertz: Parameter "a" must be a finite number.`);
            if (typeof K !== "number" || !Number.isFinite(K) || K <= 0)
                throw new Error(`Chalkboard.diff.Gompertz: Parameter "K" must be greater than 0.`);
            return Chalkboard.diff.init((t, y) => a * y * Math.log(K / y));
        };
        diff.harmonic = (w = 1) => {
            if (typeof w !== "number" || !Number.isFinite(w) || w < 0)
                throw new Error(`Chalkboard.diff.harmonic: Parameter "w" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t, y, dy) => -(w * w) * y);
        };
        diff.harmonicDamped = (w = 1, zeta = 0.1) => {
            if (typeof w !== "number" || !Number.isFinite(w) || w < 0)
                throw new Error(`Chalkboard.diff.harmonicDamped: Parameter "w" must be a finite number greater than or equal to 0.`);
            if (typeof zeta !== "number" || !Number.isFinite(zeta) || zeta < 0)
                throw new Error(`Chalkboard.diff.harmonicDamped: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            return Chalkboard.diff.init((t, y, dy) => -2 * zeta * w * dy - (w * w) * y);
        };
        diff.harmonicForced = (w, zeta, F) => {
            if (typeof w !== "number" || !Number.isFinite(w) || w < 0)
                throw new Error(`Chalkboard.diff.harmonicForced: Parameter "w" must be a finite number greater than or equal to 0.`);
            if (typeof zeta !== "number" || !Number.isFinite(zeta) || zeta < 0)
                throw new Error(`Chalkboard.diff.harmonicForced: Parameter "zeta" must be a finite number greater than or equal to 0.`);
            if (typeof F !== "function")
                throw new Error(`Chalkboard.diff.harmonicForced: Parameter "F" must be a function.`);
            return Chalkboard.diff.init((t, y, dy) => F(t) - 2 * zeta * w * dy - (w * w) * y);
        };
        diff.init = (rule, dimension) => {
            if (typeof rule !== "function")
                throw new Error(`Chalkboard.diff.init: Parameter "rule" must be a function.`);
            if (typeof dimension === "number") {
                if (!Number.isInteger(dimension) || dimension < 1)
                    throw new Error(`Chalkboard.diff.init: Parameter "dimension" must be an integer >= 1.`);
                const sys = rule;
                const ode = {
                    rule: (t, y) => {
                        const out = sys(t, y);
                        if (!Array.isArray(out))
                            throw new Error(`Chalkboard.diff.init: System rule must return an array of numbers.`);
                        if (out.length !== dimension)
                            throw new Error(`Chalkboard.diff.init: System rule must return an array of length ${dimension}.`);
                        for (let i = 0; i < out.length; i++)
                            if (typeof out[i] !== "number" || !Number.isFinite(out[i]))
                                throw new Error(`Chalkboard.diff.init: System rule output must be finite numbers (index ${i}).`);
                        return out;
                    },
                    type: "system",
                    order: 1,
                    dimension
                };
                return ode;
            }
            const arity = rule.length;
            if (arity === 2) {
                const f = rule;
                return {
                    rule: (t, y) => {
                        if (y.length !== 1)
                            throw new Error(`Chalkboard.diff.init: Internal error (expected dimension 1).`);
                        const dy = f(t, y[0]);
                        if (typeof dy !== "number" || !Number.isFinite(dy))
                            throw new Error(`Chalkboard.diff.init: Scalar rule must return a finite number.`);
                        return [dy];
                    },
                    type: "single",
                    order: 1,
                    dimension: 1
                };
            }
            if (arity === 3) {
                const g = rule;
                return {
                    rule: (t, y) => {
                        if (y.length !== 2)
                            throw new Error(`Chalkboard.diff.init: Internal error (expected dimension 2 for second-order scalar).`);
                        const ddy = g(t, y[0], y[1]);
                        if (typeof ddy !== "number" || !Number.isFinite(ddy))
                            throw new Error(`Chalkboard.diff.init: Second-order scalar rule must return a finite number.`);
                        return [y[1], ddy];
                    },
                    type: "single",
                    order: 2,
                    dimension: 2
                };
            }
            throw new Error(`Chalkboard.diff.init: Invalid "rule" arity. Expected (t,y) or (t,y,dy), or provide dimension for systems.`);
        };
        diff.Kepler2D = (mu = 1) => {
            if (typeof mu !== "number" || !Number.isFinite(mu) || mu < 0)
                throw new Error(`Chalkboard.diff.Kepler2D: Parameter "mu" must be a finite number >= 0.`);
            return Chalkboard.diff.init((t, y) => {
                const x = y[0], yy = y[1], vx = y[2], vy = y[3];
                const r2 = x * x + yy * yy;
                const r = Math.sqrt(r2);
                if (r === 0)
                    throw new Error(`Chalkboard.diff.Kepler2D: Encountered r=0 singularity.`);
                const invr3 = 1 / (r2 * r);
                const ax = -mu * x * invr3;
                const ay = -mu * yy * invr3;
                return [vx, vy, ax, ay];
            }, 4);
        };
        diff.Kepler3D = (mu = 1) => {
            if (typeof mu !== "number" || !Number.isFinite(mu) || mu < 0)
                throw new Error(`Chalkboard.diff.Kepler3D: Parameter "mu" must be a finite number >= 0.`);
            return Chalkboard.diff.init((t, y) => {
                const x = y[0], yy = y[1], z = y[2];
                const vx = y[3], vy = y[4], vz = y[5];
                const r2 = x * x + yy * yy + z * z;
                const r = Math.sqrt(r2);
                if (r === 0)
                    throw new Error(`Chalkboard.diff.Kepler3D: Encountered r=0 singularity.`);
                const invr3 = 1 / (r2 * r);
                const ax = -mu * x * invr3;
                const ay = -mu * yy * invr3;
                const az = -mu * z * invr3;
                return [vx, vy, vz, ax, ay, az];
            }, 6);
        };
        diff.linear1 = (a, b) => {
            const A = typeof a === "number" ? (() => a) : a;
            const B = typeof b === "number" ? (() => b) : b;
            return Chalkboard.diff.init((t, y) => A(t) * y + B(t));
        };
        diff.linear2 = (a, b, c) => {
            const A = typeof a === "number" ? (() => a) : a;
            const B = typeof b === "number" ? (() => b) : b;
            const C = typeof c === "number" ? (() => c) : c;
            return Chalkboard.diff.init((t, y, dy) => A(t) * dy + B(t) * y + C(t));
        };
        diff.logistic = (r = 1, K = 1) => {
            if (typeof r !== "number" || !Number.isFinite(r))
                throw new Error(`Chalkboard.diff.logistic: Parameter "r" must be a finite number.`);
            if (typeof K !== "number" || !Number.isFinite(K) || K === 0)
                throw new Error(`Chalkboard.diff.logistic: Parameter "K" must be a finite non-zero number.`);
            return Chalkboard.diff.init((t, y) => r * y * (1 - y / K));
        };
        diff.Lorenz = (sigma = 10, rho = 28, beta = 8 / 3) => {
            if (![sigma, rho, beta].every((n) => typeof n === "number" && Number.isFinite(n)))
                throw new Error(`Chalkboard.diff.Lorenz: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, y) => {
                const x = y[0], yy = y[1], z = y[2];
                return [
                    sigma * (yy - x),
                    x * (rho - z) - yy,
                    x * yy - beta * z
                ];
            }, 3);
        };
        diff.LotkaVolterra = (alpha = 1, beta = 1, gamma = 1, delta = 1) => {
            if (![alpha, beta, gamma, delta].every((n) => typeof n === "number" && Number.isFinite(n)))
                throw new Error(`Chalkboard.diff.LotkaVolterra: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, y) => {
                const x = y[0], p = y[1];
                return [alpha * x - beta * x * p, delta * x * p - gamma * p];
            }, 2);
        };
        diff.massSpringDamper = (m, c, k) => {
            if (typeof m !== "number" || !Number.isFinite(m) || m === 0)
                throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "m" must be finite and non-zero.`);
            if (typeof c !== "number" || !Number.isFinite(c))
                throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "c" must be a finite number.`);
            if (typeof k !== "number" || !Number.isFinite(k))
                throw new Error(`Chalkboard.diff.massSpringDamper: Parameter "k" must be a finite number.`);
            return Chalkboard.diff.init((t, x, v) => -(c / m) * v - (k / m) * x);
        };
        diff.pendulum = (params = {}) => {
            const g = params.g ?? 9.81;
            const L = params.L ?? 1;
            const b = params.b ?? 0;
            const tau = params.tau ?? (() => 0);
            if (typeof g !== "number" || !Number.isFinite(g) || g < 0)
                throw new Error(`Chalkboard.diff.pendulum: "g" must be a finite number greater than or equal to 0.`);
            if (typeof L !== "number" || !Number.isFinite(L) || L === 0)
                throw new Error(`Chalkboard.diff.pendulum: "L" must be a finite non-zero number.`);
            if (typeof b !== "number" || !Number.isFinite(b))
                throw new Error(`Chalkboard.diff.pendulum: "b" must be a finite number.`);
            if (typeof tau !== "function")
                throw new Error(`Chalkboard.diff.pendulum: "tau" must be a function.`);
            return Chalkboard.diff.init((t, theta, omega) => tau(t) - b * omega - (g / L) * Math.sin(theta));
        };
        diff.pendulumDrag = (params = {}) => {
            const g = params.g ?? 9.81;
            const L = params.L ?? 1;
            const b = params.b ?? 0;
            const c = params.c ?? 0;
            const tau = params.tau ?? (() => 0);
            if (typeof g !== "number" || !Number.isFinite(g) || g < 0)
                throw new Error(`Chalkboard.diff.pendulumDrag: "g" must be a finite number greater than or equal to 0.`);
            if (typeof L !== "number" || !Number.isFinite(L) || L === 0)
                throw new Error(`Chalkboard.diff.pendulumDrag: "L" must be a finite non-zero number.`);
            if (typeof b !== "number" || !Number.isFinite(b))
                throw new Error(`Chalkboard.diff.pendulumDrag: "b" must be a finite number.`);
            if (typeof c !== "number" || !Number.isFinite(c))
                throw new Error(`Chalkboard.diff.pendulumDrag: "c" must be a finite number.`);
            if (typeof tau !== "function")
                throw new Error(`Chalkboard.diff.pendulumDrag: "tau" must be a function.`);
            return Chalkboard.diff.init((t, theta, omega) => {
                const quad = c * Math.abs(omega) * omega;
                return tau(t) - b * omega - quad - (g / L) * Math.sin(theta);
            });
        };
        diff.pendulumDriven = (q = 0.5, A = 1.2, Omega = 2 / 3) => {
            if (![q, A, Omega].every((n) => typeof n === "number" && Number.isFinite(n)))
                throw new Error(`Chalkboard.diff.pendulumDriven: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, theta, omega) => A * Math.cos(Omega * t) - q * omega - Math.sin(theta));
        };
        diff.phase = (sol, i, j) => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y))
                throw new Error(`Chalkboard.diff.phase: Invalid solution object.`);
            if (sol.t.length !== sol.y.length)
                throw new Error(`Chalkboard.diff.phase: "sol.t" and "sol.y" must have the same length.`);
            if (sol.y.length === 0)
                throw new Error(`Chalkboard.diff.phase: Solution has no samples.`);
            if (!Number.isInteger(i) || i < 0)
                throw new Error(`Chalkboard.diff.phase: Parameter "i" must be an integer >= 0.`);
            if (!Number.isInteger(j) || j < 0)
                throw new Error(`Chalkboard.diff.phase: Parameter "j" must be an integer >= 0.`);
            if (i === j)
                throw new Error(`Chalkboard.diff.phase: Parameters "i" and "j" must be different indices.`);
            if (i >= sol.y[0].length || j >= sol.y[0].length)
                throw new Error(`Chalkboard.diff.phase: Indices out of bounds for solution dimension.`);
            const result = [];
            for (let k = 0; k < sol.y.length; k++) {
                const row = sol.y[k];
                result.push([row[i], row[j]]);
            }
            return result;
        };
        diff.sample = (sol, times) => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y))
                throw new Error(`Chalkboard.diff.sample: Invalid solution object.`);
            if (!Array.isArray(times))
                throw new Error(`Chalkboard.diff.sample: Parameter "times" must be an array.`);
            const result = [];
            for (let i = 0; i < times.length; i++) {
                if (typeof times[i] !== "number" || !Number.isFinite(times[i]))
                    throw new Error(`Chalkboard.diff.sample: "times"[${i}] must be a finite number.`);
                result.push(Chalkboard.diff.at(sol, times[i]));
            }
            return result;
        };
        diff.separable = (f, g) => {
            if (typeof f !== "function" || typeof g !== "function")
                throw new Error(`Chalkboard.diff.separable: Parameters must be functions.`);
            return Chalkboard.diff.init((t, y) => f(t) * g(y));
        };
        diff.SEIR = (beta = 1, sigma = 1, gamma = 1) => {
            if (![beta, sigma, gamma].every((n) => typeof n === "number" && Number.isFinite(n)))
                throw new Error(`Chalkboard.diff.SEIR: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, y) => {
                const S = y[0], E = y[1], I = y[2], R = y[3];
                const inf = beta * S * I;
                return [
                    -inf,
                    inf - sigma * E,
                    sigma * E - gamma * I,
                    gamma * I
                ];
            }, 4);
        };
        diff.SIR = (beta = 1, gamma = 1) => {
            if (![beta, gamma].every((n) => typeof n === "number" && Number.isFinite(n)))
                throw new Error(`Chalkboard.diff.SIR: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, y) => {
                const S = y[0], I = y[1], R = y[2];
                return [-beta * S * I, beta * S * I - gamma * I, gamma * I];
            }, 3);
        };
        diff.SIS = (beta = 1, gamma = 0.5) => {
            if (![beta, gamma].every((n) => typeof n === "number" && Number.isFinite(n)))
                throw new Error(`Chalkboard.diff.SIS: Parameters must be finite numbers.`);
            return Chalkboard.diff.init((t, I) => beta * I * (1 - I) - gamma * I);
        };
        diff.solve = (ode, config) => {
            if (!ode || typeof ode !== "object")
                throw new Error(`Chalkboard.diff.solve: Parameter "ode" must be a ChalkboardODE.`);
            if (typeof ode.rule !== "function")
                throw new Error(`Chalkboard.diff.solve: "ode.rule" must be a function.`);
            if (!Number.isInteger(ode.dimension) || ode.dimension < 1)
                throw new Error(`Chalkboard.diff.solve: "ode.dimension" must be an integer >= 1.`);
            if (typeof config !== "object" || config === null)
                throw new Error(`Chalkboard.diff.solve: Parameter "config" must be an object.`);
            if (typeof config.t1 !== "number" || !Number.isFinite(config.t1))
                throw new Error(`Chalkboard.diff.solve: "config.t1" must be a finite number.`);
            const t0 = config.t0 ?? 0;
            if (typeof t0 !== "number" || !Number.isFinite(t0))
                throw new Error(`Chalkboard.diff.solve: "config.t0" must be a finite number.`);
            if (config.t1 === t0)
                throw new Error(`Chalkboard.diff.solve: "config.t1" must be different from "config.t0".`);
            const method = (config.method ?? "rk4").toLowerCase();
            if (["euler", "midpoint", "heun", "ralston", "rk4"].indexOf(method) === -1)
                throw new Error(`Chalkboard.diff.solve: Unknown method.`);
            let y0;
            let keys;
            if (typeof config.y0 === "number" && Number.isFinite(config.y0)) {
                if (ode.dimension !== 1)
                    throw new Error(`Chalkboard.diff.solve: Scalar "y0" is only allowed when "ode.dimension" === 1.`);
                y0 = [config.y0];
            }
            else if (Array.isArray(config.y0)) {
                if (config.y0.length !== ode.dimension)
                    throw new Error(`Chalkboard.diff.solve: Array "y0" must have length ${ode.dimension}.`);
                for (let i = 0; i < config.y0.length; i++)
                    if (typeof config.y0[i] !== "number" || !Number.isFinite(config.y0[i]))
                        throw new Error(`Chalkboard.diff.solve: "y0"[${i}] must be a finite number.`);
                y0 = config.y0.slice();
            }
            else {
                if (typeof config.y0 !== "object" || config.y0 === null)
                    throw new Error(`Chalkboard.diff.solve: "y0" must be of type number, number[], or object.`);
                const y0obj = config.y0;
                if (ode.type === "single" && ode.order === 2) {
                    if (("y0" in y0obj) && ("dy0" in y0obj)) {
                        const a = y0obj.y0;
                        const b = y0obj.dy0;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b))
                            throw new Error(`Chalkboard.diff.solve: For second-order scalar, "y0.y0" and "y0.dy0" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject)
                            keys = ["y", "dy"];
                    }
                    else if (("y" in y0obj) && ("dy" in y0obj)) {
                        const a = y0obj.y;
                        const b = y0obj.dy;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b))
                            throw new Error(`Chalkboard.diff.solve: For second-order scalar, "y0.y" and "y0.dy" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject)
                            keys = ["y", "dy"];
                    }
                    else {
                        throw new Error(`Chalkboard.diff.solve: For second-order scalar, provide initial conditions as { y0, dy0 } or { y, dy }.`);
                    }
                }
                else if (ode.dimension === 1 && ("y0" in y0obj) && typeof y0obj.y0 === "number" && Number.isFinite(y0obj.y0)) {
                    y0 = [y0obj.y0];
                    if (config.returnObject)
                        keys = ["y"];
                }
                else if (ode.dimension === 1 && ("y" in y0obj) && typeof y0obj.y === "number" && Number.isFinite(y0obj.y)) {
                    y0 = [y0obj.y];
                    if (config.returnObject)
                        keys = ["y"];
                }
                else if ("y0" in y0obj && Array.isArray(y0obj.y0)) {
                    const arr = y0obj.y0;
                    if (arr.length !== ode.dimension)
                        throw new Error(`Chalkboard.diff.solve: Object "y0.y0" must have length ${ode.dimension}.`);
                    for (let i = 0; i < arr.length; i++)
                        if (typeof arr[i] !== "number" || !Number.isFinite(arr[i]))
                            throw new Error(`Chalkboard.diff.solve: y0.y0[${i}] must be a finite number.`);
                    y0 = arr.slice();
                }
                else {
                    keys = Object.keys(config.y0).sort();
                    if (keys.length !== ode.dimension)
                        throw new Error(`Chalkboard.diff.solve: Object "y0" must have exactly ${ode.dimension} numeric properties (got ${keys.length}).`);
                    const arr = [];
                    for (let i = 0; i < keys.length; i++) {
                        const v = config.y0[keys[i]];
                        if (typeof v !== "number" || !Number.isFinite(v))
                            throw new Error(`Chalkboard.diff.solve: y0.${keys[i]} must be a finite number.`);
                        arr.push(v);
                    }
                    y0 = arr;
                }
            }
            if (config.returnObject && !keys) {
                if (ode.type === "single" && ode.order === 2 && ode.dimension === 2) {
                    keys = ["y", "dy"];
                }
                else if (ode.dimension === 1) {
                    keys = ["y"];
                }
                else {
                    keys = Array.from({ length: ode.dimension }, (_, i) => `y${i + 1}`);
                }
            }
            let h;
            let steps;
            if (typeof config.h === "number") {
                if (typeof config.h !== "number" || !Number.isFinite(config.h) || config.h === 0)
                    throw new Error(`Chalkboard.diff.solve: "config.h" must be a finite non-zero number.`);
                h = config.h;
                steps = Math.max(1, Math.floor(Math.abs((config.t1 - t0) / h)));
                h = (config.t1 - t0) / steps;
            }
            else if (typeof config.steps === "number") {
                if (!Number.isInteger(config.steps) || config.steps < 1)
                    throw new Error(`Chalkboard.diff.solve: "config.steps" must be an integer greater than or equal to 1.`);
                steps = config.steps;
                h = (config.t1 - t0) / steps;
            }
            else {
                throw new Error(`Chalkboard.diff.solve: Provide either "config.h" or "config.steps".`);
            }
            const add = (a, b) => Chalkboard.stat.add(a, b);
            const scl = (a, k) => Chalkboard.stat.scl(a, k);
            const f = ode.rule;
            const t = new Array(steps + 1);
            const y = new Array(steps + 1);
            t[0] = t0;
            y[0] = y0.slice();
            const stepper = (() => {
                if (method === "euler")
                    return (f, t, y, h) => {
                        const k1 = f(t, y);
                        return add(y, scl(k1, h));
                    };
                if (method === "midpoint")
                    return (f, t, y, h) => {
                        const k1 = f(t, y);
                        const ymid = add(y, scl(k1, h / 2));
                        const k2 = f(t + h / 2, ymid);
                        return add(y, scl(k2, h));
                    };
                if (method === "heun")
                    return (f, t, y, h) => {
                        const k1 = f(t, y);
                        const ypred = add(y, scl(k1, h));
                        const k2 = f(t + h, ypred);
                        return add(y, scl(add(k1, k2), h / 2));
                    };
                if (method === "ralston")
                    return (f, t, y, h) => {
                        const k1 = f(t, y);
                        const y2 = add(y, scl(k1, (2 / 3) * h));
                        const k2 = f(t + (2 / 3) * h, y2);
                        return add(y, scl(add(scl(k1, 1 / 4), scl(k2, 3 / 4)), h));
                    };
                return (f, t, y, h) => {
                    const k1 = f(t, y);
                    const k2 = f(t + h / 2, add(y, scl(k1, h / 2)));
                    const k3 = f(t + h / 2, add(y, scl(k2, h / 2)));
                    const k4 = f(t + h, add(y, scl(k3, h)));
                    const sum23 = add(scl(k2, 2), scl(k3, 2));
                    const total = add(add(k1, sum23), k4);
                    return add(y, scl(total, h / 6));
                };
            })();
            for (let i = 0; i < steps; i++) {
                const ti = t[i];
                const yi = y[i];
                const yNext = stepper(f, ti, yi, h);
                if (!Array.isArray(yNext) || yNext.length !== ode.dimension)
                    throw new Error(`Chalkboard.diff.solve: Internal step produced invalid state length (expected ${ode.dimension}).`);
                for (let k = 0; k < yNext.length; k++)
                    if (typeof yNext[k] !== "number" || !Number.isFinite(yNext[k]))
                        throw new Error(`Chalkboard.diff.solve: State became non-finite at step ${i + 1}, index ${k}.`);
                t[i + 1] = ti + h;
                y[i + 1] = yNext;
            }
            const result = { t, y };
            if (config.returnObject && keys && keys.length === ode.dimension) {
                result.yObj = y.map((row) => {
                    const obj = {};
                    for (let i = 0; i < keys.length; i++)
                        obj[keys[i]] = row[i];
                    return obj;
                });
            }
            return result;
        };
        diff.solveAdaptive = (ode, config) => {
            if (!ode || typeof ode !== "object")
                throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "ode" must be a ChalkboardODE.`);
            if (typeof ode.rule !== "function")
                throw new Error(`Chalkboard.diff.solveAdaptive: "ode.rule" must be a function.`);
            if (!Number.isInteger(ode.dimension) || ode.dimension < 1)
                throw new Error(`Chalkboard.diff.solveAdaptive: "ode.dimension" must be an integer >= 1.`);
            if (typeof config !== "object" || config === null)
                throw new Error(`Chalkboard.diff.solveAdaptive: Parameter "config" must be an object.`);
            if (typeof config.t1 !== "number" || !Number.isFinite(config.t1))
                throw new Error(`Chalkboard.diff.solveAdaptive: "config.t1" must be a finite number.`);
            const t0 = config.t0 ?? 0;
            if (typeof t0 !== "number" || !Number.isFinite(t0))
                throw new Error(`Chalkboard.diff.solveAdaptive: "config.t0" must be a finite number.`);
            if (config.t1 === t0)
                throw new Error(`Chalkboard.diff.solveAdaptive: "config.t1" must be different from "config.t0".`);
            const rtol = config.rtol ?? 1e-6;
            const atol = config.atol ?? 1e-9;
            if (typeof rtol !== "number" || !Number.isFinite(rtol) || rtol <= 0)
                throw new Error(`Chalkboard.diff.solveAdaptive: "rtol" must be > 0.`);
            if (typeof atol !== "number" || !Number.isFinite(atol) || atol < 0)
                throw new Error(`Chalkboard.diff.solveAdaptive: "atol" must be >= 0.`);
            const maxSteps = config.maxSteps ?? 100000;
            if (!Number.isInteger(maxSteps) || maxSteps < 1)
                throw new Error(`Chalkboard.diff.solveAdaptive: "maxSteps" must be an integer >= 1.`);
            let y0;
            let keys;
            if (typeof config.y0 === "number" && Number.isFinite(config.y0)) {
                if (ode.dimension !== 1)
                    throw new Error(`Chalkboard.diff.solveAdaptive: Scalar "y0" is only allowed when "ode.dimension" === 1.`);
                y0 = [config.y0];
            }
            else if (Array.isArray(config.y0)) {
                if (config.y0.length !== ode.dimension)
                    throw new Error(`Chalkboard.diff.solveAdaptive: Array "y0" must have length ${ode.dimension}.`);
                for (let i = 0; i < config.y0.length; i++)
                    if (typeof config.y0[i] !== "number" || !Number.isFinite(config.y0[i]))
                        throw new Error(`Chalkboard.diff.solveAdaptive: "y0"[${i}] must be a finite number.`);
                y0 = config.y0.slice();
            }
            else {
                if (typeof config.y0 !== "object" || config.y0 === null)
                    throw new Error(`Chalkboard.diff.solveAdaptive: "y0" must be of type number, number[], or object.`);
                const y0obj = config.y0;
                if (ode.type === "single" && ode.order === 2) {
                    if (("y0" in y0obj) && ("dy0" in y0obj)) {
                        const a = y0obj.y0;
                        const b = y0obj.dy0;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b))
                            throw new Error(`Chalkboard.diff.solveAdaptive: For second-order scalar, "y0.y0" and "y0.dy0" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject)
                            keys = ["y", "dy"];
                    }
                    else if (("y" in y0obj) && ("dy" in y0obj)) {
                        const a = y0obj.y;
                        const b = y0obj.dy;
                        if (typeof a !== "number" || !Number.isFinite(a) || typeof b !== "number" || !Number.isFinite(b))
                            throw new Error(`Chalkboard.diff.solveAdaptive: For second-order scalar, "y0.y" and "y0.dy" must be finite numbers.`);
                        y0 = [a, b];
                        if (config.returnObject)
                            keys = ["y", "dy"];
                    }
                    else {
                        throw new Error(`Chalkboard.diff.solveAdaptive: For second-order scalar, provide initial conditions as { y0, dy0 } or { y, dy }.`);
                    }
                }
                else if (ode.dimension === 1 && ("y0" in y0obj) && typeof y0obj.y0 === "number" && Number.isFinite(y0obj.y0)) {
                    y0 = [y0obj.y0];
                    if (config.returnObject)
                        keys = ["y"];
                }
                else if (ode.dimension === 1 && ("y" in y0obj) && typeof y0obj.y === "number" && Number.isFinite(y0obj.y)) {
                    y0 = [y0obj.y];
                    if (config.returnObject)
                        keys = ["y"];
                }
                else if ("y0" in y0obj && Array.isArray(y0obj.y0)) {
                    const arr = y0obj.y0;
                    if (arr.length !== ode.dimension)
                        throw new Error(`Chalkboard.diff.solveAdaptive: Object "y0.y0" must have length ${ode.dimension}.`);
                    for (let i = 0; i < arr.length; i++)
                        if (typeof arr[i] !== "number" || !Number.isFinite(arr[i]))
                            throw new Error(`Chalkboard.diff.solveAdaptive: y0.y0[${i}] must be a finite number.`);
                    y0 = arr.slice();
                }
                else {
                    keys = Object.keys(config.y0).sort();
                    if (keys.length !== ode.dimension)
                        throw new Error(`Chalkboard.diff.solveAdaptive: Object "y0" must have exactly ${ode.dimension} numeric properties (got ${keys.length}).`);
                    const arr = [];
                    for (let i = 0; i < keys.length; i++) {
                        const v = config.y0[keys[i]];
                        if (typeof v !== "number" || !Number.isFinite(v))
                            throw new Error(`Chalkboard.diff.solveAdaptive: y0.${keys[i]} must be a finite number.`);
                        arr.push(v);
                    }
                    y0 = arr;
                }
            }
            if (config.returnObject && !keys) {
                if (ode.type === "single" && ode.order === 2 && ode.dimension === 2)
                    keys = ["y", "dy"];
                else if (ode.dimension === 1)
                    keys = ["y"];
                else
                    keys = Array.from({ length: ode.dimension }, (_, i) => `y${i + 1}`);
            }
            const sign = Math.sign(config.t1 - t0);
            let h = config.h0 ?? (config.t1 - t0) / 100;
            if (typeof h !== "number" || !Number.isFinite(h) || h === 0)
                throw new Error(`Chalkboard.diff.solveAdaptive: "h0" must be a finite non-zero number (or omitted).`);
            h = Math.abs(h) * sign;
            const hMin = (config.hMin ?? 1e-12);
            const hMax = (config.hMax ?? Math.abs(config.t1 - t0));
            if (typeof hMin !== "number" || !Number.isFinite(hMin) || hMin <= 0)
                throw new Error(`Chalkboard.diff.solveAdaptive: "hMin" must be > 0.`);
            if (typeof hMax !== "number" || !Number.isFinite(hMax) || hMax <= 0)
                throw new Error(`Chalkboard.diff.solveAdaptive: "hMax" must be > 0.`);
            const clampAbs = (value, minAbs, maxAbs) => {
                const s = Math.sign(value) || 1;
                const a = Math.min(maxAbs, Math.max(minAbs, Math.abs(value)));
                return s * a;
            };
            const add = (a, b) => Chalkboard.stat.add(a, b);
            const scl = (a, k) => Chalkboard.stat.scl(a, k);
            const f = ode.rule;
            const t = [t0];
            const y = [y0.slice()];
            const c2 = 1 / 5;
            const c3 = 3 / 10;
            const c4 = 4 / 5;
            const c5 = 8 / 9;
            const c6 = 1;
            const c7 = 1;
            const a21 = 1 / 5;
            const a31 = 3 / 40, a32 = 9 / 40;
            const a41 = 44 / 45, a42 = -56 / 15, a43 = 32 / 9;
            const a51 = 19372 / 6561, a52 = -25360 / 2187, a53 = 64448 / 6561, a54 = -212 / 729;
            const a61 = 9017 / 3168, a62 = -355 / 33, a63 = 46732 / 5247, a64 = 49 / 176, a65 = -5103 / 18656;
            const a71 = 35 / 384, a72 = 0, a73 = 500 / 1113, a74 = 125 / 192, a75 = -2187 / 6784, a76 = 11 / 84;
            const b1 = 35 / 384, b2 = 0, b3 = 500 / 1113, b4 = 125 / 192, b5 = -2187 / 6784, b6 = 11 / 84, b7 = 0;
            const bs1 = 5179 / 57600, bs2 = 0, bs3 = 7571 / 16695, bs4 = 393 / 640, bs5 = -92097 / 339200, bs6 = 187 / 2100, bs7 = 1 / 40;
            const errNorm = (y5, y4, yScale) => {
                let m = 0;
                for (let i = 0; i < y5.length; i++) {
                    const e = Math.abs(y5[i] - y4[i]) / yScale[i];
                    if (e > m)
                        m = e;
                }
                return m;
            };
            const makeScale = (yCurr, yNext) => {
                const s = [];
                for (let i = 0; i < yCurr.length; i++)
                    s.push(atol + rtol * Math.max(Math.abs(yCurr[i]), Math.abs(yNext[i])));
                return s;
            };
            let iter = 0;
            while (iter < maxSteps) {
                iter++;
                const ti = t[t.length - 1];
                const yi = y[y.length - 1];
                if ((sign > 0 && ti >= config.t1) || (sign < 0 && ti <= config.t1))
                    break;
                const remaining = config.t1 - ti;
                if (Math.abs(h) > Math.abs(remaining))
                    h = remaining;
                h = clampAbs(h, hMin, hMax);
                const k1 = f(ti, yi);
                const y2 = add(yi, scl(k1, h * a21));
                const k2 = f(ti + c2 * h, y2);
                const y3 = add(add(yi, scl(k1, h * a31)), scl(k2, h * a32));
                const k3 = f(ti + c3 * h, y3);
                const y4 = add(add(add(yi, scl(k1, h * a41)), scl(k2, h * a42)), scl(k3, h * a43));
                const k4 = f(ti + c4 * h, y4);
                const y5s = add(add(add(add(yi, scl(k1, h * a51)), scl(k2, h * a52)), scl(k3, h * a53)), scl(k4, h * a54));
                const k5 = f(ti + c5 * h, y5s);
                const y6 = add(add(add(add(add(yi, scl(k1, h * a61)), scl(k2, h * a62)), scl(k3, h * a63)), scl(k4, h * a64)), scl(k5, h * a65));
                const k6 = f(ti + c6 * h, y6);
                const y7 = add(add(add(add(add(add(yi, scl(k1, h * a71)), scl(k2, h * a72)), scl(k3, h * a73)), scl(k4, h * a74)), scl(k5, h * a75)), scl(k6, h * a76));
                const k7 = f(ti + c7 * h, y7);
                const yNext5 = add(yi, scl(add(add(add(scl(k1, b1), scl(k2, b2)), add(scl(k3, b3), scl(k4, b4))), add(add(scl(k5, b5), scl(k6, b6)), scl(k7, b7))), h));
                const yNext4 = add(yi, scl(add(add(add(scl(k1, bs1), scl(k2, bs2)), add(scl(k3, bs3), scl(k4, bs4))), add(add(scl(k5, bs5), scl(k6, bs6)), scl(k7, bs7))), h));
                const scale = makeScale(yi, yNext5);
                const e = errNorm(yNext5, yNext4, scale);
                const safety = 0.9;
                const minFactor = 0.2;
                const maxFactor = 5.0;
                if (e <= 1) {
                    const tNext = ti + h;
                    t.push(tNext);
                    y.push(yNext5);
                    const factor = e === 0 ? maxFactor : Math.min(maxFactor, Math.max(minFactor, safety * Math.pow(1 / e, 1 / 5)));
                    h = h * factor;
                }
                else {
                    const factor = Math.min(1.0, Math.max(minFactor, safety * Math.pow(1 / e, 1 / 5)));
                    h = h * factor;
                    if (Math.abs(h) < hMin)
                        throw new Error(`Chalkboard.diff.solveAdaptive: Step size underflow (h < hMin).`);
                }
            }
            if (iter >= maxSteps)
                throw new Error(`Chalkboard.diff.solveAdaptive: Exceeded maxSteps=${maxSteps}.`);
            const result = { t, y };
            if (config.returnObject && keys && keys.length === ode.dimension) {
                result.yObj = y.map((row) => {
                    const obj = {};
                    for (let i = 0; i < keys.length; i++)
                        obj[keys[i]] = row[i];
                    return obj;
                });
            }
            return result;
        };
        diff.toScalarSeries = (sol) => {
            const result = [];
            for (let i = 0; i < sol.y.length; i++)
                result.push(sol.y[i][0]);
            return result;
        };
    })(diff = Chalkboard.diff || (Chalkboard.diff = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let geom;
    (function (geom) {
        geom.circleA = (r) => {
            return Chalkboard.PI() * r * r;
        };
        geom.circleP = (r) => {
            return 2 * Chalkboard.PI() * r;
        };
        geom.coneA = (r, h) => {
            return Chalkboard.PI() * r * (r + Chalkboard.real.sqrt(h * h + r * r));
        };
        geom.coneV = (r, h) => {
            return (Chalkboard.PI() * r * r * h) / 3;
        };
        geom.cubeA = (s) => {
            return 6 * s * s;
        };
        geom.cubeV = (s) => {
            return s * s * s;
        };
        geom.cylinderA = (r, h) => {
            return 2 * Chalkboard.PI() * r * r + 2 * Chalkboard.PI() * r * h;
        };
        geom.cylinderV = (r, h) => {
            return Chalkboard.PI() * r * r * h;
        };
        geom.dist = (p1, p2) => {
            if (p1.length === p2.length) {
                let result = 0;
                for (let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return Chalkboard.real.sqrt(result);
            }
            else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };
        geom.distsq = (p1, p2) => {
            if (p1.length === p2.length) {
                let result = 0;
                for (let i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return result;
            }
            else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };
        geom.ellipseA = (a, b) => {
            return Chalkboard.PI() * a * b;
        };
        geom.ellipseP = (a, b) => {
            const h = ((a - b) * (a - b)) / ((a + b) * (a + b));
            return Chalkboard.PI() * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        };
        geom.Euler = (v, e, f) => {
            return v - e + f;
        };
        geom.line3D = (x1, y1, z1, x2, y2, z2, context = Function('"use strict"; return (' + Chalkboard.CONTEXT + ')')()) => {
            context.beginPath();
            context.moveTo(x1 / (z1 * 0.0025 + 1), y1 / (z1 * 0.0025 + 1));
            context.lineTo(x2 / (z2 * 0.0025 + 1), y2 / (z2 * 0.0025 + 1));
            context.stroke();
        };
        geom.mid = (p1, p2) => {
            if (p1.length === p2.length) {
                const result = [];
                for (let i = 0; i < p1.length; i++) {
                    result[i] = (p1[i] + p2[i]) / 2;
                }
                return result;
            }
            else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };
        geom.parallelogramA = (l, w) => {
            return l * w;
        };
        geom.parallelogramP = (l, w) => {
            return 2 * (l + w);
        };
        geom.polygonA = (n, s, a) => {
            return (n * s * a) / 2;
        };
        geom.polygonP = (n, s) => {
            return n * s;
        };
        geom.Pythagorean = (a, b, type = "hyp") => {
            if (type === "hyp") {
                return Math.sqrt(a * a + b * b);
            }
            else {
                return Math.sqrt(b * b - a * a);
            }
        };
        geom.PythagoreanTriple = (inf, sup) => {
            const a = 2 * Math.round(Chalkboard.numb.random(inf, sup)) - 1, b = (a * a) / 2 - 0.5, c = (a * a) / 2 + 0.5;
            return [a, b, c];
        };
        geom.rectangularprismA = (l, w, h) => {
            return 2 * (l * h + l * w + w * h);
        };
        geom.rectangularprismV = (l, w, h) => {
            return l * w * h;
        };
        geom.sectorA = (r, rad) => {
            return (r * r * rad) / 2;
        };
        geom.sectorP = (r, rad) => {
            return r * rad;
        };
        geom.sphereA = (r) => {
            return 4 * Chalkboard.PI() * r * r;
        };
        geom.sphereV = (r) => {
            return (4 * Chalkboard.PI() * r * r * r) / 3;
        };
        geom.squareA = (s) => {
            return s * s;
        };
        geom.squareP = (s) => {
            return 4 * s;
        };
        geom.trapezoidA = (b1, b2, h) => {
            return ((b1 + b2) / 2) * h;
        };
        geom.trapezoidP = (a, b, c, d) => {
            return a + b + c + d;
        };
        geom.triangleA = (b, h) => {
            return (b * h) / 2;
        };
        geom.triangleP = (a, b, c) => {
            return a + b + c;
        };
        geom.trianglesidesA = (a, b, c) => {
            const s = (a + b + c) / 2;
            return Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c)));
        };
        geom.triangularprismA = (a, b, c, h) => {
            const s = (a + b + c) / 2;
            return 2 * Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c))) + h * (a + b + c);
        };
        geom.triangularprismV = (a, b, c, h) => {
            return (h * Chalkboard.real.sqrt(-(a * a * a * a) + 2 * (a * b) * (a * b) + 2 * (a * c) * (a * c) - b * b * b * b + 2 * (b * c) * (b * c) - c * c * c * c)) / 4;
        };
    })(geom = Chalkboard.geom || (Chalkboard.geom = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let matr;
    (function (matr_1) {
        const $ = (input) => {
            const v = input;
            if (v && typeof v.x === "number" && typeof v.y === "number") {
                return input;
            }
            if (Array.isArray(input)) {
                if (input.length > 0 && Array.isArray(input[0])) {
                    const matr = input;
                    const rows = Chalkboard.matr.rows(matr);
                    const cols = Chalkboard.matr.cols(matr);
                    if (cols === 1) {
                        if (rows === 2)
                            return Chalkboard.vect.init(matr[0][0], matr[1][0]);
                        if (rows === 3)
                            return Chalkboard.vect.init(matr[0][0], matr[1][0], matr[2][0]);
                        if (rows === 4)
                            return Chalkboard.vect.init(matr[0][0], matr[1][0], matr[2][0], matr[3][0]);
                    }
                    else if (rows === 1) {
                        if (cols === 2)
                            return Chalkboard.vect.init(matr[0][0], matr[0][1]);
                        if (cols === 3)
                            return Chalkboard.vect.init(matr[0][0], matr[0][1], matr[0][2]);
                        if (cols === 4)
                            return Chalkboard.vect.init(matr[0][0], matr[0][1], matr[0][2], matr[0][3]);
                    }
                }
                else {
                    const arr = input;
                    if (arr.length === 2)
                        return Chalkboard.vect.init(arr[0], arr[1]);
                    if (arr.length === 3)
                        return Chalkboard.vect.init(arr[0], arr[1], arr[2]);
                    if (arr.length === 4)
                        return Chalkboard.vect.init(arr[0], arr[1], arr[2], arr[3]);
                }
            }
            if (input instanceof Float32Array || input instanceof Float64Array) {
                const arr = input;
                if (arr.length === 2)
                    return Chalkboard.vect.init(arr[0], arr[1]);
                if (arr.length === 3)
                    return Chalkboard.vect.init(arr[0], arr[1], arr[2]);
                if (arr.length === 4)
                    return Chalkboard.vect.init(arr[0], arr[1], arr[2], arr[3]);
            }
            if (typeof input === "string") {
                try {
                    const parsed = JSON.parse(input);
                    if (parsed && typeof parsed === "object" && typeof parsed.x === "number" && typeof parsed.y === "number") {
                        return Chalkboard.vect.init(parsed.x, parsed.y, parsed.z !== undefined ? parsed.z : undefined, parsed.w !== undefined ? parsed.w : undefined);
                    }
                }
                catch (e) {
                    const str = input.trim();
                    if (str.startsWith("(") && str.endsWith(")")) {
                        const content = str.substring(1, str.length - 1);
                        const components = content.split(",").map(part => parseFloat(part.trim()));
                        if (components.length >= 2 && components.every(p => !isNaN(p))) {
                            if (components.length === 2)
                                return Chalkboard.vect.init(components[0], components[1]);
                            if (components.length === 3)
                                return Chalkboard.vect.init(components[0], components[1], components[2]);
                            if (components.length === 4)
                                return Chalkboard.vect.init(components[0], components[1], components[2], components[3]);
                        }
                    }
                }
            }
            throw new TypeError(`Invalid ChalkboardVector input: ${JSON.stringify(input)}`);
        };
        matr_1.absolute = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1])], [Math.abs(matr[1][0]), Math.abs(matr[1][1])]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2])], [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2])], [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2])]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([Math.abs(matr[0][0]), Math.abs(matr[0][1]), Math.abs(matr[0][2]), Math.abs(matr[0][3])], [Math.abs(matr[1][0]), Math.abs(matr[1][1]), Math.abs(matr[1][2]), Math.abs(matr[1][3])], [Math.abs(matr[2][0]), Math.abs(matr[2][1]), Math.abs(matr[2][2]), Math.abs(matr[2][3])], [Math.abs(matr[3][0]), Math.abs(matr[3][1]), Math.abs(matr[3][2]), Math.abs(matr[3][3])]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Math.abs(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_1.add = (matr1, matr2) => {
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2)) {
                    return Chalkboard.matr.init([matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1]], [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 3)) {
                    return Chalkboard.matr.init([matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1], matr1[0][2] + matr2[0][2]], [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1], matr1[1][2] + matr2[1][2]], [matr1[2][0] + matr2[2][0], matr1[2][1] + matr2[2][1], matr1[2][2] + matr2[2][2]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4)) {
                    return Chalkboard.matr.init([matr1[0][0] + matr2[0][0], matr1[0][1] + matr2[0][1], matr1[0][2] + matr2[0][2], matr1[0][3] + matr2[0][3]], [matr1[1][0] + matr2[1][0], matr1[1][1] + matr2[1][1], matr1[1][2] + matr2[1][2], matr1[1][3] + matr2[1][3]], [matr1[2][0] + matr2[2][0], matr1[2][1] + matr2[2][1], matr1[2][2] + matr2[2][2], matr1[2][3] + matr2[2][3]], [matr1[3][0] + matr2[3][0], matr1[3][1] + matr2[3][1], matr1[3][2] + matr2[3][2], matr1[3][3] + matr2[3][3]]);
                }
                else {
                    const result = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                            result[i][j] = matr1[i][j] + matr2[i][j];
                        }
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of rows and columns.');
            }
        };
        matr_1.addKronecker = (matr1, matr2) => {
            if (Chalkboard.matr.isSquare(matr1) && Chalkboard.matr.isSquare(matr2)) {
                return Chalkboard.matr.add(Chalkboard.matr.mulKronecker(matr1, Chalkboard.matr.identity(Chalkboard.matr.rows(matr1))), Chalkboard.matr.mulKronecker(Chalkboard.matr.identity(Chalkboard.matr.rows(matr2)), matr2));
            }
            else {
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" that are square.');
            }
        };
        matr_1.adjugate = (matr, row, col) => {
            return Chalkboard.matr.transpose(Chalkboard.matr.cofactor(matr, row, col));
        };
        matr_1.Cholesky = (matr) => {
            if (!Chalkboard.matr.isSquare(matr))
                throw new TypeError('Chalkboard.matr.Cholesky: Parameter "matr" must be a square matrix.');
            if (!Chalkboard.matr.isSymmetric(matr))
                throw new TypeError('Chalkboard.matr.Cholesky: Parameter "matr" must be symmetric.');
            const n = Chalkboard.matr.rows(matr);
            const L = Chalkboard.matr.fill(0, n);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j <= i; j++) {
                    let sum = matr[i][j];
                    for (let k = 0; k < j; k++) {
                        sum -= L[i][k] * L[j][k];
                    }
                    if (i === j) {
                        if (sum <= 0)
                            throw new RangeError('Chalkboard.matr.Cholesky: Matrix is not positive definite.');
                        L[i][j] = Chalkboard.real.sqrt(sum);
                    }
                    else {
                        L[i][j] = sum / L[j][j];
                    }
                }
            }
            return { L: L, U: Chalkboard.matr.transpose(L) };
        };
        matr_1.cofactor = (matr, row, col) => {
            return matr.slice(0, row).concat(matr.slice(row + 1)).map((row) => row.slice(0, col).concat(row.slice(col + 1)));
        };
        matr_1.cols = (matr) => {
            return matr[0].length;
        };
        matr_1.colspace = (matr) => {
            return Chalkboard.matr.transpose(Chalkboard.matr.rowspace(Chalkboard.matr.transpose(matr)));
        };
        matr_1.concat = (matr1, matr2, axis = 0) => {
            if (axis === 0) {
                if (Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2)) {
                    if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.rows(matr2) === 2) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1]], [matr1[1][0], matr1[1][1]], [matr2[0][0], matr2[0][1]], [matr2[1][0], matr2[1][1]]);
                    }
                    else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.rows(matr2) === 3) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2]], [matr1[1][0], matr1[1][1], matr1[1][2]], [matr1[2][0], matr1[2][1], matr1[2][2]], [matr2[0][0], matr2[0][1], matr2[0][2]], [matr2[1][0], matr2[1][1], matr2[1][2]], [matr2[2][0], matr2[2][1], matr2[2][2]]);
                    }
                    else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.rows(matr2) === 4) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2], matr1[0][3]], [matr1[1][0], matr1[1][1], matr1[1][2], matr1[1][3]], [matr1[2][0], matr1[2][1], matr1[2][2], matr1[2][3]], [matr1[3][0], matr1[3][1], matr1[3][2], matr1[3][3]], [matr2[0][0], matr2[0][1], matr2[0][2], matr2[0][3]], [matr2[1][0], matr2[1][1], matr2[1][2], matr2[1][3]], [matr2[2][0], matr2[2][1], matr2[2][2], matr2[2][3]], [matr2[3][0], matr2[3][1], matr2[3][2], matr2[3][3]]);
                    }
                    else {
                        return Chalkboard.matr.init(matr1.concat(matr2));
                    }
                }
                else {
                    throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of columns.');
                }
            }
            else if (axis === 1) {
                if (Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2)) {
                    if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.cols(matr2) === 2) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr2[0][0], matr2[0][1]], [matr1[1][0], matr1[1][1], matr2[1][0], matr2[1][1]]);
                    }
                    else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.cols(matr2) === 3) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2], matr2[0][0], matr2[0][1], matr2[0][2]], [matr1[1][0], matr1[1][1], matr1[1][2], matr2[1][0], matr2[1][1], matr2[1][2]], [matr1[2][0], matr1[2][1], matr1[2][2], matr2[2][0], matr2[2][1], matr2[2][2]]);
                    }
                    else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.cols(matr2) === 4) {
                        return Chalkboard.matr.init([matr1[0][0], matr1[0][1], matr1[0][2], matr1[0][3], matr2[0][0], matr2[0][1], matr2[0][2], matr2[0][3]], [matr1[1][0], matr1[1][1], matr1[1][2], matr1[1][3], matr2[1][0], matr2[1][1], matr2[1][2], matr2[1][3]], [matr1[2][0], matr1[2][1], matr1[2][2], matr1[2][3], matr2[2][0], matr2[2][1], matr2[2][2], matr2[2][3]], [matr1[3][0], matr1[3][1], matr1[3][2], matr1[3][3], matr2[3][0], matr2[3][1], matr2[3][2], matr2[3][3]]);
                    }
                    else {
                        const result = Chalkboard.matr.init();
                        for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                            result.push(matr1[i].concat(matr2[i]));
                        }
                        return result;
                    }
                }
                else {
                    throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of rows.');
                }
            }
            else {
                throw new TypeError('Parameter "axis" must be 0 or 1.');
            }
        };
        matr_1.constrain = (matr, range = [0, 1]) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range)], [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range), Chalkboard.numb.constrain(matr[0][2], range)], [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range), Chalkboard.numb.constrain(matr[1][2], range)], [Chalkboard.numb.constrain(matr[2][0], range), Chalkboard.numb.constrain(matr[2][1], range), Chalkboard.numb.constrain(matr[2][2], range)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range), Chalkboard.numb.constrain(matr[0][2], range), Chalkboard.numb.constrain(matr[0][3], range)], [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range), Chalkboard.numb.constrain(matr[1][2], range), Chalkboard.numb.constrain(matr[1][3], range)], [Chalkboard.numb.constrain(matr[2][0], range), Chalkboard.numb.constrain(matr[2][1], range), Chalkboard.numb.constrain(matr[2][2], range), Chalkboard.numb.constrain(matr[2][3], range)], [Chalkboard.numb.constrain(matr[3][0], range), Chalkboard.numb.constrain(matr[3][1], range), Chalkboard.numb.constrain(matr[3][2], range), Chalkboard.numb.constrain(matr[3][3], range)]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Chalkboard.numb.constrain(matr[i][j], range);
                    }
                }
                return result;
            }
        };
        matr_1.copy = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1]], [matr[1][0], matr[1][1]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2]], [matr[1][0], matr[1][1], matr[1][2]], [matr[2][0], matr[2][1], matr[2][2]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2], matr[0][3]], [matr[1][0], matr[1][1], matr[1][2], matr[1][3]], [matr[2][0], matr[2][1], matr[2][2], matr[2][3]], [matr[3][0], matr[3][1], matr[3][2], matr[3][3]]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result.push([]);
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i].push(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_1.det = (matr) => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                }
                else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0];
                }
                else if (Chalkboard.matr.rows(matr) === 3) {
                    return matr[0][0] * (matr[1][1] * matr[2][2] - matr[1][2] * matr[2][1]) - matr[0][1] * (matr[1][0] * matr[2][2] - matr[1][2] * matr[2][0]) + matr[0][2] * (matr[1][0] * matr[2][1] - matr[1][1] * matr[2][0]);
                }
                else if (Chalkboard.matr.rows(matr) === 4) {
                    return matr[0][0] * (matr[1][1] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) - matr[1][2] * (matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1]) + matr[1][3] * (matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1])) - matr[0][1] * (matr[1][0] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) - matr[1][2] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0])) + matr[0][2] * (matr[1][0] * (matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1]) - matr[1][1] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0])) - matr[0][3] * (matr[1][0] * (matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1]) - matr[1][1] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0]) + matr[1][2] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0]));
                }
                else {
                    let result = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        const cofactor = matr[0][i] * Chalkboard.matr.det(Chalkboard.matr.cofactor(matr, 0, i));
                        result += i % 2 === 0 ? cofactor : -cofactor;
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_1.diagonal = (size, ...elements) => {
            if (size === 2) {
                return Chalkboard.matr.init([elements[0] || 0, 0], [0, elements[1] || 0]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([elements[0] || 0, 0, 0], [0, elements[1] || 0, 0], [0, 0, elements[2] || 0]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([elements[0] || 0, 0, 0, 0], [0, elements[1] || 0, 0, 0], [0, 0, elements[2] || 0, 0], [0, 0, 0, elements[3] || 0]);
            }
            else {
                elements = Array.isArray(elements[0]) ? elements[0] : elements;
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push(Array(size).fill(0));
                    result[i][i] = elements[i] || 0;
                }
                return result;
            }
        };
        matr_1.eigenvalue = (matr, maxIterations = 100) => {
            let v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            for (let i = 0; i < maxIterations; i++) {
                const matrv = Chalkboard.matr.mul(matr, v);
                const max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(Chalkboard.matr.toArray(matrv).map((i) => i / max), Chalkboard.matr.rows(matr), 1);
            }
            const dot = function (v1, v2) {
                let result = 0;
                for (let i = 0; i < v1.length; i++) {
                    result += v1[i] * v2[i];
                }
                return result;
            };
            return (dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(Chalkboard.matr.mul(matr, v))) /
                dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(v)));
        };
        matr_1.eigenvector = (matr, maxIterations = 100) => {
            let v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            for (let i = 0; i < maxIterations; i++) {
                const matrv = Chalkboard.matr.mul(matr, v);
                const max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(Chalkboard.matr.toArray(matrv).map((i) => i / max), Chalkboard.matr.rows(matr), 1);
            }
            const result = Chalkboard.matr.toArray(v);
            return result;
        };
        matr_1.empty = (rows, cols = rows) => {
            const _null = null;
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([_null, _null], [_null, _null]);
            }
            else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([_null, _null, _null], [_null, _null, _null], [_null, _null, _null]);
            }
            else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([_null, _null, _null, _null], [_null, _null, _null, _null], [_null, _null, _null, _null], [_null, _null, _null, _null]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result.push([]);
                    for (let j = 0; j < cols; j++) {
                        result[i].push(_null);
                    }
                }
                return result;
            }
        };
        matr_1.exchange = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([0, 1], [1, 0]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([0, 0, 1], [0, 1, 0], [1, 0, 0]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]);
            }
            else {
                const result = Chalkboard.matr.fill(0, size, size);
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        if (i + j === size - 1) {
                            result[i][j] = 1;
                        }
                    }
                }
                return result;
            }
        };
        matr_1.fill = (element, rows, cols = rows) => {
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([element, element], [element, element]);
            }
            else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([element, element, element], [element, element, element], [element, element, element]);
            }
            else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([element, element, element, element], [element, element, element, element], [element, element, element, element], [element, element, element, element]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result.push([]);
                    for (let j = 0; j < cols; j++) {
                        result[i].push(element);
                    }
                }
                return result;
            }
        };
        matr_1.Gaussian = (matr) => {
            let lead = 0;
            for (let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                if (lead >= Chalkboard.matr.cols(matr)) {
                    break;
                }
                let i = row;
                while (matr[i][lead] === 0) {
                    i++;
                    if (i === Chalkboard.matr.rows(matr)) {
                        i = row;
                        lead++;
                        if (Chalkboard.matr.cols(matr) === lead) {
                            return matr;
                        }
                    }
                }
                const temp = matr[i];
                matr[i] = matr[row];
                matr[row] = temp;
                const scl = matr[row][lead];
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    matr[row][j] /= scl;
                }
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    if (i !== row) {
                        const coeff = matr[i][lead];
                        for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            matr[i][j] -= coeff * matr[row][j];
                        }
                    }
                }
                lead++;
            }
            return matr;
        };
        matr_1.Hilbert = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([1 / 1, 1 / 2], [1 / 2, 1 / 3]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3], [1 / 2, 1 / 3, 1 / 4], [1 / 3, 1 / 4, 1 / 5]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3, 1 / 4], [1 / 2, 1 / 3, 1 / 4, 1 / 5], [1 / 3, 1 / 4, 1 / 5, 1 / 6], [1 / 4, 1 / 5, 1 / 6, 1 / 7]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(1 / (i + j + 1));
                    }
                }
                return result;
            }
        };
        matr_1.identity = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([1, 0], [0, 1]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([1, 0, 0], [0, 1, 0], [0, 0, 1]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push(Array(size).fill(0));
                    result[i][i] = 1;
                }
                return result;
            }
        };
        matr_1.init = (...matrix) => {
            if (matrix.length === 0) {
                return [];
            }
            else if (Array.isArray(matrix[0]) && Array.isArray(matrix[0][0])) {
                return matrix[0];
            }
            else {
                return matrix;
            }
        };
        matr_1.invert = (matr) => {
            if (Chalkboard.matr.isInvertible(matr)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    const det = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init([matr[1][1] / det, -matr[0][1] / det], [-matr[1][0] / det, matr[0][0] / det]);
                }
                else if (Chalkboard.matr.rows(matr) === 3) {
                    const det = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init([(matr[1][1] * matr[2][2] - matr[1][2] * matr[2][1]) / det, (matr[0][2] * matr[2][1] - matr[0][1] * matr[2][2]) / det, (matr[0][1] * matr[1][2] - matr[0][2] * matr[1][1]) / det], [(matr[1][2] * matr[2][0] - matr[1][0] * matr[2][2]) / det, (matr[0][0] * matr[2][2] - matr[0][2] * matr[2][0]) / det, (matr[0][2] * matr[1][0] - matr[0][0] * matr[1][2]) / det], [(matr[1][0] * matr[2][1] - matr[1][1] * matr[2][0]) / det, (matr[0][1] * matr[2][0] - matr[0][0] * matr[2][1]) / det, (matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0]) / det]);
                }
                else if (Chalkboard.matr.rows(matr) === 4) {
                    const det = Chalkboard.matr.det(matr);
                    const adj00 = matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0], adj01 = matr[0][0] * matr[1][2] - matr[0][2] * matr[1][0], adj02 = matr[0][0] * matr[1][3] - matr[0][3] * matr[1][0], adj03 = matr[0][1] * matr[1][2] - matr[0][2] * matr[1][1], adj04 = matr[0][1] * matr[1][3] - matr[0][3] * matr[1][1], adj05 = matr[0][2] * matr[1][3] - matr[0][3] * matr[1][2], adj06 = matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0], adj07 = matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0], adj08 = matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0], adj09 = matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1], adj10 = matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1], adj11 = matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2];
                    return Chalkboard.matr.init([(matr[1][1] * adj11 - matr[1][2] * adj10 + matr[1][3] * adj09) / det, (matr[0][2] * adj10 - matr[0][1] * adj11 - matr[0][3] * adj09) / det, (matr[3][1] * adj05 - matr[3][2] * adj04 + matr[3][3] * adj03) / det, (matr[2][2] * adj04 - matr[2][1] * adj05 - matr[2][3] * adj03) / det], [(matr[1][2] * adj08 - matr[1][0] * adj11 - matr[1][3] * adj07) / det, (matr[0][0] * adj11 - matr[0][2] * adj08 + matr[0][3] * adj07) / det, (matr[3][2] * adj02 - matr[3][0] * adj05 - matr[3][3] * adj01) / det, (matr[2][0] * adj05 - matr[2][2] * adj02 + matr[2][3] * adj01) / det], [(matr[1][0] * adj10 - matr[1][1] * adj08 + matr[1][3] * adj06) / det, (matr[0][1] * adj08 - matr[0][0] * adj10 - matr[0][3] * adj06) / det, (matr[3][0] * adj04 - matr[3][1] * adj02 + matr[3][3] * adj00) / det, (matr[2][1] * adj02 - matr[2][0] * adj04 - matr[2][3] * adj00) / det], [(matr[1][1] * adj07 - matr[1][0] * adj09 - matr[1][2] * adj06) / det, (matr[0][0] * adj09 - matr[0][1] * adj07 + matr[0][2] * adj06) / det, (matr[3][1] * adj01 - matr[3][0] * adj03 - matr[3][2] * adj00) / det, (matr[2][0] * adj03 - matr[2][1] * adj01 + matr[2][2] * adj00) / det]);
                }
                else {
                    const result = Chalkboard.matr.init();
                    const augmented = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        augmented.push(matr[i].concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
                        augmented[i][Chalkboard.matr.cols(matr) + i] = 1;
                    }
                    for (let row = 0; row < Chalkboard.matr.rows(matr); row++) {
                        let diagonal = augmented[row][row];
                        if (diagonal === 0) {
                            let max = row;
                            for (let i = row + 1; i < Chalkboard.matr.rows(matr); i++) {
                                if (Math.abs(augmented[i][row]) > Math.abs(augmented[max][row])) {
                                    max = i;
                                }
                            }
                            const temp = augmented[row];
                            augmented[row] = augmented[max];
                            augmented[max] = temp;
                            diagonal = augmented[row][row];
                        }
                        for (let col = 0; col < 2 * Chalkboard.matr.cols(matr); col++) {
                            augmented[row][col] /= diagonal;
                        }
                        for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                            if (i !== row) {
                                const coeff = augmented[i][row];
                                for (let j = 0; j < 2 * Chalkboard.matr.cols(matr); j++) {
                                    augmented[i][j] -= coeff * augmented[row][j];
                                }
                            }
                        }
                    }
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        result.push(augmented[i].slice(Chalkboard.matr.cols(matr), 2 * Chalkboard.matr.cols(matr)));
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square and has a non-zero determinant.');
            }
        };
        matr_1.isApproxEqual = (matr1, matr2, precision = 0.000001) => {
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                    for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                        if (!Chalkboard.numb.isApproxEqual(matr1[i][j], matr2[i][j], precision)) {
                            return false;
                        }
                    }
                }
                return true;
            }
            else {
                return false;
            }
        };
        matr_1.isDiagonal = (matr) => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.numb.isApproxEqual(matr[0][1], 0) && Chalkboard.numb.isApproxEqual(matr[1][0], 0);
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.numb.isApproxEqual(matr[0][1], 0) && Chalkboard.numb.isApproxEqual(matr[0][2], 0) && Chalkboard.numb.isApproxEqual(matr[1][0], 0) && Chalkboard.numb.isApproxEqual(matr[1][2], 0) && Chalkboard.numb.isApproxEqual(matr[2][0], 0) && Chalkboard.numb.isApproxEqual(matr[2][1], 0);
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.numb.isApproxEqual(matr[0][1], 0) && Chalkboard.numb.isApproxEqual(matr[0][2], 0) && Chalkboard.numb.isApproxEqual(matr[0][3], 0) && Chalkboard.numb.isApproxEqual(matr[1][0], 0) && Chalkboard.numb.isApproxEqual(matr[1][2], 0) && Chalkboard.numb.isApproxEqual(matr[1][3], 0) && Chalkboard.numb.isApproxEqual(matr[2][0], 0) && Chalkboard.numb.isApproxEqual(matr[2][1], 0) && Chalkboard.numb.isApproxEqual(matr[2][3], 0) && Chalkboard.numb.isApproxEqual(matr[3][0], 0) && Chalkboard.numb.isApproxEqual(matr[3][1], 0) && Chalkboard.numb.isApproxEqual(matr[3][2], 0);
                }
                else {
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            if (i !== j && !Chalkboard.numb.isApproxEqual(matr[i][j], 0))
                                return false;
                        }
                    }
                    return true;
                }
            }
            else {
                return false;
            }
        };
        matr_1.isEqual = (matr1, matr2) => {
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2)) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1];
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 3)) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[0][2] === matr2[0][2] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1] && matr1[1][2] === matr2[1][2] && matr1[2][0] === matr2[2][0] && matr1[2][1] === matr2[2][1] && matr1[2][2] === matr2[2][2];
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4)) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[0][2] === matr2[0][2] && matr1[0][3] === matr2[0][3] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1] && matr1[1][2] === matr2[1][2] && matr1[1][3] === matr2[1][3] && matr1[2][0] === matr2[2][0] && matr1[2][1] === matr2[2][1] && matr1[2][2] === matr2[2][2] && matr1[2][3] === matr2[2][3] && matr1[3][0] === matr2[3][0] && matr1[3][1] === matr2[3][1] && matr1[3][2] === matr2[3][2] && matr1[3][3] === matr2[3][3];
                }
                else {
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        for (let j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            if (!(matr1[i][j] === matr2[i][j]))
                                return false;
                        }
                    }
                    return true;
                }
            }
            else {
                return false;
            }
        };
        matr_1.isIdentity = (matr) => {
            if (Chalkboard.matr.isDiagonal(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(2));
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(3));
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(4));
                }
                else {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.identity(Chalkboard.matr.rows(matr)));
                }
            }
            else {
                return false;
            }
        };
        matr_1.isInvertible = (matr) => {
            return Chalkboard.matr.isSquare(matr) && Chalkboard.matr.det(matr) !== 0;
        };
        matr_1.isLowerTriangular = (matr) => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], 0], [matr[1][0], matr[1][1]]));
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], 0, 0], [matr[1][0], matr[1][1], 0], [matr[2][0], matr[2][1], matr[2][2]]));
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], 0, 0, 0], [matr[1][0], matr[1][1], 0, 0], [matr[2][0], matr[2][1], matr[2][2], 0], [matr[3][0], matr[3][1], matr[3][2], matr[3][3]]));
                }
                else {
                    let score = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (let j = i + 1; j < Chalkboard.matr.cols(matr); j++) {
                            if (matr[i][j] !== 0)
                                score++;
                        }
                    }
                    return score === 0;
                }
            }
            else {
                return false;
            }
        };
        matr_1.isOrthogonal = (matr) => {
            if (Chalkboard.matr.isInvertible(matr)) {
                return Chalkboard.matr.isApproxEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.invert(matr));
            }
            else {
                return false;
            }
        };
        matr_1.isSizeEqual = (matr1, matr2) => {
            return Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2);
        };
        matr_1.isSizeOf = (matr, rows, cols = rows) => {
            return Chalkboard.matr.rows(matr) === rows && Chalkboard.matr.cols(matr) === cols;
        };
        matr_1.isSkewSymmetric = (matr) => {
            return Chalkboard.matr.isEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.negate(matr));
        };
        matr_1.isSquare = (matr) => {
            return Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr);
        };
        matr_1.isSymmetric = (matr) => {
            return Chalkboard.matr.isEqual(matr, Chalkboard.matr.transpose(matr));
        };
        matr_1.isUpperTriangular = (matr) => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], matr[0][1]], [0, matr[1][1]]));
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2]], [0, matr[1][1], matr[1][2]], [0, 0, matr[2][2]]));
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.init([matr[0][0], matr[0][1], matr[0][2], matr[0][3]], [0, matr[1][1], matr[1][2], matr[1][3]], [0, 0, matr[2][2], matr[2][3]], [0, 0, 0, matr[3][3]]));
                }
                else {
                    let score = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (let j = 0; j < i; j++) {
                            if (matr[i][j] !== 0)
                                score++;
                        }
                    }
                    return score === 0;
                }
            }
            else {
                return false;
            }
        };
        matr_1.isZero = (matr) => {
            return Chalkboard.matr.isApproxEqual(matr, Chalkboard.matr.zero(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)));
        };
        matr_1.Lehmer = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([1 / 1, 1 / 2], [1 / 2, 1 / 1]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3], [1 / 2, 1 / 1, 2 / 3], [1 / 3, 2 / 3, 1 / 1]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([1 / 1, 1 / 2, 1 / 3, 1 / 4], [1 / 2, 1 / 1, 2 / 3, 1 / 2], [1 / 3, 2 / 3, 1 / 1, 3 / 4], [1 / 4, 1 / 1, 3 / 4, 1 / 1]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(Math.min(i + 1, j + 1) / Math.max(i + 1, j + 1));
                    }
                }
                return result;
            }
        };
        matr_1.lowerBinomial = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([1, 0], [1, 1]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([1, 0, 0], [1, 1, 0], [1, 2, 1]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([1, 0, 0, 0], [1, 1, 0, 0], [1, 2, 1, 0], [1, 3, 3, 1]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(Chalkboard.numb.binomial(i, j));
                    }
                }
                return result;
            }
        };
        matr_1.lowerShift = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([0, 0], [1, 0]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([0, 0, 0], [1, 0, 0], [0, 1, 0]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([0, 0, 0, 0], [1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = Chalkboard.numb.Kronecker(i, j + 1);
                    }
                }
                return result;
            }
        };
        matr_1.lowerTriangular = (size, ...elements) => {
            if (size === 2) {
                return Chalkboard.matr.init([elements[0] || 0, 0], [elements[1] || 0, elements[2] || 0]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([elements[0] || 0, 0, 0], [elements[1] || 0, elements[2] || 0, 0], [elements[3] || 0, elements[4] || 0, elements[5] || 0]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([elements[0] || 0, 0, 0, 0], [elements[1] || 0, elements[2] || 0, 0, 0], [elements[3] || 0, elements[4] || 0, elements[5] || 0, 0], [elements[6] || 0, elements[7] || 0, elements[8] || 0, elements[9] || 0]);
            }
            else {
                elements = Array.isArray(elements[0]) ? elements[0] : elements;
                const result = Chalkboard.matr.init();
                let index = 0;
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = j <= i ? elements[index++] || 0 : 0;
                    }
                }
                return result;
            }
        };
        matr_1.LUdecomp = (matr) => {
            if (Chalkboard.matr.isSquare(matr)) {
                const L = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)), U = Chalkboard.matr.fill(0, Chalkboard.matr.rows(matr));
                for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    for (let i = 0; i <= j; i++) {
                        let sum = 0;
                        for (let k = 0; k < i; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        U[i][j] = matr[i][j] - sum;
                    }
                    for (let i = j + 1; i < Chalkboard.matr.rows(matr); i++) {
                        let sum = 0;
                        for (let k = 0; k < j; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        L[i][j] = (matr[i][j] - sum) / U[j][j];
                    }
                }
                return { L: L, U: U };
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_1.mul = (matr1, matr2) => {
            if (Chalkboard.matr.cols(matr1) === Chalkboard.matr.rows(matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.isSizeOf(matr2, 2, 1)) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0]], [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.isSizeOf(matr2, 2)) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1]], [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.isSizeOf(matr2, 3, 1)) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0]], [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0]], [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.isSizeOf(matr2, 3)) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1], matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2]], [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1], matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2]], [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0], matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1], matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4, 1)) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0]], [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0]], [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0]], [matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4)) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0], matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1] + matr1[0][3] * matr2[3][1], matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2] + matr1[0][3] * matr2[3][2], matr1[0][0] * matr2[0][3] + matr1[0][1] * matr2[1][3] + matr1[0][2] * matr2[2][3] + matr1[0][3] * matr2[3][3]], [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0], matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1] + matr1[1][3] * matr2[3][1], matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2] + matr1[1][3] * matr2[3][2], matr1[1][0] * matr2[0][3] + matr1[1][1] * matr2[1][3] + matr1[1][2] * matr2[2][3] + matr1[1][3] * matr2[3][3]], [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0], matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1] + matr1[2][3] * matr2[3][1], matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2] + matr1[2][3] * matr2[3][2], matr1[2][0] * matr2[0][3] + matr1[2][1] * matr2[1][3] + matr1[2][2] * matr2[2][3] + matr1[2][3] * matr2[3][3]], [matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0], matr1[3][0] * matr2[0][1] + matr1[3][1] * matr2[1][1] + matr1[3][2] * matr2[2][1] + matr1[3][3] * matr2[3][1], matr1[3][0] * matr2[0][2] + matr1[3][1] * matr2[1][2] + matr1[3][2] * matr2[2][2] + matr1[3][3] * matr2[3][2], matr1[3][0] * matr2[0][3] + matr1[3][1] * matr2[1][3] + matr1[3][2] * matr2[2][3] + matr1[3][3] * matr2[3][3]]);
                }
                else {
                    const result = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (let j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            result[i][j] = 0;
                            for (let k = 0; k < Chalkboard.matr.cols(matr1); k++) {
                                result[i][j] += matr1[i][k] * matr2[k][j];
                            }
                        }
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" where the numbers of columns of "matr1" must be equivalent to the number of rows of "matr2".');
            }
        };
        matr_1.mulKronecker = (matr1, matr2) => {
            if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.isSizeOf(matr2, 2)) {
                return Chalkboard.matr.init([matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1]], [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1]], [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1]], [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.isSizeOf(matr2, 3)) {
                return Chalkboard.matr.init([matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][0] * matr2[0][2], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1], matr1[0][1] * matr2[0][2], matr1[0][2] * matr2[0][0], matr1[0][2] * matr2[0][1], matr1[0][2] * matr2[0][2]], [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][0] * matr2[1][2], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1], matr1[0][1] * matr2[1][2], matr1[0][2] * matr2[1][0], matr1[0][2] * matr2[1][1], matr1[0][2] * matr2[1][2]], [matr1[0][0] * matr2[2][0], matr1[0][0] * matr2[2][1], matr1[0][0] * matr2[2][2], matr1[0][1] * matr2[2][0], matr1[0][1] * matr2[2][1], matr1[0][1] * matr2[2][2], matr1[0][2] * matr2[2][0], matr1[0][2] * matr2[2][1], matr1[0][2] * matr2[2][2]], [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][0] * matr2[0][2], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1], matr1[1][1] * matr2[0][2], matr1[1][2] * matr2[0][0], matr1[1][2] * matr2[0][1], matr1[1][2] * matr2[0][2]], [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][0] * matr2[1][2], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1], matr1[1][1] * matr2[1][2], matr1[1][2] * matr2[1][0], matr1[1][2] * matr2[1][1], matr1[1][2] * matr2[1][2]], [matr1[1][0] * matr2[2][0], matr1[1][0] * matr2[2][1], matr1[1][0] * matr2[2][2], matr1[1][1] * matr2[2][0], matr1[1][1] * matr2[2][1], matr1[1][1] * matr2[2][2], matr1[1][2] * matr2[2][0], matr1[1][2] * matr2[2][1], matr1[1][2] * matr2[2][2]], [matr1[2][0] * matr2[0][0], matr1[2][0] * matr2[0][1], matr1[2][0] * matr2[0][2], matr1[2][1] * matr2[0][0], matr1[2][1] * matr2[0][1], matr1[2][1] * matr2[0][2], matr1[2][2] * matr2[0][0], matr1[2][2] * matr2[0][1], matr1[2][2] * matr2[0][2]], [matr1[2][0] * matr2[1][0], matr1[2][0] * matr2[1][1], matr1[2][0] * matr2[1][2], matr1[2][1] * matr2[1][0], matr1[2][1] * matr2[1][1], matr1[2][1] * matr2[1][2], matr1[2][2] * matr2[1][0], matr1[2][2] * matr2[1][1], matr1[2][2] * matr2[1][2]], [matr1[2][0] * matr2[2][0], matr1[2][0] * matr2[2][1], matr1[2][0] * matr2[2][2], matr1[2][1] * matr2[2][0], matr1[2][1] * matr2[2][1], matr1[2][1] * matr2[2][2], matr1[2][2] * matr2[2][0], matr1[2][2] * matr2[2][1], matr1[2][2] * matr2[2][2]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4)) {
                return Chalkboard.matr.init([matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][0] * matr2[0][2], matr1[0][0] * matr2[0][3], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1], matr1[0][1] * matr2[0][2], matr1[0][1] * matr2[0][3], matr1[0][2] * matr2[0][0], matr1[0][2] * matr2[0][1], matr1[0][2] * matr2[0][2], matr1[0][2] * matr2[0][3], matr1[0][3] * matr2[0][0], matr1[0][3] * matr2[0][1], matr1[0][3] * matr2[0][2], matr1[0][3] * matr2[0][3]], [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][0] * matr2[1][2], matr1[0][0] * matr2[1][3], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1], matr1[0][1] * matr2[1][2], matr1[0][1] * matr2[1][3], matr1[0][2] * matr2[1][0], matr1[0][2] * matr2[1][1], matr1[0][2] * matr2[1][2], matr1[0][2] * matr2[1][3], matr1[0][3] * matr2[1][0], matr1[0][3] * matr2[1][1], matr1[0][3] * matr2[1][2], matr1[0][3] * matr2[1][3]], [matr1[0][0] * matr2[2][0], matr1[0][0] * matr2[2][1], matr1[0][0] * matr2[2][2], matr1[0][0] * matr2[2][3], matr1[0][1] * matr2[2][0], matr1[0][1] * matr2[2][1], matr1[0][1] * matr2[2][2], matr1[0][1] * matr2[2][3], matr1[0][2] * matr2[2][0], matr1[0][2] * matr2[2][1], matr1[0][2] * matr2[2][2], matr1[0][2] * matr2[2][3], matr1[0][3] * matr2[2][0], matr1[0][3] * matr2[2][1], matr1[0][3] * matr2[2][2], matr1[0][3] * matr2[2][3]], [matr1[0][0] * matr2[3][0], matr1[0][0] * matr2[3][1], matr1[0][0] * matr2[3][2], matr1[0][0] * matr2[3][3], matr1[0][1] * matr2[3][0], matr1[0][1] * matr2[3][1], matr1[0][1] * matr2[3][2], matr1[0][1] * matr2[3][3], matr1[0][2] * matr2[3][0], matr1[0][2] * matr2[3][1], matr1[0][2] * matr2[3][2], matr1[0][2] * matr2[3][3], matr1[0][3] * matr2[3][0], matr1[0][3] * matr2[3][1], matr1[0][3] * matr2[3][2], matr1[0][3] * matr2[3][3]], [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][0] * matr2[0][2], matr1[1][0] * matr2[0][3], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1], matr1[1][1] * matr2[0][2], matr1[1][1] * matr2[0][3], matr1[1][2] * matr2[0][0], matr1[1][2] * matr2[0][1], matr1[1][2] * matr2[0][2], matr1[1][2] * matr2[0][3], matr1[1][3] * matr2[0][0], matr1[1][3] * matr2[0][1], matr1[1][3] * matr2[0][2], matr1[1][3] * matr2[0][3]], [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][0] * matr2[1][2], matr1[1][0] * matr2[1][3], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1], matr1[1][1] * matr2[1][2], matr1[1][1] * matr2[1][3], matr1[1][2] * matr2[1][0], matr1[1][2] * matr2[1][1], matr1[1][2] * matr2[1][2], matr1[1][2] * matr2[1][3], matr1[1][3] * matr2[1][0], matr1[1][3] * matr2[1][1], matr1[1][3] * matr2[1][2], matr1[1][3] * matr2[1][3]], [matr1[1][0] * matr2[2][0], matr1[1][0] * matr2[2][1], matr1[1][0] * matr2[2][2], matr1[1][0] * matr2[2][3], matr1[1][1] * matr2[2][0], matr1[1][1] * matr2[2][1], matr1[1][1] * matr2[2][2], matr1[1][1] * matr2[2][3], matr1[1][2] * matr2[2][0], matr1[1][2] * matr2[2][1], matr1[1][2] * matr2[2][2], matr1[1][2] * matr2[2][3], matr1[1][3] * matr2[2][0], matr1[1][3] * matr2[2][1], matr1[1][3] * matr2[2][2], matr1[1][3] * matr2[2][3]], [matr1[1][0] * matr2[3][0], matr1[1][0] * matr2[3][1], matr1[1][0] * matr2[3][2], matr1[1][0] * matr2[3][3], matr1[1][1] * matr2[3][0], matr1[1][1] * matr2[3][1], matr1[1][1] * matr2[3][2], matr1[1][1] * matr2[3][3], matr1[1][2] * matr2[3][0], matr1[1][2] * matr2[3][1], matr1[1][2] * matr2[3][2], matr1[1][2] * matr2[3][3], matr1[1][3] * matr2[3][0], matr1[1][3] * matr2[3][1], matr1[1][3] * matr2[3][2], matr1[1][3] * matr2[3][3]], [matr1[2][0] * matr2[0][0], matr1[2][0] * matr2[0][1], matr1[2][0] * matr2[0][2], matr1[2][0] * matr2[0][3], matr1[2][1] * matr2[0][0], matr1[2][1] * matr2[0][1], matr1[2][1] * matr2[0][2], matr1[2][1] * matr2[0][3], matr1[2][2] * matr2[0][0], matr1[2][2] * matr2[0][1], matr1[2][2] * matr2[0][2], matr1[2][2] * matr2[0][3], matr1[2][3] * matr2[0][0], matr1[2][3] * matr2[0][1], matr1[2][3] * matr2[0][2], matr1[2][3] * matr2[0][3]], [matr1[2][0] * matr2[1][0], matr1[2][0] * matr2[1][1], matr1[2][0] * matr2[1][2], matr1[2][0] * matr2[1][3], matr1[2][1] * matr2[1][0], matr1[2][1] * matr2[1][1], matr1[2][1] * matr2[1][2], matr1[2][1] * matr2[1][3], matr1[2][2] * matr2[1][0], matr1[2][2] * matr2[1][1], matr1[2][2] * matr2[1][2], matr1[2][2] * matr2[1][3], matr1[2][3] * matr2[1][0], matr1[2][3] * matr2[1][1], matr1[2][3] * matr2[1][2], matr1[2][3] * matr2[1][3]], [matr1[2][0] * matr2[2][0], matr1[2][0] * matr2[2][1], matr1[2][0] * matr2[2][2], matr1[2][0] * matr2[2][3], matr1[2][1] * matr2[2][0], matr1[2][1] * matr2[2][1], matr1[2][1] * matr2[2][2], matr1[2][1] * matr2[2][3], matr1[2][2] * matr2[2][0], matr1[2][2] * matr2[2][1], matr1[2][2] * matr2[2][2], matr1[2][2] * matr2[2][3], matr1[2][3] * matr2[2][0], matr1[2][3] * matr2[2][1], matr1[2][3] * matr2[2][2], matr1[2][3] * matr2[2][3]], [matr1[2][0] * matr2[3][0], matr1[2][0] * matr2[3][1], matr1[2][0] * matr2[3][2], matr1[2][0] * matr2[3][3], matr1[2][1] * matr2[3][0], matr1[2][1] * matr2[3][1], matr1[2][1] * matr2[3][2], matr1[2][1] * matr2[3][3], matr1[2][2] * matr2[3][0], matr1[2][2] * matr2[3][1], matr1[2][2] * matr2[3][2], matr1[2][2] * matr2[3][3], matr1[2][3] * matr2[3][0], matr1[2][3] * matr2[3][1], matr1[2][3] * matr2[3][2], matr1[2][3] * matr2[3][3]], [matr1[3][0] * matr2[0][0], matr1[3][0] * matr2[0][1], matr1[3][0] * matr2[0][2], matr1[3][0] * matr2[0][3], matr1[3][1] * matr2[0][0], matr1[3][1] * matr2[0][1], matr1[3][1] * matr2[0][2], matr1[3][1] * matr2[0][3], matr1[3][2] * matr2[0][0], matr1[3][2] * matr2[0][1], matr1[3][2] * matr2[0][2], matr1[3][2] * matr2[0][3], matr1[3][3] * matr2[0][0], matr1[3][3] * matr2[0][1], matr1[3][3] * matr2[0][2], matr1[3][3] * matr2[0][3]], [matr1[3][0] * matr2[1][0], matr1[3][0] * matr2[1][1], matr1[3][0] * matr2[1][2], matr1[3][0] * matr2[1][3], matr1[3][1] * matr2[1][0], matr1[3][1] * matr2[1][1], matr1[3][1] * matr2[1][2], matr1[3][1] * matr2[1][3], matr1[3][2] * matr2[1][0], matr1[3][2] * matr2[1][1], matr1[3][2] * matr2[1][2], matr1[3][2] * matr2[1][3], matr1[3][3] * matr2[1][0], matr1[3][3] * matr2[1][1], matr1[3][3] * matr2[1][2], matr1[3][3] * matr2[1][3]], [matr1[3][0] * matr2[2][0], matr1[3][0] * matr2[2][1], matr1[3][0] * matr2[2][2], matr1[3][0] * matr2[2][3], matr1[3][1] * matr2[2][0], matr1[3][1] * matr2[2][1], matr1[3][1] * matr2[2][2], matr1[3][1] * matr2[2][3], matr1[3][2] * matr2[2][0], matr1[3][2] * matr2[2][1], matr1[3][2] * matr2[2][2], matr1[3][2] * matr2[2][3], matr1[3][3] * matr2[2][0], matr1[3][3] * matr2[2][1], matr1[3][3] * matr2[2][2], matr1[3][3] * matr2[2][3]], [matr1[3][0] * matr2[3][0], matr1[3][0] * matr2[3][1], matr1[3][0] * matr2[3][2], matr1[3][0] * matr2[3][3], matr1[3][1] * matr2[3][0], matr1[3][1] * matr2[3][1], matr1[3][1] * matr2[3][2], matr1[3][1] * matr2[3][3], matr1[3][2] * matr2[3][0], matr1[3][2] * matr2[3][1], matr1[3][2] * matr2[3][2], matr1[3][2] * matr2[3][3], matr1[3][3] * matr2[3][0], matr1[3][3] * matr2[3][1], matr1[3][3] * matr2[3][2], matr1[3][3] * matr2[3][3]]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                    for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                        for (let k = 0; k < Chalkboard.matr.rows(matr2); k++) {
                            for (let l = 0; l < Chalkboard.matr.cols(matr2); l++) {
                                if (!result[i * Chalkboard.matr.rows(matr2) + k]) {
                                    result[i * Chalkboard.matr.rows(matr2) + k] = [];
                                }
                                result[i * Chalkboard.matr.rows(matr2) + k][j * Chalkboard.matr.cols(matr2) + l] = matr1[i][j] * matr2[k][l];
                            }
                        }
                    }
                }
                return result;
            }
        };
        matr_1.mulVector = (matr, vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 2);
                }
                else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                if (Chalkboard.matr.rows(matr) === 3) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 3);
                }
                else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                if (Chalkboard.matr.rows(matr) === 4) {
                    return Chalkboard.matr.toVector(Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect)), 4);
                }
                else {
                    return Chalkboard.matr.mul(matr, Chalkboard.vect.toMatrix(vect));
                }
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        matr_1.negate = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1]], [-matr[1][0], -matr[1][1]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1], -matr[0][2]], [-matr[1][0], -matr[1][1], -matr[1][2]], [-matr[2][0], -matr[2][1], -matr[2][2]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([-matr[0][0], -matr[0][1], -matr[0][2], -matr[0][3]], [-matr[1][0], -matr[1][1], -matr[1][2], -matr[1][3]], [-matr[2][0], -matr[2][1], -matr[2][2], -matr[2][3]], [-matr[3][0], -matr[3][1], -matr[3][2], -matr[3][3]]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = -matr[i][j];
                    }
                }
                return result;
            }
        };
        matr_1.norm = (matr, p = 2, q = 2) => {
            if (Chalkboard.matr.isSizeOf(matr, 2) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[0][3] * matr[0][3] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[1][3] * matr[1][3] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2] + matr[2][3] * matr[2][3] + matr[3][0] * matr[3][0] + matr[3][1] * matr[3][1] + matr[3][2] * matr[3][2] + matr[3][3] * matr[3][3]);
            }
            else {
                let result = 0;
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    let rowResult = 0;
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        rowResult += Chalkboard.real.pow(matr[i][j], p);
                    }
                    result += Chalkboard.real.pow(rowResult, q / p);
                }
                return Chalkboard.real.pow(result, 1 / q);
            }
        };
        matr_1.normalize = (matr, p = 2, q = 2) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q)], [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q), matr[0][2] / Chalkboard.matr.norm(matr, p, q)], [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q), matr[1][2] / Chalkboard.matr.norm(matr, p, q)], [matr[2][0] / Chalkboard.matr.norm(matr, p, q), matr[2][1] / Chalkboard.matr.norm(matr, p, q), matr[2][2] / Chalkboard.matr.norm(matr, p, q)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q), matr[0][2] / Chalkboard.matr.norm(matr, p, q), matr[0][3] / Chalkboard.matr.norm(matr, p, q)], [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q), matr[1][2] / Chalkboard.matr.norm(matr, p, q), matr[1][3] / Chalkboard.matr.norm(matr, p, q)], [matr[2][0] / Chalkboard.matr.norm(matr, p, q), matr[2][1] / Chalkboard.matr.norm(matr, p, q), matr[2][2] / Chalkboard.matr.norm(matr, p, q), matr[2][3] / Chalkboard.matr.norm(matr, p, q)], [matr[3][0] / Chalkboard.matr.norm(matr, p, q), matr[3][1] / Chalkboard.matr.norm(matr, p, q), matr[3][2] / Chalkboard.matr.norm(matr, p, q), matr[3][3] / Chalkboard.matr.norm(matr, p, q)]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = matr[i][j] / Chalkboard.matr.norm(matr, p, q);
                    }
                }
                return result;
            }
        };
        matr_1.normsq = (matr, p = 2, q = 2) => {
            if (Chalkboard.matr.isSizeOf(matr, 2) && p === 2 && q === 2) {
                return matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1];
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3) && p === 2 && q === 2) {
                return matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2];
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4) && p === 2 && q === 2) {
                return matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[0][2] * matr[0][2] + matr[0][3] * matr[0][3] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1] + matr[1][2] * matr[1][2] + matr[1][3] * matr[1][3] + matr[2][0] * matr[2][0] + matr[2][1] * matr[2][1] + matr[2][2] * matr[2][2] + matr[2][3] * matr[2][3] + matr[3][0] * matr[3][0] + matr[3][1] * matr[3][1] + matr[3][2] * matr[3][2] + matr[3][3] * matr[3][3];
            }
            else {
                let result = 0;
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    let rowResult = 0;
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        rowResult += Chalkboard.real.pow(matr[i][j], p);
                    }
                    result += Chalkboard.real.pow(rowResult, q / p);
                }
                return result;
            }
        };
        matr_1.nullspace = (matr) => {
            const augmented = matr.map((row) => row.slice().concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
            const rowEchelonForm = Chalkboard.matr.Gaussian(augmented);
            return rowEchelonForm.filter((row) => row.slice(0, Chalkboard.matr.rows(matr)).every((element) => element === 0)).map((row) => row.slice(Chalkboard.matr.rows(matr)));
        };
        matr_1.perm = (matr) => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                }
                else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] + matr[0][1] * matr[1][0];
                }
                else if (Chalkboard.matr.rows(matr) === 3) {
                    return matr[0][0] * (matr[1][1] * matr[2][2] + matr[1][2] * matr[2][1]) + matr[0][1] * (matr[1][0] * matr[2][2] + matr[1][2] * matr[2][0]) + matr[0][2] * (matr[1][0] * matr[2][1] + matr[1][1] * matr[2][0]);
                }
                else if (Chalkboard.matr.rows(matr) === 4) {
                    return matr[0][0] * (matr[1][1] * (matr[2][2] * matr[3][3] + matr[2][3] * matr[3][2]) + matr[1][2] * (matr[2][1] * matr[3][3] + matr[2][3] * matr[3][1]) + matr[1][3] * (matr[2][1] * matr[3][2] + matr[2][2] * matr[3][1])) + matr[0][1] * (matr[1][0] * (matr[2][2] * matr[3][3] + matr[2][3] * matr[3][2]) + matr[1][2] * (matr[2][0] * matr[3][3] + matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][2] + matr[2][2] * matr[3][0])) + matr[0][2] * (matr[1][0] * (matr[2][1] * matr[3][3] + matr[2][3] * matr[3][1]) + matr[1][1] * (matr[2][0] * matr[3][3] + matr[2][3] * matr[3][0]) + matr[1][3] * (matr[2][0] * matr[3][1] + matr[2][1] * matr[3][0])) + matr[0][3] * (matr[1][0] * (matr[2][1] * matr[3][2] + matr[2][2] * matr[3][1]) + matr[1][1] * (matr[2][0] * matr[3][2] + matr[2][2] * matr[3][0]) + matr[1][2] * (matr[2][0] * matr[3][1] + matr[2][1] * matr[3][0]));
                }
                else {
                    let result = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        const cofactor = matr[0][i] * Chalkboard.matr.perm(Chalkboard.matr.cofactor(matr, 0, i));
                        result += Math.abs(cofactor);
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_1.pow = (matr, num) => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (num === 0) {
                    return Chalkboard.matr.identity(Chalkboard.matr.rows(matr));
                }
                else {
                    let result = matr;
                    for (let i = 1; i < num; i++) {
                        result = Chalkboard.matr.mul(matr, result);
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_1.print = (matr) => {
            console.log(Chalkboard.matr.toString(matr));
        };
        matr_1.pull = (matr, index, axis) => {
            if (axis === 0) {
                matr.splice(index, 1);
                return matr;
            }
            else if (axis === 1) {
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(index, 1);
                }
                return matr;
            }
            else {
                throw new TypeError('Parameter "axis" must be 0 or 1.');
            }
        };
        matr_1.push = (matr, index, axis, elements) => {
            if (axis === 0) {
                matr.splice(index, 0, elements);
                return matr;
            }
            else if (axis === 1) {
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(index, 0, elements[i]);
                }
                return matr;
            }
            else {
                throw new TypeError('Parameter "axis" must be 0 or 1.');
            }
        };
        matr_1.QRdecomp = (matr) => {
            const Q = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)), R = Chalkboard.matr.copy(matr);
            for (let j = 0; j < Math.min(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)) - (Chalkboard.matr.rows(matr) > Chalkboard.matr.cols(matr) ? 0 : 1); j++) {
                let norm = 0;
                for (let i = j; i < Chalkboard.matr.rows(matr); i++) {
                    norm += R[i][j] * R[i][j];
                }
                norm = Chalkboard.real.sqrt(norm);
                const v = [];
                v[0] = norm - R[j][j];
                let normalizer = v[0] * v[0];
                for (let i = 1; i < Chalkboard.matr.rows(matr) - j; i++) {
                    v[i] = -R[i + j][j];
                    normalizer += v[i] * v[i];
                }
                normalizer = 1 / Chalkboard.real.sqrt(normalizer);
                for (let i = 0; i < v.length; i++) {
                    v[i] *= normalizer;
                }
                R[j][j] = norm;
                for (let i = j + 1; i < Chalkboard.matr.rows(R); i++) {
                    R[i][j] = 0;
                }
                for (let k = j + 1; k < Chalkboard.matr.cols(R); k++) {
                    let dot = 0;
                    for (let i = 0; i < v.length; i++) {
                        dot += v[i] * R[i + j][k];
                    }
                    dot *= 2;
                    for (let i = 0; i < v.length; i++) {
                        R[i + j][k] -= dot * v[i];
                    }
                }
                for (let k = 0; k < Chalkboard.matr.cols(Q); k++) {
                    let dot = 0;
                    for (let i = 0; i < v.length; i++) {
                        dot += v[i] * Q[k][i + j];
                    }
                    dot *= 2;
                    for (let i = 0; i < v.length; i++) {
                        Q[k][i + j] -= dot * v[i];
                    }
                }
            }
            return { Q: Q, R: R };
        };
        matr_1.random = (rows, cols = rows, inf = 0, sup = 1) => {
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            }
            else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            }
            else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)], [Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup)]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result.push([]);
                    for (let j = 0; j < cols; j++) {
                        result[i].push(Chalkboard.numb.random(inf, sup));
                    }
                }
                return result;
            }
        };
        matr_1.rank = (matr) => {
            return Chalkboard.matr.Gaussian(matr).filter((row) => row.some((element) => element !== 0)).length;
        };
        matr_1.reciprocate = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1]], [1 / matr[1][0], 1 / matr[1][1]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2]], [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2]], [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([1 / matr[0][0], 1 / matr[0][1], 1 / matr[0][2], 1 / matr[0][3]], [1 / matr[1][0], 1 / matr[1][1], 1 / matr[1][2], 1 / matr[1][3]], [1 / matr[2][0], 1 / matr[2][1], 1 / matr[2][2], 1 / matr[2][3]], [1 / matr[3][0], 1 / matr[3][1], 1 / matr[3][2], 1 / matr[3][3]]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = 1 / matr[i][j];
                    }
                }
                return result;
            }
        };
        matr_1.resize = (matr, rows, cols = rows) => {
            const result = Chalkboard.matr.init();
            const matrrows = Chalkboard.matr.rows(matr);
            const matrcols = Chalkboard.matr.cols(matr);
            for (let i = 0; i < rows; i++) {
                result.push([]);
                for (let j = 0; j < cols; j++) {
                    result[i].push(i < matrrows && j < matrcols ? matr[i][j] : 0);
                }
            }
            return result;
        };
        matr_1.rotator = (radx, rady, radz) => {
            if (rady === undefined && radz === undefined) {
                return Chalkboard.matr.init([Math.cos(radx), -Math.sin(radx)], [Math.sin(radx), Math.cos(radx)]);
            }
            else {
                const matrx = Chalkboard.matr.init([1, 0, 0], [0, Math.cos(radx), -Math.sin(radx)], [0, Math.sin(radx), Math.cos(radx)]), matry = Chalkboard.matr.init([Math.cos(rady), 0, Math.sin(rady)], [0, 1, 0], [-Math.sin(rady), 0, Math.cos(rady)]), matrz = Chalkboard.matr.init([Math.cos(radz), -Math.sin(radz), 0], [Math.sin(radz), Math.cos(radz), 0], [0, 0, 1]);
                return Chalkboard.matr.mul(Chalkboard.matr.mul(matrz, matry), matrx);
            }
        };
        matr_1.round = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1])], [Math.round(matr[1][0]), Math.round(matr[1][1])]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2])], [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2])], [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2])]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([Math.round(matr[0][0]), Math.round(matr[0][1]), Math.round(matr[0][2]), Math.round(matr[0][3])], [Math.round(matr[1][0]), Math.round(matr[1][1]), Math.round(matr[1][2]), Math.round(matr[1][3])], [Math.round(matr[2][0]), Math.round(matr[2][1]), Math.round(matr[2][2]), Math.round(matr[2][3])], [Math.round(matr[3][0]), Math.round(matr[3][1]), Math.round(matr[3][2]), Math.round(matr[3][3])]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Math.round(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_1.rows = (matr) => {
            return matr.length;
        };
        matr_1.rowspace = (matr) => {
            return Chalkboard.matr.Gaussian(matr).filter((row) => row.some((element) => element !== 0));
        };
        matr_1.scaler = (vect) => {
            vect = $(vect);
            if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([vect.x, 0], [0, vect.y]);
            }
            else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([vect.x, 0, 0], [0, vect.y, 0], [0, 0, vect.z]);
            }
            else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.init([vect.x, 0, 0, 0], [0, vect.y, 0, 0], [0, 0, vect.z, 0], [0, 0, 0, vect.w]);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        matr_1.scl = (matr, num) => {
            if (Chalkboard.matr.isSizeOf(matr, 2, 1)) {
                return Chalkboard.matr.init([matr[0][0] * num], [matr[1][0] * num]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num], [matr[1][0] * num, matr[1][1] * num]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3, 1)) {
                return Chalkboard.matr.init([matr[0][0] * num], [matr[1][0] * num], [matr[2][0] * num]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num], [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num], [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4, 1)) {
                return Chalkboard.matr.init([matr[0][0] * num], [matr[1][0] * num], [matr[2][0] * num], [matr[3][0] * num]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([matr[0][0] * num, matr[0][1] * num, matr[0][2] * num, matr[0][3] * num], [matr[1][0] * num, matr[1][1] * num, matr[1][2] * num, matr[1][3] * num], [matr[2][0] * num, matr[2][1] * num, matr[2][2] * num, matr[2][3] * num], [matr[3][0] * num, matr[3][1] * num, matr[3][2] * num, matr[3][3] * num]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = matr[i][j] * num;
                    }
                }
                return result;
            }
        };
        matr_1.solve = (matrA, matrB) => {
            if (Chalkboard.matr.isSquare(matrA)) {
                if (Chalkboard.matr.rows(matrA) === Chalkboard.matr.rows(matrB)) {
                    if (Chalkboard.matr.det(matrA) !== 0) {
                        return Chalkboard.matr.mul(Chalkboard.matr.invert(matrA), matrB);
                    }
                    else {
                        throw new TypeError('Parameter "matrA" must be of type "ChalkboardMatrix" that has a non-zero determinant.');
                    }
                }
                else {
                    throw new TypeError('Parameters "matrA" and "matrB" must be of type "ChalkboardMatrix" with equivalent numbers of rows.');
                }
            }
            else {
                throw new TypeError('Parameter "matrA" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_1.sub = (matr1, matr2) => {
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2)) {
                    return Chalkboard.matr.init([matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1]], [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 3)) {
                    return Chalkboard.matr.init([matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1], matr1[0][2] - matr2[0][2]], [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1], matr1[1][2] - matr2[1][2]], [matr1[2][0] - matr2[2][0], matr1[2][1] - matr2[2][1], matr1[2][2] - matr2[2][2]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4)) {
                    return Chalkboard.matr.init([matr1[0][0] - matr2[0][0], matr1[0][1] - matr2[0][1], matr1[0][2] - matr2[0][2], matr1[0][3] - matr2[0][3]], [matr1[1][0] - matr2[1][0], matr1[1][1] - matr2[1][1], matr1[1][2] - matr2[1][2], matr1[1][3] - matr2[1][3]], [matr1[2][0] - matr2[2][0], matr1[2][1] - matr2[2][1], matr1[2][2] - matr2[2][2], matr1[2][3] - matr2[2][3]], [matr1[3][0] - matr2[3][0], matr1[3][1] - matr2[3][1], matr1[3][2] - matr2[3][2], matr1[3][3] - matr2[3][3]]);
                }
                else {
                    const result = Chalkboard.matr.init();
                    for (let i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (let j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                            result[i][j] = matr1[i][j] - matr2[i][j];
                        }
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" with equivalent numbers of rows and columns.');
            }
        };
        matr_1.symmetricBinomial = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([1, 1], [1, 2]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([1, 1, 1], [1, 2, 3], [1, 3, 6]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([1, 1, 1, 1], [1, 2, 3, 4], [1, 3, 6, 10], [1, 4, 10, 20]);
            }
            else {
                return Chalkboard.matr.mul(Chalkboard.matr.lowerBinomial(size), Chalkboard.matr.upperBinomial(size));
            }
        };
        matr_1.toArray = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return [matr[0][0], matr[0][1], matr[1][0], matr[1][1]];
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return [matr[0][0], matr[0][1], matr[0][2], matr[1][0], matr[1][1], matr[1][2], matr[2][0], matr[2][1], matr[2][2]];
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return [matr[0][0], matr[0][1], matr[0][2], matr[0][3], matr[1][0], matr[1][1], matr[1][2], matr[1][3], matr[2][0], matr[2][1], matr[2][2], matr[2][3], matr[3][0], matr[3][1], matr[3][2], matr[3][3]];
            }
            else {
                const result = [];
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result.push(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_1.toObject = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1] },
                    i2: { j1: matr[1][0], j2: matr[1][1] }
                };
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1], j3: matr[0][2] },
                    i2: { j1: matr[1][0], j2: matr[1][1], j3: matr[1][2] },
                    i3: { j1: matr[2][0], j2: matr[2][1], j3: matr[2][2] }
                };
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return {
                    i1: { j1: matr[0][0], j2: matr[0][1], j3: matr[0][2], j4: matr[0][3] },
                    i2: { j1: matr[1][0], j2: matr[1][1], j3: matr[1][2], j4: matr[1][3] },
                    i3: { j1: matr[2][0], j2: matr[2][1], j3: matr[2][2], j4: matr[2][3] },
                    i4: { j1: matr[3][0], j2: matr[3][1], j3: matr[3][2], j4: matr[3][3] }
                };
            }
            else {
                const result = {};
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result["i" + (i + 1)] = {};
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result["i" + (i + 1)]["j" + (j + 1)] = matr[i][j];
                    }
                }
                return result;
            }
        };
        matr_1.toSet = (matr) => {
            return Chalkboard.abal.set(Chalkboard.matr.toArray(matr));
        };
        matr_1.toString = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return ("[ " + matr[0][0].toString() + " " + matr[0][1].toString() +
                    " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " ]");
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return ("[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " " + matr[0][2].toString() +
                    " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " " + matr[1][2].toString() +
                    " ]\n[ " + matr[2][0].toString() + " " + matr[2][1].toString() + " " + matr[2][2].toString() + " ]");
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return ("[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " " + matr[0][2].toString() + " " + matr[0][3].toString() +
                    " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " " + matr[1][2].toString() + " " + matr[1][3].toString() +
                    " ]\n[ " + matr[2][0].toString() + " " + matr[2][1].toString() + " " + matr[2][2].toString() + " " + matr[2][3].toString() +
                    " ]\n[ " + matr[3][0].toString() + " " + matr[3][1].toString() + " " + matr[3][2].toString() + " " + matr[3][3].toString() + " ]");
            }
            else {
                let result = "";
                for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result += "[ ";
                    for (let j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result += matr[i][j].toString() + " ";
                    }
                    result = result.trimEnd() + " ]\n";
                }
                return result;
            }
        };
        matr_1.toTensor = (matr, ...size) => {
            size = Array.isArray(size[0]) ? size[0] : size;
            return Chalkboard.tens.resize(matr, ...size);
        };
        matr_1.toTypedArray = (matr, type = "float32") => {
            const arr = Chalkboard.matr.toArray(matr);
            if (type === "int8") {
                return new Int8Array(arr);
            }
            else if (type === "int16") {
                return new Int16Array(arr);
            }
            else if (type === "int32") {
                return new Int32Array(arr);
            }
            else if (type === "float32") {
                return new Float32Array(arr);
            }
            else if (type === "float64") {
                return new Float64Array(arr);
            }
            else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };
        matr_1.toVector = (matr, dimension, index = 0, axis = 0) => {
            if (dimension === 2) {
                if (axis === 0) {
                    return Chalkboard.vect.init(matr[0][index], matr[1][index]);
                }
                else if (axis === 1) {
                    return Chalkboard.vect.init(matr[index][0], matr[index][1]);
                }
                else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            }
            else if (dimension === 3) {
                if (axis === 0) {
                    return Chalkboard.vect.init(matr[0][index], matr[1][index], matr[2][index]);
                }
                else if (axis === 1) {
                    return Chalkboard.vect.init(matr[index][0], matr[index][1], matr[index][2]);
                }
                else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            }
            else if (dimension === 4) {
                if (axis === 0) {
                    return Chalkboard.vect.init(matr[0][index], matr[1][index], matr[2][index], matr[3][index]);
                }
                else if (axis === 1) {
                    return Chalkboard.vect.init(matr[index][0], matr[index][1], matr[index][2], matr[index][3]);
                }
                else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            }
            else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };
        matr_1.trace = (matr) => {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] + matr[1][1];
                }
                else if (Chalkboard.matr.rows(matr) === 3) {
                    return matr[0][0] + matr[1][1] + matr[2][2];
                }
                else if (Chalkboard.matr.rows(matr) === 4) {
                    return matr[0][0] + matr[1][1] + matr[2][2] + matr[3][3];
                }
                else {
                    let result = 0;
                    for (let i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        result += matr[i][i];
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_1.transpose = (matr) => {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0]], [matr[0][1], matr[1][1]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0], matr[2][0]], [matr[0][1], matr[1][1], matr[2][1]], [matr[0][2], matr[1][2], matr[2][2]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([matr[0][0], matr[1][0], matr[2][0], matr[3][0]], [matr[0][1], matr[1][1], matr[2][1], matr[3][1]], [matr[0][2], matr[1][2], matr[2][2], matr[3][2]], [matr[0][3], matr[1][3], matr[2][3], matr[3][3]]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result[i] = [];
                    for (let j = 0; j < Chalkboard.matr.rows(matr); j++) {
                        result[i][j] = matr[j][i];
                    }
                }
                return result;
            }
        };
        matr_1.translator = (vect) => {
            vect = $(vect);
            if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([1, 0, vect.x], [0, 1, vect.y], [0, 0, 1]);
            }
            else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.matr.init([1, 0, 0, vect.x], [0, 1, 0, vect.y], [0, 0, 1, vect.z], [0, 0, 0, 1]);
            }
            else if (typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.matr.init([1, 0, 0, 0, vect.x], [0, 1, 0, 0, vect.y], [0, 0, 1, 0, vect.z], [0, 0, 0, 1, vect.w], [0, 0, 0, 0, 1]);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        matr_1.upperBinomial = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([1, 1], [0, 1]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([1, 2, 1], [0, 1, 1], [0, 0, 1]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([1, 3, 3, 1], [0, 1, 2, 1], [0, 0, 1, 1], [0, 0, 0, 1]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result.push([]);
                    for (let j = 0; j < size; j++) {
                        result[i].push(Chalkboard.numb.binomial(j, i));
                    }
                }
                return result;
            }
        };
        matr_1.upperShift = (size) => {
            if (size === 2) {
                return Chalkboard.matr.init([0, 1], [0, 0]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([0, 1, 0], [0, 0, 1], [0, 0, 0]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [0, 0, 0, 0]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = Chalkboard.numb.Kronecker(i + 1, j);
                    }
                }
                return result;
            }
        };
        matr_1.upperTriangular = (size, ...elements) => {
            if (size === 2) {
                return Chalkboard.matr.init([elements[0] || 0, elements[1] || 0], [0, elements[2] || 0]);
            }
            else if (size === 3) {
                return Chalkboard.matr.init([elements[0] || 0, elements[1] || 0, elements[2] || 0], [0, elements[3] || 0, elements[4] || 0], [0, 0, elements[5] || 0]);
            }
            else if (size === 4) {
                return Chalkboard.matr.init([elements[0] || 0, elements[1] || 0, elements[2] || 0, elements[3] || 0], [0, elements[4] || 0, elements[5] || 0, elements[6] || 0], [0, 0, elements[7] || 0, elements[8] || 0], [0, 0, 0, elements[9] || 0]);
            }
            else {
                elements = Array.isArray(elements[0]) ? elements[0] : elements;
                const result = Chalkboard.matr.init();
                let index = 0;
                for (let i = 0; i < size; i++) {
                    result[i] = [];
                    for (let j = 0; j < size; j++) {
                        result[i][j] = j >= i ? elements[index++] || 0 : 0;
                    }
                }
                return result;
            }
        };
        matr_1.zero = (rows, cols = rows) => {
            if (rows === 2 && cols === 2) {
                return Chalkboard.matr.init([0, 0], [0, 0]);
            }
            else if (rows === 3 && cols === 3) {
                return Chalkboard.matr.init([0, 0, 0], [0, 0, 0], [0, 0, 0]);
            }
            else if (rows === 4 && cols === 4) {
                return Chalkboard.matr.init([0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]);
            }
            else {
                const result = Chalkboard.matr.init();
                for (let i = 0; i < rows; i++) {
                    result[i] = [];
                    for (let j = 0; j < cols; j++) {
                        result[i][j] = 0;
                    }
                }
                return result;
            }
        };
    })(matr = Chalkboard.matr || (Chalkboard.matr = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let numb;
    (function (numb) {
        numb.Bernoullian = (p = 0.5) => {
            if (typeof p !== "number" || !Number.isFinite(p) || p < 0 || p > 1)
                throw new Error(`Chalkboard.numb.Bernoullian: Parameter "p" must be a finite number between 0 and 1.`);
            return Math.random() < p ? 1 : 0;
        };
        numb.binomial = (n, k) => {
            if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0)
                throw new Error(`Chalkboard.numb.binomial: Parameters "n" and "k" must be non-negative integers.`);
            if (k < 0 || k > n)
                return 0;
            if (k === 0 || k === n)
                return 1;
            if (k === 1 || k === n - 1)
                return n;
            if (n - k < k)
                k = n - k;
            let result = n;
            for (let i = 2; i <= k; i++)
                result *= (n - i + 1) / i;
            return Math.round(result);
        };
        numb.change = (initial, final) => {
            if (typeof initial !== "number" || typeof final !== "number" || !Number.isFinite(initial) || !Number.isFinite(final))
                throw new Error(`Chalkboard.numb.change: Parameters "initial" and "final" must be finite numbers.`);
            if (initial === 0)
                throw new Error(`Chalkboard.numb.change: Parameter "initial" must be non-zero.`);
            return (final - initial) / initial;
        };
        numb.combination = (n, r) => {
            if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n)
                throw new Error(`Chalkboard.numb.combination: Parameters "n" and "r" must be integers with 0 <= r <= n.`);
            return Chalkboard.numb.binomial(n, r);
        };
        numb.compositeArr = (inf, sup) => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup))
                throw new Error(`Chalkboard.numb.compositeArr: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.compositeArr: Parameter "inf" must be less than or equal to "sup".`);
            if (sup < 4)
                return [];
            const sieve = new Uint8Array(sup + 1);
            for (let p = 2; p * p <= sup; p++)
                if (sieve[p] === 0)
                    for (let i = p * p; i <= sup; i += p)
                        sieve[i] = 1;
            const result = [];
            const start = Math.max(4, inf);
            for (let i = start; i <= sup; i++)
                if (sieve[i] === 1)
                    result.push(i);
            return result;
        };
        numb.compositeCount = (inf, sup) => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup))
                throw new Error(`Chalkboard.numb.compositeCount: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.compositeCount: Parameter "inf" must be less than or equal to "sup".`);
            return Chalkboard.numb.compositeArr(inf, sup).length;
        };
        numb.constrain = (num, range = [0, 1]) => {
            if (typeof num !== "number" || !Number.isFinite(num))
                throw new Error(`Chalkboard.numb.constrain: Parameter "num" must be a finite number.`);
            if (!Array.isArray(range) || range.length !== 2 || typeof range[0] !== "number" || typeof range[1] !== "number" || !Number.isFinite(range[0]) || !Number.isFinite(range[1]) || range[0] > range[1])
                throw new Error(`Chalkboard.numb.constrain: Parameter "range" must be an array of two finite numbers [min, max] with min <= max.`);
            return Math.max(Math.min(num, range[1]), range[0]);
        };
        numb.convert = (num, from, to) => {
            if (typeof from !== "string" || typeof to !== "string")
                throw new Error(`Chalkboard.numb.convert: Parameters "from" and "to" must be strings.`);
            if (Array.isArray(num)) {
                for (let i = 0; i < num.length; i++)
                    if (typeof num[i] !== "number" || !Number.isFinite(num[i]))
                        throw new Error(`Chalkboard.numb.convert: Parameter "num[${i}]" must be a finite number.`);
            }
            else {
                if (typeof num !== "number" || !Number.isFinite(num))
                    throw new Error(`Chalkboard.numb.convert: Parameter "num" must be a finite number.`);
            }
            const normalize = (str) => str.trim().replace(/\s+/g, " ");
            const canonicalize = (str) => normalize(str).replace(/\u00B5/g, "μ");
            const ALIASES = {
                "NM": "nm", "Nm": "nm", "µm": "μm", "CM": "cm", "Cm": "cm", "M": "m", "KM": "km", "Km": "km", "IN": "in", "In": "in", "FT": "ft", "Ft": "ft", "YD": "yd", "Yd": "yd", "MI": "mi", "Mi": "mi", "NMI": "nmi", "Nmi": "nmi",
                "M2": "m2", "CM2": "cm2", "MM2": "mm2", "KM2": "km2", "FT2": "ft2", "IN2": "in2", "YD2": "yd2", "MI2": "mi2",
                "NG": "ng", "µg": "μg", "MG": "mg", "G": "g", "KG": "kg", "Kg": "kg", "LB": "lb", "Lb": "lb",
                "l": "L", "ml": "mL", "cl": "cL", "dl": "dL", "dal": "daL", "hl": "hL", "kl": "kL", "ul": "uL", "μl": "μL", "µl": "μL", "fl. oz": "fl oz", "fl.oz": "fl oz", "floz": "fl oz", "OZ": "oz", "Oz": "oz",
                "pa": "Pa", "hpa": "hPa", "kpa": "kPa", "mpa": "MPa", "gpa": "GPa", "ATM": "atm", "Atm": "atm", "Torr": "torr", "mmhg": "mmHg",
                "NS": "ns", "US": "μs", "Us": "μs", "µS": "μs", "MS": "ms", "Ms": "ms", "HR": "h", "Hr": "h", "HRS": "h", "Hrs": "h", "YR": "yr", "Yr": "yr", "WK": "wk", "Wk": "wk",
                "c": "C", "°c": "C", "°C": "C", "celsius": "C", "f": "F", "°f": "F", "°F": "F", "fahrenheit": "F", "k": "K", "°k": "K", "°K": "K", "kelvin": "K", "r": "R", "°r": "R", "°R": "R", "rankine": "R"
            };
            const LENGTH = {
                "fm": 1e-15, "femtometer": 1e-15, "femtometers": 1e-15,
                "pm": 1e-12, "picometer": 1e-12, "picometers": 1e-12,
                "nm": 1e-9, "nanometer": 1e-9, "nanometers": 1e-9,
                "μm": 1e-6, "um": 1e-6, "micrometer": 1e-6, "micrometers": 1e-6,
                "mm": 1e-3, "millimeter": 1e-3, "millimeters": 1e-3,
                "cm": 1e-2, "centimeter": 1e-2, "centimeters": 1e-2,
                "dm": 1e-1, "decimeter": 1e-1, "decimeters": 1e-1,
                "m": 1, "meter": 1, "meters": 1,
                "dam": 1e1, "decameter": 1e1, "decameters": 1e1,
                "hm": 1e2, "hectometer": 1e2, "hectometers": 1e2,
                "km": 1e3, "kilometer": 1e3, "kilometers": 1e3,
                "Mm": 1e6, "megameter": 1e6, "megameters": 1e6,
                "Gm": 1e9, "gigameter": 1e9, "gigameters": 1e9,
                "Tm": 1e12, "terameter": 1e12, "terameters": 1e12,
                "Pm": 1e15, "petameter": 1e15, "petameters": 1e15,
                "in": 0.0254, "inch": 0.0254, "inches": 0.0254,
                "ft": 0.3048, "foot": 0.3048, "feet": 0.3048,
                "yd": 0.9144, "yard": 0.9144, "yards": 0.9144,
                "mi": 1609.344, "mile": 1609.344, "miles": 1609.344,
                "nmi": 1852, "nautical mile": 1852, "nautical miles": 1852,
                "ly": 9.4607e15, "lyr": 9.4607e15, "light year": 9.4607e15, "light years": 9.4607e15
            };
            const AREA = {
                "mm²": 1e-6, "mm2": 1e-6, "square millimeter": 1e-6, "square millimeters": 1e-6,
                "cm²": 1e-4, "cm2": 1e-4, "square centimeter": 1e-4, "square centimeters": 1e-4,
                "dm²": 1e-2, "dm2": 1e-2, "square decimeter": 1e-2, "square decimeters": 1e-2,
                "m²": 1, "m2": 1, "square meter": 1, "square meters": 1,
                "a": 100, "are": 100, "ares": 100,
                "ha": 1e4, "hectare": 1e4, "hectares": 1e4,
                "km²": 1e6, "km2": 1e6, "square kilometer": 1e6, "square kilometers": 1e6,
                "in²": 0.00064516, "in2": 0.00064516, "square inch": 0.00064516, "square inches": 0.00064516,
                "ft²": 0.09290304, "ft2": 0.09290304, "square foot": 0.09290304, "square feet": 0.09290304,
                "yd²": 0.83612736, "yd2": 0.83612736, "square yard": 0.83612736, "square yards": 0.83612736,
                "acre": 4046.8564224, "acres": 4046.8564224,
                "mi²": 2589988.110336, "mi2": 2589988.110336, "square mile": 2589988.110336, "square miles": 2589988.110336
            };
            const MASS = {
                "fg": 1e-15, "femtogram": 1e-15, "femtograms": 1e-15,
                "pg": 1e-12, "picogram": 1e-12, "picograms": 1e-12,
                "ng": 1e-9, "nanogram": 1e-9, "nanograms": 1e-9,
                "μg": 1e-6, "ug": 1e-6, "microgram": 1e-6, "micrograms": 1e-6,
                "mg": 1e-3, "milligram": 1e-3, "milligrams": 1e-3,
                "cg": 1e-2, "centigram": 1e-2, "centigrams": 1e-2,
                "dg": 1e-1, "decigram": 1e-1, "decigrams": 1e-1,
                "g": 1, "gram": 1, "grams": 1,
                "dag": 1e1, "decagram": 1e1, "decagrams": 1e1,
                "hg": 1e2, "hectogram": 1e2, "hectograms": 1e2,
                "kg": 1e3, "kilogram": 1e3, "kilograms": 1e3,
                "Mg": 1e6, "megagram": 1e6, "megagrams": 1e6,
                "Gg": 1e9, "gigagram": 1e9, "gigagrams": 1e9,
                "Tg": 1e12, "teragram": 1e12, "teragrams": 1e12,
                "Pg": 1e15, "petagram": 1e15, "petagrams": 1e15,
                "oz": 28.349523125, "ounce": 28.349523125, "ounces": 28.349523125,
                "lb": 453.59237, "lbs": 453.59237, "pound": 453.59237, "pounds": 453.59237,
                "st": 6350.29318, "stone": 6350.29318, "stones": 6350.29318,
                "tn": 907184.74, "ton": 907184.74, "tons": 907184.74,
                "t": 1000000, "metric ton": 1000000, "metric tons": 1000000
            };
            const VOLUME = {
                "fL": 1e-15, "femtoliter": 1e-15, "femtoliters": 1e-15,
                "pL": 1e-12, "picoliter": 1e-12, "picoliters": 1e-12,
                "nL": 1e-9, "nanoliter": 1e-9, "nanoliters": 1e-9,
                "μL": 1e-6, "uL": 1e-6, "microliter": 1e-6, "microliters": 1e-6,
                "mL": 1e-3, "milliliter": 1e-3, "milliliters": 1e-3,
                "cL": 1e-2, "centiliter": 1e-2, "centiliters": 1e-2,
                "dL": 1e-1, "deciliter": 1e-1, "deciliters": 1e-1,
                "L": 1, "l": 1, "liter": 1, "liters": 1,
                "daL": 1e1, "decaliter": 1e1, "decaliters": 1e1,
                "hL": 1e2, "hectoliter": 1e2, "hectoliters": 1e2,
                "kL": 1e3, "kiloliter": 1e3, "kiloliters": 1e3,
                "ML": 1e6, "megaliter": 1e6, "megaliters": 1e6,
                "GL": 1e9, "gigaliter": 1e9, "gigaliters": 1e9,
                "TL": 1e12, "teraliter": 1e12, "teraliters": 1e12,
                "PL": 1e15, "petaliter": 1e15, "petaliters": 1e15,
                "tsp": 0.00492892159, "teaspoon": 0.00492892159, "teaspoons": 0.00492892159,
                "tbsp": 0.0147867648, "Tbsp": 0.0147867648, "tablespoon": 0.0147867648, "tablespoons": 0.0147867648,
                "fl oz": 0.0295735296, "fluid ounce": 0.0295735296, "fluid ounces": 0.0295735296,
                "cp": 0.2365882365, "cup": 0.2365882365, "cups": 0.2365882365,
                "pt": 0.473176473, "pint": 0.473176473, "pints": 0.473176473,
                "qt": 0.946352946, "quart": 0.946352946, "quarts": 0.946352946,
                "gal": 3.785411784, "gallon": 3.785411784, "gallons": 3.785411784
            };
            const PRESSURE = {
                "Pa": 1, "pascal": 1, "pascals": 1,
                "hPa": 100, "hectopascal": 100, "hectopascals": 100,
                "kPa": 1000, "kilopascal": 1000, "kilopascals": 1000,
                "MPa": 1e6, "megapascal": 1e6, "megapascals": 1e6,
                "GPa": 1e9, "gigapascal": 1e9, "gigapascals": 1e9,
                "bar": 1e5, "bars": 1e5,
                "mbar": 100, "millibar": 100, "millibars": 100,
                "atm": 101325, "atmosphere": 101325, "atmospheres": 101325,
                "torr": 133.32236842105263,
                "mmHg": 133.32236842105263, "millimeter of mercury": 133.32236842105263, "millimeters of mercury": 133.32236842105263,
                "psi": 6894.757293168, "pound per square inch": 6894.757293168, "pounds per square inch": 6894.757293168
            };
            const TIME = {
                "ns": 1e-9, "nanosecond": 1e-9, "nanoseconds": 1e-9,
                "μs": 1e-6, "us": 1e-6, "microsecond": 1e-6, "microseconds": 1e-6,
                "ms": 1e-3, "millisecond": 1e-3, "milliseconds": 1e-3,
                "s": 1, "sec": 1, "secs": 1, "second": 1, "seconds": 1,
                "min": 60, "mins": 60, "minute": 60, "minutes": 60,
                "h": 3600, "hr": 3600, "hrs": 3600, "hour": 3600, "hours": 3600,
                "d": 86400, "day": 86400, "days": 86400,
                "w": 604800, "wk": 604800, "wks": 604800, "week": 604800, "weeks": 604800,
                "yr": 31557600, "yrs": 31557600, "year": 31557600, "years": 31557600
            };
            const TEMPERATURE = {
                "K": { a: 1, b: 0, key: "K" },
                "C": { a: 1, b: 273.15, key: "C" },
                "F": { a: 5 / 9, b: 273.15 - (32 * 5) / 9, key: "F" },
                "R": { a: 5 / 9, b: 0, key: "R" }
            };
            const TABLE = [["length", LENGTH], ["area", AREA], ["mass", MASS], ["volume", VOLUME], ["pressure", PRESSURE], ["time", TIME]];
            const resolveFactor = (str) => {
                const key = canonicalize(str);
                const alias = ALIASES[key] ?? ALIASES[key.toLowerCase()];
                const candidates = [];
                candidates.push(key);
                if (alias)
                    candidates.push(alias);
                const shouldTryLower = key.length > 2 || key.includes(" ");
                if (shouldTryLower)
                    candidates.push(key.toLowerCase());
                const seen = new Set();
                const uniq = candidates.filter((c) => (seen.has(c) ? false : (seen.add(c), true)));
                for (const [category, map] of TABLE) {
                    for (const k of uniq) {
                        if (Object.prototype.hasOwnProperty.call(map, k))
                            return { category, factor: map[k], key: k };
                    }
                }
                return undefined;
            };
            const resolveTemp = (str) => {
                const raw = canonicalize(str);
                const alias = ALIASES[raw] ?? ALIASES[raw.toLowerCase()];
                const candidates = [raw];
                if (alias)
                    candidates.push(alias);
                const seen = new Set();
                const uniq = candidates.filter((c) => (seen.has(c) ? false : (seen.add(c), true)));
                for (const k of uniq)
                    if (Object.prototype.hasOwnProperty.call(TEMPERATURE, k))
                        return TEMPERATURE[k];
                return undefined;
            };
            const apply = (fn) => (Array.isArray(num) ? num.map(fn) : fn(num));
            const fromTemp = resolveTemp(from);
            const toTemp = resolveTemp(to);
            if (fromTemp || toTemp) {
                if (!fromTemp)
                    throw new Error(`Chalkboard.numb.convert: Unknown temperature unit: "${from}".`);
                if (!toTemp)
                    throw new Error(`Chalkboard.numb.convert: Unknown temperature unit: "${to}".`);
                const toKelvin = (x) => fromTemp.a * x + fromTemp.b;
                const fromKelvin = (k) => (k - toTemp.b) / toTemp.a;
                return apply((x) => fromKelvin(toKelvin(x)));
            }
            const fromResolved = resolveFactor(from);
            const toResolved = resolveFactor(to);
            if (!fromResolved)
                throw new Error(`Chalkboard.numb.convert: Unknown unit: "${from}".`);
            if (!toResolved)
                throw new Error(`Chalkboard.numb.convert: Unknown unit: "${to}".`);
            if (fromResolved.category !== toResolved.category)
                throw new Error(`Chalkboard.numb.convert: Incompatible unit conversion: "${from}" (${fromResolved.category}) -> "${to}" (${toResolved.category}).`);
            const factor = fromResolved.factor / toResolved.factor;
            return apply((x) => x * factor);
        };
        numb.divisors = (num) => {
            if (!Number.isInteger(num) || num <= 0)
                throw new Error(`Chalkboard.numb.divisors: Parameter "num" must be a positive integer.`);
            const result = [];
            const upper = Math.floor(Math.sqrt(num));
            for (let i = 1; i <= upper; i++) {
                if (num % i === 0) {
                    result.push(i);
                    if (i !== num / i)
                        result.push(num / i);
                }
            }
            return result.sort((a, b) => a - b);
        };
        numb.Euler = (num) => {
            if (!Number.isInteger(num) || num <= 0)
                throw new Error(`Chalkboard.numb.Euler: Parameter "num" must be a positive integer.`);
            const primeFactors = Chalkboard.numb.factors(num);
            const uniquePrimes = [];
            for (let i = 0; i < primeFactors.length; i++) {
                const p = primeFactors[i];
                if (uniquePrimes.indexOf(p) === -1)
                    uniquePrimes.push(p);
            }
            let result = num;
            for (const p of uniquePrimes)
                result *= (p - 1) / p;
            return Math.round(result);
        };
        numb.exponential = (l = 1) => {
            if (typeof l !== "number" || !Number.isFinite(l))
                throw new Error(`Chalkboard.numb.exponential: Parameter "l" must be a finite number.`);
            if (l <= 0)
                throw new Error(`Chalkboard.numb.exponential: Parameter "l" must be positive.`);
            const u = 1 - Math.random();
            return -Math.log(u) / l;
        };
        numb.factorial = (num) => {
            if (!Number.isInteger(num) || num < 0)
                throw new Error(`Chalkboard.numb.factorial: Parameter "num" must be a non-negative integer.`);
            let n = 1;
            for (let i = 2; i <= num; i++)
                n *= i;
            return n;
        };
        numb.factors = (num) => {
            if (!Number.isInteger(num))
                throw new Error(`Chalkboard.numb.factors: Parameter "num" must be an integer.`);
            if (num === 0)
                throw new Error(`Chalkboard.numb.factors: Parameter "num" must be non-zero.`);
            const result = [];
            if (num < 0) {
                result.push(-1);
                num = Math.abs(num);
            }
            while (num % 2 === 0) {
                result.push(2);
                num /= 2;
            }
            for (let i = 3; i <= Chalkboard.real.sqrt(num); i += 2) {
                while (num % i === 0) {
                    result.push(i);
                    num /= i;
                }
            }
            if (num > 1)
                result.push(num);
            return result;
        };
        numb.Fibonacci = (num) => {
            if (!Number.isInteger(num) || num < 0)
                throw new Error(`Chalkboard.numb.Fibonacci: Parameter "num" must be a non-negative integer.`);
            if (num === 0)
                return 0;
            if (num === 1)
                return 1;
            let a = 0, b = 1;
            for (let i = 2; i <= num; i++) {
                const next = a + b;
                a = b;
                b = next;
            }
            return b;
        };
        numb.Gaussian = (mean, deviation) => {
            if (!Number.isFinite(mean) || !Number.isFinite(deviation))
                throw new Error(`Chalkboard.numb.Gaussian: Parameters "mean" and "deviation" must be finite numbers.`);
            if (deviation <= 0)
                throw new Error(`Chalkboard.numb.Gaussian: Parameter "deviation" must be positive.`);
            let u1 = 0;
            while (u1 === 0)
                u1 = Math.random();
            const u2 = Math.random();
            const z = Chalkboard.real.sqrt(-2 * Chalkboard.real.ln(u1)) * Chalkboard.trig.cos(Chalkboard.PI(2) * u2);
            return mean + z * deviation;
        };
        numb.gcd = (a, b) => {
            if (!Number.isInteger(a) || !Number.isInteger(b))
                throw new Error(`Chalkboard.numb.gcd: Parameters "a" and "b" must be integers.`);
            a = Math.abs(a);
            b = Math.abs(b);
            while (b !== 0) {
                const t = a % b;
                a = b;
                b = t;
            }
            return a;
        };
        numb.Goldbach = (num) => {
            if (!Number.isInteger(num) || num < 4 || num % 2 !== 0)
                throw new Error(`Chalkboard.numb.Goldbach: Parameter "num" must be an even integer greater than or equal to 4.`);
            if (num !== 4) {
                let a = num / 2, b = num / 2;
                if (a % 2 === 0) {
                    a--;
                    b++;
                }
                while (a >= 3) {
                    if (Chalkboard.numb.isPrime(a) && Chalkboard.numb.isPrime(b))
                        return [a, b];
                    a -= 2;
                    b += 2;
                }
                return undefined;
            }
            else {
                return [2, 2];
            }
        };
        numb.isApproxEqual = (a, b, precision = 0.000001) => {
            if (typeof a !== "number" || typeof b !== "number" || typeof precision !== "number" || !Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(precision) || precision <= 0)
                throw new Error(`Chalkboard.numb.isApproxEqual: Parameters "a", "b", and "precision" must be finite numbers, and "precision" must be positive.`);
            return Math.abs(a - b) < precision;
        };
        numb.isPrime = (num) => {
            if (typeof num !== "number" || !Number.isInteger(num) || num < 2)
                return false;
            if (num === 2)
                return true;
            if (num % 2 === 0)
                return false;
            for (let i = 3; i * i <= num; i += 2)
                if (num % i === 0)
                    return false;
            return true;
        };
        numb.isRational = (num, tolerance = 1e-8) => {
            if (typeof num !== "number" || !Number.isFinite(num) || typeof tolerance !== "number" || !Number.isFinite(tolerance) || tolerance <= 0)
                return false;
            const mult = num / Chalkboard.PI();
            if (mult !== 0 && Math.abs(Math.round(mult) - mult) < tolerance) {
                return false;
            }
            if (num > 0) {
                const ln = Math.log(num);
                if (ln !== 0 && Math.abs(Math.round(ln) - ln) < tolerance) {
                    const pow = Chalkboard.E(Math.round(ln));
                    if (Math.abs(num - pow) < tolerance) {
                        return false;
                    }
                }
            }
            for (let d = 2; d <= 6; d++) {
                const fract = Chalkboard.PI() / d;
                for (let n = 1; n <= d * 4; n++) {
                    if (n % d !== 0) {
                        if (Math.abs(num - n * fract) < tolerance) {
                            return false;
                        }
                    }
                }
            }
            const knownIrrationals = [Chalkboard.E(-1), Chalkboard.E(0.5), Chalkboard.real.sqrt(Chalkboard.PI()), Chalkboard.E(), Chalkboard.PI(), Chalkboard.E(2)];
            for (let i = 2; i <= 100; i++) {
                if (Number.isInteger(Math.sqrt(i)))
                    continue;
                knownIrrationals.push(Chalkboard.real.sqrt(i));
            }
            for (const irr of knownIrrationals) {
                if (Math.abs(num - irr) < tolerance) {
                    return false;
                }
            }
            try {
                const [n, d] = Chalkboard.numb.toFraction(num, tolerance);
                return (Math.abs(num - n / d) < tolerance) && (Math.abs(d) <= 100000);
            }
            catch {
                return false;
            }
        };
        numb.Kronecker = (a, b) => {
            if (typeof a !== "number" || typeof b !== "number" || !Number.isFinite(a) || !Number.isFinite(b))
                throw new Error(`Chalkboard.numb.Kronecker: Parameters "a" and "b" must be finite numbers.`);
            if (a === b)
                return 1;
            else
                return 0;
        };
        numb.lcm = (a, b) => {
            if (!Number.isInteger(a) || !Number.isInteger(b))
                throw new Error(`Chalkboard.numb.lcm: Parameters "a" and "b" must be integers.`);
            if (a === 0 || b === 0)
                return 0;
            return Math.abs(a / Chalkboard.numb.gcd(a, b) * b);
        };
        numb.map = (num, range1, range2) => {
            if (!Array.isArray(range1) || !Array.isArray(range2))
                throw new Error(`Chalkboard.numb.map: Parameters "range1" and "range2" must be arrays.`);
            if (range1.length !== 2 || range2.length !== 2)
                throw new Error(`Chalkboard.numb.map: Parameters "range1" and "range2" must be arrays of length 2.`);
            if (typeof num !== "number" || !Number.isFinite(num))
                throw new Error(`Chalkboard.numb.map: Parameter "num" must be a finite number.`);
            if (typeof range1[0] !== "number" || typeof range1[1] !== "number" || !Number.isFinite(range1[0]) || !Number.isFinite(range1[1]) || range1[0] >= range1[1])
                throw new Error(`Chalkboard.numb.map: Parameter "range1" must be an array of two finite numbers [min, max] with min < max.`);
            if (typeof range2[0] !== "number" || typeof range2[1] !== "number" || !Number.isFinite(range2[0]) || !Number.isFinite(range2[1]) || range2[0] > range2[1])
                throw new Error(`Chalkboard.numb.map: Parameter "range2" must be an array of two finite numbers [min, max] with min <= max.`);
            return range2[0] + (range2[1] - range2[0]) * ((num - range1[0]) / (range1[1] - range1[0]));
        };
        numb.mod = (a, b) => {
            if (typeof a !== "number" || typeof b !== "number" || !Number.isFinite(a) || !Number.isFinite(b))
                throw new Error(`Chalkboard.numb.mod: Parameters "a" and "b" must be finite numbers.`);
            if (b === 0)
                throw new Error(`Chalkboard.numb.mod: Parameter "b" must be non-zero.`);
            return ((a % b) + b) % b;
        };
        numb.mul = (formula, inf, sup) => {
            if (typeof formula !== "function")
                throw new Error(`Chalkboard.numb.mul: Parameter "formula" must be a function.`);
            if (!Number.isInteger(inf) || !Number.isInteger(sup))
                throw new Error(`Chalkboard.numb.mul: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.mul: Parameter "inf" must be less than or equal to "sup".`);
            let result = 1;
            for (let i = inf; i <= sup; i++)
                result *= formula(i);
            return result;
        };
        numb.nextPrime = (num) => {
            if (!Number.isFinite(num))
                throw new Error(`Chalkboard.numb.nextPrime: Parameter "num" must be finite.`);
            let result = Math.floor(num) + 1;
            if (result <= 2)
                return 2;
            if (result % 2 === 0)
                result++;
            while (!Chalkboard.numb.isPrime(result))
                result += 2;
            return result;
        };
        numb.permutation = (n, r) => {
            if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n)
                throw new Error(`Chalkboard.numb.permutation: Parameters "n" and "r" must be integers with 0 <= r <= n.`);
            let result = 1;
            for (let i = n; i > n - r; i--)
                result *= i;
            return Math.round(result);
        };
        numb.Poissonian = (l = 1) => {
            if (typeof l !== "number" || !Number.isFinite(l))
                throw new Error(`Chalkboard.numb.Poissonian: Parameter "l" must be a finite number.`);
            if (l <= 0)
                throw new Error(`Chalkboard.numb.Poissonian: Parameter "l" must be positive.`);
            const L = Chalkboard.E(-l);
            let p = 1, k = 0;
            for (; p > L; ++k)
                p *= Math.random();
            return k - 1;
        };
        numb.prime = (num) => {
            if (!Number.isInteger(num) || num < 1)
                throw new Error(`Chalkboard.numb.prime: Parameter "num" must be a positive integer.`);
            if (num === 1)
                return 2;
            let count = 1;
            let p = 3;
            while (true) {
                if (Chalkboard.numb.isPrime(p)) {
                    count++;
                    if (count === num)
                        return p;
                }
                p += 2;
            }
        };
        numb.primeArr = (inf, sup) => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup))
                throw new Error(`Chalkboard.numb.primeArr: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.primeArr: Parameter "inf" must be less than or equal to "sup".`);
            if (sup < 2)
                return [];
            const sieve = new Uint8Array(sup + 1);
            sieve[0] = 1;
            sieve[1] = 1;
            for (let p = 2; p * p <= sup; p++)
                if (sieve[p] === 0)
                    for (let i = p * p; i <= sup; i += p)
                        sieve[i] = 1;
            const result = [];
            const start = Math.max(2, inf);
            for (let i = start; i <= sup; i++)
                if (sieve[i] === 0)
                    result.push(i);
            return result;
        };
        numb.primeCount = (inf, sup) => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup))
                throw new Error(`Chalkboard.numb.primeCount: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.primeCount: Parameter "inf" must be less than or equal to "sup".`);
            return Chalkboard.numb.primeArr(inf, sup).length;
        };
        numb.primeGap = (inf, sup) => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup))
                throw new Error(`Chalkboard.numb.primeGap: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.primeGap: Parameter "inf" must be less than or equal to "sup".`);
            let prime = null;
            let gap = 0;
            for (let i = inf; i <= sup; i++)
                if (Chalkboard.numb.isPrime(i)) {
                    if (prime !== null) {
                        const temp = i - prime;
                        if (temp > gap)
                            gap = temp;
                    }
                    prime = i;
                }
            return gap;
        };
        numb.random = (inf = 0, sup = 1) => {
            if (typeof inf !== "number" || typeof sup !== "number" || !Number.isFinite(inf) || !Number.isFinite(sup))
                throw new Error(`Chalkboard.numb.random: Parameters "inf" and "sup" must be finite numbers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.random: Parameter "inf" must be less than or equal to "sup".`);
            return inf + (sup - inf) * Math.random();
        };
        numb.roundTo = (num, positionalIndex) => {
            if (!Number.isFinite(num) || !Number.isFinite(positionalIndex))
                throw new Error(`Chalkboard.numb.roundTo: Parameters must be finite numbers.`);
            if (positionalIndex === 0)
                throw new Error(`Chalkboard.numb.roundTo: Parameter "positionalIndex" must be non-zero.`);
            return Math.round(num / positionalIndex) * positionalIndex;
        };
        numb.sgn = (num) => {
            if (Number.isNaN(num))
                return undefined;
            if (!Number.isFinite(num))
                throw new Error(`Chalkboard.numb.sgn: Parameter "num" must be a finite number.`);
            if (num > 0)
                return 1;
            else if (num < 0)
                return -1;
            else
                return 0;
        };
        numb.sum = (formula, inf, sup) => {
            if (typeof formula !== "function")
                throw new Error(`Chalkboard.numb.sum: Parameter "formula" must be a function.`);
            if (!Number.isInteger(inf) || !Number.isInteger(sup))
                throw new Error(`Chalkboard.numb.sum: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup)
                throw new Error(`Chalkboard.numb.sum: Parameter "inf" must be less than or equal to "sup".`);
            let result = 0;
            for (let i = inf; i <= sup; i++)
                result += formula(i);
            return result;
        };
        numb.toBinary = (num, prefix = false) => {
            if (!Number.isInteger(num))
                throw new Error(`Chalkboard.numb.toBinary: Parameter "num" must be an integer.`);
            const sign = num < 0 ? "-" : "";
            const digits = Math.abs(num).toString(2);
            return sign + (prefix ? "0b" : "") + digits;
        };
        numb.toDecimal = (num, base) => {
            if (typeof num !== "string")
                throw new Error(`Chalkboard.numb.toDecimal: Parameter "num" must be a string.`);
            if (!Number.isInteger(base) || base < 2 || base > 36)
                throw new Error(`Chalkboard.numb.toDecimal: Parameter "base" must be an integer between 2 and 36.`);
            num = num.toLowerCase().trim();
            const isNegative = num.startsWith("-");
            if (isNegative)
                num = num.substring(1);
            if (base === 2 && num.startsWith("0b"))
                num = num.substring(2);
            if (base === 8 && num.startsWith("0o"))
                num = num.substring(2);
            if (base === 16 && num.startsWith("0x"))
                num = num.substring(2);
            if (num.length === 0)
                throw new Error(`Chalkboard.numb.toDecimal: Parameter "num" must contain digits.`);
            const chars = "0123456789abcdefghijklmnopqrstuvwxyz".substring(0, base);
            for (const char of num)
                if (!chars.includes(char))
                    throw new Error(`Chalkboard.numb.toDecimal: Invalid character "${char}" for base ${base}.`);
            const result = parseInt(num, base);
            if (!Number.isFinite(result))
                throw new Error(`Chalkboard.numb.toDecimal: Failed to parse "num".`);
            return isNegative ? -result : result;
        };
        numb.toFraction = (num, tolerance = 1e-8) => {
            if (typeof num !== "number" || typeof tolerance !== "number")
                throw new Error(`Chalkboard.numb.toFraction: Parameters "num" and "tolerance" must be numbers.`);
            if (!Number.isFinite(num))
                throw new Error(`Chalkboard.numb.toFraction: The parameter "num" must be finite to be converted to a fraction.`);
            if (!Number.isFinite(tolerance) || tolerance <= 0)
                throw new Error(`Chalkboard.numb.toFraction: The parameter "tolerance" must be a positive finite number.`);
            const sign = Chalkboard.numb.sgn(num);
            if (sign === undefined)
                throw new Error(`Chalkboard.numb.toFraction: The parameter "num" must be a valid number to be converted to a fraction.`);
            const x = Math.abs(num);
            if (Number.isInteger(x))
                return [sign * x, 1];
            let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
            let b = x;
            const MAX_ITER = 10000;
            for (let iter = 0; iter < MAX_ITER; iter++) {
                const a = Math.floor(b);
                const h = a * h1 + h2;
                const k = a * k1 + k2;
                if (k === 0)
                    break;
                const approx = h / k;
                if (Math.abs(x - approx) < tolerance) {
                    const g = Chalkboard.numb.gcd(h, k);
                    return [sign * (h / g), k / g];
                }
                h2 = h1;
                h1 = h;
                k2 = k1;
                k1 = k;
                const frac = b - a;
                if (Math.abs(frac) <= Number.EPSILON) {
                    const g = Chalkboard.numb.gcd(h, k);
                    return [sign * (h / g), k / g];
                }
                b = 1 / frac;
                if (!Number.isFinite(b)) {
                    const g = Chalkboard.numb.gcd(h, k);
                    return [sign * (h / g), k / g];
                }
            }
            throw new Error(`Chalkboard.numb.toFraction: Failed to converge to a fraction within the iteration limit.`);
        };
        numb.toHexadecimal = (num, prefix = false, uppercase = false) => {
            if (!Number.isInteger(num))
                throw new Error(`Chalkboard.numb.toHexadecimal: The parameter "num" must be an integer.`);
            const sign = num < 0 ? "-" : "";
            let digits = Math.abs(num).toString(16);
            if (uppercase)
                digits = digits.toUpperCase();
            return sign + (prefix ? "0x" : "") + digits;
        };
        numb.toOctal = (num, prefix = false) => {
            if (!Number.isInteger(num))
                throw new Error(`Chalkboard.numb.toOctal: The parameter "num" must be an integer.`);
            const sign = num < 0 ? "-" : "";
            const digits = Math.abs(num).toString(8);
            return sign + (prefix ? "0o" : "") + digits;
        };
    })(numb = Chalkboard.numb || (Chalkboard.numb = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let plot;
    (function (plot) {
        const getContext = () => {
            try {
                return Function('"use strict"; return (' + Chalkboard.CONTEXT + ')')();
            }
            catch (e) {
                throw new Error("Cannot initialize canvas context. Make sure an HTML <canvas> element exists in the webpage before using Chalkboard.plot functions.");
            }
        };
        plot.autocorrelation = (func, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.autocorrelation(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.autocorrelation(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.barplot = (arr, bins, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "white",
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.fillStyle = config.fillStyle;
            const bars = [];
            for (let i = 0; i < bins.length; i++) {
                if (i === 0) {
                    bars.push(Chalkboard.stat.lt(arr, bins[0], true));
                }
                else if (i === bins.length) {
                    bars.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                }
                else {
                    bars.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            const counts = [];
            for (let i = 0; i < bars.length; i++) {
                counts.push(bars[i].length);
            }
            let x = 0;
            const width = counts.length / (2 * config.size);
            for (let i = 0; i < counts.length; i++) {
                config.context.fillRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                config.context.strokeRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                x += 1 / config.size;
            }
            config.context.restore();
            return bars;
        };
        plot.comp = (comp, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || getContext()
            }).size /= 100;
            config.context.fillStyle = config.fillStyle;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.beginPath();
            config.context.ellipse(comp.a / config.size, -comp.b / config.size, config.lineWidth, config.lineWidth, 0, 0, Chalkboard.PI(2));
            config.context.fill();
            config.context.restore();
            return [[comp.a], [comp.b]];
        };
        plot.convolution = (func1, func2, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.convolution(func1, func2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.convolution(func1, func2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.correlation = (func1, func2, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.correlation(func1, func2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.correlation(func1, func2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.definition = (func, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || (func.field === "comp" ? [[-10, 10], [-10, 10]] : [-10, 10]),
                res: config.res || (func.field === "comp" ? 5 : 1),
                isInverse: config.isInverse || false,
                isPolar: config.isPolar || false,
                context: config.context || getContext()
            }).size /= 100;
            const xdomain = config.domain;
            const xydomain = config.domain;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if (func.type === "scalar2d" && !config.isInverse && !config.isPolar) {
                const f = func.rule;
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -f(i * config.size) / config.size);
                    data.push([i, f(i)]);
                }
            }
            else if (func.type === "scalar2d" && config.isInverse && !config.isPolar) {
                const f = func.rule;
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i += config.res) {
                    config.context.lineTo(f(i * config.size) / config.size, -i);
                    data.push([f(i), i]);
                }
            }
            else if (func.type === "scalar2d" && !config.isInverse && config.isPolar) {
                const r = func.rule;
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i += config.res) {
                    config.context.lineTo((r(i * config.size) / config.size) * Chalkboard.trig.cos(i * config.size), (-r(i * config.size) / config.size) * Chalkboard.trig.sin(i * config.size));
                    data.push([i, r(i)]);
                }
            }
            else if (func.type === "curve2d") {
                const f = func.rule;
                for (let i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i += config.res) {
                    config.context.lineTo(f[0](i * config.size) / config.size, -f[1](i * config.size) / config.size);
                    data.push([f[0](i), f[1](i)]);
                }
            }
            else if (func.field === "comp") {
                const f = func.rule;
                for (let i = xydomain[0][0] / config.size; i <= xydomain[0][1] / config.size; i += config.res) {
                    for (let j = xydomain[1][0] / config.size; j <= xydomain[1][1] / config.size; j += config.res) {
                        const z = Chalkboard.comp.init(f[0](i * config.size, j * config.size) / config.size, f[1](i * config.size, j * config.size) / config.size);
                        if (z.a === 0 && z.b === 0) {
                            config.context.fillStyle = "rgb(0, 0, 0)";
                        }
                        else if (z.a === Infinity && z.b === Infinity) {
                            config.context.fillStyle = "rgb(255, 255, 255)";
                        }
                        else {
                            config.context.fillStyle =
                                "hsl(" + Chalkboard.trig.toDeg(Chalkboard.comp.arg(z)) + ", 100%, " + (Chalkboard.trig.tanh(Chalkboard.comp.mag(z) / Chalkboard.real.pow(10, 20)) + 0.5) * 100 + "%)";
                        }
                        config.context.fillRect(i, j, 5, 5);
                        data.push([f[0](i, j), f[1](i, j)]);
                    }
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a property "type" of "expl", "inve", "pola", "curv", or "comp".');
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.dfdx = (func, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                isInverse: config.isInverse || false,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "scalar2d" && !config.isInverse) {
                    config.context.lineTo(i, -Chalkboard.calc.dfdx(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.dfdx(func, i)]);
                }
                else if (func.type === "scalar2d" && config.isInverse) {
                    config.context.lineTo(Chalkboard.calc.dfdx(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.dfdx(func, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.d2fdx2 = (func, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                isInverse: config.isInverse || false,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "scalar2d" && !config.isInverse) {
                    config.context.lineTo(i, -Chalkboard.calc.d2fdx2(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.d2fdx2(func, i)]);
                }
                else if (func.type === "scalar2d" && config.isInverse) {
                    config.context.lineTo(Chalkboard.calc.d2fdx2(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.d2fdx2(func, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.field = (vectfield, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [[-10, 10], [-10, 10]],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth;
            config.context.save();
            config.context.translate(config.x, config.y);
            for (let i = config.domain[0][0] / config.size; i <= config.domain[0][1] / config.size; i += config.res) {
                for (let j = config.domain[1][0] / config.size; j <= config.domain[1][1] / config.size; j += config.res) {
                    const v = Chalkboard.vect.fromField(vectfield, Chalkboard.vect.init(i, j));
                    config.context.beginPath();
                    config.context.moveTo(i, j);
                    config.context.lineTo(i + v.x, j + v.y);
                    config.context.stroke();
                    data.push([i + v.x, j + v.y]);
                }
            }
            config.context.restore();
            return data;
        };
        plot.Fourier = (func, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Fourier(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.Fourier(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.fxdx = (func, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                isInverse: config.isInverse || false,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "scalar2d" && !config.isInverse) {
                    config.context.lineTo(i, -Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.fxdx(func, 0, i)]);
                }
                else if (func.type === "scalar2d" && config.isInverse) {
                    config.context.lineTo(Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.fxdx(func, 0, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.Laplace = (func, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if (config.domain[0] >= 0) {
                for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            else {
                for (let i = 0; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.lineplot = (arr, bins, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            const verts = [];
            for (let i = 0; i < bins.length; i++) {
                if (i === 0) {
                    verts.push(Chalkboard.stat.lt(arr, bins[0], true));
                }
                else if (i === bins.length) {
                    verts.push(Chalkboard.stat.gt(arr, bins[bins.length - 1], true));
                }
                else {
                    verts.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], false, true));
                }
            }
            const counts = [];
            for (let i = 0; i < verts.length; i++) {
                counts.push(verts[i].length);
            }
            config.context.beginPath();
            for (let i = 0; i < counts.length; i++) {
                config.context.lineTo(i / config.size, -counts[i] / config.size);
            }
            config.context.stroke();
            config.context.restore();
            return verts;
        };
        plot.matr = (matr, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                context: config.context || getContext()
            }).size /= 100;
            for (let i = config.domain[0]; i <= config.domain[1]; i++) {
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), {
                    x: config.x,
                    y: config.y + (i / config.size) * matr[1][1],
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), {
                    x: config.x,
                    y: config.y + (i / config.size) * matr[1][1],
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), {
                    x: config.x + (i / config.size) * matr[0][0],
                    y: config.y,
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), {
                    x: config.x + (i / config.size) * matr[0][0],
                    y: config.y,
                    size: config.size,
                    strokeStyle: config.strokeStyle,
                    lineWidth: config.lineWidth / 4,
                    context: config.context
                });
            }
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), config);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), config);
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), config);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), config);
            return matr;
        };
        plot.ode = (sol, config = {}) => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y))
                throw new Error(`Chalkboard.plot.ode: Parameter "sol" must have properties "t" and "y" as arrays.`);
            if (sol.t.length !== sol.y.length || sol.t.length === 0)
                throw new Error(`Chalkboard.plot.ode: Invalid solution object (length mismatch or empty).`);
            const ctx = config.context || getContext();
            const x0 = (config.x ?? ctx.canvas.width / 2);
            const y0 = (config.y ?? ctx.canvas.height / 2);
            const strokeStyle = config.strokeStyle ?? "black";
            const lineWidth = config.lineWidth ?? 2;
            const size = ((config.size ?? 1) / 100);
            const phase = config.phase ?? false;
            const i = config.i ?? 0;
            const j = config.j ?? 1;
            const dim = sol.y[0].length;
            if (!Number.isInteger(i) || i < 0)
                throw new Error(`Chalkboard.plot.ode: "i" must be an integer >= 0.`);
            if (i >= dim)
                throw new Error(`Chalkboard.plot.ode: "i" is out of range for solution dimension.`);
            if (phase) {
                if (!Number.isInteger(j) || j < 0)
                    throw new Error(`Chalkboard.plot.ode: "j" must be an integer >= 0.`);
                if (j >= dim)
                    throw new Error(`Chalkboard.plot.ode: "j" is out of range for solution dimension.`);
                if (i === j)
                    throw new Error(`Chalkboard.plot.ode: For phase plots, "i" and "j" must be different.`);
            }
            const data = [];
            ctx.save();
            ctx.translate(x0, y0);
            ctx.lineWidth = lineWidth;
            ctx.strokeStyle = strokeStyle;
            ctx.beginPath();
            if (!phase) {
                for (let k = 0; k < sol.t.length; k++) {
                    const X = sol.t[k] / size;
                    const Y = -sol.y[k][i] / size;
                    if (k === 0)
                        ctx.moveTo(X, Y);
                    else
                        ctx.lineTo(X, Y);
                    data.push([sol.t[k], sol.y[k][i]]);
                }
            }
            else {
                for (let k = 0; k < sol.y.length; k++) {
                    const X = sol.y[k][i] / size;
                    const Y = -sol.y[k][j] / size;
                    if (k === 0)
                        ctx.moveTo(X, Y);
                    else
                        ctx.lineTo(X, Y);
                    data.push([sol.y[k][i], sol.y[k][j]]);
                }
            }
            ctx.stroke();
            ctx.restore();
            return data;
        };
        plot.rOplane = (config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            const cw = getContext().canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for (let i = 0; i <= (config.size * cw) / 2; i++) {
                config.context.ellipse(0, 0, i / config.size, i / config.size, 0, 0, Chalkboard.PI(2));
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
        };
        plot.scatterplot = (arr1, arr2, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.fillStyle = config.fillStyle;
            if (arr1.length === arr2.length) {
                for (let i = 0; i < arr1.length; i++) {
                    config.context.beginPath();
                    config.context.ellipse(arr1[i] / config.size - arr1.length / (2 * config.size), -arr2[i] / config.size + arr1.length / (2 * config.size), config.lineWidth, config.lineWidth, 0, 0, Chalkboard.PI(2));
                    config.context.fill();
                    data.push([arr1[i], arr2[i]]);
                }
            }
            config.context.restore();
            return data;
        };
        plot.Taylor = (func, n, a, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || getContext()
            }).size /= 100;
            const data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (let i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Taylor(func, i * config.size, n, a) / config.size);
                data.push([i, Chalkboard.calc.Taylor(func, i, n, a)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.vect = (vect, config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || getContext()
            }).size /= 100;
            vect = vect;
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
        };
        plot.xyplane = (config) => {
            (config = {
                x: (config = config || {}).x || getContext().canvas.width / 2,
                y: config.y || getContext().canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || getContext()
            }).size /= 100;
            const cw = getContext().canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for (let i = Math.floor(-config.x / config.size); i <= (cw - config.x) / config.size; i++) {
                config.context.moveTo(i / config.size, -config.y);
                config.context.lineTo(i / config.size, cw - config.y);
            }
            config.context.stroke();
            config.context.beginPath();
            for (let i = Math.floor(-config.y / config.size); i <= (cw - config.y) / config.size; i++) {
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
        };
    })(plot = Chalkboard.plot || (Chalkboard.plot = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let quat;
    (function (quat_1) {
        quat_1.absolute = (quat) => {
            return Chalkboard.quat.init(Math.abs(quat.a), Math.abs(quat.b), Math.abs(quat.c), Math.abs(quat.d));
        };
        quat_1.add = (quat1, quat2) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a + quat2.a, quat1.b + quat2.b, quat1.c + quat2.c, quat1.d + quat2.d);
        };
        quat_1.conjugate = (quat) => {
            return Chalkboard.quat.init(quat.a, -quat.b, -quat.c, -quat.d);
        };
        quat_1.constrain = (quat, range = [0, 1]) => {
            return Chalkboard.quat.init(Chalkboard.numb.constrain(quat.a, range), Chalkboard.numb.constrain(quat.b, range), Chalkboard.numb.constrain(quat.c, range), Chalkboard.numb.constrain(quat.d, range));
        };
        quat_1.copy = (quat) => {
            return Object.create(Object.getPrototypeOf(quat), Object.getOwnPropertyDescriptors(quat));
        };
        quat_1.dist = (quat1, quat2) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.real.sqrt((quat2.a - quat1.a) * (quat2.a - quat1.a) + (quat2.b - quat1.b) * (quat2.b - quat1.b) + (quat2.c - quat1.c) * (quat2.c - quat1.c) + (quat2.d - quat1.d) * (quat2.d - quat1.d));
        };
        quat_1.distsq = (quat1, quat2) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return (quat2.a - quat1.a) * (quat2.a - quat1.a) + (quat2.b - quat1.b) * (quat2.b - quat1.b) + (quat2.c - quat1.c) * (quat2.c - quat1.c) + (quat2.d - quat1.d) * (quat2.d - quat1.d);
        };
        quat_1.div = (quat1, quat2) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init((quat1.a * quat2.a + quat1.b * quat2.b + quat1.c * quat2.c + quat1.d * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.b * quat2.a - quat1.a * quat2.b - quat1.d * quat2.c + quat1.c * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.c * quat2.a + quat1.d * quat2.b - quat1.a * quat2.c - quat1.b * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.d * quat2.a - quat1.c * quat2.b + quat1.b * quat2.c - quat1.a * quat2.d) / Chalkboard.quat.magsq(quat2));
        };
        quat_1.fromAxis = (vect, rad) => {
            vect = vect;
            if (typeof vect.z !== "undefined") {
                return Chalkboard.quat.init(Chalkboard.trig.cos(rad / 2), vect.x * Chalkboard.trig.sin(rad / 2), vect.y * Chalkboard.trig.sin(rad / 2), vect.z * Chalkboard.trig.sin(rad / 2));
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 3 dimensions.');
            }
        };
        quat_1.init = (a, b = 0, c = 0, d = 0) => {
            return { a: a, b: b, c: c, d: d };
        };
        quat_1.invert = (quat) => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.magsq(quat), -quat.b / Chalkboard.quat.magsq(quat), -quat.c / Chalkboard.quat.magsq(quat), -quat.d / Chalkboard.quat.magsq(quat));
        };
        quat_1.isApproxEqual = (quat1, quat2, precision = 0.000001) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.numb.isApproxEqual(quat1.a, quat2.a, precision) && Chalkboard.numb.isApproxEqual(quat1.b, quat2.b, precision) && Chalkboard.numb.isApproxEqual(quat1.c, quat2.c, precision) && Chalkboard.numb.isApproxEqual(quat1.d, quat2.d, precision);
        };
        quat_1.isEqual = (quat1, quat2) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return quat1.a === quat2.a && quat1.b === quat2.b && quat1.c === quat2.c && quat1.d === quat2.d;
        };
        quat_1.isInverse = (quat1, quat2, precision = 0.000001) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.isApproxEqual(Chalkboard.quat.mul(quat1, quat2), Chalkboard.quat.init(1, 0, 0, 0), precision);
        };
        quat_1.isNormalized = (quat) => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.quat.magsq(quat), 1);
        };
        quat_1.isZero = (quat) => {
            if (typeof quat === "number")
                quat = Chalkboard.quat.init(quat, 0, 0, 0);
            return Chalkboard.quat.isApproxEqual(quat, Chalkboard.quat.init(0, 0, 0, 0));
        };
        quat_1.mag = (quat) => {
            return Chalkboard.real.sqrt(quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d);
        };
        quat_1.magset = (quat, num) => {
            return Chalkboard.quat.scl(Chalkboard.quat.normalize(quat), num);
        };
        quat_1.magsq = (quat) => {
            return quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d;
        };
        quat_1.mul = (quat1, quat2) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a * quat2.a - quat1.b * quat2.b - quat1.c * quat2.c - quat1.d * quat2.d, quat1.a * quat2.b + quat1.b * quat2.a + quat1.c * quat2.d - quat1.d * quat2.c, quat1.a * quat2.c - quat1.b * quat2.d + quat1.c * quat2.a + quat1.d * quat2.b, quat1.a * quat2.d + quat1.b * quat2.c - quat1.c * quat2.b + quat1.d * quat2.a);
        };
        quat_1.negate = (quat) => {
            return Chalkboard.quat.init(-quat.a, -quat.b, -quat.c, -quat.d);
        };
        quat_1.normalize = (quat) => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.mag(quat), quat.b / Chalkboard.quat.mag(quat), quat.c / Chalkboard.quat.mag(quat), quat.d / Chalkboard.quat.mag(quat));
        };
        quat_1.print = (quat) => {
            console.log(Chalkboard.quat.toString(quat));
        };
        quat_1.random = (inf = 0, sup = 1) => {
            return Chalkboard.quat.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };
        quat_1.reciprocate = (quat) => {
            return Chalkboard.quat.init(1 / quat.a, 1 / quat.b, 1 / quat.c, 1 / quat.d);
        };
        quat_1.round = (quat) => {
            return Chalkboard.quat.init(Math.round(quat.a), Math.round(quat.b), Math.round(quat.c), Math.round(quat.d));
        };
        quat_1.scl = (quat, num) => {
            return Chalkboard.quat.init(quat.a * num, quat.b * num, quat.c * num, quat.d * num);
        };
        quat_1.sub = (quat1, quat2) => {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a - quat2.a, quat1.b - quat2.b, quat1.c - quat2.c, quat1.d - quat2.d);
        };
        quat_1.toArray = (quat) => {
            return [quat.a, quat.b, quat.c, quat.d];
        };
        quat_1.toMatrix = (quat) => {
            return Chalkboard.matr.init([quat.a, -quat.b, -quat.c, -quat.d], [quat.b, quat.a, -quat.d, quat.c], [quat.c, quat.d, quat.a, -quat.b], [quat.d, -quat.c, quat.b, quat.a]);
        };
        quat_1.toRotation = (quat, vect) => {
            const vector = Chalkboard.vect.toQuaternion(vect);
            const inverse = Chalkboard.quat.invert(quat);
            const quat_vector_inverse = Chalkboard.quat.mul(quat, Chalkboard.quat.mul(vector, inverse));
            return Chalkboard.vect.init(quat_vector_inverse.b, quat_vector_inverse.c, quat_vector_inverse.d);
        };
        quat_1.toString = (quat) => {
            let str = quat.a.toString();
            if (quat.b >= 0) {
                str += " + " + (quat.b === 1 ? "i" : quat.b.toString() + "i");
            }
            else {
                str += " - " + (quat.b === -1 ? "i" : Math.abs(quat.b).toString() + "i");
            }
            if (quat.c >= 0) {
                str += " + " + (quat.c === 1 ? "j" : quat.c.toString() + "j");
            }
            else {
                str += " - " + (quat.c === -1 ? "j" : Math.abs(quat.c).toString() + "j");
            }
            if (quat.d >= 0) {
                str += " + " + (quat.d === 1 ? "k" : quat.d.toString() + "k");
            }
            else {
                str += " - " + (quat.d === -1 ? "k" : Math.abs(quat.d).toString() + "k");
            }
            return str;
        };
        quat_1.toTypedArray = (quat, type = "float32") => {
            const arr = Chalkboard.quat.toArray(quat);
            if (type === "int8") {
                return new Int8Array(arr);
            }
            else if (type === "int16") {
                return new Int16Array(arr);
            }
            else if (type === "int32") {
                return new Int32Array(arr);
            }
            else if (type === "float32") {
                return new Float32Array(arr);
            }
            else if (type === "float64") {
                return new Float64Array(arr);
            }
            else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };
        quat_1.toVector = (quat) => {
            return Chalkboard.vect.init(quat.a, quat.b, quat.c, quat.d);
        };
    })(quat = Chalkboard.quat || (Chalkboard.quat = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let real;
    (function (real) {
        real.absolute = (func) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.real.absolute: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule;
                const g = (...x) => Math.abs(f(...x));
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("vector")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x) => Math.abs(f[i](...x)));
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("curve")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t) => Math.abs(f[i](t)));
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("surface")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s, t) => Math.abs(f[i](s, t)));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.absolute: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.add = (func1, func2) => {
            if (func1.field !== "real" || func2.field !== "real")
                throw new TypeError("Chalkboard.real.add: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type)
                throw new TypeError("Chalkboard.real.add: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = (...x) => f1(...x) + f2(...x);
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x) => f1[i](...x) + f2[i](...x));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t) => f1[i](t) + f2[i](t));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s, t) => f1[i](s, t) + f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.add: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.compose = (func1, func2) => {
            if (func1.field !== "real" || func2.field !== "real")
                throw new TypeError("Chalkboard.real.compose: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type)
                throw new TypeError("Chalkboard.real.compose: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = (...x) => f1(f2(...x));
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x) => f1[i](f2[i](...x)));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.compose: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', or 'vector4d'.");
        };
        real.define = (...rule) => {
            let f;
            let type = "scalar2d";
            if (rule.length === 1 && Array.isArray(rule[0])) {
                f = rule[0];
            }
            else if (rule.length > 1) {
                f = rule;
            }
            else {
                f = rule[0];
            }
            if (Array.isArray(f)) {
                if (f.length === 2) {
                    if (f[0].length === 1) {
                        type = "curve2d";
                    }
                    else if (f[0].length === 2) {
                        type = "vector2d";
                    }
                    else {
                        throw new TypeError("Chalkboard.real.define: Functions in array 'rule' must have one variable to define a parametric curve or two variables to define a vector field.");
                    }
                }
                else if (f.length === 3) {
                    if (f[0].length === 1) {
                        type = "curve3d";
                    }
                    else if (f[0].length === 2) {
                        type = "surface3d";
                    }
                    else if (f[0].length === 3) {
                        type = "vector3d";
                    }
                    else {
                        throw new TypeError("Chalkboard.real.define: Functions in array 'rule' must have one variable to define a parametric curve, two variables to define a parametric surface, or three variables to define a vector field.");
                    }
                }
                else if (f.length === 4) {
                    if (f[0].length === 1) {
                        type = "curve4d";
                    }
                    else if (f[0].length === 4) {
                        type = "vector4d";
                    }
                    else {
                        throw new TypeError("Chalkboard.real.define: Functions in array 'rule' must have one variable to define a parametric curve or four variables to define a vector field.");
                    }
                }
            }
            else {
                if (f.length === 1) {
                    type = "scalar2d";
                }
                else if (f.length === 2) {
                    type = "scalar3d";
                }
                else if (f.length === 3) {
                    type = "scalar4d";
                }
                else {
                    throw new TypeError("Chalkboard.real.define: Function 'rule' must have one, two, or three variables to define a scalar function.");
                }
            }
            return { rule: f, field: "real", type };
        };
        real.Dirac = (num, edge = 0, scl = 1) => {
            if (num === edge) {
                return scl;
            }
            else {
                return 0;
            }
        };
        real.discriminant = (a, b, c, form = "standard") => {
            if (form === "standard") {
                return b * b - 4 * a * c;
            }
            else if (form === "vertex") {
                return 2 * a * b * (2 * a * b) - 4 * a * c;
            }
            else {
                throw new TypeError("Chalkboard.real.discriminant: String 'form' must be 'standard' or 'vertex'.");
            }
        };
        real.div = (func1, func2) => {
            if (func1.field !== "real" || func2.field !== "real")
                throw new TypeError("Chalkboard.real.div: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type)
                throw new TypeError("Chalkboard.real.div: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = (...x) => f1(...x) / f2(...x);
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x) => f1[i](...x) / f2[i](...x));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t) => f1[i](t) / f2[i](t));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s, t) => f1[i](s, t) / f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.div: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.erf = (num) => {
            if (typeof num !== "number" || !Number.isFinite(num))
                throw new TypeError("Chalkboard.real.erf: Parameter 'num' must be a finite number.");
            const sign = num < 0 ? -1 : 1;
            const x = Math.abs(num);
            const p = 0.3275911;
            const a1 = 0.254829592;
            const a2 = -0.284496736;
            const a3 = 1.421413741;
            const a4 = -1.453152027;
            const a5 = 1.061405429;
            const t = 1 / (1 + p * x);
            const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t) * Chalkboard.E(-x * x);
            return sign * y;
        };
        real.Gamma = (num) => {
            if (typeof num !== "number" || !Number.isFinite(num))
                throw new TypeError("Chalkboard.real.Gamma: Parameter 'num' must be a finite number.");
            if (Number.isInteger(num) && num <= 0)
                return NaN;
            const p0 = 0.99999999999980993;
            const p1 = 676.5203681218851;
            const p2 = -1259.1392167224028;
            const p3 = 771.32342877765313;
            const p4 = -176.61502916214059;
            const p5 = 12.507343278686905;
            const p6 = -0.13857109526572012;
            const p7 = 9.9843695780195716e-6;
            const p8 = 1.5056327351493116e-7;
            if (num < 0.5)
                return Chalkboard.PI() / (Chalkboard.trig.sin(Chalkboard.PI(num)) * Chalkboard.real.Gamma(1 - num));
            const g = 7;
            let x = num - 1;
            let a = p0;
            a += p1 / (x + 1);
            a += p2 / (x + 2);
            a += p3 / (x + 3);
            a += p4 / (x + 4);
            a += p5 / (x + 5);
            a += p6 / (x + 6);
            a += p7 / (x + 7);
            a += p8 / (x + 8);
            const t = x + g + 0.5;
            return Chalkboard.real.sqrt(Chalkboard.PI(2)) * Chalkboard.real.pow(t, x + 0.5) * Chalkboard.E(-t) * a;
        };
        real.Heaviside = (num, edge = 0, scl = 1) => {
            if (num >= edge) {
                return scl;
            }
            else {
                return 0;
            }
        };
        real.lerp = (p, t) => {
            return (p[1] - p[0]) * t + p[0];
        };
        real.linear = (x1, y1, x2, y2) => {
            return Chalkboard.real.define((x) => Chalkboard.real.slope(x1, y1, x2, y2) * (x - x2) + y2);
        };
        real.linearFormula = (a, b, c, d) => {
            if (typeof c === "undefined" && typeof d === "undefined") {
                return -b / a;
            }
            else if (typeof c === "number" && typeof d === "undefined") {
                return c / a;
            }
            else {
                return -b / Chalkboard.real.slope(a, b, c, d) + a;
            }
        };
        real.ln = (num) => {
            if (num <= 0)
                return NaN;
            if (num === 1)
                return 0;
            if (num === Infinity)
                return Infinity;
            const LN2 = 0.6931471805599453;
            let E = 0, m = num;
            while (m > 1.414213562373095) {
                m *= 0.5;
                E++;
            }
            while (m < 0.7071067811865475) {
                m *= 2.0;
                E--;
            }
            const y = (m - 1) / (m + 1), y2 = y * y, y3 = y2 * y, y5 = y3 * y2, y7 = y5 * y2, y9 = y7 * y2, y11 = y9 * y2, y13 = y11 * y2, y15 = y13 * y2, y17 = y15 * y2, y19 = y17 * y2;
            const series = y + y3 / 3 + y5 / 5 + y7 / 7 + y9 / 9 + y11 / 11 + y13 / 13 + y15 / 15 + y17 / 17 + y19 / 19;
            return 2 * series + E * LN2;
        };
        real.log = (base, num) => {
            return Chalkboard.real.ln(num) / Chalkboard.real.ln(base);
        };
        real.log10 = (num) => {
            return Chalkboard.real.log(10, num);
        };
        real.mul = (func1, func2) => {
            if (func1.field !== "real" || func2.field !== "real")
                throw new TypeError("Chalkboard.real.mul: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type)
                throw new TypeError("Chalkboard.real.mul: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = (...x) => f1(...x) * f2(...x);
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x) => f1[i](...x) * f2[i](...x));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t) => f1[i](t) * f2[i](t));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s, t) => f1[i](s, t) * f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.mul: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.negate = (func) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.real.negate: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule;
                const g = (...x) => -f(...x);
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("vector")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x) => -f[i](...x));
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("curve")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t) => -f[i](t));
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("surface")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s, t) => -f[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.negate: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.parse = (expr, config = { returnAST: false, returnJSON: false, returnLaTeX: false }) => {
            if (expr === "")
                return "";
            const tokenize = (input) => {
                const tokens = [];
                let i = 0;
                const registered = ["sin", "cos", "tan", "abs", "sqrt", "log", "ln", "exp", "min", "max"];
                const isFunction = (name) => registered.includes(name) || Chalkboard.REGISTRY[name] !== undefined;
                while (i < input.length) {
                    const ch = input[i];
                    if (/\s/.test(ch)) {
                        i++;
                        continue;
                    }
                    if ("+-*/(),^".indexOf(ch) !== -1) {
                        tokens.push(ch);
                        i++;
                        if (ch === ")" && i < input.length && (/[a-zA-Z0-9_(]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                        }
                    }
                    else if (/[0-9]/.test(ch) || (ch === "." && /[0-9]/.test(input[i + 1]))) {
                        let num = "";
                        let hasDecimal = false;
                        while (i < input.length && ((/[0-9]/.test(input[i])) || (input[i] === "." && !hasDecimal))) {
                            if (input[i] === ".")
                                hasDecimal = true;
                            num += input[i++];
                        }
                        tokens.push(num);
                        if (i < input.length && (/[a-zA-Z_(]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                        }
                    }
                    else if (/[a-zA-Z_]/.test(ch)) {
                        let name = "";
                        while (i < input.length && /[a-zA-Z0-9_]/.test(input[i])) {
                            name += input[i++];
                        }
                        if (/^[a-zA-Z]+$/.test(name) && name.length > 1 && !isFunction(name)) {
                            for (let j = 0; j < name.length; j++) {
                                tokens.push(name[j]);
                                if (j < name.length - 1)
                                    tokens.push("*");
                            }
                        }
                        else {
                            tokens.push(name);
                        }
                        if (i < input.length && input[i] === "(") {
                            if (!isFunction(name)) {
                                if (tokens[tokens.length - 1] !== "*")
                                    tokens.push("*");
                            }
                        }
                        else if (i < input.length && (/[a-zA-Z_]/.test(input[i]))) {
                            if (tokens[tokens.length - 1] !== "*")
                                tokens.push("*");
                        }
                    }
                    else {
                        throw new Error(`Chalkboard.real.parse: Unexpected character ${ch}`);
                    }
                }
                return tokens;
            };
            const parseTokens = (tokens) => {
                let pos = 0;
                const peek = () => tokens[pos] || "";
                const consume = (token) => {
                    if (token && tokens[pos] !== token)
                        throw new Error(`Chalkboard.real.parse: Expected token '${token}' but found '${tokens[pos]}'`);
                    return tokens[pos++];
                };
                const parseExpression = () => parseAdditive();
                const parseAdditive = () => {
                    let node = parseMultiplicative();
                    while (peek() === "+" || peek() === "-") {
                        const op = consume();
                        const right = parseMultiplicative();
                        node = { type: op === "+" ? "add" : "sub", left: node, right };
                    }
                    return node;
                };
                const parseMultiplicative = () => {
                    let node = parseUnary();
                    while (peek() === "*" || peek() === "/") {
                        const op = consume();
                        const right = parseUnary();
                        node = { type: op === "*" ? "mul" : "div", left: node, right };
                    }
                    return node;
                };
                const parseUnary = () => {
                    if (peek() === "-") {
                        consume("-");
                        return { type: "neg", expr: parseExponent() };
                    }
                    else if (peek() === "+") {
                        consume("+");
                        return parseExponent();
                    }
                    return parseExponent();
                };
                const parseExponent = () => {
                    let node = parsePrimary();
                    if (peek() === "^") {
                        consume("^");
                        const right = parseExponentUnary();
                        node = { type: "pow", base: node, exponent: right };
                    }
                    return node;
                };
                const parseExponentUnary = () => {
                    if (peek() === "-") {
                        consume("-");
                        return { type: "neg", expr: parseExponentUnary() };
                    }
                    if (peek() === "+") {
                        consume("+");
                        return parseExponentUnary();
                    }
                    return parseExponent();
                };
                const parsePrimary = () => {
                    const token = peek();
                    if (/^-?[0-9]/.test(token) || /^-?\.[0-9]/.test(token)) {
                        consume();
                        return { type: "num", value: parseFloat(token) };
                    }
                    if (/^[a-zA-Z_]/.test(token)) {
                        const name = consume();
                        if (peek() === "(") {
                            consume("(");
                            const args = [];
                            if (peek() !== ")") {
                                args.push(parseExpression());
                                while (peek() === ",") {
                                    consume(",");
                                    args.push(parseExpression());
                                }
                            }
                            consume(")");
                            return { type: "func", name, args };
                        }
                        return { type: "var", name };
                    }
                    if (token === "(") {
                        consume("(");
                        const node = parseExpression();
                        consume(")");
                        return node;
                    }
                    throw new Error(`Chalkboard.real.parse: Unexpected token ${token}`);
                };
                const ast = parseExpression();
                if (pos < tokens.length)
                    throw new Error(`Chalkboard.real.parse: Unexpected token ${tokens[pos]}`);
                return ast;
            };
            const evaluateNode = (node, values) => {
                switch (node.type) {
                    case "num": {
                        return node.value;
                    }
                    case "var": {
                        const varname = node.name;
                        if (varname in values)
                            return values[varname];
                        throw new Error(`Chalkboard.real.parse: Variable '${varname}' not defined in values`);
                    }
                    case "add": {
                        return evaluateNode(node.left, values) + evaluateNode(node.right, values);
                    }
                    case "sub": {
                        return evaluateNode(node.left, values) - evaluateNode(node.right, values);
                    }
                    case "mul": {
                        return evaluateNode(node.left, values) * evaluateNode(node.right, values);
                    }
                    case "div": {
                        const numerator = evaluateNode(node.left, values);
                        const denominator = evaluateNode(node.right, values);
                        if (denominator === 0)
                            throw new Error(`Chalkboard.real.parse: Division by zero`);
                        return numerator / denominator;
                    }
                    case "pow": {
                        return Math.pow(evaluateNode(node.base, values), evaluateNode(node.exponent, values));
                    }
                    case "neg": {
                        return -evaluateNode(node.expr, values);
                    }
                    case "func": {
                        const funcName = node.name.toLowerCase();
                        const args = node.args.map((arg) => evaluateNode(arg, values));
                        if (Chalkboard.REGISTRY[funcName] !== undefined)
                            return Chalkboard.REGISTRY[funcName](...args);
                        switch (funcName) {
                            case "sin": return Math.sin(args[0]);
                            case "cos": return Math.cos(args[0]);
                            case "tan": return Math.tan(args[0]);
                            case "abs": return Math.abs(args[0]);
                            case "sqrt": return Math.sqrt(args[0]);
                            case "log": return args.length > 1 ? Math.log(args[0]) / Math.log(args[1]) : Math.log(args[0]);
                            case "ln": return Math.log(args[0]);
                            case "exp": return Math.exp(args[0]);
                            case "min": return Math.min(...args);
                            case "max": return Math.max(...args);
                            default: throw new Error(`Chalkboard.real.parse: Unknown function ${node.name}`);
                        }
                    }
                }
                throw new Error(`Chalkboard.real.parse: Unknown node type ${node.type}`);
            };
            const nodeToString = (node) => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        if (node.right.type === "mul" && node.right.left?.type === "num" && node.right.left.value === -1 && node.right.right?.type === "neg")
                            return `${nodeToString(node.left)} + ${nodeToString(node.right.right.expr)}`;
                        if (node.right.type === "num" && node.right.value < 0)
                            return `${nodeToString(node.left)} - ${nodeToString({ type: "num", value: -node.right.value })}`;
                        if (node.right.type === "neg")
                            return `${nodeToString(node.left)} - ${nodeToString(node.right.expr)}`;
                        if (node.right.type === "mul" && node.right.left.type === "num" && node.right.left.value < 0)
                            return `${nodeToString(node.left)} - ${nodeToString({ type: "mul", left: { type: "num", value: -node.right.left.value }, right: node.right.right })}`;
                        if (node.right.type === "mul" && node.right.right.type === "num" && node.right.right.value < 0)
                            return `${nodeToString(node.left)} - ${nodeToString({ type: "mul", left: node.right.left, right: { type: "num", value: -node.right.right.value } })}`;
                        if (nodeToString(node.right).startsWith("-"))
                            return `${nodeToString(node.left)} - ${nodeToString(node.right).slice(1)}`;
                        return `${nodeToString(node.left)} + ${nodeToString(node.right)}`;
                    }
                    case "sub": {
                        if (node.right.type === "neg")
                            return `${nodeToString(node.left)} + ${nodeToString(node.right.expr)}`;
                        if (node.right.type === "mul" && node.right.left?.type === "num" && node.right.left.value === 1 && node.right.right?.type === "neg")
                            return `${nodeToString(node.left)} + ${nodeToString(node.right.right.expr)}`;
                        if (node.right.type === "mul" && node.right.left?.type === "num" && node.right.left.value === -1)
                            return `${nodeToString(node.left)} + ${nodeToString(node.right.right)}`;
                        if (node.right.type === "mul" && node.right.left?.type === "num" && node.right.left.value === 1 && node.right.right?.type === "mul" && node.right.right.left?.type === "num" && node.right.right.left.value === -1)
                            return `${nodeToString(node.left)} + ${nodeToString(node.right.right.right)}`;
                        const rightStr = (node.right.type === "add" || node.right.type === "sub") ? `(${nodeToString(node.right)})` : nodeToString(node.right);
                        return `${nodeToString(node.left)} - ${rightStr}`;
                    }
                    case "mul": {
                        if (node.left.type === "num" && node.left.value === 1)
                            return nodeToString(node.right);
                        if (node.right.type === "num" && node.right.value === 1)
                            return nodeToString(node.left);
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "var")
                            return `-${nodeToString(node.right)}`;
                        if (node.left.type === "num" && node.left.value === -1 && node.right.type === "pow")
                            return `-${nodeToString(node.right)}`;
                        if (node.left.type === "num" && (node.right.type === "var" || node.right.type === "pow"))
                            return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        if (node.left.type === "pow" && node.right.type === "pow")
                            return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        if (node.left.type === "pow" && node.right.type === "var")
                            return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        if (node.left.type === "var" && node.right.type === "pow")
                            return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        if (node.left.type === "var" && node.right.type === "var")
                            return `${nodeToString(node.left)}${nodeToString(node.right)}`;
                        return `${nodeToString(node.left)} * ${nodeToString(node.right)}`;
                    }
                    case "div": {
                        const powNode = { type: "pow", base: node.right, exponent: { type: "num", value: -1 } };
                        const mulNode = { type: "mul", left: node.left, right: powNode };
                        return nodeToString(mulNode);
                    }
                    case "pow": {
                        const baseStr = (node.base.type !== "num" && node.base.type !== "var") ? `(${nodeToString(node.base)})` : nodeToString(node.base);
                        const expStr = (node.exponent.type !== "num" && node.exponent.type !== "var") ? `(${nodeToString(node.exponent)})` : nodeToString(node.exponent);
                        return `${baseStr}^${expStr}`;
                    }
                    case "neg": {
                        if (node.expr.type === "add" || node.expr.type === "sub")
                            return `-(${nodeToString(node.expr)})`;
                        if (node.expr.type === "pow")
                            return `-${nodeToString(node.expr)}`;
                        const exprStr = (node.expr.type !== "num" && node.expr.type !== "var") ? `(${nodeToString(node.expr)})` : nodeToString(node.expr);
                        return `-${exprStr}`;
                    }
                    case "func": {
                        return `${node.name}(${node.args.map((arg) => nodeToString(arg)).join(", ")})`;
                    }
                }
                return "";
            };
            const nodeToLaTeX = (node) => {
                switch (node.type) {
                    case "num": {
                        return node.value.toString();
                    }
                    case "var": {
                        return node.name;
                    }
                    case "add": {
                        if (nodeToLaTeX(node.right).startsWith("-"))
                            return `${nodeToLaTeX(node.left)} - ${nodeToLaTeX(node.right).slice(1)}`;
                        return `${nodeToLaTeX(node.left)} + ${nodeToLaTeX(node.right)}`;
                    }
                    case "sub": {
                        const right = nodeToLaTeX(node.right);
                        if (right.startsWith("-"))
                            return `${nodeToLaTeX(node.left)} + ${right.slice(1)}`;
                        return `${nodeToLaTeX(node.left)} - ${right}`;
                    }
                    case "mul": {
                        const isAtomicLaTeX = (n) => n.type === "num" || n.type === "var" || n.type === "pow" || n.type === "func";
                        const wrapIfNeeded = (n) => {
                            const s = nodeToLaTeX(n);
                            if (n.type === "add" || n.type === "sub")
                                return `\\left(${s}\\right)`;
                            return s;
                        };
                        const left = wrapIfNeeded(node.left);
                        const right = wrapIfNeeded(node.right);
                        if (isAtomicLaTeX(node.left) && isAtomicLaTeX(node.right))
                            return `${left}${right}`;
                        return `${left} \\cdot ${right}`;
                    }
                    case "div": {
                        return `\\frac{${nodeToLaTeX(node.left)}}{${nodeToLaTeX(node.right)}}`;
                    }
                    case "pow": {
                        return `${nodeToLaTeX(node.base)}^{${nodeToLaTeX(node.exponent)}}`;
                    }
                    case "neg": {
                        return `-${nodeToLaTeX(node.expr)}`;
                    }
                    case "func": {
                        return `\\mathrm{${node.name}}\\left(${node.args.map(nodeToLaTeX).join(", ")}\\right)`;
                    }
                    default: {
                        throw new Error(`Chalkboard.real.parse: Unknown node type ${node.type}`);
                    }
                }
            };
            const areEqualVars = (a, b) => {
                if (a.type === "var" && b.type === "var")
                    return a.name === b.name;
                return JSON.stringify(a) === JSON.stringify(b);
            };
            const simplifyNode = (node) => {
                switch (node.type) {
                    case "num": {
                        return node;
                    }
                    case "var": {
                        return node;
                    }
                    case "add": {
                        const left = simplifyNode(node.left);
                        const right = simplifyNode(node.right);
                        const flatten = (n) => n.type === "add" ? [...flatten(n.left), ...flatten(n.right)] : [n];
                        const terms = flatten({ type: "add", left, right });
                        const coeffs = {};
                        let constants = 0;
                        const others = [];
                        const powers = [];
                        for (let i = 0; i < terms.length; i++) {
                            const t = terms[i];
                            if (t.type === "num") {
                                constants += t.value;
                            }
                            else if (t.type === "mul" && t.left.type === "num" && t.right.type === "var") {
                                const k = t.right.name;
                                coeffs[k] = (coeffs[k] || 0) + t.left.value;
                            }
                            else if (t.type === "var") {
                                const k = t.name;
                                coeffs[k] = (coeffs[k] || 0) + 1;
                            }
                            else if (t.type === "pow" && t.base.type === "var" && t.exponent.type === "num") {
                                const k = t.base.name + "^" + t.exponent.value;
                                coeffs[k] = (coeffs[k] || 0) + 1;
                                powers.push({ pow: t.exponent.value, name: k });
                            }
                            else if (t.type === "mul" && t.left.type === "num" && t.right.type === "pow" && t.right.base.type === "var" && t.right.exponent.type === "num") {
                                const k = t.right.base.name + "^" + t.right.exponent.value;
                                coeffs[k] = (coeffs[k] || 0) + t.left.value;
                                powers.push({ pow: t.right.exponent.value, name: k });
                            }
                            else {
                                others.push(t);
                            }
                        }
                        const powerKeys = [];
                        for (let i = 0; i < powers.length; i++) {
                            let exists = false;
                            for (let j = 0; j < powerKeys.length; j++) {
                                if (powerKeys[j] === powers[i].name) {
                                    exists = true;
                                    break;
                                }
                            }
                            if (!exists)
                                powerKeys.push(powers[i].name);
                        }
                        for (let i = 0; i < powerKeys.length - 1; i++) {
                            for (let j = i + 1; j < powerKeys.length; j++) {
                                const pa = powers.find((p) => p.name === powerKeys[i])?.pow ?? 1;
                                const pb = powers.find((p) => p.name === powerKeys[j])?.pow ?? 1;
                                if (pb > pa) {
                                    const tmp = powerKeys[i];
                                    powerKeys[i] = powerKeys[j];
                                    powerKeys[j] = tmp;
                                }
                            }
                        }
                        const coeffKeys = Object.keys(coeffs);
                        const varKeys = coeffKeys.filter((k) => k.indexOf("^") === -1);
                        let result = null;
                        for (let i = 0; i < powerKeys.length; i++) {
                            const k = powerKeys[i];
                            if (coeffs[k] === 0)
                                continue;
                            const split = k.split("^");
                            const name = split[0];
                            const exp = split[1];
                            const pownode = { type: "pow", base: { type: "var", name }, exponent: { type: "num", value: Number(exp) } };
                            const term = coeffs[k] === 1 ? pownode : { type: "mul", left: { type: "num", value: coeffs[k] }, right: pownode };
                            result = result ? { type: "add", left: result, right: term } : term;
                        }
                        for (let i = 0; i < varKeys.length; i++) {
                            const k = varKeys[i];
                            if (coeffs[k] === 0)
                                continue;
                            const term = coeffs[k] === 1 ? { type: "var", name: k } : { type: "mul", left: { type: "num", value: coeffs[k] }, right: { type: "var", name: k } };
                            result = result ? { type: "add", left: result, right: term } : term;
                        }
                        if (constants !== 0)
                            result = result ? { type: "add", left: result, right: { type: "num", value: constants } } : { type: "num", value: constants };
                        for (let i = 0; i < others.length; i++)
                            result = result ? { type: "add", left: result, right: others[i] } : others[i];
                        return result || { type: "num", value: 0 };
                    }
                    case "sub": {
                        const leftSub = simplifyNode(node.left);
                        const rightSub = simplifyNode(node.right);
                        return simplifyNode({ type: "add", left: leftSub, right: { type: "mul", left: { type: "num", value: -1 }, right: rightSub } });
                    }
                    case "mul": {
                        const leftMul = simplifyNode(node.left);
                        const rightMul = simplifyNode(node.right);
                        if (rightMul.type === "add" || rightMul.type === "sub")
                            return simplifyNode({ type: rightMul.type, left: { type: "mul", left: leftMul, right: rightMul.left }, right: { type: "mul", left: leftMul, right: rightMul.right } });
                        if (leftMul.type === "add" || leftMul.type === "sub")
                            return simplifyNode({ type: leftMul.type, left: { type: "mul", left: rightMul, right: leftMul.left }, right: { type: "mul", left: rightMul, right: leftMul.right } });
                        if ((leftMul.type === "add" || leftMul.type === "sub") && (rightMul.type === "add" || rightMul.type === "sub")) {
                            const extractTerms = (node) => {
                                if (node.type === "add") {
                                    return [...extractTerms(node.left), ...extractTerms(node.right)];
                                }
                                else if (node.type === "sub") {
                                    const rightTerms = extractTerms(node.right).map(term => ({
                                        type: "neg",
                                        expr: term
                                    }));
                                    return [...extractTerms(node.left), ...rightTerms];
                                }
                                else {
                                    return [node];
                                }
                            };
                            const leftTerms = extractTerms(leftMul);
                            const rightTerms = extractTerms(rightMul);
                            const products = [];
                            for (const leftTerm of leftTerms) {
                                for (const rightTerm of rightTerms) {
                                    if (leftTerm.type === "neg" && rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm.expr, right: rightTerm.expr }));
                                    }
                                    else if (leftTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm.expr, right: rightTerm } }));
                                    }
                                    else if (rightTerm.type === "neg") {
                                        products.push(simplifyNode({ type: "neg", expr: { type: "mul", left: leftTerm, right: rightTerm.expr } }));
                                    }
                                    else {
                                        products.push(simplifyNode({ type: "mul", left: leftTerm, right: rightTerm }));
                                    }
                                }
                            }
                            let result = products[0];
                            for (let i = 1; i < products.length; i++) {
                                result = {
                                    type: "add",
                                    left: result,
                                    right: products[i]
                                };
                            }
                            return simplifyNode(result);
                        }
                        const flattenMul = (n) => n.type === "mul" ? [...flattenMul(n.left), ...flattenMul(n.right)] : [n];
                        const factors = flattenMul({ type: "mul", left: leftMul, right: rightMul });
                        let coeffMul = 1;
                        const powersMul = {};
                        const othersMul = [];
                        for (let i = 0; i < factors.length; i++) {
                            const f = factors[i];
                            if (f.type === "num") {
                                coeffMul *= f.value;
                            }
                            else if (f.type === "var") {
                                powersMul[f.name] = (powersMul[f.name] || 0) + 1;
                            }
                            else if (f.type === "pow" && f.base.type === "var" && f.exponent.type === "num") {
                                powersMul[f.base.name] = (powersMul[f.base.name] || 0) + f.exponent.value;
                            }
                            else {
                                othersMul.push(f);
                            }
                        }
                        const powerKeysMul = [];
                        const powerValsMul = [];
                        for (const k in powersMul) {
                            if (powersMul.hasOwnProperty(k)) {
                                powerKeysMul.push(k);
                                powerValsMul.push(powersMul[k]);
                            }
                        }
                        for (let i = 0; i < powerKeysMul.length - 1; i++) {
                            for (let j = i + 1; j < powerKeysMul.length; j++) {
                                if (powerValsMul[j] > powerValsMul[i]) {
                                    const tmpK = powerKeysMul[i];
                                    const tmpV = powerValsMul[i];
                                    powerKeysMul[i] = powerKeysMul[j];
                                    powerValsMul[i] = powerValsMul[j];
                                    powerKeysMul[j] = tmpK;
                                    powerValsMul[j] = tmpV;
                                }
                            }
                        }
                        let resultMul = null;
                        if (coeffMul !== 1 || (powerKeysMul.length === 0 && othersMul.length === 0))
                            resultMul = { type: "num", value: coeffMul };
                        for (let i = 0; i < powerKeysMul.length; i++) {
                            const k = powerKeysMul[i];
                            const v = powerValsMul[i];
                            if (v === 0)
                                continue;
                            if (v === 1) {
                                resultMul = resultMul ? { type: "mul", left: resultMul, right: { type: "var", name: k } } : { type: "var", name: k };
                            }
                            else {
                                resultMul = resultMul ? { type: "mul", left: resultMul, right: { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: v } } } : { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: v } };
                            }
                        }
                        for (let i = 0; i < othersMul.length; i++)
                            resultMul = resultMul ? { type: "mul", left: resultMul, right: othersMul[i] } : othersMul[i];
                        return resultMul;
                    }
                    case "div": {
                        const leftDiv = simplifyNode(node.left);
                        const rightDiv = simplifyNode(node.right);
                        if (leftDiv.type === "num" && leftDiv.value === 1 && (rightDiv.type === "add" || rightDiv.type === "sub"))
                            return { type: "pow", base: rightDiv, exponent: { type: "num", value: -1 } };
                        if (leftDiv.type === "add" || leftDiv.type === "sub") {
                            const left = { type: "div", left: leftDiv.left, right: JSON.parse(JSON.stringify(rightDiv)) };
                            const right = { type: "div", left: leftDiv.right, right: JSON.parse(JSON.stringify(rightDiv)) };
                            return { type: leftDiv.type, left: simplifyNode(left), right: simplifyNode(right) };
                        }
                        if (leftDiv.type === "num" && leftDiv.value === 0)
                            return { type: "num", value: 0 };
                        if (rightDiv.type === "num" && rightDiv.value === 1)
                            return leftDiv;
                        if (leftDiv.type === "num" && rightDiv.type === "num")
                            return { type: "num", value: leftDiv.value / rightDiv.value };
                        if (areEqualVars(leftDiv, rightDiv))
                            return { type: "num", value: 1 };
                        if (leftDiv.type === "num" && leftDiv.value === 1 && (rightDiv.type === "add" || rightDiv.type === "sub"))
                            return { type: "pow", base: rightDiv, exponent: { type: "num", value: -1 } };
                        if (leftDiv.type === "mul" && areEqualVars(leftDiv.right, rightDiv))
                            return simplifyNode(leftDiv.left);
                        if (leftDiv.type === "mul" && areEqualVars(leftDiv.left, rightDiv))
                            return simplifyNode(leftDiv.right);
                        if (leftDiv.type === "pow" && rightDiv.type === "pow" && areEqualVars(leftDiv.base, rightDiv.base))
                            return { type: "pow", base: leftDiv.base, exponent: { type: "sub", left: simplifyNode(leftDiv.exponent), right: simplifyNode(rightDiv.exponent) } };
                        if (leftDiv.type === "pow" && areEqualVars(leftDiv.base, rightDiv))
                            return { type: "pow", base: rightDiv, exponent: { type: "sub", left: simplifyNode(leftDiv.exponent), right: { type: "num", value: 1 } } };
                        if (rightDiv.type === "pow" && areEqualVars(leftDiv, rightDiv.base))
                            return { type: "pow", base: leftDiv, exponent: { type: "sub", left: { type: "num", value: 1 }, right: simplifyNode(rightDiv.exponent) } };
                        const flattenDiv = (n, type) => {
                            if (!n)
                                return [];
                            return n.type === type ? [...flattenDiv(n.left, type), ...flattenDiv(n.right, type)] : [n];
                        };
                        const numFactors = flattenDiv(leftDiv, "mul");
                        const denFactors = flattenDiv(rightDiv, "mul");
                        let coeffNum = 1, coeffDen = 1;
                        const powersNum = {}, powersDen = {};
                        const othersNum = [], othersDen = [];
                        for (let i = 0; i < numFactors.length; i++) {
                            const f = numFactors[i];
                            if (f.type === "num") {
                                coeffNum *= f.value;
                            }
                            else if (f.type === "var") {
                                powersNum[f.name] = (powersNum[f.name] || 0) + 1;
                            }
                            else if (f.type === "pow" && f.base.type === "var" && f.exponent.type === "num") {
                                powersNum[f.base.name] = (powersNum[f.base.name] || 0) + f.exponent.value;
                            }
                            else {
                                othersNum.push(f);
                            }
                        }
                        for (let i = 0; i < denFactors.length; i++) {
                            const f = denFactors[i];
                            if (f.type === "num") {
                                coeffDen *= f.value;
                            }
                            else if (f.type === "var") {
                                powersDen[f.name] = (powersDen[f.name] || 0) + 1;
                            }
                            else if (f.type === "pow" && f.base.type === "var" && f.exponent.type === "num") {
                                powersDen[f.base.name] = (powersDen[f.base.name] || 0) + f.exponent.value;
                            }
                            else {
                                othersDen.push(f);
                            }
                        }
                        let resultDiv = null;
                        const coeffQuot = coeffNum / coeffDen;
                        if (coeffQuot !== 1 || (Object.keys(powersNum).length === 0 && Object.keys(powersDen).length === 0 && othersNum.length === 0 && othersDen.length === 0))
                            resultDiv = { type: "num", value: coeffQuot };
                        const allPowerKeys = [];
                        for (const k in powersNum)
                            if (allPowerKeys.indexOf(k) === -1)
                                allPowerKeys.push(k);
                        for (const k in powersDen)
                            if (allPowerKeys.indexOf(k) === -1)
                                allPowerKeys.push(k);
                        for (let i = 0; i < allPowerKeys.length - 1; i++) {
                            for (let j = i + 1; j < allPowerKeys.length; j++) {
                                const pa = (powersNum[allPowerKeys[i]] || 0) - (powersDen[allPowerKeys[i]] || 0);
                                const pb = (powersNum[allPowerKeys[j]] || 0) - (powersDen[allPowerKeys[j]] || 0);
                                if (pb > pa) {
                                    const tmp = allPowerKeys[i];
                                    allPowerKeys[i] = allPowerKeys[j];
                                    allPowerKeys[j] = tmp;
                                }
                            }
                        }
                        for (let i = 0; i < allPowerKeys.length; i++) {
                            const k = allPowerKeys[i];
                            const exp = (powersNum[k] || 0) - (powersDen[k] || 0);
                            if (exp === 0)
                                continue;
                            if (exp === 1) {
                                resultDiv = resultDiv ? { type: "mul", left: resultDiv, right: { type: "var", name: k } } : { type: "var", name: k };
                            }
                            else {
                                resultDiv = resultDiv ? { type: "mul", left: resultDiv, right: { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: exp } } } : { type: "pow", base: { type: "var", name: k }, exponent: { type: "num", value: exp } };
                            }
                        }
                        for (let i = 0; i < othersNum.length; i++)
                            resultDiv = resultDiv ? { type: "mul", left: resultDiv, right: othersNum[i] } : othersNum[i];
                        for (let i = 0; i < othersDen.length; i++)
                            resultDiv = { type: "div", left: resultDiv, right: othersDen[i] };
                        return resultDiv;
                    }
                    case "pow": {
                        const base = simplifyNode(node.base);
                        const exponent = simplifyNode(node.exponent);
                        if ((base.type === "add" || base.type === "sub") && exponent.type === "num" && Number.isInteger(exponent.value)) {
                            if (exponent.value < 0) {
                                const absExpr = Math.abs(exponent.value);
                                if (absExpr === 1) {
                                    return { type: "pow", base: base, exponent: { type: "num", value: -1 } };
                                }
                                else {
                                    const positiveExpr = { type: "pow", base, exponent: { type: "num", value: absExpr } };
                                    const expanded = simplifyNode(positiveExpr);
                                    return { type: "pow", base: expanded, exponent: { type: "num", value: -1 } };
                                }
                            }
                            else if (exponent.value > 0) {
                                const n = exponent.value;
                                const a = base.left;
                                const b = base.right;
                                const sign = base.type === "add" ? 1 : -1;
                                let result = null;
                                for (let k = 0; k <= n; k++) {
                                    const c = Chalkboard.numb.binomial(n, k);
                                    const leftPower = n - k === 0 ? { type: "num", value: 1 } : (n - k === 1 ? a : simplifyNode({ type: "pow", base: a, exponent: { type: "num", value: n - k } }));
                                    const rightPower = k === 0 ? { type: "num", value: 1 } : (k === 1 ? (sign === 1 ? b : { type: "neg", expr: b }) : simplifyNode({ type: "pow", base: b, exponent: { type: "num", value: k } }));
                                    const termSign = (sign === -1 && k % 2 === 1) ? -1 : 1;
                                    let term;
                                    if (k === 0) {
                                        term = leftPower;
                                    }
                                    else if (n - k === 0) {
                                        term = rightPower;
                                    }
                                    else {
                                        term = simplifyNode({ type: "mul", left: leftPower, right: rightPower });
                                    }
                                    if (c !== 1) {
                                        term = simplifyNode({ type: "mul", left: { type: "num", value: termSign * c }, right: term });
                                    }
                                    else if (termSign === -1) {
                                        term = { type: "neg", expr: term };
                                    }
                                    if (result === null) {
                                        result = term;
                                    }
                                    else {
                                        result = simplifyNode({ type: "add", left: result, right: term });
                                    }
                                }
                                return result;
                            }
                        }
                        if (exponent.type === "num" && exponent.value === 0)
                            return { type: "num", value: 1 };
                        if (exponent.type === "num" && exponent.value === 1)
                            return base;
                        if (base.type === "num" && base.value === 0 && exponent.type === "num" && exponent.value > 0)
                            return { type: "num", value: 0 };
                        if (base.type === "num" && base.value === 1)
                            return { type: "num", value: 1 };
                        if (base.type === "num" && exponent.type === "num")
                            return { type: "num", value: Math.pow(base.value, exponent.value) };
                        if (base.type === "pow")
                            return { type: "pow", base: base.base, exponent: { type: "mul", left: simplifyNode(base.exponent), right: exponent } };
                        if (base.type === "mul" && exponent.type === "num")
                            return simplifyNode({ type: "mul", left: { type: "pow", base: base.left, exponent }, right: { type: "pow", base: base.right, exponent } });
                        return { type: "pow", base, exponent };
                    }
                    case "neg": {
                        const expr = simplifyNode(node.expr);
                        if (expr.type === "neg")
                            return expr.expr;
                        if (expr.type === "num")
                            return { type: "num", value: -expr.value };
                        if (expr.type === "add")
                            return simplifyNode({ type: "add", left: simplifyNode({ type: "neg", expr: expr.left }), right: simplifyNode({ type: "neg", expr: expr.right }) });
                        if (expr.type === "sub")
                            return simplifyNode({ type: "add", left: simplifyNode({ type: "neg", expr: expr.left }), right: expr.right });
                        return { type: "neg", expr };
                    }
                    case "func": {
                        const args = node.args.map((arg) => simplifyNode(arg));
                        if (args.every((arg) => arg.type === "num")) {
                            try {
                                const funcName = node.name.toLowerCase();
                                if (Chalkboard.REGISTRY[funcName] !== undefined) {
                                    const argValues = args.map((arg) => arg.value);
                                    return { type: "num", value: Chalkboard.REGISTRY[funcName](...argValues) };
                                }
                                const result = evaluateNode({ type: "func", name: node.name, args }, {});
                                return { type: "num", value: result };
                            }
                            catch (e) {
                                return { type: "func", name: node.name, args };
                            }
                        }
                        return { type: "func", name: node.name, args };
                    }
                }
                return node;
            };
            try {
                const tokens = tokenize(expr);
                const ast = parseTokens(tokens);
                if (config.returnAST)
                    return ast;
                if (config.returnJSON)
                    return JSON.stringify(ast);
                if (config.values && Object.keys(config.values).length > 0) {
                    const result = evaluateNode(ast, config.values);
                    if (config.roundTo !== undefined)
                        return Chalkboard.numb.roundTo(result, config.roundTo);
                    return result;
                }
                let simplified = simplifyNode(ast);
                let normalizedast = parseTokens(tokenize(nodeToString(simplified)));
                simplified = simplifyNode(normalizedast);
                simplified = simplifyNode(simplified);
                if (config.roundTo !== undefined) {
                    const roundNodes = (node) => {
                        if (node.type === "num")
                            return { ...node, value: Chalkboard.numb.roundTo(node.value, config.roundTo) };
                        const n = Object.keys(node).length;
                        for (let i = 0; i < n; i++) {
                            const key = Object.keys(node)[i];
                            if (key !== "type" && node[key] && typeof node[key] === "object" && "type" in node[key])
                                node[key] = roundNodes(node[key]);
                        }
                        return node;
                    };
                    simplified = roundNodes(simplified);
                }
                if (config.returnLaTeX)
                    return nodeToLaTeX(simplified);
                return nodeToString(simplified);
            }
            catch (err) {
                if (err instanceof Error) {
                    throw new Error(`Chalkboard.real.parse: Error parsing real expression ${err.message}`);
                }
                else {
                    throw new Error(`Chalkboard.real.parse: Error parsing real expression ${String(err)}`);
                }
            }
        };
        real.pingpong = (num, edge = 0, scl = 1) => {
            if ((num + edge) % (2 * scl) < scl) {
                return (num + edge) % scl;
            }
            else {
                return scl - ((num + edge) % scl);
            }
        };
        real.polynomial = (...coeffs) => {
            let arr;
            if (coeffs.length === 1 && Array.isArray(coeffs[0])) {
                arr = coeffs[0];
            }
            else {
                arr = coeffs;
            }
            while (arr.length > 1 && arr[0] === 0) {
                arr.shift();
            }
            const f = (x) => {
                if (arr.length === 0)
                    return 0;
                let result = arr[0];
                for (let i = 1; i < arr.length; i++) {
                    result = result * x + arr[i];
                }
                return result;
            };
            return Chalkboard.real.define(f);
        };
        real.pow = (base, num) => {
            if (typeof base === "number") {
                if (base === 0 && num === 0)
                    return 1;
                if (base === 0)
                    return 0;
                if (num === 0)
                    return 1;
                if (num === 1)
                    return base;
                if (Number.isInteger(num)) {
                    let res = 1;
                    let b = base;
                    let n = Math.abs(num);
                    while (n > 0) {
                        if (n % 2 === 1)
                            res *= b;
                        b *= b;
                        n = Math.floor(n / 2);
                    }
                    return num < 0 ? 1 / res : res;
                }
                else {
                    if (base < 0)
                        return NaN;
                    return Chalkboard.E(num * Chalkboard.real.ln(base));
                }
            }
            else {
                const func = base;
                if (func.field !== "real")
                    throw new TypeError("Chalkboard.real.pow: Property 'field' of 'func' must be 'real'.");
                if (func.type.startsWith("scalar")) {
                    const f = func.rule;
                    const g = (...x) => f(...x) ** num;
                    return Chalkboard.real.define(g);
                }
                else if (func.type.startsWith("vector")) {
                    const f = func.rule;
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((...x) => f[i](...x) ** num);
                    }
                    return Chalkboard.real.define(g);
                }
                else if (func.type.startsWith("curve")) {
                    const f = func.rule;
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((t) => f[i](t) ** num);
                    }
                    return Chalkboard.real.define(g);
                }
                else if (func.type.startsWith("surface")) {
                    const f = func.rule;
                    const g = [];
                    for (let i = 0; i < f.length; i++) {
                        g.push((s, t) => f[i](s, t) ** num);
                    }
                    return Chalkboard.real.define(g);
                }
                throw new TypeError("Chalkboard.real.pow: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
            }
        };
        real.qerp = (p1, p2, p3, t) => {
            const a = p1[1] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            const b = (-p1[1] * (p2[0] + p3[0])) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) -
                (p2[1] * (p1[0] + p3[0])) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) -
                (p3[1] * (p1[0] + p2[0])) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            const c = (p1[1] * p2[0] * p3[0]) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) +
                (p2[1] * p1[0] * p3[0]) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) +
                (p3[1] * p1[0] * p2[0]) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            return a * t * t + b * t + c;
        };
        real.quadratic = (a, b, c, form = "standard") => {
            if (form === "standard") {
                return Chalkboard.real.define((x) => a * x * x + b * x + c);
            }
            else if (form === "vertex") {
                return Chalkboard.real.define((x) => a * (x - b) * (x - b) + c);
            }
            else {
                throw new TypeError("Chalkboard.real.quadratic: String 'form' must be 'standard' or 'vertex'.");
            }
        };
        real.quadraticFormula = (a, b, c, form = "standard") => {
            if (form === "standard") {
                return [(-b + Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "standard"))) / (2 * a), (-b - Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "standard"))) / (2 * a)];
            }
            else if (form === "vertex") {
                return [b + Chalkboard.real.sqrt(-c / a), b - Chalkboard.real.sqrt(-c / a)];
            }
            else {
                throw new TypeError("Chalkboard.real.quadraticFormula: String 'form' must be 'standard' or 'vertex'.");
            }
        };
        real.ramp = (num, edge = 0, scl = 1) => {
            if (num >= edge) {
                return num * scl;
            }
            else {
                return 0;
            }
        };
        real.randomPolynomial = (degree, inf = 0, sup = 1) => {
            return Chalkboard.real.polynomial(...Chalkboard.stat.random(degree + 1, inf, sup));
        };
        real.reciprocate = (func) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.real.reciprocate: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule;
                const g = (...x) => 1 / f(...x);
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("vector")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x) => 1 / f[i](...x));
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("curve")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t) => 1 / f[i](t));
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("surface")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s, t) => 1 / f[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.reciprocate: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.rect = (num, center = 0, width = 2, scl = 1) => {
            if (num > center + width / 2 || num < center - width / 2) {
                return 0;
            }
            else {
                return scl;
            }
        };
        real.root = (num, index = 3) => {
            if (num === 0)
                return 0;
            if (num < 0) {
                if (Number.isInteger(index) && Math.abs(index) % 2 === 1)
                    return -Chalkboard.E(Chalkboard.real.ln(-num) / index);
                return NaN;
            }
            return Chalkboard.E(Chalkboard.real.ln(num) / index);
        };
        real.scl = (func, num) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.real.scl: Property 'field' of 'func' must be 'real'.");
            if (func.type.startsWith("scalar")) {
                const f = func.rule;
                const g = (...x) => f(...x) * num;
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("vector")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((...x) => f[i](...x) * num);
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("curve")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((t) => f[i](t) * num);
                }
                return Chalkboard.real.define(g);
            }
            else if (func.type.startsWith("surface")) {
                const f = func.rule;
                const g = [];
                for (let i = 0; i < f.length; i++) {
                    g.push((s, t) => f[i](s, t) * num);
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.scl: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.slope = (x1, y1, x2, y2) => {
            return (y2 - y1) / (x2 - x1);
        };
        real.sqrt = (num) => {
            if (num < 0)
                return NaN;
            if (num === 0 || num === 1 || num === Infinity)
                return num;
            let S = num, E = 0;
            while (S >= 1.0) {
                S *= 0.25;
                E++;
            }
            while (S < 0.25) {
                S *= 4.0;
                E--;
            }
            let x = (S + 1.0) * 0.5;
            x = 0.5 * (x + S / x);
            x = 0.5 * (x + S / x);
            x = 0.5 * (x + S / x);
            x = 0.5 * (x + S / x);
            x = 0.5 * (x + S / x);
            return x * (2 ** E);
        };
        real.sub = (func1, func2) => {
            if (func1.field !== "real" || func2.field !== "real")
                throw new TypeError("Chalkboard.real.sub: Properties 'field' of 'func1' and 'func2' must be 'real'.");
            if (func1.type !== func2.type)
                throw new TypeError("Chalkboard.real.sub: Properties 'type' of 'func1' and 'func2' must be the same.");
            if (func1.type.startsWith("scalar")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = (...x) => f1(...x) - f2(...x);
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("vector")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((...x) => f1[i](...x) - f2[i](...x));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("curve")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((t) => f1[i](t) - f2[i](t));
                }
                return Chalkboard.real.define(g);
            }
            else if (func1.type.startsWith("surface")) {
                const f1 = func1.rule;
                const f2 = func2.rule;
                const g = [];
                for (let i = 0; i < f1.length; i++) {
                    g.push((s, t) => f1[i](s, t) - f2[i](s, t));
                }
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.sub: Properties 'type' of 'func1' and 'func2' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
        real.tetration = (base, num) => {
            if (!Number.isInteger(num) || num < 0)
                return NaN;
            if (num === 0)
                return 1;
            if (num === 1)
                return base;
            let result = base;
            for (let i = 1; i < num; i++) {
                result = Chalkboard.real.pow(base, result);
                if (result === Infinity)
                    return Infinity;
            }
            return result;
        };
        real.translate = (func, h = 0, v = 0) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.real.translate: Property 'field' of 'func' must be 'real'.");
            if (func.type === "scalar2d") {
                const f = func.rule;
                const g = (x) => f(x - h) + v;
                return Chalkboard.real.define(g);
            }
            throw new TypeError("Chalkboard.real.translate: Property 'type' of 'func' must be 'scalar2d'.");
        };
        real.val = (func, val) => {
            if (func.field !== "real")
                throw new TypeError("Chalkboard.real.val: Property 'field' of 'func' must be 'real'.");
            if (func.type === "scalar2d") {
                const f = func.rule;
                const x = val;
                return f(x);
            }
            else if (func.type === "scalar3d") {
                const f = func.rule;
                const v = val;
                return f(v.x, v.y);
            }
            else if (func.type === "scalar4d") {
                const f = func.rule;
                const v = val;
                return f(v.x, v.y, v.z);
            }
            else if (func.type === "vector2d") {
                const f = func.rule;
                const v = val;
                return Chalkboard.vect.init(f[0](v.x, v.y), f[1](v.x, v.y));
            }
            else if (func.type === "vector3d") {
                const f = func.rule;
                const v = val;
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z), f[1](v.x, v.y, v.z), f[2](v.x, v.y, v.z));
            }
            else if (func.type === "vector4d") {
                const f = func.rule;
                const v = val;
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z, v.w), f[1](v.x, v.y, v.z, v.w), f[2](v.x, v.y, v.z, v.w), f[3](v.x, v.y, v.z, v.w));
            }
            else if (func.type === "curve2d") {
                const f = func.rule;
                const t = val;
                return Chalkboard.vect.init(f[0](t), f[1](t));
            }
            else if (func.type === "curve3d") {
                const f = func.rule;
                const t = val;
                return Chalkboard.vect.init(f[0](t), f[1](t), f[2](t));
            }
            else if (func.type === "curve4d") {
                const f = func.rule;
                const t = val;
                return Chalkboard.vect.init(f[0](t), f[1](t), f[2](t), f[3](t));
            }
            else if (func.type === "surface3d") {
                const f = func.rule;
                const v = val;
                return Chalkboard.vect.init(f[0](v.x, v.y), f[1](v.x, v.y), f[2](v.x, v.y));
            }
            throw new TypeError("Chalkboard.real.val: Property 'type' of 'func' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'");
        };
        real.zero = (type = "scalar2d") => {
            if (type === "scalar2d") {
                return Chalkboard.real.define((x) => 0);
            }
            else if (type === "scalar3d") {
                return Chalkboard.real.define((x, y) => 0);
            }
            else if (type === "scalar4d") {
                return Chalkboard.real.define((x, y, z) => 0);
            }
            else if (type === "vector2d") {
                return Chalkboard.real.define((x, y) => 0, (x, y) => 0);
            }
            else if (type === "vector3d") {
                return Chalkboard.real.define((x, y, z) => 0, (x, y, z) => 0, (x, y, z) => 0);
            }
            else if (type === "vector4d") {
                return Chalkboard.real.define((x, y, z, w) => 0, (x, y, z, w) => 0, (x, y, z, w) => 0, (x, y, z, w) => 0);
            }
            else if (type === "curve2d") {
                return Chalkboard.real.define((t) => 0, (t) => 0);
            }
            else if (type === "curve3d") {
                return Chalkboard.real.define((t) => 0, (t) => 0, (t) => 0);
            }
            else if (type === "curve4d") {
                return Chalkboard.real.define((t) => 0, (t) => 0, (t) => 0, (t) => 0);
            }
            else if (type === "surface3d") {
                return Chalkboard.real.define((s, t) => 0, (s, t) => 0, (s, t) => 0);
            }
            throw new TypeError("Chalkboard.real.zero: String 'type' must be 'scalar2d', 'scalar3d', 'scalar4d', 'vector2d', 'vector3d', 'vector4d', 'curve2d', 'curve3d', 'curve4d', or 'surface3d'.");
        };
    })(real = Chalkboard.real || (Chalkboard.real = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let stat;
    (function (stat) {
        const $quickselect = (arr, k) => {
            const select = (left, right, k) => {
                if (left === right)
                    return arr[left];
                let pivotIndex = Math.floor(Math.random() * (right - left + 1)) + left;
                const pivotValue = arr[pivotIndex];
                arr[pivotIndex] = arr[right];
                arr[right] = pivotValue;
                let storeIndex = left;
                for (let i = left; i < right; i++) {
                    if (arr[i] < pivotValue) {
                        const temp = arr[storeIndex];
                        arr[storeIndex] = arr[i];
                        arr[i] = temp;
                        storeIndex++;
                    }
                }
                arr[right] = arr[storeIndex];
                arr[storeIndex] = pivotValue;
                if (k === storeIndex)
                    return arr[k];
                else if (k < storeIndex)
                    return select(left, storeIndex - 1, k);
                else
                    return select(storeIndex + 1, right, k);
            };
            return select(0, arr.length - 1, k);
        };
        stat.absolute = (arr) => {
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(Math.abs(arr[i]));
            }
            return result;
        };
        stat.add = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(arr1[i] + arr2[i]);
            }
            return result;
        };
        stat.array = (inf, sup, length = sup - inf + 1) => {
            const result = [];
            const step = (sup - inf) / (length - 1);
            for (let i = 0; i < length; i++) {
                result.push(inf + step * i);
            }
            return result;
        };
        stat.autocorrelation = (arr) => {
            return Chalkboard.stat.correlation(arr, arr);
        };
        stat.Bayes = (pA, pGivenA, pGivenNotA) => {
            if (pA < 0 || pA > 1 || pGivenA < 0 || pGivenA > 1 || pGivenNotA < 0 || pGivenNotA > 1) {
                throw new RangeError('All probabilities must be between 0 and 1.');
            }
            return (pGivenA * pA) / (pGivenA * pA + pGivenNotA * (1 - pA));
        };
        stat.change = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(Chalkboard.numb.change(arr1[i], arr2[i]));
            }
            return result;
        };
        stat.chiSquared = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(((arr1[i] - arr2[i]) * (arr1[i] - arr2[i])) / arr2[i]);
            }
            return result;
        };
        stat.confidenceInterval = (arr, confidence = 0.95) => {
            if (confidence <= 0 || confidence >= 1) {
                throw new RangeError('Parameter "confidence" must be between 0 and 1 (exclusive).');
            }
            const z = Chalkboard.stat.inormal(1 - (1 - confidence) / 2);
            const mean = Chalkboard.stat.mean(arr);
            const standardError = Chalkboard.stat.error(arr);
            return [mean - z * standardError, mean + z * standardError];
        };
        stat.constrain = (arr, range = [0, 1]) => {
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(Chalkboard.numb.constrain(arr[i], range));
            }
            return result;
        };
        stat.convolution = (arr1, arr2) => {
            const result = [];
            for (let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for (let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[i - j];
                }
                result.push(sum);
            }
            return result;
        };
        stat.correlation = (arr1, arr2) => {
            const result = [];
            for (let i = 0; i < arr1.length + arr2.length - 1; i++) {
                let sum = 0;
                for (let j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum += arr1[j] * arr2[arr2.length - 1 - i + j];
                }
                result.push(sum);
            }
            return result;
        };
        stat.correlationCoefficient = (arr1, arr2) => {
            return Chalkboard.stat.covariance(arr1, arr2) / (Chalkboard.stat.deviation(arr1) * Chalkboard.stat.deviation(arr2));
        };
        stat.covariance = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const mean1 = Chalkboard.stat.mean(arr1);
            const mean2 = Chalkboard.stat.mean(arr2);
            let sum = 0;
            for (let i = 0; i < arr1.length; i++) {
                sum += (arr1[i] - mean1) * (arr2[i] - mean2);
            }
            return sum / arr1.length;
        };
        stat.cummax = (arr) => {
            const result = [];
            let max = -Infinity;
            for (const value of arr) {
                max = Math.max(max, value);
                result.push(max);
            }
            return result;
        };
        stat.cummin = (arr) => {
            const result = [];
            let min = Infinity;
            for (const value of arr) {
                min = Math.min(min, value);
                result.push(min);
            }
            return result;
        };
        stat.cummul = (arr) => {
            const result = [];
            let mul = 1;
            for (let i = 0; i < arr.length; i++) {
                mul *= arr[i];
                result.push(mul);
            }
            return result;
        };
        stat.cumsum = (arr) => {
            const result = [];
            let sum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i];
                result.push(sum);
            }
            return result;
        };
        stat.deviation = (arr) => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return Chalkboard.real.sqrt(result / arr.length);
        };
        stat.dot = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            let result = 0;
            for (let i = 0; i < arr1.length; i++) {
                result += arr1[i] * arr2[i];
            }
            return result;
        };
        stat.error = (arr) => {
            return Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length);
        };
        stat.eq = (arr, arrORnum) => {
            const result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (arr[i] === arrORnum[i]) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] === arrORnum) {
                        result.push(arr[i]);
                    }
                }
            }
            return result;
        };
        stat.expected = (arr, probabilities) => {
            if (!probabilities) {
                probabilities = Array(arr.length).fill(1 / arr.length);
            }
            if (arr.length !== probabilities.length) {
                throw new RangeError('Parameters "values" and "probabilities" must have the same length.');
            }
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += arr[i] * probabilities[i];
            }
            return result;
        };
        stat.Gaussian = (height, mean, deviation) => {
            return Chalkboard.real.define((x) => height * Math.exp(-((x - mean) * (x - mean)) / (2 * deviation * deviation)));
        };
        stat.gt = (arr, arrORnum, includeEnd = false) => {
            const result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (includeEnd) {
                            if (arr[i] >= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                        else {
                            if (arr[i] > arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    if (includeEnd) {
                        if (arr[i] >= arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                    else {
                        if (arr[i] > arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        };
        stat.ineq = (arr, inf, sup, includeInf = false, includeSup = false) => {
            const result = [];
            if (Array.isArray(inf) && Array.isArray(sup)) {
                if (arr.length === inf.length && arr.length === sup.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (includeInf) {
                            if (includeSup) {
                                if (arr[i] >= inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                            else {
                                if (arr[i] >= inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        }
                        else {
                            if (includeSup) {
                                if (arr[i] > inf[i] && arr[i] <= sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                            else {
                                if (arr[i] > inf[i] && arr[i] < sup[i]) {
                                    result.push(arr[i]);
                                }
                            }
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    if (includeInf) {
                        if (includeSup) {
                            if (arr[i] >= inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        }
                        else {
                            if (arr[i] >= inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    }
                    else {
                        if (includeSup) {
                            if (arr[i] > inf && arr[i] <= sup) {
                                result.push(arr[i]);
                            }
                        }
                        else {
                            if (arr[i] > inf && arr[i] < sup) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            }
            return result;
        };
        stat.inormal = (p) => {
            if (p <= 0 || p >= 1) {
                throw new RangeError('Parameter "p" must be between 0 and 1 (exclusive).');
            }
            const a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
            const b = [-8.4735109309, 23.08336743743, -21.06224101826, 3.13082909833];
            const c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209,
                0.0276438810333863, 0.0038405729373609, 0.0003951896511919,
                0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
            let x = p - 0.5;
            if (Math.abs(x) < 0.42) {
                const r = x * x;
                return x * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) /
                    ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
            }
            else {
                const r = p < 0.5 ? p : 1 - p;
                const s = Math.log(-Math.log(r));
                let t = c[0];
                for (let i = 1; i < c.length; i++) {
                    t += c[i] * Math.pow(s, i);
                }
                return p < 0.5 ? -t : t;
            }
        };
        stat.interpolate = (arr, type = "linear") => {
            const result = arr.slice();
            for (let i = 0; i < result.length; i++) {
                if (result[i] == null) {
                    let prevIndex = i - 1;
                    let nextIndex = i + 1;
                    while (prevIndex >= 0 && result[prevIndex] == null)
                        prevIndex--;
                    while (nextIndex < result.length && result[nextIndex] == null)
                        nextIndex++;
                    const prevValue = prevIndex >= 0 ? result[prevIndex] : 0;
                    const nextValue = nextIndex < result.length ? result[nextIndex] : 0;
                    if (type === "linear") {
                        const t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.lerp([prevValue, nextValue], t);
                    }
                    else if (type === "quadratic" && prevIndex > 0 && nextIndex < result.length) {
                        const prevPrevIndex = prevIndex - 1;
                        const prevPrevValue = prevPrevIndex >= 0 ? result[prevPrevIndex] : prevValue;
                        const t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.qerp([prevPrevIndex, prevPrevValue], [prevIndex, prevValue], [nextIndex, nextValue], prevIndex + t * (nextIndex - prevIndex));
                    }
                    else {
                        const t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.lerp([prevValue, nextValue], t);
                    }
                }
            }
            return result;
        };
        stat.interquartileRange = (arr) => {
            return Chalkboard.stat.quartile(arr, "Q3") - Chalkboard.stat.quartile(arr, "Q1");
        };
        stat.kurtosis = (arr) => {
            let result = 0;
            const mean = Chalkboard.stat.mean(arr);
            const deviation = Chalkboard.stat.deviation(arr);
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / (deviation * deviation * deviation * deviation) - 3;
        };
        stat.lt = (arr, arrORnum, includeEnd = false) => {
            const result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (let i = 0; i < arr.length; i++) {
                        if (includeEnd) {
                            if (arr[i] <= arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                        else {
                            if (arr[i] < arrORnum[i]) {
                                result.push(arr[i]);
                            }
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < arr.length; i++) {
                    if (includeEnd) {
                        if (arr[i] <= arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                    else {
                        if (arr[i] < arrORnum) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            return result;
        };
        stat.mad = (arr) => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += Math.abs(arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        };
        stat.max = (arr) => {
            let max = arr[0];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        };
        stat.mean = (arr, type = "arithmetic") => {
            let result = 0;
            if (type === "arithmetic") {
                for (let i = 0; i < arr.length; i++) {
                    result += arr[i];
                }
                return result / arr.length;
            }
            else if (type === "geometric") {
                result = 1;
                for (let i = 0; i < arr.length; i++) {
                    result *= arr[i];
                }
                return Chalkboard.real.root(Math.abs(result), arr.length);
            }
            else if (type === "harmonic") {
                for (let i = 0; i < arr.length; i++) {
                    result += 1 / arr[i];
                }
                return arr.length / result;
            }
            else {
                throw new TypeError('Parameter "type" must be "arithmetic", "geometric", or "harmonic".');
            }
        };
        stat.meanMoving = (arr, windowSize) => {
            if (windowSize <= 0 || windowSize > arr.length) {
                throw new RangeError('Parameter "windowSize" must be greater than 0 and less than or equal to the array length.');
            }
            const result = [];
            for (let i = 0; i <= arr.length - windowSize; i++) {
                const windowArr = arr.slice(i, i + windowSize);
                result.push(Chalkboard.stat.sum(windowArr) / windowSize);
            }
            return result;
        };
        stat.meanWeighted = (arr, weights) => {
            if (arr.length !== weights.length) {
                throw new RangeError('Parameters "values" and "weights" must have the same length.');
            }
            let sum = 0, weightSum = 0;
            for (let i = 0; i < arr.length; i++) {
                sum += arr[i] * weights[i];
                weightSum += weights[i];
            }
            return sum / weightSum;
        };
        stat.median = (arr) => {
            if (arr.length === 0)
                return NaN;
            const copy = arr.slice();
            const mid = Math.floor(copy.length / 2);
            if (copy.length % 2 === 1) {
                return $quickselect(copy, mid);
            }
            else {
                return ($quickselect(copy, mid - 1) + $quickselect(copy, mid)) / 2.0;
            }
        };
        stat.min = (arr) => {
            let min = arr[0];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] < min) {
                    min = arr[i];
                }
            }
            return min;
        };
        stat.mode = (arr) => {
            if (arr.length === 0)
                return NaN;
            const frequency = new Map();
            let maxFreq = 0;
            let result = arr[0];
            for (let i = 0; i < arr.length; i++) {
                const val = arr[i];
                const count = (frequency.get(val) || 0) + 1;
                frequency.set(val, count);
                if (count > maxFreq) {
                    maxFreq = count;
                    result = val;
                }
            }
            return result;
        };
        stat.mul = (arr) => {
            let result = 1;
            for (let i = 0; i < arr.length; i++) {
                result *= arr[i];
            }
            return result;
        };
        stat.negate = (arr) => {
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(-arr[i]);
            }
            return result;
        };
        stat.norm = (arr, type = "L2") => {
            let result = 0;
            if (type === "L0") {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result;
            }
            else if (type === "L1") {
                for (let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result;
            }
            else if (type === "L2") {
                for (let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return Chalkboard.real.sqrt(result);
            }
            else if (type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr));
            }
            else {
                throw new TypeError('Parameter "type" must be "L0", "L1", "L2", or "LInfinity".');
            }
        };
        stat.normal = (x) => {
            const standardNormal = Chalkboard.real.define((x) => 1 / Math.sqrt(2 * Math.PI) * Math.exp(-0.5 * x * x));
            const f = standardNormal.rule;
            return f(x);
        };
        stat.normalize = (arr, type = "L2") => {
            const result = [];
            const norm = Chalkboard.stat.norm(arr, type);
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i] / norm);
            }
            return result;
        };
        stat.normsq = (arr, type = "L2") => {
            let result = 0;
            if (type === "L0") {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result * result;
            }
            else if (type === "L1") {
                for (let i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result * result;
            }
            else if (type === "L2") {
                for (let i = 0; i < arr.length; i++) {
                    result += arr[i] * arr[i];
                }
                return result;
            }
            else if (type === "LInfinity") {
                return Math.abs(Chalkboard.stat.max(arr)) * Math.abs(Chalkboard.stat.max(arr));
            }
            else {
                throw new TypeError('Parameter "type" must be "L0", "L1", "L2", or "LInfinity".');
            }
        };
        stat.pad = (arr, length, num = 0) => {
            const result = arr.slice();
            while (result.length < length) {
                result.push(num);
            }
            return result;
        };
        stat.percentile = (arr, num) => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                if (num >= arr[i]) {
                    result++;
                }
            }
            return (result / arr.length) * 100;
        };
        stat.print = (arr) => {
            console.log(Chalkboard.stat.toString(arr));
        };
        stat.quartile = (arr, type) => {
            if (arr.length === 0)
                return NaN;
            const copy = arr.slice();
            if (type === "Q2")
                return Chalkboard.stat.median(copy);
            const mid = Math.floor(copy.length / 2);
            if (type === "Q1") {
                const q1Mid = Math.floor(mid / 2);
                if (mid % 2 === 1)
                    return $quickselect(copy, q1Mid);
                else
                    return ($quickselect(copy, q1Mid - 1) + $quickselect(copy, q1Mid)) / 2.0;
            }
            else if (type === "Q3") {
                const offset = copy.length % 2 === 0 ? mid : mid + 1;
                const q3Mid = offset + Math.floor(mid / 2);
                if (mid % 2 === 1)
                    return $quickselect(copy, q3Mid);
                else
                    return ($quickselect(copy, q3Mid - 1) + $quickselect(copy, q3Mid)) / 2.0;
            }
            else {
                throw new TypeError('Parameter "type" must be "Q1", "Q2", or "Q3".');
            }
        };
        stat.random = (length, inf = 0, sup = 1) => {
            const result = [];
            for (let i = 0; i < length; i++) {
                result.push(Chalkboard.numb.random(inf, sup));
            }
            return result;
        };
        stat.range = (arr) => {
            return Chalkboard.stat.max(arr) - Chalkboard.stat.min(arr);
        };
        stat.regression = (data, type = "linear", degree = 2) => {
            if (type === "linear") {
                let x = 0, y = 0;
                let xx = 0, xy = 0;
                for (let i = 0; i < data.length; i++) {
                    x += data[i][0];
                    y += data[i][1];
                    xx += data[i][0] * data[i][0];
                    xy += data[i][0] * data[i][1];
                }
                const a = (data.length * xy - x * y) / (data.length * xx - x * x);
                const b = y / data.length - (a * x) / data.length;
                return Chalkboard.real.define((x) => a * x + b);
            }
            else if (type === "polynomial") {
                const A = Chalkboard.matr.init();
                for (let i = 0; i < data.length; i++) {
                    A.push([]);
                    for (let j = 0; j <= degree; j++) {
                        A[i].push(Chalkboard.real.pow(data[i][0], j));
                    }
                }
                const AT = Chalkboard.matr.transpose(A);
                const B = Chalkboard.matr.init();
                for (let i = 0; i < data.length; i++) {
                    B.push([data[i][1]]);
                }
                const ATA = Chalkboard.matr.mul(AT, A);
                const ATAI = Chalkboard.matr.invert(ATA);
                const x = Chalkboard.matr.mul(Chalkboard.matr.mul(ATAI, AT), B);
                const coeff = [];
                for (let i = 0; i < x.length; i++) {
                    coeff.push(x[i][0]);
                }
                return Chalkboard.real.define((x) => {
                    let result = coeff[0];
                    result += coeff[1] * x;
                    for (let i = 2; i <= degree; i++) {
                        result += coeff[i] * Math.pow(x, i);
                    }
                    return result;
                });
            }
            else if (type === "power") {
                const arr = [0, 0, 0, 0];
                for (let i = 0; i < data.length; i++) {
                    arr[0] += Math.log(data[i][0]);
                    arr[1] += Math.log(data[i][1]) * Math.log(data[i][0]);
                    arr[2] += Math.log(data[i][1]);
                    arr[3] += Math.log(data[i][0]) * Math.log(data[i][0]);
                }
                const a = Chalkboard.E((arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length);
                const b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define((x) => a * Math.pow(x, b));
            }
            else if (type === "exponential") {
                const arr = [0, 0, 0, 0, 0, 0];
                for (let i = 0; i < data.length; i++) {
                    arr[0] += data[i][0];
                    arr[1] += data[i][1];
                    arr[2] += data[i][0] * data[i][0] * data[i][1];
                    arr[3] += data[i][1] * Math.log(data[i][1]);
                    arr[4] += data[i][0] * (data[i][1] * Math.log(data[i][1]));
                    arr[5] += data[i][0] * data[i][1];
                }
                const a = Chalkboard.E((arr[2] * arr[3] - arr[5] * arr[4]) / (arr[1] * arr[2] - arr[5] * arr[5]));
                const b = (arr[1] * arr[4] - arr[5] * arr[3]) / (arr[1] * arr[2] - arr[5] * arr[5]);
                return Chalkboard.real.define((x) => a * Math.exp(b * x));
            }
            else if (type === "logarithmic") {
                const arr = [0, 0, 0, 0];
                for (let i = 0; i < data.length; i++) {
                    arr[0] += Math.log(data[i][0]);
                    arr[1] += data[i][1] * Math.log(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Math.log(data[i][0]) * Math.log(data[i][0]);
                }
                const a = (arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length;
                const b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define((x) => a + b * Math.log(x));
            }
            else {
                throw new TypeError('Parameter "type" must be "linear", "polynomial", "power", "exponential", or "logarithmic".');
            }
        };
        stat.resampling = (arr, samples, type = "bootstrap") => {
            if (type === "bootstrap") {
                const numSamples = samples ?? 100;
                const result = [];
                for (let i = 0; i < numSamples; i++) {
                    const sample = [];
                    for (let j = 0; j < arr.length; j++) {
                        sample.push(arr[Math.floor(Math.random() * arr.length)]);
                    }
                    result.push(sample);
                }
                return result;
            }
            else if (type === "jackknife") {
                const numSamples = samples ?? arr.length;
                const allJackknifeSamples = [];
                for (let i = 0; i < arr.length; i++) {
                    allJackknifeSamples.push(arr.slice(0, i).concat(arr.slice(i + 1)));
                }
                if (numSamples < allJackknifeSamples.length) {
                    const selectedSamples = [];
                    const usedIndices = new Set();
                    while (selectedSamples.length < numSamples) {
                        const randomIndex = Math.floor(Math.random() * allJackknifeSamples.length);
                        if (!usedIndices.has(randomIndex)) {
                            usedIndices.add(randomIndex);
                            selectedSamples.push(allJackknifeSamples[randomIndex]);
                        }
                    }
                    return selectedSamples;
                }
                return allJackknifeSamples;
            }
            else {
                throw new TypeError('Parameter "type" must be "bootstrap" or "jackknife".');
            }
        };
        stat.reverse = (arr) => {
            const result = [];
            for (let i = arr.length - 1; i >= 0; i--) {
                result.push(arr[i]);
            }
            return result;
        };
        stat.scl = (arr, num) => {
            const result = [];
            for (let i = 0; i < arr.length; i++) {
                result.push(arr[i] * num);
            }
            return result;
        };
        stat.shuffle = (arr) => {
            let index, temp, rindex;
            for (index = arr.length - 1; index > 0; index--) {
                rindex = Math.floor(Chalkboard.numb.random(0, index + 1));
                temp = arr[index];
                arr[index] = arr[rindex];
                arr[rindex] = temp;
            }
            return arr;
        };
        stat.skewness = (arr) => {
            let result = 0;
            const mean = Chalkboard.stat.mean(arr);
            const deviation = Chalkboard.stat.deviation(arr);
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / ((arr.length - 1) * (deviation * deviation * deviation));
        };
        stat.sub = (arr1, arr2) => {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            const result = [];
            for (let i = 0; i < arr1.length; i++) {
                result.push(arr1[i] - arr2[i]);
            }
            return result;
        };
        stat.subsets = (arr) => {
            let result = [[]];
            arr.sort();
            for (let i = 0; i < arr.length; i++) {
                if (i === 0 || arr[i] !== arr[i - 1]) {
                    const curr = arr[i];
                    const subsetsWithCurr = [];
                    for (let j = 0; j < result.length; j++) {
                        const subset = result[j].slice();
                        subset.push(curr);
                        subsetsWithCurr.push(subset);
                    }
                    result = result.concat(subsetsWithCurr);
                }
            }
            return result;
        };
        stat.sum = (arr) => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += arr[i];
            }
            return result;
        };
        stat.toMatrix = (arr, rows, cols = rows) => {
            const result = Chalkboard.matr.init();
            let index = 0;
            for (let i = 0; i < rows; i++) {
                result[i] = [];
                for (let j = 0; j < cols; j++) {
                    if (index < arr.length) {
                        result[i].push(arr[index]);
                    }
                    else {
                        result[i].push(0);
                    }
                    index++;
                }
            }
            return result;
        };
        stat.toObject = (arr) => {
            const result = {};
            for (let i = 0; i < arr.length; i++) {
                result["_" + i.toString()] = arr[i];
            }
            return result;
        };
        stat.toSet = (arr) => {
            return Chalkboard.abal.set(arr);
        };
        stat.toString = (arr) => {
            return "[" + arr.join(", ") + "]";
        };
        stat.toTensor = (arr, ...size) => {
            if (Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(arr, ...size);
        };
        stat.toVector = (arr, dimension, index = 0) => {
            if (dimension === 2) {
                return Chalkboard.vect.init(arr[index], arr[index + 1]);
            }
            else if (dimension === 3) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2]);
            }
            else if (dimension === 4) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            }
            else {
                throw new RangeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };
        stat.unique = (arr) => {
            if (arr.length === 0)
                return [];
            const firstType = typeof arr[0];
            if (firstType === "number" || firstType === "string" || firstType === "boolean")
                return Array.from(new Set(arr));
            const stableStringify = (obj) => {
                const replacer = (key, value) => {
                    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
                        const sortedObj = {};
                        Object.keys(value).sort().forEach(k => {
                            sortedObj[k] = value[k];
                        });
                        return sortedObj;
                    }
                    return value;
                };
                return JSON.stringify(obj, replacer);
            };
            const seen = new Map();
            for (const item of arr) {
                const typePrefix = item === null ? "null" : typeof item;
                const valuePart = (typePrefix === "undefined" || Number.isNaN(item)) ? "" : stableStringify(item);
                const key = `${typePrefix}:${valuePart}`;
                if (!seen.has(key))
                    seen.set(key, item);
            }
            return Array.from(seen.values());
        };
        stat.variance = (arr) => {
            let result = 0;
            for (let i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        };
        stat.zscored = (arr) => {
            let result = [];
            const mean = Chalkboard.stat.mean(arr);
            const deviation = Chalkboard.stat.deviation(arr);
            for (let i = 0; i < arr.length; i++) {
                result.push((arr[i] - mean) / deviation);
            }
            return result;
        };
    })(stat = Chalkboard.stat || (Chalkboard.stat = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let tens;
    (function (tens_1) {
        tens_1.absolute = (tens) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.absolute(tens[i]);
                }
                return result;
            }
            else {
                return Math.abs(tens);
            }
        };
        tens_1.add = (tens1, tens2) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (let i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.add(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            }
            else {
                return tens1 + tens2;
            }
        };
        tens_1.concat = (tens1, tens2, rank = 1) => {
            const concatAtRank = function (arr1, arr2, currentRank) {
                if (currentRank === rank) {
                    return Chalkboard.tens.init(arr1.concat(arr2));
                }
                return arr1.map(function (element, index) {
                    return concatAtRank(element, arr2[index], currentRank);
                });
            };
            return concatAtRank(tens1, tens2, 1);
        };
        tens_1.constrain = (tens, range = [0, 1]) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.constrain(tens[i], range);
                }
                return result;
            }
            else {
                return Chalkboard.numb.constrain(tens, range);
            }
        };
        tens_1.contract = (tens) => {
            if (Chalkboard.tens.rank(tens) > 2) {
                return Chalkboard.tens.resize(tens, Chalkboard.tens.size(tens)[0], Chalkboard.tens
                    .size(tens)
                    .slice(1)
                    .reduce(function (a, b) {
                    return a * b;
                }) / Chalkboard.tens.size(tens)[0]);
            }
            else if (Chalkboard.tens.rank(tens) === 2) {
                return Chalkboard.matr.trace(tens);
            }
            else {
                return tens;
            }
        };
        tens_1.copy = (tens) => {
            if (Array.isArray(tens)) {
                const result = Chalkboard.tens.init();
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.copy(tens[i]);
                }
                return result;
            }
            else {
                return tens;
            }
        };
        tens_1.empty = (...size) => {
            size = Array.isArray(size[0]) ? size[0] : size;
            const newNDArray = function (size) {
                if (size.length === 0) {
                    return null;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
        tens_1.fill = (element, ...size) => {
            size = Array.isArray(size[0]) ? size[0] : size;
            const newNDArray = function (size) {
                if (size.length === 0) {
                    return element;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
        tens_1.init = (...tensor) => {
            if (tensor.length === 0) {
                return [];
            }
            else if (tensor.length === 1 && Array.isArray(tensor[0])) {
                tensor = tensor[0];
            }
            const newNDArray = function (arr) {
                return arr.map(function (subarr) {
                    if (Array.isArray(subarr)) {
                        return newNDArray(subarr);
                    }
                    else {
                        return subarr;
                    }
                });
            };
            return newNDArray(tensor);
        };
        tens_1.isApproxEqual = (tens1, tens2, precision = 0.000001) => {
            if (Chalkboard.tens.isSizeEqual(tens1, tens2)) {
                (tens1 = tens1), (tens2 = tens2);
                for (let i = 0; i < tens1.length; i++) {
                    if (Array.isArray(tens1[i]) && Array.isArray(tens2[i])) {
                        if (!Chalkboard.tens.isApproxEqual(tens1[i], tens2[i], precision))
                            return false;
                    }
                    else {
                        if (!Chalkboard.numb.isApproxEqual(tens1[i], tens2[i], precision))
                            return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        };
        tens_1.isEqual = (tens1, tens2) => {
            if (Chalkboard.tens.isSizeEqual(tens1, tens2)) {
                (tens1 = tens1), (tens2 = tens2);
                for (let i = 0; i < tens1.length; i++) {
                    if (Array.isArray(tens1[i]) && Array.isArray(tens2[i])) {
                        if (!Chalkboard.tens.isEqual(tens1[i], tens2[i]))
                            return false;
                    }
                    else {
                        if (tens1[i] !== tens2[i])
                            return false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        };
        tens_1.isRankEqual = (tens1, tens2) => {
            return Chalkboard.tens.rank(tens1) === Chalkboard.tens.rank(tens2);
        };
        tens_1.isRankOf = (tens, rank) => {
            return Chalkboard.tens.rank(tens) === rank;
        };
        tens_1.isSizeEqual = (tens1, tens2) => {
            if (Chalkboard.tens.isRankEqual(tens1, tens2)) {
                let score = 0;
                for (let i = 0; i < Chalkboard.tens.rank(tens1); i++) {
                    if (Chalkboard.tens.size(tens1)[i] !== Chalkboard.tens.size(tens2)[i])
                        score++;
                }
                return score === 0;
            }
            else {
                return false;
            }
        };
        tens_1.isSizeOf = (tens, ...size) => {
            size = Array.isArray(size[0]) ? size[0] : size;
            return Chalkboard.tens.isSizeEqual(tens, Chalkboard.tens.empty(...size));
        };
        tens_1.isSizeUniform = (tens) => {
            let score = 0;
            for (let i = 0; i < Chalkboard.tens.rank(tens); i++) {
                if (Chalkboard.tens.size(tens)[i] !== Chalkboard.tens.size(tens)[0])
                    score++;
            }
            return score === 0;
        };
        tens_1.isZero = (tens) => {
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    if (!Chalkboard.tens.isZero(tens[i]))
                        return false;
                }
                return true;
            }
            else {
                return Chalkboard.numb.isApproxEqual(tens, 0);
            }
        };
        tens_1.mul = (tens1, tens2) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (let i = 0; i < tens1.length; i++) {
                    const subarr = Chalkboard.tens.init();
                    for (let j = 0; j < tens2.length; j++) {
                        subarr[j] = Chalkboard.tens.mul(tens1[i], tens2[j]);
                    }
                    result.push(subarr);
                }
                return result;
            }
            else {
                return tens1 * tens2;
            }
        };
        tens_1.negate = (tens) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.negate(tens[i]);
                }
                return result;
            }
            else {
                return -tens;
            }
        };
        tens_1.print = (tens) => {
            console.log(Chalkboard.tens.toString(tens));
        };
        tens_1.pull = (tens, rank, index) => {
            tens = tens;
            if (rank === 0) {
                tens.splice(index, 1);
                return tens;
            }
            else {
                for (let i = 0; i < tens.length; i++) {
                    Chalkboard.tens.pull(tens[i], rank - 1, index);
                }
                return tens;
            }
        };
        tens_1.push = (tens, rank, index, elements) => {
            tens = tens;
            if (rank === 0) {
                tens.splice(index, 0, elements);
                return tens;
            }
            else {
                for (let i = 0; i < tens.length; i++) {
                    Chalkboard.tens.push(tens[i], rank - 1, index, elements[i]);
                }
                return tens;
            }
        };
        tens_1.random = (inf, sup, ...size) => {
            size = Array.isArray(size[0]) ? size[0] : size;
            const newNDArray = function (size) {
                if (size.length === 0) {
                    return Chalkboard.numb.random(inf, sup);
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
        tens_1.rank = (tens) => {
            return Chalkboard.tens.size(tens).length;
        };
        tens_1.reciprocate = (tens) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.reciprocate(tens[i]);
                }
                return result;
            }
            else {
                return 1 / tens;
            }
        };
        tens_1.resize = (tens, ...size) => {
            size = Array.isArray(size[0]) ? size[0] : size;
            const result = Chalkboard.tens.fill(0, ...size);
            const refill = function (arr1, arr2) {
                for (let i = 0; i < arr2.length; i++) {
                    if (Array.isArray(arr2[i])) {
                        refill(arr1, arr2[i]);
                    }
                    else {
                        arr2[i] = arr1.length > 0 ? arr1.shift() : 0;
                    }
                }
            };
            refill(Chalkboard.tens.toArray(tens), result);
            return result;
        };
        tens_1.round = (tens) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.round(tens[i]);
                }
                return result;
            }
            else {
                return Math.round(tens);
            }
        };
        tens_1.scl = (tens, num) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (let i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.scl(tens[i], num);
                }
                return result;
            }
            else {
                return tens * num;
            }
        };
        tens_1.size = (tens) => {
            if (Array.isArray(tens)) {
                let result = [tens.length];
                if (Array.isArray(tens[0])) {
                    result = result.concat(Chalkboard.tens.size(tens[0]));
                }
                return result;
            }
            else {
                return [];
            }
        };
        tens_1.sub = (tens1, tens2) => {
            const result = Chalkboard.tens.init();
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (let i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.sub(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            }
            else {
                return tens1 - tens2;
            }
        };
        tens_1.toArray = (tens) => {
            const result = [];
            const flatten = function (tens) {
                for (let i = 0; i < tens.length; i++) {
                    if (Array.isArray(tens[i])) {
                        flatten(tens[i]);
                    }
                    else {
                        result.push(tens[i]);
                    }
                }
            };
            flatten(tens);
            return result;
        };
        tens_1.toMatrix = (tens) => {
            const result = Chalkboard.matr.init();
            const flatten = function (tens, result) {
                for (let i = 0; i < tens.length; i++) {
                    if (Array.isArray(tens[i])) {
                        flatten(tens[i], result);
                    }
                    else {
                        result.push(tens[i]);
                    }
                }
            };
            const matr = Chalkboard.matr.init();
            flatten(tens, matr);
            const rows = tens.length || 1;
            for (let j = 0; j < rows; j++) {
                result.push(matr.slice((j * matr.length) / rows, ((j + 1) * matr.length) / rows));
            }
            return result;
        };
        tens_1.toObject = (tens) => {
            if (Array.isArray(tens)) {
                const result = {};
                for (let i = 0; i < tens.length; i++) {
                    result["_" + (i + 1)] = Chalkboard.tens.toObject(tens[i]);
                }
                return result;
            }
            else {
                return tens;
            }
        };
        tens_1.toSet = (tens) => {
            return Chalkboard.abal.set(Chalkboard.tens.toArray(tens));
        };
        tens_1.toString = (tens, indentation = 0) => {
            if (Array.isArray(tens[0])) {
                let result = "\t".repeat(indentation) + "[\n";
                for (let i = 0; i < tens.length; i++) {
                    result += Chalkboard.tens.toString(tens[i], indentation + 1);
                }
                result += "\t".repeat(indentation) + "]\n";
                return result;
            }
            else {
                let result = "\t".repeat(indentation) + "[ ";
                for (let i = 0; i < tens.length; i++) {
                    result += tens[i].toString() + " ";
                }
                result += "]\n";
                return result;
            }
        };
        tens_1.toTypedArray = (tens, type = "float32") => {
            const arr = Chalkboard.tens.toArray(tens);
            if (type === "int8") {
                return new Int8Array(arr);
            }
            else if (type === "int16") {
                return new Int16Array(arr);
            }
            else if (type === "int32") {
                return new Int32Array(arr);
            }
            else if (type === "float32") {
                return new Float32Array(arr);
            }
            else if (type === "float64") {
                return new Float64Array(arr);
            }
            else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };
        tens_1.toVector = (tens, dimension, index = 0) => {
            const arr = Chalkboard.tens.toArray(tens);
            if (dimension === 2) {
                return Chalkboard.vect.init(arr[index], arr[index + 1]);
            }
            else if (dimension === 3) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2]);
            }
            else if (dimension === 4) {
                return Chalkboard.vect.init(arr[index], arr[index + 1], arr[index + 2], arr[index + 3]);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        tens_1.transpose = (tens) => {
            return Chalkboard.tens.resize(tens, ...Chalkboard.tens.size(tens).reverse());
        };
        tens_1.zero = (...size) => {
            size = Array.isArray(size[0]) ? size[0] : size;
            const newNDArray = function (size) {
                if (size.length === 0) {
                    return 0;
                }
                const curr = size[0];
                const rest = size.slice(1);
                const result = [];
                for (let i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
    })(tens = Chalkboard.tens || (Chalkboard.tens = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let trig;
    (function (trig) {
        trig.arccos = (rad) => {
            if (rad === 1) {
                return 0;
            }
            else if (rad === -1) {
                return Chalkboard.PI();
            }
            else if (rad > -1 && rad < 1) {
                if (rad >= 0) {
                    return 2 * Chalkboard.trig.arctan(Chalkboard.real.sqrt((1 - rad) / (1 + rad)));
                }
                else {
                    return Chalkboard.PI() - 2 * Chalkboard.trig.arctan(Chalkboard.real.sqrt((1 + rad) / (1 - rad)));
                }
            }
            else {
                return undefined;
            }
        };
        trig.arccosh = (rad) => {
            if (rad >= 1) {
                return Math.log(rad + Math.sqrt(rad * rad - 1));
            }
            else {
                return undefined;
            }
        };
        trig.arccot = (rad) => {
            return Chalkboard.PI(0.5) - Chalkboard.trig.arctan(rad);
        };
        trig.arccoth = (rad) => {
            if (rad < -1 || rad > 1) {
                return Math.log((rad + 1) / (rad - 1)) / 2;
            }
            else {
                return undefined;
            }
        };
        trig.arccsc = (rad) => {
            if (rad === 1) {
                return Chalkboard.PI(0.5);
            }
            else if (rad === -1) {
                return Chalkboard.PI(-0.5);
            }
            else if (rad > 1 || rad < -1) {
                return Chalkboard.trig.arcsin(1 / rad);
            }
            else {
                return undefined;
            }
        };
        trig.arccsch = (rad) => {
            if (rad !== 0) {
                return Math.log(1 / rad + Math.sqrt(1 / (rad * rad) + 1));
            }
            else {
                return undefined;
            }
        };
        trig.arcsec = (rad) => {
            if (rad === 1) {
                return 0;
            }
            else if (rad === -1) {
                return Chalkboard.PI();
            }
            else if (rad > 1 || rad < -1) {
                return Chalkboard.trig.arccos(1 / rad);
            }
            else {
                return undefined;
            }
        };
        trig.arcsech = (rad) => {
            if (rad > 0 && rad <= 1) {
                return Math.log(1 / rad + Math.sqrt(1 / (rad * rad) - 1));
            }
            else {
                return undefined;
            }
        };
        trig.arcsin = (rad) => {
            if (rad > -1 && rad < 1) {
                const t = 1 - rad * rad;
                const s = Chalkboard.real.sqrt(t < 0 ? 0 : t);
                return 2 * Chalkboard.trig.arctan(rad / (1 + s));
            }
            else if (rad === 1) {
                return Chalkboard.PI(0.5);
            }
            else if (rad === -1) {
                return Chalkboard.PI(-0.5);
            }
            else {
                return undefined;
            }
        };
        trig.arcsinh = (rad) => {
            return Math.log(rad + Math.sqrt(rad * rad + 1));
        };
        trig.arctan = (rad) => {
            const series = (x) => {
                const x2 = x * x, x3 = x2 * x, x5 = x3 * x2, x7 = x5 * x2, x9 = x7 * x2, x11 = x9 * x2, x13 = x11 * x2, x15 = x13 * x2, x17 = x15 * x2, x19 = x17 * x2, x21 = x19 * x2, x23 = x21 * x2, x25 = x23 * x2, x27 = x25 * x2, x29 = x27 * x2, x31 = x29 * x2, x33 = x31 * x2, x35 = x33 * x2, x37 = x35 * x2, x39 = x37 * x2;
                return x - x3 / 3 + x5 / 5 - x7 / 7 + x9 / 9 - x11 / 11 + x13 / 13 - x15 / 15 + x17 / 17 - x19 / 19 + x21 / 21 - x23 / 23 + x25 / 25 - x27 / 27 + x29 / 29 - x31 / 31 + x33 / 33 - x35 / 35 + x37 / 37 - x39 / 39;
            };
            if (rad === 0)
                return 0;
            if (!Number.isFinite(rad))
                return rad > 0 ? Chalkboard.PI(0.5) : Chalkboard.PI(-0.5);
            const sign = rad < 0 ? -1 : 1;
            const x = Math.abs(rad);
            const SQRT2_MINUS_1 = Math.SQRT2 - 1, SQRT2_PLUS_1 = Math.SQRT2 + 1;
            const PI_FOURTH = Math.PI * 0.25, PI_HALF = Math.PI * 0.5;
            let result;
            if (x <= SQRT2_MINUS_1) {
                result = series(x);
            }
            else if (x <= SQRT2_PLUS_1) {
                result = PI_FOURTH + series((x - 1) / (x + 1));
            }
            else {
                result = PI_HALF - series(1 / x);
            }
            return sign * result;
        };
        trig.arctanh = (rad) => {
            if (rad > -1 && rad < 1) {
                return Math.log((1 + rad) / (1 - rad)) / 2;
            }
            else {
                return undefined;
            }
        };
        trig.arctan2 = (y, x) => {
            if (x === 0) {
                if (y > 0) {
                    return Chalkboard.PI(0.5);
                }
                else if (y < 0) {
                    return Chalkboard.PI(-0.5);
                }
                else {
                    return 0;
                }
            }
            else {
                if (x > 0 && y >= 0) {
                    return Chalkboard.trig.arctan(y / x);
                }
                else if (x < 0 && y >= 0) {
                    return Chalkboard.trig.arctan(y / x) + Chalkboard.PI();
                }
                else if (x < 0 && y < 0) {
                    return Chalkboard.trig.arctan(y / x) - Chalkboard.PI();
                }
                else {
                    return Chalkboard.trig.arctan(y / x);
                }
            }
        };
        trig.cos = (rad) => {
            const x = Chalkboard.trig.coterminal(rad);
            const x2 = x * x, x4 = x2 * x2, x6 = x4 * x2, x8 = x4 * x4, x10 = x6 * x4, x12 = x8 * x4, x14 = x8 * x6, x16 = x8 * x8, x18 = x10 * x8, x20 = x10 * x10, x22 = x12 * x10, x24 = x12 * x12, x26 = x14 * x12, x28 = x14 * x14;
            return (1 -
                x2 / 2 +
                x4 / 24 -
                x6 / 720 +
                x8 / 40320 -
                x10 / 3628800 +
                x12 / 479001600 -
                x14 / 87178291200 +
                x16 / 20922789888000 -
                x18 / 6402373705728000 +
                x20 / 2.43290200817664e+18 -
                x22 / 1.1240007277776077e+21 +
                x24 / 6.204484017332394e+23 -
                x26 / 4.0329146112660565e+26 +
                x28 / 3.0488834461171384e+29);
        };
        trig.cosh = (rad) => {
            return (Math.pow(Chalkboard.E(), rad) + Math.pow(Chalkboard.E(), -rad)) / 2;
        };
        trig.cot = (rad) => {
            return 1 / Chalkboard.trig.tan(rad);
        };
        trig.coth = (rad) => {
            return 1 / Chalkboard.trig.tanh(rad);
        };
        trig.coterminal = (rad) => {
            return rad % (2 * Chalkboard.PI());
        };
        trig.csc = (rad) => {
            return 1 / Chalkboard.trig.sin(rad);
        };
        trig.csch = (rad) => {
            return 1 / Chalkboard.trig.sinh(rad);
        };
        trig.sec = (rad) => {
            return 1 / Chalkboard.trig.cos(rad);
        };
        trig.sech = (rad) => {
            return 1 / Chalkboard.trig.cosh(rad);
        };
        trig.sin = (rad) => {
            const x = Chalkboard.trig.coterminal(rad);
            const x2 = x * x, x3 = x2 * x, x5 = x3 * x2, x7 = x5 * x2, x9 = x7 * x2, x11 = x9 * x2, x13 = x11 * x2, x15 = x13 * x2, x17 = x15 * x2, x19 = x17 * x2, x21 = x19 * x2, x23 = x21 * x2, x25 = x23 * x2, x27 = x25 * x2, x29 = x27 * x2;
            return (x -
                x3 / 6 +
                x5 / 120 -
                x7 / 5040 +
                x9 / 362880 -
                x11 / 39916800 +
                x13 / 6227020800 -
                x15 / 1307674368000 +
                x17 / 355687428096000 -
                x19 / 1.21645100408832e+17 +
                x21 / 5.109094217170944e+19 -
                x23 / 2.585201673888498e+22 +
                x25 / 1.5511210043330986e+25 -
                x27 / 1.0888869450418352e+28 +
                x29 / 8.841761993739701e+30);
        };
        trig.sinh = (rad) => {
            return (Math.pow(Chalkboard.E(), rad) - Math.pow(Chalkboard.E(), -rad)) / 2;
        };
        trig.tan = (rad) => {
            return Chalkboard.trig.sin(rad) / Chalkboard.trig.cos(rad);
        };
        trig.tanh = (rad) => {
            return Chalkboard.trig.sinh(rad) / Chalkboard.trig.cosh(rad);
        };
        trig.toDeg = (rad) => {
            return rad * (180 / Chalkboard.PI());
        };
        trig.toRad = (deg) => {
            return deg * (Chalkboard.PI() / 180);
        };
    })(trig = Chalkboard.trig || (Chalkboard.trig = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    let vect;
    (function (vect_1) {
        const $ = (input) => {
            const $$ = (x, y, z, w) => {
                if (z === undefined && w === undefined) {
                    return { x: x, y: y };
                }
                else if (w === undefined) {
                    return { x: x, y: y, z: z };
                }
                else {
                    return { x: x, y: y, z: z, w: w };
                }
            };
            const v = input;
            if (v && typeof v.x === "number" && typeof v.y === "number") {
                return input;
            }
            if (Array.isArray(input)) {
                if (input.length > 0 && Array.isArray(input[0])) {
                    const matr = input;
                    const rows = Chalkboard.matr.rows(matr);
                    const cols = Chalkboard.matr.cols(matr);
                    if (cols === 1) {
                        if (rows === 2)
                            return $$(matr[0][0], matr[1][0]);
                        if (rows === 3)
                            return $$(matr[0][0], matr[1][0], matr[2][0]);
                        if (rows === 4)
                            return $$(matr[0][0], matr[1][0], matr[2][0], matr[3][0]);
                    }
                    else if (rows === 1) {
                        if (cols === 2)
                            return $$(matr[0][0], matr[0][1]);
                        if (cols === 3)
                            return $$(matr[0][0], matr[0][1], matr[0][2]);
                        if (cols === 4)
                            return $$(matr[0][0], matr[0][1], matr[0][2], matr[0][3]);
                    }
                }
                else {
                    const arr = input;
                    if (arr.length === 2)
                        return $$(arr[0], arr[1]);
                    if (arr.length === 3)
                        return $$(arr[0], arr[1], arr[2]);
                    if (arr.length === 4)
                        return $$(arr[0], arr[1], arr[2], arr[3]);
                }
            }
            if (input instanceof Float32Array || input instanceof Float64Array) {
                const arr = input;
                if (arr.length === 2)
                    return $$(arr[0], arr[1]);
                if (arr.length === 3)
                    return $$(arr[0], arr[1], arr[2]);
                if (arr.length === 4)
                    return $$(arr[0], arr[1], arr[2], arr[3]);
            }
            if (typeof input === "string") {
                try {
                    const parsed = JSON.parse(input);
                    if (parsed && typeof parsed === "object" && typeof parsed.x === "number" && typeof parsed.y === "number") {
                        return $$(parsed.x, parsed.y, parsed.z !== undefined ? parsed.z : undefined, parsed.w !== undefined ? parsed.w : undefined);
                    }
                }
                catch (e) {
                    const str = input.trim();
                    if (str.startsWith("(") && str.endsWith(")")) {
                        const content = str.substring(1, str.length - 1);
                        const components = content.split(",").map(part => parseFloat(part.trim()));
                        if (components.length >= 2 && components.every(p => !isNaN(p))) {
                            if (components.length === 2)
                                return $$(components[0], components[1]);
                            if (components.length === 3)
                                return $$(components[0], components[1], components[2]);
                            if (components.length === 4)
                                return $$(components[0], components[1], components[2], components[3]);
                        }
                    }
                }
            }
            throw new TypeError(`Invalid ChalkboardVector input: ${JSON.stringify(input)}`);
        };
        vect_1.absolute = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z), Math.abs(vect.w));
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.add = (vect1, vect2) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.vect.init(vect1.x + vect2.x, vect1.y + vect2.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.vect.init(vect1.x + vect2.x, vect1.y + vect2.y, vect1.z + vect2.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.vect.init(vect1.x + vect2.x, vect1.y + vect2.y, vect1.z + vect2.z, vect1.w + vect2.w);
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.ang = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.trig.arctan2(vect.y, vect.x);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                const m = Chalkboard.vect.mag(vect);
                return [Math.acos(vect.x / m), Math.acos(vect.y / m), Math.acos(vect.z / m)];
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                const m = Chalkboard.vect.mag(vect);
                return [Math.acos(vect.x / m), Math.acos(vect.y / m), Math.acos(vect.z / m), Math.acos(vect.w / m)];
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.angBetween = (vect1, vect2) => {
            return Math.acos(Chalkboard.vect.dot(vect1, vect2) / (Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2)));
        };
        vect_1.constrain = (vect, range = [0, 1]) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z, range));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z, range), Chalkboard.numb.constrain(vect.w, range));
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.copy = (vect) => {
            vect = $(vect);
            const _vect = Object.create(Object.getPrototypeOf(vect), Object.getOwnPropertyDescriptors(vect));
            if (mode === "vector")
                return _vect;
            if (mode === "array")
                return Chalkboard.vect.toArray(_vect);
            if (mode === "float32array")
                return new Float32Array(Chalkboard.vect.toArray(_vect));
            if (mode === "float64array")
                return new Float64Array(Chalkboard.vect.toArray(_vect));
            if (mode === "matrix")
                return Chalkboard.vect.toMatrix(_vect);
            if (mode === "string")
                return Chalkboard.vect.toString(_vect);
            if (mode === "json")
                return JSON.stringify(_vect);
            return _vect;
        };
        vect_1.cross = (vect1, vect2) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.vect.init(0, 0, vect1.x * vect2.y - vect1.y * vect2.x);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.vect.init(vect1.y * vect2.z - vect1.z * vect2.y, vect1.z * vect2.x - vect1.x * vect2.z, vect1.x * vect2.y - vect1.y * vect2.x);
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2 or 3 dimensions.');
            }
        };
        vect_1.dimension = (vectORvectfield) => {
            try {
                const v = $(vectORvectfield);
                if (typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "undefined" && typeof v.w === "undefined") {
                    return 2;
                }
                else if (typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "number" && typeof v.w === "undefined") {
                    return 3;
                }
                else if (typeof v.x === "number" && typeof v.y === "number" && typeof v.z === "number" && typeof v.w === "number") {
                    return 4;
                }
            }
            catch {
                const f = vectORvectfield;
                if (f.type === "vector2d") {
                    return 2;
                }
                else if (f.type === "vector3d") {
                    return 3;
                }
                else if (f.type === "vector4d") {
                    return 4;
                }
            }
            throw new TypeError('Parameter "vectORvectfield" must be a vector or vector field with 2, 3, or 4 dimensions.');
        };
        vect_1.dist = (vect1, vect2) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y));
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z - vect1.z) * (vect2.z - vect1.z));
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z - vect1.z) * (vect2.z - vect1.z) + (vect2.w - vect1.w) * (vect2.w - vect1.w));
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.distsq = (vect1, vect2) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z - vect1.z) * (vect2.z - vect1.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return ((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z - vect1.z) * (vect2.z - vect1.z) + (vect2.w - vect1.w) * (vect2.w - vect1.w));
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.dot = (vect1, vect2) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return vect1.x * vect2.x + vect1.y * vect2.y;
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return vect1.x * vect2.x + vect1.y * vect2.y + vect1.z * vect2.z;
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return vect1.x * vect2.x + vect1.y * vect2.y + vect1.z * vect2.z + vect1.w * vect2.w;
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.empty = (dimension) => {
            const _null = null;
            if (dimension === 2) {
                return Chalkboard.vect.init(_null, _null);
            }
            else if (dimension === 3) {
                return Chalkboard.vect.init(_null, _null, _null);
            }
            else if (dimension === 4) {
                return Chalkboard.vect.init(_null, _null, _null, _null);
            }
            else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };
        vect_1.field = (p, q, r, s) => {
            if (r === undefined && s === undefined) {
                return { rule: [p, q], field: "real", type: "vector2d" };
            }
            else if (s === undefined) {
                return { rule: [p, q, r], field: "real", type: "vector3d" };
            }
            else {
                return { rule: [p, q, r, s], field: "real", type: "vector4d" };
            }
        };
        vect_1.fill = (num, dimension) => {
            if (dimension === 2) {
                return Chalkboard.vect.init(num, num);
            }
            else if (dimension === 3) {
                return Chalkboard.vect.init(num, num, num);
            }
            else if (dimension === 4) {
                return Chalkboard.vect.init(num, num, num, num);
            }
            else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };
        vect_1.fromAlternateToCartesian = (vect, type) => {
            vect = $(vect);
            if (type === "polar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.y * Chalkboard.trig.sin(vect.y));
            }
            else if (type === "bipolar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init((vect.x * vect.x - vect.y * vect.y) / 4, Chalkboard.real.sqrt(16 * vect.x * vect.x - (vect.x * vect.x - vect.y * vect.y + 4) * (vect.x * vect.x - vect.y * vect.y + 4)));
            }
            else if (type === "cylindrical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.y), vect.z);
            }
            else if (type === "spherical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.sin(vect.z) * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.z) * Chalkboard.trig.sin(vect.y), vect.x * Chalkboard.trig.cos(vect.z));
            }
            else {
                throw new TypeError('Parameter "type" must be "polar", "bipolar", "cylindrical", or "spherical".');
            }
        };
        vect_1.fromAngle = (rad1, rad2) => {
            if (typeof rad2 === "undefined") {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1), Chalkboard.trig.sin(rad1));
            }
            else {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad2));
            }
        };
        vect_1.fromCartesianToAlternate = (vect, type) => {
            vect = $(vect);
            if (type === "polar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(vect));
            }
            else if (type === "bipolar" && Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init((vect.x + 1) * (vect.x + 1) + vect.y * vect.y, (vect.x - 1) * (vect.x - 1) + vect.y * vect.y);
            }
            else if (type === "cylindrical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Chalkboard.vect.mag(Chalkboard.vect.init(vect.x, vect.y)), Chalkboard.vect.ang(Chalkboard.vect.init(vect.x, vect.y)), vect.z);
            }
            else if (type === "spherical" && Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(Chalkboard.vect.init(vect.x, vect.y)), Chalkboard.vect.ang(vect)[2]);
            }
            else {
                throw new TypeError('Parameter "type" must be "polar", "bipolar", "cylindrical", or "spherical".');
            }
        };
        vect_1.fromField = (vectfield, vect) => {
            const f = vectfield.rule;
            const v = vect = $(vect);
            if (vectfield.type === "vector2d") {
                return Chalkboard.vect.init(f[0](v.x, v.y), f[1](v.x, v.y));
            }
            else if (vectfield.type === "vector3d") {
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z), f[1](v.x, v.y, v.z), f[2](v.x, v.y, v.z));
            }
            else if (vectfield.type === "vector4d") {
                return Chalkboard.vect.init(f[0](v.x, v.y, v.z, v.w), f[1](v.x, v.y, v.z, v.w), f[2](v.x, v.y, v.z, v.w), f[3](v.x, v.y, v.z, v.w));
            }
            throw new TypeError("Chalkboard.vect.fromField: Property 'type' of 'vectfield' must be 'vector2d', 'vector3d', or 'vector4d'.");
        };
        vect_1.fromVector = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x, vect.y, 0);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x, vect.y, vect.z, 0);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x, vect.y);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.init = (x, y, z, w) => {
            let v;
            if (z === undefined && w === undefined) {
                v = { x: x, y: y };
            }
            else if (w === undefined) {
                v = { x: x, y: y, z: z };
            }
            else {
                v = { x: x, y: y, z: z, w: w };
            }
            if (mode === "vector")
                return v;
            if (mode === "array")
                return Chalkboard.vect.toArray(v);
            if (mode === "float32array")
                return new Float32Array(Chalkboard.vect.toArray(v));
            if (mode === "float64array")
                return new Float64Array(Chalkboard.vect.toArray(v));
            if (mode === "matrix")
                return Chalkboard.vect.toMatrix(v);
            if (mode === "string")
                return Chalkboard.vect.toString(v);
            if (mode === "json")
                return JSON.stringify(v);
            return v;
        };
        vect_1.interpolate = (vect, a, b, c, d) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2) && typeof c === "undefined" && typeof d === "undefined") {
                return Chalkboard.vect.init((a * vect.x + b * vect.y) / (a + b), (a * vect.x + b * vect.y) / (a + b));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3) && typeof c === "number" && typeof d === "undefined") {
                return Chalkboard.vect.init((a * vect.x + b * vect.y + c * vect.z) / (a + b + c), (a * vect.x + b * vect.y + c * vect.z) / (a + b + c), (a * vect.x + b * vect.y + c * vect.z) / (a + b + c));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4) && typeof c === "number" && typeof d === "number") {
                return Chalkboard.vect.init((a * vect.x + b * vect.y + c * vect.z + d * vect.w) / (a + b + c + d), (a * vect.x + b * vect.y + c * vect.z + d * vect.w) / (a + b + c + d), (a * vect.x + b * vect.y + c * vect.z + d * vect.w) / (a + b + c + d), (a * vect.x + b * vect.y + c * vect.z + d * vect.w) / (a + b + c + d));
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.isApproxEqual = (vect1, vect2, precision = 0.000001) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionEqual(vect1, vect2)) {
                if (Chalkboard.vect.isDimensionOf(vect1, 2)) {
                    return Chalkboard.numb.isApproxEqual(vect1.x, vect2.x, precision) && Chalkboard.numb.isApproxEqual(vect1.y, vect2.y, precision);
                }
                else if (Chalkboard.vect.isDimensionOf(vect1, 3)) {
                    return Chalkboard.numb.isApproxEqual(vect1.x, vect2.x, precision) && Chalkboard.numb.isApproxEqual(vect1.y, vect2.y, precision) && Chalkboard.numb.isApproxEqual(vect1.z, vect2.z, precision);
                }
                else if (Chalkboard.vect.isDimensionOf(vect1, 4)) {
                    return Chalkboard.numb.isApproxEqual(vect1.x, vect2.x, precision) && Chalkboard.numb.isApproxEqual(vect1.y, vect2.y, precision) && Chalkboard.numb.isApproxEqual(vect1.z, vect2.z, precision) && Chalkboard.numb.isApproxEqual(vect1.w, vect2.w, precision);
                }
                else {
                    throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
                }
            }
            else {
                return false;
            }
        };
        vect_1.isDimensionEqual = (vect1, vect2) => {
            return Chalkboard.vect.dimension(vect1) === Chalkboard.vect.dimension(vect2);
        };
        vect_1.isDimensionOf = (vectORvectfield, dimension) => {
            try {
                const vect = $(vectORvectfield);
                if (dimension === 2) {
                    return Chalkboard.vect.dimension(vect) === 2;
                }
                else if (dimension === 3) {
                    return Chalkboard.vect.dimension(vect) === 3;
                }
                else if (dimension === 4) {
                    return Chalkboard.vect.dimension(vect) === 4;
                }
            }
            catch {
                const vectfield = vectORvectfield;
                if (dimension === 2) {
                    return Chalkboard.vect.dimension(vectfield) === 2;
                }
                else if (dimension === 3) {
                    return Chalkboard.vect.dimension(vectfield) === 3;
                }
                else if (dimension === 4) {
                    return Chalkboard.vect.dimension(vectfield) === 4;
                }
            }
            throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
        };
        vect_1.isEqual = (vect1, vect2) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionEqual(vect1, vect2)) {
                if (Chalkboard.vect.isDimensionOf(vect1, 2)) {
                    return vect1.x === vect2.x && vect1.y === vect2.y;
                }
                else if (Chalkboard.vect.isDimensionOf(vect1, 3)) {
                    return vect1.x === vect2.x && vect1.y === vect2.y && vect1.z === vect2.z;
                }
                else if (Chalkboard.vect.isDimensionOf(vect1, 4)) {
                    return vect1.x === vect2.x && vect1.y === vect2.y && vect1.z === vect2.z && vect1.w === vect2.w;
                }
                else {
                    throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
                }
            }
            else {
                return false;
            }
        };
        vect_1.isNormalized = (vect) => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.vect.magsq(vect), 1);
        };
        vect_1.isOrthogonal = (vect1, vect2) => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.vect.dot(vect1, vect2), 0);
        };
        vect_1.isParallel = (vect1, vect2) => {
            return Chalkboard.numb.isApproxEqual(Chalkboard.vect.dot(vect1, vect2), Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2));
        };
        vect_1.isZero = (vect) => {
            return Chalkboard.vect.isApproxEqual(vect, Chalkboard.vect.zero(Chalkboard.vect.dimension(vect)));
        };
        vect_1.mag = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y + vect.z * vect.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y + vect.z * vect.z + vect.w * vect.w);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.magset = (vect, num) => {
            return Chalkboard.vect.scl(Chalkboard.vect.normalize(vect), num);
        };
        vect_1.magsq = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return vect.x * vect.x + vect.y * vect.y;
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return vect.x * vect.x + vect.y * vect.y + vect.z * vect.z;
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return vect.x * vect.x + vect.y * vect.y + vect.z * vect.z + vect.w * vect.w;
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        let mode = "vector";
        vect_1.modeConfig = (config) => {
            const _config = config.toLowerCase();
            if (["vector", "array", "float32array", "float64array", "matrix", "string", "json"].indexOf(_config) === -1) {
                throw new Error('The mode must be "vector", "array", "float32array", "float64array", "matrix", "string", or "json".');
            }
            mode = _config;
        };
        vect_1.negate = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(-vect.x, -vect.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(-vect.x, -vect.y, -vect.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(-vect.x, -vect.y, -vect.z, -vect.w);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.normalize = (vect) => {
            vect = $(vect);
            const m = Chalkboard.vect.mag(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x / m, vect.y / m);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x / m, vect.y / m, vect.z / m);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x / m, vect.y / m, vect.z / m, vect.w / m);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.oproj = (vect1, vect2) => {
            return Chalkboard.vect.sub(vect1, Chalkboard.vect.proj(vect1, vect2));
        };
        vect_1.print = (vect) => {
            console.log(Chalkboard.vect.toString(vect));
        };
        vect_1.proj = (vect1, vect2) => {
            return Chalkboard.vect.scl(vect2, Chalkboard.vect.dot(vect1, vect2) / Chalkboard.vect.dot(vect2, vect2));
        };
        vect_1.random = (dimension, inf = 0, sup = 1) => {
            if (dimension === 2) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            }
            else if (dimension === 3) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            }
            else if (dimension === 4) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            }
            else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };
        vect_1.reciprocate = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y, 1 / vect.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y, 1 / vect.z, 1 / vect.w);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.reflect = (vect1, vect2) => {
            return Chalkboard.vect.sub(vect1, Chalkboard.vect.scl(vect2, 2 * Chalkboard.vect.dot(vect1, vect2)));
        };
        vect_1.refract = (vect1, vect2, refractiveIndex) => {
            if (refractiveIndex > 0) {
                const perp = Chalkboard.vect.scl(Chalkboard.vect.sub(vect1, Chalkboard.vect.scl(vect2, Chalkboard.vect.dot(vect1, vect2))), refractiveIndex);
                const parr = Chalkboard.vect.scl(vect2, -Chalkboard.real.sqrt(1 - refractiveIndex * refractiveIndex * (1 - Chalkboard.vect.dot(vect1, vect2) * Chalkboard.vect.dot(vect1, vect2))));
                return Chalkboard.vect.add(perp, parr);
            }
            else {
                throw new RangeError('Parameter "refractiveIndex" must be of type "number" greater than 0.');
            }
        };
        vect_1.round = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z), Math.round(vect.w));
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.scalarQuadruple = (vect1, vect2, vect3, vect4) => {
            return Chalkboard.vect.dot(Chalkboard.vect.cross(vect1, vect2), Chalkboard.vect.cross(vect3, vect4));
        };
        vect_1.scalarTriple = (vect1, vect2, vect3) => {
            return Chalkboard.vect.dot(vect1, Chalkboard.vect.cross(vect2, vect3));
        };
        vect_1.scl = (vect, num) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x * num, vect.y * num);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * num, vect.y * num, vect.z * num);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x * num, vect.y * num, vect.z * num, vect.w * num);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.slope = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return vect.y / vect.x;
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return vect.z / Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return vect.w / Chalkboard.real.sqrt(vect.x * vect.x + vect.y * vect.y + vect.z * vect.z);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.sub = (vect1, vect2) => {
            vect1 = $(vect1);
            vect2 = $(vect2);
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.vect.init(vect1.x - vect2.x, vect1.y - vect2.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.vect.init(vect1.x - vect2.x, vect1.y - vect2.y, vect1.z - vect2.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.vect.init(vect1.x - vect2.x, vect1.y - vect2.y, vect1.z - vect2.z, vect1.w - vect2.w);
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.toArray = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return [vect.x, vect.y];
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return [vect.x, vect.y, vect.z];
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return [vect.x, vect.y, vect.z, vect.w];
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.toComplex = (vect) => {
            vect = $(vect);
            return Chalkboard.comp.init(vect.x, vect.y);
        };
        vect_1.toMatrix = (vect, axis = 0) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                if (axis === 0) {
                    return Chalkboard.matr.init([vect.x], [vect.y]);
                }
                else if (axis === 1) {
                    return Chalkboard.matr.init([vect.x, vect.y]);
                }
                else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                if (axis === 0) {
                    return Chalkboard.matr.init([vect.x], [vect.y], [vect.z]);
                }
                else if (axis === 1) {
                    return Chalkboard.matr.init([vect.x, vect.y, vect.z]);
                }
                else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                if (axis === 0) {
                    return Chalkboard.matr.init([vect.x], [vect.y], [vect.z], [vect.w]);
                }
                else if (axis === 1) {
                    return Chalkboard.matr.init([vect.x, vect.y, vect.z, vect.w]);
                }
                else {
                    throw new TypeError('Parameter "axis" must be 0 or 1.');
                }
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.toQuaternion = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.quat.init(vect.x, vect.y, 0, 0);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.quat.init(0, vect.x, vect.y, vect.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.quat.init(vect.x, vect.y, vect.z, vect.w);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.toString = (vect) => {
            vect = $(vect);
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ")";
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z.toString() + ")";
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z.toString() + ", " + vect.w.toString() + ")";
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_1.toTensor = (vect, ...size) => {
            vect = $(vect);
            if (Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(Chalkboard.vect.toMatrix(vect), ...size);
        };
        vect_1.toTypedArray = (vect, type = "float32") => {
            vect = $(vect);
            const arr = Chalkboard.vect.toArray(vect);
            if (type === "int8") {
                return new Int8Array(arr);
            }
            else if (type === "int16") {
                return new Int16Array(arr);
            }
            else if (type === "int32") {
                return new Int32Array(arr);
            }
            else if (type === "float32") {
                return new Float32Array(arr);
            }
            else if (type === "float64") {
                return new Float64Array(arr);
            }
            else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new TypeError('Parameter "type" must be "int8", "int16", "int32", "float32", "float64", or "bigint64".');
        };
        vect_1.vectorQuadruple = (vect1, vect2, vect3, vect4) => {
            return Chalkboard.vect.cross(Chalkboard.vect.cross(vect1, vect2), Chalkboard.vect.cross(vect3, vect4));
        };
        vect_1.vectorTriple = (vect1, vect2, vect3) => {
            return Chalkboard.vect.cross(vect1, Chalkboard.vect.cross(vect2, vect3));
        };
        vect_1.zero = (dimension) => {
            if (dimension === 2) {
                return Chalkboard.vect.init(0, 0);
            }
            else if (dimension === 3) {
                return Chalkboard.vect.init(0, 0, 0);
            }
            else if (dimension === 4) {
                return Chalkboard.vect.init(0, 0, 0, 0);
            }
            else {
                throw new TypeError('Parameter "dimension" must be either 2, 3, or 4.');
            }
        };
    })(vect = Chalkboard.vect || (Chalkboard.vect = {}));
})(Chalkboard || (Chalkboard = {}));
//# sourceMappingURL=Chalkboard.js.map