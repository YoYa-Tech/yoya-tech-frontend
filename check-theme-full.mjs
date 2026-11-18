import fs from 'fs';

const c = fs.readFileSync('public/kuru-runtime/57d7b931e97a/_next/static/chunks/9706-c1eb8ef2ddb3ac76.js', 'utf8');

const idx = c.indexOf('data-theme');
console.log(c.slice(idx - 150, idx + 800));

