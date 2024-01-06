/*
    The Chalkboard Library - Quaternion Namespace
    Version 1.7.0 Descartes
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace quat {
        export const absolute = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Math.abs(quat.a), Math.abs(quat.b), Math.abs(quat.c), Math.abs(quat.d));
        }
        export const add = (quat1: ChalkboardQuaternion, quat2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat1 === "number") {
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            }
            if(typeof quat2 === "number") {
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            }
            return Chalkboard.quat.init(quat1.a + quat2.a, quat1.b + quat2.b, quat1.c + quat2.c, quat1.d + quat2.d);
        }
        export const conjugate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a, -quat.b, -quat.c, -quat.d);
        }
        export const constrain = (quat: ChalkboardQuaternion, range: [number, number] = [0, 1]): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Chalkboard.numb.constrain(quat.a, range), Chalkboard.numb.constrain(quat.b, range), Chalkboard.numb.constrain(quat.c, range), Chalkboard.numb.constrain(quat.d, range));
        }
        export const copy = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Object.create(Object.getPrototypeOf(quat), Object.getOwnPropertyDescriptors(quat));
        }
        export const dist = (quat1: ChalkboardQuaternion, quat2: ChalkboardQuaternion): number => {
            if(typeof quat1 === "number") {
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            }
            if(typeof quat2 === "number") {
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            }
            return Chalkboard.real.sqrt(((quat2.a - quat1.a) * (quat2.a - quat1.a)) + ((quat2.b - quat1.b) * (quat2.b - quat1.b)) + ((quat2.c - quat1.c) * (quat2.c - quat1.c)) + ((quat2.d - quat1.d) * (quat2.d - quat1.d)));
        }
        export const distsq = (quat1: ChalkboardQuaternion, quat2: ChalkboardQuaternion): number => {
            if(typeof quat1 === "number") {
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            }
            if(typeof quat2 === "number") {
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            }
            return ((quat2.a - quat1.a) * (quat2.a - quat1.a)) + ((quat2.b - quat1.b) * (quat2.b - quat1.b)) + ((quat2.c - quat1.c) * (quat2.c - quat1.c)) + ((quat2.d - quat1.d) * (quat2.d - quat1.d));
        }
        export const div = (quat1: ChalkboardQuaternion, quat2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat1 === "number") {
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            }
            if(typeof quat2 === "number") {
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            }
            return Chalkboard.quat.init((quat1.a * quat2.a + quat1.b * quat2.b + quat1.c * quat2.c + quat1.d * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.b * quat2.a - quat1.a * quat2.b - quat1.d * quat2.c + quat1.c * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.c * quat2.a + quat1.d * quat2.b - quat1.a * quat2.c - quat1.b * quat2.d) / Chalkboard.quat.magsq(quat2), (quat1.d * quat2.a - quat1.c * quat2.b + quat1.b * quat2.c - quat1.a * quat2.d) / Chalkboard.quat.magsq(quat2));
        }
        export const fromAxis = (vect: ChalkboardVector, rad: number): ChalkboardQuaternion => {
            if(typeof vect.z !== "undefined") {
                return Chalkboard.quat.init(Chalkboard.trig.cos(rad / 2), vect.x * Chalkboard.trig.sin(rad / 2), vect.y * Chalkboard.trig.sin(rad / 2), vect.z * Chalkboard.trig.sin(rad / 2));
            } else {
                throw new TypeError("Parameter \"vect\" must be of type \"ChalkboardVector\" that has properties \"x\", \"y\", and \"z\".");
            }
        }
        export const init = (a: number, b: number = 0, c: number = 0, d: number = 0): ChalkboardQuaternion => {
            return {a: a, b: b, c: c, d: d};
        }
        export const invert = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.magsq(quat), -quat.b / Chalkboard.quat.magsq(quat), -quat.c / Chalkboard.quat.magsq(quat), -quat.d / Chalkboard.quat.magsq(quat));
        }
        export const mag = (quat: ChalkboardQuaternion): number => {
            return Chalkboard.real.sqrt((quat.a * quat.a) + (quat.b * quat.b) + (quat.c * quat.c) + (quat.d * quat.d));
        }
        export const magset = (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.scl(Chalkboard.quat.normalize(quat), num);
        }
        export const magsq = (quat: ChalkboardQuaternion): number => {
            return (quat.a * quat.a) + (quat.b * quat.b) + (quat.c * quat.c) + (quat.d * quat.d);
        }
        export const mul = (quat1: ChalkboardQuaternion, quat2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat1 === "number") {
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            }
            if(typeof quat2 === "number") {
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            }
            return Chalkboard.quat.init((quat1.a * quat2.a) - (quat1.b * quat2.b) - (quat1.c * quat2.c) - (quat1.d * quat2.d), (quat1.a * quat2.b) + (quat1.b * quat2.a) + (quat1.c * quat2.d) - (quat1.d * quat2.c), (quat1.a * quat2.c) - (quat1.b * quat2.d) + (quat1.c * quat2.a) + (quat1.d * quat2.b), (quat1.a * quat2.d) + (quat1.b * quat2.c) - (quat1.c * quat2.b) + (quat1.d * quat2.a));
        }
        export const negate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(-quat.a, -quat.b, -quat.c, -quat.d);
        }
        export const normalize = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a / Chalkboard.quat.mag(quat), quat.b / Chalkboard.quat.mag(quat), quat.c / Chalkboard.quat.mag(quat), quat.d / Chalkboard.quat.mag(quat));
        }
        export const print = (quat: ChalkboardQuaternion): void => {
            console.log(Chalkboard.quat.toString(quat));
        }
        export const random = (inf: number = 0, sup: number = 1): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup), Chalkboard.numb.random(inf, sup));
        }
        export const reciprocate = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(1 / quat.a, 1 / quat.b, 1 / quat.c, 1 / quat.d);
        }
        export const round = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(Math.round(quat.a), Math.round(quat.b), Math.round(quat.c), Math.round(quat.d));
        }
        export const scl = (quat: ChalkboardQuaternion, num: number): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a * num, quat.b * num, quat.c * num, quat.d * num);
        }
        export const sub = (quat1: ChalkboardQuaternion, quat2: ChalkboardQuaternion): ChalkboardQuaternion => {
            if(typeof quat1 === "number") {
                quat1 = Chalkboard.quat.init(quat1, 0, 0, 0);
            }
            if(typeof quat2 === "number") {
                quat2 = Chalkboard.quat.init(quat2, 0, 0, 0);
            }
            return Chalkboard.quat.init(quat1.a - quat2.a, quat1.b - quat2.b, quat1.c - quat2.c, quat1.d - quat2.d);
        }
        export const toArray = (quat: ChalkboardQuaternion): [number, number, number, number] => {
            return [quat.a, quat.b, quat.c, quat.d];
        }
        export const toRotation = (quat: ChalkboardQuaternion, vect: ChalkboardVector): ChalkboardVector => {
            let vector = Chalkboard.vect.toQuaternion(vect);
            let inverse = Chalkboard.quat.invert(quat);
            let quat_vector_inverse = Chalkboard.quat.mul(quat, Chalkboard.quat.mul(vector, inverse));
            return Chalkboard.vect.init(quat_vector_inverse.b, quat_vector_inverse.c, quat_vector_inverse.d);
        }
        export const toString = (quat: ChalkboardQuaternion): string => {
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
        }
        export const toVector = (quat: ChalkboardQuaternion): ChalkboardVector => {
            return Chalkboard.vect.init(quat.a, quat.b, quat.c, quat.d);
        }
        export const zero = (quat: ChalkboardQuaternion): ChalkboardQuaternion => {
            return Chalkboard.quat.init(quat.a * 0, quat.b * 0, quat.c * 0, quat.d * 0);
        }
    }
}