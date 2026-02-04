import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, Compass, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HeroSection() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: '50,000+', label: t('hero.students') },
    { icon: Compass, value: '200+', label: t('hero.careers') },
    { icon: Globe, value: '3', label: t('hero.languages') },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-saffron-light via-background to-background" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-saffron/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-navy/5 rounded-full blur-3xl" />
      
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-wide relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-saffron/10 border border-saffron/20 text-saffron-dark text-sm font-medium mb-6 animate-fade-in-up">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              {t('hero.badge')}
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in-up stagger-1">
              {t('hero.title')}
              <span className="block text-gradient">{t('hero.titleHighlight')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 animate-fade-in-up stagger-2">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up stagger-3">
              <Button 
                variant="gradient" 
                size="xl"
                onClick={() => navigate('/onboarding')}
                className="group"
              >
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t('hero.secondary')}
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-12 animate-fade-in-up stagger-4">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                    <stat.icon className="w-5 h-5 text-saffron" />
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="relative hidden lg:block animate-fade-in-up stagger-5">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-card rounded-2xl shadow-card-hover p-6 border border-border/50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl hero-gradient flex items-center justify-center">
                    <Compass className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Career Match Found</h3>
                    <p className="text-sm text-muted-foreground">Based on your profile</p>
                  </div>
                </div>
                
                {/* Score Display */}
                <div className="bg-accent rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-foreground">Software Developer</span>
                    <span className="text-lg font-bold text-saffron">87%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full hero-gradient rounded-full" style={{ width: '87%' }} />
                  </div>
                </div>

                {/* Mini Breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Academic', value: 92 },
                    { label: 'Skills', value: 85 },
                    { label: 'Interest', value: 88 },
                    { label: 'Local Jobs', value: 82 },
                  ].map((item, i) => (
                    <div key={i} className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">{item.value}%</div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-3 -right-3 bg-success text-success-foreground px-3 py-1.5 rounded-lg shadow-lg font-medium text-xs float">
                ✓ Government Jobs Available
              </div>
              <div className="absolute -bottom-3 -left-3 bg-card border border-border shadow-lg px-3 py-1.5 rounded-lg float" style={{ animationDelay: '1s' }}>
                <span className="text-xs text-muted-foreground">Nearby: </span>
                <span className="text-xs font-medium text-foreground">Hyderabad, Warangal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
