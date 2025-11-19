import { GameScenario } from "../types";

export const STATIC_SCENARIOS: GameScenario[] = [
  // LEVEL 1: Reference (Basic Predicates)
  // Focus: Direct correlation between object and word.
  {
    languageName: "Arborean",
    alienName: "Subject Quine",
    vocabulary: ["Gavagai", "Klaatu", "Barada", "Nikto"],
    solutionKeywords: {
      "Gavagai": ["rabbit", "hare", "bunny", "animal"],
      "Klaatu": ["run", "move", "fast", "go"],
      "Barada": ["storm", "rain", "thunder", "weather"],
      "Nikto": ["wolf", "predator", "danger", "enemy"]
    },
    takeaways: [
      "Truth is the Primitive: We do not start with reference (word-to-object links). We start by holding the alien's *sentences* true in the observed circumstances.",
      "Reference is Theoretical: We cannot see 'reference'. Mapping 'Gavagai' to rabbits is just a theoretical move we make to explain why the sentence is true.",
      "Indeterminacy: Does 'Gavagai' mean 'Rabbit' or 'Undetached Rabbit Part'? As long as the T-sentences come out true, the specific reference remains inscrutable."
    ],
    observations: [
      { 
        id: 1, 
        contextDescription: "A white rabbit scurries rapidly across the tall grass.", 
        visualEmojis: "🐇🌿💨", 
        utterance: "Gavagai", 
        truthConditionHint: "There is a rabbit." 
      },
      { 
        id: 2, 
        contextDescription: "The rabbit sits perfectly still, twitching its nose.", 
        visualEmojis: "🐇🛑", 
        utterance: "Gavagai", 
        truthConditionHint: "There is a rabbit (sitting)." 
      },
      { 
        id: 3, 
        contextDescription: "A wolf appears on the ridge. The alien points frantically.", 
        visualEmojis: "🐺😱", 
        utterance: "Nikto", 
        truthConditionHint: "There is a wolf." 
      },
      { 
        id: 4, 
        contextDescription: "The rabbit sees the wolf and runs away.", 
        visualEmojis: "🐇💨🐺", 
        utterance: "Klaatu", 
        truthConditionHint: "Something is running." 
      },
      { 
        id: 5, 
        contextDescription: "Dark clouds gather, thunder rumbles, and rain falls.", 
        visualEmojis: "☁️⚡🌧️", 
        utterance: "Barada", 
        truthConditionHint: "It is stormy." 
      },
      { 
        id: 6, 
        contextDescription: "The wolf runs away from the rain.", 
        visualEmojis: "🐺💨🌧️", 
        utterance: "Klaatu", 
        truthConditionHint: "It (the wolf) is running." 
      }
    ]
  },

  // LEVEL 2: Compositionality (Conjunctions)
  // Focus: Adjective + Noun combinations.
  // "Ruz Gorm" is true iff x is Red AND x is a Stone.
  {
    languageName: "Basaltic",
    alienName: "Subject Tarski",
    vocabulary: ["Gorm", "Vell", "Ruz", "Zul"],
    solutionKeywords: {
      "Gorm": ["stone", "rock", "boulder", "mineral"],
      "Vell": ["sky", "air", "cloud", "up", "atmosphere"],
      "Ruz": ["red", "crimson", "scarlet"],
      "Zul": ["blue", "azure", "cyan", "teal"]
    },
    takeaways: [
      "Compositionality: The meaning of 'Ruz Gorm' depends on the meaning of 'Ruz' plus 'Gorm'.",
      "Finite Axioms, Infinite Sentences: Once you know the parts, you can understand new combinations like 'Zul Gorm' even if you've never seen a blue stone before.",
      "Satisfaction: The predicate 'Ruz' is satisfied by all red things."
    ],
    observations: [
      {
        id: 1,
        contextDescription: "The alien picks up a rough grey stone.",
        visualEmojis: "🪨👽",
        utterance: "Gorm",
        truthConditionHint: "That is a stone."
      },
      {
        id: 2,
        contextDescription: "The alien points to a bright red stone on the ground.",
        visualEmojis: "🔴🪨",
        utterance: "Ruz Gorm",
        truthConditionHint: "That is a red stone."
      },
      {
        id: 3,
        contextDescription: "The alien points to the clear blue sky.",
        visualEmojis: "🟦☀️",
        utterance: "Zul Vell",
        truthConditionHint: "That is a blue sky."
      },
      {
        id: 4,
        contextDescription: "The sun sets, turning the sky a deep red.",
        visualEmojis: "🟥☀️",
        utterance: "Ruz Vell",
        truthConditionHint: "That is a red sky."
      },
      {
        id: 5,
        contextDescription: "The alien finds a rare blue gem embedded in a rock.",
        visualEmojis: "💎🟦",
        utterance: "Zul Gorm",
        truthConditionHint: "That is a blue stone."
      },
      {
        id: 6,
        contextDescription: "The alien holds up a red flower (distinct from stone/sky).",
        visualEmojis: "🌹",
        utterance: "Ruz",
        truthConditionHint: "That is red."
      }
    ]
  },

  // LEVEL 3: Negation (Logical Operators)
  // Focus: Presence vs Absence. "Xo" functions as logical NOT.
  {
    languageName: "Umbral",
    alienName: "Subject Boole",
    vocabulary: ["Zan", "Korn", "Xo"],
    solutionKeywords: {
      "Zan": ["light", "day", "sun", "bright", "shining"],
      "Korn": ["fire", "flame", "burn", "heat"],
      "Xo": ["not", "no", "non", "negation", "false", "absence", "without", "gone", "void"]
    },
    takeaways: [
      "Truth Functions: 'Xo' is a logical operator. It flips the truth value of the sentence.",
      "Abstract Objects: Unlike 'Rabbit', you cannot point to 'Not'. You only see it by the absence of the expected object.",
      "Recursion: Logical operators allow us to build complex sentences from simple ones."
    ],
    observations: [
      {
        id: 1,
        contextDescription: "The sun is shining brightly overhead.",
        visualEmojis: "☀️😎",
        utterance: "Zan",
        truthConditionHint: "It is light."
      },
      {
        id: 2,
        contextDescription: "Night falls. It is completely pitch black.",
        visualEmojis: "🌑👀",
        utterance: "Xo Zan",
        truthConditionHint: "It is not light."
      },
      {
        id: 3,
        contextDescription: "The alien lights a campfire.",
        visualEmojis: "🔥🪵",
        utterance: "Korn",
        truthConditionHint: "There is fire."
      },
      {
        id: 4,
        contextDescription: "The alien pours water on the fire. It goes out, leaving wet ash.",
        visualEmojis: "💧💨",
        utterance: "Xo Korn",
        truthConditionHint: "There is no fire."
      },
      {
        id: 5,
        contextDescription: "The alien holds a torch in a dark cave.",
        visualEmojis: "🔦🦇",
        utterance: "Korn",
        truthConditionHint: "There is fire (even here)."
      },
      {
        id: 6,
        contextDescription: "The alien points to the dark cave mouth (no fire, no sun).",
        visualEmojis: "🕳️",
        utterance: "Xo Zan",
        truthConditionHint: "There is no light."
      }
    ]
  },

  // LEVEL 4: Quantification (Singular vs Universal)
  // Focus: "Sim" (Exists x) vs "Maka" (For All x).
  {
    languageName: "Gestalt",
    alienName: "Subject Cantor",
    vocabulary: ["Hek", "Rond", "Sim", "Maka"],
    solutionKeywords: {
      "Hek": ["cube", "box", "square", "block", "voxel"],
      "Rond": ["sphere", "ball", "round", "orb", "circle"],
      "Sim": ["one", "single", "a ", "an ", "exists", "some", "singular", "individual"],
      "Maka": ["all", "every", "many", "group", "multiple", "universal", "everything"]
    },
    takeaways: [
      "Quantification: We moved from talking about specific objects to talking about sets of objects.",
      "Ontological Commitment (Trivia: Quine's position): To say 'Sim Hek' (There is a cube) commits you to the existence of cubes. Davidson, however, focuses on T-sentences.",
      "Logical Form: The surface grammar might be simple, but the logical form involves variables ranging over a domain."
    ],
    observations: [
      {
        id: 1,
        contextDescription: "A single cube sits on the table.",
        visualEmojis: "🟦",
        utterance: "Sim Hek",
        truthConditionHint: "There is a cube."
      },
      {
        id: 2,
        contextDescription: "A single sphere rolls across the floor.",
        visualEmojis: "⚽",
        utterance: "Sim Rond",
        truthConditionHint: "There is a sphere."
      },
      {
        id: 3,
        contextDescription: "A tray is filled with twenty cubes.",
        visualEmojis: "🟦🟦🟦",
        utterance: "Maka Hek",
        truthConditionHint: "There are many/all cubes."
      },
      {
        id: 4,
        contextDescription: "A pit is filled with hundreds of spheres.",
        visualEmojis: "⚽⚽⚽",
        utterance: "Maka Rond",
        truthConditionHint: "There are many/all spheres."
      },
      {
        id: 5,
        contextDescription: "The alien holds one cube, while pointing at the tray of many cubes.",
        visualEmojis: "🟦👉🟦🟦",
        utterance: "Sim Hek",
        truthConditionHint: "There is a cube (Singular)."
      },
      {
        id: 6,
        contextDescription: "The alien sweeps their arm across the entire room of shapes.",
        visualEmojis: "🙌📦",
        utterance: "Maka",
        truthConditionHint: "Everything/All."
      }
    ]
  }
];