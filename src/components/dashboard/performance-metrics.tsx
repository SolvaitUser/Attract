import React from "react";
import { Icon } from "@iconify/react";
import { 
  Tooltip, 
  Progress, 
  Card, 
  Badge,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button
} from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis
} from "recharts";

interface HistoricalDataPoint {
  date: string;
  value: number;
}

interface MetricItem {
  key: string;
  label: { en: string; ar: string };
  value: string | number;
  target?: string | number;
  progress?: number;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  aiFlag?: { en: string; ar: string };
  description?: { en: string; ar: string };
  color?: "success" | "primary" | "danger" | "warning";
  historicalData?: HistoricalDataPoint[];
  calculation?: { en: string; ar: string };
  benchmarks?: { industry: number; company: number };
  previousValue?: string | number;
}

const InfoTooltip = ({ content }: { content: string }) => (
  <Tooltip
    content={content}
    placement="right"
    classNames={{
      content: "max-w-xs text-tiny py-2 px-3 bg-background"
    }}
  >
    <button className="cursor-help focus:outline-none">
      <Icon icon="lucide:info" className="w-4 h-4 text-gray-400" />
    </button>
  </Tooltip>
);

const BenchmarkLegend: React.FC<{language: string}> = ({ language }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5 }}
    className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-2 bg-gray-50 p-2 rounded-lg"
  >
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full bg-gray-600 mr-1"></div>
      <span>{language === "en" ? "Industry Average" : "متوسط الصناعة"}</span>
    </div>
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full bg-blue-600 mr-1"></div>
      <span>{language === "en" ? "Company Target" : "هدف الشركة"}</span>
    </div>
    <div className="flex items-center">
      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
      <span>{language === "en" ? "Current Value" : "القيمة الحالية"}</span>
    </div>
  </motion.div>
);

