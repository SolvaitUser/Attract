import React, { useState } from 'react';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Textarea, Checkbox
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';

interface AddNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

const AddNoteModal: React.FC<AddNoteModalProps> = ({ 
  isOpen, 
  onClose, 
  candidate 
}) => {
  const { t, language } = useLanguage();
  const [note, setNote] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  
  const handleSubmit = () => {
    // In a real app, this would send the note data to the backend
    console.log({
      candidateId: candidate.id,
      note,
      isPrivate,
      createdAt: new Date().toISOString()
    });
    
    // Close the modal
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t('addNoteForCandidate')} {candidate.name}
            </ModalHeader>
            <ModalBody>
              <Textarea
                label={t('note')}
                placeholder={t('enterNoteAboutCandidate')}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                minRows={4}
                isRequired
                autoFocus
              />
              
              <Checkbox
                isSelected={isPrivate}
                onValueChange={setIsPrivate}
              >
                {t('privateNote')}
              </Checkbox>
              {isPrivate && (
                <p className="text-xs text-default-500">{t('privateNoteDescription')}</p>
              )}
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="light" 
                onPress={onClose}
              >
                {t('cancel')}
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                startContent={<Icon icon="lucide:save" className={language === 'ar' ? 'icon-flip' : ''} />}
                isDisabled={!note.trim()}
              >
                {t('saveNote')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNoteModal;