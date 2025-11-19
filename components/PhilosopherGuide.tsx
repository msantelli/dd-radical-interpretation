import React from 'react';
import { Icons } from '../constants';

interface PhilosopherGuideProps {
  onClose: () => void;
}

export const PhilosopherGuide: React.FC<PhilosopherGuideProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-emerald-500/30 w-full max-w-3xl max-h-[80vh] rounded-xl shadow-2xl shadow-emerald-900/20 flex flex-col">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-800/50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="text-emerald-400"><Icons.Brain /></div>
            <h2 className="text-xl font-mono font-bold text-emerald-400">FIELD MANUAL: RADICAL INTERPRETATION</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded transition-colors">
            <Icons.Check />
          </button>
        </div>

        <div className="overflow-y-auto p-8 space-y-8 text-slate-300 leading-relaxed font-light">
          
          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              1. The Goal: Truth Conditions
            </h3>
            <p className="mb-4">
              You cannot know what a word <em>means</em> directly. You can only observe under what conditions a sentence is <strong>True</strong>.
            </p>
            <div className="bg-slate-950 p-4 rounded border border-slate-800 font-mono text-sm text-emerald-300">
              Classic T-Schema:<br/>
              "Sentence S" is True ↔ (if and only if) P
            </div>
            <p className="mt-4 text-sm">
              <em>Example:</em> "'Es regnet' is True if and only if it is raining."<br/>
              Your job is to fill in the right-hand side (P) for the alien's words.
            </p>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              2. The Tool: Principle of Charity
            </h3>
            <p>
              When you encounter a new language, you must assume the speaker is <strong>Rational</strong> and mostly <strong>Correct</strong> about their environment.
            </p>
            <ul className="list-disc list-inside mt-2 space-y-2 text-slate-400 text-sm">
              <li>If the alien says "Gavagai" when a rabbit passes, assume they are talking about the rabbit, not "undetached rabbit parts" or "temporal slices of rabbithood" (at first).</li>
              <li>Maximize the truth of their statements. If your theory makes the alien a liar 90% of the time, your theory is wrong.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
              3. The Problem: Indeterminacy
            </h3>
            <p>
              Sometimes, two different theories fit all the evidence perfectly. Does "Gavagai" mean <em>Rabbit</em> or <em>Food</em>? If the alien only ever sees rabbits when it is hungry, you might never know. This is the <strong>Indeterminacy of Translation</strong>.
            </p>
          </section>

        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-800/30 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded transition-colors"
          >
            ACKNOWLEDGE & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};