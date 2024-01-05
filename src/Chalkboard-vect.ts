/*
    The Chalkboard Library - Vector Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace vect {
        export const absolute = (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(Math.abs(vect.x), Math.abs(vect.y), Math.abs(vect.z), Math.abs(vect.w));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const add = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init(vect_1.x + vect_2.x, vect_1.y + vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init(vect_1.x + vect_2.x, vect_1.y + vect_2.y, vect_1.z + vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.vect.init(vect_1.x + vect_2.x, vect_1.y + vect_2.y, vect_1.z + vect_2.z, vect_1.w + vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const ang = (vect: ChalkboardVector): number | number[] => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.trig.arctan2(vect.y, vect.x);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return [Math.acos(vect.x / Chalkboard.vect.mag(vect)), Math.acos(vect.y / Chalkboard.vect.mag(vect)), Math.acos(vect.z / Chalkboard.vect.mag(vect))];
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return [Math.acos(vect.x / Chalkboard.vect.mag(vect)), Math.acos(vect.y / Chalkboard.vect.mag(vect)), Math.acos(vect.z / Chalkboard.vect.mag(vect)), Math.acos(vect.w / Chalkboard.vect.mag(vect))];
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const angBetween = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            return Math.acos((Chalkboard.vect.dot(vect_1, vect_2)) / (Chalkboard.vect.mag(vect_1) * Chalkboard.vect.mag(vect_2)));
        }
        export const constrain = (vect: ChalkboardVector, range: [number, number] = [0, 1]): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z, range));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(Chalkboard.numb.constrain(vect.x, range), Chalkboard.numb.constrain(vect.y, range), Chalkboard.numb.constrain(vect.z, range), Chalkboard.numb.constrain(vect.w, range));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const copy = (vect: ChalkboardVector): ChalkboardVector => {
            return Object.create(Object.getPrototypeOf(vect), Object.getOwnPropertyDescriptors(vect));
        }
        export const cross = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init(0, 0, (vect_1.x * vect_2.y) - (vect_1.y * vect_2.x));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init((vect_1.y * vect_2.z) - (vect_1.z * vect_2.y), (vect_1.z * vect_2.x) - (vect_1.x * vect_2.z), (vect_1.x * vect_2.y) - (vect_1.y * vect_2.x));
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2 or 3 dimensions.");
            }
        }
        export const dimension = (vectORvectfield: ChalkboardVector | ChalkboardVectorField): 2 | 3 | 4 => {
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
        }
        export const dist = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.real.sqrt(((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.real.sqrt(((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z)));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.real.sqrt(((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z)) + ((vect_2.w - vect_1.w) * (vect_2.w - vect_1.w)));
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const distsq = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return ((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return ((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z));
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return ((vect_2.x - vect_1.x) * (vect_2.x - vect_1.x)) + ((vect_2.y - vect_1.y) * (vect_2.y - vect_1.y)) + ((vect_2.z - vect_1.z) * (vect_2.z - vect_1.z)) + ((vect_2.w - vect_1.w) * (vect_2.w - vect_1.w));
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const dot = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): number => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return (vect_1.x * vect_2.x) + (vect_1.y * vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return (vect_1.x * vect_2.x) + (vect_1.y * vect_2.y) + (vect_1.z * vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return (vect_1.x * vect_2.x) + (vect_1.y * vect_2.y) + (vect_1.z * vect_2.z) + (vect_1.w * vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const empty = (dimension: 2 | 3 | 4): ChalkboardVector => {
            const _null = null as unknown as number;
            if(dimension === 2) {
                return Chalkboard.vect.init(_null, _null);
            } else if(dimension === 3) {
                return Chalkboard.vect.init(_null, _null, _null)
            } else if(dimension === 4) {
                return Chalkboard.vect.init(_null, _null, _null, _null);
            } else {
                throw new TypeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        }
        export const field = (p: string, q: string, r?: string, s?: string): ChalkboardVectorField => {
            if(r === undefined && s === undefined) {
                return {p: p, q: q};
            } else if(s === undefined) {
                return {p: p, q: q, r: r};
            } else {
                return {p: p, q: q, r: r, s: s};
            }
        }
        export const fill = (num: number, dimension: 2 | 3 | 4): ChalkboardVector => {
            if(dimension === 2) {
                return Chalkboard.vect.init(num, num);
            } else if(dimension === 3) {
                return Chalkboard.vect.init(num, num, num);
            } else if(dimension === 4) {
                return Chalkboard.vect.init(num, num, num, num);
            } else {
                throw new TypeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        }
        export const fromAlternateToCartesian = (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            if(type === "polar" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.y * Chalkboard.trig.sin(vect.y));
            } else if(type === "bipolar" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init((vect.x * vect.x - vect.y * vect.y) / 4, Chalkboard.real.sqrt(16 * vect.x * vect.x - (vect.x * vect.x - vect.y * vect.y + 4) * (vect.x * vect.x - vect.y * vect.y + 4)));
            } else if(type === "cylindrical" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.y), vect.z);
            } else if(type === "spherical" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x * Chalkboard.trig.sin(vect.z) * Chalkboard.trig.cos(vect.y), vect.x * Chalkboard.trig.sin(vect.z) * Chalkboard.trig.sin(vect.y), vect.x * Chalkboard.trig.cos(vect.z));
            } else {
                throw new TypeError("Parameter \"type\" must be \"polar\", \"bipolar\", \"cylindrical\", or \"spherical\".");
            }
        }
        export const fromAngle = (rad1: number, rad2?: number): ChalkboardVector => {
            if(typeof rad2 === "undefined") {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1), Chalkboard.trig.sin(rad1));
            } else {
                return Chalkboard.vect.init(Chalkboard.trig.cos(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad1) * Chalkboard.trig.cos(rad2), Chalkboard.trig.sin(rad2));
            }
        }
        export const fromCartesianToAlternate = (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical"): ChalkboardVector => {
            if(type === "polar" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(vect) as number);
            } else if(type === "bipolar" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init((vect.x + 1) * (vect.x + 1) + (vect.y * vect.y), (vect.x - 1) * (vect.x - 1) + (vect.y * vect.y));
            } else if(type === "cylindrical" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Chalkboard.vect.mag(Chalkboard.vect.init(vect.x, vect.y)), Chalkboard.vect.ang(Chalkboard.vect.init(vect.x, vect.y)) as number, vect.z);
            } else if(type === "spherical" && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Chalkboard.vect.mag(vect), Chalkboard.vect.ang(Chalkboard.vect.init(vect.x, vect.y)) as number, (Chalkboard.vect.ang(vect) as number[])[2]);
            } else {
                throw new TypeError("Parameter \"type\" must be \"polar\", \"bipolar\", \"cylindrical\", or \"spherical\".");
            }
        }
        export const fromField = (vectfield: ChalkboardVectorField, vect: ChalkboardVector): ChalkboardVector => {
            if(Chalkboard.vect.dimension(vectfield) === 2 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                let p = Chalkboard.real.parse("(x, y) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y) => " + vectfield.q);
                return Chalkboard.vect.init(p(vect.x, vect.y), q(vect.x, vect.y));
            } else if(Chalkboard.vect.dimension(vectfield) === 3 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                let p = Chalkboard.real.parse("(x, y, z) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z) => " + vectfield.r);
                return Chalkboard.vect.init(p(vect.x, vect.y, vect.z), q(vect.x, vect.y, vect.z), r(vect.x, vect.y, vect.z));
            } else if(Chalkboard.vect.dimension(vectfield) === 4 && typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                let p = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.p),
                    q = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.q),
                    r = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.r),
                    s = Chalkboard.real.parse("(x, y, z, w) => " + vectfield.s);
                return Chalkboard.vect.init(p(vect.x, vect.y, vect.z, vect.w), q(vect.x, vect.y, vect.z, vect.w), r(vect.x, vect.y, vect.z, vect.w), s(vect.x, vect.y, vect.z, vect.w));
            } else {
                throw new TypeError("Parameters \"vectfield\" and \"vect\" must respectively be of type \"ChalkboardVector\" and \"ChalkboardVectorField\" with 2, 3, or 4 dimensions.");
            }
        }
        export const fromVector = (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x, vect.y, 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x, vect.y, vect.z, 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(vect.x, vect.y);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const init = (x: number, y: number, z?: number, w?: number): ChalkboardVector => {
            if(z === undefined && w === undefined) {
                return {x: x, y: y};
            } else if(w === undefined) {
                return {x: x, y: y, z: z};
            } else {
                return {x: x, y: y, z: z, w: w};
            }
        }
        export const mag = (vect: ChalkboardVector): number => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z) + (vect.w * vect.w));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const magset = (vect: ChalkboardVector, num: number): ChalkboardVector => {
            return Chalkboard.vect.scl(Chalkboard.vect.normalize(vect), num);
        }
        export const magsq = (vect: ChalkboardVector): number => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return (vect.x * vect.x) + (vect.y * vect.y);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return (vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return (vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z) + (vect.w * vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const mul = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init(vect_1.x * vect_2.x, vect_1.y * vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init(vect_1.x * vect_2.x, vect_1.y * vect_2.y, vect_1.z * vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.vect.init(vect_1.x * vect_2.x, vect_1.y * vect_2.y, vect_1.z * vect_2.z, vect_1.w * vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const negate = (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(-vect.x, -vect.y);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(-vect.x, -vect.y, -vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(-vect.x, -vect.y, -vect.z, -vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const normalize = (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect))
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z / Chalkboard.vect.mag(vect));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(vect.x / Chalkboard.vect.mag(vect), vect.y / Chalkboard.vect.mag(vect), vect.z / Chalkboard.vect.mag(vect), vect.w / Chalkboard.vect.mag(vect));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const oproj = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.sub(vect_1, Chalkboard.vect.proj(vect_1, vect_2));
        }
        export const print = (vect: ChalkboardVector): void => {
            console.log(Chalkboard.vect.toString(vect));
        }
        export const proj = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.scl(vect_2, Chalkboard.vect.dot(vect_1, vect_2) / Chalkboard.vect.dot(vect_2, vect_2));
        }
        export const pull = (vect: ChalkboardVector, component: 1 | 2 | 3 | 4): number | ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return vect.y;
                } else {
                    return vect.x;
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return Chalkboard.vect.init(0, vect.y, vect.z);
                } else if(component === 2) {
                    return Chalkboard.vect.init(vect.x, 0, vect.z);
                } else {
                    return Chalkboard.vect.init(vect.x, vect.y);
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(component === 1) {
                    return Chalkboard.vect.init(0, vect.y, vect.z, vect.w);
                } else if(component === 2) {
                    return Chalkboard.vect.init(vect.x, 0, vect.z, vect.w);
                } else if(component === 3) {
                    return Chalkboard.vect.init(vect.x, vect.y, 0, vect.w);
                } else {
                    return Chalkboard.vect.init(vect.x, vect.y, vect.z);
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const push = (vect: ChalkboardVector, component: 1 | 2 | 3 | 4, num: number): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return Chalkboard.vect.init(num, vect.y);
                } else if(component === 2) {
                    return Chalkboard.vect.init(vect.x, num);
                } else if(component === 3) {
                    return Chalkboard.vect.init(vect.x, vect.y, num);
                } else {
                    return Chalkboard.vect.init(vect.x, vect.y, 0, num);
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(component === 1) {
                    return Chalkboard.vect.init(num, vect.y, vect.z);
                } else if(component === 2) {
                    return Chalkboard.vect.init(vect.x, num, vect.z);
                } else if(component === 3) {
                    return Chalkboard.vect.init(vect.x, vect.y, num);
                } else {
                    return Chalkboard.vect.init(vect.x, vect.y, vect.z, num);
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(component === 1) {
                    return Chalkboard.vect.init(num, vect.y, vect.z, vect.w);
                } else if(component === 2) {
                    return Chalkboard.vect.init(vect.x, num, vect.z, vect.w);
                } else if(component === 3) {
                    return Chalkboard.vect.init(vect.x, vect.y, num, vect.w);
                } else {
                    return Chalkboard.vect.init(vect.x, vect.y, vect.z, num);
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const random = (inf: number, sup: number, dimension: 2 | 3 | 4): ChalkboardVector => {
            if(dimension === 2) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else if(dimension === 3) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else if(dimension === 4) {
                return Chalkboard.vect.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
            } else {
                throw new TypeError("Parameter \"dimension\" must be 2, 3, or 4.");
            }
        }
        export const reciprocate = (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y, 1 / vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(1 / vect.x, 1 / vect.y, 1 / vect.z, 1 / vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const reflect = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.sub(vect_1, Chalkboard.vect.scl(vect_2, 2 * Chalkboard.vect.dot(vect_1, vect_2)));
        }
        export const refract = (vect_1: ChalkboardVector, vect_2: ChalkboardVector, refractiveIndex: number): ChalkboardVector => {
            if(refractiveIndex > 0) {
                let perp = Chalkboard.vect.scl(Chalkboard.vect.sub(vect_1, Chalkboard.vect.scl(vect_2, Chalkboard.vect.dot(vect_1, vect_2))), refractiveIndex);
                let parr = Chalkboard.vect.scl(vect_2, -Chalkboard.real.sqrt(1 - (refractiveIndex * refractiveIndex) * (1 - (Chalkboard.vect.dot(vect_1, vect_2) * Chalkboard.vect.dot(vect_1, vect_2)))));
                return Chalkboard.vect.add(perp, parr);
            } else {
                throw new RangeError("Parameter \"refractiveIndex\" must be of type \"number\" greater than 0.");
            }
        }
        export const round = (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(Math.round(vect.x), Math.round(vect.y), Math.round(vect.z), Math.round(vect.w));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const scalarQuadruple = (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector, vect_4: ChalkboardVector): number => {
            return Chalkboard.vect.dot(Chalkboard.vect.cross(vect_1, vect_2), Chalkboard.vect.cross(vect_3, vect_4));
        }
        export const scalarTriple = (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector): number => {
            return Chalkboard.vect.dot(vect_1, Chalkboard.vect.cross(vect_2, vect_3));
        }
        export const scl = (vect: ChalkboardVector, num: number): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x * num, vect.y * num);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x * num, vect.y * num, vect.z * num);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(vect.x * num, vect.y * num, vect.z * num, vect.w * num);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const slope = (vect: ChalkboardVector): number => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return vect.y / vect.x;
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return vect.z / Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y));
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return vect.w / Chalkboard.real.sqrt((vect.x * vect.x) + (vect.y * vect.y) + (vect.z * vect.z));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const sub = (vect_1: ChalkboardVector, vect_2: ChalkboardVector): ChalkboardVector => {
            if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "undefined" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "undefined" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init(vect_1.x - vect_2.x, vect_1.y - vect_2.y);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "undefined") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "undefined")) {
                return Chalkboard.vect.init(vect_1.x - vect_2.x, vect_1.y - vect_2.y, vect_1.z - vect_2.z);
            } else if((typeof vect_1.x === "number" && typeof vect_1.y === "number" && typeof vect_1.z === "number" && typeof vect_1.w === "number") && (typeof vect_2.x === "number" && typeof vect_2.y === "number" && typeof vect_2.z === "number" && typeof vect_2.w === "number")) {
                return Chalkboard.vect.init(vect_1.x - vect_2.x, vect_1.y - vect_2.y, vect_1.z - vect_2.z, vect_1.w - vect_2.w);
            } else {
                throw new TypeError("Parameters \"vect_1\" and \"vect_2\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const toArray = (vect: ChalkboardVector): [number, number] | [number, number, number] | [number, number, number, number] => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return [vect.x, vect.y];
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return [vect.x, vect.y, vect.z];
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return [vect.x, vect.y, vect.z, vect.w];
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const toComplex = (vect: ChalkboardVector): ChalkboardComplex => {
            return Chalkboard.comp.init(vect.x, vect.y);
        }
        export const toMatrix = (vect: ChalkboardVector, type: "col" | "row" = "col"): ChalkboardMatrix => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                if(type === "col") {
                    return Chalkboard.matr.init([vect.x], [vect.y]);
                } else if(type === "row") {
                    return Chalkboard.matr.init([vect.x, vect.y]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                if(type === "col") {
                    return Chalkboard.matr.init([vect.x], [vect.y], [vect.z]);
                } else if(type === "row") {
                    return Chalkboard.matr.init([vect.x, vect.y, vect.z]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                if(type === "col") {
                    return Chalkboard.matr.init([vect.x], [vect.y], [vect.z], [vect.w]);
                } else if(type === "row") {
                    return Chalkboard.matr.init([vect.x, vect.y, vect.z, vect.w]);
                } else {
                    throw new TypeError("Parameter \"type\" must be \"col\" or \"row\".");
                }
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const toQuaternion = (vect: ChalkboardVector): ChalkboardQuaternion => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.quat.init(vect.x, vect.y, 0, 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.quat.init(0, vect.x, vect.y, vect.z);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.quat.init(vect.x, vect.y, vect.z, vect.w);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const toString = (vect: ChalkboardVector): string => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ")";
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z.toString() + ")";
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return "(" + vect.x.toString() + ", " + vect.y.toString() + ", " + vect.z.toString() + ", " + vect.w.toString() + ")";
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
        export const toTensor = (vect: ChalkboardVector, ...size: number[]): ChalkboardTensor => {
            if(Array.isArray(size[0])) {
                size = size[0];
            }
            return Chalkboard.tens.resize(Chalkboard.vect.toMatrix(vect), ...size);
        }
        export const vectorQuadruple = (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector, vect_4: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(Chalkboard.vect.cross(vect_1, vect_2), Chalkboard.vect.cross(vect_3, vect_4));
        }
        export const vectorTriple = (vect_1: ChalkboardVector, vect_2: ChalkboardVector, vect_3: ChalkboardVector): ChalkboardVector => {
            return Chalkboard.vect.cross(vect_1, Chalkboard.vect.cross(vect_2, vect_3));
        }
        export const zero = (vect: ChalkboardVector): ChalkboardVector => {
            if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "undefined" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x * 0, vect.y * 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "undefined") {
                return Chalkboard.vect.init(vect.x * 0, vect.y * 0, vect.z * 0);
            } else if(typeof vect.x === "number" && typeof vect.y === "number" && typeof vect.z === "number" && typeof vect.w === "number") {
                return Chalkboard.vect.init(vect.x * 0, vect.y * 0, vect.z * 0, vect.w * 0);
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" with 2, 3, or 4 dimensions.");
            }
        }
    }
}