import React, { useEffect, useRef, useState } from 'react';
import { HOME_DATA } from '../constants';

type SimonState = {
  sequence: number[];
  playerSequence: number[];
  active: boolean;
  turn: 'computer' | 'player';
  litButton: number | null;
  highScore: number;
};

const BUTTON_GLOWS = [
  '45,212,191',
  '251,191,36',
  '244,63,94',
];

const Home: React.FC = () => {
  const [simonGame, setSimonGame] = useState<SimonState>({
    sequence: [],
    playerSequence: [],
    active: false,
    turn: 'computer',
    litButton: null,
    highScore: 0,
  });
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSimonSound = (index: number) => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext)();
    }

    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const frequencies = [261.63, 329.63, 392.0];

    oscillator.frequency.setValueAtTime(frequencies[index], ctx.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.35);
  };

  const startGame = () => {
    setSimonGame(prev => ({
      ...prev,
      active: true,
      sequence: [],
      playerSequence: [],
      turn: 'computer',
      litButton: null,
    }));
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

  const endGame = () => {
    setSimonGame(prev => ({
      ...prev,
      litButton: 99,
      highScore: Math.max(prev.highScore, Math.max(prev.sequence.length - 1, 0)),
    }));

    setTimeout(() => {
      setSimonGame(prev => ({
        ...prev,
        active: false,
        sequence: [],
        playerSequence: [],
        turn: 'computer',
        litButton: null,
      }));
    }, 500);
  };

  const handlePlayerInput = (buttonIndex: number) => {
    if (!simonGame.active || simonGame.turn !== 'player') return;

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
      setSimonGame(prev => ({
        ...prev,
        highScore: Math.max(prev.highScore, prev.sequence.length),
      }));
      setTimeout(nextTurn, 1200);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const playSequence = async () => {
      if (!simonGame.active || simonGame.turn !== 'computer') return;

      if (simonGame.sequence.length === 0) {
        setTimeout(nextTurn, 400);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 700));
      if (!isMounted) return;

      for (const buttonIndex of simonGame.sequence) {
        if (!isMounted) return;

        playSimonSound(buttonIndex);
        setSimonGame(prev => ({ ...prev, litButton: buttonIndex }));
        await new Promise(resolve => setTimeout(resolve, 450));
        if (!isMounted) return;

        setSimonGame(prev => ({ ...prev, litButton: null }));
        await new Promise(resolve => setTimeout(resolve, 180));
      }

      if (isMounted) {
        setSimonGame(prev => ({ ...prev, turn: 'player' }));
      }
    };

    void playSequence();
    return () => {
      isMounted = false;
    };
  }, [simonGame.active, simonGame.turn, simonGame.sequence]);

  const statusText = simonGame.turn === 'computer'
      ? `Watch the sequence. Round ${simonGame.sequence.length}.`
      : `Repeat the sequence. High score ${simonGame.highScore}.`;

  return (
    <div className="space-y-8 md:space-y-14 animate-in fade-in duration-1000">
      <section className="bg-black/80 border border-[#10B981]/70 p-6 md:p-12 rounded shadow-[0_0_28px_rgba(16,185,129,0.04)] relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 md:gap-16 items-start relative z-10">
          <div className="flex flex-col w-full">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <div className="px-3 py-1 bg-teal-500 text-black text-[10px] md:text-xs font-bold shadow-[0_0_10px_rgba(45,212,191,0.5)] uppercase">
                  {HOME_DATA.userId}
                </div>
                <div className="px-3 py-1 border border-[#10B981]/30 text-[#10B981]/90 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                  Automation • Process Improvement
                </div>
              </div>

              <h2 className="text-3xl md:text-6xl font-bold leading-tight uppercase">
                <span className="glow-text">{HOME_DATA.heroTitle[0]}</span>
                <br className="hidden md:block" />
                <span className="text-sky-400 glow-text">{HOME_DATA.heroTitle[1]}</span>
              </h2>

              <p className="max-w-2xl text-sm md:text-base text-white/68 leading-relaxed">
                Mechanical engineer working in biotech manufacturing with a focus on automation, reliability, and practical systems improvement.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full md:w-auto md:shrink-0 order-first md:order-last">
            <div className="w-48 h-48 md:w-64 md:h-64 border border-teal-500 p-2 relative group">
              <div className="absolute inset-0 border border-teal-500 animate-pulse"></div>
              <img
                src={HOME_DATA.avatarUrl}
                alt="Portrait of Kyler Moffat"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-base md:text-xl font-bold text-teal-400 tracking-[0.3em] glow-text uppercase">{HOME_DATA.userName}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-4">
        {simonGame.active && (
          <p className="text-[10px] md:text-xs text-white/38 tracking-[0.18em] uppercase">
            {statusText}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {HOME_DATA.stats.map((stat, idx) => {
            const isLit = simonGame.litButton === idx || simonGame.litButton === 99;
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
                className={`p-4 md:p-6 flex items-center gap-4 bg-black/35 group overflow-hidden rounded-sm transition-all duration-150 relative border ${
                  !simonGame.active || isPlayerTurn ? 'cursor-pointer' : 'cursor-not-allowed opacity-80'
                } ${
                  isLit
                    ? 'border-white bg-white/10'
                    : `${stat.border} hover:border-white/50`
                }`}
                style={isLit ? { boxShadow: `0 0 30px rgba(${BUTTON_GLOWS[idx]}, 0.65)` } : undefined}
              >
                {isLit && (
                  <div className={`absolute inset-0 opacity-20 animate-pulse ${stat.color.replace('text', 'bg')}`}></div>
                )}

                <div className={`text-xl md:text-3xl ${stat.color} ${isLit ? 'scale-125' : 'group-hover:scale-110'} transition-transform shrink-0 relative z-10`}>
                  {stat.icon}
                </div>
                <div className="min-w-0 flex-1 relative z-10">
                  <p className="text-[9px] md:text-[10px] text-white/40 font-bold tracking-widest uppercase truncate mb-0.5">{stat.label}</p>
                  <p className={`font-bold ${isLit ? 'text-white' : stat.color} group-hover:text-white transition-colors leading-tight ${
                    stat.value.length > 12 ? 'text-xs md:text-base' : 'text-lg md:text-2xl'
                  }`}>
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
