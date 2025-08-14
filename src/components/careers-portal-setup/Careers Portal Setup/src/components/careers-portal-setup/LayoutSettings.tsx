import React from "react";
import { RadioGroup, Radio, Card, CardBody, Switch, Divider, Badge, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { LanguageKey } from "../../data/translations";

interface LayoutSettingsProps {
  settings: {
    theme: string;
    showFilters: boolean;
    cardsDisplay: string;
    showTestimonials: boolean;
    heroStyle: string;
    videoUrl?: string;
    videoSource?: 'upload' | 'predefined';
    selectedVideoId?: string;
  };
  onChange: (key: string, value: any) => void;
  language: LanguageKey;
}

export const LayoutSettings: React.FC<LayoutSettingsProps> = ({ settings, onChange, language }) => {
  // Add state for hover effects
  const [hoveredTheme, setHoveredTheme] = React.useState<string | null>(null);
  const [hoveredHeroStyle, setHoveredHeroStyle] = React.useState<string | null>(null);
  
  // Add these new state variables
  const [videoModalOpen, setVideoModalOpen] = React.useState(false);
  const [selectedVideoSource, setSelectedVideoSource] = React.useState<'upload' | 'predefined'>(
    settings.videoSource || 'predefined'
  );
  const [selectedPredefinedVideo, setSelectedPredefinedVideo] = React.useState<string>(
    settings.selectedVideoId || 'recruiting1'
  );
  
  // Sample recruitment video options
  const recruitmentVideos = [
    {
      id: 'recruiting1',
      thumbnail: 'https://img.heroui.chat/image/business?w=320&h=180&u=101',
      title: language === 'en' ? 'Team Collaboration' : 'تعاون الفريق',
      duration: '0:45'
    },
    {
      id: 'recruiting2',
      thumbnail: 'https://img.heroui.chat/image/business?w=320&h=180&u=102',
      title: language === 'en' ? 'Office Culture' : 'ثقافة المكتب',
      duration: '1:20'
    },
    {
      id: 'recruiting3',
      thumbnail: 'https://img.heroui.chat/image/business?w=320&h=180&u=103',
      title: language === 'en' ? 'Employee Stories' : 'قصص الموظفين',
      duration: '2:15'
    },
    {
      id: 'recruiting4',
      thumbnail: 'https://img.heroui.chat/image/business?w=320&h=180&u=104',
      title: language === 'en' ? 'Company Mission' : 'مهمة الشركة',
      duration: '1:05'
    }
  ];

  const handleVideoSourceChange = (source: 'upload' | 'predefined') => {
    setSelectedVideoSource(source);
    onChange("videoSource", source);
  };
  
  const handleSelectVideo = (videoId: string) => {
    setSelectedPredefinedVideo(videoId);
    onChange("selectedVideoId", videoId);
  };

  const handleCloseVideoModal = () => {
    setVideoModalOpen(false);
  };
  
  const handleOpenVideoModal = () => {
    setVideoModalOpen(true);
  };
  
  const handleSaveVideoSettings = () => {
    setVideoModalOpen(false);
  };
  
  // Here's where you'll add the video selection dialog:
  const renderVideoSettings = () => {
    if (settings.heroStyle !== "video") return null;
    
    return (
      <div className="mt-4 p-4 border rounded-lg bg-default-50">
        <div className="flex justify-between items-center mb-3">
          <h5 className="text-sm font-medium">
            {language === "en" ? "Video Background Settings" : "إعدادات خلفية الفيديو"}
          </h5>
          <Button 
            size="sm" 
            color="primary" 
            variant="flat"
            onPress={handleOpenVideoModal}
            startContent={<Icon icon="lucide:settings" width={16} />}
          >
            {language === "en" ? "Configure Video" : "تكوين الفيديو"}
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Icon icon="lucide:video" width={18} className="text-primary" />
          <span className="text-sm text-default-600">
            {selectedVideoSource === 'upload' 
              ? (language === "en" ? "Custom uploaded video" : "فيديو مخصص تم تحميله")
              : (language === "en" ? "Selected video: " : "الفيديو المحدد: ") + 
                recruitmentVideos.find(v => v.id === selectedPredefinedVideo)?.title
            }
          </span>
        </div>
        
        {videoModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {language === "en" ? "Video Settings" : "إعدادات الفيديو"}
                </h3>
                <Button 
                  isIconOnly 
                  variant="light" 
                  onPress={handleCloseVideoModal}
                >
                  <Icon icon="lucide:x" width={20} />
                </Button>
              </div>
              
              <div className="mb-4">
                <div className="flex gap-2 mb-4">
                  <Button
                    variant={selectedVideoSource === "predefined" ? "solid" : "bordered"}
                    color={selectedVideoSource === "predefined" ? "primary" : "default"}
                    onPress={() => handleVideoSourceChange("predefined")}
                    className="flex-1"
                  >
                    {language === "en" ? "Select a video" : "اختر فيديو"}
                  </Button>
                  <Button
                    variant={selectedVideoSource === "upload" ? "solid" : "bordered"}
                    color={selectedVideoSource === "upload" ? "primary" : "default"}
                    onPress={() => handleVideoSourceChange("upload")}
                    className="flex-1"
                  >
                    {language === "en" ? "Upload a video" : "تحميل فيديو"}
                  </Button>
                </div>
                
                {selectedVideoSource === "predefined" ? (
                  <div>
                    <p className="text-sm text-default-600 mb-3">
                      {language === "en" 
                        ? "Select a recruitment-themed video for your hero section:" 
                        : "اختر فيديو بموضوع التوظيف لقسم البطل الخاص بك:"}
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {recruitmentVideos.map(video => (
                        <div 
                          key={video.id}
                          className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                            selectedPredefinedVideo === video.id 
                              ? 'border-primary ring-2 ring-primary-100' 
                              : 'hover:border-primary-100'
                          }`}
                          onClick={() => handleSelectVideo(video.id)}
                        >
                          <div className="relative">
                            <img 
                              src={video.thumbnail} 
                              alt={video.title}
                              className="w-full h-[120px] object-cover" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                              <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                                <Icon icon="lucide:play" className="text-white" width={20} />
                              </div>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                              {video.duration}
                            </div>
                          </div>
                          <div className="p-2">
                            <p className="text-sm font-medium truncate">{video.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Icon icon="lucide:upload-cloud" className="text-default-400 mx-auto mb-2" width={32} />
                    <p className="text-sm text-default-600 mb-2">
                      {language === "en" 
                        ? "Drag and drop a video file here or click to browse"
                        : "اسحب وأفلت ملف فيديو هنا أو انقر للتصفح"}
                    </p>
                    <p className="text-xs text-default-500 mb-4">
                      {language === "en" 
                        ? "MP4, WEBM or OGG. Max size 50MB."
                        : "MP4 أو WEBM أو OGG. الحجم الأقصى 50 ميغابايت."}
                    </p>
                    <Button 
                      variant="flat" 
                      color="primary"
                      startContent={<Icon icon="lucide:upload" width={16} />}
                    >
                      {language === "en" ? "Select Video" : "اختر فيديو"}
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-4 border-t flex justify-end gap-2">
                <Button 
                  variant="flat" 
                  onPress={handleCloseVideoModal}
                >
                  {language === "en" ? "Cancel" : "إلغاء"}
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSaveVideoSettings}
                >
                  {language === "en" ? "Apply" : "تطبيق"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div className="space-y-3">
        {/* Theme Selection */}
        <div className="space-y-3">
          <h3 className="text-base font-medium">{language === "en" ? "Portal Theme" : "مظهر البوابة"}</h3>
          <p className="text-sm text-default-500">
            {language === "en" 
              ? "Choose the overall look and feel of your careers portal" 
              : "اختر المظهر والأسلوب العام لبوابة الوظائف الخاصة بك"}
          </p>
          
          <RadioGroup
            value={settings.theme}
            onValueChange={(value) => onChange("theme", value)}
            orientation="horizontal"
            className="gap-4 flex-wrap"
          >
            {/* Modern Theme */}
            <Radio value="modern" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[150px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.theme === "modern" ? "#0066ff" : "transparent",
                  transform: hoveredTheme === "modern" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredTheme("modern")}
                onMouseLeave={() => setHoveredTheme(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"></div>
                    <div className="absolute top-0 left-0 right-0 h-12 bg-white border-b flex items-center px-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                      <div className="w-20 h-2 bg-gray-200 rounded"></div>
                      <div className="ml-auto w-4 h-4 rounded-full bg-blue-100"></div>
                    </div>
                    <div className="absolute top-14 left-2 right-2 h-4 bg-white rounded"></div>
                    <div className="absolute top-20 left-2 right-2 grid grid-cols-2 gap-1">
                      <div className="h-3 bg-white rounded"></div>
                      <div className="h-3 bg-white rounded"></div>
                      <div className="h-3 bg-white rounded"></div>
                      <div className="h-3 bg-white rounded"></div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Modern" : "عصري"}</div>
                    <div className="text-[10px] text-default-400">{language === "en" ? "Clean & Minimal" : "نظيف وبسيط"}</div>
                  </div>
                  {settings.theme === "modern" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
            
            {/* Classic Theme */}
            <Radio value="classic" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[150px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.theme === "classic" ? "#0066ff" : "transparent",
                  transform: hoveredTheme === "classic" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredTheme("classic")}
                onMouseLeave={() => setHoveredTheme(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"></div>
                    <div className="absolute top-0 left-0 right-0 h-12 bg-white shadow-sm flex items-center px-2">
                      <div className="w-6 h-6 rounded bg-gray-200"></div>
                      <div className="ml-2 flex space-x-2">
                        <div className="w-8 h-2 bg-gray-200 rounded"></div>
                        <div className="w-8 h-2 bg-gray-200 rounded"></div>
                        <div className="w-8 h-2 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="absolute top-14 left-2 right-2 flex">
                      <div className="w-1/4 h-8 bg-white border rounded mr-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-gray-300 rounded"></div>
                      </div>
                      <div className="w-3/4 h-8 bg-white border rounded"></div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Classic" : "كلاسيكي"}</div>
                    <div className="text-[10px] text-default-400">{language === "en" ? "Traditional & Familiar" : "تقليدي ومألوف"}</div>
                  </div>
                  {settings.theme === "classic" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
            
            {/* Minimal Theme */}
            <Radio value="minimal" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[150px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.theme === "minimal" ? "#0066ff" : "transparent",
                  transform: hoveredTheme === "minimal" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredTheme("minimal")}
                onMouseLeave={() => setHoveredTheme(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-24 relative">
                    <div className="absolute inset-0 bg-white"></div>
                    <div className="absolute top-4 left-0 w-1 h-16 bg-slate-200"></div>
                    <div className="absolute top-4 left-4 right-4">
                      <div className="w-3/4 h-3 bg-slate-100 rounded mb-6"></div>
                      <div className="flex flex-wrap gap-1">
                        <div className="h-2 w-8 bg-slate-100 rounded"></div>
                        <div className="h-2 w-12 bg-slate-100 rounded"></div>
                        <div className="h-2 w-6 bg-slate-100 rounded"></div>
                        <div className="h-2 w-10 bg-slate-100 rounded"></div>
                      </div>
                      <div className="mt-4 h-3 w-3/5 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Minimal" : "بسيط"}</div>
                    <div className="text-[10px] text-default-400">{language === "en" ? "Simple & Elegant" : "بسيط وأنيق"}</div>
                  </div>
                  {settings.theme === "minimal" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
            
            {/* Bold Theme */}
            <Radio value="bold" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[150px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.theme === "bold" ? "#0066ff" : "transparent",
                  transform: hoveredTheme === "bold" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredTheme("bold")}
                onMouseLeave={() => setHoveredTheme(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-24 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600"></div>
                    <div className="absolute top-3 left-0 right-0 flex flex-col items-center">
                      <div className="w-20 h-4 bg-white rounded-full mb-2"></div>
                      <div className="w-16 h-2 bg-white bg-opacity-70 rounded-full mb-4"></div>
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Bold" : "جريء"}</div>
                    <div className="text-[10px] text-default-400">{language === "en" ? "Striking & Impactful" : "ملفت وجذاب"}</div>
                  </div>
                  {settings.theme === "bold" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
          </RadioGroup>
          
          {/* Theme description */}
          <div className="mt-2 p-3 bg-default-50 rounded-lg text-sm">
            <div className="flex items-start">
              <Icon icon="lucide:info" className="text-primary mr-2 mt-0.5" width={16} />
              <p className="text-default-600">
                {settings.theme === "modern" && (language === "en" 
                  ? "Modern theme features clean layouts, subtle gradients, and focused content for a contemporary feel."
                  : "يتميز النمط العصري بتخطيطات نظيفة وتدرجات لونية خفيفة ومحتوى مركز لمظهر معاصر."
                )}
                {settings.theme === "classic" && (language === "en"
                  ? "Classic theme offers traditional navigation, clear sections, and a familiar structure users recognize immediately."
                  : "يوفر النمط الكلاسيكي تنقلًا تقليديًا وأقسامًا واضحة وهيكلًا مألوفًا يتعرف عليه المستخدمون على الفور."
                )}
                {settings.theme === "minimal" && (language === "en"
                  ? "Minimal theme focuses on typography and whitespace with an elegant, distraction-free experience."
                  : "يركز النمط البسيط على الطباعة والمساحات البيضاء مع تجربة أنيقة خالية من التشتت."
                )}
                {settings.theme === "bold" && (language === "en"
                  ? "Bold theme uses strong colors, large elements, and dynamic layouts to create a memorable impression."
                  : "يستخدم النمط الجريء ألوانًا قوية وعناصر كبيرة وتخطيطات ديناميكية لخلق انطباع لا يُنسى."
                )}
              </p>
            </div>
          </div>
        </div>
        
        <Divider />
        
        {/* Hero Style */}
        <div className="space-y-3">
          <h3 className="text-base font-medium">{language === "en" ? "Hero Style" : "نمط البانر الرئيسي"}</h3>
          <p className="text-sm text-default-500">
            {language === "en" 
              ? "Define how the main banner of your careers portal will look" 
              : "حدد كيف سيبدو البانر الرئيسي لبوابة الوظائف الخاصة بك"}
          </p>
          
          <RadioGroup
            value={settings.heroStyle}
            onValueChange={(value) => onChange("heroStyle", value)}
            orientation="horizontal"
            className="gap-4 flex-wrap"
          >
            {/* Full Width Hero */}
            <Radio value="fullwidth" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[220px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.heroStyle === "fullwidth" ? "#0066ff" : "transparent",
                  transform: hoveredHeroStyle === "fullwidth" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredHeroStyle("fullwidth")}
                onMouseLeave={() => setHoveredHeroStyle(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-36 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    
                    {/* Hero Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
                      <div className="w-24 h-3 bg-white rounded-full mb-1.5"></div>
                      <div className="w-32 h-2 bg-white bg-opacity-70 rounded-full mb-3"></div>
                      <div className="w-20 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-12 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Full Width" : "عرض كامل"}</div>
                    <div className="text-[10px] text-default-400 mt-0.5">
                      {language === "en" ? "Edge-to-edge banner with centered content" : "بانر من حافة إلى حافة مع محتوى مركزي"}
                    </div>
                  </div>
                  {settings.heroStyle === "fullwidth" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
            
            {/* Contained Hero */}
            <Radio value="contained" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[220px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.heroStyle === "contained" ? "#0066ff" : "transparent",
                  transform: hoveredHeroStyle === "contained" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredHeroStyle("contained")}
                onMouseLeave={() => setHoveredHeroStyle(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-36 relative bg-gray-50">
                    {/* Container */}
                    <div className="absolute top-4 left-6 right-6 bottom-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg overflow-hidden">
                      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      
                      {/* Hero Content */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-white">
                        <div className="w-16 h-2 bg-white rounded-full mb-1"></div>
                        <div className="w-24 h-1.5 bg-white bg-opacity-70 rounded-full mb-2"></div>
                        <div className="w-16 h-5 bg-white rounded-full flex items-center justify-center">
                          <div className="w-10 h-1 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Contained" : "محتوى"}</div>
                    <div className="text-[10px] text-default-400 mt-0.5">
                      {language === "en" ? "Centered container with margins" : "حاوية مركزية مع هوامش"}
                    </div>
                  </div>
                  {settings.heroStyle === "contained" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
            
            {/* Split Hero */}
            <Radio value="split" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[220px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.heroStyle === "split" ? "#0066ff" : "transparent",
                  transform: hoveredHeroStyle === "split" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredHeroStyle("split")}
                onMouseLeave={() => setHoveredHeroStyle(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-36 relative">
                    <div className="absolute inset-0 flex">
                      {/* Left Content */}
                      <div className="w-1/2 relative bg-gradient-to-br from-blue-400 to-blue-600">
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-white">
                          <div className="w-12 h-2 bg-white rounded-full mb-1"></div>
                          <div className="w-16 h-1.5 bg-white bg-opacity-70 rounded-full mb-2"></div>
                          <div className="w-12 h-4 bg-white rounded-full flex items-center justify-center">
                            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Right Form */}
                      <div className="w-1/2 bg-white p-2">
                        <div className="mb-1 w-full h-2 bg-gray-100 rounded"></div>
                        <div className="mb-1 w-full h-4 bg-gray-100 rounded"></div>
                        <div className="mb-1 w-full h-4 bg-gray-100 rounded"></div>
                        <div className="w-full h-5 rounded" style={{ backgroundColor: "#0066ff" }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Split" : "مقسم"}</div>
                    <div className="text-[10px] text-default-400 mt-0.5">
                      {language === "en" ? "Content on left, form on right" : "المحتوى على اليسار، النموذج على اليمين"}
                    </div>
                  </div>
                  {settings.heroStyle === "split" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
            
            {/* Animated Text Hero */}
            <Radio value="animated" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[220px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.heroStyle === "animated" ? "#0066ff" : "transparent",
                  transform: hoveredHeroStyle === "animated" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredHeroStyle("animated")}
                onMouseLeave={() => setHoveredHeroStyle(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-36 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center px-4">
                      <div className="w-32 h-8 relative overflow-hidden mb-2">
                        <div className="absolute inset-0 flex flex-col items-center">
                          <div className="w-24 h-2.5 bg-white rounded-full mb-1 animate-pulse"></div>
                          <div className="w-20 h-2 bg-white bg-opacity-70 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="w-16 h-5 bg-white rounded-sm flex items-center justify-center">
                          <div className="w-10 h-1 bg-indigo-500 rounded-full"></div>
                        </div>
                        <div className="w-16 h-5 border border-white rounded-sm flex items-center justify-center">
                          <div className="w-10 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Animated" : "متحرك"}</div>
                    <div className="text-[10px] text-default-400 mt-0.5">
                      {language === "en" ? "Dynamic text with animations" : "نص متحرك مع رسوم متحركة"}
                    </div>
                  </div>
                  {settings.heroStyle === "animated" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
            
            {/* Video Background Hero */}
            <Radio value="video" className="p-0 m-0 block">
              <Card 
                className="p-0 w-[220px] border-2 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg"
                style={{ 
                  borderColor: settings.heroStyle === "video" ? "#0066ff" : "transparent",
                  transform: hoveredHeroStyle === "video" ? "translateY(-4px)" : "none"
                }}
                onMouseEnter={() => setHoveredHeroStyle("video")}
                onMouseLeave={() => setHoveredHeroStyle(null)}
              >
                <CardBody className="p-0 overflow-hidden">
                  <div className="h-36 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <Icon icon="lucide:play" width={20} className="text-white opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                      <div className="w-24 h-2.5 bg-white rounded-full mb-1.5"></div>
                      <div className="w-32 h-2 bg-white bg-opacity-70 rounded-full mb-3"></div>
                      <div className="w-20 h-6 bg-white bg-opacity-20 backdrop-blur-sm rounded-full border border-white border-opacity-30 flex items-center justify-center">
                        <div className="w-12 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 text-center border-t">
                    <div className="text-xs font-medium">{language === "en" ? "Video" : "فيديو"}</div>
                    <div className="text-[10px] text-default-400 mt-0.5">
                      {language === "en" ? "Immersive video background" : "خلفية فيديو شاملة"}
                    </div>
                  </div>
                  {settings.heroStyle === "video" && (
                    <Badge 
                      content="Selected" 
                      color="primary"
                      placement="top-right"
                      className="mr-1 mt-1"
                    />
                  )}
                </CardBody>
              </Card>
            </Radio>
          </RadioGroup>
          
          {/* Hero style description */}
          <div className="mt-2 p-3 bg-default-50 rounded-lg text-sm">
            <div className="flex items-start">
              <Icon icon="lucide:info" className="text-primary mr-2 mt-0.5" width={16} />
              <p className="text-default-600">
                {settings.heroStyle === "fullwidth" && (language === "en" 
                  ? "Full width hero spans the entire width of the page with a bold, immersive background and centered content."
                  : "يمتد البطل بالعرض الكامل على عرض الصفحة بأكمله مع خلفية جريئة وشاملة ومحتوى مركزي."
                )}
                {settings.heroStyle === "contained" && (language === "en"
                  ? "Contained hero features a beautiful banner with margins on both sides, creating a more defined layout."
                  : "يتميز البطل المحتوى ببانر جميل مع هوامش على كلا الجانبين، مما يخلق تخطيطًا أكثر تحديدًا."
                )}
                {settings.heroStyle === "split" && (language === "en"
                  ? "Split hero divides the section into two parts - content on one side and an application form on the other."
                  : "يقسم البطل المقسم القسم إلى جزأين - المحتوى على جانب واحد ونموذج الطلب على الجانب الآخر."
                )}
                {settings.heroStyle === "animated" && (language === "en"
                  ? "Animated hero brings your page to life with subtle text animations and dynamic content transitions."
                  : "يضفي البطل المتحرك الحياة على صفحتك مع رسوم متحركة نصية خفيفة وانتقالات محتوى ديناميكية."
                )}
                {settings.heroStyle === "video" && (language === "en"
                  ? "Video background creates a powerful first impression with motion that captures your company culture."
                  : "تخلق خلفية الفيديو انطباعًا أوليًا قويًا مع حركة تعبر عن ثقافة شركتك."
                )}
              </p>
            </div>
          </div>
        </div>
        
        {renderVideoSettings()}
      </div>
      
      <Divider />
      
      {/* Job Listings Layout */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Job Listings Layout" : "تخطيط قائمة الوظائف"}</h3>
        
        <Card className="border">
          <CardBody className="p-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="mb-2">
                  <h4 className="text-sm font-medium mb-1">{language === "en" ? "Display Style" : "نمط العرض"}</h4>
                  <RadioGroup
                    value={settings.cardsDisplay}
                    onValueChange={(value) => onChange("cardsDisplay", value)}
                    orientation="horizontal"
                    className="gap-2"
                  >
                    <Radio value="grid">
                      <div className="flex items-center gap-1">
                        <Icon icon="lucide:layout-grid" width={14} />
                        <span className="text-xs">{language === "en" ? "Grid" : "شبكة"}</span>
                      </div>
                    </Radio>
                    <Radio value="list">
                      <div className="flex items-center gap-1">
                        <Icon icon="lucide:list" width={14} />
                        <span className="text-xs">{language === "en" ? "List" : "قائمة"}</span>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon icon="lucide:sliders-horizontal" width={14} className="text-default-500" />
                    <span className="text-sm">{language === "en" ? "Filters sidebar" : "شريط التصفية"}</span>
                  </div>
                  <Switch
                    isSelected={settings.showFilters}
                    onValueChange={(value) => onChange("showFilters", value)}
                    size="sm"
                    color="primary"
                  />
                </div>
              </div>

              <div className="ml-auto bg-default-50 rounded-md p-2">
                <div className="h-full flex items-center justify-center">
                  {settings.cardsDisplay === "grid" ? (
                    <div className="grid grid-cols-2 gap-1 w-full">
                      <div className="bg-white border rounded h-8"></div>
                      <div className="bg-white border rounded h-8"></div>
                      <div className="bg-white border rounded h-8"></div>
                      <div className="bg-white border rounded h-8"></div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1 w-full">
                      <div className="bg-white border rounded h-5"></div>
                      <div className="bg-white border rounded h-5"></div>
                      <div className="bg-white border rounded h-5"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <Divider />
      
      {/* Additional Sections */}
      <div className="space-y-3">
        <h3 className="text-base font-medium">{language === "en" ? "Additional Sections" : "أقسام إضافية"}</h3>
        <p className="text-sm text-default-500">
          {language === "en" 
            ? "Customize which sections appear on your careers portal" 
            : "تخصيص الأقسام التي تظهر في بوابة الوظائف الخاصة بك"}
        </p>
        
        <Card className="border">
          <CardBody className="p-3 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:message-square-quote" width={16} className="text-blue-500" />
                <span>{language === "en" ? "Testimonials" : "الشهادات"}</span>
              </div>
              <Switch
                isSelected={settings.showTestimonials}
                onValueChange={(value) => onChange("showTestimonials", value)}
                color="primary"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:gift" width={16} className="text-green-500" />
                <span>{language === "en" ? "Company benefits" : "مزايا الشركة"}</span>
              </div>
              <Switch
                defaultSelected
                color="primary"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:image" width={16} className="text-purple-500" />
                <span>{language === "en" ? "Company gallery" : "معرض الشركة"}</span>
              </div>
              <Switch
                defaultSelected
                color="primary"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:map" width={16} className="text-amber-500" />
                <span>{language === "en" ? "Office locations" : "مواقع المكاتب"}</span>
              </div>
              <Switch
                defaultSelected
                color="primary"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:users" width={16} className="text-indigo-500" />
                <span>{language === "en" ? "Team showcase" : "عرض الفريق"}</span>
              </div>
              <Switch
                color="primary"
              />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};