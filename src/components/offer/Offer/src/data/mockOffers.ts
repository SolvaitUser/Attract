import { Offer, OfferStatus } from '../types/offer';

export const mockOffers: Offer[] = [
  {
    id: 'OFF-001',
    requisitionId: 'REQ-123',
    requisitionTitle: 'Senior Software Engineer',
    candidateId: 'CAN-456',
    candidateName: 'Ahmed Al-Farsi',
    department: 'Engineering',
    grade: 'E4',
    status: OfferStatus.Signed,
    creator: 'Sara Ahmed',
    createdAt: '2023-10-15T09:30:00Z',
    updatedAt: '2023-10-25T14:20:00Z',
    compensation: {
      baseSalary: 25000,
      housing: 8000,
      transportation: 2000,
      otherAllowances: 1500,
      bonuses: [
        { type: 'Performance', amount: 7500 },
        { type: 'Sign-on', amount: 10000 }
      ]
    },
    benefits: ['Health Insurance', '30 Days Annual Leave', 'Training Budget'],
    workingHours: '8:30 AM - 5:30 PM, Sunday to Thursday',
    contractType: 'permanent',
    probationPeriod: 3,
    approvalChain: [
      {
        id: 'APR-001',
        name: 'Mohammed Khalid',
        position: 'Engineering Manager',
        status: 'approved',
        timestamp: '2023-10-16T11:45:00Z',
        comments: 'Approved as per our discussion'
      },
      {
        id: 'APR-002',
        name: 'Layla Mahmoud',
        position: 'HR Director',
        status: 'approved',
        timestamp: '2023-10-17T09:20:00Z',
        comments: 'Salary approved within budget'
      }
    ],
    currentApprovalStep: 2,
    offerLetterEn: 'Template content for English offer letter',
    offerLetterAr: 'محتوى قالب لخطاب العرض باللغة العربية',
    communicationHistory: [
      {
        type: 'email',
        timestamp: '2023-10-18T10:00:00Z',
        content: 'We are pleased to offer you the position...',
        direction: 'outgoing'
      },
      {
        type: 'email',
        timestamp: '2023-10-19T14:30:00Z',
        content: 'Thank you for the offer. I have a few questions...',
        direction: 'incoming'
      },
      {
        type: 'whatsapp',
        timestamp: '2023-10-20T11:15:00Z',
        content: 'We have updated the offer as per our discussion',
        direction: 'outgoing'
      }
    ],
    signatureMethod: 'docusign',
    signedDocumentUrl: 'https://example.com/signed/OFF-001.pdf',
    history: [
      {
        action: 'created',
        timestamp: '2023-10-15T09:30:00Z',
        user: 'Sara Ahmed',
        details: 'Initial offer created'
      },
      {
        action: 'approved',
        timestamp: '2023-10-17T09:20:00Z',
        user: 'Layla Mahmoud',
        details: 'All approvals completed'
      },
      {
        action: 'sent',
        timestamp: '2023-10-18T10:00:00Z',
        user: 'Sara Ahmed',
        details: 'Offer sent to candidate via email'
      },
      {
        action: 'signed',
        timestamp: '2023-10-22T15:40:00Z',
        user: 'Ahmed Al-Farsi',
        details: 'Offer signed via DocuSign'
      }
    ]
  },
  {
    id: 'OFF-002',
    requisitionId: 'REQ-124',
    requisitionTitle: 'Product Manager',
    candidateId: 'CAN-789',
    candidateName: 'Nora Al-Qahtani',
    department: 'Product',
    grade: 'P3',
    status: OfferStatus.PendingApproval,
    creator: 'Tariq Hassan',
    createdAt: '2023-11-05T08:45:00Z',
    updatedAt: '2023-11-05T08:45:00Z',
    compensation: {
      baseSalary: 22000,
      housing: 7000,
      transportation: 1800,
      otherAllowances: 1200
    },
    benefits: ['Health Insurance', '25 Days Annual Leave', 'Remote Work 2 Days/Week'],
    workingHours: '9:00 AM - 6:00 PM, Sunday to Thursday',
    contractType: 'permanent',
    probationPeriod: 3,
    approvalChain: [
      {
        id: 'APR-003',
        name: 'Faisal Al-Otaibi',
        position: 'Product Director',
        status: 'approved',
        timestamp: '2023-11-06T14:20:00Z',
        comments: 'Top candidate, approve compensation'
      },
      {
        id: 'APR-004',
        name: 'Layla Mahmoud',
        position: 'HR Director',
        status: 'pending'
      }
    ],
    currentApprovalStep: 1,
    offerLetterEn: 'Template content for English offer letter',
    offerLetterAr: 'محتوى قالب لخطاب العرض باللغة العربية',
    history: [
      {
        action: 'created',
        timestamp: '2023-11-05T08:45:00Z',
        user: 'Tariq Hassan',
        details: 'Initial offer created'
      },
      {
        action: 'approved',
        timestamp: '2023-11-06T14:20:00Z',
        user: 'Faisal Al-Otaibi',
        details: 'First approval completed'
      }
    ]
  },
  {
    id: 'OFF-003',
    requisitionId: 'REQ-125',
    requisitionTitle: 'Financial Analyst',
    candidateId: 'CAN-235',
    candidateName: 'Saeed Al-Ghamdi',
    department: 'Finance',
    grade: 'F3',
    status: OfferStatus.Declined,
    creator: 'Sara Ahmed',
    createdAt: '2023-09-18T11:20:00Z',
    updatedAt: '2023-10-02T16:45:00Z',
    compensation: {
      baseSalary: 18000,
      housing: 6000,
      transportation: 1500,
      otherAllowances: 1000
    },
    benefits: ['Health Insurance', '21 Days Annual Leave'],
    workingHours: '8:00 AM - 5:00 PM, Sunday to Thursday',
    contractType: 'permanent',
    probationPeriod: 3,
    approvalChain: [
      {
        id: 'APR-005',
        name: 'Khalid Al-Sahli',
        position: 'Finance Manager',
        status: 'approved',
        timestamp: '2023-09-19T10:10:00Z'
      },
      {
        id: 'APR-006',
        name: 'Layla Mahmoud',
        position: 'HR Director',
        status: 'approved',
        timestamp: '2023-09-20T13:25:00Z'
      }
    ],
    currentApprovalStep: 2,
    offerLetterEn: 'Template content for English offer letter',
    offerLetterAr: 'محتوى قالب لخطاب العرض باللغة العربية',
    communicationHistory: [
      {
        type: 'email',
        timestamp: '2023-09-21T09:15:00Z',
        content: 'We are pleased to offer you the position...',
        direction: 'outgoing'
      },
      {
        type: 'email',
        timestamp: '2023-09-25T16:20:00Z',
        content: 'Thank you for the offer, but I have accepted another position...',
        direction: 'incoming'
      }
    ],
    history: [
      {
        action: 'created',
        timestamp: '2023-09-18T11:20:00Z',
        user: 'Sara Ahmed',
        details: 'Initial offer created'
      },
      {
        action: 'approved',
        timestamp: '2023-09-20T13:25:00Z',
        user: 'Layla Mahmoud',
        details: 'All approvals completed'
      },
      {
        action: 'sent',
        timestamp: '2023-09-21T09:15:00Z',
        user: 'Sara Ahmed',
        details: 'Offer sent to candidate via email'
      },
      {
        action: 'declined',
        timestamp: '2023-09-25T16:20:00Z',
        user: 'Saeed Al-Ghamdi',
        details: 'Candidate declined the offer'
      }
    ]
  },
  {
    id: 'OFF-004',
    requisitionId: 'REQ-128',
    requisitionTitle: 'UX Designer',
    candidateId: 'CAN-512',
    candidateName: 'Hana Al-Mansour',
    department: 'Design',
    grade: 'D2',
    status: OfferStatus.Draft,
    creator: 'Tariq Hassan',
    createdAt: '2023-11-12T14:15:00Z',
    updatedAt: '2023-11-12T14:15:00Z',
    compensation: {
      baseSalary: 17000,
      housing: 5500,
      transportation: 1200,
      otherAllowances: 800
    },
    benefits: ['Health Insurance', '21 Days Annual Leave'],
    workingHours: '9:00 AM - 6:00 PM, Sunday to Thursday',
    contractType: 'permanent',
    probationPeriod: 3,
    approvalChain: [],
    history: [
      {
        action: 'created',
        timestamp: '2023-11-12T14:15:00Z',
        user: 'Tariq Hassan',
        details: 'Initial draft created'
      }
    ]
  },
  {
    id: 'OFF-005',
    requisitionId: 'REQ-130',
    requisitionTitle: 'Marketing Specialist',
    candidateId: 'CAN-623',
    candidateName: 'Leila Al-Dosari',
    department: 'Marketing',
    grade: 'M3',
    status: OfferStatus.Sent,
    creator: 'Sara Ahmed',
    createdAt: '2023-11-08T09:45:00Z',
    updatedAt: '2023-11-10T15:30:00Z',
    compensation: {
      baseSalary: 16000,
      housing: 5000,
      transportation: 1200,
      otherAllowances: 800
    },
    benefits: ['Health Insurance', '21 Days Annual Leave', 'Flexible Hours'],
    workingHours: '9:00 AM - 6:00 PM, Sunday to Thursday',
    contractType: 'permanent',
    probationPeriod: 3,
    approvalChain: [
      {
        id: 'APR-007',
        name: 'Amal Al-Harbi',
        position: 'Marketing Director',
        status: 'approved',
        timestamp: '2023-11-09T10:20:00Z'
      },
      {
        id: 'APR-008',
        name: 'Layla Mahmoud',
        position: 'HR Director',
        status: 'approved',
        timestamp: '2023-11-10T11:05:00Z'
      }
    ],
    currentApprovalStep: 2,
    offerLetterEn: 'Template content for English offer letter',
    offerLetterAr: 'محتوى قالب لخطاب العرض باللغة العربية',
    communicationHistory: [
      {
        type: 'email',
        timestamp: '2023-11-10T15:30:00Z',
        content: 'We are pleased to offer you the position...',
        direction: 'outgoing'
      }
    ],
    history: [
      {
        action: 'created',
        timestamp: '2023-11-08T09:45:00Z',
        user: 'Sara Ahmed',
        details: 'Initial offer created'
      },
      {
        action: 'approved',
        timestamp: '2023-11-10T11:05:00Z',
        user: 'Layla Mahmoud',
        details: 'All approvals completed'
      },
      {
        action: 'sent',
        timestamp: '2023-11-10T15:30:00Z',
        user: 'Sara Ahmed',
        details: 'Offer sent to candidate via email'
      }
    ]
  }
];

