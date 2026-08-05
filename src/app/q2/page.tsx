'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import OptionButton from '@/components/OptionButton';
import { useSurvey } from '@/context/SurveyContext';

export default function Q2Page() {
  const router = useRouter();
  const { data, updateData } = useSurvey();
  const [selectedOption, setSelectedOption] = useState<string>(data.q2 || '');
  const [customText, setCustomText] = useState<string>('');

  const handleSelectOption = (val: string) => {
    setSelectedOption(val);
    setCustomText('');
    updateData('q2', val);
    setTimeout(() => {
      router.push('/q3');
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
    updateData('q2', customText ? `custom:${customText}` : selectedOption);
    router.push('/q3');
  };

  return (
    <div id="s-q2" className="screen q-screen active">
      <div className="wrap">
        <button onClick={() => router.back()} className="back-btn">← 뒤로</button>
        <div className="progress-bar">
          <div className="progress-dot done"></div>
          <div className="progress-dot done"></div>
          <div className="progress-dot"></div>
        </div>
        <p className="q-label fade-up visible">2단계 · 막힌 이유</p>
        <h2 className="q-title fade-up d1 visible">나의 심리 반응과<br/><span style={{ color: 'var(--accent)' }}>무의식 방어기제 척도</span></h2>
        
        <div className="options">
          <OptionButton 
            title="실패할까 봐 시작을 못 해요" 
            subtitle="실패 두려움" 
            value="실패할까 봐 시작을 못 하고 있습니다."
            isSelected={selectedOption === '실패할까 봐 시작을 못 하고 있습니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="완벽히 준비돼야 시작할 수 있어요" 
            subtitle="완벽주의" 
            value="완벽하게 준비되어야 시작할 수 있다고 느낍니다."
            isSelected={selectedOption === '완벽하게 준비되어야 시작할 수 있다고 느낍니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="남들 시선이 계속 신경 쓰여요" 
            subtitle="타인 평가 민감" 
            value="남들이 어떻게 볼지가 계속 신경 쓰입니다."
            isSelected={selectedOption === '남들이 어떻게 볼지가 계속 신경 쓰입니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="에너지가 남아있지 않아요" 
            subtitle="소진" 
            value="이미 에너지가 남아있지 않습니다."
            isSelected={selectedOption === '이미 에너지가 남아있지 않습니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="무엇부터 해야 할지 모르겠어요" 
            subtitle="우선순위 혼란" 
            value="무엇부터 손대야 할지 모르겠습니다."
            isSelected={selectedOption === '무엇부터 손대야 할지 모르겠습니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="해도 달라지지 않을 것 같아요" 
            subtitle="학습된 무기력" 
            value="해봤자 달라지지 않을 것 같습니다."
            isSelected={selectedOption === '해봤자 달라지지 않을 것 같습니다.'}
            onSelect={handleSelectOption}
          />
          <OptionButton 
            title="생각만 하다 시간이 지나가요" 
            subtitle="과잉 사고" 
            value="생각만 하다가 시간이 지나갑니다."
            isSelected={selectedOption === '생각만 하다가 시간이 지나갑니다.'}
            onSelect={handleSelectOption}
          />

          <div className="other-box fade-up d4 visible">
            <span className="other-label">+ 직접 입력</span>
            <textarea
              className="other-textarea"
              placeholder="무엇이 가장 걸리는지 적어 주세요. 떠오르는 대로 괜찮습니다."
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
