"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi"; // Імпортуємо функцію виходу з API
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  // Дістаємо clearIsAuthenticated замість setUser
  const { user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout(); // 1. Кажемо бекенду видалити куки/токени
    } catch (err) {
      console.error("Failed to logout on server", err);
    } finally {
      clearIsAuthenticated(); // 2. Очищаємо Zustand у будь-якому випадку
      window.location.href = "/"; // 3. Жорстко перенаправляємо на головну сторінку
    }
  };

  if (user) {
    return (
      <div className={css.navigationItem}>
        <span className={css.userEmail}>{user.email}</span>
        <button onClick={handleLogout} className={css.logoutButton}>
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className={css.navigationItem} style={{ gap: "16px" }}>
      <Link href="/sign-in" className={css.navigationLink}>
        Login
      </Link>
      <Link href="/sign-up" className={css.navigationLink}>
        Sign up
      </Link>
    </div>
  );
}
