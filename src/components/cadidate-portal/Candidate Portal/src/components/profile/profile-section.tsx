import React from 'react';
import { Card, CardHeader, CardBody, Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface ProfileSectionProps {
  title: string;
  icon?: string;
  isEditing?: boolean;
  isLoading?: boolean;
  isCompleted?: boolean;
  isAutoSaving?: boolean;
  children: React.ReactNode;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  title,
  icon,
  isEditing = false,
  isLoading = false,
  isCompleted = false,
  isAutoSaving = false,
  children,
  onEdit,
  onSave,
  onCancel,
}) => {
  return (
    <Card shadow="sm" className="overflow-visible mb-6">
      <CardHeader className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="text-primary-500">
              <Icon icon={icon} width={20} height={20} />
            </div>
          )}
          <h3 className="text-lg font-semibold">{title}</h3>
          {isCompleted && (
            <span className="text-success-500">
              <Icon icon="lucide:check-circle" width={16} height={16} />
            </span>
          )}
          {isAutoSaving && (
            <span className="text-sm text-default-500 animate-pulse flex items-center">
              <Icon icon="lucide:save" className="mr-1" width={14} height={14} />
              Autosaving...
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                variant="light"
                color="danger"
                onPress={onCancel}
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                color="primary"
                onPress={onSave}
                isLoading={isLoading}
              >
                Save
              </Button>
            </>
          ) : (
            onEdit && (
              <Button
                size="sm"
                variant="flat"
                color="primary"
                startContent={<Icon icon="lucide:edit" width={14} height={14} />}
                onPress={onEdit}
              >
                Edit
              </Button>
            )
          )}
        </div>
      </CardHeader>

      <CardBody className="px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={isEditing ? 'edit' : 'view'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </CardBody>
    </Card>
  );
};
