import React from 'react';
import { Card, CardHeader, CardBody, Accordion, AccordionItem, Progress, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface PrepQuestion {
  id: string;
  question: string;
  category: string;
  suggestedAnswer?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  confidenceScore?: number;
}

interface InterviewPreparationProps {
  jobTitle: string;
  company: string;
  questions: PrepQuestion[];
  onPractice?: (questionId: string) => void;
}

export const InterviewPreparation: React.FC<InterviewPreparationProps> = ({
  jobTitle,
  company,
  questions,
  onPractice,
}) => {
  const { translate } = useLanguage();
  
  // Group questions by category
  const groupedQuestions = React.useMemo(() => {
    const groups: Record<string, PrepQuestion[]> = {};
    
    questions.forEach(question => {
      if (!groups[question.category]) {
        groups[question.category] = [];
      }
      
      groups[question.category].push(question);
    });
    
    return groups;
  }, [questions]);

  // Get difficulty indicator
  const getDifficultyInfo = (difficulty: PrepQuestion['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return { color: 'success', label: 'Easy', value: 33 };
      case 'medium':
        return { color: 'warning', label: 'Medium', value: 66 };
      case 'hard':
        return { color: 'danger', label: 'Hard', value: 100 };
      default:
        return { color: 'default', label: 'Unknown', value: 50 };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card shadow="sm" className="overflow-visible">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon icon="lucide:lightbulb" className="text-warning-500" />
            <h3 className="text-lg font-semibold">{translate('interviews.preparation')}</h3>
          </div>
          <p className="text-default-500 text-sm">
            AI-generated practice questions for your {jobTitle} interview at {company}
          </p>
        </CardHeader>

        <CardBody className="px-0">
          <Accordion variant="splitted" selectionMode="multiple" defaultExpandedKeys={['technical']}>
            {Object.entries(groupedQuestions).map(([category, questions]) => (
              <AccordionItem
                key={category}
                aria-label={category}
                title={
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{category}</span>
                      <span className="text-sm text-default-500">({questions.length} questions)</span>
                    </div>
                  </div>
                }
                className="px-6"
              >
                <div className="space-y-5 pb-2">
                  {questions.map((question, index) => {
                    const difficultyInfo = getDifficultyInfo(question.difficulty);
                    
                    return (
                      <div key={question.id} className="border border-divider rounded-lg p-4">
                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-3">
                          <h4 className="font-medium">{index + 1}. {question.question}</h4>
                          
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-default-500">Difficulty:</span>
                              <div className="w-16 h-1.5 bg-default-100 rounded-full">
                                <div 
                                  className={`h-1.5 rounded-full bg-${difficultyInfo.color}-500`}
                                  style={{ width: `${difficultyInfo.value}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs text-${difficultyInfo.color}-500`}>
                                {difficultyInfo.label}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {question.suggestedAnswer && (
                          <div className="bg-default-50 dark:bg-default-100/10 p-3 rounded-md mb-4">
                            <p className="text-sm font-medium mb-1">{translate('interviews.suggestedAnswers')}:</p>
                            <p className="text-sm">{question.suggestedAnswer}</p>
                            
                            {question.confidenceScore !== undefined && (
                              <div className="mt-3 flex items-center gap-2">
                                <span className="text-xs text-default-500">{translate('ai.confidenceLevel')}:</span>
                                <Progress 
                                  aria-label="Confidence level" 
                                  size="sm" 
                                  value={question.confidenceScore} 
                                  color={question.confidenceScore > 80 ? "success" : "warning"}
                                  className="max-w-[100px]"
                                />
                                <span className="text-xs">{question.confidenceScore}%</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <Button
                          size="sm"
                          color="primary"
                          variant="flat"
                          startContent={<Icon icon="lucide:microphone" size={14} />}
                          onPress={() => onPractice?.(question.id)}
                          className="ml-auto"
                        >
                          Practice Answer
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </CardBody>
      </Card>
    </motion.div>
  );
};
