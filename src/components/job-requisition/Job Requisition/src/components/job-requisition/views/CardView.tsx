import React from "react";
import { Card, CardBody, CardFooter, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Checkbox, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { TranslationKey, translations } from "../../../data/translations";

interface CardViewProps {
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

export const CardView: React.FC<CardViewProps> = ({ 
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {items.length > 0 ? (
        items.map((item) => (
          <Card 
            key={item.id} 
            className="relative h-full shadow-sm hover:shadow transition-all duration-200"
            onMouseEnter={() => setHoveredRowId(item.id)}
            onMouseLeave={() => setHoveredRowId(null)}
          >
            <div className="absolute top-3 left-3 z-10">
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
            <CardBody className="pt-10 pb-3">
              <div className="flex justify-between items-start">
                <Chip 
                  color={getStatusColor(item.status)} 
                  variant="flat" 
                  size="sm"
                  classNames={{
                    content: "text-xs font-medium",
                  }}
                >
                  {item.status}
                </Chip>
                <p className="text-xs text-default-400">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
              
              <h3 className="font-semibold text-sm mt-3 mb-1">{item.title}</h3>
              <p className="text-xs text-default-600 mb-3">{item.department}</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-default-500">
                  <div className="w-5 h-5 bg-default-100 rounded-full flex items-center justify-center">
                    <Icon icon="lucide:map-pin" width={12} />
                  </div>
                  <span>{item.location}</span>
                </div>
                
                {item.type && (
                  <div className="flex items-center gap-2 text-xs text-default-500">
                    <div className="w-5 h-5 bg-default-100 rounded-full flex items-center justify-center">
                      <Icon icon="lucide:clock" width={12} />
                    </div>
                    <span>{item.type}</span>
                  </div>
                )}
              </div>
            </CardBody>
            
            {/* Replace footer with actions toolbar shown on hover/selection */}
            {(hoveredRowId === item.id || selectedKeys.has(item.id)) && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 to-white/60 pb-3 pt-8">
                <div className="flex justify-center items-center gap-2 px-3">
                  <Button 
                    size="sm" 
                    variant="flat" 
                    className="flex-1 bg-default-50 hover:bg-default-100"
                    startContent={<Icon icon="lucide:eye" width={14} />}
                    onPress={() => onView(item.id)}
                  >
                    {t.view}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="flat" 
                    className="flex-1 bg-default-50 hover:bg-default-100"
                    startContent={<Icon icon="lucide:edit" width={14} />}
                    onPress={() => onEdit(item.id)}
                  >
                    {t.edit}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="flat" 
                    color="danger"
                    isIconOnly
                    className="bg-danger-50 hover:bg-danger-100"
                  >
                    <Icon icon="lucide:trash-2" width={14} />
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))
      ) : (
        <div className="col-span-full py-8 text-center text-default-400">
          {t.noJobRequisitions}
        </div>
      )}
    </div>
  );
};