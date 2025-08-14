import React from "react";
import { Icon } from "@iconify/react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button,
  Card,
  Badge,
  Tabs,
  Tab,
  Accordion,
  AccordionItem,
  Divider
} from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

interface AIWorkflowAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  language: "en" | "ar";
}

interface AIWorkflow {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  category: string;
  color: string;
  steps?: { en: string; ar: string }[];
  status?: "new" | "popular" | "beta";
}

export const AIWorkflowAssistant: React.FC<AIWorkflowAssistantProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");
  const [activeWorkflow, setActiveWorkflow] = React.useState<string | null>(null);
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = React.useState<number>(0);
  const [generationResult, setGenerationResult] = React.useState<string>("");
  
  // Define AI workflow categories
  const categories = [
    { id: "all", name: { en: "All Workflows", ar: "جميع سير العمل" }, icon: "lucide:layout-grid" },
    { id: "sourcing", name: { en: "Candidate Sourcing", ar: "استقطاب المرشحين" }, icon: "lucide:users" },
    { id: "screening", name: { en: "Resume Screening", ar: "فرز السير الذاتية" }, icon: "lucide:file-text" },
    { id: "interview", name: { en: "Interview Assistance", ar: "مساعدة المقابلة" }, icon: "lucide:message-square" },
    { id: "offer", name: { en: "Offer Generation", ar: "إنشاء العروض" }, icon: "lucide:file-check" }
  ];
  
  // Define AI workflows
  const workflows: AIWorkflow[] = [
    {
      id: "job-desc-gen",
      title: { en: "Generate Job Description", ar: "إنشاء وصف وظيفي" },
      description: { 
        en: "Generate compelling job descriptions from role requirements",
        ar: "إنشاء أوصاف وظيفية جذابة من متطلبات الدور"
      },
      icon: "lucide:file-plus",
      category: "sourcing",
      color: "bg-blue-600",
      steps: [
        { en: "Select job role and level", ar: "حدد دور الوظيفة والمستوى" },
        { en: "Adjust required skills and experience", ar: "ضبط المهارات والخبرات المطلوبة" },
        { en: "Review and customize final output", ar: "مراجعة وتخصيص المخرجات النهائية" }
      ],
      status: "popular"
    },
    {
      id: "resume-match",
      title: { en: "Resume-Job Matching", ar: "مطابقة السيرة الذاتية مع الوظيفة" },
      description: { 
        en: "Match candidates to open positions using AI analysis",
        ar: "مطابقة المرشحين للوظائف المفتوحة باستخدام تحليل الذكاء الاصطناعي" 
      },
      icon: "lucide:git-compare",
      category: "screening",
      color: "bg-emerald-600",
      steps: [
        { en: "Upload candidate resumes", ar: "تحميل السير الذاتية للمرشحين" },
        { en: "Select target job description", ar: "اختر وصف الوظيفة المستهدفة" },
        { en: "View match scores and insights", ar: "عرض درجات التطابق والرؤى" }
      ]
    },
    {
      id: "interview-questions",
      title: { en: "Generate Interview Questions", ar: "إنشاء أسئلة المقابلة" },
      description: { 
        en: "Create tailored interview questions for any role",
        ar: "إنشاء أسئلة مقابلة مخصصة لأي دور"
      },
      icon: "lucide:list-checks",
      category: "interview",
      color: "bg-violet-600",
      steps: [
        { en: "Select job role and skills to assess", ar: "اختر دور الوظيفة والمهارات المراد تقييمها" },
        { en: "Choose interview format (behavioral, technical, etc.)", ar: "اختر تنسيق المقابلة (سلوكية، فنية، إلخ)" },
        { en: "Generate and customize questions", ar: "إنشاء وتخصيص الأسئلة" }
      ]
    },
    {
      id: "candidate-sentiment",
      title: { en: "Candidate Feedback Analysis", ar: "تحليل ملاحظات المرشحين" },
      description: { 
        en: "Analyze candidate feedback and interview responses",
        ar: "تحليل ملاحظات المرشحين وردودهم في المقابلات"
      },
      icon: "lucide:bar-chart-2",
      category: "screening",
      color: "bg-amber-600",
      status: "new"
    },
    {
      id: "offer-letter",
      title: { en: "Offer Letter Generator", ar: "مولد خطاب العرض" },
      description: { 
        en: "Generate customized offer letters for candidates",
        ar: "إنشاء خطابات عرض مخصصة للمرشحين"
      },
      icon: "lucide:mail",
      category: "offer",
      color: "bg-rose-600"
    },
    {
      id: "pipeline-analysis",
      title: { en: "Pipeline Analysis", ar: "تحليل مسار التوظيف" },
      description: { 
        en: "Identify bottlenecks and optimize your recruitment funnel",
        ar: "تحديد نقاط الاختناق وتحسين مسار التوظيف الخاص بك"
      },
      icon: "lucide:activity",
      category: "sourcing",
      color: "bg-cyan-600",
      status: "beta"
    },
    {
      id: "market-salary",
      title: { en: "Market Salary Analysis", ar: "تحليل رواتب السوق" },
      description: { 
        en: "Get AI-powered salary recommendations based on market data",
        ar: "الحصول على توصيات الرواتب المدعومة بالذكاء الاصطناعي بناءً على بيانات السوق"
      },
      icon: "lucide:dollar-sign",
      category: "offer",
      color: "bg-green-600"
    },
    {
      id: "diversity-insights",
      title: { en: "Diversity & Inclusion Insights", ar: "رؤى التنوع والشمول" },
      description: { 
        en: "Analyze and improve diversity metrics in hiring",
        ar: "تحليل وتحسين مقاييس التنوع في التوظيف"
      },
      icon: "lucide:users-2",
      category: "sourcing",
      color: "bg-indigo-600",
      status: "new"
    },
  ];
  
  const filteredWorkflows = selectedCategory === "all" 
    ? workflows 
    : workflows.filter(workflow => workflow.category === selectedCategory);
  
  React.useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setGenerationProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          if (newProgress >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setGenerationResult("Generated a compelling job description highlighting key responsibilities, required qualifications, and company benefits for the Senior Developer role, emphasizing technical expertise in React, Node.js, and cloud platforms, along with excellent problem-solving skills and team collaboration.");
            return 100;
          }
          return newProgress;
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [isGenerating]);
  
  const handleRunWorkflow = (workflowId: string) => {
    setActiveWorkflow(workflowId);
    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationResult("");
  };
  
  const handleReset = () => {
    setActiveWorkflow(null);
    setIsGenerating(false);
    setGenerationProgress(0);
    setGenerationResult("");
  };
  
  const getStatusBadge = (status?: "new" | "popular" | "beta") => {
    if (!status) return null;
    
    const statusProps = {
      new: { color: "success", label: { en: "NEW", ar: "جديد" } },
      popular: { color: "primary", label: { en: "POPULAR", ar: "شائع" } },
      beta: { color: "warning", label: { en: "BETA", ar: "تجريبي" } }
    };
    
    return (
      <Badge 
        color={statusProps[status].color as "success" | "primary" | "warning"} 
        variant="flat"
        size="sm"
      >
        {statusProps[status].label[language]}
      </Badge>
    );
  };
  
  // Add entrance animation
  const entranceAnimation = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl" 
      scrollBehavior="inside"
      classNames={{
        base: "max-h-[90vh] max-w-[90vw] w-full",
        wrapper: "items-center",
        body: "p-0 overflow-auto"
      }}
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="border-b border-gray-100 p-4">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 mr-3">
                  <Icon icon="lucide:sparkles" className="w-4 h-4 text-blue-600" />
                </div>
                <div className="text-xl font-semibold text-gray-800">
                  {language === "en" ? "AI Recruitment Assistant" : "مساعد التوظيف الذكي"}
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="max-h-[70vh] overflow-y-auto p-6">
                {/* Add more eye-catching header with animations */}
                <div className="flex items-center justify-between px-6 pt-3">
                  <div className="flex items-center">
                    <motion.div 
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-4 shadow-lg shadow-blue-300/20"
                      animate={{ 
                        scale: [1, 1.05, 1],
                        rotate: [0, 2, -2, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut" 
                      }}
                    >
                      <Icon icon="lucide:sparkles" className="text-white w-6 h-6" />
                    </motion.div>
                    
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {language === "en" ? "AI Recruitment Assistant" : "مساعد التوظيف الذكي"}
                      </h2>
                      <p className="text-blue-600">
                        {language === "en" ? "Making recruitment smarter and faster" : "جعل التوظيف أكثر ذكاءً وسرعة"}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    isIconOnly 
                    variant="flat" 
                    color="default"
                    radius="full"
                    className="bg-white/50 backdrop-blur-sm"
                    onPress={onClose}
                  >
                    <Icon icon="lucide:x" className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-12 gap-4 md:gap-6">
                  {/* Left Sidebar Categories - Improved responsiveness */}
                  <div className="col-span-12 md:col-span-4 lg:col-span-3">
                    <div className="bg-gradient-to-bl from-slate-50 to-blue-50 border border-gray-100 rounded-xl p-3 md:p-4">
                      <h3 className="text-sm font-medium text-gray-500 mb-3 px-1 md:px-2">
                        {language === "en" ? "CATEGORIES" : "الفئات"}
                      </h3>
                      
                      <div className="space-y-1">
                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            variant="flat"
                            color={selectedCategory === category.id ? "primary" : "default"}
                            className={`w-full justify-start text-left truncate ${
                              selectedCategory === category.id ? "bg-blue-100 text-blue-600" : "bg-transparent"
                            }`}
                            startContent={<Icon icon={category.icon} className="w-4 h-4 flex-shrink-0" />}
                            onPress={() => setSelectedCategory(category.id)}
                          >
                            <span className="truncate">
                              {category.name[language]}
                            </span>
                          </Button>
                        ))}
                      </div>
                      
                      <Divider className="my-4" />
                      
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 shadow-lg text-white">
                        <div className="flex items-center mb-2">
                          <Icon icon="lucide:zap" className="w-4 h-4 mr-2" />
                          <h4 className="font-medium">
                            {language === "en" ? "Pro Tip" : "نصيحة احترافية"}
                          </h4>
                        </div>
                        <p className="text-sm text-blue-100">
                          {language === "en" 
                            ? "Try our new Diversity & Inclusion Insights workflow to improve your hiring metrics!"
                            : "جرب سير عمل رؤى التنوع والشمول الجديد لتحسين مقاييس التوظيف لديك!"
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Main Content Area - Improved responsiveness */}
                  <div className="col-span-12 md:col-span-8 lg:col-span-9">
                    <AnimatePresence mode="wait">
                      {!activeWorkflow ? (
                        <motion.div
                          key="workflow-grid"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                            {filteredWorkflows.map((workflow) => (
                              <Card
                                key={workflow.id}
                                isPressable
                                onPress={() => handleRunWorkflow(workflow.id)}
                                className="border border-gray-100 overflow-visible"
                              >
                                <div className="p-4 md:p-5 relative">
                                  <div className={`w-12 h-12 rounded-lg ${workflow.color} flex items-center justify-center shadow-lg mb-3`}>
                                    <Icon icon={workflow.icon} className="text-white w-6 h-6" />
                                  </div>
                                  
                                  <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-gray-900">
                                      {workflow.title[language]}
                                    </h3>
                                    
                                    {workflow.status && (
                                      <div className="absolute top-4 right-4">
                                        {getStatusBadge(workflow.status)}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <p className="text-gray-500 text-sm mb-4">
                                    {workflow.description[language]}
                                  </p>
                                  
                                  <div className="flex justify-end">
                                    <Button
                                      size="sm"
                                      color="primary"
                                      variant="flat"
                                      endContent={<Icon icon="lucide:arrow-right" className="w-4 h-4" />}
                                    >
                                      {language === "en" ? "Run Workflow" : "تشغيل سير العمل"}
                                    </Button>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="workflow-detail"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
                        >
                          {/* Active Workflow Detail */}
                          <div className="flex items-center mb-6">
                            <Button
                              size="sm"
                              variant="light"
                              className="mr-4"
                              startContent={<Icon icon="lucide:arrow-left" className="w-4 h-4" />}
                              onPress={handleReset}
                            >
                              {language === "en" ? "Back" : "رجوع"}
                            </Button>
                            
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-lg ${workflows.find(w => w.id === activeWorkflow)?.color} flex items-center justify-center mr-4`}>
                                <Icon icon={workflows.find(w => w.id === activeWorkflow)?.icon || ""} className="text-white w-5 h-5" />
                              </div>
                              
                              <div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                  {workflows.find(w => w.id === activeWorkflow)?.title[language]}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {workflows.find(w => w.id === activeWorkflow)?.description[language]}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Workflow Steps */}
                          {workflows.find(w => w.id === activeWorkflow)?.steps && (
                            <div className="mb-6">
                              <h4 className="font-medium text-gray-700 mb-3">
                                {language === "en" ? "Workflow Steps" : "خطوات سير العمل"}
                              </h4>
                              
                              <div className="space-y-2">
                                {workflows.find(w => w.id === activeWorkflow)?.steps?.map((step, index) => (
                                  <div key={`step-${index}`} className="flex items-center p-3 rounded-lg bg-gray-50">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                                      {index + 1}
                                    </div>
                                    <span>{step[language]}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Generation Area */}
                          <div className="mt-6 border-t border-gray-100 pt-6">
                            <h4 className="font-medium text-gray-700 mb-3">
                              {language === "en" ? "AI Generation" : "إنشاء الذكاء الاصطناعي"}
                            </h4>
                            
                            {isGenerating ? (
                              <div className="space-y-4">
                                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-blue-600 rounded-full"
                                    style={{ width: `${generationProgress}%` }}
                                  />
                                </div>
                                
                                <div className="flex justify-between text-sm text-gray-500">
                                  <span>
                                    {language === "en" ? "Generating..." : "جارٍ الإنشاء..."}
                                  </span>
                                  <span>{Math.round(generationProgress)}%</span>
                                </div>
                                
                                <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 flex items-center">
                                  <div className="mr-3">
                                    <motion.div 
                                      className="w-8 h-8 rounded-full bg-blue-500"
                                      animate={{ 
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.8, 1]
                                      }}
                                      transition={{ 
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut" 
                                      }}
                                    >
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Icon icon="lucide:brain-circuit" className="text-white w-4 h-4" />
                                      </div>
                                    </motion.div>
                                  </div>
                                  
                                  <div>
                                    <h5 className="font-medium">
                                      {language === "en" ? "AI is analyzing data" : "الذكاء الاصطناعي يحلل البيانات"}
                                    </h5>
                                    <p className="text-sm text-gray-500">
                                      {language === "en" 
                                        ? "Processing inputs and optimizing output..." 
                                        : "معالجة المدخلات وتحسين المخرجات..."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              generationResult ? (
                                <div className="space-y-4">
                                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-5">
                                    <div className="flex items-center mb-3">
                                      <div className="bg-blue-600 rounded-full p-1 mr-3">
                                        <Icon icon="lucide:check" className="text-white w-4 h-4" />
                                      </div>
                                      <h5 className="font-medium text-blue-800">
                                        {language === "en" ? "Generation Complete" : "اكتمل الإنشاء"}
                                      </h5>
                                    </div>
                                    
                                    <p className="text-blue-900">
                                      {generationResult}
                                    </p>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-2">
                                    <Button
                                      color="primary"
                                      variant="solid"
                                      className="bg-gradient-to-r from-blue-600 to-blue-700 border-none"
                                      startContent={<Icon icon="lucide:download" className="w-4 h-4" />}
                                    >
                                      {language === "en" ? "Download Result" : "تنزيل النتيجة"}
                                    </Button>
                                    
                                    <Button
                                      color="primary"
                                      variant="flat"
                                      startContent={<Icon icon="lucide:copy" className="w-4 h-4" />}
                                    >
                                      {language === "en" ? "Copy to Clipboard" : "نسخ إلى الحافظة"}
                                    </Button>
                                    
                                    <Button
                                      color="default"
                                      variant="flat"
                                      startContent={<Icon icon="lucide:refresh-cw" className="w-4 h-4" />}
                                      onPress={() => handleRunWorkflow(activeWorkflow)}
                                    >
                                      {language === "en" ? "Regenerate" : "إعادة الإنشاء"}
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-4">
                                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-5">
                                    {activeWorkflow === "job-desc-gen" ? (
                                      <div className="space-y-4">
                                        <h5 className="font-medium">
                                          {language === "en" ? "Job Description Generator" : "مولد الوصف الوظيفي"}
                                        </h5>
                                        
                                        <Accordion>
                                          <AccordionItem
                                            key="1"
                                            aria-label="Job Details"
                                            title={language === "en" ? "Job Details" : "تفاصيل الوظيفة"}
                                            startContent={<Icon icon="lucide:briefcase" className="w-4 h-4 text-blue-600" />}
                                          >
                                            <div className="pl-3">
                                              <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                  <span className="text-sm text-gray-700">{language === "en" ? "Job Title" : "المسمى الوظيفي"}</span>
                                                  <span className="text-sm font-medium">Senior Developer</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                  <span className="text-sm text-gray-700">{language === "en" ? "Department" : "القسم"}</span>
                                                  <span className="text-sm font-medium">Engineering</span>
                                                </div>
                                                <div className="flex items-center justify-between">
                                                  <span className="text-sm text-gray-700">{language === "en" ? "Experience Level" : "مستوى الخبرة"}</span>
                                                  <span className="text-sm font-medium">5+ years</span>
                                                </div>
                                              </div>
                                            </div>
                                          </AccordionItem>
                                          
                                          <AccordionItem
                                            key="2"
                                            aria-label="Skills & Requirements"
                                            title={language === "en" ? "Skills & Requirements" : "المهارات والمتطلبات"}
                                            startContent={<Icon icon="lucide:check-square" className="w-4 h-4 text-blue-600" />}
                                          >
                                            <div className="pl-3">
                                              <div className="space-y-2">
                                                <div className="flex items-center">
                                                  <Icon icon="lucide:check" className="w-4 h-4 text-green-500 mr-2" />
                                                  <span className="text-sm">React</span>
                                                </div>
                                                <div className="flex items-center">
                                                  <Icon icon="lucide:check" className="w-4 h-4 text-green-500 mr-2" />
                                                  <span className="text-sm">Node.js</span>
                                                </div>
                                                <div className="flex items-center">
                                                  <Icon icon="lucide:check" className="w-4 h-4 text-green-500 mr-2" />
                                                  <span className="text-sm">Cloud Platforms</span>
                                                </div>
                                                <div className="flex items-center">
                                                  <Icon icon="lucide:check" className="w-4 h-4 text-green-500 mr-2" />
                                                  <span className="text-sm">Team Leadership</span>
                                                </div>
                                              </div>
                                            </div>
                                          </AccordionItem>
                                          
                                          <AccordionItem
                                            key="3"
                                            aria-label="Tone & Style"
                                            title={language === "en" ? "Tone & Style" : "النبرة والأسلوب"}
                                            startContent={<Icon icon="lucide:pen-tool" className="w-4 h-4 text-blue-600" />}
                                          >
                                            <div className="pl-3">
                                              <div className="space-y-2">
                                                <div className="flex items-center">
                                                  <input type="radio" id="professional" name="tone" className="mr-2" defaultChecked />
                                                  <label htmlFor="professional" className="text-sm">{language === "en" ? "Professional" : "احترافي"}</label>
                                                </div>
                                                <div className="flex items-center">
                                                  <input type="radio" id="casual" name="tone" className="mr-2" />
                                                  <label htmlFor="casual" className="text-sm">{language === "en" ? "Casual" : "عادي"}</label>
                                                </div>
                                                <div className="flex items-center">
                                                  <input type="radio" id="enthusiastic" name="tone" className="mr-2" />
                                                  <label htmlFor="enthusiastic" className="text-sm">{language === "en" ? "Enthusiastic" : "متحمس"}</label>
                                                </div>
                                              </div>
                                            </div>
                                          </AccordionItem>
                                        </Accordion>
                                      </div>
                                    ) : (
                                      <div className="flex flex-col items-center justify-center py-8">
                                        <Icon icon={workflows.find(w => w.id === activeWorkflow)?.icon || ""} className="w-12 h-12 text-gray-300 mb-2" />
                                        <p className="text-gray-500 text-center">
                                          {language === "en" 
                                            ? "Configure workflow options and click 'Generate' to start" 
                                            : "قم بتكوين خيارات سير العمل والنقر على 'إنشاء' للبدء"}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  
                                  <Button
                                    color="primary"
                                    variant="solid"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 border-none justify-center"
                                    startContent={<Icon icon="lucide:sparkles" className="w-4 h-4" />}
                                    onPress={() => setIsGenerating(true)}
                                  >
                                    {language === "en" ? "Generate with AI" : "إنشاء باستخدام الذكاء الاصطناعي"}
                                  </Button>
                                </div>
                              )
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="border-t border-gray-100 flex justify-between items-center px-6 py-4">
              <Button 
                variant="light"
                color="default"
                onPress={onModalClose}
              >
                {language === "en" ? "Close" : "إغلاق"}
              </Button>
              <Button 
                color="primary"
                className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md"
              >
                {language === "en" ? "Apply Suggestions" : "تطبيق الاقتراحات"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};