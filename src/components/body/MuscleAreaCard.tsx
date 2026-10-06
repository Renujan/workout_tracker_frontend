import React from 'react';
import { motion } from 'framer-motion';
import { MuscleAreaItem } from '../../data/muscleAreasData';
import { Activity, Dumbbell, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface MuscleAreaCardProps {
  area: MuscleAreaItem;
  onSelectArea?: (areaName: string) => void;
}

export const MuscleAreaCard: React.FC<MuscleAreaCardProps> = ({ area, onSelectArea }) => {
  const statusColor =
    area.recoveryStatus === 'Optimal'
      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
      : area.recoveryStatus === 'Ready to Train'
      ? 'bg-brand-500/15 text-brand-400 border-brand-500/30'
      : 'bg-amber-500/15 text-amber-400 border-amber-500/30';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => onSelectArea?.(area.name.replace(' Area', ''))}
      className="bg-[#18181B] border border-zinc-800 hover:border-brand-500/40 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group cursor-pointer transition-all"
    >
      <div className="h-48 relative overflow-hidden">
        <img
          src={area.imageUrl}
          alt={area.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/40 to-transparent" />

        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-black bg-brand-400 px-2.5 py-1 rounded-full shadow">
            {area.category}
          </span>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow backdrop-blur-md ${statusColor}`}>
            {area.recoveryStatus}
          </span>
        </div>

        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-xl font-black text-white tracking-tight drop-shadow-md group-hover:text-brand-400 transition-colors">
            {area.name}
          </h3>
          <p className="text-[11px] text-zinc-300 font-medium line-clamp-1 opacity-90">
            {area.targetMuscles.join(' • ')}
          </p>
        </div>
      </div>

      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <p className="text-xs text-zinc-400 leading-relaxed">
          {area.description}
        </p>

        <div className="pt-3 border-t border-zinc-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-400 flex items-center gap-1">
              <Dumbbell className="w-3.5 h-3.5 text-brand-400" /> Primary Movement:
            </span>
            <span className="text-white font-extrabold">{area.primaryExercise}</span>
          </div>

          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-brand-400" /> Weekly Sets:
            </span>
            <span className="text-brand-400 font-black">
              {area.weeklySets} / {area.targetSets} sets
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
