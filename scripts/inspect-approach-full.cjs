const fs = require('fs');
const html = fs.readFileSync('kuru-page.html', 'utf8');
const idx = html.indexOf('id="approach"');
const end = html.indexOf('</section>', idx);
console.log(html.slice(idx, end));

