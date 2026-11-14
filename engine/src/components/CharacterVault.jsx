import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getCharacters, deleteCharacter } from '../services/characterService';
import { Trash2, User, Eye, Shield, Calendar, Award } from 'lucide-react';

export default function CharacterVault({ onSelectCharacter }) {
  const { user } = useAuth();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    if (!confirm('Are you sure you want to retire this character dossier?')) return;
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
            {characters.length} DOSSIER{characters.length === 1 ? '' : 'S'} STORED IN FIRESTORE
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
              onClick={() => onSelectCharacter && onSelectCharacter(char)}
              className="bg-[#111726] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 cursor-pointer transition transform hover:-translate-y-1 shadow-lg shadow-black/40 group relative"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-['Orbitron'] font-bold text-lg text-white group-hover:text-cyan-400 transition">
                    {char.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-400">
                    {char.raceKey?.toUpperCase()} • {char.sex} • {char.vitals?.occupationName || 'Spacer'}
                  </p>
                </div>
                <button
                  onClick={(e) => handleDelete(char.id, e)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition"
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
                <span className="text-cyan-400 group-hover:underline">View Dossier →</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

