import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Eye, EyeOff, Lock, AlertCircle, CheckCircle, ShieldCheck } from 'lucide-react';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!password || !confirm) { setError('Please fill in all fields.'); return; }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-emerald-600/5 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-600 items-center justify-center shadow-2xl shadow-green-500/30 mb-4">
            <Dumbbell size={26} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">Set new password</h1>
          <p className="text-zinc-500 text-sm mt-1">Choose a strong password for your account</p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Password updated!</h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Your password has been successfully reset. You can now sign in.
                </p>
                <button
                  id="reset-goto-login-btn"
                  onClick={() => navigate('/login')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 hover:scale-[1.02] transition-all"
                >
                  Go to Login
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2.5 text-sm"
                    >
                      <AlertCircle size={14} />
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">New Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      id="reset-password"
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg pl-9 pr-10 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Confirm New Password</label>
                  <div className="relative">
                    <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      id="reset-confirm"
                      type="password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="••••••••"
                      className={`w-full bg-zinc-800/80 border rounded-lg pl-9 pr-3 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 transition-all ${
                        confirm && confirm !== password
                          ? 'border-red-500/60 focus:border-red-500/60 focus:ring-red-500/20'
                          : confirm && confirm === password
                          ? 'border-green-500/60 focus:border-green-500/60 focus:ring-green-500/20'
                          : 'border-zinc-700 focus:border-green-500/60 focus:ring-green-500/30'
                      }`}
                    />
                  </div>
                  {confirm && confirm === password && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-xs text-green-400">
                      <CheckCircle size={11} />
                      Passwords match
                    </div>
                  )}
                </div>

                <button
                  id="reset-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 hover:scale-[1.02] transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Updating…
                    </span>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
