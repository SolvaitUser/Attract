import React from "react";
import { 
  Card, 
  CardBody, 
  Button,
  Divider,
  Tabs,
  Tab,
  Avatar,
  Chip,
  Badge
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

interface ActionItemDetailsProps {
  itemId: string;
  actions: any[];
  language: "en" | "ar";
  onAction: (actionType: string, itemIds: string[]) => void;
  isCompleted: boolean;
}

export const ActionItemDetails: React.FC<ActionItemDetailsProps> = ({ 
  itemId, 
  actions,
  language,
  onAction,
  isCompleted
}) => {
  const item = actions.find(action => action.id === itemId);
  
  if (!item) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">
          {language === "en" 
            ? "Item not found" 
            : "لم يتم العثور على العنصر"}
        </p>
      </div>
    );
  }
  
  const getActionTypeInfo = (type: string) => {
    const types = {
      requisition: {
        color: "bg-blue-100 text-blue-700",
        icon: "lucide:file-text",
        label: language === "en" ? "Requisition" : "طلب"
      },
      candidate: {
        color: "bg-green-100 text-green-700",
        icon: "lucide:user",
        label: language === "en" ? "Candidate" : "مرشح"
      },
      interview: {
        color: "bg-purple-100 text-purple-700",
        icon: "lucide:calendar",
        label: language === "en" ? "Interview" : "مقابلة"
      },
      offer: {
        color: "bg-amber-100 text-amber-700",
        icon: "lucide:mail",
        label: language === "en" ? "Offer" : "عرض"
      }
    };
    
    return types[type as keyof typeof types] || {
      color: "bg-gray-100 text-gray-700",
      icon: "lucide:file",
      label: type
    };
  };
  
  const getStatusBadge = (status: string, color: string) => {
    const icons = {
      "Urgent": "lucide:alert-circle",
      "Due Soon": "lucide:clock",
      "Completed": "lucide:check-circle",
      "Scheduled": "lucide:calendar",
      "Overdue": "lucide:x-circle",
    };
    
    return (
      <Chip 
        size="sm" 
        color={color as any}
        variant={color === "success" ? "solid" : "flat"}
        startContent={
          <Icon 
            icon={icons[status as keyof typeof icons] || "lucide:info"} 
            className="w-3.5 h-3.5" 
          />
        }
        classNames={{
          base: "px-2 py-1 h-auto",
          content: "px-1"
        }}
      >
        {status}
      </Chip>
    );
  };
  
  const activityTimeline = [
    {
      date: "2023-07-10",
      action: language === "en" ? "Action created" : "تم إنشاء الإجراء",
      user: language === "en" ? "System" : "النظام",
      icon: "lucide:plus-circle",
      color: "text-gray-500"
    },
    {
      date: "2023-07-11",
      action: language === "en" ? "Assigned to " + item.assignee.name.en : "تم التعيين إلى " + item.assignee.name.ar,
      user: language === "en" ? "Sarah Johnson" : "سارة جونسون",
      icon: "lucide:user-check",
      color: "text-blue-500"
    },
    {
      date: "2023-07-12",
      action: language === "en" ? "Status changed to Urgent" : "تم تغيير الحالة إلى عاجل",
      user: language === "en" ? "Jessica Lee" : "جيسيكا لي",
      icon: "lucide:alert-circle",
      color: "text-red-500"
    }
  ];
  
  const typeInfo = getActionTypeInfo(item.type);
  
  return (
    <div className="flex flex-col gap-6">
      {/* Header with status */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-2">
            <div className={`w-8 h-8 rounded-lg ${typeInfo.color.split(' ')[0]} flex items-center justify-center mr-2`}>
              <Icon icon={typeInfo.icon} className={`w-4 h-4 ${typeInfo.color.split(' ')[1]}`} />
            </div>
            <span className="text-sm text-gray-500">
              {typeInfo.label}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {item.id}
            </span>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800">
            {language === "en" ? item.label.en : item.label.ar}
          </h2>
        </div>
        
        <div>
          {getStatusBadge(isCompleted ? "Completed" : item.status, isCompleted ? "success" : item.statusColor)}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card className="border border-gray-100 shadow-sm">
            <CardBody>
              <h3 className="text-base font-medium mb-2">
                {language === "en" ? "Description" : "الوصف"}
              </h3>
              <p className="text-gray-600">
                {language === "en" 
                  ? (item.description?.en || "No description provided.") 
                  : (item.description?.ar || "لم يتم تقديم وصف.")}
              </p>
            </CardBody>
          </Card>
          
          {/* AI Recommendation */}
          {item.aiNote && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Card className="border border-blue-100 bg-blue-50 shadow-sm">
                <CardBody>
                  <div className="flex items-start">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-2 mr-3 shadow-sm">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <Icon icon="lucide:sparkles" className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                    
                    <div>
                      <h3 className="text-base font-medium mb-1 text-blue-800">
                        {language === "en" ? "AI Recommendation" : "توصية الذكاء الاصطناعي"}
                      </h3>
                      <p className="text-blue-700">
                        {language === "en" ? item.aiNote.en : item.aiNote.ar}
                      </p>
                      
                      <div className="mt-3 flex items-center">
                        <Button 
                          size="sm"
                          color="primary"
                          variant="solid"
                          className="bg-blue-600"
                          startContent={<Icon icon="lucide:check" className="w-3.5 h-3.5" />}
                          onPress={() => onAction("approve", [item.id])}
                        >
                          {language === "en" ? "Follow Recommendation" : "اتبع التوصية"}
                        </Button>
                        <Button 
                          size="sm"
                          variant="light"
                          className="ml-2 text-blue-700"
                        >
                          {language === "en" ? "Get More Insights" : "الحصول على المزيد من الرؤى"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
          
          {/* Timeline */}
          <Card className="border border-gray-100 shadow-sm">
            <CardBody>
              <h3 className="text-base font-medium mb-4">
                {language === "en" ? "Activity Timeline" : "الجدول الزمني للنشاط"}
              </h3>
              
              <div className="space-y-4">
                {isCompleted && (
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="flex flex-col items-center mr-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Icon icon="lucide:check" className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="w-0.5 h-full bg-gray-200"></div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">
                          {language === "en" ? "Action Completed" : "تم إكمال الإجراء"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date().toLocaleString(language === "en" ? "en-US" : "ar-SA")}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {language === "en" 
                          ? "The action was approved and marked as completed" 
                          : "تمت الموافقة على الإجراء وتم وضع علامة عليه كمكتمل"}
                      </div>
                      <div className="mt-1 flex items-center">
                        <Avatar
                          src="https://img.heroui.chat/image/avatar?w=100&h=100&u=1"
                          size="sm"
                          className="mr-2"
                        />
                        <span className="text-xs text-gray-500">
                          {language === "en" ? "You" : "أنت"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {activityTimeline.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex flex-col items-center mr-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <Icon icon={activity.icon} className={`w-4 h-4 ${activity.color}`} />
                      </div>
                      {index < activityTimeline.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200"></div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-gray-900">
                          {activity.action}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(activity.date).toLocaleDateString(language === "en" ? "en-US" : "ar-SA")}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {activity.user}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
        
        {/* Right column - Metadata and Actions */}
        <div className="space-y-6">
          {/* Action Information */}
          <Card className="border border-gray-100 shadow-sm">
            <CardBody>
              <h3 className="text-base font-medium mb-3">
                {language === "en" ? "Action Information" : "معلومات الإجراء"}
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {language === "en" ? "Due Date" : "تاريخ الاستحقاق"}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {new Date(item.dueDate).toLocaleDateString(language === "en" ? "en-US" : "ar-SA")}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {language === "en" ? "Priority" : "الأولوية"}
                  </span>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${
                      item.priority === "high" ? "bg-red-500" :
                      item.priority === "medium" ? "bg-amber-500" :
                      "bg-green-500"
                    } mr-1.5`}></div>
                    <span className="text-sm font-medium text-gray-800">
                      {item.priority === "high" ? (language === "en" ? "High" : "عالية") :
                       item.priority === "medium" ? (language === "en" ? "Medium" : "متوسطة") :
                       (language === "en" ? "Low" : "منخفضة")}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {language === "en" ? "Department" : "القسم"}
                  </span>
                  <Badge variant="flat" color="default" className="bg-gray-100">
                    {item.department}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {language === "en" ? "Action Type" : "نوع الإجراء"}
                  </span>
                  <span className="text-sm font-medium text-gray-800">
                    {item.actionType === "review" ? (language === "en" ? "Review" : "مراجعة") :
                     item.actionType === "approve" ? (language === "en" ? "Approve" : "موافقة") :
                     item.actionType === "screen" ? (language === "en" ? "Screen" : "فرز") :
                     item.actionType === "interview" ? (language === "en" ? "Interview" : "مقابلة") :
                     item.actionType === "offer" ? (language === "en" ? "Offer" : "عرض") :
                     item.actionType}
                  </span>
                </div>
              </div>
              
              <Divider className="my-4" />
              
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  {language === "en" ? "Assignee:" : "المكلف:"}
                </span>
                <div className="flex items-center">
                  <Avatar 
                    src={item.assignee.avatar || "https://img.heroui.chat/image/avatar?w=100&h=100&u=1"} 
                    size="sm"
                    className="mr-2"
                  />
                  <span className="text-sm font-medium">
                    {language === "en" ? item.assignee.name.en : item.assignee.name.ar}
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Action Buttons */}
          <AnimatePresence>
            {!isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <Button 
                  color="primary"
                  variant="solid"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 border-none shadow-md"
                  startContent={<Icon icon="lucide:check" className="w-4 h-4" />}
                  onPress={() => onAction("approve", [item.id])}
                >
                  {language === "en" ? "Approve & Complete" : "الموافقة والإكمال"}
                </Button>
                
                <Button 
                  color="default"
                  variant="flat"
                  className="w-full"
                  startContent={<Icon icon="lucide:clock" className="w-4 h-4" />}
                >
                  {language === "en" ? "Postpone" : "تأجيل"}
                </Button>
                
                <Button 
                  color="default"
                  variant="flat"
                  className="w-full"
                  startContent={<Icon icon="lucide:user-plus" className="w-4 h-4" />}
                >
                  {language === "en" ? "Reassign" : "إعادة التعيين"}
                </Button>
                
                <Button 
                  color="danger"
                  variant="flat"
                  className="w-full"
                  startContent={<Icon icon="lucide:x" className="w-4 h-4" />}
                  onPress={() => onAction("reject", [item.id])}
                >
                  {language === "en" ? "Reject" : "رفض"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Completed Message */}
          <AnimatePresence>
            {isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-green-100 bg-green-50">
                  <CardBody>
                    <div className="flex items-center">
                      <div className="bg-green-100 rounded-full p-2 mr-3">
                        <Icon icon="lucide:check" className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-green-800">
                          {language === "en" ? "Action Completed" : "تم إكمال الإجراء"}
                        </h3>
                        <p className="text-sm text-green-700">
                          {language === "en" 
                            ? "This action has been successfully completed." 
                            : "تم إكمال هذا الإجراء بنجاح."}
                        </p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                
                <Button 
                  color="default"
                  variant="flat"
                  className="w-full mt-3"
                  startContent={<Icon icon="lucide:rotate-ccw" className="w-4 h-4" />}
                >
                  {language === "en" ? "Revert Action" : "التراجع عن الإجراء"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};