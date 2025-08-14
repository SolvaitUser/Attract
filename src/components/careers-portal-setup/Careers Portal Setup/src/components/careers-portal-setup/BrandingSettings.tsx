import React from "react";
import { Input, Button, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../data/translations";
import { HexColorPicker } from "react-colorful";

interface BrandingSettingsProps {
  settings: {
    companyName: string;
    logo: string;
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    bannerImage: string;
  };
  onChange: (key: string, value: any) => void;
  language: LanguageKey;
}

export const BrandingSettings: React.FC<BrandingSettingsProps> = ({ settings, onChange, language }) => {
  const [activePicker, setActivePicker] = React.useState<null | "primary" | "secondary">(null);
  
  return (
    <div className="space-y-6">
      {/* Company Info */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Company Information" : "معلومات الشركة"}</h3>
        
        <Input
          label={language === "en" ? "Company Name" : "اسم الشركة"}
          value={settings.companyName}
          onChange={(e) => onChange("companyName", e.target.value)}
          variant="bordered"
          className="max-w-full"
        />
        
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium">{language === "en" ? "Company Logo" : "شعار الشركة"}</p>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border rounded bg-white flex items-center justify-center overflow-hidden">
              <img src={settings.logo} alt="Company Logo" className="max-w-full max-h-full object-contain" />
            </div>
            <Button
              variant="flat"
              color="primary"
              startContent={<Icon icon="lucide:upload" width={18} />}
            >
              {language === "en" ? "Upload Logo" : "تحميل الشعار"}
            </Button>
          </div>
        </div>
      </div>
      
      <Divider />
      
      {/* Brand Colors */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Brand Colors" : "ألوان العلامة التجارية"}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Primary Color */}
          <div>
            <p className="mb-2 text-sm font-medium">{language === "en" ? "Primary Color" : "اللون الأساسي"}</p>
            <div className="relative">
              <div 
                className="h-10 rounded border cursor-pointer flex items-center px-3 gap-2"
                onClick={() => setActivePicker(activePicker === "primary" ? null : "primary")}
              >
                <div 
                  className="w-5 h-5 rounded-full" 
                  style={{ backgroundColor: settings.primaryColor }}
                />
                <span>{settings.primaryColor}</span>
              </div>
              
              {activePicker === "primary" && (
                <Card className="absolute top-full left-0 mt-2 z-10">
                  <CardBody>
                    <HexColorPicker 
                      color={settings.primaryColor} 
                      onChange={(color) => onChange("primaryColor", color)} 
                    />
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
          
          {/* Secondary Color */}
          <div>
            <p className="mb-2 text-sm font-medium">{language === "en" ? "Secondary Color" : "اللون الثانوي"}</p>
            <div className="relative">
              <div 
                className="h-10 rounded border cursor-pointer flex items-center px-3 gap-2"
                onClick={() => setActivePicker(activePicker === "secondary" ? null : "secondary")}
              >
                <div 
                  className="w-5 h-5 rounded-full" 
                  style={{ backgroundColor: settings.secondaryColor }}
                />
                <span>{settings.secondaryColor}</span>
              </div>
              
              {activePicker === "secondary" && (
                <Card className="absolute top-full left-0 mt-2 z-10">
                  <CardBody>
                    <HexColorPicker 
                      color={settings.secondaryColor} 
                      onChange={(color) => onChange("secondaryColor", color)} 
                    />
                  </CardBody>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Divider />
      
      {/* Banner Image */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Hero Banner" : "البانر الرئيسي"}</h3>
        
        <div>
          <p className="mb-2 text-sm">{language === "en" ? "This image will be displayed as the main banner on your careers portal." : "ستظهر هذه الصورة كبانر رئيسي على بوابة الوظائف."}</p>
          
          <div className="border rounded overflow-hidden mb-3">
            <img src={settings.bannerImage} alt="Banner" className="w-full h-32 object-cover" />
          </div>
          
          <Button
            variant="flat"
            color="primary"
            startContent={<Icon icon="lucide:image" width={18} />}
          >
            {language === "en" ? "Change Banner Image" : "تغيير صورة البانر"}
          </Button>
        </div>
      </div>
      
      <Divider />
      
      {/* Typography */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Typography" : "الخطوط"}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <p className="mb-2 text-sm font-medium">{language === "en" ? "Font Family" : "نوع الخط"}</p>
            <div className="relative">
              <select 
                className="w-full h-10 rounded border px-3 bg-white cursor-pointer"
                value={settings.fontFamily}
                onChange={(e) => onChange("fontFamily", e.target.value)}
              >
                <option value="Inter">Inter</option>
                <option value="Roboto">Roboto</option>
                <option value="Open Sans">Open Sans</option>
                <option value="Poppins">Poppins</option>
                <option value="Montserrat">Montserrat</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <Icon icon="lucide:chevron-down" width={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};