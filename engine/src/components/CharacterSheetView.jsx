import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { RACE_VISUAL_PROFILES } from '../data/raceVisuals';
import { updateCharacterNotes } from '../services/characterService';
import { 
  X, 
  Sparkles, 
  BookOpen, 
  ExternalLink, 
  Printer, 
  Shield, 
  FileText, 
  HeartPulse, 
  Dices, 
  Save, 
  Check, 
  Maximize2, 
  Package, 
  Crosshair, 
  Truck, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function CharacterSheetView({ character: initialChar, onClose, isStandalone = true }) {
  const { user } = useAuth();
  const [character, setCharacter] = useState(initialChar);
  const [activeSkillCategory, setActiveSkillCategory] = useState('ALL');

  // Full-size image popup state
  const [isFullImageOpen, setIsFullImageOpen] = useState(false);

  // Editable Player Notes State (Equipment, Weapons, Vehicles, Comments)
  const [equipmentNotes, setEquipmentNotes] = useState(
    character?.equipmentNotes || character?.notes?.equipment || ''
  );
  const [weaponsNotes, setWeaponsNotes] = useState(
    character?.weaponsNotes || character?.notes?.weapons || ''
  );
  const [vehiclesNotes, setVehiclesNotes] = useState(
    character?.vehiclesNotes || character?.notes?.vehicles || ''
  );
  const [commentsNotes, setCommentsNotes] = useState(
    character?.commentsNotes || character?.generalNotes || character?.notes?.comments || ''
  );

  // Active notes tab
  const [activeNotesTab, setActiveNotesTab] = useState('equipment');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaveStatus, setNotesSaveStatus] = useState('');

  if (!character) return null;

  const normalizedRace = (character.raceKey || 'human').toLowerCase().replace(/_.*$/, '');
  const raceProfile = RACE_VISUAL_PROFILES[normalizedRace] || RACE_VISUAL_PROFILES.human;
  const characterImageUrl = character.imageUrl || character.aiPortrait || raceProfile?.image || '/images/Genesislogo1.webp';

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

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    setNotesSaveStatus('');

    const notesPayload = {
      equipmentNotes: equipmentNotes.slice(0, 5000),
      weaponsNotes: weaponsNotes.slice(0, 5000),
      vehiclesNotes: vehiclesNotes.slice(0, 5000),
      commentsNotes: commentsNotes.slice(0, 5000),
      generalNotes: commentsNotes.slice(0, 5000),
      notes: {
        equipment: equipmentNotes.slice(0, 5000),
        weapons: weaponsNotes.slice(0, 5000),
        vehicles: vehiclesNotes.slice(0, 5000),
        comments: commentsNotes.slice(0, 5000),
      }
    };

    // Also update local character state & local storage cache
    const updatedChar = {
      ...character,
      ...notesPayload
    };
    setCharacter(updatedChar);

    const charKey = `genesis_sheet_${character.id}`;
    try {
      localStorage.setItem(charKey, JSON.stringify(updatedChar));
    } catch (e) {
      console.warn('Could not update localStorage copy:', e);
    }

    if (user && character.id) {
      try {
        await updateCharacterNotes(user.uid, character.id, notesPayload);
        setNotesSaveStatus('Saved to HoloNet cloud!');
      } catch (err) {
        console.error('Failed to save notes to Firestore:', err);
        setNotesSaveStatus(`Saved locally (Cloud sync: ${err.message})`);
      }
    } else {
      setNotesSaveStatus('Saved to local session (sign in to persist to Cloud HoloNet).');
    }

    setIsSavingNotes(false);
    setTimeout(() => setNotesSaveStatus(''), 4000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 text-slate-100 font-['Rajdhani'] animate-fadeIn pb-16">
      {/* Top Banner / Actions Bar */}
      <div className="bg-[#0b0f19] border border-cyan-500/40 rounded-2xl p-6 shadow-2xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Genesis Tabletop RPG Official Character Record • Pages 1 & 2</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-['Orbitron'] text-white tracking-wide">
              {character.name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-slate-400 mt-1">
              Species: <span className="text-cyan-300 font-bold">{character.raceKey?.toUpperCase()}</span> • 
              Sex: <span className="text-white font-medium">{character.sex}</span> • 
              Occupation: <span className="text-white font-medium">{character.vitals?.occupationName || 'Spacer'}</span> • 
              Age: <span className="text-white font-medium">{character.vitals?.age} yrs</span> • 
              Height: <span className="text-white font-medium">{character.vitals?.height} m</span> • 
              Mass: <span className="text-white font-medium">{character.vitals?.mass} kg</span> • 
              Wealth: <span className="text-amber-400 font-bold">{character.vitals?.wealth?.toLocaleString() ?? 0} Đ</span>
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 bg-[#121828] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-mono flex items-center space-x-1.5 transition cursor-pointer"
              title="Print Official Character Sheet"
            >
              <Printer className="w-4 h-4 text-cyan-400" />
              <span>Print Sheet</span>
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-mono transition cursor-pointer"
              >
                Close View
              </button>
            )}
          </div>
        </div>

        {/* Character Identity & Large Visual Portrait Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-start">
          {/* Larger Character Image with Click-to-Enlarge */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div 
              onClick={() => setIsFullImageOpen(true)}
              className="group relative w-full max-w-[320px] aspect-square rounded-2xl overflow-hidden border-2 border-cyan-500/50 bg-black cursor-pointer shadow-2xl shadow-cyan-950/60 transition-transform duration-300 hover:scale-[1.02] hover:border-cyan-400"
              title="Click to view full-size character portrait"
            >
              <img
                src={characterImageUrl}
                alt={`${character.name} Portrait`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => { e.currentTarget.src = '/images/Genesislogo1.webp'; }}
              />

              {/* Hover Overlay with Enlarge Icon */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-cyan-300 font-mono text-xs">
                <Maximize2 className="w-8 h-8 mb-1 drop-shadow-md" />
                <span className="font-bold tracking-wider">CLICK TO ENLARGE</span>
              </div>

              {/* Badge */}
              <div className="absolute bottom-0 inset-x-0 p-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between font-mono text-[10px]">
                <span className="text-cyan-300 font-bold uppercase truncate">
                  {character.imageUrl || character.aiPortrait ? '🍌 Nano Banana Portrait' : 'Canonical Race Archetype'}
                </span>
                <span className="text-slate-400 shrink-0 flex items-center space-x-1">
                  <Maximize2 className="w-3 h-3" />
                  <span>Full Size</span>
                </span>
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-500 mt-2 text-center">
              Click character image to open full-size high-resolution viewer
            </p>
          </div>

          {/* Narrative & Species Archetype Notes */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#111726]/80 border border-slate-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800 text-xs font-mono">
                <span className="text-cyan-400 font-bold uppercase flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Character Dossier & Backstory Narrative</span>
                </span>
                <span className="text-slate-500">Player Record</span>
              </div>
              <p className="text-slate-300 font-sans text-sm leading-relaxed whitespace-pre-wrap italic">
                {character.narrative && character.narrative.trim().length > 0
                  ? character.narrative
                  : "No player narrative notes recorded. You can add notes on background, demeanor, or origin."}
              </p>
            </div>

            {/* Canonical Race Reference Profile */}
            <div className="bg-[#111726]/80 border border-slate-800 rounded-xl p-4 space-y-2 font-mono text-xs">
              <div className="flex items-center justify-between text-xs pb-1.5 border-b border-slate-800">
                <span className="text-cyan-400 font-bold uppercase">
                  Canonical Physiology: {raceProfile?.name || character.raceKey}
                </span>
                <span className="text-slate-500 text-[10px]">Official Genesis Sourcebook</span>
              </div>
              <p className="text-slate-400 font-sans text-xs leading-normal">
                {raceProfile?.visualDescription || "Official anatomical description and species notes."}
              </p>
            </div>

            {/* Appearance & Influence Adjustments */}
            {character.appearance && (
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 bg-[#111726]/80 border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">Appearance Roll:</span>
                  <span className="text-white font-bold">{character.appearance} / 100</span>
                </div>
                {character.appearanceInfo && (
                  <div className="p-3 bg-[#111726]/80 border border-slate-800 rounded-xl flex justify-between items-center">
                    <span className="text-slate-400">Appraisal & Mod:</span>
                    <span className="text-cyan-400 font-bold">
                      {character.appearanceInfo.desc} ({character.appearanceInfo.mod >= 0 ? `+${character.appearanceInfo.mod}` : character.appearanceInfo.mod})
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Grid: Primary Attributes & Combat Specs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Primary Attributes (Tables #1-2 & #1-4) */}
        <div className="lg:col-span-8 bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-['Orbitron'] text-sm tracking-wide text-white font-bold">
              PRIMARY ATTRIBUTES (TABLES #1-2 & #1-4)
            </span>
            <span className="text-xs font-mono text-cyan-400">Base + Variance</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 block">PS (Strength)</span>
              <span className="text-2xl font-black text-white">{character.attributes?.ps}</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 block">AG (Agility)</span>
              <span className="text-2xl font-black text-white">{character.attributes?.ag}</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 block">CO (Constitution)</span>
              <span className="text-2xl font-black text-white">{character.attributes?.co}</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 block">PR (Perception)</span>
              <span className="text-2xl font-black text-white">{character.attributes?.pr}</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 block">WS (Willpower)</span>
              <span className="text-2xl font-black text-white">{character.attributes?.ws}</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 block">IT (Intellect)</span>
              <span className="text-2xl font-black text-white">{character.attributes?.it}</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl">
              <span className="text-xs text-slate-400 block">MC (Mental Ctrl)</span>
              <span className="text-2xl font-black text-white">{character.attributes?.mc}</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl border-cyan-500/40">
              <span className="text-xs text-slate-400 block">IN (Influence)</span>
              <span className="text-2xl font-black text-cyan-400">{character.attributes?.in}</span>
            </div>
          </div>
        </div>

        {/* Secondary Combat Attributes */}
        <div className="lg:col-span-4 bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-['Orbitron'] text-sm tracking-wide text-white font-bold">
              COMBAT SPECS
            </span>
            <span className="text-xs font-mono text-cyan-400">Secondary</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="p-3 bg-[#111726] border border-cyan-500/30 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase">AIM</span>
              <span className="text-2xl font-black font-['Orbitron'] text-cyan-400">
                {character.secondaryStats?.aim}
              </span>
              <span className="text-[9px] text-slate-500 block">AM</span>
            </div>
            <div className="p-3 bg-[#111726] border border-amber-500/30 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase">BRAWL</span>
              <span className="text-2xl font-black font-['Orbitron'] text-amber-400">
                {character.secondaryStats?.brawl}
              </span>
              <span className="text-[9px] text-slate-500 block">BR</span>
            </div>
            <div className="p-3 bg-[#111726] border border-emerald-500/30 rounded-xl">
              <span className="text-[10px] text-slate-400 block uppercase">MOVE</span>
              <span className="text-2xl font-black font-['Orbitron'] text-emerald-400">
                {character.secondaryStats?.move}
              </span>
              <span className="text-[9px] text-slate-500 block">MV</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Damage Points & Background Skills Allocations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table #1-5: Damage Points per Segment */}
        <div className="lg:col-span-6 bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
              <HeartPulse className="w-4 h-4" />
              <span className="font-bold">Damage Record (Table #1-5)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Max Points per Segment</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            {character.damagePoints && Object.entries(character.damagePoints).map(([key, item]) => {
              if (item.max === 0) return null;
              return (
                <div key={key} className="p-2.5 bg-[#111726] border border-slate-800 rounded-xl flex items-center justify-between">
                  <span className="text-slate-300 truncate pr-1">{item.name}</span>
                  <span className="text-cyan-400 font-bold shrink-0">{item.max} pts</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Table #1-6: Background Skill Points Allocation */}
        <div className="lg:col-span-6 bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span className="font-bold">Background Skills (Table #1-6)</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Racial Allocation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl flex justify-between items-center">
              <span className="text-slate-400">Combat:</span>
              <span className="text-base font-bold text-white">{character.bgSkills?.com ?? 0} pts</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl flex justify-between items-center">
              <span className="text-slate-400">Language:</span>
              <span className="text-base font-bold text-white">{character.bgSkills?.lang ?? 0} pts</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl flex justify-between items-center">
              <span className="text-slate-400">Non-Technical:</span>
              <span className="text-base font-bold text-white">{character.bgSkills?.nontech ?? 0} pts</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl flex justify-between items-center">
              <span className="text-slate-400">Science:</span>
              <span className="text-base font-bold text-white">{character.bgSkills?.sci ?? 0} pts</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl flex justify-between items-center">
              <span className="text-slate-400">Social Science:</span>
              <span className="text-base font-bold text-white">{character.bgSkills?.socio ?? 0} pts</span>
            </div>
            <div className="p-3 bg-[#111726] border border-slate-800 rounded-xl flex justify-between items-center">
              <span className="text-slate-400">Technical:</span>
              <span className="text-base font-bold text-white">{character.bgSkills?.tech ?? 0} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Player Notes: Equipment, Weapons, Vehicles, Comments */}
      <div className="bg-[#0b0f19] border border-cyan-500/40 rounded-2xl p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block">
              CUSTOM PLAYER ARCHIVE & GEAR MANIFEST
            </span>
            <h3 className="text-xl font-bold font-['Orbitron'] text-white">
              EQUIPMENT, WEAPONS, VEHICLES & COMMENTS
            </h3>
          </div>

          <div className="flex items-center space-x-2">
            {notesSaveStatus && (
              <span className="text-xs font-mono text-emerald-400 animate-fadeIn flex items-center space-x-1">
                <Check className="w-3.5 h-3.5" />
                <span>{notesSaveStatus}</span>
              </span>
            )}
            <button
              type="button"
              onClick={handleSaveNotes}
              disabled={isSavingNotes}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black font-mono text-xs uppercase rounded-xl transition flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSavingNotes ? 'Saving Notes...' : 'Save Notes'}</span>
            </button>
          </div>
        </div>

        {/* Notes Tabs */}
        <div className="flex flex-wrap gap-2 pt-1 border-b border-slate-800 pb-3">
          <button
            type="button"
            onClick={() => setActiveNotesTab('equipment')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition ${
              activeNotesTab === 'equipment'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-cyan-400" />
            <span>Equipment & Inventory</span>
            {equipmentNotes && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>}
          </button>

          <button
            type="button"
            onClick={() => setActiveNotesTab('weapons')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition ${
              activeNotesTab === 'weapons'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Crosshair className="w-3.5 h-3.5 text-amber-400" />
            <span>Weapons & Armaments</span>
            {weaponsNotes && <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>}
          </button>

          <button
            type="button"
            onClick={() => setActiveNotesTab('vehicles')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition ${
              activeNotesTab === 'vehicles'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vehicles & Starships</span>
            {vehiclesNotes && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
          </button>

          <button
            type="button"
            onClick={() => setActiveNotesTab('comments')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono flex items-center space-x-2 transition ${
              activeNotesTab === 'comments'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'bg-[#111726] text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
            <span>Comments & Campaign Notes</span>
            {commentsNotes && <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>}
          </button>
        </div>

        {/* Notes Editor Area */}
        <div className="pt-2">
          {activeNotesTab === 'equipment' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Personal gear, utility belts, communicators, scanner modules, credits, rations:</span>
                <span className="text-[10px] text-slate-500">{equipmentNotes.length}/5000</span>
              </div>
              <textarea
                value={equipmentNotes}
                onChange={(e) => setEquipmentNotes(e.target.value)}
                placeholder="List your standard equipment, encrypted comm-pads, breathers, medical stims, survival gear..."
                rows={6}
                maxLength={5000}
                className="w-full p-3.5 bg-[#0a0d14] border border-slate-800 focus:border-cyan-400 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans leading-relaxed resize-y"
              />
            </div>
          )}

          {activeNotesTab === 'weapons' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Sidearms, energy rifles, archaic blades, ammo clips, range & damage specifications:</span>
                <span className="text-[10px] text-slate-500">{weaponsNotes.length}/5000</span>
              </div>
              <textarea
                value={weaponsNotes}
                onChange={(e) => setWeaponsNotes(e.target.value)}
                placeholder="List weapons, ammo counts, calibrations (e.g. 'Plasma Carbine - Mk IV, 4 charge packs, Range 40m, Damage 4d10...')"
                rows={6}
                maxLength={5000}
                className="w-full p-3.5 bg-[#0a0d14] border border-slate-800 focus:border-amber-400 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans leading-relaxed resize-y"
              />
            </div>
          )}

          {activeNotesTab === 'vehicles' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Planetary skimmers, starfighters, cargo freighters, drive specs & modifications:</span>
                <span className="text-[10px] text-slate-500">{vehiclesNotes.length}/5000</span>
              </div>
              <textarea
                value={vehiclesNotes}
                onChange={(e) => setVehiclesNotes(e.target.value)}
                placeholder="List vehicles, planetary shuttles, hull integrity, warp drive specs, cargo hold contents..."
                rows={6}
                maxLength={5000}
                className="w-full p-3.5 bg-[#0a0d14] border border-slate-800 focus:border-emerald-400 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans leading-relaxed resize-y"
              />
            </div>
          )}

          {activeNotesTab === 'comments' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400">
                <span>Campaign session logs, NPC contacts, faction standing, bounty notices, GM notes:</span>
                <span className="text-[10px] text-slate-500">{commentsNotes.length}/5000</span>
              </div>
              <textarea
                value={commentsNotes}
                onChange={(e) => setCommentsNotes(e.target.value)}
                placeholder="Add GM notes, faction contacts, syndicate bounties, rumors overheard in port taverns..."
                rows={6}
                maxLength={5000}
                className="w-full p-3.5 bg-[#0a0d14] border border-slate-800 focus:border-violet-400 rounded-xl text-sm text-slate-200 placeholder-slate-600 focus:outline-none font-sans leading-relaxed resize-y"
              />
            </div>
          )}
        </div>
      </div>

      {/* Page 2: Encultured Skills (Table #1-7) */}
      {character.enculturedSkills && character.enculturedSkills.length > 0 && (
        <div className="bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h4 className="text-sm font-mono font-bold tracking-wider uppercase text-cyan-400 flex items-center space-x-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Encultured Skills (Table #1-7 — Starting Cultural Aptitudes)</span>
            </h4>
            <span className="text-xs font-mono text-slate-400">
              {character.enculturedSkills.length} Cultural Skills Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 font-mono">
            {character.enculturedSkills.map((sk, idx) => (
              <div
                key={`${sk.name}-${idx}`}
                className="p-3 bg-[#111726] border border-cyan-500/30 rounded-xl flex items-center justify-between text-xs"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-bold text-white truncate">{sk.name}</div>
                  <div className="text-[10px] text-slate-500">{sk.category} {sk.subSpecialtyOf ? `• ${sk.subSpecialtyOf}` : ''}</div>
                </div>
                <span className="text-lg font-black text-cyan-400 shrink-0">
                  {sk.aptitude}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Page 2: Full 69 Sheet Skills Roster */}
      {character.sheetSkills && character.sheetSkills.length > 0 && (
        <div className="bg-[#0b0f19] border border-cyan-500/30 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-widest block">
                CHARACTER SHEET (PAGE 2) TAXONOMY
              </span>
              <h4 className="text-lg font-bold font-['Orbitron'] text-white flex items-center space-x-2">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span>Full 69-Skill Grid & Baseline Ratings</span>
              </h4>
            </div>

            <div className="flex flex-wrap gap-1.5 text-xs font-mono">
              {['ALL', 'COMBAT', 'LANGUAGE', 'NON-TECH', 'SCIENCE', 'SOCIO-SCI', 'TECH', 'ADDITIONAL'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                    activeSkillCategory === cat
                      ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-[#111726] text-slate-400 border border-slate-800 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-[500px] overflow-y-auto pr-1">
            {character.sheetSkills
              .filter(sk => activeSkillCategory === 'ALL' || sk.area === activeSkillCategory || sk.category === activeSkillCategory)
              .map(sk => (
                <div
                  key={sk.id}
                  className={`p-2.5 rounded-xl border text-xs font-mono flex items-center justify-between transition ${
                    sk.isEncultured
                      ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200 shadow-sm shadow-cyan-950/60'
                      : 'bg-[#111726] border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="min-w-0 pr-2 truncate">
                    <span className="text-[10px] text-slate-500 mr-1.5">#{sk.id}</span>
                    <span className={sk.isEncultured ? 'text-cyan-300 font-bold' : 'text-slate-300'}>
                      {sk.name}
                    </span>
                    {sk.isEncultured && (
                      <span className="ml-1 text-[8px] px-1 py-0.2 bg-cyan-900/60 text-cyan-300 border border-cyan-700/60 rounded uppercase">
                        Encultured
                      </span>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-sm font-black ${sk.isEncultured ? 'text-cyan-400' : 'text-slate-400'}`}>
                      {sk.aptitude}%
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Full-Size Character Image Modal Popup */}
      {isFullImageOpen && (
        <div 
          onClick={() => setIsFullImageOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[92vh] flex flex-col items-center bg-[#070a12] border-2 border-cyan-500/60 rounded-3xl p-4 shadow-2xl overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsFullImageOpen(false)}
              className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-slate-800 text-slate-300 hover:text-white rounded-full transition z-10 border border-slate-700 cursor-pointer"
              title="Close Full Image"
            >
              <X className="w-6 h-6" />
            </button>

            {/* High-Resolution Portrait */}
            <div className="relative rounded-2xl overflow-hidden max-h-[78vh] flex items-center justify-center bg-black">
              <img
                src={characterImageUrl}
                alt={`${character.name} Full Portrait`}
                className="max-h-[78vh] w-auto object-contain rounded-2xl shadow-2xl"
                onError={(e) => { e.currentTarget.src = '/images/Genesislogo1.webp'; }}
              />
            </div>

            {/* Bottom Caption */}
            <div className="w-full pt-3 px-2 flex items-center justify-between font-mono text-xs text-slate-400">
              <div>
                <span className="text-white font-bold text-sm block font-['Orbitron']">{character.name}</span>
                <span>{character.raceKey?.toUpperCase()} • {character.sex} • {character.vitals?.occupationName || 'Spacer'}</span>
              </div>
              <span className="text-cyan-400 text-right">
                {character.imageUrl || character.aiPortrait ? '🍌 Nano Banana AI Synthesis' : 'Canonical Genesis Race Archetype'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
