const fs = require('fs');
let content = fs.readFileSync('src/app/landing/page.tsx', 'utf8');

content = content.replace(/stroke-width=/g, 'strokeWidth=');
content = content.replace(/maxlength=/g, 'maxLength=');
content = content.replace(/onmouseover=/g, 'onMouseOver=');
content = content.replace(/onmouseout=/g, 'onMouseOut=');

fs.writeFileSync('src/app/landing/page.tsx', content);
console.log('Fixed React DOM warnings');