export const PerformanceMetrics: React.FC = () => {
  const { language, direction } = useAppContext();
  const [isSourcesModalOpen, setIsSourcesModalOpen] = React.useState(false);

  const metrics: MetricItem[] = [
    {
      key: "time-to-hire",
      label: { en: "Time-to-Hire", ar: "وقت التوظيف" },
      value: "32 days",
      target: "30 days",
      progress: 94,
      trend: "down",
      trendValue: "5%",
      description: { 
        en: "Average time from job posting to offer acceptance", 
        ar: "متوسط الوقت من نشر الوظيفة إلى قبول العرض" 
      },
      color: "primary",
      historicalData: [
        { date: "Jan", value: 38 },
        { date: "Feb", value: 35 },
        { date: "Mar", value: 33 },
        { date: "Apr", value: 32 },
        { date: "May", value: 32 },
        { date: "Jun", value: 32 },
      ],
      calculation: {
        en: "Sum of days from job posting to offer acceptance ÷ Number of hires",
        ar: "مجموع الأيام من نشر الوظيفة إلى قبول العرض ÷ عدد التوظيفات"
      },
      benchmarks: { industry: 38, company: 30 },
      previousValue: "34 days"
    },
    {
      key: "offer-acceptance",
      label: { en: "Offer Acceptance Rate", ar: "معدل قبول العروض" },
      value: "67%",
      target: "80%",
      progress: 67,
      trend: "down",
      trendValue: "13%",
      aiFlag: { 
        en: "Offer acceptance rate dropped by 13%", 
        ar: "انخفض معدل قبول العروض بنسبة 13٪" 
      },
      description: { 
        en: "Percentage of candidates who accepted job offers", 
        ar: "النسبة المئوية للمرشحين الذين قبلوا عروض العمل" 
      },
      color: "danger",
      historicalData: [
        { date: "Jan", value: 80 },
        { date: "Feb", value: 77 },
        { date: "Mar", value: 75 },
        { date: "Apr", value: 72 },
        { date: "May", value: 70 },
        { date: "Jun", value: 67 },
      ],
      calculation: {
        en: "Number of offers accepted ÷ Total number of offers made × 100",
        ar: "عدد العروض المقبولة ÷ إجمالي عدد العروض المقدمة × 100"
      },
      benchmarks: { industry: 75, company: 80 },
      previousValue: "80%"
    },
    {
      key: "saudization",
      label: { en: "Saudization Compliance", ar: "الامتثال للسعودة" },
      value: "92%",
      target: "85%",
      progress: 92,
      trend: "up",
      trendValue: "7%",
      description: { 
        en: "Compliance with national employment regulations", 
        ar: "الامتثال للوائح التوظيف الوطنية" 
      },
      color: "success",
      historicalData: [
        { date: "Jan", value: 85 },
        { date: "Feb", value: 86 },
        { date: "Mar", value: 87 },
        { date: "Apr", value: 89 },
        { date: "May", value: 90 },
        { date: "Jun", value: 92 },
      ],
      calculation: {
        en: "Number of Saudi employees ÷ Total number of employees × 100",
        ar: "عدد الموظفين السعوديين ÷ إجمالي عدد الموظفين × 100"
      },
      benchmarks: { industry: 85, company: 85 }
    },
    {
      key: "cost-per-hire",
      label: { en: "Cost-per-Hire", ar: "تكلفة التوظيف" },
      value: "$4,250",
      target: "$5,000",
      progress: 85,
      trend: "up",
      trendValue: "15%",
      description: { 
        en: "Average cost to fill a position including advertising and agency fees", 
        ar: "متوسط تكلفة شغل وظيفة بما في ذلك الإعلان ورسوم الوكالة" 
      },
      color: "success",
      historicalData: [
        { date: "Jan", value: 38 },
        { date: "Feb", value: 35 },
        { date: "Mar", value: 33 },
        { date: "Apr", value: 32 },
        { date: "May", value: 32 },
        { date: "Jun", value: 32 },
      ],
      calculation: {
        en: "Sum of days from job posting to offer acceptance ÷ Number of hires",
        ar: "مجموع الأيام من نشر الوظيفة إلى قبول العرض ÷ عدد التوظيفات"
      },
      benchmarks: { industry: 38, company: 30 },
      previousValue: "34 days"
    },
    {
      key: "requisitions",
      label: { en: "Active vs Filled Requisitions", ar: "الطلبات النشطة مقابل المملوءة" },
      value: "24/38",
      progress: 63,
      trend: "neutral",
      description: { 
        en: "Number of active job requisitions compared to filled positions", 
        ar: "عدد طلبات الوظائف النشطة مقارنة بالمناصب التي تم شغلها" 
      },
      color: "warning",
      historicalData: [
        { date: "Jan", value: 45 },
        { date: "Feb", value: 52 },
        { date: "Mar", value: 58 },
        { date: "Apr", value: 65 },
        { date: "May", value: 60 },
        { date: "Jun", value: 63 },
      ],
      calculation: {
        en: "Number of filled requisitions ÷ Total number of requisitions × 100",
        ar: "عدد الطلبات المملوءة ÷ إجمالي عدد الطلبات × 100"
      },
      benchmarks: { industry: 70, company: 75 },
      previousValue: "18/32 (56%)"
    },
    {
      key: "quality-of-hire",
      label: { en: "Quality of Hire", ar: "جودة التوظيف" },
      value: "78%",
      target: "85%",
      progress: 78,
      trend: "up",
      trendValue: "3%",
      description: { 
        en: "Performance rating of new hires after 90 days", 
        ar: "تقييم أداء الموظفين الجدد بعد 90 يومًا" 
      },
      color: "primary",
      historicalData: [
        { date: "Jan", value: 72 },
        { date: "Feb", value: 73 },
        { date: "Mar", value: 74 },
        { date: "Apr", value: 75 },
        { date: "May", value: 76 },
        { date: "Jun", value: 78 },
      ],
      calculation: {
        en: "Average performance rating of new hires (scale 1-5) ÷ 5 × 100",
        ar: "متوسط تقييم أداء الموظفين الجدد (مقياس 1-5) ÷ 5 × 100"
      },
      benchmarks: { industry: 75, company: 85 },
      aiFlag: { 
        en: "While improving, quality of hire is still below target. Consider enhancing onboarding program.", 
        ar: "على الرغم من التحسن، لا تزال جودة التوظيف أقل من الهدف. ضع في اعتبارك تعزيز برنامج التأهيل." 
      }
    },
    {
      key: "interview-to-offer",
      label: { en: "Interview to Offer Ratio", ar: "نسبة المقابلة إلى العرض" },
      value: "4.2:1",
      target: "3:1",
      progress: 71,
      trend: "down",
      trendValue: "8%",
      description: { 
        en: "Number of interviews conducted per offer made", 
        ar: "عدد المقابلات التي أجريت لكل عرض تم تقديمه" 
      },
      color: "warning",
      historicalData: [
        { date: "Jan", value: 5.3 },
        { date: "Feb", value: 5.0 },
        { date: "Mar", value: 4.8 },
        { date: "Apr", value: 4.5 },
        { date: "May", value: 4.3 },
        { date: "Jun", value: 4.2 },
      ],
      calculation: {
        en: "Total number of interviews conducted ÷ Number of offers extended",
        ar: "إجمالي عدد المقابلات التي أجريت ÷ عدد العروض المقدمة"
      },
      benchmarks: { industry: 4, company: 3 }
    }
  ];

  const benchmarkSources = [
    {
      id: "source-1",
      name: { en: "HRMS Integrated Analytics", ar: "التحليلات المتكاملة لنظام إدارة الموارد البشرية" },
      description: { 
        en: "Aggregated data from our HRMS system across 200+ companies in the region", 
        ar: "البيانات المجمعة من نظام إدارة الموارد البشرية لدينا عبر أكثر من 200 شركة في المنطقة" 
      },
      lastUpdate: "2023-Q2",
      metricsProvided: ["time-to-hire", "offer-acceptance", "saudization", "cost-per-hire"],
      reliability: "high"
    },
    {
      id: "source-2",
      name: { en: "Mercer Global Talent Trends", ar: "اتجاهات المواهب العالمية من ميرسر" },
      description: { 
        en: "Annual report on global recruiting benchmarks and talent acquisition trends", 
        ar: "تقرير سنوي عن معايير التوظيف العالمية واتجاهات اكتساب المواهب" 
      },
      lastUpdate: "2023",
      metricsProvided: ["time-to-hire", "cost-per-hire", "quality-of-hire"],
      reliability: "high"
    },
    {
      id: "source-3",
      name: { en: "MENA HR Analytics Forum", ar: "منتدى تحليلات الموارد البشرية في الشرق الأوسط وشمال أفريقيا" },
      description: { 
        en: "Regional consortium of HR departments sharing anonymized performance data", 
        ar: "اتحاد إقليمي لأقسام الموارد البشرية يشارك بيانات الأداء المجهولة" 
      },
      lastUpdate: "2023-Q1",
      metricsProvided: ["requisitions", "saudization", "interview-to-offer", "quality-of-hire"],
      reliability: "medium"
    },
    {
      id: "source-4",
      name: { en: "Saudi Ministry of Labor Reports", ar: "تقارير وزارة العمل السعودية" },
      description: { 
        en: "Official government statistics on employment, nationalization and workforce trends", 
        ar: "إحصاءات حكومية رسمية عن التوظيف والتوطين واتجاهات القوى العاملة" 
      },
      lastUpdate: "2022",
      metricsProvided: ["saudization"],
      reliability: "high"
    },
    {
      id: "source-5",
              name: { en: "Attract Recruitment Internal Benchmarks", ar: "معايير التوظيف الداخلية في Attract" },
      description: { 
        en: "Historical performance data from our own recruitment operations", 
        ar: "بيانات الأداء التاريخية من عمليات التوظيف الخاصة بنا" 
      },
      lastUpdate: "2023-Q2",
      metricsProvided: ["all"],
      reliability: "high"
    }
  ];

  const getMetricLabel = (metricKey: string) => {
    const metricLabels: Record<string, { en: string; ar: string }> = {
      "time-to-hire": { en: "Time-to-Hire", ar: "وقت التوظيف" },
      "offer-acceptance": { en: "Offer Acceptance Rate", ar: "معدل قبول العروض" },
      "saudization": { en: "Saudization Compliance", ar: "الامتثال للسعودة" },
      "cost-per-hire": { en: "Cost-per-Hire", ar: "تكلفة التوظيف" },
      "requisitions": { en: "Active vs Filled Requisitions", ar: "الطلبات النشطة مقابل المملوءة" },
      "quality-of-hire": { en: "Quality of Hire", ar: "جودة التوظيف" },
      "interview-to-offer": { en: "Interview to Offer Ratio", ar: "نسبة المقابلة إلى العرض" },
      "all": { en: "All Metrics", ar: "جميع المقاييس" }
    };
    
    return metricLabels[metricKey] || { en: metricKey, ar: metricKey };
  };

  const getReliabilityBadge = (reliability: string) => {
    const colors = {
      high: "success",
      medium: "warning",
      low: "danger"
    };
    
    return (
      <Badge 
        color={colors[reliability as keyof typeof colors] as any} 
        variant="flat"
        size="sm"
      >
        {language === "en" 
          ? reliability.charAt(0).toUpperCase() + reliability.slice(1)
          : reliability === "high" ? "عالية" : reliability === "medium" ? "متوسطة" : "منخفضة"
        }
      </Badge>
    );
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <Card className="shadow-md border-0 overflow-hidden relative">
        {/* Enhanced ambient AI visual effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-0 left-0 h-64 w-64 bg-blue-500 opacity-[0.03] rounded-full"
            style={{ filter: "blur(60px)" }}
            animate={{ 
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          
          {/* Neural network subtle background */}
          <svg className="w-full h-full absolute inset-0" style={{ opacity: 0.02 }}>
            <pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect width="40" height="40" fill="none" />
              <circle cx="20" cy="20" r="1" fill="#3B82F6" />
              {[0, 40].map((pos, i) => (
                <React.Fragment key={`grid-point-${i}`}>
                  <circle cx={pos} cy="0" r="1" fill="#3B82F6" />
                  <circle cx={pos} cy="40" r="1" fill="#3B82F6" />
                  <circle cx="0" cy={pos} r="1" fill="#3B82F6" />
                  <circle cx="40" cy={pos} r="1" fill="#3B82F6" />
                </React.Fragment>
              ))}
              <path d="M0 0l20 20M0 40l20-20M40 0l-20 20M40 40l-20-20" stroke="#3B82F6" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#neural-grid)" />
          </svg>

          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={`perf-particle-${i}`}
              className="absolute w-2 h-2 rounded-full bg-blue-500"
              style={{
                opacity: 0.08,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50
                ],
                y: [
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50,
                  Math.random() * 100 - 50
                ],
              }}
              transition={{
                duration: 30 + Math.random() * 20,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <BenchmarkLegend language={language} />
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-gray-800">
                {language === "en" ? "Performance Metrics" : "مؤشرات الأداء"}
              </h2>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center text-xs text-gray-600 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
                <Icon icon="lucide:database" className="w-3.5 h-3.5 mr-1.5 text-gray-500" />
                <span>{language === "en" ? "Industry benchmarks:" : "معايير الصناعة:"}</span>
                <InfoTooltip content={language === "en" 
                  ? "Industry benchmarks are collected from quarterly HR analytics reports, HRMS integrated data, and leading industry research publications. Data is updated quarterly and validated against regional standards." 
                  : "يتم جمع معايير الصناعة من تقارير تحليلات الموارد البشرية الفصلية والبيانات المتكاملة من نظام إدارة الموارد البشرية ومنشورات البحوث الرائدة في الصناعة. يتم تحديث البيانات كل ربع سنة والتحقق من صحتها مقابل المعايير الإقليمية."
                } />
                <span className="ml-1 font-medium">
                  <Link 
                    className="text-blue-600 hover:underline" 
                    onPress={() => setIsSourcesModalOpen(true)}
                  >
                    {language === "en" ? "View sources" : "عرض المصادر"}
                  </Link>
                </span>
              </div>

              <Tooltip content={language === "en" ? "AI-Powered Real-time Data" : "بيانات في الوقت الحقيقي مدعومة بالذكاء الاصطناعي"}>
                <div className="flex items-center text-sm text-gray-500">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                    }}
                    transition={{ 
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear" 
                    }}
                  >
                    <Icon icon="lucide:refresh-cw" className="w-4 h-4 mr-1 text-blue-500" />
                  </motion.div>
                  <span>{language === "en" ? "AI-Analyzed Data" : "بيانات محللة بالذكاء الاصطناعي"}</span>
                </div>
              </Tooltip>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {metrics.map((metric, index) => (
              <motion.div 
                key={metric.key} 
                className="border border-gray-100 rounded-lg p-4 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -2, boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)" }}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="w-full md:w-1/4">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-700">
                        {language === "en" ? metric.label.en : metric.label.ar}
                      </h3>
                      <Tooltip content={language === "en" ? metric.description?.en : metric.description?.ar}>
                        <Icon icon="lucide:info" className="w-4 h-4 text-gray-400 ml-1 cursor-help" />
                      </Tooltip>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                      {language === "en" ? metric.description?.en : metric.description?.ar}
                    </p>
                  </div>
                  
                  <div className="w-full md:w-1/5 flex items-center">
                    <motion.span 
                      className="text-xl font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    >
                      {metric.value}
                    </motion.span>
                    {metric.target && (
                      <Tooltip content={language === "en" ? "Target" : "الهدف"}>
                        <span className="text-sm text-gray-500 ml-2">
                          / {metric.target}
                        </span>
                      </Tooltip>
                    )}
                    
                    {metric.previousValue && (
                      <Tooltip 
                        content={language === "en" ? "Previous Value" : "القيمة السابقة"}
                        className="ml-2"
                      >
                        <div className="flex items-center text-xs bg-gray-100 rounded-full px-2 py-0.5">
                          <span className="text-gray-600">
                            {language === "en" ? "was" : "كان"} {metric.previousValue}
                          </span>
                        </div>
                      </Tooltip>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/3">
                    {metric.progress !== undefined && (
                      <div className="space-y-1">
                        <div className="relative h-16 mb-8">
                          {metric.benchmarks && (
                            <>
                              <div 
                                className="absolute top-0 flex items-center gap-1"
                                style={{ left: `${Math.min(metric.benchmarks.industry, 90)}%` }}
                              >
                                <div className="w-2 h-2 rounded-full bg-gray-600 border border-white"></div>
                                <div className="px-1.5 py-0.5 bg-gray-700 text-white text-[10px] rounded whitespace-nowrap">
                                  <span className="font-medium">{metric.benchmarks.industry}%</span>
                                  <span className="ml-1 text-[9px] text-gray-200">{language === "en" ? "Industry" : "الصناعة"}</span>
                                </div>
                              </div>
                              
                              <div 
                                className="absolute top-5 flex items-center gap-1"
                                style={{ left: `${Math.min(metric.benchmarks.company, 88)}%` }}
                              >
                                <div className="w-2 h-2 rounded-full bg-blue-600 border border-white"></div>
                                <div className="px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded whitespace-nowrap">
                                  <span className="font-medium">{metric.benchmarks.company}%</span>
                                  <span className="ml-1 text-[9px] text-blue-100">{language === "en" ? "Target" : "الهدف"}</span>
                                </div>
                              </div>
                              
                              <div className="absolute bottom-0 w-full h-8">
                                <div 
                                  className="absolute bottom-0 border-l border-dashed border-gray-500 h-full"
                                  style={{ left: `${metric.benchmarks.industry}%` }}
                                ></div>
                                <div 
                                  className="absolute bottom-0 border-l border-dashed border-blue-600 h-full"
                                  style={{ left: `${metric.benchmarks.company}%` }}
                                ></div>
                                <div 
                                  className="absolute bottom-0 border-l border-green-500 h-full"
                                  style={{ left: `${metric.progress}%` }}
                                ></div>
                              </div>
                            </>
                          )}
                          
                          <div className="absolute bottom-0 w-full">
                            <Progress 
                              value={metric.progress} 
                              color={metric.color || (metric.progress >= 80 ? "success" : metric.progress >= 60 ? "primary" : "danger")}
                              className="h-2"
                              aria-label={`${language === "en" ? metric.label.en : metric.label.ar} progress`}
                            />
                            
                            {metric.benchmarks && (
                              <>
                                <div 
                                  className="absolute -top-1"
                                  style={{ left: `${metric.benchmarks.industry}%`, transform: 'translateX(-50%)' }}
                                >
                                  <div className="w-2 h-2 rounded-full bg-gray-600 border border-white"></div>
                                </div>
                                
                                <div 
                                  className="absolute -top-1"
                                  style={{ left: `${metric.benchmarks.company}%`, transform: 'translateX(-50%)' }}
                                >
                                  <div className="w-2 h-2 rounded-full bg-blue-600 border border-white"></div>
                                </div>
                              </>
                            )}
                          </div>
                          
                          <div 
                            className="absolute -bottom-7 flex items-center gap-1"
                            style={{ 
                              left: `${Math.min(Math.max(metric.progress, 10), 90)}%`,
                              transform: 'translateX(-50%)'
                            }}
                          >
                            <div className="flex items-center">
                              <div className="px-1.5 py-0.5 bg-green-500 text-white text-[10px] rounded whitespace-nowrap">
                                <span className="font-medium">{metric.progress}%</span>
                                <span className="ml-1 text-[9px] text-green-50">{language === "en" ? "Current" : "الحالي"}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>0%</span>
                          <span>100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="w-full md:w-1/6 flex justify-end">
                    {metric.trend && (
                      <Badge 
                        color={
                          metric.trend === "up" 
                            ? "success" 
                            : metric.trend === "down" 
                              ? "danger" 
                              : "default"
                        }
                        variant="flat"
                        className="flex items-center gap-1"
                      >
                        <motion.div
                          animate={{ 
                            y: metric.trend === "up" ? [0, -2, 0] : 
                                metric.trend === "down" ? [0, 2, 0] : 0
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut" 
                          }}
                        >
                          <Icon 
                            icon={
                              metric.trend === "up" 
                                ? "lucide:trending-up" 
                                : metric.trend === "down" 
                                  ? "lucide:trending-down" 
                                  : "lucide:minus"
                            } 
                            className="w-3 h-3" 
                          />
                        </motion.div>
                        <span>{metric.trendValue}</span>
                      </Badge>
                    )}
                  </div>
                </div>
                
                {metric.aiFlag && (
                  <motion.div 
                    className="mt-3 bg-red-50 border-l-4 border-red-400 p-3 rounded-r-lg"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <div className="flex">
                      <motion.div
                        animate={{ 
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut" 
                        }}
                        className="mr-2"
                      >
                        <Icon icon="lucide:sparkles" className="w-5 h-5 text-red-500" />
                      </motion.div>
                      <span className="text-sm text-red-700 font-medium">
                        {language === "en" ? metric.aiFlag.en : metric.aiFlag.ar}
                      </span>
                    </div>
                  </motion.div>
                )}
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {metric.calculation && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-xs font-medium text-gray-700 mb-1 flex items-center">
                        <Icon icon="lucide:calculator" className="w-3 h-3 mr-1" />
                        {language === "en" ? "How it's calculated:" : "كيف يتم احتسابه:"}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {language === "en" ? metric.calculation.en : metric.calculation.ar}
                      </p>
                    </div>
                  )}
                  
                  {metric.historicalData && (
                    <div className="bg-white rounded-lg border border-gray-100 p-3">
                      <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                        <Icon icon="lucide:trending-up" className="w-3 h-3 mr-1" />
                        {language === "en" ? "6-Month Trend:" : "اتجاه 6 أشهر:"}
                      </h4>
                      
                      <ResponsiveContainer width="100%" height={60}>
                        {metric.key === 'time-to-hire' || metric.key === 'cost-per-hire' ? (
                          <BarChart data={metric.historicalData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis 
                              dataKey="date" 
                              tick={{ fontSize: 10 }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <RechartsTooltip 
                              formatter={(value: any) => [`${value} ${metric.key === 'time-to-hire' ? 'days' : '$'}`]}
                              labelFormatter={(label) => language === "en" ? label : label}
                            />
                            <Bar 
                              dataKey="value" 
                              fill={`hsl(var(--heroui-${metric.color}-500))`}
                              radius={[2, 2, 0, 0]}
                              barSize={6}
                            />
                          </BarChart>
                        ) : metric.key === 'interview-to-offer' ? (
                          <BarChart data={metric.historicalData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <XAxis 
                              dataKey="date" 
                              tick={{ fontSize: 10 }}
                              axisLine={false}
                              tickLine={false}
                            />
                            <RechartsTooltip 
                              formatter={(value: any) => [`${value.toFixed(1)}:1`]}
                              labelFormatter={(label) => language === "en" ? label : label}
                            />
                            <Bar 
                              dataKey="value" 
                              fill={`hsl(var(--heroui-${metric.color}-500))`}
                              radius={[2, 2, 0, 0]}
                              barSize={6}
                            />
                          </BarChart>
                        ) : (
                          <AreaChart data={metric.historicalData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id={`color-${metric.key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={`hsl(var(--heroui-${metric.color}-500))`} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={`hsl(var(--heroui-${metric.color}-500))`} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <RechartsTooltip 
                              formatter={(value: any) => [`${value}%`]}
                              labelFormatter={(label) => language === "en" ? label : label}
                            />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={`hsl(var(--heroui-${metric.color}-500))`}
                              strokeWidth={2}
                              fill={`url(#color-${metric.key})`}
                            />
                          </AreaChart>
                        )}
                      </ResponsiveContainer>
                      
                      {metric.key === 'requisitions' && (
                        <div className="bg-white rounded-lg border border-gray-100 p-3 mt-3">
                          <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                            <Icon icon="lucide:briefcase" className="w-3 h-3 mr-1" />
                            {language === "en" ? "Requisition Breakdown:" : "تفصيل الطلبات:"}
                          </h4>
                          
                          <div className="relative h-5 bg-gray-100 rounded-full overflow-hidden mb-2">
                            <div 
                              className="absolute left-0 top-0 h-full bg-green-500 rounded-l-full"
                              style={{ width: "63%" }}
                            ></div>
                            <div 
                              className="absolute left-0 top-0 h-full bg-amber-400"
                              style={{ width: "40%" }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-between px-2">
                              <span className="text-[10px] text-white font-medium z-10">24 Filled</span>
                              <span className="text-[10px] text-gray-700 font-medium z-10">14 Active</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                              <span>{language === "en" ? "Filled" : "مملوءة"}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-amber-400 mr-1"></div>
                              <span>{language === "en" ? "In Progress" : "قيد التقدم"}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-2 h-2 rounded-full bg-gray-300 mr-1"></div>
                              <span>{language === "en" ? "Not Started" : "لم تبدأ"}</span>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {metric.key === 'quality-of-hire' && (
                        <div className="bg-white rounded-lg border border-gray-100 p-3 mt-3">
                          <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                            <Icon icon="lucide:award" className="w-3 h-3 mr-1" />
                            {language === "en" ? "Quality Factors:" : "عوامل الجودة:"}
                          </h4>
                          
                          <div className="grid grid-cols-3 gap-2 mb-1">
                            <div className="flex flex-col items-center">
                              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: "82%" }}></div>
                              </div>
                              <span className="text-[10px] text-gray-500">{language === "en" ? "Skills" : "المهارات"}</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: "76%" }}></div>
                              </div>
                              <span className="text-[10px] text-gray-500">{language === "en" ? "Culture" : "الثقافة"}</span>
                            </div>
                            <div className="flex flex-col items-center">
                              <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1">
                                <div className="bg-blue-500 h-full rounded-full" style={{ width: "72%" }}></div>
                              </div>
                              <span className="text-[10px] text-gray-500">{language === "en" ? "Retention" : "الاحتفاظ"}</span>
                            </div>
                          </div>
                          
                          <div className="bg-blue-50 rounded p-1.5 mt-2">
                            <div className="flex items-center">
                              <Icon icon="lucide:lightbulb" className="w-3 h-3 text-blue-500 mr-1 flex-shrink-0" />
                              <p className="text-[10px] text-blue-700">
                                {language === "en" 
                                  ? "Implementing structured onboarding improved ratings by 7% in the last quarter." 
                                  : "أدى تنفيذ برنامج التأهيل المنظم إلى تحسين التقييمات بنسبة 7٪ في الربع الأخير."}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {metric.key === 'interview-to-offer' && (
                        <div className="bg-white rounded-lg border border-gray-100 p-3 mt-3">
                          <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                            <Icon icon="lucide:users" className="w-3 h-3 mr-1" />
                            {language === "en" ? "Interview Efficiency:" : "كفاءة المقابلة:"}
                          </h4>
                          
                          <div className="flex items-center justify-center space-x-2 mb-2">
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-1 text-blue-700 font-medium">
                                112
                              </div>
                              <span className="text-[10px] text-gray-500">{language === "en" ? "Interviews" : "مقابلات"}</span>
                            </div>
                            
                            <div className="text-amber-500 font-bold">÷</div>
                            
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-1 text-green-700 font-medium">
                                27
                              </div>
                              <span className="text-[10px] text-gray-500">{language === "en" ? "Offers" : "عروض"}</span>
                            </div>
                            
                            <div className="text-blue-500 font-bold">=</div>
                            
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-1 text-amber-700 font-medium">
                                4.2
                              </div>
                              <span className="text-[10px] text-gray-500">{language === "en" ? "Ratio" : "نسبة"}</span>
                            </div>
                          </div>
                          
                          <div className="text-[10px] text-gray-600 bg-gray-50 p-1.5 rounded">
                            {language === "en" 
                              ? "Each offer made requires an average of 4.2 interviews. Target efficiency ratio is 3:1." 
                              : "يتطلب كل عرض مقدم متوسط 4.2 مقابلة. نسبة الكفاءة المستهدفة هي 3:1."}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-between mt-1">
                        <span className="text-[10px] text-gray-500">Jan</span>
                        <span className="text-[10px] text-gray-500">Jun</span>
                      </div>
                    </div>
                  )}
                  
                  {metric.benchmarks && (
                    <div className="bg-white rounded-lg border border-gray-100 p-3">
                      <h4 className="text-xs font-medium text-gray-700 mb-2 flex items-center">
                        <Icon icon="lucide:target" className="w-3 h-3 mr-1" />
                        {language === "en" ? "Performance Benchmarks:" : "معايير الأداء:"}
                        <InfoTooltip content={language === "en" 
                          ? `${metric.key === 'time-to-hire' ? "Time-to-hire benchmarks are based on regional industry standards and Mercer's Global Talent Trends report." : 
                             metric.key === 'offer-acceptance' ? "Offer acceptance benchmarks are derived from industry surveys and regional talent analytics." : 
                             metric.key === 'saudization' ? "Saudization benchmarks align with national employment regulations and industry compliance data." : 
                             "Benchmarks are collected from multiple industry sources including regional HR analytics."}`
                          : `${metric.key === 'time-to-hire' ? "تستند معايير وقت التوظيف إلى معايير الصناعة الإقليمية وتقرير اتجاهات المواهب العالمية من ميرسر." : 
                             metric.key === 'offer-acceptance' ? "تستمد معايير قبول العروض من استطلاعات الصناعة وتحليلات المواهب الإقليمية." : 
                             metric.key === 'saudization' ? "تتوافق معايير السعودة مع لوائح التوظيف الوطنية وبيانات الامتثال الصناعية." : 
                             "يتم جمع المعايير من مصادر صناعية متعددة بما في ذلك تحليلات الموارد البشرية الإقليمية."}`
                        } />
                      </h4>
                      
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                            <span className="text-xs text-gray-600">
                              {language === "en" ? "Industry Average:" : "متوسط الصناعة:"}
                            </span>
                          </div>
                          <span className="text-xs font-semibold">{metric.benchmarks.industry}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                            <span className="text-xs text-gray-600">
                              {language === "en" ? "Company Target:" : "هدف الشركة:"}
                            </span>
                          </div>
                          <span className="text-xs font-semibold">{metric.benchmarks.company}%</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${
                              metric.progress >= metric.benchmarks.company ? "bg-green-500" : 
                              metric.progress >= metric.benchmarks.industry ? "bg-amber-500" : 
                              "bg-red-500"
                            } mr-2`}></div>
                            <span className="text-xs text-gray-600">
                              {language === "en" ? "Current:" : "الحالي:"}
                            </span>
                          </div>
                          <span className="text-xs font-semibold">{metric.progress}%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isSourcesModalOpen}
        onOpenChange={setIsSourcesModalOpen}
        size="3xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:database" className="w-5 h-5 text-blue-600" />
                  <span>
                    {language === "en" ? "Industry Benchmark Sources" : "مصادر معايير الصناعة"}
                  </span>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-medium text-gray-800 mb-2">
                      {language === "en" ? "About Our Benchmark Data" : "حول بيانات المعايير لدينا"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {language === "en" 
                        ? "Our industry benchmarks are carefully compiled from multiple trusted sources to provide you with accurate comparison points. We update these benchmarks quarterly and validate them against regional standards to ensure they remain relevant to your recruitment operations."
                        : "يتم تجميع معايير الصناعة لدينا بعناية من مصادر موثوقة متعددة لتزويدك بنقاط مقارنة دقيقة. نقوم بتحديث هذه المعايير كل ربع سنة والتحقق من صحتها مقابل المعايير الإقليمية لضمان بقائها ذات صلة بعمليات التوظيف الخاصة بك."
                      }
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                      <Icon icon="lucide:help-circle" className="w-4 h-4 mr-2 text-blue-600" />
                      {language === "en" ? "Understanding Benchmarks" : "فهم المعايير"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {language === "en" 
                        ? "Benchmarks help you understand how your metrics compare to industry standards and your company's targets:"
                        : "تساعدك المعايير على فهم كيفية مقارنة مقاييسك بمعايير الصناعة وأهداف شركتك:"}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-700 text-sm flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                          {language === "en" ? "Industry Average" : "متوسط الصناعة"}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {language === "en" 
                            ? "The typical performance level across companies in your industry. This helps you understand if you're keeping pace with competitors."
                            : "مستوى الأداء النموذجي عبر الشركات في صناعتك. هذا يساعدك على فهم ما إذا كنت تواكب المنافسين."}
                        </p>
                      </div>
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="font-medium text-gray-700 text-sm flex items-center mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                          {language === "en" ? "Company Target" : "هدف الشركة"}
                        </h4>
                        <p className="text-xs text-gray-600">
                          {language === "en" 
                            ? "The goal your company has set for this metric. This represents your internal performance standard and strategic objectives."
                            : "الهدف الذي حددته شركتك لهذا المقياس. هذا يمثل معيار الأداء الداخلي والأهداف الاستراتيجية الخاصة بك."}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <Table 
                    aria-label="Benchmark Sources Table"
                    removeWrapper
                    classNames={{
                      table: "border rounded-md",
                      th: "bg-gray-50",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>{language === "en" ? "SOURCE" : "المصدر"}</TableColumn>
                      <TableColumn>{language === "en" ? "DESCRIPTION" : "الوصف"}</TableColumn>
                      <TableColumn>{language === "en" ? "LAST UPDATE" : "آخر تحديث"}</TableColumn>
                      <TableColumn>{language === "en" ? "METRICS COVERED" : "المقاييس المغطاة"}</TableColumn>
                      <TableColumn>{language === "en" ? "RELIABILITY" : "الموثوقية"}</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {benchmarkSources.map((source) => (
                        <TableRow key={source.id}>
                          <TableCell>
                            <div className="font-medium">{language === "en" ? source.name.en : source.name.ar}</div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm text-gray-600">
                              {language === "en" ? source.description.en : source.description.ar}
                            </p>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{source.lastUpdate}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {source.metricsProvided.map((metric) => (
                                <Badge 
                                  key={metric} 
                                  color="primary" 
                                  variant="flat" 
                                  size="sm"
                                  className="bg-blue-50"
                                >
                                  {language === "en" 
                                    ? getMetricLabel(metric).en 
                                    : getMetricLabel(metric).ar}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {getReliabilityBadge(source.reliability)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">
                      {language === "en" ? "Methodology" : "المنهجية"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {language === "en" 
                        ? "Our benchmarks are derived using a weighted average of multiple data sources, with greater weight assigned to more recent data and sources with larger sample sizes. Industry-specific adjustments are made to ensure relevance to your sector."
                        : "يتم اشتقاق المعايير الخاصة بنا باستخدام متوسط مرجح من مصادر بيانات متعددة، مع إعطاء وزن أكبر للبيانات الأحدث والمصادر ذات أحجام العينات الأكبر. يتم إجراء تعديلات خاصة بالصناعة لضمان ملاءمتها لقطاعك."
                      }
                    </p>
                    
                    <h4 className="font-medium text-gray-700 mb-1 text-sm">
                      {language === "en" ? "Data Processing" : "معالجة البيانات"}
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 mb-3">
                      <li>
                        {language === "en" 
                          ? "Outlier detection and removal (values beyond 3 standard deviations)"
                          : "اكتشاف وإزالة القيم المتطرفة (القيم التي تتجاوز 3 انحرافات معيارية)"
                        }
                      </li>
                      <li>
                        {language === "en" 
                          ? "Normalization across different reporting methodologies"
                          : "التطبيع عبر منهجيات إعداد التقارير المختلفة"
                        }
                      </li>
                      <li>
                        {language === "en" 
                          ? "Regional adjustments based on labor market conditions"
                          : "تعديلات إقليمية بناءً على ظروف سوق العمل"
                        }
                      </li>
                    </ul>
                    
                    <h4 className="font-medium text-gray-700 mb-1 text-sm">
                      {language === "en" ? "Update Frequency" : "تردد التحديث"}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === "en" 
                        ? "Benchmarks are updated quarterly to reflect the latest available data. The next update is scheduled for the end of the current quarter."
                        : "يتم تحديث المعايير كل ثلاثة أشهر لتعكس أحدث البيانات المتاحة. التحديث التالي مقرر في نهاية الربع الحالي."
                      }
                    </p>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  {language === "en" ? "Close" : "إغلاق"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.section>
  );
};