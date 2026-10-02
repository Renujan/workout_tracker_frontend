import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const AddGoalModal: React.FC = () => {
  const { isAddGoalModalOpen, setIsAddGoalModalOpen, addGoalItem } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'exercise' | 'weight' | 'nutrition' | 'workout'>('exercise');
  const [targetValue, setTargetValue] = useState('80');
  const [currentValue, setCurrentValue] = useState('60');
  const [unit, setUnit] = useState('kg');
  const [deadline, setDeadline] = useState('Dec 2026');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    addGoalItem({
      title: title.trim(),
      category,
      targetValue: parseFloat(targetValue) || 100,
      currentValue: parseFloat(currentValue) || 0,
      unit,
      deadline,
    });

    setTitle('');
    setIsAddGoalModalOpen(false);
  };

  return (
    <Modal
      isOpen={isAddGoalModalOpen}
      onClose={() => setIsAddGoalModalOpen(false)}
      title="Create New Goal"
      subtitle="Set a milestone to track over time"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Goal Title
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Bench Press 80kg"
            className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e: any) => setCategory(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none"
            >
              <option value="exercise">Exercise Strength</option>
              <option value="weight">Body Weight</option>
              <option value="nutrition">Nutrition Target</option>
              <option value="workout">Workout Frequency</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Unit
            </label>
            <input
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g. kg, g/day, sessions"
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Current Value
            </label>
            <input
              type="number"
              step="any"
              required
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Target Value
            </label>
            <input
              type="number"
              step="any"
              required
              value={targetValue}
              onChange={(e) => setTargetValue(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-brand-400 font-bold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Target Deadline
          </label>
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            placeholder="e.g. Dec 2026"
            className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-bold text-sm shadow-lg hover:shadow-brand-500/20 active:scale-95 transition-all"
        >
          Create Goal 🎯
        </button>
      </form>
    </Modal>
  );
};
