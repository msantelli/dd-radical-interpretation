import React from 'react';
import { Icons } from '../constants';
import { Language, PlayerTheory, GameScenario } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FinalReportProps {
  campaignTheories: Record<number, PlayerTheory>;
  scenarios: GameScenario[];
  lang: Language;
  onRestart: () => void;
}

export const FinalReport: React.FC<FinalReportProps> = ({ 
  campaignTheories, 
  scenarios, 
  lang, 
  onRestart 
}) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col items-center p-6 md:p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-5xl w-full space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-slate-900 rounded-full ring-2 ring-emerald-500/50 text-emerald-400 shadow-xl shadow-emerald-900/20">
            <Icons.Book />
          </div>
          <h1 className="text-4xl md:text-5xl font-mono font-bold text-emerald-400 tracking-tight">
            {t.finalReport}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-light">
            {t.lexiconIntro}
          </p>
        </div>

        {/* Compiled Lexicon */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario, idx) => {
            const theory = campaignTheories[idx];
            if (!theory) return null;

            return (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-slate-600 transition-all group">
                <div className="flex items-center justify-between mb-4 border-b border-slate-700 pb-2">
                  <h3 className="text-emerald-400 font-mono font-bold text-lg group-hover:text-emerald-300">
                    {scenario.languageName.toUpperCase()}
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">{scenario.alienName}</span>
                </div>
                <div className="space-y-3">
                  {Object.entries(theory).map(([utterance, definition]) => (
                    <div key={utterance} className="flex flex-col text-sm font-mono">
                      <div className="flex items-center gap-2">
                        <span className="text-amber-400 font-bold">"{utterance}"</span>
                        <span className="text-slate-600 text-xs">↔</span>
                      </div>
                      <span className="text-slate-300 pl-4 border-l border-slate-700 ml-1 italic">
                        {definition}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Philosophical Reflection */}
        <div className="bg-slate-900 border border-amber-500/20 rounded-xl p-8 shadow-2xl shadow-amber-900/10">
          <div className="flex items-center gap-3 mb-6">
             <div className="text-amber-400"><Icons.Brain /></div>
             <h2 className="text-2xl font-mono font-bold text-amber-400">{t.metaReflection}</h2>
          </div>
          
          <p className="text-slate-300 mb-8 leading-relaxed font-light text-lg">
            {t.reflectionIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-emerald-400 font-mono font-bold text-sm uppercase tracking-wider border-b border-emerald-500/30 pb-2">
                {t.objectLangTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.objectLangDesc}
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-blue-400 font-mono font-bold text-sm uppercase tracking-wider border-b border-blue-500/30 pb-2">
                {t.tSchemaTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.tSchemaDesc}
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-amber-400 font-mono font-bold text-sm uppercase tracking-wider border-b border-amber-500/30 pb-2">
                {t.metaLangTitle}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {t.metaLangDesc}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
            <h4 className="text-slate-200 font-bold font-mono mb-2">{t.whyAsked}</h4>
            <p className="text-slate-400 italic text-sm leading-relaxed">
              "{t.whyAskedDesc}"
            </p>
          </div>
        </div>

        {/* Footer Action */}
        <div className="flex justify-center pt-8 pb-16">
          <button 
            onClick={onRestart}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-mono font-bold text-lg transition-colors shadow-lg shadow-emerald-900/50 flex items-center gap-3"
          >
            <Icons.Refresh /> {t.restartCampaign}
          </button>
        </div>

      </div>
    </div>
  );
};