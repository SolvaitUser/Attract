import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../context/OfferContext';
import { useLanguage } from '../../../context/LanguageContext';
import { Offer, OfferStatus } from '../../../types/offer';

export const OffersList: React.FC = () => {
  const { offers, selectOffer, editOffer, deleteOffer, duplicateOffer } = useOffers();
  const { t, direction } = useLanguage();
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 10;
  
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    
    return offers.slice(start, end);
  }, [page, offers]);
  
  const handleDelete = async (id: string) => {
    if (window.confirm(t('confirm_delete_offer'))) {
      await deleteOffer(id);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="bg-white rounded-lg border">
      <Table 
        aria-label={t('offers_table')}
        removeWrapper
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={Math.ceil(offers.length / rowsPerPage)}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>{t('offer_id')}</TableColumn>
          <TableColumn>{t('candidate')}</TableColumn>
          <TableColumn>{t('job_title')}</TableColumn>
          <TableColumn>{t('status')}</TableColumn>
          <TableColumn>{t('created_date')}</TableColumn>
          <TableColumn>{t('updated_date')}</TableColumn>
          <TableColumn align="center">{t('actions')}</TableColumn>
        </TableHeader>
        <TableBody emptyContent={t('no_offers_found')}>
          {items.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell>{offer.id}</TableCell>
              <TableCell>{offer.candidateName}</TableCell>
              <TableCell>{offer.requisitionTitle}</TableCell>
              <TableCell>
                <StatusChip status={offer.status} />
              </TableCell>
              <TableCell>{formatDate(offer.createdAt)}</TableCell>
              <TableCell>{formatDate(offer.updatedAt)}</TableCell>
              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button 
                    isIconOnly
                    size="sm" 
                    variant="light"
                    onPress={() => selectOffer(offer.id)}
                    aria-label={t('view_details')}
                  >
                    <Icon icon="lucide:eye" className="text-gray-500" />
                  </Button>
                  
                  {offer.status === OfferStatus.Draft && (
                    <Button 
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => editOffer(offer.id)}
                      aria-label={t('edit')}
                    >
                      <Icon icon="lucide:edit" className="text-primary-500" />
                    </Button>
                  )}
                  
                  <Dropdown>
                    <DropdownTrigger>
                      <Button 
                        isIconOnly
                        size="sm"
                        variant="light"
                        aria-label={t('more_actions')}
                      >
                        <Icon icon="lucide:more-vertical" className="text-default-500" />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label={t('actions')}>
                      <DropdownItem 
                        key="duplicate" 
                        startContent={<Icon icon="lucide:copy" />}
                        onPress={() => duplicateOffer(offer.id)}
                      >
                        {t('duplicate')}
                      </DropdownItem>
                      
                      {offer.status === OfferStatus.Draft && (
                        <DropdownItem 
                          key="delete" 
                          className="text-danger"
                          color="danger"
                          startContent={<Icon icon="lucide:trash-2" />}
                          onPress={() => handleDelete(offer.id)}
                        >
                          {t('delete')}
                        </DropdownItem>
                      )}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

interface StatusChipProps {
  status: OfferStatus;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const { t } = useLanguage();
  
  const getChipProps = () => {
    switch (status) {
      case OfferStatus.Draft:
        return { color: 'default', variant: 'flat' };
      case OfferStatus.PendingApproval:
        return { color: 'warning', variant: 'flat' };
      case OfferStatus.Approved:
        return { color: 'success', variant: 'flat' };
      case OfferStatus.Rejected:
        return { color: 'danger', variant: 'flat' };
      case OfferStatus.Sent:
        return { color: 'primary', variant: 'flat' };
      case OfferStatus.Signed:
        return { color: 'success', variant: 'solid' };
      case OfferStatus.Declined:
        return { color: 'danger', variant: 'solid' };
      case OfferStatus.Expired:
        return { color: 'default', variant: 'solid' };
      default:
        return { color: 'default', variant: 'flat' };
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case OfferStatus.Draft:
        return t('draft');
      case OfferStatus.PendingApproval:
        return t('pending_approval');
      case OfferStatus.Approved:
        return t('approved');
      case OfferStatus.Rejected:
        return t('rejected');
      case OfferStatus.Sent:
        return t('sent');
      case OfferStatus.Signed:
        return t('signed');
      case OfferStatus.Declined:
        return t('declined');
      case OfferStatus.Expired:
        return t('expired');
      default:
        return status;
    }
  };
  
  const { color, variant } = getChipProps();
  
  return (
    <Chip
      color={color as any}
      variant={variant as any}
      size="sm"
    >
      {getStatusText()}
    </Chip>
  );
};