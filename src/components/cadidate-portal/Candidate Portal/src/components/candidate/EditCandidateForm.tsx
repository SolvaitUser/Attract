import React, { useState } from 'react';
import { Input, Button, Select, SelectItem, Textarea } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';
import { nationalities, sources, stages } from '../../data/mockCandidateData';

interface EditCandidateFormProps {
  candidate: Candidate;
  onSave: (updatedCandidate: Candidate) => void;
  onCancel: () => void;
}

const EditCandidateForm: React.FC<EditCandidateFormProps> = ({ candidate, onSave, onCancel }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState<Candidate>({ ...candidate });

  const handleChange = (field: keyof Candidate, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t('name')}
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
        <Input
          label={t('email')}
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={t('phone')}
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          required
        />
        <Input
          label={t('jobTitle')}
          value={formData.jobTitle || ''}
          onChange={(e) => handleChange('jobTitle', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label={t('nationality')}
          selectedKeys={[formData.nationality]}
          onChange={(e) => handleChange('nationality', e.target.value)}
          required
        >
          {nationalities.map((nationality) => (
            <SelectItem key={nationality} value={nationality}>
              {nationality}
            </SelectItem>
          ))}
        </Select>
        <Select
          label={t('source')}
          selectedKeys={[formData.source]}
          onChange={(e) => handleChange('source', e.target.value)}
          required
        >
          {sources.map((source) => (
            <SelectItem key={source} value={source}>
              {t(source)}
            </SelectItem>
          ))}
        </Select>
      </div>

      {formData.source === 'referral' && (
        <Input
          label={t('referredBy')}
          value={formData.referrer || ''}
          onChange={(e) => handleChange('referrer', e.target.value)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label={t('stage')}
          selectedKeys={[formData.stage]}
          onChange={(e) => handleChange('stage', e.target.value)}
          required
        >
          {stages.map((stage) => (
            <SelectItem key={stage} value={stage}>
              {t(stage)}
            </SelectItem>
          ))}
        </Select>
        <Input
          type="number"
          min="0"
          max="100"
          label={t('aiScore')}
          value={formData.aiScore.toString()}
          onChange={(e) => handleChange('aiScore', parseInt(e.target.value) || 0)}
          endContent={<div className="pointer-events-none flex items-center"><span className="text-default-400">%</span></div>}
        />
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="light" onPress={onCancel}>
          {t('cancel')}
        </Button>
        <Button color="primary" type="submit" startContent={<Icon icon="lucide:save" className={language === 'ar' ? 'icon-flip' : ''} />}>
          {t('save')}
        </Button>
      </div>
    </form>
  );
};

export default EditCandidateForm;