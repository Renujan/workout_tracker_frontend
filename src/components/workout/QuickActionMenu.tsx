import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Utensils, Scale, Dumbbell, X } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const QuickActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const {
    isQuickActionOpen,
    setIsQuickActionOpen,
    setIsLogFoodModalOpen,
    setIsLogWeightModalOpen,
  } = useApp();

  if (!isQuickActionOpen) return null;

  const actions = [
    {
      title: 'Start Workout',
      description: 'Resume Push Day or pick a plan',
      icon: <Play className="w-5 h-5 text-brand-400 fill-brand-400" />,
      color: 'bg-brand-500/10 border-brand-500/40 text-brand-400',
      onClick: () => {
        setIsQuickActionOpen(false);
        navigate('/workout/active');
      },
    },
    {
      title: 'Log Food & Protein',
      description: 'Track meal calories & protein',
      icon: <Utensils className="w-5 h-5 text-emerald-400" />,
      color: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
      onClick: () => {
        setIsQuickActionOpen(false);
        setIsLogFoodModalOpen(true);
      },
    },
    {
      title: 'Log Weight',
      description: 'Record today’s body weight',
      icon: <Scale className="w-5 h-5 text-sky-400" />,
      color: 'bg-sky-500/10 border-sky-500/40 text-sky-400',
      onClick: () => {
        setIsQuickActionOpen(false);
        setIsLogWeightModalOpen(true);
      },
    },
    {
      title: 'Add / Explore Exercise',
      description: 'Search 100+ exercise library',
      icon: <Dumbbell className="w-5 h-5 text-amber-400" />,
      color: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
      onClick: () => {
        setIsQuickActionOpen(false);
        navigate('/exercises');
      },
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsQuickActionOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-sm bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-2xl z-10 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-800">
            <div>
              <h3 className="font-bold text-white text-lg">Quick Actions</h3>
              <p className="text-xs text-zinc-400">Choose what to log or start</p>
            </div>
            <button
              onClick={() => setIsQuickActionOpen(false)}
              className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {actions.map((action, idx) => (
              <motion.button
                key={action.title}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className="w-full flex items-center gap-4 p-3.5 rounded-2xl bg-[#202023] hover:bg-zinc-800 border border-zinc-800/80 transition-all text-left group"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center border ${action.color} group-hover:scale-105 transition-transform`}
                >
                  {action.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-brand-400 transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-xs text-zinc-400">{action.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
