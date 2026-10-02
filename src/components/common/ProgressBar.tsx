import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  sublabel?: string;
  showPercentage?: boolean;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  sublabel,
  showPercentage = false,
  colorClass = 'from-brand-500 to-brand-bright',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {(label || sublabel || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-medium">
          <span className="text-zinc-300 font-semibold">{label}</span>
          <span className="text-zinc-400">
            {sublabel || (showPercentage ? `${percentage}%` : `${value}/${max}`)}
          </span>
        </div>
      )}
      <div className={cn('w-full bg-[#202023] rounded-full overflow-hidden p-0.5 border border-zinc-800/60', heightClasses[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={cn('h-full rounded-full bg-gradient-to-r', colorClass)}
        />
      </div>
    </div>
  );
};
