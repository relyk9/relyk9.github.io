
import React, { useState } from 'react';
import { SKILLS, ABOUT_DATA, HOME_DATA } from '../constants';
import { ProficiencyEntry } from '../types';

const About: React.FC = () => {

  const parseHighlights = (text: string) => {
    const parts = text.split(/(<highlight[1-3]>.*?<\/highlight[1-3]>)/g);
    return parts.map((part, i) => {
      if (part.startsWith('<highlight1>')) {
        return <span key={i} className="text-amber-400 font-bold">{part.replace(/<\/?highlight1>/g, '')}</span>;
      }
      if (part.startsWith('<highlight2>')) {
        return <span key={i} className="text-rose-400 font-bold">{part.replace(/<\/?highlight2>/g, '')}</span>;
      }
      if (part.startsWith('<highlight3>')) {
        return <span key={i} className="text-teal-400 font-bold">{part.replace(/<\/?highlight3>/g, '')}</span>;
      }
      return part;
    });
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return "BASIC";
      case 2: return "PROFICIENT";
      case 3: return "ADVANCED";
      default: return "UNKNOWN";
    }
  };

  const getLevelWidth = (level: number) => {
    switch (level) {
      case 1: return "33.33%";
      case 2: return "66.66%";
      case 3: return "100%";
      default: return "0%";
    }
  };

  const categories = [
    { id: 'Software', label: 'DESIGN SOFTWARE', color: 'text-teal-400', bar: 'bg-teal-500', border: 'border-teal-500' },
    { id: 'Engineering', label: 'ENGINEERING & MFG', color: 'text-[#10B981]', bar: 'bg-[#10B981]', border: 'border-[#10B981]' },
    { id: 'Languages', label: 'PROGRAMMING & DEV', color: 'text-amber-400', bar: 'bg-amber-500', border: 'border-amber-500' },
    { id: 'Professional', label: 'PROFESSIONAL SKILLS', color: 'text-rose-400', bar: 'bg-rose-500', border: 'border-rose-500' },
  ];

  const getSkillTagColor = (skillName: string) => {
    const foundSkill = ABOUT_DATA.proficiency.find(s => 
      s.label.toLowerCase().trim() === skillName.toLowerCase().trim()
    );
    if (!foundSkill) return 'border-white/10 text-white/20';
    
    const cat = categories.find(c => c.id === foundSkill.category);
    return `${cat?.border} ${cat?.color}`;
  };

  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1 space-y-8">
            <h2 className="text-2xl md:text-3xl font-bold border-b border-teal-500 pb-2 text-teal-400 inline-block shadow-[0_4px_10px_-5px_rgba(45,212,191,0.5)] uppercase tracking-widest">
              ENGINEER_PROFILE / <span className="text-white opacity-80">BIO</span>
            </h2>
            <div className="space-y-4 text-sm leading-loose">
              {ABOUT_DATA.paragraphs.map((para, idx) => (
                <p key={idx} className="text-white/80">
                  {parseHighlights(para)}
                </p>
              ))}
              
              <div className="bg-teal-500/10 p-4 border-l-2 border-teal-500 mt-8 group hover:bg-teal-500/20 transition-all">
                <h4 className="text-xs font-bold mb-2 text-teal-400 uppercase tracking-widest">
                  {ABOUT_DATA.missionTitle}
                </h4>
                <p className="italic text-xs text-white/90 leading-relaxed">
                  "{ABOUT_DATA.missionStatement}"
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 w-full md:w-auto md:shrink-0 pt-4">
            <div 
              className="w-56 h-56 border border-teal-500 p-2 relative group cursor-pointer"
            >
              <div className="absolute inset-0 border border-teal-500 animate-pulse"></div>
              <img 
                src={ABOUT_DATA.avatarUrl} 
                alt="System Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-teal-400 tracking-widest glow-text uppercase">{HOME_DATA.userName}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-amber-400 uppercase tracking-tighter">CORE_STACK / SKILLS</h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill) => (
                <span key={skill} className={`px-3 py-1 border-2 ${getSkillTagColor(skill)} text-[10px] hover:bg-white hover:text-black transition-all cursor-default font-bold uppercase tracking-tight`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-rose-400 uppercase tracking-tighter">{ABOUT_DATA.educationTitle} / {ABOUT_DATA.educationHeader}</h3>
            {ABOUT_DATA.education.map((edu, idx) => (
              <div key={idx} className="border border-white/10 p-4 bg-black/40 hover:border-rose-500/50 transition-all">
                <p className="font-bold text-white">{edu.degree}</p>
                <p className="text-xs opacity-80 text-white/60 mb-0.5">{edu.institution} | {edu.period}</p>
                <p className="text-[11px] opacity-70 text-teal-400 flex items-center gap-1.5 mb-2">
                  <span className="text-rose-500">📍</span> {edu.location}
                </p>
                <p className="text-xs text-white/80 border-t border-white/5 pt-2">
                  {edu.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="group bg-black/60 border border-white/10 hover:border-white/40 hover:bg-white/[0.04] p-8 space-y-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(16,185,129,0.05)] relative overflow-hidden transition-all duration-500">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tighter leading-none">
              {ABOUT_DATA.proficiencyTitle}
            </h3>
            <span className="text-white/20 text-xl font-light">/</span>
            <span className="text-white/40 text-base md:text-lg font-bold uppercase tracking-widest md:tracking-[0.2em]">
              {ABOUT_DATA.proficiencyHeader}
            </span>
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {categories.map(cat => (
              <div key={cat.id} className="flex items-center gap-2">
                <div className={`w-2 h-2 ${cat.bar}`}></div>
                <span className={`text-[9px] font-bold tracking-widest uppercase ${cat.color}`}>{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-12">
          {categories.map((cat) => {
            const categorySkills = ABOUT_DATA.proficiency.filter((s: any) => s.category === cat.id);
            if (categorySkills.length === 0) return null;

            return (
              <div key={cat.id} className="space-y-6">
                <h4 className={`text-xs font-bold tracking-[0.2em] border-l-2 pl-3 ${cat.color} border-current`}>
                  {cat.label}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {categorySkills.map((skill: ProficiencyEntry, idx: number) => (
                    <div key={idx} className="space-y-2 group/skill">
                      <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
                        <span className="text-white/60 group-hover/skill:text-white transition-colors">{skill.label}</span>
                        <span className={`${cat.color} opacity-80 group-hover/skill:opacity-100 transition-opacity`}>
                          {getLevelLabel(skill.level)}
                        </span>
                      </div>
                      <div className="relative h-1.5 bg-white/5 w-full overflow-hidden border border-white/5">
                        <div className="absolute inset-0 flex pointer-events-none">
                           <div className="w-1/3 border-r border-white/10 h-full"></div>
                           <div className="w-1/3 border-r border-white/10 h-full"></div>
                           <div className="w-1/3 h-full"></div>
                        </div>
                        <div 
                          className={`h-full ${cat.bar} ${skill.glow} transition-all duration-1000 ease-out relative z-10`} 
                          style={{ width: getLevelWidth(skill.level) }}
                        >
                           <div className="absolute right-0 top-0 h-full w-px bg-white animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[9px] font-bold opacity-30 tracking-widest uppercase text-center">
          <div className="flex items-center gap-2">33% - Fundamental Knowledge</div>
          <div className="flex items-center gap-2">66% - Production Ready</div>
          <div className="flex items-center gap-2">100% - Subject Expert</div>
        </div>
      </section>
    </div>
  );
};

export default About;
