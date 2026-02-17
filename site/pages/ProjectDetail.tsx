
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
        <Link to="/portfolio" className="inline-block border border-[#00FF41] px-6 py-2 hover:bg-[#00FF41] hover:text-black transition-all">
          RETURN_TO_ARCHIVES
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start border-b border-white/20 pb-6 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <span className="bg-cyan-500 text-black px-2 py-0.5 text-[10px] font-bold">PROJECT_ID: {project.id.toUpperCase()}</span>
            <span className="text-[10px] text-white/40">{project.date}</span>
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
            <p className="text-white/70 leading-relaxed italic border-t border-white/5 pt-4">
              Note: This project summary represents a deployment in the {project.category} sector. The methodology prioritized high-precision modeling Coupled with rigorous validation steps.
            </p>
          </div>

          <div className="bg-cyan-900/10 border border-cyan-500/30 p-8 space-y-6">
            <h3 className="text-xl font-bold text-cyan-400 uppercase tracking-tighter">Operational_Metrics / <span className="opacity-60 text-white">Project Details</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-xs font-bold text-white/40 tracking-widest uppercase">System_Constraints / Requirements</p>
                <ul className="space-y-2">
                  <li className="text-sm flex items-center gap-3">
                    <span className="text-cyan-500">◈</span> Factor of Safety Threshold: {">"} 2.0
                  </li>
                  <li className="text-sm flex items-center gap-3">
                    <span className="text-cyan-500">◈</span> Industry Standard Compliance
                  </li>
                  <li className="text-sm flex items-center gap-3">
                    <span className="text-cyan-500">◈</span> Optimized Load Tolerance
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-bold text-white/40 tracking-widest uppercase">Materials_Analysis / Tools</p>
                <ul className="space-y-2">
                  <li className="text-sm flex items-center gap-3">
                    <span className="text-cyan-500">◈</span> Professional CAD Software
                  </li>
                  <li className="text-sm flex items-center gap-3">
                    <span className="text-cyan-500">◈</span> Simulation & Analysis Suites
                  </li>
                  <li className="text-sm flex items-center gap-3">
                    <span className="text-cyan-500">◈</span> Manufacturing Specifications
                  </li>
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

          <div className="border border-pink-500/30 p-6 bg-black/40 space-y-4">
            <h4 className="text-sm font-bold text-pink-400 uppercase tracking-widest">Diagnostic_Log</h4>
            <div className="text-[10px] font-mono space-y-2 opacity-60">
              <p>[08:42:12] Initializing FEA mesh...</p>
              <p>[08:45:01] Loading project data: {project.id}</p>
              <p>[08:48:33] Validating structural parameters...</p>
              <p className="text-pink-400 animate-pulse">[READY] Project summary loaded successfully.</p>
            </div>
          </div>

          <button 
            onClick={() => alert("NOTICE: THIS PROJECT IS CURRENTLY A PLACEHOLDER. EDIT CONSTANTS.TSX TO ADD REAL DATA.")}
            className="w-full bg-white text-black py-4 font-bold text-xs hover:bg-[#00FF41] transition-all flex justify-center items-center gap-2 group uppercase tracking-widest"
          >
            Request_Detailed_Docs
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
