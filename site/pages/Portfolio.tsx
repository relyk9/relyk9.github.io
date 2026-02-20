
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const CATEGORY_STYLES: Record<string, { border: string, text: string, bg: string, accent: string, hex: string }> = {
  All: { border: 'border-[#10B981]', text: 'text-[#10B981]', bg: 'bg-[#10B981]', accent: 'text-[#10B981]', hex: '#10B981' },
  Professional: { border: 'border-teal-500', text: 'text-teal-400', bg: 'bg-teal-500', accent: 'text-teal-500', hex: '#14b8a6' },
  Personal: { border: 'border-amber-500', text: 'text-amber-400', bg: 'bg-amber-500', accent: 'text-amber-500', hex: '#f59e0b' },
  Academic: { border: 'border-rose-500', text: 'text-rose-400', bg: 'bg-rose-500', accent: 'text-rose-500', hex: '#f43f5e' },
};

const STATUS_STYLES: Record<Project['status'], { border: string, text: string, dot: string, bg: string }> = {
  'Completed': { border: 'border-[#10B981]', text: 'text-[#10B981]', dot: 'bg-[#10B981]', bg: 'bg-[#10B981]' },
  'In Progress': { border: 'border-orange-500', text: 'text-orange-400', dot: 'bg-orange-500', bg: 'bg-orange-500' },
  'Concept': { border: 'border-red-400', text: 'text-red-400', dot: 'bg-red-400', bg: 'bg-red-400' },
};

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'All' | Project['category']>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | Project['status']>('All');
  const [interactedProjects, setInteractedProjects] = useState<Set<string>>(new Set());
  const [projectImageIndices, setProjectImageIndices] = useState<Record<string, number>>({});

  const handleInteraction = (id: string) => {
    setInteractedProjects(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleImageNav = (e: React.MouseEvent, projectId: string, direction: 'prev' | 'next', max: number) => {
    e.stopPropagation(); // Don't navigate to detail page
    setProjectImageIndices(prev => {
      const current = prev[projectId] || 0;
      let next = direction === 'next' ? current + 1 : current - 1;
      if (next < 0) next = max - 1;
      if (next >= max) next = 0;
      return { ...prev, [projectId]: next };
    });
  };

  const filteredProjects = PROJECTS.filter(p => {
    const categoryMatch = filter === 'All' || p.category === filter;
    const statusMatch = statusFilter === 'All' || p.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="space-y-12">
      <div className="space-y-6 border-b border-[#10B981]/40 pb-6">
        <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-[#10B981]">
          Project_Archives / <span className="text-white opacity-80">Portfolio</span>
        </h2>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-bold opacity-40 tracking-[0.2em] uppercase">Category:</span>
            <div className="flex flex-wrap gap-3">
              {['All', 'Professional', 'Personal', 'Academic'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat as any)}
                  className={`px-3 py-1 transition-all duration-300 border text-[10px] ${
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

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-bold opacity-40 tracking-[0.2em] uppercase">Status:</span>
            <div className="flex flex-wrap gap-3">
              {['All', 'Completed', 'In Progress', 'Concept'].map((stat) => {
                const isSelected = statusFilter === stat;
                const style = stat === 'All' ? null : STATUS_STYLES[stat as Project['status']];
                
                return (
                  <button
                    key={stat}
                    onClick={() => setStatusFilter(stat as any)}
                    className={`px-3 py-1 transition-all duration-300 border text-[10px] uppercase ${
                      isSelected
                        ? stat === 'All' ? 'bg-white text-black shadow-[0_0_10px_white]' : `${style?.bg} text-black font-bold shadow-[0_0_10px_currentColor]`
                        : stat === 'All' ? 'border-white/20 text-white hover:border-white/60 opacity-60' : `${style?.border} ${style?.text} hover:opacity-100 opacity-60`
                    }`}
                  >
                    {stat.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => {
          const style = CATEGORY_STYLES[project.category];
          const statusStyle = STATUS_STYLES[project.status];
          const hasInteracted = interactedProjects.has(project.id);
          const projectImages = project.images || (project.imageUrl ? [project.imageUrl] : []);
          const currentImgIndex = projectImageIndices[project.id] || 0;
          
          return (
            <div 
              key={project.id} 
              className={`group border ${style.border}/30 hover:${style.border} bg-black/40 transition-all duration-500 overflow-hidden flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)]`}
              onMouseEnter={() => handleInteraction(project.id)}
            >
              <div 
                className="relative h-64 overflow-hidden transition-all duration-700 cursor-pointer"
                onClick={() => {
                  handleInteraction(project.id);
                  navigate(`/portfolio/${project.id}`);
                }}
              >
                <img 
                  key={currentImgIndex}
                  src={projectImages[currentImgIndex]} 
                  alt={project.title} 
                  className={`w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700 page-flicker ${
                    hasInteracted 
                    ? 'grayscale-0 brightness-100' 
                    : 'grayscale group-hover:grayscale-0'
                  }`}
                />
                
                {/* Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.02)_50%,transparent_100%)] bg-[size:100%_10px] opacity-30"></div>

                {/* Minimal Gallery Navigation Controls */}
                {projectImages.length > 1 && (
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <button
                      onClick={(e) => handleImageNav(e, project.id, 'prev', projectImages.length)}
                      className={`pointer-events-auto bg-black/60 border ${style.border}/40 ${style.text} w-10 h-10 flex items-center justify-center hover:${style.bg} hover:text-black transition-all z-20 font-bold text-lg`}
                    >
                      &lt;
                    </button>
                    <button
                      onClick={(e) => handleImageNav(e, project.id, 'next', projectImages.length)}
                      className={`pointer-events-auto bg-black/60 border ${style.border}/40 ${style.text} w-10 h-10 flex items-center justify-center hover:${style.bg} hover:text-black transition-all z-20 font-bold text-lg`}
                    >
                      &gt;
                    </button>
                  </div>
                )}

                {/* Status and Category Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <div className={`px-2 py-0.5 bg-black/80 text-[10px] border ${style.border} ${style.text}`}>
                    {project.category.toUpperCase()}
                  </div>
                  <div className={`px-2 py-0.5 bg-black/80 text-[10px] border ${statusStyle.border} ${statusStyle.text} flex items-center gap-1.5`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot} animate-pulse`}></span>
                    {project.status.toUpperCase()}
                  </div>
                </div>

                {/* Simplified Counter Overlay */}
                {projectImages.length > 1 && (
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`bg-black/80 border ${style.border}/30 px-2 py-0.5 text-[10px] font-mono ${style.text}`}>
                      {currentImgIndex + 1} / {projectImages.length}
                    </div>
                  </div>
                )}

                {!hasInteracted && (
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors"></div>
                )}
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
                      VIEW_PROJECT_DETAILS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/20">
            <p className="text-white/40 font-mono text-sm uppercase tracking-widest">No matching archives found in this sector.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
