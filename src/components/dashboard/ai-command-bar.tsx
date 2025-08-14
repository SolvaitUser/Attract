import React from "react";
import { Icon } from "@iconify/react";
import { Modal, ModalContent, ModalBody, Input, Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface AICommandBarProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "ar";
}

interface CommandItem {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  category: string;
  color: string;
}

export const AICommandBar: React.FC<AICommandBarProps> = ({ isOpen, onClose, language }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [aiResponse, setAIResponse] = React.useState("");
  const [neuralActivity, setNeuralActivity] = React.useState<boolean>(false);
  const [suggestedCommand, setSuggestedCommand] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  const resetState = () => {
    setQuery("");
    setIsProcessing(false);
    setAIResponse("");
  };
  
  const handleClose = () => {
    resetState();
    onClose();
  };
  
  const commands: CommandItem[] = [
    {
      id: "analyze-pipeline",
      title: { en: "Analyze recruitment pipeline", ar: "تحليل مسار التوظيف" },
      description: { en: "Get an AI analysis of your current recruitment funnel", ar: "احصل على تحليل ذكي لمسار التوظيف الحالي" },
      icon: "lucide:bar-chart-2",
      category: "analytics",
      color: "bg-blue-500"
    },
    {
      id: "optimize-job",
      title: { en: "Optimize job descriptions", ar: "تحسين وصف الوظائف" },
      description: { en: "Enhance your job descriptions with AI suggestions", ar: "تعزيز أوصاف الوظائف الخاصة بك بمقترحات الذكاء الاصطناعي" },
      icon: "lucide:file-text",
      category: "content",
      color: "bg-purple-500"
    },
    {
      id: "candidate-match",
      title: { en: "Match candidates to roles", ar: "مطابقة المرشحين للأدوار" },
      description: { en: "Find the best candidate matches for open positions", ar: "ابحث عن أفضل المرشحين المناسبين للوظائف المفتوحة" },
      icon: "lucide:user-check",
      category: "candidates",
      color: "bg-green-500"
    },
    {
      id: "interview-questions",
      title: { en: "Generate interview questions", ar: "إنشاء أسئلة المقابلة" },
      description: { en: "Create tailored questions for specific roles", ar: "إنشاء أسئلة مخصصة لأدوار محددة" },
      icon: "lucide:message-square",
      category: "interviews",
      color: "bg-amber-500"
    },
  ];
  
  React.useEffect(() => {
    if (isOpen && !isProcessing && !aiResponse) {
      const interval = setInterval(() => {
        const randomCommand = commands[Math.floor(Math.random() * commands.length)].id;
        setSuggestedCommand(randomCommand);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [isOpen, isProcessing, aiResponse, commands]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    
    setIsProcessing(true);
    setNeuralActivity(true);
    
    // Simulate AI processing with enhanced animations
    setTimeout(() => {
      setNeuralActivity(false);
      setIsProcessing(false);
      setAIResponse("I've analyzed your recruitment pipeline and found that your candidate drop-off is highest at the technical interview stage (42%). Consider reviewing your technical assessment criteria or providing better preparation materials to candidates.");
    }, 3000);
  };
  
  const handleCommandClick = (command: CommandItem) => {
    setQuery(language === "en" ? command.title.en : command.title.ar);
    handleSubmit(new Event("submit") as any);
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={handleClose}
      hideCloseButton
      backdrop="blur"
      size="4xl"
      placement="top"
      className="bg-transparent shadow-none"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
          },
          exit: {
            opacity: 0,
            y: -40,
            transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] }
          }
        }
      }}
    >
      <ModalContent className="bg-transparent shadow-none">
        <ModalBody className="p-0">
          <motion.div 
            className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="p-4 relative overflow-hidden">
              {/* Neural network background animation */}
              {neuralActivity && (
                <motion.div 
                  className="absolute inset-0 z-0 opacity-30"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                >
                  {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                      key={`neural-${i}`}
                      className="absolute bg-blue-400 rounded-full"
                      style={{
                        width: `${Math.random() * 4 + 1}px`,
                        height: `${Math.random() * 4 + 1}px`,
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
                          Math.random() * 50 - 25,
                          Math.random() * 50 - 25,
                          Math.random() * 50 - 25
                        ],
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="relative">
                  <Input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      language === "en" 
                        ? "Ask Attract AI about your recruitment..." 
                        : "اسأل وايز AI عن التوظيف الخاص بك..."
                    }
                    size="lg"
                    startContent={
                      <motion.div
                        animate={{ 
                          rotate: isProcessing ? [0, 360] : 0,
                          scale: isProcessing ? [1, 1.1, 1] : 1
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: isProcessing ? Infinity : 0,
                          ease: "linear" 
                        }}
                      >
                        <Icon icon="lucide:sparkles" className="text-attract-blue w-6 h-6" />
                      </motion.div>
                    }
                    className="bg-transparent"
                    classNames={{
                      input: "text-xl pl-2",
                      inputWrapper: "h-16 px-4 border-0 bg-transparent shadow-none focus-within:!bg-white/50"
                    }}
                  />
                  
                  {/* Glowing hint */}
                  {!query && !isProcessing && !aiResponse && (
                    <motion.div 
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: suggestedCommand ? [0, 0.7, 0] : 0,
                      }}
                      transition={{ 
                        duration: 2,
                        times: [0, 0.5, 1],
                        repeat: suggestedCommand ? 1 : 0
                      }}
                    >
                      <div className="h-full flex items-center px-14">
                        <span className="text-xl text-blue-400/70">
                          {suggestedCommand && commands.find(cmd => cmd.id === suggestedCommand) 
                            ? language === "en" 
                              ? `Try "${commands.find(cmd => cmd.id === suggestedCommand)?.title.en}"` 
                              : `جرب "${commands.find(cmd => cmd.id === suggestedCommand)?.title.ar}"`
                            : ""}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <kbd className="hidden sm:inline-flex h-7 items-center gap-1 rounded border border-gray-200 bg-gray-100 px-3 font-mono text-xs shadow-sm">
                      {language === "en" ? "ESC" : "ESC"}
                    </kbd>
                  </motion.div>
                </div>
              </form>
            </div>
            
            <AnimatePresence>
              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="px-6 pb-6"
                >
                  <div className="bg-blue-50 rounded-xl p-6 relative overflow-hidden">
                    {/* Neural network background for processing state */}
                    <div className="absolute inset-0 overflow-hidden">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                          key={`process-particle-${i}`}
                          className="absolute rounded-full bg-blue-400"
                          initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                            scale: Math.random() * 0.4 + 0.1,
                            opacity: 0.2,
                          }}
                          animate={{
                            x: [
                              Math.random() * 100 + "%",
                              Math.random() * 100 + "%",
                              Math.random() * 100 + "%",
                            ],
                            y: [
                              Math.random() * 100 + "%",
                              Math.random() * 100 + "%",
                              Math.random() * 100 + "%",
                            ],
                            opacity: [0.1, 0.3, 0.1],
                          }}
                          transition={{
                            duration: 3 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          style={{
                            width: (Math.random() * 4 + 2) + "px",
                            height: (Math.random() * 4 + 2) + "px",
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col items-center justify-center relative z-10">
                      <motion.div
                        className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg"
                        initial={{ scale: 0.8 }}
                        animate={{ 
                          scale: [0.8, 1, 0.8],
                          boxShadow: [
                            "0 0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 0 12px rgba(59, 130, 246, 0)",
                            "0 0 0 0 rgba(59, 130, 246, 0.4)"
                          ]
                        }}
                        transition={{ 
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <Icon icon="lucide:brain-circuit" className="w-8 h-8 text-blue-500" />
                      </motion.div>
                      
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        {language === "en" ? "Analyzing Your Data" : "تحليل البيانات الخاصة بك"}
                      </h3>
                      
                      <p className="text-blue-600 text-sm max-w-md text-center mb-4">
                        {language === "en" 
                          ? "I'm processing recruitment data, pattern matching, and generating insights..." 
                          : "أقوم بمعالجة بيانات التوظيف ومطابقة الأنماط وتوليد الرؤى..."}
                      </p>
                      
                      <div className="w-full max-w-xs bg-blue-100 rounded-full h-1 mb-1 overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ 
                            duration: 3,
                            ease: "easeInOut" 
                          }}
                        />
                      </div>
                      
                      <div className="flex items-center text-xs text-blue-400">
                        <Icon icon="lucide:cpu" className="w-3 h-3 mr-1" />
                        <span>{language === "en" ? "Cognitive Processing" : "المعالجة المعرفية"}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <AnimatePresence>
              {aiResponse && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="border-t border-gray-100 bg-gradient-to-b from-blue-50 to-white p-6"
                >
                  <div className="flex">
                    <div className="flex-shrink-0 mr-4">
                      <motion.div 
                        className="h-10 w-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200"
                        animate={{ 
                          scale: [1, 1.05, 1],
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                      >
                        <Icon icon="lucide:sparkles" className="text-white w-5 h-5" />
                      </motion.div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-lg text-gray-800 mb-2">
                        {language === "en" ? "AI Analysis" : "تحليل الذكاء الاصطناعي"}
                      </div>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
                        
                        <div className="mt-4 border-l-4 border-blue-400 pl-4 py-1">
                          <p className="text-sm text-blue-800 font-medium">
                            {language === "en" ? "Recommendation" : "توصية"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {language === "en"
                              ? "Schedule a review of your technical interview process with hiring managers."
                              : "جدولة مراجعة لعملية المقابلة الفنية مع مديري التوظيف."}
                          </p>
                        </div>
                      </motion.div>
                      
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button
                          size="sm"
                          variant="flat"
                          color="default"
                          onPress={() => setAIResponse("")}
                        >
                          {language === "en" ? "Dismiss" : "إغلاق"}
                        </Button>
                        <Button
                          size="sm"
                          variant="solid"
                          color="primary"
                          startContent={<Icon icon="lucide:external-link" className="w-4 h-4" />}
                        >
                          {language === "en" ? "View Detailed Analysis" : "عرض التحليل التفصيلي"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {!isProcessing && !aiResponse && (
              <motion.div 
                className="border-t border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="p-6">
                  <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-4 flex items-center">
                    <Icon icon="lucide:zap" className="w-3 h-3 mr-2 text-blue-500" />
                    {language === "en" ? "AI Capabilities" : "قدرات الذكاء الاصطناعي"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                    {commands.map((command) => (
                      <motion.div
                        key={command.id}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex flex-col p-4 cursor-pointer rounded-xl hover:bg-gray-50 border border-gray-100 group transition-all duration-200 ${
                          suggestedCommand === command.id ? "ring-2 ring-blue-400 ring-opacity-50" : ""
                        }`}
                        onClick={() => handleCommandClick(command)}
                      >
                        <div className={`w-10 h-10 ${command.color} rounded-xl flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow duration-200`}>
                          <Icon icon={command.icon} className="text-white w-5 h-5" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 mb-1">
                            {language === "en" ? command.title.en : command.title.ar}
                          </div>
                          <div className="text-xs text-gray-500">
                            {language === "en" ? command.description.en : command.description.ar}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                  <div className="text-xs text-gray-500 flex items-center">
                    <kbd className="inline-flex h-5 items-center gap-1 rounded border border-gray-200 bg-white px-1.5 font-mono text-xs mr-2">
                      /
                    </kbd>
                    {language === "en" 
                      ? "Type a command or ask a question" 
                      : "اكتب أمرًا أو اطرح سؤالًا"}
                  </div>
                  <div className="text-xs text-gray-500 flex items-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 5,
                        ease: "easeInOut" 
                      }}
                      className="mr-1"
                    >
                      <Icon icon="lucide:sparkles" className="w-3 h-3 text-blue-500" />
                    </motion.div>
                    {language === "en" ? "Attract AI" : "Attract AI"}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};