const fs = require('fs');
const html = fs.readFileSync('kuru-page.html', 'utf8');
const matches = [...html.matchAll(/<[^>]+data-reveal[^>]*>/g)].map(m => m[0]);
console.log('Elements with data-reveal (' + matches.length + '):', matches.slice(0, 10));

