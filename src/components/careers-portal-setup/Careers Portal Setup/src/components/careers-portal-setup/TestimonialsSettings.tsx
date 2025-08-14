import React from "react";
import { Button, Card, Input, Textarea, Avatar, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../data/translations";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
}

interface TestimonialsSettingsProps {
  settings: Testimonial[];
  onChange: (testimonials: Testimonial[]) => void;
  onStyleChange?: (style: string) => void; // Make this optional
  testimonialStyle?: string; // Make this optional
  language: LanguageKey;
}

export const TestimonialsSettings: React.FC<TestimonialsSettingsProps> = ({ 
  settings,
  testimonialStyle = "card", // Default value 
  onChange,
  onStyleChange = () => {}, // Default empty function
  language 
}) => {
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);
  const [avatarPreview, setAvatarPreview] = React.useState<string | null>(null);
  
  const handleAddTestimonial = () => {
    const newId = Date.now().toString();
    const newTestimonial: Testimonial = {
      id: newId,
      name: language === "en" ? "New Employee" : "موظف جديد",
      role: language === "en" ? "Job Title" : "المسمى الوظيفي",
      avatar: `https://img.heroui.chat/image/avatar?w=200&h=200&u=${newId}`,
      quote: language === "en" 
        ? "Share your experience working at our company."
        : "شارك تجربتك في العمل في شركتنا."
    };
    
    setEditingTestimonial(newTestimonial);
  };
  
  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial({...testimonial});
    setAvatarPreview(testimonial.avatar);
  };
  
  const handleSaveTestimonial = () => {
    if (!editingTestimonial) return;
    
    const isExisting = settings.some(t => t.id === editingTestimonial.id);
    let updatedTestimonials;
    
    if (isExisting) {
      updatedTestimonials = settings.map(t => 
        t.id === editingTestimonial.id ? editingTestimonial : t
      );
    } else {
      updatedTestimonials = [...settings, editingTestimonial];
    }
    
    onChange(updatedTestimonials);
    setEditingTestimonial(null);
    setAvatarPreview(null);
  };
  
  const handleDeleteTestimonial = (id: string) => {
    const updatedTestimonials = settings.filter(t => t.id !== id);
    onChange(updatedTestimonials);
    
    if (editingTestimonial?.id === id) {
      setEditingTestimonial(null);
      setAvatarPreview(null);
    }
  };
  
  const handleChangeAvatar = () => {
    if (!editingTestimonial) return;
    
    // Generate a new unique identifier for the avatar
    const uniqueId = Date.now();
    const newAvatarUrl = `https://img.heroui.chat/image/avatar?w=200&h=200&u=${uniqueId}`;
    
    setEditingTestimonial({...editingTestimonial, avatar: newAvatarUrl});
    setAvatarPreview(newAvatarUrl);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium">
          {language === "en" ? "What Our Team Says" : "ماذا يقول فريقنا"}
        </h3>
        <Button 
          color="primary" 
          size="sm"
          onPress={handleAddTestimonial}
          isDisabled={!!editingTestimonial}
          startContent={<Icon icon="lucide:plus" width={16} />}
        >
          {language === "en" ? "Add Testimonial" : "إضافة شهادة"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {settings.map((testimonial) => (
          <Card key={testimonial.id} className="bg-content1">
            <div className="p-4">
              <div className="flex gap-3">
                <Avatar src={testimonial.avatar} size="lg" className="flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-default-500">{testimonial.role}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        onPress={() => handleEditTestimonial(testimonial)}
                      >
                        <Icon icon="lucide:edit-2" width={16} />
                      </Button>
                      
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        color="danger"
                        onPress={() => handleDeleteTestimonial(testimonial.id)}
                      >
                        <Icon icon="lucide:trash" width={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm italic">"{testimonial.quote}"</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
        
        {settings.length === 0 && !editingTestimonial && (
          <div className="text-center py-8 border border-dashed rounded-lg">
            <Icon icon="lucide:message-square-quote" width={32} className="mx-auto mb-2 text-default-300" />
            <p className="text-default-500">
              {language === "en" 
                ? "No testimonials added yet. Add testimonials from your team members to build trust."
                : "لم تتم إضافة شهادات بعد. أضف شهادات من أعضاء فريقك لبناء الثقة."
              }
            </p>
          </div>
        )}
      </div>
      
      {/* Edit Mode */}
      <AnimatePresence>
        {editingTestimonial && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="border rounded-lg p-4 bg-default-50 mt-4"
          >
            <h4 className="text-sm font-medium mb-4">
              {language === "en" ? "Edit Testimonial" : "تعديل الشهادة"}
            </h4>
            
            <div className="space-y-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar src={editingTestimonial.avatar} size="xl" />
                <Button 
                  size="sm" 
                  variant="flat"
                  onPress={handleChangeAvatar}
                  startContent={<Icon icon="lucide:refresh-cw" width={16} />}
                >
                  {language === "en" ? "Change Avatar" : "تغيير الصورة"}
                </Button>
              </div>
              
              <Input 
                label={language === "en" ? "Name" : "الاسم"}
                value={editingTestimonial.name}
                onChange={(e) => setEditingTestimonial({...editingTestimonial, name: e.target.value})}
                variant="bordered"
                className="max-w-full"
              />
              
              <Input 
                label={language === "en" ? "Role / Job Title" : "الدور / المسمى الوظيفي"}
                value={editingTestimonial.role}
                onChange={(e) => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                variant="bordered"
                className="max-w-full"
              />
              
              <Textarea
                label={language === "en" ? "Testimonial Quote" : "نص الشهادة"}
                value={editingTestimonial.quote}
                onChange={(e) => setEditingTestimonial({...editingTestimonial, quote: e.target.value})}
                variant="bordered"
                className="max-w-full"
                minRows={3}
              />
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="flat" 
                  onPress={() => {
                    setEditingTestimonial(null);
                    setAvatarPreview(null);
                  }}
                >
                  {language === "en" ? "Cancel" : "إلغاء"}
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSaveTestimonial}
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
          {language === "en" ? "Testimonials Design" : "تصميم الشهادات"}
        </h4>
        
        <div className="grid grid-cols-2 gap-4">
          <Card 
            className="p-0 border-2 cursor-pointer" 
            style={{ borderColor: testimonialStyle === "card" ? "#0066ff" : "transparent" }}
            onPress={() => onStyleChange("card")}
          >
            <div className="p-3 text-center">
              <div className="border-t-4 mb-2 rounded-sm" style={{ borderColor: "#0066ff" }}>
                <div className="bg-default-100 p-3 rounded-b flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-default-200 me-2"></div>
                  <div className="h-6 bg-default-200 flex-1"></div>
                </div>
              </div>
              <p className="text-xs">{language === "en" ? "Card Style" : "نمط البطاقة"}</p>
            </div>
          </Card>
          
          <Card 
            className="p-0 border-2 cursor-pointer" 
            style={{ borderColor: testimonialStyle === "quote" ? "#0066ff" : "transparent" }}
            onPress={() => onStyleChange("quote")}
          >
            <div className="p-3 text-center">
              <div className="rounded mb-2 p-1 border">
                <div className="flex items-start gap-2">
                  <div className="w-6 h-6 rounded-full bg-default-200 mt-1"></div>
                  <div className="flex-1 h-12 bg-default-100"></div>
                </div>
              </div>
              <p className="text-xs">{language === "en" ? "Quote Style" : "نمط الاقتباس"}</p>
            </div>
          </Card>
        </div>
        
        <div className="mt-4">
          <Button 
            fullWidth 
            color="secondary"
            startContent={<Icon icon="lucide:sliders" width={18} />}
          >
            {language === "en" ? "Advanced Design Settings" : "إعدادات التصميم المتقدمة"}
          </Button>
        </div>
      </div>
    </div>
  );
};