import React from 'react';
import { Card, Button, Chip } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface DocumentUploadProps {
  documentType: string;
  title: string;
  description?: string;
  required?: boolean;
}

export const DocumentUpload: React.FC<DocumentUploadProps> = ({
  documentType,
  title,
  description,
  required = false,
}) => {
  const { t } = useLanguage();
  const [file, setFile] = React.useState<File | null>(null);
  const [uploaded, setUploaded] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Simulate upload
      setTimeout(() => {
        setUploaded(true);
      }, 1000);
    }
  };
  
  const handleClick = () => {
    fileInputRef.current?.click();
  };
  
  const getDocumentIcon = () => {
    switch (documentType) {
      case 'passport':
        return 'lucide:passport';
      case 'nationalId':
        return 'lucide:id-card';
      case 'certificates':
        return 'lucide:graduation-cap';
      case 'bankInfo':
        return 'lucide:credit-card';
      case 'signedOffer':
        return 'lucide:file-signature';
      default:
        return 'lucide:file-text';
    }
  };
  
  return (
    <Card className="border border-default-200">
      <div className="flex items-center p-4">
        <div className="bg-default-100 p-3 rounded-lg mr-4">
          <Icon icon={getDocumentIcon()} className="w-6 h-6 text-default-600" />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="text-md font-semibold">{title}</h3>
            {required && <Chip size="sm" color="primary">{t('required')}</Chip>}
          </div>
          {description && <p className="text-default-500 text-sm">{description}</p>}
        </div>
        <div>
          {uploaded ? (
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-1">
                <Icon icon="lucide:check-circle" className="w-4 h-4 text-success" />
                <span className="text-success text-sm">{t('uploaded')}</span>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="flat" startContent={<Icon icon="lucide:eye" className="w-4 h-4" />}>
                  {t('preview')}
                </Button>
                <Button size="sm" variant="light" color="danger" isIconOnly>
                  <Icon icon="lucide:trash" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              color="primary"
              variant="flat"
              onPress={handleClick}
              startContent={<Icon icon="lucide:upload" className="w-4 h-4" />}
            >
              {t('upload')}
            </Button>
          )}
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </div>
      </div>
    </Card>
  );
};