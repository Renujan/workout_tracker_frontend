import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Dumbbell,
  TrendingUp,
  Apple,
  Trophy,
  Zap,
  Users,
  ChevronRight,
  Play,
  Star,
  Activity,
  Target,
  BarChart3,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Dumbbell,
    title: 'Smart Workout Tracking',
    description: 'Log every rep, set, and weight. Watch your strength climb week over week.',
    color: 'from-green-500/20 to-emerald-500/10',
    iconColor: 'text-green-400',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description: 'Deep visual insights into your performance. PRs, volume, 1RM trends and more.',
    color: 'from-blue-500/20 to-cyan-500/10',
    iconColor: 'text-blue-400',
  },
  {
    icon: Apple,
    title: 'Nutrition Logging',
    description: 'Track macros, calories, and hydration. Fuel your body for peak performance.',
    color: 'from-orange-500/20 to-amber-500/10',
    iconColor: 'text-orange-400',
  },
  {
    icon: Trophy,
    title: 'Achievements & Goals',
    description: 'Set ambitious goals and unlock achievements as you crush them one by one.',
    color: 'from-yellow-500/20 to-amber-500/10',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Activity,
    title: 'Body Measurements',
    description: 'Track body composition, measurements, and progress photos over time.',
    color: 'from-purple-500/20 to-violet-500/10',
    iconColor: 'text-purple-400',
  },
  {
    icon: BarChart3,
    title: 'AI-Powered Insights',
    description: 'Smart training insights that adapt to your body and performance patterns.',
    color: 'from-pink-500/20 to-rose-500/10',
    iconColor: 'text-pink-400',
  },
];

const STATS = [
  { value: '50K+', label: 'Active Athletes' },
  { value: '2M+', label: 'Workouts Logged' },
  { value: '98%', label: 'Goal Achievement' },
  { value: '4.9★', label: 'User Rating' },
];

const TESTIMONIALS = [
  {
    name: 'Marcus T.',
    role: 'Powerlifter',
    text: 'ProgressX completely transformed how I track my training. Hit 3 PRs last month alone.',
    rating: 5,
    avatar: 'MT',
  },
  {
    name: 'Sarah K.',
    role: 'Fitness Coach',
    text: 'The nutrition + workout combo is unbeatable. My clients love the clean interface.',
    rating: 5,
    avatar: 'SK',
  },
  {
    name: 'Jake R.',
    role: 'Bodybuilder',
    text: 'Finally an app that thinks like an athlete. The insights are genuinely useful.',
    rating: 5,
    avatar: 'JR',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const Landing: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#09090B]/80 backdrop-blur-xl border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Dumbbell size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            ProgressX
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            id="landing-login-btn"
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Log in
          </button>
          <button
            id="landing-signup-btn"
            onClick={() => navigate('/register')}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-105 transition-all duration-200"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-10 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-green-500/5 blur-3xl" />
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/8 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-green-600/6 blur-3xl" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
              <Zap size={14} />
              The #1 Fitness Tracker for Serious Athletes
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl md:text-7xl font-black leading-none tracking-tight mb-6"
          >
            Train Smarter.
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              Progress Faster.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Track workouts, nutrition, and body composition all in one place.
            Built for athletes who demand results, not excuses.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              id="hero-start-btn"
              onClick={() => navigate('/register')}
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-200"
            >
              Start For Free
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-demo-btn"
              onClick={() => navigate('/dashboard')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-zinc-800/80 border border-zinc-700 text-white font-bold text-lg hover:bg-zinc-700/80 hover:border-zinc-600 transition-all duration-200"
            >
              <Play size={18} className="text-green-400" />
              View Demo
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating badge */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-zinc-500 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <div className="w-4 h-0.5 bg-zinc-700 rounded" />
          <span>Scroll to explore</span>
          <div className="w-4 h-0.5 bg-zinc-700 rounded" />
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-green-400 font-semibold text-sm tracking-widest uppercase mb-3 block">
            Everything You Need
          </span>
          <h2 className="text-4xl font-black text-white mb-4">
            Designed for the Dedicated
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Every feature crafted to help you hit harder, recover smarter, and reach your potential.
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {FEATURES.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className={`group relative p-6 rounded-2xl bg-gradient-to-br ${f.color} border border-zinc-800/60 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl bg-zinc-900/80 flex items-center justify-center mb-4 ${f.iconColor} group-hover:scale-110 transition-transform`}>
                <f.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-24 bg-zinc-900/40 border-y border-zinc-800/60">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-green-400 font-semibold text-sm tracking-widest uppercase mb-3 block">
              Community
            </span>
            <h2 className="text-4xl font-black text-white mb-4">Loved by Athletes Everywhere</h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-zinc-300 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/6 blur-3xl" />
        </div>
        <motion.div
          className="relative z-10 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 text-green-400 text-sm font-semibold mb-4">
            <Users size={16} />
            Join 50,000+ athletes
          </div>
          <h2 className="text-5xl font-black text-white mb-5 leading-tight">
            Ready to unlock your
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"> potential?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-10">
            Start your journey today. Free forever, no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              id="cta-signup-btn"
              onClick={() => navigate('/register')}
              className="group flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-lg shadow-2xl shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 transition-all duration-200"
            >
              Create Free Account
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="cta-login-btn"
              onClick={() => navigate('/login')}
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-xl border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-600 font-bold text-lg transition-all duration-200"
            >
              <Target size={18} />
              Already a member?
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 px-6 py-8 text-center text-zinc-600 text-sm">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center">
            <Dumbbell size={12} className="text-white" />
          </div>
          <span className="font-bold text-zinc-400">ProgressX</span>
        </div>
        <p>© 2026 ProgressX. Built for athletes, by athletes.</p>
      </footer>
    </div>
  );
};
