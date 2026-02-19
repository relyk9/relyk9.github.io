import React, { useState, useEffect } from 'react';
import { fetchTechNews, NewsItem } from '../services/geminiService';

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getNews = async () => {
      setLoading(true);
      const data = await fetchTechNews();
      if (data && data.length > 0) {
        setNews(data);
        setError(false);
      } else {
        setError(true);
      }
      setLoading(false);
    };

    getNews();
  }, []);

  return (
    <section className="bg-black/80 border border-cyan-500/30 p-5 md:p-6 rounded shadow-[0_0_20px_rgba(6,182,212,0.1)] flex flex-col h-[400px] md:h-[450px]">
      <header className="flex justify-between items-center mb-6 border-b border-cyan-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
          <h3 className="text-[10px] md:text-xs font-bold text-cyan-400 uppercase tracking-[0.2em]">
            GLOBAL_INTEL_FEED
          </h3>
        </div>
        <div className="text-[9px] text-cyan-500/50 font-mono">
          {loading ? 'SYNCING...' : 'LIVE_CONNECTION'}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pr-2">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40">
            <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] font-mono">Establishing secure uplink...</p>
          </div>
        ) : error ? (
          <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40 text-red-400">
            <p className="text-[10px] uppercase tracking-[0.3em] font-mono">Connection failed. Retrying...</p>
          </div>
        ) : (
          news.map((item, idx) => (
            <div key={idx} className="group border-l-2 border-cyan-500/20 pl-4 py-1 hover:border-cyan-500 transition-all duration-300">
              <div className="flex justify-between items-start mb-1">
                <span className="text-[9px] text-cyan-500/60 font-mono uppercase">[{item.source}]</span>
                <span className="text-[9px] text-white/30 font-mono">{item.date}</span>
              </div>
              <h4 className="text-sm md:text-base font-bold text-white group-hover:text-cyan-400 transition-colors mb-2 leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-white/60 mb-3 line-clamp-2 font-mono leading-relaxed">
                {item.summary}
              </p>
              <a 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] text-cyan-500 hover:text-white transition-colors uppercase tracking-widest font-bold"
              >
                [READ_FULL_INTEL]
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))
        )}
      </div>

      <footer className="mt-4 pt-4 border-t border-cyan-500/10 flex justify-between items-center">
        <div className="text-[8px] text-cyan-500/30 uppercase tracking-widest">
          Source: Gemini_AI_Search
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="text-[9px] text-cyan-500 hover:text-white transition-colors uppercase font-bold"
        >
          [REFRESH]
        </button>
      </footer>
    </section>
  );
};

export default NewsFeed;
