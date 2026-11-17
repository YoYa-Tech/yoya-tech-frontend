const fs = require('fs');
const svg = fs.readFileSync('public/kuru/images/tools.svg', 'utf8');
const symbols = [...svg.matchAll(/id=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Symbols in tools.svg (' + symbols.length + '):', symbols);

