import React, { useState } from 'react';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, Select, SelectItem, Checkbox
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';

interface ScheduleInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
}

const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({ 
  isOpen, 
  onClose, 
  candidate 
}) => {
  const { t, language } = useLanguage();
  const [interviewDate, setInterviewDate] = useState<string>('');
  const [interviewTime, setInterviewTime] = useState<string>('');
  const [interviewType, setInterviewType] = useState<string>('video');
  const [interviewers, setInterviewers] = useState<string[]>([]);
  const [sendInvite, setSendInvite] = useState<boolean>(true);
  
  // Mock interviewers
  const availableInterviewers = [
    { id: 'int-1', name: 'Ahmed Hassan', department: 'Engineering' },
    { id: 'int-2', name: 'Sarah Johnson', department: 'Product' },
    { id: 'int-3', name: 'Mohammed Al-Faisal', department: 'Engineering' },
    { id: 'int-4', name: 'Fatima Al-Zahra', department: 'HR' },
    { id: 'int-5', name: 'David Chen', department: 'Design' },
  ];
  
  const handleSubmit = () => {
    // In a real app, this would send the interview data to the backend
    console.log({
      candidateId: candidate.id,
      interviewDate,
      interviewTime,
      interviewType,
      interviewers,
      sendInvite
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
              {t('scheduleInterviewFor')} {candidate.name}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      type="date"
                      label={t('interviewDate')}
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      isRequired
                    />
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      type="time"
                      label={t('interviewTime')}
                      value={interviewTime}
                      onChange={(e) => setInterviewTime(e.target.value)}
                      isRequired
                    />
                  </div>
                </div>
                
                <Select
                  label={t('interviewType')}
                  selectedKeys={[interviewType]}
                  onChange={(e) => setInterviewType(e.target.value)}
                >
                  <SelectItem key="video" value="video" startContent={<Icon icon="lucide:video" />}>
                    {t('videoInterview')}
                  </SelectItem>
                  <SelectItem key="phone" value="phone" startContent={<Icon icon="lucide:phone" />}>
                    {t('phoneInterview')}
                  </SelectItem>
                  <SelectItem key="inperson" value="inperson" startContent={<Icon icon="lucide:users" />}>
                    {t('inPersonInterview')}
                  </SelectItem>
                </Select>
                
                <Select
                  label={t('interviewers')}
                  selectionMode="multiple"
                  selectedKeys={interviewers}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (typeof value === 'string') {
                      setInterviewers([...interviewers, value]);
                    }
                  }}
                  isRequired
                >
                  {availableInterviewers.map((interviewer) => (
                    <SelectItem key={interviewer.id} value={interviewer.id}>
                      {interviewer.name} ({interviewer.department})
                    </SelectItem>
                  ))}
                </Select>
                
                <Checkbox
                  isSelected={sendInvite}
                  onValueChange={setSendInvite}
                >
                  {t('sendCalendarInvite')}
                </Checkbox>
                
                <Input
                  label={t('notes')}
                  placeholder={t('interviewNotes')}
                  variant="bordered"
                />
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
                color="primary" 
                onPress={handleSubmit}
                startContent={<Icon icon="lucide:calendar-check" className={language === 'ar' ? 'icon-flip' : ''} />}
              >
                {t('scheduleInterview')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ScheduleInterviewModal;