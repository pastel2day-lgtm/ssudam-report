'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReportCharts from '@/components/ReportCharts';

import { useSurvey } from '@/context/SurveyContext';
import { EPTI_TYPES, EPTI_Q } from '@/utils/eptiData';

export default function ResultPage() {
  const router = useRouter();
  const { data, resetSurvey } = useSurvey();
  const [eptiResult, setEptiResult] = useState<any>(null);
  const [typeScores, setTypeScores] = useState<Record<number, number>>({});
  const [maxType, setMaxType] = useState<number>(1);
  const [unlocked, setUnlocked] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const PLUS_URL = process.env.NEXT_PUBLIC_PLUS_URL || '#';

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyForm, setApplyForm] = useState({ name: '', phone: '', email: '', consent: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.phone || !applyForm.email || !applyForm.consent) {
      alert('모든 필수 항목을 입력하고 동의해주세요.');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...applyForm, phone: applyForm.phone.replace(/-/g, '') }),
      });
      const data = await res.json();
      if (data.ok) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setShowApplyModal(false);
          setSubmitSuccess(false);
        }, 3000);
      } else {
        alert(data.error || '신청 중 오류가 발생했습니다.');
      }
    } catch (err) {
      alert('네트워크 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (Object.keys(data.eptiAnswers).length === 0) {
      // In a real app we might redirect to /landing
      // router.push('/landing');
    }

    const scores: Record<number, number> = {1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0, 8:0, 9:0};
    for (let i = 0; i < 36; i++) {
      const type = EPTI_Q[i]?.type;
      const val = data.eptiAnswers[i] || 3;
      if (type) {
        scores[type] += val;
      }
    }
    
    let mType = 1;
    let maxVal = -1;
    for (let t = 1; t <= 9; t++) {
      if (scores[t] > maxVal) {
        maxVal = scores[t];
        mType = t;
      }
    }
    
    setTypeScores(scores);
    setMaxType(mType);
    setEptiResult(EPTI_TYPES[mType] || EPTI_TYPES[1]);
  }, [data]);

  const handleRestart = () => {
    resetSurvey();
    router.push('/landing');
  };

  return (
    <div id="s-result" className="screen active" style={{ display: 'flex', background: '#F4F7F9' }}>
      <div className="wrap" style={{ paddingBottom: '100px', paddingTop: '0px' }}>
        
        {eptiResult ? (
          <>
            {/* Premium Hero Section */}
            <div className="fade-up visible" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)', margin: '0 -20px 48px -20px', padding: '60px 24px 48px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '200px', height: '200px', background: '#FFFFFF', filter: 'blur(100px)', opacity: 0.35, borderRadius: '50%' }}>

