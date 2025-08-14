import React, { useState } from 'react';
import { 
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, 
  Checkbox, Tooltip, Button, Progress, Avatar, Dropdown, DropdownTrigger, 
  DropdownMenu, DropdownItem, Badge 
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Candidate } from '../../types/candidate';
import { stages } from '../../data/mockCandidateData';

interface CandidateListViewProps {
  candidates: Candidate[];
  selectedCandidates: string[];
  onSelectCandidate: (id: string, selected: boolean) => void;
  onViewCandidate: (candidate: Candidate) => void;
  onStageChange: (candidateId: string, stage: Candidate['stage']) => void;
  showJobColumn?: boolean;
  getJobTitleById?: (jobId: string) => string;
}

type SortKey = 'name' | 'aiScore' | 'stage' | 'dateAdded' | 'jobTitle';

const CandidateListView: React.FC<CandidateListViewProps> = ({ 
  candidates, 
  selectedCandidates, 
  onSelectCandidate, 
  onViewCandidate,
  onStageChange,
  showJobColumn = false,
  getJobTitleById = (id) => id
}) => {
  const { t, language } = useLanguage();
  const [sortKey, setSortKey] = useState<SortKey>('dateAdded');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      onSelectCandidate(
        candidates.map(c => c.id).join(','),
        true
      );
    } else {
      onSelectCandidate('', false);
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const getSortedCandidates = () => {
    return [...candidates].sort((a, b) => {
      let comparison = 0;
      
      switch (sortKey) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'aiScore':
          comparison = a.aiScore - b.aiScore;
          break;
        case 'stage':
          comparison = a.stage.localeCompare(b.stage);
          break;
        case 'dateAdded':
          comparison = new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
          break;
        case 'jobTitle':
          comparison = a.jobRequisitionId.localeCompare(b.jobRequisitionId);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };

  const getStageColor = (stage: Candidate['stage']) => {
    switch (stage) {
      case 'new': return 'primary';
      case 'shortlisted': return 'secondary';
      case 'interviewed': return 'warning';
      case 'offered': return 'success';
      case 'hired': return 'success';
      case 'rejected': return 'danger';
      default: return 'default';
    }
  };

  const getSourceIcon = (source: Candidate['source']) => {
    switch (source) {
      case 'linkedin': return 'lucide:linkedin';
      case 'portal': return 'lucide:globe';
      case 'referral': return 'lucide:users';
      default: return 'lucide:file';
    }
  };

  return (
    <Table
      removeWrapper
      selectionMode="multiple"
      selectedKeys={selectedCandidates}
      onSelectionChange={(keys) => {
        if (typeof keys === 'string') return;
        const selectedSet = keys as Set<string>;
        selectedSet.forEach(id => onSelectCandidate(id, true));
        selectedCandidates.forEach(id => {
          if (!selectedSet.has(id)) {
            onSelectCandidate(id, false);
          }
        });
      }}
      shadow="none"
      className="border border-default-200 rounded-lg"
      aria-label="Candidates table"
    >
      <TableHeader>
        <TableColumn>
          <span className="text-sm font-medium">{t('name')}</span>
        </TableColumn>
        
        {showJobColumn && (
          <TableColumn>
            <span className="text-sm font-medium">{t('jobRequisition')}</span>
          </TableColumn>
        )}
        
        <TableColumn>
          <div className="flex items-center cursor-pointer gap-1" onClick={() => handleSort('aiScore')}>
            <span className="text-sm font-medium">{t('aiScore')}</span>
            <Icon 
              icon={sortKey === 'aiScore' 
                ? (sortDirection === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down')
                : 'lucide:chevron-down'} 
              className="text-default-400" 
              width={14}
              height={14}
            />
          </div>
        </TableColumn>
        
        <TableColumn>
          <div className="flex items-center cursor-pointer" onClick={() => handleSort('source')}>
            {t('source')}
            <Icon 
              icon={sortKey === 'source' 
                ? (sortDirection === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down')
                : 'lucide:chevron-down'} 
              className="ms-1 text-default-400" 
            />
          </div>
        </TableColumn>
        
        <TableColumn>
          <div className="flex items-center cursor-pointer" onClick={() => handleSort('stage')}>
            {t('stage')}
            <Icon 
              icon={sortKey === 'stage' 
                ? (sortDirection === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down')
                : 'lucide:chevron-down'} 
              className="ms-1 text-default-400" 
            />
          </div>
        </TableColumn>
        
        <TableColumn>
          <div className="flex items-center cursor-pointer" onClick={() => handleSort('dateAdded')}>
            {t('dateAdded')}
            <Icon 
              icon={sortKey === 'dateAdded' 
                ? (sortDirection === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down')
                : 'lucide:chevron-down'} 
              className="ms-1 text-default-400" 
            />
          </div>
        </TableColumn>
        
        <TableColumn>{t('actions')}</TableColumn>
      </TableHeader>
      <TableBody emptyContent={t('noCandidate')}>
        {getSortedCandidates().map((candidate) => (
          <TableRow key={candidate.id}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar 
                  src={candidate.photoUrl} 
                  name={candidate.name} 
                  size="sm" 
                />
                <div>
                  <p className="font-medium">{candidate.name}</p>
                  <p className="text-xs text-default-500">{candidate.email}</p>
                </div>
              </div>
            </TableCell>
            {showJobColumn && (
              <TableCell>
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:briefcase" className="text-default-400" />
                  <span>{getJobTitleById(candidate.jobRequisitionId)}</span>
                </div>
              </TableCell>
            )}
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress 
                  value={candidate.aiScore} 
                  color={candidate.aiScore > 85 ? "success" : candidate.aiScore > 70 ? "primary" : "default"} 
                  size="sm"
                  className="w-24" 
                />
                <span className="text-sm font-medium">{candidate.aiScore}%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Tooltip content={t(candidate.source)}>
                  <div className="bg-default-100 p-1.5 rounded-full">
                    <Icon icon={getSourceIcon(candidate.source)} className="text-default-600" />
                  </div>
                </Tooltip>
                {candidate.source === 'referral' && candidate.referrer && (
                  <Tooltip content={t('referredBy') + ': ' + candidate.referrer}>
                    <span className="text-xs text-default-500">({candidate.referrer.split(' ')[0]})</span>
                  </Tooltip>
                )}
              </div>
            </TableCell>
            <TableCell>
              <Badge color={getStageColor(candidate.stage)} variant="flat">
                {t(candidate.stage)}
              </Badge>
            </TableCell>
            <TableCell>
              {new Date(candidate.dateAdded).toLocaleDateString(
                language === 'ar' ? 'ar-AE' : 'en-US',
                { day: 'numeric', month: 'short', year: 'numeric' }
              )}
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <Button 
                  isIconOnly 
                  size="sm" 
                  variant="light" 
                  onPress={() => onViewCandidate(candidate)}
                >
                  <Icon icon="lucide:eye" />
                </Button>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light"
                    >
                      <Icon icon="lucide:more-vertical" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Candidate Actions">
                    <DropdownItem key="move" textValue="Move to Stage">
                      <div className="text-sm font-medium">{t('moveToStage')}</div>
                    </DropdownItem>
                    <DropdownItem key="divider" showDivider className="p-0"></DropdownItem>
                    {stages.map(stage => (
                      <DropdownItem 
                        key={stage} 
                        textValue={t(stage)}
                        startContent={
                          <Icon 
                            icon={stage === candidate.stage ? "lucide:check" : "lucide:circle"} 
                            className={`${stage === candidate.stage ? "text-primary" : "text-default-400"}`} 
                          />
                        }
                        onPress={() => onStageChange(candidate.id, stage as Candidate['stage'])}
                      >
                        {t(stage)}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CandidateListView;