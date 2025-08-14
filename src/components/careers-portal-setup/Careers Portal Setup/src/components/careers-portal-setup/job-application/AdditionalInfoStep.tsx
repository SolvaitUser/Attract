import React from "react";
import { Input, Textarea, Checkbox } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../../data/translations";

interface AdditionalInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  settings: any;
  language: LanguageKey;
}

export const AdditionalInfoStep: React.FC<AdditionalInfoStepProps> = ({
  formData,
  updateFormData,
  settings,
  language
}) => {
  return (
    <div className="space-y-5">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-1">
          {language === "en" ? "Additional Information" : "معلومات إضافية"}
        </h3>
        <p className="text-sm text-default-500">
          {language === "en" 
            ? "Provide additional details to help us understand your qualifications better." 
            : "قدم تفاصيل إضافية لمساعدتنا على فهم مؤهلاتك بشكل أفضل."}
        </p>
      </div>
      
      <Textarea
        label={language === "en" ? "Cover Letter / Introduction" : "خطاب التغطية / المقدمة"}
        placeholder={language === "en" 
          ? "Tell us why you're interested in this position and what makes you a good fit..."
          : "أخبرنا لماذا أنت مهتم بهذا المنصب وما الذي يجعلك مناسبًا له..."
        }
        value={formData.coverLetter}
        onChange={(e) => updateFormData({ coverLetter: e.target.value })}
        variant="bordered"
        minRows={4}
      />
      
      <Input
        label={language === "en" ? "Portfolio or Website" : "المحفظة أو الموقع الإلكتروني"}
        placeholder="https://"
        value={formData.portfolioUrl}
        onChange={(e) => updateFormData({ portfolioUrl: e.target.value })}
        variant="bordered"
        type="url"
        startContent={<Icon icon="lucide:globe" className="text-default-400" width={18} />}
      />
      
      <Input
        label={language === "en" ? "LinkedIn Profile" : "الملف الشخصي على LinkedIn"}
        placeholder="https://linkedin.com/in/username"
        value={formData.linkedInProfile}
        onChange={(e) => updateFormData({ linkedInProfile: e.target.value })}
        variant="bordered"
        startContent={<Icon icon="logos:linkedin-icon" width={18} />}
      />
      
      <div className="pt-4">
        <label className="block text-sm font-medium mb-2">
          {language === "en" ? "Work Authorization" : "تصريح العمل"}
        </label>
        
        <div className="space-y-2">
          <Checkbox size="sm">
            {language === "en" 
              ? "I am authorized to work in the country where this job is located"
              : "أنا مصرح لي بالعمل في البلد الذي توجد فيه هذه الوظيفة"
            }
          </Checkbox>
          
          <Checkbox size="sm">
            {language === "en" 
              ? "I would require visa sponsorship"
              : "سأحتاج إلى كفالة تأشيرة"
            }
          </Checkbox>
        </div>
      </div>
      
      <div className="pt-4">
        <label className="block text-sm font-medium mb-2">
          {language === "en" ? "Additional Questions" : "أسئلة إضافية"}
        </label>
        
        <Textarea
          placeholder={language === "en" 
            ? "Is there anything else you'd like to share with our team?"
            : "هل هناك أي شيء آخر ترغب في مشاركته مع فريقنا؟"
          }
          value={formData.additionalInfo}
          onChange={(e) => updateFormData({ additionalInfo: e.target.value })}
          variant="bordered"
          minRows={3}
        />
      </div>
      
      <div className="mt-6 p-4 bg-default-50 rounded-lg border flex items-start gap-3">
        <div className="text-primary mt-0.5">
          <Icon icon="lucide:info" width={20} />
        </div>
        <div>
          <h4 className="text-sm font-medium">
            {language === "en" ? "Important Note" : "ملاحظة مهمة"}
          </h4>
          <p className="text-sm text-default-600">
            {language === "en" 
              ? `All information provided will be kept confidential and used only for recruitment purposes by ${settings.branding.companyName}.`
              : `سيتم الحفاظ على سرية جميع المعلومات المقدمة واستخدامها فقط لأغراض التوظيف من قبل ${settings.branding.companyName}.`
            }
          </p>
        </div>
      </div>
    </div>
  );
};