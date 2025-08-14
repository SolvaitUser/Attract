import React from "react";
import { LanguageProvider, useLanguage } from "./Offer/src/context/LanguageContext";
import OfferTab from "./Offer/src/components/tab-contents/OfferTab";
import { PageHeader } from "../shared/page-header";
import { OfferProvider, useOffers } from "./Offer/src/context/OfferContext";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const HeaderActions: React.FC = () => {
  const { t } = useLanguage();
  const { viewMode, createOffer } = useOffers();
  if (viewMode !== 'list') return null;
  return (
    <Button color="primary" startContent={<Icon icon="lucide:plus" />} onPress={createOffer}>
      {t('new_offer')}
    </Button>
  );
};

export const OfferView: React.FC = () => {
  return (
    <LanguageProvider>
      <OfferProvider>
        <div>
          <PageHeader 
            title={{ en: "Offer", ar: "العرض الوظيفي" }}
            description={{ 
              en: "Create, approve, and send job offers to selected candidates.",
              ar: "إنشاء واعتماد وإرسال عروض العمل إلى المرشحين المختارين."
            }}
            rightContent={<HeaderActions />}
          />
          <OfferTab />
        </div>
      </OfferProvider>
    </LanguageProvider>
  );
};


