import React from 'react';
import { Card, CardBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Progress, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Input, Select, SelectItem, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { ViewTaskModal } from './ViewTaskModal';
import { AddEditTaskModal } from './AddEditTaskModal';

interface AssignedTasksViewProps {
  userId: string;  // Current logged in user ID
  onboardingId?: string;  // Optional - if we want to filter by specific onboarding
}

export const AssignedTasksView: React.FC<AssignedTasksViewProps> = ({ userId, onboardingId }) => {
  const { t } = useLanguage();
  const [selectedTask, setSelectedTask] = React.useState<any>(null);
  const [updateModalOpen, setUpdateModalOpen] = React.useState(false);
  const [statusUpdateNote, setStatusUpdateNote] = React.useState('');
  const [completionPercentage, setCompletionPercentage] = React.useState(0);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [filterDepartment, setFilterDepartment] = React.useState('all');
  const [filterPriority, setFilterPriority] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [searchText, setSearchText] = React.useState('');
  const [viewTaskModalOpen, setViewTaskModalOpen] = React.useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  
  // Mock data for assigned tasks
  React.useEffect(() => {
    // In a real app, this would be an API call to fetch assigned tasks for the user
    const mockAssignedTasks = [
      {
        id: 'task1',
        title: 'Submit Iqama Copy',
        onboardingId: 'onb1',
        employeeName: 'HR Admin',
        employeeAvatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=111',
        department: 'HR',
        dueDate: 'Jun 22',
        status: 'inProgress',
        progress: 60,
        priority: 'high',
        type: 'document'
      },
      {
        id: 'task2',
        title: 'Orientation Meeting',
        onboardingId: 'onb1',
        employeeName: 'HR Lead',
        employeeAvatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=222',
        department: 'HR',
        dueDate: 'Jun 23',
        status: 'pending',
        progress: 0,
        priority: 'medium',
        type: 'meeting'
      },
      {
        id: 'task3',
        title: 'Email Setup',
        onboardingId: 'onb2',
        employeeName: 'IT Team',
        employeeAvatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=333',
        department: 'IT',
        dueDate: 'Jun 24',
        status: 'completed',
        progress: 100,
        priority: 'high',
        type: 'tech'
      },
      {
        id: 'task4',
        title: 'Sign Bank Form',
        onboardingId: 'onb3',
        employeeName: 'Employee',
        employeeAvatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=444',
        department: 'Finance',
        dueDate: 'Jun 25',
        status: 'blocked',
        progress: 20,
        priority: 'medium',
        type: 'manual'
      },
      {
        id: 'task5',
        title: 'Watch Training Video',
        onboardingId: 'onb3',
        employeeName: 'Employee',
        employeeAvatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=555',
        department: 'Training',
        dueDate: 'Jun 27',
        status: 'inProgress',
        progress: 40,
        priority: 'low',
        type: 'video'
      }
    ];
    
    // Filter by onboardingId if provided
    const filteredTasks = onboardingId 
      ? mockAssignedTasks.filter(task => task.onboardingId === onboardingId)
      : mockAssignedTasks;
      
    setTasks(filteredTasks);
  }, [onboardingId]);

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
      case 'admin':
        return <Chip color="primary" size="sm" variant="flat">{t('admin')}</Chip>;
      case 'tech':
        return <Chip color="secondary" size="sm" variant="flat">{t('techSetup')}</Chip>;
      case 'compliance':
        return <Chip color="danger" size="sm" variant="flat">{t('compliance')}</Chip>;
      case 'training':
        return <Chip color="success" size="sm" variant="flat">{t('training')}</Chip>;
      case 'orientation':
        return <Chip color="warning" size="sm" variant="flat">{t('orientation')}</Chip>;
      default:
        return <Chip color="default" size="sm" variant="flat">{type}</Chip>;
    }
  };
  
  const handleOpenUpdateModal = (task: any) => {
    setSelectedTask(task);
    setCompletionPercentage(task.progress);
    setStatusUpdateNote('');
    setUpdateModalOpen(true);
  };
  
  const handleUpdateStatus = () => {
    // Update the task status in the tasks list
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask.id) {
        const newStatus = completionPercentage === 100 ? 'completed' : 
                         completionPercentage > 0 ? 'inProgress' : 'pending';
        
        return {
          ...task,
          status: newStatus,
          progress: completionPercentage
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setUpdateModalOpen(false);
    
    // In a real app, here we would make an API call to update the task status
  };
  
  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const inProgressCount = tasks.filter(t => t.status === 'inProgress').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const blockedCount = tasks.filter(t => t.status === 'blocked').length;
  
  const filteredTasks = React.useMemo(() => {
    return tasks.filter(task => {
      // Filter by search text
      const matchesSearch = searchText === '' || 
        task.title.toLowerCase().includes(searchText.toLowerCase()) ||
        task.employeeName.toLowerCase().includes(searchText.toLowerCase());
      
      // Filter by department
      const matchesDepartment = filterDepartment === 'all' || 
        task.department === filterDepartment;
      
      // Filter by priority
      const matchesPriority = filterPriority === 'all' || 
        task.priority === filterPriority;
      
      // Filter by status
      const matchesStatus = filterStatus === 'all' || 
        task.status === filterStatus;
      
      return matchesSearch && matchesDepartment && matchesPriority && matchesStatus;
    });
  }, [tasks, searchText, filterDepartment, filterPriority, filterStatus]);
  
  const renderFilters = () => {
    if (onboardingId) return null;
    
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-end">
        <Input
          label={t('search')}
          placeholder={t('searchByTaskOrEmployee')}
          value={searchText}
          onValueChange={setSearchText}
          startContent={<Icon icon="lucide:search" className="w-4 h-4 text-default-400" />}
          className="w-full md:w-72"
        />
        <div className="flex gap-3 flex-wrap">
          <Select
            label={t('department')}
            selectedKeys={[filterDepartment]}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-36"
            size="sm"
          >
            <SelectItem key="all">{t('allDepartments')}</SelectItem>
            <SelectItem key="IT">IT</SelectItem>
            <SelectItem key="HR">HR</SelectItem>
            <SelectItem key="Marketing">{t('marketing')}</SelectItem>
            <SelectItem key="Sales">{t('sales')}</SelectItem>
          </Select>
          <Select
            label={t('priority')}
            selectedKeys={[filterPriority]}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="w-36"
            size="sm"
          >
            <SelectItem key="all">{t('allPriorities')}</SelectItem>
            <SelectItem key="high">{t('high')}</SelectItem>
            <SelectItem key="medium">{t('medium')}</SelectItem>
            <SelectItem key="low">{t('low')}</SelectItem>
          </Select>
          <Select
            label={t('status')}
            selectedKeys={[filterStatus]}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-36"
            size="sm"
          >
            <SelectItem key="all">{t('allStatuses')}</SelectItem>
            <SelectItem key="pending">{t('pending')}</SelectItem>
            <SelectItem key="inProgress">{t('inProgress')}</SelectItem>
            <SelectItem key="completed">{t('completed')}</SelectItem>
            <SelectItem key="blocked">{t('blocked')}</SelectItem>
          </Select>
        </div>
      </div>
    );
  };
  
  const getTypeTooltip = (type: string): string => {
    switch (type) {
      case 'document':
        return 'Document requires submission or verification';
      case 'meeting':
        return 'Scheduled meeting or orientation session';
      case 'tech':
        return 'Technical setup or configuration';
      case 'manual':
        return 'Manual task requiring physical action';
      case 'video':
        return 'Video or online training material';
      default:
        return type;
    }
  };
  
  // Add function to handle adding a new task
  const handleAddTask = (newTask: any) => {
    const taskWithId = {
      ...newTask,
      id: `task-${Date.now()}`, // Generate a unique ID
    };
    setTasks([...tasks, taskWithId]);
    setAddTaskModalOpen(false);
  };
  
  // Add function to handle editing a task
  const handleEditTask = (updatedTask: any) => {
    setTasks(
      tasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    setUpdateModalOpen(false);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardBody>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold">My Onboarding Tasks</h3>
              <p className="text-default-500">Manage and update tasks assigned to you for this employee onboarding process.</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="flat" 
                color="primary"
                startContent={<Icon icon="lucide:plus" width={16} />}
                onPress={() => {
                  setSelectedTask(null);
                  setEditMode(false);
                  setAddTaskModalOpen(true);
                }}
              >
                Create New Task
              </Button>
              
              {!onboardingId && (
                <Button 
                  variant="flat" 
                  color="primary"
                  startContent={<Icon icon="lucide:filter" width={16} />}
                  onPress={() => document.getElementById('filter-section')?.classList.toggle('hidden')}
                >
                  {t('filter')}
                </Button>
              )}
            </div>
          </div>
          
          <div id="filter-section" className={onboardingId ? 'hidden' : ''}>
            {renderFilters()}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-default-50 border border-default-200">
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-default-100 rounded-full">
                    <Icon icon="lucide:clock" className="w-5 h-5 text-default-500" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{pendingCount}</p>
                    <p className="text-small text-default-500">Not Started</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card className="bg-primary-50 border border-primary-200">
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-primary-100 rounded-full">
                    <Icon icon="lucide:hourglass" className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{inProgressCount}</p>
                    <p className="text-small text-default-500">In Progress</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card className="bg-success-50 border border-success-200">
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-success-100 rounded-full">
                    <Icon icon="lucide:check-circle" className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{completedCount}</p>
                    <p className="text-small text-default-500">Completed</p>
                  </div>
                </div>
              </CardBody>
            </Card>
            
            <Card className="bg-danger-50 border border-danger-200">
              <CardBody className="p-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-danger-100 rounded-full">
                    <Icon icon="lucide:alert-octagon" className="w-5 h-5 text-danger" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold">{blockedCount}</p>
                    <p className="text-small text-default-500">Blocked</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
          
          <Table 
            aria-label="Assigned onboarding tasks"
            removeWrapper
          >
            <TableHeader>
              <TableColumn isRowHeader>Task Name</TableColumn>
              <TableColumn>Assigned To</TableColumn>
              <TableColumn>Due Date</TableColumn>
              <TableColumn>Priority</TableColumn>
              <TableColumn>Task Type</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Progress (%)</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={t('noAssignedTasks')}>
              {filteredTasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <div className="font-medium">{task.title}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar 
                        size="sm" 
                        src={task.employeeAvatar} 
                        name={task.employeeName}
                      />
                      <div>
                        <div className="font-medium text-sm">{task.employeeName}</div>
                        <div className="text-tiny text-default-500">{task.department}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={`text-sm ${new Date(task.dueDate) < new Date() && task.status !== 'completed' ? 'text-danger' : ''}`}>
                      {task.dueDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {task.priority === 'high' && <Icon icon="lucide:alert-circle" className="w-4 h-4 text-danger" />}
                      {task.priority === 'medium' && <Icon icon="lucide:alert-triangle" className="w-4 h-4 text-warning" />}
                      {task.priority === 'low' && <Icon icon="lucide:info" className="w-4 h-4 text-success" />}
                      {getPriorityChip(task.priority)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Tooltip content={getTypeTooltip(task.type)}>
                        {getTypeChip(task.type)}
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusChip(task.status)}</TableCell>
                  <TableCell>
                    <Progress 
                      value={task.progress} 
                      color={
                        task.progress === 100 ? "success" : 
                        task.progress >= 50 ? "primary" : 
                        task.progress > 0 ? "warning" : 
                        "default"
                      }
                      size="sm"
                      aria-label={`${task.progress}% complete`}
                      className="max-w-md"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        onPress={() => {
                          setSelectedTask(task);
                          setViewTaskModalOpen(true);
                        }}
                      >
                        <Icon icon="lucide:eye" className="w-4 h-4" />
                      </Button>
                      
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        color="primary"
                        onPress={() => {
                          setSelectedTask(task);
                          setEditMode(true);
                          setAddTaskModalOpen(true);
                        }}
                      >
                        <Icon icon="lucide:edit-3" className="w-4 h-4" />
                      </Button>
                      
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light"
                        color="success"
                        onPress={() => handleOpenUpdateModal(task)}
                      >
                        <Icon icon="lucide:percent" className="w-4 h-4" />
                      </Button>
                      
                      <Dropdown>
                        <DropdownTrigger>
                          <Icon icon="lucide:more-vertical" className="w-4 h-4" />
                        </DropdownTrigger>
                        <DropdownMenu>
                          <DropdownItem
                            onClick={() => {
                              setSelectedTask(task);
                              setEditMode(true);
                              setAddTaskModalOpen(true);
                            }}
                          >
                            Edit
                          </DropdownItem>
                          <DropdownItem
                            onClick={() => {
                              setSelectedTask(task);
                              setUpdateModalOpen(true);
                            }}
                          >
                            Update Status
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      
      <Modal isOpen={updateModalOpen} onClose={() => setUpdateModalOpen(false)} size="lg">
        <ModalContent>
          {selectedTask && (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h3>{t('updateTaskStatus')}</h3>
                <p className="text-small text-default-500 font-normal">{selectedTask.title}</p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  <div>
                    <p className="text-small font-medium mb-2">{t('taskCompletion')}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex-grow">
                        <Progress 
                          value={completionPercentage} 
                          color={
                            completionPercentage === 100 ? "success" : 
                            completionPercentage >= 50 ? "primary" : 
                            completionPercentage > 0 ? "warning" : 
                            "default"
                          }
                          aria-label="Task completion progress"
                          className="h-2"
                        />
                      </div>
                      <div className="w-16 text-right">
                        <span className="font-medium">{completionPercentage}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {[0, 25, 50, 75, 100].map((value) => (
                      <Button 
                        key={value} 
                        size="sm" 
                        variant={completionPercentage === value ? "solid" : "flat"}
                        color={
                          value === 100 ? "success" : 
                          value >= 50 ? "primary" : 
                          value > 0 ? "warning" : 
                          "default"
                        }
                        onPress={() => setCompletionPercentage(value)}
                      >
                        {value}%
                      </Button>
                    ))}
                  </div>
                  
                  <Textarea
                    label={t('statusUpdateNote')}
                    placeholder={t('addNoteAboutThisUpdate')}
                    value={statusUpdateNote}
                    onValueChange={setStatusUpdateNote}
                    variant="bordered"
                  />
                  
                  {completionPercentage === 100 && (
                    <div className="p-2 bg-success-50 border border-success-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Icon icon="lucide:check-circle" className="w-5 h-5 text-success mt-0.5" />
                        <div>
                          <p className="font-medium text-success">{t('markingAsComplete')}</p>
                          <p className="text-small text-default-700">{t('completeTaskNotification')}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={() => setUpdateModalOpen(false)}>
                  {t('cancel')}
                </Button>
                <Button 
                  color={completionPercentage === 100 ? "success" : "primary"}
                  onPress={handleUpdateStatus}
                  startContent={completionPercentage === 100 ? <Icon icon="lucide:check" width={16} /> : undefined}
                >
                  {completionPercentage === 100 ? t('markAsComplete') : t('updateStatus')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      <ViewTaskModal 
        isOpen={viewTaskModalOpen}
        onClose={() => setViewTaskModalOpen(false)}
        task={selectedTask}
      />
      
      <AddEditTaskModal 
        isOpen={addTaskModalOpen}
        onClose={() => setAddTaskModalOpen(false)}
        onSave={editMode ? handleEditTask : handleAddTask}
        task={editMode ? selectedTask : null}
        editMode={editMode}
      />
    </div>
  );
};