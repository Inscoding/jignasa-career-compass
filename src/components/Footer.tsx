import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container-wide">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">JIGNASA</span>
            </div>
            <p className="text-background/70 max-w-md mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-background/60">
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@jignasa.in</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.links')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-background/70 hover:text-saffron transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <a href="#features" className="text-background/70 hover:text-saffron transition-colors">
                  {t('nav.features')}
                </a>
              </li>
              <li>
                <Link to="/onboarding" className="text-background/70 hover:text-saffron transition-colors">
                  {t('nav.start')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">{t('footer.support')}</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-background/70 hover:text-saffron transition-colors flex items-center gap-1">
                  {t('footer.contact')}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-saffron transition-colors">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="text-background/70 hover:text-saffron transition-colors">
                  {t('footer.terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/60">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-background/60">Powered by</span>
            <span className="text-sm font-semibold text-saffron">AI Intelligence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
