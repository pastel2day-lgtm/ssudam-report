'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SurveyData {
  track: string;
  q1: string;
  q2: string;
  q3: string;
  eptiAnswers: Record<number, number>;
  sessionId?: string;
}

interface SurveyContextType {
  data: SurveyData;
  updateData: (key: keyof SurveyData, value: string | Record<number, number>) => void;
  resetSurvey: () => void;
}

const defaultData: SurveyData = {
  track: '',
  q1: '',
  q2: '',
  q3: '',
  eptiAnswers: {},
  sessionId: '', // Will be set on client side
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SurveyData>(defaultData);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      sessionId: Date.now().toString() + '-' + Math.floor(Math.random() * 10000)
    }));
  }, []);

  const updateData = (key: keyof SurveyData, value: string | Record<number, number>) => {
    setData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSurvey = () => {
    setData(defaultData);
    localStorage.removeItem('recharge_answers');
  };

  return (
    <SurveyContext.Provider value={{ data, updateData, resetSurvey }}>
      {children}
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
}
