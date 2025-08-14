import React from "react";
import { Icon } from "@iconify/react";
import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Input,
  Chip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CheckboxGroup,
  Checkbox,
  Divider,
  Badge
} from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

export interface FilterState {
  departments: string[];
  locations: string[];
  dateRange: string;
  jobTypes: string[];
  status: string[];
  searchQuery: string;
}

interface DashboardFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  filters,
  setFilters,
  onApplyFilters,
  onResetFilters
}) => {
  const { language, direction } = useAppContext();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const dateRangeOptions = [
    { key: "last7days", label: { en: "Last 7 days", ar: "آخر 7 أيام" } },
    { key: "last30days", label: { en: "Last 30 days", ar: "آخر 30 يوم" } },
    { key: "last90days", label: { en: "Last 90 days", ar: "آخر 90 يوم" } },
    { key: "thisYear", label: { en: "This year", ar: "هذا العام" } },
    { key: "custom", label: { en: "Custom range", ar: "نطاق مخصص" } },
  ];

  const departments = [
    { key: "engineering", label: { en: "Engineering", ar: "الهندسة" } },
    { key: "sales", label: { en: "Sales", ar: "المبيعات" } },
    { key: "marketing", label: { en: "Marketing", ar: "التسويق" } },
    { key: "hr", label: { en: "Human Resources", ar: "الموارد البشرية" } },
    { key: "finance", label: { en: "Finance", ar: "المالية" } },
    { key: "operations", label: { en: "Operations", ar: "العمليات" } },
  ];

  const locations = [
    { key: "riyadh", label: { en: "Riyadh", ar: "الرياض" } },
    { key: "jeddah", label: { en: "Jeddah", ar: "جدة" } },
    { key: "dammam", label: { en: "Dammam", ar: "الدمام" } },
    { key: "remote", label: { en: "Remote", ar: "عن بعد" } },
  ];

  const jobTypes = [
    { key: "fullTime", label: { en: "Full-time", ar: "دوام كامل" } },
    { key: "partTime", label: { en: "Part-time", ar: "دوام جزئي" } },
    { key: "contract", label: { en: "Contract", ar: "عقد" } },
    { key: "internship", label: { en: "Internship", ar: "تدريب" } },
  ];

  const statusOptions = [
    { key: "open", label: { en: "Open", ar: "مفتوح" } },
    { key: "inProgress", label: { en: "In Progress", ar: "قيد التقدم" } },
    { key: "onHold", label: { en: "On Hold", ar: "معلق" } },
    { key: "filled", label: { en: "Filled", ar: "تم شغله" } },
    { key: "cancelled", label: { en: "Cancelled", ar: "ملغي" } },
  ];

  const handleSearchChange = (value: string) => {
    setFilters(prev => ({ ...prev, searchQuery: value }));
  };

  const handleRemoveFilter = (type: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].filter(item => item !== value)
    }));
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.departments.length) count += 1;
    if (filters.locations.length) count += 1;
    if (filters.dateRange) count += 1;
    if (filters.jobTypes.length) count += 1;
    if (filters.status.length) count += 1;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const handleResetFilters = () => {
    // Reset to initial state
    setFilters({
      departments: [],
      locations: [],
      dateRange: "",
      jobTypes: [],
      status: [],
      searchQuery: ""
    });
    
    // Call the parent's onResetFilters function
    onResetFilters();
  };

  const clearAllFilters = () => {
    setFilters(prev => ({
      ...prev,
      departments: [],
      locations: [],
      dateRange: "",
      jobTypes: [],
      status: []
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-xl p-5 mb-6 shadow-sm overflow-hidden relative"
    >
      {/* Neural network background animation for premium look */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.03]">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`filter-particle-${i}`}
            className="absolute bg-blue-600 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              scale: Math.random() * 0.3 + 0.1,
            }}
            animate={{
              x: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
              y: [
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
                Math.random() * 100 + "%",
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: (Math.random() * 5 + 1) + "px",
              height: (Math.random() * 5 + 1) + "px",
            }}
          />
        ))}
      </div>
      
      <div className="flex flex-col gap-5 relative z-10">
        {/* Enhanced Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Search Input with enhanced styling */}
          <div className="w-full md:w-1/3 relative">
            <Input
              placeholder={language === "en" ? "Search requisitions, candidates..." : "البحث عن الطلبات، المرشحين..."}
              value={filters.searchQuery}
              onValueChange={handleSearchChange}
              startContent={<Icon icon="lucide:search" className="w-4 h-4 text-blue-400" />}
              size="md"
              className="w-full bg-white/80 backdrop-blur-sm"
              classNames={{
                inputWrapper: "shadow-sm border-none bg-white/80 backdrop-blur-sm hover:bg-white focus-within:!bg-white transition-all duration-200",
                input: "text-gray-700"
              }}
            />
            
            {filters.searchQuery && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="min-w-0 w-6 h-6 text-gray-500"
                  onPress={() => setFilters(prev => ({ ...prev, searchQuery: "" }))}
                >
                  <Icon icon="lucide:x" className="w-3 h-3" />
                </Button>
              </motion.div>
            )}
          </div>

          {/* Primary Filter Controls - Enhanced with custom styling */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Date Range Filter - Customized dropdown */}
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  size="md"
                  className={filters.dateRange ? "bg-white/90 border-blue-100 text-blue-600" : "bg-white/80"}
                  endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
                  startContent={<Icon icon="lucide:calendar" className={`w-4 h-4 ${filters.dateRange ? "text-blue-600" : "text-gray-500"}`} />}
                >
                  <span className={filters.dateRange ? "text-blue-600 font-medium" : "text-gray-700"}>
                    {filters.dateRange ? 
                      dateRangeOptions.find(opt => opt.key === filters.dateRange)?.label[language] : 
                      language === "en" ? "Date Range" : "النطاق الزمني"}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Date range options"
                selectionMode="single"
                selectedKeys={filters.dateRange ? [filters.dateRange] : []}
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys)[0]?.toString();
                  if (selected) {
                    setFilters(prev => ({ ...prev, dateRange: selected }));
                  }
                }}
                className="bg-white/95 backdrop-blur-sm"
              >
                {dateRangeOptions.map((option) => (
                  <DropdownItem key={option.key} className="data-[selectable=true]:data-[selected=true]:text-blue-600 data-[selectable=true]:data-[selected=true]:bg-blue-50">
                    {option.label[language]}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Department Filter - Enhanced popover */}
            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button 
                  variant="flat" 
                  size="md"
                  className={filters.departments.length > 0 ? "bg-white/90 border-blue-100 text-blue-600" : "bg-white/80"}
                  endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
                  startContent={<Icon icon="lucide:briefcase" className={`w-4 h-4 ${filters.departments.length > 0 ? "text-blue-600" : "text-gray-500"}`} />}
                >
                  <div className="flex items-center">
                    <span className={filters.departments.length > 0 ? "text-blue-600 font-medium" : "text-gray-700"}>
                      {language === "en" ? "Department" : "القسم"}
                    </span>
                    {filters.departments.length > 0 && (
                      <Badge size="sm" className="ml-2 bg-blue-500 text-white min-w-4 h-4 flex items-center justify-center px-1">
                        {filters.departments.length}
                      </Badge>
                    )}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0 bg-white/95 backdrop-blur-sm shadow-xl border-none">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-800">
                      {language === "en" ? "Select Departments" : "اختر الأقسام"}
                    </h4>
                    {filters.departments.length > 0 && (
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="text-xs h-6 px-2 text-gray-500"
                        onPress={() => setFilters(prev => ({ ...prev, departments: [] }))}
                      >
                        {language === "en" ? "Clear" : "مسح"}
                      </Button>
                    )}
                  </div>
                  <CheckboxGroup
                    value={filters.departments}
                    onValueChange={(values) => setFilters(prev => ({ ...prev, departments: values }))}
                    className="gap-2"
                  >
                    {departments.map((dept) => (
                      <Checkbox 
                        key={dept.key} 
                        value={dept.key}
                        className="data-[selected=true]:text-blue-600"
                      >
                        <span className="ml-1">{dept.label[language]}</span>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <Button 
                      size="sm" 
                      color="primary"
                      className="font-medium px-4 h-8"
                      onPress={() => document.body.click()} // Close popover
                    >
                      {language === "en" ? "Apply" : "تطبيق"}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Location Filter - Enhanced popover */}
            <Popover placement="bottom" showArrow={true}>
              <PopoverTrigger>
                <Button 
                  variant="flat" 
                  size="md"
                  className={filters.locations.length > 0 ? "bg-white/90 border-blue-100 text-blue-600" : "bg-white/80"}
                  endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
                  startContent={<Icon icon="lucide:map-pin" className={`w-4 h-4 ${filters.locations.length > 0 ? "text-blue-600" : "text-gray-500"}`} />}
                >
                  <div className="flex items-center">
                    <span className={filters.locations.length > 0 ? "text-blue-600 font-medium" : "text-gray-700"}>
                      {language === "en" ? "Location" : "الموقع"}
                    </span>
                    {filters.locations.length > 0 && (
                      <Badge size="sm" className="ml-2 bg-blue-500 text-white min-w-4 h-4 flex items-center justify-center px-1">
                        {filters.locations.length}
                      </Badge>
                    )}
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-0 bg-white/95 backdrop-blur-sm shadow-xl border-none">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-800">
                      {language === "en" ? "Select Locations" : "اختر المواقع"}
                    </h4>
                    {filters.locations.length > 0 && (
                      <Button 
                        size="sm" 
                        variant="light" 
                        className="text-xs h-6 px-2 text-gray-500"
                        onPress={() => setFilters(prev => ({ ...prev, locations: [] }))}
                      >
                        {language === "en" ? "Clear" : "مسح"}
                      </Button>
                    )}
                  </div>
                  <CheckboxGroup
                    value={filters.locations}
                    onValueChange={(values) => setFilters(prev => ({ ...prev, locations: values }))}
                    className="gap-2"
                  >
                    {locations.map((loc) => (
                      <Checkbox 
                        key={loc.key} 
                        value={loc.key}
                        className="data-[selected=true]:text-blue-600"
                      >
                        <span className="ml-1">{loc.label[language]}</span>
                      </Checkbox>
                    ))}
                  </CheckboxGroup>
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                    <Button 
                      size="sm" 
                      color="primary"
                      className="font-medium px-4 h-8"
                      onPress={() => document.body.click()} // Close popover
                    >
                      {language === "en" ? "Apply" : "تطبيق"}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* More Filters Button - Enhanced styling */}
            <Button 
              variant="flat" 
              size="md"
              className={`${(filters.jobTypes.length > 0 || filters.status.length > 0) ? "bg-white/90 border-blue-100 text-blue-600" : "bg-white/80"}`}
              onPress={() => setIsExpanded(!isExpanded)}
              endContent={
                <Icon 
                  icon={isExpanded ? "lucide:chevron-up" : "lucide:chevron-down"} 
                  className="w-4 h-4" 
                />
              }
              startContent={<Icon icon="lucide:filter" className={`w-4 h-4 ${(filters.jobTypes.length > 0 || filters.status.length > 0) ? "text-blue-600" : "text-gray-500"}`} />}
            >
              <div className="flex items-center">
                <span className={(filters.jobTypes.length > 0 || filters.status.length > 0) ? "text-blue-600 font-medium" : "text-gray-700"}>
                  {language === "en" ? "More Filters" : "المزيد من الفلاتر"}
                </span>
                {(filters.jobTypes.length > 0 || filters.status.length > 0) && (
                  <Badge size="sm" className="ml-2 bg-blue-500 text-white min-w-4 h-4 flex items-center justify-center px-1">
                    {filters.jobTypes.length + filters.status.length}
                  </Badge>
                )}
              </div>
            </Button>

            {/* Apply/Reset Buttons - Fixed white circle issue and button functionality */}
            <div className="ml-auto flex gap-2">
              <Button 
                size="md"
                variant="light"
                className="text-gray-600 font-medium"
                onPress={handleResetFilters}
              >
                {language === "en" ? "Reset" : "إعادة تعيين"}
              </Button>
              <Button 
                size="md"
                color="primary"
                className="bg-gradient-to-r from-blue-600 to-blue-700 border-none shadow-md px-6 font-medium"
                onPress={onApplyFilters}
                endContent={activeFilterCount > 0 && (
                  <span className="inline-flex items-center justify-center rounded-full bg-white/20 ml-1.5 min-w-[20px] h-5 px-1 text-xs text-white">
                    {activeFilterCount}
                  </span>
                )}
              >
                {language === "en" ? "Apply Filters" : "تطبيق الفلاتر"}
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Filters - Enhanced animation and styling */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="pt-4 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-4">
                {/* Job Type Filter - Enhanced UI */}
                <div className="w-full md:w-auto">
                  <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                      <Button 
                        variant="flat" 
                        size="md"
                        className={filters.jobTypes.length > 0 ? "bg-white/90 border-blue-100 text-blue-600" : "bg-white/80"}
                        endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
                        startContent={<Icon icon="lucide:clock" className={`w-4 h-4 ${filters.jobTypes.length > 0 ? "text-blue-600" : "text-gray-500"}`} />}
                      >
                        <div className="flex items-center">
                          <span className={filters.jobTypes.length > 0 ? "text-blue-600 font-medium" : "text-gray-700"}>
                            {language === "en" ? "Job Type" : "نوع الوظيفة"}
                          </span>
                          {filters.jobTypes.length > 0 && (
                            <Badge size="sm" className="ml-2 bg-blue-500 text-white min-w-4 h-4 flex items-center justify-center px-1">
                              {filters.jobTypes.length}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0 bg-white/95 backdrop-blur-sm shadow-xl border-none">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-800">
                            {language === "en" ? "Select Job Types" : "اختر أنواع الوظائف"}
                          </h4>
                          {filters.jobTypes.length > 0 && (
                            <Button 
                              size="sm" 
                              variant="light" 
                              className="text-xs h-6 px-2 text-gray-500"
                              onPress={() => setFilters(prev => ({ ...prev, jobTypes: [] }))}
                            >
                              {language === "en" ? "Clear" : "مسح"}
                            </Button>
                          )}
                        </div>
                        <CheckboxGroup
                          value={filters.jobTypes}
                          onValueChange={(values) => setFilters(prev => ({ ...prev, jobTypes: values }))}
                          className="gap-2"
                        >
                          {jobTypes.map((type) => (
                            <Checkbox 
                              key={type.key} 
                              value={type.key}
                              className="data-[selected=true]:text-blue-600"
                            >
                              <span className="ml-1">{type.label[language]}</span>
                            </Checkbox>
                          ))}
                        </CheckboxGroup>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                          <Button 
                            size="sm" 
                            color="primary"
                            className="font-medium px-4 h-8"
                            onPress={() => document.body.click()} // Close popover
                          >
                            {language === "en" ? "Apply" : "تطبيق"}
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Status Filter - Enhanced UI */}
                <div className="w-full md:w-auto">
                  <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                      <Button 
                        variant="flat" 
                        size="md"
                        className={filters.status.length > 0 ? "bg-white/90 border-blue-100 text-blue-600" : "bg-white/80"}
                        endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
                        startContent={<Icon icon="lucide:activity" className={`w-4 h-4 ${filters.status.length > 0 ? "text-blue-600" : "text-gray-500"}`} />}
                      >
                        <div className="flex items-center">
                          <span className={filters.status.length > 0 ? "text-blue-600 font-medium" : "text-gray-700"}>
                            {language === "en" ? "Status" : "الحالة"}
                          </span>
                          {filters.status.length > 0 && (
                            <Badge size="sm" className="ml-2 bg-blue-500 text-white min-w-4 h-4 flex items-center justify-center px-1">
                              {filters.status.length}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0 bg-white/95 backdrop-blur-sm shadow-xl border-none">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-medium text-gray-800">
                            {language === "en" ? "Select Status" : "اختر الحالة"}
                          </h4>
                          {filters.status.length > 0 && (
                            <Button 
                              size="sm" 
                              variant="light" 
                              className="text-xs h-6 px-2 text-gray-500"
                              onPress={() => setFilters(prev => ({ ...prev, status: [] }))}
                            >
                              {language === "en" ? "Clear" : "مسح"}
                            </Button>
                          )}
                        </div>
                        <CheckboxGroup
                          value={filters.status}
                          onValueChange={(values) => setFilters(prev => ({ ...prev, status: values }))}
                          className="gap-2"
                        >
                          {statusOptions.map((status) => (
                            <Checkbox 
                              key={status.key} 
                              value={status.key}
                              className="data-[selected=true]:text-blue-600"
                            >
                              <span className="ml-1">{status.label[language]}</span>
                            </Checkbox>
                          ))}
                        </CheckboxGroup>
                        
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                          <Button 
                            size="sm" 
                            color="primary"
                            className="font-medium px-4 h-8"
                            onPress={() => document.body.click()} // Close popover
                          >
                            {language === "en" ? "Apply" : "تطبيق"}
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Active Filters Display - Enhanced with beautiful chips */}
        <AnimatePresence>
          {(filters.departments.length > 0 || 
            filters.locations.length > 0 || 
            filters.dateRange || 
            filters.jobTypes.length > 0 || 
            filters.status.length > 0) && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap gap-2 items-center"
            >
              <span className="text-sm text-gray-500 mr-1">
                {language === "en" ? "Active filters:" : "الفلاتر النشطة:"}
              </span>
              
              {filters.dateRange && (
                <Chip 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  className="bg-blue-100 text-blue-700 border border-blue-200 font-medium"
                  onClose={() => setFilters(prev => ({ ...prev, dateRange: "" }))}
                  startContent={<Icon icon="lucide:calendar" className="w-3 h-3" />}
                  closeButton={
                    <div className="rounded-full bg-blue-200/50 text-blue-700 p-0.5">
                      <Icon icon="lucide:x" className="w-3 h-3" />
                    </div>
                  }
                >
                  {dateRangeOptions.find(opt => opt.key === filters.dateRange)?.label[language]}
                </Chip>
              )}
              
              {filters.departments.map(dept => (
                <Chip 
                  key={`dept-${dept}`} 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  className="bg-blue-100 text-blue-700 border border-blue-200 font-medium"
                  onClose={() => handleRemoveFilter('departments', dept)}
                  startContent={<Icon icon="lucide:briefcase" className="w-3 h-3" />}
                  closeButton={
                    <div className="rounded-full bg-blue-200/50 text-blue-700 p-0.5">
                      <Icon icon="lucide:x" className="w-3 h-3" />
                    </div>
                  }
                >
                  {departments.find(d => d.key === dept)?.label[language]}
                </Chip>
              ))}
              
              {filters.locations.map(loc => (
                <Chip 
                  key={`loc-${loc}`} 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  className="bg-blue-100 text-blue-700 border border-blue-200 font-medium"
                  onClose={() => handleRemoveFilter('locations', loc)}
                  startContent={<Icon icon="lucide:map-pin" className="w-3 h-3" />}
                  closeButton={
                    <div className="rounded-full bg-blue-200/50 text-blue-700 p-0.5">
                      <Icon icon="lucide:x" className="w-3 h-3" />
                    </div>
                  }
                >
                  {locations.find(l => l.key === loc)?.label[language]}
                </Chip>
              ))}
              
              {filters.jobTypes.map(type => (
                <Chip 
                  key={`type-${type}`} 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  className="bg-blue-100 text-blue-700 border border-blue-200 font-medium"
                  onClose={() => handleRemoveFilter('jobTypes', type)}
                  startContent={<Icon icon="lucide:clock" className="w-3 h-3" />}
                  closeButton={
                    <div className="rounded-full bg-blue-200/50 text-blue-700 p-0.5">
                      <Icon icon="lucide:x" className="w-3 h-3" />
                    </div>
                  }
                >
                  {jobTypes.find(t => t.key === type)?.label[language]}
                </Chip>
              ))}
              
              {filters.status.map(stat => (
                <Chip 
                  key={`status-${stat}`} 
                  size="sm" 
                  variant="flat" 
                  color="primary"
                  className="bg-blue-100 text-blue-700 border border-blue-200 font-medium"
                  onClose={() => handleRemoveFilter('status', stat)}
                  startContent={<Icon icon="lucide:activity" className="w-3 h-3" />}
                  closeButton={
                    <div className="rounded-full bg-blue-200/50 text-blue-700 p-0.5">
                      <Icon icon="lucide:x" className="w-3 h-3" />
                    </div>
                  }
                >
                  {statusOptions.find(s => s.key === stat)?.label[language]}
                </Chip>
              ))}
              
              {activeFilterCount > 0 && (
                <Button 
                  size="sm" 
                  variant="light" 
                  className="text-xs h-7 px-2 ml-1 text-blue-600"
                  onPress={clearAllFilters}
                  startContent={<Icon icon="lucide:trash-2" className="w-3 h-3" />}
                >
                  {language === "en" ? "Clear all" : "مسح الكل"}
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};