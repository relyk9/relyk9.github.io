
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = PROJECTS.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="text-center py-20 space-y-6">
        <h2 className="text-4xl font-bold text-red-500">404: DATA_NOT_FOUND</h2>
        <p>The requested project archive does not exist in the current sector.</p>
        {/* Fix: Changed lowercase link to uppercase Link component from react-router-dom */}
        <Link to="/portfolio" className="inline-block border border-[#00FF41] px-6 py-2 hover:bg-[#00FF41] hover:text-black transition-all">
          RETURN_TO_ARCHIVES
        </Link>
      </div>
    );
  }

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
      case 'Completed': return 'text-[#00FF41] border-[#00FF41] bg-[#00FF41]/10';
      case 'In Progress': return 'text-yellow-400 border-yellow-400 bg-yellow-400/10';
      case 'Concept': return 'text-cyan-400 border-cyan-400 bg-cyan-400/10';
      default: return 'text-white border-white bg-white/10';
    }
  };

  // Default Metrics if not provided in constants
  const defaultConstraints = [
    'Factor of Safety Threshold: > 2.0',
    'Industry Standard Compliance',
    'Optimized Load Tolerance'
  ];
  const defaultTools = [
    'Professional CAD Software',
    'Simulation & Analysis Suites',
    'Manufacturing Specifications'
  ];

  const constraints = project.metrics?.constraints || defaultConstraints;
  const tools = project.metrics?.tools || defaultTools;

  const handleActionClick = () => {
    if (project.actionButton?.url) {
      window.open(project.actionButton.url, '_blank');
    } else {
      alert("NOTICE: THIS PROJECT IS CURRENTLY A PLACEHOLDER. EDIT CONSTANTS.TSX TO ADD REAL DATA.");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/20 pb-6 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="bg-cyan-500 text-black px-2 py-0.5 text-[10px] font-bold">PROJECT_ID: {project.id.toUpperCase()}</span>
            <span className="text-[10px] text-white/40">{project.date}</span>
            <span className={`px-2 py-0.5 text-[10px] font-bold border ${getStatusColor(project.status)} uppercase tracking-widest`}>
              STATUS: {project.status}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold glow-text">{project.title}</h1>
          <p className="text-cyan-400 font-mono tracking-widest text-sm uppercase">Sector: {project.category} // Role: {project.role}</p>
        </div>
        <Link to="/portfolio" className="border border-white/20 px-4 py-2 text-xs hover:border-[#00FF41] hover:text-[#00FF41] transition-all uppercase font-bold tracking-widest">
          [Back_to_Portfolio]
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          {/* Main Content Area */}
          <div className="aspect-video border border-white/10 bg-black/40 overflow-hidden relative group">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
            />
            {project.id.includes('placeholder') && (
              <div className="absolute top-4 left-4 bg-yellow-500 text-black px-3 py-1 text-[10px] font-bold z-20">
                PLACEHOLDER_VISUAL
              </div>
            )}
            <div className="absolute top-4 right-4 bg-black/80 border border-red-500 text-red-500 px-3 py-1 text-[10px] animate-pulse">
              ENCRYPTED_VISUAL_FEED
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#00FF41] border-l-4 border-[#00FF41] pl-4 uppercase tracking-tighter">Executive_Summary / <span className="opacity-60">Description</span></h3>
            <p className="text-white/80 leading-loose text-lg">
              {project.description}
            </p>
            <p className="text-white/70 leading-relaxed italic border-t border-white/5 pt-4 text-sm">
              {getCategoryNote(project.category)}
            </p>
          </div>

          <div className="bg-cyan-900/10 border border-cyan-500/30 p-8 space-y-6">
            <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-tighter">Operational_Metrics / <span className="opacity-60 text-white">Project Details</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-white/40 tracking-widest uppercase">System_Constraints / Requirements</p>
                <ul className="space-y-2">
                  {constraints.map((c, i) => (
                    <li key={i} className="text-sm flex items-center gap-3">
                      <span className="text-cyan-500">◈</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-white/40 tracking-widest uppercase">Materials_Analysis / Tools</p>
                <ul className="space-y-2">
                  {tools.map((t, i) => (
                    <li key={i} className="text-sm flex items-center gap-3">
                      <span className="text-cyan-500">◈</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Sidebar Area */}
          <div className="border border-white/10 p-6 bg-black/40 space-y-6">
            <h4 className="text-sm font-bold text-yellow-500 uppercase tracking-widest border-b border-yellow-500/30 pb-2">Technical_Manifest / <span className="opacity-60 text-white">Specs</span></h4>
            <div className="space-y-4">
              {project.technicalSpecs.map((spec, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex justify-between text-[10px] text-white/40 mb-1">
                    <span>SPEC_PARAM_{i+1}</span>
                    <span className="group-hover:text-yellow-400 transition-colors">ACTIVE</span>
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
            className="w-full bg-white text-black py-4 font-bold text-xs hover:bg-[#00FF41] transition-all flex justify-center items-center gap-2 group uppercase tracking-widest"
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
