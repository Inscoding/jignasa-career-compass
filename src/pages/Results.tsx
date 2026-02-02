import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ScoreCircle } from '@/components/results/ScoreCircle';
import { CareerCard } from '@/components/results/CareerCard';
import { CareerRoadmap } from '@/components/results/CareerRoadmap';
import { AIReasoningPanel } from '@/components/results/AIReasoningPanel';
import { Sparkles, Download, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for demonstration
const mockCareers = [
  {
    title: 'Software Developer',
    matchScore: 87,
    breakdown: { academic: 92, skill: 85, interest: 88, opportunity: 82 },
    salaryRange: '₹4-12 LPA',
    timeToAchieve: '2-3 Years',
    type: 'private' as const,
    nearbyLocations: ['Hyderabad', 'Bangalore'],
    description: 'Build applications and solve problems using programming. High demand in IT hubs with growing remote work opportunities.',
  },
  {
    title: 'Bank Officer (IBPS PO)',
    matchScore: 82,
    breakdown: { academic: 88, skill: 78, interest: 80, opportunity: 85 },
    salaryRange: '₹5-8 LPA',
    timeToAchieve: '1-2 Years',
    type: 'government' as const,
    nearbyLocations: ['Local Branch', 'District HQ'],
    description: 'Manage banking operations, customer service, and financial transactions. Stable career with government benefits.',
  },
  {
    title: 'Agricultural Entrepreneur',
    matchScore: 75,
    breakdown: { academic: 70, skill: 80, interest: 78, opportunity: 90 },
    salaryRange: '₹3-10 LPA',
    timeToAchieve: '1-2 Years',
    type: 'self-employed' as const,
    nearbyLocations: ['Your Village', 'Nearby Mandal'],
    description: 'Start agri-business in organic farming, dairy, or processing. High local opportunity with government subsidies available.',
  },
];

const mockRoadmap = [
  {
    title: 'Complete Foundational Course',
    description: 'Enroll in free online programming courses (NPTEL, Coursera). Learn basics of Python or JavaScript.',
    duration: '3 Months',
    type: 'education' as const,
  },
  {
    title: 'Build Portfolio Projects',
    description: 'Create 3-5 small projects showcasing your skills. Use GitHub to store your code.',
    duration: '4 Months',
    type: 'skill' as const,
  },
  {
    title: 'Get Certified',
    description: 'Complete industry-recognized certification from Google, Microsoft, or AWS.',
    duration: '2 Months',
    type: 'education' as const,
  },
  {
    title: 'Internship/Apprenticeship',
    description: 'Apply for internships in local IT companies or remote positions. Focus on gaining real experience.',
    duration: '6 Months',
    type: 'experience' as const,
  },
  {
    title: 'Land Your First Job',
    description: 'Apply to entry-level positions. Target companies with training programs. Prepare for interviews.',
    duration: 'Ongoing',
    type: 'goal' as const,
  },
];

const mockReasoning = {
  summary: 'Based on your strong performance in mathematics and science, combined with your interest in technology, Software Development emerges as a highly suitable career path. Your location in Telangana provides excellent access to Hyderabad\'s thriving IT sector, and your ability to relocate further expands opportunities.',
  strengths: [
    'Strong analytical skills indicated by 85%+ in Mathematics',
    'Natural inclination towards problem-solving',
    'Interest alignment with technology sector',
    'Proximity to major IT hub (Hyderabad)',
  ],
  considerations: [
    'Initial investment needed for laptop/internet',
    'Continuous learning required in fast-changing field',
    'Competition is high - focus on specialization',
  ],
  localInsight: 'Telangana\'s IT policy offers special incentives for rural youth entering tech. TASK (Telangana Academy for Skill and Knowledge) provides subsidized training. Multiple IT companies have offices in Warangal, reducing need for immediate relocation to Hyderabad.',
};

const Results = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedCareer, setSelectedCareer] = useState(0);

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
            
            {/* Main Score */}
            <div className="animate-scale-in stagger-2">
              <ScoreCircle 
                score={mockCareers[selectedCareer].matchScore} 
                size="lg" 
                label={t('results.matchScore')} 
              />
            </div>
          </div>
        </section>

        <div className="container-wide">
          {/* Career Cards */}
          <section className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-6">Top Career Matches</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mockCareers.map((career, index) => (
                <CareerCard
                  key={index}
                  career={career}
                  rank={index + 1}
                  isSelected={selectedCareer === index}
                  onSelect={() => setSelectedCareer(index)}
                />
              ))}
            </div>
          </section>

          {/* Detailed View */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Roadmap */}
            <CareerRoadmap 
              steps={mockRoadmap} 
              careerTitle={mockCareers[selectedCareer].title} 
            />

            {/* AI Reasoning */}
            <AIReasoningPanel
              reasoning={mockReasoning}
              careerTitle={mockCareers[selectedCareer].title}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gradient" size="lg" className="gap-2">
              <Download className="w-5 h-5" />
              {t('results.download')}
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/')}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </div>
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
