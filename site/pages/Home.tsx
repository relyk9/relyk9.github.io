
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

const LOG_POOL = [
  { text: "FETCHING: SolidWorks_Cloud_Assembly... OK", color: "text-cyan-400" },
  { text: "CALCULATING: Thermal_Dissipation_Rate... 42W/m²K", color: "text-yellow-400" },
  { text: "OPTIMIZING: Topology_Mesh_Density... 2.4M elements", color: "text-pink-400" },
  { text: "VALIDATING: GD&T_Tolerance_Stackup... PASS", color: "text-green-400" },
  { text: "RUNNING: CFD_Analysis_Sim_094... 14% complete", color: "text-blue-400" },
  { text: "SCANNING: Component_Stress_Profiles... 180 MPa detected", color: "text-red-400" },
  { text: "VERIFYING: Factor_of_Safety_Thresholds... OK (> 2.0)", color: "text-emerald-400" },
  { text: "SYNCHRONIZING: Servo_Feedback_Loop... [0.001ms jitter]", color: "text-purple-400" },
  { text: "MAPPING: Fluid_Dynamic_Turbulence... Re = 4500", color: "text-cyan-500" },
  { text: "COMPUTING: Kinematic_Linkage_Matrices... Matrix-3D solved", color: "text-yellow-500" },
  { text: "DETECTED: Material_Yield_Variance... within 0.5% tolerance", color: "text-orange-400" },
  { text: "UPLOADING: CNC_Toolpath_G-Code... Transfer successful", color: "text-indigo-400" },
  { text: "CALIBRATING: Strain_Gauge_Amplifier... Zeroing complete", color: "text-blue-300" },
  { text: "SIMULATING: Fatigue_Life_Cycle_02... 10M cycles predicted", color: "text-pink-500" },
  { text: "MONITORING: Hydraulic_Pressure_Sensors... 3000 PSI stable", color: "text-green-500" }
];

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "> LOADING SYSTEMS... \n> AUTHENTICATING USER... \n> ACCESS GRANTED. \n> WELCOME TO THE MECHANICAL INTELLIGENCE PORTFOLIO. \n> STATUS: READY_FOR_INSPECTION.";

  // Randomly pick 5 unique logs from the pool on every load
  const selectedLogs = useMemo(() => {
    const shuffled = [...LOG_POOL].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  }, []);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-16 animate-in fade-in duration-1000">
      <section className="bg-black/60 border border-[#00FF41] p-8 md:p-12 rounded shadow-[0_0_40px_rgba(0,255,65,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <div className="text-[100px] font-bold text-cyan-500 rotate-12">MECH</div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 bg-cyan-500 text-black text-xs font-bold mb-2 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              USER_ID: ME_SENIOR_V3
            </div>
            <h2 className="text-4xl md:text-6xl font-bold glow-text leading-tight">
              ENGINEERING <br /> <span className="text-cyan-400">THE FUTURE.</span>
            </h2>
            <pre className="text-sm md:text-base leading-relaxed h-32 whitespace-pre-wrap font-mono text-yellow-400/90">
              {typedText}
              <span className="animate-pulse text-[#00FF41]">|</span>
            </pre>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/portfolio" className="border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-black px-6 py-2 transition-all duration-300 shadow-[0_0_10px_rgba(236,72,153,0.3)] font-bold text-sm tracking-widest">
                VIEW_PORTFOLIO
              </Link>
              <Link to="/about" className="text-yellow-400 underline underline-offset-4 hover:text-white transition-colors text-sm font-bold tracking-widest">
                READ_BIO
              </Link>
            </div>
          </div>
          <div className="w-64 h-64 border border-cyan-500 p-2 relative group">
            <div className="absolute inset-0 border border-cyan-500 animate-pulse"></div>
            <div className="absolute -top-4 -right-4 bg-red-500 text-black px-2 py-1 text-[10px] font-bold">LIVE_FEED</div>
            <img 
              src="https://picsum.photos/400/400?random=10" 
              alt="System Avatar" 
              className="w-full h-full object-cover grayscale brightness-50 group-hover:brightness-100 group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </section>

      {/* System Stats Section with varied colors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: "PROJECTS_COMPLETED", value: "12+", icon: "◈", color: "text-cyan-400", border: "border-cyan-500/40" },
          { label: "EXPERIENCE_METRIC", value: "3.0 YRS", icon: "⌬", color: "text-yellow-400", border: "border-yellow-500/40" },
          { label: "PRECISION_ACCURACY", value: "99.9%", icon: "⚙", color: "text-pink-400", border: "border-pink-500/40" },
        ].map((stat, idx) => (
          <div key={idx} className={`border ${stat.border} p-6 flex items-center gap-6 hover:border-white transition-all bg-black/40 group`}>
            <div className={`text-3xl ${stat.color} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
            <div>
              <p className="text-[10px] text-white/40 font-bold tracking-tighter uppercase">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color} group-hover:text-white transition-colors`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Simulation Log with rainbow text - Randomized on load */}
      <section className="bg-black/40 border border-white/10 p-4 rounded-lg overflow-hidden h-40">
        <h3 className="text-xs mb-2 text-white/40 flex justify-between">
          <span>[LIVE_CORE_DIAGNOSTICS / SYSTEM_LOGS]</span>
          <span className="animate-pulse text-red-500 font-bold">● RECORDING</span>
        </h3>
        <div className="space-y-1">
          {selectedLogs.map((log, i) => (
            <p key={i} className={`text-[10px] font-mono ${log.color} opacity-80 animate-pulse`} style={{ animationDelay: `${i * 0.4}s` }}>
              [ {new Date().toLocaleTimeString()} ] {log.text}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
