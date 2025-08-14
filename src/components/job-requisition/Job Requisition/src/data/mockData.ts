export const mockJobRequisitions = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5+ years",
      salary: { min: 90000, max: 130000, currency: "USD" },
      description: "We are looking for an experienced Frontend Developer...",
      requirements: [
        "5+ years of experience with modern JavaScript frameworks",
        "Strong understanding of React, Vue, or Angular",
        "Experience with state management solutions"
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Collaborate with UX designers and backend developers",
        "Write clean, maintainable code"
      ],
      skills: ["JavaScript", "React", "HTML/CSS", "TypeScript"],
      status: "Published",
      approvers: ["2", "5"],
      createdBy: "4",
      createdAt: "2023-08-15T10:30:00Z",
      updatedAt: "2023-08-17T14:20:00Z",
      publishedAt: "2023-08-18T09:15:00Z",
      publishedTo: ["internal", "linkedin", "indeed"]
    },
    {
      id: "2",
      title: "Marketing Specialist",
      department: "Marketing",
      location: "New York",
      type: "Full-time",
      experience: "3+ years",
      salary: { min: 65000, max: 85000, currency: "USD" },
      description: "We are looking for a Marketing Specialist to join our growing team...",
      requirements: [
        "Bachelor's degree in Marketing or related field",
        "3+ years of experience in digital marketing",
        "Strong analytical skills"
      ],
      responsibilities: [
        "Create and manage marketing campaigns",
        "Analyze marketing data and metrics",
        "Develop content strategy"
      ],
      skills: ["SEO", "Content Marketing", "Social Media Management", "Analytics"],
      status: "Pending Approval",
      approvers: ["2", "3"],
      currentApprover: "2",
      createdBy: "4",
      createdAt: "2023-09-05T08:45:00Z",
      updatedAt: "2023-09-05T08:45:00Z"
    },
    {
      id: "3",
      title: "Product Manager",
      department: "Product",
      location: "San Francisco",
      type: "Full-time",
      experience: "4+ years",
      salary: { min: 100000, max: 140000, currency: "USD" },
      description: "We are seeking an experienced Product Manager to lead our product development efforts...",
      requirements: [
        "4+ years of experience in product management",
        "Strong technical background",
        "Experience with agile methodologies"
      ],
      responsibilities: [
        "Define product vision and strategy",
        "Work with engineering to deliver features",
        "Gather and prioritize requirements"
      ],
      skills: ["Product Management", "Agile", "User Stories", "Roadmapping"],
      status: "Draft",
      approvers: [],
      createdBy: "1",
      createdAt: "2023-09-10T15:20:00Z",
      updatedAt: "2023-09-10T15:20:00Z"
    },
    {
      id: "4",
      title: "HR Coordinator",
      department: "HR",
      location: "London",
      type: "Full-time",
      experience: "1-3 years",
      salary: { min: 45000, max: 55000, currency: "GBP" },
      description: "We are looking for an HR Coordinator to support our HR department...",
      requirements: [
        "Bachelor's degree in Human Resources or related field",
        "1-3 years of experience in HR",
        "Knowledge of HR practices and procedures"
      ],
      responsibilities: [
        "Assist with recruitment and onboarding",
        "Maintain employee records",
        "Support HR initiatives"
      ],
      skills: ["HR Administration", "Recruitment", "Onboarding", "HRIS"],
      status: "Approved",
      approvers: ["5", "3"],
      createdBy: "2",
      createdAt: "2023-09-01T09:30:00Z",
      updatedAt: "2023-09-03T11:45:00Z"
    },
    {
      id: "5",
      title: "Full Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Contract",
      experience: "3+ years",
      salary: { min: 80000, max: 110000, currency: "USD" },
      description: "We are seeking a Full Stack Developer to work on our web applications...",
      requirements: [
        "3+ years of experience in full stack development",
        "Proficiency in JavaScript/TypeScript",
        "Experience with Node.js and React"
      ],
      responsibilities: [
        "Develop and maintain web applications",
        "Work on both frontend and backend",
        "Optimize application performance"
      ],
      skills: ["JavaScript", "TypeScript", "Node.js", "React", "MongoDB"],
      status: "Published",
      approvers: ["2"],
      createdBy: "1",
      createdAt: "2023-08-20T14:00:00Z",
      updatedAt: "2023-08-22T10:30:00Z",
      publishedAt: "2023-08-23T09:00:00Z",
      publishedTo: ["internal", "linkedin", "indeed", "taqat"]
    },
    {
      id: "6",
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: { min: 70000, max: 90000, currency: "USD" },
      description: "We are looking for a talented UX/UI Designer to join our team...",
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency with design tools like Figma or Sketch",
        "Strong portfolio demonstrating user-centered design"
      ],
      responsibilities: [
        "Create user-centered designs for web and mobile applications",
        "Conduct user research and usability testing",
        "Collaborate with product managers and developers"
      ],
      skills: ["UI Design", "UX Research", "Wireframing", "Prototyping", "Design Systems"],
      status: "Draft",
      approvers: [],
      createdBy: "4",
      createdAt: "2023-09-10T11:15:00Z",
      updatedAt: "2023-09-10T11:15:00Z"
    },
    {
      id: "7",
      title: "DevOps Engineer",
      department: "Engineering",
      location: "San Francisco",
      type: "Full-time",
      experience: "4+ years",
      salary: { min: 110000, max: 150000, currency: "USD" },
      description: "We are seeking a DevOps Engineer to improve our infrastructure and deployment processes...",
      requirements: [
        "4+ years of experience in DevOps or SRE roles",
        "Experience with cloud platforms (AWS, GCP, or Azure)",
        "Proficiency with infrastructure as code tools"
      ],
      responsibilities: [
        "Design and implement CI/CD pipelines",
        "Manage cloud infrastructure",
        "Optimize application performance and reliability"
      ],
      skills: ["Docker", "Kubernetes", "Terraform", "AWS", "CI/CD", "Monitoring"],
      status: "Approved",
      approvers: ["2"],
      createdBy: "1",
      createdAt: "2023-09-02T13:45:00Z",
      updatedAt: "2023-09-05T09:30:00Z"
    },
    {
      id: "JR001",
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      experience: "5-7 years",
      status: "Published",
      createdAt: "2023-09-01T10:30:00Z",
      createdBy: {
        id: "1",
        name: "John Doe",
        avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
      },
      description: "We are looking for an experienced Software Engineer to join our team...",
      requirements: [
        "5+ years of experience in frontend development",
        "Strong knowledge of React and TypeScript",
        "Experience with state management libraries",
        "Excellent communication skills",
        "Bachelor's degree in Computer Science or related field"
      ],
      responsibilities: [
        "Develop new features for our product",
        "Collaborate with designers and product managers",
        "Optimize application for maximum performance",
        "Write clean, maintainable code",
        "Participate in code reviews"
      ],
      skills: ["React", "TypeScript", "JavaScript", "GraphQL", "CSS", "Git"],
      salary: { min: 120000, max: 160000, currency: "USD" },
      linkedWorkforceRequestId: "WF001",
      numberOfVacancies: 2
    }
  ];

