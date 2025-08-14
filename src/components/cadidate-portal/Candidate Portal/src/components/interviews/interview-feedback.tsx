import React from 'react';
    import { Card, CardBody, CardHeader, Progress } from '@heroui/react';
    import { motion } from 'framer-motion';
    import { Icon } from '@iconify/react';
    import { useLanguage } from '../../contexts/language-context';

    interface FeedbackData {
      strengths: string[];
      improvements: string[];
      overallRating: number;
      nextSteps?: string;
      notes?: string;
    }

    interface InterviewFeedbackProps {
      feedback: FeedbackData;
    }

    export const InterviewFeedback: React.FC<InterviewFeedbackProps> = ({ feedback }) => {
      const { translate } = useLanguage();
      
      // Animation variants
      const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      };
      
      const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 }
      };
      
      return (
        <Card shadow="sm" className="overflow-visible border border-primary-200 dark:border-primary-700">
          <CardHeader className="bg-primary-50 dark:bg-primary-900/20 flex items-center gap-2">
            <Icon icon="lucide:clipboard-check" className="text-primary-500" size={20} />
            <h3 className="text-lg font-semibold">Interview Feedback</h3>
          </CardHeader>
          
          <CardBody>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Icon icon="lucide:thumbs-up" className="text-success-500 mr-2" />
                    <h4 className="font-medium">Strengths</h4>
                  </div>
                  
                  <motion.ul 
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {feedback.strengths.map((strength, index) => (
                      <motion.li 
                        key={index} 
                        variants={itemVariants}
                        className="flex items-start gap-2"
                      >
                        <Icon 
                          icon="lucide:check-circle" 
                          className="text-success-500 mt-1 shrink-0" 
                          size={16} 
                        />
                        <span>{strength}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Icon icon="lucide:zap" className="text-warning-500 mr-2" />
                    <h4 className="font-medium">Areas for Improvement</h4>
                  </div>
                  
                  <motion.ul 
                    className="space-y-2"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {feedback.improvements.map((improvement, index) => (
                      <motion.li 
                        key={index} 
                        variants={itemVariants}
                        className="flex items-start gap-2"
                      >
                        <Icon 
                          icon="lucide:arrow-up-right" 
                          className="text-warning-500 mt-1 shrink-0" 
                          size={16} 
                        />
                        <span>{improvement}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
                
                {feedback.nextSteps && (
                  <div className="mt-4 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <div className="flex items-center mb-1">
                      <Icon icon="lucide:git-fork" className="text-primary-500 mr-2" />
                      <h4 className="font-medium">Next Steps</h4>
                    </div>
                    <p>{feedback.nextSteps}</p>
                  </div>
                )}
              </div>
              
              <div>
                <div className="bg-default-50 dark:bg-default-100/10 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Overall Performance</h4>
                  
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.div 
                        key={rating}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: rating * 0.1 }}
                        className="relative"
                      >
                        <Icon 
                          icon="lucide:star" 
                          className={`w-8 h-8 ${
                            rating <= feedback.overallRating
                              ? 'text-warning-400'
                              : 'text-default-200'
                          }`}
                        />
                      </motion.div>
                    ))}
                    <span className="ml-2 font-medium">
                      {feedback.overallRating}/5
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Technical Skills</span>
                        <span>85%</span>
                      </div>
                      <Progress
                        aria-label="Technical Skills"
                        value={85}
                        color="primary"
                        className="h-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Communication</span>
                        <span>90%</span>
                      </div>
                      <Progress
                        aria-label="Communication"
                        value={90}
                        color="success"
                        className="h-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Problem Solving</span>
                        <span>78%</span>
                      </div>
                      <Progress
                        aria-label="Problem Solving"
                        value={78}
                        color="primary"
                        className="h-2"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Cultural Fit</span>
                        <span>95%</span>
                      </div>
                      <Progress
                        aria-label="Cultural Fit"
                        value={95}
                        color="success"
                        className="h-2"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 border-t border-divider pt-4">
                    <span className="text-xs text-default-500">Feedback based on your recent interview performance</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      );
    };