import React from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageKey } from "../../../data/translations";
import { BasicInfoStep } from "./BasicInfoStep";
import { ResumeUploadStep } from "./ResumeUploadStep";
import { AdditionalInfoStep } from "./AdditionalInfoStep";
import { ReviewStep } from "./ReviewStep";
import { SuccessStep } from "./SuccessStep";

interface JobApplicationModalProps {
  job: any;
  settings: any;
  language: LanguageKey;
  direction: "ltr" | "rtl";
  onClose: () => void;
}

export const JobApplicationModal: React.FC<JobApplicationModalProps> = ({
  job,
  settings,
  language,
  direction,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = React.useState<number>(0);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    resume: null,
    coverLetter: "",
    portfolioUrl: "",
    linkedInProfile: "",
    source: "",
    additionalInfo: "",
  });
  
  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  const steps = [
    {
      id: "basic",
      title: language === "en" ? "Basic Information" : "المعلومات الأساسية",
      icon: "lucide:user",
    },
    {
      id: "resume",
      title: language === "en" ? "Resume / CV" : "السيرة الذاتية",
      icon: "lucide:file-text",
    },
    {
      id: "additional",
      title: language === "en" ? "Additional Information" : "معلومات إضافية",
      icon: "lucide:clipboard",
    },
    {
      id: "review",
      title: language === "en" ? "Review & Submit" : "المراجعة والتقديم",
      icon: "lucide:check-circle",
    },
  ];
  
  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleClose = () => {
    if (currentStep === steps.length) {
      // If we're on the success step, just close
      onClose();
    } else {
      // Otherwise show a confirmation dialog
      if (window.confirm(language === "en" ? 
        "Are you sure you want to leave? Your application progress will be lost." : 
        "هل أنت متأكد أنك تريد المغادرة؟ سيتم فقد تقدم طلبك."
      )) {
        onClose();
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`bg-white rounded-xl shadow-xl w-full max-w-3xl h-full max-h-[95vh] overflow-hidden ${direction}`}
      >
        {/* Header */}
        <div className="border-b px-6 py-4 sticky top-0 bg-white z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">
                {currentStep === steps.length ? 
                  (language === "en" ? "Application Submitted" : "تم تقديم الطلب") : 
                  (language === "en" ? "Apply for " : "التقديم على ") + job.title}
              </h2>
              {currentStep < steps.length && (
                <p className="text-sm text-default-600">
                  {job.department} • {job.location}
                </p>
              )}
            </div>
            <button 
              className="p-2 rounded-full hover:bg-default-100"
              onClick={handleClose}
            >
              <Icon icon="lucide:x" width={20} />
            </button>
          </div>
          
          {/* Progress Steps - Hidden on success step */}
          {currentStep < steps.length && (
            <div className="flex mt-4 mb-1">
              {steps.map((step, index) => (
                <div key={step.id} className="flex-1 flex items-center">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index <= currentStep ? 
                        'text-white' : 
                        'text-default-400 bg-default-100'
                    }`}
                    style={{ 
                      backgroundColor: index <= currentStep ? settings.branding.primaryColor : undefined
                    }}
                  >
                    <Icon icon={step.icon} width={18} />
                  </div>
                  <div 
                    className={`h-1 flex-1 ${
                      index < steps.length - 1 ? 
                        (index < currentStep ? 
                          'bg-primary-500' : 
                          'bg-default-200'
                        ) : 'bg-transparent'
                    }`}
                    style={{ 
                      backgroundColor: index < currentStep ? settings.branding.primaryColor : undefined
                    }}
                  />
                  
                  {/* Step label - shown only on desktop */}
                  <span className="hidden lg:block absolute mt-9 text-xs whitespace-nowrap" style={{
                    [direction === 'ltr' ? 'left' : 'right']: 0,
                    transform: 'translateX(-50%)'
                  }}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Content */}
        <div className="px-6 py-5 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep === 0 && (
                <BasicInfoStep 
                  formData={formData}
                  updateFormData={updateFormData}
                  settings={settings}
                  language={language}
                />
              )}
              
              {currentStep === 1 && (
                <ResumeUploadStep 
                  formData={formData}
                  updateFormData={updateFormData}
                  settings={settings}
                  language={language}
                />
              )}
              
              {currentStep === 2 && (
                <AdditionalInfoStep 
                  formData={formData}
                  updateFormData={updateFormData}
                  settings={settings}
                  language={language}
                />
              )}
              
              {currentStep === 3 && (
                <ReviewStep 
                  formData={formData}
                  job={job}
                  settings={settings}
                  language={language}
                />
              )}
              
              {currentStep === steps.length && (
                <SuccessStep 
                  job={job}
                  settings={settings}
                  language={language}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer with buttons */}
        <div className="border-t px-6 py-4 flex justify-between sticky bottom-0 bg-white z-10">
          {currentStep < steps.length ? (
            <>
              <button
                className="px-4 py-2 rounded-md text-default-700 font-medium border bg-white hover:bg-default-50"
                onClick={prevStep}
                disabled={currentStep === 0}
                style={{ opacity: currentStep === 0 ? 0.5 : 1 }}
              >
                {language === "en" ? "Back" : "رجوع"}
              </button>
              
              <div className="flex gap-3">
                {/* Social Application Options */}
                {currentStep === 0 && (
                  <>
                    <button
                      className="px-4 py-2 rounded-md flex items-center gap-2 border font-medium bg-white hover:bg-default-50"
                    >
                      <Icon icon="logos:linkedin-icon" width={18} />
                      <span>{language === "en" ? "Apply with LinkedIn" : "تقديم باستخدام LinkedIn"}</span>
                    </button>
                    
                    <button
                      className="px-4 py-2 rounded-md flex items-center gap-2 border font-medium bg-white hover:bg-default-50"
                    >
                      <Icon icon="logos:indeed-logo" width={18} />
                      <span>{language === "en" ? "Apply with Indeed" : "تقديم باستخدام Indeed"}</span>
                    </button>
                  </>
                )}
                
                <button
                  className="px-6 py-2 rounded-md text-white font-medium"
                  style={{ backgroundColor: settings.branding.primaryColor }}
                  onClick={currentStep === steps.length - 1 ? () => setCurrentStep(steps.length) : nextStep}
                >
                  {currentStep === steps.length - 1 ? 
                    (language === "en" ? "Submit Application" : "تقديم الطلب") : 
                    (language === "en" ? "Continue" : "متابعة")}
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex justify-center">
              <button
                className="px-6 py-2 rounded-md text-white font-medium"
                style={{ backgroundColor: settings.branding.primaryColor }}
                onClick={onClose}
              >
                {language === "en" ? "Close" : "إغلاق"}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};