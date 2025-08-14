import React from 'react';
import { Card, Button, Spacer } from '@heroui/react';
import { Icon } from '@iconify/react';
import { useOffers } from '../../../../context/OfferContext';
import { useLanguage } from '../../../../context/LanguageContext';
import { Step1Setup } from './Step1Setup';
import { Step2Letter } from './Step2Letter';
import { Step3Approval } from './Step3Approval';
import { Step4Send } from './Step4Send';
import { Step5Signature } from './Step5Signature';

export const OfferWizard: React.FC = () => {
  const { wizardState, setWizardStep, saveOffer, setViewMode } = useOffers();
  const { t, direction } = useLanguage();
  
  const steps = [
    { 
      id: 1, 
      label: t('offer_setup'), 
      component: <Step1Setup />,
      icon: 'lucide:clipboard-check'
    },
    { 
      id: 2, 
      label: t('offer_letter'), 
      component: <Step2Letter />,
      icon: 'lucide:file-text'
    },
    { 
      id: 3, 
      label: t('approval_workflow'), 
      component: <Step3Approval />,
      icon: 'lucide:users'
    },
    { 
      id: 4, 
      label: t('send_to_candidate'), 
      component: <Step4Send />,
      icon: 'lucide:send'
    },
    { 
      id: 5, 
      label: t('signature'), 
      component: <Step5Signature />,
      icon: 'lucide:pen-tool'
    }
  ];
  
  const currentStep = steps.find(s => s.id === wizardState.currentStep) || steps[0];
  
  const canGoBack = wizardState.currentStep > 1;
  const canGoNext = wizardState.currentStep < 5;
  
  const handleNext = () => {
    if (canGoNext) {
      setWizardStep(wizardState.currentStep + 1);
    }
  };
  
  const handleBack = () => {
    if (canGoBack) {
      setWizardStep(wizardState.currentStep - 1);
    }
  };
  
  const handleSaveAsDraft = () => {
    saveOffer(wizardState.offer);
  };
  
  const handleCancel = () => {
    if (window.confirm(t('confirm_cancel_wizard'))) {
      setViewMode('list');
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        {/* Stepper */}
        <div className="w-full overflow-x-auto">
          <div className="flex min-w-max mb-6">
            {steps.map((step, i) => (
              <div key={step.id} className={`flex items-center ${i < steps.length - 1 ? 'flex-1' : ''}`}>
                <div className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.id === wizardState.currentStep 
                        ? 'bg-blue-500 text-white' 
                        : step.id < wizardState.currentStep
                        ? 'bg-blue-100 text-blue-500'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    <Icon icon={step.icon} className="w-5 h-5" />
                  </div>
                  <span 
                    className={`mt-2 text-sm ${
                      step.id === wizardState.currentStep 
                        ? 'font-medium text-blue-500' 
                        : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                
                {i < steps.length - 1 && (
                  <div 
                    className={`h-1 flex-1 mx-4 ${
                      step.id < wizardState.currentStep ? 'bg-blue-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* AI Assistant prompt */}
        <div className="bg-blue-50 p-4 mb-6 rounded-lg border border-blue-100 flex items-start">
          <div className="p-2 bg-blue-500 rounded-full text-white">
            <Icon icon="lucide:sparkles" className="w-5 h-5" />
          </div>
          <div className="mx-4">
            <h4 className="font-medium text-blue-800">{t('ai_assistant')}</h4>
            <p className="text-blue-700 text-sm mt-1">
              {t('ai_assistant_message')}
            </p>
          </div>
        </div>
        
        {/* Step content */}
        <div className="mb-6">
          {currentStep.component}
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-between pt-4 border-t mt-8">
          <div className="flex gap-2">
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:x" />}
              onPress={handleCancel}
            >
              {t('cancel')}
            </Button>
            <Button
              variant="bordered"
              startContent={<Icon icon="lucide:save" />}
              onPress={handleSaveAsDraft}
            >
              {t('save_as_draft')}
            </Button>
          </div>
          
          <div className="flex gap-2">
            {canGoBack && (
              <Button
                variant="bordered"
                startContent={<Icon icon="lucide:arrow-left" />}
                onPress={handleBack}
              >
                {t('back')}
              </Button>
            )}
            
            {canGoNext && (
              <Button
                color="primary"
                endContent={<Icon icon="lucide:arrow-right" />}
                onPress={handleNext}
              >
                {t('next')}
              </Button>
            )}
            
            {!canGoNext && (
              <Button
                color="primary"
                endContent={<Icon icon="lucide:check" />}
                onPress={handleSaveAsDraft}
              >
                {t('complete')}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};