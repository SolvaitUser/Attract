import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader, Chip, Tabs, Tab } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

interface AIResultPreviewProps {
  data: any;
  onAccept: () => void;
  onEdit: () => void;
  onBack: () => void;
  isProcessing?: boolean;
}

export const AIResultPreview: React.FC<AIResultPreviewProps> = ({ 
  data, 
  onAccept,
  onEdit,
  onBack,
  isProcessing = false
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState("overview");
  
  if (!data) return null;
  
  return (
    <div className="space-y-4 flex flex-col h-full">
      <div className="bg-success-50 border border-success-100 rounded-lg p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-success-100 text-success rounded-full flex items-center justify-center flex-shrink-0">
          <Icon icon="lucide:check-circle" width={20} />
        </div>
        <div>
          <h3 className="font-medium text-success-700">{t.aiJobGenerated}</h3>
          <p className="text-sm text-success-600">{t.aiJobReviewInstructions}</p>
        </div>
      </div>
      
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
          key="overview" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:info" width={16} />
              <span>{t.overview}</span>
            </div>
          }
        >
          <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{data.title}</h3>
                <div className="flex items-center gap-2 text-sm text-default-600">
                  <span>{data.department}</span>
                  <span className="text-default-400">•</span>
                  <span>{data.location}</span>
                  <span className="text-default-400">•</span>
                  <span>{data.type}</span>
                </div>
              </div>
              
              <Card shadow="sm">
                <CardBody>
                  <h4 className="font-medium mb-2">{t.jobDescription}</h4>
                  <p className="text-default-700 text-sm">{data.description}</p>
                </CardBody>
              </Card>
              
              <div className="flex flex-wrap gap-2">
                <InfoBadge icon="lucide:briefcase" label={t.experience} value={data.experience} />
                <InfoBadge 
                  icon="lucide:currency-dollar" 
                  label={t.salaryRange} 
                  value={`${data.salary.min.toLocaleString()} - ${data.salary.max.toLocaleString()} ${data.salary.currency}`} 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Card shadow="sm" className="bg-default-50">
                <CardHeader className="pb-0">
                  <h4 className="font-medium">{t.keyQualifications}</h4>
                </CardHeader>
                <CardBody>
                  <ul className="list-disc list-inside text-sm space-y-1 text-default-700">
                    {data.requirements.slice(0, 3).map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
              
              <div className="bg-primary-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">{t.keySkills}</h4>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill: string, index: number) => (
                    <Chip key={index} size="sm" color="primary" variant="flat">{skill}</Chip>
                  ))}
                </div>
              </div>
              
              <Card shadow="sm" className="bg-default-50">
                <CardHeader className="pb-0">
                  <h4 className="font-medium">{t.keyResponsibilities}</h4>
                </CardHeader>
                <CardBody>
                  <ul className="list-disc list-inside text-sm space-y-1 text-default-700">
                    {data.responsibilities.slice(0, 3).map((resp: string, index: number) => (
                      <li key={index}>{resp}</li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            </div>
          </div>
        </Tab>
        
        <Tab 
          key="details" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:file-text" width={16} />
              <span>{t.fullJobDetails}</span>
            </div>
          }
        >
          <div className="pt-4 space-y-6">
            <div>
              <h3 className="text-xl font-semibold">{data.title}</h3>
              <div className="flex items-center gap-2 text-sm text-default-600 mb-4">
                <span>{data.department}</span>
                <span className="text-default-400">•</span>
                <span>{data.location}</span>
                <span className="text-default-400">•</span>
                <span>{data.type}</span>
              </div>
              
              <Card shadow="sm" className="mb-6">
                <CardBody>
                  <h4 className="font-medium mb-2">{t.jobDescription}</h4>
                  <p className="text-default-700 text-sm whitespace-pre-wrap">{data.description}</p>
                </CardBody>
              </Card>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">{t.requirements}</h4>
              <ul className="list-disc list-inside text-sm space-y-2 text-default-700 ml-1">
                {data.requirements.map((req: string, index: number) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">{t.responsibilities}</h4>
              <ul className="list-disc list-inside text-sm space-y-2 text-default-700 ml-1">
                {data.responsibilities.map((resp: string, index: number) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">{t.skills}</h4>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill: string, index: number) => (
                  <Chip key={index} color="primary" variant="flat" className="py-1">{skill}</Chip>
                ))}
              </div>
            </div>
          </div>
        </Tab>
        
        <Tab 
          key="stages" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:git-branch" width={16} />
              <span>{t.suggestedRecruitmentStages}</span>
            </div>
          }
        >
          <div className="pt-4">
            <Card shadow="sm" className="mb-4 bg-default-50">
              <CardHeader className="pb-0">
                <h4 className="font-medium">{t.suggestedRecruitmentProcess}</h4>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {data.recommendedStages ? (
                    data.recommendedStages.map((stage, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-medium flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{stage.name}</h4>
                          <p className="text-xs text-default-600 mt-1">{stage.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="space-y-4 py-2">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-medium flex-shrink-0">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{t.applicationReview}</h4>
                          <p className="text-xs text-default-600 mt-1">{t.applicationReviewDescription}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-medium flex-shrink-0">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{t.phoneScreening}</h4>
                          <p className="text-xs text-default-600 mt-1">{t.phoneScreeningDescription}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-medium flex-shrink-0">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{t.technicalAssessment}</h4>
                          <p className="text-xs text-default-600 mt-1">{t.technicalAssessmentDescription}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-medium flex-shrink-0">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium text-sm">{t.finalInterview}</h4>
                          <p className="text-xs text-default-600 mt-1">{t.finalInterviewDescription}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
                
            <p className="text-sm text-default-600">
              {t.recruitmentStagesCustomizationNote}
            </p>
          </div>
        </Tab>
      </Tabs>
      
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t">
        <Button 
          variant="flat" 
          color="primary"
          startContent={<Icon icon="lucide:edit-3" width={16} />}
          onPress={onEdit}
          className="flex-1 sm:flex-none"
          isDisabled={isProcessing}
        >
          {t.editBeforeUse}
        </Button>
        <Button 
          color="primary"
          startContent={<Icon icon="lucide:check" width={16} />}
          onPress={onAccept}
          className="flex-1 sm:flex-none"
          isLoading={isProcessing}
        >
          {t.useAsIs}
        </Button>
      </div>
    </div>
  );
};

const InfoBadge: React.FC<{icon: string; label: string; value: string}> = ({icon, label, value}) => (
  <div className="bg-default-100 px-3 py-1.5 rounded-lg flex items-center gap-2">
    <Icon icon={icon} className="text-default-600" width={14} />
    <div>
      <p className="text-xs text-default-500">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  </div>
);