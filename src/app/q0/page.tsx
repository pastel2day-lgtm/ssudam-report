'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import StageButton from '@/components/StageButton';
import { useSurvey } from '@/context/SurveyContext';

export default function Q0Page() {
  const router = useRouter();
  const { data, updateData } = useSurvey();
  const [selectedTrack, setSelectedTrack] = useState<string>(data.track || 'stop');
  const [customText, setCustomText] = useState<string>('');

  const handleSelectTrack = (trackId: string) => {
    setSelectedTrack(trackId);
    setCustomText('');
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCustomText(val);
    if (val.trim().length > 0) {
      setSelectedTrack('');
    }
  };

  const handleSubmit = () => {
    updateData('track', customText ? `custom:${customText}` : selectedTrack);
    router.push('/q1');
  };

  return (
    <div id="s-q0" className="screen q-screen active">
      <div className="wrap">
        <button onClick={() => router.back()} className="back-btn">← 뒤로</button>
        <p className="q-label fade-up visible">지금 어떤 도움이 필요하신가요?</p>
        <h2 className="q-title fade-up d1 visible">나의 심리 반응과<br/><span style={{ color: 'var(--accent)' }}>무의식 방어기제 척도</span></h2>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: '1.7' }} className="fade-up d2 visible">
          정서, 관계, 성향, 습관 — 마음이 반응하는 방식은 사람마다 다릅니다.<br/>
          지금 내 상태와 가장 가까운 것을 하나만 골라 주세요.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="fade-up d2 visible" id="q0-track-list">
          <StageButton trackId="stop" num={1} title="임상 심리 진단 결과 요약" desc="지금 멈춰 선 이유부터 확인합니다. 무엇을 먼저 볼지 정리해 드립니다." isSelected={selectedTrack === 'stop'} onSelect={handleSelectTrack} />
          <StageButton trackId="started" num={2} title="3주 맞춤 인지·정서 솔루션" desc="시작은 했는데, 유지가 어려운 분께 권합니다." isSelected={selectedTrack === 'started'} onSelect={handleSelectTrack} />
          <StageButton trackId="repeat" num={3} title="반복되는 패턴 점검" desc="같은 문제가 계속 돌아오는 경우를 다룹니다." isSelected={selectedTrack === 'repeat'} onSelect={handleSelectTrack} />
          <StageButton trackId="aware" num={4} title="감정 알아차림 훈련" desc="느껴지긴 하는데, 이름 붙이기 어려운 분께 권합니다." isSelected={selectedTrack === 'aware'} onSelect={handleSelectTrack} />
          <StageButton trackId="system" num={5} title="나만의 케어 체계 만들기" desc="정서·행동·관계를 하나의 흐름으로 묶어 관리합니다." isSelected={selectedTrack === 'system'} onSelect={handleSelectTrack} />
          <StageButton trackId="grow" num={6} title="성장 방향 설정" desc="지금보다 더 나아갈 방향을 함께 찾습니다." isSelected={selectedTrack === 'grow'} onSelect={handleSelectTrack} />
          <StageButton trackId="relation" num={7} title="관계 갈등 · 긴급 케어" desc="가족, 연인, 직장 관계에서 지금 힘든 일이 있는 경우입니다." isSelected={selectedTrack === 'relation'} onSelect={handleSelectTrack} />

          <div style={{ marginTop: '12px', borderTop: '1px solid #E1F2EF', paddingTop: '14px' }}>
            <div style={{ fontSize: '12px', color: '#5C706D', marginBottom: '8px', fontWeight: '500' }}>해당하는 것이 없다면 — 지금 상황을 직접 적어 주세요</div>
            <textarea
              placeholder="어떤 상황인지 편하게 적어 주세요. 짧아도 괜찮습니다."
              rows={3}
              value={customText}
              onChange={handleCustomInput}
              style={{ width: '100%', padding: '12px 14px', border: '1.5px solid #E1F2EF', borderRadius: '12px', fontSize: '13px', fontFamily: "'Pretendard', -apple-system,sans-serif", color: '#192A27', resize: 'none', background: '#FFFFFF', lineHeight: '1.65' }}
            />
            <button
              onClick={handleSubmit}
              style={{ width: '100%', marginTop: '12px', padding: '16px', background: 'linear-gradient(135deg, #14C8A7 0%, #00C49F 100%)', color: '#fff', border: 'none', borderRadius: '14px', fontSize: '15px', fontWeight: '700', cursor: 'pointer', fontFamily: "'Pretendard', -apple-system,sans-serif", boxShadow: '0 6px 20px rgba(20,200,167,0.28)', WebkitTapHighlightColor: 'transparent' }}
            >
              이 내용으로 진단받기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
