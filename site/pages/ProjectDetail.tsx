
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
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
        <h2 className="text-4xl font-bold text-red-500">404: DATA_NOT_FOUND</h2>
        <p>The requested project archive does not exist in the current sector.</p>
        <Link to="/portfolio" className="inline-block border border-[#10B981] px-6 py-2 hover:bg-[#10B981] hover:text-black transition-all">
          RETURN_TO_ARCHIVES
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

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Professional': return 'teal';
      case 'Personal': return 'amber';
      case 'Academic': return 'rose';
      default: return '[#10B981]';
    }
  };

  const categoryColor = getCategoryColor(project.category);

  const getCategoryNote = (category: string) => {
    switch (category) {
      case 'Professional':
        return `Note: This project represents a professional deployment. The methodology prioritized industrial-grade reliability, compliance with international engineering standards, and rigorous multi-physics validation protocols.`;
      case 'Personal':
        return `Note: This represents a self-directed personal project. The focus was on creative engineering exploration, rapid prototyping, and the integration of emerging technologies to solve unique practical challenges.`;
      case 'Academic':
        return `Note: This project represents an academic research deployment. The methodology prioritized theoretical rigor, computational accuracy, and the application of fundamental mechanical principles to complex research problems.`;
      default:
        return `Note: This project summary represents a deployment in the ${category} sector. The methodology prioritized high-precision modeling coupled with rigorous validation steps.`;
    }
  };

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

  const handleActionClick = () => {
    if (project.actionButton?.url) {
      window.open(project.actionButton.url, '_blank');
    } else {
      alert("NOTICE: THIS PROJECT IS CURRENTLY A PLACEHOLDER. EDIT CONSTANTS.TSX TO ADD REAL DATA.");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/20 pb-6 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="bg-teal-500 text-black px-2 py-0.5 text-[10px] font-bold">PROJECT_ID: {project.id.toUpperCase()}</span>
            <span className="text-[10px] text-white/40">{project.date}</span>
            <span className={`px-2 py-0.5 text-[10px] font-bold border ${statusColorClass} uppercase tracking-widest`}>
              STATUS: {project.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold glow-text">{project.title}</h1>
          <p className="text-teal-400 font-mono tracking-widest text-sm uppercase">Sector: {project.category} // Role: {project.role}</p>
        </div>
        <Link to="/portfolio" className="border border-white/20 px-4 py-2 text-xs hover:border-[#10B981] hover:text-[#10B981] transition-all uppercase font-bold tracking-widest">
          [Back_to_Portfolio]
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          
          {/* Enhanced Image Gallery Component */}
          <div className="space-y-4">
            <div 
              className={`relative aspect-video border-2 border-${categoryColor}-500/30 hover:border-${categoryColor}-500 bg-black/40 overflow-hidden group shadow-[0_0_30px_rgba(0,0,0,0.8)]`}
              onMouseEnter={() => setImageInteracted(true)}
            >
              {/* Main Image */}
              <img 
                key={currentImageIndex}
                src={images[currentImageIndex]} 
                alt={`${project.title} Visual ${currentImageIndex + 1}`} 
                className={`w-full h-full object-cover transition-all duration-700 page-flicker ${
                  imageInteracted 
                  ? 'grayscale-0 brightness-100' 
                  : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'
                }`}
              />
              
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(16,185,129,0.02)_50%,transparent_100%)] bg-[size:100%_10px] opacity-30"></div>

              {/* Minimal Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button 
                    onClick={handlePrevImage}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 border border-${categoryColor}-500/40 text-${categoryColor}-400 w-12 h-12 flex items-center justify-center hover:bg-${categoryColor}-500 hover:text-black transition-all z-20 font-bold text-xl`}
                  >
                    &lt;
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 border border-${categoryColor}-500/40 text-${categoryColor}-400 w-12 h-12 flex items-center justify-center hover:bg-${categoryColor}-500 hover:text-black transition-all z-20 font-bold text-xl`}
                  >
                    &gt;
                  </button>
                </>
              )}

              {/* Simple Index Indicator */}
              {images.length > 1 && (
                <div className={`absolute bottom-4 right-4 bg-black/80 border border-${categoryColor}-500/30 px-3 py-1 text-[11px] font-mono text-${categoryColor}-400 z-20`}>
                  {currentImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative w-24 h-16 flex-shrink-0 border transition-all duration-300 ${
                      currentImageIndex === idx 
                      ? `border-${categoryColor}-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]` 
                      : 'border-white/10 grayscale hover:grayscale-0 hover:border-white/30'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    {currentImageIndex === idx && (
                      <div className={`absolute inset-0 border-2 border-dashed border-${categoryColor}-500 animate-pulse`}></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#10B981] border-l-4 border-[#10B981] pl-4 uppercase tracking-tighter">Executive_Summary / <span className="opacity-60">Description</span></h3>
            <p className="text-white/80 leading-loose text-lg">
              {project.description}
            </p>
            <p className="text-white/70 leading-relaxed italic border-t border-white/5 pt-4 text-sm">
              {getCategoryNote(project.category)}
            </p>
          </div>

          <div className="bg-teal-900/10 border border-teal-500/30 p-8 space-y-6 shadow-[inset_0_0_20px_rgba(45,212,191,0.05)]">
            <h3 className="text-xl font-bold text-teal-400 uppercase tracking-tighter">Operational_Metrics / <span className="opacity-60 text-white">Project Details</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-white/40 tracking-widest uppercase">System_Constraints / Requirements</p>
                <ul className="space-y-2">
                  {constraints.map((c, i) => (
                    <li key={i} className="text-sm flex items-center gap-3">
                      <span className="text-teal-500">◈</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-white/40 tracking-widest uppercase">Materials_Analysis / Tools</p>
                <ul className="space-y-2">
                  {tools.map((t, i) => (
                    <li key={i} className="text-sm flex items-center gap-3">
                      <span className="text-teal-500">◈</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="border border-white/10 p-6 bg-black/40 space-y-6">
            <h4 className="text-sm font-bold text-amber-500 uppercase tracking-widest border-b border-amber-500/30 pb-2">Technical_Manifest / <span className="opacity-60 text-white">Specs</span></h4>
            <div className="space-y-4">
              {project.technicalSpecs.map((spec, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex justify-between text-[10px] text-white/40 mb-1">
                    <span>SPEC_PARAM_{i+1}</span>
                    <span className="group-hover:text-amber-400 transition-colors">ACTIVE</span>
                  </div>
                  <div className="text-sm text-white group-hover:translate-x-2 transition-transform duration-300 font-mono">
                    {spec}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={handleActionClick}
            className="w-full bg-white text-black py-4 font-bold text-xs hover:bg-[#10B981] transition-all flex justify-center items-center gap-2 group uppercase tracking-widest shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
          >
            {project.actionButton?.label || 'Request_Detailed_Docs'}
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
