import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Input, Divider, Card } from "@heroui/react";
import { Icon } from "@iconify/react";

interface AIActionAssistantProps {
  language: "en" | "ar";
  aiSuggestions: { item: string; suggestion: string }[];
  onActionApply: (itemId: string) => void;
}

export const AIActionAssistant: React.FC<AIActionAssistantProps> = ({ language, aiSuggestions, onActionApply }) => {
  const [isTyping, setIsTyping] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [response, setResponse] = React.useState("");
  
  const handleAsk = () => {
    if (!query.trim()) return;
    
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setResponse(
        language === "en" 
          ? "Based on historical data, completing the urgent requisition approval now would help meet your hiring targets for Q3. I recommend prioritizing this task today."
          : "بناءً على البيانات التاريخية، فإن إكمال الموافقة على الطلب العاجل الآن سيساعد في تحقيق أهداف التوظيف للربع الثالث. أوصي بإعطاء الأولوية لهذه المهمة اليوم."
      );
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3">
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
              <Icon icon="lucide:sparkles" className="w-4 h-4 text-white" />
            </motion.div>
          </div>
          <h3 className="font-semibold">
            {language === "en" ? "AI Action Assistant" : "مساعد الإجراءات الذكي"}
          </h3>
        </div>
        <div className="bg-blue-500 rounded-full p-1.5">
          <Icon icon="lucide:settings" className="w-4 h-4 text-white" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex-1 overflow-auto">
        {/* Welcome Message */}
        <div className="bg-blue-50 rounded-xl p-4 mb-4 border border-blue-100">
          <div className="flex items-start">
            <div className="bg-blue-100 rounded-lg p-2 mr-3">
              <Icon icon="lucide:sparkles" className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-blue-800 text-sm">
                {language === "en" 
                  ? "Hello! I can help you manage your recruitment actions more efficiently." 
                  : "مرحبًا! يمكنني مساعدتك في إدارة إجراءات التوظيف بكفاءة أكبر."}
              </p>
              <p className="text-blue-600 text-xs mt-1">
                {language === "en" 
                  ? "Ask me how to prioritize or for recommendations on specific items." 
                  : "اسألني عن كيفية تحديد الأولويات أو للحصول على توصيات بشأن عناصر محددة."}
              </p>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-700 flex items-center">
              <Icon icon="lucide:zap" className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
              {language === "en" ? "AI Recommendations" : "توصيات الذكاء الاصطناعي"}
            </h4>
            <span className="text-xs text-blue-600">
              {language === "en" ? "2 items" : "عنصران"}
            </span>
          </div>
          
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.item}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg border border-gray-100 p-3 shadow-sm"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-1 mr-2">
                      <Icon icon="lucide:sparkles" className="w-3 h-3 text-blue-600" />
                    </div>
                    <h5 className="text-sm font-medium">
                      {suggestion.item === "req-001" 
                        ? (language === "en" ? "Senior Developer Requisition" : "طلب مطور أول")
                        : (language === "en" ? "Offer Approval" : "الموافقة على العرض")}
                    </h5>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    suggestion.item === "req-001" 
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {suggestion.item === "req-001" 
                      ? (language === "en" ? "Urgent" : "عاجل")
                      : (language === "en" ? "Due Soon" : "مستحق قريباً")}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  {suggestion.suggestion}
                </p>
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="bg-blue-50 text-blue-700 border-blue-100"
                    startContent={<Icon icon="lucide:check" className="w-3.5 h-3.5" />}
                    onPress={() => onActionApply(suggestion.item)}
                  >
                    {language === "en" ? "Apply Suggestion" : "تطبيق الاقتراح"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {language === "en" ? "Quick Actions" : "إجراءات سريعة"}
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Button
              size="sm"
              variant="flat"
              className="justify-start h-auto py-2"
              startContent={<Icon icon="lucide:zap" className="w-3.5 h-3.5" />}
            >
              <div className="text-left">
                <div className="text-xs font-medium">
                  {language === "en" ? "Prioritize" : "تحديد الأولويات"}
                </div>
                <div className="text-[10px] text-gray-500">
                  {language === "en" ? "Optimize workflow" : "تحسين سير العمل"}
                </div>
              </div>
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="justify-start h-auto py-2"
              startContent={<Icon icon="lucide:calendar" className="w-3.5 h-3.5" />}
            >
              <div className="text-left">
                <div className="text-xs font-medium">
                  {language === "en" ? "Schedule" : "جدولة"}
                </div>
                <div className="text-[10px] text-gray-500">
                  {language === "en" ? "Plan your day" : "خطط ليومك"}
                </div>
              </div>
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="justify-start h-auto py-2"
              startContent={<Icon icon="lucide:check-circle" className="w-3.5 h-3.5" />}
            >
              <div className="text-left">
                <div className="text-xs font-medium">
                  {language === "en" ? "Batch Approve" : "موافقة دفعية"}
                </div>
                <div className="text-[10px] text-gray-500">
                  {language === "en" ? "Similar actions" : "إجراءات مماثلة"}
                </div>
              </div>
            </Button>
            <Button
              size="sm"
              variant="flat"
              className="justify-start h-auto py-2"
              startContent={<Icon icon="lucide:user-plus" className="w-3.5 h-3.5" />}
            >
              <div className="text-left">
                <div className="text-xs font-medium">
                  {language === "en" ? "Delegate" : "تفويض"}
                </div>
                <div className="text-[10px] text-gray-500">
                  {language === "en" ? "Reassign tasks" : "إعادة تعيين المهام"}
                </div>
              </div>
            </Button>
          </div>
        </div>

        {/* Ask AI Section */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {language === "en" ? "Ask AI Assistant" : "اسأل المساعد الذكي"}
          </h4>
          <div className="flex gap-2">
            <Input
              size="sm"
              placeholder={language === "en" ? "Ask a question..." : "اطرح سؤالاً..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              startContent={<Icon icon="lucide:search" className="w-3.5 h-3.5 text-gray-400" />}
            />
            <Button
              size="sm"
              color="primary"
              isIconOnly
              onPress={handleAsk}
            >
              <Icon icon="lucide:send" className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* AI Response */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 rounded-lg p-3"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-blue-200 flex items-center justify-center">
                  <Icon icon="lucide:sparkles" className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <div className="flex space-x-1">
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                    className="w-2 h-2 bg-blue-400 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {response && !isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-blue-50 rounded-lg p-3 border border-blue-100"
            >
              <div className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mr-2 flex-shrink-0">
                  <Icon icon="lucide:sparkles" className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-800">
                    {response}
                  </p>
                  <div className="flex justify-end mt-2">
                    <Button
                      size="sm"
                      variant="flat"
                      color="primary"
                      className="bg-blue-100 border-blue-200"
                      startContent={<Icon icon="lucide:check" className="w-3.5 h-3.5" />}
                    >
                      {language === "en" ? "Apply Suggestion" : "تطبيق الاقتراح"}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer with hints */}
      <div className="p-3 border-t border-gray-100 bg-gray-50 mt-auto">
        <p className="text-xs text-gray-500 flex items-center">
          <Icon icon="lucide:info" className="w-3 h-3 mr-1" />
          {language === "en" 
            ? "Try asking: \"What actions should I prioritize today?\"" 
            : "حاول أن تسأل: \"ما الإجراءات التي يجب أن أعطيها الأولوية اليوم؟\""}
        </p>
      </div>
    </div>
  );
};