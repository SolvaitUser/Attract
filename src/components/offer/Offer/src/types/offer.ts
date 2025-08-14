export enum OfferStatus {
  Draft = 'draft',
  PendingApproval = 'pending_approval',
  Approved = 'approved',
  Rejected = 'rejected',
  Sent = 'sent',
  Signed = 'signed',
  Declined = 'declined',
  Expired = 'expired'
}

export interface Approver {
  id: string;
  name: string;
  position: string;
  status: 'pending' | 'approved' | 'rejected';
  timestamp?: string;
  comments?: string;
}

export interface OfferHistory {
  action: 'created' | 'edited' | 'approved' | 'rejected' | 'sent' | 'signed' | 'declined';
  timestamp: string;
  user: string;
  details?: string;
}

export interface CommunicationEntry {
  type: 'email' | 'whatsapp' | 'sms' | 'portal';
  timestamp: string;
  content: string;
  direction: 'outgoing' | 'incoming';
}

export interface Compensation {
  baseSalary: number;
  housing: number;
  transportation: number;
  otherAllowances: number;
  bonuses?: {
    type: string;
    amount: number;
  }[];
}

export interface Offer {
  id: string;
  requisitionId: string;
  requisitionTitle: string;
  candidateId: string;
  candidateName: string;
  department: string;
  grade: string;
  status: OfferStatus;
  creator: string;
  createdAt: string;
  updatedAt: string;
  compensation: Compensation;
  benefits: string[];
  workingHours: string;
  contractType: 'permanent' | 'temporary' | 'contract';
  probationPeriod: number;
  approvalChain: Approver[];
  currentApprovalStep?: number;
  offerLetterEn?: string;
  offerLetterAr?: string;
  communicationHistory?: CommunicationEntry[];
  signatureMethod?: 'docusign' | 'adobesign' | 'manual';
  signedDocumentUrl?: string;
  docusignSettings?: {
    recipients: Array<{
      name: string;
      email: string;
      role: 'signer' | 'cc';
    }>;
    expiryDays: string;
    reminderFrequency: string;
    language: 'recipient' | 'en' | 'ar' | 'both';
    watermark: boolean;
    emailMessage: string;
    envelopeId?: string;
    status?: 'created' | 'sent' | 'delivered' | 'signed' | 'completed' | 'declined' | 'voided';
  };
  history: OfferHistory[];
}

export interface OfferFilters {
  status: OfferStatus | 'all';
  requisitionId: string | null;
  candidateName: string | null;
  dateRange: {
    start: string | null;
    end: string | null;
  };
  creator: string | null;
  searchQuery: string;
}

export interface OfferStatistics {
  totalOffers: number;
  offersSent: number;
  offersApproved: number;
  offersSigned: number;
  offersExpiredOrDeclined: number;
  avgTimeToSign: number; // in days
  aiInsights: {
    approvalBlockers: { reason: string; count: number }[];
    negotiationRequests: { request: string; count: number }[];
  };
}

export interface WizardState {
  currentStep: number;
  offer: Partial<Offer>;
  isDirty: boolean;
  errors: Record<string, string>;
  isValid: boolean;
}