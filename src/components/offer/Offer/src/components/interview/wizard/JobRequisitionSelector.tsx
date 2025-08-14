import React from "react";
import { Card, Radio, RadioGroup, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../../context/LanguageContext";

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  status: string;
  applications: number;
}

interface JobRequisitionSelectorProps {
  jobs: Job[];
  selectedJobId: string;
  onSelectJob: (id: string) => void;
}

const JobRequisitionSelector: React.FC<JobRequisitionSelectorProps> = ({
  jobs,
  selectedJobId,
  onSelectJob
}) => {
  const { language } = useLanguage();
  
  return (
    <RadioGroup
      value={selectedJobId}
      onValueChange={onSelectJob}
    >
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className={`p-3 cursor-pointer transition-colors ${
              selectedJobId === job.id ? 'border-blue-500 bg-blue-50' : ''
            }`}
            isPressable
            onPress={() => onSelectJob(job.id)}
          >
            <div className="flex items-center gap-3">
              <Radio value={job.id} />
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-gray-500">
                      {job.department} • {job.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip
                      size="sm"
                      color="success"
                      variant="flat"
                    >
                      {job.status}
                    </Chip>
                    <Chip
                      size="sm"
                      variant="flat"
                      startContent={<Icon icon="lucide:users" className="text-xs" />}
                    >
                      {job.applications} {language === "en" ? "Applicants" : "المتقدمين"}
                    </Chip>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </RadioGroup>
  );
};

export default JobRequisitionSelector;