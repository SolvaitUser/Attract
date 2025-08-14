import React from 'react';
import { Card, CardBody, Input, Slider, Checkbox, CheckboxGroup, Button, Divider } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FilterOptions } from '../../types/candidate';
import { nationalities, sources, stages } from '../../data/mockCandidateData';
import { mockJobRequisitions } from '../../data/mockJobData';

interface CandidateFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

const CandidateFilters: React.FC<CandidateFiltersProps> = ({ filters, onFilterChange }) => {
  const { t, language } = useLanguage();

  const handleReset = () => {
    onFilterChange({
      source: [],
      minAiScore: 0,
      maxAiScore: 100,
      nationality: [],
      stage: [],
      search: '',
      jobRequisition: [],
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value });
  };

  const handleSourceChange = (selectedSources: any) => {
    onFilterChange({ source: selectedSources });
  };

  const handleNationalityChange = (selectedNationalities: any) => {
    onFilterChange({ nationality: selectedNationalities });
  };

  const handleStageChange = (selectedStages: any) => {
    onFilterChange({ stage: selectedStages });
  };

  const handleScoreChange = (value: number | number[]) => {
    const [min, max] = Array.isArray(value) ? value : [0, value];
    onFilterChange({ minAiScore: min, maxAiScore: max });
  };

  const handleJobChange = (selectedJobs: any) => {
    onFilterChange({ jobRequisition: selectedJobs });
  };

  return (
    <Card className="w-80 h-full overflow-y-auto" shadow="sm">
      <CardBody className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{t('filters')}</h3>
          <Button 
            size="sm" 
            variant="light" 
            color="primary" 
            className="font-medium"
            onPress={handleReset}
          >
            {t('reset')}
          </Button>
        </div>

        <Input
          placeholder={t('search')}
          value={filters.search}
          onChange={handleSearchChange}
          startContent={
            <Icon 
              icon="lucide:search" 
              className="text-default-400" 
              width={16}
              height={16}
            />
          }
          className="mb-4"
        />

        <Divider className="my-3" />

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-3">{t('source')}</h4>
          <CheckboxGroup
            value={filters.source}
            onValueChange={handleSourceChange}
            className="gap-2"
          >
            {sources.map(source => (
              <Checkbox key={source} value={source} className="text-sm">
                {t(source)}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>

        <Divider className="my-3" />

        <div className="mb-4">
          <h4 className="font-medium mb-2">{t('aiScore')}</h4>
          <div className="px-1">
            <Slider
              label={t('aiScore')}
              step={5}
              minValue={0}
              maxValue={100}
              value={[filters.minAiScore, filters.maxAiScore]}
              onChange={handleScoreChange}
              showSteps={true}
              className="max-w-md"
            />
            <div className="flex justify-between mt-1">
              <span className="text-small">{filters.minAiScore}%</span>
              <span className="text-small">{filters.maxAiScore}%</span>
            </div>
          </div>
        </div>

        <Divider className="my-3" />

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-3">{t('nationality')}</h4>
          <div className="max-h-40 overflow-y-auto pr-1">
            <CheckboxGroup
              value={filters.nationality}
              onValueChange={handleNationalityChange}
            >
              {nationalities.map(nationality => (
                <Checkbox key={nationality} value={nationality}>
                  {nationality}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>

        <Divider className="my-3" />

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-3">{t('stage')}</h4>
          <CheckboxGroup
            value={filters.stage}
            onValueChange={handleStageChange}
          >
            {stages.map(stage => (
              <Checkbox key={stage} value={stage}>
                {t(stage)}
              </Checkbox>
            ))}
          </CheckboxGroup>
        </div>

        <Divider className="my-3" />

        <div className="mb-4">
          <h4 className="font-semibold text-sm mb-3">{t('jobRequisition')}</h4>
          <div className="max-h-40 overflow-y-auto pr-1">
            <CheckboxGroup
              value={filters.jobRequisition}
              onValueChange={handleJobChange}
              className="gap-2"
            >
              {mockJobRequisitions.map(job => (
                <Checkbox key={job.id} value={job.id} className="text-sm">
                  {job.title}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
        </div>

        <Divider className="my-3" />

        <Button 
          color="primary" 
          fullWidth
          onPress={() => {/* Apply filters */}}
        >
          {t('apply')}
        </Button>
      </CardBody>
    </Card>
  );
};

export default CandidateFilters;