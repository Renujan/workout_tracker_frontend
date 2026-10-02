import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const AddFoodModal: React.FC = () => {
  const { isLogFoodModalOpen, setIsLogFoodModalOpen, logFoodItem } = useApp();

  const [category, setCategory] = useState<'Breakfast' | 'Lunch' | 'Snack' | 'Dinner'>('Lunch');
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('350');
  const [protein, setProtein] = useState('30');
  const [carbs, setCarbs] = useState('40');
  const [fat, setFat] = useState('10');
  const [servingSize, setServingSize] = useState('1 serving');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    logFoodItem({
      category,
      name: name.trim(),
      calories: Number(calories) || 0,
      proteinGrams: Number(protein) || 0,
      carbsGrams: Number(carbs) || 0,
      fatGrams: Number(fat) || 0,
      servingSize: servingSize || '1 serving',
    });

    setName('');
    setIsLogFoodModalOpen(false);
  };

  return (
    <Modal
      isOpen={isLogFoodModalOpen}
      onClose={() => setIsLogFoodModalOpen(false)}
      title="Log Food & Macro"
      subtitle="Track your protein and nutrition progress"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Meal Category
          </label>
          <div className="grid grid-cols-4 gap-1.5 bg-[#202023] p-1 rounded-xl border border-zinc-800">
            {(['Breakfast', 'Lunch', 'Snack', 'Dinner'] as const).map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setCategory(cat)}
                className={`py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  category === cat
                    ? 'bg-brand-500 text-black shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Food Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Grilled Chicken & Rice"
            className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
              Protein (g)
            </label>
            <input
              type="number"
              required
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-brand-400 font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
              Calories (kcal)
            </label>
            <input
              type="number"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
              Carbs (g)
            </label>
            <input
              type="number"
              value={carbs}
              onChange={(e) => setCarbs(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-zinc-400 mb-1">
              Fat (g)
            </label>
            <input
              type="number"
              value={fat}
              onChange={(e) => setFat(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3 py-2 text-sm text-white font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Serving Size
          </label>
          <input
            type="text"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
            placeholder="e.g. 250g or 1 bowl"
            className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-bold text-sm shadow-lg hover:shadow-brand-500/20 active:scale-95 transition-all"
        >
          Save Food Entry ✓
        </button>
      </form>
    </Modal>
  );
};
