import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';
import { MainLayout } from '../../components/layout/main-layout';
import { Application } from '../../components/applications/application-tracker';
import { Card, CardBody, CardHeader, Tabs, Tab, Divider, Chip, Progress, Badge, Avatar, Button, CircularProgress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import { addToast } from '@heroui/react';

export const ApplicationDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { translate } = useLanguage();
  const { isOpen: isWithdrawOpen, onOpen: onWithdrawOpen, onOpenChange: onWithdrawOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = React.useState(true);
  const [application, setApplication] = React.useState<Application | null>(null);

  React.useEffect(() => {
    // In a real app, this would fetch data from an API
    setIsLoading(true);

    // Simulate API call to get application details
    setTimeout(() => {
      // This is mock data - in a real app, you would fetch this from your backend
      const mockApplication: Application = {
        id: id,
        jobTitle: 'Senior Frontend Developer',
        company: 'TechCorp',
        appliedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        status: 'under_review',
        recruiterNotes: 'Your application is currently being reviewed by our hiring team. We expect to make a decision within the next week.',
        aiScore: 92,
        nextSteps: 'Technical assessment will be sent if shortlisted.',
        companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
        lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        jobId: 'job1',
        allowWithdraw: true,
        applicationHistory: [
          { status: 'applied', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), note: 'Application submitted successfully' },
          { status: 'under_review', date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), note: 'Application being reviewed by hiring team' }
        ],
        coverletter: "Dear Hiring Manager,\n\nI'm excited to apply for the Senior Frontend Developer position at TechCorp. With 5+ years of experience in building modern web applications using React, TypeScript, and state-of-the-art frontend technologies, I believe I'd be a valuable addition to your team...\n\nMy experience includes designing and implementing responsive user interfaces, optimizing application performance, and mentoring junior developers. I have a strong background in state management using Redux and have worked extensively with UI/UX teams to create intuitive user experiences.\n\nI am particularly excited about this role because of TechCorp's reputation for innovation and commitment to quality. I am confident that my technical skills and collaborative approach would make me a great fit for your engineering team.\n\nThank you for considering my application. I look forward to the opportunity to discuss how my background, skills, and experiences would benefit TechCorp.\n\nSincerely,\nAlex Johnson",
        hiringManager: {
          name: "Sarah Thompson",
          role: "Engineering Lead",
          avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=8"
        },
        aiInsights: [
          "Your experience with React matches 95% of the job requirements",
          "Consider highlighting your leadership experience in your next communication",
          "85% of successful candidates had strong TypeScript skills"
        ],
        skillsMatch: {
          matched: ["React", "TypeScript", "CSS", "Jest", "GraphQL"],
          missing: ["Next.js", "Performance Optimization"]
        }
      };
      
      setApplication(mockApplication);
      setIsLoading(false);
    }, 1000);
  }, [id]);

  // Get status information (color, label, icon)
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

  // Format date helper
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Handle withdraw application
  const handleWithdraw = () => {
    onWithdrawOpen();
  };

  // Confirm withdrawal
  const confirmWithdrawal = () => {
    addToast({
      title: "Application Withdrawn",
      description: "Your application has been successfully withdrawn.",
      color: "success",
    });
    history.push('/applications');
  };

  // Return to applications list
  const goBack = () => {
    history.push('/applications');
  };

  return (
    <MainLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <Icon icon="lucide:loader-circle" className="text-primary-500 w-12 h-12 mb-4" />
            </motion.div>
            <p className="text-default-500">Loading application details...</p>
          </div>
        ) : application ? (
          <>
            {/* Breadcrumbs and Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Button
                  variant="light"
                  startContent={<Icon icon="lucide:arrow-left" size={16} />}
                  onPress={goBack}
                  size="sm"
                >
                  Back to Applications
                </Button>
              </div>
              
              <div className="flex gap-2">
                {application.allowWithdraw && application.status !== 'withdrawn' && 
                 application.status !== 'rejected' && application.status !== 'offer' && (
                  <Button
                    variant="flat"
                    color="danger"
                    onPress={handleWithdraw}
                    startContent={<Icon icon="lucide:trash-2" size={16} />}
                  >
                    Withdraw Application
                  </Button>
                )}
                <Button
                  as="a"
                  href={`/jobs/${application.jobId}`}
                  target="_blank"
                  variant="flat"
                  color="primary"
                  startContent={<Icon icon="lucide:briefcase" size={16} />}
                >
                  View Job Posting
                </Button>
              </div>
            </div>
            
            {/* Application Header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mb-6 overflow-visible">
                <CardBody className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex gap-4">
                      {application.companyLogo ? (
                        <img 
                          src={application.companyLogo} 
                          alt={application.company}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-default-100 flex items-center justify-center">
                          <span className="text-2xl font-bold text-default-500">
                            {application.company.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      <div>
                        <h1 className="text-2xl font-bold">{application.jobTitle}</h1>
                        <div className="flex items-center gap-2 text-default-600">
                          <span className="font-medium">{application.company}</span>
                          <span>•</span>
                          <span>Applied on {formatDate(application.appliedDate)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-default-600 text-sm">Status:</span>
                        <Badge 
                          content="" 
                          color={getStatusInfo(application.status).color as any} 
                          className="px-3 py-2 flex items-center gap-1"
                        >
                          <Icon icon={getStatusInfo(application.status).icon} size={16} />
                          <span className="font-medium">{getStatusInfo(application.status).label}</span>
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-default-600 text-sm">Match Score:</span>
                        <div className="bg-default-50 dark:bg-default-100/10 px-3 py-1 rounded-full flex items-center gap-1">
                          <Icon 
                            icon="lucide:sparkles" 
                            className={`
                              ${application.aiScore >= 80 ? 'text-success-500' : 
                                application.aiScore >= 60 ? 'text-primary-500' : 
                                'text-warning-500'}
                            `}
                            size={16}
                          />
                          <span className="font-bold">{application.aiScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Application Progress */}
                  <div className="mt-8 mb-4 relative">
                    <div className="flex w-full justify-between mb-1">
                      {['applied', 'under_review', 'interview', 'offer'].map((stage, index) => {
                        const isCompleted = application.applicationHistory.some(h => h.status === stage);
                        const isCurrent = application.status === stage;
                        
                        return (
                          <motion.div 
                            key={stage}
                            className="text-center z-10"
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                          >
                            <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center border-2 ${
                              isCompleted 
                                ? 'bg-success-100 border-success-500 text-success-500' 
                                : isCurrent
                                  ? 'bg-primary-100 border-primary-500 text-primary-500'
                                  : 'bg-default-100 border-default-200 text-default-400'
                            }`}>
                              <Icon icon={getStatusInfo(stage as any).icon} size={16} />
                            </div>
                            <p className={`text-xs mt-2 font-medium ${
                              isCompleted 
                                ? 'text-success-600' 
                                : isCurrent
                                  ? 'text-primary-600'
                                  : 'text-default-500'
                            }`}>
                              {getStatusInfo(stage as any).label}
                            </p>
                          </motion.div>
                        );
                      })}
                    </div>
                    
                    {/* Progress bar connecting stages */}
                    <div className="absolute top-5 left-[5%] right-[5%] h-0.5 bg-default-100">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ 
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
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-primary-500"
                      />
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-6 text-sm text-default-500 text-center">
                    Last updated: {formatDate(application.lastUpdated)}
                  </div>
                </CardBody>
              </Card>
            </motion.div>
            
            {/* Application Details Tabs */}
            <Tabs aria-label="Application details">
              <Tab key="overview" title="Overview">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                  <div className="lg:col-span-2">
                    {/* Application Timeline */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="mb-6"
                    >
                      <Card className="overflow-visible">
                        <CardHeader>
                          <h2 className="text-lg font-semibold">Application Timeline</h2>
                        </CardHeader>
                        <CardBody className="p-6">
                          <div className="space-y-8">
                            {application.applicationHistory
                              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                              .map((historyItem, index) => (
                                <motion.div 
                                  key={index}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.15, duration: 0.5 }}
                                  className="flex gap-4"
                                >
                                  <div className="flex flex-col items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                      getStatusInfo(historyItem.status).color === 'default' 
                                        ? 'bg-default-100 text-default-500 border-2 border-default-200' 
                                        : `bg-${getStatusInfo(historyItem.status).color}-100 text-${getStatusInfo(historyItem.status).color}-500 border-2 border-${getStatusInfo(historyItem.status).color}-500`
                                    }`}>
                                      <Icon icon={getStatusInfo(historyItem.status).icon} size={16} />
                                    </div>
                                    {index < application.applicationHistory.length - 1 && (
                                      <div className="w-0.5 bg-default-200 dark:bg-default-700 flex-grow my-2"></div>
                                    )}
                                  </div>
                                  <div className="pb-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                                      <span className="font-semibold text-base">{getStatusInfo(historyItem.status).label}</span>
                                      <Badge color="default" variant="flat" size="sm" className="w-fit">
                                        {formatDate(historyItem.date)}
                                      </Badge>
                                    </div>
                                    <p className="text-default-600">{historyItem.note}</p>
                                    
                                    {historyItem.status === 'applied' && (
                                      <div className="mt-3 p-3 bg-default-50 dark:bg-default-100/10 rounded-lg">
                                        <div className="flex items-center gap-2 mb-2">
                                          <Icon icon="lucide:file-check" className="text-success-500" size={16} />
                                          <span className="font-medium text-sm">Documents Submitted</span>
                                        </div>
                                        <div className="space-y-2">
                                          <div className="flex items-center gap-2">
                                            <Icon icon="lucide:file-text" size={14} className="text-default-500" />
                                            <span className="text-sm">Resume - my_resume.pdf</span>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            <Icon icon="lucide:mail" size={14} className="text-default-500" />
                                            <span className="text-sm">Cover Letter</span>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              ))}
                            
                            {/* Next steps prediction */}
                            {application.status !== 'rejected' && application.status !== 'withdrawn' && application.status !== 'offer' && (
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="flex gap-4"
                              >
                                <div className="flex flex-col items-center">
                                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-50 border-2 border-dashed border-primary-300 text-primary-400">
                                    <Icon icon={application.status === 'under_review' 
                                        ? 'lucide:calendar' 
                                        : application.status === 'interview' 
                                          ? 'lucide:check-circle'
                                          : 'lucide:help-circle'} 
                                      size={16} 
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                                    <span className="font-semibold text-base text-default-500">
                                      {application.status === 'under_review' 
                                        ? 'Potential Interview' 
                                        : application.status === 'interview' 
                                          ? 'Potential Offer'
                                          : 'Next Step'}
                                    </span>
                                    <Badge color="default" variant="flat" size="sm" className="text-default-400 border border-dashed border-default-300">
                                      Predicted
                                    </Badge>
                                  </div>
                                  <p className="text-default-500">{application.nextSteps || "Waiting for next steps..."}</p>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                    
                    {/* Recruiter Notes */}
                    {application.recruiterNotes && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className="mb-6"
                      >
                        <Card className="overflow-visible">
                          <CardHeader>
                            <h2 className="text-lg font-semibold">Recruiter Feedback</h2>
                          </CardHeader>
                          <CardBody className="p-6">
                            <div className="flex items-start gap-3">
                              {application.hiringManager && (
                                <Avatar 
                                  src={application.hiringManager.avatar} 
                                  name={application.hiringManager.name} 
                                  className="w-10 h-10"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-2">
                                  <span className="font-medium">
                                    {application.hiringManager?.name || 'Hiring Team'}
                                  </span>
                                  <span className="text-xs text-default-500">
                                    {application.hiringManager?.role || 'Recruiter'}
                                  </span>
                                </div>
                                <p className="text-default-600">{application.recruiterNotes}</p>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    {/* AI Match Analysis */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <Card className="overflow-visible bg-primary-50/50 dark:bg-primary-900/20">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                            <Icon icon="lucide:sparkles" className="text-primary-500" />
                            <h2 className="text-lg font-semibold">AI Match Analysis</h2>
                          </div>
                        </CardHeader>
                        <CardBody className="p-6">
                          <div className="flex flex-col items-center mb-4">
                            <CircularProgress
                              classNames={{
                                svg: "w-28 h-28",
                                indicator: `stroke-${
                                  application.aiScore >= 80 ? 'success' : 
                                  application.aiScore >= 60 ? 'primary' : 
                                  application.aiScore >= 40 ? 'warning' : 'danger'
                                }-500`,
                                track: "stroke-default-100",
                                value: "text-xl font-semibold",
                              }}
                              value={application.aiScore}
                              strokeWidth={4}
                              showValueLabel={true}
                              aria-label="AI Match Score"
                            />
                            <p className="text-sm font-medium mt-2">Match Score</p>
                          </div>
                          
                          <Divider className="my-4" />
                          
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm font-semibold mb-2">AI Insights</h3>
                              <ul className="space-y-2">
                                {application.aiInsights?.map((insight, i) => (
                                  <motion.li 
                                    key={i}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 + 0.4 }}
                                    className="flex items-start gap-2"
                                  >
                                    <Icon icon="lucide:check-circle" className="text-success-500 mt-0.5" size={14} />
                                    <span className="text-sm">{insight}</span>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-semibold mb-2">Skills Analysis</h3>
                              <div>
                                <p className="text-xs mb-1">Matched Skills</p>
                                <div className="flex flex-wrap gap-1">
                                  {application.skillsMatch?.matched.map((skill, i) => (
                                    <Chip key={i} size="sm" color="success" variant="flat">
                                      <span className="flex items-center gap-1">
                                        <Icon icon="lucide:check" size={12} />
                                        {skill}
                                      </span>
                                    </Chip>
                                  ))}
                                </div>
                              </div>
                              
                              {application.skillsMatch?.missing && 
                               application.skillsMatch.missing.length > 0 && (
                                <div className="mt-3">
                                  <p className="text-xs mb-1">Skills to Develop</p>
                                  <div className="flex flex-wrap gap-1">
                                    {application.skillsMatch.missing.map((skill, i) => (
                                      <Chip key={i} size="sm" color="danger" variant="flat">
                                        <span className="flex items-center gap-1">
                                          <Icon icon="lucide:plus" size={12} />
                                          {skill}
                                        </span>
                                      </Chip>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <Button
                            className="mt-4 w-full"
                            color="primary"
                            variant="flat"
                            startContent={<Icon icon="lucide:zap" size={16} />}
                          >
                            Get AI Preparation Tips
                          </Button>
                        </CardBody>
                      </Card>
                    </motion.div>
                    
                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Card className="overflow-visible">
                        <CardHeader>
                          <h2 className="text-medium font-semibold">Quick Actions</h2>
                        </CardHeader>
                        <CardBody className="p-4">
                          <div className="space-y-2">
                            <Button
                              fullWidth
                              color="primary"
                              variant="flat"
                              startContent={<Icon icon="lucide:edit" size={16} />}
                            >
                              Update Resume
                            </Button>
                            
                            <Button
                              fullWidth
                              color="secondary"
                              variant="flat"
                              startContent={<Icon icon="lucide:mail" size={16} />}
                            >
                              Contact Recruiter
                            </Button>
                            
                            <Button
                              fullWidth
                              color="default"
                              variant="flat"
                              startContent={<Icon icon="lucide:refresh-cw" size={16} />}
                            >
                              Check for Updates
                            </Button>
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                    
                    {/* Similar Jobs */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Card className="overflow-visible">
                        <CardHeader>
                          <h2 className="text-medium font-semibold">Similar Jobs</h2>
                        </CardHeader>
                        <CardBody className="p-2">
                          <div className="space-y-1">
                            {[
                              { id: 'job2', title: 'Frontend Developer', company: 'WebSolutions Inc.', score: 88 },
                              { id: 'job3', title: 'UI Engineer', company: 'DesignTech', score: 82 },
                              { id: 'job4', title: 'React Developer', company: 'AppWorks', score: 78 }
                            ].map((job, idx) => (
                              <div 
                                key={idx} 
                                className="p-2 hover:bg-default-50 dark:hover:bg-default-100/10 rounded-lg cursor-pointer"
                                onClick={() => history.push(`/jobs/${job.id}`)}
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-medium">{job.title}</h4>
                                    <p className="text-xs text-default-500">{job.company}</p>
                                  </div>
                                  <div className="text-xs flex items-center gap-1 bg-default-50 dark:bg-default-100/10 px-2 py-1 rounded-full">
                                    <Icon icon="lucide:zap" className="text-warning-500" size={12} />
                                    <span className="font-medium">{job.score}%</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardBody>
                      </Card>
                    </motion.div>
                  </div>
                </div>
              </Tab>
              
              <Tab key="documents" title="Documents">
                <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cover Letter */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <Card className="overflow-visible">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold">Cover Letter</h2>
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            startContent={<Icon icon="lucide:download" size={14} />}
                          >
                            Download
                          </Button>
                        </div>
                      </CardHeader>
                      <CardBody className="p-6">
                        <div className="bg-default-50 dark:bg-default-100/10 p-4 rounded-lg border border-default-200 dark:border-default-700 max-h-[500px] overflow-y-auto">
                          <div className="whitespace-pre-line">
                            {application.coverletter}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                  
                  {/* Resume */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Card className="overflow-visible">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <h2 className="text-lg font-semibold">Resume</h2>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              startContent={<Icon icon="lucide:download" size={14} />}
                            >
                              Download
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              color="secondary"
                              startContent={<Icon icon="lucide:upload" size={14} />}
                            >
                              Update
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardBody className="p-6">
                        <div className="bg-default-50 dark:bg-default-100/10 p-8 rounded-lg border border-default-200 dark:border-default-700 flex flex-col items-center justify-center min-h-[300px]">
                          <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full mb-4">
                            <Icon icon="lucide:file-text" className="text-primary-500" width={32} height={32} />
                          </div>
                          <h3 className="font-medium mb-1">my_resume.pdf</h3>
                          <p className="text-sm text-default-500 mb-4">Uploaded on {formatDate(application.appliedDate)}</p>
                          <Button
                            color="primary"
                            startContent={<Icon icon="lucide:eye" size={16} />}
                          >
                            Preview Resume
                          </Button>
                        </div>
                      </CardBody>
                    </Card>
                  </motion.div>
                </div>
              </Tab>
              
              <Tab key="hiring-team" title="Hiring Team">
                <div className="mt-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-visible">
                      <CardHeader>
                        <h2 className="text-lg font-semibold">Hiring Team Information</h2>
                      </CardHeader>
                      <CardBody className="p-6">
                        {application.hiringManager ? (
                          <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex flex-col items-center">
                              <Avatar
                                src={application.hiringManager.avatar}
                                name={application.hiringManager.name}
                                className="w-24 h-24"
                                isBordered
                                color="primary"
                              />
                              <h3 className="font-semibold mt-3">{application.hiringManager.name}</h3>
                              <p className="text-sm text-default-500">{application.hiringManager.role}</p>
                              <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                className="mt-3"
                                startContent={<Icon icon="lucide:mail" size={14} />}
                              >
                                Send Message
                              </Button>
                            </div>
                            
                            <div className="flex-1">
                              <div className="bg-default-50 dark:bg-default-100/10 rounded-lg p-4 mb-4">
                                <h4 className="text-sm font-semibold mb-2">About {application.hiringManager.name}</h4>
                                <p className="text-sm text-default-600">
                                  {application.hiringManager.name} is the {application.hiringManager.role} at {application.company}. They are responsible for overseeing the hiring process and evaluating candidates for the {application.jobTitle} position.
                                </p>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold mb-2">What to Expect Next</h4>
                                <div className="space-y-2">
                                  <div className="flex items-start gap-2">
                                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mt-0.5">
                                      <Icon icon="lucide:check-circle" className="text-primary-500" size={14} />
                                    </div>
                                    <p className="text-sm">The hiring team is currently reviewing your application</p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <div className="bg-primary-100 dark:bg-primary-900/30 rounded-full p-1 mt-0.5">
                                      <Icon icon="lucide:check-circle" className="text-primary-500" size={14} />
                                    </div>
                                    <p className="text-sm">If selected, you'll be contacted for a technical assessment</p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <div className="bg-default-100 dark:bg-default-100/30 rounded-full p-1 mt-0.5">
                                      <Icon icon="lucide:circle" className="text-default-500" size={14} />
                                    </div>
                                    <p className="text-sm">Technical interviews with the engineering team</p>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <div className="bg-default-100 dark:bg-default-100/30 rounded-full p-1 mt-0.5">
                                      <Icon icon="lucide:circle" className="text-default-500" size={14} />
                                    </div>
                                    <p className="text-sm">Final interview with {application.hiringManager.name}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Icon icon="lucide:users" className="mx-auto text-default-300 mb-4" width={40} height={40} />
                            <p className="text-default-500">Hiring team information not available yet.</p>
                          </div>
                        )}
                      </CardBody>
                    </Card>
                  </motion.div>
                </div>
              </Tab>
            </Tabs>
            
            {/* Withdraw Application Modal */}
            <Modal isOpen={isWithdrawOpen} onOpenChange={onWithdrawOpenChange}>
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">Withdraw Application</ModalHeader>
                    <ModalBody>
                      <p>
                        Are you sure you want to withdraw your application for <strong>{application.jobTitle}</strong> at <strong>{application.company}</strong>?
                      </p>
                      <p className="text-danger-500 text-sm mt-2">
                        This action cannot be undone.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="light" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button color="danger" onPress={confirmWithdrawal}>
                        Withdraw Application
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <Icon icon="lucide:file-question" className="text-default-300 mb-4" width={48} height={48} />
            <p className="text-default-500 text-center">Application not found or has been removed.</p>
            <Button
              variant="flat"
              color="primary"
              onPress={goBack}
              className="mt-4"
              startContent={<Icon icon="lucide:arrow-left" size={16} />}
            >
              Back to Applications
            </Button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};