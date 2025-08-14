import React from "react";
import { Card, Radio, RadioGroup, Badge, Avatar, Progress, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../../context/LanguageContext";

interface Candidate {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  email: string;
  phone: string;
  aiMatchScore?: number;
}

interface CandidateSelectorProps {
  candidates: Candidate[];
  selectedCandidateId: string;
  onSelectCandidate: (id: string) => void;
}

const CandidateSelector: React.FC<CandidateSelectorProps> = ({ 
  candidates, 
  selectedCandidateId,
  onSelectCandidate
}) => {
  const { language } = useLanguage();
  
  return (
    <RadioGroup
      value={selectedCandidateId}
      onValueChange={onSelectCandidate}
    >
      <div className="space-y-3">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className={`p-3 cursor-pointer transition-colors ${
              selectedCandidateId === candidate.id ? 'border-blue-500 bg-blue-50' : ''
            }`}
            isPressable
            onPress={() => onSelectCandidate(candidate.id)}
          >
            <div className="flex items-center gap-3">
              <Radio value={candidate.id} />
              <Avatar src={candidate.avatar} name={candidate.name} className="w-10 h-10" />
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <p className="font-medium">{candidate.name}</p>
                    <p className="text-sm text-gray-500">{candidate.position}</p>
                  </div>
                  {candidate.aiMatchScore && (
                    <Tooltip content={language === "en" ? "AI Match Score" : "درجة تطابق الذكاء الاصطناعي"}>
                      <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg">
                        <Icon icon="lucide:sparkles" className="text-blue-500 text-sm" />
                        <span className={`font-medium text-sm ${getScoreColor(candidate.aiMatchScore)}`}>
                          {candidate.aiMatchScore}%
                        </span>
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </RadioGroup>
  );
};

// Helper function to determine score color
const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 75) return "text-blue-600";
  if (score >= 60) return "text-amber-600";
  return "text-red-600";
};

export default CandidateSelector;