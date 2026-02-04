import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  return (
    <div className="w-full px-4 sm:px-0">
      {/* Step Indicators with connecting line */}
      <div className="relative">
        {/* Background line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border" />
        
        {/* Progress line */}
        <div 
          className="absolute top-4 left-0 h-0.5 bg-primary transition-all duration-500 ease-out"
          style={{ 
            width: `${currentStep === 0 ? 0 : (currentStep / (totalSteps - 1)) * 100}%`
          }}
        />
        
        {/* Step circles */}
        <div className="relative flex justify-between">
          {labels.map((label, index) => {
            const isComplete = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div 
                key={index}
                className="flex flex-col items-center"
                style={{ width: `${100 / totalSteps}%` }}
              >
                {/* Circle */}
                <div 
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2
                    ${isComplete 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isCurrent 
                        ? 'bg-background border-primary text-primary shadow-sm' 
                        : 'bg-muted border-border text-muted-foreground'
                    }`}
                >
                  {isComplete ? (
                    <Check className="w-4 h-4" strokeWidth={2.5} />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>
                
                {/* Label */}
                <span 
                  className={`mt-2 text-[10px] sm:text-xs font-medium text-center leading-tight transition-colors
                    ${isCurrent 
                      ? 'text-primary' 
                      : isComplete 
                        ? 'text-foreground' 
                        : 'text-muted-foreground'
                    }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
