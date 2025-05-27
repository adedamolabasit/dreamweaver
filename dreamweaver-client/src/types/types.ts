export interface JournalEntry {
  id: string;
  transcript: string;
  createdAt?: string;
  user?: {
    _id: string;
    username: string;
  };
}

export interface JournalResponse {
  id: string;
  content: string;
  createdAt: Date;
}