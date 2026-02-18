
import { Project, ExperienceEntry, StatEntry, EducationEntry, ProficiencyEntry, LogEntryPool, ExperienceData, TypingChallengeData, ScoreEntry } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'meta-portfolio',
    title: 'Mechanical Matrix Portfolio',
    category: 'Personal',
    status: 'In Progress',
    role: 'Architect / Engineer',
    date: '2026',
    description: 'A high-end, terminal-inspired digital portfolio engineered to showcase technical proficiency. Built with a "Matrix" aesthetic, featuring a custom KaTeX-based equation rain system and a terminal-driven performance challenge.',
    technicalSpecs: [
      'Engine: React 19 + TypeScript',
      'UI: Tailwind CSS + CRT Filters',
      'Math: KaTeX Render Engine',
      'UX: Responsive Terminal Design'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    metrics: {
      constraints: [
        'Deterministic layout across sectors',
        'Optimized math-rain performance',
        'Seamless hardware-accelerated transitions'
      ],
      tools: [
        'React / TypeScript',
        'KaTeX',
        'Tailwind CSS'
      ]
    },
    actionButton: {
      label: 'VIEW_SOURCE',
      url: 'https://github.com/relyk9'
    }
  },
  {
    id: 'ANGLER-LOGBOOK',
    title: 'Angler\'s Logbook',
    category: 'Personal',
    status: 'Completed',
    role: 'Developer',
    date: '2026',
    description: 'Web-based logbook for recording the details of the fish you catch. Designed with a mobile-first approach to ensure ease of use while in the field (or on the boat).',
    technicalSpecs: [
      'Region: Southern US',
      'Supported Platforms: Desktop, Mobile, Tablet',
      'Status: Fully Functional',
      'UX: Offline-ready'
    ],
    imageUrl: '/images/anglers_logbook_titlepage.png',
    metrics: {
      constraints: [
        'Minimal latency in low-signal areas',
        'Intuitive UI for wet-hand interactions',
        'Cross-platform synchronization'
      ],
      tools: [
        'React / TypeScript',
        'Local Storage API',
        'Responsive Design Frameworks'
      ]
    },
    actionButton: {
      label: 'OPEN_LOGBOOK',
      url: '/anglers-logbook/'
    }
  }
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: '[MilliporeSigma]',
    role: 'Manufacturing Engineer',
    period: 'FEB 2024 - Present',
    location: 'The Woodlands, TX.',
    description: [
      'Develop and optimize liquid handling methods for biotech customers.',
    ]
  },
  {
    company: '[MilliporeSigma]',
    role: 'Associate Manufacturing Engineer',
    period: 'JUN 2022 - FEB 2024',
    location: 'The Woodlands, TX.',
    description: [
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceData = {
  header: "OPERATIONAL_HISTORY",
  subHeader: "WORK EXPERIENCE",
  description: "Timeline of professional deployments, career roles, and key engineering achievements.",
  downloadLabel: "DOWNLOAD_FULL_RESUME.pdf"
};

const EXP_YEARS = "3";

export const HOME_DATA = {
  userId: "MANUFACTURING_ENGINEER",
  userName: "KYLER MOFFAT",
  heroTitle: ["HELPING ENGINEER", "THE FUTURE."],
  typedText: "> LOADING SYSTEMS... \n> AUTHENTICATING USER... \n> ACCESS GRANTED. \n> STATUS: READY_FOR_INSPECTION.",
  stats: [
    { label: "PROJECTS_COMPLETED", value: "2+", icon: "◈", color: "text-cyan-400", border: "border-cyan-500/40" },
    { label: "EXPERIENCE", value: `${EXP_YEARS} YRS`, icon: "⌬", color: "text-yellow-400", border: "border-yellow-500/40" },
    { label: "DESIGN_INTENT", value: "RELIABILITY > COMPLEXITY", icon: "⚙", color: "text-pink-400", border: "border-pink-500/40" },
  ] as StatEntry[],
  logSectionTitle: "[LIVE_CORE_DIAGNOSTICS / SYSTEM_LOGS]",
  avatarUrl: '/images/profile_pic.jpg',
};

export const ABOUT_DATA = {
  profileTitle: "SYSTEM_LEVELS",
  profileHeader: "BIO",
  paragraphs: [
    'I’m a <highlight1>mechanical engineer</highlight1> currently in <highlight2>manufacturing</highlight2>, focused on automation and the design of production systems that are reliable, scalable, and data-driven.',
    'I work at the intersection of mechanical design, process optimization, and real-world execution.',
    'Outside of work, I enjoy getting outdoors to kayak and hike, traveling when I can, and working on astrophotography projects. I also spend a lot of time reading and learning about history.'
  ],
  missionTitle: "MISSION_OBJECTIVE",
  missionHeader: "CORE GOAL",
  missionStatement: "To build smarter manufacturing systems by combining mechanical engineering, automation, and continuous improvement.",
  educationTitle: "EDUCATION_ARCHIVE",
  educationHeader: "DEGREES",
  education: [
    {
      degree: "B.S.c in Mechanical Engineering",
      institution: "Texas A&M University",
      location: "College Station, TX",
      period: "2018 - 2023",
      focus: 'Emphasis on mechanical systems, advanced SolidWorks, and applied physics'
    }
  ] as EducationEntry[],
  proficiencyTitle: "SYSTEM_LEVELS",
  proficiencyHeader: "PROFICIENCY",
  proficiency: [
    // SOFTWARE & CAD (Cyan)
    { label: "SolidWorks", level: 3, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "Fusion 360", level: 2, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "Cura", level: 2, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "Visual Studio", level: 2, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "MiniTab", level: 2, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "SmartSheet", level: 2, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "Visio", level: 2, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "KiCad", level: 1, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "PDM", level: 1, category: 'Software', color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },

    // ENGINEERING & MANUFACTURING (Green)
    { label: "3D Printing (SLA/FDM)", level: 3, category: 'Engineering', color: "bg-[#00FF41]", glow: "shadow-[0_0_10px_rgba(0,255,65,0.8)]" },
    { label: "DFM/DFA", level: 3, category: 'Engineering', color: "bg-[#00FF41]", glow: "shadow-[0_0_10_px_rgba(0,255,65,0.8)]" },
    { label: "FEA/CFD", level: 2, category: 'Engineering', color: "bg-[#00FF41]", glow: "shadow-[0_0_10px_rgba(0,255,65,0.8)]" },
    { label: "GD&T", level: 1, category: 'Engineering', color: "bg-[#00FF41]", glow: "shadow-[0_0_10px_rgba(0,255,65,0.8)]" },
    { label: "CNC Programming", level: 1, category: 'Engineering', color: "bg-[#00FF41]", glow: "shadow-[0_0_10px_rgba(0,255,65,0.8)]" },

    // LANGUAGES (Yellow)
    { label: "Python", level: 2, category: 'Languages', color: "bg-yellow-500", glow: "shadow-[0_0_10px_rgba(234,179,8,0.8)]" },
    { label: "C#", level: 2, category: 'Languages', color: "bg-yellow-500", glow: "shadow-[0_0_10px_rgba(234,179,8,0.8)]" },
    { label: "MATLAB", level: 1, category: 'Languages', color: "bg-yellow-500", glow: "shadow-[0_0_10px_rgba(234,179,8,0.8)]" },

    // PROFESSIONAL SKILLS (Pink)
    { label: "Troubleshooting", level: 3, category: 'Professional', color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
    { label: "Documentation", level: 3, category: 'Professional', color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
    { label: "Problem Solving", level: 3, category: 'Professional', color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
    { label: "Root Cause Analysis", level: 2, category: 'Professional', color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
    { label: "Cross-functional Collaboration", level: 2, category: 'Professional', color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
    { label: "Peer Mentoring", level: 1, category: 'Professional', color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
    { label: "Stakeholder Coordination", level: 1, category: 'Professional', color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
  ] as ProficiencyEntry[]
};

export const SKILLS = [
  'SolidWorks', 'Cura', 'Fusion 360', 'FEA/CFD', 'GD&T', 'MATLAB', 'CNC Programming', '3D Printing (SLA/FDM)', 'DFM/DFA', 'Python', 'C#', 'Visual Studio', 'KiCad', 'MiniTab', 'SmartSheet', 'PDM', 'Visio',
  'Troubleshooting', 'Documentation', 'Root Cause Analysis', 'Cross-functional Collaboration', 'Peer Mentoring', 'Stakeholder Coordination', 'Problem Solving'
];

export const TYPING_CHALLENGE_DATA: TypingChallengeData = {
  header: "TYPING_TEST",
  subHeaderPrefix: "SCTR_",
  guidelinesTitle: "Operational_Guidelines",
  scoreAlgorithmLabel: "SCORE_ALGORITHM_V2.0",
  scoreFormula: "SCORE = WPM * (ACCURACY / 100) * 10",
  benchmarkNote: "Benchmark protocols synchronized. Sequence integrity monitoring enabled. Text wrapping support for high-throughput operational streams."
};

export const DEFAULT_HIGH_SCORES: ScoreEntry[] = [
  { initials: "KM", wpm: 92, accuracy: 98, score: 901, timestamp: 1700000000000 },
  { initials: "JD", wpm: 85, accuracy: 95, score: 807, timestamp: 1699000000000 },
  { initials: "AE", wpm: 78, accuracy: 100, score: 780, timestamp: 1698000000000 },
  { initials: "NS", wpm: 72, accuracy: 94, score: 676, timestamp: 1697000000000 },
  { initials: "ME", wpm: 65, accuracy: 99, score: 643, timestamp: 1696000000000 },
  { initials: "FE", wpm: 60, accuracy: 90, score: 540, timestamp: 1695000000000 },
];

export const LOG_POOL: LogEntryPool[] = [
  { text: "SW_ERR: SolidWorks has encountered a problem and needs to close. [Did you save? No? Oh no.]", color: "text-red-500" },
  { text: "SW_WARN: 'Final_V2_Last_Revised_ActuallyFinal_v3.sldprt' not found. It probably never existed.", color: "text-yellow-400" },
  { text: "SW_CRITICAL: Memory leak detected. SolidWorks is currently consuming 40GB of RAM and your soul.", color: "text-orange-600" },
  { text: "SIM_FAIL: Gravity set to 0. Components are drifting into the void. This is fine.", color: "text-red-400" },
  { text: "NOTICE: Design review tomorrow. Coffee consumption increased by 200%.", color: "text-blue-300" },
  { text: "SW_NOTICE: Feature 'Fillet_247' is angry and refuses to rebuild. Maybe try a smaller radius?", color: "text-cyan-400" },
  { text: "PDM: Database connection established. Vault: MECH_PROD_RESERVE.", color: "text-cyan-400" },
  { text: "SW_CRITICAL: Rebuild error in 'Main_Assy'. 1,422 warnings suppressed. Out of sight, out of mind.", color: "text-orange-500" },
  { text: "CALCULATING: Thermal_Dissipation_Rate... 42W/m²K (Calculated via finger-to-surface test)", color: "text-yellow-400" },
  { text: "OPTIMIZING: Topology_Mesh_Density... Element count: Inf. CPU fan has entered low-earth orbit.", color: "text-pink-400" },
  { text: "VALIDATING: GD&T_Tolerance_Stackup... Error: Hope is not a strategy. Neither is 'just file it down'.", color: "text-red-400" },
  { text: "RUNNING: CFD_Analysis_Sim_094... Expected completion: When the sun burns out.", color: "text-blue-400" },
  { text: "SIM: Gravity load applied: 9.81 m/s² [WAIT, WHY IS IT UPWARD?].", color: "text-yellow-300" },
  { text: "SCANNING: Component_Stress_Profiles... 180 MPa (Engineer stress: 250 MPa)", color: "text-red-400" },
  { text: "VERIFYING: Factor_of_Safety_Thresholds... OK (FOS = 1.0000001)", color: "text-emerald-400" },
  { text: "FEA_ERROR: Rebuild Error: Sketch does not form a closed contour. Found a 0.0000000001mm gap.", color: "text-red-500" },
  { text: "SYNCHRONIZING: Servo_Feedback_Loop... [0.001ms jitter, also making a weird clicking sound]", color: "text-purple-400" },
  { text: "MAPPING: Fluid_Dynamic_Turbulence... Re = 4500 (Simulation looks like spilled soup)", color: "text-cyan-500" },
  { text: "DFM_SCAN: Wall thickness < 0.5mm in Housing_Shell_Cast. The machinist is actively crying.", color: "text-yellow-500" },
  { text: "UPLOADING: CNC_Toolpath_G-Code... N-BLOCK transfer active. [G-Code or ancient runes?]", color: "text-indigo-400" },
  { text: "CALIBRATING: Strain_Gauge_Amplifier_01... Zeroing complete [I think?]", color: "text-blue-300" },
  { text: "SIMULATING: Fatigue_Life_Cycle_02... 10M cycles predicted. Real part broke in 15 seconds.", color: "text-pink-500" },
  { text: "MONITORING: Hydraulic_Pressure_Sensors... 3000 PSI stable (Leaking fluid is 'within tolerance')", color: "text-green-500" },
  { text: "SW_ERR: Interference detected between 'Shaft_Main' and 'Bearing_Race'. Use a bigger hammer.", color: "text-red-400" },
  { text: "WARNING: Simulation unstable - Adaptive time step forced to 1e-18s. See you in 10 years.", color: "text-orange-400" },
  { text: "CAD_NOTICE: Parasolid kernel exception in 'Loft_Transition_04'. Goodbye, productive afternoon.", color: "text-red-300" },
  { text: "THERMAL: Heat flux exceeding safety threshold. The part is now self-welding.", color: "text-orange-500" },
  { text: "G-CODE: Block N1045 - Tool diameter compensation error. End mill is now a projectile.", color: "text-yellow-600" },
  { text: "SW_INFO: Mate 'Concentric_12' is broken. Fixed by deleting 'Concentric_1' through 'Concentric_11'.", color: "text-blue-300" },
  { text: "CRITICAL: 'Final_Final_ActuallyFinal_USE_THIS_ONE.sldasm' is currently open on 'Steve-PC'.", color: "text-red-600" },
  { text: "NOTICE: Manufacturing tolerance met! (+/- 2 inches. It's a bridge, right?)", color: "text-green-400" },
  { text: "FEA_WARN: Disconnected nodes detected. Part of the assembly has attained enlightenment and left.", color: "text-yellow-500" },
  { text: "SW_ERR: Assembly has 4,500 interferences. At this point, it's basically a solid billet.", color: "text-red-400" },
  { text: "NOTICE: Design changed 5 minutes before the purchase order was signed. Screaming into a pillow.", color: "text-pink-500" },
  { text: "SIM_INFO: Drag coefficient = 0.02. Simulation assumes a perfect vacuum and zero gravity.", color: "text-cyan-300" },
  { text: "WARN: High-precision digital calipers used to open a bag of pretzels. Calibration lost.", color: "text-orange-400" },
  { text: "CAD_INFO: Spline is no longer C2 continuous. It's just having a bad day.", color: "text-purple-300" },
  { text: "SW_ERR: Cannot fillet. The geometry hates you personally and doesn't want to cooperate.", color: "text-red-500" },
  { text: "NOTICE: Bill of Materials contains 400 unique fasteners. Assembly team is forming a union.", color: "text-yellow-400" },
  { text: "PDM: Checkout failed. User 'Vacation-Dave' checked out the file 3 months ago.", color: "text-red-500" },
  { text: "SW_INFO: Draft angle missing. Part is now permanently a part of the injection mold.", color: "text-blue-400" },
  { text: "WARN: 3D Print failed at 99%. Spaghetti detected. Delicious, plastic spaghetti.", color: "text-yellow-600" },
  { text: "NOTICE: Prototype is 'Functional'. (Defined as: It didn't explode during the first 5 seconds)", color: "text-green-500" },
  { text: "SIM_ERR: Computational domain consists mostly of regrets.", color: "text-red-400" },
  { text: "SW_NOTICE: Drawing view is out of date. Rebuild time: 47 minutes.", color: "text-cyan-400" },
  { text: "INFO: Metric/Imperial conversion error. We are now building a satellite for a much smaller planet.", color: "text-red-300" },
  { text: "CALIBRATING: Eyeball measurement indicates 'close enough' for this prototype.", color: "text-blue-500" },
  { text: "SW_CRITICAL: Part is fully constrained but still moves. The laws of physics are being ignored.", color: "text-orange-600" },
  { text: "VS_CRITICAL: NuGet packages are currently fighting. Project build aborted.", color: "text-red-500" },
  { text: "SW_ERR: 'Face<1>' was deleted. 47 mates are now orphaned and seeking legal counsel.", color: "text-red-500" },
  { text: "NOTICE: Prototype is 'Space-Grade'. (Translation: It's mostly empty space and expensive.)", color: "text-blue-300" },
  { text: "VS_WARN: 10,244 warnings found. Building anyway. Fortune favors the bold.", color: "text-yellow-400" },
  { text: "SW_CRITICAL: Feature 'Loft_1' has become sentient and refuses to be suppressed.", color: "text-red-600" },
  { text: "INFO: Logic error in Python script. Variable 'i' replaced by 'j' in line 402. Good luck.", color: "text-blue-400" },
  { text: "SW_ERR: Drafting standards ignored. Drawing now resembles a Jackson Pollock painting.", color: "text-red-400" },
  { text: "WARN: Tolerance stack-up indicates part will either fit perfectly or require a plasma cutter.", color: "text-orange-500" },
  { text: "VS_ERR: Missing semicolon at line 12. Spend the next 4 hours looking for it.", color: "text-red-500" },
  { text: "SW_NOTICE: Assembly contains 40,000 components. Laptop battery has begun to swell.", color: "text-cyan-400" },
  { text: "FEA_WARN: Large displacement detected. Your part is now a liquid.", color: "text-yellow-500" },
  { text: "SW_ERR: Licensing server is on a lunch break. Access denied.", color: "text-red-500" },
  { text: "NOTICE: 'Final_V2' superseded by 'Final_V2_USE_THIS_ONE_NO_REALLY'.", color: "text-green-400" },
  { text: "VS_CRITICAL: Intellisense has given up. You are on your own now.", color: "text-orange-600" },
  { text: "SW_WARN: Zero-thickness geometry. Physics has left the building.", color: "text-yellow-400" },
  { text: "DEBUG: Part is vibrating at 400Hz. Is it a pump or a musical instrument?", color: "text-purple-400" },
  { text: "INFO: Rebuilding... Rebuilding... SolidWorks is thinking about its life choices.", color: "text-blue-300" },
  { text: "SW_ERR: Failed to save. Disk is full of 'Temporary' files from 2019.", color: "text-red-500" },
  { text: "VS_INFO: Build successful! (Wait, why is there a puff of smoke from the tower?)", color: "text-green-400" },
  { text: "NOTICE: Material set to 'Unobtanium'. Procurement lead time: Forever.", color: "text-pink-400" },
  { text: "SW_ERR: Sketch is under-defined. It's free-spirited and doesn't like rules.", color: "text-red-400" },
  { text: "WARN: 3D Print nozzle is clogged with high hopes and PLA.", color: "text-yellow-600" },
  { text: "VS_ERR: Merge conflict. 400 lines of code merged into a single black hole.", color: "text-red-500" },
  { text: "INFO: Simulation converged! (By ignoring 90% of the boundary conditions).", color: "text-blue-400" },
  { text: "SW_CRITICAL: Feature Tree is longer than the assembly. Scroll bar has disappeared.", color: "text-orange-600" },
  { text: "NOTICE: GD&T says 'Profile of a surface'. Machinist says 'Nah'.", color: "text-yellow-500" },
  { text: "SW_ERR: Mate 'Coincident_1' is conflicted with Mate 'Reality_1'.", color: "text-red-500" },
  { text: "VS_WARN: Variable 'Success' is defined but never used.", color: "text-yellow-400" },
  { text: "INFO: Prototype testing scheduled for Friday at 4:59 PM. Cancellation imminent.", color: "text-blue-300" },
  { text: "SW_ERR: Failed to generate mesh. Part is too 'complex' (read: broken).", color: "text-red-500" },
  { text: "NOTICE: Unit system mismatch. Using 'Hands' and 'Stone' instead of SI.", color: "text-orange-400" },
  { text: "VS_ERR: Unexpected token 'Error'. Well, at least it's honest.", color: "text-red-500" },
  { text: "SW_INFO: Exploded view created. Part is now in 1,000 pieces (literally).", color: "text-cyan-300" },
  { text: "WARN: Power supply fan is sounding like a jet engine. Deploying earplugs.", color: "text-yellow-600" },
  { text: "VS_CRITICAL: Out of memory. Visual Studio is now an expensive screensaver.", color: "text-red-600" },
  { text: "SW_ERR: Mate controller has lost control. Chaos ensues.", color: "text-red-400" },
  { text: "NOTICE: 'Draft_Drawing_V1' sent to vendor. Vendor replied with 'Lol'.", color: "text-pink-400" },
  { text: "VS_INFO: Indexing... Indexing... Your hard drive is having a workout.", color: "text-blue-300" },
  { text: "SW_WARN: Component is suppressed but still judging your design choices.", color: "text-yellow-400" },
  { text: "ERR: 3.5mm jack detected as a structural member. Recalculating...", color: "text-red-500" },
  { text: "VS_ERR: Stack Overflow encountered. (The website or the error? Yes.)", color: "text-orange-500" },
  { text: "SW_NOTICE: Curvature continuous? More like curvature 'optimistic'.", color: "text-cyan-400" },
  { text: "WARN: Bolt torque spec reached. (Wait, the bolt just got longer. Oh no.)", color: "text-red-600" },
  { text: "INFO: Simulation complete. Accuracy: 50% math, 50% vibes.", color: "text-blue-400" },
  { text: "SW_ERR: Circular reference detected. You are your own father.", color: "text-red-500" },
  { text: "VS_INFO: Hello World printed 1,000,000 times. System stable.", color: "text-green-500" },
  { text: "NOTICE: Tolerances so tight they've formed a singularity.", color: "text-yellow-400" },
  { text: "SW_CRITICAL: SolidWorks is not responding. It is however, staring at you intensely.", color: "text-red-600" }
];
