import React from 'react';
import { Chip, Checkbox, Input, Button } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';
import { useAuth } from '../../contexts/auth-context';
import { ProfileSection } from './profile-section';

export const JobPreferencesSection: React.FC = () => {
  const { translate } = useLanguage();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Form state
  const [formData, setFormData] = React.useState({
    jobTypes: user?.jobPreferences?.jobTypes || [],
    locations: user?.jobPreferences?.locations || [],
    departments: user?.jobPreferences?.departments || [],
    minimumSalary: user?.jobPreferences?.minimumSalary || 0,
    remote: user?.jobPreferences?.remote || false,
  });

  // New location input
  const [newLocation, setNewLocation] = React.useState('');
  
  // Available job types and departments
  const availableJobTypes = [
    'Full-time', 'Part-time', 'Contract', 'Freelance', 
    'Internship', 'Temporary', 'Remote'
  ];
  
  const availableDepartments = [
    'Technology', 'Engineering', 'Marketing', 'Sales', 
    'Finance', 'HR', 'Operations', 'Product', 'Design', 
    'Customer Support'
  ];

  // Reset form when user changes
  React.useEffect(() => {
    if (user?.jobPreferences) {
      setFormData({
        jobTypes: user.jobPreferences.jobTypes || [],
        locations: user.jobPreferences.locations || [],
        departments: user.jobPreferences.departments || [],
        minimumSalary: user.jobPreferences.minimumSalary || 0,
        remote: user.jobPreferences.remote || false,
      });
    }
  }, [user]);

  // Handle job type toggle
  const toggleJobType = (type: string) => {
    setFormData(prev => {
      const isSelected = prev.jobTypes.includes(type);
      return {
        ...prev,
        jobTypes: isSelected
          ? prev.jobTypes.filter(t => t !== type)
          : [...prev.jobTypes, type]
      };
    });
  };

  // Handle department toggle
  const toggleDepartment = (department: string) => {
    setFormData(prev => {
      const isSelected = prev.departments.includes(department);
      return {
        ...prev,
        departments: isSelected
          ? prev.departments.filter(d => d !== department)
          : [...prev.departments, department]
      };
    });
  };

  // Handle add location
  const handleAddLocation = () => {
    if (newLocation && !formData.locations.includes(newLocation)) {
      setFormData(prev => ({
        ...prev,
        locations: [...prev.locations, newLocation]
      }));
      setNewLocation('');
    }
  };

  // Handle remove location
  const handleRemoveLocation = (location: string) => {
    setFormData(prev => ({
      ...prev,
      locations: prev.locations.filter(loc => loc !== location)
    }));
  };

  // Handle salary change
  const handleSalaryChange = (value: string) => {
    const salary = parseInt(value.replace(/[^0-9]/g, ''), 10);
    setFormData(prev => ({
      ...prev,
      minimumSalary: isNaN(salary) ? 0 : salary
    }));
  };

  // Handle remote toggle
  const handleRemoteToggle = (value: boolean) => {
    setFormData(prev => ({
      ...prev,
      remote: value
    }));
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
        jobPreferences: formData
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating job preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    if (user?.jobPreferences) {
      setFormData({
        jobTypes: user.jobPreferences.jobTypes || [],
        locations: user.jobPreferences.locations || [],
        departments: user.jobPreferences.departments || [],
        minimumSalary: user.jobPreferences.minimumSalary || 0,
        remote: user.jobPreferences.remote || false,
      });
    }
    setIsEditing(false);
  };

  // Format salary for display
  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(salary);
  };

  const isCompleted = !!(
    user?.jobPreferences &&
    user.jobPreferences.jobTypes?.length > 0 &&
    user.jobPreferences.departments?.length > 0
  );

  return (
    <ProfileSection
      title={translate('profile.jobPreferences')}
      icon="lucide:filter"
      isEditing={isEditing}
      isLoading={isLoading}
      isCompleted={isCompleted}
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
          <div>
            <h4 className="text-sm font-medium mb-2">{translate('jobs.jobType')}</h4>
            <div className="flex flex-wrap gap-2">
              {availableJobTypes.map((type) => (
                <Chip
                  key={type}
                  variant={formData.jobTypes.includes(type) ? "solid" : "flat"}
                  color={formData.jobTypes.includes(type) ? "primary" : "default"}
                  onClose={
                    formData.jobTypes.includes(type) 
                      ? () => toggleJobType(type) 
                      : undefined
                  }
                  onClick={() => toggleJobType(type)}
                  className="cursor-pointer"
                >
                  {type}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">{translate('jobs.department')}</h4>
            <div className="flex flex-wrap gap-2">
              {availableDepartments.map((dept) => (
                <Chip
                  key={dept}
                  variant={formData.departments.includes(dept) ? "solid" : "flat"}
                  color={formData.departments.includes(dept) ? "primary" : "default"}
                  onClose={
                    formData.departments.includes(dept) 
                      ? () => toggleDepartment(dept) 
                      : undefined
                  }
                  onClick={() => toggleDepartment(dept)}
                  className="cursor-pointer"
                >
                  {dept}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">{translate('jobs.country')}</h4>
            <div className="flex flex-wrap gap-2 mb-2">
              {formData.locations.map((location) => (
                <Chip
                  key={location}
                  variant="solid"
                  color="primary"
                  onClose={() => handleRemoveLocation(location)}
                >
                  {location}
                </Chip>
              ))}
            </div>
            <div className="flex">
              <Input
                placeholder="Add location"
                value={newLocation}
                onValueChange={setNewLocation}
                className="flex-grow"
                endContent={
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={handleAddLocation}
                    isDisabled={!newLocation.trim()}
                  >
                    <Icon icon="lucide:plus" width={16} height={16} />
                  </Button>
                }
              />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-2">Minimum Salary</h4>
            <Input
              type="text"
              value={formatSalary(formData.minimumSalary)}
              onValueChange={handleSalaryChange}
              startContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400">$</span>
                </div>
              }
              labelPlacement="outside"
            />
          </div>

          <div>
            <Checkbox
              isSelected={formData.remote}
              onValueChange={handleRemoteToggle}
            >
              <div className="flex items-center gap-2">
                <span>Open to remote work</span>
                <Icon icon="lucide:globe" width={14} height={14} className="text-primary-500" />
              </div>
            </Checkbox>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-5"
        >
          {user?.jobPreferences ? (
            <>
              {user.jobPreferences.jobTypes && user.jobPreferences.jobTypes.length > 0 && (
                <div>
                  <h4 className="text-sm text-default-500 mb-1">{translate('jobs.jobType')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.jobPreferences.jobTypes.map((type) => (
                      <Chip key={type} size="sm" variant="flat" color="primary">
                        {type}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {user.jobPreferences.departments && user.jobPreferences.departments.length > 0 && (
                <div>
                  <h4 className="text-sm text-default-500 mb-1">{translate('jobs.department')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.jobPreferences.departments.map((dept) => (
                      <Chip key={dept} size="sm" variant="flat" color="secondary">
                        {dept}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {user.jobPreferences.locations && user.jobPreferences.locations.length > 0 && (
                <div>
                  <h4 className="text-sm text-default-500 mb-1">{translate('jobs.country')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {user.jobPreferences.locations.map((location) => (
                      <Chip 
                        key={location} 
                        size="sm" 
                        variant="flat" 
                        color="default"
                        startContent={<Icon icon="lucide:map-pin" width={14} height={14} />}
                      >
                        {location}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {user.jobPreferences.minimumSalary !== undefined && (
                <div>
                  <h4 className="text-sm text-default-500 mb-1">Minimum Salary</h4>
                  <p className="font-medium">{formatSalary(user.jobPreferences.minimumSalary)}</p>
                </div>
              )}

              {user.jobPreferences.remote && (
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:check-circle" className="text-success-500" width={16} height={16} />
                  <span>Open to remote work</span>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center py-6">
              <div className="bg-default-100 dark:bg-default-50/10 p-4 rounded-full mb-4">
                <Icon icon="lucide:sliders" className="text-default-500" width={24} height={24} />
              </div>
              <h4 className="text-lg font-medium mb-1">Set your job preferences</h4>
              <p className="text-default-500 text-center mb-4">
                Help us match you with the right opportunities by setting your job preferences.
              </p>
              <Button 
                color="primary" 
                variant="flat"
                onPress={handleEdit}
                startContent={<Icon icon="lucide:plus" width={16} height={16} />}
              >
                Add Preferences
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </ProfileSection>
  );
};