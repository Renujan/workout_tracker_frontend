import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, Scale, Bell, Sliders, Shield, Database, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { weightUnit, setWeightUnit, addToast } = useApp();
  const [appearance, setAppearance] = useState<'dark' | 'light' | 'system'>('dark');
  const [distanceUnit, setDistanceUnit] = useState<'km' | 'miles'>('km');
  const [autoRestTimer, setAutoRestTimer] = useState(true);
  const [defaultRestSeconds, setDefaultRestSeconds] = useState(90);

  const handleSaveSettings = () => {
    addToast('Settings Saved ✓', 'App preferences updated successfully', 'success');
  };

  return (
    <div className="space-y-6 pb-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-black text-white tracking-tight">App Settings</h2>
        <p className="text-xs text-zinc-400">Manage display, measurement units, workout timer & targets</p>
      </div>

      {/* Appearance Section */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Appearance & Theme</h3>
            <p className="text-xs text-zinc-400">Select application visual mode</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2">
          {(['dark', 'light', 'system'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setAppearance(mode)}
              className={`p-3.5 rounded-2xl border font-bold text-xs uppercase tracking-wider transition-all text-center ${
                appearance === mode
                  ? 'bg-brand-500 text-black border-brand-400 shadow-md'
                  : 'bg-[#202023] text-zinc-400 border-zinc-800 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Measurement Units */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Units of Measurement</h3>
            <p className="text-xs text-zinc-400">Configure weight and distance units</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Weight Unit
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#202023] p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setWeightUnit('kg')}
                className={`py-2 rounded-lg font-bold text-xs transition-colors ${
                  weightUnit === 'kg' ? 'bg-brand-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Kilograms (kg)
              </button>
              <button
                onClick={() => setWeightUnit('lb')}
                className={`py-2 rounded-lg font-bold text-xs transition-colors ${
                  weightUnit === 'lb' ? 'bg-brand-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Pounds (lb)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
              Distance Unit
            </label>
            <div className="grid grid-cols-2 gap-2 bg-[#202023] p-1 rounded-xl border border-zinc-800">
              <button
                onClick={() => setDistanceUnit('km')}
                className={`py-2 rounded-lg font-bold text-xs transition-colors ${
                  distanceUnit === 'km' ? 'bg-brand-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Kilometers (km)
              </button>
              <button
                onClick={() => setDistanceUnit('miles')}
                className={`py-2 rounded-lg font-bold text-xs transition-colors ${
                  distanceUnit === 'miles' ? 'bg-brand-500 text-black shadow' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Miles (mi)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Workout Preferences */}
      <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Workout Preferences</h3>
            <p className="text-xs text-zinc-400">Rest timer & set completion defaults</p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between p-3.5 bg-[#202023] rounded-2xl border border-zinc-800">
            <div>
              <span className="font-bold text-white text-xs block">Auto-Start Rest Timer</span>
              <span className="text-xs text-zinc-400">Trigger timer immediately upon set completion</span>
            </div>
            <button
              onClick={() => setAutoRestTimer(!autoRestTimer)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                autoRestTimer ? 'bg-brand-500' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full bg-black absolute top-0.5 transition-transform ${
                  autoRestTimer ? 'right-0.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#202023] rounded-2xl border border-zinc-800">
            <span className="font-bold text-white text-xs">Default Rest Duration</span>
            <select
              value={defaultRestSeconds}
              onChange={(e) => setDefaultRestSeconds(Number(e.target.value))}
              className="bg-zinc-800 border border-zinc-700 text-xs font-bold text-brand-400 rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value={60}>60 seconds (1 min)</option>
              <option value={90}>90 seconds (1.5 min)</option>
              <option value={120}>120 seconds (2 mins)</option>
              <option value={180}>180 seconds (3 mins)</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSaveSettings}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-sm shadow-lg hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Check className="w-4 h-4 stroke-[3]" /> Save All Settings
      </button>
    </div>
  );
};
