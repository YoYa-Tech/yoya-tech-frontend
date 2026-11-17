const fs = require('fs');
const html = fs.readFileSync('kuru-page.html', 'utf8');
const idx = html.indexOf('id="approach"');
if (idx !== -1) {
  console.log(html.slice(idx, idx + 2500));
}

