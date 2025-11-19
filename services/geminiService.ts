import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GameScenario, EvaluationResult, PlayerTheory } from "../types";
import { STATIC_SCENARIOS } from "../data/staticScenarios";

// Initialize Gemini Client
// We only initialize this if we actually plan to use it, but for this refactor
// we will default to static scenarios to ensure zero cost operation.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MODEL_NAME = "gemini-2.5-flash";

export const generateGameScenario = async (useAI: boolean = false): Promise<GameScenario> => {
  if (!useAI) {
    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 800));
    const randomIndex = Math.floor(Math.random() * STATIC_SCENARIOS.length);
    return STATIC_SCENARIOS[randomIndex];
  }

  // ... (Existing AI code preserved below for "Infinite Mode" if desired)
  const scenarioSchema: Schema = {
    type: Type.OBJECT,
    properties: {
      languageName: { type: Type.STRING },
      alienName: { type: Type.STRING },
      vocabulary: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 5 distinct alien words."
      },
      observations: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.INTEGER },
            contextDescription: { type: Type.STRING, description: "A vivid description of the scene." },
            visualEmojis: { type: Type.STRING },
            utterance: { type: Type.STRING },
            truthConditionHint: { type: Type.STRING }
          },
          required: ["id", "contextDescription", "visualEmojis", "utterance", "truthConditionHint"]
        },
      }
    },
    required: ["languageName", "alienName", "vocabulary", "observations"]
  };

  const prompt = `
    Create a radical interpretation puzzle game scenario.
    Requirements:
    1. 5 distinct alien words.
    2. 8 observations with initial ambiguity.
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
    console.error("Fallback to static due to error:", error);
    return STATIC_SCENARIOS[0];
  }
};

export const evaluatePlayerTheory = async (
  scenario: GameScenario, 
  theory: PlayerTheory
): Promise<EvaluationResult> => {
  
  // 1. LOCAL EVALUATION (Zero Cost)
  // If the scenario has solution keywords, we evaluate locally.
  if (scenario.solutionKeywords) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake thinking time
    
    let correctCount = 0;
    const totalWords = scenario.vocabulary.length;
    const feedbackLines: string[] = [];

    for (const word of scenario.vocabulary) {
      const userDef = theory[word]?.toLowerCase() || "";
      const keywords = scenario.solutionKeywords[word] || [];
      
      const isMatch = keywords.some(k => userDef.includes(k));
      if (isMatch) {
        correctCount++;
        feedbackLines.push(`✅ "${word}": Your definition covers the core concept.`);
      } else {
        feedbackLines.push(`❌ "${word}": Does not match observed truth conditions (e.g., compare Obs #${scenario.observations.find(o => o.utterance === word)?.id}).`);
      }
    }

    const score = Math.round((correctCount / totalWords) * 100);
    const isCoherent = score >= 60;

    return {
      isCoherent,
      score,
      feedback: feedbackLines.join("\n"),
      alternativeTheory: "Indeterminacy Note: Even if your definitions fit, a 'Rabbit-Part' theory might also fit logically!"
    };
  }

  // 2. AI EVALUATION (If no local keywords exist)
  const prompt = `
    Act as a Logic Professor evaluating a T-Theory.
    Observations: ${JSON.stringify(scenario.observations)}.
    Student Definitions: ${JSON.stringify(theory)}
    
    Evaluate if definitions make utterances TRUE in context.
    Return JSON with isCoherent (bool), score (0-100), feedback (string), alternativeTheory (string).
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      isCoherent: { type: Type.BOOLEAN },
      score: { type: Type.INTEGER },
      feedback: { type: Type.STRING },
      alternativeTheory: { type: Type.STRING }
    },
    required: ["isCoherent", "score", "feedback", "alternativeTheory"]
  };

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });
    
    if (response.text) {
        return JSON.parse(response.text) as EvaluationResult;
    }
    throw new Error("Empty AI response");
  } catch (error) {
    return {
      isCoherent: false,
      score: 0,
      feedback: "Evaluation service unavailable.",
      alternativeTheory: "N/A"
    };
  }
};