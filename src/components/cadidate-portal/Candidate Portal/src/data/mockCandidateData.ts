import { ActivityItem, Candidate, InterviewFeedback } from '../types/candidate';

export const mockCandidates: Candidate[] = [
  // Candidates for Senior Software Engineer (job-001)
  {
    id: 'cand-001',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    phone: '+971 55 123 4567',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user1',
    jobTitle: 'Full Stack Developer',
    company: 'Tech Solutions LLC',
    source: 'linkedin',
    stage: 'shortlisted',
    aiScore: 92,
    nationality: 'Egyptian',
    dateAdded: '2023-12-01T09:30:00Z',
    lastActivity: '2024-01-05T14:20:00Z',
    jobRequisitionId: 'job-001',
    resume: 'https://example.com/resume/ahmed.pdf',
    coverLetter: 'https://example.com/cover/ahmed.pdf',
    location: "Dubai, United Arab Emirates",
    workMode: "hybrid",
    education: [
      {
        id: "edu-001",
        degree: "Master of Science",
        major: "Computer Science",
        institution: "Stanford University",
        graduationYear: "2018",
        gpa: 3.8,
        location: "California, USA"
      },
      {
        id: "edu-002",
        degree: "Bachelor of Engineering",
        major: "Software Engineering",
        institution: "American University of Sharjah",
        graduationYear: "2016",
        gpa: 3.9,
        location: "Sharjah, UAE"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Microsoft",
        jobTitle: "Senior Software Engineer",
        startDate: "2020-06-01",
        isCurrent: true,
        location: "Dubai, UAE",
        achievements: [
          "Led the development of cloud-native microservices using .NET Core and Azure",
          "Implemented CI/CD pipelines that reduced deployment time by 70%",
          "Mentored junior developers and conducted technical interviews"
        ]
      },
      {
        id: "exp-002",
        company: "Amazon Web Services",
        jobTitle: "Software Development Engineer",
        startDate: "2018-03-15",
        endDate: "2020-05-30",
        location: "Seattle, USA",
        achievements: [
          "Developed key components for AWS Lambda service",
          "Optimized serverless execution environment, improving performance by 35%",
          "Contributed to open-source AWS SDK for JavaScript"
        ]
      },
      {
        id: "exp-003",
        company: "Uber",
        jobTitle: "Software Engineer Intern",
        startDate: "2017-06-01",
        endDate: "2017-08-30",
        location: "San Francisco, USA",
        achievements: [
          "Built data visualization tools for rider-driver matching algorithms",
          "Implemented regression tests for route optimization service"
        ]
      }
    ],
    skills: {
      technical: [
        "JavaScript", "TypeScript", "React", "Node.js", "Python", 
        "AWS", "Azure", "Docker", "Kubernetes", "GraphQL", 
        "MongoDB", "PostgreSQL", "Redis", "Elasticsearch"
      ],
      soft: [
        "Team Leadership", "Project Management", "Mentoring", 
        "Cross-functional Collaboration", "Technical Writing"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" },
        { language: "French", proficiency: "intermediate" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "AWS Certified Solutions Architect - Professional",
        provider: "Amazon Web Services",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "AWS-P-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      },
      {
        id: "cert-003",
        name: "Professional Scrum Master I (PSM I)",
        provider: "Scrum.org",
        issueDate: "2019-11-22",
        credentialId: "PSM-I-12345"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Ahmad_Hassan_Resume_2023.pdf",
        url: "/documents/resume-001.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "AWS_Solutions_Architect_Certificate.pdf",
        url: "/documents/certificate-001.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Microsoft_Reference_Letter.pdf",
        url: "/documents/reference-001.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/ahmad-hassan/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/ahmad-hassan-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://ahmadhassan.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  {
    id: 'cand-002',
    name: 'Sara Al-Farsi',
    email: 'sara.alfarsi@example.com',
    phone: '+971 50 234 5678',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user2',
    jobTitle: 'Senior Developer',
    company: 'Global Tech Co.',
    source: 'portal',
    stage: 'interviewed',
    aiScore: 88,
    nationality: 'Emirati',
    dateAdded: '2023-12-02T11:15:00Z',
    lastActivity: '2024-01-07T10:45:00Z',
    jobRequisitionId: 'job-001',
    resume: 'https://example.com/resume/sara.pdf',
    coverLetter: 'https://example.com/cover/sara.pdf',
    location: "Riyadh, Saudi Arabia",
    workMode: "onsite",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Computer Science",
        major: "Software Engineering",
        institution: "King Saud University",
        graduationYear: "2019",
        gpa: 3.7,
        location: "Riyadh, Saudi Arabia"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Google",
        jobTitle: "Senior Software Engineer",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Mountain View, USA",
        achievements: [
          "Developed scalable backend services for Google Maps",
          "Optimized database queries for high traffic applications",
          "Led a team of 5 developers in a cross-functional project"
        ]
      },
      {
        id: "exp-002",
        company: "Facebook",
        jobTitle: "Software Development Engineer",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Menlo Park, USA",
        achievements: [
          "Implemented real-time data streaming system for user notifications",
          "Optimized serverless architecture for high availability",
          "Conducted code reviews and pair programming sessions"
        ]
      }
    ],
    skills: {
      technical: [
        "Java", "Spring Boot", "GraphQL", "NoSQL databases", 
        "Docker", "Kubernetes", "CI/CD pipelines"
      ],
      soft: [
        "Problem-solving", "Team Leadership", "Project Management", 
        "Cross-functional Collaboration", "Technical Writing"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Google Cloud Certified: Cloud Architect",
        provider: "Google",
        issueDate: "2022-03-10",
        expiryDate: "2025-03-10",
        credentialId: "GC-CA-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Sara_Al-Farsi_Resume_2023.pdf",
        url: "/documents/resume-002.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "Google_Cloud_Architect_Certificate.pdf",
        url: "/documents/certificate-002.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Google_Reference_Letter.pdf",
        url: "/documents/reference-002.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/sara-alfarsi/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/sara-alfarsi-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://saraalfarsi.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  {
    id: 'cand-003',
    name: 'Michael Andersen',
    email: 'michael.andersen@example.com',
    phone: '+971 56 345 6789',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user3',
    jobTitle: 'Lead Developer',
    company: 'Innovative Apps Inc.',
    source: 'referral',
    stage: 'new',
    aiScore: 78,
    nationality: 'Danish',
    dateAdded: '2023-12-05T13:45:00Z',
    lastActivity: '2023-12-05T13:45:00Z',
    jobRequisitionId: 'job-001',
    resume: 'https://example.com/resume/michael.pdf',
    coverLetter: 'https://example.com/cover/michael.pdf',
    location: "Copenhagen, Denmark",
    workMode: "remote",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Computer Science",
        major: "Software Engineering",
        institution: "University of Copenhagen",
        graduationYear: "2017",
        gpa: 3.6,
        location: "Copenhagen, Denmark"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "IBM",
        jobTitle: "Software Development Engineer",
        startDate: "2019-06-01",
        isCurrent: false,
        location: "Zurich, Switzerland",
        achievements: [
          "Developed scalable web applications using React and Node.js",
          "Optimized database performance for large-scale applications",
          "Led a team of 3 developers in a cross-functional project"
        ]
      },
      {
        id: "exp-002",
        company: "Oracle",
        jobTitle: "Software Development Engineer",
        startDate: "2017-01-01",
        endDate: "2019-06-01",
        location: "Redwood City, USA",
        achievements: [
          "Implemented data integration solutions for enterprise systems",
          "Optimized database queries for high availability",
          "Conducted code reviews and pair programming sessions"
        ]
      }
    ],
    skills: {
      technical: [
        "Java", "Spring Boot", "GraphQL", "NoSQL databases", 
        "Docker", "Kubernetes", "CI/CD pipelines"
      ],
      soft: [
        "Problem-solving", "Team Leadership", "Project Management", 
        "Cross-functional Collaboration", "Technical Writing"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Danish", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Oracle Certified: Java SE Developer",
        provider: "Oracle",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "OCA-JAVA-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Michael_Andersen_Resume_2023.pdf",
        url: "/documents/resume-003.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "Oracle_Java_Developer_Certificate.pdf",
        url: "/documents/certificate-003.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "IBM_Reference_Letter.pdf",
        url: "/documents/reference-003.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/michael-andersen/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/michael-andersen-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://michaelandersen.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  
  // Candidates for Product Manager (job-002)
  {
    id: 'cand-004',
    name: 'Fatima Al-Suwaidi',
    email: 'fatima.alsuwaidi@example.com',
    phone: '+966 50 456 7890',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user4',
    jobTitle: 'Product Owner',
    company: 'Digital Platforms Co.',
    source: 'linkedin',
    stage: 'shortlisted',
    aiScore: 91,
    nationality: 'Saudi',
    dateAdded: '2023-12-08T09:15:00Z',
    lastActivity: '2024-01-02T11:30:00Z',
    jobRequisitionId: 'job-002',
    resume: 'https://example.com/resume/fatima.pdf',
    coverLetter: 'https://example.com/cover/fatima.pdf',
    location: "Riyadh, Saudi Arabia",
    workMode: "onsite",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Business Administration",
        major: "Marketing",
        institution: "King Saud University",
        graduationYear: "2018",
        gpa: 3.5,
        location: "Riyadh, Saudi Arabia"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "PepsiCo",
        jobTitle: "Product Manager",
        startDate: "2020-01-01",
        isCurrent: false,
        location: "Cairo, Egypt",
        achievements: [
          "Led the development of a new product line for PepsiCo",
          "Optimized marketing campaigns for 20% increase in sales",
          "Conducted market research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "Unilever",
        jobTitle: "Product Manager",
        startDate: "2018-06-01",
        endDate: "2020-01-01",
        location: "London, UK",
        achievements: [
          "Developed a new product line for Unilever",
          "Optimized marketing campaigns for 15% increase in sales",
          "Conducted market research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "Project Management", "Market Research", "Data Analysis", 
        "Communication", "Team Leadership"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Project Management Professional (PMP)",
        provider: "Project Management Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "PMP-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Fatima_Al-Suwaidi_Resume_2023.pdf",
        url: "/documents/resume-004.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "PMP_Certificate.pdf",
        url: "/documents/certificate-004.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "PepsiCo_Reference_Letter.pdf",
        url: "/documents/reference-004.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/fatima-alsuwaidi/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/fatima-alsuwaidi-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://fatimaalsuwaidi.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  {
    id: 'cand-005',
    name: 'Omar Malik',
    email: 'omar.malik@example.com',
    phone: '+966 55 567 8901',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user5',
    jobTitle: 'Senior Product Manager',
    company: 'Vision Tech',
    source: 'portal',
    stage: 'new',
    aiScore: 82,
    nationality: 'Pakistani',
    dateAdded: '2023-12-10T14:30:00Z',
    lastActivity: '2023-12-10T14:30:00Z',
    jobRequisitionId: 'job-002',
    resume: 'https://example.com/resume/omar.pdf',
    coverLetter: 'https://example.com/cover/omar.pdf',
    location: "Karachi, Pakistan",
    workMode: "remote",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Business Administration",
        major: "Marketing",
        institution: "University of Karachi",
        graduationYear: "2016",
        gpa: 3.4,
        location: "Karachi, Pakistan"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Samsung",
        jobTitle: "Product Manager",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Seoul, South Korea",
        achievements: [
          "Led the development of a new product line for Samsung",
          "Optimized marketing campaigns for 20% increase in sales",
          "Conducted market research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "LG Electronics",
        jobTitle: "Product Manager",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Seoul, South Korea",
        achievements: [
          "Developed a new product line for LG Electronics",
          "Optimized marketing campaigns for 15% increase in sales",
          "Conducted market research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "Project Management", "Market Research", "Data Analysis", 
        "Communication", "Team Leadership"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Project Management Professional (PMP)",
        provider: "Project Management Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "PMP-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Omar_Malik_Resume_2023.pdf",
        url: "/documents/resume-005.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "PMP_Certificate.pdf",
        url: "/documents/certificate-005.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Samsung_Reference_Letter.pdf",
        url: "/documents/reference-005.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/omar-malik/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/omar-malik-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://omarmalik.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  
  // Candidates for UX/UI Designer (job-003)
  {
    id: 'cand-006',
    name: 'Layla Ibrahim',
    email: 'layla.ibrahim@example.com',
    phone: '+20 10 678 9012',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user6',
    jobTitle: 'Senior UX Designer',
    company: 'Creative Interface LLC',
    source: 'linkedin',
    stage: 'interviewed',
    aiScore: 95,
    nationality: 'Egyptian',
    dateAdded: '2023-12-12T10:45:00Z',
    lastActivity: '2024-01-08T09:15:00Z',
    jobRequisitionId: 'job-003',
    resume: 'https://example.com/resume/layla.pdf',
    coverLetter: 'https://example.com/cover/layla.pdf',
    location: "Cairo, Egypt",
    workMode: "onsite",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Design",
        major: "User Experience Design",
        institution: "Cairo University",
        graduationYear: "2019",
        gpa: 3.9,
        location: "Cairo, Egypt"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Apple",
        jobTitle: "Senior UX Designer",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Cupertino, USA",
        achievements: [
          "Led the design of a new user interface for Apple's iPhone",
          "Optimized user experience for 10% increase in user engagement",
          "Conducted user research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "Google",
        jobTitle: "UX Designer",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Mountain View, USA",
        achievements: [
          "Designed a new user interface for Google's search engine",
          "Optimized user experience for 15% increase in user engagement",
          "Conducted user research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "User Experience Design", "User Research", "Visual Design", 
        "Interaction Design", "Prototyping"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "User Experience Design Certification",
        provider: "UX Design Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "UXD-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Layla_Ibrahim_Resume_2023.pdf",
        url: "/documents/resume-006.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "UXD_Certificate.pdf",
        url: "/documents/certificate-006.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Apple_Reference_Letter.pdf",
        url: "/documents/reference-006.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/layla-ibrahim/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/layla-ibrahim-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://laylaibrahim.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  {
    id: 'cand-007',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    phone: '+44 7700 900123',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user7',
    jobTitle: 'UI/UX Designer',
    company: 'Digital Experience Co.',
    source: 'referral',
    stage: 'offered',
    aiScore: 89,
    nationality: 'British',
    dateAdded: '2023-12-15T08:30:00Z',
    lastActivity: '2024-01-10T13:45:00Z',
    jobRequisitionId: 'job-003',
    resume: 'https://example.com/resume/james.pdf',
    coverLetter: 'https://example.com/cover/james.pdf',
    location: "London, UK",
    workMode: "remote",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Design",
        major: "User Experience Design",
        institution: "University of London",
        graduationYear: "2017",
        gpa: 3.8,
        location: "London, UK"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Adobe",
        jobTitle: "UI/UX Designer",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "San Francisco, USA",
        achievements: [
          "Led the design of a new user interface for Adobe's Creative Suite",
          "Optimized user experience for 10% increase in user engagement",
          "Conducted user research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "Microsoft",
        jobTitle: "UI/UX Designer",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Redmond, USA",
        achievements: [
          "Designed a new user interface for Microsoft's Office",
          "Optimized user experience for 15% increase in user engagement",
          "Conducted user research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "User Experience Design", "User Research", "Visual Design", 
        "Interaction Design", "Prototyping"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "French", proficiency: "intermediate" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "User Experience Design Certification",
        provider: "UX Design Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "UXD-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "James_Wilson_Resume_2023.pdf",
        url: "/documents/resume-007.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "UXD_Certificate.pdf",
        url: "/documents/certificate-007.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Adobe_Reference_Letter.pdf",
        url: "/documents/reference-007.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/james-wilson/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/james-wilson-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://jameswilson.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  {
    id: 'cand-008',
    name: 'Aisha Al-Mansoori',
    email: 'aisha.almansoori@example.com',
    phone: '+971 58 789 0123',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user8',
    jobTitle: 'Product Designer',
    company: 'Future Apps',
    source: 'portal',
    stage: 'shortlisted',
    aiScore: 86,
    nationality: 'Emirati',
    dateAdded: '2023-12-18T11:20:00Z',
    lastActivity: '2024-01-03T15:30:00Z',
    jobRequisitionId: 'job-003',
    resume: 'https://example.com/resume/aisha.pdf',
    coverLetter: 'https://example.com/cover/aisha.pdf',
    location: "Dubai, United Arab Emirates",
    workMode: "hybrid",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Design",
        major: "Product Design",
        institution: "Dubai Design Academy",
        graduationYear: "2018",
        gpa: 3.7,
        location: "Dubai, United Arab Emirates"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Samsung",
        jobTitle: "Product Designer",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Seoul, South Korea",
        achievements: [
          "Led the design of a new product line for Samsung",
          "Optimized user experience for 10% increase in user engagement",
          "Conducted user research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "LG Electronics",
        jobTitle: "Product Designer",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Seoul, South Korea",
        achievements: [
          "Designed a new product line for LG Electronics",
          "Optimized user experience for 15% increase in user engagement",
          "Conducted user research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "Product Design", "User Experience Design", "Visual Design", 
        "Interaction Design", "Prototyping"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Product Design Certification",
        provider: "Product Design Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "PD-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Aisha_Al-Mansoori_Resume_2023.pdf",
        url: "/documents/resume-008.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "PD_Certificate.pdf",
        url: "/documents/certificate-008.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Samsung_Reference_Letter.pdf",
        url: "/documents/reference-008.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/aisha-almansoori/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/aisha-almansoori-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://aishaalmansoori.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  
  // Candidates for Marketing Specialist (job-004)
  {
    id: 'cand-009',
    name: 'Tariq Rahman',
    email: 'tariq.rahman@example.com',
    phone: '+971 54 890 1234',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user9',
    jobTitle: 'Digital Marketing Manager',
    company: 'Brand Connect LLC',
    source: 'linkedin',
    stage: 'new',
    aiScore: 81,
    nationality: 'Indian',
    dateAdded: '2023-12-20T13:10:00Z',
    lastActivity: '2023-12-20T13:10:00Z',
    jobRequisitionId: 'job-004',
    resume: 'https://example.com/resume/tariq.pdf',
    coverLetter: 'https://example.com/cover/tariq.pdf',
    location: "New Delhi, India",
    workMode: "onsite",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Business Administration",
        major: "Marketing",
        institution: "Delhi University",
        graduationYear: "2016",
        gpa: 3.6,
        location: "New Delhi, India"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Google",
        jobTitle: "Digital Marketing Manager",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Mountain View, USA",
        achievements: [
          "Led the development of a new digital marketing strategy for Google",
          "Optimized campaigns for 20% increase in website traffic",
          "Conducted market research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "Facebook",
        jobTitle: "Digital Marketing Manager",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Menlo Park, USA",
        achievements: [
          "Developed a new digital marketing strategy for Facebook",
          "Optimized campaigns for 15% increase in website traffic",
          "Conducted market research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "Digital Marketing", "Market Research", "Data Analysis", 
        "Communication", "Team Leadership"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Hindi", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Digital Marketing Professional (DMP)",
        provider: "Digital Marketing Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "DMP-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Tariq_Rahman_Resume_2023.pdf",
        url: "/documents/resume-009.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "DMP_Certificate.pdf",
        url: "/documents/certificate-009.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Google_Reference_Letter.pdf",
        url: "/documents/reference-009.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/tariq-rahman/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/tariq-rahman-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://tariqrahman.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  {
    id: 'cand-010',
    name: 'Dana Al-Harbi',
    email: 'dana.alharbi@example.com',
    phone: '+966 53 901 2345',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user10',
    jobTitle: 'Marketing Coordinator',
    company: 'Media Plus',
    source: 'portal',
    stage: 'interviewed',
    aiScore: 79,
    nationality: 'Saudi',
    dateAdded: '2023-12-22T09:45:00Z',
    lastActivity: '2024-01-05T11:20:00Z',
    jobRequisitionId: 'job-004',
    resume: 'https://example.com/resume/dana.pdf',
    coverLetter: 'https://example.com/cover/dana.pdf',
    location: "Riyadh, Saudi Arabia",
    workMode: "onsite",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Business Administration",
        major: "Marketing",
        institution: "King Saud University",
        graduationYear: "2017",
        gpa: 3.5,
        location: "Riyadh, Saudi Arabia"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "PepsiCo",
        jobTitle: "Marketing Coordinator",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Cairo, Egypt",
        achievements: [
          "Led the development of a new marketing campaign for PepsiCo",
          "Optimized campaigns for 10% increase in sales",
          "Conducted market research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "Unilever",
        jobTitle: "Marketing Coordinator",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "London, UK",
        achievements: [
          "Developed a new marketing campaign for Unilever",
          "Optimized campaigns for 15% increase in sales",
          "Conducted market research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "Marketing", "Market Research", "Data Analysis", 
        "Communication", "Team Leadership"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Marketing Professional (MP)",
        provider: "Marketing Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "MP-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Dana_Al-Harbi_Resume_2023.pdf",
        url: "/documents/resume-010.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "MP_Certificate.pdf",
        url: "/documents/certificate-010.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "PepsiCo_Reference_Letter.pdf",
        url: "/documents/reference-010.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/dana-alharbi/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/dana-alharbi-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://danaalharbi.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  
  // Candidates for Customer Support Representative (job-005)
  {
    id: 'cand-011',
    name: 'Mohamed Adel',
    email: 'mohamed.adel@example.com',
    phone: '+20 11 012 3456',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user11',
    jobTitle: 'Customer Service Specialist',
    company: 'Support Solutions Inc.',
    source: 'linkedin',
    stage: 'shortlisted',
    aiScore: 84,
    nationality: 'Egyptian',
    dateAdded: '2023-12-25T10:30:00Z',
    lastActivity: '2024-01-04T13:15:00Z',
    jobRequisitionId: 'job-005',
    resume: 'https://example.com/resume/mohamed.pdf',
    coverLetter: 'https://example.com/cover/mohamed.pdf',
    location: "Cairo, Egypt",
    workMode: "onsite",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Business Administration",
        major: "Marketing",
        institution: "Cairo University",
        graduationYear: "2016",
        gpa: 3.4,
        location: "Cairo, Egypt"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Google",
        jobTitle: "Customer Service Specialist",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Mountain View, USA",
        achievements: [
          "Led the development of a new customer service strategy for Google",
          "Optimized customer service for 10% increase in customer satisfaction",
          "Conducted market research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "Facebook",
        jobTitle: "Customer Service Specialist",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Menlo Park, USA",
        achievements: [
          "Developed a new customer service strategy for Facebook",
          "Optimized customer service for 15% increase in customer satisfaction",
          "Conducted market research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "Customer Service", "Market Research", "Data Analysis", 
        "Communication", "Team Leadership"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Customer Service Professional (CSP)",
        provider: "Customer Service Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "CSP-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Mohamed_Adel_Resume_2023.pdf",
        url: "/documents/resume-011.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "CSP_Certificate.pdf",
        url: "/documents/certificate-011.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Google_Reference_Letter.pdf",
        url: "/documents/reference-011.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/mohamed-adel/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/mohamed-adel-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://mohamedadel.dev",
        name: "Personal Portfolio"
      }
    ]
  },
  {
    id: 'cand-012',
    name: 'Reem Al-Qahtani',
    email: 'reem.alqahtani@example.com',
    phone: '+966 56 123 4567',
    photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=user12',
    jobTitle: 'Support Team Lead',
    company: 'Customer Care LLC',
    source: 'referral',
    stage: 'new',
    aiScore: 76,
    nationality: 'Saudi',
    dateAdded: '2023-12-28T15:20:00Z',
    lastActivity: '2023-12-28T15:20:00Z',
    jobRequisitionId: 'job-005',
    resume: 'https://example.com/resume/reem.pdf',
    coverLetter: 'https://example.com/cover/reem.pdf',
    location: "Riyadh, Saudi Arabia",
    workMode: "onsite",
    education: [
      {
        id: "edu-001",
        degree: "Bachelor of Business Administration",
        major: "Marketing",
        institution: "King Saud University",
        graduationYear: "2017",
        gpa: 3.4,
        location: "Riyadh, Saudi Arabia"
      }
    ],
    experience: [
      {
        id: "exp-001",
        company: "Google",
        jobTitle: "Support Team Lead",
        startDate: "2021-01-01",
        isCurrent: false,
        location: "Mountain View, USA",
        achievements: [
          "Led the development of a new support team strategy for Google",
          "Optimized support team for 10% increase in customer satisfaction",
          "Conducted market research and analyzed competitor strategies"
        ]
      },
      {
        id: "exp-002",
        company: "Facebook",
        jobTitle: "Support Team Lead",
        startDate: "2018-06-01",
        endDate: "2021-01-01",
        location: "Menlo Park, USA",
        achievements: [
          "Developed a new support team strategy for Facebook",
          "Optimized support team for 15% increase in customer satisfaction",
          "Conducted market research and analyzed competitor strategies"
        ]
      }
    ],
    skills: {
      technical: [
        "Support Team Management", "Market Research", "Data Analysis", 
        "Communication", "Team Leadership"
      ],
      soft: [
        "Problem-solving", "Cross-functional Collaboration", 
        "Technical Writing", "Leadership"
      ],
      languages: [
        { language: "English", proficiency: "fluent" },
        { language: "Arabic", proficiency: "native" }
      ]
    },
    certifications: [
      {
        id: "cert-001",
        name: "Support Team Management Professional (STMP)",
        provider: "Support Team Management Institute",
        issueDate: "2021-04-15",
        expiryDate: "2024-04-15",
        credentialId: "STMP-123456789"
      },
      {
        id: "cert-002",
        name: "Microsoft Certified: Azure Developer Associate",
        provider: "Microsoft",
        issueDate: "2020-07-10",
        expiryDate: "2023-07-10",
        credentialId: "MSFT-AZ204-987654321"
      }
    ],
    documents: [
      {
        id: "doc-001",
        type: "resume",
        name: "Reem_Al-Qahtani_Resume_2023.pdf",
        url: "/documents/resume-012.pdf",
        uploadDate: "2023-09-15T10:30:00"
      },
      {
        id: "doc-002",
        type: "certificate",
        name: "STMP_Certificate.pdf",
        url: "/documents/certificate-012.pdf",
        uploadDate: "2023-09-15T10:35:00"
      },
      {
        id: "doc-003",
        type: "reference",
        name: "Google_Reference_Letter.pdf",
        url: "/documents/reference-012.pdf",
        uploadDate: "2023-09-15T10:40:00"
      }
    ],
    links: [
      {
        id: "link-001",
        type: "linkedin",
        url: "https://www.linkedin.com/in/reem-alqahtani/",
        name: "LinkedIn Profile"
      },
      {
        id: "link-002",
        type: "github",
        url: "https://github.com/reem-alqahtani-dev",
        name: "GitHub Profile"
      },
      {
        id: "link-003",
        type: "portfolio",
        url: "https://reemalqahtani.dev",
        name: "Personal Portfolio"
      }
    ]
  }
];

export const mockInterviewFeedback: InterviewFeedback[] = [
  {
    id: '1',
    candidateId: '3',
    interviewerId: 'i1',
    interviewerName: 'David Wilson',
    date: '2023-10-12T13:00:00Z',
    questions: [
      {
        question: 'Describe your experience with React and component optimization',
        score: 4,
        notes: 'Candidate showed strong knowledge of React performance optimization techniques'
      },
      {
        question: 'How would you implement state management in a large application?',
        score: 5,
        notes: 'Excellent understanding of various state management approaches'
      },
      {
        question: 'How do you approach responsive design and accessibility?',
        score: 4,
        notes: 'Good knowledge of responsive design principles and WCAG guidelines'
      }
    ],
    overallFeedback: 'Maria is a strong candidate with excellent technical skills and communication ability. She answered questions thoughtfully and provided concrete examples from her work experience.',
    recommendationScore: 5
  },
  {
    id: '2',
    candidateId: '4',
    interviewerId: 'i2',
    interviewerName: 'Jennifer Lee',
    date: '2023-10-09T11:30:00Z',
    questions: [
      {
        question: 'Describe your experience with designing and implementing RESTful APIs',
        score: 5,
        notes: 'Exceptional understanding of API design principles'
      },
      {
        question: 'How would you optimize database performance for high traffic applications?',
        score: 5,
        notes: 'Strong knowledge of indexing, query optimization, and caching strategies'
      },
      {
        question: 'What approach do you take for testing backend code?',
        score: 4,
        notes: 'Good understanding of unit, integration, and end-to-end testing'
      }
    ],
    overallFeedback: 'Alex is an exceptional candidate with deep technical expertise in backend development. His problem-solving approach was particularly impressive during the system design discussion.',
    recommendationScore: 5
  },
  {
    id: '3',
    candidateId: '7',
    interviewerId: 'i3',
    interviewerName: 'Michael Johnson',
    date: '2023-10-07T14:15:00Z',
    questions: [
      {
        question: 'Can you explain your approach to database schema design?',
        score: 4,
        notes: 'Good understanding of normalization and data relationships'
      },
      {
        question: 'How do you handle error handling and logging in production systems?',
        score: 3,
        notes: 'Solid approach but could improve on structured logging practices'
      },
      {
        question: 'Describe your experience with microservices architecture',
        score: 4,
        notes: 'Good practical experience with service decomposition and communication patterns'
      }
    ],
    overallFeedback: 'Tariq demonstrated strong technical skills and good problem-solving abilities. He has relevant experience in similar projects and shows potential for growth.',
    recommendationScore: 4
  },
  {
    id: 'int-001',
    candidateId: 'cand-001',
    interviewerName: 'Ahmed Hassan',
    date: '2023-11-15T10:30:00',
    recommendationScore: 4,
    questions: [
      {
        question: 'Describe a challenging project you worked on and how you approached it.',
        score: 5,
        notes: 'Candidate provided an excellent example of refactoring a legacy system. Showed strong problem-solving skills.'
      },
      {
        question: 'How do you handle conflicting priorities?',
        score: 4,
        notes: 'Good prioritization framework. Could improve on stakeholder communication.'
      },
      {
        question: 'Tell me about your experience with agile methodologies.',
        score: 5,
        notes: 'Very experienced with Scrum and Kanban. Has served as Scrum Master for 2 years.'
      },
      {
        question: 'What is your approach to learning new technologies?',
        score: 4,
        notes: 'Proactive learner with good habits for staying current in the field.'
      }
    ],
    overallFeedback: 'Strong technical candidate with excellent communication skills. Would be a great fit for our team culture. Recommend moving forward with an offer.'
  },
  {
    id: 'int-002',
    candidateId: 'cand-001',
    interviewerName: 'Sarah Johnson',
    date: '2023-11-08T14:00:00',
    recommendationScore: 5,
    questions: [
      {
        question: 'Explain your approach to software architecture for large-scale systems.',
        score: 5,
        notes: 'Impressive understanding of microservices and domain-driven design.'
      },
      {
        question: 'How do you ensure code quality in your projects?',
        score: 5,
        notes: 'Strong advocate for automated testing, code reviews, and CI/CD practices.'
      },
      {
        question: 'Describe a situation where you had to debug a complex issue.',
        score: 4,
        notes: 'Good analytical approach to breaking down problems.'
      },
      {
        question: 'How do you stay up-to-date with technology trends?',
        score: 5,
        notes: 'Regular participation in conferences, active in open source, follows key industry blogs.'
      }
    ],
    overallFeedback: 'Exceptional technical depth and breadth. One of the strongest candidates I\'ve interviewed this year. Strong hire recommendation.'
  },
  {
    id: 'int-003',
    candidateId: 'cand-002',
    interviewerName: 'Mohammed Al-Faisal',
    date: '2023-11-10T11:00:00',
    recommendationScore: 3,
    questions: [
      {
        question: 'Describe your experience with cloud platforms.',
        score: 4,
        notes: 'Good knowledge of AWS services, less experience with multi-cloud strategies.'
      },
      {
        question: 'How would you design a scalable database solution?',
        score: 3,
        notes: 'Basic understanding of scaling principles but lacks practical experience with large datasets.'
      },
      {
        question: 'What projects have you led from inception to delivery?',
        score: 3,
        notes: 'Has managed small team projects but limited experience with enterprise-scale initiatives.'
      }
    ],
    overallFeedback: 'Solid fundamentals but may need mentoring for more senior responsibilities. Could be a good fit for mid-level position.'
  },
  {
    id: 'int-004',
    candidateId: 'cand-003',
    interviewerName: 'Fatima Al-Zahra',
    date: '2023-11-05T09:30:00',
    recommendationScore: 5,
    questions: [
      {
        question: 'Tell me about your experience leading cross-functional teams.',
        score: 5,
        notes: 'Exceptional leadership qualities with proven track record of successful project delivery.'
      },
      {
        question: 'How do you approach resource allocation in complex projects?',
        score: 5,
        notes: 'Sophisticated understanding of resource management with clear examples provided.'
      },
      {
        question: 'Describe a situation where you had to manage stakeholder expectations.',
        score: 4,
        notes: 'Good communication strategies but could improve on early expectation setting.'
      }
    ],
    overallFeedback: 'Outstanding candidate for Product Manager role. Strong leadership qualities, excellent analytical skills, and great cultural fit.'
  },
  {
    id: 'int-005',
    candidateId: 'cand-004',
    interviewerName: 'David Chen',
    date: '2023-10-28T13:00:00',
    recommendationScore: 2,
    questions: [
      {
        question: 'Describe your design process from requirement gathering to final delivery.',
        score: 2,
        notes: 'Process seems ad-hoc without structured methodology.'
      },
      {
        question: 'How do you incorporate user feedback into your designs?',
        score: 3,
        notes: 'Some understanding of user testing but limited experience with formal UX research methods.'
      },
      {
        question: 'Show examples of how you\'ve created consistent design systems.',
        score: 2,
        notes: 'Portfolio lacks evidence of systematic design thinking.'
      }
    ],
    overallFeedback: 'Candidate needs more experience before being ready for a senior design role. Would not recommend proceeding at this time.'
  },
  {
    id: 'int-006',
    candidateId: 'cand-005',
    interviewerName: 'Layla Kareem',
    date: '2023-11-12T15:30:00',
    recommendationScore: 4,
    questions: [
      {
        question: 'How do you analyze market trends to inform marketing strategy?',
        score: 5,
        notes: 'Sophisticated approach to data analysis with clear ROI orientation.'
      },
      {
        question: 'Describe a successful campaign you led and the results achieved.',
        score: 4,
        notes: 'Impressive case study with 32% conversion improvement in e-commerce segment.'
      },
      {
        question: 'How do you measure marketing effectiveness across channels?',
        score: 4,
        notes: 'Good attribution modeling knowledge but could strengthen multi-touch analysis.'
      }
    ],
    overallFeedback: 'Strong marketing strategist with excellent analytical skills. Would be an asset to our growth marketing team.'
  }
];

export const mockActivities: ActivityItem[] = [
  {
    id: 'a1',
    candidateId: '3',
    type: 'status_change',
    date: '2023-10-14T16:30:00Z',
    content: 'Moved from Shortlisted to Interviewed',
    user: 'David Wilson'
  },
  {
    id: 'a2',
    candidateId: '3',
    type: 'interview',
    date: '2023-10-12T13:00:00Z',
    content: 'Completed technical interview',
    user: 'David Wilson'
  },
  {
    id: 'a3',
    candidateId: '3',
    type: 'email',
    date: '2023-10-11T10:15:00Z',
    content: 'Sent interview invitation email',
    user: 'Sarah Adams'
  },
  {
    id: 'a4',
    candidateId: '3',
    type: 'status_change',
    date: '2023-10-07T09:30:00Z',
    content: 'Moved from New to Shortlisted',
    user: 'Sarah Adams'
  },
  {
    id: 'a5',
    candidateId: '3',
    type: 'cv_upload',
    date: '2023-10-05T10:15:00Z',
    content: 'CV uploaded and parsed by AI system',
    user: 'System'
  },
  {
    id: 'a6',
    candidateId: '4',
    type: 'status_change',
    date: '2023-10-13T11:45:00Z',
    content: 'Moved from Interviewed to Offered',
    user: 'Jennifer Lee'
  },
  {
    id: 'a7',
    candidateId: '4',
    type: 'interview',
    date: '2023-10-09T11:30:00Z',
    content: 'Completed technical interview',
    user: 'Jennifer Lee'
  },
  {
    id: 'act-001',
    candidateId: 'cand-001',
    type: 'cv_upload',
    content: 'Resume uploaded to the system',
    user: 'System',
    date: '2023-10-25T09:15:00'
  },
  {
    id: 'act-002',
    candidateId: 'cand-001',
    type: 'status_change',
    content: 'Status changed from New to Shortlisted',
    user: 'Maria Rodriguez',
    date: '2023-10-27T14:30:00'
  },
  {
    id: 'act-003',
    candidateId: 'cand-001',
    type: 'email',
    content: 'First interview invitation sent',
    user: 'Recruitment Bot',
    date: '2023-10-28T10:45:00'
  },
  {
    id: 'act-004',
    candidateId: 'cand-001',
    type: 'interview',
    content: 'Technical interview scheduled with Sarah Johnson',
    user: 'Recruitment Bot',
    date: '2023-11-02T16:20:00'
  },
  {
    id: 'act-005',
    candidateId: 'cand-001',
    type: 'interview',
    content: 'Technical interview completed',
    user: 'Sarah Johnson',
    date: '2023-11-08T15:00:00'
  },
  {
    id: 'act-006',
    candidateId: 'cand-001',
    type: 'note',
    content: 'Candidate has exceptional problem-solving skills. Strong technical background with 8+ years in enterprise software.',
    user: 'Sarah Johnson',
    date: '2023-11-08T15:30:00'
  },
  {
    id: 'act-007',
    candidateId: 'cand-001',
    type: 'interview',
    content: 'Cultural fit interview scheduled with Ahmed Hassan',
    user: 'Maria Rodriguez',
    date: '2023-11-10T09:00:00'
  },
  {
    id: 'act-008',
    candidateId: 'cand-001',
    type: 'interview',
    content: 'Cultural fit interview completed',
    user: 'Ahmed Hassan',
    date: '2023-11-15T11:30:00'
  },
  {
    id: 'act-009',
    candidateId: 'cand-001',
    type: 'status_change',
    content: 'Status changed from Shortlisted to Interviewed',
    user: 'Ahmed Hassan',
    date: '2023-11-15T12:00:00'
  },
  {
    id: 'act-010',
    candidateId: 'cand-001',
    type: 'note',
    content: 'Team feedback collected. All interviewers support moving forward with an offer.',
    user: 'Maria Rodriguez',
    date: '2023-11-17T14:15:00'
  },
  {
    id: 'act-011',
    candidateId: 'cand-001',
    type: 'status_change',
    content: 'Status changed from Interviewed to Offered',
    user: 'Maria Rodriguez',
    date: '2023-11-18T10:30:00'
  },
  {
    id: 'act-012',
    candidateId: 'cand-001',
    type: 'email',
    content: 'Offer letter sent to candidate',
    user: 'Recruitment Bot',
    date: '2023-11-18T11:00:00'
  },
  {
    id: 'act-020',
    candidateId: 'cand-002',
    type: 'cv_upload',
    content: 'Resume uploaded to the system',
    user: 'System',
    date: '2023-10-20T11:20:00'
  },
  {
    id: 'act-021',
    candidateId: 'cand-002',
    type: 'status_change',
    content: 'Status changed from New to Shortlisted',
    user: 'Khalid Mohammed',
    date: '2023-10-23T09:45:00'
  },
  {
    id: 'act-022',
    candidateId: 'cand-002',
    type: 'email',
    content: 'First interview invitation sent',
    user: 'Recruitment Bot',
    date: '2023-10-24T13:10:00'
  },
  {
    id: 'act-023',
    candidateId: 'cand-002',
    type: 'interview',
    content: 'Technical interview scheduled with Mohammed Al-Faisal',
    user: 'Recruitment Bot',
    date: '2023-11-05T14:30:00'
  },
  {
    id: 'act-024',
    candidateId: 'cand-002',
    type: 'interview',
    content: 'Technical interview completed',
    user: 'Mohammed Al-Faisal',
    date: '2023-11-10T12:00:00'
  },
  {
    id: 'act-025',
    candidateId: 'cand-002',
    type: 'note',
    content: 'Candidate shows potential but needs development in system architecture knowledge.',
    user: 'Mohammed Al-Faisal',
    date: '2023-11-10T12:45:00'
  },
  {
    id: 'act-026',
    candidateId: 'cand-002',
    type: 'status_change',
    content: 'Status changed from Shortlisted to Interviewed',
    user: 'Mohammed Al-Faisal',
    date: '2023-11-10T13:00:00'
  },
  {
    id: 'act-030',
    candidateId: 'cand-003',
    type: 'referral',
    content: 'Candidate referred by Sarah Williams (Product Director)',
    user: 'System',
    date: '2023-10-15T08:30:00'
  },
  {
    id: 'act-031',
    candidateId: 'cand-003',
    type: 'status_change',
    content: 'Status changed from New to Shortlisted',
    user: 'Maria Rodriguez',
    date: '2023-10-16T10:15:00'
  },
  {
    id: 'act-032',
    candidateId: 'cand-003',
    type: 'email',
    content: 'First interview invitation sent',
    user: 'Recruitment Bot',
    date: '2023-10-17T09:30:00'
  },
  {
    id: 'act-033',
    candidateId: 'cand-003',
    type: 'interview',
    content: 'Product leadership interview scheduled with Fatima Al-Zahra',
    user: 'Recruitment Bot',
    date: '2023-11-01T11:00:00'
  },
  {
    id: 'act-034',
    candidateId: 'cand-003',
    type: 'interview',
    content: 'Product leadership interview completed',
    user: 'Fatima Al-Zahra',
    date: '2023-11-05T10:30:00'
  },
  {
    id: 'act-035',
    candidateId: 'cand-003',
    type: 'note',
    content: 'Outstanding candidate with exceptional product vision and leadership skills.',
    user: 'Fatima Al-Zahra',
    date: '2023-11-05T11:00:00'
  },
  {
    id: 'act-036',
    candidateId: 'cand-003',
    type: 'status_change',
    content: 'Status changed from Shortlisted to Interviewed',
    user: 'Fatima Al-Zahra',
    date: '2023-11-05T11:15:00'
  },
  {
    id: 'act-037',
    candidateId: 'cand-003',
    type: 'status_change',
    content: 'Status changed from Interviewed to Offered',
    user: 'Maria Rodriguez',
    date: '2023-11-07T14:00:00'
  },
  {
    id: 'act-038',
    candidateId: 'cand-003',
    type: 'email',
    content: 'Offer letter sent to candidate',
    user: 'Recruitment Bot',
    date: '2023-11-07T15:30:00'
  },
  {
    id: 'act-039',
    candidateId: 'cand-003',
    type: 'email',
    content: 'Candidate accepted the offer',
    user: 'Maria Rodriguez',
    date: '2023-11-10T09:15:00'
  },
  {
    id: 'act-040',
    candidateId: 'cand-003',
    type: 'status_change',
    content: 'Status changed from Offered to Hired',
    user: 'Maria Rodriguez',
    date: '2023-11-10T09:30:00'
  },
  {
    id: 'act-050',
    candidateId: 'cand-004',
    type: 'cv_upload',
    content: 'Portfolio and resume uploaded to the system',
    user: 'System',
    date: '2023-10-18T14:20:00'
  },
  {
    id: 'act-051',
    candidateId: 'cand-004',
    type: 'status_change',
    content: 'Status changed from New to Shortlisted',
    user: 'Layla Kareem',
    date: '2023-10-22T11:30:00'
  },
  {
    id: 'act-052',
    candidateId: 'cand-004',
    type: 'email',
    content: 'Design assessment sent to candidate',
    user: 'Recruitment Bot',
    date: '2023-10-23T09:15:00'
  },
  {
    id: 'act-053',
    candidateId: 'cand-004',
    type: 'note',
    content: 'Design assessment received - quality below expectations',
    user: 'David Chen',
    date: '2023-10-26T16:45:00'
  },
  {
    id: 'act-054',
    candidateId: 'cand-004',
    type: 'interview',
    content: 'Design portfolio review scheduled with David Chen',
    user: 'Recruitment Bot',
    date: '2023-10-28T12:00:00'
  },
  {
    id: 'act-055',
    candidateId: 'cand-004',
    type: 'interview',
    content: 'Design portfolio review completed',
    user: 'David Chen',
    date: '2023-10-28T14:00:00'
  },
  {
    id: 'act-056',
    candidateId: 'cand-004',
    type: 'status_change',
    content: 'Status changed from Shortlisted to Interviewed',
    user: 'David Chen',
    date: '2023-10-28T14:15:00'
  },
  {
    id: 'act-057',
    candidateId: 'cand-004',
    type: 'status_change',
    content: 'Status changed from Interviewed to Rejected',
    user: 'Maria Rodriguez',
    date: '2023-10-30T10:00:00'
  },
  {
    id: 'act-058',
    candidateId: 'cand-004',
    type: 'email',
    content: 'Rejection email sent to candidate',
    user: 'Recruitment Bot',
    date: '2023-10-30T10:30:00'
  }
];

export const nationalities = [
  'UAE', 
  'USA', 
  'UK', 
  'Spain', 
  'China', 
  'South Korea', 
  'Oman', 
  'India', 
  'Egypt', 
  'Saudi Arabia'
];

export const sources = ['linkedin', 'portal', 'referral', 'other'];
export const stages = ['new', 'shortlisted', 'interviewed', 'offered', 'hired', 'rejected'];