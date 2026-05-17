import { cookies } from "next/headers";
import { api } from "./api";
import { User } from "../../types/user";
import { Note } from "../../types/note";

// Зробили функцію асинхронною
const getHeadersWithCookies = async () => {
  // Додали await перед cookies(), як вимагає новий Next.js!
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  return {
    Cookie: `accessToken=${token}`,
  };
};

export const getMeServer = async (): Promise<User> => {
  const headers = await getHeadersWithCookies(); // Чекаємо на хедери
  const response = await api.get<User>("/users/me", { headers });
  return response.data;
};

export const checkSessionServer = async (): Promise<User> => {
  const headers = await getHeadersWithCookies(); // Чекаємо на хедери
  const response = await api.get<User>("/auth/session", { headers });
  return response.data;
};

export const getNoteByIdServer = async (id: string): Promise<Note> => {
  const headers = await getHeadersWithCookies(); // Чекаємо на хедери
  const response = await api.get<Note>(`/notes/${id}`, { headers });
  return response.data;
};
