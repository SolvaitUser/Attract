import React from "react";
import { Icon } from "@iconify/react";
import { Button, Input, Textarea, Switch } from "@heroui/react";
import { PageHeader } from "../shared/page-header";
import { useAppContext } from "../../context/app-context";

type SettingsSection = {
  key: string;
  icon: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  items: Array<{ key: string; label: { en: string; ar: string }; hint?: { en: string; ar: string } }>;
};

const SETTINGS_SECTIONS: SettingsSection[] = [
  {
    key: "organization",
    icon: "lucide:building-2",
    title: { en: "Organization", ar: "المؤسسة" },
    description: {
      en: "Company profile, branding, and default preferences.",
      ar: "ملف الشركة والعلامة التجارية والتفضيلات الافتراضية.",
    },
    items: [
      { key: "company-profile", label: { en: "Company Profile", ar: "ملف الشركة" } },
      { key: "branding-logo", label: { en: "Branding & Logo", ar: "العلامة التجارية والشعار" } },
      { key: "default-stages", label: { en: "Default Hiring Stages", ar: "مراحل التوظيف الافتراضية" } },
      { key: "working-days", label: { en: "Working Days & Holidays", ar: "أيام العمل والعطل" } },
    ],
  },
  {
    key: "users",
    icon: "lucide:users",
    title: { en: "User Management", ar: "إدارة المستخدمين" },
    description: {
      en: "Manage users, roles, and permissions.",
      ar: "إدارة المستخدمين والأدوار والصلاحيات.",
    },
    items: [
      { key: "users", label: { en: "Users", ar: "المستخدمون" }, hint: { en: "Create, invite, deactivate", ar: "إنشاء، دعوة، إلغاء تفعيل" } },
      { key: "roles-permissions", label: { en: "Roles & Permissions", ar: "الأدوار والصلاحيات" } },
      { key: "teams-departments", label: { en: "Teams & Departments", ar: "الفرق والأقسام" } },
      { key: "access-policies", label: { en: "Access Policies", ar: "سياسات الوصول" } },
    ],
  },
  {
    key: "security",
    icon: "lucide:shield-check",
    title: { en: "Security", ar: "الأمان" },
    description: {
      en: "Authentication, password policy, SSO, and session settings.",
      ar: "المصادقة، سياسة كلمات المرور، الدخول الموحد، وإعدادات الجلسة.",
    },
    items: [
      { key: "password-policy", label: { en: "Password Policy", ar: "سياسة كلمات المرور" } },
      { key: "two-factor", label: { en: "Two-Factor Authentication", ar: "المصادقة الثنائية" } },
      { key: "sso", label: { en: "Single Sign-On (SSO)", ar: "تسجيل الدخول الموحد (SSO)" } },
      { key: "session-timeout", label: { en: "Session & Timeout", ar: "الجلسة والمهلة" } },
      { key: "ip-allowlist", label: { en: "IP Allowlist", ar: "قائمة العناوين المسموح بها" } },
    ],
  },
  {
    key: "integrations",
    icon: "lucide:plug",
    title: { en: "Integrations", ar: "التكاملات" },
    description: {
      en: "Connect ATS with tools and services.",
      ar: "ربط نظام التوظيف مع الأدوات والخدمات.",
    },
    items: [
      { key: "email-calendar", label: { en: "Email & Calendar (Google/Microsoft)", ar: "البريد والتقويم (جوجل/مايكروسوفت)" } },
      { key: "job-boards", label: { en: "Job Boards (LinkedIn, Indeed, etc.)", ar: "منصات الوظائف (لينكدإن، إنديد، وغيرها)" } },
      { key: "hris-payroll", label: { en: "HRIS/Payroll", ar: "أنظمة الموارد البشرية/الرواتب" } },
      { key: "webhooks-api-keys", label: { en: "Webhooks & API Keys", ar: "الويبهوك ومفاتيح API" } },
      { key: "sso-providers", label: { en: "Single Sign-On Providers", ar: "مزودو تسجيل الدخول الموحد" } },
    ],
  },
  {
    key: "workflow",
    icon: "lucide:workflow",
    title: { en: "Workflow & Automation", ar: "سير العمل والأتمتة" },
    description: {
      en: "Automations, templates, and approval rules.",
      ar: "الأتمتة والقوالب وقواعد الموافقة.",
    },
    items: [
      { key: "email-templates", label: { en: "Email & Message Templates", ar: "قوالب البريد والرسائل" } },
      { key: "offer-templates", label: { en: "Offer Letter Templates", ar: "قوالب عروض العمل" } },
      { key: "approval-workflows", label: { en: "Approval Workflows", ar: "عمليات الموافقة" } },
      { key: "automation-rules", label: { en: "Automation Rules", ar: "قواعد الأتمتة" } },
      { key: "interview-kits", label: { en: "Interview Kits & Scorecards", ar: "مجموعات المقابلات وبطاقات التقييم" } },
    ],
  },
  {
    key: "notifications",
    icon: "lucide:bell",
    title: { en: "Notifications", ar: "الإشعارات" },
    description: {
      en: "Delivery channels and subscriptions.",
      ar: "قنوات الإشعارات والاشتراكات.",
    },
    items: [
      { key: "channels", label: { en: "Delivery Channels (Email, SMS, In-App)", ar: "قنوات التسليم (البريد، الرسائل، داخل التطبيق)" } },
      { key: "rules", label: { en: "Notification Rules", ar: "قواعد الإشعارات" } },
      { key: "digests", label: { en: "Digest & Summaries", ar: "الملخصات الدورية" } },
    ],
  },
  {
    key: "localization",
    icon: "lucide:globe-2",
    title: { en: "Localization", ar: "اللغات والمنطقة" },
    description: {
      en: "Languages, time zone, and formatting.",
      ar: "اللغات والمنطقة الزمنية والتنسيقات.",
    },
    items: [
      { key: "languages", label: { en: "Languages", ar: "اللغات" } },
      { key: "time-zone", label: { en: "Time Zone", ar: "المنطقة الزمنية" } },
      { key: "formats", label: { en: "Date & Number Formats", ar: "تنسيقات التاريخ والأرقام" } },
      { key: "rtl", label: { en: "Right-to-Left (RTL)", ar: "الكتابة من اليمين لليسار" } },
    ],
  },
  {
    key: "compliance",
    icon: "lucide:file-lock-2",
    title: { en: "Compliance & Privacy", ar: "الامتثال والخصوصية" },
    description: {
      en: "GDPR, data retention, and consent.",
      ar: "اللائحة العامة لحماية البيانات، الاحتفاظ بالبيانات، والموافقة.",
    },
    items: [
      { key: "retention", label: { en: "Data Retention", ar: "الاحتفاظ بالبيانات" } },
      { key: "consent", label: { en: "Candidate Consent", ar: "موافقة المرشح" } },
      { key: "export", label: { en: "Data Export", ar: "تصدير البيانات" } },
      { key: "anonymization", label: { en: "Anonymization", ar: "إخفاء الهوية" } },
    ],
  },
  {
    key: "audit",
    icon: "lucide:list-tree",
    title: { en: "Audit Logs", ar: "سجلات التدقيق" },
    description: {
      en: "Track system activity and changes.",
      ar: "تتبع نشاط النظام والتغييرات.",
    },
    items: [
      { key: "activity-log", label: { en: "Activity Log", ar: "سجل النشاط" } },
      { key: "exports-reports", label: { en: "Exports & Reports", ar: "التقارير والتصدير" } },
    ],
  },
  {
    key: "billing",
    icon: "lucide:credit-card",
    title: { en: "Billing", ar: "الفوترة" },
    description: {
      en: "Plan, usage, and invoices.",
      ar: "الاشتراك والاستخدام والفواتير.",
    },
    items: [
      { key: "plan-usage", label: { en: "Plan & Usage", ar: "الخطة والاستخدام" } },
      { key: "payment-methods", label: { en: "Payment Methods", ar: "طرق الدفع" } },
      { key: "invoices", label: { en: "Invoices", ar: "الفواتير" } },
    ],
  },
];

