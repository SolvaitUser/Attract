import React, { createContext, useContext, useState } from "react";
import ScheduleInterviewWizard from "../components/interview/ScheduleInterviewWizard";
import InterviewDetailsModal from "../components/interview/InterviewDetailsModal";
import InterviewFeedbackModal from "../components/interview/InterviewFeedbackModal";

// Define interview types
export interface Interviewer {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  email: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  resume: string;
  email: string;
  phone: string;
  aiMatchScore?: number;
}

export interface InterviewScorecard {
  id: string;
  name: string;
  description?: string;
  criteria: {
    id: string;
    name: string;
    description?: string;
    scale: number;
    required: boolean;
  }[];
  weight?: number;
}

export interface Interview {
  id: string;
  candidate: {
    id: string;
    name: string;
    avatar?: string;
    position: string;
    email: string;
    phone: string;
    aiMatchScore?: number;
  };
  jobTitle: string;
  department: string;
  type: string;
  date: string;
  duration: number;
  platform: string;
  interviewers: {
    id: string;
    name: string;
    avatar?: string;
    position: string;
    email: string;
  }[];
  status: "upcoming" | "completed" | "canceled" | "rescheduled" | "in-progress"; // Added "in-progress" status
  notes?: string;
  feedback?: {
    id: string;
    interviewerId: string;
    overallScore: number;
    recommendation: "pass" | "hold" | "reject";
    strengths: string[];
    weaknesses: string[];
    notes?: string;
    questions?: {
      id: string;
      question: string;
      score: number;
      comment?: string;
    }[];
  };
  scorecard?: InterviewScorecard[];
  jobRequisitionId: string;
  jobRequisitionTitle: string;
}

export interface InterviewFeedback {
  id: string;
  interviewId: string;
  interviewerId: string;
  overallScore: number;
  recommendation: "pass" | "hold" | "reject";
  strengths: string[];
  weaknesses: string[];
  notes: string;
  questions: {
    id: string;
    question: string;
    score: number;
    comment?: string;
  }[];
}

interface InterviewContextType {
  interviews: Interview[];
  isScheduleWizardOpen: boolean;
  selectedInterviewId: string | null;
  isInterviewDetailsOpen: boolean;
  isFeedbackFormOpen: boolean;
  openScheduleWizard: () => void;
  closeScheduleWizard: () => void;
  openInterviewDetails: (id: string) => void;
  closeInterviewDetails: () => void;
  openFeedbackForm: (id: string) => void;
  closeFeedbackForm: () => void;
  addInterview: (interview: Interview) => void;
  updateInterview: (id: string, updates: Partial<Interview>) => void;
  submitFeedback: (feedback: InterviewFeedback) => void;
  updateInterviewStatus: (id: string, status: Interview['status']) => void;
}

// Create context
const InterviewContext = createContext<InterviewContextType>({
  interviews: [],
  isScheduleWizardOpen: false,
  selectedInterviewId: null,
  isInterviewDetailsOpen: false,
  isFeedbackFormOpen: false,
  openScheduleWizard: () => {},
  closeScheduleWizard: () => {},
  openInterviewDetails: () => {},
  closeInterviewDetails: () => {},
  openFeedbackForm: () => {},
  closeFeedbackForm: () => {},
  addInterview: () => {},
  updateInterview: () => {},
  submitFeedback: () => {},
  updateInterviewStatus: () => {},
});

