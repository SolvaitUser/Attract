import React from "react";
import { format } from "date-fns";
import { Button, Badge, Chip, Avatar, AvatarGroup, Tooltip, Card, CardBody, CardFooter, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../context/LanguageContext";
import { useInterviewContext } from "../../context/InterviewContext";
import { motion } from "framer-motion";
import EmptyState from "../common/EmptyState";

interface UpcomingInterviewsProps {
  filter?: string;
}

const UpcomingInterviews: React.FC<UpcomingInterviewsProps> = ({ filter = "all" }) => {
  const { language } = useLanguage();
  const { interviews, openInterviewDetails, openFeedbackForm } = useInterviewContext();

  // Filter interviews based on the selected filter
  const filteredInterviews = React.useMemo(() => {
    if (filter === "all") return interviews;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);
    
    return interviews.filter(interview => {
      const interviewDate = new Date(interview.date);
      
      if (filter === "today") {
        return (
          interviewDate.getDate() === today.getDate() &&
          interviewDate.getMonth() === today.getMonth() &&
          interviewDate.getFullYear() === today.getFullYear()
        );
      }
      
      if (filter === "week") {
        return interviewDate >= today && interviewDate < nextWeek;
      }
      
      return true;
    });
  }, [interviews, filter]);

  if (filteredInterviews.length === 0) {
    return (
      <EmptyState 
        icon="lucide:calendar"
        title={language === "en" ? "No interviews scheduled" : "لا توجد مقابلات مجدولة"}
        description={language === "en" 
          ? "There are no upcoming interviews matching your filter." 
          : "لا توجد مقابلات قادمة تطابق المرشح الخاص بك."}
      />
    );
  }

  return (
    <div className="divide-y">
      {filteredInterviews.map((interview, index) => (
        <InterviewCard
          key={interview.id}
          interview={interview}
          onViewDetails={() => openInterviewDetails(interview.id)}
          onSubmitFeedback={() => openFeedbackForm(interview.id)}
          index={index}
        />
      ))}
    </div>
  );
};

interface InterviewCardProps {
  interview: Interview;
  onViewDetails: () => void;
  onSubmitFeedback: () => void;
  index: number;
}

const InterviewCard: React.FC<InterviewCardProps> = ({ interview, onViewDetails, onSubmitFeedback, index }) => {
  const { language } = useLanguage();
  
  const formattedDate = format(new Date(interview.date), "MMM d, yyyy");
  const formattedTime = format(new Date(interview.date), "h:mm a");

  const isUpcoming = new Date(interview.date) > new Date();
  
  // Animation for card appearance
  const cardMotion = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3, delay: index * 0.05 }
  };
  
  // Status chip styling
  const getStatusChip = () => {
    switch (interview.status) {
      case "upcoming":
        return (
          <Chip 
            color="primary" 
            variant="flat" 
            size="sm"
            startContent={<Icon icon="lucide:clock" className="text-xs" />}
          >
            {language === "en" ? "Upcoming" : "قادمة"}
          </Chip>
        );
      case "in-progress":
        return (
          <Chip 
            color="warning" 
            variant="flat" 
            size="sm"
            startContent={<Icon icon="lucide:activity" className="text-xs" />}
          >
            {language === "en" ? "In Progress" : "قيد التنفيذ"}
          </Chip>
        );
      case "completed":
        return (
          <Chip 
            color="success" 
            variant="flat" 
            size="sm"
            startContent={<Icon icon="lucide:check" className="text-xs" />}
          >
            {language === "en" ? "Completed" : "مكتملة"}
          </Chip>
        );
      default:
        return null;
    }
  };

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
    <Card className="p-4 mb-4 hover:shadow-md transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <div className="flex items-center gap-3">
          <Avatar 
            name={interview.candidate.name} 
            src={interview.candidate.avatar}
            size="md" 
          />
          <div>
            <h3 className="font-medium text-gray-900">{interview.candidate.name}</h3>
            <p className="text-sm text-gray-500">{interview.jobTitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Show feedback icon if completed and has feedback */}
          {interview.status === "completed" && interview.feedback && (
            <Tooltip content={language === "en" ? "Feedback Available" : "التقييم متاح"}>
              <div className="bg-green-100 p-1 rounded-full me-2 flex items-center justify-center">
                <Icon icon="lucide:clipboard-check" className="text-green-600" />
              </div>
            </Tooltip>
          )}
          {getStatusChip()}
          <Chip size="sm" variant="flat" className="bg-gray-100">
            {interview.type}
          </Chip>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            <div className="flex items-center gap-2">
              <Icon icon="lucide:calendar" className="text-gray-500" />
              <span className="text-sm">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:clock" className="text-gray-500" />
              <span className="text-sm">{formattedTime} ({interview.duration} min)</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon={getPlatformIcon()} className="text-gray-500" />
              <span className="text-sm">{interview.platform}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon icon="lucide:users" className="text-gray-500" />
              <AvatarGroup max={3} size="sm" className="gap-1">
                {interview.interviewers.map((interviewer, i) => (
                  <Tooltip key={i} content={interviewer.name}>
                    <Avatar 
                      name={interviewer.name} 
                      src={interviewer.avatar} 
                      className="w-6 h-6"
                    />
                  </Tooltip>
                ))}
              </AvatarGroup>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 self-end md:self-center">
          <Button 
            size="sm" 
            variant="flat"
            color="primary"
            onPress={onViewDetails}
            startContent={<Icon icon="lucide:eye" size={16} />}
          >
            {language === "en" ? "View" : "عرض"}
          </Button>
          
          {interview.status === "upcoming" && (
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  size="sm" 
                  variant="light"
                  isIconOnly
                >
                  <Icon icon="lucide:more-vertical" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Interview actions">
                <DropdownItem 
                  key="edit" 
                  startContent={<Icon icon="lucide:edit-2" size={16} />}
                >
                  {language === "en" ? "Edit" : "تعديل"}
                </DropdownItem>
                <DropdownItem 
                  key="reschedule" 
                  startContent={<Icon icon="lucide:calendar" size={16} />}
                >
                  {language === "en" ? "Reschedule" : "إعادة جدولة"}
                </DropdownItem>
                <DropdownItem 
                  key="cancel" 
                  startContent={<Icon icon="lucide:x" size={16} />}
                  color="danger"
                >
                  {language === "en" ? "Cancel" : "إلغاء"}
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
          
          {interview.status === "completed" && !interview.feedback && (
            <Button 
              size="sm" 
              variant="solid"
              color="primary"
              onPress={onSubmitFeedback}
            >
              {language === "en" ? "Submit Feedback" : "إرسال التقييم"}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default UpcomingInterviews;