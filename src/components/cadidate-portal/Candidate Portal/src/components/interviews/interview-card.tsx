import React from 'react';
import { Card, CardBody, Button, Badge, Tooltip } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

export interface Interview {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  companyLogo?: string;
  status: 'scheduled' | 'completed' | 'canceled' | 'rescheduled';
  type: 'online' | 'phone' | 'in_person';
  scheduledDate: Date;
  endDate?: Date;
  location?: string;
  meetingLink?: string;
  instructions?: string;
  interviewers?: string[];
  canReschedule: boolean;
  lastUpdated: Date;
}

interface InterviewCardProps {
  interview: Interview;
  onReschedule?: (interviewId: string) => void;
  onAddToCalendar?: (interviewId: string) => void;
  onJoinMeeting?: (meetingLink: string) => void;
  onViewDetails?: (interviewId: string) => void;
  onViewPreparation?: (interviewId: string) => void;
}

export const InterviewCard: React.FC<InterviewCardProps> = ({
  interview,
  onReschedule,
  onAddToCalendar,
  onJoinMeeting,
  onViewDetails,
  onViewPreparation,
}) => {
  const { translate } = useLanguage();
  
  // Format date and time
  const formatDateTime = (date: Date) => {
    return new Date(date).toLocaleString(undefined, {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  };
  
  // Format time duration
  const formatDuration = () => {
    if (!interview.endDate) return "";
    
    const start = new Date(interview.scheduledDate);
    const end = new Date(interview.endDate);
    const durationMs = end.getTime() - start.getTime();
    const durationMinutes = Math.round(durationMs / (1000 * 60));
    
    if (durationMinutes < 60) {
      return `${durationMinutes} minutes`;
    } else {
      const hours = Math.floor(durationMinutes / 60);
      const minutes = durationMinutes % 60;
      return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? ` ${minutes} min` : ''}`;
    }
  };
  
  // Get interview type information
  const getInterviewTypeInfo = (type: Interview['type']) => {
    switch (type) {
      case 'online':
        return { icon: 'lucide:video', label: 'Video Interview' };
      case 'phone':
        return { icon: 'lucide:phone', label: 'Phone Interview' };
      case 'in_person':
        return { icon: 'lucide:map-pin', label: 'In-Person Interview' };
      default:
        return { icon: 'lucide:calendar', label: 'Interview' };
    }
  };
  
  // Get interview status information
  const getStatusInfo = (status: Interview['status']) => {
    switch (status) {
      case 'scheduled':
        return { color: 'primary', label: 'Scheduled' };
      case 'completed':
        return { color: 'success', label: 'Completed' };
      case 'canceled':
        return { color: 'danger', label: 'Canceled' };
      case 'rescheduled':
        return { color: 'warning', label: 'Rescheduled' };
      default:
        return { color: 'default', label: 'Unknown' };
    }
  };
  
  const typeInfo = getInterviewTypeInfo(interview.type);
  const statusInfo = getStatusInfo(interview.status);
  
  // Check if interview is upcoming (in the next 30 minutes)
  const isUpcoming = () => {
    const now = new Date();
    const interviewDate = new Date(interview.scheduledDate);
    const diffMs = interviewDate.getTime() - now.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    return diffMinutes > 0 && diffMinutes <= 30 && interview.status === 'scheduled';
  };
  
  // Check if interview is happening now
  const isHappeningNow = () => {
    if (!interview.endDate || interview.status !== 'scheduled') return false;
    
    const now = new Date().getTime();
    const start = new Date(interview.scheduledDate).getTime();
    const end = new Date(interview.endDate).getTime();
    
    return now >= start && now <= end;
  };
  
  const joinable = isHappeningNow() && interview.meetingLink && interview.type === 'online';
  const isPast = new Date(interview.scheduledDate) < new Date() && !isHappeningNow();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card shadow="sm" className="overflow-visible">
        <CardBody className="p-5">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex gap-3">
              {interview.companyLogo ? (
                <img 
                  src={interview.companyLogo}
                  alt={interview.company}
                  className="w-12 h-12 rounded object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded bg-default-100 flex items-center justify-center">
                  <span className="font-medium text-default-500">
                    {interview.company.charAt(0)}
                  </span>
                </div>
              )}
              
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{interview.jobTitle}</h3>
                  <Badge 
                    color={statusInfo.color as any} 
                    variant="flat" 
                    size="sm"
                  >
                    {statusInfo.label}
                  </Badge>
                </div>
                <p className="text-default-500">{interview.company}</p>
              </div>
            </div>
            
            {joinable && (
              <Button
                color="success"
                className="md:self-start"
                startContent={<Icon icon="lucide:video" />}
                onPress={() => onJoinMeeting?.(interview.meetingLink!)}
              >
                Join Now
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-default-500">Type</span>
              <div className="flex items-center gap-2">
                <Icon icon={typeInfo.icon} className="text-primary-500" size={18} />
                <span className="font-medium">{typeInfo.label}</span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-sm text-default-500">Date & Time</span>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:calendar" className="text-primary-500" size={18} />
                <span className="font-medium">
                  {formatDateTime(interview.scheduledDate)}
                  {interview.endDate && ` (${formatDuration()})`}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <span className="text-sm text-default-500">Location</span>
              <div className="flex items-center gap-2">
                {interview.type === 'online' ? (
                  <Icon icon="lucide:globe" className="text-primary-500" size={18} />
                ) : (
                  <Icon icon="lucide:map-pin" className="text-primary-500" size={18} />
                )}
                <span className="font-medium">
                  {interview.type === 'online' ? 'Online Meeting' : interview.location || 'Not specified'}
                </span>
              </div>
            </div>
          </div>
          
          {interview.interviewers && interview.interviewers.length > 0 && (
            <div className="mt-4">
              <span className="text-sm text-default-500">Interviewers</span>
              <div className="flex flex-wrap gap-2 mt-1">
                {interview.interviewers.map((interviewer, index) => (
                  <Badge key={index} variant="flat" color="default">
                    {interviewer}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {interview.instructions && (
            <div className="mt-4 p-3 bg-default-50 dark:bg-default-100/10 rounded-md">
              <h4 className="text-sm font-medium mb-1">{translate('interviews.instructions')}</h4>
              <p className="text-sm">{interview.instructions}</p>
            </div>
          )}
          
          <div className="mt-5 flex flex-wrap gap-2 justify-end">
            <Button
              variant="flat"
              color="default"
              size="sm"
              startContent={<Icon icon="lucide:book-open" size={16} />}
              onPress={() => onViewPreparation?.(interview.id)}
            >
              Interview Prep
            </Button>
            
            {!isPast && (
              <Button
                variant="flat"
                color="primary"
                size="sm"
                startContent={<Icon icon="lucide:calendar-plus" size={16} />}
                onPress={() => onAddToCalendar?.(interview.id)}
              >
                Add to Calendar
              </Button>
            )}
            
            {!isPast && interview.canReschedule && interview.status === 'scheduled' && (
              <Button
                variant="flat"
                color="warning"
                size="sm"
                startContent={<Icon icon="lucide:calendar-clock" size={16} />}
                onPress={() => onReschedule?.(interview.id)}
              >
                {translate('interviews.reschedule')}
              </Button>
            )}
            
            <Button
              color="primary"
              size="sm"
              onPress={() => onViewDetails?.(interview.id)}
            >
              Details
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
