import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
        <Icon icon={icon} className="text-blue-500 text-2xl" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button color="primary" onPress={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;