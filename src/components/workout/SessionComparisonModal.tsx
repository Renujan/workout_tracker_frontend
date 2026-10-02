import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const SessionComparisonModal: React.FC = () => {
  const { isSessionCompareOpen, setIsSessionCompareOpen } = useApp();

  return (
    <Modal
      isOpen={isSessionCompareOpen}
      onClose={() => setIsSessionCompareOpen(false)}
      title="Session Comparison"
      subtitle="Bench Press performance breakdown"
    >
      <div className="space-y-6">
        <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Progressive Overload Achieved!</h4>
            <p className="text-xs text-zinc-300">
              You increased your top set weight by +2.5 kg while maintaining rep target.
            </p>
          </div>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid grid-cols-2 gap-3">
          {/* Last Session */}
          <div className="bg-[#202023] border border-zinc-800 rounded-2xl p-4 text-center">
            <span className="text-[10px] uppercase font-extrabold text-zinc-400 tracking-wider block mb-1">
              LAST SESSION (Sep 25)
            </span>
            <div className="text-2xl font-black text-white my-1">
              57.5 <span className="text-sm font-bold text-zinc-400">kg</span>
            </div>
            <div className="text-xs font-semibold text-zinc-400">8 reps (Set 1)</div>
            <div className="mt-3 pt-2 border-t border-zinc-800 text-[11px] text-zinc-400">
              Total Vol: <span className="text-zinc-200 font-bold">460 kg</span>
            </div>
          </div>

          {/* Today */}
          <div className="bg-gradient-to-b from-brand-950/40 to-[#202023] border-2 border-brand-500/50 rounded-2xl p-4 text-center shadow-lg relative">
            <span className="text-[10px] uppercase font-extrabold text-brand-400 tracking-wider block mb-1 flex items-center justify-center gap-1">
              TODAY SESSION <Sparkles className="w-3 h-3 fill-brand-400" />
            </span>
            <div className="text-2xl font-black text-brand-400 my-1">
              60.0 <span className="text-sm font-bold text-white">kg</span>
            </div>
            <div className="text-xs font-bold text-white">8 reps (Set 1)</div>
            <div className="mt-3 pt-2 border-t border-brand-500/20 text-[11px] text-zinc-300">
              Total Vol: <span className="text-brand-300 font-bold">480 kg</span>
            </div>
          </div>
        </div>

        {/* Visual Differences */}
        <div className="bg-[#202023] border border-zinc-800 rounded-2xl p-4 space-y-3">
          <h5 className="text-xs uppercase font-extrabold text-zinc-400 tracking-wider">
            Key Differences
          </h5>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-300 font-medium">Top Set Weight</span>
            <span className="font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/30">
              +2.5 kg (+4.3%)
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-300 font-medium">Session Volume</span>
            <span className="font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/30">
              +20 kg (+4.3%)
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-300 font-medium">Estimated 1RM</span>
            <span className="font-extrabold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/30">
              76.0 kg vs 72.8 kg
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsSessionCompareOpen(false)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-bold text-sm shadow-lg hover:shadow-brand-500/20 active:scale-95 transition-all"
        >
          Keep Up the Work! 🔥
        </button>
      </div>
    </Modal>
  );
};
