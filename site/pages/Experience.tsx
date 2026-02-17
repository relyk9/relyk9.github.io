
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

      <div className="relative border-l-2 border-[#00FF41]/30 ml-4 md:ml-0 space-y-16">
        {EXPERIENCE.map((exp, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12">
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-[#00FF41] shadow-[0_0_10px_#00FF41]"></div>
            
            <div className="space-y-4 bg-black/40 border border-[#00FF41]/20 p-6 rounded group hover:border-[#00FF41] transition-all">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <div>
                  <h3 className="text-xl font-bold glow-text">{exp.role}</h3>
                  <p className="text-[#00FF41] text-sm font-bold uppercase">{exp.company}</p>
                </div>
                <div className="bg-[#00FF41] text-black px-3 py-1 text-[10px] font-bold self-start">
                  {exp.period}
                </div>
              </div>
              
              <ul className="space-y-3">
                {exp.description.map((item, i) => (
                  <li key={i} className="text-xs flex gap-3 leading-relaxed">
                    <span className="text-[#00FF41]/60">_</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Download Section */}
      <div className="text-center pt-8">
        <div className="inline-block border border-[#00FF41] p-1">
          <button className="bg-[#00FF41] text-black px-8 py-3 font-bold hover:bg-black hover:text-[#00FF41] transition-all flex items-center gap-4 text-sm tracking-widest">
            <span className="text-xl">⬇</span>
            {EXPERIENCE_DATA.downloadLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Experience;
