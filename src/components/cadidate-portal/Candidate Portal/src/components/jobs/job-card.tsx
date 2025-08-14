import React from 'react';
import { Card, CardBody, Button, Chip, Link } from '@heroui/react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  department: string;
  salary?: string;
  postedDate: Date;
  deadline?: Date;
  description: string;
  matchScore?: number;
  isRecommended: boolean;
  companyLogo?: string;
  skills: string[];
}

interface JobCardProps {
  job: JobData;
  showMatchScore?: boolean;
  className?: string;
}

export const JobCard: React.FC<JobCardProps> = ({ 
  job, 
  showMatchScore = true,
  className = '' 
}) => {
  const { translate } = useLanguage();
  
  // Format posted date
  const formatPostedDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 30) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className={className}
    >
      <Card 
        shadow="sm" 
        isPressable
        isHoverable 
        className="h-full"
        as={RouterLink}
        to={`/jobs/${job.id}`}
      >
        <CardBody className="p-5">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              {job.companyLogo ? (
                <img 
                  src={job.companyLogo} 
                  alt={job.company} 
                  className="w-12 h-12 rounded-lg object-cover"
                />
              ) : (
                <div className="w-12 h-12 bg-default-100 flex items-center justify-center rounded-lg">
                  <span className="text-lg font-bold text-default-500">
                    {job.company.charAt(0)}
                  </span>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold">{job.title}</h3>
                <p className="text-sm text-default-500">{job.company}</p>
              </div>
            </div>
            
            {job.isRecommended && (
              <Chip 
                color="warning" 
                variant="flat"
                startContent={<Icon icon="lucide:star" className="text-warning-500" width={14} />}
                className="ml-auto"
              >
                {translate('jobs.recommended')}
              </Chip>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            <div className="flex items-center text-sm text-default-500 gap-1">
              <Icon icon="lucide:map-pin" width={14} />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-sm text-default-500 gap-1">
              <Icon icon="lucide:briefcase" width={14} />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center text-sm text-default-500 gap-1">
              <Icon icon="lucide:building" width={14} />
              <span>{job.department}</span>
            </div>
            <div className="flex items-center text-sm text-default-500 gap-1">
              <Icon icon="lucide:calendar" width={14} />
              <span>{formatPostedDate(job.postedDate)}</span>
            </div>
          </div>
          
          {job.salary && (
            <div className="flex items-center mt-3 text-sm gap-1">
              <Icon icon="lucide:banknote" className="text-success-500" width={14} />
              <span className="font-medium">{job.salary}</span>
            </div>
          )}
          
          {showMatchScore && job.matchScore !== undefined && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium">{translate('jobs.matchScore')}</span>
                <span className="text-xs font-semibold">{job.matchScore}%</span>
              </div>
              <div className="w-full h-1.5 bg-default-100 rounded-full">
                <div 
                  className={`h-1.5 rounded-full ${
                    job.matchScore > 80 ? 'bg-success-500' : 
                    job.matchScore > 60 ? 'bg-primary-500' : 
                    job.matchScore > 40 ? 'bg-warning-500' : 'bg-danger-500'
                  }`}
                  style={{ width: `${job.matchScore}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mt-4">
            {job.skills.slice(0, 3).map((skill, index) => (
              <Chip key={index} size="sm" variant="flat" color="default">
                {skill}
              </Chip>
            ))}
            {job.skills.length > 3 && (
              <Chip size="sm" variant="flat" color="default">
                +{job.skills.length - 3}
              </Chip>
            )}
          </div>
          
          <div className="mt-4 text-right">
            <Button
              as={RouterLink}
              to={`/jobs/${job.id}`}
              color="primary"
              variant="flat"
              size="sm"
              className="font-medium"
              endContent={<Icon icon="lucide:chevron-right" width={16} />}
            >
              {translate('jobs.apply')}
            </Button>
          </div>
        </CardBody>
      </Card>
    </motion.div>
  );
};
