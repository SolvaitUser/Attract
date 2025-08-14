import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Select, SelectItem, Tabs, Tab, Card, CardBody, Chip, Switch } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { motion } from "framer-motion";
import { SuccessAnimation } from "./SuccessAnimation";
import { JobForm } from "./JobForm";
import { JobSubmissionConfirmation } from "./JobSubmissionConfirmation";
import { RecruitmentStages } from "./RecruitmentStages";
import { ApprovalWorkflow } from "./ApprovalWorkflow";
import { PublishingOptions } from "./PublishingOptions";
import { workforceRequests } from "../../data/mockData";
import { AIJobAssistant } from "./AIJobAssistant";
import { AIResultPreview } from "./AIResultPreview";

interface CreateJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "manual" | "ai";
}

export const CreateJobModal: React.FC<CreateJobModalProps> = ({ isOpen, onClose, mode }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("details");
  const [jobData, setJobData] = useState({
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    salary: { min: 0, max: 0, currency: "USD" },
    description: "",
    requirements: [""],
    responsibilities: [""],
    skills: [""],
    recruitmentStages: [] // Add recruitment stages field
  });
  const [aiStep, setAiStep] = useState<"conversation" | "preview" | "editing" | "confirmation">("conversation");
  const [aiGeneratedData, setAiGeneratedData] = useState<any>(null);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<"approval" | "draft" | "publish">("approval");
  const [jobFormData, setJobFormData] = useState<any>(null);
  const [manualStep, setManualStep] = useState<"form" | "confirmation">("form");
  const [formCompleted, setFormCompleted] = useState(false);
  const [isMSD365FOIntegrated, setIsMSD365FOIntegrated] = React.useState(true); // Set to true for demo purposes
  const [selectedWorkforceRequest, setSelectedWorkforceRequest] = React.useState<string | null>(null);
  const [isWorkforceRequestLinked, setIsWorkforceRequestLinked] = React.useState(false);
  const [isEditingUnlocked, setIsEditingUnlocked] = React.useState(false);
  const [showWorkforceDetails, setShowWorkforceDetails] = React.useState(false);
  const [numberOfVacancies, setNumberOfVacancies] = React.useState(1);

  // Reset tab and steps when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab("details");
      setManualStep("form");
      if (mode === "ai") {
        setAiStep("conversation");
      }
    }
  }, [isOpen]);

  const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
  const locations = ["Remote", "New York", "San Francisco", "London", "Dubai", "Singapore"];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Temporary", "Internship"];

  const handleChange = (field: string, value: any) => {
    setJobData({
      ...jobData,
      [field]: value
    });
  };

  const handleArrayChange = (field: string, index: number, value: string) => {
    const newArray = [...jobData[field as keyof typeof jobData] as string[]];
    newArray[index] = value;
    setJobData({
      ...jobData,
      [field]: newArray
    });
  };

  const addArrayItem = (field: string) => {
    const newArray = [...jobData[field as keyof typeof jobData] as string[], ""];
    setJobData({
      ...jobData,
      [field]: newArray
    });
  };

  const removeArrayItem = (field: string, index: number) => {
    const newArray = [...jobData[field as keyof typeof jobData] as string[]];
    newArray.splice(index, 1);
    setJobData({
      ...jobData,
      [field]: newArray
    });
  };

  // Enhanced handlers for AI workflow
  const handleAIGenerated = (generatedData: any) => {
    setAiGeneratedData(generatedData);
    setAiStep("preview");
  };

  const handleAcceptAIResults = () => {
    setProcessingAction(true);
    setShowSuccessAnimation(true);
    
    // Simulate processing time
    setTimeout(() => {
      setJobData({
        ...jobData,
        ...aiGeneratedData
      });
      setJobFormData(aiGeneratedData);
      setShowSuccessAnimation(false);
      setProcessingAction(false);
      setAiStep("confirmation");
    }, 1500);
  };

  const handleEditAIResults = () => {
    setJobData({
      ...jobData,
      ...aiGeneratedData
    });
    setJobFormData(aiGeneratedData);
    setAiStep("editing");
  };

  const handleBackToAIConversation = () => {
    setAiStep("conversation");
  };

  const handleFormDataChange = (newData: any) => {
    setJobFormData(newData);
  };

  const handleWorkflowSelection = (workflow: "approval" | "draft" | "publish") => {
    setSelectedWorkflow(workflow);
  };

  const handleSubmit = () => {
    setProcessingAction(true);
    setShowSuccessAnimation(true);
    
    // Simulate form submission
    setTimeout(() => {
      // In a real app, this would save the job to the backend
      setShowSuccessAnimation(false);
      setProcessingAction(false);
      onClose();
      
      // Show toast notification based on workflow
      let notificationTitle = "";
      let notificationMessage = "";
      
      switch (selectedWorkflow) {
        case "approval":
          notificationTitle = t.jobSentForApproval;
          notificationMessage = t.jobSentForApprovalMessage;
          break;
        case "draft":
          notificationTitle = t.jobSavedAsDraft;
          notificationMessage = t.jobSavedAsDraftMessage;
          break;
        case "publish":
          notificationTitle = t.jobPublished;
          notificationMessage = t.jobPublishedMessage;
          break;
      }
      
      // Add toast notification (implementation depends on your toast system)
      // addToast({ title: notificationTitle, description: notificationMessage, ...etc })
    }, 1500);
  };

  // Add new validation function for manual job creation
  const validateJobData = () => {
    // Basic validation - check for required fields
    return jobData.title.trim() !== "" && 
           jobData.department.trim() !== "" && 
           jobData.location.trim() !== "" &&
           jobData.description.trim() !== "";
  };

  // Add new function to handle moving to confirmation screen in manual mode
  const handleManualReviewJob = () => {
    if (validateJobData()) {
      setJobFormData(jobData);
      setManualStep("confirmation");
      setFormCompleted(true);
    } else {
      // In a real app, show validation errors
      console.log("Please fill all required fields");
    }
  };

  // Add handler for workforce request selection
  const handleWorkforceRequestChange = (keys: any) => {
    const requestId = Array.from(keys)[0] as string;
    setSelectedWorkforceRequest(requestId);
    
    if (requestId) {
      const selectedRequest = workforceRequests.find(req => req.id === requestId);
      if (selectedRequest) {
        // Auto-fill job data with workforce request data
        setJobData({
          ...jobData,
          title: selectedRequest.title,
          department: selectedRequest.department,
          description: selectedRequest.description,
          location: selectedRequest.workLocation,
          salary: selectedRequest.salaryRange,
          responsibilities: selectedRequest.responsibilities,
          skills: selectedRequest.skills,
        });
        setNumberOfVacancies(selectedRequest.numberOfVacancies);
        setIsWorkforceRequestLinked(true);
        setShowWorkforceDetails(true);
      }
    } else {
      setIsWorkforceRequestLinked(false);
    }
  };

  // Add handler for unlocking editing
  const handleUnlockEditing = (isUnlocked: boolean) => {
    setIsEditingUnlocked(isUnlocked);
  };

  // Helper function to determine if a field should be disabled
  const isFieldDisabled = (fieldName: string) => {
    const lockedFields = ['title', 'department', 'description'];
    return isWorkforceRequestLinked && !isEditingUnlocked && lockedFields.includes(fieldName);
  };

  // Determine modal content
  const renderModalContent = () => {
    if (mode === "ai") {
      switch (aiStep) {
        case "conversation":
          return <AIJobAssistant onGenerated={handleAIGenerated} />;
        case "preview":
          return (
            <AIResultPreview 
              data={aiGeneratedData}
              onAccept={handleAcceptAIResults}
              onEdit={handleEditAIResults}
              onBack={handleBackToAIConversation}
              isProcessing={processingAction}
            />
          );
        case "editing":
          return (
            <JobForm 
              initialData={jobFormData} 
              onChange={handleFormDataChange}
              workflowType={selectedWorkflow}
              onWorkflowChange={handleWorkflowSelection}
            />
          );
        case "confirmation":
          return (
            <JobSubmissionConfirmation 
              jobData={jobFormData}
              workflowType={selectedWorkflow}
              onWorkflowChange={handleWorkflowSelection}
            />
          );
      }
    } else {
      // Manual mode rendering
      switch (manualStep) {
        case "form":
          return (
            <>
              <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)}>
                <Tab key="details" title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:file-text" width={16} />
                    <span>{t.jobDetails}</span>
                  </div>
                }>
                  <div className="space-y-4 mt-4">
                    {/* Add Workforce Request integration section */}
                    {isMSD365FOIntegrated && (
                      <Card className="bg-default-50 border-default-200 mb-4">
                        <CardBody className="p-3">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start gap-2">
                              <Icon icon="lucide:link" className="text-primary mt-1" width={18} />
                              <div className="flex-1">
                                <h3 className="text-sm font-medium">{t.linkToWorkforceRequest || "Link to Workforce Request"}</h3>
                                <p className="text-xs text-default-600 mb-2">{t.linkToWorkforceRequestDescription || "Auto-fill job details from an approved Workforce Request"}</p>
                                
                                <Select
                                  label={t.selectWorkforceRequest || "Select Workforce Request"}
                                  placeholder={t.selectWorkforceRequest || "Select Workforce Request"}
                                  selectedKeys={selectedWorkforceRequest ? [selectedWorkforceRequest] : []}
                                  onSelectionChange={handleWorkforceRequestChange}
                                  className="max-w-full"
                                  size="sm"
                                >
                                  {workforceRequests.map((request) => (
                                    <SelectItem key={request.id} value={request.id}>
                                      {`${request.id}: ${request.title} - ${request.department}`}
                                    </SelectItem>
                                  ))}
                                </Select>
                                
                                {isWorkforceRequestLinked && (
                                  <div className="mt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
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
                                      <Input
                                        type="number"
                                        label={t.numberOfVacancies || "Number of Vacancies"}
                                        value={numberOfVacancies.toString()}
                                        onValueChange={(value) => setNumberOfVacancies(parseInt(value) || 1)}
                                        min={1}
                                        className="w-40 ml-2"
                                        size="sm"
                                      />
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs text-default-600">{t.unlockToEdit || "Unlock to Edit"}</span>
                                      <Switch
                                        size="sm"
                                        isSelected={isEditingUnlocked}
                                        onValueChange={handleUnlockEditing}
                                        color="primary"
                                      />
                                    </div>
                                  </div>
                                )}
                                
                                {isWorkforceRequestLinked && showWorkforceDetails && selectedWorkforceRequest && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-3 border-t pt-3"
                                  >
                                    {(() => {
                                      const request = workforceRequests.find(req => req.id === selectedWorkforceRequest);
                                      if (!request) return null;
                                      
                                      return (
                                        <div className="space-y-3 text-sm">
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                              <p className="text-xs font-medium text-default-600">{t.workLocation || "Work Location"}</p>
                                              <p>{request.workLocation}</p>
                                            </div>
                                            <div>
                                              <p className="text-xs font-medium text-default-600">{t.salaryRange || "Salary Range"}</p>
                                              <p>
                                                {request.salaryRange.currency} {request.salaryRange.min.toLocaleString()} - {request.salaryRange.max.toLocaleString()}
                                              </p>
                                            </div>
                                          </div>
                                          
                                          <div>
                                            <p className="text-xs font-medium text-default-600">{t.responsibilities || "Responsibilities"}</p>
                                            <ul className="list-disc pl-5 text-xs">
                                              {request.responsibilities.map((item, index) => (
                                                <li key={index}>{item}</li>
                                              ))}
                                            </ul>
                                          </div>
                                          
                                          <div>
                                            <p className="text-xs font-medium text-default-600">{t.keyTasks || "Key Tasks"}</p>
                                            <ul className="list-disc pl-5 text-xs">
                                              {request.keyTasks.map((item, index) => (
                                                <li key={index}>{item}</li>
                                              ))}
                                            </ul>
                                          </div>
                                          
                                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            <div>
                                              <p className="text-xs font-medium text-default-600">{t.qualifications || "Qualifications"}</p>
                                              <ul className="list-disc pl-5 text-xs">
                                                {request.qualifications.map((item, index) => (
                                                  <li key={index}>{item}</li>
                                                ))}
                                              </ul>
                                            </div>
                                            <div>
                                              <p className="text-xs font-medium text-default-600">{t.skills || "Skills"}</p>
                                              <div className="flex flex-wrap gap-1 mt-1">
                                                {request.skills.map((skill, index) => (
                                                  <Chip key={index} size="sm" variant="flat">{skill}</Chip>
                                                ))}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })()}
                                  </motion.div>
                                )}
                                
                                {/* Show fallback message when no Workforce Requests are available */}
                                {isMSD365FOIntegrated && workforceRequests.length === 0 && (
                                  <div className="mt-2 p-3 bg-default-100 rounded-medium">
                                    <p className="text-sm text-default-700">
                                      {t.noWorkforceRequestsAvailable || "No approved Workforce Requests available."}
                                    </p>
                                    <Button
                                      size="sm"
                                      variant="light"
                                      color="primary"
                                      className="mt-2"
                                      startContent={<Icon icon="lucide:external-link" width={14} />}
                                    >
                                      {t.goToWorkforcePlanning || "Go to Workforce Planning"}
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                    )}
                    
                    <Input
                      label={t.jobTitle}
                      placeholder={t.enterJobTitle}
                      value={jobData.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      isDisabled={isFieldDisabled("title")}
                      classNames={{
                        input: isFieldDisabled("title") ? "bg-default-50" : ""
                      }}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label={t.department}
                        placeholder={t.selectDepartment}
                        selectedKeys={jobData.department ? [jobData.department] : []}
                        onSelectionChange={(keys) => handleChange("department", Array.from(keys)[0])}
                        isDisabled={isFieldDisabled("department")}
                        classNames={{
                          trigger: isFieldDisabled("department") ? "bg-default-50" : ""
                        }}
                      >
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </Select>
                      
                      <Select
                        label={t.location}
                        placeholder={t.selectLocation}
                        selectedKeys={jobData.location ? [jobData.location] : []}
                        onSelectionChange={(keys) => handleChange("location", Array.from(keys)[0])}
                      >
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                        ))}
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select
                        label={t.jobType}
                        placeholder={t.selectJobType}
                        selectedKeys={jobData.type ? [jobData.type] : []}
                        onSelectionChange={(keys) => handleChange("type", Array.from(keys)[0])}
                      >
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </Select>
                      
                      <Input
                        label={t.experience}
                        placeholder={t.experienceRequired}
                        value={jobData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <Input
                        type="number"
                        label={t.salaryMin}
                        placeholder="0"
                        value={jobData.salary.min.toString()}
                        onChange={(e) => handleChange("salary", {...jobData.salary, min: parseInt(e.target.value) || 0})}
                      />
                      <Input
                        type="number"
                        label={t.salaryMax}
                        placeholder="0"
                        value={jobData.salary.max.toString()}
                        onChange={(e) => handleChange("salary", {...jobData.salary, max: parseInt(e.target.value) || 0})}
                      />
                      <Select
                        label={t.currency}
                        selectedKeys={[jobData.salary.currency]}
                        onSelectionChange={(keys) => handleChange("salary", {...jobData.salary, currency: Array.from(keys)[0]})}
                      >
                        <SelectItem key="USD">USD</SelectItem>
                        <SelectItem key="EUR">EUR</SelectItem>
                        <SelectItem key="GBP">GBP</SelectItem>
                        <SelectItem key="SAR">SAR</SelectItem>
                        <SelectItem key="AED">AED</SelectItem>
                      </Select>
                    </div>
                    
                    <Textarea
                      label={t.jobDescription}
                      placeholder={t.enterJobDescription}
                      value={jobData.description}
                      onChange={(e) => handleChange("description", e.target.value)}
                      minRows={3}
                      isDisabled={isFieldDisabled("description")}
                      classNames={{
                        input: isFieldDisabled("description") ? "bg-default-50" : ""
                      }}
                    />
                  </div>
                </Tab>
                
                <Tab key="requirements" title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:check-square" width={16} />
                    <span>{t.requirementsAndResponsibilities}</span>
                  </div>
                }>
                  <div className="space-y-6 mt-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{t.requirements}</h3>
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="light" 
                          onPress={() => addArrayItem("requirements")}
                        >
                          <Icon icon="lucide:plus" width={16} />
                        </Button>
                      </div>
                      {jobData.requirements.map((req, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <Input
                            className="flex-1"
                            placeholder={`${t.requirement} ${index + 1}`}
                            value={req}
                            onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                          />
                          {jobData.requirements.length > 1 && (
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light" 
                              color="danger"
                              onPress={() => removeArrayItem("requirements", index)}
                            >
                              <Icon icon="lucide:x" width={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{t.responsibilities}</h3>
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="light" 
                          onPress={() => addArrayItem("responsibilities")}
                        >
                          <Icon icon="lucide:plus" width={16} />
                        </Button>
                      </div>
                      {jobData.responsibilities.map((resp, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <Input
                            className="flex-1"
                            placeholder={`${t.responsibility} ${index + 1}`}
                            value={resp}
                            onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                          />
                          {jobData.responsibilities.length > 1 && (
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light" 
                              color="danger"
                              onPress={() => removeArrayItem("responsibilities", index)}
                            >
                              <Icon icon="lucide:x" width={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold">{t.skills}</h3>
                        <Button 
                          isIconOnly 
                          size="sm" 
                          variant="light" 
                          onPress={() => addArrayItem("skills")}
                        >
                          <Icon icon="lucide:plus" width={16} />
                        </Button>
                      </div>
                      {jobData.skills.map((skill, index) => (
                        <div key={index} className="flex items-start gap-2 mb-2">
                          <Input
                            className="flex-1"
                            placeholder={`${t.skill} ${index + 1}`}
                            value={skill}
                            onChange={(e) => handleArrayChange("skills", index, e.target.value)}
                          />
                          {jobData.skills.length > 1 && (
                            <Button 
                              isIconOnly 
                              size="sm" 
                              variant="light" 
                              color="danger"
                              onPress={() => removeArrayItem("skills", index)}
                            >
                              <Icon icon="lucide:x" width={16} />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
                
                <Tab key="stages" title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:git-branch" width={16} />
                    <span>{t.recruitmentStages || "Recruitment Stages"}</span>
                  </div>
                }>
                  <RecruitmentStages 
                    initialStages={jobData.recruitmentStages || []} 
                    onChange={(stages) => handleChange("recruitmentStages", stages)} 
                  />
                </Tab>
                
                <Tab key="approval" title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:check-circle" width={16} />
                    <span>{t.approvalWorkflow}</span>
                  </div>
                }>
                  <ApprovalWorkflow />
                </Tab>
                
                <Tab key="publishing" title={
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:globe" width={16} />
                    <span>{t.publishing}</span>
                  </div>
                }>
                  <PublishingOptions />
                </Tab>
              </Tabs>
            </>
          );
        case "confirmation":
          return (
            <JobSubmissionConfirmation 
              jobData={jobFormData}
              workflowType={selectedWorkflow}
              onWorkflowChange={handleWorkflowSelection}
            />
          );
      }
    }
    
    // For manual job creation or other tabs
    return (
      <>
        <Tabs selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(key as string)}>
          <Tab key="details" title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:file-text" width={16} />
              <span>{t.jobDetails}</span>
            </div>
          }>
            <div className="space-y-4 mt-4">
              <Input
                label={t.jobTitle}
                placeholder={t.enterJobTitle}
                value={jobData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label={t.department}
                  placeholder={t.selectDepartment}
                  selectedKeys={jobData.department ? [jobData.department] : []}
                  onSelectionChange={(keys) => handleChange("department", Array.from(keys)[0])}
                >
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </Select>
                
                <Select
                  label={t.location}
                  placeholder={t.selectLocation}
                  selectedKeys={jobData.location ? [jobData.location] : []}
                  onSelectionChange={(keys) => handleChange("location", Array.from(keys)[0])}
                >
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label={t.jobType}
                  placeholder={t.selectJobType}
                  selectedKeys={jobData.type ? [jobData.type] : []}
                  onSelectionChange={(keys) => handleChange("type", Array.from(keys)[0])}
                >
                  {jobTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </Select>
                
                <Input
                  label={t.experience}
                  placeholder={t.experienceRequired}
                  value={jobData.experience}
                  onChange={(e) => handleChange("experience", e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <Input
                  type="number"
                  label={t.salaryMin}
                  placeholder="0"
                  value={jobData.salary.min.toString()}
                  onChange={(e) => handleChange("salary", {...jobData.salary, min: parseInt(e.target.value) || 0})}
                />
                <Input
                  type="number"
                  label={t.salaryMax}
                  placeholder="0"
                  value={jobData.salary.max.toString()}
                  onChange={(e) => handleChange("salary", {...jobData.salary, max: parseInt(e.target.value) || 0})}
                />
                <Select
                  label={t.currency}
                  selectedKeys={[jobData.salary.currency]}
                  onSelectionChange={(keys) => handleChange("salary", {...jobData.salary, currency: Array.from(keys)[0]})}
                >
                  <SelectItem key="USD">USD</SelectItem>
                  <SelectItem key="EUR">EUR</SelectItem>
                  <SelectItem key="GBP">GBP</SelectItem>
                  <SelectItem key="SAR">SAR</SelectItem>
                  <SelectItem key="AED">AED</SelectItem>
                </Select>
              </div>
              
              <Textarea
                label={t.jobDescription}
                placeholder={t.enterJobDescription}
                value={jobData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                minRows={3}
              />
            </div>
          </Tab>
          
          <Tab key="requirements" title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-square" width={16} />
              <span>{t.requirementsAndResponsibilities}</span>
            </div>
          }>
            <div className="space-y-6 mt-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{t.requirements}</h3>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light" 
                    onPress={() => addArrayItem("requirements")}
                  >
                    <Icon icon="lucide:plus" width={16} />
                  </Button>
                </div>
                {jobData.requirements.map((req, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <Input
                      className="flex-1"
                      placeholder={`${t.requirement} ${index + 1}`}
                      value={req}
                      onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                    />
                    {jobData.requirements.length > 1 && (
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        color="danger"
                        onPress={() => removeArrayItem("requirements", index)}
                      >
                        <Icon icon="lucide:x" width={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{t.responsibilities}</h3>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light" 
                    onPress={() => addArrayItem("responsibilities")}
                  >
                    <Icon icon="lucide:plus" width={16} />
                  </Button>
                </div>
                {jobData.responsibilities.map((resp, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <Input
                      className="flex-1"
                      placeholder={`${t.responsibility} ${index + 1}`}
                      value={resp}
                      onChange={(e) => handleArrayChange("responsibilities", index, e.target.value)}
                    />
                    {jobData.responsibilities.length > 1 && (
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        color="danger"
                        onPress={() => removeArrayItem("responsibilities", index)}
                      >
                        <Icon icon="lucide:x" width={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">{t.skills}</h3>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light" 
                    onPress={() => addArrayItem("skills")}
                  >
                    <Icon icon="lucide:plus" width={16} />
                  </Button>
                </div>
                {jobData.skills.map((skill, index) => (
                  <div key={index} className="flex items-start gap-2 mb-2">
                    <Input
                      className="flex-1"
                      placeholder={`${t.skill} ${index + 1}`}
                      value={skill}
                      onChange={(e) => handleArrayChange("skills", index, e.target.value)}
                    />
                    {jobData.skills.length > 1 && (
                      <Button 
                        isIconOnly 
                        size="sm" 
                        variant="light" 
                        color="danger"
                        onPress={() => removeArrayItem("skills", index)}
                      >
                        <Icon icon="lucide:x" width={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Tab>
          
          <Tab key="stages" title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:git-branch" width={16} />
              <span className="text-foreground">{t.recruitmentStages || "Recruitment Stages"}</span>
            </div>
          }>
            <RecruitmentStages 
              initialStages={jobData.recruitmentStages || []} 
              onChange={(stages) => handleChange("recruitmentStages", stages)} 
            />
          </Tab>
          
          <Tab key="approval" title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:check-circle" width={16} />
              <span>{t.approvalWorkflow}</span>
            </div>
          }>
            <ApprovalWorkflow />
          </Tab>
          
          <Tab key="publishing" title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:globe" width={16} />
              <span>{t.publishing}</span>
            </div>
          }>
            <PublishingOptions />
          </Tab>
        </Tabs>
      </>
    );
  };

  // Determine footer content
  const renderFooterContent = () => {
    if (mode === "ai") {
      switch (aiStep) {
        case "conversation":
          return (
            <Button variant="flat" onPress={onClose}>
              {t.cancel}
            </Button>
          );
        case "preview":
          return (
            <>
              <Button 
                variant="flat" 
                startContent={<Icon icon="lucide:arrow-left" width={16} />} 
                onPress={handleBackToAIConversation}
                isDisabled={processingAction}
              >
                {t.backToConversation}
              </Button>
            </>
          );
        case "editing":
          return (
            <>
              <Button 
                variant="flat" 
                onPress={onClose}
                isDisabled={processingAction}
              >
                {t.cancel}
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                isLoading={processingAction}
              >
                {t.submitJobRequisition}
              </Button>
            </>
          );
        case "confirmation":
          return (
            <>
              <Button 
                variant="flat" 
                onPress={onClose}
                isDisabled={processingAction}
              >
                {t.cancel}
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                isLoading={processingAction}
              >
                {t.submitJobRequisition}
              </Button>
            </>
          );
      }
    } else {
      // Manual mode footer content
      if (manualStep === "form") {
        return (
          <>
            {activeTab !== "details" && (
              <Button variant="flat" onPress={() => {
                const tabKeys = ["details", "requirements", "approval", "publishing"];
                const currentIndex = tabKeys.indexOf(activeTab);
                if (currentIndex > 0) {
                  setActiveTab(tabKeys[currentIndex - 1]);
                }
              }}>
                {t.previous}
              </Button>
            )}
            
            {activeTab !== "publishing" ? (
              <Button color="primary" onPress={() => {
                const tabKeys = ["details", "requirements", "approval", "publishing"];
                const currentIndex = tabKeys.indexOf(activeTab);
                if (currentIndex < tabKeys.length - 1) {
                  setActiveTab(tabKeys[currentIndex + 1]);
                }
              }}>
                {t.next}
              </Button>
            ) : (
              <Button 
                color="primary" 
                onPress={handleManualReviewJob}
                isDisabled={!validateJobData()}
              >
                {t.reviewAndSubmit}
              </Button>
            )}
          </>
        );
      } else {
        // Confirmation screen buttons
        return (
          <>
            <Button 
              variant="flat" 
              startContent={<Icon icon="lucide:arrow-left" width={16} />}
              onPress={() => setManualStep("form")}
              isDisabled={processingAction}
            >
              {t.backToEditing}
            </Button>
            <Button 
              color="primary" 
              onPress={handleSubmit}
              isLoading={processingAction}
            >
              {t.submitJobRequisition}
            </Button>
          </>
        );
      }
    }
  };

  // Helper function to get the modal title based on the current step
  function getModalTitle() {
    if (mode === "ai") {
      switch (aiStep) {
        case "conversation":
          return t.createJobAI;
        case "preview":
          return t.reviewAIGenerated;
        case "editing":
          return t.editJobRequisition;
        case "confirmation":
          return t.confirmJobRequisition;
        default:
          return t.createJobAI;
      }
    } else {
      // Manual mode titles
      return manualStep === "form" ? t.createJobManual : t.confirmJobRequisition;
    }
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose} 
      size={mode === "manual" ? "4xl" : "3xl"} // Changed from fixed "3xl" to "4xl" for manual mode
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {mode === "manual" ? getModalTitle() : getModalTitle()}
            </ModalHeader>
            <ModalBody>
              {/* Success animation overlay */}
              {showSuccessAnimation && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-b-lg">
                  <SuccessAnimation />
                </div>
              )}
              
              {/* Main content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {renderModalContent()}
              </motion.div>
            </ModalBody>
            <ModalFooter>
              {renderFooterContent()}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};