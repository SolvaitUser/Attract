import React from 'react';
import { Card, CardBody, Input, Button, Select, SelectItem, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { Avatar } from '@heroui/react';
import { mockEmployees } from '../data/mockData';

interface TaskCreatorProps {
  onAddTask: (task: any) => void;
}

export const TaskCreator: React.FC<TaskCreatorProps> = ({ onAddTask }) => {
  const { t } = useLanguage();
  const [taskTitle, setTaskTitle] = React.useState('');
  const [taskType, setTaskType] = React.useState<string>('');
  const [taskDescription, setTaskDescription] = React.useState('');
  const [dueDate, setDueDate] = React.useState('');
  const [assignee, setAssignee] = React.useState<string>(''); // Added assignee state
  
  const handleSubmit = () => {
    if (!taskTitle.trim()) return;
    
    // Find the selected employee to get their avatar
    const selectedEmployee = mockEmployees.find((emp: any) => emp.id === assignee);
    
    onAddTask({
      title: taskTitle,
      type: taskType,
      description: taskDescription,
      dueDate,
      owner: selectedEmployee?.name || '',
      ownerAvatar: selectedEmployee?.avatar || '',
      attachment: '',
    });
    
    // Reset form
    setTaskTitle('');
    setTaskType('');
    setTaskDescription('');
    setDueDate('');
    setAssignee('');
  };
  
  return (
    <Card className="border border-default-200">
      <CardBody className="p-4">
        <h3 className="text-md font-semibold mb-4">{t('createNewTask')}</h3>
        <div className="space-y-4">
          <Input
            label={t('taskName')}
            placeholder={t('enterTaskTitle')}
            value={taskTitle}
            onValueChange={setTaskTitle}
            variant="bordered"
            isRequired
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select 
              label={t('taskType')}
              placeholder={t('selectTaskType')}
              selectedKeys={taskType ? [taskType] : []}
              onChange={(e) => setTaskType(e.target.value)}
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
              value={dueDate}
              onValueChange={setDueDate}
              variant="bordered"
            />
          </div>
          
          {/* Add new Assign To select dropdown */}
          <Select 
            label={t('assignTo')}
            placeholder={t('selectAssignee')}
            selectedKeys={assignee ? [assignee] : []}
            onChange={(e) => setAssignee(e.target.value)}
            variant="bordered"
          >
            {mockEmployees.map((emp: any) => (
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
          
          <Textarea
            label={t('description')}
            placeholder={t('enterTaskDescription')}
            value={taskDescription}
            onValueChange={setTaskDescription}
            variant="bordered"
          />
          
          <div className="flex items-center gap-2 pt-2">
            <Button
              color="primary"
              startContent={<Icon icon="lucide:plus" />}
              onPress={handleSubmit}
              isDisabled={!taskTitle.trim()}
            >
              {t('addTask')}
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:paperclip" />}
            >
              {t('attachFile')}
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:link" />}
            >
              {t('addLink')}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};