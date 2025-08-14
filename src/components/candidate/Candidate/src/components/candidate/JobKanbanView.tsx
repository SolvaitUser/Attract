import React from 'react';
import { Card, CardHeader, CardBody, Checkbox, Badge, Avatar, Tooltip, Progress, ScrollShadow, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';
import { mockJobRequisitions } from '../../data/mockJobData';

interface JobKanbanViewProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onSelectCandidate: (id: string, selected: boolean) => void;
  onViewCandidate: (candidate: Candidate) => void;
  onStageChange: (candidateId: string, stage: Candidate['stage']) => void;
  getJobTitleById: (jobId: string) => string;
  onLinkedInSearch?: (jobId: string) => void;
}

const JobKanbanView: React.FC<JobKanbanViewProps> = ({ 
  candidates, 
  selectedCandidates, 
  onSelectCandidate, 
  onViewCandidate,
  onStageChange,
  getJobTitleById,
  onLinkedInSearch = () => {},
}) => {
  const { t, language } = useLanguage();
  const [currentPage, setCurrentPage] = React.useState(0);
  const jobsPerPage = 3;
  
  // Filter to only jobs that have candidates
  const activeJobIds = React.useMemo(() => {
    const uniqueJobIds = [...new Set(candidates.map(c => c.jobRequisitionId))];
    return uniqueJobIds.filter(id => mockJobRequisitions.some(job => job.id === id));
  }, [candidates]);
  
  // All jobs for cycling
  const allJobs = React.useMemo(() => {
    return mockJobRequisitions;
  }, []);
  
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);
  
  const displayedJobs = React.useMemo(() => {
    const startIndex = currentPage * jobsPerPage;
    return allJobs.slice(startIndex, startIndex + jobsPerPage);
  }, [allJobs, currentPage, jobsPerPage]);
  
  const handleNextPage = () => {
    setCurrentPage(prev => (prev + 1) % totalPages);
  };
  
  const handlePrevPage = () => {
    setCurrentPage(prev => (prev - 1 + totalPages) % totalPages);
  };

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    e.dataTransfer.setData('candidateId', candidateId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, jobId: string) => {
    // This would need a new handler to change job assignment
    e.preventDefault();
    // Implementation would go here
  };

  const getCandidatesByJob = (jobId: string) => {
    return candidates.filter(candidate => candidate.jobRequisitionId === jobId);
  };

  const getStageColor = (stage: Candidate['stage']) => {
    switch (stage) {
      case 'new': return 'primary';
      case 'shortlisted': return 'secondary';
      case 'interviewed': return 'warning';
      case 'offered': return 'success';
      case 'hired': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  const getSourceIcon = (source: Candidate['source']) => {
    switch (source) {
      case 'linkedin': return 'lucide:linkedin';
      case 'portal': return 'lucide:globe';
      case 'referral': return 'lucide:users';
      default: return 'lucide:file';
    }
  };

  // Add a function to count candidates for each job
  const getCandidateCountForJob = (jobId: string) => {
    return candidates.filter(candidate => candidate.jobRequisitionId === jobId).length;
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-3 px-2">
        <Button
          isIconOnly
          variant="light"
          onPress={handlePrevPage}
          className={`${language === 'ar' ? 'ml-auto' : 'mr-auto'} hover:bg-default-100`}
          aria-label={t('previousPage')}
        >
          <Icon 
            icon={language === 'ar' ? "lucide:chevron-right" : "lucide:chevron-left"} 
            width={18}
            height={18}
          />
        </Button>
        
        <span className="text-sm text-default-600">
          {t('pageInfo', { current: currentPage + 1, total: totalPages })}
        </span>
        
        <Button
          isIconOnly
          variant="light"
          onPress={handleNextPage}
          className={`${language === 'ar' ? 'mr-auto' : 'ml-auto'} hover:bg-default-100`}
          aria-label={t('nextPage')}
        >
          <Icon 
            icon={language === 'ar' ? "lucide:chevron-left" : "lucide:chevron-right"} 
            width={18}
            height={18}
          />
        </Button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
        {displayedJobs.map((job) => (
          <div 
            key={job.id}
            className="w-80 flex-shrink-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, job.id)}
          >
            <Card shadow="sm" className="h-full">
              <CardHeader className="flex justify-between items-center px-4 py-3 bg-default-50">
                <div className="flex items-center gap-2">
                  <div className="rounded-full p-1.5 bg-wise-blue-100">
                    <Icon 
                      icon="lucide:briefcase" 
                      className={`text-wise-blue-500 ${language === 'ar' ? 'icon-flip' : ''}`} 
                      width={16}
                      height={16}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{job.title}</h3>
                    <p className="text-xs text-default-500">{job.department}</p>
                  </div>
                  <Badge color="primary" size="sm" variant="flat">
                    {getCandidateCountForJob(job.id)}
                  </Badge>
                </div>
                <div className="flex">
                  <Tooltip content={t('searchLinkedIn')}>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="text-secondary"
                      onPress={() => onLinkedInSearch(job.id)}
                    >
                      <Icon icon="lucide:linkedin" />
                    </Button>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardBody className="p-2 overflow-hidden h-[calc(100%-86px)]">
                <ScrollShadow className="h-full">
                  <div className="space-y-2 p-2">
                    {getCandidatesByJob(job.id).length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-lg border-gray-200">
                        <Icon icon="lucide:user-x" className="h-6 w-6 text-gray-400 mb-2" />
                        <p className="text-gray-500 text-sm">{t('noCandidateForJob')}</p>
                        <Button 
                          size="sm" 
                          color="primary" 
                          variant="light" 
                          className="mt-3"
                          startContent={<Icon icon="lucide:user-plus" className={language === 'ar' ? 'icon-flip' : ''} />}
                          // This would open the add candidate modal pre-selecting this job
                        >
                          {t('addCandidateForJob')}
                        </Button>
                      </div>
                    ) : (
                      getCandidatesByJob(job.id).map(candidate => (
                        <Card
                          key={candidate.id}
                          className="p-3 cursor-pointer group border border-default-200"
                          isPressable
                          onPress={() => onViewCandidate(candidate)}
                          draggable
                          onDragStart={(e) => handleDragStart(e, candidate.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                isSelected={selectedCandidates.includes(candidate.id)}
                                onValueChange={(isSelected) => onSelectCandidate(candidate.id, isSelected)}
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Select ${candidate.name}`}
                              />
                              <Avatar 
                                src={candidate.photoUrl} 
                                name={candidate.name} 
                                size="sm" 
                              />
                              <div>
                                <p className="font-medium">{candidate.name}</p>
                                <p className="text-xs text-default-500">{candidate.jobTitle || ""}</p>
                              </div>
                            </div>
                            <Badge color={getStageColor(candidate.stage)} size="sm">
                              {t(candidate.stage)}
                            </Badge>
                          </div>
                          
                          <div className="text-xs space-y-2 mt-3">
                            <div className="flex items-center justify-between">
                              <span className="text-default-600">{t('matchScore')}</span>
                              <span className="font-medium">{candidate.aiScore}%</span>
                            </div>
                            <Progress 
                              value={candidate.aiScore} 
                              color={candidate.aiScore > 85 ? "success" : candidate.aiScore > 70 ? "primary" : "default"} 
                              size="sm" 
                              className="w-full" 
                            />
                            
                            <div className="flex items-center text-default-600 mt-2">
                              <Icon icon="lucide:calendar" className="text-default-400 w-3 h-3 mr-1" />
                              <span>
                                {new Date(candidate.dateAdded).toLocaleDateString(
                                  language === 'ar' ? 'ar-AE' : 'en-US',
                                  { day: 'numeric', month: 'short' }
                                )}
                              </span>
                            </div>
                          </div>

                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100">
                            <Tooltip content={t('dragToMove')}>
                              <div className="p-1 text-default-400">
                                <Icon icon="lucide:move" className="h-4 w-4" />
                              </div>
                            </Tooltip>
                          </div>
                        </Card>
                      ))
                    )}
                  </div>
                </ScrollShadow>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      
      {allJobs.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <Icon icon="lucide:briefcase-x" className="h-12 w-12 text-gray-300 mb-4" />
          <p className="text-xl text-gray-500 font-medium mb-2">{t('noJobsFound')}</p>
          <p className="text-gray-500 mb-6">{t('createJobFirst')}</p>
          <Button 
            color="primary"
            startContent={<Icon icon="lucide:plus" />}
          >
            {t('createJobRequisition')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default JobKanbanView;