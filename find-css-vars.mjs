import fs from 'fs';

const dir = 'public/kuru-runtime/57d7b931e97a/_next/static/chunks/';
for (const f of fs.readdirSync(dir)) {
  if (!f.endsWith('.js')) continue;
  const c = fs.readFileSync(dir + f, 'utf8');
  if (c.includes('--vv-bg') || c.includes('--fg') || c.includes('--color-bg')) {
    console.log(f);
    const m = c.match(/--vv-bg:[^;\"\}]+/g);
    if (m) console.log(m);
    const m2 = c.match(/--fg:[^;\"\}]+/g);
    if (m2) console.log(m2);
  }
}

