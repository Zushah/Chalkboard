/*
    Chalkboard
    Version 3.0.1 Euler
    Released March 9th, 2026
    Authored by Zushah: https://www.github.com/Zushah
    Example Program: Telemetry Dashboard
*/

// Initialize the JavaScript Canvas API
const ctx = document.getElementById("canvas").getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Initialize Chalkboard
const cb = Chalkboard;

// Setup for graph
const marginTop = 120;
const marginBottom = 60;
const marginLeft = 80;
const marginRight = 60;
const plotWidth = canvas.width - marginLeft - marginRight;
const plotHeight = canvas.height - marginTop - marginBottom;

// Setup for data stream and analysis
const windowSize = 10;
const visiblePoints = Math.floor(plotWidth / 8);
const maxPoints = visiblePoints + windowSize;
const outliers = [false];
const data = [0];
for (let i = 1; i < maxPoints; i++) {
    let step = (Math.random() - 0.5) * 5;
    if (Math.random() < 0.03) step *= 8;
    data.push(data[i - 1] + step);
}
const initialZ = cb.stat.zscored(data);
for (let i = 1; i < maxPoints; i++) outliers.push(Math.abs(initialZ[i]) > 2.5);

// Track absolute time/steps for the axis labels
let globalStep = maxPoints;

// Variables for smooth auto-scaling
let currentMin = cb.stat.min(data);
let currentMax = cb.stat.max(data);
let tickCounter = 0;

const main = () => {
    // Update the data stream
    if (tickCounter % 3 === 0) {
        let step = (Math.random() - 0.5) * 5;
        if (Math.random() < 0.03) step *= 8; 
        
        const newVal = data[data.length - 1] + step;
        data.push(newVal);

        // Determine outliers based on the current mean and deviation
        const mean = cb.stat.mean(data);
        const dev = cb.stat.deviation(data);
        const z = dev === 0 ? 0 : (newVal - mean) / dev;
        outliers.push(Math.abs(z) > 2.5);

        // Shift old data out of the buffer
        data.shift(); 
        outliers.shift();
        
        globalStep++;
    }
    tickCounter++;

    // Perform statistical analysis
    const smoothed = cb.stat.meanMoving(data, windowSize);
    const mean = cb.stat.mean(data);
    const dev = cb.stat.deviation(data);
    const latestValue = data[data.length - 1];

    // Smooth auto-scaling
    const visibleData = data.slice(windowSize);
    const targetMin = cb.stat.min(visibleData) - 10;
    const targetMax = cb.stat.max(visibleData) + 10;
    currentMin += (targetMin - currentMin) * 0.05;
    currentMax += (targetMax - currentMax) * 0.05;
    const range = currentMax - currentMin;

    // Helpers to map data values to screen coordinates
    const mapX = (index) => cb.numb.map(index, [windowSize, windowSize + visiblePoints - 1], [marginLeft, marginLeft + plotWidth]);
    const mapY = (val) => cb.numb.map(val, [currentMin, currentMax], [marginTop, marginTop + plotHeight]);

    // Draw background
    ctx.fillStyle = "rgb(15, 15, 20)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgb(25, 25, 30)";
    ctx.fillRect(marginLeft, marginTop, plotWidth, plotHeight);
    
    // Draw dynamic grid
    ctx.lineWidth = 1;
    ctx.font = "14px monospace";
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.beginPath();
    for (let i = 0; i <= 4; i++) {
        const y = marginTop + (i / 4) * plotHeight;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.moveTo(marginLeft, y);
        ctx.lineTo(marginLeft + plotWidth, y);
        const val = currentMax - (i / 4) * range;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(val.toFixed(1), marginLeft - 10, y);
    }
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.beginPath();
    for (let i = 0; i <= 4; i++) {
        const x = marginLeft + (i / 4) * plotWidth;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.moveTo(x, marginTop);
        ctx.lineTo(x, marginTop + plotHeight);
        const val = (globalStep - visiblePoints) + (i / 4) * visiblePoints;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText(Math.floor(val).toString(), x, marginTop + plotHeight + 10);
    }
    ctx.stroke();

    // Begin data stream graph
    ctx.save();
    ctx.beginPath();
    ctx.rect(marginLeft, marginTop, plotWidth, plotHeight);
    ctx.clip();

    // Draw trendline using a 4th-degree polynomial regression
    const midStart = windowSize + Math.floor(visiblePoints * 0.3);
    const midEnd = windowSize + Math.floor(visiblePoints * 0.7);
    const subset = [];
    for (let i = midStart; i <= midEnd; i++) subset.push([mapX(i), data[i]]);
    const f = cb.stat.regression(subset, "polynomial", 4);
    ctx.strokeStyle = "rgb(255, 200, 50)";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    for (let x = mapX(midStart); x <= mapX(midEnd); x += 2) {
        const yVal = f.rule(x);
        if (x === mapX(midStart)) ctx.moveTo(x, mapY(yVal));
        else ctx.lineTo(x, mapY(yVal));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw raw data stream
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
        const px = mapX(i), py = mapY(data[i]);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
    }
    ctx.stroke();
    for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.arc(mapX(i), mapY(data[i]), 2, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw moving average of data stream
    ctx.strokeStyle = "rgba(100, 220, 255, 0.9)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    for (let i = 0; i < smoothed.length; i++) {
        const xIndex = i + windowSize - 1; 
        if (i === 0) ctx.moveTo(mapX(xIndex), mapY(smoothed[i]));
        else ctx.lineTo(mapX(xIndex), mapY(smoothed[i]));
    }
    ctx.stroke();

    // Highlight outliers
    for (let i = 0; i < data.length; i++) {
        if (outliers[i]) { 
            const px = mapX(i), py = mapY(data[i]);
            ctx.fillStyle = "rgba(255, 80, 80, 0.3)";
            ctx.beginPath();
            ctx.arc(px, py, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "rgb(255, 80, 80)";
            ctx.beginPath();
            ctx.arc(px, py, 4, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // End data stream graph
    ctx.restore();

    // Draw the HUD
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.font = "bold 36px monospace";
    const drawMetric = (label, value, xOffset) => {
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        ctx.fillRect(marginLeft + xOffset, 30, 220, 70);
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.font = "14px monospace";
        ctx.fillText(label, marginLeft + xOffset + 15, 55);
        ctx.fillStyle = "white";
        ctx.font = "bold 24px monospace";
        ctx.fillText(value, marginLeft + xOffset + 15, 85);
    };
    drawMetric("LATEST VALUE", latestValue.toFixed(3), 0);
    drawMetric("GLOBAL MEAN", mean.toFixed(3), 240);
    drawMetric("GLOBAL STANDARD DEVIATION", dev.toFixed(3), 480);
    drawMetric("LOCAL MIN / MAX", `${(targetMin + 10).toFixed(1)} / ${(targetMax - 10).toFixed(1)}`, 720);

    // Borders
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    ctx.strokeRect(marginLeft, marginTop, plotWidth, plotHeight);

    window.requestAnimationFrame(main);
};
main();
