import React from 'react';
import { Chip, Input, Button, Tooltip, Card, CardBody } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';
import { ProfileSection } from './profile-section';
import { AiProcessIndicator } from './ai-process-indicator';

export const SkillsSection: React.FC = () => {
  const { translate } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [skills, setSkills] = React.useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = React.useState('');
  const [suggestedSkills, setSuggestedSkills] = React.useState<string[]>([]);
  const [showAiProcess, setShowAiProcess] = React.useState(false);
  const [aiProcessStage, setAiProcessStage] = React.useState<'extracting' | 'analyzing' | 'applying' | 'complete'>('extracting');
  
  // Suggested skills based on user profile
  const generateSuggestedSkills = React.useCallback(() => {
    // In a real app, these would come from AI analysis
    const suggestions = [
      'TypeScript', 
      'Vue.js', 
      'GraphQL',
      'Jest',
      'CI/CD',
      'MongoDB',
      'Express.js',
      'Redux',
      'UI/UX Design',
      'System Design'
    ];
    
    // Filter out skills that user already has
    return suggestions.filter(skill => !skills.includes(skill));
  }, [skills]);
  
  // Reset skills when user changes
  React.useEffect(() => {
    if (user?.skills) {
      setSkills(user.skills);
    }
  }, [user]);
  
  // Generate suggested skills whenever skills change
  React.useEffect(() => {
    if (isEditing) {
      setSuggestedSkills(generateSuggestedSkills().slice(0, 5));
    }
  }, [isEditing, generateSuggestedSkills]);
  
  // Handle adding a new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  // Handle adding a suggested skill
  const handleAddSuggestedSkill = (skill: string) => {
    if (!skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setSuggestedSkills(prev => prev.filter(s => s !== skill));
    }
  };
  
  // Handle removing a skill
  const handleRemoveSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };
  
  // Handle key press for input
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddSkill();
      e.preventDefault();
    }
  };
  
  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Handle generate AI suggestions
  const handleGenerateAiSuggestions = async () => {
    setShowAiProcess(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAiProcessStage('analyzing');
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    setAiProcessStage('applying');
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    setAiProcessStage('complete');
    
    // Generate more suggested skills
    const moreSuggestions = generateSuggestedSkills();
    setSuggestedSkills(moreSuggestions);
    
    setTimeout(() => {
      setShowAiProcess(false);
    }, 2000);
  };
  
  // Handle save button click
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        skills,
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating skills:", error);
    } finally {
      setIsLoading(false);
      setShowAiProcess(false);
    }
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    if (user?.skills) {
      setSkills(user.skills);
    }
    setNewSkill('');
    setIsEditing(false);
    setShowAiProcess(false);
  };
  
  return (
    <ProfileSection
      title={translate('profile.skills')}
      icon="lucide:award"
      isEditing={isEditing}
      isLoading={isLoading}
      isCompleted={skills && skills.length > 0}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
    >
      <div className="space-y-4">
        <AiProcessIndicator 
          isVisible={showAiProcess}
          stage={aiProcessStage}
          confidenceScore={85}
        />
        
        {isEditing ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex gap-2">
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onValueChange={setNewSkill}
                onKeyDown={handleKeyPress}
                variant="bordered"
                className="flex-grow"
                endContent={
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={handleAddSkill}
                    isDisabled={!newSkill.trim()}
                  >
                    <Icon icon="lucide:plus" width={16} height={16} />
                  </Button>
                }
              />
              <Tooltip content="Generate AI skill suggestions based on your experience">
                <Button
                  color="secondary"
                  variant="flat"
                  onPress={handleGenerateAiSuggestions}
                  isLoading={showAiProcess}
                  startContent={!showAiProcess && <Icon icon="lucide:sparkles" width={16} height={16} />}
                >
                  AI Suggestions
                </Button>
              </Tooltip>
            </div>
            
            {suggestedSkills.length > 0 && (
              <div className="bg-default-50 dark:bg-default-100/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="lucide:lightbulb" className="text-warning-500" width={16} height={16} />
                  <span className="text-sm font-medium">Based on your profile, we suggest adding:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {suggestedSkills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Chip
                          variant="flat"
                          color="secondary"
                          className="cursor-pointer"
                          onClick={() => handleAddSuggestedSkill(skill)}
                          startContent={<Icon icon="lucide:plus" width={12} height={12} />}
                        >
                          {skill}
                        </Chip>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            )}
            
            <div>
              <p className="text-sm font-medium mb-2">Your Skills ({skills.length})</p>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {skills.map((skill) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Chip
                          variant="solid"
                          color="primary"
                          onClose={() => handleRemoveSkill(skill)}
                        >
                          {skill}
                        </Chip>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <p className="text-default-500 text-sm italic">No skills added yet</p>
              )}
            </div>
            
            <Card className="bg-primary-50/50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
              <CardBody className="py-3 px-4">
                <div className="flex items-start gap-2">
                  <Icon icon="lucide:info" className="text-primary-600 dark:text-primary-400 mt-0.5" width={16} height={16} />
                  <div className="text-sm text-default-800 dark:text-default-200">
                    <p>Adding relevant skills can increase your match score with jobs by up to 40%. Be specific and include both technical and soft skills.</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {skills && skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Chip
                    key={skill}
                    variant="flat"
                    color="default"
                  >
                    {skill}
                  </Chip>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Icon icon="lucide:code" className="text-default-300 mx-auto mb-2" width={32} height={32} />
                <p className="text-default-500">No skills added yet</p>
                <Button
                  color="primary"
                  variant="flat"
                  size="sm"
                  className="mt-4"
                  startContent={<Icon icon="lucide:plus" />}
                  onPress={handleEdit}
                >
                  Add Skills
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </ProfileSection>
  );
};