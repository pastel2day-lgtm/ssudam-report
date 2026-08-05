'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSurvey } from '@/context/SurveyContext';
import { EPTI_Q } from '@/utils/eptiData';

const PAGE_SIZE = 6;
const TOTAL_PAGES = Math.ceil(EPTI_Q.length / PAGE_SIZE);

export default function EptiPage() {
  const router = useRouter();
  const { updateData } = useSurvey();
  
  const [currentPage, setCurrentPage] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const startIndex = currentPage * PAGE_SIZE;
  const currentQuestions = EPTI_Q.slice(startIndex, startIndex + PAGE_SIZE);

  const handleSelect = (qIndex: number, score: number) => {
    setAnswers(prev => ({ ...prev, [qIndex]: score }));
  };

  const handleNext = () => {
    // Check if all questions on this page are answered
    for (let i = startIndex; i < startIndex + PAGE_SIZE; i++) {
      if (i < EPTI_Q.length && !answers[i]) return;
    }

    if (currentPage < TOTAL_PAGES - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      // Finished
      updateData('eptiAnswers', answers);
      router.push('/loading');
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    } else {
      router.back();
    }
  };

  // Are all answered on current page?
  const isPageComplete = currentQuestions.every((_, idx) => !!answers[startIndex + idx]);
  const progressPct = Math.round((startIndex / EPTI_Q.length) * 100);

  return (
    <div id="s-epti" className="screen epti-screen active" style={{ display: 'flex' }}>
      <div className="wrap">
        <button onClick={handleBack} className="back-btn">← 뒤로</button>
        <p className="q-label fade-up visible">2단계 · EPTI 성향 진단</p>
        <div className="epti-intro-title fade-up d1 visible">나의 방어기제를 만든<br/><span style={{ color: 'var(--accent)' }}>무의식 동기 척도</span></div>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }} className="fade-up d2 visible">
          MBTI가 사고 방식을 본다면, EPTI는 그 행동을 만들어내는 <strong>근본 동기</strong>를 봅니다.<br/>
          총 36문항 · 직관적으로 답해 주세요.
        </p>

        <div style={{ marginBottom: '28px', background: 'var(--surface2)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(166,124,82,0.1)' }} className="fade-up d2 visible">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--accent)' }}>진행도 {progressPct}%</div>
            <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)' }}>
              Q<span style={{ color: 'var(--text)' }}>{startIndex + 1}</span> / {EPTI_Q.length}
            </div>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'var(--surface3)', borderRadius: '100px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPct}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent), #B8926A)', borderRadius: '100px', transition: 'width 0.4s ease' }}></div>
          </div>
        </div>

        <div className="epti-q-list fade-up d3 visible">
          {currentQuestions.map((q, localIdx) => {
            const globalIdx = startIndex + localIdx;
            return (
              <div key={globalIdx} style={{ marginBottom: '24px', background: '#fff', padding: '24px 20px', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 4px 16px rgba(0,0,0,0.02)' }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)', marginBottom: '24px', lineHeight: '1.5' }}>
                  <span style={{ color: 'var(--accent)', marginRight: '6px' }}>Q{globalIdx + 1}.</span> {q.text}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '12px', padding: '0 10px' }}>
                  {/* Background line for the scale */}
                  <div style={{ position: 'absolute', top: '50%', left: '10px', right: '10px', height: '4px', background: 'var(--surface3)', transform: 'translateY(-50%)', zIndex: 1, borderRadius: '2px' }}></div>
                  
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = answers[globalIdx] === val;
                    return (
                      <div 
                        key={val} 
                        onClick={() => handleSelect(globalIdx, val)}
                        style={{ 
                          position: 'relative',
                          zIndex: 2,
                          width: isSelected ? '28px' : '22px', 
                          height: isSelected ? '28px' : '22px', 
                          borderRadius: '50%', 
                          background: isSelected ? 'var(--accent)' : '#fff',
                          border: isSelected ? 'none' : '2px solid #D6DCE5',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: isSelected ? '0 4px 12px rgba(166,124,82,0.3)' : 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isSelected && <div style={{ width: '10px', height: '10px', background: '#fff', borderRadius: '50%' }}></div>}
                      </div>
                    );
                  })}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: '600', padding: '0 2px' }}>
                  <span>전혀 아니다</span>
                  <span>매우 그렇다</span>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          className="btn-full fade-up d4 visible" 
          disabled={!isPageComplete}
          onClick={handleNext}
        >
          {currentPage === TOTAL_PAGES - 1 ? '제출하기 →' : '다음으로 →'}
        </button>
      </div>
    </div>
  );
}
