import React, { useState, useEffect } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab, Divider, Chip, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { JobForm } from "./JobForm";
import { RecruitmentStages } from "./RecruitmentStages";
import { ApprovalWorkflow } from "./ApprovalWorkflow";
import { PublishingOptions } from "./PublishingOptions";
import { SuccessAnimation } from "./SuccessAnimation";
import { motion } from "framer-motion";
import { mockWorkforceRequests } from "../../data/mockData";

interface EditJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: any;
  onSaved: () => void;
}

export const EditJobModal: React.FC<EditJobModalProps> = ({ isOpen, onClose, jobData, onSaved }) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("details");
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<"approval" | "draft" | "publish">("approval");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);
  
  // Add fallback for mockWorkforceRequests if it doesn't exist in the imported data
  const workforceRequests = mockWorkforceRequests || [];
  
  // Initialize form data when job data changes
  useEffect(() => {
    if (jobData) {
      // Check if this job is linked to a workforce request
      const linkedRequest = workforceRequests.find(req => req.id === jobData.linkedWorkforceRequestId);
      
      setFormData({
        ...jobData,
        // If the job was previously linked to a workforce request that no longer exists,
        // make sure we don't keep the reference
        linkedWorkforceRequestId: linkedRequest ? jobData.linkedWorkforceRequestId : null
      });
    }
  }, [jobData, workforceRequests]);

  const handleFormDataChange = (newData: any) => {
    setFormData(newData);
    setHasUnsavedChanges(true);
  };

  const handleInputChange = (field: string, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value
      });
      setHasUnsavedChanges(true);
    }
  };

  const handleWorkflowSelection = (workflow: "approval" | "draft" | "publish") => {
    setSelectedWorkflow(workflow);
  };
  
  const handleSave = () => {
    setIsLoading(true);
    setShowSuccessAnimation(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowSuccessAnimation(false);
      setIsLoading(false);
      onSaved();
      setHasUnsavedChanges(false);
      
      // In real app, you would save the updated job data here
    }, 1200);
  };
  
  const handleClose = () => {
    if (hasUnsavedChanges) {
      setShowUnsavedWarning(true);
    } else {
      onClose();
    }
  };
  
  const handleContinueClose = () => {
    setShowUnsavedWarning(false);
    onClose();
  };

  if (!jobData) return null;
  
  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={handleClose} 
      size="4xl"
      scrollBehavior="inside"
      isDismissable={!hasUnsavedChanges}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:edit" className="text-primary" width={20} />
                  <span>{t.editJobRequisition}</span>
                </div>
                <Chip 
                  size="sm" 
                  variant="flat" 
                  color={jobData?.status === "Published" ? "success" : 
                         jobData?.status === "Pending Approval" ? "warning" : 
                         jobData?.status === "Draft" ? "default" : "primary"}
                >
                  {jobData?.status || "Draft"}
                </Chip>
              </div>
              <div className="mt-2 mb-1">
                <h3 className="text-lg font-semibold">{jobData.title}</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-small text-default-500">
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:briefcase" width={14} />
                    <span>{jobData.department}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:map-pin" width={14} />
                    <span>{jobData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:clock" width={14} />
                    <span>{new Date(jobData.createdAt).toLocaleDateString()}</span>
                  </div>
                  {jobData.type && (
                    <div className="flex items-center gap-1">
                      <Icon icon="lucide:tag" width={14} />
                      <span>{jobData.type}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center gap-2">
                  <Avatar 
                    src={`https://img.heroui.chat/image/avatar?w=80&h=80&u=${jobData.createdBy || 1}`} 
                    size="sm" 
                    className="border border-default-200" 
                  />
                  <div className="text-xs">
                    <p className="text-default-600">{t.createdBy || "Created by"}</p>
                    <p className="font-medium">{jobData.createdByName || "Sarah Johnson"}</p>
                  </div>
                </div>
                {jobData.hasLinkedWorkforceRequest && (
                  <Chip 
                    size="sm" 
                    variant="flat" 
                    color="primary"
                    startContent={<Icon icon="lucide:link" width={14} />}
                  >
                    {t.linkedToWorkforceRequest || "Workforce Request Linked"}
                  </Chip>
                )}
              </div>
            </ModalHeader>
            
            <Divider />
            
            <ModalBody>
              {/* Success animation overlay */}
              {showSuccessAnimation && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-b-lg">
                  <SuccessAnimation />
                </div>
              )}
              
              {/* Main content */}
              <div className="py-2">
                {showUnsavedWarning ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-8 text-center"
                  >
                    <div className="w-16 h-16 bg-warning-100 rounded-full mx-auto flex items-center justify-center mb-4">
                      <Icon icon="lucide:alert-triangle" className="text-warning" width={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{t.unsavedChanges}</h3>
                    <p className="text-default-600 mb-6">{t.unsavedChangesMessage}</p>
                    <div className="flex gap-2 justify-center">
                      <Button 
                        variant="flat" 
                        onPress={() => setShowUnsavedWarning(false)}
                      >
                        {t.continueEditing}
                      </Button>
                      <Button 
                        color="danger" 
                        variant="flat"
                        onPress={handleContinueClose}
                      >
                        {t.discardChanges}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <Tabs 
                    selectedKey={activeTab}
                    onSelectionChange={(key) => setActiveTab(key as string)}
                    variant="underlined"
                    color="primary"
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
                      <JobForm 
                        initialData={formData} 
                        onChange={handleFormDataChange}
                        workflowType={selectedWorkflow}
                        onWorkflowChange={handleWorkflowSelection}
                      />
                    </Tab>
                    
                    <Tab
                      key="stages"
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:git-branch" width={16} />
                          <span className="text-foreground">{t.recruitmentStages || "Recruitment Stages"}</span>
                        </div>
                      }
                    >
                      <RecruitmentStages 
                        initialStages={formData?.recruitmentStages || []} 
                        onChange={(stages) => handleInputChange("recruitmentStages", stages)} 
                      />
                    </Tab>
                    
                    <Tab
                      key="approval"
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:check-circle" width={16} />
                          <span>{t.approvalWorkflow}</span>
                        </div>
                      }
                    >
                      <ApprovalWorkflow />
                    </Tab>
                    
                    <Tab
                      key="publishing"
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:globe" width={16} />
                          <span>{t.publishing}</span>
                        </div>
                      }
                    >
                      <PublishingOptions />
                    </Tab>
                    
                    <Tab
                      key="history"
                      title={
                        <div className="flex items-center gap-2">
                          <Icon icon="lucide:history" width={16} />
                          <span>{t.history}</span>
                        </div>
                      }
                    >
                      <div className="pt-4 space-y-4">
                        <div className="p-4 bg-default-50 rounded-lg">
                          <h3 className="font-medium mb-2">{t.jobRequisitionHistory}</h3>
                          <p className="text-sm text-default-600">{t.jobRequisitionHistoryDescription}</p>
                        </div>
                        
                        <div className="space-y-4 max-w-2xl mx-auto">
                          <div className="relative">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                                <Icon icon="lucide:file-plus" width={20} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium">{t.created}</p>
                                    <p className="text-xs text-default-500">by Sarah Lee • HR Specialist</p>
                                  </div>
                                  <p className="text-xs text-default-400">
                                    {new Date(jobData.createdAt).toLocaleDateString()} · 
                                    {new Date(jobData.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </p>
                                </div>
                                <div className="bg-default-50 mt-2 p-3 rounded-lg">
                                  <p className="text-xs">{t.initialVersionCreated}</p>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-10 bottom-0 left-5 w-[1px] bg-default-200"></div>
                          </div>
                          
                          <div className="relative">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-warning-100 flex items-center justify-center text-warning">
                                <Icon icon="lucide:edit" width={20} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium">{t.edited}</p>
                                    <p className="text-xs text-default-500">by David Wilson • HR Director</p>
                                  </div>
                                  <p className="text-xs text-default-400">
                                    {new Date(jobData.updatedAt).toLocaleDateString()} · 
                                    {new Date(jobData.updatedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                  </p>
                                </div>
                                <div className="bg-default-50 mt-2 p-3 rounded-lg">
                                  <p className="text-xs">{t.salaryRangeUpdated}</p>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-10 bottom-0 left-5 w-[1px] bg-default-200"></div>
                          </div>
                          
                          <div className="relative">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-full bg-success-100 flex items-center justify-center text-success">
                                <Icon icon="lucide:check-circle" width={20} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium">{t.approved}</p>
                                    <p className="text-xs text-default-500">by Michael Brown • CEO</p>
                                  </div>
                                  <p className="text-xs text-default-400">
                                    3 days ago · 10:45 AM
                                  </p>
                                </div>
                                <div className="bg-default-50 mt-2 p-3 rounded-lg">
                                  <p className="text-xs">{t.jobRequisitionApproved}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                )}
              </div>
            </ModalBody>
            
            <Divider />
            
            <ModalFooter>
              {showUnsavedWarning ? (
                <div className="w-full flex justify-between">
                  <Button 
                    color="primary" 
                    onPress={() => {
                      setShowUnsavedWarning(false);
                      handleSave();
                    }}
                    isLoading={isLoading}
                  >
                    {t.saveChanges}
                  </Button>
                </div>
              ) : (
                <div className="w-full flex justify-between">
                  <Button
                    variant="flat"
                    color="danger"
                    startContent={<Icon icon="lucide:trash-2" width={16} />}
                  >
                    {t.delete}
                  </Button>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="flat" 
                      onPress={handleClose}
                      isDisabled={isLoading}
                    >
                      {t.cancel}
                    </Button>
                    <Button 
                      color="primary" 
                      onPress={handleSave}
                      isLoading={isLoading}
                      startContent={<Icon icon="lucide:save" width={16} />}
                      isDisabled={!hasUnsavedChanges}
                    >
                      {t.save}
                    </Button>
                  </div>
                </div>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};