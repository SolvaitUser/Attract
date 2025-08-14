import React from 'react';
import { OfferDashboard } from './OfferDashboard';
import { OfferFilters } from './OfferFilters';
import { OffersList } from './OffersList';
import { OfferWizard } from './OfferWizard';
import { OfferDetails } from './OfferDetails';
import { Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../context/LanguageContext';
import { useOffers } from '../../../context/OfferContext';

const OfferTabContent: React.FC = () => {
  const { t } = useLanguage();
  const { viewMode, createOffer } = useOffers();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        
      </div>
      
      {viewMode === 'list' && (
        <>
          <OfferDashboard />
          <OfferFilters />
          <OffersList />
        </>
      )}
      
      {viewMode === 'wizard' && <OfferWizard />}
      
      {viewMode === 'details' && <OfferDetails />}
    </div>
  );
};

export default OfferTabContent;