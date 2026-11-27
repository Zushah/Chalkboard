/*
 * Chalkboard v3.1.0 Ricci - Plotting Namespace
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/// <reference path="Chalkboard.ts"/>
namespace Chalkboard {
    /**
     * The plotting namespace
     * @namespace
     */
    export namespace plot {
        /** @ignore */
        const getContext = (): CanvasRenderingContext2D => {
            try {
                return Function('"use strict"; return (' + Chalkboard.CONTEXT + ')')() as CanvasRenderingContext2D;
            } catch (e) {
                throw new Error(`Chalkboard.plot.getContext: Cannot initialize canvas context. Make sure an HTML <canvas> element exists in the webpage before using Chalkboard.plot functions.`);
            }
        };

        /** @ignore */
        const $ = <T extends { x?: number; y?: number; size?: number; strokeStyle?: string; lineWidth?: number; context?: CanvasRenderingContext2D }, D extends Partial<T>>(config?: T, defaults?: D, palette?: { name: string; keys: unknown[]; parts?: number; part?: number; styles?: ("stroke" | "fill")[]; fillAlpha?: number }): T & D & { x: number; y: number; size: number; strokeStyle: string; lineWidth: number; context: CanvasRenderingContext2D; paletteSlot?: number } => {
            const ctx = (config?.context ?? defaults?.context ?? getContext()) as CanvasRenderingContext2D;
            const configMap = (config ?? {}) as Record<string, unknown>;
            const defaultsMap = { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2, size: 1, strokeStyle: "black", lineWidth: 2, context: ctx, ...((defaults ?? {}) as Record<string, unknown>) } as Record<string, unknown>;
            const merged = {} as Record<string, unknown>;
            const keys = new Set([...Object.keys(defaultsMap), ...Object.keys(configMap)]);
            for (const key of keys) merged[key] = configMap[key] ?? defaultsMap[key];
            merged.context = ctx;
            merged.x = (merged.x ?? ctx.canvas.width / 2) as number;
            merged.y = (merged.y ?? ctx.canvas.height / 2) as number;
            merged.size = ((merged.size ?? 1) as number) / 100;
            if (palette !== undefined && $active !== null) {
                const styles = palette.styles ?? ["stroke"];
                const missing = styles.filter((style) => configMap[style === "stroke" ? "strokeStyle" : "fillStyle"] === null || configMap[style === "stroke" ? "strokeStyle" : "fillStyle"] === undefined);
                if (missing.length > 0) {
                    const slot = $slot(palette.name, palette.keys, palette.parts ?? 1);
                    if (slot !== null) {
                        const k = slot + (palette.part ?? 0);
                        for (const style of missing) {
                            if (style === "stroke") merged.strokeStyle = Chalkboard.plot.colorpalette($active, k);
                            else merged.fillStyle = Chalkboard.plot.colorpalette($active, k, palette.fillAlpha ?? 1);
                        }
                        merged.paletteSlot = slot;
                    }
                }
            }
            return merged as T & D & { x: number; y: number; size: number; strokeStyle: string; lineWidth: number; context: CanvasRenderingContext2D; paletteSlot?: number };
        };

        /** @ignore */
        const $path = (context: CanvasRenderingContext2D, points: [number, number, boolean][], values: number[] | null, colormap: string | string[] | undefined, colorrange: [number, number] | undefined, caller: string): void => {
            if (colormap === undefined || values === null) {
                context.beginPath();
                for (let k = 0; k < points.length; k++) {
                    if (points[k][2]) context.moveTo(points[k][0], points[k][1]);
                    else context.lineTo(points[k][0], points[k][1]);
                }
                context.stroke();
                return;
            }
            const color = $gradient(values, colormap, colorrange, caller);
            context.lineCap = "round";
            for (let k = 1; k < points.length; k++) {
                if (points[k][2]) continue;
                const value = (values[k - 1] + values[k]) / 2;
                if (!Number.isFinite(value)) continue;
                context.strokeStyle = color(value);
                context.beginPath();
                context.moveTo(points[k - 1][0], points[k - 1][1]);
                context.lineTo(points[k][0], points[k][1]);
                context.stroke();
            }
        };

        // The eight sampled color maps come from Matplotlib's color maps, sampled at 52 evenly spaced points.
        // viridis, plasma, inferno, and magma are by Stéfan van der Walt and Nathaniel J. Smith, with viridis by Eric Firing.
        // cividis is by Jamie R. Nuñez, Christopher R. Anderton, and Ryan S. Renslow.
        // turbo is by Anton Mikhailov.
        // twilight is by Bastian Bechtold.
        // coolwarm is by Kenneth Moreland.
        // The tab10 palette is Matplotlib's default color cycle, chartjs is Chart.js's default palette, and okabeito is by Masataka Okabe and Kei Ito.
        /** @ignore */
        const $colors: { colormaps: { [name: string]: string[] }; colorpalettes: { [name: string]: string[] } } = {
            colormaps: {
                viridis: [
                    "#440154", "#46085c", "#471063", "#481769", "#481d6f", "#482475", "#472a7a", "#46307e", "#453781", "#433d84", "#414287", "#3f4889", "#3d4e8a",
                    "#3a538b", "#38598c", "#355e8d", "#33638d", "#31688e", "#2e6d8e", "#2c718e", "#2a768e", "#297b8e", "#27808e", "#25848e", "#23898e", "#218e8d",
                    "#20928c", "#1f978b", "#1e9c89", "#1fa188", "#21a585", "#24aa83", "#28ae80", "#2eb37c", "#35b779", "#3dbc74", "#46c06f", "#50c46a", "#5ac864",
                    "#65cb5e", "#70cf57", "#7cd250", "#89d548", "#95d840", "#a2da37", "#b0dd2f", "#bddf26", "#cae11f", "#d8e219", "#e5e419", "#f1e51d", "#fde725"
                ],
                plasma: [
                    "#0d0887", "#1b068d", "#260591", "#2f0596", "#38049a", "#41049d", "#4903a0", "#5102a3", "#5901a5", "#6100a7", "#6900a8", "#7100a8", "#7801a8",
                    "#8004a8", "#8707a6", "#8e0ca4", "#9511a1", "#9c179e", "#a21d9a", "#a82296", "#ae2892", "#b42e8d", "#ba3388", "#bf3984", "#c43e7f", "#c9447a",
                    "#cd4a76", "#d24f71", "#d6556d", "#da5b69", "#de6164", "#e26660", "#e66c5c", "#e97257", "#ed7953", "#f07f4f", "#f3854b", "#f58c46", "#f79342",
                    "#f99a3e", "#fba139", "#fca835", "#fdaf31", "#feb72d", "#febe2a", "#fdc627", "#fcce25", "#fbd724", "#f8df25", "#f6e826", "#f3f027", "#f0f921"
                ],
                inferno: [
                    "#000004", "#02020c", "#050417", "#0a0722", "#10092d", "#160b39", "#1e0c45", "#260c51", "#2f0a5b", "#380962", "#400a67", "#490b6a", "#510e6c",
                    "#59106e", "#61136e", "#69166e", "#71196e", "#781c6d", "#801f6c", "#88226a", "#902568", "#982766", "#a02a63", "#a82e5f", "#b0315b", "#b73557",
                    "#bf3952", "#c63d4d", "#cc4248", "#d34743", "#d94d3d", "#df5337", "#e45a31", "#e9612b", "#ed6925", "#f1711f", "#f47918", "#f78212", "#f98b0b",
                    "#fa9407", "#fb9d07", "#fca60c", "#fcb014", "#fbba1f", "#fac42a", "#f8cd37", "#f6d746", "#f4e156", "#f2ea69", "#f2f27d", "#f5f992", "#fcffa4"
                ],
                magma: [
                    "#000004", "#02020b", "#050416", "#090720", "#0e0b2b", "#140e36", "#1a1042", "#21114e", "#29115a", "#311165", "#390f6e", "#420f75", "#4a1079",
                    "#52137c", "#5a167e", "#621980", "#6a1c81", "#721f81", "#792282", "#812581", "#892881", "#912b81", "#992d80", "#a1307e", "#aa337d", "#b2357b",
                    "#ba3878", "#c23b75", "#ca3e72", "#d2426f", "#d9466b", "#e04c67", "#e75263", "#ec5860", "#f1605d", "#f4695c", "#f7725c", "#f97b5d", "#fb8560",
                    "#fc8e64", "#fd9869", "#fea16e", "#feaa74", "#feb47b", "#febd82", "#fec68a", "#fecf92", "#fed89a", "#fde2a3", "#fdebac", "#fcf4b6", "#fcfdbf"
                ],
                cividis: [
                    "#00224e", "#002656", "#002a5f", "#002d68", "#003070", "#083370", "#163770", "#203a6f", "#273e6e", "#2e416d", "#34456c", "#3a486c", "#3f4c6c",
                    "#444f6c", "#49536c", "#4e566c", "#535a6d", "#575d6d", "#5c616e", "#60646f", "#656870", "#696b71", "#6d6f72", "#727274", "#767676", "#7a7a78",
                    "#7e7d78", "#838179", "#888578", "#8d8878", "#928c78", "#969077", "#9b9476", "#a09875", "#a59c74", "#aaa073", "#afa471", "#b5a86f", "#baac6d",
                    "#bfb06b", "#c4b468", "#c9b965", "#cfbd62", "#d4c15f", "#dac65b", "#dfca57", "#e5cf52", "#ead34c", "#f0d846", "#f6dd3f", "#fce236", "#fee838"
                ],
                turbo: [
                    "#30123b", "#36215f", "#3b2f80", "#3f3e9c", "#424bb5", "#4559cb", "#4666dd", "#4773eb", "#4680f6", "#458cfd", "#4099ff", "#38a5fb", "#2fb2f4",
                    "#27bee9", "#1fc9dd", "#1ad4d0", "#18ddc2", "#1ae4b6", "#22ebaa", "#2ff19b", "#3ff68a", "#52fa7a", "#65fd69", "#79fe59", "#8bff4b", "#9cfe40",
                    "#a9fb39", "#b7f735", "#c3f134", "#d0ea34", "#dbe236", "#e5d938", "#eecf3a", "#f5c53a", "#faba39", "#fdae35", "#fea130", "#fe932a", "#fc8423",
                    "#f9751d", "#f46617", "#ef5811", "#e84b0c", "#e14109", "#d83706", "#ce2d04", "#c32503", "#b71d02", "#a91601", "#9b0f01", "#8b0902", "#7a0403"
                ],
                coolwarm: [
                    "#3b4cc0", "#4055c8", "#465ecf", "#4c66d6", "#536edd", "#5977e3", "#5f7fe8", "#6687ed", "#6c8ff1", "#7396f5", "#7a9df8", "#81a4fb", "#88abfd",
                    "#8fb1fe", "#96b7ff", "#9dbdff", "#a3c2fe", "#aac7fd", "#b1cbfc", "#b7cff9", "#bed2f6", "#c4d5f3", "#cad8ef", "#cfdaea", "#d5dbe5", "#dadce0",
                    "#dfdbd9", "#e4d9d2", "#e9d5cb", "#edd2c3", "#f0cdbb", "#f2c9b4", "#f5c4ac", "#f6bea4", "#f7b89c", "#f7b194", "#f7aa8c", "#f6a385", "#f59c7d",
                    "#f39475", "#f08b6e", "#ed8366", "#e97a5f", "#e57058", "#e16751", "#dc5d4a", "#d65244", "#d0473d", "#ca3b37", "#c32e31", "#bb1b2c", "#b40426"
                ],
                twilight: [
                    "#e2d9e2", "#dcd9df", "#d2d5db", "#c5cfd5", "#b6c8cf", "#a7c0cb", "#99b8c8", "#8cafc5", "#80a5c3", "#779dc2", "#6e92c0", "#6888be", "#647dbc",
                    "#6172ba", "#6067b6", "#5f5bb2", "#5e4fac", "#5e43a5", "#5c389d", "#5a2b90", "#562182", "#4f1972", "#471461", "#3f1251", "#371144", "#32123a",
                    "#331237", "#3a113a", "#43123e", "#4f1444", "#5c1749", "#691a4d", "#761f4f", "#832550", "#8e2c50", "#983550", "#a03e50", "#a94950", "#b15452",
                    "#b75f55", "#bc6b59", "#c1775f", "#c58468", "#c89073", "#ca9c80", "#cda88f", "#d1b4a0", "#d5bfb1", "#d9c9c2", "#ddd1d1", "#e0d7db", "#e2d9e2"
                ],
                grayscale: ["#000000", "#ffffff"],
                hsv: ["#ff0000", "#ffff00", "#00ff00", "#00ffff", "#0000ff", "#ff00ff", "#ff0000"]
            },
            colorpalettes: {
                tab10: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
                chartjs: ["#36a2eb", "#ff6384", "#ff9f40", "#ffcd56", "#4bc0c0", "#9966ff", "#c9cbcf"],
                okabeito: ["#000000", "#e69f00", "#56b4e9", "#009e73", "#f0e442", "#0072b2", "#d55e00", "#cc79a7"]
            }
        };

        /** @ignore */
        const $rgb = (color: unknown, caller: string): [number, number, number] => {
            if (typeof color === "string") {
                const hex = /^#([0-9a-fA-F]{6})$/.exec(color);
                if (hex) {
                    const n = parseInt(hex[1], 16);
                    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
                }
                const fn = /^rgb\((\d{1,3}), *(\d{1,3}), *(\d{1,3})\)$/.exec(color) ?? /^rgba\((\d{1,3}), *(\d{1,3}), *(\d{1,3}), *(?:\d+(?:\.\d*)?|\.\d+)\)$/.exec(color);
                if (fn) {
                    const rgb: [number, number, number] = [Number(fn[1]), Number(fn[2]), Number(fn[3])];
                    if (rgb[0] <= 255 && rgb[1] <= 255 && rgb[2] <= 255) return rgb;
                }
            }
            throw new Error(`${caller}: Colors must be strings of the form "#rrggbb" or "rgb(r, g, b)".`);
        };

        /** @ignore */
        const $stops = (map: unknown, caller: string, name: string): [number, number, number][] => {
            if (typeof map === "string" && Object.prototype.hasOwnProperty.call($colors.colormaps, map)) return $colors.colormaps[map].map((color) => $rgb(color, caller));
            if (Array.isArray(map) && map.length >= 2) return map.map((color) => $rgb(color, caller));
            throw new Error(`${caller}: ${name} must be "viridis", "plasma", "inferno", "magma", "cividis", "turbo", "coolwarm", "twilight", "grayscale", "hsv", or an array of at least two colors.`);
        };

        /** @ignore */
        const $swatches = (palette: unknown, caller: string, name: string): [number, number, number][] => {
            if (typeof palette === "string" && Object.prototype.hasOwnProperty.call($colors.colorpalettes, palette)) return $colors.colorpalettes[palette].map((color) => $rgb(color, caller));
            if (Array.isArray(palette) && palette.length >= 1) return palette.map((color) => $rgb(color, caller));
            throw new Error(`${caller}: ${name} must be "tab10", "chartjs", "okabeito", or an array of at least one color.`);
        };

        /** @ignore */
        const $interpolate = (stops: [number, number, number][], value: number, range: [number, number]): [number, number, number] => {
            const n = stops.length;
            let s = range[0] === range[1] ? 0 : (value - range[0]) / (range[1] - range[0]);
            s = Math.min(1, Math.max(0, s));
            const p = s * (n - 1), i = Math.min(Math.floor(p), n - 2), f = p - i;
            return [
                Math.round(stops[i][0] + f * (stops[i + 1][0] - stops[i][0])),
                Math.round(stops[i][1] + f * (stops[i + 1][1] - stops[i][1])),
                Math.round(stops[i][2] + f * (stops[i + 1][2] - stops[i][2]))
            ];
        };

        /** @ignore */
        const $format = (rgb: [number, number, number], alpha: number): string => alpha === 1 ? `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})` : `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;

        /** @ignore */
        const $range = (colorrange: unknown, caller: string): [number, number] | undefined => {
            if (colorrange === undefined) return undefined;
            if (!Array.isArray(colorrange) || colorrange.length !== 2 || !Number.isFinite(colorrange[0]) || !Number.isFinite(colorrange[1])) throw new Error(`${caller}: Property "config.colorrange" must be an array of two finite numbers.`);
            return [colorrange[0], colorrange[1]];
        };

        /** @ignore */
        const $gradient = (values: number[], colormap: string | string[], colorrange: [number, number] | undefined, caller: string): ((value: number) => string) => {
            const stops = $stops(colormap, caller, 'Property "config.colormap"');
            let range = colorrange;
            if (range === undefined) {
                let lo = Infinity, hi = -Infinity;
                for (let k = 0; k < values.length; k++) {
                    if (!Number.isFinite(values[k])) continue;
                    lo = Math.min(lo, values[k]);
                    hi = Math.max(hi, values[k]);
                }
                range = lo <= hi ? [lo, hi] : [0, 1];
            }
            const bounds = range;
            return (value: number): string => $format($interpolate(stops, value, bounds), 1);
        };

        /** @ignore */
        const $colorby = (config: { colormap?: unknown; colorby?: unknown; colorrange?: unknown }, fallback: "x" | "y" | "t" | "magnitude", caller: string): ((x: number, y: number, t: number, magnitude?: number) => number) | null => {
            const by = config.colorby ?? fallback;
            if (by !== "x" && by !== "y" && by !== "t" && by !== "magnitude" && typeof by !== "function") throw new Error(`${caller}: Property "config.colorby" must be "x", "y", "t", "magnitude", or a function.`);
            $range(config.colorrange, caller);
            if (config.colormap === undefined || config.colormap === null) return null;
            $stops(config.colormap, caller, 'Property "config.colormap"');
            if (by === "x") return (x: number) => x;
            if (by === "y") return (x: number, y: number) => y;
            if (by === "t") return (x: number, y: number, t: number) => t;
            if (by === "magnitude") return (x: number, y: number, t: number, magnitude?: number) => magnitude ?? Math.hypot(x, y);
            const f = by as (x: number, y: number) => number;
            return (x: number, y: number) => f(x, y);
        };

        /** @ignore */
        let $active: string | string[] | null = null;

        /** @ignore */
        let $bound = new WeakMap<object, number>();

        /** @ignore */
        let $assigned = new Map<string, WeakMap<object, any>>();

        /** @ignore */
        let $next = 0;

        /** @ignore */
        const $slot = (name: string, keys: unknown[], parts: number): number | null => {
            for (let k = 0; k < keys.length; k++) {
                const key = keys[k];
                if (key === null || (typeof key !== "object" && typeof key !== "function")) return null;
            }
            for (let k = 0; k < keys.length; k++) {
                if ($bound.has(keys[k] as object)) return $bound.get(keys[k] as object) as number;
            }
            let map = $assigned.get(name);
            if (map === undefined) {
                map = new WeakMap<object, any>();
                $assigned.set(name, map);
            }
            for (let k = 0; k < keys.length - 1; k++) {
                let inner = map.get(keys[k] as object);
                if (inner === undefined) {
                    inner = new WeakMap<object, any>();
                    map.set(keys[k] as object, inner);
                }
                map = inner as WeakMap<object, any>;
            }
            const last = keys[keys.length - 1] as object;
            if (map.has(last)) return map.get(last) as number;
            const slot = $next;
            map.set(last, slot);
            $next += parts;
            return slot;
        };

        /**
         * Plots the autocorrelation of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const f = Chalkboard.real.define((x) => Math.exp(-x * x));
         * const points = Chalkboard.plot.autocorrelation(f, { domain: [-3, 3] }); // Plots its autocorrelation
         */
        export const autocorrelation = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func === null || typeof func !== "object" || (typeof (func as any).rule !== "function" && !Array.isArray((func as any).rule)) || typeof (func as any).field !== "string" || typeof (func as any).type !== "string") throw new Error(`Chalkboard.plot.autocorrelation: Parameter "func" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.autocorrelation: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25 }, config.colormap === undefined ? { name: "autocorrelation", keys: [func] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.autocorrelation");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const value = Chalkboard.calc.autocorrelation(func, i * _config.size);
                const currentY = -value / _config.size;
                points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                if (by) values.push(by(i * _config.size, value, i * _config.size));
                previousY = currentY;
                data.push([i, Chalkboard.calc.autocorrelation(func, i)]);
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.autocorrelation");
            _config.context.restore();
            return data;
        };

        /**
         * Plots a bar plot/chart/graph for an array of data with bins specified by another array.
         * @param {number[]} arr - The data array
         * @param {number[]} bins - The bins array (must be sorted in ascending order)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.fillStyle="white"] - Fill color for bars
         * @param {string} [config.strokeStyle="black"] - Stroke color for bars
         * @param {number} [config.lineWidth=2] - Stroke width for bars
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const result = Chalkboard.plot.barplot([1, 4, 9], [1, 2, 3], { fillStyle: "royalblue" }); // Plots three bars
         */
        export const barplot = (
            arr: number[],
            bins: number[],
            config: {
                x: number;
                y: number;
                size: number;
                fillStyle: string;
                strokeStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (!Array.isArray(arr)) throw new Error(`Chalkboard.plot.barplot: Parameter "arr" must be an array of finite numbers.`);
            if (!Array.isArray(bins)) throw new Error(`Chalkboard.plot.barplot: Parameter "bins" must be an array of finite numbers.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.barplot: Parameter "config" must be an object.`);
            const _config = $(config, { fillStyle: "white" }, { name: "barplot", keys: [arr, bins], styles: ["stroke", "fill"], fillAlpha: 0.5 });
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.fillStyle = _config.fillStyle;
            const bars = [];
            for (let i = 1; i < bins.length; i++) {
                bars.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], i === 1, true));
            }
            const counts = [];
            for (let i = 0; i < bars.length; i++) {
                counts.push(bars[i].length);
            }
            for (let i = 0; i < counts.length; i++) {
                const xStart = bins[i] / _config.size;
                const xEnd = bins[i + 1] / _config.size;
                const dynamicWidth = xEnd - xStart;
                _config.context.fillRect(xStart, 0, dynamicWidth, -counts[i] / _config.size);
                _config.context.strokeRect(xStart, 0, dynamicWidth, -counts[i] / _config.size);
            }
            _config.context.restore();
            return bars;
        };

        /**
         * Returns the color of a value in a color map, interpolated linearly in RGB between the map's evenly spaced stops. The built-in color maps are "viridis", "plasma", "inferno", "magma", "cividis", "turbo", "coolwarm", "twilight", "grayscale", and "hsv", and a custom color map is an array of at least two colors of the form "#rrggbb" or "rgb(r, g, b)". Values outside the range take the color at its nearer end, and a reversed range reverses the map.
         * @param {string | string[]} map - The name of a built-in color map or an array of colors
         * @param {number} value - The value to color
         * @param {number[]} [range=[0, 1]] - The values at the ends of the color map
         * @param {number} [alpha=1] - Opacity, from 0 to 1
         * @returns {string} A color of the form "rgb(r, g, b)", or "rgba(r, g, b, alpha)" when the opacity is less than 1
         * @example
         * const color = Chalkboard.plot.colormap("viridis", 5, [0, 10]); // Returns "rgb(33, 144, 141)"
         */
        export const colormap = (map: string | string[], value: number, range: [number, number] = [0, 1], alpha: number = 1): string => {
            const stops = $stops(map, "Chalkboard.plot.colormap", 'Parameter "map"');
            if (typeof value !== "number" || Number.isNaN(value)) throw new Error(`Chalkboard.plot.colormap: Parameter "value" must be a number.`);
            if (!Array.isArray(range) || range.length !== 2 || !Number.isFinite(range[0]) || !Number.isFinite(range[1])) throw new Error(`Chalkboard.plot.colormap: Parameter "range" must be an array of two finite numbers.`);
            if (typeof alpha !== "number" || !(alpha >= 0 && alpha <= 1)) throw new Error(`Chalkboard.plot.colormap: Parameter "alpha" must be a number from 0 to 1.`);
            return $format($interpolate(stops, value, range), alpha);
        };

        /**
         * Returns a color from a color palette. The built-in color palettes are "tab10", "chartjs", and "okabeito", and a custom color palette is an array of at least one color of the form "#rrggbb" or "rgb(r, g, b)". Indices wrap around the palette in both directions.
         * @param {string | string[]} palette - The name of a built-in color palette or an array of colors
         * @param {number} index - The index of the color
         * @param {number} [alpha=1] - Opacity, from 0 to 1
         * @returns {string} A color of the form "rgb(r, g, b)", or "rgba(r, g, b, alpha)" when the opacity is less than 1
         * @example
         * const color = Chalkboard.plot.colorpalette("tab10", 1); // Returns "rgb(255, 127, 14)"
         */
        export const colorpalette = (palette: string | string[], index: number, alpha: number = 1): string => {
            const swatches = $swatches(palette, "Chalkboard.plot.colorpalette", 'Parameter "palette"');
            if (!Number.isInteger(index)) throw new Error(`Chalkboard.plot.colorpalette: Parameter "index" must be an integer.`);
            if (typeof alpha !== "number" || !(alpha >= 0 && alpha <= 1)) throw new Error(`Chalkboard.plot.colorpalette: Parameter "alpha" must be a number from 0 to 1.`);
            const n = swatches.length;
            return $format(swatches[((index % n) + n) % n], alpha);
        };

        /**
         * Sets the color palette that plots use when they are not given an explicit color, or turns it off with null (the default). The built-in color palettes are "tab10", "chartjs", and "okabeito", and a custom color palette is an array of colors of the form "#rrggbb" or "rgb(r, g, b)". While a palette is set, a plot takes the next palette color the first time it sees its input objects (such as a function, an array, or a solution) and keeps that color whenever those same objects are plotted again, and the listed objects receive the palette's colors in order. Inputs that are created anew for every frame of an animation are new objects each time, so they receive a new color each time.
         * @param {string | string[] | null} palette - The name of a built-in color palette, an array of colors, or null to turn the palette off
         * @param {Object[]} [objects=[]] - Objects to give the palette's colors in order
         * @returns {void}
         * @example
         * const f = Chalkboard.real.define((x) => Math.sin(x));
         * const g = Chalkboard.real.define((x) => Math.cos(x));
         * Chalkboard.plot.colorpaletteConfig("okabeito", [f, g]);
         * Chalkboard.plot.definition(f); // Draws f in black
         * Chalkboard.plot.definition(g); // Draws g in orange
         */
        export const colorpaletteConfig = (palette: string | string[] | null, objects: object[] = []): void => {
            if (palette !== null) $swatches(palette, "Chalkboard.plot.colorpaletteConfig", 'Parameter "palette"');
            if (!Array.isArray(objects) || objects.some((object) => object === null || typeof object !== "object")) throw new Error(`Chalkboard.plot.colorpaletteConfig: Parameter "objects" must be an array of objects.`);
            $active = Array.isArray(palette) ? palette.slice() : palette;
            $bound = new WeakMap<object, number>();
            $assigned = new Map<string, WeakMap<object, any>>();
            for (let k = 0; k < objects.length; k++) {
                if (!$bound.has(objects[k])) $bound.set(objects[k], k);
            }
            $next = objects.length;
        };

        /**
         * Plots a complex number.
         * @param {ChalkboardComplex} comp - The complex number
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.fillStyle="black"] - Fill color for the complex number
         * @param {number} [config.lineWidth=5] - Line width for the complex number
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const result = Chalkboard.plot.comp(Chalkboard.comp.init(3, 4), { fillStyle: "crimson" }); // Plots 3 + 4i
         */
        export const comp = (
            comp: ChalkboardComplex,
            config: {
                x: number;
                y: number;
                size: number;
                fillStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (comp === null || typeof comp !== "object" || typeof (comp as any).a !== "number" || !Number.isFinite((comp as any).a) || typeof (comp as any).b !== "number" || !Number.isFinite((comp as any).b)) throw new Error(`Chalkboard.plot.comp: Parameter "comp" must be a complex number.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.comp: Parameter "config" must be an object.`);
            const _config = $(config, { fillStyle: "black", lineWidth: 5 }, { name: "comp", keys: [comp], styles: ["fill"] });
            _config.context.fillStyle = _config.fillStyle;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.beginPath();
            _config.context.ellipse(comp.a / _config.size, -comp.b / _config.size, _config.lineWidth, _config.lineWidth, 0, 0, Chalkboard.PI(2));
            _config.context.fill();
            _config.context.restore();
            return [[comp.a], [comp.b]];
        };

        /**
         * Plots the convolution of two explicit functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const f = Chalkboard.real.define((x) => Math.exp(-x * x));
         * const points = Chalkboard.plot.convolution(f, f, { domain: [-3, 3] }); // Plots the Gaussian convolution
         */
        export const convolution = (
            func1: ChalkboardFunction,
            func2: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func1 === null || typeof func1 !== "object" || (typeof (func1 as any).rule !== "function" && !Array.isArray((func1 as any).rule)) || typeof (func1 as any).field !== "string" || typeof (func1 as any).type !== "string") throw new Error(`Chalkboard.plot.convolution: Parameter "func1" must be a mathematical function object.`);
            if (func2 === null || typeof func2 !== "object" || (typeof (func2 as any).rule !== "function" && !Array.isArray((func2 as any).rule)) || typeof (func2 as any).field !== "string" || typeof (func2 as any).type !== "string") throw new Error(`Chalkboard.plot.convolution: Parameter "func2" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.convolution: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25 }, config.colormap === undefined ? { name: "convolution", keys: [func1, func2] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.convolution");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const value = Chalkboard.calc.convolution(func1, func2, i * _config.size);
                const currentY = -value / _config.size;
                points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                if (by) values.push(by(i * _config.size, value, i * _config.size));
                previousY = currentY;
                data.push([i, Chalkboard.calc.convolution(func1, func2, i)]);
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.convolution");
            _config.context.restore();
            return data;
        };

        /**
         * Plots the cross-correlation of two explicit functions.
         * @param {ChalkboardFunction} func1 - The first function
         * @param {ChalkboardFunction} func2 - The second function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const sine = Chalkboard.real.define((x) => Math.sin(x));
         * const cosine = Chalkboard.real.define((x) => Math.cos(x));
         * const points = Chalkboard.plot.correlation(sine, cosine, { domain: [-5, 5] }); // Plots their correlation
         */
        export const correlation = (
            func1: ChalkboardFunction,
            func2: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func1 === null || typeof func1 !== "object" || (typeof (func1 as any).rule !== "function" && !Array.isArray((func1 as any).rule)) || typeof (func1 as any).field !== "string" || typeof (func1 as any).type !== "string") throw new Error(`Chalkboard.plot.correlation: Parameter "func1" must be a mathematical function object.`);
            if (func2 === null || typeof func2 !== "object" || (typeof (func2 as any).rule !== "function" && !Array.isArray((func2 as any).rule)) || typeof (func2 as any).field !== "string" || typeof (func2 as any).type !== "string") throw new Error(`Chalkboard.plot.correlation: Parameter "func2" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.correlation: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25 }, config.colormap === undefined ? { name: "correlation", keys: [func1, func2] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.correlation");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const value = Chalkboard.calc.correlation(func1, func2, i * _config.size);
                const currentY = -value / _config.size;
                points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                if (by) values.push(by(i * _config.size, value, i * _config.size));
                previousY = currentY;
                data.push([i, Chalkboard.calc.correlation(func1, func2, i)]);
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.correlation");
            _config.context.restore();
            return data;
        };

        /**
         * Plots a 2D scalar function, a parametric curve, or a complex function. Complex functions are drawn by domain coloring, which by default shows the argument as hue and the magnitude as lightness, from black at zeros to white at poles and non-finite values.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the inverse of the function (only for scalar2d)
         * @param {boolean} [config.isPolar=false] - Whether to plot in polar coordinates (only for scalar2d)
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors. For complex functions, it defaults to "hsv" for "both" and "argument" and to "viridis" for "magnitude"
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value. Complex functions instead accept "both" (the default: hue from the argument and lightness from the magnitude), "argument" (hue only), or "magnitude" (a heat map of the magnitude)
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values). For complex functions, it applies to "magnitude" only
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const parabola = Chalkboard.real.define((x) => x * x);
         * const points = Chalkboard.plot.definition(parabola, { domain: [-3, 3] }); // Plots y = x²
         */
        export const definition = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number] | [[number, number], [number, number]];
                res: number;
                isInverse: boolean;
                isPolar: boolean;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | "both" | "argument" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            const _config = $(config, { domain: (func.field === "comp" ? [[-10, 10], [-10, 10]] : [-10, 10]), res: (func.field === "comp" ? 5 : 1), isInverse: false, isPolar: false }, func.field !== "comp" && config?.colormap === undefined ? { name: "definition", keys: [func] } : undefined);
            const xdomain = _config.domain as [number, number];
            const xydomain = _config.domain as [[number, number], [number, number]];
            const complex = func.field === "comp" ? (_config.colorby ?? "both") : null;
            if (complex !== null && complex !== "both" && complex !== "argument" && complex !== "magnitude") throw new Error(`Chalkboard.plot.definition: Property "config.colorby" must be "both", "argument", or "magnitude" for complex functions.`);
            const stops = complex !== null ? $stops(_config.colormap ?? (complex === "magnitude" ? "viridis" : "hsv"), "Chalkboard.plot.definition", 'Property "config.colormap"') : null;
            const colorrange = complex !== null ? $range(_config.colorrange, "Chalkboard.plot.definition") : undefined;
            const by = complex === null ? $colorby(_config as { colormap?: unknown; colorby?: unknown; colorrange?: unknown }, "y", "Chalkboard.plot.definition") : null;
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            if (func.type === "scalar2d" && !_config.isInverse && !_config.isPolar) {
                const f = func.rule as (x: number) => number;
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const value = f(i * _config.size);
                    const currentY = -value / _config.size;
                    points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(i * _config.size, value, i * _config.size));
                    previousY = currentY;
                    data.push([i, f(i)]);
                }
            } else if (func.type === "scalar2d" && _config.isInverse && !_config.isPolar) {
                const f = func.rule as (y: number) => number;
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const value = f(i * _config.size);
                    const currentX = value / _config.size;
                    const currentY = -i;
                    points.push([currentX, currentY, previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold]);
                    if (by) values.push(by(value, i * _config.size, i * _config.size));
                    previousX = currentX;
                    data.push([f(i), i]);
                }
            } else if (func.type === "scalar2d" && !_config.isInverse && _config.isPolar) {
                const r = func.rule as (theta: number) => number;
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const radius = r(i * _config.size);
                    const currentX = (radius / _config.size) * Chalkboard.trig.cos(i * _config.size);
                    const currentY = (-r(i * _config.size) / _config.size) * Chalkboard.trig.sin(i * _config.size);
                    points.push([currentX, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(radius * Chalkboard.trig.cos(i * _config.size), radius * Chalkboard.trig.sin(i * _config.size), i * _config.size));
                    previousY = currentY;
                    data.push([i, r(i)]);
                }
            } else if (func.type === "curve2d") {
                const f = func.rule as [(t: number) => number, (t: number) => number];
                for (let i = xdomain[0] / _config.size; i <= xdomain[1] / _config.size; i += _config.res) {
                    const valueX = f[0](i * _config.size);
                    const currentX = valueX / _config.size;
                    const valueY = f[1](i * _config.size);
                    const currentY = -valueY / _config.size;
                    points.push([currentX, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(valueX, valueY, i * _config.size));
                    previousY = currentY;
                    data.push([f[0](i), f[1](i)]);
                }
            } else if (func.field === "comp") {
                const f = func.rule as [(a: number, b: number) => number, (a: number, b: number) => number];
                const tiles: [number, number, number, number][] = [];
                let lo = Infinity, hi = -Infinity;
                for (let i = xydomain[0][0] / _config.size; i <= xydomain[0][1] / _config.size; i += _config.res) {
                    for (let j = xydomain[1][0] / _config.size; j <= xydomain[1][1] / _config.size; j += _config.res) {
                        const a = f[0](i * _config.size, -j * _config.size), b = f[1](i * _config.size, -j * _config.size);
                        tiles.push([i, j, a, b]);
                        const magnitude = Math.hypot(a, b);
                        if (Number.isFinite(magnitude)) {
                            lo = Math.min(lo, magnitude);
                            hi = Math.max(hi, magnitude);
                        }
                        data.push([f[0](i, -j), f[1](i, -j)]);
                    }
                }
                const range: [number, number] = colorrange ?? (lo <= hi ? [lo, hi] : [0, 1]);
                for (let k = 0; k < tiles.length; k++) {
                    const i = tiles[k][0], j = tiles[k][1], a = tiles[k][2], b = tiles[k][3];
                    if (!Number.isFinite(a) || !Number.isFinite(b)) {
                        _config.context.fillStyle = "rgb(255, 255, 255)";
                    } else if (complex === "magnitude") {
                        _config.context.fillStyle = $format($interpolate(stops!, Math.hypot(a, b), range), 1);
                    } else if (a === 0 && b === 0) {
                        _config.context.fillStyle = "rgb(0, 0, 0)";
                    } else {
                        const rgb = $interpolate(stops!, ((Math.atan2(b, a) / (2 * Math.PI)) % 1 + 1) % 1, [0, 1]);
                        if (complex === "both") {
                            const L = (2 / Math.PI) * Math.atan(Math.hypot(a, b));
                            for (let c = 0; c < 3; c++) rgb[c] = L < 0.5 ? Math.round(rgb[c] * 2 * L) : Math.round(rgb[c] + (255 - rgb[c]) * (2 * L - 1));
                        }
                        _config.context.fillStyle = $format(rgb, 1);
                    }
                    _config.context.fillRect(i, j, _config.res, _config.res);
                }
            } else {
                throw new Error(`Chalkboard.plot.definition: Parameter "func" must be of type ChalkboardFunction with a property "type" of expl, inve, pola, curv, or comp.`);
            }
            if (func.field !== "comp") $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.definition");
            _config.context.restore();
            return data;
        };

        /**
         * Plots the first-order derivative of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the derivative of the inverse of the function (only for scalar2d)
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const cubic = Chalkboard.real.define((x) => x * x * x);
         * const points = Chalkboard.plot.dfdx(cubic, { domain: [-3, 3] }); // Plots the first derivative
         */
        export const dfdx = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                isInverse: boolean;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func === null || typeof func !== "object" || (typeof (func as any).rule !== "function" && !Array.isArray((func as any).rule)) || typeof (func as any).field !== "string" || typeof (func as any).type !== "string") throw new Error(`Chalkboard.plot.dfdx: Parameter "func" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.dfdx: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25, isInverse: false }, config.colormap === undefined ? { name: "dfdx", keys: [func] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.dfdx");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                if (func.type === "scalar2d" && !_config.isInverse) {
                    const value = Chalkboard.calc.dfdx(func, i * _config.size) as number;
                    const currentY = -value / _config.size;
                    points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(i * _config.size, value, i * _config.size));
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.dfdx(func, i) as number]);
                } else if (func.type === "scalar2d" && _config.isInverse) {
                    const value = Chalkboard.calc.dfdx(func, i * _config.size) as number;
                    const currentX = value / _config.size;
                    const currentY = -i;
                    points.push([currentX, currentY, previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold]);
                    if (by) values.push(by(value, i * _config.size, i * _config.size));
                    previousX = currentX;
                    data.push([Chalkboard.calc.dfdx(func, i) as number, i]);
                }
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.dfdx");
            _config.context.restore();
            return data;
        };

        /**
         * Plots the second-order derivative of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the second derivative of the inverse of the function (only for scalar2d)
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const quartic = Chalkboard.real.define((x) => x ** 4);
         * const points = Chalkboard.plot.d2fdx2(quartic, { domain: [-3, 3] }); // Plots the second derivative
         */
        export const d2fdx2 = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                isInverse: boolean;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func === null || typeof func !== "object" || (typeof (func as any).rule !== "function" && !Array.isArray((func as any).rule)) || typeof (func as any).field !== "string" || typeof (func as any).type !== "string") throw new Error(`Chalkboard.plot.d2fdx2: Parameter "func" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.d2fdx2: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25, isInverse: false }, config.colormap === undefined ? { name: "d2fdx2", keys: [func] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.d2fdx2");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                if (func.type === "scalar2d" && !_config.isInverse) {
                    const value = Chalkboard.calc.d2fdx2(func, i * _config.size) as number;
                    const currentY = -value / _config.size;
                    points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(i * _config.size, value, i * _config.size));
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.d2fdx2(func, i) as number]);
                } else if (func.type === "scalar2d" && _config.isInverse) {
                    const value = Chalkboard.calc.d2fdx2(func, i * _config.size) as number;
                    const currentX = value / _config.size;
                    const currentY = -i;
                    points.push([currentX, currentY, previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold]);
                    if (by) values.push(by(value, i * _config.size, i * _config.size));
                    previousX = currentX;
                    data.push([Chalkboard.calc.d2fdx2(func, i) as number, i]);
                }
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.d2fdx2");
            _config.context.restore();
            return data;
        };

        /**
         * Plots a 2D vector field.
         * @param {ChalkboardFunction} vectfield
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[][]} [config.domain=[[-10, 10], [-10, 10]]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {string | string[]} [config.colormap] - Color map that colors each arrow by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="magnitude"] - What to color by: "x", "y", "t" (the arrow's index), "magnitude" (the arrow's length), or a function (x, y) => value of the point where the field is evaluated
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const rotation = Chalkboard.vect.field((x, y) => -y, (x, y) => x);
         * const vectors = Chalkboard.plot.field(rotation, { domain: [[-2, 2], [-2, 2]] }); // Plots a rotational field
         */
        export const field = (
            vectfield: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [[number, number], [number, number]];
                res: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (vectfield === null || typeof vectfield !== "object" || (typeof (vectfield as any).rule !== "function" && !Array.isArray((vectfield as any).rule)) || typeof (vectfield as any).field !== "string" || typeof (vectfield as any).type !== "string") throw new Error(`Chalkboard.plot.field: Parameter "vectfield" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.field: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [[-10, 10], [-10, 10]], res: 25 }, config.colormap === undefined ? { name: "field", keys: [vectfield] } : undefined);
            const by = $colorby(_config, "magnitude", "Chalkboard.plot.field");
            const data = [];
            const arrows: [number, number, number, number][] = [];
            const values: number[] = [];
            for (let i = _config.domain[0][0] / _config.size; i <= _config.domain[0][1] / _config.size; i += _config.res) {
                for (let j = _config.domain[1][0] / _config.size; j <= _config.domain[1][1] / _config.size; j += _config.res) {
                    const v = Chalkboard.vect.fromField(vectfield, Chalkboard.vect.init(i, -j)) as { x: number, y: number, z?: number, w?: number };
                    if (by) values.push(by(i, -j, arrows.length, Math.hypot(v.x, v.y)));
                    arrows.push([i, j, v.x, v.y]);
                    data.push([i + v.x, j - v.y]);
                }
            }
            const color = by ? $gradient(values, _config.colormap as string | string[], _config.colorrange, "Chalkboard.plot.field") : null;
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            for (let k = 0; k < arrows.length; k++) {
                const i = arrows[k][0], j = arrows[k][1];
                if (color) {
                    if (!Number.isFinite(values[k])) continue;
                    _config.context.strokeStyle = color(values[k]);
                }
                _config.context.beginPath();
                _config.context.moveTo(i, j);
                _config.context.lineTo(i + arrows[k][2], j - arrows[k][3]);
                _config.context.stroke();
            }
            _config.context.restore();
            return data;
        };

        /**
         * Plots the Fourier transform of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const pulse = Chalkboard.real.define((x) => Chalkboard.real.rect(x));
         * const points = Chalkboard.plot.Fourier(pulse, { domain: [-5, 5] }); // Plots its Fourier transform
         */
        export const Fourier = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func === null || typeof func !== "object" || (typeof (func as any).rule !== "function" && !Array.isArray((func as any).rule)) || typeof (func as any).field !== "string" || typeof (func as any).type !== "string") throw new Error(`Chalkboard.plot.Fourier: Parameter "func" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.Fourier: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25 }, config.colormap === undefined ? { name: "Fourier", keys: [func] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.Fourier");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const value = Chalkboard.calc.Fourier(func, i * _config.size);
                const currentY = -value / _config.size;
                points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                if (by) values.push(by(i * _config.size, value, i * _config.size));
                previousY = currentY;
                data.push([i, Chalkboard.calc.Fourier(func, i)]);
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.Fourier");
            _config.context.restore();
            return data;
        };

        /**
         * Plots the antiderivative (or integral) of an explicit or inverse function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {boolean} [config.isInverse=false] - Whether to plot the inverse function
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const square = Chalkboard.real.define((x) => x * x);
         * const points = Chalkboard.plot.fxdx(square, { domain: [0, 2] }); // Shades the integral of x²
         */
        export const fxdx = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                isInverse: boolean;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func === null || typeof func !== "object" || (typeof (func as any).rule !== "function" && !Array.isArray((func as any).rule)) || typeof (func as any).field !== "string" || typeof (func as any).type !== "string") throw new Error(`Chalkboard.plot.fxdx: Parameter "func" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.fxdx: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25, isInverse: false }, config.colormap === undefined ? { name: "fxdx", keys: [func] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.fxdx");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            let previousX: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                if (func.type === "scalar2d" && !_config.isInverse) {
                    const value = Chalkboard.calc.fxdx(func, 0, i * _config.size) as number;
                    const currentY = -value / _config.size;
                    points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(i * _config.size, value, i * _config.size));
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.fxdx(func, 0, i) as number]);
                } else if (func.type === "scalar2d" && _config.isInverse) {
                    const value = Chalkboard.calc.fxdx(func, 0, i * _config.size) as number;
                    const currentX = value / _config.size;
                    const currentY = -i;
                    points.push([currentX, currentY, previousX === null || Math.abs(currentX - previousX) > discontinuityThreshold]);
                    if (by) values.push(by(value, i * _config.size, i * _config.size));
                    previousX = currentX;
                    data.push([Chalkboard.calc.fxdx(func, 0, i) as number, i]);
                }
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.fxdx");
            _config.context.restore();
            return data;
        };

        /**
         * Plots the Laplace transform of an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the function, not pixels)
         * @param {number} [config.res=25] - Resolution (distance in pixels between sampled points), higher values result in faster plotting but less smooth plots
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const exponential = Chalkboard.real.define((x) => Math.exp(-x));
         * const points = Chalkboard.plot.Laplace(exponential, { domain: [0.1, 5] }); // Plots its Laplace transform
         */
        export const Laplace = (
            func: ChalkboardFunction,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func === null || typeof func !== "object" || (typeof (func as any).rule !== "function" && !Array.isArray((func as any).rule)) || typeof (func as any).field !== "string" || typeof (func as any).type !== "string") throw new Error(`Chalkboard.plot.Laplace: Parameter "func" must be a mathematical function object.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.Laplace: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25 }, config.colormap === undefined ? { name: "Laplace", keys: [func] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.Laplace");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            if (_config.domain[0] >= 0) {
                for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                    const value = Chalkboard.calc.Laplace(func, i * _config.size);
                    const currentY = -value / _config.size;
                    points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(i * _config.size, value, i * _config.size));
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            } else {
                for (let i = 0; i <= _config.domain[1] / _config.size; i += _config.res) {
                    const value = Chalkboard.calc.Laplace(func, i * _config.size);
                    const currentY = -value / _config.size;
                    points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                    if (by) values.push(by(i * _config.size, value, i * _config.size));
                    previousY = currentY;
                    data.push([i, Chalkboard.calc.Laplace(func, i)]);
                }
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.Laplace");
            _config.context.restore();
            return data;
        };

        /**
         * Plots a line chart/plot/graph for an array of data with bins specified by another array.
         * @param {number[]} arr - The data array
         * @param {number[]} bins - The bin edges array (length should be one more than the number of bins)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const result = Chalkboard.plot.lineplot([1, 4, 9, 16], [1, 2, 3, 4], { strokeStyle: "purple" }); // Plots the square numbers
         */
        export const lineplot = (
            arr: number[],
            bins: number[],
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (!Array.isArray(arr)) throw new Error(`Chalkboard.plot.lineplot: Parameter "arr" must be an array of finite numbers.`);
            if (!Array.isArray(bins)) throw new Error(`Chalkboard.plot.lineplot: Parameter "bins" must be an array of finite numbers.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.lineplot: Parameter "config" must be an object.`);
            const _config = $(config, {}, config.colormap === undefined ? { name: "lineplot", keys: [arr, bins] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.lineplot");
            const values: number[] = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const verts = [];
            for (let i = 1; i < bins.length; i++) {
                verts.push(Chalkboard.stat.ineq(arr, bins[i - 1], bins[i], i === 1, true));
            }
            const counts = [];
            for (let i = 0; i < verts.length; i++) {
                counts.push(verts[i].length);
            }
            const points: [number, number, boolean][] = [[bins[0] / _config.size, 0, true]];
            if (by) values.push(by(bins[0], 0, bins[0]));
            for (let i = 0; i < counts.length; i++) {
                const midX = (bins[i] + bins[i + 1]) / 2 / _config.size;
                points.push([midX, -counts[i] / _config.size, false]);
                if (by) values.push(by((bins[i] + bins[i + 1]) / 2, counts[i], (bins[i] + bins[i + 1]) / 2));
            }
            points.push([bins[bins.length - 1] / _config.size, 0, false]);
            if (by) values.push(by(bins[bins.length - 1], 0, bins[bins.length - 1]));
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.lineplot");
            _config.context.restore();
            return verts;
        };

        /**
         * Plots a 2x2 matrix.
         * @param {ChalkboardMatrix} matr - The matrix
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the matrix, not pixels)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const result = Chalkboard.plot.matr([[0, -1], [1, 0]], { domain: [-2, 2] }); // Plots a quarter-turn transformation
         */
        export const matr = (
            matr: ChalkboardMatrix,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (!Array.isArray(matr) || matr.length > 0 && !Array.isArray(matr[0])) throw new Error(`Chalkboard.plot.matr: Parameter "matr" must be a matrix.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.matr: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10] }, { name: "matr", keys: [matr], parts: 2 });
            const second = _config.paletteSlot !== undefined && $active !== null ? Chalkboard.plot.colorpalette($active, _config.paletteSlot + 1) : _config.strokeStyle;
            for (let i = _config.domain[0]; i <= _config.domain[1]; i++) {
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), {
                    x: _config.x,
                    y: _config.y + (i / _config.size) * matr[1][1],
                    size: _config.size,
                    strokeStyle: _config.strokeStyle,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), {
                    x: _config.x,
                    y: _config.y + (i / _config.size) * matr[1][1],
                    size: _config.size,
                    strokeStyle: _config.strokeStyle,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), {
                    x: _config.x + (i / _config.size) * matr[0][0],
                    y: _config.y,
                    size: _config.size,
                    strokeStyle: second,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
                Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), {
                    x: _config.x + (i / _config.size) * matr[0][0],
                    y: _config.y,
                    size: _config.size,
                    strokeStyle: second,
                    lineWidth: _config.lineWidth / 4,
                    context: _config.context
                });
            }
            const firstConfig = Object.assign({}, _config, { strokeStyle: _config.strokeStyle });
            const secondConfig = Object.assign({}, _config, { strokeStyle: second });
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][0], matr[1][0]), firstConfig);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][0], -matr[1][0]), firstConfig);
            Chalkboard.plot.vect(Chalkboard.vect.init(matr[0][1], matr[1][1]), secondConfig);
            Chalkboard.plot.vect(Chalkboard.vect.init(-matr[0][1], -matr[1][1]), secondConfig);
            return matr;
        };

        /**
         * Plots an ODE solution. Supports both scalar and system ODEs. For scalar ODEs, plots y(t). For systems, can plot either y[j] vs t or y[j] vs y[i] (phase plot) based on the "phase" config option.
         * @param {{ t: number[]; y: number[][] }} sol - The solution object from Chalkboard.diff.solve or Chalkboard.diff.solveAdaptive
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number} [config.i=0] - x-component index (for phase plots)
         * @param {number} [config.j=1] - y-component index (for phase plots)
         * @param {boolean} [config.phase=false] - If true, plots y[j] vs y[i] (phase plot), if false, plots y[i] vs t
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="t"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Canvas context
         * @returns {number[][]}
         * @example
         * // Plot scalar solution y(t)
         * const ode1 = Chalkboard.diff.exponential(-1);
         * const sol1 = Chalkboard.diff.solve(ode1, { t0: 0, t1: 5, steps: 300, y0: 1 });
         * Chalkboard.plot.ode(sol1, { strokeStyle: "red", size: 1 });
         * 
         * // Phase plot for harmonic oscillator (y vs dy)
         * const ode2 = Chalkboard.diff.harmonic();
         * const sol2 = Chalkboard.diff.solve(ode2, { t0: 0, t1: 20, steps: 2000, y0: { y0: 1, dy0: 0 } });
         * Chalkboard.plot.ode(sol2, { phase: true, i: 0, j: 1, strokeStyle: "blue" });
         */
        export const ode = (
            sol: { t: number[]; y: number[][] },
            config: {
                x?: number;
                y?: number;
                size?: number;
                strokeStyle?: string;
                lineWidth?: number;
                i?: number;
                j?: number;
                phase?: boolean;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context?: CanvasRenderingContext2D;
            } = {}
        ): number[][] => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y)) throw new Error(`Chalkboard.plot.ode: Parameter "sol" must have properties "t" and "y" as arrays.`);
            if (sol.t.length !== sol.y.length || sol.t.length === 0) throw new Error(`Chalkboard.plot.ode: Invalid solution object (length mismatch or empty).`);
            const _config = $(config, { phase: false, i: 0, j: 1 }, config.colormap === undefined ? { name: "ode", keys: [sol], parts: sol.y[0].length, part: Number.isInteger(config.i) ? config.i : 0 } : undefined);
            const by = $colorby(_config, "t", "Chalkboard.plot.ode");
            const values: number[] = [];
            const dim = sol.y[0].length;
            if (!Number.isInteger(_config.i) || _config.i < 0) throw new Error(`Chalkboard.plot.ode: Parameter "config.i" must be a non-negative integer.`);
            if (_config.i >= dim) throw new Error(`Chalkboard.plot.ode: Property "config.i" must be within the solution dimension.`);
            if (_config.phase) {
                if (!Number.isInteger(_config.j) || _config.j < 0) throw new Error(`Chalkboard.plot.ode: Property "config.j" must be a non-negative integer.`);
                if (_config.j >= dim) throw new Error(`Chalkboard.plot.ode: Property "config.j" must be within the solution dimension.`);
                if (_config.i === _config.j) throw new Error(`Chalkboard.plot.ode: Properties "config.i" and "config.j" must be different for phase plots.`);
            }
            const data: number[][] = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            if (!_config.phase) {
                for (let k = 0; k < sol.t.length; k++) {
                    const X = sol.t[k] / _config.size;
                    const Y = -sol.y[k][_config.i] / _config.size;
                    points.push([X, Y, k === 0]);
                    if (by) values.push(by(sol.t[k], sol.y[k][_config.i], sol.t[k]));
                    data.push([sol.t[k], sol.y[k][_config.i]]);
                }
            } else {
                for (let k = 0; k < sol.y.length; k++) {
                    const X = sol.y[k][_config.i] / _config.size;
                    const Y = -sol.y[k][_config.j] / _config.size;
                    points.push([X, Y, k === 0]);
                    if (by) values.push(by(sol.y[k][_config.i], sol.y[k][_config.j], sol.t[k]));
                    data.push([sol.y[k][_config.i], sol.y[k][_config.j]]);
                }
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.ode");
            _config.context.restore();
            return data;
        };

        /**
         * Plots a solution of a partial differential equation at one time: a profile u(x) in one dimension, or a heat map of the grid cells in two dimensions, read through Chalkboard.diff.snapshot.
         * @param {{ t: number[]; y: number[][]; grid: { x: number[]; y?: number[] } }} sol - The solution from Chalkboard.diff.solve or Chalkboard.diff.solveAdaptive
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color (one dimension only)
         * @param {number} [config.lineWidth=2] - Stroke width (one dimension only)
         * @param {number} [config.time] - The time to plot, defaults to the last stored time
         * @param {number} [config.component=0] - The field to plot (for second-order equations, the indices after the fields select their time derivatives)
         * @param {string | string[]} [config.colormap] - Color map: in one dimension, it colors the profile by "config.colorby"; in two dimensions, it colors the cells by value and defaults to "viridis"
         * @param {string | Function} [config.colorby="y"] - What to color a one-dimensional profile by: "x", "y", "t" (the same as "x"), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]} In one dimension, the points [x, u]; in two dimensions, the matrix of values whose row j holds the values along x at the j-th y coordinate
         * @example
         * // Plot the profile of a one-dimensional heat equation at its final time
         * const heat = Chalkboard.diff.heat(0.5);
         * const sol = Chalkboard.diff.solve(heat, { t1: 0.1, steps: 20, method: "cranknicolson", y0: (x) => Math.sin(Math.PI * x), grid: { x: [0, 1], nx: 101 }, boundary: { left: 0, right: 0 } });
         * Chalkboard.plot.pde(sol, { size: 0.5, strokeStyle: "crimson" });
         * 
         * // Plot a two-dimensional heat equation as a heat map at t = 0.02
         * const heat2 = Chalkboard.diff.heat(1, 2);
         * const sol2 = Chalkboard.diff.solve(heat2, { t1: 0.05, steps: 25, method: "cranknicolson", y0: (x, y) => Math.sin(Math.PI * x) * Math.sin(Math.PI * y), grid: { x: [0, 1], y: [0, 1], nx: 41, ny: 41 }, boundary: { left: 0, right: 0, bottom: 0, top: 0 } });
         * Chalkboard.plot.pde(sol2, { size: 0.5, time: 0.02, colormap: "inferno" });
         */
        export const pde = (
            sol: { t: number[]; y: number[][]; grid: { x: number[]; y?: number[] } },
            config: {
                x?: number;
                y?: number;
                size?: number;
                strokeStyle?: string;
                lineWidth?: number;
                time?: number;
                component?: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context?: CanvasRenderingContext2D;
            } = {}
        ): number[][] => {
            if (!sol || !Array.isArray(sol.t) || !Array.isArray(sol.y) || !sol.grid || !Array.isArray(sol.grid.x)) throw new Error(`Chalkboard.plot.pde: Parameter "sol" must be a solution of a partial differential equation, with properties "t", "y", and "grid".`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.pde: Parameter "config" must be an object.`);
            const snapshot = Chalkboard.diff.snapshot(sol, config.time ?? sol.t[sol.t.length - 1], config.component ?? 0);
            const x = sol.grid.x;
            if (!sol.grid.y) {
                const u = snapshot as number[];
                const _config = $(config, {}, config.colormap === undefined ? { name: "pde", keys: [sol], parts: sol.y[0].length / x.length, part: Number.isInteger(config.component) ? config.component : 0 } : undefined);
                const by = $colorby(_config, "y", "Chalkboard.plot.pde");
                const points: [number, number, boolean][] = [];
                const values: number[] = [];
                const data: number[][] = [];
                for (let n = 0; n < x.length; n++) {
                    points.push([x[n] / _config.size, -u[n] / _config.size, n === 0]);
                    if (by) values.push(by(x[n], u[n], x[n]));
                    data.push([x[n], u[n]]);
                }
                _config.context.save();
                _config.context.translate(_config.x, _config.y);
                _config.context.lineWidth = _config.lineWidth;
                _config.context.strokeStyle = _config.strokeStyle;
                $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.pde");
                _config.context.restore();
                return data;
            }
            const U = snapshot as number[][], y = sol.grid.y;
            const _config = $(config);
            const stops = $stops(_config.colormap ?? "viridis", "Chalkboard.plot.pde", 'Property "config.colormap"');
            let range = $range(_config.colorrange, "Chalkboard.plot.pde");
            if (range === undefined) {
                let lo = Infinity, hi = -Infinity;
                for (let j = 0; j < U.length; j++) {
                    for (let i = 0; i < U[j].length; i++) {
                        if (!Number.isFinite(U[j][i])) continue;
                        lo = Math.min(lo, U[j][i]);
                        hi = Math.max(hi, U[j][i]);
                    }
                }
                range = lo <= hi ? [lo, hi] : [0, 1];
            }
            const hx = (x[1] - x[0]) / _config.size, hy = (y[1] - y[0]) / _config.size;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            for (let j = 0; j < U.length; j++) {
                for (let i = 0; i < U[j].length; i++) {
                    if (!Number.isFinite(U[j][i])) continue;
                    _config.context.fillStyle = $format($interpolate(stops, U[j][i], range), 1);
                    _config.context.fillRect(x[i] / _config.size - hx / 2, -y[j] / _config.size - hy / 2, hx + 1, hy + 1);
                }
            }
            _config.context.restore();
            return U;
        };

        /**
         * Plots the polar coordinate plane.
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {void}
         * @example
         * Chalkboard.plot.rOplane({ size: 1 }); // Draws the polar plane
         */
        export const rOplane = (config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }): void => {
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.rOplane: Parameter "config" must be an object.`);
            const _config = $(config);
            const cw = getContext().canvas.width;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth / 4;
            _config.context.beginPath();
            for (let i = 0; i <= (_config.size * cw) / 2; i++) {
                _config.context.ellipse(0, 0, i / _config.size, i / _config.size, 0, 0, Chalkboard.PI(2));
            }
            _config.context.stroke();
            _config.context.lineWidth = _config.lineWidth;
            _config.context.beginPath();
            _config.context.moveTo(-_config.x, 0);
            _config.context.lineTo(cw - _config.x, 0);
            _config.context.stroke();
            _config.context.beginPath();
            _config.context.moveTo(0, -_config.y);
            _config.context.lineTo(0, cw - _config.y);
            _config.context.stroke();
            _config.context.restore();
        };

        /**
         * Plots a scatter plot of two arrays of data.
         * @param {number[]} arr1 - The first data array (x-coordinates)
         * @param {number[]} arr2 - The second data array (y-coordinates)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.fillStyle="black"] - Fill color for the points
         * @param {number} [config.lineWidth=5] - Diameter of the points in pixels
         * @param {string | string[]} [config.colormap] - Color map that colors each point by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the point's index), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const result = Chalkboard.plot.scatterplot([1, 2, 3, 4], [1, 4, 9, 16], { fillStyle: "green" }); // Plots the square numbers
         */
        export const scatterplot = (
            arr1: number[],
            arr2: number[],
            config: {
                x: number;
                y: number;
                size: number;
                fillStyle: string;
                lineWidth: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (!Array.isArray(arr1)) throw new Error(`Chalkboard.plot.scatterplot: Parameter "arr1" must be an array of finite numbers.`);
            if (!Array.isArray(arr2)) throw new Error(`Chalkboard.plot.scatterplot: Parameter "arr2" must be an array of finite numbers.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.scatterplot: Parameter "config" must be an object.`);
            const _config = $(config, { fillStyle: "black", lineWidth: 5 }, config.colormap === undefined ? { name: "scatterplot", keys: [arr1, arr2], styles: ["fill"] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.scatterplot");
            const values: number[] = [];
            if (by && arr1.length === arr2.length) for (let i = 0; i < arr1.length; i++) values.push(by(arr1[i], arr2[i], i));
            const color = by ? $gradient(values, _config.colormap as string | string[], _config.colorrange, "Chalkboard.plot.scatterplot") : null;
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.fillStyle = _config.fillStyle;
            if (arr1.length === arr2.length) {
                for (let i = 0; i < arr1.length; i++) {
                    if (color) {
                        if (!Number.isFinite(values[i])) {
                            data.push([arr1[i], arr2[i]]);
                            continue;
                        }
                        _config.context.fillStyle = color(values[i]);
                    }
                    _config.context.beginPath();
                    _config.context.ellipse(arr1[i] / _config.size, -arr2[i] / _config.size, _config.lineWidth, _config.lineWidth, 0, 0, Chalkboard.PI(2));
                    _config.context.fill();
                    data.push([arr1[i], arr2[i]]);
                }
            }
            _config.context.restore();
            return data;
        };

        /**
         * Plots the nth-degree Taylor series approximation for an explicit function.
         * @param {ChalkboardFunction} func - The function
         * @param {0 | 1 | 2} n - The degree of the Taylor approximation (0 for constant, 1 for linear, 2 for quadratic)
         * @param {number} a - The point of expansion (in units of the function, not pixels)
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {number[]} [config.domain=[-10, 10]] - Domain over which to plot (in units of the matrix, not pixels)
         * @param {number} [config.res=25] - Resolution of the plot
         * @param {string | string[]} [config.colormap] - Color map that colors the plot by "config.colorby": a built-in name or an array of colors
         * @param {string | Function} [config.colorby="y"] - What to color by: "x", "y", "t" (the plot's parameter), "magnitude", or a function (x, y) => value
         * @param {number[]} [config.colorrange] - Values at the ends of the color map (default: the smallest and largest plotted values)
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const exponential = Chalkboard.real.define((x) => Math.exp(x));
         * const points = Chalkboard.plot.Taylor(exponential, 2, 0, { domain: [-2, 2] }); // Plots a quadratic Taylor approximation
         */
        export const Taylor = (
            func: ChalkboardFunction,
            n: 0 | 1 | 2,
            a: number,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                domain: [number, number];
                res: number;
                colormap?: string | string[];
                colorby?: "x" | "y" | "t" | "magnitude" | ((x: number, y: number) => number);
                colorrange?: [number, number];
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (func === null || typeof func !== "object" || (typeof (func as any).rule !== "function" && !Array.isArray((func as any).rule)) || typeof (func as any).field !== "string" || typeof (func as any).type !== "string") throw new Error(`Chalkboard.plot.Taylor: Parameter "func" must be a mathematical function object.`);
            if (!Number.isFinite(n)) throw new Error(`Chalkboard.plot.Taylor: Parameter "n" must be a finite number.`);
            if (!Number.isFinite(a)) throw new Error(`Chalkboard.plot.Taylor: Parameter "a" must be a finite number.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.Taylor: Parameter "config" must be an object.`);
            const _config = $(config, { domain: [-10, 10], res: 25 }, config.colormap === undefined ? { name: "Taylor", keys: [func] } : undefined);
            const by = $colorby(_config, "y", "Chalkboard.plot.Taylor");
            const values: number[] = [];
            const data = [];
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.lineWidth = _config.lineWidth;
            _config.context.strokeStyle = _config.strokeStyle;
            const points: [number, number, boolean][] = [];
            const discontinuityThreshold = (_config.context.canvas.height / _config.size) * 1.5;
            let previousY: number | null = null;
            for (let i = _config.domain[0] / _config.size; i <= _config.domain[1] / _config.size; i += _config.res) {
                const value = Chalkboard.calc.Taylor(func, i * _config.size, n, a);
                const currentY = -value / _config.size;
                points.push([i, currentY, previousY === null || Math.abs(currentY - previousY) > discontinuityThreshold]);
                if (by) values.push(by(i * _config.size, value, i * _config.size));
                previousY = currentY;
                data.push([i, Chalkboard.calc.Taylor(func, i, n, a)]);
            }
            $path(_config.context, points, by ? values : null, _config.colormap, _config.colorrange, "Chalkboard.plot.Taylor");
            _config.context.restore();
            return data;
        };

        /**
         * Plots a 2D vector.
         * @param {ChalkboardVector} vect - The vector
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=5] - Stroke width
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {number[][]}
         * @example
         * const result = Chalkboard.plot.vect(Chalkboard.vect.init(3, 4), { strokeStyle: "navy" }); // Plots the vector (3, 4)
         */
        export const vect = (
            vect: ChalkboardVector,
            config: {
                x: number;
                y: number;
                size: number;
                strokeStyle: string;
                lineWidth: number;
                context: CanvasRenderingContext2D;
            }
        ): number[][] => {
            if (vect === null || (vect !== undefined && typeof vect !== "string" && !Array.isArray(vect) && !(vect instanceof Float32Array) && !(vect instanceof Float64Array) && typeof vect !== "object")) throw new Error(`Chalkboard.plot.vect: Parameter "vect" must be a vector.`);
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.vect: Parameter "config" must be an object.`);
            const _config = $(config, { lineWidth: 5 }, { name: "vect", keys: [vect] });
            vect = vect as { x: number, y: number, z?: number, w?: number }
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.beginPath();
            _config.context.moveTo(0, 0);
            _config.context.lineTo(vect.x / _config.size, -vect.y / _config.size);
            _config.context.stroke();
            _config.context.restore();
            return [[vect.x], [vect.y]];
        };

        /**
         * Plots the Cartesian coordinate plane.
         * @param {number} [config.x] - x-offset (canvas translation), defaults to canvas center
         * @param {number} [config.y] - y-offset (canvas translation), defaults to canvas center
         * @param {number} [config.size=1] - Scale, defaults to 1, divided by 100 internally for finer control
         * @param {string} [config.strokeStyle="black"] - Stroke color
         * @param {number} [config.lineWidth=2] - Stroke width
         * @param {CanvasRenderingContext2D} [config.context] - Optional custom canvas context to draw on
         * @returns {void}
         * @example
         * Chalkboard.plot.xyplane({ size: 1 }); // Draws the Cartesian plane
         */
        export const xyplane = (config: {
            x: number;
            y: number;
            size: number;
            strokeStyle: string;
            lineWidth: number;
            context: CanvasRenderingContext2D;
        }): void => {
            if (config === null || typeof config !== "object") throw new Error(`Chalkboard.plot.xyplane: Parameter "config" must be an object.`);
            const _config = $(config);
            const cw = getContext().canvas.width;
            _config.context.save();
            _config.context.translate(_config.x, _config.y);
            _config.context.strokeStyle = _config.strokeStyle;
            _config.context.lineWidth = _config.lineWidth / 4;
            _config.context.beginPath();
            for (let i = Math.floor(-_config.x / _config.size); i <= (cw - _config.x) / _config.size; i++) {
                _config.context.moveTo(i / _config.size, -_config.y);
                _config.context.lineTo(i / _config.size, cw - _config.y);
            }
            _config.context.stroke();
            _config.context.beginPath();
            for (let i = Math.floor(-_config.y / _config.size); i <= (cw - _config.y) / _config.size; i++) {
                _config.context.moveTo(-_config.x, i / _config.size);
                _config.context.lineTo(cw - _config.x, i / _config.size);
            }
            _config.context.stroke();
            _config.context.lineWidth = _config.lineWidth;
            _config.context.beginPath();
            _config.context.moveTo(-_config.x, 0);
            _config.context.lineTo(cw - _config.x, 0);
            _config.context.stroke();
            _config.context.beginPath();
            _config.context.moveTo(0, -_config.y);
            _config.context.lineTo(0, cw - _config.y);
            _config.context.stroke();
            _config.context.restore();
        };
    }
}
