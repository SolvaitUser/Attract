import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Checkbox, Chip, Input, Avatar, Divider, Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { users } from "../../data/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface ShareJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: any;
}

export const ShareJobModal: React.FC<ShareJobModalProps> = ({ isOpen, onClose, jobData }) => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // State for email input and sharing options
  const [email, setEmail] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [shareMethod, setShareMethod] = useState<"email" | "link" | "teams">("email");
  const [notifyTeamMembers, setNotifyTeamMembers] = useState(false);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState<string[]>([]);
  const [isSharing, setIsSharing] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  
  // Function to handle sharing with selected recipients
  const handleShare = () => {
    setIsSharing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSharing(false);
      setShareSuccess(true);
      
      // After success, close modal after a delay
      setTimeout(() => {
        handleClose();
      }, 1500);
    }, 1000);
  };
  
  // Reset state when modal closes
  const handleClose = () => {
    setEmail("");
    setEmails([]);
    setNotifyTeamMembers(false);
    setSelectedTeamMembers([]);
    setShareSuccess(false);
    onClose();
  };
  
  // Handle adding an email
  const handleAddEmail = () => {
    if (email && isValidEmail(email) && !emails.includes(email)) {
      setEmails([...emails, email]);
      setEmail("");
    }
  };
  
  // Handle removing an email
  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter(e => e !== emailToRemove));
  };
  
  // Handle email input keydown event (enter to add)
  const handleEmailKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };
  
  // Helper function to validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Toggle team member selection
  const toggleTeamMember = (userId: string) => {
    if (selectedTeamMembers.includes(userId)) {
      setSelectedTeamMembers(selectedTeamMembers.filter(id => id !== userId));
    } else {
      setSelectedTeamMembers([...selectedTeamMembers, userId]);
    }
  };
  
  return (
    <Modal isOpen={isOpen} onOpenChange={handleClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:share-2" className="text-primary" width={20} />
                <span>{t.shareJob || "Share Job"}</span>
              </div>
              {jobData && (
                <p className="text-sm text-default-600 font-normal">{jobData.title}</p>
              )}
            </ModalHeader>
            
            <Divider />
            
            <ModalBody>
              {shareSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-success-100 rounded-full flex items-center justify-center mb-4">
                    <Icon icon="lucide:check" className="text-success" width={32} />
                  </div>
                  <h3 className="text-xl font-medium mb-2">{t.jobShared || "Job Shared Successfully!"}</h3>
                  <p className="text-default-600">
                    {notifyTeamMembers 
                      ? t.jobSharedWithNotification || "The job has been shared and team members have been notified." 
                      : t.jobSharedWithoutNotification || "The job has been shared successfully."}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-6 py-2">
                  {/* Share method selector */}
                  <div className="flex border rounded-lg overflow-hidden">
                    <Button 
                      className={`flex-1 rounded-none ${shareMethod === "email" ? "bg-primary-50 border-primary text-primary" : ""}`}
                      variant="flat"
                      onPress={() => setShareMethod("email")}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:mail" width={16} />
                        <span>{t.email || "Email"}</span>
                      </div>
                    </Button>
                    <Button 
                      className={`flex-1 rounded-none ${shareMethod === "link" ? "bg-primary-50 border-primary text-primary" : ""}`}
                      variant="flat"
                      onPress={() => setShareMethod("link")}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:link" width={16} />
                        <span>{t.copyLink || "Copy Link"}</span>
                      </div>
                    </Button>
                    <Button 
                      className={`flex-1 rounded-none ${shareMethod === "teams" ? "bg-primary-50 border-primary text-primary" : ""}`}
                      variant="flat"
                      onPress={() => setShareMethod("teams")}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:users" width={16} />
                        <span>{t.teams || "Teams"}</span>
                      </div>
                    </Button>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    {shareMethod === "email" && (
                      <motion.div
                        key="email"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div>
                          <p className="text-sm mb-2">{t.shareViaEmail || "Share via email"}</p>
                          <div className="flex gap-2">
                            <Input
                              placeholder={t.enterEmailAddress || "Enter email address"}
                              value={email}
                              onValueChange={setEmail}
                              onKeyDown={handleEmailKeyDown}
                              fullWidth
                              endContent={
                                <Button 
                                  isIconOnly 
                                  size="sm" 
                                  variant="light"
                                  onPress={handleAddEmail}
                                  isDisabled={!email || !isValidEmail(email)}
                                >
                                  <Icon icon="lucide:plus" width={16} />
                                </Button>
                              }
                            />
                          </div>
                          
                          {/* Display added emails */}
                          {emails.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {emails.map((email, index) => (
                                <Chip 
                                  key={index} 
                                  onClose={() => handleRemoveEmail(email)}
                                  variant="flat"
                                  size="sm"
                                >
                                  {email}
                                </Chip>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                    
                    {shareMethod === "link" && (
                      <motion.div
                        key="link"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <p className="text-sm">{t.shareLinkDescription || "Copy the link below to share this job"}</p>
                        <Input
                          value={`https://jobs.company.com/job/${jobData?.id || "12345"}`}
                          readOnly
                          endContent={
                            <Button 
                              size="sm" 
                              variant="flat"
                              color="primary"
                              onPress={() => {
                                navigator.clipboard.writeText(`https://jobs.company.com/job/${jobData?.id || "12345"}`);
                              }}
                            >
                              <div className="flex items-center gap-1">
                                <Icon icon="lucide:copy" width={14} />
                                <span>{t.copy || "Copy"}</span>
                              </div>
                            </Button>
                          }
                        />
                      </motion.div>
                    )}
                    
                    {shareMethod === "teams" && (
                      <motion.div
                        key="teams"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <p className="text-sm">{t.selectTeamMembers || "Select team members to share with"}</p>
                        <Card>
                          <CardBody className="p-2">
                            <div className="max-h-48 overflow-y-auto">
                              {users.map((user) => (
                                <div 
                                  key={user.id} 
                                  className="flex items-center justify-between p-2 hover:bg-default-50 rounded-md cursor-pointer"
                                  onClick={() => toggleTeamMember(user.id)}
                                >
                                  <div className="flex items-center gap-2">
                                    <Avatar 
                                      src={user.avatar} 
                                      name={user.name} 
                                      size="sm"
                                    />
                                    <div>
                                      <p className="font-medium">{user.name}</p>
                                      <p className="text-xs text-default-500">{user.role}</p>
                                    </div>
                                  </div>
                                  <Checkbox 
                                    isSelected={selectedTeamMembers.includes(user.id)}
                                    onValueChange={() => toggleTeamMember(user.id)}
                                  />
                                </div>
                              ))}
                            </div>
                          </CardBody>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Notification option */}
                  <div className="pt-2">
                    <Divider className="my-4" />
                    <div className="flex items-start gap-2">
                      <Checkbox 
                        isSelected={notifyTeamMembers}
                        onValueChange={setNotifyTeamMembers}
                        id="notify-team"
                      >
                        {t.notifyTeamMembers || "Also notify team members"}
                      </Checkbox>
                    </div>
                    
                    {notifyTeamMembers && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 ml-6 border-l-2 border-primary-100 pl-3 text-sm text-default-600"
                      >
                        <p>{t.notifyTeamMembersDescription || "An email notification will be sent to all team members about this job share."}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {users.slice(0, 3).map((user) => (
                              <Avatar 
                                key={user.id}
                                src={user.avatar}
                                name={user.name}
                                size="sm"
                                className="border-2 border-white"
                              />
                            ))}
                            {users.length > 3 && (
                              <div className="w-8 h-8 rounded-full bg-default-100 flex items-center justify-center text-xs font-medium border-2 border-white">
                                +{users.length - 3}
                              </div>
                            )}
                          </div>
                          <p className="text-xs text-default-500">
                            {t.teamMembersWillBeNotified || `${users.length} team members will be notified`}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </ModalBody>
            
            <Divider />
            
            <ModalFooter>
              {!shareSuccess && (
                <>
                  <Button
                    variant="flat"
                    onPress={handleClose}
                    isDisabled={isSharing}
                  >
                    {t.cancel}
                  </Button>
                  
                  <Button
                    color="primary"
                    onPress={handleShare}
                    isLoading={isSharing}
                    isDisabled={
                      (shareMethod === "email" && emails.length === 0) ||
                      (shareMethod === "teams" && selectedTeamMembers.length === 0)
                    }
                    startContent={!isSharing && <Icon icon="lucide:share-2" width={16} />}
                  >
                    {t.share || "Share"}
                  </Button>
                </>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};