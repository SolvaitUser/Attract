import React, { useState } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Chip,
  ScrollShadow
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';

interface BulkEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateIds: string[];
  candidates: Candidate[];
}

const BulkEmailModal: React.FC<BulkEmailModalProps> = ({ 
  isOpen, 
  onClose,
  candidateIds,
  candidates
}) => {
  const { t, language } = useLanguage();
  const [subject, setSubject] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const handleSendEmail = () => {
    // In a real app, this would call an API to send emails
    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t('sendEmail')}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">{t('selectedCandidates')}</p>
                  <ScrollShadow className="max-h-24 overflow-y-auto flex flex-wrap gap-2 border rounded-lg p-2">
                    {candidates.map(candidate => (
                      <Chip 
                        key={candidate.id} 
                        variant="flat"
                        avatar={
                          <img 
                            src={candidate.photoUrl} 
                            alt={candidate.name} 
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        }
                      >
                        {candidate.name}
                      </Chip>
                    ))}
                  </ScrollShadow>
                </div>
                
                <Input
                  label={t('subject')}
                  placeholder={t('subject')}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={language === 'ar' ? 'text-right' : ''}
                />
                
                <Textarea
                  label={t('message')}
                  placeholder={t('message')}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  minRows={6}
                  className={language === 'ar' ? 'text-right' : ''}
                />
                
                <div className="flex items-center gap-2 text-sm text-default-500">
                  <Icon icon="lucide:info" />
                  <p>{t('emailTemplateInfo')}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                {t('cancel')}
              </Button>
              <Button 
                color="primary" 
                onPress={handleSendEmail}
                isLoading={isSending}
                startContent={!isSending && <Icon icon="lucide:send" />}
                isDisabled={!subject.trim() || !message.trim()}
              >
                {t('sendToAll')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BulkEmailModal;