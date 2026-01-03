import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ElementDetails from './components/ElementDetails';
import { ElementData, Language } from './types';
import { fetchElementData } from './services/geminiService';

const App: React.FC = () => {
  const [data, setData] = useState<ElementData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [language, setLanguage] = useState<Language>('zh');

  const handleSearch = async (term: string) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    setData(null);

    try {
      const result = await fetchElementData(term);
      setData(result);
    } catch (err) {
      setError(language === 'zh' ? "无法分析元素数据，请检查名称。" : "Unable to analyze element data. Please verify the name.");
    } finally {
      setLoading(false);
    }
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-gray-100 selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        
        {/* Language Toggle - Absolute Top Right */}
        <div className="absolute top-6 right-6 z-50">
           <button 
             onClick={toggleLanguage}
             className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-sm font-bold transition-all backdrop-blur-md"
           >
             {language === 'zh' ? 'EN / 中' : '中 / EN'}
           </button>
        </div>

        {/* Navbar / Header */}
        <header className={`transition-all duration-700 ease-out flex flex-col items-center ${hasSearched ? 'mb-8 py-4' : 'flex-1 justify-center pb-20'}`}>
          <div className={`text-center transition-all duration-700 ${hasSearched ? 'scale-75 mb-4' : 'mb-12'}`}>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-gray-200 to-gray-500">
              Elemental<span className="text-indigo-500">.</span>Vision
            </h1>
            {!hasSearched && (
              <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                {language === 'zh' 
                  ? "看见不可见。交互式 3D 可视化与深度化学微观宇宙。" 
                  : "See the invisible. Interactive 3D visualization and deep insights for the chemical universe."}
              </p>
            )}
          </div>
          
          <SearchBar onSearch={handleSearch} isLoading={loading} language={language} />
          
          {/* Quick Suggestions */}
          {!hasSearched && !loading && (
             <div className="mt-12 flex flex-wrap justify-center gap-3 opacity-60">
               {['Neon', 'Bismuth', 'Gold', 'Uranium'].map((el) => (
                 <button 
                   key={el}
                   onClick={() => handleSearch(el)}
                   className="px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-indigo-500/50 transition-all text-sm font-mono text-gray-400 hover:text-white"
                 >
                   {el}
                 </button>
               ))}
             </div>
          )}
        </header>

        {/* Main Content Dashboard */}
        <main className="flex-grow w-full">
          {error && (
            <div className="text-center p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 max-w-xl mx-auto animate-fade-in backdrop-blur-md">
              {error}
            </div>
          )}

          {data && !loading && (
            <ElementDetails data={data} language={language} />
          )}
        </main>
        
        {/* Footer */}
        {hasSearched && (
            <footer className="mt-12 text-center text-gray-700 text-xs py-6 border-t border-white/5">
            <p>Elemental Vision © {new Date().getFullYear()} • Powered by Gemini 3 Flash</p>
            </footer>
        )}

      </div>
    </div>
  );
};

export default App;
