import React from "react";
import { Button, Card, Input, Textarea, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../data/translations";
import { motion, AnimatePresence } from "framer-motion";

interface Benefit {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface BenefitsSettingsProps {
  settings: Benefit[];
  onChange: (benefits: Benefit[]) => void;
  onLayoutChange?: (layout: string) => void; // Make this optional
  layout?: string; // Make this optional
  language: LanguageKey;
}

const iconOptions = [
  { value: "lucide:heart-pulse", label: "Health" },
  { value: "lucide:calendar", label: "Calendar" },
  { value: "lucide:home", label: "Home" },
  { value: "lucide:trending-up", label: "Growth" },
  { value: "lucide:dollar-sign", label: "Money" },
  { value: "lucide:coffee", label: "Coffee" },
  { value: "lucide:laptop", label: "Laptop" },
  { value: "lucide:globe", label: "Global" },
  { value: "lucide:smile", label: "Smile" },
  { value: "lucide:shield", label: "Shield" },
  { value: "lucide:book", label: "Education" },
  { value: "lucide:clock", label: "Hours" },
];

export const BenefitsSettings: React.FC<BenefitsSettingsProps> = ({ 
  settings,
  layout = "grid", // Default value
  onChange,
  onLayoutChange = () => {}, // Default empty function
  language 
}) => {
  const [editingBenefit, setEditingBenefit] = React.useState<Benefit | null>(null);
  const [iconPickerOpen, setIconPickerOpen] = React.useState<boolean>(false);
  
  const handleAddBenefit = () => {
    const newBenefit: Benefit = {
      id: Date.now().toString(),
      icon: "lucide:gift",
      title: language === "en" ? "New Benefit" : "ميزة جديدة",
      description: language === "en" ? "Description of this benefit" : "وصف هذه الميزة"
    };
    
    setEditingBenefit(newBenefit);
  };
  
  const handleEditBenefit = (benefit: Benefit) => {
    setEditingBenefit({...benefit});
  };
  
  const handleSaveBenefit = () => {
    if (!editingBenefit) return;
    
    const isExisting = settings.some(b => b.id === editingBenefit.id);
    let updatedBenefits;
    
    if (isExisting) {
      updatedBenefits = settings.map(b => 
        b.id === editingBenefit.id ? editingBenefit : b
      );
    } else {
      updatedBenefits = [...settings, editingBenefit];
    }
    
    onChange(updatedBenefits);
    setEditingBenefit(null);
    setIconPickerOpen(false);
  };
  
  const handleDeleteBenefit = (id: string) => {
    const updatedBenefits = settings.filter(b => b.id !== id);
    onChange(updatedBenefits);
    
    if (editingBenefit?.id === id) {
      setEditingBenefit(null);
    }
  };
  
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updatedBenefits = [...settings];
    [updatedBenefits[index - 1], updatedBenefits[index]] = [updatedBenefits[index], updatedBenefits[index - 1]];
    onChange(updatedBenefits);
  };
  
  const handleMoveDown = (index: number) => {
    if (index === settings.length - 1) return;
    const updatedBenefits = [...settings];
    [updatedBenefits[index], updatedBenefits[index + 1]] = [updatedBenefits[index + 1], updatedBenefits[index]];
    onChange(updatedBenefits);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">
          {language === "en" ? "Why Join Us? Benefits" : "لماذا تنضم إلينا؟ المزايا"}
        </h3>
        <Button 
          color="primary" 
          size="sm"
          onPress={handleAddBenefit}
          isDisabled={!!editingBenefit}
          startContent={<Icon icon="lucide:plus" width={16} />}
        >
          {language === "en" ? "Add Benefit" : "إضافة ميزة"}
        </Button>
      </div>
      
      <div className="space-y-4">
        {settings.map((benefit, index) => (
          <Card key={benefit.id} className="p-3 bg-content1">
            <div className="flex gap-3">
              <div 
                className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: `rgba(0, 102, 255, 0.1)` }}
              >
                <Icon icon={benefit.icon} width={20} className="text-wise-blue" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">{benefit.title}</h4>
                <p className="text-xs text-default-500 mt-0.5">{benefit.description}</p>
              </div>
              <div className="flex items-center gap-1">
                {index !== 0 && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleMoveUp(index)}
                  >
                    <Icon icon="lucide:chevron-up" width={16} />
                  </Button>
                )}
                
                {index !== settings.length - 1 && (
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleMoveDown(index)}
                  >
                    <Icon icon="lucide:chevron-down" width={16} />
                  </Button>
                )}
                
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => handleEditBenefit(benefit)}
                >
                  <Icon icon="lucide:edit-2" width={16} />
                </Button>
                
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  color="danger"
                  onPress={() => handleDeleteBenefit(benefit.id)}
                >
                  <Icon icon="lucide:trash" width={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
        
        {settings.length === 0 && !editingBenefit && (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <Icon icon="lucide:gift" width={32} className="mx-auto mb-2 text-default-300" />
            <p className="text-default-500">
              {language === "en" 
                ? "No benefits added yet. Add benefits to showcase what makes your company special."
                : "لم يتم إضافة مزايا بعد. أضف مزايا لإظهار ما يجعل شركتك مميزة."
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Edit Mode */}
      <AnimatePresence>
        {editingBenefit && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border rounded-lg p-4 bg-default-50 mt-4"
          >
            <h4 className="text-sm font-medium mb-4">
              {language === "en" ? "Edit Benefit" : "تعديل الميزة"}
            </h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  {language === "en" ? "Icon" : "الأيقونة"}
                </label>
                <div className="flex gap-2">
                  <div 
                    className="w-10 h-10 rounded-lg border flex items-center justify-center cursor-pointer"
                    onClick={() => setIconPickerOpen(!iconPickerOpen)}
                  >
                    <Icon icon={editingBenefit.icon} width={20} />
                  </div>
                  <div className="flex-1">
                    <Button 
                      size="sm" 
                      variant="flat"
                      fullWidth
                      onPress={() => setIconPickerOpen(!iconPickerOpen)}
                    >
                      {language === "en" ? "Select Icon" : "اختر أيقونة"}
                    </Button>
                    
                    {iconPickerOpen && (
                      <Card className="mt-2 p-2">
                        <div className="grid grid-cols-6 gap-2">
                          {iconOptions.map(icon => (
                            <div 
                              key={icon.value}
                              className={`w-8 h-8 rounded-md flex items-center justify-center cursor-pointer ${
                                editingBenefit.icon === icon.value ? 'bg-primary-100' : 'hover:bg-default-100'
                              }`}
                              onClick={() => {
                                setEditingBenefit({...editingBenefit, icon: icon.value});
                              }}
                            >
                              <Icon icon={icon.value} width={20} />
                            </div>
                          ))}
                        </div>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
              
              <Input 
                label={language === "en" ? "Title" : "العنوان"}
                value={editingBenefit.title}
                onChange={(e) => setEditingBenefit({...editingBenefit, title: e.target.value})}
                variant="bordered"
                className="max-w-full"
              />
              
              <Textarea
                label={language === "en" ? "Description" : "الوصف"}
                value={editingBenefit.description}
                onChange={(e) => setEditingBenefit({...editingBenefit, description: e.target.value})}
                variant="bordered"
                className="max-w-full"
                minRows={2}
              />
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="flat" 
                  onPress={() => {
                    setEditingBenefit(null);
                    setIconPickerOpen(false);
                  }}
                >
                  {language === "en" ? "Cancel" : "إلغاء"}
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSaveBenefit}
                >
                  {language === "en" ? "Save" : "حفظ"}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Divider />
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium">
          {language === "en" ? "Display Settings" : "إعدادات العرض"}
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-0 border-2 cursor-pointer" 
            style={{ borderColor: layout === "grid" ? "#0066ff" : "transparent" }}
            onPress={() => onLayoutChange("grid")}
          >
            <div className="p-3 text-center">
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="rounded bg-default-100 h-10"></div>
                <div className="rounded bg-default-100 h-10"></div>
                <div className="rounded bg-default-100 h-10"></div>
                <div className="rounded bg-default-100 h-10"></div>
              </div>
              <p className="text-xs">{language === "en" ? "Grid Layout" : "تخطيط شبكي"}</p>
            </div>
          </Card>
          
          <Card 
            className="p-0 border-2 cursor-pointer" 
            style={{ borderColor: layout === "list" ? "#0066ff" : "transparent" }}
            onPress={() => onLayoutChange("list")}
          >
            <div className="p-3 text-center">
              <div className="space-y-2 mb-2">
                <div className="rounded bg-default-100 h-8"></div>
                <div className="rounded bg-default-100 h-8"></div>
                <div className="rounded bg-default-100 h-8"></div>
              </div>
              <p className="text-xs">{language === "en" ? "List Layout" : "تخطيط قائمة"}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};