import React, { useState, useEffect } from 'react';
import { Button, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDisclosure } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate, CandidateView, FilterOptions } from '../../types/candidate';
import CandidateFilters from './CandidateFilters';
import CandidateKanbanView from './CandidateKanbanView';
import CandidateListView from './CandidateListView';
import AddCandidateModal from './AddCandidateModal';
import CandidateProfileModal from './CandidateProfileModal';
import LinkedInSearchModal from './LinkedInSearchModal';
import JobKanbanView from './JobKanbanView';
import BulkTagsModal from './BulkTagsModal';
import BulkEmailModal from './BulkEmailModal';
import BulkExportModal from './BulkExportModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { mockCandidates } from '../../data/mockCandidateData';
import { mockJobRequisitions } from '../../data/mockJobData';

const CandidateTab: React.FC = () => {
  const { t, language } = useLanguage();
  const [view, setView] = useState<CandidateView>('kanban');
  const [groupBy, setGroupBy] = useState<'stage' | 'job'>('stage');
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    source: [],
    minAiScore: 0,
    maxAiScore: 100,
    nationality: [],
    stage: [],
    search: '',
    jobRequisition: [],
  });

  const { isOpen: isEmailModalOpen, onOpen: openEmailModal, onClose: closeEmailModal } = useDisclosure();
  const { isOpen: isTagsModalOpen, onOpen: openTagsModal, onClose: closeTagsModal } = useDisclosure();
  const { isOpen: isExportModalOpen, onOpen: openExportModal, onClose: closeExportModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: openDeleteModal, onClose: closeDeleteModal } = useDisclosure();

  const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
    setFilters({ ...filters, ...newFilters });
  };

  const handleCandidateSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedCandidates([...selectedCandidates, id]);
    } else {
      setSelectedCandidates(selectedCandidates.filter(candidateId => candidateId !== id));
    }
  };

  const handleViewCandidate = (candidate: Candidate) => {
    setCurrentCandidate(candidate);
    setShowProfileModal(true);
  };

  const handleStageChange = (candidateId: string, newStage: Candidate['stage']) => {
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === candidateId ? { ...candidate, stage: newStage, lastActivity: new Date().toISOString() } : candidate
    );
    setCandidates(updatedCandidates);
  };

  const handleBulkStageChange = (stage: Candidate['stage']) => {
    const updatedCandidates = candidates.map(candidate => 
      selectedCandidates.includes(candidate.id) ? 
        { ...candidate, stage, lastActivity: new Date().toISOString() } : 
        candidate
    );
    setCandidates(updatedCandidates);
    setSelectedCandidates([]);
  };

  const handleAddCandidate = (candidate: Candidate) => {
    setCandidates([...candidates, candidate]);
    setShowAddModal(false);
  };

  const handleEditCandidate = (updatedCandidate: Candidate) => {
    const updatedCandidates = candidates.map(candidate => 
      candidate.id === updatedCandidate.id ? updatedCandidate : candidate
    );
    setCandidates(updatedCandidates);
    setCurrentCandidate(null);
    setShowProfileModal(false);
  };

  const handleDeleteCandidate = (id: string) => {
    setCandidates(candidates.filter(candidate => candidate.id !== id));
    setCurrentCandidate(null);
    setShowProfileModal(false);
  };

  const handleBulkDelete = (candidateIds: string[]) => {
    setCandidates(candidates.filter(candidate => !candidateIds.includes(candidate.id)));
    setSelectedCandidates([]);
  };

  const handleBulkTag = (candidateIds: string[], tags: string[]) => {
    const updatedCandidates = candidates.map(candidate => 
      candidateIds.includes(candidate.id) ? 
        { 
          ...candidate, 
          tags: [...(candidate.tags || []), ...tags],
          lastActivity: new Date().toISOString()
        } : 
        candidate
    );
    setCandidates(updatedCandidates);
  };

  const getJobTitleById = (jobId: string): string => {
    const job = mockJobRequisitions.find(job => job.id === jobId);
    return job ? job.title : t('unknownJob');
  };

  const stages = ['stage1', 'stage2', 'stage3']; // Example stages

  const handleOpenLinkedInSearch = () => {
    setShowLinkedInModal(true);
  };

  useEffect(() => {
    let filtered = [...candidates];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(candidate => 
        candidate.name.toLowerCase().includes(searchLower) || 
        candidate.email.toLowerCase().includes(searchLower) ||
        candidate.jobTitle?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply source filter
    if (filters.source.length > 0) {
      filtered = filtered.filter(candidate => filters.source.includes(candidate.source));
    }
    
    // Apply nationality filter
    if (filters.nationality.length > 0) {
      filtered = filtered.filter(candidate => filters.nationality.includes(candidate.nationality));
    }
    
    // Apply stage filter
    if (filters.stage.length > 0) {
      filtered = filtered.filter(candidate => filters.stage.includes(candidate.stage));
    }
    
    // Apply AI score filter
    filtered = filtered.filter(candidate => 
      candidate.aiScore >= filters.minAiScore && 
      candidate.aiScore <= filters.maxAiScore
    );
    
    // Apply job requisition filter
    if (filters.jobRequisition.length > 0) {
      filtered = filtered.filter(candidate => 
        filters.jobRequisition.includes(candidate.jobRequisitionId)
      );
    }
    
    setFilteredCandidates(filtered);
  }, [candidates, filters]);

  const stageDropdownItems = stages.map(stage => (
    <DropdownItem 
      key={stage} 
      className="ps-8"
      textValue={t(stage)}
      onPress={() => handleBulkStageChange(stage as Candidate['stage'])}
    >
      {t(stage)}
    </DropdownItem>
  ));

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-default-50 rounded-lg overflow-hidden flex">
            <Button 
              className={`rounded-none border-0 px-4 h-10 ${view === 'kanban' ? 'bg-wise-blue-50 text-wise-blue-600 font-medium' : 'bg-transparent hover:bg-default-100'}`}
              variant="light" 
              startContent={
                <Icon 
                  icon="lucide:layout-grid" 
                  className={`${view === 'kanban' ? 'text-wise-blue-600' : 'text-default-500'} ${language === 'ar' ? 'icon-flip' : ''} me-1.5`} 
                  width={16}
                  height={16}
                />
              }
              onPress={() => setView('kanban')}
            >
              {t('kanbanView')}
            </Button>
            <Button 
              className={`rounded-none border-0 px-4 h-10 ${view === 'list' ? 'bg-wise-blue-50 text-wise-blue-600 font-medium' : 'bg-transparent hover:bg-default-100'}`}
              variant="light" 
              startContent={
                <Icon 
                  icon="lucide:list" 
                  className={`${view === 'list' ? 'text-wise-blue-600' : 'text-default-500'} ${language === 'ar' ? 'icon-flip' : ''} me-1.5`} 
                  width={16}
                  height={16}
                />
              }
              onPress={() => setView('list')}
            >
              {t('listView')}
            </Button>
          </div>
          
          <Divider orientation="vertical" className="h-8 mx-2" />
          
          <div className="bg-default-50 rounded-lg overflow-hidden flex">
            <Button 
              className={`rounded-none border-0 px-4 h-10 ${groupBy === 'stage' ? 'bg-wise-blue-50 text-wise-blue-600 font-medium' : 'bg-transparent hover:bg-default-100'}`}
              variant="light"
              startContent={
                <Icon 
                  icon="lucide:layers" 
                  className={`${groupBy === 'stage' ? 'text-wise-blue-600' : 'text-default-500'} ${language === 'ar' ? 'icon-flip' : ''} me-1.5`}
                  width={16}
                  height={16}
                />
              }
              onPress={() => setGroupBy('stage')}
            >
              {t('groupByStage')}
            </Button>
            <Button 
              className={`rounded-none border-0 px-4 h-10 ${groupBy === 'job' ? 'bg-wise-blue-50 text-wise-blue-600 font-medium' : 'bg-transparent hover:bg-default-100'}`}
              variant="light"
              startContent={
                <Icon 
                  icon="lucide:briefcase" 
                  className={`${groupBy === 'job' ? 'text-wise-blue-600' : 'text-default-500'} ${language === 'ar' ? 'icon-flip' : ''} me-1.5`}
                  width={16}
                  height={16}
                />
              }
              onPress={() => setGroupBy('job')}
            >
              {t('groupByJob')}
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            color="primary"
            className="font-medium px-4"
            startContent={
              <Icon 
                icon="lucide:user-plus" 
                className={`${language === 'ar' ? 'icon-flip' : ''} me-1`}
                width={16}
                height={16}
              />
            }
            onPress={() => setShowAddModal(true)}
          >
            {t('addCandidate')}
          </Button>
          <Button 
            color="secondary"
            variant="flat"
            className="font-medium px-4"
            startContent={
              <Icon 
                icon="lucide:linkedin" 
                className="me-1"
                width={16}
                height={16}
              />
            }
            onPress={() => setShowLinkedInModal(true)}
          >
            {t('searchLinkedIn')}
          </Button>
          <Divider orientation="vertical" className="h-8" />
          <Dropdown>
            <DropdownTrigger>
              <Button 
                color="default"
                variant="flat"
                isDisabled={selectedCandidates.length === 0}
                endContent={<Icon icon="lucide:chevron-down" />}
              >
                {t('bulkActions')} ({selectedCandidates.length})
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Bulk Actions">
              <DropdownItem 
                key="moveToStage" 
                startContent={<Icon icon="lucide:layers" />}
                description={t('bulkMoveDescription')}
              >
                {t('moveToStage')}
              </DropdownItem>
              <DropdownItem key="divider1" showDivider className="h-0 p-0" />
              
              {stageDropdownItems as unknown as any}
              
              <DropdownItem key="divider2" showDivider className="h-0 p-0" />
              
              <DropdownItem 
                key="tags" 
                startContent={<Icon icon="lucide:tag" />}
                description={t('bulkTagsDescription')}
                onPress={openTagsModal}
              >
                {t('addTags')}
              </DropdownItem>
              
              <DropdownItem 
                key="email" 
                startContent={<Icon icon="lucide:mail" />}
                description={t('bulkEmailDescription')}
                onPress={openEmailModal}
              >
                {t('sendEmail')}
              </DropdownItem>
              
              <DropdownItem 
                key="export" 
                startContent={<Icon icon="lucide:download" />}
                description={t('bulkExportDescription')}
                onPress={openExportModal}
              >
                {t('exportCandidates')}
              </DropdownItem>
              
              <DropdownItem key="divider3" showDivider className="h-0 p-0" />
              
              <DropdownItem 
                key="delete" 
                startContent={<Icon icon="lucide:trash-2" />}
                description={t('bulkDeleteDescription')}
                className="text-danger"
                color="danger"
                onPress={openDeleteModal}
              >
                {t('deleteCandidates')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex flex-1 gap-4">
        <CandidateFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
        
        <div className="flex-1">
          {view === 'kanban' ? (
            groupBy === 'stage' ? (
              <CandidateKanbanView 
                candidates={filteredCandidates} 
                selectedCandidates={selectedCandidates}
                onSelectCandidate={handleCandidateSelect}
                onViewCandidate={handleViewCandidate}
                onStageChange={handleStageChange}
              />
            ) : (
              <JobKanbanView 
                candidates={filteredCandidates} 
                selectedCandidates={selectedCandidates}
                onSelectCandidate={handleCandidateSelect}
                onViewCandidate={handleViewCandidate}
                onStageChange={handleStageChange}
                getJobTitleById={getJobTitleById}
                onLinkedInSearch={handleOpenLinkedInSearch}
              />
            )
          ) : (
            <CandidateListView 
              candidates={filteredCandidates} 
              selectedCandidates={selectedCandidates}
              onSelectCandidate={handleCandidateSelect}
              onViewCandidate={handleViewCandidate}
              onStageChange={handleStageChange}
              showJobColumn={true}
              getJobTitleById={getJobTitleById}
            />
          )}
        </div>
      </div>

      {showAddModal && (
        <AddCandidateModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)} 
          onAdd={handleAddCandidate}
          jobs={mockJobRequisitions}
        />
      )}

      {showProfileModal && currentCandidate && (
        <CandidateProfileModal 
          isOpen={showProfileModal} 
          onClose={() => {
            setShowProfileModal(false);
            setCurrentCandidate(null);
          }}
          candidate={currentCandidate}
          onEdit={handleEditCandidate}
          onDelete={handleDeleteCandidate}
        />
      )}

      {showLinkedInModal && (
        <LinkedInSearchModal 
          isOpen={showLinkedInModal} 
          onClose={() => setShowLinkedInModal(false)} 
          jobId={null}
          jobs={mockJobRequisitions}
        />
      )}

      {isEmailModalOpen && (
        <BulkEmailModal
          isOpen={isEmailModalOpen}
          onClose={closeEmailModal}
          candidateIds={selectedCandidates}
          candidates={candidates.filter(c => selectedCandidates.includes(c.id))}
        />
      )}
      
      {isTagsModalOpen && (
        <BulkTagsModal
          isOpen={isTagsModalOpen}
          onClose={closeTagsModal}
          candidateIds={selectedCandidates}
          onAddTags={handleBulkTag}
        />
      )}
      
      {isExportModalOpen && (
        <BulkExportModal
          isOpen={isExportModalOpen}
          onClose={closeExportModal}
          candidates={candidates.filter(c => selectedCandidates.includes(c.id))}
        />
      )}
      
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={() => handleBulkDelete(selectedCandidates)}
          count={selectedCandidates.length}
          itemType="candidate"
        />
      )}
    </div>
  );
};

export default CandidateTab;