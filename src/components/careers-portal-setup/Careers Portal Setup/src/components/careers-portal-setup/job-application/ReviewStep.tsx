import React from "react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../../data/translations";

interface ReviewStepProps {
  formData: any;
  job: any;
  settings: any;
  language: LanguageKey;
}

export const ReviewStep: React.FC<ReviewStepProps> = ({
  formData,
  job,
  settings,
  language
}) => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-1">
          {language === "en" ? "Review Your Application" : "مراجعة طلبك"}
        </h3>
        <p className="text-sm text-default-500">
          {language === "en" 
            ? "Please review your information before submitting your application." 
            : "يرجى مراجعة معلوماتك قبل تقديم طلبك."}
        </p>
      </div>
      
      {/* Job Information Summary */}
      <div className="bg-default-50 p-4 rounded-lg border">
        <h4 className="font-medium text-base mb-2">
          {language === "en" ? "Position Details" : "تفاصيل الوظيفة"}
        </h4>
        
        <div className="grid grid-cols-2 gap-y-3 text-sm">
          <div>
            <span className="text-default-500">
              {language === "en" ? "Position: " : "الوظيفة: "}
            </span>
            <span className="font-medium">{job.title}</span>
          </div>
          
          <div>
            <span className="text-default-500">
              {language === "en" ? "Department: " : "القسم: "}
            </span>
            <span className="font-medium">{job.department}</span>
          </div>
          
          <div>
            <span className="text-default-500">
              {language === "en" ? "Location: " : "الموقع: "}
            </span>
            <span className="font-medium">{job.location}</span>
          </div>
          
          <div>
            <span className="text-default-500">
              {language === "en" ? "Job Type: " : "نوع الوظيفة: "}
            </span>
            <span className="font-medium">{job.type}</span>
          </div>
        </div>
      </div>
      
      {/* Personal Information */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-default-50 px-4 py-3 border-b flex justify-between items-center">
          <h4 className="font-medium">
            {language === "en" ? "Personal Information" : "المعلومات الشخصية"}
          </h4>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <div>
              <p className="text-default-500 mb-1">
                {language === "en" ? "Full Name" : "الاسم الكامل"}
              </p>
              <p className="font-medium">{`${formData.firstName} ${formData.lastName}`}</p>
            </div>
            
            <div>
              <p className="text-default-500 mb-1">
                {language === "en" ? "Phone" : "الهاتف"}
              </p>
              <p className="font-medium">{formData.phone || "-"}</p>
            </div>
            
            <div>
              <p className="text-default-500 mb-1">
                {language === "en" ? "Email" : "البريد الإلكتروني"}
              </p>
              <p className="font-medium">{formData.email || "-"}</p>
            </div>
            
            <div>
              <p className="text-default-500 mb-1">
                {language === "en" ? "How did you hear about us?" : "كيف سمعت عنا؟"}
              </p>
              <p className="font-medium">{formData.source || "-"}</p>
            </div>
            
            {formData.linkedInProfile && (
              <div>
                <p className="text-default-500 mb-1">
                  {language === "en" ? "LinkedIn Profile" : "الملف الشخصي على LinkedIn"}
                </p>
                <p className="font-medium truncate">{formData.linkedInProfile}</p>
              </div>
            )}
            
            {formData.portfolioUrl && (
              <div>
                <p className="text-default-500 mb-1">
                  {language === "en" ? "Portfolio/Website" : "المحفظة/الموقع الإلكتروني"}
                </p>
                <p className="font-medium truncate">{formData.portfolioUrl}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Resume */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-default-50 px-4 py-3 border-b flex justify-between items-center">
          <h4 className="font-medium">
            {language === "en" ? "Resume / CV" : "السيرة الذاتية"}
          </h4>
        </div>
        
        <div className="p-4">
          {formData.resume ? (
            <div className="flex items-center gap-3">
              <Icon icon="lucide:file-text" className="text-primary" width={24} />
              <div>
                <p className="font-medium">{formData.resume.name || "Resume.pdf"}</p>
                <p className="text-xs text-default-500">
                  {language === "en" ? "Uploaded successfully" : "تم التحميل بنجاح"}
                </p>
              </div>
            </div>
          ) : (
            <p className="italic text-default-400">
              {language === "en" 
                ? "No resume uploaded. Your application will be evaluated based on other provided information."
                : "لم يتم تحميل السيرة الذاتية. سيتم تقييم طلبك على أساس المعلومات الأخرى المقدمة."
              }
            </p>
          )}
        </div>
      </div>
      
      {/* Cover Letter */}
      {formData.coverLetter && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-default-50 px-4 py-3 border-b flex justify-between items-center">
            <h4 className="font-medium">
              {language === "en" ? "Cover Letter" : "خطاب التغطية"}
            </h4>
          </div>
          
          <div className="p-4">
            <p className="text-sm whitespace-pre-line">{formData.coverLetter}</p>
          </div>
        </div>
      )}
      
      {/* Additional Information */}
      {formData.additionalInfo && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-default-50 px-4 py-3 border-b flex justify-between items-center">
            <h4 className="font-medium">
              {language === "en" ? "Additional Information" : "معلومات إضافية"}
            </h4>
          </div>
          
          <div className="p-4">
            <p className="text-sm whitespace-pre-line">{formData.additionalInfo}</p>
          </div>
        </div>
      )}
      
      <div className="flex items-center gap-3 p-4 bg-primary-50 rounded-lg border border-primary-100">
        <Icon icon="lucide:check-circle" className="text-primary-500" width={24} />
        <p className="text-sm">
          {language === "en" 
            ? "Please review your application carefully. Once submitted, you cannot make changes."
            : "يرجى مراجعة طلبك بعناية. بمجرد التقديم، لا يمكنك إجراء تغييرات."
          }
        </p>
      </div>
    </div>
  );
};