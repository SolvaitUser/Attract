import React from 'react';
import { Tabs, Tab, Card, CardBody, CardHeader, Switch, Input, Select, SelectItem, Button, Divider, Chip, Avatar, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { NotificationSettings } from './components/settings/NotificationSettings';
import { DocumentRequirements } from './components/settings/DocumentRequirements';
import { UserAccessTable } from './components/settings/UserAccessTable';
import { IntegrationCard } from './components/settings/IntegrationCard';
import { TaskTypesManager } from './components/settings/TaskTypesManager';

export const OnboardingSettings: React.FC = () => {
  const { t } = useLanguage();
  const [activeSettingsTab, setActiveSettingsTab] = React.useState('general');
  const [defaultOnboardingDays, setDefaultOnboardingDays] = React.useState('30');
  const [sendWelcomeEmail, setSendWelcomeEmail] = React.useState(true);
  const [enableAutomation, setEnableAutomation] = React.useState(true);
  const [enableAiSuggestions, setEnableAiSuggestions] = React.useState(true);
  const [showSaving, setShowSaving] = React.useState(false);
  
  const handleSaveSettings = () => {
    setShowSaving(true);
    
    // Simulate API call to save settings
    setTimeout(() => {
      setShowSaving(false);
    }, 1000);
  };
  
  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{t('onboardingSettings')}</h2>
          <Button 
            color="primary" 
            isLoading={showSaving}
            onPress={handleSaveSettings}
            startContent={!showSaving && <Icon icon="lucide:save" />}
          >
            {t('saveSettings')}
          </Button>
        </CardHeader>
        <CardBody>
          <Tabs 
            aria-label="Settings Options"
            selectedKey={activeSettingsTab}
            onSelectionChange={(key) => setActiveSettingsTab(String(key))}
            color="primary"
            variant="underlined"
            classNames={{
              tabList: "gap-4"
            }}
          >
            <Tab 
              key="general" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:sliders-horizontal" width={18} />
                  <span>{t('generalSettings')}</span>
                </div>
              }
            >
              <div className="py-6 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">{t('defaultSettings')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-default-700">{t('defaultOnboardingDuration')}</label>
                      <div className="flex gap-2 items-center">
                        <Input 
                          type="number" 
                          value={defaultOnboardingDays}
                          onValueChange={setDefaultOnboardingDays} 
                          variant="bordered"
                          min={1}
                          max={180}
                          className="w-24"
                        />
                        <span className="text-default-600">{t('days')}</span>
                      </div>
                      <p className="text-default-500 text-xs">{t('durationDescription')}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-default-700">{t('defaultTemplate')}</label>
                      <Select 
                        placeholder={t('selectDefaultTemplate')}
                        variant="bordered"
                        defaultSelectedKeys={["full"]}
                      >
                        <SelectItem key="full" textValue="Full Cycle Onboarding">
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:check-circle" className="text-primary" />
                            <span>Full Cycle Onboarding</span>
                          </div>
                        </SelectItem>
                        <SelectItem key="it" textValue="IT Department Onboarding">
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:monitor" />
                            <span>IT Department Onboarding</span>
                          </div>
                        </SelectItem>
                        <SelectItem key="hr" textValue="HR Department Onboarding">
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:users" />
                            <span>HR Department Onboarding</span>
                          </div>
                        </SelectItem>
                      </Select>
                    </div>
                  
                    <div className="space-y-2">
                      <label className="text-default-700">{t('defaultOwner')}</label>
                      <Select 
                        placeholder={t('selectDefaultOwner')}
                        variant="bordered"
                      >
                        <SelectItem key="auto" textValue="Auto-assign based on department">
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:sparkles" className="text-primary" />
                            <span>{t('autoAssignBasedOnDepartment')}</span>
                          </div>
                        </SelectItem>
                        {['Ahmed Al-Saud', 'Sara Al-Qahtani', 'Khalid Hassan'].map((name, index) => (
                          <SelectItem key={`user-${index}`} textValue={name}>
                            <div className="flex items-center gap-2">
                              <Avatar 
                                size="sm" 
                                src={`https://img.heroui.chat/image/avatar?w=150&h=150&u=${index + 6}`}
                                name={name}
                              />
                              <span>{name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-default-700">{t('defaultOnboardingLanguage')}</label>
                      <Select 
                        placeholder={t('selectLanguage')}
                        variant="bordered"
                        defaultSelectedKeys={["en"]}
                      >
                        <SelectItem key="en" textValue="English">
                          <div className="flex items-center gap-2">
                            <span>English</span>
                          </div>
                        </SelectItem>
                        <SelectItem key="ar" textValue="Arabic">
                          <div className="flex items-center gap-2">
                            <span>العربية</span>
                          </div>
                        </SelectItem>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">{t('automationSettings')}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{t('enableAutomation')}</p>
                        <p className="text-default-500 text-sm">{t('automationDescription')}</p>
                      </div>
                      <Switch isSelected={enableAutomation} onValueChange={setEnableAutomation} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{t('sendWelcomeEmail')}</p>
                        <p className="text-default-500 text-sm">{t('welcomeEmailDescription')}</p>
                      </div>
                      <Switch isSelected={sendWelcomeEmail} onValueChange={setSendWelcomeEmail} />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-start gap-2">
                        <div>
                          <p className="font-medium">{t('enableAiSuggestions')}</p>
                          <p className="text-default-500 text-sm">{t('aiSuggestionsDescription')}</p>
                        </div>
                        <Chip color="primary" size="sm" variant="dot">{t('new')}</Chip>
                      </div>
                      <Switch isSelected={enableAiSuggestions} onValueChange={setEnableAiSuggestions} />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab 
              key="notifications" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:bell" width={18} />
                  <span>{t('notificationSettings')}</span>
                </div>
              }
            >
              <NotificationSettings />
            </Tab>
            
            <Tab 
              key="compliance" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:shield" width={18} />
                  <span>{t('complianceSettings')}</span>
                </div>
              }
            >
              <div className="py-6 space-y-8">
                <div className="space-y-6">
                  <h3 className="text-lg font-medium">{t('documentRequirements')}</h3>
                  <DocumentRequirements />
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t('complianceRules')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enforceDocumentExpiration')}</p>
                          <p className="text-default-500 text-sm">{t('documentExpirationDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enforceBackgroundChecks')}</p>
                          <p className="text-default-500 text-sm">{t('backgroundChecksDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enforceSignatureVerification')}</p>
                          <p className="text-default-500 text-sm">{t('signatureVerificationDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('requireManagerApproval')}</p>
                          <p className="text-default-500 text-sm">{t('managerApprovalDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                  </div>
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{t('localRegulations')}</h3>
                    <Select 
                      defaultSelectedKeys={["saudi"]}
                      className="w-48"
                      variant="bordered"
                    >
                      <SelectItem key="saudi" value="Saudi Arabia">Saudi Arabia</SelectItem>
                      <SelectItem key="uae" value="UAE">UAE</SelectItem>
                      <SelectItem key="kuwait" value="Kuwait">Kuwait</SelectItem>
                    </Select>
                  </div>
                  
                  <Card className="bg-default-50">
                    <CardBody className="p-4">
                      <div className="flex items-start gap-3">
                        <Icon icon="lucide:info" className="text-primary mt-1" />
                        <div>
                          <p className="font-medium">{t('saudiComplianceInfo')}</p>
                          <p className="text-default-500 text-sm mt-1">{t('saudiComplianceDescription')}</p>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{t('enforceGOSIRegistration')}</p>
                        <Tooltip content={t('gosiComplianceTooltip')} color="foreground">
                          <Icon icon="lucide:help-circle" className="text-default-400" />
                        </Tooltip>
                      </div>
                      <Switch defaultSelected />
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{t('enforceSaudization')}</p>
                        <Tooltip content={t('saudizationTooltip')} color="foreground">
                          <Icon icon="lucide:help-circle" className="text-default-400" />
                        </Tooltip>
                      </div>
                      <Switch defaultSelected />
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab 
              key="tasks" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:check-square" width={18} />
                  <span>{t('taskSettings')}</span>
                </div>
              }
            >
              <div className="py-6 space-y-8">
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{t('taskTypes')}</h3>
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="flat" 
                      startContent={<Icon icon="lucide:plus" />}
                    >
                      {t('addTaskType')}
                    </Button>
                  </div>
                  
                  <TaskTypesManager />
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t('taskRules')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enableTaskDependencies')}</p>
                          <p className="text-default-500 text-sm">{t('taskDependenciesDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enableTaskReminders')}</p>
                          <p className="text-default-500 text-sm">{t('taskRemindersDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('escalateDelayedTasks')}</p>
                          <p className="text-default-500 text-sm">{t('escalateTasksDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('showTaskProgressBar')}</p>
                          <p className="text-default-500 text-sm">{t('progressBarDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab 
              key="integrations" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:plug" width={18} />
                  <span>{t('integrations')}</span>
                </div>
              }
            >
              <div className="py-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t('systemIntegrations')}</h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <IntegrationCard
                      name="HRMS"
                      icon="lucide:database"
                      description={t('hrmsIntegrationDescription')}
                      isConnected={true}
                    />
                    
                    <IntegrationCard
                      name="Microsoft Azure AD"
                      icon="logos:microsoft-icon"
                      description={t('azureAdIntegrationDescription')}
                      isConnected={true}
                    />
                    
                    <IntegrationCard
                      name="Google Workspace"
                      icon="logos:google-icon"
                      description={t('googleWorkspaceDescription')}
                      isConnected={false}
                    />
                    
                    <IntegrationCard
                      name="Slack"
                      icon="logos:slack-icon"
                      description={t('slackIntegrationDescription')}
                      isConnected={false}
                    />
                    
                    <IntegrationCard
                      name="GOSI API"
                      icon="lucide:link"
                      description={t('gosiApiIntegrationDescription')}
                      isConnected={true}
                    />
                    
                    <IntegrationCard
                      name="Absher Business"
                      icon="lucide:globe"
                      description={t('absherIntegrationDescription')}
                      isConnected={false}
                    />
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      variant="light" 
                      color="primary"
                      startContent={<Icon icon="lucide:plus" />}
                    >
                      {t('addCustomIntegration')}
                    </Button>
                  </div>
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t('apiSettings')}</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{t('enableApiAccess')}</p>
                        <p className="text-default-500 text-sm">{t('apiAccessDescription')}</p>
                      </div>
                      <Switch defaultSelected />
                    </div>
                    
                    <Card className="bg-default-50">
                      <CardBody>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{t('apiKey')}</p>
                            <p className="text-default-500 text-sm">{t('apiKeyDescription')}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="font-mono bg-default-100 px-3 py-1 rounded-md">••••••••••••••••</p>
                            <Button isIconOnly size="sm" variant="flat">
                              <Icon icon="lucide:eye" />
                            </Button>
                            <Button isIconOnly size="sm" variant="flat">
                              <Icon icon="lucide:refresh-cw" />
                            </Button>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <Button 
                      color="primary" 
                      variant="flat"
                      startContent={<Icon icon="lucide:file-text" />}
                    >
                      {t('viewApiDocumentation')}
                    </Button>
                  </div>
                </div>
              </div>
            </Tab>
            
            <Tab 
              key="access" 
              title={
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:lock" width={18} />
                  <span>{t('accessControl')}</span>
                </div>
              }
            >
              <div className="py-6 space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{t('userAccess')}</h3>
                    <Button 
                      size="sm" 
                      color="primary" 
                      variant="flat" 
                      startContent={<Icon icon="lucide:plus" />}
                    >
                      {t('addUser')}
                    </Button>
                  </div>
                  
                  <UserAccessTable />
                </div>
                
                <Divider />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">{t('securitySettings')}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enforceDataEncryption')}</p>
                          <p className="text-default-500 text-sm">{t('dataEncryptionDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enableAuditLogs')}</p>
                          <p className="text-default-500 text-sm">{t('auditLogsDescription')}</p>
                        </div>
                        <Switch defaultSelected />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{t('enforceTwoFactorAuth')}</p>
                          <p className="text-default-500 text-sm">{t('twoFactorDescription')}</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{t('limitDocumentAccess')}</p>
                          <Chip color="primary" size="sm" variant="flat">{t('recommended')}</Chip>
                        </div>
                        <Switch defaultSelected />
                      </div>
                      <p className="text-default-500 text-sm">{t('documentAccessDescription')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};