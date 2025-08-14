import React from 'react';
import { Input, Select, SelectItem, Chip, Accordion, AccordionItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../../context/OfferContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { mockCandidates, mockRequisitions } from '../../../../data/mockOffers';

export const Step1Setup: React.FC = () => {
  const { wizardState, updateWizardData } = useOffers();
  const { t, direction } = useLanguage();
  const { offer } = wizardState;
  
  // Auto-fill job details when requisition is selected
  const handleRequisitionChange = (keys: any) => {
    const requisitionId = Array.from(keys)[0] as string;
    const selectedReq = mockRequisitions.find(req => req.id === requisitionId);
    
    if (selectedReq) {
      updateWizardData({
        requisitionId: selectedReq.id,
        requisitionTitle: selectedReq.title,
        department: selectedReq.department,
        grade: selectedReq.grade
      });
    }
  };
  
  const handleCandidateChange = (keys: any) => {
    const candidateId = Array.from(keys)[0] as string;
    const selectedCandidate = mockCandidates.find(c => c.id === candidateId);
    
    if (selectedCandidate) {
      updateWizardData({
        candidateId: selectedCandidate.id,
        candidateName: selectedCandidate.name
      });
    }
  };
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{t('basic_information')}</h3>
          
          <div className="space-y-4">
            <Select
              label={t('job_requisition')}
              placeholder={t('select_requisition')}
              selectedKeys={offer.requisitionId ? [offer.requisitionId] : []}
              onSelectionChange={handleRequisitionChange}
              variant="bordered"
              isRequired
            >
              {mockRequisitions.map((req) => (
                <SelectItem key={req.id} textValue={req.title}>
                  {req.title} ({req.id})
                </SelectItem>
              ))}
            </Select>
            
            <Select
              label={t('candidate')}
              placeholder={t('select_candidate')}
              selectedKeys={offer.candidateId ? [offer.candidateId] : []}
              onSelectionChange={handleCandidateChange}
              variant="bordered"
              isRequired
            >
              {mockCandidates.map((candidate) => (
                <SelectItem key={candidate.id} textValue={candidate.name}>
                  {candidate.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">{t('job_details')}</h3>
          
          <div className="space-y-4">
            <Input
              label={t('job_title')}
              placeholder={t('job_title_placeholder')}
              value={offer.requisitionTitle || ''}
              onValueChange={(value) => updateWizardData({ requisitionTitle: value })}
              variant="bordered"
              isReadOnly
            />
            
            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('department')}
                placeholder={t('department_placeholder')}
                value={offer.department || ''}
                onValueChange={(value) => updateWizardData({ department: value })}
                variant="bordered"
                isReadOnly
              />
              
              <Input
                label={t('grade')}
                placeholder={t('grade_placeholder')}
                value={offer.grade || ''}
                onValueChange={(value) => updateWizardData({ grade: value })}
                variant="bordered"
                isReadOnly
              />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">{t('compensation_and_benefits')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Input
              type="number"
              min="0"
              label={t('base_salary_sar')}
              placeholder="0.00"
              value={offer.compensation?.baseSalary?.toString() || ''}
              onValueChange={(value) => {
                const compensation = { ...offer.compensation, baseSalary: Number(value) || 0 };
                updateWizardData({ compensation });
              }}
              variant="bordered"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">SAR</span>
                </div>
              }
            />
            
            <Input
              type="number"
              min="0"
              label={t('housing_allowance_sar')}
              placeholder="0.00"
              value={offer.compensation?.housing?.toString() || ''}
              onValueChange={(value) => {
                const compensation = { ...offer.compensation, housing: Number(value) || 0 };
                updateWizardData({ compensation });
              }}
              variant="bordered"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">SAR</span>
                </div>
              }
            />
            
            <Input
              type="number"
              min="0"
              label={t('transportation_allowance_sar')}
              placeholder="0.00"
              value={offer.compensation?.transportation?.toString() || ''}
              onValueChange={(value) => {
                const compensation = { ...offer.compensation, transportation: Number(value) || 0 };
                updateWizardData({ compensation });
              }}
              variant="bordered"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">SAR</span>
                </div>
              }
            />
            
            <Input
              type="number"
              min="0"
              label={t('other_allowances_sar')}
              placeholder="0.00"
              value={offer.compensation?.otherAllowances?.toString() || ''}
              onValueChange={(value) => {
                const compensation = { ...offer.compensation, otherAllowances: Number(value) || 0 };
                updateWizardData({ compensation });
              }}
              variant="bordered"
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">SAR</span>
                </div>
              }
            />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h4 className="text-sm font-medium mb-2">{t('ai_suggested_compensation')}</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('base_salary')}</span>
                  <span className="font-medium">SAR 20,000 - 23,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('housing')}</span>
                  <span className="font-medium">SAR 6,000 - 8,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('transportation')}</span>
                  <span className="font-medium">SAR 1,500 - 2,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">{t('total_package')}</span>
                  <span className="font-medium">SAR 27,500 - 33,000</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {t('ai_suggestion_based_on')}
                </div>
              </div>
            </div>
            
            <Select
              label={t('contract_type')}
              placeholder={t('select_contract_type')}
              selectedKeys={offer.contractType ? [offer.contractType] : []}
              onSelectionChange={(keys) => {
                const contractType = Array.from(keys)[0] as 'permanent' | 'temporary' | 'contract';
                updateWizardData({ contractType });
              }}
              variant="bordered"
            >
              <SelectItem key="permanent">{t('permanent')}</SelectItem>
              <SelectItem key="temporary">{t('temporary')}</SelectItem>
              <SelectItem key="contract">{t('contract')}</SelectItem>
            </Select>
            
            <Input
              type="number"
              min="0"
              max="12"
              label={t('probation_period_months')}
              placeholder="3"
              value={offer.probationPeriod?.toString() || '3'}
              onValueChange={(value) => updateWizardData({ probationPeriod: Number(value) || 3 })}
              variant="bordered"
            />
            
            <Input
              label={t('working_hours')}
              placeholder={t('working_hours_placeholder')}
              value={offer.workingHours || ''}
              onValueChange={(value) => updateWizardData({ workingHours: value })}
              variant="bordered"
            />
          </div>
        </div>
      </div>
      
      <Accordion variant="splitted">
        <AccordionItem 
          key="1" 
          aria-label={t('saudi_labor_law_compliance')}
          title={t('saudi_labor_law_compliance')}
          startContent={<Icon icon="lucide:shield" className="text-primary" />}
        >
          <div className="space-y-4 p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-md border border-green-100">
                <h5 className="text-green-700 font-medium mb-2">{t('compliance_status')}</h5>
                <div className="flex items-center gap-2 text-green-700">
                  <Icon icon="lucide:check-circle" />
                  <span>{t('compliant_with_saudi_labor_law')}</span>
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium mb-2">{t('required_clauses')}</h5>
                <div className="space-y-2">
                  <div className="flex gap-2 items-center">
                    <Chip size="sm" color="success" variant="dot">{t('iqama_clause')}</Chip>
                    <Chip size="sm" color="success" variant="dot">{t('gosi')}</Chip>
                    <Chip size="sm" color="success" variant="dot">{t('probation')}</Chip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};