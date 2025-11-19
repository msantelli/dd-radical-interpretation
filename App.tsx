import React, { useState, useMemo } from 'react';
import { GameState, GameScenario, PlayerTheory, EvaluationResult, Language } from './types';
import { generateGameScenario, evaluatePlayerTheory } from './services/geminiService';
import { FieldNotes } from './components/FieldNotes';
import { PhilosopherGuide } from './components/PhilosopherGuide';
import { AboutModal } from './components/AboutModal';
import { getScenarios } from './data/staticScenarios';
import { Icons } from './constants';
import { TRANSLATIONS } from './data/translations';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [appLanguage, setAppLanguage] = useState<Language | null>(null);
  const [scenario, setScenario] = useState<GameScenario | null>(null);
  const [currentObsIndex, setCurrentObsIndex] = useState(0);
  const [theory, setTheory] = useState<PlayerTheory>({});
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  // Randomize the order of the language questions once on mount
  const languageOrder = useMemo(() => Math.random() > 0.5 ? 'en-first' : 'es-first', []);
  
  // Derived state
  const t = appLanguage ? TRANSLATIONS[appLanguage] : TRANSLATIONS['en'];
  const scenarios = appLanguage ? getScenarios(appLanguage) : [];
  const visibleObservations = scenario ? scenario.observations.slice(0, currentObsIndex + 1) : [];
  const isLastObservation = scenario && currentObsIndex === scenario.observations.length - 1;
  const hasNextLevel = currentLevel < scenarios.length - 1;

  const startGame = async (levelIndex: number = 0) => {
    if (!appLanguage) return;
    setGameState(GameState.LOADING);
    setCurrentLevel(levelIndex);
    try {
      const newScenario = await generateGameScenario(levelIndex, false, appLanguage);
      setScenario(newScenario);
      setTheory({});
      setCurrentObsIndex(0);
      setGameState(GameState.PLAYING);
    } catch (e) {
      console.error(e);
      setGameState(GameState.INTRO);
    }
  };

  const handleNextObservation = () => {
    if (scenario && currentObsIndex < scenario.observations.length - 1) {
      setCurrentObsIndex(prev => prev + 1);
    }
  };

  const handleSubmitTheory = async () => {
    if (!scenario || !appLanguage) return;
    setGameState(GameState.EVALUATING);
    const result = await evaluatePlayerTheory(scenario, theory, appLanguage);
    setEvaluation(result);
    setGameState(result.isCoherent ? GameState.SUCCESS : GameState.FAILURE);
  };

  const handleRetry = () => {
    setGameState(GameState.PLAYING);
    setEvaluation(null);
  };

  const handleNextLevel = () => {
    setEvaluation(null);
    startGame(currentLevel + 1);
  };

  const handleRestart = () => {
    setScenario(null);
    setEvaluation(null);
    setTheory({});
    setGameState(GameState.INTRO);
  };

  // Language Selection Screen
  if (!appLanguage) {
      return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-10 left-10 text-emerald-900 font-mono text-9xl opacity-10">?</div>
                <div className="absolute bottom-20 right-20 text-emerald-900 font-mono text-9xl opacity-10">¿</div>
            </div>

            <div className="max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-xl p-10 shadow-2xl z-10 text-center">
                <div className="flex flex-col md:flex-row justify-center gap-8 items-center mb-10 font-mono text-lg md:text-xl text-slate-300 leading-relaxed">
                    {languageOrder === 'en-first' ? (
                        <>
                            <div className="max-w-md">
                                "This is a game about interpreting others we don't understand, which language do you understand?"
                            </div>
                            <div className="hidden md:block h-20 w-px bg-slate-700"></div>
                            <div className="max-w-md">
                                "Este es un juego acerca de interpretar a quienes no entendemos, ¿qué idioma hablás?"
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="max-w-md">
                                "Este es un juego acerca de interpretar a quienes no entendemos, ¿qué idioma hablás?"
                            </div>
                            <div className="hidden md:block h-20 w-px bg-slate-700"></div>
                            <div className="max-w-md">
                                "This is a game about interpreting others we don't understand, which language do you understand?"
                            </div>
                        </>
                    )}
                </div>

                <div className="flex justify-center gap-6">
                    <button 
                        onClick={() => setAppLanguage('en')}
                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 hover:border-emerald-500 border border-slate-600 rounded-lg text-white font-mono text-xl transition-all shadow-lg hover:shadow-emerald-900/20 w-40"
                    >
                        English
                    </button>
                    <button 
                        onClick={() => setAppLanguage('es')}
                        className="px-8 py-4 bg-slate-800 hover:bg-slate-700 hover:border-emerald-500 border border-slate-600 rounded-lg text-white font-mono text-xl transition-all shadow-lg hover:shadow-emerald-900/20 w-40"
                    >
                        Español
                    </button>
                </div>
            </div>
        </div>
      );
  }

  // Introduction Screen
  if (gameState === GameState.INTRO) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
            <div className="absolute top-10 left-10 text-emerald-900 font-mono text-9xl opacity-10">T</div>
            <div className="absolute bottom-20 right-20 text-emerald-900 font-mono text-9xl opacity-10">iff</div>
        </div>

        {showGuide && <PhilosopherGuide onClose={() => setShowGuide(false)} lang={appLanguage} />}
        {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
        
        <div className="max-w-4xl w-full bg-slate-900 border border-emerald-500/30 rounded-xl p-8 shadow-2xl shadow-emerald-900/20 z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="p-4 bg-slate-800 rounded-full ring-2 ring-emerald-500/20 text-emerald-400 mb-4">
                <Icons.Brain />
            </div>
            <h1 className="text-4xl font-mono font-bold text-center text-emerald-400 tracking-tight">{t.title}</h1>
            <p className="text-slate-400 text-lg mt-2 font-light text-center max-w-2xl">
              {t.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
             {scenarios.map((scen, idx) => (
               <button
                 key={idx}
                 onClick={() => startGame(idx)}
                 className="group relative p-6 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 hover:border-emerald-500/50 transition-all text-left"
               >
                 <div className="absolute top-3 right-3 text-slate-600 group-hover:text-emerald-500/50 font-mono text-xs border border-slate-700 px-2 py-0.5 rounded">
                    {t.level} {idx + 1}
                 </div>
                 <h3 className="text-emerald-400 font-mono font-bold text-lg mb-1 group-hover:text-emerald-300">
                    {scen.languageName.toUpperCase()}
                 </h3>
                 <div className="text-slate-400 text-sm font-mono mb-3 flex items-center gap-2">
                    <Icons.Alien /> {scen.alienName}
                 </div>
                 <p className="text-slate-500 text-xs line-clamp-2 group-hover:text-slate-400">
                    {scen.takeaways?.[0] || "Analyze linguistic patterns and construct T-sentences."}
                 </p>
               </button>
             ))}
          </div>
          
          <div className="flex justify-center gap-4">
             <button 
                onClick={() => setAppLanguage(null)}
                className="px-4 py-2 bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-500 font-mono rounded transition-colors text-xs"
             >
                LANG
             </button>
            <button 
              onClick={() => setShowGuide(true)}
              className="px-6 py-2 bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-400 font-mono rounded transition-colors flex items-center gap-2 text-sm"
            >
              <Icons.Book /> {t.manual}
            </button>
            <button 
              onClick={() => setShowAbout(true)}
              className="px-6 py-2 bg-transparent border border-slate-700 hover:bg-slate-800 text-slate-400 font-mono rounded transition-colors flex items-center gap-2 text-sm"
            >
              <Icons.Info /> {t.about}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading Screen
  if (gameState === GameState.LOADING) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <div className="animate-spin text-emerald-500 mb-4"><Icons.Refresh /></div>
        <p className="text-emerald-500 font-mono animate-pulse">{t.loading} {currentLevel + 1}...</p>
      </div>
    );
  }

  // Game & Result Screens
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row overflow-hidden relative">
      {showGuide && <PhilosopherGuide onClose={() => setShowGuide(false)} lang={appLanguage} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}

      {/* Top Bar Mobile / Tablet */}
      <div className="md:hidden bg-slate-900 p-3 flex justify-between items-center border-b border-slate-800">
         <span className="text-emerald-400 font-bold font-mono">{t.title}</span>
         <div className="flex gap-2">
            <button onClick={() => setShowAbout(true)} className="p-2 text-slate-400 hover:text-white"><Icons.Info /></button>
            <button onClick={() => setShowGuide(true)} className="p-2 text-slate-400 hover:text-white"><Icons.Book /></button>
         </div>
      </div>

      {/* Left Panel: Observations & Game Feed */}
      <div className="w-full md:w-1/2 flex flex-col border-r border-slate-800 h-[calc(100vh-60px)] md:h-screen transition-all">
        <header className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center shadow-md z-10">
          <div className="flex flex-col">
             <div className="flex items-center gap-2 text-emerald-400">
                <Icons.Alien />
                <span className="font-mono font-bold tracking-widest">{scenario?.alienName || t.subject}</span>
             </div>
             <span className="text-xs font-mono text-slate-500 ml-8">{t.level} {currentLevel + 1}: {scenario?.languageName.toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setShowAbout(true)}
                className="hidden md:flex text-xs font-mono text-slate-400 hover:text-emerald-400 items-center gap-1 transition-colors"
            >
                <Icons.Info /> {t.about}
            </button>
            <button 
                onClick={() => setShowGuide(true)}
                className="hidden md:flex text-xs font-mono text-slate-400 hover:text-emerald-400 items-center gap-1 transition-colors"
            >
                <Icons.Book /> {t.manual}
            </button>
            <div className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">
                {t.observationCount} {currentObsIndex + 1} / {scenario?.observations.length}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-slate-950 custom-scrollbar scroll-smooth">
          {visibleObservations.map((obs, idx) => (
            <div 
              key={obs.id} 
              className={`border rounded-lg p-4 transition-all duration-700 ${
                idx === currentObsIndex 
                  ? 'border-emerald-500/50 bg-slate-800/40 shadow-lg shadow-emerald-900/10 translate-x-0 opacity-100' 
                  : 'border-slate-800 bg-slate-900/50 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="bg-slate-800 text-slate-400 text-xs font-mono px-2 py-1 rounded">{t.observationLog} #{obs.id}</span>
                <span className="text-3xl filter drop-shadow-lg" role="img" aria-label="visual">{obs.visualEmojis}</span>
              </div>
              <p className="text-slate-300 font-light mb-4 italic border-l-2 border-slate-700 pl-3">
                {obs.contextDescription}
              </p>
              <div className="bg-slate-900/80 border border-amber-500/20 p-3 rounded flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="font-mono text-amber-400 font-bold text-lg tracking-wide">
                  "{obs.utterance}"
                </span>
              </div>
            </div>
          ))}
          <div className="h-10"></div>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900 z-10">
          {!isLastObservation ? (
            <button 
              onClick={handleNextObservation}
              disabled={gameState !== GameState.PLAYING}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono flex items-center justify-center gap-2 transition-colors"
            >
              {t.nextObservation} <Icons.ArrowRight />
            </button>
          ) : (
             gameState === GameState.PLAYING && (
              <button 
                onClick={handleSubmitTheory}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
              >
                {t.submitTheory} <Icons.Check />
              </button>
            )
          )}
          
          {gameState !== GameState.PLAYING && gameState !== GameState.EVALUATING && (
             <button 
             onClick={handleRestart}
             className="w-full mt-2 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono flex items-center justify-center gap-2 transition-colors"
           >
             {t.backToSelect} <Icons.Refresh />
           </button>
          )}
        </div>
      </div>

      {/* Right Panel: Field Notes (Theory Builder) OR Evaluation Result */}
      <div className="w-full md:w-1/2 bg-slate-950 p-4 h-[calc(100vh-60px)] md:h-screen overflow-hidden border-l border-slate-800">
        {(gameState === GameState.PLAYING || gameState === GameState.EVALUATING) && scenario ? (
           gameState === GameState.EVALUATING ? (
             <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin text-emerald-500"><Icons.Refresh /></div>
                <p className="font-mono text-emerald-400 text-center">
                  {t.verifying}<br/>
                  <span className="text-xs text-slate-500">{t.verifyingSub}</span>
                </p>
             </div>
           ) : (
            <FieldNotes 
              scenario={scenario} 
              visibleObservations={visibleObservations}
              theory={theory} 
              onUpdateTheory={(word, def) => setTheory(prev => ({...prev, [word]: def}))}
              disabled={gameState !== GameState.PLAYING}
              lang={appLanguage}
            />
           )
        ) : null}

        {(gameState === GameState.SUCCESS || gameState === GameState.FAILURE) && evaluation && (
          <div className={`h-full overflow-y-auto rounded-lg border p-6 animate-in slide-in-from-bottom-4 duration-500 ${
            gameState === GameState.SUCCESS ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-red-500/50 bg-red-900/10'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-full shadow-lg ${gameState === GameState.SUCCESS ? 'bg-emerald-500 text-white shadow-emerald-900/50' : 'bg-red-500 text-white shadow-red-900/50'}`}>
                {gameState === GameState.SUCCESS ? <Icons.Check /> : <span className="font-bold text-xl px-2">!</span>}
              </div>
              <div>
                <h2 className="text-2xl font-bold font-mono">
                  {gameState === GameState.SUCCESS ? t.theoryConfirmed : t.theoryIncoherent}
                </h2>
                <p className="font-mono text-sm opacity-75 mt-1">{t.coherenceScore}: {evaluation.score}/100</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/80 p-5 rounded border border-slate-700 shadow-sm">
                <h3 className="text-slate-400 font-mono text-xs mb-3 uppercase tracking-wider border-b border-slate-800 pb-2">{t.feedback}</h3>
                <p className="text-slate-200 leading-relaxed whitespace-pre-line text-sm">{evaluation.feedback}</p>
              </div>
              
              {scenario?.takeaways && (
                  <div className="bg-emerald-950/30 p-5 rounded border border-emerald-500/20 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 border-b border-emerald-500/20 pb-2">
                        <Icons.Book />
                        <h3 className="text-emerald-400 font-mono text-xs uppercase tracking-wider">{t.takeaways}</h3>
                    </div>
                    <ul className="space-y-2">
                        {scenario.takeaways.map((point, i) => (
                            <li key={i} className="text-emerald-100/80 text-sm leading-relaxed list-disc list-inside">
                                {point}
                            </li>
                        ))}
                    </ul>
                  </div>
              )}

              <div className="bg-slate-900/80 p-5 rounded border border-slate-700 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-10"><Icons.Brain /></div>
                <h3 className="text-amber-400 font-mono text-xs mb-3 uppercase tracking-wider border-b border-slate-800 pb-2">{t.indeterminacy}</h3>
                <p className="text-slate-300 text-sm italic mb-3 opacity-80">
                  {t.indeterminacyQuote}
                </p>
                <div className="text-slate-200 border-l-2 border-amber-500 pl-3 text-sm">
                  {evaluation.alternativeTheory}
                </div>
              </div>
              
              {gameState === GameState.FAILURE && (
                <div className="space-y-3">
                    <button 
                    onClick={handleRetry}
                    className="px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded text-white font-mono text-sm transition-colors w-full border border-slate-600"
                    >
                    {t.revise}
                    </button>
                    
                    {hasNextLevel && (
                        <button 
                        onClick={handleNextLevel}
                        className="px-4 py-3 bg-transparent hover:bg-slate-800 rounded text-slate-400 font-mono text-sm transition-colors w-full border border-slate-700 border-dashed flex items-center justify-center gap-2"
                        >
                        {t.proceedAnyway} <Icons.ArrowRight />
                        </button>
                    )}
                </div>
              )}

              {gameState === GameState.SUCCESS && hasNextLevel && (
                <button 
                  onClick={handleNextLevel}
                  className="px-4 py-4 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-mono font-bold text-lg transition-colors w-full shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2"
                >
                  {t.proceedNext} {currentLevel + 2} <Icons.ArrowRight />
                </button>
              )}

              {!hasNextLevel && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded text-amber-200 font-mono text-center">
                  🎓 {t.complete} <br/>
                  {t.completeSub}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;