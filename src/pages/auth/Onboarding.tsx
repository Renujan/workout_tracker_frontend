import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell,
  Flame,
  Scale,
  Heart,
  ChevronRight,
  ChevronLeft,
  Check,
  Zap,
  BarChart3,
  Calendar,
  User,
  Target,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { useAuth, OnboardingData, FitnessGoalType, TrainingExperience } from '../../context/AuthContext';

// ─── Step data ────────────────────────────────────────────────────────────────

const GOALS: { value: FitnessGoalType; icon: React.ElementType; color: string; bg: string; desc: string }[] = [
  {
    value: 'Build Muscle',
    icon: Dumbbell,
    color: 'text-blue-400',
    bg: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    desc: 'Gain strength & size through progressive overload',
  },
  {
    value: 'Lose Fat',
    icon: Flame,
    color: 'text-orange-400',
    bg: 'from-orange-500/20 to-orange-600/10 border-orange-500/30',
    desc: 'Burn fat while preserving lean muscle mass',
  },
  {
    value: 'Maintain',
    icon: Heart,
    color: 'text-pink-400',
    bg: 'from-pink-500/20 to-pink-600/10 border-pink-500/30',
    desc: 'Stay active, healthy, and feel your best',
  },
];

const EXPERIENCE: { value: TrainingExperience; label: string; desc: string; years: string }[] = [
  { value: 'Beginner', label: 'Beginner', desc: 'Just getting started', years: '< 1 year' },
  { value: 'Intermediate', label: 'Intermediate', desc: 'Consistent training', years: '1–3 years' },
  { value: 'Advanced', label: 'Advanced', desc: 'Seasoned athlete', years: '3+ years' },
];

const DAYS = [2, 3, 4, 5, 6];

const STEPS = [
  { id: 'welcome', title: 'Welcome' },
  { id: 'goal', title: 'Your Goal' },
  { id: 'metrics', title: 'Your Stats' },
  { id: 'experience', title: 'Experience' },
  { id: 'schedule', title: 'Schedule' },
  { id: 'plan', title: 'Your Plan' },
];

// ─── Animated slide wrapper ───────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -60, opacity: 0 }),
};

// ─── Step components ──────────────────────────────────────────────────────────

const WelcomeStep: React.FC<{ name: string; onNext: () => void }> = ({ name, onNext }) => (
  <div className="text-center space-y-6">
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', duration: 0.7 }}
      className="inline-flex w-24 h-24 rounded-3xl bg-gradient-to-br from-green-400 to-emerald-600 items-center justify-center shadow-2xl shadow-green-500/40 mx-auto"
    >
      <Dumbbell size={44} className="text-white" />
    </motion.div>

    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-3"
      >
        <Sparkles size={13} />
        ProgressX
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl font-black text-white"
      >
        Welcome, {name.split(' ')[0]}! 👋
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-zinc-400 text-lg mt-3 max-w-xs mx-auto leading-relaxed"
      >
        Let's personalize your experience. It only takes 2 minutes.
      </motion.p>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="grid grid-cols-3 gap-3 max-w-xs mx-auto"
    >
      {[
        { icon: Target, label: 'Custom goals' },
        { icon: BarChart3, label: 'Smart insights' },
        { icon: Trophy, label: 'Achievements' },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-zinc-800/60 border border-zinc-700/60">
          <item.icon size={18} className="text-green-400" />
          <span className="text-xs text-zinc-400 text-center">{item.label}</span>
        </div>
      ))}
    </motion.div>

    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      onClick={onNext}
      id="onboarding-welcome-btn"
      className="group flex items-center justify-center gap-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 active:scale-100 transition-all duration-200 mx-auto"
    >
      Let's Go
      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
    </motion.button>
  </div>
);

