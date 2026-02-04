import { useState } from 'react';
import { MapPin, ChevronRight, Building2 } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getDistrictsForState, getMunicipalitiesForDistrict } from '@/lib/locationData';

interface LocationPopoverProps {
  stateName: string;
  locations: string[];
  variant?: 'default' | 'compact';
}

export function LocationPopover({ stateName, locations, variant = 'default' }: LocationPopoverProps) {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const districts = getDistrictsForState(stateName);
  
  const municipalities = selectedDistrict 
    ? getMunicipalitiesForDistrict(stateName, selectedDistrict)
    : [];

  const handleDistrictClick = (districtName: string) => {
    setSelectedDistrict(prev => prev === districtName ? null : districtName);
  };

  // If no state data, show simple text
  if (districts.length === 0) {
    return (
      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="truncate">Jobs near: {locations.join(', ')}</span>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button 
          className={`group flex items-center gap-1.5 text-left hover:text-foreground transition-colors ${
            variant === 'compact' ? 'text-xs' : 'text-sm'
          } text-muted-foreground`}
        >
          <MapPin className={`${variant === 'compact' ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-primary shrink-0`} />
          <span className="truncate group-hover:text-primary transition-colors">
            Jobs near: {locations.slice(0, 2).join(', ')}
            {locations.length > 2 && ` +${locations.length - 2}`}
          </span>
          <ChevronRight className={`${variant === 'compact' ? 'w-3 h-3' : 'w-3.5 h-3.5'} shrink-0 group-hover:translate-x-0.5 transition-transform`} />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-0 bg-card border-border shadow-lg" 
        align="start"
        sideOffset={8}
      >
        <div className="p-3 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">{stateName}</h4>
              <p className="text-xs text-muted-foreground">{districts.length} districts available</p>
            </div>
          </div>
        </div>
        
        <div className="max-h-64 overflow-y-auto">
          {districts.map((district) => (
            <div key={district.name} className="border-b border-border/50 last:border-0">
              <button
                onClick={() => handleDistrictClick(district.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-muted/50 transition-colors ${
                  selectedDistrict === district.name ? 'bg-primary/5' : ''
                }`}
              >
                <span className={`text-sm ${
                  selectedDistrict === district.name ? 'font-medium text-primary' : 'text-foreground'
                }`}>
                  {district.name}
                </span>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${
                  selectedDistrict === district.name ? 'rotate-90 text-primary' : ''
                }`} />
              </button>
              
              {selectedDistrict === district.name && municipalities.length > 0 && (
                <div className="bg-muted/30 px-3 py-2 space-y-1.5">
                  {municipalities.map((muni) => (
                    <div 
                      key={muni.name}
                      className="flex items-center gap-2 text-xs text-muted-foreground"
                    >
                      <Building2 className="w-3 h-3 text-primary/60" />
                      <span>{muni.name}</span>
                      <span className="px-1.5 py-0.5 rounded bg-muted text-[10px] uppercase tracking-wide">
                        {muni.type}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-2 border-t border-border bg-muted/20">
          <p className="text-[10px] text-muted-foreground text-center">
            Click district to view municipalities/mandals
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
