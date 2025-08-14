import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button, Input, Textarea, Chip, Avatar, Divider, Card, CardBody, Switch, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Tabs, Tab, Tooltip, Select, SelectItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";
import { motion } from "framer-motion";

interface ShareJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobData: any;
}

export const ShareJobDialog: React.FC<ShareJobDialogProps> = ({ 
  isOpen, 
  onClose, 
  jobData 
}) => {
  const { language } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [shareOption, setShareOption] = useState<"email" | "link" | "social">("email");
  const [copied, setCopied] = useState(false);
  const [shareTarget, setShareTarget] = useState<"personal" | "company">("personal");
  const [postText, setPostText] = useState("");
  const [selectedCompanyPage, setSelectedCompanyPage] = useState<string>("");
  const [showPostOptions, setShowPostOptions] = useState(false);
  const [includeImage, setIncludeImage] = useState(true);
  const [includeDescription, setIncludeDescription] = useState(true);
  const [includeSkills, setIncludeSkills] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("https://img.heroui.chat/image/ai?w=800&h=450&u=workplace1");
  const [showImageOptions, setShowImageOptions] = useState(false);
  const [generatingImages, setGeneratingImages] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const [suggestedImages, setSuggestedImages] = useState([
    "https://img.heroui.chat/image/ai?w=800&h=450&u=workplace1",
    "https://img.heroui.chat/image/ai?w=800&h=450&u=workplace2",
    "https://img.heroui.chat/image/ai?w=800&h=450&u=workplace3",
    "https://img.heroui.chat/image/ai?w=800&h=450&u=workplace4"
  ]);
  const [showSuccess, setShowSuccess] = useState(false);

  const companyPages = [
    { id: "1", name: "Wise Technologies", logo: "https://img.heroui.chat/image/avatar?w=200&h=200&u=comp1" },
    { id: "2", name: "Wise Engineering", logo: "https://img.heroui.chat/image/avatar?w=200&h=200&u=comp2" },
    { id: "3", name: "Wise Global", logo: "https://img.heroui.chat/image/avatar?w=200&h=200&u=comp3" }
  ];

  const jobLink = jobData ? `https://example.com/jobs/${jobData.id}` : "";

  React.useEffect(() => {
    if (jobData) {
      setPostText(`${t.checkOutThisJob || "Check out this job:"} ${jobData.title} at Wise. ${jobLink}`);
    }
  }, [jobData, jobLink, t.checkOutThisJob]);

  const handleGenerateImages = () => {
    if (!imagePrompt) return;
    
    setGeneratingImages(true);
    
    // Simulate AI generation with timeout
    setTimeout(() => {
      // Generate new unique images
      const newImages = [
        `https://img.heroui.chat/image/ai?w=800&h=450&u=ai${Math.random().toString(36).substring(7)}`,
        `https://img.heroui.chat/image/ai?w=800&h=450&u=ai${Math.random().toString(36).substring(7)}`,
        `https://img.heroui.chat/image/ai?w=800&h=450&u=ai${Math.random().toString(36).substring(7)}`,
        `https://img.heroui.chat/image/ai?w=800&h=450&u=ai${Math.random().toString(36).substring(7)}`
      ];
      
      setSuggestedImages(newImages);
      setSelectedImage(newImages[0]);
      setGeneratingImages(false);
    }, 2000);
  };

  const handleCopyLink = () => {
    // In a real app, this would copy a link to the clipboard
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    // Show success animation
    setShowSuccess(true);
    
    // Hide success after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const getDefaultPostText = () => {
    return `${t.checkOutThisJob || "Check out this job:"} ${jobData.title} at Wise. ${jobLink}`;
  };

  const handleAIAssist = () => {
    // Simulate AI generating a better post
    setPostText(`I'm excited to share that we're looking for a ${jobData.title} to join our ${jobData.department} team at Wise! This is a great opportunity for someone with ${jobData.experience} looking to work in a ${jobData.location} position. Check out the details and apply here: ${jobLink} #Careers #Hiring #${jobData.department.replace(/\s+/g, '')}`);
  };

  const renderSuccessScreen = () => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center h-full py-12"
    >
      <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mb-4">
        <Icon icon="lucide:check" className="text-success w-10 h-10" />
      </div>
      <h3 className="text-xl font-semibold text-success mb-2">{t.sharedSuccessfully}</h3>
      <p className="text-default-600 mb-6 text-center">{t.jobSharedToLinkedIn}</p>
      <Button 
        color="primary" 
        variant="flat"
        startContent={<Icon icon="lucide:external-link" />}
        onPress={onClose}
      >
        {t.viewPost}
      </Button>
    </motion.div>
  );

  return (
    <Drawer 
      isOpen={isOpen} 
      onOpenChange={onClose}
      placement="right"
      size="lg"
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex flex-col gap-1 border-b">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:share-2" className="text-primary" width={20} />
                <span>{t.shareJob || "Share Job"}</span>
              </div>
              <p className="text-sm text-default-600 font-normal">{jobData.title}</p>
            </DrawerHeader>
            
            <DrawerBody className="overflow-auto py-6">
              {showSuccess ? renderSuccessScreen() : (
                <div className="flex flex-col gap-6">
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    <Button
                      variant={shareOption === "email" ? "solid" : "flat"}
                      color={shareOption === "email" ? "primary" : "default"}
                      className="flex-shrink-0"
                      startContent={<Icon icon="lucide:mail" width={18} />}
                      onPress={() => setShareOption("email")}
                    >
                      {t.email || "Email"}
                    </Button>
                    <Button
                      variant={shareOption === "link" ? "solid" : "flat"}
                      color={shareOption === "link" ? "primary" : "default"}
                      className="flex-shrink-0"
                      startContent={<Icon icon="lucide:link" width={18} />}
                      onPress={() => setShareOption("link")}
                    >
                      {t.copyLink || "Copy Link"}
                    </Button>
                    <Button
                      variant={shareOption === "social" ? "solid" : "flat"}
                      color={shareOption === "social" ? "primary" : "default"}
                      className="flex-shrink-0"
                      startContent={<Icon icon="logos:linkedin-icon" width={18} />}
                      onPress={() => setShareOption("social")}
                    >
                      {t.shareToLinkedIn || "LinkedIn"}
                    </Button>
                  </div>
                  
                  {shareOption === "email" && (
                    <div className="space-y-4">
                      <Input
                        label={t.recipientEmail || "Recipient Email"}
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        startContent={<Icon icon="lucide:mail" className="text-default-400" width={16} />}
                      />
                      
                      <Textarea
                        label={t.message || "Message"}
                        placeholder={t.shareJobMessagePlaceholder || "I thought you might be interested in this job opportunity..."}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        minRows={3}
                      />
                      
                      <div className="bg-default-50 p-3 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary-100 rounded-full p-2 flex-shrink-0">
                            <Icon icon="lucide:briefcase" className="text-primary" width={18} />
                          </div>
                          <div>
                            <h3 className="font-medium">{jobData.title}</h3>
                            <p className="text-sm text-default-600">{jobData.department} • {jobData.location}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Chip size="sm" color="primary" variant="flat">{jobData.type}</Chip>
                              <Chip size="sm" color={jobData.status === "Published" ? "success" : "default"} variant="flat">
                                {jobData.status}
                              </Chip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {shareOption === "link" && (
                    <div className="space-y-4">
                      <div className="bg-default-50 p-4 rounded-lg">
                        <div className="flex justify-between items-center gap-2">
                          <p className="text-default-600 text-sm truncate flex-1">{jobLink}</p>
                          <Button
                            color={copied ? "success" : "primary"}
                            onPress={handleCopyLink}
                            startContent={<Icon icon={copied ? "lucide:check" : "lucide:copy"} width={16} />}
                          >
                            {copied ? t.copied || "Copied!" : t.copyLink || "Copy Link"}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-3 border border-default-200 rounded-lg">
                        <h3 className="font-medium mb-2">{t.jobDetails || "Job Details"}</h3>
                        <div className="flex items-start gap-3">
                          <div className="bg-primary-100 rounded-full p-2 flex-shrink-0">
                            <Icon icon="lucide:briefcase" className="text-primary" width={18} />
                          </div>
                          <div>
                            <h3 className="font-medium">{jobData.title}</h3>
                            <p className="text-sm text-default-600">{jobData.department} • {jobData.location}</p>
                            <div className="mt-2 flex items-center gap-2">
                              <Chip size="sm" color="primary" variant="flat">{jobData.type}</Chip>
                              <Chip size="sm" color={jobData.status === "Published" ? "success" : "default"} variant="flat">
                                {jobData.status}
                              </Chip>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {shareOption === "social" && (
                    <div className="space-y-5">
                      <div>
                        <h3 className="font-medium mb-3">{t.shareToLinkedIn}</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <Button
                            variant={shareTarget === "personal" ? "solid" : "flat"} 
                            color={shareTarget === "personal" ? "primary" : "default"}
                            className="flex-1 h-auto py-2 justify-start"
                            onPress={() => setShareTarget("personal")}
                            startContent={
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                <Avatar src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" size="lg" />
                              </div>
                            }
                          >
                            <div className="text-left">
                              <p className="font-medium">{t.personalProfile}</p>
                              <p className="text-xs text-default-500">John Doe</p>
                            </div>
                          </Button>
                          
                          <Button
                            variant={shareTarget === "company" ? "solid" : "flat"} 
                            color={shareTarget === "company" ? "primary" : "default"}
                            className="flex-1 h-auto py-2 justify-start"
                            onPress={() => setShareTarget("company")}
                            startContent={
                              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-default-100 flex items-center justify-center">
                                <Icon icon="lucide:building-2" width={20} className="text-default-500" />
                              </div>
                            }
                          >
                            <div className="text-left">
                              <p className="font-medium">{t.companyPage}</p>
                              <p className="text-xs text-default-500">{t.selectCompanyPage}</p>
                            </div>
                          </Button>
                        </div>
                        
                        {shareTarget === "company" && (
                          <div className="mb-4">
                            <Select
                              label={t.selectCompanyPage}
                              placeholder={t.selectCompanyPage}
                              selectedKeys={selectedCompanyPage ? [selectedCompanyPage] : []}
                              onSelectionChange={(keys) => setSelectedCompanyPage(Array.from(keys)[0] as string)}
                              className="w-full"
                              startContent={
                                selectedCompanyPage ? (
                                  <Avatar 
                                    src={companyPages.find(p => p.id === selectedCompanyPage)?.logo} 
                                    size="sm" 
                                  />
                                ) : null
                              }
                            >
                              {companyPages.map(page => (
                                <SelectItem 
                                  key={page.id} 
                                  value={page.id}
                                  startContent={<Avatar src={page.logo} size="sm" />}
                                >
                                  {page.name}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-medium">{t.postMessage}</h3>
                          <Button
                            size="sm"
                            variant="flat"
                            color="primary"
                            onPress={handleAIAssist}
                            startContent={<Icon icon="lucide:sparkles" width={16} />}
                          >
                            {t.aiAssist}
                          </Button>
                        </div>
                        
                        <Textarea 
                          placeholder={t.writeYourLinkedInPost} 
                          value={postText}
                          onValueChange={setPostText}
                          minRows={3}
                          maxRows={6}
                        />
                        
                        <div className="flex justify-between items-center mt-2">
                          <Button
                            size="sm"
                            variant="flat"
                            startContent={<Icon icon={showPostOptions ? "lucide:eye-off" : "lucide:settings-2"} width={16} />}
                            onPress={() => setShowPostOptions(!showPostOptions)}
                          >
                            {showPostOptions ? t.hideOptions : t.customize}
                          </Button>
                          
                          <div className="text-xs text-default-500">
                            {postText.length} / 1300
                          </div>
                        </div>
                        
                        {showPostOptions && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 pt-3 border-t"
                          >
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Icon icon="lucide:image" width={16} className="text-default-500" />
                                  <span className="text-sm">{t.includeImage}</span>
                                </div>
                                <Switch
                                  isSelected={includeImage}
                                  onValueChange={setIncludeImage}
                                  size="sm"
                                />
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Icon icon="lucide:align-left" width={16} className="text-default-500" />
                                  <span className="text-sm">{t.includeDescription}</span>
                                </div>
                                <Switch
                                  isSelected={includeDescription}
                                  onValueChange={setIncludeDescription}
                                  size="sm"
                                />
                              </div>
                              
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Icon icon="lucide:tag" width={16} className="text-default-500" />
                                  <span className="text-sm">{t.includeSkills}</span>
                                </div>
                                <Switch
                                  isSelected={includeSkills}
                                  onValueChange={setIncludeSkills}
                                  size="sm"
                                />
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                      
                      {includeImage && (
                        <div>
                          <h3 className="font-medium mb-3">{t.featuredImage}</h3>
                          <Card className="mb-4">
                            <CardBody className="p-3">
                              <img 
                                src={selectedImage} 
                                alt="Post preview" 
                                className="w-full h-48 object-cover rounded-md" 
                              />
                            </CardBody>
                          </Card>
                          
                          <div className="flex gap-2 mb-4">
                            <Button 
                              variant="flat" 
                              color="primary" 
                              className="flex-1"
                              startContent={<Icon icon="lucide:image" width={16} />}
                              onPress={() => setShowImageOptions(!showImageOptions)}
                            >
                              {t.changeImage}
                            </Button>
                          </div>
                          
                          {showImageOptions && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Card className="mb-4">
                                <CardBody className="p-3">
                                  <h4 className="font-medium text-sm mb-2">{t.generateImagesWithAI}</h4>
                                  
                                  <div className="flex gap-2 mb-3">
                                    <Input
                                      placeholder={t.enterPromptForImage}
                                      value={imagePrompt}
                                      onValueChange={setImagePrompt}
                                      className="flex-1"
                                    />
                                    <Button 
                                      color="primary" 
                                      isLoading={generatingImages}
                                      isDisabled={!imagePrompt.trim() || generatingImages}
                                      onPress={handleGenerateImages}
                                    >
                                      {t.generate || "Generate"}
                                    </Button>
                                  </div>
                                  
                                  <div className="text-xs text-default-600 mb-2">
                                    <p>{t.tryPromptsLike}:</p>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                      <Chip 
                                        size="sm" 
                                        variant="flat" 
                                        onPress={() => setImagePrompt(t.teamWorking || "Team working")}
                                      >
                                        {t.teamWorking || "Team working"}
                                      </Chip>
                                      <Chip 
                                        size="sm" 
                                        variant="flat" 
                                        onPress={() => setImagePrompt(t.modernWorkplace || "Modern workplace")}
                                      >
                                        {t.modernWorkplace || "Modern workplace"}
                                      </Chip>
                                      <Chip 
                                        size="sm" 
                                        variant="flat" 
                                        onPress={() => setImagePrompt(`${jobData.department} workspace`)}
                                      >
                                        {jobData.department} workspace
                                      </Chip>
                                    </div>
                                  </div>
                                  
                                  <Divider className="my-3" />
                                  
                                  <h4 className="font-medium text-sm mb-2">{t.selectAnImage}</h4>
                                  
                                  {generatingImages ? (
                                    <div className="flex items-center justify-center p-8">
                                      <div className="flex flex-col items-center">
                                        <Icon icon="lucide:loader-2" className="w-8 h-8 animate-spin text-primary mb-2" />
                                        <p className="text-sm text-default-600">{t.generatingImages}</p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                      {suggestedImages.map((img, idx) => (
                                        <div 
                                          key={idx} 
                                          className={`
                                            cursor-pointer rounded-md overflow-hidden border-2 
                                            ${selectedImage === img ? 'border-primary' : 'border-transparent'}
                                          `}
                                          onClick={() => setSelectedImage(img)}
                                        >
                                          <img 
                                            src={img} 
                                            alt={`Option ${idx + 1}`} 
                                            className="w-full h-24 object-cover" 
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </CardBody>
                              </Card>
                            </motion.div>
                          )}
                        </div>
                      )}
                      
                      <Divider />
                      
                      <div>
                        <h3 className="font-medium mb-3">{t.preview}</h3>
                        <Card className="bg-default-50 shadow-sm">
                          <CardBody className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Avatar
                                src={shareTarget === "personal" 
                                  ? "https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
                                  : companyPages.find(p => p.id === selectedCompanyPage)?.logo || ""}
                                name={shareTarget === "personal" ? "John Doe" : "Company"}
                                size="md"
                              />
                              <div>
                                <p className="font-medium">
                                  {shareTarget === "personal" 
                                    ? "John Doe" 
                                    : companyPages.find(p => p.id === selectedCompanyPage)?.name || t.companyPage}
                                </p>
                                <p className="text-xs text-default-500">Just now</p>
                              </div>
                            </div>
                            
                            <p className="text-sm mb-3 whitespace-pre-line">{postText}</p>
                            
                            {includeImage && (
                              <div className="mb-3">
                                <img 
                                  src={selectedImage} 
                                  alt="Post preview" 
                                  className="w-full h-48 object-cover rounded-md" 
                                />
                              </div>
                            )}
                            
                            {includeDescription && (
                              <div className="border rounded-md p-3 bg-white mb-3">
                                <div className="flex items-start gap-3">
                                  <div className="bg-primary-100 rounded-full p-2 flex-shrink-0">
                                    <Icon icon="lucide:briefcase" className="text-primary" width={18} />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">{jobData.title}</h3>
                                    <p className="text-sm text-default-600">{jobData.department} • {jobData.location}</p>
                                    {includeSkills && (
                                      <div className="mt-2 flex flex-wrap gap-1">
                                        {jobData.skills && jobData.skills.slice(0, 3).map((skill: string, index: number) => (
                                          <Chip key={index} size="sm" color="primary" variant="flat">{skill}</Chip>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-3 text-default-500">
                              <div className="flex items-center gap-1">
                                <Icon icon="lucide:thumbs-up" width={14} />
                                <span className="text-xs">0</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon icon="lucide:message-square" width={14} />
                                <span className="text-xs">0</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon icon="lucide:repeat" width={14} />
                                <span className="text-xs">0</span>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  )}
                  
                  <Divider />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">{t.alsoNotifyTeam || "Also Notify Team Members"}</h3>
                    
                    <div className="flex flex-wrap gap-2">
                      <Chip 
                        variant="flat" 
                        startContent={
                          <Avatar 
                            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
                            className="w-6 h-6" 
                          />
                        }
                        onClose={() => {}}
                      >
                        John Doe
                      </Chip>
                      <Chip 
                        variant="flat" 
                        startContent={
                          <Avatar 
                            src="https://img.heroui.chat/image/avatar?w=200&h=200&u=2" 
                            className="w-6 h-6" 
                          />
                        }
                        onClose={() => {}}
                      >
                        Jane Smith
                      </Chip>
                      <Button 
                        variant="flat" 
                        isIconOnly 
                        startContent={<Icon icon="lucide:plus" width={16} />}
                      />
                    </div>
                  </div>
                </div>
              )}
            </DrawerBody>
            
            <DrawerFooter className="border-t">
              {!showSuccess && (
                <>
                  <Button variant="flat" onPress={onClose}>
                    {t.cancel || "Cancel"}
                  </Button>
                  <Button 
                    color="primary" 
                    onPress={handleShare} 
                    isDisabled={shareOption === "email" && !email || shareOption === "social" && shareTarget === "company" && !selectedCompanyPage}
                  >
                    {shareOption === "social" ? t.post || "Post" : t.share || "Share"}
                  </Button>
                </>
              )}
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};