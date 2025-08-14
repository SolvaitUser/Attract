import React from "react";
import { Icon } from "@iconify/react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useAppContext } from "../../context/app-context";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";

interface SourceData {
  name: string;
  arabicName: string;
  value: number;
  color: string;
}

export const CandidateSources: React.FC = () => {
  const { language } = useAppContext();
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = React.useState(false);

  const sourceData: SourceData[] = [
    { name: "LinkedIn", arabicName: "لينكد إن", value: 42, color: "#0077B5" },
    { name: "TAQAT", arabicName: "طاقات", value: 28, color: "#00A651" },
    { name: "Referrals", arabicName: "الإحالات", value: 18, color: "#F48024" },
    { name: "Careers Portal", arabicName: "بوابة الوظائف", value: 12, color: "#6C63FF" },
  ];

  // Detailed analytics data
  const detailedSourceData = [
    { 
      source: "LinkedIn", 
      arabicSource: "لينكد إن",
      applicants: 156, 
      interviews: 48, 
      offers: 22, 
      hires: 18, 
      conversionRate: "11.5%",
      costPerHire: "$1,250",
      timeToHire: "32 days" 
    },
    { 
      source: "TAQAT", 
      arabicSource: "طاقات",
      applicants: 98, 
      interviews: 42, 
      offers: 18, 
      hires: 12, 
      conversionRate: "12.2%",
      costPerHire: "$850",
      timeToHire: "28 days" 
    },
    { 
      source: "Referrals", 
      arabicSource: "الإحالات",
      applicants: 64, 
      interviews: 32, 
      offers: 12, 
      hires: 8, 
      conversionRate: "12.5%",
      costPerHire: "$500",
      timeToHire: "24 days" 
    },
    { 
      source: "Careers Portal", 
      arabicSource: "بوابة الوظائف",
      applicants: 42, 
      interviews: 18, 
      offers: 8, 
      hires: 5, 
      conversionRate: "11.9%",
      costPerHire: "$350",
      timeToHire: "26 days" 
    },
  ];

  // Monthly trend data for each source
  const monthlyTrendData = [
    { month: "Jan", linkedin: 3, taqat: 2, referrals: 1, portal: 1 },
    { month: "Feb", linkedin: 4, taqat: 2, referrals: 2, portal: 1 },
    { month: "Mar", linkedin: 2, taqat: 3, referrals: 1, portal: 0 },
    { month: "Apr", linkedin: 5, taqat: 1, referrals: 2, portal: 1 },
    { month: "May", linkedin: 2, taqat: 3, referrals: 1, portal: 1 },
    { month: "Jun", linkedin: 2, taqat: 1, referrals: 1, portal: 1 },
  ];

  // Department-specific source effectiveness
  const departmentSourceData = [
    { 
      department: "Technology", 
      arabicDepartment: "التكنولوجيا",
      topSource: "LinkedIn", 
      arabicTopSource: "لينكد إن",
      hires: 8, 
      conversionRate: "14.2%", 
      avgTimeToHire: "28 days" 
    },
    { 
      department: "Sales", 
      arabicDepartment: "المبيعات",
      topSource: "Referrals", 
      arabicTopSource: "الإحالات",
      hires: 5, 
      conversionRate: "16.5%", 
      avgTimeToHire: "22 days" 
    },
    { 
      department: "Finance", 
      arabicDepartment: "المالية",
      topSource: "TAQAT", 
      arabicTopSource: "طاقات",
      hires: 4, 
      conversionRate: "12.8%", 
      avgTimeToHire: "26 days" 
    },
    { 
      department: "HR", 
      arabicDepartment: "الموارد البشرية",
      topSource: "TAQAT", 
      arabicTopSource: "طاقات",
      hires: 3, 
      conversionRate: "11.2%", 
      avgTimeToHire: "30 days" 
    },
    { 
      department: "Marketing", 
      arabicDepartment: "التسويق",
      topSource: "LinkedIn", 
      arabicTopSource: "لينكد إن",
      hires: 3, 
      conversionRate: "10.5%", 
      avgTimeToHire: "32 days" 
    },
    { 
      department: "Operations", 
      arabicDepartment: "العمليات",
      topSource: "Careers Portal", 
      arabicTopSource: "بوابة الوظائف",
      hires: 2, 
      conversionRate: "9.8%", 
      avgTimeToHire: "34 days" 
    },
  ];

  // Source quality metrics
  const qualityMetrics = [
    { 
      source: "LinkedIn", 
      arabicSource: "لينكد إن",
      performanceRating: 3.8, 
      retentionRate: "82%", 
      cultureFit: 4.2, 
      skillMatch: 4.5 
    },
    { 
      source: "TAQAT", 
      arabicSource: "طاقات",
      performanceRating: 4.1, 
      retentionRate: "88%", 
      cultureFit: 4.4, 
      skillMatch: 3.9 
    },
    { 
      source: "Referrals", 
      arabicSource: "الإحالات",
      performanceRating: 4.5, 
      retentionRate: "92%", 
      cultureFit: 4.7, 
      skillMatch: 4.2 
    },
    { 
      source: "Careers Portal", 
      arabicSource: "بوابة الوظائف",
      performanceRating: 3.9, 
      retentionRate: "85%", 
      cultureFit: 4.0, 
      skillMatch: 4.1 
    },
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

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="w-full bg-white border border-gray-200 rounded-lg p-6"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        {language === "en" ? "Top Candidate Sources" : "أفضل مصادر المرشحين"}
      </h2>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sourceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey={language === "en" ? "name" : "arabicName"}
              >
                {sourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, name]}
              />
              <Legend 
                layout="vertical" 
                verticalAlign="middle" 
                align="right"
                formatter={(value) => {
                  const source = sourceData.find(s => 
                    language === "en" ? s.name === value : s.arabicName === value
                  );
                  return <span style={{ color: source?.color }}>{value}</span>;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex">
              <Icon icon="lucide:sparkles" className="w-5 h-5 text-blue-500 mr-2" />
              <div>
                <h4 className="font-medium text-blue-700">
                  {language === "en" ? "AI Suggestion" : "اقتراح الذكاء الاصطناعي"}
                </h4>
                <p className="text-sm text-blue-700 mt-1">
                  {language === "en" 
                    ? "LinkedIn has lowest conversion – optimize your campaign wording." 
                    : "لينكد إن لديه أقل معدل تحويل - قم بتحسين صياغة حملتك."}
                </p>
              </div>
            </div>
          </div>
          
          <Button 
            className="mt-4 justify-center"
            color="primary"
            variant="flat"
            startContent={<Icon icon="lucide:bar-chart-2" className="w-4 h-4" />}
            onPress={() => setIsAnalyticsModalOpen(true)}
          >
            {language === "en" ? "View Detailed Analytics" : "عرض التحليلات التفصيلية"}
          </Button>
        </div>
      </div>

      {/* Detailed Analytics Modal */}
      <Modal 
        isOpen={isAnalyticsModalOpen} 
        onOpenChange={setIsAnalyticsModalOpen}
        size="5xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <Icon icon="lucide:bar-chart-2" className="w-5 h-5 text-attract-blue" />
                  <span>{language === "en" ? "Candidate Sources Analytics" : "تحليلات مصادر المرشحين"}</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <Tabs aria-label="Source analytics tabs" color="primary" variant="underlined">
                  <Tab 
                    key="overview" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:layout-dashboard" className="w-4 h-4" />
                        <span>{language === "en" ? "Overview" : "نظرة عامة"}</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          {language === "en" ? "Source Performance Summary" : "ملخص أداء المصادر"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {language === "en" 
                            ? "Analysis of candidate sources over the last 6 months" 
                            : "تحليل مصادر المرشحين على مدار الـ 6 أشهر الماضية"}
                        </p>
                        
                        <div className="overflow-x-auto">
                          <Table 
                            removeWrapper 
                            aria-label="Source performance table"
                            classNames={{
                              th: "bg-blue-50",
                            }}
                          >
                            <TableHeader>
                              <TableColumn>{language === "en" ? "SOURCE" : "المصدر"}</TableColumn>
                              <TableColumn>{language === "en" ? "APPLICANTS" : "المتقدمون"}</TableColumn>
                              <TableColumn>{language === "en" ? "INTERVIEWS" : "المقابلات"}</TableColumn>
                              <TableColumn>{language === "en" ? "OFFERS" : "العروض"}</TableColumn>
                              <TableColumn>{language === "en" ? "HIRES" : "التعيينات"}</TableColumn>
                              <TableColumn>{language === "en" ? "CONVERSION" : "معدل التحويل"}</TableColumn>
                              <TableColumn>{language === "en" ? "COST/HIRE" : "تكلفة/تعيين"}</TableColumn>
                              <TableColumn>{language === "en" ? "TIME TO HIRE" : "وقت التعيين"}</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {detailedSourceData.map((item) => (
                                <TableRow key={item.source}>
                                  <TableCell className="font-medium">
                                    {language === "en" ? item.source : item.arabicSource}
                                  </TableCell>
                                  <TableCell>{item.applicants}</TableCell>
                                  <TableCell>{item.interviews}</TableCell>
                                  <TableCell>{item.offers}</TableCell>
                                  <TableCell>{item.hires}</TableCell>
                                  <TableCell>{item.conversionRate}</TableCell>
                                  <TableCell>{item.costPerHire}</TableCell>
                                  <TableCell>{item.timeToHire}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-800 mb-4">
                            {language === "en" ? "Monthly Hiring Trends by Source" : "اتجاهات التوظيف الشهرية حسب المصدر"}
                          </h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <AreaChart
                                data={monthlyTrendData}
                                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                  dataKey="month" 
                                  tickFormatter={(value) => getMonthName(value, language)}
                                  axisLine={false}
                                  tickLine={false}
                                />
                                <YAxis 
                                  axisLine={false}
                                  tickLine={false}
                                />
                                <Tooltip 
                                  formatter={(value, name) => {
                                    const formattedName = 
                                      name === "linkedin" ? language === "en" ? "LinkedIn" : "لينكد إن" :
                                      name === "taqat" ? language === "en" ? "TAQAT" : "طاقات" :
                                      name === "referrals" ? language === "en" ? "Referrals" : "الإحالات" :
                                      language === "en" ? "Careers Portal" : "بوابة الوظائف";
                                    return [value, formattedName];
                                  }}
                                  labelFormatter={(label) => getMonthName(label, language)}
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="linkedin" 
                                  stackId="1"
                                  stroke="#0077B5" 
                                  fill="#0077B5" 
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="taqat" 
                                  stackId="1"
                                  stroke="#00A651" 
                                  fill="#00A651" 
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="referrals" 
                                  stackId="1"
                                  stroke="#F48024" 
                                  fill="#F48024" 
                                />
                                <Area 
                                  type="monotone" 
                                  dataKey="portal" 
                                  stackId="1"
                                  stroke="#6C63FF" 
                                  fill="#6C63FF" 
                                />
                              </AreaChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-800 mb-4">
                            {language === "en" ? "Source Quality Metrics" : "مقاييس جودة المصدر"}
                          </h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={qualityMetrics}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" domain={[0, 5]} />
                                <YAxis 
                                  dataKey={language === "en" ? "source" : "arabicSource"} 
                                  type="category" 
                                  width={100} 
                                />
                                <Tooltip />
                                <Legend />
                                <Bar 
                                  dataKey="performanceRating" 
                                  name={language === "en" ? "Performance Rating" : "تقييم الأداء"} 
                                  fill="#0078ff" 
                                />
                                <Bar 
                                  dataKey="skillMatch" 
                                  name={language === "en" ? "Skill Match" : "تطابق المهارات"} 
                                  fill="#00A651" 
                                />
                                <Bar 
                                  dataKey="cultureFit" 
                                  name={language === "en" ? "Culture Fit" : "التوافق الثقافي"} 
                                  fill="#F48024" 
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                        <div className="flex">
                          <Icon icon="lucide:sparkles" className="w-5 h-5 text-amber-500 mr-2" />
                          <div>
                            <h4 className="font-medium text-amber-700">
                              {language === "en" ? "AI Insight" : "رؤية الذكاء الاصطناعي"}
                            </h4>
                            <p className="text-sm text-amber-700 mt-1">
                              {language === "en" 
                                ? "Referrals have the highest quality metrics but are underutilized. Consider implementing an employee referral program with incentives." 
                                : "الإحالات لديها أعلى مقاييس الجودة ولكنها غير مستغلة بشكل كافٍ. فكر في تنفيذ برنامج إحالة الموظفين مع حوافز."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="department" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:briefcase" className="w-4 h-4" />
                        <span>{language === "en" ? "By Department" : "حسب القسم"}</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          {language === "en" ? "Department-Specific Source Effectiveness" : "فعالية المصدر الخاصة بالقسم"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {language === "en" 
                            ? "Analysis of which sources work best for each department" 
                            : "تحليل المصادر الأكثر فعالية لكل قسم"}
                        </p>
                        
                        <div className="overflow-x-auto">
                          <Table 
                            removeWrapper 
                            aria-label="Department source table"
                            classNames={{
                              th: "bg-gray-50",
                            }}
                          >
                            <TableHeader>
                              <TableColumn>{language === "en" ? "DEPARTMENT" : "القسم"}</TableColumn>
                              <TableColumn>{language === "en" ? "TOP SOURCE" : "أفضل مصدر"}</TableColumn>
                              <TableColumn>{language === "en" ? "HIRES" : "التعيينات"}</TableColumn>
                              <TableColumn>{language === "en" ? "CONVERSION RATE" : "معدل التحويل"}</TableColumn>
                              <TableColumn>{language === "en" ? "AVG TIME TO HIRE" : "متوسط وقت التعيين"}</TableColumn>
                            </TableHeader>
                            <TableBody>
                              {departmentSourceData.map((item) => (
                                <TableRow key={item.department}>
                                  <TableCell className="font-medium">
                                    {language === "en" ? item.department : item.arabicDepartment}
                                  </TableCell>
                                  <TableCell>
                                    {language === "en" ? item.topSource : item.arabicTopSource}
                                  </TableCell>
                                  <TableCell>{item.hires}</TableCell>
                                  <TableCell>{item.conversionRate}</TableCell>
                                  <TableCell>{item.avgTimeToHire}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-800 mb-4">
                            {language === "en" ? "Department Hiring Distribution" : "توزيع التوظيف حسب القسم"}
                          </h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={departmentSourceData}
                                  cx="50%"
                                  cy="50%"
                                  labelLine={false}
                                  outerRadius={80}
                                  fill="#8884d8"
                                  dataKey="hires"
                                  nameKey={language === "en" ? "department" : "arabicDepartment"}
                                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                >
                                  {departmentSourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={['#0078ff', '#00A651', '#F48024', '#6C63FF', '#FF5722', '#9C27B0'][index % 6]} />
                                  ))}
                                </Pie>
                                <Tooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="text-lg font-medium text-gray-800 mb-4">
                            {language === "en" ? "Department Source Comparison" : "مقارنة مصادر القسم"}
                          </h3>
                          <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart
                                data={departmentSourceData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis 
                                  dataKey={language === "en" ? "department" : "arabicDepartment"}
                                  angle={-45}
                                  textAnchor="end"
                                  height={70}
                                />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar 
                                  dataKey="hires" 
                                  name={language === "en" ? "Hires" : "التعيينات"} 
                                  fill="#0078ff" 
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
                        <div className="flex">
                          <Icon icon="lucide:sparkles" className="w-5 h-5 text-green-500 mr-2" />
                          <div>
                            <h4 className="font-medium text-green-700">
                              {language === "en" ? "AI Recommendation" : "توصية الذكاء الاصطناعي"}
                            </h4>
                            <p className="text-sm text-green-700 mt-1">
                              {language === "en" 
                                ? "Technology department has the highest hiring volume. Consider specialized tech recruitment channels to improve quality and reduce time-to-hire." 
                                : "قسم التكنولوجيا لديه أعلى حجم توظيف. فكر في قنوات توظيف تقنية متخصصة لتحسين الجودة وتقليل وقت التعيين."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="cost" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:dollar-sign" className="w-4 h-4" />
                        <span>{language === "en" ? "Cost Analysis" : "تحليل التكلفة"}</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          {language === "en" ? "Recruitment Cost Breakdown" : "تفصيل تكاليف التوظيف"}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                          {language === "en" 
                            ? "Detailed analysis of costs associated with each candidate source" 
                            : "تحليل مفصل للتكاليف المرتبطة بكل مصدر للمرشحين"}
                        </p>
                        
                        <div className="h-64 mb-6">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { name: language === "en" ? "LinkedIn" : "لينكد إن", cost: 22500, hires: 18 },
                                { name: language === "en" ? "TAQAT" : "طاقات", cost: 10200, hires: 12 },
                                { name: language === "en" ? "Referrals" : "الإحالات", cost: 4000, hires: 8 },
                                { name: language === "en" ? "Careers Portal" : "بوابة الوظائف", cost: 1750, hires: 5 },
                              ]}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="name" />
                              <YAxis yAxisId="left" orientation="left" stroke="#0078ff" />
                              <YAxis yAxisId="right" orientation="right" stroke="#00A651" />
                              <Tooltip />
                              <Legend />
                              <Bar 
                                yAxisId="left" 
                                dataKey="cost" 
                                name={language === "en" ? "Total Cost ($)" : "التكلفة الإجمالية ($)"} 
                                fill="#0078ff" 
                              />
                              <Bar 
                                yAxisId="right" 
                                dataKey="hires" 
                                name={language === "en" ? "Number of Hires" : "عدد التعيينات"} 
                                fill="#00A651" 
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500">
                              {language === "en" ? "LinkedIn" : "لينكد إن"}
                            </h4>
                            <div className="mt-2">
                              <p className="text-2xl font-semibold">$1,250</p>
                              <p className="text-xs text-gray-500">
                                {language === "en" ? "Cost per hire" : "تكلفة لكل تعيين"}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500">
                              {language === "en" ? "TAQAT" : "طاقات"}
                            </h4>
                            <div className="mt-2">
                              <p className="text-2xl font-semibold">$850</p>
                              <p className="text-xs text-gray-500">
                                {language === "en" ? "Cost per hire" : "تكلفة لكل تعيين"}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500">
                              {language === "en" ? "Referrals" : "الإحالات"}
                            </h4>
                            <div className="mt-2">
                              <p className="text-2xl font-semibold">$500</p>
                              <p className="text-xs text-gray-500">
                                {language === "en" ? "Cost per hire" : "تكلفة لكل تعيين"}
                              </p>
                            </div>
                          </div>
                          <div className="bg-white p-4 rounded-lg border border-gray-200">
                            <h4 className="text-sm font-medium text-gray-500">
                              {language === "en" ? "Careers Portal" : "بوابة الوظائف"}
                            </h4>
                            <div className="mt-2">
                              <p className="text-2xl font-semibold">$350</p>
                              <p className="text-xs text-gray-500">
                                {language === "en" ? "Cost per hire" : "تكلفة لكل تعيين"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                        <div className="flex">
                          <Icon icon="lucide:sparkles" className="w-5 h-5 text-blue-500 mr-2" />
                          <div>
                            <h4 className="font-medium text-blue-700">
                              {language === "en" ? "Cost Optimization Opportunity" : "فرصة تحسين التكلفة"}
                            </h4>
                            <p className="text-sm text-blue-700 mt-1">
                              {language === "en" 
                                ? "LinkedIn has the highest cost per hire ($1,250) with lower quality metrics. Consider reallocating 30% of LinkedIn budget to expand the referral program." 
                                : "لينكد إن لديها أعلى تكلفة لكل تعيين (1,250 دولار) مع مقاييس جودة أقل. فكر في إعادة تخصيص 30٪ من ميزانية لينكد إن لتوسيع برنامج الإحالة."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Tab>
                  
                  <Tab 
                    key="recommendations" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:lightbulb" className="w-4 h-4" />
                        <span>{language === "en" ? "Recommendations" : "التوصيات"}</span>
                      </div>
                    }
                  >
                    <div className="space-y-6 py-4">
                      <div className="bg-attract-light-blue p-4 rounded-lg">
                        <div className="flex items-start mb-4">
                          <div className="bg-attract-blue rounded-full p-1 mr-3">
                            <Icon icon="lucide:sparkles" className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-gray-800">
                              {language === "en" ? "AI-Powered Recommendations" : "توصيات مدعومة بالذكاء الاصطناعي"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {language === "en" 
                                ? "Based on your recruitment data analysis" 
                                : "بناءً على تحليل بيانات التوظيف الخاصة بك"}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <h4 className="font-medium text-gray-800 flex items-center">
                              <Icon icon="lucide:check-circle" className="w-5 h-5 text-attract-blue mr-2" />
                              {language === "en" ? "Expand Employee Referral Program" : "توسيع برنامج إحالة الموظفين"}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 ml-7">
                              {language === "en" 
                                ? "Referrals show the highest quality metrics (4.5/5 performance rating) and lowest cost per hire ($500). Implement a structured referral program with tiered rewards." 
                                : "تُظهر الإحالات أعلى مقاييس الجودة (تقييم الأداء 4.5/5) وأقل تكلفة لكل تعيين (500 دولار). قم بتنفيذ برنامج إحالة منظم مع مكافآت متدرجة."}
                            </p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <h4 className="font-medium text-gray-800 flex items-center">
                              <Icon icon="lucide:check-circle" className="w-5 h-5 text-attract-blue mr-2" />
                              {language === "en" ? "Optimize LinkedIn Strategy" : "تحسين استراتيجية لينكد إن"}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 ml-7">
                              {language === "en" 
                                ? "LinkedIn has the highest cost ($1,250/hire) with lower conversion rates. Focus on targeted job ads and InMail campaigns for specialized roles only." 
                                : "لينكد إن لديها أعلى تكلفة (1,250 دولار/تعيين) مع معدلات تحويل أقل. ركز على إعلانات الوظائف المستهدفة وحملات InMail للأدوار المتخصصة فقط."}
                            </p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <h4 className="font-medium text-gray-800 flex items-center">
                              <Icon icon="lucide:check-circle" className="w-5 h-5 text-attract-blue mr-2" />
                              {language === "en" ? "Department-Specific Sourcing" : "مصادر خاصة بالقسم"}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 ml-7">
                              {language === "en" 
                                ? "Technology roles convert best through LinkedIn, while Sales performs better with referrals. Customize your sourcing strategy by department." 
                                : "تحول أدوار التكنولوجيا بشكل أفضل من خلال لينكد إن، بينما يكون أداء المبيعات أفضل مع الإحالات. قم بتخصيص استراتيجية التوظيف حسب القسم."}
                            </p>
                          </div>
                          
                          <div className="bg-white p-4 rounded-lg border border-blue-100">
                            <h4 className="font-medium text-gray-800 flex items-center">
                              <Icon icon="lucide:check-circle" className="w-5 h-5 text-attract-blue mr-2" />
                              {language === "en" ? "Careers Portal Enhancement" : "تحسين بوابة الوظائف"}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1 ml-7">
                              {language === "en" 
                                ? "Your careers portal has the lowest cost per hire ($350) but also the lowest volume. Invest in SEO optimization and user experience improvements." 
                                : "بوابة الوظائف الخاصة بك لديها أقل تكلفة لكل تعيين (350 دولار) ولكن أيضًا أقل حجم. استثمر في تحسين محركات البحث وتحسينات تجربة المستخدم."}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">
                          {language === "en" ? "Projected Impact of Recommendations" : "التأثير المتوقع للتوصيات"}
                        </h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={[
                                { 
                                  name: language === "en" ? "Cost per Hire" : "تكلفة لكل تعيين",
                                  current: 850,
                                  projected: 680,
                                  improvement: "20%"
                                },
                                { 
                                  name: language === "en" ? "Time to Hire" : "وقت التعيين",
                                  current: 32,
                                  projected: 26,
                                  improvement: "19%"
                                },
                                { 
                                  name: language === "en" ? "Quality of Hire" : "جودة التعيين",
                                  current: 3.8,
                                  projected: 4.2,
                                  improvement: "10%"
                                },
                                { 
                                  name: language === "en" ? "Retention Rate" : "معدل الاحتفاظ",
                                  current: 82,
                                  projected: 88,
                                  improvement: "7%"
                                },
                              ]}
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip 
                                formatter={(value, name, props) => {
                                  const formattedName = name === "current" 
                                    ? language === "en" ? "Current" : "الحالي"
                                    : language === "en" ? "Projected" : "المتوقع";
                                  return [value, formattedName];
                                }}
                                labelFormatter={(name) => name}
                              />
                              <Legend 
                                formatter={(value) => {
                                  return value === "current" 
                                    ? language === "en" ? "Current" : "الحالي"
                                    : language === "en" ? "Projected" : "المتوقع";
                                }}
                              />
                              <Bar dataKey="current" fill="#a1a1aa" />
                              <Bar dataKey="projected" fill="#0078ff" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  {language === "en" ? "Close" : "إغلاق"}
                </Button>
                <Button color="primary" onPress={onClose}>
                  {language === "en" ? "Export Report" : "تصدير التقرير"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </motion.section>
  );
};