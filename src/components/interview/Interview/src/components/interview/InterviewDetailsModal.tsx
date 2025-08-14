import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Chip, Avatar, Divider, Card, Tab, Tabs, Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../context/LanguageContext";
import { useInterviewContext, Interview } from "../../context/InterviewContext";
import { format } from "date-fns";

interface InterviewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  interviewId: string | null;
}

const InterviewDetailsModal: React.FC<InterviewDetailsModalProps> = ({
  isOpen,
  onClose,
  interviewId
}) => {
  const { language } = useLanguage();
  const { interviews, openFeedbackForm, updateInterviewStatus } = useInterviewContext();
  const [activeTab, setActiveTab] = React.useState("details");
  
  const interview = interviews.find(i => i.id === interviewId);
  
  if (!interview) return null;
  
  const formattedDate = format(new Date(interview.date), "MMMM d, yyyy");
  const formattedTime = format(new Date(interview.date), "h:mm a");
  
  // Platform icon
  const getPlatformIcon = () => {
    switch (interview.platform.toLowerCase()) {
      case "teams":
        return "logos:microsoft-teams";
      case "zoom":
        return "logos:zoom-icon";
      case "google meet":
        return "logos:google-meet";
      default:
        return "lucide:video";
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span>
                  {language === "en" ? "Interview Details" : "تفاصيل المقابلة"}
                </span>
                <Chip
                  color={
                    interview.status === "upcoming" ? "primary" : 
                    interview.status === "in-progress" ? "warning" :
                    interview.status === "completed" ? "success" : "danger"
                  }
                  variant="flat"
                >
                  {interview.status === "upcoming"
                    ? (language === "en" ? "Upcoming" : "قادمة")
                    : interview.status === "in-progress"
                    ? (language === "en" ? "In Progress" : "قيد التنفيذ")
                    : interview.status === "completed"
                    ? (language === "en" ? "Completed" : "مكتملة")
                    : (language === "en" ? "Canceled" : "ملغاة")}
                </Chip>
              </div>
            </ModalHeader>
            
            <Divider />
            
            <ModalBody className="p-0">
              <Tabs 
                selectedKey={activeTab} 
                onSelectionChange={setActiveTab as any}
                color="primary"
                variant="underlined"
                classNames={{
                  tabList: "px-6 pt-2",
                }}
              >
                <Tab 
                  key="details" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:info" />
                      <span>{language === "en" ? "Details" : "التفاصيل"}</span>
                    </div>
                  }
                >
                  <div className="p-6 space-y-6">
                    {/* Candidate & Job Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <Avatar
                        src={interview.candidate.avatar}
                        name={interview.candidate.name}
                        className="w-16 h-16"
                      />
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">
                          {interview.candidate.name}
                        </h3>
                        <p className="text-gray-600">{interview.jobTitle}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Icon icon="lucide:building" className="text-gray-400" />
                          <span>{interview.department}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Divider />
                    
                    {/* Interview Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <DetailItem
                        icon="lucide:calendar"
                        label={language === "en" ? "Date" : "التاريخ"}
                        value={formattedDate}
                      />
                      <DetailItem
                        icon="lucide:clock"
                        label={language === "en" ? "Time" : "الوقت"}
                        value={`${formattedTime} (${interview.duration} min)`}
                      />
                      <DetailItem
                        icon={getPlatformIcon()}
                        label={language === "en" ? "Platform" : "المنصة"}
                        value={interview.platform}
                      />
                      <DetailItem
                        icon="lucide:tag"
                        label={language === "en" ? "Type" : "النوع"}
                        value={interview.type}
                      />
                    </div>
                    
                    {/* Interviewers */}
                    <div>
                      <h3 className="text-md font-medium mb-3">
                        {language === "en" ? "Interviewers" : "المقابلون"}
                      </h3>
                      <div className="space-y-3">
                        {interview.interviewers.map((interviewer, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <Avatar src={interviewer.avatar} name={interviewer.name} size="sm" />
                            <div>
                              <p className="font-medium">{interviewer.name}</p>
                              <p className="text-sm text-gray-500">{interviewer.position}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Notes */}
                    {interview.notes && (
                      <div>
                        <h3 className="text-md font-medium mb-2">
                          {language === "en" ? "Notes" : "ملاحظات"}
                        </h3>
                        <Card className="p-3 bg-gray-50">
                          <p className="text-gray-700">{interview.notes}</p>
                        </Card>
                      </div>
                    )}
                    
                    {/* Feedback */}
                    {interview.feedback && (
                      <div>
                        <h3 className="text-md font-medium mb-2">
                          {language === "en" ? "Feedback Summary" : "ملخص التقييم"}
                        </h3>
                        <Card className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Avatar 
                                src={interview.interviewers[0].avatar} 
                                name={interview.interviewers[0].name}
                                size="sm"
                              />
                              <span className="font-medium">{interview.interviewers[0].name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array(5).fill(0).map((_, i) => (
                                <Icon 
                                  key={i}
                                  icon="lucide:star" 
                                  className={i < Math.floor(interview.feedback.overallScore) 
                                    ? "text-yellow-500" 
                                    : "text-gray-300"
                                  }
                                />
                              ))}
                              <span className="font-medium ml-1">{interview.feedback.overallScore}</span>
                            </div>
                          </div>
                          
                          <Chip
                            className="mb-3"
                            color={
                              interview.feedback.recommendation === "pass" ? "success" :
                              interview.feedback.recommendation === "hold" ? "warning" : "danger"
                            }
                          >
                            {interview.feedback.recommendation === "pass" 
                              ? (language === "en" ? "Recommended to proceed" : "موصى بالمتابعة")
                              : interview.feedback.recommendation === "hold"
                              ? (language === "en" ? "Hold for review" : "قيد المراجعة")
                              : (language === "en" ? "Not recommended" : "غير موصى به")
                            }
                          </Chip>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-medium">
                              {language === "en" ? "Strengths:" : "نقاط القوة:"}
                            </p>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              {interview.feedback.strengths.map((strength, i) => (
                                <li key={i}>{strength}</li>
                              ))}
                            </ul>
                            
                            <p className="text-sm font-medium mt-2">
                              {language === "en" ? "Areas for Improvement:" : "مجالات للتحسين:"}
                            </p>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                              {interview.feedback.weaknesses.map((weakness, i) => (
                                <li key={i}>{weakness}</li>
                              ))}
                            </ul>
                          </div>
                        </Card>
                      </div>
                    )}
                    
                    {/* Quick Feedback Summary for completed interviews - this is now redundant with the full tab,
                         but we keep a short version here for quick reference */}
                    {interview.status === "completed" && interview.feedback && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-md font-medium flex items-center gap-2">
                            {language === "en" ? "Feedback Summary" : "ملخص التقييم"}
                            <Button
                              size="sm"
                              variant="flat"
                              color="primary"
                              onPress={() => setActiveTab("feedback")}
                              endContent={<Icon icon="lucide:arrow-right" size={14} />}
                            >
                              {language === "en" ? "View Full Feedback" : "عرض التقييم الكامل"}
                            </Button>
                          </h3>
                        </div>
                        <Card className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Avatar 
                                src={interview.interviewers[0].avatar} 
                                name={interview.interviewers[0].name}
                                size="sm"
                              />
                              <span className="font-medium">{interview.interviewers[0].name}</span>
                            </div>
                            <div className="flex items-center">
                              <div className="flex me-2">
                                {Array(5).fill(0).map((_, i) => (
                                  <Icon 
                                    key={i}
                                    icon="lucide:star" 
                                    className={i < Math.floor(interview.feedback.overallScore) 
                                      ? "text-yellow-500" 
                                      : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                              <span className="font-medium">{interview.feedback.overallScore}/5</span>
                            </div>
                          </div>
                          
                          <Chip
                            className="mb-3"
                            color={
                              interview.feedback.recommendation === "pass" ? "success" :
                              interview.feedback.recommendation === "hold" ? "warning" : "danger"
                            }
                            variant="flat"
                            startContent={
                              interview.feedback.recommendation === "pass" ? 
                                <Icon icon="lucide:check-circle" className="text-xs" /> : 
                              interview.feedback.recommendation === "hold" ?
                                <Icon icon="lucide:alert-circle" className="text-xs" /> :
                                <Icon icon="lucide:x-circle" className="text-xs" />
                            }
                          >
                            {interview.feedback.recommendation === "pass" 
                              ? (language === "en" ? "Recommended to Proceed" : "موصى بالمتابعة")
                              : interview.feedback.recommendation === "hold"
                              ? (language === "en" ? "Hold for Review" : "قيد المراجعة")
                              : (language === "en" ? "Not Recommended" : "غير موصى به")
                            }
                          </Chip>
                          
                          {/* Show just the first 2 strengths and weaknesses as a summary */}
                          {interview.feedback.strengths.length > 0 && (
                            <div className="space-y-1 mb-2">
                              <p className="text-sm font-medium text-gray-600">
                                {language === "en" ? "Key Strengths:" : "نقاط القوة الرئيسية:"}
                              </p>
                              <ul className="list-disc pl-5 text-sm">
                                {interview.feedback.strengths.slice(0, 2).map((strength, i) => (
                                  <li key={i} className="text-gray-600">{strength}</li>
                                ))}
                                {interview.feedback.strengths.length > 2 && (
                                  <li className="text-gray-600">
                                    <span className="text-primary">
                                      {language === "en" 
                                        ? `+${interview.feedback.strengths.length - 2} more...` 
                                        : `+${interview.feedback.strengths.length - 2} المزيد...`}
                                    </span>
                                  </li>
                                )}
                              </ul>
                            </div>
                          )}
                        </Card>
                      </div>
                    )}
                  </div>
                </Tab>
                <Tab 
                  key="candidate" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:user" />
                      <span>{language === "en" ? "Candidate" : "المرشح"}</span>
                    </div>
                  }
                >
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Left Column - 2/3 width */}
                      <div className="lg:col-span-2 space-y-6">
                        {/* Candidate Overview Section */}
                        <Card className="overflow-hidden">
                          <div className="p-4 border-b flex justify-between items-center">
                            <h3 className="text-md font-medium">
                              {language === "en" ? "Candidate Overview" : "نظرة عامة على المرشح"}
                            </h3>
                            <Chip
                              color={
                                interview.status === "upcoming" ? "primary" : 
                                interview.status === "in-progress" ? "warning" :
                                interview.status === "completed" ? "success" : "danger"
                              }
                              variant="flat"
                              size="sm"
                            >
                              {interview.status === "upcoming"
                                ? (language === "en" ? "Upcoming" : "قادمة")
                                : interview.status === "in-progress"
                                ? (language === "en" ? "In Progress" : "قيد التنفيذ")
                                : interview.status === "completed"
                                ? (language === "en" ? "Completed" : "مكتملة")
                                : (language === "en" ? "Canceled" : "ملغاة")}
                            </Chip>
                          </div>
                          <div className="p-4">
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Avatar
                                src={interview.candidate.avatar}
                                name={interview.candidate.name}
                                className="w-20 h-20"
                              />
                              <div className="space-y-3 flex-1">
                                <div>
                                  <h3 className="text-xl font-semibold">
                                    {interview.candidate.name}
                                  </h3>
                                  <p className="text-gray-600">{interview.candidate.position}</p>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                  <div className="flex items-center gap-2">
                                    <Icon icon="lucide:mail" className="text-gray-500" />
                                    <span className="text-sm">{interview.candidate.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon icon="lucide:phone" className="text-gray-500" />
                                    <span className="text-sm">{interview.candidate.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon icon="lucide:briefcase" className="text-gray-500" />
                                    <span className="text-sm">{interview.jobTitle}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon icon="lucide:tag" className="text-gray-500" />
                                    <span className="text-sm">{interview.type}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon icon="lucide:building" className="text-gray-500" />
                                    <span className="text-sm">{interview.department}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon icon="lucide:calendar" className="text-gray-500" />
                                    <span className="text-sm">{formattedDate}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        {/* AI Match Score Panel - Enhanced */}
                        {interview.candidate.aiMatchScore && (
                          <Card className="overflow-hidden">
                            <div className="p-4 border-b">
                              <h3 className="text-md font-medium flex items-center gap-2">
                                <Icon icon="lucide:sparkles" className="text-blue-600" />
                                {language === "en" ? "AI Match Analysis" : "تحليل تطابق الذكاء الاصطناعي"}
                              </h3>
                            </div>
                            <div className="p-4 space-y-4">
                              {/* Overall score */}
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-gray-700">
                                    {language === "en" 
                                      ? "Overall match with job requirements" 
                                      : "التطابق العام مع متطلبات الوظيفة"}
                                  </span>
                                  <span className="text-lg font-bold text-blue-700">
                                    {interview.candidate.aiMatchScore}%
                                  </span>
                                </div>
                                <div className="w-full bg-blue-200 rounded-full h-2.5">
                                  <div 
                                    className="bg-blue-600 h-2.5 rounded-full" 
                                    style={{ width: `${interview.candidate.aiMatchScore}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {/* Top matched skills */}
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-700">
                                  {language === "en" ? "Top Matched Skills:" : "أفضل المهارات المتطابقة:"}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Chip size="sm" color="success" variant="flat">React.js (95%)</Chip>
                                  <Chip size="sm" color="success" variant="flat">TypeScript (92%)</Chip>
                                  <Chip size="sm" color="success" variant="flat">API Integration (88%)</Chip>
                                </div>
                              </div>
                              
                              {/* AI Insight Summary */}
                              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-800">
                                  {language === "en"
                                    ? "Strong frontend development skills with React and TypeScript. Excellent communication and collaborative approach. Lacking in backend engineering and database optimization experience."
                                    : "مهارات قوية في تطوير الواجهة الأمامية باستخدام React و TypeScript. تواصل ممتاز ونهج تعاوني. ينقصه الخبرة في هندسة الخلفية وتحسين قواعد البيانات."}
                                </p>
                              </div>
                            </div>
                          </Card>
                        )}

                        {/* Previous Assessments & Feedback - Enhanced */}
                        <Card className="overflow-hidden">
                          <div className="p-4 border-b">
                            <h3 className="text-md font-medium">
                              {language === "en" ? "Previous Assessments" : "التقييمات السابقة"}
                            </h3>
                          </div>
                          <div className="p-4">
                            <div className="space-y-4">
                              <Card className="p-4 border">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-3">
                                      <Avatar 
                                        src="https://img.heroui.chat/image/avatar?w=200&h=200&u=28" 
                                        name="Sarah Johnson"
                                        size="sm"
                                      />
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <p className="font-medium">
                                            {language === "en" ? "Screening Interview" : "مقابلة الفرز"}
                                          </p>
                                          <Chip color="success" variant="flat" size="sm">
                                            {language === "en" ? "Passed" : "اجتاز"}
                                          </Chip>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                          <span>{language === "en" ? "Sarah Johnson" : "سارة جونسون"}</span>
                                          <span>•</span>
                                          <span>{language === "en" ? "May 12, 2023" : "١٢ مايو ٢٠٢٣"}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="flex me-1">
                                        {Array(5).fill(0).map((_, i) => (
                                          <Icon 
                                            key={i}
                                            icon="lucide:star" 
                                            size={14}
                                            className={i < 4 ? "text-yellow-500" : "text-gray-300"}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm font-medium">4/5</span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {language === "en"
                                      ? "Candidate demonstrated strong communication skills and relevant experience. Technical skills align well with position requirements."
                                      : "أظهر المرشح مهارات اتصال قوية وخبرة ذات صلة. المهارات التقنية تتوافق جيدًا مع متطلبات المنصب."}
                                  </p>
                                </div>
                              </Card>
                              
                              <Card className="p-4 border">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-3">
                                      <div className="p-2 bg-purple-100 rounded-md">
                                        <Icon icon="lucide:code" className="text-purple-600" />
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <p className="font-medium">
                                            {language === "en" ? "Coding Assessment" : "تقييم البرمجة"}
                                          </p>
                                          <Chip color="success" variant="flat" size="sm">85%</Chip>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                          <span>{language === "en" ? "Automated" : "آلي"}</span>
                                          <span>•</span>
                                          <span>{language === "en" ? "May 15, 2023" : "١٥ مايو ٢٠٢٣"}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <Button 
                                      size="sm" 
                                      variant="flat" 
                                      color="primary"
                                      startContent={<Icon icon="lucide:eye" size={14} />}
                                    >
                                      {language === "en" ? "View Report" : "عرض التقرير"}
                                    </Button>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {language === "en"
                                      ? "Candidate showed excellent problem-solving abilities and clean code structure. Strong with algorithms and data structures."
                                      : "أظهر المرشح قدرات ممتازة في حل المشكلات وبنية كود نظيفة. قوي في الخوارزميات وهياكل البيانات."}
                                  </p>
                                </div>
                              </Card>
                              
                              <Card className="p-4 border">
                                <div className="space-y-4">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-3">
                                      <Avatar 
                                        src="https://img.heroui.chat/image/avatar?w=200&h=200&u=22" 
                                        name="Mike Chen"
                                        size="sm"
                                      />
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <p className="font-medium">
                                            {language === "en" ? "Technical Assessment" : "التقييم التقني"}
                                          </p>
                                          <Chip color="warning" variant="flat" size="sm">
                                            {language === "en" ? "Hold" : "تعليق"}
                                          </Chip>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                          <span>{language === "en" ? "Mike Chen" : "مايك تشين"}</span>
                                          <span>•</span>
                                          <span>{language === "en" ? "May 18, 2023" : "١٨ مايو ٢٠٢٣"}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="flex items-center">
                                      <div className="flex me-1">
                                        {Array(5).fill(0).map((_, i) => (
                                          <Icon 
                                            key={i}
                                            icon="lucide:star" 
                                            size={14}
                                            className={i < 3 ? "text-yellow-500" : "text-gray-300"}
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm font-medium">3/5</span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-gray-600">
                                    {language === "en"
                                      ? "Strong on frontend concepts but needs improvement in system design and backend architecture knowledge. Recommend additional technical interview focused on these areas."
                                      : "قوي في مفاهيم الواجهة الأمامية ولكن يحتاج إلى تحسين في معرفة تصميم النظام وبنية الخلفية. نوصي بإجراء مقابلة تقنية إضافية تركز على هذه المجالات."}
                                  </p>
                                </div>
                              </Card>
                            </div>
                          </div>
                        </Card>
                      </div>
                      
                      {/* Right Column - 1/3 width */}
                      <div className="space-y-6">
                        {/* Key Documents Section - Collapsible */}
                        <Card className="overflow-hidden">
                          <div className="p-4 border-b flex justify-between">
                            <h3 className="text-md font-medium">
                              {language === "en" ? "Key Documents" : "مستندات رئيسية"}
                            </h3>
                            <Button 
                              size="sm" 
                              variant="flat" 
                              color="primary"
                              startContent={<Icon icon="lucide:external-link" size={14} />}
                            >
                              {language === "en" ? "Open All" : "فتح الكل"}
                            </Button>
                          </div>
                          <Accordion variant="splitted">
                            <AccordionItem 
                              key="resume" 
                              aria-label="Resume" 
                              title={
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-red-100 rounded-md">
                                    <Icon icon="lucide:file-text" className="text-red-600" />
                                  </div>
                                  <span>{language === "en" ? "Resume" : "السيرة الذاتية"}</span>
                                </div>
                              }
                            >
                              <div className="p-4 bg-gray-50 rounded-md">
                                <div className="flex justify-between mb-3">
                                  <span className="text-sm text-gray-500">resume-john-doe.pdf</span>
                                  <div className="flex gap-2">
                                    <Button 
                                      size="sm" 
                                      variant="flat" 
                                      color="primary"
                                      isIconOnly
                                      aria-label="Download"
                                    >
                                      <Icon icon="lucide:download" size={16} />
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="flat" 
                                      color="primary"
                                      isIconOnly
                                      aria-label="Print"
                                    >
                                      <Icon icon="lucide:printer" size={16} />
                                    </Button>
                                  </div>
                                </div>
                                <div className="border bg-white h-40 rounded-md flex items-center justify-center">
                                  <p className="text-gray-500">{language === "en" ? "PDF Preview" : "معاينة PDF"}</p>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="flat" 
                                  color="primary"
                                  fullWidth
                                  className="mt-3"
                                  startContent={<Icon icon="lucide:maximize" size={14} />}
                                >
                                  {language === "en" ? "View Full Document" : "عرض المستند كاملاً"}
                                </Button>
                              </div>
                            </AccordionItem>
                            <AccordionItem 
                              key="application" 
                              aria-label="Application" 
                              title={
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-blue-100 rounded-md">
                                    <Icon icon="lucide:clipboard-list" className="text-blue-600" />
                                  </div>
                                  <span>{language === "en" ? "Application Form" : "نموذج الطلب"}</span>
                                </div>
                              }
                            >
                              <div className="p-2">
                                <Button 
                                  size="sm" 
                                  variant="flat" 
                                  color="primary"
                                  fullWidth
                                  startContent={<Icon icon="lucide:eye" size={14} />}
                                >
                                  {language === "en" ? "View Application" : "عرض الطلب"}
                                </Button>
                              </div>
                            </AccordionItem>
                            <AccordionItem 
                              key="portfolio" 
                              aria-label="Portfolio" 
                              title={
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-green-100 rounded-md">
                                    <Icon icon="lucide:briefcase" className="text-green-600" />
                                  </div>
                                  <span>{language === "en" ? "Portfolio" : "معرض الأعمال"}</span>
                                </div>
                              }
                            >
                              <div className="p-2">
                                <Button 
                                  size="sm" 
                                  variant="flat" 
                                  color="primary"
                                  fullWidth
                                  startContent={<Icon icon="lucide:external-link" size={14} />}
                                >
                                  {language === "en" ? "Open Portfolio" : "فتح معرض الأعمال"}
                                </Button>
                              </div>
                            </AccordionItem>
                          </Accordion>
                        </Card>

                        {/* Interview Prep Checklist */}
                        <Card className="overflow-hidden">
                          <div className="p-4 border-b">
                            <h3 className="text-md font-medium">
                              {language === "en" ? "Interview Preparation" : "تحضير المقابلة"}
                            </h3>
                          </div>
                          <div className="p-4 space-y-4">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-2">
                                <Icon icon="lucide:clock" className="text-gray-500" />
                                <span className="text-sm">{language === "en" ? "Duration" : "المدة"}</span>
                              </div>
                              <span className="font-medium">{interview.duration} minutes</span>
                            </div>
                            
                            <div className="space-y-2">
                              <p className="text-sm font-medium">
                                {language === "en" ? "Assigned Interviewers" : "المقابلون المعينون"}
                              </p>
                              <div className="space-y-2">
                                {interview.interviewers.map((interviewer, idx) => (
                                  <div key={idx} className="flex items-center gap-2">
                                    <Avatar 
                                      src={interviewer.avatar} 
                                      name={interviewer.name}
                                      size="sm"
                                    />
                                    <div>
                                      <p className="text-sm font-medium">{interviewer.name}</p>
                                      <p className="text-xs text-gray-500">{interviewer.position}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <p className="text-sm font-medium">
                                  {language === "en" ? "Resources" : "الموارد"}
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  variant="flat" 
                                  color="primary"
                                  fullWidth
                                  startContent={<Icon icon="lucide:file-text" size={14} />}
                                  className="justify-start"
                                >
                                  {language === "en" ? "View Interview Guide" : "عرض دليل المقابلة"}
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="flat" 
                                  color="primary"
                                  fullWidth
                                  startContent={<Icon icon="lucide:download" size={14} />}
                                  className="justify-start"
                                >
                                  {language === "en" ? "Download Scorecard Template" : "تنزيل قالب بطاقة التقييم"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                        
                        {/* Custom Notes for Interviewer */}
                        <Card className="overflow-hidden">
                          <div className="p-4 border-b bg-amber-50">
                            <h3 className="text-md font-medium flex items-center gap-2">
                              <Icon icon="lucide:bookmark" className="text-amber-600" />
                              {language === "en" ? "Internal Notes" : "ملاحظات داخلية"}
                            </h3>
                          </div>
                          <div className="p-4 bg-amber-50">
                            <div className="bg-white border border-amber-200 rounded-md p-3">
                              <p className="text-sm text-gray-700">
                                {language === "en" 
                                  ? "Please focus on assessing candidate's system design skills, specifically microservices architecture understanding. Previous interviewers noted this as a potential gap. Also check communication skills in explaining complex technical concepts." 
                                  : "يرجى التركيز على تقييم مهارات تصميم النظام للمرشح، وخاصة فهم بنية الخدمات المصغرة. لاحظ المقابلون السابقون هذا كفجوة محتملة. تحقق أيضًا من مهارات الاتصال في شرح المفاهيم التقنية المعقدة."}
                              </p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-3">
                                <Icon icon="lucide:user" size={12} />
                                <span>{language === "en" ? "Added by: Recruitment Manager" : "أضيف بواسطة: مدير التوظيف"}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab 
                  key="questions" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:list" />
                      <span>{language === "en" ? "Questions" : "الأسئلة"}</span>
                    </div>
                  }
                >
                  <div className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-md font-medium">
                        {language === "en" ? "Interview Questions" : "أسئلة المقابلة"}
                      </h3>
                      
                      <Card className="p-4 bg-blue-50 border-blue-200">
                        <div className="flex gap-3 items-center mb-2">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Icon icon="lucide:sparkles" className="text-blue-600" />
                          </div>
                          <h3 className="font-medium text-blue-700">
                            {language === "en" ? "AI-Generated Questions" : "أسئلة منشأة بواسطة الذكاء الاصطناعي"}
                          </h3>
                        </div>
                        <p className="text-sm text-blue-600">
                          {language === "en"
                            ? "These questions are tailored for the position based on the job description and candidate profile."
                            : "هذه الأسئلة مخصصة للمنصب بناءً على وصف الوظيفة وملف المرشح."}
                        </p>
                      </Card>
                      
                      <div className="space-y-3">
                        {sampleQuestions.map((question, index) => (
                          <Card key={index} className="p-3">
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="font-medium text-gray-700">
                                  {index + 1}. {language === "en" ? question.en : question.ar}
                                </span>
                                <Chip size="sm" variant="flat">
                                  {language === "en" ? question.category.en : question.category.ar}
                                </Chip>
                              </div>
                              {question.note && (
                                <p className="text-sm text-gray-500">
                                  {language === "en" ? "Note: " : "ملاحظة: "}
                                  {language === "en" ? question.note.en : question.note.ar}
                                </p>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </Tab>
                
                {/* Add new Feedback Tab - only visible for completed interviews with feedback */}
                {interview.status === "completed" && interview.feedback && (
                  <Tab 
                    key="feedback" 
                    title={
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:message-square" />
                        <span>{language === "en" ? "Feedback" : "التقييم"}</span>
                      </div>
                    }
                  >
                    <div className="p-6 space-y-6">
                      {/* Feedback Header with Interviewer info */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <Avatar 
                            src={interview.interviewers[0].avatar} 
                            name={interview.interviewers[0].name}
                            size="md"
                          />
                          <div>
                            <h3 className="font-medium text-lg">{interview.interviewers[0].name}</h3>
                            <p className="text-gray-500 text-sm">{interview.interviewers[0].position}</p>
                          </div>
                        </div>
                        
                        <Chip
                          className="h-7"
                          color={
                            interview.feedback.recommendation === "pass" ? "success" :
                            interview.feedback.recommendation === "hold" ? "warning" : "danger"
                          }
                          variant="flat"
                          startContent={
                            interview.feedback.recommendation === "pass" ? 
                              <Icon icon="lucide:check-circle" className="text-xs" /> : 
                            interview.feedback.recommendation === "hold" ?
                              <Icon icon="lucide:alert-circle" className="text-xs" /> :
                              <Icon icon="lucide:x-circle" className="text-xs" />
                          }
                        >
                          {interview.feedback.recommendation === "pass" 
                            ? (language === "en" ? "Recommended to Proceed" : "موصى بالمتابعة")
                            : interview.feedback.recommendation === "hold"
                            ? (language === "en" ? "Hold for Review" : "قيد المراجعة")
                            : (language === "en" ? "Not Recommended" : "غير موصى به")
                          }
                        </Chip>
                      </div>
                      
                      {/* Overall Score Card */}
                      <Card className="bg-gray-50">
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="font-medium">
                            {language === "en" ? "Overall Assessment" : "التقييم الشامل"}
                          </h3>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600">
                              {language === "en" ? "Overall Score" : "الدرجة الإجمالية"}
                            </span>
                            <div className="flex items-center">
                              <div className="flex me-2">
                                {Array(5).fill(0).map((_, i) => (
                                  <Icon 
                                    key={i}
                                    icon="lucide:star" 
                                    className={i < Math.floor(interview.feedback.overallScore) 
                                      ? "text-yellow-500" 
                                      : "text-gray-300"
                                    }
                                    width={20}
                                  />
                                ))}
                              </div>
                              <span className="font-medium text-lg">
                                {interview.feedback.overallScore}/5
                              </span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div className="space-y-3">
                              <div className="font-medium text-gray-700">
                                {language === "en" ? "Strengths:" : "نقاط القوة:"}
                              </div>
                              <ul className="list-disc ps-5 space-y-1">
                                {interview.feedback.strengths.map((strength, i) => (
                                  <li key={i} className="text-gray-700">{strength}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="font-medium text-gray-700">
                                {language === "en" ? "Areas for Improvement:" : "مجالات للتحسين:"}
                              </div>
                              <ul className="list-disc ps-5 space-y-1">
                                {interview.feedback.weaknesses.map((weakness, i) => (
                                  <li key={i} className="text-gray-700">{weakness}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Card>
                      
                      {/* Detailed Question Responses */}
                      {interview.feedback.questions && interview.feedback.questions.length > 0 && (
                        <div className="space-y-4">
                          <h3 className="font-medium text-lg">
                            {language === "en" ? "Question Assessments" : "تقييم الأسئلة"}
                          </h3>
                          
                          <div className="space-y-3">
                            {interview.feedback.questions.map((question, idx) => (
                              <Card key={idx} className="overflow-hidden">
                                <div className="p-3 bg-gray-50 border-b">
                                  <div className="flex justify-between items-center">
                                    <p className="font-medium">{idx + 1}. {question.question}</p>
                                    <span className="flex items-center">
                                      <div className="flex me-1">
                                        {Array(5).fill(0).map((_, i) => (
                                          <Icon 
                                            key={i}
                                            icon="lucide:star" 
                                            size={16}
                                            className={i < question.score ? "text-yellow-500" : "text-gray-300"}
                                          />
                                        ))}
                                      </div>
                                      <span className="font-medium ms-1">{question.score}/5</span>
                                    </span>
                                  </div>
                                </div>
                                {question.comment && (
                                  <div className="p-3">
                                    <p className="text-gray-600 text-sm">{question.comment}</p>
                                  </div>
                                )}
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Feedback Notes */}
                      {interview.feedback.notes && (
                        <div className="space-y-3">
                          <h3 className="font-medium">
                            {language === "en" ? "Additional Notes" : "ملاحظات إضافية"}
                          </h3>
                          <Card className="p-3">
                            <p className="text-gray-700">{interview.feedback.notes}</p>
                          </Card>
                        </div>
                      )}
                      
                      {/* Next Steps Recommendation */}
                      <Card className="bg-blue-50 border-blue-200">
                        <div className="p-4">
                          <div className="flex gap-3 items-start">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Icon icon="lucide:flag" className="text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-blue-700">
                                {language === "en" ? "Next Steps" : "الخطوات التالية"}
                              </h3>
                              <p className="text-sm text-blue-600 mt-1">
                                {interview.feedback.recommendation === "pass" 
                                  ? (language === "en" 
                                      ? "Based on the positive feedback, proceed to the next stage of the recruitment process." 
                                      : "بناءً على التقييم الإيجابي، انتقل إلى المرحلة التالية من عملية التوظيف.")
                                  : interview.feedback.recommendation === "hold"
                                  ? (language === "en" 
                                      ? "Consider scheduling a follow-up interview to address specific areas before making a final decision." 
                                      : "فكر في جدولة مقابلة متابعة لمعالجة مجالات محددة قبل اتخاذ قرار نهائي.")
                                  : (language === "en" 
                                      ? "Based on the feedback, the candidate is not recommended to proceed to the next stage."
                                      : "بناءً على التقييم، لا يُنصح بانتقال المرشح إلى المرحلة التالية.")
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Tab>
                )}
              </Tabs>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                variant="flat" 
                onPress={onClose}
              >
                {language === "en" ? "Close" : "إغلاق"}
              </Button>
              
              {interview.status === "upcoming" && (
                <>
                  <Button 
                    color="primary"
                    variant="flat"
                    startContent={<Icon icon="lucide:file-text" />}
                  >
                    {language === "en" ? "View Interview Guide" : "عرض دليل المقابلة"}
                  </Button>
                  <Button 
                    color="warning"
                    startContent={<Icon icon="lucide:activity" />}
                    onPress={() => {
                      updateInterviewStatus(interview.id, "in-progress");
                    }}
                  >
                    {language === "en" ? "Start Interview" : "بدء المقابلة"}
                  </Button>
                  <Button 
                    color="primary" 
                    startContent={<Icon icon="lucide:calendar-check" />}
                  >
                    {language === "en" ? "Send Calendar Invite" : "إرسال دعوة التقويم"}
                  </Button>
                </>
              )}

              {interview.status === "in-progress" && (
                <Button 
                  color="success"
                  startContent={<Icon icon="lucide:check-circle" />}
                  onPress={() => {
                    updateInterviewStatus(interview.id, "completed");
                    openFeedbackForm(interview.id);
                  }}
                >
                  {language === "en" ? "Complete & Add Feedback" : "إكمال وإضافة تقييم"}
                </Button>
              )}
              
              {interview.status === "completed" && !interview.feedback && (
                <Button 
                  color="primary"
                  onPress={() => {
                    onClose();
                    openFeedbackForm(interview.id);
                  }}
                >
                  {language === "en" ? "Submit Feedback" : "إرسال التقييم"}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface DetailItemProps {
  icon: string;
  label: string;
  value: string;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-gray-100 rounded-lg">
        <Icon icon={icon} className="text-gray-600" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

// Sample interview questions
const sampleQuestions = [
  {
    en: "Can you explain the difference between React hooks and class components?",
    ar: "هل يمكنك شرح الفرق بين React hooks ومكونات الفئة؟",
    category: { en: "Technical", ar: "تقنية" },
    note: {
      en: "Assess understanding of modern React patterns",
      ar: "تقييم فهم أنماط React الحديثة"
    }
  },
  {
    en: "What strategies do you use for optimizing front-end performance?",
    ar: "ما هي الاستراتيجيات التي تستخدمها لتحسين أداء الواجهة الأمامية؟",
    category: { en: "Technical", ar: "تقنية" }
  },
  {
    en: "Tell me about a challenging project you worked on and how you overcame obstacles.",
    ar: "أخبرني عن مشروع صعب عملت عليه وكيف تغلبت على العقبات.",
    category: { en: "Behavioral", ar: "سلوكية" },
    note: {
      en: "Look for problem-solving approach and persistence",
      ar: "ابحث عن نهج حل المشكلات والمثابرة"
    }
  },
  {
    en: "How do you approach testing in frontend applications?",
    ar: "كيف تقارب الاختبار في تطبيقات الواجهة الأمامية؟",
    category: { en: "Technical", ar: "تقنية" }
  },
  {
    en: "How do you handle competing priorities and tight deadlines?",
    ar: "كيف تتعامل مع الأولويات المتنافسة والمواعيد النهائية الضيقة؟",
    category: { en: "Behavioral", ar: "سلوكية" }
  },
];

export default InterviewDetailsModal;