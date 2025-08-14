import React, { useState } from "react";
import { Button, Card, CardBody, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { JobRequisitionList } from "./JobRequisitionList";
import { JobFilters } from "./JobFilters";
import { CreateJobModal } from "./CreateJobModal";
import { JobStatistics } from "./JobStatistics";
import { RecentActivities } from "./RecentActivities";
import { StatCard } from "./StatCard";
import { mockJobRequisitions } from "../../data/mockData"; // Added missing import
import { ViewJobModal } from "./ViewJobModal";
import { EditJobModal } from "./EditJobModal";
import { ShareJobModal } from "./ShareJobModal";

export const JobRequisitionPage: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [createMode, setCreateMode] = useState<"manual" | "ai">("manual");
  const [showFilters, setShowFilters] = useState(false);

  React.useEffect(() => {
    const toggle = () => setShowFilters((v) => !v);
    const create = (e: any) => {
      const mode = e?.detail?.mode === "ai" ? "ai" : "manual";
      handleCreateJob(mode);
    };
    window.addEventListener("jr_toggle_filters", toggle as EventListener);
    window.addEventListener("jr_create_job", create as EventListener);
    return () => {
      window.removeEventListener("jr_toggle_filters", toggle as EventListener);
      window.removeEventListener("jr_create_job", create as EventListener);
    };
  }, []);
  
  // Add new state for view/edit modals
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  
  // Add new state for share modal
  const [shareModalOpen, setShareModalOpen] = useState(false);
  
  const handleCreateJob = (mode: "manual" | "ai") => {
    setCreateMode(mode);
    setCreateModalOpen(true);
  };
  
  const handleViewJob = (jobId: string) => {
    const job = mockJobRequisitions.find(job => job.id === jobId);
    if (job) {
      setSelectedJob(job);
      setSelectedJobId(jobId);
      setViewModalOpen(true);
    }
  };
  
  const handleEditJob = (jobId: string) => {
    const job = mockJobRequisitions.find(job => job.id === jobId);
    if (job) {
      setSelectedJob(job);
      setSelectedJobId(jobId);
      setEditModalOpen(true);
    }
  };

  // Add handler for sharing a job
  const handleShareJob = (jobId: string) => {
    const job = mockJobRequisitions.find(job => job.id === jobId);
    if (job) {
      setSelectedJob(job);
      setSelectedJobId(jobId);
      setShareModalOpen(true);
    }
  };
  
  return (
    <div className="flex flex-col">
      <div className="mb-4" />

      {showFilters && <JobFilters onClose={() => setShowFilters(false)} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard 
              title={t.totalJobRequisitions}
              value={mockJobRequisitions.length}
              icon="lucide:briefcase"
              color="primary"
            />
            <StatCard 
              title={t.publishedJobs}
              value={mockJobRequisitions.filter(job => job.status === "Published").length}
              icon="lucide:check-circle"
              color="success"
            />
            <StatCard 
              title={t.pendingApproval}
              value={mockJobRequisitions.filter(job => job.status === "Pending Approval").length}
              icon="lucide:clock"
              color="warning"
            />
            <StatCard 
              title={t.avgApprovalTime}
              value="2.4 days"
              icon="lucide:hourglass"
              color="default"
              valueIsText
            />
          </div>
          
          <Card className="flex-grow overflow-hidden border border-default-200 shadow-sm">
            <CardBody className="p-0 overflow-hidden">
              <JobRequisitionList 
                onView={handleViewJob}
                onEdit={handleEditJob}
                onShare={handleShareJob}
              />
            </CardBody>
          </Card>
        </div>
        
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-4">
          <RecentActivities />
        </div>
      </div>
      
      <CreateJobModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)}
        mode={createMode}
      />
      
      <ViewJobModal 
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        jobData={selectedJob}
        onEdit={() => {
          setViewModalOpen(false);
          setEditModalOpen(true);
        }}
      />
      
      <EditJobModal 
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedJob(null);
        }}
        jobData={selectedJob}
        onSaved={() => {
          setEditModalOpen(false);
          setSelectedJob(null);
          // In a real app, you would refresh the data or update the local state
        }}
      />
      
      <ShareJobModal 
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        jobData={selectedJob}
      />
    </div>
  );
};