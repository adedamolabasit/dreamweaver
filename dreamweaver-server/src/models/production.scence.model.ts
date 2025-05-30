// dream.production.schema.ts
import { Schema } from 'mongoose';

export const ProductionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  originalDream: String,
  analysis: {
    interpretation: String,
    symbols: [String],
    emotions: [String]
  },
  story: {
    title: String,
    synopsis: String,
    characters: [{
      name: String,
      description: String
    }],
    scenes: [{
      description: String,
      visualPrompt: String,
      imageUrl: String
    }]
  },
  play: {
    title: String,
    acts: [{
      number: Number,
      scenes: [{
        description: String,
        dialogue: [String],
        stageDirections: String
      }]
    }]
  },
  createdAt: { type: Date, default: Date.now }
});