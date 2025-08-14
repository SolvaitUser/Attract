import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/language-context';
import { MainLayout } from '../../components/layout/main-layout';
import { InterviewCard, Interview } from '../../components/interviews/interview-card';
import { InterviewPreparation } from '../../components/interviews/interview-preparation';
import { Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Tooltip, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { addToast } from '@heroui/react';
import { InterviewTimeline } from '../../components/interviews/interview-timeline';
import { InterviewFeedback } from '../../components/interviews/interview-feedback';
import { InterviewDetailsModal } from '../../components/interviews/interview-details-modal';
import { InterviewPracticeModal } from '../../components/interviews/interview-practice-modal';
import { InterviewRescheduleModal } from '../../components/interviews/interview-reschedule-modal';
import { Time } from '@internationalized/date';

export const InterviewsPage: React.FC = () => {
  const { translate } = useLanguage();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedInterview, setSelectedInterview] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState("upcoming");
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [activeInterview, setActiveInterview] = React.useState<Interview | null>(null);
  const [activePracticeQuestion, setActivePracticeQuestion] = React.useState<string | null>(null);
  const [interviewDetailOpen, setInterviewDetailOpen] = React.useState(false);
  const [practiceModalOpen, setPracticeModalOpen] = React.useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = React.useState(false);
  const [selectedInterviewData, setSelectedInterviewData] = React.useState<Interview | null>(null);

  // Sample interviews data
  const interviews: Interview[] = [
    {
      id: 'int1',
      jobId: 'job2',
      jobTitle: 'Product Manager',
      company: 'InnovateCo',
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=2',
      status: 'scheduled',
      type: 'online',
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60), // +1 hour
      meetingLink: 'https://meet.google.com/example',
      instructions: 'Please prepare to discuss your experience with product lifecycle management.',
      interviewers: ['John Doe (Hiring Manager)', 'Jane Smith (Senior PM)'],
      canReschedule: true,
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
    {
      id: 'int2',
      jobId: 'job1',
      jobTitle: 'Senior Frontend Developer',
      company: 'TechCorp',
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=1',
      status: 'scheduled',
      type: 'phone',
      scheduledDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 45), // +45 minutes
      instructions: 'This will be a technical phone screen focusing on your JavaScript experience.',
      canReschedule: true,
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 48),
    },
    {
      id: 'int3',
      jobId: 'job3',
      jobTitle: 'UX Designer',
      company: 'DesignHub',
      companyLogo: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=3',
      status: 'completed',
      type: 'online',
      scheduledDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      endDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3 + 1000 * 60 * 60), // +1 hour
      canReschedule: false,
      lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    },
  ];

  // Sample practice questions for interview preparation
  const practiceQuestions = [
    {
      id: 'q1',
      question: 'Tell me about a challenging product you launched and what obstacles you overcame.',
      category: 'Experience',
      suggestedAnswer: 'Focus on a specific product, the challenges you faced, your actions, and the measurable results. Emphasize your leadership and problem-solving skills.',
      difficulty: 'medium' as const,
      confidenceScore: 85,
    },
    {
      id: 'q2',
      question: 'How do you prioritize features in a product roadmap?',
      category: 'Product Management',
      suggestedAnswer: 'Explain your framework for prioritization (e.g., RICE, MoSCoW, ICE), how you balance user needs with business goals, and provide a concrete example from your experience.',
      difficulty: 'medium' as const,
      confidenceScore: 92,
    },
    {
      id: 'q3',
      question: 'Describe a time when you had to make a decision with incomplete information.',
      category: 'Decision Making',
      suggestedAnswer: 'Choose an example that highlights your analytical skills, how you gathered what information was available, your decision-making process, and how you evaluated the results.',
      difficulty: 'hard' as const,
      confidenceScore: 78,
    },
  ];

  // New sample interview feedback data
  const sampleFeedback = {
    strengths: [
      'Strong problem-solving approach',
      'Clear communication skills',
      'Good understanding of product lifecycle',
    ],
    improvements: [
      'Could provide more specific examples',
      'Consider discussing metrics more',
    ],
    overallRating: 4,
    nextSteps: 'Scheduled for team interview next week',
  };

  // Sample interview stages data (new)
  const interviewStages = [
    { id: 'stage1', name: 'Initial Screening', completed: true },
    { id: 'stage2', name: 'Technical Assessment', completed: true },
    { id: 'stage3', name: 'Hiring Manager', completed: false, current: true },
    { id: 'stage4', name: 'Team Interview', completed: false },
    { id: 'stage5', name: 'Final Decision', completed: false },
  ];

  // Filter interviews by status
  const upcomingInterviews = interviews.filter(
    interview => new Date(interview.scheduledDate) > new Date() || 
                 (interview.status === 'scheduled' && interview.endDate && new Date(interview.endDate) > new Date())
  );
  
  const pastInterviews = interviews.filter(
    interview => (new Date(interview.scheduledDate) < new Date() && interview.status !== 'scheduled') || 
                 (interview.endDate && new Date(interview.endDate) < new Date())
  );

  // Handle reschedule request
  const handleReschedule = (interviewId: string) => {
    const interview = interviews.find(int => int.id === interviewId);
    if (interview) {
      setSelectedInterviewData(interview);
      setRescheduleModalOpen(true);
    }
  };

  // Handle reschedule submission
  const handleRescheduleSubmit = (interviewId: string, reason: string, date: Date, time: Time) => {
    console.log('Reschedule request:', { interviewId, reason, date, time });
    // In a real app, you would send this to your API
    return new Promise<void>((resolve) => {
      // Simulate API call
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  };

  // Handle add to calendar
  const handleAddToCalendar = (interviewId: string) => {
    addToast({
      title: "Added to Calendar",
      description: "Interview has been added to your calendar.",
      color: "success",
    });
  };

  // Handle join meeting
  const handleJoinMeeting = (meetingLink: string) => {
    window.open(meetingLink, '_blank');
  };

  // Handle view details
  const handleViewDetails = (interviewId: string) => {
    const interview = interviews.find(int => int.id === interviewId);
    if (interview) {
      setActiveInterview(interview);
      setInterviewDetailOpen(true);
    }
  };

  // Handle practice
  const handlePractice = (questionId: string) => {
    setActivePracticeQuestion(questionId);
    setPracticeModalOpen(true);
  };

  // Handle view preparation
  const handleViewPreparation = (interviewId: string) => {
    const interview = interviews.find(int => int.id === interviewId);
    if (interview) {
      setActiveTab("preparation");
    }
  };

  // New handler for feedback toggle
  const handleToggleFeedback = () => {
    setShowFeedback(!showFeedback);
  };

  // New handler for closing modals
  const handleCloseDetailModal = () => {
    setInterviewDetailOpen(false);
    setActiveInterview(null);
  };

  const handleClosePracticeModal = () => {
    setPracticeModalOpen(false);
    setActivePracticeQuestion(null);
  };

  return (
    <MainLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold">{translate('interviews.title')}</h1>
          <p className="text-default-500 mt-2">
            Manage your upcoming and past interviews
          </p>
        </motion.div>

        {/* Add interview timeline section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8"
        >
          <InterviewTimeline stages={interviewStages} />
        </motion.div>
        
        {/* Add toggle for feedback when available */}
        {pastInterviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="mb-6 flex justify-end"
          >
            <Button
              variant="flat"
              color="primary"
              startContent={<Icon icon="lucide:message-square" size={16} />}
              onPress={handleToggleFeedback}
              size="sm"
            >
              {showFeedback ? 'Hide Feedback' : 'Show Interview Feedback'}
            </Button>
          </motion.div>
        )}
        
        {/* Conditionally display feedback */}
        {showFeedback && pastInterviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <InterviewFeedback feedback={sampleFeedback} />
          </motion.div>
        )}

        <Tabs 
          aria-label="Interview sections" 
          selectedKey={activeTab} 
          onSelectionChange={setActiveTab}
          className="mb-6"
        >
          <Tab key="upcoming" title={translate('interviews.upcoming')}>
            <div className="space-y-4">
              {upcomingInterviews.length > 0 ? (
                upcomingInterviews.map(interview => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    onReschedule={handleReschedule}
                    onAddToCalendar={handleAddToCalendar}
                    onJoinMeeting={handleJoinMeeting}
                    onViewDetails={handleViewDetails}
                    onViewPreparation={handleViewPreparation}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-default-50 dark:bg-default-100/10 rounded-lg">
                  <Icon 
                    icon="lucide:calendar-x" 
                    className="mx-auto text-default-300 mb-4" 
                    width={48} 
                    height={48} 
                  />
                  <p className="text-default-500">No upcoming interviews scheduled.</p>
                </div>
              )}
            </div>
          </Tab>
          <Tab key="past" title={translate('interviews.past')}>
            <div className="space-y-4">
              {pastInterviews.length > 0 ? (
                pastInterviews.map(interview => (
                  <InterviewCard
                    key={interview.id}
                    interview={interview}
                    onViewDetails={handleViewDetails}
                    onViewPreparation={handleViewPreparation}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-default-50 dark:bg-default-100/10 rounded-lg">
                  <Icon 
                    icon="lucide:history" 
                    className="mx-auto text-default-300 mb-4" 
                    width={48} 
                    height={48} 
                  />
                  <p className="text-default-500">No past interviews found.</p>
                </div>
              )}
            </div>
          </Tab>
          <Tab key="preparation" title={translate('interviews.preparation')}>
            <InterviewPreparation
              jobTitle="Product Manager"
              company="InnovateCo"
              questions={practiceQuestions}
              onPractice={handlePractice}
            />
          </Tab>
        </Tabs>

        {/* Replace the simple modal with our enhanced detail modal */}
        <InterviewDetailsModal
          isOpen={interviewDetailOpen}
          onClose={handleCloseDetailModal}
          interview={activeInterview}
          onReschedule={handleReschedule}
          onAddToCalendar={handleAddToCalendar}
          onJoinMeeting={handleJoinMeeting}
        />
        
        {/* Add new practice modal */}
        <InterviewPracticeModal
          isOpen={practiceModalOpen}
          onClose={handleClosePracticeModal}
          questionId={activePracticeQuestion}
          questions={practiceQuestions}
        />
        
        {/* Add the reschedule modal */}
        <InterviewRescheduleModal
          isOpen={rescheduleModalOpen}
          onClose={() => {
            setRescheduleModalOpen(false);
            setSelectedInterviewData(null);
          }}
          interviewId={selectedInterviewData?.id || null}
          interviewTitle={selectedInterviewData?.jobTitle}
          interviewCompany={selectedInterviewData?.company}
          currentDate={selectedInterviewData?.scheduledDate}
          onRescheduleSubmit={handleRescheduleSubmit}
        />
      </div>
    </MainLayout>
  );
};