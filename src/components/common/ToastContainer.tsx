import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Trophy, AlertCircle, X, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
              toast.type === 'pr'
                ? 'bg-gradient-to-r from-amber-950/90 to-zinc-900/90 border-amber-500/50 text-amber-200'
                : toast.type === 'success'
                ? 'bg-zinc-900/90 border-brand-500/40 text-zinc-100'
                : toast.type === 'warning'
                ? 'bg-zinc-900/90 border-rose-500/40 text-zinc-100'
                : 'bg-zinc-900/90 border-zinc-700/60 text-zinc-100'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {toast.type === 'pr' ? (
                <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
              ) : toast.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-brand-400" />
              ) : toast.type === 'warning' ? (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              ) : (
                <Info className="w-5 h-5 text-sky-400" />
              )}
            </div>

            <div className="flex-1 text-sm">
              <h4 className="font-semibold leading-tight">{toast.title}</h4>
              {toast.description && (
                <p className="text-xs text-zinc-400 mt-1 leading-snug">{toast.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
