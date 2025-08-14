import React, { useState } from "react";
  import { Card, CardBody, Input, Select, SelectItem, Button } from "@heroui/react";
  import { Icon } from "@iconify/react";
  import { useLanguage } from "../../contexts/LanguageContext";
  import { translations } from "../../data/translations";
  
  interface JobFiltersProps {
    onClose: () => void;
  }
  
  export const JobFilters: React.FC<JobFiltersProps> = ({ onClose }) => {
    const { language } = useLanguage();
    const t = translations[language];
    const [filters, setFilters] = useState({
      keyword: "",
      status: new Set([]),
      department: new Set([]),
      location: new Set([]),
      dateRange: "",
    });
    
    const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
    const locations = ["Remote", "New York", "San Francisco", "London", "Dubai", "Singapore"];
    const statuses = ["Draft", "Pending Approval", "Approved", "Published", "Closed", "Rejected"];
    
    const handleReset = () => {
      setFilters({
        keyword: "",
        status: new Set([]),
        department: new Set([]),
        location: new Set([]),
        dateRange: "",
      });
    };
    
    const handleApply = () => {
      // Apply filters logic here
      onClose();
    };
    
    return (
      <Card className="w-full mb-4 overflow-visible">
        <CardBody className="p-3 sm:p-4 overflow-visible">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input
              label={t.keyword}
              placeholder={t.searchJobs}
              value={filters.keyword}
              onChange={(e) => setFilters({...filters, keyword: e.target.value})}
              startContent={<Icon icon="lucide:search" className="text-default-400" width={16} />}
              classNames={{
                label: "text-sm",
                inputWrapper: "h-10"
              }}
              size="sm"
            />
            <Select
              label={t.status}
              placeholder={t.selectStatus}
              selectionMode="multiple"
              selectedKeys={filters.status}
              onSelectionChange={(keys) => setFilters({...filters, status: keys as Set<string>})}
              classNames={{
                label: "text-sm",
                trigger: "h-10"
              }}
              size="sm"
            >
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </Select>
            <Select
              label={t.department}
              placeholder={t.selectDepartment}
              selectionMode="multiple"
              selectedKeys={filters.department}
              onSelectionChange={(keys) => setFilters({...filters, department: keys as Set<string>})}
              classNames={{
                label: "text-sm",
                trigger: "h-10"
              }}
              size="sm"
            >
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </Select>
            <Select
              label={t.location}
              placeholder={t.selectLocation}
              selectionMode="multiple"
              selectedKeys={filters.location}
              onSelectionChange={(keys) => setFilters({...filters, location: keys as Set<string>})}
              classNames={{
                label: "text-sm",
                trigger: "h-10"
              }}
              size="sm"
            >
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </Select>
          </div>
          <div className="flex justify-end mt-3 gap-2">
            <Button variant="flat" onPress={handleReset} size="sm">
              {t.reset}
            </Button>
            <Button color="primary" onPress={handleApply} size="sm">
              {t.applyFilters}
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  };