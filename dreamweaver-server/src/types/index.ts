// src/types/index.ts

/**
 * Parameters for user operations
 */
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

/**
 * Parameters for dream journal operations
 */
export interface CreateJournalParams {
  userId: string;
  transcript: string;
}

export interface UpdateJournalParams {
  transcript: string;
}
