
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import EquationRain from './EquationRain';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [flickerKey, setFlickerKey] = useState(0);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playTransitionSound = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      const bufferSize = ctx.sampleRate * 0.12; 
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, ctx.currentTime);
      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      source.start();
    } catch (e) {
      console.warn("Audio playback failed", e);
    }
  };

  useEffect(() => {
    setFlickerKey(prev => prev + 1);
    playTransitionSound();
  }, [location.pathname]);

  const navItems = [
    { label: '[HOME]', path: '/', color: 'hover:text-cyan-400' },
    { label: '[ABOUT]', path: '/about', color: 'hover:text-yellow-400' },
    { label: '[PORTFOLIO]', path: '/portfolio', color: 'hover:text-pink-400' },
    { label: '[EXPERIENCE]', path: '/experience', color: 'hover:text-blue-400' },
    { label: '[TYPING_TEST]', path: '/challenge', color: 'hover:text-red-400' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative text-[#00FF41] bg-[#020202] overflow-x-hidden">
      {/* Background Layer: Equation Rain */}
      <div className="fixed inset-0 z-0">
        <EquationRain />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#00FF41] py-4 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={playTransitionSound}>
              <div className="w-3 h-3 rounded-full bg-[#00FF41] animate-pulse group-hover:bg-cyan-400"></div>
              <h1 className="text-xl font-bold tracking-widest glow-text group-hover:text-cyan-400 transition-colors uppercase">KylerM_Mechanical</h1>
            </div>
            <nav className="flex flex-wrap justify-center gap-4 md:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-all duration-300 ${item.color} ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) ? 'bg-[#00FF41] text-black px-2 py-0.5 shadow-[0_0_10px_#00FF41]' : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <div className="bg-[#001a08]/80 backdrop-blur-sm border-b border-[#00FF41]/20 text-[10px] uppercase tracking-[0.2em] hidden md:block px-6 py-1">
          <div className="max-w-6xl mx-auto flex justify-between">
            <div className="flex gap-4">
              <span className="text-cyan-400">System: <span className="text-white">OPTIMAL</span></span>
              <span className="text-yellow-400">Enc: <span className="text-white">AES-256</span></span>
              <span className="text-pink-400">Node: <span className="text-white">MECH_SCTR_7</span></span>
            </div>
            <div className="flex gap-4">
              <span className="text-blue-400">CPU_TEMP: <span className="text-white">42°C</span></span>
              <span className="text-red-400">LATENCY: <span className="text-white">12ms</span></span>
              <span className="text-[#00FF41]">Local Time: <span className="text-white">{new Date().toLocaleTimeString()}</span></span>
            </div>
          </div>
        </div>

        <main 
          key={flickerKey} 
          className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 page-flicker relative z-20"
        >
          {children}
        </main>

        <footer className="border-t border-[#00FF41]/30 bg-black/40 backdrop-blur-sm py-8 px-6 text-center text-xs opacity-60">
          <div className="flex justify-center gap-4 mb-2">
            <span className="text-cyan-500 hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Git_Archive</span>
            <span className="text-pink-500 hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Connect_Link</span>
            <span className="text-yellow-500 hover:text-white cursor-pointer transition-colors uppercase tracking-widest">Comm_Channel</span>
          </div>
          <p>© {new Date().getFullYear()} MECHANICAL_SYSTEMS_PORTFOLIO // <span className="text-blue-400 font-bold uppercase">Authorized_Access_Only</span></p>
          <p className="mt-2 font-mono text-[#00FF41]/40 tracking-widest uppercase">INIT_PROTOCOL_COMPLETE // END_OF_LINE</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
