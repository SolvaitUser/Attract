// This file contains templates for different types of recruitment processes
const recruitmentStageTemplates = {
  general: [
    { 
      name: "Application Review", 
      isRequired: true, 
      description: "Review resumes and applications to identify qualified candidates.", 
      estimatedDays: 3 
    },
    { 
      name: "Phone Screening", 
      isRequired: true, 
      description: "Initial phone call to assess basic qualifications and interest.", 
      estimatedDays: 2 
    },
    { 
      name: "First Interview", 
      isRequired: true, 
      description: "First formal interview with the hiring manager.", 
      estimatedDays: 5 
    },
    { 
      name: "Final Interview", 
      isRequired: true, 
      description: "Final interview with senior leadership or team members.", 
      estimatedDays: 5 
    }
  ],
  
  technical: [
    { 
      name: "Application Review", 
      isRequired: true, 
      description: "Review resumes and applications to identify qualified candidates.", 
      estimatedDays: 3 
    },
    { 
      name: "Technical Screening", 
      isRequired: true, 
      description: "Initial assessment of technical skills and experience.", 
      estimatedDays: 2 
    },
    { 
      name: "Technical Assessment", 
      isRequired: true, 
      description: "Coding challenge or technical assignment to evaluate practical skills.", 
      estimatedDays: 5 
    },
    { 
      name: "Technical Interview", 
      isRequired: true, 
      description: "In-depth interview focusing on technical skills and knowledge.", 
      estimatedDays: 3 
    },
    { 
      name: "Team Interview", 
      isRequired: false, 
      description: "Meet with potential teammates to assess cultural fit.", 
      estimatedDays: 2 
    },
    { 
      name: "Final Interview", 
      isRequired: true, 
      description: "Final discussion with leadership team.", 
      estimatedDays: 2 
    }
  ],
  
  executive: [
    { 
      name: "Initial Screening", 
      isRequired: true, 
      description: "Initial evaluation of candidate qualifications and fit.", 
      estimatedDays: 3 
    },
    { 
      name: "First Round Interview", 
      isRequired: true, 
      description: "First formal interview with the hiring team.", 
      estimatedDays: 5 
    },
    { 
      name: "Leadership Assessment", 
      isRequired: true, 
      description: "Assessment of leadership abilities through tasks and discussions.", 
      estimatedDays: 7 
    },
    { 
      name: "Case Study", 
      isRequired: true, 
      description: "Practical assessment where candidates solve a real-world problem.", 
      estimatedDays: 5 
    },
    { 
      name: "Board Meeting", 
      isRequired: true, 
      description: "Meeting with board members or key stakeholders.", 
      estimatedDays: 5 
    },
    { 
      name: "Final Round", 
      isRequired: true, 
      description: "Final decision-making interview with executive team.", 
      estimatedDays: 3 
    }
  ],
  
  sales: [
    { 
      name: "Application Review", 
      isRequired: true, 
      description: "Review resumes and applications to identify qualified candidates.", 
      estimatedDays: 2 
    },
    { 
      name: "Phone Screening", 
      isRequired: true, 
      description: "Initial phone call to assess communication skills and experience.", 
      estimatedDays: 1 
    },
    { 
      name: "Sales Pitch Assessment", 
      isRequired: true, 
      description: "Evaluate candidate's sales presentation skills.", 
      estimatedDays: 3 
    },
    { 
      name: "Roleplay Scenario", 
      isRequired: true, 
      description: "Simulated sales scenarios to assess real-world selling abilities.", 
      estimatedDays: 3 
    },
    { 
      name: "Team Interview", 
      isRequired: false, 
      description: "Meet with the sales team to assess team fit.", 
      estimatedDays: 2 
    },
    { 
      name: "Final Interview", 
      isRequired: true, 
      description: "Final interview with sales leadership.", 
      estimatedDays: 2 
    }
  ],
  
  creative: [
    { 
      name: "Portfolio Review", 
      isRequired: true, 
      description: "Review of candidate's past work and creative portfolio.", 
      estimatedDays: 3 
    },
    { 
      name: "Initial Interview", 
      isRequired: true, 
      description: "First interview to discuss experience and creative approach.", 
      estimatedDays: 2 
    },
    { 
      name: "Design Challenge", 
      isRequired: true, 
      description: "Practical design task to demonstrate creative and technical skills.", 
      estimatedDays: 7 
    },
    { 
      name: "Presentation Review", 
      isRequired: true, 
      description: "Candidate presents their design challenge work and process.", 
      estimatedDays: 2 
    },
    { 
      name: "Team Meeting", 
      isRequired: true, 
      description: "Meet with the creative team to assess collaboration style.", 
      estimatedDays: 2 
    },
    { 
      name: "Final Interview", 
      isRequired: true, 
      description: "Final interview with creative director or leadership.", 
      estimatedDays: 3 
    }
  ]
};

export default recruitmentStageTemplates;