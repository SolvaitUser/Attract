import React from "react";
import { Icon } from "@iconify/react";
import { Tooltip, Progress, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { motion } from "framer-motion";

interface FunnelStage {
  key: string;
  label: { en: string; ar: string };
  count: number;
  percentage: number;
  color: string;
}

interface StageDetail {
  id: string;
  name: { en: string; ar: string };
  status: "positive" | "negative" | "neutral";
  value: number;
  description: { en: string; ar: string };
}

export const RecruitmentFunnel: React.FC = () => {
  const { language, direction } = useAppContext();

  const funnelData: FunnelStage[] = [
    { key: "applicants", label: { en: "Applicants", ar: "المتقدمون" }, count: 254, percentage: 100, color: "bg-blue-500" },
    { key: "screened", label: { en: "Screened", ar: "تم الفرز" }, count: 178, percentage: 70, color: "bg-indigo-500" },
    { key: "interviewed", label: { en: "Interviewed", ar: "تمت المقابلة" }, count: 103, percentage: 41, color: "bg-violet-500" },
    { key: "offered", label: { en: "Offered", ar: "تم العرض" }, count: 42, percentage: 17, color: "bg-purple-500" },
    { key: "hired", label: { en: "Hired", ar: "تم التوظيف" }, count: 28, percentage: 11, color: "bg-fuchsia-500" },
    { key: "rejected", label: { en: "Rejected", ar: "مرفوض" }, count: 76, percentage: 30, color: "bg-rose-500" },
  ];

  // Reverse the array for RTL layout
  const displayData = direction === "rtl" ? [...funnelData].reverse() : funnelData;

  const [isInsightModalOpen, setIsInsightModalOpen] = React.useState(false);

  // Add detailed data for the interview stage
  const interviewStageDetails: StageDetail[] = [
    {
      id: "detail-1",
      name: { en: "No-shows", ar: "عدم الحضور" },
      status: "negative",
      value: 18,
      description: { 
        en: "Candidates who didn't attend scheduled interviews", 
        ar: "المرشحون الذين لم يحضروا المقابلات المجدولة" 
      }
    },
    {
      id: "detail-2",
      name: { en: "Technical rejections", ar: "الرفض التقني" },
      status: "negative",
      value: 24,
      description: { 
        en: "Failed technical assessment during interview", 
        ar: "فشل في التقييم التقني أثناء المقابلة" 
      }
    },
    {
      id: "detail-3",
      name: { en: "Cultural fit concerns", ar: "مخاوف التوافق الثقافي" },
      status: "negative",
      value: 12,
      description: { 
        en: "Rejected due to cultural fit concerns", 
        ar: "تم الرفض بسبب مخاوف التوافق الثقافي" 
      }
    },
    {
      id: "detail-4",
      name: { en: "Salary expectations", ar: "توقعات الراتب" },
      status: "neutral",
      value: 7,
      description: { 
        en: "Compensation expectations too high", 
        ar: "توقعات التعويض مرتفعة للغاية" 
      }
    },
    {
      id: "detail-5",
      name: { en: "Passed interviews", ar: "اجتاز المقابلات" },
      status: "positive",
      value: 42,
      description: { 
        en: "Successfully passed all interview rounds", 
        ar: "اجتاز بنجاح جميع جولات المقابلة" 
      }
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-gradient-to-br from-white to-blue-50 border border-gray-200 rounded-lg p-6 relative overflow-hidden"
    >
      {/* Enhanced AI visual indicator with animated neurons */}
      <motion.div 
        className="absolute -top-20 -right-20 h-40 w-40 bg-wise-blue opacity-5 rounded-full"
        style={{ filter: "blur(30px)" }}
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <div className="absolute -top-10 -right-10 w-64 h-64 pointer-events-none opacity-[0.02]">
        {Array.from({ length: 12 }).map((_, i) => (
          <React.Fragment key={`neural-node-${i}`}>
            <motion.div
              className="absolute rounded-full bg-blue-500"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0.5,
              }}
              style={{ width: '4px', height: '4px' }}
            />
            
            {i % 3 === 0 && (
              <motion.div
                className="absolute bg-blue-500 h-px origin-left"
                initial={{
                  x: Math.random() * 80 + 10 + "%",
                  y: Math.random() * 80 + 10 + "%",
                  rotate: Math.random() * 360,
                  scaleX: Math.random() * 0.8 + 0.2,
                }}
                animate={{ scaleX: [1, 0.7, 1] }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
                style={{ width: '40px' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {language === "en" ? "Recruitment Pipeline Overview" : "نظرة عامة على مسار التوظيف"}
        </h2>
        <div className="flex items-center">
          <Tooltip content={language === "en" ? "Last 30 days" : "آخر 30 يومًا"}>
            <div className="text-sm text-gray-500 flex items-center">
              <Icon icon="lucide:calendar" className="w-4 h-4 mr-1" />
              <span>{language === "en" ? "Last 30 days" : "آخر 30 يومًا"}</span>
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Funnel Visualization - Enhanced with animations */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {displayData.map((stage, index) => (
            <motion.div 
              key={stage.key}
              className="flex-1 min-w-[120px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className={`w-full h-2 ${stage.color} rounded-full mb-2`}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                ></motion.div>
                <motion.span 
                  className="text-2xl font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                >
                  {stage.count}
                </motion.span>
                <span className="text-sm text-gray-500">{language === "en" ? stage.label.en : stage.label.ar}</span>
                <span className="text-xs text-gray-400">{stage.percentage}%</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Funnel Flow Visualization - Enhanced with flow animation */}
        <div className="relative h-12 mb-2 overflow-hidden">
          <div className="absolute inset-0 flex">
            {displayData.map((stage, index) => (
              <div 
                key={`flow-${stage.key}`}
                className="flex-1 relative"
              >
                <div 
                  className={`absolute inset-y-0 ${index === 0 ? 'left-0 right-0' : index === displayData.length - 1 ? 'left-0 right-0' : 'inset-x-0'} ${stage.color} ${index === 0 ? 'rounded-l-lg' : ''} ${index === displayData.length - 1 ? 'rounded-r-lg' : ''}`}
                  style={{ 
                    width: `${index === displayData.length - 1 ? '100%' : '100%'}`,
                    opacity: 1 - (index * 0.1)
                  }}
                ></div>
                
                {index < displayData.length - 1 && (
                  <motion.div 
                    className={`absolute top-1/4 bottom-1/4 right-0 w-3 ${stage.color}`}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: [0.3, 0.7, 0.3],
                      x: [0, 10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  ></motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Insight Box - Enhanced styling with animations */}
      <motion.div 
        className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-6 rounded-r-xl relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <motion.div 
          className="absolute -right-8 -bottom-8 h-32 w-32 bg-blue-500 opacity-5 rounded-full"
          style={{ filter: "blur(30px)" }}
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        {/* Animated neurons in insight box */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`insight-particle-${i}`}
              className="absolute bg-blue-600 rounded-full"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [
                  Math.random() * 50 - 25,
                  Math.random() * 50 - 25,
                  Math.random() * 50 - 25
                ],
                y: [
                  Math.random() * 30 - 15,
                  Math.random() * 30 - 15,
                  Math.random() * 30 - 15
                ],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        <div className="flex items-start relative z-10">
          <div className="mr-3 relative">
            <motion.div 
              className="absolute inset-0 bg-blue-500 rounded-full opacity-20"
              animate={{ 
                scale: [1, 2, 1],
                opacity: [0.2, 0, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full p-2 relative z-10"
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut" 
              }}
            >
              <Icon icon="lucide:sparkles" className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          
          <div>
            <h4 className="font-semibold text-blue-800 mb-1 text-lg flex items-center">
              <Icon icon="lucide:brain-circuit" className="w-4 h-4 mr-1 text-blue-600" />
              {language === "en" ? "AI Insight" : "رؤية الذكاء الاصطناعي"}
            </h4>
            
            <p className="text-blue-900 mt-1 leading-relaxed">
              {language === "en" 
                ? "You have a high drop rate in the Interview stage (42%). Recommend manager feedback check." 
                : "لديك معدل تسرب مرتفع في مرحلة المقابلة (42٪). نوصي بالتحقق من ملاحظات المدير."}
            </p>
            
            <motion.div
              className="mt-4 flex"
              whileHover={{ x: language === "en" ? 5 : -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                color="primary"
                variant="solid"
                className="bg-gradient-to-r from-blue-500 to-blue-600 border-none shadow-md"
                onPress={() => setIsInsightModalOpen(true)}
                endContent={
                  <Icon 
                    icon={direction === "rtl" ? "lucide:chevron-left" : "lucide:chevron-right"} 
                    className="w-4 h-4" 
                  />
                }
              >
                <span className="font-medium">
                  {language === "en" ? "View Detailed Analysis" : "عرض التحليل المفصل"}
                </span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* AI Insight Detail Modal */}
      <Modal 
        isOpen={isInsightModalOpen} 
        onOpenChange={setIsInsightModalOpen}
        placement="center"
        size="2xl"
        scrollBehavior="inside"
        classNames={{
          base: "max-h-[90vh] max-w-[95vw] md:max-w-[90vw]",
          body: "p-3 md:p-6 overflow-auto",
          footer: "p-3 md:p-6 flex flex-col sm:flex-row gap-2 items-center justify-end"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 p-4 md:p-6">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-500 rounded-full p-1">
                    <Icon icon="lucide:sparkles" className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base md:text-lg">{language === "en" ? "Interview Stage Analysis" : "تحليل مرحلة المقابلة"}</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {/* Overview Section */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {language === "en" ? "Pipeline Drop-off Analysis" : "تحليل تسرب المرشحين"}
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">
                          {language === "en" ? "Interview Stage Drop Rate" : "معدل التسرب في مرحلة المقابلة"}
                        </span>
                        <span className="text-lg font-semibold text-rose-500">42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: "42%" }}></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>{language === "en" ? "Target: <25%" : "الهدف: <25%"}</span>
                        <span>{language === "en" ? "Industry Avg: 32%" : "متوسط الصناعة: 32%"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-3">
                      {language === "en" ? "Detailed Breakdown" : "تفصيل مفصل"}
                    </h3>
                    <div className="space-y-3">
                      {interviewStageDetails.map((detail) => (
                        <div key={detail.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border border-gray-100 rounded-lg gap-2">
                          <div className="flex items-center">
                            <div className={`w-2 h-2 rounded-full mr-3 ${
                              detail.status === "positive" ? "bg-green-500" : 
                              detail.status === "negative" ? "bg-rose-500" : "bg-amber-500"
                            }`}></div>
                            <div>
                              <h4 className="font-medium text-gray-800 text-sm md:text-base">
                                {language === "en" ? detail.name.en : detail.name.ar}
                              </h4>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                {language === "en" ? detail.description.en : detail.description.ar}
                              </p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <span className={`text-base md:text-lg font-semibold ${
                              detail.status === "positive" ? "text-green-500" : 
                              detail.status === "negative" ? "text-rose-500" : "text-amber-500"
                            }`}>
                              {detail.value}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">
                              {language === "en" ? "candidates" : "مرشحين"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      {language === "en" ? "AI Recommendations" : "توصيات الذكاء الاصطناعي"}
                    </h3>
                    <div className="bg-wise-light-blue border-l-4 border-wise-blue p-4 rounded-r-lg space-y-3">
                      <div className="flex items-start">
                        <Icon icon="lucide:check-circle" className="w-5 h-5 text-wise-blue mr-2 mt-0.5" />
                        <p className="text-sm">
                          {language === "en" 
                            ? "Review technical assessment criteria - may be too stringent for current market" 
                            : "مراجعة معايير التقييم الفني - قد تكون صارمة للغاية بالنسبة للسوق الحالي"}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Icon icon="lucide:check-circle" className="w-5 h-5 text-wise-blue mr-2 mt-0.5" />
                        <p className="text-sm">
                          {language === "en" 
                            ? "Implement pre-interview reminder system to reduce no-show rate" 
                            : "تنفيذ نظام تذكير قبل المقابلة لتقليل معدل عدم الحضور"}
                        </p>
                      </div>
                      <div className="flex items-start">
                        <Icon icon="lucide:check-circle" className="w-5 h-5 text-wise-blue mr-2 mt-0.5" />
                        <p className="text-sm">
                          {language === "en" 
                            ? "Conduct interviewer training focused on cultural fit assessment" 
                            : "إجراء تدريب للمقابلين يركز على تقييم التوافق الثقافي"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} fullWidth={window.innerWidth < 640}>
                  {language === "en" ? "Close" : "إغلاق"}
                </Button>
                <Button color="primary" onPress={onClose} fullWidth={window.innerWidth < 640}>
                  {language === "en" ? "Generate Action Plan" : "إنشاء خطة عمل"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.section>
  );
};