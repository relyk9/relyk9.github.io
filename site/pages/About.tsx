
import React from 'react';
import { SKILLS, ABOUT_DATA } from '../constants';

const About: React.FC = () => {
  // Helper to parse custom tags for color highlighting
  const parseHighlights = (text: string) => {
    const parts = text.split(/(<highlight[1-3]>.*?<\/highlight[1-3]>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<highlight1>')) {
        return <span key={i} className="text-yellow-400 font-bold">{part.replace(/<\/?highlight1>/g, '')}</span>;
      }
      if (part.startsWith('<highlight2>')) {
        return <span key={i} className="text-pink-400 font-bold">{part.replace(/<\/?highlight2>/g, '')}</span>;
      }
      if (part.startsWith('<highlight3>')) {
        return <span key={i} className="text-cyan-400 font-bold">{part.replace(/<\/?highlight3>/g, '')}</span>;
      }
      return part;
    });
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-cyan-500 pb-2 text-cyan-400 inline-block shadow-[0_4px_10px_-5px_rgba(6,182,212,0.5)] uppercase tracking-widest">
          {ABOUT_DATA.profileTitle} / <span className="text-white opacity-80">{ABOUT_DATA.profileHeader}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4 text-sm leading-loose">
            {ABOUT_DATA.paragraphs.map((para, idx) => (
              <p key={idx} className="text-white/80">
                {parseHighlights(para)}
              </p>
            ))}
            
            <div className="bg-cyan-500/10 p-4 border-l-2 border-cyan-500 mt-8 group hover:bg-cyan-500/20 transition-all">
              <h4 className="text-xs font-bold mb-2 text-cyan-400 uppercase tracking-widest">
                {ABOUT_DATA.missionTitle} / {ABOUT_DATA.missionHeader}:
              </h4>
              <p className="italic text-xs text-white/90">
                {ABOUT_DATA.missionStatement}
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-yellow-400 uppercase tracking-tighter">CORE_STACK / SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill, idx) => {
                const colors = ['border-cyan-500 text-cyan-400', 'border-pink-500 text-pink-400', 'border-yellow-500 text-yellow-400', 'border-green-500 text-[#00FF41]', 'border-blue-500 text-blue-400'];
                const colorClass = colors[idx % colors.length];
                return (
                  <span key={skill} className={`px-3 py-1 border ${colorClass} text-xs hover:bg-white hover:text-black transition-all cursor-default`}>
                    {skill}
                  </span>
                );
              })}
            </div>
            
            <div className="space-y-2 mt-8">
              <h3 className="text-lg font-bold text-pink-400 uppercase tracking-tighter">{ABOUT_DATA.educationTitle} / {ABOUT_DATA.educationHeader}</h3>
              {ABOUT_DATA.education.map((edu, idx) => (
                <div key={idx} className="border border-white/10 p-4 bg-black/40 hover:border-pink-500/50 transition-all">
                  <p className="font-bold text-white">{edu.degree}</p>
                  <p className="text-xs opacity-80 text-white/60">{edu.institution} | {edu.period}</p>
                  <p className="text-xs mt-2 text-cyan-400">{edu.focus}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skill Levels Section */}
      <section className="bg-black/60 border border-white/10 p-8 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <h3 className="text-xl font-bold text-white flex items-center gap-4">
          <span className="w-8 h-px bg-yellow-500"></span>
          {ABOUT_DATA.proficiencyTitle} / {ABOUT_DATA.proficiencyHeader}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {ABOUT_DATA.proficiency.map((skill, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-white/60">{skill.label}</span>
                <span className="text-white">{skill.level}%</span>
              </div>
              <div className="h-1.5 bg-white/5 w-full overflow-hidden rounded-full">
                <div 
                  className={`h-full ${skill.color} ${skill.glow} transition-all duration-1000 ease-out`} 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
