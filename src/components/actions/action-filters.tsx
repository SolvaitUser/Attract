import React from "react";
import { 
  Button, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  CheckboxGroup,
  Checkbox,
  Divider
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface ActionFiltersProps {
  language: "en" | "ar";
  onFilterChange: (filters: any) => void;
}

export const ActionFilters: React.FC<ActionFiltersProps> = ({ language, onFilterChange }) => {
  const [dateRange, setDateRange] = React.useState<string>("");
  const [departments, setDepartments] = React.useState<string[]>([]);
  const [priority, setPriority] = React.useState<string[]>([]);
  const [actionTypes, setActionTypes] = React.useState<string[]>([]);
  const [assignees, setAssignees] = React.useState<string[]>([]);

  React.useEffect(() => {
    onFilterChange({
      dateRange,
      departments,
      priority,
      actionTypes,
      assignees
    });
  }, [dateRange, departments, priority, actionTypes, assignees, onFilterChange]);

  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
  };

  return (
    <>
      {/* Date Range Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            size="sm"
            variant="flat"
            className={`font-normal ${dateRange ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-white"}`}
            startContent={<Icon icon="lucide:calendar" className="w-3.5 h-3.5" />}
            endContent={<Icon icon="lucide:chevron-down" className="w-3.5 h-3.5" />}
          >
            {dateRange ? (
              dateRange === "today" ? (language === "en" ? "Today" : "اليوم") : 
              dateRange === "thisWeek" ? (language === "en" ? "This Week" : "هذا الأسبوع") :
              dateRange === "thisMonth" ? (language === "en" ? "This Month" : "هذا الشهر") :
              dateRange === "overdue" ? (language === "en" ? "Overdue" : "متأخر") :
              ""
            ) : (language === "en" ? "Date Range" : "النطاق الزمني")}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Date Range Options"
          selectedKeys={dateRange ? [dateRange] : []}
          selectionMode="single"
          onSelectionChange={(keys) => {
            const selected = Array.from(keys)[0]?.toString();
            if (selected) setDateRange(selected);
          }}
        >
          <DropdownItem key="today">
            {language === "en" ? "Today" : "اليوم"}
          </DropdownItem>
          <DropdownItem key="thisWeek">
            {language === "en" ? "This Week" : "هذا الأسبوع"}
          </DropdownItem>
          <DropdownItem key="thisMonth">
            {language === "en" ? "This Month" : "هذا الشهر"}
          </DropdownItem>
          <DropdownItem key="overdue">
            {language === "en" ? "Overdue" : "متأخر"}
          </DropdownItem>
          {dateRange && (
            <>
              <Divider />
              <DropdownItem key="clear" onPress={() => setDateRange("")}>
                {language === "en" ? "Clear" : "مسح"}
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>

      {/* Department Filter */}
      <Popover placement="bottom">
        <PopoverTrigger>
          <Button 
            size="sm"
            variant="flat"
            className={`font-normal ${departments.length > 0 ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-white"}`}
            startContent={<Icon icon="lucide:briefcase" className="w-3.5 h-3.5" />}
            endContent={
              <>
                <Icon icon="lucide:chevron-down" className="w-3.5 h-3.5" />
                {departments.length > 0 && (
                  <span className="ml-1 bg-blue-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {departments.length}
                  </span>
                )}
              </>
            }
          >
            {language === "en" ? "Department" : "القسم"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="p-2">
            <h4 className="text-sm font-medium mb-2">
              {language === "en" ? "Select Departments" : "اختر الأقسام"}
            </h4>
            <CheckboxGroup
              value={departments}
              onValueChange={setDepartments}
            >
              <Checkbox value="engineering">
                {language === "en" ? "Engineering" : "الهندسة"}
              </Checkbox>
              <Checkbox value="design">
                {language === "en" ? "Design" : "التصميم"}
              </Checkbox>
              <Checkbox value="marketing">
                {language === "en" ? "Marketing" : "التسويق"}
              </Checkbox>
              <Checkbox value="finance">
                {language === "en" ? "Finance" : "المالية"}
              </Checkbox>
              <Checkbox value="hr">
                {language === "en" ? "HR" : "الموارد البشرية"}
              </Checkbox>
            </CheckboxGroup>
            {departments.length > 0 && (
              <>
                <Divider className="my-2" />
                <div className="flex justify-end">
                  <Button 
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => setDepartments([])}
                  >
                    {language === "en" ? "Clear" : "مسح"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>

      {/* Priority Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            size="sm"
            variant="flat"
            className={`font-normal ${priority.length > 0 ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-white"}`}
            startContent={<Icon icon="lucide:flag" className="w-3.5 h-3.5" />}
            endContent={
              <>
                <Icon icon="lucide:chevron-down" className="w-3.5 h-3.5" />
                {priority.length > 0 && (
                  <span className="ml-1 bg-blue-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {priority.length}
                  </span>
                )}
              </>
            }
          >
            {language === "en" ? "Priority" : "الأولوية"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Priority Options"
          selectedKeys={new Set(priority)}
          selectionMode="multiple"
          onSelectionChange={(keys) => {
            setPriority(Array.from(keys) as string[]);
          }}
        >
          <DropdownItem key="high" startContent={
            <div className="w-2 h-2 rounded-full bg-red-500" />
          }>
            {language === "en" ? "High" : "عالية"}
          </DropdownItem>
          <DropdownItem key="medium" startContent={
            <div className="w-2 h-2 rounded-full bg-amber-500" />
          }>
            {language === "en" ? "Medium" : "متوسطة"}
          </DropdownItem>
          <DropdownItem key="low" startContent={
            <div className="w-2 h-2 rounded-full bg-green-500" />
          }>
            {language === "en" ? "Low" : "منخفضة"}
          </DropdownItem>
          {priority.length > 0 && (
            <>
              <Divider />
              <DropdownItem key="clear" onPress={() => setPriority([])}>
                {language === "en" ? "Clear" : "مسح"}
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>

      {/* Action Type Filter */}
      <Dropdown>
        <DropdownTrigger>
          <Button 
            size="sm"
            variant="flat"
            className={`font-normal ${actionTypes.length > 0 ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-white"}`}
            startContent={<Icon icon="lucide:activity" className="w-3.5 h-3.5" />}
            endContent={
              <>
                <Icon icon="lucide:chevron-down" className="w-3.5 h-3.5" />
                {actionTypes.length > 0 && (
                  <span className="ml-1 bg-blue-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {actionTypes.length}
                  </span>
                )}
              </>
            }
          >
            {language === "en" ? "Action Type" : "نوع الإجراء"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action Type Options"
          selectedKeys={new Set(actionTypes)}
          selectionMode="multiple"
          onSelectionChange={(keys) => {
            setActionTypes(Array.from(keys) as string[]);
          }}
        >
          <DropdownItem key="requisition" startContent={
            <Icon icon="lucide:file-text" className="w-3.5 h-3.5 text-blue-500" />
          }>
            {language === "en" ? "Requisition" : "طلب"}
          </DropdownItem>
          <DropdownItem key="candidate" startContent={
            <Icon icon="lucide:user" className="w-3.5 h-3.5 text-green-500" />
          }>
            {language === "en" ? "Candidate" : "مرشح"}
          </DropdownItem>
          <DropdownItem key="interview" startContent={
            <Icon icon="lucide:calendar" className="w-3.5 h-3.5 text-purple-500" />
          }>
            {language === "en" ? "Interview" : "مقابلة"}
          </DropdownItem>
          <DropdownItem key="offer" startContent={
            <Icon icon="lucide:mail" className="w-3.5 h-3.5 text-amber-500" />
          }>
            {language === "en" ? "Offer" : "عرض"}
          </DropdownItem>
          {actionTypes.length > 0 && (
            <>
              <Divider />
              <DropdownItem key="clear" onPress={() => setActionTypes([])}>
                {language === "en" ? "Clear" : "مسح"}
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>

      {/* More Filters Button */}
      <Popover placement="bottom-end">
        <PopoverTrigger>
          <Button 
            size="sm"
            variant="flat"
            className="bg-white font-normal"
            startContent={<Icon icon="lucide:sliders" className="w-3.5 h-3.5" />}
          >
            {language === "en" ? "More Filters" : "المزيد من الفلاتر"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64">
          <div className="p-2">
            <h4 className="text-sm font-medium mb-2">
              {language === "en" ? "Assignee" : "المكلف"}
            </h4>
            <CheckboxGroup
              value={assignees}
              onValueChange={setAssignees}
            >
              <Checkbox value="john">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-gray-600">J</span>
                  </div>
                  <span>{language === "en" ? "John Davis" : "جون ديفيس"}</span>
                </div>
              </Checkbox>
              <Checkbox value="sarah">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-gray-600">S</span>
                  </div>
                  <span>{language === "en" ? "Sarah Johnson" : "سارة جونسون"}</span>
                </div>
              </Checkbox>
              <Checkbox value="michael">
                <div className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                    <span className="text-xs font-medium text-gray-600">M</span>
                  </div>
                  <span>{language === "en" ? "Michael Chen" : "مايكل تشن"}</span>
                </div>
              </Checkbox>
            </CheckboxGroup>
            {assignees.length > 0 && (
              <>
                <Divider className="my-2" />
                <div className="flex justify-end">
                  <Button 
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={() => setAssignees([])}
                  >
                    {language === "en" ? "Clear" : "مسح"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};