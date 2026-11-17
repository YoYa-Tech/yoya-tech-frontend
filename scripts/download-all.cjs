const fs = require('fs');
const https = require('https');
const path = require('path');

const assetList = JSON.parse(fs.readFileSync('scripts/asset-list.json', 'utf8'));

// Filter out dynamic next/image query strings, but also decode their underlying media url if needed
const toDownload = [];

assetList.forEach(rawUrl => {
  if (rawUrl.startsWith('/kuru-runtime/') && rawUrl.includes('_next/image')) {
    // extract url param
    const match = rawUrl.match(/url=([^&]+)/);
    if (match) {
      const decoded = decodeURIComponent(match[1]);
      toDownload.push({
        remoteUrl: 'https://kuru-labs.vercel.app' + rawUrl.replace(/&amp;/g, '&'),
        localPath: path.join('public', decoded.replace(/^\//, ''))
      });
    }
    return;
  }

  // normal static asset
  const cleanPath = rawUrl.split('?')[0];
  if (cleanPath.startsWith('/_next/static/chunks') || cleanPath === '/kuru-runtime/seo') return;

  toDownload.push({
    remoteUrl: 'https://kuru-labs.vercel.app' + rawUrl,
    localPath: path.join('public', cleanPath.replace(/^\//, ''))
  });
});

console.log(`Prepared ${toDownload.length} items to download`);

async function downloadItem(item) {
  const dir = path.dirname(item.localPath);
  fs.mkdirSync(dir, { recursive: true });

  if (fs.existsSync(item.localPath)) {
    return; // skip if already downloaded
  }

  return new Promise((resolve) => {
    const req = https.get(item.remoteUrl, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // handle redirect
        https.get(res.headers.location, (redirRes) => {
          if (redirRes.statusCode !== 200) {
            console.log(`Failed redirect ${item.remoteUrl}: ${redirRes.statusCode}`);
            return resolve();
          }
          const stream = fs.createWriteStream(item.localPath);
          redirRes.pipe(stream);
          stream.on('finish', () => resolve());
        }).on('error', () => resolve());
        return;
      }
      if (res.statusCode !== 200) {
        console.log(`Failed ${item.remoteUrl}: ${res.statusCode}`);
        return resolve();
      }
      const stream = fs.createWriteStream(item.localPath);
      res.pipe(stream);
      stream.on('finish', () => resolve());
    });
    req.on('error', (err) => {
      console.log(`Error ${item.remoteUrl}: ${err.message}`);
      resolve();
    });
  });
}

(async () => {
  const batchSize = 10;
  for (let i = 0; i < toDownload.length; i += batchSize) {
    const batch = toDownload.slice(i, i + batchSize);
    await Promise.all(batch.map(downloadItem));
    process.stdout.write(`Downloaded ${Math.min(i + batchSize, toDownload.length)} / ${toDownload.length}\r`);
  }
  console.log('\nAll asset downloads completed!');
})();

