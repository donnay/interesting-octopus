import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import CharacterGenerator from './components/CharacterGenerator';
import CharacterVault from './components/CharacterVault';
import DiceRoller from './components/DiceRoller';
import AuthModal from './components/AuthModal';
import { Shield, User, Dices, BookOpen, Layers, ExternalLink } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('generator');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-['Rajdhani'] selection:bg-cyan-500 selection:text-black">
      {/* Top Header / Navigation */}
      <header className="border-b border-cyan-950/80 bg-[#0a0e1a]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 shrink-0">
            <a href="/" className="flex items-center space-x-2.5 group">
              <img 
                src="/images/Genesislogo1.webp" 
                alt="Genesis RPG Logo" 
                className="h-9 w-auto max-w-[140px] object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] transition transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-['Orbitron'] font-black tracking-wider text-cyan-400 text-sm sm:text-base leading-none">
                    ENGINE
                  </span>
                  <span className="px-1.5 py-0.2 text-[9px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded">
                    v1.0
                  </span>
                </div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider hidden sm:block">
                  Sub-Domain Terminal
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'generator'
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Dices className="w-4 h-4" />
              <span>CHAR-GEN</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'vault'
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>VAULT</span>
            </button>

            <button
              onClick={() => setActiveTab('dice')}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 ${
                activeTab === 'dice'
                  ? 'bg-cyan-950/60 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Dices className="w-4 h-4" />
              <span>DICE TRAY</span>
            </button>
          </nav>

          {/* User Auth Action & Main Site Link */}
          <div className="flex items-center space-x-3">
            <a
              href="https://genesisrpg.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 hidden md:flex items-center space-x-1 transition"
            >
              <span>genesisrpg.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-3 py-1.5 bg-[#121828] hover:bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-mono flex items-center space-x-2 transition"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {user ? (user.displayName || user.email?.split('@')[0] || (user.isAnonymous ? 'Guest' : 'Agent')) : 'SIGN IN'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {activeTab === 'generator' && (
          <CharacterGenerator onSaveSuccess={() => setActiveTab('vault')} />
        )}

        {activeTab === 'vault' && (
          <CharacterVault
            onSelectCharacter={(char) => {
              setSelectedCharacter(char);
            }}
          />
        )}

        {activeTab === 'dice' && (
          <DiceRoller />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#070a12] py-6 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>Genesis RPG Game-Play Engine • Sub-Domain engine.genesisrpg.com</span>
          <div className="space-x-4">
            <a href="https://genesisrpg.com/docs/characters/character-generation/" className="hover:text-cyan-400 transition">
              Official Rules
            </a>
            <a href="https://genesisrpg.com/docs/characters/char-gen-tables/" className="hover:text-cyan-400 transition">
              Tables
            </a>
            <a href="https://genesisrpg.com" className="hover:text-cyan-400 transition">
              Portal
            </a>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

