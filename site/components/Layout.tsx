
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import EquationRain from './EquationRain';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [nodeId, setNodeId] = useState('REMOTE');
  const [flickerKey, setFlickerKey] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cpuTemp, setCpuTemp] = useState(42.5);
  const [latency, setLatency] = useState(12);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname.toUpperCase();
    let initialNode = 'REMOTE';
    
    if (hostname === 'LOCALHOST' || hostname === '127.0.0.1') {
      initialNode = 'LOCAL_HOST';
    } else {
      const match = hostname.match(/(US-[A-Z0-9]+)/);
      if (match) {
        initialNode = match[1].replace('-', '_');
      }
    }
    setNodeId(initialNode);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // Permission granted, keep the detected node
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setNodeId('REMOTE');
          }
        }
      );
    }
  }, []);

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
    setIsMenuOpen(false);
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
    <div className={`min-h-screen flex flex-col relative text-[#00FF41] bg-[#020202] overflow-x-hidden`}>
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <EquationRain />
      </div>
      
      {/* Persistent UI Elements */}
      <div className="relative z-10 flex flex-col min-h-screen bg-transparent">
        
        {/* Header - Very High Z-Index to stay above everything */}
        <header className="fixed top-0 inset-x-0 z-[1000] bg-black border-b border-[#00FF41] py-4 px-6 h-[64px] flex items-center shadow-[0_4px_30px_rgba(0,0,0,1)]">
          <div className="w-full max-w-6xl mx-auto flex justify-between items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsMenuOpen(false)}>
              <div className="w-3 h-3 rounded-full bg-[#00FF41] animate-pulse group-hover:bg-cyan-400"></div>
              <h1 className="text-xl font-bold tracking-widest glow-text group-hover:text-cyan-400 transition-colors uppercase">KYLERM.ME</h1>
            </Link>
            
            {/* Desktop Nav */}
            <nav className="hidden lg:flex justify-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm transition-all duration-300 font-bold ${item.color} ${
                    location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path)) 
                      ? 'bg-[#00FF41] text-black px-3 py-1 shadow-[0_0_15px_#00FF41]' 
                      : 'text-[#00FF41]'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Nav Toggle */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-10 h-10 border border-[#00FF41] rounded hover:bg-[#00FF41]/20 transition-all active:scale-90"
              aria-label="Toggle Menu"
            >
              <div className="relative w-6 h-5">
                <span className={`absolute block w-full h-0.5 bg-[#00FF41] transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5 shadow-[0_0_5px_#00FF41]' : 'top-0'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-[#00FF41] transition-all duration-300 top-2.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`absolute block w-full h-0.5 bg-[#00FF41] transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5 shadow-[0_0_5px_#00FF41]' : 'top-5'}`}></span>
              </div>
            </button>
          </div>
        </header>

        {/* Mobile Fullscreen Menu Overlay - Solid Background, Highest Priority */}
        <div 
          className={`lg:hidden fixed inset-0 z-[900] bg-black transition-all duration-500 transform ${
            isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full pt-[64px] px-6">
            {/* Visual scanlines for menu context */}
            <div className="absolute inset-0 bg-[linear-gradient(transparent_0%,rgba(0,255,65,0.05)_50%,transparent_100%)] bg-[size:100%_4px] pointer-events-none opacity-30"></div>
            
            <nav className="flex flex-col items-center gap-6 w-full max-w-sm">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`w-full py-5 text-2xl font-bold tracking-[0.2em] text-center border transition-all duration-300 ${
                    location.pathname === item.path 
                      ? 'bg-[#00FF41] text-black border-[#00FF41] shadow-[0_0_25px_#00FF41]' 
                      : 'text-[#00FF41] border-[#00FF41]/30 hover:border-[#00FF41] hover:bg-[#00FF41]/10'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-16 text-center space-y-4">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-[#00FF41] to-transparent mx-auto opacity-50"></div>
              <p className="text-[10px] text-[#00FF41]/60 uppercase tracking-[0.8em] font-mono animate-pulse">SYSTEM_LOCKED</p>
            </div>
          </div>
        </div>

        {/* System Status Bar */}
        <div className="mt-[64px] bg-[#001a08] border-b border-[#00FF41]/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] px-6 py-2 relative z-50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-y-2 text-center sm:text-left">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <span className="text-cyan-400">SYS: <span className="text-white">UNDER DEV</span></span>
              <span className="text-yellow-400">ENC: <span className="text-white">AES-256</span></span>
              <span className="text-cyan-400">NODE: <span className="text-white">{nodeId}</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <span className="text-blue-400">CPU_TEMP: <span className="text-white">{cpuTemp.toFixed(1)}°C</span></span>
              <span className="text-red-400">LAT: <span className="text-white">{latency}ms</span></span>
              <span className="text-[#00FF41]">TIME: <span className="text-white">{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}</span></span>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main 
          key={flickerKey} 
          className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 page-flicker relative z-20"
        >
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#00FF41]/30 bg-black/90 backdrop-blur-sm py-10 px-6 text-center text-xs opacity-60 relative z-20">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6">
            <a href="https://www.linkedin.com/in/kyler-m-b830aa17a" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">LINKEDIN</a>
            <a href="mailto:kylermof@gmail.com" className="text-yellow-500 hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">EMAIL</a>
            <a href="https://github.com/relyk9" target="_blank" rel="noopener noreferrer" className="text-[#00FF41] hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">GITHUB</a>
          </div>
          <p className="mb-2">© {new Date().getFullYear()} KYLER MOFFAT</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
