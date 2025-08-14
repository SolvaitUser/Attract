import React from 'react';
import { 
  Button, 
  Select, 
  SelectItem, 
  Radio, 
  RadioGroup,
  Card,
  CardBody,
  Divider,
  Input,
  Textarea,
  Checkbox
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../../context/OfferContext';
import { useLanguage } from '../../../../context/LanguageContext';

export const Step5Signature: React.FC = () => {
  const { wizardState, updateWizardData } = useOffers();
  const { t } = useLanguage();
  const { offer } = wizardState;
  
  const [signatureMethod, setSignatureMethod] = React.useState(offer.signatureMethod || "docusign");
  
  const [docusignRecipients, setDocusignRecipients] = React.useState([
    { email: '', name: '', role: 'signer' }
  ]);
  const [docusignMessage, setDocusignMessage] = React.useState('');
  const [docusignAuthStatus, setDocusignAuthStatus] = React.useState('connected'); // 'connected' | 'disconnected'
  const [docusignExpiryDays, setDocusignExpiryDays] = React.useState('14');
  const [docusignReminderFrequency, setDocusignReminderFrequency] = React.useState('3days');
  const [docusignWatermark, setDocusignWatermark] = React.useState(true);
  const [docusignLanguage, setDocusignLanguage] = React.useState('recipient');
  
  const handleSignatureMethodChange = (value: string) => {
    setSignatureMethod(value as "docusign" | "adobesign" | "manual");
    updateWizardData({ signatureMethod: value as "docusign" | "adobesign" | "manual" });
  };
  
  const addRecipient = () => {
    setDocusignRecipients([...docusignRecipients, { email: '', name: '', role: 'signer' }]);
  };
  
  const removeRecipient = (index: number) => {
    const newRecipients = [...docusignRecipients];
    newRecipients.splice(index, 1);
    setDocusignRecipients(newRecipients);
  };
  
  const updateRecipient = (index: number, field: string, value: string) => {
    const newRecipients = [...docusignRecipients];
    newRecipients[index] = { ...newRecipients[index], [field]: value };
    setDocusignRecipients(newRecipients);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">{t('signature_method')}</h3>
        
        <RadioGroup
          value={signatureMethod}
          onValueChange={handleSignatureMethodChange}
          orientation="horizontal"
          className="gap-6"
        >
          <Radio value="docusign">
            <div className="flex flex-col items-center text-center gap-2 p-2">
              <Icon icon="logos:docusign" className="w-12 h-12" />
              <span className="font-medium">DocuSign</span>
              <span className="text-xs text-gray-500">{t('docusign_description')}</span>
            </div>
          </Radio>
          <Radio value="adobesign">
            <div className="flex flex-col items-center text-center gap-2 p-2">
              <Icon icon="logos:adobe" className="w-12 h-12" />
              <span className="font-medium">Adobe Sign</span>
              <span className="text-xs text-gray-500">{t('adobesign_description')}</span>
            </div>
          </Radio>
          <Radio value="manual">
            <div className="flex flex-col items-center text-center gap-2 p-2">
              <Icon icon="lucide:pen-square" className="w-12 h-12 text-gray-600" />
              <span className="font-medium">{t('manual_upload')}</span>
              <span className="text-xs text-gray-500">{t('manual_upload_description')}</span>
            </div>
          </Radio>
        </RadioGroup>
      </div>
      
      <Divider />
      
      {signatureMethod === 'docusign' && (
        <div className="space-y-6">
          <h4 className="font-medium">{t('docusign_configuration')}</h4>
          
          <div className={`flex items-start p-4 rounded-lg border ${
            docusignAuthStatus === 'connected' ? 'bg-green-50 border-green-100' : 'bg-yellow-50 border-yellow-100'
          }`}>
            {docusignAuthStatus === 'connected' ? (
              <>
                <div className="p-2 bg-green-100 rounded-full">
                  <Icon icon="lucide:check-circle" className="text-green-600 w-5 h-5" />
                </div>
                <div className="mx-3 flex-1">
                  <h5 className="font-medium text-green-700">{t('docusign_account_connected')}</h5>
                  <p className="text-sm text-green-600">{t('docusign_account_email')}: hr@company.com</p>
                </div>
                <Button size="sm" variant="light" color="default">
                  {t('change_account')}
                </Button>
              </>
            ) : (
              <>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <Icon icon="lucide:alert-circle" className="text-yellow-600 w-5 h-5" />
                </div>
                <div className="mx-3 flex-1">
                  <h5 className="font-medium text-yellow-700">{t('docusign_account_not_connected')}</h5>
                  <p className="text-sm text-yellow-600">{t('docusign_connect_account_instruction')}</p>
                </div>
                <Button size="sm" variant="solid" color="primary">
                  {t('connect_docusign')}
                </Button>
              </>
            )}
          </div>
          
          <div className="border rounded-lg p-6 space-y-6 bg-gray-50">
            <div>
              <h5 className="font-medium mb-4">{t('docusign_recipients')}</h5>
              
              {docusignRecipients.map((recipient, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-white rounded-md border">
                  <Input
                    label={t('recipient_name')}
                    placeholder=""
                    value={recipient.name}
                    onValueChange={(value) => updateRecipient(index, 'name', value)}
                    variant="bordered"
                  />
                  
                  <Input
                    label={t('recipient_email')}
                    placeholder=""
                    value={recipient.email}
                    onValueChange={(value) => updateRecipient(index, 'email', value)}
                    variant="bordered"
                    type="email"
                  />
                  
                  <div className="flex items-end">
                    <Select
                      label={t('recipient_role')}
                      selectedKeys={[recipient.role]}
                      onSelectionChange={(keys) => {
                        const role = Array.from(keys)[0] as string;
                        updateRecipient(index, 'role', role);
                      }}
                      className="flex-1"
                      variant="bordered"
                    >
                      <SelectItem key="signer">{t('signer')}</SelectItem>
                      <SelectItem key="cc">{t('carbon_copy')}</SelectItem>
                    </Select>
                    
                    {docusignRecipients.length > 1 && (
                      <Button
                        isIconOnly
                        variant="light"
                        color="danger"
                        className="ml-2"
                        onPress={() => removeRecipient(index)}
                      >
                        <Icon icon="lucide:trash-2" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              <Button
                variant="flat"
                startContent={<Icon icon="lucide:plus" />}
                onPress={addRecipient}
                className="mt-2"
              >
                {t('add_recipient')}
              </Button>
            </div>
            
            <Divider />
            
            <div>
              <h5 className="font-medium mb-4">{t('docusign_document_settings')}</h5>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Select
                    label={t('document_language')}
                    selectedKeys={[docusignLanguage]}
                    onSelectionChange={(keys) => {
                      const lang = Array.from(keys)[0] as string;
                      setDocusignLanguage(lang);
                    }}
                    variant="bordered"
                  >
                    <SelectItem key="recipient">{t('match_recipient_language')}</SelectItem>
                    <SelectItem key="en">{t('english')}</SelectItem>
                    <SelectItem key="ar">{t('arabic')}</SelectItem>
                    <SelectItem key="both">{t('bilingual')}</SelectItem>
                  </Select>
                  
                  <Select
                    label={t('expiration_period')}
                    selectedKeys={[docusignExpiryDays]}
                    onSelectionChange={(keys) => {
                      const days = Array.from(keys)[0] as string;
                      setDocusignExpiryDays(days);
                    }}
                    variant="bordered"
                  >
                    <SelectItem key="7">{t('7_days')}</SelectItem>
                    <SelectItem key="14">{t('14_days')}</SelectItem>
                    <SelectItem key="30">{t('30_days')}</SelectItem>
                    <SelectItem key="60">{t('60_days')}</SelectItem>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <Select
                    label={t('reminder_frequency')}
                    selectedKeys={[docusignReminderFrequency]}
                    onSelectionChange={(keys) => {
                      const freq = Array.from(keys)[0] as string;
                      setDocusignReminderFrequency(freq);
                    }}
                    variant="bordered"
                  >
                    <SelectItem key="1day">{t('daily')}</SelectItem>
                    <SelectItem key="3days">{t('every_3_days')}</SelectItem>
                    <SelectItem key="weekly">{t('weekly')}</SelectItem>
                    <SelectItem key="none">{t('no_reminders')}</SelectItem>
                  </Select>
                  
                  <div className="flex items-center pt-4">
                    <Checkbox 
                      isSelected={docusignWatermark}
                      onValueChange={setDocusignWatermark}
                    >
                      {t('include_watermark')}
                    </Checkbox>
                  </div>
                </div>
              </div>
            </div>
            
            <Divider />
            
            <div>
              <h5 className="font-medium mb-4">{t('email_notification')}</h5>
              
              <Textarea
                label={t('email_message')}
                value={docusignMessage}
                onValueChange={setDocusignMessage}
                minRows={3}
                variant="bordered"
                className="w-full"
              />
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="flat"
                startContent={<Icon icon="lucide:eye" />}
              >
                {t('preview_documents')}
              </Button>
              
              <Button
                color="primary"
                className="px-8"
                startContent={<Icon icon="logos:docusign" className="w-5 h-5" />}
                endContent={<Icon icon="lucide:send" />}
              >
                {t('send_via_docusign')}
              </Button>
            </div>
          </div>
          
          <Card className="mt-4">
            <CardBody className="p-4">
              <div className="flex items-start">
                <Icon icon="lucide:info" className="text-blue-500 mt-0.5" />
                <div className="ml-3">
                  <h5 className="text-sm font-medium">{t('docusign_integration_info')}</h5>
                  <p className="text-xs text-gray-600 mt-1">
                    {t('docusign_integration_details')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}
      
      {signatureMethod === 'adobesign' && (
        <div className="space-y-4">
          <h4 className="font-medium">{t('adobesign_configuration')}</h4>
          
          <p className="text-sm text-gray-600 mb-4">
            {t('adobesign_instructions')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label={t('signature_flow')}
              placeholder={t('select_flow')}
              variant="bordered"
              selectedKeys={["sequential"]}
            >
              <SelectItem key="sequential">{t('sequential_signing')}</SelectItem>
              <SelectItem key="parallel">{t('parallel_signing')}</SelectItem>
            </Select>
            
            <Select
              label={t('expiration')}
              placeholder={t('select_expiration')}
              variant="bordered"
              selectedKeys={["14days"]}
            >
              <SelectItem key="7days">{t('7_days')}</SelectItem>
              <SelectItem key="14days">{t('14_days')}</SelectItem>
              <SelectItem key="30days">{t('30_days')}</SelectItem>
            </Select>
          </div>
          
          <Button
            color="primary"
            className="mt-2"
            endContent={<Icon icon="lucide:check" />}
          >
            {t('send_for_signature')}
          </Button>
        </div>
      )}
      
      {signatureMethod === 'manual' && (
        <div className="space-y-6">
          <h4 className="font-medium">{t('manual_signature_process')}</h4>
          
          <p className="text-sm text-gray-600 mb-4">
            {t('manual_signature_instructions')}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card shadow="none" className="border">
              <CardBody className="p-4">
                <div className="text-center p-6">
                  <Icon icon="lucide:download" className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h5 className="font-medium mb-2">{t('download_offer_letter')}</h5>
                  <p className="text-sm text-gray-500 mb-4">
                    {t('download_print_sign_instructions')}
                  </p>
                  <Button
                    color="primary"
                    variant="light"
                    endContent={<Icon icon="lucide:file-text" />}
                  >
                    {t('download_pdf')}
                  </Button>
                </div>
              </CardBody>
            </Card>
            
            <Card shadow="none" className="border">
              <CardBody className="p-4">
                <div className="text-center p-6">
                  <Icon icon="lucide:upload" className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h5 className="font-medium mb-2">{t('upload_signed_document')}</h5>
                  <p className="text-sm text-gray-500 mb-4">
                    {t('upload_instructions')}
                  </p>
                  <Button
                    color="primary"
                    endContent={<Icon icon="lucide:upload" />}
                  >
                    {t('upload_signed_file')}
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 p-6 rounded-lg border mt-6">
        <h4 className="font-medium mb-3">{t('signature_status_tracking')}</h4>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('status')}</span>
            <span className="font-medium text-yellow-600">{t('pending')}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('sent_date')}</span>
            <span className="font-medium">-</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('signed_date')}</span>
            <span className="font-medium">-</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{t('documents')}</span>
            <Button
              size="sm"
              variant="light"
              isDisabled
              endContent={<Icon icon="lucide:paperclip" />}
            >
              {t('view_documents')}
            </Button>
          </div>
        </div>
        
        <Divider className="my-4" />
        
        <p className="text-sm text-gray-500">
          {t('signature_status_will_update')}
        </p>
      </div>
    </div>
  );
};