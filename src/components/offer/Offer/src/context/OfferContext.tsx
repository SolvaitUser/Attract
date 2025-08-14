import React from 'react';
import { 
  Offer, 
  OfferStatus, 
  OfferFilters,
  OfferStatistics,
  WizardState
} from '../types/offer';
import { mockOffers, mockStatistics } from '../data/mockOffers';

interface OfferContextType {
  offers: Offer[];
  statistics: OfferStatistics;
  filters: OfferFilters;
  viewMode: 'list' | 'wizard' | 'details';
  selectedOfferId: string | null;
  wizardState: WizardState;
  setViewMode: (mode: 'list' | 'wizard' | 'details') => void;
  setFilters: (filters: Partial<OfferFilters>) => void;
  resetFilters: () => void;
  selectOffer: (id: string | null) => void;
  createOffer: () => void;
  editOffer: (id: string) => void;
  saveOffer: (offer: Partial<Offer>) => void;
  deleteOffer: (id: string) => Promise<boolean>;
  duplicateOffer: (id: string) => void;
  updateOfferStatus: (id: string, status: OfferStatus) => void;
  setWizardStep: (step: number) => void;
  updateWizardData: (data: Partial<Offer>) => void;
}

const defaultFilters: OfferFilters = {
  status: 'all',
  requisitionId: null,
  candidateName: null,
  dateRange: { start: null, end: null },
  creator: null,
  searchQuery: ''
};

const defaultWizardState: WizardState = {
  currentStep: 1,
  offer: {},
  isDirty: false,
  errors: {},
  isValid: false
};

export const OfferContext = React.createContext<OfferContextType>({
  offers: [],
  statistics: mockStatistics,
  filters: defaultFilters,
  viewMode: 'list',
  selectedOfferId: null,
  wizardState: defaultWizardState,
  setViewMode: () => {},
  setFilters: () => {},
  resetFilters: () => {},
  selectOffer: () => {},
  createOffer: () => {},
  editOffer: () => {},
  saveOffer: () => {},
  deleteOffer: async () => false,
  duplicateOffer: () => {},
  updateOfferStatus: () => {},
  setWizardStep: () => {},
  updateWizardData: () => {}
});