const GoalStep: React.FC<{
  selected: FitnessGoalType | null;
  onSelect: (g: FitnessGoalType) => void;
}> = ({ selected, onSelect }) => (
  <div className="space-y-4">
    <div>
      <h2 className="text-2xl font-black text-white">What's your primary goal?</h2>
      <p className="text-zinc-500 text-sm mt-1">We'll tailor your entire experience around this.</p>
    </div>
    <div className="space-y-3">
      {GOALS.map((g) => (
        <button
          key={g.value}
          id={`goal-${g.value.replace(' ', '-').toLowerCase()}`}
          onClick={() => onSelect(g.value)}
          className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border bg-gradient-to-r transition-all duration-200 ${
            selected === g.value
              ? `${g.bg} scale-[1.02] shadow-lg`
              : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
          }`}
        >
          <div className={`w-11 h-11 rounded-xl bg-zinc-900/80 flex items-center justify-center ${g.color} flex-shrink-0`}>
            <g.icon size={22} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">{g.value}</span>
              {selected === g.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <Check size={12} className="text-white" />
                </motion.div>
              )}
            </div>
            <p className="text-zinc-500 text-xs mt-0.5">{g.desc}</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const MetricsStep: React.FC<{
  weight: string;
  height: string;
  age: string;
  onChange: (field: string, val: string) => void;
}> = ({ weight, height, age, onChange }) => (
  <div className="space-y-5">
    <div>
      <h2 className="text-2xl font-black text-white">Tell us about you</h2>
      <p className="text-zinc-500 text-sm mt-1">Used to calculate your personalized targets.</p>
    </div>
    <div className="space-y-4">
      {[
        { label: 'Current Weight', field: 'weight', value: weight, placeholder: 'e.g. 75', unit: 'kg', icon: Scale },
        { label: 'Height', field: 'height', value: height, placeholder: 'e.g. 178', unit: 'cm', icon: User },
        { label: 'Age', field: 'age', value: age, placeholder: 'e.g. 25', unit: 'yrs', icon: Calendar },
      ].map(({ label, field, value, placeholder, unit, icon: Icon }) => (
        <div key={field}>
          <label className="block text-xs font-medium text-zinc-400 mb-1.5">{label}</label>
          <div className="relative">
            <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              id={`onboarding-${field}`}
              type="number"
              value={value}
              onChange={(e) => onChange(field, e.target.value)}
              placeholder={placeholder}
              className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl pl-9 pr-14 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30 transition-all"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-zinc-500 font-medium">{unit}</span>
          </div>
        </div>
      ))}
    </div>
    <p className="text-xs text-zinc-600">All fields are optional. You can update these later.</p>
  </div>
);

const ExperienceStep: React.FC<{
  selected: TrainingExperience | null;
  onSelect: (e: TrainingExperience) => void;
}> = ({ selected, onSelect }) => (
  <div className="space-y-4">
    <div>
      <h2 className="text-2xl font-black text-white">Training experience</h2>
      <p className="text-zinc-500 text-sm mt-1">Helps us set the right starting weights and volumes.</p>
    </div>
    <div className="space-y-3">
      {EXPERIENCE.map((e) => (
        <button
          key={e.value}
          id={`exp-${e.value.toLowerCase()}`}
          onClick={() => onSelect(e.value)}
          className={`w-full text-left flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
            selected === e.value
              ? 'border-green-500/50 bg-green-500/10 scale-[1.02]'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
          }`}
        >
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg font-black ${
            selected === e.value ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {e.value === 'Beginner' ? '🌱' : e.value === 'Intermediate' ? '💪' : '🔥'}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-white font-bold">{e.label}</span>
              {selected === e.value && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                >
                  <Check size={12} className="text-white" />
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-zinc-500 text-xs">{e.desc}</span>
              <span className="text-zinc-700 text-xs">·</span>
              <span className="text-green-500/70 text-xs font-medium">{e.years}</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const ScheduleStep: React.FC<{
  selected: number | null;
  onSelect: (d: number) => void;
}> = ({ selected, onSelect }) => (
  <div className="space-y-5">
    <div>
      <h2 className="text-2xl font-black text-white">How many days per week?</h2>
      <p className="text-zinc-500 text-sm mt-1">We'll build your program around this schedule.</p>
    </div>
    <div className="grid grid-cols-5 gap-2">
      {DAYS.map((d) => (
        <button
          key={d}
          id={`days-${d}`}
          onClick={() => onSelect(d)}
          className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 border transition-all duration-200 ${
            selected === d
              ? 'border-green-500/60 bg-green-500/15 scale-110 shadow-lg shadow-green-500/20'
              : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
          }`}
        >
          <span className={`text-2xl font-black ${selected === d ? 'text-green-400' : 'text-white'}`}>{d}</span>
          <span className="text-xs text-zinc-500">days</span>
        </button>
      ))}
    </div>
    {selected && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 rounded-xl bg-zinc-800/60 border border-zinc-700/60"
      >
        <div className="flex items-center gap-2 text-green-400 font-semibold text-sm mb-1">
          <Zap size={14} />
          {selected === 2
            ? 'Full Body Split'
            : selected === 3
            ? 'Push/Pull/Legs'
            : selected === 4
            ? 'Upper/Lower Split'
            : selected === 5
            ? 'PPL + Upper/Lower'
            : '6-Day Arnold Split'}
        </div>
        <p className="text-zinc-500 text-xs">
          {selected === 2
            ? 'Train every major muscle group twice per week.'
            : selected === 3
            ? 'Classic, effective, and proven for all experience levels.'
            : selected === 4
            ? 'High frequency with adequate recovery time.'
            : selected === 5
            ? 'Advanced split for maximum muscle stimulation.'
            : 'High volume for experienced lifters ready to push hard.'}
        </p>
      </motion.div>
    )}
  </div>
);

