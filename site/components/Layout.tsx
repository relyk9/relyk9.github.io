
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EquationRain from './EquationRain';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [flickerKey, setFlickerKey] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cpuTemp, setCpuTemp] = useState(42.5);
  const [latency, setLatency] = useState(12);
  const [nodeId, setNodeId] = useState('MECH_SCTR_7');
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setCpuTemp(prev => {
        const base = 42.0;
        const trend = Math.sin(Date.now() / 10000) * 3;
        const noise = (Math.random() - 0.5) * 1.8;
        return base + trend + noise;
      });
      setLatency(prev => {
        const base = 12;
        const jitter = Math.floor(Math.random() * 15) - 5;
        return Math.max(2, base + jitter);
      });
    }, 1000);

    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (tz.includes('New_York') || tz.includes('Detroit') || tz.includes('Miami')) setNodeId('US_EAST');
      else if (tz.includes('Chicago') || tz.includes('Dallas')) setNodeId('US_CENTRAL');
      else if (tz.includes('Denver') || tz.includes('Phoenix')) setNodeId('US_MOUNTAIN');
      else if (tz.includes('Los_Angeles') || tz.includes('Seattle')) setNodeId('US_WEST');
      else if (tz.includes('Europe')) setNodeId('EU_SECTOR');
      else if (tz.includes('Asia')) setNodeId('AS_SECTOR');
      else setNodeId(tz.split('/')[1]?.toUpperCase() || 'GLOBAL_NODE');
    } catch (e) {
      setNodeId('REMOTE_NODE');
    }

    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { label: '[HOME]', path: '/', color: 'hover:text-cyan-400' },
    { label: '[ABOUT]', path: '/about', color: 'hover:text-yellow-400' },
    { label: '[PORTFOLIO]', path: '/portfolio', color: 'hover:text-pink-400' },
    { label: '[EXPERIENCE]', path: '/experience', color: 'hover:text-blue-400' },
    { label: '[TYPING_TEST]', path: '/challenge', color: 'hover:text-red-400' },
  ];

  return (
    <div className="min-h-screen flex flex-col relative text-[#00FF41] bg-[#020202] overflow-x-hidden">
      <div className="fixed inset-0 z-0">
        <EquationRain />
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[#00FF41] py-4 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={playTransitionSound}>
              <div className="w-3 h-3 rounded-full bg-[#00FF41] animate-pulse group-hover:bg-cyan-400"></div>
              <h1 className="text-xl font-bold tracking-widest glow-text group-hover:text-cyan-400 transition-colors uppercase">KYLERM.ME</h1>
            </Link>
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
              <span className="text-cyan-400">System: <span className="text-white">UNDER DEV</span></span>
              <span className="text-yellow-400">Enc: <span className="text-white">AES-256</span></span>
              <span className="text-pink-400">Node: <span className="text-white">{nodeId}</span></span>
            </div>
            <div className="flex gap-4">
              <span className="text-blue-400">CPU_TEMP: <span className="text-white">{cpuTemp.toFixed(1)}°C</span></span>
              <span className="text-red-400">LATENCY: <span className="text-white">{latency}ms</span></span>
              <span className="text-[#00FF41]">Local Time: <span className="text-white">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span></span>
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
            <a href="https://github.com/relyk9" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-white transition-colors uppercase tracking-widest">GITHUB</a>
            <a href="https://www.linkedin.com/in/kyler-m-b830aa17a" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-white transition-colors uppercase tracking-widest">LINKEDIN</a>
            <a href="mailto:kylermof@gmail.com" className="text-yellow-500 hover:text-white transition-colors uppercase tracking-widest">EMAIL</a>
          </div>
          <p>© {new Date().getFullYear()} KYLER MOFFAT // <span className="text-blue-400 font-bold uppercase">Digital_Interface_v1.0</span></p>
          <p className="mt-2 font-mono text-[#00FF41]/40 tracking-widest uppercase">INIT_PROTOCOL_COMPLETE // END_OF_LINE</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
