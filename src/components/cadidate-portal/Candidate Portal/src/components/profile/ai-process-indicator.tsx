import React from 'react';
import { Card, Progress, Spinner } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface AiProcessIndicatorProps {
  stage?: 'extracting' | 'analyzing' | 'applying' | 'complete';
  confidenceScore?: number;
  isVisible: boolean;
}

export const AiProcessIndicator: React.FC<AiProcessIndicatorProps> = ({ 
  stage = 'extracting', 
  confidenceScore = 85,
  isVisible 
}) => {
  const { translate } = useLanguage();
  
  if (!isVisible) return null;
  
  const stageConfig = {
    extracting: {
      title: 'Extracting Data',
      description: 'Parsing resume information...',
      icon: 'lucide:file-text',
      progress: 25,
    },
    analyzing: {
      title: 'Analyzing Content',
      description: 'Analyzing your experience and skills...',
      icon: 'lucide:brain-circuit',
      progress: 65, 
    },
    applying: {
      title: 'Applying AI Insights',
      description: 'Enhancing your profile with AI data...',
      icon: 'lucide:sparkles',
      progress: 85,
    },
    complete: {
      title: 'Process Complete',
      description: 'AI enhancements applied successfully.',
      icon: 'lucide:check-circle',
      progress: 100,
    }
  };
  
  const currentConfig = stageConfig[stage];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800">
        <div className="p-4 flex items-center gap-4">
          <div className="bg-primary-100 dark:bg-primary-800/50 rounded-full p-3">
            {stage === 'analyzing' || stage === 'applying' ? (
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              >
                <Icon icon={currentConfig.icon} className="text-primary-500" width={24} height={24} />
              </motion.div>
            ) : stage === 'complete' ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Icon icon={currentConfig.icon} className="text-success-500" width={24} height={24} />
              </motion.div>
            ) : (
              <Icon icon={currentConfig.icon} className="text-primary-500" width={24} height={24} />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold text-sm">{translate('ai.processing')}: {currentConfig.title}</h4>
              {stage !== 'complete' && <Spinner size="sm" color="primary" />}
            </div>
            <p className="text-xs text-default-600 mb-2">{currentConfig.description}</p>
            <Progress 
              aria-label="AI Processing" 
              value={currentConfig.progress}
              color={stage === 'complete' ? 'success' : 'primary'} 
              size="sm"
              className="max-w-full"
            />

            {(stage === 'complete' || stage === 'applying') && (
              <div className="mt-2 flex items-center">
                <span className="text-xs font-medium mr-2">{translate('ai.confidenceLevel')}:</span>
                <div className="flex-1 h-1.5 rounded-full bg-default-100 max-w-[120px]">
                  <div 
                    className={`h-1.5 rounded-full ${
                      confidenceScore > 80 ? 'bg-success-500' : 
                      confidenceScore > 60 ? 'bg-warning-500' : 'bg-danger-500'
                    }`}
                    style={{ width: `${confidenceScore}%` }}
                  ></div>
                </div>
                <span className="text-xs ml-2">{confidenceScore}%</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
