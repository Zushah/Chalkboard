/*
    The Chalkboard Library - Complex Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace comp {
        export const absolute = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Math.abs(comp.a), Math.abs(comp.b));
        }
        export const add = (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.init(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.init(comp_2, 0);
            }
            return Chalkboard.comp.init(comp_1.a + comp_2.a, comp_1.b + comp_2.b);
        }
        export const arg = (comp: ChalkboardComplex): number => {
            return Chalkboard.trig.arctan2(comp.b, comp.a);
        }
        export const conjugate = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a, -comp.b);
        }
        export const constrain = (comp: ChalkboardComplex, range: [number, number] = [0, 1]): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.constrain(comp.a, range), Chalkboard.numb.constrain(comp.b, range));
        }
        export const copy = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Object.create(Object.getPrototypeOf(comp), Object.getOwnPropertyDescriptors(comp));
        }
        export const define = (realDefinition: string, imagDefinition: string): ChalkboardFunction => {
            return {definition: [realDefinition, imagDefinition], type: "comp"};
        }
        export const dist = (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): number => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.init(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.init(comp_2, 0);
            }
            return Chalkboard.real.sqrt(((comp_2.a - comp_1.a) * (comp_2.a - comp_1.a)) + ((comp_2.b - comp_1.b) * (comp_2.b - comp_1.b)));
        }
        export const distsq = (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): number => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.init(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.init(comp_2, 0);
            }
            return ((comp_2.a - comp_1.a) * (comp_2.a - comp_1.a)) + ((comp_2.b - comp_1.b) * (comp_2.b - comp_1.b));
        }
        export const div = (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.init(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.init(comp_2, 0);
            }
            return Chalkboard.comp.init(((comp_1.a * comp_2.a) - (comp_1.b * comp_2.b)) / Chalkboard.comp.magsq(comp_2), ((comp_1.a * comp_2.b) + (comp_1.b * comp_2.a)) / Chalkboard.comp.magsq(comp_2));
        }
        export const Euler = (rad: number): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.trig.cos(rad), Chalkboard.trig.sin(rad));
        }
        export const Im = (funcORcomp: ChalkboardFunction | ChalkboardComplex): string | number => {
            if(funcORcomp.hasOwnProperty("definition")) {
                return (funcORcomp as ChalkboardFunction).definition[1];
            } else {
                return (funcORcomp as ChalkboardComplex).b;
            }
        }
        export const init = (a: number, b: number = 0): ChalkboardComplex => {
            return {a: a, b: b};
        }
        export const invert = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.magsq(comp), -comp.b / Chalkboard.comp.magsq(comp));
        }
        export const ln = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.real.ln(Chalkboard.comp.mag(comp)), Chalkboard.trig.arctan2(comp.b, comp.a));
        }
        export const mag = (comp: ChalkboardComplex): number => {
            return Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b));
        }
        export const magset = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.scl(Chalkboard.comp.normalize(comp), num);
        }
        export const magsq = (comp: ChalkboardComplex): number => {
            return (comp.a * comp.a) + (comp.b * comp.b);
        }
        export const mul = (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.init(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.init(comp_2, 0);
            }
            return Chalkboard.comp.init((comp_1.a * comp_2.a) - (comp_1.b * comp_2.b), (comp_1.a * comp_2.b) + (comp_1.b * comp_2.a));
        }
        export const negate = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(-comp.a, -comp.b);
        }
        export const normalize = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a / Chalkboard.comp.mag(comp), comp.b / Chalkboard.comp.mag(comp));
        }
        export const parse = (str: string): Function => {
            return Function('"use strict"; ' + Chalkboard.PARSEPREFIX + ' return (' + str + ')')();
        }
        export const pow = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.cos(num * Chalkboard.comp.arg(comp)), Chalkboard.real.pow(Chalkboard.comp.mag(comp), num) * Chalkboard.trig.sin(num * Chalkboard.comp.arg(comp)));
        }
        export const print = (comp: ChalkboardComplex): void => {
            console.log(Chalkboard.comp.toString(comp));
        }
        export const random = (inf: number = 0, sup: number = 1): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        }
        export const Re = (funcORcomp: ChalkboardFunction | ChalkboardComplex): string | number => {
            if(funcORcomp.hasOwnProperty("definition")) {
                return (funcORcomp as ChalkboardFunction).definition[0];
            } else {
                return (funcORcomp as ChalkboardComplex).a;
            }
        }
        export const reciprocate = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(1 / comp.a, 1 / comp.b);
        }
        export const root = (comp: ChalkboardComplex, index: number = 3): ChalkboardComplex[] => {
            let result = [];
            let r = Chalkboard.comp.mag(comp);
            let t = Chalkboard.comp.arg(comp);
            for(let i = 0; i < index; i++) {
                result.push(Chalkboard.comp.init(Chalkboard.real.root(r, index) * Chalkboard.trig.cos((t + Chalkboard.PI(2 * i)) / index), Chalkboard.real.root(r, index) * Chalkboard.trig.sin((t + Chalkboard.PI(2 * i)) / index)));
            }
            return result;
        }
        export const rotate = (comp: ChalkboardComplex, rad: number): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.comp.mag(comp) * Chalkboard.trig.cos(Chalkboard.comp.arg(comp) + rad), Chalkboard.comp.mag(comp) * Chalkboard.trig.sin(Chalkboard.comp.arg(comp) + rad));
        }
        export const round = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Math.round(comp.a), Math.round(comp.b));
        }
        export const scl = (comp: ChalkboardComplex, num: number): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a * num, comp.b * num);
        }
        export const slope = (comp: ChalkboardComplex): number => {
            return comp.b / comp.a;
        }
        export const sq = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init((comp.a * comp.a) - (comp.b * comp.b), 2 * comp.a * comp.b);
        }
        export const sqrt = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(Chalkboard.real.sqrt((comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2), Chalkboard.numb.sgn(comp.b) * Chalkboard.real.sqrt((-comp.a + Chalkboard.real.sqrt((comp.a * comp.a) + (comp.b * comp.b))) / 2));
        }
        export const sub = (comp_1: ChalkboardComplex, comp_2: ChalkboardComplex): ChalkboardComplex => {
            if(typeof comp_1 === "number") {
                comp_1 = Chalkboard.comp.init(comp_1, 0);
            }
            if(typeof comp_2 === "number") {
                comp_2 = Chalkboard.comp.init(comp_2, 0);
            }
            return Chalkboard.comp.init(comp_1.a - comp_2.a, comp_1.b - comp_2.b);
        }
        export const toArray = (comp: ChalkboardComplex): [number, number] => {
            return [comp.a, comp.b];
        }
        export const toString = (comp: ChalkboardComplex): string => {
            if(comp.b >= 0) {
                return comp.a.toString() + " + " + comp.b.toString() + "i";
            } else {
                return comp.a.toString() + " - " + Math.abs(comp.b).toString() + "i";
            }
        }
        export const toVector = (comp: ChalkboardComplex): ChalkboardVector => {
            return Chalkboard.vect.init(comp.a, comp.b);
        }
        export const val = (func: ChalkboardFunction, comp: ChalkboardComplex): ChalkboardComplex => {
            if(func.type === "comp") {
                let u = Chalkboard.comp.parse("(a, b) => " + func.definition[0]),
                    v = Chalkboard.comp.parse("(a, b) => " + func.definition[1]);
                return Chalkboard.comp.init(u(comp.a, comp.b), v(comp.a, comp.b));
            } else {
                throw new TypeError("Parameter \"func\" must be of type \"ChalkboardFunction\" with a type property of \"comp\".");
            }
        }
        export const zero = (comp: ChalkboardComplex): ChalkboardComplex => {
            return Chalkboard.comp.init(comp.a * 0, comp.b * 0);
        }
    }
}