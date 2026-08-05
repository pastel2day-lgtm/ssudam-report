'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSurvey } from '@/context/SurveyContext';

import { EPTI_Q } from '@/utils/eptiData';

export default function LoadingPage() {
  const router = useRouter();
  const { data } = useSurvey();

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
            headers: { 'Content-Type': 'application/json' },
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
      // Simulate minimum loading time for UX (at least 2.5s)
      setTimeout(() => {
        router.push('/result');
      }, 2500);
    });
    
  }, [router, data]);

  return (
    <div id="s-loading" className="screen active">
      <div style={{ textAlign: 'center', width: '100%', padding: '0 20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div id="loading-spinner-wrap" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40vh' }}>
          <div className="loader-ring"></div>
          <p className="loader-text" id="loader-msg">진단서를 작성하는 중...</p>
        </div>
      </div>
    </div>
  );
}
