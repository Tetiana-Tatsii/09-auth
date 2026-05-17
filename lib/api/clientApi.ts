import { api } from "./api";
import { User } from "../../types/user";
import { Note } from "../../types/note";

interface AuthResponse {
  user: User;
}

export const register = async (
  email: string,
  password: string,
): Promise<User> => {
  const response = await api.post<AuthResponse>("/auth/register", {
    email,
    password,
  });
  return response.data.user;
};

export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const checkSession = async (): Promise<User> => {
  const response = await api.get<User>("/auth/session");
  return response.data;
};

interface UpdateProfileData {
  username: string;
}

export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};

export const fetchNotes = async (
  params: {
    search?: string;
    page?: number;
    perPage?: number;
    tag?: string;
  } = {},
): Promise<Note[]> => {
  const response = await api.get<Note[]>("/notes", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const response = await api.post<Note>("/notes", data);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
