import React from "react";
import { Icon } from "@iconify/react";
import { Badge, Divider, Button, Card, Avatar, Tooltip } from "@heroui/react";
import { motion } from "framer-motion";
import { LanguageKey } from "../../../data/translations";

interface JobDetailsModalProps {
  job: any;
  settings: any;
  language: LanguageKey;
  direction: "ltr" | "rtl";
  onClose: () => void;
  onApply: () => void;
  onShare: (job: any) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  job,
  settings,
  language,
  direction,
  onClose,
  onApply,
  onShare,
}) => {
  // Mock job details data based on the job object passed
  const jobDetails = {
    ...job,
    salary: "$120,000 - $150,000",
    datePosted: new Date().toLocaleDateString(language === "en" ? "en-US" : "ar-SA", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    description: language === "en" 
      ? "We are seeking an experienced professional to join our dynamic team. The ideal candidate will bring innovation, expertise, and a collaborative spirit to help drive our company's success."
      : "نحن نبحث عن محترف ذو خبرة للانضمام إلى فريقنا الديناميكي. يجب أن يجلب المرشح المثالي الابتكار والخبرة وروح التعاون للمساعدة في دفع نجاح شركتنا.",
    responsibilities: [
      language === "en" ? "Lead complex projects from inception to completion" : "قيادة المشاريع المعقدة من البداية إلى الاكتمال",
      language === "en" ? "Collaborate with cross-functional teams to meet objectives" : "التعاون مع فرق متعددة الوظائف لتحقيق الأهداف",
      language === "en" ? "Provide strategic insights and innovative solutions" : "تقديم رؤى استراتيجية وحلول مبتكرة",
      language === "en" ? "Mentor junior team members and foster knowledge sharing" : "توجيه أعضاء الفريق المبتدئين وتعزيز تبادل المعرفة",
      language === "en" ? "Ensure all deliverables meet quality standards" : "ضمان تلبية جميع التسليمات لمعايير الجودة",
    ],
    qualifications: [
      language === "en" ? "Bachelor's degree in a related field" : "درجة البكالوريوس في مجال ذي صلة",
      language === "en" ? "5+ years of relevant experience" : "5+ سنوات من الخبرة ذات الصلة",
      language === "en" ? "Strong analytical and problem-solving skills" : "مهارات قوية في التحليل وحل المشكلات",
      language === "en" ? "Excellent communication and interpersonal abilities" : "مهارات ممتازة في التواصل والعلاقات الشخصية",
      language === "en" ? "Proficiency in industry-specific tools and technologies" : "إتقان أدوات وتقنيات محددة للصناعة",
    ],
    benefits: [
      language === "en" ? "Competitive salary and bonus structure" : "راتب تنافسي وهيكل مكافآت",
      language === "en" ? "Comprehensive health, dental, and vision coverage" : "تغطية شاملة للصحة والأسنان والنظر",
      language === "en" ? "Flexible work arrangements" : "ترتيبات عمل مرنة",
      language === "en" ? "Professional development opportunities" : "فرص التطوير المهني",
      language === "en" ? "401(k) with company match" : "خطة تقاعد مع مساهمة الشركة",
    ],
    teamMembers: [
      { 
        name: language === "en" ? "Alex Morgan" : "أليكس مورجان", 
        title: language === "en" ? "Team Lead" : "قائد الفريق",
        avatar: "https://img.heroui.chat/image/avatar?w=60&h=60&u=10"
      },
      { 
        name: language === "en" ? "Jamie Wilson" : "جيمي ويلسون", 
        title: language === "en" ? "Senior Member" : "عضو كبير",
        avatar: "https://img.heroui.chat/image/avatar?w=60&h=60&u=11"
      },
      { 
        name: language === "en" ? "Taylor Reed" : "تايلور ريد", 
        title: language === "en" ? "Senior Member" : "عضو كبير",
        avatar: "https://img.heroui.chat/image/avatar?w=60&h=60&u=12"
      },
    ],
    applications: 18,
    views: 243,
    similarJobs: 4
  };
  
  // Get theme-specific styling
  const getThemeStyles = () => {
    switch(settings.layout.theme) {
      case "modern":
        return {
          buttonRadius: "rounded-md",
          cardRadius: "rounded-lg",
        };
      case "classic":
        return {
          buttonRadius: "rounded",
          cardRadius: "rounded",
        };
      case "minimal":
        return {
          buttonRadius: "rounded-none",
          cardRadius: "rounded-none",
        };
      case "bold":
        return {
          buttonRadius: "rounded-xl",
          cardRadius: "rounded-xl",
        };
      default:
        return {
          buttonRadius: "rounded-md",
          cardRadius: "rounded-lg",
        };
    }
  };
  
  const themeStyles = getThemeStyles();
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white w-full max-w-5xl ${themeStyles.cardRadius} shadow-xl h-full max-h-[95vh] overflow-hidden ${direction}`}
      >
        <div className="flex flex-col h-full">
          {/* Header area */}
          <div className="p-6 border-b relative sticky top-0 bg-white z-10">
            <button
              aria-label="Close"
              className="absolute right-6 top-6 p-2 rounded-full hover:bg-default-100 transition-colors"
              onClick={onClose}
            >
              <Icon icon="lucide:x" width={20} />
            </button>
            
            <div className="mb-4">
              <Badge 
                content={job.type} 
                color="primary" 
                variant="flat"
                size="sm"
                className="mb-2"
              />
              <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-default-600">
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:briefcase" width={16} />
                  <span>{job.department}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:map-pin" width={16} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon icon="lucide:dollar-sign" width={16} />
                  <span>{jobDetails.salary}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-default-600">
                  <Icon icon="lucide:clock" width={14} />
                  <span>{language === "en" ? "Posted: " : "تاريخ النشر: "} {jobDetails.datePosted}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-default-600">
                  <Icon icon="lucide:eye" width={14} />
                  <span>{jobDetails.views} {language === "en" ? "views" : "مشاهدات"}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-default-600">
                  <Icon icon="lucide:users" width={14} />
                  <span>{jobDetails.applications} {language === "en" ? "applications" : "متقدم"}</span>
                </div>
              </div>
              
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button
                  variant="flat"
                  className={themeStyles.buttonRadius}
                  startContent={<Icon icon="lucide:share-2" width={18} />}
                  onPress={() => onShare(job)}
                >
                  {language === "en" ? "Share" : "مشاركة"}
                </Button>
                <Button
                  color="primary"
                  className={themeStyles.buttonRadius}
                  startContent={<Icon icon="lucide:send" width={18} />}
                  onPress={onApply}
                >
                  {language === "en" ? "Apply Now" : "تقدم الآن"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Job content area */}
          <div className="flex-1 overflow-auto">
            <div className="flex flex-col lg:flex-row">
              {/* Main content */}
              <div className="flex-1 p-6">
                <div className="space-y-6">
                  {/* Job description */}
                  <section>
                    <h2 className="text-xl font-semibold mb-3">{language === "en" ? "Job Description" : "وصف الوظيفة"}</h2>
                    <p className="text-default-700 leading-relaxed">{jobDetails.description}</p>
                  </section>
                  
                  <Divider />
                  
                  {/* Responsibilities */}
                  <section>
                    <h2 className="text-xl font-semibold mb-3">{language === "en" ? "Responsibilities" : "المسؤوليات"}</h2>
                    <ul className="list-disc list-inside space-y-2 text-default-700">
                      {jobDetails.responsibilities.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <Divider />
                  
                  {/* Qualifications */}
                  <section>
                    <h2 className="text-xl font-semibold mb-3">{language === "en" ? "Qualifications" : "المؤهلات"}</h2>
                    <ul className="list-disc list-inside space-y-2 text-default-700">
                      {jobDetails.qualifications.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                  
                  <Divider />
                  
                  {/* Benefits */}
                  <section>
                    <h2 className="text-xl font-semibold mb-3">{language === "en" ? "Benefits" : "المزايا"}</h2>
                    <ul className="list-disc list-inside space-y-2 text-default-700">
                      {jobDetails.benefits.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:w-80 p-6 bg-default-50 lg:border-l flex-shrink-0">
                <div className="space-y-6">
                  {/* Team section */}
                  <section>
                    <h3 className="text-base font-semibold mb-3">{language === "en" ? "Your Team" : "فريقك"}</h3>
                    <div className="space-y-2">
                      {jobDetails.teamMembers.map((member, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Avatar 
                            src={member.avatar} 
                            size="sm" 
                            className={settings.layout.theme === "bold" ? "rounded-xl" : undefined} 
                          />
                          <div>
                            <p className="text-sm font-medium">{member.name}</p>
                            <p className="text-xs text-default-500">{member.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  <Divider />
                  
                  {/* Company info card */}
                  <section>
                    <h3 className="text-base font-semibold mb-3">{language === "en" ? "About The Company" : "عن الشركة"}</h3>
                    <Card 
                      className={`p-4 ${settings.layout.theme === "minimal" ? "border-0 shadow-none" : ""}`}
                      style={{ overflow: "visible" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div 
                          className="w-10 h-10 flex-shrink-0 bg-white border rounded-md flex items-center justify-center overflow-hidden"
                        >
                          <img 
                            src={settings.branding.logo} 
                            alt="Company Logo" 
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{settings.branding.companyName}</h4>
                          <p className="text-xs text-default-500">{job.location}</p>
                        </div>
                      </div>
                      <p className="text-xs text-default-600 line-clamp-3">
                        {settings.content.aboutCompany}
                      </p>
                    </Card>
                  </section>
                  
                  <Divider />
                  
                  {/* Similar jobs section */}
                  <section>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-base font-semibold">{language === "en" ? "Similar Jobs" : "وظائف مماثلة"}</h3>
                      <Button 
                        size="sm" 
                        variant="light"
                        color="primary"
                        className="font-medium"
                      >
                        {language === "en" ? "View All" : "عرض الكل"}
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className={`p-3 border ${themeStyles.cardRadius} bg-white hover:bg-default-50 transition-colors cursor-pointer`}>
                        <div className="mb-1 flex justify-between">
                          <h4 className="font-medium text-sm">
                            {language === "en" ? "Senior Product Designer" : "كبير مصممي المنتجات"}
                          </h4>
                          <Badge content={language === "en" ? "New" : "جديد"} color="success" size="sm" />
                        </div>
                        <div className="text-xs text-default-500">
                          {language === "en" ? "Design Department • Remote" : "قسم التصميم • عن بعد"}
                        </div>
                      </div>
                      
                      <div className={`p-3 border ${themeStyles.cardRadius} bg-white hover:bg-default-50 transition-colors cursor-pointer`}>
                        <h4 className="font-medium text-sm mb-1">
                          {language === "en" ? "UX Researcher" : "باحث تجربة المستخدم"}
                        </h4>
                        <div className="text-xs text-default-500">
                          {language === "en" ? "Design Department • San Francisco" : "قسم التصميم • سان فرانسيسكو"}
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t bg-default-50 flex justify-between items-center sticky bottom-0 z-10">
            <div className="flex items-center gap-2 text-sm text-default-600">
              <Icon icon="lucide:flag" width={16} />
              <button className="hover:underline">
                {language === "en" ? "Report this job" : "الإبلاغ عن هذه الوظيفة"}
              </button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="flat"
                className={themeStyles.buttonRadius}
                onPress={onClose}
              >
                {language === "en" ? "Close" : "إغلاق"}
              </Button>
              <Button
                color="primary"
                className={themeStyles.buttonRadius}
                onPress={onApply}
              >
                {language === "en" ? "Apply for this position" : "تقدم لهذه الوظيفة"}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};