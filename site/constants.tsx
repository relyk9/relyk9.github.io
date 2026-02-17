
import { Project, ExperienceEntry } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'placeholder-project-1',
    title: '[YOUR_PROJECT_TITLE_1]',
    category: 'Professional',
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
    id: 'placeholder-project-4',
    title: '[YOUR_ACADEMIC_PROJECT]',
    category: 'Academic',
    role: 'University Researcher',
    date: '2021',
    description: 'Academic or capstone projects are great for early-career engineers. Highlight your senior design project or research assistantship. Focus on theoretical application and results.',
    technicalSpecs: [
      'Research Topic',
      'Lab Equipment Used',
      'Academic Result/Grade',
      'Publication: Yes/No'
    ],
    imageUrl: 'https://picsum.photos/800/600?random=4'
  }
];

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: '[Your Current Company]',
    role: 'Mechanical Engineer II',
    period: 'Jan 2023 - Present',
    description: [
      'Develop and optimize mechanical systems for [Industry Name].',
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

export const SKILLS = [
  'SolidWorks', 'AutoCAD', 'Fusion 360', 'Ansys Fluent', 'FEA/CFD', 'GD&T', 'MATLAB', 'CNC Programming', '3D Printing (SLA/FDM)', 'DFM/DFA', 'Python', 'Mechatronics'
];
