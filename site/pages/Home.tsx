
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HOME_DATA, LOG_POOL, ABOUT_DATA } from '../constants';

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
    <div className="space-y-16 animate-in fade-in duration-1000">
      <section className="bg-black/60 border border-[#00FF41] p-8 md:p-12 rounded shadow-[0_0_40px_rgba(0,255,65,0.05)] relative overflow-hidden">
        
        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="px-3 py-1 bg-cyan-500 text-black text-xs font-bold shadow-[0_0_10px_rgba(6,182,212,0.5)] uppercase">
                {HOME_DATA.userId}
              </div>
              <div className="px-3 py-1 border border-[#00FF41]/40 text-[#00FF41] text-[10px] font-bold tracking-[0.3em] uppercase">
                STATUS: WORKING
              </div>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold glow-text leading-tight">
              {HOME_DATA.heroTitle[0]} <br /> <span className="text-cyan-400">{HOME_DATA.heroTitle[1]}</span>
            </h2>

            <div className="border-l-2 border-pink-500 pl-4 py-2 bg-pink-500/5 my-4">
              <p className="text-xs text-pink-400 font-bold tracking-widest uppercase mb-1">
                {ABOUT_DATA.missionTitle} / {ABOUT_DATA.missionHeader}
              </p>
              <p className="text-sm text-white/90 italic mb-4">"{ABOUT_DATA.missionStatement}"</p>
              <Link to="/about" className="text-yellow-400 underline underline-offset-4 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
                READ_BIO
              </Link>
            </div>

            <pre className="text-sm md:text-base leading-relaxed h-28 whitespace-pre-wrap font-mono text-yellow-400/90">
              {typedText}
              <span className="animate-pulse text-[#00FF41]">|</span>
            </pre>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/portfolio" className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black px-6 py-2 transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.3)] font-bold text-sm tracking-widest">
                VIEW_PORTFOLIO
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:self-center">
            <div 
              className="w-64 h-64 border border-cyan-500 p-2 relative group cursor-pointer"
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
              <p className="text-xl font-bold text-cyan-400 tracking-widest glow-text uppercase">{HOME_DATA.userName}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {HOME_DATA.stats.map((stat, idx) => (
          <div key={idx} className={`border ${stat.border} p-6 flex items-center gap-6 hover:border-white transition-all bg-black/40 group`}>
            <div className={`text-3xl ${stat.color} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
            <div>
              <p className="text-[10px] text-white/40 font-bold tracking-tighter uppercase">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} group-hover:text-white transition-colors`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-black/40 border border-white/10 p-6 rounded-lg overflow-hidden flex flex-col h-64">
        <h3 className="text-xs mb-4 text-white/40 flex justify-between items-center uppercase tracking-widest">
          <span>{HOME_DATA.logSectionTitle}</span>
          <button 
            onClick={addManualLog}
            className="px-4 py-1 border border-[#00FF41] text-[#00FF41] text-[10px] font-bold hover:bg-[#00FF41] hover:text-black transition-all active:scale-95 shadow-[0_0_10px_rgba(0,255,65,0.2)]"
          >
            [RUN_DIAGNOSTICS]
          </button>
        </h3>
        <div ref={logContainerRef} className="flex-1 space-y-1 overflow-y-auto scroll-smooth pr-2 custom-scrollbar">
          {activeLogs.map((log, i) => (
            <p key={`${log.text}-${i}`} className={`text-xs font-mono ${log.color} opacity-90 animate-in slide-in-from-left-2 fade-in duration-300`}>
              [ {log.time} ] {log.text}
            </p>
          ))}
          {activeLogs.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-20">
              <p className="text-xs italic font-mono uppercase tracking-[0.3em]">System IDLE. Waiting for diagnostic trigger...</p>
              <div className="w-48 h-px bg-gradient-to-r from-transparent via-[#00FF41] to-transparent"></div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
