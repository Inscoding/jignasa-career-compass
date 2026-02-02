import { useLanguage } from '@/contexts/LanguageContext';
import { Slider } from '@/components/ui/slider';

interface SubjectsStepProps {
  value: Record<string, number>;
  onChange: (value: Record<string, number>) => void;
}

const subjects = [
  { id: 'mathematics', label: 'Mathematics', emoji: '📐' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'languages', label: 'Languages', emoji: '📚' },
  { id: 'social', label: 'Social Studies', emoji: '🌍' },
  { id: 'computers', label: 'Computers', emoji: '💻' },
  { id: 'arts', label: 'Arts & Crafts', emoji: '🎨' },
];

export function SubjectsStep({ value, onChange }: SubjectsStepProps) {
  const { t } = useLanguage();

  const handleChange = (subjectId: string, newValue: number[]) => {
    onChange({ ...value, [subjectId]: newValue[0] });
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    return 'Needs Work';
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-saffron';
    if (score >= 40) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {t('onboarding.subjects.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.subjects.subtitle')}
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {subjects.map((subject) => {
          const score = value[subject.id] || 50;
          return (
            <div 
              key={subject.id}
              className="bg-card rounded-xl p-5 border border-border/50"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{subject.emoji}</span>
                  <span className="font-medium text-foreground">{subject.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground">{score}%</span>
                  <span className={`block text-xs ${getPerformanceColor(score)}`}>
                    {getPerformanceLabel(score)}
                  </span>
                </div>
              </div>
              <Slider
                value={[score]}
                onValueChange={(val) => handleChange(subject.id, val)}
                max={100}
                step={5}
                className="w-full"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
