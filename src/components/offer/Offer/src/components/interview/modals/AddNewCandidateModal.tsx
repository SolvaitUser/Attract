import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab, Card, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../../context/LanguageContext";

interface AddNewCandidateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCandidate: (candidate: any) => void;
  selectedJobId: string; // Add selectedJobId prop
}

const AddNewCandidateModal: React.FC<AddNewCandidateModalProps> = ({
  isOpen,
  onClose,
  onAddCandidate,
  selectedJobId // Use selectedJobId
}) => {
  const { language } = useLanguage();
  const [addMethod, setAddMethod] = useState<"manual" | "cv-parse" | "linkedin">("manual");
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    linkedin: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    setIsUploading(true);
    
    // Simulate file upload and parsing
    setTimeout(() => {
      setIsUploading(false);
      setIsParsing(true);
      
      // Simulate CV parsing (would be an API call in production)
      setTimeout(() => {
        setIsParsing(false);
        
        // Populate form with "parsed" data
        setFormData({
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@example.com",
          phone: "+1 555-123-4567",
          position: "Senior Software Engineer",
          experience: "8 years experience in frontend development",
          linkedin: "linkedin.com/in/johnsmith",
          notes: "Previously worked at Tech Corp. Expertise in React and TypeScript.",
        });
        
        // Switch to manual tab to display the parsed data
        setAddMethod("manual");
      }, 1500);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a new candidate object with selected job application
    const newCandidate = {
      id: `new-${Date.now()}`,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=" + Math.floor(Math.random() * 20),
      aiMatchScore: Math.floor(Math.random() * 15) + 80, // Random score between 80-95
      jobApplications: [selectedJobId], // Add the candidate to the selected job
    };
    
    onAddCandidate(newCandidate);
    onClose();
    resetForm();
  };

  const isFormValid = () => {
    return formData.firstName && formData.lastName && formData.email && formData.position;
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      position: "",
      experience: "",
      linkedin: "",
      notes: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="inside">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {language === "en" ? "Add New Candidate" : "إضافة مرشح جديد"}
            </ModalHeader>
            
            <ModalBody>
              <div className="space-y-6">
                {/* Add Method Selection */}
                <Card className="p-4">
                  <h3 className="text-md font-medium mb-4">
                    {language === "en" ? "How would you like to add this candidate?" : "كيف ترغب في إضافة هذا المرشح؟"}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Manual Entry */}
                    <div 
                      className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                        addMethod === "manual" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"
                      }`}
                      onClick={() => setAddMethod("manual")}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <Icon icon="lucide:pencil" className="text-blue-600" />
                        </div>
                        <h4 className="font-medium">
                          {language === "en" ? "Manual Entry" : "إدخال يدوي"}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {language === "en" 
                            ? "Manually enter candidate details" 
                            : "أدخل تفاصيل المرشح يدويًا"}
                        </p>
                      </div>
                    </div>
                    
                    {/* Parse CV */}
                    <div 
                      className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                        addMethod === "cv-parse" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"
                      }`}
                      onClick={() => setAddMethod("cv-parse")}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <Icon icon="lucide:file-text" className="text-blue-600" />
                        </div>
                        <h4 className="font-medium">
                          {language === "en" ? "Parse CV/Resume" : "تحليل السيرة الذاتية"}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {language === "en" 
                            ? "Upload and auto-extract details" 
                            : "تحميل واستخراج التفاصيل تلقائيًا"}
                        </p>
                      </div>
                    </div>
                    
                    {/* LinkedIn Import */}
                    <div 
                      className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                        addMethod === "linkedin" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-200"
                      }`}
                      onClick={() => setAddMethod("linkedin")}
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                          <Icon icon="logos:linkedin-icon" className="text-xl" />
                        </div>
                        <h4 className="font-medium">
                          {language === "en" ? "LinkedIn Import" : "استيراد من لينكد إن"}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {language === "en" 
                            ? "Import profile from LinkedIn" 
                            : "استيراد الملف الشخصي من لينكد إن"}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Content based on selected method */}
                {addMethod === "manual" && (
                  <div className="space-y-4">
                    <h3 className="text-md font-medium">
                      {language === "en" ? "Candidate Information" : "معلومات المرشح"}
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={language === "en" ? "Full Name" : "الاسم الكامل"}
                        placeholder={language === "en" ? "Enter candidate name" : "أدخل اسم المرشح"}
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        isRequired
                      />
                      <Input
                        label={language === "en" ? "Email" : "البريد الإلكتروني"}
                        placeholder={language === "en" ? "Enter email address" : "أدخل البريد الإلكتروني"}
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        type="email"
                        isRequired
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label={language === "en" ? "Phone Number" : "رقم الهاتف"}
                        placeholder={language === "en" ? "Enter phone number" : "أدخل رقم الهاتف"}
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                      <Input
                        label={language === "en" ? "Current Position" : "المنصب الحالي"}
                        placeholder={language === "en" ? "e.g. Senior Developer" : "مثال: مطور رئيسي"}
                        value={formData.position}
                        onChange={(e) => handleChange("position", e.target.value)}
                        isRequired
                      />
                    </div>
                    
                    <Textarea
                      label={language === "en" ? "Experience" : "الخبرة"}
                      placeholder={language === "en" ? "Briefly describe candidate's experience" : "صف بإيجاز خبرة المرشح"}
                      value={formData.experience}
                      onChange={(e) => handleChange("experience", e.target.value)}
                    />
                    
                    <Input
                      label="LinkedIn"
                      placeholder={language === "en" ? "LinkedIn profile URL" : "رابط الملف الشخصي على لينكد إن"}
                      value={formData.linkedin}
                      onChange={(e) => handleChange("linkedin", e.target.value)}
                    />
                    
                    <Textarea
                      label={language === "en" ? "Notes" : "ملاحظات"}
                      placeholder={language === "en" ? "Any additional notes" : "أي ملاحظات إضافية"}
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                    />
                  </div>
                )}
                
                {addMethod === "cv-parse" && (
                  <div className="space-y-6">
                    <Card className="p-6 border-dashed border-2 border-gray-300">
                      {isUploading ? (
                        <div className="flex flex-col items-center py-6">
                          <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4"></div>
                          <p className="font-medium">
                            {language === "en" ? "Uploading..." : "جارٍ التحميل..."}
                          </p>
                        </div>
                      ) : isParsing ? (
                        <div className="flex flex-col items-center py-6">
                          <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4"></div>
                          <p className="font-medium">
                            {language === "en" ? "Parsing Resume..." : "جارٍ تحليل السيرة الذاتية..."}
                          </p>
                          <p className="text-sm text-gray-500 mt-2">
                            {language === "en" 
                              ? "Extracting candidate details" 
                              : "استخراج تفاصيل المرشح"}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-6">
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <Icon icon="lucide:upload-cloud" className="text-2xl text-gray-500" />
                          </div>
                          <h4 className="font-medium mb-2">
                            {language === "en" ? "Upload Resume/CV" : "تحميل السيرة الذاتية"}
                          </h4>
                          <p className="text-sm text-gray-500 mb-4">
                            {language === "en" 
                              ? "Supported formats: PDF, DOCX, TXT" 
                              : "التنسيقات المدعومة: PDF، DOCX، TXT"}
                          </p>
                          <Input
                            type="file"
                            size="lg"
                            onChange={handleFileUpload}
                            classNames={{
                              base: "max-w-full",
                              input: "text-small"
                            }}
                            accept=".pdf,.docx,.doc,.txt"
                          />
                        </div>
                      )}
                    </Card>
                    
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Icon icon="lucide:info" />
                      <p>
                        {language === "en" 
                          ? "Our AI will extract candidate details from the uploaded document. You can review and edit the extracted information before adding the candidate." 
                          : "سيقوم الذكاء الاصطناعي لدينا باستخراج تفاصيل المرشح من المستند المحمَّل. يمكنك مراجعة وتعديل المعلومات المستخرجة قبل إضافة المرشح."}
                      </p>
                    </div>
                  </div>
                )}
                
                {addMethod === "linkedin" && (
                  <div className="space-y-6">
                    <Card className="p-6">
                      <div className="flex flex-col items-center py-6">
                        <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                          <Icon icon="logos:linkedin-icon" className="text-2xl" />
                        </div>
                        <h4 className="font-medium mb-2">
                          {language === "en" ? "Import from LinkedIn" : "استيراد من لينكد إن"}
                        </h4>
                        <p className="text-sm text-gray-500 mb-6 text-center max-w-md">
                          {language === "en" 
                            ? "Enter a LinkedIn profile URL or connect to LinkedIn to import candidate data directly." 
                            : "أدخل عنوان URL لملف تعريف LinkedIn أو اتصل بـ LinkedIn لاستيراد بيانات المرشح مباشرة."}
                        </p>
                        
                        <div className="w-full max-w-md">
                          <Input
                            label="LinkedIn URL"
                            placeholder="https://www.linkedin.com/in/username"
                            startContent={<Icon icon="logos:linkedin-icon" />}
                            className="mb-4"
                          />
                          
                          <Button
                            color="primary"
                            className="w-full"
                            startContent={<Icon icon="lucide:download" />}
                          >
                            {language === "en" ? "Import Profile" : "استيراد الملف الشخصي"}
                          </Button>
                          
                          <div className="flex items-center my-4">
                            <div className="flex-grow h-px bg-gray-200"></div>
                            <span className="mx-4 text-gray-400 text-sm">
                              {language === "en" ? "OR" : "أو"}
                            </span>
                            <div className="flex-grow h-px bg-gray-200"></div>
                          </div>
                          
                          <Button
                            variant="bordered"
                            className="w-full"
                            startContent={<Icon icon="logos:linkedin-icon" />}
                          >
                            {language === "en" ? "Connect with LinkedIn" : "الاتصال بـ LinkedIn"}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </ModalBody>
            
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                {language === "en" ? "Cancel" : "إلغاء"}
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                isDisabled={
                  (addMethod === "manual" && !isFormValid()) || 
                  (addMethod === "cv-parse" && (isUploading || isParsing)) ||
                  (addMethod === "linkedin")
                }
              >
                {language === "en" ? "Add Candidate" : "إضافة مرشح"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddNewCandidateModal;