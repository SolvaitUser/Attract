import React from "react";
import { Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Checkbox, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TranslationKey } from "../../../data/translations";

interface CompactViewProps {
  items: any[];
  selectedKeys: Set<string>;
  onSelectionChange: (keys: Set<string>) => void;
  getStatusColor: (status: string) => string;
  setBulkActionOpen: (open: boolean) => void;
  t: Record<TranslationKey, string>;
  hoveredRowId: string | null;
  setHoveredRowId: (id: string | null) => void;
  onView: (jobId: string) => void;
  onEdit: (jobId: string) => void;
}

export const CompactView: React.FC<CompactViewProps> = ({ 
  items, 
  selectedKeys, 
  onSelectionChange,
  getStatusColor,
  setBulkActionOpen,
  t,
  hoveredRowId,
  setHoveredRowId,
  onView,
  onEdit
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center bg-default-50 py-2 px-3 border-b sticky top-0 z-10">
        <div className="w-8 flex justify-center">
          <Checkbox 
            isSelected={selectedKeys.size > 0 && selectedKeys.size === items.length}
            isIndeterminate={selectedKeys.size > 0 && selectedKeys.size < items.length}
            onValueChange={(selected) => {
              if (selected) {
                const allIds = items.map(item => item.id);
                onSelectionChange(new Set(allIds));
                setBulkActionOpen(true);
              } else {
                onSelectionChange(new Set([]));
                setBulkActionOpen(false);
              }
            }}
            aria-label={t.selectAll}
            size="sm"
          />
        </div>
        <div className="text-xs font-medium uppercase text-default-700 ms-2">{t.jobTitle}</div>
      </div>
      
      {items.length > 0 ? (
        items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center border-b hover:bg-default-50 transition-colors py-2.5 px-3 relative"
            onMouseEnter={() => setHoveredRowId(item.id)}
            onMouseLeave={() => setHoveredRowId(null)}
          >
            <div className="w-8 flex justify-center">
              <Checkbox 
                isSelected={selectedKeys.has(item.id)} 
                onValueChange={(selected) => {
                  const newSelection = new Set(selectedKeys);
                  if (selected) {
                    newSelection.add(item.id);
                  } else {
                    newSelection.delete(item.id);
                  }
                  onSelectionChange(newSelection);
                  setBulkActionOpen(newSelection.size > 0);
                }}
                aria-label={`Select ${item.title}`}
                size="sm"
              />
            </div>
            <div className="flex-grow min-w-0 flex items-center gap-2 ms-2">
              <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{item.title}</p>
                  <span className="text-xs text-default-500 whitespace-nowrap">{item.department}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <Chip color={getStatusColor(item.status)} variant="flat" size="sm" className="h-5 px-1">
                    {item.status}
                  </Chip>
                  <span className="flex items-center text-default-500 gap-1">
                    <Icon icon="lucide:map-pin" width={12} />
                    {item.location}
                  </span>
                  <span className="text-default-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {/* Show actions on hover/selection */}
              {(hoveredRowId === item.id || selectedKeys.has(item.id)) && (
                <div className="flex-shrink-0 flex items-center gap-1.5 bg-default-50 rounded-lg p-1 border border-default-200">
                  <Tooltip content={t.view}>
                    <Button 
                      isIconOnly 
                      variant="light" 
                      size="sm" 
                      className="min-w-7 w-7 h-7"
                      onPress={() => onView(item.id)}
                    >
                      <Icon icon="lucide:eye" width={14} />
                    </Button>
                  </Tooltip>
                  <Tooltip content={t.edit}>
                    <Button 
                      isIconOnly 
                      variant="light" 
                      size="sm" 
                      className="min-w-7 w-7 h-7"
                      onPress={() => onEdit(item.id)}
                    >
                      <Icon icon="lucide:edit" width={14} />
                    </Button>
                  </Tooltip>
                  <Tooltip content={t.delete} color="danger">
                    <Button isIconOnly variant="light" color="danger" size="sm" className="min-w-7 w-7 h-7">
                      <Icon icon="lucide:trash-2" width={14} />
                    </Button>
                  </Tooltip>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="py-8 text-center text-default-400">
          {t.noJobRequisitions}
        </div>
      )}
    </div>
  );
};