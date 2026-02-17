
import React, { useState, useRef, useEffect } from 'react';

const CHALLENGE_POOL = [
  "Science is about knowing; engineering is about doing. - Henry Petroski",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
  "The human footprint in the sand of time is not made by sitting down. - Lord Kelvin",
  "One man's magic is another man's engineering. - Robert Heinlein",
  "Navier-Stokes equations describe the motion of viscous fluid substances in three-dimensional space.",
  "Engineers like to solve problems. If there are no problems available, they will create their own. - Scott Adams",
  "Manufacturing is more than just putting parts together. It is perfecting the engineering. - James Dyson",
  "Geometric Dimensioning and Tolerancing ensures component interchangeability through precise control.",
  "The second law of thermodynamics states that total entropy of an isolated system can never decrease.",
  "A common mistake in designing something foolproof is to underestimate the ingenuity of fools. - Douglas Adams",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion of the iron.",
  "The Golden Gate Bridge contains over 80,000 miles of steel wire in its two main cables.",
  "The first programmable computer, the Z3, was designed by Konrad Zuse in 1941.",
  "Hedy Lamarr co-invented frequency-hopping technology now used in modern Wi-Fi and Bluetooth.",
  "The Wright brothers' first flight in 1903 lasted only 12 seconds and covered 120 feet.",
  "Ancient Romans built over 400,000 kilometers of roads to connect their vast empire.",
  "The Great Pyramid of Giza was the tallest man-made structure for over 3,800 years.",
  "Apollo 11's guidance computer had less power than a modern electronic toaster.",
  "The Panama Canal used over 4.5 million cubic yards of concrete for its massive locks.",
  "Skyscrapers move. The Burj Khalifa is designed to sway up to 1.5 meters at the very top.",
  "Richard Trevithick built the first working steam locomotive in 1804.",
  "The engineer has been, and is, a maker of history. - James Kip Finch",
  "To the optimist, the glass is half full. To the pessimist, it is half empty. To the engineer, it is twice as big as it needs to be.",
  "Strive for perfection in everything you do. Take the best that exists and make it better. - Henry Royce",
  "Normal people believe that if it ain't broke, don't fix it. Engineers believe that if it ain't broke, it doesn't have enough features yet.",
  "The problem with engineering is that it's too much like real life. - Roelof Botha",
  "Aerodynamics is for people who can't build engines. - Enzo Ferrari",
  "The bridge was built with a factor of safety of four, meaning it can hold four times the expected load.",
  "Internal combustion engines convert chemical energy from fuel into mechanical work through combustion.",
  "The industrial revolution began in the 18th century, transitioning to new manufacturing processes.",
  "Jet engines operate on the principle of Newton's third law: for every action, there is an equal and opposite reaction.",
  "Mechanical advantage is a measure of the force amplification achieved by using a tool or mechanical device.",
  "Torque is the rotational equivalent of linear force, measured in Newton-meters or pound-feet.",
  "Bernoulli's principle states that an increase in the speed of a fluid occurs simultaneously with a decrease in static pressure.",
  "The Bessemer process was the first inexpensive industrial process for the mass production of steel.",
  "Suspension bridges use tension in cables to support the weight of the bridge deck.",
  "Hydraulic systems use pressurized fluids to transmit power and multiply force.",
  "A flywheel is a mechanical device specifically designed to efficiently store rotational energy.",
  "The first industrial robot, Unimate, joined the assembly line at General Motors in 1961.",
  "Sadi Carnot is often described as the father of thermodynamics for his work on heat engines.",
  "The Hoover Dam contains enough concrete to pave a two-lane highway from San Francisco to New York City.",
  "Titanium is as strong as steel but forty-five percent lighter, making it ideal for aerospace engineering.",
  "Nanotechnology involves the manipulation of matter on an atomic, molecular, and supramolecular scale.",
  "The James Webb Space Telescope's mirrors are coated in a thin layer of gold to optimize infrared reflection.",
  "Graphene is a single layer of carbon atoms arranged in a two-dimensional honeycomb lattice.",
  "The Turing Machine is a mathematical model of computation that defines an abstract machine.",
  "A structural engineer's job is to design things that stand up; an architect's job is to make them look good.",
  "The most important thing is to keep the most important thing the most important thing.",
  "Engineering is the professional art of applying science to the optimum conversion of natural resources to the benefit of humankind.",
  "An engineer is someone who uses a slide rule to find out which end of the log to light. - Anonymous",
  "The scientist discovers a new type of material or energy and the engineer discovers a new use for it. - Gordon Lindsay Glegg",
  "I don't spend my time pontificating about high-concept things; I spend my time solving engineering and manufacturing problems. - Elon Musk",
  "An engineer's idea of a perfect date is a 1:1 scale model. - Anonymous",
  "There is nothing so useless as doing efficiently that which should not be done at all. - Peter Drucker",
  "Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs",
  "Engineering is not only study of 45 subjects but it is moral studies of intellectual life. - Prakhar Srivastav",
  "The fewer moving parts, the better. Exactly. No truer words were ever spoken in the context of engineering. - Christian Cantrell",
  "Everything is a product of engineering. If you can't build it, you don't understand it.",
  "The machinist's rule: measure twice, cut once. The engineer's rule: model ten times, measure twice, cut once.",
  "A bridge is a structure built to span physical obstacles without closing the way underneath. It is engineering in its purest form.",
  "The difference between an amateur and a professional is that the professional understands the factor of safety.",
  "Heat always flows from a higher temperature to a lower temperature unless work is performed on the system.",
  "Friction is both a friend and an enemy in mechanical design.",
  "The wheel is perhaps the most important mechanical invention of all time, dating back to 3500 BC.",
  "Archimedes' screw is one of the oldest hydraulic machines still in use today.",
  "The Antikythera mechanism is an ancient Greek analogue computer used to predict astronomical positions.",
  "Leonardo da Vinci's journals contained designs for tanks, helicopters, and parachutes centuries before they were built.",
  "Steam power transformed the world, but it was the governor that made it controllable.",
  "Aluminum 6061 is one of the most versatile alloys, favored for its weldability and structural strength.",
  "Hardness is a measure of a material's resistance to localized plastic deformation.",
  "Toughness is the ability of a material to absorb energy and deform plastically before fracturing.",
  "Stress is internal force per unit area, while strain is the deformation of a material relative to its length.",
  "Nikola Tesla had over 300 patents worldwide.",
  "The first solar cell was built by Charles Fritts in 1883.",
  "Galileo Galilei is considered the father of modern science.",
  "Mechanical engineering is one of the oldest and broadest engineering disciplines.",
  "Isaac Newton's Principia Mathematica laid the foundations for classical mechanics.",
  "The Internal Combustion Engine was perfected by Nikolaus Otto.",
  "The diesel engine was invented by Rudolf Diesel in 1893.",
  "The Kelvin scale is an absolute thermodynamic temperature scale."
];

