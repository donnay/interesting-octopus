import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import CharacterGenerator from './components/CharacterGenerator';
import CharacterVault from './components/CharacterVault';
import DiceRoller from './components/DiceRoller';
import AuthModal from './components/AuthModal';
import CharacterSheetView from './components/CharacterSheetView';
import { getCharacterById } from './services/characterService';
import { Shield, User, Dices, BookOpen, Layers, ExternalLink, Menu, X } from 'lucide-react';

function AppContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('generator');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [standaloneSheet, setStandaloneSheet] = useState(null);
  const [isStandaloneLoading, setIsStandaloneLoading] = useState(false);

  // Check for standalone sheet view parameters in URL (e.g. ?sheetId=...&storageKey=...#sheet)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const storageKey = urlParams.get('storageKey');
    const sheetId = urlParams.get('sheetId');

    if (hash === '#sheet' || storageKey || sheetId) {
      if (storageKey) {
        try {
          const stored = localStorage.getItem(storageKey);
          if (stored) {
            setStandaloneSheet(JSON.parse(stored));
            return;
          }
        } catch (err) {
          console.error('Error reading standalone sheet from localStorage:', err);
        }
      }

      // If not in localStorage but sheetId exists and user is available, attempt Firestore fetch
      if (sheetId && user) {
        setIsStandaloneLoading(true);
        getCharacterById(user.uid, sheetId)
          .then((char) => {
            if (char) setStandaloneSheet(char);
          })
          .catch((err) => console.error('Error fetching character by ID for standalone sheet:', err))
          .finally(() => setIsStandaloneLoading(false));
      }
    }
  }, [user]);

  // If viewing in standalone sheet mode, render full page character sheet
  if (standaloneSheet) {
    return (
      <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-['Rajdhani'] selection:bg-cyan-500 selection:text-black p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto w-full mb-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
          >
            <span>← Return to Genesis Engine</span>
          </a>
          <span className="text-xs font-mono text-slate-500">Standalone Character Record</span>
        </div>
        <CharacterSheetView
          character={standaloneSheet}
          onClose={() => setStandaloneSheet(null)}
          isStandalone={true}
        />
      </div>
    );
  }

  if (isStandaloneLoading) {
    return (
      <div className="min-h-screen bg-[#070a12] text-slate-100 flex items-center justify-center font-['Rajdhani']">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="font-mono text-sm text-cyan-300">Retrieving Genesis Character Sheet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 flex flex-col font-['Rajdhani'] selection:bg-cyan-500 selection:text-black">
      {/* Top Header / Navigation */}
      <header className="border-b border-cyan-950/80 bg-[#0a0e1a]/95 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <a href="/" className="flex items-center space-x-2 group">
              <img 
                src="/images/Genesislogo1.webp" 
                alt="Genesis RPG Logo" 
                className="h-8 sm:h-9 w-auto max-w-[120px] sm:max-w-[140px] object-contain drop-shadow-[0_0_8px_rgba(6,182,212,0.3)] transition transform group-hover:scale-105"
              />
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-['Orbitron'] font-black tracking-wider text-cyan-400 text-xs sm:text-base leading-none">
                    ENGINE
                  </span>
                  <span className="px-1.5 py-0.2 text-[8px] sm:text-[9px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 rounded">
                    v1.0
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 uppercase tracking-wider hidden sm:block">
                  Sub-Domain Terminal
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1.5 lg:space-x-2">
            <button
              onClick={() => setActiveTab('generator')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Dices className="w-4 h-4 text-cyan-400" />
              <span>CHAR-GEN</span>
            </button>

            <button
              onClick={() => setActiveTab('vault')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>VAULT</span>
            </button>

            <button
              onClick={() => setActiveTab('dice')}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-2 cursor-pointer ${
                activeTab === 'dice'
                  ? 'bg-cyan-950/70 text-cyan-300 border border-cyan-500/50 shadow-sm shadow-cyan-950'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <Dices className="w-4 h-4 text-cyan-400" />
              <span>DICE TRAY</span>
            </button>
          </nav>

          {/* User Auth Action, Main Site Link & Mobile Menu Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="https://genesisrpg.com"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-slate-400 hover:text-cyan-400 hidden lg:flex items-center space-x-1 transition"
              title="Return to Genesis Tabletop RPG Portal"
            >
              <span>genesisrpg.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={() => setIsAuthOpen(true)}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 bg-[#121828] hover:bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-mono flex items-center space-x-1.5 sm:space-x-2 transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="max-w-[100px] truncate text-[11px] sm:text-xs">
                {user ? (user.displayName || user.email?.split('@')[0] || (user.isAnonymous ? 'Guest' : 'Agent')) : 'SIGN IN'}
              </span>
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-cyan-900/40 bg-[#0a0e1a]/98 px-4 py-4 space-y-2.5 animate-fadeIn shadow-2xl">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Engine Navigation</span>
              <span className="text-slate-500">genesisrpg-engine</span>
            </div>

            <button
              onClick={() => {
                setActiveTab('generator');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between cursor-pointer ${
                activeTab === 'generator'
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 shadow-md shadow-cyan-950'
                  : 'bg-[#0f1422] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Dices className="w-4 h-4 text-cyan-400" />
                <span>Character Generator</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">CHAR-GEN</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('vault');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between cursor-pointer ${
                activeTab === 'vault'
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 shadow-md shadow-cyan-950'
                  : 'bg-[#0f1422] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Character Vault</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">SHEETS & VAULT</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('dice');
                setMobileMenuOpen(false);
              }}
              className={`w-full px-4 py-3 rounded-xl text-sm font-semibold transition flex items-center justify-between cursor-pointer ${
                activeTab === 'dice'
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/60 shadow-md shadow-cyan-950'
                  : 'bg-[#0f1422] text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Dices className="w-4 h-4 text-cyan-400" />
                <span>Dice Roller Tray</span>
              </div>
              <span className="text-[10px] font-mono text-cyan-400">DICE TRAY</span>
            </button>

            {/* Quick Links Section for Mobile */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <a
                href="https://genesisrpg.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 text-cyan-400 hover:text-cyan-300 py-1"
              >
                <span>Genesis RPG Main Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-[10px] text-slate-600">v1.0 Sub-Domain</span>
            </div>
          </div>
        )}
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

