import { translations } from "./translations";

// Define the stage template interface
export interface StageTemplate {
  name: string;
  isRequired: boolean;
  description: string;
  estimatedDays: number;
}

// Helper function to generate template keys based on language
const getTranslationKey = (key: string, language: 'en' | 'ar' = 'en') => {
  return translations[language][key as keyof typeof translations[typeof language]] || key;
};

// Create the recruitment stage templates
export const recruitmentStageTemplates: Record<string, StageTemplate[]> = {
  general: [
    {
      name: getTranslationKey('applicationReview'),
      isRequired: true,
      description: getTranslationKey('applicationReviewDescription'),
      estimatedDays: 3
    },
    {
      name: getTranslationKey('phoneScreening'),
      isRequired: true,
      description: getTranslationKey('phoneScreeningDescription'),
      estimatedDays: 2
    },
    {
      name: getTranslationKey('firstInterview'),
      isRequired: true, 
      description: getTranslationKey('firstInterviewDescription'),
      estimatedDays: 5
    },
    {
      name: getTranslationKey('finalInterview'),
      isRequired: true,
      description: getTranslationKey('finalInterviewDescription'),
      estimatedDays: 5
    }
  ],
  
  technical: [
    {
      name: getTranslationKey('applicationReview'),
      isRequired: true,
      description: getTranslationKey('applicationReviewDescription'),
      estimatedDays: 2
    },
    {
      name: getTranslationKey('phoneScreening'),
      isRequired: true,
      description: getTranslationKey('phoneScreeningDescription'),
      estimatedDays: 1
    },
    {
      name: getTranslationKey('technicalAssessment'),
      isRequired: true,
      description: getTranslationKey('technicalAssessmentDescription'),
      estimatedDays: 7
    },
    {
      name: getTranslationKey('technicalInterview'),
      isRequired: true,
      description: getTranslationKey('technicalInterviewDescription'),
      estimatedDays: 3
    },
    {
      name: getTranslationKey('finalInterview'),
      isRequired: true,
      description: getTranslationKey('finalInterviewDescription'),
      estimatedDays: 4
    }
  ],
  
  executive: [
    {
      name: getTranslationKey('applicationReview'),
      isRequired: true,
      description: getTranslationKey('applicationReviewDescription'),
      estimatedDays: 5
    },
    {
      name: getTranslationKey('initialScreening'),
      isRequired: true,
      description: getTranslationKey('initialScreeningDescription'),
      estimatedDays: 3
    },
    {
      name: getTranslationKey('firstRoundInterview'),
      isRequired: true,
      description: getTranslationKey('firstRoundInterviewDescription'),
      estimatedDays: 4
    },
    {
      name: getTranslationKey('secondRoundInterview'),
      isRequired: true,
      description: getTranslationKey('secondRoundInterviewDescription'),
      estimatedDays: 4
    },
    {
      name: getTranslationKey('leadershipAssessment'),
      isRequired: true,
      description: getTranslationKey('leadershipAssessmentDescription'),
      estimatedDays: 5
    },
    {
      name: getTranslationKey('finalRound'),
      isRequired: true,
      description: getTranslationKey('finalRoundDescription'),
      estimatedDays: 6
    },
    {
      name: getTranslationKey('backgroundCheck'),
      isRequired: true,
      description: getTranslationKey('backgroundCheckDescription'),
      estimatedDays: 5
    }
  ],
  
  sales: [
    {
      name: getTranslationKey('applicationReview'),
      isRequired: true,
      description: getTranslationKey('applicationReviewDescription'),
      estimatedDays: 2
    },
    {
      name: getTranslationKey('phoneScreening'),
      isRequired: true,
      description: getTranslationKey('phoneScreeningDescription'),
      estimatedDays: 2
    },
    {
      name: getTranslationKey('salesPitchAssessment'),
      isRequired: true,
      description: getTranslationKey('salesPitchAssessmentDescription'),
      estimatedDays: 4
    },
    {
      name: getTranslationKey('roleplayScenario'),
      isRequired: true,
      description: getTranslationKey('roleplayScenarioDescription'),
      estimatedDays: 3
    },
    {
      name: getTranslationKey('meetTheTeam'),
      isRequired: false,
      description: getTranslationKey('meetTheTeamDescription'),
      estimatedDays: 2
    },
    {
      name: getTranslationKey('finalInterview'),
      isRequired: true,
      description: getTranslationKey('finalInterviewDescription'),
      estimatedDays: 3
    }
  ],
  
  creative: [
    {
      name: getTranslationKey('applicationReview'),
      isRequired: true,
      description: getTranslationKey('applicationReviewDescription'),
      estimatedDays: 3
    },
    {
      name: getTranslationKey('portfolioReview'),
      isRequired: true,
      description: getTranslationKey('portfolioReviewDescription'),
      estimatedDays: 4
    },
    {
      name: getTranslationKey('firstInterview'),
      isRequired: true,
      description: getTranslationKey('firstInterviewDescription'),
      estimatedDays: 3
    },
    {
      name: getTranslationKey('designChallenge'),
      isRequired: true,
      description: getTranslationKey('designChallengeDescription'),
      estimatedDays: 7
    },
    {
      name: getTranslationKey('presentationReview'),
      isRequired: true,
      description: getTranslationKey('presentationReviewDescription'),
      estimatedDays: 3
    },
    {
      name: getTranslationKey('finalInterview'),
      isRequired: true,
      description: getTranslationKey('finalInterviewDescription'),
      estimatedDays: 3
    }
  ]
};

export default recruitmentStageTemplates;