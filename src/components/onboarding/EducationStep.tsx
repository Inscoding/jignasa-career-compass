import { useLanguage } from '@/contexts/LanguageContext';
import { GraduationCap, BookOpen, Award, School } from 'lucide-react';

interface EducationStepProps {
  value: string;
  onChange: (value: string) => void;
}

export function EducationStep({ value, onChange }: EducationStepProps) {
  const { t } = useLanguage();

  const options = [
    { id: '10th', icon: School, label: t('onboarding.edu.10th'), desc: 'Secondary School' },
    { id: '12th', icon: BookOpen, label: t('onboarding.edu.12th'), desc: 'Higher Secondary' },
    { id: 'graduate', icon: GraduationCap, label: t('onboarding.edu.graduate'), desc: 'Bachelor\'s Degree' },
    { id: 'postgraduate', icon: Award, label: t('onboarding.edu.postgraduate'), desc: 'Master\'s or Above' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {t('onboarding.edu.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.edu.subtitle')}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left
              ${value === option.id 
                ? 'border-saffron bg-saffron/5 shadow-glow' 
                : 'border-border hover:border-saffron/50 hover:bg-accent/50'
              }`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors
              ${value === option.id 
                ? 'hero-gradient' 
                : 'bg-muted group-hover:bg-saffron/20'
              }`}
            >
              <option.icon className={`w-6 h-6 ${value === option.id ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-saffron'}`} />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{option.label}</h3>
            <p className="text-sm text-muted-foreground">{option.desc}</p>
            
            {value === option.id && (
              <div className="absolute top-4 right-4 w-6 h-6 rounded-full hero-gradient flex items-center justify-center">
                <svg className="w-4 h-4 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
