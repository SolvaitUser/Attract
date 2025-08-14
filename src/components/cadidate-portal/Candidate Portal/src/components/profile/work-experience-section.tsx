import React from 'react';
import { Card, CardBody, Button, Input, Checkbox, Textarea, Divider } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth, WorkExperience } from '../../contexts/auth-context';
import { ProfileSection } from './profile-section';

export const WorkExperienceSection: React.FC = () => {
  const { translate, direction } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [experiences, setExperiences] = React.useState<WorkExperience[]>(user?.workExperience || []);
  const [activeExperience, setActiveExperience] = React.useState<WorkExperience | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [editMode, setEditMode] = React.useState<'list' | 'form'>('list');
  
  // Reset experiences when user changes
  React.useEffect(() => {
    if (user?.workExperience) {
      setExperiences(user.workExperience);
    }
  }, [user]);
  
  // Handle adding a new experience
  const handleAddExperience = () => {
    const newExperience: WorkExperience = {
      id: `exp_${Date.now()}`,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      ongoing: false,
      description: '',
    };
    
    setActiveExperience(newExperience);
    setEditMode('form');
  };
  
  // Handle editing experience
  const handleEditExperience = (experience: WorkExperience) => {
    setActiveExperience({...experience});
    setEditMode('form');
  };
  
  // Handle deleting experience
  const handleDeleteExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };
  
  // Handle input change
  const handleInputChange = (name: string, value: string | boolean) => {
    if (!activeExperience) return;
    
    setActiveExperience(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        [name]: value,
      };
    });
    
    // Clear error when field is being edited
    if (typeof value === 'string' && errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Validate experience form
  const validateExperienceForm = () => {
    if (!activeExperience) return false;
    
    const newErrors: Record<string, string> = {};
    
    if (!activeExperience.company.trim()) {
      newErrors.company = translate('validation.required');
    }
    
    if (!activeExperience.position.trim()) {
      newErrors.position = translate('validation.required');
    }
    
    if (!activeExperience.startDate.trim()) {
      newErrors.startDate = translate('validation.required');
    }
    
    if (!activeExperience.ongoing && !activeExperience.endDate.trim()) {
      newErrors.endDate = translate('validation.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle saving experience
  const handleSaveExperience = () => {
    if (!validateExperienceForm() || !activeExperience) return;
    
    setExperiences(prev => {
      const existingIndex = prev.findIndex(exp => exp.id === activeExperience.id);
      if (existingIndex >= 0) {
        // Update existing experience
        const updated = [...prev];
        updated[existingIndex] = activeExperience;
        return updated;
      } else {
        // Add new experience
        return [...prev, activeExperience];
      }
    });
    
    setActiveExperience(null);
    setEditMode('list');
    setErrors({});
  };
  
  // Handle canceling experience edit
  const handleCancelExperienceEdit = () => {
    setActiveExperience(null);
    setEditMode('list');
    setErrors({});
  };
  
  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Handle save button click
  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        workExperience: experiences,
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating work experience:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    if (user?.workExperience) {
      setExperiences(user.workExperience);
    }
    setActiveExperience(null);
    setEditMode('list');
    setErrors({});
    setIsEditing(false);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const [year, month] = dateString.split('-');
      return `${getMonthName(parseInt(month))} ${year}`;
    } catch (e) {
      return dateString;
    }
  };
  
  // Get month name from number
  const getMonthName = (month: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[month - 1] || '';
  };
  
  return (
    <ProfileSection
      title={translate('profile.workExperience')}
      icon="lucide:briefcase"
      isEditing={isEditing}
      isLoading={isLoading}
      isCompleted={experiences && experiences.length > 0}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
    >
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {editMode === 'list' ? (
            <div className="space-y-4">
              {experiences.length === 0 ? (
                <div className="text-center py-8">
                  <Icon icon="lucide:briefcase-x" className="text-default-300 mx-auto mb-2" width={32} height={32} />
                  <p className="text-default-500">{translate('profile.noWorkExperience')}</p>
                </div>
              ) : (
                <AnimatePresence>
                  {experiences.map((experience, index) => (
                    <motion.div
                      key={experience.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card shadow="none" className="border border-default-200 bg-content1 mb-3">
                        <CardBody className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h4 className="font-medium">{experience.position}</h4>
                              <p className="text-default-500">{experience.company}</p>
                              <div className="flex gap-3 mt-1">
                                <span className="text-default-400 text-xs">
                                  {formatDate(experience.startDate)} – {experience.ongoing ? 'Present' : formatDate(experience.endDate)}
                                </span>
                                <span className="text-default-400 text-xs">•</span>
                                <span className="text-default-400 text-xs">{experience.location}</span>
                              </div>
                            </div>
                            
                            <div className="flex mt-2 md:mt-0 gap-2">
                              <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                isIconOnly
                                onPress={() => handleEditExperience(experience)}
                              >
                                <Icon icon="lucide:edit" width={16} height={16} />
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                color="danger"
                                isIconOnly
                                onPress={() => handleDeleteExperience(experience.id)}
                              >
                                <Icon icon="lucide:trash" width={16} height={16} />
                              </Button>
                            </div>
                          </div>
                          
                          {experience.description && (
                            <p className="text-sm mt-2 text-default-600 line-clamp-2">{experience.description}</p>
                          )}
                        </CardBody>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
              
              <Button
                variant="flat"
                color="primary"
                startContent={<Icon icon="lucide:plus" width={16} height={16} />}
                onPress={handleAddExperience}
              >
                Add Work Experience
              </Button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <Card shadow="none" className="border border-default-200">
                <CardBody className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Position/Title"
                      placeholder="e.g. Software Engineer"
                      value={activeExperience?.position || ''}
                      onValueChange={(value) => handleInputChange('position', value)}
                      isInvalid={!!errors.position}
                      errorMessage={errors.position}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                    
                    <Input
                      label="Company"
                      placeholder="e.g. Google"
                      value={activeExperience?.company || ''}
                      onValueChange={(value) => handleInputChange('company', value)}
                      isInvalid={!!errors.company}
                      errorMessage={errors.company}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                    
                    <Input
                      label="Location"
                      placeholder="e.g. San Francisco, CA"
                      value={activeExperience?.location || ''}
                      onValueChange={(value) => handleInputChange('location', value)}
                      isInvalid={!!errors.location}
                      errorMessage={errors.location}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                    
                    <div className="flex items-center justify-center">
                      <Checkbox
                        isSelected={activeExperience?.ongoing || false}
                        onValueChange={(value) => handleInputChange('ongoing', value)}
                      >
                        I currently work here
                      </Checkbox>
                    </div>
                    
                    <Input
                      label="Start Date"
                      type="month"
                      placeholder="YYYY-MM"
                      value={activeExperience?.startDate || ''}
                      onValueChange={(value) => handleInputChange('startDate', value)}
                      isInvalid={!!errors.startDate}
                      errorMessage={errors.startDate}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                    
                    {!activeExperience?.ongoing && (
                      <Input
                        label="End Date"
                        type="month"
                        placeholder="YYYY-MM"
                        value={activeExperience?.endDate || ''}
                        onValueChange={(value) => handleInputChange('endDate', value)}
                        isInvalid={!!errors.endDate}
                        errorMessage={errors.endDate}
                        variant="bordered"
                        fullWidth
                        className={direction === 'rtl' ? 'text-right' : ''}
                      />
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <Textarea
                      label="Description"
                      placeholder="Describe your responsibilities, achievements, and the technologies you used..."
                      value={activeExperience?.description || ''}
                      onValueChange={(value) => handleInputChange('description', value)}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="flat"
                      color="default"
                      onPress={handleCancelExperienceEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onPress={handleSaveExperience}
                    >
                      Save Experience
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          {experiences && experiences.length > 0 ? (
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <div key={experience.id} className="relative">
                  {index > 0 && (
                    <div className="absolute left-[10px] top-0 bottom-0 w-px bg-default-200 -translate-x-1/2"></div>
                  )}
                  <div className="flex">
                    <div className="mt-1.5 mr-4 relative">
                      <div className={`w-5 h-5 rounded-full ${index === 0 ? 'bg-primary-500' : 'bg-default-200'} flex items-center justify-center`}>
                        {index === 0 && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <div className={`flex-1 ${index < experiences.length - 1 ? 'mb-6' : ''}`}>
                      <h4 className="font-medium">{experience.position}</h4>
                      <p className="text-default-500">{experience.company}</p>
                      <div className="flex flex-wrap gap-3 mt-1 text-default-400 text-sm">
                        <span>
                          {formatDate(experience.startDate)} – {experience.ongoing ? 'Present' : formatDate(experience.endDate)}
                        </span>
                        <span>•</span>
                        <span>{experience.location}</span>
                      </div>
                      {experience.description && (
                        <p className="mt-2 text-default-600 text-sm">{experience.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon icon="lucide:briefcase-x" className="text-default-300 mx-auto mb-2" width={32} height={32} />
              <p className="text-default-500">No work experience added yet</p>
              <Button
                color="primary"
                variant="flat"
                size="sm"
                className="mt-4"
                startContent={<Icon icon="lucide:plus" />}
                onPress={handleEdit}
              >
                Add Work Experience
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </ProfileSection>
  );
};