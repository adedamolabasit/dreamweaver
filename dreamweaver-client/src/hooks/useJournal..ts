import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllJournals,
  fetchUserJournals,
  createJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from "../api/journalApi";
import { JournalEntry } from "../types/types";

export const useGetAllJournals = () => {
  return useQuery<JournalEntry[], Error>({
    queryKey: ["all-journals"],
    queryFn: fetchAllJournals,
  });
};

export const useGetAllUsersJournals = () => {
  return useQuery<JournalEntry[], Error>({
    queryKey: ["users-journals"],
    queryFn: fetchUserJournals,
  });
};

export const useCreateJournal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["create-journals"] });
    },
  });
};

export const useUpdateJournal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, transcript }: { id: string; transcript: string }) =>
      updateJournalEntry(id, transcript),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update-journals"] });
    },
  });
};

export const useDeleteJournal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteJournalEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["journals"] });
    },
  });
};
