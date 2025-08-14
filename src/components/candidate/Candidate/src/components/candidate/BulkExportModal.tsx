import React, { useState } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button,
  RadioGroup,
  Radio,
  Checkbox,
  Divider
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';

interface BulkExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidates: Candidate[];
}

const BulkExportModal: React.FC<BulkExportModalProps> = ({ 
  isOpen, 
  onClose,
  candidates
}) => {
  const { t, language } = useLanguage();
  const [exportFormat, setExportFormat] = useState<string>('csv');
  const [options, setOptions] = useState({
    includeFullProfile: true,
    includeNotes: false,
    includeTags: true
  });
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const handleOptionChange = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const handleExport = () => {
    // In a real app, this would generate and download a file
    setIsDownloading(true);
    
    // Simulate download
    setTimeout(() => {
      setIsDownloading(false);
      onClose();
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t('exportCandidates')}
              <p className="text-sm text-default-500">
                {candidates.length} {t('selectedCandidates')}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium mb-2">{t('exportFormat')}</p>
                  <RadioGroup
                    value={exportFormat}
                    onValueChange={setExportFormat}
                    orientation="horizontal"
                  >
                    <Radio value="csv">CSV</Radio>
                    <Radio value="pdf">PDF</Radio>
                    <Radio value="xlsx">Excel</Radio>
                  </RadioGroup>
                </div>
                
                <Divider />
                
                <div>
                  <p className="text-sm font-medium mb-2">{t('exportOptions')}</p>
                  <div className="space-y-2">
                    <Checkbox
                      isSelected={options.includeFullProfile}
                      onValueChange={() => handleOptionChange('includeFullProfile')}
                    >
                      {t('includeFullProfile')}
                    </Checkbox>
                    <Checkbox
                      isSelected={options.includeNotes}
                      onValueChange={() => handleOptionChange('includeNotes')}
                    >
                      {t('includeNotes')}
                    </Checkbox>
                    <Checkbox
                      isSelected={options.includeTags}
                      onValueChange={() => handleOptionChange('includeTags')}
                    >
                      {t('includeTags')}
                    </Checkbox>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                {t('cancel')}
              </Button>
              <Button 
                color="primary" 
                onPress={handleExport}
                isLoading={isDownloading}
                startContent={!isDownloading && <Icon icon="lucide:download" />}
              >
                {t('download')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BulkExportModal;