import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Smartphone, Eye, CheckCircle } from 'lucide-react';

export function TrustSection() {
  const { t } = useLanguage();

  const trustPoints = [
    {
      icon: Shield,
      title: t('trust.ethics'),
      description: t('trust.ethicsDesc'),
    },
    {
      icon: Smartphone,
      title: t('trust.accessible'),
      description: t('trust.accessibleDesc'),
    },
    {
      icon: Eye,
      title: t('trust.transparent'),
      description: t('trust.transparentDesc'),
    },
  ];

  const badges = [
    'Realistic Career Paths',
    'Local Opportunities',
    'Multilingual Support',
    'Privacy Protected',
    'No Over-Promising',
    'Step-by-Step Guidance',
  ];

  return (
    <section id="trust" className="section-padding bg-gradient-to-br from-navy via-navy to-navy-light text-secondary-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-wide relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            {t('trust.title')}
          </h2>
          <p className="text-lg text-secondary-foreground/80">
            {t('trust.subtitle')}
          </p>
        </div>

        {/* Trust Points */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {trustPoints.map((point, index) => (
            <div 
              key={index}
              className="bg-secondary-foreground/5 backdrop-blur-sm rounded-2xl p-8 border border-secondary-foreground/10 hover:border-saffron/50 transition-colors animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-saffron flex items-center justify-center mb-6">
                <point.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
              <p className="text-secondary-foreground/70 leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-foreground/10 border border-secondary-foreground/20"
            >
              <CheckCircle className="w-4 h-4 text-saffron" />
              <span className="text-sm font-medium">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