export const mockCandidates = [
  { id: 'CAN-456', name: 'Ahmed Al-Farsi' },
  { id: 'CAN-789', name: 'Nora Al-Qahtani' },
  { id: 'CAN-235', name: 'Saeed Al-Ghamdi' },
  { id: 'CAN-512', name: 'Hana Al-Mansour' },
  { id: 'CAN-623', name: 'Leila Al-Dosari' },
  { id: 'CAN-724', name: 'Omar Hakeem' },
  { id: 'CAN-835', name: 'Fatima Al-Shehri' },
  { id: 'CAN-946', name: 'Abdullah Al-Rashid' }
];

export const mockRequisitions = [
  { id: 'REQ-123', title: 'Senior Software Engineer', department: 'Engineering', grade: 'E4' },
  { id: 'REQ-124', title: 'Product Manager', department: 'Product', grade: 'P3' },
  { id: 'REQ-125', title: 'Financial Analyst', department: 'Finance', grade: 'F3' },
  { id: 'REQ-128', title: 'UX Designer', department: 'Design', grade: 'D2' },
  { id: 'REQ-130', title: 'Marketing Specialist', department: 'Marketing', grade: 'M3' },
  { id: 'REQ-131', title: 'Front-end Developer', department: 'Engineering', grade: 'E3' },
  { id: 'REQ-132', title: 'HR Specialist', department: 'Human Resources', grade: 'H2' }
];

export const mockStatistics = {
  totalOffers: 28,
  offersSent: 22,
  offersApproved: 25,
  offersSigned: 18,
  offersExpiredOrDeclined: 7,
  avgTimeToSign: 3.5,
  aiInsights: {
    approvalBlockers: [
      { reason: 'Salary above budget', count: 8 },
      { reason: 'Missing approver documentation', count: 5 },
      { reason: 'Non-standard benefits', count: 3 }
    ],
    negotiationRequests: [
      { request: 'Higher base salary', count: 12 },
      { request: 'Additional annual leave', count: 7 },
      { request: 'Remote work options', count: 5 }
    ]
  }
};
