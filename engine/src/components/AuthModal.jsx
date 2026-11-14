import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, LogOut, User, Shield, AlertCircle } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { user, loginWithGoogle, loginWithEmail, signupWithEmail, loginAsGuest, logout, authError } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [localError, setLocalError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setLocalError('');
    try {
      if (isSignUp) {
        await signupWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      onClose();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    setLocalError('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuest = async () => {
    setSubmitting(true);
    setLocalError('');
    try {
      await loginAsGuest();
      onClose();
    } catch (err) {
      setLocalError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#0f1422] border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-950/50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-mono"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl mb-3 text-cyan-400">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold font-['Orbitron'] tracking-wide text-white">
            {user ? 'AGENT IDENTITY' : isSignUp ? 'CREATE ACCESS ID' : 'TERMINAL LOGIN'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-mono">
            {user ? 'Connected to Genesis HoloNet' : 'Authenticate to store & retrieve characters'}
          </p>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-[#141b2d] border border-slate-700/60 rounded-xl flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <User className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">
                  {user.displayName || user.email || (user.isAnonymous ? 'Guest Agent' : 'Authenticated User')}
                </p>
                <p className="text-xs text-slate-400 font-mono truncate">
                  {user.isAnonymous ? 'Temporary session' : user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => { logout(); onClose(); }}
              className="w-full py-2.5 px-4 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-700/50 rounded-xl font-mono text-sm flex items-center justify-center space-x-2 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>DISCONNECT IDENTITY</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {(localError || authError) && (
              <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-lg text-xs text-red-300 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{localError || authError}</span>
              </div>
            )}

            <button
              onClick={handleGoogle}
              disabled={submitting}
              className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 rounded-xl font-medium text-sm flex items-center justify-center space-x-2 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-700 w-full"></div>
              <span className="bg-[#0f1422] px-3 text-[10px] tracking-widest text-slate-500 uppercase font-mono">OR EMAIL</span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="agent@genesisrpg.com"
                  className="w-full px-3.5 py-2 bg-[#141b2d] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Passcode</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-[#141b2d] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-xl text-sm transition shadow-lg shadow-cyan-950/40"
              >
                {submitting ? 'AUTHENTICATING...' : isSignUp ? 'CREATE ACCOUNT' : 'SIGN IN'}
              </button>
            </form>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="hover:text-cyan-400 transition"
              >
                {isSignUp ? 'Already have an ID? Sign in' : "Need an ID? Create one"}
              </button>
              <button
                type="button"
                onClick={handleGuest}
                disabled={submitting}
                className="hover:text-amber-400 transition font-mono"
              >
                Continue as Guest →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

