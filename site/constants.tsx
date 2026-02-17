
import { Project, ExperienceEntry, StatEntry, EducationEntry, ProficiencyEntry, LogEntryPool, ExperienceData, TypingChallengeData, ScoreEntry } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'personal-project-1',
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
  },
  {
    id: 'placeholder-project-1',
    title: '[YOUR_PROJECT_TITLE_1]',
    category: 'Professional',
    status: 'Completed',
    role: 'Lead Mechanical Engineer',
    date: '2023 - 2024',
    description: 'This is a placeholder for your first professional project. Replace this text in constants.tsx with a summary of your work, the problem you solved, and the impact it had. Aim for 2-3 sentences that highlight your specific contributions.',
    technicalSpecs: [
      'Key Metric 1 (e.g., Payload: 5kg)',
      'Key Metric 2 (e.g., Material: Al 6061-T6)',
      'Key Metric 3 (e.g., Software used)',
      'Key Metric 4 (e.g., Tolerance levels)',
      'Key Metric 5 (e.g., Factor of Safety)'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=1'
  },
  {
    id: 'placeholder-project-2',
    title: '[YOUR_PROJECT_TITLE_2]',
    category: 'Professional',
    status: 'In Progress',
    role: 'Design/Simulation Engineer',
    date: '2022 - 2023',
    description: 'Use this section for another professional deployment. Discuss technical challenges like thermal management, structural analysis, or manufacturing optimization. Clearly state how you validated your designs.',
    technicalSpecs: [
      'Technical Detail A',
      'Technical Detail B',
      'Software: SolidWorks/Ansys/Fusion',
      'Standard: ASME/ISO/ASTM'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=2'
  },
  {
    id: 'placeholder-project-3',
    title: '[YOUR_PERSONAL_PROJECT]',
    category: 'Personal',
    status: 'Completed',
    role: 'Self-Directed Maker',
    date: '2024',
    description: 'Personal projects show passion and continuous learning. Mention hobbyist robotics, 3D printing builds, automotive restoration, or home automation systems. Focus on the tools and skills you taught yourself.',
    technicalSpecs: [
      'Hardware: Raspberry Pi/Arduino',
      'Fabrication: FDM 3D Printing',
      'CAD: Fusion 360',
      'Status: Fully Functional'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=3'
  },
  {
    id: 'placeholder-project-5',
    title: '[YOUR_ACADEMIC_PROJECT]',
    category: 'Academic',
    status: 'Concept',
    role: 'University Researcher',
    date: '2021',
    description: 'Academic or capstone projects are great for early-career engineers. Highlight your senior design project or research assistantship. Focus on theoretical application and results.',
    technicalSpecs: [
      'Research Topic',
      'Lab Equipment Used',
      'Academic Result/Grade',
      'Publication: Yes/No'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=5'
  }
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: '[MilliporeSigma]',
    role: 'Manufacturing Engineer',
    period: 'Apr 2024 - Present',
    description: [
      'Develop and optimize liquid handling methods for biotech customers.',
      'Lead design reviews and coordinate with manufacturing for DFM.',
      'Perform FEA/CFD simulations to ensure product reliability.',
      'Manage [X] number of projects simultaneously with [Y]% budget efficiency.'
    ]
  },
  {
    company: '[Previous Company]',
    role: 'Junior Mechanical Engineer',
    period: 'June 2021 - Dec 2022',
    description: [
      'Created detailed 2D drawings and 3D models using SolidWorks.',
      'Conducted physical testing and data analysis for prototype validation.',
      'Collaborated with senior engineers on complex assembly design.',
      'Assisted in the documentation of assembly procedures.'
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceData = {
  header: "OPERATIONAL_HISTORY",
  subHeader: "WORK EXPERIENCE",
  description: "Timeline of professional deployments, career roles, and key engineering achievements.",
  downloadLabel: "DOWNLOAD_FULL_RESUME.pdf"
};

export const HOME_DATA = {
  userId: "ME_SENIOR_V3",
  heroTitle: ["ENGINEERING", "THE FUTURE."],
  typedText: "> LOADING SYSTEMS... \n> AUTHENTICATING USER... \n> ACCESS GRANTED. \n> WELCOME TO THE PORTFOLIO. \n> STATUS: READY_FOR_INSPECTION.",
  stats: [
    { label: "PROJECTS_COMPLETED", value: "1+", icon: "◈", color: "text-cyan-400", border: "border-cyan-500/40" },
    { label: "EXPERIENCE_METRIC", value: "3.0 YRS", icon: "⌬", color: "text-yellow-400", border: "border-yellow-500/40" },
    { label: "SYSTEM_UPTIME", value: "99.9%", icon: "⚙", color: "text-pink-400", border: "border-pink-500/40" },
  ] as StatEntry[],
  logSectionTitle: "[LIVE_CORE_DIAGNOSTICS / SYSTEM_LOGS]",
  avatarUrl: "https://picsum.photos/400/400?random=10"
};

export const ABOUT_DATA = {
  profileTitle: "ENGINEER_PROFILE",
  profileHeader: "BIO",
  paragraphs: [
    "I am a Mechanical Engineer with <highlight1>2 years</highlight1> of professional experience, specializing in bridging the gap between digital design and physical reality. My approach integrates rigorous analytical methods with innovative manufacturing techniques.",
    "Whether it's optimizing a complex thermal management system or prototyping high-precision robotic components, I thrive on challenges that require both <highlight2>creative problem-solving</highlight2> and <highlight3>technical precision</highlight3>."
  ],
  missionTitle: "MISSION_OBJECTIVE",
  missionHeader: "CORE GOAL",
  missionStatement: "To develop sustainable, high-efficiency mechanical solutions that push the boundaries of modern industrial automation and energy management.",
  educationTitle: "EDUCATION_ARCHIVE",
  educationHeader: "DEGREES",
  education: [
    {
      degree: "B.S.c in Mechanical Engineering",
      institution: "Texas A&M University, College Station TX.",
      period: "2018 - 2023",
      focus: "Focus: Fluid Dynamics & IC Engines"
    }
  ] as EducationEntry[],
  proficiencyTitle: "SYSTEM_LEVELS",
  proficiencyHeader: "PROFICIENCY",
  proficiency: [
    { label: "CAD_MODELING", level: 95, color: "bg-cyan-500", glow: "shadow-[0_0_10px_rgba(6,182,212,0.8)]" },
    { label: "FEA_SIMULATION", level: 88, color: "bg-pink-500", glow: "shadow-[0_0_10px_rgba(236,72,153,0.8)]" },
    { label: "DFM_DFA", level: 92, color: "bg-yellow-500", glow: "shadow-[0_0_10px_rgba(234,179,8,0.8)]" },
    { label: "PROTOTYPING", level: 85, color: "bg-[#00FF41]", glow: "shadow-[0_0_10px_rgba(0,255,65,0.8)]" },
    { label: "MATHEMATICAL_MODELING", level: 80, color: "bg-blue-500", glow: "shadow-[0_0_10px_rgba(59,130,246,0.8)]" },
    { label: "CONTROL_SYSTEMS", level: 75, color: "bg-red-500", glow: "shadow-[0_0_10px_rgba(239,68,68,0.8)]" },
  ] as ProficiencyEntry[]
};

export const TYPING_CHALLENGE_DATA: TypingChallengeData = {
  header: "TYPING_TEST",
  subHeaderPrefix: "SCTR_",
  guidelinesTitle: "Operational_Guidelines",
  scoreAlgorithmLabel: "SCORE_ALGORITHM_V2.0",
  scoreFormula: "SCORE = WPM * (ACCURACY / 100) * 10",
  benchmarkNote: "Benchmark protocols synchronized. Sequence integrity monitoring enabled. Text wrapping support for high-throughput operational streams."
};

/**
 * DEFAULT_HIGH_SCORES: The primary persistent storage for the leaderboard.
 * To update the website's global high scores, edit this list.
 */
export const DEFAULT_HIGH_SCORES: ScoreEntry[] = [
  { initials: "KM", wpm: 92, accuracy: 98, score: 901, timestamp: 1700000000000 },
  { initials: "JD", wpm: 85, accuracy: 95, score: 807, timestamp: 1699000000000 },
  { initials: "AE", wpm: 78, accuracy: 100, score: 780, timestamp: 1698000000000 },
  { initials: "NS", wpm: 72, accuracy: 94, score: 676, timestamp: 1697000000000 },
  { initials: "ME", wpm: 65, accuracy: 99, score: 643, timestamp: 1696000000000 },
  { initials: "FE", wpm: 60, accuracy: 90, score: 540, timestamp: 1695000000000 },
];

export const LOG_POOL: LogEntryPool[] = [
  { text: "SW_ERR: Failed to rebuild component 'Bracket_Assy' - Check mating constraints.", color: "text-red-500" },
  { text: "SW_WARN: Zero-thickness geometry detected in Housing_V2.", color: "text-yellow-400" },
  { text: "SW_CRITICAL: Memory leak detected in PDM_Vault_Client.", color: "text-orange-600" },
  { text: "SW_ERR: Sketch 4 in 'Main_Support' is over-defined or unsolvable.", color: "text-red-400" },
  { text: "SW_INFO: Auto-saving document 'Turbine_Core_Assy_Backup_v42'.", color: "text-blue-300" },
  { text: "PDM: Database connection established. Vault: MECH_PROD_RESERVE.", color: "text-cyan-400" },
  { text: "FETCHING: SolidWorks_Cloud_Assembly... OK", color: "text-cyan-400" },
  { text: "CALCULATING: Thermal_Dissipation_Rate... 42W/m²K", color: "text-yellow-400" },
  { text: "OPTIMIZING: Topology_Mesh_Density... 2.4M elements", color: "text-pink-400" },
  { text: "VALIDATING: GD&T_Tolerance_Stackup... PASS", color: "text-green-400" },
  { text: "RUNNING: CFD_Analysis_Sim_094... 14% complete", color: "text-blue-400" },
  { text: "SIM: Gravity load applied: 9.81 m/s² [NEGATIVE_Z_AXIS].", color: "text-yellow-300" },
  { text: "SCANNING: Component_Stress_Profiles... 180 MPa detected", color: "text-red-400" },
  { text: "VERIFYING: Factor_of_Safety_Thresholds... OK (> 2.0)", color: "text-emerald-400" },
  { text: "FEA_ERROR: Rebuild Error: Sketch does not form a closed contour.", color: "text-red-500" },
  { text: "SYNCHRONIZING: Servo_Feedback_Loop... [0.001ms jitter]", color: "text-purple-400" },
  { text: "MAPPING: Fluid_Dynamic_Turbulence... Re = 4500", color: "text-cyan-500" },
  { text: "DFM_SCAN: Wall thickness < 1.2mm in Housing_Shell_Cast.", color: "text-yellow-500" },
  { text: "UPLOADING: CNC_Toolpath_G-Code... N-BLOCK transfer active.", color: "text-indigo-400" },
  { text: "CALIBRATING: Strain_Gauge_Amplifier_01... Zeroing complete", color: "text-blue-300" },
  { text: "SIMULATING: Fatigue_Life_Cycle_02... 10M cycles predicted", color: "text-pink-500" },
  { text: "MONITORING: Hydraulic_Pressure_Sensors... 3000 PSI stable", color: "text-green-500" },
  { text: "NOTICE: FEA Mesh Convergence achieved at Step 8.", color: "text-cyan-300" },
  { text: "SW_ERR: Interference detected between 'Shaft_Main' and 'Bearing_Race'.", color: "text-red-400" },
  { text: "WARNING: Simulation unstable - Adaptive time step forced.", color: "text-orange-400" },
  { text: "CAD_NOTICE: Parasolid kernel exception in 'Loft_Transition_04'.", color: "text-red-300" },
  { text: "THERMAL: Heat flux exceeding safety threshold in Zone B4.", color: "text-orange-500" },
  { text: "G-CODE: Block N1045 - Tool diameter compensation error.", color: "text-yellow-600" }
];

export const SKILLS = [
  'SolidWorks', 'AutoCAD', 'Fusion 360', 'FEA/CFD', 'GD&T', 'MATLAB', 'CNC Programming', '3D Printing (SLA/FDM)', 'DFM/DFA', 'Python', 'C#', 'KiCad'
];
