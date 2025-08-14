import React from "react";
import { Card, CardBody, Avatar, Button, User } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

const recentActivities = [
  { 
    id: "1", 
    action: "published", 
    jobTitle: "Senior Frontend Developer", 
    user: "Sarah Lee", 
    userId: "4",
    time: "2 hours ago",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4"
  },
  { 
    id: "2", 
    action: "created", 
    jobTitle: "Marketing Specialist", 
    user: "John Doe",
    userId: "1",
    time: "1 day ago",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
  },
  { 
    id: "3", 
    action: "approved", 
    jobTitle: "HR Coordinator", 
    user: "Michael Brown",
    userId: "3",
    time: "3 days ago",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3"
  },
  { 
    id: "4", 
    action: "rejected", 
    jobTitle: "Product Manager", 
    user: "David Wilson",
    userId: "5",
    time: "5 days ago",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5"
  }
];

export const RecentActivities: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  const getActionDetails = (action: string) => {
    switch(action) {
      case "published":
        return {
          icon: "lucide:upload-cloud",
          color: "text-success-500",
          bgColor: "bg-success-50",
          borderColor: "border-success-200"
        };
      case "created":
        return {
          icon: "lucide:file-plus",
          color: "text-primary-500",
          bgColor: "bg-primary-50",
          borderColor: "border-primary-200"
        };
      case "approved":
        return {
          icon: "lucide:check-circle",
          color: "text-warning-500",
          bgColor: "bg-warning-50",
          borderColor: "border-warning-200"
        };
      case "rejected":
        return {
          icon: "lucide:x-circle",
          color: "text-danger-500",
          bgColor: "bg-danger-50",
          borderColor: "border-danger-200"
        };
      default:
        return {
          icon: "lucide:activity",
          color: "text-default-500",
          bgColor: "bg-default-50",
          borderColor: "border-default-200"
        };
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-grow shadow-sm border border-default-200">
        <CardBody className="p-0">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-base font-medium flex items-center gap-2">
              <Icon icon="lucide:activity" className="text-primary" width={18} />
              <span>{t.recentActivities}</span>
            </h3>
            <Button size="sm" variant="light" isIconOnly>
              <Icon icon="lucide:more-horizontal" width={16} />
            </Button>
          </div>
          
          <div className="flex flex-col divide-y">
            {recentActivities.map((activity) => {
              const actionDetails = getActionDetails(activity.action);
              
              return (
                <div 
                  key={activity.id} 
                  className={`p-3 hover:bg-default-50 transition-colors duration-200 cursor-pointer flex items-start gap-3`}
                >
                  <div className={`p-1.5 rounded-full ${actionDetails.bgColor} flex-shrink-0`}>
                    <Icon icon={actionDetails.icon} className={actionDetails.color} width={14} />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between">
                      <p className="font-medium text-sm truncate">{activity.jobTitle}</p>
                      <span className="text-xs text-default-400 whitespace-nowrap ml-2 flex-shrink-0">{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-1 flex-wrap">
                      <span className="text-xs font-medium text-default-700">
                        {t[activity.action as keyof typeof t]}
                      </span>
                      <span className="text-xs text-default-400">by</span>
                      <span className="text-xs font-medium text-default-600">{activity.user}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* More activities placeholder */}
            <div className="p-3 text-center">
              <Button 
                size="sm" 
                variant="flat" 
                color="primary"
                className="w-full"
                endContent={<Icon icon="lucide:chevrons-down" width={14} />}
              >
                {t.viewAll}
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};