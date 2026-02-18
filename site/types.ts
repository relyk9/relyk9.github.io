
export interface Project {
  id: string;
  title: string;
  category: 'Professional' | 'Personal' | 'Academic';
  status: 'Completed' | 'In Progress' | 'Concept';
  description: string;
  technicalSpecs: string[];
  imageUrl: string;
  images?: string[];
  date: string;
  role: string;
  detailsUrl?: string;
  metrics?: {
    constraints: string[];
    tools: string[];
  };
  actionButton?: {
    label: string;
    url: string;
  };
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface ExperienceData {
  header: string;
  subHeader: string;
  description: string;
  downloadLabel: string;
}

export interface TypingChallengeData {
  header: string;
  subHeaderPrefix: string;
  guidelinesTitle: string;
  scoreAlgorithmLabel: string;
  scoreFormula: string;
  benchmarkNote: string;
}

export interface ScoreEntry {
  initials: string;
  wpm: number;
  accuracy: number;
  score: number;
  timestamp: number;
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}

export interface StatEntry {
  label: string;
  value: string;
  icon: string;
  color: string;
  border: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  location: string;
  period: string;
  focus: string;
}

export interface ProficiencyEntry {
  label: string;
  level: 1 | 2 | 3;
  category: 'Software' | 'Engineering' | 'Languages' | 'Professional';
  color: string;
  glow: string;
}

export interface LogEntryPool {
  text: string;
  color: string;
}
