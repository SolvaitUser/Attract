import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Card, CardBody, Chip, Avatar, Divider, Progress } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface ViewTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: any;
}

export const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ isOpen, onClose, task }) => {
  const { t } = useLanguage();
  
  if (!task) return null;
  
  const getStatusChip = (status: string): JSX.Element => {
    switch (status) {
      case 'completed':
        return <Chip color="success" size="sm">{t('completed')}</Chip>;
      case 'inProgress':
        return <Chip color="primary" size="sm">{t('inProgress')}</Chip>;
      case 'pending':
        return <Chip color="default" size="sm">{t('pending')}</Chip>;
      case 'blocked':
        return <Chip color="danger" size="sm">{t('blocked')}</Chip>;
      default:
        return <Chip color="default" size="sm">{status}</Chip>;
    }
  };
  
  const getPriorityChip = (priority: string): JSX.Element => {
    switch (priority) {
      case 'high':
        return <Chip color="danger" size="sm" variant="flat">{t('high')}</Chip>;
      case 'medium':
        return <Chip color="warning" size="sm" variant="flat">{t('medium')}</Chip>;
      case 'low':
        return <Chip color="success" size="sm" variant="flat">{t('low')}</Chip>;
      default:
        return <Chip color="default" size="sm" variant="flat">{priority}</Chip>;
    }
  };
  
  const getTypeChip = (type: string): JSX.Element => {
    switch (type) {
      case 'document':
        return <Chip color="primary" size="sm" variant="flat">{t('document')}</Chip>;
      case 'meeting':
        return <Chip color="secondary" size="sm" variant="flat">{t('meeting')}</Chip>;
      case 'tech':
        return <Chip color="secondary" size="sm" variant="flat">{t('techSetup')}</Chip>;
      case 'manual':
        return <Chip color="default" size="sm" variant="flat">{t('manual')}</Chip>;
      case 'video':
        return <Chip color="success" size="sm" variant="flat">{t('video')}</Chip>;
      default:
        return <Chip color="default" size="sm" variant="flat">{type}</Chip>;
    }
  };

  // Mock comments data
  const mockComments = [
    {
      id: 1,
      text: "I've started working on this. Will need access to the HR system.",
      author: "Sara Al-Qahtani",
      authorAvatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=7",
      date: "2023-06-20 14:30"
    },
    {
      id: 2,
      text: "Access granted. You should be able to log in now.",
      author: "Ahmed Al-Saud",
      authorAvatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=6",
      date: "2023-06-21 09:15"
    }
  ];
  
  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      action: "Task created",
      actor: "System",
      date: "2023-06-19 11:00"
    },
    {
      id: 2,
      action: "Task assigned to Sara Al-Qahtani",
      actor: "Ahmed Al-Saud",
      date: "2023-06-19 11:05"
    },
    {
      id: 3,
      action: "Progress updated: 30%",
      actor: "Sara Al-Qahtani",
      date: "2023-06-21 10:30"
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">{task.title}</h2>
            {getStatusChip(task.status)}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              {task.priority === 'high' && <Icon icon="lucide:alert-circle" className="w-4 h-4 text-danger" />}
              {task.priority === 'medium' && <Icon icon="lucide:alert-triangle" className="w-4 h-4 text-warning" />}
              {task.priority === 'low' && <Icon icon="lucide:info" className="w-4 h-4 text-success" />}
              {getPriorityChip(task.priority)}
            </div>
            <div className="text-default-400">•</div>
            <div className="flex items-center gap-1">
              {getTypeChip(task.type)}
            </div>
            <div className="text-default-400">•</div>
            <div className="text-small text-default-500">
              Task #{task.id.split('-')[1]}
            </div>
          </div>
        </ModalHeader>
        
        <Divider/>
        
        <ModalBody className="overflow-hidden">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-none border border-default-200 col-span-2">
                <CardBody>
                  <h3 className="text-sm font-semibold uppercase text-default-500 mb-2">Task Description</h3>
                  <p className="text-default-700">
                    {task.description || "This task requires reviewing and processing the employee's Iqama documentation and ensuring all information is correctly registered in the system."}
                  </p>
                  
                  <h3 className="text-sm font-semibold uppercase text-default-500 mt-6 mb-2">Task Details</h3>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                    <div>
                      <span className="text-small text-default-500">Task Type:</span>
                      <div className="font-medium">{getTypeChip(task.type)}</div>
                    </div>
                    <div>
                      <span className="text-small text-default-500">Priority:</span>
                      <div className="font-medium">{getPriorityChip(task.priority)}</div>
                    </div>
                    <div>
                      <span className="text-small text-default-500">Due Date:</span>
                      <div className={`font-medium ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-danger' : ''}`}>{task.dueDate}</div>
                    </div>
                    <div>
                      <span className="text-small text-default-500">Created Date:</span>
                      <div className="font-medium">June 15, 2023</div>
                    </div>
                    <div>
                      <span className="text-small text-default-500">Progress:</span>
                      <div>
                        <Progress 
                          value={task.progress} 
                          color={
                            task.progress === 100 ? "success" : 
                            task.progress >= 50 ? "primary" : 
                            task.progress > 0 ? "warning" : 
                            "default"
                          }
                          size="sm"
                          className="max-w-24 mt-1"
                          aria-label="Task progress"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-semibold uppercase text-default-500 mt-6 mb-2">Supporting Documents</h3>
                  <div className="flex gap-2">
                    <Card className="w-full max-w-[180px] shadow-none border border-default-200">
                      <CardBody className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-default-100">
                            <Icon icon="lucide:file-text" className="w-5 h-5 text-default-500" />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <p className="text-small font-medium whitespace-nowrap text-ellipsis overflow-hidden">iqama_details.pdf</p>
                            <p className="text-tiny text-default-500">245 KB</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Card className="w-full max-w-[180px] shadow-none border border-default-200">
                      <CardBody className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-full bg-default-100">
                            <Icon icon="lucide:file-image" className="w-5 h-5 text-default-500" />
                          </div>
                          <div className="flex-grow overflow-hidden">
                            <p className="text-small font-medium whitespace-nowrap text-ellipsis overflow-hidden">iqama_scan.jpg</p>
                            <p className="text-tiny text-default-500">1.2 MB</p>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                  
                  <h3 className="text-sm font-semibold uppercase text-default-500 mt-6 mb-2">Comments & Discussions</h3>
                  <div className="space-y-3">
                    {mockComments.map(comment => (
                      <div key={comment.id} className="flex items-start gap-3">
                        <Avatar
                          size="sm" 
                          src={comment.authorAvatar}
                          name={comment.author}
                        />
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-tiny text-default-500">{comment.date}</span>
                          </div>
                          <p className="text-sm text-default-700 mt-1">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex items-start gap-3 pt-2">
                      <Avatar
                        size="sm" 
                        src="https://img.heroui.chat/image/avatar?w=100&h=100&u=8"
                        name="Current User"
                      />
                      <div className="flex-grow">
                        <textarea 
                          className="w-full p-2 text-sm border border-default-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="Add a comment or update about this task"
                          rows={2}
                        ></textarea>
                        <Button 
                          size="sm" 
                          color="primary" 
                          className="mt-2"
                        >
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card className="shadow-none border border-default-200">
                <CardBody>
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase text-default-500 mb-2">Task Assigned To</h3>
                    <div className="flex items-center gap-2 mb-6">
                      <Avatar 
                        size="md" 
                        src={task.employeeAvatar} 
                        name={task.employeeName} 
                      />
                      <div>
                        <p className="font-medium">{task.employeeName}</p>
                        <p className="text-small text-default-500">{task.department}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase text-default-500 mb-2">Onboarding Information</h3>
                    <div className="space-y-2 mb-6">
                      <div>
                        <span className="text-small text-default-500">Employee:</span>
                        <div className="font-medium">Mohammed Al-Harbi</div>
                      </div>
                      <div>
                        <span className="text-small text-default-500">Position:</span>
                        <div className="font-medium">Software Developer</div>
                      </div>
                      <div>
                        <span className="text-small text-default-500">Start Date:</span>
                        <div className="font-medium">Aug 15, 2023</div>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-sm font-semibold uppercase text-default-500 mb-2">Activity History</h3>
                  <div className="space-y-3">
                    {mockActivities.map(activity => (
                      <div key={activity.id} className="flex items-start gap-2">
                        <div className="mt-1">
                          {activity.action.includes("created") && (
                            <Icon icon="lucide:plus-circle" className="w-4 h-4 text-success" />
                          )}
                          {activity.action.includes("assigned") && (
                            <Icon icon="lucide:user-plus" className="w-4 h-4 text-primary" />
                          )}
                          {activity.action.includes("updated") && (
                            <Icon icon="lucide:refresh-cw" className="w-4 h-4 text-warning" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm">{activity.action}</p>
                          <p className="text-tiny text-default-500">
                            {activity.actor} • {activity.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </ModalBody>
        
        <ModalFooter>
          <div className="flex justify-between w-full">
            <div>
              <Button
                color="danger"
                variant="light"
                startContent={<Icon icon="lucide:flag" className="w-4 h-4" />}
              >
                Report Issue
              </Button>
            </div>
            <div className="flex gap-2">
              <Button
                variant="flat"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                color="primary"
                startContent={<Icon icon="lucide:pencil" className="w-4 h-4" />}
              >
                Edit Task
              </Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};