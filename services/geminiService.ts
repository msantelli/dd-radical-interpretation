import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GameScenario, EvaluationResult, PlayerTheory } from "../types";
import { STATIC_SCENARIOS } from "../data/staticScenarios";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'dummy_key' });

const MODEL_NAME = "gemini-2.5-flash";

// Modified to accept a specific level index and strictly enforce static sequence if desired
export const generateGameScenario = async (levelIndex: number = 0, useAI: boolean = false): Promise<GameScenario> => {
  // Force static if no key or explicitly requested
  if (!useAI || !process.env.API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Ensure index is within bounds
    const safeIndex = Math.min(levelIndex, STATIC_SCENARIOS.length - 1);
    return STATIC_SCENARIOS[safeIndex];
  }

  // If AI is enabled, generate dynamic scenario
  const scenarioSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      languageName: { type: Type.STRING },
      alienName: { type: Type.STRING },
      vocabulary: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of alien words."
      },
      takeaways: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "3 educational bullet points about the linguistic concepts in this scenario."
      },
      observations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            contextDescription: { type: Type.STRING },
            visualEmojis: { type: Type.STRING },
            utterance: { type: Type.STRING },
            truthConditionHint: { type: Type.STRING }
          },
          required: ["id", "contextDescription", "visualEmojis", "utterance", "truthConditionHint"]
        },
      }
    },
    required: ["languageName", "alienName", "vocabulary", "observations", "takeaways"]
  };

  const prompt = `
    Create a radical interpretation puzzle game scenario.
    Level Difficulty: ${levelIndex + 1}.
    Requirements:
    1. 4 distinct alien words.
    2. 6 observations.
    3. 3 educational takeaways explaining the logic.
    Output JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: scenarioSchema,
      },
    });

    if (response.text) {
        return JSON.parse(response.text) as GameScenario;
    }
    throw new Error("Empty response from AI");
  } catch (error) {
    console.warn("AI Generation failed or API Key missing, falling back to static scenario.", error);
    const safeIndex = Math.min(levelIndex, STATIC_SCENARIOS.length - 1);
    return STATIC_SCENARIOS[safeIndex];
  }
};

export const evaluatePlayerTheory = async (
  scenario: GameScenario, 
  theory: PlayerTheory
): Promise<EvaluationResult> => {
  
  // 1. LOCAL EVALUATION (Zero Cost)
  // Checks if the user's T-Sentence for the Utterance correctly includes
  // the concepts of all the constituent words.
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
      
      // Decompose utterance into words (simple space split for static scenarios)
      // Example: "Ruber Petra" -> ["Ruber", "Petra"]
      const words = utterance.split(" ");
      let isUtteranceCorrect = true;
      let missingConcepts: string[] = [];

      // Check if the T-Sentence contains the essence of ALL parts (Compositionality Check)
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
        // Give specific feedback about which part of the composition failed
        const missingStr = missingConcepts.length > 0 ? ` (Missing concepts: ${missingConcepts.join(", ")})` : "";
        feedbackLines.push(`❌ T('${utterance}') ↔ "${rawDef}"${missingStr}`);
        
        if (!firstFailure) {
            firstFailure = { utterance, userDef: rawDef };
        }
      }
    }

    const score = Math.round((correctCount / uniqueUtterances.length) * 100);
    const isCoherent = score >= 80; // Strict grading

    let profFeedback = "";
    if (score === 100) {
        profFeedback = "Excellent. Your T-Sentences correctly capture the truth conditions for all observed utterances.";
    } else if (score >= 60) {
        profFeedback = "Your theory is partially coherent, but some T-Sentences fail to account for the full logical structure of the utterances.";
    } else {
        // Specific behavioral mismatch feedback
        if (firstFailure) {
            profFeedback = `The alien is not willing to claim '${firstFailure.utterance}' in the same situations you are willing to claim "${firstFailure.userDef}". Review the contexts where the alien remained silent or used a different phrase.`;
        } else {
            profFeedback = "The alien is not willing to claim these utterances in the situations you have described.";
        }
    }

    return {
      isCoherent,
      score,
      feedback: profFeedback + "\n\n" + feedbackLines.join("\n"),
      alternativeTheory: "Remember: The meaning of the whole must depend on the meaning of the parts."
    };
  }

  // 2. AI EVALUATION (Only if explicitly using dynamic scenarios and API key exists)
  if (!process.env.API_KEY) {
      return {
          isCoherent: false,
          score: 0,
          feedback: "Configuration Error: No evaluation mechanism available.",
          alternativeTheory: ""
      }
  }

  // ... (Existing AI Logic fallback would go here, but sticking to static for this request)
  return { isCoherent: false, score: 0, feedback: "AI Evaluation not invoked.", alternativeTheory: "" };
};