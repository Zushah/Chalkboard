type ChalkboardComplex = {
    a: number;
    b: number;
};
type ChalkboardFunction = {
    definition: string | string[];
    type: "expl" | "inve" | "pola" | "curv" | "surf" | "mult" | "comp";
};
type ChalkboardMatrix = number[][];
type ChalkboardMorphism<T, U> = {
    struc1: ChalkboardStructure<T>;
    struc2: ChalkboardStructure<U>;
    mapping: (a: T) => U;
};
type ChalkboardQuaternion = {
    a: number;
    b: number;
    c: number;
    d: number;
};
type ChalkboardSet<T> = {
    contains: (element: T) => boolean;
    elements?: T[];
    id?: string;
};
type ChalkboardStructure<T> = {
    set: ChalkboardSet<T>;
    operation?: (a: T, b: T) => T;
    identity?: T;
    inverter?: (a: T) => T;
    add?: (a: T, b: T) => T;
    mul?: (a: T, b: T) => T;
    addIdentity?: T;
    mulIdentity?: T;
    addInverter?: (a: T) => T;
    mulInverter?: (a: T) => T;
};
type ChalkboardStructureExtension<T, U extends T> = {
    base: ChalkboardStructure<T>;
    extension: ChalkboardStructure<U>;
    degree: number;
    basis: ChalkboardVector[];
    isFinite: boolean;
    isSimple: boolean;
    isAlgebraic: boolean;
};
type ChalkboardTensor = number | ChalkboardTensor[];
type ChalkboardVector = {
    x: number;
    y: number;
    z?: number;
    w?: number;
};
type ChalkboardVectorField = {
    p: string;
    q: string;
    r?: string;
    s?: string;
};
declare namespace Chalkboard {
    const APPLY: <T>(object: ChalkboardComplex | ChalkboardMatrix | ChalkboardQuaternion | ChalkboardTensor | ChalkboardVector | ChalkboardSet<T> | ChalkboardStructure<T>, callback: (x: any) => any) => ChalkboardComplex | ChalkboardMatrix | ChalkboardQuaternion | ChalkboardTensor | ChalkboardVector | ChalkboardSet<T> | ChalkboardStructure<T>;
    let CONTEXT: string;
    const E: (exponent?: number) => number;
    const LOGO: (x?: number, y?: number, size?: number, context?: CanvasRenderingContext2D) => void;
    let PARSEPREFIX: string;
    const PI: (coefficient?: number) => number;
    const README: () => void;
    const VERSION: "2.2.0";
    const VERSIONALIAS: "Galois";
}
declare namespace Chalkboard {
    namespace abal {
        const A: (n: number) => ChalkboardSet<number[]>;
        const automorphism: <T>(struc: ChalkboardStructure<T>, mapping: (element: T) => T) => ChalkboardMorphism<T, T>;
        const C: (n?: number) => ChalkboardSet<ChalkboardComplex>;
        const cardinality: <T>(struc: ChalkboardSet<T> | ChalkboardStructure<T>) => number;
        const Cartesian: <T, U>(set1: ChalkboardSet<T>, set2: ChalkboardSet<U>) => ChalkboardSet<[T, U]>;
        const Cayley: (struc: ChalkboardStructure<number>, type?: "add" | "mul") => ChalkboardMatrix;
        const center: <T>(group: ChalkboardStructure<T>) => ChalkboardSet<T>;
        const complement: <T>(set: ChalkboardSet<T>, superset: ChalkboardSet<T>) => ChalkboardSet<T>;
        const compose: <T, U, V>(morph1: ChalkboardMorphism<T, U>, morph2: ChalkboardMorphism<U, V>) => ChalkboardMorphism<T, V>;
        const copy: <T, U extends T>(struc: ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardStructureExtension<T, U> | ChalkboardMorphism<T, U>) => ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardStructureExtension<T, U> | ChalkboardMorphism<T, U>;
        const coset: <T>(struc: ChalkboardStructure<T>, substruc: ChalkboardStructure<T>) => ChalkboardSet<ChalkboardSet<T>>;
        const cyclicSubgroup: <T>(group: ChalkboardStructure<T>, element: T) => ChalkboardSet<T>;
        const D: (n: number) => ChalkboardSet<string>;
        const difference: <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>) => ChalkboardSet<T>;
        const direct: <T, U>(struc1: ChalkboardStructure<T>, struc2: ChalkboardStructure<U>, type?: "product" | "sum") => ChalkboardStructure<[T, U]>;
        const endomorphism: <T>(struc: ChalkboardStructure<T>, mapping: (element: T) => T) => ChalkboardMorphism<T, T>;
        const field: <T>(set: ChalkboardSet<T>, add: (a: T, b: T) => T, mul: (a: T, b: T) => T, addIdentity?: T, mulIdentity?: T, addInverter?: (a: T) => T, mulInverter?: (a: T) => T) => ChalkboardStructure<T>;
        const fieldExtension: <T, U extends T>(base: ChalkboardStructure<T>, extension: ChalkboardStructure<U>, degree: number, basis: ChalkboardVector[], isFinite: boolean, isSimple: boolean, isAlgebraic: boolean) => ChalkboardStructureExtension<T, U>;
        const GL: (n: number) => ChalkboardSet<ChalkboardMatrix>;
        const group: <T>(set: ChalkboardSet<T>, operation: (a: T, b: T) => T, identity?: T, inverter?: (a: T) => T) => ChalkboardStructure<T>;
        const homomorphism: <T, U>(struc1: ChalkboardStructure<T>, struc2: ChalkboardStructure<U>, mapping: (element: T) => U) => ChalkboardMorphism<T, U>;
        const idmorphism: <T>(struc: ChalkboardStructure<T>) => ChalkboardMorphism<T, T>;
        const image: <T, U>(morph: ChalkboardMorphism<T, U>, subset?: ChalkboardSet<T>) => ChalkboardSet<U>;
        const intersection: <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>) => ChalkboardSet<T>;
        const invmorphism: <T, U>(morph: ChalkboardMorphism<T, U>) => ChalkboardMorphism<U, T>;
        const isAutomorphism: <T>(morph: ChalkboardMorphism<T, T>) => boolean;
        const isBijective: <T, U>(morph: ChalkboardMorphism<T, U>) => boolean;
        const isClosed: <T>(set: ChalkboardSet<T> | string, operation: ((a: T, b: T) => T) | "addition" | "multiplication") => boolean;
        const isCommutative: <T>(struc: ChalkboardStructure<T>) => boolean;
        const isCyclicSubgroup: <T>(group: ChalkboardStructure<T>, subgroup: ChalkboardSet<T>) => boolean;
        const isEmpty: <T>(struc: ChalkboardSet<T> | ChalkboardStructure<T>) => boolean;
        const isEndomorphism: <T>(morph: ChalkboardMorphism<T, T>) => boolean;
        const isEqual: <T, U>(struc1: ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardMorphism<T, U>, struc2: ChalkboardSet<T> | ChalkboardStructure<T> | ChalkboardMorphism<T, U>) => boolean;
        const isExact: <T, U, V>(morph1: ChalkboardMorphism<T, U>, morph2: ChalkboardMorphism<U, V>) => boolean;
        const isField: <T>(field: ChalkboardStructure<T>) => boolean;
        const isGroup: <T>(group: ChalkboardStructure<T>) => boolean;
        const isHomomorphism: <T, U>(morph: ChalkboardMorphism<T, U>) => boolean;
        const isIdeal: <T>(ring: ChalkboardStructure<T>, subset: ChalkboardSet<T>) => boolean;
        const isIdentity: <T>(struc: ChalkboardStructure<T>, element: T, type?: "add" | "mul") => boolean;
        const isInjective: <T, U>(morph: ChalkboardMorphism<T, U>) => boolean;
        const isInverse: <T>(struc: ChalkboardStructure<T>, element1: T, element2: T, type?: "add" | "mul") => boolean;
        const isIsomorphism: <T, U>(morph: ChalkboardMorphism<T, U>) => boolean;
        const isNormalSubgroup: <T>(group: ChalkboardStructure<T>, subgroup: ChalkboardSet<T>) => boolean;
        const isomorphism: <T, U>(struc1: ChalkboardStructure<T>, struc2: ChalkboardStructure<U>, mapping: (element: T) => U) => ChalkboardMorphism<T, U>;
        const isPrincipalIdeal: <T>(ring: ChalkboardStructure<T>, ideal: ChalkboardSet<T>) => boolean;
        const isRing: <T>(ring: ChalkboardStructure<T>) => boolean;
        const isSubfield: <T>(field: ChalkboardStructure<T>, subset: ChalkboardSet<T>) => boolean;
        const isSubgroup: <T>(group: ChalkboardStructure<T>, subset: ChalkboardSet<T>) => boolean;
        const isSubring: <T>(ring: ChalkboardStructure<T>, subset: ChalkboardSet<T>) => boolean;
        const isSubset: <T>(set: ChalkboardSet<T>, superset: ChalkboardSet<T>) => boolean;
        const isSuperset: <T>(set: ChalkboardSet<T>, subset: ChalkboardSet<T>) => boolean;
        const isSurjective: <T, U>(morph: ChalkboardMorphism<T, U>) => boolean;
        const kernel: <T, U>(morph: ChalkboardMorphism<T, U>, subset?: ChalkboardSet<T>) => ChalkboardSet<T>;
        const Lagrange: <T>(group: ChalkboardStructure<T>, subgroup: ChalkboardSet<T>) => boolean;
        const M: (rows: number, cols?: number) => ChalkboardSet<ChalkboardMatrix>;
        const N: () => ChalkboardSet<number>;
        const order: <T>(group: ChalkboardStructure<T>, element: T) => number;
        const P: () => ChalkboardSet<number>;
        const powerSet: <T>(set: ChalkboardSet<T>) => ChalkboardSet<ChalkboardSet<T>>;
        const preimage: <T, U>(morph: ChalkboardMorphism<T, U>, subset?: ChalkboardSet<U>) => ChalkboardSet<T>;
        const principalIdeal: <T>(ring: ChalkboardStructure<T>, element: T) => ChalkboardSet<T>;
        const print: (struc: ChalkboardSet<number> | ChalkboardStructure<number>) => void;
        const Q: () => ChalkboardSet<number>;
        const quotient: <T>(struc: ChalkboardStructure<T>, substruc: ChalkboardStructure<T>) => ChalkboardStructure<ChalkboardSet<T>>;
        const R: () => ChalkboardSet<number>;
        const ring: <T>(set: ChalkboardSet<T>, add: (a: T, b: T) => T, mul: (a: T, b: T) => T, addIdentity?: T, mulIdentity?: T, addInverter?: (a: T) => T) => ChalkboardStructure<T>;
        const ringExtension: <T, U extends T>(base: ChalkboardStructure<T>, extension: ChalkboardStructure<U>, degree: number, basis: ChalkboardVector[], isFinite: boolean, isSimple: boolean, isAlgebraic: boolean) => ChalkboardStructureExtension<T, U>;
        const S: (n: number) => ChalkboardSet<number[]>;
        const set: <T>(set: T[]) => ChalkboardSet<T>;
        const symmetricDifference: <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>) => ChalkboardSet<T>;
        const toArray: <T>(struc: ChalkboardSet<T> | ChalkboardStructure<T>) => T[];
        const toMatrix: (struc: ChalkboardSet<number> | ChalkboardStructure<number>, rows: number, cols?: number) => ChalkboardMatrix;
        const toObject: (struc: ChalkboardSet<number> | ChalkboardStructure<number>) => object;
        const toString: (struc: ChalkboardSet<number> | ChalkboardStructure<number>) => string;
        const toTensor: (struc: ChalkboardSet<number> | ChalkboardStructure<number>, ...size: number[]) => ChalkboardTensor;
        const toVector: (struc: ChalkboardSet<number> | ChalkboardStructure<number>, dimension: 2 | 3 | 4, index?: number) => ChalkboardVector;
        const union: <T>(set1: ChalkboardSet<T>, set2: ChalkboardSet<T>) => ChalkboardSet<T>;
        const Z: (n?: number) => ChalkboardSet<number>;
    }
}
declare namespace Chalkboard {
    namespace calc {
        const autocorrelation: (func: ChalkboardFunction, val: number) => number;
        const binormal: (func: ChalkboardFunction, val: number) => ChalkboardVector;
        const convolution: (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number) => number;
        const correlation: (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number) => number;
        const curl: (vectfield: ChalkboardVectorField, vect: ChalkboardVector) => ChalkboardVector;
        const curvature: (func: ChalkboardFunction, val: number) => number;
        const dfdv: (func: ChalkboardFunction, vectpos: ChalkboardVector, vectdir: ChalkboardVector) => number;
        const dfdx: (func: ChalkboardFunction, val: number) => number | ChalkboardVector;
        const d2fdx2: (func: ChalkboardFunction, val: number) => number | ChalkboardVector;
        const dfdz: (func: ChalkboardFunction, comp: ChalkboardComplex) => [ChalkboardComplex, ChalkboardComplex];
        const d2fdz2: (func: ChalkboardFunction, comp: ChalkboardComplex) => [ChalkboardComplex, ChalkboardComplex];
        const dfrdt: (func1: ChalkboardFunction, func2: ChalkboardFunction, val: number) => number;
        const div: (vectfield: ChalkboardVectorField, vect: ChalkboardVector) => number;
        const extrema: (func: ChalkboardFunction, domain: [number, number]) => number[];
        const fds: (func: ChalkboardFunction, tinf: number, tsup: number, sinf?: number, ssup?: number) => number;
        const fnds: (vectfield: ChalkboardVectorField, func: ChalkboardFunction, tinf: number, tsup: number, sinf?: number, ssup?: number) => number;
        const Fourier: (func: ChalkboardFunction, val: number) => number;
        const frds: (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, func: ChalkboardFunction, inf: number, sup: number) => number;
        const fxdx: (func: ChalkboardFunction, inf: number, sup: number) => number | ChalkboardVector;
        const fxydxdy: (func: ChalkboardFunction, xinf: number, xsup: number, yinf: number, ysup: number) => number;
        const fzdz: (func1: ChalkboardFunction, func2: ChalkboardFunction, inf: number, sup: number) => ChalkboardComplex;
        const grad: (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, vect: ChalkboardVector) => ChalkboardVector | ChalkboardMatrix;
        const grad2: (funcORvectfield: ChalkboardFunction | ChalkboardVectorField, vect: ChalkboardVector) => ChalkboardMatrix;
        const Laplace: (func: ChalkboardFunction, val: number) => number;
        const lim: (func: ChalkboardFunction, val: number) => number | undefined;
        const mean: (func: ChalkboardFunction, inf: number, sup: number) => number;
        const Newton: (func: ChalkboardFunction, domain?: [number, number]) => number;
        const normal: (func: ChalkboardFunction, val: number) => ChalkboardVector;
        const tangent: (func: ChalkboardFunction, val: number) => ChalkboardVector;
        const Taylor: (func: ChalkboardFunction, val: number, n: 0 | 1 | 2, a: number) => number;
    }
}
declare namespace Chalkboard {
    namespace comp {
        const absolute: (comp: ChalkboardComplex) => ChalkboardComplex;
        const add: (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number) => ChalkboardComplex;
        const arg: (comp: ChalkboardComplex) => number;
        const argBetween: (comp1: ChalkboardComplex, comp2: ChalkboardComplex) => number;
        const conjugate: (comp: ChalkboardComplex) => ChalkboardComplex;
        const constrain: (comp: ChalkboardComplex, range?: [number, number]) => ChalkboardComplex;
        const copy: (comp: ChalkboardComplex) => ChalkboardComplex;
        const define: (realDefinition: string, imagDefinition: string) => ChalkboardFunction;
        const dist: (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number) => number;
        const distsq: (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number) => number;
        const div: (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number) => ChalkboardComplex;
        const Euler: (rad: number) => ChalkboardComplex;
        const Im: (funcORcomp: ChalkboardFunction | ChalkboardComplex) => string | number;
        const init: (a: number, b?: number) => ChalkboardComplex;
        const invert: (comp: ChalkboardComplex) => ChalkboardComplex;
        const ln: (comp: ChalkboardComplex) => ChalkboardComplex;
        const mag: (comp: ChalkboardComplex) => number;
        const magset: (comp: ChalkboardComplex, num: number) => ChalkboardComplex;
        const magsq: (comp: ChalkboardComplex) => number;
        const mul: (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number) => ChalkboardComplex;
        const negate: (comp: ChalkboardComplex) => ChalkboardComplex;
        const normalize: (comp: ChalkboardComplex) => ChalkboardComplex;
        const parse: (str: string) => Function;
        const pow: (comp: ChalkboardComplex, num: number) => ChalkboardComplex;
        const print: (comp: ChalkboardComplex) => void;
        const random: (inf?: number, sup?: number) => ChalkboardComplex;
        const Re: (funcORcomp: ChalkboardFunction | ChalkboardComplex) => string | number;
        const reciprocate: (comp: ChalkboardComplex) => ChalkboardComplex;
        const root: (comp: ChalkboardComplex, index?: number) => ChalkboardComplex[];
        const rotate: (comp: ChalkboardComplex, rad: number) => ChalkboardComplex;
        const round: (comp: ChalkboardComplex) => ChalkboardComplex;
        const scl: (comp: ChalkboardComplex, num: number) => ChalkboardComplex;
        const slope: (comp: ChalkboardComplex) => number;
        const sq: (comp: ChalkboardComplex) => ChalkboardComplex;
        const sqrt: (comp: ChalkboardComplex) => ChalkboardComplex;
        const sub: (comp1: ChalkboardComplex | number, comp2: ChalkboardComplex | number) => ChalkboardComplex;
        const toArray: (comp: ChalkboardComplex) => [number, number];
        const toMatrix: (comp: ChalkboardComplex) => ChalkboardMatrix;
        const toString: (comp: ChalkboardComplex) => string;
        const toVector: (comp: ChalkboardComplex) => ChalkboardVector;
        const val: (func: ChalkboardFunction, comp: ChalkboardComplex) => ChalkboardComplex;
        const zero: (comp: ChalkboardComplex) => ChalkboardComplex;
    }
}
declare namespace Chalkboard {
    namespace geom {
        const circleA: (r: number) => number;
        const circleP: (r: number) => number;
        const coneA: (r: number, h: number) => number;
        const coneV: (r: number, h: number) => number;
        const cubeA: (s: number) => number;
        const cubeV: (s: number) => number;
        const cylinderA: (r: number, h: number) => number;
        const cylinderV: (r: number, h: number) => number;
        const dist: (p1: number[], p2: number[]) => number;
        const distsq: (p1: number[], p2: number[]) => number;
        const ellipseA: (a: number, b: number) => number;
        const ellipseP: (a: number, b: number) => number;
        const Euler: (v: number, e: number, f: number) => number;
        const line3D: (x1: number, y1: number, z1: number, x2: number, y2: number, z2: number, context?: CanvasRenderingContext2D) => void;
        const mid: (p1: number[], p2: number[]) => number[];
        const parallelogramA: (l: number, w: number) => number;
        const parallelogramP: (l: number, w: number) => number;
        const polygonA: (n: number, s: number, a: number) => number;
        const polygonP: (n: number, s: number) => number;
        const Pythagorean: (a: number, b: number, type?: "hyp" | "leg") => number;
        const PythagoreanTriple: (inf: number, sup: number) => [number, number, number];
        const rectangularprismA: (l: number, w: number, h: number) => number;
        const rectangularprismV: (l: number, w: number, h: number) => number;
        const sectorA: (r: number, rad: number) => number;
        const sectorP: (r: number, rad: number) => number;
        const sphereA: (r: number) => number;
        const sphereV: (r: number) => number;
        const squareA: (s: number) => number;
        const squareP: (s: number) => number;
        const trapezoidA: (b1: number, b2: number, h: number) => number;
        const trapezoidP: (a: number, b: number, c: number, d: number) => number;
        const triangleA: (b: number, h: number) => number;
        const triangleP: (a: number, b: number, c: number) => number;
        const trianglesidesA: (a: number, b: number, c: number) => number;
        const triangularprismA: (a: number, b: number, c: number, h: number) => number;
        const triangularprismV: (a: number, b: number, c: number, h: number) => number;
    }
}
declare namespace Chalkboard {
    namespace matr {
        const absolute: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const add: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix) => ChalkboardMatrix;
        const addKronecker: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix) => ChalkboardMatrix;
        const adjugate: (matr: ChalkboardMatrix, row: number, col: number) => ChalkboardMatrix;
        const cofactor: (matr: ChalkboardMatrix, row: number, col: number) => ChalkboardMatrix;
        const cols: (matr: ChalkboardMatrix) => number;
        const colspace: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const concat: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix, axis?: 0 | 1) => ChalkboardMatrix;
        const constrain: (matr: ChalkboardMatrix, range?: [number, number]) => ChalkboardMatrix;
        const copy: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const det: (matr: ChalkboardMatrix) => number;
        const diagonal: (size: number, ...elements: number[]) => ChalkboardMatrix;
        const eigenvalue: (matr: ChalkboardMatrix, maxIterations?: number) => number;
        const eigenvector: (matr: ChalkboardMatrix, maxIterations?: number) => number[];
        const empty: (rows: number, cols?: number) => ChalkboardMatrix;
        const exchange: (size: number) => ChalkboardMatrix;
        const fill: (element: number, rows: number, cols?: number) => ChalkboardMatrix;
        const Gaussian: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const Hilbert: (size: number) => ChalkboardMatrix;
        const identity: (size: number) => ChalkboardMatrix;
        const init: (...matrix: number[][] | number[][][]) => ChalkboardMatrix;
        const invert: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const isDiagonal: (matr: ChalkboardMatrix) => boolean;
        const isEqual: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix) => boolean;
        const isIdentity: (matr: ChalkboardMatrix) => boolean;
        const isInvertible: (matr: ChalkboardMatrix) => boolean;
        const isLowerTriangular: (matr: ChalkboardMatrix) => boolean;
        const isOrthogonal: (matr: ChalkboardMatrix) => boolean;
        const isSizeEqual: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix) => boolean;
        const isSizeOf: (matr: ChalkboardMatrix, rows: number, cols?: number) => boolean;
        const isSkewSymmetric: (matr: ChalkboardMatrix) => boolean;
        const isSquare: (matr: ChalkboardMatrix) => boolean;
        const isSymmetric: (matr: ChalkboardMatrix) => boolean;
        const isUpperTriangular: (matr: ChalkboardMatrix) => boolean;
        const isZero: (matr: ChalkboardMatrix) => boolean;
        const Lehmer: (size: number) => ChalkboardMatrix;
        const lowerBinomial: (size: number) => ChalkboardMatrix;
        const lowerShift: (size: number) => ChalkboardMatrix;
        const lowerTriangular: (size: number, ...elements: number[]) => ChalkboardMatrix;
        const LUdecomp: (matr: ChalkboardMatrix) => {
            L: ChalkboardMatrix;
            U: ChalkboardMatrix;
        };
        const mul: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix) => ChalkboardMatrix;
        const mulKronecker: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix) => ChalkboardMatrix;
        const mulVector: (matr: ChalkboardMatrix, vect: ChalkboardVector) => ChalkboardMatrix | ChalkboardVector;
        const negate: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const norm: (matr: ChalkboardMatrix, p?: number, q?: number) => number;
        const normalize: (matr: ChalkboardMatrix, p?: number, q?: number) => ChalkboardMatrix;
        const normsq: (matr: ChalkboardMatrix, p?: number, q?: number) => number;
        const nullspace: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const perm: (matr: ChalkboardMatrix) => number;
        const pow: (matr: ChalkboardMatrix, num: number) => ChalkboardMatrix;
        const print: (matr: ChalkboardMatrix) => void;
        const pull: (matr: ChalkboardMatrix, index: number, axis: 0 | 1) => ChalkboardMatrix;
        const push: (matr: ChalkboardMatrix, index: number, axis: 0 | 1, elements: number[]) => ChalkboardMatrix;
        const QRdecomp: (matr: ChalkboardMatrix) => {
            Q: ChalkboardMatrix;
            R: ChalkboardMatrix;
        };
        const random: (inf: number, sup: number, rows: number, cols?: number) => ChalkboardMatrix;
        const rank: (matr: ChalkboardMatrix) => number;
        const reciprocate: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const resize: (matr: ChalkboardMatrix, rows: number, cols?: number) => ChalkboardMatrix;
        const rotator: (radx: number, rady?: number, radz?: number) => ChalkboardMatrix;
        const round: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const rows: (matr: ChalkboardMatrix) => number;
        const rowspace: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const scaler: (vect: ChalkboardVector) => ChalkboardMatrix;
        const scl: (matr: ChalkboardMatrix, num: number) => ChalkboardMatrix;
        const solve: (matrA: ChalkboardMatrix, matrB: ChalkboardMatrix) => ChalkboardMatrix;
        const sub: (matr1: ChalkboardMatrix, matr2: ChalkboardMatrix) => ChalkboardMatrix;
        const symmetricBinomial: (size: number) => ChalkboardMatrix;
        const toArray: (matr: ChalkboardMatrix) => number[];
        const toObject: (matr: ChalkboardMatrix) => object;
        const toSet: (matr: ChalkboardMatrix) => ChalkboardSet<number>;
        const toString: (matr: ChalkboardMatrix) => string;
        const toTensor: (matr: ChalkboardMatrix, ...size: number[]) => ChalkboardTensor;
        const toVector: (matr: ChalkboardMatrix, dimension: 2 | 3 | 4, index?: number, axis?: 0 | 1) => ChalkboardVector;
        const trace: (matr: ChalkboardMatrix) => number;
        const transpose: (matr: ChalkboardMatrix) => ChalkboardMatrix;
        const translator: (vect: ChalkboardVector) => ChalkboardMatrix;
        const upperBinomial: (size: number) => ChalkboardMatrix;
        const upperShift: (size: number) => ChalkboardMatrix;
        const upperTriangular: (size: number, ...elements: number[]) => ChalkboardMatrix;
        const zero: (matr: ChalkboardMatrix) => ChalkboardMatrix;
    }
}
declare namespace Chalkboard {
    namespace numb {
        const Bernoullian: (p?: number) => number;
        const binomial: (n: number, k: number) => number;
        const change: (initial: number, final: number) => number;
        const combination: (n: number, r: number) => number;
        const compositeArr: (inf: number, sup: number) => number[];
        const compositeCount: (inf: number, sup: number) => number;
        const constrain: (num: number, range?: [number, number]) => number;
        const divisors: (num: number) => number[];
        const Euler: (num: number) => number | undefined;
        const exponential: (l?: number) => number;
        const factorial: (num: number) => number;
        const factors: (num: number) => number[];
        const Fibonacci: (num: number) => number;
        const Gaussian: (height: number, mean: number, deviation: number) => number;
        const gcd: (a: number, b: number) => number;
        const Goldbach: (num: number) => [number, number] | undefined;
        const isApproxEqual: (a: number, b: number, precision?: number) => boolean;
        const isPrime: (num: number) => boolean;
        const isRational: (num: number, tolerance?: number) => boolean;
        const Kronecker: (a: number, b: number) => 1 | 0;
        const lcm: (a: number, b: number) => number;
        const map: (num: number, range1: number[], range2: number[]) => number;
        const mod: (a: number, b: number) => number;
        const mul: (formula: string, inf: number, sup: number) => number;
        const nextPrime: (num: number) => number;
        const permutation: (n: number, r: number) => number;
        const Poissonian: (l?: number) => number;
        const prime: (num: number) => number;
        const primeArr: (inf: number, sup: number) => number[];
        const primeCount: (inf: number, sup: number) => number;
        const primeGap: (inf: number, sup: number) => number;
        const random: (inf?: number, sup?: number) => number;
        const roundTo: (num: number, positionalIndex: number) => number;
        const sgn: (num: number) => -1 | 0 | 1;
        const sum: (formula: string, inf: number, sup: number) => number;
        const toFraction: (num: number, tolerance?: number) => [number, number];
    }
}
declare namespace Chalkboard {
    namespace real {
        const define: (definition: string | string[], type?: "expl" | "inve" | "pola" | "curv" | "surf" | "mult") => ChalkboardFunction;
        const Dirac: (num: number, edge?: number, scl?: number) => number;
        const discriminant: (a: number, b: number, c: number, form?: "stan" | "vert") => number;
        const Heaviside: (num: number, edge?: number, scl?: number) => number;
        const lerp: (p: [number, number], t: number) => number;
        const linear: (x1: number, y1: number, x2: number, y2: number) => ChalkboardFunction;
        const linearFormula: (a: number, b: number, c?: number, d?: number) => number;
        const ln: (num: number) => number;
        const log: (base: number, num: number) => number;
        const log10: (num: number) => number;
        const parse: (str: string) => Function;
        const pingpong: (num: number, edge?: number, scl?: number) => number;
        const pow: (base: number, num: number) => number;
        const qerp: (p1: [number, number], p2: [number, number], p3: [number, number], t: number) => number;
        const quadratic: (a: number, b: number, c: number, form?: "stan" | "vert") => ChalkboardFunction;
        const quadraticFormula: (a: number, b: number, c: number, form?: "stan" | "vert") => [number, number];
        const ramp: (num: number, edge?: number, scl?: number) => number;
        const rect: (num: number, center?: number, width?: number, scl?: number) => number;
        const root: (num: number, index?: number) => number;
        const slope: (x1: number, y1: number, x2: number, y2: number) => number;
        const sqrt: (num: number) => number;
        const tetration: (base: number, num: number) => number | undefined;
        const val: (func: ChalkboardFunction, val: number | ChalkboardVector) => number | ChalkboardVector;
    }
}
declare namespace Chalkboard {
    namespace plot {
        const autocorrelation: (func: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const barplot: (arr: number[], bins: number[], config: {
            x: number;
            y: number;
            size: number;
            fillStyle: string;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const comp: (comp: ChalkboardComplex, config: {
            x: number;
            y: number;
            size: number;
            fillStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const convolution: (func1: ChalkboardFunction, func2: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const correlation: (func1: ChalkboardFunction, func2: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const definition: (func: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number] | [[number, number], [number, number]];
            context: CanvasRenderingContext2D;
        }) => number[][];
        const dfdx: (func: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const d2fdx2: (func: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const field: (vectfield: ChalkboardVectorField, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [[number, number], [number, number]];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const Fourier: (func: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const fxdx: (func: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const Laplace: (func: ChalkboardFunction, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const lineplot: (arr: number[], bins: number[], config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const matr: (matr: ChalkboardMatrix, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            context: CanvasRenderingContext2D;
        }) => number[][];
        const rOplane: (config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }) => void;
        const scatterplot: (arr1: number[], arr2: number[], config: {
            x: number;
            y: number;
            size: number;
            fillStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const Taylor: (func: ChalkboardFunction, n: 0 | 1 | 2, a: number, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            domain: [number, number];
            res: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const vect: (vect: ChalkboardVector, config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }) => number[][];
        const xyplane: (config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }) => void;
    }
}
declare namespace Chalkboard {
    namespace quat {
        const absolute: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const add: (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number) => ChalkboardQuaternion;
        const conjugate: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const constrain: (quat: ChalkboardQuaternion, range?: [number, number]) => ChalkboardQuaternion;
        const copy: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const dist: (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number) => number;
        const distsq: (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number) => number;
        const div: (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number) => ChalkboardQuaternion;
        const fromAxis: (vect: ChalkboardVector, rad: number) => ChalkboardQuaternion;
        const init: (a: number, b?: number, c?: number, d?: number) => ChalkboardQuaternion;
        const invert: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const mag: (quat: ChalkboardQuaternion) => number;
        const magset: (quat: ChalkboardQuaternion, num: number) => ChalkboardQuaternion;
        const magsq: (quat: ChalkboardQuaternion) => number;
        const mul: (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number) => ChalkboardQuaternion;
        const negate: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const normalize: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const print: (quat: ChalkboardQuaternion) => void;
        const random: (inf?: number, sup?: number) => ChalkboardQuaternion;
        const reciprocate: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const round: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
        const scl: (quat: ChalkboardQuaternion, num: number) => ChalkboardQuaternion;
        const sub: (quat1: ChalkboardQuaternion | number, quat2: ChalkboardQuaternion | number) => ChalkboardQuaternion;
        const toArray: (quat: ChalkboardQuaternion) => [number, number, number, number];
        const toMatrix: (quat: ChalkboardQuaternion) => ChalkboardMatrix;
        const toRotation: (quat: ChalkboardQuaternion, vect: ChalkboardVector) => ChalkboardVector;
        const toString: (quat: ChalkboardQuaternion) => string;
        const toVector: (quat: ChalkboardQuaternion) => ChalkboardVector;
        const zero: (quat: ChalkboardQuaternion) => ChalkboardQuaternion;
    }
}
declare namespace Chalkboard {
    namespace stat {
        const absolute: (arr: number[]) => number[];
        const add: (arr1: number[], arr2: number[]) => number[];
        const array: (inf: number, sup: number, length?: number) => number[];
        const autocorrelation: (arr: number[]) => number[];
        const Bayes: (pA: number, pGivenA: number, pGivenNotA: number) => number;
        const change: (arr1: number[], arr2: number[]) => number[];
        const chiSquared: (arr1: number[], arr2: number[]) => number[];
        const confidenceInterval: (arr: number[], confidence?: number) => [number, number];
        const constrain: (arr: number[], range?: [number, number]) => number[];
        const convolution: (arr1: number[], arr2: number[]) => number[];
        const correlation: (arr1: number[], arr2: number[]) => number[];
        const correlationCoefficient: (arr1: number[], arr2: number[]) => number;
        const covariance: (arr1: number[], arr2: number[]) => number;
        const cummax: (arr: number[]) => number[];
        const cummin: (arr: number[]) => number[];
        const cummul: (arr: number[]) => number[];
        const cumsum: (arr: number[]) => number[];
        const deviation: (arr: number[]) => number;
        const dot: (arr1: number[], arr2: number[]) => number;
        const error: (arr: number[]) => number;
        const eq: (arr: number[], arrORnum: number | number[]) => number[];
        const expected: (arr: number[], probabilities?: number[]) => number;
        const Gaussian: (height: number, mean: number, deviation: number) => ChalkboardFunction;
        const gt: (arr: number[], arrORnum: number | number[], includeEnd?: boolean) => number[];
        const ineq: (arr: number[], inf: number, sup: number, includeInf?: boolean, includeSup?: boolean) => number[];
        const inormal: (p: number) => number;
        const interpolate: (arr: (number | null | undefined)[], type?: "linear" | "quadratic") => number[];
        const interquartileRange: (arr: number[]) => number;
        const kurtosis: (arr: number[]) => number;
        const lt: (arr: number[], arrORnum: number | number[], includeEnd?: boolean) => number[];
        const mad: (arr: number[]) => number;
        const max: (arr: number[]) => number;
        const mean: (arr: number[], type?: "arithmetic" | "geometric" | "harmonic") => number;
        const meanMoving: (arr: number[], windowSize: number) => number[];
        const meanWeighted: (arr: number[], weights: number[]) => number;
        const median: (arr: number[]) => number;
        const min: (arr: number[]) => number;
        const mode: (arr: number[]) => number;
        const mul: (arr: number[]) => number;
        const negate: (arr: number[]) => number[];
        const norm: (arr: number[], type?: "L0" | "L1" | "L2" | "LInfinity") => number;
        const normal: (x: number) => number;
        const normalize: (arr: number[], type?: "L0" | "L1" | "L2" | "LInfinity") => number[];
        const normsq: (arr: number[], type?: "L0" | "L1" | "L2" | "LInfinity") => number;
        const pad: (arr: number[], length: number, num?: number) => number[];
        const percentile: (arr: number[], num: number) => number;
        const print: (arr: number[]) => void;
        const quartile: (arr: number[], type: "Q1" | "Q2" | "Q3") => number;
        const random: (inf: number, sup: number, length: number) => number[];
        const range: (arr: number[]) => number;
        const regression: (data: number[][], type?: "linear" | "polynomial" | "power" | "exponential" | "logarithmic", degree?: number) => ChalkboardFunction;
        const resampling: (arr: number[], samples?: number, type?: "bootstrap" | "jackknife") => number[][];
        const reverse: (arr: number[]) => number[];
        const scl: (arr: number[], num: number) => number[];
        const shuffle: (arr: number[]) => number[];
        const skewness: (arr: number[]) => number;
        const sub: (arr1: number[], arr2: number[]) => number[];
        const subsets: (arr: number[]) => number[][];
        const sum: (arr: number[]) => number;
        const toMatrix: (arr: number[], rows: number, cols?: number) => ChalkboardMatrix;
        const toObject: (arr: number[]) => object;
        const toSet: (arr: number[]) => ChalkboardSet<number>;
        const toString: (arr: number[]) => string;
        const toTensor: (arr: number[], ...size: number[]) => ChalkboardTensor;
        const toVector: (arr: number[], dimension: 2 | 3 | 4, index?: number) => ChalkboardVector;
        const unique: <T>(arr: T[]) => T[];
        const variance: (arr: number[]) => number;
        const zscored: (arr: number[]) => number[];
    }
}
declare namespace Chalkboard {
    namespace tens {
        const absolute: (tens: ChalkboardTensor) => ChalkboardTensor;
        const add: (tens1: ChalkboardTensor, tens2: ChalkboardTensor) => ChalkboardTensor;
        const concat: (tens1: ChalkboardTensor, tens2: ChalkboardTensor, rank?: number) => ChalkboardTensor;
        const constrain: (tens: ChalkboardTensor, range?: [number, number]) => ChalkboardTensor;
        const contract: (tens: ChalkboardTensor) => ChalkboardTensor | number;
        const copy: (tens: ChalkboardTensor) => ChalkboardTensor;
        const empty: (...size: number[]) => ChalkboardTensor;
        const fill: (element: number, ...size: number[]) => ChalkboardTensor;
        const init: (...tensor: ChalkboardTensor[]) => ChalkboardTensor;
        const isEqual: (tens1: ChalkboardTensor, tens2: ChalkboardTensor) => boolean;
        const isRankEqual: (tens1: ChalkboardTensor, tens2: ChalkboardTensor) => boolean;
        const isRankOf: (tens: ChalkboardTensor, rank: number) => boolean;
        const isSizeEqual: (tens1: ChalkboardTensor, tens2: ChalkboardTensor) => boolean;
        const isSizeOf: (tens: ChalkboardTensor, ...size: number[]) => boolean;
        const isSizeUniform: (tens: ChalkboardTensor) => boolean;
        const mul: (tens1: ChalkboardTensor, tens2: ChalkboardTensor) => ChalkboardTensor;
        const negate: (tens: ChalkboardTensor) => ChalkboardTensor;
        const print: (tens: ChalkboardTensor) => void;
        const pull: (tens: ChalkboardTensor, rank: number, index: number) => ChalkboardTensor;
        const push: (tens: ChalkboardTensor, rank: number, index: number, elements: number[]) => ChalkboardTensor;
        const random: (inf: number, sup: number, ...size: number[]) => ChalkboardTensor;
        const rank: (tens: ChalkboardTensor) => number;
        const reciprocate: (tens: ChalkboardTensor) => ChalkboardTensor;
        const resize: (tens: ChalkboardTensor, ...size: number[]) => ChalkboardTensor;
        const round: (tens: ChalkboardTensor) => ChalkboardTensor;
        const scl: (tens: ChalkboardTensor, num: number) => ChalkboardTensor;
        const size: (tens: ChalkboardTensor) => number[];
        const sub: (tens1: ChalkboardTensor, tens2: ChalkboardTensor) => ChalkboardTensor;
        const toArray: (tens: ChalkboardTensor) => number[];
        const toMatrix: (tens: ChalkboardTensor) => ChalkboardMatrix;
        const toObject: (tens: ChalkboardTensor) => object | number;
        const toSet: (tens: ChalkboardTensor) => ChalkboardSet<number>;
        const toString: (tens: ChalkboardTensor, indentation?: number) => string;
        const toVector: (tens: ChalkboardTensor, dimension: number, index?: number) => ChalkboardVector;
        const transpose: (tens: ChalkboardTensor) => ChalkboardTensor;
        const zero: (tens: ChalkboardTensor) => ChalkboardTensor;
    }
}
declare namespace Chalkboard {
    namespace trig {
        const arccos: (rad: number) => number | undefined;
        const arccosh: (rad: number) => number | undefined;
        const arccot: (rad: number) => number;
        const arccoth: (rad: number) => number | undefined;
        const arccsc: (rad: number) => number | undefined;
        const arccsch: (rad: number) => number | undefined;
        const arcsec: (rad: number) => number | undefined;
        const arcsech: (rad: number) => number | undefined;
        const arcsin: (rad: number) => number | undefined;
        const arcsinh: (rad: number) => number;
        const arctan: (rad: number) => number;
        const arctanh: (rad: number) => number | undefined;
        const arctan2: (y: number, x: number) => number;
        const cos: (rad: number) => number;
        const cosh: (rad: number) => number;
        const cot: (rad: number) => number;
        const coth: (rad: number) => number;
        const coterminal: (rad: number) => number;
        const csc: (rad: number) => number;
        const csch: (rad: number) => number;
        const sec: (rad: number) => number;
        const sech: (rad: number) => number;
        const sin: (rad: number) => number;
        const sinh: (rad: number) => number;
        const tan: (rad: number) => number;
        const tanh: (rad: number) => number;
        const toDeg: (rad: number) => number;
        const toRad: (deg: number) => number;
    }
}
declare namespace Chalkboard {
    namespace vect {
        const absolute: (vect: ChalkboardVector) => ChalkboardVector;
        const add: (vect1: ChalkboardVector, vect2: ChalkboardVector) => ChalkboardVector;
        const ang: (vect: ChalkboardVector) => number | number[];
        const angBetween: (vect1: ChalkboardVector, vect2: ChalkboardVector) => number;
        const constrain: (vect: ChalkboardVector, range?: [number, number]) => ChalkboardVector;
        const copy: (vect: ChalkboardVector) => ChalkboardVector;
        const cross: (vect1: ChalkboardVector, vect2: ChalkboardVector) => ChalkboardVector;
        const dimension: (vectORvectfield: ChalkboardVector | ChalkboardVectorField) => 2 | 3 | 4;
        const dist: (vect1: ChalkboardVector, vect2: ChalkboardVector) => number;
        const distsq: (vect1: ChalkboardVector, vect2: ChalkboardVector) => number;
        const dot: (vect1: ChalkboardVector, vect2: ChalkboardVector) => number;
        const empty: (dimension: 2 | 3 | 4) => ChalkboardVector;
        const field: (p: string, q: string, r?: string, s?: string) => ChalkboardVectorField;
        const fill: (num: number, dimension: 2 | 3 | 4) => ChalkboardVector;
        const fromAlternateToCartesian: (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical") => ChalkboardVector;
        const fromAngle: (rad1: number, rad2?: number) => ChalkboardVector;
        const fromCartesianToAlternate: (vect: ChalkboardVector, type: "polar" | "bipolar" | "cylindrical" | "spherical") => ChalkboardVector;
        const fromField: (vectfield: ChalkboardVectorField, vect: ChalkboardVector) => ChalkboardVector;
        const fromVector: (vect: ChalkboardVector) => ChalkboardVector;
        const init: (x: number, y: number, z?: number, w?: number) => ChalkboardVector;
        const interp: (vect: ChalkboardVector, a: number, b: number, c?: number, d?: number) => ChalkboardVector;
        const isDimensionEqual: (vect1: ChalkboardVector, vect2: ChalkboardVector) => boolean;
        const isDimensionOf: (vectORvectfield: ChalkboardVector | ChalkboardVectorField, dimension: 2 | 3 | 4) => boolean;
        const isEqual: (vect1: ChalkboardVector, vect2: ChalkboardVector) => boolean;
        const isNormalized: (vect: ChalkboardVector) => boolean;
        const isOrthogonal: (vect1: ChalkboardVector, vect2: ChalkboardVector) => boolean;
        const isParallel: (vect1: ChalkboardVector, vect2: ChalkboardVector) => boolean;
        const isZero: (vect: ChalkboardVector) => boolean;
        const mag: (vect: ChalkboardVector) => number;
        const magset: (vect: ChalkboardVector, num: number) => ChalkboardVector;
        const magsq: (vect: ChalkboardVector) => number;
        const negate: (vect: ChalkboardVector) => ChalkboardVector;
        const normalize: (vect: ChalkboardVector) => ChalkboardVector;
        const oproj: (vect1: ChalkboardVector, vect2: ChalkboardVector) => ChalkboardVector;
        const print: (vect: ChalkboardVector) => void;
        const proj: (vect1: ChalkboardVector, vect2: ChalkboardVector) => ChalkboardVector;
        const random: (inf: number, sup: number, dimension: 2 | 3 | 4) => ChalkboardVector;
        const reciprocate: (vect: ChalkboardVector) => ChalkboardVector;
        const reflect: (vect1: ChalkboardVector, vect2: ChalkboardVector) => ChalkboardVector;
        const refract: (vect1: ChalkboardVector, vect2: ChalkboardVector, refractiveIndex: number) => ChalkboardVector;
        const round: (vect: ChalkboardVector) => ChalkboardVector;
        const scalarQuadruple: (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector, vect4: ChalkboardVector) => number;
        const scalarTriple: (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector) => number;
        const scl: (vect: ChalkboardVector, num: number) => ChalkboardVector;
        const slope: (vect: ChalkboardVector) => number;
        const sub: (vect1: ChalkboardVector, vect2: ChalkboardVector) => ChalkboardVector;
        const toArray: (vect: ChalkboardVector) => [number, number] | [number, number, number] | [number, number, number, number];
        const toComplex: (vect: ChalkboardVector) => ChalkboardComplex;
        const toMatrix: (vect: ChalkboardVector, axis?: 0 | 1) => ChalkboardMatrix;
        const toQuaternion: (vect: ChalkboardVector) => ChalkboardQuaternion;
        const toString: (vect: ChalkboardVector) => string;
        const toTensor: (vect: ChalkboardVector, ...size: number[]) => ChalkboardTensor;
        const vectorQuadruple: (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector, vect4: ChalkboardVector) => ChalkboardVector;
        const vectorTriple: (vect1: ChalkboardVector, vect2: ChalkboardVector, vect3: ChalkboardVector) => ChalkboardVector;
        const zero: (vect: ChalkboardVector) => ChalkboardVector;
    }
}
//# sourceMappingURL=Chalkboard.d.ts.map