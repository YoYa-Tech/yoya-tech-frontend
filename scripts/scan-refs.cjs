const fs = require('fs');

fs.readdirSync('scripts/kuru-js').forEach(f => {
  const content = fs.readFileSync('scripts/kuru-js/' + f, 'utf8');
  const imports = [...content.matchAll(/from\s+["']([^"']+)["']/g)].map(m => m[1]);
  const fetches = [...content.matchAll(/fetch\(["']([^"']+)["']/g)].map(m => m[1]);
  const urls = [...content.matchAll(/["'](\/[a-zA-Z0-9_\-\.\/\?=&]+)["']/g)].map(m => m[1]);
  console.log(f, 'imports:', imports, 'fetches:', fetches, 'urls:', urls.slice(0, 10));
});

