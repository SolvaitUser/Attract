import React from "react";
import { Card, Checkbox, Avatar, Tooltip } from "@heroui/react";
import { useLanguage } from "../../../context/LanguageContext";

interface Interviewer {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  email: string;
}

interface InterviewerSelectorProps {
  interviewers: Interviewer[];
  selectedInterviewerIds: string[];
  onSelectInterviewers: (ids: string[]) => void;
}

const InterviewerSelector: React.FC<InterviewerSelectorProps> = ({
  interviewers,
  selectedInterviewerIds,
  onSelectInterviewers
}) => {
  const { language } = useLanguage();
  
  const handleToggleInterviewer = (id: string) => {
    if (selectedInterviewerIds.includes(id)) {
      onSelectInterviewers(selectedInterviewerIds.filter((i) => i !== id));
    } else {
      onSelectInterviewers([...selectedInterviewerIds, id]);
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {interviewers.map((interviewer) => (
        <Card
          key={interviewer.id}
          className={`p-3 cursor-pointer transition-colors ${
            selectedInterviewerIds.includes(interviewer.id) ? 'border-blue-500 bg-blue-50' : ''
          }`}
          isPressable
          onPress={() => handleToggleInterviewer(interviewer.id)}
        >
          <div className="flex items-center gap-3">
            <Checkbox
              isSelected={selectedInterviewerIds.includes(interviewer.id)}
              onValueChange={() => handleToggleInterviewer(interviewer.id)}
            />
            <Avatar src={interviewer.avatar} name={interviewer.name} className="w-10 h-10" />
            <div className="flex-grow">
              <p className="font-medium truncate">{interviewer.name}</p>
              <p className="text-sm text-gray-500 truncate">{interviewer.position}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default InterviewerSelector;