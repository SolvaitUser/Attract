import React, { useState } from "react";
import { Checkbox, Switch, Card, CardBody, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../data/translations";

export const PublishingOptions: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [publishOptions, setPublishOptions] = useState({
    publishAfterApproval: true,
    internal: true,
    external: {
      linkedin: true,
      indeed: true,
      taqat: true,
      glassdoor: false,
      monster: false,
    }
  });

  const handleTogglePublishOption = (field: string, value: boolean) => {
    setPublishOptions({
      ...publishOptions,
      [field]: value
    });
  };

  const handleToggleExternalPlatform = (platform: keyof typeof publishOptions.external, value: boolean) => {
    setPublishOptions({
      ...publishOptions,
      external: {
        ...publishOptions.external,
        [platform]: value
      }
    });
  };

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardBody>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary-100 text-primary rounded-full flex items-center justify-center">
              <Icon icon="lucide:zap" width={20} />
            </div>
            <div>
              <h3 className="font-semibold">{t.publishAutomatically}</h3>
              <p className="text-sm text-default-600 mb-3">{t.publishAutomaticallyDescription}</p>
              <Switch
                isSelected={publishOptions.publishAfterApproval}
                onValueChange={(value) => handleTogglePublishOption("publishAfterApproval", value)}
                color="primary"
              >
                {t.publishImmediatelyAfterApproval}
              </Switch>
            </div>
          </div>
        </CardBody>
      </Card>

      <Divider />

      <div className="space-y-4">
        <h3 className="font-semibold">{t.publishTo}</h3>

        <Card>
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Icon icon="lucide:building" width={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{t.internalCareersPortal}</h4>
                    <p className="text-sm text-default-600">{t.internalCareersPortalDescription}</p>
                  </div>
                  <Switch
                    isSelected={publishOptions.internal}
                    onValueChange={(value) => handleTogglePublishOption("internal", value)}
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <Icon icon="lucide:globe" width={20} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">{t.externalJobBoards}</h4>
                    <p className="text-sm text-default-600">{t.externalJobBoardsDescription}</p>
                  </div>
                  <Switch
                    isSelected={Object.values(publishOptions.external).some(v => v)}
                    onValueChange={(value) => {
                      const newExternal = {} as Record<string, boolean>;
                      Object.keys(publishOptions.external).forEach(key => {
                        newExternal[key] = value;
                      });
                      
                      setPublishOptions({
                        ...publishOptions,
                        external: newExternal as typeof publishOptions.external
                      });
                    }}
                    color="primary"
                  />
                </div>
                
                <div className="space-y-3 pl-3 border-l-2 border-default-200">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      isSelected={publishOptions.external.linkedin}
                      onValueChange={(value) => handleToggleExternalPlatform("linkedin", value)}
                      isDisabled={!Object.values(publishOptions.external).some(v => v)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="logos:linkedin-icon" width={18} />
                        <span>LinkedIn</span>
                      </div>
                    </Checkbox>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Checkbox
                      isSelected={publishOptions.external.indeed}
                      onValueChange={(value) => handleToggleExternalPlatform("indeed", value)}
                      isDisabled={!Object.values(publishOptions.external).some(v => v)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:briefcase" width={18} />
                        <span>Indeed</span>
                      </div>
                    </Checkbox>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Checkbox
                      isSelected={publishOptions.external.taqat}
                      onValueChange={(value) => handleToggleExternalPlatform("taqat", value)}
                      isDisabled={!Object.values(publishOptions.external).some(v => v)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:briefcase" width={18} />
                        <span>TAQAT</span>
                      </div>
                    </Checkbox>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Checkbox
                      isSelected={publishOptions.external.glassdoor}
                      onValueChange={(value) => handleToggleExternalPlatform("glassdoor", value)}
                      isDisabled={!Object.values(publishOptions.external).some(v => v)}
                    >
                      <div className="flex items-center gap-2">
                        <Icon icon="lucide:star" width={18} />
                        <span>Glassdoor</span>
                      </div>
                    </Checkbox>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};