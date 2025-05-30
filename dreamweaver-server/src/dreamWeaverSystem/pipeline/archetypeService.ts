// import OpenAI from 'openai';
// import { createPrompt } from '../prompts/archetypePrompts';

// interface ArchetypeAnalysis {
//   primaryArchetype: string;
//   secondaryArchetypes: string[];
//   symbols: {
//     name: string;
//     meaning: string;
//     frequency: number;
//   }[];
//   emotionalTone: string[];
//   potentialConflicts: string[];
// }

// const JUNGIAN_ARCHETYPES = [
//   'The Self', 'The Shadow', 'The Anima', 'The Animus', 
//   'The Persona', 'The Hero', 'The Trickster', 'The Wise Old Man',
//   'The Great Mother', 'The Child'
// ];

// export const analyzeArchetypes = async (transcript: string): Promise<ArchetypeAnalysis> => {
//   const openai = new OpenAI(process.env.OPENAI_KEY!);
  
//   try {
//     // Step 1: Extract symbols and themes
//     const extractionPrompt = createPrompt('symbol-extraction', { transcript });
//     const extractionResponse = await openai.chat.completions.create({
//       model: "gpt-4-turbo",
//       messages: [{ role: "user", content: extractionPrompt }],
//       temperature: 0.3,
//     });
    
//     const rawSymbols = JSON.parse(extractionResponse.choices[0].message.content!);
    
//     // Step 2: Archetype matching
//     const archetypePrompt = createPrompt('archetype-matching', { 
//       symbols: rawSymbols,
//       archetypes: JUNGIAN_ARCHETYPES
//     });
    
//     const archetypeResponse = await openai.chat.completions.create({
//       model: "gpt-4-turbo",
//       messages: [{ role: "user", content: archetypePrompt }],
//       temperature: 0.5,
//       response_format: { type: "json_object" }
//     });

//     return JSON.parse(archetypeResponse.choices[0].message.content!);
    
//   } catch (error) {
//     console.error("Archetype analysis failed:", error);
//     throw new Error("Failed to analyze archetypes");
//   }
// };