import React from "react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../../data/translations";
import { motion } from "framer-motion";

interface SuccessStepProps {
  job: any;
  settings: any;
  language: LanguageKey;
}

export const SuccessStep: React.FC<SuccessStepProps> = ({
  job,
  settings,
  language
}) => {
  return (
    <div className="text-center py-8 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20
        }}
        className="mb-6"
      >
        <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto">
          <Icon icon="lucide:check" className="text-success-600" width={40} />
        </div>
      </motion.div>
      
      <h3 className="text-2xl font-semibold mb-3">
        {language === "en" ? "Application Submitted Successfully!" : "تم تقديم الطلب بنجاح!"}
      </h3>
      
      <p className="text-default-600 mb-6 max-w-md mx-auto">
        {language === "en" 
          ? `Thank you for applying to ${job.title} at ${settings.branding.companyName}. We've received your application and will review it shortly.`
          : `شكرًا لك على التقديم لوظيفة ${job.title} في ${settings.branding.companyName}. لقد تلقينا طلبك وسنقوم بمراجعته قريبًا.`
        }
      </p>
      
      <div className="border rounded-lg p-4 mb-6 bg-default-50 max-w-md mx-auto">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Icon icon="lucide:mail-check" width={20} />
          <h4 className="font-medium">
            {language === "en" ? "What's Next?" : "ما هي الخطوة التالية؟"}
          </h4>
        </div>
        
        <ol className="text-sm text-default-700 text-left list-decimal ps-5 space-y-1.5">
          <li>
            {language === "en" 
              ? "You will receive a confirmation email shortly."
              : "ستتلقى رسالة بريد إلكتروني للتأكيد قريبًا."
            }
          </li>
          <li>
            {language === "en" 
              ? "Our team will review your application."
              : "سيقوم فريقنا بمراجعة طلبك."
            }
          </li>
          <li>
            {language === "en" 
              ? "If your qualifications match our needs, a recruiter will contact you."
              : "إذا كانت مؤهلاتك تتطابق مع احتياجاتنا، سيتصل بك مسؤول التوظيف."
            }
          </li>
          <li>
            {language === "en" 
              ? "Keep an eye on your email and phone for updates."
              : "راقب بريدك الإلكتروني وهاتفك للحصول على التحديثات."
            }
          </li>
        </ol>
      </div>
      
      <div className="space-y-4">
        <p className="font-medium text-sm">
          {language === "en" ? "Application Reference" : "مرجع الطلب"}
        </p>
        <div className="bg-default-100 py-2 px-4 rounded font-mono tracking-widest inline-block text-default-800">
          APP-{Math.floor(100000 + Math.random() * 900000)}
        </div>
      </div>
      
      <div className="mt-8">
        <p className="text-default-600 text-sm mb-3">
          {language === "en" ? "Check out more opportunities" : "تحقق من المزيد من الفرص"}
        </p>
        
        <div className="flex justify-center gap-3">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-default-50 text-sm font-medium"
          >
            <Icon icon="lucide:briefcase" width={16} />
            <span>
              {language === "en" ? "View All Jobs" : "عرض كل الوظائف"}
            </span>
          </button>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-default-50 text-sm font-medium"
            style={{ 
              borderColor: settings.branding.primaryColor,
              color: settings.branding.primaryColor
            }}
          >
            <Icon icon="lucide:share-2" width={16} />
            <span>
              {language === "en" ? "Share with Friends" : "مشاركة مع الأصدقاء"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};