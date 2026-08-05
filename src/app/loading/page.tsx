'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSurvey } from '@/context/SurveyContext';

import { EPTI_Q } from '@/utils/eptiData';

const LOADING_MESSAGES = [
  "답변을 종합하여 성향을 분석하고 있어요...",
  "무의식 속에 숨겨진 방어기제를 찾고 있어요...",
  "나만을 위한 맞춤형 심층 리포트를 작성하고 있어요..."
];

export default function LoadingPage() {
  const router = useRouter();
  const { data } = useSurvey();
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let eptiString = '';
    
    // Calculate ordered EPTI string
    if (Object.keys(data.eptiAnswers).length > 0) {
      const typeScores: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
      for (let i = 0; i < 36; i++) {
        const type = EPTI_Q[i]?.type;
        const val = data.eptiAnswers[i] || 3;
        if (type) {
          typeScores[type] += val;
        }
      }
      
      const sortedTypes = Object.entries(typeScores)
        .map(([type, score]) => ({ type: Number(type), score }))
        .sort((a, b) => b.score - a.score);
        
      eptiString = sortedTypes.map(t => t.type).join(' > ');
    }

    const submitToGoogleSheets = async () => {
      const url = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
      if (url) {
        try {
          await fetch(url, {
            method: 'POST',
            mode: 'no-cors', // Ignore CORS response 
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify({
              q0: data.track,
              q1: data.q1,
              q2: data.q2,
              q3: data.q3,
              epti: eptiString
            }),
          });
        } catch (e) {
          console.error('Failed to submit to Google Sheets:', e);
        }
      }
    };

    submitToGoogleSheets().finally(() => {
      // Simulate minimum loading time for UX (at least 3.6s to show all messages)
      setTimeout(() => {
        router.push('/result');
      }, 3600);
    });
    
  }, [router, data]);

  return (
    <div id="s-loading" className="screen active">
      <div style={{ textAlign: 'center', width: '100%', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div id="loading-spinner-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40vh' }}>
          <div className="loader-ring"></div>
          <p className="loader-text" id="loader-msg" style={{ transition: 'opacity 0.3s ease-in-out' }}>
            {LOADING_MESSAGES[msgIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}
