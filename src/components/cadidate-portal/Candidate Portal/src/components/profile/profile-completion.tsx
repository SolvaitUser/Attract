import React from 'react';
import { Card, CardBody, Progress, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface ProfileCompletionProps {
  completionPercentage: number;
  suggestedFields?: string[];
  onActionClick?: (field: string) => void;
}

export const ProfileCompletion: React.FC<ProfileCompletionProps> = ({
  completionPercentage,
  suggestedFields = [],
  onActionClick
}) => {
  const { translate } = useLanguage();

  // Map field names to icons and text
  const fieldConfig: Record<string, { icon: string; text: string }> = {
    'skills': { 
      icon: 'lucide:award', 
      text: translate('profile.skills')
    },
    'education': { 
      icon: 'lucide:graduation-cap', 
      text: translate('profile.education')
    },
    'workExperience': { 
      icon: 'lucide:briefcase', 
      text: translate('profile.workExperience')
    },
    'profilePicture': { 
      icon: 'lucide:image', 
      text: translate('profile.profilePicture')
    },
    'certifications': { 
      icon: 'lucide:award', 
      text: translate('profile.certifications')
    },
    'languages': { 
      icon: 'lucide:languages', 
      text: translate('profile.languages')
    },
    'jobPreferences': { 
      icon: 'lucide:filter', 
      text: translate('profile.jobPreferences')
    },
  };

  // Get color based on completion percentage
  const getStatusColor = () => {
    if (completionPercentage < 40) return 'danger';
    if (completionPercentage < 70) return 'warning';
    if (completionPercentage < 90) return 'secondary';
    return 'success';
  };

  // Get encouraging message based on completion percentage
  const getMessage = () => {
    if (completionPercentage < 40) return 'Get started with your profile!';
    if (completionPercentage < 70) return 'Good progress! Keep going.';
    if (completionPercentage < 90) return 'Almost there! Just a few more steps.';
    if (completionPercentage < 100) return 'Your profile is almost complete!';
    return 'Excellent! Your profile is complete.';
  };

  return (
    <Card shadow="sm" className="overflow-visible">
      <CardBody className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold">{translate('profile.completionStatus')}</h3>
            <p className="text-default-500 text-sm">{getMessage()}</p>
          </div>
          <div className="text-2xl font-bold text-primary mt-2 md:mt-0">
            {completionPercentage}%
          </div>
        </div>
        
        <Progress
          aria-label="Profile completion"
          value={completionPercentage}
          color={getStatusColor()}
          className="h-2 mb-4"
        />
        
        {suggestedFields.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
              <Icon icon="lucide:sparkles" className="text-primary-500" />
              {translate('profile.suggestedFields')}:
            </h4>
            <div className="flex flex-wrap gap-2">
              {suggestedFields.map(field => (
                <Button
                  key={field}
                  size="sm"
                  variant="flat"
                  color="primary"
                  startContent={
                    <Icon 
                      icon={fieldConfig[field]?.icon || 'lucide:plus'} 
                      width={14} 
                      height={14}
                    />
                  }
                  onPress={() => onActionClick?.(field)}
                >
                  {fieldConfig[field]?.text || field}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </CardBody>
    </Card>
  );
};
