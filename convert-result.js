const fs = require('fs');

const htmlPath = '/Users/dobedub/Documents/source/project2/recharge/public/index.html';
const html = fs.readFileSync(htmlPath, 'utf8');

const startIndex = html.indexOf('<div id="s-result" class="screen">');
const endIndex = html.indexOf('<div id="onboarding-overlay"');
let sResult = html.substring(startIndex, endIndex);

// Convert HTML to JSX
sResult = sResult.replace(/class=/g, 'className=');
sResult = sResult.replace(/onclick="[^"]*"/g, '');
sResult = sResult.replace(/onkeydown="[^"]*"/g, '');
sResult = sResult.replace(/onsubmit="[^"]*"/g, '');
sResult = sResult.replace(/<!--[\s\S]*?-->/g, ''); // Remove HTML comments

// Convert style string to style objects
sResult = sResult.replace(/style="([^"]*)"/g, (match, styleString) => {
  const styles = styleString.split(';').filter(s => s.trim().length > 0);
  const styleObj = {};
  styles.forEach(s => {
    const [key, ...valueArr] = s.split(':');
    if (!key || valueArr.length === 0) return;
    const value = valueArr.join(':').trim();
    // camelCase the key
    const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    styleObj[camelKey] = value;
  });
  return `style={${JSON.stringify(styleObj)}}`;
});

// Fix unclosed tags
sResult = sResult.replace(/<br>/g, '<br/>');
sResult = sResult.replace(/<img([^>]+)>/g, (match, p1) => {
  if (p1.trim().endsWith('/')) return match;
  return `<img${p1}/>`;
});
sResult = sResult.replace(/<input([^>]+)>/g, (match, p1) => {
  if (p1.trim().endsWith('/')) return match;
  return `<input${p1}/>`;
});

// SVG fixes
sResult = sResult.replace(/stroke-width/g, 'strokeWidth');
sResult = sResult.replace(/stroke-linecap/g, 'strokeLinecap');
sResult = sResult.replace(/stroke-linejoin/g, 'strokeLinejoin');

// Remove unknown attributes
sResult = sResult.replace(/ netlify/g, '');
sResult = sResult.replace(/-honeypot="bot-field"/g, '');

// React DOM properties
sResult = sResult.replace(/autocomplete/g, 'autoComplete');
sResult = sResult.replace(/inputmode/g, 'inputMode');
sResult = sResult.replace(/onfocus="[^"]*"/g, '');
sResult = sResult.replace(/onblur="[^"]*"/g, '');
sResult = sResult.replace(/oninput="[^"]*"/g, '');
sResult = sResult.replace(/ for="/g, ' htmlFor="');

// Inject eptiResult variables
sResult = sResult.replace(
  />\s*과잉 적응 및 완벽주의적 회피 메커니즘 고착 상태\s*</g,
  '>{eptiResult?.name || "분석 중..."}<'
);
sResult = sResult.replace(
  />\s*외부 기대에 맞추려 자신의 한계를 넘어서는 과정에서 무의식적 보호 메커니즘이 활성화된 상태입니다\.\s*</g,
  '>{eptiResult?.desc || ""}<'
);
sResult = sResult.replace(
  /id="hero-stat-ex"[^>]*>고위험 소진</g,
  'id="hero-stat-ex">{eptiResult?.fear || "로딩 중..."}<'
);
sResult = sResult.replace(
  /id="hero-stat-df"[^>]*>과각성 방어</g,
  'id="hero-stat-df">{eptiResult?.core || "로딩 중..."}<'
);
sResult = sResult.replace(
  />1:1 경계선 설정</g,
  '>{eptiResult?.missions?.[0]?.title || "맞춤 처방"}<'
);

// Make screen active
sResult = sResult.replace(/className="screen"/g, 'className="screen active"');

const out = `
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSurvey } from '@/context/SurveyContext';
import { EPTI_TYPES, EPTI_Q } from '@/utils/eptiData';

export default function ResultPage() {
  const router = useRouter();
  const { data } = useSurvey();
  const [eptiResult, setEptiResult] = useState<any>(null);

  useEffect(() => {
    if (Object.keys(data.eptiAnswers).length === 0) {
      return;
    }

    const typeScores: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
    for (let i = 0; i < 36; i++) {
      const type = EPTI_Q[i]?.type;
      const val = data.eptiAnswers[i] || 3;
      if (type) {
        typeScores[type] += val;
      }
    }
    
    let maxType = 1;
    let maxVal = -1;
    for (let t = 1; t <= 9; t++) {
      if (typeScores[t] > maxVal) {
        maxVal = typeScores[t];
        maxType = t;
      }
    }
    
    setEptiResult(EPTI_TYPES[maxType]);
  }, [data]);

  return (
    ${sResult}
  );
}
`;

fs.writeFileSync('src/app/result/page.tsx', out);
console.log('Result page generated');
