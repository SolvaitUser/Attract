import React from "react";
import { Icon } from "@iconify/react";
import { Modal, ModalContent, ModalBody, Button, Progress, Card } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface AIWelcomeExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "ar";
}

export const AIWelcomeExperience: React.FC<AIWelcomeExperienceProps> = ({ isOpen, onClose, language }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(true);
  const [showBrain, setShowBrain] = React.useState(true);
  const [animationPhase, setAnimationPhase] = React.useState<number>(0);
  
  const welcomeSteps = [
    {
      title: { en: "Meet Your AI Recruitment Assistant", ar: "تعرّف على مساعد التوظيف بالذكاء الاصطناعي" },
      description: { 
        en: "Hi there! I'm Attract AI, your intelligent recruitment assistant. I'll help you make better hiring decisions with data-driven insights.", 
        ar: "مرحبًا! أنا وايز AI، مساعد التوظيف الذكي. سأساعدك في اتخاذ قرارات توظيف أفضل من خلال رؤى مبنية على البيانات." 
      },
      icon: "lucide:sparkles"
    },
    {
      title: { en: "Personalized Insights", ar: "رؤى مخصصة" },
      description: { 
        en: "I continuously analyze your recruitment data to identify trends, bottlenecks, and opportunities for improvement.", 
        ar: "أقوم بتحليل بيانات التوظيف الخاصة بك باستمرار لتحديد الاتجاهات والاختناقات وفرص التحسين." 
      },
      icon: "lucide:line-chart"
    },
    {
      title: { en: "Smart Recommendations", ar: "توصيات ذكية" },
      description: { 
        en: "I'll suggest optimizations for your recruitment process, helping you hire faster and find better candidates.", 
        ar: "سأقترح تحسينات لعملية التوظيف الخاصة بك، مما يساعدك على التوظيف بشكل أسرع والعثور على مرشحين أفضل." 
      },
      icon: "lucide:lightbulb"
    },
    {
      title: { en: "Let's Get Started", ar: "لنبدأ" },
      description: { 
        en: "Press Cmd+K (or Ctrl+K) anytime to access your AI assistant. Let's transform your recruitment process!", 
        ar: "اضغط على Cmd+K (أو Ctrl+K) في أي وقت للوصول إلى المساعد الذكي. دعنا نحول عملية التوظيف الخاصة بك!" 
      },
      icon: "lucide:rocket"
    }
  ];
  
  const step = welcomeSteps[currentStep];
  
  React.useEffect(() => {
    if (currentStep < welcomeSteps.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 1200);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep]);
  
  React.useEffect(() => {
    if (isOpen) {
      // Brain animation effect
      const brainTimer = setTimeout(() => {
        setShowBrain(false);
      }, 2000);
      
      return () => clearTimeout(brainTimer);
    }
  }, [isOpen]);
  
  React.useEffect(() => {
    // Add pulsing animation sequence
    if (isOpen && showBrain) {
      const phaseInterval = setInterval(() => {
        setAnimationPhase(prev => (prev + 1) % 4);
      }, 800);
      
      return () => {
        clearInterval(phaseInterval);
      };
    }
  }, [isOpen, showBrain]);
  
  const handleNextStep = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal 
          isOpen={isOpen} 
          onOpenChange={() => {}}
          hideCloseButton
          backdrop="blur"
          size="xl"
          motionProps={{
            variants: {
              enter: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              },
              exit: {
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.5, ease: [0.32, 0, 0.67, 0] }
              }
            }
          }}
        >
          <ModalContent className="bg-transparent shadow-none border-none">
            <ModalBody className="p-0 overflow-hidden">
              {showBrain ? (
                <motion.div 
                  className="flex items-center justify-center py-24 bg-gradient-to-br from-blue-900 to-indigo-900 rounded-xl overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {/* Neural network background animation */}
                  <div className="absolute inset-0 overflow-hidden opacity-20">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={`particle-${i}`}
                        className="absolute rounded-full bg-blue-400"
                        initial={{
                          x: Math.random() * 100 - 50 + "%",
                          y: Math.random() * 100 - 50 + "%",
                          scale: Math.random() * 0.4 + 0.1,
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
                          duration: 15 + Math.random() * 30,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{
                          width: (Math.random() * 10 + 2) + "px",
                          height: (Math.random() * 10 + 2) + "px",
                        }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ 
                        scale: [0.5, 1.1, 1],
                        opacity: 1,
                      }}
                      transition={{ 
                        duration: 2.5,
                        times: [0, 0.7, 1],
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                      className="relative"
                    >
                      {/* Enhanced Brain Animation */}
                      <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="relative"
                        >
                          <div className="relative">
                            <Icon 
                              icon="lucide:brain-circuit" 
                              className="w-32 h-32 text-blue-100" 
                            />
                            
                            {/* Animated brain connection points */}
                            {[0, 1, 2, 3].map(i => (
                              <motion.div
                                key={`pulse-${i}`}
                                className={`absolute w-3 h-3 rounded-full bg-blue-300 ${
                                  i === 0 ? 'top-1/4 left-1/4' :
                                  i === 1 ? 'top-1/4 right-1/4' :
                                  i === 2 ? 'bottom-1/4 left-1/3' :
                                  'bottom-1/4 right-1/3'
                                }`}
                                animate={{ 
                                  opacity: animationPhase === i ? [0.4, 1, 0.4] : 0.4,
                                  scale: animationPhase === i ? [1, 1.5, 1] : 1
                                }}
                                transition={{ duration: 1 }}
                              />
                            ))}
                          </div>
                        </motion.div>
                        
                        <motion.h2
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8, duration: 0.7 }}
                          className="text-xl font-semibold text-white mt-6 text-center"
                        >
                          {language === "en" 
                                    ? "Initializing Attract AI"
        : "تهيئة الذكاء الاصطناعي Attract"}
                        </motion.h2>
                        
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.7 }}
                          className="flex space-x-2 mt-4"
                        >
                          <motion.div 
                            className="w-2 h-2 bg-blue-300 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-300 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="w-2 h-2 bg-blue-300 rounded-full"
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          />
                        </motion.div>
                      </div>

                      {/* Enhanced pulse animations */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-400 opacity-20"
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
                        className="absolute inset-0 rounded-full bg-blue-300 opacity-10"
                        animate={{ 
                          scale: [1, 2.5, 1],
                          opacity: [0.1, 0, 0.1]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  className="py-14 px-8 bg-gradient-to-br from-slate-900 to-blue-900 rounded-xl text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex justify-center mb-8 relative">
                    <motion.div 
                      className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        boxShadow: [
                          "0 0 0 0 rgba(59, 130, 246, 0.5)",
                          "0 0 0 15px rgba(59, 130, 246, 0)",
                          "0 0 0 0 rgba(59, 130, 246, 0.5)"
                        ]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <Icon icon={step.icon} className="w-10 h-10 text-white" />
                    </motion.div>
                  </div>
                  
                  <motion.div 
                    key={`title-${currentStep}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-4"
                  >
                    <h2 className="text-3xl font-bold text-white">
                      {step.title[language]}
                    </h2>
                  </motion.div>
                  
                  <motion.div 
                    key={`description-${currentStep}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center mb-10 max-w-lg mx-auto"
                  >
                    {isTyping ? (
                      <div className="flex items-center justify-center space-x-2">
                        <motion.div 
                          className="w-3 h-3 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        />
                        <motion.div 
                          className="w-3 h-3 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div 
                          className="w-3 h-3 bg-blue-400 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    ) : (
                      <p className="text-lg text-blue-100 leading-relaxed">
                        {step.description[language]}
                      </p>
                    )}
                  </motion.div>
                  
                  {!isTyping && (
                    <motion.div 
                      className="flex justify-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <Button 
                        color="primary" 
                        size="lg"
                        className="px-10 py-6 font-medium text-lg shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 border-none"
                        onPress={handleNextStep}
                        startContent={
                          currentStep < welcomeSteps.length - 1 ? 
                            <Icon icon="lucide:chevron-right" className="w-5 h-5" /> : 
                            <Icon icon="lucide:sparkles" className="w-5 h-5" />
                        }
                      >
                        {currentStep < welcomeSteps.length - 1 
                          ? (language === "en" ? "Continue" : "متابعة")
                          : (language === "en" ? "Start Experience" : "ابدأ التجربة")
                        }
                      </Button>
                    </motion.div>
                  )}
                  
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      {welcomeSteps.map((_, index) => (
                        <div 
                          key={index}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentStep 
                              ? "w-10 bg-blue-400" 
                              : index < currentStep 
                                ? "w-5 bg-blue-400" 
                                : "w-5 bg-blue-800"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};