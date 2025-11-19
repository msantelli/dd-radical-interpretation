export enum GameState {
  INTRO = 'INTRO',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  EVALUATING = 'EVALUATING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export interface Utterance {
  id: string;
  word: string; // The alien sound
}

export interface Observation {
  id: number;
  contextDescription: string; // Text description of the scene
  visualEmojis: string; // Emojis representing the scene
  utterance: string; // The word spoken
  truthConditionHint: string; // Hidden underlying logic (for debugging or subtle hints)
}

export interface GameScenario {
  languageName: string;
  alienName: string;
  observations: Observation[];
  vocabulary: string[]; // List of all possible alien words
  // Added for offline/free evaluation
  solutionKeywords?: {
    [word: string]: string[]; // List of acceptable keywords for each word (lowercase)
  };
}

export interface PlayerTheory {
  [word: string]: string; // Map of Alien Word -> Player's T-Sentence predicate
}

export interface EvaluationResult {
  isCoherent: boolean;
  feedback: string;
  score: number; // 0-100 coherence score
  alternativeTheory?: string; // Explanation of indeterminacy
}