import React from 'react';
import { Input, Avatar, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth, UserProfile } from '../../contexts/auth-context';
import { ProfileSection } from './profile-section';

export const PersonalInformationSection: React.FC = () => {
  const { translate, direction } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  
  // Form state
  const [formData, setFormData] = React.useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    country: user?.country || '',
    mobile: user?.mobile || '',
    linkedInProfile: user?.linkedInProfile || '',
  });
  
  // Avatar upload state
  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | undefined>(user?.profilePicture);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Reset form when user changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        mobile: user.mobile || '',
        linkedInProfile: user.linkedInProfile || '',
      });
      setAvatarPreview(user.profilePicture);
    }
  }, [user]);
  
  // Handle input change
  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };
  
  // Handle avatar click
  const handleAvatarClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Handle avatar change
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = translate('validation.required');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = translate('validation.required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = translate('validation.invalidEmail');
      }
    }
    
    if (!formData.country.trim()) {
      newErrors.country = translate('validation.required');
    }
    
    if (formData.mobile) {
      const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
      if (!phoneRegex.test(formData.mobile)) {
        newErrors.mobile = translate('validation.invalidMobile');
      }
    }
    
    if (formData.linkedInProfile) {
      if (!formData.linkedInProfile.includes('linkedin.com/')) {
        newErrors.linkedInProfile = translate('validation.invalidLinkedIn');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  // Handle save button click
  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // In real app, upload avatar first
      let profilePicture = user?.profilePicture;
      
      if (avatarFile) {
        // Mock avatar upload
        await new Promise(resolve => setTimeout(resolve, 1000));
        profilePicture = avatarPreview;
      }
      
      // Update user profile
      await updateProfile({
        ...formData,
        profilePicture,
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle cancel button click
  const handleCancel = () => {
    // Reset form data
    if (user) {
      setFormData({
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        mobile: user.mobile || '',
        linkedInProfile: user.linkedInProfile || '',
      });
      setAvatarPreview(user.profilePicture);
    }
    setAvatarFile(null);
    setErrors({});
    setIsEditing(false);
  };
  
  return (
    <ProfileSection
      title={translate('profile.personalInfo')}
      icon="lucide:user"
      isEditing={isEditing}
      isLoading={isLoading}
      isCompleted={true}
      onEdit={handleEdit}
      onSave={handleSave}
      onCancel={handleCancel}
    >
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <div className="relative">
              <Avatar
                src={avatarPreview}
                name={formData.fullName}
                showFallback
                size="lg"
                className="h-24 w-24 text-large cursor-pointer"
                onClick={handleAvatarClick}
              />
              <div className="absolute right-0 bottom-0 bg-primary-500 rounded-full p-1.5 cursor-pointer" onClick={handleAvatarClick}>
                <Icon icon="lucide:camera" className="text-white" width={14} height={14} />
              </div>
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label={translate('auth.fullName')}
                placeholder="John Doe"
                value={formData.fullName}
                onValueChange={(value) => handleInputChange('fullName', value)}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName}
                variant="bordered"
                fullWidth
                className={direction === 'rtl' ? 'text-right' : ''}
              />
            </div>
            
            <div>
              <Input
                label={translate('auth.email')}
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onValueChange={(value) => handleInputChange('email', value)}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                variant="bordered"
                fullWidth
                className={direction === 'rtl' ? 'text-right' : ''}
              />
            </div>
            
            <div>
              <Input
                label={translate('auth.country')}
                placeholder="United States"
                value={formData.country}
                onValueChange={(value) => handleInputChange('country', value)}
                isInvalid={!!errors.country}
                errorMessage={errors.country}
                variant="bordered"
                fullWidth
                className={direction === 'rtl' ? 'text-right' : ''}
              />
            </div>
            
            <div>
              <Input
                label={translate('auth.mobile')}
                type="tel"
                placeholder="+1 (123) 456-7890"
                value={formData.mobile}
                onValueChange={(value) => handleInputChange('mobile', value)}
                isInvalid={!!errors.mobile}
                errorMessage={errors.mobile}
                variant="bordered"
                fullWidth
                className={direction === 'rtl' ? 'text-right' : ''}
              />
            </div>
            
            <div className="md:col-span-2">
              <Input
                label={translate('profile.socialMedia')}
                placeholder="https://linkedin.com/in/yourprofile"
                startContent={<Icon icon="logos:linkedin-icon" width={18} height={18} />}
                value={formData.linkedInProfile}
                onValueChange={(value) => handleInputChange('linkedInProfile', value)}
                isInvalid={!!errors.linkedInProfile}
                errorMessage={errors.linkedInProfile}
                variant="bordered"
                fullWidth
                className={direction === 'rtl' ? 'text-right' : ''}
              />
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6"
        >
          <div className="flex items-center space-x-4">
            <Avatar
              src={user?.profilePicture}
              name={user?.fullName}
              showFallback
              size="lg"
              className="h-20 w-20 text-large"
            />
            <div>
              <h3 className="text-xl font-semibold">{user?.fullName}</h3>
              <p className="text-default-500">{user?.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex flex-col">
              <span className="text-sm text-default-500">{translate('auth.country')}</span>
              <span className="font-medium">{user?.country}</span>
            </div>
            
            {user?.mobile && (
              <div className="flex flex-col">
                <span className="text-sm text-default-500">{translate('auth.mobile')}</span>
                <span className="font-medium">{user?.mobile}</span>
              </div>
            )}
            
            {user?.linkedInProfile && (
              <div className="flex flex-col md:col-span-2">
                <span className="text-sm text-default-500">{translate('profile.socialMedia')}</span>
                <div className="flex items-center gap-2">
                  <Icon icon="logos:linkedin-icon" width={16} height={16} />
                  <a 
                    href={user.linkedInProfile} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:underline"
                  >
                    {user.linkedInProfile.replace('https://', '').replace('http://', '')}
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </ProfileSection>
  );
};