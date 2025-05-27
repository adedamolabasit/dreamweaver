import mongoose, { Document } from 'mongoose';
import { IUser } from './user.model';

export interface IDreamJournalEntry extends Document {
  user: mongoose.Types.ObjectId | IUser;
  transcript: string;
  createdAt: Date;
}

const DreamJournalEntrySchema = new mongoose.Schema<IDreamJournalEntry>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    transcript: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 10000
    }
  },
  { timestamps: true }
);

export const DreamJournalEntry = mongoose.model<IDreamJournalEntry>('DreamJournalEntry', DreamJournalEntrySchema);