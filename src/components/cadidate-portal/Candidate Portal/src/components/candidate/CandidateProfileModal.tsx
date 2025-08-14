import React, { useState } from 'react';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, Tabs, Tab, Card, CardBody, Avatar, Badge, Divider,
  Tooltip, Progress, Chip, Link
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';
import { mockInterviewFeedback, mockActivities } from '../../data/mockCandidateData';
import EditCandidateForm from './EditCandidateForm';
import SimilarCandidatesDrawer from './SimilarCandidatesDrawer';

interface CandidateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Candidate;
  onEdit: (candidate: Candidate) => void;
  onDelete: (id: string) => void;
}

type ProfileTab = 'info' | 'education' | 'experience' | 'skills' | 'certifications' | 'documents' | 'interviews' | 'activity';

const CandidateProfileModal: React.FC<CandidateProfileModalProps> = ({ 
  isOpen, 
  onClose, 
  candidate, 
  onEdit,
  onDelete
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<ProfileTab>('info');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSimilarCandidatesDrawer, setShowSimilarCandidatesDrawer] = useState(false);

  const handleDelete = () => {
    onDelete(candidate.id);
  };

  const handleFindSimilarCandidates = () => {
    setShowSimilarCandidatesDrawer(true);
  };

  const getSourceIcon = (source: Candidate['source']) => {
    switch (source) {
      case 'linkedin': return 'lucide:linkedin';
      case 'portal': return 'lucide:globe';
      case 'referral': return 'lucide:users';
      default: return 'lucide:file';
    }
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

  const getProficiencyColor = (proficiency: string) => {
    switch(proficiency) {
      case 'native': return 'success';
      case 'fluent': return 'primary';
      case 'intermediate': return 'warning';
      case 'basic': return 'default';
      default: return 'default';
    }
  };

  const getDocumentIcon = (type: string) => {
    switch(type) {
      case 'resume': return 'lucide:file-text';
      case 'coverletter': return 'lucide:mail';
      case 'certificate': return 'lucide:award';
      case 'reference': return 'lucide:thumbs-up';
      default: return 'lucide:file';
    }
  };

  const getLinkIcon = (type: string) => {
    switch(type) {
      case 'linkedin': return 'lucide:linkedin';
      case 'github': return 'lucide:github';
      case 'portfolio': return 'lucide:globe';
      default: return 'lucide:external-link';
    }
  };

  const candidateInterviews = mockInterviewFeedback.filter(
    interview => interview.candidateId === candidate.id
  );

  const candidateActivities = mockActivities.filter(
    activity => activity.candidateId === candidate.id
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'status_change': return 'lucide:arrow-right';
      case 'interview': return 'lucide:video';
      case 'email': return 'lucide:mail';
      case 'cv_upload': return 'lucide:file-text';
      case 'note': return 'lucide:file-text';
      default: return 'lucide:info';
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'status_change': return 'secondary';
      case 'interview': return 'warning';
      case 'email': return 'primary';
      case 'cv_upload': return 'success';
      case 'note': return 'primary';
      default: return 'default';
    }
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onClose}
        size="4xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={candidate.photoUrl}
                    name={candidate.name}
                    size="lg"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{candidate.name}</h2>
                    <p className="text-default-600">{candidate.jobTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    isIconOnly 
                    variant="light"
                    color={isEditing ? "primary" : "default"}
                    onPress={() => setIsEditing(!isEditing)}
                  >
                    <Icon icon="lucide:edit" />
                  </Button>
                  <Button 
                    isIconOnly 
                    variant="light" 
                    color="danger" 
                    onPress={() => setShowDeleteConfirm(true)}
                  >
                    <Icon icon="lucide:trash-2" />
                  </Button>
                </div>
              </ModalHeader>

              <Divider />

              <Tabs 
                aria-label="Candidate Profile Tabs"
                selectedKey={activeTab}
                onSelectionChange={setActiveTab as any}
                className="px-6 pt-3"
                variant="underlined"
                color="primary"
              >
                <Tab key="info" title={t('overview')} />
                <Tab key="education" title={t('education')} />
                <Tab key="experience" title={t('experience')} />
                <Tab key="skills" title={t('skills')} />
                <Tab key="certifications" title={t('certifications')} />
                <Tab key="documents" title={t('documents')} />
                <Tab key="interviews" title={t('interviewHistory')} />
                <Tab key="activity" title={t('activity')} />
              </Tabs>

              <ModalBody>
                {isEditing ? (
                  <EditCandidateForm 
                    candidate={candidate}
                    onSave={(updatedCandidate) => {
                      onEdit(updatedCandidate);
                      setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                  />
                ) : activeTab === 'info' ? (
                  <div className="space-y-6">
                    <Card>
                      <CardBody>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-md font-medium mb-3">{t('personalInfo')}</h3>
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-default-600">{t('email')}</p>
                                <p className="font-medium">{candidate.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-600">{t('phone')}</p>
                                <p className="font-medium">{candidate.phone}</p>
                              </div>
                              <div>
                                <p className="text-sm text-default-600">{t('nationality')}</p>
                                <p className="font-medium">{candidate.nationality}</p>
                              </div>
                              
                              {/* New fields */}
                              <div>
                                <p className="text-sm text-default-600">{t('currentLocation')}</p>
                                <p className="font-medium flex items-center gap-1">
                                  <Icon icon="lucide:map-pin" className="text-default-400" size={14} />
                                  {candidate.location || t('notSpecified')}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-default-600">{t('preferredWorkMode')}</p>
                                <div className="font-medium">
                                  {candidate.workMode ? (
                                    <Badge 
                                      color={
                                        candidate.workMode === 'remote' ? "secondary" : 
                                        candidate.workMode === 'onsite' ? "primary" : 
                                        "warning"
                                      } 
                                      variant="flat"
                                    >
                                      {t(candidate.workMode)}
                                    </Badge>
                                  ) : t('notSpecified')}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-md font-medium mb-3">{t('cvDetails')}</h3>
                            
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="text-sm text-default-600">{t('matchScore')}</p>
                                <div className="flex items-center gap-2">
                                  <Progress 
                                    value={candidate.aiScore} 
                                    color={candidate.aiScore > 85 ? "success" : candidate.aiScore > 70 ? "primary" : "default"} 
                                    size="sm"
                                    className="w-32" 
                                  />
                                  <span className="text-sm font-medium">{candidate.aiScore}%</span>
                                </div>
                              </div>
                              
                              <Button 
                                variant="flat" 
                                color="primary"
                                startContent={<Icon icon="lucide:download" className={language === 'ar' ? 'icon-flip' : ''} />}
                              >
                                {t('downloadCv')}
                              </Button>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <p className="text-sm text-default-600">{t('source')}</p>
                                <div className="flex items-center gap-2">
                                  <Icon icon={getSourceIcon(candidate.source)} />
                                  <span className="font-medium">{t(candidate.source)}</span>
                                  {candidate.source === 'referral' && candidate.referrer && (
                                    <span>({candidate.referrer})</span>
                                  )}
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-default-600">{t('stage')}</p>
                                <Badge color={getStageColor(candidate.stage)} variant="flat">
                                  {t(candidate.stage)}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                    
                    <div className="flex gap-3">
                      <Button 
                        color="primary" 
                        variant="flat"
                        startContent={<Icon icon="lucide:linkedin" />}
                        className="flex-1"
                      >
                        {t('findOnLinkedIn')}
                      </Button>
                      <Button 
                        color="secondary" 
                        variant="flat"
                        startContent={<Icon icon="lucide:users" className={language === 'ar' ? 'icon-flip' : ''} />}
                        className="flex-1"
                        onPress={handleFindSimilarCandidates}
                      >
                        {t('findSimilarCandidates')}
                      </Button>
                    </div>
                  </div>
                ) : activeTab === 'education' ? (
                  <div className="space-y-4">
                    {!candidate.education || candidate.education.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon icon="lucide:graduation-cap" className="w-12 h-12 mx-auto text-default-300 mb-2" />
                        <p className="text-default-600">{t('noEducationRecords')}</p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-default-200" />
                        
                        {candidate.education.map((edu, index) => (
                          <Card key={edu.id} className="mb-4 shadow-sm border border-default-200">
                            <CardBody>
                              <div className="flex">
                                <div className="mr-4 relative">
                                  <div className="bg-primary-100 p-2 rounded-full z-10 relative">
                                    <Icon icon="lucide:graduation-cap" className="text-primary-500" />
                                  </div>
                                  {index < candidate.education!.length - 1 && (
                                    <div className="absolute top-10 bottom-0 left-1/2 w-0.5 bg-default-200 -translate-x-1/2" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-lg">{edu.degree} {edu.major && `in ${edu.major}`}</h4>
                                      <p className="text-default-600">{edu.institution}</p>
                                      {edu.location && <p className="text-sm text-default-500">{edu.location}</p>}
                                    </div>
                                    <Badge color="primary" variant="flat" className="min-w-[80px] text-center">
                                      {edu.graduationYear}
                                    </Badge>
                                  </div>
                                  {edu.gpa && (
                                    <div className="mt-2 bg-default-50 p-2 rounded-md inline-block">
                                      <span className="text-sm font-medium">{t('gpa')}: {edu.gpa.toFixed(1)}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : activeTab === 'experience' ? (
                  <div className="space-y-4">
                    {!candidate.experience || candidate.experience.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon icon="lucide:briefcase" className="w-12 h-12 mx-auto text-default-300 mb-2" />
                        <p className="text-default-600">{t('noExperienceRecords')}</p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-default-200" />
                        
                        {candidate.experience.map((exp, index) => (
                          <Card key={exp.id} className="mb-4 shadow-sm border border-default-200">
                            <CardBody>
                              <div className="flex">
                                <div className="mr-4 relative">
                                  <div className="bg-secondary-100 p-2 rounded-full z-10 relative">
                                    <Icon icon="lucide:briefcase" className="text-secondary-500" />
                                  </div>
                                  {index < candidate.experience!.length - 1 && (
                                    <div className="absolute top-10 bottom-0 left-1/2 w-0.5 bg-default-200 -translate-x-1/2" />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-semibold text-lg">{exp.jobTitle}</h4>
                                      <p className="text-default-600">{exp.company}</p>
                                      {exp.location && <p className="text-sm text-default-500">{exp.location}</p>}
                                    </div>
                                    <div className="text-right">
                                      <Badge 
                                        color={exp.isCurrent ? "success" : "default"} 
                                        variant="flat" 
                                        className="min-w-[100px] text-center"
                                      >
                                        {formatDate(exp.startDate).split(',')[0]} - {exp.endDate ? formatDate(exp.endDate).split(',')[0] : t('present')}
                                      </Badge>
                                      <p className="text-xs text-default-500 mt-1">
                                        {calculateDuration(exp.startDate, exp.endDate)}
                                      </p>
                                    </div>
                                  </div>
                                  
                                  {exp.achievements && exp.achievements.length > 0 && (
                                    <div className="mt-3">
                                      <p className="text-sm font-medium text-default-600 mb-1">{t('achievements')}:</p>
                                      <ul className="list-disc list-inside text-sm space-y-1 ps-2">
                                        {exp.achievements.map((achievement, i) => (
                                          <li key={i}>{achievement}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ) : activeTab === 'skills' ? (
                  <div className="space-y-6">
                    {!candidate.skills ? (
                      <div className="text-center py-8">
                        <Icon icon="lucide:award" className="w-12 h-12 mx-auto text-default-300 mb-2" />
                        <p className="text-default-600">{t('noSkillsRecords')}</p>
                      </div>
                    ) : (
                      <>
                        {candidate.skills.technical && candidate.skills.technical.length > 0 && (
                          <Card>
                            <CardBody>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Icon icon="lucide:code" className="text-primary-500" />
                                {t('technicalSkills')}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {candidate.skills.technical.map((skill, index) => (
                                  <Chip key={index} color="primary" variant="flat">
                                    {skill}
                                  </Chip>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        )}
                        
                        {candidate.skills.soft && candidate.skills.soft.length > 0 && (
                          <Card>
                            <CardBody>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Icon icon="lucide:users" className="text-secondary-500" />
                                {t('softSkills')}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {candidate.skills.soft.map((skill, index) => (
                                  <Chip key={index} color="secondary" variant="flat">
                                    {skill}
                                  </Chip>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        )}
                        
                        {candidate.skills.languages && candidate.skills.languages.length > 0 && (
                          <Card>
                            <CardBody>
                              <h4 className="font-medium mb-3 flex items-center gap-2">
                                <Icon icon="lucide:languages" className="text-success-500" />
                                {t('languages')}
                              </h4>
                              <div className="space-y-3">
                                {candidate.skills.languages.map((lang, index) => (
                                  <div key={index} className="flex justify-between items-center">
                                    <span className="font-medium">{lang.language}</span>
                                    <Badge color={getProficiencyColor(lang.proficiency)} variant="flat">
                                      {t(lang.proficiency)}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        )}
                      </>
                    )}
                  </div>
                ) : activeTab === 'certifications' ? (
                  <div className="space-y-4">
                    {!candidate.certifications || candidate.certifications.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon icon="lucide:award" className="w-12 h-12 mx-auto text-default-300 mb-2" />
                        <p className="text-default-600">{t('noCertificationRecords')}</p>
                      </div>
                    ) : (
                      candidate.certifications.map((cert) => (
                        <Card key={cert.id} className="shadow-sm border border-default-200">
                          <CardBody>
                            <div className="flex items-start">
                              <div className="p-2 bg-warning-100 rounded-lg mr-3">
                                <Icon icon="lucide:award" className="text-warning-500" size={24} />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h4 className="font-semibold">{cert.name}</h4>
                                    <p className="text-default-600">{cert.provider}</p>
                                  </div>
                                  <Badge color="warning" variant="flat">
                                    {formatDate(cert.issueDate).split(',')[0]}
                                    {cert.expiryDate && ` - ${formatDate(cert.expiryDate).split(',')[0]}`}
                                  </Badge>
                                </div>
                                
                                {cert.credentialId && (
                                  <div className="mt-2 text-sm text-default-500">
                                    {t('credentialId')}: <span className="font-mono">{cert.credentialId}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      ))
                    )}
                  </div>
                ) : activeTab === 'documents' ? (
                  <div className="space-y-6">
                    {(!candidate.documents || candidate.documents.length === 0) && 
                     (!candidate.links || candidate.links.length === 0) ? (
                      <div className="text-center py-8">
                        <Icon icon="lucide:file" className="w-12 h-12 mx-auto text-default-300 mb-2" />
                        <p className="text-default-600">{t('noDocumentsAvailable')}</p>
                      </div>
                    ) : (
                      <>
                        {candidate.documents && candidate.documents.length > 0 && (
                          <Card>
                            <CardBody>
                              <h4 className="font-medium mb-4">{t('documents')}</h4>
                              <div className="space-y-3">
                                {candidate.documents.map((doc) => (
                                  <div key={doc.id} className="flex items-center justify-between p-2 rounded-md bg-default-50">
                                    <div className="flex items-center gap-2">
                                      <div className="p-2 bg-white rounded">
                                        <Icon icon={getDocumentIcon(doc.type)} className="text-primary-500" />
                                      </div>
                                      <div>
                                        <p className="font-medium">{doc.name}</p>
                                        <p className="text-xs text-default-500">
                                          {t('uploadedOn')} {formatDate(doc.uploadDate)}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex gap-1">
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="flat"
                                        color="primary"
                                        aria-label={t('viewDocument')}
                                      >
                                        <Icon icon="lucide:eye" size={16} />
                                      </Button>
                                      <Button
                                        isIconOnly
                                        size="sm"
                                        variant="flat"
                                        color="primary"
                                        aria-label={t('downloadDocument')}
                                      >
                                        <Icon icon="lucide:download" size={16} />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        )}
                        
                        {candidate.links && candidate.links.length > 0 && (
                          <Card>
                            <CardBody>
                              <h4 className="font-medium mb-4">{t('links')}</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {candidate.links.map((link) => (
                                  <Link
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 p-2 rounded-md bg-default-50 hover:bg-default-100 transition-colors"
                                    isExternal
                                    showAnchorIcon
                                  >
                                    <Icon icon={getLinkIcon(link.type)} className={`text-${link.type === 'linkedin' ? 'primary' : link.type === 'github' ? 'default' : 'warning'}-500`} />
                                    <span className="font-medium">{link.name || link.url}</span>
                                  </Link>
                                ))}
                              </div>
                            </CardBody>
                          </Card>
                        )}
                      </>
                    )}
                  </div>
                ) : activeTab === 'interviews' ? (
                  <div className="space-y-4">
                    {candidateInterviews.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon icon="lucide:calendar" className="w-12 h-12 mx-auto text-default-300 mb-2" />
                        <p className="text-default-600">{t('noInterviewsYet')}</p>
                        <Button 
                          color="primary" 
                          variant="flat" 
                          size="sm" 
                          className="mt-3"
                          startContent={<Icon icon="lucide:plus" />}
                        >
                          {t('scheduleInterview')}
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-medium">{t('interviewHistory')}</h3>
                          <Button 
                            color="primary" 
                            size="sm" 
                            variant="flat"
                            startContent={<Icon icon="lucide:plus" />}
                          >
                            {t('scheduleInterview')}
                          </Button>
                        </div>
                        
                        {candidateInterviews.map(interview => (
                          <Card key={interview.id} shadow="sm">
                            <CardBody className="p-4">
                              <div className="flex justify-between items-start mb-4">
                                <div>
                                  <h4 className="font-medium flex items-center gap-2">
                                    <Icon icon="lucide:video" className="text-warning" />
                                    {t('interview')} - {new Date(interview.date).toLocaleDateString(
                                      language === 'ar' ? 'ar-AE' : 'en-US',
                                      { day: 'numeric', month: 'long', year: 'numeric' }
                                    )}
                                  </h4>
                                  <p className="text-sm text-default-600 mt-1">{t('interviewerName')}: <span className="font-medium">{interview.interviewerName}</span></p>
                                </div>
                                <Badge 
                                  color={interview.recommendationScore >= 4 ? "success" : 
                                        interview.recommendationScore >= 3 ? "warning" : "danger"} 
                                  variant="flat"
                                >
                                  {t('recommendationScore')}: {interview.recommendationScore}/5
                                </Badge>
                              </div>
                              
                              <Divider className="my-3" />
                              
                              <div className="space-y-4 max-h-[300px] overflow-y-auto">
                                {interview.questions.map((q, idx) => (
                                  <div key={idx} className="border-b border-default-200 pb-3 last:border-b-0">
                                    <p className="font-medium mb-1">{t('questionAsked')}:</p>
                                    <p className="text-default-700 mb-2">{q.question}</p>
                                    
                                    <div className="flex justify-between items-center">
                                      <p className="text-sm text-default-600">{t('score')}: 
                                        <span className={`font-medium ${
                                          q.score >= 4 ? "text-success" : 
                                          q.score >= 3 ? "text-warning" : "text-danger"
                                        }`}> {q.score}/5</span>
                                      </p>
                                    </div>
                                    
                                    {q.notes && (
                                      <div className="mt-2">
                                        <p className="text-sm text-default-600">{t('feedback')}:</p>
                                        <p className="text-sm bg-default-50 p-2 rounded-md">{q.notes}</p>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                              
                              <Divider className="my-3" />
                              
                              <div>
                                <p className="text-sm font-medium mb-1">{t('finalEvaluation')}:</p>
                                <p className="text-sm bg-default-50 p-2 rounded-md">{interview.overallFeedback}</p>
                              </div>
                            </CardBody>
                          </Card>
                        ))}
                      </>
                    )}
                  </div>
                ) : (
                  <div className="relative space-y-4">
                    {candidateActivities.length === 0 ? (
                      <div className="text-center py-8">
                        <Icon icon="lucide:history" className="w-12 h-12 mx-auto text-default-300 mb-2" />
                        <p className="text-default-600">{t('noActivityYet')}</p>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-default-200" />
                        
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-lg font-medium">{t('candidateTimeline')}</h3>
                          <Button 
                            color="primary" 
                            size="sm" 
                            variant="flat"
                            startContent={<Icon icon="lucide:plus" />}
                          >
                            {t('addNote')}
                          </Button>
                        </div>
                        
                        {candidateActivities.map((activity) => (
                          <div key={activity.id} className="flex gap-4 items-start mb-6 relative">
                            <div className={`p-2 rounded-full z-10 ${
                              getActivityColor(activity.type) === 'primary' ? 'bg-primary-100' :
                              getActivityColor(activity.type) === 'secondary' ? 'bg-secondary-100' : 
                              getActivityColor(activity.type) === 'success' ? 'bg-success-100' : 
                              getActivityColor(activity.type) === 'warning' ? 'bg-warning-100' : 'bg-default-100'
                            }`}>
                              <Icon 
                                icon={getActivityIcon(activity.type)} 
                                className={`text-${getActivityColor(activity.type)}-500 w-5 h-5`} 
                              />
                            </div>
                            <div className="flex-1">
                              <div className="bg-default-50 p-3 rounded-lg shadow-sm">
                                <div className="flex justify-between items-start">
                                  <p className="font-medium">{activity.content}</p>
                                  <p className="text-sm text-default-500 whitespace-nowrap ms-4">
                                    {new Date(activity.date).toLocaleDateString(
                                      language === 'ar' ? 'ar-AE' : 'en-US',
                                      { day: 'numeric', month: 'short' }
                                    )}
                                    &nbsp;
                                    {new Date(activity.date).toLocaleTimeString(
                                      language === 'ar' ? 'ar-AE' : 'en-US',
                                      { hour: '2-digit', minute: '2-digit' }
                                    )}
                                  </p>
                                </div>
                                {activity.user && (
                                  <p className="text-sm text-default-600 mt-1 flex items-center gap-1">
                                    <Icon icon="lucide:user" className="w-3 h-3" />
                                    {activity.user}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {showDeleteConfirm && (
                  <Modal 
                    isOpen={showDeleteConfirm}
                    onOpenChange={() => setShowDeleteConfirm(false)}
                    size="md"
                  >
                    <ModalContent>
                      {(onCloseDelete) => (
                        <>
                          <ModalHeader className="flex flex-col gap-1">
                            {t('deleteCandidate')}
                          </ModalHeader>
                          <ModalBody>
                            <p>
                              {t('confirmDelete')}
                            </p>
                            <p className="text-danger">
                              {t('thisActionCannotBeUndone')}
                            </p>
                          </ModalBody>
                          <ModalFooter>
                            <Button 
                              variant="light" 
                              onPress={onCloseDelete}
                            >
                              {t('cancel')}
                            </Button>
                            <Button 
                              color="danger" 
                              onPress={() => {
                                handleDelete();
                                onCloseDelete();
                              }}
                            >
                              {t('delete')}
                            </Button>
                          </ModalFooter>
                        </>
                      )}
                    </ModalContent>
                  </Modal>
                )}
              </ModalBody>

              <ModalFooter className="flex flex-wrap gap-2">
                <Button 
                  color="default" 
                  variant="light" 
                  onPress={onClose}
                >
                  {t('cancel')}
                </Button>
                
                <Button 
                  color="success"
                  variant="flat"
                  startContent={<Icon icon="lucide:file-text" className={language === 'ar' ? 'icon-flip' : ''} />}
                >
                  {t('downloadCandidateReport')}
                </Button>
                
                <Button 
                  color="secondary"
                  variant="flat"
                  startContent={<Icon icon="lucide:mail-plus" className={language === 'ar' ? 'icon-flip' : ''} />}
                >
                  {t('requestAdditionalInfo')}
                </Button>
                
                <Button 
                  color="primary"
                  startContent={<Icon icon="lucide:user-check" className={language === 'ar' ? 'icon-flip' : ''} />}
                >
                  {t('moveToStage')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      
      <SimilarCandidatesDrawer 
        isOpen={showSimilarCandidatesDrawer}
        onClose={() => setShowSimilarCandidatesDrawer(false)}
        candidate={candidate}
        onViewCandidate={(candidateToView) => {
          setShowSimilarCandidatesDrawer(false);
          // In a real app, you'd need to switch to the new candidate
          // Here we're just closing this modal and would open a new one
          setTimeout(() => {
            onClose();
            // Would typically trigger a new modal to open with the new candidate
          }, 100);
        }}
        onStageChange={(candidateId, newStage) => {
          // In a real app, this would update the actual candidate in the global state
          console.log('Change stage for', candidateId, 'to', newStage);
        }}
      />
    </>
  );
};

export default CandidateProfileModal;