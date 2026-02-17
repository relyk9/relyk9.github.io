
export interface Project {
  id: string;
  title: string;
  category: 'Professional' | 'Personal' | 'Academic';
  description: string;
  technicalSpecs: string[];
  imageUrl: string;
  date: string;
  role: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success';
}
