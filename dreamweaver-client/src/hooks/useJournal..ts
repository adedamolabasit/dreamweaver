import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchAllJournals,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from '../api/journalApi';
import { JournalEntry } from '../types/types';

export const useJournals = () => {
  return useQuery<JournalEntry[], Error>({
    queryKey: ['journals'],
    queryFn: fetchAllJournals,
  });
};

export const useCreateJournal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
    },
  });
};

export const useUpdateJournal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, transcript }: { id: string; transcript: string }) =>
      updateJournalEntry(id, transcript),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journals'] });
    },
  });
};