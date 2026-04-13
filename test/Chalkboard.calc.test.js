/*
    Chalkboard
    Version 3.0.2 Euler
    Released April 13th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Test: Calculus Namespace
*/

import assert from "assert";
import cb from "../dist/Chalkboard.js";

// calc.dfdx, calc.d2fdx2, calc.dfdv, calc.dfrdt, calc.grad, calc.grad2, calc.div, calc.curl
{
    const f = cb.real.define((x) => x*x);
    assert.ok(Math.abs(cb.calc.dfdx(f, 3) - 6) < 1e-6);
    assert.ok(Math.abs(cb.calc.d2fdx2(f, 3) - 2) < 1e-4);
    const r = cb.real.define((t) => t, (t) => 2*t);
    assert.deepStrictEqual(cb.calc.dfdx(r, 3), { x: 1.000000082740371, y: 2.000000165480742 });
    assert.deepStrictEqual(cb.calc.d2fdx2(r, 3), { x: 0, y: 0 });
    const g = cb.real.define((x, y) => x*x + y*y);
    const grad = cb.calc.grad(g, cb.vect.init(1, 2));
    assert.ok(Math.abs(grad.x - 2) < 1e-6 && Math.abs(grad.y - 4) < 1e-6);
    const grad2 = cb.calc.grad2(g, cb.vect.init(1, 2));
    assert.ok(Math.abs(grad2[0][0] - 2) < 1e-6 && Math.abs(grad2[0][1] - 0) < 1e-6 && Math.abs(grad2[1][0] - 0) < 1e-6 && Math.abs(grad2[1][1] - 2) < 1e-6);
    const dfdv = cb.calc.dfdv(g, cb.vect.init(1, 2), cb.vect.init(3, 4));
    assert.ok(Math.abs(dfdv - 4.4) < 1e-4);
    const F = cb.real.define((x, y) => x, (x, y) => y);
    assert.ok(Math.abs(cb.calc.div(F, cb.vect.init(5, 7)) - 2) < 1e-6);
    const G = cb.real.define((x, y) => -y, (x, y) => x);
    const curl = cb.calc.curl(G, cb.vect.init(5, 7));
    assert.ok(Math.abs(curl.x - 0) < 1e-9 && Math.abs(curl.y - 0) < 1e-9 && Math.abs(curl.z - 2) < 1e-4);
    const s = cb.real.define((x, y) => x + y);
    assert.ok(Math.abs(cb.calc.dfrdt(s, r, 1) - 3) < 1e-6);
}

// calc.tangent, calc.normal, calc.binormal, calc.curvature
{
    const circle = cb.real.define((t) => Math.cos(t), (t) => Math.sin(t), (t) => 0);
    const T = cb.calc.tangent(circle, 0);
    assert.ok(Math.abs(T.x - 0) < 1e-6 && Math.abs(T.y - 1) < 1e-6 && Math.abs(T.z - 0) < 1e-6);
    const N = cb.calc.normal(circle, 0);
    assert.ok(Math.abs(N.x + 1) < 1e-3 && Math.abs(N.y - 0) < 1e-3 && Math.abs(N.z - 0) < 1e-6);
    const B = cb.calc.binormal(circle, 0);
    assert.ok(Math.abs(B.x - 0) < 1e-3 && Math.abs(B.y - 0) < 1e-3 && Math.abs(B.z - 1) < 1e-3);
    const C = cb.calc.curvature(circle, 0);
    assert.ok(Math.abs(C - 1) < 1e-3);
}

// calc.dfdz, calc.d2fdz2, calc.fzdz
{
    const squared = cb.comp.define((a, b) => a*a - b*b, (a, b) => 2*a*b);
    const [dfa, dfb] = cb.calc.dfdz(squared, cb.comp.init(1, 2));
    assert.ok(Math.abs(dfa.a - 2) < 1e-5 && Math.abs(dfa.b - 4) < 1e-5 && Math.abs(dfb.a + 4) < 1e-5 && Math.abs(dfb.b - 2) < 1e-5);
    const [d2a, d2b] = cb.calc.d2fdz2(squared, cb.comp.init(1, 2));
    assert.ok(Math.abs(d2a.a - 2) < 1e-3 && Math.abs(d2a.b - 0) < 1e-3 && Math.abs(d2b.a + 2) < 1e-3 && Math.abs(d2b.b - 0) < 1e-3);
    const integral = cb.calc.fzdz(cb.comp.define((a, b) => 1, (a, b) => 0), cb.real.define((t) => t, (t) => 0), 0, 1);
    assert.ok(Math.abs(integral.a - 1) < 1e-3 && Math.abs(integral.b - 0) < 1e-3);
}

