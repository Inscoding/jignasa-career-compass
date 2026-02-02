import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

interface InterestsStepProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const interests = [
  { id: 'technology', label: 'Technology', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
  { id: 'healthcare', label: 'Healthcare', emoji: '⚕️', color: 'from-red-500 to-pink-500' },
  { id: 'education', label: 'Education', emoji: '📚', color: 'from-amber-500 to-orange-500' },
  { id: 'business', label: 'Business', emoji: '💼', color: 'from-emerald-500 to-teal-500' },
  { id: 'creative', label: 'Creative Arts', emoji: '🎨', color: 'from-purple-500 to-violet-500' },
  { id: 'agriculture', label: 'Agriculture', emoji: '🌾', color: 'from-lime-500 to-green-500' },
  { id: 'engineering', label: 'Engineering', emoji: '⚙️', color: 'from-slate-500 to-zinc-600' },
  { id: 'government', label: 'Government', emoji: '🏛️', color: 'from-indigo-500 to-blue-600' },
  { id: 'sports', label: 'Sports', emoji: '⚽', color: 'from-orange-500 to-red-500' },
  { id: 'hospitality', label: 'Hospitality', emoji: '🏨', color: 'from-rose-500 to-pink-500' },
  { id: 'media', label: 'Media', emoji: '📺', color: 'from-fuchsia-500 to-purple-500' },
  { id: 'social', label: 'Social Work', emoji: '🤝', color: 'from-sky-500 to-blue-500' },
];

export function InterestsStep({ value, onChange }: InterestsStepProps) {
  const { t } = useLanguage();

  const toggleInterest = (id: string) => {
    if (value.includes(id)) {
      onChange(value.filter(i => i !== id));
    } else if (value.length < 5) {
      onChange([...value, id]);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {t('onboarding.interests.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.interests.subtitle')}
          <span className="ml-2 text-saffron font-medium">(Select up to 5)</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
        {interests.map((interest) => {
          const isSelected = value.includes(interest.id);
          return (
            <button
              key={interest.id}
              onClick={() => toggleInterest(interest.id)}
              disabled={!isSelected && value.length >= 5}
              className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-center
                ${isSelected 
                  ? 'border-saffron bg-saffron/5 shadow-glow' 
                  : 'border-border hover:border-saffron/50 hover:bg-accent/50 disabled:opacity-50 disabled:cursor-not-allowed'
                }`}
            >
              <span className="text-3xl block mb-2">{interest.emoji}</span>
              <span className="text-sm font-medium text-foreground">{interest.label}</span>
              
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full hero-gradient flex items-center justify-center">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected count */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted text-sm">
          <span className="font-medium text-foreground">{value.length}</span>
          <span className="text-muted-foreground">/ 5 selected</span>
        </span>
      </div>
    </div>
  );
}
