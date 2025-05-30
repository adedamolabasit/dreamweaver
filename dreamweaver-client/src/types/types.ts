export interface JournalEntry {
  _id?: string;
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

export interface RegisterUserParams {
  jwt: {
    token: string;
  };
}

export interface UpdateUserParams {
  walletAddress: string;
  updateData: {
    username?: string;
    url?: string;
    lastSeen?: Date;
  };
}
