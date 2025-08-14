import React, { useState, useEffect } from 'react';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, Input, Checkbox, Table, TableHeader, TableColumn, 
  TableBody, TableRow, TableCell, Avatar, Spinner, Tabs, Tab,
  Card, CardBody, Chip, Progress, Divider, Badge
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { JobRequisition } from '../../data/mockJobData';

interface LinkedInSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string | null;
  jobs: JobRequisition[];
}

interface LinkedInProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  photoUrl: string;
  matchScore: number;
  connections: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    years: string;
  }>;
  skills: string[];
}

type ActiveTab = 'search' | 'analysis';

const LinkedInSearchModal: React.FC<LinkedInSearchModalProps> = ({ 
  isOpen, 
  onClose,
  jobId,
  jobs
}) => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<LinkedInProfile[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('search');
  const [selectedJobForAnalysis, setSelectedJobForAnalysis] = useState<string | null>(jobId);
  const [isLoading, setIsLoading] = useState(false);
  
  // Reset job selection when modal opens
  useEffect(() => {
    if (isOpen && jobId) {
      setSelectedJobForAnalysis(jobId);
    }
  }, [isOpen, jobId]);
  
  // Fake data for LinkedIn profiles
  const mockProfiles: LinkedInProfile[] = [
    {
      id: 'p1',
      name: 'Sarah Johnson',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'Dubai, UAE',
      photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=10',
      matchScore: 92,
      connections: '500+',
      experience: [
        { title: 'Senior Software Engineer', company: 'Tech Solutions Inc.', duration: '2020 - Present' },
        { title: 'Software Engineer', company: 'Digital Innovators', duration: '2018 - 2020' }
      ],
      education: [
        { degree: 'M.S. Computer Science', school: 'Dubai Technical University', years: '2016 - 2018' }
      ],
      skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS']
    },
    {
      id: 'p2',
      name: 'Mohammed Al-Farsi',
      title: 'Full Stack Developer',
      company: 'Web Crafters',
      location: 'Riyadh, KSA',
      photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=11',
      matchScore: 87,
      connections: '387',
      experience: [
        { title: 'Full Stack Developer', company: 'Web Crafters', duration: '2019 - Present' },
        { title: 'Frontend Developer', company: 'UI Masters', duration: '2017 - 2019' }
      ],
      education: [
        { degree: 'B.S. Information Technology', school: 'King Saud University', years: '2013 - 2017' }
      ],
      skills: ['JavaScript', 'Vue.js', 'PHP', 'Laravel', 'MySQL']
    },
    {
      id: 'p3',
      name: 'Aisha Malik',
      title: 'Software Developer',
      company: 'CloudStack',
      location: 'Dubai, UAE',
      photoUrl: 'https://img.heroui.chat/image/avatar?w=200&h=200&u=12',
      matchScore: 78,
      connections: '412',
      experience: [
        { title: 'Software Developer', company: 'CloudStack', duration: '2021 - Present' },
        { title: 'Junior Developer', company: 'Tech Wave', duration: '2019 - 2021' }
      ],
      education: [
        { degree: 'B.S. Computer Science', school: 'American University in Dubai', years: '2015 - 2019' }
      ],
      skills: ['Python', 'Django', 'React', 'PostgreSQL', 'Docker']
    }
  ];
  
  const getJobTitle = (id: string | null): string => {
    if (!id) return t('allJobs');
    const job = jobs.find(job => job.id === id);
    return job ? job.title : t('unknownJob');
  };
  
  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setSearchResults(mockProfiles.filter(profile => 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchTerm.toLowerCase())
      ));
      setIsSearching(false);
    }, 1000);
  };
  
  const handleSelectProfile = (profileId: string, selected: boolean) => {
    if (selected) {
      setSelectedProfiles([...selectedProfiles, profileId]);
    } else {
      setSelectedProfiles(selectedProfiles.filter(id => id !== profileId));
    }
  };
  
  const handleAnalyze = () => {
    setIsLoading(true);
    setActiveTab('analysis');
    
    // Simulate loading for analysis
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  const skillMatchPercentages = [
    { skill: 'JavaScript', required: true, match: 95 },
    { skill: 'React', required: true, match: 88 },
    { skill: 'Node.js', required: false, match: 76 },
    { skill: 'TypeScript', required: true, match: 92 },
    { skill: 'Docker', required: false, match: 65 },
  ];
  
  const topCandidates = mockProfiles.sort((a, b) => b.matchScore - a.matchScore);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center">
                <Icon icon="lucide:linkedin" className="text-blue-600 mr-2" />
                {t('linkedInTalentSearch')}
              </div>
              <p className="text-sm text-default-500 font-normal">
                {selectedJobForAnalysis 
                  ? t('searchingForJob', { job: getJobTitle(selectedJobForAnalysis) }) 
                  : t('searchForCandidates')}
              </p>
            </ModalHeader>
            
            <Tabs 
              aria-label="LinkedIn Search Tabs"
              selectedKey={activeTab}
              onSelectionChange={setActiveTab as any}
              className="px-6"
              variant="underlined"
              color="primary"
            >
              <Tab key="search" title={t('search')} />
              <Tab key="analysis" title={t('analysis')} />
            </Tabs>
            
            <ModalBody>
              {activeTab === 'search' ? (
                <>
                  <div className="flex items-center gap-2 mb-4">
                    <Input
                      placeholder={t('searchLinkedInPlaceholder')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      startContent={<Icon icon="lucide:search" />}
                      className="flex-1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                      }}
                    />
                    <Button 
                      color="primary"
                      isLoading={isSearching}
                      onPress={handleSearch}
                    >
                      {t('search')}
                    </Button>
                  </div>
                  
                  {isSearching ? (
                    <div className="flex justify-center items-center py-12">
                      <Spinner color="primary" />
                    </div>
                  ) : searchResults.length > 0 ? (
                    <Table
                      removeWrapper
                      selectionMode="multiple"
                      selectedKeys={selectedProfiles}
                      onSelectionChange={(keys) => {
                        if (typeof keys === 'string') return;
                        const selectedSet = keys as Set<string>;
                        setSelectedProfiles(Array.from(selectedSet));
                      }}
                      aria-label="LinkedIn search results"
                    >
                      <TableHeader>
                        <TableColumn>{t('name')}</TableColumn>
                        <TableColumn>{t('title')}</TableColumn>
                        <TableColumn>{t('location')}</TableColumn>
                        <TableColumn>{t('matchScore')}</TableColumn>
                        <TableColumn>{t('actions')}</TableColumn>
                      </TableHeader>
                      <TableBody>
                        {searchResults.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar 
                                  src={profile.photoUrl} 
                                  name={profile.name} 
                                  size="sm" 
                                />
                                <div>
                                  <p className="font-medium">{profile.name}</p>
                                  <p className="text-xs text-default-500">{profile.company}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{profile.title}</TableCell>
                            <TableCell>{profile.location}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={profile.matchScore} 
                                  color={profile.matchScore > 85 ? "success" : profile.matchScore > 70 ? "primary" : "default"} 
                                  size="sm"
                                  className="w-24" 
                                />
                                <span className="text-sm font-medium">{profile.matchScore}%</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                color="primary" 
                                variant="flat"
                                onPress={() => window.open(`https://linkedin.com/in/${profile.id}`, '_blank')}
                                startContent={<Icon icon="lucide:external-link" />}
                              >
                                {t('view')}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-12">
                      <Icon icon="lucide:users" className="w-12 h-12 mx-auto text-default-300 mb-3" />
                      <p className="text-default-600">{t('noSearchResults')}</p>
                      <p className="text-sm text-default-500">{t('tryDifferentSearch')}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-96">
                      <Spinner color="primary" size="lg" />
                      <p className="mt-4 text-default-600">{t('analyzingProfiles')}</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Card>
                        <CardBody>
                          <h3 className="text-lg font-semibold mb-4">
                            {t('jobRequirementAnalysis')} - {getJobTitle(selectedJobForAnalysis)}
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-medium mb-3">{t('skillRequirements')}</h4>
                              <div className="space-y-3">
                                {skillMatchPercentages.map((skillMatch, index) => (
                                  <div key={index}>
                                    <div className="flex justify-between items-center mb-1">
                                      <div className="flex items-center gap-2">
                                        <span>{skillMatch.skill}</span>
                                        {skillMatch.required && (
                                          <Badge color="danger" size="sm" variant="flat">
                                            {t('required')}
                                          </Badge>
                                        )}
                                      </div>
                                      <span className="text-sm font-medium">{skillMatch.match}%</span>
                                    </div>
                                    <Progress 
                                      value={skillMatch.match} 
                                      color={skillMatch.match > 85 ? "success" : skillMatch.match > 70 ? "primary" : "default"} 
                                      size="sm" 
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-3">{t('candidateAvailability')}</h4>
                              <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                  <span>{t('activeCandidates')}</span>
                                  <span className="font-medium">43</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>{t('openToWork')}</span>
                                  <span className="font-medium">17</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>{t('averageResponseRate')}</span>
                                  <span className="font-medium">62%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span>{t('estimatedTimeToHire')}</span>
                                  <span className="font-medium">3-4 {t('weeks')}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardBody>
                      </Card>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-3">{t('topCandidateMatches')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {topCandidates.map((candidate) => (
                            <Card key={candidate.id} className="p-4" isPressable>
                              <div className="flex items-center gap-3 mb-3">
                                <Avatar 
                                  src={candidate.photoUrl} 
                                  name={candidate.name} 
                                  size="lg" 
                                />
                                <div>
                                  <p className="font-semibold">{candidate.name}</p>
                                  <p className="text-sm text-default-600">{candidate.title}</p>
                                  <p className="text-xs text-default-500">{candidate.location}</p>
                                </div>
                              </div>
                              
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-default-600">{t('matchScore')}</span>
                                <div className="flex items-center">
                                  <Progress 
                                    value={candidate.matchScore} 
                                    color={candidate.matchScore > 85 ? "success" : "primary"} 
                                    size="sm" 
                                    className="w-24 mr-2" 
                                  />
                                  <span className="font-medium">{candidate.matchScore}%</span>
                                </div>
                              </div>
                              
                              <Divider className="my-2" />
                              
                              <div className="flex flex-wrap gap-1 mt-3">
                                {candidate.skills.slice(0, 3).map((skill, idx) => (
                                  <Chip key={idx} size="sm" variant="flat" color="primary">
                                    {skill}
                                  </Chip>
                                ))}
                                {candidate.skills.length > 3 && (
                                  <Chip size="sm" variant="flat">
                                    +{candidate.skills.length - 3}
                                  </Chip>
                                )}
                              </div>
                              
                              <div className="flex justify-end mt-3">
                                <Button 
                                  size="sm" 
                                  color="primary" 
                                  variant="flat"
                                  onPress={() => window.open(`https://linkedin.com/in/${candidate.id}`, '_blank')}
                                  startContent={<Icon icon="lucide:external-link" />}
                                >
                                  {t('viewProfile')}
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </ModalBody>

            <ModalFooter>
              <Button 
                color="default" 
                variant="light" 
                onPress={onClose}
              >
                {t('cancel')}
              </Button>
              {activeTab === 'search' ? (
                <Button 
                  color="primary"
                  isDisabled={selectedProfiles.length === 0 && searchResults.length === 0}
                  onPress={handleAnalyze}
                  startContent={<Icon icon="lucide:bar-chart-2" className={language === 'ar' ? 'icon-flip' : ''} />}
                >
                  {t('analyzeResults')}
                </Button>
              ) : (
                <Button 
                  color="primary" 
                  startContent={<Icon icon="lucide:user-plus" className={language === 'ar' ? 'icon-flip' : ''} />}
                >
                  {t('importCandidates')}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default LinkedInSearchModal;