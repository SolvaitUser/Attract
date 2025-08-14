import React from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Badge, Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: 'application' | 'interview' | 'message' | 'system' | 'ai';
  link?: string;
}

export const NotificationsDropdown: React.FC = () => {
  const { translate } = useLanguage();
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Application Updated',
      message: 'Your application for Senior UI Developer has been updated to "Under Review".',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      read: false,
      type: 'application',
      link: '/applications'
    },
    {
      id: '2',
      title: 'Interview Scheduled',
      message: 'You have an upcoming interview for Product Manager on May 15, 2023.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      read: false,
      type: 'interview',
      link: '/interviews'
    },
    {
      id: '3',
      title: 'New Jobs Match',
      message: 'We found 3 new jobs that match your skills and preferences.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      read: true,
      type: 'ai',
      link: '/jobs'
    },
    {
      id: '4',
      title: 'Profile Recommendation',
      message: 'AI suggests adding your recent certification to increase match scores.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: true,
      type: 'ai',
      link: '/profile'
    },
    {
      id: '5',
      title: 'Message from Recruiter',
      message: 'Jane Smith from Acme Corp. sent you a message regarding your application.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      read: true,
      type: 'message'
    }
  ]);

  // Count unread notifications
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };
  
  // Clear all notifications
  const clearAll = () => {
    setNotifications([]);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <Icon icon="lucide:clipboard-check" className="text-primary-500" />;
      case 'interview':
        return <Icon icon="lucide:calendar" className="text-success-500" />;
      case 'message':
        return <Icon icon="lucide:mail" className="text-warning-500" />;
      case 'ai':
        return <Icon icon="lucide:sparkles" className="text-secondary-500" />;
      default:
        return <Icon icon="lucide:bell" className="text-default-500" />;
    }
  };

  // Format timestamp
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    
    return timestamp.toLocaleDateString();
  };

  const newNotifications = notifications.filter(n => !n.read);
  const olderNotifications = notifications.filter(n => n.read);

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button
          isIconOnly
          variant="light"
          className="transition-transform hover:scale-105"
        >
          <Badge
            color="danger"
            content={unreadCount > 0 ? unreadCount : null}
            shape="circle"
          >
            <Icon icon="lucide:bell" width={20} height={20} />
          </Badge>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Notifications" 
        className="w-80 max-h-96"
        closeOnSelect={false}
        variant="flat"
      >
        <DropdownItem isReadOnly className="flex flex-row justify-between py-2">
          <span className="font-semibold text-md">{translate('notifications.title')}</span>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="light" 
              color="primary" 
              className="text-tiny"
              onPress={markAllAsRead}
              isDisabled={unreadCount === 0}
            >
              {translate('notifications.markAllRead')}
            </Button>
            <Button 
              size="sm" 
              variant="light" 
              color="danger" 
              className="text-tiny"
              onPress={clearAll}
              isDisabled={notifications.length === 0}
            >
              {translate('notifications.clearAll')}
            </Button>
          </div>
        </DropdownItem>
        
        <Divider />
        
        {notifications.length === 0 ? (
          <DropdownItem isReadOnly className="h-24 flex items-center justify-center">
            <div className="text-center text-default-400">
              <Icon icon="lucide:bell-off" className="mx-auto mb-2" width={24} height={24} />
              <p>{translate('notifications.noNotifications')}</p>
            </div>
          </DropdownItem>
        ) : (
          <>
            {newNotifications.length > 0 && (
              <DropdownSection title={translate('notifications.new')} showDivider>
                {newNotifications.map((notification) => (
                  <DropdownItem
                    key={notification.id}
                    description={notification.message}
                    startContent={getNotificationIcon(notification.type)}
                    endContent={<span className="text-tiny text-default-400">{formatTime(notification.timestamp)}</span>}
                    className={`py-2 ${!notification.read ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                    onPress={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{notification.title}</span>
                      {!notification.read && (
                        <Badge color="primary" variant="solid" size="sm" className="ml-2">New</Badge>
                      )}
                    </div>
                  </DropdownItem>
                ))}
              </DropdownSection>
            )}

            {olderNotifications.length > 0 && (
              <DropdownSection title={translate('notifications.earlier')}>
                {olderNotifications.map((notification) => (
                  <DropdownItem
                    key={notification.id}
                    description={notification.message}
                    startContent={getNotificationIcon(notification.type)}
                    endContent={<span className="text-tiny text-default-400">{formatTime(notification.timestamp)}</span>}
                    className="py-2"
                  >
                    <span className="font-medium">{notification.title}</span>
                  </DropdownItem>
                ))}
              </DropdownSection>
            )}
          </>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};
