import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Dumbbell, ChevronRight, Sparkles, RefreshCw, Database } from 'lucide-react';
import { SearchInput } from '../components/common/SearchInput';
import { FilterTabs } from '../components/common/FilterTabs';
import { exerciseService } from '../services/exerciseService';
import { ExerciseItem } from '../types';
import { mockMuscleAreas } from '../data/muscleAreasData';

export const Exercises: React.FC = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiveBackend, setIsLiveBackend] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');
  const [selectedEquipment, setSelectedEquipment] = useState('All');

  const muscleOptions = ['All', 'Chest', 'Back', 'Shoulders', 'Biceps', 'Triceps', 'Legs'];
  const equipmentOptions = ['All', 'Barbell', 'Dumbbell', 'Machine', 'Cable', 'Bodyweight'];

  const fetchExercises = async () => {
    setLoading(true);
    try {
      const data = await exerciseService.getExercises();
      setExercises(data);
      // Verify if loaded items came from backend (numeric IDs from SQLite or transformed)
      setIsLiveBackend(data.length > 0 && !data[0].id.startsWith('mock_'));
    } catch (err) {
      console.error('Failed to load exercises:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || ex.muscleGroup.toLowerCase() === selectedMuscle.toLowerCase();
    const matchesEquipment = selectedEquipment === 'All' || ex.equipment.toLowerCase() === selectedEquipment.toLowerCase();
    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-2xl font-black text-white tracking-tight">Exercise Library</h2>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/10 border border-brand-500/20 text-brand-400">
              <Database size={11} />
              <span>{isLiveBackend ? 'Django REST API' : 'Ready'}</span>
            </div>
          </div>
          <p className="text-xs text-zinc-400">Discover exercises, technique guides, and track personal bests</p>
        </div>

        <button
          onClick={fetchExercises}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white text-xs font-semibold hover:border-zinc-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={13} className={loading ? 'animate-spin text-brand-400' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Muscle Area Image Selector */}
      <div className="space-y-2">
        <h3 className="text-xs uppercase font-extrabold tracking-wider text-zinc-400">Filter by Target Muscle Area</h3>
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {mockMuscleAreas.map((area) => {
            const muscleName = area.name.replace(' Area', '').replace(' & Forearms', '');
            const isSelected = selectedMuscle.toLowerCase().includes(muscleName.toLowerCase());
            return (
              <button
                key={area.id}
                onClick={() => setSelectedMuscle(isSelected ? 'All' : muscleName)}
                className={`relative shrink-0 w-28 h-20 rounded-2xl overflow-hidden border transition-all text-left group ${
                  isSelected
                    ? 'border-brand-400 ring-2 ring-brand-400/40 shadow-lg scale-105'
                    : 'border-zinc-800 hover:border-zinc-700 opacity-80 hover:opacity-100'
                }`}
              >
                <img
                  src={area.imageUrl}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[11px] font-black text-white tracking-tight">
                  {muscleName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="space-y-3">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search exercises by name or muscle group..."
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center justify-between">
          <FilterTabs
            options={muscleOptions}
            activeOption={selectedMuscle}
            onSelect={setSelectedMuscle}
            className="w-full sm:w-auto"
          />
          <FilterTabs
            options={equipmentOptions}
            activeOption={selectedEquipment}
            onSelect={setSelectedEquipment}
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="bg-[#18181B] border border-zinc-800 rounded-3xl overflow-hidden animate-pulse">
              <div className="h-44 bg-zinc-800/60" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-zinc-800 rounded w-2/3" />
                <div className="h-3 bg-zinc-800 rounded w-full" />
                <div className="h-8 bg-zinc-800/40 rounded mt-4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Exercise Grid */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExercises.map((ex) => (
            <motion.div
              key={ex.id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/exercises/${ex.id}`)}
              className="bg-[#18181B] border border-zinc-800 hover:border-brand-500/50 rounded-3xl overflow-hidden shadow-xl flex flex-col justify-between group cursor-pointer transition-all"
            >
              <div className="h-44 relative">
                <img
                  src={ex.imageUrl}
                  alt={ex.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/40 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-black bg-brand-400 px-2.5 py-1 rounded-full shadow">
                    {ex.muscleGroup}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-zinc-200 bg-zinc-900/80 backdrop-blur-md border border-zinc-700 px-2.5 py-1 rounded-full">
                    {ex.equipment}
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-lg tracking-tight group-hover:text-brand-400 transition-colors">
                    {ex.name}
                  </h3>
                  <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                </div>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed font-normal">
                  {ex.description}
                </p>

                <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-semibold">
                  <div>
                    <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">Personal Best</span>
                    <span className="text-white font-extrabold">
                      {ex.personalBest.weight > 0 ? `${ex.personalBest.weight} kg × ${ex.personalBest.reps}` : 'No PR yet'}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-zinc-500 text-[10px] block uppercase tracking-wider">Est. 1RM</span>
                    <span className="text-brand-400 font-extrabold">
                      {ex.estimated1RM > 0 ? `${ex.estimated1RM} kg` : '—'}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filteredExercises.length === 0 && (
        <div className="text-center py-12 bg-zinc-900/40 rounded-3xl border border-zinc-800 p-8">
          <Dumbbell className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <h4 className="text-white font-bold text-base">No exercises found</h4>
          <p className="text-xs text-zinc-500 mt-1">Try adjusting your filters or search keywords</p>
        </div>
      )}
    </div>
  );
};
