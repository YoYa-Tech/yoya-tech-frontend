const fs = require('fs');

const html = fs.readFileSync('kuru-page.html', 'utf8');

const assetUrls = new Set();

// 1. From img tags & srcsets
const srcMatches = [...html.matchAll(/(?:src|srcset)=["']([^"']+)["']/gi)];
srcMatches.forEach(m => {
  const val = m[1];
  const parts = val.split(/,\s*/);
  parts.forEach(p => {
    const url = p.trim().split(/\s+/)[0];
    if (url.startsWith('/') && !url.startsWith('/_next/static/chunks')) {
      assetUrls.add(url);
    }
  });
});

// 2. From url(...) in html
const cssUrls = [...html.matchAll(/url\(([^)]+)\)/gi)];
cssUrls.forEach(m => {
  const u = m[1].replace(/['"]/g, '').trim();
  if (u.startsWith('/') && !u.startsWith('/_next/static/chunks')) {
    assetUrls.add(u);
  }
});

// 3. From scripts/kuru-js files
if (fs.existsSync('scripts/kuru-js')) {
  fs.readdirSync('scripts/kuru-js').forEach(f => {
    const c = fs.readFileSync('scripts/kuru-js/' + f, 'utf8');
    const matches = [...c.matchAll(/["'](\/(?:kuru|approach|team|tech|platforms|intro|cursor)[^"']+)["']/g)];
    matches.forEach(m => assetUrls.add(m[1]));
  });
}

// 4. From design.md
if (fs.existsSync('designmd-kuru-labs-vercel-app/design.md')) {
  const c = fs.readFileSync('designmd-kuru-labs-vercel-app/design.md', 'utf8');
  const matches = [...c.matchAll(/url\(([^)]+)\)/g)];
  matches.forEach(m => {
    const u = m[1].replace(/['"]/g, '').trim();
    if (u.startsWith('/')) assetUrls.add(u);
  });
}

// Add known extra endpoints
assetUrls.add('/kuru/shaders/hero.frag?v=57d7b931e97a');
assetUrls.add('/kuru/intro-covers.js?v=57d7b931e97a');
assetUrls.add('/kuru/data.js?v=57d7b931e97a');
assetUrls.add('/kuru/experience.js?v=57d7b931e97a');
assetUrls.add('/kuru/images/mark-green.svg?v=57d7b931e97a');
assetUrls.add('/cursor/arrow.svg');

const sorted = [...assetUrls].sort();
console.log(`Total unique assets found: ${sorted.length}`);
sorted.forEach(u => console.log(u));
fs.writeFileSync('scripts/asset-list.json', JSON.stringify(sorted, null, 2));

