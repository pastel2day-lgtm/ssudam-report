'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSurvey } from '@/context/SurveyContext';

export default function LandingPage() {
  const router = useRouter();
  const { resetSurvey } = useSurvey();

  useEffect(() => {
    // For original fade-up animations if needed
    const fadelist = document.querySelectorAll('.fade-up');
    fadelist.forEach(el => el.classList.add('visible'));
    
    // Always start fresh when hitting the landing page
    resetSurvey();
  }, [resetSurvey]);

  return (
    <>
      <div id="s-landing" className="screen active">
  <div className="land-wrap" style={{ paddingBottom: '60px',  }}>

    <div id="beta-mode-bar" style={{ display: 'none', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', margin: '-10px 0 16px', borderRadius: '10px', background: '#F9FAFB', color: '#6B7684',  }}>
      <span style={{ fontSize: '11px', fontWeight: '600',  }}>베타 기능을 사용 중이에요</span>
      <button onClick={() => router.push('/q0')} style={{ fontSize: '11px', color: '#6B7684', background: 'none', border: 'none', cursor: 'pointer', padding: '4px',  }}>베타 모드 종료</button>
    </div>


    
    <div id="plus-welcome-banner" style={{ display: 'none', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px',  }}>
      <div style={{ background: 'linear-gradient(135deg,rgba(166,124,82,0.1),rgba(184,146,106,0.07))', border: '1.5px solid rgba(166,124,82,0.3)', borderRadius: '16px', padding: '14px 16px',  }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px',  }}>
          <span style={{ fontSize: '10px', fontWeight: '800', color: '#fff', background: 'linear-gradient(135deg,#A67C52,#B8926A)', borderRadius: '20px', padding: '3px 10px', letterSpacing: '.08em',  }}>CERTIFIED</span>
          <span id="plus-streak-badge" style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '700',  }}></span>
        </div>
        <div id="plus-welcome-msg" style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text)', lineHeight: '1.4', marginBottom: '4px',  }}></div>
        <div id="plus-welcome-sub" style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6',  }}></div>
      </div>
    </div>

    
    <div id="yesterday-mission-banner" style={{ display: 'none', background: 'rgba(255,149,0,0.06)', border: '1.5px solid rgba(255,149,0,0.22)', borderRadius: '14px', padding: '13px 16px', marginBottom: '12px', textAlign: 'left',  }}>
      <div style={{ fontSize: '11px', color: '#FF9500', fontWeight: '700', letterSpacing: '.06em', marginBottom: '5px',  }}>지난 미션 확인</div>
      <div id="yesterday-mission-text" style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)', marginBottom: '10px', lineHeight: '1.5',  }}></div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '10px',  }}>어제 처방받은 행동, 실천해 보셨나요?</div>
      <div style={{ display: 'flex', gap: '8px',  }}>
        <button onClick={() => router.push('/q0')} style={{ flex: '1', padding: '9px 6px', background: 'rgba(166,124,82,0.1)', border: '1px solid rgba(166,124,82,0.3)', borderRadius: '10px', fontSize: '13px', color: 'var(--accent)', fontWeight: '700', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif",  }}>실천했어요</button>
        <button onClick={() => router.push('/q0')} style={{ flex: '1', padding: '9px 6px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '13px', color: 'var(--text)', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif",  }}>조금 했어요</button>
        <button onClick={() => router.push('/q0')} style={{ flex: '1', padding: '9px 6px', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif",  }}>못 했어요</button>
      </div>
    </div>

    
    <div id="return-shortcut-banner" style={{ display: 'none', alignItems: 'center', gap: '12px', background: 'rgba(166,124,82,0.07)', border: '1.5px solid rgba(166,124,82,0.22)', borderRadius: '14px', padding: '13px 16px', marginBottom: '12px',  }}>
      <span style={{ fontSize: '20px', flexShrink: '0',  }}>🌱</span>
      <div style={{ flex: '1',  }}>
        <div id="return-banner-label" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', lineHeight: '1.5',  }}>다시 찾아주셨네요 — 오늘의 마음도 살펴볼까요?</div>
        <button onClick={() => router.push('/q0')} style={{ marginTop: '8px', padding: '9px 16px', background: 'var(--accent)', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", WebkitTapHighlightColor: 'transparent',  }}>
            무료 진단 이어서 하기 →
        </button>
      </div>
    </div>

    
    

    <div id="epti-shortcut-card" style={{ display: 'none', marginBottom: '16px', borderRadius: '18px', overflow: 'hidden', background: 'linear-gradient(135deg,rgba(166,124,82,0.08),rgba(196,142,96,0.05))', border: '1.5px solid rgba(166,124,82,0.22)',  }}>

      
      <div style={{ padding: '16px 18px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',  }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px',  }}>
          <div id="epti-shortcut-emoji" style={{ fontSize: '32px', lineHeight: '1',  }}></div>
          <div>
            <div style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: '700', letterSpacing: '.08em', marginBottom: '2px',  }}>  EPTI  · </div>
            <div id="epti-shortcut-type" style={{ fontSize: '17px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.02em',  }}></div>
          </div>
        </div>
        <button onClick={() => router.push('/q0')}
          style={{ padding: '9px 16px', border: '1px solid rgba(166,124,82,0.4)', borderRadius: '10px', background: 'rgba(166,124,82,0.1)', color: 'var(--accent)', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", whiteSpace: 'nowrap', WebkitTapHighlightColor: 'transparent',  }}>
           
        </button>
      </div>

      
      <div style={{ padding: '0 14px 14px', display: 'flex', gap: '8px',  }}>
        <button onClick={() => router.push('/q0')}
          style={{ flex: '1', padding: '11px', border: 'none', borderRadius: '12px', background: 'linear-gradient(135deg,var(--accent),#C48E60)', color: '#FFFFFF', fontSize: '13px', fontWeight: '800', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", boxShadow: '0 0 16px rgba(166,124,82,0.25)', WebkitTapHighlightColor: 'transparent',  }}>
             
        </button>
        <button onClick={() => router.push('/q0')}
          style={{ padding: '11px 14px', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(30,26,20,0.04)', color: 'var(--text-muted)', fontSize: '12px', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", whiteSpace: 'nowrap', WebkitTapHighlightColor: 'transparent',  }}>↺ 
        </button>
      </div>
    </div>
    


    
    <div style={{ textAlign: 'center', padding: '20px 0 16px', position: 'relative',  }}>
      <div className="hero-amber-glow"></div>
      <div style={{ position: 'relative', zIndex: '1',  }}>

        <div className="hero-brand-lockup fade-up">
          <img className="hero-brand-logo" src="assets/ssdam-logo.png" alt="서로를 포근히 안아주는 쓰담쓰담 로고" />
          <div className="hero-brand-name"><span className="brand-warm">쓰담</span><span className="brand-green">쓰담</span></div>
          <div className="hero-brand-tagline">마음을 알아차리는 다정한 시작</div>
        <h1 className="hero-headline-warm fade-up d1" style={{ fontFamily: "'Pretendard', sans-serif", fontSize: 'clamp(21px, 6vw, 26px)', fontWeight: '800', color: '#192A27', lineHeight: '1.4', letterSpacing: '-0.03em', marginBottom: '14px', wordBreak: 'keep-all' }}>
      늘 괜찮은 척 견뎌온 당신에게,<br/>
      <span style={{ color: '#14C8A7',  }}>든든한 내 편</span>이 되어 드릴게요
    </h1>

    <p className="fade-up d2" style={{ fontSize: 'clamp(13px, 4vw, 15px)', color: '#5C706D', lineHeight: '1.65', marginBottom: '26px', wordBreak: 'keep-all' }}>
      나도 몰랐던 무의식속 방어기제를 발견하고,<br/>
      실질적인 고민 해결을 위한 1:1 맞춤 케어 솔루션을 확인해보세요.
    </p>
        </div>


        
        <div style={{ background: '#FFFFFF', border: '1px solid #E1F2EF', borderRadius: '20px', padding: '24px 20px', marginBottom: '20px', boxShadow: '0 8px 30px rgba(20,200,167,0.08)',  }} className="fade-up">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px',  }}>
            <div style={{ fontSize: '13.5px', color: '#192A27', fontWeight: '700', letterSpacing: '-0.01em',  }}>검사는 이렇게 진행됩니다</div>
            <span style={{ background: '#E6F8F5', color: '#008A74', fontSize: '11px', fontWeight: '700', padding: '4px 8px', borderRadius: '6px', border: '1px solid #C4EBE4',  }}>3단계</span>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px',  }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: '#FAFCFC', border: '1px solid #E1F2EF', borderRadius: '14px',  }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#192A27', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#FFFFFF', flexShrink: '0',  }}>01</div>
              <div style={{ textAlign: 'left', flex: '1',  }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#192A27',  }}>내 마음 털어놓기</div>
                <div style={{ fontSize: '12px', color: '#5C706D', marginTop: '2px',  }}>정서와 관계 속에서 반복되던 내 마음의 반응들을 편안하게 솔직히 털어놓습니다</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: '#FAFCFC', border: '1px solid #E1F2EF', borderRadius: '14px',  }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#4A6360', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#FFFFFF', flexShrink: '0',  }}>02</div>
              <div style={{ textAlign: 'left', flex: '1',  }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#192A27',  }}>고민의 근본 원인 들여다보기</div>
                <div style={{ fontSize: '12px', color: '#5C706D', marginTop: '2px',  }}>겉으로 드러난 스트레스 이면에 자리 잡은 무의식과 방어 패턴의 뿌리를 찾습니다</div>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', background: '#E6F8F5', border: '1px solid #C4EBE4', borderRadius: '14px',  }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'linear-gradient(135deg, #14C8A7 0%, #00A383 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '800', color: '#FFFFFF', flexShrink: '0',  }}>03</div>
              <div style={{ textAlign: 'left', flex: '1',  }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#008A74',  }}>1:1 맞춤 처방 진단서</div>
                <div style={{ fontSize: '12px', color: '#4A6360', marginTop: '2px',  }}>언제나 내 편이 되어주는 따뜻한 마음으로, 실질적으로 고민을 해결할 가이드를 전합니다</div>
              </div>
            </div>
          </div>

          <button onClick={() => router.push('/q0')} style={{ position: 'relative', zIndex: '10', width: '100%', padding: '16px', background: 'linear-gradient(135deg, #14C8A7 0%, #00C49F 100%)', color: '#FFFFFF', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", letterSpacing: '-0.01em', transition: 'all 0.2s', boxShadow: '0 6px 20px rgba(20,200,167,0.28)', WebkitTapHighlightColor: 'transparent',  }}>
                내 마음 진단해보기
          </button>
          <div style={{ textAlign: 'center', fontSize: '12px', color: '#5C706D', marginTop: '10px',  }}>
             약 5분 소요 · 회원가입 없이 100% 무료
          </div>
        </div>
        

        
        <div id="result-preview-card" className="fade-up d3" style={{ marginBottom: '20px',  }}>
          <div style={{ background: '#FFFFFF', border: '1px solid #E1F2EF', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(20,200,167,0.06)',  }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E1F2EF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FAFCFC',  }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#192A27',  }}>임상 심리 검사 및 맞춤 처방 진단서</span>
              <span style={{ background: '#E6F8F5', color: '#008A74', borderRadius: '6px', padding: '3px 8px', fontSize: '11px', fontWeight: '700', border: '1px solid #C4EBE4',  }}>미리보기</span>
            </div>

            <div style={{ padding: '20px', textAlign: 'left',  }}>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px',  }}>
                <span style={{ background: '#E6F8F5', color: '#008A74', fontSize: '11.5px', fontWeight: '600', padding: '5px 10px', borderRadius: '100px', border: '1px solid #C4EBE4',  }}>정서 억압 기제</span>
                <span style={{ background: '#FAFCFC', color: '#4A6360', fontSize: '11.5px', fontWeight: '600', padding: '5px 10px', borderRadius: '100px', border: '1px solid #E1F2EF',  }}>완벽주의 성향</span>
                <span style={{ background: '#FAFCFC', color: '#4A6360', fontSize: '11.5px', fontWeight: '600', padding: '5px 10px', borderRadius: '100px', border: '1px solid #E1F2EF',  }}>회피 보호 기제</span>
                <span style={{ background: '#E6F8F5', color: '#008A74', fontSize: '11.5px', fontWeight: '600', padding: '5px 10px', borderRadius: '100px', border: '1px solid #C4EBE4',  }}>정서 자율성 척도</span>
              </div>

              <div style={{ fontSize: '12px', fontWeight: '700', color: '#5C706D', marginBottom: '6px',  }}>핵심 진단 문장 요약</div>
              <div style={{ fontSize: '16px', fontWeight: '800', color: '#192A27', lineHeight: '1.45', marginBottom: '14px',  }}>
                "타인의 기대에 부응하려 자신의 감정을 억압하고<br/><span style={{ color: '#14C8A7',  }}>완벽주의적 회피 메커니즘</span>을 반복하는 상태"
              </div>
              
              <div style={{ fontSize: '13.5px', color: '#334155', lineHeight: '1.65', marginBottom: '18px', padding: '14px 16px', background: '#FAFCFC', border: '1px solid #E1F2EF', borderRadius: '12px',  }}>
                만성적인 감정 억압으로 정서 자원이 고갈되어 있습니다. 자신의 '진짜 감정'을 알아차리고 1:1 맞춤 심리상담을 통한 정서 이완이 필요합니다.
              </div>

              <div style={{ border: '1px solid #E1F2EF', borderRadius: '14px', padding: '14px', background: '#FFFFFF', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '12px',  }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#E6F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: '700', color: '#14C8A7', flexShrink: '0',  }}>지은</div>
                <div style={{ flex: '1', minWidth: '0',  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px',  }}>
                    <span style={{ fontSize: '14px', fontWeight: '700', color: '#192A27',  }}>이지은 임상심리전문가</span>
                    <span style={{ background: '#E6F8F5', color: '#008A74', fontSize: '10.5px', fontWeight: '700', padding: '2px 6px', borderRadius: '4px', border: '1px solid #C4EBE4',  }}>1급 심리상담사</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#5C706D', marginTop: '2px',  }}>정서 소진 · 완벽주의 및 회피성 방어 1:1 케어</div>
                </div>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#E6F8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#14C8A7', fontSize: '14px', fontWeight: '700',  }}>→</div>
              </div>

              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '12px', marginBottom: '14px',  }}>
                <div className="preview-prescription-label">1:1 심층 상담 맞춤 처방 미리보기</div>
                <div className="preview-prescription-blur" id="preview-prescription-blur">
                  내담자의 방어기제 원인을 분석하여, 3주차 심층 상담에서 인지적 재구조화를 진행합니다. 억압된 정서를 안전하게 표현하고 자기 돌봄 체계를 세웁니다.
                </div>
                <button className="preview-cta-btn" onClick={() => router.push('/q0')}>
                  무료 진단 및 1:1 상담 처방 확인하기 →
                </button>
              </div>
            </div>
          </div>
        </div>

        <div id="profile-area" style={{ marginBottom: '4px',  }}></div>
        <div id="landing-dash-link" style={{ marginBottom: '8px',  }}></div>
      </div>
    </div>


<div id="d6-convert-modal" style={{ display: 'none', position: 'fixed', inset: '0', zIndex: '1100', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)', alignItems: 'flex-end', justifyContent: 'center',  }}>
  <div style={{ width: '100%', maxWidth: '480px', background: 'var(--surface2)', borderRadius: '24px 24px 0 0', padding: '28px 24px 36px', boxShadow: '0 -8px 40px rgba(166,124,82,0.18)',  }}>
    <div style={{ width: '36px', height: '4px', background: 'var(--border)', borderRadius: '2px', margin: '0 auto 20px',  }}></div>
    <div style={{ fontSize: '22px', textAlign: 'center', marginBottom: '8px',  }}>🌿</div>
    <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text)', textAlign: 'center', marginBottom: '10px', lineHeight: '1.35',  }}>무료 체험 7일이 끝나갑니다<br/></h3>
    <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: '1.7', marginBottom: '20px',  }}>지금까지 쌓아온 진단 기록과<br/>1:1 맞춤 처방이 그대로 보관됩니다.<br/>지금 이어서 관리하시면,<br/><strong style={{ color: 'var(--accent)',  }}>30일 케어 로드맵</strong>을 계속 받아보실 수 있습니다.</p>
    
    <div style={{ background: 'rgba(166,124,82,0.06)', border: '1px solid rgba(166,124,82,0.15)', borderRadius: '14px', padding: '14px 16px', marginBottom: '20px',  }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px',  }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)',  }}>무료 체험</span>
        <span style={{ fontSize: '12px', color: '#FF6B6B', fontWeight: '700',  }}>7일 종료 임박</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between',  }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)',  }}>진단 기록 보관</span>
        <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700',  }}>계속 유지됩니다</span>
      </div>
    </div>
    <button onClick={() => router.push('/q0')} style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg,#A67C52,#B8926A)', border: 'none', borderRadius: '14px', color: '#fff', fontSize: '16px', fontWeight: '800', cursor: 'pointer', letterSpacing: '-.01em', marginBottom: '10px',  }}>쓰담쓰담 Plus 계속하기 — 월 7,900원</button>
    <button onClick={() => router.push('/q0')} style={{ width: '100%', padding: '12px', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer',  }}>다음에 할게요</button>
  </div>
</div>

    
    <div style={{ marginTop: '24px', marginBottom: '24px',  }}>

      
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '.07em', marginBottom: '12px', textAlign: 'left',  }}>자세히 알아보기</div>

      
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '10px', overflow: 'hidden',  }}>
        <button onClick={() => router.push('/q0')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", WebkitTapHighlightColor: 'transparent',  }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px',  }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(166,124,82,0.1)', flexShrink: '0',  }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg></span>
            <div style={{ textAlign: 'left',  }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)',  }}>이런 분께 권합니다</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px',  }}>적합도 확인하기</div>
            </div>
          </div>
          <span id="acc-fit-arrow" style={{ fontSize: '18px', color: 'var(--text-muted)', transition: 'transform .25s',  }}>›</span>
        </button>
        <div id="acc-fit" style={{ display: 'none', padding: '0 18px 16px', borderTop: '1px solid var(--border)',  }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px',  }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', background: 'var(--surface2)', borderRadius: '12px',  }}>
              <span style={{ fontSize: '16px', flexShrink: '0',  }}>🫧</span>
              <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.55',  }}>감정을 자꾸 참고 넘겨서 속마음을 꺼내기 어려운 분</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', background: 'var(--surface2)', borderRadius: '12px',  }}>
              <span style={{ fontSize: '16px', flexShrink: '0',  }}>🔥</span>
              <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.55',  }}>쉬어도 회복되지 않고 번아웃이 반복되는 분</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', background: 'var(--surface2)', borderRadius: '12px',  }}>
              <span style={{ fontSize: '16px', flexShrink: '0',  }}>🧭</span>
              <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.55',  }}>내 행동 패턴의 원인을 제대로 알고 싶은 분</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 14px', background: 'var(--surface2)', borderRadius: '12px',  }}>
              <span style={{ fontSize: '16px', flexShrink: '0',  }}>💬</span>
              <span style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.55',  }}>혼자 검색하거나 ChatGPT에 물어봐도 해소되지 않은 분</span>
            </div>
            <div style={{ marginTop: '6px', padding: '12px 14px', background: 'rgba(166,124,82,0.07)', border: '1px solid rgba(166,124,82,0.15)', borderRadius: '12px', fontSize: '12px', color: 'var(--accent)', fontWeight: '600', textAlign: 'center',  }}>
               지금 마음이 무겁다면, 5분이면 충분합니다
            </div>
          </div>
        </div>
      </div>

      
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '10px', overflow: 'hidden',  }}>
        <button onClick={() => router.push('/q0')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", WebkitTapHighlightColor: 'transparent',  }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px',  }}>
            <span style={{ fontSize: '22px',  }}>🧠</span>
            <div style={{ textAlign: 'left',  }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)',  }}>AI 챗봇과 뭐가 다른가요?</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px',  }}>ChatGPT vs 쓰담쓰담</div>
            </div>
          </div>
          <span id="acc-diff-arrow" style={{ fontSize: '18px', color: 'var(--text-muted)', transition: 'transform .25s',  }}>›</span>
        </button>
        <div id="acc-diff" style={{ display: 'none', padding: '0 18px 16px', borderTop: '1px solid var(--border)',  }}>
          <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px',  }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '4px',  }}>
              <div style={{ padding: '8px 10px', background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.15)', borderRadius: '10px', fontSize: '11px', fontWeight: '700', color: '#E05555', textAlign: 'center',  }}>ChatGPT</div>
              <div style={{ padding: '8px 10px', background: 'rgba(166,124,82,0.08)', border: '1px solid rgba(166,124,82,0.2)', borderRadius: '10px', fontSize: '11px', fontWeight: '700', color: 'var(--accent)', textAlign: 'center',  }}>쓰담쓰담</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',  }}>
              <div style={{ padding: '11px 12px', background: 'var(--surface2)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5',  }}>일반적인 조언<br/>누구에게나 같은 답</div>
              <div style={{ padding: '11px 12px', background: 'rgba(166,124,82,0.06)', border: '1px solid rgba(166,124,82,0.12)', borderRadius: '10px', fontSize: '12px', color: 'var(--text)', fontWeight: '600', lineHeight: '1.5',  }}>임상 심리 이론 기반<br/>내 성향에 맞춘 해석</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',  }}>
              <div style={{ padding: '11px 12px', background: 'var(--surface2)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5',  }}>대화로 끝남<br/>기록이 남지 않음</div>
              <div style={{ padding: '11px 12px', background: 'rgba(166,124,82,0.06)', border: '1px solid rgba(166,124,82,0.12)', borderRadius: '10px', fontSize: '12px', color: 'var(--text)', fontWeight: '600', lineHeight: '1.5',  }}>3분 실행 행동<br/>단계별 맞춤 처방</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',  }}>
              <div style={{ padding: '11px 12px', background: 'var(--surface2)', borderRadius: '10px', fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5',  }}>진단 근거가 불명확<br/>다시 확인하기 어려움</div>
              <div style={{ padding: '11px 12px', background: 'rgba(166,124,82,0.06)', border: '1px solid rgba(166,124,82,0.12)', borderRadius: '10px', fontSize: '12px', color: 'var(--text)', fontWeight: '600', lineHeight: '1.5',  }}>방어기제 진단서<br/>전문가 1:1 연계</div>
            </div>
          </div>
        </div>
      </div>

      
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '16px', marginBottom: '10px', overflow: 'hidden',  }}>
        <button onClick={() => router.push('/q0')} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", WebkitTapHighlightColor: 'transparent',  }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px',  }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '8px', background: 'rgba(166,124,82,0.1)', flexShrink: '0',  }}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
            <div style={{ textAlign: 'left',  }}>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)',  }}>먼저 받아본 분들의 후기</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px',  }}>실제 이용자 기록</div>
            </div>
          </div>
          <span id="acc-social-arrow" style={{ fontSize: '18px', color: 'var(--text-muted)', transition: 'transform .25s',  }}>›</span>
        </button>
        <div id="acc-social" style={{ display: 'none', padding: '0 18px 16px', borderTop: '1px solid var(--border)',  }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px',  }}>
            <div style={{ padding: '14px 16px', background: 'var(--surface2)', borderRadius: '12px',  }}>
              <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700', marginBottom: '6px',  }}>EPTI 3 · 성취가</div>
              <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.6',  }}>"성과가 멈추면 불안해지는 이유를 처음 알았어요. 쉬는 게 게으른 게 아니라는 말이 오래 남았습니다."</div>
            </div>
            <div style={{ padding: '14px 16px', background: 'var(--surface2)', borderRadius: '12px',  }}>
              <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700', marginBottom: '6px',  }}>EPTI 1 · 완벽주의자</div>
              <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.6',  }}>"3분만 해보라는 처방이 의외로 먹혔어요. 완벽하게 시작하려다 매번 못 하던 일이었는데요."</div>
            </div>
            <div style={{ padding: '14px 16px', background: 'var(--surface2)', borderRadius: '12px',  }}>
              <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700', marginBottom: '6px',  }}>EPTI 6 · 충실가</div>
              <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: '1.6',  }}>"불안해서 확인을 반복하던 습관에 이름이 붙으니 덜 무서워졌습니다. 방향이 잡히는 느낌이에요."</div>
            </div>
            <button onClick={() => router.push('/q0')} style={{ width: '100%', padding: '12px', background: 'none', border: '1.5px solid var(--border)', borderRadius: '12px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', cursor: 'pointer', fontFamily: "'Pretendard', sans-serif", marginTop: '4px',  }}>
                후기 남기러 가기 →
            </button>
          </div>
        </div>
      </div>

    </div>
    


  </div>
</div>





<div id="s-profile" className="screen">
  <div className="wrap" style={{ paddingTop: '32px', paddingBottom: '80px',  }}>
<button onClick={() => router.push('/q0')} className="back-btn">← 뒤로</button>

    
    <div id="profile-memory-banner" style={{ display: 'none', background: 'rgba(166,124,82,0.07)', border: '1px solid rgba(166,124,82,0.2)', borderRadius: '12px', padding: '11px 14px', marginBottom: '16px', fontSize: '13px', color: 'var(--accent)', fontWeight: '600',  }} className="fade-up">
          .    .
    </div>

    
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '28px',  }} className="fade-up">
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#14C8A7', color: '#fff', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>1</div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600',  }}>기본 정보</div>
      </div>
      <div style={{ flex: '1', height: '2px', background: '#E1F2EF', marginBottom: '16px',  }}></div>
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E1F2EF', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>2</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)',  }}>EPTI 진단</div>
      </div>
      <div style={{ flex: '1', height: '2px', background: '#E1F2EF', marginBottom: '16px',  }}></div>
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E1F2EF', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>3</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)',  }}>진단 &amp; 처방</div>
      </div>
    </div>

    <p className="q-label fade-up">1단계 · 기본 정보</p>
    <h2 className="q-title fade-up d1">나의 심리 반응과<br/><span style={{ color: 'var(--accent)',  }}>무의식 방어기제 척도</span></h2>
    <div style={{ background: 'rgba(166,124,82,0.07)', border: '1px solid rgba(166,124,82,0.2)', borderRadius: '10px', padding: '11px 14px', marginBottom: '14px', fontSize: '13px', color: 'var(--accent)', lineHeight: '1.6',  }} className="fade-up d1">이름 · 나이대 · 고민 영역 · 에너지 상태를 알려주시면 진단이 더 정확해집니다
    </div>
    <div className="profile-context-note fade-up d2">모두 선택 항목입니다. 건너뛰셔도 진단은 진행됩니다.</div>

    <div className="profile-field fade-up d2">
      <div className="profile-field-label">1. 이름 <span style={{ color: 'var(--text-muted)', fontWeight: '300',  }}>(선택)</span></div>
      <div className="profile-field-hint">진단서에 표시될 이름입니다. 별명이나 이니셜도 괜찮습니다.</div>
      <input type="text" className="profile-input" id="prof-name" placeholder="예: 지은, 하루, JH" maxLength={12} />
    </div>

    <div className="profile-field fade-up d3">
      <div className="profile-field-label">2. MBTI</div>
      <div className="profile-field-hint">알고 계신 MBTI를 골라 주세요.</div>
      <div className="mbti-grid" id="mbti-grid"></div>
    </div>

    <div className="profile-field fade-up d3">
      <div className="profile-field-label">3. 나이대</div>
      <div className="profile-field-hint">연령대에 따라 자주 나타나는 심리 패턴이 다릅니다.</div>
      <div className="chip-group" id="chip-age"></div>
    </div>

    <div className="profile-field fade-up d4">
      <div className="profile-field-label">4. 요즘 가장 걸리는 영역</div>
      <div className="profile-field-hint">해당되는 것을 모두 골라 주세요.</div>
      <div className="chip-group" id="chip-worry"></div>
    </div>

    <div className="profile-field fade-up d4">
      <div className="profile-field-label">5. 지금의 에너지 상태</div>
      <div className="profile-field-hint">지금 마음의 여유는 어느 정도인가요?</div>
      <div className="chip-group" id="chip-energy"></div>
    </div>

    <div className="profile-field fade-up d4">

    </div>

    <button className="btn-full" onClick={() => router.push('/q0')} style={{ marginTop: '8px',  }}> — EPTI   →</button>
    <button className="btn-restart" onClick={() => router.push('/q0')} style={{ marginTop: '8px',  }}>EPTI   </button>
  </div>
