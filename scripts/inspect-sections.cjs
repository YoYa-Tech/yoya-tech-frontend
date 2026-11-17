const fs = require('fs');

const html = fs.readFileSync('kuru-page.html', 'utf8');

// Find main section tags or major container divs
const sectionMatches = [...html.matchAll(/<(?:section|header|footer)[^>]*id=["']?([^"'\s>]+)?["']?[^>]*class=["']([^"']+)["'][^>]*>/gi)];
console.log('Top level elements:');
sectionMatches.forEach(m => console.log(m[0]));

