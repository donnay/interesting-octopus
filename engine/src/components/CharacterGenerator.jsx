import React, { useState } from 'react';
import { 
  rollDie, 
  rollDice, 
  RACES_TABLE_1, 
  ARACNIAN_SUB_ROLL, 
  ATTRIBUTE_BASES, 
  RACIAL_AVERAGES, 
  getInfluenceMod, 
  DAMAGE_POINTS_TABLE_5,
  RACE_CODE_MAP,
  BACKGROUND_SKILLS_TABLE_6,
  MASS_TABLE_10,
  HEIGHT_TABLE_12,
  STARTING_AGE_TABLE_13,
  OCCUPATIONS_TABLE_14
} from '../data/chargenRules';
import { Dices, Save, RefreshCw, CheckCircle, Sparkles, User, Award, ShieldAlert, HeartPulse } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { saveCharacter } from '../services/characterService';

export default function CharacterGenerator({ onSaveSuccess }) {
  const { user } = useAuth();

  // Step 1: Character identity & race
  const [name, setName] = useState('New Traveler');
  const [sex, setSex] = useState('Female');
  const [selectedRaceKey, setSelectedRaceKey] = useState('human');
  const [raceRollResult, setRaceRollResult] = useState(null);

  // Step 2: Primary Attributes
  const [attributes, setAttributes] = useState(null);
  const [rollHistory, setRollHistory] = useState(null);

  // Step 3: Appearance & Influence
  const [appearance, setAppearance] = useState(null);
  const [appearanceInfo, setAppearanceInfo] = useState(null);

  // Step 4: Secondary Attributes
  const [secondaryStats, setSecondaryStats] = useState(null);

  // Step 5: Damage Points
  const [damagePoints, setDamagePoints] = useState(null);

  // Step 6: Background Skills
  const [bgSkills, setBgSkills] = useState(null);

  // Step 7: Vitals & Wealth
  const [selectedOccupation, setSelectedOccupation] = useState(OCCUPATIONS_TABLE_14[0].id);
  const [vitals, setVitals] = useState(null);

  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  // Handle Random Race Roll (Table #1-1)
  const rollRandomRace = () => {
    const roll = rollDie(100);
    const raceEntry = RACES_TABLE_1.find(r => roll >= r.min && roll <= r.max);
    let chosenKey = raceEntry ? raceEntry.key : 'human';
    let subRollResult = null;

    if (raceEntry && raceEntry.hasSubRoll) {
      const sub = rollDie(100);
      const subEntry = ARACNIAN_SUB_ROLL.find(s => sub >= s.min && sub <= s.max);
      chosenKey = subEntry.key;
      subRollResult = { roll: sub, subtype: subEntry.subtype };
    }

    setRaceRollResult({ roll, raceName: raceEntry.name, subRollResult });
    setSelectedRaceKey(chosenKey);
  };

  // Roll All Primary Attributes according to Table #1-2
  const rollAllAttributes = (raceKeyToUse = selectedRaceKey) => {
    const baseConfig = ATTRIBUTE_BASES[raceKeyToUse] || ATTRIBUTE_BASES.human;
    const count = baseConfig.varianceDice;

    // Physical
    const psRoll = rollDice(count, 10);
    const agRoll = rollDice(count, 10);
    const coRoll = rollDice(count, 10);
    const prRoll = rollDice(count, 10);

    const ps = baseConfig.ps + psRoll.sum;
    const ag = baseConfig.ag + agRoll.sum;
    const co = baseConfig.co + coRoll.sum;
    const pr = baseConfig.pr + prRoll.sum;

    // Mental (All sentient races: 30 + 5:10sd)
    const wsRoll = rollDice(5, 10);
    const itRoll = rollDice(5, 10);
    const mcRoll = rollDice(5, 10);
    const inRoll = rollDice(5, 10);

    const ws = 30 + wsRoll.sum;
    const it = 30 + itRoll.sum;
    const mc = 30 + mcRoll.sum;
    let inf = 30 + inRoll.sum;

    // Appearance & Influence (Table #1-4)
    const appRoll = rollDie(100);
    const infMod = getInfluenceMod(appRoll);
    // Tanaians ignore appearance influence
    const effectiveInf = raceKeyToUse.includes('tanaian') ? inf : inf + infMod.mod;

    const newAttrs = {
      ps, ag, co, pr,
      ws, it, mc,
      in: effectiveInf,
      baseIn: inf,
      appearance: appRoll
    };

    setAttributes(newAttrs);
    setAppearance(appRoll);
    setAppearanceInfo(infMod);
    setRollHistory({
      psRoll, agRoll, coRoll, prRoll,
      wsRoll, itRoll, mcRoll, inRoll,
      appRoll
    });

    // Calculate Secondary Attributes
    // Aim (AM) = Average (Agility, Intellect, Mental Control)
    const aim = Math.round((ag + it + mc) / 3);
    // Brawl (BR) = Average (Physical Strength, Agility, Constitution, Perception)
    const brawl = Math.round((ps + ag + co + pr) / 4);
    // Move (MV) = Average (Physical Strength, Agility, Constitution)
    const move = Math.round((ps + ag + co) / 3);

    const sec = { aim, brawl, move };
    setSecondaryStats(sec);

    // Calculate Damage Points
    const raceAvg = RACIAL_AVERAGES[raceKeyToUse] || RACIAL_AVERAGES.human;
    const quotient = raceAvg.co > 0 ? (co / raceAvg.co) : 1;
    const raceCode = RACE_CODE_MAP[raceKeyToUse] || 'hu';

    const dmgObj = {};
    Object.entries(DAMAGE_POINTS_TABLE_5).forEach(([key, val]) => {
      const basePts = val[raceCode] ?? 0;
      dmgObj[key] = {
        name: val.name,
        base: basePts,
        current: Math.round(basePts * quotient),
        max: Math.round(basePts * quotient)
      };
    });
    setDamagePoints(dmgObj);

    // Background Skills
    const bg = BACKGROUND_SKILLS_TABLE_6[raceKeyToUse] || BACKGROUND_SKILLS_TABLE_6.human;
    setBgSkills(bg);

    // Calculate Vitals & Wealth
    rollVitalsAndWealth(raceKeyToUse, selectedOccupation);
  };

  const rollVitalsAndWealth = (raceKey = selectedRaceKey, occId = selectedOccupation) => {
    const ageRule = STARTING_AGE_TABLE_13[raceKey] || STARTING_AGE_TABLE_13.human;
    const ageDice = rollDice(ageRule.dice, ageRule.sides);
    const age = ageRule.base + ageDice.sum;

    const genderKey = sex.toLowerCase() === 'female' ? 'female' : 'male';
    const heightBase = HEIGHT_TABLE_12[raceKey] ? HEIGHT_TABLE_12[raceKey][genderKey] : 1.75;
    const massBase = MASS_TABLE_10[raceKey] ? MASS_TABLE_10[raceKey][genderKey] : 75;

    const occ = OCCUPATIONS_TABLE_14.find(o => o.id === occId) || OCCUPATIONS_TABLE_14[0];
    const wealthRoll = rollDie(occ.sides);
    const startingDits = occ.mult + wealthRoll;

    setVitals({
      age,
      height: heightBase.toFixed(2),
      mass: Math.round(massBase),
      wealth: startingDits,
      occupationName: occ.name
    });
  };

  // Full Character Auto-Gen
  const handleGenerateFullCharacter = () => {
    rollAllAttributes(selectedRaceKey);
  };

  const handleSaveToCloud = async () => {
    if (!user) {
      setSaveStatus('Please log in via the top-right button to save characters to your HoloNet account.');
      return;
    }
    if (!attributes) {
      setSaveStatus('Please generate attributes first before saving.');
      return;
    }

    setSaving(true);
    setSaveStatus('');
    try {
      const charData = {
        name,
        sex,
        raceKey: selectedRaceKey,
        attributes,
        appearance,
        appearanceInfo,
        secondaryStats,
        damagePoints,
        bgSkills,
        vitals,
        createdAtClient: new Date().toISOString()
      };

      await saveCharacter(user.uid, charData);
      setSaveStatus('Character successfully stored in your Cloud HoloNet!');
      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      console.error(err);
      setSaveStatus(`Error saving character: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner / Generator Actions */}
      <div className="bg-[#0f1422] border border-cyan-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Genesis System Rules Engine</span>
            </div>
            <h2 className="text-3xl font-black font-['Orbitron'] tracking-wider text-white">
              CHARACTER GENERATOR
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Roll primary/secondary attributes, racial physiology, damage segments, and starting resources according to official tables.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleGenerateFullCharacter}
              className="px-5 py-3 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-slate-950 font-bold rounded-xl text-sm flex items-center space-x-2 shadow-lg shadow-cyan-900/30 transition transform active:scale-95"
            >
              <Dices className="w-5 h-5" />
              <span>ROLL NEW CHARACTER</span>
            </button>

            <button
              onClick={handleSaveToCloud}
              disabled={saving || !attributes}
              className="px-4 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-cyan-300 border border-cyan-500/30 rounded-xl text-sm font-semibold flex items-center space-x-2 transition"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'STORING...' : 'SAVE TO CLOUD'}</span>
            </button>
          </div>
        </div>

        {saveStatus && (
          <div className={`mt-4 p-3 rounded-xl text-xs font-mono border ${saveStatus.includes('Error') || saveStatus.includes('Please log') ? 'bg-amber-950/40 border-amber-600/50 text-amber-300' : 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300'}`}>
            {saveStatus}
          </div>
        )}
      </div>

      {/* Identity & Race Setup Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity Form */}
        <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider pb-2 border-b border-slate-800">
            <User className="w-4 h-4" />
            <span>Identity & Dossier</span>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Character Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#0a0d14] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0d14] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white focus:outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Neuter">Neuter / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Occupation</label>
              <select
                value={selectedOccupation}
                onChange={(e) => {
                  setSelectedOccupation(e.target.value);
                  if (attributes) rollVitalsAndWealth(selectedRaceKey, e.target.value);
                }}
                className="w-full px-3 py-2 bg-[#0a0d14] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white focus:outline-none"
              >
                {OCCUPATIONS_TABLE_14.map(occ => (
                  <option key={occ.id} value={occ.id}>{occ.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Race Selector & Roll */}
        <div className="lg:col-span-2 bg-[#111726] border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>Table #1-1: Race Determination</span>
            </div>
            <button
              onClick={rollRandomRace}
              className="px-3 py-1 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 rounded-lg text-xs font-mono flex items-center space-x-1 transition"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Roll 1:100sd</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Select Race Directly</label>
              <select
                value={selectedRaceKey}
                onChange={(e) => {
                  setSelectedRaceKey(e.target.value);
                  setRaceRollResult(null);
                }}
                className="w-full px-3 py-2 bg-[#0a0d14] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white focus:outline-none"
              >
                {Object.entries(ATTRIBUTE_BASES).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>

            {raceRollResult && (
              <div className="p-3 bg-cyan-950/30 border border-cyan-500/30 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Roll Result</span>
                  <div className="text-lg font-bold font-['Orbitron'] text-white">
                    {raceRollResult.raceName}
                  </div>
                  {raceRollResult.subRollResult && (
                    <div className="text-xs text-cyan-300 font-mono">
                      Sub-roll: {raceRollResult.subRollResult.subtype} ({raceRollResult.subRollResult.roll})
                    </div>
                  )}
                </div>
                <div className="text-2xl font-mono font-black text-cyan-400">
                  {raceRollResult.roll} <span className="text-xs text-slate-400 font-normal">/100</span>
                </div>
              </div>
            )}
          </div>

          {/* Race stats summary preview */}
          {ATTRIBUTE_BASES[selectedRaceKey] && (
            <div className="pt-2 grid grid-cols-5 gap-2 text-center text-xs font-mono bg-[#0a0d14] p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 block">BASE PS</span>
                <span className="font-bold text-white">{ATTRIBUTE_BASES[selectedRaceKey].ps}</span>
              </div>
              <div>
                <span className="text-slate-500 block">BASE AG</span>
                <span className="font-bold text-white">{ATTRIBUTE_BASES[selectedRaceKey].ag}</span>
              </div>
              <div>
                <span className="text-slate-500 block">BASE CO</span>
                <span className="font-bold text-white">{ATTRIBUTE_BASES[selectedRaceKey].co}</span>
              </div>
              <div>
                <span className="text-slate-500 block">BASE PR</span>
                <span className="font-bold text-white">{ATTRIBUTE_BASES[selectedRaceKey].pr}</span>
              </div>
              <div>
                <span className="text-slate-500 block">VARIANCE</span>
                <span className="font-bold text-cyan-400">{ATTRIBUTE_BASES[selectedRaceKey].varianceDice}:10sd</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Stats Display */}
      {attributes ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Primary Attributes Panel */}
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-['Orbitron'] text-sm tracking-wide text-white font-bold">
                PRIMARY ATTRIBUTES
              </span>
              <span className="text-xs font-mono text-cyan-400">Tables #1-2 & #1-4</span>
            </div>

            {/* Physical */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">Physical Abilities</span>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">PS (Strength)</span>
                  <span className="text-lg font-bold text-white">{attributes.ps}</span>
                </div>
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">AG (Agility)</span>
                  <span className="text-lg font-bold text-white">{attributes.ag}</span>
                </div>
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">CO (Constitution)</span>
                  <span className="text-lg font-bold text-white">{attributes.co}</span>
                </div>
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">PR (Perception)</span>
                  <span className="text-lg font-bold text-white">{attributes.pr}</span>
                </div>
              </div>
            </div>

            {/* Mental */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block">Mental Capacities</span>
              <div className="grid grid-cols-2 gap-2 text-sm font-mono">
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">WS (Willpower)</span>
                  <span className="text-lg font-bold text-white">{attributes.ws}</span>
                </div>
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">IT (Intellect)</span>
                  <span className="text-lg font-bold text-white">{attributes.it}</span>
                </div>
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">MC (Mental Ctrl)</span>
                  <span className="text-lg font-bold text-white">{attributes.mc}</span>
                </div>
                <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-xl flex justify-between items-center">
                  <span className="text-slate-400">IN (Influence)</span>
                  <span className="text-lg font-bold text-cyan-400">{attributes.in}</span>
                </div>
              </div>
            </div>

            {/* Appearance & Modification */}
            {appearanceInfo && (
              <div className="p-3 bg-cyan-950/20 border border-cyan-800/40 rounded-xl text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Appearance Roll:</span>
                  <span className="text-white font-bold">{appearance} / 100 ({appearanceInfo.desc})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Influence Adjustment:</span>
                  <span className={appearanceInfo.mod >= 0 ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                    {appearanceInfo.mod >= 0 ? `+${appearanceInfo.mod}` : appearanceInfo.mod}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Secondary Stats & Background Skills */}
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 space-y-5">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="font-['Orbitron'] text-sm tracking-wide text-white font-bold">
                  SECONDARY ATTRIBUTES
                </span>
                <span className="text-xs font-mono text-cyan-400">Combat Specs</span>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 text-center">
                <div className="p-3 bg-[#0a0d14] border border-slate-800 rounded-xl">
                  <span className="text-[11px] font-mono text-slate-400 block">AIM (AM)</span>
                  <span className="text-2xl font-black font-['Orbitron'] text-cyan-400">
                    {secondaryStats?.aim}
                  </span>
                  <span className="text-[9px] text-slate-500 block">Avg(AG,IT,MC)</span>
                </div>

                <div className="p-3 bg-[#0a0d14] border border-slate-800 rounded-xl">
                  <span className="text-[11px] font-mono text-slate-400 block">BRAWL (BR)</span>
                  <span className="text-2xl font-black font-['Orbitron'] text-amber-400">
                    {secondaryStats?.brawl}
                  </span>
                  <span className="text-[9px] text-slate-500 block">Avg(PS,AG,CO,PR)</span>
                </div>

                <div className="p-3 bg-[#0a0d14] border border-slate-800 rounded-xl">
                  <span className="text-[11px] font-mono text-slate-400 block">MOVE (MV)</span>
                  <span className="text-2xl font-black font-['Orbitron'] text-emerald-400">
                    {secondaryStats?.move}
                  </span>
                  <span className="text-[9px] text-slate-500 block">Avg(PS,AG,CO)</span>
                </div>
              </div>
            </div>

            {/* Background Skills Table 1-6 */}
            {bgSkills && (
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-['Orbitron'] text-sm tracking-wide text-white font-bold">
                    BACKGROUND SKILLS
                  </span>
                  <span className="text-xs font-mono text-cyan-400">Table #1-6</span>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 text-xs font-mono">
                  <div className="p-2 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">COM:</span>
                    <span className="text-white font-bold">{bgSkills.com}</span>
                  </div>
                  <div className="p-2 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">LANG:</span>
                    <span className="text-white font-bold">{bgSkills.lang}</span>
                  </div>
                  <div className="p-2 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">NON-TECH:</span>
                    <span className="text-white font-bold">{bgSkills.nontech}</span>
                  </div>
                  <div className="p-2 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">SCI:</span>
                    <span className="text-white font-bold">{bgSkills.sci}</span>
                  </div>
                  <div className="p-2 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">SOCIO:</span>
                    <span className="text-white font-bold">{bgSkills.socio}</span>
                  </div>
                  <div className="p-2 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">TECH:</span>
                    <span className="text-white font-bold">{bgSkills.tech}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Vitals & Wealth */}
            {vitals && (
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="font-['Orbitron'] text-sm tracking-wide text-white font-bold">
                    VITALS & WEALTH
                  </span>
                  <span className="text-xs font-mono text-cyan-400">Tables #10-14</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-3 text-xs font-mono">
                  <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">Age:</span>
                    <span className="text-white font-bold">{vitals.age} yrs</span>
                  </div>
                  <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">Height:</span>
                    <span className="text-white font-bold">{vitals.height} m</span>
                  </div>
                  <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">Mass:</span>
                    <span className="text-white font-bold">{vitals.mass} kg</span>
                  </div>
                  <div className="p-2.5 bg-[#0a0d14] border border-slate-800 rounded-lg flex justify-between">
                    <span className="text-slate-400">Starting Wealth:</span>
                    <span className="text-amber-400 font-bold">{vitals.wealth.toLocaleString()} Đ</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Damage Record Panel */}
          <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs uppercase tracking-wider">
                <HeartPulse className="w-4 h-4" />
                <span>Damage Record</span>
              </div>
              <span className="text-xs font-mono text-slate-400">Table #1-5</span>
            </div>

            <p className="text-xs text-slate-400">
              Damage points per segment calculated from racial baseline scaled by CO quotient.
            </p>

            <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1 text-xs font-mono">
              {damagePoints && Object.entries(damagePoints).map(([key, item]) => {
                if (item.max === 0) return null;
                return (
                  <div key={key} className="p-2 bg-[#0a0d14] border border-slate-800/80 rounded-lg flex items-center justify-between">
                    <span className="text-slate-300">{item.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-bold">{item.max} pts</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center bg-[#111726]/50 border border-dashed border-slate-800 rounded-2xl">
          <Dices className="w-12 h-12 text-cyan-500/50 mx-auto mb-3 animate-pulse" />
          <h3 className="text-lg font-bold font-['Orbitron'] text-slate-300">NO CHARACTER GENERATED YET</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1">
            Choose your race above or click &quot;Roll New Character&quot; to execute dice rolls according to Genesis RPG rules.
          </p>
        </div>
      )}
    </div>
  );
}

