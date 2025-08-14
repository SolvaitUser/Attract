import React from "react";
import { Card, CardBody, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

interface StageConfig {
  id: string;
  name: string;
  isRequired: boolean;
  description: string;
  estimatedDays: number;
}

interface RecruitmentStageSummaryProps {
  stages: StageConfig[];
}

export const RecruitmentStageSummary: React.FC<RecruitmentStageSummaryProps> = ({ stages }) => {
  const { language } = useLanguage();
  const t = translations[language];

  // Helper function to ensure text values are not undefined
  const ensureText = (text: string | undefined, fallback: string): string => {
    return text || fallback;
  };

  // Calculate total estimated timeline
  const totalDays = stages.reduce((total, stage) => total + stage.estimatedDays, 0);
  
  return (
    <div className="space-y-6">
      <div className="bg-default-50 p-4 rounded-lg flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary">
            <Icon icon="lucide:clock" width={20} />
          </div>
          <div>
            <h3 className="font-medium">{ensureText(t.estimatedRecruitmentTimeline, "Estimated Recruitment Timeline")}</h3>
            <p className="text-sm text-default-600">{ensureText(t.estimatedTimelineDescription, "Total time from application review to final decision")}</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-white rounded-lg shadow-sm border border-default-200">
          <span className="font-medium text-lg">{totalDays} {ensureText(t.days, "days")}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {stages.map((stage, index) => (
          <Card key={stage.id} className="border border-default-200 shadow-sm">
            <CardBody className="p-4">
              <div className="flex justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{stage.name || `Stage ${index + 1}`}</h4>
                      {stage.isRequired && (
                        <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded">
                          {ensureText(t.required, "Required")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-default-500 mt-1">{stage.description || "No description provided"}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Icon icon="lucide:clock" width={14} className="text-default-400" />
                      <span className="text-xs text-default-600">{ensureText(t.estimatedDuration, "Estimated duration")}: {stage.estimatedDays} {ensureText(t.days, "days")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      
      <Card className="bg-default-50">
        <CardBody className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary">
              <Icon icon="lucide:info" width={16} />
            </div>
            <div>
              <h3 className="font-medium mb-1">{t.recruitmentProcessInfo}</h3>
              <p className="text-sm text-default-600">{t.recruitmentProcessDescription}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};