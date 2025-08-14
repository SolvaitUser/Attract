import React, { useState, ReactElement } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Stepper, Step, StepLabel, StepStatus, Card, Input, Select, SelectItem, Textarea, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../context/LanguageContext";
import { useInterviewContext } from "../../context/InterviewContext";
import CandidateSelector from "./wizard/CandidateSelector";
import JobRequisitionSelector from "./wizard/JobRequisitionSelector";
import InterviewerSelector from "./wizard/InterviewerSelector";
import QuestionBuilder from "./wizard/QuestionBuilder";
import ScorecardCustomizer from "./wizard/ScorecardCustomizer";
import { format } from "date-fns";
import AddNewCandidateModal from "./modals/AddNewCandidateModal";

interface ScheduleInterviewWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const ScheduleInterviewWizard: React.FC<ScheduleInterviewWizardProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const { addInterview } = useInterviewContext();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    // Step 1: Candidate & Job
    candidateId: "",
    jobRequisitionId: "",
    
    // Step 2: Interview Setup
    type: "",
    platform: "",
    date: "",
    time: "",
    duration: "60",
    interviewers: [] as string[],
    notes: "",
    
    // Step 3: Questions & Scorecard
    questions: [],
    useAiQuestions: false
  });
  
  // Steps
  const steps = [
    { key: "candidate", label: { en: "Candidate & Job", ar: "المرشح والوظيفة" } },
    { key: "setup", label: { en: "Interview Setup", ar: "إعداد المقابلة" } },
    { key: "questions", label: { en: "Questions & Scorecard", ar: "الأسئلة والتقييم" } }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = () => {
    // Create a new interview object
    const newInterview = {
      id: `new-${Date.now()}`,
      candidate: sampleCandidates.find(c => c.id === formData.candidateId) || sampleCandidates[0],
      jobTitle: sampleJobs.find(j => j.id === formData.jobRequisitionId)?.title || "Frontend Developer",
      department: sampleJobs.find(j => j.id === formData.jobRequisitionId)?.department || "Engineering",
      type: formData.type,
      date: `${formData.date}T${formData.time}:00`,
      duration: parseInt(formData.duration),
      platform: formData.platform,
      interviewers: sampleInterviewers.filter(i => formData.interviewers.includes(i.id)),
      status: "upcoming",
      notes: formData.notes,
    };
    
    // Add to context
    addInterview(newInterview as any);
    
    // Reset form and close modal
    setFormData({
      candidateId: "",
      jobRequisitionId: "",
      type: "",
      platform: "",
      date: "",
      time: "",
      duration: "60",
      interviewers: [],
      notes: "",
      questions: [],
      useAiQuestions: false
    });
    
    setCurrentStep(0);
    onClose();
  };
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  // Render appropriate step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1 
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 1:
        return (
          <Step2 
            formData={formData}
            handleChange={handleChange}
          />
        );
      case 2:
        return (
          <Step3 
            formData={formData}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };
  
  // Check if current step is valid to enable next button
  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.candidateId && formData.jobRequisitionId;
      case 1:
        return formData.type && formData.platform && formData.date && 
               formData.time && formData.duration && formData.interviewers.length > 0;
      case 2:
        return true; // Always valid for last step
      default:
        return false;
    }
  };
  
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {language === "en" ? "Schedule Interview" : "جدولة مقابلة"}
            </ModalHeader>
            
            <ModalBody>
              {/* Stepper */}
              <div className="mb-6">
                <ol className="flex items-center w-full">
                  {steps.map((step, index) => (
                    <li key={step.key} className={`
                      flex items-center relative
                      ${index < steps.length - 1 ? "w-full" : ""}
                    `}>
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-full text-sm
                        ${index < currentStep ? "bg-blue-600 text-white" : 
                          index === currentStep ? "bg-blue-100 text-blue-600 border border-blue-600" :
                          "bg-gray-100 text-gray-500"}
                      `}>
                        {index < currentStep ? (
                          <Icon icon="lucide:check" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      <span className="ms-3 text-sm font-medium hidden sm:inline">
                        {step.label[language]}
                      </span>
                      
                      {index < steps.length - 1 && (
                        <div className={`
                          flex-1 ml-2 mr-2 h-0.5
                          ${index < currentStep ? "bg-blue-600" : "bg-gray-200"}
                        `}></div>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              
              {/* Step Content */}
              <div className="mt-6">
                {renderStepContent()}
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                variant="flat" 
                onPress={onClose}
                className="me-2"
              >
                {language === "en" ? "Cancel" : "إلغاء"}
              </Button>
              {currentStep > 0 && (
                <Button 
                  variant="flat" 
                  onPress={handleBack}
                  className="me-2"
                  startContent={<Icon icon="lucide:arrow-left" />}
                >
                  {language === "en" ? "Back" : "رجوع"}
                </Button>
              )}
              <Button 
                color="primary" 
                onPress={handleNext}
                isDisabled={!isStepValid()}
                endContent={
                  currentStep < steps.length - 1 
                    ? <Icon icon="lucide:arrow-right" /> 
                    : undefined
                }
              >
                {currentStep < steps.length - 1 
                  ? (language === "en" ? "Next" : "التالي")
                  : (language === "en" ? "Schedule Interview" : "جدولة المقابلة")
                }
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

// Step 1: Job & Candidate
interface Step1Props {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

const Step1: React.FC<Step1Props> = ({ formData, handleChange }) => {
  const { language } = useLanguage();
  const [isAddCandidateModalOpen, setIsAddCandidateModalOpen] = React.useState(false);
  const [filteredCandidates, setFilteredCandidates] = React.useState<any[]>([]);
  
  // Update filtered candidates when job selection changes
  React.useEffect(() => {
    if (formData.jobRequisitionId) {
      // Filter candidates based on selected job
      const filtered = sampleCandidates.filter(
        candidate => candidate.jobApplications.includes(formData.jobRequisitionId)
      );
      setFilteredCandidates(filtered);
      
      // Clear candidate selection if current selection isn't part of the filtered results
      if (formData.candidateId && !filtered.some(c => c.id === formData.candidateId)) {
        handleChange("candidateId", "");
      }
    } else {
      setFilteredCandidates([]);
      handleChange("candidateId", "");
    }
  }, [formData.jobRequisitionId]);
  
  const handleAddCandidate = (newCandidate: any) => {
    // Add the new candidate to the list
    sampleCandidates.unshift(newCandidate);
    
    // Auto-select the newly added candidate
    handleChange("candidateId", newCandidate.id);
  };
  
  return (
    <div className="space-y-6">
      {/* Job Requisition Selection - Now first */}
      <div className="space-y-3">
        <h3 className="text-md font-medium">
          {language === "en" ? "Select Job Requisition" : "اختر طلب الوظيفة"}
        </h3>
        
        <JobRequisitionSelector
          selectedJobId={formData.jobRequisitionId}
          onSelectJob={(id) => handleChange("jobRequisitionId", id)}
          jobs={sampleJobs}
        />
      </div>
      
      {/* Candidate Selection - Now second and filtered by job */}
      {formData.jobRequisitionId && (
        <div className="space-y-3">
          <div className="flex justify-between">
            <h3 className="text-md font-medium">
              {language === "en" ? "Select Candidate" : "اختر المرشح"}
            </h3>
            <Button 
              size="sm" 
              variant="light" 
              color="primary"
              startContent={<Icon icon="lucide:plus" size={16} />}
              onPress={() => setIsAddCandidateModalOpen(true)}
            >
              {language === "en" ? "Add New Candidate" : "إضافة مرشح جديد"}
            </Button>
          </div>
          
          {filteredCandidates.length > 0 ? (
            <CandidateSelector
              selectedCandidateId={formData.candidateId}
              onSelectCandidate={(id) => handleChange("candidateId", id)}
              candidates={filteredCandidates}
            />
          ) : (
            <Card className="p-4 text-center">
              <p className="text-gray-500">
                {language === "en" 
                  ? "No candidates have applied for this job yet." 
                  : "لم يتقدم أي مرشحين لهذه الوظيفة بعد."}
              </p>
            </Card>
          )}
        </div>
      )}
      
      {/* Add New Candidate Modal */}
      <AddNewCandidateModal 
        isOpen={isAddCandidateModalOpen}
        onClose={() => setIsAddCandidateModalOpen(false)}
        onAddCandidate={handleAddCandidate}
        selectedJobId={formData.jobRequisitionId}
      />
      
      {/* Recruitment Workflow - Now displayed based on candidate selection */}
      {formData.candidateId && (
        <Card className="p-4">
          <h4 className="font-medium mb-3">
            {language === "en" ? "Recruitment Workflow" : "سير عملية التوظيف"}
          </h4>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Icon icon="lucide:check" />
            </div>
            <div className="ms-2 me-2 h-1 flex-grow bg-green-600"></div>
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <Icon icon="lucide:check" />
            </div>
            <div className="ms-2 me-2 h-1 flex-grow bg-blue-600"></div>
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
              <span className="font-medium">3</span>
            </div>
            <div className="ms-2 me-2 h-1 flex-grow bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
              <span className="font-medium">4</span>
            </div>
            <div className="ms-2 me-2 h-1 flex-grow bg-gray-200"></div>
            <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center">
              <span className="font-medium">5</span>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <div className="text-center w-12">{language === "en" ? "Applied" : "تقديم"}</div>
            <div className="text-center w-12">{language === "en" ? "Screening" : "فرز"}</div>
            <div className="text-center w-12">{language === "en" ? "Interview" : "مقابلة"}</div>
            <div className="text-center w-12">{language === "en" ? "Offer" : "عرض"}</div>
            <div className="text-center w-12">{language === "en" ? "Onboard" : "تعريف"}</div>
          </div>
        </Card>
      )}
      
      {/* Previous Feedback */}
      {formData.candidateId && (
        <Card className="p-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">
              {language === "en" ? "Previous Feedback" : "التقييمات السابقة"}
            </h4>
            <Button 
              size="sm" 
              variant="light"
              startContent={<Icon icon="lucide:external-link" size={16} />}
            >
              {language === "en" ? "View All" : "عرض الكل"}
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {language === "en" ? "Resume Screening" : "فحص السيرة الذاتية"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {language === "en" ? "by John Smith, 3 days ago" : "بواسطة جون سميث، منذ 3 أيام"}
                  </p>
                </div>
                <Chip color="success" variant="flat" size="sm">
                  {language === "en" ? "Passed" : "اجتاز"}
                </Chip>
              </div>
              <p className="text-sm mt-2">
                {language === "en" 
                  ? "Strong technical background and relevant experience. Recommend proceeding to interview stage." 
                  : "خلفية تقنية قوية وخبرة ذات صلة. أنصح بالمتابعة إلى مرحلة المقابلة."}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

// Step 2: Interview Setup
interface Step2Props {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

const Step2: React.FC<Step2Props> = ({ formData, handleChange }) => {
  const { language } = useLanguage();
  
  const interviewTypes = [
    { value: "technical", label: { en: "Technical Interview", ar: "مقابلة تقنية" } },
    { value: "behavioral", label: { en: "Behavioral Interview", ar: "مقابلة سلوكية" } },
    { value: "hr", label: { en: "HR Interview", ar: "مقابلة الموارد البشرية" } },
    { value: "cultural", label: { en: "Culture Fit Interview", ar: "مقابلة ملائمة ثقافية" } },
    { value: "final", label: { en: "Final Interview", ar: "مقابلة نهائية" } },
  ];
  
  const platforms = [
    { value: "zoom", label: "Zoom", icon: "logos:zoom-icon" },
    { value: "teams", label: "Microsoft Teams", icon: "logos:microsoft-teams" },
    { value: "meet", label: "Google Meet", icon: "logos:google-meet" },
    { value: "onsite", label: { en: "On-site", ar: "في الموقع" }, icon: "lucide:building" },
  ];
  
  const durations = [
    { value: "30", label: "30 min" },
    { value: "45", label: "45 min" },
    { value: "60", label: "60 min" },
    { value: "90", label: "90 min" },
    { value: "120", label: "120 min" },
  ];
  
  return (
    <div className="space-y-6">
      {/* Interview Type */}
      <Select
        label={language === "en" ? "Interview Type" : "نوع المقابلة"}
        placeholder={language === "en" ? "Select interview type" : "اختر نوع المقابلة"}
        selectedKeys={formData.type ? [formData.type] : []}
        onChange={(e) => handleChange("type", e.target.value)}
        className="max-w-full"
        isRequired
      >
        {interviewTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {typeof type.label === "object" ? type.label[language] : type.label}
          </SelectItem>
        ))}
      </Select>
      
      {/* Platform */}
      <Select
        label={language === "en" ? "Interview Platform" : "منصة المقابلة"}
        placeholder={language === "en" ? "Select platform" : "اختر المنصة"}
        selectedKeys={formData.platform ? [formData.platform] : []}
        onChange={(e) => handleChange("platform", e.target.value)}
        className="max-w-full"
        isRequired
      >
        {platforms.map((platform) => (
          <SelectItem 
            key={platform.value} 
            value={platform.value}
            startContent={<Icon icon={platform.icon} className="text-lg" />}
          >
            {typeof platform.label === "object" ? platform.label[language] : platform.label}
          </SelectItem>
        ))}
      </Select>
      
      {/* Date and Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="date"
          label={language === "en" ? "Date" : "التاريخ"}
          value={formData.date}
          onChange={(e) => handleChange("date", e.target.value)}
          isRequired
          min={format(new Date(), "yyyy-MM-dd")}
        />
        <Input
          type="time"
          label={language === "en" ? "Time" : "الوقت"}
          value={formData.time}
          onChange={(e) => handleChange("time", e.target.value)}
          isRequired
        />
      </div>
      
      {/* Duration */}
      <Select
        label={language === "en" ? "Duration" : "المدة"}
        placeholder={language === "en" ? "Select duration" : "اختر المدة"}
        selectedKeys={formData.duration ? [formData.duration] : []}
        onChange={(e) => handleChange("duration", e.target.value)}
        className="max-w-full"
        isRequired
      >
        {durations.map((duration) => (
          <SelectItem key={duration.value} value={duration.value}>
            {duration.label}
          </SelectItem>
        ))}
      </Select>
      
      {/* AI Recommendation */}
      {formData.date && formData.time && (
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-2 items-start">
            <div className="mt-1">
              <Icon icon="lucide:sparkles" className="text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-blue-700">
                {language === "en" ? "AI Recommendation" : "توصية الذكاء الاصطناعي"}
              </p>
              <p className="text-sm text-blue-700">
                {language === "en" 
                  ? "Based on calendar availability, 10:00 AM on Tuesday is the optimal time for all participants." 
                  : "بناءً على التوفر في التقويم، الساعة 10:00 صباحًا يوم الثلاثاء هو الوقت الأمثل لجميع المشاركين."}
              </p>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                className="mt-2"
                startContent={<Icon icon="lucide:calendar-plus" size={16} />}
              >
                {language === "en" ? "Apply Suggestion" : "تطبيق الاقتراح"}
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Interviewers */}
      <div className="space-y-3">
        <h3 className="text-md font-medium">
          {language === "en" ? "Select Interviewers" : "اختر المقابلين"}
        </h3>
        
        <InterviewerSelector
          selectedInterviewerIds={formData.interviewers}
          onSelectInterviewers={(ids) => handleChange("interviewers", ids)}
          interviewers={sampleInterviewers}
        />
      </div>
      
      {/* Notes */}
      <Textarea
        label={language === "en" ? "Internal Notes" : "ملاحظات داخلية"}
        placeholder={language === "en" ? "Add any notes about this interview..." : "أضف أي ملاحظات حول هذه المقابلة..."}
        value={formData.notes}
        onChange={(e) => handleChange("notes", e.target.value)}
        className="max-w-full"
      />
    </div>
  );
};

// Step 3: Questions & Scorecard
interface Step3Props {
  formData: any;
  handleChange: (field: string, value: any) => void;
}

const Step3: React.FC<Step3Props> = ({ formData, handleChange }) => {
  const { language } = useLanguage();
  const [useAiQuestions, setUseAiQuestions] = useState(false);
  const [showScorecard, setShowScorecard] = useState(false); // Add state for scorecard visibility
  
  const handleUseAiQuestions = () => {
    setUseAiQuestions(true);
    handleChange("useAiQuestions", true);
  };
  
  return (
    <div className="space-y-6">
      <h3 className="text-md font-medium">
        {language === "en" ? "Interview Questions & Scorecard" : "أسئلة المقابلة وبطاقة التقييم"}
      </h3>
      
      {!useAiQuestions ? (
        <Card className="p-4">
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Icon icon="lucide:sparkles" className="text-blue-600 text-2xl" />
            </div>
            <h4 className="text-lg font-medium mb-2">
              {language === "en" ? "Generate AI-Powered Questions" : "إنشاء أسئلة بواسطة الذكاء الاصطناعي"}
            </h4>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {language === "en" 
                ? "Let AI suggest relevant questions based on the job description, candidate profile, and interview type." 
                : "دع الذكاء الاصطناعي يقترح أسئلة مناسبة بناءً على وصف الوظيفة وملف المرشح ونوع المقابلة."}
            </p>
            <Button 
              color="primary"
              startContent={<Icon icon="lucide:wand-sparkles" />}
              onPress={handleUseAiQuestions}
            >
              {language === "en" ? "Generate Questions" : "إنشاء الأسئلة"}
            </Button>
          </div>
        </Card>
      ) : (
        <QuestionBuilder
          jobType={
            sampleJobs.find(j => j.id === formData.jobRequisitionId)?.title || 
            "Developer"
          }
          interviewType={
            interviewTypes.find(t => t.value === formData.type)?.label[language] || 
            "Technical Interview"
          }
        />
      )}
      
      {/* Scorecard Template - Replace the existing static card with the proper component */}
      {!showScorecard ? (
        <Card className="p-4">
          <h4 className="font-medium mb-3">
            {language === "en" ? "Scorecard Template" : "نموذج بطاقة التقييم"}
          </h4>
          <p className="text-gray-600 mb-4">
            {language === "en"
              ? "The standard evaluation criteria will be applied:" 
              : "سيتم تطبيق معايير التقييم القياسية:"}
          </p>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{language === "en" ? "Technical Skills" : "المهارات التقنية"}</span>
              <span className="text-gray-500">{language === "en" ? "1-5 Rating" : "تقييم 1-5"}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{language === "en" ? "Communication" : "التواصل"}</span>
              <span className="text-gray-500">{language === "en" ? "1-5 Rating" : "تقييم 1-5"}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{language === "en" ? "Problem Solving" : "حل المشكلات"}</span>
              <span className="text-gray-500">{language === "en" ? "1-5 Rating" : "تقييم 1-5"}</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
              <span className="font-medium">{language === "en" ? "Culture Fit" : "الملائمة الثقافية"}</span>
              <span className="text-gray-500">{language === "en" ? "1-5 Rating" : "تقييم 1-5"}</span>
            </div>
          </div>
          
          <Button 
            className="mt-4" 
            variant="flat"
            startContent={<Icon icon="lucide:edit" size={16} />}
            onPress={() => setShowScorecard(true)} // Add button handler
          >
            {language === "en" ? "Customize Scorecard" : "تخصيص بطاقة التقييم"}
          </Button>
        </Card>
      ) : (
        <ScorecardCustomizer 
          onSave={(scorecard) => {
            handleChange("scorecard", scorecard);
            setShowScorecard(false);
          }}
        />
      )}
      
      {/* Terms */}
      <div className="text-center text-sm text-gray-500">
        {language === "en"
          ? "By scheduling this interview, calendar invites will be sent to the candidate and all interviewers." 
          : "من خلال جدولة هذه المقابلة، سيتم إرسال دعوات التقويم إلى المرشح وجميع المقابلين."}
      </div>
    </div>
  );
};

// Sample Data
const sampleCandidates = [
  {
    id: "c1",
    name: "Emily Johnson",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1",
    position: "Senior Frontend Developer",
    email: "emily.j@example.com",
    phone: "+1 555-123-4567",
    aiMatchScore: 92,
    jobApplications: ["j1", "j3"], // Added job applications data
  },
  {
    id: "c2",
    name: "Michael Brown",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4",
    position: "Product Manager",
    email: "michael.b@example.com",
    phone: "+1 555-987-6543",
    aiMatchScore: 88,
    jobApplications: ["j2"], // Added job applications data
  },
  {
    id: "c3",
    name: "David Wilson",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=6",
    position: "DevOps Engineer",
    email: "david.w@example.com",
    phone: "+1 555-456-7890",
    aiMatchScore: 95,
    jobApplications: ["j1", "j3"], // Added job applications data
  },
  {
    id: "c4",
    name: "Sarah Miller",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=9",
    position: "UX Designer",
    email: "sarah.m@example.com",
    phone: "+1 555-789-0123",
    aiMatchScore: 87,
    jobApplications: ["j2"], // Added job applications data
  },
  {
    id: "c5",
    name: "James Taylor",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=10",
    position: "Backend Developer",
    email: "james.t@example.com",
    phone: "+1 555-321-6547",
    aiMatchScore: 91,
    jobApplications: ["j1"], // Added job applications data
  }
];

const sampleJobs = [
  {
    id: "j1",
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    status: "Open",
    applications: 24,
  },
  {
    id: "j2",
    title: "Product Manager",
    department: "Product",
    location: "New York",
    status: "Open",
    applications: 18,
  },
  {
    id: "j3",
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "San Francisco",
    status: "Open",
    applications: 12,
  },
];

const sampleInterviewers = [
  {
    id: "i1",
    name: "Alex Rodriguez",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2",
    position: "Engineering Manager",
    email: "alex.r@example.com",
  },
  {
    id: "i2",
    name: "Sarah Chen",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3",
    position: "Lead Developer",
    email: "sarah.c@example.com",
  },
  {
    id: "i3",
    name: "Jessica Kim",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5",
    position: "Head of Product",
    email: "jessica.k@example.com",
  },
  {
    id: "i4",
    name: "Robert Taylor",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=7",
    position: "DevOps Lead",
    email: "robert.t@example.com",
  },
  {
    id: "i5",
    name: "Amanda Garcia",
    avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=8",
    position: "Infrastructure Manager",
    email: "amanda.g@example.com",
  },
];

// Helper component for Interview types
const interviewTypes = [
  { value: "technical", label: { en: "Technical Interview", ar: "مقابلة تقنية" } },
  { value: "behavioral", label: { en: "Behavioral Interview", ar: "مقابلة سلوكية" } },
  { value: "hr", label: { en: "HR Interview", ar: "مقابلة الموارد البشرية" } },
  { value: "cultural", label: { en: "Culture Fit Interview", ar: "مقابلة ملائمة ثقافية" } },
  { value: "final", label: { en: "Final Interview", ar: "مقابلة نهائية" } },
];

export default ScheduleInterviewWizard;