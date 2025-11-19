import { GameScenario } from "../types";

const SUBJECT_NAMES = [
  "Quine", "Davidson", "Tarski", "Sellars", "Boole", "Cantor", 
  "Glüer", "Ramberg", "Wikforss", "Verheggen", "Pedace", 
  "Moretti", "Simpson", "Wittgenstein"
];

const STATIC_SCENARIOS_EN: GameScenario[] = [
  // LEVEL 1: Reference (Basic Predicates)
  {
    languageName: "Arborean",
    alienName: "Subject Quine", // Placeholder, will be overwritten
    vocabulary: ["Gavagai", "Klaatu", "Barada", "Nikto"],
    solutionKeywords: {
      "Gavagai": ["rabbit", "hare", "bunny", "animal", "critter", "mammal", "coney", "lapin"],
      "Klaatu": ["run", "move", "fast", "go", "flee", "sprint", "dash", "motion", "moving", "escape"],
      "Barada": ["storm", "rain", "thunder", "weather", "wet", "pour", "lightning", "cloud", "tempest"],
      "Nikto": ["wolf", "predator", "danger", "enemy", "threat", "beast", "canine", "hunter"]
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
  // LEVEL 2: Compositionality
  {
    languageName: "Basaltic",
    alienName: "Subject Tarski",
    vocabulary: ["Gorm", "Vell", "Ruz", "Zul"],
    solutionKeywords: {
      "Gorm": ["stone", "rock", "boulder", "mineral", "pebble", "granite", "concrete", "solid object"],
      "Vell": ["sky", "air", "cloud", "up", "atmosphere", "heaven", "blue yonder", "above"],
      "Ruz": ["red", "crimson", "scarlet", "ruby", "cherry", "maroon", "rose", "reddish"],
      "Zul": ["blue", "azure", "cyan", "teal", "sapphire", "cobalt", "indigo", "bluish"]
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
  // LEVEL 3: Negation
  {
    languageName: "Umbral",
    alienName: "Subject Boole",
    vocabulary: ["Zan", "Korn", "Xo"],
    solutionKeywords: {
      "Zan": ["light", "day", "sun", "bright", "shining", "glow", "radiance", "lit", "illumination", "daytime"],
      "Korn": ["fire", "flame", "burn", "heat", "blaze", "inferno", "spark", "combustion", "hot"],
      "Xo": ["not", "no", "non", "negation", "false", "absence", "without", "gone", "void", "lacking", "missing", "n't", "zero"]
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
  // LEVEL 4: Quantification
  {
    languageName: "Gestalt",
    alienName: "Subject Cantor",
    vocabulary: ["Hek", "Rond", "Sim", "Maka"],
    solutionKeywords: {
      "Hek": ["cube", "box", "square", "block", "voxel", "brick", "die", "dice", "hexahedron"],
      "Rond": ["sphere", "ball", "round", "orb", "circle", "globe", "marble", "pellet", "circular object", "spheroid"],
      "Sim": ["one", "single", "a ", "an ", "exists", "some", "singular", "individual", "unit", "lone", "solo", "unique"],
      "Maka": ["all", "every", "many", "group", "multiple", "universal", "everything", "plenty", "lot", "collective", "entire", "whole"]
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

const STATIC_SCENARIOS_ES: GameScenario[] = [
    // LEVEL 1: Reference
    {
      languageName: "Arbóreo",
      alienName: "Sujeto Quine",
      vocabulary: ["Gavagai", "Klaatu", "Barada", "Nikto"],
      solutionKeywords: {
        "Gavagai": ["conejo", "liebre", "conejito", "animal", "mamífero", "bicho", "roedor", "conejos"],
        "Klaatu": ["correr", "corre", "mover", "rápido", "ir", "huye", "escapa", "movimiento", "veloz", "marcha", "carrera"],
        "Barada": ["tormenta", "lluvia", "trueno", "clima", "llueve", "llover", "tempestad", "rayo", "agua", "nublado", "aguacero"],
        "Nikto": ["lobo", "depredador", "peligro", "enemigo", "bestia", "canino", "perro", "amenaza", "cazador"]
      },
      takeaways: [
        "La Verdad es lo Primitivo: No empezamos con la referencia (vínculos palabra-objeto). Empezamos asumiendo que las *oraciones* del alienígena son verdaderas en las circunstancias observadas.",
        "La Referencia es Teórica: No podemos ver la 'referencia'. Mapear 'Gavagai' a conejos es solo un movimiento teórico para explicar por qué la oración es verdadera.",
        "Indeterminación: ¿'Gavagai' significa 'Conejo' o 'Parte no separada de conejo'? Mientras las oraciones-T sean verdaderas, la referencia específica permanece inescrutable."
      ],
      observations: [
        { 
          id: 1, 
          contextDescription: "Un conejo blanco corre rápidamente por la hierba alta.", 
          visualEmojis: "🐇🌿💨", 
          utterance: "Gavagai", 
          truthConditionHint: "Hay un conejo." 
        },
        { 
          id: 2, 
          contextDescription: "El conejo se sienta perfectamente quieto, moviendo su nariz.", 
          visualEmojis: "🐇🛑", 
          utterance: "Gavagai", 
          truthConditionHint: "Hay un conejo (sentado)." 
        },
        { 
          id: 3, 
          contextDescription: "Un lobo aparece en la cresta. El alienígena señala frenéticamente.", 
          visualEmojis: "🐺😱", 
          utterance: "Nikto", 
          truthConditionHint: "Hay un lobo." 
        },
        { 
          id: 4, 
          contextDescription: "El conejo ve al lobo y huye.", 
          visualEmojis: "🐇💨🐺", 
          utterance: "Klaatu", 
          truthConditionHint: "Algo está corriendo." 
        },
        { 
          id: 5, 
          contextDescription: "Nubes oscuras se juntan, truenos retumban y cae lluvia.", 
          visualEmojis: "☁️⚡🌧️", 
          utterance: "Barada", 
          truthConditionHint: "Hay tormenta." 
        },
        { 
          id: 6, 
          contextDescription: "El lobo huye de la lluvia.", 
          visualEmojis: "🐺💨🌧️", 
          utterance: "Klaatu", 
          truthConditionHint: "Eso (el lobo) está corriendo." 
        }
      ]
    },
  
    // LEVEL 2: Compositionality
    {
      languageName: "Basáltico",
      alienName: "Sujeto Tarski",
      vocabulary: ["Gorm", "Vell", "Ruz", "Zul"],
      solutionKeywords: {
        "Gorm": ["piedra", "roca", "mineral", "guijarro", "piedras", "rocas", "pedrusco"],
        "Vell": ["cielo", "aire", "nube", "arriba", "atmósfera", "celeste", "firmamento", "espacio"],
        "Ruz": ["rojo", "carmesí", "escarlata", "rubí", "colorado", "rojizo", "sangre"],
        "Zul": ["azul", "celeste", "cian", "azulado", "zafiro", "marino", "turquesa"]
      },
      takeaways: [
        "Composicionalidad: El significado de 'Ruz Gorm' depende del significado de 'Ruz' más 'Gorm'.",
        "Axiomas Finitos, Oraciones Infinitas: Una vez que conoces las partes, puedes entender nuevas combinaciones como 'Zul Gorm' aunque nunca hayas visto una piedra azul antes.",
        "Satisfacción: El predicado 'Ruz' es satisfecho por todas las cosas rojas."
      ],
      observations: [
        {
          id: 1,
          contextDescription: "El alienígena recoge una piedra gris áspera.",
          visualEmojis: "🪨👽",
          utterance: "Gorm",
          truthConditionHint: "Eso es una piedra."
        },
        {
          id: 2,
          contextDescription: "El alienígena señala una piedra roja brillante en el suelo.",
          visualEmojis: "🔴🪨",
          utterance: "Ruz Gorm",
          truthConditionHint: "Eso es una piedra roja."
        },
        {
          id: 3,
          contextDescription: "El alienígena señala al cielo azul claro.",
          visualEmojis: "🟦☀️",
          utterance: "Zul Vell",
          truthConditionHint: "Eso es un cielo azul."
        },
        {
          id: 4,
          contextDescription: "El sol se pone, volviendo el cielo de un rojo profundo.",
          visualEmojis: "🟥☀️",
          utterance: "Ruz Vell",
          truthConditionHint: "Eso es un cielo rojo."
        },
        {
          id: 5,
          contextDescription: "El alienígena encuentra una gema azul rara incrustada en una roca.",
          visualEmojis: "💎🟦",
          utterance: "Zul Gorm",
          truthConditionHint: "Eso es una piedra azul."
        },
        {
          id: 6,
          contextDescription: "El alienígena sostiene una flor roja (distinta de piedra/cielo).",
          visualEmojis: "🌹",
          utterance: "Ruz",
          truthConditionHint: "Eso es rojo."
        }
      ]
    },
  
    // LEVEL 3: Negation
    {
      languageName: "Umbrío",
      alienName: "Sujeto Boole",
      vocabulary: ["Zan", "Korn", "Xo"],
      solutionKeywords: {
        "Zan": ["luz", "día", "sol", "brillante", "brilla", "iluminado", "claridad", "resplandor", "luminoso"],
        "Korn": ["fuego", "llama", "quemar", "calor", "ardor", "incendio", "fogata", "caliente", "lumbre"],
        "Xo": ["no", "negación", "falso", "ausencia", "sin", "nada", "tampoco", "falta", "carencia", "vacío"]
      },
      takeaways: [
        "Funciones de Verdad: 'Xo' es un operador lógico. Invierte el valor de verdad de la oración.",
        "Objetos Abstractos: A diferencia de 'Conejo', no puedes señalar 'No'. Solo lo ves por la ausencia del objeto esperado.",
        "Recursión: Los operadores lógicos nos permiten construir oraciones complejas a partir de simples."
      ],
      observations: [
        {
          id: 1,
          contextDescription: "El sol brilla intensamente sobre la cabeza.",
          visualEmojis: "☀️😎",
          utterance: "Zan",
          truthConditionHint: "Hay luz."
        },
        {
          id: 2,
          contextDescription: "Cae la noche. Está completamente oscuro.",
          visualEmojis: "🌑👀",
          utterance: "Xo Zan",
          truthConditionHint: "No hay luz."
        },
        {
          id: 3,
          contextDescription: "El alienígena enciende una fogata.",
          visualEmojis: "🔥🪵",
          utterance: "Korn",
          truthConditionHint: "Hay fuego."
        },
        {
          id: 4,
          contextDescription: "El alienígena vierte agua sobre el fuego. Se apaga, dejando ceniza húmeda.",
          visualEmojis: "💧💨",
          utterance: "Xo Korn",
          truthConditionHint: "No hay fuego."
        },
        {
          id: 5,
          contextDescription: "El alienígena sostiene una antorcha en una cueva oscura.",
          visualEmojis: "🔦🦇",
          utterance: "Korn",
          truthConditionHint: "Hay fuego (incluso aquí)."
        },
        {
          id: 6,
          contextDescription: "El alienígena señala la boca oscura de la cueva (sin fuego, sin sol).",
          visualEmojis: "🕳️",
          utterance: "Xo Zan",
          truthConditionHint: "No hay luz."
        }
      ]
    },
  
    // LEVEL 4: Quantification
    {
      languageName: "Gestalt",
      alienName: "Sujeto Cantor",
      vocabulary: ["Hek", "Rond", "Sim", "Maka"],
      solutionKeywords: {
        "Hek": ["cubo", "caja", "cuadrado", "bloque", "ladrillo", "dado", "cuadrangular"],
        "Rond": ["esfera", "bola", "redondo", "orbe", "círculo", "pelota", "balón", "globular", "circular", "circulo", "globo"],
        "Sim": ["uno", "un", "una", "existe", "singular", "individuo", "único", "solitario", "solo"],
        "Maka": ["todo", "todos", "muchos", "grupo", "múltiple", "universal", "montón", "varios", "totalidad", "entero", "multitud"]
      },
      takeaways: [
        "Cuantificación: Pasamos de hablar de objetos específicos a hablar de conjuntos de objetos.",
        "Compromiso Ontológico (Trivia: Postura de Quine): Decir 'Sim Hek' (Hay un cubo) te compromete a la existencia de cubos. Davidson, sin embargo, se enfoca en las oraciones-T.",
        "Forma Lógica: La gramática superficial puede ser simple, pero la forma lógica involucra variables que recorren un dominio."
      ],
      observations: [
        {
          id: 1,
          contextDescription: "Un solo cubo está sobre la mesa.",
          visualEmojis: "🟦",
          utterance: "Sim Hek",
          truthConditionHint: "Hay un cubo."
        },
        {
          id: 2,
          contextDescription: "Una sola esfera rueda por el suelo.",
          visualEmojis: "⚽",
          utterance: "Sim Rond",
          truthConditionHint: "Hay una esfera."
        },
        {
          id: 3,
          contextDescription: "Una bandeja está llena de veinte cubos.",
          visualEmojis: "🟦🟦🟦",
          utterance: "Maka Hek",
          truthConditionHint: "Hay muchos/todos los cubos."
        },
        {
          id: 4,
          contextDescription: "Un foso está lleno de cientos de esferas.",
          visualEmojis: "⚽⚽⚽",
          utterance: "Maka Rond",
          truthConditionHint: "Hay muchas/todas las esferas."
        },
        {
          id: 5,
          contextDescription: "El alienígena sostiene un cubo, mientras señala la bandeja de muchos cubos.",
          visualEmojis: "🟦👉🟦🟦",
          utterance: "Sim Hek",
          truthConditionHint: "Hay un cubo (Singular)."
        },
        {
          id: 6,
          contextDescription: "El alienígena barre con su brazo toda la habitación de formas.",
          visualEmojis: "🙌📦",
          utterance: "Maka",
          truthConditionHint: "Todo/Todos."
        }
      ]
    }
  ];

export const getScenarios = (lang: 'en' | 'es'): GameScenario[] => {
    const baseScenarios = lang === 'es' ? STATIC_SCENARIOS_ES : STATIC_SCENARIOS_EN;
    
    // Shuffle Subject names
    const shuffledNames = [...SUBJECT_NAMES].sort(() => 0.5 - Math.random());

    return baseScenarios.map((scenario, index) => ({
        ...scenario,
        alienName: `${lang === 'es' ? 'Sujeto' : 'Subject'} ${shuffledNames[index % shuffledNames.length]}`
    }));
}

export const STATIC_SCENARIOS = STATIC_SCENARIOS_EN;