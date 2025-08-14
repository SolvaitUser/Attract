import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea, Checkbox } from '@heroui/react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface CustomDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (document: { name: string; description: string; required: boolean }) => void;
}

export const CustomDocumentModal: React.FC<CustomDocumentModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const { t } = useLanguage();
  const [documentName, setDocumentName] = React.useState('');
  const [documentDescription, setDocumentDescription] = React.useState('');
  const [isRequired, setIsRequired] = React.useState(false);

  const handleSubmit = () => {
    if (!documentName.trim()) return;
    
    onSave({
      name: documentName,
      description: documentDescription,
      required: isRequired
    });
    
    // Reset form
    setDocumentName('');
    setDocumentDescription('');
    setIsRequired(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {t('addCustomDocument')}
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <Input
              label={t('documentName')}
              placeholder={t('enterDocumentName')}
              value={documentName}
              onValueChange={setDocumentName}
              variant="bordered"
              isRequired
            />
            
            <Textarea
              label={t('documentDescription')}
              placeholder={t('enterDocumentDescription')}
              value={documentDescription}
              onValueChange={setDocumentDescription}
              variant="bordered"
            />
            
            <Checkbox 
              isSelected={isRequired}
              onValueChange={setIsRequired}
            >
              {t('markAsRequired')}
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="flat" onPress={onClose}>
            {t('cancel')}
          </Button>
          <Button 
            color="primary" 
            onPress={handleSubmit}
            isDisabled={!documentName.trim()}
          >
            {t('addDocument')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};