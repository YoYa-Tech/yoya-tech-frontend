import fs from 'fs';

const c = fs.readFileSync('public/kuru-runtime/57d7b931e97a/_next/static/chunks/9706-c1eb8ef2ddb3ac76.js', 'utf8');

// Find all occurrences of data-theme
const regex = /\[data-theme=[^\]]+\]/g;
const matches = c.match(regex) || [];
console.log('Matches:', Array.from(new Set(matches)));

// Find CSS variable definitions in js or styles
const vars = c.match(/--[a-zA-Z0-9_-]+:[^;\"\}]+/g) || [];
console.log('Sample vars:', vars.slice(0, 20));

