import { cookies } from "next/headers";
import { AxiosResponse } from "axios";
import { api } from "./api";
import { User } from "../../types/user";
import { Note } from "../../types/note";

const getHeadersWithCookies = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  const refresh = cookieStore.get("refreshToken")?.value;

  let cookieString = "";
  if (token) cookieString += `accessToken=${token}; `;
  if (refresh) cookieString += `refreshToken=${refresh};`;

  return {
    Cookie: cookieString,
  };
};

export const getMeServer = async (): Promise<User> => {
  const headers = await getHeadersWithCookies();
  const response = await api.get<User>("/users/me", { headers });
  return response.data;
};

export const checkSessionServer = async (): Promise<AxiosResponse<User>> => {
  const headers = await getHeadersWithCookies();

  const response = await api.get<User>("/auth/session", { headers });
  return response;
};

export const getNoteByIdServer = async (id: string): Promise<Note> => {
  const headers = await getHeadersWithCookies();
  const response = await api.get<Note>(`/notes/${id}`, { headers });
  return response.data;
};
