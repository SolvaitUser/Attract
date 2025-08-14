import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Badge, Card, CardBody, CardHeader, Tabs, Tab, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { motion } from "framer-motion";
import { ShareJobDialog } from "./ShareJobDialog";
import { RecruitmentStageSummary } from "./RecruitmentStageSummary";
import { workforceRequests } from "../../data/mockData";

interface ViewJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: any;
  onEdit: () => void;
}

export const ViewJobModal: React.FC<ViewJobModalProps> = ({ 
  isOpen, 
  onClose, 
  jobData,
  onEdit 
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("details");
  const [isShareDialogOpen, setShareDialogOpen] = useState(false);
  const [showWorkforceDetails, setShowWorkforceDetails] = useState(false);
  
  if (!jobData) return null;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat(language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return "default";
      case 'Pending Approval': return "warning";
      case 'Approved': return "success";
      case 'Published': return "primary";
      case 'Closed': return "danger";
      case 'Rejected': return "danger";
      default: return "default";
    }
  };

  const getStatusInfo = () => {
    const status = jobData.status;
    let icon = "lucide:circle";
    let description = "";

    switch (status) {
      case 'Draft':
        icon = "lucide:edit-3";
        description = t.draftDescription;
        break;
      case 'Pending Approval':
        icon = "lucide:clock";
        description = t.pendingApprovalDescription;
        break;
      case 'Approved':
        icon = "lucide:check-circle";
        description = t.approvedDescription;
        break;
      case 'Published':
        icon = "lucide:upload-cloud";
        description = t.publishedDescription;
        break;
      case 'Closed':
        icon = "lucide:archive";
        description = t.closedDescription;
        break;
      case 'Rejected':
        icon = "lucide:x-circle";
        description = t.rejectedDescription;
        break;
    }

    return { icon, description };
  };

  const statusInfo = getStatusInfo();

  // Animation variants for page transitions
  const pageTransition = {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 }
  };

  // Get linked workforce request if it exists
  const linkedWorkforceRequest = jobData?.linkedWorkforceRequestId 
    ? workforceRequests.find(req => req.id === jobData.linkedWorkforceRequestId)
    : null;

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose} 
      size="4xl"
      scrollBehavior="inside"
      classNames={{
        body: "p-0"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold">{jobData.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-default-600">
                    <span>{jobData.department}</span>
                    <span className="text-default-400">•</span>
                    <span>{jobData.location}</span>
                  </div>
                </div>
              </div>
              <Chip 
                color={getStatusColor(jobData.status)} 
                variant="flat"
                className="h-7"
              >
                {jobData.status}
              </Chip>
            </ModalHeader>
            
            <Divider className="my-0" />
            
            <ModalBody className="p-0">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-[240px] bg-default-50 p-4 border-r border-default-200">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium uppercase text-default-500 mb-3">{t.jobDetails}</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-2">
                          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary">
                            <Icon icon="lucide:briefcase" width={14} />
                          </div>
                          <div>
                            <p className="text-xs text-default-500">{t.jobType}</p>
                            <p className="text-sm font-medium">{jobData.type}</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-2">
                          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary">
                            <Icon icon="lucide:calendar" width={14} />
                          </div>
                          <div>
                            <p className="text-xs text-default-500">{t.created}</p>
                            <p className="text-sm font-medium">{formatDate(jobData.createdAt)}</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-2">
                          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary">
                            <Icon icon="lucide:star" width={14} />
                          </div>
                          <div>
                            <p className="text-xs text-default-500">{t.experience}</p>
                            <p className="text-sm font-medium">{jobData.experience}</p>
                          </div>
                        </li>
                        
                        <li className="flex items-start gap-2">
                          <div className="w-7 h-7 bg-primary-100 rounded-full flex items-center justify-center text-primary">
                            <Icon icon="lucide:dollar-sign" width={14} />
                          </div>
                          <div>
                            <p className="text-xs text-default-500">{t.salaryRange}</p>
                            <p className="text-sm font-medium">
                              {jobData.salary.min.toLocaleString()} - {jobData.salary.max.toLocaleString()} {jobData.salary.currency}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <Divider />
                    
                    <div>
                      <h3 className="text-sm font-medium uppercase text-default-500 mb-3">{t.status}</h3>
                      <div className="p-3 border rounded-lg bg-white">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon icon={statusInfo.icon} className={`text-${getStatusColor(jobData.status)}`} width={16} />
                          <span className="font-medium text-sm">{jobData.status}</span>
                        </div>
                        <p className="text-xs text-default-600">{statusInfo.description}</p>
                      </div>
                    </div>
                    
                    <Divider />
                    
                    <div>
                      <h3 className="text-sm font-medium uppercase text-default-500 mb-3">{t.actions}</h3>
                      <div className="space-y-2">
                        <Button 
                          fullWidth
                          color="primary"
                          variant="flat"
                          onPress={onEdit}
                          startContent={<Icon icon="lucide:edit" width={16} />}
                          className="justify-start"
                        >
                          {t.editJobRequisition}
                        </Button>
                        
                        <Button 
                          fullWidth
                          variant="flat"
                          onPress={() => setShareDialogOpen(true)}
                          startContent={<Icon icon="lucide:share-2" width={16} />}
                          className="justify-start"
                        >
                          {t.shareJob}
                        </Button>
                        
                        <Button 
                          fullWidth
                          variant="flat"
                          onPress={() => {}}
                          startContent={<Icon icon="lucide:pause-circle" width={16} />}
                          className="justify-start"
                        >
                          {t.pauseJob}
                        </Button>
                        
                        <Button 
                          fullWidth
                          variant="flat"
                          color="danger"
                          onPress={() => {}}
                          startContent={<Icon icon="lucide:trash-2" width={16} />}
                          className="justify-start"
                        >
                          {t.deleteJob}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 p-6">
                  <Tabs 
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    color="primary"
                    variant="underlined"
                    classNames={{
                      tabList: "gap-4",
                      cursor: "w-full bg-primary",
                      tab: "max-w-fit px-0 h-10",
                    }}
                  >
                    <Tab 
                      key="details" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:file-text" width={16} />
                          <span>{t.jobDetails}</span>
                        </div>
                      }
                    >
                      <motion.div
                        key="details"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                        className="pt-6 space-y-6"
                      >
                        {linkedWorkforceRequest && (
                          <div>
                            <h3 className="text-md font-semibold mb-2">{t.linkToWorkforceRequest || "Linked Workforce Request"}</h3>
                            <Card className="bg-default-50 border-default-200">
                              <CardBody className="p-4">
                                <div className="flex flex-col gap-3">
                                  <div className="flex items-start gap-2">
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary flex-shrink-0">
                                      <Icon icon="lucide:link" width={16} />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="font-medium">{linkedWorkforceRequest.id}: {linkedWorkforceRequest.title}</p>
                                          <p className="text-xs text-default-600">{linkedWorkforceRequest.department}</p>
                                        </div>
                                        <Button 
                                          size="sm" 
                                          variant="flat" 
                                          color="primary" 
                                          onPress={() => setShowWorkforceDetails(!showWorkforceDetails)}
                                          endContent={
                                            <Icon 
                                              icon={showWorkforceDetails ? "lucide:chevron-up" : "lucide:chevron-down"} 
                                              width={16} 
                                            />
                                          }
                                        >
                                          {showWorkforceDetails ? t.hideDetails || "Hide Details" : t.showDetails || "Show Details"}
                                        </Button>
                                      </div>
                                      
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: showWorkforceDetails ? "auto" : 0, opacity: showWorkforceDetails ? 1 : 0 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                      >
                                        {showWorkforceDetails && (
                                          <div className="mt-3 pt-3 border-t space-y-3">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                              <div>
                                                <p className="text-xs font-medium text-default-600">{t.workLocation || "Work Location"}</p>
                                                <p className="text-sm">{linkedWorkforceRequest.workLocation}</p>
                                              </div>
                                              <div>
                                                <p className="text-xs font-medium text-default-600">{t.salaryRange || "Salary Range"}</p>
                                                <p className="text-sm">
                                                  {linkedWorkforceRequest.salaryRange.currency} {linkedWorkforceRequest.salaryRange.min.toLocaleString()} - {linkedWorkforceRequest.salaryRange.max.toLocaleString()}
                                                </p>
                                              </div>
                                            </div>
                                            
                                            <div>
                                              <p className="text-xs font-medium text-default-600">{t.numberOfVacancies || "Number of Vacancies"}</p>
                                              <p className="text-sm">{jobData.numberOfVacancies || linkedWorkforceRequest.numberOfVacancies}</p>
                                            </div>
                                            
                                            <div>
                                              <p className="text-xs font-medium text-default-600">{t.responsibilities || "Responsibilities"}</p>
                                              <ul className="list-disc pl-5 text-sm">
                                                {linkedWorkforceRequest.responsibilities.map((item, index) => (
                                                  <li key={index}>{item}</li>
                                                ))}
                                              </ul>
                                            </div>
                                            
                                            <div>
                                              <p className="text-xs font-medium text-default-600">{t.keyTasks || "Key Tasks"}</p>
                                              <ul className="list-disc pl-5 text-sm">
                                                {linkedWorkforceRequest.keyTasks.map((item, index) => (
                                                  <li key={index}>{item}</li>
                                                ))}
                                              </ul>
                                            </div>
                                            
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                              <div>
                                                <p className="text-xs font-medium text-default-600">{t.qualifications || "Qualifications"}</p>
                                                <ul className="list-disc pl-5 text-sm">
                                                  {linkedWorkforceRequest.qualifications.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                  ))}
                                                </ul>
                                              </div>
                                              <div>
                                                <p className="text-xs font-medium text-default-600">{t.skills || "Skills"}</p>
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                  {linkedWorkforceRequest.skills.map((skill, index) => (
                                                    <Chip key={index} size="sm" variant="flat">{skill}</Chip>
                                                  ))}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </motion.div>
                                    </div>
                                  </div>
                                </div>
                              </CardBody>
                            </Card>
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-md font-semibold mb-2">{t.jobDescription}</h3>
                          <Card>
                            <CardBody className="text-sm whitespace-pre-wrap">
                              {jobData.description}
                            </CardBody>
                          </Card>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-semibold mb-2">{t.requirements}</h3>
                          <Card>
                            <CardBody>
                              <ul className="list-disc list-inside space-y-2 text-sm">
                                {jobData.requirements.map((req: string, index: number) => (
                                  <li key={index}>{req}</li>
                                ))}
                              </ul>
                            </CardBody>
                          </Card>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-semibold mb-2">{t.responsibilities}</h3>
                          <Card>
                            <CardBody>
                              <ul className="list-disc list-inside space-y-2 text-sm">
                                {jobData.responsibilities.map((resp: string, index: number) => (
                                  <li key={index}>{resp}</li>
                                ))}
                              </ul>
                            </CardBody>
                          </Card>
                        </div>
                        
                        <div>
                          <h3 className="text-md font-semibold mb-2">{t.skills}</h3>
                          <div className="flex flex-wrap gap-2">
                            {jobData.skills.map((skill: string, index: number) => (
                              <Chip key={index} color="primary" variant="flat">{skill}</Chip>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </Tab>
                    
                    <Tab 
                      key="stages" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:git-branch" width={16} />
                          <span>{t.recruitmentStages || "Recruitment Stages"}</span>
                        </div>
                      }
                    >
                      {jobData.recruitmentStages && jobData.recruitmentStages.length > 0 ? (
                        <div className="pt-4">
                          <RecruitmentStageSummary stages={jobData.recruitmentStages} />
                        </div>
                      ) : (
                        <div className="pt-4 text-center py-8">
                          <div className="w-16 h-16 mx-auto bg-default-100 rounded-full flex items-center justify-center mb-4">
                            <Icon icon="lucide:git-branch" className="text-default-400" width={24} />
                          </div>
                          <p className="text-default-600 mb-2">
                            {t.noRecruitmentStagesConfigured || "No recruitment stages have been configured for this job."}
                          </p>
                        </div>
                      )}
                    </Tab>
                    
                    <Tab 
                      key="workflow" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:workflow" width={16} />
                          <span>{t.workflow}</span>
                        </div>
                      }
                    >
                      <motion.div
                        key="workflow"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                        className="pt-6"
                      >
                        <div className="space-y-6">
                          <Card>
                            <CardHeader className="flex items-center justify-between">
                              <h3 className="text-md font-semibold">{t.approvalWorkflow}</h3>
                              <Chip color="success" variant="flat" size="sm">{jobData.status === 'Approved' ? t.approved : t.pending}</Chip>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                              {jobData.approvers && jobData.approvers.length > 0 ? (
                                <div className="space-y-4">
                                  <p className="text-sm text-default-600">{t.approvalWorkflowDescription}</p>
                                  <div className="flex flex-col gap-3 mt-4">
                                    {/* This would show approval stages in a real app */}
                                    <div className="flex items-center gap-3 p-3 bg-success-50 rounded-lg border border-success-100">
                                      <div className="w-8 h-8 bg-success-100 rounded-full flex items-center justify-center text-success">
                                        <Icon icon="lucide:check" width={16} />
                                      </div>
                                      <div>
                                        <div className="flex items-center">
                                          <p className="text-sm font-medium">David Wilson</p>
                                          <Badge color="success" variant="flat" className="ml-2">{t.approved}</Badge>
                                        </div>
                                        <p className="text-xs text-default-500">HR Director • Approved on {formatDate("2023-08-20")}</p>
                                      </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3 p-3 bg-warning-50 rounded-lg border border-warning-100">
                                      <div className="w-8 h-8 bg-warning-100 rounded-full flex items-center justify-center text-warning">
                                        <Icon icon="lucide:clock" width={16} />
                                      </div>
                                      <div>
                                        <div className="flex items-center">
                                          <p className="text-sm font-medium">Michael Brown</p>
                                          <Badge color="warning" variant="flat" className="ml-2">{t.pending}</Badge>
                                        </div>
                                        <p className="text-xs text-default-500">CEO • Waiting for approval</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center py-8">
                                  <p className="text-default-500">{t.noApprovalWorkflowConfigured}</p>
                                </div>
                              )}
                            </CardBody>
                          </Card>
                          
                          <Card>
                            <CardHeader>
                              <h3 className="text-md font-semibold">{t.publishingTargets}</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                              <div className="space-y-4">
                                <div className="p-3 bg-default-50 rounded-lg">
                                  <div className="flex items-center gap-2">
                                    <Icon icon="lucide:building" className="text-primary" width={18} />
                                    <p className="text-sm font-medium">{t.internalCareersPortal}</p>
                                  </div>
                                  <p className="text-xs text-default-500 mt-1 ml-6">{t.internalCareersPortalDescription}</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <p className="text-sm font-medium">{t.externalJobBoards}</p>
                                  <div className="flex flex-wrap gap-2">
                                    <Chip variant="flat" size="sm" startContent={<Icon icon="logos:linkedin-icon" width={14} />}>
                                      LinkedIn
                                    </Chip>
                                    <Chip variant="flat" size="sm" startContent={<Icon icon="lucide:briefcase" width={14} />}>
                                      Indeed
                                    </Chip>
                                    <Chip variant="flat" size="sm" startContent={<Icon icon="lucide:briefcase" width={14} />}>
                                      TAQAT
                                    </Chip>
                                  </div>
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      </motion.div>
                    </Tab>
                    
                    <Tab 
                      key="candidates" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:users" width={16} />
                          <span>{t.candidates}</span>
                          <Badge color="primary" variant="flat">{3}</Badge>
                        </div>
                      }
                    >
                      <motion.div
                        key="candidates"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                        className="pt-6"
                      >
                        <div className="space-y-4">
                          {/* This is a placeholder for the candidates tab */}
                          <Card>
                            <CardBody className="flex flex-col items-center justify-center py-12">
                              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-primary mb-4">
                                <Icon icon="lucide:users" width={32} />
                              </div>
                              <h3 className="text-xl font-semibold mb-2">{t.manageCandidates}</h3>
                              <p className="text-center text-default-600 max-w-md mb-6">{t.manageCandidatesDescription}</p>
                              <Button 
                                color="primary" 
                                startContent={<Icon icon="lucide:external-link" width={16} />}
                              >
                                {t.openInCandidateModule}
                              </Button>
                            </CardBody>
                          </Card>
                        </div>
                      </motion.div>
                    </Tab>
                    
                    <Tab 
                      key="analytics" 
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:bar-chart-2" width={16} />
                          <span>{t.analytics}</span>
                        </div>
                      }
                    >
                      <motion.div
                        key="analytics"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageTransition}
                        className="pt-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <Card className="bg-primary-50">
                            <CardBody className="p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary">
                                  <Icon icon="lucide:users" width={20} />
                                </div>
                                <div>
                                  <p className="text-xs text-default-500">{t.totalApplicants}</p>
                                  <p className="text-xl font-semibold">32</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-success-500 text-xs">
                                <Icon icon="lucide:trending-up" width={12} />
                                <span>12% {t.increase}</span>
                                <span className="text-default-400 ml-1">{t.lastWeek}</span>
                              </div>
                            </CardBody>
                          </Card>
                          
                          <Card className="bg-success-50">
                            <CardBody className="p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center text-success">
                                  <Icon icon="lucide:check-circle" width={20} />
                                </div>
                                <div>
                                  <p className="text-xs text-default-500">{t.conversionRate}</p>
                                  <p className="text-xl font-semibold">18.7%</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-success-500 text-xs">
                                <Icon icon="lucide:trending-up" width={12} />
                                <span>3.2% {t.increase}</span>
                                <span className="text-default-400 ml-1">{t.lastMonth}</span>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                        
                        <Card>
                          <CardHeader>
                            <h3 className="text-md font-semibold">{t.applicationsBySource}</h3>
                          </CardHeader>
                          <Divider />
                          <CardBody className="py-6">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Icon icon="logos:linkedin-icon" width={16} />
                                  <span className="text-sm">LinkedIn</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">15</span>
                                  <div className="w-24 bg-default-100 h-2 rounded-full">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '45%' }}></div>
                                  </div>
                                  <span className="text-xs text-default-500">45%</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Icon icon="lucide:globe" width={16} className="text-primary" />
                                  <span className="text-sm">{t.internalCareersPortal}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">8</span>
                                  <div className="w-24 bg-default-100 h-2 rounded-full">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                                  </div>
                                  <span className="text-xs text-default-500">25%</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Icon icon="lucide:briefcase" width={16} className="text-default-600" />
                                  <span className="text-sm">Indeed</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">6</span>
                                  <div className="w-24 bg-default-100 h-2 rounded-full">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '20%' }}></div>
                                  </div>
                                  <span className="text-xs text-default-500">20%</span>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Icon icon="lucide:users" width={16} className="text-default-600" />
                                  <span className="text-sm">{t.referrals}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">3</span>
                                  <div className="w-24 bg-default-100 h-2 rounded-full">
                                    <div className="bg-primary h-2 rounded-full" style={{ width: '10%' }}></div>
                                  </div>
                                  <span className="text-xs text-default-500">10%</span>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </ModalBody>
            
            <Divider />
            
            <ModalFooter>
              <div className="flex justify-between w-full">
                <Button 
                  variant="flat" 
                  color="danger" 
                  startContent={<Icon icon="lucide:archive" width={16} />}
                >
                  {t.closeJob}
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="flat" 
                    onPress={onClose}
                  >
                    {t.close}
                  </Button>
                  <Button 
                    color="primary" 
                    onPress={onEdit}
                    startContent={<Icon icon="lucide:edit" width={16} />}
                  >
                    {t.edit}
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      
      <ShareJobDialog 
        isOpen={isShareDialogOpen}
        onClose={() => setShareDialogOpen(false)}
        jobData={jobData}
      />
    </Modal>
  );
};