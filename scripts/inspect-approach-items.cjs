const fs = require('fs');
const html = fs.readFileSync('kuru-page.html', 'utf8');
const idx = html.indexOf('id="approach"');
const end = html.indexOf('</section>', idx);
const slice = html.slice(idx, end);
const h3s = [...slice.matchAll(/<h3[^>]*>(.*?)<\/h3>/g)].map(m => m[1]);
console.log('H3 headings in approach:', h3s);
const imgs = [...slice.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Images in approach:', imgs);

