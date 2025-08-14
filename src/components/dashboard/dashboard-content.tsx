import React from "react";
import { useAppContext } from "../../context/app-context";
import { RecruitmentFunnel } from "./recruitment-funnel";
import { PendingActions } from "./pending-actions";
import { PerformanceMetrics } from "./performance-metrics";
import { HiringTrends } from "./hiring-trends";
import { CandidateSources } from "./candidate-sources";
import { AiAssistant } from "./ai-assistant";
import { DashboardFilters, FilterState } from "./dashboard-filters";
import { Modal, ModalContent, ModalBody, Button, Progress, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react"; // Added missing Icon import
import { AICommandBar } from "./ai-command-bar";
import { AIWelcomeExperience } from "./ai-welcome-experience";
import { FloatingAIAssistant } from "./floating-ai-assistant";
import { motion, AnimatePresence } from "framer-motion";
import { AIWorkflowAssistant } from "./ai-workflow-assistant";

export const DashboardContent: React.FC = () => {
  const { language } = useAppContext();
  const [filters, setFilters] = React.useState<FilterState>({
    departments: [],
    locations: [],
    dateRange: "last30days",
    jobTypes: [],
    status: [],
    searchQuery: "",
  });

  const handleApplyFilters = () => {
    // In a real application, this would trigger API calls or data filtering
    console.log("Applying filters:", filters);
  };

  const handleResetFilters = () => {
    setFilters({
      departments: [],
      locations: [],
      dateRange: "last30days",
      jobTypes: [],
      status: [],
      searchQuery: "",
    });
  };

  const [showAIWelcome, setShowAIWelcome] = React.useState(true);
  const [aiCommandBarOpen, setAICommandBarOpen] = React.useState(false);
  const [showFloatingAssistant, setShowFloatingAssistant] = React.useState(false);
  const [aiAssistantPosition, setAiAssistantPosition] = React.useState({ x: 0, y: 0 });
  const [showAIWorkflows, setShowAIWorkflows] = React.useState(false);
  const [pulseAIButton, setPulseAIButton] = React.useState(true);
  
  React.useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("wise_ai_welcome_seen");
    if (hasSeenWelcome) {
      setShowAIWelcome(false);
    }
    
    // Register keyboard shortcut for AI command bar (Cmd+K or Ctrl+K)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setAICommandBarOpen(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  const handleCloseWelcome = () => {
    setShowAIWelcome(false);
    localStorage.setItem("wise_ai_welcome_seen", "true");
  };

  React.useEffect(() => {
    // Show floating assistant after a delay
    const assistantTimer = setTimeout(() => {
      setShowFloatingAssistant(true);
    }, 15000); // Show floating assistant after 15 seconds
    
    return () => {
      clearTimeout(assistantTimer);
    };
  }, []);

  React.useEffect(() => {
    const initialPulse = setTimeout(() => {
      setPulseAIButton(false);
    }, 10000);
    
    const pulseCycle = setInterval(() => {
      setPulseAIButton(true);
      setTimeout(() => {
        setPulseAIButton(false);
      }, 5000);
    }, 60000);
    
    return () => {
      clearTimeout(initialPulse);
      clearInterval(pulseCycle);
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Ambient AI Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="neural-network" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 0h100v100H0z" fill="none" />
              <circle cx="50" cy="50" r="2" fill="currentColor" className="text-blue-800" />
              <circle cx="0" cy="0" r="2" fill="currentColor" className="text-blue-800" />
              <circle cx="0" cy="100" r="2" fill="currentColor" className="text-blue-800" />
              <circle cx="100" cy="0" r="2" fill="currentColor" className="text-blue-800" />
              <circle cx="100" cy="100" r="2" fill="currentColor" className="text-blue-800" />
              <path d="M0 0l50 50M0 100l50 50M100 0l-50 50M100 100l-50-50" stroke="currentColor" className="text-blue-800" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-network)" />
        </svg>
      </div>
      
      {/* Welcome Header with Ask AI and right-aligned subtitle (matches screenshot) */}
      <div className="mb-8 flex items-center justify-between">
        {/* Left: Title + Ask AI */}
        <div className="flex items-center">
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {language === "en" ? "Welcome to Wise" : "مرحبًا بك في وايز"}
          </motion.h1>

          <div className="relative ml-3">
            {pulseAIButton && (
              <motion.div
                className="absolute inset-0 rounded-xl"
                initial={{ boxShadow: "0 0 0 0 rgba(59, 130, 246, 0.7)" }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0.7)",
                    "0 0 0 8px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{ repeat: 5, duration: 1.5, ease: "easeOut" }}
              />
            )}

            <Tooltip
              content={
                <div className="px-2 py-1">
                  <p className="font-medium text-sm mb-1">{language === "en" ? "AI Assistant" : "مساعد الذكاء الاصطناعي"}</p>
                  <p className="text-xs opacity-80">{language === "en" ? "Click to get help with recruitment" : "انقر للحصول على مساعدة في التوظيف"}</p>
                </div>
              }
              placement="bottom"
              showArrow
              classNames={{ content: "py-2 px-3 bg-blue-600 text-white" }}
              delay={500}
              closeDelay={0}
              isOpen={pulseAIButton ? true : undefined}
            >
              <motion.button
                onClick={() => setShowAIWorkflows(true)}
                className="group relative bg-gradient-to-br from-blue-500 to-blue-700 p-0 rounded-xl flex items-center justify-center h-12 pl-3 pr-4 shadow-lg shadow-blue-300/30 border border-blue-400"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15 }}
              >
                {/* Animated Icon */}
                <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="mr-2">
                  <Icon icon="lucide:sparkles" className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-white font-medium tracking-wide text-sm">{language === "en" ? "Ask AI" : "اسأل الذكاء"}</span>
                <motion.div animate={{ x: language === "en" ? [0, 3, 0] : [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }} className="ml-1">
                  <Icon icon={language === "en" ? "lucide:chevron-right" : "lucide:chevron-left"} className="w-4 h-4 text-white opacity-80" />
                </motion.div>
                {/* Green indicator dot */}
                <span className="absolute -top-1 -right-1 block w-3 h-3 bg-green-400 rounded-full" />
              </motion.button>
            </Tooltip>
          </div>
        </div>

        {/* Right: Subtitle */}
        <motion.p
          className="text-gray-500 text-lg text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {language === "en" ? "Your AI-powered recruitment platform" : "منصة التوظيف المدعومة بالذكاء الاصطناعي"}
        </motion.p>
      </div>
      
      {/* AI Command Button */}
      <motion.div 
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 1
        }}
      >
        <Button
          className="h-16 w-16 rounded-full shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 border-none"
          isIconOnly
          onPress={() => setAICommandBarOpen(true)}
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear" 
            }}
            className="absolute inset-0 rounded-full opacity-30 overflow-hidden"
          >
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              <circle cx="50" cy="20" r="2" className="text-white fill-current" />
              <circle cx="80" cy="50" r="2" className="text-white fill-current" />
              <circle cx="50" cy="80" r="2" className="text-white fill-current" />
              <circle cx="20" cy="50" r="2" className="text-white fill-current" />
              <path d="M50 20l30 30-30 30-30-30z" fill="none" stroke="currentColor" className="text-white" strokeWidth="0.5" />
            </svg>
          </motion.div>
          
          <motion.div
            animate={{ 
              scale: [1, 1.15, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Icon icon="lucide:sparkles" className="h-7 w-7 text-white" />
          </motion.div>
        </Button>
        
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            boxShadow: [
              "0 0 0 0 rgba(59, 130, 246, 0.4)",
              "0 0 0 20px rgba(59, 130, 246, 0)",
              "0 0 0 0 rgba(59, 130, 246, 0.4)"
            ] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          style={{ borderRadius: "100%" }}
        />
      </motion.div>

      {/* Floating AI Insight Bubble */}
      <AnimatePresence>
        {showFloatingAssistant && (
          <motion.div 
            className="fixed bottom-28 right-6 z-50 max-w-xs"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            drag
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-xl text-white relative">
              <Button 
                isIconOnly 
                size="sm" 
                className="absolute -top-2 -right-2 bg-white min-w-0 w-6 h-6 text-blue-500 shadow-md z-10"
                radius="full"
                onPress={() => setShowFloatingAssistant(false)}
              >
                <Icon icon="lucide:x" className="w-3 h-3" />
              </Button>
              
              <div className="flex gap-3">
                <div className="mt-1">
                  <motion.div 
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    <Icon icon="lucide:sparkles" className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">
                    {language === "en" 
                      ? "I noticed a 15% drop in candidate acceptance rate" 
                      : "لاحظت انخفاضًا بنسبة 15٪ في معدل قبول المرشحين"}
                  </p>
                  
                  <Button 
                    size="sm"
                    color="primary"
                    variant="solid"
                    className="bg-white text-blue-500 border-none w-full justify-center"
                    onPress={() => setAICommandBarOpen(true)}
                  >
                    {language === "en" ? "Analyze This" : "تحليل هذا"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Workflows Assistant Modal */}
      <AIWorkflowAssistant
        isOpen={showAIWorkflows}
        onClose={() => setShowAIWorkflows(false)}
        language={language}
      />
      
      {/* Dashboard Filters */}
      <DashboardFilters 
        filters={filters}
        setFilters={setFilters}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column (Main Content) */}
        <div className="flex-1 space-y-8">
          <RecruitmentFunnel />
          <PerformanceMetrics />
          <HiringTrends />
          <CandidateSources />
        </div>

        {/* Right Column (Sidebar) */}
        <div className="w-full lg:w-80 space-y-6">
          <PendingActions />
          <AiAssistant />
        </div>
      </div>
      
      {/* AI Welcome Experience */}
      <AIWelcomeExperience isOpen={showAIWelcome} onClose={handleCloseWelcome} language={language} />
      
      {/* AI Command Bar */}
      <AICommandBar 
        isOpen={aiCommandBarOpen} 
        onClose={() => setAICommandBarOpen(false)} 
        language={language}
      />
    </div>
  );
};