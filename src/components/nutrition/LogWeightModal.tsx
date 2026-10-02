import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

export const LogWeightModal: React.FC = () => {
  const { isLogWeightModalOpen, setIsLogWeightModalOpen, logWeightMeasurement, user } = useApp();
  const [weight, setWeight] = useState(user.currentWeightKg.toString());
  const [bodyFat, setBodyFat] = useState('14.5');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!w) return;
    logWeightMeasurement(w, parseFloat(bodyFat) || undefined);
    setIsLogWeightModalOpen(false);
  };

  return (
    <Modal
      isOpen={isLogWeightModalOpen}
      onClose={() => setIsLogWeightModalOpen(false)}
      title="Log Body Weight"
      subtitle="Record today's weight measurement"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Body Weight (kg)
          </label>
          <input
            type="number"
            step="0.1"
            required
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-4 py-3 text-2xl font-black text-brand-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
            Estimated Body Fat % (Optional)
          </label>
          <input
            type="number"
            step="0.1"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
            className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-bold text-sm shadow-lg hover:shadow-brand-500/20 active:scale-95 transition-all"
        >
          Save Weight Log ✓
        </button>
      </form>
    </Modal>
  );
};
