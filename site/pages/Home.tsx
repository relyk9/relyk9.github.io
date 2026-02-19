
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HOME_DATA, LOG_POOL, ABOUT_DATA } from '../constants';
import NewsFeed from '../components/NewsFeed';

interface LogEntry {
  text: string;
  color: string;
  time: string;
}

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [activeLogs, setActiveLogs] = useState<LogEntry[]>([]);
  const [avatarInteracted, setAvatarInteracted] = useState(false);
  const fullText = HOME_DATA.typedText;
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [fullText]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [activeLogs]);

  const addManualLog = () => {
    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const randomLog = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
    setActiveLogs(prev => {
      const newLogs = [...prev, { ...randomLog, time: getTime() }];
      return newLogs.slice(-100);
    });
  };

  return (
    <div className="space-y-8 md:space-y-16 animate-in fade-in duration-1000">
      <section className="bg-black/80 border border-[#00FF41] p-6 md:p-12 rounded shadow-[0_0_40px_rgba(0,255,65,0.05)] relative overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 md:gap-16 items-start relative z-10">
          <div className="flex flex-col w-full">
            <div className="space-y-4 mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="px-3 py-1 bg-cyan-500 text-black text-[10px] md:text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)] uppercase">
                  {HOME_DATA.userId}
                </div>
                <div className="px-3 py-1 border border-[#00FF41]/40 text-[#00FF41] text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                  STATUS: WORKING
                </div>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-bold glow-text leading-tight uppercase">
                {HOME_DATA.heroTitle[0]} <br className="hidden md:block" /> <span className="text-cyan-400">{HOME_DATA.heroTitle[1]}</span>
              </h2>

              <div className="border-l-2 border-pink-500 pl-4 py-3 bg-pink-500/5 my-4 max-w-2xl">
                <p className="text-[10px] text-pink-400 font-bold tracking-widest uppercase mb-1">
                  {ABOUT_DATA.missionTitle}
                </p>
                <p className="text-xs md:text-sm text-white/90 italic mb-4">"{ABOUT_DATA.missionStatement}"</p>
                <div className="flex items-center gap-4">
                  <Link to="/about" className="text-yellow-400 underline underline-offset-4 hover:text-white transition-colors text-[10px] font-bold tracking-[0.2em] uppercase">
                    READ_BIO
                  </Link>
                </div>
              </div>
            </div>

            <div className="mb-8 md:mb-10">
               <Link to="/portfolio" className="inline-block border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black px-8 py-3 transition-all duration-300 shadow-[0_0_15px_rgba(236,72,153,0.2)] font-bold text-xs md:text-sm tracking-[0.2em] uppercase w-full md:w-auto text-center">
                  VIEW_PORTFOLIO
                </Link>
            </div>

            <div className="mt-2 md:mt-4 bg-black/40 md:bg-transparent p-4 md:p-0 border border-white/5 md:border-none rounded">
               <pre className="text-[11px] md:text-base leading-relaxed h-28 whitespace-pre-wrap font-mono text-yellow-400/90 overflow-hidden">
                {typedText}
                <span className="animate-pulse text-[#00FF41]">|</span>
              </pre>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full md:w-auto md:shrink-0 order-first md:order-last">
            <div 
              className="w-48 h-48 md:w-64 md:h-64 border border-cyan-500 p-2 relative group cursor-pointer"
              onMouseEnter={() => setAvatarInteracted(true)}
              onClick={() => setAvatarInteracted(true)}
            >
              <div className="absolute inset-0 border border-cyan-500 animate-pulse"></div>
              <img 
                src={HOME_DATA.avatarUrl} 
                alt="System Avatar" 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  avatarInteracted 
                  ? 'grayscale-0 brightness-100' 
                  : 'grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0'
                }`}
              />
            </div>
            <div className="text-center">
              <p className="text-base md:text-xl font-bold text-cyan-400 tracking-[0.3em] glow-text uppercase">{HOME_DATA.userName}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {HOME_DATA.stats.map((stat, idx) => (
          <div key={idx} className={`border ${stat.border} p-4 md:p-6 flex items-center gap-4 hover:border-white transition-all bg-black/40 group overflow-hidden rounded-sm`}>
            <div className={`text-xl md:text-3xl ${stat.color} group-hover:scale-110 transition-transform shrink-0`}>{stat.icon}</div>
            <div className="min-w-0 flex-1">
              <p className="text-[9px] md:text-[10px] text-white/40 font-bold tracking-widest uppercase truncate mb-0.5">{stat.label}</p>
              <p className={`font-bold ${stat.color} group-hover:text-white transition-colors leading-tight ${
                stat.value.length > 12 ? 'text-xs md:text-base' : 'text-lg md:text-2xl'
              }`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NewsFeed />
        <section className="bg-black/80 border border-white/10 p-5 md:p-6 rounded flex flex-col h-[400px] md:h-[450px] shadow-lg">
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-white/5 pb-4">
            <h3 className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-[0.2em] leading-relaxed">
              {HOME_DATA.logSectionTitle}
            </h3>
            <button 
              onClick={addManualLog}
              className="w-full lg:w-auto px-5 py-2 border border-[#00FF41] text-[#00FF41] text-[9px] md:text-[10px] font-bold hover:bg-[#00FF41] hover:text-black transition-all active:scale-95 shadow-[0_0_15px_rgba(0,255,65,0.1)] uppercase tracking-widest"
            >
              [RUN_DIAGNOSTICS]
            </button>
          </header>
          <div ref={logContainerRef} className="flex-1 space-y-1.5 overflow-y-auto scroll-smooth pr-2 custom-scrollbar font-mono">
            {activeLogs.map((log, i) => (
              <div key={`${log.text}-${i}`} className="flex gap-2 animate-in slide-in-from-left-2 fade-in duration-300">
                 <span className="text-[9px] md:text-[10px] text-white/20 shrink-0">[{log.time}]</span>
                 <p className={`text-[10px] md:text-xs ${log.color} opacity-90 break-words`}>
                  {log.text}
                </p>
              </div>
            ))}
            {activeLogs.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20 text-center px-4">
                <p className="text-[10px] md:text-xs italic uppercase tracking-[0.3em]">System IDLE. Waiting for diagnostic trigger...</p>
                <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-[#00FF41] to-transparent"></div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
