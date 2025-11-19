import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GameScenario, EvaluationResult, PlayerTheory } from "../types";
import { STATIC_SCENARIOS } from "../data/staticScenarios";

// Initialize Gemini Client
// Note: API_KEY is required only if you want infinite AI generated scenarios.
// The app works in "Zero Cost" mode without it.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || 'dummy_key' });

const MODEL_NAME = "gemini-2.5-flash";

export const generateGameScenario = async (useAI: boolean = false): Promise<GameScenario> => {
  // If we want zero cost or if no API key is actually present, use static.
  if (!useAI || !process.env.API_KEY) {
    // Simulate network delay for realism and to allow the "Loading" spinner to show briefly
    await new Promise(resolve => setTimeout(resolve, 800));
    const randomIndex = Math.floor(Math.random() * STATIC_SCENARIOS.length);
    return STATIC_SCENARIOS[randomIndex];
  }

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
    console.warn("AI Generation failed or API Key missing, falling back to static scenario.", error);
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
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake thinking time for UX
    
    let correctCount = 0;
    const totalWords = scenario.vocabulary.length;
    const feedbackLines: string[] = [];

    for (const word of scenario.vocabulary) {
      const userDef = theory[word]?.toLowerCase() || "";
      const keywords = scenario.solutionKeywords[word] || [];
      
      // Flexible matching: Check if any keyword appears in user definition
      const isMatch = keywords.some(k => userDef.includes(k.toLowerCase()));
      
      if (isMatch) {
        correctCount++;
        feedbackLines.push(`✅ "${word}": Your T-Sentence corresponds to observed reality.`);
      } else {
        // Find an observation where this word was used to give a hint
        const relevantObs = scenario.observations.find(o => o.utterance === word);
        feedbackLines.push(`❌ "${word}": definition does not satisfy Truth Conditions (see Log #${relevantObs?.id || '?'}).`);
      }
    }

    const score = Math.round((correctCount / totalWords) * 100);
    const isCoherent = score >= 60;

    // Philosophical flavor text based on score
    let profFeedback = "";
    if (score === 100) profFeedback = "Your interpretation maximizes the rationality of the speaker. Excellent application of the Principle of Charity.";
    else if (score >= 60) profFeedback = "Your theory is largely coherent, though some truth conditions remain obscure.";
    else profFeedback = "Your interpretation attributes too many false beliefs to the speaker. Revisit the Principle of Charity.";

    return {
      isCoherent,
      score,
      feedback: profFeedback + "\n\n" + feedbackLines.join("\n"),
      alternativeTheory: "Indeterminacy Note: Even if your definitions fit, a 'Rabbit-Part' theory might also fit logically! We can never be 100% certain of reference."
    };
  }

  // 2. AI EVALUATION (Fallback / Infinite Mode)
  // Only runs if we generated a dynamic scenario without keywords
  if (!process.env.API_KEY) {
      return {
          isCoherent: false,
          score: 0,
          feedback: "Error: No API Key found for evaluation, and no local solution exists for this scenario.",
          alternativeTheory: "Please check configuration."
      }
  }

  const prompt = `
    Act as a strict Logic Professor evaluating a student's 'Truth Theory' (T-Theory) for an alien language.
    
    Observations (Data): ${JSON.stringify(scenario.observations)}.
    Student's T-Sentences: ${JSON.stringify(theory)}
    
    CRITERIA:
    1. Principle of Charity: Do the definitions make the alien's statements TRUE in the observed contexts?
    2. Coherence: Is the theory consistent?
    
    Return JSON.
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