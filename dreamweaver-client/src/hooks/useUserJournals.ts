import { useQuery } from 'react-query';
import { fetchUserJournals } from '../api/journalApi';
import { JournalEntry } from '../types/types';

export const useUserJournals = (userId: string) => {
  return useQuery<JournalEntry[], Error>(
    ['userJournals', userId],
    () => fetchUserJournals(userId),
    {
      enabled: !!userId, 
    }
  );
};