import React from 'react';
import { motion } from 'framer-motion';
import { Apple, Flame, Droplets, Plus, Utensils, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { CircularProgress } from '../components/common/CircularProgress';
import { MetricCard } from '../components/common/MetricCard';
import { ProgressBar } from '../components/common/ProgressBar';

export const Nutrition: React.FC = () => {
  const { nutrition, setIsLogFoodModalOpen, logFoodItem } = useApp();

  const proteinPercentage = Math.round((nutrition.proteinGrams / nutrition.targetProteinGrams) * 100);

  const mealsByCategory = {
    Breakfast: nutrition.meals.filter((m) => m.category === 'Breakfast'),
    Lunch: nutrition.meals.filter((m) => m.category === 'Lunch'),
    Snack: nutrition.meals.filter((m) => m.category === 'Snack'),
    Dinner: nutrition.meals.filter((m) => m.category === 'Dinner'),
  };

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Nutrition & Macro Tracking</h2>
          <p className="text-xs text-zinc-400">Track protein targets, calorie targets & daily meal logs</p>
        </div>

        <button
          onClick={() => setIsLogFoodModalOpen(true)}
          className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" /> Log Food & Protein
        </button>
      </div>

      {/* Hero Circular Protein Focus & Macro Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Protein Target Circular Progress Hero */}
        <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <span className="text-xs uppercase tracking-widest font-extrabold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20 mb-4">
            DAILY PROTEIN TARGET
          </span>

          <CircularProgress
            percentage={proteinPercentage}
            size={140}
            strokeWidth={12}
            color="#22c55e"
            centerText={`${nutrition.proteinGrams}g`}
            centerSubtext={`Target: ${nutrition.targetProteinGrams}g`}
          />

          <div className="mt-4 text-xs font-semibold text-zinc-300">
            {proteinPercentage}% of daily goal completed • <span className="text-brand-400 font-bold">{nutrition.targetProteinGrams - nutrition.proteinGrams}g remaining</span>
          </div>
        </div>

        {/* 4 Macro Cards Grid */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-3 sm:gap-4">
          <MetricCard
            title="Calories"
            value={`${nutrition.calories} kcal`}
            subtitle={`Target: ${nutrition.targetCalories} kcal`}
            progressPercent={Math.round((nutrition.calories / nutrition.targetCalories) * 100)}
            icon={<Flame className="w-5 h-5 text-amber-400" />}
          />

          <MetricCard
            title="Protein"
            value={`${nutrition.proteinGrams} g`}
            subtitle={`Target: ${nutrition.targetProteinGrams} g`}
            progressPercent={proteinPercentage}
            icon={<Apple className="w-5 h-5 text-brand-400" />}
          />

          <MetricCard
            title="Carbohydrates"
            value={`${nutrition.carbsGrams} / ${nutrition.targetCarbsGrams} g`}
            progressPercent={Math.round((nutrition.carbsGrams / nutrition.targetCarbsGrams) * 100)}
            icon={<Utensils className="w-5 h-5 text-sky-400" />}
          />

          <MetricCard
            title="Hydration Water"
            value={`${nutrition.waterLiters} / ${nutrition.targetWaterLiters} L`}
            progressPercent={Math.round((nutrition.waterLiters / nutrition.targetWaterLiters) * 100)}
            icon={<Droplets className="w-5 h-5 text-blue-400" />}
          />
        </div>
      </div>

      {/* Protein Consistency Weekly Chart */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Weekly Protein Consistency</h3>
            <p className="text-xs text-zinc-400">Daily protein intake vs 120g target line</p>
          </div>
          <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
            Target Line: 120g
          </span>
        </div>

        <div className="h-60 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={nutrition.weeklyProteinHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
              <XAxis dataKey="day" stroke="#71717A" fontSize={12} tickLine={false} />
              <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={[0, 150]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#18181B',
                  borderColor: '#3F3F46',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                }}
              />
              <ReferenceLine y={120} stroke="#84cc16" strokeDasharray="4 4" strokeWidth={2} label={{ value: '120g Goal', fill: '#84cc16', fontSize: 11 }} />
              <Bar dataKey="proteinGrams" fill="#22c55e" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Food Log by Meal */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white tracking-tight">Today's Meals Log</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(['Breakfast', 'Lunch', 'Snack', 'Dinner'] as const).map((cat) => {
            const items = mealsByCategory[cat] || [];
            const totalProtein = items.reduce((acc, i) => acc + i.proteinGrams, 0);

            return (
              <div
                key={cat}
                className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                  <h4 className="font-bold text-white text-base">{cat}</h4>
                  <span className="text-xs font-bold text-brand-400 bg-brand-500/10 px-2.5 py-0.5 rounded-full border border-brand-500/20">
                    +{totalProtein}g protein
                  </span>
                </div>

                {items.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-2">No meals logged for {cat} yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {items.map((meal) => (
                      <div
                        key={meal.id}
                        className="bg-[#202023] p-2.5 rounded-xl flex items-center justify-between text-xs gap-3 border border-zinc-800/60 hover:border-zinc-700/80 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          {meal.imageUrl ? (
                            <img
                              src={meal.imageUrl}
                              alt={meal.name}
                              className="w-11 h-11 rounded-lg object-cover border border-zinc-700/60 shrink-0"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shrink-0">
                              <Utensils className="w-5 h-5" />
                            </div>
                          )}
                          <div>
                            <span className="font-bold text-white block leading-tight">{meal.name}</span>
                            <span className="text-zinc-400 text-[11px]">{meal.servingSize} • {meal.calories} kcal</span>
                          </div>
                        </div>
                        <span className="font-extrabold text-brand-400 shrink-0 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20">
                          +{meal.proteinGrams}g protein
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
