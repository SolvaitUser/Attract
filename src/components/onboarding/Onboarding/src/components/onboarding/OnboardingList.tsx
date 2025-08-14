import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, User, Tooltip, Card, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Input, Pagination, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, SelectTrigger, SelectContent, SelectOption, Checkbox, Textarea, Avatar } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { mockOnboardingData, mockEmployees } from './data/mockData';
import { OnboardingViewModal } from './components/OnboardingViewModal';
import { OnboardingWizard } from './OnboardingWizard';

interface OnboardingListProps {
  status: 'active' | 'completed' | 'template';
}

export const OnboardingList: React.FC<OnboardingListProps> = ({ status }) => {
  const { t } = useLanguage();
  const [filterText, setFilterText] = React.useState('');
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const [showNewTemplateModal, setShowNewTemplateModal] = React.useState(false);
  const [viewModalOpen, setViewModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [showEditWizard, setShowEditWizard] = React.useState(false);
  
  const filteredData = React.useMemo(() => {
    return mockOnboardingData
      .filter(item => item.status === status)
      .filter(item => 
        item.employeeName.toLowerCase().includes(filterText.toLowerCase()) ||
        item.department.toLowerCase().includes(filterText.toLowerCase()) ||
        item.position.toLowerCase().includes(filterText.toLowerCase())
      );
  }, [status, filterText]);
  
  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredData.slice(start, end);
  }, [page, filteredData]);
  
  const getStatusChip = (progress: number): JSX.Element => {
    if (progress === 100) {
      return <Chip color="success" size="sm">{t('completed')}</Chip>;
    } else if (progress >= 70) {
      return <Chip color="primary" size="sm">{t('inProgress')}</Chip>;
    } else if (progress >= 30) {
      return <Chip color="warning" size="sm">{t('ongoing')}</Chip>;
    } else {
      return <Chip color="default" size="sm">{t('justStarted')}</Chip>;
    }
  };
  
  const handleActionMenu = (key: React.Key, id: string) => {
    console.log(`Action ${key} on item ${id}`);
    // Implement action handling here
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <Input
          placeholder={t('searchEmployeeDepartment')}
          value={filterText}
          onValueChange={setFilterText}
          startContent={<Icon icon="lucide:search" className="w-4 h-4" />}
          className="max-w-xs"
        />
        <div className="flex gap-2">
          {status === 'template' && (
            <Button 
              variant="flat" 
              color="primary" 
              startContent={<Icon icon="lucide:plus" />}
              onPress={() => setShowNewTemplateModal(true)}
            >
              {t('newTemplate')}
            </Button>
          )}
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                startContent={<Icon icon="lucide:filter" />}
              >
                {t('filter')}
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="all">{t('allDepartments')}</DropdownItem>
              <DropdownItem key="it">IT</DropdownItem>
              <DropdownItem key="hr">HR</DropdownItem>
              <DropdownItem key="finance">{t('finance')}</DropdownItem>
              <DropdownItem key="sales">{t('sales')}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      
      <Card>
        <Table
          aria-label={t('onboardingListTable')}
          removeWrapper
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          classNames={{
            th: "bg-default-50",
          }}
        >
          <TableHeader>
            <TableColumn key="name" isRowHeader>{status !== 'template' ? t('employee') : t('templateName')}</TableColumn>
            <TableColumn key="position">{status !== 'template' ? t('position') : t('department')}</TableColumn>
            <TableColumn key="department">{status !== 'template' ? t('department') : t('tasksCount')}</TableColumn>
            <TableColumn key="owner">{t('owner')}</TableColumn>
            {status !== 'template' && <TableColumn key="startDate">{t('startDate')}</TableColumn>}
            {status !== 'template' && <TableColumn key="progress">{t('progress')}</TableColumn>}
            <TableColumn key="actions">{t('actions')}</TableColumn>
          </TableHeader>
          <TableBody emptyContent={t('noRecordsFound')}>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  {status !== 'template' ? (
                    <User
                      name={item.employeeName}
                      avatarProps={{
                        src: item.avatar,
                        radius: "lg",
                      }}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:file-text" className="w-5 h-5" />
                      <span>{item.templateName || item.employeeName}</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>{status !== 'template' ? item.position : item.department}</TableCell>
                <TableCell>{status !== 'template' ? item.department : `${item.taskCount} ${t('tasks')}`}</TableCell>
                <TableCell>
                  <User
                    name={item.ownerName}
                    avatarProps={{
                      src: item.ownerAvatar,
                      radius: "lg",
                      size: "sm",
                    }}
                  />
                </TableCell>
                {status !== 'template' && <TableCell>{item.startDate}</TableCell>}
                {status !== 'template' && (
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between">
                        <span className="text-small">{item.progress}%</span>
                        {getStatusChip(item.progress)}
                      </div>
                      <Progress size="sm" value={item.progress} color="primary" />
                    </div>
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Tooltip content={t('view')}>
                      <Button isIconOnly size="sm" variant="light" onPress={() => {
                        setSelectedItem(item);
                        setViewModalOpen(true);
                      }}>
                        <Icon icon="lucide:eye" className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                    <Tooltip content={t('edit')}>
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => {
                          setSelectedItem(item);
                          setShowEditWizard(true);
                        }}
                      >
                        <Icon icon="lucide:pencil" className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                    <Dropdown>
                      <DropdownTrigger>
                        <Button isIconOnly size="sm" variant="light">
                          <Icon icon="lucide:more-vertical" className="w-4 h-4" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu onAction={(key) => handleActionMenu(key, item.id)}>
                        {status === 'template' ? (
                          <>
                            <DropdownItem key="duplicate" startContent={<Icon icon="lucide:copy" className="w-4 h-4" />}>
                              {t('duplicate')}
                            </DropdownItem>
                            <DropdownItem key="delete" startContent={<Icon icon="lucide:trash" className="w-4 h-4" />} className="text-danger">
                              {t('delete')}
                            </DropdownItem>
                          </>
                        ) : (
                          <>
                            <DropdownItem key="sendReminder" startContent={<Icon icon="lucide:bell" className="w-4 h-4" />}>
                              {t('sendReminder')}
                            </DropdownItem>
                            <DropdownItem key="markComplete" startContent={<Icon icon="lucide:check-square" className="w-4 h-4" />}>
                              {t('markComplete')}
                            </DropdownItem>
                            <DropdownItem key="reassign" startContent={<Icon icon="lucide:users" className="w-4 h-4" />}>
                              {t('reassign')}
                            </DropdownItem>
                            <DropdownItem key="archive" startContent={<Icon icon="lucide:archive" className="w-4 h-4" />}>
                              {t('archive')}
                            </DropdownItem>
                          </>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      
      {/* Template Creation Modal */}
      <Modal 
        isOpen={showNewTemplateModal} 
        onClose={() => setShowNewTemplateModal(false)} 
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {t('createNewTemplate')}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input 
                label={t('templateName')}
                placeholder={t('enterTemplateName')}
                variant="bordered"
                isRequired
              />
              
              <Select
                label={t('department')}
                placeholder={t('selectDepartment')}
                variant="bordered"
                isRequired
              >
                <SelectItem key="it">IT</SelectItem>
                <SelectItem key="hr">HR</SelectItem>
                <SelectItem key="finance">{t('finance')}</SelectItem>
                <SelectItem key="sales">{t('sales')}</SelectItem>
                <SelectItem key="marketing">{t('marketing')}</SelectItem>
              </Select>
              
              <Select
                label={t('assignOwner')}
                placeholder={t('selectOwner')}
                variant="bordered"
              >
                {mockEmployees.map(emp => (
                  <SelectItem key={emp.id} textValue={emp.name}>
                    <div className="flex items-center gap-2">
                      <Avatar 
                        size="sm" 
                        src={emp.avatar} 
                        name={emp.name} 
                      />
                      <span>{emp.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </Select>
              
              <div className="border border-default-200 rounded-lg p-4">
                <div className="flex justify-between mb-4">
                  <h3 className="text-md font-semibold">{t('selectTaskTypes')}</h3>
                  <Chip size="sm">{t('required')}</Chip>
                </div>
                <div className="space-y-2">
                  <Checkbox defaultSelected>{t('adminTasks')}</Checkbox>
                  <Checkbox defaultSelected>{t('complianceTasks')}</Checkbox>
                  <Checkbox defaultSelected>{t('trainingTasks')}</Checkbox>
                  <Checkbox defaultSelected>{t('techSetupTasks')}</Checkbox>
                  <Checkbox defaultSelected>{t('orientationTasks')}</Checkbox>
                </div>
              </div>
              
              <Textarea 
                label={t('templateDescription')}
                placeholder={t('enterTemplateDescription')}
                variant="bordered"
              />
              
              <div className="border border-default-200 rounded-lg p-4 bg-default-50">
                <h3 className="text-md font-semibold mb-2">{t('requiredDocuments')}</h3>
                <div className="space-y-2">
                  <Checkbox defaultSelected>{t('document_passport')}</Checkbox>
                  <Checkbox defaultSelected>{t('document_nationalId')}</Checkbox>
                  <Checkbox defaultSelected>{t('document_certificates')}</Checkbox>
                  <Checkbox defaultSelected>{t('document_bankInfo')}</Checkbox>
                  <Checkbox defaultSelected>{t('document_signedOffer')}</Checkbox>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setShowNewTemplateModal(false)}>
              {t('cancel')}
            </Button>
            <Button color="primary">
              {t('saveAndContinue')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Onboarding View Modal */}
      <OnboardingViewModal 
        isOpen={viewModalOpen} 
        onClose={() => setViewModalOpen(false)} 
        onboarding={selectedItem}
      />
      
      {/* Edit Onboarding Wizard */}
      {showEditWizard && selectedItem && (
        <OnboardingWizard 
          onClose={() => setShowEditWizard(false)} 
          employeeId={selectedItem.employeeId} 
          onboardingId={selectedItem.id} 
          isEditMode={true} 
        />
      )}
    </div>
  );
};