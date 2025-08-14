import React from "react";
import { Button, Tabs, Tab, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../../data/translations";

interface ResumeUploadStepProps {
  formData: any;
  updateFormData: (data: any) => void;
  settings: any;
  language: LanguageKey;
}

export const ResumeUploadStep: React.FC<ResumeUploadStepProps> = ({
  formData,
  updateFormData,
  settings,
  language
}) => {
  const [activeTab, setActiveTab] = React.useState<string>("upload");
  const [fileName, setFileName] = React.useState<string>("");
  const resumeInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // In a real app, you would handle the file upload here
      updateFormData({ resume: file });
    }
  };
  
  const handleUploadClick = () => {
    if (resumeInputRef.current) {
      resumeInputRef.current.click();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-1">
          {language === "en" ? "Resume / CV" : "السيرة الذاتية"}
        </h3>
        <p className="text-sm text-default-500">
          {language === "en" 
            ? "Upload your resume or CV so we can learn more about your skills and experience." 
            : "قم بتحميل سيرتك الذاتية حتى نتمكن من معرفة المزيد عن مهاراتك وخبراتك."}
        </p>
      </div>
      
      <Tabs 
        aria-label="Resume Upload Options"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(key as string)}
        color="primary"
        variant="underlined"
      >
        <Tab 
          key="upload" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:upload" width={18} />
              <span>{language === "en" ? "Upload Resume" : "تحميل السيرة الذاتية"}</span>
            </div>
          }
        >
          <div className="mt-4">
            <div className="border-2 border-dashed border-default-200 rounded-lg p-8 text-center">
              <input
                type="file"
                ref={resumeInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              
              {!fileName ? (
                <div>
                  <Icon icon="lucide:file-plus" className="mx-auto mb-4 text-default-300" width={48} />
                  <p className="text-default-600 mb-2">
                    {language === "en" 
                      ? "Drag and drop your resume here"
                      : "اسحب وأفلت سيرتك الذاتية هنا"}
                  </p>
                  <p className="text-sm text-default-400 mb-4">
                    {language === "en" 
                      ? "PDF, DOC, or DOCX files up to 5MB"
                      : "ملفات PDF أو DOC أو DOCX حتى 5 ميغابايت"}
                  </p>
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={handleUploadClick}
                    startContent={<Icon icon="lucide:upload-cloud" width={18} />}
                  >
                    {language === "en" ? "Browse Files" : "تصفح الملفات"}
                  </Button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Icon icon="lucide:file-text" className="text-primary" width={32} />
                    <div>
                      <p className="font-medium text-left">{fileName}</p>
                      <div className="bg-success-100 text-success-700 text-xs px-2 py-0.5 rounded-full inline-block">
                        {language === "en" ? "Uploaded successfully" : "تم التحميل بنجاح"}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="flat"
                    color="danger"
                    size="sm"
                    onPress={() => {
                      setFileName("");
                      updateFormData({ resume: null });
                      if (resumeInputRef.current) {
                        resumeInputRef.current.value = "";
                      }
                    }}
                    startContent={<Icon icon="lucide:trash-2" width={16} />}
                  >
                    {language === "en" ? "Remove" : "إزالة"}
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mt-6">
              <h4 className="text-base font-medium mb-2">
                {language === "en" ? "Tips for a great resume" : "نصائح للحصول على سيرة ذاتية رائعة"}
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-default-600">
                <li>{language === "en" ? "Keep it concise - 1-2 pages is ideal" : "كن موجزًا - صفحة أو صفحتان هو المثالي"}</li>
                <li>{language === "en" ? "Highlight relevant experience" : "سلط الضوء على الخبرات ذات الصلة"}</li>
                <li>{language === "en" ? "Include measurable achievements" : "قم بتضمين الإنجازات القابلة للقياس"}</li>
                <li>{language === "en" ? "Proofread carefully" : "دقق بعناية"}</li>
              </ul>
            </div>
          </div>
        </Tab>
        
        <Tab 
          key="linkedin" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="logos:linkedin-icon" width={18} />
              <span>{language === "en" ? "Import from LinkedIn" : "استيراد من LinkedIn"}</span>
            </div>
          }
        >
          <div className="mt-6 text-center p-8 border rounded-lg">
            <Icon icon="logos:linkedin-icon" className="mx-auto mb-4" width={64} />
            <h4 className="text-lg font-medium mb-2">
              {language === "en" ? "Import your professional profile" : "استيراد ملفك المهني"}
            </h4>
            <p className="text-default-600 mb-4">
              {language === "en" 
                ? "We'll use your LinkedIn profile information to fill out your application."
                : "سنستخدم معلومات ملفك الشخصي على LinkedIn لملء طلبك."}
            </p>
            <Button
              color="primary"
              className="px-8"
              startContent={<Icon icon="lucide:arrow-right" width={18} />}
            >
              {language === "en" ? "Connect with LinkedIn" : "الاتصال بـ LinkedIn"}
            </Button>
          </div>
        </Tab>
        
        <Tab 
          key="indeed" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="logos:indeed" width={18} />
              <span>{language === "en" ? "Import from Indeed" : "استيراد من Indeed"}</span>
            </div>
          }
        >
          <div className="mt-6 text-center p-8 border rounded-lg">
            <Icon icon="logos:indeed" className="mx-auto mb-4" width={64} />
            <h4 className="text-lg font-medium mb-2">
              {language === "en" ? "Use your Indeed resume" : "استخدم سيرتك الذاتية من Indeed"}
            </h4>
            <p className="text-default-600 mb-4">
              {language === "en" 
                ? "Apply faster using your saved Indeed resume."
                : "قدم بشكل أسرع باستخدام سيرتك الذاتية المحفوظة على Indeed."}
            </p>
            <Button
              color="primary"
              className="px-8"
              startContent={<Icon icon="lucide:arrow-right" width={18} />}
            >
              {language === "en" ? "Connect with Indeed" : "الاتصال بـ Indeed"}
            </Button>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};