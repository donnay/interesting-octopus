import React, { useState } from 'react';
import { RACE_VISUAL_PROFILES } from '../data/raceVisuals';
import { X, Sparkles, BookOpen, ExternalLink, Printer, Shield, FileText } from 'lucide-react';

export default function CharacterSheetView({ character, onClose, isStandalone = false }) {
  const [activeSkillCategory, setActiveSkillCategory] = useState('ALL');

  if (!character) return null;

  const handleOpenInNewTab = () => {
    try {
      const charKey = `genesis_sheet_${character.id || Date.now()}`;
      localStorage.setItem(charKey, JSON.stringify(character));
      const url = `${window.location.origin}${window.location.pathname}?sheetId=${character.id}&storageKey=${charKey}#sheet`;
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error('Failed to open character sheet in new tab:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const content = (
    <div className="bg-[#0b0f19] border border-cyan-500/40 rounded-2xl w-full max-w-5xl overflow-y-auto p-6 space-y-6 shadow-2xl relative text-slate-100 font-['Rajdhani']">
      {/* Action Controls in Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">
            GENESIS OFFICIAL CHARACTER SHEET (PAGE 1 & 2)
          </span>
          <h3 className="text-3xl font-black font-['Orbitron'] text-white mt-0.5">
            {character.name}
          </h3>
          <p className="text-xs font-mono text-slate-400 mt-1">
            {character.raceKey?.toUpperCase()} • {character.sex} • {character.vitals?.occupationName || 'Spacer'} • Age {character.vitals?.age} • Wealth {character.vitals?.wealth?.toLocaleString() ?? 0} Đ
          </p>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {!isStandalone && (
            <button
              type="button"
              onClick={handleOpenInNewTab}
              className="px-3 py-1.5 bg-[#121828] hover:bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition shadow-sm cursor-pointer"
              title="Open Character Sheet in a New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open in New Tab</span>
            </button>
          )}

          <button
            type="button"
            onClick={handlePrint}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            title="Print Character Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
              title="Close Sheet"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Visual Identity & Narrative Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start bg-[#111726]/60 border border-slate-800/80 p-4 rounded-xl">
        <div className="md:col-span-3 flex items-center space-x-3.5">
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-black border-2 border-cyan-500/40 shrink-0 shadow-lg shadow-black">
            <img
              src={character.imageUrl || RACE_VISUAL_PROFILES[character.raceKey?.toLowerCase()?.replace(/_.*$/, '')]?.image || '/images/Genesislogo1.webp'}
              alt={character.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.src = '/images/Genesislogo1.webp'; }}
            />
          </div>
          <div className="font-mono text-xs">
            <span className="text-[10px] text-cyan-400 font-bold block uppercase">
              {character.imageUrl ? 'AI Generated Portrait' : 'Race Archetype'}
            </span>
            <span className="text-white font-bold text-sm block">
              {RACE_VISUAL_PROFILES[character.raceKey?.toLowerCase()?.replace(/_.*$/, '')]?.name || character.raceKey}
            </span>
            <span className="text-slate-400 text-[11px] block">
              {character.vitals?.occupationName || 'Spacer'}
            </span>
          </div>
        </div>

        <div className="md:col-span-9 font-mono text-xs border-t md:border-t-0 md:border-l border-slate-800 md:pl-4 pt-3 md:pt-0">
          <span className="text-[10px] uppercase text-cyan-400 tracking-wider block font-bold mb-1">
            Character Dossier & Backstory
          </span>
          <p className="text-slate-300 font-sans text-xs leading-relaxed italic whitespace-pre-wrap">
            {character.narrative ? character.narrative : 'No custom narrative recorded for this character.'}
          </p>
        </div>
      </div>

      {/* Primary Attributes (Tables #1-2 & #1-4) */}
      <div className="space-y-2">
        <span className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 block">
          Primary Attributes (Tables #1-2 & #1-4)
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center font-mono">
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">PS</span>
            <span className="text-lg font-bold text-white">{character.attributes?.ps}</span>
          </div>
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">AG</span>
            <span className="text-lg font-bold text-white">{character.attributes?.ag}</span>
          </div>
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">CO</span>
            <span className="text-lg font-bold text-white">{character.attributes?.co}</span>
          </div>
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">PR</span>
            <span className="text-lg font-bold text-white">{character.attributes?.pr}</span>
          </div>
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">WS</span>
            <span className="text-lg font-bold text-white">{character.attributes?.ws}</span>
          </div>
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">IT</span>
            <span className="text-lg font-bold text-white">{character.attributes?.it}</span>
          </div>
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">MC</span>
            <span className="text-lg font-bold text-white">{character.attributes?.mc}</span>
          </div>
          <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
            <span className="text-[10px] text-slate-500 block">IN</span>
            <span className="text-lg font-bold text-cyan-400">{character.attributes?.in}</span>
          </div>
        </div>
      </div>

      {/* Combat Specs (Secondary Stats) */}
      <div className="grid grid-cols-3 gap-3 text-center font-mono">
        <div className="p-3 bg-[#111726] border border-cyan-500/20 rounded-xl">
          <span className="text-[10px] text-slate-400 block uppercase">AIM (AM)</span>
          <span className="text-xl font-black text-cyan-400">{character.secondaryStats?.aim}</span>
        </div>
        <div className="p-3 bg-[#111726] border border-cyan-500/20 rounded-xl">
          <span className="text-[10px] text-slate-400 block uppercase">BRAWL (BR)</span>
          <span className="text-xl font-black text-amber-400">{character.secondaryStats?.brawl}</span>
        </div>
        <div className="p-3 bg-[#111726] border border-cyan-500/20 rounded-xl">
          <span className="text-[10px] text-slate-400 block uppercase">MOVE (MV)</span>
          <span className="text-xl font-black text-emerald-400">{character.secondaryStats?.move}</span>
        </div>
      </div>

      {/* Encultured Skills (Table #1-7) */}
      {character.enculturedSkills && character.enculturedSkills.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Encultured Skills (Table #1-7 Baseline Aptitude)</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-500">
              {character.enculturedSkills.length} Skills
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {character.enculturedSkills.map((sk, idx) => (
              <div
                key={`${sk.name}-${idx}`}
                className="p-2.5 bg-[#111726] border border-cyan-500/30 rounded-xl flex items-center justify-between text-xs font-mono"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-white truncate">{sk.name}</div>
                  <div className="text-[10px] text-slate-500">{sk.category} {sk.subSpecialtyOf ? `• ${sk.subSpecialtyOf}` : ''}</div>
                </div>
                <span className="text-base font-black text-cyan-400 shrink-0">
                  {sk.aptitude}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full 69 Sheet Skills */}
      {character.sheetSkills && character.sheetSkills.length > 0 && (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-white flex items-center space-x-1.5">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Character Sheet (Page 2) • Full 69 Skills</span>
            </h4>

            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {['ALL', 'COMBAT', 'LANGUAGE', 'NON-TECH', 'SCIENCE', 'SOCIO-SCI', 'TECH', 'ADDITIONAL'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-2 py-0.5 rounded text-[10px] ${
                    activeSkillCategory === cat
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'bg-[#111726] text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[380px] overflow-y-auto pr-1">
            {character.sheetSkills
              .filter(sk => activeSkillCategory === 'ALL' || sk.area === activeSkillCategory || sk.category === activeSkillCategory)
              .map(sk => (
                <div
                  key={sk.id}
                  className={`p-2 rounded-lg border text-xs font-mono flex items-center justify-between ${
                    sk.isEncultured
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200'
                      : 'bg-[#111726] border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="min-w-0 pr-2 truncate">
                    <span className="text-[10px] text-slate-500 mr-1.5">#{sk.id}</span>
                    <span className={sk.isEncultured ? 'text-cyan-300 font-bold' : 'text-slate-300'}>
                      {sk.name}
                    </span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`font-black ${sk.isEncultured ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {sk.aptitude}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Footer controls */}
      <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
        <span>Genesis RPG HoloNet Record • {character.id || 'Active Dossier'}</span>
        {onClose && (
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono transition"
          >
            Close Sheet
          </button>
        )}
      </div>
    </div>
  );

  if (isStandalone) {
    return (
      <div className="min-h-screen bg-[#070a12] p-4 sm:p-6 md:p-8 flex justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="max-h-[92vh] overflow-y-auto w-full max-w-5xl">
        {content}
      </div>
    </div>
  );
}
