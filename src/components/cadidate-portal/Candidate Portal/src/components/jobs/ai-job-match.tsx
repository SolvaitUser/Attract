import React from 'react';
import { Card, CardBody, CircularProgress, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface AiJobMatchProps {
  matchScore: number;
  jobTitle: string;
  suggestedImprovements?: string[];
}

export const AiJobMatch: React.FC<AiJobMatchProps> = ({
  matchScore,
  jobTitle,
  suggestedImprovements = []
}) => {
  const { translate } = useLanguage();
  
  // Determine score color and text
  const getScoreInfo = () => {
    if (matchScore >= 80) {
      return {
        color: 'success',
        text: 'Excellent Match',
        icon: 'lucide:check-circle',
      };
    } else if (matchScore >= 60) {
      return {
        color: 'primary',
        text: 'Good Match',
        icon: 'lucide:thumbs-up',
      };
    } else if (matchScore >= 40) {
      return {
        color: 'warning',
        text: 'Fair Match',
        icon: 'lucide:alert-circle',
      };
    } else {
      return {
        color: 'danger',
        text: 'Low Match',
        icon: 'lucide:alert-triangle',
      };
    }
  };
  
  const scoreInfo = getScoreInfo();

  return (
    <Card shadow="sm" className="overflow-visible">
      <CardBody className="p-5">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="flex flex-col items-center justify-center"
          >
            <CircularProgress
              classNames={{
                svg: "w-32 h-32",
                indicator: `stroke-${scoreInfo.color}-500`,
                track: "stroke-default-100",
                value: "text-2xl font-semibold",
              }}
              value={matchScore}
              strokeWidth={4}
              showValueLabel={true}
              aria-label="AI Match Score"
            />
            <div className="mt-2 flex items-center gap-1 text-sm">
              <Icon icon={scoreInfo.icon} className={`text-${scoreInfo.color}-500`} width={16} />
              <span className="font-medium">{scoreInfo.text}</span>
            </div>
          </motion.div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Icon icon="lucide:sparkles" className="text-primary-500" />
              {translate('ai.suggestions')}
            </h3>
            
            <p className="text-sm text-default-600 mb-4">
              {`AI has analyzed your profile against the ${jobTitle} position. Here are some ways to improve your application:`}
            </p>
            
            <ul className="space-y-2">
              {suggestedImprovements.map((improvement, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start gap-2"
                >
                  <Icon 
                    icon="lucide:check" 
                    className="text-success-500 mt-0.5" 
                    width={16} 
                  />
                  <span className="text-sm">{improvement}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                color="primary"
                variant="flat"
                size="sm"
                startContent={<Icon icon="lucide:edit" width={14} />}
              >
                Update Profile
              </Button>
              
              <Button
                color="primary"
                variant="light"
                size="sm"
                startContent={<Icon icon="lucide:file-plus" width={14} />}
              >
                Generate Cover Letter
              </Button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
