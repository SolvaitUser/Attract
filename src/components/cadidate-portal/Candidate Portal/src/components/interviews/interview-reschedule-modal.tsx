import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, DatePicker, TimeInput, addToast } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { parseDate, today, getLocalTimeZone, Time } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';

interface InterviewRescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  interviewId: string | null;
  interviewTitle?: string;
  interviewCompany?: string;
  currentDate?: Date;
  onRescheduleSubmit?: (interviewId: string, reason: string, date: Date, time: Time) => void;
}

export const InterviewRescheduleModal: React.FC<InterviewRescheduleModalProps> = ({
  isOpen,
  onClose,
  interviewId,
  interviewTitle = 'Interview',
  interviewCompany = '',
  currentDate,
  onRescheduleSubmit,
}) => {
  const { translate, direction } = useLanguage();
  const [reason, setReason] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(
    currentDate ? parseDate(currentDate.toISOString().split('T')[0]) : today(getLocalTimeZone())
  );
  const [selectedTime, setSelectedTime] = React.useState<Time>(new Time(10, 0));
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  
  const formatter = useDateFormatter({ dateStyle: 'full' });

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      setReason('');
      setSelectedDate(currentDate ? parseDate(currentDate.toISOString().split('T')[0]) : today(getLocalTimeZone()));
      setSelectedTime(new Time(10, 0));
      setErrors({});
      setIsSubmitting(false);
      setShowConfirmation(false);
    }
  }, [isOpen, currentDate]);

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!reason.trim()) {
      newErrors.reason = 'Please provide a reason for rescheduling';
    } else if (reason.trim().length < 10) {
      newErrors.reason = 'Please provide a more detailed reason (at least 10 characters)';
    }
    
    // Ensure date is in the future
    const currentDateObj = new Date();
    const selectedDateObj = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day,
      selectedTime.hour,
      selectedTime.minute
    );
    
    if (selectedDateObj <= currentDateObj) {
      newErrors.date = 'Please select a future date and time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm() || !interviewId) return;
    
    setIsSubmitting(true);
    
    try {
      // Convert the selected date and time to a JavaScript Date object
      const dateObj = new Date(
        selectedDate.year,
        selectedDate.month - 1,
        selectedDate.day,
        selectedTime.hour,
        selectedTime.minute
      );
      
      // Call the parent handler if provided
      if (onRescheduleSubmit) {
        await onRescheduleSubmit(interviewId, reason, dateObj, selectedTime);
      }
      
      // Show confirmation
      setShowConfirmation(true);
      
      // Simulate API call delay
      setTimeout(() => {
        addToast({
          title: "Reschedule Request Sent",
          description: "The recruiter will review and confirm your new time.",
          color: "success",
        });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting reschedule request:', error);
      addToast({
        title: "Error",
        description: "Failed to submit reschedule request. Please try again.",
        color: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:calendar-clock" className="text-warning-500" />
                <h2 className="text-xl font-semibold">Reschedule Interview</h2>
              </div>
              {(interviewTitle || interviewCompany) && (
                <p className="text-default-500 text-sm">
                  {interviewTitle}{interviewCompany ? ` • ${interviewCompany}` : ''}
                </p>
              )}
            </ModalHeader>
            
            <ModalBody>
              {!showConfirmation ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Reason for Rescheduling <span className="text-danger-500">*</span>
                    </label>
                    <Textarea
                      minRows={3}
                      placeholder="Please explain why you need to reschedule this interview"
                      value={reason}
                      onValueChange={setReason}
                      isInvalid={!!errors.reason}
                      errorMessage={errors.reason}
                      variant="bordered"
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Select New Date <span className="text-danger-500">*</span>
                      </label>
                      <DatePicker
                        value={selectedDate}
                        onChange={setSelectedDate}
                        minValue={today(getLocalTimeZone())}
                        isInvalid={!!errors.date}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Select New Time <span className="text-danger-500">*</span>
                      </label>
                      <TimeInput
                        value={selectedTime}
                        onChange={setSelectedTime}
                        isInvalid={!!errors.date}
                      />
                    </div>
                  </div>
                  
                  {errors.date && (
                    <p className="text-danger-500 text-sm">{errors.date}</p>
                  )}
                  
                  <div className="bg-warning-50 dark:bg-warning-900/20 p-3 rounded-md border border-warning-200 dark:border-warning-800">
                    <div className="flex items-start gap-2">
                      <Icon 
                        icon="lucide:alert-triangle" 
                        className="text-warning-500 shrink-0 mt-0.5" 
                        size={18} 
                      />
                      <p className="text-sm">
                        Rescheduling may affect the hiring process. 
                        The recruiter will need to confirm the new time works with all interviewers.
                      </p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-6"
                >
                  <div className="w-16 h-16 bg-success-100 dark:bg-success-900/30 rounded-full flex items-center justify-center mb-4">
                    <Icon icon="lucide:check" className="text-success-500" size={32} />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">Request Submitted!</h3>
                  
                  <p className="text-center text-default-600 mb-4">
                    Your reschedule request has been sent. The recruiter will review and confirm your new time.
                  </p>
                  
                  <div className="bg-default-50 dark:bg-default-100/10 p-4 rounded-lg w-full">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-default-500">New Date:</span>
                        <span className="font-medium">
                          {formatter.format(new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day))}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-default-500">New Time:</span>
                        <span className="font-medium">
                          {selectedTime.hour.toString().padStart(2, '0')}:{selectedTime.minute.toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </ModalBody>
            
            <ModalFooter>
              {!showConfirmation ? (
                <>
                  <Button 
                    variant="flat" 
                    color="default" 
                    onPress={onModalClose}
                    isDisabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    color="primary" 
                    onPress={handleSubmit}
                    isLoading={isSubmitting}
                    startContent={!isSubmitting && <Icon icon="lucide:calendar-check" size={16} />}
                  >
                    Submit Reschedule Request
                  </Button>
                </>
              ) : (
                <Button 
                  color="primary" 
                  onPress={onModalClose}
                >
                  Close
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};