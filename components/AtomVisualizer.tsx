import React, { useState } from 'react';

interface Props {
  symbol: string;
  shells: number[];
  color: string;
}

const AtomVisualizer: React.FC<Props> = ({ symbol, shells, color }) => {
  const [mode, setMode] = useState<'bohr' | 'cloud'>('bohr');

  return (
    <div className="relative w-full h-[400px] bg-black/40 rounded-3xl overflow-hidden border border-white/10 flex flex-col items-center justify-center group">
      {/* Mode Switcher */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex bg-black/50 p-1 rounded-full border border-white/10 backdrop-blur-md">
        <button
          onClick={() => setMode('bohr')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === 'bohr' ? 'bg-indigo-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          Bohr Model
        </button>
        <button
          onClick={() => setMode('cloud')}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
            mode === 'cloud' ? 'bg-purple-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
          }`}
        >
          Quantum Cloud
        </button>
      </div>

      {/* Visualizer Stage */}
      <div className="relative w-full h-full flex items-center justify-center perspective-1000">
        
        {mode === 'bohr' ? (
          <div className="relative w-[300px] h-[300px] animate-spin-slow-3d">
             {/* Nucleus */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-[0_0_30px_white] z-10 flex items-center justify-center font-black text-black text-xs">
                {symbol}
             </div>
             
             {/* Shells */}
             {shells.map((count, index) => {
               const radius = 60 + (index * 35);
               const duration = 10 + (index * 5);
               return (
                 <div
                   key={index}
                   className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
                   style={{
                     width: `${radius * 2}px`,
                     height: `${radius * 2}px`,
                     animation: `spin ${duration}s linear infinite reverse`, // Shells rotate
                   }}
                 >
                   {/* Electrons */}
                   {Array.from({ length: count }).map((_, i) => {
                     const angle = (360 / count) * i;
                     return (
                       <div
                         key={i}
                         className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_10px_#818cf8]"
                         style={{
                           transformOrigin: `50% ${radius}px`,
                           transform: `rotate(${angle}deg)`,
                         }}
                       />
                     );
                   })}
                 </div>
               );
             })}
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Quantum Cloud Simulation */}
             <div 
                className="w-10 h-10 bg-white rounded-full blur-sm absolute z-20 animate-pulse"
                style={{ boxShadow: `0 0 50px ${color}` }}
             ></div>
             
             {/* S Orbital */}
             <div className="absolute w-32 h-32 rounded-full opacity-60 mix-blend-screen animate-blob"
                  style={{ background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }}></div>
             
             {/* P Orbitals (Approx) */}
             <div className="absolute w-64 h-24 rounded-full opacity-40 mix-blend-screen animate-spin-slow blur-xl"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}></div>
             <div className="absolute w-24 h-64 rounded-full opacity-40 mix-blend-screen animate-spin-slow-reverse blur-xl"
                  style={{ background: `linear-gradient(180deg, transparent, #ec4899, transparent)` }}></div>
            
            {/* Probability haze */}
             <div className="absolute w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          </div>
        )}
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        @keyframes spin { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes spin-slow-reverse { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes blob {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default AtomVisualizer;
