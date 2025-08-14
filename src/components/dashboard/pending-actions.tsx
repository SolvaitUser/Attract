import React from "react";
import { Icon } from "@iconify/react";
import { Button, Tooltip, Chip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge } from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "../../utils/navigation";

interface ActionItem {
  id: string;
  type: string;
  label: { en: string; ar: string };
  dueDate: string;
  status: string;
  statusColor: "primary" | "warning" | "danger" | "success";
  aiNote?: { en: string; ar: string };
  buttonText: { en: string; ar: string };
  buttonIcon: string;
}

export const PendingActions: React.FC = () => {
  const { language, direction } = useAppContext();
  const [filterType, setFilterType] = React.useState<string>("all");
  const [sortBy, setSortBy] = React.useState<string>("dueDate");
  const navigate = useNavigate();

  const actions: ActionItem[] = [
    {
      id: "req-001",
      type: "requisition",
      label: { en: "Senior Developer Requisition", ar: "طلب مطور أول" },
      dueDate: "2023-07-15",
      status: "Urgent",
      statusColor: "danger",
      aiNote: { en: "This requisition has been pending for 5 days.", ar: "هذا الطلب معلق منذ 5 أيام." },
      buttonText: { en: "Review Requisition", ar: "مراجعة الطلب" },
      buttonIcon: "lucide:file-text",
    },
    {
      id: "cand-042",
      type: "candidate",
      label: { en: "Ahmed Hassan - Screening", ar: "أحمد حسن - الفرز" },
      dueDate: "2023-07-18",
      status: "Due Soon",
      statusColor: "warning",
      aiNote: { en: "Candidate has strong technical skills matching job requirements.", ar: "المرشح لديه مهارات تقنية قوية تتطابق مع متطلبات الوظيفة." },
      buttonText: { en: "Screen Candidate", ar: "فرز المرشح" },
      buttonIcon: "lucide:user",
    },
    {
      id: "int-023",
      type: "interview",
      label: { en: "Marketing Manager - Interview", ar: "مدير التسويق - المقابلة" },
      dueDate: "2023-07-20",
      status: "Scheduled",
      statusColor: "success",
      buttonText: { en: "Send Interview Invite", ar: "إرسال دعوة المقابلة" },
      buttonIcon: "lucide:calendar",
    },
    {
      id: "off-011",
      type: "offer",
      label: { en: "Sarah Johnson - Offer Approval", ar: "سارة جونسون - الموافقة على العرض" },
      dueDate: "2023-07-14",
      status: "Urgent",
      statusColor: "danger",
      aiNote: { en: "This offer has been pending for 7 days.", ar: "هذا العرض معلق منذ 7 أيام." },
      buttonText: { en: "Approve Offer", ar: "الموافقة على العرض" },
      buttonIcon: "lucide:check-circle",
    },
  ];

  const filteredActions = React.useMemo(() => {
    return actions.filter(action => {
      if (filterType === "all") return true;
      return action.type === filterType;
    }).sort((a, b) => {
      if (sortBy === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === "status") {
        // Sort by priority: Urgent > Due Soon > Scheduled
        const priorityMap: Record<string, number> = {
          "Urgent": 1,
          "Due Soon": 2,
          "Scheduled": 3
        };
        return (priorityMap[a.status] || 99) - (priorityMap[b.status] || 99);
      }
      return 0;
    });
  }, [actions, filterType, sortBy]);

  const filterOptions = [
    { key: "all", label: { en: "All Actions", ar: "جميع الإجراءات" } },
    { key: "requisition", label: { en: "Requisitions", ar: "الطلبات" } },
    { key: "candidate", label: { en: "Candidates", ar: "المرشحين" } },
    { key: "interview", label: { en: "Interviews", ar: "المقابلات" } },
    { key: "offer", label: { en: "Offers", ar: "العروض" } },
  ];

  const sortOptions = [
    { key: "dueDate", label: { en: "Due Date", ar: "تاريخ الاستحقاق" } },
    { key: "status", label: { en: "Priority", ar: "الأولوية" } },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="w-full bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-xl overflow-hidden shadow-md"
    >
      {/* Header - Clean version without filters */}
      <div className="border-b border-gray-100 bg-white">
        <div className="px-5 py-4">
          <h2 className="text-lg font-bold text-gray-800 flex items-center">
            {language === "en" ? "Your Pending Recruitment Actions" : "مهام التوظيف المعلقة الخاصة بك"}
            <Badge 
              size="sm" 
              color="primary"
              className="ml-2"
            >
              {filteredActions.length}
            </Badge>
          </h2>
        </div>
        
        {/* Filters Row - Moved below the header */}
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center gap-2">
          <div className="flex items-center flex-wrap gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  size="sm" 
                  variant="flat" 
                  className="min-w-0 px-2 bg-white border border-gray-200"
                  endContent={<Icon icon="lucide:chevron-down" className="w-3 h-3 ml-1" />}
                >
                  <div className="flex items-center">
                    <Icon icon="lucide:filter" className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs">{filterOptions.find(opt => opt.key === filterType)?.label[language]}</span>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Filter actions"
                selectedKeys={[filterType]}
                selectionMode="single"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0]?.toString();
                  if (selected) setFilterType(selected);
                }}
              >
                {filterOptions.map(option => (
                  <DropdownItem key={option.key}>
                    {option.label[language]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  size="sm" 
                  variant="flat" 
                  className="min-w-0 px-2 bg-white border border-gray-200"
                  endContent={<Icon icon="lucide:chevron-down" className="w-3 h-3 ml-1" />}
                >
                  <div className="flex items-center">
                    <Icon icon="lucide:arrow-up-down" className="w-3.5 h-3.5 mr-1" />
                    <span className="text-xs">{sortOptions.find(opt => opt.key === sortBy)?.label[language]}</span>
                  </div>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Sort actions"
                selectedKeys={[sortBy]}
                selectionMode="single"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0]?.toString();
                  if (selected) setSortBy(selected);
                }}
              >
                {sortOptions.map(option => (
                  <DropdownItem key={option.key}>
                    {option.label[language]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          
          {/* Show active filter as chips when active */}
          {filterType !== "all" && (
            <div className="flex items-center ml-auto">
              <span className="text-xs text-gray-500 mr-2">
                {language === "en" ? "Filtered by:" : "تمت التصفية حسب:"}
              </span>
              <Chip 
                size="sm" 
                variant="flat" 
                color="primary"
                onClose={() => setFilterType("all")}
                className="bg-blue-100 text-blue-700 border border-blue-200"
                classNames={{
                  closeButton: "text-blue-700 hover:bg-blue-200/70",
                }}
              >
                {filterOptions.find(opt => opt.key === filterType)?.label[language]}
              </Chip>
            </div>
          )}
        </div>
      </div>

      {/* Action Cards List with scroll area */}
      <div className="px-3 py-3 max-h-[400px] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {filteredActions.length > 0 ? (
            <div className="space-y-3">
              {filteredActions.map((action, index) => (
                <motion.div 
                  key={action.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <motion.div 
                    className="bg-white rounded-lg p-4 border border-gray-100 hover:border-blue-200 transition-colors shadow-sm hover:shadow"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        {/* Enhanced status chip with icon */}
                        <div className="flex items-center gap-2 mb-1.5">
                          <Chip 
                            size="sm" 
                            color={action.statusColor}
                            variant="flat"
                            startContent={
                              <Icon 
                                icon={
                                  action.status === "Urgent" ? "lucide:alert-circle" : 
                                  action.status === "Due Soon" ? "lucide:clock" : 
                                  "lucide:check-circle"
                                } 
                                className="w-3 h-3" 
                              />
                            }
                            classNames={{
                              base: "px-2 py-1 h-auto",
                              content: "px-1"
                            }}
                          >
                            {action.status}
                          </Chip>
                          
                          <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                            <Icon icon="lucide:calendar" className="w-3 h-3 mr-1 text-gray-400" />
                            <span>
                              {new Date(action.dueDate).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                          
                          {/* Type indicator */}
                          <div className="flex items-center text-xs bg-gray-50 text-gray-500 px-2 py-0.5 rounded">
                            <Icon 
                              icon={
                                action.type === "requisition" ? "lucide:file-text" :
                                action.type === "candidate" ? "lucide:user" :
                                action.type === "interview" ? "lucide:calendar" :
                                "lucide:mail"
                              } 
                              className="w-3 h-3 mr-1 text-gray-400" 
                            />
                            <span>
                              {action.type === "requisition" ? (language === "en" ? "Requisition" : "طلب") :
                               action.type === "candidate" ? (language === "en" ? "Candidate" : "مرشح") :
                               action.type === "interview" ? (language === "en" ? "Interview" : "مقابلة") :
                               (language === "en" ? "Offer" : "عرض")
                              }
                            </span>
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-sm text-gray-800">
                          {language === "en" ? action.label.en : action.label.ar}
                        </h3>
                      </div>
                    </div>
                    
                    {action.aiNote && (
                      <div className="bg-blue-50 rounded-md p-2.5 mb-3 flex items-start border-l-2 border-blue-400">
                        <div className="bg-white rounded-full p-0.5 mr-2">
                          <Icon icon="lucide:sparkles" className="w-3 h-3 text-blue-500" />
                        </div>
                        <p className="text-xs text-blue-800 leading-relaxed">
                          {language === "en" ? action.aiNote.en : action.aiNote.ar}
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      size="sm"
                      color="primary"
                      variant="flat"
                      className="w-full justify-center bg-white hover:bg-blue-50 border border-gray-200 hover:border-blue-200 transition-colors mt-2"
                      startContent={<Icon icon={action.buttonIcon} className="w-3.5 h-3.5" />}
                    >
                      {language === "en" ? action.buttonText.en : action.buttonText.ar}
                    </Button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 px-6 text-center"
            >
              <div className="bg-gray-100 rounded-full p-3 mb-3">
                <Icon icon="lucide:check" className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-1 font-medium">
                {language === "en" ? "No pending actions" : "لا توجد إجراءات معلقة"}
              </p>
              <p className="text-xs text-gray-400">
                {language === "en" ? "All caught up or try a different filter" : "مواكبة للجميع أو جرب مرشحًا مختلفًا"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Enhanced Footer with navigation to full page */}
      <div className="bg-gray-50 border-t border-gray-100 p-3">
        <Button 
          className="w-full justify-center bg-gradient-to-r from-blue-500 to-blue-600 text-white border-none shadow-sm"
          startContent={<Icon icon="lucide:list" className="w-4 h-4" />}
          endContent={<Icon icon="lucide:chevron-right" className="w-4 h-4" />}
          onPress={() => navigate("/actions")}
        >
          {language === "en" ? "View All Actions" : "عرض جميع الإجراءات"}
        </Button>
      </div>
    </motion.section>
  );
};