import React from 'react';
import { PlayerTheory, GameScenario } from '../types';
import { Icons } from '../constants';

interface FieldNotesProps {
  scenario: GameScenario;
  theory: PlayerTheory;
  onUpdateTheory: (word: string, definition: string) => void;
  disabled: boolean;
}

export const FieldNotes: React.FC<FieldNotesProps> = ({
  scenario,
  theory,
  onUpdateTheory,
  disabled
}) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 h-full flex flex-col shadow-xl">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <div className="text-emerald-400"><Icons.Book /></div>
        <h2 className="text-lg font-mono font-bold text-emerald-500 tracking-wider">T-THEORY BUILDER</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        <div className="bg-slate-800/50 p-3 rounded text-xs text-slate-400 font-mono border border-slate-700/50">
          <strong>INSTRUCTION:</strong> Complete the T-Sentence for each alien term.
          <br/>
          <em>Formal Structure:</em> 
          <span className="text-emerald-400 block mt-1">
             's' is True ↔ p
          </span>
        </div>

        {scenario.vocabulary.map((word) => (
          <div key={word} className="group">
            <label className="block text-xs text-slate-500 font-mono mb-1 ml-1">
              Truth Conditions for "{word}":
            </label>
            <div className="flex flex-col bg-slate-950 rounded border border-slate-700 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center gap-2">
                <span className="text-amber-400 font-mono font-bold">"{word}"</span>
                <span className="text-slate-500 font-serif italic text-sm">is true if and only if...</span>
              </div>
              <textarea
                value={theory[word] || ''}
                onChange={(e) => onUpdateTheory(word, e.target.value)}
                placeholder={`(describe the conditions, e.g. "a rabbit is present")`}
                className="w-full bg-transparent text-emerald-100 p-3 font-mono text-sm resize-none h-20 focus:outline-none"
                disabled={disabled}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};