export const OfferProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [offers, setOffers] = React.useState<Offer[]>(mockOffers);
  const [statistics] = React.useState<OfferStatistics>(mockStatistics);
  const [filters, setFilters] = React.useState<OfferFilters>(defaultFilters);
  const [viewMode, setViewMode] = React.useState<'list' | 'wizard' | 'details'>('list');
  const [selectedOfferId, setSelectedOfferId] = React.useState<string | null>(null);
  const [wizardState, setWizardState] = React.useState<WizardState>(defaultWizardState);

  const updateFilters = (newFilters: Partial<OfferFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetAllFilters = () => {
    setFilters(defaultFilters);
  };

  const selectOffer = (id: string | null) => {
    setSelectedOfferId(id);
    if (id) {
      setViewMode('details');
    }
  };

  const createOffer = () => {
    setWizardState({
      ...defaultWizardState,
      offer: {
        status: OfferStatus.Draft,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        creator: 'Current User', // In a real app, would come from authentication
        history: [{
          action: 'created',
          timestamp: new Date().toISOString(),
          user: 'Current User',
          details: 'Initial draft created'
        }],
        approvalChain: [],
        benefits: [],
        compensation: {
          baseSalary: 0,
          housing: 0,
          transportation: 0,
          otherAllowances: 0
        }
      }
    });
    setViewMode('wizard');
  };

  const editOffer = (id: string) => {
    const offerToEdit = offers.find(o => o.id === id);
    if (offerToEdit) {
      setWizardState({
        currentStep: 1,
        offer: { ...offerToEdit },
        isDirty: false,
        errors: {},
        isValid: true
      });
      setViewMode('wizard');
    }
  };

  const saveOffer = (offerData: Partial<Offer>) => {
    const now = new Date().toISOString();
    
    if (offerData.id) {
      // Update existing offer
      setOffers(prevOffers => 
        prevOffers.map(offer => 
          offer.id === offerData.id 
            ? { 
                ...offer, 
                ...offerData, 
                updatedAt: now,
                history: [
                  ...offer.history,
                  {
                    action: 'edited',
                    timestamp: now,
                    user: 'Current User',
                    details: 'Offer updated'
                  }
                ]
              } 
            : offer
        )
      );
    } else {
      // Create new offer
      const newOffer: Offer = {
        id: `OFF-${String(offers.length + 1).padStart(3, '0')}`,
        requisitionId: offerData.requisitionId || '',
        requisitionTitle: offerData.requisitionTitle || '',
        candidateId: offerData.candidateId || '',
        candidateName: offerData.candidateName || '',
        department: offerData.department || '',
        grade: offerData.grade || '',
        status: offerData.status || OfferStatus.Draft,
        creator: 'Current User',
        createdAt: now,
        updatedAt: now,
        compensation: offerData.compensation || {
          baseSalary: 0,
          housing: 0,
          transportation: 0,
          otherAllowances: 0
        },
        benefits: offerData.benefits || [],
        workingHours: offerData.workingHours || '',
        contractType: offerData.contractType || 'permanent',
        probationPeriod: offerData.probationPeriod || 3,
        approvalChain: offerData.approvalChain || [],
        history: [
          {
            action: 'created',
            timestamp: now,
            user: 'Current User',
            details: 'Initial offer created'
          }
        ]
      };
      
      setOffers(prevOffers => [...prevOffers, newOffer]);
    }
    
    setViewMode('list');
  };

  const deleteOffer = async (id: string): Promise<boolean> => {
    // In a real app, would make an API call
    
    // Only allow deleting draft offers
    const offerToDelete = offers.find(o => o.id === id);
    if (!offerToDelete || offerToDelete.status !== OfferStatus.Draft) {
      return false;
    }
    
    setOffers(prevOffers => prevOffers.filter(offer => offer.id !== id));
    return true;
  };

  const duplicateOffer = (id: string) => {
    const offerToDuplicate = offers.find(o => o.id === id);
    if (offerToDuplicate) {
      const now = new Date().toISOString();
      const duplicatedOffer: Offer = {
        ...offerToDuplicate,
        id: `OFF-${String(offers.length + 1).padStart(3, '0')}`,
        status: OfferStatus.Draft,
        createdAt: now,
        updatedAt: now,
        history: [
          {
            action: 'created',
            timestamp: now,
            user: 'Current User',
            details: `Duplicated from ${offerToDuplicate.id}`
          }
        ]
      };
      
      setOffers(prevOffers => [...prevOffers, duplicatedOffer]);
    }
  };

  const updateOfferStatus = (id: string, status: OfferStatus) => {
    const now = new Date().toISOString();
    
    setOffers(prevOffers => 
      prevOffers.map(offer => {
        if (offer.id === id) {
          const statusAction = getActionFromStatus(status);
          
          return {
            ...offer,
            status,
            updatedAt: now,
            history: [
              ...offer.history,
              {
                action: statusAction,
                timestamp: now,
                user: 'Current User',
                details: `Status updated to ${status}`
              }
            ]
          };
        }
        return offer;
      })
    );
  };

  const getActionFromStatus = (status: OfferStatus): OfferHistory['action'] => {
    switch (status) {
      case OfferStatus.Approved:
        return 'approved';
      case OfferStatus.Rejected:
        return 'rejected';
      case OfferStatus.Sent:
        return 'sent';
      case OfferStatus.Signed:
        return 'signed';
      case OfferStatus.Declined:
        return 'declined';
      default:
        return 'edited';
    }
  };

  const setWizardStep = (step: number) => {
    setWizardState(prev => ({
      ...prev,
      currentStep: step
    }));
  };

  const updateWizardData = (data: Partial<Offer>) => {
    setWizardState(prev => ({
      ...prev,
      offer: { ...prev.offer, ...data },
      isDirty: true
    }));
  };

  const value = {
    offers,
    statistics,
    filters,
    viewMode,
    selectedOfferId,
    wizardState,
    setViewMode,
    setFilters: updateFilters,
    resetFilters: resetAllFilters,
    selectOffer,
    createOffer,
    editOffer,
    saveOffer,
    deleteOffer,
    duplicateOffer,
    updateOfferStatus,
    setWizardStep,
    updateWizardData
  };

  return (
    <OfferContext.Provider value={value}>
      {children}
    </OfferContext.Provider>
  );
};

export const useOffers = () => {
  const context = React.useContext(OfferContext);
  if (!context) {
    throw new Error('useOffers must be used within an OfferProvider');
  }
  return context;
};
