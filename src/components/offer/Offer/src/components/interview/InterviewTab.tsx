import React from "react";
import { Button, Card, Tabs, Tab, Divider, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../context/LanguageContext";
import { useTabContent } from "../../context/TabContext";
import { motion } from "framer-motion";
import UpcomingInterviews from "./UpcomingInterviews";
import RecruitmentProgress from "./RecruitmentProgress";
import { InterviewProvider, useInterviewContext } from "../../context/InterviewContext";
import KanbanView from "./views/KanbanView";
import ListView from "./views/ListView";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Checkbox, Chip } from "@heroui/react";

const InterviewTab: React.FC = () => {
  const { language } = useLanguage();
  const { tabs } = useTabContent();
  const [selectedView, setSelectedView] = React.useState<string>("all");
  const [viewType, setViewType] = React.useState<"list" | "kanban">("list");
  const [activeFilters, setActiveFilters] = React.useState<string[]>([]);
  
  const tabContent = tabs.find(tab => tab.key === "interview");

  const handleFilterChange = (key: string) => {
    setActiveFilters(prev => 
      prev.includes(key) 
        ? prev.filter(k => k !== key) 
        : [...prev, key]
    );
  };

  return (
    <InterviewProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-6"
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex rounded-lg bg-gray-100 p-1">
                <Button 
                  size="sm" 
                  variant={viewType === "list" ? "solid" : "flat"} 
                  onPress={() => setViewType("list")}
                  className="rounded-md"
                  startContent={<Icon icon="lucide:list" size={16} />}
                >
                  {language === "en" ? "List" : "قائمة"}
                </Button>
                <Button 
                  size="sm" 
                  variant={viewType === "kanban" ? "solid" : "flat"} 
                  onPress={() => setViewType("kanban")}
                  className="rounded-md"
                  startContent={<Icon icon="lucide:layout-grid" size={16} />}
                >
                  {language === "en" ? "Kanban" : "كانبان"}
                </Button>
              </div>
            </div>
          </div>
          <ScheduleInterviewButton />
        </div>

        {viewType === "list" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="overflow-visible">
                <div className="p-4 border-b">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="text-lg font-medium">
                      {language === "en" ? "Upcoming Interviews" : "المقابلات القادمة"}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div className="flex rounded-lg bg-gray-100 p-1">
                        <Button 
                          size="sm" 
                          variant={selectedView === "all" ? "solid" : "flat"} 
                          onPress={() => setSelectedView("all")}
                          className="rounded-md min-w-16"
                        >
                          {language === "en" ? "All" : "الكل"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant={selectedView === "today" ? "solid" : "flat"}
                          onPress={() => setSelectedView("today")}
                          className="rounded-md min-w-16"
                        >
                          {language === "en" ? "Today" : "اليوم"}
                        </Button>
                        <Button 
                          size="sm" 
                          variant={selectedView === "week" ? "solid" : "flat"}
                          onPress={() => setSelectedView("week")}
                          className="rounded-md min-w-16"
                        >
                          {language === "en" ? "Week" : "الأسبوع"}
                        </Button>
                      </div>
                      {/* Replace the simple filter button with dropdown */}
                      <Dropdown placement="bottom-end">
                        <DropdownTrigger>
                          <Button
                            size="sm"
                            variant="flat"
                            className="rounded-lg"
                            endContent={activeFilters.length > 0 && 
                              <Chip size="sm" variant="flat" color="primary" className="ml-1">
                                {activeFilters.length}
                              </Chip>
                            }
                          >
                            <div className="flex items-center gap-1">
                              <Icon icon="lucide:filter" />
                              {language === "en" ? "Filter" : "تصفية"}
                            </div>
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
                    </div>
                  </div>
                </div>
                <UpcomingInterviews filter={selectedView} />
              </Card>
            </div>
            
            <div className="lg:col-span-1 flex flex-col gap-6">
              <RecruitmentProgress />
              <InterviewMetrics />
            </div>
          </div>
        ) : (
          <KanbanView filter={selectedView} />
        )}
      </motion.div>
    </InterviewProvider>
  );
};

interface MetricProps {
  icon: string;
  label: string;
  value: string;
  color: string;
}

const Metric: React.FC<MetricProps> = ({ icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`rounded-full w-10 h-10 flex items-center justify-center ${color}`}>
        <Icon icon={icon} className="text-lg" />
      </div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
};

const InterviewMetrics: React.FC = () => {
  const { language } = useLanguage();
  const { interviews } = useInterviewContext();
  
  // Calculate metrics
  const completedCount = interviews.filter(i => i.status === "completed").length;
  const scheduledCount = interviews.filter(i => i.status === "upcoming").length;
  const inProgressCount = interviews.filter(i => i.status === "in-progress").length;
  
  return (
    <Card>
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">
          {language === "en" ? "Interview Metrics" : "مقاييس المقابلة"}
        </h2>
      </div>
      <div className="p-4">
        <div className="flex flex-col gap-5">
          <Metric 
            icon="lucide:calendar-check" 
            label={language === "en" ? "Completed Interviews" : "المقابلات المكتملة"}
            value={completedCount.toString()}
            color="bg-green-50 text-green-600"
          />
          <Metric 
            icon="lucide:calendar-clock" 
            label={language === "en" ? "Scheduled Interviews" : "المقابلات المجدولة"}
            value={scheduledCount.toString()}
            color="bg-blue-50 text-blue-600"
          />
          <Metric 
            icon="lucide:activity" 
            label={language === "en" ? "In Progress" : "قيد التنفيذ"}
            value={inProgressCount.toString()}
            color="bg-amber-50 text-amber-600"
          />
          <Metric 
            icon="lucide:timer" 
            label={language === "en" ? "Average Duration" : "متوسط المدة"}
            value="42 min"
            color="bg-purple-50 text-purple-600"
          />
          <Metric 
            icon="lucide:users" 
            label={language === "en" ? "Pass Rate" : "معدل النجاح"}
            value="68%"
            color="bg-amber-50 text-amber-600"
          />
        </div>
      </div>
    </Card>
  );
};

const ScheduleInterviewButton: React.FC = () => {
  const { language } = useLanguage();
  const { openScheduleWizard } = useInterviewContext();
  
  return (
    <Button 
      color="primary" 
      startContent={<Icon icon="lucide:plus" />}
      onPress={openScheduleWizard}
    >
      {language === "en" ? "Schedule Interview" : "جدولة مقابلة"}
    </Button>
  );
};

export default InterviewTab;