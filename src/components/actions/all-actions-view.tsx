import React from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Button, 
  Checkbox, 
  Chip, 
  Dropdown, 
  DropdownTrigger, 
  DropdownMenu, 
  DropdownItem,
  Input,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  Badge,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab,
} from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { ActionFilters } from "./action-filters";
import { BatchActionsToolbar } from "./batch-actions-toolbar";
import { ActionItemDetails } from "./action-item-details";
import { AIActionAssistant } from "./ai-action-assistant";

interface ActionItem {
  id: string;
  type: string;
  label: { en: string; ar: string };
  description?: { en: string; ar: string };
  dueDate: string;
  status: string;
  statusColor: "primary" | "warning" | "danger" | "success" | "default";
  priority: "high" | "medium" | "low";
  assignee: {
    name: { en: string; ar: string };
    avatar?: string;
  };
  department: string;
  aiNote?: { en: string; ar: string };
  actionType: "review" | "approve" | "screen" | "interview" | "offer";
}

export const AllActionsView: React.FC = () => {
  const { language, direction } = useAppContext();
  const [actions, setActions] = React.useState<ActionItem[]>(MOCK_ACTIONS);
  const [selectedActions, setSelectedActions] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const [view, setView] = React.useState<"list" | "cards" | "kanban">("list");
  const [filterCriteria, setFilterCriteria] = React.useState<any>({});
  const [sortConfig, setSortConfig] = React.useState({ key: "dueDate", direction: "asc" });
  const [detailItem, setDetailItem] = React.useState<string | null>(null);
  const [showAIAssistant, setShowAIAssistant] = React.useState(false);
  const [aiSuggestions, setAiSuggestions] = React.useState<{item: string, suggestion: string}[]>([]);
  const [pulseAnimation, setPulseAnimation] = React.useState(true);
  const [completedItemIds, setCompletedItemIds] = React.useState<Set<string>>(new Set());
  
  // Modal for confirming actions
  const {isOpen: isConfirmModalOpen, onOpen: openConfirmModal, onClose: closeConfirmModal} = useDisclosure();
  const [actionToConfirm, setActionToConfirm] = React.useState<{type: string, items: string[]}>({type: "", items: []});
  
  // Stats
  const stats = {
    total: actions.length,
    urgent: actions.filter(a => a.status === "Urgent").length,
    dueSoon: actions.filter(a => a.status === "Due Soon").length,
    completed: actions.filter(a => a.status === "Completed").length,
    overdue: actions.filter(a => a.status === "Overdue").length,
  };
  
  // Items per page
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(actions.length / ITEMS_PER_PAGE);
  
  const currentItems = actions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  
  React.useEffect(() => {
    // Simulate AI generating suggestions after 2 seconds
    const timer = setTimeout(() => {
      const suggestions = [
        {
          item: "req-001",
          suggestion: language === "en" 
            ? "This requisition has been pending for 5 days. Approving now could accelerate the hiring process by 3 days." 
            : "هذا الطلب معلق منذ 5 أيام. الموافقة الآن يمكن أن تسرع عملية التوظيف بمقدار 3 أيام."
        },
        {
          item: "off-011",
          suggestion: language === "en" 
            ? "Competitive offers typically close within 48 hours. Expedite approval to increase acceptance probability." 
            : "عادة ما يتم إغلاق العروض التنافسية في غضون 48 ساعة. تسريع الموافقة لزيادة احتمالية القبول."
        }
      ];
      setAiSuggestions(suggestions);
    }, 2000);
    
    // Turn off pulse animation after 5 seconds
    const pulseTimer = setTimeout(() => {
      setPulseAnimation(false);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, [language]);

  const handleViewChange = (newView: "list" | "cards" | "kanban") => {
    setView(newView);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const allIds = new Set(currentItems.map(item => item.id));
      setSelectedActions(allIds);
    } else {
      setSelectedActions(new Set());
    }
  };

  const handleSelectItem = (itemId: string, isSelected: boolean) => {
    const newSelected = new Set(selectedActions);
    
    if (isSelected) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    
    setSelectedActions(newSelected);
  };
  
  const handleSort = (column: string) => {
    const isAsc = sortConfig.key === column && sortConfig.direction === "asc";
    setSortConfig({ key: column, direction: isAsc ? "desc" : "asc" });
    
    // Apply sorting to the actions array
    const sortedActions = [...actions].sort((a: any, b: any) => {
      if (column === "dueDate") {
        return isAsc
          ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
          : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      }
      
      // String comparison for other fields
      if (a[column] < b[column]) return isAsc ? -1 : 1;
      if (a[column] > b[column]) return isAsc ? 1 : -1;
      return 0;
    });
    
    setActions(sortedActions);
  };
  
  const handleAction = (actionType: string, itemIds: string[] = []) => {
    // If no specific items provided, use selected items
    const targetItems = itemIds.length > 0 ? itemIds : Array.from(selectedActions);
    
    if (targetItems.length === 0) return;
    
    setActionToConfirm({
      type: actionType,
      items: targetItems
    });
    
    openConfirmModal();
  };
  
  const executeAction = () => {
    const { type, items } = actionToConfirm;
    
    // In a real application, this would call an API
    console.log(`Executing ${type} on items:`, items);
    
    // For demo purposes, let's mark the items as completed
    const newCompletedIds = new Set(completedItemIds);
    items.forEach(id => newCompletedIds.add(id));
    setCompletedItemIds(newCompletedIds);
    
    // Clear selections after action
    setSelectedActions(new Set());
    closeConfirmModal();
  };
  
  const getItemStatus = (item: ActionItem) => {
    // Check if the item is marked as completed
    if (completedItemIds.has(item.id)) {
      return {
        status: "Completed",
        statusColor: "success" as const
      };
    }
    
    return {
      status: item.status,
      statusColor: item.statusColor
    };
  };
  
  const handleShowDetails = (itemId: string) => {
    setDetailItem(itemId);
  };
  
  const handleCloseDetails = () => {
    setDetailItem(null);
  };
  
  const renderActionIcon = (actionType: string) => {
    const icons = {
      review: "lucide:file-text",
      approve: "lucide:check-circle",
      screen: "lucide:user",
      interview: "lucide:calendar",
      offer: "lucide:mail"
    };
    
    return icons[actionType as keyof typeof icons] || "lucide:activity";
  };
  
  const renderStatusBadge = (status: string, color: "primary" | "warning" | "danger" | "success" | "default") => {
    const icons = {
      "Urgent": "lucide:alert-circle",
      "Due Soon": "lucide:clock",
      "Completed": "lucide:check-circle",
      "Scheduled": "lucide:calendar",
      "Overdue": "lucide:x-circle",
      "In Progress": "lucide:loader",
      "Pending": "lucide:clock"
    };
    
    return (
      <Chip 
        size="sm" 
        color={color}
        variant={color === "success" ? "solid" : "flat"}
        startContent={
          <Icon 
            icon={icons[status as keyof typeof icons] || "lucide:info"} 
            className="w-3 h-3" 
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
  
  const renderPriorityIndicator = (priority: string) => {
    const colors = {
      high: "text-danger",
      medium: "text-warning",
      low: "text-success"
    };
    
    const dots = {
      high: 3,
      medium: 2,
      low: 1
    };
    
    return (
      <div className="flex flex-col items-center">
        {Array.from({ length: dots[priority as keyof typeof dots] }).map((_, i) => (
          <div 
            key={i} 
            className={`w-1 h-1 rounded-full ${colors[priority as keyof typeof colors]} mb-0.5`} 
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-background min-h-screen"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center">
              <Button
                variant="light"
                size="sm"
                isIconOnly
                className="mr-3"
                as="a"
                href="#dashboard"
              >
                <Icon icon="lucide:arrow-left" className="w-4 h-4 text-gray-500" />
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">
                {language === "en" ? "Recruitment Actions" : "إجراءات التوظيف"}
              </h1>
            </div>
            <p className="text-gray-500 mt-1">
              {language === "en" 
                ? "Manage and track all your pending recruitment activities" 
                : "إدارة وتتبع جميع أنشطة التوظيف المعلقة"}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Tooltip 
              content={language === "en" ? "AI Assistant" : "مساعد الذكاء الاصطناعي"}
              placement="bottom"
            >
              <div className="relative">
                {pulseAnimation && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      boxShadow: [
                        "0 0 0 0 rgba(59, 130, 246, 0.7)",
                        "0 0 0 8px rgba(59, 130, 246, 0)",
                        "0 0 0 0 rgba(59, 130, 246, 0.7)"
                      ]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 1.5,
                      ease: "easeOut" 
                    }}
                  />
                )}
                <Button 
                  isIconOnly
                  color="primary"
                  variant={showAIAssistant ? "solid" : "light"}
                  className={showAIAssistant ? "bg-blue-600" : ""}
                  onPress={() => setShowAIAssistant(!showAIAssistant)}
                >
                  <Icon icon="lucide:sparkles" className="w-4 h-4" />
                </Button>
              </div>
            </Tooltip>
            
            <Button 
              color="primary"
              variant="solid"
              className="bg-gradient-to-r from-blue-600 to-blue-700 border-none shadow-md"
              startContent={<Icon icon="lucide:plus" className="w-4 h-4" />}
            >
              {language === "en" ? "Create Action" : "إنشاء إجراء"}
            </Button>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{language === "en" ? "Total Actions" : "إجمالي الإجراءات"}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</h3>
              </div>
              <div className="bg-gray-100 rounded-lg p-2">
                <Icon icon="lucide:list" className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{language === "en" ? "Urgent" : "عاجل"}</p>
                <h3 className="text-2xl font-bold text-red-600 mt-1">{stats.urgent}</h3>
              </div>
              <div className="bg-red-50 rounded-lg p-2">
                <Icon icon="lucide:alert-circle" className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{language === "en" ? "Due Soon" : "مستحق قريباً"}</p>
                <h3 className="text-2xl font-bold text-amber-500 mt-1">{stats.dueSoon}</h3>
              </div>
              <div className="bg-amber-50 rounded-lg p-2">
                <Icon icon="lucide:clock" className="w-5 h-5 text-amber-500" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{language === "en" ? "Completed" : "مكتمل"}</p>
                <h3 className="text-2xl font-bold text-green-600 mt-1">{stats.completed}</h3>
              </div>
              <div className="bg-green-50 rounded-lg p-2">
                <Icon icon="lucide:check-circle" className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{language === "en" ? "Overdue" : "متأخر"}</p>
                <h3 className="text-2xl font-bold text-purple-600 mt-1">{stats.overdue}</h3>
              </div>
              <div className="bg-purple-50 rounded-lg p-2">
                <Icon icon="lucide:hourglass" className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col xl:flex-row gap-6">
          <div className={`flex-1 ${showAIAssistant ? 'xl:w-3/4' : 'w-full'}`}>
            {/* Filters & View Toggles */}
            <div className="bg-white rounded-xl border border-gray-100 p-5 mb-6 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4">
                <div className="flex flex-wrap gap-2 items-center">
                  <Input
                    placeholder={language === "en" ? "Search actions..." : "البحث في الإجراءات..."}
                    startContent={<Icon icon="lucide:search" className="w-4 h-4 text-gray-400" />}
                    className="w-full md:w-auto md:min-w-[300px]"
                    size="sm"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <ActionFilters 
                    language={language} 
                    onFilterChange={setFilterCriteria}
                  />
                  
                  <div className="bg-gray-100 rounded-lg p-1 flex">
                    <Tooltip content={language === "en" ? "List View" : "عرض القائمة"}>
                      <Button 
                        isIconOnly
                        variant={view === "list" ? "solid" : "light"}
                        size="sm"
                        onPress={() => handleViewChange("list")}
                      >
                        <Icon icon="lucide:list" className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content={language === "en" ? "Card View" : "عرض البطاقات"}>
                      <Button 
                        isIconOnly
                        variant={view === "cards" ? "solid" : "light"}
                        size="sm"
                        onPress={() => handleViewChange("cards")}
                      >
                        <Icon icon="lucide:grid" className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                    
                    <Tooltip content={language === "en" ? "Kanban View" : "عرض كانبان"}>
                      <Button 
                        isIconOnly
                        variant={view === "kanban" ? "solid" : "light"}
                        size="sm"
                        onPress={() => handleViewChange("kanban")}
                      >
                        <Icon icon="lucide:layout" className="w-4 h-4" />
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            </div>

            {/* Batch Actions Toolbar - Only show when items are selected */}
            <AnimatePresence>
              {selectedActions.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <BatchActionsToolbar 
                    selectedCount={selectedActions.size}
                    onAction={handleAction}
                    language={language}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Table View */}
            {view === "list" && (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <Table 
                  removeWrapper 
                  selectionMode="multiple"
                  selectedKeys={selectedActions}
                  onSelectionChange={(keys) => setSelectedActions(keys as Set<string>)}
                  onRowAction={(key) => handleShowDetails(key as string)}
                  aria-label="Recruitment Actions Table"
                >
                  <TableHeader>
                    <TableColumn key="priority" width={60}>
                      {language === "en" ? "PRIORITY" : "الأولوية"}
                    </TableColumn>
                    <TableColumn key="type" width={130}>
                      {language === "en" ? "TYPE" : "النوع"}
                    </TableColumn>
                    <TableColumn key="label">
                      {language === "en" ? "ACTION" : "الإجراء"}
                    </TableColumn>
                    <TableColumn key="status" width={140}>
                      {language === "en" ? "STATUS" : "الحالة"}
                    </TableColumn>
                    <TableColumn key="dueDate" width={120}>
                      <div className="flex items-center cursor-pointer" onClick={() => handleSort("dueDate")}>
                        <span>{language === "en" ? "DUE DATE" : "تاريخ الاستحقاق"}</span>
                        <Icon 
                          icon={
                            sortConfig.key === "dueDate"
                              ? sortConfig.direction === "asc"
                                ? "lucide:arrow-up"
                                : "lucide:arrow-down"
                              : "lucide:arrow-up-down"
                          }
                          className="w-3 h-3 ml-1"
                        />
                      </div>
                    </TableColumn>
                    <TableColumn key="assignee" width={160}>
                      {language === "en" ? "ASSIGNEE" : "المكلف"}
                    </TableColumn>
                    <TableColumn key="actions" width={120} align="center">
                      {language === "en" ? "ACTIONS" : "الإجراءات"}
                    </TableColumn>
                  </TableHeader>
                  <TableBody 
                    emptyContent={language === "en" ? "No actions found" : "لم يتم العثور على إجراءات"}
                    items={currentItems}
                  >
                    {(item) => {
                      const itemStatus = getItemStatus(item);
                      const hasAiSuggestion = aiSuggestions.some(s => s.item === item.id);
                      
                      return (
                        <TableRow key={item.id} className="cursor-pointer">
                          <TableCell>
                            <div className="flex justify-center">
                              {renderPriorityIndicator(item.priority)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-2`}>
                                <Icon icon={renderActionIcon(item.actionType)} className="w-4 h-4 text-blue-600" />
                              </div>
                              <span className="text-sm">
                                {item.type === "requisition" ? (language === "en" ? "Requisition" : "طلب") :
                                 item.type === "candidate" ? (language === "en" ? "Candidate" : "مرشح") :
                                 item.type === "interview" ? (language === "en" ? "Interview" : "مقابلة") :
                                 item.type === "offer" ? (language === "en" ? "Offer" : "عرض") :
                                 item.type}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="flex-1 mr-2">
                                <p className="font-medium text-gray-800 flex items-center">
                                  {language === "en" ? item.label.en : item.label.ar}
                                  
                                  {hasAiSuggestion && (
                                    <Tooltip content={language === "en" ? "AI suggestion available" : "اقتراح الذكاء الاصطناعي متاح"}>
                                      <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="ml-2"
                                      >
                                        <Icon icon="lucide:sparkles" className="text-blue-500 w-4 h-4" />
                                      </motion.span>
                                    </Tooltip>
                                  )}
                                </p>
                                
                                {item.description && (
                                  <p className="text-xs text-gray-500 max-w-md truncate">
                                    {language === "en" ? item.description.en : item.description.ar}
                                  </p>
                                )}
                              </div>
                              
                              {item.department && (
                                <Badge size="sm" variant="flat" color="default" className="bg-gray-100">
                                  {item.department}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            {renderStatusBadge(itemStatus.status, itemStatus.statusColor)}
                          </TableCell>
                          <TableCell>
                            <div className={`text-sm ${itemStatus.status === "Overdue" ? "text-red-600 font-medium" : ""}`}>
                              {new Date(item.dueDate).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
                                month: "short",
                                day: "numeric"
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                {item.assignee.avatar ? (
                                  <img 
                                    src={item.assignee.avatar} 
                                    alt={language === "en" ? item.assignee.name.en : item.assignee.name.ar} 
                                    className="w-full h-full rounded-full object-cover"
                                  />
                                ) : (
                                  <span className="text-sm font-medium text-gray-600">
                                    {(language === "en" ? item.assignee.name.en : item.assignee.name.ar).charAt(0)}
                                  </span>
                                )}
                              </div>
                              <span className="text-sm">
                                {language === "en" ? item.assignee.name.en : item.assignee.name.ar}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-center space-x-2">
                              <Tooltip content={language === "en" ? "Quick Approve" : "موافقة سريعة"}>
                                <Button 
                                  isIconOnly 
                                  variant="light" 
                                  size="sm"
                                  onPress={(e) => {
                                    e.stopPropagation();
                                    handleAction("approve", [item.id]);
                                  }}
                                >
                                  <Icon icon="lucide:check" className="w-4 h-4 text-green-500" />
                                </Button>
                              </Tooltip>
                              <Tooltip content={language === "en" ? "View Details" : "عرض التفاصيل"}>
                                <Button 
                                  isIconOnly 
                                  variant="light" 
                                  size="sm"
                                  onPress={(e) => {
                                    e.stopPropagation();
                                    handleShowDetails(item.id);
                                  }}
                                >
                                  <Icon icon="lucide:eye" className="w-4 h-4 text-blue-500" />
                                </Button>
                              </Tooltip>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    }}
                  </TableBody>
                </Table>
              </div>
            )}
            
            {/* Card View */}
            {view === "cards" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentItems.map(item => {
                  const itemStatus = getItemStatus(item);
                  const hasAiSuggestion = aiSuggestions.some(s => s.item === item.id);
                  
                  return (
                    <motion.div 
                      key={item.id}
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
                      layout
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mr-2 ${
                              item.type === "requisition" ? "bg-blue-100" : 
                              item.type === "candidate" ? "bg-green-100" : 
                              item.type === "interview" ? "bg-purple-100" : 
                              item.type === "offer" ? "bg-amber-100" : "bg-gray-100"
                            }`}>
                              <Icon icon={renderActionIcon(item.actionType)} className={`w-5 h-5 ${
                                item.type === "requisition" ? "text-blue-600" : 
                                item.type === "candidate" ? "text-green-600" : 
                                item.type === "interview" ? "text-purple-600" : 
                                item.type === "offer" ? "text-amber-600" : "text-gray-600"
                              }`} />
                            </div>
                            <span className="text-sm">
                              {item.type === "requisition" ? (language === "en" ? "Requisition" : "طلب") :
                              item.type === "candidate" ? (language === "en" ? "Candidate" : "مرشح") :
                              item.type === "interview" ? (language === "en" ? "Interview" : "مقابلة") :
                              item.type === "offer" ? (language === "en" ? "Offer" : "عرض") :
                              item.type}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              isSelected={selectedActions.has(item.id)}
                              onValueChange={(isSelected) => handleSelectItem(item.id, isSelected)}
                              size="sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                            {renderStatusBadge(itemStatus.status, itemStatus.statusColor)}
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-gray-800 mb-1 flex items-center">
                          {language === "en" ? item.label.en : item.label.ar}
                          
                          {hasAiSuggestion && (
                            <motion.span
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="ml-2"
                            >
                              <Icon icon="lucide:sparkles" className="text-blue-500 w-4 h-4" />
                            </motion.span>
                          )}
                        </h3>
                        
                        {item.description && (
                          <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                            {language === "en" ? item.description.en : item.description.ar}
                          </p>
                        )}
                        
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <Icon icon="lucide:calendar" className="w-4 h-4 text-gray-400 mr-1" />
                            <span className={`text-xs ${
                              itemStatus.status === "Overdue" ? "text-red-600 font-medium" : "text-gray-500"
                            }`}>
                              {new Date(item.dueDate).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })}
                            </span>
                          </div>
                          
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-1">
                              {item.assignee.avatar ? (
                                <img 
                                  src={item.assignee.avatar} 
                                  alt={language === "en" ? item.assignee.name.en : item.assignee.name.ar} 
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <span className="text-xs font-medium text-gray-600">
                                  {(language === "en" ? item.assignee.name.en : item.assignee.name.ar).charAt(0)}
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-gray-500">
                              {language === "en" ? item.assignee.name.en : item.assignee.name.ar}
                            </span>
                          </div>
                        </div>
                        
                        {hasAiSuggestion && (
                          <div className="bg-blue-50 border-l-2 border-blue-400 p-2 rounded mb-3">
                            <div className="flex">
                              <Icon icon="lucide:sparkles" className="w-3.5 h-3.5 text-blue-500 mr-1.5 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-blue-700 line-clamp-2">
                                {aiSuggestions.find(s => s.item === item.id)?.suggestion || ""}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Button 
                            size="sm"
                            color="primary"
                            variant="flat"
                            className="flex-1"
                            startContent={<Icon icon="lucide:check" className="w-4 h-4" />}
                            onPress={() => handleAction("approve", [item.id])}
                          >
                            {language === "en" ? "Approve" : "موافقة"}
                          </Button>
                          <Button 
                            size="sm"
                            color="default"
                            variant="flat"
                            className="flex-1"
                            startContent={<Icon icon="lucide:eye" className="w-4 h-4" />}
                            onPress={() => handleShowDetails(item.id)}
                          >
                            {language === "en" ? "Details" : "التفاصيل"}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
            
            {/* Kanban View */}
            {view === "kanban" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {["Urgent", "Due Soon", "Scheduled"].map((status) => {
                  const statusItems = currentItems.filter(item => {
                    const itemStatus = getItemStatus(item);
                    return itemStatus.status === status;
                  });
                  
                  const statusColor = 
                    status === "Urgent" ? "danger" : 
                    status === "Due Soon" ? "warning" : 
                    status === "Scheduled" ? "success" : 
                    "default";
                  
                  const statusColorBg = 
                    status === "Urgent" ? "bg-red-50" : 
                    status === "Due Soon" ? "bg-amber-50" : 
                    status === "Scheduled" ? "bg-green-50" : 
                    "bg-gray-50";
                  
                  return (
                    <div key={status} className={`${statusColorBg} rounded-xl border border-gray-100 p-4 shadow-sm`}>
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800">
                            {status === "Urgent" ? (language === "en" ? "Urgent" : "عاجل") : 
                             status === "Due Soon" ? (language === "en" ? "Due Soon" : "مستحق قريباً") : 
                             status === "Scheduled" ? (language === "en" ? "Scheduled" : "مجدول") : status}
                          </h3>
                          <Badge size="sm" className="ml-2" color={statusColor as any} variant="flat">
                            {statusItems.length}
                          </Badge>
                        </div>
                        <Icon 
                          icon={
                            status === "Urgent" ? "lucide:alert-circle" : 
                            status === "Due Soon" ? "lucide:clock" : 
                            "lucide:calendar"
                          } 
                          className={`w-4 h-4 ${
                            status === "Urgent" ? "text-red-500" : 
                            status === "Due Soon" ? "text-amber-500" : 
                            "text-green-500"
                          }`} 
                        />
                      </div>
                      
                      <div className="space-y-3 min-h-[300px]">
                        {statusItems.length > 0 ? (
                          statusItems.map(item => {
                            const hasAiSuggestion = aiSuggestions.some(s => s.item === item.id);
                            
                            return (
                              <motion.div 
                                key={item.id}
                                whileHover={{ y: -2 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm cursor-pointer"
                                onClick={() => handleShowDetails(item.id)}
                                layout
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <div className={`px-2 py-1 rounded-md text-xs ${
                                    item.type === "requisition" ? "bg-blue-100 text-blue-700" : 
                                    item.type === "candidate" ? "bg-green-100 text-green-700" : 
                                    item.type === "interview" ? "bg-purple-100 text-purple-700" : 
                                    item.type === "offer" ? "bg-amber-100 text-amber-700" : 
                                    "bg-gray-100 text-gray-700"
                                  }`}>
                                    {item.type === "requisition" ? (language === "en" ? "Requisition" : "طلب") :
                                     item.type === "candidate" ? (language === "en" ? "Candidate" : "مرشح") :
                                     item.type === "interview" ? (language === "en" ? "Interview" : "مقابلة") :
                                     item.type === "offer" ? (language === "en" ? "Offer" : "عرض") :
                                     item.type}
                                  </div>
                                  
                                  <Checkbox
                                    isSelected={selectedActions.has(item.id)}
                                    onValueChange={(isSelected) => handleSelectItem(item.id, isSelected)}
                                    size="sm"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                </div>
                                
                                <h4 className="font-medium text-gray-800 text-sm mb-1 flex items-center">
                                  {language === "en" ? item.label.en : item.label.ar}
                                  
                                  {hasAiSuggestion && (
                                    <motion.span
                                      animate={{ scale: [1, 1.2, 1] }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                      className="ml-2"
                                    >
                                      <Icon icon="lucide:sparkles" className="text-blue-500 w-3.5 h-3.5" />
                                    </motion.span>
                                  )}
                                </h4>
                                
                                <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                                  <div className="flex items-center">
                                    <Icon icon="lucide:calendar" className="w-3.5 h-3.5 mr-1" />
                                    {new Date(item.dueDate).toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
                                      month: "short",
                                      day: "numeric"
                                    })}
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center mr-1">
                                      <span className="text-xs font-medium text-gray-600">
                                        {(language === "en" ? item.assignee.name.en : item.assignee.name.ar).charAt(0)}
                                      </span>
                                    </div>
                                    <span>
                                      {language === "en" ? item.assignee.name.en : item.assignee.name.ar}
                                    </span>
                                  </div>
                                </div>
                                
                                {hasAiSuggestion && (
                                  <div className="bg-blue-50 border-l-2 border-blue-400 p-2 rounded mb-2">
                                    <div className="flex">
                                      <Icon icon="lucide:sparkles" className="w-3 h-3 text-blue-500 mr-1 flex-shrink-0 mt-0.5" />
                                      <p className="text-xs text-blue-700 line-clamp-2">
                                        {aiSuggestions.find(s => s.item === item.id)?.suggestion || ""}
                                      </p>
                                    </div>
                                  </div>
                                )}
                                
                                <div className="flex justify-end">
                                  <Button 
                                    size="sm"
                                    variant="flat"
                                    color="primary"
                                    isIconOnly
                                    onPress={(e) => {
                                      e.stopPropagation();
                                      handleAction("approve", [item.id]);
                                    }}
                                  >
                                    <Icon icon="lucide:check" className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </motion.div>
                            );
                          })
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center py-8">
                            <div className="bg-white rounded-full p-4 mb-3">
                              <Icon 
                                icon={
                                  status === "Urgent" ? "lucide:alert-circle" : 
                                  status === "Due Soon" ? "lucide:clock" : 
                                  "lucide:calendar"
                                } 
                                className={`w-6 h-6 ${
                                  status === "Urgent" ? "text-red-200" : 
                                  status === "Due Soon" ? "text-amber-200" : 
                                  "text-green-200"
                                }`} 
                              />
                            </div>
                            <p className="text-sm text-gray-500">
                              {language === "en" ? "No actions here" : "لا توجد إجراءات هنا"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  total={totalPages}
                  initialPage={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                  showControls
                />
              </div>
            )}
          </div>
          
          {/* AI Assistant Panel */}
          <AnimatePresence>
            {showAIAssistant && (
              <motion.div 
                className="xl:w-80 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              >
                <AIActionAssistant 
                  language={language}
                  aiSuggestions={aiSuggestions}
                  onActionApply={(itemId) => {
                    handleAction("approve", [itemId]);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Item Detail Modal */}
      <Modal 
        isOpen={!!detailItem} 
        onClose={handleCloseDetails}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {language === "en" ? "Action Details" : "تفاصيل الإجراء"}
              </ModalHeader>
              <ModalBody>
                {detailItem && (
                  <ActionItemDetails 
                    itemId={detailItem}
                    actions={actions}
                    language={language}
                    onAction={handleAction}
                    isCompleted={completedItemIds.has(detailItem)}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                >
                  {language === "en" ? "Close" : "إغلاق"}
                </Button>
                {detailItem && !completedItemIds.has(detailItem) && (
                  <Button 
                    color="primary"
                    onPress={() => {
                      handleAction("approve", [detailItem]);
                      onClose();
                    }}
                  >
                    {language === "en" ? "Approve & Complete" : "موافقة وإكمال"}
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      {/* Confirm Action Modal */}
      <Modal isOpen={isConfirmModalOpen} onClose={closeConfirmModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {language === "en" ? "Confirm Action" : "تأكيد الإجراء"}
              </ModalHeader>
              <ModalBody>
                <p>
                  {language === "en" 
                    ? `Are you sure you want to ${actionToConfirm.type} ${actionToConfirm.items.length} item${actionToConfirm.items.length > 1 ? 's' : ''}?` 
                    : `هل أنت متأكد أنك تريد ${actionToConfirm.type} ${actionToConfirm.items.length} عنصر${actionToConfirm.items.length > 1 ? '' : ''}؟`}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {language === "en" 
                    ? "This action cannot be undone." 
                    : "لا يمكن التراجع عن هذا الإجراء."}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  {language === "en" ? "Cancel" : "إلغاء"}
                </Button>
                <Button 
                  color="primary" 
                  onPress={() => executeAction()}
                >
                  {language === "en" ? "Confirm" : "تأكيد"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.div>
  );
};

// Mock data for demo
const MOCK_ACTIONS: ActionItem[] = [
  {
    id: "req-001",
    type: "requisition",
    label: { en: "Senior Developer Requisition", ar: "طلب مطور أول" },
    description: { en: "Approval needed for opening a new senior developer position in the frontend team.", ar: "يلزم الموافقة على فتح منصب مطور أول جديد في فريق الواجهة الأمامية." },
    dueDate: "2023-07-15",
    status: "Urgent",
    statusColor: "danger",
    priority: "high",
    assignee: {
      name: { en: "John Davis", ar: "جون ديفيس" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=1"
    },
    department: "Engineering",
    aiNote: { en: "This requisition has been pending for 5 days.", ar: "هذا الطلب معلق منذ 5 أيام." },
    actionType: "approve"
  },
  {
    id: "cand-042",
    type: "candidate",
    label: { en: "Ahmed Hassan - Screening", ar: "أحمد حسن - الفرز" },
    description: { en: "Resume screening for Senior UI Designer position.", ar: "فحص السيرة الذاتية لمنصب كبير مصممي واجهة المستخدم." },
    dueDate: "2023-07-18",
    status: "Due Soon",
    statusColor: "warning",
    priority: "medium",
    assignee: {
      name: { en: "Sarah Johnson", ar: "سارة جونسون" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=2"
    },
    department: "Design",
    aiNote: { en: "Candidate has strong technical skills matching job requirements.", ar: "المرشح لديه مهارات تقنية قوية تتطابق مع متطلبات الوظيفة." },
    actionType: "screen"
  },
  {
    id: "int-023",
    type: "interview",
    label: { en: "Marketing Manager - Interview", ar: "مدير التسويق - المقابلة" },
    description: { en: "Schedule technical interview for Marketing Manager position.", ar: "جدولة مقابلة تقنية لمنصب مدير التسويق." },
    dueDate: "2023-07-20",
    status: "Scheduled",
    statusColor: "success",
    priority: "low",
    assignee: {
      name: { en: "Emma Rodriguez", ar: "إيما رودريغيز" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=3"
    },
    department: "Marketing",
    actionType: "interview"
  },
  {
    id: "off-011",
    type: "offer",
    label: { en: "Sarah Johnson - Offer Approval", ar: "سارة جونسون - الموافقة على العرض" },
    description: { en: "Approve offer letter for Senior Product Manager position.", ar: "الموافقة على خطاب عرض لمنصب مدير منتج أول." },
    dueDate: "2023-07-14",
    status: "Urgent",
    statusColor: "danger",
    priority: "high",
    assignee: {
      name: { en: "Michael Chen", ar: "مايكل تشن" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=4"
    },
    department: "Product",
    aiNote: { en: "This offer has been pending for 7 days.", ar: "هذا العرض معلق منذ 7 أيام." },
    actionType: "approve"
  },
  {
    id: "req-015",
    type: "requisition",
    label: { en: "Junior Backend Developer", ar: "مطور خلفية مبتدئ" },
    description: { en: "Review requisition for a junior backend developer position.", ar: "مراجعة طلب وظيفة مطور خلفية مبتدئ." },
    dueDate: "2023-07-22",
    status: "Scheduled",
    statusColor: "success",
    priority: "medium",
    assignee: {
      name: { en: "Jessica Lee", ar: "جيسيكا لي" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=5"
    },
    department: "Engineering",
    actionType: "review"
  },
  {
    id: "cand-078",
    type: "candidate",
    label: { en: "Maria Garcia - Technical Assessment", ar: "ماريا غارسيا - التقييم التقني" },
    description: { en: "Review technical assessment for Data Scientist role.", ar: "مراجعة التقييم التقني لدور عالم البيانات." },
    dueDate: "2023-07-16",
    status: "Due Soon",
    statusColor: "warning",
    priority: "high",
    assignee: {
      name: { en: "David Wilson", ar: "ديفيد ويلسون" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=6"
    },
    department: "Data Science",
    actionType: "review"
  },
  {
    id: "int-045",
    type: "interview",
    label: { en: "DevOps Engineer - Panel Interview", ar: "مهندس ديف أوبس - مقابلة لجنة" },
    description: { en: "Schedule panel interview for DevOps Engineer position.", ar: "جدولة مقابلة لجنة لمنصب مهندس ديف أوبس." },
    dueDate: "2023-07-19",
    status: "Scheduled",
    statusColor: "success",
    priority: "medium",
    assignee: {
      name: { en: "Robert Smith", ar: "روبرت سميث" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=7"
    },
    department: "Infrastructure",
    actionType: "interview"
  },
  {
    id: "off-024",
    type: "offer",
    label: { en: "James Wilson - Offer Letter", ar: "جيمس ويلسون - خطاب العرض" },
    description: { en: "Approve offer letter for UX Designer position.", ar: "الموافقة على خطاب العرض لمنصب مصمم تجربة المستخدم." },
    dueDate: "2023-07-17",
    status: "Due Soon",
    statusColor: "warning",
    priority: "high",
    assignee: {
      name: { en: "Olivia Johnson", ar: "أوليفيا جونسون" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=8"
    },
    department: "Design",
    actionType: "approve"
  },
  {
    id: "req-032",
    type: "requisition",
    label: { en: "Content Writer", ar: "كاتب محتوى" },
    description: { en: "Review job requisition for a Content Writer position.", ar: "مراجعة طلب وظيفة كاتب محتوى." },
    dueDate: "2023-07-25",
    status: "Scheduled",
    statusColor: "success",
    priority: "low",
    assignee: {
      name: { en: "Thomas Brown", ar: "توماس براون" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=9"
    },
    department: "Marketing",
    actionType: "review"
  },
  {
    id: "cand-103",
    type: "candidate",
    label: { en: "John Smith - Reference Check", ar: "جون سميث - التحقق من المراجع" },
    description: { en: "Conduct reference check for Project Manager candidate.", ar: "إجراء التحقق من مراجع مرشح مدير المشروع." },
    dueDate: "2023-07-13",
    status: "Overdue",
    statusColor: "danger",
    priority: "high",
    assignee: {
      name: { en: "Amanda Clark", ar: "أماندا كلارك" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=10"
    },
    department: "Project Management",
    actionType: "screen"
  },
  {
    id: "int-067",
    type: "interview",
    label: { en: "Finance Analyst - Final Interview", ar: "محلل مالي - المقابلة النهائية" },
    description: { en: "Schedule final interview for Finance Analyst position.", ar: "جدولة المقابلة النهائية لمنصب محلل مالي." },
    dueDate: "2023-07-21",
    status: "Scheduled",
    statusColor: "success",
    priority: "medium",
    assignee: {
      name: { en: "Daniel Martinez", ar: "دانيال مارتينيز" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=11"
    },
    department: "Finance",
    actionType: "interview"
  },
  {
    id: "off-039",
    type: "offer",
    label: { en: "Lisa Wang - Offer Negotiation", ar: "ليزا وانغ - تفاوض العرض" },
    description: { en: "Review and approve updated offer for Technical Lead position.", ar: "مراجعة والموافقة على العرض المحدث لمنصب قائد تقني." },
    dueDate: "2023-07-13",
    status: "Overdue",
    statusColor: "danger",
    priority: "high",
    assignee: {
      name: { en: "Kevin Taylor", ar: "كيفن تايلور" },
      avatar: "https://img.heroui.chat/image/avatar?w=100&h=100&u=12"
    },
    department: "Engineering",
    actionType: "approve"
  }
];