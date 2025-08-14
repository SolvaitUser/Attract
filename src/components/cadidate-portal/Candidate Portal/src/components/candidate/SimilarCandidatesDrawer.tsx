import React, { useState, useEffect } from 'react';
import { 
  Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter,
  Button, Badge, Card, CardBody, Avatar, Progress, Dropdown, 
  DropdownTrigger, DropdownMenu, DropdownItem, Divider, useDisclosure,
  Tooltip, Select, SelectItem 
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';
import { mockCandidates } from '../../data/mockCandidateData';
import CandidateCompareView from './CandidateCompareView';
import ScheduleInterviewModal from './ScheduleInterviewModal';
import RejectCandidateModal from './RejectCandidateModal';
import AddNoteModal from './AddNoteModal';

interface SimilarCandidatesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
  onViewCandidate: (candidate: Candidate) => void;
  onStageChange: (candidateId: string, stage: Candidate['stage']) => void;
}

const SimilarCandidatesDrawer: React.FC<SimilarCandidatesDrawerProps> = ({
  isOpen,
  onClose,
  candidate,
  onViewCandidate,
  onStageChange
}) => {
  const { t, language } = useLanguage();
  const [similarCandidates, setSimilarCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [sortBy, setSortBy] = useState<string>('matchScore');
  
  // Modals
  const { 
    isOpen: isInterviewModalOpen, 
    onOpen: openInterviewModal, 
    onClose: closeInterviewModal 
  } = useDisclosure();
  
  const { 
    isOpen: isRejectModalOpen, 
    onOpen: openRejectModal, 
    onClose: closeRejectModal 
  } = useDisclosure();
  
  const { 
    isOpen: isNoteModalOpen, 
    onOpen: openNoteModal, 
    onClose: closeNoteModal 
  } = useDisclosure();
  
  // Simulate finding similar candidates
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // For demo purposes, we'll filter and sort all candidates that aren't the current one
      // In a real app, this would be an API call with AI matching
      
      // Simulate API delay
      const timer = setTimeout(() => {
        // Get candidates that aren't the current one
        const otherCandidates = mockCandidates.filter(c => c.id !== candidate.id);
        
        // Calculate similarity scores (this would be done by an AI algorithm in a real app)
        const similarCandidatesWithScores = otherCandidates.map(c => {
          // Generate a similarity score based on job title, skills, etc.
          let similarityScore = 0;
          
          // Match job title
          if (c.jobTitle && c.jobTitle.toLowerCase() === (candidate.jobTitle || '').toLowerCase()) {
            similarityScore += 25;
          } else if (c.jobTitle && (candidate.jobTitle || '').toLowerCase().includes(c.jobTitle.toLowerCase())) {
            similarityScore += 15;
          }
          
          // Match skills (simplified for demo)
          if (c.skills?.technical && candidate.skills?.technical) {
            const commonSkills = c.skills.technical.filter(skill => 
              candidate.skills?.technical?.includes(skill)
            );
            similarityScore += Math.min(commonSkills.length * 5, 25);
          }
          
          // Match experience level (simplified)
          if (c.experience && candidate.experience) {
            const expDiff = Math.abs(c.experience.length - candidate.experience.length);
            similarityScore += Math.max(0, 15 - expDiff * 5);
          }
          
          // Match AI score
          const aiScoreDiff = Math.abs(c.aiScore - candidate.aiScore);
          similarityScore += Math.max(0, 15 - aiScoreDiff / 3);
          
          // Match source
          if (c.source === candidate.source) {
            similarityScore += 10;
          }
          
          // Match nationality
          if (c.nationality === candidate.nationality) {
            similarityScore += 10;
          }
          
          // Return candidate with similarity score
          return {
            ...c,
            similarityScore: Math.min(similarityScore, 100)
          };
        });
        
        // Sort by similarity score and take top candidates
        const sortedCandidates = similarCandidatesWithScores
          .sort((a, b) => b.similarityScore - a.similarityScore)
          .slice(0, 10);
        
        setSimilarCandidates(sortedCandidates);
        setLoading(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, candidate]);
  
  const handleCompare = (candidateToCompare: Candidate) => {
    setSelectedCandidate(candidateToCompare);
    setCompareMode(true);
  };
  
  const handleSortChange = (value: string) => {
    setSortBy(value);
    
    // Sort candidates based on selected criteria
    const sortedCandidates = [...similarCandidates];
    switch (value) {
      case 'matchScore':
        sortedCandidates.sort((a, b) => b.similarityScore - a.similarityScore);
        break;
      case 'aiScore':
        sortedCandidates.sort((a, b) => b.aiScore - a.aiScore);
        break;
      case 'name':
        sortedCandidates.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recentlyAdded':
        sortedCandidates.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
    }
    
    setSimilarCandidates(sortedCandidates);
  };
  
  const handleScheduleInterview = (candidateId: string) => {
    // Set candidate to be interviewed
    setSelectedCandidate(similarCandidates.find(c => c.id === candidateId) || null);
    openInterviewModal();
  };
  
  const handleRejectCandidate = (candidateId: string) => {
    // Set candidate to be rejected
    setSelectedCandidate(similarCandidates.find(c => c.id === candidateId) || null);
    openRejectModal();
  };
  
  const handleAddNote = (candidateId: string) => {
    // Set candidate to add note to
    setSelectedCandidate(similarCandidates.find(c => c.id === candidateId) || null);
    openNoteModal();
  };
  
  const getSkillSummary = (candidate: Candidate) => {
    const skills = candidate.skills?.technical || [];
    const topSkills = skills.slice(0, 3);
    
    if (topSkills.length === 0) return '';
    
    return topSkills.join(', ') + (skills.length > 3 ? ` +${skills.length - 3} more` : '');
  };
  
  const getExperienceSummary = (candidate: Candidate) => {
    if (!candidate.experience || candidate.experience.length === 0) return '';
    
    // Sum up years of experience across all jobs
    const totalYears = candidate.experience.reduce((sum, exp) => {
      if (exp.isCurrent && exp.startDate) {
        const startDate = new Date(exp.startDate);
        const now = new Date();
        return sum + (now.getFullYear() - startDate.getFullYear());
      } else if (exp.startDate && exp.endDate) {
        const startDate = new Date(exp.startDate);
        const endDate = new Date(exp.endDate);
        return sum + (endDate.getFullYear() - startDate.getFullYear());
      }
      return sum;
    }, 0);
    
    return `${totalYears} ${t(totalYears === 1 ? 'yearExp' : 'yearsExp')}`;
  };
  
  const getSourceIcon = (source: Candidate['source']) => {
    switch (source) {
      case 'linkedin': return 'lucide:linkedin';
      case 'portal': return 'lucide:globe';
      case 'referral': return 'lucide:users';
      default: return 'lucide:file';
    }
  };
  
  const handleStageChange = (candidateId: string, stage: Candidate['stage']) => {
    // Update stage in similar candidates list
    const updatedCandidates = similarCandidates.map(c => 
      c.id === candidateId ? { ...c, stage } : c
    );
    setSimilarCandidates(updatedCandidates);
    
    // Call parent handler to update global state
    onStageChange(candidateId, stage);
  };

  return (
    <>
      <Drawer 
        isOpen={isOpen} 
        onOpenChange={onClose} 
        placement={language === 'ar' ? 'left' : 'right'}
        size="lg"
      >
        <DrawerContent>
          {compareMode && selectedCandidate ? (
            <>
              <DrawerHeader className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button 
                    isIconOnly 
                    variant="light" 
                    onPress={() => setCompareMode(false)}
                    className="text-default-500"
                  >
                    <Icon 
                      icon="lucide:arrow-left" 
                      className={language === 'ar' ? 'icon-flip' : ''}
                    />
                  </Button>
                  <h3>{t('compareCandidates')}</h3>
                </div>
                <Button 
                  isIconOnly 
                  variant="light" 
                  onPress={onClose}
                >
                  <Icon icon="lucide:x" />
                </Button>
              </DrawerHeader>
              
              <DrawerBody>
                <CandidateCompareView 
                  currentCandidate={candidate}
                  compareCandidate={selectedCandidate}
                  onScheduleInterview={() => handleScheduleInterview(selectedCandidate.id)}
                  onReject={() => handleRejectCandidate(selectedCandidate.id)}
                  onStageChange={handleStageChange}
                  onViewFullProfile={() => onViewCandidate(selectedCandidate)}
                />
              </DrawerBody>
            </>
          ) : (
            <>
              <DrawerHeader className="flex justify-between items-center">
                <div>
                  <h3>{t('similarCandidates')}</h3>
                  <p className="text-sm text-default-500">
                    {t('basedOn')}: {candidate.name} - {candidate.jobTitle || t('noJobTitle')}
                  </p>
                </div>
                <Button 
                  isIconOnly 
                  variant="light" 
                  onPress={onClose}
                >
                  <Icon icon="lucide:x" />
                </Button>
              </DrawerHeader>
              
              <DrawerBody>
                {loading ? (
                  <div className="h-full flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-wise-blue-200 border-t-wise-blue-600 rounded-full animate-spin mb-4"></div>
                    <p className="text-default-600">{t('findingSimilarCandidates')}</p>
                    <p className="text-sm text-default-500 mt-2">{t('analyzingProfiles')}</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-sm text-default-500">
                        {similarCandidates.length} {t('candidatesFound')}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-sm whitespace-nowrap">{t('sortBy')}:</span>
                        <Select
                          selectedKeys={[sortBy]}
                          className="max-w-[180px]"
                          onChange={(e) => handleSortChange(e.target.value)}
                          size="sm"
                        >
                          <SelectItem key="matchScore" value="matchScore">
                            {t('bestMatch')}
                          </SelectItem>
                          <SelectItem key="aiScore" value="aiScore">
                            {t('highestAiScore')}
                          </SelectItem>
                          <SelectItem key="name" value="name">
                            {t('alphabetical')}
                          </SelectItem>
                          <SelectItem key="recentlyAdded" value="recentlyAdded">
                            {t('recentlyAdded')}
                          </SelectItem>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {similarCandidates.map((similarCandidate) => (
                        <Card 
                          key={similarCandidate.id} 
                          className="border border-default-200"
                          shadow="sm"
                        >
                          <CardBody className="p-3">
                            <div className="flex items-start gap-3 mb-3">
                              <Avatar
                                src={similarCandidate.photoUrl}
                                name={similarCandidate.name}
                                size="md"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-semibold">{similarCandidate.name}</h4>
                                    <p className="text-sm text-default-600">{similarCandidate.jobTitle || t('noJobTitle')}</p>
                                  </div>
                                  <div className="flex flex-col items-end">
                                    <Badge 
                                      color={
                                        similarCandidate.similarityScore >= 85 ? "success" : 
                                        similarCandidate.similarityScore >= 70 ? "primary" : 
                                        "default"
                                      } 
                                      variant="flat"
                                    >
                                      {t('match')}: {similarCandidate.similarityScore}%
                                    </Badge>
                                    <div className="flex items-center mt-1 text-default-400 text-xs">
                                      <Icon icon={getSourceIcon(similarCandidate.source)} size={12} className="me-1" />
                                      <span>{t(similarCandidate.source)}</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 mt-2 text-xs text-default-500 flex-wrap">
                                  {getExperienceSummary(similarCandidate) && (
                                    <div className="bg-default-100 px-2 py-1 rounded-full flex items-center">
                                      <Icon icon="lucide:briefcase" size={12} className="me-1" />
                                      <span>{getExperienceSummary(similarCandidate)}</span>
                                    </div>
                                  )}
                                  {getSkillSummary(similarCandidate) && (
                                    <div className="bg-default-100 px-2 py-1 rounded-full flex items-center">
                                      <Icon icon="lucide:code" size={12} className="me-1" />
                                      <span>{getSkillSummary(similarCandidate)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between gap-2 flex-wrap">
                              <div className="flex items-center gap-1">
                                <Tooltip content={t('compareWithCurrent')}>
                                  <Button 
                                    isIconOnly
                                    size="sm" 
                                    variant="flat" 
                                    color="primary"
                                    onPress={() => handleCompare(similarCandidate)}
                                  >
                                    <Icon icon="lucide:git-compare" size={16} />
                                  </Button>
                                </Tooltip>
                                <Button 
                                  size="sm" 
                                  variant="flat" 
                                  className="text-xs"
                                  onPress={() => onViewCandidate(similarCandidate)}
                                >
                                  {t('viewFullProfile')}
                                </Button>
                              </div>
                              
                              <div className="flex items-center gap-1 ms-auto">
                                <Dropdown>
                                  <DropdownTrigger>
                                    <Button 
                                      size="sm" 
                                      variant="flat" 
                                      endContent={<Icon icon="lucide:chevron-down" size={14} />}
                                      className="text-xs"
                                    >
                                      {t('moveToStage')}
                                    </Button>
                                  </DropdownTrigger>
                                  <DropdownMenu aria-label="Stage options">
                                    <DropdownItem 
                                      key="new"
                                      onPress={() => handleStageChange(similarCandidate.id, 'new')}
                                    >
                                      {t('new')}
                                    </DropdownItem>
                                    <DropdownItem 
                                      key="shortlisted"
                                      onPress={() => handleStageChange(similarCandidate.id, 'shortlisted')}
                                    >
                                      {t('shortlisted')}
                                    </DropdownItem>
                                    <DropdownItem 
                                      key="interviewed"
                                      onPress={() => handleStageChange(similarCandidate.id, 'interviewed')}
                                    >
                                      {t('interviewed')}
                                    </DropdownItem>
                                    <DropdownItem 
                                      key="offered"
                                      onPress={() => handleStageChange(similarCandidate.id, 'offered')}
                                    >
                                      {t('offered')}
                                    </DropdownItem>
                                    <DropdownItem 
                                      key="hired"
                                      onPress={() => handleStageChange(similarCandidate.id, 'hired')}
                                    >
                                      {t('hired')}
                                    </DropdownItem>
                                    <DropdownItem 
                                      key="rejected"
                                      className="text-danger"
                                      color="danger"
                                      onPress={() => handleStageChange(similarCandidate.id, 'rejected')}
                                    >
                                      {t('rejected')}
                                    </DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                                
                                <Button
                                  size="sm" 
                                  color="secondary"
                                  variant="flat"
                                  className="text-xs"
                                  onPress={() => handleScheduleInterview(similarCandidate.id)}
                                  startContent={<Icon icon="lucide:calendar" size={14} />}
                                >
                                  {t('interview')}
                                </Button>
                                <Button 
                                  size="sm" 
                                  color="danger" 
                                  variant="flat"
                                  className="text-xs"
                                  onPress={() => handleRejectCandidate(similarCandidate.id)}
                                >
                                  {t('reject')}
                                </Button>
                                <Button 
                                  isIconOnly
                                  size="sm" 
                                  variant="flat"
                                  onPress={() => handleAddNote(similarCandidate.id)}
                                >
                                  <Icon icon="lucide:file-plus" size={16} />
                                </Button>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))}
                    </div>
                  </>
                )}
              </DrawerBody>
              
              <DrawerFooter>
                <Button 
                  variant="light" 
                  onPress={onClose}
                >
                  {t('close')}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      
      {selectedCandidate && (
        <>
          <ScheduleInterviewModal 
            isOpen={isInterviewModalOpen}
            onClose={closeInterviewModal}
            candidate={selectedCandidate}
          />
          
          <RejectCandidateModal 
            isOpen={isRejectModalOpen}
            onClose={closeRejectModal}
            candidate={selectedCandidate}
            onReject={(candidateId) => {
              handleStageChange(candidateId, 'rejected');
              closeRejectModal();
            }}
          />
          
          <AddNoteModal 
            isOpen={isNoteModalOpen}
            onClose={closeNoteModal}
            candidate={selectedCandidate}
          />
        </>
      )}
    </>
  );
};

export default SimilarCandidatesDrawer;