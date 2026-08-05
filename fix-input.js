const fs = require('fs');
let content = fs.readFileSync('src/app/landing/page.tsx', 'utf8');

// Fix unclosed input tags
content = content.replace(/<input([^>]+)>/g, (match, p1) => {
  if (p1.trim().endsWith('/')) return match; // already self-closing
  return `<input${p1} />`;
});

fs.writeFileSync('src/app/landing/page.tsx', content);
console.log('Fixed input tags');
