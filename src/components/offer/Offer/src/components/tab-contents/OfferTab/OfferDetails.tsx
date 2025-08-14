import React from 'react';
import { 
  Button, 
  Card, 
  CardBody, 
  Tabs, 
  Tab, 
  Chip,
  Divider
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../context/OfferContext';
import { useLanguage } from '../../../context/LanguageContext';
import { OfferStatus } from '../../../types/offer';

export const OfferDetails: React.FC = () => {
  const { offers, selectedOfferId, setViewMode, editOffer, duplicateOffer } = useOffers();
  const { t } = useLanguage();
  
  const [selectedTab, setSelectedTab] = React.useState("details");
  
  const selectedOffer = offers.find(offer => offer.id === selectedOfferId);
  
  if (!selectedOffer) {
    return (
      <div className="text-center py-8">
        <p>{t('no_offer_selected')}</p>
        <Button 
          color="primary" 
          variant="light"
          className="mt-4"
          onPress={() => setViewMode('list')}
        >
          {t('back_to_list')}
        </Button>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  const getStatusChip = (status: OfferStatus) => {
    const statusProps: Record<OfferStatus, { color: any, variant: any }> = {
      [OfferStatus.Draft]: { color: 'default', variant: 'flat' },
      [OfferStatus.PendingApproval]: { color: 'warning', variant: 'flat' },
      [OfferStatus.Approved]: { color: 'success', variant: 'flat' },
      [OfferStatus.Rejected]: { color: 'danger', variant: 'flat' },
      [OfferStatus.Sent]: { color: 'primary', variant: 'flat' },
      [OfferStatus.Signed]: { color: 'success', variant: 'solid' },
      [OfferStatus.Declined]: { color: 'danger', variant: 'solid' },
      [OfferStatus.Expired]: { color: 'default', variant: 'solid' }
    };
    
    const { color, variant } = statusProps[status];
    
    return (
      <Chip color={color} variant={variant}>
        {t(status)}
      </Chip>
    );
  };
  
  const canEdit = selectedOffer.status === OfferStatus.Draft;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="light"
            startContent={<Icon icon="lucide:arrow-left" />}
            onPress={() => setViewMode('list')}
          >
            {t('back')}
          </Button>
          
          <h2 className="text-xl font-semibold">
            {selectedOffer.requisitionTitle} - {selectedOffer.candidateName}
          </h2>
          
          {getStatusChip(selectedOffer.status)}
        </div>
        
        <div className="flex gap-2">
          {canEdit && (
            <Button
              color="primary"
              variant="bordered"
              startContent={<Icon icon="lucide:edit" />}
              onPress={() => editOffer(selectedOffer.id)}
            >
              {t('edit')}
            </Button>
          )}
          
          <Button
            variant="flat"
            startContent={<Icon icon="lucide:copy" />}
            onPress={() => duplicateOffer(selectedOffer.id)}
          >
            {t('duplicate')}
          </Button>
          
          <Button
            color="primary"
            startContent={<Icon icon="lucide:download" />}
          >
            {t('download')}
          </Button>
        </div>
      </div>
      
      <Tabs 
        aria-label="Offer Details" 
        selectedKey={selectedTab} 
        onSelectionChange={setSelectedTab as any}
        variant="underlined"
        color="primary"
        className="w-full"
      >
        <Tab key="details" title={t('details')}>
          <Card className="mt-2">
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('offer_information')}</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('offer_id')}</p>
                        <p className="font-medium">{selectedOffer.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('job_requisition')}</p>
                        <p className="font-medium">{selectedOffer.requisitionId}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('created_date')}</p>
                        <p className="font-medium">{formatDate(selectedOffer.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('created_by')}</p>
                        <p className="font-medium">{selectedOffer.creator}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('department')}</p>
                        <p className="font-medium">{selectedOffer.department}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('grade')}</p>
                        <p className="font-medium">{selectedOffer.grade}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">{t('job_title')}</p>
                      <p className="font-medium">{selectedOffer.requisitionTitle}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">{t('candidate_name')}</p>
                      <p className="font-medium">{selectedOffer.candidateName}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">{t('contract_type')}</p>
                      <p className="font-medium">{t(selectedOffer.contractType)}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('compensation_details')}</h3>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('base_salary')}</p>
                        <p className="font-medium">
                          SAR {selectedOffer.compensation.baseSalary.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('housing_allowance')}</p>
                        <p className="font-medium">
                          SAR {selectedOffer.compensation.housing.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('transportation_allowance')}</p>
                        <p className="font-medium">
                          SAR {selectedOffer.compensation.transportation.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{t('other_allowances')}</p>
                        <p className="font-medium">
                          SAR {selectedOffer.compensation.otherAllowances.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <Divider />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">{t('total_monthly_compensation')}</p>
                        <p className="font-semibold text-lg text-primary">
                          SAR {(
                            selectedOffer.compensation.baseSalary +
                            selectedOffer.compensation.housing +
                            selectedOffer.compensation.transportation +
                            selectedOffer.compensation.otherAllowances
                          ).toLocaleString()}
                        </p>
                      </div>
                      
                      {selectedOffer.compensation.bonuses && selectedOffer.compensation.bonuses.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500">{t('bonuses')}</p>
                          <ul className="space-y-1">
                            {selectedOffer.compensation.bonuses.map((bonus, index) => (
                              <li key={index} className="font-medium">
                                {bonus.type}: SAR {bonus.amount.toLocaleString()}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">{t('working_hours')}</p>
                      <p className="font-medium">{selectedOffer.workingHours}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500">{t('probation_period')}</p>
                      <p className="font-medium">{selectedOffer.probationPeriod} {t('months')}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {(selectedOffer.status !== OfferStatus.Draft && selectedOffer.approvalChain && selectedOffer.approvalChain.length > 0) && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">{t('approval_chain')}</h3>
                  
                  <div className="space-y-4">
                    {selectedOffer.approvalChain.map((approver, index) => (
                      <div 
                        key={approver.id}
                        className="flex items-start p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-gray-500">{index + 1}.</span>
                            <span className="font-medium">{approver.name}</span>
                            <span className="text-gray-500">({approver.position})</span>
                          </div>
                          
                          {approver.comments && (
                            <p className="text-gray-600 text-sm mt-1 ml-6">
                              "{approver.comments}"
                            </p>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {approver.timestamp && (
                            <span className="text-sm text-gray-500">
                              {formatDateTime(approver.timestamp)}
                            </span>
                          )}
                          
                          <Chip
                            size="sm"
                            color={
                              approver.status === 'approved' 
                                ? 'success' 
                                : approver.status === 'rejected' 
                                  ? 'danger' 
                                  : 'warning'
                            }
                            variant="flat"
                          >
                            {t(approver.status)}
                          </Chip>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="history" title={t('history')}>
          <Card className="mt-2">
            <CardBody className="p-6">
              <div className="space-y-4">
                {selectedOffer.history.map((event, index) => (
                  <div 
                    key={index}
                    className={`
                      flex items-start p-4 rounded-lg border-l-4
                      ${event.action === 'created' ? 'border-blue-400 bg-blue-50' : ''}
                      ${event.action === 'edited' ? 'border-gray-400 bg-gray-50' : ''}
                      ${event.action === 'approved' ? 'border-green-400 bg-green-50' : ''}
                      ${event.action === 'rejected' ? 'border-red-400 bg-red-50' : ''}
                      ${event.action === 'sent' ? 'border-indigo-400 bg-indigo-50' : ''}
                      ${event.action === 'signed' ? 'border-emerald-400 bg-emerald-50' : ''}
                      ${event.action === 'declined' ? 'border-orange-400 bg-orange-50' : ''}
                    `}
                  >
                    <div className={`
                      p-2 rounded-full mr-4
                      ${event.action === 'created' ? 'bg-blue-100 text-blue-600' : ''}
                      ${event.action === 'edited' ? 'bg-gray-100 text-gray-600' : ''}
                      ${event.action === 'approved' ? 'bg-green-100 text-green-600' : ''}
                      ${event.action === 'rejected' ? 'bg-red-100 text-red-600' : ''}
                      ${event.action === 'sent' ? 'bg-indigo-100 text-indigo-600' : ''}
                      ${event.action === 'signed' ? 'bg-emerald-100 text-emerald-600' : ''}
                      ${event.action === 'declined' ? 'bg-orange-100 text-orange-600' : ''}
                    `}>
                      {event.action === 'created' && <Icon icon="lucide:plus" />}
                      {event.action === 'edited' && <Icon icon="lucide:edit" />}
                      {event.action === 'approved' && <Icon icon="lucide:check" />}
                      {event.action === 'rejected' && <Icon icon="lucide:x" />}
                      {event.action === 'sent' && <Icon icon="lucide:send" />}
                      {event.action === 'signed' && <Icon icon="lucide:pen" />}
                      {event.action === 'declined' && <Icon icon="lucide:x-circle" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">
                          {t(`event_${event.action}`)}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatDateTime(event.timestamp)}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-1">
                        <Icon icon="lucide:user" className="mr-1" size={14} />
                        <span>{event.user}</span>
                      </div>
                      
                      {event.details && (
                        <p className="text-sm text-gray-600 mt-1">
                          {event.details}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="communication" title={t('communication')}>
          <Card className="mt-2">
            <CardBody className="p-6">
              {!selectedOffer.communicationHistory || selectedOffer.communicationHistory.length === 0 ? (
                <div className="text-center py-8">
                  <Icon icon="lucide:message-square" className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <p className="text-gray-500">{t('no_communication_history')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedOffer.communicationHistory.map((comm, index) => (
                    <div 
                      key={index}
                      className={`
                        p-4 rounded-lg 
                        ${comm.direction === 'outgoing' ? 'bg-blue-50 ml-12' : 'bg-gray-50 mr-12'}
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`
                            p-1 rounded-full mr-2
                            ${comm.direction === 'outgoing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-600'}
                          `}>
                            {comm.direction === 'outgoing' ? (
                              <Icon icon="lucide:arrow-right" size={14} />
                            ) : (
                              <Icon icon="lucide:arrow-left" size={14} />
                            )}
                          </div>
                          
                          <span className="font-medium">
                            {comm.direction === 'outgoing' 
                              ? t('sent_to_candidate') 
                              : t('received_from_candidate')}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Chip size="sm" variant="flat">
                            {comm.type === 'email' && t('email')}
                            {comm.type === 'whatsapp' && t('whatsapp')}
                            {comm.type === 'sms' && t('sms')}
                            {comm.type === 'portal' && t('portal')}
                          </Chip>
                          
                          <span className="text-sm text-gray-500">
                            {formatDateTime(comm.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border text-sm mt-2">
                        {comm.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="document" title={t('documents')}>
          <Card className="mt-2">
            <CardBody className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:file-text" className="text-blue-500 w-8 h-8" />
                    <div className="flex-1">
                      <h4 className="font-medium">{t('offer_letter_english')}</h4>
                      <p className="text-sm text-gray-500">{t('pdf_document')}</p>
                    </div>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => {}}
                      aria-label={t('view')}
                    >
                      <Icon icon="lucide:eye" className="text-gray-600" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => {}}
                      aria-label={t('download')}
                    >
                      <Icon icon="lucide:download" className="text-gray-600" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon icon="lucide:file-text" className="text-blue-500 w-8 h-8" />
                    <div className="flex-1">
                      <h4 className="font-medium">{t('offer_letter_arabic')}</h4>
                      <p className="text-sm text-gray-500">{t('pdf_document')}</p>
                    </div>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => {}}
                      aria-label={t('view')}
                    >
                      <Icon icon="lucide:eye" className="text-gray-600" />
                    </Button>
                    <Button
                      isIconOnly
                      variant="light"
                      onPress={() => {}}
                      aria-label={t('download')}
                    >
                      <Icon icon="lucide:download" className="text-gray-600" />
                    </Button>
                  </div>
                </div>
                
                {selectedOffer.signedDocumentUrl && (
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-center gap-3">
                      <Icon icon="lucide:file-check" className="text-green-500 w-8 h-8" />
                      <div className="flex-1">
                        <h4 className="font-medium">{t('signed_offer_letter')}</h4>
                        <p className="text-sm text-gray-500">{t('pdf_document')}</p>
                      </div>
                      <Button
                        isIconOnly
                        variant="light"
                        onPress={() => {}}
                        aria-label={t('view')}
                      >
                        <Icon icon="lucide:eye" className="text-gray-600" />
                      </Button>
                      <Button
                        isIconOnly
                        variant="light"
                        onPress={() => {}}
                        aria-label={t('download')}
                      >
                        <Icon icon="lucide:download" className="text-gray-600" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedOffer.status === OfferStatus.Draft && (
                <div className="flex justify-center mt-8">
                  <Button
                    color="primary"
                    variant="flat"
                    startContent={<Icon icon="lucide:upload" />}
                  >
                    {t('upload_document')}
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};