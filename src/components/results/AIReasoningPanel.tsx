import { useLanguage } from '@/contexts/LanguageContext';
import { Brain, Lightbulb, AlertCircle, CheckCircle } from 'lucide-react';

interface AIReasoningPanelProps {
  reasoning: {
    summary: string;
    strengths: string[];
    considerations: string[];
    localInsight: string;
  };
  careerTitle: string;
}

export function AIReasoningPanel({ reasoning, careerTitle }: AIReasoningPanelProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-br from-navy via-navy to-navy-light rounded-2xl p-6 sm:p-8 text-secondary-foreground">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-saffron flex items-center justify-center">
          <Brain className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{t('results.aiReasoning')}</h3>
          <p className="text-secondary-foreground/70 text-sm">Why {careerTitle} suits you</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-secondary-foreground/5 rounded-xl p-5 mb-6 border border-secondary-foreground/10">
        <p className="text-secondary-foreground/90 leading-relaxed">
          {reasoning.summary}
        </p>
      </div>

      {/* Strengths & Considerations */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        {/* Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="font-semibold">Why You'll Succeed</span>
          </div>
          <ul className="space-y-2">
            {reasoning.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground/80">
                <span className="text-success mt-0.5">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Considerations */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-5 h-5 text-warning" />
            <span className="font-semibold">Things to Consider</span>
          </div>
          <ul className="space-y-2">
            {reasoning.considerations.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground/80">
                <span className="text-warning mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Local Insight */}
      <div className="bg-saffron/20 rounded-xl p-5 border border-saffron/30">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-saffron" />
          <span className="font-semibold text-saffron">Local Opportunity Insight</span>
        </div>
        <p className="text-sm text-secondary-foreground/90">
          {reasoning.localInsight}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-secondary-foreground/50 mt-6 text-center">
        This analysis is AI-generated based on your profile. Actual outcomes may vary based on individual effort and market conditions.
      </p>
    </div>
  );
}
