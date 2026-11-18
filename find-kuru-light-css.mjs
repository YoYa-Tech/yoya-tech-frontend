import fs from 'fs';

const c = fs.readFileSync('public/kuru/styles.css', 'utf8');

const lines = c.split('\n');
lines.forEach((line, idx) => {
  if (line.includes('data-theme') || line.includes('theme="light"') || line.includes('html[data-theme')) {
    console.log(`L${idx + 1}: ${line}`);
    // print next 4 lines
    for (let j = 1; j <= 5; j++) {
      if (lines[idx + j]) console.log(`  ${lines[idx + j]}`);
    }
  }
});

