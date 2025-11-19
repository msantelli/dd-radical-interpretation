import React, { useState, useEffect } from 'react';
import { GameState, GameScenario, PlayerTheory, EvaluationResult } from './types';
import { generateGameScenario, evaluatePlayerTheory } from './services/geminiService';
import { FieldNotes } from './components/FieldNotes';
import { PhilosopherGuide } from './components/PhilosopherGuide';
import { Icons } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.INTRO);
  const [scenario, setScenario] = useState<GameScenario | null>(null);
  const [currentObsIndex, setCurrentObsIndex] = useState(0);
  const [theory, setTheory] = useState<PlayerTheory>({});
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  
  // History of observations the player has seen so far
  const visibleObservations = scenario ? scenario.observations.slice(0, currentObsIndex + 1) : [];
  const isLastObservation = scenario && currentObsIndex === scenario.observations.length - 1;

  const startGame = async () => {
    setGameState(GameState.LOADING);
    try {
      // Defaults to false (Use Static/Free scenarios)
      const newScenario = await generateGameScenario(false);
      setScenario(newScenario);
      setTheory(newScenario.vocabulary.reduce((acc, word) => ({ ...acc, [word]: '' }), {}));
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
    if (!scenario) return;
    setGameState(GameState.EVALUATING);
    const result = await evaluatePlayerTheory(scenario, theory);
    setEvaluation(result);
    setGameState(result.isCoherent ? GameState.SUCCESS : GameState.FAILURE);
  };

  const handleRetry = () => {
    setGameState(GameState.PLAYING);
    setEvaluation(null);
  };

  const handleRestart = () => {
    setScenario(null);
    setEvaluation(null);
    setTheory({});
    setGameState(GameState.INTRO);
  };

  // Introduction Screen
  if (gameState === GameState.INTRO) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
        {showGuide && <PhilosopherGuide onClose={() => setShowGuide(false)} />}
        
        <div className="max-w-2xl w-full bg-slate-900 border border-emerald-500/30 rounded-xl p-8 shadow-2xl shadow-emerald-900/20">
          <div className="flex justify-center mb-6 text-emerald-400">
            <Icons.Brain />
          </div>
          <h1 className="text-4xl font-mono font-bold text-center text-emerald-400 mb-4">RADICAL INTERPRETER</h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light text-center">
            A simulation of Donald Davidson's philosophy of language.
            Build a Truth-Theory for an unknown language using only observable behavior.
          </p>
          
          <div className="bg-slate-800 p-4 rounded-lg border-l-4 border-amber-500 mb-8">
            <h3 className="text-amber-400 font-bold font-mono mb-2">CORE DIRECTIVES:</h3>
            <ul className="list-disc list-inside text-slate-400 space-y-2">
              <li><strong>Observation:</strong> Watch the alien interact with the world.</li>
              <li><strong>T-Schema:</strong> Define truth conditions ("X is true iff Y").</li>
              <li><strong>Charity:</strong> Assume the alien is rational and truth-telling.</li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <button 
              onClick={startGame}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded transition-colors flex items-center justify-center gap-2"
            >
              BEGIN SIMULATION <Icons.ArrowRight />
            </button>
            
            <button 
              onClick={() => setShowGuide(true)}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono rounded transition-colors flex items-center justify-center gap-2"
            >
              READ FIELD MANUAL <Icons.Book />
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
        <p className="text-emerald-500 font-mono animate-pulse">GENERATING SCENARIO DATA...</p>
      </div>
    );
  }

  // Game & Result Screens
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col md:flex-row overflow-hidden relative">
      {showGuide && <PhilosopherGuide onClose={() => setShowGuide(false)} />}

      {/* Top Bar Mobile / Tablet */}
      <div className="md:hidden bg-slate-900 p-2 flex justify-between items-center border-b border-slate-800">
         <span className="text-emerald-400 font-bold font-mono">RADICAL INTERPRETER</span>
         <button onClick={() => setShowGuide(true)} className="p-2 text-slate-400"><Icons.Book /></button>
      </div>

      {/* Left Panel: Observations & Game Feed */}
      <div className="w-full md:w-1/2 flex flex-col border-r border-slate-800 h-[calc(100vh-50px)] md:h-screen">
        <header className="p-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center">
          <div className="flex items-center gap-2 text-emerald-400">
            <Icons.Alien />
            <span className="font-mono font-bold tracking-widest">{scenario?.alienName || 'SUBJECT'}</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
                onClick={() => setShowGuide(true)}
                className="hidden md:flex text-xs font-mono text-slate-400 hover:text-emerald-400 items-center gap-1"
            >
                <Icons.Book /> MANUAL
            </button>
            <div className="text-xs font-mono text-slate-500">
                LOG: {currentObsIndex + 1}/{scenario?.observations.length}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-slate-900 to-slate-950">
          {visibleObservations.map((obs, idx) => (
            <div 
              key={obs.id} 
              className={`border rounded-lg p-4 transition-all duration-500 ${
                idx === currentObsIndex 
                  ? 'border-emerald-500/50 bg-slate-800/40 shadow-lg shadow-emerald-900/10' 
                  : 'border-slate-800 bg-slate-900/50 opacity-60'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="bg-slate-800 text-slate-400 text-xs font-mono px-2 py-1 rounded">LOG #{obs.id}</span>
                <span className="text-2xl" role="img" aria-label="visual">{obs.visualEmojis}</span>
              </div>
              <p className="text-slate-300 font-light mb-4 italic">
                {obs.contextDescription}
              </p>
              <div className="bg-slate-950 border border-amber-500/20 p-3 rounded flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="font-mono text-amber-400 font-bold text-lg tracking-wide">
                  "{obs.utterance}"
                </span>
              </div>
            </div>
          ))}
          <div className="h-10"></div> {/* Spacer */}
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          {!isLastObservation ? (
            <button 
              onClick={handleNextObservation}
              disabled={gameState !== GameState.PLAYING}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono flex items-center justify-center gap-2 transition-colors"
            >
              NEXT OBSERVATION <Icons.ArrowRight />
            </button>
          ) : (
             gameState === GameState.PLAYING && (
              <button 
                onClick={handleSubmitTheory}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold rounded transition-colors flex items-center justify-center gap-2"
              >
                SUBMIT FOR REVIEW <Icons.Check />
              </button>
            )
          )}
          
          {gameState !== GameState.PLAYING && gameState !== GameState.EVALUATING && (
             <button 
             onClick={handleRestart}
             className="w-full mt-2 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded text-slate-200 font-mono flex items-center justify-center gap-2 transition-colors"
           >
             NEW SIMULATION <Icons.Refresh />
           </button>
          )}
        </div>
      </div>

      {/* Right Panel: Field Notes (Theory Builder) OR Evaluation Result */}
      <div className="w-full md:w-1/2 bg-slate-950 p-4 h-[calc(100vh-50px)] md:h-screen overflow-hidden">
        {(gameState === GameState.PLAYING || gameState === GameState.EVALUATING) && scenario ? (
           gameState === GameState.EVALUATING ? (
             <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="animate-spin text-emerald-500"><Icons.Refresh /></div>
                <p className="font-mono text-emerald-400">PEER REVIEWING T-THEORY...</p>
             </div>
           ) : (
            <FieldNotes 
              scenario={scenario} 
              theory={theory} 
              onUpdateTheory={(word, def) => setTheory(prev => ({...prev, [word]: def}))}
              disabled={gameState !== GameState.PLAYING}
            />
           )
        ) : null}

        {(gameState === GameState.SUCCESS || gameState === GameState.FAILURE) && evaluation && (
          <div className={`h-full overflow-y-auto rounded-lg border p-6 ${
            gameState === GameState.SUCCESS ? 'border-emerald-500/50 bg-emerald-900/10' : 'border-red-500/50 bg-red-900/10'
          }`}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-3 rounded-full ${gameState === GameState.SUCCESS ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                {gameState === GameState.SUCCESS ? <Icons.Check /> : <span className="font-bold text-xl">!</span>}
              </div>
              <div>
                <h2 className="text-2xl font-bold font-mono">
                  {gameState === GameState.SUCCESS ? 'THEORY ACCEPTED' : 'THEORY REJECTED'}
                </h2>
                <p className="font-mono text-sm opacity-75">COHERENCE SCORE: {evaluation.score}/100</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                <h3 className="text-slate-400 font-mono text-sm mb-2 uppercase">Peer Review Feedback</h3>
                <p className="text-slate-200 leading-relaxed whitespace-pre-line">{evaluation.feedback}</p>
              </div>

              <div className="bg-slate-900/50 p-4 rounded border border-slate-700">
                <h3 className="text-amber-400 font-mono text-sm mb-2 uppercase">Indeterminacy Note</h3>
                <p className="text-slate-300 text-sm italic mb-2">
                  "Even if a theory fits all data, other theories might also fit."
                </p>
                <div className="text-slate-200 border-l-2 border-amber-500 pl-3">
                  {evaluation.alternativeTheory}
                </div>
              </div>
              
              {gameState === GameState.FAILURE && (
                <button 
                  onClick={handleRetry}
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-white font-mono text-sm transition-colors w-full"
                >
                  REVISE CURRENT THEORY
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;