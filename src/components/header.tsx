import React from "react";
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Input, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useAppContext } from "../context/app-context";

export const Header: React.FC = () => {
  const { language, setLanguage, sidebarCollapsed, setSidebarCollapsed } = useAppContext();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = React.useState(false);
  const [recentSearches] = React.useState([
    "Software Engineer",
    "Marketing Manager", 
    "John Smith",
    "Frontend Developer"
  ]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  // no Ask AI here per user preference

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Quick actions data
  const quickActions = [
    {
      key: "add-candidate",
      icon: "lucide:user-plus",
      label: { en: "Add Candidate", ar: "إضافة مرشح" },
      action: () => console.log("Add Candidate clicked"),
    },
    {
      key: "create-job",
      icon: "lucide:file-plus",
      label: { en: "Create Job", ar: "إنشاء وظيفة" },
      action: () => console.log("Create Job clicked"),
    },
    {
      key: "schedule-interview",
      icon: "lucide:calendar-plus",
      label: { en: "Schedule Interview", ar: "جدولة مقابلة" },
      action: () => console.log("Schedule Interview clicked"),
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement global search functionality
    console.log("Searching for:", query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      handleSearch(searchQuery.trim());
      setIsSearchFocused(false);
    } else if (e.key === "Escape") {
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 flex items-center px-6">
      {/* Left spacer (brand sits in sidebar) */}
      <div className="flex items-center">
        {/* Mobile sidebar toggle - only visible on small screens */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-colors mr-3"
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Icon icon="lucide:menu" className="w-5 h-5" />
        </button>
      </div>

      {/* Global Search Bar - Center */}
      <div className="flex-1 flex justify-center px-4">
        <div className="relative w-full max-w-2xl">
          <div className="relative">
            <Icon 
              icon="lucide:search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
            />
            <Input
              type="text"
              placeholder={language === "en" ? "Search jobs, candidates, interviews..." : "البحث في الوظائف والمرشحين والمقابلات..."}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:border-attract-blue focus:ring-2 focus:ring-attract-blue focus:ring-opacity-20 transition-all duration-200"
              size="sm"
            />
            
            {/* Search Shortcut */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded border">
              ⌘K
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Icon icon="lucide:x" className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Search Filters */}
          {isSearchFocused && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="flex border-b border-gray-100">
                <button className="px-4 py-2 text-sm font-medium text-attract-blue border-b-2 border-attract-blue">
                  {language === "en" ? "All" : "الكل"}
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                  {language === "en" ? "Jobs" : "الوظائف"}
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                  {language === "en" ? "Candidates" : "المرشحين"}
                </button>
                <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                  {language === "en" ? "Interviews" : "المقابلات"}
                </button>
              </div>
              
              {/* Mobile Quick Actions */}
              <div className="lg:hidden border-b border-gray-100">
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                    {language === "en" ? "Quick Actions" : "إجراءات سريعة"}
                  </p>
                  <div className="flex space-x-2">
                    {quickActions.map((action) => (
                      <button
                        key={action.key}
                        onClick={action.action}
                        className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-50 hover:bg-attract-light-blue hover:text-attract-blue rounded-md transition-colors"
                      >
                        <Icon icon={action.icon} className="w-4 h-4" />
                        <span>{language === "en" ? action.label.en : action.label.ar}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Recent Searches */}
              <div className="border-t border-gray-100">
                <div className="p-3">
                  <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                    {language === "en" ? "Recent Searches" : "البحث الأخير"}
                  </p>
                  <div className="space-y-1">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSearchQuery(search);
                          handleSearch(search);
                        }}
                        className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 rounded transition-colors flex items-center space-x-2"
                      >
                        <Icon icon="lucide:clock" className="w-3 h-3 text-gray-400" />
                        <span>{search}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="p-3 text-sm text-gray-500 border-t border-gray-100">
                {language === "en" ? "Type to search..." : "اكتب للبحث..."}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="hidden lg:flex items-center space-x-2 mr-4">
        {quickActions.map((action) => (
          <Popover key={action.key} placement="bottom">
            <PopoverTrigger>
              <Button
                size="sm"
                variant="light"
                className="p-2 min-w-0 h-9 w-9 text-gray-600 hover:text-attract-blue hover:bg-attract-light-blue transition-colors"
                onClick={action.action}
                title={language === "en" ? action.label.en : action.label.ar}
              >
                <Icon icon={action.icon} className="w-4 h-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-2 py-1 text-sm">
                {language === "en" ? action.label.en : action.label.ar}
              </div>
            </PopoverContent>
          </Popover>
        ))}
      </div>

      {/* Right controls */}
      <div className="flex items-center space-x-4">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button 
              className="bg-transparent min-w-0 px-2"
              variant="light"
            >
              <div className="flex items-center">
                <Icon icon="lucide:globe" className="w-5 h-5 mr-1" />
                <span>{language === "en" ? "EN" : "AR"}</span>
              </div>
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Language options">
            <DropdownItem 
              key="en" 
              onPress={() => setLanguage("en")}
              className={language === "en" ? "text-attract-blue" : ""}
            >
              English
            </DropdownItem>
            <DropdownItem 
              key="ar" 
              onPress={() => setLanguage("ar")}
              className={language === "ar" ? "text-attract-blue" : ""}
            >
              العربية
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Button className="bg-transparent min-w-0 px-2" variant="light">
          <Icon icon="lucide:bell" className="w-5 h-5" />
        </Button>

        <Avatar 
          src="https://img.heroui.chat/image/avatar?w=200&h=200&u=1" 
          className="cursor-pointer"
          size="sm"
        />
      </div>
    </header>
  );
};