export const SettingsView: React.FC = () => {
  const { language } = useAppContext();
  const [openSectionKey, setOpenSectionKey] = React.useState<string | null>(null);
  const [selectedItemIdx, setSelectedItemIdx] = React.useState<number>(0);
  const [formState, setFormState] = React.useState<Record<string, Record<string, any>>>({});

  const getVal = (itemKey: string, field: string, def: any) => (formState[itemKey]?.[field] ?? def);
  const setVal = (itemKey: string, field: string, value: any) => (
    setFormState((s) => ({ ...s, [itemKey]: { ...(s[itemKey] || {}), [field]: value } }))
  );
  const resetItem = (itemKey: string) => setFormState((s) => ({ ...s, [itemKey]: {} }));

  const handleOpenSection = (key: string) => {
    setOpenSectionKey(key);
    setSelectedItemIdx(0);
  };
  const handleClose = () => setOpenSectionKey(null);

  const currentSection = React.useMemo(
    () => SETTINGS_SECTIONS.find((s) => s.key === openSectionKey) || null,
    [openSectionKey]
  );

  const renderSectionEditor = (sectionKey: string, itemKey: string) => {
    if (sectionKey === "organization" && itemKey === "company-profile") {
      return (
        <div className="space-y-4">
          <Input label={language === "en" ? "Company Name" : "اسم الشركة"} value={getVal(itemKey, "companyName", "Wise Corp")} onChange={(e) => setVal(itemKey, "companyName", e.target.value)} />
          <Input label={language === "en" ? "Website" : "الموقع الإلكتروني"} value={getVal(itemKey, "website", "https://wise.example.com")} onChange={(e) => setVal(itemKey, "website", e.target.value)} />
          <Textarea label={language === "en" ? "Description" : "الوصف"} value={getVal(itemKey, "description", "") } onChange={(e) => setVal(itemKey, "description", e.target.value)} />
          <div className="flex items-center gap-3">
            <Button color="primary" onPress={() => console.log("Save", itemKey, formState[itemKey])}>
              {language === "en" ? "Save" : "حفظ"}
            </Button>
            <Button variant="flat" onPress={() => resetItem(itemKey)}>
              {language === "en" ? "Reset" : "إعادة ضبط"}
            </Button>
          </div>
        </div>
      );
    }

    if (sectionKey === "organization" && itemKey === "branding-logo") {
      return (
        <div className="space-y-4">
          <Input label={language === "en" ? "Logo URL" : "رابط الشعار"} value={getVal(itemKey, "logoUrl", "")} onChange={(e) => setVal(itemKey, "logoUrl", e.target.value)} />
          <Input label={language === "en" ? "Brand Color" : "لون العلامة"} type="color" value={getVal(itemKey, "brandingColor", "#1e88e5")} onChange={(e) => setVal(itemKey, "brandingColor", e.target.value)} />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{language === "en" ? "Dark Mode" : "الوضع الداكن"}</span>
            <Switch isSelected={!!getVal(itemKey, "darkMode", false)} onValueChange={(v) => setVal(itemKey, "darkMode", v)}>
              {language === "en" ? "Enabled" : "مفعّل"}
            </Switch>
          </div>
          <div className="flex items-center gap-3">
            <Button color="primary" onPress={() => console.log("Save", itemKey, formState[itemKey])}>{language === "en" ? "Save" : "حفظ"}</Button>
            <Button variant="flat" onPress={() => resetItem(itemKey)}>{language === "en" ? "Reset" : "إعادة ضبط"}</Button>
          </div>
        </div>
      );
    }

    if (sectionKey === "organization" && itemKey === "default-stages") {
      return (
        <div className="space-y-4">
          <Textarea label={language === "en" ? "Default Hiring Stages (comma-separated)" : "مراحل التوظيف الافتراضية (مفصولة بفواصل)"} value={getVal(itemKey, "stages", "Sourcing, Screening, Interview, Offer, Hired")} onChange={(e) => setVal(itemKey, "stages", e.target.value)} />
          <div className="flex items-center gap-3">
            <Button color="primary" onPress={() => console.log("Save", itemKey, formState[itemKey])}>{language === "en" ? "Save" : "حفظ"}</Button>
            <Button variant="flat" onPress={() => resetItem(itemKey)}>{language === "en" ? "Reset" : "إعادة ضبط"}</Button>
          </div>
        </div>
      );
    }

    if (sectionKey === "organization" && itemKey === "working-days") {
      return (
        <div className="space-y-4">
          <Input label={language === "en" ? "Working Days" : "أيام العمل"} value={getVal(itemKey, "workingDays", "Sun-Thu")} onChange={(e) => setVal(itemKey, "workingDays", e.target.value)} />
          <Textarea label={language === "en" ? "Holidays (one per line)" : "العطل (كل سطر عطلة)"} value={getVal(itemKey, "holidays", "") } onChange={(e) => setVal(itemKey, "holidays", e.target.value)} />
          <div className="flex items-center gap-3">
            <Button color="primary" onPress={() => console.log("Save", itemKey, formState[itemKey])}>{language === "en" ? "Save" : "حفظ"}</Button>
            <Button variant="flat" onPress={() => resetItem(itemKey)}>{language === "en" ? "Reset" : "إعادة ضبط"}</Button>
          </div>
        </div>
      );
    }

    if (sectionKey === "users" && itemKey === "users") {
      return (
        <div className="space-y-4">
          <Input label={language === "en" ? "Full Name" : "الاسم الكامل"} value={getVal(itemKey, "name", "") } onChange={(e) => setVal(itemKey, "name", e.target.value)} />
          <Input label={language === "en" ? "Email" : "البريد الإلكتروني"} value={getVal(itemKey, "email", "") } onChange={(e) => setVal(itemKey, "email", e.target.value)} />
          <Input label={language === "en" ? "Role" : "الدور"} value={getVal(itemKey, "role", "Recruiter") } onChange={(e) => setVal(itemKey, "role", e.target.value)} />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{language === "en" ? "Active" : "نشط"}</span>
            <Switch isSelected={!!getVal(itemKey, "active", true)} onValueChange={(v) => setVal(itemKey, "active", v)} />
          </div>
          <div className="flex items-center gap-3">
            <Button color="primary" onPress={() => console.log("Invite user", formState[itemKey])}>{language === "en" ? "Invite" : "دعوة"}</Button>
            <Button variant="flat" onPress={() => resetItem(itemKey)}>{language === "en" ? "Reset" : "إعادة ضبط"}</Button>
          </div>
        </div>
      );
    }

    if (sectionKey === "security" && itemKey === "two-factor") {
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{language === "en" ? "Enable 2FA" : "تفعيل المصادقة الثنائية"}</span>
            <Switch isSelected={!!getVal(itemKey, "enabled", true)} onValueChange={(v) => setVal(itemKey, "enabled", v)} />
          </div>
          <Input label={language === "en" ? "Method (App/SMS)" : "الطريقة (تطبيق/رسالة)"} value={getVal(itemKey, "method", "App")} onChange={(e) => setVal(itemKey, "method", e.target.value)} />
          <div className="flex items-center gap-3">
            <Button color="primary" onPress={() => console.log("Save 2FA", formState[itemKey])}>{language === "en" ? "Save" : "حفظ"}</Button>
            <Button variant="flat" onPress={() => resetItem(itemKey)}>{language === "en" ? "Reset" : "إعادة ضبط"}</Button>
          </div>
        </div>
      );
    }

    // Fallback for items without specific editors
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          {language === "en"
            ? `Configure ${itemKey} settings. (Editor coming soon)`
            : `إعداد إعدادات ${itemKey}. (المحرر قادم قريباً)`}
        </p>
        <div className="flex items-center gap-3">
          <Button color="primary" onPress={() => console.log("Save", itemKey, formState[itemKey])}>
            {language === "en" ? "Save" : "حفظ"}
          </Button>
          <Button variant="flat" onPress={() => resetItem(itemKey)}>
            {language === "en" ? "Reset" : "إعادة ضبط"}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title={{ en: "Settings", ar: "الإعدادات" }}
        description={{
          en: "Configure system options, manage users, and connect integrations.",
          ar: "تهيئة إعدادات النظام، إدارة المستخدمين، وربط التكاملات.",
        }}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {SETTINGS_SECTIONS.map((section) => (
          <button
            key={section.key}
            onClick={() => handleOpenSection(section.key)}
            className="text-left border border-gray-200 rounded-lg p-4 bg-white hover:border-wise-blue transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 w-9 h-9 rounded-md bg-wise-light-blue flex items-center justify-center">
                <Icon icon={section.icon} className="text-wise-blue w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-800">
                  {language === "en" ? section.title.en : section.title.ar}
                </h3>
                <p className="text-sm text-gray-500 mb-3">
                  {language === "en" ? section.description.en : section.description.ar}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between py-1">
                      <span className="text-sm text-gray-700">
                        {language === "en" ? item.label.en : item.label.ar}
                      </span>
                      {item.hint && (
                        <span className="text-xs text-gray-400">
                          {language === "en" ? item.hint.en : item.hint.ar}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </button>
        ))}
      </div>

      {currentSection && (
        <div className="fixed inset-0 z-40">
          <div className="absolute inset-0 bg-black/30" onClick={handleClose} />
          <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-white shadow-xl z-50 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Icon icon={currentSection.icon} className="text-wise-blue w-5 h-5" />
                <span className="font-semibold text-gray-800">
                  {language === "en" ? currentSection.title.en : currentSection.title.ar}
                </span>
              </div>
              <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                <Icon icon="lucide:x" className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden flex">
              <aside className="w-48 border-r border-gray-200 p-3 overflow-y-auto">
                <ul className="space-y-1">
                  {currentSection.items.map((item, idx) => {
                    const active = idx === selectedItemIdx;
                    return (
                      <li key={idx}>
                        <button
                          onClick={() => setSelectedItemIdx(idx)}
                          className={`w-full text-left px-2 py-1 rounded-md text-sm transition-colors ${
                            active ? "bg-wise-light-blue text-wise-blue" : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          {language === "en" ? item.label.en : item.label.ar}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </aside>
              <section className="flex-1 p-4 overflow-y-auto">
                {renderSectionEditor(currentSection.key, currentSection.items[selectedItemIdx]?.key)}
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