export const users = [
    { id: "1", name: "John Doe", role: "HR Manager", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
    { id: "2", name: "Jane Smith", role: "Department Head", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2" },
    { id: "3", name: "Michael Brown", role: "CEO", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3" },
    { id: "4", name: "Sarah Lee", role: "HR Specialist", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4" },
    { id: "5", name: "David Wilson", role: "HR Director", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5" },
  ];

export const workforceRequests = [
  {
    id: "WF001",
    title: "Senior Software Engineer",
    department: "Engineering",
    description: "We need to hire a senior software engineer with strong backend experience to support our growing platform team.",
    numberOfVacancies: 2,
    workLocation: "Remote",
    salaryRange: { min: 110000, max: 150000, currency: "USD" },
    responsibilities: [
      "Design and implement scalable backend services",
      "Lead technical discussions and mentor junior developers",
      "Collaborate with product managers to define requirements"
    ],
    keyTasks: [
      "Develop new API endpoints using Node.js and TypeScript",
      "Implement database optimization strategies",
      "Create technical documentation for the platform"
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience with backend development",
      "Strong knowledge of distributed systems"
    ],
    skills: ["Node.js", "TypeScript", "MongoDB", "Redis", "AWS", "Docker"]
  },
  {
    id: "WF002",
    title: "UX/UI Designer",
    department: "Design",
    description: "We're looking for a talented UX/UI Designer to help us create intuitive and engaging user experiences across our digital products.",
    numberOfVacancies: 1,
    workLocation: "San Francisco",
    salaryRange: { min: 85000, max: 120000, currency: "USD" },
    responsibilities: [
      "Create user-centered designs for web and mobile applications",
      "Conduct user research and usability testing",
      "Develop and maintain the company design system"
    ],
    keyTasks: [
      "Design wireframes and prototypes using Figma",
      "Collaborate with developers to ensure design implementation",
      "Conduct user testing and iterate based on feedback"
    ],
    qualifications: [
      "Bachelor's degree in Design, HCI, or related field",
      "3+ years of experience in UX/UI design",
      "Strong portfolio demonstrating user-centered design"
    ],
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"]
  },
  {
    id: "WF003",
    title: "Marketing Manager",
    department: "Marketing",
    description: "We're seeking an experienced Marketing Manager to lead our digital marketing initiatives and drive brand awareness.",
    numberOfVacancies: 1,
    workLocation: "New York",
    salaryRange: { min: 90000, max: 130000, currency: "USD" },
    responsibilities: [
      "Develop and execute comprehensive marketing strategies",
      "Manage digital marketing campaigns across multiple channels",
      "Analyze marketing performance metrics and optimize campaigns"
    ],
    keyTasks: [
      "Create and manage content calendar for social media and blog",
      "Collaborate with creative team on brand assets",
      "Manage marketing budget and track ROI"
    ],
    qualifications: [
      "Bachelor's degree in Marketing, Business, or related field",
      "5+ years of experience in digital marketing",
      "Proven track record of successful marketing campaigns"
    ],
    skills: ["Digital Marketing", "SEO/SEM", "Social Media Marketing", "Content Strategy", "Analytics"]
  }
];

export const mockWorkforceRequests = [
  {
    id: "wf-001",
    title: "Senior Software Engineer",
    department: "Engineering",
    description: "We need an experienced software engineer with strong frontend skills.",
    location: "San Francisco, CA",
    numberOfVacancies: 2,
    status: "Approved",
    salaryRange: { min: 120000, max: 150000, currency: "USD" },
    responsibilities: [
      "Develop and maintain web applications",
      "Work with product managers to design new features",
      "Mentor junior developers"
    ],
    keyTasks: [
      "Write clean, maintainable code",
      "Perform code reviews",
      "Troubleshoot and fix bugs"
    ],
    qualifications: [
      "Bachelor's degree in Computer Science or related field",
      "5+ years of experience in software development",
      "Strong knowledge of JavaScript and modern frameworks"
    ],
    skills: ["React", "TypeScript", "Node.js", "GraphQL"]
  },
  {
    id: "wf-002",
    title: "HR Manager",
    department: "Human Resources",
    description: "Looking for an experienced HR manager to oversee talent acquisition and employee relations.",
    location: "New York, NY",
    numberOfVacancies: 1,
    status: "Approved",
    salaryRange: { min: 90000, max: 120000, currency: "USD" },
    responsibilities: [
      "Manage recruitment and onboarding processes",
      "Handle employee relations and concerns",
      "Develop HR policies and procedures"
    ],
    keyTasks: [
      "Conduct interviews and assess candidates",
      "Manage performance review process",
      "Ensure compliance with labor laws"
    ],
    qualifications: [
      "Bachelor's degree in Human Resources or related field",
      "3+ years of experience in HR management",
      "Knowledge of employment law and HR best practices"
    ],
    skills: ["Recruitment", "Employee Relations", "Performance Management", "HRIS"]
  }
];