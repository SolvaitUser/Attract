import React from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, User, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../contexts/LanguageContext';

export const TaskDeadlineTable: React.FC = () => {
  const { t } = useLanguage();
  
  const tasks = [
    {
      id: 1,
      task: t('completeGOSIRegistration'),
      employee: 'Sarah Johnson',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=1',
      dueDate: '2023-08-15',
      overdue: true,
    },
    {
      id: 2,
      task: t('setupEmailAccount'),
      employee: 'Mohammed Al-Harbi',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=2',
      dueDate: '2023-08-18',
      overdue: false,
    },
    {
      id: 3,
      task: t('completeOrientationTraining'),
      employee: 'Li Wei',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=3',
      dueDate: '2023-08-20',
      overdue: false,
    },
    {
      id: 4,
      task: t('signEmploymentContract'),
      employee: 'John Smith',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=4',
      dueDate: '2023-08-12',
      overdue: true,
    },
    {
      id: 5,
      task: t('submitBankDetails'),
      employee: 'Fatima Al-Otaibi',
      avatar: 'https://img.heroui.chat/image/avatar?w=150&h=150&u=5',
      dueDate: '2023-08-25',
      overdue: false,
    },
  ];
  
  return (
    <Table
      removeWrapper
      aria-label={t('upcomingDeadlines')}
      classNames={{
        th: "bg-default-50",
      }}
    >
      <TableHeader>
        <TableColumn key="task">{t('task')}</TableColumn>
        <TableColumn key="employee">{t('employee')}</TableColumn>
        <TableColumn key="dueDate">{t('dueDate')}</TableColumn>
        <TableColumn key="status">{t('status')}</TableColumn>
      </TableHeader>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>{task.task}</TableCell>
            <TableCell>
              <User
                name={task.employee}
                avatarProps={{
                  src: task.avatar,
                  size: "sm",
                }}
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Icon icon="lucide:calendar" className="text-default-400" size={14} />
                <span>{task.dueDate}</span>
              </div>
            </TableCell>
            <TableCell>
              {task.overdue ? (
                <Chip color="danger" size="sm">{t('overdue')}</Chip>
              ) : (
                <Chip color="success" size="sm">{t('onTrack')}</Chip>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};