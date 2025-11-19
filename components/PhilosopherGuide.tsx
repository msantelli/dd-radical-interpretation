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
              1. The Goal: T-Sentences
            </h3>
            <p className="mb-4">
              In Davidsonian Semantics, you cannot inspect meanings directly. You can only determine the conditions under which a sentence is <strong>True</strong>.
            </p>
            <div className="bg-slate-950 p-5 rounded border border-slate-800 font-mono text-sm text-emerald-300 shadow-inner">
              <strong>The T-Schema:</strong><br/>
              <span className="text-slate-500 opacity-75">Sentence</span> <em>s</em> <span className="text-white">is true if and only if</span> <em>p</em>.
            </div>
            <p className="mt-4 text-sm text-slate-400">
              <em>Example:</em> "'Es regnet' is True if and only if it is raining."<br/>
              Your job is to provide the <em>p</em> (the condition in the world) that makes the alien's utterance <em>s</em> true.
            </p>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              2. The Tool: Principle of Charity
            </h3>
            <p>
              How do you start from scratch? You must assume the speaker is <strong>Rational</strong> and generally <strong>Correct</strong> about their environment.
            </p>
            <ul className="list-disc list-inside mt-3 space-y-2 text-slate-400 text-sm">
              <li>If the alien says "Gavagai" when a rabbit passes, assume they are referring to the rabbit (Truth), not deceiving you.</li>
              <li>If your theory makes the alien a liar 90% of the time, your theory is likely wrong, not the alien.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              3. The Triangulation
            </h3>
            <p>
              Davidson argues meaning is not private; it arises from the interaction between two people and a shared world.
            </p>
            <div className="flex justify-center my-6">
               <div className="relative w-48 h-24">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 text-emerald-400 font-mono text-xs bg-slate-900 px-2 border border-emerald-500/50 rounded">World Object</div>
                  <div className="absolute bottom-0 left-0 text-amber-400 font-mono text-xs">Subject</div>
                  <div className="absolute bottom-0 right-0 text-slate-200 font-mono text-xs">Interpreter</div>
                  
                  {/* Lines */}
                  <div className="absolute top-6 left-1/2 w-[1px] h-16 bg-emerald-500/20 -rotate-45 origin-top"></div>
                  <div className="absolute top-6 left-1/2 w-[1px] h-16 bg-emerald-500/20 rotate-45 origin-top"></div>
                  <div className="absolute bottom-2 left-12 right-14 h-[1px] bg-emerald-500/20 border-t border-dashed border-slate-600"></div>
               </div>
            </div>
            <p className="text-sm text-slate-400">
              You (the Interpreter) correlate the Subject's behavior with the objects in the World that <em>you also see</em>. This triangulation is what anchors meaning.
            </p>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              4. Indeterminacy
            </h3>
            <p>
              Sometimes, multiple theories fit the evidence perfectly. Does "Gavagai" mean <em>Rabbit</em>, or <em>Undetached Rabbit Parts</em>, or <em>Rabbit-Time-Slice</em>? 
            </p>
            <p className="mt-2 text-sm text-slate-400">
              This is the <strong>Indeterminacy of Translation</strong>. There may be no single "fact of the matter" about meaning beyond what is preserved by the T-sentences.
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