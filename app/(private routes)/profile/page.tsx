import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getMeServer } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";

export const metadata: Metadata = {
  title: "Profile | NoteHub",
  description: "User profile details",
};

export default async function ProfilePage() {
  const user = await getMeServer();
  const avatarSrc =
    user?.avatar ||
    "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg";

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

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

        <div className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label style={{ fontSize: "14px", fontWeight: 500 }}>
              Username
            </label>
            <p>{user?.username || "Not set"}</p>
          </div>
          <div className={css.usernameWrapper}>
            <label style={{ fontSize: "14px", fontWeight: 500 }}>Email</label>
            <p>{user?.email || "Loading..."}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
