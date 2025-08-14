import React from "react";
import { Card, Chip, Badge, Avatar, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../../context/LanguageContext";
import { Interview } from "../../../context/InterviewContext";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface KanbanColumnProps {
  title: string;
  icon: string;
  color: string;
  interviews: Interview[];
  onViewDetails: (id: string) => void;
  onSubmitFeedback: (id: string) => void;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  icon,
  color,
  interviews,
  onViewDetails,
  onSubmitFeedback
}) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-col h-full min-w-[280px] w-[280px]">
      <div className={`rounded-t-lg p-3 flex items-center justify-between ${color}`}>
        <div className="flex items-center gap-2">
          <Icon icon={icon} />
          <h3 className="font-medium">{title}</h3>
        </div>
        <Badge content={interviews.length} color="primary" size="sm" placement="top-right" />
      </div>
      
      <div className="bg-gray-50 flex-grow rounded-b-lg p-2 min-h-[500px] max-h-[calc(100vh-260px)] overflow-y-auto">
        {interviews.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            <p>{language === "en" ? "No interviews" : "لا توجد مقابلات"}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {interviews.map((interview, index) => (
              <KanbanCard
                key={interview.id}
                interview={interview}
                onViewDetails={() => onViewDetails(interview.id)}
                onSubmitFeedback={() => onSubmitFeedback(interview.id)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface KanbanCardProps {
  interview: Interview;
  onViewDetails: () => void;
  onSubmitFeedback: () => void;
  index: number;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  interview,
  onViewDetails,
  onSubmitFeedback,
  index
}) => {
  const { language } = useLanguage();
  
  const formattedDate = format(new Date(interview.date), "MMM d");
  const formattedTime = format(new Date(interview.date), "h:mm a");

  // Platform icon
  const getPlatformIcon = () => {
    switch (interview.platform.toLowerCase()) {
      case "teams":
        return "logos:microsoft-teams";
      case "zoom":
        return "logos:zoom-icon";
      case "google meet":
        return "logos:google-meet";
      default:
        return "lucide:video";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
    >
      <Card 
        className="p-4 hover:shadow-md transition-all cursor-pointer w-full"
        isPressable
        onPress={onViewDetails}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            <Avatar 
              name={interview.candidate.name} 
              src={interview.candidate.avatar}
              size="sm" 
            />
            <h4 className="font-medium text-sm">
              {interview.candidate.name}
            </h4>
          </div>
          <Chip size="sm" variant="flat" className="bg-gray-100 ml-2">
            {interview.type}
          </Chip>
        </div>
        
        <p className="text-xs text-gray-600 mb-3">
          {interview.jobTitle}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:calendar" className="text-gray-500 text-sm" />
            <span className="text-xs">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon="lucide:clock" className="text-gray-500 text-sm" />
            <span className="text-xs">{formattedTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon icon={getPlatformIcon()} className="text-gray-500 text-sm" />
            <span className="text-xs">{interview.platform}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t">
          <div className="flex -space-x-2">
            {interview.interviewers.slice(0, 3).map((interviewer, i) => (
              <Tooltip key={i} content={interviewer.name}>
                <Avatar 
                  src={interviewer.avatar}
                  name={interviewer.name} 
                  size="sm"
                  className="border-2 border-white" 
                />
              </Tooltip>
            ))}
            {interview.interviewers.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs border-2 border-white">
                +{interview.interviewers.length - 3}
              </div>
            )}
          </div>
          
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button
                isIconOnly
                size="sm"
                variant="light"
              >
                <Icon icon="lucide:more-vertical" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem 
                key="view" 
                startContent={<Icon icon="lucide:eye" />}
                onPress={onViewDetails}
              >
                {language === "en" ? "View Details" : "عرض التفاصيل"}
              </DropdownItem>
              {interview.status === "completed" && !interview.feedback && (
                <DropdownItem 
                  key="feedback" 
                  startContent={<Icon icon="lucide:message-square" />}
                  onPress={onSubmitFeedback}
                >
                  {language === "en" ? "Submit Feedback" : "إرسال التقييم"}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
      </Card>
    </motion.div>
  );
};

export default KanbanColumn;