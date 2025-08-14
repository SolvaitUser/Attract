import React from 'react';
import { Card, CardBody, CardHeader, Tooltip } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface InterviewStage {
  id: string;
  name: string;
  completed: boolean;
  current?: boolean;
  date?: Date;
}

interface InterviewTimelineProps {
  stages: InterviewStage[];
}

export const InterviewTimeline: React.FC<InterviewTimelineProps> = ({ stages }) => {
  const { translate } = useLanguage();
  
  return (
    <Card shadow="sm" className="overflow-visible">
      <CardHeader className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Icon icon="lucide:git-branch" className="text-primary-500" />
          <h3 className="text-lg font-semibold">Interview Process</h3>
        </div>
        <p className="text-default-500 text-sm">
          Track your position in the interview lifecycle
        </p>
      </CardHeader>
      
      <CardBody className="px-6 py-4">
        <div className="relative">
          {/* Main timeline container with connector line */}
          <div className="relative pb-4">
            {/* Timeline connector line */}
            <div className="absolute left-6 md:left-1/2 top-6 bottom-6 w-px bg-default-200 transform -translate-x-1/2 z-0"></div>
            
            {/* Timeline stages grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative"
                >
                  {/* Stage connector dot */}
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-default-200 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div 
                      className={`absolute inset-0 w-6 h-6 rounded-full border-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 ${
                        stage.completed ? 'bg-success-500 border-success-200' : 
                        stage.current ? 'bg-primary-500 border-primary-200 animate-pulse' : 
                        'bg-default-100 border-default-200'
                      }`}
                    >
                      {stage.completed && (
                        <Icon icon="lucide:check" className="text-white text-xs absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      )}
                      {stage.current && (
                        <Icon icon="lucide:arrow-right" className="text-white text-xs absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      )}
                    </div>
                  </div>
                  
                  {/* Stage card */}
                  <Card
                    shadow="sm"
                    className={`px-0 mt-6 border ${
                      stage.completed ? 'border-success-200 dark:border-success-800' :
                      stage.current ? 'border-primary-200 dark:border-primary-800' :
                      'border-default-200 dark:border-default-700'
                    }`}
                  >
                    <CardBody className="p-4">
                      {/* Status indicator - moved to top of card */}
                      <div className={`flex items-center gap-1 mb-3 text-sm ${
                        stage.completed ? 'text-success-500' : 
                        stage.current ? 'text-primary-500' : 
                        'text-default-500'
                      }`}>
                        <Icon 
                          icon={
                            stage.completed ? "lucide:check-circle" : 
                            stage.current ? "lucide:arrow-right-circle" : 
                            "lucide:clock"
                          } 
                          size={16}
                          className="shrink-0" 
                        />
                        <span className="font-medium">
                          {stage.completed ? 'Completed' : 
                           stage.current ? 'Current Stage' : 
                           'Upcoming'}
                        </span>
                      </div>
                      
                      <h4 className="font-medium text-md">{stage.name}</h4>
                      {stage.date && (
                        <p className="text-sm text-default-500 mt-1 flex items-center gap-1">
                          <Icon icon="lucide:calendar" size={14} />
                          {new Date(stage.date).toLocaleDateString()}
                        </p>
                      )}
                      
                      {/* Optional content area for any additional stage details */}
                      <div className={`mt-3 pt-3 border-t border-divider text-sm ${
                        stage.completed ? 'text-success-700 dark:text-success-400' : 
                        stage.current ? 'text-primary-700 dark:text-primary-400' : 
                        'text-default-600'
                      }`}>
                        {stage.completed && "This stage has been completed successfully"}
                        {stage.current && "You are currently in this stage of the process"}
                        {!stage.completed && !stage.current && "This stage will begin after the current stage is completed"}
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};