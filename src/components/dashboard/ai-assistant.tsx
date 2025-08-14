import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

interface AiTip {
  id: string;
  icon: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  action?: { en: string; ar: string };
}

export const AiAssistant: React.FC = () => {
  const { language } = useAppContext();
  const [activeAssistant, setActiveAssistant] = React.useState<string | null>(null);
  const [animating, setAnimating] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showPulseCues, setShowPulseCues] = React.useState(true);

  React.useEffect(() => {
    // Disable pulse cues after 10 seconds
    const pulseTimer = setTimeout(() => {
      setShowPulseCues(false);
    }, 10000);
    
    return () => clearTimeout(pulseTimer);
  }, []);

  const aiTips: AiTip[] = [
    {
      id: "tip-1",
      icon: "lucide:mail",
      title: { en: "Send Follow-ups", ar: "إرسال متابعات" },
      description: { 
        en: "5 candidates haven't responded to your interview invitations.", 
        ar: "5 مرشحين لم يستجيبوا لدعوات المقابلة الخاصة بك." 
      },
      action: { en: "Send Reminder", ar: "إرسال تذكير" },
    },
    {
      id: "tip-2",
      icon: "lucide:trending-down",
      title: { en: "Hiring Rate Alert", ar: "تنبيه معدل التوظيف" },
      description: { 
        en: "Hiring rate falling below baseline for Engineering department.", 
        ar: "معدل التوظيف ينخفض عن خط الأساس لقسم الهندسة." 
      },
      action: { en: "View Details", ar: "عرض التفاصيل" },
    },
    {
      id: "tip-3",
      icon: "lucide:clock",
      title: { en: "Offer Expiring", ar: "عرض على وشك الانتهاء" },
      description: { 
        en: "2 offers will expire in the next 48 hours.", 
        ar: "عرضان سينتهيان في الـ 48 ساعة القادمة." 
      },
      action: { en: "Escalate Offer", ar: "تصعيد العرض" },
    },
  ];

  // Enhanced AI tips with more visuals
  const enhancedAiTips: AiTip[] = [
    {
      id: "tip-1",
      icon: "lucide:mail",
      title: { en: "Smart Follow-ups", ar: "متابعات ذكية" },
      description: { 
        en: "5 candidates haven't responded to your interview invitations. I've drafted personalized follow-up messages.", 
        ar: "5 مرشحين لم يستجيبوا لدعوات المقابلة. لقد كتبت رسائل متابعة مخصصة." 
      },
      action: { en: "Send Smart Reminders", ar: "إرسال تذكيرات ذكية" },
    },
    {
      id: "tip-2",
      icon: "lucide:trending-down",
      title: { en: "Hiring Rate Alert", ar: "تنبيه معدل التوظيف" },
      description: { 
        en: "I've detected a downward trend in Engineering hiring. My analysis shows it's linked to the technical interview process.", 
        ar: "لقد اكتشفت اتجاهًا هبوطيًا في توظيف الهندسة. يُظهر تحليلي أنه مرتبط بعملية المقابلة التقنية." 
      },
      action: { en: "View AI Analysis", ar: "عرض التحليل الذكي" },
    },
    {
      id: "tip-3",
      icon: "lucide:clock",
      title: { en: "Offer Expiring Soon", ar: "العرض ينتهي قريبًا" },
      description: { 
        en: "2 critical offers will expire in 48 hours. Based on candidate signals, a 5% compensation adjustment may increase acceptance probability by 72%.", 
        ar: "سينتهي عرضان حاسمان في غضون 48 ساعة. استنادًا إلى إشارات المرشح، قد يؤدي تعديل التعويض بنسبة 5% إلى زيادة احتمالية القبول بنسبة 72%." 
      },
      action: { en: "View AI Recommendations", ar: "عرض توصيات الذكاء الاصطناعي" },
    },
  ];

  const handleCardClick = (id: string) => {
    setAnimating(true);
    setActiveAssistant(id);
    setIsExpanded(true);
    
    // Reset after animation completes
    setTimeout(() => {
      setAnimating(false);
    }, 300);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className={`w-full rounded-xl overflow-hidden relative ${
        isExpanded ? 'bg-gradient-to-br from-blue-50 to-white border border-blue-200' : 'bg-white border border-gray-200'
      }`}
    >
      {/* Neural network background animation */}
      <div className="absolute inset-0 pointer-events-none">
        {isExpanded && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`ai-particle-${i}`}
            className="absolute rounded-full bg-blue-400"
            initial={{
              x: Math.random() * 100 - 50 + "%",
              y: Math.random() * 100 - 50 + "%",
              scale: Math.random() * 0.3 + 0.1,
              opacity: 0.05,
            }}
            animate={{
              x: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
              y: [
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
                Math.random() * 100 - 50 + "%",
              ],
            }}
            transition={{
              duration: 20 + Math.random() * 30,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              width: (Math.random() * 5 + 1) + "px",
              height: (Math.random() * 5 + 1) + "px",
            }}
          />
        ))}
      </div>
      
      {/* AI Pulse Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 h-20 w-20 bg-attract-blue rounded-full opacity-5"
          style={{ filter: "blur(20px)" }}
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut" 
              }}
              className="mr-2"
            >
              <Icon icon="lucide:sparkles" className="w-5 h-5 text-attract-blue" />
            </motion.div>
            {language === "en" ? "Attract AI Assistant" : "مساعد Attract الذكي"}
          </h2>
          
          <motion.div 
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-full h-10 w-10 flex items-center justify-center shadow-lg shadow-blue-500/20"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ 
              scale: showPulseCues ? [1, 1.1, 1] : 1,
              boxShadow: showPulseCues ? [
                "0 0 0 0 rgba(59, 130, 246, 0.5)",
                "0 0 0 10px rgba(59, 130, 246, 0)",
                "0 0 0 0 rgba(59, 130, 246, 0.5)"
              ] : "none",
            }}
            transition={{ 
              duration: 2,
              repeat: showPulseCues ? Infinity : 0,
              ease: "easeInOut" 
            }}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon 
              icon={isExpanded ? "lucide:x" : "lucide:zap"} 
              className="w-5 h-5 text-white" 
            />
          </motion.div>
        </div>

        <AnimatePresence>
          {!isExpanded ? (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-4"
            >
              <div className="flex items-start">
                <Icon icon="lucide:sparkles" className="w-5 h-5 text-blue-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    {language === "en" 
                      ? "How can I assist you today?" 
                      : "كيف يمكنني مساعدتك اليوم؟"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 shadow-lg shadow-blue-500/10 text-white mb-6 relative overflow-hidden">
                {/* Animated particles in assistant greeting */}
                {Array.from({ length: 10 }).map((_, i) => (
                  <motion.div
                    key={`pulse-particle-${i}`}
                    className="absolute bg-white rounded-full"
                    initial={{
                      x: "50%",
                      y: "50%",
                      opacity: 0.2,
                      scale: 0.1,
                    }}
                    animate={{
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      opacity: [0.2, 0.5, 0],
                      scale: [0.1, 0.3, 0],
                    }}
                    transition={{
                      duration: 2 + Math.random() * 3,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: Math.random() * 2,
                    }}
                    style={{
                      width: (Math.random() * 4 + 2) + "px",
                      height: (Math.random() * 4 + 2) + "px",
                    }}
                  />
                ))}
                
                <div className="flex items-start relative z-10">
                  <motion.div 
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                    className="bg-white/20 rounded-lg p-2 mr-3"
                  >
                    <Icon icon="lucide:brain-circuit" className="w-5 h-5 text-white" />
                  </motion.div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {language === "en" ? "Attract AI" : "Attract AI"}
                    </h3>
                    <p className="text-sm text-blue-100">
                      {language === "en" 
                        ? "I'm analyzing your recruitment data in real-time to provide personalized insights and recommendations." 
                        : "أقوم بتحليل بيانات التوظيف الخاصة بك في الوقت الحقيقي لتقديم رؤى وتوصيات مخصصة."}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-4">
          {enhancedAiTips.map((tip, index) => (
            <motion.div 
              key={tip.id}
              className={`border ${
                activeAssistant === tip.id 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-100'
              } rounded-xl p-4 hover:border-blue-200 transition-colors cursor-pointer overflow-hidden relative ${
                index === 0 && showPulseCues ? 'shadow-md shadow-blue-100' : ''
              }`}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => handleCardClick(tip.id)}
              layout
            >
              {/* Pulse effect for new items */}
              {tip.id === "tip-1" && showPulseCues && (
                <motion.div 
                  className="absolute top-2 right-2 h-3 w-3 bg-green-500 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.6, 1],
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0.4)",
                      "0 0 0 10px rgba(34, 197, 94, 0)",
                      "0 0 0 0 rgba(34, 197, 94, 0.4)"
                    ]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                />
              )}
              
              <div className="flex items-start">
                <div className={`${
                  activeAssistant === tip.id 
                    ? 'bg-blue-100' 
                    : 'bg-gray-100'
                } rounded-lg p-2 mr-3`}>
                  <motion.div
                    animate={{ 
                      rotate: activeAssistant === tip.id ? [0, 10, -10, 0] : 0,
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Icon 
                      icon={tip.icon} 
                      className={`w-5 h-5 ${
                        activeAssistant === tip.id 
                          ? 'text-blue-600' 
                          : 'text-gray-500'
                      }`} 
                    />
                  </motion.div>
                </div>
                <div className="flex-1">
                  <h3 className={`font-medium ${
                    activeAssistant === tip.id 
                      ? 'text-blue-800' 
                      : 'text-gray-800'
                  }`}>
                    {language === "en" ? tip.title.en : tip.title.ar}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    activeAssistant === tip.id 
                      ? 'text-blue-700' 
                      : 'text-gray-600'
                  }`}>
                    {language === "en" ? tip.description.en : tip.description.ar}
                  </p>
                  
                  {(activeAssistant === tip.id || index === 0) && tip.action && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Button 
                        size="sm"
                        variant="solid"
                        color="primary"
                        className="mt-3 bg-gradient-to-r from-blue-500 to-blue-600 border-none shadow-md shadow-blue-300/20"
                        startContent={
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Icon icon="lucide:zap" className="w-3.5 h-3.5" />
                          </motion.div>
                        }
                      >
                        {language === "en" ? tip.action.en : tip.action.ar}
                      </Button>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {activeAssistant === tip.id && index === 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pl-10"
                >
                  <div className="rounded-lg bg-blue-900/5 p-3 border border-blue-100">
                    <div className="flex items-start text-sm">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex-shrink-0 flex items-center justify-center mr-2 shadow-sm">
                        <Icon icon="lucide:message-square" className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-blue-800 font-medium mb-1">
                          {language === "en" ? "Personalized Follow-up Template" : "قالب متابعة مخصص"}
                        </p>
                        <p className="text-gray-700 text-xs">
                          {language === "en" 
                            ? "I've analyzed past successful communications and created a template with a 72% response rate:" 
                            : "لقد قمت بتحليل الاتصالات الناجحة السابقة وإنشاء قالب بمعدل استجابة 72٪:"}
                        </p>
                        <div className="bg-white rounded border border-blue-100 p-2 mt-2 text-xs text-gray-600 italic">
                          {language === "en" 
                            ? "Hi [Name], I noticed you haven't responded to our interview invitation. Our team was particularly impressed by your [specific skill] and we'd love to discuss how it aligns with our current needs." 
                            : "مرحبًا [الاسم]، لاحظت أنك لم ترد على دعوة المقابلة لدينا. كان فريقنا معجبًا بشكل خاص بـ [مهارة محددة] ونود مناقشة كيفية توافقها مع احتياجاتنا الحالية."}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-5"
        >
          <Button 
            className="w-full justify-center bg-gradient-to-r from-blue-500 to-blue-600 border-none py-6 shadow-lg shadow-blue-500/20"
            color="primary"
            startContent={
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear" 
                }}
              >
                <Icon icon="lucide:sparkles" className="w-5 h-5" />
              </motion.div>
            }
            endContent={
              <motion.div
                animate={{ x: language === "en" ? [0, 5, 0] : [0, -5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              >
                <Icon 
                  icon={language === "en" ? "lucide:chevron-right" : "lucide:chevron-left"} 
                  className="w-5 h-5" 
                />
              </motion.div>
            }
          >
            <span className="text-lg font-medium">
              {language === "en" ? "Ask AI Assistant" : "اسأل مساعد الذكاء الاصطناعي"}
            </span>
          </Button>
        </motion.div>
      </div>
    </motion.section>
  );
};