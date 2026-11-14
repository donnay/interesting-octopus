import React, { useState } from 'react';
import { rollDie, rollDice } from '../data/chargenRules';
import { Dices, RotateCcw } from 'lucide-react';

export default function DiceRoller() {
  const [sides, setSides] = useState(10);
  const [count, setCount] = useState(1);
  const [history, setHistory] = useState([]);

  const roll = () => {
    const res = rollDice(count, sides);
    const entry = {
      id: Date.now(),
      count,
      sides,
      rolls: res.rolls,
      sum: res.sum,
      time: new Date().toLocaleTimeString()
    };
    setHistory(prev => [entry, ...prev.slice(0, 19)]);
  };

  const quickRoll = (diceCount, diceSides) => {
    setCount(diceCount);
    setSides(diceSides);
    const res = rollDice(diceCount, diceSides);
    const entry = {
      id: Date.now(),
      count: diceCount,
      sides: diceSides,
      rolls: res.rolls,
      sum: res.sum,
      time: new Date().toLocaleTimeString()
    };
    setHistory(prev => [entry, ...prev.slice(0, 19)]);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">
          <Dices className="w-4 h-4" />
          <span>Genesis Dice Sub-Routine</span>
        </div>
        <h2 className="text-2xl font-bold font-['Orbitron'] text-white">GAME MASTER DICE TRAY</h2>
        <p className="text-xs text-slate-400 mt-1">
          Perform standard ten-sided (sd), percentile (1:100sd), and custom dice distributions with full roll breakdowns.
        </p>

        {/* Quick presets */}
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            onClick={() => quickRoll(1, 100)}
            className="px-3.5 py-1.5 bg-[#0a0d14] hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-xs font-mono text-cyan-300 transition"
          >
            1:100sd (Percentile)
          </button>
          <button
            onClick={() => quickRoll(1, 10)}
            className="px-3.5 py-1.5 bg-[#0a0d14] hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-xs font-mono text-cyan-300 transition"
          >
            1:10sd
          </button>
          <button
            onClick={() => quickRoll(3, 10)}
            className="px-3.5 py-1.5 bg-[#0a0d14] hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-xs font-mono text-cyan-300 transition"
          >
            3:10sd (Variance)
          </button>
          <button
            onClick={() => quickRoll(5, 10)}
            className="px-3.5 py-1.5 bg-[#0a0d14] hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-xs font-mono text-cyan-300 transition"
          >
            5:10sd (Mental Attr)
          </button>
          <button
            onClick={() => quickRoll(1, 1000)}
            className="px-3.5 py-1.5 bg-[#0a0d14] hover:bg-cyan-950/40 border border-slate-700 hover:border-cyan-500/50 rounded-lg text-xs font-mono text-cyan-300 transition"
          >
            1:1000sd (Wealth)
          </button>
        </div>

        {/* Custom Controls */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Number of Dice</label>
            <input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-2 bg-[#0a0d14] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">Sides Per Die</label>
            <input
              type="number"
              min="2"
              max="1000"
              value={sides}
              onChange={(e) => setSides(Math.max(2, parseInt(e.target.value) || 10))}
              className="w-full px-3 py-2 bg-[#0a0d14] border border-slate-700 focus:border-cyan-400 rounded-lg text-sm text-white font-mono"
            />
          </div>

          <button
            onClick={roll}
            className="w-full py-2.5 px-4 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg text-sm font-['Orbitron'] flex items-center justify-center space-x-2 transition"
          >
            <Dices className="w-4 h-4" />
            <span>EXECUTE ROLL</span>
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="bg-[#111726] border border-slate-800 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="font-mono text-xs uppercase text-slate-400">ROLL TELEMETRY LOG</span>
            <button
              onClick={() => setHistory([])}
              className="text-xs text-slate-500 hover:text-slate-300 flex items-center space-x-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Log</span>
            </button>
          </div>

          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {history.map((h) => (
              <div key={h.id} className="p-3 bg-[#0a0d14] border border-slate-800 rounded-xl flex items-center justify-between font-mono text-sm">
                <div>
                  <span className="text-cyan-400 font-bold">{h.count}:{h.sides}sd</span>
                  <span className="text-slate-500 text-xs ml-3">
                    [ {h.rolls.join(' + ')} ]
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-slate-500">{h.time}</span>
                  <span className="text-xl font-bold font-['Orbitron'] text-white">{h.sum}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

