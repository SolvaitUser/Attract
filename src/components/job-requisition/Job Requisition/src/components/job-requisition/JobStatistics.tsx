import React from "react";
import { Card, CardBody, Badge, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { mockJobRequisitions } from "../../data/mockData";

export const JobStatistics: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // Calculate statistics from mock data
  const totalJobs = mockJobRequisitions.length;
  
  const statusCounts = mockJobRequisitions.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const avgTimeToApproval = "2.4 days";
  
  return (
    <Card className="mb-4 border border-default-200 shadow-sm">
      <CardBody className="px-3 py-4 sm:p-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
            <Icon icon="lucide:activity" className="text-primary" width={20} />
            {t.jobStatisticsOverview}
          </h2>
          <Badge color="primary" variant="flat" size="sm">{t.newFeature}</Badge>
        </div>
        
        {/* Improve the metrics cards - make them more visually appealing */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <Card className="bg-primary-50 border-none shadow-sm hover:shadow transition-shadow duration-200">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-600 mb-1">{t.totalJobRequisitions}</p>
                  <p className="text-2xl font-semibold text-primary">{totalJobs}</p>
                </div>
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary">
                  <Icon icon="lucide:briefcase" width={24} />
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-success-50 border-none shadow-sm hover:shadow transition-shadow duration-200">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-600 mb-1">{t.publishedJobs}</p>
                  <p className="text-2xl font-semibold text-success">{statusCounts["Published"] || 0}</p>
                </div>
                <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center text-success">
                  <Icon icon="lucide:check-circle" width={24} />
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-warning-50 border-none shadow-sm hover:shadow transition-shadow duration-200">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-600 mb-1">{t.pendingApproval}</p>
                  <p className="text-2xl font-semibold text-warning">{statusCounts["Pending Approval"] || 0}</p>
                </div>
                <div className="w-12 h-12 bg-warning-100 rounded-full flex items-center justify-center text-warning">
                  <Icon icon="lucide:clock" width={24} />
                </div>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-default-50 border-none shadow-sm hover:shadow transition-shadow duration-200">
            <CardBody className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-600 mb-1">{t.avgApprovalTime}</p>
                  <p className="text-2xl font-semibold text-default-700">{avgTimeToApproval}</p>
                </div>
                <div className="w-12 h-12 bg-default-100 rounded-full flex items-center justify-center text-default-700">
                  <Icon icon="lucide:hourglass" width={24} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </CardBody>
    </Card>
  );
};