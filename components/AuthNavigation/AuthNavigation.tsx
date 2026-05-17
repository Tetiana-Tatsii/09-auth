"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation"; // Імпортуємо useRouter
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter(); // Ініціалізуємо роутер

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to logout on server", err);
    } finally {
      clearIsAuthenticated();
      router.push("/sign-in"); // Клієнтський перехід без жорсткого перезавантаження
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
