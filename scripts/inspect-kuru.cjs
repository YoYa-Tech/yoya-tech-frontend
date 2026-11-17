const fs = require('fs');

const html = fs.readFileSync('kuru-page.html', 'utf8');

// Find all img tags
const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
console.log('--- IMAGES (' + imgMatches.length + ' found) ---');
const uniqueImgs = [...new Set(imgMatches.map(m => m[1]))];
uniqueImgs.forEach(s => console.log(s));

// Find all background-image or url(...)
const urlMatches = [...html.matchAll(/url\(([^)]+)\)/gi)];
console.log('\n--- URLS IN CSS (' + urlMatches.length + ' found) ---');
const uniqueUrls = [...new Set(urlMatches.map(m => m[1].replace(/['"]/g, '')))];
uniqueUrls.forEach(u => console.log(u));

// Find all canvas
const canvasMatches = [...html.matchAll(/<canvas[^>]*>/gi)];
console.log('\n--- CANVASES (' + canvasMatches.length + ') ---');
canvasMatches.forEach(c => console.log(c[0]));

// Find script tags
const scriptMatches = [...html.matchAll(/<script[^>]+src=["']([^"']+)["'][^>]*>/gi)];
console.log('\n--- SCRIPTS (' + scriptMatches.length + ') ---');
scriptMatches.forEach(s => console.log(s[1]));

