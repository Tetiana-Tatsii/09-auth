import { create } from "zustand";
import { User } from "../../types/user";

// Описуємо інтерфейс нашого стору обов'язково з полем user!
interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  clearIsAuthenticated: () => void;
}

// Створюємо стор із подвійними дужками
export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isAuthenticated: false,

  // Функція для збереження користувача після логіну/реєстрації
  setUser: (user) => set({ user, isAuthenticated: true }),

  // Функція для виходу з акаунту
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
