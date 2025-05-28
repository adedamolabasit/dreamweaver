export interface RegisterUserParams {
  walletAddress: string;
}

export interface UpdateUserParams {
  walletAddress: string;
  updateData: {
    username?: string;
    url?: string;
    lastSeen?: Date;
  };
}


export interface CreateJournalParams {
  userId: string;
  transcript: string;
}

export interface CreateJournalParams {
  userId: string;
  transcript: string;
}

export interface UpdateJournalParams {
  transcript: string;
}
