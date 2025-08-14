import React from 'react';
import { Card, CardBody, Checkbox, Button, Tooltip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../../contexts/LanguageContext';

export const DocumentRequirements: React.FC = () => {
  const { t } = useLanguage();
  
  const documentTypes = [
    {
      id: 'passport',
      name: t('document_passport'),
      required: true,
      defaultForAll: true,
      appliesTo: 'all',
    },
    {
      id: 'nationalId',
      name: t('document_nationalId'),
      required: true,
      defaultForAll: true,
      appliesTo: 'all',
    },
    {
      id: 'certificates',
      name: t('document_certificates'),
      required: true,
      defaultForAll: true,
      appliesTo: 'all',
    },
    {
      id: 'bankInfo',
      name: t('document_bankInfo'),
      required: true,
      defaultForAll: true,
      appliesTo: 'all',
    },
    {
      id: 'signedOffer',
      name: t('document_signedOffer'),
      required: true,
      defaultForAll: true,
      appliesTo: 'all',
    },
    {
      id: 'workPermit',
      name: t('documentWorkPermit'),
      required: true,
      defaultForAll: false,
      appliesTo: 'expats',
    },
    {
      id: 'employmentContract',
      name: t('employmentContract'),
      required: true,
      defaultForAll: true,
      appliesTo: 'all',
    },
    {
      id: 'medicalInsurance',
      name: t('medicalInsurance'),
      required: false,
      defaultForAll: false,
      appliesTo: 'all',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button 
          size="sm" 
          color="primary" 
          variant="flat" 
          startContent={<Icon icon="lucide:plus" />}
        >
          {t('addDocumentType')}
        </Button>
      </div>
      
      <Card className="bg-default-50">
        <CardBody className="p-0">
          <table className="min-w-full">
            <thead>
              <tr className="bg-default-100">
                <th className="py-3 px-4 text-left text-xs font-medium text-default-600 uppercase tracking-wider">
                  {t('documentType')}
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-default-600 uppercase tracking-wider">
                  {t('required')}
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-default-600 uppercase tracking-wider">
                  {t('defaultForAll')}
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-default-600 uppercase tracking-wider">
                  {t('appliesTo')}
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-default-600 uppercase tracking-wider">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {documentTypes.map((doc) => (
                <tr key={doc.id} className="border-t border-default-200">
                  <td className="py-3 px-4 text-sm text-default-900">{doc.name}</td>
                  <td className="py-3 px-4">
                    <Checkbox defaultSelected={doc.required} />
                  </td>
                  <td className="py-3 px-4">
                    <Checkbox defaultSelected={doc.defaultForAll} />
                  </td>
                  <td className="py-3 px-4 text-sm text-default-900">
                    {doc.appliesTo === 'all' ? t('allEmployees') : t('expatsOnly')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex justify-end gap-1">
                      <Tooltip content={t('edit')}>
                        <Button isIconOnly size="sm" variant="flat">
                          <Icon icon="lucide:pencil" className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                      <Tooltip content={t('delete')}>
                        <Button isIconOnly size="sm" variant="flat" color="danger">
                          <Icon icon="lucide:trash" className="w-4 h-4" />
                        </Button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
      
      <div className="flex items-start gap-3 text-sm text-default-600 p-2">
        <Icon icon="lucide:info" className="shrink-0 mt-1" />
        <p>{t('documentRequirementsNote')}</p>
      </div>
    </div>
  );
};