import React, { useState, ReactElement, ReactNode, ReactChild } from 'react';
import { 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  Button, Input, Select, SelectItem, Tabs, Tab, Card, CardBody 
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';
import { nationalities, sources, stages } from '../../data/mockCandidateData';
import { JobRequisition } from '../../data/mockJobData';

interface AddCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (candidate: Candidate) => void;
  jobs: JobRequisition[];
}

type AddTab = 'manual' | 'upload';

const AddCandidateModal: React.FC<AddCandidateModalProps> = ({ isOpen, onClose, onAdd, jobs }) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<AddTab>('manual');
  const [formData, setFormData] = useState<Partial<Candidate>>({
    name: '',
    email: '',
    phone: '',
    stage: 'new',
    source: 'linkedin',
    nationality: 'UAE',
    aiScore: 85,
    jobRequisitionId: 'JR001',
    jobTitle: '',
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [selectedJob, setSelectedJob] = React.useState<string>("");
  const [uploadSelectedJob, setUploadSelectedJob] = React.useState<string>("");
  
  const handleChange = (field: keyof Candidate, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation for required job selection
    if (!selectedJob && !uploadSelectedJob) {
      // In a real app, you'd show a validation error message
      return;
    }
    
    // Generate a unique ID and add timestamps for a real app
    const newCandidate: Candidate = {
      ...formData,
      id: `c${Math.floor(Math.random() * 10000)}`,
      dateAdded: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      jobRequisitionId: selectedJob || uploadSelectedJob,
    } as Candidate;
    
    onAdd(newCandidate);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:user-plus" className="text-primary" />
                <span>{t('addCandidate')}</span>
              </div>
            </ModalHeader>
            
            <Tabs 
              aria-label="Add Candidate Options"
              selectedKey={activeTab}
              onSelectionChange={setActiveTab as any}
              className="px-6 pt-0"
              variant="underlined"
              color="primary"
            >
              <Tab key="manual" title={t('addCandidate')} />
              <Tab key="upload" title={t('uploadCv')} />
            </Tabs>
            
            <ModalBody>
              {activeTab === 'manual' ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={t('name')}
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      required
                      isRequired
                    />
                    <Input
                      label={t('email')}
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                      isRequired
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label={t('phone')}
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      required
                      isRequired
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
                      selectedKeys={[formData.nationality!]}
                      onChange={(e) => handleChange('nationality', e.target.value)}
                      required
                      isRequired
                    >
                      {nationalities.map((nationality) => (
                        <SelectItem key={nationality} value={nationality}>
                          {nationality}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      label={t('source')}
                      selectedKeys={[formData.source!]}
                      onChange={(e) => handleChange('source', e.target.value)}
                      required
                      isRequired
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
                      selectedKeys={[formData.stage!]}
                      onChange={(e) => handleChange('stage', e.target.value)}
                      required
                      isRequired
                    >
                      {stages.map((stage) => (
                        <SelectItem key={stage} value={stage}>
                          {t(stage)}
                        </SelectItem>
                      ))}
                    </Select>
                    
                    <Select
                      label={t('jobRequisition')}
                      placeholder={t('selectJob')}
                      selectedKeys={selectedJob ? [selectedJob] : []}
                      onChange={(e) => setSelectedJob(e.target.value)}
                      isRequired
                    >
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} - {job.department}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Select
                      label={t('jobRequisition')}
                      placeholder={t('selectJob')}
                      selectedKeys={uploadSelectedJob ? [uploadSelectedJob] : []}
                      onChange={(e) => setUploadSelectedJob(e.target.value)}
                      isRequired
                    >
                      {jobs.map((job) => (
                        <SelectItem key={job.id} value={job.id}>
                          {job.title} - {job.department}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  
                  <Card shadow="sm">
                    <CardBody className="p-4">
                      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-300">
                        <Icon icon="lucide:upload-cloud" className="w-12 h-12 text-default-400 mb-4" />
                        <p className="text-default-600 mb-2">{t('uploadCv')}</p>
                        <p className="text-sm text-default-500 mb-4">PDF, DOCX or TXT (Max. 5MB)</p>
                        <input
                          type="file"
                          id="cv-upload"
                          className="hidden"
                          accept=".pdf,.docx,.doc,.txt"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="cv-upload">
                          <Button 
                            as="span"
                            color="primary"
                            variant="flat"
                            startContent={<Icon icon="lucide:file-plus" className={language === 'ar' ? 'icon-flip' : ''} />}
                          >
                            {t('selectFile')}
                          </Button>
                        </label>
                      </div>

                      {file && (
                        <div className="mt-4">
                          <p className="text-sm font-medium">{t('selectedFile')}:</p>
                          <div className="flex items-center gap-2 mt-1 p-2 bg-default-50 rounded">
                            <Icon icon="lucide:file-text" className="text-primary" />
                            <span className="text-sm">{file.name}</span>
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                  
                  <div className="bg-wise-blue-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-wise-blue-100 rounded-full">
                        <Icon icon="lucide:sparkles" className="text-wise-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-wise-blue-700 mb-1">AI CV Parsing</h4>
                        <p className="text-sm text-wise-blue-600">
                          Our AI will automatically extract candidate details and calculate a match score based on the job requirements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button 
                color="default" 
                variant="flat" 
                onPress={onClose}
              >
                {t('cancel')}
              </Button>
              <Button 
                color="primary"
                onPress={handleSubmit}
                isDisabled={activeTab === 'manual' ? 
                  (!formData.name || !formData.email || !formData.phone || !selectedJob) : 
                  (!file || !uploadSelectedJob)
                }
              >
                {t('addCandidate')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddCandidateModal;