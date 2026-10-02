import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';

interface LogMeasurementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogMeasurementModal: React.FC<LogMeasurementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addToast } = useApp();
  const [chest, setChest] = useState('98');
  const [arms, setArms] = useState('36.5');
  const [waist, setWaist] = useState('76');
  const [thighs, setThighs] = useState('56');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Body Measurements Saved ✓', 'Chest: 98cm, Arms: 36.5cm, Waist: 76cm', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Body Measurements"
      subtitle="Track your physical transformations"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Chest (cm)
            </label>
            <input
              type="number"
              step="0.5"
              value={chest}
              onChange={(e) => setChest(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Arms (cm)
            </label>
            <input
              type="number"
              step="0.5"
              value={arms}
              onChange={(e) => setArms(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Waist (cm)
            </label>
            <input
              type="number"
              step="0.5"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
              Thighs (cm)
            </label>
            <input
              type="number"
              step="0.5"
              value={thighs}
              onChange={(e) => setThighs(e.target.value)}
              className="w-full bg-[#202023] border border-zinc-800 focus:border-brand-500 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none font-bold"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-bold text-sm shadow-lg hover:shadow-brand-500/20 active:scale-95 transition-all"
        >
          Save Measurements ✓
        </button>
      </form>
    </Modal>
  );
};
