import React from 'react';
    import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Progress, Card } from '@heroui/react';
    import { motion } from 'framer-motion';
    import { Icon } from '@iconify/react';
    import { useLanguage } from '../../contexts/language-context';

    interface PracticeQuestion {
      id: string;
      question: string;
      category: string;
      suggestedAnswer?: string;
      difficulty: 'easy' | 'medium' | 'hard';
      confidenceScore?: number;
    }

    interface InterviewPracticeModalProps {
      isOpen: boolean;
      onClose: () => void;
      questionId: string | null;
      questions: PracticeQuestion[];
    }

    export const InterviewPracticeModal: React.FC<InterviewPracticeModalProps> = ({
      isOpen,
      onClose,
      questionId,
      questions,
    }) => {
      const { translate } = useLanguage();
      const [mode, setMode] = React.useState<'intro' | 'recording' | 'analyzing' | 'feedback'>('intro');
      const [recordingTime, setRecordingTime] = React.useState(0);
      const [isRecording, setIsRecording] = React.useState(false);
      const [analysisProgress, setAnalysisProgress] = React.useState(0);
      
      // Find the active question
      const activeQuestion = React.useMemo(() => {
        return questions.find(q => q.id === questionId) || null;
      }, [questionId, questions]);
      
      // Timer for recording
      React.useEffect(() => {
        let interval: NodeJS.Timeout;
        
        if (isRecording) {
          interval = setInterval(() => {
            setRecordingTime(prev => prev + 1);
          }, 1000);
        }
        
        return () => {
          if (interval) clearInterval(interval);
        };
      }, [isRecording]);
      
      // Reset state when modal is opened/closed
      React.useEffect(() => {
        if (isOpen) {
          setMode('intro');
          setRecordingTime(0);
          setIsRecording(false);
          setAnalysisProgress(0);
        }
      }, [isOpen]);
      
      // Format recording time
      const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
      
      // Start recording
      const startRecording = () => {
        setMode('recording');
        setIsRecording(true);
      };
      
      // Stop recording and analyze
      const stopRecording = () => {
        setIsRecording(false);
        setMode('analyzing');
        
        // Simulate analysis progress
        let progress = 0;
        const interval = setInterval(() => {
          progress += 5;
          setAnalysisProgress(progress);
          
          if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setMode('feedback');
            }, 500);
          }
        }, 200);
      };
      
      // Try again
      const tryAgain = () => {
        setMode('intro');
        setRecordingTime(0);
      };
      
      // Get difficulty color
      const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
          case 'easy': return 'success';
          case 'medium': return 'warning';
          case 'hard': return 'danger';
          default: return 'default';
        }
      };
      
      if (!activeQuestion) return null;
      
      return (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          size="2xl"
        >
          <ModalContent>
            {(onModalClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Icon icon="lucide:mic" className="text-primary-500" />
                    <h2 className="text-xl font-semibold">Practice Interview Question</h2>
                  </div>
                  <p className="text-default-500 text-sm">
                    {activeQuestion.category} ({activeQuestion.difficulty} difficulty)
                  </p>
                </ModalHeader>
                
                <ModalBody>
                  <Card className="bg-default-50 dark:bg-default-100/10 p-4 mb-6">
                    <h3 className="text-lg font-medium mb-2">{activeQuestion.question}</h3>
                    <div className="flex items-center">
                      <Badge 
                        color={getDifficultyColor(activeQuestion.difficulty)}
                        variant="flat"
                      >
                        {activeQuestion.difficulty.charAt(0).toUpperCase() + activeQuestion.difficulty.slice(1)}
                      </Badge>
                    </div>
                  </Card>
                  
                  {mode === 'intro' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <p>
                        Practice answering this interview question to improve your skills.
                        We'll analyze your response and provide feedback.
                      </p>
                      
                      <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg border border-primary-200 dark:border-primary-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon icon="lucide:lightbulb" className="text-primary-500" />
                          <h4 className="font-medium">Tips for this question:</h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Icon 
                              icon="lucide:check" 
                              className="text-success-500 mt-1 shrink-0" 
                              size={16}
                            />
                            <span>Structure your answer using the STAR method (Situation, Task, Action, Result)</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon 
                              icon="lucide:check" 
                              className="text-success-500 mt-1 shrink-0"
                              size={16}
                            />
                            <span>Provide specific examples from your experience</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon 
                              icon="lucide:check"
                              className="text-success-500 mt-1 shrink-0"
                              size={16}
                            />
                            <span>Keep your answer concise (1-2 minutes)</span>
                          </li>
                        </ul>
                      </div>
                      
                      {activeQuestion.suggestedAnswer && (
                        <div className="space-y-2">
                          <p className="font-medium">Sample answer:</p>
                          <div className="bg-default-100/50 dark:bg-default-200/10 p-3 rounded-lg text-sm">
                            {activeQuestion.suggestedAnswer}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                  
                  {mode === 'recording' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center min-h-[200px]"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="bg-danger-100 dark:bg-danger-900/20 w-20 h-20 rounded-full flex items-center justify-center mb-4"
                      >
                        <Icon icon="lucide:mic" className="text-danger-500" size={32} />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-2">Recording...</h3>
                      <p className="text-2xl font-mono mb-4">{formatTime(recordingTime)}</p>
                      <p className="text-center text-default-500 max-w-md mb-4">
                        Answer the question as if you were in a real interview.
                        Speak clearly and try to address all aspects of the question.
                      </p>
                    </motion.div>
                  )}
                  
                  {mode === 'analyzing' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-col items-center justify-center min-h-[200px]"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="mb-4"
                      >
                        <Icon icon="lucide:loader" className="text-primary-500" size={40} />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold mb-4">Analyzing your answer...</h3>
                      <Progress
                        aria-label="Analysis progress"
                        value={analysisProgress}
                        color="primary"
                        className="max-w-md w-full mb-4"
                      />
                      <p className="text-center text-default-500">
                        Our AI is analyzing your response for content, delivery, and relevance.
                      </p>
                    </motion.div>
                  )}
                  
                  {mode === 'feedback' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                    >
                      <div className="bg-success-50 dark:bg-success-900/20 p-4 rounded-lg border border-success-200 dark:border-success-800">
                        <div className="flex items-center gap-2 mb-2">
                          <Icon icon="lucide:check-circle" className="text-success-500" size={20} />
                          <h4 className="font-medium">Analysis Complete</h4>
                        </div>
                        <p className="text-sm">
                          Your answer was analyzed successfully. Here's your feedback.
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Content Score</h4>
                          <div className="flex items-center gap-3">
                            <Progress
                              aria-label="Content score"
                              value={85}
                              color="primary"
                              className="flex-1"
                              showValueLabel={true}
                            />
                            <span className="font-medium">85%</span>
                          </div>
                          <p className="text-sm text-default-500 mt-1">
                            Your answer covered key points and was well structured.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Delivery</h4>
                          <div className="flex items-center gap-3">
                            <Progress
                              aria-label="Delivery score"
                              value={78}
                              color="primary"
                              className="flex-1"
                              showValueLabel={true}
                            />
                            <span className="font-medium">78%</span>
                          </div>
                          <p className="text-sm text-default-500 mt-1">
                            Good pace, but consider reducing filler words.
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Relevance</h4>
                          <div className="flex items-center gap-3">
                            <Progress
                              aria-label="Relevance score"
                              value={90}
                              color="primary"
                              className="flex-1"
                              showValueLabel={true}
                            />
                            <span className="font-medium">90%</span>
                          </div>
                          <p className="text-sm text-default-500 mt-1">
                            Excellent job staying on topic and addressing the question directly.
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-default-50 dark:bg-default-100/10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Key Improvements</h4>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <Icon 
                              icon="lucide:zap" 
                              className="text-warning-500 mt-1 shrink-0"
                              size={16}
                            />
                            <span>Include more quantifiable results from your examples</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon 
                              icon="lucide:zap"
                              className="text-warning-500 mt-1 shrink-0"
                              size={16}
                            />
                            <span>Reduce usage of filler words like "um" and "like"</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Icon 
                              icon="lucide:zap"
                              className="text-warning-500 mt-1 shrink-0"
                              size={16}
                            />
                            <span>Consider a more concise conclusion to your answer</span>
                          </li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </ModalBody>
                
                <ModalFooter>
                  {mode === 'intro' && (
                    <>
                      <Button variant="flat" color="default" onPress={onModalClose}>
                        Cancel
                      </Button>
                      <Button 
                        color="primary" 
                        onPress={startRecording}
                        startContent={<Icon icon="lucide:mic" size={16} />}
                      >
                        Start Recording
                      </Button>
                    </>
                  )}
                  
                  {mode === 'recording' && (
                    <Button 
                      color="danger" 
                      onPress={stopRecording}
                      startContent={<Icon icon="lucide:square" size={16} />}
                    >
                      Stop Recording
                    </Button>
                  )}
                  
                  {mode === 'analyzing' && (
                    <Button variant="flat" color="default" isDisabled={true}>
                      Analyzing...
                    </Button>
                  )}
                  
                  {mode === 'feedback' && (
                    <>
                      <Button variant="flat" color="default" onPress={onModalClose}>
                        Close
                      </Button>
                      <Button 
                        color="primary" 
                        onPress={tryAgain}
                        startContent={<Icon icon="lucide:repeat" size={16} />}
                      >
                        Try Again
                      </Button>
                    </>
                  )}
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      );
    };