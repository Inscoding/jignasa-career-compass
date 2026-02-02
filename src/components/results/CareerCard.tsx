import { ScoreCircle } from './ScoreCircle';
import { Briefcase, Clock, MapPin, IndianRupee, ChevronRight, Building, User, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CareerCardProps {
  career: {
    title: string;
    matchScore: number;
    breakdown: {
      academic: number;
      skill: number;
      interest: number;
      opportunity: number;
    };
    salaryRange: string;
    timeToAchieve: string;
    type: 'government' | 'private' | 'self-employed';
    nearbyLocations: string[];
    description: string;
  };
  rank: number;
  onSelect: () => void;
  isSelected?: boolean;
}

const typeConfig = {
  government: { icon: Building, label: 'Government', color: 'bg-navy text-secondary-foreground' },
  private: { icon: Briefcase, label: 'Private Sector', color: 'bg-saffron text-primary-foreground' },
  'self-employed': { icon: Store, label: 'Self-Employment', color: 'bg-success text-success-foreground' },
};

export function CareerCard({ career, rank, onSelect, isSelected }: CareerCardProps) {
  const TypeIcon = typeConfig[career.type].icon;

  return (
    <div 
      className={`bg-card rounded-2xl border-2 transition-all duration-300 overflow-hidden
        ${isSelected 
          ? 'border-saffron shadow-glow' 
          : 'border-border hover:border-saffron/50 hover:shadow-lg'
        }`}
    >
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-bold text-saffron">#{rank}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeConfig[career.type].color}`}>
                <TypeIcon className="w-3 h-3 inline mr-1" />
                {typeConfig[career.type].label}
              </span>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">{career.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{career.description}</p>
          </div>
          <ScoreCircle score={career.matchScore} size="sm" />
        </div>
      </div>

      {/* Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-4 h-4 text-saffron" />
            <div>
              <span className="text-xs text-muted-foreground block">Salary Range</span>
              <span className="text-sm font-medium text-foreground">{career.salaryRange}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-saffron" />
            <div>
              <span className="text-xs text-muted-foreground block">Time to Achieve</span>
              <span className="text-sm font-medium text-foreground">{career.timeToAchieve}</span>
            </div>
          </div>
        </div>

        {/* Breakdown Mini */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {[
            { label: 'Academic', value: career.breakdown.academic },
            { label: 'Skill', value: career.breakdown.skill },
            { label: 'Interest', value: career.breakdown.interest },
            { label: 'Local', value: career.breakdown.opportunity },
          ].map((item, i) => (
            <div key={i} className="text-center p-2 bg-muted/50 rounded-lg">
              <div className="text-sm font-bold text-foreground">{item.value}%</div>
              <div className="text-[10px] text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Locations */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-saffron shrink-0" />
          <span className="text-sm text-muted-foreground truncate">
            Jobs near: {career.nearbyLocations.join(', ')}
          </span>
        </div>

        {/* Action */}
        <Button 
          variant={isSelected ? 'gradient' : 'outline'}
          className="w-full"
          onClick={onSelect}
        >
          {isSelected ? 'View Full Roadmap' : 'Select This Career'}
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
