import React, { useState } from 'react';
import { 
  Tabs, Tab, Card, CardBody, Avatar, Badge, Progress, Button, 
  Accordion, AccordionItem, Divider, Tooltip, Chip
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';

interface CandidateCompareViewProps {
  currentCandidate: Candidate;
  compareCandidate: Candidate;
  onScheduleInterview: () => void;
  onReject: () => void;
  onStageChange: (candidateId: string, stage: Candidate['stage']) => void;
  onViewFullProfile: () => void;
}

const CandidateCompareView: React.FC<CandidateCompareViewProps> = ({
  currentCandidate,
  compareCandidate,
  onScheduleInterview,
  onReject,
  onStageChange,
  onViewFullProfile
}) => {
  const { t, language } = useLanguage();
  const [selectedSection, setSelectedSection] = useState<string>('overview');
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(
      language === 'ar' ? 'ar-AE' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
  };
  
  const calculateDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    let duration = '';
    if (years > 0) {
      duration += years + (years === 1 ? ` ${t('year')} ` : ` ${t('years')} `);
    }
    if (months > 0 || years === 0) {
      duration += months + (months === 1 ? ` ${t('month')}` : ` ${t('months')}`);
    }
    
    return duration;
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

  return (
    <div className="space-y-6">
      <Tabs 
        aria-label="Compare Sections"
        selectedKey={selectedSection}
        onSelectionChange={setSelectedSection as any}
        variant="underlined"
        color="primary"
        fullWidth
      >
        <Tab key="overview" title={t('overview')} />
        <Tab key="skills" title={t('skills')} />
        <Tab key="education" title={t('education')} />
        <Tab key="experience" title={t('experience')} />
      </Tabs>
      
      {selectedSection === 'overview' && (
        <div className="grid grid-cols-2 gap-4">
          {/* Candidate Cards */}
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <div className="flex flex-col items-center">
                <Avatar
                  src={currentCandidate.photoUrl}
                  name={currentCandidate.name}
                  size="lg"
                  className="mb-2"
                />
                <h4 className="font-semibold text-lg">{currentCandidate.name}</h4>
                <p className="text-default-600">{currentCandidate.jobTitle || t('noJobTitle')}</p>
                <div className="w-full mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-default-600">{t('aiScore')}</span>
                    <span className="font-medium">{currentCandidate.aiScore}%</span>
                  </div>
                  <Progress 
                    value={currentCandidate.aiScore} 
                    color={currentCandidate.aiScore > 85 ? "success" : currentCandidate.aiScore > 70 ? "primary" : "default"} 
                    size="sm" 
                    className="mb-4" 
                  />
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-default-600">{t('stage')}</p>
                      <Badge color={getStageColor(currentCandidate.stage)} variant="flat">
                        {t(currentCandidate.stage)}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-600">{t('source')}</p>
                      <div className="flex items-center gap-1">
                        <Icon icon={getSourceIcon(currentCandidate.source)} size={14} />
                        <span className="text-sm">{t(currentCandidate.source)}</span>
                        {currentCandidate.source === 'referral' && currentCandidate.referrer && (
                          <span className="text-xs text-default-500">({currentCandidate.referrer})</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-600">{t('location')}</p>
                      <p className="text-sm">{currentCandidate.location || t('notSpecified')}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-600">{t('workMode')}</p>
                      <p className="text-sm">{currentCandidate.workMode ? t(currentCandidate.workMode) : t('notSpecified')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <div className="flex flex-col items-center">
                <Avatar
                  src={compareCandidate.photoUrl}
                  name={compareCandidate.name}
                  size="lg"
                  className="mb-2"
                />
                <h4 className="font-semibold text-lg">{compareCandidate.name}</h4>
                <p className="text-default-600">{compareCandidate.jobTitle || t('noJobTitle')}</p>
                <div className="w-full mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-default-600">{t('aiScore')}</span>
                    <span className="font-medium">{compareCandidate.aiScore}%</span>
                  </div>
                  <Progress 
                    value={compareCandidate.aiScore} 
                    color={compareCandidate.aiScore > 85 ? "success" : compareCandidate.aiScore > 70 ? "primary" : "default"} 
                    size="sm" 
                    className="mb-4" 
                  />
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-default-600">{t('stage')}</p>
                      <Badge color={getStageColor(compareCandidate.stage)} variant="flat">
                        {t(compareCandidate.stage)}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-600">{t('source')}</p>
                      <div className="flex items-center gap-1">
                        <Icon icon={getSourceIcon(compareCandidate.source)} size={14} />
                        <span className="text-sm">{t(compareCandidate.source)}</span>
                        {compareCandidate.source === 'referral' && compareCandidate.referrer && (
                          <span className="text-xs text-default-500">({compareCandidate.referrer})</span>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-600">{t('location')}</p>
                      <p className="text-sm">{compareCandidate.location || t('notSpecified')}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-default-600">{t('workMode')}</p>
                      <p className="text-sm">{compareCandidate.workMode ? t(compareCandidate.workMode) : t('notSpecified')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Match Score Comparison */}
          <Card className="border border-default-200 col-span-2">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{t('similarityScore')}</h4>
              <div className="bg-default-50 p-3 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span>{t('overallMatch')}</span>
                  <span className="font-medium">{compareCandidate.similarityScore}%</span>
                </div>
                <Progress 
                  value={compareCandidate.similarityScore} 
                  color={compareCandidate.similarityScore > 85 ? "success" : compareCandidate.similarityScore > 70 ? "primary" : "default"} 
                  size="md" 
                  className="mb-4" 
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('skillsMatch')}</span>
                      <span className="font-medium">
                        {compareCandidate.similarityScore > 50 ? 
                          Math.floor(compareCandidate.similarityScore * 0.9) : 
                          Math.floor(compareCandidate.similarityScore * 1.1)}%
                      </span>
                    </div>
                    <Progress 
                      value={compareCandidate.similarityScore > 50 ? 
                        Math.floor(compareCandidate.similarityScore * 0.9) : 
                        Math.floor(compareCandidate.similarityScore * 1.1)} 
                      color={compareCandidate.similarityScore > 80 ? "success" : "primary"}
                      size="sm"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t('experienceMatch')}</span>
                      <span className="font-medium">
                        {compareCandidate.similarityScore > 70 ? 
                          Math.floor(compareCandidate.similarityScore * 0.95) : 
                          Math.floor(compareCandidate.similarityScore * 1.05)}%
                      </span>
                    </div>
                    <Progress 
                      value={compareCandidate.similarityScore > 70 ? 
                        Math.floor(compareCandidate.similarityScore * 0.95) : 
                        Math.floor(compareCandidate.similarityScore * 1.05)} 
                      color={compareCandidate.similarityScore > 75 ? "success" : "primary"}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
          
          {/* Contact Information */}
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{currentCandidate.name}</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-default-500">{t('email')}</p>
                  <p>{currentCandidate.email}</p>
                </div>
                <div>
                  <p className="text-default-500">{t('phone')}</p>
                  <p>{currentCandidate.phone}</p>
                </div>
                <div>
                  <p className="text-default-500">{t('nationality')}</p>
                  <p>{currentCandidate.nationality}</p>
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{compareCandidate.name}</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-default-500">{t('email')}</p>
                  <p>{compareCandidate.email}</p>
                </div>
                <div>
                  <p className="text-default-500">{t('phone')}</p>
                  <p>{compareCandidate.phone}</p>
                </div>
                <div>
                  <p className="text-default-500">{t('nationality')}</p>
                  <p>{compareCandidate.nationality}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
      
      {selectedSection === 'skills' && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{currentCandidate.name} - {t('skills')}</h4>
              {currentCandidate.skills ? (
                <div className="space-y-4">
                  {currentCandidate.skills.technical && currentCandidate.skills.technical.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-default-600 mb-2">{t('technicalSkills')}</p>
                      <div className="flex flex-wrap gap-2">
                        {currentCandidate.skills.technical.map((skill, index) => (
                          <Chip key={index} color="primary" variant="flat" size="sm">
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentCandidate.skills.soft && currentCandidate.skills.soft.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-default-600 mb-2">{t('softSkills')}</p>
                      <div className="flex flex-wrap gap-2">
                        {currentCandidate.skills.soft.map((skill, index) => (
                          <Chip key={index} color="secondary" variant="flat" size="sm">
                            {skill}
                          </Chip>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentCandidate.skills.languages && currentCandidate.skills.languages.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-default-600 mb-2">{t('languages')}</p>
                      <div className="space-y-1">
                        {currentCandidate.skills.languages.map((lang, index) => (
                          <div key={index} className="flex justify-between">
                            <span>{lang.language}</span>
                            <Badge 
                              color={
                                lang.proficiency === 'native' ? "success" :
                                lang.proficiency === 'fluent' ? "primary" :
                                lang.proficiency === 'intermediate' ? "warning" : 
                                "default"
                              } 
                              variant="flat" 
                              size="sm"
                            >
                              {t(lang.proficiency)}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center py-4 text-default-500">{t('noSkillsRecords')}</p>
              )}
            </CardBody>
          </Card>
          
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{compareCandidate.name} - {t('skills')}</h4>
              {compareCandidate.skills ? (
                <div className="space-y-4">
                  {compareCandidate.skills.technical && compareCandidate.skills.technical.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-default-600 mb-2">{t('technicalSkills')}</p>
                      <div className="flex flex-wrap gap-2">
                        {compareCandidate.skills.technical.map((skill, index) => {
                          const isMatched = currentCandidate.skills?.technical?.includes(skill);
                          return (
                            <Chip 
                              key={index} 
                              color={isMatched ? "success" : "primary"} 
                              variant={isMatched ? "solid" : "flat"} 
                              size="sm"
                              classNames={{
                                content: isMatched ? "font-medium" : ""
                              }}
                            >
                              {skill}
                            </Chip>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {compareCandidate.skills.soft && compareCandidate.skills.soft.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-default-600 mb-2">{t('softSkills')}</p>
                      <div className="flex flex-wrap gap-2">
                        {compareCandidate.skills.soft.map((skill, index) => {
                          const isMatched = currentCandidate.skills?.soft?.includes(skill);
                          return (
                            <Chip 
                              key={index} 
                              color={isMatched ? "success" : "secondary"} 
                              variant={isMatched ? "solid" : "flat"} 
                              size="sm"
                              classNames={{
                                content: isMatched ? "font-medium" : ""
                              }}
                            >
                              {skill}
                            </Chip>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  {compareCandidate.skills.languages && compareCandidate.skills.languages.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-default-600 mb-2">{t('languages')}</p>
                      <div className="space-y-1">
                        {compareCandidate.skills.languages.map((lang, index) => {
                          const matchedLang = currentCandidate.skills?.languages?.find(
                            l => l.language === lang.language
                          );
                          const isMatched = !!matchedLang;
                          const proficiencyMatch = matchedLang && matchedLang.proficiency === lang.proficiency;
                          
                          return (
                            <div key={index} className="flex justify-between">
                              <span className={isMatched ? "font-medium" : ""}>{lang.language}</span>
                              <Badge 
                                color={
                                  proficiencyMatch ? "success" :
                                  lang.proficiency === 'native' ? "success" :
                                  lang.proficiency === 'fluent' ? "primary" :
                                  lang.proficiency === 'intermediate' ? "warning" : 
                                  "default"
                                } 
                                variant={proficiencyMatch ? "solid" : "flat"} 
                                size="sm"
                              >
                                {t(lang.proficiency)}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center py-4 text-default-500">{t('noSkillsRecords')}</p>
              )}
            </CardBody>
          </Card>
        </div>
      )}
      
      {selectedSection === 'education' && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{currentCandidate.name} - {t('education')}</h4>
              {currentCandidate.education && currentCandidate.education.length > 0 ? (
                <div className="space-y-4">
                  {currentCandidate.education.map((edu) => (
                    <div key={edu.id} className="border-b border-default-200 pb-3 last:border-b-0">
                      <h5 className="font-medium">{edu.degree} {edu.major && `in ${edu.major}`}</h5>
                      <p className="text-default-600">{edu.institution}</p>
                      <div className="flex justify-between mt-1">
                        <span className="text-sm text-default-500">{edu.graduationYear}</span>
                        {edu.gpa && <span className="text-sm">{t('gpa')}: {edu.gpa.toFixed(1)}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-default-500">{t('noEducationRecords')}</p>
              )}
            </CardBody>
          </Card>
          
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{compareCandidate.name} - {t('education')}</h4>
              {compareCandidate.education && compareCandidate.education.length > 0 ? (
                <div className="space-y-4">
                  {compareCandidate.education.map((edu) => {
                    const similarEducation = currentCandidate.education?.find(
                      e => e.institution === edu.institution || 
                           (e.degree === edu.degree && e.major === edu.major)
                    );
                    const isMatch = !!similarEducation;
                    
                    return (
                      <div key={edu.id} className={`border-b border-default-200 pb-3 last:border-b-0 ${isMatch ? "bg-success-50 -mx-4 px-4" : ""}`}>
                        <h5 className={`font-medium ${isMatch ? "text-success-600" : ""}`}>
                          {edu.degree} {edu.major && `in ${edu.major}`}
                          {isMatch && (
                            <Tooltip content={t('matchFound')}>
                              <Icon icon="lucide:check-circle" className="text-success ms-1 inline-block" />
                            </Tooltip>
                          )}
                        </h5>
                        <p className="text-default-600">{edu.institution}</p>
                        <div className="flex justify-between mt-1">
                          <span className="text-sm text-default-500">{edu.graduationYear}</span>
                          {edu.gpa && <span className="text-sm">{t('gpa')}: {edu.gpa.toFixed(1)}</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center py-4 text-default-500">{t('noEducationRecords')}</p>
              )}
            </CardBody>
          </Card>
        </div>
      )}
      
      {selectedSection === 'experience' && (
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{currentCandidate.name} - {t('experience')}</h4>
              {currentCandidate.experience && currentCandidate.experience.length > 0 ? (
                <div className="space-y-4">
                  {currentCandidate.experience.map((exp) => (
                    <div key={exp.id} className="border-b border-default-200 pb-3 last:border-b-0">
                      <h5 className="font-medium">{exp.jobTitle}</h5>
                      <p className="text-default-600">{exp.company}</p>
                      <p className="text-sm text-default-500">
                        {formatDate(exp.startDate).split(',')[0]} - {exp.endDate ? formatDate(exp.endDate).split(',')[0] : t('present')}
                        <span className="ms-2">({calculateDuration(exp.startDate, exp.endDate)})</span>
                      </p>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">{t('achievements')}:</p>
                          <ul className="list-disc list-inside text-sm ps-2">
                            {exp.achievements.slice(0, 2).map((achievement, i) => (
                              <li key={i}>{achievement}</li>
                            ))}
                            {exp.achievements.length > 2 && (
                              <li className="text-default-500">+{exp.achievements.length - 2} {t('more')}</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-default-500">{t('noExperienceRecords')}</p>
              )}
            </CardBody>
          </Card>
          
          <Card className="border border-default-200">
            <CardBody className="p-4">
              <h4 className="font-medium mb-3">{compareCandidate.name} - {t('experience')}</h4>
              {compareCandidate.experience && compareCandidate.experience.length > 0 ? (
                <div className="space-y-4">
                  {compareCandidate.experience.map((exp) => {
                    const similarExperience = currentCandidate.experience?.find(
                      e => e.company === exp.company || e.jobTitle === exp.jobTitle
                    );
                    const isMatch = !!similarExperience;
                    
                    return (
                      <div key={exp.id} className={`border-b border-default-200 pb-3 last:border-b-0 ${isMatch ? "bg-success-50 -mx-4 px-4" : ""}`}>
                        <h5 className={`font-medium ${isMatch ? "text-success-600" : ""}`}>
                          {exp.jobTitle}
                          {isMatch && (
                            <Tooltip content={t('matchFound')}>
                              <Icon icon="lucide:check-circle" className="text-success ms-1 inline-block" />
                            </Tooltip>
                          )}
                        </h5>
                        <p className="text-default-600">{exp.company}</p>
                        <p className="text-sm text-default-500">
                          {formatDate(exp.startDate).split(',')[0]} - {exp.endDate ? formatDate(exp.endDate).split(',')[0] : t('present')}
                          <span className="ms-2">({calculateDuration(exp.startDate, exp.endDate)})</span>
                        </p>
                        {exp.achievements && exp.achievements.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">{t('achievements')}:</p>
                            <ul className="list-disc list-inside text-sm ps-2">
                              {exp.achievements.slice(0, 2).map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                              ))}
                              {exp.achievements.length > 2 && (
                                <li className="text-default-500">+{exp.achievements.length - 2} {t('more')}</li>
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-center py-4 text-default-500">{t('noExperienceRecords')}</p>
              )}
            </CardBody>
          </Card>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button
          variant="light"
          color="default" 
          onPress={onViewFullProfile}
          startContent={<Icon icon="lucide:external-link" className={language === 'ar' ? 'icon-flip' : ''} />}
        >
          {t('viewFullProfile')}
        </Button>
        
        <div className="flex gap-2">
          <Button
            color="danger"
            variant="flat" 
            onPress={onReject}
          >
            {t('reject')}
          </Button>
          <Button
            color="primary" 
            startContent={<Icon icon="lucide:calendar" className={language === 'ar' ? 'icon-flip' : ''} />}
            onPress={onScheduleInterview}
          >
            {t('scheduleInterview')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CandidateCompareView;