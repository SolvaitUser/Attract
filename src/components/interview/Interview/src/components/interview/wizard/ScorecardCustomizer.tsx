import React, { useState } from "react";
import { Card, Button, Input, Slider, Checkbox, Divider, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../../context/LanguageContext";
import { motion } from "framer-motion";

interface ScorecardCustomizerProps {
  onSave: (scorecard: ScorecardSection[]) => void;
  defaultSections?: ScorecardSection[];
}

export interface ScorecardSection {
  id: string;
  name: string;
  description?: string;
  criteria: ScorecardCriteria[];
  weight?: number;
}

export interface ScorecardCriteria {
  id: string;
  name: string;
  description?: string;
  scale: number;
  required: boolean;
}

const defaultScorecard: ScorecardSection[] = [
  {
    id: "technical",
    name: "Technical Skills",
    description: "Evaluate the candidate's technical knowledge and skills",
    criteria: [
      {
        id: "tech-1",
        name: "Technical Knowledge",
        description: "Understanding of core technologies and concepts",
        scale: 5,
        required: true
      },
      {
        id: "tech-2",
        name: "Problem-Solving",
        description: "Ability to solve technical problems efficiently",
        scale: 5,
        required: true
      }
    ],
    weight: 40
  },
  {
    id: "communication",
    name: "Communication",
    description: "Assess the candidate's verbal and written communication skills",
    criteria: [
      {
        id: "comm-1",
        name: "Clarity of Expression",
        description: "Ability to express ideas clearly and concisely",
        scale: 5,
        required: true
      },
      {
        id: "comm-2",
        name: "Active Listening",
        description: "Attentiveness and response to questions",
        scale: 5,
        required: true
      }
    ],
    weight: 30
  },
  {
    id: "culture",
    name: "Cultural Fit",
    description: "Evaluate how well the candidate aligns with company values",
    criteria: [
      {
        id: "culture-1",
        name: "Values Alignment",
        description: "Alignment with core company values",
        scale: 5,
        required: true
      },
      {
        id: "culture-2",
        name: "Teamwork",
        description: "Ability to collaborate and work in teams",
        scale: 5,
        required: true
      }
    ],
    weight: 30
  }
];

const ScorecardCustomizer: React.FC<ScorecardCustomizerProps> = ({ 
  onSave,
  defaultSections = defaultScorecard
}) => {
  const { language } = useLanguage();
  const [sections, setSections] = useState<ScorecardSection[]>(defaultSections);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [useDefaultScorecard, setUseDefaultScorecard] = useState(true);
  
  const addNewSection = () => {
    const newSection: ScorecardSection = {
      id: `section-${Date.now()}`,
      name: language === "en" ? "New Section" : "قسم جديد",
      criteria: [
        {
          id: `criteria-${Date.now()}`,
          name: language === "en" ? "New Criteria" : "معيار جديد",
          scale: 5,
          required: true
        }
      ],
      weight: 0
    };
    
    setSections([...sections, newSection]);
    setEditingSection(newSection.id);
  };
  
  const addCriteriaToSection = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          criteria: [...section.criteria, {
            id: `criteria-${Date.now()}`,
            name: language === "en" ? "New Criteria" : "معيار جديد",
            scale: 5,
            required: true
          }]
        };
      }
      return section;
    }));
  };
  
  const updateSection = (sectionId: string, field: string, value: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, [field]: value };
      }
      return section;
    }));
  };
  
  const updateCriteria = (sectionId: string, criteriaId: string, field: string, value: any) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          criteria: section.criteria.map(criteria => {
            if (criteria.id === criteriaId) {
              return { ...criteria, [field]: value };
            }
            return criteria;
          })
        };
      }
      return section;
    }));
  };
  
  const removeSection = (sectionId: string) => {
    setSections(sections.filter(section => section.id !== sectionId));
    if (editingSection === sectionId) {
      setEditingSection(null);
    }
  };
  
  const removeCriteria = (sectionId: string, criteriaId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          criteria: section.criteria.filter(criteria => criteria.id !== criteriaId)
        };
      }
      return section;
    }));
  };
  
  const handleSave = () => {
    // Recalculate weights to ensure they add up to 100
    const totalDefinedWeight = sections.reduce((sum, section) => sum + (section.weight || 0), 0);
    
    let finalSections = [...sections];
    
    if (totalDefinedWeight !== 100) {
      // Normalize weights to add up to 100
      finalSections = sections.map(section => {
        const weight = section.weight || 0;
        return {
          ...section,
          weight: Math.round((weight / totalDefinedWeight) * 100) || Math.round(100 / sections.length)
        };
      });
    }
    
    onSave(finalSections);
  };
  
  const handleUseDefaultToggle = () => {
    if (!useDefaultScorecard) {
      // Switching to default scorecard
      setSections(defaultScorecard);
    }
    setUseDefaultScorecard(!useDefaultScorecard);
  };
  
  return (
    <div className="space-y-4">
      {/* Scorecard Selection */}
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium mb-2">
              {language === "en" ? "Evaluation Scorecard" : "بطاقة تقييم المقابلة"}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {language === "en" 
                ? "Customize how interviewers will evaluate candidates during the interview"
                : "تخصيص كيفية تقييم المقابلين للمرشحين أثناء المقابلة"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              {language === "en" ? "Use default scorecard" : "استخدام بطاقة التقييم الافتراضية"}
            </span>
            <Checkbox 
              isSelected={useDefaultScorecard}
              onValueChange={handleUseDefaultToggle}
              color="primary"
            />
          </div>
        </div>
        
        {useDefaultScorecard ? (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
            <div className="flex items-start gap-3">
              <div className="min-w-[24px] mt-1">
                <Icon icon="lucide:info" className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-700">
                  {language === "en" 
                    ? "You're using the default scorecard template which includes technical skills, communication, and cultural fit evaluation."
                    : "أنت تستخدم قالب بطاقة التقييم الافتراضي الذي يتضمن تقييم المهارات التقنية والتواصل والتناسب الثقافي."}
                </p>
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  className="mt-2"
                  onPress={() => setUseDefaultScorecard(false)}
                  startContent={<Icon icon="lucide:edit-3" size={16} />}
                >
                  {language === "en" ? "Customize Scorecard" : "تخصيص بطاقة التقييم"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Scorecard Sections */}
            <div className="space-y-4 mt-4">
              {sections.map((section) => (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className={`p-4 ${editingSection === section.id ? 'border-blue-500' : ''}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        {editingSection === section.id ? (
                          <div className="space-y-3">
                            <Input
                              label={language === "en" ? "Section Name" : "اسم القسم"}
                              value={section.name}
                              onChange={(e) => updateSection(section.id, "name", e.target.value)}
                              className="max-w-md"
                            />
                            <Input
                              label={language === "en" ? "Description (optional)" : "الوصف (اختياري)"}
                              value={section.description || ""}
                              onChange={(e) => updateSection(section.id, "description", e.target.value)}
                              className="max-w-md"
                            />
                            <div className="space-y-1">
                              <p className="text-sm">
                                {language === "en" ? "Weight (%)" : "الوزن (٪)"}
                              </p>
                              <div className="flex items-center gap-2">
                                <Slider
                                  size="sm"
                                  step={5}
                                  color="primary"
                                  minValue={0}
                                  maxValue={100}
                                  value={section.weight || 0}
                                  onChange={(value) => updateSection(section.id, "weight", value)}
                                  className="max-w-xs"
                                />
                                <span className="text-sm font-medium min-w-[40px]">
                                  {section.weight || 0}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h4 className="font-medium">{section.name}</h4>
                            {section.description && <p className="text-sm text-gray-600">{section.description}</p>}
                            <div className="flex items-center gap-1 mt-1">
                              <Icon icon="lucide:percentage" size={14} className="text-gray-500" />
                              <span className="text-sm text-gray-500">{section.weight || 0}% weight</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-1">
                        {editingSection === section.id ? (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            color="primary"
                            onPress={() => setEditingSection(null)}
                          >
                            <Icon icon="lucide:check" />
                          </Button>
                        ) : (
                          <Button
                            isIconOnly
                            size="sm"
                            variant="flat"
                            onPress={() => setEditingSection(section.id)}
                          >
                            <Icon icon="lucide:edit-3" />
                          </Button>
                        )}
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              isIconOnly
                              size="sm"
                              variant="flat"
                            >
                              <Icon icon="lucide:more-vertical" />
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Section actions">
                            <DropdownItem 
                              key="edit" 
                              startContent={<Icon icon="lucide:edit-3" size={18} />}
                              onPress={() => setEditingSection(section.id)}
                            >
                              {language === "en" ? "Edit Section" : "تحرير القسم"}
                            </DropdownItem>
                            <DropdownItem 
                              key="delete"
                              startContent={<Icon icon="lucide:trash-2" size={18} />}
                              className="text-danger"
                              color="danger"
                              onPress={() => removeSection(section.id)}
                            >
                              {language === "en" ? "Delete Section" : "حذف القسم"}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                    
                    {/* Criteria List */}
                    {section.criteria.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <Divider />
                        <h5 className="text-sm font-medium">
                          {language === "en" ? "Evaluation Criteria" : "معايير التقييم"}
                        </h5>
                        
                        <div className="space-y-3">
                          {section.criteria.map((criteria) => (
                            <div key={criteria.id} className="flex items-start justify-between bg-gray-50 p-3 rounded-md">
                              <div>
                                {editingSection === section.id ? (
                                  <div className="space-y-3">
                                    <Input
                                      size="sm"
                                      label={language === "en" ? "Criteria Name" : "اسم المعيار"}
                                      value={criteria.name}
                                      onChange={(e) => updateCriteria(section.id, criteria.id, "name", e.target.value)}
                                      className="max-w-xs"
                                    />
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm">
                                        {language === "en" ? "Scale:" : "المقياس:"}
                                      </span>
                                      <Dropdown>
                                        <DropdownTrigger>
                                          <Button
                                            size="sm"
                                            variant="flat"
                                            endContent={<Icon icon="lucide:chevron-down" size={16} />}
                                          >
                                            1-{criteria.scale}
                                          </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu 
                                          aria-label="Scale options"
                                          selectedKeys={[criteria.scale.toString()]}
                                          onSelectionChange={(keys) => {
                                            const selected = Array.from(keys)[0];
                                            updateCriteria(section.id, criteria.id, "scale", parseInt(selected as string));
                                          }}
                                          selectionMode="single"
                                        >
                                          <DropdownItem key="3">1-3</DropdownItem>
                                          <DropdownItem key="5">1-5</DropdownItem>
                                          <DropdownItem key="10">1-10</DropdownItem>
                                        </DropdownMenu>
                                      </Dropdown>
                                      <div className="flex items-center gap-1 ml-2">
                                        <Checkbox 
                                          isSelected={criteria.required}
                                          onValueChange={(isSelected) => updateCriteria(section.id, criteria.id, "required", isSelected)}
                                          size="sm"
                                        />
                                        <span className="text-sm">
                                          {language === "en" ? "Required" : "مطلوب"}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <p className={`font-medium ${criteria.required ? '' : 'text-gray-600'}`}>
                                      {criteria.name}
                                      {criteria.required && <span className="text-red-500 ml-1">*</span>}
                                    </p>
                                    <div className="flex items-center gap-1 mt-1">
                                      <Icon icon="lucide:bar-chart-2" size={14} className="text-gray-500" />
                                      <span className="text-xs text-gray-500">
                                        {language === "en" ? "Scale" : "مقياس"}: 1-{criteria.scale}
                                      </span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              {editingSection === section.id && (
                                <Button
                                  isIconOnly
                                  size="sm"
                                  variant="flat"
                                  color="danger"
                                  onPress={() => removeCriteria(section.id, criteria.id)}
                                >
                                  <Icon icon="lucide:trash-2" size={16} />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        {editingSection === section.id && (
                          <div className="mt-2">
                            <Button
                              size="sm"
                              variant="flat"
                              startContent={<Icon icon="lucide:plus" size={16} />}
                              onPress={() => addCriteriaToSection(section.id)}
                            >
                              {language === "en" ? "Add Criteria" : "إضافة معيار"}
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
              
              <Button
                className="w-full"
                variant="flat"
                color="primary"
                startContent={<Icon icon="lucide:plus" />}
                onPress={addNewSection}
              >
                {language === "en" ? "Add New Section" : "إضافة قسم جديد"}
              </Button>
            </div>
            
            {/* Validation for weights */}
            {sections.length > 0 && (
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    {language === "en" ? "Total Weight:" : "الوزن الإجمالي:"}
                  </span>
                  <span className={`font-medium ${
                    sections.reduce((sum, section) => sum + (section.weight || 0), 0) === 100
                      ? 'text-green-600'
                      : 'text-amber-600'
                  }`}>
                    {sections.reduce((sum, section) => sum + (section.weight || 0), 0)}%
                  </span>
                </div>
                {sections.reduce((sum, section) => sum + (section.weight || 0), 0) !== 100 && (
                  <p className="text-xs text-amber-600 mt-1">
                    {language === "en" 
                      ? "Total weight should equal 100%. Weights will be normalized on save."
                      : "يجب أن يساوي الوزن الإجمالي 100٪. سيتم تطبيع الأوزان عند الحفظ."}
                  </p>
                )}
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button
                color="primary"
                onPress={handleSave}
                startContent={<Icon icon="lucide:save" />}
              >
                {language === "en" ? "Save Scorecard" : "حفظ بطاقة التقييم"}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default ScorecardCustomizer;