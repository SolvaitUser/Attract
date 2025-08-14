import React from "react";
import { Input, Checkbox, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../../data/translations";

interface BasicInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  settings: any;
  language: LanguageKey;
}

export const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
  formData,
  updateFormData,
  settings,
  language
}) => {
  const [agreedToTerms, setAgreedToTerms] = React.useState(false);
  
  return (
    <div className="space-y-5">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-1">
          {language === "en" ? "Personal Information" : "المعلومات الشخصية"}
        </h3>
        <p className="text-sm text-default-500">
          {language === "en" 
            ? "Please provide your contact information. This will be used to communicate with you about this position." 
            : "يرجى تقديم معلومات الاتصال الخاصة بك. سيتم استخدام هذه المعلومات للتواصل معك بخصوص هذه الوظيفة."}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={language === "en" ? "First Name" : "الاسم الأول"}
          placeholder={language === "en" ? "Your first name" : "اسمك الأول"}
          value={formData.firstName}
          onChange={(e) => updateFormData({ firstName: e.target.value })}
          variant="bordered"
          isRequired
        />
        
        <Input
          label={language === "en" ? "Last Name" : "اسم العائلة"}
          placeholder={language === "en" ? "Your last name" : "اسم العائلة"}
          value={formData.lastName}
          onChange={(e) => updateFormData({ lastName: e.target.value })}
          variant="bordered"
          isRequired
        />
      </div>
      
      <Input
        label={language === "en" ? "Email Address" : "البريد الإلكتروني"}
        placeholder={language === "en" ? "Your email address" : "عنوان بريدك الإلكتروني"}
        value={formData.email}
        onChange={(e) => updateFormData({ email: e.target.value })}
        variant="bordered"
        isRequired
        type="email"
        startContent={<Icon icon="lucide:mail" className="text-default-400" width={18} />}
      />
      
      <Input
        label={language === "en" ? "Phone Number" : "رقم الهاتف"}
        placeholder={language === "en" ? "Your phone number" : "رقم هاتفك"}
        value={formData.phone}
        onChange={(e) => updateFormData({ phone: e.target.value })}
        variant="bordered"
        isRequired
        type="tel"
        startContent={<Icon icon="lucide:phone" className="text-default-400" width={18} />}
      />
      
      <Divider className="my-6" />
      
      <div className="space-y-3">
        <h4 className="text-base font-medium">
          {language === "en" ? "How did you hear about this job?" : "كيف سمعت عن هذه الوظيفة؟"}
        </h4>
        
        <select
          value={formData.source}
          onChange={(e) => updateFormData({ source: e.target.value })}
          className="w-full border rounded-md p-2.5 text-sm"
        >
          <option value="">{language === "en" ? "Select an option" : "اختر خيارًا"}</option>
          <option value="linkedin">{language === "en" ? "LinkedIn" : "لينكد إن"}</option>
          <option value="indeed">{language === "en" ? "Indeed" : "إنديد"}</option>
          <option value="company_website">{language === "en" ? "Company Website" : "موقع الشركة"}</option>
          <option value="referral">{language === "en" ? "Employee Referral" : "إحالة موظف"}</option>
          <option value="job_board">{language === "en" ? "Job Board" : "منصة وظائف"}</option>
          <option value="social_media">{language === "en" ? "Social Media" : "وسائل التواصل الاجتماعي"}</option>
          <option value="other">{language === "en" ? "Other" : "أخرى"}</option>
        </select>
      </div>
      
      <Divider className="my-6" />
      
      <div className="rounded-lg bg-default-50 p-4 border border-default-100">
        <Checkbox
          isSelected={agreedToTerms}
          onValueChange={setAgreedToTerms}
          size="sm"
          className="mb-2"
        >
          <span className="text-sm">
            {language === "en" 
              ? "I agree to the Terms & Conditions and Privacy Policy"
              : "أوافق على الشروط والأحكام وسياسة الخصوصية"}
          </span>
        </Checkbox>
        
        <p className="text-xs text-default-500 ps-6">
          {language === "en" 
            ? `By submitting this application, you agree that ${settings.branding.companyName} may process your personal data for recruitment purposes.`
            : `بتقديم هذا الطلب، فإنك توافق على أن ${settings.branding.companyName} قد تعالج بياناتك الشخصية لأغراض التوظيف.`}
        </p>
      </div>
    </div>
  );
};