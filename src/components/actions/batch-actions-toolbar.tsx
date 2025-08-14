import React from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

interface BatchActionsToolbarProps {
  selectedCount: number;
  onAction: (actionType: string) => void;
  language: "en" | "ar";
}

export const BatchActionsToolbar: React.FC<BatchActionsToolbarProps> = ({ selectedCount, onAction, language }) => {
  return (
    <motion.div 
      className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-sm"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
            <Icon icon="lucide:check-square" className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-blue-900">
              {language === "en" 
                ? `${selectedCount} item${selectedCount > 1 ? 's' : ''} selected` 
                : `تم تحديد ${selectedCount} عنصر${selectedCount > 1 ? '' : ''}`}
            </p>
            <p className="text-sm text-blue-700">
              {language === "en" 
                ? "Apply batch actions to all selected items" 
                : "تطبيق إجراءات دفعة على جميع العناصر المحددة"}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            color="default" 
            variant="flat"
            className="flex-shrink-0"
            startContent={<Icon icon="lucide:clock" className="w-4 h-4" />}
            onPress={() => onAction("postpone")}
          >
            {language === "en" ? "Postpone" : "تأجيل"}
          </Button>
          
          <Button 
            color="default" 
            variant="flat"
            className="flex-shrink-0"
            startContent={<Icon icon="lucide:user" className="w-4 h-4" />}
            onPress={() => onAction("reassign")}
          >
            {language === "en" ? "Reassign" : "إعادة التعيين"}
          </Button>
          
          <Button 
            color="success" 
            variant="flat"
            className="flex-shrink-0 bg-green-100 text-green-700"
            startContent={<Icon icon="lucide:check" className="w-4 h-4" />}
            onPress={() => onAction("approve")}
          >
            {language === "en" ? "Approve All" : "الموافقة على الكل"}
          </Button>
          
          <Button 
            color="danger" 
            variant="flat"
            className="flex-shrink-0"
            startContent={<Icon icon="lucide:x" className="w-4 h-4" />}
            onPress={() => onAction("reject")}
          >
            {language === "en" ? "Reject" : "رفض"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};