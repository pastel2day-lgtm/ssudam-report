import React from 'react';
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { EPTI_TYPES } from '@/utils/eptiData';

interface ReportChartsProps {
  typeScores: Record<number, number>;
  maxType: number;
}

export default function ReportCharts({ typeScores, maxType }: ReportChartsProps) {
  const radarData = [
    { subject: '완벽', score: typeScores[1] || 0, fullMark: 20 },
    { subject: '조력', score: typeScores[2] || 0, fullMark: 20 },
    { subject: '성취', score: typeScores[3] || 0, fullMark: 20 },
    { subject: '예술', score: typeScores[4] || 0, fullMark: 20 },
    { subject: '탐구', score: typeScores[5] || 0, fullMark: 20 },
    { subject: '충실', score: typeScores[6] || 0, fullMark: 20 },
    { subject: '열정', score: typeScores[7] || 0, fullMark: 20 },
    { subject: '도전', score: typeScores[8] || 0, fullMark: 20 },
    { subject: '평화', score: typeScores[9] || 0, fullMark: 20 },
  ];

  const barData = Object.keys(typeScores).map(k => {
    const typeId = parseInt(k, 10);
    return {
      typeId,
      name: EPTI_TYPES[typeId]?.name?.split(' ')[0] || String(typeId),
      score: typeScores[typeId] || 0,
    };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="fade-up visible" style={{ marginBottom: '48px' }}>
      
      <h2 style={{ fontSize: '18px', fontWeight: '900', color: '#191F28', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ display: 'flex', alignItems: 'center', color: 'var(--accent)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
        </span>
        다각도 심리 프로파일 데이터
      </h2>
      
      <div style={{ background: '#FFFFFF', border: '1px solid #E5E8EB', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 12px 32px rgba(0,0,0,0.04)' }}>
        
        {/* Radar Chart Area */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#191F28' }}>다각도 성향 밸런스</div>
            <div style={{ fontSize: '13px', color: '#8B95A1', marginTop: '6px', fontWeight: '500' }}>9가지 주요 성향의 발달 정도를 방사형으로 보여줍니다.</div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--accent)" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <PolarGrid stroke="#e5e8eb" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#4E5968', fontSize: 12, fontWeight: 700 }} />
                <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                <Radar name="성향 점수" dataKey="score" stroke="var(--accent)" strokeWidth={3} fill="url(#colorScore)" fillOpacity={1} />
                <Tooltip wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#E5E8EB', margin: '0 -24px 32px -24px' }}></div>

        {/* Bar Chart Area */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '15px', fontWeight: '900', color: '#191F28' }}>세부 성향 척도 분포도</div>
            <div style={{ fontSize: '13px', color: '#8B95A1', marginTop: '6px', fontWeight: '500' }}>가장 짙게 표시된 최상위 요인이 나의 주된 방어기제로 작동합니다.</div>
          </div>
          <div style={{ width: '100%', height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E8EB" />
                <XAxis type="number" domain={[0, 20]} tick={{ fill: '#8B95A1', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: '#4E5968', fontSize: 13, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#F8F9FA' }} wrapperStyle={{ fontSize: '13px', fontWeight: 600 }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={18}>
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.typeId === maxType ? 'var(--accent)' : '#D1D6DB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </div>
  );
}
