const fs = require('fs');
const css = fs.readFileSync('public/kuru/styles.css', 'utf8');
const urls = [...css.matchAll(/url\(([^)]+)\)/g)].map(m => m[1].replace(/['"]/g, '').trim());
console.log('URLs in styles.css:', [...new Set(urls)]);

