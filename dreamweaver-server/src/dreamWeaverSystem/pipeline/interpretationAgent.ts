import OpenAI from "openai";

export type DreamAnalysis = {
  interpretation: string;
  symbols: string[];
  emotions: string[];
  potentialStories: string[];
};

export const interpretDream = async (
  transcript: string
): Promise<DreamAnalysis> => {
  const openai = new OpenAI({
    apiKey:
      "",
  });

  // const archetypes = await analyzeArchetypes(transcript);
  const archetypes = {
    primaryArchetype: "The Shadow",
    secondaryArchetypes: ["The Hero", "The Trickster", "The Great Mother"],
    symbolMeanings: [
      {
        symbol: "father's car",
        meaning:
          "Authority and inherited aspects of the Self, often related to one's life path or responsibilities passed down through generations.",
      },
      {
        symbol: "market",
        meaning:
          "A place of social exchange and interaction, representing opportunities and the various aspects of one’s persona interacting with the external world.",
      },
      {
        symbol: "locked gate",
        meaning:
          "Represents personal limitations or barriers, possibly unconscious fears or repressed emotions that prevent one from moving forward.",
      },
      {
        symbol: "money",
        meaning:
          "Symbolizes power and the ethical dilemmas it may bring, as well as responsibilities related to wealth.",
      },
      {
        symbol: "thieves",
        meaning:
          "Indicates fear of loss and violation, often pointing to the shadow aspects of the psyche—those parts of ourselves we do not wish to acknowledge.",
      },
      {
        symbol: "strange place",
        meaning:
          "Reflects unfamiliar aspects of oneself or new experiences that are yet to be integrated into the conscious mind.",
      },
      {
        symbol: "military friend",
        meaning:
          "Symbolizes aspects of security and protection, possibly a projection of one’s need to rely on others or personal defense mechanisms.",
      },
      {
        symbol: "rescue",
        meaning:
          "Indicates a need for salvation or assistance, reflecting a dependency on others or aspects of the hero archetype within oneself.",
      },
    ],
    emotionalTone: ["uncertainty", "anxiety", "exploration"],
    potentialConflicts: [
      "fear of authority",
      "resistance to change",
      "struggle with personal limitations",
    ],
  };

  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `
You are a dream analysis expert trained in Jungian psychology, Freudian theory, and contemporary cognitive psychology. 
Your goal is to interpret a dream transcript using psychological symbolism and archetypes. 
Structure the output in a clear JSON format following this schema:

{
  "interpretation": string, 
  "symbols": string[],      
  "emotions": string[],     
  "potentialStories": string[] 
}

In your interpretation, draw on:
- Jungian archetypes (e.g., the Shadow, the Anima, the Hero)
- Freudian symbolism (e.g., subconscious desires, Oedipal themes)
- Emotional and narrative patterns from modern psychology
- The following archetype analysis that was already performed on this dream:
${JSON.stringify(archetypes, null, 2)}

Analyze this dream transcript carefully, grounding your response in psychological theory and creativity. Avoid generic summaries.
Provide your response as **valid JSON** only. No extra commentary or markdown.
`,
      },
      {
        role: "user",
        content: `
Dream Transcript:
${transcript}
`,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content!);
};

async function main() {
  const transcript =
    "I had a dream when I was young not really young but  in the dream shows that probably  was probably in my 21, i'm currently 26, i norrowed my dad's car, i actually do not like taking my dad's car, I just took  his car went to the market i was meant to pick my mom from her shop so I'm getting the parked the car somewhere so and I was on my way to meet my mom but before I reach my mom's shop, i  realize that I had packed the car inside the market in which the market Gates is going to be locked before we get done and it's i can't  move the car from the market if the gate is looked, so i went back to take the car out of the market, but I know that for sure that I didn't go back to the market, i was going to pack the car somewhere else,In the car, i saw a lot of money , it's not really clear how i got the money, but someone on the street noticed that i got that huge amount of money, i really do not know how i go out of the car into a room with a lady, not sure the intention of the lady, some thieves started knocking our door, i tried, we tried to escape them, but we are in a strange place, we don't know where to go, we had to go back, but i had to tell the lady to hold on that will come back, with the money with her, on my way out some of the thieves started to ataack me but i escape, into a room with a lady, the lady was scared at first but i think she was able to help, i called one of my friend in the military, and to my surprise he came in time with soldiers and guns to help me out, so i manage to show him where we are and the rescued me.";
  ("");

  const archetypeAnalysis = await interpretDream(transcript);
  console.log(
    "Archetype Analysis Result:\n",
    JSON.stringify(archetypeAnalysis, null, 2)
  );
}

main().catch(console.error);
