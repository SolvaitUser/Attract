import React from 'react';
import { Card, CardBody, Button, Input, Chip, Progress, Avatar, Divider, Select, SelectItem, Checkbox, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DocumentUpload } from './components/DocumentUpload';
import { TaskCreator } from './components/TaskCreator';
import { mockTasks, mockEmployees } from './data/mockData';
import { CustomDocumentModal } from './components/CustomDocumentModal';

interface OnboardingWizardProps {
  onClose: () => void;
  employeeId?: string;
  onboardingId?: string;
  isEditMode?: boolean;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ 
  onClose, 
  employeeId,
  onboardingId,
  isEditMode = false
}) => {
  const { t } = useLanguage();
  const [step, setStep] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [tasks, setTasks] = React.useState(mockTasks);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = React.useState<string>(employeeId || '');
  
  // Employee data state (pre-filled from candidate record or empty)
  const [employeeData, setEmployeeData] = React.useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    manager: '',
    nationalId: '',
    gosiId: '',
    startDate: '',
    joiningLocation: '',
    contractType: '',
    employeeType: '',
  });
  
  const [owner, setOwner] = React.useState('');
  const [documentList, setDocumentList] = React.useState<string[]>([
    'passport', 'nationalId', 'certificates', 'bankInfo', 'signedOffer'
  ]);
  
  const [taskToEdit, setTaskToEdit] = React.useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = React.useState(false);
  const [selectedTemplate, setSelectedTemplate] = React.useState<string>('');
  
  const [isCustomDocModalOpen, setIsCustomDocModalOpen] = React.useState(false);
  const [customDocuments, setCustomDocuments] = React.useState<Array<{id: string; name: string; description: string; required: boolean}>>([]);
  
  const loadCandidateData = (candidateId: string) => {
    if (!candidateId) return;
    
    setIsLoading(true);
    // Simulate API call to fetch candidate data
    setTimeout(() => {
      const employee = mockEmployees.find(emp => emp.id === candidateId);
      
      if (employee) {
        setEmployeeData({
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          position: employee.position,
          department: employee.department,
          manager: employee.manager,
          nationalId: employee.nationalId,
          gosiId: employee.gosiId || '',
          startDate: employee.startDate,
          joiningLocation: employee.joiningLocation,
          contractType: employee.contractType,
          employeeType: employee.employeeType,
        });
      }
      setIsLoading(false);
    }, 800);
  };
  
  React.useEffect(() => {
    // Only load candidate data if employeeId was provided from props
    if (employeeId) {
      loadCandidateData(employeeId);
    }
  }, [employeeId]);
  
  React.useEffect(() => {
    if (isEditMode && onboardingId) {
      // Load existing onboarding data
      setIsLoading(true);
      
      // Simulate fetching onboarding data
      setTimeout(() => {
        // Mock loading data from existing onboarding
        // In a real app, this would be an API call
        
        // Supposing we find the employee data
        loadCandidateData(employeeId || '');
        
        // Load tasks from the onboarding
        setTasks([...mockTasks]);
        
        // Set owner
        setOwner('emp-2'); // Example owner ID
        
        setIsLoading(false);
      }, 800);
    }
  }, [isEditMode, onboardingId, employeeId]);
  
  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onClose();
    }, 1000);
  };
  
  const handleAddTask = (task: any) => {
    setTasks([...tasks, {...task, id: `task-${tasks.length + 1}`}]);
  };
  
  const handleRemoveTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };
  
  const handleCandidateSelect = (id: string) => {
    setSelectedCandidateId(id);
    loadCandidateData(id);
  };
  
  const handleEditTask = (task: any) => {
    setTaskToEdit({...task});
    setIsEditModalOpen(true);
  };
  
  const handleUpdateTask = () => {
    if (taskToEdit) {
      setTasks(tasks.map(task => 
        task.id === taskToEdit.id ? taskToEdit : task
      ));
      setIsEditModalOpen(false);
      setTaskToEdit(null);
    }
  };
  
  const handleSelectTemplate = () => {
    setIsLoading(true);
    // Simulate loading template data
    setTimeout(() => {
      // Add predefined tasks based on template
      const templateTasks = mockTasks.map(task => ({...task, id: `template-${task.id}`}));
      setTasks([...templateTasks]);
      setIsTemplateModalOpen(false);
      setIsLoading(false);
    }, 800);
  };
  
  const handleAddCustomDocument = (document: {name: string; description: string; required: boolean}) => {
    const newDoc = {
      id: `custom-doc-${Date.now()}`,
      ...document
    };
    setCustomDocuments([...customDocuments, newDoc]);
    setIsCustomDocModalOpen(false);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditMode ? t('editOnboarding') : t('employeeProfileStep')}
              </h2>
              <p className="text-default-500">
                {t('candidateInfoAutoLoaded')}
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="spinner-border w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p>{t('loadingCandidateInfo')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t('fullName')}
                  placeholder={t('enterFullName')}
                  value={employeeData.name}
                  onValueChange={(value) => setEmployeeData({...employeeData, name: value})}
                  variant="bordered"
                  isRequired
                />
                
                <Input
                  label={t('email')}
                  placeholder={t('enterEmail')}
                  value={employeeData.email}
                  onValueChange={(value) => setEmployeeData({...employeeData, email: value})}
                  variant="bordered"
                  type="email"
                  isRequired
                />
                
                <Input
                  label={t('phone')}
                  placeholder={t('enterPhone')}
                  value={employeeData.phone}
                  onValueChange={(value) => setEmployeeData({...employeeData, phone: value})}
                  variant="bordered"
                />
                
                <Input
                  label={t('nationalId')}
                  placeholder={t('enterNationalId')}
                  value={employeeData.nationalId}
                  onValueChange={(value) => setEmployeeData({...employeeData, nationalId: value})}
                  description={t('saudiIdOrIqama')}
                  variant="bordered"
                  isRequired
                />
                
                <Input
                  label={t('gosiId')}
                  placeholder={t('enterGosiId')}
                  value={employeeData.gosiId}
                  onValueChange={(value) => setEmployeeData({...employeeData, gosiId: value})}
                  variant="bordered"
                />
                
                <Input
                  label={t('position')}
                  placeholder={t('enterPosition')}
                  value={employeeData.position}
                  onValueChange={(value) => setEmployeeData({...employeeData, position: value})}
                  variant="bordered"
                  isRequired
                />
                
                <Select 
                  label={t('department')}
                  placeholder={t('selectDepartment')}
                  selectedKeys={employeeData.department ? [employeeData.department] : []}
                  onChange={(e) => setEmployeeData({...employeeData, department: e.target.value})}
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
                  label={t('manager')}
                  placeholder={t('selectManager')}
                  selectedKeys={employeeData.manager ? [employeeData.manager] : []}
                  onChange={(e) => setEmployeeData({...employeeData, manager: e.target.value})}
                  variant="bordered"
                >
                  {mockEmployees.slice(0, 5).map(emp => (
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
                
                <Input
                  label={t('startDate')}
                  placeholder={t('selectStartDate')}
                  value={employeeData.startDate}
                  onValueChange={(value) => setEmployeeData({...employeeData, startDate: value})}
                  variant="bordered"
                  type="date"
                  isRequired
                />
                
                <Input
                  label={t('joiningLocation')}
                  placeholder={t('enterLocation')}
                  value={employeeData.joiningLocation}
                  onValueChange={(value) => setEmployeeData({...employeeData, joiningLocation: value})}
                  variant="bordered"
                />
                
                <Select 
                  label={t('contractType')}
                  placeholder={t('selectContractType')}
                  selectedKeys={employeeData.contractType ? [employeeData.contractType] : []}
                  onChange={(e) => setEmployeeData({...employeeData, contractType: e.target.value})}
                  variant="bordered"
                  isRequired
                >
                  <SelectItem key="permanent">{t('permanent')}</SelectItem>
                  <SelectItem key="contract">{t('contract')}</SelectItem>
                  <SelectItem key="probation">{t('probation')}</SelectItem>
                </Select>
                
                <Select 
                  label={t('employeeType')}
                  placeholder={t('selectEmployeeType')}
                  selectedKeys={employeeData.employeeType ? [employeeData.employeeType] : []}
                  onChange={(e) => setEmployeeData({...employeeData, employeeType: e.target.value})}
                  variant="bordered"
                  isRequired
                >
                  <SelectItem key="saudiNational">{t('saudiNational')}</SelectItem>
                  <SelectItem key="expat">{t('expat')}</SelectItem>
                </Select>
              </div>
            )}
            
            <div className="flex items-center gap-2 pt-2">
              <Icon icon="lucide:info" className="w-5 h-5 text-primary" />
              <p className="text-small text-default-500">{t('candidateInfoEditableNote')}</p>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditMode ? t('editOnboarding') : t('requiredDocumentsStep')}
              </h2>
              <p className="text-default-500">{t('requiredDocumentsDesc')}</p>
            </div>
            
            <div className="space-y-4">
              {documentList.map((doc) => (
                <DocumentUpload 
                  key={doc}
                  documentType={doc}
                  title={t(`document_${doc}`)}
                  description={t(`document_${doc}_desc`)}
                  required={doc === 'passport' || doc === 'nationalId' || doc === 'signedOffer'}
                />
              ))}
              
              {/* Render custom documents */}
              {customDocuments.map((doc) => (
                <DocumentUpload 
                  key={doc.id}
                  documentType="custom"
                  title={doc.name}
                  description={doc.description}
                  required={doc.required}
                />
              ))}
              
              <div className="flex items-center justify-between mt-4 gap-2">
                <Button
                  startContent={<Icon icon="lucide:plus" />}
                  variant="flat"
                  color="primary"
                  onPress={() => setIsCustomDocModalOpen(true)}
                >
                  {t('addCustomDocument')}
                </Button>
                
                <Button
                  startContent={<Icon icon="lucide:check-circle" />}
                  color="primary"
                  onPress={() => setIsTemplateModalOpen(true)}
                  className="ml-auto"
                >
                  {t('addFullCycle')}
                </Button>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditMode ? t('editOnboarding') : t('assignOnboardingOwnerStep')}
              </h2>
              <p className="text-default-500">{t('assignOwnerDesc')}</p>
            </div>
            
            <div className="space-y-4">
              <Select 
                label={t('assignOnboardingOwner')}
                placeholder={t('selectOwner')}
                selectedKeys={owner ? [owner] : []}
                onChange={(e) => setOwner(e.target.value)}
                variant="bordered"
                isRequired
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
                      <Chip size="sm" className="ml-auto">{emp.department}</Chip>
                    </div>
                  </SelectItem>
                ))}
              </Select>
              
              <div className="mt-4 border border-default-200 rounded-lg p-4 bg-default-50">
                <h3 className="text-md font-semibold mb-2">{t('ownerResponsibilities')}</h3>
                <ul className="list-disc list-inside space-y-1 text-default-600">
                  <li>{t('ownerResponsibility1')}</li>
                  <li>{t('ownerResponsibility2')}</li>
                  <li>{t('ownerResponsibility3')}</li>
                  <li>{t('ownerResponsibility4')}</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-2 pt-2">
                <Icon icon="lucide:lightbulb" className="w-5 h-5 text-warning" />
                <p className="text-small text-default-500">{t('aiOwnerSuggestion')}</p>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditMode ? t('editOnboarding') : t('setupOnboardingTasksStep')}
              </h2>
              <p className="text-default-500">{t('setupTasksDesc')}</p>
            </div>
            
            <div className="flex justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-md font-semibold">{t('totalTasks')}:</h3>
                  <Chip size="sm">{tasks.length}</Chip>
                </div>
                <p className="text-default-500 text-sm">{t('taskTypeDistribution')}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="flat"
                  color="primary"
                  startContent={<Icon icon="lucide:clipboard-check" />}
                  onPress={() => setIsTemplateModalOpen(true)}
                >
                  {t('useTemplate')}
                </Button>
                <Button
                  color="primary"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={() => document.getElementById('task-creator')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t('addTask')}
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto p-1">
              {tasks.map((task) => (
                <Card key={task.id} className="border border-default-200">
                  <CardBody className="p-4">
                    <div className="flex justify-between">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Checkbox defaultSelected={false} />
                          <h3 className="text-md font-semibold">{task.title}</h3>
                          {task.type && (
                            <Chip 
                              size="sm" 
                              color={
                                task.type === 'admin' ? 'primary' :
                                task.type === 'compliance' ? 'danger' :
                                task.type === 'training' ? 'success' :
                                task.type === 'tech' ? 'secondary' : 'default'
                              }
                            >
                              {t(task.type)}
                            </Chip>
                          )}
                        </div>
                        <p className="text-default-500 text-sm mt-1">{task.description}</p>
                      </div>
                      <div className="flex items-start gap-1">
                        <Button isIconOnly size="sm" variant="light" onPress={() => handleEditTask(task)}>
                          <Icon icon="lucide:pencil" className="w-4 h-4" />
                        </Button>
                        <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => handleRemoveTask(task.id)}>
                          <Icon icon="lucide:trash" className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 gap-4">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:calendar" className="w-4 h-4 text-default-500" />
                        <span className="text-sm">{task.dueDate || t('noDueDate')}</span>
                      </div>
                      {task.owner && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-default-500">{t('assignedTo')}:</span>
                          <Avatar 
                            size="sm" 
                            src={task.ownerAvatar} 
                            name={task.owner} 
                          />
                        </div>
                      )}
                      {task.attachment && (
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:paperclip" className="w-4 h-4 text-default-500" />
                          <span className="text-sm">{task.attachment}</span>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
            
            <Divider className="my-6" />
            
            <div id="task-creator" className="pb-4">
              <TaskCreator onAddTask={handleAddTask} />
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold">
                {isEditMode ? t('editOnboarding') : t('reviewAndConfirmStep')}
              </h2>
              <p className="text-default-500">{t('reviewAndConfirmDesc')}</p>
            </div>
            
            <div className="space-y-6">
              <Card className="border border-default-200">
                <CardBody className="p-4">
                  <h3 className="text-md font-semibold mb-2">{t('employeeDetails')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex justify-between">
                      <span className="text-default-500">{t('name')}:</span>
                      <span className="font-medium">{employeeData.name || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-500">{t('position')}:</span>
                      <span className="font-medium">{employeeData.position || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-500">{t('department')}:</span>
                      <span className="font-medium">{employeeData.department || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-500">{t('manager')}:</span>
                      <span className="font-medium">{employeeData.manager || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-500">{t('startDate')}:</span>
                      <span className="font-medium">{employeeData.startDate || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-default-500">{t('nationalId')}:</span>
                      <span className="font-medium">{employeeData.nationalId || '-'}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="border border-default-200">
                <CardBody className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-semibold">{t('documents')}</h3>
                    <Chip size="sm" color="success">{t('allUploaded')}</Chip>
                  </div>
                  <div className="space-y-2">
                    {documentList.map((doc) => (
                      <div key={doc} className="flex justify-between items-center">
                        <span>{t(`document_${doc}`)}</span>
                        <Chip size="sm" color="success" variant="dot">
                          {t('uploaded')}
                        </Chip>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
              
              <Card className="border border-default-200">
                <CardBody className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-semibold">{t('onboardingOwner')}</h3>
                    <Button size="sm" variant="light" color="primary" startContent={<Icon icon="lucide:edit" />}>
                      {t('change')}
                    </Button>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar 
                      size="md" 
                      src={mockEmployees.find(e => e.id === owner)?.avatar || ''} 
                      name={mockEmployees.find(e => e.id === owner)?.name || ''} 
                    />
                    <div>
                      <p className="font-medium">
                        {mockEmployees.find(e => e.id === owner)?.name || t('notAssigned')}
                      </p>
                      <p className="text-default-500 text-sm">
                        {mockEmployees.find(e => e.id === owner)?.position || ''}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="border border-default-200">
                <CardBody className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-md font-semibold">{t('tasksSummary')}</h3>
                    <Button size="sm" variant="light" color="primary" startContent={<Icon icon="lucide:plus" />}>
                      {t('addMore')}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>{t('totalTasks')}:</span>
                      <span className="font-medium">{tasks.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('adminTasks')}:</span>
                      <span className="font-medium">{tasks.filter(t => t.type === 'admin').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('complianceTasks')}:</span>
                      <span className="font-medium">{tasks.filter(t => t.type === 'compliance').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('trainingTasks')}:</span>
                      <span className="font-medium">{tasks.filter(t => t.type === 'training').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>{t('techSetupTasks')}:</span>
                      <span className="font-medium">{tasks.filter(t => t.type === 'tech').length}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <div className="border border-default-200 rounded-lg p-4 bg-primary-50">
                <div className="flex items-start gap-2">
                  <Icon icon="lucide:lightbulb" className="w-5 h-5 text-primary" />
                  <div>
                    <h3 className="text-md font-semibold">{t('aiSuggestion')}</h3>
                    <p className="text-default-600 text-sm">{t('aiOnboardingSuggestionText')}</p>
                  </div>
                </div>
              </div>
              
              <Textarea 
                label={t('additionalNotes')} 
                placeholder={t('enterAdditionalNotes')}
                variant="bordered"
              />
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  const getProgressPercent = () => {
    return (step / 5) * 100;
  };
  
  return (
    <div className="p-4">
      <Card className="w-full">
        <CardBody className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold">
                {isEditMode ? t('editOnboarding') : t('onboardingWizard')}
              </h2>
              <p className="text-default-500">
                {isEditMode ? t('editOnboardingDesc') : t('onboardingWizardDesc')}
              </p>
            </div>
            <Button isIconOnly variant="light" onPress={onClose}>
              <Icon icon="lucide:x" />
            </Button>
          </div>
          
          {/* Candidate selection section */}
          <div className="mb-6">
            <Select
              label={t('selectCandidate')}
              placeholder={t('selectCandidateToOnboard')}
              selectedKeys={selectedCandidateId ? [selectedCandidateId] : []}
              onChange={(e) => handleCandidateSelect(e.target.value)}
              variant="bordered"
              className="mb-4"
            >
              {mockEmployees.map(emp => (
                <SelectItem key={emp.id} textValue={emp.name}>
                  <div className="flex items-center gap-2">
                    <Avatar 
                      size="sm" 
                      src={emp.avatar} 
                      name={emp.name} 
                    />
                    <div>
                      <span className="font-medium">{emp.name}</span>
                      <p className="text-small text-default-500">{emp.position}</p>
                    </div>
                    <Chip size="sm" className="ml-auto">{emp.department}</Chip>
                  </div>
                </SelectItem>
              ))}
            </Select>
            
            {selectedCandidateId && (
              <div className="flex items-center gap-2 mb-2">
                <Icon icon="lucide:check-circle" className="text-success" />
                <span className="text-success">
                  {t('candidateSelected')}: {mockEmployees.find(emp => emp.id === selectedCandidateId)?.name}
                </span>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <Progress
              aria-label={t('onboardingProgress')}
              value={getProgressPercent()}
              className="max-w-md"
              color="primary"
              showValueLabel
              valueLabel={`${t('step')} ${step} ${t('of')} 5`}
            />
          </div>
          
          <div className="hidden md:flex justify-between mb-6 px-4">
            {['employeeProfile', 'documents', 'owner', 'tasks', 'review'].map((stepName, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === step;
              const isCompleted = stepNumber < step;
              
              return (
                <div key={stepName} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                      isActive ? 'bg-primary text-white' :
                      isCompleted ? 'bg-primary-100 text-primary' : 'bg-default-100 text-default-500'
                    }`}
                    onClick={() => stepNumber < step && setStep(stepNumber)}
                    style={{ cursor: stepNumber < step ? 'pointer' : 'default' }}
                  >
                    {isCompleted ? (
                      <Icon icon="lucide:check" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className={`text-sm ${isActive ? 'text-primary font-medium' : 'text-default-500'}`}>
                    {t(stepName)}
                  </span>
                </div>
              );
            })}
          </div>
          
          {renderStepContent()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="flat"
              onPress={() => step > 1 ? setStep(step - 1) : onClose()}
              startContent={step > 1 ? <Icon icon="lucide:arrow-left" /> : null}
            >
              {step > 1 ? t('previousStep') : t('cancel')}
            </Button>
            <div className="flex gap-2">
              <Button
                variant="flat"
                onPress={() => onClose()}
              >
                {t('saveAsDraft')}
              </Button>
              {step < 5 ? (
                <Button
                  color="primary"
                  onPress={() => setStep(step + 1)}
                  endContent={<Icon icon="lucide:arrow-right" />}
                >
                  {t('nextStep')}
                </Button>
              ) : (
                <Button
                  color="primary"
                  endContent={<Icon icon="lucide:check" />}
                  isLoading={loading}
                  onPress={handleSave}
                >
                  {isEditMode ? t('saveChanges') : t('createOnboarding')}
                </Button>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
      
      {/* Template Selection Modal */}
      <Modal 
        isOpen={isTemplateModalOpen} 
        onClose={() => setIsTemplateModalOpen(false)} 
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {t('selectOnboardingTemplate')}
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <p className="text-default-600">
                {t('selectTemplateInstructions')}
              </p>
              
              <div className="space-y-2">
                {/* IT Onboarding Template */}
                <Card 
                  isPressable 
                  onPress={() => setSelectedTemplate('it')}
                  className={`border ${selectedTemplate === 'it' ? 'border-primary' : 'border-default-200'}`}
                >
                  <CardBody className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary-100">
                          <Icon icon="lucide:monitor" className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-md font-semibold">IT Department Onboarding</h3>
                          <p className="text-default-500 text-sm">15 tasks • Tech-focused onboarding</p>
                        </div>
                      </div>
                      <Checkbox 
                        isSelected={selectedTemplate === 'it'}
                        color="primary"
                      />
                    </div>
                  </CardBody>
                </Card>
                
                {/* HR Onboarding Template */}
                <Card 
                  isPressable 
                  onPress={() => setSelectedTemplate('hr')}
                  className={`border ${selectedTemplate === 'hr' ? 'border-primary' : 'border-default-200'}`}
                >
                  <CardBody className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-success-100">
                          <Icon icon="lucide:users" className="w-5 h-5 text-success" />
                        </div>
                        <div>
                          <h3 className="text-md font-semibold">HR Department Onboarding</h3>
                          <p className="text-default-500 text-sm">12 tasks • Compliance-focused</p>
                        </div>
                      </div>
                      <Checkbox 
                        isSelected={selectedTemplate === 'hr'}
                        color="primary"
                      />
                    </div>
                  </CardBody>
                </Card>
                
                {/* Finance Onboarding Template */}
                <Card 
                  isPressable 
                  onPress={() => setSelectedTemplate('finance')}
                  className={`border ${selectedTemplate === 'finance' ? 'border-primary' : 'border-default-200'}`}
                >
                  <CardBody className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-warning-100">
                          <Icon icon="lucide:landmark" className="w-5 h-5 text-warning" />
                        </div>
                        <div>
                          <h3 className="text-md font-semibold">Finance Department Onboarding</h3>
                          <p className="text-default-500 text-sm">10 tasks • Finance systems access</p>
                        </div>
                      </div>
                      <Checkbox 
                        isSelected={selectedTemplate === 'finance'}
                        color="primary"
                      />
                    </div>
                  </CardBody>
                </Card>
                
                {/* Full Cycle Onboarding */}
                <Card 
                  isPressable 
                  onPress={() => setSelectedTemplate('full')}
                  className={`border ${selectedTemplate === 'full' ? 'border-primary' : 'border-default-200'} bg-primary-50`}
                >
                  <CardBody className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-primary-100">
                          <Icon icon="lucide:check-circle" className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-md font-semibold">Full Cycle Onboarding</h3>
                          <p className="text-default-500 text-sm">20+ tasks • Complete onboarding process</p>
                        </div>
                      </div>
                      <Checkbox 
                        isSelected={selectedTemplate === 'full'} 
                        color="primary"
                      />
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Icon icon="lucide:info" className="text-primary w-4 h-4" />
                      <p className="text-small text-default-600">
                        {t('fullCycleTemplateDescription')}
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsTemplateModalOpen(false)}>
              {t('cancel')}
            </Button>
            <Button 
              color="primary" 
              onPress={handleSelectTemplate} 
              isDisabled={!selectedTemplate}
              isLoading={isLoading}
            >
              {t('applyTemplate')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        size="2xl"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {t('editTask')}
          </ModalHeader>
          <ModalBody>
            {taskToEdit && (
              <div className="space-y-4">
                <Input
                  label={t('taskName')}
                  placeholder={t('enterTaskTitle')}
                  value={taskToEdit.title}
                  onValueChange={(value) => setTaskToEdit({...taskToEdit, title: value})}
                  variant="bordered"
                  isRequired
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select 
                    label={t('taskType')}
                    placeholder={t('selectTaskType')}
                    selectedKeys={taskToEdit.type ? [taskToEdit.type] : []}
                    onChange={(e) => setTaskToEdit({...taskToEdit, type: e.target.value})}
                    variant="bordered"
                  >
                    <SelectItem key="admin">{t('admin')}</SelectItem>
                    <SelectItem key="compliance">{t('compliance')}</SelectItem>
                    <SelectItem key="training">{t('training')}</SelectItem>
                    <SelectItem key="tech">{t('techSetup')}</SelectItem>
                    <SelectItem key="orientation">{t('orientation')}</SelectItem>
                  </Select>
                  
                  <Input
                    label={t('dueDate')}
                    placeholder={t('selectDueDate')}
                    type="date"
                    value={taskToEdit.dueDate}
                    onValueChange={(value) => setTaskToEdit({...taskToEdit, dueDate: value})}
                    variant="bordered"
                  />
                </div>
                
                <Textarea
                  label={t('description')}
                  placeholder={t('enterTaskDescription')}
                  value={taskToEdit.description}
                  onValueChange={(value) => setTaskToEdit({...taskToEdit, description: value})}
                  variant="bordered"
                />
                
                <Select 
                  label={t('assignTo')}
                  placeholder={t('selectAssignee')}
                  selectedKeys={taskToEdit.owner ? [taskToEdit.owner] : []}
                  onChange={(e) => {
                    const selectedEmployee = mockEmployees.find(emp => emp.id === e.target.value);
                    setTaskToEdit({
                      ...taskToEdit, 
                      owner: selectedEmployee?.name || '',
                      ownerAvatar: selectedEmployee?.avatar || ''
                    });
                  }}
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
                
                <div className="space-y-2">
                  <p className="text-small font-medium">{t('priority')}</p>
                  <div className="flex gap-2">
                    {['low', 'medium', 'high'].map((priority) => (
                      <Chip 
                        key={priority}
                        onClick={() => setTaskToEdit({...taskToEdit, priority})}
                        color={
                          priority === 'low' ? 'success' : 
                          priority === 'medium' ? 'warning' : 'danger'
                        }
                        variant={taskToEdit.priority === priority ? 'solid' : 'flat'}
                        className="cursor-pointer"
                      >
                        {t(priority)}
                      </Chip>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Checkbox 
                    isSelected={taskToEdit.isRequired}
                    onValueChange={(isSelected) => setTaskToEdit({...taskToEdit, isRequired: isSelected})}
                  >
                    {t('markAsRequired')}
                  </Checkbox>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={() => setIsEditModalOpen(false)}>
              {t('cancel')}
            </Button>
            <Button color="primary" onPress={handleUpdateTask}>
              {t('saveChanges')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* Custom Document Modal */}
      <CustomDocumentModal 
        isOpen={isCustomDocModalOpen}
        onClose={() => setIsCustomDocModalOpen(false)}
        onSave={handleAddCustomDocument}
      />
    </div>
  );
};