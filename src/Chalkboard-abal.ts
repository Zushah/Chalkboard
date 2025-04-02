/*
    The Chalkboard Library - Abstract Algebra Namespace
    Version 2.1.0 Seki
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    export namespace abal {
        /**
         * The set of all even permutations of n elements, denoted as An.
         * @param {number} n - The number of elements
         * @returns {ChalkboardSet<number[]>}
         */
        export const A = (n: number): ChalkboardSet<number[]> => {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error("The parameter 'n' must be a positive integer.");
            }
            const SnSet = Chalkboard.abal.S(n);
            const isEvenPermutation = (perm: number[]): boolean => {
                let inversions = 0;
                for (let i = 0; i < perm.length; i++) {
                    for (let j = i + 1; j < perm.length; j++) {
                        if (perm[i] > perm[j]) inversions++;
                    }
                }
                return inversions % 2 === 0;
            };
            const elements = (SnSet.elements || []).filter(isEvenPermutation);
            return {
                contains: (element: number[]) => elements.some((perm) => JSON.stringify(perm) === JSON.stringify(element)),
                elements: elements,
                id: `A${n}`
            };
        };

        /**
         * The set of all complex numbers, denoted as C.
         * @returns {ChalkboardSet<ChalkboardComplex>}
         */
        export const C = (): ChalkboardSet<ChalkboardComplex> => ({
            contains: (element: ChalkboardComplex) => {
                return typeof element.a === "number" && typeof element.b === "number";
            },
            id: "C"
        });

        /**
         * Calculates the cardinality of a set or algebraic structure.
         * @template T
         * @param {ChalkboardSet<T> | ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>} structure - The algebraic structure
         * @returns {number}
         */
        export const cardinality = <T>(structure: ChalkboardSet<T> | ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>): number => {
            const id = 'set' in structure && structure.set ? structure.set.id : ('id' in structure ? structure.id : undefined);
            if (id === "Z" || id === "Q" || id === "R" || id === "C" || id?.startsWith("M(")) {
                return Infinity;
            }
            if ('elements' in structure && structure.elements) {
                return structure.elements.length;
            }
            if ('set' in structure && structure.set.elements) {
                return structure.set.elements.length;
            }
            throw new Error('The inputted structure does not have a finite cardinality or is missing elements.');
        };

        /**
         * Calculates the Cartesian product of two sets.
         * @template T, U
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<U>} set2 - The second set
         * @returns {ChalkboardSet<[T, U]>}
         */
        export const Cartesian = <T, U>(set1: ChalkboardSet<T>, set2: ChalkboardSet<U>): ChalkboardSet<[T, U]> => {
            const result: [T, U][] = [];
            for (const a of set1.elements || []) {
                for (const b of set2.elements || []) {
                    result.push([a, b]);
                }
            }
            return Chalkboard.abal.define(result);
        };

        /**
         * Finds the center of a group.
         * @template T
         * @param {ChalkboardGroup<T>} group - The group
         * @returns {ChalkboardSet<T>}
         */
        export const center = <T>(group: ChalkboardGroup<T>): ChalkboardSet<T> => {
            const { set, operation } = group;
            if (!set.elements) {
                return Chalkboard.abal.define<T>([]);
            }
            const result = set.elements.filter((z) =>
                (set.elements ?? []).every((g) => operation(z, g) === operation(g, z))
            );
            return Chalkboard.abal.define(result);
        };

        /**
         * Calculates the complement of a set relative to a universal set.
         * @template T
         * @param {ChalkboardSet<T>} set - The universal set
         * @param {ChalkboardSet<T>} subset - The subset of the universal set
         * @returns {ChalkboardSet<T>}
         */
        export const complement = <T>(set: ChalkboardSet<T>, subset: ChalkboardSet<T>): ChalkboardSet<T> => {
            return Chalkboard.abal.define((set.elements || []).filter((element) => !subset.contains(element)));
        };

        /**
         * Generates the cyclic subgroup of an element in a group.
         * @template T
         * @param {ChalkboardGroup<T>} group - The group
         * @param {T} element - The generator of the cyclic subgroup
         * @returns {ChalkboardSet<T>}
         */
        export const cyclicSubgroup = <T>(group: ChalkboardGroup<T>, element: T): ChalkboardSet<T> => {
            const result: T[] = [];
            let current = element;
            do {
                result.push(current);
                current = group.operation(current, element);
            } while (!result.includes(current));
            return Chalkboard.abal.define(result);
        };

        /**
         * The set of all rotations and reflections of a polygon with n sides, denoted as Dn.
         * @param {number} n - The number of sides of the polygon
         * @returns {ChalkboardSet<string>}
         */
        export const D = (n: number): ChalkboardSet<string> => {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error("The parameter 'n' must be a positive integer.");
            }
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
         * Defines a finite set of elements.
         * @param {T[]} elements - The elements of the set
         * @returns {ChalkboardSet<T>}
         */
        export const define = <T>(elements: T[]): ChalkboardSet<T> => ({
            contains: (element: T) => elements.includes(element),
            elements: elements
        });

        /**
         * Calculates the difference of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         */
        export const difference = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            const result = (set1.elements || []).filter((element) => !set2.contains(element));
            return Chalkboard.abal.define(result);
        };

        /**
         * Defines the direct product or direct sum of two algebraic structures.
         * @template T, U
         * @param {ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>} structure1 - The first structure
         * @param {ChalkboardGroup<U> | ChalkboardRing<U> | ChalkboardField<U>} structure2 - The second structure
         * @param {"product" | "sum"} [type="product"] - The type of direct operation ("product" or "sum", defaults to "product").
         * @returns {ChalkboardGroup<[T, U]> | ChalkboardRing<[T, U]> | ChalkboardField<[T, U]>}
         */
        export const direct = <T, U>(structure1: ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>, structure2: ChalkboardGroup<U> | ChalkboardRing<U> | ChalkboardField<U>, type: "product" | "sum" = "product"): ChalkboardGroup<[T, U]> | ChalkboardRing<[T, U]> | ChalkboardField<[T, U]> => {
            const set = Chalkboard.abal.Cartesian(structure1.set, structure2.set);
            const add = (a: [T, U], b: [T, U]): [T, U] => [
                (structure1 as any).add(a[0], b[0]),
                (structure2 as any).add(a[1], b[1])
            ];
            const mul = (a: [T, U], b: [T, U]): [T, U] => [
                (structure1 as any).mul(a[0], b[0]),
                (structure2 as any).mul(a[1], b[1])
            ];
            const addIdentity: [T, U] = [
                (structure1 as any).addIdentity,
                (structure2 as any).addIdentity
            ];
            const mulIdentity: [T, U] = [
                (structure1 as any).mulIdentity,
                (structure2 as any).mulIdentity
            ];
            const addInverter = (a: [T, U]): [T, U] => [
                (structure1 as any).addInverter(a[0]),
                (structure2 as any).addInverter(a[1])
            ];
            const mulInverter = (a: [T, U]): [T, U] => [
                (structure1 as any).mulInverter(a[0]),
                (structure2 as any).mulInverter(a[1])
            ];
            if ("operation" in structure1 && "operation" in structure2) {
                const operation = (a: [T, U], b: [T, U]): [T, U] => [
                    structure1.operation(a[0], b[0]),
                    structure2.operation(a[1], b[1])
                ];
                const identity: [T, U] = [structure1.identity, structure2.identity];
                const inverter = (a: [T, U]): [T, U] => [
                    structure1.inverter(a[0]),
                    structure2.inverter(a[1])
                ];
                if (type === "sum") {
                    if (!structure1.set.elements || !structure2.set.elements) {
                        throw new Error("Direct sum is only defined for finite groups.");
                    }
                }
                return Chalkboard.abal.group(set, operation, identity, inverter);
            }
            if ("add" in structure1 && "add" in structure2 && "mul" in structure1 && "mul" in structure2) {
                if (type === "sum") {
                    if (!structure1.set.elements || !structure2.set.elements) {
                        throw new Error("Direct sum is only defined for finite rings.");
                    }
                }
                return Chalkboard.abal.ring(set, add, mul, addIdentity, mulIdentity, addInverter);
            }

            if ("add" in structure1 && "add" in structure2 && "mul" in structure1 && "mul" in structure2 && "mulInverter" in structure1 && "mulInverter" in structure2) {
                if (type === "sum") {
                    if (!structure1.set.elements || !structure2.set.elements) {
                        throw new Error("Direct sum is only defined for finite fields.");
                    }
                }
                return Chalkboard.abal.field(set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter);
            }
            throw new Error("Unsupported algebraic structures for direct product or sum.");
        };

        /**
         * Defines the algebraic structure known as a field.
         * @template T
         * @param {ChalkboardSet<T>} set - The set of the field
         * @param {(a: T, b: T) => T} add - The additive operation of the field
         * @param {(a: T, b: T) => T} mul - The multiplicative operation of the field
         * @param {T} [addIdentity] - The additive identity element of the field
         * @param {T} [mulIdentity] - The multiplicative identity element of the field
         * @param {(a: T) => T} [addInverter] - The function to compute the additive inverse of an element of the field
         * @param {(a: T) => T} [mulInverter] - The function to compute the multiplicative inverse of an element of the field
         * @returns {ChalkboardField<T>}
         */
        export const field = <T>(set: ChalkboardSet<T>, add: (a: T, b: T) => T, mul: (a: T, b: T) => T, addIdentity?: T, mulIdentity?: T, addInverter?: (a: T) => T, mulInverter?: (a: T) => T): ChalkboardField<T> => {
            const autoconfig = (): { addIdentity: T; mulIdentity: T; addInverter: (a: T) => T; mulInverter: (a: T) => T } => {
                if (!set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", "addInverter", and "mulInverter" explicitly.');
                }
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
                throw new Error('Automatic configuration of the "addIdentity", "mulIdentity", "addInverter", and "mulInverter" properties is not available for the inputted "set".');
            };
            const autoConfig = !addIdentity || !mulIdentity || !addInverter || !mulInverter ? autoconfig() : { addIdentity, mulIdentity, addInverter, mulInverter };
            const field: ChalkboardField<T> = { set, add, mul, addIdentity: autoConfig.addIdentity, mulIdentity: autoConfig.mulIdentity, addInverter: autoConfig.addInverter, mulInverter: autoConfig.mulInverter};
            if (!Chalkboard.abal.isField(field)) {
                throw new Error('The inputted "set", "add", and "mul" do not form a field.');
            }
            return field;
        };

        /**
         * Defines the algebraic structure known as a group.
         * @template T
         * @param {ChalkboardSet<T>} set - The set of the group
         * @param {(a: T, b: T) => T} operation - The operation of the group
         * @param {T} [identity] - The identity element of the group (optional if the set is Z, Q, R, C, or M)
         * @param {(a: T) => T} [inverter] - The function to compute the inverse of an element of the group (optional if the set is Z, Q, R, C, or M)
         * @returns {ChalkboardGroup<T>}
         */
        export const group = <T>(set: ChalkboardSet<T>, operation: (a: T, b: T) => T, identity?: T, inverter?: (a: T) => T): ChalkboardGroup<T> => {
            const autoconfig = (): { identity: T; inverter: (a: T) => T } => {
                if (!set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "identity" and "inverter" explicitly.');
                }
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
                    if (isNaN(n) || n <= 0) {
                        throw new Error(`Invalid modulus in set "${set.id}".`);
                    }
                    return {
                        identity: 0 as T,
                        inverter: (a: T) => ((n - (a as unknown as number) % n) % n) as T
                    };
                } else if (set.id.startsWith("M(")) {
                    const rows = (set as any).rows;
                    const cols = (set as any).cols;
                    return {
                        identity: Chalkboard.matr.fill(0, rows, cols) as T,
                        inverter: (a: T) => Chalkboard.matr.negate(a as unknown as ChalkboardMatrix) as T
                    };
                }
                throw new Error('Automatic configuration of the "identity" and "inverter" properties is not available for the inputted "set".');
            };
            const autoConfig = !identity || !inverter ? autoconfig() : { identity, inverter: inverter };
            const group: ChalkboardGroup<T> = { set, operation, identity: autoConfig.identity, inverter: autoConfig.inverter };
            if (!Chalkboard.abal.isGroup(group)) {
                throw new Error('The inputted "set" and "operation" do not form a group.');
            }
            return group;
        };

        /**
         * Calculates the intersection of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         */
        export const intersection = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            const result = (set1.elements || []).filter((element) => set2.contains(element));
            return Chalkboard.abal.define(result);
        };

        /**
         * Checks if a set is closed under an operation.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @param {(a: T, b: T) => T} operation - The operation
         * @returns {boolean}
         */
        export const isClosed = <T>(set: ChalkboardSet<T>, operation: (a: T, b: T) => T): boolean => {
            if (set.id === "Z" || set.id === "Q" || set.id === "R") {
                if (operation === ((a: T, b: T): T => (a as unknown as number) + (b as unknown as number) as T) || 
                    operation === ((a: T, b: T) => (a as unknown as number) * (b as unknown as number) as T)) {
                    return true;
                }
                return false;
            }
            if (set.id === "C") {
                if ((operation as unknown) === Chalkboard.comp.add || (operation as unknown) === Chalkboard.comp.mul) {
                    return true;
                }
                return false;
            }
            if (set.id?.startsWith("M(")) {
                const rows = (set as any).rows;
                const cols = (set as any).cols;
                if (typeof operation === "function" && (operation as unknown) === Chalkboard.matr.add) {
                    return true;
                }
                if (typeof operation === "function" && (operation as unknown) === Chalkboard.matr.mul) {
                    return rows === cols;
                }
                return false;
            }
            if (set.elements) {
                for (const a of set.elements) {
                    for (const b of set.elements) {
                        if (!set.contains(operation(a, b))) {
                            return false;
                        }
                    }
                }
                return true;
            }
            return false;
        };

        /**
         * Checks if an algebraic structure is commutative.
         * @template T
         * @param {ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>} structure - The algebraic structure
         * @returns {boolean}
         */
        export const isCommutative = <T>(structure: ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>): boolean => {
            const { set } = structure;
            if (!set.elements) {
                return false;
            }
            if ('operation' in structure) {
                const { operation } = structure;
                for (const a of set.elements) {
                    for (const b of set.elements) {
                        if (operation(a, b) !== operation(b, a)) {
                            return false;
                        }
                    }
                }
                return true;
            }
            if ('add' in structure && 'mul' in structure) {
                const { add, mul } = structure;
                for (const a of set.elements) {
                    for (const b of set.elements) {
                        if (add(a, b) !== add(b, a)) {
                            return false;
                        }
                    }
                }
                if ('mulIdentity' in structure) {
                    for (const a of set.elements) {
                        for (const b of set.elements) {
                            if (mul(a, b) !== mul(b, a)) {
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
         * @param {ChalkboardGroup<T>} group - The group
         * @param {ChalkboardSet<T>} subgroup - The subgroup
         * @returns {boolean}
         */
        export const isCyclicSubgroup = <T>(group: ChalkboardGroup<T>, subgroup: ChalkboardSet<T>): boolean => {
            if (!Chalkboard.abal.isSubgroup(group, subgroup)) {
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
                const generatedSet = Chalkboard.abal.define(generatedElements);
                if (Chalkboard.abal.isSubset(subgroup, generatedSet)) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Checks if a set or algebraic structure is empty.
         * @template T
         * @param {ChalkboardSet<T> | ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>} structure - The structure to check
         * @returns {boolean}
         */
        export const isEmpty = <T>(structure: ChalkboardSet<T> | ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>): boolean => {
            const id = 'set' in structure && structure.set ? structure.set.id : ('id' in structure ? structure.id : undefined);
            if (id === "Z" || id === "Q" || id === "R" || id === "C" || id?.startsWith("M(")) {
                return false;
            }
            if ('elements' in structure && structure.elements) {
                return structure.elements.length === 0;
            }
            if ('set' in structure && structure.set.elements) {
                return structure.set.elements.length === 0;
            }
            return true;
        };

        /**
         * Checks if an algebraic structure is a field.
         * @template T
         * @param {ChalkboardField<T>} field - The field
         * @returns {boolean}
         */
        export const isField = <T>(field: ChalkboardField<T>): boolean => {
            const { set, add, mul, addIdentity, mulIdentity, addInverter, mulInverter } = field;
            const additiveGroup: ChalkboardGroup<T> = { set, operation: add, identity: addIdentity, inverter: addInverter };
            if (!Chalkboard.abal.isGroup(additiveGroup) || !Chalkboard.abal.isCommutative(additiveGroup)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, mul)) {
                return false;
            }
            for (const a of set.elements || []) {
                for (const b of set.elements || []) {
                    for (const c of set.elements || []) {
                        if (mul(mul(a, b), c) !== mul(a, mul(b, c))) {
                            return false;
                        }
                    }
                }
            }
            for (const a of set.elements || []) {
                if (a !== addIdentity && (!set.contains(mulInverter(a)) || mul(a, mulInverter(a)) !== mulIdentity)) {
                    return false;
                }
            }
            if (!Chalkboard.abal.isCommutative(field)) {
                return false;
            }
            return true;
        };

        /**
         * Checks if an algebraic structure is a group.
         * @template T
         * @param {ChalkboardGroup<T>} group - The group
         * @returns {boolean}
         */
        export const isGroup = <T>(group: ChalkboardGroup<T>): boolean => {
            const { set, operation, identity, inverter } = group;
            if (!set.elements) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, operation)) {
                return false;
            }
            for (const a of set.elements) {
                if (operation(a, identity) !== a || operation(identity, a) !== a) {
                    return false;
                }
            }
            for (const a of set.elements) {
                if (!set.contains(inverter(a)) || operation(a, inverter(a)) !== identity) {
                    return false;
                }
            }
            for (const a of set.elements) {
                for (const b of set.elements) {
                    for (const c of set.elements) {
                        if (operation(operation(a, b), c) !== operation(a, operation(b, c))) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };

        /**
         * Checks if a subset is an ideal of a ring.
         * @template T
         * @param {ChalkboardRing<T>} ring - The ring
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         */
        export const isIdeal = <T>(ring: ChalkboardRing<T>, subset: ChalkboardSet<T>): boolean => {
            const { add, mul, addIdentity, addInverter } = ring;
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
         * @param {ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>} structure - The algebraic structure
         * @param {T} element - The element
         * @param {"add" | "mul"} [type="add"] - The type of identity to check ("add" for additive identity, "mul" for multiplicative identity, defaults to "add")
         * @returns {boolean}
         */
        export const isIdentity = <T>(structure: ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>, element: T, type: "add" | "mul" = "add"): boolean => {
            if (type === "add") {
                return (
                    'add' in structure &&
                    structure.add(element, structure.addIdentity) === element &&
                    structure.add(structure.addIdentity, element) === element
                );
            } else if (type === "mul" && "mul" in structure && "mulIdentity" in structure) {
                return (
                    structure.mul?.(element, structure.mulIdentity) === element &&
                    structure.mul?.(structure.mulIdentity, element) === element
                );
            }
            return false;
        };

        /**
         * Checks if two elements are inverses of each other in an algebraic structure.
         * @template T
         * @param {ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>} structure - The algebraic structure
         * @param {T} element1 - The first element
         * @param {T} element2 - The second element
         * @param {"add" | "mul"} [type="add"] - The type of inverse to check ("add" for additive inverse, "mul" for multiplicative inverse, defaults to "add")
         * @returns {boolean}
         */
        export const isInverse = <T>(structure: ChalkboardGroup<T> | ChalkboardRing<T> | ChalkboardField<T>, element1: T, element2: T, type: "add" | "mul" = "add"): boolean => {
            if (type === "add") {
                return (
                    'add' in structure &&
                    structure.add?.(element1, element2) === structure.addIdentity &&
                    structure.add?.(element2, element1) === structure.addIdentity
                );
            } else if (type === "mul" && "mul" in structure && "mulIdentity" in structure) {
                return (
                    structure.mul?.(element1, element2) === structure.mulIdentity &&
                    structure.mul?.(element2, element1) === structure.mulIdentity
                );
            }
            return false;
        };

        /**
         * Checks if a subgroup of a group is a normal subgroup.
         * @template T
         * @param {ChalkboardGroup<T>} group - The group
         * @param {ChalkboardSet<T>} subgroup - The subgroup
         * @returns {boolean}
         */
        export const isNormalSubgroup = <T>(group: ChalkboardGroup<T>, subgroup: ChalkboardSet<T>): boolean => {
            const { set, operation, inverter } = group;
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
         * Checks if an ideal is a principal ideal of a ring.
         * @template T
         * @param {ChalkboardRing<T>} ring - The ring
         * @param {ChalkboardSet<T>} ideal - The ideal
         * @returns {boolean}
         */
        export const isPrincipalIdeal = <T>(ring: ChalkboardRing<T>, ideal: ChalkboardSet<T>): boolean => {
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
         * @param {ChalkboardRing<T>} ring - The ring
         * @returns {boolean}
         */
        export const isRing = <T>(ring: ChalkboardRing<T>): boolean => {
            const { set, add, mul, addIdentity, addInverter } = ring;
            const additiveGroup: ChalkboardGroup<T> = { set, operation: add, identity: addIdentity, inverter: addInverter };
            if (!Chalkboard.abal.isGroup(additiveGroup) || !Chalkboard.abal.isCommutative(additiveGroup)) {
                return false;
            }
            if (!Chalkboard.abal.isClosed(set, mul)) {
                return false;
            }
            for (const a of set.elements || []) {
                for (const b of set.elements || []) {
                    for (const c of set.elements || []) {
                        if (mul(mul(a, b), c) !== mul(a, mul(b, c))) {
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
         * @param {ChalkboardField<T>} field - The field
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         */
        export const isSubfield = <T>(field: ChalkboardField<T>, subset: ChalkboardSet<T>): boolean => {
            const { add, mul, addIdentity, mulIdentity, addInverter, mulInverter } = field;
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
                if (a !== addIdentity && !subset.contains(mulInverter(a))) {
                    return false;
                }
            }
            return true;
        };

        /**
         * Checks if a subset is a subgroup of a group.
         * @template T
         * @param {ChalkboardGroup<T>} group - The group
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         */
        export const isSubgroup = <T>(group: ChalkboardGroup<T>, subset: ChalkboardSet<T>): boolean => {
            const { operation, identity, inverter } = group;
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
         * Checks if a subset is a subring of a ring.
         * @template T
         * @param {ChalkboardRing<T>} ring - The ring
         * @param {ChalkboardSet<T>} subset - The subset
         * @returns {boolean}
         */
        export const isSubring = <T>(ring: ChalkboardRing<T>, subset: ChalkboardSet<T>): boolean => {
            const { add, mul, addIdentity, addInverter } = ring;
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
         */
        export const isSubset = <T>(set: ChalkboardSet<T>, superset: ChalkboardSet<T>): boolean => {
            return (set.elements || []).every((element) => superset.contains(element));
        };

        /**
         * Checks if a set is a superset of another set.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @param {ChalkboardSet<T>} subset - The potential subset
         * @returns {boolean}
         */
        export const isSuperset = <T>(set: ChalkboardSet<T>, subset: ChalkboardSet<T>): boolean => {
            return Chalkboard.abal.isSubset(subset, set);
        };

        /**
         * Checks if a group and a subgroup satisfy Lagrange's Theorem, i.e. the order of a subgroup divides the order of its group.
         * @template T
         * @param {ChalkboardGroup<T>} group - The group
         * @param {ChalkboardSet<T>} subgroup - The subgroup
         * @returns {boolean}
         */
        export const Lagrange = <T>(group: ChalkboardGroup<T>, subgroup: ChalkboardSet<T>): boolean => {
            const groupOrder = Chalkboard.abal.cardinality(group);
            const subgroupOrder = Chalkboard.abal.cardinality(subgroup);
            if (!Number.isFinite(groupOrder) || !Number.isFinite(subgroupOrder)) {
                throw new Error("Lagrange's Theorem only applies to finite groups and subgroups.");
            }
            return groupOrder % subgroupOrder === 0;
        };

        /**
         * The set of all real-valued matrices of size "rows" x "cols", denoted as M(rows, cols).
         * @param {number} rows - The number of rows
         * @param {number} [cols=rows] - The number of columns (optional, defaults to the number of rows)
         * @returns {ChalkboardSet<ChalkboardMatrix>}
         */
        export const M = (rows: number, cols: number = rows): ChalkboardSet<ChalkboardMatrix> => ({
            contains: (element: ChalkboardMatrix) => {
                return Array.isArray(element) &&
                    element.length === rows &&
                    element.every(row => Array.isArray(row) && row.length === cols && row.every(cell => typeof cell === "number"));
            },
            id: `M(${rows}, ${cols})`
        });

        /**
         * Calculates the order of an element in a group.
         * @template T
         * @param {ChalkboardGroup<T>} group - The group
         * @param {T} element - The element
         * @returns {number}
         */
        export const order = <T>(group: ChalkboardGroup<T>, element: T): number => {
            let result = 1;
            let current = element;
            while (current !== group.identity) {
                current = group.operation(current, element);
                result++;
                if (result > (group.set.elements?.length || Infinity)) {
                    throw new Error('The "group" might not be finite because an infinite loop was detected.');
                }
            }
            return result;
        };

        /**
         * Computes the power set of a set.
         * @template T
         * @param {ChalkboardSet<T>} set - The set
         * @returns {ChalkboardSet<ChalkboardSet<T>>}
         */
        export const powerSet = <T>(set: ChalkboardSet<T>): ChalkboardSet<ChalkboardSet<T>> => {
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
                result.push(Chalkboard.abal.define(subset));
            }
            return Chalkboard.abal.define(result);
        };

        /**
         * Generates the principal ideal of an element in a ring.
         * @template T
         * @param {ChalkboardRing<T>} ring - The ring
         * @param {T} element - The generator of the principal ideal
         * @returns {ChalkboardSet<T>}
         */
        export const principalIdeal = <T>(ring: ChalkboardRing<T>, element: T): ChalkboardSet<T> => {
            const result: T[] = [];
            const { mul, add } = ring;
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
            return Chalkboard.abal.define(result);
        };

        /**
         * The set of all rational numbers, denoted as Q.
         * @returns {ChalkboardSet<number>}
         */
        export const Q = (): ChalkboardSet<number> => ({
            contains: (element: number) => {
                return Number.isFinite(element) && element % 1 !== 0;
            },
            id: "Q"
        });

        /**
         * The set of all real numbers, denoted as R.
         * @returns {ChalkboardSet<number>}
         */
        export const R = (): ChalkboardSet<number> => ({
            contains: (element: number) => Number.isFinite(element),
            id: "R"
        });

        /**
         * Defines the algebraic structure known as a ring.
         * @template T
         * @param {ChalkboardSet<T>} set - The set of the ring
         * @param {(a: T, b: T) => T} add - The additive operation of the ring
         * @param {(a: T, b: T) => T} mul - The multiplicative operation of the ring
         * @param {T} [addIdentity] - The additive identity element of the ring
         * @param {T} [mulIdentity] - The multiplicative identity element of the ring
         * @param {(a: T) => T} [addInverter] - The function to compute the additive inverse of an element of the ring
         * @returns {ChalkboardRing<T>}
         */
        export const ring = <T>(set: ChalkboardSet<T>, add: (a: T, b: T) => T, mul: (a: T, b: T) => T, addIdentity?: T, mulIdentity?: T, addInverter?: (a: T) => T): ChalkboardRing<T> => {
            const autoconfig = (): { addIdentity: T; mulIdentity: T; addInverter: (a: T) => T } => {
                if (!set.id) {
                    throw new Error('The "set" must have a valid "id" property, or you must input "addIdentity", "mulIdentity", and "addInverter" explicitly.');
                }
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
                    if (isNaN(n) || n <= 0) {
                        throw new Error(`Invalid modulus in set "${set.id}".`);
                    }
                    return {
                        addIdentity: 0 as T,
                        mulIdentity: 1 as T,
                        addInverter: (a: T) => ((n - (a as unknown as number) % n) % n) as T
                    };
                } else if (set.id.startsWith("M(")) {
                    const rows = (set as any).rows;
                    const cols = (set as any).cols;
                    if (rows !== cols) {
                        throw new Error('Only square matrices can form a ring.');
                    }
                    return {
                        addIdentity: Chalkboard.matr.fill(0, rows, cols) as T,
                        mulIdentity: Chalkboard.matr.identity(rows) as T,
                        addInverter: (a: T) => Chalkboard.matr.negate(a as unknown as ChalkboardMatrix) as T
                    };
                }
                throw new Error('Automatic configuration of the "addIdentity", "mulIdentity", and "addInverter" properties is not available for the inputted "set".');
            };
            const autoConfig = !addIdentity || !mulIdentity || !addInverter ? autoconfig() : { addIdentity, mulIdentity, addInverter };
            const ring: ChalkboardRing<T> = { set, add, mul, addIdentity: autoConfig.addIdentity, mulIdentity: autoConfig.mulIdentity, addInverter: autoConfig.addInverter };
            if (!Chalkboard.abal.isRing(ring)) {
                throw new Error('The inputted "set", "add", and "mul" do not form a ring.');
            }
            return ring;
        };

        /**
         * The set of all permutations of n elements, denoted as Sn.
         * @param {number} n - The number of elements
         * @returns {ChalkboardSet<number[]>}
         */
        export const S = (n: number): ChalkboardSet<number[]> => {
            if (!Number.isInteger(n) || n <= 0) {
                throw new Error("The parameter 'n' must be a positive integer.");
            }
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
                contains: (element: number[]) => elements.some((perm) => JSON.stringify(perm) === JSON.stringify(element)),
                elements: elements,
                id: `S${n}`
            };
        };

        /**
         * Calculates the symmetric difference of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         */
        export const symmetricDifference = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            const diffA = Chalkboard.abal.difference(set1, set2).elements || [];
            const diffB = Chalkboard.abal.difference(set2, set1).elements || [];
            return Chalkboard.abal.define([...diffA, ...diffB]);
        };

        /**
         * Calculates the union of two sets.
         * @template T
         * @param {ChalkboardSet<T>} set1 - The first set
         * @param {ChalkboardSet<T>} set2 - The second set
         * @returns {ChalkboardSet<T>}
         */
        export const union = <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>): ChalkboardSet<T> => {
            const result = Array.from(new Set([...(set1.elements || []), ...(set2.elements || [])]));
            return Chalkboard.abal.define(result);
        };

        /**
         * The set of integers, denoted as Z, or the set of integers modulo n, denoted as Zn.
         * @param {number} [n] - The modulus (optional, returns the set of all integers, i.e. Z, if omitted)
         * @returns {ChalkboardSet<number>}
         */
        export const Z = (n?: number): ChalkboardSet<number> => {
            if (n === undefined) {
                return {
                    contains: (element: number) => Number.isInteger(element),
                    id: "Z"
                };
            } else {
                if (!Number.isInteger(n) || n <= 0) {
                    throw new Error('The modulus "n" must be a positive integer.');
                }
                return {
                    contains: (element: number) => Number.isInteger(element) && element >= 0 && element < n,
                    elements: Array.from({ length: n }, (_, i) => i),
                    id: `Z${n}`
                };
            }
        };
    }
}
