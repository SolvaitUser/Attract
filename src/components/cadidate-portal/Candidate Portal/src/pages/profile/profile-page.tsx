import React from 'react';
import { motion } from 'framer-motion';
import { Card, Button, Avatar, Progress, Tabs, Tab } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';
import { MainLayout } from '../../components/layout/main-layout';
import { ProfileCompletion } from '../../components/profile/profile-completion';
import { ProfileSection } from '../../components/profile/profile-section';
import { AiProcessIndicator } from '../../components/profile/ai-process-indicator';
import { PersonalInformationSection } from '../../components/profile/personal-information-section';
import { JobPreferencesSection } from '../../components/profile/job-preferences-section';
import { WorkExperienceSection } from '../../components/profile/work-experience-section';
import { EducationSection } from '../../components/profile/education-section';
import { SkillsSection } from '../../components/profile/skills-section';

export const ProfilePage: React.FC = () => {
  const { translate } = useLanguage();
  const { user } = useAuth();
  const [showAiProcess, setShowAiProcess] = React.useState(false);
  const [aiProcessStage, setAiProcessStage] = React.useState<'extracting' | 'analyzing' | 'applying' | 'complete'>('extracting');
  const [suggestedFields, setSuggestedFields] = React.useState<string[]>([]);
  
  // Suggested fields based on profile completion
  React.useEffect(() => {
    if (user) {
      const suggestions: string[] = [];
      
      if (!user.jobPreferences || Object.keys(user.jobPreferences).length === 0) {
        suggestions.push('jobPreferences');
      }
      
      if (!user.skills || user.skills.length < 5) {
        suggestions.push('skills');
      }
      
      if (!user.education || user.education.length === 0) {
        suggestions.push('education');
      }
      
      if (!user.workExperience || user.workExperience.length === 0) {
        suggestions.push('workExperience');
      }
      
      if (!user.profilePicture) {
        suggestions.push('profilePicture');
      }
      
      setSuggestedFields(suggestions);
    }
  }, [user]);
  
  // Handle edit section
  const handleEditSection = (section: string) => {
    console.log(`Editing section: ${section}`);
  };
  
  // Handle suggested field action
  const handleSuggestionAction = (field: string) => {
    // Scroll to the section
    const element = document.getElementById(field);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Highlight the section
      element.classList.add('animate-pulse');
      setTimeout(() => {
        element.classList.remove('animate-pulse');
      }, 1500);
    }
  };
  
  return (
    <MainLayout requireAuth={true}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="pb-6">
          <h1 className="text-3xl font-bold mb-2">{translate('profile.title')}</h1>
          <p className="text-default-500">
            Complete your profile to increase your chances of finding the perfect job.
          </p>
        </div>
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* Personal Information Section */}
            <div id="personalInfo">
              <PersonalInformationSection />
            </div>
            
            {/* Job Preferences Section */}
            <div id="jobPreferences">
              <JobPreferencesSection />
            </div>
            
            {/* Work Experience Section */}
            <div id="workExperience">
              <WorkExperienceSection />
            </div>
            
            {/* Education Section */}
            <div id="education">
              <EducationSection />
            </div>
            
            {/* Skills Section */}
            <div id="skills">
              <SkillsSection />
            </div>
            
            {/* Main Content */}
            <AiProcessIndicator
              stage={aiProcessStage}
              isVisible={showAiProcess}
              confidenceScore={88}
            />
            
            <Tabs aria-label="Profile sections" color="primary">
              <Tab key="info" title={translate('profile.personalInfo')}>
                <ProfileSection
                  title={translate('profile.personalInfo')}
                  icon="lucide:user"
                  isCompleted={true}
                  onEdit={() => handleEditSection('personalInfo')}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        {translate('auth.fullName')}
                      </p>
                      <p className="mt-1">{user?.fullName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        {translate('auth.email')}
                      </p>
                      <p className="mt-1">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        {translate('auth.country')}
                      </p>
                      <p className="mt-1">{user?.country}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        {translate('auth.mobile')}
                      </p>
                      <p className="mt-1">{user?.mobile || '—'}</p>
                    </div>
                  </div>
                </ProfileSection>
                
                <ProfileSection
                  title={translate('profile.jobPreferences')}
                  icon="lucide:briefcase"
                  onEdit={() => handleEditSection('jobPreferences')}
                >
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        Preferred Job Types
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user?.jobPreferences?.jobTypes.map((type, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-default-100 rounded-md text-sm"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        Preferred Locations
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {user?.jobPreferences?.locations.map((location, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-default-100 rounded-md text-sm"
                          >
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        Minimum Salary
                      </p>
                      <p className="mt-1">${user?.jobPreferences?.minimumSalary?.toLocaleString() || '—'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-default-500">
                        Remote Work
                      </p>
                      <p className="mt-1">{user?.jobPreferences?.remote ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </ProfileSection>
              </Tab>
              
              <Tab key="experience" title={translate('profile.workExperience')}>
                <ProfileSection
                  title={translate('profile.workExperience')}
                  icon="lucide:briefcase"
                  onEdit={() => handleEditSection('workExperience')}
                >
                  <div className="space-y-6">
                    {user?.workExperience?.map((exp, idx) => (
                      <div key={idx} className="border-b border-divider last:border-none pb-4 last:pb-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{exp.position}</h4>
                          <span className="text-sm text-default-500">
                            {exp.startDate} - {exp.ongoing ? 'Present' : exp.endDate}
                          </span>
                        </div>
                        <p className="text-default-700">{exp.company}, {exp.location}</p>
                        <p className="text-sm mt-2">{exp.description}</p>
                      </div>
                    ))}
                    
                    {(!user?.workExperience || user.workExperience.length === 0) && (
                      <div className="text-center py-6">
                        <p className="text-default-500">
                          No work experience added yet. Click edit to add your professional history.
                        </p>
                      </div>
                    )}
                  </div>
                </ProfileSection>
              </Tab>
              
              <Tab key="education" title={translate('profile.education')}>
                <ProfileSection
                  title={translate('profile.education')}
                  icon="lucide:graduation-cap"
                  onEdit={() => handleEditSection('education')}
                >
                  <div className="space-y-6">
                    {user?.education?.map((edu, idx) => (
                      <div key={idx} className="border-b border-divider last:border-none pb-4 last:pb-0">
                        <div className="flex justify-between">
                          <h4 className="font-medium">{edu.degree} in {edu.field}</h4>
                          <span className="text-sm text-default-500">
                            {edu.startDate} - {edu.ongoing ? 'Present' : edu.endDate}
                          </span>
                        </div>
                        <p className="text-default-700">{edu.institution}</p>
                        {edu.description && <p className="text-sm mt-2">{edu.description}</p>}
                      </div>
                    ))}
                    
                    {(!user?.education || user.education.length === 0) && (
                      <div className="text-center py-6">
                        <p className="text-default-500">
                          No education history added yet. Click edit to add your academic background.
                        </p>
                      </div>
                    )}
                  </div>
                </ProfileSection>
              </Tab>
              
              <Tab key="skills" title={translate('profile.skills')}>
                <ProfileSection
                  title={translate('profile.skills')}
                  icon="lucide:award"
                  onEdit={() => handleEditSection('skills')}
                >
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {user?.skills?.map((skill, idx) => (
                        <span 
                          key={idx} 
                          className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    {(!user?.skills || user.skills.length === 0) && (
                      <div className="text-center py-6">
                        <p className="text-default-500">
                          No skills added yet. Click edit to add your professional skills.
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-6 p-3 bg-default-50 dark:bg-default-100/10 rounded-md">
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:sparkles" className="text-warning-500" />
                        <h4 className="text-sm font-medium">{translate('ai.suggestions')}</h4>
                      </div>
                      <p className="text-sm mt-2">Based on your work history, AI suggests adding these skills:</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="px-3 py-1 bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 rounded-full text-sm border border-warning-200 dark:border-warning-800 border-dashed">
                          Product Strategy
                        </span>
                        <span className="px-3 py-1 bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 rounded-full text-sm border border-warning-200 dark:border-warning-800 border-dashed">
                          User Research
                        </span>
                        <span className="px-3 py-1 bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-300 rounded-full text-sm border border-warning-200 dark:border-warning-800 border-dashed">
                          Agile Methodology
                        </span>
                      </div>
                    </div>
                  </div>
                </ProfileSection>
              </Tab>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <ProfileCompletion
              completionPercentage={user?.profileCompleted || 0}
              suggestedFields={suggestedFields}
              onActionClick={handleSuggestionAction}
            />
            
            <Card className="p-6 text-center">
              <div className="flex flex-col items-center">
                <Avatar
                  src={user?.profilePicture || 'https://img.heroui.chat/image/avatar?w=200&h=200&u=123'}
                  className="w-32 h-32 mb-4"
                  isBordered
                  color="primary"
                />
                <h2 className="text-xl font-bold mb-1">{user?.fullName}</h2>
                <p className="text-default-500 mb-4">{user?.email}</p>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  startContent={<Icon icon="lucide:upload" />}
                >
                  {translate('profile.profilePicture')}
                </Button>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon icon="lucide:download-cloud" className="text-primary-500" />
                <h3 className="font-semibold">{translate('profile.exportResume')}</h3>
              </div>
              <Button
                color="primary"
                fullWidth
                startContent={<Icon icon="lucide:file-text" />}
              >
                {translate('common.download')} PDF
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};