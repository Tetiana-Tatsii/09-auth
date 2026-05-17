"use client";

import { useAuthStore } from "@/lib/store/authStore";
import Image from "next/image";
import Link from "next/link";
import css from "./ProfilePage.module.css";

export default function ProfilePage() {
  const { user } = useAuthStore();
  const avatarSrc =
    user?.avatar ||
    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        {/* Шапка картки з кнопкою */}
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        {/* Аватар */}
        <div className={css.avatarWrapper}>
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            priority
          />
        </div>

        {/* Інформація користувача */}
        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label>Username</label>
            <p>{user?.username || "Not set"}</p>
          </div>
          <div className={css.usernameWrapper}>
            <label>Email</label>
            <p>{user?.email || "Loading..."}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
