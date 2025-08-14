import React, { useState } from "react";
import { Button, Select, SelectItem, Avatar, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

// Mock users data for demo purposes if not imported elsewhere
const users = [
  { id: "1", name: "John Doe", role: "HR Manager", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" },
  { id: "2", name: "Jane Smith", role: "Department Head", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=2" },
  { id: "3", name: "Michael Brown", role: "CEO", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=3" },
  { id: "4", name: "Sarah Lee", role: "HR Specialist", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=4" },
  { id: "5", name: "David Wilson", role: "HR Director", avatar: "https://img.heroui.chat/image/avatar?w=200&h=200&u=5" }
];

export const ApprovalWorkflow: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [approvers, setApprovers] = useState<Array<{id: string, name: string, role: string, avatar: string}>>([]);
  const [selectedApprover, setSelectedApprover] = useState<string>("");
  
  const handleAddApprover = () => {
    if (!selectedApprover) return;
    
    const user = users.find(u => u.id === selectedApprover);
    if (user && !approvers.some(a => a.id === user.id)) {
      setApprovers([...approvers, user]);
      setSelectedApprover("");
    }
  };
  
  const handleRemoveApprover = (id: string) => {
    setApprovers(approvers.filter(a => a.id !== id));
  };
  
  const handleMoveApprover = (id: string, direction: 'up' | 'down') => {
    const index = approvers.findIndex(a => a.id === id);
    if (index === -1) return;
    
    const newApprovers = [...approvers];
    if (direction === 'up' && index > 0) {
      [newApprovers[index], newApprovers[index - 1]] = [newApprovers[index - 1], newApprovers[index]];
    } else if (direction === 'down' && index < approvers.length - 1) {
      [newApprovers[index], newApprovers[index + 1]] = [newApprovers[index + 1], newApprovers[index]];
    }
    
    setApprovers(newApprovers);
  };
  
  return (
    <div className="space-y-6 mt-4">
      <Card className="bg-default-50 shadow-sm">
        <CardBody className="p-4">
          <h3 className="font-semibold mb-2">{t.aboutApprovalWorkflow}</h3>
          <p className="text-sm text-default-600">{t.approvalWorkflowDescription}</p>
        </CardBody>
      </Card>
      
      <div>
        <div className="flex items-end gap-2 mb-4">
          <Select
            label={t.selectApprover}
            placeholder={t.selectApprover}
            className="flex-1"
            selectedKeys={selectedApprover ? [selectedApprover] : []}
            onSelectionChange={(keys) => setSelectedApprover(Array.from(keys)[0] as string)}
          >
            {users
              .filter(user => !approvers.some(a => a.id === user.id))
              .map((user) => (
                <SelectItem key={user.id} textValue={user.name}>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm" src={user.avatar} name={user.name} />
                    <div>
                      <p>{user.name}</p>
                      <p className="text-tiny text-default-500">{user.role}</p>
                    </div>
                  </div>
                </SelectItem>
              ))
            }
          </Select>
          <Button 
            color="primary" 
            onPress={handleAddApprover}
            isDisabled={!selectedApprover}
          >
            {t.add}
          </Button>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold mb-2">{t.approvalSequence}</h3>
          {approvers.length === 0 ? (
            <div className="text-center py-8 border-2 border-dashed rounded-lg">
              <p className="text-default-500">{t.noApproversYet}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {approvers.map((approver, index) => (
                <div key={approver.id} className="flex items-center gap-2 p-3 border rounded-lg bg-default-50">
                  <div className="flex flex-col items-center justify-center px-1">
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light" 
                      isDisabled={index === 0}
                      onPress={() => handleMoveApprover(approver.id, 'up')}
                    >
                      <Icon icon="lucide:chevron-up" width={16} />
                    </Button>
                    <p className="text-default-600 font-medium">{index + 1}</p>
                    <Button 
                      isIconOnly 
                      size="sm" 
                      variant="light" 
                      isDisabled={index === approvers.length - 1}
                      onPress={() => handleMoveApprover(approver.id, 'down')}
                    >
                      <Icon icon="lucide:chevron-down" width={16} />
                    </Button>
                  </div>
                  <Avatar size="md" src={approver.avatar} name={approver.name} />
                  <div className="flex-1">
                    <p className="font-medium">{approver.name}</p>
                    <p className="text-tiny text-default-500">{approver.role}</p>
                  </div>
                  <Button 
                    isIconOnly 
                    size="sm" 
                    variant="light" 
                    color="danger" 
                    onPress={() => handleRemoveApprover(approver.id)}
                  >
                    <Icon icon="lucide:trash-2" width={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};