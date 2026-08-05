const fs = require('fs');
let content = fs.readFileSync('src/app/landing/page.tsx', 'utf8');

// Fix any font-family with double quotes inside style string conversions
content = content.replace(/fontFamily:\s*''([^']*)'([^']*)'/g, `fontFamily: "'$1'$2"`);

fs.writeFileSync('src/app/landing/page.tsx', content);
console.log('Fixed font-family syntax errors');
