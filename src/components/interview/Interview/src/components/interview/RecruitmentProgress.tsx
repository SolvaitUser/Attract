import React from "react";
import { Card, Progress } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../context/LanguageContext";
import { motion } from "framer-motion";

const RecruitmentProgress: React.FC = () => {
  const { language } = useLanguage();

  // Define the recruitment stages
  const stages = [
    { 
      id: "applied", 
      name: { en: "Applied", ar: "تم تقديم الطلب" },
      icon: "lucide:file-text", 
      status: "completed", 
      color: "success" 
    },
    { 
      id: "screening", 
      name: { en: "Screening", ar: "تصفية المرشحين" },
      icon: "lucide:list-checks", 
      status: "completed", 
      color: "success" 
    },
    { 
      id: "interview", 
      name: { en: "Interview", ar: "مقابلة" },
      icon: "lucide:calendar", 
      status: "current", 
      color: "primary" 
    },
    { 
      id: "offer", 
      name: { en: "Offer", ar: "عرض" },
      icon: "lucide:mail", 
      status: "pending", 
      color: "default" 
    },
    { 
      id: "onboarding", 
      name: { en: "Onboarding", ar: "التعريف" },
      icon: "lucide:check-circle", 
      status: "pending", 
      color: "default" 
    }
  ];

  // Calculate progress percentage
  const completedStages = stages.filter(s => s.status === "completed").length;
  const currentStage = stages.findIndex(s => s.status === "current");
  // Count completed + 0.5 for current stage
  const progressPercentage = 
    ((completedStages + (currentStage !== -1 ? 0.5 : 0)) / stages.length) * 100;

  return (
    <Card>
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">
          {language === "en" ? "Recruitment Progress" : "تقدم التوظيف"}
        </h2>
      </div>
      
      <div className="p-4 pb-5">
        <Progress 
          aria-label="Recruitment Progress" 
          value={progressPercentage} 
          color="primary"
          className="mb-6"
        />
        
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <motion.div 
              key={stage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3"
            >
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center
                ${getStageIconColor(stage.status)}
              `}>
                <Icon icon={stage.icon} />
              </div>
              <div>
                <p className={`font-medium ${getStageTextColor(stage.status)}`}>
                  {stage.name[language]}
                </p>
                <p className="text-xs text-gray-500">
                  {getStageStatusLabel(stage.status, language)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

// Helper functions for styling
const getStageIconColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-600";
    case "current": return "bg-blue-100 text-blue-600";
    default: return "bg-gray-100 text-gray-400";
  }
};

const getStageTextColor = (status: string) => {
  switch (status) {
    case "completed": return "text-green-600";
    case "current": return "text-blue-600";
    default: return "text-gray-400";
  }
};

const getStageStatusLabel = (status: string, language: string) => {
  switch (status) {
    case "completed": return language === "en" ? "Completed" : "مكتمل";
    case "current": return language === "en" ? "In Progress" : "قيد التقدم";
    default: return language === "en" ? "Pending" : "قيد الانتظار";
  }
};

export default RecruitmentProgress;