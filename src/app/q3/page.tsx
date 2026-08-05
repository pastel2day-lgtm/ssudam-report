'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OptionButton from '@/components/OptionButton';
import { useSurvey } from '@/context/SurveyContext';

export default function Q3Page() {
  const router = useRouter();
  const { data, updateData } = useSurvey();
  const [selectedOption, setSelectedOption] = useState<string>(data.q3 || '');
  const [customText, setCustomText] = useState<string>('');

  const handleSelectOption = (val: string) => {
    setSelectedOption(val);
    setCustomText('');
    updateData('q3', val);
    setTimeout(() => {
      router.push('/epti');
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
    if (selectedOption || customText) {
      updateData('q3', customText ? `custom:${customText}` : selectedOption);
      router.push('/epti');
    }
  };

  return (
    <div id="s-q3" className="screen q-screen active">
      <div className="wrap">
        <button onClick={() => router.back()} className="back-btn">← 뒤로</button>
        <div className="progress-bar">
          <div className="progress-dot done"></div>
          <div className="progress-dot done"></div>
          <div className="progress-dot done"></div>
        </div>
        <p className="q-label fade-up visible">마지막 단계 · 해결 방식</p>
        <h2 className="q-title fade-up d1 visible">나의 심리 반응과<br/><span style={{ color: 'var(--accent)' }}>무의식 방어기제 척도</span></h2>
        
        <div className="options">
          <OptionButton 
            title="나 혼자 안고 참는 편이에요" 
            subtitle="억압/내재화" 
            value="아무에게도 말하지 않고 혼자 참는 편입니다."
            isSelected={selectedOption === '아무에게도 말하지 않고 혼자 참는 편입니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="문제를 생각하고 싶지 않아 외면해요" 
            subtitle="회피/부인" 
            value="문제 상황을 생각하고 싶지 않아 외면하거나 피합니다."
            isSelected={selectedOption === '문제 상황을 생각하고 싶지 않아 외면하거나 피합니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="오히려 더 바쁘게 일이나 다른 것에 몰두해요" 
            subtitle="행동화/승화" 
            value="더 바쁘게 일이나 다른 활동에 몰두해서 잊으려 합니다."
            isSelected={selectedOption === '더 바쁘게 일이나 다른 활동에 몰두해서 잊으려 합니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="논리적으로 이유를 찾고 분석해요" 
            subtitle="주지화" 
            value="감정보다는 논리적으로 왜 이런 일이 생겼는지 분석합니다."
            isSelected={selectedOption === '감정보다는 논리적으로 왜 이런 일이 생겼는지 분석합니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="가까운 사람에게 짜증이나 화를 내게 돼요" 
            subtitle="전치/투사" 
            value="의도치 않게 가까운 사람에게 화나 짜증을 내게 됩니다."
            isSelected={selectedOption === '의도치 않게 가까운 사람에게 화나 짜증을 내게 됩니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="내 탓인 것 같아 나를 자책해요" 
            subtitle="자기비난" 
            value="모든 게 내 탓인 것 같아 스스로를 자책합니다."
            isSelected={selectedOption === '모든 게 내 탓인 것 같아 스스로를 자책합니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="어떻게 해야 할지 몰라 얼어붙어요" 
            subtitle="해리/무감각" 
            value="어떻게 해야 할지 몰라 아무것도 하지 못하고 얼어붙습니다."
            isSelected={selectedOption === '어떻게 해야 할지 몰라 아무것도 하지 못하고 얼어붙습니다.'}
            onSelect={handleSelectOption}
          />

          <div className="other-box fade-up d4 visible">
            <span className="other-label">+ 직접 입력</span>
            <textarea
              className="other-textarea"
              placeholder="주로 어떻게 대처하는지 적어 주세요."
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
