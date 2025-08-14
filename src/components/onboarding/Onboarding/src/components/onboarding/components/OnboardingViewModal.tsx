import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Chip, Avatar, Tabs, Tab, Progress, Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { AssignedTasksView } from './AssignedTasksView';

interface OnboardingViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onboarding: any;
}

export const OnboardingViewModal: React.FC<OnboardingViewModalProps> = ({ 
  isOpen, 
  onClose, 
  onboarding 
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState('details');
  
  // If no onboarding is selected, don't render the modal content
  if (!onboarding) {
    return null;
  }
  
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
  
  const mockTasks = [
    {
      id: 'task1',
      title: 'Complete employee information form',
      status: 'completed',
      dueDate: '2023-07-15',
      owner: 'Sarah Johnson',
      type: 'admin',
      completedAt: '2023-07-14',
      completedBy: 'Sarah Johnson'
    },
    {
      id: 'task2',
      title: 'Set up email account',
      status: 'completed',
      dueDate: '2023-07-16',
      owner: 'Mike Chen',
      type: 'tech',
      completedAt: '2023-07-15',
      completedBy: 'Mike Chen'
    },
    {
      id: 'task3',
      title: 'Complete security training',
      status: 'inProgress',
      dueDate: '2023-07-20',
      owner: onboarding.employeeName,
      type: 'compliance'
    },
    {
      id: 'task4',
      title: 'Review company policies',
      status: 'pending',
      dueDate: '2023-07-22',
      owner: onboarding.employeeName,
      type: 'admin'
    },
    {
      id: 'task5',
      title: 'Attend department orientation',
      status: 'pending',
      dueDate: '2023-07-25',
      owner: 'Team Lead',
      type: 'orientation'
    }
  ];
  
  const mockDocuments = [
    {
      id: 'doc1',
      name: t('document_passport'),
      status: 'verified',
      uploadedAt: '2023-07-12',
      verifiedBy: 'HR Manager'
    },
    {
      id: 'doc2',
      name: t('document_nationalId'),
      status: 'verified',
      uploadedAt: '2023-07-12',
      verifiedBy: 'HR Manager'
    },
    {
      id: 'doc3',
      name: t('document_certificates'),
      status: 'uploaded',
      uploadedAt: '2023-07-13'
    },
    {
      id: 'doc4',
      name: t('document_bankInfo'),
      status: 'pending'
    },
    {
      id: 'doc5',
      name: t('document_signedOffer'),
      status: 'verified',
      uploadedAt: '2023-07-10',
      verifiedBy: 'HR Manager'
    }
  ];
  
  const mockNotes = [
    {
      id: 'note1',
      content: 'Employee has requested remote work for the first week due to relocation.',
      createdAt: '2023-07-13',
      createdBy: 'HR Manager'
    },
    {
      id: 'note2',
      content: 'Hardware setup will be done on Monday, July 17th.',
      createdAt: '2023-07-15',
      createdBy: 'IT Support'
    }
  ];
  
  const calculateDocumentProgress = () => {
    const completed = mockDocuments.filter(doc => doc.status === 'verified' || doc.status === 'uploaded').length;
    return Math.round((completed / mockDocuments.length) * 100);
  };
  
  const calculateTaskProgress = () => {
    const completed = mockTasks.filter(task => task.status === 'completed').length;
    return Math.round((completed / mockTasks.length) * 100);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <div className="space-y-6">
            <Card className="shadow-none border border-default-200">
              <CardBody className="p-4">
                <h3 className="text-md font-semibold mb-4">{t('employeeInformation')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  <div>
                    <p className="text-small text-default-500">{t('name')}</p>
                    <p className="font-medium">{onboarding.employeeName}</p>
                  </div>
                  <div>
                    <p className="text-small text-default-500">{t('position')}</p>
                    <p className="font-medium">{onboarding.position}</p>
                  </div>
                  <div>
                    <p className="text-small text-default-500">{t('department')}</p>
                    <p className="font-medium">{onboarding.department}</p>
                  </div>
                  <div>
                    <p className="text-small text-default-500">{t('startDate')}</p>
                    <p className="font-medium">{onboarding.startDate}</p>
                  </div>
                  <div>
                    <p className="text-small text-default-500">{t('location')}</p>
                    <p className="font-medium">Riyadh, Saudi Arabia</p>
                  </div>
                  <div>
                    <p className="text-small text-default-500">{t('employeeType')}</p>
                    <p className="font-medium">Full-Time</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card className="shadow-none border border-default-200">
              <CardBody className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-semibold">{t('onboardingProgress')}</h3>
                  {getStatusChip(onboarding.progress)}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm">{t('overallProgress')}</p>
                      <p className="text-sm font-medium">{onboarding.progress}%</p>
                    </div>
                    <Progress value={onboarding.progress} color="primary" size="sm" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm">{t('documentationProgress')}</p>
                      <p className="text-sm font-medium">{calculateDocumentProgress()}%</p>
                    </div>
                    <Progress value={calculateDocumentProgress()} color="success" size="sm" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <p className="text-sm">{t('tasksProgress')}</p>
                      <p className="text-sm font-medium">{calculateTaskProgress()}%</p>
                    </div>
                    <Progress value={calculateTaskProgress()} color="warning" size="sm" />
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card className="shadow-none border border-default-200">
              <CardBody className="p-4">
                <h3 className="text-md font-semibold mb-4">{t('keyContacts')}</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        size="sm" 
                        src={onboarding.ownerAvatar} 
                        name={onboarding.ownerName} 
                      />
                      <div>
                        <p className="font-medium">{onboarding.ownerName}</p>
                        <p className="text-small text-default-500">{t('onboardingOwner')}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="light" startContent={<Icon icon="lucide:mail" className="w-4 h-4" />}>
                      {t('contact')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        size="sm" 
                        src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2345" 
                        name="Ahmad Al-Sayed" 
                      />
                      <div>
                        <p className="font-medium">Ahmad Al-Sayed</p>
                        <p className="text-small text-default-500">{t('hrManager')}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="light" startContent={<Icon icon="lucide:mail" className="w-4 h-4" />}>
                      {t('contact')}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar 
                        size="sm" 
                        src="https://img.heroui.chat/image/avatar?w=200&h=200&u=3456" 
                        name="Sarah Johnson" 
                      />
                      <div>
                        <p className="font-medium">Sarah Johnson</p>
                        <p className="text-small text-default-500">{t('departmentManager')}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="light" startContent={<Icon icon="lucide:mail" className="w-4 h-4" />}>
                      {t('contact')}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        );
        
      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-semibold">{t('onboardingTasks')}</h3>
                <p className="text-small text-default-500">{mockTasks.length} tasks</p>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="flat"
                  color="primary"
                  startContent={<Icon icon="lucide:filter" className="w-4 h-4" />}
                >
                  {t('filter')}
                </Button>
                <Button 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
                >
                  {t('addTask')}
                </Button>
              </div>
            </div>
            
            <Card className="shadow-none border border-default-200">
              <Table 
                removeWrapper
                aria-label={t('tasksList')}
              >
                <TableHeader>
                  <TableColumn>{t('task')}</TableColumn>
                  <TableColumn>{t('status')}</TableColumn>
                  <TableColumn>{t('dueDate')}</TableColumn>
                  <TableColumn>{t('assignedTo')}</TableColumn>
                  <TableColumn>{t('type')}</TableColumn>
                  <TableColumn>{t('actions')}</TableColumn>
                </TableHeader>
                <TableBody>
                  {mockTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {task.status === 'completed' ? (
                            <Icon icon="lucide:check-circle" className="w-5 h-5 text-success" />
                          ) : (
                            <Icon icon="lucide:circle" className="w-5 h-5 text-default-300" />
                          )}
                          {task.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          size="sm" 
                          color={
                            task.status === 'completed' ? 'success' :
                            task.status === 'inProgress' ? 'primary' :
                            'default'
                          }
                        >
                          {t(task.status)}
                        </Chip>
                      </TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>{task.owner}</TableCell>
                      <TableCell>
                        <Chip 
                          size="sm" 
                          color={
                            task.type === 'admin' ? 'primary' :
                            task.type === 'compliance' ? 'danger' :
                            task.type === 'tech' ? 'secondary' :
                            task.type === 'orientation' ? 'success' :
                            'default'
                          }
                        >
                          {t(task.type)}
                        </Chip>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:eye" className="w-4 h-4" />
                          </Button>
                          <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:pencil" className="w-4 h-4" />
                          </Button>
                          {task.status !== 'completed' && (
                            <Button isIconOnly size="sm" variant="light" color="success">
                              <Icon icon="lucide:check" className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );
        
      case 'documents':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-semibold">{t('requiredDocuments')}</h3>
                <p className="text-small text-default-500">{mockDocuments.length} documents</p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                color="primary"
                startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
              >
                {t('addDocument')}
              </Button>
            </div>
            
            <Card className="shadow-none border border-default-200">
              <Table 
                removeWrapper
                aria-label={t('documentsList')}
              >
                <TableHeader>
                  <TableColumn>{t('document')}</TableColumn>
                  <TableColumn>{t('status')}</TableColumn>
                  <TableColumn>{t('uploadedAt')}</TableColumn>
                  <TableColumn>{t('verifiedBy')}</TableColumn>
                  <TableColumn>{t('actions')}</TableColumn>
                </TableHeader>
                <TableBody>
                  {mockDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>
                        <Chip 
                          size="sm" 
                          color={
                            doc.status === 'verified' ? 'success' :
                            doc.status === 'uploaded' ? 'primary' :
                            'default'
                          }
                        >
                          {t(doc.status)}
                        </Chip>
                      </TableCell>
                      <TableCell>{doc.uploadedAt || '-'}</TableCell>
                      <TableCell>{doc.verifiedBy || '-'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:download" className="w-4 h-4" />
                          </Button>
                          <Button isIconOnly size="sm" variant="light">
                            <Icon icon="lucide:eye" className="w-4 h-4" />
                          </Button>
                          {doc.status !== 'verified' && (
                            <Button isIconOnly size="sm" variant="light" color="success">
                              <Icon icon="lucide:check" className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        );
        
      case 'notes':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-md font-semibold">{t('activityAndNotes')}</h3>
              <Button 
                size="sm" 
                color="primary"
                startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
              >
                {t('addNote')}
              </Button>
            </div>
            
            {/* Add Note Form */}
            <Card className="shadow-none border border-default-200">
              <CardBody className="p-4">
                <textarea 
                  className="w-full p-2 border border-default-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder={t('writeANote')}
                  rows={3}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <Button size="sm" color="primary">
                    {t('saveNote')}
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            {/* Notes Timeline */}
            <div className="space-y-4">
              {mockNotes.map((note) => (
                <Card key={note.id} className="shadow-none border border-default-200">
                  <CardBody className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <Icon icon="lucide:message-square" className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-default-900">{note.content}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-small text-default-500">
                              {note.createdBy} · {note.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button isIconOnly size="sm" variant="light">
                        <Icon icon="lucide:more-vertical" className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
              
              {/* System activity log entries */}
              <Card className="shadow-none border border-default-200">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon icon="lucide:check-circle" className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="text-default-700">
                        Task <span className="font-medium">"Set up email account"</span> was marked as completed
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-small text-default-500">
                          System · 2023-07-15
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="shadow-none border border-default-200">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Icon icon="lucide:upload" className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-default-700">
                        Document <span className="font-medium">"Certificates"</span> was uploaded
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-small text-default-500">
                          HR Manager · 2023-07-13
                        </span>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        );
        
      case 'assignedTasks':
        return (
          <div className="space-y-6">
            <AssignedTasksView 
              userId="currentUser" // This would be the actual user ID in a real app
              onboardingId={onboarding.id}
            />
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader>
          <div className="flex items-center gap-2">
            <h2 className="text-xl">{t('onboardingDetails')}</h2>
            {getStatusChip(onboarding.progress)}
          </div>
          <div className="flex items-center gap-3 mt-2">
            <Avatar 
              src={onboarding.avatar} 
              name={onboarding.employeeName} 
              size="sm" 
              className="mr-1"
            />
            <span className="font-medium">{onboarding.employeeName}</span>
            <span className="text-default-500">{onboarding.position}</span>
          </div>
        </ModalHeader>
        
        <Divider/>
        
        <ModalBody className="pb-6">
          <Tabs 
            selectedKey={activeTab} 
            onSelectionChange={setActiveTab}
            color="primary"
            variant="light"
            aria-label="Onboarding details tabs"
            classNames={{
              tabList: "gap-4",
            }}
          >
            <Tab 
              key="details" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:user" width={16} />
                  <span>{t('details')}</span>
                </div>
              }
            >
              {renderTabContent()}
            </Tab>
            <Tab 
              key="tasks" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:check-square" width={16} />
                  <span>{t('tasks')}</span>
                </div>
              }
            >
              {renderTabContent()}
            </Tab>
            <Tab 
              key="assignedTasks" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:list-checks" width={16} />
                  <span>{t('assignedTasks')}</span>
                </div>
              }
            >
              {renderTabContent()}
            </Tab>
            <Tab 
              key="documents" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:file-text" width={16} />
                  <span>{t('documents')}</span>
                </div>
              }
            >
              {renderTabContent()}
            </Tab>
            <Tab 
              key="notes" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:message-square" width={16} />
                  <span>{t('notes')}</span>
                </div>
              }
            >
              {renderTabContent()}
            </Tab>
          </Tabs>
        </ModalBody>
        
        <ModalFooter>
          <Button 
            variant="flat" 
            startContent={<Icon icon="lucide:edit" className="w-4 h-4" />}
            onPress={() => {
              setShowEditWizard(true);
              onClose();
            }}
          >
            {t('edit')}
          </Button>
          <Button 
            color="primary" 
            onPress={onClose}
          >
            {t('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};