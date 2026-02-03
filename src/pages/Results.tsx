import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ScoreCircle } from '@/components/results/ScoreCircle';
import { CareerCard } from '@/components/results/CareerCard';
import { CareerRoadmap } from '@/components/results/CareerRoadmap';
import { AIReasoningPanel } from '@/components/results/AIReasoningPanel';
import { Sparkles, Download, ArrowLeft, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserProfile, generateCareerMatches, CareerMatch } from '@/lib/careerMatchingEngine';
import { generateCareerReport } from '@/lib/pdfGenerator';
import { toast } from '@/hooks/use-toast';

const Results = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number | null>(null);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Get user data from navigation state
  const userData = location.state?.userData as UserProfile | undefined;
  
  // Generate career matches based on user data
  const careerMatches = useMemo(() => {
    if (!userData) return [];
    return generateCareerMatches(userData);
  }, [userData]);
  
  // Selected career details
  const selectedCareer = selectedCareerIndex !== null ? careerMatches[selectedCareerIndex] : null;
  
  // Simulate loading for analysis effect
  useEffect(() => {
    if (userData) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        // Auto-select first career after loading
        if (careerMatches.length > 0) {
          setSelectedCareerIndex(0);
        }
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [userData, careerMatches.length]);
  
  // Handle career selection
  const handleSelectCareer = (index: number) => {
    setSelectedCareerIndex(index);
    // Scroll to roadmap section
    setTimeout(() => {
      document.getElementById('roadmap-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };
  
  // Handle PDF download
  const handleDownloadReport = async () => {
    if (!userData || !selectedCareer) {
      toast({
        title: "Cannot generate report",
        description: "Please select a career first",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingReport(true);
    
    try {
      await generateCareerReport({
        profile: userData,
        matches: careerMatches,
        selectedCareer: selectedCareer,
        generatedAt: new Date()
      });
      
      toast({
        title: "Report downloaded!",
        description: "Your personalized career report has been saved.",
      });
    } catch (error) {
      console.error('Error generating report:', error);
      toast({
        title: "Error generating report",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingReport(false);
    }
  };
  
  // If no user data, show message to complete assessment
  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-warning mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">No Assessment Data Found</h2>
          <p className="text-muted-foreground mb-6">
            Please complete the career assessment first to see your personalized recommendations.
          </p>
          <Button variant="gradient" onClick={() => navigate('/onboarding')}>
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full hero-gradient flex items-center justify-center mx-auto mb-6 pulse-glow">
            <Sparkles className="w-12 h-12 text-primary-foreground animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Finalizing Results</h2>
          <p className="text-muted-foreground mb-4">Preparing your personalized career recommendations...</p>
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-saffron" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container-wide flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl hero-gradient flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">JIGNASA</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" onClick={() => navigate('/onboarding')}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-saffron-light via-background to-background py-12 mb-12">
          <div className="container-wide text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 animate-fade-in">
              {t('results.title')}
            </h1>
            <p className="text-muted-foreground mb-8 animate-fade-in stagger-1">
              {t('results.subtitle')}
            </p>
            
            {/* Main Score - shows selected career score or top match */}
            <div className="animate-scale-in stagger-2">
              <ScoreCircle 
                score={selectedCareer?.matchScore ?? careerMatches[0]?.matchScore ?? 0} 
                size="lg" 
                label={selectedCareer ? `${selectedCareer.career.title}` : t('results.matchScore')} 
              />
            </div>
            
            {/* User context summary */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-saffron/10 text-saffron">
                {userData.education === '10th' ? '10th Standard' : 
                 userData.education === '12th' ? '12th Standard' : 
                 userData.education === 'graduate' ? 'Graduate' : 'Post Graduate'}
              </span>
              <span className="px-3 py-1 rounded-full bg-navy/10 text-navy">
                {userData.location.state}
              </span>
              <span className="px-3 py-1 rounded-full bg-success/10 text-success">
                {userData.interests.slice(0, 2).join(', ')}
              </span>
            </div>
          </div>
        </section>

        <div className="container-wide">
          {/* Career Cards */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-2">Top Career Matches</h2>
            <p className="text-muted-foreground mb-6">
              Based on your profile, interests, and local opportunities. Click on a career to see the full roadmap.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {careerMatches.slice(0, 6).map((match, index) => (
                <CareerCard
                  key={match.career.id}
                  career={{
                    title: match.career.title,
                    matchScore: match.matchScore,
                    breakdown: match.breakdown,
                    salaryRange: match.career.salaryRange.display,
                    timeToAchieve: match.career.timeToAchieve,
                    type: match.career.type,
                    nearbyLocations: match.nearbyLocations,
                    description: match.career.description
                  }}
                  rank={index + 1}
                  isSelected={selectedCareerIndex === index}
                  onSelect={() => handleSelectCareer(index)}
                />
              ))}
            </div>
          </section>

          {/* Detailed View - Only show when career is selected */}
          {selectedCareer && (
            <div id="roadmap-section" className="grid lg:grid-cols-2 gap-8 mb-12 animate-fade-in">
              {/* Roadmap */}
              <CareerRoadmap 
                steps={selectedCareer.career.roadmap} 
                careerTitle={selectedCareer.career.title} 
              />

              {/* AI Reasoning */}
              <AIReasoningPanel
                reasoning={selectedCareer.personalizedReasoning}
                careerTitle={selectedCareer.career.title}
              />
            </div>
          )}
          
          {/* Prompt to select if no selection */}
          {!selectedCareer && (
            <div className="text-center py-12 mb-12 bg-muted/30 rounded-2xl border border-border/50">
              <Sparkles className="w-12 h-12 text-saffron mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select a Career to View Full Roadmap
              </h3>
              <p className="text-muted-foreground">
                Click on any career card above to see the step-by-step roadmap and AI reasoning.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              variant="gradient" 
              size="lg" 
              className="gap-2"
              onClick={handleDownloadReport}
              disabled={!selectedCareer || isGeneratingReport}
            >
              {isGeneratingReport ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  {t('results.download')}
                </>
              )}
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
          
          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-8 max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> This AI-generated guidance is based on the information you provided. 
            Actual career outcomes depend on individual effort, market conditions, and opportunities. 
            We recommend consulting with career counselors and industry professionals.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-8 border-t border-border">
        <div className="container-wide text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 JIGNASA. Made with ❤️ for Rural India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Results;
