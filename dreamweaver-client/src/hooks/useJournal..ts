import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  fetchAllJournals,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from '../api/journalApi';
import { JournalEntry } from '../types/types';

export const useJournals = () => {
  return useQuery<JournalEntry[], Error>('journals', fetchAllJournals);
};

export const useCreateJournal = () => {
  const queryClient = useQueryClient();
  return useMutation(createJournalEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('journals');
    },
  });
};

export const useUpdateJournal = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, transcript }: { id: string; transcript: string }) =>
      updateJournalEntry(id, transcript),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('journals');
      },
    }
  );
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteJournalEntry, {
    onSuccess: () => {
      queryClient.invalidateQueries('journals');
    },
  });
};