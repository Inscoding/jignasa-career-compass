import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu, X, Compass } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function Navbar() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center shadow-md group-hover:shadow-glow transition-shadow">
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Margadarshi AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t('nav.home')}
            </Link>
            <a 
              href="#features" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t('nav.features')}
            </a>
            <a 
              href="#trust" 
              className="text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              {t('nav.about')}
            </a>
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Button 
              variant="gradient" 
              size="default"
              onClick={() => navigate('/onboarding')}
            >
              {t('nav.start')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="text-foreground font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <a 
                href="#features" 
                className="text-foreground font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.features')}
              </a>
              <a 
                href="#trust" 
                className="text-foreground font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.about')}
              </a>
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                <LanguageSwitcher />
                <Button 
                  variant="gradient"
                  className="flex-1"
                  onClick={() => {
                    navigate('/onboarding');
                    setIsOpen(false);
                  }}
                >
                  {t('nav.start')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
