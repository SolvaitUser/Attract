import React from "react";
import { Textarea, Input, Divider, Checkbox, Accordion, AccordionItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../data/translations";
import { TestimonialsSettings } from "./TestimonialsSettings";
import { BenefitsSettings } from "./BenefitsSettings";

interface ContentSettingsProps {
  settings: {
    headline: string;
    subheadline: string;
    aboutCompany: string;
    footerText: string;
    testimonials: {
      id: string;
      name: string;
      role: string;
      avatar: string;
      quote: string;
    }[];
    benefits: {
      id: string;
      icon: string;
      title: string;
      description: string;
    }[];
  };
  onChange: (key: string, value: any) => void;
  language: LanguageKey;
}

export const ContentSettings: React.FC<ContentSettingsProps> = ({ settings, onChange, language }) => {
  const updateTestimonials = (testimonials: any[]) => {
    onChange('testimonials', testimonials);
  };
  
  const updateBenefits = (benefits: any[]) => {
    onChange('benefits', benefits);
  };
  
  return (
    <div className="space-y-6">
      <Accordion 
        defaultExpandedKeys={["hero"]}
        variant="splitted" 
        className="p-0 gap-3"
        showDivider={false}
      >
        {/* Hero Section Content */}
        <AccordionItem 
          key="hero" 
          aria-label="Hero Section" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:layout-template" width={18} />
              <span className="font-medium">{language === "en" ? "Hero Section" : "قسم الترحيب"}</span>
            </div>
          }
          classNames={{
            content: "px-0 pt-2"
          }}
        >
          <div className="space-y-3">
            <Input
              label={language === "en" ? "Main Headline" : "العنوان الرئيسي"}
              value={settings.headline}
              onChange={(e) => onChange("headline", e.target.value)}
              variant="bordered"
              className="max-w-full"
            />
            
            <Input
              label={language === "en" ? "Subheadline" : "العنوان الفرعي"}
              value={settings.subheadline}
              onChange={(e) => onChange("subheadline", e.target.value)}
              variant="bordered"
              className="max-w-full"
            />
          </div>
        </AccordionItem>
      
        {/* About Company */}
        <AccordionItem 
          key="about" 
          aria-label="About Company" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:building" width={18} />
              <span className="font-medium">{language === "en" ? "About Company" : "عن الشركة"}</span>
            </div>
          }
          classNames={{
            content: "px-0 pt-2"
          }}
        >
          <div className="space-y-3">
            <Textarea
              label={language === "en" ? "Company Description" : "وصف الشركة"}
              value={settings.aboutCompany}
              onChange={(e) => onChange("aboutCompany", e.target.value)}
              variant="bordered"
              className="max-w-full"
              minRows={3}
            />
          </div>
        </AccordionItem>
        
        {/* Job Listing Content */}
        <AccordionItem 
          key="jobListing" 
          aria-label="Job Listings" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:briefcase" width={18} />
              <span className="font-medium">{language === "en" ? "Job Listings" : "قائمة الوظائف"}</span>
            </div>
          }
          classNames={{
            content: "px-0 pt-2"
          }}
        >
          <div className="space-y-3">
            <div className="flex flex-col gap-2">
              <Checkbox 
                defaultSelected
                size="sm"
              >
                {language === "en" ? "Show department" : "إظهار القسم"}
              </Checkbox>
              
              <Checkbox 
                defaultSelected
                size="sm"
              >
                {language === "en" ? "Show location" : "إظهار الموقع"}
              </Checkbox>
              
              <Checkbox 
                defaultSelected
                size="sm"
              >
                {language === "en" ? "Show job type" : "إظهار نوع الوظيفة"}
              </Checkbox>
              
              <Checkbox 
                defaultSelected
                size="sm"
              >
                {language === "en" ? "Show posting date" : "إظهار تاريخ النشر"}
              </Checkbox>
            </div>
          </div>
        </AccordionItem>
        
        {/* Testimonials Configuration */}
        <AccordionItem 
          key="testimonials" 
          aria-label="Testimonials" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:message-square-quote" width={18} />
              <span className="font-medium">{language === "en" ? "Testimonials" : "الشهادات"}</span>
            </div>
          }
          classNames={{
            content: "px-0 pt-2"
          }}
        >
          <TestimonialsSettings 
            settings={settings.testimonials || []}
            onChange={updateTestimonials}
            language={language}
          />
        </AccordionItem>
        
        {/* Benefits Configuration */}
        <AccordionItem 
          key="benefits" 
          aria-label="Benefits" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:gift" width={18} />
              <span className="font-medium">{language === "en" ? "Benefits" : "المزايا"}</span>
            </div>
          }
          classNames={{
            content: "px-0 pt-2"
          }}
        >
          <BenefitsSettings 
            settings={settings.benefits || []}
            onChange={updateBenefits}
            language={language}
          />
        </AccordionItem>
        
        {/* Footer Content */}
        <AccordionItem 
          key="footer" 
          aria-label="Footer Content" 
          title={
            <div className="flex items-center gap-2">
              <Icon icon="lucide:footer" width={18} />
              <span className="font-medium">{language === "en" ? "Footer Content" : "محتوى التذييل"}</span>
            </div>
          }
          classNames={{
            content: "px-0 pt-2"
          }}
        >
          <div className="space-y-3">
            <Input
              label={language === "en" ? "Footer Text" : "نص التذييل"}
              value={settings.footerText}
              onChange={(e) => onChange("footerText", e.target.value)}
              variant="bordered"
              className="max-w-full"
            />
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};