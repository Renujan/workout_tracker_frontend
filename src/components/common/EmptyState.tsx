import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-2xl bg-[#18181B] border border-zinc-800/80 my-4"
    >
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-brand-400 mb-4 shadow-inner">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-white mb-1">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-bold text-sm shadow-lg hover:shadow-brand-500/20 active:scale-95 transition-all"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};
