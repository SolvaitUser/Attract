import React from 'react';
import { Card, CardBody, Button, Input, Checkbox, Textarea, Divider } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth, Education } from '../../contexts/auth-context';
import { ProfileSection } from './profile-section';

export const EducationSection: React.FC = () => {
  const { translate, direction } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [educations, setEducations] = React.useState<Education[]>(user?.education || []);
  const [activeEducation, setActiveEducation] = React.useState<Education | null>(null);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [editMode, setEditMode] = React.useState<'list' | 'form'>('list');
  
  // Reset educations when user changes
  React.useEffect(() => {
    if (user?.education) {
      setEducations(user.education);
    }
  }, [user]);
  
  // Handle adding a new education
  const handleAddEducation = () => {
    const newEducation: Education = {
      id: `edu_${Date.now()}`,
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      ongoing: false,
      description: '',
    };
    
    setActiveEducation(newEducation);
    setEditMode('form');
  };
  
  // Handle editing education
  const handleEditEducation = (education: Education) => {
    setActiveEducation({...education});
    setEditMode('form');
  };
  
  // Handle deleting education
  const handleDeleteEducation = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };
  
  // Handle input change
  const handleInputChange = (name: string, value: string | boolean) => {
    if (!activeEducation) return;
    
    setActiveEducation(prev => {
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
  
  // Validate education form
  const validateEducationForm = () => {
    if (!activeEducation) return false;
    
    const newErrors: Record<string, string> = {};
    
    if (!activeEducation.institution.trim()) {
      newErrors.institution = translate('validation.required');
    }
    
    if (!activeEducation.degree.trim()) {
      newErrors.degree = translate('validation.required');
    }
    
    if (!activeEducation.field.trim()) {
      newErrors.field = translate('validation.required');
    }
    
    if (!activeEducation.startDate.trim()) {
      newErrors.startDate = translate('validation.required');
    }
    
    if (!activeEducation.ongoing && !activeEducation.endDate.trim()) {
      newErrors.endDate = translate('validation.required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle saving education
  const handleSaveEducation = () => {
    if (!validateEducationForm() || !activeEducation) return;
    
    setEducations(prev => {
      const existingIndex = prev.findIndex(edu => edu.id === activeEducation.id);
      if (existingIndex >= 0) {
        // Update existing education
        const updated = [...prev];
        updated[existingIndex] = activeEducation;
        return updated;
      } else {
        // Add new education
        return [...prev, activeEducation];
      }
    });
    
    setActiveEducation(null);
    setEditMode('list');
    setErrors({});
  };
  
  // Handle canceling education edit
  const handleCancelEducationEdit = () => {
    setActiveEducation(null);
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
        education: educations,
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating education:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    if (user?.education) {
      setEducations(user.education);
    }
    setActiveEducation(null);
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
      title={translate('profile.education')}
      icon="lucide:graduation-cap"
      isEditing={isEditing}
      isLoading={isLoading}
      isCompleted={educations && educations.length > 0}
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
              {educations.length === 0 ? (
                <div className="text-center py-8">
                  <Icon icon="lucide:graduation-cap" className="text-default-300 mx-auto mb-2" width={32} height={32} />
                  <p className="text-default-500">{translate('profile.noEducation')}</p>
                </div>
              ) : (
                <AnimatePresence>
                  {educations.map((education) => (
                    <motion.div
                      key={education.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card shadow="none" className="border border-default-200 bg-content1 mb-3">
                        <CardBody className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div>
                              <h4 className="font-medium">{education.degree} in {education.field}</h4>
                              <p className="text-default-500">{education.institution}</p>
                              <div className="flex gap-3 mt-1">
                                <span className="text-default-400 text-xs">
                                  {formatDate(education.startDate)} – {education.ongoing ? 'Present' : formatDate(education.endDate)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex mt-2 md:mt-0 gap-2">
                              <Button
                                size="sm"
                                variant="flat"
                                color="primary"
                                isIconOnly
                                onPress={() => handleEditEducation(education)}
                              >
                                <Icon icon="lucide:edit" width={16} height={16} />
                              </Button>
                              <Button
                                size="sm"
                                variant="flat"
                                color="danger"
                                isIconOnly
                                onPress={() => handleDeleteEducation(education.id)}
                              >
                                <Icon icon="lucide:trash" width={16} height={16} />
                              </Button>
                            </div>
                          </div>
                          
                          {education.description && (
                            <p className="text-sm mt-2 text-default-600 line-clamp-2">{education.description}</p>
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
                onPress={handleAddEducation}
              >
                Add Education
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
                    <div className="md:col-span-2">
                      <Input
                        label="School/University"
                        placeholder="e.g. Stanford University"
                        value={activeEducation?.institution || ''}
                        onValueChange={(value) => handleInputChange('institution', value)}
                        isInvalid={!!errors.institution}
                        errorMessage={errors.institution}
                        variant="bordered"
                        fullWidth
                        className={direction === 'rtl' ? 'text-right' : ''}
                      />
                    </div>
                    
                    <Input
                      label="Degree"
                      placeholder="e.g. Bachelor's"
                      value={activeEducation?.degree || ''}
                      onValueChange={(value) => handleInputChange('degree', value)}
                      isInvalid={!!errors.degree}
                      errorMessage={errors.degree}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                    
                    <Input
                      label="Field of Study"
                      placeholder="e.g. Computer Science"
                      value={activeEducation?.field || ''}
                      onValueChange={(value) => handleInputChange('field', value)}
                      isInvalid={!!errors.field}
                      errorMessage={errors.field}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                    
                    <div className="flex items-center justify-center md:col-span-2">
                      <Checkbox
                        isSelected={activeEducation?.ongoing || false}
                        onValueChange={(value) => handleInputChange('ongoing', value)}
                      >
                        I'm currently studying here
                      </Checkbox>
                    </div>
                    
                    <Input
                      label="Start Date"
                      type="month"
                      placeholder="YYYY-MM"
                      value={activeEducation?.startDate || ''}
                      onValueChange={(value) => handleInputChange('startDate', value)}
                      isInvalid={!!errors.startDate}
                      errorMessage={errors.startDate}
                      variant="bordered"
                      fullWidth
                      className={direction === 'rtl' ? 'text-right' : ''}
                    />
                    
                    {!activeEducation?.ongoing && (
                      <Input
                        label="End Date"
                        type="month"
                        placeholder="YYYY-MM"
                        value={activeEducation?.endDate || ''}
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
                      label="Description (Optional)"
                      placeholder="Describe your studies, achievements, thesis, etc..."
                      value={activeEducation?.description || ''}
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
                      onPress={handleCancelEducationEdit}
                    >
                      Cancel
                    </Button>
                    <Button
                      color="primary"
                      onPress={handleSaveEducation}
                    >
                      Save Education
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
          {educations && educations.length > 0 ? (
            <div className="space-y-6">
              {educations.map((education, index) => (
                <div key={education.id} className="flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                      <Icon icon="lucide:graduation-cap" className="text-primary-500" width={20} height={20} />
                    </div>
                    <div>
                      <h4 className="font-medium">{education.degree} in {education.field}</h4>
                      <p className="text-default-500">{education.institution}</p>
                      <p className="text-default-400 text-sm">
                        {formatDate(education.startDate)} – {education.ongoing ? 'Present' : formatDate(education.endDate)}
                      </p>
                    </div>
                  </div>
                  
                  {education.description && (
                    <div className="ml-16 mt-2">
                      <p className="text-sm text-default-600">{education.description}</p>
                    </div>
                  )}
                  
                  {index < educations.length - 1 && <Divider className="my-4" />}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon icon="lucide:graduation-cap" className="text-default-300 mx-auto mb-2" width={32} height={32} />
              <p className="text-default-500">No education added yet</p>
              <Button
                color="primary"
                variant="flat"
                size="sm"
                className="mt-4"
                startContent={<Icon icon="lucide:plus" />}
                onPress={handleEdit}
              >
                Add Education
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </ProfileSection>
  );
};