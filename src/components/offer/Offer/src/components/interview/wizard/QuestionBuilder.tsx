import React, { useState, useEffect } from "react";
import { Card, Checkbox, Button, Input, Textarea } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../../context/LanguageContext";
import { motion } from "framer-motion";

interface QuestionBuilderProps {
  jobType: string;
  interviewType: string;
}

interface Question {
  id: string;
  text: string;
  selected: boolean;
  isCustom?: boolean;
}

const QuestionBuilder: React.FC<QuestionBuilderProps> = ({ jobType, interviewType }) => {
  const { language } = useLanguage();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  
  // Simulate AI generating questions
  useEffect(() => {
    const timer = setTimeout(() => {
      // Generate questions based on the job type and interview type
      const generatedQuestions = getQuestionsForJobAndType(jobType, interviewType, language);
      
      setQuestions(generatedQuestions);
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [jobType, interviewType, language]);
  
  const handleToggleQuestion = (id: string) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, selected: !q.selected } : q
    ));
  };
  
  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    
    const newQuestionObj: Question = {
      id: `custom-${Date.now()}`,
      text: newQuestion.trim(),
      selected: true,
      isCustom: true
    };
    
    setQuestions([...questions, newQuestionObj]);
    setNewQuestion("");
  };
  
  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id));
  };
  
  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 mx-auto mb-4"
        >
          <Icon icon="lucide:loader" className="text-blue-600 w-10 h-10" />
        </motion.div>
        <p className="font-medium">
          {language === "en" 
            ? "AI is generating relevant questions..." 
            : "الذكاء الاصطناعي يقوم بإنشاء أسئلة ملائمة..."}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          {language === "en"
            ? "Based on the job requirements and interview type" 
            : "بناءً على متطلبات الوظيفة ونوع المقابلة"}
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <div className="min-w-[24px] mt-1">
            <Icon icon="lucide:sparkles" className="text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-blue-700">
              {language === "en" ? "AI-Generated Questions" : "أسئلة منشأة بواسطة الذكاء الاصطناعي"}
            </p>
            <p className="text-sm text-blue-600 mb-2">
              {language === "en"
                ? `Based on the ${jobType} role and ${interviewType}`
                : `بناءً على دور ${jobType} و${interviewType}`}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        {questions.map((question) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className={`p-3 ${question.selected ? 'border-blue-500' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  <Checkbox
                    isSelected={question.selected}
                    onValueChange={() => handleToggleQuestion(question.id)}
                  />
                </div>
                <div className="flex-grow">
                  <p className="text-gray-800">{question.text}</p>
                </div>
                {question.isCustom && (
                  <Button
                    isIconOnly
                    variant="light"
                    onPress={() => handleRemoveQuestion(question.id)}
                  >
                    <Icon icon="lucide:x" className="text-gray-400" />
                  </Button>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="flex gap-2 items-start">
        <Textarea
          placeholder={language === "en" ? "Add a custom question..." : "أضف سؤالاً مخصصًا..."}
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="flex-grow"
        />
        <Button
          isIconOnly
          color="primary"
          onPress={handleAddQuestion}
          isDisabled={!newQuestion.trim()}
        >
          <Icon icon="lucide:plus" />
        </Button>
      </div>
    </div>
  );
};

// Helper function to get questions based on job type and interview type
const getQuestionsForJobAndType = (jobType: string, interviewType: string, language: string): Question[] => {
  // Technical Interview for Developer
  if (jobType.toLowerCase().includes('developer') && interviewType.toLowerCase().includes('technical')) {
    return language === 'en' 
      ? [
          { id: 'q1', text: "Can you explain the difference between React hooks and class components?", selected: true },
          { id: 'q2', text: "What strategies do you use for optimizing front-end performance?", selected: true },
          { id: 'q3', text: "How would you implement state management in a complex application?", selected: true },
          { id: 'q4', text: "Explain your experience with TypeScript and type safety.", selected: true },
          { id: 'q5', text: "How do you approach testing in frontend applications?", selected: true },
          { id: 'q6', text: "Describe a challenging technical problem you solved recently.", selected: false },
          { id: 'q7', text: "What's your approach to responsive design?", selected: false },
          { id: 'q8', text: "How familiar are you with CI/CD pipelines?", selected: false },
        ]
      : [
          { id: 'q1', text: "هل يمكنك شرح الفرق بين React hooks ومكونات الفئة؟", selected: true },
          { id: 'q2', text: "ما هي الاستراتيجيات التي تستخدمها لتحسين أداء الواجهة الأمامية؟", selected: true },
          { id: 'q3', text: "كيف تنفذ إدارة الحالة في تطبيق معقد؟", selected: true },
          { id: 'q4', text: "اشرح خبرتك مع TypeScript وسلامة النوع.", selected: true },
          { id: 'q5', text: "كيف تقارب الاختبار في تطبيقات الواجهة الأمامية؟", selected: true },
          { id: 'q6', text: "صف مشكلة تقنية صعبة حللتها مؤخرًا.", selected: false },
          { id: 'q7', text: "ما هو نهجك للتصميم المستجيب؟", selected: false },
          { id: 'q8', text: "ما مدى معرفتك بخطوط أنابيب CI/CD؟", selected: false },
        ];
  }
  
  // Behavioral Interview
  if (interviewType.toLowerCase().includes('behavioral')) {
    return language === 'en'
      ? [
          { id: 'q1', text: "Tell me about a time when you had a conflict with a team member. How did you resolve it?", selected: true },
          { id: 'q2', text: "Describe a project that failed and what you learned from it.", selected: true },
          { id: 'q3', text: "How do you handle stress and pressure at work?", selected: true },
          { id: 'q4', text: "Tell me about a time when you showed leadership skills.", selected: true },
          { id: 'q5', text: "How do you prioritize tasks when you have multiple deadlines?", selected: false },
          { id: 'q6', text: "Give an example of a time you received criticism and how you handled it.", selected: false },
        ]
      : [
          { id: 'q1', text: "أخبرني عن وقت كان لديك فيه صراع مع أحد أعضاء الفريق. كيف حللته؟", selected: true },
          { id: 'q2', text: "صف مشروعًا فشل وما تعلمته منه.", selected: true },
          { id: 'q3', text: "كيف تتعامل مع التوتر والضغط في العمل؟", selected: true },
          { id: 'q4', text: "أخبرني عن وقت أظهرت فيه مهارات القيادة.", selected: true },
          { id: 'q5', text: "كيف تحدد أولويات المهام عندما تكون لديك مواعيد نهائية متعددة؟", selected: false },
          { id: 'q6', text: "أعط مثالاً على وقت تلقيت فيه نقدًا وكيف تعاملت معه.", selected: false },
        ];
  }
  
  // Product Manager
  if (jobType.toLowerCase().includes('product')) {
    return language === 'en'
      ? [
          { id: 'q1', text: "How do you prioritize features in a product roadmap?", selected: true },
          { id: 'q2', text: "Describe how you gather and incorporate user feedback.", selected: true },
          { id: 'q3', text: "Tell me about a product you launched from concept to market.", selected: true },
          { id: 'q4', text: "How do you measure the success of a product?", selected: true },
          { id: 'q5', text: "How do you work with engineering teams to deliver features?", selected: false },
          { id: 'q6', text: "Describe a time when you had to make a trade-off between features.", selected: false },
        ]
      : [
          { id: 'q1', text: "كيف تحدد أولويات الميزات في خارطة طريق المنتج؟", selected: true },
          { id: 'q2', text: "صف كيف تجمع وتدمج ملاحظات المستخدمين.", selected: true },
          { id: 'q3', text: "أخبرني عن منتج أطلقته من المفهوم إلى السوق.", selected: true },
          { id: 'q4', text: "كيف تقيس نجاح المنتج؟", selected: true },
          { id: 'q5', text: "كيف تعمل مع فرق الهندسة لتقديم الميزات؟", selected: false },
          { id: 'q6', text: "صف وقتًا كان عليك فيه إجراء مفاضلة بين الميزات.", selected: false },
        ];
  }
  
  // Default questions
  return language === 'en'
    ? [
        { id: 'q1', text: "Tell me about your background and relevant experience.", selected: true },
        { id: 'q2', text: "Why are you interested in this position?", selected: true },
        { id: 'q3', text: "What are your strengths and weaknesses?", selected: true },
        { id: 'q4', text: "Where do you see yourself in 5 years?", selected: true },
        { id: 'q5', text: "Do you have any questions for us?", selected: false },
      ]
    : [
        { id: 'q1', text: "أخبرني عن خلفيتك وخبرتك ذات الصلة.", selected: true },
        { id: 'q2', text: "لماذا أنت مهتم بهذا المنصب؟", selected: true },
        { id: 'q3', text: "ما هي نقاط قوتك وضعفك؟", selected: true },
        { id: 'q4', text: "أين ترى نفسك بعد 5 سنوات؟", selected: true },
        { id: 'q5', text: "هل لديك أي أسئلة لنا؟", selected: false },
      ];
};

export default QuestionBuilder;