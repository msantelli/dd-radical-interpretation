import React from 'react';
import { Icons } from '../constants';

interface PhilosopherGuideProps {
  onClose: () => void;
}

export const PhilosopherGuide: React.FC<PhilosopherGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-emerald-500/30 w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl shadow-emerald-900/20 flex flex-col animate-in fade-in zoom-in duration-300">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-800/50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="text-emerald-400"><Icons.Brain /></div>
            <h2 className="text-xl font-mono font-bold text-emerald-400">FIELD MANUAL: RADICAL INTERPRETATION</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded transition-colors">
            <Icons.Check />
          </button>
        </div>

        <div className="overflow-y-auto p-8 space-y-8 text-slate-300 leading-relaxed font-light custom-scrollbar">
          
          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              1. The T-Schema
            </h3>
            <p className="mb-4">
              To understand a sentence is to know the conditions under which it is true. Your goal is to construct <strong>T-Sentences</strong> for every utterance you hear.
            </p>
            <div className="bg-slate-950 p-4 rounded border border-slate-800 text-sm font-mono text-center">
                <span className="text-emerald-400">"Gavagai"</span> is true <span className="text-slate-500">if and only if</span> <span className="text-amber-400">a rabbit is present</span>.
            </div>
            <p className="mt-4 text-sm text-slate-400">
              Note: Only full sentences (utterances) have truth conditions. Even if the alien says just "Gorm" or "Hek", treat them as linguistic actions asserting a truth about the world.
            </p>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              2. Compositionality
            </h3>
            <p>
              As the language gets more complex, look for patterns. If "Ruz Gorm" means "Red Stone" and "Ruz Vell" means "Red Sky", you can infer that "Ruz" contributes "Red" to the truth conditions of the whole sentence.
            </p>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              3. The Triangulation
            </h3>
            <p className="mb-4">
              Davidson argues meaning is not private; it arises from the interaction between two people and a shared world.
            </p>
            
            <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-6 relative flex flex-col items-center justify-between h-48 mb-4 select-none">
                {/* World Object (Top) */}
                <div className="z-10 flex flex-col items-center">
                    <div className="text-3xl mb-1">🍎</div>
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">World Object</span>
                </div>

                {/* Triangle Lines */}
                <svg className="absolute inset-0 w-full h-full text-slate-600 pointer-events-none">
                    {/* Left Line (Subject -> Object) */}
                    <line x1="20%" y1="80%" x2="50%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    {/* Right Line (Interpreter -> Object) */}
                    <line x1="80%" y1="80%" x2="50%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    {/* Bottom Line (Communication) */}
                    <line x1="25%" y1="85%" x2="75%" y2="85%" stroke="currentColor" strokeWidth="2" />
                </svg>

                {/* Bottom Row */}
                <div className="w-full flex justify-between px-4 mt-8 z-10">
                    <div className="flex flex-col items-center">
                        <div className="text-3xl mb-1">👽</div>
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Subject</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl mb-1">🧠</div>
                        <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">Interpreter</span>
                        <span className="text-[10px] text-slate-500">(You)</span>
                    </div>
                </div>
            </div>

            <p>
              You (the Interpreter) correlate the Subject's behavior with the objects in the World that you also see. This triangulation is what anchors meaning. 
              <span className="text-emerald-400 italic"> Triangulation and Charity are part of the same process:</span> you cannot interpret the alien without sharing a world with them.
            </p>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              4. The Principle of Charity
            </h3>
            <p>
              To get the triangulation started, you must assume the speaker is <strong>Rational</strong> and generally <strong>Correct</strong> about their environment.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-slate-400 text-sm">
              <li>If the alien says "Gavagai" when a rabbit passes, assume they are referring to the rabbit (Truth), not deceiving you.</li>
              <li>Only by assuming they are responding to the same world you see can you begin to assign meanings to their sounds.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              5. Indeterminacy
            </h3>
            <p>
              Sometimes, multiple theories fit the evidence perfectly. Does "Gavagai" mean <em>Rabbit</em>, or <em>Undetached Rabbit Parts</em>? This is the <strong>Indeterminacy of Translation</strong>.
            </p>
          </section>

        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-800/30 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded transition-colors shadow-lg shadow-emerald-900/50"
          >
            ACKNOWLEDGE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};