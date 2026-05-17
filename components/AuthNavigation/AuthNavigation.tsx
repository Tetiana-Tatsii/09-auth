"use client";

import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import css from "./AuthNavigation.module.css";

export default function AuthNavigation() {
  const { user, clearIsAuthenticated } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Failed to logout on server", err);
    } finally {
      clearIsAuthenticated();
      router.push("/sign-in");
    }
  };

  if (user) {
    return (
      <div className={css.navigationItem} style={{ gap: "16px" }}>
        {/* ДОДАНО: Посилання на профіль! */}
        <Link href="/profile" className={css.navigationLink}>
          Profile
        </Link>
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
