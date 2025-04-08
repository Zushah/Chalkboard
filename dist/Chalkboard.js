"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Chalkboard;
(function (Chalkboard) {
    Chalkboard.APPLY = function (object, callback) {
        var _a;
        if (object && typeof object.a === "number" && typeof object.b === "number" && typeof object.c === "undefined") {
            var comp_1 = object;
            return Chalkboard.comp.init(callback(comp_1.a), callback(comp_1.b));
        }
        if (object && typeof object.a === "number" && typeof object.b === "number" && typeof object.c === "number" && typeof object.d === "number") {
            var quat_1 = object;
            return Chalkboard.quat.init(callback(quat_1.a), callback(quat_1.b), callback(quat_1.c), callback(quat_1.d));
        }
        if (object && typeof object.x === "number" && typeof object.y === "number") {
            var vect_1 = object;
            if (typeof vect_1.w === "number" && typeof vect_1.z === "number") {
                return Chalkboard.vect.init(callback(vect_1.x), callback(vect_1.y), callback(vect_1.z), callback(vect_1.w));
            }
            else if (typeof vect_1.z === "number") {
                return Chalkboard.vect.init(callback(vect_1.x), callback(vect_1.y), callback(vect_1.z));
            }
            else {
                return Chalkboard.vect.init(callback(vect_1.x), callback(vect_1.y));
            }
        }
        if (Array.isArray(object)) {
            var isMatrix = true;
            for (var i = 0; i < object.length; i++) {
                if (!Array.isArray(object[i]) || (object[i].length > 0 && typeof object[i][0] !== "number")) {
                    isMatrix = false;
                    break;
                }
            }
            if (isMatrix) {
                var matr_1 = object;
                var rows = Chalkboard.matr.rows(matr_1);
                var cols = Chalkboard.matr.cols(matr_1);
                var result = Chalkboard.matr.fill(0, rows, cols);
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        result[i][j] = callback(matr_1[i][j]);
                    }
                }
                return result;
            }
            else {
                var result = [];
                for (var i = 0; i < object.length; i++) {
                    result.push(Chalkboard.APPLY(object[i], callback));
                }
                return result;
            }
        }
        if (typeof object === "number") {
            return callback(object);
        }
        if (object && typeof object.contains === "function" && typeof object.set === "undefined") {
            var set = object;
            if (Array.isArray(set.elements)) {
                var result = [];
                for (var i = 0; i < set.elements.length; i++) {
                    result.push(callback(set.elements[i]));
                }
                return result;
            }
            else {
                throw new TypeError('Chalkboard.APPLY cannot operate on an infinite "ChalkboardSet".');
            }
        }
        if (object && typeof ((_a = object.set) === null || _a === void 0 ? void 0 : _a.contains) === "function") {
            var struc = object;
            if (Array.isArray(struc.set.elements)) {
                var result = [];
                for (var i = 0; i < struc.set.elements.length; i++) {
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
    Chalkboard.E = function (exponent) {
        if (exponent === void 0) { exponent = 1; }
        return Math.pow(Math.pow(10, 1 / Math.log(10)), exponent);
    };
    Chalkboard.LOGO = function (x, y, size, context) {
        if (x === void 0) { x = Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.width / 2; }
        if (y === void 0) { y = Chalkboard.real.parse(Chalkboard.CONTEXT).canvas.height / 2; }
        if (size === void 0) { size = 1; }
        if (context === void 0) { context = Chalkboard.real.parse(Chalkboard.CONTEXT); }
        context.save();
        context.translate(x, y);
        context.scale(size, size);
        context.fillStyle = "rgb(25, 25, 25)";
        context.beginPath();
        context.ellipse(0, 0, 50, 50, 0, 0, Chalkboard.PI(2));
        context.fill();
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
    };
    Chalkboard.PARSEPREFIX = "";
    if (typeof window !== "undefined")
        Chalkboard.PARSEPREFIX += "const ctx = document.querySelector('canvas').getContext('2d');";
    Chalkboard.PI = function (coefficient) {
        if (coefficient === void 0) { coefficient = 1; }
        return coefficient * 4 * (4 * Math.atan(1 / 5) - Math.atan(1 / 239));
    };
    Chalkboard.README = function () {
        console.log("The Chalkboard Library\nVersion " +
            Chalkboard.VERSION +
            " " +
            Chalkboard.VERSIONALIAS +
            " released 04/07/2025\nAuthored by Zushah ===> https://www.github.com/Zushah\nAvailable under the MIT License ===> https://www.opensource.org/license/mit/\n\nThe Chalkboard library is a JavaScript namespace that provides a plethora of both practical and abstract mathematical functionalities for its user.\n\nRepository ===> https://www.github.com/Zushah/Chalkboard\nWebsite ===> https://zushah.github.io/Chalkboard");
    };
    Chalkboard.VERSION = "2.2.0";
    Chalkboard.VERSIONALIAS = "Galois";
})(Chalkboard || (Chalkboard = {}));
if (typeof window === "undefined") {
    module.exports = Chalkboard;
}
else {
    window.Chalkboard = Chalkboard;
}
var Chalkboard;
(function (Chalkboard) {
    var abal;
    (function (abal) {
        var $ = JSON.stringify;
        abal.A = function (n) {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error('The parameter "n" must be a positive integer.');
            }
            var Sn = Chalkboard.abal.S(n);
            var isEvenPermutation = function (perm) {
                var inversions = 0;
                for (var i = 0; i < perm.length; i++) {
                    for (var j = i + 1; j < perm.length; j++) {
                        if (perm[i] > perm[j])
                            inversions++;
                    }
                }
                return inversions % 2 === 0;
            };
            var elements = (Sn.elements || []).filter(isEvenPermutation);
            return {
                contains: function (element) { return elements.some(function (perm) { return $(perm) === $(element); }); },
                elements: elements,
                id: "A".concat(n)
            };
        };
        abal.automorphism = function (struc, mapping) {
            var morphism = Chalkboard.abal.homomorphism(struc, struc, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error("The mapping is not a homomorphism, so it cannot be an automorphism.");
            }
            if (!Chalkboard.abal.isBijective(morphism)) {
                throw new Error("The mapping is not bijective, so it cannot be an automorphism.");
            }
            return morphism;
        };
        abal.C = function (n) {
            if (n === undefined) {
                return {
                    contains: function (element) {
                        return typeof element.a === "number" && typeof element.b === "number";
                    },
                    id: "C"
                };
            }
            else {
                if (!Number.isInteger(n) || n <= 0) {
                    throw new Error('The parameter "n" must be a positive integer.');
                }
                var elements_1 = [];
                for (var k = 0; k < n; k++) {
                    var t = (2 * Math.PI * k) / n;
                    elements_1.push(Chalkboard.comp.init(Chalkboard.numb.roundTo(Math.cos(t), 0.0001), Chalkboard.numb.roundTo(Math.sin(t), 0.0001)));
                }
                return {
                    contains: function (element) { return elements_1.some(function (e) {
                        return e.a === element.a && e.b === element.b;
                    }); },
                    elements: elements_1,
                    id: "C".concat(n)
                };
            }
        };
        abal.cardinality = function (struc) {
            var id = "set" in struc && struc.set ? struc.set.id : ("id" in struc ? struc.id : undefined);
            if ((id === null || id === void 0 ? void 0 : id.startsWith("M(")) || (id === null || id === void 0 ? void 0 : id.startsWith("GL")) || ["Z", "Q", "R", "C", "P"].includes(id || "")) {
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
        abal.Cartesian = function (set1, set2) {
            var result = [];
            for (var _i = 0, _a = set1.elements || []; _i < _a.length; _i++) {
                var a = _a[_i];
                for (var _b = 0, _c = set2.elements || []; _b < _c.length; _b++) {
                    var b = _c[_b];
                    result.push([a, b]);
                }
            }
            return Chalkboard.abal.set(result);
        };
        abal.Cayley = function (struc, type) {
            if (type === void 0) { type = "add"; }
            if (!struc.set.elements) {
                throw new Error("The structure must have a finite set of elements.");
            }
            var elements = struc.set.elements;
            if ("operation" in struc && struc.operation) {
                if (type === "add") {
                    var result = Chalkboard.matr.fill(0, elements.length);
                    for (var i = 0; i < elements.length; i++) {
                        for (var j = 0; j < elements.length; j++) {
                            result[i][j] = struc.operation(elements[i], elements[j]);
                        }
                    }
                    return result;
                }
                throw new Error('The "type" parameter for groups should remain as the default "add" since there is no distinction between their additive and multiplicative Cayley tables.');
            }
            if ("add" in struc && struc.add && "mul" in struc && struc.mul) {
                if (type === "add") {
                    var result_1 = Chalkboard.matr.fill(0, elements.length);
                    for (var i = 0; i < elements.length; i++) {
                        for (var j = 0; j < elements.length; j++) {
                            result_1[i][j] = struc.add(elements[i], elements[j]);
                        }
                    }
                    return result_1;
                }
                var result = Chalkboard.matr.fill(0, elements.length);
                for (var i = 0; i < elements.length; i++) {
                    for (var j = 0; j < elements.length; j++) {
                        result[i][j] = struc.mul(elements[i], elements[j]);
                    }
                }
                return result;
            }
            throw new Error("Invalid algebraic structure for Cayley table.");
        };
        abal.center = function (group) {
            var set = group.set, operation = group.operation;
            if (!set.elements || !operation) {
                return Chalkboard.abal.set([]);
            }
            var result = set.elements.filter(function (z) { var _a; return ((_a = set.elements) !== null && _a !== void 0 ? _a : []).every(function (g) { return operation(z, g) === operation(g, z); }); });
            return Chalkboard.abal.set(result);
        };
        abal.complement = function (set, superset) {
            return Chalkboard.abal.set((superset.elements || []).filter(function (element) { return !set.contains(element); }));
        };
        abal.compose = function (morph1, morph2) {
            if (!Chalkboard.abal.isHomomorphism(morph1) || !Chalkboard.abal.isHomomorphism(morph2)) {
                throw new Error("Both morphisms of the morphism composition must be homomorphisms.");
            }
            if (!Chalkboard.abal.isEqual(morph1.struc2, morph2.struc1)) {
                throw new Error("The codomain of the first morphism and the domain of the second morphism must be equal to calculate the composition morphism.");
            }
            return Chalkboard.abal.homomorphism(morph1.struc1, morph2.struc2, function (x) { return morph2.mapping(morph1.mapping(x)); });
        };
        abal.copy = function (struc) {
            var isSet = function (obj) { return obj && typeof obj.contains === "function" && (!obj.set && !obj.struc1 && !obj.base); };
            var isStructure = function (obj) { return obj && obj.set && (obj.operation || obj.add || obj.mul); };
            var isExtension = function (obj) { return obj && obj.base && obj.extension && typeof obj.degree === "number"; };
            var isMorphism = function (obj) { return obj && obj.struc1 && obj.struc2 && typeof obj.mapping === "function"; };
            if (isSet(struc)) {
                var copiedSet = __assign(__assign({ contains: struc.contains }, (struc.id && { id: struc.id })), (struc.elements && { elements: __spreadArray([], struc.elements, true) }));
                return copiedSet;
            }
            if (isStructure(struc)) {
                var copiedSet = Chalkboard.abal.copy(struc.set);
                var copiedStructure = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({ set: copiedSet }, (struc.operation && { operation: struc.operation })), (struc.identity !== undefined && { identity: struc.identity })), (struc.inverter && { inverter: struc.inverter })), (struc.add && { add: struc.add })), (struc.mul && { mul: struc.mul })), (struc.addIdentity !== undefined && { addIdentity: struc.addIdentity })), (struc.mulIdentity !== undefined && { mulIdentity: struc.mulIdentity })), (struc.addInverter && { addInverter: struc.addInverter })), (struc.mulInverter && { mulInverter: struc.mulInverter }));
                return copiedStructure;
            }
            if (isExtension(struc)) {
                var copiedBase = Chalkboard.abal.copy(struc.base);
                var copiedExtension = Chalkboard.abal.copy(struc.extension);
                var copiedExtensionStructure = {
                    base: copiedBase,
                    extension: copiedExtension,
                    degree: struc.degree,
                    basis: struc.basis ? __spreadArray([], struc.basis, true) : [],
                    isFinite: struc.isFinite,
                    isSimple: struc.isSimple,
                    isAlgebraic: struc.isAlgebraic
                };
                return copiedExtensionStructure;
            }
            if (isMorphism(struc)) {
                var copiedStruc1 = Chalkboard.abal.copy(struc.struc1);
                var copiedStruc2 = Chalkboard.abal.copy(struc.struc2);
                var copiedMorphism = {
                    struc1: copiedStruc1,
                    struc2: copiedStruc2,
                    mapping: struc.mapping
                };
                return copiedMorphism;
            }
            throw new Error('The "struc" must be a set, structure, structure extension, or morphism.');
        };
        abal.coset = function (struc, substruc) {
            if ("operation" in struc && !Chalkboard.abal.isSubgroup(struc, substruc.set)) {
                throw new Error('The "substruc" must be a subgroup of the "struc".');
            }
            else if ("add" in struc && !Chalkboard.abal.isIdeal(struc, substruc.set)) {
                throw new Error('The "substruc" must be an ideal of the "struc".');
            }
            var elements = Chalkboard.abal.toArray(struc.set);
            var subElements = Chalkboard.abal.toArray(substruc.set);
            var cosets = new Map();
            elements.forEach(function (g) {
                var cosetElements = subElements.map(function (h) {
                    return "operation" in struc ?
                        struc.operation(g, h) :
                        struc.add(g, h);
                });
                var sortedElements = __spreadArray([], cosetElements, true).sort(function (a, b) {
                    if (typeof a === "number" && typeof b === "number") {
                        return a - b;
                    }
                    return $(a).localeCompare($(b));
                });
                var key = $(sortedElements);
                if (!cosets.has(key)) {
                    var coset_1 = Chalkboard.abal.set(cosetElements);
                    cosets.set(key, coset_1);
                }
            });
            return Chalkboard.abal.set(Array.from(cosets.values()));
        };
        abal.cyclicSubgroup = function (group, element) {
            if (group.set.id && ["Z", "Q", "R", "C"].includes(group.set.id)) {
                throw new Error('The "group" must be finite.');
            }
            var result = [];
            var current = element;
            if (!group.operation) {
                return Chalkboard.abal.set([]);
            }
            do {
                result.push(current);
                current = group.operation(current, element);
            } while (!result.includes(current));
            return Chalkboard.abal.set(result);
        };
        abal.D = function (n) {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error('The parameter "n" must be a positive integer.');
            }
            var elements = [];
            for (var i = 0; i < n; i++) {
                elements.push("r".concat(i));
            }
            for (var i = 0; i < n; i++) {
                elements.push("s".concat(i));
            }
            return {
                contains: function (element) { return elements.includes(element); },
                elements: elements,
                id: "D".concat(n)
            };
        };
        abal.difference = function (set1, set2) {
            var result = (set1.elements || []).filter(function (element) { return !set2.contains(element); });
            return Chalkboard.abal.set(result);
        };
        abal.direct = function (struc1, struc2, type) {
            if (type === void 0) { type = "product"; }
            var set = Chalkboard.abal.Cartesian(struc1.set, struc2.set);
            var add = function (a, b) { return [
                struc1.add(a[0], b[0]),
                struc2.add(a[1], b[1])
            ]; };
            var mul = function (a, b) { return [
                struc1.mul(a[0], b[0]),
                struc2.mul(a[1], b[1])
            ]; };
            var addIdentity = [
                struc1.addIdentity,
                struc2.addIdentity
            ];
            var mulIdentity = [
                struc1.mulIdentity,
                struc2.mulIdentity
            ];
            var addInverter = function (a) { return [
                struc1.addInverter(a[0]),
                struc2.addInverter(a[1])
            ]; };
            var mulInverter = function (a) { return [
                struc1.mulInverter(a[0]),
                struc2.mulInverter(a[1])
            ]; };
            if ("operation" in struc1 && "operation" in struc2) {
                var operation = function (a, b) { return [
                    struc1.operation(a[0], b[0]),
                    struc2.operation(a[1], b[1])
                ]; };
                var identity = [struc1.identity, struc2.identity];
                var inverter = function (a) { return [
                    struc1.inverter(a[0]),
                    struc2.inverter(a[1])
                ]; };
                if (type === "sum") {
                    if (!struc1.set.elements || !struc2.set.elements) {
                        throw new Error("Direct sum is only defined for finite groups.");
                    }
                }
                return Chalkboard.abal.group(set, operation, identity, inverter);
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
        abal.endomorphism = function (struc, mapping) {
            var morphism = Chalkboard.abal.homomorphism(struc, struc, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error("The mapping is not a homomorphism, so it cannot be an endomorphism.");
            }
            return morphism;
        };
        abal.field = function (set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter) {
            var _a, _b;
            var presets = {
                addition: {
                    Z: function (a, b) { return a + b; },
                    Q: function (a, b) { return a + b; },
                    R: function (a, b) { return a + b; },
                    C: Chalkboard.comp.add,
                    M: Chalkboard.matr.add
                },
                multiplication: {
                    Z: function (a, b) { return a * b; },
                    Q: function (a, b) { return a * b; },
                    R: function (a, b) { return a * b; },
                    C: Chalkboard.comp.mul,
                    M: Chalkboard.matr.mul
                }
            };
            var _set = typeof set === "string" && typeof Chalkboard.abal[set] === "function" ? Chalkboard.abal[set]() : set;
            var _add = typeof add === "string" ? presets[add]["addition"] || presets[add][(_a = _set.id) !== null && _a !== void 0 ? _a : ""] : add;
            var _mul = typeof mul === "string" ? presets[mul]["multiplication"] || presets[mul][(_b = _set.id) !== null && _b !== void 0 ? _b : ""] : mul;
            if (!_add || !_mul) {
                throw new Error("Preset operations \"".concat(add, "\" or \"").concat(mul, "\" are not defined for set \"").concat(_set.id, "\"."));
            }
            var autoconfig = function () {
                if (!_set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", "addInverter", and "mulInverter" explicitly.');
                }
                if (_set.id === "Q" || _set.id === "R") {
                    return {
                        addIdentity: 0,
                        mulIdentity: 1,
                        addInverter: function (a) { return -a; },
                        mulInverter: function (a) { return (1 / a); }
                    };
                }
                else if (_set.id === "C") {
                    return {
                        addIdentity: Chalkboard.comp.init(0, 0),
                        mulIdentity: Chalkboard.comp.init(1, 0),
                        addInverter: function (a) { return Chalkboard.comp.negate(a); },
                        mulInverter: function (a) { return Chalkboard.comp.invert(a); }
                    };
                }
                throw new Error('Automatic configuration of the "addIdentity", "mulIdentity", "addInverter", and "mulInverter" properties is not available for the inputted "set".');
            };
            var configured = typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined" ? autoconfig() : { addIdentity: addIdentity, mulIdentity: mulIdentity, addInverter: addInverter, mulInverter: mulInverter };
            var field = { set: _set, add: _add, mul: _mul, addIdentity: configured.addIdentity, mulIdentity: configured.mulIdentity, addInverter: configured.addInverter, mulInverter: configured.mulInverter };
            if (!Chalkboard.abal.isField(field)) {
                throw new Error('The inputted "set", "add", "mul", "addIdentity", "mulIdentity", "addInverter", and "mulInverter" do not form a field.');
            }
            return field;
        };
        abal.fieldExtension = function (base, extension, degree, basis, isFinite, isSimple, isAlgebraic) {
            if (!Chalkboard.abal.isSubfield(base, extension.set)) {
                throw new Error('The "base" must be a subfield of the "extension".');
            }
            var autoconfig = function () {
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
            var configured = typeof degree === "undefined" || typeof basis === "undefined" || typeof isFinite === "undefined" || typeof isSimple === "undefined" || typeof isAlgebraic === "undefined" ? autoconfig() : { degree: degree, basis: basis, isFinite: isFinite, isSimple: isSimple, isAlgebraic: isAlgebraic };
            return { base: base, extension: extension, degree: configured.degree, basis: configured.basis, isFinite: configured.isFinite, isSimple: configured.isSimple, isAlgebraic: configured.isAlgebraic };
        };
        abal.GL = function (n) { return ({
            contains: function (element) {
                return Array.isArray(element) && Chalkboard.matr.isSizeOf(element, n) && Chalkboard.matr.isInvertible(element);
            },
            id: "GL".concat(n)
        }); };
        abal.group = function (set, operation, identity, inverter) {
            var presets = {
                addition: {
                    Z: function (a, b) { return a + b; },
                    Q: function (a, b) { return a + b; },
                    R: function (a, b) { return a + b; },
                    C: Chalkboard.comp.add,
                    M: Chalkboard.matr.add
                },
                multiplication: {
                    Z: function (a, b) { return a * b; },
                    Q: function (a, b) { return a * b; },
                    R: function (a, b) { return a * b; },
                    C: Chalkboard.comp.mul,
                    M: Chalkboard.matr.mul
                }
            };
            var _set = typeof set === "string" && typeof Chalkboard.abal[set] === "function" ? Chalkboard.abal[set]() : set;
            var _operation = typeof operation === "string" && _set.id ? presets[operation][_set.id] : operation;
            if (!_operation) {
                throw new Error("Preset operation \"".concat(operation, "\" is not defined for set \"").concat(_set.id, "\"."));
            }
            if (!_operation) {
                throw new Error("Preset operation \"".concat(operation, "\" is not defined for set \"").concat(_set.id, "\"."));
            }
            var autoconfig = function () {
                if (!_set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "identity" and "inverter" explicitly.');
                }
                if (_set.id === "Z" || _set.id === "Q" || _set.id === "R") {
                    return {
                        identity: 0,
                        inverter: function (a) { return -a; }
                    };
                }
                else if (_set.id === "C") {
                    return {
                        identity: Chalkboard.comp.init(0, 0),
                        inverter: function (a) { return Chalkboard.comp.negate(a); }
                    };
                }
                else if (_set.id.startsWith("Z") && _set.id.length > 1) {
                    var n_1 = parseInt(_set.id.slice(1), 10);
                    return {
                        identity: 0,
                        inverter: function (a) { return ((n_1 - a % n_1) % n_1); }
                    };
                }
                else if (_set.id.startsWith("C") && _set.id.length > 1) {
                    return {
                        identity: Chalkboard.comp.init(1, 0),
                        inverter: function (a) { return Chalkboard.comp.conjugate(a); }
                    };
                }
                else if (_set.id.startsWith("M(")) {
                    var rows = _set.rows;
                    var cols = _set.cols;
                    return {
                        identity: Chalkboard.matr.fill(0, rows, cols),
                        inverter: function (a) { return Chalkboard.matr.negate(a); }
                    };
                }
                else if (_set.id.startsWith("GL")) {
                    var n = parseInt(_set.id.slice(2), 10);
                    return {
                        identity: Chalkboard.matr.identity(n),
                        inverter: function (a) { return Chalkboard.matr.invert(a); }
                    };
                }
                else if (_set.id.match(/^[SA]\d+$/)) {
                    var n = parseInt(_set.id.slice(1), 10);
                    return {
                        identity: Array.from({ length: n }, function (_, i) { return i; }),
                        inverter: function (a) {
                            var perm = a;
                            var inverse = new Array(perm.length);
                            for (var i = 0; i < perm.length; i++)
                                inverse[perm[i]] = i;
                            return inverse;
                        }
                    };
                }
                throw new Error('Automatic configuration of the "identity" and "inverter" properties is not available for the inputted "set".');
            };
            var configured = typeof identity === "undefined" || typeof inverter === "undefined" ? autoconfig() : { identity: identity, inverter: inverter };
            var group = { set: _set, operation: _operation, identity: configured.identity, inverter: configured.inverter };
            if (!Chalkboard.abal.isGroup(group)) {
                throw new Error('The inputted "set", "operation", "identity", and "inverter" do not form a group.');
            }
            return group;
        };
        abal.homomorphism = function (struc1, struc2, mapping) {
            var morphism = { struc1: struc1, struc2: struc2, mapping: mapping };
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error('The inputted "struc1", "struc2", and "mapping" do not form a homomorphism.');
            }
            return morphism;
        };
        abal.idmorphism = function (struc) {
            return Chalkboard.abal.automorphism(struc, function (x) { return x; });
        };
        abal.image = function (morph, subset) {
            var struc1 = morph.struc1, mapping = morph.mapping;
            if (!struc1.set.elements) {
                throw new Error('The domain of the "morph" must have a finite set of elements to calculate the image.');
            }
            var _subset = subset || struc1.set;
            if (!_subset.elements) {
                throw new Error('The domain of the "morph" or the subset of it must have a finite set of elements to calculate the image.');
            }
            var mapped = _subset.elements.map(mapping);
            var result = Array.from(new Set(mapped.map(function (e) { return $(e); }))).map(function (e) { return JSON.parse(e); });
            return Chalkboard.abal.set(result);
        };
        abal.intersection = function (set1, set2) {
            var result = (set1.elements || []).filter(function (element) { return set2.contains(element); });
            return Chalkboard.abal.set(result);
        };
        abal.invmorphism = function (morph) {
            if (morph.struc1.set.id && ["Z", "Q", "R", "C"].includes(morph.struc1.set.id)) {
                throw new Error('Inverse morphisms cannot be defined for morphisms with infinite domains.');
            }
            if (!Chalkboard.abal.isIsomorphism(morph)) {
                throw new Error("The morphism is not an isomorphism, so it does not have an inverse.");
            }
            return Chalkboard.abal.homomorphism(morph.struc2, morph.struc1, function (y) {
                var domain = morph.struc1.set.elements || [];
                for (var _i = 0, domain_1 = domain; _i < domain_1.length; _i++) {
                    var x = domain_1[_i];
                    if ($(morph.mapping(x)) === $(y)) {
                        return x;
                    }
                }
                throw new Error("The inverse morphism failed to be defined because no element in the domain maps to the element \"".concat($(y), "\" in the codomain."));
            });
        };
        abal.isAutomorphism = function (morph) {
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isEndomorphism(morph) && Chalkboard.abal.isIsomorphism(morph);
        };
        abal.isBijective = function (morph) {
            if (["Z", "Q", "R", "C"].includes(morph.struc1.set.id || "") || ["Z", "Q", "R", "C"].includes(morph.struc2.set.id || "")) {
                return morph.struc1.set.id === morph.struc2.set.id;
            }
            return Chalkboard.abal.isInjective(morph) && Chalkboard.abal.isSurjective(morph);
        };
        abal.isClosed = function (set, operation) {
            var _a;
            if (typeof set !== "string" && set.id && ["Z", "Q", "R", "C"].includes(set.id)) {
                if (operation === "addition" || operation === "multiplication")
                    return true;
                return false;
            }
            var presets = {
                addition: {
                    Z: function (a, b) { return a + b; },
                    Q: function (a, b) { return a + b; },
                    R: function (a, b) { return a + b; },
                    C: Chalkboard.comp.add,
                    M: Chalkboard.matr.add,
                },
                multiplication: {
                    Z: function (a, b) { return a * b; },
                    Q: function (a, b) { return a * b; },
                    R: function (a, b) { return a * b; },
                    C: Chalkboard.comp.mul,
                    M: Chalkboard.matr.mul,
                }
            };
            var _set = typeof set === "string" && (set in Chalkboard.abal) && typeof Chalkboard.abal[set] === "function"
                ? (Object.prototype.hasOwnProperty.call(Chalkboard.abal, set) && typeof Chalkboard.abal[set] === "function" ? Chalkboard.abal[set]() : undefined)
                : set;
            if (!_set || typeof _set !== "object") {
                throw new Error('The "set" must have a valid "id" property or be resolvable from a string.');
            }
            var _operation = typeof operation === "string" && typeof _set !== "string" && _set.id && operation in presets && _set.id in presets[operation]
                ? presets[operation][_set.id]
                : operation;
            if (!_operation) {
                throw new Error("Preset operation \"".concat(operation, "\" is not defined for set \"").concat(_set.id, "\"."));
            }
            if (_set.id === "Z" || _set.id === "Q" || _set.id === "R") {
                if (_operation === presets.addition[_set.id] ||
                    _operation === presets.multiplication[_set.id]) {
                    return true;
                }
                return false;
            }
            if (_set.id === "C") {
                if (_operation === Chalkboard.comp.add ||
                    _operation === Chalkboard.comp.mul) {
                    return true;
                }
                return false;
            }
            if ((_a = _set.id) === null || _a === void 0 ? void 0 : _a.startsWith("M(")) {
                var rows = _set.rows;
                var cols = _set.cols;
                if (_operation === Chalkboard.matr.add) {
                    return true;
                }
                if (_operation === Chalkboard.matr.mul) {
                    return rows === cols;
                }
                return false;
            }
            if (typeof _set === "object" && "elements" in _set && _set.elements) {
                for (var _i = 0, _b = _set.elements; _i < _b.length; _i++) {
                    var a = _b[_i];
                    for (var _c = 0, _d = _set.elements; _c < _d.length; _c++) {
                        var b = _d[_c];
                        if (typeof _operation === "function") {
                            var result = _operation(a, b);
                            if (_set.contains(result)) {
                                continue;
                            }
                            return false;
                        }
                        return false;
                    }
                }
            }
            return true;
        };
        abal.isCommutative = function (struc) {
            var set = struc.set;
            if (set.id && ["Z", "Q", "R", "C"].includes(set.id)) {
                return true;
            }
            if (!set.elements) {
                return false;
            }
            if ("operation" in struc && struc.operation) {
                var operation = struc.operation;
                for (var _i = 0, _a = set.elements; _i < _a.length; _i++) {
                    var a = _a[_i];
                    for (var _b = 0, _c = set.elements; _b < _c.length; _b++) {
                        var b = _c[_b];
                        if ($(operation(a, b)) !== $(operation(b, a))) {
                            return false;
                        }
                    }
                }
                return true;
            }
            if ("add" in struc && "mul" in struc && struc.add && struc.mul) {
                var add = struc.add, mul = struc.mul;
                for (var _d = 0, _e = set.elements; _d < _e.length; _d++) {
                    var a = _e[_d];
                    for (var _f = 0, _g = set.elements; _f < _g.length; _f++) {
                        var b = _g[_f];
                        if ($(add(a, b)) !== $(add(b, a))) {
                            return false;
                        }
                    }
                }
                if ("mulIdentity" in struc) {
                    for (var _h = 0, _j = set.elements; _h < _j.length; _h++) {
                        var a = _j[_h];
                        for (var _k = 0, _l = set.elements; _k < _l.length; _k++) {
                            var b = _l[_k];
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
        abal.isCyclicSubgroup = function (group, subgroup) {
            if (!Chalkboard.abal.isSubgroup(group, subgroup) || !group.operation) {
                return false;
            }
            var operation = group.operation;
            for (var _i = 0, _a = subgroup.elements || []; _i < _a.length; _i++) {
                var generator = _a[_i];
                var generatedElements = [];
                var current = generator;
                do {
                    generatedElements.push(current);
                    current = operation(current, generator);
                } while (!generatedElements.includes(current));
                var generatedSet = Chalkboard.abal.set(generatedElements);
                if (Chalkboard.abal.isSubset(subgroup, generatedSet)) {
                    return true;
                }
            }
            return false;
        };
        abal.isEmpty = function (struc) {
            var id = "set" in struc && struc.set ? struc.set.id : ("id" in struc ? struc.id : undefined);
            if (id === "Z" || id === "Q" || id === "R" || id === "C" || (id === null || id === void 0 ? void 0 : id.startsWith("M("))) {
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
        abal.isEndomorphism = function (morph) {
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isEqual(morph.struc1, morph.struc2);
        };
        abal.isEqual = function (struc1, struc2) {
            if (struc1.constructor !== struc2.constructor) {
                return false;
            }
            if ("elements" in struc1 && "elements" in struc2) {
                if ("id" in struc1 && "id" in struc2 && struc1.id === struc2.id) {
                    return true;
                }
                var set1 = struc1.elements || [];
                var set2 = struc2.elements || [];
                if (set1.length !== set2.length) {
                    return false;
                }
                return set1.every(function (x) { return struc2.contains(x); }) && set2.every(function (x) { return struc1.contains(x); });
            }
            if ("operation" in struc1 && "operation" in struc2) {
                var group1 = struc1;
                var group2 = struc2;
                return (Chalkboard.abal.isEqual(group1.set, group2.set) &&
                    group1.identity === group2.identity &&
                    (group1.operation === group2.operation ||
                        group1.operation.toString() === group2.operation.toString()) &&
                    (group1.inverter === group2.inverter ||
                        group1.inverter.toString() === group2.inverter.toString()));
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2) {
                var ring1 = struc1;
                var ring2 = struc2;
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
                var field1 = struc1;
                var field2 = struc2;
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
                var morph1 = struc1;
                var morph2 = struc2;
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
        abal.isExact = function (morph1, morph2) {
            return Chalkboard.abal.isEqual(Chalkboard.abal.image(morph1), Chalkboard.abal.kernel(morph2));
        };
        abal.isField = function (field) {
            var set = field.set, add = field.add, mul = field.mul, addIdentity = field.addIdentity, mulIdentity = field.mulIdentity, addInverter = field.addInverter, mulInverter = field.mulInverter;
            if (set.id === "Q" || set.id === "R" || set.id === "C") {
                return true;
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined") {
                return false;
            }
            var additiveGroup = { set: set, operation: add, identity: addIdentity, inverter: addInverter };
            if (!Chalkboard.abal.isGroup(additiveGroup) || !Chalkboard.abal.isCommutative(additiveGroup)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, mul)) {
                return false;
            }
            for (var _i = 0, _a = set.elements || []; _i < _a.length; _i++) {
                var a = _a[_i];
                for (var _b = 0, _c = set.elements || []; _b < _c.length; _b++) {
                    var b = _c[_b];
                    for (var _d = 0, _e = set.elements || []; _d < _e.length; _d++) {
                        var c = _e[_d];
                        if ($(mul(mul(a, b), c)) !== $(mul(a, mul(b, c)))) {
                            return false;
                        }
                    }
                }
            }
            for (var _f = 0, _g = set.elements || []; _f < _g.length; _f++) {
                var a = _g[_f];
                if (a !== addIdentity && (!set.contains(mulInverter(a)) || $(mul(a, mulInverter(a))) !== $(mulIdentity))) {
                    return false;
                }
            }
            if (!Chalkboard.abal.isCommutative(field)) {
                return false;
            }
            for (var _h = 0, _j = field.set.elements || []; _h < _j.length; _h++) {
                var a = _j[_h];
                for (var _k = 0, _l = field.set.elements || []; _k < _l.length; _k++) {
                    var b = _l[_k];
                    for (var _m = 0, _o = field.set.elements || []; _m < _o.length; _m++) {
                        var c = _o[_m];
                        if ($(field.mul(a, field.add(b, c))) !== $(field.add(field.mul(a, b), field.mul(a, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        abal.isGroup = function (group) {
            var set = group.set, operation = group.operation, identity = group.identity, inverter = group.inverter;
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
            for (var _i = 0, _a = set.elements; _i < _a.length; _i++) {
                var a = _a[_i];
                if ($(operation(a, identity)) !== $(a) || $(operation(identity, a)) !== $(a)) {
                    return false;
                }
            }
            for (var _b = 0, _c = set.elements; _b < _c.length; _b++) {
                var a = _c[_b];
                if (!set.contains(inverter(a)) || $(operation(a, inverter(a))) !== $(identity)) {
                    return false;
                }
            }
            for (var _d = 0, _e = set.elements; _d < _e.length; _d++) {
                var a = _e[_d];
                for (var _f = 0, _g = set.elements; _f < _g.length; _f++) {
                    var b = _g[_f];
                    for (var _h = 0, _j = set.elements; _h < _j.length; _h++) {
                        var c = _j[_h];
                        if ($(operation(operation(a, b), c)) !== $(operation(a, operation(b, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        abal.isHomomorphism = function (morph) {
            var struc1 = morph.struc1, struc2 = morph.struc2, mapping = morph.mapping;
            if ("operation" in struc1 && "operation" in struc2 && struc1.operation && struc2.operation) {
                var op1 = struc1.operation;
                var op2 = struc2.operation;
                for (var _i = 0, _a = struc1.set.elements || []; _i < _a.length; _i++) {
                    var a = _a[_i];
                    for (var _b = 0, _c = struc1.set.elements || []; _b < _c.length; _b++) {
                        var b = _c[_b];
                        if ($(op2(mapping(a), mapping(b))) !== $(mapping(op1(a, b)))) {
                            return false;
                        }
                    }
                }
                return true;
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2 && struc1.add && struc2.add && struc1.mul && struc2.mul) {
                var add1 = struc1.add, mul1 = struc1.mul;
                var add2 = struc2.add, mul2 = struc2.mul;
                for (var _d = 0, _e = struc1.set.elements || []; _d < _e.length; _d++) {
                    var a = _e[_d];
                    for (var _f = 0, _g = struc1.set.elements || []; _f < _g.length; _f++) {
                        var b = _g[_f];
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
        abal.isIdeal = function (ring, subset) {
            var add = ring.add, mul = ring.mul, addIdentity = ring.addIdentity, addInverter = ring.addInverter;
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof addInverter === "undefined") {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, add)) {
                return false;
            }
            if (!subset.contains(addIdentity)) {
                return false;
            }
            for (var _i = 0, _a = subset.elements || []; _i < _a.length; _i++) {
                var a = _a[_i];
                if (!subset.contains(addInverter(a))) {
                    return false;
                }
            }
            for (var _b = 0, _c = ring.set.elements || []; _b < _c.length; _b++) {
                var r = _c[_b];
                for (var _d = 0, _e = subset.elements || []; _d < _e.length; _d++) {
                    var a = _e[_d];
                    if (!subset.contains(mul(r, a)) || !subset.contains(mul(a, r))) {
                        return false;
                    }
                }
            }
            return true;
        };
        abal.isIdentity = function (struc, element, type) {
            var _a, _b;
            if (type === void 0) { type = "add"; }
            if (type === "add" && struc.add && struc.addIdentity) {
                return ("add" in struc &&
                    struc.add(element, struc.addIdentity) === element &&
                    struc.add(struc.addIdentity, element) === element);
            }
            else if (type === "mul" && struc.mul && struc.mulIdentity) {
                return ("mul" in struc && "mulIdentity" in struc &&
                    ((_a = struc.mul) === null || _a === void 0 ? void 0 : _a.call(struc, element, struc.mulIdentity)) === element &&
                    ((_b = struc.mul) === null || _b === void 0 ? void 0 : _b.call(struc, struc.mulIdentity, element)) === element);
            }
            return false;
        };
        abal.isInjective = function (morph) {
            if (["Z", "Q", "R", "C"].includes(morph.struc1.set.id || "") || ["Z", "Q", "R", "C"].includes(morph.struc2.set.id || "")) {
                return morph.struc1.set.id === morph.struc2.set.id;
            }
            var struc1 = morph.struc1, mapping = morph.mapping;
            var domain = struc1.set.elements || [];
            var mapped = domain.map(mapping);
            return new Set(mapped.map(function (e) { return $(e); })).size === domain.length;
        };
        abal.isInverse = function (struc, element1, element2, type) {
            var _a, _b, _c, _d;
            if (type === void 0) { type = "add"; }
            if (type === "add") {
                return ("add" in struc &&
                    ((_a = struc.add) === null || _a === void 0 ? void 0 : _a.call(struc, element1, element2)) === struc.addIdentity &&
                    ((_b = struc.add) === null || _b === void 0 ? void 0 : _b.call(struc, element2, element1)) === struc.addIdentity);
            }
            else if (type === "mul" && "mul" in struc && "mulIdentity" in struc) {
                return (((_c = struc.mul) === null || _c === void 0 ? void 0 : _c.call(struc, element1, element2)) === struc.mulIdentity &&
                    ((_d = struc.mul) === null || _d === void 0 ? void 0 : _d.call(struc, element2, element1)) === struc.mulIdentity);
            }
            return false;
        };
        abal.isIsomorphism = function (morph) {
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isBijective(morph);
        };
        abal.isNormalSubgroup = function (group, subgroup) {
            var set = group.set, operation = group.operation, inverter = group.inverter;
            if (!operation || !inverter) {
                return false;
            }
            if (!Chalkboard.abal.isSubgroup(group, subgroup)) {
                return false;
            }
            for (var _i = 0, _a = set.elements || []; _i < _a.length; _i++) {
                var g = _a[_i];
                for (var _b = 0, _c = subgroup.elements || []; _b < _c.length; _b++) {
                    var h = _c[_b];
                    var conjugate = operation(operation(g, h), inverter(g));
                    if (!subgroup.contains(conjugate)) {
                        return false;
                    }
                }
            }
            return true;
        };
        abal.isomorphism = function (struc1, struc2, mapping) {
            var morphism = Chalkboard.abal.homomorphism(struc1, struc2, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) {
                throw new Error("The mapping is not a homomorphism, so it cannot be an isomorphism.");
            }
            if (!Chalkboard.abal.isBijective(morphism)) {
                throw new Error("The mapping is not bijective, so it cannot be an isomorphism.");
            }
            return morphism;
        };
        abal.isPrincipalIdeal = function (ring, ideal) {
            for (var _i = 0, _a = ideal.elements || []; _i < _a.length; _i++) {
                var generator = _a[_i];
                var principalIdeal_1 = Chalkboard.abal.principalIdeal(ring, generator);
                if (Chalkboard.abal.isSubset(ideal, principalIdeal_1) && Chalkboard.abal.isSubset(principalIdeal_1, ideal)) {
                    return true;
                }
            }
            return false;
        };
        abal.isRing = function (ring) {
            var set = ring.set, add = ring.add, mul = ring.mul, addIdentity = ring.addIdentity, addInverter = ring.addInverter;
            if (set.id === "Z" || set.id === "Q" || set.id === "R" || set.id === "C") {
                return true;
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof addInverter === "undefined") {
                return false;
            }
            var additiveGroup = { set: set, operation: add, identity: addIdentity, inverter: addInverter };
            if (!Chalkboard.abal.isGroup(additiveGroup) || !Chalkboard.abal.isCommutative(additiveGroup)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, mul)) {
                return false;
            }
            for (var _i = 0, _a = set.elements || []; _i < _a.length; _i++) {
                var a = _a[_i];
                for (var _b = 0, _c = set.elements || []; _b < _c.length; _b++) {
                    var b = _c[_b];
                    for (var _d = 0, _e = set.elements || []; _d < _e.length; _d++) {
                        var c = _e[_d];
                        if ($(mul(mul(a, b), c)) !== $(mul(a, mul(b, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        abal.isSubfield = function (field, subset) {
            var add = field.add, mul = field.mul, addIdentity = field.addIdentity, mulIdentity = field.mulIdentity, addInverter = field.addInverter, mulInverter = field.mulInverter;
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined") {
                return false;
            }
            if (!subset.contains(addIdentity) || !subset.contains(mulIdentity)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, add) || !Chalkboard.abal.isClosed(subset, mul)) {
                return false;
            }
            for (var _i = 0, _a = subset.elements || []; _i < _a.length; _i++) {
                var a = _a[_i];
                if (!subset.contains(addInverter(a))) {
                    return false;
                }
            }
            for (var _b = 0, _c = subset.elements || []; _b < _c.length; _b++) {
                var a = _c[_b];
                if ($(a) !== $(addIdentity) && !subset.contains(mulInverter(a))) {
                    return false;
                }
            }
            return true;
        };
        abal.isSubgroup = function (group, subset) {
            var operation = group.operation, identity = group.identity, inverter = group.inverter;
            if (typeof operation === "undefined" || typeof identity === "undefined" || typeof inverter === "undefined") {
                return false;
            }
            if (!subset.contains(identity)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, operation)) {
                return false;
            }
            for (var _i = 0, _a = subset.elements || []; _i < _a.length; _i++) {
                var a = _a[_i];
                if (!subset.contains(inverter(a))) {
                    return false;
                }
            }
            return true;
        };
        abal.isSubring = function (ring, subset) {
            var add = ring.add, mul = ring.mul, addIdentity = ring.addIdentity, addInverter = ring.addInverter;
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof addInverter === "undefined") {
                return false;
            }
            if (!subset.contains(addIdentity)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(subset, add) || !Chalkboard.abal.isClosed(subset, mul)) {
                return false;
            }
            for (var _i = 0, _a = subset.elements || []; _i < _a.length; _i++) {
                var a = _a[_i];
                if (!subset.contains(addInverter(a))) {
                    return false;
                }
            }
            return true;
        };
        abal.isSubset = function (set, superset) {
            return (set.elements || []).every(function (element) { return superset.contains(element); });
        };
        abal.isSuperset = function (set, subset) {
            return Chalkboard.abal.isSubset(subset, set);
        };
        abal.isSurjective = function (morph) {
            var struc1 = morph.struc1, struc2 = morph.struc2, mapping = morph.mapping;
            if (["Z", "Q", "R", "C", "P"].includes(struc2.set.id || "")) {
                if (struc2.set.id === "C" && ["R", "C"].includes(struc1.set.id || ""))
                    return true;
                if (struc2.set.id === "R" && struc1.set.id === "Q")
                    return false;
                if (struc1.set.id === struc2.set.id)
                    return true;
                return false;
            }
            var domain = struc1.set.elements || [];
            var codomain = struc2.set.elements || [];
            var mapped = domain.map(mapping);
            return codomain.every(function (e) { return mapped.some(function (m) { return $(m) === $(e); }); });
        };
        abal.kernel = function (morph, subset) {
            var struc1 = morph.struc1, struc2 = morph.struc2, mapping = morph.mapping;
            if (!struc1.set.elements) {
                throw new Error('The domain of the "morph" must have a finite set of elements to calculate the kernel.');
            }
            var _subset = (subset === null || subset === void 0 ? void 0 : subset.elements) || struc1.set.elements;
            var identity;
            if ("identity" in struc2) {
                identity = struc2.identity;
            }
            else if ("addIdentity" in struc2) {
                identity = struc2.addIdentity;
            }
            else {
                throw new Error('The codomain of the "morph" must have an identity element to calculate the kernel.');
            }
            var result = _subset.filter(function (element) { return $(mapping(element)) === $(identity); });
            return Chalkboard.abal.set(result);
        };
        abal.Lagrange = function (group, subgroup) {
            if (group.set.id && ["Z", "Q", "R", "C"].includes(group.set.id)) {
                throw new Error("Lagrange's Theorem only applies to finite groups");
            }
            return Chalkboard.abal.cardinality(group) % Chalkboard.abal.cardinality(subgroup) === 0;
        };
        abal.M = function (rows, cols) {
            if (cols === void 0) { cols = rows; }
            return ({
                contains: function (element) {
                    return Array.isArray(element) && Chalkboard.matr.isSizeOf(element, rows, cols);
                },
                id: "M(".concat(rows, ", ").concat(cols, ")")
            });
        };
        abal.N = function () { return ({
            contains: function (element) { return Number.isInteger(element) && element > 0; },
            id: "N"
        }); };
        abal.order = function (group, element) {
            var _a;
            if (!group.operation) {
                throw new Error('The "group" must have an "operation" property to calculate the order of an element.');
            }
            var result = 1;
            var current = element;
            while ($(current) !== $(group.identity)) {
                current = group.operation(current, element);
                result++;
                if (result > (((_a = group.set.elements) === null || _a === void 0 ? void 0 : _a.length) || Infinity)) {
                    throw new Error('The "group" might not be finite because an infinite loop was detected.');
                }
            }
            return result;
        };
        abal.P = function () { return ({
            contains: function (element) { return Chalkboard.numb.isPrime(element); },
            id: "P"
        }); };
        abal.powerSet = function (set) {
            var result = [];
            var elements = set.elements || [];
            var totalSubsets = 1 << elements.length;
            for (var i = 0; i < totalSubsets; i++) {
                var subset = [];
                for (var j = 0; j < elements.length; j++) {
                    if (i & (1 << j)) {
                        subset.push(elements[j]);
                    }
                }
                result.push(Chalkboard.abal.set(subset));
            }
            return Chalkboard.abal.set(result);
        };
        abal.preimage = function (morph, subset) {
            var struc1 = morph.struc1, struc2 = morph.struc2, mapping = morph.mapping;
            if (!struc1.set.elements) {
                throw new Error('The domain of the "morph" must have a finite set of elements to calculate the preimage.');
            }
            var _subset = subset || struc2.set;
            if (!_subset.elements) {
                throw new Error('The codomain of the "morph" or the subset of it must have a finite set of elements to calculate the preimage.');
            }
            var result = struc1.set.elements.filter(function (element) { return _subset.contains(mapping(element)); });
            return Chalkboard.abal.set(result);
        };
        abal.principalIdeal = function (ring, element) {
            if (ring.set.id && ["Z", "Q", "R", "C"].includes(ring.set.id)) {
                throw new Error('The "ring" must be finite.');
            }
            var result = [];
            var mul = ring.mul, add = ring.add;
            if (!add || !mul) {
                throw new Error('The "ring" must have "mul" and "add" properties to generate a principal ideal.');
            }
            for (var _i = 0, _a = ring.set.elements || []; _i < _a.length; _i++) {
                var r = _a[_i];
                var leftProduct = mul(element, r);
                var rightProduct = mul(r, element);
                if (!result.includes(leftProduct)) {
                    result.push(leftProduct);
                }
                if (!result.includes(rightProduct)) {
                    result.push(rightProduct);
                }
            }
            for (var i = 0; i < result.length; i++) {
                for (var j = 0; j < result.length; j++) {
                    var sum = add(result[i], result[j]);
                    if (!result.includes(sum)) {
                        result.push(sum);
                    }
                }
            }
            return Chalkboard.abal.set(result);
        };
        abal.print = function (struc) {
            console.log(Chalkboard.abal.toString(struc));
        };
        abal.Q = function () { return ({
            contains: function (element) { return Number.isFinite(element) && Chalkboard.numb.isRational(element); },
            id: "Q"
        }); };
        abal.quotient = function (struc, substruc) {
            if ("operation" in struc && !Chalkboard.abal.isNormalSubgroup(struc, substruc.set)) {
                throw new Error('The "substruc" must be a normal subgroup of the "struc".');
            }
            if ("add" in struc && !Chalkboard.abal.isIdeal(struc, substruc.set)) {
                throw new Error('The "substruc" must be an ideal of the "struc".');
            }
            var cosets = Chalkboard.abal.coset(struc, substruc);
            var operationConfig = function (a, b, operation) {
                var repA = a.elements[0];
                var repB = b.elements[0];
                var result = operation(repA, repB);
                return cosets.elements.find(function (c) { return c.contains(result); });
            };
            return __assign({ set: cosets }, ("operation" in struc ? {
                operation: function (a, b) { return operationConfig(a, b, struc.operation); },
                identity: cosets.elements.find(function (c) { return c.contains(struc.identity); }),
                inverter: function (a) { return operationConfig(a, a, function (x) { return struc.inverter(x); }); }
            } : {
                add: function (a, b) { return operationConfig(a, b, struc.add); },
                mul: function (a, b) { return operationConfig(a, b, struc.mul); },
                addIdentity: cosets.elements.find(function (c) { return c.contains(struc.addIdentity); }),
                addInverter: function (a) { return operationConfig(a, a, function (x) { return struc.addInverter(x); }); }
            }));
        };
        abal.R = function () { return ({
            contains: function (element) { return Number.isFinite(element); },
            id: "R"
        }); };
        abal.ring = function (set, add, mul, addIdentity, mulIdentity, addInverter) {
            var _a, _b;
            var presets = {
                addition: {
                    Z: function (a, b) { return a + b; },
                    Q: function (a, b) { return a + b; },
                    R: function (a, b) { return a + b; },
                    C: Chalkboard.comp.add,
                    M: Chalkboard.matr.add
                },
                multiplication: {
                    Z: function (a, b) { return a * b; },
                    Q: function (a, b) { return a * b; },
                    R: function (a, b) { return a * b; },
                    C: Chalkboard.comp.mul,
                    M: Chalkboard.matr.mul
                },
            };
            var _set = typeof set === "string" && typeof Chalkboard.abal[set] === "function" ? Chalkboard.abal[set]() : set;
            var _add = typeof add === "string" ? presets[add]["addition"] || presets[add][(_a = _set.id) !== null && _a !== void 0 ? _a : ""] : add;
            var _mul = typeof mul === "string" ? presets[mul]["multiplication"] || presets[mul][(_b = _set.id) !== null && _b !== void 0 ? _b : ""] : mul;
            if (!_add || !_mul) {
                throw new Error("Preset operations \"".concat(add, "\" or \"").concat(mul, "\" are not defined for set \"").concat(_set.id, "\"."));
            }
            var autoconfig = function () {
                if (!_set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", and "addInverter" explicitly.');
                }
                if (_set.id === "Z" || _set.id === "Q" || _set.id === "R") {
                    return {
                        addIdentity: 0,
                        mulIdentity: 1,
                        addInverter: function (a) { return -a; }
                    };
                }
                else if (_set.id === "C") {
                    return {
                        addIdentity: Chalkboard.comp.init(0, 0),
                        mulIdentity: Chalkboard.comp.init(1, 0),
                        addInverter: function (a) { return Chalkboard.comp.negate(a); }
                    };
                }
                else if (_set.id.startsWith("Z") && _set.id.length > 1) {
                    var n_2 = parseInt(_set.id.slice(1), 10);
                    if (isNaN(n_2) || n_2 <= 0) {
                        throw new Error("Invalid modulus in set \"".concat(_set.id, "\"."));
                    }
                    return {
                        addIdentity: 0,
                        mulIdentity: 1,
                        addInverter: function (a) { return ((n_2 - a % n_2) % n_2); }
                    };
                }
                else if (_set.id.startsWith("M(")) {
                    var rows = _set.rows;
                    var cols = _set.cols;
                    if (rows !== cols) {
                        throw new Error("Only square matrices can form a ring.");
                    }
                    return {
                        addIdentity: Chalkboard.matr.fill(0, rows, cols),
                        mulIdentity: Chalkboard.matr.identity(rows),
                        addInverter: function (a) { return Chalkboard.matr.negate(a); }
                    };
                }
                throw new Error('Automatic configuration of the "addIdentity", "mulIdentity", and "addInverter" properties is not available for the inputted "set".');
            };
            var configured = typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" ? autoconfig() : { addIdentity: addIdentity, mulIdentity: mulIdentity, addInverter: addInverter };
            var ring = { set: _set, add: _add, mul: _mul, addIdentity: configured.addIdentity, mulIdentity: configured.mulIdentity, addInverter: configured.addInverter };
            if (!Chalkboard.abal.isRing(ring)) {
                throw new Error('The inputted "set", "add", "mul", "addIdentity", "mulIdentity", and "addInverter" do not form a ring.');
            }
            return ring;
        };
        abal.ringExtension = function (base, extension, degree, basis, isFinite, isSimple, isAlgebraic) {
            if (!Chalkboard.abal.isSubring(base, extension.set)) {
                throw new Error('The "base" must be a subring of the "extension".');
            }
            var autoconfig = function () {
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
            var configured = typeof degree === "undefined" || typeof basis === "undefined" || typeof isFinite === "undefined" || typeof isSimple === "undefined" || typeof isAlgebraic === "undefined" ? autoconfig() : { degree: degree, basis: basis, isFinite: isFinite, isSimple: isSimple, isAlgebraic: isAlgebraic };
            return { base: base, extension: extension, degree: configured.degree, basis: configured.basis, isFinite: configured.isFinite, isSimple: configured.isSimple, isAlgebraic: configured.isAlgebraic };
        };
        abal.S = function (n) {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error('The parameter "n" must be a positive integer.');
            }
            var generatePermutations = function (arr) {
                if (arr.length === 0)
                    return [[]];
                var result = [];
                for (var i = 0; i < arr.length; i++) {
                    var rest = __spreadArray(__spreadArray([], arr.slice(0, i), true), arr.slice(i + 1), true);
                    var perms = generatePermutations(rest);
                    for (var _i = 0, perms_1 = perms; _i < perms_1.length; _i++) {
                        var perm = perms_1[_i];
                        result.push(__spreadArray([arr[i]], perm, true));
                    }
                }
                return result;
            };
            var elements = generatePermutations(Array.from({ length: n }, function (_, i) { return i; }));
            return {
                contains: function (element) { return elements.some(function (perm) { return $(perm) === $(element); }); },
                elements: elements,
                id: "S".concat(n)
            };
        };
        abal.set = function (set) {
            var elements = Chalkboard.stat.unique(set);
            return {
                contains: function (element) { return elements.some(function (x) { return $(x) === $(element); }); },
                elements: elements
            };
        };
        abal.symmetricDifference = function (set1, set2) {
            var diffA = Chalkboard.abal.difference(set1, set2).elements || [];
            var diffB = Chalkboard.abal.difference(set2, set1).elements || [];
            return Chalkboard.abal.set(__spreadArray(__spreadArray([], diffA, true), diffB, true));
        };
        abal.toArray = function (struc) {
            var result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to array.");
            }
            return __spreadArray([], result.elements, true);
        };
        abal.toMatrix = function (struc, rows, cols) {
            if (cols === void 0) { cols = rows; }
            var result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to matrix.");
            }
            return Chalkboard.stat.toMatrix(result.elements, rows, cols);
        };
        abal.toObject = function (struc) {
            var result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to object.");
            }
            return Chalkboard.stat.toObject(result.elements);
        };
        abal.toString = function (struc) {
            var result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to string.");
            }
            return Chalkboard.stat.toString(result.elements);
        };
        abal.toTensor = function (struc) {
            var _a;
            var size = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                size[_i - 1] = arguments[_i];
            }
            var result = "set" in struc ? struc.set : struc;
            if (!result.elements) {
                throw new Error("Cannot convert infinite set to tensor.");
            }
            if (Array.isArray(size[0]))
                size = size[0];
            return (_a = Chalkboard.tens).resize.apply(_a, __spreadArray([result.elements], size, false));
        };
        abal.toVector = function (struc, dimension, index) {
            if (index === void 0) { index = 0; }
            var elements = "set" in struc ? struc.set.elements : struc.elements;
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
        abal.union = function (set1, set2) {
            var result = Array.from(new Set(__spreadArray(__spreadArray([], (set1.elements || []), true), (set2.elements || []), true)));
            return Chalkboard.abal.set(result);
        };
        abal.Z = function (n) {
            if (n === undefined) {
                return {
                    contains: function (element) { return Number.isInteger(element); },
                    id: "Z"
                };
            }
            else {
                if (!Number.isInteger(n) || n <= 0) {
                    throw new Error('The modulus "n" must be a positive integer.');
                }
                return {
                    contains: function (element) { return Number.isInteger(element) && element >= 0 && element < n; },
                    elements: Array.from({ length: n }, function (_, i) { return i; }),
                    id: "Z".concat(n)
                };
            }
        };
    })(abal = Chalkboard.abal || (Chalkboard.abal = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var calc;
    (function (calc) {
        calc.autocorrelation = function (func, val) {
            return Chalkboard.calc.correlation(func, func, val);
        };
        calc.binormal = function (func, val) {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                }
                else {
                    return Chalkboard.vect.cross(Chalkboard.calc.tangent(func, val), Chalkboard.calc.normal(func, val));
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };
        calc.convolution = function (func1, func2, val) {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func1.definition + ") * (" + func2.definition.replace(/x/g, "(" + val + " - x)") + ")"), -100, 100);
        };
        calc.correlation = function (func1, func2, val) {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func1.definition + ") * (" + func2.definition.replace(/x/g, "(" + val + " + x)") + ")"), -100, 100);
        };
        calc.curl = function (vectfield, vect) {
            var h = 0.000000001;
            if (Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                var p = Chalkboard.real.parse("(x, y) => " + vectfield.p), q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                var dpdy = (p(vect.x, vect.y + h) - p(vect.x, vect.y)) / h, dqdx = (q(vect.x + h, vect.y) - q(vect.x, vect.y)) / h;
                return Chalkboard.vect.init(0, 0, dqdx - dpdy);
            }
            else if (Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                var p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p), q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q), r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                var dpdy = (p(vect.x, vect.y + h, vect.z) - p(vect.x, vect.y, vect.z)) / h, dpdz = (p(vect.x, vect.y, vect.z + h) - p(vect.x, vect.y, vect.z)) / h, dqdx = (q(vect.x + h, vect.y, vect.z) - q(vect.x, vect.y, vect.z)) / h, dqdz = (q(vect.x, vect.y, vect.z + h) - q(vect.x, vect.y, vect.z)) / h, drdx = (r(vect.x + h, vect.y, vect.z) - r(vect.x, vect.y, vect.z)) / h, drdy = (r(vect.x, vect.y + h, vect.z) - r(vect.x, vect.y, vect.z)) / h;
                return Chalkboard.vect.init(drdy - dqdz, dpdz - drdx, dqdx - dpdy);
            }
            else {
                throw new TypeError('Parameter "vectfield" must be of type "ChalkboardVectorField" with 2 or 3 dimensions.');
            }
        };
        calc.curvature = function (func, val) {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    var dxdt = Chalkboard.calc.dfdx(func, val).x, dydt = Chalkboard.calc.dfdx(func, val).y, d2xdt2 = Chalkboard.calc.d2fdx2(func, val).x, d2ydt2 = Chalkboard.calc.d2fdx2(func, val).y;
                    return Math.abs(dxdt * d2ydt2 - dydt * d2xdt2) / Math.sqrt((dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt) * (dxdt * dxdt + dydt * dydt));
                }
                else {
                    return Chalkboard.vect.mag(Chalkboard.calc.normal(func, val)) / Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, val));
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };
        calc.dfdv = function (func, vectpos, vectdir) {
            if (func.type === "mult") {
                return Chalkboard.vect.dot(Chalkboard.calc.grad(func, vectpos), Chalkboard.vect.normalize(vectdir));
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "mult".');
            }
        };
        calc.dfdx = function (func, val) {
            var h = 0.000000001;
            if (func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - f(val)) / h;
            }
            else if (func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - f(val)) / h;
            }
            else if (func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - r(val)) / h;
            }
            else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.init((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h);
                }
                else {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]), z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.init((x(val + h) - x(val)) / h, (y(val + h) - y(val)) / h, (z(val + h) - z(val)) / h);
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "inve", "pola", or "curv".');
            }
        };
        calc.d2fdx2 = function (func, val) {
            var h = 0.00001;
            if (func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            }
            else if (func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                return (f(val + h) - 2 * f(val) + f(val - h)) / (h * h);
            }
            else if (func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                return (r(val + h) - 2 * r(val) + r(val - h)) / (h * h);
            }
            else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.init((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h));
                }
                else {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]), z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.init((x(val + h) - 2 * x(val) + x(val - h)) / (h * h), (y(val + h) - 2 * y(val) + y(val - h)) / (h * h), (z(val + h) - 2 * z(val) + z(val - h)) / (h * h));
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "inve", "pola", or "curv".');
            }
        };
        calc.dfdz = function (func, comp) {
            var h = 0.000000001;
            if (func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]), v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                var duda = (u(comp.a + h, comp.b) - u(comp.a, comp.b)) / h, dudb = (u(comp.a, comp.b + h) - u(comp.a, comp.b)) / h, dvda = (v(comp.a + h, comp.b) - v(comp.a, comp.b)) / h, dvdb = (v(comp.a, comp.b + h) - v(comp.a, comp.b)) / h;
                return [Chalkboard.comp.init(duda, dvda), Chalkboard.comp.init(dudb, dvdb)];
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "comp".');
            }
        };
        calc.d2fdz2 = function (func, comp) {
            var h = 0.00001;
            if (func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]), v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                var d2uda2 = (u(comp.a + h, comp.b) - 2 * u(comp.a, comp.b) + u(comp.a - h, comp.b)) / (h * h), d2udb2 = (u(comp.a, comp.b + h) - 2 * u(comp.a, comp.b) + u(comp.a, comp.b - h)) / (h * h), d2vda2 = (v(comp.a + h, comp.b) - 2 * v(comp.a, comp.b) + v(comp.a - h, comp.b)) / (h * h), d2vdb2 = (v(comp.a, comp.b + h) - 2 * v(comp.a, comp.b) + v(comp.a, comp.b - h)) / (h * h);
                return [Chalkboard.comp.init(d2uda2, d2vda2), Chalkboard.comp.init(d2udb2, d2vdb2)];
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "comp".');
            }
        };
        calc.dfrdt = function (func1, func2, val) {
            if (func1.type === "mult") {
                if (func2.type === "curv") {
                    if (func2.definition.length === 2) {
                        var dfdx_1 = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val)).x, dfdy = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val)).y, dxdt = Chalkboard.calc.dfdx(func2, val).x, dydt = Chalkboard.calc.dfdx(func2, val).y;
                        return dfdx_1 * dxdt + dfdy * dydt;
                    }
                    else {
                        var dfdx_2 = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val)).x, dfdy = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val)).y, dfdz_1 = Chalkboard.calc.grad(func1, Chalkboard.real.val(func2, val)).z, dxdt = Chalkboard.calc.dfdx(func2, val).x, dydt = Chalkboard.calc.dfdx(func2, val).y, dzdt = Chalkboard.calc.dfdx(func2, val).z;
                        return dfdx_2 * dxdt + dfdy * dydt + dfdz_1 * dzdt;
                    }
                }
                else {
                    throw new TypeError('Parameter "func2" must be of type "ChalkboardFunction" with a "type" property of "curv".');
                }
            }
            else {
                throw new TypeError('Parameter "func1" must be of type "ChalkboardFunction" with a "type" property of "mult".');
            }
        };
        calc.div = function (vectfield, vect) {
            if (Chalkboard.vect.dimension(vectfield) === 2 || Chalkboard.vect.dimension(vectfield) === 3 || Chalkboard.vect.dimension(vectfield) === 4) {
                return Chalkboard.matr.trace(Chalkboard.calc.grad(vectfield, vect));
            }
            else {
                throw new TypeError('Parameter "vectfield" must be of type "ChalkboardVectorField" with 2, 3, or 4 dimensions.');
            }
        };
        calc.extrema = function (func, domain) {
            var result = [];
            for (var i = domain[0]; i <= domain[1]; i++) {
                if (Math.round(Chalkboard.calc.dfdx(func, i)) === 0) {
                    result.push(i);
                }
            }
            return result;
        };
        calc.fds = function (func, tinf, tsup, sinf, ssup) {
            var result = 0;
            var drdt, drds;
            if (func.type === "curv") {
                var dt = (tsup - tinf) / 10000;
                if (func.definition.length === 2) {
                    for (var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                }
                else {
                    for (var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result += Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                }
            }
            else if (func.type === "surf") {
                var dt = (tsup - tinf) / 100, ds = (ssup - sinf) / 100;
                for (var s = sinf; s <= ssup; s += ds) {
                    for (var t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 1, 0);
                        result += Chalkboard.vect.mag(Chalkboard.vect.cross(drds, drdt));
                    }
                }
                return result * ds * dt;
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv" or "surf".');
            }
        };
        calc.fnds = function (vectfield, func, tinf, tsup, sinf, ssup) {
            var result = 0;
            var drdt, drds;
            if (func.type === "curv") {
                var dt = (tsup - tinf) / 10000;
                if (func.definition.length === 2) {
                    for (var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result +=
                            Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.vect.init(-drdt.y, drdt.x)) *
                                Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                }
                else {
                    for (var t = tinf; t <= tsup; t += dt) {
                        drdt = Chalkboard.calc.dfdx(func, t);
                        result +=
                            Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.calc.normal(func, t)) * Chalkboard.vect.mag(drdt);
                    }
                    return result * dt;
                }
            }
            else if (func.type === "surf") {
                var dt = (tsup - tinf) / 100, ds = (ssup - sinf) / 100;
                for (var s = sinf; s <= ssup; s += ds) {
                    for (var t = tinf; t <= tsup; t += dt) {
                        drds = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 0, 0);
                        drdt = Chalkboard.matr.toVector(Chalkboard.calc.grad(func, Chalkboard.vect.init(s, t)), 3, 1, 0);
                        result += Chalkboard.vect.scalarTriple(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, Chalkboard.vect.init(s, t))), drds, drdt);
                    }
                }
                return result * ds * dt;
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv" or "surf".');
            }
        };
        calc.Fourier = function (func, val) {
            return (2 * Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func.definition + ") * Math.cos(" + val + " * x)"), 0, 10)) / Chalkboard.PI();
        };
        calc.frds = function (funcORvectfield, func, inf, sup) {
            var funct = funcORvectfield;
            var vectfield = funcORvectfield;
            if (func.type === "curv") {
                var result = 0;
                var dt = (sup - inf) / 10000;
                if (funct.type === "mult") {
                    for (var t = inf; t <= sup; t += dt) {
                        result += Chalkboard.real.val(funct, Chalkboard.real.val(func, t)) * Chalkboard.vect.mag(Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                }
                else if (Chalkboard.vect.dimension(vectfield) === 2) {
                    for (var t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                }
                else if (Chalkboard.vect.dimension(vectfield) === 3) {
                    for (var t = inf; t <= sup; t += dt) {
                        result += Chalkboard.vect.dot(Chalkboard.vect.fromField(vectfield, Chalkboard.real.val(func, t)), Chalkboard.calc.dfdx(func, t));
                    }
                    return result * dt;
                }
                else {
                    throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "mult" or it must be of type "ChalkboardVectorField".');
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };
        calc.fxdx = function (func, inf, sup) {
            if (func.type === "expl" || func.type === "inve" || func.type === "pola") {
                var f = void 0;
                if (func.type === "expl") {
                    f = Chalkboard.real.parse("x => " + func.definition);
                }
                else if (func.type === "inve") {
                    f = Chalkboard.real.parse("y => " + func.definition);
                }
                else if (func.type === "pola") {
                    f = Chalkboard.real.parse("O => " + "((" + func.definition + ") * (" + func.definition + ")) / 2");
                }
                var fx = f(inf) + f(sup);
                var dx = (sup - inf) / 1000000;
                for (var i = 1; i < 1000000; i++) {
                    fx += i % 2 === 0 ? 2 * f(inf + i * dx) : 4 * f(inf + i * dx);
                }
                return (fx * dx) / 3;
            }
            else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]);
                    var xt = x(inf) + x(sup), yt = y(inf) + y(sup);
                    var dt = (sup - inf) / 1000000;
                    for (var i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(sup + i * dt) : 4 * y(sup + i * dt);
                    }
                    return Chalkboard.vect.init((xt * dt) / 3, (yt * dt) / 3);
                }
                else {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]), z = Chalkboard.real.parse("t => " + func.definition[2]);
                    var xt = x(inf) + x(sup), yt = y(inf) + y(sup), zt = z(inf) + z(sup);
                    var dt = (sup - inf) / 1000000;
                    for (var i = 1; i < 1000000; i++) {
                        xt += i % 2 === 0 ? 2 * x(inf + i * dt) : 4 * x(inf + i * dt);
                        yt += i % 2 === 0 ? 2 * y(inf + i * dt) : 4 * y(inf + i * dt);
                        zt += i % 2 === 0 ? 2 * z(inf + i * dt) : 4 * z(inf + i * dt);
                    }
                    return Chalkboard.vect.init((xt * dt) / 3, (yt * dt) / 3, (zt * dt) / 3);
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "inve", "pola", or "curv".');
            }
        };
        calc.fxydxdy = function (func, xinf, xsup, yinf, ysup) {
            if (func.type === "mult") {
                var f = Chalkboard.real.parse("(x, y) => " + func.definition);
                var result = 0;
                var dx = (xsup - xinf) / 10000, dy = (ysup - yinf) / 10000;
                for (var x = xinf; x <= xsup; x += dx) {
                    for (var y = yinf; y <= ysup; y += dy) {
                        result += f(x, y);
                    }
                }
                return result * dx * dy;
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "mult".');
            }
        };
        calc.fzdz = function (func1, func2, inf, sup) {
            if (func1.type === "comp") {
                if (func2.type === "curv") {
                    var result = Chalkboard.comp.init(0, 0);
                    var dt = (sup - inf) / 10000;
                    for (var t = inf; t <= sup; t += dt) {
                        var fz = Chalkboard.comp.val(func1, Chalkboard.vect.toComplex(Chalkboard.real.val(func2, t)));
                        var rt = Chalkboard.calc.dfdx(func2, t);
                        result = Chalkboard.comp.add(result, Chalkboard.comp.init(fz.a * rt.x - fz.b * rt.y, fz.b * rt.x + fz.a * rt.y));
                    }
                    return Chalkboard.comp.scl(result, dt);
                }
                else {
                    throw new TypeError('Parameter "func2" must be of type "ChalkboardFunction" with a "type" property of "curv".');
                }
            }
            else {
                throw new TypeError('Parameter "func1" must be of type "ChalkboardFunction" with a "type" property of "comp".');
            }
        };
        calc.grad = function (funcORvectfield, vect) {
            var h = 0.000000001;
            var func = funcORvectfield;
            var vectfield = funcORvectfield;
            if (func.type === "surf" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                var x = Chalkboard.real.parse("(s, t) => " + func.definition[0]), y = Chalkboard.real.parse("(s, t) => " + func.definition[1]), z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                var dxds = (x(vect.x + h, vect.y) - x(vect.x, vect.y)) / h, dxdt = (x(vect.x, vect.y + h) - x(vect.x, vect.y)) / h, dyds = (y(vect.x + h, vect.y) - y(vect.x, vect.y)) / h, dydt = (y(vect.x, vect.y + h) - y(vect.x, vect.y)) / h, dzds = (z(vect.x + h, vect.y) - z(vect.x, vect.y)) / h, dzdt = (z(vect.x, vect.y + h) - z(vect.x, vect.y)) / h;
                return Chalkboard.matr.init([dxds, dxdt], [dyds, dydt], [dzds, dzdt]);
            }
            else if (func.type === "mult" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                var f = Chalkboard.real.parse("(x, y) => " + func.definition);
                var dfdx_3 = (f(vect.x + h, vect.y) - f(vect.x, vect.y)) / h, dfdy = (f(vect.x, vect.y + h) - f(vect.x, vect.y)) / h;
                return Chalkboard.vect.init(dfdx_3, dfdy);
            }
            else if (Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                var p = Chalkboard.real.parse("(x, y) => " + vectfield.p), q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                var dpdx = (p(vect.x + h, vect.y) - p(vect.x, vect.y)) / h, dpdy = (p(vect.x, vect.y + h) - p(vect.x, vect.y)) / h, dqdx = (q(vect.x + h, vect.y) - q(vect.x, vect.y)) / h, dqdy = (q(vect.x, vect.y + h) - q(vect.x, vect.y)) / h;
                return Chalkboard.matr.init([dpdx, dpdy], [dqdx, dqdy]);
            }
            else if (Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                var p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p), q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q), r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                var dpdx = (p(vect.x + h, vect.y, vect.z) - p(vect.x, vect.y, vect.z)) / h, dpdy = (p(vect.x, vect.y + h, vect.z) - p(vect.x, vect.y, vect.z)) / h, dpdz = (p(vect.x, vect.y, vect.z + h) - p(vect.x, vect.y, vect.z)) / h, dqdx = (q(vect.x + h, vect.y, vect.z) - q(vect.x, vect.y, vect.z)) / h, dqdy = (q(vect.x, vect.y + h, vect.z) - q(vect.x, vect.y, vect.z)) / h, dqdz = (q(vect.x, vect.y, vect.z + h) - q(vect.x, vect.y, vect.z)) / h, drdx = (r(vect.x + h, vect.y, vect.z) - r(vect.x, vect.y, vect.z)) / h, drdy = (r(vect.x, vect.y + h, vect.z) - r(vect.x, vect.y, vect.z)) / h, drdz = (r(vect.x, vect.y, vect.z + h) - r(vect.x, vect.y, vect.z)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz], [dqdx, dqdy, dqdz], [drdx, drdy, drdz]);
            }
            else if (Chalkboard.vect.dimension(vectfield) === 4 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                var p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p), q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q), r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r), s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                var dpdx = (p(vect.x + h, vect.y, vect.z, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h, dpdy = (p(vect.x, vect.y + h, vect.z, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h, dpdz = (p(vect.x, vect.y, vect.z + h, vect.w) - p(vect.x, vect.y, vect.z, vect.w)) / h, dpdw = (p(vect.x, vect.y, vect.z, vect.w + h) - p(vect.x, vect.y, vect.z, vect.w)) / h, dqdx = (q(vect.x + h, vect.y, vect.z, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h, dqdy = (q(vect.x, vect.y + h, vect.z, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h, dqdz = (q(vect.x, vect.y, vect.z + h, vect.w) - q(vect.x, vect.y, vect.z, vect.w)) / h, dqdw = (q(vect.x, vect.y, vect.z, vect.w + h) - q(vect.x, vect.y, vect.z, vect.w)) / h, drdx = (r(vect.x + h, vect.y, vect.z, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h, drdy = (r(vect.x, vect.y + h, vect.z, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h, drdz = (r(vect.x, vect.y, vect.z + h, vect.w) - r(vect.x, vect.y, vect.z, vect.w)) / h, drdw = (r(vect.x, vect.y, vect.z, vect.w + h) - r(vect.x, vect.y, vect.z, vect.w)) / h, dsdx = (s(vect.x + h, vect.y, vect.z, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h, dsdy = (s(vect.x, vect.y + h, vect.z, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h, dsdz = (s(vect.x, vect.y, vect.z + h, vect.w) - s(vect.x, vect.y, vect.z, vect.w)) / h, dsdw = (s(vect.x, vect.y, vect.z, vect.w + h) - s(vect.x, vect.y, vect.z, vect.w)) / h;
                return Chalkboard.matr.init([dpdx, dpdy, dpdz, dpdw], [dqdx, dqdy, dqdz, dqdw], [drdx, drdy, drdz, drdw], [dsdx, dsdy, dsdz, dsdw]);
            }
            else {
                throw new TypeError('Parameter "funcORvectfield" must be of type "ChalkboardFunction" with a "type" property of "surf" or "mult" or of type "ChalkboardVectorField".');
            }
        };
        calc.grad2 = function (funcORvectfield, vect) {
            var h = 0.00001;
            var func = funcORvectfield;
            var vectfield = funcORvectfield;
            if (func.type === "surf" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                var x = Chalkboard.real.parse("(s, t) => " + func.definition[0]), y = Chalkboard.real.parse("(s, t) => " + func.definition[1]), z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                var d2xds2 = (x(vect.x + h, vect.y) - 2 * x(vect.x, vect.y) + x(vect.x - h, vect.y)) / (h * h), d2xdt2 = (x(vect.x, vect.y + h) - 2 * x(vect.x, vect.y) + x(vect.x, vect.y - h)) / (h * h), d2yds2 = (y(vect.x + h, vect.y) - 2 * y(vect.x, vect.y) + y(vect.x - h, vect.y)) / (h * h), d2ydt2 = (y(vect.x, vect.y + h) - 2 * y(vect.x, vect.y) + y(vect.x, vect.y - h)) / (h * h), d2zds2 = (z(vect.x + h, vect.y) - 2 * z(vect.x, vect.y) + z(vect.x - h, vect.y)) / (h * h), d2zdt2 = (z(vect.x, vect.y + h) - 2 * z(vect.x, vect.y) + z(vect.x, vect.y - h)) / (h * h);
                return Chalkboard.matr.init([d2xds2, d2xdt2], [d2yds2, d2ydt2], [d2zds2, d2zdt2]);
            }
            else if (func.type === "mult" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                var f = Chalkboard.real.parse("(x, y) => " + func.definition);
                var d2fdx2_1 = (f(vect.x + h, vect.y) - 2 * f(vect.x, vect.y) + f(vect.x - h, vect.y)) / (h * h), d2fdy2 = (f(vect.x, vect.y + h) - 2 * f(vect.x, vect.y) + f(vect.x, vect.y - h)) / (h * h), d2fdxdy = (f(vect.x + h, vect.y + h) - f(vect.x + h, vect.y) - f(vect.x, vect.y + h) + f(vect.x, vect.y)) / (h * h), d2fdydx = (f(vect.x + h, vect.y + h) - f(vect.x, vect.y + h) - f(vect.x + h, vect.y) + f(vect.x, vect.y)) / (h * h);
                return Chalkboard.matr.init([d2fdx2_1, d2fdxdy], [d2fdydx, d2fdy2]);
            }
            else if (Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                var p = Chalkboard.real.parse("(x, y) => " + vectfield.p), q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                var d2pdx2 = (p(vect.x + h, vect.y) - 2 * p(vect.x, vect.y) + p(vect.x - h, vect.y)) / (h * h), d2pdy2 = (p(vect.x, vect.y + h) - 2 * p(vect.x, vect.y) + p(vect.x, vect.y - h)) / (h * h), d2qdx2 = (q(vect.x + h, vect.y) - 2 * q(vect.x, vect.y) + q(vect.x - h, vect.y)) / (h * h), d2qdy2 = (q(vect.x, vect.y + h) - 2 * q(vect.x, vect.y) + q(vect.x, vect.y - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2], [d2qdx2, d2qdy2]);
            }
            else if (Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                var p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p), q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q), r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                var d2pdx2 = (p(vect.x + h, vect.y, vect.z) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x - h, vect.y, vect.z)) / (h * h), d2pdy2 = (p(vect.x, vect.y + h, vect.z) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x, vect.y - h, vect.z)) / (h * h), d2pdz2 = (p(vect.x, vect.y, vect.z + h) - 2 * p(vect.x, vect.y, vect.z) + p(vect.x, vect.y, vect.z - h)) / (h * h), d2qdx2 = (q(vect.x + h, vect.y, vect.z) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x - h, vect.y, vect.z)) / (h * h), d2qdy2 = (q(vect.x, vect.y + h, vect.z) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x, vect.y - h, vect.z)) / (h * h), d2qdz2 = (q(vect.x, vect.y, vect.z + h) - 2 * q(vect.x, vect.y, vect.z) + q(vect.x, vect.y, vect.z - h)) / (h * h), d2rdx2 = (r(vect.x + h, vect.y, vect.z) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x - h, vect.y, vect.z)) / (h * h), d2rdy2 = (r(vect.x, vect.y + h, vect.z) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x, vect.y - h, vect.z)) / (h * h), d2rdz2 = (r(vect.x, vect.y, vect.z + h) - 2 * r(vect.x, vect.y, vect.z) + r(vect.x, vect.y, vect.z - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2], [d2qdx2, d2qdy2, d2qdz2], [d2rdx2, d2rdy2, d2rdz2]);
            }
            else if (Chalkboard.vect.dimension(vectfield) === 4 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                var p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p), q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q), r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r), s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                var d2pdx2 = (p(vect.x + h, vect.y, vect.z, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x - h, vect.y, vect.z, vect.w)) / (h * h), d2pdy2 = (p(vect.x, vect.y + h, vect.z, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y - h, vect.z, vect.w)) / (h * h), d2pdz2 = (p(vect.x, vect.y, vect.z + h, vect.w) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y, vect.z - h, vect.w)) / (h * h), d2pdw2 = (p(vect.x, vect.y, vect.z, vect.w + h) - 2 * p(vect.x, vect.y, vect.z, vect.w) + p(vect.x, vect.y, vect.z, vect.w - h)) / (h * h), d2qdx2 = (q(vect.x + h, vect.y, vect.z, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x - h, vect.y, vect.z, vect.w)) / (h * h), d2qdy2 = (q(vect.x, vect.y + h, vect.z, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y - h, vect.z, vect.w)) / (h * h), d2qdz2 = (q(vect.x, vect.y, vect.z + h, vect.w) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y, vect.z - h, vect.w)) / (h * h), d2qdw2 = (q(vect.x, vect.y, vect.z, vect.w + h) - 2 * q(vect.x, vect.y, vect.z, vect.w) + q(vect.x, vect.y, vect.z, vect.w - h)) / (h * h), d2rdx2 = (r(vect.x + h, vect.y, vect.z, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x - h, vect.y, vect.z, vect.w)) / (h * h), d2rdy2 = (r(vect.x, vect.y + h, vect.z, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y - h, vect.z, vect.w)) / (h * h), d2rdz2 = (r(vect.x, vect.y, vect.z + h, vect.w) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y, vect.z - h, vect.w)) / (h * h), d2rdw2 = (r(vect.x, vect.y, vect.z, vect.w + h) - 2 * r(vect.x, vect.y, vect.z, vect.w) + r(vect.x, vect.y, vect.z, vect.w - h)) / (h * h), d2sdx2 = (s(vect.x + h, vect.y, vect.z, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x - h, vect.y, vect.z, vect.w)) / (h * h), d2sdy2 = (s(vect.x, vect.y + h, vect.z, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y - h, vect.z, vect.w)) / (h * h), d2sdz2 = (s(vect.x, vect.y, vect.z + h, vect.w) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y, vect.z - h, vect.w)) / (h * h), d2sdw2 = (s(vect.x, vect.y, vect.z, vect.w + h) - 2 * s(vect.x, vect.y, vect.z, vect.w) + s(vect.x, vect.y, vect.z, vect.w - h)) / (h * h);
                return Chalkboard.matr.init([d2pdx2, d2pdy2, d2pdz2, d2pdw2], [d2qdx2, d2qdy2, d2qdz2, d2qdw2], [d2rdx2, d2rdy2, d2rdz2, d2rdw2], [d2sdx2, d2sdy2, d2sdz2, d2sdw2]);
            }
            else {
                throw new TypeError('Parameter "funcORvectfield" must be of type "ChalkboardFunction" with a "type" property of "surf" or "mult" or it must be of type "ChalkboardVectorField".');
            }
        };
        calc.Laplace = function (func, val) {
            if (val > 0) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define("(" + func.definition + ") * Math.exp(-" + val + " * x)"), 0, 10);
            }
            else {
                throw new RangeError('Parameter "val" must be of type "number" greater than 0.');
            }
        };
        calc.lim = function (func, val) {
            if (func.type === "expl") {
                if (val === Infinity) {
                    if (Chalkboard.real.val(func, 101) > Chalkboard.real.val(func, 100)) {
                        return Infinity;
                    }
                    else if (Chalkboard.real.val(func, 101) < Chalkboard.real.val(func, 100)) {
                        return -Infinity;
                    }
                }
                else if (val === -Infinity) {
                    if (Chalkboard.real.val(func, -101) > Chalkboard.real.val(func, -100)) {
                        return Infinity;
                    }
                    else if (Chalkboard.real.val(func, -101) < Chalkboard.real.val(func, -100)) {
                        return -Infinity;
                    }
                }
                else {
                    if (Chalkboard.real.val(func, val - 0.000001).toFixed(4) === Chalkboard.real.val(func, val + 0.000001).toFixed(4)) {
                        if (Chalkboard.real.val(func, val) !== Infinity || Chalkboard.real.val(func, val) !== -Infinity) {
                            return Chalkboard.real.val(func, val);
                        }
                        else {
                            return undefined;
                        }
                    }
                    else {
                        return undefined;
                    }
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl".');
            }
        };
        calc.mean = function (func, inf, sup) {
            return Chalkboard.calc.fxdx(func, inf, sup) / (sup - inf);
        };
        calc.Newton = function (func, domain) {
            if (domain === void 0) { domain = [-1, 1]; }
            var x = Chalkboard.numb.random(domain[0], domain[1]);
            for (var i = 0; i < 10; i++) {
                x = x - Chalkboard.real.val(func, x) / Chalkboard.calc.dfdx(func, x);
            }
            return x;
        };
        calc.normal = function (func, val) {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val));
                }
                else {
                    return Chalkboard.vect.normalize(Chalkboard.calc.d2fdx2(func, val));
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };
        calc.tangent = function (func, val) {
            if (func.type === "curv") {
                if (func.definition.length === 2) {
                    return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val));
                }
                else {
                    return Chalkboard.vect.normalize(Chalkboard.calc.dfdx(func, val));
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "curv".');
            }
        };
        calc.Taylor = function (func, val, n, a) {
            if (func.type === "expl") {
                if (n === 0) {
                    return Chalkboard.real.val(func, a);
                }
                else if (n === 1) {
                    return Chalkboard.real.val(func, a) + Chalkboard.calc.dfdx(func, a) * (val - a);
                }
                else if (n === 2) {
                    return Chalkboard.real.val(func, a) + Chalkboard.calc.dfdx(func, a) * (val - a) + (Chalkboard.calc.d2fdx2(func, a) * (val - a) * (val - a)) / 2;
                }
                else {
                    throw new RangeError('Parameter "n" must be of type "number" greater than 0 and less than 3');
                }
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl".');
            }
        };
    })(calc = Chalkboard.calc || (Chalkboard.calc = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var comp;
    (function (comp_2) {
        comp_2.absolute = function (comp) {
            return Chalkboard.comp.init(Math.abs(comp.a), Math.abs(comp.b));
        };
        comp_2.add = function (comp1, comp2) {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init(comp1.a + comp2.a, comp1.b + comp2.b);
        };
        comp_2.arg = function (comp) {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
        };
        comp_2.argBetween = function (comp1, comp2) {
            return Chalkboard.vect.angBetween(Chalkboard.comp.toVector(comp1), Chalkboard.comp.toVector(comp2));
        };
        comp_2.conjugate = function (comp) {
            return Chalkboard.comp.init(comp.a, -comp.b);
        };
        comp_2.constrain = function (comp, range) {
            if (range === void 0) { range = [0, 1]; }
            return Chalkboard.comp.init(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        };
        comp_2.copy = function (comp) {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        };
        comp_2.define = function (realDefinition, imagDefinition) {
            return { definition: [realDefinition, imagDefinition], type: "comp" };
        };
        comp_2.dist = function (comp1, comp2) {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.real.sqrt((comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b));
        };
        comp_2.distsq = function (comp1, comp2) {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return (comp2.a - comp1.a) * (comp2.a - comp1.a) + (comp2.b - comp1.b) * (comp2.b - comp1.b);
        };
        comp_2.div = function (comp1, comp2) {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init((comp1.a * comp2.a - comp1.b * comp2.b) / Chalkboard.comp.magsq(comp2), (comp1.b * comp2.a - comp1.a * comp2.b) / Chalkboard.comp.magsq(comp2));
        };
        comp_2.Euler = function (rad) {
            return Chalkboard.comp.init(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        };
        comp_2.Im = function (funcORcomp) {
            if (funcORcomp.hasOwnProperty("definition")) {
                return funcORcomp.definition[1];
            }
            else {
                return funcORcomp.b;
            }
        };
        comp_2.init = function (a, b) {
            if (b === void 0) { b = 0; }
            return { a: a, b: b };
        };
        comp_2.invert = function (comp) {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        };
        comp_2.ln = function (comp) {
            return Chalkboard.comp.init(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        };
        comp_2.mag = function (comp) {
            return Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b);
        };
        comp_2.magset = function (comp, num) {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num);
        };
        comp_2.magsq = function (comp) {
            return comp.a * comp.a + comp.b * comp.b;
        };
        comp_2.mul = function (comp1, comp2) {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init(comp1.a * comp2.a - comp1.b * comp2.b, comp1.a * comp2.b + comp1.b * comp2.a);
        };
        comp_2.negate = function (comp) {
            return Chalkboard.comp.init(-comp.a, -comp.b);
        };
        comp_2.normalize = function (comp) {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
        };
        comp_2.parse = function (str) {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + " return (" + str + ")")();
        };
        comp_2.pow = function (comp, num) {
            return Chalkboard.comp.init(Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.cos(num * Chalkboard.comp.arg(comp)), Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.sin(num * Chalkboard.comp.arg(comp)));
        };
        comp_2.print = function (comp) {
            console.log(Chalkboard.comp.toString(comp));
        };
        comp_2.random = function (inf, sup) {
            if (inf === void 0) { inf = 0; }
            if (sup === void 0) { sup = 1; }
            return Chalkboard.comp.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };
        comp_2.Re = function (funcORcomp) {
            if (funcORcomp.hasOwnProperty("definition")) {
                return funcORcomp.definition[0];
            }
            else {
                return funcORcomp.a;
            }
        };
        comp_2.reciprocate = function (comp) {
            return Chalkboard.comp.init(1 / comp.a, 1 / comp.b);
        };
        comp_2.root = function (comp, index) {
            if (index === void 0) { index = 3; }
            var result = [];
            var r = Chalkboard.comp.mag(comp);
            var t = Chalkboard.comp.arg(comp);
            for (var i = 0; i < index; i++) {
                result.push(Chalkboard.comp.init(Chalkboard.real.root(r, index) * Chalkboard.trig.cos((t + Chalkboard.PI(2 * i)) / index), Chalkboard.real.root(r, index) * Chalkboard.trig.sin((t + Chalkboard.PI(2 * i)) / index)));
            }
            return result;
        };
        comp_2.rotate = function (comp, rad) {
            return Chalkboard.comp.init(Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad), Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad));
        };
        comp_2.round = function (comp) {
            return Chalkboard.comp.init(Math.round(comp.a), Math.round(comp.b));
        };
        comp_2.scl = function (comp, num) {
            return Chalkboard.comp.init(comp.a * num, comp.b * num);
        };
        comp_2.slope = function (comp) {
            return comp.b / comp.a;
        };
        comp_2.sq = function (comp) {
            return Chalkboard.comp.init(comp.a * comp.a - comp.b * comp.b, 2 * comp.a * comp.b);
        };
        comp_2.sqrt = function (comp) {
            return Chalkboard.comp.init(Chalkboard.real.sqrt((comp.a + Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b)) / 2), Chalkboard.numb.sgn(comp.b) * Chalkboard.real.sqrt((-comp.a + Chalkboard.real.sqrt(comp.a * comp.a + comp.b * comp.b)) / 2));
        };
        comp_2.sub = function (comp1, comp2) {
            if (typeof comp1 === "number")
                comp1 = Chalkboard.comp.init(comp1, 0);
            if (typeof comp2 === "number")
                comp2 = Chalkboard.comp.init(comp2, 0);
            return Chalkboard.comp.init(comp1.a - comp2.a, comp1.b - comp2.b);
        };
        comp_2.toArray = function (comp) {
            return [comp.a, comp.b];
        };
        comp_2.toMatrix = function (comp) {
            return Chalkboard.matr.init([comp.a, -comp.b], [comp.b, comp.a]);
        };
        comp_2.toString = function (comp) {
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
                return comp.a.toString() + " + " + comp.b.toString() + "i";
            }
            else {
                return comp.a.toString() + " - " + Math.abs(comp.b).toString() + "i";
            }
        };
        comp_2.toVector = function (comp) {
            return Chalkboard.vect.init(comp.a, comp.b);
        };
        comp_2.val = function (func, comp) {
            if (func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]), v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                return Chalkboard.comp.init(u(comp.a, comp.b), v(comp.a, comp.b));
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a type property of "comp".');
            }
        };
        comp_2.zero = function (comp) {
            return Chalkboard.comp.init(comp.a * 0, comp.b * 0);
        };
    })(comp = Chalkboard.comp || (Chalkboard.comp = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var geom;
    (function (geom) {
        geom.circleA = function (r) {
            return Chalkboard.PI() * r * r;
        };
        geom.circleP = function (r) {
            return 2 * Chalkboard.PI() * r;
        };
        geom.coneA = function (r, h) {
            return Chalkboard.PI() * r * (r + Chalkboard.real.sqrt(h * h + r * r));
        };
        geom.coneV = function (r, h) {
            return (Chalkboard.PI() * r * r * h) / 3;
        };
        geom.cubeA = function (s) {
            return 6 * s * s;
        };
        geom.cubeV = function (s) {
            return s * s * s;
        };
        geom.cylinderA = function (r, h) {
            return 2 * Chalkboard.PI() * r * r + 2 * Chalkboard.PI() * r * h;
        };
        geom.cylinderV = function (r, h) {
            return Chalkboard.PI() * r * r * h;
        };
        geom.dist = function (p1, p2) {
            if (p1.length === p2.length) {
                var result = 0;
                for (var i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return Chalkboard.real.sqrt(result);
            }
            else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };
        geom.distsq = function (p1, p2) {
            if (p1.length === p2.length) {
                var result = 0;
                for (var i = 0; i < p1.length; i++) {
                    result += (p1[i] - p2[i]) * (p1[i] - p2[i]);
                }
                return result;
            }
            else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };
        geom.ellipseA = function (a, b) {
            return Chalkboard.PI() * a * b;
        };
        geom.ellipseP = function (a, b) {
            var h = ((a - b) * (a - b)) / ((a + b) * (a + b));
            return Chalkboard.PI() * (a + b) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));
        };
        geom.Euler = function (v, e, f) {
            return v - e + f;
        };
        geom.line3D = function (x1, y1, z1, x2, y2, z2, context) {
            if (context === void 0) { context = Chalkboard.real.parse(Chalkboard.CONTEXT); }
            context.beginPath();
            context.moveTo(x1 / (z1 * 0.0025 + 1), y1 / (z1 * 0.0025 + 1));
            context.lineTo(x2 / (z2 * 0.0025 + 1), y2 / (z2 * 0.0025 + 1));
            context.stroke();
        };
        geom.mid = function (p1, p2) {
            if (p1.length === p2.length) {
                var result = [];
                for (var i = 0; i < p1.length; i++) {
                    result[i] = (p1[i] + p2[i]) / 2;
                }
                return result;
            }
            else {
                throw new RangeError('Parameters "p1" and "p2" must be of type "number[]" with the same "length" property.');
            }
        };
        geom.parallelogramA = function (l, w) {
            return l * w;
        };
        geom.parallelogramP = function (l, w) {
            return 2 * (l + w);
        };
        geom.polygonA = function (n, s, a) {
            return (n * s * a) / 2;
        };
        geom.polygonP = function (n, s) {
            return n * s;
        };
        geom.Pythagorean = function (a, b, type) {
            if (type === void 0) { type = "hyp"; }
            if (type === "hyp") {
                return Math.sqrt(a * a + b * b);
            }
            else {
                return Math.sqrt(b * b - a * a);
            }
        };
        geom.PythagoreanTriple = function (inf, sup) {
            var a = 2 * Math.round(Chalkboard.numb.random(inf, sup)) - 1, b = (a * a) / 2 - 0.5, c = (a * a) / 2 + 0.5;
            return [a, b, c];
        };
        geom.rectangularprismA = function (l, w, h) {
            return 2 * (l * h + l * w + w * h);
        };
        geom.rectangularprismV = function (l, w, h) {
            return l * w * h;
        };
        geom.sectorA = function (r, rad) {
            return (r * r * rad) / 2;
        };
        geom.sectorP = function (r, rad) {
            return r * rad;
        };
        geom.sphereA = function (r) {
            return 4 * Chalkboard.PI() * r * r;
        };
        geom.sphereV = function (r) {
            return (4 * Chalkboard.PI() * r * r * r) / 3;
        };
        geom.squareA = function (s) {
            return s * s;
        };
        geom.squareP = function (s) {
            return 4 * s;
        };
        geom.trapezoidA = function (b1, b2, h) {
            return ((b1 + b2) / 2) * h;
        };
        geom.trapezoidP = function (a, b, c, d) {
            return a + b + c + d;
        };
        geom.triangleA = function (b, h) {
            return (b * h) / 2;
        };
        geom.triangleP = function (a, b, c) {
            return a + b + c;
        };
        geom.trianglesidesA = function (a, b, c) {
            var s = (a + b + c) / 2;
            return Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c)));
        };
        geom.triangularprismA = function (a, b, c, h) {
            var s = (a + b + c) / 2;
            return 2 * Chalkboard.real.sqrt(s * ((s - a) * (s - b) * (s - c))) + h * (a + b + c);
        };
        geom.triangularprismV = function (a, b, c, h) {
            return (h * Chalkboard.real.sqrt(-(a * a * a * a) + 2 * (a * b) * (a * b) + 2 * (a * c) * (a * c) - b * b * b * b + 2 * (b * c) * (b * c) - c * c * c * c)) / 4;
        };
    })(geom = Chalkboard.geom || (Chalkboard.geom = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var matr;
    (function (matr_2) {
        matr_2.absolute = function (matr) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Math.abs(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_2.add = function (matr1, matr2) {
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
                    var result = Chalkboard.matr.init();
                    for (var i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (var j = 0; j < Chalkboard.matr.cols(matr1); j++) {
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
        matr_2.addKronecker = function (matr1, matr2) {
            if (Chalkboard.matr.isSquare(matr1) && Chalkboard.matr.isSquare(matr2)) {
                return Chalkboard.matr.add(Chalkboard.matr.mulKronecker(matr1, Chalkboard.matr.identity(Chalkboard.matr.rows(matr1))), Chalkboard.matr.mulKronecker(Chalkboard.matr.identity(Chalkboard.matr.rows(matr2)), matr2));
            }
            else {
                throw new TypeError('Parameters "matr1" and "matr2" must be of type "ChalkboardMatrix" that are square.');
            }
        };
        matr_2.adjugate = function (matr, row, col) {
            return Chalkboard.matr.transpose(Chalkboard.matr.cofactor(matr, row, col));
        };
        matr_2.cofactor = function (matr, row, col) {
            return matr
                .slice(0, row)
                .concat(matr.slice(row + 1))
                .map(function (row) {
                return row.slice(0, col).concat(row.slice(col + 1));
            });
        };
        matr_2.cols = function (matr) {
            return matr[0].length;
        };
        matr_2.colspace = function (matr) {
            return Chalkboard.matr.transpose(Chalkboard.matr.rowspace(Chalkboard.matr.transpose(matr)));
        };
        matr_2.concat = function (matr1, matr2, axis) {
            if (axis === void 0) { axis = 0; }
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
                        var result = Chalkboard.matr.init();
                        for (var i = 0; i < Chalkboard.matr.rows(matr1); i++) {
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
        matr_2.constrain = function (matr, range) {
            if (range === void 0) { range = [0, 1]; }
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range)], [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([Chalkboard.numb.constrain(matr[0][0], range), Chalkboard.numb.constrain(matr[0][1], range), Chalkboard.numb.constrain(matr[0][2], range)], [Chalkboard.numb.constrain(matr[1][0], range), Chalkboard.numb.constrain(matr[1][1], range), Chalkboard.numb.constrain(matr[1][2], range)], [Chalkboard.numb.constrain(matr[2][0], range), Chalkboard.numb.constrain(matr[2][1], range), Chalkboard.numb.constrain(matr[2][2], range)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([
                    Chalkboard.numb.constrain(matr[0][0], range),
                    Chalkboard.numb.constrain(matr[0][1], range),
                    Chalkboard.numb.constrain(matr[0][2], range),
                    Chalkboard.numb.constrain(matr[0][3], range)
                ], [
                    Chalkboard.numb.constrain(matr[1][0], range),
                    Chalkboard.numb.constrain(matr[1][1], range),
                    Chalkboard.numb.constrain(matr[1][2], range),
                    Chalkboard.numb.constrain(matr[1][3], range)
                ], [
                    Chalkboard.numb.constrain(matr[2][0], range),
                    Chalkboard.numb.constrain(matr[2][1], range),
                    Chalkboard.numb.constrain(matr[2][2], range),
                    Chalkboard.numb.constrain(matr[2][3], range)
                ], [
                    Chalkboard.numb.constrain(matr[3][0], range),
                    Chalkboard.numb.constrain(matr[3][1], range),
                    Chalkboard.numb.constrain(matr[3][2], range),
                    Chalkboard.numb.constrain(matr[3][3], range)
                ]);
            }
            else {
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Chalkboard.numb.constrain(matr[i][j], range);
                    }
                }
                return result;
            }
        };
        matr_2.copy = function (matr) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result.push([]);
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i].push(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_2.det = function (matr) {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                }
                else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0];
                }
                else if (Chalkboard.matr.rows(matr) === 3) {
                    return (matr[0][0] * (matr[1][1] * matr[2][2] - matr[1][2] * matr[2][1]) -
                        matr[0][1] * (matr[1][0] * matr[2][2] - matr[1][2] * matr[2][0]) +
                        matr[0][2] * (matr[1][0] * matr[2][1] - matr[1][1] * matr[2][0]));
                }
                else if (Chalkboard.matr.rows(matr) === 4) {
                    return (matr[0][0] *
                        (matr[1][1] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) -
                            matr[1][2] * (matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1]) +
                            matr[1][3] * (matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1])) -
                        matr[0][1] *
                            (matr[1][0] * (matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2]) -
                                matr[1][2] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) +
                                matr[1][3] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0])) +
                        matr[0][2] *
                            (matr[1][0] * (matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1]) -
                                matr[1][1] * (matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0]) +
                                matr[1][3] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0])) -
                        matr[0][3] *
                            (matr[1][0] * (matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1]) -
                                matr[1][1] * (matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0]) +
                                matr[1][2] * (matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0])));
                }
                else {
                    var result = 0;
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        var cofactor_1 = matr[0][i] * Chalkboard.matr.det(Chalkboard.matr.cofactor(matr, 0, i));
                        result += i % 2 === 0 ? cofactor_1 : -cofactor_1;
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_2.diagonal = function (size) {
            var elements = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                elements[_i - 1] = arguments[_i];
            }
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result.push(Array(size).fill(0));
                    result[i][i] = elements[i] || 0;
                }
                return result;
            }
        };
        matr_2.eigenvalue = function (matr, maxIterations) {
            if (maxIterations === void 0) { maxIterations = 100; }
            var v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            var _loop_1 = function (i) {
                var matrv = Chalkboard.matr.mul(matr, v);
                var max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(Chalkboard.matr.toArray(matrv).map(function (i) {
                    return i / max;
                }), Chalkboard.matr.rows(matr), 1);
            };
            for (var i = 0; i < maxIterations; i++) {
                _loop_1(i);
            }
            var dot = function (v1, v2) {
                var result = 0;
                for (var i = 0; i < v1.length; i++) {
                    result += v1[i] * v2[i];
                }
                return result;
            };
            return (dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(Chalkboard.matr.mul(matr, v))) /
                dot(Chalkboard.matr.toArray(Chalkboard.matr.transpose(v)), Chalkboard.matr.toArray(v)));
        };
        matr_2.eigenvector = function (matr, maxIterations) {
            if (maxIterations === void 0) { maxIterations = 100; }
            var v = Chalkboard.matr.fill(1, Chalkboard.matr.rows(matr), 1);
            var _loop_2 = function (i) {
                var matrv = Chalkboard.matr.mul(matr, v);
                var max = Chalkboard.stat.max(Chalkboard.matr.toArray(Chalkboard.matr.absolute(matrv)));
                v = Chalkboard.stat.toMatrix(Chalkboard.matr.toArray(matrv).map(function (i) {
                    return i / max;
                }), Chalkboard.matr.rows(matr), 1);
            };
            for (var i = 0; i < maxIterations; i++) {
                _loop_2(i);
            }
            var result = Chalkboard.matr.toArray(v);
            return result;
        };
        matr_2.empty = function (rows, cols) {
            if (cols === void 0) { cols = rows; }
            var _null = null;
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < rows; i++) {
                    result.push([]);
                    for (var j = 0; j < cols; j++) {
                        result[i].push(_null);
                    }
                }
                return result;
            }
        };
        matr_2.exchange = function (size) {
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
                var result = Chalkboard.matr.fill(0, size, size);
                for (var i = 0; i < size; i++) {
                    for (var j = 0; j < size; j++) {
                        if (i + j === size - 1) {
                            result[i][j] = 1;
                        }
                    }
                }
                return result;
            }
        };
        matr_2.fill = function (element, rows, cols) {
            if (cols === void 0) { cols = rows; }
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < rows; i++) {
                    result.push([]);
                    for (var j = 0; j < cols; j++) {
                        result[i].push(element);
                    }
                }
                return result;
            }
        };
        matr_2.Gaussian = function (matr) {
            var lead = 0;
            for (var row = 0; row < Chalkboard.matr.rows(matr); row++) {
                if (lead >= Chalkboard.matr.cols(matr)) {
                    break;
                }
                var i = row;
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
                var temp = matr[i];
                matr[i] = matr[row];
                matr[row] = temp;
                var scl_1 = matr[row][lead];
                for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    matr[row][j] /= scl_1;
                }
                for (var i_1 = 0; i_1 < Chalkboard.matr.rows(matr); i_1++) {
                    if (i_1 !== row) {
                        var coeff = matr[i_1][lead];
                        for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            matr[i_1][j] -= coeff * matr[row][j];
                        }
                    }
                }
                lead++;
            }
            return matr;
        };
        matr_2.Hilbert = function (size) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result.push([]);
                    for (var j = 0; j < size; j++) {
                        result[i].push(1 / (i + j + 1));
                    }
                }
                return result;
            }
        };
        matr_2.identity = function (size) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result.push(Array(size).fill(0));
                    result[i][i] = 1;
                }
                return result;
            }
        };
        matr_2.init = function () {
            var matrix = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                matrix[_i] = arguments[_i];
            }
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
        matr_2.invert = function (matr) {
            if (Chalkboard.matr.isInvertible(matr)) {
                if (Chalkboard.matr.rows(matr) === 2) {
                    var det_1 = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init([matr[1][1] / det_1, -matr[0][1] / det_1], [-matr[1][0] / det_1, matr[0][0] / det_1]);
                }
                else if (Chalkboard.matr.rows(matr) === 3) {
                    var det_2 = Chalkboard.matr.det(matr);
                    return Chalkboard.matr.init([
                        (matr[1][1] * matr[2][2] - matr[1][2] * matr[2][1]) / det_2,
                        (matr[0][2] * matr[2][1] - matr[0][1] * matr[2][2]) / det_2,
                        (matr[0][1] * matr[1][2] - matr[0][2] * matr[1][1]) / det_2
                    ], [
                        (matr[1][2] * matr[2][0] - matr[1][0] * matr[2][2]) / det_2,
                        (matr[0][0] * matr[2][2] - matr[0][2] * matr[2][0]) / det_2,
                        (matr[0][2] * matr[1][0] - matr[0][0] * matr[1][2]) / det_2
                    ], [
                        (matr[1][0] * matr[2][1] - matr[1][1] * matr[2][0]) / det_2,
                        (matr[0][1] * matr[2][0] - matr[0][0] * matr[2][1]) / det_2,
                        (matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0]) / det_2
                    ]);
                }
                else if (Chalkboard.matr.rows(matr) === 4) {
                    var det_3 = Chalkboard.matr.det(matr);
                    var adj00 = matr[0][0] * matr[1][1] - matr[0][1] * matr[1][0], adj01 = matr[0][0] * matr[1][2] - matr[0][2] * matr[1][0], adj02 = matr[0][0] * matr[1][3] - matr[0][3] * matr[1][0], adj03 = matr[0][1] * matr[1][2] - matr[0][2] * matr[1][1], adj04 = matr[0][1] * matr[1][3] - matr[0][3] * matr[1][1], adj05 = matr[0][2] * matr[1][3] - matr[0][3] * matr[1][2], adj06 = matr[2][0] * matr[3][1] - matr[2][1] * matr[3][0], adj07 = matr[2][0] * matr[3][2] - matr[2][2] * matr[3][0], adj08 = matr[2][0] * matr[3][3] - matr[2][3] * matr[3][0], adj09 = matr[2][1] * matr[3][2] - matr[2][2] * matr[3][1], adj10 = matr[2][1] * matr[3][3] - matr[2][3] * matr[3][1], adj11 = matr[2][2] * matr[3][3] - matr[2][3] * matr[3][2];
                    return Chalkboard.matr.init([
                        (matr[1][1] * adj11 - matr[1][2] * adj10 + matr[1][3] * adj09) / det_3,
                        (matr[0][2] * adj10 - matr[0][1] * adj11 - matr[0][3] * adj09) / det_3,
                        (matr[3][1] * adj05 - matr[3][2] * adj04 + matr[3][3] * adj03) / det_3,
                        (matr[2][2] * adj04 - matr[2][1] * adj05 - matr[2][3] * adj03) / det_3
                    ], [
                        (matr[1][2] * adj08 - matr[1][0] * adj11 - matr[1][3] * adj07) / det_3,
                        (matr[0][0] * adj11 - matr[0][2] * adj08 + matr[0][3] * adj07) / det_3,
                        (matr[3][2] * adj02 - matr[3][0] * adj05 - matr[3][3] * adj01) / det_3,
                        (matr[2][0] * adj05 - matr[2][2] * adj02 + matr[2][3] * adj01) / det_3
                    ], [
                        (matr[1][0] * adj10 - matr[1][1] * adj08 + matr[1][3] * adj06) / det_3,
                        (matr[0][1] * adj08 - matr[0][0] * adj10 - matr[0][3] * adj06) / det_3,
                        (matr[3][0] * adj04 - matr[3][1] * adj02 + matr[3][3] * adj00) / det_3,
                        (matr[2][1] * adj02 - matr[2][0] * adj04 - matr[2][3] * adj00) / det_3
                    ], [
                        (matr[1][1] * adj07 - matr[1][0] * adj09 - matr[1][2] * adj06) / det_3,
                        (matr[0][0] * adj09 - matr[0][1] * adj07 + matr[0][2] * adj06) / det_3,
                        (matr[3][1] * adj01 - matr[3][0] * adj03 - matr[3][2] * adj00) / det_3,
                        (matr[2][0] * adj03 - matr[2][1] * adj01 + matr[2][2] * adj00) / det_3
                    ]);
                }
                else {
                    var result = Chalkboard.matr.init();
                    var augmented = Chalkboard.matr.init();
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        augmented.push(matr[i].concat(Array(Chalkboard.matr.rows(matr)).fill(0)));
                        augmented[i][Chalkboard.matr.cols(matr) + i] = 1;
                    }
                    for (var row = 0; row < Chalkboard.matr.rows(matr); row++) {
                        var diagonal_1 = augmented[row][row];
                        if (diagonal_1 === 0) {
                            var max = row;
                            for (var i = row + 1; i < Chalkboard.matr.rows(matr); i++) {
                                if (Math.abs(augmented[i][row]) > Math.abs(augmented[max][row])) {
                                    max = i;
                                }
                            }
                            var temp = augmented[row];
                            augmented[row] = augmented[max];
                            augmented[max] = temp;
                            diagonal_1 = augmented[row][row];
                        }
                        for (var col = 0; col < 2 * Chalkboard.matr.cols(matr); col++) {
                            augmented[row][col] /= diagonal_1;
                        }
                        for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                            if (i !== row) {
                                var coeff = augmented[i][row];
                                for (var j = 0; j < 2 * Chalkboard.matr.cols(matr); j++) {
                                    augmented[i][j] -= coeff * augmented[row][j];
                                }
                            }
                        }
                    }
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        result.push(augmented[i].slice(Chalkboard.matr.cols(matr), 2 * Chalkboard.matr.cols(matr)));
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square and has a non-zero determinant.');
            }
        };
        matr_2.isDiagonal = function (matr) {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return matr[0][1] !== 0 && matr[1][0] !== 0;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return matr[0][1] !== 0 && matr[0][2] !== 0 && matr[1][0] !== 0 && matr[1][2] !== 0 && matr[2][0] !== 0 && matr[2][1] !== 0;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return (matr[0][1] !== 0 &&
                        matr[0][2] !== 0 &&
                        matr[0][3] !== 0 &&
                        matr[1][0] !== 0 &&
                        matr[1][2] !== 0 &&
                        matr[1][3] !== 0 &&
                        matr[2][0] !== 0 &&
                        matr[2][1] !== 0 &&
                        matr[2][3] !== 0 &&
                        matr[3][0] !== 0 &&
                        matr[3][1] !== 0 &&
                        matr[3][2] !== 0);
                }
                else {
                    var score = 0;
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                            if (i !== j && matr[i][j] !== 0)
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
        matr_2.isEqual = function (matr1, matr2) {
            if (Chalkboard.matr.isSizeEqual(matr1, matr2)) {
                if (Chalkboard.matr.isSizeOf(matr1, 2)) {
                    return matr1[0][0] === matr2[0][0] && matr1[0][1] === matr2[0][1] && matr1[1][0] === matr2[1][0] && matr1[1][1] === matr2[1][1];
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 3)) {
                    return (matr1[0][0] === matr2[0][0] &&
                        matr1[0][1] === matr2[0][1] &&
                        matr1[0][2] === matr2[0][2] &&
                        matr1[1][0] === matr2[1][0] &&
                        matr1[1][1] === matr2[1][1] &&
                        matr1[1][2] === matr2[1][2] &&
                        matr1[2][0] === matr2[2][0] &&
                        matr1[2][1] === matr2[2][1] &&
                        matr1[2][2] === matr2[2][2]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4)) {
                    return (matr1[0][0] === matr2[0][0] &&
                        matr1[0][1] === matr2[0][1] &&
                        matr1[0][2] === matr2[0][2] &&
                        matr1[0][3] === matr2[0][3] &&
                        matr1[1][0] === matr2[1][0] &&
                        matr1[1][1] === matr2[1][1] &&
                        matr1[1][2] === matr2[1][2] &&
                        matr1[1][3] === matr2[1][3] &&
                        matr1[2][0] === matr2[2][0] &&
                        matr1[2][1] === matr2[2][1] &&
                        matr1[2][2] === matr2[2][2] &&
                        matr1[2][3] === matr2[2][3] &&
                        matr1[3][0] === matr2[3][0] &&
                        matr1[3][1] === matr2[3][1] &&
                        matr1[3][2] === matr2[3][2] &&
                        matr1[3][3] === matr2[3][3]);
                }
                else {
                    var score = Chalkboard.matr.rows(matr1) * Chalkboard.matr.cols(matr2);
                    for (var i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        for (var j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            if (matr1[i][j] === matr2[i][j])
                                score--;
                        }
                    }
                    return score === 0;
                }
            }
            else {
                return false;
            }
        };
        matr_2.isIdentity = function (matr) {
            if (Chalkboard.matr.isDiagonal(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return matr[0][0] === 1 && matr[1][1] === 1;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return matr[0][0] === 1 && matr[1][1] === 1 && matr[2][2] === 1;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return matr[0][0] === 1 && matr[1][1] === 1 && matr[2][2] === 1 && matr[3][3] === 1;
                }
                else {
                    var score = 0;
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        if (matr[i][i] !== 1)
                            score++;
                    }
                    return score === 0;
                }
            }
            else {
                return false;
            }
        };
        matr_2.isInvertible = function (matr) {
            return Chalkboard.matr.isSquare(matr) && Chalkboard.matr.det(matr) !== 0;
        };
        matr_2.isLowerTriangular = function (matr) {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return matr[0][1] === 0;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return matr[0][1] === 0 && matr[0][2] === 0 && matr[1][2] === 0;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return matr[0][1] === 0 && matr[0][2] === 0 && matr[0][3] === 0 && matr[1][2] === 0 && matr[1][3] === 0 && matr[2][3] === 0;
                }
                else {
                    var score = 0;
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (var j = i + 1; j < Chalkboard.matr.cols(matr); j++) {
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
        matr_2.isOrthogonal = function (matr) {
            if (Chalkboard.matr.isInvertible(matr)) {
                return Chalkboard.matr.isEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.invert(matr));
            }
            else {
                return false;
            }
        };
        matr_2.isSizeEqual = function (matr1, matr2) {
            return Chalkboard.matr.rows(matr1) === Chalkboard.matr.rows(matr2) && Chalkboard.matr.cols(matr1) === Chalkboard.matr.cols(matr2);
        };
        matr_2.isSizeOf = function (matr, rows, cols) {
            if (cols === void 0) { cols = rows; }
            return Chalkboard.matr.rows(matr) === rows && Chalkboard.matr.cols(matr) === cols;
        };
        matr_2.isSkewSymmetric = function (matr) {
            return Chalkboard.matr.isEqual(Chalkboard.matr.transpose(matr), Chalkboard.matr.negate(matr));
        };
        matr_2.isSquare = function (matr) {
            return Chalkboard.matr.rows(matr) === Chalkboard.matr.cols(matr);
        };
        matr_2.isSymmetric = function (matr) {
            return Chalkboard.matr.isEqual(matr, Chalkboard.matr.transpose(matr));
        };
        matr_2.isUpperTriangular = function (matr) {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.isSizeOf(matr, 2)) {
                    return matr[1][0] === 0;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                    return matr[1][0] === 0 && matr[2][0] === 0 && matr[2][1] === 0;
                }
                else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                    return matr[1][0] === 0 && matr[2][0] === 0 && matr[2][1] === 0 && matr[3][0] === 0 && matr[3][1] === 0 && matr[3][2] === 0;
                }
                else {
                    var score = 0;
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        for (var j = 0; j < i; j++) {
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
        matr_2.isZero = function (matr) {
            return Chalkboard.matr.isEqual(matr, Chalkboard.matr.zero(matr));
        };
        matr_2.Lehmer = function (size) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result.push([]);
                    for (var j = 0; j < size; j++) {
                        result[i].push(Math.min(i + 1, j + 1) / Math.max(i + 1, j + 1));
                    }
                }
                return result;
            }
        };
        matr_2.lowerBinomial = function (size) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result.push([]);
                    for (var j = 0; j < size; j++) {
                        result[i].push(Chalkboard.numb.binomial(i, j));
                    }
                }
                return result;
            }
        };
        matr_2.lowerShift = function (size) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result[i] = [];
                    for (var j = 0; j < size; j++) {
                        result[i][j] = Chalkboard.numb.Kronecker(i, j + 1);
                    }
                }
                return result;
            }
        };
        matr_2.lowerTriangular = function (size) {
            var elements = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                elements[_i - 1] = arguments[_i];
            }
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
                var result = Chalkboard.matr.init();
                var index = 0;
                for (var i = 0; i < size; i++) {
                    result[i] = [];
                    for (var j = 0; j < size; j++) {
                        result[i][j] = j <= i ? elements[index++] || 0 : 0;
                    }
                }
                return result;
            }
        };
        matr_2.LUdecomp = function (matr) {
            if (Chalkboard.matr.isSquare(matr)) {
                var L = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)), U = Chalkboard.matr.fill(0, Chalkboard.matr.rows(matr));
                for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                    for (var i = 0; i <= j; i++) {
                        var sum = 0;
                        for (var k = 0; k < i; k++) {
                            sum += L[i][k] * U[k][j];
                        }
                        U[i][j] = matr[i][j] - sum;
                    }
                    for (var i = j + 1; i < Chalkboard.matr.rows(matr); i++) {
                        var sum = 0;
                        for (var k = 0; k < j; k++) {
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
        matr_2.mul = function (matr1, matr2) {
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
                    return Chalkboard.matr.init([
                        matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0],
                        matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1],
                        matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2]
                    ], [
                        matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0],
                        matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1],
                        matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2]
                    ], [
                        matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0],
                        matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1],
                        matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2]
                    ]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4, 1)) {
                    return Chalkboard.matr.init([matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0]], [matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0]], [matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0]], [matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0]]);
                }
                else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4)) {
                    return Chalkboard.matr.init([
                        matr1[0][0] * matr2[0][0] + matr1[0][1] * matr2[1][0] + matr1[0][2] * matr2[2][0] + matr1[0][3] * matr2[3][0],
                        matr1[0][0] * matr2[0][1] + matr1[0][1] * matr2[1][1] + matr1[0][2] * matr2[2][1] + matr1[0][3] * matr2[3][1],
                        matr1[0][0] * matr2[0][2] + matr1[0][1] * matr2[1][2] + matr1[0][2] * matr2[2][2] + matr1[0][3] * matr2[3][2],
                        matr1[0][0] * matr2[0][3] + matr1[0][1] * matr2[1][3] + matr1[0][2] * matr2[2][3] + matr1[0][3] * matr2[3][3]
                    ], [
                        matr1[1][0] * matr2[0][0] + matr1[1][1] * matr2[1][0] + matr1[1][2] * matr2[2][0] + matr1[1][3] * matr2[3][0],
                        matr1[1][0] * matr2[0][1] + matr1[1][1] * matr2[1][1] + matr1[1][2] * matr2[2][1] + matr1[1][3] * matr2[3][1],
                        matr1[1][0] * matr2[0][2] + matr1[1][1] * matr2[1][2] + matr1[1][2] * matr2[2][2] + matr1[1][3] * matr2[3][2],
                        matr1[1][0] * matr2[0][3] + matr1[1][1] * matr2[1][3] + matr1[1][2] * matr2[2][3] + matr1[1][3] * matr2[3][3]
                    ], [
                        matr1[2][0] * matr2[0][0] + matr1[2][1] * matr2[1][0] + matr1[2][2] * matr2[2][0] + matr1[2][3] * matr2[3][0],
                        matr1[2][0] * matr2[0][1] + matr1[2][1] * matr2[1][1] + matr1[2][2] * matr2[2][1] + matr1[2][3] * matr2[3][1],
                        matr1[2][0] * matr2[0][2] + matr1[2][1] * matr2[1][2] + matr1[2][2] * matr2[2][2] + matr1[2][3] * matr2[3][2],
                        matr1[2][0] * matr2[0][3] + matr1[2][1] * matr2[1][3] + matr1[2][2] * matr2[2][3] + matr1[2][3] * matr2[3][3]
                    ], [
                        matr1[3][0] * matr2[0][0] + matr1[3][1] * matr2[1][0] + matr1[3][2] * matr2[2][0] + matr1[3][3] * matr2[3][0],
                        matr1[3][0] * matr2[0][1] + matr1[3][1] * matr2[1][1] + matr1[3][2] * matr2[2][1] + matr1[3][3] * matr2[3][1],
                        matr1[3][0] * matr2[0][2] + matr1[3][1] * matr2[1][2] + matr1[3][2] * matr2[2][2] + matr1[3][3] * matr2[3][2],
                        matr1[3][0] * matr2[0][3] + matr1[3][1] * matr2[1][3] + matr1[3][2] * matr2[2][3] + matr1[3][3] * matr2[3][3]
                    ]);
                }
                else {
                    var result = Chalkboard.matr.init();
                    for (var i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (var j = 0; j < Chalkboard.matr.cols(matr2); j++) {
                            result[i][j] = 0;
                            for (var k = 0; k < Chalkboard.matr.cols(matr1); k++) {
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
        matr_2.mulKronecker = function (matr1, matr2) {
            if (Chalkboard.matr.isSizeOf(matr1, 2) && Chalkboard.matr.isSizeOf(matr2, 2)) {
                return Chalkboard.matr.init([matr1[0][0] * matr2[0][0], matr1[0][0] * matr2[0][1], matr1[0][1] * matr2[0][0], matr1[0][1] * matr2[0][1]], [matr1[0][0] * matr2[1][0], matr1[0][0] * matr2[1][1], matr1[0][1] * matr2[1][0], matr1[0][1] * matr2[1][1]], [matr1[1][0] * matr2[0][0], matr1[1][0] * matr2[0][1], matr1[1][1] * matr2[0][0], matr1[1][1] * matr2[0][1]], [matr1[1][0] * matr2[1][0], matr1[1][0] * matr2[1][1], matr1[1][1] * matr2[1][0], matr1[1][1] * matr2[1][1]]);
            }
            else if (Chalkboard.matr.isSizeOf(matr1, 3) && Chalkboard.matr.isSizeOf(matr2, 3)) {
                return Chalkboard.matr.init([
                    matr1[0][0] * matr2[0][0],
                    matr1[0][0] * matr2[0][1],
                    matr1[0][0] * matr2[0][2],
                    matr1[0][1] * matr2[0][0],
                    matr1[0][1] * matr2[0][1],
                    matr1[0][1] * matr2[0][2],
                    matr1[0][2] * matr2[0][0],
                    matr1[0][2] * matr2[0][1],
                    matr1[0][2] * matr2[0][2]
                ], [
                    matr1[0][0] * matr2[1][0],
                    matr1[0][0] * matr2[1][1],
                    matr1[0][0] * matr2[1][2],
                    matr1[0][1] * matr2[1][0],
                    matr1[0][1] * matr2[1][1],
                    matr1[0][1] * matr2[1][2],
                    matr1[0][2] * matr2[1][0],
                    matr1[0][2] * matr2[1][1],
                    matr1[0][2] * matr2[1][2]
                ], [
                    matr1[0][0] * matr2[2][0],
                    matr1[0][0] * matr2[2][1],
                    matr1[0][0] * matr2[2][2],
                    matr1[0][1] * matr2[2][0],
                    matr1[0][1] * matr2[2][1],
                    matr1[0][1] * matr2[2][2],
                    matr1[0][2] * matr2[2][0],
                    matr1[0][2] * matr2[2][1],
                    matr1[0][2] * matr2[2][2]
                ], [
                    matr1[1][0] * matr2[0][0],
                    matr1[1][0] * matr2[0][1],
                    matr1[1][0] * matr2[0][2],
                    matr1[1][1] * matr2[0][0],
                    matr1[1][1] * matr2[0][1],
                    matr1[1][1] * matr2[0][2],
                    matr1[1][2] * matr2[0][0],
                    matr1[1][2] * matr2[0][1],
                    matr1[1][2] * matr2[0][2]
                ], [
                    matr1[1][0] * matr2[1][0],
                    matr1[1][0] * matr2[1][1],
                    matr1[1][0] * matr2[1][2],
                    matr1[1][1] * matr2[1][0],
                    matr1[1][1] * matr2[1][1],
                    matr1[1][1] * matr2[1][2],
                    matr1[1][2] * matr2[1][0],
                    matr1[1][2] * matr2[1][1],
                    matr1[1][2] * matr2[1][2]
                ], [
                    matr1[1][0] * matr2[2][0],
                    matr1[1][0] * matr2[2][1],
                    matr1[1][0] * matr2[2][2],
                    matr1[1][1] * matr2[2][0],
                    matr1[1][1] * matr2[2][1],
                    matr1[1][1] * matr2[2][2],
                    matr1[1][2] * matr2[2][0],
                    matr1[1][2] * matr2[2][1],
                    matr1[1][2] * matr2[2][2]
                ], [
                    matr1[2][0] * matr2[0][0],
                    matr1[2][0] * matr2[0][1],
                    matr1[2][0] * matr2[0][2],
                    matr1[2][1] * matr2[0][0],
                    matr1[2][1] * matr2[0][1],
                    matr1[2][1] * matr2[0][2],
                    matr1[2][2] * matr2[0][0],
                    matr1[2][2] * matr2[0][1],
                    matr1[2][2] * matr2[0][2]
                ], [
                    matr1[2][0] * matr2[1][0],
                    matr1[2][0] * matr2[1][1],
                    matr1[2][0] * matr2[1][2],
                    matr1[2][1] * matr2[1][0],
                    matr1[2][1] * matr2[1][1],
                    matr1[2][1] * matr2[1][2],
                    matr1[2][2] * matr2[1][0],
                    matr1[2][2] * matr2[1][1],
                    matr1[2][2] * matr2[1][2]
                ], [
                    matr1[2][0] * matr2[2][0],
                    matr1[2][0] * matr2[2][1],
                    matr1[2][0] * matr2[2][2],
                    matr1[2][1] * matr2[2][0],
                    matr1[2][1] * matr2[2][1],
                    matr1[2][1] * matr2[2][2],
                    matr1[2][2] * matr2[2][0],
                    matr1[2][2] * matr2[2][1],
                    matr1[2][2] * matr2[2][2]
                ]);
            }
            else if (Chalkboard.matr.isSizeOf(matr1, 4) && Chalkboard.matr.isSizeOf(matr2, 4)) {
                return Chalkboard.matr.init([
                    matr1[0][0] * matr2[0][0],
                    matr1[0][0] * matr2[0][1],
                    matr1[0][0] * matr2[0][2],
                    matr1[0][0] * matr2[0][3],
                    matr1[0][1] * matr2[0][0],
                    matr1[0][1] * matr2[0][1],
                    matr1[0][1] * matr2[0][2],
                    matr1[0][1] * matr2[0][3],
                    matr1[0][2] * matr2[0][0],
                    matr1[0][2] * matr2[0][1],
                    matr1[0][2] * matr2[0][2],
                    matr1[0][2] * matr2[0][3],
                    matr1[0][3] * matr2[0][0],
                    matr1[0][3] * matr2[0][1],
                    matr1[0][3] * matr2[0][2],
                    matr1[0][3] * matr2[0][3]
                ], [
                    matr1[0][0] * matr2[1][0],
                    matr1[0][0] * matr2[1][1],
                    matr1[0][0] * matr2[1][2],
                    matr1[0][0] * matr2[1][3],
                    matr1[0][1] * matr2[1][0],
                    matr1[0][1] * matr2[1][1],
                    matr1[0][1] * matr2[1][2],
                    matr1[0][1] * matr2[1][3],
                    matr1[0][2] * matr2[1][0],
                    matr1[0][2] * matr2[1][1],
                    matr1[0][2] * matr2[1][2],
                    matr1[0][2] * matr2[1][3],
                    matr1[0][3] * matr2[1][0],
                    matr1[0][3] * matr2[1][1],
                    matr1[0][3] * matr2[1][2],
                    matr1[0][3] * matr2[1][3]
                ], [
                    matr1[0][0] * matr2[2][0],
                    matr1[0][0] * matr2[2][1],
                    matr1[0][0] * matr2[2][2],
                    matr1[0][0] * matr2[2][3],
                    matr1[0][1] * matr2[2][0],
                    matr1[0][1] * matr2[2][1],
                    matr1[0][1] * matr2[2][2],
                    matr1[0][1] * matr2[2][3],
                    matr1[0][2] * matr2[2][0],
                    matr1[0][2] * matr2[2][1],
                    matr1[0][2] * matr2[2][2],
                    matr1[0][2] * matr2[2][3],
                    matr1[0][3] * matr2[2][0],
                    matr1[0][3] * matr2[2][1],
                    matr1[0][3] * matr2[2][2],
                    matr1[0][3] * matr2[2][3]
                ], [
                    matr1[0][0] * matr2[3][0],
                    matr1[0][0] * matr2[3][1],
                    matr1[0][0] * matr2[3][2],
                    matr1[0][0] * matr2[3][3],
                    matr1[0][1] * matr2[3][0],
                    matr1[0][1] * matr2[3][1],
                    matr1[0][1] * matr2[3][2],
                    matr1[0][1] * matr2[3][3],
                    matr1[0][2] * matr2[3][0],
                    matr1[0][2] * matr2[3][1],
                    matr1[0][2] * matr2[3][2],
                    matr1[0][2] * matr2[3][3],
                    matr1[0][3] * matr2[3][0],
                    matr1[0][3] * matr2[3][1],
                    matr1[0][3] * matr2[3][2],
                    matr1[0][3] * matr2[3][3]
                ], [
                    matr1[1][0] * matr2[0][0],
                    matr1[1][0] * matr2[0][1],
                    matr1[1][0] * matr2[0][2],
                    matr1[1][0] * matr2[0][3],
                    matr1[1][1] * matr2[0][0],
                    matr1[1][1] * matr2[0][1],
                    matr1[1][1] * matr2[0][2],
                    matr1[1][1] * matr2[0][3],
                    matr1[1][2] * matr2[0][0],
                    matr1[1][2] * matr2[0][1],
                    matr1[1][2] * matr2[0][2],
                    matr1[1][2] * matr2[0][3],
                    matr1[1][3] * matr2[0][0],
                    matr1[1][3] * matr2[0][1],
                    matr1[1][3] * matr2[0][2],
                    matr1[1][3] * matr2[0][3]
                ], [
                    matr1[1][0] * matr2[1][0],
                    matr1[1][0] * matr2[1][1],
                    matr1[1][0] * matr2[1][2],
                    matr1[1][0] * matr2[1][3],
                    matr1[1][1] * matr2[1][0],
                    matr1[1][1] * matr2[1][1],
                    matr1[1][1] * matr2[1][2],
                    matr1[1][1] * matr2[1][3],
                    matr1[1][2] * matr2[1][0],
                    matr1[1][2] * matr2[1][1],
                    matr1[1][2] * matr2[1][2],
                    matr1[1][2] * matr2[1][3],
                    matr1[1][3] * matr2[1][0],
                    matr1[1][3] * matr2[1][1],
                    matr1[1][3] * matr2[1][2],
                    matr1[1][3] * matr2[1][3]
                ], [
                    matr1[1][0] * matr2[2][0],
                    matr1[1][0] * matr2[2][1],
                    matr1[1][0] * matr2[2][2],
                    matr1[1][0] * matr2[2][3],
                    matr1[1][1] * matr2[2][0],
                    matr1[1][1] * matr2[2][1],
                    matr1[1][1] * matr2[2][2],
                    matr1[1][1] * matr2[2][3],
                    matr1[1][2] * matr2[2][0],
                    matr1[1][2] * matr2[2][1],
                    matr1[1][2] * matr2[2][2],
                    matr1[1][2] * matr2[2][3],
                    matr1[1][3] * matr2[2][0],
                    matr1[1][3] * matr2[2][1],
                    matr1[1][3] * matr2[2][2],
                    matr1[1][3] * matr2[2][3]
                ], [
                    matr1[1][0] * matr2[3][0],
                    matr1[1][0] * matr2[3][1],
                    matr1[1][0] * matr2[3][2],
                    matr1[1][0] * matr2[3][3],
                    matr1[1][1] * matr2[3][0],
                    matr1[1][1] * matr2[3][1],
                    matr1[1][1] * matr2[3][2],
                    matr1[1][1] * matr2[3][3],
                    matr1[1][2] * matr2[3][0],
                    matr1[1][2] * matr2[3][1],
                    matr1[1][2] * matr2[3][2],
                    matr1[1][2] * matr2[3][3],
                    matr1[1][3] * matr2[3][0],
                    matr1[1][3] * matr2[3][1],
                    matr1[1][3] * matr2[3][2],
                    matr1[1][3] * matr2[3][3]
                ], [
                    matr1[2][0] * matr2[0][0],
                    matr1[2][0] * matr2[0][1],
                    matr1[2][0] * matr2[0][2],
                    matr1[2][0] * matr2[0][3],
                    matr1[2][1] * matr2[0][0],
                    matr1[2][1] * matr2[0][1],
                    matr1[2][1] * matr2[0][2],
                    matr1[2][1] * matr2[0][3],
                    matr1[2][2] * matr2[0][0],
                    matr1[2][2] * matr2[0][1],
                    matr1[2][2] * matr2[0][2],
                    matr1[2][2] * matr2[0][3],
                    matr1[2][3] * matr2[0][0],
                    matr1[2][3] * matr2[0][1],
                    matr1[2][3] * matr2[0][2],
                    matr1[2][3] * matr2[0][3]
                ], [
                    matr1[2][0] * matr2[1][0],
                    matr1[2][0] * matr2[1][1],
                    matr1[2][0] * matr2[1][2],
                    matr1[2][0] * matr2[1][3],
                    matr1[2][1] * matr2[1][0],
                    matr1[2][1] * matr2[1][1],
                    matr1[2][1] * matr2[1][2],
                    matr1[2][1] * matr2[1][3],
                    matr1[2][2] * matr2[1][0],
                    matr1[2][2] * matr2[1][1],
                    matr1[2][2] * matr2[1][2],
                    matr1[2][2] * matr2[1][3],
                    matr1[2][3] * matr2[1][0],
                    matr1[2][3] * matr2[1][1],
                    matr1[2][3] * matr2[1][2],
                    matr1[2][3] * matr2[1][3]
                ], [
                    matr1[2][0] * matr2[2][0],
                    matr1[2][0] * matr2[2][1],
                    matr1[2][0] * matr2[2][2],
                    matr1[2][0] * matr2[2][3],
                    matr1[2][1] * matr2[2][0],
                    matr1[2][1] * matr2[2][1],
                    matr1[2][1] * matr2[2][2],
                    matr1[2][1] * matr2[2][3],
                    matr1[2][2] * matr2[2][0],
                    matr1[2][2] * matr2[2][1],
                    matr1[2][2] * matr2[2][2],
                    matr1[2][2] * matr2[2][3],
                    matr1[2][3] * matr2[2][0],
                    matr1[2][3] * matr2[2][1],
                    matr1[2][3] * matr2[2][2],
                    matr1[2][3] * matr2[2][3]
                ], [
                    matr1[2][0] * matr2[3][0],
                    matr1[2][0] * matr2[3][1],
                    matr1[2][0] * matr2[3][2],
                    matr1[2][0] * matr2[3][3],
                    matr1[2][1] * matr2[3][0],
                    matr1[2][1] * matr2[3][1],
                    matr1[2][1] * matr2[3][2],
                    matr1[2][1] * matr2[3][3],
                    matr1[2][2] * matr2[3][0],
                    matr1[2][2] * matr2[3][1],
                    matr1[2][2] * matr2[3][2],
                    matr1[2][2] * matr2[3][3],
                    matr1[2][3] * matr2[3][0],
                    matr1[2][3] * matr2[3][1],
                    matr1[2][3] * matr2[3][2],
                    matr1[2][3] * matr2[3][3]
                ], [
                    matr1[3][0] * matr2[0][0],
                    matr1[3][0] * matr2[0][1],
                    matr1[3][0] * matr2[0][2],
                    matr1[3][0] * matr2[0][3],
                    matr1[3][1] * matr2[0][0],
                    matr1[3][1] * matr2[0][1],
                    matr1[3][1] * matr2[0][2],
                    matr1[3][1] * matr2[0][3],
                    matr1[3][2] * matr2[0][0],
                    matr1[3][2] * matr2[0][1],
                    matr1[3][2] * matr2[0][2],
                    matr1[3][2] * matr2[0][3],
                    matr1[3][3] * matr2[0][0],
                    matr1[3][3] * matr2[0][1],
                    matr1[3][3] * matr2[0][2],
                    matr1[3][3] * matr2[0][3]
                ], [
                    matr1[3][0] * matr2[1][0],
                    matr1[3][0] * matr2[1][1],
                    matr1[3][0] * matr2[1][2],
                    matr1[3][0] * matr2[1][3],
                    matr1[3][1] * matr2[1][0],
                    matr1[3][1] * matr2[1][1],
                    matr1[3][1] * matr2[1][2],
                    matr1[3][1] * matr2[1][3],
                    matr1[3][2] * matr2[1][0],
                    matr1[3][2] * matr2[1][1],
                    matr1[3][2] * matr2[1][2],
                    matr1[3][2] * matr2[1][3],
                    matr1[3][3] * matr2[1][0],
                    matr1[3][3] * matr2[1][1],
                    matr1[3][3] * matr2[1][2],
                    matr1[3][3] * matr2[1][3]
                ], [
                    matr1[3][0] * matr2[2][0],
                    matr1[3][0] * matr2[2][1],
                    matr1[3][0] * matr2[2][2],
                    matr1[3][0] * matr2[2][3],
                    matr1[3][1] * matr2[2][0],
                    matr1[3][1] * matr2[2][1],
                    matr1[3][1] * matr2[2][2],
                    matr1[3][1] * matr2[2][3],
                    matr1[3][2] * matr2[2][0],
                    matr1[3][2] * matr2[2][1],
                    matr1[3][2] * matr2[2][2],
                    matr1[3][2] * matr2[2][3],
                    matr1[3][3] * matr2[2][0],
                    matr1[3][3] * matr2[2][1],
                    matr1[3][3] * matr2[2][2],
                    matr1[3][3] * matr2[2][3]
                ], [
                    matr1[3][0] * matr2[3][0],
                    matr1[3][0] * matr2[3][1],
                    matr1[3][0] * matr2[3][2],
                    matr1[3][0] * matr2[3][3],
                    matr1[3][1] * matr2[3][0],
                    matr1[3][1] * matr2[3][1],
                    matr1[3][1] * matr2[3][2],
                    matr1[3][1] * matr2[3][3],
                    matr1[3][2] * matr2[3][0],
                    matr1[3][2] * matr2[3][1],
                    matr1[3][2] * matr2[3][2],
                    matr1[3][2] * matr2[3][3],
                    matr1[3][3] * matr2[3][0],
                    matr1[3][3] * matr2[3][1],
                    matr1[3][3] * matr2[3][2],
                    matr1[3][3] * matr2[3][3]
                ]);
            }
            else {
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                    for (var j = 0; j < Chalkboard.matr.cols(matr1); j++) {
                        for (var k = 0; k < Chalkboard.matr.rows(matr2); k++) {
                            for (var l = 0; l < Chalkboard.matr.cols(matr2); l++) {
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
        matr_2.mulVector = function (matr, vect) {
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
        matr_2.negate = function (matr) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = -matr[i][j];
                    }
                }
                return result;
            }
        };
        matr_2.norm = function (matr, p, q) {
            if (p === void 0) { p = 2; }
            if (q === void 0) { q = 2; }
            if (Chalkboard.matr.isSizeOf(matr, 2) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] +
                    matr[0][1] * matr[0][1] +
                    matr[0][2] * matr[0][2] +
                    matr[1][0] * matr[1][0] +
                    matr[1][1] * matr[1][1] +
                    matr[1][2] * matr[1][2] +
                    matr[2][0] * matr[2][0] +
                    matr[2][1] * matr[2][1] +
                    matr[2][2] * matr[2][2]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4) && p === 2 && q === 2) {
                return Chalkboard.real.sqrt(matr[0][0] * matr[0][0] +
                    matr[0][1] * matr[0][1] +
                    matr[0][2] * matr[0][2] +
                    matr[0][3] * matr[0][3] +
                    matr[1][0] * matr[1][0] +
                    matr[1][1] * matr[1][1] +
                    matr[1][2] * matr[1][2] +
                    matr[1][3] * matr[1][3] +
                    matr[2][0] * matr[2][0] +
                    matr[2][1] * matr[2][1] +
                    matr[2][2] * matr[2][2] +
                    matr[2][3] * matr[2][3] +
                    matr[3][0] * matr[3][0] +
                    matr[3][1] * matr[3][1] +
                    matr[3][2] * matr[3][2] +
                    matr[3][3] * matr[3][3]);
            }
            else {
                var result = 0;
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    var rowResult = 0;
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        rowResult += Chalkboard.real.pow(matr[i][j], p);
                    }
                    result += Chalkboard.real.pow(rowResult, q / p);
                }
                return Chalkboard.real.pow(result, 1 / q);
            }
        };
        matr_2.normalize = function (matr, p, q) {
            if (p === void 0) { p = 2; }
            if (q === void 0) { q = 2; }
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q)], [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([matr[0][0] / Chalkboard.matr.norm(matr, p, q), matr[0][1] / Chalkboard.matr.norm(matr, p, q), matr[0][2] / Chalkboard.matr.norm(matr, p, q)], [matr[1][0] / Chalkboard.matr.norm(matr, p, q), matr[1][1] / Chalkboard.matr.norm(matr, p, q), matr[1][2] / Chalkboard.matr.norm(matr, p, q)], [matr[2][0] / Chalkboard.matr.norm(matr, p, q), matr[2][1] / Chalkboard.matr.norm(matr, p, q), matr[2][2] / Chalkboard.matr.norm(matr, p, q)]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([
                    matr[0][0] / Chalkboard.matr.norm(matr, p, q),
                    matr[0][1] / Chalkboard.matr.norm(matr, p, q),
                    matr[0][2] / Chalkboard.matr.norm(matr, p, q),
                    matr[0][3] / Chalkboard.matr.norm(matr, p, q)
                ], [
                    matr[1][0] / Chalkboard.matr.norm(matr, p, q),
                    matr[1][1] / Chalkboard.matr.norm(matr, p, q),
                    matr[1][2] / Chalkboard.matr.norm(matr, p, q),
                    matr[1][3] / Chalkboard.matr.norm(matr, p, q)
                ], [
                    matr[2][0] / Chalkboard.matr.norm(matr, p, q),
                    matr[2][1] / Chalkboard.matr.norm(matr, p, q),
                    matr[2][2] / Chalkboard.matr.norm(matr, p, q),
                    matr[2][3] / Chalkboard.matr.norm(matr, p, q)
                ], [
                    matr[3][0] / Chalkboard.matr.norm(matr, p, q),
                    matr[3][1] / Chalkboard.matr.norm(matr, p, q),
                    matr[3][2] / Chalkboard.matr.norm(matr, p, q),
                    matr[3][3] / Chalkboard.matr.norm(matr, p, q)
                ]);
            }
            else {
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = matr[i][j] / Chalkboard.matr.norm(matr, p, q);
                    }
                }
                return result;
            }
        };
        matr_2.normsq = function (matr, p, q) {
            if (p === void 0) { p = 2; }
            if (q === void 0) { q = 2; }
            if (Chalkboard.matr.isSizeOf(matr, 2) && p === 2 && q === 2) {
                return matr[0][0] * matr[0][0] + matr[0][1] * matr[0][1] + matr[1][0] * matr[1][0] + matr[1][1] * matr[1][1];
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3) && p === 2 && q === 2) {
                return (matr[0][0] * matr[0][0] +
                    matr[0][1] * matr[0][1] +
                    matr[0][2] * matr[0][2] +
                    matr[1][0] * matr[1][0] +
                    matr[1][1] * matr[1][1] +
                    matr[1][2] * matr[1][2] +
                    matr[2][0] * matr[2][0] +
                    matr[2][1] * matr[2][1] +
                    matr[2][2] * matr[2][2]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4) && p === 2 && q === 2) {
                return (matr[0][0] * matr[0][0] +
                    matr[0][1] * matr[0][1] +
                    matr[0][2] * matr[0][2] +
                    matr[0][3] * matr[0][3] +
                    matr[1][0] * matr[1][0] +
                    matr[1][1] * matr[1][1] +
                    matr[1][2] * matr[1][2] +
                    matr[1][3] * matr[1][3] +
                    matr[2][0] * matr[2][0] +
                    matr[2][1] * matr[2][1] +
                    matr[2][2] * matr[2][2] +
                    matr[2][3] * matr[2][3] +
                    matr[3][0] * matr[3][0] +
                    matr[3][1] * matr[3][1] +
                    matr[3][2] * matr[3][2] +
                    matr[3][3] * matr[3][3]);
            }
            else {
                var result = 0;
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    var rowResult = 0;
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        rowResult += Chalkboard.real.pow(matr[i][j], p);
                    }
                    result += Chalkboard.real.pow(rowResult, q / p);
                }
                return result;
            }
        };
        matr_2.nullspace = function (matr) {
            var augmented = matr.map(function (row) {
                return row.slice().concat(Array(Chalkboard.matr.rows(matr)).fill(0));
            });
            var rowEchelonForm = Chalkboard.matr.Gaussian(augmented);
            return rowEchelonForm
                .filter(function (row) {
                return row.slice(0, Chalkboard.matr.rows(matr)).every(function (element) {
                    return element === 0;
                });
            })
                .map(function (row) {
                return row.slice(Chalkboard.matr.rows(matr));
            });
        };
        matr_2.perm = function (matr) {
            if (Chalkboard.matr.isSquare(matr)) {
                if (Chalkboard.matr.rows(matr) === 1) {
                    return matr[0][0];
                }
                else if (Chalkboard.matr.rows(matr) === 2) {
                    return matr[0][0] * matr[1][1] + matr[0][1] * matr[1][0];
                }
                else if (Chalkboard.matr.rows(matr) === 3) {
                    return (matr[0][0] * (matr[1][1] * matr[2][2] + matr[1][2] * matr[2][1]) +
                        matr[0][1] * (matr[1][0] * matr[2][2] + matr[1][2] * matr[2][0]) +
                        matr[0][2] * (matr[1][0] * matr[2][1] + matr[1][1] * matr[2][0]));
                }
                else if (Chalkboard.matr.rows(matr) === 4) {
                    return (matr[0][0] *
                        (matr[1][1] * (matr[2][2] * matr[3][3] + matr[2][3] * matr[3][2]) +
                            matr[1][2] * (matr[2][1] * matr[3][3] + matr[2][3] * matr[3][1]) +
                            matr[1][3] * (matr[2][1] * matr[3][2] + matr[2][2] * matr[3][1])) +
                        matr[0][1] *
                            (matr[1][0] * (matr[2][2] * matr[3][3] + matr[2][3] * matr[3][2]) +
                                matr[1][2] * (matr[2][0] * matr[3][3] + matr[2][3] * matr[3][0]) +
                                matr[1][3] * (matr[2][0] * matr[3][2] + matr[2][2] * matr[3][0])) +
                        matr[0][2] *
                            (matr[1][0] * (matr[2][1] * matr[3][3] + matr[2][3] * matr[3][1]) +
                                matr[1][1] * (matr[2][0] * matr[3][3] + matr[2][3] * matr[3][0]) +
                                matr[1][3] * (matr[2][0] * matr[3][1] + matr[2][1] * matr[3][0])) +
                        matr[0][3] *
                            (matr[1][0] * (matr[2][1] * matr[3][2] + matr[2][2] * matr[3][1]) +
                                matr[1][1] * (matr[2][0] * matr[3][2] + matr[2][2] * matr[3][0]) +
                                matr[1][2] * (matr[2][0] * matr[3][1] + matr[2][1] * matr[3][0])));
                }
                else {
                    var result = 0;
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        var cofactor_2 = matr[0][i] * Chalkboard.matr.perm(Chalkboard.matr.cofactor(matr, 0, i));
                        result += Math.abs(cofactor_2);
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_2.pow = function (matr, num) {
            if (Chalkboard.matr.isSquare(matr)) {
                if (num === 0) {
                    return Chalkboard.matr.identity(Chalkboard.matr.rows(matr));
                }
                else {
                    var result = matr;
                    for (var i = 1; i < num; i++) {
                        result = Chalkboard.matr.mul(matr, result);
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_2.print = function (matr) {
            console.log(Chalkboard.matr.toString(matr));
        };
        matr_2.pull = function (matr, index, axis) {
            if (axis === 0) {
                matr.splice(index, 1);
                return matr;
            }
            else if (axis === 1) {
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(index, 1);
                }
                return matr;
            }
            else {
                throw new TypeError('Parameter "axis" must be 0 or 1.');
            }
        };
        matr_2.push = function (matr, index, axis, elements) {
            if (axis === 0) {
                matr.splice(index, 0, elements);
                return matr;
            }
            else if (axis === 1) {
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    matr[i].splice(index, 0, elements[i]);
                }
                return matr;
            }
            else {
                throw new TypeError('Parameter "axis" must be 0 or 1.');
            }
        };
        matr_2.QRdecomp = function (matr) {
            var Q = Chalkboard.matr.identity(Chalkboard.matr.rows(matr)), R = Chalkboard.matr.copy(matr);
            for (var j = 0; j < Math.min(Chalkboard.matr.rows(matr), Chalkboard.matr.cols(matr)) - (Chalkboard.matr.rows(matr) > Chalkboard.matr.cols(matr) ? 0 : 1); j++) {
                var norm_1 = 0;
                for (var i = j; i < Chalkboard.matr.rows(matr); i++) {
                    norm_1 += R[i][j] * R[i][j];
                }
                norm_1 = Chalkboard.real.sqrt(norm_1);
                var v = [];
                v[0] = norm_1 - R[j][j];
                var normalizer = v[0] * v[0];
                for (var i = 1; i < Chalkboard.matr.rows(matr) - j; i++) {
                    v[i] = -R[i + j][j];
                    normalizer += v[i] * v[i];
                }
                normalizer = 1 / Chalkboard.real.sqrt(normalizer);
                for (var i = 0; i < v.length; i++) {
                    v[i] *= normalizer;
                }
                R[j][j] = norm_1;
                for (var i = j + 1; i < Chalkboard.matr.rows(R); i++) {
                    R[i][j] = 0;
                }
                for (var k = j + 1; k < Chalkboard.matr.cols(R); k++) {
                    var dot = 0;
                    for (var i = 0; i < v.length; i++) {
                        dot += v[i] * R[i + j][k];
                    }
                    dot *= 2;
                    for (var i = 0; i < v.length; i++) {
                        R[i + j][k] -= dot * v[i];
                    }
                }
                for (var k = 0; k < Chalkboard.matr.cols(Q); k++) {
                    var dot = 0;
                    for (var i = 0; i < v.length; i++) {
                        dot += v[i] * Q[k][i + j];
                    }
                    dot *= 2;
                    for (var i = 0; i < v.length; i++) {
                        Q[k][i + j] -= dot * v[i];
                    }
                }
            }
            return { Q: Q, R: R };
        };
        matr_2.random = function (inf, sup, rows, cols) {
            if (cols === void 0) { cols = rows; }
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < rows; i++) {
                    result.push([]);
                    for (var j = 0; j < cols; j++) {
                        result[i].push(Chalkboard.numb.random(inf, sup));
                    }
                }
                return result;
            }
        };
        matr_2.rank = function (matr) {
            return Chalkboard.matr.Gaussian(matr).filter(function (row) {
                return row.some(function (element) {
                    return element !== 0;
                });
            }).length;
        };
        matr_2.reciprocate = function (matr) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = 1 / matr[i][j];
                    }
                }
                return result;
            }
        };
        matr_2.resize = function (matr, rows, cols) {
            if (cols === void 0) { cols = rows; }
            var result = Chalkboard.matr.init();
            var matrrows = Chalkboard.matr.rows(matr);
            var matrcols = Chalkboard.matr.cols(matr);
            for (var i = 0; i < rows; i++) {
                result.push([]);
                for (var j = 0; j < cols; j++) {
                    result[i].push(i < matrrows && j < matrcols ? matr[i][j] : 0);
                }
            }
            return result;
        };
        matr_2.rotator = function (radx, rady, radz) {
            if (rady === undefined && radz === undefined) {
                return Chalkboard.matr.init([Math.cos(radx), -Math.sin(radx)], [Math.sin(radx), Math.cos(radx)]);
            }
            else {
                var matrx = Chalkboard.matr.init([1, 0, 0], [0, Math.cos(radx), -Math.sin(radx)], [0, Math.sin(radx), Math.cos(radx)]), matry = Chalkboard.matr.init([Math.cos(rady), 0, Math.sin(rady)], [0, 1, 0], [-Math.sin(rady), 0, Math.cos(rady)]), matrz = Chalkboard.matr.init([Math.cos(radz), -Math.sin(radz), 0], [Math.sin(radz), Math.cos(radz), 0], [0, 0, 1]);
                return Chalkboard.matr.mul(Chalkboard.matr.mul(matrz, matry), matrx);
            }
        };
        matr_2.round = function (matr) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = Math.round(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_2.rows = function (matr) {
            return matr.length;
        };
        matr_2.rowspace = function (matr) {
            return Chalkboard.matr.Gaussian(matr).filter(function (row) {
                return row.some(function (element) {
                    return element !== 0;
                });
            });
        };
        matr_2.scaler = function (vect) {
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
        matr_2.scl = function (matr, num) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result[i][j] = matr[i][j] * num;
                    }
                }
                return result;
            }
        };
        matr_2.solve = function (matrA, matrB) {
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
        matr_2.sub = function (matr1, matr2) {
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
                    var result = Chalkboard.matr.init();
                    for (var i = 0; i < Chalkboard.matr.rows(matr1); i++) {
                        result[i] = [];
                        for (var j = 0; j < Chalkboard.matr.cols(matr1); j++) {
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
        matr_2.symmetricBinomial = function (size) {
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
        matr_2.toArray = function (matr) {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return [matr[0][0], matr[0][1], matr[1][0], matr[1][1]];
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return [matr[0][0], matr[0][1], matr[0][2], matr[1][0], matr[1][1], matr[1][2], matr[2][0], matr[2][1], matr[2][2]];
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return [
                    matr[0][0],
                    matr[0][1],
                    matr[0][2],
                    matr[0][3],
                    matr[1][0],
                    matr[1][1],
                    matr[1][2],
                    matr[1][3],
                    matr[2][0],
                    matr[2][1],
                    matr[2][2],
                    matr[2][3],
                    matr[3][0],
                    matr[3][1],
                    matr[3][2],
                    matr[3][3]
                ];
            }
            else {
                var result = [];
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result.push(matr[i][j]);
                    }
                }
                return result;
            }
        };
        matr_2.toObject = function (matr) {
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
                var result = {};
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result["i" + (i + 1)] = {};
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result["i" + (i + 1)]["j" + (j + 1)] = matr[i][j];
                    }
                }
                return result;
            }
        };
        matr_2.toSet = function (matr) {
            return Chalkboard.abal.set(Chalkboard.matr.toArray(matr));
        };
        matr_2.toString = function (matr) {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return "[ " + matr[0][0].toString() + " " + matr[0][1].toString() + " ]\n[ " + matr[1][0].toString() + " " + matr[1][1].toString() + " ]";
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return ("[ " +
                    matr[0][0].toString() +
                    " " +
                    matr[0][1].toString() +
                    " " +
                    matr[0][2].toString() +
                    " ]\n[ " +
                    matr[1][0].toString() +
                    " " +
                    matr[1][1].toString() +
                    " " +
                    matr[1][2].toString() +
                    " ]\n[ " +
                    matr[2][0].toString() +
                    " " +
                    matr[2][1].toString() +
                    " " +
                    matr[2][2].toString() +
                    " ]");
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return ("[ " +
                    matr[0][0].toString() +
                    " " +
                    matr[0][1].toString() +
                    " " +
                    matr[0][2].toString() +
                    " " +
                    matr[0][3].toString() +
                    " ]\n[ " +
                    matr[1][0].toString() +
                    " " +
                    matr[1][1].toString() +
                    " " +
                    matr[1][2].toString() +
                    " " +
                    matr[1][3].toString() +
                    " ]\n[ " +
                    matr[2][0].toString() +
                    " " +
                    matr[2][1].toString() +
                    " " +
                    matr[2][2].toString() +
                    " " +
                    matr[2][3].toString() +
                    " ]\n[ " +
                    matr[3][0].toString() +
                    " " +
                    matr[3][1].toString() +
                    " " +
                    matr[3][2].toString() +
                    " " +
                    matr[3][3].toString() +
                    " ]");
            }
            else {
                var result = "";
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result += "[ ";
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
                        result += matr[i][j].toString() + " ";
                    }
                    result = result.trimEnd() + " ]\n";
                }
                return result;
            }
        };
        matr_2.toTensor = function (matr) {
            var _a;
            var size = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                size[_i - 1] = arguments[_i];
            }
            size = Array.isArray(size[0]) ? size[0] : size;
            return (_a = Chalkboard.tens).resize.apply(_a, __spreadArray([matr], size, false));
        };
        matr_2.toVector = function (matr, dimension, index, axis) {
            if (index === void 0) { index = 0; }
            if (axis === void 0) { axis = 0; }
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
        matr_2.trace = function (matr) {
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
                    var result = 0;
                    for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                        result += matr[i][i];
                    }
                    return result;
                }
            }
            else {
                throw new TypeError('Parameter "matr" must be of type "ChalkboardMatrix" that is square.');
            }
        };
        matr_2.transpose = function (matr) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.cols(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.rows(matr); j++) {
                        result[i][j] = matr[j][i];
                    }
                }
                return result;
            }
        };
        matr_2.translator = function (vect) {
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
        matr_2.upperBinomial = function (size) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result.push([]);
                    for (var j = 0; j < size; j++) {
                        result[i].push(Chalkboard.numb.binomial(j, i));
                    }
                }
                return result;
            }
        };
        matr_2.upperShift = function (size) {
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
                var result = Chalkboard.matr.init();
                for (var i = 0; i < size; i++) {
                    result[i] = [];
                    for (var j = 0; j < size; j++) {
                        result[i][j] = Chalkboard.numb.Kronecker(i + 1, j);
                    }
                }
                return result;
            }
        };
        matr_2.upperTriangular = function (size) {
            var elements = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                elements[_i - 1] = arguments[_i];
            }
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
                var result = Chalkboard.matr.init();
                var index = 0;
                for (var i = 0; i < size; i++) {
                    result[i] = [];
                    for (var j = 0; j < size; j++) {
                        result[i][j] = j >= i ? elements[index++] || 0 : 0;
                    }
                }
                return result;
            }
        };
        matr_2.zero = function (matr) {
            if (Chalkboard.matr.isSizeOf(matr, 2)) {
                return Chalkboard.matr.init([0, 0], [0, 0]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 3)) {
                return Chalkboard.matr.init([0, 0, 0], [0, 0, 0], [0, 0, 0]);
            }
            else if (Chalkboard.matr.isSizeOf(matr, 4)) {
                return Chalkboard.matr.init([0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]);
            }
            else {
                var result = Chalkboard.matr.init();
                for (var i = 0; i < Chalkboard.matr.rows(matr); i++) {
                    result[i] = [];
                    for (var j = 0; j < Chalkboard.matr.cols(matr); j++) {
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
    var numb;
    (function (numb) {
        numb.Bernoullian = function (p) {
            if (p === void 0) { p = 0.5; }
            return Math.random() < p ? 1 : 0;
        };
        numb.binomial = function (n, k) {
            if (k < 0 || k > n) {
                return 0;
            }
            if (k === 0 || k === n) {
                return 1;
            }
            if (k === 1 || k === n - 1) {
                return n;
            }
            if (n - k < k) {
                k = n - k;
            }
            var result = n;
            for (var i = 2; i <= k; i++) {
                result *= (n - i + 1) / i;
            }
            return Math.round(result);
        };
        numb.change = function (initial, final) {
            return (final - initial) / initial;
        };
        numb.combination = function (n, r) {
            return Chalkboard.numb.factorial(n) / (Chalkboard.numb.factorial(n - r) * Chalkboard.numb.factorial(r));
        };
        numb.compositeArr = function (inf, sup) {
            var result = [];
            for (var i = inf; i <= sup; i++) {
                if (!Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        };
        numb.compositeCount = function (inf, sup) {
            return Chalkboard.numb.compositeArr(inf, sup).length;
        };
        numb.constrain = function (num, range) {
            if (range === void 0) { range = [0, 1]; }
            return Math.max(Math.min(num, range[1]), range[0]);
        };
        numb.divisors = function (num) {
            var result = [];
            for (var i = 1; i <= num; i++) {
                if (num % i === 0) {
                    result.push(i);
                }
            }
            return result;
        };
        numb.Euler = function (num) {
            if (num > 0) {
                var factors_1 = Chalkboard.numb.factors(num);
                for (var i = 0; i < factors_1.length; i++) {
                    num *= (factors_1[i] - 1) / factors_1[i];
                }
                return num;
            }
            else {
                return undefined;
            }
        };
        numb.exponential = function (l) {
            if (l === void 0) { l = 1; }
            return l <= 0 ? 0 : -Math.log(Math.random()) / l;
        };
        numb.factorial = function (num) {
            var n = 1;
            for (var i = 1; i <= num; i++) {
                n *= i;
            }
            return n;
        };
        numb.factors = function (num) {
            var result = [];
            while (num % 2 === 0) {
                result.push(2);
                num /= 2;
            }
            for (var i = 3; i <= Chalkboard.real.sqrt(num); i += 2) {
                while (num % i === 0) {
                    result.push(i);
                    num /= i;
                }
            }
            if (num > 2) {
                result.push(num);
            }
            return result;
        };
        numb.Fibonacci = function (num) {
            var sequence = [0, 1];
            if (sequence[num] === undefined) {
                sequence.push(Chalkboard.numb.Fibonacci(num - 1) + sequence[num - 2]);
            }
            return sequence[num];
        };
        numb.Gaussian = function (height, mean, deviation) {
            var u1 = Math.random(), u2 = Math.random();
            var random = Chalkboard.real.sqrt(-2 * Chalkboard.real.ln(u1)) * Chalkboard.trig.cos(Chalkboard.PI(2) * u2);
            return random * height * Chalkboard.real.sqrt(deviation) + mean;
        };
        numb.gcd = function (a, b) {
            if (b === 0) {
                return a;
            }
            return Chalkboard.numb.gcd(b, a % b);
        };
        numb.Goldbach = function (num) {
            if (num % 2 === 0) {
                if (num !== 4) {
                    var a = num / 2, b = num / 2;
                    if (a % 2 === 0) {
                        a--;
                        b++;
                    }
                    while (a >= 3) {
                        if (Chalkboard.numb.isPrime(a) && Chalkboard.numb.isPrime(b)) {
                            return [a, b];
                        }
                        a -= 2;
                        b += 2;
                    }
                    return undefined;
                }
                else {
                    return [2, 2];
                }
            }
            else {
                return undefined;
            }
        };
        numb.isApproxEqual = function (a, b, precision) {
            if (precision === void 0) { precision = 0.000001; }
            return Math.abs(a - b) < precision;
        };
        numb.isPrime = function (num) {
            for (var i = 2; i <= Chalkboard.real.sqrt(num); i++) {
                if (num % i === 0) {
                    return false;
                }
            }
            return num > 1;
        };
        numb.isRational = function (num, tolerance) {
            if (tolerance === void 0) { tolerance = 1e-8; }
            if (!isFinite(num))
                return false;
            try {
                var _a = Chalkboard.numb.toFraction(num, tolerance), n = _a[0], d = _a[1];
                return Math.abs(num - n / d) < tolerance;
            }
            catch (_b) {
                return false;
            }
        };
        numb.Kronecker = function (a, b) {
            if (a === b) {
                return 1;
            }
            else {
                return 0;
            }
        };
        numb.lcm = function (a, b) {
            return a * (b / Chalkboard.numb.gcd(a, b));
        };
        numb.map = function (num, range1, range2) {
            return range2[0] + (range2[1] - range2[0]) * ((num - range1[0]) / (range1[1] - range1[0]));
        };
        numb.mod = function (a, b) {
            return ((a % b) + b) % b;
        };
        numb.mul = function (formula, inf, sup) {
            var result = 1;
            var f = Chalkboard.real.parse("n => " + formula);
            for (var i = inf; i <= sup; i++) {
                result *= f(i);
            }
            return result;
        };
        numb.nextPrime = function (num) {
            var result = num + 1;
            while (!Chalkboard.numb.isPrime(result)) {
                result++;
            }
            return result;
        };
        numb.permutation = function (n, r) {
            return Chalkboard.numb.factorial(n) / Chalkboard.numb.factorial(n - r);
        };
        numb.Poissonian = function (l) {
            if (l === void 0) { l = 1; }
            if (l > 0) {
                var L = Chalkboard.E(-l);
                var p = 1, k = 0;
                for (; p > L; ++k) {
                    p *= Math.random();
                }
                return k - 1;
            }
            else {
                return 0;
            }
        };
        numb.prime = function (num) {
            if (num === 2) {
                return 2;
            }
            var n = 1;
            var prime = 3;
            while (n < num) {
                if (Chalkboard.numb.isPrime(prime)) {
                    n++;
                }
                if (n < num) {
                    prime += 2;
                }
            }
            return prime;
        };
        numb.primeArr = function (inf, sup) {
            var result = [];
            for (var i = inf; i <= sup; i++) {
                if (Chalkboard.numb.isPrime(i)) {
                    result.push(i);
                }
            }
            return result;
        };
        numb.primeCount = function (inf, sup) {
            return Chalkboard.numb.primeArr(inf, sup).length;
        };
        numb.primeGap = function (inf, sup) {
            var prime = null;
            var gap = 0;
            for (var i = inf; i <= sup; i++) {
                if (Chalkboard.numb.isPrime(i)) {
                    if (prime !== null) {
                        var temp = i - prime;
                        if (temp > gap) {
                            gap = temp;
                        }
                    }
                    prime = i;
                }
            }
            return gap;
        };
        numb.random = function (inf, sup) {
            if (inf === void 0) { inf = 0; }
            if (sup === void 0) { sup = 1; }
            return inf + (sup - inf) * Math.random();
        };
        numb.roundTo = function (num, positionalIndex) {
            return Math.round(num / positionalIndex) * positionalIndex;
        };
        numb.sgn = function (num) {
            if (num > 0) {
                return 1;
            }
            else if (num < 0) {
                return -1;
            }
            else {
                return 0;
            }
        };
        numb.sum = function (formula, inf, sup) {
            var result = 0;
            var f = Chalkboard.real.parse("n => " + formula);
            for (var i = inf; i <= sup; i++) {
                result += f(i);
            }
            return result;
        };
        numb.toFraction = function (num, tolerance) {
            if (tolerance === void 0) { tolerance = 1e-8; }
            if (!isFinite(num))
                throw new Error('The parameter "num" must be finite to be converted to a fraction.');
            var sgn = Chalkboard.numb.sgn(num);
            num *= sgn;
            if (Number.isInteger(num))
                return [sgn * num, 1];
            var h1 = 1, h2 = 0, k1 = 0, k2 = 1;
            var b = num;
            while (true) {
                var a = Math.floor(b);
                var h = a * h1 + h2, k = a * k1 + k2;
                var approx = h / k;
                if (Math.abs(num - approx) < tolerance) {
                    var g = Chalkboard.numb.gcd(h, k);
                    return [sgn * (h / g), k / g];
                }
                h2 = h1, h1 = h;
                k2 = k1, k1 = k;
                b = 1 / (b - a);
            }
        };
    })(numb = Chalkboard.numb || (Chalkboard.numb = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var real;
    (function (real) {
        real.define = function (definition, type) {
            if (type === void 0) { type = "expl"; }
            if (type === "expl") {
                return { definition: definition, type: type };
            }
            else if (type === "inve") {
                return { definition: definition, type: type };
            }
            else if (type === "pola") {
                return { definition: definition, type: type };
            }
            else if (type === "curv") {
                return definition.length === 2 ? { definition: [definition[0], definition[1]], type: type } : { definition: [definition[0], definition[1], definition[2]], type: type };
            }
            else if (type === "surf") {
                return { definition: [definition[0], definition[1], definition[2]], type: type };
            }
            else if (type === "mult") {
                return { definition: definition, type: type };
            }
            else {
                throw new TypeError('Parameter "type" must be either "expl", "inve", "pola", "curv", "surf", or "mult".');
            }
        };
        real.Dirac = function (num, edge, scl) {
            if (edge === void 0) { edge = 0; }
            if (scl === void 0) { scl = 1; }
            if (num === edge) {
                return scl;
            }
            else {
                return 0;
            }
        };
        real.discriminant = function (a, b, c, form) {
            if (form === void 0) { form = "stan"; }
            if (form === "stan") {
                return b * b - 4 * a * c;
            }
            else if (form === "vert") {
                return 2 * a * b * (2 * a * b) - 4 * a * c;
            }
            else {
                throw new TypeError('Parameter "form" must be "stan" or "vert".');
            }
        };
        real.Heaviside = function (num, edge, scl) {
            if (edge === void 0) { edge = 0; }
            if (scl === void 0) { scl = 1; }
            if (num >= edge) {
                return scl;
            }
            else {
                return 0;
            }
        };
        real.lerp = function (p, t) {
            return (p[1] - p[0]) * t + p[0];
        };
        real.linear = function (x1, y1, x2, y2) {
            return Chalkboard.real.define(Chalkboard.real.slope(x1, y1, x2, y2).toString() + " * (x - " + x2.toString() + ") + " + y2.toString());
        };
        real.linearFormula = function (a, b, c, d) {
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
        real.ln = function (num) {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / x"), 1, num);
        };
        real.log = function (base, num) {
            return Chalkboard.real.ln(num) / Chalkboard.real.ln(base);
        };
        real.log10 = function (num) {
            return Chalkboard.real.log(10, num);
        };
        real.parse = function (str) {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + " return (" + str + ")")();
        };
        real.pingpong = function (num, edge, scl) {
            if (edge === void 0) { edge = 0; }
            if (scl === void 0) { scl = 1; }
            if ((num + edge) % (2 * scl) < scl) {
                return (num + edge) % scl;
            }
            else {
                return scl - ((num + edge) % scl);
            }
        };
        real.pow = function (base, num) {
            if (base === 0 && num === 0) {
                return 1;
            }
            else {
                return Math.exp(num * Math.log(base));
            }
        };
        real.qerp = function (p1, p2, p3, t) {
            var a = p1[1] / ((p1[0] - p2[0]) * (p1[0] - p3[0])) + p2[1] / ((p2[0] - p1[0]) * (p2[0] - p3[0])) + p3[1] / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            var b = (-p1[1] * (p2[0] + p3[0])) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) -
                (p2[1] * (p1[0] + p3[0])) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) -
                (p3[1] * (p1[0] + p2[0])) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            var c = (p1[1] * p2[0] * p3[0]) / ((p1[0] - p2[0]) * (p1[0] - p3[0])) +
                (p2[1] * p1[0] * p3[0]) / ((p2[0] - p1[0]) * (p2[0] - p3[0])) +
                (p3[1] * p1[0] * p2[0]) / ((p3[0] - p1[0]) * (p3[0] - p2[0]));
            return a * t * t + b * t + c;
        };
        real.quadratic = function (a, b, c, form) {
            if (form === void 0) { form = "stan"; }
            if (form === "stan") {
                return Chalkboard.real.define(a.toString() + "* x * x + " + b.toString() + " * x +" + c.toString());
            }
            else if (form === "vert") {
                return Chalkboard.real.define(a.toString() + " * ((x - " + b.toString() + ") * (x - " + b.toString() + ")) +" + c.toString());
            }
            else {
                throw new TypeError('Parameter "form" must be "stan" or "vert".');
            }
        };
        real.quadraticFormula = function (a, b, c, form) {
            if (form === void 0) { form = "stan"; }
            if (form === "stan") {
                return [(-b + Chalkboard.real.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a), (-b - Math.sqrt(Chalkboard.real.discriminant(a, b, c, "stan"))) / (2 * a)];
            }
            else if (form === "vert") {
                return [b + Chalkboard.real.sqrt(-c / a), b - Chalkboard.real.sqrt(-c / a)];
            }
            else {
                throw new TypeError('Parameter "form" must be "stan" or "vert".');
            }
        };
        real.ramp = function (num, edge, scl) {
            if (edge === void 0) { edge = 0; }
            if (scl === void 0) { scl = 1; }
            if (num >= edge) {
                return num * scl;
            }
            else {
                return 0;
            }
        };
        real.rect = function (num, center, width, scl) {
            if (center === void 0) { center = 0; }
            if (width === void 0) { width = 2; }
            if (scl === void 0) { scl = 1; }
            if (num > center + width / 2 || num < center - width / 2) {
                return 0;
            }
            else {
                return scl;
            }
        };
        real.root = function (num, index) {
            if (index === void 0) { index = 3; }
            return Math.exp(Math.log(num) / index);
        };
        real.slope = function (x1, y1, x2, y2) {
            return (y2 - y1) / (x2 - x1);
        };
        real.sqrt = function (num) {
            if (num >= 0) {
                return Math.exp(Math.log(num) / 2);
            }
            else {
                return NaN;
            }
        };
        real.tetration = function (base, num) {
            if (num === 0) {
                return 1;
            }
            else if (num > 0) {
                return Math.pow(base, Chalkboard.real.tetration(base, num - 1));
            }
        };
        real.val = function (func, val) {
            if (func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                return f(val);
            }
            else if (func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                return f(val);
            }
            else if (func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                return r(val);
            }
            else if (func.type === "curv") {
                if (func.definition.length === 2) {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]);
                    return Chalkboard.vect.init(x(val), y(val));
                }
                else {
                    var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]), z = Chalkboard.real.parse("t => " + func.definition[2]);
                    return Chalkboard.vect.init(x(val), y(val), z(val));
                }
            }
            else if (func.type === "surf") {
                var vect_2 = val;
                var x = Chalkboard.real.parse("(s, t) => " + func.definition[0]), y = Chalkboard.real.parse("(s, t) => " + func.definition[1]), z = Chalkboard.real.parse("(s, t) => " + func.definition[2]);
                return Chalkboard.vect.init(x(vect_2.x, vect_2.y), y(vect_2.x, vect_2.y), z(vect_2.x, vect_2.y));
            }
            else if (func.type === "mult" && typeof val !== "number") {
                var vect_3 = val;
                var f = Chalkboard.real.parse("(x, y) => " + func.definition);
                return f(vect_3.x, vect_3.y);
            }
            else {
                throw new TypeError('Parameter "func" must be of type "ChalkboardFunction" with a "type" property of "expl", "pola", "curv", "surf", or "mult".');
            }
        };
    })(real = Chalkboard.real || (Chalkboard.real = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var plot;
    (function (plot) {
        var PARSED_CONTEXT = Chalkboard.real.parse(Chalkboard.CONTEXT);
        plot.autocorrelation = function (func, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.autocorrelation(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.autocorrelation(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.barplot = function (arr, bins, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "white",
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.fillStyle = config.fillStyle;
            var bars = [];
            for (var i = 0; i < bins.length; i++) {
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
            var counts = [];
            for (var i = 0; i < bars.length; i++) {
                counts.push(bars[i].length);
            }
            var x = 0;
            var width = counts.length / (2 * config.size);
            for (var i = 0; i < counts.length; i++) {
                config.context.fillRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                config.context.strokeRect(x - width, 0, 1 / config.size, -counts[i] / config.size);
                x += 1 / config.size;
            }
            config.context.restore();
            return bars;
        };
        plot.comp = function (comp, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || PARSED_CONTEXT
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
        plot.convolution = function (func1, func2, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.convolution(func1, func2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.convolution(func1, func2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.correlation = function (func1, func2, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.correlation(func1, func2, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.correlation(func1, func2, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.definition = function (func, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain ||
                    (func.type === "comp"
                        ? [
                            [-10, 10],
                            [-10, 10]
                        ]
                        : [-10, 10]),
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var xdomain = config.domain;
            var xydomain = config.domain;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if (func.type === "expl") {
                var f = Chalkboard.real.parse("x => " + func.definition);
                for (var i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(i, -f(i * config.size) / config.size);
                    data.push([i, f(i)]);
                }
            }
            else if (func.type === "inve") {
                var f = Chalkboard.real.parse("y => " + func.definition);
                for (var i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(f(i * config.size) / config.size, -i);
                    data.push([f(i), i]);
                }
            }
            else if (func.type === "pola") {
                var r = Chalkboard.real.parse("O => " + func.definition);
                for (var i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo((r(i * config.size) / config.size) * Chalkboard.trig.cos(i * config.size), (-r(i * config.size) / config.size) * Chalkboard.trig.sin(i * config.size));
                    data.push([i, r(i)]);
                }
            }
            else if (func.type === "curv") {
                var x = Chalkboard.real.parse("t => " + func.definition[0]), y = Chalkboard.real.parse("t => " + func.definition[1]);
                for (var i = xdomain[0] / config.size; i <= xdomain[1] / config.size; i++) {
                    config.context.lineTo(x(i * config.size) / config.size, -y(i * config.size) / config.size);
                    data.push([x(i), y(i)]);
                }
            }
            else if (func.type === "comp") {
                var u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]), v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                for (var i = xydomain[0][0] / config.size; i <= xydomain[0][1] / config.size; i += 5) {
                    for (var j = xydomain[1][0] / config.size; j <= xydomain[1][1] / config.size; j += 5) {
                        var z = Chalkboard.comp.init(u(i * config.size, j * config.size) / config.size, v(i * config.size, j * config.size) / config.size);
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
                        data.push([u(i, j), v(i, j)]);
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
        plot.dfdx = function (func, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.dfdx(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.dfdx(func, i)]);
                }
                else if (func.type === "inve") {
                    config.context.lineTo(Chalkboard.calc.dfdx(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.dfdx(func, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.d2fdx2 = function (func, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.d2fdx2(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.d2fdx2(func, i)]);
                }
                else if (func.type === "inve") {
                    config.context.lineTo(Chalkboard.calc.d2fdx2(func, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.d2fdx2(func, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.field = function (vectfield, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [
                    [-10, 10],
                    [-10, 10]
                ],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth;
            config.context.save();
            config.context.translate(config.x, config.y);
            for (var i = config.domain[0][0] / config.size; i <= config.domain[0][1] / config.size; i += config.res) {
                for (var j = config.domain[1][0] / config.size; j <= config.domain[1][1] / config.size; j += config.res) {
                    var v = Chalkboard.vect.fromField(vectfield, Chalkboard.vect.init(i, j));
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
        plot.Fourier = function (func, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Fourier(func, i * config.size) / config.size);
                data.push([i, Chalkboard.calc.Fourier(func, i)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.fxdx = function (func, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                if (func.type === "expl") {
                    config.context.lineTo(i, -Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.fxdx(func, 0, i)]);
                }
                else if (func.type === "inve") {
                    config.context.lineTo(Chalkboard.calc.fxdx(func, 0, i * config.size) / config.size, -i);
                    data.push([Chalkboard.calc.fxdx(func, 0, i), i]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.Laplace = function (func, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            if (config.domain[0] >= 0) {
                for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            else {
                for (var i = 0; i <= config.domain[1] / config.size; i += config.res) {
                    config.context.lineTo(i, -Chalkboard.calc.Laplace(func, i * config.size) / config.size);
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.lineplot = function (arr, bins, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            var verts = [];
            for (var i = 0; i < bins.length; i++) {
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
            var counts = [];
            for (var i = 0; i < verts.length; i++) {
                counts.push(verts[i].length);
            }
            config.context.beginPath();
            for (var i = 0; i < counts.length; i++) {
                config.context.lineTo(i / config.size, -counts[i] / config.size);
            }
            config.context.stroke();
            config.context.restore();
            return verts;
        };
        plot.matr = function (matr, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            for (var i = config.domain[0]; i <= config.domain[1]; i++) {
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
        plot.rOplane = function (config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var cw = PARSED_CONTEXT.canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for (var i = 0; i <= (config.size * cw) / 2; i++) {
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
        plot.scatterplot = function (arr1, arr2, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                fillStyle: config.fillStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.fillStyle = config.fillStyle;
            if (arr1.length === arr2.length) {
                for (var i = 0; i < arr1.length; i++) {
                    config.context.beginPath();
                    config.context.ellipse(arr1[i] / config.size - arr1.length / (2 * config.size), -arr2[i] / config.size + arr1.length / (2 * config.size), config.lineWidth, config.lineWidth, 0, 0, Chalkboard.PI(2));
                    config.context.fill();
                    data.push([arr1[i], arr2[i]]);
                }
            }
            config.context.restore();
            return data;
        };
        plot.Taylor = function (func, n, a, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                domain: config.domain || [-10, 10],
                res: config.res || 25,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var data = [];
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.lineWidth = config.lineWidth;
            config.context.strokeStyle = config.strokeStyle;
            config.context.beginPath();
            for (var i = config.domain[0] / config.size; i <= config.domain[1] / config.size; i += config.res) {
                config.context.lineTo(i, -Chalkboard.calc.Taylor(func, i * config.size, n, a) / config.size);
                data.push([i, Chalkboard.calc.Taylor(func, i, n, a)]);
            }
            config.context.stroke();
            config.context.restore();
            return data;
        };
        plot.vect = function (vect, config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 5,
                context: config.context || PARSED_CONTEXT
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
        };
        plot.xyplane = function (config) {
            (config = {
                x: (config = config || {}).x || PARSED_CONTEXT.canvas.width / 2,
                y: config.y || PARSED_CONTEXT.canvas.height / 2,
                size: config.size || 1,
                strokeStyle: config.strokeStyle || "black",
                lineWidth: config.lineWidth || 2,
                context: config.context || PARSED_CONTEXT
            }).size /= 100;
            var cw = PARSED_CONTEXT.canvas.width;
            config.context.save();
            config.context.translate(config.x, config.y);
            config.context.strokeStyle = config.strokeStyle;
            config.context.lineWidth = config.lineWidth / 4;
            config.context.beginPath();
            for (var i = Math.floor(-config.x / config.size); i <= (cw - config.x) / config.size; i++) {
                config.context.moveTo(i / config.size, -config.y);
                config.context.lineTo(i / config.size, cw - config.y);
            }
            config.context.stroke();
            config.context.beginPath();
            for (var i = Math.floor(-config.y / config.size); i <= (cw - config.y) / config.size; i++) {
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
    var quat;
    (function (quat_2) {
        quat_2.absolute = function (quat) {
            return Chalkboard.quat.init(Math.abs(quat.a), Math.abs(quat.b), Math.abs(quat.c), Math.abs(quat.d));
        };
        quat_2.add = function (quat1, quat2) {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a + quat2.a, quat1.b + quat2.b, quat1.c + quat2.c, quat1.d + quat2.d);
        };
        quat_2.conjugate = function (quat) {
            return Chalkboard.quat.init(quat.a, -quat.b, -quat.c, -quat.d);
        };
        quat_2.constrain = function (quat, range) {
            if (range === void 0) { range = [0, 1]; }
            return Chalkboard.quat.init(Chalkboard.numb.constrain(quat.a, range), Chalkboard.numb.constrain(quat.b, range), Chalkboard.numb.constrain(quat.c, range), Chalkboard.numb.constrain(quat.d, range));
        };
        quat_2.copy = function (quat) {
            return Object.create(Object.getPrototypeOf(quat), Object.getOwnPropertyDescriptors(quat));
        };
        quat_2.dist = function (quat1, quat2) {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.real.sqrt((quat2.a - quat1.a) * (quat2.a - quat1.a) + (quat2.b - quat1.b) * (quat2.b - quat1.b) + (quat2.c - quat1.c) * (quat2.c - quat1.c) + (quat2.d - quat1.d) * (quat2.d - quat1.d));
        };
        quat_2.distsq = function (quat1, quat2) {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return (quat2.a - quat1.a) * (quat2.a - quat1.a) + (quat2.b - quat1.b) * (quat2.b - quat1.b) + (quat2.c - quat1.c) * (quat2.c - quat1.c) + (quat2.d - quat1.d) * (quat2.d - quat1.d);
        };
        quat_2.div = function (quat1, quat2) {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init((quat1.a * quat2.a + quat1.b * quat2.b + quat1.c * quat2.c + quat1.d * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.b * quat2.a - quat1.a * quat2.b - quat1.d * quat2.c + quat1.c * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.c * quat2.a + quat1.d * quat2.b - quat1.a * quat2.c - quat1.b * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.d * quat2.a - quat1.c * quat2.b + quat1.b * quat2.c - quat1.a * quat2.d) / Chalkboard.quat.magsq(quat2));
        };
        quat_2.fromAxis = function (vect, rad) {
            if (typeof vect.z !== "undefined") {
                return Chalkboard.quat.init(Chalkboard.trig.cos(rad / 2), vect.x * Chalkboard.trig.sin(rad / 2), vect.y * Chalkboard.trig.sin(rad / 2), vect.z * Chalkboard.trig.sin(rad / 2));
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" that has properties "x", "y", and "z".');
            }
        };
        quat_2.init = function (a, b, c, d) {
            if (b === void 0) { b = 0; }
            if (c === void 0) { c = 0; }
            if (d === void 0) { d = 0; }
            return { a: a, b: b, c: c, d: d };
        };
        quat_2.invert = function (quat) {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.magsq(quat), -quat.b / Chalkboard.quat.magsq(quat), -quat.c / Chalkboard.quat.magsq(quat), -quat.d / Chalkboard.quat.magsq(quat));
        };
        quat_2.mag = function (quat) {
            return Chalkboard.real.sqrt(quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d);
        };
        quat_2.magset = function (quat, num) {
            return Chalkboard.quat.scl(Chalkboard.quat.normalize(quat), num);
        };
        quat_2.magsq = function (quat) {
            return quat.a * quat.a + quat.b * quat.b + quat.c * quat.c + quat.d * quat.d;
        };
        quat_2.mul = function (quat1, quat2) {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a * quat2.a - quat1.b * quat2.b - quat1.c * quat2.c - quat1.d * quat2.d, quat1.a * quat2.b + quat1.b * quat2.a + quat1.c * quat2.d - quat1.d * quat2.c, quat1.a * quat2.c - quat1.b * quat2.d + quat1.c * quat2.a + quat1.d * quat2.b, quat1.a * quat2.d + quat1.b * quat2.c - quat1.c * quat2.b + quat1.d * quat2.a);
        };
        quat_2.negate = function (quat) {
            return Chalkboard.quat.init(-quat.a, -quat.b, -quat.c, -quat.d);
        };
        quat_2.normalize = function (quat) {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.mag(quat), quat.b / Chalkboard.quat.mag(quat), quat.c / Chalkboard.quat.mag(quat), quat.d / Chalkboard.quat.mag(quat));
        };
        quat_2.print = function (quat) {
            console.log(Chalkboard.quat.toString(quat));
        };
        quat_2.random = function (inf, sup) {
            if (inf === void 0) { inf = 0; }
            if (sup === void 0) { sup = 1; }
            return Chalkboard.quat.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        };
        quat_2.reciprocate = function (quat) {
            return Chalkboard.quat.init(1 / quat.a, 1 / quat.b, 1 / quat.c, 1 / quat.d);
        };
        quat_2.round = function (quat) {
            return Chalkboard.quat.init(Math.round(quat.a), Math.round(quat.b), Math.round(quat.c), Math.round(quat.d));
        };
        quat_2.scl = function (quat, num) {
            return Chalkboard.quat.init(quat.a * num, quat.b * num, quat.c * num, quat.d * num);
        };
        quat_2.sub = function (quat1, quat2) {
            if (typeof quat1 === "number")
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            if (typeof quat2 === "number")
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            return Chalkboard.quat.init(quat1.a - quat2.a, quat1.b - quat2.b, quat1.c - quat2.c, quat1.d - quat2.d);
        };
        quat_2.toArray = function (quat) {
            return [quat.a, quat.b, quat.c, quat.d];
        };
        quat_2.toMatrix = function (quat) {
            return Chalkboard.matr.init([quat.a, -quat.b, -quat.c, -quat.d], [quat.b, quat.a, -quat.d, quat.c], [quat.c, quat.d, quat.a, -quat.b], [quat.d, -quat.c, quat.b, quat.a]);
        };
        quat_2.toRotation = function (quat, vect) {
            var vector = Chalkboard.vect.toQuaternion(vect);
            var inverse = Chalkboard.quat.invert(quat);
            var quat_vector_inverse = Chalkboard.quat.mul(quat, Chalkboard.quat.mul(vector, inverse));
            return Chalkboard.vect.init(quat_vector_inverse.b, quat_vector_inverse.c, quat_vector_inverse.d);
        };
        quat_2.toString = function (quat) {
            var quat_b = "";
            var quat_c = "";
            var quat_d = "";
            if (quat.b >= 0) {
                quat_b = " + " + quat.b.toString() + "i ";
            }
            else if (quat.b < 0) {
                quat_b = " - " + Math.abs(quat.b).toString() + "i ";
            }
            if (quat.c >= 0) {
                quat_c = "+ " + quat.c.toString() + "j ";
            }
            else if (quat.c < 0) {
                quat_c = "- " + Math.abs(quat.c).toString() + "j ";
            }
            if (quat.d >= 0) {
                quat_d = "+ " + quat.d.toString() + "k ";
            }
            else if (quat.d < 0) {
                quat_d = "- " + Math.abs(quat.d).toString() + "k ";
            }
            return quat.a.toString() + quat_b + quat_c + quat_d;
        };
        quat_2.toVector = function (quat) {
            return Chalkboard.vect.init(quat.a, quat.b, quat.c, quat.d);
        };
        quat_2.zero = function (quat) {
            return Chalkboard.quat.init(quat.a * 0, quat.b * 0, quat.c * 0, quat.d * 0);
        };
    })(quat = Chalkboard.quat || (Chalkboard.quat = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var stat;
    (function (stat) {
        stat.absolute = function (arr) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                result.push(Math.abs(arr[i]));
            }
            return result;
        };
        stat.add = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            var result = [];
            for (var i = 0; i < arr1.length; i++) {
                result.push(arr1[i] + arr2[i]);
            }
            return result;
        };
        stat.array = function (inf, sup, length) {
            if (length === void 0) { length = sup - inf + 1; }
            var result = [];
            var step = (sup - inf) / (length - 1);
            for (var i = 0; i < length; i++) {
                result.push(inf + step * i);
            }
            return result;
        };
        stat.autocorrelation = function (arr) {
            return Chalkboard.stat.correlation(arr, arr);
        };
        stat.Bayes = function (pA, pGivenA, pGivenNotA) {
            if (pA < 0 || pA > 1 || pGivenA < 0 || pGivenA > 1 || pGivenNotA < 0 || pGivenNotA > 1) {
                throw new RangeError('All probabilities must be between 0 and 1.');
            }
            return (pGivenA * pA) / (pGivenA * pA + pGivenNotA * (1 - pA));
        };
        stat.change = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            var result = [];
            for (var i = 0; i < arr1.length; i++) {
                result.push(Chalkboard.numb.change(arr1[i], arr2[i]));
            }
            return result;
        };
        stat.chiSquared = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            var result = [];
            for (var i = 0; i < arr1.length; i++) {
                result.push(((arr1[i] - arr2[i]) * (arr1[i] - arr2[i])) / arr2[i]);
            }
            return result;
        };
        stat.confidenceInterval = function (arr, confidence) {
            if (confidence === void 0) { confidence = 0.95; }
            if (confidence <= 0 || confidence >= 1) {
                throw new RangeError('Parameter "confidence" must be between 0 and 1 (exclusive).');
            }
            var z = Chalkboard.stat.inormal(1 - (1 - confidence) / 2);
            var mean = Chalkboard.stat.mean(arr);
            var standardError = Chalkboard.stat.error(arr);
            return [mean - z * standardError, mean + z * standardError];
        };
        stat.constrain = function (arr, range) {
            if (range === void 0) { range = [0, 1]; }
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                result.push(Chalkboard.numb.constrain(arr[i], range));
            }
            return result;
        };
        stat.convolution = function (arr1, arr2) {
            var result = [];
            for (var i = 0; i < arr1.length + arr2.length - 1; i++) {
                var sum_1 = 0;
                for (var j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum_1 += arr1[j] * arr2[i - j];
                }
                result.push(sum_1);
            }
            return result;
        };
        stat.correlation = function (arr1, arr2) {
            var result = [];
            for (var i = 0; i < arr1.length + arr2.length - 1; i++) {
                var sum_2 = 0;
                for (var j = Math.max(0, i - arr2.length + 1); j < Math.min(arr1.length, i + 1); j++) {
                    sum_2 += arr1[j] * arr2[arr2.length - 1 - i + j];
                }
                result.push(sum_2);
            }
            return result;
        };
        stat.correlationCoefficient = function (arr1, arr2) {
            return Chalkboard.stat.covariance(arr1, arr2) / (Chalkboard.stat.deviation(arr1) * Chalkboard.stat.deviation(arr2));
        };
        stat.covariance = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            var mean1 = Chalkboard.stat.mean(arr1);
            var mean2 = Chalkboard.stat.mean(arr2);
            var sum = 0;
            for (var i = 0; i < arr1.length; i++) {
                sum += (arr1[i] - mean1) * (arr2[i] - mean2);
            }
            return sum / arr1.length;
        };
        stat.cummax = function (arr) {
            var result = [];
            var max = -Infinity;
            for (var _i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                var value = arr_1[_i];
                max = Math.max(max, value);
                result.push(max);
            }
            return result;
        };
        stat.cummin = function (arr) {
            var result = [];
            var min = Infinity;
            for (var _i = 0, arr_2 = arr; _i < arr_2.length; _i++) {
                var value = arr_2[_i];
                min = Math.min(min, value);
                result.push(min);
            }
            return result;
        };
        stat.cummul = function (arr) {
            var result = [];
            var mul = 0;
            for (var i = 0; i < arr.length; i++) {
                mul *= arr[i];
                result.push(mul);
            }
            return result;
        };
        stat.cumsum = function (arr) {
            var result = [];
            var sum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
                result.push(sum);
            }
            return result;
        };
        stat.deviation = function (arr) {
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return Chalkboard.real.sqrt(result / arr.length);
        };
        stat.dot = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            var result = 0;
            for (var i = 0; i < arr1.length; i++) {
                result += arr1[i] * arr2[i];
            }
            return result;
        };
        stat.error = function (arr) {
            return Chalkboard.stat.deviation(arr) / Chalkboard.real.sqrt(arr.length);
        };
        stat.eq = function (arr, arrORnum) {
            var result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i] === arrORnum[i]) {
                            result.push(arr[i]);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] === arrORnum) {
                        result.push(arr[i]);
                    }
                }
            }
            return result;
        };
        stat.expected = function (arr, probabilities) {
            if (!probabilities) {
                probabilities = Array(arr.length).fill(1 / arr.length);
            }
            if (arr.length !== probabilities.length) {
                throw new RangeError('Parameters "values" and "probabilities" must have the same length.');
            }
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                result += arr[i] * probabilities[i];
            }
            return result;
        };
        stat.Gaussian = function (height, mean, deviation) {
            return Chalkboard.real.define(height.toString() + " * Math.exp(-((x - " + mean.toString() + ") * (x - " + mean.toString() + ")) / (2 * " + deviation.toString() + " * " + deviation.toString() + "))");
        };
        stat.gt = function (arr, arrORnum, includeEnd) {
            if (includeEnd === void 0) { includeEnd = false; }
            var result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (var i = 0; i < arr.length; i++) {
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
                for (var i = 0; i < arr.length; i++) {
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
        stat.ineq = function (arr, inf, sup, includeInf, includeSup) {
            if (includeInf === void 0) { includeInf = false; }
            if (includeSup === void 0) { includeSup = false; }
            var result = [];
            if (Array.isArray(inf) && Array.isArray(sup)) {
                if (arr.length === inf.length && arr.length === sup.length) {
                    for (var i = 0; i < arr.length; i++) {
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
                for (var i = 0; i < arr.length; i++) {
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
        stat.inormal = function (p) {
            if (p <= 0 || p >= 1) {
                throw new RangeError('Parameter "p" must be between 0 and 1 (exclusive).');
            }
            var a = [2.50662823884, -18.61500062529, 41.39119773534, -25.44106049637];
            var b = [-8.4735109309, 23.08336743743, -21.06224101826, 3.13082909833];
            var c = [0.3374754822726147, 0.9761690190917186, 0.1607979714918209,
                0.0276438810333863, 0.0038405729373609, 0.0003951896511919,
                0.0000321767881768, 0.0000002888167364, 0.0000003960315187];
            var x = p - 0.5;
            if (Math.abs(x) < 0.42) {
                var r = x * x;
                return x * (((a[3] * r + a[2]) * r + a[1]) * r + a[0]) /
                    ((((b[3] * r + b[2]) * r + b[1]) * r + b[0]) * r + 1);
            }
            else {
                var r = p < 0.5 ? p : 1 - p;
                var s = Math.log(-Math.log(r));
                var t = c[0];
                for (var i = 1; i < c.length; i++) {
                    t += c[i] * Math.pow(s, i);
                }
                return p < 0.5 ? -t : t;
            }
        };
        stat.interpolate = function (arr, type) {
            if (type === void 0) { type = "linear"; }
            var result = arr.slice();
            for (var i = 0; i < result.length; i++) {
                if (result[i] == null) {
                    var prevIndex = i - 1;
                    var nextIndex = i + 1;
                    while (prevIndex >= 0 && result[prevIndex] == null)
                        prevIndex--;
                    while (nextIndex < result.length && result[nextIndex] == null)
                        nextIndex++;
                    var prevValue = prevIndex >= 0 ? result[prevIndex] : 0;
                    var nextValue = nextIndex < result.length ? result[nextIndex] : 0;
                    if (type === "linear") {
                        var t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.lerp([prevValue, nextValue], t);
                    }
                    else if (type === "quadratic" && prevIndex > 0 && nextIndex < result.length) {
                        var prevPrevIndex = prevIndex - 1;
                        var prevPrevValue = prevPrevIndex >= 0 ? result[prevPrevIndex] : prevValue;
                        var t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.qerp([prevPrevIndex, prevPrevValue], [prevIndex, prevValue], [nextIndex, nextValue], prevIndex + t * (nextIndex - prevIndex));
                    }
                    else {
                        var t = (i - prevIndex) / (nextIndex - prevIndex);
                        result[i] = Chalkboard.real.lerp([prevValue, nextValue], t);
                    }
                }
            }
            return result;
        };
        stat.interquartileRange = function (arr) {
            return Chalkboard.stat.quartile(arr, "Q3") - Chalkboard.stat.quartile(arr, "Q1");
        };
        stat.kurtosis = function (arr) {
            var result = 0;
            var mean = Chalkboard.stat.mean(arr);
            var deviation = Chalkboard.stat.deviation(arr);
            for (var i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / (deviation * deviation * deviation * deviation) - 3;
        };
        stat.lt = function (arr, arrORnum, includeEnd) {
            if (includeEnd === void 0) { includeEnd = false; }
            var result = [];
            if (Array.isArray(arrORnum)) {
                if (arr.length === arrORnum.length) {
                    for (var i = 0; i < arr.length; i++) {
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
                for (var i = 0; i < arr.length; i++) {
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
        stat.mad = function (arr) {
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                result += Math.abs(arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        };
        stat.max = function (arr) {
            var max = arr[0];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        };
        stat.mean = function (arr, type) {
            if (type === void 0) { type = "arithmetic"; }
            var result = 0;
            if (type === "arithmetic") {
                for (var i = 0; i < arr.length; i++) {
                    result += arr[i];
                }
                return result / arr.length;
            }
            else if (type === "geometric") {
                for (var i = 0; i < arr.length; i++) {
                    result *= arr[i];
                }
                return Chalkboard.real.root(Math.abs(result), arr.length);
            }
            else if (type === "harmonic") {
                for (var i = 0; i < arr.length; i++) {
                    result += 1 / arr[i];
                }
                return arr.length / result;
            }
            else {
                throw new TypeError('Parameter "type" must be "arithmetic", "geometric", or "harmonic".');
            }
        };
        stat.meanMoving = function (arr, windowSize) {
            if (windowSize <= 0 || windowSize > arr.length) {
                throw new RangeError('Parameter "windowSize" must be greater than 0 and less than or equal to the array length.');
            }
            var result = [];
            for (var i = 0; i <= arr.length - windowSize; i++) {
                var windowArr = arr.slice(i, i + windowSize);
                result.push(Chalkboard.stat.sum(windowArr) / windowSize);
            }
            return result;
        };
        stat.meanWeighted = function (arr, weights) {
            if (arr.length !== weights.length) {
                throw new RangeError('Parameters "values" and "weights" must have the same length.');
            }
            var sum = 0, weightSum = 0;
            for (var i = 0; i < arr.length; i++) {
                sum += arr[i] * weights[i];
                weightSum += weights[i];
            }
            return sum / weightSum;
        };
        stat.median = function (arr) {
            var temp = arr.slice().sort(function (a, b) {
                return a - b;
            });
            if (temp.length % 2 === 1) {
                return temp[Math.floor(temp.length / 2)];
            }
            else {
                return (temp[temp.length / 2] + temp[temp.length / 2 - 1]) / 2;
            }
        };
        stat.min = function (arr) {
            var min = arr[0];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] < min) {
                    min = arr[i];
                }
            }
            return min;
        };
        stat.mode = function (arr) {
            var temp = arr.slice().sort(function (a, b) {
                return a - b;
            });
            var bestStr = 1;
            var currStr = 1;
            var bestElm = temp[0];
            var currElm = temp[0];
            for (var i = 1; i < temp.length; i++) {
                if (temp[i - 1] !== temp[i]) {
                    if (currStr > bestStr) {
                        bestStr = currStr;
                        bestElm = currElm;
                    }
                    currStr = 0;
                    currElm = temp[i];
                }
                currStr++;
            }
            if (currStr > bestStr) {
                return currElm;
            }
            else {
                return bestElm;
            }
        };
        stat.mul = function (arr) {
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                result *= arr[i];
            }
            return result;
        };
        stat.negate = function (arr) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                result.push(-arr[i]);
            }
            return result;
        };
        stat.norm = function (arr, type) {
            if (type === void 0) { type = "L2"; }
            var result = 0;
            if (type === "L0") {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result;
            }
            else if (type === "L1") {
                for (var i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result;
            }
            else if (type === "L2") {
                for (var i = 0; i < arr.length; i++) {
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
        stat.normal = function (x) {
            var standardNormal = Chalkboard.real.define("1 / Math.sqrt(2 * Math.PI) * Math.exp(-0.5 * x * x)");
            return Chalkboard.real.val(standardNormal, x);
        };
        stat.normalize = function (arr, type) {
            if (type === void 0) { type = "L2"; }
            var result = [];
            var norm = Chalkboard.stat.norm(arr, type);
            for (var i = 0; i < arr.length; i++) {
                result.push(arr[i] / norm);
            }
            return result;
        };
        stat.normsq = function (arr, type) {
            if (type === void 0) { type = "L2"; }
            var result = 0;
            if (type === "L0") {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] !== 0) {
                        result += 1;
                    }
                }
                return result * result;
            }
            else if (type === "L1") {
                for (var i = 0; i < arr.length; i++) {
                    result += Math.abs(arr[i]);
                }
                return result * result;
            }
            else if (type === "L2") {
                for (var i = 0; i < arr.length; i++) {
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
        stat.pad = function (arr, length, num) {
            if (num === void 0) { num = 0; }
            var result = arr.slice();
            while (result.length < length) {
                result.push(num);
            }
            return result;
        };
        stat.percentile = function (arr, num) {
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                if (num >= arr[i]) {
                    result++;
                }
            }
            return (result / arr.length) * 100;
        };
        stat.print = function (arr) {
            console.log(Chalkboard.stat.toString(arr));
        };
        stat.quartile = function (arr, type) {
            var temp = arr.slice().sort(function (a, b) {
                return a - b;
            });
            var lo = temp.slice(0, Math.floor(temp.length / 2));
            var hi = temp.slice(Math.ceil(temp.length / 2));
            if (type === "Q1") {
                return Chalkboard.stat.median(lo);
            }
            else if (type === "Q2") {
                return Chalkboard.stat.median(arr);
            }
            else if (type === "Q3") {
                return Chalkboard.stat.median(hi);
            }
            else {
                throw new TypeError('Parameter "type" must be "Q1", "Q2", or "Q3".');
            }
        };
        stat.random = function (inf, sup, length) {
            var result = [];
            for (var i = 0; i < length; i++) {
                result.push(Chalkboard.numb.random(inf, sup));
            }
            return result;
        };
        stat.range = function (arr) {
            return Chalkboard.stat.max(arr) - Chalkboard.stat.min(arr);
        };
        stat.regression = function (data, type, degree) {
            if (type === void 0) { type = "linear"; }
            if (degree === void 0) { degree = 2; }
            if (type === "linear") {
                var x = 0, y = 0;
                var xx = 0, xy = 0;
                for (var i = 0; i < data.length; i++) {
                    x += data[i][0];
                    y += data[i][1];
                    xx += data[i][0] * data[i][0];
                    xy += data[i][0] * data[i][1];
                }
                var a = (data.length * xy - x * y) / (data.length * xx - x * x), b = y / data.length - (a * x) / data.length;
                return Chalkboard.real.define(a + " * x + " + b);
            }
            else if (type === "polynomial") {
                var A = Chalkboard.matr.init();
                for (var i = 0; i < data.length; i++) {
                    A.push([]);
                    for (var j = 0; j <= degree; j++) {
                        A[i].push(Chalkboard.real.pow(data[i][0], j));
                    }
                }
                var AT = Chalkboard.matr.transpose(A);
                var B = Chalkboard.matr.init();
                for (var i = 0; i < data.length; i++) {
                    B.push([data[i][1]]);
                }
                var ATA = Chalkboard.matr.mul(AT, A);
                var ATAI = Chalkboard.matr.invert(ATA);
                var x = Chalkboard.matr.mul(Chalkboard.matr.mul(ATAI, AT), B);
                var coeff = [];
                for (var i = 0; i < x.length; i++) {
                    coeff.push(x[i][0]);
                }
                var f = coeff[0].toString() + " + " + coeff[1].toString() + " * x";
                for (var i = 2; i <= degree; i++) {
                    f += " + " + coeff[i].toString() + " * Math.pow(x, " + i + ")";
                }
                return Chalkboard.real.define(f);
            }
            else if (type === "power") {
                var arr = [0, 0, 0, 0];
                for (var i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                var a = Chalkboard.E((arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length), b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define(a + " * Math.pow(x, " + b + ")");
            }
            else if (type === "exponential") {
                var arr = [0, 0, 0, 0, 0, 0];
                for (var i = 0; i < data.length; i++) {
                    arr[0] += data[i][0];
                    arr[1] += data[i][1];
                    arr[2] += data[i][0] * data[i][0] * data[i][1];
                    arr[3] += data[i][1] * Chalkboard.real.ln(data[i][1]);
                    arr[4] += data[i][0] & (data[i][1] * Chalkboard.real.ln(data[i][1]));
                    arr[5] += data[i][0] * data[i][1];
                }
                var a = Chalkboard.E((arr[2] * arr[3] - arr[5] * arr[4]) / (arr[1] * arr[2] - arr[5] * arr[5])), b = (arr[1] * arr[4] - arr[5] * arr[3]) / (arr[1] * arr[2] - arr[5] * arr[5]);
                return Chalkboard.real.define(a + "* Math.exp(" + b + " * x)");
            }
            else if (type === "logarithmic") {
                var arr = [0, 0, 0, 0];
                for (var i = 0; i < data.length; i++) {
                    arr[0] += Chalkboard.real.ln(data[i][0]);
                    arr[1] += data[i][1] * Chalkboard.real.ln(data[i][0]);
                    arr[2] += data[i][1];
                    arr[3] += Chalkboard.real.ln(data[i][0]) * Chalkboard.real.ln(data[i][0]);
                }
                var a = (arr[2] - ((data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0])) * arr[0]) / data.length, b = (data.length * arr[1] - arr[2] * arr[0]) / (data.length * arr[3] - arr[0] * arr[0]);
                return Chalkboard.real.define(a + " + " + b + " * Math.log(x)");
            }
            else {
                throw new TypeError('Parameter "type" must be "linear", "polynomial", "power", "exponential", or "logarithmic".');
            }
        };
        stat.resampling = function (arr, samples, type) {
            if (type === void 0) { type = "bootstrap"; }
            if (type === "bootstrap") {
                var numSamples = samples !== null && samples !== void 0 ? samples : 100;
                var result = [];
                for (var i = 0; i < numSamples; i++) {
                    var sample = [];
                    for (var j = 0; j < arr.length; j++) {
                        sample.push(arr[Math.floor(Math.random() * arr.length)]);
                    }
                    result.push(sample);
                }
                return result;
            }
            else if (type === "jackknife") {
                var numSamples = samples !== null && samples !== void 0 ? samples : arr.length;
                var allJackknifeSamples = [];
                for (var i = 0; i < arr.length; i++) {
                    allJackknifeSamples.push(arr.slice(0, i).concat(arr.slice(i + 1)));
                }
                if (numSamples < allJackknifeSamples.length) {
                    var selectedSamples = [];
                    var usedIndices = new Set();
                    while (selectedSamples.length < numSamples) {
                        var randomIndex = Math.floor(Math.random() * allJackknifeSamples.length);
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
        stat.reverse = function (arr) {
            var result = [];
            for (var i = arr.length - 1; i >= 0; i--) {
                result.push(arr[i]);
            }
            return result;
        };
        stat.scl = function (arr, num) {
            var result = [];
            for (var i = 0; i < arr.length; i++) {
                result.push(arr[i] * num);
            }
            return result;
        };
        stat.shuffle = function (arr) {
            var index, temp, rindex;
            for (index = arr.length - 1; index > 0; index--) {
                rindex = Math.floor(Chalkboard.numb.random(0, index + 1));
                temp = arr[index];
                arr[index] = arr[rindex];
                arr[rindex] = temp;
            }
            return arr;
        };
        stat.skewness = function (arr) {
            var result = 0;
            var mean = Chalkboard.stat.mean(arr);
            var deviation = Chalkboard.stat.deviation(arr);
            for (var i = 0; i < arr.length; i++) {
                result += (arr[i] - mean) * (arr[i] - mean) * (arr[i] - mean);
            }
            return result / ((arr.length - 1) * (deviation * deviation * deviation));
        };
        stat.sub = function (arr1, arr2) {
            if (arr1.length !== arr2.length) {
                throw new RangeError('Parameters "arr1" and "arr2" must have the same length.');
            }
            var result = [];
            for (var i = 0; i < arr1.length; i++) {
                result.push(arr1[i] - arr2[i]);
            }
            return result;
        };
        stat.subsets = function (arr) {
            var result = [[]];
            arr.sort();
            for (var i = 0; i < arr.length; i++) {
                if (i === 0 || arr[i] !== arr[i - 1]) {
                    var curr = arr[i];
                    var subsetsWithCurr = [];
                    for (var j = 0; j < result.length; j++) {
                        var subset = result[j].slice();
                        subset.push(curr);
                        subsetsWithCurr.push(subset);
                    }
                    result = result.concat(subsetsWithCurr);
                }
            }
            return result;
        };
        stat.sum = function (arr) {
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                result += arr[i];
            }
            return result;
        };
        stat.toMatrix = function (arr, rows, cols) {
            if (cols === void 0) { cols = rows; }
            var result = Chalkboard.matr.init();
            var index = 0;
            for (var i = 0; i < rows; i++) {
                result[i] = [];
                for (var j = 0; j < cols; j++) {
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
        stat.toObject = function (arr) {
            var result = {};
            for (var i = 0; i < arr.length; i++) {
                result["_" + i.toString()] = arr[i];
            }
            return result;
        };
        stat.toSet = function (arr) {
            return Chalkboard.abal.set(arr);
        };
        stat.toString = function (arr) {
            return "[" + arr.join(", ") + "]";
        };
        stat.toTensor = function (arr) {
            var _a;
            var size = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                size[_i - 1] = arguments[_i];
            }
            if (Array.isArray(size[0])) {
                size = size[0];
            }
            return (_a = Chalkboard.tens).resize.apply(_a, __spreadArray([arr], size, false));
        };
        stat.toVector = function (arr, dimension, index) {
            if (index === void 0) { index = 0; }
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
        stat.unique = function (arr) {
            var stableStringify = function (obj) {
                var replacer = function (key, value) {
                    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
                        var sortedObj_1 = {};
                        Object.keys(value).sort().forEach(function (k) {
                            sortedObj_1[k] = value[k];
                        });
                        return sortedObj_1;
                    }
                    return value;
                };
                return JSON.stringify(obj, replacer);
            };
            var getKey = function (item) {
                var typePrefix;
                var valuePart;
                if (item === null) {
                    typePrefix = "null";
                    valuePart = stableStringify(item);
                }
                else if (Array.isArray(item)) {
                    typePrefix = "array";
                    valuePart = stableStringify(item);
                }
                else if (typeof item === "object") {
                    typePrefix = "object";
                    valuePart = stableStringify(item);
                }
                else if (typeof item === "number") {
                    typePrefix = "number";
                    if (Number.isNaN(item)) {
                        valuePart = "NaN";
                    }
                    else if (item === Infinity) {
                        valuePart = "Infinity";
                    }
                    else if (item === -Infinity) {
                        valuePart = "-Infinity";
                    }
                    else {
                        valuePart = JSON.stringify(item);
                    }
                }
                else if (typeof item === "undefined") {
                    typePrefix = "undefined";
                    valuePart = "";
                }
                else {
                    typePrefix = typeof item;
                    valuePart = stableStringify(item);
                }
                return "".concat(typePrefix, ":").concat(valuePart);
            };
            var seen = new Map();
            for (var _i = 0, arr_3 = arr; _i < arr_3.length; _i++) {
                var item = arr_3[_i];
                var key = getKey(item);
                if (!seen.has(key)) {
                    seen.set(key, item);
                }
            }
            return Array.from(seen.values());
        };
        stat.variance = function (arr) {
            var result = 0;
            for (var i = 0; i < arr.length; i++) {
                result += (arr[i] - Chalkboard.stat.mean(arr)) * (arr[i] - Chalkboard.stat.mean(arr));
            }
            return result / arr.length;
        };
        stat.zscored = function (arr) {
            var result = [];
            var mean = Chalkboard.stat.mean(arr);
            var deviation = Chalkboard.stat.deviation(arr);
            for (var i = 0; i < arr.length; i++) {
                result.push((arr[i] - mean) / deviation);
            }
            return result;
        };
    })(stat = Chalkboard.stat || (Chalkboard.stat = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var tens;
    (function (tens_1) {
        tens_1.absolute = function (tens) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.absolute(tens[i]);
                }
                return result;
            }
            else {
                return Math.abs(tens);
            }
        };
        tens_1.add = function (tens1, tens2) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (var i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.add(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            }
            else {
                return tens1 + tens2;
            }
        };
        tens_1.concat = function (tens1, tens2, rank) {
            if (rank === void 0) { rank = 1; }
            var concatAtRank = function (arr1, arr2, currentRank) {
                if (currentRank === rank) {
                    return Chalkboard.tens.init(arr1.concat(arr2));
                }
                return arr1.map(function (element, index) {
                    return concatAtRank(element, arr2[index], currentRank);
                });
            };
            return concatAtRank(tens1, tens2, 1);
        };
        tens_1.constrain = function (tens, range) {
            if (range === void 0) { range = [0, 1]; }
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.constrain(tens[i], range);
                }
                return result;
            }
            else {
                return Chalkboard.numb.constrain(tens, range);
            }
        };
        tens_1.contract = function (tens) {
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
        tens_1.copy = function (tens) {
            if (Array.isArray(tens)) {
                var result = Chalkboard.tens.init();
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.copy(tens[i]);
                }
                return result;
            }
            else {
                return tens;
            }
        };
        tens_1.empty = function () {
            var size = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                size[_i] = arguments[_i];
            }
            size = Array.isArray(size[0]) ? size[0] : size;
            var newNDArray = function (size) {
                if (size.length === 0) {
                    return null;
                }
                var curr = size[0];
                var rest = size.slice(1);
                var result = [];
                for (var i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
        tens_1.fill = function (element) {
            var size = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                size[_i - 1] = arguments[_i];
            }
            size = Array.isArray(size[0]) ? size[0] : size;
            var newNDArray = function (size) {
                if (size.length === 0) {
                    return element;
                }
                var curr = size[0];
                var rest = size.slice(1);
                var result = [];
                for (var i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
        tens_1.init = function () {
            var tensor = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                tensor[_i] = arguments[_i];
            }
            if (tensor.length === 0) {
                return [];
            }
            else if (tensor.length === 1 && Array.isArray(tensor[0])) {
                tensor = tensor[0];
            }
            var newNDArray = function (arr) {
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
        tens_1.isEqual = function (tens1, tens2) {
            if (Chalkboard.tens.isSizeEqual(tens1, tens2)) {
                (tens1 = tens1), (tens2 = tens2);
                for (var i = 0; i < tens1.length; i++) {
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
        tens_1.isRankEqual = function (tens1, tens2) {
            return Chalkboard.tens.rank(tens1) === Chalkboard.tens.rank(tens2);
        };
        tens_1.isRankOf = function (tens, rank) {
            return Chalkboard.tens.rank(tens) === rank;
        };
        tens_1.isSizeEqual = function (tens1, tens2) {
            if (Chalkboard.tens.isRankEqual(tens1, tens2)) {
                var score = 0;
                for (var i = 0; i < Chalkboard.tens.rank(tens1); i++) {
                    if (Chalkboard.tens.size(tens1)[i] !== Chalkboard.tens.size(tens2)[i])
                        score++;
                }
                return score === 0;
            }
            else {
                return false;
            }
        };
        tens_1.isSizeOf = function (tens) {
            var _a;
            var size = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                size[_i - 1] = arguments[_i];
            }
            size = Array.isArray(size[0]) ? size[0] : size;
            return Chalkboard.tens.isSizeEqual(tens, (_a = Chalkboard.tens).empty.apply(_a, size));
        };
        tens_1.isSizeUniform = function (tens) {
            var score = 0;
            for (var i = 0; i < Chalkboard.tens.rank(tens); i++) {
                if (Chalkboard.tens.size(tens)[i] !== Chalkboard.tens.size(tens)[0])
                    score++;
            }
            return score === 0;
        };
        tens_1.mul = function (tens1, tens2) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (var i = 0; i < tens1.length; i++) {
                    var subarr = Chalkboard.tens.init();
                    for (var j = 0; j < tens2.length; j++) {
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
        tens_1.negate = function (tens) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.negate(tens[i]);
                }
                return result;
            }
            else {
                return -tens;
            }
        };
        tens_1.print = function (tens) {
            console.log(Chalkboard.tens.toString(tens));
        };
        tens_1.pull = function (tens, rank, index) {
            tens = tens;
            if (rank === 0) {
                tens.splice(index, 1);
                return tens;
            }
            else {
                for (var i = 0; i < tens.length; i++) {
                    Chalkboard.tens.pull(tens[i], rank - 1, index);
                }
                return tens;
            }
        };
        tens_1.push = function (tens, rank, index, elements) {
            tens = tens;
            if (rank === 0) {
                tens.splice(index, 0, elements);
                return tens;
            }
            else {
                for (var i = 0; i < tens.length; i++) {
                    Chalkboard.tens.push(tens[i], rank - 1, index, elements[i]);
                }
                return tens;
            }
        };
        tens_1.random = function (inf, sup) {
            var size = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                size[_i - 2] = arguments[_i];
            }
            size = Array.isArray(size[0]) ? size[0] : size;
            var newNDArray = function (size) {
                if (size.length === 0) {
                    return Chalkboard.numb.random(inf, sup);
                }
                var curr = size[0];
                var rest = size.slice(1);
                var result = [];
                for (var i = 0; i < curr; i++) {
                    result[i] = newNDArray(rest);
                }
                return result;
            };
            return newNDArray(size);
        };
        tens_1.rank = function (tens) {
            return Chalkboard.tens.size(tens).length;
        };
        tens_1.reciprocate = function (tens) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.reciprocate(tens[i]);
                }
                return result;
            }
            else {
                return 1 / tens;
            }
        };
        tens_1.resize = function (tens) {
            var _a;
            var size = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                size[_i - 1] = arguments[_i];
            }
            size = Array.isArray(size[0]) ? size[0] : size;
            var result = (_a = Chalkboard.tens).fill.apply(_a, __spreadArray([0], size, false));
            var refill = function (arr1, arr2) {
                for (var i = 0; i < arr2.length; i++) {
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
        tens_1.round = function (tens) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.round(tens[i]);
                }
                return result;
            }
            else {
                return Math.round(tens);
            }
        };
        tens_1.scl = function (tens, num) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.scl(tens[i], num);
                }
                return result;
            }
            else {
                return tens * num;
            }
        };
        tens_1.size = function (tens) {
            if (Array.isArray(tens)) {
                var result = [tens.length];
                if (Array.isArray(tens[0])) {
                    result = result.concat(Chalkboard.tens.size(tens[0]));
                }
                return result;
            }
            else {
                return [];
            }
        };
        tens_1.sub = function (tens1, tens2) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens1) && Array.isArray(tens2)) {
                for (var i = 0; i < Math.max(tens1.length, tens2.length); i++) {
                    result[i] = Chalkboard.tens.sub(tens1[i] !== undefined ? tens1[i] : 0, tens2[i] !== undefined ? tens2[i] : 0);
                }
                return result;
            }
            else {
                return tens1 - tens2;
            }
        };
        tens_1.toArray = function (tens) {
            var result = [];
            var flatten = function (tens) {
                for (var i = 0; i < tens.length; i++) {
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
        tens_1.toMatrix = function (tens) {
            var result = Chalkboard.matr.init();
            var flatten = function (tens, result) {
                for (var i = 0; i < tens.length; i++) {
                    if (Array.isArray(tens[i])) {
                        flatten(tens[i], result);
                    }
                    else {
                        result.push(tens[i]);
                    }
                }
            };
            var matr = Chalkboard.matr.init();
            flatten(tens, matr);
            var rows = tens.length || 1;
            for (var j = 0; j < rows; j++) {
                result.push(matr.slice((j * matr.length) / rows, ((j + 1) * matr.length) / rows));
            }
            return result;
        };
        tens_1.toObject = function (tens) {
            if (Array.isArray(tens)) {
                var result = {};
                for (var i = 0; i < tens.length; i++) {
                    result["_" + (i + 1)] = Chalkboard.tens.toObject(tens[i]);
                }
                return result;
            }
            else {
                return tens;
            }
        };
        tens_1.toSet = function (tens) {
            return Chalkboard.abal.set(Chalkboard.tens.toArray(tens));
        };
        tens_1.toString = function (tens, indentation) {
            if (indentation === void 0) { indentation = 0; }
            if (Array.isArray(tens[0])) {
                var result = "\t".repeat(indentation) + "[\n";
                for (var i = 0; i < tens.length; i++) {
                    result += Chalkboard.tens.toString(tens[i], indentation + 1);
                }
                result += "\t".repeat(indentation) + "]\n";
                return result;
            }
            else {
                var result = "\t".repeat(indentation) + "[ ";
                for (var i = 0; i < tens.length; i++) {
                    result += tens[i].toString() + " ";
                }
                result += "]\n";
                return result;
            }
        };
        tens_1.toVector = function (tens, dimension, index) {
            if (index === void 0) { index = 0; }
            var arr = Chalkboard.tens.toArray(tens);
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
        tens_1.transpose = function (tens) {
            var _a;
            return (_a = Chalkboard.tens).resize.apply(_a, __spreadArray([tens], Chalkboard.tens.size(tens).reverse(), false));
        };
        tens_1.zero = function (tens) {
            var result = Chalkboard.tens.init();
            if (Array.isArray(tens)) {
                for (var i = 0; i < tens.length; i++) {
                    result[i] = Chalkboard.tens.zero(tens[i]);
                }
                return result;
            }
            else {
                return 0;
            }
        };
    })(tens = Chalkboard.tens || (Chalkboard.tens = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var trig;
    (function (trig) {
        trig.arccos = function (rad) {
            if (rad > -1 && rad < 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (Math.sqrt(1 - x * x))"), rad, 1);
            }
            else if (rad === 1) {
                return 0;
            }
            else if (rad === -1) {
                return Chalkboard.PI();
            }
            else {
                return undefined;
            }
        };
        trig.arccosh = function (rad) {
            if (rad >= 1) {
                return Math.log(rad + Math.sqrt(rad * rad - 1));
            }
            else {
                return undefined;
            }
        };
        trig.arccot = function (rad) {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (1 + x * x)"), rad, 1000);
        };
        trig.arccoth = function (rad) {
            if (rad < -1 || rad > 1) {
                return Math.log((rad + 1) / (rad - 1)) / 2;
            }
            else {
                return undefined;
            }
        };
        trig.arccsc = function (rad) {
            if (rad > 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (x * Math.sqrt(x * x - 1))"), rad, 1000);
            }
            else if (rad === 1) {
                return Chalkboard.PI() / 2;
            }
            else if (rad === -1) {
                return -Chalkboard.PI() / 2;
            }
            else if (rad < 1) {
                return -Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (x * Math.sqrt(x * x - 1))"), Math.abs(rad), 1000);
            }
            else {
                return undefined;
            }
        };
        trig.arccsch = function (rad) {
            if (rad !== 0) {
                return Math.log(1 / rad + Math.sqrt(1 / (rad * rad) + 1));
            }
            else {
                return undefined;
            }
        };
        trig.arcsec = function (rad) {
            if (rad > 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (x * Math.sqrt(x * x - 1))"), 1.000001, rad);
            }
            else if (rad === 1) {
                return 0;
            }
            else if (rad === -1) {
                return Chalkboard.PI();
            }
            else {
                return undefined;
            }
        };
        trig.arcsech = function (rad) {
            if (rad > 0 && rad <= 1) {
                return Math.log(1 / rad + Math.sqrt(1 / (rad * rad) - 1));
            }
            else {
                return undefined;
            }
        };
        trig.arcsin = function (rad) {
            if (rad > -1 && rad < 1) {
                return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (Math.sqrt(1 - x * x))"), 0, rad);
            }
            else if (rad === 1) {
                return Chalkboard.PI() / 2;
            }
            else if (rad === -1) {
                return -Chalkboard.PI() / 2;
            }
            else {
                return undefined;
            }
        };
        trig.arcsinh = function (rad) {
            return Math.log(rad + Math.sqrt(rad * rad + 1));
        };
        trig.arctan = function (rad) {
            return Chalkboard.calc.fxdx(Chalkboard.real.define("1 / (1 + x * x)"), 0, rad);
        };
        trig.arctanh = function (rad) {
            if (rad > -1 && rad < 1) {
                return Math.log((1 + rad) / (1 - rad)) / 2;
            }
            else {
                return undefined;
            }
        };
        trig.arctan2 = function (y, x) {
            if (x === 0) {
                if (y > 0) {
                    return Math.PI / 2;
                }
                else if (y < 0) {
                    return -Math.PI / 2;
                }
                else {
                    return 0;
                }
            }
            else {
                if (x > 0 && y >= 0) {
                    return Math.atan(Math.abs(y / x));
                }
                else if (x < 0 && y >= 0) {
                    return Math.PI - Math.atan(Math.abs(y / x));
                }
                else if (x < 0 && y < 0) {
                    return -Math.PI + Math.atan(Math.abs(y / x));
                }
                else {
                    return -Math.atan(Math.abs(y / x));
                }
            }
        };
        trig.cos = function (rad) {
            rad = Chalkboard.trig.coterminal(rad);
            return (1 -
                Math.pow(rad, 2) / Chalkboard.numb.factorial(2) +
                Math.pow(rad, 4) / Chalkboard.numb.factorial(4) -
                Math.pow(rad, 6) / Chalkboard.numb.factorial(6) +
                Math.pow(rad, 8) / Chalkboard.numb.factorial(8) -
                Math.pow(rad, 10) / Chalkboard.numb.factorial(10) +
                Math.pow(rad, 12) / Chalkboard.numb.factorial(12) -
                Math.pow(rad, 14) / Chalkboard.numb.factorial(14) +
                Math.pow(rad, 16) / Chalkboard.numb.factorial(16) -
                Math.pow(rad, 18) / Chalkboard.numb.factorial(18) +
                Math.pow(rad, 20) / Chalkboard.numb.factorial(20) -
                Math.pow(rad, 22) / Chalkboard.numb.factorial(22) +
                Math.pow(rad, 24) / Chalkboard.numb.factorial(24) -
                Math.pow(rad, 26) / Chalkboard.numb.factorial(26) +
                Math.pow(rad, 28) / Chalkboard.numb.factorial(28));
        };
        trig.cosh = function (rad) {
            return (Math.pow(Chalkboard.E(), rad) + Math.pow(Chalkboard.E(), -rad)) / 2;
        };
        trig.cot = function (rad) {
            return 1 / Chalkboard.trig.tan(rad);
        };
        trig.coth = function (rad) {
            return 1 / Chalkboard.trig.tanh(rad);
        };
        trig.coterminal = function (rad) {
            return rad % (2 * Chalkboard.PI());
        };
        trig.csc = function (rad) {
            return 1 / Chalkboard.trig.sin(rad);
        };
        trig.csch = function (rad) {
            return 1 / Chalkboard.trig.sinh(rad);
        };
        trig.sec = function (rad) {
            return 1 / Chalkboard.trig.cos(rad);
        };
        trig.sech = function (rad) {
            return 1 / Chalkboard.trig.cosh(rad);
        };
        trig.sin = function (rad) {
            rad = Chalkboard.trig.coterminal(rad);
            return (rad -
                Math.pow(rad, 3) / Chalkboard.numb.factorial(3) +
                Math.pow(rad, 5) / Chalkboard.numb.factorial(5) -
                Math.pow(rad, 7) / Chalkboard.numb.factorial(7) +
                Math.pow(rad, 9) / Chalkboard.numb.factorial(9) -
                Math.pow(rad, 11) / Chalkboard.numb.factorial(11) +
                Math.pow(rad, 13) / Chalkboard.numb.factorial(13) -
                Math.pow(rad, 15) / Chalkboard.numb.factorial(15) +
                Math.pow(rad, 17) / Chalkboard.numb.factorial(17) -
                Math.pow(rad, 19) / Chalkboard.numb.factorial(19) +
                Math.pow(rad, 21) / Chalkboard.numb.factorial(21) -
                Math.pow(rad, 23) / Chalkboard.numb.factorial(23) +
                Math.pow(rad, 25) / Chalkboard.numb.factorial(25) -
                Math.pow(rad, 27) / Chalkboard.numb.factorial(27) +
                Math.pow(rad, 29) / Chalkboard.numb.factorial(29));
        };
        trig.sinh = function (rad) {
            return (Math.pow(Chalkboard.E(), rad) - Math.pow(Chalkboard.E(), -rad)) / 2;
        };
        trig.tan = function (rad) {
            return Chalkboard.trig.sin(rad) / Chalkboard.trig.cos(rad);
        };
        trig.tanh = function (rad) {
            return Chalkboard.trig.sinh(rad) / Chalkboard.trig.cosh(rad);
        };
        trig.toDeg = function (rad) {
            return rad * (180 / Chalkboard.PI());
        };
        trig.toRad = function (deg) {
            return deg * (Chalkboard.PI() / 180);
        };
    })(trig = Chalkboard.trig || (Chalkboard.trig = {}));
})(Chalkboard || (Chalkboard = {}));
var Chalkboard;
(function (Chalkboard) {
    var vect;
    (function (vect_4) {
        vect_4.absolute = function (vect) {
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
        vect_4.add = function (vect1, vect2) {
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
        vect_4.ang = function (vect) {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.trig.arctan2(vect.y, vect.x);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return [Math.acos(vect.x / Chalkboard.vect.mag(vect)), Math.acos(vect.y / Chalkboard.vect.mag(vect)), Math.acos(vect.z / Chalkboard.vect.mag(vect))];
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return [
                    Math.acos(vect.x / Chalkboard.vect.mag(vect)),
                    Math.acos(vect.y / Chalkboard.vect.mag(vect)),
                    Math.acos(vect.z / Chalkboard.vect.mag(vect)),
                    Math.acos(vect.w / Chalkboard.vect.mag(vect))
                ];
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_4.angBetween = function (vect1, vect2) {
            return Math.acos(Chalkboard.vect.dot(vect1, vect2) / (Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2)));
        };
        vect_4.constrain = function (vect, range) {
            if (range === void 0) { range = [0, 1]; }
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
        vect_4.copy = function (vect) {
            return Object.create(Object.getPrototypeOf(vect), Object.getOwnPropertyDescriptors(vect));
        };
        vect_4.cross = function (vect1, vect2) {
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
        vect_4.dimension = function (vectORvectfield) {
            var vect = vectORvectfield;
            var vectfield = vectORvectfield;
            if ((typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") ||
                (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "undefined" && typeof vectfield.s === "undefined")) {
                return 2;
            }
            else if ((typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") ||
                (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "string" && typeof vectfield.s === "undefined")) {
                return 3;
            }
            else if ((typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") ||
                (typeof vectfield.p === "string" && typeof vectfield.q === "string" && typeof vectfield.r === "string" && typeof vectfield.s === "string")) {
                return 4;
            }
            else {
                throw new TypeError('Parameter "vectORvectfield" must be of type "ChalkboardVector" or "ChalkboardVectorField" with 2, 3, or 4 dimensions.');
            }
        };
        vect_4.dist = function (vect1, vect2) {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y));
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z - vect1.z) * (vect2.z - vect1.z));
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return Chalkboard.real.sqrt((vect2.x - vect1.x) * (vect2.x - vect1.x) +
                    (vect2.y - vect1.y) * (vect2.y - vect1.y) +
                    (vect2.z - vect1.z) * (vect2.z - vect1.z) +
                    (vect2.w - vect1.w) * (vect2.w - vect1.w));
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_4.distsq = function (vect1, vect2) {
            if (Chalkboard.vect.isDimensionOf(vect1, 2) && Chalkboard.vect.isDimensionOf(vect2, 2)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 3) && Chalkboard.vect.isDimensionOf(vect2, 3)) {
                return (vect2.x - vect1.x) * (vect2.x - vect1.x) + (vect2.y - vect1.y) * (vect2.y - vect1.y) + (vect2.z - vect1.z) * (vect2.z - vect1.z);
            }
            else if (Chalkboard.vect.isDimensionOf(vect1, 4) && Chalkboard.vect.isDimensionOf(vect2, 4)) {
                return ((vect2.x - vect1.x) * (vect2.x - vect1.x) +
                    (vect2.y - vect1.y) * (vect2.y - vect1.y) +
                    (vect2.z - vect1.z) * (vect2.z - vect1.z) +
                    (vect2.w - vect1.w) * (vect2.w - vect1.w));
            }
            else {
                throw new TypeError('Parameters "vect1" and "vect2" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_4.dot = function (vect1, vect2) {
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
        vect_4.empty = function (dimension) {
            var _null = null;
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
        vect_4.field = function (p, q, r, s) {
            if (r === undefined && s === undefined) {
                return { p: p, q: q };
            }
            else if (s === undefined) {
                return { p: p, q: q, r: r };
            }
            else {
                return { p: p, q: q, r: r, s: s };
            }
        };
        vect_4.fill = function (num, dimension) {
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
        vect_4.fromAlternateToCartesian = function (vect, type) {
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
        vect_4.fromAngle = function (rad1, rad2) {
            if (typeof rad2 === "undefined") {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1), Chalkboard.trig.sin(rad1));
            }
            else {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad2));
            }
        };
        vect_4.fromCartesianToAlternate = function (vect, type) {
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
        vect_4.fromField = function (vectfield, vect) {
            if (Chalkboard.vect.dimension(vectfield) === 2 && Chalkboard.vect.isDimensionOf(vect, 2)) {
                var p = Chalkboard.real.parse("(x, y) => " + vectfield.p), q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                return Chalkboard.vect.init(p(vect.x, vect.y), q(vect.x, vect.y));
            }
            else if (Chalkboard.vect.dimension(vectfield) === 3 && Chalkboard.vect.isDimensionOf(vect, 3)) {
                var p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p), q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q), r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                return Chalkboard.vect.init(p(vect.x, vect.y, vect.z), q(vect.x, vect.y, vect.z), r(vect.x, vect.y, vect.z));
            }
            else if (Chalkboard.vect.dimension(vectfield) === 4 && Chalkboard.vect.isDimensionOf(vect, 4)) {
                var p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p), q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q), r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r), s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                return Chalkboard.vect.init(p(vect.x, vect.y, vect.z, vect.w), q(vect.x, vect.y, vect.z, vect.w), r(vect.x, vect.y, vect.z, vect.w), s(vect.x, vect.y, vect.z, vect.w));
            }
            else {
                throw new TypeError('Parameters "vectfield" and "vect" must respectively be of type "ChalkboardVector" and "ChalkboardVectorField" with 2, 3, or 4 dimensions.');
            }
        };
        vect_4.fromVector = function (vect) {
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
        vect_4.init = function (x, y, z, w) {
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
        vect_4.interp = function (vect, a, b, c, d) {
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
        vect_4.isDimensionEqual = function (vect1, vect2) {
            return Chalkboard.vect.dimension(vect1) === Chalkboard.vect.dimension(vect2);
        };
        vect_4.isDimensionOf = function (vectORvectfield, dimension) {
            if (dimension === 2) {
                return Chalkboard.vect.dimension(vectORvectfield) === 2;
            }
            else if (dimension === 3) {
                return Chalkboard.vect.dimension(vectORvectfield) === 3;
            }
            else if (dimension === 4) {
                return Chalkboard.vect.dimension(vectORvectfield) === 4;
            }
            else {
                throw new TypeError('Parameter "dimension" must be 2, 3, or 4.');
            }
        };
        vect_4.isEqual = function (vect1, vect2) {
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
        vect_4.isNormalized = function (vect) {
            return Chalkboard.vect.magsq(vect) === 1;
        };
        vect_4.isOrthogonal = function (vect1, vect2) {
            return Chalkboard.vect.dot(vect1, vect2) === 0;
        };
        vect_4.isParallel = function (vect1, vect2) {
            return Chalkboard.numb.isApproxEqual(Chalkboard.vect.dot(vect1, vect2), Chalkboard.vect.mag(vect1) * Chalkboard.vect.mag(vect2));
        };
        vect_4.isZero = function (vect) {
            return Chalkboard.vect.isEqual(vect, Chalkboard.vect.zero(vect));
        };
        vect_4.mag = function (vect) {
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
        vect_4.magset = function (vect, num) {
            return Chalkboard.vect.scl(Chalkboard.vect.normalize(vect), num);
        };
        vect_4.magsq = function (vect) {
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
        vect_4.negate = function (vect) {
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
        vect_4.normalize = function (vect) {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z / Chalkboard.vect.mag(vect));
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z / Chalkboard.vect.mag(vect), vect.w / Chalkboard.vect.mag(vect));
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
        vect_4.oproj = function (vect1, vect2) {
            return Chalkboard.vect.sub(vect1, Chalkboard.vect.proj(vect1, vect2));
        };
        vect_4.print = function (vect) {
            console.log(Chalkboard.vect.toString(vect));
        };
        vect_4.proj = function (vect1, vect2) {
            return Chalkboard.vect.scl(vect2, Chalkboard.vect.dot(vect1, vect2) / Chalkboard.vect.dot(vect2, vect2));
        };
        vect_4.random = function (inf, sup, dimension) {
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
        vect_4.reciprocate = function (vect) {
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
        vect_4.reflect = function (vect1, vect2) {
            return Chalkboard.vect.sub(vect1, Chalkboard.vect.scl(vect2, 2 * Chalkboard.vect.dot(vect1, vect2)));
        };
        vect_4.refract = function (vect1, vect2, refractiveIndex) {
            if (refractiveIndex > 0) {
                var perp = Chalkboard.vect.scl(Chalkboard.vect.sub(vect1, Chalkboard.vect.scl(vect2, Chalkboard.vect.dot(vect1, vect2))), refractiveIndex);
                var parr = Chalkboard.vect.scl(vect2, -Chalkboard.real.sqrt(1 - refractiveIndex * refractiveIndex * (1 - Chalkboard.vect.dot(vect1, vect2) * Chalkboard.vect.dot(vect1, vect2))));
                return Chalkboard.vect.add(perp, parr);
            }
            else {
                throw new RangeError('Parameter "refractiveIndex" must be of type "number" greater than 0.');
            }
        };
        vect_4.round = function (vect) {
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
        vect_4.scalarQuadruple = function (vect1, vect2, vect3, vect4) {
            return Chalkboard.vect.dot(Chalkboard.vect.cross(vect1, vect2), Chalkboard.vect.cross(vect3, vect4));
        };
        vect_4.scalarTriple = function (vect1, vect2, vect3) {
            return Chalkboard.vect.dot(vect1, Chalkboard.vect.cross(vect2, vect3));
        };
        vect_4.scl = function (vect, num) {
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
        vect_4.slope = function (vect) {
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
        vect_4.sub = function (vect1, vect2) {
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
        vect_4.toArray = function (vect) {
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
        vect_4.toComplex = function (vect) {
            return Chalkboard.comp.init(vect.x, vect.y);
        };
        vect_4.toMatrix = function (vect, axis) {
            if (axis === void 0) { axis = 0; }
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
        vect_4.toQuaternion = function (vect) {
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
        vect_4.toString = function (vect) {
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
        vect_4.toTensor = function (vect) {
            var _a;
            var size = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                size[_i - 1] = arguments[_i];
            }
            if (Array.isArray(size[0])) {
                size = size[0];
            }
            return (_a = Chalkboard.tens).resize.apply(_a, __spreadArray([Chalkboard.vect.toMatrix(vect)], size, false));
        };
        vect_4.vectorQuadruple = function (vect1, vect2, vect3, vect4) {
            return Chalkboard.vect.cross(Chalkboard.vect.cross(vect1, vect2), Chalkboard.vect.cross(vect3, vect4));
        };
        vect_4.vectorTriple = function (vect1, vect2, vect3) {
            return Chalkboard.vect.cross(vect1, Chalkboard.vect.cross(vect2, vect3));
        };
        vect_4.zero = function (vect) {
            if (Chalkboard.vect.isDimensionOf(vect, 2)) {
                return Chalkboard.vect.init(vect.x * 0, vect.y * 0);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 3)) {
                return Chalkboard.vect.init(vect.x * 0, vect.y * 0, vect.z * 0);
            }
            else if (Chalkboard.vect.isDimensionOf(vect, 4)) {
                return Chalkboard.vect.init(vect.x * 0, vect.y * 0, vect.z * 0, vect.w * 0);
            }
            else {
                throw new TypeError('Parameter "vect" must be of type "ChalkboardVector" with 2, 3, or 4 dimensions.');
            }
        };
    })(vect = Chalkboard.vect || (Chalkboard.vect = {}));
})(Chalkboard || (Chalkboard = {}));
//# sourceMappingURL=Chalkboard.js.map