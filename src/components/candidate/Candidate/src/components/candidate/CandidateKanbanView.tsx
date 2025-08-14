import React from 'react';
import { Card, CardHeader, CardBody, Checkbox, Badge, Avatar, Tooltip, Progress, ScrollShadow } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';

interface CandidateKanbanViewProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onSelectCandidate: (id: string, selected: boolean) => void;
  onViewCandidate: (candidate: Candidate) => void;
  onStageChange: (candidateId: string, stage: Candidate['stage']) => void;
}

interface StageColumn {
  key: Candidate['stage'];
  titleKey: string;
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  icon: string;
}

const CandidateKanbanView: React.FC<CandidateKanbanViewProps> = ({ 
  candidates, 
  selectedCandidates, 
  onSelectCandidate, 
  onViewCandidate,
  onStageChange 
}) => {
  const { t, language } = useLanguage();

  const stages: StageColumn[] = [
    { key: 'new', titleKey: 'new', color: 'primary', icon: 'lucide:inbox' },
    { key: 'shortlisted', titleKey: 'shortlisted', color: 'secondary', icon: 'lucide:list-checks' },
    { key: 'interviewed', titleKey: 'interviewed', color: 'warning', icon: 'lucide:video' },
    { key: 'offered', titleKey: 'offered', color: 'success', icon: 'lucide:mail-check' },
    { key: 'hired', titleKey: 'hired', color: 'success', icon: 'lucide:check-circle' },
    { key: 'rejected', titleKey: 'rejected', color: 'danger', icon: 'lucide:x-circle' },
  ];

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    e.dataTransfer.setData('candidateId', candidateId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: Candidate['stage']) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('candidateId');
    onStageChange(candidateId, stage);
  };

  const getCandidatesByStage = (stage: Candidate['stage']) => {
    return candidates.filter(candidate => candidate.stage === stage);
  };

  const getSourceIcon = (source: Candidate['source']) => {
    switch (source) {
      case 'linkedin': return 'lucide:linkedin';
      case 'portal': return 'lucide:globe';
      case 'referral': return 'lucide:users';
      default: return 'lucide:file';
    }
  };

  return (
    <div className="flex gap-4 h-full overflow-x-auto pb-4">
      {stages.map((stage) => (
        <div 
          key={stage.key}
          className="w-80 flex-shrink-0"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, stage.key)}
        >
          <Card shadow="sm" className="h-full">
            <CardHeader className="flex justify-between items-center px-4 py-3 bg-default-50">
              <div className="flex items-center gap-2">
                <div className={`rounded-full p-1.5 bg-${stage.color}-100`}>
                  <Icon 
                    icon={stage.icon} 
                    className={`text-${stage.color}-500 ${language === 'ar' ? 'icon-flip' : ''}`}
                    width={16}
                    height={16}
                  />
                </div>
                <h3 className="font-semibold text-sm">{t(stage.titleKey)}</h3>
                <Badge color={stage.color} size="sm" variant="flat">
                  {getCandidatesByStage(stage.key).length}
                </Badge>
              </div>
            </CardHeader>
            <CardBody className="p-2 overflow-hidden h-[calc(100%-56px)]">
              <ScrollShadow className="h-full">
                <div className="space-y-2 p-2">
                  {getCandidatesByStage(stage.key).length === 0 ? (
                    <div className="flex items-center justify-center h-20 border-2 border-dashed rounded-lg border-gray-200">
                      <p className="text-gray-500 text-sm">{t('noCandidate')}</p>
                    </div>
                  ) : (
                    getCandidatesByStage(stage.key).map(candidate => (
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
                          <Tooltip content={t(candidate.source)}>
                            <div className="p-1">
                              <Icon icon={getSourceIcon(candidate.source)} className="text-default-400" />
                            </div>
                          </Tooltip>
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
  );
};

export default CandidateKanbanView;