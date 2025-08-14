import React, { useState, useEffect } from "react";
import { Card, CardBody, Input, Select, SelectItem, Textarea, Chip, Switch, Divider, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { motion } from "framer-motion";
import { ApprovalWorkflow } from "./ApprovalWorkflow";
import { PublishingOptions } from "./PublishingOptions";
import { RecruitmentStages } from "./RecruitmentStages";
import { workforceRequests } from "../../data/mockData";

interface JobFormProps {
  initialData: any;
  onChange: (data: any) => void;
  workflowType: "approval" | "draft" | "publish";
  onWorkflowChange: (type: "approval" | "draft" | "publish") => void;
}

export const JobForm: React.FC<JobFormProps> = ({ 
  initialData, 
  onChange,
  workflowType,
  onWorkflowChange
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState(initialData || {
    title: "",
    department: "",
    location: "",
    type: "",
    experience: "",
    description: "",
    requirements: [],
    responsibilities: [],
    skills: [],
    salary: { min: 0, max: 0, currency: "USD" },
    recruitmentStages: [] // Add recruitment stages field
  });
  
  const [newSkill, setNewSkill] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newResponsibility, setNewResponsibility] = useState("");
  
  // Sync form data with parent component
  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);
  
  // Add new state for workforce request integration
  const [isMSD365FOIntegrated, setIsMSD365FOIntegrated] = useState(true); // Set to true for demo purposes
  const [selectedWorkforceRequest, setSelectedWorkforceRequest] = useState<string | null>(
    initialData?.linkedWorkforceRequestId || null
  );
  const [isWorkforceRequestLinked, setIsWorkforceRequestLinked] = useState(!!initialData?.linkedWorkforceRequestId);
  const [isEditingUnlocked, setIsEditingUnlocked] = useState(false);
  const [showWorkforceDetails, setShowWorkforceDetails] = useState(!!initialData?.linkedWorkforceRequestId);
  const [numberOfVacancies, setNumberOfVacancies] = useState(initialData?.numberOfVacancies || 1);

  const handleInputChange = (field: string, value: string | number | Record<string, any>) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleSalaryChange = (field: 'min' | 'max' | 'currency', value: string | number) => {
    setFormData({
      ...formData,
      salary: {
        ...formData.salary,
        [field]: field !== 'currency' ? Number(value) : value
      }
    });
  };
  
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };
  
  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s: string) => s !== skill)
    });
  };
  
  const addRequirement = () => {
    if (newRequirement.trim() && !formData.requirements.includes(newRequirement.trim())) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement.trim()]
      });
      setNewRequirement("");
    }
  };
  
  const removeRequirement = (req: string) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((r: string) => r !== req)
    });
  };
  
  const addResponsibility = () => {
    if (newResponsibility.trim() && !formData.responsibilities.includes(newResponsibility.trim())) {
      setFormData({
        ...formData,
        responsibilities: [...formData.responsibilities, newResponsibility.trim()]
      });
      setNewResponsibility("");
    }
  };
  
  const removeResponsibility = (resp: string) => {
    setFormData({
      ...formData,
      responsibilities: formData.responsibilities.filter((r: string) => r !== resp)
    });
  };

  // Add handler for workforce request selection
  const handleWorkforceRequestChange = (keys: any) => {
    const requestId = Array.from(keys)[0] as string;
    setSelectedWorkforceRequest(requestId);
    
    if (requestId) {
      const selectedRequest = workforceRequests.find(req => req.id === requestId);
      if (selectedRequest) {
        // Auto-fill job data with workforce request data
        const updatedFormData = {
          ...formData,
          title: selectedRequest.title,
          department: selectedRequest.department,
          description: selectedRequest.description,
          location: selectedRequest.workLocation,
          salary: selectedRequest.salaryRange,
          responsibilities: selectedRequest.responsibilities,
          skills: selectedRequest.skills,
          linkedWorkforceRequestId: requestId,
          numberOfVacancies: selectedRequest.numberOfVacancies
        };
        
        setFormData(updatedFormData);
        setNumberOfVacancies(selectedRequest.numberOfVacancies);
        setIsWorkforceRequestLinked(true);
        setShowWorkforceDetails(true);
        
        // Notify parent component of the changes
        onChange(updatedFormData);
      }
    } else {
      setIsWorkforceRequestLinked(false);
      
      // Update form data to remove workforce request link
      const updatedFormData = {
        ...formData,
        linkedWorkforceRequestId: null
      };
      
      setFormData(updatedFormData);
      onChange(updatedFormData);
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
  
  // Handle number of vacancies change
  const handleVacanciesChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    setNumberOfVacancies(numValue);
    
    const updatedFormData = {
      ...formData,
      numberOfVacancies: numValue
    };
    
    setFormData(updatedFormData);
    onChange(updatedFormData);
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-sm bg-primary-50/50 border border-primary-100">
        <CardBody className="p-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary-100 rounded-full p-2 text-primary">
              <Icon icon="lucide:sparkles" width={24} />
            </div>
            <div>
              <h3 className="font-medium text-primary-700">{t.aiEnhancedForm}</h3>
              <p className="text-sm text-primary-600">{t.aiFormDescription}</p>
            </div>
          </div>
        </CardBody>
      </Card>
      
      <div className="pt-4 space-y-4">
        {isMSD365FOIntegrated && (
          <Card className="bg-default-50 border-default-200 mb-4">
            <CardBody className="p-3">
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <Icon icon="lucide:link" className="text-primary mt-1" width={18} />
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">{t.linkToWorkforceRequest}</h3>
                    <p className="text-xs text-default-600 mb-2">{t.linkToWorkforceRequestDescription}</p>
                    
                    <Select
                      label={t.selectWorkforceRequest}
                      placeholder={t.selectWorkforceRequest}
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
                            {showWorkforceDetails ? t.hideDetails : t.showDetails}
                          </Button>
                          <Input
                            type="number"
                            label={t.numberOfVacancies}
                            value={numberOfVacancies.toString()}
                            onValueChange={handleVacanciesChange}
                            min={1}
                            className="w-40 ml-2"
                            size="sm"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-default-600">{t.unlockToEdit}</span>
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
                                  <p className="text-xs font-medium text-default-600">{t.workLocation}</p>
                                  <p>{request.workLocation}</p>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-default-600">{t.salaryRange}</p>
                                  <p>
                                    {request.salaryRange.currency} {request.salaryRange.min.toLocaleString()} - {request.salaryRange.max.toLocaleString()}
                                  </p>
                                </div>
                              </div>
                              
                              <div>
                                <p className="text-xs font-medium text-default-600">{t.responsibilities}</p>
                                <ul className="list-disc pl-5 text-xs">
                                  {request.responsibilities.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <p className="text-xs font-medium text-default-600">{t.keyTasks}</p>
                                <ul className="list-disc pl-5 text-xs">
                                  {request.keyTasks.map((item, index) => (
                                    <li key={index}>{item}</li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                  <p className="text-xs font-medium text-default-600">{t.qualifications}</p>
                                  <ul className="list-disc pl-5 text-xs">
                                    {request.qualifications.map((item, index) => (
                                      <li key={index}>{item}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="text-xs font-medium text-default-600">{t.skills}</p>
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
                        <p className="text-sm text-default-700">{t.noWorkforceRequestsAvailable}</p>
                        <Button
                          size="sm"
                          variant="light"
                          color="primary"
                          className="mt-2"
                          startContent={<Icon icon="lucide:external-link" width={14} />}
                        >
                          {t.goToWorkforcePlanning}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Input
            label={t.jobTitle}
            placeholder={t.enterJobTitle}
            value={formData.title}
            onValueChange={(value) => handleInputChange("title", value)}
            isRequired
            isDisabled={isFieldDisabled("title")}
            classNames={{
              input: isFieldDisabled("title") ? "bg-default-50" : ""
            }}
          />
          
          <Select
            label={t.department}
            placeholder={t.selectDepartment}
            selectedKeys={[formData.department]}
            onSelectionChange={(keys) => handleInputChange("department", Array.from(keys)[0] as string)}
            isRequired
            isDisabled={isFieldDisabled("department")}
            classNames={{
              trigger: isFieldDisabled("department") ? "bg-default-50" : ""
            }}
          >
            {["Engineering", "Marketing", "Sales", "HR", "Finance", "Design", "Operations", "Product", "Legal", "Customer Support"].map((dept) => (
              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
            ))}
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            label={t.location}
            placeholder={t.selectLocation}
            selectedKeys={[formData.location]}
            onSelectionChange={(keys) => handleInputChange("location", Array.from(keys)[0] as string)}
            isRequired
          >
            {["Remote", "New York", "San Francisco", "London", "Singapore", "Dubai", "Sydney"].map((loc) => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </Select>
          
          <Select
            label={t.jobType}
            placeholder={t.selectJobType}
            selectedKeys={[formData.type]}
            onSelectionChange={(keys) => handleInputChange("type", Array.from(keys)[0] as string)}
          >
            {["Full-time", "Part-time", "Contract", "Temporary", "Internship"].map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select
            label={t.experience}
            placeholder={t.selectExperience}
            selectedKeys={[formData.experience]}
            onSelectionChange={(keys) => handleInputChange("experience", Array.from(keys)[0] as string)}
          >
            {["Entry Level", "1-3 years", "3-5 years", "5-7 years", "7+ years", "10+ years"].map((exp) => (
              <SelectItem key={exp} value={exp}>{exp}</SelectItem>
            ))}
          </Select>
          
          <Input
            type="number"
            label={t.minSalary}
            placeholder="0"
            value={formData.salary.min.toString()}
            onValueChange={(value) => handleSalaryChange("min", value)}
            startContent={<div className="text-default-400 text-small">$</div>}
          />
          
          <Input
            type="number"
            label={t.maxSalary}
            placeholder="0"
            value={formData.salary.max.toString()}
            onValueChange={(value) => handleSalaryChange("max", value)}
            startContent={<div className="text-default-400 text-small">$</div>}
          />
        </div>
        
        <Textarea
          label={t.jobDescription}
          placeholder={t.enterJobDescription}
          value={formData.description}
          onValueChange={(value) => handleInputChange("description", value)}
          minRows={5}
          isRequired
          isDisabled={isFieldDisabled("description")}
          classNames={{
            input: isFieldDisabled("description") ? "bg-default-50" : ""
          }}
        />
        
        <Divider />
        
        <div>
          <h3 className="text-md font-medium mb-2">{t.requirements}</h3>
          <div className="flex items-end gap-2 mb-2">
            <Input
              className="flex-1"
              placeholder={t.enterRequirement}
              value={newRequirement}
              onValueChange={setNewRequirement}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addRequirement();
                }
              }}
            />
            <Button color="primary" isIconOnly onPress={addRequirement}>
              <Icon icon="lucide:plus" width={16} />
            </Button>
          </div>
          
          <div className="space-y-1 mb-4">
            {formData.requirements.map((req: string, index: number) => (
              <div key={index} className="flex items-center gap-2 bg-default-50 rounded-md p-2">
                <div className="w-6 h-6 bg-default-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                  {index + 1}
                </div>
                <p className="text-sm flex-1">{req}</p>
                <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => removeRequirement(req)}>
                  <Icon icon="lucide:x" width={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">{t.responsibilities}</h3>
          <div className="flex items-end gap-2 mb-2">
            <Input
              className="flex-1"
              placeholder={t.enterResponsibility}
              value={newResponsibility}
              onValueChange={setNewResponsibility}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addResponsibility();
                }
              }}
            />
            <Button color="primary" isIconOnly onPress={addResponsibility}>
              <Icon icon="lucide:plus" width={16} />
            </Button>
          </div>
          
          <div className="space-y-1 mb-4">
            {formData.responsibilities.map((resp: string, index: number) => (
              <div key={index} className="flex items-center gap-2 bg-default-50 rounded-md p-2">
                <div className="w-6 h-6 bg-default-200 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-medium">
                  {index + 1}
                </div>
                <p className="text-sm flex-1">{resp}</p>
                <Button isIconOnly size="sm" variant="light" color="danger" onPress={() => removeResponsibility(resp)}>
                  <Icon icon="lucide:x" width={14} />
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-2">{t.skills}</h3>
          <div className="flex items-end gap-2 mb-2">
            <Input
              className="flex-1"
              placeholder={t.enterSkill}
              value={newSkill}
              onValueChange={setNewSkill}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addSkill();
                }
              }}
            />
            <Button color="primary" isIconOnly onPress={addSkill}>
              <Icon icon="lucide:plus" width={16} />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.skills.map((skill: string, index: number) => (
              <Chip 
                key={index} 
                onClose={() => removeSkill(skill)}
                color="primary"
                variant="flat"
              >
                {skill}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      
      <Card className="mt-6 bg-default-50 shadow-sm">
        <CardBody className="p-4">
          <h3 className="font-medium mb-2">{t.workflowOptions}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <Button 
              className={`flex-col h-auto py-3 justify-start items-start ${workflowType === 'approval' ? 'border-2 border-primary bg-primary-50' : ''}`}
              variant="flat"
              onPress={() => onWorkflowChange("approval")}
              fullWidth
            >
              <div className="flex items-center w-full">
                <Icon icon="lucide:check-circle" className="mr-2 text-primary" width={20} />
                <span className="font-medium">{t.requestApproval}</span>
              </div>
              <p className="text-xs text-default-500 text-left mt-1">
                {t.requestApprovalDescription}
              </p>
            </Button>
            
            <Button 
              className={`flex-col h-auto py-3 justify-start items-start ${workflowType === 'draft' ? 'border-2 border-primary bg-primary-50' : ''}`}
              variant="flat"
              onPress={() => onWorkflowChange("draft")}
              fullWidth
            >
              <div className="flex items-center w-full">
                <Icon icon="lucide:save" className="mr-2 text-default-600" width={20} />
                <span className="font-medium">{t.saveAsDraft}</span>
              </div>
              <p className="text-xs text-default-500 text-left mt-1">
                {t.saveAsDraftDescription}
              </p>
            </Button>
            
            <Button 
              className={`flex-col h-auto py-3 justify-start items-start ${workflowType === 'publish' ? 'border-2 border-primary bg-primary-50' : ''}`}
              variant="flat"
              onPress={() => onWorkflowChange("publish")}
              fullWidth
            >
              <div className="flex items-center w-full">
                <Icon icon="lucide:upload-cloud" className="mr-2 text-default-600" width={20} />
                <span className="font-medium">{t.publishNow}</span>
              </div>
              <p className="text-xs text-default-500 text-left mt-1">
                {t.publishNowDescription}
              </p>
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};