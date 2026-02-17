
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HOME_DATA, LOG_POOL } from '../constants';

interface LogEntry {
  text: string;
  color: string;
  time: string;
}

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const [activeLogs, setActiveLogs] = useState<LogEntry[]>([]);
  const fullText = HOME_DATA.typedText;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [fullText]);

  // Initialize logs and stream them over time
  useEffect(() => {
    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Initial trickle
    const shuffled = [...LOG_POOL].sort(() => 0.5 - Math.random()).slice(0, 3);
    setActiveLogs(shuffled.map(log => ({ ...log, time: getTime() })));

    let timeoutId: number;
    const streamLogs = () => {
      const nextLogTime = Math.random() * 5000 + 2000; // 2-7 seconds for organic feel
      timeoutId = window.setTimeout(() => {
        const randomLog = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
        setActiveLogs(prev => {
          const newLogs = [{ ...randomLog, time: getTime() }, ...prev];
          return newLogs.slice(0, 5); // Keep visible history brief and focused
        });
        streamLogs();
      }, nextLogTime);
    };

    streamLogs();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <section className="bg-black/60 border border-[#00FF41] p-8 md:p-12 rounded shadow-[0_0_40px_rgba(0,255,65,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <div className="text-[100px] font-bold text-cyan-500 rotate-12">MECH</div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 bg-cyan-500 text-black text-xs font-bold mb-2 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              USER_ID: {HOME_DATA.userId}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold glow-text leading-tight">
              {HOME_DATA.heroTitle[0]} <br /> <span className="text-cyan-400">{HOME_DATA.heroTitle[1]}</span>
            </h2>
            <pre className="text-sm md:text-base leading-relaxed h-32 whitespace-pre-wrap font-mono text-yellow-400/90">
              {typedText}
              <span className="animate-pulse text-[#00FF41]">|</span>
            </pre>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/portfolio" className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black px-6 py-2 transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.3)] font-bold text-sm tracking-widest">
                VIEW_PORTFOLIO
              </Link>
              <Link to="/about" className="text-yellow-400 underline underline-offset-4 hover:text-white transition-colors text-sm font-bold tracking-widest">
                READ_BIO
              </Link>
            </div>
          </div>
          <div className="w-64 h-64 border border-cyan-500 p-2 relative group">
            <div className="absolute inset-0 border border-cyan-500 animate-pulse"></div>
            <div className="absolute -top-4 -right-4 bg-red-500 text-black px-2 py-1 text-[10px] font-bold">LIVE_FEED</div>
            <img 
              src={HOME_DATA.avatarUrl} 
              alt="System Avatar" 
              className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* System Stats Section */}
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

      {/* Simulation Log */}
      <section className="bg-black/40 border border-white/10 p-4 rounded-lg overflow-hidden h-44">
        <h3 className="text-xs mb-2 text-white/40 flex justify-between uppercase tracking-widest">
          <span>{HOME_DATA.logSectionTitle}</span>
          <span className="animate-pulse text-red-500 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            RECORDING
          </span>
        </h3>
        <div className="space-y-1 overflow-hidden">
          {activeLogs.map((log, i) => (
            <p key={`${log.text}-${i}`} className={`text-[10px] font-mono ${log.color} opacity-90 animate-in slide-in-from-left-2 fade-in duration-300`}>
              [ {log.time} ] {log.text}
            </p>
          ))}
          {activeLogs.length === 0 && <p className="text-[10px] text-white/20 italic font-mono">Initializing data stream...</p>}
        </div>
      </section>
    </div>
  );
};

export default Home;
