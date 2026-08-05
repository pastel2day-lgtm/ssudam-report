const fs = require('fs');

const htmlPath = '/Users/dobedub/Documents/source/project2/recharge/public/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

// Extract s-landing
const startIndex = html.indexOf('<div id="s-landing"');
const endIndex = html.indexOf('<div id="s-q0"');
if (startIndex === -1 || endIndex === -1) {
  console.log('Could not find boundaries');
  process.exit(1);
}

let landingHtml = html.substring(startIndex, endIndex);

// 1. Convert class=" -> className="
landingHtml = landingHtml.replace(/class="/g, 'className="');

// 2. Convert onclick="..." -> onClick={() => router.push('/q0')} for relevant buttons
// For simplicity, we just replace all onclick with a dummy or router.push
landingHtml = landingHtml.replace(/onclick="[^"]*"/g, `onClick={() => router.push('/q0')}`);

// 3. Convert style="..." to style={{...}}
// Note: This regex is basic and handles simple styles.
landingHtml = landingHtml.replace(/style="([^"]*)"/g, (match, p1) => {
  if (!p1.trim()) return `style={{}}`;
  
  const rules = p1.split(';').filter(r => r.trim());
  let styleObj = '';
  rules.forEach(rule => {
    const parts = rule.split(':');
    if (parts.length >= 2) {
      let key = parts[0].trim();
      let value = parts.slice(1).join(':').trim();
      
      // camelCase the key
      key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      
      styleObj += `${key}: '${value}', `;
    }
  });
  return `style={{ ${styleObj} }}`;
});

// Remove some unneeded scripts or raw HTML comments
landingHtml = landingHtml.replace(/<!--[\s\S]*?-->/g, '');

const finalTsx = `'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // For original fade-up animations if needed
    const fadelist = document.querySelectorAll('.fade-up');
    fadelist.forEach(el => el.classList.add('visible'));
  }, []);

  return (
    <>
      ${landingHtml}
    </>
  );
}
`;

fs.writeFileSync('src/app/landing/page.tsx', finalTsx);
console.log('Successfully extracted and converted landing page');
