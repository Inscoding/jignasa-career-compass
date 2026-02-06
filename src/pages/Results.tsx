import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ScoreCircle } from '@/components/results/ScoreCircle';
import { CareerCard } from '@/components/results/CareerCard';
import { CareerRoadmap } from '@/components/results/CareerRoadmap';
import { AIReasoningPanel } from '@/components/results/AIReasoningPanel';
import { Compass, Download, ArrowLeft, RefreshCw, Loader2, AlertCircle } from 'lucide-react';
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
            <Compass className="w-12 h-12 text-primary-foreground animate-pulse" />
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
              <Compass className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Margadarshi AI</span>
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
      <main className="pt-20 pb-12">
        {/* Hero Section - Compact and balanced */}
        <section className="bg-gradient-to-br from-saffron-light via-background to-background py-6 sm:py-8 mb-8">
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
              {/* Score Circle */}
              <div className="animate-scale-in shrink-0">
                <ScoreCircle 
                  score={selectedCareer?.matchScore ?? careerMatches[0]?.matchScore ?? 0} 
                  size="md" 
                  label={selectedCareer ? selectedCareer.career.title : t('results.matchScore')} 
                />
              </div>
              
              {/* Content */}
              <div className="text-center lg:text-left flex-1 max-w-xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1.5 animate-fade-in">
                  {t('results.title')}
                </h1>
                <p className="text-sm text-muted-foreground mb-4 animate-fade-in stagger-1">
                  {t('results.subtitle')}
                </p>
                
                {/* User context badges - single row */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 animate-fade-in stagger-2">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {userData.education === '10th' ? '10th Std' : 
                     userData.education === '12th' ? '12th Std' : 
                     userData.education === 'graduate' ? 'Graduate' : 'PG'}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-medium">
                    {userData.location.state}
                  </span>
                  {userData.interests.slice(0, 2).map((interest, i) => (
                    <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container-wide">
          {/* Career Cards */}
          <section className="mb-10">
            <div className="mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1">Top Career Matches</h2>
              <p className="text-sm text-muted-foreground">
                Based on your profile, interests, and local opportunities.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
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
                  stateName={userData.location.state}
                  rank={index + 1}
                  isSelected={selectedCareerIndex === index}
                  onSelect={() => handleSelectCareer(index)}
                />
              ))}
            </div>
          </section>

          {/* Detailed View - Only show when career is selected */}
          {selectedCareer && (
            <div id="roadmap-section" className="grid lg:grid-cols-2 gap-5 mb-10 animate-fade-in">
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
            <div className="text-center py-8 sm:py-10 mb-10 bg-muted/30 rounded-xl border border-border/50">
              <Compass className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="heading-sm mb-1.5">
                Select a Career to View Full Roadmap
              </h3>
              <p className="body-text">
                Click on any career card above to see details and AI reasoning.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button 
              variant="gradient" 
              size="default" 
              className="gap-2 h-10"
              onClick={handleDownloadReport}
              disabled={!selectedCareer || isGeneratingReport}
            >
              {isGeneratingReport ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  {t('results.download')}
                </>
              )}
            </Button>
            <Button variant="outline" size="default" className="h-10" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          
          {/* Disclaimer */}
          <p className="caption-text text-center mt-6 max-w-xl mx-auto leading-relaxed">
            <strong>Disclaimer:</strong> This AI-generated guidance is based on your inputs. 
            Results depend on effort, market conditions, and opportunities. 
            Consult career counselors for personalized advice.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/30 py-6 border-t border-border">
        <div className="container-wide text-center">
          <p className="caption-text">
            © 2024 Margadarshi AI. Built for Career Guidance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Results;
