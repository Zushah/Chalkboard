/*
 * Chalkboard - Abstract Algebra Namespace
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The abstract algebra namespace.
     * @namespace
     */
    export namespace abal {
        /** @ignore */
        const $ = JSON.stringify;

        /**
         * The set of all even permutations of n elements, denoted as An.
         * @param {number} n - The number of elements
         * @returns {ChalkboardSet<number[]>}
         * @example
         * const result = Chalkboard.abal.A(4); // Returns the alternating group A₄
         */
        export const A = (n: number): ChalkboardSet<number[]> => {
            if (!Number.isInteger(n) || n <= 0) throw new Error(`Chalkboard.abal.A: Parameter "n" must be a positive integer.`);
            const Sn = Chalkboard.abal.S(n);
            const isEvenPermutation = (perm: number[]): boolean => {
                let inversions = 0;
                for (let i = 0; i < perm.length; i++) {
                    for (let j = i + 1; j < perm.length; j++) {
                        if (perm[i] > perm[j]) inversions++;
                    }
                }
                return inversions % 2 === 0;
            };
            const elements = (Sn.elements || []).filter(isEvenPermutation);
            return {
                contains: (element: number[]) => elements.some((perm) => $(perm) === $(element)),
                elements: elements,
                id: `A${n}`
            };
        };

        /**
         * Defines an automorphism of an algebraic structure.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The algebraic structure which is both the domain and codomain of the morphism
         * @param {(element: T) => T} mapping - The bijective function that takes an element from the structure and maps it to another element in the same structure
         * @returns {ChalkboardMorphism<T, T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const inverse = Chalkboard.abal.automorphism(Z4, (x) => (3 * x) % 4); // Defines an automorphism of Z₄
         */
        export const automorphism = <T>(struc: ChalkboardStructure<T>, mapping: (element: T) => T): ChalkboardMorphism<T, T> => {
            const morphism = Chalkboard.abal.homomorphism(struc, struc, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) throw new Error(`Chalkboard.abal.automorphism: The mapping is not a homomorphism, so it cannot be an automorphism.`);
            if (!Chalkboard.abal.isBijective(morphism)) throw new Error(`Chalkboard.abal.automorphism: The mapping is not bijective, so it cannot be an automorphism.`);
            return morphism;
        };

        /**
         * The set of all complex numbers, denoted as C, or the set of nth roots of unity when n is provided.
         * @param {number} [n] - The degree of the roots of unity (optional, returns the set of all complex numbers if omitted)
         * @returns {ChalkboardSet<ChalkboardComplex>}
         * @example
         * const result = Chalkboard.abal.C(5); // Returns the complex fifth roots of unity
         */
        export const C = (n?: number): ChalkboardSet<ChalkboardComplex> => {
            if (n === undefined) {
                return {
                    contains: (element: ChalkboardComplex) => {
                        return typeof element.a === "number" && typeof element.b === "number";
                    },
                    id: "C"
                };
            } else {
                if (!Number.isInteger(n) || n <= 0) throw new Error(`Chalkboard.abal.C: Parameter "n" must be a positive integer.`);
                const elements: ChalkboardComplex[] = [];
                for (let k = 0; k < n; k++) {
                    const t = (2 * Math.PI * k) / n;
                    elements.push(Chalkboard.comp.init(Chalkboard.numb.roundTo(Math.cos(t), 0.0001), Chalkboard.numb.roundTo(Math.sin(t), 0.0001)));
                }
                return {
                    contains: (element: ChalkboardComplex) => elements.some((e) => {
                        return e.a === element.a && e.b === element.b;
                    }),
                    elements: elements,
                    id: `C${n}`
                };
            }
        };

        /**
         * Calculates the cardinality of a set or algebraic structure.
         * @template T
         * @param {ChalkboardSet<T> | ChalkboardStructure<T>} struc - The set or structure
         * @returns {number}
         * @example
         * const residues = Chalkboard.abal.Z(7);
         * const order = Chalkboard.abal.cardinality(residues); // Returns 7
         */
        export const cardinality = <T>(struc: ChalkboardSet<T> | ChalkboardStructure<T>): number => {
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
            throw new Error(`Chalkboard.abal.cardinality: The inputted structure does not have a finite cardinality or is missing elements.`);
        };

        /**
         * Calculates the Cartesian product of two sets.
         * @template T, U
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<U>} set2 - The second set
         * @returns {ChalkboardSet<[T, U]>}
         * @example
         * const bits = Chalkboard.abal.Z(2);
         * const pairs = Chalkboard.abal.Cartesian(bits, bits); // Returns the four ordered bit pairs
         */
        export const Cartesian = <T, U>(set1: ChalkboardSet<T>, set2: ChalkboardSet<U>): ChalkboardSet<[T, U]> => {
            if (set1 === null || typeof set1 !== "object" || typeof (set1 as any).contains !== "function") throw new Error(`Chalkboard.abal.Cartesian: Parameter "set1" must be a set.`);
            if (set2 === null || typeof set2 !== "object" || typeof (set2 as any).contains !== "function") throw new Error(`Chalkboard.abal.Cartesian: Parameter "set2" must be a set.`);
            const result: [T, U][] = [];
            for (const a of set1.elements || []) {
                for (const b of set2.elements || []) {
                    result.push([a, b]);
                }
            }
            return Chalkboard.abal.set(result);
        };

        /**
         * Calculates the Cayley table for an algebraic structure.
         * @param {ChalkboardStructure<number>} struc - The algebraic structure
         * @param {"add" | "mul"} [type="add"] - The type of operation to calculate the Cayley table for ("add" for additive operations, "mul" for multiplicative operations, defaults to "add")
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const table = Chalkboard.abal.Cayley(Z4); // Returns the addition table of Z₄
         */
        export const Cayley = (struc: ChalkboardStructure<number>, type: "add" | "mul" = "add"): ChalkboardMatrix => {
            if (!struc.set.elements) throw new Error(`Chalkboard.abal.Cayley: The structure must have a finite set of elements.`);
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
                throw new Error(`Chalkboard.abal.Cayley: The "type" parameter for groups should remain as the default add since there is no distinction between their additive and multiplicative Cayley tables.`);
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
            throw new Error(`Chalkboard.abal.Cayley: Invalid algebraic structure for Cayley table.`);
        };

        /**
         * Calculates the center of a group.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @returns {ChalkboardSet<T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const center = Chalkboard.abal.center(Z4); // Returns all of Z₄ because it is abelian
         */
        export const center = <T>(group: ChalkboardStructure<T>): ChalkboardSet<T> => {
            if (group === null || typeof group !== "object" || (group as any).set === null || typeof (group as any).set !== "object" || typeof ((group as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.center: Parameter "group" must be an algebraic structure.`);
            const { set, operation } = group;
            if (!set.elements || !operation) {
                return Chalkboard.abal.set<T>([]);
            }
            const result = set.elements.filter((z) =>
                (set.elements ?? []).every((g) => operation(z, g) === operation(g, z))
            );
            return Chalkboard.abal.set(result);
        };

        /**
         * Calculates the complement of a set relative to a superset.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @param {ChalkboardSet<T>} superset - The superset
         * @returns {ChalkboardSet<T>}
         * @example
         * const universal = Chalkboard.abal.set([1, 2, 3, 4, 5]);
         * const primes = Chalkboard.abal.set([2, 3, 5]);
         * const composite = Chalkboard.abal.complement(primes, universal); // Returns {1, 4}
         */
        export const complement = <T>(set: ChalkboardSet<T>, superset: ChalkboardSet<T>): ChalkboardSet<T> => {
            if (set === null || typeof set !== "object" || typeof (set as any).contains !== "function") throw new Error(`Chalkboard.abal.complement: Parameter "set" must be a set.`);
            if (superset === null || typeof superset !== "object" || typeof (superset as any).contains !== "function") throw new Error(`Chalkboard.abal.complement: Parameter "superset" must be a set.`);
            return Chalkboard.abal.set((superset.elements || []).filter((element) => !set.contains(element)));
        };

        /**
         * Calculates the composition of two morphisms.
         * @param {ChalkboardMorphism<T, U>} morph1 - The first morphism
         * @param {ChalkboardMorphism<U, V>} morph2 - The second morphism
         * @returns {ChalkboardMorphism<T, V>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const double = Chalkboard.abal.endomorphism(Z4, (x) => (2 * x) % 4);
         * const identity = Chalkboard.abal.idmorphism(Z4);
         * const composition = Chalkboard.abal.compose(double, identity); // Composes the two morphisms
         */
        export const compose = <T, U, V>(morph1: ChalkboardMorphism<T, U>, morph2: ChalkboardMorphism<U, V>): ChalkboardMorphism<T, V> => {
            if (!Chalkboard.abal.isHomomorphism(morph1) || !Chalkboard.abal.isHomomorphism(morph2)) throw new Error(`Chalkboard.abal.compose: Both morphisms of the morphism composition must be homomorphisms.`);
            if (!Chalkboard.abal.isEqual(morph1.struc2, morph2.struc1)) throw new Error(`Chalkboard.abal.compose: The codomain of the first morphism and the domain of the second morphism must be equal to calculate the composition morphism.`);
            return Chalkboard.abal.homomorphism(morph1.struc1, morph2.struc2, (x) => morph2.mapping(morph1.mapping(x)));
        };

        /**
         * Copies a set, structure, structure extension, or morphism.
         * @template T, U
         * @param {ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardStructureExtension<T, U> | ChalkboardMorphism<T, U>} struc - The set, structure, structure extension, or morphism
         * @returns {ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardStructureExtension<T, U> | ChalkboardMorphism<T, U>}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const copy = Chalkboard.abal.copy(set); // Returns an independent copy
         */
        export const copy = <T, U extends T>(struc: ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardStructureExtension<T, U> | ChalkboardMorphism<T, U>): ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardStructureExtension<T, U> | ChalkboardMorphism<T, U> => {
            const isSet = (obj: any): obj is ChalkboardSet<T> => obj && typeof obj.contains === "function" && (!obj.set && !obj.struc1 && !obj.base);
            const isStructure = (obj: any): obj is ChalkboardStructure<T> => obj && obj.set && (obj.operation || obj.add || obj.mul);
            const isExtension = (obj: any): obj is ChalkboardStructureExtension<T, U> => obj && obj.base && obj.extension && typeof obj.degree === "number";
            const isMorphism = (obj: any): obj is ChalkboardMorphism<T, U> => obj && obj.struc1 && obj.struc2 && typeof obj.mapping === "function";
            if (isSet(struc)) {
                const copiedSet: ChalkboardSet<T> = {
                    contains: struc.contains,
                    ...(struc.id && { id: struc.id }),
                    ...(struc.elements && { elements: [...struc.elements] })
                };
                return copiedSet;
            } 
            if (isStructure(struc)) {
                const copiedSet = Chalkboard.abal.copy(struc.set) as ChalkboardSet<T>;
                const copiedStructure: ChalkboardStructure<T> = {
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
                const copiedBase = Chalkboard.abal.copy(struc.base) as ChalkboardStructure<T>;
                const copiedExtension = Chalkboard.abal.copy(struc.extension) as ChalkboardStructure<U>;
                const copiedExtensionStructure: ChalkboardStructureExtension<T, U> = {
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
                const copiedStruc1 = Chalkboard.abal.copy(struc.struc1) as ChalkboardStructure<T>;
                const copiedStruc2 = Chalkboard.abal.copy(struc.struc2) as ChalkboardStructure<U>; 
                const copiedMorphism: ChalkboardMorphism<T, U> = {
                    struc1: copiedStruc1,
                    struc2: copiedStruc2,
                    mapping: struc.mapping
                };
                return copiedMorphism;
            }
            throw new Error(`Chalkboard.abal.copy: The "struc" must be a set, structure, structure extension, or morphism.`);
        };

        /**
         * Calculates the cosets of a subgroup or ideal with respect to a group or ring.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The group or ring
         * @param {ChalkboardStructure<T>} substruc - The subgroup or ideal
         * @returns {ChalkboardSet<ChalkboardSet<T>>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const H = Chalkboard.abal.group(Chalkboard.abal.set([0, 2]), (a, b) => (a + b) % 4, 0, (a) => a);
         * const cosets = Chalkboard.abal.coset(Z4, H); // Returns the cosets of {0, 2}
         */
        export const coset = <T>(struc: ChalkboardStructure<T>, substruc: ChalkboardStructure<T>): ChalkboardSet<ChalkboardSet<T>> => {
            if ("operation" in struc && !Chalkboard.abal.isSubgroup(struc, substruc.set)) throw new Error(`Chalkboard.abal.coset: The "substruc" must be a subgroup of the "struc".`); else if ("add" in struc && !Chalkboard.abal.isIdeal(struc, substruc.set)) throw new Error(`Chalkboard.abal.coset: The "substruc" must be an ideal of the "struc".`);
            const elements = Chalkboard.abal.toArray(struc.set);
            const subElements = Chalkboard.abal.toArray(substruc.set);
            const cosets = new Map<string, ChalkboardSet<T>>();
            elements.forEach((g) => {
                const cosetElements = subElements.map(h => 
                    "operation" in struc ? 
                    struc.operation!(g, h) : 
                    struc.add!(g, h)
                );
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

        /**
         * Generates the cyclic subgroup of an element in a group.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @param {T} element - The generator of the cyclic subgroup
         * @returns {ChalkboardSet<T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const subgroup = Chalkboard.abal.cyclicSubgroup(Z4, 2); // Returns {0, 2}
         */
        export const cyclicSubgroup = <T>(group: ChalkboardStructure<T>, element: T): ChalkboardSet<T> => {
            if (group.set.id && ["Z", "Q", "R", "C"].includes(group.set.id)) throw new Error(`Chalkboard.abal.cyclicSubgroup: The "group" must be finite.`);
            const result: T[] = [];
            let current = element;
            if (!group.operation) {
                return Chalkboard.abal.set<T>([]);
            }
            do {
                result.push(current);
                current = group.operation(current, element);
            } while (!result.includes(current));
            return Chalkboard.abal.set(result);
        };

        /**
         * The set of all rotations and reflections of a polygon with n sides, denoted as Dn.
         * @param {number} n - The number of sides of the polygon
         * @returns {ChalkboardSet<string>}
         * @example
         * const result = Chalkboard.abal.D(4); // Returns the symmetries of a square
         */
        export const D = (n: number): ChalkboardSet<string> => {
            if (!Number.isInteger(n) || n <= 0) throw new Error(`Chalkboard.abal.D: Parameter "n" must be a positive integer.`);
            const elements: string[] = [];
            for (let i = 0; i < n; i++) {
                elements.push(`r${i}`);
            }
            for (let i = 0; i < n; i++) {
                elements.push(`s${i}`);
            }
            return {
                contains: (element: string) => elements.includes(element),
                elements: elements,
                id: `D${n}`
            };
        };

        /**
         * Calculates the difference of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         * @example
         * const a = Chalkboard.abal.set([1, 2, 3, 4]);
         * const b = Chalkboard.abal.set([3, 4, 5]);
         * const difference = Chalkboard.abal.difference(a, b); // Returns {1, 2}
         */
        export const difference = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            if (set1 === null || typeof set1 !== "object" || typeof (set1 as any).contains !== "function") throw new Error(`Chalkboard.abal.difference: Parameter "set1" must be a set.`);
            if (set2 === null || typeof set2 !== "object" || typeof (set2 as any).contains !== "function") throw new Error(`Chalkboard.abal.difference: Parameter "set2" must be a set.`);
            const result = (set1.elements || []).filter((element) => !set2.contains(element));
            return Chalkboard.abal.set(result);
        };

        /**
         * Calculates the direct product or direct sum of two algebraic structures.
         * @template T, U
         * @param {ChalkboardStructure<T>} struc1 - The first structure
         * @param {ChalkboardStructure<U>} struc2 - The second structure
         * @param {"product" | "sum"} [type="product"] - The type of direct operation ("product" or "sum", defaults to "product").
         * @returns {ChalkboardStructure<[T, U]>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const Z2 = Chalkboard.abal.group(Chalkboard.abal.Z(2), (a, b) => (a + b) % 2, 0, (a) => a);
         * const product = Chalkboard.abal.direct(Z4, Z2); // Returns Z₄ × Z₂
         */
        export const direct = <T, U>(struc1: ChalkboardStructure<T>, struc2: ChalkboardStructure<U>, type: "product" | "sum" = "product"): ChalkboardStructure<[T, U]> => {
            const set = Chalkboard.abal.Cartesian(struc1.set, struc2.set);
            const add = (a: [T, U], b: [T, U]): [T, U] => [
                (struc1 as any).add(a[0], b[0]),
                (struc2 as any).add(a[1], b[1])
            ];
            const mul = (a: [T, U], b: [T, U]): [T, U] => [
                (struc1 as any).mul(a[0], b[0]),
                (struc2 as any).mul(a[1], b[1])
            ];
            const addIdentity: [T, U] = [
                (struc1 as any).addIdentity,
                (struc2 as any).addIdentity
            ];
            const mulIdentity: [T, U] = [
                (struc1 as any).mulIdentity,
                (struc2 as any).mulIdentity
            ];
            const addInverter = (a: [T, U]): [T, U] => [
                (struc1 as any).addInverter(a[0]),
                (struc2 as any).addInverter(a[1])
            ];
            const mulInverter = (a: [T, U]): [T, U] => [
                (struc1 as any).mulInverter(a[0]),
                (struc2 as any).mulInverter(a[1])
            ];
            if ("operation" in struc1 && "operation" in struc2) {
                const operation = (a: [T, U], b: [T, U]): [T, U] => [
                    (struc1.operation as (x: T, y: T) => T)(a[0], b[0]),
                    (struc2.operation as (x: U, y: U) => U)(a[1], b[1])
                ];
                const identity: [T, U] = [struc1.identity as T, struc2.identity as U];
                if ("inverter" in struc1 && "inverter" in struc2) {
                    const inverter = (a: [T, U]): [T, U] => [
                        (struc1.inverter as (x: T) => T)(a[0]),
                        (struc2.inverter as (x: U) => U)(a[1])
                    ];
                    if (type === "sum") {
                        if (!struc1.set.elements || !struc2.set.elements) throw new Error(`Chalkboard.abal.direct: Direct sum is only defined for finite groups.`);
                    }
                    return Chalkboard.abal.group(set, operation, identity, inverter);
                }
                if (type === "sum") {
                    if (!struc1.set.elements || !struc2.set.elements) throw new Error(`Chalkboard.abal.direct: Direct sum is only defined for finite structures.`);
                }
                return Chalkboard.abal.monoid(set, operation, identity);
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2) {
                if (type === "sum") {
                    if (!struc1.set.elements || !struc2.set.elements) throw new Error(`Chalkboard.abal.direct: Direct sum is only defined for finite rings.`);
                }
                return Chalkboard.abal.ring(set, add, mul, addIdentity, mulIdentity, addInverter);
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2 && "mulInverter" in struc1 && "mulInverter" in struc2) {
                if (type === "sum") {
                    if (!struc1.set.elements || !struc2.set.elements) throw new Error(`Chalkboard.abal.direct: Direct sum is only defined for finite fields.`);
                }
                return Chalkboard.abal.field(set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter);
            }
            throw new Error(`Chalkboard.abal.direct: Invalid algebraic structures for direct product or sum.`);
        };

        /**
         * Defines an endomorphism of an algebraic structure.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The algebraic structure which is both the domain and codomain of the morphism
         * @param {(element: T) => T} mapping - The function that takes an element from the structure and maps it to another element in the same structure
         * @returns {ChalkboardMorphism<T, T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const double = Chalkboard.abal.endomorphism(Z4, (x) => (2 * x) % 4); // Defines x ↦ 2x
         */
        export const endomorphism = <T>(struc: ChalkboardStructure<T>, mapping: (element: T) => T): ChalkboardMorphism<T, T> => {
            const morphism = Chalkboard.abal.homomorphism(struc, struc, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) throw new Error(`Chalkboard.abal.endomorphism: The mapping is not a homomorphism, so it cannot be an endomorphism.`);
            return morphism;
        };

        /**
         * Defines an algebraic structure known as a field.
         * @template T
         * @param {ChalkboardSet<T>} set - The set of the field
         * @param {(a: T, b: T) => T} add - The additive operation of the field
         * @param {(a: T, b: T) => T} mul - The multiplicative operation of the field
         * @param {T} [addIdentity] - The additive identity element of the field
         * @param {T} [mulIdentity] - The multiplicative identity element of the field
         * @param {(a: T) => T} [addInverter] - The function to calculate the additive inverse of an element of the field (optional if the set is Z, Q, R, C, or M)
         * @param {(a: T) => T} [mulInverter] - The function to calculate the multiplicative inverse of an element of the field (optional if the set is Z, Q, R, C, or M)
         * @returns {ChalkboardStructure<T>}
         * @example
         * const Q = Chalkboard.abal.field(Chalkboard.abal.Q(), (a, b) => a + b, (a, b) => a * b);
         * const valid = Chalkboard.abal.isField(Q); // Checks the field of rational numbers
         */
        export const field = <T>(set: ChalkboardSet<T>, add: (a: T, b: T) => T, mul: (a: T, b: T) => T, addIdentity?: T, mulIdentity?: T, addInverter?: (a: T) => T, mulInverter?: (a: T) => T): ChalkboardStructure<T> => {
            const autoconfig = (): { addIdentity: T; mulIdentity: T; addInverter: (a: T) => T; mulInverter: (a: T) => T } => {
                if (!set.id) throw new Error(`Chalkboard.abal.field: The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", "addInverter", and "mulInverter" explicitly.`);
                if (set.id === "Q" || set.id === "R") {
                    return {
                        addIdentity: 0 as T,
                        mulIdentity: 1 as T,
                        addInverter: (a: T) => (-a as unknown) as T,
                        mulInverter: (a: T) => (1 / (a as unknown as number)) as T
                    };
                } else if (set.id === "C") {
                    return {
                        addIdentity: Chalkboard.comp.init(0, 0) as T,
                        mulIdentity: Chalkboard.comp.init(1, 0) as T,
                        addInverter: (a: T) => Chalkboard.comp.negate(a as unknown as ChalkboardComplex) as T,
                        mulInverter: (a: T) => Chalkboard.comp.invert(a as unknown as ChalkboardComplex) as T
                    };
                }
                throw new Error(`Chalkboard.abal.field: Automatic configuration of the "addIdentity", "mulIdentity", "addInverter", and "mulInverter" properties is not available for the inputted "set".`);
            };
            
            const configured = typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined" ? autoconfig() : { addIdentity, mulIdentity, addInverter, mulInverter };
            const field: ChalkboardStructure<T> = { set, add, mul, addIdentity: configured.addIdentity, mulIdentity: configured.mulIdentity, addInverter: configured.addInverter, mulInverter: configured.mulInverter };
            if (!Chalkboard.abal.isField(field)) throw new Error(`Chalkboard.abal.field: The inputted "set", "add", "mul", "addIdentity", "mulIdentity", "addInverter", and "mulInverter" do not form a field.`);
            return field;
        };

        /**
         * Defines an algebraic structure extension known as a field extension.
         * @template T, U
         * @property {ChalkboardStructure<T>} base - The algebraic structure which is a substructure of the extension structure
         * @property {ChalkboardStructure<U>} extension - The algebraic structure which is an extension of the base structure
         * @property {number} [degree] - The dimension of the extension structure as a vector space over the base structure (optional for extensions of Q, R, or C)
         * @property {ChalkboardVector[]} [basis] - The basis vectors of the extension structure (optional for extensions of Q, R, or C)
         * @property {boolean} [isFinite] - Whether the extension structure is finite or not (optional for extensions of Q, R, or C)
         * @property {boolean} [isSimple] - Whether the extension structure is simple or not (optional for extensions of Q, R, or C)
         * @property {boolean} [isAlgebraic] - Whether the extension structure is algebraic or not (optional for extensions of Q, R, or C)
         * @returns {ChalkboardStructureExtension<T, U>}
         * @example
         * const Q = Chalkboard.abal.field(Chalkboard.abal.Q(), (a, b) => a + b, (a, b) => a * b);
         * const extension = Chalkboard.abal.fieldExtension(Q, Q, 1, [Chalkboard.vect.init(1, 0)], false, true, true); // Describes a degree-one extension
         */
        export const fieldExtension = <T, U extends T>(base: ChalkboardStructure<T>, extension: ChalkboardStructure<U>, degree: number, basis: ChalkboardVector[], isFinite: boolean, isSimple: boolean, isAlgebraic: boolean): ChalkboardStructureExtension<T, U> => {
            if (!Chalkboard.abal.isSubfield(base as ChalkboardStructure<unknown>, extension.set as ChalkboardSet<unknown>)) throw new Error(`Chalkboard.abal.fieldExtension: The "base" must be a subfield of the "extension".`);
            const autoconfig = (): { degree: number; basis: ChalkboardVector[]; isFinite: boolean; isSimple: boolean; isAlgebraic: boolean } => {
                if (!base.set.id) throw new Error(`Chalkboard.abal.fieldExtension: The "set" property of the "base" must have a valid "id" property, or you must input "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" explicitly.`);
                if (base.set.id === "Q" && extension.set.id === "R") {
                    return {
                        degree: Infinity,
                        basis: [],
                        isFinite: false,
                        isSimple: false,
                        isAlgebraic: false
                    };
                } else if (base.set.id === "R" && extension.set.id === "C") {
                    return {
                        degree: 2,
                        basis: [Chalkboard.vect.init(1, 0), Chalkboard.vect.init(0, 1)],
                        isFinite: true,
                        isSimple: true,
                        isAlgebraic: true
                    };
                }
                throw new Error(`Chalkboard.abal.fieldExtension: Automatic configuration of the "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" properties is not available for the inputted "base".`);
            };
            const configured = typeof degree === "undefined" || typeof basis === "undefined" || typeof isFinite === "undefined" || typeof isSimple === "undefined" || typeof isAlgebraic === "undefined" ? autoconfig() : { degree, basis, isFinite, isSimple, isAlgebraic };
            return { base, extension, degree: configured.degree, basis: configured.basis, isFinite: configured.isFinite, isSimple: configured.isSimple, isAlgebraic: configured.isAlgebraic };
        };

        /**
         * The set of all real-valued invertible matrices of size "n" x "n", denoted as GLn.
         * @param {number} n - The number of rows/columns
         * @returns {ChalkboardSet<ChalkboardMatrix>}
         * @example
         * const result = Chalkboard.abal.GL(2); // Returns the set of invertible 2-by-2 matrices
         */
        export const GL = (n: number): ChalkboardSet<ChalkboardMatrix> => {
            if (!Number.isInteger(n) || n <= 0) throw new Error(`Chalkboard.abal.GL: Parameter "n" must be a positive integer.`);
            return {
                contains: (element: ChalkboardMatrix) => {
                    return Array.isArray(element) && Chalkboard.matr.isSizeOf(element, n) && Chalkboard.matr.isInvertible(element);
                },
                id: `GL${n}`
            };
        };

        /**
         * Defines an algebraic structure known as a group.
         * @template T
         * @param {ChalkboardSet<T>} set - The set of the group
         * @param {(a: T, b: T) => T} operation - The operation of the group
         * @param {T} [identity] - The identity element of the group (optional if the set is Z, Q, R, C, A, S, M, or GL)
         * @param {(a: T) => T} [inverter] - The function to calculate the inverse of an element of the group (optional if the set is Z, Q, R, C, M, A, S, or GL)
         * @returns {ChalkboardStructure<T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isGroup(Z4); // Returns true
         */
        export const group = <T>(set: ChalkboardSet<T>, operation: (a: T, b: T) => T, identity?: T, inverter?: (a: T) => T): ChalkboardStructure<T> => {
            const autoconfig = (): { identity: T; inverter: (a: T) => T } => {
                if (!set.id) throw new Error(`Chalkboard.abal.group: The "set" must have a valid "id" property, or you must input "identity" and "inverter" explicitly.`);
                if (set.id === "Z" || set.id === "Q" || set.id === "R") {
                    return {
                        identity: 0 as T,
                        inverter: (a: T) => (-a as unknown) as T
                    };
                } else if (set.id === "C") {
                    return {
                        identity: Chalkboard.comp.init(0, 0) as T,
                        inverter: (a: T) => Chalkboard.comp.negate(a as unknown as ChalkboardComplex) as T
                    };
                } else if (set.id.startsWith("Z") && set.id.length > 1) {
                    const n = parseInt(set.id.slice(1), 10);
                    return {
                        identity: 0 as T,
                        inverter: (a: T) => ((n - (a as unknown as number) % n) % n) as T
                    };
                } else if (set.id.startsWith("C") && set.id.length > 1) {
                    return {
                        identity: Chalkboard.comp.init(1, 0) as T,
                        inverter: (a: T) => Chalkboard.comp.conjugate(a as unknown as ChalkboardComplex) as T
                    };
                } else if (set.id.startsWith("M(")) {
                    const rows = (set as any).rows;
                    const cols = (set as any).cols;
                    return {
                        identity: Chalkboard.matr.fill(0, rows, cols) as T,
                        inverter: (a: T) => Chalkboard.matr.negate(a as unknown as ChalkboardMatrix) as T
                    };
                } else if (set.id.startsWith("GL")) {
                    const n = parseInt(set.id.slice(2), 10);
                    return {
                        identity: Chalkboard.matr.identity(n) as T,
                        inverter: (a: T) => Chalkboard.matr.invert(a as unknown as ChalkboardMatrix) as T
                    };
                } else if (set.id.match(/^[SA]\d+$/)) {
                    const n = parseInt(set.id.slice(1), 10);
                    return {
                        identity: Array.from({length: n}, (_, i) => i) as T,
                        inverter: (a: T) => {
                            const perm = a as unknown as number[];
                            const inverse = new Array(perm.length);
                            for (let i = 0; i < perm.length; i++) inverse[perm[i]] = i;
                            return inverse as T;
                        }
                    };
                }
                throw new Error(`Chalkboard.abal.group: Automatic configuration of the "identity" and "inverter" properties is not available for the inputted "set".`);
            };
            const configured = typeof identity === "undefined" || typeof inverter === "undefined" ? autoconfig() : { identity, inverter: inverter };
            const group: ChalkboardStructure<T> = { set, operation, identity: configured.identity, inverter: configured.inverter };
            if (!Chalkboard.abal.isGroup(group)) throw new Error(`Chalkboard.abal.group: The inputted "set", "operation", "identity", and "inverter" do not form a group.`);
            return group;
        };

        /**
         * Defines a homomorphism between two algebraic structures.
         * @template T, U
         * @param {ChalkboardStructure<T>} struc1 - The first algebraic structure which is the domain of the morphism
         * @param {ChalkboardStructure<U>} struc2 - The second algebraic structure which is the codomain of the morphism
         * @param {(element: T) => U} mapping - The function that takes an element from the first structure and maps it to the second structure
         * @returns {ChalkboardMorphism<T, U>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const Z2 = Chalkboard.abal.group(Chalkboard.abal.Z(2), (a, b) => (a + b) % 2, 0, (a) => a);
         * const parity = Chalkboard.abal.homomorphism(Z4, Z2, (x) => x % 2); // Defines the quotient map
         */
        export const homomorphism = <T, U>(struc1: ChalkboardStructure<T>, struc2: ChalkboardStructure<U>, mapping: (element: T) => U): ChalkboardMorphism<T, U> => {
            const morphism: ChalkboardMorphism<T, U> = { struc1, struc2, mapping };
            if (!Chalkboard.abal.isHomomorphism(morphism)) throw new Error(`Chalkboard.abal.homomorphism: The inputted "struc1", "struc2", and "mapping" do not form a homomorphism.`);
            return morphism;
        };

        /**
         * Defines the identity morphism for an algebraic structure.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The algebraic structure which is the domain and codomain of the morphism
         * @returns {ChalkboardMorphism<T, T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const identity = Chalkboard.abal.idmorphism(Z4); // Maps every residue to itself
         */
        export const idmorphism = <T>(struc: ChalkboardStructure<T>): ChalkboardMorphism<T, T> => {
            if (struc === null || typeof struc !== "object" || (struc as any).set === null || typeof (struc as any).set !== "object" || typeof ((struc as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.idmorphism: Parameter "struc" must be an algebraic structure.`);
            return Chalkboard.abal.automorphism(struc, (x) => x);
        };

        /**
         * Calculates the image of a morphism, either for its domain or for a subset of its domain.
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The morphism
         * @param {ChalkboardSet<T>} [subset] - The subset of the domain (optional, defaults to the domain)
         * @returns {ChalkboardSet<U>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const Z2 = Chalkboard.abal.group(Chalkboard.abal.Z(2), (a, b) => (a + b) % 2, 0, (a) => a);
         * const parity = Chalkboard.abal.homomorphism(Z4, Z2, (x) => x % 2);
         * const image = Chalkboard.abal.image(parity); // Returns Z₂
         */
        export const image = <T, U>(morph: ChalkboardMorphism<T, U>, subset?: ChalkboardSet<T>): ChalkboardSet<U> => {
            const { struc1, mapping } = morph;
            if (!struc1.set.elements) throw new Error(`Chalkboard.abal.image: The domain of the "morph" must have a finite set of elements to calculate the image.`);
            const _subset = subset || struc1.set;
            if (!_subset.elements) throw new Error(`Chalkboard.abal.image: The domain of the "morph" or the subset of it must have a finite set of elements to calculate the image.`);
            const mapped = _subset.elements.map(mapping);
            const result = Array.from(new Set(mapped.map((e) => $(e)))).map((e) => JSON.parse(e));
            return Chalkboard.abal.set(result);
        };

        /**
         * Calculates the intersection of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         * @example
         * const even = Chalkboard.abal.set([0, 2, 4, 6]);
         * const small = Chalkboard.abal.set([0, 1, 2, 3]);
         * const intersection = Chalkboard.abal.intersection(even, small); // Returns {0, 2}
         */
        export const intersection = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            if (set1 === null || typeof set1 !== "object" || typeof (set1 as any).contains !== "function") throw new Error(`Chalkboard.abal.intersection: Parameter "set1" must be a set.`);
            if (set2 === null || typeof set2 !== "object" || typeof (set2 as any).contains !== "function") throw new Error(`Chalkboard.abal.intersection: Parameter "set2" must be a set.`);
            const result = (set1.elements || []).filter((element) => set2.contains(element));
            return Chalkboard.abal.set(result);
        };

        /**
         * Defines the inverse morphism for an isomorphism (which is the only type of morphism that is invertible).
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The isomorphism
         * @returns {ChalkboardMorphism<T, T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const inverse = Chalkboard.abal.automorphism(Z4, (x) => (3 * x) % 4);
         * const original = Chalkboard.abal.invmorphism(inverse); // Returns the inverse morphism
         */
        export const invmorphism = <T, U>(morph: ChalkboardMorphism<T, U>): ChalkboardMorphism<U, T> => {
            if (morph.struc1.set.id && ["Z", "Q", "R", "C"].includes(morph.struc1.set.id)) throw new Error(`Chalkboard.abal.invmorphism: Inverse morphisms cannot be defined for morphisms with infinite domains.`);
            if (!Chalkboard.abal.isIsomorphism(morph)) throw new Error(`Chalkboard.abal.invmorphism: The morphism is not an isomorphism, so it does not have an inverse.`);
            return Chalkboard.abal.homomorphism(morph.struc2, morph.struc1, (y: U) => {
                const domain = morph.struc1.set.elements || [];
                for (const x of domain) {
                    if ($(morph.mapping(x)) === $(y)) {
                        return x;
                    }
                }
                throw new Error(`Chalkboard.abal.invmorphism: The inverse morphism failed to be defined because no element in the domain maps to the element "${$(y)}" in the codomain.`);
            });
        };

        /**
         * Checks if a morphism is an automorphism.
         * @template T
         * @param {ChalkboardMorphism<T, T>} morph - The morphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const morphism = Chalkboard.abal.automorphism(Z4, (x) => (3 * x) % 4);
         * const valid = Chalkboard.abal.isAutomorphism(morphism); // Returns true
         */
        export const isAutomorphism = <T>(morph: ChalkboardMorphism<T, T>): boolean => {
            if (morph === null || typeof morph !== "object" || (morph as any).struc1 === null || typeof (morph as any).struc1 !== "object" || (morph as any).struc2 === null || typeof (morph as any).struc2 !== "object" || typeof (morph as any).mapping !== "function") throw new Error(`Chalkboard.abal.isAutomorphism: Parameter "morph" must be an algebraic morphism.`);
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isEndomorphism(morph) && Chalkboard.abal.isIsomorphism(morph);
        };

        /**
         * Checks if a morphism is bijective (i.e. both injective and surjective).
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The morphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const identity = Chalkboard.abal.idmorphism(Z4);
         * const valid = Chalkboard.abal.isBijective(identity); // Returns true
         */
        export const isBijective = <T, U>(morph: ChalkboardMorphism<T, U>): boolean => {
            if (morph === null || typeof morph !== "object" || (morph as any).struc1 === null || typeof (morph as any).struc1 !== "object" || (morph as any).struc2 === null || typeof (morph as any).struc2 !== "object" || typeof (morph as any).mapping !== "function") throw new Error(`Chalkboard.abal.isBijective: Parameter "morph" must be an algebraic morphism.`);
            if (["Z", "Q", "R", "C"].includes(morph.struc1.set.id || "") || ["Z", "Q", "R", "C"].includes(morph.struc2.set.id || "")) {
                return morph.struc1.set.id === morph.struc2.set.id;
            }
            return Chalkboard.abal.isInjective(morph) && Chalkboard.abal.isSurjective(morph);
        };

        /**
         * Checks if a set is closed under an operation.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @param {(a: T, b: T) => T} operation - The operation
         * @returns {boolean}
         * @example
         * const residues = Chalkboard.abal.Z(5);
         * const valid = Chalkboard.abal.isClosed(residues, (a, b) => (a + b) % 5); // Returns true
         */
        export const isClosed = <T>(set: ChalkboardSet<T>, operation: (a: T, b: T) => T): boolean => {
            if (set === null || typeof set !== "object" || typeof (set as any).contains !== "function") throw new Error(`Chalkboard.abal.isClosed: Parameter "set" must be a set.`);
            if (typeof operation !== "function") throw new Error(`Chalkboard.abal.isClosed: Parameter "operation" must be a function.`);
            if (set.id && ["Z", "Q", "R", "C"].includes(set.id)) {
                return true;
            }
            if (set.id?.startsWith("M(")) {
                if (operation === Chalkboard.matr.add as unknown as (a: T, b: T) => T) {
                    return true;
                }
                if (operation === Chalkboard.matr.mul as unknown as (a: T, b: T) => T) {
                    const dimensions = set.id.match(/\d+/g)?.map(Number);
                    if (dimensions && dimensions.length >= 2) {
                        return dimensions[0] === dimensions[1];
                    }
                }
                return false;
            }
            if (set.id === "C") {
                if (operation === Chalkboard.comp.add as unknown as (a: T, b: T) => T || operation === Chalkboard.comp.mul as unknown as (a: T, b: T) => T) {
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

        /**
         * Checks if an algebraic structure is commutative.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The algebraic structure
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isCommutative(Z4); // Returns true
         */
        export const isCommutative = <T>(struc: ChalkboardStructure<T>): boolean => {
            if (struc === null || typeof struc !== "object" || (struc as any).set === null || typeof (struc as any).set !== "object" || typeof ((struc as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isCommutative: Parameter "struc" must be an algebraic structure.`);
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

        /**
         * Checks if a subgroup of a group is a cyclic subgroup.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @param {ChalkboardSet<T>} subgroup - The subgroup
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const H = Chalkboard.abal.set([0, 2]);
         * const valid = Chalkboard.abal.isCyclicSubgroup(Z4, H); // Returns true
         */
        export const isCyclicSubgroup = <T>(group: ChalkboardStructure<T>, subgroup: ChalkboardSet<T>): boolean => {
            if (group === null || typeof group !== "object" || (group as any).set === null || typeof (group as any).set !== "object" || typeof ((group as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isCyclicSubgroup: Parameter "group" must be an algebraic structure.`);
            if (subgroup === null || typeof subgroup !== "object" || typeof (subgroup as any).contains !== "function") throw new Error(`Chalkboard.abal.isCyclicSubgroup: Parameter "subgroup" must be a set.`);
            if (!Chalkboard.abal.isSubgroup(group, subgroup) || !group.operation) {
                return false;
            }
            const { operation } = group;
            for (const generator of subgroup.elements || []) {
                const generatedElements: T[] = [];
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

        /**
         * Checks if a set or algebraic structure is empty.
         * @template T
         * @param {ChalkboardSet<T> | ChalkboardStructure<T>} struc - The structure to check
         * @returns {boolean}
         * @example
         * const empty = Chalkboard.abal.set([]);
         * const valid = Chalkboard.abal.isEmpty(empty); // Returns true
         */
        export const isEmpty = <T>(struc: ChalkboardSet<T> | ChalkboardStructure<T>): boolean => {
            if (struc === null || typeof struc !== "object" || (typeof (struc as any).contains !== "function" && (((struc as any).set === null || typeof (struc as any).set !== "object") || typeof ((struc as any).set as any).contains !== "function"))) throw new Error(`Chalkboard.abal.isEmpty: Parameter "struc" must be a set or algebraic structure.`);
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

        /**
         * Checks if a morphism is an endomorphism.
         * @template T
         * @param {ChalkboardMorphism<T, T>} morph - The morphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const double = Chalkboard.abal.endomorphism(Z4, (x) => (2 * x) % 4);
         * const valid = Chalkboard.abal.isEndomorphism(double); // Returns true
         */
        export const isEndomorphism = <T>(morph: ChalkboardMorphism<T, T>): boolean => {
            if (morph === null || typeof morph !== "object" || (morph as any).struc1 === null || typeof (morph as any).struc1 !== "object" || (morph as any).struc2 === null || typeof (morph as any).struc2 !== "object" || typeof (morph as any).mapping !== "function") throw new Error(`Chalkboard.abal.isEndomorphism: Parameter "morph" must be an algebraic morphism.`);
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isEqual(morph.struc1, morph.struc2);
        };

        /**
         * Checks if two sets, algebraic structures, or morphisms are equal.
         * @template T, U
         * @param {ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardMorphism<T, U>} struc1 - The first set, structure, or morphism
         * @param {ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardMorphism<T, U>} struc2 - The second set, structure, or morphism
         * @returns {boolean}
         * @example
         * const a = Chalkboard.abal.set([1, 2, 3]);
         * const b = Chalkboard.abal.set([3, 2, 1]);
         * const valid = Chalkboard.abal.isEqual(a, b); // Returns true
         */
        export const isEqual = <T, U>(struc1: ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardMorphism<T, U>, struc2: ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardMorphism<T, U>): boolean => {
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
                const monoiroup1 = struc1 as ChalkboardStructure<T>;
                const monoiroup2 = struc2 as ChalkboardStructure<T>;
                const monoidEqual = Chalkboard.abal.isEqual(monoiroup1.set, monoiroup2.set) &&
                    monoiroup1.identity === monoiroup2.identity &&
                    (
                        monoiroup1.operation === monoiroup2.operation ||
                        (monoiroup1.operation as (x: T, y: T) => T).toString() === (monoiroup2.operation as (x: T, y: T) => T).toString()
                    );
                if ("inverter" in monoiroup1 && "inverter" in monoiroup2) {
                    return monoidEqual && (
                        monoiroup1.inverter === monoiroup2.inverter ||
                        (monoiroup1.inverter as (x: T) => T).toString() === (monoiroup2.inverter as (x: T) => T).toString()
                    );
                }
                if (("inverter" in monoiroup1) !== ("inverter" in monoiroup2)) {
                    return false;
                }
                return monoidEqual;
            }
            if ("add" in struc1 && "add" in struc2 && "mul" in struc1 && "mul" in struc2) {
                const ring1 = struc1 as ChalkboardStructure<T>;
                const ring2 = struc2 as ChalkboardStructure<T>;
                return (
                    Chalkboard.abal.isEqual(ring1.set, ring2.set) &&
                    ring1.addIdentity === ring2.addIdentity &&
                    ring1.mulIdentity === ring2.mulIdentity &&
                    (
                        ring1.add === ring2.add ||
                        (ring1.add as (x: T, y: T) => T).toString() === (ring2.add as (x: T, y: T) => T).toString()
                    ) &&
                    (
                        ring1.mul === ring2.mul ||
                        (ring1.mul as (x: T, y: T) => T).toString() === (ring2.mul as (x: T, y: T) => T).toString()
                    ) &&
                    (
                        ring1.addInverter === ring2.addInverter ||
                        (ring1.addInverter as (x: T, y: T) => T).toString() === (ring2.addInverter as (x: T, y: T) => T).toString()
                    )
                );
            }
            if ("mulInverter" in struc1 && "mulInverter" in struc2) {
                const field1 = struc1 as ChalkboardStructure<T>;
                const field2 = struc2 as ChalkboardStructure<T>;
                return (
                    Chalkboard.abal.isEqual(field1.set, field2.set) &&
                    field1.addIdentity === field2.addIdentity &&
                    field1.mulIdentity === field2.mulIdentity &&
                    (
                        field1.add === field2.add ||
                        (field1.add as (x: T, y: T) => T).toString() === (field2.add as (x: T, y: T) => T).toString()
                    ) &&
                    (
                        field1.mul === field2.mul ||
                        (field1.mul as (x: T, y: T) => T).toString() === (field2.mul as (x: T, y: T) => T).toString()
                    ) &&
                    (
                        field1.addInverter === field2.addInverter ||
                        (field1.addInverter as (x: T, y: T) => T).toString() === (field2.addInverter as (x: T, y: T) => T).toString()
                    ) &&
                    (
                        field1.mulInverter === field2.mulInverter ||
                        (field1.mulInverter as (x: T, y: T) => T).toString() === (field2.mulInverter as (x: T, y: T) => T).toString()
                    )
                );
            }
            if ("mapping" in struc1 && "mapping" in struc2) {
                const morph1 = struc1 as ChalkboardMorphism<T, U>;
                const morph2 = struc2 as ChalkboardMorphism<T, U>;
                return (
                    Chalkboard.abal.isEqual(morph1.struc1, morph2.struc1) &&
                    Chalkboard.abal.isEqual(morph1.struc2, morph2.struc2) &&
                    (
                        morph1.mapping === morph2.mapping ||
                        morph1.mapping.toString() === morph2.mapping.toString() ||
                        (
                            Chalkboard.abal.isEqual(Chalkboard.abal.image(morph1), Chalkboard.abal.image(morph2)) &&
                            Chalkboard.abal.isEqual(Chalkboard.abal.preimage(morph1), Chalkboard.abal.preimage(morph2)) &&
                            Chalkboard.abal.isEqual(Chalkboard.abal.kernel(morph1), Chalkboard.abal.kernel(morph2))
                        )
                    )
                );
            }
            return false;
        };

        /**
         * Checks if two morphisms are exact (i.e. the image of the first morphism is equal to the kernel of the second morphism).
         * @template T, U, V
         * @param {ChalkboardMorphism<T, U>} morph1 - The first morphism
         * @param {ChalkboardMorphism<U, V>} morph2 - The second morphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const identity = Chalkboard.abal.idmorphism(Z4);
         * const zero = Chalkboard.abal.endomorphism(Z4, () => 0);
         * const valid = Chalkboard.abal.isExact(identity, zero); // Checks exactness at Z₄
         */
        export const isExact = <T, U, V>(morph1: ChalkboardMorphism<T, U>, morph2: ChalkboardMorphism<U, V>): boolean => {
            if (morph1 === null || typeof morph1 !== "object" || (morph1 as any).struc1 === null || typeof (morph1 as any).struc1 !== "object" || (morph1 as any).struc2 === null || typeof (morph1 as any).struc2 !== "object" || typeof (morph1 as any).mapping !== "function") throw new Error(`Chalkboard.abal.isExact: Parameter "morph1" must be an algebraic morphism.`);
            if (morph2 === null || typeof morph2 !== "object" || (morph2 as any).struc1 === null || typeof (morph2 as any).struc1 !== "object" || (morph2 as any).struc2 === null || typeof (morph2 as any).struc2 !== "object" || typeof (morph2 as any).mapping !== "function") throw new Error(`Chalkboard.abal.isExact: Parameter "morph2" must be an algebraic morphism.`);
            return Chalkboard.abal.isEqual(Chalkboard.abal.image(morph1), Chalkboard.abal.kernel(morph2));
        };

        /**
         * Checks if an algebraic structure is a field.
         * @template T
         * @param {ChalkboardStructure<T>} field - The field
         * @returns {boolean}
         * @example
         * const Q = Chalkboard.abal.field(Chalkboard.abal.Q(), (a, b) => a + b, (a, b) => a * b);
         * const valid = Chalkboard.abal.isField(Q); // Returns true
         */
        export const isField = <T>(field: ChalkboardStructure<T>): boolean => {
            if (field === null || typeof field !== "object" || (field as any).set === null || typeof (field as any).set !== "object" || typeof ((field as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isField: Parameter "field" must be an algebraic structure.`);
            const { set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter } = field;
            if (set.id === "Q" || set.id === "R" || set.id === "C") {
                return true;
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" || typeof mulInverter === "undefined") {
                return false;
            }
            const additiveGroup: ChalkboardStructure<T> = { set, operation: add, identity: addIdentity, inverter: addInverter };
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
                        if ($(field.mul!(a, field.add!(b, c))) !== $(field.add!(field.mul!(a, b), field.mul!(a, c)))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        /**
         * Checks if an algebraic structure is a group.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isGroup(Z4); // Returns true
         */
        export const isGroup = <T>(group: ChalkboardStructure<T>): boolean => {
            if (group === null || typeof group !== "object" || (group as any).set === null || typeof (group as any).set !== "object" || typeof ((group as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isGroup: Parameter "group" must be an algebraic structure.`);
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
                if (!set.contains(inverter(a)) || $(operation(a, inverter!(a))) !== $(identity)) {
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

        /**
         * Checks if a morphism is a homomorphism.
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The homomorphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const Z2 = Chalkboard.abal.group(Chalkboard.abal.Z(2), (a, b) => (a + b) % 2, 0, (a) => a);
         * const parity = Chalkboard.abal.homomorphism(Z4, Z2, (x) => x % 2);
         * const valid = Chalkboard.abal.isHomomorphism(parity); // Returns true
         */
        export const isHomomorphism = <T, U>(morph: ChalkboardMorphism<T, U>): boolean => {
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
            throw new Error(`Chalkboard.abal.isHomomorphism: The algebraic structures of the homomorphism may have missing operations or incompatible types.`);
        };

        /**
         * Checks if a subset is an ideal of a ring.
         * @template T
         * @param {ChalkboardStructure<T>} ring - The ring
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         * @example
         * const Z6 = Chalkboard.abal.ring(Chalkboard.abal.Z(6), (a, b) => (a + b) % 6, (a, b) => (a * b) % 6, 0, 1, (a) => (6 - a) % 6);
         * const ideal = Chalkboard.abal.set([0, 2, 4]);
         * const valid = Chalkboard.abal.isIdeal(Z6, ideal); // Returns true
         */
        export const isIdeal = <T>(ring: ChalkboardStructure<T>, subset: ChalkboardSet<T>): boolean => {
            if (ring === null || typeof ring !== "object" || (ring as any).set === null || typeof (ring as any).set !== "object" || typeof ((ring as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isIdeal: Parameter "ring" must be an algebraic structure.`);
            if (subset === null || typeof subset !== "object" || typeof (subset as any).contains !== "function") throw new Error(`Chalkboard.abal.isIdeal: Parameter "subset" must be a set.`);
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

        /**
         * Checks if an element is the identity of an algebraic structure.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The algebraic structure
         * @param {T} element - The element
         * @param {"add" | "mul"} [type="add"] - The type of identity to check ("add" for additive identity, "mul" for multiplicative identity, defaults to "add")
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isIdentity(Z4, 0); // Returns true
         */
        export const isIdentity = <T>(struc: ChalkboardStructure<T>, element: T, type: "add" | "mul" = "add"): boolean => {
            if (struc === null || typeof struc !== "object" || (struc as any).set === null || typeof (struc as any).set !== "object" || typeof ((struc as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isIdentity: Parameter "struc" must be an algebraic structure.`);
            if (type !== undefined && (typeof type !== "string")) throw new Error(`Chalkboard.abal.isIdentity: Parameter "type" must be a string.`);
            if (type === "add" && struc.add && struc.addIdentity) {
                return (
                    "add" in struc &&
                    struc.add(element, struc.addIdentity) === element &&
                    struc.add(struc.addIdentity, element) === element
                );
            } else if (type === "mul" && struc.mul && struc.mulIdentity) {
                return (
                    "mul" in struc && "mulIdentity" in struc &&
                    struc.mul?.(element, struc.mulIdentity) === element &&
                    struc.mul?.(struc.mulIdentity, element) === element
                );
            }
            return false;
        };

        /**
         * Checks if a morphism is injective.
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The morphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const identity = Chalkboard.abal.idmorphism(Z4);
         * const valid = Chalkboard.abal.isInjective(identity); // Returns true
         */
        export const isInjective = <T, U>(morph: ChalkboardMorphism<T, U>): boolean => {
            if (morph === null || typeof morph !== "object" || (morph as any).struc1 === null || typeof (morph as any).struc1 !== "object" || (morph as any).struc2 === null || typeof (morph as any).struc2 !== "object" || typeof (morph as any).mapping !== "function") throw new Error(`Chalkboard.abal.isInjective: Parameter "morph" must be an algebraic morphism.`);
            if (["Z", "Q", "R", "C"].includes(morph.struc1.set.id || "") || ["Z", "Q", "R", "C"].includes(morph.struc2.set.id || "")) {
                return morph.struc1.set.id === morph.struc2.set.id;
            }
            const { struc1, mapping } = morph;
            const domain = struc1.set.elements || [];
            const mapped = domain.map(mapping);
            return new Set(mapped.map((e) => $(e))).size === domain.length;
        };

        /**
         * Checks if two elements are inverses of each other in an algebraic structure.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The algebraic structure
         * @param {T} element1 - The first element
         * @param {T} element2 - The second element
         * @param {"add" | "mul"} [type="add"] - The type of inverse to check ("add" for additive inverse, "mul" for multiplicative inverse, defaults to "add")
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isInverse(Z4, 1, 3); // Returns true
         */
        export const isInverse = <T>(struc: ChalkboardStructure<T>, element1: T, element2: T, type: "add" | "mul" = "add"): boolean => {
            if (struc === null || typeof struc !== "object" || (struc as any).set === null || typeof (struc as any).set !== "object" || typeof ((struc as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isInverse: Parameter "struc" must be an algebraic structure.`);
            if (type !== undefined && (typeof type !== "string")) throw new Error(`Chalkboard.abal.isInverse: Parameter "type" must be a string.`);
            if (type === "add") {
                return (
                    "add" in struc &&
                    struc.add?.(element1, element2) === struc.addIdentity &&
                    struc.add?.(element2, element1) === struc.addIdentity
                );
            } else if (type === "mul" && "mul" in struc && "mulIdentity" in struc) {
                return (
                    struc.mul?.(element1, element2) === struc.mulIdentity &&
                    struc.mul?.(element2, element1) === struc.mulIdentity
                );
            }
            return false;
        };

        /**
         * Checks if a morphism is an isomorphism.
         * @template T, U
         * @param {ChalkboardMorphism<T, T>} morph - The morphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const inverse = Chalkboard.abal.automorphism(Z4, (x) => (3 * x) % 4);
         * const valid = Chalkboard.abal.isIsomorphism(inverse); // Returns true
         */
        export const isIsomorphism = <T, U>(morph: ChalkboardMorphism<T, U>): boolean => {
            if (morph === null || typeof morph !== "object" || (morph as any).struc1 === null || typeof (morph as any).struc1 !== "object" || (morph as any).struc2 === null || typeof (morph as any).struc2 !== "object" || typeof (morph as any).mapping !== "function") throw new Error(`Chalkboard.abal.isIsomorphism: Parameter "morph" must be an algebraic morphism.`);
            return Chalkboard.abal.isHomomorphism(morph) && Chalkboard.abal.isBijective(morph);
        };

        /**
         * Checks if an algebraic structure is a monoid.
         * @template T
         * @param {ChalkboardStructure<T>} monoid - The monoid
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isMonoid(Z4); // Returns true
         */
        export const isMonoid = <T>(monoid: ChalkboardStructure<T>): boolean => {
            if (monoid === null || typeof monoid !== "object" || (monoid as any).set === null || typeof (monoid as any).set !== "object" || typeof ((monoid as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isMonoid: Parameter "monoid" must be an algebraic structure.`);
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

        /**
         * Checks if a subgroup of a group is a normal subgroup.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @param {ChalkboardSet<T>} subgroup - The subgroup
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const H = Chalkboard.abal.set([0, 2]);
         * const valid = Chalkboard.abal.isNormalSubgroup(Z4, H); // Returns true
         */
        export const isNormalSubgroup = <T>(group: ChalkboardStructure<T>, subgroup: ChalkboardSet<T>): boolean => {
            if (group === null || typeof group !== "object" || (group as any).set === null || typeof (group as any).set !== "object" || typeof ((group as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isNormalSubgroup: Parameter "group" must be an algebraic structure.`);
            if (subgroup === null || typeof subgroup !== "object" || typeof (subgroup as any).contains !== "function") throw new Error(`Chalkboard.abal.isNormalSubgroup: Parameter "subgroup" must be a set.`);
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

        /**
         * Defines an isomorphism between two algebraic structures.
         * @template T, U
         * @param {ChalkboardStructure<T>} struc1 - The first algebraic structure which is the domain of the morphism
         * @param {ChalkboardStructure<U>} struc2 - The second algebraic structure which is the codomain of the morphism
         * @param {(element: T) => U} mapping - The bijective function that takes an element from the first structure and maps it to the second structure
         * @returns {ChalkboardMorphism<T, U>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const inverse = Chalkboard.abal.isomorphism(Z4, Z4, (x) => (3 * x) % 4); // Defines an isomorphism of Z₄
         */
        export const isomorphism = <T, U>(struc1: ChalkboardStructure<T>, struc2: ChalkboardStructure<U>, mapping: (element: T) => U): ChalkboardMorphism<T, U> => {
            const morphism = Chalkboard.abal.homomorphism(struc1, struc2, mapping);
            if (!Chalkboard.abal.isHomomorphism(morphism)) throw new Error(`Chalkboard.abal.isomorphism: The mapping is not a homomorphism, so it cannot be an isomorphism.`);
            if (!Chalkboard.abal.isBijective(morphism)) throw new Error(`Chalkboard.abal.isomorphism: The mapping is not bijective, so it cannot be an isomorphism.`);
            return morphism;
        };

        /**
         * Checks if an ideal is a principal ideal of a ring.
         * @template T
         * @param {ChalkboardStructure<T>} ring - The ring
         * @param {ChalkboardSet<T>} ideal - The ideal
         * @returns {boolean}
         * @example
         * const Z6 = Chalkboard.abal.ring(Chalkboard.abal.Z(6), (a, b) => (a + b) % 6, (a, b) => (a * b) % 6, 0, 1, (a) => (6 - a) % 6);
         * const ideal = Chalkboard.abal.principalIdeal(Z6, 2);
         * const valid = Chalkboard.abal.isPrincipalIdeal(Z6, ideal); // Returns true
         */
        export const isPrincipalIdeal = <T>(ring: ChalkboardStructure<T>, ideal: ChalkboardSet<T>): boolean => {
            if (ring === null || typeof ring !== "object" || (ring as any).set === null || typeof (ring as any).set !== "object" || typeof ((ring as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isPrincipalIdeal: Parameter "ring" must be an algebraic structure.`);
            if (ideal === null || typeof ideal !== "object" || typeof (ideal as any).contains !== "function") throw new Error(`Chalkboard.abal.isPrincipalIdeal: Parameter "ideal" must be a set.`);
            for (const generator of ideal.elements || []) {
                const principalIdeal = Chalkboard.abal.principalIdeal(ring, generator);
                if (Chalkboard.abal.isSubset(ideal, principalIdeal) && Chalkboard.abal.isSubset(principalIdeal, ideal)) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Checks if an algebraic structure is a ring.
         * @template T
         * @param {ChalkboardStructure<T>} ring - The ring
         * @returns {boolean}
         * @example
         * const Z6 = Chalkboard.abal.ring(Chalkboard.abal.Z(6), (a, b) => (a + b) % 6, (a, b) => (a * b) % 6, 0, 1, (a) => (6 - a) % 6);
         * const valid = Chalkboard.abal.isRing(Z6); // Returns true
         */
        export const isRing = <T>(ring: ChalkboardStructure<T>): boolean => {
            if (ring === null || typeof ring !== "object" || (ring as any).set === null || typeof (ring as any).set !== "object" || typeof ((ring as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isRing: Parameter "ring" must be an algebraic structure.`);
            const { set, add, mul, addIdentity, addInverter } = ring;
            if (set.id === "Z" || set.id === "Q" || set.id === "R" || set.id === "C") {
                return true;
            }
            if (typeof add === "undefined" || typeof mul === "undefined" || typeof addIdentity === "undefined" || typeof addInverter === "undefined") {
                return false;
            }
            const additiveGroup: ChalkboardStructure<T> = { set, operation: add, identity: addIdentity, inverter: addInverter };
            if (!Chalkboard.abal.isGroup(additiveGroup) || !Chalkboard.abal.isCommutative(additiveGroup)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, mul!)) {
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

        /**
         * Checks if a subset is a subfield of a field.
         * @template T
         * @param {ChalkboardStructure<T>} field - The field
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         * @example
         * const Q = Chalkboard.abal.field(Chalkboard.abal.Q(), (a, b) => a + b, (a, b) => a * b);
         * const valid = Chalkboard.abal.isSubfield(Q, Chalkboard.abal.Q()); // Returns true
         */
        export const isSubfield = <T>(field: ChalkboardStructure<T>, subset: ChalkboardSet<T>): boolean => {
            if (field === null || typeof field !== "object" || (field as any).set === null || typeof (field as any).set !== "object" || typeof ((field as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubfield: Parameter "field" must be an algebraic structure.`);
            if (subset === null || typeof subset !== "object" || typeof (subset as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubfield: Parameter "subset" must be a set.`);
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

        /**
         * Checks if a subset is a subgroup of a group.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isSubgroup(Z4, Chalkboard.abal.set([0, 2])); // Returns true
         */
        export const isSubgroup = <T>(group: ChalkboardStructure<T>, subset: ChalkboardSet<T>): boolean => {
            if (group === null || typeof group !== "object" || (group as any).set === null || typeof (group as any).set !== "object" || typeof ((group as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubgroup: Parameter "group" must be an algebraic structure.`);
            if (subset === null || typeof subset !== "object" || typeof (subset as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubgroup: Parameter "subset" must be a set.`);
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

        /**
         * Checks if a subset is a submonoid of a monoid.
         * @template T
         * @param {ChalkboardStructure<T>} monoid - The monoid
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const valid = Chalkboard.abal.isSubmonoid(Z4, Chalkboard.abal.set([0, 2])); // Returns true
         */
        export const isSubmonoid = <T>(monoid: ChalkboardStructure<T>, subset: ChalkboardSet<T>): boolean => {
            if (monoid === null || typeof monoid !== "object" || (monoid as any).set === null || typeof (monoid as any).set !== "object" || typeof ((monoid as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubmonoid: Parameter "monoid" must be an algebraic structure.`);
            if (subset === null || typeof subset !== "object" || typeof (subset as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubmonoid: Parameter "subset" must be a set.`);
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

        /**
         * Checks if a subset is a subring of a ring.
         * @template T
         * @param {ChalkboardStructure<T>} ring - The ring
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         * @example
         * const Z6 = Chalkboard.abal.ring(Chalkboard.abal.Z(6), (a, b) => (a + b) % 6, (a, b) => (a * b) % 6, 0, 1, (a) => (6 - a) % 6);
         * const valid = Chalkboard.abal.isSubring(Z6, Chalkboard.abal.set([0, 2, 4])); // Checks the even residues
         */
        export const isSubring = <T>(ring: ChalkboardStructure<T>, subset: ChalkboardSet<T>): boolean => {
            if (ring === null || typeof ring !== "object" || (ring as any).set === null || typeof (ring as any).set !== "object" || typeof ((ring as any).set as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubring: Parameter "ring" must be an algebraic structure.`);
            if (subset === null || typeof subset !== "object" || typeof (subset as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubring: Parameter "subset" must be a set.`);
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

        /**
         * Checks if a set is a subset of another set.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @param {ChalkboardSet<T>} superset - The potential superset
         * @returns {boolean}
         * @example
         * const primes = Chalkboard.abal.set([2, 3, 5]);
         * const naturals = Chalkboard.abal.N();
         * const valid = Chalkboard.abal.isSubset(primes, naturals); // Returns true
         */
        export const isSubset = <T>(set: ChalkboardSet<T>, superset: ChalkboardSet<T>): boolean => {
            if (set === null || typeof set !== "object" || typeof (set as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubset: Parameter "set" must be a set.`);
            if (superset === null || typeof superset !== "object" || typeof (superset as any).contains !== "function") throw new Error(`Chalkboard.abal.isSubset: Parameter "superset" must be a set.`);
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

        /**
         * Checks if a set is a superset of another set.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @param {ChalkboardSet<T>} subset - The potential subset
         * @returns {boolean}
         * @example
         * const naturals = Chalkboard.abal.N();
         * const primes = Chalkboard.abal.set([2, 3, 5]);
         * const valid = Chalkboard.abal.isSuperset(naturals, primes); // Returns true
         */
        export const isSuperset = <T>(set: ChalkboardSet<T>, subset: ChalkboardSet<T>): boolean => {
            if (set === null || typeof set !== "object" || typeof (set as any).contains !== "function") throw new Error(`Chalkboard.abal.isSuperset: Parameter "set" must be a set.`);
            if (subset === null || typeof subset !== "object" || typeof (subset as any).contains !== "function") throw new Error(`Chalkboard.abal.isSuperset: Parameter "subset" must be a set.`);
            return Chalkboard.abal.isSubset(subset, set);
        };

        /**
         * Checks if a morphism is surjective.
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The morphism
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const Z2 = Chalkboard.abal.group(Chalkboard.abal.Z(2), (a, b) => (a + b) % 2, 0, (a) => a);
         * const parity = Chalkboard.abal.homomorphism(Z4, Z2, (x) => x % 2);
         * const valid = Chalkboard.abal.isSurjective(parity); // Returns true
         */
        export const isSurjective = <T, U>(morph: ChalkboardMorphism<T, U>): boolean => {
            if (morph === null || typeof morph !== "object" || (morph as any).struc1 === null || typeof (morph as any).struc1 !== "object" || (morph as any).struc2 === null || typeof (morph as any).struc2 !== "object" || typeof (morph as any).mapping !== "function") throw new Error(`Chalkboard.abal.isSurjective: Parameter "morph" must be an algebraic morphism.`);
            const { struc1, struc2, mapping } = morph;
            if (["Z", "Q", "R", "C", "P"].includes(struc2.set.id || "")) {
                if (struc2.set.id === "C" && ["R", "C"].includes(struc1.set.id || "")) return true;
                if (struc2.set.id === "R" && struc1.set.id === "Q") return false;
                if (struc1.set.id === struc2.set.id) return true;
                return false;
            }
            const domain = struc1.set.elements || [];
            const codomain = struc2.set.elements || [];
            const mapped = domain.map(mapping);
            return codomain.every((e) => mapped.some((m) => $(m) === $(e)));
        };

        /**
         * Calculates the kernel of a morphism, either for its domain or for a subset of its domain.
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The morphism
         * @param {ChalkboardSet<T>} [subset] - The subset of the domain (optional, defaults to the domain)
         * @returns {ChalkboardSet<T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const Z2 = Chalkboard.abal.group(Chalkboard.abal.Z(2), (a, b) => (a + b) % 2, 0, (a) => a);
         * const parity = Chalkboard.abal.homomorphism(Z4, Z2, (x) => x % 2);
         * const kernel = Chalkboard.abal.kernel(parity); // Returns {0, 2}
         */
        export const kernel = <T, U>(morph: ChalkboardMorphism<T, U>, subset?: ChalkboardSet<T>): ChalkboardSet<T> => {
            const { struc1, struc2, mapping } = morph;
            if (!struc1.set.elements) throw new Error(`Chalkboard.abal.kernel: The domain of the "morph" must have a finite set of elements to calculate the kernel.`);
            const _subset = subset?.elements || struc1.set.elements;
            let identity: U | undefined;
            if ("identity" in struc2) {
                identity = (struc2 as ChalkboardStructure<U>).identity;
            } else if ("addIdentity" in struc2) {
                identity = (struc2 as ChalkboardStructure<U> | ChalkboardStructure<U>).addIdentity;
            } else {
                throw new Error(`Chalkboard.abal.kernel: The codomain of the "morph" must have an identity element to calculate the kernel.`);
            }
            const result = _subset.filter((element) => $(mapping(element)) === $(identity));
            return Chalkboard.abal.set(result);
        };

        /**
         * Checks if a group and a subgroup satisfy Lagrange's Theorem, i.e. the order of a subgroup divides the order of its group.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @param {ChalkboardSet<T>} subgroup - The subgroup
         * @returns {boolean}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const H = Chalkboard.abal.set([0, 2]);
         * const valid = Chalkboard.abal.Lagrange(Z4, H); // Returns true because 2 divides 4
         */
        export const Lagrange = <T>(group: ChalkboardStructure<T>, subgroup: ChalkboardSet<T>): boolean => {
            if (group.set.id && ["Z", "Q", "R", "C"].includes(group.set.id)) throw new Error(`Chalkboard.abal.Lagrange: Lagrange theorem only applies to finite groups.`);
            return Chalkboard.abal.cardinality(group) % Chalkboard.abal.cardinality(subgroup) === 0;
        };

        /**
         * The set of all real-valued matrices of size "rows" x "cols", denoted as M(rows, cols).
         * @param {number} rows - The number of rows
         * @param {number} [cols=rows] - The number of columns (optional, defaults to the number of rows)
         * @returns {ChalkboardSet<ChalkboardMatrix>}
         * @example
         * const result = Chalkboard.abal.M(2, 3); // Returns the set of 2-by-3 matrices
         */
        export const M = (rows: number, cols: number = rows): ChalkboardSet<ChalkboardMatrix> => {
            if (!Number.isInteger(rows) || rows <= 0) throw new Error(`Chalkboard.abal.M: Parameter "rows" must be a positive integer.`);
            if (!Number.isInteger(cols) || cols <= 0) throw new Error(`Chalkboard.abal.M: Parameter "cols" must be a positive integer.`);
            return {
                contains: (element: ChalkboardMatrix) => {
                    return Array.isArray(element) && Chalkboard.matr.isSizeOf(element, rows, cols);
                },
                id: `M(${rows}, ${cols})`
            };
        };

        /**
         * Defines an algebraic structure known as a monoid.
         * @template T
         * @param {ChalkboardSet<T>} set - The set of the monoid
         * @param {(a: T, b: T) => T} operation - The operation of the monoid
         * @param {T} [identity] - The identity element of the monoid (optional if the set is Z, Q, R, C, A, S, M, or GL)
         * @returns {ChalkboardStructure<T>}
         * @example
         * const residues = Chalkboard.abal.Z(5);
         * const additive = Chalkboard.abal.monoid(residues, (a, b) => (a + b) % 5, 0); // Defines the additive monoid modulo 5
         */
        export const monoid = <T>(set: ChalkboardSet<T>, operation: (a: T, b: T) => T, identity?: T): ChalkboardStructure<T> => {
            const autoconfig = (): { identity: T } => {
                if (!set.id) throw new Error(`Chalkboard.abal.monoid: The "set" must have a valid "id" property, or you must input "identity" explicitly.`);
                if (set.id === "Z" || set.id === "Q" || set.id === "R") {
                    return { identity: 0 as T };
                } else if (set.id === "C") {
                    return { identity: Chalkboard.comp.init(0, 0) as T };
                } else if (set.id.startsWith("Z") && set.id.length > 1) {
                    return { identity: 0 as T };
                } else if (set.id.startsWith("C") && set.id.length > 1) {
                    return { identity: Chalkboard.comp.init(1, 0) as T };
                } else if (set.id.startsWith("M(")) {
                    const rows = (set as any).rows;
                    const cols = (set as any).cols;
                    return { identity: Chalkboard.matr.fill(0, rows, cols) as T };
                } else if (set.id.startsWith("GL")) {
                    const n = parseInt(set.id.slice(2), 10);
                    return { identity: Chalkboard.matr.identity(n) as T };
                } else if (set.id.match(/^[SA]\d+$/)) {
                    const n = parseInt(set.id.slice(1), 10);
                    return { identity: Array.from({length: n}, (_, i) => i) as T };
                }
                throw new Error(`Chalkboard.abal.monoid: Automatic configuration of the "identity" property is not available for the inputted "set".`);
            };
            const configured = typeof identity === "undefined" ? autoconfig() : { identity };
            const monoid: ChalkboardStructure<T> = { set, operation, identity: configured.identity };
            if (!Chalkboard.abal.isMonoid(monoid)) throw new Error(`Chalkboard.abal.monoid: The inputted "set", "operation", and "identity" do not form a monoid.`);
            return monoid;
        };

        /**
         * The set of all natural numbers, denoted as N.
         * @returns {ChalkboardSet<number>}
         * @example
         * const result = Chalkboard.abal.N(); // Returns the natural numbers
         */
        export const N = (): ChalkboardSet<number> => ({
            contains: (element: number) => Number.isInteger(element) && element > 0,
            id: "N"
        });

        /**
         * Calculates the order of an element in a group.
         * @template T
         * @param {ChalkboardStructure<T>} group - The group
         * @param {T} element - The element
         * @returns {number}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const order = Chalkboard.abal.order(Z4, 1); // Returns 4
         */
        export const order = <T>(group: ChalkboardStructure<T>, element: T): number => {
            if (!group.operation) throw new Error(`Chalkboard.abal.order: The "group" must have an "operation" property to calculate the order of an element.`);
            let result = 1;
            let current = element;
            while ($(current) !== $(group.identity)) {
                current = group.operation(current, element);
                result++;
                if (result > (group.set.elements?.length || Infinity)) throw new Error(`Chalkboard.abal.order: The "group" might not be finite because an infinite loop was detected.`);
            }
            return result;
        };

        /**
         * The set of all prime numbers, denoted as P.
         * @returns {ChalkboardSet<number>}
         * @example
         * const result = Chalkboard.abal.P(); // Returns the prime numbers
         */
        export const P = (): ChalkboardSet<number> => ({
            contains: (element: number) => Chalkboard.numb.isPrime(element),
            id: "P"
        });

        /**
         * Calculates the power set of a set.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @returns {ChalkboardSet<ChalkboardSet<T>>}
         * @example
         * const bits = Chalkboard.abal.set([0, 1]);
         * const subsets = Chalkboard.abal.powerSet(bits); // Returns four subsets
         */
        export const powerSet = <T>(set: ChalkboardSet<T>): ChalkboardSet<ChalkboardSet<T>> => {
            if (set === null || typeof set !== "object" || typeof (set as any).contains !== "function") throw new Error(`Chalkboard.abal.powerSet: Parameter "set" must be a set.`);
            const result: ChalkboardSet<T>[] = [];
            const elements = set.elements || [];
            const totalSubsets = 1 << elements.length;
            for (let i = 0; i < totalSubsets; i++) {
                const subset: T[] = [];
                for (let j = 0; j < elements.length; j++) {
                    if (i & (1 << j)) {
                        subset.push(elements[j]);
                    }
                }
                result.push(Chalkboard.abal.set(subset));
            }
            return Chalkboard.abal.set(result);
        };

        /**
         * Calculates the preimage of a morphism, either for its codomain or for a subset of its codomain.
         * @template T, U
         * @param {ChalkboardMorphism<T, U>} morph - The morphism
         * @param {ChalkboardSet<U>} [subset] - The subset of the codomain (optional, defaults to the codomain)
         * @returns {ChalkboardSet<T>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const Z2 = Chalkboard.abal.group(Chalkboard.abal.Z(2), (a, b) => (a + b) % 2, 0, (a) => a);
         * const parity = Chalkboard.abal.homomorphism(Z4, Z2, (x) => x % 2);
         * const even = Chalkboard.abal.preimage(parity, Chalkboard.abal.set([0])); // Returns {0, 2}
         */
        export const preimage = <T, U>(morph: ChalkboardMorphism<T, U>, subset?: ChalkboardSet<U>): ChalkboardSet<T> => {
            const { struc1, struc2, mapping } = morph;
            if (!struc1.set.elements) throw new Error(`Chalkboard.abal.preimage: The domain of the "morph" must have a finite set of elements to calculate the preimage.`);
            const _subset = subset || struc2.set;
            if (!_subset.elements) throw new Error(`Chalkboard.abal.preimage: The codomain of the "morph" or the subset of it must have a finite set of elements to calculate the preimage.`);
            const result = struc1.set.elements.filter((element) => _subset.contains(mapping(element)));
            return Chalkboard.abal.set(result);
        };

        /**
         * Generates the principal ideal of an element in a ring.
         * @template T
         * @param {ChalkboardStructure<T>} ring - The ring
         * @param {T} element - The generator of the principal ideal
         * @returns {ChalkboardSet<T>}
         * @example
         * const Z6 = Chalkboard.abal.ring(Chalkboard.abal.Z(6), (a, b) => (a + b) % 6, (a, b) => (a * b) % 6, 0, 1, (a) => (6 - a) % 6);
         * const ideal = Chalkboard.abal.principalIdeal(Z6, 2); // Returns {0, 2, 4}
         */
        export const principalIdeal = <T>(ring: ChalkboardStructure<T>, element: T): ChalkboardSet<T> => {
            if (ring.set.id && ["Z", "Q", "R", "C"].includes(ring.set.id)) throw new Error(`Chalkboard.abal.principalIdeal: The "ring" must be finite.`);
            const result: T[] = [];
            const { mul, add } = ring;
            if (!add || !mul) throw new Error(`Chalkboard.abal.principalIdeal: The "ring" must have "mul" and "add" properties to generate a principal ideal.`);
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

        /**
         * Prints a set or structure in the console.
         * @param {ChalkboardSet<number> | ChalkboardStructure<number>} struc - The set or structure
         * @returns {void} 
         * @example
         * Chalkboard.abal.print(Chalkboard.abal.Z(5)); // Prints the residues modulo 5
         */
        export const print = (struc: ChalkboardSet<number> | ChalkboardStructure<number>): void => {
            if (struc === null || typeof struc !== "object" || (typeof (struc as any).contains !== "function" && (((struc as any).set === null || typeof (struc as any).set !== "object") || typeof ((struc as any).set as any).contains !== "function"))) throw new Error(`Chalkboard.abal.print: Parameter "struc" must be a set or algebraic structure.`);
            console.log(Chalkboard.abal.toString(struc));
        };

        /**
         * The set of all rational numbers, denoted as Q.
         * @returns {ChalkboardSet<number>}
         * @example
         * const result = Chalkboard.abal.Q(); // Returns the rational numbers
         */
        export const Q = (): ChalkboardSet<number> => ({
            contains: (element: number) => Number.isFinite(element) && Chalkboard.numb.isRational(element),
            id: "Q"
        });

        /**
         * Defines a quotient group or ring, modulo a normal subgroup or ideal.
         * @template T
         * @param {ChalkboardStructure<T>} struc - The group or ring
         * @param {ChalkboardStructure<T>} substruc - The normal subgroup or ideal
         * @returns {ChalkboardStructure<ChalkboardSet<T>>}
         * @example
         * const Z4 = Chalkboard.abal.group(Chalkboard.abal.Z(4), (a, b) => (a + b) % 4, 0, (a) => (4 - a) % 4);
         * const H = Chalkboard.abal.group(Chalkboard.abal.set([0, 2]), (a, b) => (a + b) % 4, 0, (a) => a);
         * const quotient = Chalkboard.abal.quotient(Z4, H); // Returns Z₄ / {0, 2}
         */
        export const quotient = <T>(struc: ChalkboardStructure<T>, substruc: ChalkboardStructure<T>): ChalkboardStructure<ChalkboardSet<T>> => {
            if ("operation" in struc && !Chalkboard.abal.isNormalSubgroup(struc, substruc.set)) throw new Error(`Chalkboard.abal.quotient: The "substruc" must be a normal subgroup of the "struc".`);
            if ("add" in struc && !Chalkboard.abal.isIdeal(struc, substruc.set)) throw new Error(`Chalkboard.abal.quotient: The "substruc" must be an ideal of the "struc".`);
            const cosets = Chalkboard.abal.coset(struc, substruc);
            const operationConfig = (a: ChalkboardSet<T>, b: ChalkboardSet<T>, operation: Function) => {
                const repA = a.elements![0];
                const repB = b.elements![0];
                const result = operation(repA, repB);
                return cosets.elements!.find((c) => c.contains(result))!;
            };
            return {
                set: cosets,
                ...("operation" in struc ? {
                    operation: (a, b) => operationConfig(a, b, struc.operation!),
                    identity: cosets.elements!.find(c => c.contains(struc.identity!))!,
                    inverter: a => operationConfig(a, a, (x: T) => struc.inverter!(x))
                } : {
                    add: (a, b) => operationConfig(a, b, struc.add!),
                    mul: (a, b) => operationConfig(a, b, struc.mul!),
                    addIdentity: cosets.elements!.find(c => c.contains(struc.addIdentity!))!,
                    addInverter: a => operationConfig(a, a, (x: T) => struc.addInverter!(x))
                })
            } as ChalkboardStructure<ChalkboardSet<T>>;
        };

        /**
         * The set of all real numbers, denoted as R.
         * @returns {ChalkboardSet<number>}
         * @example
         * const result = Chalkboard.abal.R(); // Returns the real numbers
         */
        export const R = (): ChalkboardSet<number> => ({
            contains: (element: number) => Number.isFinite(element),
            id: "R"
        });

        /**
         * Defines an algebraic structure known as a ring.
         * @template T
         * @param {ChalkboardSet<T>} set - The set of the ring
         * @param {(a: T, b: T) => T} add - The additive operation of the ring
         * @param {(a: T, b: T) => T} mul - The multiplicative operation of the ring
         * @param {T} [addIdentity] - The additive identity element of the ring (optional if the set is Z, Q, R, C, or M)
         * @param {T} [mulIdentity] - The multiplicative identity element of the ring (optional if the set is Z, Q, R, C, or M)
         * @param {(a: T) => T} [addInverter] - The function to calculate the additive inverse of an element of the ring (optional if the set is Z, Q, R, C, or M)
         * @returns {ChalkboardStructure<T>}
         * @example
         * const Z6 = Chalkboard.abal.ring(Chalkboard.abal.Z(6), (a, b) => (a + b) % 6, (a, b) => (a * b) % 6, 0, 1, (a) => (6 - a) % 6);
         * const valid = Chalkboard.abal.isRing(Z6); // Checks the residue ring Z₆
         */
        export const ring = <T>(set: ChalkboardSet<T>, add: (a: T, b: T) => T, mul: (a: T, b: T) => T, addIdentity?: T, mulIdentity?: T, addInverter?: (a: T) => T): ChalkboardStructure<T> => {
            const autoconfig = (): { addIdentity: T; mulIdentity: T; addInverter: (a: T) => T } => {
                if (!set.id) throw new Error(`Chalkboard.abal.ring: The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", and "addInverter" explicitly.`);
                if (set.id === "Z" || set.id === "Q" || set.id === "R") {
                    return {
                        addIdentity: 0 as T,
                        mulIdentity: 1 as T,
                        addInverter: (a: T) => (-a as unknown) as T
                    };
                } else if (set.id === "C") {
                    return {
                        addIdentity: Chalkboard.comp.init(0, 0) as T,
                        mulIdentity: Chalkboard.comp.init(1, 0) as T,
                        addInverter: (a: T) => Chalkboard.comp.negate(a as unknown as ChalkboardComplex) as T
                    };
                } else if (set.id.startsWith("Z") && set.id.length > 1) {
                    const n = parseInt(set.id.slice(1), 10);
                    if (isNaN(n) || n <= 0) throw new Error(`Chalkboard.abal.ring: Invalid modulus in set "${set.id}".`);
                    return {
                        addIdentity: 0 as T,
                        mulIdentity: 1 as T,
                        addInverter: (a: T) => ((n - (a as unknown as number) % n) % n) as T
                    };
                } else if (set.id.startsWith("M(")) {
                    const rows = (set as any).rows;
                    const cols = (set as any).cols;
                    if (rows !== cols) throw new Error(`Chalkboard.abal.ring: Only square matrices can form a ring.`);
                    return {
                        addIdentity: Chalkboard.matr.fill(0, rows, cols) as T,
                        mulIdentity: Chalkboard.matr.identity(rows) as T,
                        addInverter: (a: T) => Chalkboard.matr.negate(a as unknown as ChalkboardMatrix) as T
                    };
                }
                throw new Error(`Chalkboard.abal.ring: Automatic configuration of the "addIdentity", "mulIdentity", and "addInverter" properties is not available for the inputted "set".`);
            };
            const configured = typeof addIdentity === "undefined" || typeof mulIdentity === "undefined" || typeof addInverter === "undefined" ? autoconfig() : { addIdentity, mulIdentity, addInverter };
            const ring: ChalkboardStructure<T> = { set, add, mul, addIdentity: configured.addIdentity, mulIdentity: configured.mulIdentity, addInverter: configured.addInverter};
            if (!Chalkboard.abal.isRing(ring)) throw new Error(`Chalkboard.abal.ring: The inputted "set", "add", "mul", "addIdentity", "mulIdentity", and "addInverter" do not form a ring.`);
            return ring;
        };

        /**
         * Defines an algebraic structure extension known as a ring extension.
         * @template T, U
         * @property {ChalkboardStructure<T>} base - The algebraic structure which is a substructure of the extension structure
         * @property {ChalkboardStructure<U>} extension - The algebraic structure which is an extension of the base structure
         * @property {number} [degree] - The rank of the extension structure as a module over the base structure (optional for extensions of Z, Q, R, or C)
         * @property {ChalkboardVector[]} [basis] - The basis vectors of the extension structure (optional for extensions of Z, Q, R, or C)
         * @property {boolean} [isFinite] - Whether the extension structure is finite or not (optional for extensions of Z, Q, R, or C)
         * @property {boolean} [isSimple] - Whether the extension structure is simple or not (optional for extensions of Z, Q, R, or C)
         * @property {boolean} [isAlgebraic] - Whether the extension structure is algebraic or not (optional for extensions of Z, Q, R, or C)
         * @returns {ChalkboardStructureExtension<T, U>}
         * @example
         * const Z6 = Chalkboard.abal.ring(Chalkboard.abal.Z(6), (a, b) => (a + b) % 6, (a, b) => (a * b) % 6, 0, 1, (a) => (6 - a) % 6);
         * const extension = Chalkboard.abal.ringExtension(Z6, Z6, 1, [Chalkboard.vect.init(1, 0)], true, true, true); // Describes a degree-one extension
         */
        export const ringExtension = <T, U extends T>(base: ChalkboardStructure<T>, extension: ChalkboardStructure<U>, degree: number, basis: ChalkboardVector[], isFinite: boolean, isSimple: boolean, isAlgebraic: boolean): ChalkboardStructureExtension<T, U> => {
            if (!Chalkboard.abal.isSubring(base as ChalkboardStructure<unknown>, extension.set as ChalkboardSet<unknown>)) throw new Error(`Chalkboard.abal.ringExtension: The "base" must be a subring of the "extension".`);
            const autoconfig = (): { degree: number; basis: ChalkboardVector[]; isFinite: boolean; isSimple: boolean; isAlgebraic: boolean } => {
                if (!base.set.id) throw new Error(`Chalkboard.abal.ringExtension: The "set" property of the "base" must have a valid "id" property, or you must input "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" explicitly.`);
                if (base.set.id === "Z" && extension.set.id === "Q") {
                    return {
                        degree: Infinity,
                        basis: [],
                        isFinite: false,
                        isSimple: false,
                        isAlgebraic: false
                    };
                } else if (base.set.id === "Q" && extension.set.id === "R") {
                    return {
                        degree: Infinity,
                        basis: [],
                        isFinite: false,
                        isSimple: false,
                        isAlgebraic: false
                    };
                } else if (base.set.id === "R" && extension.set.id === "C") {
                    return {
                        degree: 2,
                        basis: [Chalkboard.vect.init(1, 0), Chalkboard.vect.init(0, 1)],
                        isFinite: true,
                        isSimple: true,
                        isAlgebraic: true
                    };
                }
                throw new Error(`Chalkboard.abal.ringExtension: Automatic configuration of the "degree", "basis", "isFinite", "isSimple", and "isAlgebraic" properties is not available for the inputted "base".`);
            };
            const configured = typeof degree === "undefined" || typeof basis === "undefined" || typeof isFinite === "undefined" || typeof isSimple === "undefined" || typeof isAlgebraic === "undefined" ? autoconfig() : { degree, basis, isFinite, isSimple, isAlgebraic };
            return { base, extension, degree: configured.degree, basis: configured.basis, isFinite: configured.isFinite, isSimple: configured.isSimple, isAlgebraic: configured.isAlgebraic };
        };

        /**
         * The set of all permutations of n elements, denoted as Sn.
         * @param {number} n - The number of elements
         * @returns {ChalkboardSet<number[]>}
         * @example
         * const result = Chalkboard.abal.S(3); // Returns the six permutations in S₃
         */
        export const S = (n: number): ChalkboardSet<number[]> => {
            if (!Number.isInteger(n) || n <= 0) throw new Error(`Chalkboard.abal.S: Parameter "n" must be a positive integer.`);
            const generatePermutations = (arr: number[]): number[][] => {
                if (arr.length === 0) return [[]];
                const result: number[][] = [];
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
                contains: (element: number[]) => elements.some((perm) => $(perm) === $(element)),
                elements: elements,
                id: `S${n}`
            };
        };

        /**
         * Defines a finite set of elements.
         * @param {T[]} set - The elements of the set
         * @returns {ChalkboardSet<T>}
         * @example
         * const primes = Chalkboard.abal.set([2, 3, 5, 7]); // Creates a finite set of primes
         */
        export const set = <T>(set: T[]): ChalkboardSet<T> => {
            if (!Array.isArray(set)) throw new Error(`Chalkboard.abal.set: Parameter "set" must be an array.`);
            const elements = Chalkboard.stat.unique(set);
            return {
                contains: (element: T) => elements.some((x) => $(x) === $(element)),
                elements: elements
            };
        };

        /**
         * Calculates the symmetric difference of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         * @example
         * const a = Chalkboard.abal.set([1, 2, 3]);
         * const b = Chalkboard.abal.set([3, 4, 5]);
         * const difference = Chalkboard.abal.symmetricDifference(a, b); // Returns {1, 2, 4, 5}
         */
        export const symmetricDifference = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            if (set1 === null || typeof set1 !== "object" || typeof (set1 as any).contains !== "function") throw new Error(`Chalkboard.abal.symmetricDifference: Parameter "set1" must be a set.`);
            if (set2 === null || typeof set2 !== "object" || typeof (set2 as any).contains !== "function") throw new Error(`Chalkboard.abal.symmetricDifference: Parameter "set2" must be a set.`);
            const diffA = Chalkboard.abal.difference(set1, set2).elements || [];
            const diffB = Chalkboard.abal.difference(set2, set1).elements || [];
            return Chalkboard.abal.set([...diffA, ...diffB]);
        };

        /**
         * Converts a set or algebraic structure to an array.
         * @template T
         * @param {ChalkboardSet<T> | ChalkboardStructure<T>} struc - The set or structure
         * @returns {T[]}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const values = Chalkboard.abal.toArray(set); // Returns [1, 2, 3, 4]
         */
        export const toArray = <T>(struc: ChalkboardSet<T> | ChalkboardStructure<T>): T[] => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) throw new Error(`Chalkboard.abal.toArray: Cannot convert infinite set to array.`);
            return [...result.elements];
        };

        /**
         * Converts a set or algebraic structure to a matrix.
         * @param {ChalkboardSet<number> | ChalkboardStructure<number>} struc - The set or structure
         * @param {number} rows - The number of rows of the matrix
         * @param {number} [cols=rows] - The number of columns of the matrix (optional, defaults to the number of rows to make a square matrix)
         * @returns {ChalkboardMatrix}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const matrix = Chalkboard.abal.toMatrix(set, 2); // Returns [[1, 2], [3, 4]]
         */
        export const toMatrix = (struc: ChalkboardSet<number> | ChalkboardStructure<number>, rows: number, cols: number = rows): ChalkboardMatrix => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) throw new Error(`Chalkboard.abal.toMatrix: Cannot convert infinite set to matrix.`);
            return Chalkboard.stat.toMatrix(result.elements, rows, cols);
        };

        /**
         * Converts a set or algebraic structure to an object.
         * @param struc - The set or structure
         * @returns {object}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const object = Chalkboard.abal.toObject(set); // Returns an indexed object
         */
        export const toObject = (struc: ChalkboardSet<number> | ChalkboardStructure<number>): object => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) throw new Error(`Chalkboard.abal.toObject: Cannot convert infinite set to object.`);
            return Chalkboard.stat.toObject(result.elements);
        };

        /**
         * Converts a set or algebraic structure to a string.
         * @param {ChalkboardSet<number> | ChalkboardStructure<number>} struc - The set or structure
         * @returns {string}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const text = Chalkboard.abal.toString(set); // Returns a set string
         */
        export const toString = (struc: ChalkboardSet<number> | ChalkboardStructure<number>): string => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) throw new Error(`Chalkboard.abal.toString: Cannot convert infinite set to string.`);
            return Chalkboard.stat.toString(result.elements);
        };

        /**
         * Converts a set or algebraic structure to a tensor.
         * @param {ChalkboardSet<number> | ChalkboardStructure<number>} struc - The set or structure
         * @param {number[]} size - The size of the tensor
         * @returns {ChalkboardTensor}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const tensor = Chalkboard.abal.toTensor(set, 2, 2); // Returns [[1, 2], [3, 4]]
         */
        export const toTensor = (struc: ChalkboardSet<number> | ChalkboardStructure<number>, ...size: number[]): ChalkboardTensor => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) throw new Error(`Chalkboard.abal.toTensor: Cannot convert infinite set to tensor.`);
            if (Array.isArray(size[0])) size = size[0];
            return Chalkboard.tens.resize(result.elements, ...size);
        };

        /**
         * Converts a set or algebraic structure to a typed array.
         * @param {ChalkboardSet<number> | ChalkboardStructure<number>} struc - The set or structure
         * @param {"int8" | "int16" | "int32" | "float32" | "float64" | "bigint64"} [type="float32"] - The type of the typed array, which can be "int8", "int16", "int32", "float32", "float64", or "bigint64" (optional, defaults to "float32")
         * @returns {Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const values = Chalkboard.abal.toTypedArray(set, "float64"); // Returns a Float64Array
         */
        export const toTypedArray = (struc: ChalkboardSet<number> | ChalkboardStructure<number>, type: "int8" | "int16" | "int32" | "float32" | "float64" | "bigint64" = "float32"): Int8Array | Int16Array | Int32Array | Float32Array | Float64Array | BigInt64Array => {
            const result = "set" in struc ? struc.set : struc;
            if (!result.elements) throw new Error(`Chalkboard.abal.toTypedArray: Cannot convert infinite set to typed array.`);
            const arr = Chalkboard.abal.toArray(result);
            if (type === "int8") {
                return new Int8Array(arr);
            } else if (type === "int16") {
                return new Int16Array(arr);
            } else if (type === "int32") {
                return new Int32Array(arr);
            } else if (type === "float32") {
                return new Float32Array(arr);
            } else if (type === "float64") {
                return new Float64Array(arr);
            } else if (type === "bigint64") {
                return new BigInt64Array(arr.map((n) => BigInt(Math.floor(n))));
            }
            throw new Error(`Chalkboard.abal.toTypedArray: Parameter "type" must be int8, int16, int32, float32, float64, or bigint64.`);
        };

        /**
         * Converts a set or algebraic structure to a vector.
         * @param {ChalkboardSet<number> | ChalkboardStructure<number>} struc - The set or structure
         * @param {number} dimension - The dimension of the vector, which can be 2, 3, or 4
         * @param {number} [index=0] - The index of the array to start the vector
         * @returns {ChalkboardVector}
         * @example
         * const set = Chalkboard.abal.set([1, 2, 3, 4]);
         * const vector = Chalkboard.abal.toVector(set, 3, 1); // Returns the vector (2, 3, 4)
         */
        export const toVector = (struc: ChalkboardSet<number> | ChalkboardStructure<number>, dimension: 2 | 3 | 4, index: number = 0): ChalkboardVector => {
            const elements = "set" in struc ? struc.set.elements : struc.elements;
            if (!elements) throw new Error(`Chalkboard.abal.toVector: Cannot convert infinite set to vector.`);
            if (dimension === 2) {
                return Chalkboard.vect.init(elements[index], elements[index + 1]);
            } else if (dimension === 3) {
                return Chalkboard.vect.init(elements[index], elements[index + 1], elements[index + 2]);
            } else if (dimension === 4) {
                return Chalkboard.vect.init(elements[index], elements[index + 1], elements[index + 2], elements[index + 3]);
            } else {
                throw new Error(`Chalkboard.abal.toVector: Parameter "dimension" must be 2, 3, or 4.`);
            }
        };

        /**
         * Calculates the union of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         * @example
         * const a = Chalkboard.abal.set([1, 2, 3]);
         * const b = Chalkboard.abal.set([3, 4, 5]);
         * const union = Chalkboard.abal.union(a, b); // Returns {1, 2, 3, 4, 5}
         */
        export const union = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            if (set1 === null || typeof set1 !== "object" || typeof (set1 as any).contains !== "function") throw new Error(`Chalkboard.abal.union: Parameter "set1" must be a set.`);
            if (set2 === null || typeof set2 !== "object" || typeof (set2 as any).contains !== "function") throw new Error(`Chalkboard.abal.union: Parameter "set2" must be a set.`);
            const result = Array.from(new Set([...(set1.elements || []), ...(set2.elements || [])]));
            return Chalkboard.abal.set(result);
        };

        /**
         * The set of integers, denoted as Z, or the set of integers modulo n, denoted as Zn.
         * @param {number} [n] - The modulus (optional, returns the set of all integers, i.e. Z, if omitted)
         * @returns {ChalkboardSet<number>}
         * @example
         * const result = Chalkboard.abal.Z(7); // Returns the residues modulo 7
         */
        export const Z = (n?: number): ChalkboardSet<number> => {
            if (n === undefined) {
                return {
                    contains: (element: number) => Number.isInteger(element),
                    id: "Z"
                };
            } else {
                if (!Number.isInteger(n) || n <= 0) throw new Error(`Chalkboard.abal.Z: The modulus "n" must be a positive integer.`);
                return {
                    contains: (element: number) => Number.isInteger(element) && element >= 0 && element < n,
                    elements: Array.from({ length: n }, (_, i) => i),
                    id: `Z${n}`
                };
            }
        };
    }
}
