const fs = require('fs');
const html = fs.readFileSync('kuru-page.html', 'utf8');
const idx = html.indexOf('id="faqs"');
const end = html.indexOf('</section>', idx);
console.log(html.slice(idx, end));

