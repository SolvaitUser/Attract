export interface JobRequisition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  status: 'open' | 'closed' | 'on-hold';
  datePosted: string;
  candidateCount?: number;
}

export const mockJobRequisitions: JobRequisition[] = [
  {
    id: 'job-001',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Dubai, UAE',
    type: 'full-time',
    status: 'open',
    datePosted: '2023-10-15',
    candidateCount: 12
  },
  {
    id: 'job-002',
    title: 'Product Manager',
    department: 'Product',
    location: 'Riyadh, KSA',
    type: 'full-time',
    status: 'open',
    datePosted: '2023-10-20',
    candidateCount: 8
  },
  {
    id: 'job-003',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'full-time',
    status: 'open',
    datePosted: '2023-11-01',
    candidateCount: 15
  },
  {
    id: 'job-004',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Dubai, UAE',
    type: 'full-time',
    status: 'open',
    datePosted: '2023-11-05',
    candidateCount: 6
  },
  {
    id: 'job-005',
    title: 'Customer Support Representative',
    department: 'Customer Service',
    location: 'Cairo, Egypt',
    type: 'full-time',
    status: 'open',
    datePosted: '2023-11-10',
    candidateCount: 9
  }
];
