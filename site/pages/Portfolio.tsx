
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const CATEGORY_STYLES: Record<string, { border: string, text: string, bg: string, accent: string }> = {
  All: { border: 'border-[#00FF41]', text: 'text-[#00FF41]', bg: 'bg-[#00FF41]', accent: 'text-[#00FF41]' },
  Professional: { border: 'border-cyan-500', text: 'text-cyan-400', bg: 'bg-cyan-500', accent: 'text-cyan-500' },
  Personal: { border: 'border-yellow-500', text: 'text-yellow-400', bg: 'bg-yellow-500', accent: 'text-yellow-500' },
  Academic: { border: 'border-pink-500', text: 'text-pink-400', bg: 'bg-pink-500', accent: 'text-pink-500' },
};

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | Project['category']>('All');

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-[#00FF41]/40 pb-4 gap-4">
        <h2 className={`text-2xl md:text-3xl font-bold uppercase tracking-widest ${CATEGORY_STYLES[filter].text} transition-colors duration-500`}>
          Project_Archives / <span className="text-white opacity-80">Portfolio</span>
        </h2>
        <div className="flex gap-4 text-xs">
          {['All', 'Professional', 'Personal', 'Academic'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-3 py-1 transition-all duration-300 border ${
                filter === cat 
                  ? `${CATEGORY_STYLES[cat].bg} text-black font-bold shadow-[0_0_10px_currentColor]` 
                  : `${CATEGORY_STYLES[cat].border} ${CATEGORY_STYLES[cat].text} hover:opacity-100 opacity-60`
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const style = CATEGORY_STYLES[project.category];
          return (
            <div 
              key={project.id} 
              className={`group border ${style.border}/30 hover:${style.border} bg-black/40 transition-all duration-500 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
            >
              <div 
                className="relative h-64 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 cursor-pointer"
                onClick={() => navigate(`/portfolio/${project.id}`)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-4 left-4 px-2 py-0.5 bg-black/80 text-[10px] border ${style.border} ${style.text}`}>
                  {project.category.toUpperCase()}
                </div>
                {project.id.includes('placeholder') && (
                  <div className="absolute top-4 right-4 px-2 py-0.5 bg-yellow-500 text-black text-[10px] font-bold animate-pulse border border-black">
                    PLACEHOLDER
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 
                    className={`text-xl font-bold group-hover:text-white transition-all cursor-pointer ${style.text}`}
                    onClick={() => navigate(`/portfolio/${project.id}`)}
                  >
                    {project.title}
                  </h3>
                  <span className="text-[10px] opacity-60 font-mono text-white">{project.date}</span>
                </div>
                
                <p className="text-xs text-white/70 leading-relaxed mb-6 flex-1 line-clamp-3">
                  {project.description}
                </p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className={`text-[10px] font-bold opacity-60 uppercase tracking-tighter ${style.text}`}>[TECHNICAL_SPECS / SPECS]</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {project.technicalSpecs.slice(0, 4).map((spec, i) => (
                        <div key={i} className="text-[10px] flex items-center gap-2 text-white/80">
                          <span className={style.text}>»</span> {spec}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <span className="text-[10px] font-mono italic text-white/60">ROLE: {project.role}</span>
                    <button 
                      onClick={() => navigate(`/portfolio/${project.id}`)}
                      className={`text-[10px] font-bold border ${style.border} ${style.text} px-4 py-1 hover:${style.bg} hover:text-black transition-all shadow-[0_0_5px_currentColor] uppercase`}
                    >
                      View_Project_Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Portfolio;
