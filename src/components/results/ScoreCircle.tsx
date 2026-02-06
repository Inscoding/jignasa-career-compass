import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function ScoreCircle({ score, size = 'md', label }: ScoreCircleProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const sizes = {
    sm: { container: 'w-14 h-14', stroke: 3, text: 'text-sm', labelText: 'text-[9px]' },
    md: { container: 'w-24 h-24', stroke: 4, text: 'text-xl', labelText: 'text-xs' },
    lg: { container: 'w-32 h-32', stroke: 5, text: 'text-3xl', labelText: 'text-sm' },
  };

  const config = sizes[size];
  const radius = size === 'sm' ? 24 : size === 'md' ? 42 : 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 200);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return 'text-success stroke-success';
    if (score >= 60) return 'text-primary stroke-primary';
    return 'text-warning stroke-warning';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${config.container} overflow-hidden`}>
        <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-muted"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-700 ease-out ${getScoreColor()}`}
          />
        </svg>
        {/* Score Text - highest z-index, perfectly centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span className={`font-bold ${config.text} ${getScoreColor().split(' ')[0]} relative`}>
            {Math.round(animatedScore)}%
          </span>
        </div>
      </div>
      {label && (
        <span className={`${config.labelText} text-muted-foreground mt-1.5 text-center max-w-[120px] leading-tight truncate`}>
          {label}
        </span>
      )}
    </div>
  );
}
