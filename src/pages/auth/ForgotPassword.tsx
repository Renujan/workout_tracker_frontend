import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Mail, AlertCircle, CheckCircle, ArrowLeft, Send } from 'lucide-react';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Please enter your email.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-green-500/5 blur-3xl" />
      </div>

      <button
        onClick={() => navigate('/login')}
        className="absolute top-6 left-6 flex items-center gap-2 text-zinc-400 hover:text-white text-sm transition-colors"
        id="forgot-back-btn"
      >
        <ArrowLeft size={16} />
        Back to login
      </button>

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
          <h1 className="text-2xl font-black text-white">Reset your password</h1>
          <p className="text-zinc-500 text-sm mt-1 max-w-xs mx-auto">
            Enter your email and we'll send you a link to reset your password.
          </p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Check your inbox</h3>
                <p className="text-zinc-400 text-sm mb-5">
                  We've sent a reset link to <span className="text-white font-medium">{email}</span>
                </p>
                <p className="text-zinc-600 text-xs mb-5">
                  Didn't receive it? Check your spam folder or try again in a few minutes.
                </p>
                <button
                  id="forgot-resend-btn"
                  onClick={() => setSent(false)}
                  className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
                >
                  Resend email
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      id="forgot-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-zinc-800/80 border border-zinc-700 rounded-lg pl-9 pr-3 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/60 focus:ring-1 focus:ring-green-500/30 transition-all"
                    />
                  </div>
                </div>

                <button
                  id="forgot-submit-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-100 transition-all duration-200 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Send Reset Link
                    </>
                  )}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center text-zinc-500 text-sm mt-6">
          Remember your password?{' '}
          <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors" id="forgot-login-link">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
