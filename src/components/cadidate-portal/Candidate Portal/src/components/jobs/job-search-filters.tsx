import React from 'react';
import { Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Card, Checkbox, Chip } from '@heroui/react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/language-context';

interface JobFilters {
  keyword: string;
  jobTypes: string[];
  departments: string[];
  countries: string[];
}

interface JobSearchFiltersProps {
  filters: JobFilters;
  onFilterChange: (filters: JobFilters) => void;
  isCompact?: boolean;
}

export const JobSearchFilters: React.FC<JobSearchFiltersProps> = ({ filters, onFilterChange, isCompact = false }) => {
  const { translate } = useLanguage();
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(!isCompact);
  
  // Available filter options
  const jobTypeOptions = ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Remote'];
  const departmentOptions = ['Technology', 'Marketing', 'Sales', 'Operations', 'Finance', 'HR', 'Product', 'Design', 'Engineering'];
  const countryOptions = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France', 'Remote'];
  
  // Handle input change
  const handleKeywordChange = (value: string) => {
    onFilterChange({ ...filters, keyword: value });
  };
  
  // Handle checkbox changes
  const handleJobTypeChange = (jobType: string, isSelected: boolean) => {
    if (isSelected) {
      onFilterChange({ ...filters, jobTypes: [...filters.jobTypes, jobType] });
    } else {
      onFilterChange({ 
        ...filters, 
        jobTypes: filters.jobTypes.filter(type => type !== jobType) 
      });
    }
  };
  
  const handleDepartmentChange = (department: string, isSelected: boolean) => {
    if (isSelected) {
      onFilterChange({ ...filters, departments: [...filters.departments, department] });
    } else {
      onFilterChange({ 
        ...filters, 
        departments: filters.departments.filter(dept => dept !== department) 
      });
    }
  };
  
  const handleCountryChange = (country: string, isSelected: boolean) => {
    if (isSelected) {
      onFilterChange({ ...filters, countries: [...filters.countries, country] });
    } else {
      onFilterChange({ 
        ...filters, 
        countries: filters.countries.filter(c => c !== country) 
      });
    }
  };
  
  // Reset all filters
  const resetFilters = () => {
    onFilterChange({
      keyword: '',
      jobTypes: [],
      departments: [],
      countries: [],
    });
  };
  
  // Count active filters
  const activeFiltersCount = filters.jobTypes.length + filters.departments.length + filters.countries.length;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <Input
            classNames={{
              base: "w-full md:w-auto md:flex-1",
              inputWrapper: "h-10",
            }}
            placeholder={translate('jobs.keyword')}
            value={filters.keyword}
            onValueChange={handleKeywordChange}
            startContent={<Icon icon="lucide:search" width={16} height={16} />}
            variant="bordered"
          />
          
          {isCompact && (
            <Button
              variant="flat"
              color={activeFiltersCount > 0 ? "primary" : "default"}
              endContent={<Icon icon={isFiltersOpen ? "lucide:chevron-up" : "lucide:chevron-down"} width={16} />}
              onPress={() => setIsFiltersOpen(!isFiltersOpen)}
            >
              {translate('jobs.filters')}
              {activeFiltersCount > 0 && (
                <span className="ml-1 bg-primary-500 text-white rounded-full w-5 h-5 inline-flex items-center justify-center text-xs">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          )}
        </div>
        
        {(isFiltersOpen || !isCompact) && (
          <motion.div
            initial={isCompact ? { height: 0, opacity: 0 } : false}
            animate={isCompact ? { height: 'auto', opacity: 1 } : false}
            exit={isCompact ? { height: 0, opacity: 0 } : false}
            transition={{ duration: 0.3 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div>
              <p className="text-sm font-medium mb-2">{translate('jobs.jobType')}</p>
              <div className="space-y-1">
                {jobTypeOptions.map(jobType => (
                  <Checkbox
                    key={jobType}
                    isSelected={filters.jobTypes.includes(jobType)}
                    onValueChange={(isSelected) => handleJobTypeChange(jobType, isSelected)}
                    size="sm"
                  >
                    {jobType}
                  </Checkbox>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">{translate('jobs.department')}</p>
              <div className="space-y-1">
                {departmentOptions.map(department => (
                  <Checkbox
                    key={department}
                    isSelected={filters.departments.includes(department)}
                    onValueChange={(isSelected) => handleDepartmentChange(department, isSelected)}
                    size="sm"
                  >
                    {department}
                  </Checkbox>
                ))}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">{translate('jobs.country')}</p>
              <div className="space-y-1">
                {countryOptions.map(country => (
                  <Checkbox
                    key={country}
                    isSelected={filters.countries.includes(country)}
                    onValueChange={(isSelected) => handleCountryChange(country, isSelected)}
                    size="sm"
                  >
                    {country}
                  </Checkbox>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-3 flex justify-end mt-2">
              <Button variant="flat" color="danger" onPress={resetFilters} size="sm">
                Reset Filters
              </Button>
            </div>
          </motion.div>
        )}
      </Card>
    </motion.div>
  );
};