import React, { useMemo } from 'react';
import { PlayerTheory, GameScenario, Observation, Language } from '../types';
import { Icons } from '../constants';
import { TRANSLATIONS } from '../data/translations';

interface FieldNotesProps {
  scenario: GameScenario;
  visibleObservations: Observation[];
  theory: PlayerTheory;
  onUpdateTheory: (utterance: string, definition: string) => void;
  disabled: boolean;
  lang: Language;
}

export const FieldNotes: React.FC<FieldNotesProps> = ({
  scenario,
  visibleObservations,
  theory,
  onUpdateTheory,
  disabled,
  lang
}) => {
  const t = TRANSLATIONS[lang];
  
  // Extract unique utterances seen so far to populate the T-Sentence list
  const uniqueUtterances = useMemo(() => {
    const seen = new Set<string>();
    // We want to maintain order of discovery, so filter the array
    return visibleObservations
      .map(obs => obs.utterance)
      .filter((utterance) => {
        if (seen.has(utterance)) return false;
        seen.add(utterance);
        return true;
      });
  }, [visibleObservations]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 h-full flex flex-col shadow-xl">
      <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
        <div className="text-emerald-400"><Icons.Book /></div>
        <h2 className="text-lg font-mono font-bold text-emerald-500 tracking-wider">{t.tTheoryBuilder}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        <div className="bg-slate-800/50 p-3 rounded text-xs text-slate-400 font-mono border border-slate-700/50">
          <strong>{t.instruction}:</strong> {t.instructionText}
          <br/>
          <em>T-Schema:</em> 
          <span className="text-emerald-400 block mt-1">
             'Utterance' {t.isTrueIff} Condition
          </span>
        </div>

        {uniqueUtterances.length === 0 && (
           <div className="text-slate-600 font-mono text-sm text-center italic mt-10">
             {lang === 'es' ? "Observa al alienígena para comenzar..." : "Observe the alien to begin constructing your theory..."}
           </div>
        )}

        {uniqueUtterances.map((utterance) => (
          <div key={utterance} className="group animate-in fade-in slide-in-from-left-2 duration-300">
            <label className="block text-xs text-slate-500 font-mono mb-1 ml-1">
              {t.tSentenceFor}
            </label>
            <div className="flex flex-col bg-slate-950 rounded border border-slate-700 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
              <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
                <span className="text-amber-400 font-mono font-bold whitespace-nowrap">'{utterance}'</span>
                <span className="text-emerald-500 font-mono font-bold whitespace-nowrap">{t.isTrueIff}</span>
              </div>
              <textarea
                value={theory[utterance] || ''}
                onChange={(e) => onUpdateTheory(utterance, e.target.value)}
                placeholder={t.placeholder}
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