
import React from 'react';
import { EXPERIENCE, EXPERIENCE_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold glow-text tracking-tighter uppercase">
          {EXPERIENCE_DATA.header} / <span className="opacity-60">{EXPERIENCE_DATA.subHeader}</span>
        </h2>
        <p className="text-sm opacity-60 max-w-lg mx-auto">
          {EXPERIENCE_DATA.description}
        </p>
      </div>

      <div className="relative border-l-2 border-emerald-500/30 ml-4 md:ml-0 space-y-16">
        {EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"></div>
            
            <div className="space-y-4 bg-black/40 border border-emerald-500/20 p-6 rounded group hover:border-emerald-500 transition-all">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <h3 className="text-xl font-bold glow-text">{exp.role}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <p className="text-emerald-500 text-sm font-bold uppercase">{exp.company}</p>
                    <span className="text-[10px] text-white/40 font-mono flex items-center gap-1">
                      <span className="text-rose-500">📍</span> {exp.location}
                    </span>
                  </div>
                </div>
                <div className="bg-emerald-500 text-black px-3 py-1 text-[10px] font-bold self-start">
                  {exp.period}
                </div>
              </div>
              
              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-xs flex items-start gap-3 leading-relaxed">
                    <span className="text-emerald-500 opacity-70 font-bold mt-0.5 shrink-0 select-none">{">"}</span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Download Section */}
      <div className="text-center pt-8">
        <div className="inline-block border border-gray-700 p-1 opacity-50 grayscale">
          <button 
            disabled 
            className="bg-gray-800 text-gray-500 px-8 py-3 font-bold flex items-center gap-4 text-sm tracking-widest cursor-not-allowed border border-transparent"
            title="Download currently restricted"
          >
            <span className="text-xl">🔒</span>
            {EXPERIENCE_DATA.downloadLabel} [UNAVAILABLE]
          </button>
        </div>
        <p className="text-[10px] text-rose-400 font-bold mt-4 tracking-widest uppercase animate-pulse">
          NOTICE: SYSTEM_SECURITY_RESTRICTION_IN_EFFECT // ARCHIVE_LOCKED
        </p>
      </div>
    </div>
  );
};

export default Experience;
