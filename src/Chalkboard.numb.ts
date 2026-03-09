/*
    Chalkboard - Number Theory Namespace
    Version 3.0.1 Euler
    Released March 9th, 2026
*/
/*
    This Source Code Form is subject to the terms of the
    Mozilla Public License, v. 2.0. If a copy of the MPL was not distributed
    with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The number theory namespace.
     * @namespace
     */
    export namespace numb {
        /**
         * Returns a random number from a Bernoulli distribution.
         * @param {number} [p=0.5] - Probability value of distribution
         * @returns {number}
         * @example
         * // Probability of flipping a coin heads or tails
         * const bernoulliRandom = Chalkboard.numb.Bernoullian();
         */
        export const Bernoullian = (p: number = 0.5): number => {
            if (typeof p !== "number" || !Number.isFinite(p) || p < 0 || p > 1) throw new Error(`Chalkboard.numb.Bernoullian: Parameter "p" must be a finite number between 0 and 1.`);
            return Math.random() < p ? 1 : 0;
        };

        /**
         * Returns the binomial coefficient for a polynomial.
         * @param {number} n - The degree of the polynomial
         * @param {number} k - The term of the polynomial
         * @returns {number}
         * @example
         * // Returns 35
         * const coeff = Chalkboard.numb.binomial(7, 3);
         */
        export const binomial = (n: number, k: number): number => {
            if (!Number.isInteger(n) || !Number.isInteger(k) || n < 0 || k < 0) throw new Error(`Chalkboard.numb.binomial: Parameters "n" and "k" must be non-negative integers.`);
            if (k < 0 || k > n) return 0;
            if (k === 0 || k === n) return 1;
            if (k === 1 || k === n - 1) return n;
            if (n - k < k) k = n - k;
            let result = n;
            for (let i = 2; i <= k; i++) result *= (n - i + 1) / i;
            return Math.round(result);
        };

        /**
         * Returns the change of two numbers.
         * @param {number} initial - First number
         * @param {number} final - Second number
         * @returns {number}
         * @example
         * // Returns 1 or 100%
         * const change = Chalkboard.numb.change(1, 2);
         */
        export const change = (initial: number, final: number): number => {
            if (typeof initial !== "number" || typeof final !== "number" || !Number.isFinite(initial) || !Number.isFinite(final)) throw new Error(`Chalkboard.numb.change: Parameters "initial" and "final" must be finite numbers.`);
            if (initial === 0) throw new Error(`Chalkboard.numb.change: Parameter "initial" must be non-zero.`);
            return (final - initial) / initial;
        };

        /**
         * Returns the combinatorial combination of two numbers.
         * @param {number} n - First number (total items)
         * @param {number} r - Second number (chosen items)
         * @returns {number}
         * @example
         * // The number of five-card hands possible from a standard fifty-two card deck is 2598960
         * const combine = Chalkboard.numb.combination(52, 5);
         */
        export const combination = (n: number, r: number): number => {
            if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n) throw new Error(`Chalkboard.numb.combination: Parameters "n" and "r" must be integers with 0 <= r <= n.`);
            return Chalkboard.numb.binomial(n, r);
        };

        /**
         * Returns an array of composite numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number[]}
         * @example
         * // Returns the array [4, 6, 8, 9, ... , 996, 998, 999, 1000]
         * const arr = Chalkboard.numb.compositeArr(0, 1000);
         */
        export const compositeArr = (inf: number, sup: number): number[] => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup)) throw new Error(`Chalkboard.numb.compositeArr: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.compositeArr: Parameter "inf" must be less than or equal to "sup".`);
            if (sup < 4) return [];
            const sieve = new Uint8Array(sup + 1);
            for (let p = 2; p * p <= sup; p++) if (sieve[p] === 0) for (let i = p * p; i <= sup; i += p) sieve[i] = 1;
            const result: number[] = [];
            const start = Math.max(4, inf);
            for (let i = start; i <= sup; i++) if (sieve[i] === 1) result.push(i);
            return result;
        };

        /**
         * Returns the number of composite numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 832
         * const composites = Chalkboard.numb.compositeCount(0, 1000);
         */
        export const compositeCount = (inf: number, sup: number): number => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup)) throw new Error(`Chalkboard.numb.compositeCount: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.compositeCount: Parameter "inf" must be less than or equal to "sup".`);
            return Chalkboard.numb.compositeArr(inf, sup).length;
        };

        /**
         * Returns a number constrained within a range.
         * @param {number} num - Number
         * @param {number[]} [range=[0, 1]] - Range
         * @returns {number}
         * @example
         * const n1 = Chalkboard.numb.constrain(2); // Returns 1
         * const n2 = Chalkboard.numb.constrain(1); // Returns 1
         * const n3 = Chalkboard.numb.constrain(0.5); // Returns 0.5
         * const n4 = Chalkboard.numb.constrain(0); // Returns 0
         * const n5 = Chalkboard.numb.constrain(-1); // Returns 0
         */
        export const constrain = (num: number, range: [number, number] = [0, 1]): number => {
            if (typeof num !== "number" || !Number.isFinite(num)) throw new Error(`Chalkboard.numb.constrain: Parameter "num" must be a finite number.`);
            if (!Array.isArray(range) || range.length !== 2 || typeof range[0] !== "number" || typeof range[1] !== "number" || !Number.isFinite(range[0]) || !Number.isFinite(range[1]) || range[0] > range[1]) throw new Error(`Chalkboard.numb.constrain: Parameter "range" must be an array of two finite numbers [min, max] with min <= max.`);
            return Math.max(Math.min(num, range[1]), range[0]);
        };

        /**
         * Converts a number from and to various different measurement units.
         * @param {number | number[]} num - Number or numbers
         * @param {string} from - Original measurement unit
         * @param {string} to - Desired measurement unit
         * @returns {number | number[]}
         * @example
         * const m = cb.numb.convert(1500, "mm", "m"); // Length conversion
         * const sqmi = cb.numb.convert(1000000, "m2", "mi2"); // Area conversion
         * const kg = cb.numb.convert(5000, "g", "kg"); // Mass conversion
         * const ml = cb.numb.convert(3, "gal", "mL"); // Volume conversion
         * const pa = cb.numb.convert(1, "atm", "Pa"); // Pressure conversion
         * const ns = cb.numb.convert(2, "hr", "ns"); // Time conversion
         * const k = cb.numb.convert(98.6, "F", "K"); // Temperature conversion
         */
        export const convert = (num: number | number[], from: string, to: string): number | number[] => {
            if (typeof from !== "string" || typeof to !== "string") throw new Error(`Chalkboard.numb.convert: Parameters "from" and "to" must be strings.`);
            if (Array.isArray(num)) {
                for (let i = 0; i < num.length; i++) if (typeof num[i] !== "number" || !Number.isFinite(num[i])) throw new Error(`Chalkboard.numb.convert: Parameter "num[${i}]" must be a finite number.`);
            } else {
                if (typeof num !== "number" || !Number.isFinite(num)) throw new Error(`Chalkboard.numb.convert: Parameter "num" must be a finite number.`);
            }
            const normalize = (str: string): string => str.trim().replace(/\s+/g, " ");
            const canonicalize = (str: string): string => normalize(str).replace(/\u00B5/g, "μ");
            const ALIASES: Record<string, string> = {
                "NM": "nm", "Nm": "nm", "µm": "μm", "CM": "cm", "Cm": "cm", "M": "m", "KM": "km", "Km": "km", "IN": "in", "In": "in", "FT": "ft", "Ft": "ft", "YD": "yd", "Yd": "yd", "MI": "mi", "Mi": "mi", "NMI": "nmi", "Nmi": "nmi",
                "M2": "m2", "CM2": "cm2", "MM2": "mm2", "KM2": "km2", "FT2": "ft2", "IN2": "in2", "YD2": "yd2", "MI2": "mi2",
                "NG": "ng", "µg": "μg", "MG": "mg", "G": "g", "KG": "kg", "Kg": "kg", "LB": "lb", "Lb": "lb",
                "l": "L", "ml": "mL", "cl": "cL", "dl": "dL", "dal": "daL", "hl": "hL", "kl": "kL", "ul": "uL", "μl": "μL", "µl": "μL", "fl. oz": "fl oz", "fl.oz": "fl oz", "floz": "fl oz", "OZ": "oz", "Oz": "oz",
                "pa": "Pa", "hpa": "hPa", "kpa": "kPa", "mpa": "MPa", "gpa": "GPa", "ATM": "atm", "Atm": "atm", "Torr": "torr", "mmhg": "mmHg",
                "NS": "ns", "US": "μs", "Us": "μs", "µS": "μs", "MS": "ms", "Ms": "ms", "HR": "h", "Hr": "h", "HRS": "h", "Hrs": "h", "YR": "yr", "Yr": "yr", "WK": "wk", "Wk": "wk",
                "c": "C", "°c": "C", "°C": "C", "celsius": "C", "f": "F", "°f": "F", "°F": "F", "fahrenheit": "F", "k": "K", "°k": "K", "°K": "K", "kelvin": "K", "r": "R", "°r": "R", "°R": "R", "rankine": "R"
            };
            const LENGTH: Record<string, number> = {
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
            const AREA: Record<string, number> = {
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
            const MASS: Record<string, number> = {
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
            const VOLUME: Record<string, number> = {
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
            const PRESSURE: Record<string, number> = {
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
            const TIME: Record<string, number> = {
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
            const TEMPERATURE: Record<string, { a: number; b: number; key: string }> = {
                "K": { a: 1, b: 0, key: "K" },
                "C": { a: 1, b: 273.15, key: "C" },
                "F": { a: 5 / 9, b: 273.15 - (32 * 5) / 9, key: "F" },
                "R": { a: 5 / 9, b: 0, key: "R" }
            };
            const TABLE: Array<[string, Record<string, number>]> = [["length", LENGTH], ["area", AREA], ["mass", MASS], ["volume", VOLUME], ["pressure", PRESSURE], ["time", TIME]];
            const resolveFactor = (str: string): { category: string; factor: number; key: string } | undefined => {
                const key = canonicalize(str);
                const alias = ALIASES[key] ?? ALIASES[key.toLowerCase()];
                const candidates: string[] = [];
                candidates.push(key);
                if (alias) candidates.push(alias);
                const shouldTryLower = key.length > 2 || key.includes(" ");
                if (shouldTryLower) candidates.push(key.toLowerCase());
                const seen = new Set<string>();
                const uniq = candidates.filter((c) => (seen.has(c) ? false : (seen.add(c), true)));
                for (const [category, map] of TABLE) {
                    for (const k of uniq) {
                        if (Object.prototype.hasOwnProperty.call(map, k)) return { category, factor: map[k], key: k };
                    }
                }
                return undefined;
            };
            const resolveTemp = (str: string): { a: number; b: number; key: string } | undefined => {
                const raw = canonicalize(str);
                const alias = ALIASES[raw] ?? ALIASES[raw.toLowerCase()];
                const candidates: string[] = [raw];
                if (alias) candidates.push(alias);
                const seen = new Set<string>();
                const uniq = candidates.filter((c) => (seen.has(c) ? false : (seen.add(c), true)));
                for (const k of uniq) if (Object.prototype.hasOwnProperty.call(TEMPERATURE, k)) return TEMPERATURE[k];
                return undefined;
            };
            const apply = (fn: (x: number) => number) => (Array.isArray(num) ? num.map(fn) : fn(num));
            const fromTemp = resolveTemp(from);
            const toTemp = resolveTemp(to);
            if (fromTemp || toTemp) {
                if (!fromTemp) throw new Error(`Chalkboard.numb.convert: Unknown temperature unit: "${from}".`);
                if (!toTemp) throw new Error(`Chalkboard.numb.convert: Unknown temperature unit: "${to}".`);
                const toKelvin = (x: number) => fromTemp.a * x + fromTemp.b;
                const fromKelvin = (k: number) => (k - toTemp.b) / toTemp.a;
                return apply((x) => fromKelvin(toKelvin(x)));
            }
            const fromResolved = resolveFactor(from);
            const toResolved = resolveFactor(to);
            if (!fromResolved) throw new Error(`Chalkboard.numb.convert: Unknown unit: "${from}".`);
            if (!toResolved) throw new Error(`Chalkboard.numb.convert: Unknown unit: "${to}".`);
            if (fromResolved.category !== toResolved.category) throw new Error(`Chalkboard.numb.convert: Incompatible unit conversion: "${from}" (${fromResolved.category}) -> "${to}" (${toResolved.category}).`);
            const factor = fromResolved.factor / toResolved.factor;
            return apply((x) => x * factor);
        };

        /**
         * Returns the divisors of a number.
         * @param {number} num - Number
         * @returns {number[]}
         * @example
         * // Returns the array [1, 2, 4, ... , 250000, 500000, 1000000]
         * const divisors = Chalkboard.numb.divisors(1000000);
         */
        export const divisors = (num: number): number[] => {
            if (!Number.isInteger(num) || num <= 0) throw new Error(`Chalkboard.numb.divisors: Parameter "num" must be a positive integer.`);
            const result: number[] = [];
            const upper = Math.floor(Math.sqrt(num));
            for (let i = 1; i <= upper; i++) {
                if (num % i === 0) {
                    result.push(i);
                    if (i !== num / i) result.push(num / i); 
                }
            }
            return result.sort((a, b) => a - b);
        };

        /**
         * Returns the value of Euler's totient function of a number.
         * @param {number} num - Number greater than 0
         * @returns {number}
         * @example
         * // Returns 4, the number of integers less than or equal to 10 that are coprime to 10
         * const totient = Chalkboard.numb.Euler(10);
         */
        export const Euler = (num: number): number => {
            if (!Number.isInteger(num) || num <= 0) throw new Error(`Chalkboard.numb.Euler: Parameter "num" must be a positive integer.`);
            const primeFactors = Chalkboard.numb.factors(num);
            const uniquePrimes: number[] = [];
            for (let i = 0; i < primeFactors.length; i++) {
                const p = primeFactors[i];
                if (uniquePrimes.indexOf(p) === -1) uniquePrimes.push(p);
            }
            let result = num;
            for (const p of uniquePrimes) result *= (p - 1) / p;
            return Math.round(result);
        };

        /**
         * Returns a random number from an exponential distribution.
         * @param {number} [l=1] - Rate parameter (lambda) of distribution
         * @returns {number}
         * @example
         * // Smaller argument means a more uniform distribution
         * const expRandom = Chalkboard.numb.exponential(0.1);
         */
        export const exponential = (l: number = 1): number => {
            if (typeof l !== "number" || !Number.isFinite(l)) throw new Error(`Chalkboard.numb.exponential: Parameter "l" must be a finite number.`);
            if (l <= 0) throw new Error(`Chalkboard.numb.exponential: Parameter "l" must be positive.`);
            const u = 1 - Math.random();
            return -Math.log(u) / l;
        };

        /**
         * Returns the factorial of a number.
         * @param {number} num - Number
         * @returns {number}
         * @example
         * // Returns 120
         * const factorial = Chalkboard.numb.factorial(5);
         */
        export const factorial = (num: number): number => {
            if (!Number.isInteger(num) || num < 0) throw new Error(`Chalkboard.numb.factorial: Parameter "num" must be a non-negative integer.`);
            let n = 1;
            for (let i = 2; i <= num; i++) n *= i;
            return n;
        };

        /**
         * Returns the prime factors of a number.
         * @param {number} num - Number
         * @returns {number[]}
         * @example
         * // Returns the array [2, 2, 2, 2, 2, 2, 5, 5, 5, 5, 5, 5]
         * const factors = Chalkboard.numb.factors(1000000);
         */
        export const factors = (num: number): number[] => {
            if (!Number.isInteger(num)) throw new Error(`Chalkboard.numb.factors: Parameter "num" must be an integer.`);
            if (num === 0) throw new Error(`Chalkboard.numb.factors: Parameter "num" must be non-zero.`);
            const result: number[] = [];
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
            if (num > 1) result.push(num);
            return result;
        };

        /**
         * Returns the term of the Fibonacci sequence at the inputted index.
         * @param {number} num - Index
         * @returns {number}
         * @example
         * // Returns 55
         * const fibnum = Chalkboard.numb.Fibonacci(10);
         */
        export const Fibonacci = (num: number): number => {
            if (!Number.isInteger(num) || num < 0) throw new Error(`Chalkboard.numb.Fibonacci: Parameter "num" must be a non-negative integer.`);
            if (num === 0) return 0;
            if (num === 1) return 1;
            let a = 0, b = 1;
            for (let i = 2; i <= num; i++) {
                const next = a + b;
                a = b;
                b = next;
            }
            return b;
        };

        /**
         * Returns a random number from a Gaussian (normal) distribution.
         * @param {number} mean - Mean of distribution
         * @param {number} deviation - Standard deviation of distribution (σ > 0)
         * @returns {number}
         * @example
         * // Standard Gaussian distribution
         * const gaussRandom = Chalkboard.numb.Gaussian(0, 1);
         */
        export const Gaussian = (mean: number, deviation: number): number => {
            if (!Number.isFinite(mean) || !Number.isFinite(deviation)) throw new Error(`Chalkboard.numb.Gaussian: Parameters "mean" and "deviation" must be finite numbers.`);
            if (deviation <= 0) throw new Error(`Chalkboard.numb.Gaussian: Parameter "deviation" must be positive.`);
            let u1 = 0;
            while (u1 === 0) u1 = Math.random();
            const u2 = Math.random();
            const z = Chalkboard.real.sqrt(-2 * Chalkboard.real.ln(u1)) * Chalkboard.trig.cos(Chalkboard.PI(2) * u2);
            return mean + z * deviation;
        };

        /**
         * Returns the greatest common divisor of two numbers.
         * @param {number} a - First number
         * @param {number} b - Second number
         * @returns {number}
         * @example
         * // Returns 17
         * const gcd = Chalkboard.numb.gcd(68, 119);
         */
        export const gcd = (a: number, b: number): number => {
            if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error(`Chalkboard.numb.gcd: Parameters "a" and "b" must be integers.`);
            a = Math.abs(a);
            b = Math.abs(b);
            while (b !== 0) {
                const t = a % b;
                a = b;
                b = t;
            }
            return a;
        };

        /**
         * Returns an even number as a sum of two prime numbers.
         * @param {number} num - Even number
         * @returns {[number, number] | undefined}
         * @example
         * // Returns [5, 7]
         * const primes = Chalkboard.numb.Goldbach(12);
         */
        export const Goldbach = (num: number): [number, number] | undefined => {
            if (!Number.isInteger(num) || num < 4 || num % 2 !== 0) throw new Error(`Chalkboard.numb.Goldbach: Parameter "num" must be an even integer greater than or equal to 4.`);
            if (num !== 4) {
                let a = num / 2, b = num / 2;
                if (a % 2 === 0) {
                    a--;
                    b++;
                }
                while (a >= 3) {
                    if (Chalkboard.numb.isPrime(a) && Chalkboard.numb.isPrime(b)) return [a, b];
                    a -= 2;
                    b += 2;
                }
                return undefined;
            } else {
                return [2, 2];
            }
        };

        /**
         * Checks if two numbers are approximately equal.
         * @param {number} a - The first number
         * @param {number} b - The second number
         * @param {number} [precision=0.000001] - The precision to check
         * @returns {boolean}
         * @example
         * // Returns true
         * const approx = Chalkboard.numb.isApproxEqual(0.1 + 0.2, 0.3);
         */
        export const isApproxEqual = (a: number, b: number, precision: number = 0.000001): boolean => {
            if (typeof a !== "number" || typeof b !== "number" || typeof precision !== "number" || !Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(precision) || precision <= 0) throw new Error(`Chalkboard.numb.isApproxEqual: Parameters "a", "b", and "precision" must be finite numbers, and "precision" must be positive.`);
            return Math.abs(a - b) < precision;
        };

        /**
         * Checks if a number is a prime number.
         * @param {number} num - Number
         * @returns {boolean}
         * @example
         * // All of the following return true
         * Chalkboard.numb.isPrime(73939133);
         * Chalkboard.numb.isPrime(7393913);
         * Chalkboard.numb.isPrime(739391);
         * Chalkboard.numb.isPrime(73939);
         * Chalkboard.numb.isPrime(7393);
         * Chalkboard.numb.isPrime(739);
         * Chalkboard.numb.isPrime(73);
         * Chalkboard.numb.isPrime(7);
         */
        export const isPrime = (num: number): boolean => {
            if (typeof num !== "number" || !Number.isInteger(num) || num < 2) return false;
            if (num === 2) return true;
            if (num % 2 === 0) return false;
            for (let i = 3; i * i <= num; i += 2) if (num % i === 0) return false;
            return true;
        };

        /**
         * Checks if a number is rational.
         * @param {number} num - The number to check.
         * @param {number} [tolerance = 1e-8] - Tolerance for approximation (optional, defaults to 1e-8).
         * @returns {boolean}
         * @example
         * const yes = Chalkboard.numb.isRational(0.75); // Returns true
         * const no = Chalkboard.numb.isRational(Chalkboard.PI()); // Returns false
         */
        export const isRational = (num: number, tolerance: number = 1e-8): boolean => {
            if (typeof num !== "number" || !Number.isFinite(num) || typeof tolerance !== "number" || !Number.isFinite(tolerance) || tolerance <= 0) return false;
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
                if (Number.isInteger(Math.sqrt(i))) continue;
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
            } catch {
                return false;
            }
        };

        /**
         * Returns the value of the Kronecker delta function of two numbers (returns 1 if they're equal and 0 otherwise).
         * @param {number} a - First number
         * @param {number} b - Second number
         * @returns {number}
         * @example
         * const yes = Chalkboard.numb.Kronecker(1, 1); // Returns 1
         * const no = Chalkboard.numb.Kronecker(1, 10); // Returns 0
         */
        export const Kronecker = (a: number, b: number): 1 | 0 => {
            if (typeof a !== "number" || typeof b !== "number" || !Number.isFinite(a) || !Number.isFinite(b)) throw new Error(`Chalkboard.numb.Kronecker: Parameters "a" and "b" must be finite numbers.`);
            if (a === b) return 1;
            else return 0;
        };

        /**
         * Returns the least common multiple of two numbers.
         * @param {number} a - First number
         * @param {number} b - Second number
         * @returns {number}
         * @example
         * // Returns 12
         * const lcm = Chalkboard.numb.lcm(4, 6);
         */
        export const lcm = (a: number, b: number): number => {
            if (!Number.isInteger(a) || !Number.isInteger(b)) throw new Error(`Chalkboard.numb.lcm: Parameters "a" and "b" must be integers.`);
            if (a === 0 || b === 0) return 0;
            return Math.abs(a / Chalkboard.numb.gcd(a, b) * b);
        };

        /**
         * Returns the proportional mapping of a number from one range to another.
         * @param {number} num - Number
         * @param {number[]} range1 - First range
         * @param {number[]} range2 - Second range
         * @returns {number}
         * @example
         * // Returns 0.92
         * const map = Chalkboard.numb.map(23, [0, 25], [0, 1]);
         */
        export const map = (num: number, range1: number[], range2: number[]): number => {
            if (!Array.isArray(range1) || !Array.isArray(range2)) throw new Error(`Chalkboard.numb.map: Parameters "range1" and "range2" must be arrays.`);
            if (range1.length !== 2 || range2.length !== 2) throw new Error(`Chalkboard.numb.map: Parameters "range1" and "range2" must be arrays of length 2.`);
            if (typeof num !== "number" || !Number.isFinite(num)) throw new Error(`Chalkboard.numb.map: Parameter "num" must be a finite number.`);
            if (typeof range1[0] !== "number" || typeof range1[1] !== "number" || !Number.isFinite(range1[0]) || !Number.isFinite(range1[1]) || range1[0] >= range1[1]) throw new Error(`Chalkboard.numb.map: Parameter "range1" must be an array of two finite numbers [min, max] with min < max.`);
            if (typeof range2[0] !== "number" || typeof range2[1] !== "number" || !Number.isFinite(range2[0]) || !Number.isFinite(range2[1]) || range2[0] > range2[1]) throw new Error(`Chalkboard.numb.map: Parameter "range2" must be an array of two finite numbers [min, max] with min <= max.`);
            return range2[0] + (range2[1] - range2[0]) * ((num - range1[0]) / (range1[1] - range1[0]));
        };

        /**
         * Calculates the mathematically correct modulo of a mod b.
         * @param {number} a - Number
         * @param {number} b - Number
         * @returns {number}
         * @example
         * // Returns -1 (instead of 2, which is what 5 % -3 would return)
         * const mod = Chalkboard.numb.mod(5, -3);
         */
        export const mod = (a: number, b: number): number => {
            if (typeof a !== "number" || typeof b !== "number" || !Number.isFinite(a) || !Number.isFinite(b)) throw new Error(`Chalkboard.numb.mod: Parameters "a" and "b" must be finite numbers.`);
            if (b === 0) throw new Error(`Chalkboard.numb.mod: Parameter "b" must be non-zero.`);
            return ((a % b) + b) % b;
        };

        /**
         * Returns the product of a sequence.
         * @param {(n: number) => number} formula - Sequence written in product notation
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 120
         * const mul = Chalkboard.numb.mul((n) => n + 1, 0, 5);
         */
        export const mul = (formula: (n: number) => number, inf: number, sup: number): number => {
            if (typeof formula !== "function") throw new Error(`Chalkboard.numb.mul: Parameter "formula" must be a function.`);
            if (!Number.isInteger(inf) || !Number.isInteger(sup)) throw new Error(`Chalkboard.numb.mul: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.mul: Parameter "inf" must be less than or equal to "sup".`);
            let result = 1;
            for (let i = inf; i <= sup; i++) result *= formula(i);
            return result;
        };

        /**
         * Returns the prime number that succeeds the inputted number.
         * @param {number} num - Number
         * @returns {number}
         * @example
         * // Returns 541
         * const prime = Chalkboard.numb.nextPrime(523);
         */
        export const nextPrime = (num: number): number => {
            if (!Number.isFinite(num)) throw new Error(`Chalkboard.numb.nextPrime: Parameter "num" must be finite.`);
            let result = Math.floor(num) + 1;
            if (result <= 2) return 2;
            if (result % 2 === 0) result++;
            while (!Chalkboard.numb.isPrime(result)) result += 2;
            return result;
        };

        /**
         * Returns the combinatorial permutation of two numbers.
         * @param {number} n - First number (total items)
         * @param {number} r - Second number (chosen items)
         * @returns {number}
         * @example
         * // The number of different ways to arrange the word "MATH" is 24
         * const permute = Chalkboard.numb.permutation(4, 4);
         */
        export const permutation = (n: number, r: number): number => {
            if (!Number.isInteger(n) || !Number.isInteger(r) || n < 0 || r < 0 || r > n) throw new Error(`Chalkboard.numb.permutation: Parameters "n" and "r" must be integers with 0 <= r <= n.`);
            let result = 1;
            for (let i = n; i > n - r; i--) result *= i;
            return Math.round(result);
        };

        /**
         * Returns a random number from a Poisson distribution.
         * @param {number} [l=1] - Rate parameter (lambda) of distribution
         * @returns {number}
         * @example
         * // Smaller argument means a less uniform distribution
         * const poissonRandom = Chalkboard.numb.Poissonian(0.5);
         */
        export const Poissonian = (l: number = 1): number => {
            if (typeof l !== "number" || !Number.isFinite(l)) throw new Error(`Chalkboard.numb.Poissonian: Parameter "l" must be a finite number.`);
            if (l <= 0) throw new Error(`Chalkboard.numb.Poissonian: Parameter "l" must be positive.`);
            const L = Chalkboard.E(-l);
            let p = 1, k = 0;
            for (; p > L; ++k) p *= Math.random();
            return k - 1;
        };

        /**
         * Returns the nth prime number.
         * @param {number} num - The "n" in "nth prime number" (the index of the prime number in the set of all prime numbers)
         * @returns {number}
         * @example
         * // The 100th prime number is 523
         * const prime = Chalkboard.numb.prime(100);
         */
        export const prime = (num: number): number => {
            if (!Number.isInteger(num) || num < 1) throw new Error(`Chalkboard.numb.prime: Parameter "num" must be a positive integer.`);
            if (num === 1) return 2;
            let count = 1;
            let p = 3;
            while (true) {
                if (Chalkboard.numb.isPrime(p)) {
                    count++;
                    if (count === num) return p;
                }
                p += 2;
            }
        };

        /**
         * Returns an array of prime numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number[]}
         * @example
         * // Returns the array [2, 3, 5, ... , 983, 991, 997]
         * const arr = Chalkboard.numb.primeArr(0, 1000);
         */
        export const primeArr = (inf: number, sup: number): number[] => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup)) throw new Error(`Chalkboard.numb.primeArr: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.primeArr: Parameter "inf" must be less than or equal to "sup".`);
            if (sup < 2) return [];
            const sieve = new Uint8Array(sup + 1);
            sieve[0] = 1; 
            sieve[1] = 1;
            for (let p = 2; p * p <= sup; p++) if (sieve[p] === 0) for (let i = p * p; i <= sup; i += p) sieve[i] = 1;
            const result: number[] = [];
            const start = Math.max(2, inf);
            for (let i = start; i <= sup; i++) if (sieve[i] === 0) result.push(i);
            return result;
        };

        /**
         * Returns the number of prime numbers between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 169
         * const primes = Chalkboard.numb.primeCount(0, 1000);
         */
        export const primeCount = (inf: number, sup: number): number => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup)) throw new Error(`Chalkboard.numb.primeCount: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.primeCount: Parameter "inf" must be less than or equal to "sup".`);
            return Chalkboard.numb.primeArr(inf, sup).length;
        };

        /**
         * Returns the largest prime gap between the lower and upper bounds.
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns 8, the largest prime gap between 1 and 100
         * const gap = Chalkboard.numb.primeGap(1, 100);
         */
        export const primeGap = (inf: number, sup: number): number => {
            if (!Number.isInteger(inf) || !Number.isInteger(sup)) throw new Error(`Chalkboard.numb.primeGap: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.primeGap: Parameter "inf" must be less than or equal to "sup".`);
            let prime: number | null = null;
            let gap = 0;
            for (let i = inf; i <= sup; i++) if (Chalkboard.numb.isPrime(i)) {
                if (prime !== null) {
                    const temp = i - prime;
                    if (temp > gap) gap = temp;
                }
                prime = i;
            }
            return gap;
        };

        /**
         * Returns a random number from a uniform distribution.
         * @param {number} [inf=0] - Lower bound of distribution
         * @param {number} [sup=1] - Upper bound of distribution
         * @returns {number}
         * @example
         * // Random number between -1 and 1
         * const random = Chalkboard.numb.random(-1, 1);
         */
        export const random = (inf: number = 0, sup: number = 1): number => {
            if (typeof inf !== "number" || typeof sup !== "number" || !Number.isFinite(inf) || !Number.isFinite(sup)) throw new Error(`Chalkboard.numb.random: Parameters "inf" and "sup" must be finite numbers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.random: Parameter "inf" must be less than or equal to "sup".`);
            return inf + (sup - inf) * Math.random();
        };

        /**
         * Rounds a number to the nearest positional notation index (or the nearest place value).
         * @param {number} num - Number
         * @param {number} positionalIndex - The positional notation index (or place value)
         * @returns {number}
         * @example
         * // Returns 1240
         * const rounded = Chalkboard.numb.roundTo(1237, 10);
         */
        export const roundTo = (num: number, positionalIndex: number): number => {
            if (!Number.isFinite(num) || !Number.isFinite(positionalIndex)) throw new Error(`Chalkboard.numb.roundTo: Parameters must be finite numbers.`);
            if (positionalIndex === 0) throw new Error(`Chalkboard.numb.roundTo: Parameter "positionalIndex" must be non-zero.`);
            return Math.round(num / positionalIndex) * positionalIndex;
        };

        /**
         * Returns the sign of a number.
         * @param {number} num - Number
         * @returns {-1 | 0 | 1 | undefined}
         * @example
         * const pos = Chalkboard.numb.sgn(19); // Returns 1
         * const zero = Chalkboard.numb.sgn(0); // Returns 0
         * const neg = Chalkboard.numb.sgn(-5); // Returns -1
         */
        export const sgn = (num: number): -1 | 0 | 1 | undefined => {
            if (Number.isNaN(num)) return undefined;
            if (!Number.isFinite(num)) throw new Error(`Chalkboard.numb.sgn: Parameter "num" must be a finite number.`);
            if (num > 0) return 1;
            else if (num < 0) return -1;
            else return 0;
        };

        /**
         * Returns the summation of a sequence.
         * @param {(n: number) => number} formula - Sequence written in summation notation
         * @param {number} inf - Lower bound
         * @param {number} sup - Upper bound
         * @returns {number}
         * @example
         * // Returns almost π²/6
         * const sum = Chalkboard.numb.sum((n) => 1 / (n * n), 0, 1000);
         */
        export const sum = (formula: (n: number) => number, inf: number, sup: number): number => {
            if (typeof formula !== "function") throw new Error(`Chalkboard.numb.sum: Parameter "formula" must be a function.`);
            if (!Number.isInteger(inf) || !Number.isInteger(sup)) throw new Error(`Chalkboard.numb.sum: Parameters "inf" and "sup" must be integers.`);
            if (inf > sup) throw new Error(`Chalkboard.numb.sum: Parameter "inf" must be less than or equal to "sup".`);
            let result = 0;
            for (let i = inf; i <= sup; i++) result += formula(i);
            return result;
        };

        /**
         * Converts a decimal number to binary representation (base 2).
         * @param {number} num - The decimal number
         * @param {boolean} [prefix=false] - Whether to include "0b" prefix (optional, defaults to false)
         * @returns {string}
         * @example
         * const bin1 = Chalkboard.numb.toBinary(10); // Returns "1010"
         * const bin2 = Chalkboard.numb.toBinary(10, true); // Returns "0b1010"
         */
        export const toBinary = (num: number, prefix: boolean = false): string => {
            if (!Number.isInteger(num)) throw new Error(`Chalkboard.numb.toBinary: Parameter "num" must be an integer.`);
            const sign = num < 0 ? "-" : "";
            const digits = Math.abs(num).toString(2);
            return sign + (prefix ? "0b" : "") + digits;
        };

        /**
         * Converts a number from a specified base to decimal (base 10).
         * @param {string} num - The string representation of the number in the specified base
         * @param {number} base - The base (2-36) of the number
         * @returns {number}
         * @example
         * const dec1 = Chalkboard.numb.toDecimal("1010", 2); // Returns 10
         * const dec2 = Chalkboard.numb.toDecimal("1a", 16); // Returns 26
         * const dec3 = Chalkboard.numb.toDecimal("0x2a", 16); // Returns 42
         */
        export const toDecimal = (num: string, base: number): number => {
            if (typeof num !== "string") throw new Error(`Chalkboard.numb.toDecimal: Parameter "num" must be a string.`);
            if (!Number.isInteger(base) || base < 2 || base > 36) throw new Error(`Chalkboard.numb.toDecimal: Parameter "base" must be an integer between 2 and 36.`);
            num = num.toLowerCase().trim();
            const isNegative = num.startsWith("-");
            if (isNegative) num = num.substring(1);
            if (base === 2 && num.startsWith("0b")) num = num.substring(2);
            if (base === 8 && num.startsWith("0o")) num = num.substring(2);
            if (base === 16 && num.startsWith("0x")) num = num.substring(2);
            if (num.length === 0) throw new Error(`Chalkboard.numb.toDecimal: Parameter "num" must contain digits.`);
            const chars = "0123456789abcdefghijklmnopqrstuvwxyz".substring(0, base);
            for (const char of num) if (!chars.includes(char)) throw new Error(`Chalkboard.numb.toDecimal: Invalid character "${char}" for base ${base}.`);
            const result = parseInt(num, base);
            if (!Number.isFinite(result)) throw new Error(`Chalkboard.numb.toDecimal: Failed to parse "num".`);
            return isNegative ? -result : result;
        };

        /**
         * Converts a decimal to a fraction which is represented as an array of its numerator and denominator.
         * @param {number} num - The decimal number
         * @param {number} [tolerance = 1e-8] - The tolerance of the approximation algorithm (optional, defaults to 1e-8)
         * @returns {[number, number]}
         * @example
         * // Returns [-5, 4]
         * const fraction = Chalkboard.numb.toFraction(-1.25);
         */
        export const toFraction = (num: number, tolerance: number = 1e-8): [number, number] => {
            if (typeof num !== "number" || typeof tolerance !== "number") throw new Error(`Chalkboard.numb.toFraction: Parameters "num" and "tolerance" must be numbers.`);
            if (!Number.isFinite(num)) throw new Error(`Chalkboard.numb.toFraction: The parameter "num" must be finite to be converted to a fraction.`);
            if (!Number.isFinite(tolerance) || tolerance <= 0) throw new Error(`Chalkboard.numb.toFraction: The parameter "tolerance" must be a positive finite number.`);
            const sign = Chalkboard.numb.sgn(num);
            if (sign === undefined) throw new Error(`Chalkboard.numb.toFraction: The parameter "num" must be a valid number to be converted to a fraction.`);
            const x = Math.abs(num);
            if (Number.isInteger(x)) return [sign * x, 1];
            let h1 = 1, h2 = 0, k1 = 0, k2 = 1;
            let b = x;
            const MAX_ITER = 10000;
            for (let iter = 0; iter < MAX_ITER; iter++) {
                const a = Math.floor(b);
                const h = a * h1 + h2;
                const k = a * k1 + k2;
                if (k === 0) break;
                const approx = h / k;
                if (Math.abs(x - approx) < tolerance) {
                    const g = Chalkboard.numb.gcd(h, k);
                    return [sign * (h / g), k / g];
                }
                h2 = h1; h1 = h;
                k2 = k1; k1 = k;
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

        /**
         * Converts a decimal number to hexadecimal representation (base 16).
         * @param {number} num - The decimal number
         * @param {boolean} [prefix=false] - Whether to include "0x" prefix (optional, defaults to false)
         * @param {boolean} [uppercase=false] - Whether to use uppercase letters (optional, defaults to false)
         * @returns {string}
         * @example
         * const hex1 = Chalkboard.numb.toHexadecimal(26); // Returns "1a"
         * const hex2 = Chalkboard.numb.toHexadecimal(26, true, true); // Returns "0x1A"
         */
        export const toHexadecimal = (num: number, prefix: boolean = false, uppercase: boolean = false): string => {
            if (!Number.isInteger(num)) throw new Error(`Chalkboard.numb.toHexadecimal: The parameter "num" must be an integer.`);
            const sign = num < 0 ? "-" : "";
            let digits = Math.abs(num).toString(16);
            if (uppercase) digits = digits.toUpperCase();
            return sign + (prefix ? "0x" : "") + digits;
        };

        /**
         * Converts a decimal number to octal representation (base 8).
         * @param {number} num - The decimal number
         * @param {boolean} [prefix=false] - Whether to include "0o" prefix (optional, defaults to false)
         * @returns {string}
         * @example
         * const oct1 = Chalkboard.numb.toOctal(10); // Returns "12"
         * const oct2 = Chalkboard.numb.toOctal(10, true); // Returns "0o12"
         */
        export const toOctal = (num: number, prefix: boolean = false): string => {
            if (!Number.isInteger(num)) throw new Error(`Chalkboard.numb.toOctal: The parameter "num" must be an integer.`);
            const sign = num < 0 ? "-" : "";
            const digits = Math.abs(num).toString(8);
            return sign + (prefix ? "0o" : "") + digits;
        };
    }
}
