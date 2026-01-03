import React from 'react';
import { SafetyData, Language } from '../types';

export const SpectrumDisplay: React.FC<{ colors: string[], language: Language }> = ({ colors, language }) => (
  <div className="w-full bg-black/40 rounded-xl p-4 border border-white/10">
    <h4 className="text-gray-400 text-xs uppercase tracking-widest mb-3">
        {language === 'zh' ? '发射光谱' : 'Emission Spectrum'}
    </h4>
    <div className="relative w-full h-8 bg-gray-900 rounded overflow-hidden flex items-center shadow-inner">
      {/* Background darkness */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-90"></div>
      
      {/* Spectral Lines */}
      {colors && colors.length > 0 ? (
          colors.map((color, i) => (
            <div 
                key={i}
                className="absolute h-full w-0.5"
                style={{ 
                    backgroundColor: color, 
                    left: `${15 + (i * (80 / colors.length))}%`,
                    boxShadow: `0 0 4px ${color}`
                }}
            />
          ))
      ) : (
          <p className="w-full text-center text-gray-700 text-xs">
              {language === 'zh' ? '无可见光谱数据' : 'No visible spectrum'}
          </p>
      )}
    </div>
  </div>
);

export const SafetyCard: React.FC<{ data: SafetyData, language: Language }> = ({ data, language }) => {
    const getHazardColor = (level: string) => {
        switch(level) {
            case 'Low': return 'bg-green-500 text-green-950';
            case 'Moderate': return 'bg-yellow-500 text-yellow-950';
            case 'High': return 'bg-orange-500 text-white';
            case 'Extreme': return 'bg-red-600 text-white animate-pulse';
            default: return 'bg-gray-500';
        }
    };

    const labels = {
        title: language === 'zh' ? '安全与危害' : 'Safety & Hazard',
        hazardLevel: {
            'Low': language === 'zh' ? '低' : 'Low',
            'Moderate': language === 'zh' ? '中' : 'Moderate',
            'High': language === 'zh' ? '高' : 'High',
            'Extreme': language === 'zh' ? '极高' : 'Extreme'
        }
    };

    return (
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
                <span className="text-red-400 font-bold uppercase text-xs tracking-wider">{labels.title}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${getHazardColor(data.hazardLevel)}`}>
                    {labels.hazardLevel[data.hazardLevel] || data.hazardLevel}
                </span>
            </div>
            <div className="flex items-start gap-3">
                 <div className="text-2xl">⚠️</div>
                 <div>
                    <h4 className="text-white font-bold text-sm mb-1">
                        {language === 'zh' ? data.mainHazardCN : data.mainHazard}
                    </h4>
                    <p className="text-gray-400 text-xs leading-relaxed">
                        {language === 'zh' ? data.precautionsCN : data.precautions}
                    </p>
                 </div>
            </div>
        </div>
    );
};
