import React from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
  itemType: string; // e.g., 'candidate', 'job', etc.
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  count,
  itemType
}) => {
  const { t, language } = useLanguage();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t('deleteConfirmation')}
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-danger-100 p-3 rounded-full mb-4">
                  <Icon icon="lucide:trash-2" className="text-danger h-8 w-8" />
                </div>
                <p>
                  {t('deleteConfirmationMessage', { 
                    count, 
                    itemType: t(itemType) 
                  })}
                </p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                {t('cancel')}
              </Button>
              <Button 
                color="danger" 
                onPress={handleConfirm}
                startContent={<Icon icon="lucide:trash-2" />}
              >
                {t('confirm')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;