interface ScoreEntry {
  initials: string;
  wpm: number;
  accuracy: number;
  score: number;
  timestamp: number;
}

const TypingChallenge: React.FC = () => {
  const [shuffledPhrases, setShuffledPhrases] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [totalKeys, setTotalKeys] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{phrase: string, wpm: number, accuracy: number}[]>([]);
  const [initials, setInitials] = useState('');
  const [highScores, setHighScores] = useState<ScoreEntry[]>([]);
  const [showScoreEntry, setShowScoreEntry] = useState(false);
  const [expandScoreboard, setExpandScoreboard] = useState(false);
  const [isCheating, setIsCheating] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('mech_high_scores_registry');
    if (saved) {
      try {
        setHighScores(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse registry logs", e);
      }
    }
  }, []);

  useEffect(() => {
    const shuffled = [...CHALLENGE_POOL].sort(() => 0.5 - Math.random());
    setShuffledPhrases(shuffled.slice(0, 5));
  }, []);

  // Split current target into Quote and Author
  const fullRawPhrase = shuffledPhrases[currentIndex] || "";
  const parts = fullRawPhrase.split(' - ');
  const targetQuote = parts[0];
  const targetAuthor = parts.length > 1 ? parts[1] : null;

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [currentIndex, isFinished, shuffledPhrases, showScoreEntry]);

  useEffect(() => {
    if (startTime && !isFinished && !isCheating) {
      timerRef.current = window.setInterval(() => {
        const timeElapsed = (Date.now() - startTime) / 60000;
        if (timeElapsed > 0.005) {
          const words = userInput.length / 5;
          setWpm(Math.round(words / timeElapsed));
        }
      }, 250);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTime, isFinished, userInput.length, isCheating]);

  const calculateFinalScore = (avgWpm: number, avgAcc: number) => {
    return Math.round(avgWpm * (avgAcc / 100) * 10);
  };

  const nextPhase = () => {
    if (isCheating) return;

    const endTime = Date.now();
    const timeElapsed = (endTime - (startTime || endTime)) / 60000;
    const words = targetQuote.length / 5;
    const finalWpm = Math.round(words / (timeElapsed || 0.001));
    const finalAccuracy = totalKeys > 0 ? Math.max(0, Math.round(((totalKeys - mistakes) / totalKeys) * 100)) : 100;
    
    setHistory(prev => [...prev, { phrase: targetQuote, wpm: finalWpm, accuracy: finalAccuracy }]);
    
    // Explicitly clear state before moving forward
    setUserInput('');
    setStartTime(null);
    setMistakes(0);
    setTotalKeys(0);
    setAccuracy(100);
    setWpm(0);

    if (currentIndex < shuffledPhrases.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      setShowScoreEntry(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isCheating) return;
    const val = e.target.value;
    
    // Cheat detection: Excessive spaces
    const spaceCount = (val.match(/ /g) || []).length;
    const consecutiveSpaces = val.match(/ {3,}/);
    if (spaceCount > val.length * 0.7 || consecutiveSpaces) {
      setIsCheating(true);
      return;
    }

    // Cheat detection: Repeated same character spamming
    if (val.length > 6) {
      const lastChars = val.slice(-6).split('');
      if (lastChars.every(char => char === lastChars[0])) {
        setIsCheating(true);
        return;
      }
    }

    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    if (val.length > userInput.length) {
      setTotalKeys(prev => prev + 1);
      const lastChar = val[val.length - 1];
      const expectedChar = targetQuote[val.length - 1];
      if (lastChar !== expectedChar) {
        setMistakes(prev => prev + 1);
      }
    }

    const currentTotal = totalKeys + (val.length > userInput.length ? 1 : 0);
    const currentMistakes = mistakes + (val.length > userInput.length && val[val.length-1] !== targetQuote[val.length-1] ? 1 : 0);
    if (currentTotal > 0) {
      setAccuracy(Math.max(0, Math.round(((currentTotal - currentMistakes) / currentTotal) * 100)));
    }

    if (val === targetQuote) {
      nextPhase();
    } else {
      setUserInput(val);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && userInput.length >= targetQuote.length) {
      nextPhase();
    }
  };

  const saveScoreToRegistry = () => {
    if (isCheating) return;
    const avgWpm = Math.round(history.reduce((a, b) => a + b.wpm, 0) / history.length);
    const avgAcc = Math.round(history.reduce((a, b) => a + b.accuracy, 0) / history.length);
    const score = calculateFinalScore(avgWpm, avgAcc);
    
    const newEntry: ScoreEntry = {
      initials: (initials || '??').substring(0, 2).toUpperCase(),
      wpm: avgWpm,
      accuracy: avgAcc,
      score,
      timestamp: Date.now()
    };

    const updated = [...highScores, newEntry].sort((a, b) => b.score - a.score);
    setHighScores(updated);
    localStorage.setItem('mech_high_scores_registry', JSON.stringify(updated));
    setShowScoreEntry(false);
  };

  const reInitializeSystem = () => {
    const shuffled = [...CHALLENGE_POOL].sort(() => 0.5 - Math.random());
    setShuffledPhrases(shuffled.slice(0, 5));
    setCurrentIndex(0);
    setUserInput('');
    setStartTime(null);
    setIsFinished(false);
    setShowScoreEntry(false);
    setIsCheating(false);
    setInitials('');
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setTotalKeys(0);
    setHistory([]);
  };

  const renderTargetQuote = () => {
    if (!targetQuote) return null;
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="relative inline text-center font-mono leading-relaxed whitespace-pre-wrap max-w-2xl px-6">
          {targetQuote.split('').map((char, i) => {
            const isTyped = i < userInput.length;
            let color = 'text-white/20';
            if (isTyped) {
              color = userInput[i] === char ? 'text-[#00FF41]' : 'text-red-500 bg-red-900/30';
            }
            return (
              <span key={i} className="relative inline">
                <span className={`${color} transition-colors duration-150`}>{char}</span>
              </span>
            );
          })}
        </div>
        {targetAuthor && (
          <div className="text-sm opacity-40 italic font-mono mt-2 transition-all duration-700 animate-in fade-in">
            — {targetAuthor}
          </div>
        )}
      </div>
    );
  };

  const topScores = highScores.slice(0, 10);
  const otherScores = highScores.slice(10);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
      
      {/* GLOBAL_LEADERBOARD */}
      <div className="border border-white/10 bg-black/40 p-4 space-y-3">
        <div className="flex justify-between items-center border-b border-white/10 pb-2">
          <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">GLOBAL_LEADERBOARD</h3>
          <button 
            onClick={() => setExpandScoreboard(!expandScoreboard)}
            className="text-[10px] text-white/40 hover:text-white transition-colors uppercase font-bold"
          >
            {expandScoreboard ? 'Collapse_Logs ▲' : `View_Full_Archive (${highScores.length}) ▼`}
          </button>
        </div>
        
        <div className="grid grid-cols-5 gap-2 text-[9px] uppercase font-bold text-white/30 px-2">
          <span>Rank</span>
          <span>Op_ID</span>
          <span>WPM</span>
          <span>Acc</span>
          <span>Score</span>
        </div>
        
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {topScores.map((s, i) => (
            <div key={i} className="grid grid-cols-5 gap-2 p-1.5 text-[10px] border-b border-white/5 items-center bg-white/5 font-mono">
              <span className="text-cyan-500">#{i + 1}</span>
              <span className="text-yellow-400 font-bold">{s.initials}</span>
              <span className="text-white/80">{s.wpm}</span>
              <span className="text-pink-400/80">{s.accuracy}%</span>
              <span className="text-[#00FF41] font-bold">{s.score}</span>
            </div>
          ))}
          {expandScoreboard && otherScores.map((s, i) => (
            <div key={i + 10} className="grid grid-cols-5 gap-2 p-1.5 text-[10px] border-b border-white/5 items-center font-mono opacity-60">
              <span className="text-white/40">#{i + 11}</span>
              <span className="text-yellow-400">{s.initials}</span>
              <span className="text-white/80">{s.wpm}</span>
              <span className="text-pink-400/80">{s.accuracy}%</span>
              <span className="text-[#00FF41]">{s.score}</span>
            </div>
          ))}
          {highScores.length === 0 && <div className="text-center py-4 text-white/20 italic text-xs uppercase">Registry_Empty...</div>}
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold glow-text tracking-tighter uppercase">
          TYPING_TEST / <span className="opacity-60">SCTR_{currentIndex + 1}</span>
        </h2>
      </div>

      <div className="relative border border-[#00FF41]/30 bg-black/90 p-12 shadow-[0_0_60px_rgba(0,0,0,1)] overflow-hidden min-h-[450px] flex flex-col justify-center">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#00FF41]/10">
          <div 
            className="h-full bg-[#00FF41] transition-all duration-500 shadow-[0_0_15px_#00FF41]" 
            style={{ width: `${((currentIndex + 1) / (shuffledPhrases.length || 1)) * 100}%` }}
          />
        </div>

        {isCheating ? (
          <div className="text-center space-y-6 animate-in zoom-in duration-300">
             <div className="text-red-500 text-6xl font-bold animate-pulse mb-4 font-mono">!!! CHEAT_DETECTED !!!</div>
             <p className="text-white/60 font-mono text-sm uppercase tracking-widest">Input Buffer Manipulation Detected. Sequence Terminated.</p>
             <button 
              onClick={reInitializeSystem}
              className="px-8 py-3 bg-red-500 text-white font-bold hover:bg-white hover:text-red-500 transition-all uppercase text-xs tracking-widest"
            >
              Reset_Environment
            </button>
          </div>
        ) : !isFinished ? (
          <div className="space-y-16 relative z-10">
            <div className="min-h-[160px] flex items-center justify-center font-mono tracking-tight text-xl md:text-2xl">
              {renderTargetQuote()}
            </div>

            <div className="relative max-w-2xl mx-auto flex flex-col items-center group">
              {/* Refined Mirrored text area with robust wrapping cursor */}
              <div className="w-full relative py-2 text-center border-b-2 border-[#00FF41] group-focus-within:shadow-[0_4px_12px_-4px_#00FF41]">
                <div className="text-xl font-mono min-h-[1.5em] text-center pointer-events-none break-all whitespace-pre-wrap px-4">
                  <span className="text-white inline">
                    {userInput}
                    {!isFinished && (
                      <span className="inline-block w-[1.1ch] h-[1.1em] bg-[#00FF41] animate-pulse opacity-80 shadow-[0_0_8px_#00FF41] align-middle ml-[1px]" />
                    )}
                  </span>
                  {!userInput && !isFinished && (
                    <span className="opacity-40 italic tracking-normal inline-block">AUTHENTICATE_INPUT_STREAM...</span>
                  )}
                </div>
                
                {/* Hidden Input field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 w-full h-full bg-transparent outline-none text-transparent caret-transparent font-mono transition-all z-20"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </div>
              
              <div className="w-full flex justify-between mt-10 text-[11px] font-mono font-bold uppercase tracking-widest">
                <div className="flex gap-10">
                  <span className="text-yellow-400 flex flex-col">
                    <span className="opacity-40 text-[9px]">LIVE_WPM</span>
                    <span className="text-white text-lg">{wpm || '--'}</span>
                  </span>
                  <span className="text-pink-400 flex flex-col">
                    <span className="opacity-40 text-[9px]">ACCURACY</span>
                    <span className="text-white text-lg">{accuracy}%</span>
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="opacity-40 text-[9px]">SESSION_PROGRESS</span>
                  <span className="text-cyan-400 text-lg">{currentIndex + 1} / {shuffledPhrases.length}</span>
                </div>
              </div>
            </div>
          </div>
        ) : showScoreEntry ? (
          <div className="text-center space-y-10 py-10 animate-in zoom-in duration-500 z-10">
            <h3 className="text-4xl font-bold text-[#00FF41] glow-text italic tracking-tighter">MISSION_COMPLETE</h3>
            <p className="text-sm opacity-60 font-mono tracking-widest uppercase">Operator ID Required [2_CHARS]</p>
            <div className="max-w-xs mx-auto space-y-6">
              <input
                type="text"
                value={initials}
                onChange={(e) => setInitials(e.target.value.substring(0, 2).toUpperCase())}
                className="w-full bg-black border-2 border-[#00FF41]/40 text-center text-5xl font-mono p-4 focus:border-[#00FF41] outline-none shadow-[0_0_15px_rgba(0,255,65,0.1)] text-[#00FF41]"
                placeholder="__"
                autoFocus
                onKeyDown={(e) => e.key === 'Enter' && initials.length > 0 && saveScoreToRegistry()}
              />
              <button 
                onClick={saveScoreToRegistry}
                disabled={initials.length === 0}
                className="w-full px-10 py-4 bg-[#00FF41] text-black font-bold hover:bg-white transition-all uppercase text-sm tracking-[0.3em] disabled:opacity-20 shadow-[0_0_30px_rgba(0,255,65,0.3)]"
              >
                Archive_Results
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in zoom-in duration-500 z-10">
             <div className="flex justify-center gap-12 mb-8">
                <div>
                   <p className="text-[10px] text-white/40 font-bold uppercase mb-1">FINAL_WPM</p>
                   <p className="text-4xl font-bold text-yellow-400 font-mono">{Math.round(history.reduce((a,b)=>a+b.wpm,0)/history.length)}</p>
                </div>
                <div>
                   <p className="text-[10px] text-white/40 font-bold uppercase mb-1">AVG_ACCURACY</p>
                   <p className="text-4xl font-bold text-pink-400 font-mono">{Math.round(history.reduce((a,b)=>a+b.accuracy,0)/history.length)}%</p>
                </div>
             </div>
             <button 
              onClick={reInitializeSystem}
              className="px-12 py-4 border-2 border-[#00FF41] text-[#00FF41] font-bold hover:bg-[#00FF41] hover:text-black transition-all uppercase text-xs tracking-[0.4em]"
            >
              Start_New_Sequence
            </button>
          </div>
        )}

        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00FF41 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border border-white/10 p-8 bg-black/40">
          <h4 className="text-xs font-bold text-white/40 mb-5 uppercase tracking-widest border-b border-white/10 pb-2">Operational_Guidelines</h4>
          <div className="space-y-4 font-mono text-[11px] leading-relaxed">
            <div className="p-3 bg-[#00FF41]/5 border-l-2 border-[#00FF41] mb-2">
              <p className="text-[#00FF41] font-bold text-[9px] mb-1">SCORE_ALGORITHM_V2.0:</p>
              <p className="text-white text-[12px]">SCORE = WPM * (ACCURACY / 100) * 10</p>
            </div>
            <p className="text-white/70">Efficiency is measured by the algorithm which penalizes typos and rewards raw data throughput.</p>
            <p className="text-cyan-400">NOTE: Cursor is optimized to follow text flow across multiple lines. Excessive character repetition triggers security protocols.</p>
            <p className="text-red-400/60 uppercase">Warning: Spacing spamming or buffer injection will trigger security lockout.</p>
          </div>
        </div>

        <div className="border border-white/10 p-8 bg-black/40 flex flex-col justify-center items-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#00FF41] animate-spin-slow flex items-center justify-center">
            <span className="text-[#00FF41] text-2xl font-bold font-mono">λ</span>
          </div>
          <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest max-w-[280px]">
            Benchmark protocols synchronized. Sequence integrity monitoring enabled. Text wrapping support for high-throughput operational streams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TypingChallenge;
