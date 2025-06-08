import { apiClient, publicApiClient } from "./apiClient";
import { JournalEntry } from "../types/types";

export const fetchAllJournals = async (): Promise<JournalEntry[]> => {
  const { data } = await publicApiClient.get("/dream/journals");
  return data.data;
};

export const fetchUserJournals = async (): Promise<JournalEntry[]> => {
  const { data } = await apiClient.get(`/dream/user-journal`);
  return data.data;
};

export const createJournalEntry = async (payload: {
  transcript: string;
}): Promise<JournalEntry> => {
  const { data } = await apiClient.post("/dream/journal", payload);
  return data.data;
};

export const updateJournalEntry = async (
  id: string,
  transcript: string
): Promise<JournalEntry> => {
  const { data } = await apiClient.put(`/dream/journal/${id}`, { transcript });
  return data.data;
};

export const deleteJournalEntry = async (id: string): Promise<void> => {
  await apiClient.delete(`/dream/journal/${id}`);
};
