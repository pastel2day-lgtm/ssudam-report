'use client';

import React from 'react';

interface OptionButtonProps {
  value: string;
  title: string;
  subtitle: string;
  isSelected?: boolean;
  onSelect: (value: string) => void;
}

export default function OptionButton({ value, title, subtitle, isSelected, onSelect }: OptionButtonProps) {
  return (
    <button
      type="button"
      className={`opt fade-up d1 visible ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(value)}
    >
      {title}
      <span className="opt-sub">{subtitle}</span>
    </button>
  );
}
