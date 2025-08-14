import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Tabs, Tab, Slider, RadioGroup, Radio, Textarea, Card } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../context/LanguageContext";
import { useInterviewContext, Interview } from "../../context/InterviewContext";

interface InterviewFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  interviewId: string | null;
}

const InterviewFeedbackModal: React.FC<InterviewFeedbackModalProps> = ({
  isOpen,
  onClose,
  interviewId
}) => {
  const { language } = useLanguage();
  const { interviews, submitFeedback } = useInterviewContext();
  
  const interview = interviews.find(i => i.id === interviewId);
  if (!interview) return null;
  
  const [activeTab, setActiveTab] = React.useState("questions");
  const [scores, setScores] = React.useState({
    technical: 3,
    communication: 3,
    problemSolving: 3,
    cultureFit: 3,
  });
  const [questionScores, setQuestionScores] = React.useState({
    q1: 3,
    q2: 3,
    q3: 3,
    q4: 3,
  });
  const [comments, setComments] = React.useState({
    q1: "",
    q2: "",
    q3: "",
    q4: "",
  });
  const [strengths, setStrengths] = React.useState("");
  const [weaknesses, setWeaknesses] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [recommendation, setRecommendation] = React.useState<"pass" | "hold" | "reject">("hold");
  
  // Use custom scorecard if available
  const scorecardSections = interview.scorecard || [];
  
  // Initialize scores based on custom scorecard
  const [sectionScores, setSectionScores] = React.useState(() => {
    const initialScores: Record<string, number> = {};
    scorecardSections.forEach(section => {
      section.criteria.forEach(criteria => {
        initialScores[criteria.id] = Math.ceil(criteria.scale / 2); // Default to middle value
      });
    });
    return initialScores;
  });
  
  // Calculate overall score
  const overallScore = React.useMemo(() => {
    const sum = Object.values(scores).reduce((a, b) => a + b, 0);
    return Number((sum / Object.values(scores).length).toFixed(1));
  }, [scores]);
  
  const handleSubmitFeedback = () => {
    const feedback = {
      id: `f-${Date.now()}`,
      interviewId: interview.id,
      interviewerId: interview.interviewers[0].id,
      overallScore,
      recommendation,
      strengths: strengths.split('\n').filter(s => s.trim()),
      weaknesses: weaknesses.split('\n').filter(w => w.trim()),
      notes,
      questions: Object.entries(questionScores).map(([id, score]) => ({
        id,
        question: getQuestionText(id),
        score,
        comment: comments[id as keyof typeof comments] || "",
      })),
    };
    
    submitFeedback(feedback);
    onClose();
  };
  
  // Get question text based on question id
  const getQuestionText = (id: string) => {
    const sampleQuestions = [
      "Can you explain the difference between React hooks and class components?",
      "What strategies do you use for optimizing front-end performance?",
      "Tell me about a challenging project you worked on and how you overcame obstacles.",
      "How do you approach testing in frontend applications?",
    ];
    
    const index = parseInt(id.replace("q", "")) - 1;
    return sampleQuestions[index] || "";
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
            <ModalHeader className="border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl">
                    {language === "en" ? "Interview Feedback" : "تقييم المقابلة"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {interview.candidate.name} - {interview.jobTitle}
                  </p>
                </div>
              </div>
            </ModalHeader>
            
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
                  key="questions" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:list" />
                      <span>{language === "en" ? "Questions" : "الأسئلة"}</span>
                    </div>
                  }
                >
                  <div className="p-6 space-y-6">
                    <p className="text-gray-700">
                      {language === "en"
                        ? "Rate the candidate's responses to each question and provide comments."
                        : "قم بتقييم إجابات المرشح على كل سؤال وقدم تعليقات."}
                    </p>
                    
                    {/* Question 1 */}
                    <QuestionScoreCard
                      id="q1"
                      question={getQuestionText("q1")}
                      score={questionScores.q1}
                      comment={comments.q1}
                      onScoreChange={(value) => setQuestionScores(prev => ({ ...prev, q1: value }))}
                      onCommentChange={(value) => setComments(prev => ({ ...prev, q1: value }))}
                      language={language}
                    />
                    
                    {/* Question 2 */}
                    <QuestionScoreCard
                      id="q2"
                      question={getQuestionText("q2")}
                      score={questionScores.q2}
                      comment={comments.q2}
                      onScoreChange={(value) => setQuestionScores(prev => ({ ...prev, q2: value }))}
                      onCommentChange={(value) => setComments(prev => ({ ...prev, q2: value }))}
                      language={language}
                    />
                    
                    {/* Question 3 */}
                    <QuestionScoreCard
                      id="q3"
                      question={getQuestionText("q3")}
                      score={questionScores.q3}
                      comment={comments.q3}
                      onScoreChange={(value) => setQuestionScores(prev => ({ ...prev, q3: value }))}
                      onCommentChange={(value) => setComments(prev => ({ ...prev, q3: value }))}
                      language={language}
                    />
                    
                    {/* Question 4 */}
                    <QuestionScoreCard
                      id="q4"
                      question={getQuestionText("q4")}
                      score={questionScores.q4}
                      comment={comments.q4}
                      onScoreChange={(value) => setQuestionScores(prev => ({ ...prev, q4: value }))}
                      onCommentChange={(value) => setComments(prev => ({ ...prev, q4: value }))}
                      language={language}
                    />
                  </div>
                </Tab>
                
                <Tab 
                  key="evaluation" 
                  title={
                    <div className="flex items-center gap-2">
                      <Icon icon="lucide:bar-chart-2" />
                      <span>{language === "en" ? "Evaluation" : "التقييم"}</span>
                    </div>
                  }
                >
                  <div className="p-6 space-y-6">
                    {/* Skill Scores - Now using custom scorecard */}
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium">
                        {language === "en" ? "Skill Assessment" : "تقييم المهارات"}
                      </h3>
                      
                      {scorecardSections.map(section => (
                        <div key={section.id} className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm">
                              {section.name}
                              {section.weight && (
                                <span className="text-gray-500 text-xs ml-2">({section.weight}%)</span>
                              )}
                            </h4>
                          </div>
                          
                          {section.criteria.map(criteria => (
                            <div key={criteria.id} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm">
                                  {criteria.name}
                                  {criteria.required && <span className="text-red-500 ml-1">*</span>}
                                </span>
                                <span className="font-medium">{sectionScores[criteria.id] || 0}/{criteria.scale}</span>
                              </div>
                              <Slider 
                                size="sm"
                                step={1}
                                color="primary"
                                minValue={1}
                                maxValue={criteria.scale}
                                value={sectionScores[criteria.id] || Math.ceil(criteria.scale / 2)}
                                onChange={(value) => setSectionScores({
                                  ...sectionScores,
                                  [criteria.id]: value as number
                                })}
                                marks={Array.from({length: criteria.scale}, (_, i) => ({
                                  value: i + 1,
                                  label: (i + 1).toString()
                                }))}
                                className="max-w-md"
                              />
                              <div className="flex justify-between text-xs text-gray-500 max-w-md">
                                <span>{language === "en" ? "Poor" : "ضعيف"}</span>
                                <span>{language === "en" ? "Excellent" : "ممتاز"}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    
                    {/* Overall Score */}
                    <Card className="p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          {language === "en" ? "Overall Score" : "التقييم الإجمالي"}
                        </span>
                        <div className="flex items-center gap-1">
                          {Array(5).fill(0).map((_, i) => (
                            <Icon 
                              key={i}
                              icon="lucide:star" 
                              className={i < Math.floor(overallScore) 
                                ? "text-yellow-500" 
                                : i < overallScore
                                ? "text-yellow-300"
                                : "text-gray-300"
                              }
                            />
                          ))}
                          <span className="font-medium ml-1">{overallScore}/5</span>
                        </div>
                      </div>
                    </Card>
                    
                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="font-medium block">
                          {language === "en" ? "Strengths" : "نقاط القوة"}
                        </label>
                        <Textarea
                          placeholder={
                            language === "en"
                              ? "List candidate's key strengths..."
                              : "قائمة نقاط القوة الرئيسية للمرشح..."
                          }
                          value={strengths}
                          onChange={(e) => setStrengths(e.target.value)}
                          minRows={4}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="font-medium block">
                          {language === "en" ? "Areas for Improvement" : "مجالات للتحسين"}
                        </label>
                        <Textarea
                          placeholder={
                            language === "en"
                              ? "List areas where candidate could improve..."
                              : "قائمة المجالات التي يمكن للمرشح تحسينها..."
                          }
                          value={weaknesses}
                          onChange={(e) => setWeaknesses(e.target.value)}
                          minRows={4}
                        />
                      </div>
                    </div>
                    
                    {/* Additional Notes */}
                    <div className="space-y-2">
                      <label className="font-medium block">
                        {language === "en" ? "Additional Notes" : "ملاحظات إضافية"}
                      </label>
                      <Textarea
                        placeholder={
                          language === "en"
                            ? "Any other important observations or comments..."
                            : "أي ملاحظات أو تعليقات مهمة أخرى..."
                        }
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        minRows={3}
                      />
                    </div>
                    
                    {/* Recommendation */}
                    <div className="space-y-3">
                      <label className="font-medium block">
                        {language === "en" ? "Recommendation" : "التوصية"}
                      </label>
                      
                      <RadioGroup
                        orientation="horizontal"
                        value={recommendation}
                        onValueChange={setRecommendation as any}
                      >
                        <Radio
                          value="pass"
                          color="success"
                          className="gap-1"
                        >
                          <span className="text-green-600 font-medium">
                            {language === "en" ? "Pass" : "اجتياز"}
                          </span>
                        </Radio>
                        <Radio
                          value="hold"
                          color="warning"
                          className="gap-1"
                        >
                          <span className="text-amber-600 font-medium">
                            {language === "en" ? "Hold" : "تعليق"}
                          </span>
                        </Radio>
                        <Radio
                          value="reject"
                          color="danger"
                          className="gap-1"
                        >
                          <span className="text-red-600 font-medium">
                            {language === "en" ? "Reject" : "رفض"}
                          </span>
                        </Radio>
                      </RadioGroup>
                    </div>
                    
                    {/* AI Assistance */}
                    <Card className="p-4 bg-blue-50 border-blue-200">
                      <div className="flex gap-3 items-start">
                        <div className="mt-1">
                          <Icon icon="lucide:sparkles" className="text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-blue-700">
                            {language === "en" ? "AI Interview Insights" : "رؤى المقابلة بالذكاء الاصطناعي"}
                          </h3>
                          <p className="text-sm text-blue-600 mt-1">
                            {language === "en"
                              ? "Based on the interview recording, the candidate demonstrated strong technical skills but struggled with explaining system design concepts. Excellent communication and problem-solving approach."
                              : "بناءً على تسجيل المقابلة، أظهر المرشح مهارات تقنية قوية ولكنه واجه صعوبة في شرح مفاهيم تصميم النظام. تواصل ممتاز ونهج حل المشكلات."}
                          </p>
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            className="mt-2"
                            startContent={<Icon icon="lucide:check" size={16} />}
                          >
                            {language === "en" ? "Apply Insights" : "تطبيق الرؤى"}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>
            
            <ModalFooter>
              <Button 
                variant="flat" 
                onPress={onClose}
              >
                {language === "en" ? "Cancel" : "إلغاء"}
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmitFeedback}
              >
                {language === "en" ? "Submit Feedback" : "إرسال التقييم"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface QuestionScoreCardProps {
  id: string;
  question: string;
  score: number;
  comment: string;
  onScoreChange: (score: number) => void;
  onCommentChange: (comment: string) => void;
  language: string;
}

const QuestionScoreCard: React.FC<QuestionScoreCardProps> = ({
  id,
  question,
  score,
  comment,
  onScoreChange,
  onCommentChange,
  language
}) => {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <p className="font-medium">{question}</p>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-700">
              {language === "en" ? "Score" : "التقييم"}
            </span>
            <span className="text-sm font-medium">{score}/5</span>
          </div>
          <Slider 
            size="sm"
            step={1}
            color="primary"
            minValue={1}
            maxValue={5}
            value={score}
            onChange={(value) => onScoreChange(value as number)}
            marks={[
              { value: 1, label: "1" },
              { value: 2, label: "2" },
              { value: 3, label: "3" },
              { value: 4, label: "4" },
              { value: 5, label: "5" },
            ]}
            className="max-w-md"
          />
          <div className="flex justify-between text-xs text-gray-500 max-w-md">
            <span>{language === "en" ? "Poor" : "ضعيف"}</span>
            <span>{language === "en" ? "Excellent" : "ممتاز"}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-700 block">
            {language === "en" ? "Comment" : "تعليق"}
          </label>
          <Textarea
            placeholder={
              language === "en"
                ? "Add your comments on this answer..."
                : "أضف تعليقاتك على هذه الإجابة..."
            }
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            minRows={2}
          />
        </div>
      </div>
    </Card>
  );
};

export default InterviewFeedbackModal;