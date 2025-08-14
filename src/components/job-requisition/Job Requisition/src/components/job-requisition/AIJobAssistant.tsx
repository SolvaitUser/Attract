import React, { useState } from "react";
  import { Input, Textarea, Button, Card, CardBody, Avatar, Spinner, Progress } from "@heroui/react";
  import { Icon } from "@iconify/react";
  import { useLanguage } from "../../contexts/LanguageContext";
  import { translations } from "../../data/translations";
  
  interface AIJobAssistantProps {
    onGenerated: (data: any) => void;
  }
  
  export const AIJobAssistant: React.FC<AIJobAssistantProps> = ({ onGenerated }) => {
    const { language } = useLanguage();
    const t = translations[language];
    const [prompt, setPrompt] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [conversation, setConversation] = useState<Array<{role: string, content: string}>>([
      {role: "assistant", content: t.aiAssistantWelcome}
    ]);
    
    // Add new progress state for more visual feedback
    const [processingStage, setProcessingStage] = useState<string | null>(null);
    const [processingProgress, setProcessingProgress] = useState(0);
    
    const handleSendPrompt = () => {
      if (!prompt.trim()) return;
      
      // Add user message to conversation
      setConversation([...conversation, {role: "user", content: prompt}]);
      
      // Simulate AI generating job description with progress stages
      setIsGenerating(true);
      setProcessingStage(t.analyzingRequirements);
      setProcessingProgress(10);
      
      // First stage - analyzing requirements
      setTimeout(() => {
        setProcessingProgress(30);
        setProcessingStage(t.generatingDescription);
        
        // Second stage - generating description
        setTimeout(() => {
          setProcessingProgress(60);
          setProcessingStage(t.creatingResponsibilities);
          
          // Third stage - creating responsibilities & requirements
          setTimeout(() => {
            setProcessingProgress(85);
            setProcessingStage(t.finalizingJobDetails);
            
            // Final stage - finalizing job details
            setTimeout(() => {
              setProcessingProgress(100);
              
              // Add AI response to conversation
              setConversation(prev => [
                ...prev,
                {role: "assistant", content: t.aiCompletionMessage}
              ]);
              
              // Generate mock job data based on prompt
              const generatedData = simulateAIJobGeneration(prompt);
              setProcessingStage(null);
              setProcessingProgress(0);
              setIsGenerating(false);
              onGenerated(generatedData);
            }, 500);
          }, 700);
        }, 800);
      }, 500);
      
      setPrompt("");
    };
    
    // Enhanced AI simulation with recruitment stages
    const simulateAIJobGeneration = (prompt: string) => {
      // This is a mock implementation
      const recommendedStages = [];
      
      // For technical roles
      if (prompt.toLowerCase().includes("developer") || 
          prompt.toLowerCase().includes("engineer") || 
          prompt.toLowerCase().includes("technical")) {
        recommendedStages.push(
          { id: "1", name: t.applicationReview, isRequired: true, description: t.applicationReviewDescription, estimatedDays: 3 },
          { id: "2", name: t.phoneScreening, isRequired: true, description: t.phoneScreeningDescription, estimatedDays: 2 },
          { id: "3", name: t.technicalAssessment, isRequired: true, description: t.technicalAssessmentDescription, estimatedDays: 7 },
          { id: "4", name: t.finalInterview, isRequired: true, description: t.finalInterviewDescription, estimatedDays: 4 }
        );
      } 
      // For management roles
      else if (prompt.toLowerCase().includes("manager") || 
              prompt.toLowerCase().includes("director") || 
              prompt.toLowerCase().includes("lead")) {
        recommendedStages.push(
          { id: "1", name: t.applicationReview, isRequired: true, description: t.applicationReviewDescription, estimatedDays: 3 },
          { id: "2", name: t.phoneScreening, isRequired: true, description: t.phoneScreeningDescription, estimatedDays: 2 },
          { id: "3", name: t.firstInterview, isRequired: true, description: t.firstInterviewDescription, estimatedDays: 5 },
          { id: "4", name: t.caseStudy, isRequired: true, description: t.caseStudyDescription, estimatedDays: 5 },
          { id: "5", name: t.groupInterview, isRequired: true, description: t.groupInterviewDescription, estimatedDays: 4 }
        );
      }
      // Default stages for other roles
      else {
        recommendedStages.push(
          { id: "1", name: t.applicationReview, isRequired: true, description: t.applicationReviewDescription, estimatedDays: 3 },
          { id: "2", name: t.phoneScreening, isRequired: true, description: t.phoneScreeningDescription, estimatedDays: 2 },
          { id: "3", name: t.firstInterview, isRequired: true, description: t.firstInterviewDescription, estimatedDays: 5 },
          { id: "4", name: t.finalInterview, isRequired: true, description: t.finalInterviewDescription, estimatedDays: 4 }
        );
      }
      
      return {
        title: prompt.includes("developer") ? "Senior Frontend Developer" : "Marketing Specialist",
        department: prompt.includes("developer") ? "Engineering" : "Marketing",
        location: "Remote",
        type: "Full-time",
        experience: prompt.includes("senior") ? "5+ years" : "3+ years",
        salary: { min: 80000, max: 120000, currency: "USD" },
        description: "We are looking for an experienced professional to join our team...",
        requirements: [
          "Bachelor's degree in related field",
          "Strong communication skills",
          prompt.includes("developer") ? "Experience with React, Vue, or Angular" : "Experience with digital marketing campaigns",
          prompt.includes("developer") ? "Knowledge of modern JavaScript patterns" : "SEO and content marketing experience"
        ],
        responsibilities: [
          prompt.includes("developer") ? "Develop and maintain web applications" : "Create and manage marketing campaigns",
          prompt.includes("developer") ? "Collaborate with UX designers and backend developers" : "Analyze marketing data and metrics",
          prompt.includes("developer") ? "Write clean, maintainable code" : "Develop content strategy",
          "Contribute to team meetings and planning sessions"
        ],
        skills: [
          prompt.includes("developer") ? "JavaScript" : "SEO",
          prompt.includes("developer") ? "React" : "Content Marketing",
          prompt.includes("developer") ? "HTML/CSS" : "Social Media Management",
          "Communication"
        ],
        recommendedStages: recommendedStages,
        recruitmentStages: recommendedStages
      };
    };
    
    return (
      <div className="space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-50 to-primary-50 rounded-lg border border-blue-100 flex items-start gap-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white">
            <Icon icon="lucide:sparkles" width={20} />
          </div>
          <div>
            <h3 className="font-semibold text-primary text-lg mb-2">{t.aiPowered}</h3>
            <p className="text-sm">{t.aiJobAssistantInstructions}</p>
            <p className="text-xs text-primary-700 mt-2 font-medium">{t.tryPromptExample}</p>
          </div>
        </div>
        
        <div className="border rounded-lg h-[220px] overflow-y-auto p-3 space-y-2 bg-default-50">
          {conversation.map((message, index) => (
            <div key={index} className={`flex items-start gap-2 ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === "assistant" && (
                <Avatar
                  className="flex-shrink-0"
                  icon={<Icon icon="lucide:sparkles" width={14} />}
                  classNames={{
                    base: "bg-primary text-white",
                    icon: "text-white"
                  }}
                  size="sm"
                />
              )}
              <div className={`px-3 py-1.5 rounded-lg max-w-[80%] ${
                message.role === "user" 
                  ? "bg-primary text-white" 
                  : "bg-white border border-default-200 shadow-sm"
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              {message.role === "user" && (
                <Avatar
                  className="flex-shrink-0"
                  src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1"
                  size="sm"
                />
              )}
            </div>
          ))}
          
          {isGenerating && (
            <div className="flex flex-col gap-2">
              <div className="flex items-start gap-2">
                <Avatar
                  className="flex-shrink-0"
                  icon={<Icon icon="lucide:sparkles" width={14} />}
                  classNames={{
                    base: "bg-primary text-white",
                    icon: "text-white"
                  }}
                  size="sm"
                />
                <div className="px-3 py-2 rounded-lg bg-white border border-default-200 shadow-sm w-[85%]">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex gap-2 items-center">
                      <Spinner size="sm" color="primary" />
                      <span className="text-xs font-medium text-primary-600">
                        {processingStage || t.generatingJob}
                      </span>
                    </div>
                    <Progress 
                      value={processingProgress} 
                      className="max-w-md" 
                      color="primary"
                      size="sm"
                      showValueLabel={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Textarea
            className="flex-1"
            placeholder={t.aiPromptPlaceholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            minRows={2}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendPrompt();
              }
            }}
            disabled={isGenerating}
            startContent={!prompt && <Icon icon="lucide:sparkles" className="text-default-400" width={16} />}
          />
          <Button 
            isIconOnly 
            color="primary" 
            onPress={handleSendPrompt}
            isLoading={isGenerating}
            isDisabled={!prompt.trim() || isGenerating}
            className="h-auto"
          >
            <Icon icon="lucide:send" width={16} />
          </Button>
        </div>
        
        <Card>
          <CardBody className="p-3">
            <h3 className="font-medium text-sm mb-2">{t.promptSuggestions}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Senior Frontend Developer with React experience",
                "Marketing Manager for B2B SaaS company",
                "UX Designer with 3+ years experience",
                "Data Scientist with ML expertise"
              ].map((suggestion) => (
                <Button 
                  key={suggestion} 
                  variant="flat" 
                  size="sm"
                  onPress={() => setPrompt(suggestion)}
                  className="text-xs py-1 px-2 h-auto"
                  startContent={<Icon icon="lucide:zap" width={12} />}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  };