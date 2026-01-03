import React from 'react';
import { ElementData, Language } from '../types';
import AtomVisualizer from './AtomVisualizer';
import { SpectrumDisplay, SafetyCard } from './VisualComponents';
import { BeakerIcon, HistoryIcon, SparklesIcon, AtomIcon } from './Icons';

interface ElementDetailsProps {
  data: ElementData;
  language: Language;
}

const ElementDetails: React.FC<ElementDetailsProps> = ({ data, language }) => {
  const isZh = language === 'zh';

  const t = {
    atomicNumber: isZh ? "原子序数" : "Atomic #",
    atomicMass: isZh ? "原子量" : "Mass",
    category: isZh ? "族系" : "Category",
    phase: isZh ? "物态 (常温)" : "Phase (STP)",
    density: isZh ? "密度" : "Density",
    appearance: isZh ? "外观" : "Appearance",
    meltingPoint: isZh ? "熔点" : "Melting Point",
    boilingPoint: isZh ? "沸点" : "Boiling Point",
    history: isZh ? "发现历史" : "History",
    discoverer: isZh ? "发现者" : "Discoverer",
    year: isZh ? "年份" : "Year",
    etymology: isZh ? "词源" : "Etymology",
    microscopic: isZh ? "微观结构" : "Microscopic Structure",
    electronConfig: isZh ? "电子排布" : "Electron Config",
    electronsPerShell: isZh ? "每层电子" : "Electrons/Shell",
    oxidationStates: isZh ? "氧化态" : "Oxidation States",
    electronegativity: isZh ? "电负性" : "Electronegativity",
    ionization: isZh ? "电离能" : "Ionization Energy",
    affinity: isZh ? "电子亲和能" : "Electron Affinity",
    radius: isZh ? "原子半径" : "Atomic Radius",
    isotopes: isZh ? "主要同位素" : "Key Isotopes",
    bioRole: isZh ? "生物作用" : "Biological Role",
    applications: isZh ? "常见应用" : "Common Applications",
    physical: isZh ? "物理性质" : "Physical Properties"
  };

  // Select content language
  const content = {
    category: isZh ? data.categoryCN : data.category,
    phase: isZh ? data.phaseAtSTPCN : data.phaseAtSTP,
    appearance: isZh ? data.appearanceCN : data.appearance,
    description: isZh ? data.descriptionCN : data.description,
    discoverer: isZh ? data.history.discovererCN : data.history.discoverer,
    nameOrigin: isZh ? data.history.nameOriginCN : data.history.nameOrigin,
    bioRole: isZh ? data.biologicalRoleCN : data.biologicalRole,
    applications: isZh ? data.applicationsCN : data.applications,
  };

  const formatTemp = (kelvin: number) => {
    if (kelvin === null || kelvin === undefined) return '-';
    const celsius = kelvin - 273.15;
    return `${kelvin} K / ${celsius.toFixed(2)} °C`;
  };

  return (
    <div className="w-full animate-fade-in-up pb-20">
      
      {/* 1. Header Identity Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 mb-6 backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
                <div 
                    className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl font-black text-white border-2 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    style={{ borderColor: data.color || '#6366f1', backgroundColor: `${data.color}20` }}
                >
                    {data.symbol}
                </div>
                <div>
                    <div className="flex items-baseline gap-3 mb-1">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            {isZh ? data.nameCN : data.name}
                        </h1>
                        <div className="flex flex-col">
                            <span className="text-2xl font-medium text-gray-300">
                                {isZh ? data.name : data.nameCN}
                            </span>
                            <span className="text-xs text-gray-500 font-mono">{data.pronunciation}</span>
                        </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-indigo-300 border border-white/5">
                            {content.category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-gray-400 border border-white/5">
                            {t.atomicNumber}: {data.atomicNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-white/10 text-gray-400 border border-white/5">
                            {t.atomicMass}: {data.atomicMass}
                        </span>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block text-right max-w-xs">
                <p className="text-sm text-gray-400 italic leading-relaxed">
                   "{content.description}"
                </p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visualizer & Microscopic Data (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
            <AtomVisualizer 
                symbol={data.symbol} 
                shells={data.electronsPerShell || []} 
                color={data.color || '#6366f1'} 
            />
            
            {/* Microscopic Structure Card */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <AtomIcon className="text-indigo-400 w-5 h-5"/> {t.microscopic}
                 </h3>
                 
                 <div className="space-y-4">
                    <DataRow label={t.electronConfig} value={data.electronConfiguration} font="mono" />
                    <DataRow label={t.electronsPerShell} value={data.electronsPerShell.join(', ')} />
                    <DataRow label={t.oxidationStates} value={data.oxidationStates} />
                    <DataRow label={t.electronegativity} value={data.electronegativity} />
                    <DataRow label={t.ionization} value={data.ionizationEnergy} />
                    <DataRow label={t.affinity} value={data.electronAffinity} />
                    <DataRow label={t.radius} value={data.atomicRadius} />
                    
                    <div className="pt-2 border-t border-gray-800">
                        <span className="text-xs text-gray-500 uppercase tracking-wider block mb-2">{t.isotopes}</span>
                        <div className="flex flex-wrap gap-2">
                            {data.isotopes && data.isotopes.map((iso, i) => (
                                <span key={i} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20">
                                    {iso}
                                </span>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
        </div>

        {/* Right Column: Physical, History, Usage (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
            
            {/* Physical Properties Grid */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <SparklesIcon className="text-cyan-400 w-5 h-5"/> {t.physical}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase">{t.phase}</p>
                        <p className="text-lg font-medium text-white">{content.phase}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase">{t.density}</p>
                        <p className="text-lg font-medium text-white">{data.density}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase">{t.appearance}</p>
                        <p className="text-sm font-medium text-white leading-tight">{content.appearance}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase">{t.meltingPoint}</p>
                        <p className="text-lg font-medium text-blue-200">{formatTemp(data.meltingPoint)}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-xs text-gray-500 uppercase">{t.boilingPoint}</p>
                        <p className="text-lg font-medium text-red-200">{formatTemp(data.boilingPoint)}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* History */}
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between">
                     <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <HistoryIcon className="text-orange-400 w-5 h-5"/> {t.history}
                        </h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between">
                                <span className="text-gray-500">{t.discoverer}</span>
                                <span className="text-white text-right">{content.discoverer}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-gray-500">{t.year}</span>
                                <span className="text-white text-right">{data.history.discoveryYear}</span>
                            </li>
                        </ul>
                     </div>
                     <div className="mt-4 pt-4 border-t border-gray-800">
                        <p className="text-xs text-gray-500 uppercase mb-1">{t.etymology}</p>
                        <p className="text-sm text-gray-300 italic">"{content.nameOrigin}"</p>
                     </div>
                </div>

                {/* Biological & Spectrum */}
                <div className="space-y-6">
                     <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                        <h3 className="text-sm font-bold text-gray-400 uppercase mb-2">{t.bioRole}</h3>
                        <p className="text-white text-sm leading-relaxed border-l-2 border-green-500 pl-3">
                            {content.bioRole}
                        </p>
                     </div>
                     <SpectrumDisplay colors={data.spectrumColors} language={language} />
                </div>
            </div>

            {/* Applications & Safety */}
            <div className="bg-gradient-to-br from-indigo-900/20 to-gray-900 border border-indigo-500/20 rounded-2xl p-6">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <BeakerIcon className="text-green-400 w-5 h-5"/> {t.applications}
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {content.applications.map((app, i) => (
                                <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                                    {app}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-64 shrink-0">
                         <SafetyCard data={data.safety} language={language} />
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

const DataRow: React.FC<{ label: string; value: string; font?: string }> = ({ label, value, font }) => (
    <div className="flex justify-between items-center border-b border-gray-800 pb-2 last:border-0 last:pb-0">
        <span className="text-sm text-gray-500">{label}</span>
        <span className={`text-sm text-white text-right ${font === 'mono' ? 'font-mono text-xs' : 'font-medium'}`}>
            {value || '-'}
        </span>
    </div>
);

export default ElementDetails;