</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', position: 'relative', zIndex: 1 }}>
                <button onClick={handleRestart} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '13px', padding: '8px 14px', borderRadius: '100px', cursor: 'pointer', backdropFilter: 'blur(4px)' }}>
                  ← 다시 검사
                </button>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>EPTI PREMIUM REPORT</span>
              </div>

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--accent)', fontSize: '11px', fontWeight: '800', padding: '5px 12px', borderRadius: '100px', marginBottom: '16px', letterSpacing: '0.04em' }}>
                  {eptiResult.summary_keyword}
                </div>
                <h1 style={{ fontSize: '32px', fontWeight: '900', color: '#fff', marginBottom: '32px', letterSpacing: '-0.03em', lineHeight: '1.2' }}>
                  {eptiResult.name}
                </h1>
                
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', letterSpacing: '0.02em' }}>강점 요소</div>
                    <div style={{ fontSize: '13.5px', color: '#FFFFFF', fontWeight: '700', lineHeight: '1.5', wordBreak: 'keep-all' }}>{eptiResult.strength}</div>
                  </div>
                  <div style={{ flex: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '16px', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.7)', marginBottom: '8px', letterSpacing: '0.02em' }}>주의 요소</div>
                    <div style={{ fontSize: '13.5px', color: '#FFFFFF', fontWeight: '700', lineHeight: '1.5', wordBreak: 'keep-all' }}>{eptiResult.weakness}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* New Deep Analysis Section */}
            {eptiResult.comprehensive_report && (
              <div className="fade-up d1 visible" style={{ marginBottom: '48px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#191F28', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                  </span>
                  종합 심층 분석
                </h2>
                <div style={{ background: '#FFFFFF', border: '1px solid #E5E8EB', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
                  {eptiResult.comprehensive_report.map((para: string, idx: number) => (
                    <p key={idx} style={{ 
                      fontSize: '15px', 
                      color: '#333D4B', 
                      lineHeight: '1.8', 
                      fontWeight: '500', 
                      wordBreak: 'keep-all',
                      marginBottom: idx === eptiResult.comprehensive_report.length - 1 ? 0 : '20px'
                    }}>
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* New Section: Charts */}
            {Object.keys(typeScores).length > 0 && (
              <ReportCharts typeScores={typeScores} maxType={maxType} />
            )}

            {/* Section 2: Core Traits */}
            <div className="fade-up d1 visible" style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#191F28', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                관찰되는 핵심 성향
              </h2>
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E8EB', borderRadius: '24px', padding: '28px 24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {eptiResult.traits?.map((trait: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '15px', marginTop: '2px', fontWeight: '900' }}>✓</span>
                      <span style={{ fontSize: '15px', color: '#333D4B', lineHeight: '1.6', fontWeight: '500', wordBreak: 'keep-all' }}>{trait}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 3: Psychological Motives */}
            <div className="fade-up d2 visible" style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#191F28', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>
                  </span>
                  무의식적 내면 동기
                </h2>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
                겉으로 드러나는 행동의 밑바탕에 깔려 있는 근본적인 심리적 원인입니다.
              </p>
              <div style={{ background: '#FFFFFF', border: '1px solid #E5E8EB', borderRadius: '24px', padding: '28px 24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {eptiResult.motives?.map((motive: string, idx: number) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ minWidth: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%', marginTop: '9px' }}></div>
                      <span style={{ fontSize: '15px', color: '#333D4B', lineHeight: '1.6', fontWeight: '500', wordBreak: 'keep-all' }}>{motive}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Section 4: Defense Mechanisms */}
            <div className="fade-up d3 visible" style={{ marginBottom: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#191F28', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </span>
                  주요 방어기제 분석
                </h2>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.5' }}>
                스트레스나 불안이 고조될 때 무의식적으로 자신을 보호하는 핵심 패턴입니다.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {eptiResult.defenses?.map((def: any, idx: number) => (
                  <div key={idx} style={{ background: '#FFFFFF', border: '1px solid #E5E8EB', borderRadius: '20px', padding: '24px', boxShadow: '0 12px 32px rgba(0,0,0,0.03)' }}>
                    <div style={{ display: 'inline-block', fontSize: '13px', fontWeight: '800', color: '#fff', background: 'var(--accent)', padding: '4px 10px', borderRadius: '6px', marginBottom: '12px' }}>
                      {def.name}
                    </div>
                    <div style={{ fontSize: '15px', color: '#191F28', lineHeight: '1.65', fontWeight: '500', wordBreak: 'keep-all' }}>{def.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Stress Scenarios */}
            <div className="fade-up d4 visible" style={{ marginBottom: '56px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#191F28', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/><polyline points="13 11 9 17 15 17 11 23"/></svg>
                  </span>
                  대인관계 및 스트레스 반응
                </h2>
              </div>
              <div style={{ background: '#F8F9FA', border: '1px solid #E5E8EB', borderLeft: '4px solid var(--accent)', borderRadius: '8px 20px 20px 8px', padding: '24px' }}>
                <p style={{ margin: 0, fontSize: '15px', color: '#333D4B', lineHeight: '1.75', fontWeight: '500', wordBreak: 'keep-all' }}>
                  {eptiResult.scenarios}
                </p>
              </div>
            </div>

            {/* Section 6: Prescription */}
            <div className="fade-up d4 visible" style={{ marginBottom: '48px', background: 'linear-gradient(to bottom, #FFFFFF, #F8FAFC)', border: '1px solid #E5E8EB', borderRadius: '32px', padding: '40px 28px', boxShadow: '0 20px 60px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '32px' }}>
                <span style={{ background: '#E8F3FF', color: '#1B64DA', fontSize: '11px', fontWeight: '800', padding: '6px 14px', borderRadius: '100px', letterSpacing: '0.04em', marginBottom: '12px' }}>
                  EXPERT PRESCRIPTION
                </span>
                <h2 style={{ fontSize: '20px', fontWeight: '900', color: '#191F28', textAlign: 'center' }}>전문가 맞춤 행동 처방</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {eptiResult.prescriptions?.map((p: any, idx: number) => {
                  const isLocked = idx > 0 && !unlocked;
                  return (
                    <div
                      key={idx}
                      style={{
                        position: 'relative',
                        paddingLeft: '36px',
                        filter: isLocked ? 'blur(8px)' : 'none',
                        userSelect: isLocked ? 'none' : 'auto',
                        pointerEvents: isLocked ? 'none' : 'auto',
                        transition: 'filter 0.5s ease',
                      }}
                    >
                      <div style={{ position: 'absolute', left: 0, top: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '24px', height: '24px', background: isLocked ? '#A0AAB5' : '#1B64DA', color: '#fff', fontSize: '12px', fontWeight: '800', borderRadius: '50%' }}>
                        {idx + 1}
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#191F28', marginBottom: '10px', lineHeight: '1.4' }}>{p.title}</div>
                      <div style={{ fontSize: '14.5px', color: '#333D4B', lineHeight: '1.7', fontWeight: '500', wordBreak: 'keep-all' }}>{p.desc}</div>
                    </div>
                  );
                })}
              </div>

              {/* 게이팅: 무료 처방 1개만 개방, 나머지는 잠금 → Plus 유도 */}
              {!unlocked && (
                <div
                  style={{
                    marginTop: '12px',
                    borderRadius: '24px',
                    border: '1.5px solid rgba(27,100,218,0.2)',
                    background: '#F0F7FF',
                    padding: '32px 24px',
                    textAlign: 'center',
                    boxShadow: '0 8px 32px rgba(27,100,218,0.06)'
                  }}
                >
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#1B64DA', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                    처방 {Math.min(2, eptiResult.prescriptions?.length || 1)}개가 더 있어요
                  </div>
                  <div style={{ fontSize: '13.5px', color: '#333D4B', lineHeight: '1.65', marginBottom: '24px', wordBreak: 'keep-all' }}>
                    방어기제를 아는 걸 넘어, <strong style={{ color: '#191F28' }}>실제로 바꾸는 30일 케어</strong>가 필요해요.<br/>
                    무료 체험으로 전체 처방과 주간 실천 미션을 열어보세요.
                  </div>
                  <button
                    onClick={() => setShowPlus(true)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      border: 'none',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, #1B64DA, #0D49A8)',
                      color: '#fff',
                      fontSize: '16px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      letterSpacing: '-0.01em',
                      boxShadow: '0 8px 24px rgba(27,100,218,0.3)',
                    }}
                  >
                    무료 체험으로 전체 처방 열람하기
                  </button>
                  <div style={{ fontSize: '12px', color: '#8B95A1', marginTop: '12px', fontWeight: '500' }}>
                    7일 무료 · 월 7,900원 · 언제든 해지 가능
                  </div>
                </div>
              )}
            </div>
            
            {/* Disclaimer */}
            <div className="fade-up d5 visible" style={{ borderTop: '1px solid #E5E8EB', paddingTop: '32px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#8B95A1', lineHeight: '1.6', margin: 0, wordBreak: 'keep-all' }}>
                본 결과는 심리적 경향을 파악하기 위한 참고 자료로 제공되며,<br/>의학적 진단을 대신할 수 없습니다.
              </p>
            </div>

            {/* 후속 1:1 상담 CTA (업셀) */}
            <div className="fade-up d5 visible" style={{ marginTop: '32px', borderRadius: '28px', overflow: 'hidden', background: '#FFFFFF', border: '1px solid #E5E8EB', padding: '32px 24px', textAlign: 'center', boxShadow: '0 12px 40px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent)', letterSpacing: '0.08em', marginBottom: '12px' }}>전문가 1:1 심층 상담</div>
              <h3 style={{ fontSize: '19px', fontWeight: '900', color: '#191F28', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: '1.4' }}>
                처방만으로 충분하지 않을 때
              </h3>
              <p style={{ fontSize: '14px', color: '#333D4B', lineHeight: '1.7', marginBottom: '24px', wordBreak: 'keep-all', fontWeight: '500' }}>
                방어기제는 혼자 깨닫기 어려운 무의식 패턴이에요.<br/>
                임상심리전문가가 진단서를 바탕으로 <strong style={{ color: '#191F28' }}>맞춤 대화</strong>로 이어드려요.
              </p>
              <button
                onClick={() => setShowApplyModal(true)}
                style={{ width: '100%', padding: '16px', border: 'none', borderRadius: '16px', background: '#191F28', color: '#fff', fontSize: '16px', fontWeight: '800', cursor: 'pointer', letterSpacing: '-0.01em' }}
              >
                1:1 상담 신청하기
              </button>
              <div style={{ fontSize: '12px', color: '#8B95A1', marginTop: '12px', fontWeight: '500' }}>
                첫 상담 50% 혜택 · 진단서 연동
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
            심층 결과를 분석 중입니다...
          </div>
        )}
      </div>

      {/* Plus 상세 모달 */}
      {showPlus && (
        <div
          onClick={() => setShowPlus(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 1100, background: 'rgba(25,31,40,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '480px', background: '#FFFFFF', borderRadius: '32px 32px 0 0', padding: '32px 24px 40px', boxShadow: '0 -12px 60px rgba(0,0,0,0.1)' }}
          >
            <div style={{ width: '40px', height: '5px', background: '#E5E8EB', borderRadius: '100px', margin: '0 auto 24px' }} />
            <div style={{ fontSize: '28px', textAlign: 'center', marginBottom: '12px' }}>🌿</div>
            <h3 style={{ fontSize: '22px', fontWeight: '900', color: '#191F28', textAlign: 'center', marginBottom: '12px', lineHeight: '1.35', letterSpacing: '-0.02em' }}>
              무료 체험 7일로 시작하세요
            </h3>
            <p style={{ fontSize: '15px', color: '#4E5968', textAlign: 'center', lineHeight: '1.7', marginBottom: '28px', fontWeight: '500' }}>
              전체 처방이 즉시 열리고,<br/>진단 기록이 안전하게 보관됩니다.<br/>
              <strong style={{ color: '#1B64DA' }}>30일 케어 로드맵</strong>을 계속 받아보세요.
            </p>

            <div style={{ background: '#F8F9FA', border: '1px solid #E5E8EB', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '14px', color: '#4E5968', fontWeight: '600' }}>무료 체험</span>
                <span style={{ fontSize: '14px', color: '#1B64DA', fontWeight: '800' }}>7일 무료</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#4E5968', fontWeight: '600' }}>이후 이용료</span>
                <span style={{ fontSize: '14px', color: '#191F28', fontWeight: '800' }}>월 7,900원</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (PLUS_URL && PLUS_URL !== '#') {
                  window.location.href = PLUS_URL;
                } else {
                  setUnlocked(true);
                  setShowPlus(false);
                }
              }}
              style={{ width: '100%', padding: '18px', border: 'none', borderRadius: '16px', background: 'linear-gradient(135deg, #1B64DA, #0D49A8)', color: '#fff', fontSize: '16px', fontWeight: '800', cursor: 'pointer', letterSpacing: '-0.01em', marginBottom: '12px', boxShadow: '0 8px 24px rgba(27,100,218,0.25)' }}
            >
              무료 체험 시작하기
            </button>
            <button
              onClick={() => setShowPlus(false)}
              style={{ width: '100%', padding: '14px', background: 'none', border: 'none', color: '#8B95A1', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
            >
              다음에 할게요
            </button>
          </div>
        </div>
      )}
    
      {/* Apply Modal */}
      {showApplyModal && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 1200, background: 'rgba(25,31,40,0.6)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div style={{ width: '100%', maxWidth: '400px', background: '#FFFFFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 12px 60px rgba(0,0,0,0.1)' }}>
            
            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3182F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px', margin: '0 auto 16px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#191F28', marginBottom: '12px' }}>신청이 완료되었습니다!</h3>
                <p style={{ fontSize: '14px', color: '#4E5968', lineHeight: '1.6', wordBreak: 'keep-all' }}>담당자가 확인 후 빠르게 연락드리겠습니다.<br/>감사합니다.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#191F28', margin: 0 }}>전문가 1:1 상담 신청</h3>
                  <button type="button" onClick={() => setShowApplyModal(false)} style={{ background: 'none', border: 'none', fontSize: '20px', color: '#8B95A1', cursor: 'pointer', padding: '4px' }}>✕</button>
                </div>
                
                <p style={{ fontSize: '14px', color: '#4E5968', marginBottom: '24px', lineHeight: '1.5' }}>
                  심층 진단서를 바탕으로 전문가와 대화하며, 삶의 구체적인 개선 방향을 설계해보세요.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333D4B', marginBottom: '8px' }}>이름</label>
                    <input type="text" value={applyForm.name} onChange={e => setApplyForm({...applyForm, name: e.target.value})} placeholder="홍길동" required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E8EB', fontSize: '15px', color: '#191F28', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333D4B', marginBottom: '8px' }}>연락처</label>
                    <input type="tel" value={applyForm.phone} onChange={e => {
                      let val = e.target.value.replace(/[^0-9]/g, '');
                      if (val.length > 3 && val.length <= 7) val = val.slice(0,3) + '-' + val.slice(3);
                      else if (val.length > 7) val = val.slice(0,3) + '-' + val.slice(3,7) + '-' + val.slice(7,11);
                      setApplyForm({...applyForm, phone: val});
                    }} placeholder="010-1234-5678" required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E8EB', fontSize: '15px', color: '#191F28', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333D4B', marginBottom: '8px' }}>이메일</label>
                    <input type="email" value={applyForm.email} onChange={e => setApplyForm({...applyForm, email: e.target.value})} placeholder="example@email.com" required style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E5E8EB', fontSize: '15px', color: '#191F28', outline: 'none' }} />
                  </div>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={applyForm.consent} onChange={e => setApplyForm({...applyForm, consent: e.target.checked})} required style={{ marginTop: '2px', accentColor: 'var(--accent)' }} />
                    <span style={{ fontSize: '13px', color: '#4E5968', lineHeight: '1.5' }}>[필수] 개인정보 수집 및 이용에 동의합니다. 수집된 정보는 상담 진행 목적으로만 사용됩니다.</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ width: '100%', padding: '16px', border: 'none', borderRadius: '14px', background: isSubmitting ? '#A0AAB5' : '#191F28', color: '#fff', fontSize: '16px', fontWeight: '800', cursor: isSubmitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
                >
                  {isSubmitting ? '신청 처리 중...' : '신청 완료하기'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
</div>
  );
}
