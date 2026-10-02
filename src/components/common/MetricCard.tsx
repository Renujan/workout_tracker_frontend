import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  icon?: ReactNode;
  progressPercent?: number;
  badgeText?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  progressPercent,
  badgeText,
  className,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'bg-[#18181B] border border-zinc-800/80 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between group hover:border-zinc-700/80 shadow-lg',
        className
      )}
    >
      {/* Background glowing gradient spot */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl group-hover:bg-brand-500/10 transition-colors" />

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-zinc-400">
          {title}
        </span>
        {icon && (
          <div className="w-9 h-9 rounded-xl bg-[#202023] border border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:text-brand-400 group-hover:border-brand-500/30 transition-colors">
            {icon}
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {value}
        </div>

        {trend && (
          <div className="flex items-center gap-1.5 text-xs font-medium pt-1">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-semibold',
                trend.isNeutral
                  ? 'bg-zinc-800 text-zinc-300'
                  : trend.isPositive !== false
                  ? 'bg-brand-500/15 text-brand-400'
                  : 'bg-rose-500/15 text-rose-400'
              )}
            >
              {trend.isPositive !== false && !trend.isNeutral && (
                <TrendingUp className="w-3 h-3 inline-block" />
              )}
              {trend.isPositive === false && (
                <TrendingDown className="w-3 h-3 inline-block" />
              )}
              {trend.value}
            </span>
            {subtitle && <span className="text-zinc-400 text-xs">{subtitle}</span>}
          </div>
        )}

        {!trend && subtitle && (
          <p className="text-xs text-zinc-400 mt-1 font-normal">{subtitle}</p>
        )}
      </div>

      {progressPercent !== undefined && (
        <div className="mt-4 pt-2 border-t border-zinc-800/60">
          <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
            <span className="text-zinc-400">Completion</span>
            <span className="text-brand-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-gradient-to-r from-brand-500 to-brand-bright h-full rounded-full"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};
