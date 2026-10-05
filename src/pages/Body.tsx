import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Activity, Plus, Camera, Ruler, Calendar } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/common/MetricCard';
import { FilterTabs } from '../components/common/FilterTabs';
import { LogMeasurementModal } from '../components/body/LogMeasurementModal';
import { mockBodyMeasurements, mockProgressPhotos } from '../data/mockData';

export const Body: React.FC = () => {
  const { user, setIsLogWeightModalOpen } = useApp();
  const [activeTab, setActiveTab] = useState<'Measurements' | 'Photos'>('Measurements');
  const [photoCategory, setPhotoCategory] = useState<'All' | 'Front' | 'Side' | 'Back'>('All');
  const [isLogMeasurementOpen, setIsLogMeasurementOpen] = useState(false);

  const latestMeas = mockBodyMeasurements[mockBodyMeasurements.length - 1];

  const filteredPhotos = mockProgressPhotos.filter((p) => {
    if (photoCategory === 'All') return true;
    return p.category === photoCategory;
  });

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white tracking-tight">Body Progress & Photos</h2>
          <p className="text-xs text-zinc-400">Track body composition, body part measurements & visual progress photos</p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsLogWeightModalOpen(true)}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs border border-zinc-700 transition-colors text-center"
          >
            Log Weight
          </button>
          <button
            onClick={() => setIsLogMeasurementOpen(true)}
            className="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-500 to-brand-bright text-black font-extrabold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Log Measurement
          </button>
        </div>
      </div>

      {/* Main Tabs */}
      <FilterTabs
        options={['Measurements', 'Photos']}
        activeOption={activeTab}
        onSelect={(opt) => setActiveTab(opt as any)}
      />

      {/* MEASUREMENTS TAB */}
      {activeTab === 'Measurements' && (
        <div className="space-y-6">
          {/* Top 6 Body Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <MetricCard title="Weight" value={`${user.currentWeightKg} kg`} subtitle="Target: 65 kg" />
            <MetricCard title="Body Fat" value={`${latestMeas.bodyFatPercent}%`} subtitle="Lean mass" />
            <MetricCard title="Chest" value={`${latestMeas.chestCm} cm`} subtitle="+2.0 cm" />
            <MetricCard title="Arms" value={`${latestMeas.armsCm} cm`} subtitle="+1.0 cm" />
            <MetricCard title="Waist" value={`${latestMeas.waistCm} cm`} subtitle="-1.0 cm" />
            <MetricCard title="Thighs" value={`${latestMeas.thighsCm} cm`} subtitle="+1.0 cm" />
          </div>

          {/* Measurements Line Chart */}
          <div className="bg-[#18181B] border border-zinc-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">Body Measurements Trend (cm)</h3>
              <p className="text-xs text-zinc-400">Chest, Arms, Waist & Thighs trajectory</p>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockBodyMeasurements} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272A" vertical={false} />
                  <XAxis dataKey="date" stroke="#71717A" fontSize={12} tickLine={false} />
                  <YAxis stroke="#71717A" fontSize={12} tickLine={false} domain={['dataMin - 5', 'dataMax + 5']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#18181B',
                      borderColor: '#3F3F46',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                  <Line type="monotone" dataKey="chestCm" stroke="#22c55e" strokeWidth={2.5} name="Chest (cm)" />
                  <Line type="monotone" dataKey="armsCm" stroke="#3b82f6" strokeWidth={2.5} name="Arms (cm)" />
                  <Line type="monotone" dataKey="waistCm" stroke="#f59e0b" strokeWidth={2.5} name="Waist (cm)" />
                  <Line type="monotone" dataKey="thighsCm" stroke="#a855f7" strokeWidth={2.5} name="Thighs (cm)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* PHOTOS TAB */}
      {activeTab === 'Photos' && (
        <div className="space-y-4">
          <FilterTabs
            options={['All', 'Front', 'Side', 'Back']}
            activeOption={photoCategory}
            onSelect={(opt) => setPhotoCategory(opt as any)}
          />

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                whileHover={{ y: -4 }}
                className="bg-[#18181B] border border-zinc-800 rounded-3xl overflow-hidden shadow-xl group"
              >
                <div className="h-64 relative">
                  <img
                    src={photo.imageUrl}
                    alt={photo.category}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-xs font-extrabold text-black bg-brand-400 px-2.5 py-1 rounded-full shadow">
                    {photo.category} View
                  </span>
                </div>

                <div className="p-4 flex items-center justify-between text-xs font-semibold">
                  <span className="text-zinc-400">{photo.date}</span>
                  <span className="text-white font-extrabold">{photo.weightKg} kg</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <LogMeasurementModal
        isOpen={isLogMeasurementOpen}
        onClose={() => setIsLogMeasurementOpen(false)}
      />
    </div>
  );
};
