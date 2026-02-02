import { useLanguage } from '@/contexts/LanguageContext';
import { Check, Circle, BookOpen, Award, Briefcase, Target } from 'lucide-react';

interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  type: 'education' | 'skill' | 'experience' | 'goal';
}

interface CareerRoadmapProps {
  steps: RoadmapStep[];
  careerTitle: string;
}

const stepIcons = {
  education: BookOpen,
  skill: Target,
  experience: Briefcase,
  goal: Award,
};

const stepColors = {
  education: 'bg-navy',
  skill: 'bg-saffron',
  experience: 'bg-success',
  goal: 'hero-gradient',
};

export function CareerRoadmap({ steps, careerTitle }: CareerRoadmapProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
      <h3 className="text-xl font-bold text-foreground mb-2">{t('results.roadmap')}</h3>
      <p className="text-muted-foreground mb-8">Your step-by-step path to becoming a {careerTitle}</p>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-saffron via-navy to-success" />

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const Icon = stepIcons[step.type];
            return (
              <div key={index} className="relative flex gap-6 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Icon */}
                <div className={`relative z-10 w-12 h-12 rounded-xl ${stepColors[step.type]} flex items-center justify-center shrink-0`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-muted/30 rounded-xl p-5 border border-border/50">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="font-semibold text-foreground">{step.title}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-saffron/10 text-saffron font-medium shrink-0">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
