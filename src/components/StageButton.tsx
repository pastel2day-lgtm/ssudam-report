'use client';

import React from 'react';

interface StageButtonProps {
  trackId: string;
  num: number;
  title: string;
  desc: string;
  isSelected: boolean;
  onSelect: (trackId: string) => void;
}

export default function StageButton({ trackId, num, title, desc, isSelected, onSelect }: StageButtonProps) {
  return (
    <button
      type="button"
      className={`stage-btn ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(trackId)}
    >
      <div className="stage-num">{num}</div>
      <div className="stage-content">
        <div className="stage-title">{title}</div>
        <div className="stage-desc">{desc}</div>
      </div>
    </button>
  );
}
