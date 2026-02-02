import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin, Navigation } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LocationStepProps {
  value: { state: string; district: string; type: string };
  onChange: (value: { state: string; district: string; type: string }) => void;
}

const states = [
  'Andhra Pradesh', 'Telangana', 'Karnataka', 'Tamil Nadu', 'Maharashtra',
  'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Bihar', 'West Bengal',
  'Madhya Pradesh', 'Kerala', 'Punjab', 'Haryana', 'Odisha'
];

const areaTypes = [
  { id: 'rural', label: 'Rural Village', icon: '🏡', desc: 'Small village or gram panchayat' },
  { id: 'semi-urban', label: 'Semi-Urban', icon: '🏘️', desc: 'Town or taluk headquarters' },
  { id: 'urban', label: 'Urban', icon: '🏙️', desc: 'City or district headquarters' },
];

export function LocationStep({ value, onChange }: LocationStepProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
          {t('onboarding.location.title')}
        </h2>
        <p className="text-muted-foreground">
          {t('onboarding.location.subtitle')}
        </p>
      </div>

      <div className="max-w-xl mx-auto space-y-6">
        {/* State Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <MapPin className="w-4 h-4 text-saffron" />
            State / Union Territory
          </label>
          <select
            value={value.state}
            onChange={(e) => onChange({ ...value, state: e.target.value })}
            className="w-full h-12 px-4 rounded-xl border-2 border-border bg-background text-foreground focus:border-saffron focus:outline-none transition-colors"
          >
            <option value="">Select your state</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* District Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Navigation className="w-4 h-4 text-saffron" />
            District / City
          </label>
          <Input
            value={value.district}
            onChange={(e) => onChange({ ...value, district: e.target.value })}
            placeholder="Enter your district or nearest city"
            className="h-12 rounded-xl border-2 focus:border-saffron"
          />
        </div>

        {/* Area Type */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Area Type</label>
          <div className="grid grid-cols-3 gap-3">
            {areaTypes.map((area) => (
              <button
                key={area.id}
                onClick={() => onChange({ ...value, type: area.id })}
                className={`p-4 rounded-xl border-2 transition-all duration-300 text-center
                  ${value.type === area.id 
                    ? 'border-saffron bg-saffron/5 shadow-glow' 
                    : 'border-border hover:border-saffron/50'
                  }`}
              >
                <span className="text-2xl block mb-2">{area.icon}</span>
                <span className="text-sm font-medium text-foreground block">{area.label}</span>
                <span className="text-xs text-muted-foreground">{area.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
