import React from 'react';
import { Card, CardHeader, CardBody, Badge, Button, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedDate: Date;
  status: 'applied' | 'under_review' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  recruiterNotes?: string;
  aiScore?: number;
  nextSteps?: string;
  companyLogo?: string;
  lastUpdated: Date;
  jobId: string;
  allowWithdraw: boolean;
  applicationHistory?: Array<{
    status: 'applied' | 'under_review' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
    date: Date;
    note: string;
  }>;
  coverletter?: string;
  hiringManager?: {
    name: string;
    role: string;
    avatar?: string;
  };
  aiInsights?: string[];
  skillsMatch?: {
    matched: string[];
    missing: string[];
  };
  interview?: {
    date: Date;
    type: 'online' | 'phone' | 'in_person';
    interviewers: string[];
    preparation?: {
      suggestedTopics: string[];
      resources: string[];
    };
  };
  offer?: {
    salary: string;
    startDate: Date;
    benefits: string[];
    expirationDate?: Date;
    responseRequired?: boolean;
  };
}

interface ApplicationTrackerProps {
  applications: Application[];
  onWithdraw?: (applicationId: string) => void;
  onViewDetails?: (applicationId: string) => void;
}

export const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({
  applications,
  onWithdraw,
  onViewDetails,
}) => {
  const { translate } = useLanguage();
  
  // Filter applications by status
  const [filter, setFilter] = React.useState<string | null>(null);
  
  const filteredApplications = React.useMemo(() => {
    if (!filter) return applications;
    return applications.filter(app => app.status === filter);
  }, [applications, filter]);
  
  // Format application date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Get status information (color, label)
  const getStatusInfo = (status: Application['status']) => {
    switch (status) {
      case 'applied':
        return { color: 'default', label: 'Applied', icon: 'lucide:send' };
      case 'under_review':
        return { color: 'primary', label: 'Under Review', icon: 'lucide:eye' };
      case 'interview':
        return { color: 'secondary', label: 'Interview', icon: 'lucide:calendar' };
      case 'offer':
        return { color: 'success', label: 'Offer', icon: 'lucide:check-circle' };
      case 'rejected':
        return { color: 'danger', label: 'Rejected', icon: 'lucide:x-circle' };
      case 'withdrawn':
        return { color: 'warning', label: 'Withdrawn', icon: 'lucide:undo' };
      default:
        return { color: 'default', label: 'Unknown', icon: 'lucide:help-circle' };
    }
  };

  return (
    <Card shadow="sm" className="overflow-visible">
      <CardHeader className="flex flex-col sm:flex-row justify-between gap-2">
        <h3 className="text-xl font-semibold">{translate('applications.title')}</h3>
        
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                endContent={<Icon icon="lucide:filter" size={16} />}
                size="sm"
                className="h-10 px-4"
              >
                {filter ? getStatusInfo(filter as Application['status']).label : 'All Statuses'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Filter applications"
              selectionMode="single"
              selectedKeys={filter ? [filter] : []}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0] as string;
                setFilter(selected === 'all' ? null : selected);
              }}
            >
              <DropdownItem key="all">All Statuses</DropdownItem>
              <DropdownItem key="applied">Applied</DropdownItem>
              <DropdownItem key="under_review">Under Review</DropdownItem>
              <DropdownItem key="interview">Interview</DropdownItem>
              <DropdownItem key="offer">Offer</DropdownItem>
              <DropdownItem key="rejected">Rejected</DropdownItem>
              <DropdownItem key="withdrawn">Withdrawn</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <Button
            size="sm"
            variant="flat"
            color="primary"
            startContent={<Icon icon="lucide:list" size={16} />}
            className="h-10 px-4"
          >
            Sort By
          </Button>
        </div>
      </CardHeader>
      
      <CardBody className="p-0">
        {filteredApplications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
            >
              <Icon 
                icon="lucide:clipboard-x" 
                className="text-default-300 mb-4" 
                width={60} 
                height={60} 
              />
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-default-500 text-center"
            >
              {filter 
                ? `No applications with ${getStatusInfo(filter as Application['status']).label} status` 
                : 'No applications found. Start applying for jobs!'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="mt-5"
            >
              <Button 
                color="primary" 
                variant="flat"
                startContent={<Icon icon="lucide:briefcase" size={16} />}
              >
                Browse Jobs
              </Button>
            </motion.div>
          </div>
        ) : (
          <div className="space-y-0.5">
            {filteredApplications.map((application, index) => {
              const statusInfo = getStatusInfo(application.status);
              
              return (
                <motion.div 
                  key={application.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="border-b border-divider last:border-b-0"
                  whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                >
                  <div 
                    className="p-5 hover:bg-default-50 dark:hover:bg-default-100/10 transition-colors cursor-pointer"
                    onClick={() => onViewDetails?.(application.id)}
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <motion.div 
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {application.companyLogo ? (
                          <img 
                            src={application.companyLogo} 
                            alt={application.company}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-default-100 flex items-center justify-center">
                            <span className="text-xl font-bold text-default-500">
                              {application.company.charAt(0)}
                            </span>
                          </div>
                        )}
                        
                        <div>
                          <h4 className="font-semibold text-lg">{application.jobTitle}</h4>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-default-500">{application.company}</p>
                            <span className="text-default-300">•</span>
                            <p className="text-xs text-default-400">
                              Applied {formatDate(application.appliedDate)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                        <Badge 
                          content="" 
                          color={statusInfo.color as any} 
                          className="px-3 py-1.5 flex items-center gap-1 min-w-[120px] justify-center"
                        >
                          <Icon icon={statusInfo.icon} width={16} height={16} />
                          <span className="font-medium">{statusInfo.label}</span>
                        </Badge>
                        
                        {application.aiScore !== undefined && (
                          <div className="flex items-center gap-1 text-sm bg-default-50 dark:bg-default-100/10 px-3 py-1.5 rounded-full">
                            <Icon icon="lucide:sparkles" className={`
                              ${application.aiScore >= 80 ? 'text-success-500' : 
                                application.aiScore >= 60 ? 'text-primary-500' : 
                                'text-warning-500'}
                            `} width={16} height={16} />
                            <span className="font-medium">{application.aiScore}%</span>
                          </div>
                        )}
                        
                        <div className="flex gap-2 ml-auto">
                          {application.allowWithdraw && application.status !== 'withdrawn' && application.status !== 'rejected' && application.status !== 'offer' && (
                            <Button
                              size="sm"
                              variant="flat"
                              color="danger"
                              onPress={(e) => { 
                                e.stopPropagation(); 
                                onWithdraw?.(application.id); 
                              }}
                              className="px-3 py-1 min-w-[100px]"
                              startContent={<Icon icon="lucide:trash-2" width={14} height={14} />}
                            >
                              {translate('applications.withdraw')}
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            className="px-3 py-1 min-w-[100px]"
                            startContent={<Icon icon="lucide:eye" width={14} height={14} />}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Timeline Steps */}
                    <div className="mt-5 relative">
                      <div className="flex w-full justify-between mb-1">
                        {['applied', 'under_review', 'interview', 'offer'].map((stage, index) => {
                          const isCompleted = application.applicationHistory?.some(h => h.status === stage) 
                                           || application.status === stage;
                          const isCurrent = application.status === stage;
                          
                          return (
                            <div 
                              key={stage}
                              className="text-center z-10"
                            >
                              <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                                isCompleted 
                                  ? isCurrent
                                    ? 'bg-primary-100 border border-primary-500 text-primary-500' 
                                    : 'bg-success-100 text-success-500'
                                  : 'bg-default-100 text-default-400'
                              }`}>
                                <Icon icon={getStatusInfo(stage as any).icon} width={12} height={12} />
                              </div>
                              <p className={`text-[10px] mt-1 ${
                                isCompleted 
                                  ? isCurrent
                                    ? 'text-primary-600' 
                                    : 'text-success-600'
                                  : 'text-default-500'
                              }`}>
                                {getStatusInfo(stage as any).label.split(' ')[0]}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Progress bar connecting stages */}
                      <div className="absolute top-3 left-[5%] right-[5%] h-0.5 bg-default-100">
                        <div 
                          className={`h-full bg-success-500`}
                          style={{ 
                            width: (() => {
                              const stages = ['applied', 'under_review', 'interview', 'offer'];
                              const currentStageIndex = stages.indexOf(application.status);
                              
                              if (currentStageIndex < 0) return '0%';
                              if (application.status === 'rejected') {
                                return `${((stages.indexOf('under_review') + 1) / stages.length) * 100}%`;
                              }
                              if (application.status === 'withdrawn') {
                                return '0%';
                              }
                              
                              return `${((currentStageIndex + 1) / stages.length) * 100}%`;
                            })()
                          }}
                        />
                      </div>
                    </div>
                    
                    {application.recruiterNotes && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ 
                          opacity: 1, 
                          height: 'auto', 
                          marginTop: 16
                        }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 px-4 py-3 bg-default-50 dark:bg-default-100/10 rounded-lg text-sm border-l-2 border-primary-500"
                      >
                        <div className="font-medium text-xs mb-1 text-default-500 flex items-center gap-1">
                          <Icon icon="lucide:message-square" width={14} height={14} />
                          {translate('applications.recruiterNotes')}:
                        </div>
                        <p>{application.recruiterNotes}</p>
                      </motion.div>
                    )}
                    
                    {application.nextSteps && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                        className="mt-3 flex items-center gap-2 text-sm text-primary-500"
                      >
                        <Icon icon="lucide:corner-down-right" width={16} height={16} />
                        <span>{application.nextSteps}</span>
                      </motion.div>
                    )}
                    
                    {/* Interview/Offer Quick Statuses */}
                    {application.status === 'interview' && application.interview && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mt-3 bg-primary-50/50 dark:bg-primary-900/20 p-3 rounded-lg text-sm flex items-center gap-2"
                      >
                        <Icon icon="lucide:calendar-clock" className="text-primary-500" width={16} height={16} />
                        <span>Interview scheduled for {formatDate(application.interview.date)}</span>
                        <Button size="sm" variant="flat" color="primary" className="ml-auto">
                          <span className="text-xs">View Details</span>
                        </Button>
                      </motion.div>
                    )}
                    
                    {application.status === 'offer' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                        className="mt-3 bg-success-50/50 dark:bg-success-900/20 p-3 rounded-lg text-sm flex items-center gap-2"
                      >
                        <Icon icon="lucide:award" className="text-success-500" width={16} height={16} />
                        <span>Job offer received! {application.offer?.responseRequired && 'Response required.'}</span>
                        <Button size="sm" variant="flat" color="success" className="ml-auto">
                          <span className="text-xs">Review Offer</span>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </CardBody>
    </Card>
  );
};