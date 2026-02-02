import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export function ScoreCircle({ score, size = 'md', label }: ScoreCircleProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const sizes = {
    sm: { container: 'w-20 h-20', stroke: 4, text: 'text-lg' },
    md: { container: 'w-32 h-32', stroke: 6, text: 'text-3xl' },
    lg: { container: 'w-44 h-44', stroke: 8, text: 'text-5xl' },
  };

  const config = sizes[size];
  const radius = size === 'sm' ? 36 : size === 'md' ? 58 : 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  const getScoreColor = () => {
    if (score >= 80) return 'text-success stroke-success';
    if (score >= 60) return 'text-saffron stroke-saffron';
    return 'text-warning stroke-warning';
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${config.container}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          {/* Background Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={config.stroke}
            className="text-muted"
          />
          {/* Progress Circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            strokeWidth={config.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`transition-all duration-1000 ease-out ${getScoreColor()}`}
          />
        </svg>
        {/* Score Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold ${config.text} ${getScoreColor().split(' ')[0]}`}>
            {Math.round(animatedScore)}%
          </span>
          {label && size === 'lg' && (
            <span className="text-sm text-muted-foreground mt-1">{label}</span>
          )}
        </div>
      </div>
      {label && size !== 'lg' && (
        <span className="text-sm text-muted-foreground mt-2 text-center">{label}</span>
      )}
    </div>
  );
}
