import React from 'react';
import { Switch, Select, SelectItem, Divider } from '@heroui/react';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const NotificationSettings: React.FC = () => {
  const { t } = useLanguage();
  
  const notificationTypes = [
    {
      id: 'onboardingStart',
      title: t('onboardingStartNotification'),
      description: t('onboardingStartDescription'),
      defaultSelected: true,
    },
    {
      id: 'taskAssigned',
      title: t('taskAssignedNotification'),
      description: t('taskAssignedDescription'),
      defaultSelected: true,
    },
    {
      id: 'taskDue',
      title: t('taskDueNotification'),
      description: t('taskDueDescription'),
      defaultSelected: true,
    },
    {
      id: 'documentUploaded',
      title: t('documentUploadedNotification'),
      description: t('documentUploadedDescription'),
      defaultSelected: true,
    },
    {
      id: 'onboardingComplete',
      title: t('onboardingCompleteNotification'),
      description: t('onboardingCompleteDescription'),
      defaultSelected: true,
    },
    {
      id: 'taskOverdue',
      title: t('taskOverdueNotification'),
      description: t('taskOverdueDescription'),
      defaultSelected: true,
    },
    {
      id: 'managerApproval',
      title: t('managerApprovalNotification'),
      description: t('managerApprovalDescription'),
      defaultSelected: true,
    },
  ];
  
  return (
    <div className="py-6 space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">{t('emailNotifications')}</h3>
            <Select 
              label={t('defaultFrequency')}
              defaultSelectedKeys={["immediately"]}
              className="w-48"
            >
              <SelectItem key="immediately" value="immediately">{t('immediately')}</SelectItem>
              <SelectItem key="daily" value="daily">{t('dailyDigest')}</SelectItem>
              <SelectItem key="weekly" value="weekly">{t('weeklyDigest')}</SelectItem>
            </Select>
          </div>
          
          {notificationTypes.map((notification) => (
            <div key={notification.id} className="flex justify-between items-center py-2 border-b border-default-100">
              <div>
                <p className="font-medium">{notification.title}</p>
                <p className="text-default-500 text-sm">{notification.description}</p>
              </div>
              <Switch defaultSelected={notification.defaultSelected} />
            </div>
          ))}
        </div>
      </div>
      
      <Divider />
      
      <div className="space-y-6">
        <h3 className="text-lg font-medium">{t('systemNotifications')}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('enableInAppNotifications')}</p>
                <p className="text-default-500 text-sm">{t('inAppNotificationsDescription')}</p>
              </div>
              <Switch defaultSelected />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('enablePushNotifications')}</p>
                <p className="text-default-500 text-sm">{t('pushNotificationsDescription')}</p>
              </div>
              <Switch defaultSelected />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('enableSlackNotifications')}</p>
                <p className="text-default-500 text-sm">{t('slackNotificationsDescription')}</p>
              </div>
              <Switch />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">{t('enableSmsNotifications')}</p>
                <p className="text-default-500 text-sm">{t('smsNotificationsDescription')}</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
      
      <Divider />
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('reminderSettings')}</h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{t('sendTaskReminders')}</p>
              <p className="text-default-500 text-sm">{t('taskRemindersSettingDescription')}</p>
            </div>
            <Select 
              defaultSelectedKeys={["1day"]}
              className="w-48"
            >
              <SelectItem key="1day" value="1 day">{t('oneDayBefore')}</SelectItem>
              <SelectItem key="3days" value="3 days">{t('threeDaysBefore')}</SelectItem>
              <SelectItem key="1week" value="1 week">{t('oneWeekBefore')}</SelectItem>
              <SelectItem key="custom" value="custom">{t('custom')}</SelectItem>
            </Select>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{t('sendEscalationNotifications')}</p>
              <p className="text-default-500 text-sm">{t('escalationNotificationsDescription')}</p>
            </div>
            <Select 
              defaultSelectedKeys={["2days"]}
              className="w-48"
            >
              <SelectItem key="1day" value="1 day">{t('oneDay')}</SelectItem>
              <SelectItem key="2days" value="2 days">{t('twoDays')}</SelectItem>
              <SelectItem key="3days" value="3 days">{t('threeDays')}</SelectItem>
              <SelectItem key="1week" value="1 week">{t('oneWeek')}</SelectItem>
              <SelectItem key="never" value="never">{t('never')}</SelectItem>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};