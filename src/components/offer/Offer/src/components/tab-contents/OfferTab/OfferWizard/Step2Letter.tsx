import React from 'react';
import { Tabs, Tab, Card, CardBody, Textarea, Button } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../../context/OfferContext';
import { useLanguage } from '../../../../context/LanguageContext';

export const Step2Letter: React.FC = () => {
  const { wizardState, updateWizardData } = useOffers();
  const { t, direction } = useLanguage();
  const { offer } = wizardState;
  
  const [selectedKey, setSelectedKey] = React.useState("en");
  
  // Generate sample templates for preview
  React.useEffect(() => {
    if (!offer.offerLetterEn) {
      const englishTemplate = generateEnglishTemplate(offer);
      updateWizardData({ offerLetterEn: englishTemplate });
    }
    
    if (!offer.offerLetterAr) {
      const arabicTemplate = generateArabicTemplate(offer);
      updateWizardData({ offerLetterAr: arabicTemplate });
    }
  }, []);
  
  const handleEnglishTemplateChange = (value: string) => {
    updateWizardData({ offerLetterEn: value });
  };
  
  const handleArabicTemplateChange = (value: string) => {
    updateWizardData({ offerLetterAr: value });
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="flex items-start">
          <Icon icon="lucide:info" className="text-blue-500 w-5 h-5 mt-0.5" />
          <div className="mx-3">
            <p className="text-sm text-blue-700">
              {t('offer_letter_instructions')}
            </p>
          </div>
        </div>
      </div>
      
      <Tabs 
        aria-label="Offer Letter Languages" 
        selectedKey={selectedKey} 
        onSelectionChange={setSelectedKey as any}
        variant="underlined"
        color="primary"
        className="w-full"
      >
        <Tab key="en" title={t('english_version')}>
          <Card shadow="none" className="border">
            <CardBody className="p-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">{t('english_offer_letter_template')}</h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="flat"
                    color="primary"
                    startContent={<Icon icon="lucide:sparkles" />}
                  >
                    {t('ai_improve_letter')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="flat"
                    startContent={<Icon icon="lucide:refresh-cw" />}
                  >
                    {t('reset_template')}
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={offer.offerLetterEn || ''}
                onValueChange={handleEnglishTemplateChange}
                minRows={15}
                maxRows={30}
                variant="bordered"
                className="w-full"
              />
              
              <div className="flex justify-between mt-4">
                <div>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Icon icon="lucide:check-circle" />
                    <span>{t('template_valid')}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  color="primary"
                  variant="light"
                  endContent={<Icon icon="lucide:external-link" />}
                >
                  {t('preview_pdf')}
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
        
        <Tab key="ar" title={t('arabic_version')}>
          <Card shadow="none" className="border">
            <CardBody className="p-4">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-medium">{t('arabic_offer_letter_template')}</h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="flat"
                    color="primary"
                    startContent={<Icon icon="lucide:sparkles" />}
                  >
                    {t('ai_improve_letter')}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="flat"
                    startContent={<Icon icon="lucide:refresh-cw" />}
                  >
                    {t('reset_template')}
                  </Button>
                </div>
              </div>
              
              <Textarea
                value={offer.offerLetterAr || ''}
                onValueChange={handleArabicTemplateChange}
                minRows={15}
                maxRows={30}
                variant="bordered"
                className="w-full text-right"
              />
              
              <div className="flex justify-between mt-4">
                <div>
                  <div className="flex items-center gap-2 text-green-600 text-sm">
                    <Icon icon="lucide:check-circle" />
                    <span>{t('template_valid')}</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  color="primary"
                  variant="light"
                  endContent={<Icon icon="lucide:external-link" />}
                >
                  {t('preview_pdf')}
                </Button>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};

// Helper functions to generate sample templates
function generateEnglishTemplate(offer: any): string {
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  return `[Company Letterhead]

Date: ${date}

Dear ${offer.candidateName || '[Candidate Name]'},

Subject: Offer of Employment

We are pleased to offer you the position of ${offer.requisitionTitle || '[Job Title]'} at [Company Name], based in [Location], Saudi Arabia. This offer is subject to the terms and conditions outlined below:

1. Position and Department
   Position: ${offer.requisitionTitle || '[Job Title]'}
   Department: ${offer.department || '[Department]'}
   Grade: ${offer.grade || '[Grade]'}
   Reporting to: [Manager Name and Title]

2. Compensation
   Base Salary: SAR ${offer.compensation?.baseSalary || '[Amount]'} per month
   Housing Allowance: SAR ${offer.compensation?.housing || '[Amount]'} per month
   Transportation Allowance: SAR ${offer.compensation?.transportation || '[Amount]'} per month
   Other Allowances: SAR ${offer.compensation?.otherAllowances || '[Amount]'} per month
   Total Monthly Compensation: SAR ${calculateTotal(offer.compensation) || '[Total Amount]'}

3. Working Hours
   ${offer.workingHours || 'Sunday to Thursday, 8:00 AM to 5:00 PM, with a one-hour lunch break.'}

4. Employment Type
   This is a ${offer.contractType || '[permanent/temporary/contract]'} position.

5. Probation Period
   You will be subject to a probation period of ${offer.probationPeriod || '3'} months from your joining date.

6. Benefits
   • Medical insurance for you and eligible dependents as per company policy
   • Annual leave of [Number] working days per year
   • End of service benefits as per Saudi Labor Law
   • GOSI (General Organization for Social Insurance) registration

7. Iqama and Work Permit
   The company will sponsor your work permit and Iqama (residence permit) in accordance with Saudi regulations.

8. Start Date
   Your anticipated start date is [Start Date], subject to completing all required documentation and approvals.

9. Confidentiality
   As an employee, you will have access to confidential information. You are expected to maintain the confidentiality of this information during and after your employment.

10. Saudi Labor Law Compliance
    This offer is in compliance with the Saudi Labor Law and its amendments. Any matters not specifically addressed in this letter will be governed by the Saudi Labor Law.

To accept this offer, please sign and return this letter by [Response Deadline].

We look forward to welcoming you to our team.

Sincerely,

[HR Manager Name]
[Title]
[Company Name]

I have read, understood, and accept the terms and conditions of this offer:

___________________________
${offer.candidateName || '[Candidate Name]'}

Date: _____________________`;
}

function generateArabicTemplate(offer: any): string {
  // This is a simplified Arabic template
  return `[شعار الشركة]

التاريخ: [التاريخ]

عزيزي/عزيزتي ${offer.candidateName || '[اسم المرشح]'}،

الموضوع: عرض عمل

يسرنا أن نقدم لك عرض العمل لشغل وظيفة ${offer.requisitionTitle || '[المسمى الوظيفي]'} في [اسم الشركة]، ومقرها في [الموقع]، المملكة العربية السعودية. يخضع هذا العرض للشروط والأحكام الموضحة أدناه:

١. الوظيفة والقسم
   الوظيفة: ${offer.requisitionTitle || '[المسمى الوظيفي]'}
   القسم: ${offer.department || '[القسم]'}
   الدرجة: ${offer.grade || '[الدرجة]'}
   تقديم التقارير إلى: [اسم ومنصب المدير]

٢. التعويض
   الراتب الأساسي: ${offer.compensation?.baseSalary || '[المبلغ]'} ريال سعودي شهرياً
   بدل سكن: ${offer.compensation?.housing || '[المبلغ]'} ريال سعودي شهرياً
   بدل نقل: ${offer.compensation?.transportation || '[المبلغ]'} ريال سعودي شهرياً
   بدلات أخرى: ${offer.compensation?.otherAllowances || '[المبلغ]'} ريال سعودي شهرياً
   إجمالي التعويض الشهري: ${calculateTotal(offer.compensation) || '[إجمالي المبلغ]'} ريال سعودي

٣. ساعات العمل
   ${offer.workingHours || 'من الأحد إلى الخميس، من الساعة 8:00 صباحاً إلى 5:00 مساءً، مع استراحة غداء لمدة ساعة واحدة.'}

٤. نوع العمل
   هذه وظيفة ${offer.contractType === 'permanent' ? 'دائمة' : offer.contractType === 'temporary' ? 'مؤقتة' : 'تعاقدية' || '[دائمة/مؤقتة/تعاقدية]'}.

٥. فترة التجربة
   ستخضع لفترة تجربة مدتها ${offer.probationPeriod || '3'} أشهر من تاريخ التحاقك بالعمل.

٦. المزايا
   • تأمين طبي لك وللمعالين المؤهلين وفقاً لسياسة الشركة
   • إجازة سنوية قدرها [العدد] أيام عمل في السنة
   • مكافأة نهاية الخدمة وفقاً لنظام العمل السعودي
   • التسجيل في المؤسسة العامة للتأمينات الاجتماعية (GOSI)

٧. الإقامة وتصريح العمل
   ستقوم الشركة برعاية تصريح العمل والإقامة الخاصة بك وفقاً للوائح السعودية.

٨. تاريخ البدء
   تاريخ البدء المتوقع هو [تاريخ البدء]، شريطة إكمال جميع الوثائق والموافقات المطلوبة.

٩. السرية
   بصفتك موظفاً، ستتمكن من الوصول إلى معلومات سرية. يُتوقع منك الحفاظ على سرية هذه المعلومات أثناء وبعد عملك.

١٠. الامتثال لنظام العمل السعودي
    يتوافق هذا العرض مع نظام العمل السعودي وتعديلاته. أي مسائل لم يتم تناولها بشكل محدد في هذا الخطاب ستخضع لنظام العمل السعودي.

لقبول هذا العرض، يرجى التوقيع وإعادة هذا الخطاب بحلول [الموعد النهائي للرد].

نتطلع إلى الترحيب بك في فريقنا.

مع خالص التقدير،

[اسم مدير الموارد البشرية]
[المنصب]
[اسم الشركة]

لقد قرأت وفهمت وأقبل شروط وأحكام هذا العرض:

___________________________
${offer.candidateName || '[اسم المرشح]'}

التاريخ: _____________________`;
}

function calculateTotal(compensation: any): string {
  if (!compensation) return '';
  
  const baseSalary = compensation.baseSalary || 0;
  const housing = compensation.housing || 0;
  const transportation = compensation.transportation || 0;
  const otherAllowances = compensation.otherAllowances || 0;
  
  return (baseSalary + housing + transportation + otherAllowances).toLocaleString();
}