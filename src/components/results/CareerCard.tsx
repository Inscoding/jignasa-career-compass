import { ScoreCircle } from './ScoreCircle';
import { Briefcase, Clock, IndianRupee, ChevronRight, Building, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LocationPopover } from '@/components/LocationPopover';

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
  stateName: string;
  rank: number;
  onSelect: () => void;
  isSelected?: boolean;
}

const typeConfig = {
  government: { icon: Building, label: 'Govt', color: 'bg-secondary text-secondary-foreground' },
  private: { icon: Briefcase, label: 'Private', color: 'bg-primary text-primary-foreground' },
  'self-employed': { icon: Store, label: 'Self', color: 'bg-success text-success-foreground' },
};

export function CareerCard({ career, stateName, rank, onSelect, isSelected }: CareerCardProps) {
  const TypeIcon = typeConfig[career.type].icon;

  return (
    <div 
      className={`bg-card rounded-xl border transition-all duration-200 overflow-hidden
        ${isSelected 
          ? 'border-primary shadow-md ring-1 ring-primary/20' 
          : 'border-border hover:border-primary/40 hover:shadow-sm'
        }`}
    >
      {/* Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-xs font-bold text-primary">#{rank}</span>
              <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${typeConfig[career.type].color}`}>
                <TypeIcon className="w-2.5 h-2.5" />
                {typeConfig[career.type].label}
              </span>
            </div>
            <h3 className="text-base font-semibold text-foreground leading-tight mb-1 truncate">{career.title}</h3>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{career.description}</p>
          </div>
          <ScoreCircle score={career.matchScore} size="sm" />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-3.5 h-3.5 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground block">Salary</span>
              <span className="text-xs font-medium text-foreground truncate block">{career.salaryRange}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] text-muted-foreground block">Timeline</span>
              <span className="text-xs font-medium text-foreground truncate block">{career.timeToAchieve}</span>
            </div>
          </div>
        </div>

        {/* Breakdown Mini */}
        <div className="grid grid-cols-4 gap-1.5 mb-3">
          {[
            { label: 'Acad', value: career.breakdown.academic },
            { label: 'Skill', value: career.breakdown.skill },
            { label: 'Int', value: career.breakdown.interest },
            { label: 'Local', value: career.breakdown.opportunity },
          ].map((item, i) => (
            <div key={i} className="text-center py-1.5 px-1 bg-muted/50 rounded">
              <div className="text-xs font-bold text-foreground">{item.value}%</div>
              <div className="text-[9px] text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Locations with Popover */}
        <div className="mb-3">
          <LocationPopover 
            stateName={stateName} 
            locations={career.nearbyLocations} 
            variant="compact"
          />
        </div>

        {/* Action */}
        <Button 
          variant={isSelected ? 'gradient' : 'outline'}
          size="sm"
          className="w-full h-8 text-xs"
          onClick={onSelect}
        >
          {isSelected ? 'View Full Roadmap ↓' : 'Select Career'}
          <ChevronRight className="w-3.5 h-3.5 ml-1" />
        </Button>
      </div>
    </div>
  );
}