// Sample data
const sampleInterviews: Interview[] = [
  {
    id: "1",
    candidate: {
      id: "c1",
      name: "Emily Johnson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
      position: "Senior Frontend Developer",
      resume: "resume-emily-johnson.pdf",
      email: "emily.j@example.com",
      phone: "+1 555-123-4567",
      aiMatchScore: 92,
    },
    jobTitle: "Senior Frontend Developer",
    department: "Engineering",
    type: "Technical Interview",
    date: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    duration: 60,
    platform: "Zoom",
    interviewers: [
      {
        id: "i1",
        name: "Alex Rodriguez",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
        position: "Engineering Manager",
        email: "alex.r@example.com",
      },
      {
        id: "i2",
        name: "Sarah Chen",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3",
        position: "Lead Developer",
        email: "sarah.c@example.com",
      },
    ],
    status: "upcoming",
    notes: "Focus on React and TypeScript experience.",
    jobRequisitionId: "req1",
    jobRequisitionTitle: "Senior Frontend Developer - Engineering",
  },
  {
    id: "2",
    candidate: {
      id: "c2",
      name: "Michael Brown",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
      position: "Product Manager",
      resume: "resume-michael-brown.pdf",
      email: "michael.b@example.com",
      phone: "+1 555-987-6543",
      aiMatchScore: 88,
    },
    jobTitle: "Senior Product Manager",
    department: "Product",
    type: "Behavioral Interview",
    date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    duration: 45,
    platform: "Microsoft Teams",
    interviewers: [
      {
        id: "i3",
        name: "Jessica Kim",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
        position: "Head of Product",
        email: "jessica.k@example.com",
      },
    ],
    status: "upcoming",
    notes: "Assess leadership qualities and product vision.",
    jobRequisitionId: "req2",
    jobRequisitionTitle: "Senior Product Manager - Product",
  },
  {
    id: "3",
    candidate: {
      id: "c3",
      name: "David Wilson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6",
      position: "DevOps Engineer",
      resume: "resume-david-wilson.pdf",
      email: "david.w@example.com",
      phone: "+1 555-456-7890",
      aiMatchScore: 95,
    },
    jobTitle: "Senior DevOps Engineer",
    department: "Infrastructure",
    type: "Technical Interview",
    date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    duration: 60,
    platform: "Google Meet",
    interviewers: [
      {
        id: "i4",
        name: "Robert Taylor",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=7",
        position: "DevOps Lead",
        email: "robert.t@example.com",
      },
      {
        id: "i5",
        name: "Amanda Garcia",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=8",
        position: "Infrastructure Manager",
        email: "amanda.g@example.com",
      },
    ],
    status: "completed",
    notes: "Focus on CI/CD experience and Kubernetes knowledge.",
    jobRequisitionId: "req3",
    jobRequisitionTitle: "Senior DevOps Engineer - Infrastructure",
  },
  {
    id: "4",
    candidate: {
      id: "c4",
      name: "Sophia Martinez",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=9",
      position: "UX Designer",
      resume: "resume-sophia-martinez.pdf",
      email: "sophia.m@example.com",
      phone: "+1 555-234-5678",
      aiMatchScore: 87,
    },
    jobTitle: "Senior UX Designer",
    department: "Design",
    type: "Portfolio Review",
    date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    duration: 60,
    platform: "Zoom",
    interviewers: [
      {
        id: "i6",
        name: "Daniel Park",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10",
        position: "Design Director",
        email: "daniel.p@example.com",
      },
    ],
    status: "completed",
    notes: "Discuss portfolio projects and design process.",
    feedback: {
      id: "f1",
      interviewId: "4",
      interviewerId: "i6",
      overallScore: 4.5,
      recommendation: "pass",
      strengths: ["Strong visual design skills", "User-focused approach", "Clear communication"],
      weaknesses: ["Limited experience with design systems"],
      notes: "Sophia demonstrated excellent design thinking and solid portfolio. Highly recommend.",
      questions: [
        {
          id: "q1",
          question: "Describe your design process from research to implementation.",
          score: 5,
          comment: "Thorough methodology with emphasis on user testing.",
        },
        {
          id: "q2",
          question: "How do you handle stakeholder feedback that conflicts with user needs?",
          score: 4,
          comment: "Good approach to balancing business and user requirements.",
        },
      ],
    },
    jobRequisitionId: "req4",
    jobRequisitionTitle: "Senior UX Designer - Design",
  },
  {
    id: "5",
    candidate: {
      id: "c5",
      name: "James Thompson",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=11",
      position: "Marketing Specialist",
      resume: "resume-james-thompson.pdf",
      email: "james.t@example.com",
      phone: "+1 555-345-6789",
      aiMatchScore: 78,
    },
    jobTitle: "Marketing Manager",
    department: "Marketing",
    type: "Final Interview",
    date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    duration: 45,
    platform: "Microsoft Teams",
    interviewers: [
      {
        id: "i7",
        name: "Elizabeth Carter",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=12",
        position: "Head of Marketing",
        email: "elizabeth.c@example.com",
      },
      {
        id: "i8",
        name: "Kevin Wong",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=13",
        position: "CMO",
        email: "kevin.w@example.com",
      },
    ],
    status: "canceled",
    notes: "Candidate withdrew application.",
    jobRequisitionId: "req5",
    jobRequisitionTitle: "Marketing Manager - Marketing",
  },
  {
    id: "6",
    candidate: {
      id: "c6",
      name: "Lisa Wang",
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=16",
      position: "Backend Developer",
      resume: "resume-lisa-wang.pdf",
      email: "lisa.w@example.com",
      phone: "+1 555-432-1098",
      aiMatchScore: 91,
    },
    jobTitle: "Senior Backend Developer",
    department: "Engineering",
    type: "Technical Interview",
    date: new Date().toISOString(), // Right now
    duration: 60,
    platform: "Zoom",
    interviewers: [
      {
        id: "i9",
        name: "Thomas Miller",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=17",
        position: "Backend Lead",
        email: "thomas.m@example.com",
      },
    ],
    status: "in-progress",
    notes: "Focus on system design and API architecture.",
    jobRequisitionId: "req6",
    jobRequisitionTitle: "Senior Backend Developer - Engineering",
  },
];

