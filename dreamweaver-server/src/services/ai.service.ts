// import { OpenAI } from 'openai';
// import { DreamAnalysis } from '../models/dream.model';

// export class AIService {
//   private openai = new OpenAI(process.env.OPENAI_KEY!);

//   async analyzeDream(text: string): Promise<DreamAnalysis> {
//     const response = await this.openai.chat.completions.create({
//       model: 'gpt-4',
//       messages: [
//         {
//           role: 'system',
//           content: 'Analyze this dream for Jungian archetypes, symbols, and themes. Respond in JSON format.',
//         },
//         { role: 'user', content: text },
//       ],
//       response_format: { type: 'json_object' },
//     });

//     return JSON.parse(response.choices[0].message.content!);
//   }
// }