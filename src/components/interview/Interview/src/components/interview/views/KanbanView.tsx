import React from "react";
import { Button, Card, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Checkbox, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../../context/LanguageContext";
import { useInterviewContext, Interview } from "../../../context/InterviewContext";
import { motion } from "framer-motion";
import KanbanColumn from "./KanbanColumn";
import EmptyState from "../../common/EmptyState";

interface KanbanViewProps {
  filter?: string;
}

type StatusColumnType = "scheduled" | "confirmed" | "in-progress" | "completed" | "canceled" | "rescheduled";

const KanbanView: React.FC<KanbanViewProps> = ({ filter = "all" }) => {
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

  // Group interviews by status
  const columnMap = React.useMemo(() => {
    const statusMap: Record<StatusColumnType, Interview[]> = {
      scheduled: [],
      confirmed: [],
      "in-progress": [], // Fixed: added quotes around property name with hyphen
      completed: [],
      canceled: [],
      rescheduled: []
    };
    
    // Map interview statuses to columns
    filteredInterviews.forEach(interview => {
      const status = interview.status;
      if (status === "in-progress") {
        statusMap["in-progress"].push(interview);
      } else if (status === "upcoming") {
        // Further classify upcoming interviews
        if (Math.random() > 0.5) {
          statusMap.confirmed.push(interview);
        } else {
          statusMap.scheduled.push(interview);
        }
      } else if (status === "completed") {
        statusMap.completed.push(interview);
      } else if (status === "canceled") {
        statusMap.canceled.push(interview);
      } else {
        statusMap.rescheduled.push(interview);
      }
    });
    
    return statusMap;
  }, [filteredInterviews]);
  
  const columns = [
    {
      id: "scheduled",
      title: language === "en" ? "Scheduled" : "مجدولة",
      color: "bg-blue-100 text-blue-600",
      icon: "lucide:calendar",
      interviews: columnMap.scheduled
    },
    {
      id: "confirmed",
      title: language === "en" ? "Confirmed" : "مؤكدة",
      color: "bg-purple-100 text-purple-600",
      icon: "lucide:check-circle",
      interviews: columnMap.confirmed
    },
    {
      id: "in-progress", // Added in-progress column
      title: language === "en" ? "In Progress" : "قيد التنفيذ",
      color: "bg-amber-100 text-amber-600",
      icon: "lucide:activity",
      interviews: columnMap["in-progress"]
    },
    {
      id: "completed",
      title: language === "en" ? "Completed" : "مكتملة",
      color: "bg-green-100 text-green-600",
      icon: "lucide:check",
      interviews: columnMap.completed
    },
    {
      id: "canceled",
      title: language === "en" ? "Canceled" : "ملغاة",
      color: "bg-red-100 text-red-600",
      icon: "lucide:x",
      interviews: columnMap.canceled
    },
    {
      id: "rescheduled",
      title: language === "en" ? "Rescheduled" : "معاد جدولتها",
      color: "bg-amber-100 text-amber-600",
      icon: "lucide:calendar-clock",
      interviews: columnMap.rescheduled
    }
  ];

  const isEmpty = filteredInterviews.length === 0;

  if (isEmpty) {
    return (
      <Card className="p-4">
        <EmptyState 
          icon="lucide:calendar"
          title={language === "en" ? "No interviews scheduled" : "لا توجد مقابلات مجدولة"}
          description={language === "en" 
            ? "There are no upcoming interviews matching your filter." 
            : "لا توجد مقابلات قادمة تطابق المرشح الخاص بك."}
        />
      </Card>
    );
  }

  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  
  const handleFilterChange = (key: string) => {
    setActiveFilters(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button
                size="sm"
                variant="flat"
                className="rounded-lg flex items-center gap-2"
                endContent={activeFilters.length > 0 && 
                  <Chip size="sm" variant="flat" color="primary" className="ml-1">
                    {activeFilters.length}
                  </Chip>
                }
              >
                <Icon icon="lucide:filter" size={16} />
                <span>
                  {language === "en" ? "Filter" : "تصفية"}
                </span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Filter Options" 
              closeOnSelect={false} 
              className="w-64"
              selectionMode="multiple"
              selectedKeys={activeFilters}
              onSelectionChange={(keys) => setActiveFilters(Array.from(keys as Set<string>))}
            >
              <DropdownSection title={language === "en" ? "Interview Status" : "حالة المقابلة"}>
                <DropdownItem key="status-upcoming">
                  <Checkbox 
                    isSelected={activeFilters.includes("status-upcoming")}
                    onChange={() => handleFilterChange("status-upcoming")}
                  >
                    {language === "en" ? "Upcoming" : "قادمة"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="status-completed">
                  <Checkbox 
                    isSelected={activeFilters.includes("status-completed")}
                    onChange={() => handleFilterChange("status-completed")}
                  >
                    {language === "en" ? "Completed" : "مكتملة"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="status-canceled">
                  <Checkbox 
                    isSelected={activeFilters.includes("status-canceled")}
                    onChange={() => handleFilterChange("status-canceled")}
                  >
                    {language === "en" ? "Canceled" : "ملغاة"}
                  </Checkbox>
                </DropdownItem>
              </DropdownSection>
              
              <DropdownSection title={language === "en" ? "Interview Type" : "نوع المقابلة"}>
                <DropdownItem key="type-technical">
                  <Checkbox 
                    isSelected={activeFilters.includes("type-technical")}
                    onChange={() => handleFilterChange("type-technical")}
                  >
                    {language === "en" ? "Technical" : "تقنية"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="type-behavioral">
                  <Checkbox 
                    isSelected={activeFilters.includes("type-behavioral")}
                    onChange={() => handleFilterChange("type-behavioral")}
                  >
                    {language === "en" ? "Behavioral" : "سلوكية"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="type-hr">
                  <Checkbox 
                    isSelected={activeFilters.includes("type-hr")}
                    onChange={() => handleFilterChange("type-hr")}
                  >
                    {language === "en" ? "HR" : "موارد بشرية"}
                  </Checkbox>
                </DropdownItem>
              </DropdownSection>
              
              <DropdownSection title={language === "en" ? "Department" : "القسم"}>
                <DropdownItem key="dept-engineering">
                  <Checkbox 
                    isSelected={activeFilters.includes("dept-engineering")}
                    onChange={() => handleFilterChange("dept-engineering")}
                  >
                    {language === "en" ? "Engineering" : "هندسة"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="dept-product">
                  <Checkbox 
                    isSelected={activeFilters.includes("dept-product")}
                    onChange={() => handleFilterChange("dept-product")}
                  >
                    {language === "en" ? "Product" : "المنتج"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="dept-design">
                  <Checkbox 
                    isSelected={activeFilters.includes("dept-design")}
                    onChange={() => handleFilterChange("dept-design")}
                  >
                    {language === "en" ? "Design" : "تصميم"}
                  </Checkbox>
                </DropdownItem>
              </DropdownSection>
              
              <DropdownSection title={language === "en" ? "Job Requisition" : "طلب وظيفة"}>
                <DropdownItem key="job-senior-developer">
                  <Checkbox 
                    isSelected={activeFilters.includes("job-senior-developer")}
                    onChange={() => handleFilterChange("job-senior-developer")}
                  >
                    {language === "en" ? "Senior Developer" : "مطوّر أول"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="job-product-designer">
                  <Checkbox 
                    isSelected={activeFilters.includes("job-product-designer")}
                    onChange={() => handleFilterChange("job-product-designer")}
                  >
                    {language === "en" ? "Product Designer" : "مصمم منتجات"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="job-marketing-manager">
                  <Checkbox 
                    isSelected={activeFilters.includes("job-marketing-manager")}
                    onChange={() => handleFilterChange("job-marketing-manager")}
                  >
                    {language === "en" ? "Marketing Manager" : "مدير تسويق"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="job-frontend-engineer">
                  <Checkbox 
                    isSelected={activeFilters.includes("job-frontend-engineer")}
                    onChange={() => handleFilterChange("job-frontend-engineer")}
                  >
                    {language === "en" ? "Frontend Engineer" : "مهندس واجهة أمامية"}
                  </Checkbox>
                </DropdownItem>
                <DropdownItem key="job-data-scientist">
                  <Checkbox 
                    isSelected={activeFilters.includes("job-data-scientist")}
                    onChange={() => handleFilterChange("job-data-scientist")}
                  >
                    {language === "en" ? "Data Scientist" : "عالم بيانات"}
                  </Checkbox>
                </DropdownItem>
              </DropdownSection>
              
              {activeFilters.length > 0 && (
                <DropdownItem key="clear" className="text-danger" color="danger" onClick={() => setActiveFilters([])}>
                  {language === "en" ? "Clear Filters" : "مسح التصفية"}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          
          <Button
            size="sm"
            variant="flat"
            className="rounded-lg flex items-center gap-2"
          >
            <Icon icon="lucide:sort" size={16} />
            <span>
              {language === "en" ? "Sort" : "ترتيب"}
            </span>
          </Button>
        </div>
        
        <div className="flex rounded-lg bg-gray-100 p-1">
          <Button 
            size="sm" 
            variant={filter === "all" ? "solid" : "flat"} 
            onPress={() => {/* setFilter("all") */}}
            className="rounded-md min-w-16"
          >
            {language === "en" ? "All" : "الكل"}
          </Button>
          <Button 
            size="sm" 
            variant={filter === "today" ? "solid" : "flat"}
            onPress={() => {/* setFilter("today") */}}
            className="rounded-md min-w-16"
          >
            {language === "en" ? "Today" : "اليوم"}
          </Button>
          <Button 
            size="sm" 
            variant={filter === "week" ? "solid" : "flat"}
            onPress={() => {/* setFilter("week") */}}
            className="rounded-md min-w-16"
          >
            {language === "en" ? "Week" : "الأسبوع"}
          </Button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-4 hide-scrollbar">
        <div className="flex gap-4 min-w-max">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              title={column.title}
              icon={column.icon}
              color={column.color}
              interviews={column.interviews}
              onViewDetails={openInterviewDetails}
              onSubmitFeedback={openFeedbackForm}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default KanbanView;