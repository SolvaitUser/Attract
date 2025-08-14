import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea, Checkbox, Chip, Avatar, RadioGroup, Radio, Accordion, AccordionItem } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface AddEditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  task?: any;
  editMode: boolean;
}

export const AddEditTaskModal: React.FC<AddEditTaskModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  task,
  editMode
}) => {
  const { t } = useLanguage();
  
  // Mock employees data for assignment dropdown
  const mockEmployees = [
    {
      id: 'emp-1',
      name: 'HR Admin',
      department: 'HR',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=111'
    },
    {
      id: 'emp-2',
      name: 'HR Lead',
      department: 'HR',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=222'
    },
    {
      id: 'emp-3',
      name: 'IT Team',
      department: 'IT',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=333'
    },
    {
      id: 'emp-4',
      name: 'Employee',
      department: 'Various',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=444'
    }
  ];
  
  // Create default task state or use the provided task for editing
  const [taskData, setTaskData] = React.useState({
    id: '',
    title: '',
    description: '',
    employeeName: '',
    employeeAvatar: '',
    department: '',
    dueDate: '',
    priority: 'medium',
    type: 'document',
    status: 'pending',
    progress: 0
  });
  
  // Initialize with task data if in edit mode
  React.useEffect(() => {
    if (editMode && task) {
      setTaskData(task);
    } else {
      // Reset to defaults for new task
      setTaskData({
        id: '',
        title: '',
        description: '',
        employeeName: '',
        employeeAvatar: '',
        department: '',
        dueDate: '',
        priority: 'medium',
        type: 'document',
        status: 'pending',
        progress: 0
      });
    }
  }, [editMode, task, isOpen]);
  
  const [showAdditionalFields, setShowAdditionalFields] = React.useState(true);
  
  const handleSubmit = () => {
    // Validate required fields
    if (!taskData.title || !taskData.employeeName || !taskData.dueDate) {
      // In a real app, show validation errors
      alert(t('pleaseCompleteAllRequiredFields'));
      return;
    }
    
    onSave(taskData);
  };

  const renderTaskTypeSpecificFields = () => {
    if (!showAdditionalFields) return null;
    
    switch (taskData.type) {
      case 'document':
        return (
          <div className="space-y-4 border-t border-default-200 pt-4 mt-4">
            <h3 className="text-md font-semibold">Document Details</h3>
            
            <Select
              label="Document Type"
              labelPlacement="outside"
              placeholder="Select document type"
              variant="bordered"
              value={taskData.documentType || ''}
              onChange={(e) => setTaskData({...taskData, documentType: e.target.value})}
            >
              <SelectItem key="id">Identification Documents</SelectItem>
              <SelectItem key="employment">Employment Contract</SelectItem>
              <SelectItem key="financial">Financial Documents</SelectItem>
              <SelectItem key="educational">Educational Certificates</SelectItem>
              <SelectItem key="medical">Medical Records</SelectItem>
            </Select>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Verification Process"
                labelPlacement="outside"
                placeholder="Select verification process"
                variant="bordered"
                value={taskData.verificationFlow || ''}
                onChange={(e) => setTaskData({...taskData, verificationFlow: e.target.value})}
              >
                <SelectItem key="standard">Standard Verification</SelectItem>
                <SelectItem key="express">Express Verification</SelectItem>
                <SelectItem key="external">External Verification</SelectItem>
              </Select>
              
              <Select
                label="Required Signatures"
                labelPlacement="outside"
                placeholder="Select required signatures"
                variant="bordered"
                selectionMode="multiple"
                value={taskData.requiredSignatures || []}
                onChange={(e) => setTaskData({...taskData, requiredSignatures: e.target.value})}
              >
                <SelectItem key="employee">Employee</SelectItem>
                <SelectItem key="manager">Manager</SelectItem>
                <SelectItem key="hr">HR Department</SelectItem>
                <SelectItem key="finance">Finance Department</SelectItem>
              </Select>
            </div>
            
            <div className="space-y-2">
              <p className="text-small font-medium">Document Requirements</p>
              <div className="flex flex-wrap gap-2">
                <Checkbox 
                  isSelected={taskData.needsNotarization}
                  onValueChange={(selected) => setTaskData({...taskData, needsNotarization: selected})}
                >
                  Requires Notarization
                </Checkbox>
                <Checkbox 
                  isSelected={taskData.needsTranslation}
                  onValueChange={(selected) => setTaskData({...taskData, needsTranslation: selected})}
                >
                  Requires Translation
                </Checkbox>
                <Checkbox 
                  isSelected={taskData.isConfidential}
                  onValueChange={(selected) => setTaskData({...taskData, isConfidential: selected})}
                >
                  Confidential Document
                </Checkbox>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-primary-50 p-3 rounded-md">
              <Icon icon="lucide:file-text" className="text-primary" />
              <span className="text-small">{t('documentTemplateAvailable')}</span>
              <Button size="sm" variant="flat" color="primary" className="ml-auto">
                {t('viewTemplate')}
              </Button>
            </div>
          </div>
        );
        
      case 'meeting':
        return (
          <div className="space-y-4 border-t border-default-200 pt-4 mt-4">
            <h3 className="text-md font-semibold">Meeting Details</h3>
            
            <Input
              label="Duration (minutes)"
              labelPlacement="outside"
              placeholder="Enter duration in minutes"
              type="number"
              variant="bordered"
              value={taskData.meetingDuration || ''}
              onValueChange={(value) => setTaskData({...taskData, meetingDuration: value})}
              endContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">{t('minutes')}</span></div>}
            />
            
            <Input
              label="Meeting Time"
              labelPlacement="outside"
              placeholder="Select meeting time"
              type="time"
              variant="bordered"
              value={taskData.meetingTime || ''}
              onValueChange={(value) => setTaskData({...taskData, meetingTime: value})}
            />
            
            <RadioGroup
              label="Meeting Type"
              orientation="horizontal"
              value={taskData.meetingType || 'virtual'}
              onValueChange={(value) => setTaskData({...taskData, meetingType: value})}
            >
              <Radio value="virtual">Virtual Meeting</Radio>
              <Radio value="physical">In-Person Meeting</Radio>
              <Radio value="hybrid">Hybrid Meeting</Radio>
            </RadioGroup>
            
            {(taskData.meetingType === 'virtual' || taskData.meetingType === 'hybrid') && (
              <Input
                label="Meeting Link"
                labelPlacement="outside"
                placeholder="Enter virtual meeting link"
                variant="bordered"
                value={taskData.meetingLink || ''}
                onValueChange={(value) => setTaskData({...taskData, meetingLink: value})}
                startContent={<Icon icon="lucide:video" className="text-default-400 flex-shrink-0" />}
              />
            )}
            
            {(taskData.meetingType === 'physical' || taskData.meetingType === 'hybrid') && (
              <Input
                label="Meeting Location"
                labelPlacement="outside"
                placeholder="Enter physical location details"
                variant="bordered"
                value={taskData.meetingLocation || ''}
                onValueChange={(value) => setTaskData({...taskData, meetingLocation: value})}
                startContent={<Icon icon="lucide:map-pin" className="text-default-400 flex-shrink-0" />}
              />
            )}
            
            <Textarea
              label="Agenda"
              labelPlacement="outside"
              placeholder="Enter meeting agenda and key points"
              variant="bordered"
              value={taskData.meetingAgenda || ''}
              onValueChange={(value) => setTaskData({...taskData, meetingAgenda: value})}
              minRows={2}
            />
            
            <div className="space-y-2">
              <p className="text-small font-medium">Additional Meeting Options</p>
              <div className="flex flex-wrap gap-2">
                <Checkbox 
                  isSelected={taskData.sendCalendarInvite}
                  onValueChange={(selected) => setTaskData({...taskData, sendCalendarInvite: selected})}
                >
                  Send Calendar Invite
                </Checkbox>
                <Checkbox 
                  isSelected={taskData.recordMeeting}
                  onValueChange={(selected) => setTaskData({...taskData, recordMeeting: selected})}
                >
                  Record Meeting
                </Checkbox>
                <Checkbox 
                  isSelected={taskData.requirePreparation}
                  onValueChange={(selected) => setTaskData({...taskData, requirePreparation: selected})}
                >
                  Requires Preparation
                </Checkbox>
              </div>
            </div>
          </div>
        );
        
      case 'tech':
        return (
          <div className="space-y-4 border-t border-default-200 pt-4 mt-4">
            <h3 className="text-md font-semibold">Technology Setup Requirements</h3>
            
            <Accordion variant="splitted">
              <AccordionItem 
                key="hardware" 
                aria-label="Hardware Requirements" 
                title="Hardware Equipment"
                startContent={<Icon icon="lucide:hard-drive" className="text-primary" />}
              >
                <div className="space-y-3 px-1">
                  <div className="flex flex-wrap gap-2">
                    <Checkbox 
                      isSelected={taskData.needsLaptop}
                      onValueChange={(selected) => setTaskData({...taskData, needsLaptop: selected})}
                    >
                      {t('laptop')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsMonitor}
                      onValueChange={(selected) => setTaskData({...taskData, needsMonitor: selected})}
                    >
                      {t('monitor')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsKeyboard}
                      onValueChange={(selected) => setTaskData({...taskData, needsKeyboard: selected})}
                    >
                      {t('keyboard')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsMouse}
                      onValueChange={(selected) => setTaskData({...taskData, needsMouse: selected})}
                    >
                      {t('mouse')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsHeadset}
                      onValueChange={(selected) => setTaskData({...taskData, needsHeadset: selected})}
                    >
                      {t('headset')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsPhone}
                      onValueChange={(selected) => setTaskData({...taskData, needsPhone: selected})}
                    >
                      {t('phone')}
                    </Checkbox>
                  </div>
                  
                  <Input
                    label="Additional Equipment"
                    labelPlacement="outside"
                    placeholder="Specify any additional hardware needed"
                    variant="bordered"
                    value={taskData.additionalHardware || ''}
                    onValueChange={(value) => setTaskData({...taskData, additionalHardware: value})}
                  />
                </div>
              </AccordionItem>
              
              <AccordionItem 
                key="software" 
                aria-label="Software Requirements" 
                title="Software & Applications"
                startContent={<Icon icon="lucide:app-window" className="text-primary" />}
              >
                <div className="space-y-3 px-1">
                  <div className="flex flex-wrap gap-2">
                    <Checkbox 
                      isSelected={taskData.needsEmail}
                      onValueChange={(selected) => setTaskData({...taskData, needsEmail: selected})}
                    >
                      {t('emailSetup')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsVPN}
                      onValueChange={(selected) => setTaskData({...taskData, needsVPN: selected})}
                    >
                      {t('vpnAccess')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsMessaging}
                      onValueChange={(selected) => setTaskData({...taskData, needsMessaging: selected})}
                    >
                      {t('messagingTools')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsCloud}
                      onValueChange={(selected) => setTaskData({...taskData, needsCloud: selected})}
                    >
                      {t('cloudStorage')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsERP}
                      onValueChange={(selected) => setTaskData({...taskData, needsERP: selected})}
                    >
                      {t('companyERP')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsCRM}
                      onValueChange={(selected) => setTaskData({...taskData, needsCRM: selected})}
                    >
                      {t('companyCRM')}
                    </Checkbox>
                  </div>
                  
                  <Textarea
                    label={t('additionalSoftware')}
                    labelPlacement="outside"
                    placeholder={t('specifyAdditionalSoftware')}
                    variant="bordered"
                    value={taskData.additionalSoftware || ''}
                    onValueChange={(value) => setTaskData({...taskData, additionalSoftware: value})}
                    minRows={2}
                  />
                </div>
              </AccordionItem>
              
              <AccordionItem 
                key="access" 
                aria-label="Access Permissions" 
                title="System Access & Permissions"
                startContent={<Icon icon="lucide:key" className="text-primary" />}
              >
                <div className="space-y-3 px-1">
                  <Select
                    label={t('accessLevel')}
                    labelPlacement="outside"
                    placeholder={t('selectAccessLevel')}
                    variant="bordered"
                    value={taskData.accessLevel || ''}
                    onChange={(e) => setTaskData({...taskData, accessLevel: e.target.value})}
                  >
                    <SelectItem key="basic">Basic Access</SelectItem>
                    <SelectItem key="standard">Standard Access</SelectItem>
                    <SelectItem key="elevated">Elevated Access</SelectItem>
                    <SelectItem key="admin">Administrator Access</SelectItem>
                  </Select>
                  
                  <div className="flex flex-wrap gap-2">
                    <Checkbox 
                      isSelected={taskData.needsNetworkAccess}
                      onValueChange={(selected) => setTaskData({...taskData, needsNetworkAccess: selected})}
                    >
                      {t('networkDrives')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsDatabaseAccess}
                      onValueChange={(selected) => setTaskData({...taskData, needsDatabaseAccess: selected})}
                    >
                      {t('databases')}
                    </Checkbox>
                    <Checkbox 
                      isSelected={taskData.needsServerAccess}
                      onValueChange={(selected) => setTaskData({...taskData, needsServerAccess: selected})}
                    >
                      {t('servers')}
                    </Checkbox>
                  </div>
                  
                  <div className="p-3 bg-danger-50 rounded-md flex items-center gap-2">
                    <Icon icon="lucide:shield" className="text-danger" />
                    <span className="text-small text-danger-600">{t('accessRequiresApproval')}</span>
                  </div>
                </div>
              </AccordionItem>
            </Accordion>
            
            <Select
              label="Request Priority"
              labelPlacement="outside"
              placeholder="Select priority level"
              variant="bordered"
              value={taskData.itPriority || ''}
              onChange={(e) => setTaskData({...taskData, itPriority: e.target.value})}
            >
              <SelectItem key="low">Low - Within one week</SelectItem>
              <SelectItem key="medium">Medium - Within 48 hours</SelectItem>
              <SelectItem key="high">High - Within 24 hours</SelectItem>
              <SelectItem key="urgent">Urgent - Immediate attention</SelectItem>
            </Select>
          </div>
        );
        
      case 'manual':
        return (
          <div className="space-y-4 border-t border-default-200 pt-4 mt-4">
            <h3 className="text-md font-semibold">Manual Task Details</h3>
            
            <Select
              label="Task Category"
              labelPlacement="outside"
              placeholder="Select task category"
              variant="bordered"
              value={taskData.manualTaskCategory || ''}
              onChange={(e) => setTaskData({...taskData, manualTaskCategory: e.target.value})}
            >
              <SelectItem key="paperwork">Paperwork Processing</SelectItem>
              <SelectItem key="facility">Facility Access Setup</SelectItem>
              <SelectItem key="supplies">Office Supplies</SelectItem>
              <SelectItem key="transportation">Transportation Arrangements</SelectItem>
              <SelectItem key="other">Other</SelectItem>
            </Select>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Estimated Duration"
                labelPlacement="outside"
                placeholder="Enter duration in minutes"
                type="number"
                variant="bordered"
                value={taskData.manualTaskDuration || ''}
                onValueChange={(value) => setTaskData({...taskData, manualTaskDuration: value})}
                endContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">{t('minutes')}</span></div>}
              />
              
              <Select
                label="Physical Location"
                labelPlacement="outside"
                placeholder="Select location"
                variant="bordered"
                value={taskData.manualTaskLocation || ''}
                onChange={(e) => setTaskData({...taskData, manualTaskLocation: e.target.value})}
              >
                <SelectItem key="office">{t('mainOffice')}</SelectItem>
                <SelectItem key="branch1">{t('branchOffice1')}</SelectItem>
                <SelectItem key="branch2">{t('branchOffice2')}</SelectItem>
                <SelectItem key="warehouse">{t('warehouse')}</SelectItem>
                <SelectItem key="other">{t('otherLocation')}</SelectItem>
              </Select>
            </div>
            
            <Textarea
              label="Step-by-Step Instructions"
              labelPlacement="outside"
              placeholder="Provide detailed instructions for completing this task"
              variant="bordered"
              value={taskData.manualTaskInstructions || ''}
              onValueChange={(value) => setTaskData({...taskData, manualTaskInstructions: value})}
              minRows={4}
            />
            
            <div className="space-y-2">
              <p className="text-small font-medium">Completion Verification Method</p>
              <RadioGroup
                orientation="vertical"
                value={taskData.manualTaskVerification || 'selfReported'}
                onValueChange={(value) => setTaskData({...taskData, manualTaskVerification: value})}
              >
                <Radio value="selfReported">Self-Reported Completion</Radio>
                <Radio value="managerApproval">Manager Approval Required</Radio>
                <Radio value="photoEvidence">Photo Evidence Required</Radio>
                <Radio value="documentUpload">Document Upload Required</Radio>
              </RadioGroup>
            </div>
            
            <div className="flex items-center gap-2 bg-warning-50 p-3 rounded-md">
              <Icon icon="lucide:alert-triangle" className="text-warning" />
              <span className="text-small text-warning-700">This task requires physical presence at the location</span>
            </div>
          </div>
        );
        
      case 'video':
        return (
          <div className="space-y-4 border-t border-default-200 pt-4 mt-4">
            <h3 className="text-md font-semibold">Training Video Details</h3>
            
            <Input
              label="Video Title"
              labelPlacement="outside"
              placeholder="Enter training video title"
              variant="bordered"
              value={taskData.videoTitle || ''}
              onValueChange={(value) => setTaskData({...taskData, videoTitle: value})}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Video Duration"
                labelPlacement="outside"
                placeholder="Enter video duration"
                type="number"
                variant="bordered"
                value={taskData.videoDuration || ''}
                onValueChange={(value) => setTaskData({...taskData, videoDuration: value})}
                endContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">{t('minutes')}</span></div>}
              />
              
              <Select
                label="Video Category"
                labelPlacement="outside"
                placeholder="Select category"
                variant="bordered"
                value={taskData.videoCategory || ''}
                onChange={(e) => setTaskData({...taskData, videoCategory: e.target.value})}
              >
                <SelectItem key="orientation">{t('companyOrientation')}</SelectItem>
                <SelectItem key="compliance">{t('complianceTraining')}</SelectItem>
                <SelectItem key="software">{t('softwareTraining')}</SelectItem>
                <SelectItem key="safety">{t('safetyTraining')}</SelectItem>
                <SelectItem key="product">{t('productTraining')}</SelectItem>
              </Select>
            </div>
            
            <RadioGroup
              label="Video Source"
              orientation="horizontal"
              value={taskData.videoSource || 'internal'}
              onValueChange={(value) => setTaskData({...taskData, videoSource: value})}
            >
              <Radio value="internal">Internal Library</Radio>
              <Radio value="external">External Link</Radio>
              <Radio value="lms">Learning Management System</Radio>
            </RadioGroup>
            
            {taskData.videoSource === 'internal' && (
              <Select
                label="Internal Video"
                labelPlacement="outside"
                placeholder="Select from library"
                variant="bordered"
                value={taskData.internalVideoId || ''}
                onChange={(e) => setTaskData({...taskData, internalVideoId: e.target.value})}
              >
                <SelectItem key="intro1">{t('companyIntroduction')}</SelectItem>
                <SelectItem key="policies">{t('companyPolicies')}</SelectItem>
                <SelectItem key="safety1">{t('safetyProcedures')}</SelectItem>
                <SelectItem key="systems">{t('companySystems')}</SelectItem>
                <SelectItem key="culture">{t('companyValues')}</SelectItem>
              </Select>
            )}
            
            {taskData.videoSource === 'external' && (
              <Input
                label="Video URL"
                labelPlacement="outside"
                placeholder="Enter video link"
                variant="bordered"
                value={taskData.externalVideoUrl || ''}
                onValueChange={(value) => setTaskData({...taskData, externalVideoUrl: value})}
                startContent={<Icon icon="lucide:video" className="text-default-400 flex-shrink-0" />}
              />
            )}
            
            {taskData.videoSource === 'lms' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Course Code"
                  labelPlacement="outside"
                  placeholder="Enter course code"
                  variant="bordered"
                  value={taskData.lmsCourseCode || ''}
                  onValueChange={(value) => setTaskData({...taskData, lmsCourseCode: value})}
                />
                
                <Input
                  label="Module Number"
                  labelPlacement="outside"
                  placeholder="Enter module number"
                  variant="bordered"
                  value={taskData.lmsModuleNumber || ''}
                  onValueChange={(value) => setTaskData({...taskData, lmsModuleNumber: value})}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <p className="text-small font-medium">Training Completion Requirements</p>
              <div className="flex flex-wrap gap-2">
                <Checkbox 
                  isSelected={taskData.needsQuiz}
                  onValueChange={(selected) => setTaskData({...taskData, needsQuiz: selected})}
                >
                  Completion Quiz Required
                </Checkbox>
                <Checkbox 
                  isSelected={taskData.needsCertificate}
                  onValueChange={(selected) => setTaskData({...taskData, needsCertificate: selected})}
                >
                  Certificate of Completion
                </Checkbox>
                <Checkbox 
                  isSelected={taskData.trackWatchTime}
                  onValueChange={(selected) => setTaskData({...taskData, trackWatchTime: selected})}
                >
                  Track Watch Duration
                </Checkbox>
              </div>
            </div>
            
            {taskData.needsQuiz && (
              <div className="p-3 bg-primary-50 rounded-md flex items-center gap-2">
                <Icon icon="lucide:clipboard-check" className="text-primary" />
                <span className="text-small">{t('quizWillBeRequiredAfterVideo')}</span>
                <Button size="sm" variant="flat" color="primary" className="ml-auto">
                  Setup Quiz
                </Button>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h3>{editMode ? "Edit Task" : "Add New Task"}</h3>
          <p className="text-small text-default-500 font-normal">
            {editMode ? "Modify details of the existing task" : "Create a new task and assign it to a team member"}
          </p>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label="Task Name"
              labelPlacement="outside"
              placeholder="Enter task name"
              value={taskData.title}
              onValueChange={(value) => setTaskData({...taskData, title: value})}
              variant="bordered"
              isRequired
            />
            
            <Textarea
              label="Description"
              labelPlacement="outside"
              placeholder="Enter a detailed description of what needs to be done"
              value={taskData.description}
              onValueChange={(value) => setTaskData({...taskData, description: value})}
              variant="bordered"
              minRows={3}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Assign To"
                labelPlacement="outside"
                placeholder="Select employee to assign"
                selectedKeys={taskData.employeeName ? [taskData.employeeName] : []}
                onChange={(e) => {
                  const selectedEmployee = mockEmployees.find(emp => emp.name === e.target.value);
                  if (selectedEmployee) {
                    setTaskData({
                      ...taskData, 
                      employeeName: selectedEmployee.name,
                      employeeAvatar: selectedEmployee.avatar,
                      department: selectedEmployee.department
                    });
                  }
                }}
                isRequired
              >
                {mockEmployees.map(emp => (
                  <SelectItem key={emp.name} textValue={emp.name}>
                    <div className="flex items-center gap-2">
                      <Avatar
                        size="sm"
                        src={emp.avatar}
                        name={emp.name}
                      />
                      <div>
                        <div className="font-medium text-sm">{emp.name}</div>
                        <div className="text-tiny text-default-500">{emp.department}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </Select>
              
              <Input
                label="Due Date"
                labelPlacement="outside"
                placeholder="Select due date"
                type="date"
                value={taskData.dueDate}
                onValueChange={(value) => setTaskData({...taskData, dueDate: value})}
                isRequired
              />
              
              <Select
                label="Task Type"
                labelPlacement="outside"
                placeholder="Select task type"
                selectedKeys={[taskData.type]}
                onChange={(e) => setTaskData({...taskData, type: e.target.value})}
              >
                <SelectItem key="document" value="document">Document</SelectItem>
                <SelectItem key="meeting" value="meeting">Meeting</SelectItem>
                <SelectItem key="tech" value="tech">Technical Setup</SelectItem>
                <SelectItem key="manual" value="manual">Manual Task</SelectItem>
                <SelectItem key="video" value="video">Training Video</SelectItem>
              </Select>
              
              <Select
                label="Status"
                labelPlacement="outside"
                placeholder="Select status"
                selectedKeys={[taskData.status]}
                onChange={(e) => {
                  const newStatus = e.target.value;
                  // Update progress based on status
                  let newProgress = taskData.progress;
                  if (newStatus === 'completed') newProgress = 100;
                  else if (newStatus === 'pending') newProgress = 0;
                  else if (newStatus === 'blocked') newProgress = taskData.progress || 20;
                  
                  setTaskData({
                    ...taskData, 
                    status: newStatus,
                    progress: newProgress
                  });
                }}
              >
                <SelectItem key="pending" value="pending">Not Started</SelectItem>
                <SelectItem key="inProgress" value="inProgress">In Progress</SelectItem>
                <SelectItem key="completed" value="completed">Completed</SelectItem>
                <SelectItem key="blocked" value="blocked">Blocked</SelectItem>
              </Select>
            </div>
            
            <div>
              <p className="text-small font-medium mb-2">Priority Level</p>
              <div className="flex gap-3">
                <Chip 
                  color="success" 
                  variant={taskData.priority === 'low' ? 'solid' : 'flat'}
                  className="cursor-pointer"
                  onClick={() => setTaskData({...taskData, priority: 'low'})}
                >
                  Low
                </Chip>
                <Chip 
                  color="warning" 
                  variant={taskData.priority === 'medium' ? 'solid' : 'flat'}
                  className="cursor-pointer"
                  onClick={() => setTaskData({...taskData, priority: 'medium'})}
                >
                  Medium
                </Chip>
                <Chip 
                  color="danger" 
                  variant={taskData.priority === 'high' ? 'solid' : 'flat'}
                  className="cursor-pointer"
                  onClick={() => setTaskData({...taskData, priority: 'high'})}
                >
                  High
                </Chip>
                
                <Button 
                  size="sm" 
                  variant="light" 
                  color="primary"
                  className="ml-auto"
                  startContent={showAdditionalFields ? 
                    <Icon icon="lucide:chevron-up" className="w-4 h-4" /> : 
                    <Icon icon="lucide:chevron-down" className="w-4 h-4" />
                  }
                  onPress={() => setShowAdditionalFields(!showAdditionalFields)}
                >
                  {showAdditionalFields ? "Hide Additional Details" : "Show Additional Details"}
                </Button>
              </div>
            </div>
            
            {renderTaskTypeSpecificFields()}
            
            {editMode && (
              <div>
                <p className="text-small font-medium mb-2">Task Completion Percentage</p>
                <div className="flex flex-wrap gap-2">
                  {[0, 25, 50, 75, 100].map((value) => (
                    <Button 
                      key={value} 
                      size="sm" 
                      variant={taskData.progress === value ? "solid" : "flat"}
                      color={
                        value === 100 ? "success" : 
                        value >= 50 ? "primary" : 
                        value > 0 ? "warning" : 
                        "default"
                      }
                      onPress={() => setTaskData({...taskData, progress: value})}
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex items-center gap-3 pt-2">
              <Checkbox 
                isSelected={taskData.status === 'completed'}
                onValueChange={(isSelected) => {
                  if (isSelected) {
                    setTaskData({...taskData, status: 'completed', progress: 100});
                  } else {
                    setTaskData({...taskData, status: 'inProgress', progress: 75});
                  }
                }}
              >
                Mark as Complete
              </Checkbox>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={handleSubmit}>
            {editMode ? "Update Task" : "Create Task"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};