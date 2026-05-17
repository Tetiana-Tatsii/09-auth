import { api } from "./api";
import { User } from "../../types/user";

// Інтерфейс для відповіді від сервера при реєстрації/логіні
interface AuthResponse {
  user: User;
}

// Функція для реєстрації
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

// Функція для логіну
export const login = async (email: string, password: string): Promise<User> => {
  const response = await api.post<AuthResponse>("/auth/login", {
    email,
    password,
  });
  return response.data.user;
};

// Функція для виходу з акаунту
export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

// Функція для перевірки активної сесії
export const checkSession = async (): Promise<User> => {
  const response = await api.get("/auth/session");
  // Якщо сесія активна, бекенд повертає об'єкт користувача
  return response.data;
};

// Інтерфейс для даних, які ми відправляємо на сервер
interface UpdateProfileData {
  username: string;
  avatar: string;
}

// Функція для оновлення профілю
export const updateProfile = async (data: UpdateProfileData): Promise<User> => {
  const response = await api.patch<User>("/users/me", data);
  return response.data;
};
