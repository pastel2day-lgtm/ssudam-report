const fs = require('fs');
let content = fs.readFileSync('src/app/landing/page.tsx', 'utf8');

// Fix onMouseOver="this.style.background='...'"
content = content.replace(/onMouseOver="this\.style\.([^=]+)='([^']+)'"/g, 'onMouseOver={(e) => e.currentTarget.style.$1=\\'$2\\'}');

// Fix onMouseOut="this.style.background='...'"
content = content.replace(/onMouseOut="this\.style\.([^=]+)='([^']+)'"/g, 'onMouseOut={(e) => e.currentTarget.style.$1=\\'$2\\'}');

// Catch any other this.style
content = content.replace(/onMouseOver="([^"]+)"/g, 'onMouseOver={(e) => {$1}}');
content = content.replace(/onMouseOut="([^"]+)"/g, 'onMouseOut={(e) => {$1}}');

fs.writeFileSync('src/app/landing/page.tsx', content);
console.log('Fixed event handlers');
