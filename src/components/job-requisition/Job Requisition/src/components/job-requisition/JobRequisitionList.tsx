import React, { useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Pagination, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Checkbox, Tooltip, ButtonGroup } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { mockJobRequisitions } from "../../data/mockData";
import { ViewModeToggle } from "./ViewModeToggle";
import { CardView } from "./views/CardView";
import { CompactView } from "./views/CompactView";

interface JobRequisitionListProps {
  onView: (jobId: string) => void;
  onEdit: (jobId: string) => void;
  onShare: (jobId: string) => void;
}

export const JobRequisitionList: React.FC<JobRequisitionListProps> = ({ 
  onView, 
  onEdit,
  onShare
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [bulkActionOpen, setBulkActionOpen] = useState(false);
  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);
  
  // Add view mode state
  const [viewMode, setViewMode] = useState<"list" | "card" | "compact">("list");
  
  // Simulate pagination
  const pages = Math.ceil(mockJobRequisitions.length / rowsPerPage);
  const items = mockJobRequisitions.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return "default";
      case 'Pending Approval': return "warning";
      case 'Approved': return "success";
      case 'Published': return "primary";
      case 'Closed': return "danger";
      case 'Rejected': return "danger";
      default: return "default";
    }
  };
  
  const renderCell = (item: any, columnKey: string) => {
    switch (columnKey) {
      case "select":
        return (
          <Checkbox 
            isSelected={selectedKeys.has(item.id)} 
            onValueChange={(selected) => {
              const newSelection = new Set(selectedKeys);
              if (selected) {
                newSelection.add(item.id);
              } else {
                newSelection.delete(item.id);
              }
              setSelectedKeys(newSelection);
              setBulkActionOpen(newSelection.size > 0);
            }}
          />
        );
      case "title":
        return (
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-tiny text-default-500">{item.department}</p>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-2">
            <Icon icon="lucide:map-pin" className="text-default-400" width={14} />
            <span>{item.location}</span>
          </div>
        );
      case "status":
        return (
          <Chip color={getStatusColor(item.status)} variant="flat" size="sm">
            {item.status}
          </Chip>
        );
      case "createdAt":
        const date = new Date(item.createdAt);
        return (
          <div>
            <p className="text-xs">{date.toLocaleDateString()}</p>
            <p className="text-xs text-default-400">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-end gap-1">
            <Tooltip content={t.view}>
              <Button 
                isIconOnly 
                variant="light" 
                size="sm" 
                className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
                aria-label={t.view}
                onPress={() => onView(item.id)}
              >
                <Icon icon="lucide:eye" width={16} />
              </Button>
            </Tooltip>
            <Tooltip content={t.edit}>
              <Button 
                isIconOnly 
                variant="light" 
                size="sm" 
                className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
                aria-label={t.edit}
                onPress={() => onEdit(item.id)}
              >
                <Icon icon="lucide:edit" width={16} />
              </Button>
            </Tooltip>
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light" size="sm">
                  <Icon icon="lucide:more-vertical" width={16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Actions">
                <DropdownItem key="duplicate">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:copy" width={16} />
                    <span>{t.duplicate}</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="share" onPress={() => onShare(item.id)}>
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:share-2" width={16} />
                    <span>{t.share}</span>
                  </div>
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:trash-2" width={16} />
                    <span>{t.delete}</span>
                  </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return item[columnKey];
    }
  };
  
  // Add header row for list view
  const headerRow = (
    <div className="flex items-center bg-default-50 py-2 px-4 border-b sticky top-0 z-10">
      <div className="flex items-center w-16 justify-center">
        <Checkbox 
          isSelected={selectedKeys.size > 0 && selectedKeys.size === items.length}
          isIndeterminate={selectedKeys.size > 0 && selectedKeys.size < items.length}
          onValueChange={(selected) => {
            if (selected) {
              const allIds = items.map(item => item.id);
              setSelectedKeys(new Set(allIds));
              setBulkActionOpen(true);
            } else {
              setSelectedKeys(new Set([]));
              setBulkActionOpen(false);
            }
          }}
          aria-label={t.selectAll}
        />
      </div>
      <div className="flex-1 grid grid-cols-4 lg:grid-cols-5 gap-2">
        <div className="font-medium text-xs uppercase text-default-700">{t.jobTitle}</div>
        <div className="font-medium text-xs uppercase text-default-700 hidden sm:block">{t.location}</div>
        <div className="font-medium text-xs uppercase text-default-700">{t.status}</div>
        <div className="font-medium text-xs uppercase text-default-700 hidden md:block">{t.createdAt}</div>
        <div className="font-medium text-xs uppercase text-default-700 text-right hidden lg:block">{t.actions}</div>
      </div>
    </div>
  );
  
  // Add header with bulk actions
  const headerContent = (
    <div className="flex justify-between items-center p-4 border-b">
      <div className="flex items-center gap-2">
        {selectedKeys.size > 0 && (
          <span className="text-sm">{selectedKeys.size} {t.selected}</span>
        )}
      </div>
      
      {bulkActionOpen && (
        <div className="flex gap-2">
          <Button size="sm" variant="flat" color="primary" startContent={<Icon icon="lucide:download" width={16} />}>
            {t.export}
          </Button>
          <Button size="sm" variant="flat" color="danger" startContent={<Icon icon="lucide:trash-2" width={16} />}>
            {t.delete}
          </Button>
          <Button size="sm" variant="flat" startContent={<Icon icon="lucide:tag" width={16} />}>
            {t.changeStatus}
          </Button>
        </div>
      )}
      
      <ViewModeToggle currentView={viewMode} onChange={setViewMode} />
    </div>
  );
  
  // Render list row
  const renderListRow = (item: any) => (
    <div 
      key={item.id} 
      className="flex items-center border-b hover:bg-default-50 transition-colors py-2 px-4 cursor-pointer"
    >
      <div className="flex items-center w-16 justify-center">
        <Checkbox 
          isSelected={selectedKeys.has(item.id)} 
          onValueChange={(selected) => {
            const newSelection = new Set(selectedKeys);
            if (selected) {
              newSelection.add(item.id);
            } else {
              newSelection.delete(item.id);
            }
            setSelectedKeys(newSelection);
            setBulkActionOpen(newSelection.size > 0);
          }}
          aria-label={`Select ${item.title}`}
        />
      </div>
      <div className="flex-1 grid grid-cols-4 lg:grid-cols-5 gap-2">
        <div>
          <p className="font-medium truncate">{item.title}</p>
          <p className="text-tiny text-default-500">{item.department}</p>
        </div>
        <div className="hidden sm:flex items-center gap-1">
          <Icon icon="lucide:map-pin" className="text-default-400 flex-shrink-0" width={14} />
          <span className="truncate">{item.location}</span>
        </div>
        <div>
          <Chip color={getStatusColor(item.status)} variant="flat" size="sm">
            {item.status}
          </Chip>
        </div>
        <div className="hidden md:block">
          <p className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</p>
          <p className="text-xs text-default-400">{new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
        </div>
        <div className="hidden lg:flex justify-end gap-1">
          <Tooltip content={t.view}>
            <Button 
              isIconOnly 
              variant="light" 
              size="sm" 
              className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
              aria-label={t.view}
              onPress={() => onView(item.id)}
            >
              <Icon icon="lucide:eye" width={16} />
            </Button>
          </Tooltip>
          <Tooltip content={t.edit}>
            <Button 
              isIconOnly 
              variant="light" 
              size="sm" 
              className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
              aria-label={t.edit}
              onPress={() => onEdit(item.id)}
            >
              <Icon icon="lucide:edit" width={16} />
            </Button>
          </Tooltip>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm">
                <Icon icon="lucide:more-vertical" width={16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownItem key="duplicate">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:copy" width={16} />
                  <span>{t.duplicate}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="share" onPress={() => onShare(item.id)}>
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:share-2" width={16} />
                  <span>{t.share}</span>
                </div>
              </DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:trash-2" width={16} />
                  <span>{t.delete}</span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
  
  // Render list view
  const renderListView = () => (
    <div className="flex flex-col">
      {headerRow}
      <div className="flex flex-col">
        {items.length > 0 ? (
          items.map((item) => renderListRow(item))
        ) : (
          <div className="py-8 text-center text-default-400">
            {t.noJobRequisitions}
          </div>
        )}
      </div>
    </div>
  );
  
  // Render content based on view mode
  const renderContent = () => {
    switch (viewMode) {
      case "card":
        return <CardView 
          items={items}
          selectedKeys={selectedKeys} 
          onSelectionChange={setSelectedKeys}
          getStatusColor={getStatusColor}
          setBulkActionOpen={setBulkActionOpen}
          t={t}
          hoveredRowId={hoveredRowId}
          setHoveredRowId={setHoveredRowId}
          onView={onView}
          onEdit={onEdit}
        />;
      case "compact":
        return <CompactView 
          items={items}
          selectedKeys={selectedKeys} 
          onSelectionChange={setSelectedKeys}
          getStatusColor={getStatusColor}
          setBulkActionOpen={setBulkActionOpen}
          t={t}
          hoveredRowId={hoveredRowId}
          setHoveredRowId={setHoveredRowId}
          onView={onView}
          onEdit={onEdit}
        />;
      case "list":
      default:
        return renderListView();
    }
  };
  
  return (
    <div className="flex flex-col h-full">
      {headerContent}
      <div className="overflow-x-auto flex-grow relative">
        {viewMode === "list" && (
          <table className="min-w-full">
            <thead className="bg-default-50 sticky top-0">
              <tr>
                <th className="w-12 p-3">
                  <Checkbox 
                    isSelected={selectedKeys.size > 0 && selectedKeys.size === items.length}
                    isIndeterminate={selectedKeys.size > 0 && selectedKeys.size < items.length}
                    onValueChange={(selected) => {
                      if (selected) {
                        const allIds = items.map(item => item.id);
                        setSelectedKeys(new Set(allIds));
                        setBulkActionOpen(true);
                      } else {
                        setSelectedKeys(new Set([]));
                        setBulkActionOpen(false);
                      }
                    }}
                    aria-label={t.selectAll}
                  />
                </th>
                <th className="text-start p-3 font-medium text-xs uppercase text-default-700">{t.jobTitle}</th>
                <th className="text-start p-3 font-medium text-xs uppercase text-default-700 hidden sm:table-cell">{t.location}</th>
                <th className="text-start p-3 font-medium text-xs uppercase text-default-700">{t.status}</th>
                <th className="text-start p-3 font-medium text-xs uppercase text-default-700 hidden md:table-cell">{t.createdAt}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr 
                  key={item.id} 
                  className="border-b hover:bg-default-50 transition-colors relative"
                  onMouseEnter={() => setHoveredRowId(item.id)}
                  onMouseLeave={() => setHoveredRowId(null)}
                >
                  <td className="p-3 text-center">
                    <Checkbox 
                      isSelected={selectedKeys.has(item.id)} 
                      onValueChange={(selected) => {
                        const newSelection = new Set(selectedKeys);
                        if (selected) {
                          newSelection.add(item.id);
                        } else {
                          newSelection.delete(item.id);
                        }
                        setSelectedKeys(newSelection);
                        setBulkActionOpen(newSelection.size > 0);
                      }}
                      aria-label={`Select ${item.title}`}
                    />
                  </td>
                  <td className="p-3">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-default-500">{item.department}</p>
                  </td>
                  <td className="p-3 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Icon icon="lucide:map-pin" className="text-default-400" width={14} />
                      <span className="text-sm">{item.location}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <Chip 
                      color={getStatusColor(item.status)} 
                      variant="flat" 
                      size="sm"
                      classNames={{
                        base: "h-6",
                        content: "text-xs font-medium",
                      }}
                    >
                      {item.status}
                    </Chip>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <div>
                      <p className="text-xs">{new Date(item.createdAt).toLocaleDateString()}</p>
                      <p className="text-xs text-default-400">
                        {new Date(item.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </td>
                  
                  {/* Action buttons displayed on hover or selection */}
                  {(hoveredRowId === item.id || selectedKeys.has(item.id)) && (
                    <td className="absolute right-0 top-0 h-full">
                      <div className="flex items-center h-full">
                        <div className="flex items-center gap-1 bg-white border-l border-default-200 shadow-sm p-2 h-full">
                          <Tooltip content={t.view}>
                            <Button 
                              isIconOnly 
                              variant="light" 
                              size="sm" 
                              className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
                              aria-label={t.view}
                              onPress={() => onView(item.id)}
                            >
                              <Icon icon="lucide:eye" width={16} />
                            </Button>
                          </Tooltip>
                          <Tooltip content={t.edit}>
                            <Button 
                              isIconOnly 
                              variant="light" 
                              size="sm" 
                              className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
                              aria-label={t.edit}
                              onPress={() => onEdit(item.id)}
                            >
                              <Icon icon="lucide:edit" width={16} />
                            </Button>
                          </Tooltip>
                          <Tooltip content={t.share}>
                            <Button 
                              isIconOnly 
                              variant="light" 
                              size="sm" 
                              className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
                              aria-label={t.share}
                              onPress={() => onShare(item.id)}
                            >
                              <Icon icon="lucide:share-2" width={16} />
                            </Button>
                          </Tooltip>
                          <Tooltip content={t.duplicate}>
                            <Button 
                              isIconOnly 
                              variant="light" 
                              size="sm" 
                              className="min-w-8 w-8 h-8 bg-default-50 hover:bg-default-100"
                              aria-label={t.duplicate}
                            >
                              <Icon icon="lucide:copy" width={16} />
                            </Button>
                          </Tooltip>
                          <Tooltip content={t.delete} color="danger">
                            <Button 
                              isIconOnly 
                              variant="light" 
                              size="sm" 
                              className="min-w-8 w-8 h-8 bg-danger-50 hover:bg-danger-100 text-danger"
                              aria-label={t.delete}
                            >
                              <Icon icon="lucide:trash-2" width={16} />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        
        {viewMode === "card" && <CardView 
          items={items}
          selectedKeys={selectedKeys} 
          onSelectionChange={setSelectedKeys}
          getStatusColor={getStatusColor}
          setBulkActionOpen={setBulkActionOpen}
          t={t}
          hoveredRowId={hoveredRowId}
          setHoveredRowId={setHoveredRowId}
          onView={onView}
          onEdit={onEdit}
        />}
        
        {viewMode === "compact" && <CompactView 
          items={items}
          selectedKeys={selectedKeys} 
          onSelectionChange={setSelectedKeys}
          getStatusColor={getStatusColor}
          setBulkActionOpen={setBulkActionOpen}
          t={t}
          hoveredRowId={hoveredRowId}
          setHoveredRowId={setHoveredRowId}
          onView={onView}
          onEdit={onEdit}
        />}
        
        {items.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 p-4">
            <div className="w-16 h-16 bg-default-100 rounded-full flex items-center justify-center mb-4">
              <Icon icon="lucide:briefcase" width={32} className="text-default-400" />
            </div>
            <p className="text-default-400 text-center">{t.noJobRequisitions}</p>
            <Button 
              color="primary" 
              variant="flat" 
              className="mt-4" 
              startContent={<Icon icon="lucide:plus" width={16} />}
              onPress={() => setCreateModalOpen(true)}
            >
              {t.createJob}
            </Button>
          </div>
        )}
      </div>
      <div className="flex justify-center p-4 border-t">
        <Pagination
          total={pages}
          page={page}
          onChange={setPage}
          classNames={{
            cursor: "bg-primary",
          }}
        />
      </div>
    </div>
  );
};