import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ProgressIndicator } from '@/components/onboarding/ProgressIndicator';
import { EducationStep } from '@/components/onboarding/EducationStep';
import { SubjectsStep } from '@/components/onboarding/SubjectsStep';
import { InterestsStep } from '@/components/onboarding/InterestsStep';
import { LocationStep } from '@/components/onboarding/LocationStep';
import { FinanceStep } from '@/components/onboarding/FinanceStep';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ArrowLeft, ArrowRight, Compass, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OnboardingData {
  education: string;
  subjects: Record<string, number>;
  interests: string[];
  location: { state: string; district: string; type: string };
  finance: { budget: string; canRelocate: boolean; preferDuration: string };
}

const initialData: OnboardingData = {
  education: '',
  subjects: {},
  interests: [],
  location: { state: '', district: '', type: '' },
  finance: { budget: '', canRelocate: false, preferDuration: '' },
};

const Onboarding = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(initialData);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const steps = [
    t('onboarding.step1'),
    t('onboarding.step2'),
    t('onboarding.step3'),
    t('onboarding.step4'),
    t('onboarding.step5'),
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 0: return !!data.education;
      case 1: return Object.keys(data.subjects).length >= 3;
      case 2: return data.interests.length >= 2;
      case 3: return !!data.location.state && !!data.location.type;
      case 4: return !!data.finance.budget && !!data.finance.preferDuration;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      navigate('/results', { state: { userData: data } });
    }, 2500);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <EducationStep
            value={data.education}
            onChange={(value) => setData({ ...data, education: value })}
          />
        );
      case 1:
        return (
          <SubjectsStep
            value={data.subjects}
            onChange={(value) => setData({ ...data, subjects: value })}
          />
        );
      case 2:
        return (
          <InterestsStep
            value={data.interests}
            onChange={(value) => setData({ ...data, interests: value })}
          />
        );
      case 3:
        return (
          <LocationStep
            value={data.location}
            onChange={(value) => setData({ ...data, location: value })}
          />
        );
      case 4:
        return (
          <FinanceStep
            value={data.finance}
            onChange={(value) => setData({ ...data, finance: value })}
          />
        );
      default:
        return null;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6 pulse-glow">
            <Compass className="w-12 h-12 text-primary-foreground animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing Your Profile</h2>
          <p className="text-muted-foreground mb-4">Our AI is matching you with the best career paths...</p>
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-saffron" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Margadarshi AI</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-32 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={steps.length}
            labels={steps}
          />

          {/* Step Content */}
          <div className="mt-8 animate-fade-in" key={currentStep}>
            {renderStep()}
          </div>
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/50 py-4">
        <div className="container-wide flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('onboarding.back')}
          </Button>

          <Button
            variant="gradient"
            size="lg"
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            {currentStep === steps.length - 1 ? (
              <>
                {t('onboarding.complete')}
                <Compass className="w-4 h-4" />
              </>
            ) : (
              <>
                {t('onboarding.next')}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default Onboarding;