</div>





<div id="s-defense" className="screen">
  <div className="wrap" style={{ paddingTop: '24px', paddingBottom: '80px',  }}>
<button onClick={() => router.push('/q0')} className="back-btn">← 뒤로</button>

    
    <div onClick={() => router.push('/q0')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 18px', background: 'rgba(30,26,20,0.04)', border: '1px dashed rgba(30,26,20,0.15)', borderRadius: '12px', marginBottom: '24px', cursor: 'pointer', transition: 'all .15s',  }}
      onMouseOver={(e) => e.currentTarget.style.background='rgba(30,26,20,0.07)'}
      onMouseOut={(e) => e.currentTarget.style.background='rgba(30,26,20,0.04)'}>
      <span style={{ fontSize: '13px', color: 'var(--text-muted)',  }}> </span>
      <span style={{ fontSize: '12px', color: 'var(--text-muted)', opacity: '.6',  }}>→    </span>
    </div>

    
    <div style={{ marginBottom: '8px',  }}>
      <div style={{ fontSize: '11px', color: 'var(--secondary)', fontWeight: '700', letterSpacing: '.1em', marginBottom: '8px',  }}>방어기제 선택 (복수 선택 가능)</div>
      <div style={{ fontSize: '24px', fontWeight: '900', color: 'var(--text)', letterSpacing: '-0.03em', marginBottom: '8px',  }}>
          <br/><span style={{ color: 'var(--accent)',  }}> </span> ?
      </div>
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.65',  }}>
           . AI     .
      </div>
    </div>

    
    <div id="defense-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '20px 0',  }}></div>

    
    <div style={{ position: 'sticky', bottom: '16px',  }}>
      <div id="defense-count-label" style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', marginBottom: '8px',  }}>
          
      </div>
      <button onClick={() => router.push('/q0')}
        style={{ width: '100%', padding: '16px', border: 'none', borderRadius: '14px', background: 'linear-gradient(135deg,var(--accent),#C48E60)', color: '#FFFFFF', fontSize: '16px', fontWeight: '800', fontFamily: "'Pretendard', sans-serif", cursor: 'pointer', letterSpacing: '-0.01em', transition: 'all .15s',  }}>
         — EPTI   →
      </button>
    </div>

  </div>
</div>


<div id="s-epti" className="screen">
  <div className="wrap" style={{ paddingTop: '32px', paddingBottom: '80px',  }}>
<button onClick={() => router.push('/q0')} className="back-btn">← 뒤로</button>

    
    <div id="profile-memory-banner" style={{ display: 'none', background: 'rgba(166,124,82,0.07)', border: '1px solid rgba(166,124,82,0.2)', borderRadius: '12px', padding: '11px 14px', marginBottom: '16px', fontSize: '13px', color: 'var(--accent)', fontWeight: '600',  }} className="fade-up">
          .    .
    </div>

    
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '28px',  }} className="fade-up">
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>✓</div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600',  }}>기본 정보</div>
      </div>
      <div style={{ flex: '1', height: '2px', background: '#14C8A7', marginBottom: '16px',  }}></div>
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#14C8A7', color: '#fff', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>2</div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600',  }}>EPTI </div>
      </div>
      <div style={{ flex: '1', height: '2px', background: '#E1F2EF', marginBottom: '16px',  }}></div>
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#E1F2EF', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>3</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)',  }}>진단 &amp; 처방</div>
      </div>
    </div>

    
    <div className="epti-battery-bar" id="epti-progress-bar" style={{ display: 'none',  }}>
      <span id="epti-spark" style={{ fontSize: '18px', minWidth: '22px',  }}></span>
      <div className="epti-bat-shell">
        <div className="epti-bat-fill" id="epti-bat-fill" style={{ width: '0%',  }}></div>
      </div>
      <span style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: '700', minWidth: '36px',  }} id="epti-pct-text">0%</span>
    </div>

    <div style={{ marginBottom: '32px',  }}>
      <p className="q-label fade-up">2단계 · EPTI 성향 진단</p>
      <h2 className="q-title fade-up d1">나의 심리 반응과<br/><span style={{ color: 'var(--accent)',  }}>무의식 방어기제 척도</span></h2>
      <div className="epti-intro fade-up d2">
        <div className="epti-intro-title">EPTI란?</div>
        <div className="epti-intro-sub">
          에니어그램 9유형을 기반으로 <strong style={{ color: 'var(--text)',  }}>핵심 두려움, 무의식 동기</strong>를 파악하는 척도입니다.<br/><br/>
          MBTI가 사고 방식을 본다면, EPTI는 그 행동을 만들어내는 <strong style={{ color: 'var(--text)',  }}>근본 동기</strong>를 봅니다.<br/>
          총 36문항 · 직관적으로 답해 주세요 (약 5분).<br/><br/>
          <span style={{ color: 'var(--accent)', fontWeight: '500',  }}>정답은 없습니다. 지금의 나에 가까운 쪽을 고르세요.</span>
        </div>
      </div>
    </div>

    <div id="epti-questions">
      
    </div>

    <div className="epti-nav">
      <button className="btn-epti-back" id="epti-back" onClick={() => router.push('/q0')} style={{ display: 'none',  }}>← 이전</button>
      <button className="btn-epti-next" id="epti-next" disabled onClick={() => router.push('/q0')}>다음 →</button>
    </div>
    <div style={{ marginTop: '16px', textAlign: 'center',  }}>
      <button onClick={() => router.push('/q0')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', fontFamily: "'Pretendard', -apple-system,sans-serif",  }}>← 처음으로 돌아가기</button>
    </div>
  </div>
</div>


<div id="s-epti-result" className="screen">
  <div className="wrap" style={{ paddingTop: '32px', paddingBottom: '80px',  }}>
<button onClick={() => router.push('/q0')} className="back-btn">← 뒤로</button>

    
    <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '24px',  }} className="fade-up">
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>✓</div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600',  }}>기본 정보</div>
      </div>
      <div style={{ flex: '1', height: '2px', background: 'var(--accent)', marginBottom: '16px',  }}></div>
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>✓</div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600',  }}>EPTI 진단</div>
      </div>
      <div style={{ flex: '1', height: '2px', background: '#14C8A7', marginBottom: '16px',  }}></div>
      <div style={{ flex: '1', textAlign: 'center',  }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#14C8A7', color: '#fff', fontSize: '13px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px',  }}>3</div>
        <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '600',  }}>진단 &amp; 처방</div>
      </div>
    </div>

    <span className="result-tag fade-up">임상 심리 검사 결과 보고서</span>
    <h2 className="counsel-intro-title fade-up d1" id="counsel-title">무의식 방어기제 및<br/>1:1 심리 맞춤 진단서</h2>
    <p className="counsel-intro-sub fade-up d2" id="counsel-sub">진단 결과에 맞는 케어 방향을 정리했습니다.</p>
    <div id="counsel-cards" className="fade-up d3"></div>
    <button className="counsel-cta fade-up d4" onClick={() => router.push('/q0')}>1:1 상담 예약하기 (준비 중)</button>
    <button className="counsel-skip fade-up" onClick={() => router.push('/q0')}>괜찮아요, 나중에 할게요 →</button>
  </div>
</div>




    </>
  );
}
