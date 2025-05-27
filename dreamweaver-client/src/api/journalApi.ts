import apiClient from "./apiClient";
import { JournalEntry } from "../types/types";

export const fetchAllJournals = async (): Promise<JournalEntry[]> => {
  const { data } = await apiClient.get("/journals");
  return data.data;
};

export const fetchUserJournals = async (
  userId: string
): Promise<JournalEntry[]> => {
  const { data } = await apiClient.get(`/user/${userId}/journals`);
  return data.data;
};

export const createJournalEntry = async (payload: {
  userId: string;
  transcript: string;
}): Promise<JournalEntry> => {
  const { data } = await apiClient.post("/journal", payload);
  return data.data;
};

export const updateJournalEntry = async (
  id: string,
  transcript: string
): Promise<JournalEntry> => {
  const { data } = await apiClient.put(`/journal/${id}`, { transcript });
  return data.data;
};

export const deleteJournalEntry = async (id: string): Promise<void> => {
  await apiClient.delete(`/journal/${id}`);
};
