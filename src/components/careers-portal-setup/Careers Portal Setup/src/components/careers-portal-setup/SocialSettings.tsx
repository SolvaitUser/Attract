import React from "react";
import { Input, Divider, Switch, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../data/translations";

interface SocialSettingsProps {
  settings: {
    linkedin: string;
    twitter: string;
    facebook: string;
    instagram: string;
  };
  onChange: (key: string, value: any) => void;
  language: LanguageKey;
}

export const SocialSettings: React.FC<SocialSettingsProps> = ({ settings, onChange, language }) => {
  // Add state for application integration settings
  const [applicationSettings, setApplicationSettings] = React.useState({
    enableSocialSharing: true,
    enableReferFriend: true,
    enableLinkedInApply: true,
    enableIndeedApply: true,
    trackApplications: true
  });
  
  const handleToggleChange = (setting: string, value: boolean) => {
    setApplicationSettings({
      ...applicationSettings,
      [setting]: value
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Social Media Links */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Social Media Links" : "روابط وسائل التواصل الاجتماعي"}</h3>
        
        <Input
          label="LinkedIn"
          placeholder="company/wise"
          value={settings.linkedin}
          onChange={(e) => onChange("linkedin", e.target.value)}
          variant="bordered"
          startContent={
            <Icon icon="logos:linkedin-icon" className="text-blue-700" width={18} />
          }
          className="max-w-full"
        />
        
        <Input
          label="Twitter / X"
          placeholder="wisecompany"
          value={settings.twitter}
          onChange={(e) => onChange("twitter", e.target.value)}
          variant="bordered"
          startContent={
            <Icon icon="logos:twitter" width={18} />
          }
          className="max-w-full"
        />
        
        <Input
          label="Facebook"
          placeholder="wisecompany"
          value={settings.facebook}
          onChange={(e) => onChange("facebook", e.target.value)}
          variant="bordered"
          startContent={
            <Icon icon="logos:facebook" width={18} />
          }
          className="max-w-full"
        />
        
        <Input
          label="Instagram"
          placeholder="wisecompany"
          value={settings.instagram}
          onChange={(e) => onChange("instagram", e.target.value)}
          variant="bordered"
          startContent={
            <Icon icon="logos:instagram-icon" width={18} />
          }
          className="max-w-full"
        />
      </div>
      
      <Divider />
      
      {/* Sharing Options - Enhanced with more details */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Sharing Options" : "خيارات المشاركة"}</h3>
        
        <div className="border rounded-lg p-4 bg-default-50">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium">
                {language === "en" ? "Enable job sharing on social media" : "تمكين مشاركة الوظائف على وسائل التواصل الاجتماعي"}
              </h4>
              <p className="text-sm text-default-500">
                {language === "en" 
                  ? "Allow candidates to share job listings on their social networks" 
                  : "السماح للمرشحين بمشاركة قوائم الوظائف على شبكاتهم الاجتماعية"
                }
              </p>
            </div>
            <Switch
              isSelected={applicationSettings.enableSocialSharing}
              onValueChange={(value) => handleToggleChange("enableSocialSharing", value)}
              color="primary"
            />
          </div>
          
          {applicationSettings.enableSocialSharing && (
            <div className="bg-white rounded border p-3">
              <h5 className="text-sm font-medium mb-2">
                {language === "en" ? "Available Sharing Platforms" : "منصات المشاركة المتاحة"}
              </h5>
              <div className="flex flex-wrap gap-2">
                <div className="border rounded px-3 py-1 flex items-center gap-1 bg-[#0077b5] bg-opacity-10">
                  <Icon icon="logos:linkedin-icon" width={16} />
                  <span className="text-xs">LinkedIn</span>
                </div>
                <div className="border rounded px-3 py-1 flex items-center gap-1 bg-[#1DA1F2] bg-opacity-10">
                  <Icon icon="logos:twitter" width={16} />
                  <span className="text-xs">Twitter</span>
                </div>
                <div className="border rounded px-3 py-1 flex items-center gap-1 bg-[#4267B2] bg-opacity-10">
                  <Icon icon="logos:facebook" width={16} />
                  <span className="text-xs">Facebook</span>
                </div>
                <div className="border rounded px-3 py-1 flex items-center gap-1 bg-default-100">
                  <Icon icon="lucide:mail" width={16} />
                  <span className="text-xs">{language === "en" ? "Email" : "البريد الإلكتروني"}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border rounded-lg p-4 bg-default-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                {language === "en" ? "Enable 'Refer a Friend' option" : "تمكين خيار 'إحالة صديق'"}
              </h4>
              <p className="text-sm text-default-500">
                {language === "en" 
                  ? "Allow candidates to refer jobs to their contacts" 
                  : "السماح للمرشحين بإحالة الوظائف إلى جهات الاتصال الخاصة بهم"
                }
              </p>
            </div>
            <Switch
              isSelected={applicationSettings.enableReferFriend}
              onValueChange={(value) => handleToggleChange("enableReferFriend", value)}
              color="primary"
            />
          </div>
        </div>
      </div>
      
      <Divider />
      
      {/* Application Options - Enhanced with more details */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Application Options" : "خيارات التقديم"}</h3>
        
        <div className="border rounded-lg p-4 bg-default-50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium">
                {language === "en" ? "Allow applying with LinkedIn" : "السماح بالتقديم باستخدام LinkedIn"}
              </h4>
              <p className="text-sm text-default-500">
                {language === "en" 
                  ? "Enable one-click applications using LinkedIn profiles" 
                  : "تمكين تطبيقات بنقرة واحدة باستخدام ملفات تعريف LinkedIn"
                }
              </p>
            </div>
            <Switch
              isSelected={applicationSettings.enableLinkedInApply}
              onValueChange={(value) => handleToggleChange("enableLinkedInApply", value)}
              color="primary"
            />
          </div>
          
          {applicationSettings.enableLinkedInApply && (
            <div className="flex items-center gap-2 mb-3 p-2 rounded bg-white border">
              <Icon icon="logos:linkedin-icon" width={20} />
              <div className="flex-1">
                <h5 className="text-xs font-medium">LinkedIn API Key</h5>
                <div className="flex gap-2 mt-1">
                  <Input 
                    placeholder="Enter your LinkedIn API key"
                    type="password"
                    size="sm"
                    variant="bordered"
                    className="text-xs"
                  />
                  <Button size="sm" color="primary" variant="flat">
                    {language === "en" ? "Verify" : "تحقق"}
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="font-medium">
                {language === "en" ? "Allow applying with Indeed" : "السماح بالتقديم باستخدام Indeed"}
              </h4>
              <p className="text-sm text-default-500">
                {language === "en" 
                  ? "Enable one-click applications using Indeed profiles" 
                  : "تمكين تطبيقات بنقرة واحدة باستخدام ملفات تعريف Indeed"
                }
              </p>
            </div>
            <Switch
              isSelected={applicationSettings.enableIndeedApply}
              onValueChange={(value) => handleToggleChange("enableIndeedApply", value)}
              color="primary"
            />
          </div>
          
          {applicationSettings.enableIndeedApply && (
            <div className="flex items-center gap-2 p-2 rounded bg-white border">
              <Icon icon="logos:indeed" width={20} />
              <div className="flex-1">
                <h5 className="text-xs font-medium">Indeed API Key</h5>
                <div className="flex gap-2 mt-1">
                  <Input 
                    placeholder="Enter your Indeed API key"
                    type="password"
                    size="sm"
                    variant="bordered"
                    className="text-xs"
                  />
                  <Button size="sm" color="primary" variant="flat">
                    {language === "en" ? "Verify" : "تحقق"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="border rounded-lg p-4 bg-default-50">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">
                {language === "en" ? "Track application analytics" : "تتبع تحليلات التطبيق"}
              </h4>
              <p className="text-sm text-default-500">
                {language === "en" 
                  ? "Collect data on application sources and completion rates" 
                  : "جمع البيانات عن مصادر التطبيق ومعدلات الإكمال"
                }
              </p>
            </div>
            <Switch
              isSelected={applicationSettings.trackApplications}
              onValueChange={(value) => handleToggleChange("trackApplications", value)}
              color="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};