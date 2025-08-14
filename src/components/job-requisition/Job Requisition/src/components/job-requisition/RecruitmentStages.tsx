import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Checkbox, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { motion, AnimatePresence } from "framer-motion";
import { recruitmentStageTemplates } from "../../data/recruitmentStageTemplates";

interface StageConfig {
  id: string;
  name: string;
  isRequired: boolean;
  description: string;
  estimatedDays: number;
}

interface RecruitmentStagesProps {
  initialStages?: StageConfig[];
  onChange: (stages: StageConfig[]) => void;
}

export const RecruitmentStages: React.FC<RecruitmentStagesProps> = ({ 
  initialStages = [],
  onChange 
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Add default values for stage properties to prevent missing text
  const defaultStages = [
    { 
      id: "1", 
      name: t.applicationReview || "Application Review", 
      isRequired: true, 
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
  
  const [stages, setStages] = useState<StageConfig[]>(
    initialStages.length > 0 ? initialStages : defaultStages
  );
  const [editingStage, setEditingStage] = useState<string | null>(null);
  const [stageName, setStageName] = useState("");
  const [stageDescription, setStageDescription] = useState("");
  const [estimatedDays, setEstimatedDays] = useState(3);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [jobType, setJobType] = useState<string | null>(null);

  // Helper function to ensure text values are not undefined
  const ensureText = (text: string | undefined, fallback: string): string => {
    return text || fallback;
  };

  const handleUpdateStage = (id: string, data: Partial<StageConfig>) => {
    const updatedStages = stages.map(stage => 
      stage.id === id ? { ...stage, ...data } : stage
    );
    setStages(updatedStages);
    onChange(updatedStages);
  };

  const handleMoveStage = (id: string, direction: 'up' | 'down') => {
    const stageIndex = stages.findIndex(stage => stage.id === id);
    if (
      (direction === 'up' && stageIndex === 0) || 
      (direction === 'down' && stageIndex === stages.length - 1)
    ) return;
    
    const newStages = [...stages];
    const offset = direction === 'up' ? -1 : 1;
    [newStages[stageIndex], newStages[stageIndex + offset]] = 
      [newStages[stageIndex + offset], newStages[stageIndex]];
    
    setStages(newStages);
    onChange(newStages);
  };

  const handleDeleteStage = (id: string) => {
    const updatedStages = stages.filter(stage => stage.id !== id);
    setStages(updatedStages);
    onChange(updatedStages);
  };

  const handleAddStage = () => {
    const newStage: StageConfig = {
      id: String(Date.now()),
      name: t.newStage,
      isRequired: true,
      description: t.newStageDescription,
      estimatedDays: 3
    };
    
    const newStages = [...stages, newStage];
    setStages(newStages);
    onChange(newStages);
    setEditingStage(newStage.id);
    setStageName(newStage.name);
    setStageDescription(newStage.description);
    setEstimatedDays(newStage.estimatedDays);
  };

  const handleStartEdit = (stage: StageConfig) => {
    setEditingStage(stage.id);
    setStageName(stage.name);
    setStageDescription(stage.description);
    setEstimatedDays(stage.estimatedDays);
  };

  const handleSaveEdit = () => {
    if (!editingStage) return;
    
    const updatedStages = stages.map(stage => 
      stage.id === editingStage 
        ? { ...stage, name: stageName, description: stageDescription, estimatedDays } 
        : stage
    );
    
    setStages(updatedStages);
    onChange(updatedStages);
    setEditingStage(null);
  };

  const handleCancelEdit = () => {
    setEditingStage(null);
  };

  const handleAddPredefinedStage = (stageName: string) => {
    const predefinedStages: Record<string, Omit<StageConfig, 'id'>> = {
      technicalAssessment: {
        name: ensureText(t.technicalAssessment, "Technical Assessment"),
        isRequired: false,
        description: ensureText(t.technicalAssessmentDescription, "Evaluate technical skills through tests or practical assignments."),
        estimatedDays: 7
      },
      groupInterview: {
        name: ensureText(t.groupInterview, "Group Interview"),
        isRequired: false,
        description: ensureText(t.groupInterviewDescription, "Interview with multiple team members at once to assess team fit."),
        estimatedDays: 4
      },
      caseStudy: {
        name: ensureText(t.caseStudy, "Case Study"),
        isRequired: false,
        description: ensureText(t.caseStudyDescription, "Practical assessment where candidates solve a real-world problem."),
        estimatedDays: 5
      },
      backgroundCheck: {
        name: ensureText(t.backgroundCheck, "Background Check"),
        isRequired: true,
        description: ensureText(t.backgroundCheckDescription, "Verify candidate's background, references, and credentials."),
        estimatedDays: 3
      }
    };

    const stageToAdd = predefinedStages[stageName];
    if (!stageToAdd) return;

    const newStage: StageConfig = {
      id: String(Date.now()),
      ...stageToAdd
    };
    
    const newStages = [...stages, newStage];
    setStages(newStages);
    onChange(newStages);
  };

  const handleLoadTemplate = (templateType: string) => {
    if (recruitmentStageTemplates[templateType]) {
      // Create a copy of the template with unique IDs
      const templateWithIds = recruitmentStageTemplates[templateType].map(stage => ({
        ...stage,
        id: String(Date.now() + Math.floor(Math.random() * 1000))
      }));
      
      setStages(templateWithIds);
      onChange(templateWithIds);
      setJobType(templateType);
      setShowTemplateDropdown(false);
    }
  };

  const handleClearAll = () => {
    if (stages.length > 0) {
      if (confirm(t.confirmClearStages)) {
        setStages([]);
        onChange([]);
        setJobType(null);
      }
    }
  };

  // Calculate total time
  const totalEstimatedDays = stages.reduce((sum, stage) => sum + stage.estimatedDays, 0);

  // Make sure onChange is called when the component initializes
  React.useEffect(() => {
    if (initialStages.length === 0 && stages.length > 0) {
      onChange(stages);
    }
  }, []);

  return (
    <div className="space-y-6 pt-4">
      <div className="p-4 bg-default-50 rounded-lg flex gap-4 items-center">
        <div className="w-12 h-12 bg-primary-100 text-primary rounded-full flex items-center justify-center">
          <Icon icon="lucide:git-branch" width={24} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{ensureText(t.recruitmentStages, "Recruitment Stages")}</h3>
          <p className="text-sm text-default-600">{ensureText(t.recruitmentStagesDescription, "Configure the stages that candidates will go through during the recruitment process for this job.")}</p>
        </div>
        <Tooltip content={ensureText(t.totalHiringTime, "Total estimated hiring time")}>
          <div className="flex items-center gap-2 px-4 py-2 bg-default-100 rounded-lg">
            <Icon icon="lucide:clock" width={18} className="text-default-600" />
            <div>
              <span className="text-sm font-medium">{totalEstimatedDays} {ensureText(t.days, "days")}</span>
            </div>
          </div>
        </Tooltip>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2">
        <h3 className="font-semibold text-foreground">{ensureText(t.configureRecruitmentStages, "Configure Recruitment Stages")}</h3>
        
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {/* Add Template Management Button Group */}
          <div className="relative inline-block">
            <Button 
              variant="flat" 
              color="primary" 
              startContent={<Icon icon="lucide:layout-template" width={16} />}
              endContent={<Icon icon="lucide:chevron-down" width={16} />}
              onPress={() => setShowTemplateDropdown(!showTemplateDropdown)}
              className="min-w-[180px]"
            >
              {jobType ? t.templateTypeNames[jobType] : t.loadTemplate}
            </Button>
            
            {showTemplateDropdown && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-default-200">
                <div className="py-2">
                  <div className="px-4 py-2 text-xs font-semibold text-default-500 uppercase">{t.selectTemplate}</div>
                  {Object.keys(recruitmentStageTemplates).map(templateType => (
                    <button 
                      key={templateType} 
                      className="w-full text-left px-4 py-3 text-sm hover:bg-default-100 flex items-center gap-3"
                      onClick={() => handleLoadTemplate(templateType)}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                        ${templateType === "technical" ? "bg-blue-50 text-blue-600" : 
                        templateType === "executive" ? "bg-purple-50 text-purple-600" :
                        templateType === "sales" ? "bg-green-50 text-green-600" :
                        templateType === "creative" ? "bg-amber-50 text-amber-600" : "bg-primary-50 text-primary"}`}
                      >
                        <Icon 
                          icon={
                            templateType === "technical" ? "lucide:code" : 
                            templateType === "executive" ? "lucide:briefcase" :
                            templateType === "sales" ? "lucide:trending-up" :
                            templateType === "creative" ? "lucide:palette" : "lucide:users"
                          } 
                          width={18} 
                        />
                      </div>
                      <div>
                        <p className="font-medium">{t.templateTypeNames[templateType]}</p>
                        <p className="text-xs text-default-500">
                          {templateType === "technical" ? t.technicalTemplateDesc : 
                           templateType === "executive" ? t.executiveTemplateDesc :
                           templateType === "sales" ? t.salesTemplateDesc :
                           templateType === "creative" ? t.creativeTemplateDesc : t.generalTemplateDesc}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat" 
                startContent={<Icon icon="lucide:plus" width={16} />}
                endContent={<Icon icon="lucide:chevron-down" width={16} />}
                className="min-w-[140px]"
              >
                {t.addStage || "Add Stage"}
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Add Stage Options">
              <DropdownItem key="new" onPress={handleAddStage}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:plus" width={16} />
                  <span>{t.customStage || "Custom Stage"}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="technicalAssessment" onPress={() => handleAddPredefinedStage("technicalAssessment")}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:code" width={16} />
                  <span>{t.technicalAssessment || "Technical Assessment"}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="groupInterview" onPress={() => handleAddPredefinedStage("groupInterview")}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:users" width={16} />
                  <span>{t.groupInterview || "Group Interview"}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="caseStudy" onPress={() => handleAddPredefinedStage("caseStudy")}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:clipboard" width={16} />
                  <span>{t.caseStudy || "Case Study"}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="backgroundCheck" onPress={() => handleAddPredefinedStage("backgroundCheck")}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:shield-check" width={16} />
                  <span>{t.backgroundCheck || "Background Check"}</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          
          {stages.length > 0 && (
            <Button 
              variant="flat" 
              color="danger" 
              startContent={<Icon icon="lucide:trash-2" width={16} />}
              onPress={handleClearAll}
              isDisabled={stages.length === 0}
            >
              {t.clearAll}
            </Button>
          )}
        </div>
      </div>
      
      {/* Template info banner - show when a template is loaded */}
      {jobType && (
        <div className="bg-primary-50 p-3 rounded-lg border border-primary-100 mb-4 flex items-start gap-2">
          <Icon icon="lucide:info" className="text-primary mt-0.5" width={16} />
          <div>
            <p className="text-sm text-primary-700 font-medium">{t.templateLoaded}: {t.templateTypeNames[jobType]}</p>
            <p className="text-xs text-primary-600">{t.templateLoadedDescription}</p>
          </div>
        </div>
      )}
      
      {/* Stage list container - add animation and empty state */}
      <div className="space-y-3">
        <AnimatePresence>
          {stages.map((stage, index) => (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Card 
                className={`${editingStage === stage.id ? 'border-primary border-2' : 'border border-default-200'} shadow-sm`}
              >
                <CardBody className="p-4">
                  {editingStage === stage.id ? (
                    <div className="space-y-3">
                      <Input 
                        label={t.stageName || "Stage Name"}
                        value={stageName}
                        onValueChange={setStageName}
                        isRequired
                      />
                      <Input 
                        label={t.stageDescription || "Description"}
                        value={stageDescription}
                        onValueChange={setStageDescription}
                      />
                      <div className="flex items-center gap-2">
                        <Input 
                          type="number"
                          label={t.estimatedDays || "Estimated Days"}
                          value={estimatedDays.toString()}
                          onValueChange={(value) => setEstimatedDays(parseInt(value) || 0)}
                          min={1}
                          className="w-32"
                        />
                        <Checkbox
                          isSelected={stages.find(s => s.id === stage.id)?.isRequired}
                          onValueChange={(selected) => handleUpdateStage(stage.id, { isRequired: selected })}
                          className="mt-6"
                        >
                          <span className="text-foreground">{t.required || "Required"}</span>
                        </Checkbox>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <Button 
                          variant="flat" 
                          size="sm" 
                          onPress={handleCancelEdit}
                        >
                          {t.cancel}
                        </Button>
                        <Button 
                          color="primary" 
                          size="sm" 
                          onPress={handleSaveEdit}
                          isDisabled={stageName?.trim() === ""}
                        >
                          {t.save}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-foreground">{stage.name}</h4>
                            {stage.isRequired && (
                              <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                                {t.required || "Required"}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-default-600 mt-1">{stage.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Icon icon="lucide:clock" width={14} className="text-default-400" />
                            <span className="text-xs text-default-600">
                              {t.estimatedDuration || "Estimated duration"}: {stage.estimatedDays} {t.days || "days"}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-1">
                        <div className="flex flex-col">
                          <Button 
                            isIconOnly 
                            variant="light" 
                            size="sm" 
                            isDisabled={index === 0}
                            onPress={() => handleMoveStage(stage.id, 'up')}
                          >
                            <Icon icon="lucide:chevron-up" width={16} />
                          </Button>
                          <Button 
                            isIconOnly 
                            variant="light" 
                            size="sm" 
                            isDisabled={index === stages.length - 1}
                            onPress={() => handleMoveStage(stage.id, 'down')}
                          >
                            <Icon icon="lucide:chevron-down" width={16} />
                          </Button>
                        </div>
                        
                        <Dropdown>
                          <DropdownTrigger>
                            <Button isIconOnly variant="light" size="sm">
                              <Icon icon="lucide:more-vertical" width={16} />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Stage Actions">
                            <DropdownItem key="edit" onPress={() => handleStartEdit(stage)}>
                              <div className="flex items-center gap-2">
                                <Icon icon="lucide:edit" width={16} />
                                <span>{t.edit}</span>
                              </div>
                            </DropdownItem>
                            <DropdownItem 
                              key="toggle" 
                              onPress={() => handleUpdateStage(stage.id, { isRequired: !stage.isRequired })}
                            >
                              <div className="flex items-center gap-2">
                                {stage.isRequired ? (
                                  <>
                                    <Icon icon="lucide:toggle-right" width={16} />
                                    <span>{t.makeOptional}</span>
                                  </>
                                ) : (
                                  <>
                                    <Icon icon="lucide:toggle-left" width={16} />
                                    <span>{t.makeRequired}</span>
                                  </>
                                )}
                              </div>
                            </DropdownItem>
                            <DropdownItem 
                              key="delete" 
                              className="text-danger" 
                              color="danger" 
                              onPress={() => handleDeleteStage(stage.id)}
                            >
                              <div className="flex items-center gap-2">
                                <Icon icon="lucide:trash-2" width={16} />
                                <span>{t.delete}</span>
                              </div>
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
              
              {index < stages.length - 1 && (
                <div className="absolute left-6 top-[100%] h-[20px] w-[1px] bg-default-200"></div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        
        {stages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-10 border-2 border-dashed rounded-lg"
          >
            <Icon icon="lucide:git-branch" className="mx-auto mb-2 text-default-400" width={32} />
            <p className="text-default-500 mb-4">{t.noStagesYet}</p>
            <div className="flex flex-col items-center gap-2">
              <Button 
                color="primary" 
                variant="flat" 
                size="sm"
                onPress={() => handleLoadTemplate("general")}
                startContent={<Icon icon="lucide:layout-template" width={16} />}
                className="min-w-[200px]"
              >
                {t.useDefaultTemplate}
              </Button>
              <Button 
                color="primary" 
                variant="light" 
                size="sm"
                onPress={handleAddStage}
                startContent={<Icon icon="lucide:plus" width={16} />}
                className="min-w-[200px]"
              >
                {t.addFirstStage}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
      
      {stages.length > 0 && (
        <Card className="bg-default-50 shadow-sm border border-default-200">
          <CardBody className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon icon="lucide:info" width={16} className="text-primary" />
              <span className="font-medium text-sm">{ensureText(t.recruitmentStagesTips, "Tips for effective recruitment stages")}</span>
            </div>
            <ul className="text-xs text-default-600 space-y-1 list-disc pl-5">
              <li>{ensureText(t.recruitmentStagesTip1, "Keep your recruitment process focused and efficient to avoid losing candidates to competitors.")}</li>
              <li>{ensureText(t.recruitmentStagesTip2, "Required stages must be completed, while optional stages can be skipped if not applicable.")}</li>
              <li>{ensureText(t.recruitmentStagesTip3, "The estimated timeline helps set expectations for candidates and your team.")}</li>
            </ul>
          </CardBody>
        </Card>
      )}
    </div>
  );
};