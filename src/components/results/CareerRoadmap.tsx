import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Award, Briefcase, Target } from 'lucide-react';
import { RoadmapStep } from '@/lib/careerData';

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
    <div className="bg-card rounded-xl border border-border p-5 sm:p-6">
      <h3 className="heading-md mb-1">{t('results.roadmap')}</h3>
      <p className="body-text mb-5">Your path to becoming a {careerTitle}</p>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-success" />

        {/* Steps */}
        <div className="space-y-5">
          {steps.map((step, index) => {
            const Icon = stepIcons[step.type];
            return (
              <div key={`${careerTitle}-step-${index}`} className="relative flex gap-4 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                {/* Icon */}
                <div className={`relative z-10 w-10 h-10 rounded-lg ${stepColors[step.type]} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>

                {/* Content */}
                <div className="flex-1 bg-muted/30 rounded-lg p-4 border border-border/50">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h4 className="heading-sm text-sm">{step.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium shrink-0">
                      {step.duration}
                    </span>
                  </div>
                  <p className="caption-text leading-relaxed">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
