import React from 'react';
import { 
  Input, 
  Button, 
  Select, 
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../../context/OfferContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { Approver } from '../../../../types/offer';

export const Step3Approval: React.FC = () => {
  const { wizardState, updateWizardData } = useOffers();
  const { t, direction } = useLanguage();
  const { offer } = wizardState;
  
  const [approverName, setApproverName] = React.useState('');
  const [approverPosition, setApproverPosition] = React.useState('');
  
  const handleAddApprover = () => {
    if (!approverName || !approverPosition) return;
    
    const newApprover: Approver = {
      id: `APR-${Date.now()}`,
      name: approverName,
      position: approverPosition,
      status: 'pending'
    };
    
    const updatedApprovers = [...(offer.approvalChain || []), newApprover];
    updateWizardData({ approvalChain: updatedApprovers });
    
    // Reset form
    setApproverName('');
    setApproverPosition('');
  };
  
  const handleRemoveApprover = (id: string) => {
    const updatedApprovers = (offer.approvalChain || []).filter(a => a.id !== id);
    updateWizardData({ approvalChain: updatedApprovers });
  };
  
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    
    const approvers = [...(offer.approvalChain || [])];
    [approvers[index], approvers[index - 1]] = [approvers[index - 1], approvers[index]];
    updateWizardData({ approvalChain: approvers });
  };
  
  const handleMoveDown = (index: number) => {
    const approvers = [...(offer.approvalChain || [])];
    if (index >= approvers.length - 1) return;
    
    [approvers[index], approvers[index + 1]] = [approvers[index + 1], approvers[index]];
    updateWizardData({ approvalChain: approvers });
  };
  
  // Sample approvers for the dropdown
  const sampleApprovers = [
    { name: 'Mohammed Khalid', position: 'Engineering Manager' },
    { name: 'Layla Mahmoud', position: 'HR Director' },
    { name: 'Faisal Al-Otaibi', position: 'Product Director' },
    { name: 'Amal Al-Harbi', position: 'Marketing Director' },
    { name: 'Khalid Al-Sahli', position: 'Finance Manager' }
  ];
  
  return (
    <div className="space-y-8">
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <div className="flex items-start">
          <Icon icon="lucide:alert-triangle" className="text-yellow-600 w-5 h-5 mt-0.5" />
          <div className="mx-3">
            <h4 className="font-medium text-yellow-700 mb-1">{t('approval_workflow_required')}</h4>
            <p className="text-sm text-yellow-600">
              {t('approval_workflow_instructions')}
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{t('add_approvers')}</h3>
          
          <div className="space-y-4">
            <Select
              label={t('select_approver')}
              placeholder={t('select_from_common_approvers')}
              onSelectionChange={(keys) => {
                if (Array.from(keys).length === 0) return;
                
                const selectedName = Array.from(keys)[0] as string;
                const selected = sampleApprovers.find(a => a.name === selectedName);
                if (selected) {
                  setApproverName(selected.name);
                  setApproverPosition(selected.position);
                }
              }}
              variant="bordered"
            >
              {sampleApprovers.map((approver) => (
                <SelectItem key={approver.name} value={approver.name}>
                  {approver.name} - {approver.position}
                </SelectItem>
              ))}
            </Select>
            
            <div className="flex gap-3">
              <Input
                label={t('approver_name')}
                placeholder={t('enter_name')}
                value={approverName}
                onValueChange={setApproverName}
                variant="bordered"
                className="flex-1"
              />
              
              <Input
                label={t('position')}
                placeholder={t('enter_position')}
                value={approverPosition}
                onValueChange={setApproverPosition}
                variant="bordered"
                className="flex-1"
              />
            </div>
            
            <Button
              onPress={handleAddApprover}
              color="primary"
              className="w-full"
              startContent={<Icon icon="lucide:plus" />}
              isDisabled={!approverName || !approverPosition}
            >
              {t('add_approver')}
            </Button>
          </div>
          
          <div className="mt-6">
            <h4 className="text-base font-medium mb-2">{t('approval_templates')}</h4>
            <div className="space-y-2">
              <Button
                variant="flat"
                size="sm"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:users" />}
                onPress={() => {
                  updateWizardData({
                    approvalChain: [
                      {
                        id: `APR-${Date.now()}-1`,
                        name: 'Direct Manager',
                        position: `${offer.department || 'Department'} Manager`,
                        status: 'pending'
                      },
                      {
                        id: `APR-${Date.now()}-2`,
                        name: 'HR Manager',
                        position: 'HR Department',
                        status: 'pending'
                      }
                    ]
                  });
                }}
              >
                {t('standard_approval_flow')}
              </Button>
              
              <Button
                variant="flat"
                size="sm"
                className="w-full justify-start"
                startContent={<Icon icon="lucide:shield" />}
                onPress={() => {
                  updateWizardData({
                    approvalChain: [
                      {
                        id: `APR-${Date.now()}-1`,
                        name: 'Direct Manager',
                        position: `${offer.department || 'Department'} Manager`,
                        status: 'pending'
                      },
                      {
                        id: `APR-${Date.now()}-2`,
                        name: 'HR Manager',
                        position: 'HR Department',
                        status: 'pending'
                      },
                      {
                        id: `APR-${Date.now()}-3`,
                        name: 'Finance Director',
                        position: 'Finance Department',
                        status: 'pending'
                      },
                      {
                        id: `APR-${Date.now()}-4`,
                        name: 'CEO',
                        position: 'Executive Office',
                        status: 'pending'
                      }
                    ]
                  });
                }}
              >
                {t('executive_approval_flow')}
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">{t('approval_chain')}</h3>
          
          {(offer.approvalChain || []).length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 border border-dashed rounded-lg bg-gray-50">
              <Icon icon="lucide:users" className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-500">{t('no_approvers_added')}</p>
              <p className="text-gray-400 text-sm mt-1">{t('add_approvers_instruction')}</p>
            </div>
          ) : (
            <Table
              aria-label={t('approvers_table')}
              removeWrapper
              shadow="none"
              className="border rounded-lg"
            >
              <TableHeader>
                <TableColumn>#</TableColumn>
                <TableColumn>{t('name')}</TableColumn>
                <TableColumn>{t('position')}</TableColumn>
                <TableColumn>{t('status')}</TableColumn>
                <TableColumn>{t('actions')}</TableColumn>
              </TableHeader>
              <TableBody>
                {(offer.approvalChain || []).map((approver, index) => (
                  <TableRow key={approver.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{approver.name}</TableCell>
                    <TableCell>{approver.position}</TableCell>
                    <TableCell>
                      <Chip
                        size="sm"
                        variant="flat"
                        color={
                          approver.status === 'approved' 
                            ? 'success' 
                            : approver.status === 'rejected' 
                              ? 'danger' 
                              : 'warning'
                        }
                      >
                        {t(approver.status)}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => handleMoveUp(index)}
                          isDisabled={index === 0}
                          aria-label={t('move_up')}
                        >
                          <Icon icon="lucide:chevron-up" className="w-4 h-4" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          onPress={() => handleMoveDown(index)}
                          isDisabled={index === (offer.approvalChain || []).length - 1}
                          aria-label={t('move_down')}
                        >
                          <Icon icon="lucide:chevron-down" className="w-4 h-4" />
                        </Button>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          color="danger"
                          onPress={() => handleRemoveApprover(approver.id)}
                          aria-label={t('remove')}
                        >
                          <Icon icon="lucide:trash-2" className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          
          {(offer.approvalChain || []).length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-700 mb-2">{t('ai_approval_recommendation')}</h4>
              <p className="text-sm text-blue-600">
                {t('ai_recommends_approval_chain')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};