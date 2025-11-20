import React from 'react';
import { Icons } from '../constants';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PhilosopherGuideProps {
  onClose: () => void;
  lang: Language;
}

export const PhilosopherGuide: React.FC<PhilosopherGuideProps> = ({ onClose, lang }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-emerald-500/30 w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl shadow-emerald-900/20 flex flex-col animate-in fade-in zoom-in duration-300">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-800/50 rounded-t-xl">
          <div className="flex items-center gap-3">
            <div className="text-emerald-400"><Icons.Brain /></div>
            <h2 className="text-xl font-mono font-bold text-emerald-400">{t.guideTitle}</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white hover:bg-slate-700 p-2 rounded transition-colors">
            <Icons.Check />
          </button>
        </div>

        <div className="overflow-y-auto p-8 space-y-8 text-slate-300 leading-relaxed font-light custom-scrollbar">
          
          {lang === 'en' ? (
            <>
            <section>
                <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
                1. The T-Schema
                </h3>
                <p className="mb-4">
                To understand a sentence is to know the conditions under which it is true. Your goal is to construct <strong>T-Sentences</strong> for every utterance you hear.
                </p>
                <div className="bg-slate-950 p-4 rounded border border-slate-800 text-sm font-mono text-center">
                    <span className="text-emerald-400">"Gavagai"</span> is true <span className="text-slate-400 italic">in the Language of the Subject</span> <span className="text-slate-500">if and only if</span> <span className="text-amber-400">a rabbit is present</span>.
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
                {/* Graphic Below */}
            </section>
            </>
          ) : (
            <>
             <section>
                <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
                1. El Esquema-T
                </h3>
                <p className="mb-4">
                Entender una oración es conocer las condiciones bajo las cuales es verdadera. Tu objetivo es construir <strong>Oraciones-T</strong> para cada enunciado que escuches.
                </p>
                <div className="bg-slate-950 p-4 rounded border border-slate-800 text-sm font-mono text-center">
                    <span className="text-emerald-400">"Gavagai"</span> es verdadero <span className="text-slate-400 italic">en el Lenguaje del Sujeto</span> <span className="text-slate-500">si y solo si</span> <span className="text-amber-400">hay un conejo presente</span>.
                </div>
                <p className="mt-4 text-sm text-slate-400">
                Nota: Solo las oraciones completas (enunciados) tienen condiciones de verdad. Incluso si el alienígena dice solo "Gorm" o "Hek", trátalos como acciones lingüísticas que afirman una verdad sobre el mundo.
                </p>
            </section>

            <section>
                <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
                2. Composicionalidad
                </h3>
                <p>
                A medida que el lenguaje se vuelve complejo, busca patrones. Si "Ruz Gorm" significa "Piedra Roja" y "Ruz Vell" significa "Cielo Rojo", puedes inferir que "Ruz" contribuye con "Rojo" a las condiciones de verdad de la oración completa.
                </p>
            </section>

            <section>
                <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
                3. La Triangulación
                </h3>
                <p className="mb-4">
                Davidson argumenta que el significado no es privado; surge de la interacción entre dos personas y un mundo compartido.
                </p>
                 {/* Graphic Below */}
            </section>
            </>
          )}

            <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-6 relative flex flex-col items-center justify-between h-48 mb-4 select-none">
                {/* World Object (Top) */}
                <div className="z-10 flex flex-col items-center">
                    <div className="text-3xl mb-1">🍎</div>
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                         {lang === 'es' ? "Objeto del Mundo" : "World Object"}
                    </span>
                </div>

                {/* Triangle Lines */}
                <svg className="absolute inset-0 w-full h-full text-slate-600 pointer-events-none">
                    <line x1="20%" y1="80%" x2="50%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="80%" y1="80%" x2="50%" y2="25%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                    <line x1="25%" y1="85%" x2="75%" y2="85%" stroke="currentColor" strokeWidth="2" />
                </svg>

                {/* Bottom Row */}
                <div className="w-full flex justify-between px-4 mt-8 z-10">
                    <div className="flex flex-col items-center">
                        <div className="text-3xl mb-1">👽</div>
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                             {lang === 'es' ? "Sujeto" : "Subject"}
                        </span>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-3xl mb-1">🧠</div>
                        <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                             {lang === 'es' ? "Intérprete" : "Interpreter"}
                        </span>
                        <span className="text-[10px] text-slate-500">
                             {lang === 'es' ? "(Tú)" : "(You)"}
                        </span>
                    </div>
                </div>
            </div>
            
             <p>
              {lang === 'es' 
                ? "Tú (el Intérprete) correlacionas el comportamiento del Sujeto con los objetos del Mundo que ambos ven para intentar averiguar qué " 
                : "You (the Interpreter) correlate the Subject's behavior with the objects in the World that you also see to try to figure out what the subject "}
              <em className="text-emerald-400 font-semibold">
                {lang === 'es' ? "toma" : "takes"}
              </em>
              {lang === 'es'
                ? " el sujeto como verdadero en su lenguaje. Esta triangulación es lo que ancla el significado."
                : " to be true in his language. This triangulation is what anchors meaning."}
              <span className="text-emerald-400 italic"> 
              {lang === 'es'
               ? " La Triangulación y la Caridad son parte del mismo proceso: "
               : " Triangulation and Charity are part of the same process: "}
              </span>
              {lang === 'es'
               ? "no puedes interpretar al alienígena sin compartir un mundo con él."
               : "you cannot interpret the alien without sharing a world with them."}
            </p>

          {lang === 'en' ? (
            <>
            <section>
                <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
                4. The Principle of Charity
                </h3>
                <p>
                To get the triangulation started, you must assume the speaker is <strong>Rational</strong> and generally <strong>Correct</strong> (by your own lights).
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
            </>
          ) : (
            <>
            <section>
                <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
                4. El Principio de Caridad
                </h3>
                <p>
                Para iniciar la triangulación, debes asumir que el hablante es <strong>Racional</strong> y generalmente está en lo <strong>Correcto</strong> (según tu propio criterio).
                </p>
                <ul className="list-disc list-inside mt-3 space-y-2 text-slate-400 text-sm">
                <li>Si el alienígena dice "Gavagai" cuando pasa un conejo, asume que se refiere al conejo (Verdad), no que te está engañando.</li>
                <li>Solo asumiendo que responden al mismo mundo que tú ves puedes empezar a asignar significados a sus sonidos.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-amber-400 font-mono font-bold text-lg mb-3 border-l-4 border-amber-500 pl-3">
                5. Indeterminación
                </h3>
                <p>
                A veces, múltiples teorías encajan perfectamente con la evidencia. ¿"Gavagai" significa <em>Conejo</em> o <em>Partes no separadas de conejo</em>? Esta es la <strong>Indeterminación de la Traducción</strong>.
                </p>
            </section>
            </>
          )}

        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-800/30 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded transition-colors shadow-lg shadow-emerald-900/50"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};