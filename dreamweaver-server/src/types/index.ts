export interface CreateJournalParams {
  userId: string;
  transcript: string;
  audio?: {
    data: string;
    mimetype: string;
  };
}