// Default scorecard for interviews
const defaultScorecard = [
  {
    id: "technical",
    name: "Technical Skills",
    description: "Evaluate the candidate's technical knowledge and skills",
    criteria: [
      {
        id: "tech-1",
        name: "Technical Knowledge",
        scale: 5,
        required: true
      },
      {
        id: "tech-2",
        name: "Problem-Solving",
        scale: 5,
        required: true
      }
    ],
    weight: 40
  },
  {
    id: "communication",
    name: "Communication",
    description: "Assess the candidate's verbal and written communication skills",
    criteria: [
      {
        id: "comm-1",
        name: "Clarity of Expression",
        scale: 5,
        required: true
      }
    ],
    weight: 30
  },
  {
    id: "culture",
    name: "Cultural Fit",
    description: "Evaluate how well the candidate aligns with company values",
    criteria: [
      {
        id: "culture-1",
        name: "Values Alignment",
        scale: 5,
        required: true
      }
    ],
    weight: 30
  }
];

// Create provider
export const InterviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [interviews, setInterviews] = useState<Interview[]>(sampleInterviews);
  const [isScheduleWizardOpen, setIsScheduleWizardOpen] = useState(false);
  const [isInterviewDetailsOpen, setIsInterviewDetailsOpen] = useState(false);
  const [isFeedbackFormOpen, setIsFeedbackFormOpen] = useState(false);
  const [selectedInterviewId, setSelectedInterviewId] = useState<string | null>(null);

  const openScheduleWizard = () => {
    setIsScheduleWizardOpen(true);
  };

  const closeScheduleWizard = () => {
    setIsScheduleWizardOpen(false);
  };

  const openInterviewDetails = (id: string) => {
    setSelectedInterviewId(id);
    setIsInterviewDetailsOpen(true);
  };

  const closeInterviewDetails = () => {
    setIsInterviewDetailsOpen(false);
    setSelectedInterviewId(null);
  };

  const openFeedbackForm = (id: string) => {
    setSelectedInterviewId(id);
    setIsFeedbackFormOpen(true);
  };

  const closeFeedbackForm = () => {
    setIsFeedbackFormOpen(false);
    setSelectedInterviewId(null);
  };

  const addInterview = (interview: Interview) => {
    setInterviews(prev => [...prev, interview]);
  };

  const updateInterview = (id: string, updates: Partial<Interview>) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === id ? { ...interview, ...updates } : interview
      )
    );
  };

  const submitFeedback = (feedback: InterviewFeedback) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === feedback.interviewId 
          ? { ...interview, feedback, status: "completed" } 
          : interview
      )
    );
  };

  const createInterview = (interviewData: Partial<Interview>) => {
    const newInterview: Interview = {
      id: (interviews.length + 1).toString(),
      candidate: {
        id: (interviews.length + 1).toString(),
        name: "New Candidate",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=14",
        position: "New Position",
        resume: "resume-new-candidate.pdf",
        email: "new.candidate@example.com",
        phone: "+1 555-555-5555",
        aiMatchScore: 90,
      },
      jobTitle: "New Job Title",
      department: "New Department",
      type: "New Interview Type",
      date: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      duration: 60,
      platform: "New Platform",
      interviewers: [
        {
          id: "i1",
          name: "New Interviewer",
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=15",
          position: "New Position",
          email: "new.interviewer@example.com",
        },
      ],
      status: "upcoming",
      notes: "New notes",
      jobRequisitionId: "req6",
      jobRequisitionTitle: "New Job Requisition",
      scorecard: interviewData.scorecard || defaultScorecard,
    };
    
    setInterviews(prev => [...prev, newInterview]);
  };

  const updateInterviewStatus = (id: string, status: Interview['status']) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === id ? { ...interview, status } : interview
      )
    );
  };

  const value = {
    interviews,
    isScheduleWizardOpen,
    selectedInterviewId,
    isInterviewDetailsOpen,
    isFeedbackFormOpen,
    openScheduleWizard,
    closeScheduleWizard,
    openInterviewDetails,
    closeInterviewDetails,
    openFeedbackForm,
    closeFeedbackForm,
    addInterview,
    updateInterview,
    submitFeedback,
    createInterview,
    updateInterviewStatus,
  };

  return (
    <InterviewContext.Provider value={value}>
      {children}
      {/* Modals */}
      <ScheduleInterviewWizard 
        isOpen={isScheduleWizardOpen} 
        onClose={closeScheduleWizard} 
      />
      <InterviewDetailsModal 
        isOpen={isInterviewDetailsOpen}
        onClose={closeInterviewDetails}
        interviewId={selectedInterviewId}
      />
      <InterviewFeedbackModal
        isOpen={isFeedbackFormOpen}
        onClose={closeFeedbackForm}
        interviewId={selectedInterviewId}
      />
    </InterviewContext.Provider>
  );
};

// Custom hook for using context
export const useInterviewContext = () => useContext(InterviewContext);

export default InterviewContext;