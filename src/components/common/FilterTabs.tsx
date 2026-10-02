import React from 'react';
import { cn } from '../../utils/cn';

interface FilterTabsProps {
  options: string[];
  activeOption: string;
  onSelect: (option: string) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const FilterTabs: React.FC<FilterTabsProps> = ({
  options,
  activeOption,
  onSelect,
  className,
  size = 'md',
}) => {
  return (
    <div
      className={cn(
        'flex items-center gap-1 bg-[#18181B] border border-zinc-800 p-1 rounded-xl overflow-x-auto no-scrollbar',
        className
      )}
    >
      {options.map((option) => {
        const isActive = activeOption === option;
        return (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              'px-3.5 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all duration-200 text-xs sm:text-sm',
              isActive
                ? 'bg-[#202023] text-brand-400 border border-brand-500/30 shadow'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            )}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
