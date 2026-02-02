import { useLanguage } from '@/contexts/LanguageContext';
import { UserCircle, Brain, Map, ArrowRight } from 'lucide-react';

export function FeaturesSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: UserCircle,
      title: t('features.step1.title'),
      description: t('features.step1.desc'),
      gradient: 'from-saffron to-warning',
    },
    {
      icon: Brain,
      title: t('features.step2.title'),
      description: t('features.step2.desc'),
      gradient: 'from-navy to-navy-light',
    },
    {
      icon: Map,
      title: t('features.step3.title'),
      description: t('features.step3.desc'),
      gradient: 'from-success to-chart-3',
    },
  ];

  return (
    <section id="features" className="section-padding bg-muted/30">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-saffron via-navy to-success opacity-30" />
          
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-sm font-bold text-muted-foreground">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
