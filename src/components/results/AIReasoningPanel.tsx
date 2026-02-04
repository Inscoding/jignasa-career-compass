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
    <div className="bg-gradient-to-br from-secondary via-secondary to-secondary/90 rounded-xl p-5 sm:p-6 text-secondary-foreground">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <Brain className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-base font-semibold">{t('results.aiReasoning')}</h3>
          <p className="text-secondary-foreground/70 text-xs">Why {careerTitle} suits you</p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-secondary-foreground/5 rounded-lg p-4 mb-5 border border-secondary-foreground/10">
        <p className="text-sm text-secondary-foreground/90 leading-relaxed">
          {reasoning.summary}
        </p>
      </div>

      {/* Strengths & Considerations */}
      <div className="grid sm:grid-cols-2 gap-4 mb-5">
        {/* Strengths */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-sm font-medium">Why You'll Succeed</span>
          </div>
          <ul className="space-y-1.5">
            {reasoning.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-secondary-foreground/80">
                <span className="text-success mt-0.5">•</span>
                {strength}
              </li>
            ))}
          </ul>
        </div>

        {/* Considerations */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-warning" />
            <span className="text-sm font-medium">Things to Consider</span>
          </div>
          <ul className="space-y-1.5">
            {reasoning.considerations.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-secondary-foreground/80">
                <span className="text-warning mt-0.5">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Local Insight */}
      <div className="bg-primary/20 rounded-lg p-4 border border-primary/30">
        <div className="flex items-center gap-2 mb-1.5">
          <Lightbulb className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Local Opportunity</span>
        </div>
        <p className="text-xs text-secondary-foreground/90 leading-relaxed">
          {reasoning.localInsight}
        </p>
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-secondary-foreground/50 mt-4 text-center">
        AI-generated analysis based on your profile. Outcomes vary by effort and market.
      </p>
    </div>
  );
}
