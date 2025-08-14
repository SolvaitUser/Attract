import React from "react";
import { Card, CardBody, CardHeader, Chip, Button, Avatar, Badge, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { motion, AnimatePresence } from "framer-motion";

interface JobSubmissionConfirmationProps {
  jobData: any;
  workflowType: "approval" | "draft" | "publish";
  onWorkflowChange: (type: "approval" | "draft" | "publish") => void;
}

export const JobSubmissionConfirmation: React.FC<JobSubmissionConfirmationProps> = ({ 
  jobData,
  workflowType,
  onWorkflowChange
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const getWorkflowIcon = () => {
    switch (workflowType) {
      case "approval":
        return "lucide:check-circle";
      case "draft":
        return "lucide:save";
      case "publish":
        return "lucide:upload-cloud";
    }
  };
  
  const getWorkflowTitle = () => {
    switch (workflowType) {
      case "approval":
        return t.requestApproval;
      case "draft":
        return t.saveAsDraft;
      case "publish":
        return t.publishNow;
    }
  };
  
  const getWorkflowDescription = () => {
    switch (workflowType) {
      case "approval":
        return t.requestApprovalDescription;
      case "draft":
        return t.saveAsDraftDescription;
      case "publish":
        return t.publishNowDescription;
    }
  };
  
  const getWorkflowColor = () => {
    switch (workflowType) {
      case "approval":
        return "primary";
      case "draft":
        return "default";
      case "publish":
        return "success";
    }
  };
  
  // Add a function to handle missing data gracefully
  const getSafeJobData = () => {
    return {
      title: jobData?.title || "",
      department: jobData?.department || "",
      location: jobData?.location || "",
      type: jobData?.type || "",
      experience: jobData?.experience || "",
      description: jobData?.description || "",
      requirements: jobData?.requirements || [],
      responsibilities: jobData?.responsibilities || [],
      skills: jobData?.skills || [],
      salary: jobData?.salary || { min: 0, max: 0, currency: "USD" }
    };
  };
  
  // Use safe data in the JSX
  const safeData = getSafeJobData();
  
  // Animations for the confirmation items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25
      } 
    }
  };

  // Add workflow steps data
  const workflowSteps = React.useMemo(() => [
    {
      id: 'draft',
      title: t.draftStep || 'Save Draft',
      description: t.draftStepDesc || 'Save your progress to complete later',
      icon: 'lucide:save',
      color: 'default'
    },
    {
      id: 'approval',
      title: t.approvalStep || 'Request Approval',
      description: t.approvalStepDesc || 'Send for manager review and approval',
      icon: 'lucide:check-circle',
      color: 'primary'
    },
    {
      id: 'publish',
      title: t.publishStep || 'Publish Job',
      description: t.publishStepDesc || 'Make job visible to candidates',
      icon: 'lucide:upload-cloud',
      color: 'success'
    }
  ], [language]);

  // Find current step index
  const currentStepIndex = workflowSteps.findIndex(step => step.id === workflowType);

  const defaultRecruitmentStages = [
    { 
      id: "1", 
      name: t.applicationReview || "Application Review", 
      isRequired: true,
      isActive: true,
      description: t.applicationReviewDescription || "Review resumes and applications to identify qualified candidates.", 
      estimatedDays: 3 
    },
    { 
      id: "2", 
      name: t.phoneScreening || "Phone Screening", 
      isRequired: true, 
      description: t.phoneScreeningDescription || "Initial phone call to assess basic qualifications and interest.", 
      estimatedDays: 2 
    },
    { 
      id: "3", 
      name: t.firstInterview || "First Interview", 
      isRequired: true, 
      description: t.firstInterviewDescription || "First formal interview with the hiring manager.", 
      estimatedDays: 5 
    },
    { 
      id: "4", 
      name: t.technicalAssessment || "Technical Assessment", 
      isRequired: false, 
      description: t.technicalAssessmentDescription || "Evaluate technical skills through tests or practical assignments.", 
      estimatedDays: 7 
    },
    { 
      id: "5", 
      name: t.finalInterview || "Final Interview", 
      isRequired: true, 
      description: t.finalInterviewDescription || "Final interview with senior leadership or team members.", 
      estimatedDays: 5 
    }
  ];

  return (
    <div className="space-y-10">
      <motion.div
        className="bg-gradient-to-r from-success-50 to-success-100 border border-success-200 rounded-lg overflow-hidden shadow-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-4 p-4">
          <div className="w-12 h-12 bg-success-500 text-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
            <Icon icon="lucide:check" width={24} />
          </div>
          <div>
            <h3 className="font-semibold text-success-700 text-xl mb-1">{t.jobRequisitionReady}</h3>
            <p className="text-success-600 text-sm">{t.jobRequisitionReadyDescription}</p>
            <p className="text-success-600 mt-2 bg-success-200/40 px-4 py-2 rounded-md text-sm inline-block">
              {workflowType === "approval" 
                ? t.readyForApprovalMessage || "Your job requisition is ready to be submitted for approval. Please review all details before proceeding."
                : workflowType === "draft" 
                ? t.readyForDraftMessage || "Your job requisition draft is complete. You can save it now and finish later."
                : t.readyForPublishMessage || "Your job requisition is ready to be published. It will be visible to candidates immediately."
              }
            </p>
          </div>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <motion.div 
          className="lg:col-span-8 xl:col-span-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="shadow-md mb-4 overflow-hidden border-none">
              <CardBody className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-xl font-bold text-foreground">{safeData.title}</h2>
                  <Chip color="primary" variant="flat" className="px-3 py-1 text-sm font-medium">{safeData.type}</Chip>
                </div>
                <div className="flex items-center gap-3 text-sm text-default-600 mb-4 bg-default-50 py-2 px-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:briefcase" className="text-primary/70" width={16} />
                    <span>{safeData.department}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-default-300"></div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:map-pin" className="text-primary/70" width={16} />
                    <span>{safeData.location}</span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-default-300"></div>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:clock" className="text-primary/70" width={16} />
                    <span>{safeData.experience}</span>
                  </div>
                </div>
                
                <p className="text-default-700 text-sm mb-4 leading-relaxed">{safeData.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-medium text-base mb-2 flex items-center gap-2">
                    <Icon icon="lucide:star" className="text-primary" width={18} />
                    {t.skillsRequired}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {safeData.skills.map((skill: string, index: number) => (
                      <Chip 
                        key={index} 
                        size="sm" 
                        color="primary" 
                        variant="flat" 
                        className="py-1 px-2 text-xs"
                        startContent={<div className="w-1.5 h-1.5 rounded-full bg-primary mr-1"></div>}
                      >
                        {skill}
                      </Chip>
                    ))}
                  </div>
                </div>
                
                <div className="bg-default-50 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-default-700 text-sm mb-0">{t.salaryRange}</h3>
                    <p className="text-lg font-bold text-primary">
                      ${safeData.salary.min.toLocaleString()} - ${safeData.salary.max.toLocaleString()} 
                      <span className="text-sm text-default-500 ml-1">{safeData.salary.currency}</span>
                    </p>
                  </div>
                  <Button 
                    color="primary" 
                    variant="flat" 
                    startContent={<Icon icon="lucide:edit-3" width={16} />}
                    size="sm"
                    className="text-sm px-3"
                  >
                    {t.adjust || "Adjust"}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Card className="shadow-sm border-t-4 border-t-primary border-default-200">
              <CardHeader className="pb-0 pt-3 px-4">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <Icon icon="lucide:check-circle" className="text-primary" width={16} />
                  {t.requirements}
                </h3>
              </CardHeader>
              <CardBody className="pt-2 pb-4 px-4">
                <ul className="space-y-2 text-sm">
                  {jobData.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 bg-default-50 p-2 rounded-lg">
                      <div className="w-5 h-5 bg-primary-100 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon icon="lucide:check" width={12} />
                      </div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
            
            <Card className="shadow-sm border-t-4 border-t-primary border-default-200">
              <CardHeader className="pb-0 pt-3 px-4">
                <h3 className="text-base font-medium flex items-center gap-2">
                  <Icon icon="lucide:list-checks" className="text-primary" width={16} />
                  {t.responsibilities}
                </h3>
              </CardHeader>
              <CardBody className="pt-2 pb-4 px-4">
                <ul className="space-y-2 text-sm">
                  {jobData.responsibilities.map((resp: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 bg-default-50 p-2 rounded-lg">
                      <div className="w-5 h-5 bg-primary-100 text-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon icon="lucide:arrow-right" width={12} />
                      </div>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </CardBody>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-4">
            <Card className="shadow-sm border-none overflow-hidden">
              <div className="bg-gradient-to-r from-primary-100/70 to-primary-50 p-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:sparkles" className="text-primary" width={18} />
                  <h3 className="font-semibold text-primary text-base">{t.aiEnhancedTips || "AI-Enhanced Tips"}</h3>
                </div>
                <Button size="sm" variant="light" radius="full" className="px-3 text-xs">
                  {t.viewAll || "View All"}
                </Button>
              </div>
              <CardBody className="p-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="text-sm bg-white p-3 rounded-lg border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-default-700 font-medium">{t.tipDescriptiveTitle || "Use a more descriptive title"}</p>
                      <Chip size="sm" color="primary" variant="flat" className="h-5 text-xs">High Impact</Chip>
                    </div>
                    <p className="text-default-600 text-xs">{t.tipDescriptiveDescription || "Consider adding specificity to your job title that highlights key technologies or responsibilities."}</p>
                  </div>
                  
                  <div className="text-sm bg-white p-3 rounded-lg border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-default-700 font-medium">{t.tipSpecificSkills || "Be specific about required skills"}</p>
                      <Chip size="sm" color="primary" variant="flat" className="h-5 text-xs">Medium Impact</Chip>
                    </div>
                    <p className="text-default-600 text-xs">{t.tipSpecificSkillsDescription || "Clearly distinguish between required and preferred skills to avoid discouraging qualified candidates."}</p>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    className="text-sm px-3"
                    startContent={<Icon icon="lucide:magic-wand" width={16} />}
                  >
                    {t.improveWithAI || "Improve with AI"}
                  </Button>
                  <p className="text-xs text-default-500 italic">{t.aiTipsDisclaimer || "Tips generated based on your job details"}</p>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants} className="mt-4">
            <Card className="shadow-sm border-none overflow-hidden">
              <div className="bg-gradient-to-r from-secondary-100/70 to-secondary-50 p-3 flex items-center justify-between border-b">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:git-branch" className="text-secondary" width={18} />
                  <h3 className="font-semibold text-secondary text-base">{t.recruitmentStages || "Recruitment Stages"}</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/70 rounded-lg shadow-sm">
                  <Icon icon="lucide:clock" width={16} className="text-secondary" />
                  <div className="flex flex-col">
                    <span className="text-xs text-default-600">{t.totalHiringTime || "Total estimated hiring time"}</span>
                    <span className="text-sm font-semibold text-secondary-600">
                      {jobData.recruitmentStages?.reduce((total: number, stage: any) => total + (stage.estimatedDays || 0), 0) || 22} {t.days || "days"}
                    </span>
                  </div>
                </div>
              </div>
              <CardBody className="p-3">
                <div className="relative">
                  <div className="absolute left-[18px] top-2 bottom-2 w-[2px] bg-secondary-100"></div>
                  
                  {(jobData.recruitmentStages || defaultRecruitmentStages).map((stage: any, index: number) => (
                    <div key={index} className="relative flex items-start gap-3 mb-3 last:mb-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 
                        ${index === 0 ? "bg-secondary text-white border-secondary" : 
                          "bg-white text-secondary-600 border-secondary-200"}`}>
                        {index === 0 ? (
                          <Icon icon="lucide:check" width={16} />
                        ) : (
                          <span className="font-semibold text-sm">{index + 1}</span>
                        )}
                      </div>
                      
                      <div className={`flex-1 p-3 rounded-lg border 
                        ${index === 0 ? "bg-secondary-50 border-secondary-200" : "bg-default-50 border-default-200"}`}>
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <div>
                            <h4 className="font-medium text-sm">{stage.name}</h4>
                            <p className="text-xs text-default-600 mt-0.5">{stage.description}</p>
                          </div>
                          <div className="flex items-center gap-1 px-2 py-1 bg-white rounded-md text-xs border border-default-200">
                            <Icon icon="lucide:calendar" width={12} className="text-default-500" />
                            <span>{stage.estimatedDays || 3} {t.days || "days"}</span>
                          </div>
                        </div>
                        
                        {stage.isActive && (
                          <div className="mt-2 pt-2 border-t border-secondary-100">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-success"></div>
                              <span className="text-xs text-success-600">{t.currentStage || "Current Stage"}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      size="sm" 
                      variant="flat" 
                      color="secondary"
                      className="text-xs px-4"
                      startContent={<Icon icon="lucide:edit-3" width={14} />}
                    >
                      {t.configureStages || "Configure Stages"}
                    </Button>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="lg:col-span-4 xl:col-span-4 space-y-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-sm overflow-hidden border-none sticky top-5">
            <CardBody className="p-0">
              <div className="bg-default-50 p-3 border-b flex items-center justify-between">
                <h3 className="font-semibold text-base flex items-center gap-2">
                  <Icon icon="lucide:git-branch" className="text-primary" width={16} />
                  {t.approvalWorkflow || "Approval Workflow"}
                </h3>
              </div>
              
              <div className="p-3">
                <div className="relative pt-1">
                  <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-default-200"></div>
                  
                  <div className="space-y-3">
                    {workflowSteps.map((step, index) => {
                      const isActive = step.id === workflowType;
                      const isCompleted = index < currentStepIndex;
                      
                      return (
                        <div 
                          key={step.id}
                          className={`relative flex items-start gap-3 ${isActive ? 'z-10' : ''}`}
                          onClick={() => onWorkflowChange(step.id as any)}
                        >
                          <div 
                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all duration-200 shadow-sm cursor-pointer
                              ${isActive 
                                ? `border-${step.color} bg-${step.color}-50 text-${step.color}-600` 
                                : isCompleted
                                  ? 'border-success bg-success text-white'
                                  : 'border-default-300 bg-white text-default-600'
                              }`}
                          >
                            {isCompleted ? (
                              <Icon icon="lucide:check" width={14} />
                            ) : (
                              <span className="font-semibold text-xs">{index + 1}</span>
                            )}
                          </div>
                          
                          <div 
                            className={`flex-1 p-2 rounded-lg transition-all duration-200 cursor-pointer hover:bg-default-50
                              ${isActive ? `bg-${step.color}-50 border border-${step.color}-200` : ''}`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon 
                                icon={step.icon} 
                                width={14} 
                                className={isActive ? `text-${step.color}` : 'text-default-500'} 
                              />
                              <h4 className={`font-medium text-sm ${isActive ? `text-${step.color}-600` : 'text-foreground'}`}>
                                {step.title}
                              </h4>
                            </div>
                            <p className="text-xs text-default-500 mt-1">
                              {step.description}
                            </p>
                            
                            {isActive && step.id === 'approval' && (
                              <div className="mt-2 pt-2 border-t border-primary-100">
                                <p className="text-xs font-medium text-primary-600 mb-1">{t.approvers}:</p>
                                <div className="flex items-center -space-x-1">
                                  <Tooltip content="Sarah Johnson (HR Manager)">
                                    <Avatar 
                                      src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
                                      size="sm" 
                                      className="border-2 border-white" 
                                    />
                                  </Tooltip>
                                  <Tooltip content="Michael Chen (Department Head)">
                                    <Avatar 
                                      src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2" 
                                      size="sm" 
                                      className="border-2 border-white" 
                                    />
                                  </Tooltip>
                                  <Tooltip content="Priya Sharma (Director)">
                                    <Avatar 
                                      src="https://img.heroui.chat/image/avatar?w=200&h=200&u=3" 
                                      size="sm" 
                                      className="border-2 border-white" 
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            )}
                            
                            {isActive && step.id === 'publish' && (
                              <div className="mt-2 pt-2 border-t border-success-100">
                                <p className="text-xs font-medium text-success-600 mb-1">{t.willBePublishedTo}:</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  <Chip size="sm" variant="flat" color="success" className="text-xs">{t.internalCareersPortal}</Chip>
                                  <Chip size="sm" variant="flat" color="success" className="text-xs">LinkedIn</Chip>
                                  <Chip size="sm" variant="flat" color="success" className="text-xs">Indeed</Chip>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-4">
                  <Button 
                    color={getWorkflowColor() as any}
                    className="w-full py-3 text-sm font-medium"
                    startContent={<Icon icon={getWorkflowIcon()} width={16} />}
                  >
                    {getWorkflowTitle()}
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};