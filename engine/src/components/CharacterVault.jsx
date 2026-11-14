import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCharacters, deleteCharacter } from '../services/characterService';
import { RACE_VISUAL_PROFILES } from '../data/raceVisuals';
import { Trash2, User, Eye, Shield, Calendar, Award, BookOpen, X, Sparkles, Wand2, FileText } from 'lucide-react';

export default function CharacterVault({ onSelectCharacter }) {
  const { user } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [inspectCharacter, setInspectCharacter] = useState(null);
  const [activeSkillCategory, setActiveSkillCategory] = useState('ALL');

  const fetchVault = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await getCharacters(user.uid);
      setCharacters(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVault();
  }, [user]);

  const handleDelete = async (charId, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to retire this character sheet?')) return;
    try {
      await deleteCharacter(user.uid, charId);
      setCharacters(prev => prev.filter(c => c.id !== charId));
    } catch (err) {
      alert(`Error deleting character: ${err.message}`);
    }
  };

  if (!user) {
    return (
      <div className="p-12 text-center bg-[#0f1422] border border-cyan-500/20 rounded-2xl">
        <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
        <h3 className="text-xl font-bold font-['Orbitron'] text-white">AUTHENTICATION REQUIRED</h3>
        <p className="text-sm text-slate-400 mt-2 max-w-md mx-auto">
          Please sign in via the upper right button to view your saved Genesis characters across devices.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-12 text-center font-mono text-cyan-400 animate-pulse">
        ACCESSING HOLONET CLOUD ARCHIVES...
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h2 className="text-2xl font-bold font-['Orbitron'] text-white">CHARACTER VAULT</h2>
          <p className="text-xs text-slate-400 font-mono">
            {characters.length} CHARACTER SHEET{characters.length === 1 ? '' : 'S'} STORED IN FIRESTORE
          </p>
        </div>
        <button
          onClick={fetchVault}
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
        >
          [ REFRESH ARCHIVES ]
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="p-12 text-center bg-[#111726]/40 border border-dashed border-slate-800 rounded-2xl">
          <User className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No characters stored yet.</p>
          <p className="text-xs text-slate-500 mt-1">Roll up a character in the generator and click &quot;Save to Cloud&quot;.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {characters.map(char => (
            <div
              key={char.id}
              onClick={() => {
                setInspectCharacter(char);
                if (onSelectCharacter) onSelectCharacter(char);
              }}
              className="bg-[#111726] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 cursor-pointer transition transform hover:-translate-y-1 shadow-lg shadow-black/40 group relative"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start space-x-3 min-w-0">
                  {/* Portrait or Race Thumbnail */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden shrink-0">
                    <img
                      src={char.imageUrl || RACE_VISUAL_PROFILES[char.raceKey?.toLowerCase()?.replace(/_.*$/, '')]?.image || '/images/Genesislogo1.webp'}
                      alt={char.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.src = '/images/Genesislogo1.webp'; }}
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-['Orbitron'] font-bold text-lg text-white group-hover:text-cyan-400 transition truncate">
                      {char.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-400 truncate">
                      {char.raceKey?.toUpperCase()} • {char.sex} • {char.vitals?.occupationName || 'Spacer'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(char.id, e)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition shrink-0"
                  title="Delete Character"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Stat badges */}
              <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-slate-800/80 text-center font-mono text-xs">
                <div className="p-1.5 bg-[#0a0d14] rounded-lg">
                  <span className="text-[10px] text-slate-500 block">PS</span>
                  <span className="font-bold text-white">{char.attributes?.ps}</span>
                </div>
                <div className="p-1.5 bg-[#0a0d14] rounded-lg">
                  <span className="text-[10px] text-slate-500 block">AG</span>
                  <span className="font-bold text-white">{char.attributes?.ag}</span>
                </div>
                <div className="p-1.5 bg-[#0a0d14] rounded-lg">
                  <span className="text-[10px] text-slate-500 block">CO</span>
                  <span className="font-bold text-white">{char.attributes?.co}</span>
                </div>
                <div className="p-1.5 bg-[#0a0d14] rounded-lg">
                  <span className="text-[10px] text-slate-500 block">AIM</span>
                  <span className="font-bold text-cyan-400">{char.secondaryStats?.aim}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Wealth: {char.vitals?.wealth?.toLocaleString() ?? 0} Đ</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setInspectCharacter(char);
                    if (onSelectCharacter) onSelectCharacter(char);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 hover:underline font-semibold flex items-center space-x-1 cursor-pointer"
                >
                  <span>View Character Sheet</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Character Sheet Inspector Modal */}
      {inspectCharacter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0f19] border border-cyan-500/40 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setInspectCharacter(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Character Header */}
            <div className="border-b border-slate-800 pb-4 pr-12 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">
                  CHARACTER SHEET ARCHIVE
                </span>
                <h3 className="text-2xl font-black font-['Orbitron'] text-white">
                  {inspectCharacter.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  {inspectCharacter.raceKey?.toUpperCase()} • {inspectCharacter.sex} • {inspectCharacter.vitals?.occupationName || 'Spacer'} • Age {inspectCharacter.vitals?.age} • Wealth {inspectCharacter.vitals?.wealth?.toLocaleString() ?? 0} Đ
                </p>
              </div>

              {/* Character Portrait or Race Reference in Header */}
              <div className="flex items-center space-x-3 bg-[#111726] border border-cyan-500/30 p-2.5 rounded-2xl shrink-0">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-black border border-cyan-400/40 shrink-0">
                  <img
                    src={inspectCharacter.imageUrl || RACE_VISUAL_PROFILES[inspectCharacter.raceKey?.toLowerCase()?.replace(/_.*$/, '')]?.image || '/images/Genesislogo1.webp'}
                    alt={inspectCharacter.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/images/Genesislogo1.webp'; }}
                  />
                </div>
                <div className="text-left font-mono text-xs">
                  <span className="text-[10px] text-cyan-400 font-bold block uppercase">
                    {inspectCharacter.imageUrl ? 'AI Generated Portrait' : 'Race Archetype'}
                  </span>
                  <span className="text-slate-300 font-semibold block">
                    {RACE_VISUAL_PROFILES[inspectCharacter.raceKey?.toLowerCase()?.replace(/_.*$/, '')]?.name || inspectCharacter.raceKey}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {inspectCharacter.vitals?.occupationName || 'Spacer'}
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Backstory Section if available */}
            {inspectCharacter.narrative && (
              <div className="p-4 bg-[#111726] border border-slate-800 rounded-xl space-y-1.5">
                <div className="flex items-center space-x-1.5 text-xs font-mono text-cyan-400 font-bold uppercase">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Character Narrative & Dossier Notes</span>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap">
                  {inspectCharacter.narrative}
                </p>
              </div>
            )}

            {/* Primary & Secondary Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center font-mono">
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">PS</span>
                <span className="text-lg font-bold text-white">{inspectCharacter.attributes?.ps}</span>
              </div>
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">AG</span>
                <span className="text-lg font-bold text-white">{inspectCharacter.attributes?.ag}</span>
              </div>
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">CO</span>
                <span className="text-lg font-bold text-white">{inspectCharacter.attributes?.co}</span>
              </div>
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">PR</span>
                <span className="text-lg font-bold text-white">{inspectCharacter.attributes?.pr}</span>
              </div>
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">WS</span>
                <span className="text-lg font-bold text-white">{inspectCharacter.attributes?.ws}</span>
              </div>
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">IT</span>
                <span className="text-lg font-bold text-white">{inspectCharacter.attributes?.it}</span>
              </div>
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">MC</span>
                <span className="text-lg font-bold text-white">{inspectCharacter.attributes?.mc}</span>
              </div>
              <div className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl">
                <span className="text-[10px] text-slate-500 block">IN</span>
                <span className="text-lg font-bold text-cyan-400">{inspectCharacter.attributes?.in}</span>
              </div>
            </div>

            {/* Combat Specs */}
            <div className="grid grid-cols-3 gap-3 text-center font-mono">
              <div className="p-3 bg-[#111726] border border-cyan-500/20 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">AIM (AM)</span>
                <span className="text-xl font-black text-cyan-400">{inspectCharacter.secondaryStats?.aim}</span>
              </div>
              <div className="p-3 bg-[#111726] border border-cyan-500/20 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">BRAWL (BR)</span>
                <span className="text-xl font-black text-amber-400">{inspectCharacter.secondaryStats?.brawl}</span>
              </div>
              <div className="p-3 bg-[#111726] border border-cyan-500/20 rounded-xl">
                <span className="text-[10px] text-slate-400 block uppercase">MOVE (MV)</span>
                <span className="text-xl font-black text-emerald-400">{inspectCharacter.secondaryStats?.move}</span>
              </div>
            </div>

            {/* Encultured Skills (Table #1-7) */}
            {inspectCharacter.enculturedSkills && inspectCharacter.enculturedSkills.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold tracking-wider uppercase text-cyan-400 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Encultured Skills (Table #1-7 Baseline Aptitude)</span>
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">
                    {inspectCharacter.enculturedSkills.length} Skills
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {inspectCharacter.enculturedSkills.map((sk, idx) => (
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
            {inspectCharacter.sheetSkills && inspectCharacter.sheetSkills.length > 0 && (
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

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-[360px] overflow-y-auto pr-1">
                  {inspectCharacter.sheetSkills
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

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setInspectCharacter(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-mono transition"
              >
                Close Character Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

