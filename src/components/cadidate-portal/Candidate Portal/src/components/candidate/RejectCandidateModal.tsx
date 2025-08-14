import React, { useState } from 'react';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Select, SelectItem, Textarea, Checkbox
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';

interface RejectCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
  onReject: (candidateId: string, reason: string, notify: boolean) => void;
}

const RejectCandidateModal: React.FC<RejectCandidateModalProps> = ({ 
  isOpen, 
  onClose, 
  candidate,
  onReject
}) => {
  const { t, language } = useLanguage();
  const [reason, setReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [notifyCandidate, setNotifyCandidate] = useState<boolean>(true);
  
  const rejectionReasons = [
    { key: 'notQualified', value: t('notQualified') },
    { key: 'lackExperience', value: t('lackExperience') },
    { key: 'skillsMismatch', value: t('skillsMismatch') },
    { key: 'salaryExpectations', value: t('salaryExpectations') },
    { key: 'locationIssue', value: t('locationIssue') },
    { key: 'better candidates', value: t('betterCandidates') },
    { key: 'jobCancelled', value: t('jobCancelled') },
    { key: 'other', value: t('other') }
  ];
  
  const handleSubmit = () => {
    const finalReason = reason === 'other' ? customReason : reason;
    onReject(candidate.id, finalReason, notifyCandidate);
    onClose();
  };
  
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-danger">
                <Icon icon="lucide:x-circle" className="text-danger" />
                {t('rejectCandidate')}
              </div>
              <p className="text-sm font-normal text-default-500">{candidate.name}</p>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Select
                  label={t('rejectionReason')}
                  placeholder={t('selectRejectionReason')}
                  selectedKeys={reason ? [reason] : []}
                  onChange={(e) => setReason(e.target.value)}
                  isRequired
                >
                  {rejectionReasons.map((item) => (
                    <SelectItem key={item.key} value={item.key}>{item.value}</SelectItem>
                  ))}
                </Select>
                
                {reason === 'other' && (
                  <Textarea
                    label={t('customRejectionReason')}
                    placeholder={t('enterCustomReason')}
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    isRequired
                  />
                )}
                
                <Checkbox
                  isSelected={notifyCandidate}
                  onValueChange={setNotifyCandidate}
                >
                  {t('sendRejectionEmail')}
                </Checkbox>
                
                {notifyCandidate && (
                  <div className="p-3 border rounded-md bg-default-50">
                    <p className="text-sm font-medium mb-2">{t('emailPreview')}</p>
                    <p className="text-sm">{t('dear')} {candidate.name},</p>
                    <p className="text-sm mt-2">{t('rejectionEmailText')}</p>
                    <p className="text-sm mt-2">{t('rejectionEmailClosing')}</p>
                    <p className="text-sm mt-2">{t('regards')},<br />{t('wiseRecruitmentTeam')}</p>
                  </div>
                )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button 
                variant="light" 
                onPress={onClose}
              >
                {t('cancel')}
              </Button>
              <Button 
                color="danger" 
                onPress={handleSubmit}
              >
                {t('confirmRejection')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RejectCandidateModal;