export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photoUrl: string;
  stage: 'new' | 'shortlisted' | 'interviewed' | 'offered' | 'hired' | 'rejected';
  source: 'linkedin' | 'portal' | 'referral' | 'direct';
  aiScore: number;
  dateAdded: string;
  lastActivity: string;
  jobTitle?: string;
  company?: string;
  education?: Education[];
  experience?: WorkExperience[];
  location?: string;
  workMode?: 'remote' | 'onsite' | 'hybrid';
  languages?: string[];
  skills?: {
    technical?: string[];
    soft?: string[];
    languages?: LanguageSkill[];
  };
  certifications?: Certification[];
  documents?: Document[];
  links?: Link[];
  nationality: string;
  jobRequisitionId: string;
  referrer?: string;
  tags?: string[]; // Add tags field
  notes?: string[]; // Add notes field
}

export interface InterviewQuestion {
  question: string;
  score: number; // 1-5
  notes: string;
}

export interface InterviewFeedback {
  id: string;
  candidateId: string;
  interviewerId: string;
  interviewerName: string;
  date: string;
  questions: InterviewQuestion[];
  overallFeedback: string;
  recommendationScore: number; // 1-5
}

export interface ActivityItem {
  id: string;
  candidateId: string;
  type: 'status_change' | 'note' | 'interview' | 'email' | 'cv_upload' | 'system';
  date: string;
  content: string;
  user?: string;
  metadata?: Record<string, any>;
}

export type CandidateView = 'kanban' | 'list';

export interface FilterOptions {
  source: string[];
  minAiScore: number;
  maxAiScore: number;
  nationality: string[];
  stage: string[];
  search: string;
  jobRequisition: string[]; // Added job requisition filter
}

export interface Education {
  id: string;
  degree: string;
  major: string;
  institution: string;
  graduationYear: string;
  gpa?: number;
  location?: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  achievements?: string[];
}

export interface LanguageSkill {
  language: string;
  proficiency: 'basic' | 'intermediate' | 'fluent' | 'native';
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  logo?: string;
}

export interface Document {
  id: string;
  type: 'resume' | 'coverletter' | 'certificate' | 'reference' | 'other';
  name: string;
  url: string;
  uploadDate: string;
}

export interface Link {
  id: string;
  type: 'linkedin' | 'github' | 'portfolio' | 'other';
  url: string;
  name?: string;
}