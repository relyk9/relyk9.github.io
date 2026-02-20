
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
  const fullText = HOME_DATA.typedText;
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Simon Game State
  const [simonGame, setSimonGame] = useState<{ 
    sequence: number[];
    playerSequence: number[];
    active: boolean;
    turn: 'computer' | 'player';
    litButton: number | null;
    highScore: number;
  }>({ 
    sequence: [], 
    playerSequence: [], 
    active: false, 
    turn: 'computer',
    litButton: null,
    highScore: 0,
  });

  const audioCtxRef = useRef<AudioContext | null>(null);

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



  // --- Simon Game Logic ---

  const playSimonSound = (index: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    const frequencies = [261.63, 329.63, 392.00]; // C4, E4, G4
    oscillator.frequency.setValueAtTime(frequencies[index], ctx.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
  };

  const startGame = () => {
    setSimonGame(prev => ({ ...prev, active: true, sequence: [], playerSequence: [], turn: 'computer' }));
  };

  const nextTurn = () => {
    const nextButton = Math.floor(Math.random() * 3);
    setSimonGame(prev => ({
      ...prev,
      sequence: [...prev.sequence, nextButton],
      playerSequence: [],
      turn: 'computer',
    }));
  };

  const handlePlayerInput = (buttonIndex: number) => {
    if (!simonGame.active || simonGame.turn !== 'player') return;

    // Provide immediate audio/visual feedback
    playSimonSound(buttonIndex);
    setSimonGame(prev => ({ ...prev, litButton: buttonIndex }));
    setTimeout(() => {
      setSimonGame(prev => ({ ...prev, litButton: null }));
    }, 200);

    const newPlayerSequence = [...simonGame.playerSequence, buttonIndex];

    if (newPlayerSequence[newPlayerSequence.length - 1] !== simonGame.sequence[newPlayerSequence.length - 1]) {
      endGame();
      return;
    }

    setSimonGame(prev => ({ ...prev, playerSequence: newPlayerSequence }));

    if (newPlayerSequence.length === simonGame.sequence.length) {
      setSimonGame(prev => ({ ...prev, highScore: Math.max(prev.highScore, prev.sequence.length) }));
      // Larger delay before computer starts new sequence
      setTimeout(nextTurn, 1500);
    }
  };

  const endGame = () => {
    // Visual game over effect
    setSimonGame(prev => ({ ...prev, litButton: 99 })); // Special code for all lit
    setTimeout(() => setSimonGame(prev => ({ ...prev, litButton: null })), 500);
    
    addManualLog({ text: `SIMON_GAME_OVER. Final Score: ${simonGame.sequence.length - 1}. High Score: ${simonGame.highScore}`, color: 'text-red-500' });
    setSimonGame({ ...simonGame, active: false, sequence: [], playerSequence: [], turn: 'computer' });
  };

  useEffect(() => {
    let isMounted = true;
    const playSequence = async () => {
      if (simonGame.active && simonGame.turn === 'computer') {
        if (simonGame.sequence.length === 0) {
          setTimeout(nextTurn, 500);
          return;
        }

        // Initial delay before starting the sequence playback
        await new Promise(resolve => setTimeout(resolve, 800));
        if (!isMounted) return;

        // Play the ENTIRE sequence
        for (const buttonIndex of simonGame.sequence) {
          if (!isMounted) return;
          playSimonSound(buttonIndex);
          setSimonGame(prev => ({ ...prev, litButton: buttonIndex }));
          await new Promise(resolve => setTimeout(resolve, 500));
          if (!isMounted) return;
          setSimonGame(prev => ({ ...prev, litButton: null }));
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        if (isMounted) {
          setSimonGame(prev => ({ ...prev, turn: 'player' }));
        }
      }
    };

    playSequence();
    return () => { isMounted = false; };
  }, [simonGame.active, simonGame.turn, simonGame.sequence]);

  const addManualLog = (logOverride?: { text: string, color: string }) => {
    const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const log = logOverride || LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
    setActiveLogs(prev => {
      const newLogs = [...prev, { ...log, time: getTime() }];
      return newLogs.slice(-100);
    });
  };

  return (
    <div className="space-y-8 md:space-y-16 animate-in fade-in duration-1000">
      <section className="bg-black/80 border border-[#10B981] p-6 md:p-12 rounded shadow-[0_0_40px_rgba(16,185,129,0.05)] relative overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 md:gap-16 items-start relative z-10">
          <div className="flex flex-col w-full">
            <div className="space-y-4 mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="px-3 py-1 bg-teal-500 text-black text-[10px] md:text-xs font-bold shadow-[0_0_10px_rgba(45,212,191,0.5)] uppercase">
                  {HOME_DATA.userId}
                </div>
                <div className="px-3 py-1 border border-[#10B981]/40 text-[#10B981] text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                  STATUS: WORKING
                </div>
              </div>
              
              <h2 className="text-3xl md:text-6xl font-bold leading-tight uppercase">
                <span className="glow-text">{HOME_DATA.heroTitle[0]}</span> <br className="hidden md:block" /> <span className="text-sky-400 glow-text">{HOME_DATA.heroTitle[1]}</span>
              </h2>

              <div className="border-l-2 border-rose-500 pl-4 py-3 bg-rose-500/5 my-4 max-w-2xl">
                <p className="text-[10px] text-rose-400 font-bold tracking-widest uppercase mb-1">
                  {ABOUT_DATA.missionTitle}
                </p>
                <p className="text-xs md:text-sm text-white/90 italic mb-4">"{ABOUT_DATA.missionStatement}"</p>
                <div className="flex items-center gap-4">
                  <Link to="/about" className="text-amber-400 underline underline-offset-4 hover:text-white transition-colors text-[10px] font-bold tracking-[0.2em] uppercase">
                    READ_BIO
                  </Link>
                </div>
              </div>
            </div>

            <div className="mb-8 md:mb-10">
               <Link to="/portfolio" className="inline-block border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-black px-8 py-3 transition-all duration-300 shadow-[0_0_15px_rgba(244,63,94,0.2)] font-bold text-xs md:text-sm tracking-[0.2em] uppercase w-full md:w-auto text-center">
                  VIEW_PORTFOLIO
                </Link>
            </div>

            <div className="mt-2 md:mt-4 bg-black/40 md:bg-transparent p-4 md:p-0 border border-white/5 md:border-none rounded">
               <pre className="text-[11px] md:text-base leading-relaxed h-28 whitespace-pre-wrap font-mono text-amber-400/90 overflow-hidden">
                {typedText}
                <span className="animate-pulse text-[#10B981]">|</span>
              </pre>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full md:w-auto md:shrink-0 order-first md:order-last">
            <div 
              className="w-48 h-48 md:w-64 md:h-64 border border-teal-500 p-2 relative group cursor-pointer"
            >
              <div className="absolute inset-0 border border-teal-500 animate-pulse"></div>
              <img 
                src={HOME_DATA.avatarUrl} 
                alt="System Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-base md:text-xl font-bold text-teal-400 tracking-[0.3em] glow-text uppercase">{HOME_DATA.userName}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {HOME_DATA.stats.map((stat, idx) => {
          const isLit = simonGame.litButton === idx || simonGame.litButton === 99;
          const statColor = stat.color.split('-')[1]; // e.g., 'teal' from 'text-teal-400'
          const isPlayerTurn = simonGame.active && simonGame.turn === 'player';

          return (
            <div 
              key={idx} 
              onClick={() => {
                if (!simonGame.active) {
                  startGame();
                } else if (isPlayerTurn) {
                  handlePlayerInput(idx);
                }
              }}
              className={`p-4 md:p-6 flex items-center gap-4 bg-black/40 group overflow-hidden rounded-sm transition-all duration-150 relative
                ${!simonGame.active || isPlayerTurn ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'}
                ${
                  isLit
                    ? `border-white shadow-[0_0_35px_rgba(${statColor === 'teal' ? '45,212,191' : statColor === 'amber' ? '251,191,36' : '244,63,94'},1)] bg-white/10`
                    : `border ${stat.border} hover:border-white`
                }`
              }
            >
              {/* Flash overlay for lit state */}
              {isLit && (
                <div className={`absolute inset-0 opacity-20 animate-pulse ${stat.color.replace('text', 'bg')}`}></div>
              )}
              
              <div className={`text-xl md:text-3xl ${stat.color} ${isLit ? 'scale-125' : 'group-hover:scale-110'} transition-transform shrink-0 relative z-10`}>{stat.icon}</div>
              <div className="min-w-0 flex-1 relative z-10">
                <p className="text-[9px] md:text-[10px] text-white/40 font-bold tracking-widest uppercase truncate mb-0.5">{stat.label}</p>
                <p className={`font-bold ${isLit ? 'text-white' : stat.color} group-hover:text-white transition-colors leading-tight ${
                  stat.value.length > 12 ? 'text-xs md:text-base' : 'text-lg md:text-2xl'
                }`}>
                  {stat.value}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="w-full">
        <section className="bg-black/80 border border-white/10 p-5 md:p-6 rounded flex flex-col h-[400px] md:h-[450px] shadow-lg">
          <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-white/5 pb-4">
            <h3 className="text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-[0.2em] leading-relaxed">
              {HOME_DATA.logSectionTitle}
            </h3>
            <button 
              onClick={() => addManualLog()}
              className="w-full lg:w-auto px-5 py-2 border border-[#10B981] text-[#10B981] text-[9px] md:text-[10px] font-bold hover:bg-[#10B981] hover:text-black transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.1)] uppercase tracking-widest"
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
                <div className="w-full max-w-[200px] h-px bg-gradient-to-r from-transparent via-[#10B981] to-transparent"></div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
