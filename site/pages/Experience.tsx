
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

      <div className="relative border-l-2 border-[#10B981]/30 ml-4 md:ml-0 space-y-16">
        {EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-[#10B981] shadow-[0_0_10px_#10B981]"></div>
            
            <div className="space-y-4 bg-black/40 border border-[#10B981]/20 p-6 rounded group hover:border-[#10B981]/70 transition-all">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <h3 className="text-xl font-bold glow-text">{exp.role}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                    <p className="text-[#10B981] text-sm font-bold">{exp.company}</p>
                    <span className="text-[10px] text-white/45 font-mono">
                      {exp.location}
                    </span>
                  </div>
                </div>
                <div className="bg-[#10B981]/90 text-black px-3 py-1 text-[10px] font-bold self-start">
                  {exp.period}
                </div>
              </div>
              
              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-xs flex items-start gap-3 leading-relaxed">
                    <span className="text-[#10B981] opacity-70 font-bold mt-0.5 shrink-0 select-none">•</span>
                    <span className="text-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8">
        <div className="inline-block border border-white/10 bg-black/40 px-8 py-5 text-center max-w-xl">
          <p className="text-sm font-bold text-white mb-2 uppercase tracking-[0.2em]">
            Resume
          </p>
          <p className="text-xs text-white/65 leading-relaxed">
            {EXPERIENCE_DATA.downloadLabel}. If you'd like a copy, reach out by email or LinkedIn and I can share it directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Experience;
