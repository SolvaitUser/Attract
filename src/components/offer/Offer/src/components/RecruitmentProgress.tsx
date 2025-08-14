// ... existing imports ...

const RecruitmentProgress: React.FC = () => {
  const { language } = useLanguage();

  // Define the recruitment stages with updated status
  const stages = [
    { 
      id: "applied", 
      name: { en: "Applied", ar: "تم تقديم الطلب" },
      icon: "lucide:file-text", 
      status: "completed", 
      color: "success" 
    },
    { 
      id: "screening", 
      name: { en: "Screening", ar: "تصفية المرشحين" },
      icon: "lucide:list-checks", 
      status: "completed", 
      color: "success" 
    },
    { 
      id: "interview", 
      name: { en: "Interview", ar: "مقابلة" },
      icon: "lucide:calendar", 
      status: "in-progress", // Changed from current to in-progress 
      color: "warning" // Changed from primary to warning
    },
    // ... rest of the stages ...
  ];

  // ... existing code and return ...
};

// Helper functions for styling
const getStageIconColor = (status: string) => {
  switch (status) {
    case "completed": return "bg-green-100 text-green-600";
    case "in-progress": return "bg-amber-100 text-amber-600"; // Added in-progress
    case "current": return "bg-blue-100 text-blue-600";
    default: return "bg-gray-100 text-gray-400";
  }
};

const getStageTextColor = (status: string) => {
  switch (status) {
    case "completed": return "text-green-600";
    case "in-progress": return "text-amber-600"; // Added in-progress
    case "current": return "text-blue-600";
    default: return "text-gray-400";
  }
};

const getStageStatusLabel = (status: string, language: string) => {
  switch (status) {
    case "completed": return language === "en" ? "Completed" : "مكتمل";
    case "in-progress": return language === "en" ? "In Progress" : "قيد التنفيذ"; // Added in-progress
    case "current": return language === "en" ? "In Progress" : "قيد التقدم";
    default: return language === "en" ? "Pending" : "قيد الانتظار";
  }
};

// ... rest of the component ...