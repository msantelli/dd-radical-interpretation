import { GameScenario } from "../types";

export const STATIC_SCENARIOS: GameScenario[] = [
  {
    languageName: "Arborean",
    alienName: "Subject Quine",
    vocabulary: ["Gavagai", "Klaatu", "Barada", "Nikto", "Lumu"],
    solutionKeywords: {
      "Gavagai": ["rabbit", "bunny", "hare", "animal", "rodent"],
      "Klaatu": ["run", "move", "go", "fast", "sprint"],
      "Barada": ["storm", "rain", "thunder", "sky", "bad weather"],
      "Nikto": ["danger", "scary", "fear", "threat", "predator"],
      "Lumu": ["eat", "food", "consume", "hungry", "meal"]
    },
    observations: [
      { 
        id: 1, 
        contextDescription: "A white rabbit scurries rapidly across the tall grass.", 
        visualEmojis: "🐇🌿💨", 
        utterance: "Gavagai", 
        truthConditionHint: "Rabbit or Running?" 
      },
      { 
        id: 2, 
        contextDescription: "The rabbit sits perfectly still, twitching its nose.", 
        visualEmojis: "🐇🛑", 
        utterance: "Gavagai", 
        truthConditionHint: "Rabbit (excludes Running)" 
      },
      { 
        id: 3, 
        contextDescription: "A wolf appears on the ridge. The alien looks frightened.", 
        visualEmojis: "🐺😱", 
        utterance: "Nikto", 
        truthConditionHint: "Danger/Wolf" 
      },
      { 
        id: 4, 
        contextDescription: "The rabbit runs away from the wolf.", 
        visualEmojis: "🐇💨🐺", 
        utterance: "Klaatu", 
        truthConditionHint: "Running (excludes Rabbit)" 
      },
      { 
        id: 5, 
        contextDescription: "Dark clouds gather and thunder rumbles.", 
        visualEmojis: "☁️⚡", 
        utterance: "Barada", 
        truthConditionHint: "Storm" 
      },
      { 
        id: 6, 
        contextDescription: "The alien is eating a strange fruit.", 
        visualEmojis: "👽🍎😋", 
        utterance: "Lumu", 
        truthConditionHint: "Eating" 
      },
      { 
        id: 7, 
        contextDescription: "The wolf catches a rabbit and begins to eat it.", 
        visualEmojis: "🐺🍖🐇", 
        utterance: "Lumu", 
        truthConditionHint: "Eating (Subject is Wolf)" 
      },
      { 
        id: 8, 
        contextDescription: "It starts raining. The wolf runs away.", 
        visualEmojis: "🌧️🐺💨", 
        utterance: "Klaatu", 
        truthConditionHint: "Running" 
      }
    ]
  }
];