const PlanStep: React.FC<{ data: OnboardingData; name: string; onFinish: () => void }> = ({
  data,
  name,
  onFinish,
}) => {
  const goalColors: Record<string, string> = {
    'Build Muscle': 'text-blue-400',
    'Lose Fat': 'text-orange-400',
    'Maintain': 'text-pink-400',
  };

  const highlights = [
    {
      icon: Target,
      label: 'Primary Goal',
      value: data.goal || 'General Fitness',
      color: goalColors[data.goal ?? ''] || 'text-green-400',
    },
    {
      icon: Scale,
      label: 'Starting Weight',
      value: data.weightKg ? `${data.weightKg} kg` : 'Not set',
      color: 'text-zinc-300',
    },
    {
      icon: Zap,
      label: 'Experience',
      value: data.experience || 'Beginner',
      color: 'text-green-400',
    },
    {
      icon: Calendar,
      label: 'Training Days',
      value: data.daysPerWeek ? `${data.daysPerWeek}× per week` : 'Flexible',
      color: 'text-zinc-300',
    },
  ];

  return (
    <div className="space-y-5">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="text-5xl mb-3"
        >
          🎯
        </motion.div>
        <h2 className="text-2xl font-black text-white">Your Starting Plan</h2>
        <p className="text-zinc-500 text-sm mt-1">Tailored just for you, {name.split(' ')[0]}.</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {highlights.map((h, i) => (
          <motion.div
            key={h.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-4 rounded-xl bg-zinc-800/60 border border-zinc-700/60"
          >
            <div className="flex items-center gap-2 mb-2">
              <h.icon size={14} className="text-zinc-500" />
              <span className="text-xs text-zinc-500">{h.label}</span>
            </div>
            <span className={`text-sm font-bold ${h.color}`}>{h.value}</span>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
      >
        <div className="flex items-center gap-2 text-green-400 font-semibold text-sm mb-1">
          <Sparkles size={14} />
          What's ready for you
        </div>
        <ul className="space-y-1.5 mt-2">
          {[
            'Personalized workout plans based on your goal',
            'Macro & calorie targets to match your needs',
            'Progress tracking and body composition analysis',
            'Adaptive difficulty that grows with you',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-zinc-400">
              <Check size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onFinish}
        id="onboarding-finish-btn"
        className="group w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-[1.02] active:scale-100 transition-all duration-200"
      >
        <Trophy size={20} />
        Start My Journey
        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};

// ─── Main Onboarding ──────────────────────────────────────────────────────────

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { user, completeOnboarding, skipOnboarding } = useAuth();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    goal: null,
    weightKg: '',
    heightCm: '',
    age: '',
    experience: null,
    daysPerWeek: null,
  });

  const goNext = () => {
    setDirection(1);
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const canGoNext = () => {
    if (step === 1) return data.goal !== null;
    if (step === 3) return data.experience !== null;
    if (step === 4) return data.daysPerWeek !== null;
    return true;
  };

  const handleFinish = () => {
    completeOnboarding(data);
    navigate('/dashboard');
  };

  const handleSkip = () => {
    skipOnboarding();
    navigate('/dashboard');
  };

  const totalSteps = STEPS.length;
  const progressPct = (step / (totalSteps - 1)) * 100;

  const name = user?.name || 'Athlete';

  const renderStep = () => {
    switch (step) {
      case 0:
        return <WelcomeStep name={name} onNext={goNext} />;
      case 1:
        return (
          <GoalStep
            selected={data.goal}
            onSelect={(g) => setData((d) => ({ ...d, goal: g }))}
          />
        );
      case 2:
        return (
          <MetricsStep
            weight={data.weightKg}
            height={data.heightCm}
            age={data.age}
            onChange={(field, val) =>
              setData((d) => ({
                ...d,
                ...(field === 'weight' ? { weightKg: val } : field === 'height' ? { heightCm: val } : { age: val }),
              }))
            }
          />
        );
      case 3:
        return (
          <ExperienceStep
            selected={data.experience}
            onSelect={(e) => setData((d) => ({ ...d, experience: e }))}
          />
        );
      case 4:
        return (
          <ScheduleStep
            selected={data.daysPerWeek}
            onSelect={(d) => setData((prev) => ({ ...prev, daysPerWeek: d }))}
          />
        );
      case 5:
        return <PlanStep data={data} name={name} onFinish={handleFinish} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        {step > 0 && (
          <div className="mb-6">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-zinc-500 text-xs">
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
                  <Dumbbell size={10} className="text-white" />
                </div>
                <span>ProgressX</span>
              </div>
              <span className="text-xs text-zinc-600">
                {step} / {totalSteps - 1}
              </span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                initial={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>

            {/* Step dots */}
            <div className="flex justify-center gap-1.5 mt-3">
              {STEPS.slice(1).map((s, i) => (
                <div
                  key={s.id}
                  className={`rounded-full transition-all duration-300 ${
                    i + 1 < step
                      ? 'w-4 h-1.5 bg-green-500'
                      : i + 1 === step
                      ? 'w-4 h-1.5 bg-green-400'
                      : 'w-1.5 h-1.5 bg-zinc-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Card */}
        <div className={`bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden ${step === 0 ? 'p-8' : 'p-6'}`}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation (steps 1–4) */}
          {step > 0 && step < 5 && (
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-zinc-800">
              <button
                id="onboarding-back-btn"
                onClick={goPrev}
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={16} />
                Back
              </button>
              <div className="flex items-center gap-3">
                {step < 5 && (
                  <button
                    id="onboarding-skip-btn"
                    onClick={() => (step === 4 ? goNext() : goNext())}
                    className="text-sm text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    Skip
                  </button>
                )}
                <button
                  id="onboarding-next-btn"
                  onClick={goNext}
                  disabled={!canGoNext()}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/20 hover:scale-105 active:scale-100 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Skip all */}
        {step > 0 && step < 5 && (
          <button
            id="onboarding-skip-all-btn"
            onClick={handleSkip}
            className="w-full text-center text-xs text-zinc-700 hover:text-zinc-500 mt-4 transition-colors"
          >
            Skip setup and go to dashboard
          </button>
        )}
      </div>
    </div>
  );
};
