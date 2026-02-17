
import React from 'react';
import { SKILLS } from '../constants';

const About: React.FC = () => {
  return (
    <div className="space-y-16 max-w-4xl mx-auto">
      <section className="space-y-8">
        <h2 className="text-2xl md:text-3xl font-bold border-b border-cyan-500 pb-2 text-cyan-400 inline-block shadow-[0_4px_10px_-5px_rgba(6,182,212,0.5)] uppercase tracking-widest">
          ENGINEER_PROFILE / <span className="text-white opacity-80">BIO</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4 text-sm leading-loose">
            <p className="text-white/80">
              I am a Mechanical Engineer with <span className="text-yellow-400 font-bold">3 years</span> of professional experience, specializing in bridging the gap between digital design and physical reality. My approach integrates rigorous analytical methods with innovative manufacturing techniques.
            </p>
            <p className="text-white/80">
              Whether it's optimizing a complex thermal management system or prototyping high-precision robotic components, I thrive on challenges that require both <span className="text-pink-400 font-bold">creative problem-solving</span> and <span className="text-cyan-400 font-bold">technical precision</span>.
            </p>
            <div className="bg-cyan-500/10 p-4 border-l-2 border-cyan-500 mt-8 group hover:bg-cyan-500/20 transition-all">
              <h4 className="text-xs font-bold mb-2 text-cyan-400 uppercase tracking-widest">MISSION_OBJECTIVE / CORE GOAL:</h4>
              <p className="italic text-xs text-white/90">
                To develop sustainable, high-efficiency mechanical solutions that push the boundaries of modern industrial automation and energy management.
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
              <h3 className="text-lg font-bold text-pink-400 uppercase tracking-tighter">EDUCATION_ARCHIVE / DEGREES</h3>
              <div className="border border-white/10 p-4 bg-black/40 hover:border-pink-500/50 transition-all">
                <p className="font-bold text-white">B.S. in Mechanical Engineering</p>
                <p className="text-xs opacity-80 text-white/60">Tech Institute of Engineering | 2017 - 2021</p>
                <p className="text-xs mt-2 text-cyan-400">Focus: Computational Fluid Dynamics & Robotics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Levels with unique colors */}
      <section className="bg-black/60 border border-white/10 p-8 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <h3 className="text-xl font-bold text-white flex items-center gap-4">
          <span className="w-8 h-px bg-yellow-500"></span>
          SYSTEM_LEVELS / PROFICIENCY
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {[
            { label: "CAD_MODELING", level: 95, color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
            { label: "FEA_SIMULATION", level: 88, color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
            { label: "DFM_DFA", level: 92, color: "bg-yellow-500", glow: "shadow-[0_0_10px_rgba(234,179,8,0.8)]" },
            { label: "PROTOTYPING", level: 85, color: "bg-[#00FF41]", glow: "shadow-[0_0_10px_rgba(0,255,65,0.8)]" },
            { label: "MATHEMATICAL_MODELING", level: 80, color: "bg-blue-500", glow: "shadow-[0_0_10px_rgba(59,130,246,0.8)]" },
            { label: "CONTROL_SYSTEMS", level: 75, color: "bg-red-500", glow: "shadow-[0_0_10px_rgba(239,68,68,0.8)]" },
          ].map((skill, idx) => (
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
