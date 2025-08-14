import React from 'react';
import { 
  Input, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem, 
  Button,
  Select,
  SelectItem
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../context/OfferContext';
import { useLanguage } from '../../../context/LanguageContext';
import { OfferStatus } from '../../../types/offer';
import { mockRequisitions } from '../../../data/mockOffers';

export const OfferFilters: React.FC = () => {
  const { filters, setFilters, resetFilters } = useOffers();
  const { t } = useLanguage();
  
  const handleSearchChange = (value: string) => {
    setFilters({ searchQuery: value });
  };

  const handleStatusChange = (value: OfferStatus | 'all') => {
    setFilters({ status: value });
  };
  
  return (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        <div className="w-full lg:w-1/3">
          <Input
            label={t('search_offers')}
            placeholder={t('search_by_candidate_or_title')}
            startContent={<Icon icon="lucide:search" className="text-gray-400" />}
            value={filters.searchQuery}
            onValueChange={handleSearchChange}
            variant="bordered"
            size="md"
          />
        </div>
        
        <div className="w-full lg:w-1/4">
          <Select
            label={t('status')}
            placeholder={t('select_status')}
            selectedKeys={[filters.status]}
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as OfferStatus | 'all';
              handleStatusChange(key);
            }}
            variant="bordered"
          >
            <SelectItem key="all">{t('all_statuses')}</SelectItem>
            <SelectItem key={OfferStatus.Draft}>{t('draft')}</SelectItem>
            <SelectItem key={OfferStatus.PendingApproval}>{t('pending_approval')}</SelectItem>
            <SelectItem key={OfferStatus.Approved}>{t('approved')}</SelectItem>
            <SelectItem key={OfferStatus.Rejected}>{t('rejected')}</SelectItem>
            <SelectItem key={OfferStatus.Sent}>{t('sent')}</SelectItem>
            <SelectItem key={OfferStatus.Signed}>{t('signed')}</SelectItem>
            <SelectItem key={OfferStatus.Declined}>{t('declined')}</SelectItem>
            <SelectItem key={OfferStatus.Expired}>{t('expired')}</SelectItem>
          </Select>
        </div>
        
        <div className="w-full lg:w-1/4">
          <Select
            label={t('job_requisition')}
            placeholder={t('select_requisition')}
            variant="bordered"
            onSelectionChange={(keys) => {
              const key = Array.from(keys)[0] as string;
              setFilters({ requisitionId: key || null });
            }}
          >
            {mockRequisitions.map((req) => (
              <SelectItem key={req.id} textValue={req.title}>
                {req.title} ({req.id})
              </SelectItem>
            ))}
          </Select>
        </div>
        
        <div className="flex gap-2 self-end">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="bordered" 
                startContent={<Icon icon="lucide:sliders-horizontal" />}
              >
                {t('more_filters')}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Filter options">
              <DropdownItem key="date">{t('date_range')}</DropdownItem>
              <DropdownItem key="creator">{t('creator')}</DropdownItem>
              <DropdownItem key="department">{t('department')}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          <Button 
            variant="light" 
            onPress={resetFilters}
            startContent={<Icon icon="lucide:refresh-cw" />}
          >
            {t('reset')}
          </Button>
        </div>
      </div>
    </div>
  );
};