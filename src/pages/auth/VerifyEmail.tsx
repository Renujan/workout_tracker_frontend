import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Mail, CheckCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CODE_LENGTH = 6;

export const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [resent, setResent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInput = (idx: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...code];
    next[idx] = val;
    setCode(next);
    setError('');
    if (val && idx < CODE_LENGTH - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
    if (pasted.length === CODE_LENGTH) {
      setCode(pasted.split(''));
      inputRefs.current[CODE_LENGTH - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length < CODE_LENGTH) {
      setError('Please enter the full 6-digit code.');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    // Accept any 6-digit code for demo
    setVerified(true);
  };

  const handleResend = async () => {
    setResent(true);
    await new Promise((r) => setTimeout(r, 800));
    setTimeout(() => setResent(false), 3000);
  };

  const maskedEmail = user?.email
    ? user.email.replace(/(.{2})(.*)(@.*)/, '$1***$3')
    : 'your email';

  return (
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-green-500/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full bg-emerald-600/5 blur-3xl" />
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
          <h1 className="text-2xl font-black text-white">Verify your email</h1>
          <p className="text-zinc-500 text-sm mt-1 max-w-xs mx-auto leading-relaxed">
            We sent a 6-digit code to <span className="text-zinc-300 font-medium">{maskedEmail}</span>
          </p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 shadow-2xl">
          <AnimatePresence mode="wait">
            {verified ? (
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Email verified!</h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Your account is ready. Let's get you set up!
                </p>
                <button
                  id="verify-continue-btn"
                  onClick={() => navigate('/onboarding')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 hover:scale-[1.02] transition-all"
                >
                  Continue to Setup →
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" className="space-y-5">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                      <Mail size={18} className="text-blue-400" />
                    </div>
                  </div>

                  {/* Code input */}
                  <div className="flex gap-2 justify-center" onPaste={handlePaste}>
                    {code.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`verify-code-${idx}`}
                        ref={(el) => { inputRefs.current[idx] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleInput(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        className={`w-11 h-13 text-center text-xl font-bold rounded-xl bg-zinc-800/80 border transition-all outline-none ${
                          digit
                            ? 'border-green-500/60 text-white'
                            : 'border-zinc-700 text-zinc-400'
                        } focus:border-green-500 focus:ring-2 focus:ring-green-500/20`}
                        style={{ height: '3.25rem' }}
                      />
                    ))}
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-red-400 text-xs text-center mt-3"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  id="verify-submit-btn"
                  onClick={handleVerify}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm shadow-lg shadow-green-500/25 hover:scale-[1.02] transition-all disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Verifying…
                    </span>
                  ) : (
                    'Verify Email'
                  )}
                </button>

                <div className="text-center">
                  <button
                    id="verify-resend-btn"
                    onClick={handleResend}
                    disabled={resent}
                    className="flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 mx-auto transition-colors disabled:opacity-60"
                  >
                    <RefreshCw size={13} className={resent ? 'animate-spin' : ''} />
                    {resent ? 'Code resent!' : "Didn't receive it? Resend"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
