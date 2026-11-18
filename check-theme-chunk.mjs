import fs from 'fs';

const c = fs.readFileSync('public/kuru-runtime/57d7b931e97a/_next/static/chunks/9706-c1eb8ef2ddb3ac76.js', 'utf8');

const matches = c.match(/theme[^\"]{1,50}/g) || [];
console.log('Sample theme matches:', matches.slice(0, 10));

// Find next-themes or ThemeProvider
if (c.includes('next-themes')) {
  console.log('Contains next-themes!');
}
const idx = c.indexOf('data-theme');
if (idx !== -1) {
  console.log('Snippet around data-theme:');
  console.log(c.slice(Math.max(0, idx - 100), idx + 200));
}

