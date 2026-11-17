const fs = require('fs');
const https = require('https');
const path = require('path');

const files = [
  'intro.js',
  'hero-background.js',
  'build-section.js',
  'seo.js',
  'chrome.js',
  'ripple.js',
  'sections.js',
  'workspace.js',
  'pages.js'
];

fs.mkdirSync('scripts/kuru-js', { recursive: true });

async function download(file) {
  const url = `https://kuru-labs.vercel.app/kuru/${file}?v=57d7b931e97a`;
  const dest = path.join('scripts/kuru-js', file);
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed ${file}: ${res.statusCode}`);
        return resolve();
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        console.log(`Downloaded ${file}`);
        resolve();
      });
    }).on('error', reject);
  });
}

(async () => {
  for (const f of files) {
    await download(f);
  }
})();

