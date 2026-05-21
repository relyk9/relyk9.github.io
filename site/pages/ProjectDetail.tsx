
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const project = PROJECTS.find(p => p.id === projectId);
  
  const images = project?.images || (project?.imageUrl ? [project.imageUrl] : []);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageInteracted, setImageInteracted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="text-center py-20 space-y-6">
        <h2 className="text-4xl font-bold text-red-500">Project Not Found</h2>
        <p>The project you requested is not available in this portfolio.</p>
        <Link to="/portfolio" className="inline-block border border-[#10B981] px-6 py-2 hover:bg-[#10B981] hover:text-black transition-all">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const CATEGORY_STYLES: Record<string, { border: string; text: string; softBorder: string; softBg: string }> = {
    Professional: { border: 'border-teal-500', text: 'text-teal-300', softBorder: 'border-teal-500/30', softBg: 'bg-teal-500/8' },
    Personal: { border: 'border-amber-500', text: 'text-amber-300', softBorder: 'border-amber-500/30', softBg: 'bg-amber-500/8' },
    Academic: { border: 'border-rose-500', text: 'text-rose-300', softBorder: 'border-rose-500/30', softBg: 'bg-rose-500/8' },
  };
  const categoryStyle = CATEGORY_STYLES[project.category] || CATEGORY_STYLES.Personal;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-[#10B981] border-[#10B981] bg-[#10B981]/10';
      case 'In Progress': return 'text-orange-400 border-orange-500 bg-orange-500/10';
      case 'Concept': return 'text-red-400 border-red-400 bg-red-400/10';
      default: return 'text-white border-white bg-white/10';
    }
  };

  const statusColorClass = getStatusColor(project.status);

  const constraints = project.metrics?.constraints || [
    'Factor of Safety Threshold: > 2.0',
    'Industry Standard Compliance',
    'Optimized Load Tolerance'
  ];
  const tools = project.metrics?.tools || [
    'Professional CAD Software',
    'Simulation & Analysis Suites',
    'Manufacturing Specifications'
  ];
  const highlights = project.highlights || [];
  const technicalSpecs = project.technicalSpecs.map((spec) => {
    const separatorIndex = spec.indexOf(':');
    if (separatorIndex === -1) {
      return { label: 'Detail', value: spec };
    }

    return {
      label: spec.slice(0, separatorIndex).trim(),
      value: spec.slice(separatorIndex + 1).trim(),
    };
  });

  const handleActionClick = () => {
    if (project.actionButton?.url) {
      window.open(project.actionButton.url, '_blank');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/15 pb-6 gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`px-2 py-0.5 text-[10px] font-bold border ${categoryStyle.softBorder} ${categoryStyle.text} ${categoryStyle.softBg}`}>{project.category}</span>
            <span className="text-[10px] text-white/40">{project.date}</span>
            <span className={`px-2 py-0.5 text-[10px] font-bold border ${statusColorClass} uppercase tracking-widest`}>
              {project.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold glow-text">{project.title}</h1>
          <p className="text-white/70 max-w-3xl leading-relaxed text-sm md:text-base">
            {project.overview || project.description}
          </p>
        </div>
        <Link to="/portfolio" className="border border-white/20 px-4 py-2 text-xs hover:border-[#10B981] hover:text-[#10B981] transition-all uppercase font-bold tracking-widest">
          Back to Portfolio
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="space-y-4">
            <div 
              className={`relative aspect-video border ${categoryStyle.softBorder} bg-black/35 overflow-hidden group shadow-[0_0_20px_rgba(0,0,0,0.45)] rounded-sm`}
              onMouseEnter={() => setImageInteracted(true)}
            >
              <img 
                key={currentImageIndex}
                src={images[currentImageIndex]} 
                alt={`${project.title} Visual ${currentImageIndex + 1}`} 
                className={`w-full h-full object-cover transition-all duration-700 ${
                  imageInteracted 
                  ? 'grayscale-0 brightness-100' 
                  : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'
                }`}
              />

              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/65 border ${categoryStyle.softBorder} ${categoryStyle.text} w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition-all z-20 font-bold text-xl`}
                  >
                    &lt;
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/65 border ${categoryStyle.softBorder} ${categoryStyle.text} w-12 h-12 flex items-center justify-center hover:bg-white hover:text-black transition-all z-20 font-bold text-xl`}
                  >
                    &gt;
                  </button>
                </>
              )}

              {images.length > 1 && (
                <div className={`absolute bottom-4 right-4 bg-black/80 border ${categoryStyle.softBorder} px-3 py-1 text-[11px] font-mono ${categoryStyle.text} z-20`}>
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-24 h-16 flex-shrink-0 border transition-all duration-300 ${
                      currentImageIndex === idx 
                      ? `${categoryStyle.border} shadow-[0_0_10px_rgba(255,255,255,0.12)]` 
                      : 'border-white/10 grayscale hover:grayscale-0 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    {currentImageIndex === idx && (
                      <div className={`absolute inset-0 border border-dashed ${categoryStyle.border}`}></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-6">
            <section className="border border-white/10 bg-black/35 p-6 md:p-8 space-y-4 rounded-sm">
              <h3 className="text-lg font-bold text-white uppercase tracking-[0.16em]">Project Summary</h3>
              <p className="text-white/80 leading-loose text-base">{project.description}</p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="border border-white/10 bg-black/35 p-6 space-y-4 rounded-sm">
                <h3 className="text-sm font-bold text-white/90 uppercase tracking-[0.16em]">Challenge</h3>
                <p className="text-sm text-white/75 leading-loose">{project.challenge || 'This project was shaped by practical constraints around usability, implementation effort, and clear communication of the end result.'}</p>
              </section>
              <section className="border border-white/10 bg-black/35 p-6 space-y-4 rounded-sm">
                <h3 className="text-sm font-bold text-white/90 uppercase tracking-[0.16em]">Outcome</h3>
                <p className="text-sm text-white/75 leading-loose">{project.outcome || 'The final result reflects an emphasis on practical engineering decisions, readability, and a clear end-user experience.'}</p>
              </section>
            </div>

            {highlights.length > 0 && (
              <section className="border border-white/10 bg-black/35 p-6 md:p-8 space-y-4 rounded-sm">
                <h3 className="text-sm font-bold text-white/90 uppercase tracking-[0.16em]">What I Focused On</h3>
                <ul className="space-y-3">
                  {highlights.map((item, i) => (
                    <li key={i} className="text-sm text-white/80 flex items-start gap-3 leading-relaxed">
                      <span className={`${categoryStyle.text} mt-0.5`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className={`border ${categoryStyle.softBorder} ${categoryStyle.softBg} p-6 md:p-8 space-y-6 rounded-sm`}>
              <h3 className={`text-lg font-bold uppercase tracking-[0.16em] ${categoryStyle.text}`}>Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                  <p className="text-xs font-bold text-white/45 tracking-widest uppercase">Constraints</p>
                <ul className="space-y-2">
                  {constraints.map((c, i) => (
                    <li key={i} className="text-sm flex items-center gap-3">
                        <span className={categoryStyle.text}>◈</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                  <p className="text-xs font-bold text-white/45 tracking-widest uppercase">Tools & Stack</p>
                <ul className="space-y-2">
                  {tools.map((t, i) => (
                    <li key={i} className="text-sm flex items-center gap-3">
                        <span className={categoryStyle.text}>◈</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </section>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border border-white/10 p-6 bg-black/35 space-y-6 rounded-sm">
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.16em] border-b border-white/10 pb-2">Project Snapshot</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-white/45 uppercase tracking-widest text-[10px]">Role</span>
                <span className="text-white/85 text-right">{project.role}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/45 uppercase tracking-widest text-[10px]">Category</span>
                <span className={`text-right ${categoryStyle.text}`}>{project.category}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/45 uppercase tracking-widest text-[10px]">Status</span>
                <span className="text-white/85 text-right">{project.status}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-white/45 uppercase tracking-widest text-[10px]">Year</span>
                <span className="text-white/85 text-right">{project.date}</span>
              </div>
            </div>
          </div>

          <div className="border border-white/10 p-6 bg-black/35 space-y-6 rounded-sm">
            <h4 className="text-sm font-bold text-white uppercase tracking-[0.16em] border-b border-white/10 pb-2">Implementation Notes</h4>
            <div className="space-y-4">
              {technicalSpecs.map((spec, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex justify-between text-[10px] text-white/40 mb-1">
                    <span>{spec.label}</span>
                    <span className="group-hover:text-white transition-colors">Included</span>
                  </div>
                  <div className="text-sm text-white/85 group-hover:translate-x-1 transition-transform duration-300">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {project.actionButton?.url && (
            <button 
              onClick={handleActionClick}
              className="w-full bg-white text-black py-4 font-bold text-xs hover:bg-[#10B981] transition-all flex justify-center items-center gap-2 group uppercase tracking-widest shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
            >
              {project.actionButton.label}
              <span className="group-hover:translate-x-2 transition-transform">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
