interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  showPercentage?: boolean;
}

const ProgressRing = ({
  progress,
  size = 120,
  strokeWidth = 8,
  showPercentage = true,
}: ProgressRingProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.5))',
          }}
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(186, 100%, 50%)" />
            <stop offset="100%" stopColor="hsl(270, 60%, 60%)" />
          </linearGradient>
        </defs>
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-bold gradient-text">{Math.round(progress)}%</span>
          <span className="text-xs text-muted-foreground">Complete</span>
        </div>
      )}
    </div>
  );
};

export default ProgressRing;
