import { useLanguage } from '@/contexts/LanguageContext';
import { Wallet, Clock, GraduationCap } from 'lucide-react';

interface FinanceStepProps {
  value: { budget: string; canRelocate: boolean; preferDuration: string };
  onChange: (value: { budget: string; canRelocate: boolean; preferDuration: string }) => void;
}

const budgetOptions = [
  { id: 'low', label: 'Minimal', amount: '< ₹50,000', desc: 'Self-study, free courses, scholarships' },
  { id: 'medium', label: 'Moderate', amount: '₹50K - ₹2L', desc: 'Diploma, certification courses' },
  { id: 'high', label: 'Flexible', amount: '> ₹2 Lakh', desc: 'Degree programs, professional courses' },
];

const durationOptions = [
  { id: '6months', label: '6 Months', icon: '⚡' },
  { id: '1year', label: '1 Year', icon: '📅' },
  { id: '2years', label: '2 Years', icon: '📆' },
  { id: '4years', label: '4+ Years', icon: '🎓' },
];

export function FinanceStep({ value, onChange }: FinanceStepProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {t('onboarding.finance.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.finance.subtitle')}
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-8">
        {/* Education Budget */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Wallet className="w-4 h-4 text-saffron" />
            Education Investment Capacity
          </label>
          <div className="space-y-3">
            {budgetOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onChange({ ...value, budget: option.id })}
                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left flex items-center justify-between
                  ${value.budget === option.id 
                    ? 'border-saffron bg-saffron/5 shadow-glow' 
                    : 'border-border hover:border-saffron/50'
                  }`}
              >
                <div>
                  <span className="font-medium text-foreground block">{option.label}</span>
                  <span className="text-sm text-muted-foreground">{option.desc}</span>
                </div>
                <span className="text-sm font-semibold text-saffron">{option.amount}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Preference */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Clock className="w-4 h-4 text-saffron" />
            Preferred Training Duration
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {durationOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onChange({ ...value, preferDuration: option.id })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center
                  ${value.preferDuration === option.id 
                    ? 'border-saffron bg-saffron/5 shadow-glow' 
                    : 'border-border hover:border-saffron/50'
                  }`}
              >
                <span className="text-2xl block mb-2">{option.icon}</span>
                <span className="text-sm font-medium text-foreground">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Relocation */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-saffron" />
            Can you relocate for education/work?
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onChange({ ...value, canRelocate: true })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-center
                ${value.canRelocate === true 
                  ? 'border-saffron bg-saffron/5 shadow-glow' 
                  : 'border-border hover:border-saffron/50'
                }`}
            >
              <span className="text-2xl block mb-2">✈️</span>
              <span className="font-medium text-foreground">Yes, I can relocate</span>
            </button>
            <button
              onClick={() => onChange({ ...value, canRelocate: false })}
              className={`p-4 rounded-xl border-2 transition-all duration-300 text-center
                ${value.canRelocate === false 
                  ? 'border-saffron bg-saffron/5 shadow-glow' 
                  : 'border-border hover:border-saffron/50'
                }`}
            >
              <span className="text-2xl block mb-2">🏠</span>
              <span className="font-medium text-foreground">Prefer local options</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
