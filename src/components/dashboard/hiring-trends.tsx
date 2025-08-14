import React from "react";
import { Icon } from "@iconify/react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { 
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Badge
} from "@heroui/react";

export const HiringTrends: React.FC = () => {
  const { language, direction } = useAppContext();
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("6m");
  const [isHiringPlanModalOpen, setIsHiringPlanModalOpen] = React.useState(false);
  const [activePlanTab, setActivePlanTab] = React.useState<string>("overview");

  const departments = [
    { key: "all", label: { en: "All Departments", ar: "جميع الأقسام" } },
    { key: "tech", label: { en: "Technology", ar: "التكنولوجيا" } },
    { key: "sales", label: { en: "Sales", ar: "المبيعات" } },
    { key: "hr", label: { en: "Human Resources", ar: "الموارد البشرية" } },
  ];

  const periods = [
    { key: "3m", label: { en: "Last 3 Months", ar: "آخر 3 أشهر" } },
    { key: "6m", label: { en: "Last 6 Months", ar: "آخر 6 أشهر" } },
    { key: "1y", label: { en: "Last Year", ar: "العام الماضي" } },
  ];

  // Enhanced chart data with clearer labels
  const chartData = [
    { month: "Jan", hired: 12, target: 15, label: { en: "Jan", ar: "يناير" } },
    { month: "Feb", hired: 19, target: 18, label: { en: "Feb", ar: "فبراير" } },
    { month: "Mar", hired: 14, target: 20, label: { en: "Mar", ar: "مارس" } },
    { month: "Apr", hired: 21, target: 22, label: { en: "Apr", ar: "أبريل" } },
    { month: "May", hired: 18, target: 25, label: { en: "May", ar: "مايو" } },
    { month: "Jun", hired: 16, target: 28, label: { en: "Jun", ar: "يونيو" } },
  ];

  const getMonthName = (month: string, lang: "en" | "ar") => {
    if (lang === "ar") {
      const arabicMonths: Record<string, string> = {
        "Jan": "يناير",
        "Feb": "فبراير",
        "Mar": "مارس",
        "Apr": "أبريل",
        "May": "مايو",
        "Jun": "يونيو",
        "Jul": "يوليو",
        "Aug": "أغسطس",
        "Sep": "سبتمبر",
        "Oct": "أكتوبر",
        "Nov": "نوفمبر",
        "Dec": "ديسمبر",
      };
      return arabicMonths[month] || month;
    }
    return month;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "success";
      case "inProgress": return "primary";
      case "notStarted": return "default";
      case "delayed": return "warning";
      case "atRisk": return "danger";
      default: return "default";
    }
  };

  const getStatusLabel = (status: string, lang: "en" | "ar") => {
    const statusLabels = {
      completed: { en: "Completed", ar: "مكتمل" },
      inProgress: { en: "In Progress", ar: "قيد التقدم" },
      notStarted: { en: "Not Started", ar: "لم يبدأ" },
      delayed: { en: "Delayed", ar: "متأخر" },
      atRisk: { en: "At Risk", ar: "في خطر" }
    };
    
    return statusLabels[status as keyof typeof statusLabels]?.[lang] || status;
  };

  const formatDate = (dateString: string, lang: "en" | "ar") => {
    const date = new Date(dateString);
    if (lang === "ar") {
      return new Intl.DateTimeFormat('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
    }
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "danger";
      case "medium": return "warning";
      case "low": return "success";
      default: return "default";
    }
  };

  const getRiskLabel = (level: string, lang: "en" | "ar") => {
    const riskLabels = {
      high: { en: "High", ar: "عالي" },
      medium: { en: "Medium", ar: "متوسط" },
      low: { en: "Low", ar: "منخفض" }
    };
    
    return riskLabels[level as keyof typeof riskLabels]?.[lang] || level;
  };

  // Hiring plan data
  const hiringPlanData = {
    overview: {
      totalPositions: 86,
      filledPositions: 28,
      inProgress: 24,
      notStarted: 34,
      timeline: "Q1-Q4 2023",
      budget: "$1.2M",
      departments: [
        { name: { en: "Technology", ar: "التكنولوجيا" }, target: 32, hired: 12, inProgress: 8 },
        { name: { en: "Sales", ar: "المبيعات" }, target: 18, hired: 7, inProgress: 6 },
        { name: { en: "Marketing", ar: "التسويق" }, target: 12, hired: 4, inProgress: 3 },
        { name: { en: "HR", ar: "الموارد البشرية" }, target: 8, hired: 2, inProgress: 2 },
        { name: { en: "Finance", ar: "المالية" }, target: 10, hired: 3, inProgress: 3 },
        { name: { en: "Operations", ar: "العمليات" }, target: 6, hired: 0, inProgress: 2 }
      ]
    },
    timeline: [
      { 
        phase: { en: "Planning", ar: "التخطيط" }, 
        status: "completed", 
        startDate: "2023-01-01", 
        endDate: "2023-01-31",
        activities: [
          { name: { en: "Budget Approval", ar: "الموافقة على الميزانية" }, status: "completed", owner: "Finance" },
          { name: { en: "Headcount Planning", ar: "تخطيط عدد الموظفين" }, status: "completed", owner: "HR" },
          { name: { en: "Role Definition", ar: "تعريف الأدوار" }, status: "completed", owner: "Department Heads" }
        ]
      },
      { 
        phase: { en: "Sourcing", ar: "البحث عن المرشحين" }, 
        status: "inProgress", 
        startDate: "2023-02-01", 
        endDate: "2023-09-30",
        activities: [
          { name: { en: "Job Posting", ar: "نشر الوظائف" }, status: "inProgress", owner: "Recruitment" },
          { name: { en: "Agency Engagement", ar: "التعاقد مع الوكالات" }, status: "inProgress", owner: "Procurement" },
          { name: { en: "Referral Program", ar: "برنامج الإحالة" }, status: "inProgress", owner: "HR" }
        ]
      },
      { 
        phase: { en: "Selection", ar: "الاختيار" }, 
        status: "inProgress", 
        startDate: "2023-02-15", 
        endDate: "2023-10-31",
        activities: [
          { name: { en: "Resume Screening", ar: "فرز السير الذاتية" }, status: "inProgress", owner: "Recruitment" },
          { name: { en: "Interviews", ar: "المقابلات" }, status: "inProgress", owner: "Hiring Managers" },
          { name: { en: "Assessments", ar: "التقييمات" }, status: "inProgress", owner: "Recruitment" }
        ]
      },
      { 
        phase: { en: "Offer & Onboarding", ar: "العرض والتأهيل" }, 
        status: "inProgress", 
        startDate: "2023-03-01", 
        endDate: "2023-12-15",
        activities: [
          { name: { en: "Offer Creation", ar: "إنشاء العروض" }, status: "inProgress", owner: "HR" },
          { name: { en: "Negotiations", ar: "المفاوضات" }, status: "inProgress", owner: "Hiring Managers" },
          { name: { en: "Onboarding", ar: "التأهيل" }, status: "inProgress", owner: "HR" }
        ]
      },
      { 
        phase: { en: "Evaluation", ar: "التقييم" }, 
        status: "notStarted", 
        startDate: "2023-06-01", 
        endDate: "2023-12-31",
        activities: [
          { name: { en: "90-Day Reviews", ar: "مراجعات 90 يوم" }, status: "notStarted", owner: "Hiring Managers" },
          { name: { en: "Hiring Process Review", ar: "مراجعة عملية التوظيف" }, status: "notStarted", owner: "HR" },
          { name: { en: "Budget Analysis", ar: "تحليل الميزانية" }, status: "notStarted", owner: "Finance" }
        ]
      }
    ],
    risks: [
      { 
        id: "risk1", 
        title: { en: "Budget Constraints", ar: "قيود الميزانية" }, 
        impact: "high", 
        probability: "medium",
        mitigation: { en: "Prioritize critical roles and phase hiring", ar: "إعطاء الأولوية للأدوار الحاسمة وتوظيف المراحل" }
      },
      { 
        id: "risk2", 
        title: { en: "Talent Shortage", ar: "نقص المواهب" }, 
        impact: "high", 
        probability: "high",
        mitigation: { en: "Expand sourcing channels and consider remote options", ar: "توسيع قنوات البحث والنظر في خيارات العمل عن بعد" }
      },
      { 
        id: "risk3", 
        title: { en: "Lengthy Hiring Process", ar: "عملية توظيف طويلة" }, 
        impact: "medium", 
        probability: "high",
        mitigation: { en: "Streamline approval workflows and interview scheduling", ar: "تبسيط سير عمل الموافقة وجدولة المقابلات" }
      },
      { 
        id: "risk4", 
        title: { en: "Salary Expectations Gap", ar: "فجوة توقعات الراتب" }, 
        impact: "medium", 
        probability: "medium",
        mitigation: { en: "Review compensation packages and adjust budget if necessary", ar: "مراجعة حزم التعويضات وتعديل الميزانية إذا لزم الأمر" }
      }
    ]
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full bg-white border border-gray-200 rounded-lg p-6 relative overflow-hidden"
    >
      {/* Add ambient glow for AI effect */}
      <motion.div 
        className="absolute -bottom-10 -left-10 h-40 w-40 bg-amber-300 opacity-5 rounded-full"
        style={{ filter: "blur(30px)" }}
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          {language === "en" ? "Hiring Trends" : "اتجاهات التوظيف"}
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat"
                size="sm"
                endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
              >
                {departments.find(d => d.key === selectedDepartment)?.label[language]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Department selection"
              selectionMode="single"
              selectedKeys={[selectedDepartment]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString();
                if (selected) setSelectedDepartment(selected);
              }}
            >
              {departments.map((dept) => (
                <DropdownItem key={dept.key}>
                  {dept.label[language]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          
          <Dropdown>
            <DropdownTrigger>
              <Button 
                variant="flat"
                size="sm"
                endContent={<Icon icon="lucide:chevron-down" className="w-4 h-4" />}
              >
                {periods.find(p => p.key === selectedPeriod)?.label[language]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Period selection"
              selectionMode="single"
              selectedKeys={[selectedPeriod]}
              onSelectionChange={(keys) => {
                const selected = Array.from(keys)[0]?.toString();
                if (selected) setSelectedPeriod(selected);
              }}
            >
              {periods.map((period) => (
                <DropdownItem key={period.key}>
                  {period.label[language]}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      {/* Chart Legend - Added for better understanding */}
      <div className="flex items-center justify-center mb-4 gap-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#0078ff] mr-2"></div>
          <span className="text-sm">
            {language === "en" ? "Actual Hires" : "التعيينات الفعلية"}
          </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-[#82ca9d] mr-2"></div>
          <span className="text-sm">
            {language === "en" ? "Hiring Targets" : "أهداف التوظيف"}
          </span>
        </div>
      </div>

      {/* Chart with improved labels */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorHired" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0078ff" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0078ff" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => getMonthName(value, language)}
              axisLine={false}
              tickLine={false}
              label={{ 
                value: language === "en" ? "Month" : "الشهر", 
                position: "insideBottom", 
                offset: -5,
                style: { textAnchor: 'middle', fill: '#666' }
              }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              label={{ 
                value: language === "en" ? "Number of Employees" : "عدد الموظفين", 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#666' }
              }}
            />
            <Tooltip 
              formatter={(value, name) => {
                const formattedName = name === "hired" 
                  ? language === "en" ? "Actual Hires" : "التعيينات الفعلية"
                  : language === "en" ? "Target Hires" : "أهداف التوظيف";
                return [value, formattedName];
              }}
              labelFormatter={(label) => getMonthName(label, language)}
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '10px'
              }}
            />
            <Area 
              type="monotone" 
              dataKey="hired" 
              stroke="#0078ff" 
              fillOpacity={1} 
              fill="url(#colorHired)" 
              name="hired"
              activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
            />
            <Area 
              type="monotone" 
              dataKey="target" 
              stroke="#82ca9d" 
              fillOpacity={1}
              fill="url(#colorTarget)" 
              name="target"
              strokeDasharray="5 5"
              activeDot={{ r: 6, strokeWidth: 1, stroke: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats - Added for better context */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-4">
        <div className="border border-gray-100 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-500">
            {language === "en" ? "Total Hires" : "إجمالي التعيينات"}
          </p>
          <p className="text-2xl font-semibold text-wise-blue">
            {chartData.reduce((sum, item) => sum + item.hired, 0)}
          </p>
        </div>
        <div className="border border-gray-100 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-500">
            {language === "en" ? "Total Target" : "إجمالي الأهداف"}
          </p>
          <p className="text-2xl font-semibold text-green-600">
            {chartData.reduce((sum, item) => sum + item.target, 0)}
          </p>
        </div>
        <div className="border border-gray-100 rounded-lg p-3 text-center">
          <p className="text-sm text-gray-500">
            {language === "en" ? "Achievement Rate" : "معدل الإنجاز"}
          </p>
          <p className="text-2xl font-semibold text-amber-500">
            {Math.round((chartData.reduce((sum, item) => sum + item.hired, 0) / 
              chartData.reduce((sum, item) => sum + item.target, 0)) * 100)}%
          </p>
        </div>
      </div>

      {/* AI Insight with clearer explanation - Enhanced */}
      <motion.div 
        className="bg-gradient-to-r from-amber-50 to-amber-100 border-l-4 border-amber-400 p-4 rounded-r-lg relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div 
          className="absolute -right-8 -bottom-8 h-24 w-24 bg-amber-400 opacity-5 rounded-full"
          style={{ filter: "blur(20px)" }}
          animate={{ 
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        
        <div className="flex relative z-10">
          <motion.div 
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut" 
            }}
            className="mr-2"
          >
            <Icon icon="lucide:sparkles" className="w-5 h-5 text-amber-500" />
          </motion.div>
          
          <div>
            <span className="font-medium text-amber-700">
              {language === "en" ? "AI Insight" : "رؤية الذكاء الاصطناعي"}:
            </span>
            <span className="text-sm text-amber-700 ml-1">
              {language === "en" 
                ? "You are on track to miss Q3 hiring targets by 9%. The gap is widening since April." 
                : "أنت على وشك أن تفوت أهداف التوظيف للربع الثالث بنسبة 9٪. الفجوة تتسع منذ أبريل."}
            </span>
          </div>
        </div>
        
        <div className="ml-7 mt-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="sm" 
              color="warning" 
              variant="flat"
              startContent={<Icon icon="lucide:trending-up" className="w-4 h-4" />}
              onPress={() => setIsHiringPlanModalOpen(true)}
              className="font-medium shadow-sm"
            >
              {language === "en" ? "View AI-Generated Hiring Plan" : "عرض خطة التوظيف التي تم إنشاؤها بالذكاء الاصطناعي"}
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Hiring Plan Modal */}
      <Modal 
        isOpen={isHiringPlanModalOpen} 
        onOpenChange={setIsHiringPlanModalOpen}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:clipboard-list" className="w-5 h-5 text-wise-blue" />
                  <span className="text-xl">
                    {language === "en" ? "Annual Hiring Plan" : "خطة التوظيف السنوية"}
                  </span>
                </div>
              </ModalHeader>
              
              <ModalBody>
                <Tabs 
                  selectedKey={activePlanTab}
                  onSelectionChange={setActivePlanTab as any}
                  color="primary"
                  variant="underlined"
                  classNames={{
                    tabList: "gap-6",
                    cursor: "w-full bg-wise-blue",
                    tab: "max-w-fit px-0 h-12"
                  }}
                >
                  <Tab 
                    key="overview" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:pie-chart" className="w-4 h-4" />
                        <span>{language === "en" ? "Overview" : "نظرة عامة"}</span>
                      </div>
                    }
                  >
                    <div className="space-y-6">
                      {/* Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {language === "en" ? "Total Positions" : "إجمالي المناصب"}
                            </span>
                            <div className="bg-wise-blue bg-opacity-10 p-2 rounded-full">
                              <Icon icon="lucide:users" className="w-5 h-5 text-wise-blue" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-2xl font-semibold">{hiringPlanData.overview.totalPositions}</span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {language === "en" ? "Filled" : "تم شغلها"}
                            </span>
                            <div className="bg-green-100 p-2 rounded-full">
                              <Icon icon="lucide:check-circle" className="w-5 h-5 text-green-600" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-2xl font-semibold">{hiringPlanData.overview.filledPositions}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({Math.round((hiringPlanData.overview.filledPositions / hiringPlanData.overview.totalPositions) * 100)}%)
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {language === "en" ? "In Progress" : "قيد التقدم"}
                            </span>
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Icon icon="lucide:loader" className="w-5 h-5 text-blue-600" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-2xl font-semibold">{hiringPlanData.overview.inProgress}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({Math.round((hiringPlanData.overview.inProgress / hiringPlanData.overview.totalPositions) * 100)}%)
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {language === "en" ? "Not Started" : "لم يبدأ"}
                            </span>
                            <div className="bg-gray-200 p-2 rounded-full">
                              <Icon icon="lucide:clock" className="w-5 h-5 text-gray-600" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="text-2xl font-semibold">{hiringPlanData.overview.notStarted}</span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({Math.round((hiringPlanData.overview.notStarted / hiringPlanData.overview.totalPositions) * 100)}%)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Plan Details */}
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-4">
                          {language === "en" ? "Plan Details" : "تفاصيل الخطة"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-500">
                                {language === "en" ? "Timeline" : "الجدول الزمني"}
                              </span>
                              <span className="font-medium">{hiringPlanData.overview.timeline}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                {language === "en" ? "Budget" : "الميزانية"}
                              </span>
                              <span className="font-medium">{hiringPlanData.overview.budget}</span>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-gray-500">
                                {language === "en" ? "Avg. Cost per Hire" : "متوسط تكلفة التوظيف"}
                              </span>
                              <span className="font-medium">$13,953</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">
                                {language === "en" ? "Avg. Time to Hire" : "متوسط وقت التوظيف"}
                              </span>
                              <span className="font-medium">32 days</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Department Breakdown */}
                      <div>
                        <h3 className="text-lg font-medium mb-4">
                          {language === "en" ? "Department Breakdown" : "تفصيل الأقسام"}
                        </h3>
                        <Table 
                          removeWrapper 
                          aria-label="Department hiring breakdown"
                          classNames={{
                            th: "bg-gray-50",
                            table: "border border-gray-200 rounded-lg overflow-hidden"
                          }}
                        >
                          <TableHeader>
                            <TableColumn>
                              {language === "en" ? "Department" : "القسم"}
                            </TableColumn>
                            <TableColumn className="text-right">
                              {language === "en" ? "Target" : "الهدف"}
                            </TableColumn>
                            <TableColumn className="text-right">
                              {language === "en" ? "Hired" : "تم التوظيف"}
                            </TableColumn>
                            <TableColumn className="text-right">
                              {language === "en" ? "In Progress" : "قيد التقدم"}
                            </TableColumn>
                            <TableColumn className="text-right">
                              {language === "en" ? "Remaining" : "المتبقي"}
                            </TableColumn>
                            <TableColumn>
                              {language === "en" ? "Progress" : "التقدم"}
                            </TableColumn>
                          </TableHeader>
                          <TableBody>
                            {hiringPlanData.overview.departments.map((dept, index) => (
                              <TableRow key={`dept-${index}`}>
                                <TableCell>
                                  <div className="font-medium">
                                    {language === "en" ? dept.name.en : dept.name.ar}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">{dept.target}</TableCell>
                                <TableCell className="text-right">{dept.hired}</TableCell>
                                <TableCell className="text-right">{dept.inProgress}</TableCell>
                                <TableCell className="text-right">{dept.target - dept.hired - dept.inProgress}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                      <div 
                                        className={`${
                                          dept.hired / dept.target > 0.8 ? "bg-green-500" : 
                                          dept.hired / dept.target > 0.5 ? "bg-blue-500" : 
                                          "bg-amber-500"
                                        } h-2 rounded-full`} 
                                        style={{ width: `${(dept.hired / dept.target) * 100}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs text-gray-500 whitespace-nowrap">
                                      {Math.round((dept.hired / dept.target) * 100)}%
                                    </span>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="timeline" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:calendar" className="w-4 h-4" />
                        <span>{language === "en" ? "Timeline" : "الجدول الزمني"}</span>
                      </div>
                    }
                  >
                    <div className="space-y-8">
                      {hiringPlanData.timeline.map((phase, index) => (
                        <div key={`phase-${index}`} className="relative">
                          {/* Timeline connector */}
                          {index < hiringPlanData.timeline.length - 1 && (
                            <div className="absolute left-3.5 top-10 bottom-0 w-0.5 bg-gray-200"></div>
                          )}
                          
                          <div className="flex gap-4">
                            {/* Timeline marker */}
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                              phase.status === "completed" ? "bg-green-100" :
                              phase.status === "inProgress" ? "bg-blue-100" :
                              "bg-gray-100"
                            }`}>
                              <Icon 
                                icon={
                                  phase.status === "completed" ? "lucide:check" :
                                  phase.status === "inProgress" ? "lucide:loader" :
                                  "lucide:clock"
                                } 
                                className={`w-4 h-4 ${
                                  phase.status === "completed" ? "text-green-600" :
                                  phase.status === "inProgress" ? "text-blue-600" :
                                  "text-gray-600"
                                }`} 
                              />
                            </div>
                            
                            {/* Timeline content */}
                            <div className="flex-1 pb-8">
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                <h3 className="text-lg font-medium">
                                  {language === "en" ? phase.phase.en : phase.phase.ar}
                                </h3>
                                <Badge 
                                  color={getStatusColor(phase.status)}
                                  variant="flat"
                                >
                                  {getStatusLabel(phase.status, language)}
                                </Badge>
                              </div>
                              
                              <div className="text-sm text-gray-500 mb-4">
                                {formatDate(phase.startDate, language)} - {formatDate(phase.endDate, language)}
                              </div>
                              
                              <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                <Table 
                                  removeWrapper
                                  hideHeader
                                  aria-label={`Activities for ${language === "en" ? phase.phase.en : phase.phase.ar} phase`}
                                >
                                  <TableHeader>
                                    <TableColumn>Activity</TableColumn>
                                    <TableColumn>Status</TableColumn>
                                    <TableColumn>Owner</TableColumn>
                                  </TableHeader>
                                  <TableBody>
                                    {phase.activities.map((activity, actIndex) => (
                                      <TableRow key={`activity-${index}-${actIndex}`}>
                                        <TableCell>
                                          <div className="font-medium">
                                            {language === "en" ? activity.name.en : activity.name.ar}
                                          </div>
                                        </TableCell>
                                        <TableCell>
                                          <Badge 
                                            color={getStatusColor(activity.status)}
                                            variant="flat"
                                            size="sm"
                                          >
                                            {getStatusLabel(activity.status, language)}
                                          </Badge>
                                        </TableCell>
                                        <TableCell>
                                          <div className="text-sm text-gray-600">
                                            {activity.owner}
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="risks" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:alert-triangle" className="w-4 h-4" />
                        <span>{language === "en" ? "Risks & Mitigation" : "المخاطر والتخفيف"}</span>
                      </div>
                    }
                  >
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">
                          {language === "en" ? "Risk Assessment" : "تقييم المخاطر"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {language === "en" 
                            ? "Key risks that may impact the hiring plan and mitigation strategies." 
                            : "المخاطر الرئيسية التي قد تؤثر على خطة التوظيف واستراتيجيات التخفيف."}
                        </p>
                      </div>
                      
                      <Table 
                        removeWrapper
                        aria-label="Hiring plan risks and mitigation strategies"
                        classNames={{
                          th: "bg-gray-50",
                          table: "border border-gray-200 rounded-lg overflow-hidden"
                        }}
                      >
                        <TableHeader>
                          <TableColumn>
                            {language === "en" ? "Risk" : "المخاطر"}
                          </TableColumn>
                          <TableColumn>
                            {language === "en" ? "Impact" : "التأثير"}
                          </TableColumn>
                          <TableColumn>
                            {language === "en" ? "Probability" : "الاحتمالية"}
                          </TableColumn>
                          <TableColumn>
                            {language === "en" ? "Mitigation Strategy" : "استراتيجية التخفيف"}
                          </TableColumn>
                        </TableHeader>
                        <TableBody>
                          {hiringPlanData.risks.map((risk) => (
                            <TableRow key={risk.id}>
                              <TableCell>
                                <div className="font-medium">
                                  {language === "en" ? risk.title.en : risk.title.ar}
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  color={getRiskColor(risk.impact)}
                                  variant="flat"
                                >
                                  {getRiskLabel(risk.impact, language)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  color={getRiskColor(risk.probability)}
                                  variant="flat"
                                >
                                  {getRiskLabel(risk.probability, language)}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {language === "en" ? risk.mitigation.en : risk.mitigation.ar}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
                      <div className="bg-wise-light-blue border-l-4 border-wise-blue p-4 rounded-r-lg">
                        <div className="flex items-start">
                          <Icon icon="lucide:lightbulb" className="w-5 h-5 text-wise-blue mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-wise-blue">
                              {language === "en" ? "AI Recommendation" : "توصية الذكاء الاصطناعي"}
                            </h4>
                            <p className="text-sm text-gray-700 mt-1">
                              {language === "en" 
                                ? "Based on current market conditions, consider expanding your remote hiring options to address the talent shortage risk." 
                                : "بناءً على ظروف السوق الحالية، فكر في توسيع خيارات التوظيف عن بعد لمعالجة مخاطر نقص المواهب."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </ModalBody>
              
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  {language === "en" ? "Close" : "إغلاق"}
                </Button>
                <Button 
                  color="primary"
                  startContent={<Icon icon="lucide:download" className="w-4 h-4" />}
                >
                  {language === "en" ? "Export Plan" : "تصدير الخطة"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.section>
  );
};