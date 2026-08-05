'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OptionButton from '@/components/OptionButton';
import { useSurvey } from '@/context/SurveyContext';

export default function Q1Page() {
  const router = useRouter();
  const { data, updateData } = useSurvey();
  const [selectedOption, setSelectedOption] = useState<string>(data.q1 || '');
  const [customText, setCustomText] = useState<string>('');

  const handleSelectOption = (val: string) => {
    setSelectedOption(val);
    setCustomText('');
    updateData('q1', val);
    // Auto-advance
    setTimeout(() => {
      router.push('/q2');
    }, 400);
  };

  const handleCustomInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setCustomText(val);
    if (val.trim().length > 0) {
      setSelectedOption('');
    }
  };

  const handleSubmit = () => {
    updateData('q1', customText ? `custom:${customText}` : selectedOption);
    router.push('/q2');
  };

  return (
    <div id="s-q1" className="screen q-screen active">
      <div className="wrap">
        <button onClick={() => router.back()} className="back-btn">← 뒤로</button>
        <div className="progress-bar">
          <div className="progress-dot done"></div>
          <div className="progress-dot"></div>
          <div className="progress-dot"></div>
        </div>
        <p className="q-label fade-up visible">1단계 · 지금의 고민</p>
        <h2 className="q-title fade-up d1 visible">나의 심리 반응과<br/><span style={{ color: 'var(--accent)' }}>무의식 방어기제 척도</span></h2>

        <div className="options">
          <OptionButton 
            title="자꾸 지치고 방전된 느낌이에요" 
            subtitle="정서 소진" 
            value="요즘 쉬어도 회복되지 않고 자꾸 지칩니다. 에너지가 바닥난 느낌이 이어집니다."
            isSelected={selectedOption === '요즘 쉬어도 회복되지 않고 자꾸 지칩니다. 에너지가 바닥난 느낌이 이어집니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="해야 하는 걸 알면서 계속 미뤄요" 
            subtitle="행동 회피" 
            value="해야 할 일을 알면서도 계속 미루고 있습니다. 시작 자체가 어렵습니다."
            isSelected={selectedOption === '해야 할 일을 알면서도 계속 미루고 있습니다. 시작 자체가 어렵습니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="사람들 사이에서 자꾸 눈치를 봐요" 
            subtitle="관계 긴장" 
            value="사람들 사이에서 눈치를 많이 봅니다. 내 의견을 말하기가 어렵습니다."
            isSelected={selectedOption === '사람들 사이에서 눈치를 많이 봅니다. 내 의견을 말하기가 어렵습니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="감정 기복이 심해 스스로도 당황스러워요" 
            subtitle="정서 불안정" 
            value="감정 기복이 심해 스스로도 당황스럽습니다. 반응을 조절하기 어렵습니다."
            isSelected={selectedOption === '감정 기복이 심해 스스로도 당황스럽습니다. 반응을 조절하기 어렵습니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="잘하고 있는지 확신이 서지 않아요" 
            subtitle="자기효능감 저하" 
            value="지금 잘하고 있는지 확신이 서지 않습니다. 자꾸 스스로를 의심하게 됩니다."
            isSelected={selectedOption === '지금 잘하고 있는지 확신이 서지 않습니다. 자꾸 스스로를 의심하게 됩니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="내가 뭘 원하는지 모르겠어요" 
            subtitle="방향 상실" 
            value="내가 무엇을 원하는지 잘 모르겠습니다. 방향을 잡기 어렵습니다."
            isSelected={selectedOption === '내가 무엇을 원하는지 잘 모르겠습니다. 방향을 잡기 어렵습니다.'}
            onSelect={handleSelectOption}
          />

          <div className="other-box fade-up d4 visible">
            <span className="other-label">+ 직접 입력 — 지금 상태를 문장으로 적어 주세요</span>
            <textarea
              className="other-textarea"
              placeholder="지금 어떤 상태인지 편하게 적어 주세요. 짧아도, 정리되지 않아도 괜찮습니다."
              rows={3}
              value={customText}
              onChange={handleCustomInput}
            />
            <button
              className="other-submit"
              disabled={customText.trim().length === 0}
              onClick={handleSubmit}
            >
              이대로 진행하기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
