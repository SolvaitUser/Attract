import React, { useState } from 'react';
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Chip,
  CheckboxGroup,
  Checkbox,
  Divider
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';

// Sample tags - in a real app, these would come from an API or state
const availableTags = [
  'React', 'JavaScript', 'TypeScript', 'UI/UX', 'Remote', 
  'Senior', 'Junior', 'Contract', 'Full-time', 'Part-time',
  'Marketing', 'Design', 'Sales', 'Engineering', 'Finance'
];

interface BulkTagsModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidateIds: string[];
  onAddTags: (candidateIds: string[], tags: string[]) => void;
}

const BulkTagsModal: React.FC<BulkTagsModalProps> = ({ 
  isOpen, 
  onClose, 
  candidateIds,
  onAddTags
}) => {
  const { t, language } = useLanguage();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredTags = availableTags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTag = () => {
    if (newTag.trim() !== '' && !selectedTags.includes(newTag.trim())) {
      setSelectedTags([...selectedTags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleApplyTags = () => {
    onAddTags(candidateIds, selectedTags);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {t('addTags')}
              <p className="text-sm text-default-500">
                {t('selectedCandidates')}: {candidateIds.length}
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Input
                      placeholder={t('selectTags')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      startContent={<Icon icon="lucide:search" className="text-default-400" />}
                      clearable
                      onClear={() => setSearchTerm('')}
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedTags.map(tag => (
                      <Chip 
                        key={tag} 
                        onClose={() => handleRemoveTag(tag)}
                        color="primary"
                        variant="flat"
                      >
                        {tag}
                      </Chip>
                    ))}
                  </div>
                  
                  <div className="max-h-48 overflow-y-auto border rounded-medium p-2">
                    <CheckboxGroup 
                      value={selectedTags} 
                      onChange={setSelectedTags as any}
                      className="gap-1"
                    >
                      {filteredTags.length > 0 ? (
                        filteredTags.map(tag => (
                          <Checkbox key={tag} value={tag}>
                            {tag}
                          </Checkbox>
                        ))
                      ) : (
                        <p className="text-center py-2 text-default-500">{t('noTagsFound')}</p>
                      )}
                    </CheckboxGroup>
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <p className="text-sm font-medium mb-2">{t('addNewTag')}</p>
                  <div className="flex gap-2">
                    <Input
                      placeholder={t('addNewTag')}
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className={language === 'ar' ? 'text-right' : ''}
                      fullWidth
                    />
                    <Button 
                      isIconOnly 
                      onPress={handleAddTag} 
                      isDisabled={newTag.trim() === ''}
                    >
                      <Icon icon="lucide:plus" />
                    </Button>
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
                onPress={handleApplyTags} 
                isDisabled={selectedTags.length === 0}
                startContent={<Icon icon="lucide:tag" />}
              >
                {t('applyTags')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default BulkTagsModal;