// calc.fxdx, calc.fxydxdy, calc.fds, calc.frds, calc.fnds, calc.mean
{
    const lin = cb.real.define((x) => x);
    assert.ok(Math.abs(cb.calc.fxdx(lin, 0, 1) - 0.5) < 1e-6);
    const one2d = cb.real.define((x, y) => 1);
    assert.ok(Math.abs(cb.calc.fxydxdy(one2d, 0, 1, 0, 1) - 1) < 1e-3);
    const segment = cb.real.define((t) => t, (t) => 0);
    assert.ok(Math.abs(cb.calc.fds(segment, 0, 1) - 1) < 1e-3);
    const plane = cb.real.define((s, t) => s, (s, t) => t, (s, t) => 0);
    assert.ok(Math.abs(cb.calc.fds(plane, 0, 1, 0, 1) - 1) < 1e-3);
    const scalarField = cb.real.define((x) => 1);
    assert.ok(Math.abs(cb.calc.frds(scalarField, segment, 0, 1) - 1) < 1e-4);
    const vectorField = cb.real.define((x, y) => 1, (x, y) => 0);
    assert.ok(Math.abs(cb.calc.frds(vectorField, segment, 0, 1) - 1) < 1e-4);
    const fluxField = cb.real.define((x, y) => 0, (x, y) => 1);
    assert.ok(Math.abs(cb.calc.fnds(fluxField, segment, 0, 1) - 1) < 1e-4);
    assert.ok(Math.abs(cb.calc.mean(lin, 0, 2) - 1) < 1e-6);
}

// calc.lim, calc.Newton, calc.Taylor, calc.extrema
{
    const f = cb.real.define((x) => x*x);
    assert.strictEqual(cb.calc.lim(f, 2), 4);
    assert.strictEqual(cb.calc.lim(cb.real.define((x) => x), Infinity), Infinity);
    assert.ok(Math.abs(cb.calc.Newton(cb.real.define((x) => x - 3), [-10, 10]) - 3) < 1e-6);
    assert.strictEqual(cb.calc.Taylor(f, 2, 0, 1), 4);
    assert.ok(Math.abs(cb.calc.Taylor(f, 2, 1, 1) - 6) < 1e-4);
    assert.ok(Math.abs(cb.calc.Taylor(f, 2, 2, 1) - 7) < 1e-3);
    assert.deepStrictEqual(cb.calc.extrema(f, [-2, 2]), [0]);
}

// calc.dft, calc.idft, calc.fft, calc.ifft, calc.rfft, calc.irfft, calc.fftfreq, calc.fftshift, calc.ifftshift
{
    const arr = [1, 2, 3, 4];
    const backDft = cb.calc.idft(cb.calc.dft(arr));
    assert.deepStrictEqual(backDft.map((z) => Math.round(z.a)), arr);
    const backFft = cb.calc.ifft(cb.calc.fft(arr));
    assert.deepStrictEqual(backFft.map((z) => Math.round(z.a)), arr);
    const spec = cb.calc.rfft(arr);
    const backRfft = cb.calc.irfft(spec, 4);
    assert.deepStrictEqual(backRfft.map((x) => Math.round(x)), arr);
    assert.deepStrictEqual(cb.calc.fftfreq(4, 1), [0, 0.25, -0.5, -0.25]);
    const cArr = [cb.comp.init(0, 0), cb.comp.init(1, 0), cb.comp.init(2, 0), cb.comp.init(3, 0)];
    assert.deepStrictEqual(cb.calc.fftshift(cArr), [cArr[2], cArr[3], cArr[0], cArr[1]]);
    assert.deepStrictEqual(cb.calc.ifftshift(cb.calc.fftshift(cArr)), cArr);
}

// calc.Fourier, calc.iFourier, calc.Laplace, calc.convolution, calc.correlation, calc.autocorrelation
{
    const ones = cb.real.define((x) => 1);
    const F = cb.calc.Fourier(ones, 0, 0, 10, 2000);
    assert.ok(Math.abs(F - (20 / cb.PI())) < 1e-2);
    const f = cb.calc.iFourier(ones, 0, 0, 10, 2000);
    assert.ok(Math.abs(f - 10) < 1e-2);
    const L = cb.calc.Laplace(ones, 1);
    assert.ok(Math.abs(L - (1 - Math.exp(-10))) < 1e-4);
    assert.ok(Math.abs(cb.calc.convolution(ones, ones, 0) - 200) < 1e-3);
    assert.ok(Math.abs(cb.calc.correlation(ones, ones, 0) - 200) < 1e-3);
    assert.ok(Math.abs(cb.calc.autocorrelation(ones, 0) - 200) < 1e-3);
}
