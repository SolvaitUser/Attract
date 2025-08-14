import React from 'react';
import { 
  Input, 
  Textarea, 
  Checkbox, 
  Radio, 
  RadioGroup, 
  Button,
  Card,
  CardBody
} from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../../context/OfferContext';
import { useLanguage } from '../../../../context/LanguageContext';

export const Step4Send: React.FC = () => {
  const { wizardState } = useOffers();
  const { t } = useLanguage();
  const { offer } = wizardState;
  
  const [selectedChannel, setSelectedChannel] = React.useState("email");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [emailSubject, setEmailSubject] = React.useState(() => {
    const jobTitle = offer.requisitionTitle || t('job_title_placeholder_fallback');
    return `${t('offer_letter_subject_prefix')} ${jobTitle}`;
  });
  const [emailBody, setEmailBody] = React.useState("");
  const [enableNegotiation, setEnableNegotiation] = React.useState(true);
  const [expiryDate, setExpiryDate] = React.useState("");
  
  React.useEffect(() => {
    const candidateName = offer.candidateName || t('candidate_name_placeholder_fallback');
    const jobTitle = offer.requisitionTitle || t('job_title_placeholder_fallback');
    const formattedExpiryDate = expiryDate || t('expiry_date_placeholder_fallback');
    const body = `${t('dear')} ${candidateName},

${t('we_are_pleased_to_offer_you').replace('{jobTitle}', jobTitle)}
${t('this_offer_will_remain_valid').replace('{expiryDate}', formattedExpiryDate)}

${t('if_you_have_any_questions')}

${t('we_look_forward_to_your_positive_response')}

${t('best_regards')}
${t('your_name')}
${t('your_position')}
${t('company_name')}`;
    setEmailBody(body);
  }, [offer.candidateName, offer.requisitionTitle, expiryDate, t]);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{t('communication_channel')}</h3>
          
          <RadioGroup
            value={selectedChannel}
            onValueChange={setSelectedChannel}
            label={t('select_communication_channel')}
          >
            <Radio value="email">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:mail" />
                <span>{t('email')}</span>
              </div>
            </Radio>
            <Radio value="whatsapp">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:message-circle" />
                <span>{t('whatsapp')}</span>
              </div>
            </Radio>
            <Radio value="sms">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:message-square" />
                <span>{t('sms')}</span>
              </div>
            </Radio>
            <Radio value="portal">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:globe" />
                <span>{t('careers_portal')}</span>
              </div>
            </Radio>
          </RadioGroup>
          
          <div className="mt-6 space-y-4">
            {selectedChannel === 'email' && (
              <>
                <Input
                  label={t('email_address')}
                  placeholder={t('enter_email_address')}
                  value={emailAddress}
                  onValueChange={setEmailAddress}
                  variant="bordered"
                  type="email"
                  startContent={
                    <Icon icon="lucide:mail" className="text-gray-400 ml-1" />
                  }
                />
                
                <Input
                  label={t('email_subject')}
                  placeholder={t('enter_subject')}
                  value={emailSubject}
                  onValueChange={setEmailSubject}
                  variant="bordered"
                />
                
                <Textarea
                  label={t('email_body')}
                  placeholder={t('enter_message')}
                  value={emailBody}
                  onValueChange={setEmailBody}
                  variant="bordered"
                  minRows={8}
                  maxRows={12}
                />
              </>
            )}
            
            {selectedChannel === 'whatsapp' && (
              <>
                <Input
                  label={t('phone_number')}
                  placeholder="+966 XX XXX XXXX"
                  value={phoneNumber}
                  onValueChange={setPhoneNumber}
                  variant="bordered"
                  startContent={
                    <Icon icon="lucide:phone" className="text-gray-400 ml-1" />
                  }
                />
                
                <Textarea
                  label={t('message')}
                  placeholder={t('enter_message')}
                  value={emailBody}
                  onValueChange={setEmailBody}
                  variant="bordered"
                  minRows={6}
                  maxRows={10}
                />
              </>
            )}
            
            {selectedChannel === 'sms' && (
              <>
                <Input
                  label={t('phone_number')}
                  placeholder="+966 XX XXX XXXX"
                  value={phoneNumber}
                  onValueChange={setPhoneNumber}
                  variant="bordered"
                  startContent={
                    <Icon icon="lucide:phone" className="text-gray-400 ml-1" />
                  }
                />
                
                <Textarea
                  label={t('message')}
                  placeholder={t('enter_message')}
                  value={emailBody}
                  onValueChange={setEmailBody}
                  variant="bordered"
                  minRows={4}
                  maxRows={6}
                />
              </>
            )}
            
            {selectedChannel === 'portal' && (
              <>
                <Input
                  label={t('email_address')}
                  placeholder={t('enter_email_address')}
                  value={emailAddress}
                  onValueChange={setEmailAddress}
                  variant="bordered"
                  type="email"
                  startContent={
                    <Icon icon="lucide:mail" className="text-gray-400 ml-1" />
                  }
                />
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm text-blue-700">
                    {t('portal_notification_description')}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">{t('offer_settings')}</h3>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-medium mb-3">{t('attachments')}</h4>
              <Card shadow="none" className="border">
                <CardBody className="p-3">
                  <div className="flex items-start gap-3">
                    <Icon icon="lucide:file-text" className="text-blue-500 w-10 h-10" />
                    <div>
                      <h5 className="font-medium">{t('offer_letter_en_ar')}</h5>
                      <p className="text-sm text-gray-500">
                        {t('bilingual_pdf_description')}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <Checkbox isSelected={true} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">{t('expiration')}</h4>
              <Input
                type="date"
                label={t('offer_expiry_date')}
                value={expiryDate}
                onValueChange={setExpiryDate}
                variant="bordered"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">{t('candidate_feedback')}</h4>
              <div className="space-y-3">
                <Checkbox 
                  isSelected={enableNegotiation}
                  onValueChange={setEnableNegotiation}
                >
                  {t('allow_candidate_negotiation')}
                </Checkbox>
                
                {enableNegotiation && (
                  <div className="p-4 ml-6 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-sm text-gray-700 mb-2">
                      {t('negotiation_options')}:
                    </p>
                    <div className="space-y-2">
                      <Checkbox defaultSelected>{t('salary')}</Checkbox>
                      <Checkbox defaultSelected>{t('start_date')}</Checkbox>
                      <Checkbox>{t('benefits')}</Checkbox>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-3">{t('ai_communication')}</h4>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex gap-3">
                  <div>
                    <Icon icon="lucide:sparkles" className="text-blue-500 w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-700 mb-1">{t('ai_communication_analysis')}</h5>
                    <p className="text-sm text-blue-600">
                      {t('ai_communication_suggestion')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg border border-green-100">
        <div className="flex gap-3">
          <div className="p-2 bg-green-100 rounded-full">
            <Icon icon="lucide:check" className="text-green-500 w-5 h-5" />
          </div>
          <div>
            <h4 className="font-medium text-green-700 mb-1">{t('ready_to_send')}</h4>
            <p className="text-sm text-green-600">
              {t('ready_to_send_description')}
            </p>
          </div>
          
          <Button 
            color="success" 
            className="ml-auto"
            endContent={<Icon icon="lucide:send" />}
          >
            {t('send_offer')}
          </Button>
        </div>
      </div>
    </div>
  );
};