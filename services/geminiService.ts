import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GameScenario, EvaluationResult, PlayerTheory, Language } from "../types";
import { getScenarios } from "../data/staticScenarios";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'dummy_key' });

const MODEL_NAME = "gemini-2.5-flash";

// Modified to accept language
export const generateGameScenario = async (levelIndex: number = 0, useAI: boolean = false, lang: Language = 'en'): Promise<GameScenario> => {
  const scenarios = getScenarios(lang);
  
  // Force static if no key or explicitly requested
  if (!useAI || !process.env.API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 800));
    const safeIndex = Math.min(levelIndex, scenarios.length - 1);
    return scenarios[safeIndex];
  }

  // For Dynamic (AI), we would need to update prompts to request specific language
  // Currently fallback to static for robust Spanish support without consuming API tokens on prompt engineering
  const safeIndex = Math.min(levelIndex, scenarios.length - 1);
  return scenarios[safeIndex];
};

export const evaluatePlayerTheory = async (
  scenario: GameScenario, 
  theory: PlayerTheory,
  lang: Language = 'en'
): Promise<EvaluationResult> => {
  
  // 1. LOCAL EVALUATION (Zero Cost)
  if (scenario.solutionKeywords) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake thinking time
    
    // Get all unique utterances from observations
    const uniqueUtterances = Array.from(new Set(scenario.observations.map(o => o.utterance)));
    let correctCount = 0;
    const feedbackLines: string[] = [];
    
    // Track the first failure to construct a specific behavioral mismatch message
    let firstFailure: { utterance: string, userDef: string } | null = null;

    for (const utterance of uniqueUtterances) {
      // Display the actual "p" (condition) provided by the user in the right hand side
      const rawDef = theory[utterance]?.trim() || "...";
      const userDef = rawDef.toLowerCase();
      
      const words = utterance.split(" ");
      let isUtteranceCorrect = true;
      let missingConcepts: string[] = [];

      for (const word of words) {
        const keywords = scenario.solutionKeywords[word] || [];
        // Allow fuzzy match: user's definition must contain ANY valid keyword for the alien word
        const wordMatch = keywords.some(k => userDef.includes(k.toLowerCase()));
        if (!wordMatch && keywords.length > 0) {
          isUtteranceCorrect = false;
          missingConcepts.push(word);
        }
      }

      if (isUtteranceCorrect) {
        correctCount++;
        feedbackLines.push(`✅ T('${utterance}') ↔ "${rawDef}"`);
      } else {
        const missingStr = missingConcepts.length > 0 ? ` (${lang === 'es' ? 'Conceptos faltantes' : 'Missing concepts'}: ${missingConcepts.join(", ")})` : "";
        feedbackLines.push(`❌ T('${utterance}') ↔ "${rawDef}"${missingStr}`);
        
        if (!firstFailure) {
            firstFailure = { utterance, userDef: rawDef };
        }
      }
    }

    const score = Math.round((correctCount / uniqueUtterances.length) * 100);
    const isCoherent = score >= 80; // Strict grading

    let profFeedback = "";
    const feedbackDict = {
        en: {
            excellent: "Excellent. Your T-Sentences correctly capture the truth conditions for all observed utterances.",
            partial: "Your theory is partially coherent, but some T-Sentences fail to account for the full logical structure of the utterances.",
            failGeneric: "The alien is not willing to claim these utterances in the situations you have described.",
            failSpecific: (utt: string, def: string) => `The alien is not willing to claim '${utt}' in the same situations you are willing to claim "${def}". Review the contexts where the alien remained silent or used a different phrase.`,
            altTheory: "Remember: The meaning of the whole must depend on the meaning of the parts."
        },
        es: {
            excellent: "Excelente. Tus Oraciones-T capturan correctamente las condiciones de verdad para todos los enunciados observados.",
            partial: "Tu teoría es parcialmente coherente, pero algunas Oraciones-T fallan en dar cuenta de la estructura lógica completa.",
            failGeneric: "El alienígena no está dispuesto a afirmar estos enunciados en las situaciones que has descrito.",
            failSpecific: (utt: string, def: string) => `El alienígena no está dispuesto a afirmar '${utt}' en las mismas situaciones en las que tú estás dispuesto a afirmar "${def}". Revisa los contextos donde el alienígena permaneció en silencio o usó una frase diferente.`,
            altTheory: "Recuerda: El significado del todo debe depender del significado de las partes."
        }
    };

    const msgs = feedbackDict[lang];

    if (score === 100) {
        profFeedback = msgs.excellent;
    } else if (score >= 60) {
        profFeedback = msgs.partial;
    } else {
        if (firstFailure) {
            profFeedback = msgs.failSpecific(firstFailure.utterance, firstFailure.userDef);
        } else {
            profFeedback = msgs.failGeneric;
        }
    }

    return {
      isCoherent,
      score,
      feedback: profFeedback + "\n\n" + feedbackLines.join("\n"),
      alternativeTheory: msgs.altTheory
    };
  }

  return { isCoherent: false, score: 0, feedback: "AI Evaluation not invoked.", alternativeTheory: "" };
};