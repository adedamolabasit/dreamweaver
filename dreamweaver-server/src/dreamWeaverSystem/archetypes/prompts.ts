interface PromptTemplates {
  [key: string]: (params: any) => string;
}

export const createPrompt: PromptTemplates = {
  'symbol-extraction': ({ transcript }) => `
    Analyze this dream transcript and extract symbolic elements:
    
    ${transcript}
    
    Output JSON with:
    - symbols (array of objects with name, possibleMeanings)
    - recurringThemes
    - emotionalTones
    
    Example:
    {
      "symbols": [
        { "name": "ocean", "possibleMeanings": ["unconscious", "emotions"] }
      ],
      "recurringThemes": ["transformation"],
      "emotionalTones": ["fear", "awe"]
    }
  `,
  
  'archetype-matching': ({ symbols, archetypes }) => `
    Match these dream symbols to Jungian archetypes:
    Symbols: ${JSON.stringify(symbols)}
    Archetypes: ${archetypes.join(', ')}
    
    Output JSON with:
    - primaryArchetype (most dominant)
    - secondaryArchetypes (other significant matches)
    - symbolMeanings (detailed interpretations)
    - emotionalTone
    - potentialConflicts
    
    Example:
    {
      "primaryArchetype": "The Shadow",
      "secondaryArchetypes": ["The Trickster"],
      "symbolMeanings": [
        { "symbol": "snake", "meaning": "hidden fears" }
      ],
      "emotionalTone": ["anxiety", "curiosity"],
      "potentialConflicts": ["fear vs desire"]
    }
  `
};