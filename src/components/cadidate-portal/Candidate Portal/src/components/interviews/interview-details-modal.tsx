import React from 'react';
    import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Avatar, Badge, Divider } from '@heroui/react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Icon } from '@iconify/react';
    import { useLanguage } from '../../contexts/language-context';
    import { Interview } from './interview-card';

    interface InterviewDetailsModalProps {
      isOpen: boolean;
      onClose: () => void;
      interview: Interview | null;
      onReschedule?: (interviewId: string) => void;
      onAddToCalendar?: (interviewId: string) => void;
      onJoinMeeting?: (meetingLink: string) => void;
    }

    export const InterviewDetailsModal: React.FC<InterviewDetailsModalProps> = ({
      isOpen,
      onClose,
      interview,
      onReschedule,
      onAddToCalendar,
      onJoinMeeting,
    }) => {
      const { translate } = useLanguage();
      const [activeTab, setActiveTab] = React.useState('details');
      
      if (!interview) return null;
      
      // Format date and time
      const formatDateTime = (date: Date) => {
        return new Date(date).toLocaleString(undefined, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
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
      
      const typeInfo = getInterviewTypeInfo(interview.type);
      const isPast = new Date(interview.scheduledDate) < new Date() && !isHappeningNow();
      const joinable = isHappeningNow() && interview.meetingLink && interview.type === 'online';
      
      // Fake interviewers for enhanced details
      const interviewers = interview.interviewers || [
        { name: 'Sarah Johnson', role: 'Hiring Manager', avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=45' },
        { name: 'Michael Chen', role: 'Senior Product Manager', avatar: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=46' },
      ];
      
      // Tips specific to the interview type
      const interviewTips = [
        "Research the company's recent projects and news",
        "Prepare specific examples from your past experience",
        "Review the job description and align your answers",
        "Prepare questions to ask at the end of the interview",
        "Test your video and audio if it's an online interview",
      ];

      return (
        <Modal 
          isOpen={isOpen} 
          onClose={onClose}
          size="2xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onModalClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">{interview.jobTitle}</h2>
                    <Badge 
                      color={interview.status === 'scheduled' ? "primary" : 
                            interview.status === 'completed' ? "success" : 
                            interview.status === 'canceled' ? "danger" : "warning"}
                      variant="flat"
                    >
                      {interview.status.charAt(0).toUpperCase() + interview.status.slice(1)}
                    </Badge>
                  </div>
                  <p className="text-default-500 text-sm">{interview.company}</p>
                </ModalHeader>
                
                <Divider />
                
                <ModalBody>
                  <div className="flex gap-2 border-b border-divider mb-4">
                    <Button
                      variant={activeTab === 'details' ? 'solid' : 'light'}
                      color={activeTab === 'details' ? 'primary' : 'default'}
                      size="sm"
                      className="rounded-none rounded-t-md"
                      onPress={() => setActiveTab('details')}
                    >
                      Details
                    </Button>
                    <Button
                      variant={activeTab === 'tips' ? 'solid' : 'light'}
                      color={activeTab === 'tips' ? 'primary' : 'default'}
                      size="sm"
                      className="rounded-none rounded-t-md"
                      onPress={() => setActiveTab('tips')}
                    >
                      Preparation Tips
                    </Button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {activeTab === 'details' ? (
                      <motion.div
                        key="details"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="bg-default-50 dark:bg-default-100/10 p-4 rounded-lg mb-4">
                          <div className="flex items-center mb-2">
                            <Icon icon={typeInfo.icon} className="text-primary-500 mr-2" size={20} />
                            <h3 className="text-lg font-medium">{typeInfo.label}</h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-default-500">Date & Time</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Icon icon="lucide:calendar" className="text-primary-500" size={16} />
                                <p className="font-medium">{formatDateTime(interview.scheduledDate)}</p>
                              </div>
                              {interview.endDate && (
                                <p className="text-sm text-default-500 mt-1">
                                  Duration: {formatDuration()}
                                </p>
                              )}
                            </div>
                            
                            <div>
                              <p className="text-sm text-default-500">Location</p>
                              <div className="flex items-center gap-2 mt-1">
                                {interview.type === 'online' ? (
                                  <>
                                    <Icon icon="lucide:globe" className="text-primary-500" size={16} />
                                    <p className="font-medium">Online Meeting</p>
                                  </>
                                ) : (
                                  <>
                                    <Icon icon="lucide:map-pin" className="text-primary-500" size={16} />
                                    <p className="font-medium">{interview.location || 'Not specified'}</p>
                                  </>
                                )}
                              </div>
                              {interview.meetingLink && (
                                <div className="mt-1">
                                  <a
                                    href={interview.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-primary-500 hover:underline"
                                  >
                                    Meeting Link
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <h4 className="font-medium mb-3">Interviewers</h4>
                        <div className="space-y-3 mb-4">
                          {Array.isArray(interviewers) ? (
                            interviewers.map((interviewer, index) => (
                              typeof interviewer === 'string' ? (
                                <div key={index} className="flex items-center gap-2">
                                  <Avatar
                                    size="sm"
                                    name={interviewer.split('(')[0].trim()}
                                    className="shrink-0"
                                  />
                                  <span>{interviewer}</span>
                                </div>
                              ) : (
                                <div key={index} className="flex items-center gap-3">
                                  <Avatar
                                    size="sm"
                                    src={interviewer.avatar}
                                    name={interviewer.name}
                                    className="shrink-0"
                                  />
                                  <div>
                                    <p className="font-medium">{interviewer.name}</p>
                                    <p className="text-xs text-default-500">{interviewer.role}</p>
                                  </div>
                                </div>
                              )
                            ))
                          ) : (
                            <p className="text-default-500">No interviewers specified</p>
                          )}
                        </div>
                        
                        {interview.instructions && (
                          <div className="mb-4">
                            <h4 className="font-medium mb-2">Instructions</h4>
                            <div className="bg-default-50 dark:bg-default-100/10 p-3 rounded-md">
                              <p>{interview.instructions}</p>
                            </div>
                          </div>
                        )}
                        
                        {joinable && (
                          <div className="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg border border-success-200 dark:border-success-800 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon icon="lucide:video" className="text-success-500" size={20} />
                              <h4 className="font-medium">Your interview is happening now</h4>
                            </div>
                            <p className="text-sm mb-3">
                              Join the meeting by clicking the button below. Make sure your camera and microphone are working.
                            </p>
                            <Button
                              color="success"
                              onPress={() => interview.meetingLink && onJoinMeeting?.(interview.meetingLink)}
                              startContent={<Icon icon="lucide:video" size={18} />}
                            >
                              Join Now
                            </Button>
                          </div>
                        )}
                        
                        {isUpcoming() && (
                          <div className="bg-warning-50 dark:bg-warning-900/20 p-4 rounded-lg border border-warning-200 dark:border-warning-800">
                            <div className="flex items-center gap-2 mb-2">
                              <Icon icon="lucide:alert-triangle" className="text-warning-500" size={20} />
                              <h4 className="font-medium">Your interview is starting soon</h4>
                            </div>
                            <p className="text-sm">
                              Please prepare to join on time. Make sure you have all necessary documents ready.
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="tips"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg mb-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Icon icon="lucide:lightbulb" className="text-primary-500" size={20} />
                            <h3 className="text-lg font-medium">Interview Preparation Tips</h3>
                          </div>
                          
                          <ul className="space-y-3">
                            {interviewTips.map((tip, index) => (
                              <motion.li 
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-2"
                              >
                                <Icon 
                                  icon="lucide:check-circle" 
                                  className="text-primary-500 mt-1 shrink-0" 
                                  size={16}
                                />
                                <span>{tip}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Company Research</h4>
                          <p className="text-sm mb-2">
                            Researching {interview.company} will help you better prepare for this interview.
                            Consider looking into their:
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-default-50 dark:bg-default-100/10 p-3 rounded-md">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon icon="lucide:target" className="text-primary-500" size={16} />
                                <h5 className="font-medium">Mission & Values</h5>
                              </div>
                              <p className="text-sm">
                                Understand what drives the company and how they measure success.
                              </p>
                            </div>
                            
                            <div className="bg-default-50 dark:bg-default-100/10 p-3 rounded-md">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon icon="lucide:line-chart" className="text-success-500" size={16} />
                                <h5 className="font-medium">Recent News & Achievements</h5>
                              </div>
                              <p className="text-sm">
                                Review recent announcements, product launches, or company milestones.
                              </p>
                            </div>
                            
                            <div className="bg-default-50 dark:bg-default-100/10 p-3 rounded-md">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon icon="lucide:users" className="text-warning-500" size={16} />
                                <h5 className="font-medium">Team Structure</h5>
                              </div>
                              <p className="text-sm">
                                Learn about the team you'll be joining and their work culture.
                              </p>
                            </div>
                            
                            <div className="bg-default-50 dark:bg-default-100/10 p-3 rounded-md">
                              <div className="flex items-center gap-2 mb-1">
                                <Icon icon="lucide:briefcase" className="text-secondary-500" size={16} />
                                <h5 className="font-medium">Role Requirements</h5>
                              </div>
                              <p className="text-sm">
                                Review the job description thoroughly and prepare relevant examples.
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Common Questions</h4>
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            endContent={<Icon icon="lucide:external-link" size={14} />}
                            as="a"
                            href="#"
                            target="_blank"
                          >
                            View All
                          </Button>
                        </div>
                        
                        <div className="space-y-3 mt-3">
                          <div className="border border-divider p-3 rounded-lg">
                            <h5 className="font-medium mb-1">Tell me about yourself and your background.</h5>
                            <p className="text-sm text-default-500">
                              Focus on relevant experience and skills that match the job requirements.
                            </p>
                          </div>
                          
                          <div className="border border-divider p-3 rounded-lg">
                            <h5 className="font-medium mb-1">Why are you interested in this position?</h5>
                            <p className="text-sm text-default-500">
                              Connect your career goals and skills to the role and company values.
                            </p>
                          </div>
                          
                          <div className="border border-divider p-3 rounded-lg">
                            <h5 className="font-medium mb-1">What are your greatest strengths?</h5>
                            <p className="text-sm text-default-500">
                              Choose strengths that align with the job and provide specific examples.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </ModalBody>
                
                <ModalFooter>
                  <Button variant="flat" color="default" onPress={onModalClose}>
                    Close
                  </Button>
                  
                  {!isPast && (
                    <Button
                      variant="flat"
                      color="primary"
                      startContent={<Icon icon="lucide:calendar-plus" size={16} />}
                      onPress={() => onAddToCalendar?.(interview.id)}
                    >
                      Add to Calendar
                    </Button>
                  )}
                  
                  {!isPast && interview.canReschedule && interview.status === 'scheduled' && (
                    <Button
                      color="warning"
                      startContent={<Icon icon="lucide:calendar-clock" size={16} />}
                      onPress={() => onReschedule?.(interview.id)}
                    >
                      Reschedule
                    </Button>
                  )}
                  
                  {joinable && (
                    <Button
                      color="success"
                      startContent={<Icon icon="lucide:video" size={16} />}
                      onPress={() => interview.meetingLink && onJoinMeeting?.(interview.meetingLink)}
                    >
                      Join Now
                    </Button>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    };