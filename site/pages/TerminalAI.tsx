
import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';
import { TerminalLine } from '../types';

const TerminalAI: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "SYSTEM: INITIATING_AI_INTEL_CONSULTANT...", type: 'success' },
    { text: "USER_IDENTIFIED. GREETINGS.", type: 'output' },
    { text: "I am trained on the archives of this portfolio. Ask me about projects, skills, or experience.", type: 'output' },
    { text: "Type 'help' for available commands.", type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userCommand = input.trim();
    setInput('');
    setHistory(prev => [...prev, { text: `> ${userCommand}`, type: 'input' }]);

    // Native terminal commands
    if (userCommand.toLowerCase() === 'clear') {
      setHistory([{ text: "SYSTEM_BUFFER_CLEARED.", type: 'success' }]);
      return;
    }
    if (userCommand.toLowerCase() === 'help') {
      setHistory(prev => [...prev, { 
        text: "AVAILABLE_COMMANDS:\n- clear: Wipes terminal buffer\n- help: Displays this menu\n- [ANY_QUESTION]: Query AI Consultant regarding portfolio data", 
        type: 'output' 
      }]);
      return;
    }

    // AI Query
    setIsProcessing(true);
    setHistory(prev => [...prev, { text: "PROCESSING_QUERY...", type: 'output' }]);
    
    const response = await getAIResponse(userCommand);
    
    setHistory(prev => {
      // Remove the "processing" message
      const filtered = prev.filter(line => line.text !== "PROCESSING_QUERY...");
      return [...filtered, { text: response, type: 'output' }];
    });
    setIsProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col border border-white/20 bg-black shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(circle_at_center,rgba(0,255,65,1)_0%,transparent_70%)]"></div>
      
      <div className="bg-[#1a1a1a] border-b border-white/10 px-4 py-2 text-[10px] font-bold flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="ml-2 text-white/60 tracking-widest">AI_CONSULTANT_CORE.sh</span>
        </div>
        <div className="text-cyan-400 animate-pulse">STATUS: ACTIVE</div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 font-mono text-sm space-y-4 scrollbar-thin scrollbar-thumb-white/10 relative z-10"
      >
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap transition-all duration-300 ${
            line.type === 'input' ? 'text-cyan-400 font-bold' : 
            line.type === 'error' ? 'text-red-500' :
            line.type === 'success' ? 'text-[#00FF41] font-bold' : 
            'text-yellow-100/80'
          }`}>
            {line.text}
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-2 text-pink-500">
            <span className="animate-bounce">⬢</span>
            <span className="animate-bounce delay-100">⬢</span>
            <span className="animate-bounce delay-200">⬢</span>
            <span className="ml-2 text-[10px] uppercase font-bold">Querying Intelligence Grid...</span>
          </div>
        )}
      </div>

      <form onSubmit={handleCommand} className="border-t border-white/10 p-4 flex gap-4 bg-[#0a0a0a] relative z-10">
        <span className="text-cyan-400 font-bold animate-pulse">{'λ'}</span>
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="TYPE_MESSAGE_TO_AI..."
          disabled={isProcessing}
          className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/20 focus:ring-0 text-sm"
          autoFocus
        />
        <button 
          type="submit" 
          disabled={isProcessing}
          className={`text-[10px] font-bold border px-6 py-2 transition-all ${
            isProcessing ? 'border-white/10 text-white/20' : 'border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black shadow-[0_0_10px_rgba(6,182,212,0.3)]'
          }`}
        >
          SEND_PACKET
        </button>
      </form>
    </div>
  );
};

export default TerminalAI;
